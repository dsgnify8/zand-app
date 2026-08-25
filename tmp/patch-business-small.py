# Four small things on the business pages.
#
# A photo counter in the Airbnb style — 2/5 — replacing the dots. Dots stop
# being countable past four or five, and a listing with six photographs is
# exactly when someone wants to know how far through they are.
#
# The social icons lose their grey tiles: the WhatsApp and Instagram marks
# are already shapes, and putting each in a rounded square makes a row of
# buttons out of what should be a row of logos.
#
# Nearby shows the city rather than a distance. On a listing you reached by
# searching Dubai, "3 km" is measured from wherever you happen to be
# standing, which is not the question being asked.
#
# And the self-listed line goes. Every listing is self-listed; a note
# saying so on all of them says nothing.

total = 0


def sub(s, a, b, label):
    global total
    if a in s:
        total += 1
        return s.replace(a, b, 1)
    print("   skipped:", label)
    return s


# ================================================ 1. the photo counter
p = "components/business-card.tsx"
s = open(p).read()

# find the dots and see what they look like
import re
m = re.search(r"\{shots\.length > 1 \? \([\s\S]{0,600}?\)\s*: null\}", s)
print("dots block found:", bool(m))
if m:
    print("---")
    print(m.group(0)[:400])
    print("---")

open(p, "w").write(s)


# ============================================= 2. the social icons bare
p = "app/(tabs)/business.tsx"
s = open(p).read()

s = sub(s, "  social: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },",
"""  // No tile behind them. These marks are already shapes; a rounded square
  // apiece turns a row of logos into a row of buttons.
  social: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },""",
        "social tile")

s = sub(s, "  socials: { flexDirection: 'row', gap: 8 },",
        "  socials: { flexDirection: 'row', gap: spacing.md },",
        "social gap")

# ==================================== 3. the self-listed line, removed
s = sub(s, """          <Text style={s.selfListed}>{t(LOCAL.selfListed)}</Text>\n""", "", "self listed")
s = sub(s, """<Text style={s.foot}>{t(LOCAL.selfListed)}</Text>\n""", "", "self listed alt")

open(p, "w").write(s)
print("business.tsx: selfListed left:", open(p).read().count("selfListed"))


# ================================================= 4. nearby, by city
p = "components/nearby-places.tsx"
s = open(p).read()

s = sub(s, """                {categoryLabel(x.category, fa)}
                {km != null ? '  ·  ' + (km < 1 ? '<1' : Math.round(km)) + ' km' : ''}""",
"""                {categoryLabel(x.category, fa)}
                {/* The city, not a distance. Someone who found this listing
                    by searching Dubai is not asking how far it is from
                    wherever they happen to be standing. */}
                {x.city ? '  ·  ' + ((fa && x.city_fa) || x.city) : ''}""",
        "nearby meta")

open(p, "w").write(s)
print("\ntotal:", total)
print("\nThe photo dots are printed above — send them and I will write the counter.")
