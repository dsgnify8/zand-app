# Local becomes a stack.
#
# A tab navigator has no history: tabs are siblings you switch between,
# not pages you go into. So there is nothing behind Saved to swipe back
# to, and moving between two listings swaps them at the same level rather
# than pushing one over the other — which is the glitch.
#
# A stack knows Local -> Cities -> London -> Berenjak. The edge gesture
# pops, pushes slide, and router.back() does the right thing without the
# canGoBack guards scattered around.
#
# business-new stays outside: listing your own business is a form reached
# from a menu, not a place in this hierarchy, and pushing it onto Local
# would make its back button go somewhere odd.

import os
import re
import shutil

MOVES = [
    ("app/(tabs)/local.tsx", "app/(tabs)/local/index.tsx"),
    ("app/(tabs)/local-cities.tsx", "app/(tabs)/local/cities.tsx"),
    ("app/(tabs)/local-city.tsx", "app/(tabs)/local/city.tsx"),
    ("app/(tabs)/local-categories.tsx", "app/(tabs)/local/categories.tsx"),
    ("app/(tabs)/local-saved.tsx", "app/(tabs)/local/saved.tsx"),
    ("app/(tabs)/local-folder.tsx", "app/(tabs)/local/folder.tsx"),
    ("app/(tabs)/business.tsx", "app/(tabs)/local/business.tsx"),
]

os.makedirs("app/(tabs)/local", exist_ok=True)
for src, dst in MOVES:
    if os.path.exists(src):
        shutil.move(src, dst)
        print("moved", src.split("/")[-1], "->", dst.split("/")[-1])
    else:
        print("   missing:", src)

# ------------------------------------------------------- the stack
open("app/(tabs)/local/_layout.tsx", "w").write('''import { Stack } from 'expo-router';

import { colors } from '@/constants/zand-theme';

/**
 * Local, as a stack.
 *
 * Everything here is reached from somewhere else here — a city from the
 * list, a listing from a city, a folder from saved — so it wants history
 * rather than a row of siblings. That is what gives the edge gesture and
 * the push transition; a tab navigator has neither, because it has
 * nothing to go back to.
 */
export default function LocalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        // The reason for all of this.
        gestureEnabled: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
''')
print("stack layout written")

# ------------------------------------- the tab entry, and the old hides
p = "app/(tabs)/_layout.tsx"
s = open(p).read()
for name in ["local-cities", "local-city", "local-categories", "local-saved",
             "local-folder", "business"]:
    line = '      <Tabs.Screen name="%s" options={{ href: null }} />\n' % name
    if line in s:
        s = s.replace(line, "", 1)
        print("unhidden", name)
open(p, "w").write(s)

# ------------------------------------------------- every navigate call
PATHS = [
    ("'/local-cities'", "'/local/cities'"),
    ("'/local-categories'", "'/local/categories'"),
    ("'/local-saved'", "'/local/saved'"),
    ("'/local-city?", "'/local/city?"),
    ("'/local-folder?", "'/local/folder?"),
    ("('/local-city?", "('/local/city?"),
    ("('/local-folder?", "('/local/folder?"),
    ("'/business?id='", "'/local/business?id='"),
    ("'/business?id=' +", "'/local/business?id=' +"),
    ("/local-city?c=", "/local/city?c="),
    ("/local-folder?id=", "/local/folder?id="),
    ("/business?id=", "/local/business?id="),
]

changed = {}
for root, _, files in os.walk("."):
    if any(skip in root for skip in ("node_modules", ".git", ".expo", "tmp")):
        continue
    for f in files:
        if not f.endswith((".ts", ".tsx")):
            continue
        path = os.path.join(root, f)
        src = open(path).read()
        before = src
        for a, b in PATHS:
            src = src.replace(a, b)
        # guard against a double rewrite
        src = src.replace("/local/local/", "/local/")
        if src != before:
            open(path, "w").write(src)
            changed[path] = sum(1 for a, _ in PATHS if a in before)

print("\nfiles with updated routes:")
for k in sorted(changed):
    print("   ", k)
print("\ntotal files:", len(changed))
