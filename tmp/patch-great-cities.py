# Great Cities has no cover because its key is a placeholder.
#
# app/(tabs)/index.tsx asks eduImage for 'GEO_CITY_IMG', which was never
# replaced with a real key, so nothing resolves and the card renders blank.
#
# The photo uploaded from the device went into image_overrides instead, which
# is per-account: it showed for that account and for nobody else, which is
# why it appeared to work and then stopped. A bundled asset fixes it for
# everyone.

import os

KEY = "geo-great-cities"
DIR = "assets/education"
SAFE = {".jpg", ".jpeg", ".png", ".webp"}

# ---- 1. the placeholder ---------------------------------------------
p = "app/(tabs)/index.tsx"
s = open(p).read()
a = "{ key: 'g5', title: 'Great Cities', sub: 'WHERE THE PEOPLE ARE', image: 'GEO_CITY_IMG' },"
b = "{ key: 'g5', title: 'Great Cities', sub: 'WHERE THE PEOPLE ARE', image: '" + KEY + "' },"
if a in s:
    open(p, "w").write(s.replace(a, b, 1))
    print("key wired:", KEY)
else:
    print("  placeholder not matched — already changed?")

# ---- 2. register the asset ------------------------------------------
reg = "constants/education-images.ts"
r = open(reg).read()

if "'" + KEY + "'" in r:
    print("already registered")
else:
    hit = [f for f in os.listdir(DIR) if os.path.splitext(f)[0] == KEY]
    if not hit:
        print("NO FILE — save one to " + DIR + "/" + KEY + ".jpg, then run this again")
        print("  files starting 'geo-':", [f for f in os.listdir(DIR) if f.startswith("geo-")])
    else:
        ext = os.path.splitext(hit[0])[1]
        if ext.lower() not in SAFE:
            print("UNSUPPORTED FORMAT:", hit[0], "— convert to jpg first")
        else:
            i = r.rfind("require('../assets/education/")
            end = r.index("\n", i)
            line = f"  '{KEY}': require('../{DIR}/{KEY}{ext}'),"
            open(reg, "w").write(r[: end + 1] + line + "\n" + r[end + 1 :])
            print("registered:", line.strip())

# Any other placeholder keys hiding in the home cards?
import re
home = open(p).read()
odd = [k for k in re.findall(r"image: '([^']+)'", home) if k.isupper() or "_" in k]
print("other placeholder-looking keys:", odd if odd else "none")
