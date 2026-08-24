# Strip the language debugging.
#
# Removes the [L] probes, useLangProbe and the emit counter, and puts emit
# back to its plain form. The comments explaining *why* the fixes are shaped
# the way they are stay — those were dearly bought.
#
# Line-based, but each removal is matched exactly rather than by substring,
# because a blunt "drop any line containing X" is what deleted the emit
# declaration earlier tonight.

import re

total = 0

# ------------------------------------------------------------ i18n.ts
p = "lib/i18n.ts"
s = open(p).read()

a = """let seq = 0;
const emit = () => {
  seq += 1;
  console.log('[L] emit #' + seq + ' -> ' + listeners.size + ' listeners, lang=' + lang);
  listeners.forEach((l) => l());
};

/** Render counter, so a screen can report whether it re-rendered on an emit. */
export function useLangProbe(name: string) {
  const now = useLang().lang;
  console.log('[L] render ' + name + ' lang=' + now + ' emit=' + seq);
  return now;
}"""
b = "const emit = () => listeners.forEach((l) => l());"
if a in s:
    s = s.replace(a, b, 1); total += 1; print("i18n: probe removed")
else:
    print("   i18n: probe block not matched — check by hand")
open(p, "w").write(s)

# --------------------------------------------------------- the screens
for p, probe in [
    ("app/(tabs)/profile.tsx", None),
    ("app/(tabs)/explore.tsx", "  useLangProbe('Explore');\n"),
    ("components/profile-modals.tsx", "  useLangProbe('Settings');\n"),
]:
    s = open(p).read()
    before = s

    if probe and probe in s:
        s = s.replace(probe, "", 1)

    # profile's hand-rolled instance probe
    s = s.replace("""  const _n = useRef(Math.random().toString(36).slice(2, 5));
  console.log('[L] BODY', _n.current, 'lang=' + require('@/lib/i18n').getLang());
""", "")
    s = s.replace("{console.log('[L] JSX ', _n.current, t(PROFILE.welcome)) as any}", "")

    # the import, however it was merged
    s = s.replace("{ useLangProbe, ", "{ ")
    s = s.replace(" useLangProbe,", "")
    s = s.replace("useLangProbe, ", "")

    if s != before:
        open(p, "w").write(s)
        total += 1
        print("cleaned:", p)
    else:
        print("   nothing to clean:", p)

# ------------------------------------------------------------- verify
import subprocess
out = subprocess.run(["grep", "-rn", "useLangProbe\\|\\[L\\]", "app", "components", "lib"],
                     capture_output=True, text=True).stdout.strip()
print("\nremaining probe references:", out if out else "none")
print("emit intact:", "const emit = () => listeners.forEach" in open("lib/i18n.ts").read())
print("total files:", total)
