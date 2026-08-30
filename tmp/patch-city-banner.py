# The city banner.
#
# The old one was a cold grey-brown fading to the page, which read as an
# absence of a photograph rather than as a decision. This gives each city
# its own warm gradient, seeded from its name so it never changes, and all
# drawn from the same family — terracotta, saffron, rose, clay — so the
# pages feel related rather than random.
#
# The type sits lower, in the last third, and the fade to the page runs
# longer and softer so the panel becomes the page rather than ending.

p = "components/local-cities.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("""        <View style={{ height: Math.round(H * 0.32) }}>
          <LinearGradient
            colors={['#2E2A26', '#4A403A', colors.background]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill as any}
          />""",
"""        <View style={{ height: Math.round(H * 0.38) }}>
          <LinearGradient
            colors={[...cityColours(name), colors.background]}
            locations={[0, 0.52, 1]}
            style={StyleSheet.absoluteFill as any}
          />""",
    "gradient")

# the palette, above the component
sub("export function CityPage() {",
"""/**
 * A city's two colours.
 *
 * Seeded from the name, so Dubai is always the same and never the same as
 * Doha. Four pairs rather than a generated hue, because a random warm
 * colour is usually a bad warm colour — these were chosen.
 */
const CITY_PALETTES: [string, string][] = [
  ['#4A2E24', '#8A5A3C'],   // terracotta
  ['#3E3220', '#8A7038'],   // saffron
  ['#442A2E', '#8A4A52'],   // rose
  ['#33322A', '#6E6A4C'],   // olive
  ['#3A2A34', '#7A5068'],   // plum
];

function cityColours(name: string): [string, string] {
  let n = 0;
  for (let i = 0; i < name.length; i++) n = (n * 31 + name.charCodeAt(i)) % 9973;
  return CITY_PALETTES[n % CITY_PALETTES.length];
}

export function CityPage() {""",
    "palette")

# the type, lower down
sub("""  heroText: {
    position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.xxl,
    alignItems: 'center',
  },""",
"""  // In the last third rather than centred. The top of the panel is quiet
  // and the name sits where the eye lands coming down the page.
  heroText: {
    position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: spacing.xl,
    alignItems: 'center',
  },""",
    "text position")

open(p, "w").write(s)
print("total:", total)
