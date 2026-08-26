// Collections of saved listings.
//
// Saving and filing are separate acts. Tapping the bookmark saves — that
// always happens, and it happens immediately. The sheet that follows is an
// offer to file it somewhere, and dismissing it leaves the listing saved
// and unfiled, which is where most saves belong.
//
// Collections are rows rather than local storage: they are named, they are
// meant to last, and losing them on a reinstall would be losing work.

import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { isSavedBusiness, toggleSavedBusiness } from '@/lib/saved-businesses';

export type Collection = {
  id: string;
  name: string;
  created_at?: string;
  owner_id?: string;
  /** More than one person keeps this one. */
  shared?: boolean;
  /** Everyone in it, including the person who made it. */
  members?: { id: string; name?: string }[];
  /** Filled by loadCollections. */
  count?: number;
  /** First listing added, for the cover. */
  cover_business_id?: string | null;
};

export async function loadCollections(ownerId: string | undefined): Promise<Collection[]> {
  if (!ownerId) return [];
  try {
    // Folders you made, and folders you were brought into. Two queries
    // rather than a join, because a nested select through the membership
    // table trips the row-level policy on the way back.
    const [{ data: mine }, { data: memberOf }] = await Promise.all([
      supabase.from('saved_collections').select('*').eq('owner_id', ownerId),
      supabase.from('collection_members').select('collection_id').eq('user_id', ownerId),
    ]);

    const sharedIds = ((memberOf ?? []) as any[])
      .map((r) => r.collection_id)
      .filter((id) => !((mine ?? []) as any[]).some((c) => c.id === id));

    const { data: shared } = sharedIds.length
      ? await supabase.from('saved_collections').select('*').in('id', sharedIds)
      : { data: [] as any[] };

    const cols = [...((mine ?? []) as any[]), ...((shared ?? []) as any[])]
      .sort((a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));

    const list = cols as Collection[];
    if (list.length === 0) return [];

    // Counts and covers in one pass rather than a query per collection.
    const { data: items } = await supabase
      .from('saved_collection_items')
      .select('collection_id, business_id, added_at')
      .in('collection_id', list.map((c) => c.id))
      .order('added_at', { ascending: true });

    const byCol: Record<string, string[]> = {};
    for (const it of (items ?? []) as any[]) {
      (byCol[it.collection_id] ??= []).push(it.business_id);
    }

    return list.map((c) => ({
      ...c,
      count: byCol[c.id]?.length ?? 0,
      // The first thing put in it. A cover that changed every time
      // something was added would make the shelf restless.
      cover_business_id: byCol[c.id]?.[0] ?? null,
    }));
  } catch {
    return [];
  }
}

export async function createCollection(ownerId: string, name: string) {
  const { data, error } = await supabase
    .from('saved_collections')
    .insert({ owner_id: ownerId, name: name.trim() })
    .select()
    .maybeSingle();
  // TEMP: the sheet discards this, so a policy refusing the insert looks
  // like nothing happening at all.
  console.log('[folder] create', name, '->', data?.id ?? 'NO ROW', error?.message ?? '');
  return { data: data as Collection | null, error: error?.message };
}

export async function renameCollection(id: string, name: string) {
  await supabase.from('saved_collections').update({ name: name.trim() }).eq('id', id);
}

export async function deleteCollection(id: string) {
  // Tell the others before it goes: afterwards there is no folder left to
  // read a name from. The listings themselves stay saved — deleting a
  // folder should not unsave what was in it.
  try {
    const { data: me } = await supabase.auth.getUser();
    const myId = me.user?.id;
    const [{ data: col }, { data: members }, { data: prof }] = await Promise.all([
      supabase.from('saved_collections').select('name').eq('id', id).maybeSingle(),
      supabase.from('collection_members').select('user_id').eq('collection_id', id),
      supabase.from('profiles').select('name').eq('id', myId ?? '').maybeSingle(),
    ]);

    const others = ((members ?? []) as any[])
      .map((m) => m.user_id as string)
      .filter((u) => u !== myId);

    await Promise.all(others.map((userId) =>
      supabase.functions.invoke('send-push', {
        body: {
          userId,
          title: col?.name ?? 'A folder',
          body: `${prof?.name ?? 'Someone'} deleted this folder`,
          category: 'friends',
          data: { kind: 'collection-deleted' },
        },
      }).catch(() => {})
    ));
  } catch {}

  await supabase.from('saved_collections').delete().eq('id', id);
}

export async function addToCollection(collectionId: string, businessId: string) {
  const { data: me } = await supabase.auth.getUser();
  const { error: addErr } = await supabase
    .from('saved_collection_items')
    .upsert({
      collection_id: collectionId,
      business_id: businessId,
      added_by: me.user?.id ?? null,
    });
  console.log('[folder] add ->', addErr?.message ?? 'ok');

  // Filing something is saving it. Otherwise a listing sits in a folder
  // with an empty bookmark, which reads as not saved.
  if (!isSavedBusiness(businessId)) await toggleSavedBusiness(businessId);

  // Everyone else in the folder hears about it. Fire and forget: a failed
  // notification must not make saving feel like it failed.
  notifyFolder(collectionId, businessId).catch(() => {});
}

/**
 * Tell the other members something was added.
 *
 * Composed here, on the adder's device, which means it goes out in the
 * adder's language rather than the reader's — the same fault the friend
 * sends have, and the same fix when the push work is done.
 */
async function notifyFolder(collectionId: string, businessId: string) {
  const { data: me } = await supabase.auth.getUser();
  const myId = me.user?.id;
  if (!myId) return;

  const [{ data: members }, { data: col }, { data: biz }] = await Promise.all([
    supabase.from('collection_members').select('user_id').eq('collection_id', collectionId),
    supabase.from('saved_collections').select('name, owner_id').eq('id', collectionId).maybeSingle(),
    supabase.from('businesses').select('name').eq('id', businessId).maybeSingle(),
  ]);

  const others = new Set<string>();
  for (const m of (members ?? []) as any[]) if (m.user_id !== myId) others.add(m.user_id);
  if (col?.owner_id && col.owner_id !== myId) others.add(col.owner_id);
  if (others.size === 0) return;   // nobody else keeps this one

  const { data: prof } = await supabase
    .from('profiles').select('name').eq('id', myId).maybeSingle();

  // One call per member: send-push takes a single userId, not a list.
  // A folder has two or three people in it, so this is fine.
  await Promise.all([...others].map((userId) =>
    supabase.functions.invoke('send-push', {
      body: {
        userId,
        title: col?.name ?? 'A folder',
        body: `${prof?.name ?? 'Someone'} added ${biz?.name ?? 'a place'}`,
        // Filed under friends, which is the toggle someone would look
        // for to turn this off — a shared folder is a friend thing.
        category: 'friends',
        data: { kind: 'collection', collection_id: collectionId },
      },
    }).catch(() => {})
  ));
}

/* ---------------- sharing ---------------- */

/**
 * The link for a folder, making a token if it has none.
 *
 * Lazily: most folders are never shared, and a token on every one is a
 * row of dead data and a slightly larger surface to guess at.
 */
export async function folderLink(collectionId: string) {
  const { data: existing } = await supabase
    .from('saved_collections')
    .select('share_token')
    .eq('id', collectionId)
    .maybeSingle();

  let token = existing?.share_token as string | undefined;

  if (!token) {
    // Long enough that guessing is pointless, short enough to paste.
    token = Array.from({ length: 3 })
      .map(() => Math.random().toString(36).slice(2, 10))
      .join('');
    await supabase.from('saved_collections')
      .update({ share_token: token })
      .eq('id', collectionId);
  }

  return 'https://zand.app/folder?t=' + token;
}

/**
 * Stop every link already handed out.
 *
 * A shared folder is a space, and there has to be a way to close it
 * without deleting what is in it.
 */
export async function revokeFolderLink(collectionId: string) {
  await supabase.from('saved_collections')
    .update({ share_token: null })
    .eq('id', collectionId);
}

/** Join by token. The function checks it, befriends, and adds. */
export async function joinFolderByToken(token: string) {
  const { data, error } = await supabase.functions.invoke('join-folder', {
    body: { token },
  });
  if (error) return null;
  return data as { ok?: boolean; id?: string; name?: string; mine?: boolean; error?: string };
}


/** Everyone who keeps a folder. */
export async function membersOf(collectionId: string) {
  // Two queries rather than a join. The join to profiles goes through
  // that table's own policy and comes back empty, which made everyone
  // look un-added and let the same person be added twice.
  const { data } = await supabase
    .from('collection_members')
    .select('user_id')
    .eq('collection_id', collectionId);

  const ids = ((data ?? []) as any[]).map((r) => r.user_id as string);

  // The person who made it is not in collection_members — they are the
  // owner column on the folder. Without this a shared folder reported
  // one member and read as "just you".
  const { data: col } = await supabase
    .from('saved_collections').select('owner_id').eq('id', collectionId).maybeSingle();
  if (col?.owner_id && !ids.includes(col.owner_id)) ids.unshift(col.owner_id);

  if (ids.length === 0) return [];

  const { data: profs } = await supabase
    .from('profiles').select('id, name').in('id', ids);
  const byId: Record<string, string> = {};
  for (const p of (profs ?? []) as any[]) byId[p.id] = p.name;

  return ids.map((id) => ({ id, name: byId[id] }));
}

/** Bring someone in. They keep the same folder, not a copy of it. */
export async function shareCollection(collectionId: string, userId: string) {
  const { data: me } = await supabase.auth.getUser();
  const { error } = await supabase.from('collection_members').upsert({
    collection_id: collectionId,
    user_id: userId,
    invited_by: me.user?.id ?? null,
  });
  return !error;
}

/** Stop keeping it. The folder stays; you leave. */
export async function leaveCollection(collectionId: string) {
  const { data: me } = await supabase.auth.getUser();
  if (!me.user?.id) return;
  await supabase
    .from('collection_members')
    .delete()
    .eq('collection_id', collectionId)
    .eq('user_id', me.user.id);
}

export async function removeFromCollection(collectionId: string, businessId: string) {
  await supabase
    .from('saved_collection_items')
    .delete()
    .eq('collection_id', collectionId)
    .eq('business_id', businessId);
}

/** Which collections a listing is already in. */
export async function collectionsFor(businessId: string): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('saved_collection_items')
      .select('collection_id')
      .eq('business_id', businessId);
    return ((data ?? []) as any[]).map((r) => r.collection_id);
  } catch {
    return [];
  }
}

/** The listing ids in one collection, oldest first. */
export async function collectionItems(collectionId: string): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('saved_collection_items')
      .select('business_id, added_at')
      .eq('collection_id', collectionId)
      .order('added_at', { ascending: true });
    return ((data ?? []) as any[]).map((r) => r.business_id);
  } catch {
    return [];
  }
}

export function useCollections(ownerId: string | undefined) {
  const [items, setItems] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setItems(await loadCollections(ownerId));
    setLoading(false);
  }, [ownerId]);

  useEffect(() => { refresh(); }, [refresh]);
  return { items, loading, refresh };
}


/**
 * Unsaving takes it out of every folder.
 *
 * A bookmark is the one control, and it has to mean the same thing
 * everywhere: filled means kept. Leaving something in a folder after it
 * was unsaved would make the folder disagree with the bookmark.
 */
export async function removeFromAllCollections(businessId: string) {
  await supabase.from('saved_collection_items').delete().eq('business_id', businessId);
}
