# -*- coding: utf-8 -*-
# Onboarding redesign.
#   1. Gradient deepens with each step — light beige at step 0, dusk by the
#      account screen. Same warm family throughout so it reads as one arc.
#   2. Titles move from Cormorant (display serif) to Poppins SemiBold —
#      the "less classy, more rounded modern" shift. Wordmark stays serif.
#   3. Cards: larger radius, softer fill, hairline border, more padding.
#   4. Language boxes: smaller, squarer, native script as the hero.

import re

p = "app/onboarding.tsx"
s = open(p).read()
did = []

# ---- 1. gradient per step ----
old_grad = "colors={['#FBF8F3', '#F2EBDF', '#EDE4D6']}"
new_grad = """colors={
          step === 0
            ? ['#FDFBF7', '#F7F1E7', '#EFE5D5']
            : step === 1
            ? ['#F9F3E9', '#EDE0CC', '#DFCFB4']
            : ['#F3EADD', '#E2D2B9', '#CDB899']
        }"""
if old_grad in s:
    s = s.replace(old_grad, new_grad, 1); did.append("gradient")

# ---- 2. type ----
TYPE = [
 ("title: { fontFamily: fonts.heading, fontSize: 40, lineHeight: 46, color: colors.textPrimary, marginTop: spacing.sm }",
  "title: { fontFamily: fonts.bodyStrong, fontSize: 33, lineHeight: 43, letterSpacing: -0.6, color: colors.textPrimary, marginTop: spacing.sm }"),
 ("formTitle: { fontFamily: fonts.heading, fontSize: 34, lineHeight: 40, color: colors.textPrimary }",
  "formTitle: { fontFamily: fonts.bodyStrong, fontSize: 29, lineHeight: 38, letterSpacing: -0.5, color: colors.textPrimary }"),
 ("blurb: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 23, color: colors.textSecondary, marginTop: spacing.md, maxWidth: 320 }",
  "blurb: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 25, color: colors.textSecondary, marginTop: spacing.sm, maxWidth: 320, opacity: 0.9 }"),
 ("rowT: { fontFamily: fonts.body, fontSize: 15, color: colors.textPrimary }",
  "rowT: { fontFamily: fonts.bodyStrong, fontSize: 14.5, letterSpacing: -0.2, color: colors.textPrimary }"),
 ("rowX: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 }",
  "rowX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: colors.textSecondary, marginTop: 3, opacity: 0.85 }"),
]
n = 0
for a, b in TYPE:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("type " + str(n) + "/" + str(len(TYPE)))

# ---- 3. softer cards ----
CARD = [
 ("frost: { borderRadius: 22, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.28)' }",
  "frost: { borderRadius: 28, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.42)' }"),
 ("frostTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.34)' }",
  "frostTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.46)' }"),
 ("frostEdge: { ...StyleSheet.absoluteFillObject, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }",
  "frostEdge: { ...StyleSheet.absoluteFillObject, borderRadius: 28, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.9)' }"),
 ("frostInner: { padding: spacing.lg }",
  "frostInner: { padding: spacing.lg + 2 }"),
 ("rowIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.75)', alignItems: 'center', justifyContent: 'center' }",
  "rowIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.82)', alignItems: 'center', justifyContent: 'center' }"),
 ("row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md }",
  "row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md + 2 }"),
]
n = 0
for a, b in CARD:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("cards " + str(n) + "/" + str(len(CARD)))

# ---- 4. language boxes ----
LANG = [
 ("langs: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl }",
  "langs: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, maxWidth: 330 }"),
 ("langCard: { paddingVertical: spacing.xl, alignItems: 'center' }",
  "langCard: { paddingVertical: spacing.lg + 4, paddingHorizontal: spacing.sm, alignItems: 'center', justifyContent: 'center', minHeight: 104 }"),
 ("langNative: { fontFamily: fonts.body, fontSize: 20, color: colors.textPrimary }",
  "langNative: { fontFamily: fonts.bodyStrong, fontSize: 19, letterSpacing: -0.3, color: colors.textPrimary }"),
 ("langFa: { fontFamily: fonts.persian, fontSize: 25 }",
  "langFa: { fontFamily: fonts.persian, fontSize: 24, lineHeight: 38 }"),
 ("langLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 4 }",
  "langLabel: { fontFamily: fonts.body, fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', color: colors.textSecondary, marginTop: 6, opacity: 0.8 }"),
 ("tick: { position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }",
  "tick: { position: 'absolute', top: 9, right: 9, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }"),
]
n = 0
for a, b in LANG:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("langs " + str(n) + "/" + str(len(LANG)))

# ---- 5. field pills, to match ----
FIELD = [
 ("field: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.24)' }",
  "field: { borderRadius: 18, overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(255,255,255,0.38)' }"),
 ("fieldTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.3)' }",
  "fieldTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.42)' }"),
]
n = 0
for a, b in FIELD:
    if a in s: s = s.replace(a, b, 1); n += 1
did.append("fields " + str(n) + "/" + str(len(FIELD)))

open(p, "w").write(s)
print("applied:", " | ".join(did))
