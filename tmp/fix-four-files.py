# Repair the four files the sweep broke.
#
# These destructure their props across several lines, so `function X({`
# matched as a complete declaration and the hook was inserted into the middle
# of the parameter list rather than the body.
#
# Lift the block out, find the real end of the signature — the `) {` that
# closes the parameter list — and put it after that.

import re

FILES = [
    "components/empty-state.tsx",
    "components/founder-flip.tsx",
    "components/parallax-scroll-view.tsx",
    "components/save-heart.tsx",
]

BLOCK = """  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
"""

for p in FILES:
    s = open(p).read()

    if BLOCK not in s:
        print("  block not found:", p)
        continue

    # where did it land, and therefore which function does it belong to
    at = s.index(BLOCK)
    s = s.replace(BLOCK, "", 1)

    # the first `) {` or `}: ... ) {` after that point closes the signature
    m = re.search(r"\)\s*\{\s*\n", s[at:])
    if not m:
        print("  could not find body start:", p)
        continue

    ins = at + m.end()
    s = s[:ins] + BLOCK + s[ins:]
    open(p, "w").write(s)
    print("fixed:", p)

print("\nParse them before anything else.")
