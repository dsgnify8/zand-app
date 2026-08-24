# Facts every day, not verses.
#
# Filtered at the rotation rather than deleted from DAILY_POOL: the two verse
# entries and the 'verse' kind stay in the file, so anything else that wants
# them still has them, and turning them back on is one word.
#
# Note this shifts the calendar. dailyFor indexes by day % length, so a
# shorter array means a different item on a given day than yesterday's build
# would have shown. Nothing depends on the old order.

p = "constants/stories.ts"
s = open(p).read()

a = "const ALL_DAILY: Daily[] = [...DAILY_POOL, ...DYK];"
b = ("// Verses are excluded on purpose — the daily slot is for facts. The\n"
     "// entries themselves are left in DAILY_POOL; drop 'verse' from this list\n"
     "// to bring them back.\n"
     "const DAILY_OFF: DailyKind[] = ['verse'];\n"
     "\n"
     "const ALL_DAILY: Daily[] = [...DAILY_POOL, ...DYK].filter(\n"
     "  (x) => !DAILY_OFF.includes(x.kind),\n"
     ");")

if a in s:
    s = s.replace(a, b, 1)
    open(p, "w").write(s)
    print("applied")
else:
    print("  not matched")

# Sanity: the pool must not be empty, and no verse should survive the filter.
import re
kinds = re.findall(r"kind: '(\w+)'", s)
print("verse entries still in file:", kinds.count("verse"))
print("total pool entries:", len(kinds))
