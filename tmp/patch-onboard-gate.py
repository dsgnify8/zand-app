# One mechanism for the onboarding gate.
#
# There were three, layered over an afternoon: a mutable export assigned
# inside an effect, a module-level cache, and a component state. Each was
# added to fix what the previous one broke, and together they could leave
# the gate certain that onboarding had not happened when it just had.
#
# Now there is one: lib/onboarded.ts owns the answer, the gate reads it
# and subscribes, and the onboarding screen tells it when it is finished.
# No cycle, because the screen no longer imports the layout that renders
# it, and no cached false, because a false is just "not yet".

import re

p = "app/_layout.tsx"
s = open(p).read()

# ---------------------------------------------- out with all three
start = s.find("export let onboardingDone: () => void = () => {};")
end = s.find("function AuthGate() {")
if start < 0 or end < start:
    print("   could not find the block to replace"); raise SystemExit

s = s[:start] + s[end:]
print("removed the old machinery")

# ------------------------------------------------ and the gate itself
a = """function AuthGate() {
  // Onboarding runs before anything else, once, unless demo mode clears it.
  const [onboarded, setOnboarded] = useState<boolean | null>(onboardedOnce);
  useEffect(() => {
    // Only a true is worth caching. Caching a false meant a first launch
    // remembered "not onboarded" for the whole session, and finishing
    // onboarding could not change its mind.
    if (onboardedOnce === true) return;
    AsyncStorage.getItem('onboarded')
      .then((v) => {
        if (v === '1') onboardedOnce = true;
        setOnboarded(v === '1');
      })
      .catch(() => { onboardedOnce = true; setOnboarded(true); });
  }, []);

  // The onboarding screen calls this when it finishes, so the gate does not
  // keep redirecting back on its stale value.
  useEffect(() => { onboardingDone = () => { onboardedOnce = true; setOnboarded(true); }; }, []);"""
b = """function AuthGate() {
  // Onboarding runs before anything else, once, unless demo mode clears it.
  //
  // The answer lives in lib/onboarded, which survives the remount a
  // language change causes and cannot be told the wrong thing by a
  // callback that has not been assigned yet.
  const [onboarded, setOnboarded] = useState<boolean | null>(onboardedNow());
  useEffect(() => {
    readOnboarded().then(setOnboarded);
    return onOnboarded(() => setOnboarded(true));
  }, []);"""
if a in s:
    s = s.replace(a, b, 1)
    print("gate rewired")
else:
    print("   gate body differs — paste it")

# ------------------------------------------------------ the import
m = re.search(r"^import .*from '@/lib/auth';\n", s, re.M)
if m and "lib/onboarded" not in s:
    s = s[:m.end()] + "import { markOnboarded, onboardedNow, onOnboarded, readOnboarded } from '@/lib/onboarded';\n" + s[m.end():]
    print("imported")

open(p, "w").write(s)

# ------------------------------------- and the screen, off the layout
p2 = "app/onboarding.tsx"
s2 = open(p2).read()
s2 = s2.replace("import { markOnboarded } from '@/app/_layout';",
                "import { markOnboarded } from '@/lib/onboarded';", 1)
open(p2, "w").write(s2)
print("cycle broken:", "from '@/lib/onboarded'" in s2)

# what still references the old names
import subprocess
left = subprocess.run(["grep", "-rn", "onboardingDone\\|onboardedOnce", "app", "components", "lib"],
                      capture_output=True, text=True).stdout.strip()
print("\nremaining references:")
print(left if left else "   none")
