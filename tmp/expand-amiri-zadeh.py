# -*- coding: utf-8 -*-
p = "constants/articles.ts"
s = open(p).read()
A = "\u2019"

AMIRI = [
 ('lead','Before AMIRI showed in Paris, before the celebrities and the runway, Mike Amiri was making one-off pieces by hand for musicians who needed to look a certain way under stage lights.'),
 ('p','He grew up in Los Angeles, inside its music culture, and that is where the eye was trained. He was not studying fashion in the abstract. He was making clothes for people whose entire job is to be looked at, and learning, piece by piece, what reads from a stage and what falls flat.'),
 ('line','He learned to design for the moment a guitarist steps into the light, not for a mannequin in a showroom.'),
 ('p','That apprenticeship, dressing rock musicians one garment at a time, gave him something a design school cannot. He understood the specific glamour of rock and roll from the inside: the wear, the attitude, the sense that a great piece of stage clothing looks like it has already lived a life. He was not borrowing the aesthetic. He had grown up in it.'),
 ('divider',''),
 ('h','Turning a feeling into a house'),
 ('p','He founded AMIRI in 2014, and the brand carried that DNA without dilution. Distressed denim finished by hand. Rocker silhouettes. An unmistakably Los Angeles sensibility, lifted to the price and the craft of a luxury house. It filled a gap nobody else had quite named.'),
 ('pull','Nobody else was making rock and roll feel that expensive, and that precise.'),
 ('p','The distressing that looks careless is the opposite of careless. Each piece is worked by hand to arrive at a specific kind of worn, the kind that takes real skill to fake. That tension, studied craft producing something that looks effortless and lived-in, is the whole trick of the brand, and it is why the clothes command the prices they do.'),
 ('divider',''),
 ('h','Paris, without losing the thread'),
 ('p','AMIRI grew fast, from a cult favourite into a serious house showing on the Paris schedule, worn by exactly the kind of musicians Amiri had started out dressing. The remarkable part is how little the vision drifted as the business scaled. Growth usually softens a point of view. His only sharpened.'),
 ('quote','Elvis stays on my moodboard. That feeling never leaves the work.'),
 ('p','He kept his references close and his instinct fixed. The clothes still look like they belong on a stage. They are just made now with the resources of a global luxury company instead of the hands of one man in Los Angeles. The scale changed. The feeling did not.'),
 ('line','The kid making stage clothes and the designer showing in Paris are chasing the exact same feeling.'),
 ('p','That is the achievement, and it is rarer than it sounds: to follow one specific instinct from the very bottom of an industry to the very top, and never once let go of the thing that started it. Most designers lose the thread on the way up. Amiri built the whole house out of refusing to.'),
]

ZADEH = [
 ('lead','Sheena Zadeh came to beauty the technical way, through chemistry, and that single fact explains why Kosas works the way it does.'),
 ('p','She trained in cosmetic chemistry. That means she understood formulation from the inside, not as a story to tell customers but as the actual substance of the thing. When most people start a beauty brand, they commission a product from someone else. Zadeh could build one herself, and knew exactly why each ingredient was there.'),
 ('line','Most founders have to trust a lab. She was the lab.'),
 ('p','The premise of Kosas was specific and, at the time, almost contrarian: makeup that is genuinely good for your skin, and comfortable enough that you forget you are wearing it. Not coverage that sits on the face like a mask, but color that behaves like skincare underneath it.'),
 ('divider',''),
 ('h','The moment the line blurred'),
 ('p','That premise landed at the exact moment the wall between skincare and makeup was coming down. People had stopped wanting heavy foundation and started wanting products that treated the skin while they wore them. Kosas was built for that shift before it had fully arrived, which is the hardest kind of timing to get right.'),
 ('pull','She was not chasing the trend toward skin-first beauty. She had already formulated for it.'),
 ('p','Foundations with active ingredients. Formulas that feel like nothing. Color that reads as better skin rather than a layer over it. Because Zadeh could actually formulate, the brand delivered on the promise instead of merely making it, and customers felt the difference the first time they used it. That is the gap between a claim and a product that keeps them coming back.'),
 ('divider',''),
 ('h','Expertise as the moat'),
 ('p','In an industry crowded with invented origin stories and borrowed credibility, Kosas had something much harder to copy: a founder who knew, at a molecular level, what she was making. That is not a marketing angle. It is a genuine advantage, and it compounds, because every new product starts from real understanding rather than a brief handed to a stranger.'),
 ('quote','I wanted to make the things I actually wanted to wear, and I had the training to make them right.'),
 ('p','Kosas grew into one of the defining names in clean, skin-first beauty, the kind of brand that sets the direction of a category rather than following it. The reason is not a slogan on the box. It is that the person who built it had the science to stand behind every claim on the label.'),
 ('line','In a business full of stories, she had the chemistry.'),
]

def render(blocks, who):
    out = []
    for t, x in blocks:
        if t == 'divider':
            out.append("      { t: 'divider' },")
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

swap('amiri', AMIRI, 4, 'Mike Amiri')
swap('zadeh', ZADEH, 4, 'Sheena Zadeh')
open(p, "w").write(s)
print("done. amiri quote:", s.count("who: 'Mike Amiri'"), "zadeh quote:", s.count("who: 'Sheena Zadeh'"))
