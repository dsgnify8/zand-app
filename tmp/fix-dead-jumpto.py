# Remove the dead level-jump block.
#
# When the jump moved from "the stage matching your stated level" to "the
# stage holding the latest thing you touched", the declaration of jumpTo went
# but this block in onContentSizeChange stayed, so the map threw a
# ReferenceError as soon as its content laid out.
#
# The scroll now happens in the target stage's own onLayout, which is where
# the offsets actually become known. All this handler has left to do is
# restore the previous position.

p = "app/learn/map.tsx"
s = open(p).read()

a = """          // A level jump beats restoring where they were — they have just
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
"""

if a in s:
    s = s.replace(a, "", 1)
    open(p, "w").write(s)
    print("removed")
else:
    print("  not matched — paste lines 175-200")

# Nothing may still reference the removed name.
for i, line in enumerate(s.splitlines(), 1):
    if "jumpTo" in line:
        print(f"  STILL REFERENCED {i}: {line.strip()[:70]}")
print("jumpTo references:", s.count("jumpTo"))
print("useLocalSearchParams still used:", s.count("useLocalSearchParams"))
