# The rotated hamburger comes out; the topics rail goes in under the kicker.
#
# components/world-menu.tsx is left on disk but is now unreferenced — delete
# it in a cleanup pass if the rail sticks.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

PAIRS = [
 ("import { WorldMenu } from '@/components/world-menu';",
  "import { TopicsRail } from '@/components/topics-rail';"),

 # the menu was the first child of the header
 ('        <View style={s.header} pointerEvents="box-none">\n          <WorldMenu />',
  '        <View style={s.header} pointerEvents="box-none">'),

 # the rail goes after the kicker, still inside the header so it scrolls away
 ("""          <Animated.Text style={[s.kicker, { opacity: headOpacity }]}>
            {fa ? 'هر چیزی که اینجا هست' : 'EVERYTHING WE HAVE'}
          </Animated.Text>""",
  """          <Animated.Text style={[s.kicker, { opacity: headOpacity }]}>
            {fa ? 'هر چیزی که اینجا هست' : 'EVERYTHING WE HAVE'}
          </Animated.Text>

          <TopicsRail />"""),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a.strip().splitlines()[0][:64])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

print("WorldMenu gone:", "WorldMenu" not in s)
print("TopicsRail mounted:", "<TopicsRail />" in s)

# The header centres its children; the rail has to span the page instead.
i = s.find("header: {")
print("header style:", s[i:i + 160].splitlines()[0] if i > -1 else "not found")
