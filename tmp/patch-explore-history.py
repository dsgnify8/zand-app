# Swap the History section on Explore for the new chapter track.
#
# The new component draws its own header, because the spine has to run down
# past the title before the track starts. So the old header markup and the
# old <HistoryTrack /> both come out and one component goes in.
#
# history-track.tsx is left on disk untouched — nothing imports it after this,
# but it is the thing to diff against if the new one misbehaves.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

PAIRS = [
 # 1. the import
 ("import { HistoryTrack } from '@/components/history-track';",
  "import { HistoryChapters } from '@/components/history-chapters';"),

 # 2. the section body
 ("""          <Pressable onPress={() => router.navigate('/education/history' as any)}>
            <View style={s.headRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.sectionFa}>تاریخ</Text>
                <Text style={s.sectionT}>{tr(SECTIONS.history)}</Text>
              </View>
              <View style={s.moreRowTop}>
                <Text style={s.moreT}>Learn history</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.accent} />
              </View>
            </View>
            <Text style={s.sectionX}>Twenty-five centuries, in the order they happened.</Text>
          </Pressable>
          <HistoryTrack />""",
  """          <HistoryChapters />"""),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip().splitlines()[0][:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
