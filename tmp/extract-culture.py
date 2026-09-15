import re, os, sys
KEY = sys.argv[1] if len(sys.argv) > 1 else "taarof"
s = open("constants/culture.ts").read()

card_i = s.find("{ key: '" + KEY + "'")
card = s[card_i: s.find("\n", card_i)] if card_i >= 0 else ""

pages_i = s.find("\n  " + KEY + ": [")
nxt = re.search(r"\n  [a-z-]+: \[", s[pages_i + len(KEY) + 8:])
pages = s[pages_i: pages_i + len(KEY) + 8 + (nxt.start() if nxt else 30000)]

ascii_only = re.compile(r"^[\x00-\x7f]+$")
out, n = [], 0
for seg in (card, pages):
    for m in re.finditer(r"(?:x|title|sub|h|lead|en|blurb|tag|label|front|back|name): '((?:[^'\\]|\\.){2,})'", seg):
        en = m.group(1)
        if not ascii_only.match(en): continue
        tail = seg[m.end(): m.end() + 260]
        fm = re.match(r",\s*(?:[a-zA-Z]*[Ff]a|persian): '((?:[^'\\]|\\.)*)'", tail)
        if not fm: continue
        n += 1
        out.append(f"{n}.\nEN: {en}\nFA: {fm.group(1)}\n")

open("tmp/culture-fa.txt", "w").write("\n".join(out))
print("wrote", n, "pairs from", KEY)
