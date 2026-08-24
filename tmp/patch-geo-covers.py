# Bundled covers for the two geography cards on Home.
#
# Great Cities pointed at 'GEO_CITY_IMG', a placeholder that never resolved.
# The Heart gets its own key too rather than sharing 'iran-crossroads',
# so changing one card cannot silently change whatever else uses that.
#
# Photos uploaded from a device land in image_overrides, which is per
# account — they show for the uploader and nobody else. Bundling is what
# makes a cover everyone's.
#
# Safe to run twice.

import os, re

DIR = "assets/education"
SAFE = {".jpg", ".jpeg", ".png", ".webp"}

CARDS = [
    # (card key, old image key, new image key)
    ("g5", "GEO_CITY_IMG", "geo-great-cities"),
    ("g1", "iran-crossroads", "geo-the-heart"),
]

# ---- 1. point the cards at the new keys -----------------------------
p = "app/(tabs)/index.tsx"
s = open(p).read()
for card, old, new in CARDS:
    a = "{ key: '" + card + "', title: "
    i = s.find(a)
    if i == -1:
        print("  card not found:", card)
        continue
    end = s.index("},", i)
    line = s[i:end]
    if "'" + new + "'" in line:
        print("  already wired:", card, "->", new)
        continue
    if "'" + old + "'" not in line:
        print("  unexpected image on", card + ":", line[line.find("image:"):][:40])
        continue
    s = s[:i] + line.replace("'" + old + "'", "'" + new + "'") + s[end:]
    print("wired:", card, old, "->", new)
open(p, "w").write(s)

# ---- 2. register whatever is on disk --------------------------------
reg = "constants/education-images.ts"
r = open(reg).read()
lines = []
for _, _, key in CARDS:
    if "'" + key + "'" in r:
        print("  already registered:", key)
        continue
    hit = [f for f in os.listdir(DIR) if os.path.splitext(f)[0] == key]
    if not hit:
        print("  NO FILE for", key, "— expected", DIR + "/" + key + ".jpg")
        continue
    ext = os.path.splitext(hit[0])[1]
    if ext.lower() not in SAFE:
        print("  UNSUPPORTED FORMAT:", hit[0], "— convert to jpg")
        continue
    lines.append(f"  '{key}': require('../{DIR}/{key}{ext}'),")

if lines:
    i = r.rfind("require('../assets/education/")
    end = r.index("\n", i)
    open(reg, "w").write(r[: end + 1] + "\n".join(lines) + "\n" + r[end + 1 :])
    for l in lines:
        print("registered:", l.strip())

# ---- 3. nothing left unresolved -------------------------------------
home = open(p).read()
reg2 = open(reg).read()
keys = set(re.findall(r"image: '([^']+)'", home))
gaps = sorted(k for k in keys if "'" + k + "'" not in reg2)
print("home image keys with no entry:", gaps if gaps else "none")
