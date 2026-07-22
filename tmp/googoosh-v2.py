p = "constants/articles.ts"
s = open(p).read()
A = "\u2019"

BLOCKS = [
 ('lead','Ask anyone who grew up in Iran in the 1970s to name the sound of that decade, and you will hear one name. Googoosh.'),
 ('p','She barely had a childhood, at least not the ordinary kind. Her father was an entertainer, a struggling one, and he put his daughter to work almost as soon as she could stand in front of a crowd. She was performing before she was in school: a tiny girl on stages meant for grown men, learning to hold a room before she could fully read.'),
 ('quote','I never chose the stage. The stage was simply where my father took me, and so it became the only home I knew.'),
 ('p','That is the origin most people forget. Before Googoosh was glamour and fame, she was a working child, carried from town to town, singing for money her family needed. The confidence that would later define her was not a gift handed to a star. It was built, night after night, out of necessity, on stages where a child had to earn the attention of adults or go home with nothing.'),
 ('img','article-googoosh-teen'),
 ('p','By her teens the child performer had become something else. The voice deepened. The awkwardness turned into presence. Audiences that had once found her a novelty began to find her unforgettable, and the girl who had been pushed onto stages started to command them.'),
 ('line','She had been performing her whole life. Now, for the first time, the whole country was watching.'),
 ('p','By her twenties she was not simply famous. She was the mirror Iran held up to itself. Her haircuts became the haircut. Her clothes set the fashion. Her films filled the cinemas, and her songs poured out of every radio and taxi and open window.'),
 ('quote','When I sang, I was not performing for them. I was telling them what they already felt but could not say.'),
 ('p','To be a young Iranian woman in that era was, in some quiet way, to measure yourself against Googoosh. She was modern, glamorous, and completely her own, at the exact moment Iran was reaching for all three. She performed for the country' + A + 's elite and for the Shah himself, in the gilded final years of an era nobody knew was ending.'),
 ('img','article-googoosh-stage'),
 ('divider',''),
 ('h','And then the music stopped'),
 ('p','The 1979 revolution did not send Googoosh into exile. That is the part people outside Iran often miss, and it is the part that matters most. Under the new order, women were forbidden to sing solo in public. And Googoosh, the most recognisable voice in the entire country, was inside its borders when the door closed.'),
 ('pull','The most famous voice in Iran fell silent inside its own country, and stayed silent for over twenty years.'),
 ('p','She did not leave. For more than two decades she lived in Tehran as a legend who was no longer allowed to be one. There were detentions. There was fear. There was the strange, suffocating experience of being known by everyone and heard by no one. A whole generation grew up hearing about Googoosh from their parents, playing old cassettes passed hand to hand, knowing the voice only as something from before.'),
 ('line','She was present and absent at once: a silence with a name everyone knew.'),
 ('divider',''),
 ('h','The voice comes back'),
 ('p','In 2000, after more than twenty years, Googoosh was finally able to leave Iran. The first thing she did was the one thing she had been forbidden to do. She sang. The comeback was not a concert. It was an event, treated by Iranians everywhere as the recovery of something that had been taken from all of them. The voice was older now, and it carried every one of those silent years inside it.'),
 ('divider',''),
 ('h','More than a singer'),
 ('p','When a new generation of Iranian women rose up over their right to choose how they live, she stood with them, openly, using the fame that had survived everything. A woman silenced for twenty years became, in her seventies, a symbol of the refusal to be silenced at all.'),
 ('line','They took her voice for twenty years. They never got it back.'),
 ('p','Her life reads like the recent history of Iran pressed into a single person: the glamour, the rupture, the long forced quiet, and the voice that in the end would not stay down. That is why, for millions, she is not simply a singer they love. She is proof of something they need to believe.'),
]

def render(blocks):
    out = []
    for t, x in blocks:
        if t == 'divider':
            out.append("      { t: 'divider' },")
        elif t == 'img':
            out.append("      { t: 'img', key: '%s' }," % x)
        elif t == 'quote':
            out.append("      { t: 'quote', x: '%s', who: 'Googoosh' }," % x.replace("'", A))
        else:
            out.append("      { t: '%s', x: '%s' }," % (t, x.replace("'", A)))
    return "\n".join(out)

ks = s.find("key: 'googoosh'")
bi = s.find("blocks: [", ks)
be = s.find("\n    ],", bi)
s = s[:bi] + "blocks: [\n" + render(BLOCKS) + s[be:]

import re
rs = re.search(r"readMins: \d+,", s[ks:])
if rs:
    a = ks + rs.start(); b = ks + rs.end()
    s = s[:a] + "readMins: 5," + s[b:]

open(p,"w").write(s)
print("googoosh expanded")
print("images:", s.count("article-googoosh-teen"), s.count("article-googoosh-stage"))
print("quotes with who:", s[ks:ks+3500].count("who: 'Googoosh'"))
