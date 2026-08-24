# Two fixes.
#
# 1. The friends dot never clears.
#
#    The badge counts inbox items with `!i.done`. SentItem has no `done`
#    field — it has `learned`. `!undefined` is true, so every item ever
#    received counted as pending forever, and marking one learned changed a
#    field nothing was reading.
#
# 2. The streak counts visits, not lessons.
#
#    A streak that only moves when you finish a language lesson is a streak
#    for a fraction of the app. This adds visitDays alongside learnDays
#    rather than repurposing it: two milestones read learnDays — "7 days of
#    Persian", "30 days of Persian" — and if opening the app fed that field
#    they would unlock without any Persian being learnt.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip().splitlines()[0][:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# ------------------------------------------------------- 1. the dot
edit("app/(tabs)/profile.tsx", [
 ("    ? (pendReq?.length ?? 0) + (pendInbox ?? []).filter((i: any) => !i.done).length",
  "    // `learned`, not `done` — SentItem has no `done` field, so the old\n"
  "    // check was !undefined and every item stayed pending forever.\n"
  "    ? (pendReq?.length ?? 0) + (pendInbox ?? []).filter((i: any) => !i.learned).length"),

 ("(progStreak === 0 ? 'Your first day starts when you finish a lesson' : 'Longest you have ever gone: ' + progStreak)",
  "(progStreak === 0 ? 'Open the app tomorrow and your streak begins' : 'Longest you have ever gone: ' + progStreak)"),
])

# ---------------------------------------------------- 2. the streak
p = "lib/stats-store.ts"
s = open(p).read()
n = 0

a = "  learnDays: number;"
b = "  learnDays: number;\n  visitDays: number;"
if a in s:
    s = s.replace(a, b, 1); n += 1

a = "  lessonsFinished: 0, stagesFinished: 0, wordsSolid: 0, learnDays: 0,"
b = "  lessonsFinished: 0, stagesFinished: 0, wordsSolid: 0, learnDays: 0, visitDays: 0,"
if a in s:
    s = s.replace(a, b, 1); n += 1

a = """// Set an absolute value, for counts that are recalculated rather than incremented."""
b = '''/**
 * A day the app was opened.
 *
 * Separate from markLearnDay on purpose. learnDays means days Persian was
 * actually studied and two milestones depend on that meaning; visits are a
 * different thing and get their own count. The streak follows visits, so it
 * belongs to everyone using the app rather than only the language learners.
 */
let lastVisitDay = '';
export async function markVisitDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (lastVisitDay === today) return;
  lastVisitDay = today;
  try {
    const raw = await AsyncStorage.getItem('visit:days');
    const days: string[] = raw ? JSON.parse(raw) : [];
    if (!days.includes(today)) {
      // Bounded: a streak only ever needs to look back from today, and an
      // unbounded array would grow for the life of the install.
      const next = [...days, today].slice(-400);
      await AsyncStorage.setItem('visit:days', JSON.stringify(next));
      setField('visitDays', next.length);
      setStreak(streakFrom(next));
    } else {
      setStreak(streakFrom(days));
    }
    syncTouch();
  } catch {}
}

/** Consecutive days ending today. A gap of one day ends it. */
function streakFrom(days: string[]) {
  const seen = new Set(days);
  const d = new Date();
  let n = 0;
  while (seen.has(d.toISOString().slice(0, 10))) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// Set an absolute value, for counts that are recalculated rather than incremented.'''
if a in s:
    s = s.replace(a, b, 1); n += 1

open(p, "w").write(s)
total += n
print(f"stats-store.ts: {n} of 3")

print("\ntotal:", total)
print("markVisitDay exported:", "export async function markVisitDay" in s)
print("!i.done left:", open('app/(tabs)/profile.tsx').read().count("!i.done"))
