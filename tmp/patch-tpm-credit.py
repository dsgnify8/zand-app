# Two additions.
#
# A speaker on the answer, for interviews with more than one person in the
# room. The BY BANOO piece is two sisters answering in turn and a Q&A that
# cannot say which of them is talking loses the thing that makes it worth
# reading.
#
# And a credit at the foot of every piece. These are The Persian Mag's
# words; the line says so and goes to them.

total = 0
p = "app/tpm/post.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


sub("""                if (b.t === 'qa') return (
                  <View key={i} style={s.qa}>
                    <Text style={s.qaQ}>{b.q}</Text>
                    <Text style={s.qaA}>{inline(b.x, s.qaA, s.em, s.strong)}</Text>
                  </View>
                );""",
"""                if (b.t === 'qa') return (
                  <View key={i} style={s.qa}>
                    {b.q ? <Text style={s.qaQ}>{b.q}</Text> : null}
                    {/* Who is answering, where more than one person is in
                        the room. Omitted for a single-subject interview,
                        where repeating the name every time is noise. */}
                    {b.who ? <Text style={s.qaWho}>{b.who}</Text> : null}
                    <Text style={s.qaA}>{inline(b.x, s.qaA, s.em, s.strong)}</Text>
                  </View>
                );""",
    "speaker")

sub("""  qaA: { fontFamily: fonts.body, fontSize: 15, lineHeight: 25, color: tpm.ink },""",
"""  qaA: { fontFamily: fonts.body, fontSize: 15, lineHeight: 25, color: tpm.ink },
  qaWho: {
    fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.6,
    color: tpm.muted, marginBottom: 5,
  },

  credit: {
    fontFamily: fonts.body, fontSize: 10.5, color: tpm.faint,
    textAlign: 'center', marginTop: spacing.xl, marginBottom: spacing.xxl,
  },""",
    "styles")

open(p, "w").write(s)
print("post.tsx:", total)

# --------------------------------------------------- the credit line
s = open(p).read()
a = "              <View style={s.endRule} />"
b = """              <View style={s.endRule} />

              {/* Their words. The line says so and goes to them — a
                  partnership should be legible from inside the piece, not
                  only from the tab it sits in. */}
              <Pressable onPress={() => Linking.openURL('https://thepersianmag.net')}>
                <Text style={s.credit}>Excerpt from The Persian Mag</Text>
              </Pressable>"""
if "Excerpt from The Persian Mag" not in s:
    print("credit:", a in s)
    s = s.replace(a, b, 1)
    open(p, "w").write(s)

# imports
s = open(p).read()
import re
m = re.search(r"import \{([^}]*)\} from 'react-native';", s, re.S)
if m:
    missing = [x for x in ["Pressable", "Linking"] if x not in m.group(1)]
    if missing:
        s = s[:m.start(1)] + " " + ", ".join(missing) + "," + m.group(1) + s[m.end(1):]
        open(p, "w").write(s)
        print("imported:", missing)
    else:
        print("imports fine")

# --------------------------------------------------------- the type
p = "constants/tpm-content.ts"
s = open(p).read()
a = "  | { t: 'qa'; q: string; x: string; qFa?: string; fa?: string }"
b = "  | { t: 'qa'; q?: string; who?: string; x: string; qFa?: string; whoFa?: string; fa?: string }"
if "who?: string; x: string" not in s:
    print("qa type:", a in s)
    open(p, "w").write(s.replace(a, b, 1))
