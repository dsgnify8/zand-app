# -*- coding: utf-8 -*-
# Two changes to the learning map.
#
# 1. The dot rail becomes a chapter picker: a pill showing the current
#    stage, tapping opens a sheet listing every stage with its Persian
#    title and progress, tapping one scrolls there. Big targets, and you
#    can see where you are going before you commit.
#
# 2. A visible threshold. 'letters' is the warm-up and keeps the light
#    surface; from 'first-words' on, the stage sits on a deeper tone with
#    a gold marker, so it reads as the point the course proper begins.

p = "app/learn/map.tsx"
s = open(p).read()
did = []

# ---- 1. picker replaces the rail ----
old_rail = """      <View style={s.rail}>
        {STAGES.map((st, i) => (
          <Pressable
            key={st.key}
            hitSlop={6}
            onPress={() => {
              const y = stageOffsets.current[st.key];
              if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated: true });
            }}
          >
            <View style={[s.tick, i === activeStage && s.tickOn]} />
          </Pressable>
        ))}
      </View>"""

new_rail = """      <Pressable style={s.pick} onPress={() => setPickOpen(true)}>
        <Text style={s.pickRoman}>{STAGES[activeStage]?.roman}</Text>
        <Text style={s.pickT} numberOfLines={1}>{STAGES[activeStage]?.title}</Text>
        <Ionicons name="chevron-down" size={14} color={lw.muted} />
      </Pressable>

      {pickOpen ? (
        <Pressable style={s.pickBack} onPress={() => setPickOpen(false)}>
          <View style={s.pickSheet}>
            <Text style={s.pickHead}>{'\\u0641\\u0635\\u0644\\u200c\\u0647\\u0627'}</Text>
            {STAGES.map((st, i) => {
              const total = st.steps.length;
              const done = st.steps.filter((x: any) => stepDone(x)).length;
              const on = i === activeStage;
              return (
                <Pressable
                  key={st.key}
                  style={[s.pickRow, on && s.pickRowOn]}
                  onPress={() => {
                    setPickOpen(false);
                    const y = stageOffsets.current[st.key];
                    if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated: true });
                  }}
                >
                  <Text style={[s.pickRowRoman, on && s.pickRowRomanOn]}>{st.roman}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.pickRowT, on && s.pickRowTOn]}>{st.title}</Text>
                    <Text style={s.pickRowFa}>{st.titleFa}</Text>
                  </View>
                  <Text style={s.pickRowN}>{done}/{total}</Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      ) : null}"""

if old_rail in s:
    s = s.replace(old_rail, new_rail, 1); did.append("picker")

# state for the sheet
if "const [pickOpen" not in s:
    s = s.replace("  const [activeStage", "  const [pickOpen, setPickOpen] = useState(false);\n  const [activeStage", 1)
    did.append("state")

# ---- 2. the threshold ----
old_head = """            <View style={s.stageHead}>
              <View style={s.stageLine} />
              <View style={s.stageLabel}>
                <Art name={STAGE_ART[si % STAGE_ART.length]} size={54} style={{ opacity: 0.55, marginBottom: 2 }} />"""
new_head = """            <View style={[s.stageHead, stage.key !== 'letters' && s.stageHeadCourse]}>
              <View style={s.stageLine} />
              <View style={s.stageLabel}>
                <Art
                  name={STAGE_ART[si % STAGE_ART.length]}
                  size={54}
                  style={{ opacity: stage.key === 'letters' ? 0.55 : 0.85, marginBottom: 2 }}
                />"""
if old_head in s:
    s = s.replace(old_head, new_head, 1); did.append("stage head")

# wrap the stage body in a deeper surface once the course starts
old_wrap = "            onLayout={(e) => { stageOffsets.current[stage.key] = e.nativeEvent.layout.y; }}"
new_wrap = old_wrap + "\n            // the letters stage is the warm-up; everything after sits deeper\n"
if old_wrap in s and "stageCourse" not in s:
    s = s.replace("key={stage.key}", "key={stage.key}\n            style={stage.key !== 'letters' ? s.stageCourse : undefined}", 1)
    did.append("surface")

# ---- styles ----
if "pickSheet:" not in s:
    s = s.replace("  rail: {", """  pick: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, alignSelf: 'center', paddingHorizontal: spacing.lg, paddingVertical: 9, borderRadius: 22, backgroundColor: lw.card, borderWidth: StyleSheet.hairlineWidth, borderColor: lw.rule, marginBottom: spacing.sm, maxWidth: 300 },
  pickRoman: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.4, color: lw.gold },
  pickT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: lw.ink, flexShrink: 1 },
  pickBack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,17,14,0.35)', zIndex: 40, justifyContent: 'flex-start', paddingTop: 130, paddingHorizontal: spacing.lg },
  pickSheet: { backgroundColor: lw.bg, borderRadius: 20, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, borderWidth: StyleSheet.hairlineWidth, borderColor: lw.rule },
  pickHead: { fontFamily: fonts.persian, fontSize: 13, color: lw.muted, textAlign: 'center', marginBottom: spacing.sm },
  pickRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 11, paddingHorizontal: spacing.md, borderRadius: 14 },
  pickRowOn: { backgroundColor: lw.card },
  pickRowRoman: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 1, color: lw.muted, width: 26 },
  pickRowRomanOn: { color: lw.gold },
  pickRowT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: lw.ink },
  pickRowTOn: { color: lw.gold },
  pickRowFa: { fontFamily: fonts.persian, fontSize: 11.5, color: lw.muted, marginTop: 1 },
  pickRowN: { fontFamily: fonts.body, fontSize: 11, color: lw.muted },
  stageCourse: { backgroundColor: 'rgba(24,20,16,0.035)', borderRadius: 22, paddingTop: spacing.sm, paddingBottom: spacing.md, marginTop: spacing.md },
  stageHeadCourse: { marginTop: spacing.xs },
  rail: {""", 1)
    did.append("styles")

open(p, "w").write(s)
print("applied:", " | ".join(did))
