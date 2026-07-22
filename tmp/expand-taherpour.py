# -*- coding: utf-8 -*-
p = "constants/articles.ts"
s = open(p).read()
A = "\u2019"

TAHERPOUR = [
 ('lead','Saman Taherpour designs the way a good editor writes: by removing everything that does not need to be there, until what is left feels inevitable.'),
 ('p','Through his studio, Kiani Concept, he works in a restrained, exacting visual language. The forms are clean, the palette is disciplined, the detailing is quiet. Nothing is added for effect. It is the kind of work that looks simple until you try to do it yourself and realise how much judgement each decision took.'),
 ('line','Anyone can add. The hard discipline is knowing what to leave out.'),
 ('divider',''),
 ('h','The long way to a clear line'),
 ('p','Work this spare does not come from nowhere. It comes from years of looking, testing, and discarding, from a designer who kept refining a point of view until it was strong enough to say very little and still say everything. The calm you see in the finished work is the last step of a long process, not the first.'),
 ('p','Taherpour built Kiani Concept as the vehicle for that vision: a studio with a single, consistent sensibility rather than a portfolio that chases whatever is current. That is a harder path. It means turning down the easy flourish, resisting the trend, and trusting that restraint will read as confidence rather than absence.'),
 ('pull','A spare object is only as good as its worst line. There is nowhere to hide.'),
 ('img','article-taherpour-work'),
 ('divider',''),
 ('h','Restraint as the whole method'),
 ('p','The through line in everything he makes is control. Where a lot of design reaches for more, more texture, more colour, more ornament, Taherpour reaches for less, and trusts proportion and material to carry the result. That is the harder position to hold, because a single weak decision has nowhere to hide in work this clean.'),
 ('p','It is a sensibility with deep roots in the region he comes from, where geometry and restraint have always done the heavy lifting, where a plain surface and a perfect proportion were understood to be worth more than decoration. But the work itself is contemporary and quietly international. It does not announce where it is from. It simply carries it.'),
 ('line','The confidence is not in what he puts on the page. It is in what he is willing to leave off it.'),
 ('divider',''),
 ('h','What the work argues'),
 ('p','What Kiani Concept demonstrates, piece after piece, is that a strong point of view does not need volume. It needs consistency, and the nerve to hold a line when everything around you is getting louder. In a field that rewards the eye-catching, Taherpour bet on the quietly excellent, and made that the entire identity of the studio.'),
 ('p','The result is design that reads as calm and considered rather than loud, work you keep looking at precisely because it is not trying to grab you. That is the whole vision, and it is a genuinely difficult one to sustain: say less, mean more, and trust the person looking to feel the difference.'),
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
ks = s.find("key: 'taherpour'")
bi = s.find("blocks: [", ks)
be = s.find("\n    ],", bi)
s = s[:bi] + "blocks: [\n" + render(TAHERPOUR) + s[be:]
rs = re.search(r"readMins: \d+,", s[ks:])
if rs:
    a = ks + rs.start(); b = ks + rs.end()
    s = s[:a] + "readMins: 4," + s[b:]

open(p, "w").write(s)
print("taherpour expanded, img:", s.count("article-taherpour-work"))
