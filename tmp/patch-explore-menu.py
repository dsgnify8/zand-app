# Mount the rotated hamburger.
#
# It goes after the ScrollView, inside SafeAreaView, so it floats above the
# page and stays put while everything scrolls under it. Putting it inside
# the header would have made it fade out with the title on scroll, which is
# the opposite of what a shortcut is for.

p = "app/(tabs)/explore.tsx"
s = open(p).read()

PAIRS = [
 ("import { CultureQuote } from '@/components/culture-quote';",
  "import { CultureQuote } from '@/components/culture-quote';\n"
  "import { WorldMenu } from '@/components/world-menu';"),

 ("      </Animated.ScrollView>\n    </SafeAreaView>",
  "      </Animated.ScrollView>\n\n      <WorldMenu />\n    </SafeAreaView>"),
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
print("WorldMenu mounted:", "<WorldMenu />" in s)
