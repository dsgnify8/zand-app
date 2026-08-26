import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export type SentItem = {
  id: number;
  sender: string;
  recipient: string;
  kind: string;
  item_key: string | null;
  title: string | null;
  fa: string | null;
  tr: string | null;
  en: string | null;
  note: string | null;
  learned: boolean;
  created_at: string;
  // The item this one answers, if it answers one. Null starts a thread.
  reply_to?: number | null;
  senderName?: string;
  // Filled by loadOutbox only.
  recipientName?: string;
};

export async function sendItem(payload: {
  sender: string; recipient: string; kind: string; senderName?: string;
  item_key?: string; title?: string; fa?: string; tr?: string; en?: string; note?: string;
  // Set when this is a reply, so the pair reads as one exchange.
  reply_to?: number;
}) {
  const { senderName, ...row } = payload as any;
  const res = await supabase.from('sent_items').insert(row);
  // Counted from the table rather than bumped, so it cannot drift.
  import('@/lib/stats-store').then((m) => m.recountSent()).catch(() => {});
  // Tell them, if they have a device registered and have not switched
  // this off. Fire and forget: a failed notification must never fail
  // the send itself.
  supabase.functions.invoke('send-push', {
    body: {
      userId: (payload as any).recipient,
      // Name what arrived. "Something came for you" makes someone open
      // the app to find out what; saying it plainly is more use and
      // more respectful of their attention.
      title: (senderName ?? 'A friend') + ' sent you '
        + ((payload as any).kind === 'word' ? 'a word'
          : (payload as any).kind === 'topic' ? 'a topic'
          : (payload as any).kind === 'poet' ? 'a poet'
          : (payload as any).kind === 'business' ? 'a place'
          : 'something'),
      body: (payload as any).fa
        ? (payload as any).fa + ((payload as any).en ? '  ·  ' + (payload as any).en : '')
        : ((payload as any).title ?? ''),
      category: 'friends',
      data: { tab: 'friends' },
    },
  }).catch(() => {});
  return res;
}

export async function markLearned(id: number) {
  return supabase.from('sent_items').update({ learned: true }).eq('id', id);
}

// Incoming items for me, with sender names resolved
export async function loadInbox(myId: string): Promise<SentItem[]> {
  const { data } = await supabase
    .from('sent_items')
    .select('*')
    .eq('recipient', myId)
    .order('created_at', { ascending: false });
  const rows = (data ?? []) as SentItem[];
  if (rows.length === 0) return [];
  const senderIds = Array.from(new Set(rows.map((r) => r.sender)));
  const { data: profs } = await supabase.from('profiles').select('id, name').in('id', senderIds);
  const byId: Record<string, string> = {};
  for (const p of (profs ?? []) as any[]) byId[p.id] = p.name;
  return rows.map((r) => ({ ...r, senderName: byId[r.sender] ?? 'A friend' }));
}

/**
 * Where does this item live in the app.
 *
 * A card should open the thing it is about, learned or not — marking a word
 * as learned should not be the last time you can look at it.
 */
export function itemRoute(it: SentItem): string | null {
  if (!it.item_key) return null;
  switch (it.kind) {
    case 'topic': return '/education/topic?topic=' + it.item_key;
    case 'poet': return '/literature/reader?author=' + it.item_key + '&page=0';
    case 'culture': return '/culture/topic?topic=' + it.item_key;
    case 'place': return '/geography?jump=' + it.item_key;
    case 'business': return '/local/business?id=' + it.item_key;
    default: return null; // a word has no page of its own; the card is it
  }
}

/** Things I have sent, newest first, with the recipients' names resolved. */
export async function loadOutbox(myId: string): Promise<SentItem[]> {
  const { data } = await supabase
    .from('sent_items')
    .select('*')
    .eq('sender', myId)
    .order('created_at', { ascending: false });
  const rows = (data ?? []) as SentItem[];
  if (rows.length === 0) return [];
  const ids = Array.from(new Set(rows.map((r) => r.recipient)));
  const { data: profs } = await supabase.from('profiles').select('id, name').in('id', ids);
  const byId: Record<string, string> = {};
  for (const p of (profs ?? []) as any[]) byId[p.id] = p.name;
  return rows.map((r) => ({ ...r, recipientName: byId[r.recipient] ?? 'A friend' }));
}

export function useOutbox(myId: string | undefined) {
  const [items, setItems] = useState<SentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    if (!myId) { setItems([]); setLoading(false); return; }
    setLoading(true);
    setItems(await loadOutbox(myId));
    setLoading(false);
  }, [myId]);
  useEffect(() => { refresh(); }, [refresh]);
  return { items, loading, refresh };
}

export function useInbox(myId: string | undefined) {
  const [items, setItems] = useState<SentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    if (!myId) { setItems([]); setLoading(false); return; }
    setLoading(true);
    setItems(await loadInbox(myId));
    setLoading(false);
  }, [myId]);
  useEffect(() => { refresh(); }, [refresh]);
  return { items, loading, refresh };
}
