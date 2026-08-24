# Enter the journey where the progress is, not where the level says.
#
# The level answer is a decent guess and a bad instruction: someone who
# speaks Persian but cannot read it picks "I can hold a conversation" and
# lands in the middle of a script they cannot read. So the questionnaire
# stays as a question — it colours the copy and the picker — and the entry
# point comes from the one thing that is actually true: the first step they
# have not finished.
#
# Same scroll machinery, different target. Someone brand new has their first
# unfinished step in stage I, so they still start at the top.

p = "app/learn/map.tsx"
s = open(p).read()
n = 0

# ---- stop reading the level out of the route ---------------------------
a = """  // Set when arriving from the level questionnaire.
  const { level: jumpTo } = useLocalSearchParams<{ level?: string }>();
  const jumped = useRef(false);
  // First stage at that level. The stages are not in level order, so this is
  // a search rather than an index.
  const targetKey = jumpTo ? STAGES.find((st) => st.level === jumpTo)?.key : undefined;"""
b = """  const jumped = useRef(false);"""
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: jumpTo block")

# ---- take it from progress instead -------------------------------------
a = """  const flat = STAGES.flatMap((st) => st.steps);
  const next = flat.find((st) => !stepDone(st));"""
b = """  const flat = STAGES.flatMap((st) => st.steps);
  const next = flat.find((st) => !stepDone(st));

  // The stage holding that step is where the map opens. Identity holds
  // because `flat` is built from the same step objects STAGES contains.
  // Undefined once the whole route is finished, which falls back to
  // restoring wherever they last were.
  const targetKey = next ? STAGES.find((st) => st.steps.includes(next))?.key : undefined;"""
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: next block")

open(p, "w").write(s)
print("applied", n, "of 2")
print("level param gone:", "useLocalSearchParams<{ level" not in s)
print("targetKey defined once:", s.count("const targetKey") == 1)
