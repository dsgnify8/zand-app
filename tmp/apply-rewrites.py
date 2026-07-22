import re

p = "constants/articles.ts"
s = open(p).read()

NEW = {
 'zandesh': {
   'standfirst': "Keivan Zandesh runs 4-Gott, among the largest pick and mix candy retailers in western Sweden, out of Gothenburg. He sells sweets by the ton.",
   'excerpt': "He turned Sweden\u2019s love of Saturday sweets into one of the region\u2019s biggest candy operations.",
   'blocks': """      { t: 'lead', x: 'Keivan Zandesh sells candy by the ton. His company, 4-Gott, runs some of the largest pick and mix operations in western Sweden, out of Gothenburg.' },
      { t: 'p', x: 'He came to Sweden around the time of the Iranian revolution and started with very little. He built the business up over years into an operation known regionally for the scale of its selection: walls of loose candy, bins by the hundred, volumes that most confectionery retailers never attempt.' },
      { t: 'h', x: 'Reading the Swedish market' },
      { t: 'p', x: 'Sweden has an unusually strong candy culture. The tradition of lordagsgodis, Saturday sweets, is a fixed national habit, and loose pick and mix is how most of it is bought. Zandesh built specifically around that demand, competing on range and price at a scale that turned a common product into a serious business.' },
      { t: 'img', key: 'article-zandesh-store', cap: 'A 4-Gott store, where candy is sold loose and by weight.' },
      { t: 'p', x: 'The model is simple and hard to execute: buy well, stock deep, keep prices low, and offer more variety than anyone nearby. Doing that consistently, across a large retail footprint, is what separates a shop from a chain.' },
      { t: 'h', x: 'The operator behind it' },
      { t: 'p', x: 'What the business runs on is operational discipline: supply, logistics, and margins on a product sold cheaply in enormous quantity. Zandesh built and still runs it from Gothenburg, and it stands as one of the more distinctive retail successes in the region.' },""",
 },
 'cultgaia': {
   'standfirst': "Jasmin Larian Hekmat founded Cult Gaia in 2012. Its bamboo Ark bag became one of the most recognisable, and most copied, accessories of its era.",
   'excerpt': "One bamboo bag became the most copied accessory of the decade. Here is the mind behind it.",
   'blocks': """      { t: 'lead', x: 'The Cult Gaia Ark bag, a structured fan of polished bamboo, became one of the most recognisable accessories of its era, and one of the most widely copied.' },
      { t: 'p', x: 'Jasmin Larian Hekmat founded Cult Gaia in Los Angeles in 2012. She grew up close to the business of consumer products: her family founded MGA Entertainment, the toy company behind Bratz, so the mechanics of how an object catches on were familiar to her early.' },
      { t: 'h', x: 'A sculptural approach to accessories' },
      { t: 'p', x: 'From the start the brand treated accessories as objects first. The early pieces favoured natural materials and strong, sculptural silhouettes, designed to read as much as a shape as a product. The Ark bag was the clearest expression of that: instantly identifiable, and unlike what most competitors were making.' },
      { t: 'img', key: 'article-cultgaia-1', cap: 'Cult Gaia treats the accessory as a sculptural object first.' },
      { t: 'p', x: 'A single breakout product is difficult to build on; many brands never get past their first hit. Larian Hekmat used the Ark as a base rather than a peak, expanding Cult Gaia into ready to wear, footwear, and a full collection with a consistent design language.' },
      { t: 'img', key: 'article-cultgaia-2', cap: 'The brand expanded from one object into a full ready to wear line.' },
      { t: 'h', x: 'Running the brand' },
      { t: 'p', x: 'She has kept creative control while scaling the company through wholesale and direct to consumer, in a crowded market where recognisability is the hardest thing to hold. Cult Gaia\u2019s durability past its viral moment is the real measure of how it was built.' },""",
 },
 'gisou': {
   'standfirst': "Negin Mirsalehi co founded Gisou in 2015, built around her family\u2019s beekeeping and a honey based hair oil. She launched it to an audience of millions she had already built online.",
   'excerpt': "Six generations of beekeeping, a family honey recipe, and one of beauty\u2019s fastest rises.",
   'blocks': """      { t: 'lead', x: 'Gisou is built around one ingredient: honey, from a family bee garden in the Netherlands that has been kept for six generations.' },
      { t: 'p', x: 'Negin Mirsalehi co founded the brand in 2015. Her father is a beekeeper, and the honey based hair oil at the centre of the line comes from a family recipe. The bee garden gives the brand a genuine, verifiable source, which is rare in beauty.' },
      { t: 'h', x: 'Audience first, then product' },
      { t: 'p', x: 'Mirsalehi built a large online following before launching anything, becoming one of the earlier creators to convert an audience into a company. By the time Gisou existed, there was already a built in base of people who trusted her recommendations. That distribution advantage is a large part of why the brand scaled quickly.' },
      { t: 'img', key: 'article-gisou-garden', cap: 'The Mirsalehi bee garden, the brand honey source.' },
      { t: 'p', x: 'The name is deliberate: gisou means tresses in Persian, which is what the products are made for. The brand leans on a single, defensible origin story rather than an invented one, and pairs it with strong direct to consumer marketing.' },
      { t: 'h', x: 'Why it worked' },
      { t: 'p', x: 'Gisou grew into one of the most talked about brands in beauty on the strength of two things that are hard to fake together: a real, differentiated hero ingredient, and an owned audience to launch it to. Most brands have one or the other. Mirsalehi built the audience first, then had a product with an actual source to sell it.' },""",
 },
}

for key, d in NEW.items():
    # find this article object: from key to its "blocks: [" ... "]," 
    kstart = s.find("key: '%s'" % key)
    if kstart < 0:
        print("MISSING article:", key); continue
    # standfirst
    sf = re.search(r"standfirst: '(?:[^'\\]|\\.)*',", s[kstart:])
    if sf:
        a = kstart + sf.start(); b = kstart + sf.end()
        s = s[:a] + "standfirst: '%s'," % d['standfirst'].replace("'", "\\'") + s[b:]
    # excerpt
    kstart = s.find("key: '%s'" % key)
    ex = re.search(r"excerpt: '(?:[^'\\]|\\.)*',", s[kstart:])
    if ex:
        a = kstart + ex.start(); b = kstart + ex.end()
        s = s[:a] + "excerpt: '%s'," % d['excerpt'].replace("'", "\\'") + s[b:]
    # blocks: replace from "blocks: [" to the matching "]," that precedes "source" or "},"
    kstart = s.find("key: '%s'" % key)
    bi = s.find("blocks: [", kstart)
    # find end of blocks array: the next "\n    ],"
    be = s.find("\n    ],", bi)
    if bi > 0 and be > bi:
        s = s[:bi] + "blocks: [\n" + d['blocks'] + s[be:]
    print("rewrote:", key)

open(p, "w").write(s)

import re as _r
print("standfirsts factual now:",
      "Keivan Zandesh runs 4-Gott" in s,
      "founded Cult Gaia in 2012" in s,
      "co founded Gisou in 2015" in s)
