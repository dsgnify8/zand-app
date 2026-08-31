# Every step counts, not only the lessons.
#
# The journey has 69 steps: 45 lessons, and 24 others — flashcards,
# quizzes, reviews, the alphabet, writing. Only the lessons could be
# recorded, so the other 24 could never show as done on the map, never
# counted toward a stage, and never moved the profile.
#
# `markLessonDone` already takes a unit and a lesson, which is really just
# a pair of keys. Non-lesson steps use their own key for both, which needs
# no schema change and no migration — an existing record still reads the
# same way.

total = 0


def sub(p, a, b, label):
    global total
    s = open(p).read()
    if a in s:
        open(p, "w").write(s.replace(a, b, 1)); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------- the recorder
sub("lib/learn-progress.ts",
"""export async function markLessonDone(unit: string, lesson: string, score: number) {""",
"""/**
 * A step is finished.
 *
 * Named for lessons because that is all it recorded at first, but it is
 * really a pair of keys and a score. Steps that are not lessons — a deck
 * of flashcards, a quiz, the alphabet — pass their own key as both, which
 * keeps one store and one shape for the whole journey.
 */
export async function markStepDone(key: string, score = 100) {
  return markLessonDone(key, key, score);
}

export function isStepDone(key: string) {
  return isLessonDone(key, key);
}

export async function markLessonDone(unit: string, lesson: string, score: number) {""",
    "markStepDone")

# --------------------------------------- stages count every kind
sub("lib/learn-progress.ts",
"""    const finished = STAGES.filter((st: any) =>
      st.steps
        .filter((x: any) => x.kind === 'lesson' && x.unit && x.lesson)
        .every((x: any) => isLessonDone(x.unit, x.lesson)),
    ).length;""",
"""    // Every step, not only the lessons. A stage with a quiz and a deck of
    // flashcards in it was counting as finished while both were untouched,
    // because neither could be seen.
    const stepIsDone = (x: any) =>
      x.kind === 'lesson' && x.unit && x.lesson
        ? isLessonDone(x.unit, x.lesson)
        : isLessonDone(x.key, x.key);

    const finished = STAGES.filter((st: any) => st.steps.every(stepIsDone)).length;""",
    "stage counting")

# ------------------------------------------------- the map agrees
sub("app/learn/map.tsx",
"""function stepDone(st: JourneyStep) {
  if (st.kind === 'lesson' && st.unit && st.lesson) return isLessonDone(st.unit, st.lesson);
  return false;
}""",
"""function stepDone(st: JourneyStep) {
  // Lessons are keyed by unit and lesson; everything else by its own key.
  // Returning false for the second kind meant 24 of the 69 steps could
  // never be marked, however many times someone did them.
  if (st.kind === 'lesson' && st.unit && st.lesson) return isLessonDone(st.unit, st.lesson);
  return isLessonDone(st.key, st.key);
}""",
    "map stepDone")

print("total:", total)

# and who needs to start calling it
import subprocess
print("\nscreens with no completion call:")
for f in ["flashcards", "quiz-play", "review", "alphabet", "writing"]:
    p = "app/learn/%s.tsx" % f
    try:
        s = open(p).read()
        has = "markStepDone" in s or "markLessonDone" in s
        print("  %-12s %s" % (f, "ok" if has else "— needs one"))
    except FileNotFoundError:
        print("  %-12s (no such file)" % f)
