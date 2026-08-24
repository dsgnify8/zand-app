# Mark the visit, and finish off the `done` bug.
#
# loadStats() sits unawaited in a list of fire-and-forget loads. markVisitDay
# writes the streak through that same store, so calling it alongside them
# would race: the load resolves afterwards and overwrites the streak with
# whatever was on disk. It gets its own awaited call at the end.
#
# And two more `!i.done` checks survived in profile.tsx. SentItem has no
# `done` field, so each of them treats every item as outstanding forever.

import re

total = 0

# ------------------------------------------------------- 1. the layout
p = "app/_layout.tsx"
s = open(p).read()

# merge into whichever import already pulls from stats-store
lines = s.splitlines(keepends=True)
done_import = False
for i, line in enumerate(lines):
    if "stats-store" in line and line.lstrip().startswith("import"):
        if "markVisitDay" not in line and "}" in line:
            head, rest = line.split("}", 1)
            lines[i] = head.rstrip().rstrip(",") + ", markVisitDay }" + rest
            done_import = True
        else:
            done_import = "markVisitDay" in line
        break
s = "".join(lines)
if done_import:
    total += 1
    print("import merged")
else:
    print("   NO stats-store import found — add markVisitDay by hand")

a = "      loadAllFrames(); loadSaved(); loadLang(); loadStats(); loadHidden();"
b = "      loadAllFrames(); loadSaved(); loadLang(); loadHidden();"
if a in s:
    s = s.replace(a, b, 1); total += 1

a = "      loadUsage(); loadNotifPrefs(); loadImageOverrides(); loadSavedBusinesses();"
b = """      loadUsage(); loadNotifPrefs(); loadImageOverrides(); loadSavedBusinesses();

      // Awaited, unlike the rest. markVisitDay writes the streak through the
      // stats store, so if the load were still in flight it would land on top
      // and the streak would quietly reset to whatever was on disk.
      await loadStats();
      markVisitDay();"""
if a in s:
    s = s.replace(a, b, 1); total += 1

open(p, "w").write(s)
print("layout wired:", "markVisitDay();" in s)

# ------------------------------------------------- 2. the rest of `done`
p = "app/(tabs)/profile.tsx"
s = open(p).read()
before = s.count("!i.done")
s = s.replace("!i.done", "!i.learned")
# some may be written on a different variable name
for pat in ["!x.done", "!it.done", "! i.done"]:
    s = s.replace(pat, pat.replace(".done", ".learned"))
open(p, "w").write(s)
total += before
print(f"profile.tsx: {before} more `.done` checks corrected")

for i, line in enumerate(s.splitlines(), 1):
    if ".done" in line and "learned" not in line:
        print(f"  STILL: {i}: {line.strip()[:80]}")

print("\ntotal:", total)
