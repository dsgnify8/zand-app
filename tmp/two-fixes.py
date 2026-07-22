# -*- coding: utf-8 -*-
p = "constants/articles.ts"
s = open(p).read()

# 1. Choopan: remove the third/last image block (article-choopan-2, the "Persian Wolf" one)
# find the choopan block, remove the last img
import re
ks = s.find("key: 'choopan'")
ke = s.find("key: '", ks + 10)
block = s[ks:ke]
# remove the article-choopan-2 img line
block2 = block.replace("      { t: 'img', key: 'article-choopan-2' },\n", "", 1)
if block != block2:
    s = s[:ks] + block2 + s[ke:]
    print("choopan img removed")
else:
    print("choopan img NOT found - checking keys")
    for m in re.finditer(r"article-choopan-\d", block):
        print("  found:", m.group(0))

# 2. Googoosh: add an image after "the voice comes back" section.
# The return section ends with the paragraph about people weeping / past handed back.
ks = s.find("key: 'googoosh'")
ke = s.find("key: '", ks + 10)
gblock = s[ks:ke]
anchor = "They were hearing their own past handed back to them."
if anchor in gblock:
    # insert an img block right after that paragraph's closing
    needle = "own past handed back to them.' },"
    idx = gblock.find(needle)
    if idx > -1:
        insert_at = idx + len(needle)
        newg = gblock[:insert_at] + "\n      { t: 'img', key: 'article-googoosh-return' }," + gblock[insert_at:]
        s = s[:ks] + newg + s[ke:]
        print("googoosh return image added")
    else:
        print("googoosh needle not matched")
else:
    print("googoosh anchor not found; return paragraph may differ")

open(p, "w").write(s)
