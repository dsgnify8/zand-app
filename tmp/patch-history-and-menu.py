# Three edits.
#
#   1. history-chapters: chapter titles down a couple of points.
#   2. history-chapters: circles 02 and 04 drawn smaller than 01 and 03, so
#      the track has some rhythm instead of four identical discs. The radius
#      becomes per-chapter, which the text zone and the press target both
#      have to read from rather than the old constant.
#   3. explore: the world menu moves out of the SafeAreaView and into the
#      header, where it lines up with the title by construction.

import io

# ---------------------------------------------------------------- history
p = "components/history-chapters.tsx"
s = open(p).read()

H = [
 # per-chapter radius
 ("const CIRCLE_R = 42;",
  "const CIRCLE_R = 42;\n"
  "// 02 and 04 run smaller, so the track has a rhythm rather than four\n"
  "// identical discs. Index matches CHAPTERS.\n"
  "const RADII = [42, 35, 42, 33];"),

 # circle centre uses this chapter's radius
 ("        const cx = X(i % 2 === 0 ? L + CIRCLE_R : Rt - CIRCLE_R);",
  "        const r = RADII[i] ?? CIRCLE_R;\n"
  "        const cx = X(i % 2 === 0 ? L + r : Rt - r);"),

 # text zone clears the circle it actually sits beside
 ("        const zoneStart = leftSide ? cx + CIRCLE_R + 18 : SPINE_X + 4;",
  "        const zoneStart = leftSide ? cx + r + 18 : SPINE_X + 4;"),

 ("          leftSide ? W - SPINE_X - 4 - zoneStart : cx - CIRCLE_R - 18 - zoneStart",
  "          leftSide ? W - SPINE_X - 4 - zoneStart : cx - r - 18 - zoneStart"),

 # the disc itself
 ("""                left: cx - CIRCLE_R,
                top: cy - CIRCLE_R,
                width: CIRCLE_R * 2,
                height: CIRCLE_R * 2,""",
  """                left: cx - r,
                top: cy - r,
                width: r * 2,
                height: r * 2,"""),

 ("""                  width: CIRCLE_R * 2,
                  height: CIRCLE_R * 2,
                  borderRadius: CIRCLE_R,""",
  """                  width: r * 2,
                  height: r * 2,
                  borderRadius: r,"""),

 # the number sits above whichever disc this is
 ("                  top: cy - CIRCLE_R - 20,",
  "                  top: cy - r - 20,"),

 # titles a touch smaller
 ("  chapter: { fontFamily: fonts.heading, fontSize: 21, color: colors.textPrimary, letterSpacing: -0.2 },",
  "  chapter: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary, letterSpacing: -0.2 },"),
]

ha, hs = 0, []
for a, b in H:
    if a in s:
        s = s.replace(a, b, 1); ha += 1
    else:
        hs.append(a.strip().splitlines()[0][:64])
open(p, "w").write(s)
print("history:", ha, "of", len(H))
for k in hs:
    print("   skipped:", k)

# ---------------------------------------------------------------- explore
p2 = "app/(tabs)/explore.tsx"
t = open(p2).read()

E = [
 # out of the safe area
 ("      </Animated.ScrollView>\n\n      <WorldMenu />\n    </SafeAreaView>",
  "      </Animated.ScrollView>\n    </SafeAreaView>"),

 # into the header. box-none so the title stays untouchable but the menu
 # inside it can still take a press.
 ('        <View style={s.header} pointerEvents="none">',
  '        <View style={s.header} pointerEvents="box-none">\n'
  '          <WorldMenu />'),
]

ea, es = 0, []
for a, b in E:
    if a in t:
        t = t.replace(a, b, 1); ea += 1
    else:
        es.append(a.strip().splitlines()[0][:64])
open(p2, "w").write(t)
print("explore:", ea, "of", len(E))
for k in es:
    print("   skipped:", k)

print("menu inside header:", '<View style={s.header} pointerEvents="box-none">\n          <WorldMenu />' in t)
print("WorldMenu count:", t.count("<WorldMenu />"))
