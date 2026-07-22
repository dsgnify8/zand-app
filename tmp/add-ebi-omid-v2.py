# -*- coding: utf-8 -*-
# Inserts Ebi + Omid as object literals at the TOP of the ARTICLES array,
# then appends their keys to ARTICLE_ORDER (which controls display order).
# Curly apostrophes (U+2019) throughout so nothing breaks single-quoted TS.

p = "constants/articles.ts"
s = open(p).read()

OBJECTS = """
  {
    key: 'ebi',
    subject: 'Ebi',
    kicker: 'MUSIC',
    title: 'Fifty Years of a Voice Iran Was Told Not to Hear',
    standfirst: 'Ebrahim Hamedi left for a tour in 1977 and never came home. The ban that followed did not shrink his audience. It multiplied it.',
    excerpt: 'He left for a tour in 1977 and never came home. The ban that followed did not shrink his audience.',
    readMins: 7,
    cover: 'article-ebi-cover',
    hero: 'article-ebi-hero',
    tag: 'PROFILE',
    blocks: [
      { t: 'lead', x: 'Before he was a pop singer he was a boy reciting the Quran. He has said that is where the singing started, and it shows in the technique: breath held long, a note sustained without strain, meaning carried by weight rather than volume.' },
      { t: 'p', x: 'Ebrahim Hamedi was born in 1949, the eldest of six. His father came from Arak, his mother from Karaj. He sang at home, he sang to schoolmates, he sang to the children on his street. None of it was a career yet. It was a habit that happened to be a gift.' },
      { t: 'p', x: 'Then the Beatles reached Tehran. In the mid-sixties he formed a beat band called The Rebels with Shahram Shabpareh and Siavash Ghomayshi. He passed through the Sunboys and the Black Cats. By the early seventies he had stopped being one voice among several and started being the one people came for.' },
      { t: 'img', key: 'article-ebi-rebels' },
      { t: 'divider' },
      { t: 'h', x: 'The tour that never ended' },
      { t: 'p', x: 'In 1977 he flew to the United States to tour. Two years later the revolution came, and he did not go back. It is worth being precise about the sequence: he did not flee. He left for work, and the country he left stopped existing while he was away.' },
      { t: 'line', x: 'He packed for a tour. He has been on it for almost fifty years.' },
      { t: 'p', x: 'What happened next is the part that makes his career strange. His music was banned in Iran. Playing it was illegal. And the audience inside the country grew anyway, passed hand to hand on cassettes, then satellite, then the internet, until three generations knew the same songs by heart without ever having heard them on a radio at home.' },
      { t: 'pull', x: 'The ban did not remove him from Iranian life. It moved him underground, where he became something closer to a shared inheritance.' },
      { t: 'divider' },
      { t: 'h', x: 'The records that stuck' },
      { t: 'p', x: 'In 1990 he and Dariush released Noon O Panir O Sabzi together and played the Universal Amphitheatre. The same period gave him Khalij, built around a song about the Persian Gulf written by Adel Hassani and composed by Mohammad Shams. He has said it is one of the few of his own performances he is proud of.' },
      { t: 'p', x: 'The 1995 album Setarehaye Sorbi is the one that settled the argument. Iraj Janatie Ataie wrote the words, Siavash Ghomayshi wrote the music. When Manoto later ran a viewer poll for his twenty best songs, the top two places both came from that record.' },
      { t: 'img', key: 'article-ebi-stage' },
      { t: 'divider' },
      { t: 'h', x: 'Singing at the state' },
      { t: 'p', x: 'He has never treated the politics as separate from the work. Hala, released in 1999, set words by the poet Mina Assadi to a production by Esfandiar Monfaredzadeh; he has called it his most important political song. In 2009 he answered the disputed presidential election with Tasmim. In 2019, Koocheye Nastaran took on the Iran and Iraq war and the young men it consumed, and it drew exactly the argument you would expect.' },
      { t: 'p', x: 'In 2022 he stood outside the United Nations to protest Ebrahim Raisi\u2019s appearance there, and backed the protests that followed Mahsa Amini\u2019s death. His own framing is simple, and he has repeated it for decades.' },
      { t: 'quote', x: 'I have always sung for my roots.', who: 'Ebi' },
      { t: 'divider' },
      { t: 'h', x: 'Still working' },
      { t: 'p', x: 'In 2014 he recorded Nostalgia with Googoosh and took it on tour, opening in Dubai. Two exiled voices from the same lost broadcast era, on the same stage, singing to rooms full of people who had grown up on both. It is difficult to think of a neater summary of what Iranian pop became after 1979.' },
      { t: 'p', x: 'The numbers are large and not really the point: more than thirty albums, close to two hundred singles, sold-out nights at the Royal Albert Hall, Wembley, the Sydney Opera House. He has three daughters from a first marriage that lasted twenty-five years, lived in Sweden in the early 2000s, and now divides his time between Marbella and Los Angeles.' },
      { t: 'line', x: 'The country that banned him has never stopped listening to him.' },
    ],
    source: 'Interviews with Radio Zamaneh, BBC Persian, Deutsche Welle and Manoto; ebihamedi.com',
  },
  {
    key: 'omid',
    subject: 'Omid Mouazzen',
    kicker: 'BUSINESS',
    title: 'Omid Mouazzen Turned His Showroom Into an Audience',
    standfirst: 'He was already selling hypercars when he started filming them. The camera did not advertise the business. It became the business.',
    excerpt: 'He was already selling hypercars when he started filming them. The camera became the business.',
    readMins: 5,
    cover: 'article-omid-cover',
    hero: 'article-omid-hero',
    tag: 'PROFILE',
    blocks: [
      { t: 'lead', x: 'Most car dealers who build an audience do it the hard way round: get famous, then sell cars to the people watching. Omid Mouazzen did the opposite. He had the inventory first, and realised the inventory was the show.' },
      { t: 'p', x: 'He was born in Tehran in 1986 and came to Germany as a child. He took a finance degree at Ludwigshafen University of Applied Sciences in 2011 and a master\u2019s in innovation management and finance there in 2014. The early years of the car business were unglamorous enough that the origin story is usually told as selling out of a parking garage, with a childhood friend.' },
      { t: 'p', x: 'Automobilzentrum Rhein-Neckar was registered in Viernheim in December 2016. The premise was narrow on purpose: not used cars generally, but the top of the market. Ferrari, Lamborghini, Bugatti, Rolls-Royce, and the tuned variants that sit above them.' },
      { t: 'img', key: 'article-omid-showroom' },
      { t: 'divider' },
      { t: 'h', x: 'The thing he understood early' },
      { t: 'p', x: 'The channel launched in May 2023 under the name Hypercars and Lifestyle. It reached roughly 660,000 subscribers and over 570 million views by the middle of 2025, and around 800,000 subscribers by January 2026. That is fast, and the reason it was fast is worth stating plainly.' },
      { t: 'line', x: 'He was not producing content about cars. He was filming a job he was already doing.' },
      { t: 'p', x: 'A dealership at that level has permanent access to objects almost nobody gets to stand next to. Every arrival, every inspection, every negotiation is footage that costs nothing extra to capture. Other creators have to borrow a hypercar for a day. He walks past a hundred of them on the way to his desk.' },
      { t: 'pull', x: 'The inventory was the production budget. That is the whole trick, and it is not one most people can copy.' },
      { t: 'p', x: 'The loop then closes: the videos bring in buyers who would never otherwise have found a showroom in a town of thirty-five thousand people, and those buyers generate the next videos. In 2025 a Dubai chief executive walked in and left having bought three cars, a Ford GT Heritage Edition, a Ferrari Purosangue and a Rolls-Royce Cullinan Black Badge, for over a million dollars in a single visit.' },
      { t: 'divider' },
      { t: 'h', x: 'The deals people remember' },
      { t: 'p', x: 'A Koenigsegg Jesko, sixteen hundred horsepower and around five million euros, sold to a client in Dubai in 2025 and flown out by air freight. A Rolls-Royce Dawn to the German rapper Apache 207, which then turned up in one of his music videos. The company was restructured into a GmbH in December 2022, with Mouazzen and Kivork Kazanjian as managing directors.' },
      { t: 'p', x: 'Not all of the attention has been flattering. In October 2025 he tried to mediate a public dispute over a Mercedes G-Class modified to look like a Brabus without certification, filmed both sides, was accused of taking one, and deleted the video. It resolved nothing, and everyone involved got more attention out of it.' },
      { t: 'divider' },
      { t: 'h', x: 'Away from the showroom' },
      { t: 'p', x: 'He got a pilot\u2019s licence and bought a Tecnam P2010 Grand Lusso for around seven hundred thousand euros, registered D-EAOM, the last two letters his initials. He flew it home himself from Capua in Italy to Mannheim in August 2023, over the Alps, with a stop near Bologna. In 2023 he ran the Gumball 3000 in a Bugatti Chiron and hit a ladder lying on the Autobahn, which is how a good deal of the world first heard his name.' },
      { t: 'p', x: 'His own advice, given at industry conferences and in interviews, is consistent and unromantic: partnerships matter more than starting capital, and mistakes are the cheapest information available. In 2025 the German public broadcaster hr profiled him for the documentary series Auftrag Luxus, which framed it the way it usually gets framed, as a boy who arrived from Iran with nothing in particular and ended up selling five-million-euro cars to sheikhs.' },
      { t: 'img', key: 'article-omid-plane' },
    ],
    source: 'Grokipedia, EverybodyWiki, ARD Mediathek (Auftrag Luxus), Road and Track, Mannheimer Morgen',
  },
"""

did = []

# 1. insert the two objects immediately after the ARTICLES array opening bracket
OPEN = "export const ARTICLES: Article[] = ["
if OPEN not in s:
    print("MISS: array opening line not found exactly")
elif "key: 'ebi'" in s:
    print("SKIP: ebi already in file")
else:
    s = s.replace(OPEN, OPEN + OBJECTS, 1)
    did.append("inserted 2 objects at top of ARTICLES")

# 2. append the keys to ARTICLE_ORDER (string array, safe to regex)
import re
m = re.search(r"(export const ARTICLE_ORDER: string\[\] = \[)(.*?)(\])", s, re.S)
if not m:
    print("MISS: ARTICLE_ORDER not matched")
elif "'ebi'" in m.group(2):
    print("SKIP: ebi already in ARTICLE_ORDER")
else:
    inner = m.group(2).rstrip()
    sep = "" if inner.endswith(",") else ","
    new = m.group(1) + inner + sep + " 'ebi', 'omid'," + m.group(3)
    s = s[:m.start()] + new + s[m.end():]
    did.append("added to ARTICLE_ORDER")

open(p, "w").write(s)
print("done:", did)
print("ebi:", "key: 'ebi'" in s, "| omid:", "key: 'omid'" in s)
