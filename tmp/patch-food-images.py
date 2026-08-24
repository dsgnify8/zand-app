# Register the thirteen new dish images.
#
# require() paths are resolved at bundle time, so every key needs a literal
# line in the map — nothing here can be built at runtime.
#
# The extensions are read off disk rather than assumed, because the saved
# files came in a mix of jpg, jpeg, webp and avif and guessing wrong gives a
# bundler error rather than a missing picture.

import os

P = "constants/education-images.ts"
DIR = "assets/education"

KEYS = [
    "food-baghali-polo",
    "food-adas-polo",
    "food-sabzi-polo-mahi",
    "food-mirza-ghasemi",
    "food-kashk-bademjan",
    "food-khoresh-karafs",
    "food-estanboli-polo",
    "food-qottab",
    "food-zoolbia-bamieh",
    "food-sholeh-zard",
    "food-ranginak",
    "food-halva",
    "food-nan-berenji",
]

# Metro resolves these out of the box. avif is not among them.
SAFE = {".jpg", ".jpeg", ".png", ".webp"}

s = open(P).read()
on_disk = os.listdir(DIR)

lines, missing, risky, already = [], [], [], []

for k in KEYS:
    if "'" + k + "'" in s:
        already.append(k)
        continue
    hit = [f for f in on_disk if os.path.splitext(f)[0] == k]
    if not hit:
        missing.append(k)
        continue
    ext = os.path.splitext(hit[0])[1]
    if ext.lower() not in SAFE:
        risky.append(hit[0])
        continue
    lines.append(f"  '{k}': require('../{DIR}/{k}{ext}'),")

if lines:
    # Sit them with the other education assets, after the last one.
    i = s.rfind("require('../assets/education/")
    end = s.index("\n", i)
    s = s[: end + 1] + "\n".join(lines) + "\n" + s[end + 1 :]
    open(P, "w").write(s)

print("registered:", len(lines))
for l in lines:
    print("  ", l.strip())
if already:
    print("already there:", ", ".join(already))
if missing:
    print("NO FILE FOUND:", ", ".join(missing))
if risky:
    print("UNSUPPORTED FORMAT, convert first:", ", ".join(risky))

# Every key the dish lists reference should now resolve.
cul = open("constants/culture.ts").read()
import re
used = set(re.findall(r"image: '(food-[a-z0-9-]+)'", cul))
reg = open(P).read()
gaps = sorted(k for k in used if "'" + k + "'" not in reg)
print("dish keys with no image entry:", gaps if gaps else "none")
