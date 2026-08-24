# Break the spine where the topics rail crosses it.
#
# The lead-in is one hairline running 150pt above the section, up past the
# title. The rail now sits in that stretch, and a line through a row of words
# makes both harder to read. So the lead-in becomes two segments with a gap
# at the rail's height: down from the title, break, resume below the names
# and carry on into the track.
#
# RAIL_TOP and RAIL_BOTTOM are measured up from the section's top edge. If
# the gap sits high or low, those are the two numbers — a larger RAIL_TOP
# starts the break earlier, a larger RAIL_BOTTOM ends it later.

p = "components/history-chapters.tsx"
s = open(p).read()

PAIRS = [
 ("const LEAD = 150; // spine drawn above the section, up toward the page title",
  "const LEAD = 150; // spine drawn above the section, up toward the page title\n"
  "// Where the topics rail crosses the lead-in, measured up from the section top.\n"
  "const RAIL_TOP = 44; // the break opens here\n"
  "const RAIL_BOTTOM = 10; // and closes here"),

 ("""      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -LEAD,
          left: X(SPINE_X) - 0.7,
          width: 1.4,
          height: LEAD,
          backgroundColor: LINE,
        }}
      />""",
  """      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -LEAD,
          left: X(SPINE_X) - 0.7,
          width: 1.4,
          height: LEAD - RAIL_TOP,
          backgroundColor: LINE,
        }}
      />
      {/* …the rail sits in the gap here… */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -RAIL_BOTTOM,
          left: X(SPINE_X) - 0.7,
          width: 1.4,
          height: RAIL_BOTTOM,
          backgroundColor: LINE,
        }}
      />"""),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip().splitlines()[0][:60])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
