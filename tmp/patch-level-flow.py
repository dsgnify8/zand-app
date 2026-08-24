# Two fixes in the learning world.
#
# 1. The level questionnaire comes back every time.
#
#    `asked` starts false as a module default and only becomes true once
#    loadLevel's AsyncStorage read resolves. Three screens branch on !asked,
#    and on a cold start they all run before that read finishes — so "has not
#    loaded" gets read as "has not chosen" and the questionnaire reappears.
#    The store had no way to express "not known yet"; now it does, and
#    nothing acts until it is.
#
# 2. The level picked does nothing.
#
#    All four LEVELS entries had start: '/learn', so every answer went to the
#    same place. They now carry the level through to the map, which scrolls
#    to the first stage at that level. Stage levels are not monotonic —
#    elementary returns at XI-XIII after intermediate — so this is first
#    match, and everything after it is still reached by carrying on down.

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


# ------------------------------------------------------- the store
edit("lib/learn-level.ts", [
 ("let level: Level | null = null;\nlet asked = false;",
  "let level: Level | null = null;\nlet asked = false;\n"
  "// Whether the stored answer has been read yet. Without this, `asked`\n"
  "// being false is ambiguous: it means either 'they skipped the question'\n"
  "// or 'we have not looked yet', and the screens cannot tell them apart.\n"
  "let ready = false;"),

 ("""export async function loadLevel() {
  try {
    const [l, a] = await AsyncStorage.multiGet([K_LEVEL, K_ASKED]);
    level = (l[1] as Level | null) ?? null;
    asked = a[1] === '1';
    emit();
  } catch {}
}""",
  """export async function loadLevel() {
  try {
    const [l, a] = await AsyncStorage.multiGet([K_LEVEL, K_ASKED]);
    level = (l[1] as Level | null) ?? null;
    asked = a[1] === '1';
  } catch {}
  // Ready even if the read threw. A failed read is still a settled answer,
  // and leaving this false would hold every screen in limbo.
  ready = true;
  emit();
}"""),

 ("export async function setLevel(v: Level) {\n  level = v; asked = true; emit();",
  "export async function setLevel(v: Level) {\n  level = v; asked = true; ready = true; emit();"),

 ("export async function skipLevel() {\n  asked = true; emit();",
  "export async function skipLevel() {\n  asked = true; ready = true; emit();"),

 ("export function hasChosen() { return asked; }",
  "export function hasChosen() { return asked; }\nexport function isReady() { return ready; }"),

 ("  return { level, asked, info: levelInfo(level) };",
  "  return { level, asked, ready, info: levelInfo(level) };"),

 # each answer now carries through to its stage
 ("    blurb: 'You are starting from the letters.', start: '/learn' },",
  "    blurb: 'You are starting from the letters.', start: '/learn/map' },"),
 ("    blurb: 'You can read a little and know a handful of phrases.', start: '/learn' },",
  "    blurb: 'You can read a little and know a handful of phrases.', start: '/learn/map?level=elementary' },"),
 ("    blurb: 'You want sentences, grammar, and more range.', start: '/learn' },",
  "    blurb: 'You want sentences, grammar, and more range.', start: '/learn/map?level=intermediate' },"),
 ("    blurb: 'You want longer texts and real writing practice.', start: '/learn' },",
  "    blurb: 'You want longer texts and real writing practice.', start: '/learn/map?level=advanced' },"),
])

# ------------------------------------------------- the three readers
edit("app/(tabs)/learn.tsx", [
 ("""function ContinueCard() {
  const { asked } = useLevel();""",
  """function ContinueCard() {
  const { asked: chosen, ready } = useLevel();
  // Unknown counts as chosen, so a returning learner never sees the card
  // flash the questionnaire for a frame before the stored answer lands.
  const asked = !ready || chosen;"""),

 ("""  const { asked: levelAsked } = useLevel();
  useEffect(() => {
    if (!levelAsked) router.replace('/learn/level' as any);
  }, [levelAsked]);""",
  """  const { asked: levelAsked, ready: levelReady } = useLevel();
  useEffect(() => {
    // Wait for the stored answer. Redirecting on !levelAsked alone fired
    // before the read resolved, which is why the questionnaire came back on
    // every cold start no matter what had been picked.
    if (levelReady && !levelAsked) router.replace('/learn/level' as any);
  }, [levelReady, levelAsked]);"""),
])

edit("components/learn-hero.tsx", [
 ("  const { asked, info } = useLevel();",
  "  const { asked: chosen, ready, info } = useLevel();\n"
  "  // Same as the continue card: not loaded is not the same as not chosen.\n"
  "  const asked = !ready || chosen;"),
])

# ------------------------------------------------------- the jump
p = "app/learn/map.tsx"
s = open(p).read()
n = 0

# merge into the existing expo-router import rather than adding a second
lines = s.splitlines(keepends=True)
for i, line in enumerate(lines):
    if "from 'expo-router'" in line and line.lstrip().startswith("import"):
        if "useLocalSearchParams" not in line and "}" in line:
            head, rest = line.split("}", 1)
            lines[i] = head.rstrip().rstrip(",") + ", useLocalSearchParams }" + rest
            n += 1
        break
s = "".join(lines)

a = "  const { session } = useAuth();"
b = ("  const { session } = useAuth();\n"
     "  // Set when arriving from the level questionnaire.\n"
     "  const { level: jumpTo } = useLocalSearchParams<{ level?: string }>();\n"
     "  const jumped = useRef(false);")
if a in s:
    s = s.replace(a, b, 1); n += 1

a = """        onContentSizeChange={() => {
          // Only once per mount, and only if they had actually scrolled;
          // otherwise every layout pass would fight the user.
          if (!restored.current && lastScrollY > 40) {
            restored.current = true;
            scrollRef.current?.scrollTo({ y: lastScrollY, animated: false });
          }
        }}"""
b = """        onContentSizeChange={() => {
          // A level jump beats restoring where they were — they have just
          // said where they want to start. Stage offsets arrive from onLayout,
          // so if the target has not measured yet this leaves `jumped` false
          // and tries again on the next pass.
          if (!jumped.current && jumpTo) {
            const target = STAGES.find((st) => st.level === jumpTo);
            const y = target ? stageOffsets.current[target.key] : undefined;
            if (y !== undefined) {
              jumped.current = true;
              restored.current = true;
              scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated: false });
              return;
            }
          }
          // Only once per mount, and only if they had actually scrolled;
          // otherwise every layout pass would fight the user.
          if (!restored.current && lastScrollY > 40) {
            restored.current = true;
            scrollRef.current?.scrollTo({ y: lastScrollY, animated: false });
          }
        }}"""
if a in s:
    s = s.replace(a, b, 1); n += 1

open(p, "w").write(s)
total += n
print(f"map.tsx: {n} of 3")

print("\ntotal:", total)
print("useLocalSearchParams imported once:", s.count("useLocalSearchParams") >= 2)
print("expo-router imports in map:", s.count("from 'expo-router'"))
