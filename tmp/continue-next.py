# -*- coding: utf-8 -*-
# The done screen becomes a continuation rather than a dead end.
#
#   * "Continue" goes straight into the next exercise, rolling into the
#     next chapter when this one runs out.
#   * Finishing the last exercise of a chapter shows confetti and a line
#     marking it, because that is the moment worth pausing on.
#   * "Back to the map" stays as the secondary option, and "go through it
#     again" stays for anyone who wants the repetition.

import re

p = "app/learn/lesson.tsx"
s = open(p).read()
did = []

# find which step this lesson is, so we can ask what comes next
a = "  const l = lessonByKey(unit, lesson);"
b = """  const l = lessonByKey(unit, lesson);

  // The route params give us unit and lesson; the journey is keyed by
  // step, so find the step that points at this lesson.
  const thisStep = STAGES.flatMap((st) => st.steps)
    .find((x) => x.unit === unit && x.lesson === lesson);
  const after = thisStep ? nextStep(thisStep.key) : null;
  const finishedChapter = !!after?.endsStage;"""
if a in s:
    s = s.replace(a, b, 1); did.append("lookup")

# the done screen
a2 = """          <Pressable style={[s.cta, s.finishBtn]} onPress={() => {
            // remember how far in they were, so the map can show it
            if (!done && i > 0) markPartial(unit, lesson, Math.round((i / l.steps.length) * 100));
            router.replace('/learn/map' as any);
          }}>
            <Text style={s.ctaT}>Done</Text>
          </Pressable>"""
b2 = """          {finishedChapter ? (
            <Text style={s.chapterDone}>That is the chapter finished.</Text>
          ) : null}

          {after ? (
            <Pressable style={[s.cta, s.finishBtn]} onPress={() => router.replace(after.step.route as any)}>
              <Text style={s.ctaT}>
                {finishedChapter ? 'Start the next chapter' : 'Continue'}
              </Text>
            </Pressable>
          ) : (
            <Pressable style={[s.cta, s.finishBtn]} onPress={() => router.replace('/learn/map' as any)}>
              <Text style={s.ctaT}>Done</Text>
            </Pressable>
          )}

          <Pressable hitSlop={10} onPress={() => router.replace('/learn/map' as any)} style={{ marginTop: spacing.md }}>
            <Text style={s.again}>Back to the map</Text>
          </Pressable>"""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("continue button")

# confetti over the done screen
a3 = "      </SafeAreaView>\n    );\n  }"
if a3 in s and "Confetti" not in s:
    s = s.replace(a3, "        <Confetti show={finishedChapter} />\n      </SafeAreaView>\n    );\n  }", 1)
    did.append("confetti")

# style for the chapter line
if "chapterDone:" not in s:
    s = s.replace("  again: {", "  chapterDone: { fontFamily: fonts.bodyStrong, fontSize: 13, color: lw.gold, textAlign: 'center', marginBottom: spacing.md, letterSpacing: 0.2 },\n  again: {", 1)

# imports
for imp, mod in [("import { Confetti } from '@/components/confetti';", "@/components/confetti"),
                 ("import { STAGES, nextStep } from '@/constants/journey';", "@/constants/journey")]:
    if not re.search(r"from '" + re.escape(mod) + r"'", s):
        last = None
        for last in re.finditer(r"^import .*\n", s, re.M): pass
        s = s[:last.end()] + imp + "\n" + s[last.end():]

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
