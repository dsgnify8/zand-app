# One streak line, shown on a rule rather than always.
#
# The nudge used to be permanent at zero and said "finish a lesson", which is
# no longer even how the streak works. The rule now:
#
#   - a streak of 2 or more hides it entirely
#   - a brand new visitor sees it, because they need telling
#   - someone who missed a single day does not see it — that is not a
#     collapse, and nagging over it is what makes an app tiresome
#   - three days away brings it back
#   - so does losing a real streak twice, because the pattern is the problem
#     rather than any one lapse
#
# All of it comes out of the visit:days array already on disk. The decision
# is made once, when the day is marked, and both cards read the same flag —
# so they cannot disagree about what the streak is doing.

total = 0

# --------------------------------------------------------- the store
p = "lib/stats-store.ts"
s = open(p).read()
n = 0

for a, b in [
 ("  visitDays: number;", "  visitDays: number;\n  // Whether to show the come-back line. See analyseVisits.\n  streakNudge: boolean;"),
 ("  lessonsFinished: 0, stagesFinished: 0, wordsSolid: 0, learnDays: 0, visitDays: 0,",
  "  lessonsFinished: 0, stagesFinished: 0, wordsSolid: 0, learnDays: 0, visitDays: 0,\n  streakNudge: true,"),

 ("""    if (!days.includes(today)) {
      // Bounded: a streak only ever needs to look back from today, and an
      // unbounded array would grow for the life of the install.
      const next = [...days, today].slice(-400);
      await AsyncStorage.setItem('visit:days', JSON.stringify(next));
      setField('visitDays', next.length);
      setStreak(streakFrom(next));
    } else {
      setStreak(streakFrom(days));
    }""",
  """    // Bounded: a streak only ever needs to look back from today, and an
    // unbounded array would grow for the life of the install.
    const next = days.includes(today) ? days : [...days, today].slice(-400);
    if (!days.includes(today)) {
      await AsyncStorage.setItem('visit:days', JSON.stringify(next));
      setField('visitDays', next.length);
    }
    const v = analyseVisits(next);
    setStreak(v.streak);
    setNudge(v.nudge);"""),

 ("""/** Consecutive days ending today. A gap of one day ends it. */""",
  """export function setNudge(v: boolean) {
  if (state.streakNudge !== v) { state = { ...state, streakNudge: v }; emit(); persist(); }
}

const DAY_MS = 86400000;
const asDate = (d: string) => new Date(d + 'T00:00:00Z').getTime();

/**
 * The shape of someone's visiting, not just today's number.
 *
 * A run is consecutive days. `breaks` counts runs of two or more that have
 * already ended — a real streak that was lost, as opposed to a single day
 * that never became one. That distinction is the whole point: missing one
 * day after a good run is normal and should pass without comment; losing
 * streak after streak is a habit worth naming.
 */
function analyseVisits(days: string[]) {
  const sorted = Array.from(new Set(days)).sort();
  const runs: number[] = [];
  let cur = 0;
  let prev = 0;
  for (const d of sorted) {
    const t = asDate(d);
    if (prev && t - prev === DAY_MS) cur += 1;
    else { if (cur) runs.push(cur); cur = 1; }
    prev = t;
  }
  if (cur) runs.push(cur);

  const streak = streakFrom(sorted);
  // The current run is still alive, so it is not a break.
  const ended = streak > 0 ? runs.slice(0, -1) : runs;
  const breaks = ended.filter((r) => r >= 2).length;
  const everHeld = runs.some((r) => r >= 2);
  const gap =
    sorted.length >= 2
      ? Math.round((asDate(sorted[sorted.length - 1]) - asDate(sorted[sorted.length - 2])) / DAY_MS)
      : 0;

  return {
    streak,
    nudge: streak < 2 && (!everHeld || gap >= 3 || breaks >= 2),
  };
}

/** Consecutive days ending today. A gap of one day ends it. */"""),
]:
    if a in s:
        s = s.replace(a, b, 1); n += 1
    else:
        print("   skipped:", a.strip().splitlines()[0][:56])
open(p, "w").write(s)
total += n
print(f"stats-store.ts: {n} of 4")

# ----------------------------------------------------------- the copy
p = "constants/i18n/profile.ts"
s = open(p).read()
if "streakNudge" not in s:
    a = "  articlesRead: { en: 'Articles read', fa: 'مقاله‌های خوانده‌شده' },"
    b = ("  streakNudge: { en: 'Come back each day to keep your streak', fa: 'هر روز سر بزن تا رشته‌ات نگسلد' },\n"
         + a)
    if a in s:
        open(p, "w").write(s.replace(a, b, 1))
        total += 1
        print("copy added")
    else:
        print("   skipped: i18n anchor")
else:
    print("copy already there")

# ---------------------------------------------------------- the cards
p = "app/(tabs)/profile.tsx"
s = open(p).read()
n = 0

for a, b in [
 # the You card
 ("""            {demo
              ? ME.freezes + ' rest days left this month'
              : streakDays === 0
              ? 'Finish a lesson to start your streak'
              : streakDays === 1
              ? 'One day in. Come back tomorrow to keep it.'
              : streakDays < 7
              ? (7 - streakDays) + ' more days to your first week'
              : 'Keep going'}""",
  """            {demo
              ? ME.freezes + ' rest days left this month'
              : (realStats as any)?.streakNudge
              ? t(PROFILE.streakNudge)
              : streakDays < 7 && streakDays > 0
              ? (7 - streakDays) + ' more days to your first week'
              : ''}"""),

 # the Progress hero, reading the same flag
 ("{progDemo ? 'Longest you have ever gone: ' + ME.longest : (progStreak === 0 ? 'Open the app tomorrow and your streak begins' : 'Longest you have ever gone: ' + progStreak)}",
  "{progDemo ? 'Longest you have ever gone: ' + ME.longest : ((progStats as any)?.streakNudge ? t(PROFILE.streakNudge) : progStreak > 0 ? 'Longest you have ever gone: ' + progStreak : '')}"),
]:
    if a in s:
        s = s.replace(a, b, 1); n += 1
    else:
        print("   skipped:", a.strip().splitlines()[0][:56])

open(p, "w").write(s)
total += n
print(f"profile.tsx: {n} of 2")
print("\ntotal:", total)
