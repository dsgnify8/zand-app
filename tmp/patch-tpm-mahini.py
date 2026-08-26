# Ali Mahini, the first of TPM's pieces.
#
# Marked up by hand rather than run through a converter. The blocks are
# placed where the piece turns: a lead, his own words as the first beat,
# a heading at Prince of Persia, and his closing line set alone — which is
# the strongest sentence in the article and deserves the last word.
#
# The copy is TPM's, lightly corrected only where the English breaks
# rather than where it is simply theirs. "Every car I rode, I was a new
# Ali" stays exactly as filed.

p = "constants/tpm-content.ts"
s = open(p).read()

# The demo posts go; this replaces them one at a time as the real pieces
# arrive.
a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'mahini',
    kind: 'portrait',
    title: "I don't see it, so it doesn't exist",
    subject: 'Ali Mahini',
    discipline: 'Photography',
    standfirst:
      'A Gen Z photographer turning his lens on the parts of Iranian life '
      + 'that no eyes are pointed at.',
    cover: 'tpm-mahini-cover',
    images: [],
    minutes: 5,
    body: [
      { t: 'lead', x: 'Irooni boodan is a mindset without a time or a place: the set of behaviours that make up how Iranians are with each other. Much of it means nothing to an outsider. All of it is identity.' },

      { t: 'p', x: 'Ali Mahini uses the curiosity and the arrogance of his generation to dig underneath it. He photographs native subjects in cities across Iran, pulling out what daily life does not show, and takes on the weight of putting it in front of people.' },

      { t: 'p', x: 'Like most photographers he began with the warm and the beautiful — landscapes, light, the usual apprenticeship. What changed him was travelling and talking. Hitchhiking across the country, he spent every ride in conversation with whoever was driving.' },

      { t: 'q', x: 'Every car I rode, I was a new Ali. These conversations were practice for me. Practice of speech, and of light.', who: 'Ali Mahini' },

      { t: 'p', x: 'After that the sunset stopped being a subject. His lens turned toward rooms where human life is actually felt, and toward people who have not only no camera pointed at them but no eyes either.' },

      { t: 'line', x: 'He photographs the people nobody is looking at.' },

      { t: 'p', x: 'On a shoot he talks for hours before anything is taken. The picture is not the priority; the process of arriving at it is. He does not arrange the scene, and he lets the subject choose their own pose and their own place — which is also how he gets around censorship without ever confronting it.' },

      { t: 'h', x: 'Prince of Persia' },

      { t: 'p', x: 'In the collection he calls Prince of Persia, the censorship of Iranian society falls away entirely. Working in Daneshjoo Park, in the middle of the busiest street in Tehran, he brings forward something that thousands of people censor with their own eyes every single day.' },

      { t: 'p', x: 'He listens without judgement and refuses to reduce anyone to a subject. In the talking he finds the roots of the chaos in their lives and reaches the layers underneath. What he keeps arriving at is that there is no gap between the photographer and the person in front of him.' },

      { t: 'note', x: 'Mahini describes the thing he is working against as an intellectual atmosphere — a way of not seeing that lets a society keep its own difficulties out of view. The phrase he uses for it is the title of this piece.' },

      { t: 'p', x: 'So he leaves that atmosphere behind and points the camera at the chaos, in order to show the whole of a society rather than the half of it people have agreed to look at. Ugliness and beauty in the same frame.' },

      { t: 'divider' },

      { t: 'q', x: 'Sometimes people around me ask why I show such dirt. But I have no fear about showing ugliness. The beauty of the story has been seen far too much, and my concern is to show the coldness — which is sometimes not what my audience wants.', who: 'Ali Mahini' },
    ],
  },
"""
print("mahini:", a in s)
open(p, "w").write(s.replace(a, b, 1))
