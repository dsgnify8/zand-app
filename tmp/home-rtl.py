# -*- coding: utf-8 -*-
# Home screen RTL. In Persian the greeting, section labels and card text
# align right; rows with an icon beside text reverse direction so the
# whole page mirrors rather than just the type shifting.

import re

p = "app/(tabs)/index.tsx"
s = open(p).read()
did = []

# ---- styles ----
if "faRight:" not in s:
    s = s.replace("  sectionLabel: {",
"""  faRight: { textAlign: 'right', writingDirection: 'rtl' },
  faRowRev: { flexDirection: 'row-reverse' },
  sectionLabel: {""", 1)
    did.append("styles")

# ---- greeting and section labels ----
REPL = [
 ("<Text style={styles.greeting}>{t(HOME.greeting)}</Text>",
  "<Text style={[styles.greeting, fa && styles.faRight]}>{t(HOME.greeting)}</Text>"),
 ("<Text style={styles.sectionLabel}>{t(HOME.today)}</Text>",
  "<Text style={[styles.sectionLabel, fa && styles.faRight]}>{t(HOME.today)}</Text>"),
 ("<Text style={styles.sectionLabelInline}>{t(APP.stories)}</Text>",
  "<Text style={[styles.sectionLabelInline, fa && styles.faRight]}>{t(APP.stories)}</Text>"),
 ("<Text style={styles.sectionLabel}>{t(HOME.explore)}</Text>",
  "<Text style={[styles.sectionLabel, fa && styles.faRight]}>{t(HOME.explore)}</Text>"),
 ("<Text style={styles.sectionLabel}>{t(HOME.newThisWeek)}</Text>",
  "<Text style={[styles.sectionLabel, fa && styles.faRight]}>{t(HOME.newThisWeek)}</Text>"),
 ("<Text style={styles.sectionLabel}>{t(HOME.jumpBackIn)}</Text>",
  "<Text style={[styles.sectionLabel, fa && styles.faRight]}>{t(HOME.jumpBackIn)}</Text>"),
 ("<Text style={styles.sectionLabel}>{t(HOME.typical)}</Text>",
  "<Text style={[styles.sectionLabel, fa && styles.faRight]}>{t(HOME.typical)}</Text>"),
]
n = 0
for a, b in REPL:
    if a in s: s = s.replace(a, b); n += 1
did.append("labels " + str(n) + "/" + str(len(REPL)))

# ---- the fact-of-the-day card ----
FACT = [
 ("styles.factKicker}>", "styles.factKicker, fa && styles.faRight]}>"),
 ("styles.factTitle}>", "styles.factTitle, fa && styles.faRight]}>"),
 ("styles.factX}>", "styles.factX, fa && styles.faRight]}>"),
 ("styles.factTap}>", "styles.factTap, fa && styles.faRight]}>"),
]
n = 0
for a, b in FACT:
    old = "style={" + a
    new = "style={[" + b
    if old in s:
        s = s.replace(old, new); n += 1
did.append("fact " + str(n) + "/" + str(len(FACT)))

# ---- the fa flag on the screen component ----
m = re.search(r"export default function \w+\([^)]*\)[^{]*\{\n", s)
if m and "const fa = getLang()" not in s[m.end():m.end()+300]:
    s = s[:m.end()] + "  const fa = getLang() === 'fa';\n" + s[m.end():]
    did.append("flag")

if not re.search(r"import \{[^}]*\bgetLang\b[^}]*\} from '@/lib/i18n'", s):
    mi = re.search(r"import \{([^}]*)\} from '@/lib/i18n';", s)
    if mi:
        parts = [x.strip() for x in mi.group(1).split(",") if x.strip()] + ["getLang"]
        s = s.replace(mi.group(0), "import { " + ", ".join(sorted(set(parts))) + " } from '@/lib/i18n';")
        did.append("import")

open(p, "w").write(s)
print("applied:", " | ".join(did))
