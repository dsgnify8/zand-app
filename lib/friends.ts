import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export type Profile = { id: string; name: string; email: string };
export type FriendRow = {
  id: number;
  requester: string;
  addressee: string;
  status: 'pending' | 'accepted';
  profile: Profile;      // the OTHER person's profile
  incoming: boolean;     // true if they sent to me
};

// Search profiles by name or handle
/**
 * Finding someone to add.
 *
 * Names match on any part; an address has to be typed in full. A partial
 * match on email meant that typing "a" returned a page of other people's
 * addresses, which is a directory of the whole app and nobody's idea of
 * a search.
 */
export async function searchProfiles(q: string, myId: string): Promise<Profile[]> {
  const term = q.trim();
  if (!term) return [];

  const filter = term.includes('@')
    ? `email.ilike.${term}`
    : `name.ilike.%${term}%`;

  const { data } = await supabase
    .from('profiles')
    .select('id, name, email')
    .or(filter)
    .neq('id', myId)
    .limit(20);
  return (data ?? []) as Profile[];
}

export async function findByEmail(email: string): Promise<Profile | null> {
  const { data } = await supabase.from('profiles').select('id, name, email').ilike('email', email.trim()).limit(1);
  return (data && data[0]) ? (data[0] as Profile) : null;
}

/**
 * A friendship is two moments worth hearing about: being asked, and
 * being accepted. Both were silent, so a request sat unseen until the
 * person happened to open the friends sheet, and an acceptance was
 * never announced at all.
 *
 * The name is looked up here rather than passed in, so every caller
 * gets it right and none of them has to care.
 */
async function nameOf(id: string): Promise<string> {
  const { data } = await supabase.from('profiles').select('name').eq('id', id).maybeSingle();
  return (data as any)?.name || 'Someone';
}

function notify(userId: string, title: string, body: string) {
  // Fire and forget. A notification that fails must never fail the
  // friendship it is about.
  supabase.functions.invoke('send-push', {
    body: { userId, title, body, category: 'friends', data: { tab: 'friends' } },
  }).catch(() => {});
}

export async function sendRequest(myId: string, otherId: string) {
  const res = await supabase.from('friendships').insert({ requester: myId, addressee: otherId, status: 'pending' });
  if (!res.error) {
    nameOf(myId).then((n) => notify(otherId, n + ' wants to connect', 'Open ZAND to accept.')).catch(() => {});
  }
  return res;
}

export async function acceptRequest(rowId: number) {
  // Returning the row tells us who to thank without the caller holding
  // on to it.
  const res = await supabase.from('friendships')
    .update({ status: 'accepted' })
    .eq('id', rowId)
    .select('requester, addressee')
    .maybeSingle();
  const row = res.data as { requester: string; addressee: string } | null;
  if (!res.error && row) {
    nameOf(row.addressee)
      .then((n) => notify(row.requester, n + ' accepted your invite', 'You are connected on ZAND.'))
      .catch(() => {});
  }
  return res;
}
export async function removeFriendship(rowId: number) {
  return supabase.from('friendships').delete().eq('id', rowId);
}

// Load all my friendships (accepted + pending, incoming + outgoing) with the other person's profile
export async function loadFriendships(myId: string): Promise<FriendRow[]> {
  const { data } = await supabase
    .from('friendships')
    .select('id, requester, addressee, status')
    .or(`requester.eq.${myId},addressee.eq.${myId}`);
  const rows = (data ?? []) as any[];
  if (rows.length === 0) return [];
  const otherIds = rows.map((r) => (r.requester === myId ? r.addressee : r.requester));
  const { data: profs } = await supabase.from('profiles').select('id, name, email').in('id', otherIds);
  const byId: Record<string, Profile> = {};
  for (const p of (profs ?? []) as Profile[]) byId[p.id] = p;
  return rows.map((r) => {
    const otherId = r.requester === myId ? r.addressee : r.requester;
    return { ...r, profile: byId[otherId] ?? { id: otherId, name: 'Someone', email: '' }, incoming: r.addressee === myId };
  });
}

export function useFriends(myId: string | undefined) {
  const [rows, setRows] = useState<FriendRow[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    // Signed out there is nothing to fetch — but leaving `loading` true
    // would hold every consumer in limbo, so settle it here.
    if (!myId) { setRows([]); setLoading(false); return; }
    setLoading(true);
    setRows(await loadFriendships(myId));
    setLoading(false);
  }, [myId]);
  useEffect(() => { refresh(); }, [refresh]);

  const accepted = rows.filter((r) => r.status === 'accepted');
  const incoming = rows.filter((r) => r.status === 'pending' && r.incoming);
  const outgoing = rows.filter((r) => r.status === 'pending' && !r.incoming);
  return { accepted, incoming, outgoing, loading, refresh };
}
