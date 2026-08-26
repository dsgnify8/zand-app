// The Persian Mag inside ZAND.
//
// Posts mirror what they publish: portraits, studio visits, short profiles
// of people making things. Image keys are slots the admin fills, the same
// way article covers work.

export type TpmKind = 'portrait' | 'studio' | 'feature' | 'archive';

export type TpmBlock =
  | { t: 'lead'; x: string; fa?: string }        // the opening, set larger
  | { t: 'p'; x: string; fa?: string }
  | { t: 'h'; x: string; fa?: string }           // section heading
  | { t: 'q'; x: string; who?: string; fa?: string; whoFa?: string }
  | { t: 'line'; x: string; fa?: string }        // one sentence, alone
  | { t: 'note'; x: string; fa?: string }        // an aside, tinted
  | { t: 'img'; key: string; cap?: string; capFa?: string }
  | { t: 'duo'; keys: [string, string]; cap?: string; capFa?: string }
  | { t: 'qa'; q?: string; who?: string; x: string; qFa?: string; whoFa?: string; fa?: string }
  | { t: 'divider' };

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
  /**
   * The piece, as blocks.
   *
   * Nine kinds rather than three, so two articles marked up differently
   * read differently. The variation is in the marking up, not in the
   * renderer guessing — a magazine looks varied because someone laid each
   * page out, not because a rule alternated.
   */
  body: TpmBlock[];
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
    key: 'bybanoo',
    kind: 'feature',
    title: 'Bags for the rooms where decisions get made',
    subject: 'Persheng & Perdica Babaheidari',
    discipline: 'Fashion',
    standfirst:
      'Two Swedish-Iranian sisters left a consultancy and a medical degree '
      + 'to build the work bag neither of them could find.',
    cover: 'tpm-bybanoo-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'lead', x: 'In 2017 Persheng Babaheidari started work as a management consultant and could not find a laptop bag she wanted to be seen carrying. *So she and her sister made one.*' },

      { t: 'p', x: 'Persheng was a newly graduated engineer; Perdica was studying medicine. Together they founded BY BANOO, named from the Persian for lady, or queen, or woman. It sells in forty countries.' },

      { t: 'divider' },

      { t: 'qa', q: 'What led to the founding of BY BANOO?', who: 'PERSHENG', x: "It was when I began working as a management consultant that I discovered how hard it was to find a stylish and practical laptop bag. I've always been interested in fashion, and there was nothing stylish that would fit a laptop. I asked my friends and colleagues where they bought theirs and everyone said the same thing — it was very difficult. When we looked at what men had, they had a classic briefcase. None of the women carried them, because they obviously weren't stylish or functional enough." },

      { t: 'qa', who: 'PERSHENG', x: "After two years of working I asked my sister whether we should make a company that provides working bags for women, and Perdica thought it was a very good idea. But starting a company takes a long time, so I kept consulting and she kept studying to become a doctor, until we reached a point where we had to focus on it full-time. I quit a little over a year ago. Perdica finished in January and has been full-time since." },

      { t: 'qa', q: 'How was it, setting aside your careers for this?', who: 'PERDICA', x: "One thing our parents instilled in us early is to **dare to be brave**. We were told from a young age that you can do exactly what you want, and that careers can be combined if you want them to be." },

      { t: 'qa', who: 'PERDICA', x: "It is also about the opportunity we have in Sweden, and it feels stupid not to take it. If there's any country that has your back on entrepreneurship, career and education, it's this one. We haven't really reflected on being brave. We hear it often, but it isn't something either of us feels. We have this opportunity, so why would we not take it?" },

      { t: 'qa', who: 'PERSHENG', x: "The reason we haven't felt brave is that we have other scenarios to compare it with. When we see our relatives in Iran, who don't have the same opportunities, we realise how much we can do here — and we almost do it because we can. Education is free. We grew up with the confidence that everything is possible, because our parents had a completely different perspective, growing up during a war." },

      { t: 'q', x: 'We want to see these bags in important rooms where important decisions are made.', who: 'Persheng Babaheidari' },

      { t: 'qa', who: 'PERSHENG', x: "There are very few women in boardrooms and in leadership positions, and there's a reason a product like this didn't exist before — that kind of job is dominated by men. My previous job was male-dominated. So it's a social question for us as much as a commercial one. Women should dare to invest in their careers, the way we've dared to invest in this company." },

      { t: 'h', x: 'The name' },

      { t: 'qa', q: 'Why BY BANOO?', who: 'PERDICA', x: 'It was our father who helped us name it. *Banoo* is a Persian word meaning lady, queen or woman. At first we just wanted to be called Banoo, but the domain was taken. We liked the word too much to let it go, so we arrived at BY BANOO — by the queen, by the lady. It has a personal touch, it shows our heritage, and it says it comes from the woman. It represents both who we are and what we do.' },

      { t: 'h', x: 'What makes a work bag' },

      { t: 'qa', q: 'What matters in one, and what sets yours apart?', who: 'PERSHENG', x: "A good work bag is both functional and stylish. I would never buy one that's ugly but functional, or the reverse, because I need both — so it's something we don't compromise on. It has to hold a lot of weight without deforming, and it needs a laptop compartment, because the jobs we're designing for need a laptop." },

      { t: 'qa', who: 'PERSHENG', x: "We work with Italian leather because it lasts and it looks right. It's also a by-product — no animal dies because you used leather; it's waste you can either throw away or use. Everything is manufactured in Europe so the people making it are working under EU legislation. We were in Estonia, and recently moved production to Portugal. The materials are all bought in Italy to keep transport distances short. Much of fashion is made in Asia and shipped to Sweden, and we try to reduce that — while making a bag good enough that you don't need to buy several." },

      { t: 'qa', who: 'PERSHENG', x: "When we started, this product didn't exist. As far as I know we were among the first in the Nordics. What was comparable was a men's briefcase, or a large backpack, or something that didn't do the job at all — and we wanted to make a briefcase first, because there wasn't one for women. More companies have appeared since, now that more people have felt the problem. Design and function are the core, but we're also authentic behind the brand. Two sisters, and that's what we show." },

      { t: 'qa', who: 'PERDICA', x: 'Authenticity has mattered because we did dare to invest in our own careers. We are both business women, which makes us our own customers — and that makes it much easier to identify what a bag actually needs.' },

      { t: 'h', x: 'Where it goes' },

      { t: 'qa', q: 'What have you reached, and what comes next?', who: 'PERDICA', x: "We got to the global market quite fast, which we didn't expect at the beginning. Today we sell to forty countries." },

      { t: 'qa', who: 'PERSHENG', x: "The thousands of customers, and the pop-up in Stockholm last year. We've hit a need that isn't just ours — that's a large part of why the marketing has worked, because we're describing a problem many women recognise. Until now we've sold only through our own site; we're expanding into retailers and have signed our first, which we'll announce shortly." },

      { t: 'qa', who: 'PERSHENG', x: "We want to be a big global brand focused on business women, because there hasn't been a fashion brand with the businesswoman at the centre. Fashion has largely been about looking good — which we agree with — but there should be a higher purpose alongside it. Women are not just pretty. They're smart and driven, and everyone can go as far as they want, as long as they believe it and have people around them who believe it too." },

      { t: 'qa', who: 'PERDICA', x: "Long term, we want to be the go-to brand for women's work bags. The first thing you think of. If you see a BY BANOO bag in town, you should immediately think: businesswoman." },

      { t: 'qa', who: 'PERSHENG', x: "We want women to feel it when they carry our products. That boost — I will ace this interview, I will nail this pitch, whatever it is. We want women to feel like they can do whatever they want." },
    ],
  },

  {
    key: 'mahini',
    kind: 'portrait',
    title: "I don't see it, so it doesn't exist",
    subject: 'Ali Mahini',
    discipline: 'Photography',
    standfirst:
      'A Gen Z photographer turning his lens on the parts of Iranian life '
      + 'that no eyes are pointed at.',
    cover: 'tpm-mahini-cover',
    images: [],
    minutes: 5,
    body: [
      { t: 'lead', x: '*Irooni boodan* is a mindset without a time or a place: the set of behaviours that make up how Iranians are with each other. Much of it means nothing to an outsider. All of it is identity.' },

      { t: 'p', x: 'Ali Mahini uses the curiosity and the arrogance of his generation to dig underneath it. He photographs native subjects in cities across Iran, pulling out what daily life does not show, and takes on the **weight of putting it in front of people**.' },

      { t: 'p', x: 'Like most photographers he began with the warm and the beautiful — landscapes, light, the usual apprenticeship. What changed him was travelling and talking. Hitchhiking across the country, he spent every ride in conversation with whoever was driving.' },

      { t: 'q', x: 'Every car I rode, I was a new Ali. These conversations were practice for me. Practice of speech, and of light.', who: 'Ali Mahini' },

      { t: 'p', x: 'After that the sunset stopped being a subject. His lens turned toward rooms where human life is actually felt, and toward people who have not only no camera pointed at them but no eyes either.' },

      { t: 'line', x: 'He photographs the people nobody is looking at.' },

      { t: 'p', x: 'On a shoot he talks for hours before anything is taken. The picture is not the priority; the process of arriving at it is. He does not arrange the scene, and he lets the subject choose their own pose and their own place — which is also how he gets around censorship without ever confronting it.' },

      { t: 'h', x: 'Prince of Persia' },

      { t: 'p', x: 'In the collection he calls Prince of Persia, the censorship of Iranian society falls away entirely. Working in Daneshjoo Park, in the middle of the busiest street in Tehran, he brings forward something that thousands of people censor with their own eyes every single day.' },

      { t: 'p', x: 'He listens without judgement and refuses to reduce anyone to a subject. In the talking he finds the roots of the chaos in their lives and reaches the layers underneath. What he keeps arriving at is that there is no gap between the photographer and the person in front of him.' },

      { t: 'note', x: 'Mahini describes the thing he is working against as an intellectual atmosphere — a way of not seeing that lets a society keep its own difficulties out of view. The phrase he uses for it is the title of this piece.' },

      { t: 'p', x: 'So he leaves that atmosphere behind and points the camera at the chaos, in order to show the whole of a society rather than the half of it people have agreed to look at. Ugliness and beauty in the same frame.' },

      { t: 'divider' },

      { t: 'q', x: 'Sometimes people around me ask why I show such dirt. But I have no fear about showing ugliness. The beauty of the story has been seen far too much, and my concern is to show the coldness — which is sometimes not what my audience wants.', who: 'Ali Mahini' },
    ],
  },

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
