# Two fixes.
#
# 1. The friends pitch flashes before the list loads.
#
#    useFriends already reports `loading`; FriendsTab never read it, so an
#    empty array during the fetch looked like "no friends" and the
#    teach-each-other pitch rendered for a frame. Same shape as the level
#    questionnaire: not-loaded read as a value.
#
#    There is a second half to it. refresh() returns early when there is no
#    myId and never clears `loading`, so signed out it stays true forever —
#    gating on it alone would hide the pitch from exactly the people it is
#    written for. Both halves are fixed here.
#
# 2. Saved for later becomes grouped by category.
#
#    It holds words, verses, topics, poets, places and businesses in one
#    undifferentiated list. Headers are inserted into the same list rather
#    than nesting a second map, so the row markup stays in one place.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip().splitlines()[0][:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# ------------------------------------------------- 1a. the store
edit("lib/friends.ts", [
 ("""  const refresh = useCallback(async () => {
    if (!myId) return;
    setLoading(true);""",
  """  const refresh = useCallback(async () => {
    // Signed out there is nothing to fetch — but leaving `loading` true
    // would hold every consumer in limbo, so settle it here.
    if (!myId) { setRows([]); setLoading(false); return; }
    setLoading(true);"""),
])

# ------------------------------------------------- 1b. the screen
edit("app/(tabs)/profile.tsx", [
 ("  const { accepted, incoming, refresh } = useFriends(user?.id);",
  "  const { accepted, incoming, loading: friendsLoading, refresh } = useFriends(user?.id);"),

 ("""      {!hasActivity ? (""",
  """      {/* Wait for the fetch. An empty list mid-load is not the same as
          having nobody, and showing the pitch on that flashes it at people
          who do have friends. */}
      {!hasActivity && !friendsLoading ? ("""),
])

# ------------------------------------------------- 2. grouped saves
edit("app/(tabs)/profile.tsx", [
 ("  const items = view === 'saved' ? [...bizCards, ...arts] : arts;",
  """  const items = view === 'saved' ? [...bizCards, ...arts] : arts;

  // Saved holds one of everything the app can keep, so it reads better under
  // headings than as one long list. The headers are folded into the same
  // array as the items — a sentinel with __header rather than a nested map,
  // so there is still only one copy of the row markup below.
  const KIND_LABEL: Record<string, string> = {
    word: 'Words', verse: 'Verses', topic: 'Topics', poet: 'Poets',
    place: 'Places', culture: 'Culture', business: 'Businesses', other: 'Everything else',
  };
  let rows: any[] = items;
  if (view === 'saved') {
    const by = new Map<string, any[]>();
    items.forEach((it: any) => {
      const k = it.kind ?? 'other';
      if (!by.has(k)) by.set(k, []);
      by.get(k)!.push(it);
    });
    rows = Array.from(by).flatMap(([kind, list]) => [
      { __header: KIND_LABEL[kind] ?? kind, key: 'h-' + kind },
      ...list,
    ]);
  }"""),

 ("""      ) : (
        <View style={{ gap: spacing.sm }}>
          {items.map((a) => (
            <Pressable key={a.key} style={s.saveRow} onPress={() => router.navigate(a.route as any)}>""",
  """      ) : (
        <View style={{ gap: spacing.sm }}>
          {rows.map((a: any) => a.__header ? (
            <Text key={a.key} style={s.sectionLabel}>{a.__header}</Text>
          ) : (
            <Pressable key={a.key} style={s.saveRow} onPress={() => router.navigate(a.route as any)}>"""),
])

print("\ntotal:", total)
