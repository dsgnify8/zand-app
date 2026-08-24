# A JSX comment cannot sit at the root of a return.
#
# {/* ... */} is only valid inside JSX. Placed before the returned element it
# is parsed as an object literal, which is the "expected ," at 106:8.
#
# Same note, moved above the return as a plain comment.

p = "components/continue-reading.tsx"
s = open(p).read()

a = """    return (
      {/* No margin here: s.label already carries spacing.xxl above it. The
          wrapper used to add spacing.xl on top, which is why this state sat
          lower than the real rail. */}
      <View>"""

b = """    // No margin on the wrapper: s.label already carries spacing.xxl above
    // it, and the spacing.xl that used to sit on top of that is why this
    // state rendered lower than the real rail.
    return (
      <View>"""

if a in s:
    open(p, "w").write(s.replace(a, b, 1))
    print("fixed")
else:
    print("  not matched — paste lines 96-112 and I will look")

# No other stray JSX comments at a return boundary in this file.
import re
bad = re.findall(r"return \(\s*\{/\*", s)
print("other misplaced JSX comments:", len(bad))
