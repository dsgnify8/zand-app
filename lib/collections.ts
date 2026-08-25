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

export type Collection = {
  id: string;
  name: string;
  created_at?: string;
  /** Filled by loadCollections. */
  count?: number;
  /** First listing added, for the cover. */
  cover_business_id?: string | null;
};

export async function loadCollections(ownerId: string | undefined): Promise<Collection[]> {
  if (!ownerId) return [];
  try {
    const { data: cols } = await supabase
      .from('saved_collections')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    const list = (cols ?? []) as Collection[];
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
  return { data: data as Collection | null, error: error?.message };
}

export async function renameCollection(id: string, name: string) {
  await supabase.from('saved_collections').update({ name: name.trim() }).eq('id', id);
}

export async function deleteCollection(id: string) {
  // Items go with it, by cascade. The listings themselves stay saved —
  // deleting a folder should not unsave what was in it.
  await supabase.from('saved_collections').delete().eq('id', id);
}

export async function addToCollection(collectionId: string, businessId: string) {
  await supabase
    .from('saved_collection_items')
    .upsert({ collection_id: collectionId, business_id: businessId });
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
