# The Geography block on Explore.
#
# Three strings still written inline: the "in full" link, the description,
# and the hint under the province map. The eyebrow and title already resolve
# because they come from SECTIONS.
#
# They go into explore.ts, which already owns this page's copy.

total = 0

# ------------------------------------------------------------- the keys
p = "constants/i18n/explore.ts"
s = open(p).read()

if "geoInFull" not in s:
    # append before the closing brace of the exported object
    i = s.rstrip().rfind("}")
    add = """  geoInFull: { en: 'The land, in full', fa: 'تمام سرزمین' },
  geoBlurb: {
    en: 'Where the country sits, what the land did to it, and why the cities are where they are.',
    fa: 'این کشور کجا نشسته، زمین با آن چه کرده، و چرا شهرها همان‌جایی هستند که هستند.',
  },
  touchProvince: { en: 'Touch a province', fa: 'روی یک استان بزن' },
"""
    s = s[:i] + add + s[i:]
    open(p, "w").write(s)
    total += 1
    print("explore.ts: keys added")
else:
    print("explore.ts: keys already present")

# ----------------------------------------------------------- the block
p = "app/(tabs)/explore.tsx"
s = open(p).read()
for a, b in [
    ("<Text style={s.moreT}>The land, in full</Text>",
     "<Text style={s.moreT}>{tr(EXPLORE.geoInFull)}</Text>"),
    ("<Text style={s.sectionX}>Where the country sits, what the land did to it, and why the cities are where they are.</Text>",
     "<Text style={s.sectionX}>{tr(EXPLORE.geoBlurb)}</Text>"),
]:
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", a[:56])

# explore imports t as tr; make sure EXPLORE is available
if "constants/i18n/explore" not in s:
    import re
    last = None
    for im in re.finditer(r"^import .*?;\s*$", s, re.M):
        last = im
    s = s[: last.end()] + "\nimport { EXPLORE } from '@/constants/i18n/explore';" + s[last.end():]
    print("EXPLORE imported")
open(p, "w").write(s)
print("explore.tsx done")

# -------------------------------------------------------- the map hint
p = "components/iran-province-map.tsx"
s = open(p).read()
a = "<Text style={styles.hint}>Touch a province</Text>"
b = "<Text style={styles.hint}>{t(EXPLORE.touchProvince)}</Text>"
if a in s:
    s = s.replace(a, b, 1); total += 1
    if "constants/i18n/explore" not in s:
        import re
        last = None
        for im in re.finditer(r"^import .*?;\s*$", s, re.M):
            last = im
        s = s[: last.end()] + "\nimport { EXPLORE } from '@/constants/i18n/explore';" + s[last.end():]
    open(p, "w").write(s)
    print("province map done")
else:
    print("   skipped: Touch a province")

# what is the translate helper called in the map file?
src = open("components/iran-province-map.tsx").read()
m = [l for l in src.split("\n") if "@/lib/i18n" in l]
print("map i18n import:", m[0] if m else "NONE — t will be undefined")

print("\ntotal:", total)
