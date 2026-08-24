# Put the founder story on the back of the white card.
#
# FounderFlip takes over the card's own styling (the -22 lap over the photo
# and the rounded top corners), so s.body loses those and keeps only its
# padding — otherwise the corners and the overlap render twice.
#
# The card is wrapped rather than rebuilt: everything currently inside
# s.body becomes the front face untouched.

p = "app/business.tsx"
s = open(p).read()

applied, skipped = 0, []

# ---- 1. import ------------------------------------------------------
a = "import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';"
b = a + "\nimport { FounderFlip } from '@/components/founder-flip';"
if a in s:
    s = s.replace(a, b, 1); applied += 1
else:
    skipped.append("import anchor")

# ---- 2. open the flip ----------------------------------------------
a = "        <View style={s.body}>"
b = ("        <FounderFlip name={name} city={(fa && b.city_fa) || b.city} fa={fa}>\n"
     "          <View style={s.body}>")
if a in s:
    s = s.replace(a, b, 1); applied += 1
else:
    skipped.append("s.body open")

# ---- 3. close it ----------------------------------------------------
a = "        </View>\n      </Animated.ScrollView>"
b = "          </View>\n        </FounderFlip>\n      </Animated.ScrollView>"
if a in s:
    s = s.replace(a, b, 1); applied += 1
else:
    skipped.append("s.body close")

# ---- 4. the card chrome moves to the flip ---------------------------
a = "  body: { padding: spacing.lg, marginTop: -22, borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor: colors.background },"
b = ("  // The lap over the photo and the rounded top now belong to FounderFlip,\n"
     "  // which is the card; this is just its front face.\n"
     "  body: { padding: spacing.lg, backgroundColor: colors.background },")
if a in s:
    s = s.replace(a, b, 1); applied += 1
else:
    skipped.append("s.body style")

open(p, "w").write(s)
print("applied", applied, "of 4")
for k in skipped:
    print("   skipped:", k)

print("FounderFlip opened:", s.count("<FounderFlip"))
print("FounderFlip closed:", s.count("</FounderFlip>"))
