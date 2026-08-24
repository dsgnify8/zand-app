# Two edits.
#
#   1. founder-flip: the story face gets a tinted frosted wash instead of
#      sitting on flat paper, so the two sides of the card read as different
#      surfaces rather than the same page with different text.
#   2. explore: the language grid becomes the outlined letter card.

# ------------------------------------------------------------------ 1
p = "components/founder-flip.tsx"
s = open(p).read()

F = [
 # the wash sits under the content, inside the clipped card
 ("""        <View style={[st.inner, fa && { alignItems: 'flex-end' }]}>""",
  """        {/* A warm wash over the paper, strongest at the top, plus an inset
            hairline. The story should feel like a different surface to the
            listing, not the same page with other words on it. */}
        <View pointerEvents="none" style={st.frost} />
        <View pointerEvents="none" style={st.frostEdge} />

        <View style={[st.inner, fa && { alignItems: 'flex-end' }]}>"""),

 ("  back: { position: 'absolute', top: 0, left: 0, right: 0 },",
  "  back: { position: 'absolute', top: 0, left: 0, right: 0 },\n"
  "  frost: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(140,58,46,0.055)' },\n"
  "  frostEdge: {\n"
  "    position: 'absolute',\n"
  "    top: 10,\n"
  "    left: 10,\n"
  "    right: 10,\n"
  "    bottom: 10,\n"
  "    borderRadius: 16,\n"
  "    borderWidth: StyleSheet.hairlineWidth,\n"
  "    borderColor: 'rgba(140,58,46,0.13)',\n"
  "  },"),
]

fa_, fs = 0, []
for a, b in F:
    if a in s:
        s = s.replace(a, b, 1); fa_ += 1
    else:
        fs.append(a.strip().splitlines()[0][:60])
open(p, "w").write(s)
print("founder:", fa_, "of", len(F))
for k in fs:
    print("   skipped:", k)

# ------------------------------------------------------------------ 2
p2 = "app/(tabs)/explore.tsx"
t = open(p2).read()

E = [
 ("import { TraditionsWheel } from '@/components/traditions-wheel';",
  "import { TraditionsWheel } from '@/components/traditions-wheel';\n"
  "import { LanguageCard } from '@/components/language-card';"),

 ("""        <Rise index={6}>
          <Pressable onPress={() => router.navigate('/language' as any)}>
            <View style={s.headRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.sectionFa}>زبان</Text>
                <Text style={s.sectionT}>{tr(SECTIONS.language)}</Text>
              </View>
              <View style={s.moreRowTop}>
                <Text style={s.moreT}>Where it came from</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.accent} />
              </View>
            </View>
            <Text style={s.sectionX}>Older than the script it is written in, and further travelled than you would think.</Text>
          </Pressable>
          <LanguageBorrowed />
        </Rise>""",
  """        <Rise index={6}>
          <LanguageCard />
        </Rise>"""),
]

ea, es = 0, []
for a, b in E:
    if a in t:
        t = t.replace(a, b, 1); ea += 1
    else:
        es.append(a.strip().splitlines()[0][:60])
open(p2, "w").write(t)
print("explore:", ea, "of", len(E))
for k in es:
    print("   skipped:", k)

print("LanguageBorrowed still rendered:", "<LanguageBorrowed />" in t)
print("LanguageCard rendered:", "<LanguageCard />" in t)
