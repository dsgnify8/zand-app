# Poets read, and a counter that stops inflating.
#
# recordFinished prepended to `finished` and incremented topicsFinished with
# no check for whether that key was already there — so re-opening a finished
# topic counted it again, every visit. The count could only ever drift up.
# The guard fixes that for everything that uses it.
#
# With the guard in place the same call can serve poets: it takes the field
# to increment, so a poet increments poetsRead instead. Until now nothing in
# the app distinguished a poet from a history topic, which is why
# "learnt about 4 poets" could not be written.
#
# The literature reader recorded nothing at all — no pages, no completion.
# It now does both, matching app/education/reader.tsx.

total = 0

def edit(path, pairs):
    global total
    s = open(path).read()
    n = 0
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b, 1); n += 1
        else:
            print("   skipped:", path.split("/")[-1], "|", a.strip().splitlines()[0][:56])
    open(path, "w").write(s)
    total += n
    print(f"{path.split('/')[-1]}: {n} of {len(pairs)}")


# ---------------------------------------------------------- the store
edit("lib/stats-store.ts", [
 ("  topicsFinished: number;", "  topicsFinished: number;\n  poetsRead: number;"),

 ("  topicsFinished: 0, articlesRead: 0, videosWatched: 0, pagesRead: 0,",
  "  topicsFinished: 0, poetsRead: 0, articlesRead: 0, videosWatched: 0, pagesRead: 0,"),

 ("export function recordFinished(item: { key: string; title: string; sub: string; route: string }) {",
  """export function recordFinished(
  item: { key: string; title: string; sub: string; route: string },
  field: keyof Stats = 'topicsFinished',
) {
  // Reading something a second time is not finishing it a second time.
  // Without this the counter climbed on every revisit.
  if (state.finished.some((f) => f.key === item.key)) return;"""),

 ("  state = { ...state, finished: [{ ...item, at: Date.now() }, ...state.finished], topicsFinished: state.topicsFinished + 1 };",
  """  state = {
    ...state,
    finished: [{ ...item, at: Date.now() }, ...state.finished],
    [field]: (((state as any)[field] as number) ?? 0) + 1,
  } as Stats;"""),

 ("  { key: 'topics10', label: '10 topics finished', field: 'topicsFinished', target: 10 },",
  """  { key: 'topics10', label: '10 topics finished', field: 'topicsFinished', target: 10 },
  { key: 'poet1', label: 'First poet read', field: 'poetsRead', target: 1 },
  { key: 'poets4', label: '4 poets read', field: 'poetsRead', target: 4 },
  { key: 'poets7', label: 'All seven poets', field: 'poetsRead', target: 7 },"""),
])

# ------------------------------------------------- the literature reader
p = "app/literature/reader.tsx"
s = open(p).read()
n = 0

# useEffect on the react import
lines = s.splitlines(keepends=True)
for i, line in enumerate(lines):
    if "from 'react'" in line and line.lstrip().startswith("import"):
        if "useEffect" not in line and "{" in line:
            lines[i] = line.replace("{", "{ useEffect,", 1)
            n += 1
        break
else:
    lines.insert(0, "import { useEffect } from 'react';\n"); n += 1
s = "".join(lines)

if "stats-store" not in s:
    i = s.index("\n", s.index("import"))
    s = s[: i + 1] + "import { bump, recordFinished } from '@/lib/stats-store';\n" + s[i + 1 :]
    n += 1

a = "  const isEnd = p >= total;"
b = """  const isEnd = p >= total;

  // Nothing here recorded anything before, so a poet read cover to cover was
  // invisible to the rest of the app. Sits with the other derived values and
  // after the not-found return, matching app/education/reader.tsx — both
  // depend on `author` being stable for a given route, which it is.
  useEffect(() => {
    bump('pagesRead');
    if (isEnd || p + 1 >= total) {
      recordFinished(
        {
          key: 'poet-' + author.key,
          title: author.name,
          sub: 'Literature  ·  finished',
          route: '/literature/reader?author=' + author.key + '&page=0',
        },
        'poetsRead',
      );
    }
  }, [author.key, p, isEnd, total]);"""
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: isEnd anchor")

open(p, "w").write(s)
total += n
print(f"reader.tsx: {n} of 3")

# Milestones must all point at real Stats fields.
import re
st = open("lib/stats-store.ts").read()
fields = set(re.findall(r"^  (\w+): number;", st, re.M))
bad = sorted({f for f in re.findall(r"field: '(\w+)'", st) if f not in fields})
print("\ntotal:", total)
print("fields not on Stats:", bad if bad else "none")
