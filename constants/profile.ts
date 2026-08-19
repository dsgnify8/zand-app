// Profile: mock state. Wire to real storage later.

export const pr = {
  ink: '#241C19',
  hair: 'rgba(36,28,25,0.10)',
  dim: '#8A7C72',

  // each section owns a mood
  streakA: '#6E8C5A',
  streakB: '#A8C083',
  readA: '#8C3A2E',
  readB: '#C4705A',
  saveA: '#3E6E78',
  saveB: '#6FA3AC',
  friendA: '#417270',
  friendB: '#8FB5B4',
  friendPaleA: '#C9DEDD',
  friendPaleB: '#A8C6C5',
  goldA: '#B08A46',
  goldB: '#E0C079',
};

export type Me = { name: string; persian: string; since: string; streak: number; longest: number; freezes: number };

export const ME: Me = {
  name: 'Nojan',
  persian: 'نوژان',
  since: 'March 2026',
  streak: 12,
  longest: 21,
  freezes: 2,
};

export type ReadingItem = {
  titleFa?: string;
  subFa?: string;
  chapterFa?: string;
  key: string; title: string; sub: string; image: string;
  chapter: string; page: number; total: number; route: string;
};

export const READING: ReadingItem[] = [
  { key: 'r1', title: 'Hafez', titleFa: 'حافظ', sub: 'The Tongue of the Unseen', subFa: 'لسان‌الغیب', image: 'lit-hafez-cover',
    chapter: 'The Fal', chapterFa: 'فال', page: 7, total: 11, route: '/literature/reader?author=hafez&page=6' },
  { key: 'r2', title: 'Cyrus the Great', titleFa: 'کوروش بزرگ', sub: 'The Shepherd King', subFa: 'شاهِ چوپان', image: 'cyrus-cover',
    chapter: 'The Cylinder', chapterFa: 'استوانه', page: 12, total: 24, route: '/education/reader?topic=cyrus-the-great&page=11' },
  { key: 'r3', title: 'Geography', titleFa: 'جغرافیا', sub: 'The Land', subFa: 'سرزمین', image: 'geo-cover',
    chapter: 'Provinces', chapterFa: 'استان‌ها', page: 4, total: 7, route: '/geography' },
];

export type Discover = { key: string; kicker: string; title: string; x: string; image: string; route: string; tint: string };

export const DISCOVER: Discover[] = [
  { key: 'd1', kicker: 'YOU HAVE NOT OPENED THIS', title: 'Rudaki', x: 'The first poet. A hundred thousand verses written, about a thousand surviving.', image: 'lit-rudaki-cover', route: '/literature/reader?author=rudaki&page=0', tint: '#8C3A2E' },
  { key: 'd2', kicker: 'NEW', title: 'Typical Persian', x: 'Fourteen cards. The joke on the front, the truth underneath.', image: 'zand-vakil-bazaar', route: '/culture/topic?topic=typical', tint: '#3E6E78' },
  { key: 'd3', kicker: 'WORTH YOUR TIME', title: 'Saadi', x: 'The other poet of Shiraz. They lie within sight of one another.', image: 'lit-saadi-cover', route: '/literature/reader?author=saadi&page=0', tint: '#B08A46' },
];

export type SavedItem = { key: string; kind: 'word' | 'topic' | 'verse'; title: string; sub: string; route?: string };

export const SAVED: SavedItem[] = [
  { key: 's1', kind: 'word', title: 'دلتنگ', sub: 'deltang  ·  heart tight' },
  { key: 's2', kind: 'verse', title: 'Do not grieve', sub: 'Hafez  ·  the lost Joseph will return to Canaan' },
  { key: 's3', kind: 'topic', title: 'Two Centuries of Silence', sub: 'History  ·  saved to read' },
  { key: 's4', kind: 'word', title: 'جوانمردی', sub: 'javanmardi  ·  the young man way' },
  { key: 's5', kind: 'verse', title: 'Bani Adam', sub: 'Saadi  ·  the children of Adam are limbs of one body' },
  { key: 's6', kind: 'topic', title: 'The Zurkhaneh', sub: 'Culture  ·  the house of strength' },
];

export type Friend = { key: string; name: string; persian: string; streak: number; last: string };

export const FRIENDS: Friend[] = [
  { key: 'f1', name: 'Hana', persian: 'هانا', streak: 31, last: 'sent you a word' },
  { key: 'f2', name: 'Kian', persian: 'کیان', streak: 4, last: 'your turn' },
  { key: 'f3', name: 'Baba', persian: 'بابا', streak: 88, last: 'sent you a topic' },
];

export type Incoming = {
  key: string; from: string; fromFa: string; kind: 'word' | 'topic' | 'poet' | 'place' | 'article';
  fa?: string; tr?: string; en?: string; title?: string; note: string; when: string; done: boolean;
};

export const INBOX: Incoming[] = [
  { key: 'i0', from: 'Sara', fromFa: 'سارا', kind: 'poet',
    title: 'Hafez', note: 'read one before you sleep, trust me', when: '1h ago', done: false },
  { key: 'i1', from: 'Hana', fromFa: 'هانا', kind: 'word',
    fa: 'دلبر', tr: 'delbar', en: 'heart carrier, the beloved',
    note: 'you will need this one', when: '2h ago', done: false },
  { key: 'i2', from: 'Baba', fromFa: 'بابا', kind: 'topic',
    title: 'Ferdowsi', note: 'read this before you call me next', when: 'yesterday', done: false },
  { key: 'i3', from: 'Kian', fromFa: 'کیان', kind: 'word',
    fa: 'قابل نداره', tr: 'ghabel nadare', en: 'it has no worth',
    note: 'you fell for this in Tehran', when: '3d ago', done: true },
];

export type Stat = { k: string; v: string; sub: string };

export const STATS: Stat[] = [
  { k: 'Topics finished', v: '6', sub: 'of 31 available' },
  { k: 'Pages read', v: '148', sub: 'across all sections' },
  { k: 'Words saved', v: '23', sub: 'in your glossary' },
  { k: 'Longest streak', v: '21', sub: 'days in a row' },
];

export type Done = { key: string; title: string; sub: string; when: string };

export const FINISHED: Done[] = [
  { key: 'c1', title: 'Ferdowsi', sub: 'Literature  ·  5 chapters', when: 'last week' },
  { key: 'c2', title: 'Cyrus the Great', sub: 'History  ·  7 chapters', when: 'last week' },
  { key: 'c3', title: 'Nowruz', sub: 'Traditions  ·  7 chapters', when: '2 weeks ago' },
  { key: 'c4', title: 'The Zand Dynasty', sub: 'History  ·  5 chapters', when: '3 weeks ago' },
  { key: 'c5', title: 'Taarof', sub: 'Culture  ·  3 chapters', when: 'a month ago' },
  { key: 'c6', title: 'Language', sub: 'Education  ·  5 chapters', when: 'a month ago' },
];

// The last 14 days. true = read something that day.
export const DAYS: boolean[] = [true, true, false, true, true, true, true, true, true, true, true, true, true, true];



/* ---- what you can send a friend ---- */

export type SendItem = { fa?: string; title: string; sub: string; route?: string };
export type SendCat = { key: string; label: string; icon: string; tint: string; searchable?: boolean; items: SendItem[] };

// The ten people actually send. Everything else is behind the search.
export const SEND_CATEGORIES: SendCat[] = [
  { key: 'words', label: 'Words', icon: 'language-outline', tint: '#417270', searchable: true, items: [
    { fa: 'دلتنگ', title: 'deltang', sub: 'heart tight  ·  missing someone' },
    { fa: 'تعارف', title: 'taarof', sub: 'the rule nobody explains' },
    { fa: 'ته دیگ', title: 'tahdig', sub: 'the bottom of the pot' },
    { fa: 'جوانمردی', title: 'javanmardi', sub: 'the young man way' },
    { fa: 'دلبر', title: 'delbar', sub: 'heart carrier  ·  the beloved' },
    { fa: 'مرام', title: 'maram', sub: 'the way one goes' },
    { fa: 'قابل نداره', title: 'ghabel nadare', sub: 'it has no worth  ·  the shopkeeper line' },
    { fa: 'دل به دل راه داره', title: 'del be del rah dare', sub: 'heart has a road to heart' },
    { fa: 'نوش جان', title: 'nooshe jan', sub: 'may it feed your soul  ·  said as you eat' },
    { fa: 'قربونت برم', title: 'ghorboonet beram', sub: 'may I be sacrificed for you  ·  said constantly' },
  ] },

  { key: 'poets', label: 'Poets', icon: 'book-outline', tint: '#8C3A2E', items: [
    { title: 'Hafez', sub: 'the fal is inside', route: '/literature/reader?author=hafez&page=0' },
    { title: 'Ferdowsi', sub: 'the one who saved the language', route: '/literature/reader?author=ferdowsi&page=0' },
    { title: 'Rumi', sub: 'the whirling', route: '/literature/reader?author=rumi&page=0' },
    { title: 'Khayyam', sub: 'the calendar', route: '/literature/reader?author=khayyam&page=0' },
    { title: 'Saadi', sub: 'bani adam', route: '/literature/reader?author=saadi&page=0' },
    { title: 'Nizami', sub: 'the seven domes', route: '/literature/reader?author=nizami&page=0' },
    { title: 'Rudaki', sub: 'the first poet', route: '/literature/reader?author=rudaki&page=0' },
  ] },

  { key: 'history', label: 'History', icon: 'time-outline', tint: '#B08A46', items: [
    { title: 'Cyrus the Great', sub: 'the shepherd king', route: '/education/topic?topic=cyrus' },
    { title: 'The Cyrus Cylinder', sub: 'the first of its kind', route: '/education/topic?topic=cyrus' },
    { title: 'The Achaemenids', sub: 'the empire that invented the empire' },
    { title: 'The Sasanians', sub: 'the last one before' },
    { title: 'The Arab Conquest', sub: 'and what came after' },
    { title: 'Two Centuries of Silence', sub: 'when Persian went quiet' },
    { title: 'The Safavids', sub: 'the shape of Iran today', route: '/education/topic?topic=safavid' },
    { title: 'The Zand Dynasty', sub: 'the one who would not wear the crown', route: '/education/topic?topic=zand' },
    { title: 'The Qajars', sub: 'the century of losing', route: '/education/topic?topic=qajar' },
    { title: 'Reza Shah', sub: 'the soldier', route: '/education/topic?topic=reza-shah' },
    { title: 'Mohammad Reza Shah', sub: 'the last one', route: '/education/topic?topic=mrsp' },
    { title: 'Nader Shah', sub: 'the one who took Delhi' },
  ] },

  { key: 'culture', label: 'Culture', icon: 'people-outline', tint: '#3E6E78', items: [
    { title: 'Taarof', sub: 'try the simulator', route: '/culture/topic?topic=taarof' },
    { title: 'The Heart', sub: 'one word, a whole life', route: '/culture/topic?topic=del' },
    { title: 'The Guest', sub: 'you are not leaving', route: '/culture/topic?topic=mehmun' },
    { title: 'The Zurkhaneh', sub: 'the house of strength', route: '/culture/topic?topic=javanmardi' },
    { title: 'Takhti', sub: 'the man they loved', route: '/culture/topic?topic=javanmardi' },
    { title: 'Typical Persian', sub: 'fourteen cards', route: '/culture/topic?topic=typical' },
    { title: 'Tahdig', sub: 'the prize', route: '/culture/topic?topic=sofreh' },
    { title: 'Ghormeh Sabzi', sub: 'the national dish', route: '/culture/topic?topic=sofreh' },
    { title: 'Kale Pache', sub: 'breakfast, and a test', route: '/culture/topic?topic=sofreh' },
    { title: 'Bastani', sub: 'the best ice cream there is', route: '/culture/topic?topic=sofreh' },
    { title: 'Chai', sub: 'the sugar goes in your mouth', route: '/culture/topic?topic=chai' },
    { title: 'Persian Standard Time', sub: 'a real unit of measurement', route: '/culture/topic?topic=typical' },
  ] },

  { key: 'traditions', label: 'Traditions', icon: 'flame-outline', tint: '#6E8C5A', items: [
    { title: 'Nowruz', sub: 'the countdown is live', route: '/traditions' },
    { title: 'The Haft Seen', sub: 'seven things beginning with S', route: '/traditions' },
    { title: 'Chaharshanbe Suri', sub: 'jump the fire', route: '/traditions' },
    { title: 'Sizdah Bedar', sub: 'everyone goes outside', route: '/traditions' },
    { title: 'Shab e Yalda', sub: 'the longest night', route: '/traditions' },
    { title: 'The Fal', sub: 'ask the book a question', route: '/literature/reader?author=hafez&page=6' },
  ] },

  { key: 'places', label: 'Places', icon: 'map-outline', tint: '#5E7F8C', items: [
    { title: 'Tehran', sub: 'the city under the mountain', route: '/geography?jump=g5' },
    { title: 'Isfahan', sub: 'half the world', route: '/geography?jump=g5' },
    { title: 'Shiraz', sub: 'the gardens, and both poets', route: '/geography?jump=g5' },
    { title: 'Mashhad', sub: 'the city people walk to', route: '/geography?jump=g5' },
    { title: 'Tabriz', sub: 'the crossroads in the north', route: '/geography?jump=g5' },
    { title: 'Yazd', sub: 'the desert that would not give in', route: '/geography?jump=g5' },
    { title: 'Bisotun', sub: 'where Farhad cut the mountain', route: '/geography?jump=g6' },
    { title: 'Masuleh', sub: 'the stacked village', route: '/geography?jump=g6' },
    { title: 'Neyshabur', sub: 'turquoise, and Khayyam', route: '/geography?jump=g6' },
    { title: 'Tus', sub: 'where Ferdowsi lies', route: '/geography?jump=g6' },
    { title: 'Bam', sub: 'the mud brick citadel', route: '/geography?jump=g6' },
    { title: 'Damavand', sub: 'the mountain in the myth', route: '/geography?jump=g4b' },
    { title: 'The Caspian', sub: 'the green side of Iran', route: '/geography?jump=g4b' },
    { title: 'Hormuz', sub: 'the narrowest thing that matters', route: '/geography?jump=g3' },
    { title: 'The Lut', sub: 'the hottest ground ever measured', route: '/geography?jump=g4b' },
    { title: 'The 31 Provinces', sub: 'tap any one of them', route: '/geography?jump=g4' },
  ] },
];

// Everything the word search can reach.
export type BankWord = { fa: string; tr: string; en: string; tag: string };

export const WORD_BANK: BankWord[] = [
  { fa: 'دلتنگ', tr: 'deltang', en: 'heart tight, missing someone', tag: 'heart' },
  { fa: 'دلبر', tr: 'delbar', en: 'heart carrier, the beloved', tag: 'heart' },
  { fa: 'دلدار', tr: 'deldar', en: 'the one who holds your heart', tag: 'heart' },
  { fa: 'دلسوز', tr: 'delsuz', en: 'heart burning, compassionate', tag: 'heart' },
  { fa: 'دلگیر', tr: 'delgir', en: 'heart caught, melancholy', tag: 'heart' },
  { fa: 'دل‌خور', tr: 'delkhor', en: 'heart eaten, quietly hurt', tag: 'heart' },
  { fa: 'دلیر', tr: 'delir', en: 'heart strong, brave', tag: 'heart' },
  { fa: 'دل‌شکسته', tr: 'delshekaste', en: 'heart broken', tag: 'heart' },
  { fa: 'تعارف', tr: 'taarof', en: 'the ritual of not saying the thing', tag: 'culture' },
  { fa: 'قابل نداره', tr: 'ghabel nadare', en: 'it has no worth, take it', tag: 'culture' },
  { fa: 'مرام', tr: 'maram', en: 'the way one goes, decency', tag: 'culture' },
  { fa: 'جوانمردی', tr: 'javanmardi', en: 'the young man way, chivalry', tag: 'culture' },
  { fa: 'پهلوان', tr: 'pahlavan', en: 'champion, in the old sense', tag: 'culture' },
  { fa: 'زورخانه', tr: 'zurkhaneh', en: 'the house of strength', tag: 'culture' },
  { fa: 'غیرت', tr: 'gheirat', en: 'fierce protectiveness', tag: 'culture' },
  { fa: 'آبرو', tr: 'aberu', en: 'the water of the face, standing', tag: 'culture' },
  { fa: 'مهمان', tr: 'mehman', en: 'guest', tag: 'home' },
  { fa: 'سفره', tr: 'sofreh', en: 'the spread, the laid table', tag: 'home' },
  { fa: 'ته دیگ', tr: 'tahdig', en: 'the bottom of the pot, the crust', tag: 'food' },
  { fa: 'قرمه سبزی', tr: 'ghormeh sabzi', en: 'the national dish', tag: 'food' },
  { fa: 'فسنجان', tr: 'fesenjan', en: 'walnut and pomegranate stew', tag: 'food' },
  { fa: 'زعفران', tr: 'zaferan', en: 'saffron', tag: 'food' },
  { fa: 'آجیل', tr: 'ajil', en: 'the nut mix', tag: 'food' },
  { fa: 'بستنی', tr: 'bastani', en: 'ice cream, with saffron in it', tag: 'food' },
  { fa: 'لواشک', tr: 'lavashak', en: 'sour fruit leather', tag: 'food' },
  { fa: 'چای', tr: 'chai', en: 'tea', tag: 'food' },
  { fa: 'قند', tr: 'ghand', en: 'the sugar cube you hold in your teeth', tag: 'food' },
  { fa: 'نوش جان', tr: 'nooshe jan', en: 'may it feed your soul', tag: 'said' },
  { fa: 'قربونت برم', tr: 'ghorboonet beram', en: 'may I be sacrificed for you', tag: 'said' },
  { fa: 'خسته نباشی', tr: 'khaste nabashi', en: 'may you not be tired, said after work', tag: 'said' },
  { fa: 'دستت درد نکنه', tr: 'dastet dard nakone', en: 'may your hand not hurt, thank you', tag: 'said' },
  { fa: 'به سلامتی', tr: 'be salamati', en: 'to health, the toast', tag: 'said' },
  { fa: 'انشالله', tr: 'ensha allah', en: 'if it is willed, and also maybe never', tag: 'said' },
  { fa: 'چشم', tr: 'cheshm', en: 'eye, meaning yes, at once', tag: 'said' },
  { fa: 'جانم', tr: 'janam', en: 'my soul, meaning yes?', tag: 'said' },
  { fa: 'عزیزم', tr: 'azizam', en: 'my dear', tag: 'said' },
  { fa: 'پدر', tr: 'pedar', en: 'father, and yes it is father', tag: 'family' },
  { fa: 'مادر', tr: 'madar', en: 'mother', tag: 'family' },
  { fa: 'برادر', tr: 'baradar', en: 'brother', tag: 'family' },
  { fa: 'خاله', tr: 'khaleh', en: 'aunt, or any woman your mother age', tag: 'family' },
  { fa: 'عمو', tr: 'amoo', en: 'uncle, or any man your father age', tag: 'family' },
  { fa: 'داداش', tr: 'dadash', en: 'brother, in the street sense', tag: 'family' },
  { fa: 'نوروز', tr: 'nowruz', en: 'the new day', tag: 'time' },
  { fa: 'یلدا', tr: 'yalda', en: 'birth, the longest night', tag: 'time' },
  { fa: 'سبزه', tr: 'sabzeh', en: 'the sprouts you grow for the year', tag: 'time' },
  { fa: 'سمنو', tr: 'samanu', en: 'wheat pudding with no sugar in it', tag: 'time' },
  { fa: 'انار', tr: 'anar', en: 'pomegranate', tag: 'time' },
  { fa: 'فال', tr: 'fal', en: 'the omen, what you ask the book', tag: 'time' },
  { fa: 'ایران', tr: 'iran', en: 'land of the noble', tag: 'place' },
  { fa: 'وطن', tr: 'vatan', en: 'homeland', tag: 'place' },
  { fa: 'شهر', tr: 'shahr', en: 'city', tag: 'place' },
  { fa: 'کوه', tr: 'kuh', en: 'mountain', tag: 'place' },
  { fa: 'آب', tr: 'ab', en: 'water', tag: 'place' },
  { fa: 'آتش', tr: 'atash', en: 'fire', tag: 'place' },
  { fa: 'باغ', tr: 'bagh', en: 'garden', tag: 'place' },
  { fa: 'بهشت', tr: 'behesht', en: 'paradise, which was a walled garden', tag: 'place' },
];

export type RecentItem = { key: string; title: string; sub: string; when: string; fa?: string };

export const RECENT: RecentItem[] = [
  { key: 'rc1', title: 'The Fal', sub: 'Hafez  ·  you asked it three times', when: 'today' },
  { key: 'rc2', title: 'دلتنگ', fa: 'دلتنگ', sub: 'you saved this word', when: 'today' },
  { key: 'rc3', title: 'Typical Persian', sub: 'Culture  ·  you turned every card', when: 'yesterday' },
  { key: 'rc4', title: 'The Seven Domes', sub: 'Nizami  ·  finished', when: '2 days ago' },
  { key: 'rc5', title: 'Tahdig', sub: 'Culture  ·  you lifted the lid', when: '3 days ago' },
];
