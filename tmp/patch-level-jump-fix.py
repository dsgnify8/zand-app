# The level jump never fires.
#
# It was hung off onContentSizeChange, but the stage offsets are filled in by
# each stage's onLayout — and on first mount the content size is known before
# any stage has measured. So the handler ran once against an empty
# stageOffsets, found nothing, and never got another chance.
#
# Doing it from the target stage's own onLayout removes the ordering question:
# the scroll happens at the exact moment that stage knows where it is.
#
# Two console.logs go in with it. Paste what they print rather than trusting
# that this worked.

p = "app/learn/map.tsx"
s = open(p).read()
n = 0

# ---- which stage are we aiming at --------------------------------------
a = """  const { level: jumpTo } = useLocalSearchParams<{ level?: string }>();
  const jumped = useRef(false);"""
b = """  const { level: jumpTo } = useLocalSearchParams<{ level?: string }>();
  const jumped = useRef(false);
  // First stage at that level. The stages are not in level order, so this is
  // a search rather than an index.
  const targetKey = jumpTo ? STAGES.find((st) => st.level === jumpTo)?.key : undefined;
  console.log('[level jump] param =', jumpTo, ' target =', targetKey);"""
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: jumpTo block")

# ---- scroll when that stage measures ------------------------------------
a = "            onLayout={(e) => { stageOffsets.current[stage.key] = e.nativeEvent.layout.y; }}"
b = """            onLayout={(e) => {
              const y = e.nativeEvent.layout.y;
              stageOffsets.current[stage.key] = y;
              // Arriving from the questionnaire: scroll as soon as the stage
              // being aimed at knows its own position. Waiting on
              // onContentSizeChange meant reading these offsets before any of
              // them existed.
              if (!jumped.current && stage.key === targetKey) {
                jumped.current = true;
                restored.current = true; // and do not also restore the old position
                console.log('[level jump] scrolling to', stage.key, 'at', y);
                requestAnimationFrame(() =>
                  scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated: false }),
                );
              }
            }}"""
if a in s:
    s = s.replace(a, b, 1); n += 1
else:
    print("   skipped: stage onLayout")

open(p, "w").write(s)
print("applied", n, "of 2")
