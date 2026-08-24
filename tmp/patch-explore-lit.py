# Two changes to Explore:
#
#   1. Geography moves above Culture. Culture is the only entry left in
#      WORLDS, so this is just relocating the WORLDS.map line to below the
#      geography block rather than restructuring anything.
#   2. Literature loses its header + LiteratureCard and becomes <PoetDeck />,
#      which draws its own column.
#
# LiteratureCard stays exported from explore-lit-lang.tsx, just unused. Delete
# it later if nothing else picks it up.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

WORLDS_LINE = "        {WORLDS.map((w) => <WorldCard key={w.key} w={w} index={1} fa={fa} />)}"

PAIRS = [
 # ---- imports ----
 ("import { LiteratureCard, LanguageBorrowed } from '@/components/explore-lit-lang';",
  "import { LanguageBorrowed } from '@/components/explore-lit-lang';\n"
  "import { PoetDeck } from '@/components/poet-deck';"),

 # ---- 1a. lift Culture out from above Geography ----
 (WORLDS_LINE + "\n\n        {/* Geography: the map itself, on the page. */}\n        <Rise index={4}>",
  "        {/* Geography: the map itself, on the page. */}\n        <Rise index={1}>"),

 # ---- 1b. put it back underneath ----
 ("          <View style={s.mapWrap}>\n"
  "            <IranProvinceMap />\n"
  "          </View>\n"
  "        </Rise>",
  "          <View style={s.mapWrap}>\n"
  "            <IranProvinceMap />\n"
  "          </View>\n"
  "        </Rise>\n\n"
  + "        {WORLDS.map((w) => <WorldCard key={w.key} w={w} index={2} fa={fa} />)}"),

 # ---- 2. the deck ----
 ("""        <Rise index={3}>
          <Pressable onPress={() => router.navigate('/literature' as any)}>
            <View style={s.headRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.sectionFa}>ادبیات</Text>
                <Text style={s.sectionT}>{tr(SECTIONS.literature)}</Text>
              </View>
              <View style={s.moreRowTop}>
                <Text style={s.moreT}>All seven</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.accent} />
              </View>
            </View>
          </Pressable>
          <LiteratureCard />
        </Rise>""",
  """        <Rise index={3}>
          <PoetDeck />
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

# sanity: Culture should now sit after the map, and only appear once
i_map = s.find("IranProvinceMap")
i_worlds = s.find("{WORLDS.map(")
print("WORLDS.map occurrences:", s.count("{WORLDS.map("))
print("culture after geography:", i_worlds > i_map)
print("LiteratureCard still referenced:", "LiteratureCard" in s)
