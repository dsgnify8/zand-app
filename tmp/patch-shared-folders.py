# Folders that more than one person keeps.
#
# Membership rather than a copy. Someone adding a place to a shared folder
# adds it for everyone in it — a copy handed over would drift apart inside
# a week and neither person would know which was which.
#
# The notification is composed on the adder's device, which is the same
# fault the friend sends have and the same fix when we get to it.

total = 0
p = "lib/collections.ts"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# --------------------------------------------------- the type
sub("""export type Collection = {
  id: string;
  name: string;
  created_at?: string;""",
"""export type Collection = {
  id: string;
  name: string;
  created_at?: string;
  owner_id?: string;
  /** More than one person keeps this one. */
  shared?: boolean;
  /** Everyone in it, including the person who made it. */
  members?: { id: string; name?: string }[];""",
    "type")

# --------------------------------------- folders you are in, not only own
sub("""    const { data: cols } = await supabase
      .from('saved_collections')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });""",
"""    // Folders you made, and folders you were brought into. Two queries
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
      .sort((a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));""",
    "load")

sub("    const list = (cols ?? []) as Collection[];", "    const list = cols as Collection[];", "list")

# ----------------------------------------------- adding says who added it
sub("""export async function addToCollection(collectionId: string, businessId: string) {
  await supabase
    .from('saved_collection_items')
    .upsert({ collection_id: collectionId, business_id: businessId });
}""",
"""export async function addToCollection(collectionId: string, businessId: string) {
  const { data: me } = await supabase.auth.getUser();
  await supabase
    .from('saved_collection_items')
    .upsert({
      collection_id: collectionId,
      business_id: businessId,
      added_by: me.user?.id ?? null,
    });

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

  await supabase.functions.invoke('send-push', {
    body: {
      to: [...others],
      title: col?.name ?? 'A folder',
      body: `${prof?.name ?? 'Someone'} added ${biz?.name ?? 'a place'}`,
      data: { kind: 'collection', collection_id: collectionId },
    },
  });
}

/* ---------------- sharing ---------------- */

/** Everyone who keeps a folder. */
export async function membersOf(collectionId: string) {
  const { data } = await supabase
    .from('collection_members')
    .select('user_id, profiles(name)')
    .eq('collection_id', collectionId);
  return ((data ?? []) as any[]).map((r) => ({
    id: r.user_id,
    name: r.profiles?.name as string | undefined,
  }));
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
}""",
    "add and share")

open(p, "w").write(s)
print("total:", total)
print("shareCollection:", "export async function shareCollection" in s)
