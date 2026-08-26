# A glossary needs a block of its own.
#
# Everything so far has been prose or speech. This is a list of terms with
# definitions, and running it as paragraphs would lose the thing that
# makes a glossary usable — that you can find the word you are looking for
# without reading everything above it.
#
# The Persian sits beside the transliteration, in the Persian face.
#
# Three entries removed at Nojan's request: goshad, kos dast, lashkhor.
#
# The document's trailing comment ("my persian spelling is really bad so
# this might be incorrect lol" — Cyrus Jarvis) is a note between editors
# rather than copy, so it goes. But it identifies the writer, and the CJ
# in the Niousha Noor interview is the same person.

total = 0

# ---------------------------------------------------------- the block
p = "app/tpm/post.tsx"
s = open(p).read()
a = "                if (b.t === 'qa') return ("
b = """                if (b.t === 'term') return (
                  <View key={i} style={s.term}>
                    <View style={s.termHead}>
                      <Text style={s.termT}>{b.x}</Text>
                      {b.fa ? <Text style={s.termFa}>{b.fa}</Text> : null}
                    </View>
                    <Text style={s.termDef}>{inline(b.def, s.termDef, s.em, s.strong)}</Text>
                  </View>
                );

                if (b.t === 'qa') return ("""
if a in s:
    s = s.replace(a, b, 1); total += 1
else:
    print("   skipped: term block")

a = "  credit: {"
b = """  // A glossary. The word and its Persian on one line, the definition
  // under it — so the eye can run down the page looking for one entry
  // rather than reading every line to find it.
  term: { marginBottom: spacing.lg },
  termHead: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, flexWrap: 'wrap' },
  termT: { fontFamily: fonts.bodyStrong, fontSize: 16, color: tpm.ink },
  termFa: { fontFamily: fonts.persian, fontSize: 15, color: tpm.red },
  termDef: {
    fontFamily: fonts.body, fontSize: 14, lineHeight: 22,
    color: tpm.inkSoft, marginTop: 5,
  },

  credit: {"""
if a in s:
    s = s.replace(a, b, 1); total += 1
else:
    print("   skipped: term styles")
open(p, "w").write(s)
print("post.tsx:", total)

# ----------------------------------------------------------- the type
p = "constants/tpm-content.ts"
s = open(p).read()
a = "  | { t: 'divider' };"
b = """  | { t: 'term'; x: string; fa?: string; def: string; defFa?: string }
  | { t: 'divider' };"""
if "t: 'term'" not in s:
    print("term type:", a in s)
    s = s.replace(a, b, 1)

# ---------------------------------------------------------- the piece
a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'slang2',
    kind: 'feature',
    title: "The Beginner's Guide to Persian Slang, Volume #2",
    subject: 'Persian slang',
    discipline: 'Language',
    standfirst:
      'The words and phrases you will not learn in class or read in '
      + 'classical literature.',
    cover: 'tpm-slang2-cover',
    images: [],
    minutes: 7,
    body: [
      { t: 'open', x: "There was a time recently when I had forgotten that perhaps I shouldn't speak to others the same way that I do with my friends. Slang is often used as a way to form a special type of communication with a particular subset of people — and this is where concepts like 'code-switching' come from — where certain groups of people often change the way they speak depending on the situation or who they're speaking to." },

      { t: 'p', x: 'I was speaking to someone who I had met at the gym, a guy who was 43 years old (i.e. 23 years my senior, at the time). He was telling me about his journey and how his body had changed in the past year, and with the intention of expressing my approval for his efforts, I said, "yeah, you really ate."' },

      { t: 'q', x: 'I ate?' },

      { t: 'q', x: 'Oh, you mean I ate and got fat. Thanks.' },

      { t: 'p', x: 'This is only a mild example of slang used in the wrong situation. Like the fatally flawed humans whose uncensored emotions it represents, the most commonly-used slang tends to link with sex and relationships, the body and its functions, and intoxications such as drink and drugs. **As always, be careful with many of the phrases you read in this guide**, as most are not appropriate to use outside of conversations with friends, and some can be offensive.' },

      { t: 'line', x: 'These are the words and phrases you won\\'t learn in class or read in classical literature.' },

      { t: 'divider' },

      { t: 'term', x: 'Abji / Aji', fa: 'آبجی / آجی', def: "An informal term to call your (usually older) sister. The shortened version Aji, however, is the Persian equivalent of 'sis' in English, and so may be used to refer to anyone." },

      { t: 'term', x: 'Badfaz', fa: 'بدفاز', def: 'A cold and moody person, generally someone with a negative aura.' },

      { t: 'term', x: 'Barnamz', fa: 'برنامز', def: 'Making plans to see one another.' },

      { t: 'term', x: 'Binamoos', fa: 'بی ناموس', def: 'An insult that you can use towards anybody, even though it literally means someone who has no significant female figures in their life (such as a mother, sister, or girlfriend).' },

      { t: 'term', x: 'Dahan service kardan', fa: 'دهان سرویس کردن', def: "Literally means 'to service one's mouth'. It sounds obscene in English, but this is a very idiomatic phrase that can mean different things depending on the tone and context. You may say 'Dahanet service!' if a friend has either said something very funny that made you laugh, or something wrong that has annoyed you. You may also say 'dahanam service shod' if someone has talked or bothered you so much to the point of annoying you, or something else has tired you out, such as your school exams for example." },

      { t: 'term', x: 'Dor dor', fa: 'دور دور', def: 'This term refers to when separate groups of young men and women drive around in cars, usually on certain boulevards in the evenings, pulling up alongside each other in traffic so they can flirt and exchange socials or phone numbers through the window.' },

      { t: 'term', x: 'Joon', fa: 'جون', def: "This is the word for the essence of life but is also used colloquially as a term of endearment. The meaning easily changes, however, to express sexual attraction or arousal once pronounced with more stress on the vowels or when dragged out (i.e. 'joooon')." },

      { t: 'term', x: 'Joozi', fa: 'جوزی', def: "An adjective used to describe someone who's always paranoid." },

      { t: 'term', x: 'Kalan', fa: 'کلان', def: "The police, or 'the cops'." },

      { t: 'term', x: 'Khaz', fa: 'خز', def: 'This word originally refers to fur (as a material rather than on a living animal), but can also be used to refer to something or someone as almost cringingly out-of-fashion.' },

      { t: 'term', x: 'Kheyli khiare', fa: 'خیلی خیاره', def: "Literally meaning 'that's so cucumber', this phrase is used to describe something as being unattractively cringe, disreputable, or unfashionable. Similar to the American words 'ratchet' and 'ghetto'." },

      { t: 'term', x: 'Khoshfaz', fa: 'خوشفاز', def: 'Someone easygoing, positive and fun.' },

      { t: 'term', x: 'Kooft', fa: 'کوفت', def: "Meaning something along the lines of 'pain', this word is often used similarly to 'shut up'." },

      { t: 'term', x: 'Lash style', fa: 'استایل لش', def: 'A style somewhat popular with teenagers, inspired by 90s American hip-hop culture and modern Korean streetwear. It emphasises large, baggy and oversized clothing.' },

      { t: 'term', x: 'Palang', fa: 'پلنگ', def: "This is the word for a leopard, but 'palangs' are also part of a subculture of women who are obsessed with beauty and look outlandish and exaggerated in appearance. With Iran having become one of the world's leading capitals for cosmetic surgery, the 'palang' look today manifests in the form of highly excessive surgeries and fillers, but can otherwise also be characterised by over-the-top makeup and flamboyant clothing." },

      { t: 'term', x: 'Palasht', fa: 'پلشت', def: 'A dumb person, an airhead.' },

      { t: 'term', x: 'Pedar Sag', fa: 'پدر سگ', def: 'A common insult you would call someone, literally meaning that you are calling their father a dog.' },

      { t: 'term', x: 'Samm', fa: 'سم', def: "Meaning 'poison' or 'toxic' depending on whether it's used as a noun or an adjective. This is also what memes are referred to as." },

      { t: 'term', x: 'Sootoon', fa: 'ستون', def: "Meaning 'pillar' or 'column', this is a word also used as slang, mostly amongst men, as a term of endearment to each other. A common variation is 'sootoon-e gang', which itself tends to be perceived as a phrase only used by cringe straight men." },

      { t: 'term', x: 'Yobs', fa: 'یوبز', def: 'See *Palasht*.' },

      { t: 'term', x: 'Yool', fa: 'یول', def: 'See *Palasht* also.' },

      { t: 'term', x: 'Zahre Mar', fa: 'زهرمار', def: "Meaning 'snake venom', this is a more advanced and impactful form of *'khafe sho'*, or 'shut up' in English." },

      { t: 'note', x: 'By Cyrus Jarvis.' },
    ],
  },
"""
print("slang:", a in s)
open(p, "w").write(s.replace(a, b, 1))
