# Pull English/Persian pairs from a topic, for review.
#
# Only matches where the English is actually English. An earlier version
# matched any quoted string after a known key, which picked up Persian
# values and paired them with the next Persian field — producing shifted
# duplicates that would overwrite a heading with a paragraph.
import re, os, sys

KEY = sys.argv[1] if len(sys.argv) > 1 else "modernIran"
FILE = sys.argv[2] if len(sys.argv) > 2 else "constants/education.ts"

s = open(FILE).read()
start = s.find("const " + KEY + ":")
if start < 0:
    start = s.find("'" + KEY + "'")
    start = s.rfind("const ", 0, start)
nxt = s.find("\nconst ", start + 10)
seg = s[start: nxt if nxt > start else len(s)]

ascii_only = re.compile(r"^[\x00-\x7f]+$")
out, n = [], 0
for m in re.finditer(r"(?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap): \'((?:[^\'\\]|\\.){2,})\'", seg):
    en = m.group(1)
    if not ascii_only.match(en):
        continue          # a Persian value, not an English key
    tail = seg[m.end(): m.end() + 600]
    fm = re.search(r"(?:[a-zA-Z]*[Ff]a): \'((?:[^\'\\]|\\.)*)\'", tail)
    if not fm:
        continue
    n += 1
    out.append(f"{n}.\nEN: {en}\nFA: {fm.group(1)}\n")

open("tmp/topic-fa.txt", "w").write("\n".join(out))
print("wrote", n, "pairs from", KEY)
