# Keayaun, as filed. Rebuilt — the first attempt reported success and
# never landed, and was not in any commit to recover from.
#
# A written feature with two long quotes, both strong enough to stand out
# of the prose rather than sit inside a paragraph. The rooftop and the
# train are the piece; everything else is the writer setting them up.
#
# Nothing changed. Ours: the title, the standfirst, two section breaks.

p = "constants/tpm-content.ts"
s = open(p).read()

if "key: 'keayaun'" in s:
    print("already there — nothing to do")
else:
    a = "export const TPM_POSTS: TpmPost[] = ["
    b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'keayaun',
    kind: 'portrait',
    title: 'Keayaun climbs the parts of the city you never see',
    subject: 'Keayaun',
    discipline: 'Photography',
    standfirst:
      'Rooftops, tunnels, and a jump from a moving train on his 22nd '
      + 'birthday that changed how he thinks about time.',
    cover: 'tpm-keayaun-cover',
    images: [],
    minutes: 5,
    body: [
      { t: 'open', x: "In the hidden layers of the city, there exist things that don't catch the eye in everyday life. *Every day as we ride the metro, pass by a bank building, or glimpse an abandoned house, we pass indifferently through their inner layers and move on with our lives.*" },

      { t: 'p', x: "Nevertheless, there are those whose love for uncovering the city's hidden layers is stronger, leading to the emergence of a street exploration activity. Street exploration, once considered an exciting and lightweight activity in urban photography, has gained significant popularity in recent years with the expansion of artists' activities in this field in the virtual space." },

      { t: 'p', x: 'Keayaun, an Iranian explorer residing in Canada, has been familiar with street culture in Iran and the streets of Ekbatan for years. He began his artistic work with portrait photography and graffiti in the corners of Ekbatan, gradually realizing that he wanted to share the hidden layers of the city with his audience through his photos.' },

      { t: 'h', x: 'A rooftop in Toronto' },

      { t: 'p', x: 'After migrating to Canada, in the early days, a photograph became a source of renewed motivation for Keayaun to continue this activity. He says:' },

      { t: 'q', x: 'During those difficult days, I went to the rooftop in Toronto with my camera. Despite having suicidal thoughts, with the help of a friend and reflecting on the promises I made to my mother, I was able to move past those thoughts and return to life. Right there, I took a picture of the view in front of me and shared it on my Instagram page. Much more support came for my photo than I had expected. This made me feel like I belong to a community and that there are people in this world who think like me and appreciate my perspective on life.', who: 'Keayaun' },

      { t: 'p', x: 'Since then, Keayaun has been striving to portray to his audience what lies within the tunnels, atop the rooftops of skyscrapers, and artistically concealed from the public eye, all while preserving his personal identity through his photographs.' },

      { t: 'h', x: 'The risk that is not the height' },

      { t: 'p', x: 'Contrary to common belief that fear of heights and the risk of death are the biggest challenges of this activity, for Keayaun, the greatest challenge is **the risk of getting caught**. That\\'s why urban explorers usually obsessively choose buildings and environments where there is generally a possibility of access. Over time, as building security systems have become more sophisticated, this activity has become even more challenging, making entry into certain spaces that were previously possible now impossible.' },

      { t: 'p', x: 'Moreover, with the increasing number of surveillance cameras and facial recognition capabilities, the risk of getting caught increases, and as Keayaun puts it, "In this field, our eyes are always on our shadow." This has led explorers to operate incognito, creating a distance between the artist and their audience. This distance sometimes causes us to forget that they are people just like us, individuals with ordinary lives whom we might pass by on the street or in the subway one day.' },

      { t: 'divider' },

      { t: 'p', x: 'We must not forget that the mortal risks of this activity are very high. Keayaun recounts his most challenging and unforgettable day:' },

      { t: 'q', x: 'On my 22nd birthday, I was on top of a moving train approaching a very narrow tunnel. At that moment, I realized I had to jump off the train; I made this decision in less than four seconds. After jumping, my gears broke, I suffered a brain concussion, and my left shoulder was completely dislocated. At that moment when I lay motionless on the ground, unsure if I would survive or not, the only regret I had was regrets of things left undone. That near-death experience changed my perspective on life forever, and I realized I shouldn\\'t procrastinate because there may not be a tomorrow. That moment gave me the courage to live, and now I have no regrets.', who: 'Keayaun' },
    ],
  },
"""
    print("keayaun:", a in s)
    s = s.replace(a, b, 1)
    open(p, "w").write(s)

import re
print("keys:", re.findall(r"key: '([a-z0-9]+)',", s))
