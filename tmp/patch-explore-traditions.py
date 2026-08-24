# Traditions becomes the split disc.
#
# The old header + TraditionsPanels come out; the wheel draws its own copy
# and CTA underneath the illustration.
#
# TraditionsPanels stays exported from explore-sections.tsx, just unused.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

PAIRS = [
 ("import { WorldMenu } from '@/components/world-menu';",
  "import { WorldMenu } from '@/components/world-menu';\n"
  "import { TraditionsWheel } from '@/components/traditions-wheel';"),

 ("""        <Rise index={5}>
          <Pressable onPress={() => router.navigate('/traditions' as any)}>
            <View style={s.headRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.sectionFa}>آیین‌ها</Text>
                <Text style={s.sectionT}>{tr(SECTIONS.traditions)}</Text>
              </View>
              <View style={s.moreRowTop}>
                <Text style={s.moreT}>The whole year</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.accent} />
              </View>
            </View>
            <Text style={s.sectionX}>Two nights the year turns on, six months apart.</Text>
          </Pressable>
          <TraditionsPanels />
        </Rise>""",
  """        <Rise index={5}>
          <TraditionsWheel />
        </Rise>"""),
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
print("TraditionsPanels still rendered:", "<TraditionsPanels />" in s)
print("TraditionsWheel rendered:", "<TraditionsWheel />" in s)
