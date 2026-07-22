// Stories: the people. Written to be read as a magazine, not a database.

export type Story = {
  key: string;
  article?: string;
  hook: string;        // the line that stops you
  title: string;       // the piece
  who: string;
  where: string;
  read: string;
  image: string;
  tint: string;
  tag: 'INTERVIEW' | 'PROFILE' | 'ESSAY' | 'IN THEIR WORDS';
};

export const STORIES: Story[] = [
  { key: 'st1', article: 'khalili',
    hook: 'The architect already building for Mars.',
    title: 'Earth, geometry, and a pair of hands.',
    who: 'Nader Khalili',
    where: 'Iran to California',
    read: '6 min',
    image: 'article-khalili-cover',
    tint: '#8C3A2E',
    tag: 'INTERVIEW' },

  { key: 'st2',
    hook: 'She has made samanu every spring for fifty one years.',
    title: 'She has never once used sugar.',
    who: 'Maman Mahin',
    where: 'Shiraz',
    read: '6 min',
    image: 'food-bastani',
    tint: '#B08A46',
    tag: 'PROFILE' },

  { key: 'st3',
    hook: 'He restores carpets nobody else will touch.',
    title: 'Some of them are older than his country.',
    who: 'Farhad Ahmadi',
    where: 'Los Angeles',
    read: '11 min',
    image: 'safavid-cover',
    tint: '#417270',
    tag: 'PROFILE' },

  { key: 'st4',
    hook: 'They built a zurkhaneh in a Toronto basement.',
    title: 'The drum still starts at seven.',
    who: 'The Pahlavan Club',
    where: 'Toronto',
    read: '9 min',
    image: 'zand-arg',
    tint: '#6E8C5A',
    tag: 'PROFILE' },

  { key: 'st5',
    hook: 'She left in 1979 and never went back.',
    title: 'Her daughter went last spring, and called her from the street she grew up on.',
    who: 'Nasrin and Leila',
    where: 'London and Tehran',
    read: '13 min',
    image: 'tehran-1',
    tint: '#8C3A2E',
    tag: 'IN THEIR WORDS' },

  { key: 'st6',
    hook: 'The saffron in your kitchen was picked by hand.',
    title: 'It takes a family a morning to fill a thimble.',
    who: 'The harvest',
    where: 'Khorasan',
    read: '7 min',
    image: 'food-zereshk-polo',
    tint: '#E0A63C',
    tag: 'ESSAY' },

  { key: 'st7',
    hook: 'He has been writing the same four lines for thirty years.',
    title: 'A calligrapher on why it is never finished.',
    who: 'Ostad Rezaei',
    where: 'Isfahan',
    read: '10 min',
    image: 'lit-hafez-cover',
    tint: '#5E7F8C',
    tag: 'INTERVIEW' },

  { key: 'st8',
    hook: 'Nobody taught her Persian.',
    title: 'At thirty four, she started with the alphabet.',
    who: 'Sara Kazemi',
    where: 'Melbourne',
    read: '5 min',
    image: 'silence-cover',
    tint: '#6B5D50',
    tag: 'IN THEIR WORDS' },

  { key: 'st9',
    hook: 'The qanat under his village is three thousand years old.',
    title: 'He is the last man who knows how to repair it.',
    who: 'Amoo Rahim',
    where: 'Yazd',
    read: '12 min',
    image: 'geo-lut',
    tint: '#417270',
    tag: 'PROFILE' },

  { key: 'st10',
    hook: 'His father played the tar. So did his grandfather.',
    title: 'He plays it in a flat in Berlin, with the windows shut.',
    who: 'Kaveh Sharifi',
    where: 'Berlin',
    read: '9 min',
    image: 'lit-rudaki-cover',
    tint: '#8A5A9E',
    tag: 'INTERVIEW' },
];

/* one thing, every day, pulled from everything you have built */

export type DailyKind = 'word' | 'verse' | 'fact' | 'card' | 'dish';

export type Daily = {
  kind: DailyKind;
  fa?: string;
  tr?: string;
  title: string;
  x: string;
  route?: string;   // present = flips and links out
  cta?: string;
};

export const DAILY_POOL: Daily[] = [
  { kind: 'word', fa: 'دلتنگ', tr: 'deltang', title: 'Your heart has gone tight',
    x: 'It is how Persian says I miss you. Not a report of an absence, a symptom happening in your chest right now.',
    route: '/culture/topic?topic=del', cta: 'the whole word map' },
  { kind: 'verse', title: 'Do not grieve',
    x: 'Gham makhor. Hafez wrote it six hundred years ago and Iranians have been saying it to each other ever since. It is not advice. It is a hand on the shoulder.',
    route: '/literature/reader?author=hafez&page=0', cta: 'read Hafez' },
  { kind: 'fact', title: 'The calendar you are not using is better',
    x: 'Khayyam measured the year to six decimal places in 1079 with brass instruments. His calendar drifts a day every five thousand years. The Gregorian drifts one every three thousand.',
    route: '/literature/reader?author=khayyam&page=0', cta: 'how he did it' },
  { kind: 'word', fa: 'تعارف', tr: 'taarof', title: 'Offer it three times',
    x: 'Nothing is real until it has been offered three times. Accept on the first and everyone knows you were waiting for it.',
    route: '/culture/topic?topic=taarof', cta: 'try the simulator' },
  { kind: 'fact', title: 'Paradise was a garden with a wall around it',
    x: 'Pairidaeza just meant an enclosed space. The Greeks borrowed the word, scripture borrowed it, and an ordinary Persian garden became the name for heaven.',
    route: '/language', cta: 'more words you already speak' },
  { kind: 'dish', fa: 'ته دیگ', tr: 'tahdig', title: 'The best thing is an accident',
    x: 'The golden crust at the bottom of the rice pot. Guests get it first. Then the family goes to war over what is left.',
    route: '/culture/topic?topic=sofreh', cta: 'the table' },
  { kind: 'verse', title: 'You are the reed',
    x: 'Rumi opens the Masnavi with a flute crying for the reed bed it was cut from. Twenty six thousand couplets follow, and they are all about that.',
    route: '/literature/reader?author=rumi&page=0', cta: 'read Rumi' },
  { kind: 'fact', title: 'A poem got a king onto a horse without his boots',
    x: 'Rudaki sang about the smell of a stream in Bukhara. The king had refused to go home for four years. He rode out barefoot.',
    route: '/literature/reader?author=rudaki&page=0', cta: 'the whole story' },
  { kind: 'word', fa: 'قربونت برم', tr: 'ghorboonet beram', title: 'May I be sacrificed for you',
    x: 'Said constantly, to almost anyone, meaning roughly thanks. Persian does not do small affection.',
    route: '/language', cta: 'the language' },
  { kind: 'fact', title: 'Iran has been calling itself Iran the whole time',
    x: 'From Aryanam, the noble ones. Persia was the outside name, from Pars, one province. The country never changed what it calls itself.',
    route: '/language', cta: 'where Persian comes from' },
];


// folded in from the old "Did you know" set. Flat cards, no flip.
const DYK: Daily[] = [
  { kind: 'fact', fa: 'انار', title: 'The oldest symbol', x: 'The pomegranate is one of the oldest symbols in Persian art and myth, a sign of abundance, life, and eternity.' },
  { kind: 'fact', fa: 'پردیس', title: 'Paradise was a garden', x: 'The English word paradise traces back to an ancient Persian word for a walled garden.' },
  { kind: 'fact', fa: 'فرش', title: 'The oldest carpet', x: 'The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.' },
  { kind: 'fact', fa: 'بادگیر', title: 'Air conditioning, ancient', x: 'Long before electricity, Persian windcatchers, tall towers called badgir, cooled homes by guiding the breeze downward.' },
  { kind: 'fact', fa: 'قنات', title: 'Water across the desert', x: 'Qanats, gently sloping underground channels, carried water across the desert for thousands of years.' },
  { kind: 'fact', fa: 'زعفران', title: 'Worth more than gold', x: 'Iran grows the vast majority of the world saffron, the crimson spice worth more than its weight in gold.' },
  { kind: 'fact', fa: 'کوروش', title: 'The first declaration', x: 'The Cyrus Cylinder, from the reign of Cyrus the Great, is often described as one of the earliest declarations of tolerance.' },
  { kind: 'fact', fa: 'هخامنشی', title: 'The largest yet seen', x: 'Around 550 BCE, Cyrus founded the Achaemenid Empire, the largest the ancient world had yet seen, reaching from the Aegean to the Indus.' },
  { kind: 'fact', fa: 'تخت‌جمشید', title: 'A record in stone', x: 'Built by Darius around 518 BCE, Persepolis welcomed delegations from across the empire, a record in stone of many nations under one rule.' },
  { kind: 'fact', fa: 'راه‌شاهی', title: 'The first postal system', x: 'The Persian Royal Road was a vast relay of stations and couriers. Messages crossed the empire with remarkable speed, the ancient world first true post.' },
];

const ALL_DAILY: Daily[] = [...DAILY_POOL, ...DYK];

export function dailyFor(d = new Date()) {
  const day = Math.floor(d.getTime() / 86400000);
  return ALL_DAILY[day % ALL_DAILY.length];
}
