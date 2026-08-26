# Titles that say who and what.
#
# The old ones were mostly a phrase pulled from the piece — evocative, and
# useless on a feed where you are deciding what to open. A title on a card
# has one job: tell me who this is about and why I would read it.
#
# The subject's name goes in every one. Standfirsts rewritten to carry the
# thing that makes the piece worth reading rather than a mood.
#
# Also: the filters at the top were portrait/studio/feature/archive, which
# describe how we filed things rather than what they are. They become the
# disciplines the articles actually cover.

import re

p = "constants/tpm-content.ts"
s = open(p).read()

TITLES = {
  'isam': (
    'Isam is filling a gap in Persian rap nobody else could',
    'The Toronto rapper on writing in two languages, the platforms that '
    'ignore Iranian artists, and finishing his first album.',
  ),
  'pozx': (
    'Pozx, the Lo-Fi Guy of Tehran',
    'He found the genre by accident at nineteen. On cassette warmth, being '
    'expelled repeatedly, and why he does not believe in mainstream.',
  ),
  'poobon': (
    'Poobon on a decade at the centre of Iranian music',
    'Drum & bass that should not have worked, collaborations with Hichkas '
    'and Tory Lanez, and why the quiet years matter most.',
  ),
  'neena': (
    'Neena Roe grew up in Detroit and sings in Farsi anyway',
    'The cover of our first print edition. On microtones, Tumblr, and the '
    'cousin whose favourite song became her first Persian release.',
  ),
  'niousha': (
    'Niousha Noor on The Persian Version and the cycle it might break',
    'The actor on stereotyped auditions, a standing ovation at Sundance, '
    'and asking her own mother questions she had never thought to ask.',
  ),
  'soheil': (
    'Soheil Alavi built a podcast with no music and no editing',
    'Tabaghe 16 began on a sixteenth floor as founder-to-founder therapy. '
    'He has since left his startup for it.',
  ),
  'churooks': (
    'Churooks are building a scene that does not exist yet',
    'Four musicians in Tehran making progressive funk rock, giving out '
    'stickers, and putting every show at fifty-fifty odds of happening.',
  ),
  'jabbar': (
    "DJ Jabbar and the sound of Tehran's underground",
    'A B-boy from Mashhad who found his sound in a rented basement, a '
    'circus scrapheap, and the streets.',
  ),
  'golsa': (
    'Golsa and the music of the streets',
    'An interview on a cold uphill street in Tehran, joined midway by a '
    'lawyer named Ramin who was not invited and did not leave.',
  ),
  'owdezmubie': (
    'Owdez and Mubie treat the voice as an instrument',
    'Kamran and Mobina on Adamaye Bad, self-made visuals, and the lyric '
    'that turns a vocal stem into something else.',
  ),
  'shahrzad': (
    "Shahrzad Shokouhivand is reviving Iran's lost flavours",
    'The first Iranian to receive the Ordre du Mérite Agricole, on French '
    'technique, a Tabrizi childhood, and selling pastries one at a time.',
  ),
  'lotfi': (
    'Ella Lotfi is redefining what a body can do',
    'A gymnast, dancer and choreographer whose videos went viral as memes '
    '— and what competitive gymnastics cost her to get there.',
  ),
  'alaei': (
    'Forough Alaei photographed the women sneaking into stadiums',
    'She disguised herself as a man to document them. The series won a '
    'World Press Photo prize.',
  ),
  'mahini': (
    'Ali Mahini photographs the people nobody looks at',
    'A Gen Z photographer digging under Iranian identity, and the '
    'intellectual space he is trying to destroy.',
  ),
  'phi': (
    'Ali Phi builds machines and false mirrors',
    'The Iranian-Canadian transmedia artist on digital waste, Achaemenid '
    'theory, and installations that hand people back to themselves.',
  ),
  'keayaun': (
    'Keayaun climbs the parts of the city you never see',
    'Rooftops, tunnels, and a jump from a moving train on his 22nd '
    'birthday that changed how he thinks about time.',
  ),
  'bybanoo': (
    'BY BANOO: the sisters who built the bag they could not find',
    'Persheng and Perdica Babaheidari left a consultancy and a medical '
    'degree. They now sell to forty countries.',
  ),
  'slang2': (
    "The Beginner's Guide to Persian Slang, Volume #2",
    'The words and phrases you will not learn in class or read in '
    'classical literature.',
  ),
}

done = 0
for key, (title, stand) in TITLES.items():
    i = s.find("key: '%s'," % key)
    if i < 0:
        print("   missing:", key); continue

    # the title line for this piece
    m = re.compile(r"\n    title: .*?,\n", re.S).search(s, i)
    if m:
        esc = title.replace("'", "\\'")
        s = s[:m.start()] + "\n    title: '%s',\n" % esc + s[m.end():]

    # and its standfirst, which may span several lines
    m = re.compile(r"\n    standfirst:.*?\n    cover:", re.S).search(s, i)
    if m:
        esc = stand.replace("'", "\\'")
        s = s[:m.start()] + "\n    standfirst:\n      '%s',\n    cover:" % esc + s[m.end():]
    done += 1

open(p, "w").write(s)
print("retitled:", done)


# ------------------------------------------------------ the filters
p = "app/(tabs)/tpm.tsx"
s = open(p).read()
a = """const FILTERS = [
  { key: 'all', label: 'Everything' },
  { key: 'portrait', label: 'Portraits' },
  { key: 'studio', label: 'Studios' },
  { key: 'feature', label: 'Features' },
  { key: 'archive', label: 'Archive' },
];"""
b = """/**
 * What the magazine actually covers.
 *
 * The old filters were portrait/studio/feature/archive, which describe how
 * a piece was filed rather than what it is about. Nobody browsing wants
 * "features"; they want music, or film, or food.
 *
 * Built from the posts, so a new discipline appears on its own.
 */
const FILTERS = [
  { key: 'all', label: 'Everything' },
  ...Array.from(new Set(TPM_POSTS.map((p) => p.discipline)))
    .sort()
    .map((d) => ({ key: d, label: d })),
];"""
print("filters:", a in s); s = s.replace(a, b, 1)

# and filter on discipline rather than kind
a = "  const posts = filter === 'all' ? TPM_POSTS : TPM_POSTS.filter((p) => p.kind === filter);"
b = "  const posts = filter === 'all' ? TPM_POSTS : TPM_POSTS.filter((p) => p.discipline === filter);"
print("filtering:", a in s); s = s.replace(a, b, 1)
open(p, "w").write(s)
