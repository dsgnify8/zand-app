# Three things.
#
# The lead was sized between a statement and body copy, which read as
# neither. It becomes a statement: larger, tighter, with a rule under it.
#
# Inline emphasis, so a sentence can lift once or twice in a piece. Marked
# with *asterisks* in the copy rather than as separate blocks, because
# emphasis belongs inside a sentence and a block would break the line.
#
# And a question block, for the interviews. TPM publishes both essays and
# Q&As and they should not look the same.

total = 0
p = "app/tpm/post.tsx"
s = open(p).read()


def sub(a, b, label):
    global s, total
    if a in s:
        s = s.replace(a, b, 1); total += 1
    else:
        print("   skipped:", label)


# ------------------------------------------------ inline emphasis
sub("export default function TpmPostPage() {",
"""/**
 * Render *emphasis* and **strong** inside a line.
 *
 * A sentence that lifts once in a page is worth having; a block-level
 * emphasis would break the line to do it, which is the opposite of the
 * effect. Marked in the copy so whoever writes the piece decides where it
 * falls, not the renderer.
 */
function inline(x: string, base: any, em: any, strong: any) {
  const parts = x.split(/(\\*\\*[^*]+\\*\\*|\\*[^*]+\\*)/g).filter(Boolean);
  if (parts.length === 1) return x;
  return parts.map((piece, i) => {
    if (piece.startsWith('**') && piece.endsWith('**')) {
      return <Text key={i} style={strong}>{piece.slice(2, -2)}</Text>;
    }
    if (piece.startsWith('*') && piece.endsWith('*')) {
      return <Text key={i} style={em}>{piece.slice(1, -1)}</Text>;
    }
    return piece;
  });
}

export default function TpmPostPage() {""",
    "inline")

sub("                if (b.t === 'lead') return <Text key={i} style={s.lead}>{b.x}</Text>;",
"""                if (b.t === 'lead') return (
                  <View key={i} style={s.leadWrap}>
                    <Text style={s.lead}>{inline(b.x, s.lead, s.em, s.strong)}</Text>
                    <View style={s.leadRule} />
                  </View>
                );

                if (b.t === 'qa') return (
                  <View key={i} style={s.qa}>
                    <Text style={s.qaQ}>{b.q}</Text>
                    <Text style={s.qaA}>{inline(b.x, s.qaA, s.em, s.strong)}</Text>
                  </View>
                );""",
    "lead and qa")

sub("                return <Text key={i} style={s.p}>{b.x}</Text>;",
    "                return <Text key={i} style={s.p}>{inline(b.x, s.p, s.em, s.strong)}</Text>;",
    "paragraph")

# ------------------------------------------------------- styles
sub("""  lead: {
    fontFamily: fonts.body, fontSize: 17.5, lineHeight: 28,
    color: tpm.ink, marginBottom: spacing.lg,
  },""",
"""  // A statement, not oversized body copy. It was sitting between the two
  // and reading as neither.
  leadWrap: { marginBottom: spacing.xl },
  lead: {
    fontFamily: fonts.bodyStrong, fontSize: 21, lineHeight: 29,
    letterSpacing: -0.3, color: tpm.ink,
  },
  leadRule: {
    height: 2, width: 40, backgroundColor: tpm.red,
    marginTop: spacing.lg,
  },

  em: { fontStyle: 'italic' },
  strong: { fontFamily: fonts.bodyStrong },

  // Interviews. The question carries the red so the eye can find the next
  // one without reading for it.
  qa: { marginBottom: spacing.lg },
  qaQ: {
    fontFamily: fonts.bodyStrong, fontSize: 14.5, lineHeight: 21,
    color: tpm.red, marginBottom: spacing.sm,
  },
  qaA: { fontFamily: fonts.body, fontSize: 15, lineHeight: 25, color: tpm.ink },""",
    "styles")

open(p, "w").write(s)
print("post.tsx:", total)

# ------------------------------------------------------- the type
p = "constants/tpm-content.ts"
s = open(p).read()
a = "  | { t: 'divider' };"
b = """  | { t: 'qa'; q: string; x: string; qFa?: string; fa?: string }
  | { t: 'divider' };"""
if "t: 'qa'" not in s:
    print("qa type:", a in s)
    open(p, "w").write(s.replace(a, b, 1))
