# -*- coding: utf-8 -*-
# Wire the sync layer in.
#
#   1. Every store calls syncTouch() right after it persists. The call is
#      a no-op when signed out, so the stores stay simple and there is no
#      branching at each call site.
#   2. auth.tsx pulls and merges on sign-in, stops on sign-out.
#   3. The app flushes pending writes when it goes to the background, so
#      force-quitting inside the debounce window does not lose anything.

import re, os

did = []

# ---- 1. the stores ----
STORES = [
 "lib/learn-progress.ts",
 "lib/word-strength.ts",
 "lib/stats-store.ts",
 "lib/saved-store.ts",
 "lib/learn-level.ts",
]

for p in STORES:
    if not os.path.exists(p): continue
    s = open(p).read()
    if "syncTouch" in s:
        continue
    # add the import after the AsyncStorage one
    m = re.search(r"import AsyncStorage from '@react-native-async-storage/async-storage';\n", s)
    if not m:
        did.append(p.split("/")[-1] + ":NO-IMPORT"); continue
    s = s[:m.end()] + "import { syncTouch } from '@/lib/cloud-sync';\n" + s[m.end():]

    # follow every setItem / multiSet with a touch
    n = 0
    def add(mm):
        global n
        n += 1
        return mm.group(0) + " syncTouch();"

    s = re.sub(r"await AsyncStorage\.setItem\([^;]*\);", add, s)
    s = re.sub(r"await AsyncStorage\.multiSet\([^;]*\);", add, s)
    s = re.sub(r"await AsyncStorage\.multiRemove\([^;]*\);", add, s)

    open(p, "w").write(s)
    did.append(p.split("/")[-1] + ":" + str(n))

# ---- 2. auth ----
p = "lib/auth.tsx"
s = open(p).read()

if "cloud-sync" not in s:
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { pullAndMerge, syncStop, syncFlush } from '@/lib/cloud-sync';\n" + s[last.end():]

    # on session change: pull when we have a user, stop when we do not
    m = re.search(r"(const \[session, setSession\][^\n]*\n)", s)
    hook = """
  // Sync. When a session appears we pull the cloud copy and merge it into
  // whatever is on this device, so a user who used the app signed out
  // keeps everything they did. When it goes away we stop syncing but
  // leave the local data alone.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const uid = session?.user?.id;
      if (uid) {
        const changed = await pullAndMerge(uid);
        if (changed && !cancelled) {
          // reload the stores so the UI shows what we just pulled
          try {
            const [{ loadLearnProgress }, { loadStrength }, { loadStats }, { loadSaved }] = await Promise.all([
              import('@/lib/learn-progress'),
              import('@/lib/word-strength'),
              import('@/lib/stats-store'),
              import('@/lib/saved-store'),
            ]);
            await Promise.all([loadLearnProgress(), loadStrength(), loadStats(), loadSaved()]);
          } catch {}
        }
      } else {
        syncStop();
      }
    })();
    return () => { cancelled = true; };
  }, [session?.user?.id]);
"""
    # insert the hook just before the provider return
    m2 = re.search(r"\n  return \(\n    <AuthContext\.Provider", s)
    if m2:
        s = s[:m2.start()] + "\n" + hook + s[m2.start():]
        did.append("auth:hook")
    if "useEffect" in s and "import { useEffect" not in s and "useEffect," not in s:
        s = re.sub(r"import \{ ([^}]*) \} from 'react';", lambda mm: "import { " + ", ".join(sorted(set([x.strip() for x in mm.group(1).split(",")] + ["useEffect"]))) + " } from 'react';", s, count=1)
    open(p, "w").write(s)

# ---- 3. flush on background ----
p = "app/_layout.tsx"
s = open(p).read()
if "syncFlush" not in s:
    last = None
    for last in re.finditer(r"^import .*\n", s, re.M): pass
    s = s[:last.end()] + "import { AppState } from 'react-native';\nimport { syncFlush } from '@/lib/cloud-sync';\n" + s[last.end():]
    m = re.search(r"export default function RootLayout\([^)]*\)[^{]*\{\n", s)
    if m:
        s = s[:m.end()] + """  // push anything pending when the app goes to the background, so a
  // force quit inside the debounce window does not lose progress
  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => {
      if (st !== 'active') syncFlush();
    });
    return () => sub.remove();
  }, []);
""" + s[m.end():]
        did.append("layout:flush")
    open(p, "w").write(s)

print("wired:", " | ".join(did))
