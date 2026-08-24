# The level answer should register, not navigate.
#
# Picking a level went straight into the map, so the sequence was: answer the
# question, land mid-journey, come back, and set the level again to get the
# jump. The answer now just registers and returns to Learn; the journey box
# carries the level through when they choose to go in.
#
# Also removes the two debug logs from the jump, now that it works.

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


# The questionnaire hands back to Learn. The level is stored; where they go
# with it is the journey box's business.
edit("lib/learn-level.ts", [
 ("    blurb: 'You are starting from the letters.', start: '/learn/map' },",
  "    blurb: 'You are starting from the letters.', start: '/learn' },"),
 ("    blurb: 'You can read a little and know a handful of phrases.', start: '/learn/map?level=elementary' },",
  "    blurb: 'You can read a little and know a handful of phrases.', start: '/learn' },"),
 ("    blurb: 'You want sentences, grammar, and more range.', start: '/learn/map?level=intermediate' },",
  "    blurb: 'You want sentences, grammar, and more range.', start: '/learn' },"),
 ("    blurb: 'You want longer texts and real writing practice.', start: '/learn/map?level=advanced' },",
  "    blurb: 'You want longer texts and real writing practice.', start: '/learn' },"),
])

edit("app/(tabs)/learn.tsx", [
 ("""  const { asked: chosen, ready } = useLevel();
  // Unknown counts as chosen, so a returning learner never sees the card
  // flash the questionnaire for a frame before the stored answer lands.
  const asked = !ready || chosen;
  const first = UNITS[0]?.lessons[0];
  const dest = !asked
    ? '/learn/level'
    : '/learn/map';""",
  """  const { asked: chosen, ready, level } = useLevel();
  // Unknown counts as chosen, so a returning learner never sees the card
  // flash the questionnaire for a frame before the stored answer lands.
  const asked = !ready || chosen;
  const first = UNITS[0]?.lessons[0];
  // The level rides along, so entering the journey lands on the stage they
  // said they were at instead of the very top.
  const dest = !asked
    ? '/learn/level'
    : level
      ? '/learn/map?level=' + level
      : '/learn/map';"""),
])

edit("app/learn/map.tsx", [
 ("  console.log('[level jump] param =', jumpTo, ' target =', targetKey);\n", ""),
 ("                console.log('[level jump] scrolling to', stage.key, 'at', y);\n", ""),
])

print("\ntotal:", total)
