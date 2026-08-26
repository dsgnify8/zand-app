# Forough Alaei, as filed.
#
# Four paragraphs, no quotes, no interview. The shortest piece in the set
# and the one that needs the least done to it — so it gets the least: a
# lead, three paragraphs, and one line pulled out to sit alone.
#
# Nothing changed. Ours: the title, the standfirst, the pulled line.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'alaei',
    kind: 'portrait',
    title: 'Women who will not wait for permission',
    subject: 'Forough Alaei',
    discipline: 'Photography',
    standfirst:
      'She disguised herself as a man to photograph the women sneaking into '
      + "Iran's football stadiums. The series won a World Press Photo prize.",
    cover: 'tpm-alaei-cover',
    images: [],
    minutes: 3,
    body: [
      { t: 'lead', x: "In Iran, football is everything. It's noise, emotion, pride — the kind of thing that connects everyone, no matter where they're from. *But for women, the gates to the stadium have always been closed.* Watching the game from behind screens or outside the fences has been their only option for years." },

      { t: 'p', x: "In 2018, under pressure from FIFA and waves of social media protests, a small group of women were finally let into Tehran's Azadi Stadium. For a moment, it felt like history. Like maybe something was changing. But it didn't last. A few months later, conservative officials reversed the decision, and the ban came back just as quietly as it had been lifted." },

      { t: 'line', x: "Still, women found ways in." },

      { t: 'p', x: "They cut their hair short, borrowed their brothers' clothes, glued on fake beards — anything to stand among the crowd and feel the pulse of the game." },

      { t: 'p', x: "Photographer Forough Alaei was one of them. She disguised herself as a man to document the women who refused to accept the ban, capturing rare glimpses of defiance, fear, and joy. Her series — later awarded a World Press Photo prize — goes beyond football. It's a story about belonging, about how far people will go just to be seen, and about women who won't wait for permission to take up space." },
    ],
  },
"""
print("alaei:", a in s)
open(p, "w").write(s.replace(a, b, 1))
