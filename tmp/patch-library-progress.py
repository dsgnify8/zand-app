# Library and Progress tidy-up.
#
# 1. History comes out of the Library grid. LibrarySub still knows how to
#    render it — left in place rather than torn out mid-session, but nothing
#    reaches it now.
#
# 2. The saved-category row showed four hardcoded kinds in a fixed View.
#    It becomes every kind that can be saved, in a row you can drag, so the
#    row shows the shape of the library rather than only the corner of it
#    someone happened to hardcode.
#
# 3. Articles read and Videos watched leave the Progress grid. Articles were
#    deleted app-wide and videos are archived, so both count things that can
#    no longer happen. The i18n keys stay — cheap, and they are what an
#    archived feature needs to come back.

p = "app/(tabs)/profile.tsx"
s = open(p).read()
applied, skipped = 0, []


def sub(a, b, label):
    global s, applied
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(label)


# ---- 1. the saveable kinds, declared once ---------------------------
sub(
"""const KIND_ICON_IN: Record<string, any> = {
  topic: 'book-outline', poet: 'book', place: 'location-outline', article: 'newspaper-outline',
};""",
"""const KIND_ICON_IN: Record<string, any> = {
  topic: 'book-outline', poet: 'book', place: 'location-outline', article: 'newspaper-outline',
};

// Everything that can be saved. The filter row lists all of them, empty or
// not, so the row says what the library is for rather than only what happens
// to be in it today.
const SAVE_KINDS = ['word', 'verse', 'topic', 'poet', 'place'] as const;""",
"SAVE_KINDS")

# ---- 2. history out of the grid -------------------------------------
sub(
"          { key: 'history', i: 'time-outline', t: t(PROFILE.history), x: t(PROFILE.historyX) },\n",
"          // History removed: what you have opened is already the home rail.\n",
"history grid entry")

# ---- 3. the filter row ----------------------------------------------
sub(
"  const [filter, setFilter] = useState<'all' | 'word' | 'topic' | 'verse'>('all');",
"  const [filter, setFilter] = useState<string>('all');",
"filter state")

sub(
"""      <View style={s.chipsTight}>
        {(['all', 'word', 'verse', 'topic'] as const).map((f) => (
          <Pressable key={f} style={[s.chip, filter === f && s.chipOn]} onPress={() => setFilter(f)}>
            <Text style={[s.chipT, filter === f && s.chipTOn]}>{f === 'all' ? 'All' : f + 's'}</Text>
          </Pressable>
        ))}
      </View>""",
"""      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.chipsTight}
      >
        {(['all', ...SAVE_KINDS] as string[]).map((f) => {
          const n = f === 'all' ? items.length : items.filter((x) => x.kind === f).length;
          return (
            <Pressable key={f} style={[s.chip, filter === f && s.chipOn]} onPress={() => setFilter(f)}>
              <Text style={[s.chipT, filter === f && s.chipTOn]}>
                {(f === 'all' ? 'All' : f + 's') + (n > 0 ? '  ' + n : '')}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>""",
"filter row")

# ---- 4. progress counters -------------------------------------------
sub("    { v: String(ps.articlesRead ?? 0), k: 'articles read' },\n", "", "ps.articlesRead")
sub("          { v: stats.articlesRead, k: 'Articles read', kT: PROFILE.articlesRead, i: 'newspaper' },\n", "",
    "stats.articlesRead")
sub("          { v: stats.videosWatched, k: 'Videos watched', kT: PROFILE.videosWatched, i: 'play-circle' },\n", "",
    "stats.videosWatched")

open(p, "w").write(s)
print("applied", applied, "of 7")
for k in skipped:
    print("   skipped:", k)

print("ScrollView imported:", "ScrollView" in s.split("from 'react-native'")[0])
print("history in grid:", "key: 'history'" in s)
print("articlesRead left:", s.count("articlesRead"))
print("videosWatched left:", s.count("videosWatched"))
