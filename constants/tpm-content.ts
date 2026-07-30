// The Persian Mag inside ZAND.
//
// Posts mirror what they publish: portraits, studio visits, short profiles
// of people making things. Image keys are slots the admin fills, the same
// way article covers work.

export type TpmKind = 'portrait' | 'studio' | 'feature' | 'archive';

export type TpmPost = {
  key: string;
  kind: TpmKind;
  title: string;
  subject: string;         // who it is about
  discipline: string;      // what they do
  standfirst: string;
  cover: string;           // image key
  images?: string[];       // extra image keys, shown as a gallery
  minutes: number;
  body: { t: 'p' | 'q' | 'h'; x: string; who?: string }[];
};

export type TpmCreative = {
  key: string;
  name: string;
  discipline: string;
  city: string;
  image: string;
  line: string;            // one line about them
};

export const TPM_POSTS: TpmPost[] = [
  {
    key: 'p1',
    kind: 'portrait',
    title: 'The hands behind the loom',
    subject: 'Studio visit',
    discipline: 'Textile',
    standfirst: 'A workshop where the old knots are still tied by hand, and the people tying them are under thirty.',
    cover: 'tpm-1-cover',
    images: ['tpm-1-a', 'tpm-1-b', 'tpm-1-c'],
    minutes: 4,
    body: [
      { t: 'p', x: 'The loom takes up most of the room. Everything else in the studio has arranged itself around it.' },
      { t: 'q', x: 'We are not preserving anything. We are just making things, the way they were always made.', who: 'the studio' },
      { t: 'p', x: 'What strikes you first is how young everyone is. The assumption with traditional craft is that it is being kept alive by people who remember it. Here it is being done by people who chose it.' },
    ],
  },
  {
    key: 'p2',
    kind: 'feature',
    title: 'Type, in two directions',
    subject: 'Design',
    discipline: 'Graphic design',
    standfirst: 'Designing for a script that runs right to left, in an industry whose tools assume it does not.',
    cover: 'tpm-2-cover',
    images: ['tpm-2-a', 'tpm-2-b'],
    minutes: 5,
    body: [
      { t: 'p', x: 'Every piece of design software in common use was built for Latin type first and everything else after. Persian designers have spent decades working around that.' },
      { t: 'h', x: 'Working against the tool' },
      { t: 'p', x: 'The result is a generation of designers who are unusually good at improvising, because nothing has ever quite fit.' },
    ],
  },
  {
    key: 'p3',
    kind: 'studio',
    title: 'A room in the north of the city',
    subject: 'Studio visit',
    discipline: 'Painting',
    standfirst: 'Where the work happens, and what is pinned to the wall above it.',
    cover: 'tpm-3-cover',
    images: ['tpm-3-a', 'tpm-3-b', 'tpm-3-c'],
    minutes: 3,
    body: [
      { t: 'p', x: 'Studios tell you more than statements do. This one is mostly light, one chair, and a wall of things torn out of other people’s books.' },
    ],
  },
  {
    key: 'p4',
    kind: 'portrait',
    title: 'The photographer who stayed',
    subject: 'Portrait',
    discipline: 'Photography',
    standfirst: 'Everyone she trained with left. She talks about why she did not.',
    cover: 'tpm-4-cover',
    minutes: 6,
    body: [
      { t: 'p', x: 'The question gets asked so often that she has a short answer ready, and a longer one she gives when there is time.' },
      { t: 'q', x: 'The work is here. I could photograph somewhere else, but I would be photographing something else.', who: 'the photographer' },
    ],
  },
  {
    key: 'p5',
    kind: 'feature',
    title: 'Sound from the south',
    subject: 'Music',
    discipline: 'Music',
    standfirst: 'The rhythms of the Gulf coast, and the producers pulling them into something new.',
    cover: 'tpm-5-cover',
    images: ['tpm-5-a', 'tpm-5-b'],
    minutes: 5,
    body: [
      { t: 'p', x: 'Bandari has always been the music of the ports: African, Arab and Persian at once, because the ports were.' },
    ],
  },
  {
    key: 'p6',
    kind: 'archive',
    title: 'From the archive',
    subject: 'Archive',
    discipline: 'Photography',
    standfirst: 'Images from a decade of the magazine, and the people in them now.',
    cover: 'tpm-6-cover',
    images: ['tpm-6-a', 'tpm-6-b', 'tpm-6-c', 'tpm-6-d'],
    minutes: 4,
    body: [
      { t: 'p', x: 'Going back through it, the striking thing is not how much has changed but how many of the same people are still working.' },
    ],
  },
  {
    key: 'p7',
    kind: 'portrait',
    title: 'Ceramics, slowly',
    subject: 'Portrait',
    discipline: 'Ceramics',
    standfirst: 'A practice built around glazes that take three firings and a great deal of waiting.',
    cover: 'tpm-7-cover',
    images: ['tpm-7-a', 'tpm-7-b'],
    minutes: 4,
    body: [
      { t: 'p', x: 'The turquoise is the hard one. Getting it right depends on things nobody fully controls.' },
    ],
  },
  {
    key: 'p8',
    kind: 'feature',
    title: 'What the diaspora is making',
    subject: 'Feature',
    discipline: 'Across disciplines',
    standfirst: 'Six practices, four cities, one shared and complicated inheritance.',
    cover: 'tpm-8-cover',
    images: ['tpm-8-a', 'tpm-8-b', 'tpm-8-c'],
    minutes: 8,
    body: [
      { t: 'p', x: 'None of them would describe their work as being about Iran. All of it is, somewhere underneath.' },
    ],
  },
];

export const TPM_CREATIVES: TpmCreative[] = [
  { key: 'c1', name: 'Placeholder', discipline: 'Photography', city: 'Tehran', image: 'tpm-c1', line: 'Portraits, mostly of people at work.' },
  { key: 'c2', name: 'Placeholder', discipline: 'Textile', city: 'Isfahan', image: 'tpm-c2', line: 'Weaving, and the argument for doing it slowly.' },
  { key: 'c3', name: 'Placeholder', discipline: 'Graphic design', city: 'Berlin', image: 'tpm-c3', line: 'Type in two directions at once.' },
  { key: 'c4', name: 'Placeholder', discipline: 'Ceramics', city: 'Los Angeles', image: 'tpm-c4', line: 'Glazes that take three firings.' },
  { key: 'c5', name: 'Placeholder', discipline: 'Film', city: 'Paris', image: 'tpm-c5', line: 'Short films about leaving and not leaving.' },
  { key: 'c6', name: 'Placeholder', discipline: 'Music', city: 'Bandar Abbas', image: 'tpm-c6', line: 'The rhythms of the coast, rebuilt.' },
];

export function tpmPost(k?: string) {
  return TPM_POSTS.find((p) => p.key === k);
}
