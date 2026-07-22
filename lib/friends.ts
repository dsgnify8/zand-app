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
export async function searchProfiles(q: string, myId: string): Promise<Profile[]> {
  const term = q.trim();
  if (!term) return [];
  const { data } = await supabase
    .from('profiles')
    .select('id, name, email')
    .or(`name.ilike.%${term}%,email.ilike.%${term}%`)
    .neq('id', myId)
    .limit(20);
  return (data ?? []) as Profile[];
}

export async function findByEmail(email: string): Promise<Profile | null> {
  const { data } = await supabase.from('profiles').select('id, name, email').ilike('email', email.trim()).limit(1);
  return (data && data[0]) ? (data[0] as Profile) : null;
}

export async function sendRequest(myId: string, otherId: string) {
  return supabase.from('friendships').insert({ requester: myId, addressee: otherId, status: 'pending' });
}
export async function acceptRequest(rowId: number) {
  return supabase.from('friendships').update({ status: 'accepted' }).eq('id', rowId);
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
    if (!myId) return;
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
