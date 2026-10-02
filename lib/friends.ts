import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

// No email. Addresses are no longer readable from a phone: any signed-in
// person could read the whole table, which is an export of every user's
// address. Search goes through find_profile on the server, which answers
// an exact address and returns a name.
export type Profile = { id: string; name: string; email?: string };
export type FriendRow = {
  id: number;
  requester: string;
  addressee: string;
  status: 'pending' | 'accepted';
  profile: Profile;      // the OTHER person's profile
  incoming: boolean;     // true if they sent to me
};

// Find someone by their address
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
  // An address, whole, or nothing.
  //
  // Searching by name used to be offered as well, and it was the wrong
  // tool twice over. A hundred people called Ali is not an answer to
  // "which Ali", so nobody could use it to find the person they meant;
  // and a partial match over every profile is a way of reading out the
  // directory to anyone who signs up. An address you have to be told.
  if (!looksLikeEmail(term)) return [];

  const { data } = await supabase.rpc('find_profile', { addr: term });
  const rows = (data ?? []) as Profile[];
  return rows.filter((r) => r.id !== myId);
}

/** Enough of an address to be worth asking the server about. */
export function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export async function findByEmail(email: string): Promise<Profile | null> {
  const { data } = await supabase.rpc('find_profile', { addr: email.trim() });
  const rows = (data ?? []) as Profile[];
  return rows[0] ?? null;
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
export async function nameOf(id: string): Promise<string> {
  const { data } = await supabase.from('profiles').select('name').eq('id', id).maybeSingle();
  return (data as any)?.name || 'Someone';
}

/**
 * An address, shortened to the part that identifies without exposing.
 *
 * An incoming request comes from somebody you may not know, and the sheet
 * was printing their whole address under their name before any
 * relationship existed. The first letter and the domain are enough to
 * tell two people of the same name apart, which is all it was there for.
 */
export function maskEmail(email?: string | null) {
  const v = (email ?? '').trim();
  const at = v.lastIndexOf('@');
  if (at < 1) return '';
  const local = v.slice(0, at);
  const domain = v.slice(at);
  return local.slice(0, 1) + '•••' + domain;
}

function notify(userId: string, title: string, body: string) {
  // Fire and forget. A notification that fails must never fail the
  // friendship it is about.
  supabase.functions.invoke('send-push', {
    body: { userId, title, body, category: 'friends', data: { tab: 'friends' } },
  }).catch(() => {});
}

/* ---------------- invitations ---------------- */

/**
 * This person's invite token, minted on the server on first use.
 *
 * Null when it cannot be had — signed out, or offline. The caller should
 * fall back to a link with no token, which still shows the invitation page
 * and the App Store; it simply cannot connect anybody.
 */
export async function myInviteToken(): Promise<string | null> {
  try {
    const { data, error } = await supabase.rpc('invite_token');
    if (error) return null;
    return (data as string | null) ?? null;
  } catch {
    return null;
  }
}

/**
 * Spend an invitation. Connects the two of you outright.
 *
 * Accepted rather than pending, because the inviter made the link and the
 * person tapping it went looking: both have said yes already. The work is
 * done by accept_invite on the server, which is the only thing that can
 * write an accepted friendship, and it returns who invited them so the
 * screen can say the name and the inviter can be told.
 */
export async function acceptInvite(token: string): Promise<{ id: string; name: string } | null> {
  try {
    const { data, error } = await supabase.rpc('accept_invite', { t: token });
    if (error) return null;
    const row = (data as any[] | null)?.[0];
    if (!row?.inviter) return null;
    return { id: row.inviter as string, name: (row.inviter_name as string) || 'Someone' };
  } catch {
    return null;
  }
}

/* ---------------- an invitation that waits ---------------- */

const PENDING = 'invite:pending';

/**
 * Hold an invitation until there is somebody to accept it.
 *
 * Threading the link through the screens does not survive the one journey
 * that matters most: install the app, tap the link, make an account. Making
 * an account means confirming an address, which means leaving ZAND and
 * coming back, possibly much later, through a sign-in screen that knows
 * nothing about where you were going. So the token is put down here
 * instead, and spent the moment a session exists, whatever route brought
 * it about.
 */
export async function stashInvite(token: string) {
  try { await AsyncStorage.setItem(PENDING, token); } catch {}
}

/**
 * Spend one, if one is waiting. Called when a session appears.
 *
 * Cleared before the attempt rather than after, so a token that will never
 * work cannot be retried on every sign-in for the life of the install.
 * Tapping the link again is always available.
 */
export async function spendStashedInvite(myId: string) {
  let token: string | null = null;
  try {
    token = await AsyncStorage.getItem(PENDING);
    if (token) await AsyncStorage.removeItem(PENDING);
  } catch {}
  if (!token) return null;

  const inviter = await acceptInvite(token);
  if (inviter) tellInviter(inviter.id, myId).catch(() => {});
  return inviter;
}

/** Tell the person whose link it was. */
export async function tellInviter(inviterId: string, myId: string) {
  const n = await nameOf(myId);
  notify(inviterId, n + ' accepted your invite', 'You are connected on ZAND.');
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
  const { data: profs } = await supabase.from('profiles').select('id, name').in('id', otherIds);
  const byId: Record<string, Profile> = {};
  for (const p of (profs ?? []) as Profile[]) byId[p.id] = p;
  return rows.map((r) => {
    const otherId = r.requester === myId ? r.addressee : r.requester;
    return { ...r, profile: byId[otherId] ?? { id: otherId, name: 'Someone' }, incoming: r.addressee === myId };
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
