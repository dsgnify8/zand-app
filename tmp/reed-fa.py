# -*- coding: utf-8 -*-
# The Reed component. In Farsi it shows the opening of the Masnavi as Rumi
# wrote it, rather than a translation of the English rendering.
#
#   بشنو این نی چون شکایت می‌کند
#   از جدایی‌ها حکایت می‌کند
#   کز نیستان تا مرا ببریده‌اند
#   در نفیرم مرد و زن نالیده‌اند

p = "components/rumi-blocks.tsx"
s = open(p).read()

if "بشنو این نی" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("<Text style={styles.rKicker}>THE NEY</Text>",
  "<Text style={styles.rKicker}>{fa ? 'نی' : 'THE NEY'}</Text>"),

 ("<Text style={styles.rBedLabel}>the reed bed</Text>",
  "<Text style={[styles.rBedLabel, fa && styles.faSmall]}>{fa ? 'نیستان' : 'the reed bed'}</Text>"),

 ("<Text style={styles.rReedLabel}>the flute</Text>",
  "<Text style={[styles.rReedLabel, fa && styles.faSmall]}>{fa ? 'نی' : 'the flute'}</Text>"),

 ("<Text style={styles.rHint}>touch to cut it</Text>",
  "<Text style={styles.rHint}>{fa ? 'برای بریدن، لمس کن' : 'touch to cut it'}</Text>"),

 ("""          <Text style={styles.rLine}>Listen to this reed, how it complains,</Text>
          <Text style={styles.rLine}>telling the tale of separations.</Text>
          <Text style={styles.rLine}>Since they cut me from the reed bed,</Text>
          <Text style={styles.rLine}>every man and woman has wept at my cry.</Text>
          <Text style={styles.rNote}>The first four lines of the Masnavi. Plain rendering.</Text>""",
  """          {fa ? (
            <>
              <Text style={[styles.rLine, styles.faVerse]}>بشنو این نی چون شکایت می‌کند</Text>
              <Text style={[styles.rLine, styles.faVerse]}>از جدایی‌ها حکایت می‌کند</Text>
              <Text style={[styles.rLine, styles.faVerse]}>کز نیستان تا مرا ببریده‌اند</Text>
              <Text style={[styles.rLine, styles.faVerse]}>در نفیرم مرد و زن نالیده‌اند</Text>
              <Text style={[styles.rNote, styles.faSmall]}>آغاز مثنوی معنوی</Text>
            </>
          ) : (
            <>
              <Text style={styles.rLine}>Listen to this reed, how it complains,</Text>
              <Text style={styles.rLine}>telling the tale of separations.</Text>
              <Text style={styles.rLine}>Since they cut me from the reed bed,</Text>
              <Text style={styles.rLine}>every man and woman has wept at my cry.</Text>
              <Text style={styles.rNote}>The first four lines of the Masnavi. Plain rendering.</Text>
            </>
          )}"""),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:60])

# the fa flag inside Reed
s = s.replace("export function Reed() {\n  const [cut, setCut] = useState(false);",
              "export function Reed() {\n  const fa = getLang() === 'fa';\n  const [cut, setCut] = useState(false);")

# persian styles
if "faVerse:" not in s:
    s = s.replace("const styles = StyleSheet.create({\n",
"""const styles = StyleSheet.create({
  faVerse: { fontFamily: fonts.persian, fontSize: 16, lineHeight: 34, textAlign: 'center', writingDirection: 'rtl' },
  faSmall: { fontFamily: fonts.persian, fontSize: 11, fontStyle: 'normal' },
""", 1)

# the import
import re
if "getLang" not in s:
    m = re.search(r"import \{([^}]*)\} from '@/lib/i18n';", s)
    if m:
        parts = [x.strip() for x in m.group(1).split(",") if x.strip()] + ["getLang"]
        s = s.replace(m.group(0), "import { " + ", ".join(sorted(set(parts))) + " } from '@/lib/i18n';")
    else:
        last = None
        for last in re.finditer(r"^import .*\n", s, re.M): pass
        s = s[:last.end()] + "import { getLang } from '@/lib/i18n';\n" + s[last.end():]

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
print("fa flag:", "const fa = getLang()" in s, "| import:", "getLang" in s)
