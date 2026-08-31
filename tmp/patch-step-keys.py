# Every step records itself.
#
# The journey routes to a screen with a stage in the query — but a stage
# holds several steps, so the screen knew which neighbourhood it was in and
# not which door it had come through. That is why 24 of 69 steps could
# never be marked.
#
# So the step key travels with the route. Explicit, cannot drift, and any
# step added later gets it by writing one more parameter.

import re

total = 0


def sub(p, a, b, label):
    global total
    s = open(p).read()
    if a in s:
        open(p, "w").write(s.replace(a, b, 1)); total += 1
    else:
        print("   skipped:", label)


# ---------------------------------------------- the routes carry the key
p = "constants/journey.ts"
s = open(p).read()
n = 0


def add_step(m):
    global n
    key, route = m.group(1), m.group(2)
    if "step=" in route:
        return m.group(0)
    n += 1
    joiner = "&" if "?" in route else "?"
    return m.group(0).replace(route, route + joiner + "step=" + key)


# each step is `key: 'x', ... route: '/learn/y?z'`
s = re.sub(
    r"\{ key: '([\w-]+)',(?:[^}]*?)route: '([^']+)'",
    lambda m: add_step(m),
    s,
)
open(p, "w").write(s)
print("routes given a step key:", n)


# --------------------------------------------------- cards records itself
sub("app/learn/cards.tsx",
    "  const { stage } = useLocalSearchParams<{ stage?: string }>();",
"""  // `stage` says which part of the journey; `step` says which door. A
  // stage holds several steps, so without the second this screen could
  // not record what had just been finished.
  const { stage, step } = useLocalSearchParams<{ stage?: string; step?: string }>();""",
    "cards params")

sub("app/learn/cards.tsx",
    "    if (i + 1 >= cards.length) { setDone(true); return; }",
"""    if (i + 1 >= cards.length) {
      setDone(true);
      // Through the deck is through the step.
      if (step) markStepDone(String(step));
      return;
    }""",
    "cards completion")

sub("app/learn/cards.tsx",
    "import { router, useLocalSearchParams } from 'expo-router';",
    "import { router, useLocalSearchParams } from 'expo-router';\n"
    "import { markStepDone } from '@/lib/learn-progress';",
    "cards import")

print("total:", total)

# what still needs doing by hand
print("\nstill to wire:")
for f in ["blanks", "review", "alphabet", "writing", "quiz-play", "flashcard"]:
    p = "app/learn/%s.tsx" % f
    try:
        s = open(p).read()
        print("  %-11s %s" % (f, "ok" if "markStepDone" in s else "— needs one"))
    except FileNotFoundError:
        print("  %-11s (missing)" % f)
