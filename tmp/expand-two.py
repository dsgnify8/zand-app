# Rewrites the Googoosh and Panahi articles: longer, deeper, with line/divider/pull illustrations.
p = "constants/articles.ts"
s = open(p).read()

A = "\u2019"  # curly apostrophe, safe inside single-quoted TS strings

GOOGOOSH = [
  ('lead', 'Ask anyone who grew up in Iran in the 1970s to name the sound of that decade, and you will hear one name. Googoosh.'),
  ('p', 'She was a star before she was a woman. A child performer, put on stage by her father when she was barely old enough to remember life without an audience, she grew up in front of the whole country. By her twenties she was not simply famous. She was the mirror Iran held up to itself.'),
  ('line', 'What she wore on Friday, the whole country wore by Monday.'),
  ('p', 'Her haircuts became the haircut. Her clothes set the fashion. Her films filled the cinemas, and her songs poured out of every radio and taxi and open window. To be a young Iranian woman in that era was, in some quiet way, to measure yourself against Googoosh. She was modern, glamorous, and completely her own, at the exact moment Iran was reaching for all three.'),
  ('p', 'She performed at the height of it, for the country' + A + 's elite and for the Shah himself, in the gilded final years of an era nobody knew was ending. She has spoken about those years with a kind of wonder: the scale of it, the lights, the sense of standing at the very centre of a nation' + A + 's idea of itself.'),
  ('divider', ''),
  ('h', 'And then the music stopped'),
  ('p', 'The 1979 revolution did not send Googoosh into exile. That is the part people outside Iran often miss, and it is the part that matters most. Under the new order, women were forbidden to sing solo in public. And Googoosh, the most recognisable voice in the entire country, was inside its borders when the door closed.'),
  ('pull', 'The most famous voice in Iran fell silent inside its own country, and stayed silent for over twenty years.'),
  ('p', 'She did not leave. For more than two decades she lived in Tehran as a legend who was no longer allowed to be one. There were detentions. There was fear. There was the strange, suffocating experience of being known by everyone and heard by no one. A whole generation grew up hearing about Googoosh from their parents, playing old cassettes passed hand to hand, knowing the voice only as something from before.'),
  ('line', 'She was present and absent at once: a silence with a name everyone knew.'),
  ('divider', ''),
  ('h', 'The voice comes back'),
  ('p', 'In 2000, after more than twenty years, Googoosh was finally able to leave Iran. The first thing she did was the one thing she had been forbidden to do. She sang.'),
  ('p', 'The comeback was not a concert. It was an event. Iranians across the world, and quietly inside Iran through whatever means they could find, treated her return as the recovery of something that had been taken from all of them. The voice was older now, and it carried every one of those silent years inside it. People wept in the aisles. They were not only hearing a singer. They were hearing their own past handed back to them.'),
  ('divider', ''),
  ('h', 'More than a singer'),
  ('p', 'In the years since, Googoosh has become something larger than the pop star she once was. When a new generation of Iranian women rose up over their right to choose how they live, she stood with them, openly, using the fame that had survived everything.'),
  ('line', 'They took her voice for twenty years. They never got it back.'),
  ('p', 'Her life reads like the recent history of Iran pressed into a single person: the glamour, the rupture, the long forced quiet, and the voice that in the end would not stay down. That is why, for millions, she is not simply a singer they love. She is proof of something they need to believe.'),
]

PANAHI = [
  ('lead', 'In 2010, an Iranian court handed the filmmaker Jafar Panahi a sentence that would have ended most careers: twenty years without making films, writing scripts, giving interviews, or leaving the country. He has made some of his most admired work since.'),
  ('p', 'Panahi is one of the most respected filmmakers alive, a central figure of Iranian cinema whose films are spare, humane, and quietly political. That last quality is what put him in the state' + A + 's path. His work kept looking, plainly and without permission, at the lives of ordinary Iranians, and that looking was treated as a threat.'),
  ('divider', ''),
  ('h', 'Making the films you are forbidden to make'),
  ('p', 'Most people, told they may not work for twenty years, would stop. Panahi did the opposite, and turned the ban itself into the material. His first film under it was titled, with quiet defiance, This Is Not a Film. He shot it inside his own apartment while under house arrest, much of it on a phone, and had it smuggled out of the country to the Cannes festival on a drive hidden inside a cake.'),
  ('pull', 'Told he could not make films, he made a film about not being allowed to make films, and sent it to Cannes inside a cake.'),
  ('p', 'He kept going. He made a film almost entirely inside a moving car. He made others in secret, under conditions that would stop most productions before they began. Denied crews, locations, and permits, he built cinema out of small rooms and long conversations, and turned every limitation into a style.'),
  ('line', 'The ban was meant to end his work. It became his subject instead.'),
  ('divider', ''),
  ('h', 'The world refused to look away'),
  ('p', 'The international film community would not let him disappear. His films kept arriving at the major festivals, and kept winning their highest honours, at Cannes, at Venice, at Berlin. Each award was two things at once: recognition of the art, and a refusal to accept the silencing of the artist.'),
  ('p', 'The prizes were not sentiment. The films earned them. But every one of them also carried a message back to the authorities in Tehran: the man you have tried to erase is, right now, being celebrated by the world.'),
  ('line', 'They tried to make him invisible. He became one of the most watched filmmakers on earth.'),
  ('divider', ''),
  ('h', 'What the camera does'),
  ('p', 'Panahi' + A + 's career has become a study in what an artist does when the state orders him to stop. He did not make speeches. He did not wait for permission that was never coming. He kept the camera running, quietly, in kitchens and cars and back rooms, and let the films make the argument on his behalf.'),
  ('p', 'That is the discipline underneath the defiance. Not noise, but persistence. A refusal, held steady across years, to accept that the work could be forbidden. The films exist. That, in the end, is the whole point.'),
]

def render(blocks):
    out = []
    for t, x in blocks:
        if t == 'divider':
            out.append("      { t: 'divider' },")
        else:
            out.append("      { t: '%s', x: '%s' }," % (t, x.replace("'", A)))
    return "\n".join(out)

def swap(key, blocks, read):
    global s
    ks = s.find("key: '%s'" % key)
    if ks < 0:
        print("MISSING", key); return
    bi = s.find("blocks: [", ks)
    be = s.find("\n    ],", bi)
    s = s[:bi] + "blocks: [\n" + render(blocks) + s[be:]
    # bump read time
    import re
    rs = re.search(r"readMins: \d+,", s[ks:])
    if rs:
        a = ks + rs.start(); b = ks + rs.end()
        s = s[:a] + ("readMins: %d," % read) + s[b:]

swap('googoosh', GOOGOOSH, 4)
swap('panahi', PANAHI, 3)

open(p, "w").write(s)
print("googoosh blocks:", s.count("key: 'googoosh'"))
print("has line block:", "t: 'line'" in s)
print("has divider:", "t: 'divider'" in s)
