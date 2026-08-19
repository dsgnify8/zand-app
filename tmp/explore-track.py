# -*- coding: utf-8 -*-
# Two changes.
#
#   1. The timeline becomes a track that runs across the screen, turns,
#      and comes back — so twenty-five centuries fit in one view instead
#      of two scrolls. Nine eras rather than fourteen: a track you can
#      read beats a complete list you cannot.
#
#   2. Geography moves up to fourth, after Culture, and the cards after
#      it follow.

import re

p = "app/(tabs)/explore.tsx"
s = open(p).read()
did = []

# ---- the serpentine track ----
old = re.search(r"function HistoryTrack\(\) \{[\s\S]*?\n\}\n", s)
new = '''// Nine eras, laid on a path that runs right, drops, runs left, drops,
// and finishes right. Everything at a glance, in the order it happened.
const ERAS = [
  { key: 'cyrus-the-great', short: 'Achaemenid', years: '550 BCE' },
  { key: 'parthian-empire', short: 'Parthian', years: '247 BCE' },
  { key: 'sasanian-empire', short: 'Sasanian', years: '224 CE' },
  { key: 'two-centuries-silence', short: 'The silence', years: '651' },
  { key: 'seljuk-empire', short: 'Seljuk', years: '1037' },
  { key: 'safavid-empire', short: 'Safavid', years: '1501' },
  { key: 'zand-dynasty', short: 'Zand', years: '1751' },
  { key: 'qajar-dynasty', short: 'Qajar', years: '1789' },
  { key: 'modern-iran', short: 'Now', years: '1979' },
];

const PER_ROW = 3;

function HistoryTrack() {
  const rows: typeof ERAS[] = [];
  for (let i = 0; i < ERAS.length; i += PER_ROW) rows.push(ERAS.slice(i, i + PER_ROW));

  return (
    <View style={s.track}>
      {rows.map((row, r) => {
        // every other row runs the other way, so the path is continuous
        const reversed = r % 2 === 1;
        const cells = reversed ? [...row].reverse() : row;
        return (
          <View key={r} style={s.trackRow}>
            <View style={s.rowLine} />
            {/* the turn at the end of each row, except the last */}
            {r < rows.length - 1 ? (
              <View style={[s.turn, reversed ? s.turnL : s.turnR]} />
            ) : null}

            <View style={[s.rowInner, reversed && { flexDirection: 'row-reverse' }]}>
              {cells.map((e) => (
                <Pressable
                  key={e.key}
                  style={s.stop}
                  onPress={() => router.navigate(('/education/topic?topic=' + e.key) as any)}
                >
                  <View style={s.stopDot} />
                  <Text style={s.stopYear} numberOfLines={1}>{e.years}</Text>
                  <Text style={s.stopName} numberOfLines={1}>{e.short}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}
'''
if old:
    s = s[:old.start()] + new + s[old.end():]
    did.append("serpentine track")

# ---- geography to fourth ----
geo = re.search(r"        \{/\* Geography: the map itself, on the page\. \*/\}\n        <Rise index=\{WORLDS\.length \+ 1\}>[\s\S]*?\n        </Rise>\n", s)
if geo:
    block = geo.group(0).replace("index={WORLDS.length + 1}", "index={4}")
    s = s[:geo.start()] + s[geo.end():]
    # cards one to three, then geography, then the rest
    a = "        {WORLDS.map((w, i) => <WorldCard key={w.key} w={w} index={i + 1} fa={fa} />)}"
    b = ("        {WORLDS.slice(0, 3).map((w, i) => <WorldCard key={w.key} w={w} index={i + 1} fa={fa} />)}\n\n"
         + block + "\n"
         + "        {WORLDS.slice(3).map((w, i) => <WorldCard key={w.key} w={w} index={i + 5} fa={fa} />)}")
    if a in s:
        s = s.replace(a, b, 1); did.append("geography moved to fourth")

# ---- styles for the track ----
old_styles = re.search(r"  track: \{[\s\S]*?  rightText: \{[^\n]*\n", s)
new_styles = """  track: { paddingVertical: spacing.sm },
  trackRow: { height: 74, justifyContent: 'center' },
  rowLine: { position: 'absolute', left: 14, right: 14, top: 14, height: 2, backgroundColor: 'rgba(140,58,46,0.16)', borderRadius: 1 },
  turn: { position: 'absolute', top: 14, width: 28, height: 60, borderColor: 'rgba(140,58,46,0.16)', borderWidth: 2, borderTopWidth: 0 },
  turnR: { right: 0, borderLeftWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 26 },
  turnL: { left: 0, borderRightWidth: 0, borderBottomLeftRadius: 26 },
  rowInner: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 22 },
  stop: { alignItems: 'center', width: 92 },
  stopDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#8C3A2E', marginTop: 10, marginBottom: 8 },
  stopYear: { fontFamily: fonts.body, fontSize: 9.5, letterSpacing: 0.3, color: colors.textSecondary },
  stopName: { fontFamily: fonts.bodyStrong, fontSize: 11.5, color: colors.textPrimary, marginTop: 1 },
"""
if old_styles:
    s = s[:old_styles.start()] + new_styles + s[old_styles.end():]
    did.append("track styles")

s = s.replace("<Text style={s.sectionX}>Twenty-five centuries. Follow it down.</Text>",
              "<Text style={s.sectionX}>Twenty-five centuries, in the order they happened.</Text>", 1)

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
