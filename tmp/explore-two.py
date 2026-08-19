# -*- coding: utf-8 -*-
# Two sections that stop being cards.
#
# Geography becomes the province map itself, sitting on the page with a
# line beside it. Nothing to tap through to — the thing is right there.
#
# History becomes a track running down the page, era after era, so
# scrolling through it is scrolling through time. A horizontal strip
# inside a card asked people to scroll sideways inside a page that
# scrolls down, which is a small fight nobody should have to have.

import re

p = "app/(tabs)/explore.tsx"
s = open(p).read()
did = []

# ---- the descending timeline ----
old_strip = re.search(r"function HistoryStrip\(\) \{[\s\S]*?\n\}\n", s)
new_strip = '''function HistoryTrack() {
  const picks = HISTORY_TOPICS as any[];
  return (
    <View style={s.track}>
      {/* the road itself, behind everything */}
      <View style={s.trackLine} />

      {picks.map((tpc: any, i: number) => {
        const left = i % 2 === 0;
        return (
          <Pressable
            key={tpc.key}
            style={[s.stop, left ? s.stopL : s.stopR]}
            onPress={() => router.navigate(('/education/topic?topic=' + tpc.key) as any)}
          >
            <View style={[s.stopDot, left ? s.dotL : s.dotR]} />
            <Text style={s.stopYear} numberOfLines={1}>{tpc.years ?? ''}</Text>
            <Text style={[s.stopName, left ? null : s.rightText]} numberOfLines={2}>{tpc.name}</Text>
            <Text style={[s.stopFa, left ? null : s.rightText]} numberOfLines={1}>{tpc.nameFa ?? tpc.persian ?? ''}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
'''
if old_strip:
    s = s[:old_strip.start()] + new_strip + s[old_strip.end():]
    s = s.replace("{w.preview === 'history' ? <HistoryStrip /> : null}", "")
    did.append("timeline")

# ---- history stops being a card ----
a = """  { key: 'history', title: 'History', titleT: SECTIONS.history, persian: 'تاریخ',
    blurb: 'Twenty-five centuries, from Cyrus to now.',
    image: 'cyrus-cover', route: '/education/history', tint: '#8C3A2E', preview: 'history' },
"""
if a in s:
    s = s.replace(a, "", 1); did.append("history out of the card list")

# ---- geography stops being a card ----
b = """  { key: 'geography', title: 'Geography', titleT: SECTIONS.geography, persian: 'جغرافیا',
    blurb: 'The land itself, and where it put people.',
    image: 'geo-cover', route: '/geography', tint: '#4F6B39' },
"""
if b in s:
    s = s.replace(b, "", 1); did.append("geography out of the card list")

# ---- both placed in the page, in order ----
a2 = "        {WORLDS.map((w, i) => <WorldCard key={w.key} w={w} index={i} fa={fa} />)}"
b2 = """        {/* History: a road down the page rather than a card to open. */}
        <Rise index={0}>
          <View style={s.sectionHead}>
            <Text style={s.sectionFa}>تاریخ</Text>
            <Text style={s.sectionT}>{tr(SECTIONS.history)}</Text>
            <Text style={s.sectionX}>Twenty-five centuries. Follow it down.</Text>
          </View>
          <HistoryTrack />
          <Pressable style={s.moreRow} onPress={() => router.navigate('/education/history' as any)}>
            <Text style={s.moreT}>All of it, properly</Text>
            <Ionicons name="arrow-forward" size={13} color={colors.accent} />
          </Pressable>
        </Rise>

        {WORLDS.map((w, i) => <WorldCard key={w.key} w={w} index={i + 1} fa={fa} />)}

        {/* Geography: the map itself, on the page. */}
        <Rise index={WORLDS.length + 1}>
          <View style={s.sectionHead}>
            <Text style={s.sectionFa}>جغرافیا</Text>
            <Text style={s.sectionT}>{tr(SECTIONS.geography)}</Text>
            <Text style={s.sectionX}>Thirty-one provinces. Touch one.</Text>
          </View>
          <View style={s.mapWrap}>
            <IranProvinceMap />
          </View>
          <Pressable style={s.moreRow} onPress={() => router.navigate('/geography' as any)}>
            <Text style={s.moreT}>The land, in full</Text>
            <Ionicons name="arrow-forward" size={13} color={colors.accent} />
          </Pressable>
        </Rise>"""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("placed")

# ---- a shared rise, since sections are no longer only cards ----
if "function Rise(" not in s:
    s = s.replace("function WorldCard(", """function Rise({ children, index }: { children: any; index: number }) {
  const rise = useRef(new Animated.Value(22)).current;
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(rise, { toValue: 0, duration: 520, delay: 90 + index * 80, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 520, delay: 90 + index * 80, useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>{children}</Animated.View>;
}

function WorldCard(""", 1)
    did.append("rise")

# ---- styles ----
if "trackLine:" not in s:
    s = s.replace("  card: { borderRadius: 20,", """  sectionHead: { marginBottom: spacing.md },
  sectionFa: { fontFamily: fonts.persian, fontSize: 15, color: colors.accent },
  sectionT: { fontFamily: fonts.display, fontSize: 26, lineHeight: 31, color: colors.textPrimary, marginTop: 1 },
  sectionX: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textSecondary, marginTop: 3 },

  track: { paddingVertical: spacing.sm },
  trackLine: { position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, marginLeft: -1, backgroundColor: 'rgba(140,58,46,0.16)' },
  stop: { width: '46%', paddingVertical: 11 },
  stopL: { alignSelf: 'flex-start', paddingRight: spacing.md },
  stopR: { alignSelf: 'flex-end', paddingLeft: spacing.md },
  stopDot: { position: 'absolute', top: 17, width: 9, height: 9, borderRadius: 5, backgroundColor: '#8C3A2E' },
  dotL: { right: -4.5 },
  dotR: { left: -4.5 },
  stopYear: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 0.4, color: colors.textSecondary },
  stopName: { fontFamily: fonts.bodyStrong, fontSize: 13.5, lineHeight: 18, color: colors.textPrimary, marginTop: 1 },
  stopFa: { fontFamily: fonts.persian, fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  rightText: { textAlign: 'right' },

  mapWrap: { borderRadius: 20, overflow: 'hidden', backgroundColor: 'rgba(79,107,57,0.06)', paddingVertical: spacing.sm },

  moreRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', marginTop: spacing.md },
  moreT: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.accent },

  card: { borderRadius: 20,""", 1)
    did.append("styles")

# ---- the map component ----
if "IranProvinceMap" not in s.split("export default")[0]:
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { IranProvinceMap } from '@/components/iran-province-map';\n" + s[last.end():]

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
