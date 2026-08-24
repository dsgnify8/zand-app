# The chapter style is written across several lines, so the single-line
# match in the last patch missed it. This targets the two lines that matter.
#
# The other skipped hunk (top: cy - CIRCLE_R - 20) was a no-op: the chapter
# number moved inside the text block in v3, so there is no such line.

p = "components/history-chapters.tsx"
s = open(p).read()

a = "    fontSize: 21,\n    lineHeight: 25,"
b = "    fontSize: 19,\n    lineHeight: 23,"

if a in s:
    s = s.replace(a, b, 1)
    open(p, "w").write(s)
    print("applied")
else:
    print("  not matched")

# Every remaining CIRCLE_R should be the constant and the RADII fallback
# only — anything else means a disc is still drawn at a fixed size.
for i, line in enumerate(s.splitlines(), 1):
    if "CIRCLE_R" in line:
        print(f"  {i}: {line.strip()}")
