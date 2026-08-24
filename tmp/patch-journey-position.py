# One definition of "where you are", shared by everything that shows it.
#
# The map, the learn hero, the continue card and the profile block each had
# their own version of "the next step", and all four had the same flaw: they
# looked for the first step that is not a finished lesson. Four of the six
# step kinds — alphabet, writing, flashcards, quizzes — have no completion
# state at all, so they always fail that test. Stage I opens with the
# alphabet step, so every one of those screens was pinned to it forever. That
# is the desync.
#
# The rule now is the last thing touched rather than the first thing not
# done: the furthest lesson that is finished or part-finished. lessonPartial
# already records half-finished lessons, so this needs no new tracking, and
# it cannot be defeated by a step kind that never ticks.
#
# It lives in lib/learn-progress.ts so there is one copy. stepDone stays in
# map.tsx as-is: it drives the checkmarks, and a practice step genuinely has
# no completion to show.

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


# ------------------------------------------------------- the helper
p = "lib/learn-progress.ts"
s = open(p).read()
if "journeyPosition" in s:
    print("learn-progress.ts: already has journeyPosition")
else:
    s += '''

/**
 * Where the learner actually is on the route.
 *
 * `at` is the furthest step they have touched — a lesson either finished or
 * left part way. That is what screens should open on: "the latest thing you
 * were doing", not "the first thing you have not done". The two are only the
 * same on a route where every step can be completed, and four of the six
 * step kinds here cannot be.
 *
 * `next` is what to offer them: the same step if it is unfinished, otherwise
 * the one after it.
 *
 * Nothing touched yet gives both as the very first step, which for a new
 * learner is the alphabet — correct, and the reason this does not simply
 * skip to the first lesson.
 */
export function journeyPosition<T extends { kind: string; unit?: string; lesson?: string }>(
  flat: T[],
) {
  const touchedAt = (st: T) =>
    st.kind === 'lesson' && st.unit && st.lesson
      ? isLessonDone(st.unit, st.lesson) || lessonPartial(st.unit, st.lesson) > 0
      : false;

  let last = -1;
  flat.forEach((st, i) => { if (touchedAt(st)) last = i; });

  const atIndex = last < 0 ? 0 : last;
  const at = flat[atIndex];

  // Finished the thing they were on? Then next is the step after it.
  const atDone =
    at && at.kind === 'lesson' && at.unit && at.lesson && isLessonDone(at.unit, at.lesson);
  const nextIndex =
    last < 0 ? 0 : atDone ? Math.min(atIndex + 1, flat.length - 1) : atIndex;

  return { at, next: flat[nextIndex], atIndex, nextIndex, started: last >= 0 };
}
'''
    open(p, "w").write(s)
    total += 1
    print("learn-progress.ts: helper added")


# ------------------------------------------------------------ the map
edit("app/learn/map.tsx", [
 ("import { isLessonDone, lessonPartial, useLearnProgress } from '@/lib/learn-progress';",
  "import { isLessonDone, journeyPosition, lessonPartial, useLearnProgress } from '@/lib/learn-progress';"),

 ("""  const flat = STAGES.flatMap((st) => st.steps);
  const next = flat.find((st) => !stepDone(st));

  // The stage holding that step is where the map opens. Identity holds
  // because `flat` is built from the same step objects STAGES contains.
  // Undefined once the whole route is finished, which falls back to
  // restoring wherever they last were.
  const targetKey = next ? STAGES.find((st) => st.steps.includes(next))?.key : undefined;""",
  """  const flat = STAGES.flatMap((st) => st.steps);
  const pos = journeyPosition(flat);
  const next = pos.next;

  // Open on the latest thing they touched, finished or half done. Identity
  // holds because `flat` is built from the same step objects STAGES contains.
  const targetKey = pos.at ? STAGES.find((st) => st.steps.includes(pos.at))?.key : undefined;"""),
])

# --------------------------------------------------------- the cards
edit("components/learn-hero.tsx", [
 ("import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';",
  "import { isLessonDone, journeyPosition, useLearnProgress } from '@/lib/learn-progress';"),
 ("  const next = all.find((x) => !(x.kind === 'lesson' && x.unit && x.lesson && isLessonDone(x.unit, x.lesson)));",
  "  const next = journeyPosition(all).next;"),
])

edit("components/continue-learning.tsx", [
 ("import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';",
  "import { isLessonDone, journeyPosition, useLearnProgress } from '@/lib/learn-progress';"),
 ("  const next = all.find((x) => !(x.kind === 'lesson' && x.unit && x.lesson && isLessonDone(x.unit, x.lesson)));",
  "  const next = journeyPosition(all).next;"),
])

edit("components/learn-progress-block.tsx", [
 ("import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';",
  "import { isLessonDone, journeyPosition, useLearnProgress } from '@/lib/learn-progress';"),

 ("""  // which chapter you are in
  const current = STAGES.find((st) =>
    st.steps.some((x) => x.kind === 'lesson' && x.unit && x.lesson && !isLessonDone(x.unit, x.lesson)),
  );
  const chaptersDone = STAGES.filter((st) =>
    st.steps.filter((x) => x.kind === 'lesson' && x.unit && x.lesson)
      .every((x) => isLessonDone(x.unit!, x.lesson!)),
  ).length;""",
  """  // which chapter you are in — the one holding the latest thing touched
  const at = journeyPosition(STAGES.flatMap((st) => st.steps)).at;
  const current = at ? STAGES.find((st) => st.steps.includes(at)) : STAGES[0];

  const chaptersDone = STAGES.filter((st) => {
    const ls = st.steps.filter((x) => x.kind === 'lesson' && x.unit && x.lesson);
    // [].every() is true, so a stage containing no lessons at all counted as
    // a finished chapter from the very first launch. Hence the requirement
    // that there be something to finish.
    return ls.length > 0 && ls.every((x) => isLessonDone(x.unit!, x.lesson!));
  }).length;"""),
])

print("\ntotal:", total)
