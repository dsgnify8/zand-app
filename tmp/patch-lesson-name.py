# Resolve the learner's name and fill in missing glosses before the lesson
# renders.
#
# Order matters: personalise first, then gloss. The gloss lookup is keyed by
# the Persian strings that end up on screen, so it has to run against the
# already-substituted lesson.

p = "app/learn/lesson.tsx"
s = open(p).read()

PAIRS = [
 ("import { useRef, useState } from 'react';",
  "import { useMemo, useRef, useState } from 'react';"),

 ("import { lessonByKey } from '@/constants/curriculum';",
  "import { lessonByKey } from '@/constants/curriculum';\n"
  "import { useLearnerName, personalise } from '@/lib/learner-name';\n"
  "import { withGlosses } from '@/lib/lesson-glossary';"),

 ("  const l = lessonByKey(unit, lesson);",
  "  const raw = lessonByKey(unit, lesson);\n"
  "\n"
  "  // The course is written with one name in it; swap in whoever is reading.\n"
  "  // personalise walks keys as well as values, because optionTrs is keyed by\n"
  "  // the Persian option string — substitute the two at different moments and\n"
  "  // the transliteration under that option silently vanishes.\n"
  "  //\n"
  "  // Then fill in the English glosses the exercises never carried, so a\n"
  "  // beginner is never choosing between four words they cannot yet read.\n"
  "  const learner = useLearnerName();\n"
  "  const l = useMemo(\n"
  "    () => (raw ? withGlosses(personalise(raw, learner), learner) : raw),\n"
  "    [raw, learner.en, learner.fa, learner.tr],\n"
  "  );"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip().splitlines()[0][:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

# The hooks must all sit above the early return, or the render order changes
# between a found and a missing lesson.
i_hook = s.find("const learner = useLearnerName();")
i_guard = s.find("if (!l)")
print("hooks before guard:", -1 < i_hook < i_guard)
