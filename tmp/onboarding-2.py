# -*- coding: utf-8 -*-
# Onboarding, second pass.
#   1. Type: Poppins Regular, not SemiBold. Thinner and lighter throughout.
#   2. Gradient runs left→right and continues across the three steps, so
#      step 1 begins where step 0 ended. One long horizontal sweep, sliced.
#   3. Cards: smaller, more transparent, tighter.
#   4. Language boxes: equal fixed height, and a real selected state.
#   5. Form fields: more transparent, more frosted.

p = "app/onboarding.tsx"
s = open(p).read()
did = []

# ---- 1. lighter type ----
TYPE = [
 ("title: { fontFamily: fonts.bodyStrong, fontSize: 33, lineHeight: 43, letterSpacing: -0.6, color: colors.textPrimary, marginTop: spacing.sm }",
  "title: { fontFamily: fonts.body, fontSize: 30, lineHeight: 41, letterSpacing: -0.8, color: colors.textPrimary, marginTop: spacing.sm }"),
 ("formTitle: { fontFamily: fonts.bodyStrong, fontSize: 29, lineHeight: 38, letterSpacing: -0.5, color: colors.textPrimary }",
  "formTitle: { fontFamily: fonts.body, fontSize: 27, lineHeight: 36, letterSpacing: -0.7, color: colors.textPrimary }"),
 ("rowT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, letterSpacing: -0.2, color: colors.textPrimary }",
  "rowT: { fontFamily: fonts.body, fontSize: 14, letterSpacing: -0.1, color: colors.textPrimary }"),
 ("langNative: { fontFamily: fonts.bodyStrong, fontSize: 19, letterSpacing: -0.3, color: colors.textPrimary }",
  "langNative: { fontFamily: fonts.body, fontSize: 18, letterSpacing: -0.2, color: colors.textPrimary }"),
]
n = 0
for a, b in TYPE:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("type " + str(n) + "/" + str(len(TYPE)))

# ---- 2. one horizontal sweep, sliced per step ----
old = """colors={
          step === 0
            ? ['#FDFBF7', '#F7F1E7', '#EFE5D5']
            : step === 1
            ? ['#F9F3E9', '#EDE0CC', '#DFCFB4']
            : ['#F3EADD', '#E2D2B9', '#CDB899']
        }"""
new = """colors={
          step === 0
            ? ['#FDFBF7', '#F8F2E9', '#F2EADC']
            : step === 1
            ? ['#F2EADC', '#EADFCB', '#DFD0B6']
            : ['#DFD0B6', '#D2BF9F', '#C2AB87']
        }
        start={{ x: 0, y: 0.15 }}
        end={{ x: 1, y: 0.85 }}"""
if old in s:
    s = s.replace(old, new, 1); did.append("gradient")

# ---- 3. cards smaller and more transparent ----
CARD = [
 ("frost: { borderRadius: 28, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.42)' }",
  "frost: { borderRadius: 24, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.16)' }"),
 ("frostTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.46)' }",
  "frostTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.18)' }"),
 ("frostEdge: { ...StyleSheet.absoluteFillObject, borderRadius: 28, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.9)' }",
  "frostEdge: { ...StyleSheet.absoluteFillObject, borderRadius: 24, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.55)' }"),
 ("frostInner: { padding: spacing.lg + 2 }",
  "frostInner: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }"),
 ("row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md + 2 }",
  "row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm + 4 }"),
 ("rowIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.82)', alignItems: 'center', justifyContent: 'center' }",
  "rowIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' }"),
 ("rowX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textSecondary, marginTop: 3, opacity: 0.85 }",
  "rowX: { fontFamily: fonts.body, fontSize: 11.5, lineHeight: 17, color: colors.textSecondary, marginTop: 2, opacity: 0.8 }"),
 ("card: { marginTop: spacing.xxl }",
  "card: { marginTop: spacing.xl, maxWidth: 340 }"),
]
n = 0
for a, b in CARD:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("cards " + str(n) + "/" + str(len(CARD)))

# ---- 4. equal-height language boxes with a selected state ----
LANG = [
 ("langCard: { paddingVertical: spacing.lg + 4, paddingHorizontal: spacing.sm, alignItems: 'center', justifyContent: 'center', minHeight: 104 }",
  "langCard: { height: 108, paddingHorizontal: spacing.sm, alignItems: 'center', justifyContent: 'center' }"),
 ("langOn: { color: colors.accent }",
  "langOn: { color: colors.accent },\n  langWrapOn: { transform: [{ scale: 1.03 }] },\n  langEdgeOn: { ...StyleSheet.absoluteFillObject, borderRadius: 24, borderWidth: 1.5, borderColor: colors.accent, opacity: 0.55 }"),
]
n = 0
for a, b in LANG:
    if a in s: s = s.replace(a, b, 1); n += 1

a = """<Frosted style={s.langCard} intensity={on ? 50 : 22}>"""
b = """<View style={on ? s.langWrapOn : undefined}>
                          <Frosted style={s.langCard} intensity={on ? 60 : 18}>"""
if a in s:
    s = s.replace(a, b, 1)
    s = s.replace("""                          </Frosted>
                          {on ? (""",
                  """                          </Frosted>
                          {on ? <View style={s.langEdgeOn} pointerEvents="none" /> : null}
                          </View>
                          {on ? (""", 1)
    n += 1
did.append("langs " + str(n) + "/3")

# ---- 5. more transparent, more frosted fields ----
FIELD = [
 ("field: { borderRadius: 18, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(255,255,255,0.38)' }",
  "field: { borderRadius: 18, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.14)' }"),
 ("fieldTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.3)' }",
  "fieldTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.16)' }"),
]
n = 0
for a, b in FIELD:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("fields " + str(n) + "/" + str(len(FIELD)))

open(p, "w").write(s)
print("applied:", " | ".join(did))
