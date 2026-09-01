# Light across the page.
#
# Explore is six sections on one flat cream ground, so scrolling it reads
# as a long list rather than as moving between places. This puts a very
# pale wash behind each — warm over history, cooler over the map, warmer
# again for the poets — angled differently each time.
#
# Kept at six to nine percent. Any stronger and six washes turn cream into
# grey; at this weight it reads as light falling across the page, which is
# the point.

p = "app/(tabs)/explore.tsx"
s = open(p).read()
total = 0


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------------- the component
sub("""function Rise({ children, index }: { children: any; index: number }) {""",
"""/**
 * A section's own light.
 *
 * Six pale washes, each from a different corner. Drawn from the app's
 * palette rather than new hues so the page stays one place — the shift is
 * meant to be felt while scrolling, not seen when still.
 */
const WASH: { from: string; to: string; x: number; y: number }[] = [
  { from: 'rgba(140,58,46,0.07)', to: 'transparent', x: 0, y: 0 },      // history, warm from the left
  { from: 'rgba(65,114,112,0.06)', to: 'transparent', x: 1, y: 0 },     // geography, cool from the right
  { from: 'rgba(166,95,66,0.06)', to: 'transparent', x: 0, y: 1 },      // poets, warm from below
  { from: 'rgba(122,80,104,0.05)', to: 'transparent', x: 1, y: 1 },     // culture, plum
  { from: 'rgba(201,162,39,0.05)', to: 'transparent', x: 0, y: 0 },     // language, gold
  { from: 'rgba(65,114,112,0.05)', to: 'transparent', x: 1, y: 0 },     // and back to green
];

function SectionWash({ index }: { index: number }) {
  const w = WASH[index % WASH.length];
  return (
    <LinearGradient
      pointerEvents="none"
      colors={[w.from, w.to]}
      start={{ x: w.x, y: w.y }}
      end={{ x: 1 - w.x, y: 1 - w.y }}
      style={{
        position: 'absolute',
        // Past the page's own padding, so the light reaches the edges
        // rather than stopping in a rectangle.
        left: -spacing.lg, right: -spacing.lg, top: -spacing.xl, bottom: -spacing.xl,
        borderRadius: 28,
      }}
    />
  );
}

function Rise({ children, index }: { children: any; index: number }) {""",
    "wash component")

# ------------------------------------------------- behind each section
sub("""      style={{
        opacity: a,
        transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
      }}
    >
      {children}""",
"""      style={{
        opacity: a,
        transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
      }}
    >
      <SectionWash index={index} />
      {children}""",
    "wash behind")

open(p, "w").write(s)
print("total:", total)

# LinearGradient has to be imported
if "expo-linear-gradient" not in s:
    print("\n   note: LinearGradient is not imported in this file")
