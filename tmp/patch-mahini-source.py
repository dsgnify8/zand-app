# Ali Mahini, as filed.
#
# The body is TPM's, sentence for sentence. What has changed: "he shoot"
# to "he shoots", a French guillemet closing an English quotation, and one
# missing full stop. Nothing else — not the phrasings that read as
# non-native, not the sentence lengths, not the order.
#
# Ours: the title, the standfirst, and the markup. Where the lead sits,
# where his quotes land, where the section breaks. That is layout, and it
# is what makes one piece read differently from the next.

p = "constants/tpm-content.ts"
s = open(p).read()

# out with my rewrite
i = s.find("  {\n    key: 'mahini',")
if i > 0:
    j = s.find("\n  {\n    key:", i + 10)
    if j < 0:
        j = s.find("\n];", i)
    s = s[:i] + s[j:].lstrip("\n")
    print("old mahini removed")

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
      { t: 'lead', x: '*"Irooni Boodan"* is a timeless and spaceless mindset and a place that displays the set of behaviors of Iranian people. These behaviors, which have no meaning for a first world, make our identity.' },

      { t: 'p', x: 'Ali Mahini, the young photographer of generation Z, uses the curiosity and arrogance of his generation, to dig into the lower layers of this Iranian identity, and by pulling out the elements that are not seen in everyday life, he bears the burden of displaying them. Observing his personal filters, he shoots native subjects of cities in Iran in order to depict the truth and reality in Iranian society for history.' },

      { t: 'p', x: 'Like most photographers, Ali started his photography journey by taking warm and beautiful photos of nature, but during his travels to different regions of Iran and talking with people, his concept of beauty and concerns changed. He mentions about his trips:' },

      { t: 'q', x: 'During my trips, when I was hitchhiking, I was constantly talking to the drivers. Every car I rode, I was a new Ali. These conversations were practice for me, practice of speech and light.', who: 'Ali Mahini' },

      { t: 'p', x: 'During these trips, the sunset was no longer the subject of photography and his camera lens was directed towards a more dynamic subject. Sitting with people and talking to them without any judgment and seeing their concerns made Ali interested in photographing spaces where human life is felt. Generally, his subjects are people who not only no lens but **no eyes are directed towards them**.' },

      { t: 'p', x: 'During the shooting, Ali communicates with his subjects and spends hours talking with them. Taking pictures is not a priority for him, and the personal process of getting to the picture is more important. Generally, his photos tell their own story and he depicts the subjects in a public space, side by side with everyday life. Ali bypasses any kind of censorship by not manipulating the photography scene and leaving the subject free to choose the pose and location.' },

      { t: 'h', x: 'Prince of Persia' },

      { t: 'p', x: "In the collection that Ali mentions under the title of Prince of Persia, all the censorships of the Iranian society fade away, and our photographer confronts us with a problem that has no expiration date. By discovering the unknowns of Daneshjoo Park, he brings forward a topic that is censored by people's eyes every day in the crowded and busiest street of Tehran." },

      { t: 'p', x: 'In the process of this collection, Ali listens to these people without any judgment and does not reduce them to objects for his photography. During the conversations, he finds the roots of the chaos in the lives of his subjects and reaches the hidden layers of their personalities. As the conversation progresses, he realizes that there is no gap between us and the subject.' },

      { t: 'p', x: "In the whole process of photography, Ali is trying to reduce his ego and leave the subject free and not force them into his intellectual space. From Ali's point of view, this intellectual atmosphere is the reason why people ignore such issues in society. So by leaving this censored space, he takes his lens towards the chaos to show the whole society, ugliness and beauty together." },

      { t: 'p', x: 'Ignoring these issues and preventing them from understanding, or in Ali\\'s words, the intellectual space of "I don\\'t see it, so it doesn\\'t exist!" It is an important part of his photography concern. As a photographer, he shows his audience the unseen aspects of Iranian life, and by giving them a shock, he leads them to understand the subject in order to destroy this intellectual space.' },

      { t: 'divider' },

      { t: 'q', x: 'Sometimes people around me say why do you show such dirt? But I have no fear about showing the ugliness. In my opinion, the beauty of the story has been seen far too much and my concern is to show the coldness that is sometimes not desired by my audience.', who: 'Ali Mahini' },
    ],
  },
"""
print("mahini:", a in s)
open(p, "w").write(s.replace(a, b, 1))
