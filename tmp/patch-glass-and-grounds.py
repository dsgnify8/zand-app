# Four edits across five files.
#
#   1. founder-flip: the wash becomes glass rather than tint.
#   2. history-chapters: smaller discs.
#   3. poet-deck + traditions-wheel: a soft ground under the two sections
#      that would otherwise float.
#   4. every section: the Latin small-caps eyebrow is hidden in Persian.
#      Persian has no capitals and small caps are a Latin device — a
#      "LITERATURE" label above a Persian title is the tell that a page was
#      built in English first.

total, misses = 0, []


def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            misses.append(path.split("/")[-1] + ": " + a.strip().splitlines()[0][:52])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# ---------------------------------------------------------------- 1. glass
edit("components/founder-flip.tsx", [
 ("import { colors, fonts, radius, spacing } from '@/constants/zand-theme';",
  "import { LinearGradient } from 'expo-linear-gradient';\n\n"
  "import { colors, fonts, radius, spacing } from '@/constants/zand-theme';"),

 ("""        <View pointerEvents="none" style={st.frost} />
        <View pointerEvents="none" style={st.frostEdge} />""",
  """        <View pointerEvents="none" style={st.frost} />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(255,255,255,0.66)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']}
          locations={[0, 0.42, 1]}
          style={StyleSheet.absoluteFill as any}
        />
        <View pointerEvents="none" style={st.frostEdge} />"""),

 ("  frost: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(140,58,46,0.055)' },",
  "  // Glass is a lift, not a tint. Garnet over cream reads pink at every\n"
  "  // opacity there is, so the veil is cool and near-neutral instead, and the\n"
  "  // sheen above it does the rest of the work.\n"
  "  frost: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(247,246,245,0.80)' },"),

 ("    borderColor: 'rgba(140,58,46,0.13)',",
  "    borderColor: 'rgba(255,255,255,0.70)',"),
])

# ------------------------------------------------------- 2. smaller discs
edit("components/history-chapters.tsx", [
 ("const RADII = [42, 35, 42, 33];", "const RADII = [36, 30, 36, 28];"),
 ("        <Text style={[st.eyebrow, fa && st.rtl]}>{fa ? 'HISTORY' : 'تاریخ'}</Text>",
  "        {!fa ? <Text style={st.eyebrow}>تاریخ</Text> : null}"),
])

# --------------------------------------------------- 3 + 4. deck and wheel
edit("components/poet-deck.tsx", [
 ("import { colors, fonts } from '@/constants/zand-theme';",
  "import { colors, fonts } from '@/constants/zand-theme';\n"
  "import { SectionBand } from '@/components/section-band';"),

 ("    <View style={[st.row, fa && { flexDirection: 'row-reverse' }]} onLayout={onLayout}>",
  "    <View style={[st.row, fa && { flexDirection: 'row-reverse' }]} onLayout={onLayout}>\n"
  "      {/* Cards and a column of type, with nothing else holding them down. */}\n"
  "      <SectionBand top={44} bottom={44} />"),

 ("          <Text style={[st.eyebrow, fa && st.rtl]}>{fa ? 'LITERATURE' : 'ادبیات'}</Text>",
  "          {!fa ? <Text style={st.eyebrow}>ادبیات</Text> : null}"),
])

edit("components/traditions-wheel.tsx", [
 ("import { colors, fonts } from '@/constants/zand-theme';",
  "import { colors, fonts } from '@/constants/zand-theme';\n"
  "import { SectionBand } from '@/components/section-band';"),

 ("    <View style={st.wrap} onLayout={onLayout}>",
  "    <View style={st.wrap} onLayout={onLayout}>\n"
  "      {/* A disc on open paper needs something under it. */}\n"
  "      <SectionBand top={30} bottom={40} />"),

 ("            <Text style={[st.nameEn, { color: GOLD }]}>NOWRUZ</Text>",
  "            {!fa ? <Text style={[st.nameEn, { color: GOLD }]}>NOWRUZ</Text> : null}"),

 ("            <Text style={[st.nameEn, { color: PURPLE }]}>YALDA</Text>",
  "            {!fa ? <Text style={[st.nameEn, { color: PURPLE }]}>YALDA</Text> : null}"),
])

# ------------------------------------------------------------ 4. the rest
edit("components/culture-quote.tsx", [
 ("        <Text style={[st.eyebrow, fa && st.rtl]}>{fa ? 'CULTURE' : 'فرهنگ'}</Text>",
  "        {!fa ? <Text style={st.eyebrow}>فرهنگ</Text> : null}"),
 ("            <Text style={[st.panelFa, fa && st.rtl]}>{fa ? 'CULTURE' : 'فرهنگ'}</Text>",
  "            {!fa ? <Text style={st.panelFa}>فرهنگ</Text> : null}"),
])

edit("components/language-card.tsx", [
 ("          <Text style={[st.eyebrow, fa && st.rtl]}>{fa ? 'LANGUAGE' : 'زبان'}</Text>",
  "          {!fa ? <Text style={st.eyebrow}>زبان</Text> : null}"),
])

print("\ntotal applied:", total)
for m in misses:
    print("   skipped:", m)
