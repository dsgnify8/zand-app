p = "constants/articles.ts"
s = open(p).read()

# name-in-title for a mix of articles; leave the catchy no-name ones for variety
RETITLES = {
  'rassi':  'Mazdack Rassi Turned a Studio Into a Beauty Brand',
  'zadeh':  'Sheena Zadeh Made Makeup Behave Like Skincare',
  'amiri':  'Mike Amiri Built a Luxury House on Rock and Roll',
  'panahi': 'Jafar Panahi Kept Filming After They Banned Him',
  'choopan':'Hadi Choopan Carried the Olympia Home to Iran',
}

import re
n = 0
for key, title in RETITLES.items():
    ks = s.find("key: '%s'" % key)
    if ks < 0:
        print("MISSING", key); continue
    m = re.search(r"title: '(?:[^'\\]|\\.)*',", s[ks:])
    if m:
        a = ks + m.start(); b = ks + m.end()
        s = s[:a] + "title: '%s'," % title.replace("'", "\\'") + s[b:]
        n += 1

open(p,"w").write(s)
print("retitled:", n)
# show all titles now
for m in re.finditer(r"key: '(\w+)',[\s\S]{0,120}?title: '([^']+)'", s):
    print("  ", m.group(1), "->", m.group(2))
