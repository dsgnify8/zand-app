# Ella Lotfi, as filed.
#
# A written feature, not an interview — the quotes sit inside the writer's
# sentences rather than standing as turns. So it is marked up as prose,
# which is the whole reason for having nine block types.
#
# "Tab 1" and the "HED:" prefix are document artefacts and go. The HED
# line itself is the standfirst.
#
# Also: any demo posts still on the page, removed.

p = "constants/tpm-content.ts"
s = open(p).read()

# ------------------------------------------- demo posts, if any remain
import re
for k in ['p1', 'p2', 'p3', 'p4']:
    i = s.find("  {\n    key: '%s'," % k)
    if i > 0:
        j = s.find("\n  {\n    key:", i + 10)
        if j < 0:
            j = s.find("\n];", i)
        s = s[:i] + s[j:].lstrip("\n")
        print("removed demo:", k)

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'lotfi',
    kind: 'portrait',
    title: 'The jinn in my house at 2am',
    subject: 'Ella Lotfi',
    discipline: 'Movement',
    standfirst:
      'Through the curious world of her viral videos, Ella Lotfi seeks to '
      + 'break barriers and redefine movement.',
    cover: 'tpm-lotfi-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'lead', x: "Ella Lotfi's Instagram lately begs a lot of questions. In one video, she's at the gym using a chest press *with her legs*, and in another, she climbs a staircase in a manner that can only be described as being akin to an upside-down spider, while two other guys fall down the same staircase like a couple of rag dolls thrown aimlessly by a child." },

      { t: 'p', x: "A gymnast, rhythmic gymnast, dancer, and choreographer, the 24-year-old defies easy categorisation. She first started creating content during the Covid pandemic, and found an audience on Twitter soon after, where users were posting her videos as memes accompanied by captions such as, 'the jinn in my house at 2am' and 'the toilet hose in my bathroom when it slips while I'm using it'." },

      { t: 'q', x: "At first I wasn't used to it and I would get a little disheartened. But I realised that these reactions would help my work be seen… there are very few people in Iran who know what this type of thing is.", who: 'Ella Lotfi' },

      { t: 'p', x: "Ella explains that although these videos and posts seem strange and bizarre to many, they were actually just gymnastic poses. \\"When you watch a gymnastics routine, all the moves are done in succession. In my case, I only showed single moves on their own, which I think people hadn't seen before and so it was weird to them.\\"" },

      { t: 'h', x: 'Beginnings' },

      { t: 'p', x: 'Ella\\'s journey began at a young age. She was diagnosed with osteomalacia at birth, and after a series of injections, her parents decided to enroll her into gymnastics at the age of seven, in an attempt to help her recover from the condition. Despite initial resistance — "I started crying on my first day and said I didn\\'t want to do this anymore because it hurt" — she found herself drawn back to the gymnasium. "My parents wanted me to try different sports until something stuck, but I woke up the next morning and said I liked gymnastics."' },

      { t: 'p', x: 'Later, Ella discovered rhythmic gymnastics. At the time, it was a discipline still relatively new in Iran, but she had progressed so far that her coaches suggested it to her as the natural next step, and after that, she then found contemporary dance. It\\'s this distinctive blend of three different disciplines that she\\'s become so widely known for on social media.' },

      { t: 'p', x: 'She explains that, rather than embracing the attention she received from Twitter and being "bizarre" on purpose, her recent and more unconventional videos actually arise organically, as collaborations with friends and athletes. But, she adds that, "people are more interested in the fun part of my work. And thus they get closer and try to understand what it is I\\'m doing." She harnesses this to try and bridge the gap between her art and her audience, by sparking conversation.' },

      { t: 'h', x: 'What it cost' },

      { t: 'p', x: "Beneath her social media presence, Ella's journey reveals the severe physical and psychological hurdles faced by many athletes in competitive gymnastics — and is indicative of how global the scale of this problem really is, with similar cases having previously been reported in Russia and England. She mentions various physical injuries, including some that have returned or that she still has to live with today — as well as a battle with anorexia that was induced by the intense pressure and stress of having to be a certain weight for her competitions. In fact, her weight dropped so dangerously low that a doctor warned her she may go into a coma." },

      { t: 'q', x: 'I no longer compete. But in any case, women are forbidden now in Iran to participate in gymnastic competitions after the age of 20 anyway.', who: 'Ella Lotfi' },

      { t: 'h', x: 'What comes next' },

      { t: 'p', x: 'Now, as a physiotherapy student, she channels her experiences into teaching, primarily offering gymnastics instruction online. But her ambitions stretch beyond teaching and studying, and she describes her ideal future as being able to train professionally in contemporary dance sometime soon, under a coach who understands its technical and artistic elements.' },

      { t: 'p', x: 'Citing Soroush Kariminejad as a significant inspiration, she speaks of channeling her emotions, whether positive or negative, into her work. "That feeling of being sad and upset while my knee was sprained a month before I was meant to compete — I tried to pull something out of that that would be worthy of being seen," she shares. "It makes me feel better and I feel lighter… I think it\\'s this that pushes me towards dance the most."' },
    ],
  },
"""
print("lotfi:", a in s)
open(p, "w").write(s.replace(a, b, 1))
