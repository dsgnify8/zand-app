# Retire /learn/path.
#
# Review's "go to your path" opened a separate route listing Persian in
# order — a second, staler view of the same journey. The map is the journey,
# and it now opens on the latest thing touched, so sending them there puts
# them back where they were instead of at the top of a list.
#
# Exactly one link pointed at that page, so the route goes with it.

import os

total = 0

# ---- 1. the button --------------------------------------------------
p = "app/learn/review.tsx"
s = open(p).read()
a = "onPress={() => router.replace('/learn/path' as any)}"
b = "onPress={() => router.replace('/learn/map' as any)}"
if a in s:
    open(p, "w").write(s.replace(a, b, 1))
    total += 1
    print("review button -> /learn/map")
else:
    print("   skipped: review button")

# ---- 2. the route declaration ---------------------------------------
p = "app/_layout.tsx"
s = open(p).read()
a = '            <Stack.Screen name="learn/path" options={{ headerShown: false }} />\n'
if a in s:
    open(p, "w").write(s.replace(a, "", 1))
    total += 1
    print("route declaration removed")
else:
    print("   skipped: Stack.Screen learn/path")

# ---- 3. the file ----------------------------------------------------
# Only after confirming nothing else reaches it.
import subprocess
refs = subprocess.run(
    ["grep", "-rn", "learn/path", "app", "components", "lib", "constants"],
    capture_output=True, text=True,
).stdout.strip()

if refs:
    print("NOT deleting — still referenced:")
    print(refs)
else:
    if os.path.exists("app/learn/path.tsx"):
        os.remove("app/learn/path.tsx")
        total += 1
        print("app/learn/path.tsx deleted")
    else:
        print("   already gone")

print("\ntotal:", total)
