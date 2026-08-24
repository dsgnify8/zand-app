# The other half of the exchange.
#
# loadInbox only ever fetched things sent *to* me, so the app had no idea
# what I had sent or whether anyone had opened it. An exchange you can only
# see one side of is a mailbox, not a loop.
#
# Adds:
#   - reply_to, so a reply points back at what prompted it
#   - loadOutbox / useOutbox, the sender's side
#   - itemRoute, so a card can open the thing it is about — the fix for
#     "when i learn it, i still want to press it and see the whole thing"

p = "lib/inbox.ts"
s = open(p).read()
applied, skipped = 0, []


def sub(a, b, label):
    global s, applied
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(label)


# ---- the column on the type -----------------------------------------
sub("""  learned: boolean;
  created_at: string;
  senderName?: string;
};""",
"""  learned: boolean;
  created_at: string;
  // The item this one answers, if it answers one. Null starts a thread.
  reply_to?: number | null;
  senderName?: string;
  // Filled by loadOutbox only.
  recipientName?: string;
};""",
    "SentItem")

# ---- and on the send ------------------------------------------------
sub("""export async function sendItem(payload: {
  sender: string; recipient: string; kind: string; senderName?: string;
  item_key?: string; title?: string; fa?: string; tr?: string; en?: string; note?: string;
}) {""",
"""export async function sendItem(payload: {
  sender: string; recipient: string; kind: string; senderName?: string;
  item_key?: string; title?: string; fa?: string; tr?: string; en?: string; note?: string;
  // Set when this is a reply, so the pair reads as one exchange.
  reply_to?: number;
}) {""",
    "sendItem payload")

# ---- the sender's side ----------------------------------------------
sub("export function useInbox(myId: string | undefined) {",
"""/**
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
    case 'business': return '/business?id=' + it.item_key;
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

export function useInbox(myId: string | undefined) {""",
    "outbox")

open(p, "w").write(s)
print("applied", applied, "of 3")
for k in skipped:
    print("   skipped:", k)
print("loadOutbox exported:", "export async function loadOutbox" in s)
print("itemRoute exported:", "export function itemRoute" in s)
