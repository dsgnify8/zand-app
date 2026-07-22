# -*- coding: utf-8 -*-
p = "constants/articles.ts"
s = open(p).read()
A = "\u2019"

RASSI = [
 ('lead','Before Milk Makeup existed, there was Milk Studios: the room where the shoots happened, the campaigns were made, and a large part of fashion and beauty simply passed through.'),
 ('p','Mazdack Rassi co-founded Milk Studios in New York in 1998 and built it into one of the most influential creative spaces in the industry. It was a studio, a production company, and a gathering point all at once, the place photographers, editors, models, and brands came to make their best work. His vantage point was unusual. He was not on the outside trying to break into the culture. He was hosting it.'),
 ('line','He did not study the creative world from a distance. He ran the room where it happened.'),
 ('p','That matters, because it is the whole reason for everything that came next. Rassi spent years watching, up close, how images were made and how taste actually moved. He saw which ideas caught and which fell flat, not in theory but in the room, on the day, with the people who set the trends. Few people in beauty have ever had that view.'),
 ('img','article-rassi-1'),
 ('divider',''),
 ('h','Turning a culture into a product'),
 ('p','Milk Makeup, launched in 2015, grew directly out of that studio and its ethos: fast, expressive, low-fuss, made for people who did their own makeup in the back of a cab between one thing and the next. It was clean before clean beauty was a category, and built for a generation that valued ease and self-expression over polish.'),
 ('pull','A brand born inside a working studio carries a credibility a brand designed in a boardroom cannot fake.'),
 ('p','That is the insight the whole company rests on. Milk Makeup did not have to invent a relationship with the creative community and hope people believed it. The relationship already existed. The brand came out of the exact place the culture was being made, and everyone in that world knew it.'),
 ('img','article-rassi-2'),
 ('divider',''),
 ('h','Ten years in'),
 ('p','A decade later, Milk Makeup is an established name in a crowded field, and Rassi has spoken about how the brand' + A + 's commitment to creativity still feels fresh to him. That staying power comes from the same place the brand did: a real community, a clear point of view, and a founder who understood culture because he had been running the room where it lived.'),
 ('line','He built the infrastructure of an industry first, then built a product on top of his own understanding of it.'),
 ('p','It is a rare sequence, and the order is the entire story. Most founders study a market from the outside and guess. Rassi helped build the place the market was made, and only then made something to sell inside it. He had the map because he had drawn it.'),
]

ANSARI = [
 ('lead','As a child in Iran, Anousheh Ansari would lie outside and stare at the stars, certain she would reach them one day. Almost everyone has that thought once. She is one of the very few who did something about it.'),
 ('p','She emigrated to the United States as a teenager, arriving without speaking English, and did what a certain kind of person does with a hard beginning. She turned it into fuel. She studied electrical engineering and computer science, and with her husband and brother-in-law built a telecommunications company that they eventually sold for a great deal of money.'),
 ('line','She arrived without the language, and turned a hard start into the resources to reach orbit.'),
 ('p','That is the part that gets lost when people hear space tourist. This was not a lark. It was the end of a long climb that began with a teenager in a new country who could not yet speak to the people around her, and who decided that would not be the thing that stopped her.'),
 ('divider',''),
 ('h','The ticket to orbit'),
 ('p','Most people who make that kind of money buy the usual things. Ansari bought a seat on a Russian Soyuz rocket. In September 2006 she flew to the International Space Station, becoming the first Iranian in space, the first Muslim woman in space, and the world' + A + 's first self-funded woman to make the trip.'),
 ('pull','She did not just buy a ticket to space. Years earlier, she had helped build the road.'),
 ('p','Because before the flight, her family had put up the prize money for the competition that pushed the first privately built craft past the edge of space, the contest that now carries the Ansari name. She helped make the entire era of private spaceflight possible, and then she went herself. Few people fund the frontier and then cross it.'),
 ('divider',''),
 ('h','What she carried up'),
 ('p','She took two flags with her to orbit, the American and the Iranian, and she kept a blog from space, writing in plain, moving language about what it felt like to look down at a borderless Earth. For millions of Iranians, and especially Iranian girls, she became proof of something specific: that the ceiling was much higher than they had been told.'),
 ('quote','From up there, the Earth has no borders. It is one thing, and we are all on it together.'),
 ('p','She has spent the years since as an advocate for science, for entrepreneurship, and for the idea that a girl looking up at the stars from anywhere on Earth might one day look back down at it. She did it first, and she has made a point of saying, loudly, that she does not intend to be the last.'),
 ('line','A girl who stared at the stars from Tehran looked back down at the whole Earth from space.'),
]

def render(blocks, who):
    out = []
    for t, x in blocks:
        if t == 'divider':
            out.append("      { t: 'divider' },")
        elif t == 'img':
            out.append("      { t: 'img', key: '" + x + "' },")
        elif t == 'quote':
            out.append("      { t: 'quote', x: '" + x.replace("'", A) + "', who: '" + who + "' },")
        else:
            out.append("      { t: '" + t + "', x: '" + x.replace("'", A) + "' },")
    return "\n".join(out)

import re
def swap(key, blocks, read, who):
    global s
    ks = s.find("key: '" + key + "'")
    if ks < 0:
        print("MISSING", key); return
    bi = s.find("blocks: [", ks)
    be = s.find("\n    ],", bi)
    s = s[:bi] + "blocks: [\n" + render(blocks, who) + s[be:]
    rs = re.search(r"readMins: \d+,", s[ks:])
    if rs:
        a = ks + rs.start(); b = ks + rs.end()
        s = s[:a] + ("readMins: " + str(read) + ",") + s[b:]

swap('rassi', RASSI, 4, 'Mazdack Rassi')
swap('ansari', ANSARI, 4, 'Anousheh Ansari')
open(p, "w").write(s)
print("rassi imgs:", s.count("article-rassi-1"), s.count("article-rassi-2"))
print("ansari quote:", s.count("who: 'Anousheh Ansari'"))
