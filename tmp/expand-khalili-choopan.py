# -*- coding: utf-8 -*-
p = "constants/articles.ts"
s = open(p).read()
A = "\u2019"

KHALILI = [
 ('lead','Nader Khalili spent his life chasing one stubborn idea: that the architecture of the future was already here, buried in the oldest traditions humanity has.'),
 ('p','He was born in Iran in 1936 and later became an American architect, and somewhere between those two facts he arrived at a conviction that would carry him from the deserts of the Middle East to the planning rooms of NASA. The way forward, he believed, was not more. It was less.'),
 ('p','Looking at the earthen buildings of his own part of the world, the mud domes and vaults that had sheltered people for thousands of years, Khalili stripped construction back to the few things it truly needs. Earth. Geometry. Human hands. Everything else, he came to think, was decoration on top of those three.'),
 ('line','He reduced building to earth, geometry, and a pair of hands, and then asked what more you could possibly need.'),
 ('divider',''),
 ('h','A method the space agencies noticed'),
 ('p','That radical return to first principles is exactly what caught the attention of NASA. If a shelter could be built from little more than the soil beneath it, arranged by geometry understood for millennia, then the same logic might work somewhere with no supply chain at all. On the Moon. On Mars. Places where the only material worth counting on is the ground you land on.'),
 ('pull','A house you can build from the dirt under your feet is exactly the house you would need on another planet.'),
 ('p','Khalili called his system SuperAdobe: long tubes packed with earth, coiled into domes, bound with a little barbed wire, raised by hand. No heavy machinery. No imported steel. A structure that grows out of its own site and, crucially, that ordinary people can build themselves, without a factory or a crane.'),
 ('img','article-khalili-face'),
 ('divider',''),
 ('h','From the Omani desert to a California dome'),
 ('p','The idea reads most beautifully in the built work. At the Junoot Eco Resort in Oman, SuperAdobe domes rise from the desert as though the landscape had simply decided to stand up. They do not sit on the land so much as continue it.'),
 ('p','The method was developed and tested at Cal-Earth, the institute Khalili founded in Hesperia, California. Its Eco Dome is the idea in its quietest form: beneath a single earthen shell, light and simplicity produce a calm that is hard to describe and harder to forget. It is proof that the most elemental materials can make architecture of real dignity.'),
 ('line','The oldest way of building turned out to be the one most ready for the future.'),
 ('divider',''),
 ('h','Why it matters now'),
 ('p','Cal-Earth still teaches the system as a way to put shelter within reach of communities across the world. And at a moment when millions face climate disaster, displacement, and the slow disappearance of cheap materials, Khalili' + A + 's vision has stopped feeling like nostalgia and started feeling like a plan.'),
 ('p','That is his real legacy, and it is a profoundly human one. Not a signature building with his name on it. A belief: that the architecture of tomorrow can grow from the simplest ideas, and that it can belong to everyone, not only those who can afford steel and glass.'),
]

CHOOPAN = [
 ('lead','They call Hadi Choopan the Persian Wolf. In 2022 he became Mr Olympia, the highest title in professional bodybuilding, and the first Iranian ever to hold it.'),
 ('p','He grew up in a village in the Sepidan region near Shiraz, and trained for years in conditions nothing like the resourced, climate-controlled gyms of the men he would one day beat. His talent was obvious early. The obstacles were not about talent at all.'),
 ('line','The gap he had to close was never about ability. It was about everything around the ability.'),
 ('divider',''),
 ('h','The years he lost'),
 ('p','For several years, at the very moment his career should have been building, Choopan could not travel to compete. Visa and travel restrictions kept him in Iran while his rivals abroad piled up the international stage experience he was denied. A bodybuilder is judged on stage, in person, and he was being kept off the one place the title is won.'),
 ('pull','His competitors were gaining years of stage time he was simply not allowed to have.'),
 ('p','When he finally did compete internationally, he placed near the very top almost immediately. That result said something plainly: the years he had lost had cost him nothing in ability, only in time. He had been that good the whole time. The world just had not been allowed to see it.'),
 ('img','article-choopan-1'),
 ('divider',''),
 ('h','Winning it all'),
 ('p','He kept climbing, and in 2022 he took the Olympia title outright. The physique that won is known for a rare combination of size, conditioning, and fine detail, the exact qualities the sport prizes most. But the story around it, the late start on the world stage and the years spent unable to compete, is a large part of why the win landed as hard as it did.'),
 ('line','He reached the top of his sport years late, and made it look like he had always belonged there.'),
 ('img','article-choopan-2'),
 ('divider',''),
 ('h','What he did with the title'),
 ('p','Choopan dedicated his Olympia win, publicly, to the women of Iran, at a moment when doing so carried real weight and real risk. In a sport that rarely reaches beyond its own audience, that single gesture turned a bodybuilding trophy into something people far outside the gym paid attention to.'),
 ('p','It is the whole shape of his story in one act. A man who was kept off the stage for years, who won anyway, and who used the first moment the world was truly watching to point the attention somewhere other than himself.'),
]

def render(blocks):
    out = []
    for t, x in blocks:
        if t == 'divider':
            out.append("      { t: 'divider' },")
        elif t == 'img':
            out.append("      { t: 'img', key: '" + x + "' },")
        else:
            out.append("      { t: '" + t + "', x: '" + x.replace("'", A) + "' },")
    return "\n".join(out)

import re
def swap(key, blocks, read):
    global s
    ks = s.find("key: '" + key + "'")
    if ks < 0:
        print("MISSING", key); return
    bi = s.find("blocks: [", ks)
    be = s.find("\n    ],", bi)
    s = s[:bi] + "blocks: [\n" + render(blocks) + s[be:]
    rs = re.search(r"readMins: \d+,", s[ks:])
    if rs:
        a = ks + rs.start(); b = ks + rs.end()
        s = s[:a] + ("readMins: " + str(read) + ",") + s[b:]

swap('khalili', KHALILI, 4)
swap('choopan', CHOOPAN, 4)
open(p, "w").write(s)
print("khalili img:", s.count("article-khalili-face"))
print("choopan imgs:", s.count("article-choopan-1"), s.count("article-choopan-2"))
