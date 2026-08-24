# Back should close an open phrasebook category before leaving the screen.
#
# The categories are state, not routes, so the iOS edge swipe and the Android
# back button have nothing to pop but the whole phrasebook — which is why
# they land on Learn. The header arrow on line ~50 already handles this
# correctly; this teaches the system back the same thing.
#
# Scoped to this file only. The identical pattern on the lesson runner is
# what once made back step through every exercise one at a time.

p = "app/learn/phrasebook.tsx"
s = open(p).read()

applied, skipped = 0, []

# ---- 1. react hooks -------------------------------------------------
a = "import { useState } from 'react';"
b = "import { useEffect, useRef, useState } from 'react';"
if a in s:
    s = s.replace(a, b, 1); applied += 1
else:
    skipped.append("react import")

# ---- 2. useNavigation, merged into the existing expo-router import ---
# Two separate imports from the same module have broken a file here before,
# so this edits the line in place rather than adding a second one.
lines = s.splitlines(keepends=True)
done_nav = False
for i, line in enumerate(lines):
    if "from 'expo-router'" in line and line.lstrip().startswith("import"):
        if "useNavigation" in line:
            done_nav = True
            break
        if line.lstrip().startswith("import {") and "}" in line:
            head, rest = line.split("}", 1)
            lines[i] = head.rstrip().rstrip(",") + ", useNavigation }" + rest
            done_nav = True
        break
if done_nav:
    s = "".join(lines); applied += 1
else:
    skipped.append("expo-router import (add useNavigation by hand)")

# ---- 3. the listener ------------------------------------------------
anchor = "const [sending, setSending] = useState<any>(null);"
block = """

  // Back closes an open category before it leaves the screen.
  //
  // The categories are state rather than routes, so a system back — the iOS
  // edge swipe, the Android button — has nothing to pop but the whole
  // phrasebook, which is how you ended up on Learn. This intercepts exactly
  // one level: with a category open it clears it, otherwise it lets the pop
  // through untouched.
  //
  // The ref is what keeps this to one level. Reading `open` straight from
  // the closure would go stale, and resubscribing on every change is how you
  // end up with a stack of listeners each swallowing one press — which is
  // the bug that once made back walk through every exercise in a lesson.
  const navigation = useNavigation();
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const stop = (navigation as any).addListener('beforeRemove', (e: any) => {
      if (!openRef.current) return; // nothing open — leave as normal
      e.preventDefault();
      setOpen(null);
    });
    return stop;
  }, [navigation]);
"""

if anchor in s:
    idx = s.index(anchor) + len(anchor)
    s = s[:idx] + block + s[idx:]
    applied += 1
else:
    skipped.append("sending state anchor")

open(p, "w").write(s)
print("applied", applied, "of 3")
for k in skipped:
    print("   skipped:", k)

# The listener must sit above any early return, and only this file may have one.
print("useNavigation imported:", "useNavigation" in s)
print("listener count here:", s.count("beforeRemove"))
