// Learn: the study side. Shares the indigo world of the Language reader.

export const ln = {
  bg: '#1E1B26',
  bgLift: '#272232',
  surface: '#2A2634',
  raised: '#332E3F',
  text: '#EFEAF2',
  textDim: '#A79FB4',
  hair: '#3E3849',
  gold: '#4A6B50',
  violet: '#8B7BB8',
  jade: '#3F5D46',
  rose: '#6E8F72',
  amber: '#52785A',
};

// The 32 letters, in order. `known` is mock progress for now.
export type Letter = { id: string; fa: string; name: string; sound: string };

export const ALPHABET: Letter[] = [
  { id: 'alef', fa: 'ا', name: 'alef', sound: 'a' },
  { id: 'be', fa: 'ب', name: 'be', sound: 'b' },
  { id: 'pe', fa: 'پ', name: 'pe', sound: 'p' },
  { id: 'te', fa: 'ت', name: 'te', sound: 't' },
  { id: 'se', fa: 'ث', name: 'se', sound: 's' },
  { id: 'jim', fa: 'ج', name: 'jim', sound: 'j' },
  { id: 'che', fa: 'چ', name: 'che', sound: 'ch' },
  { id: 'he-jimi', fa: 'ح', name: 'he jimi', sound: 'h' },
  { id: 'khe', fa: 'خ', name: 'khe', sound: 'kh' },
  { id: 'dal', fa: 'د', name: 'dal', sound: 'd' },
  { id: 'zal', fa: 'ذ', name: 'zal', sound: 'z' },
  { id: 're', fa: 'ر', name: 're', sound: 'r' },
  { id: 'ze', fa: 'ز', name: 'ze', sound: 'z' },
  { id: 'zhe', fa: 'ژ', name: 'zhe', sound: 'zh' },
  { id: 'sin', fa: 'س', name: 'sin', sound: 's' },
  { id: 'shin', fa: 'ش', name: 'shin', sound: 'sh' },
  { id: 'sad', fa: 'ص', name: 'sad', sound: 's' },
  { id: 'zad', fa: 'ض', name: 'zad', sound: 'z' },
  { id: 'ta', fa: 'ط', name: 'ta', sound: 't' },
  { id: 'za', fa: 'ظ', name: 'za', sound: 'z' },
  { id: 'eyn', fa: 'ع', name: 'eyn', sound: 'a' },
  { id: 'gheyn', fa: 'غ', name: 'gheyn', sound: 'gh' },
  { id: 'fe', fa: 'ف', name: 'fe', sound: 'f' },
  { id: 'ghaf', fa: 'ق', name: 'ghaf', sound: 'gh' },
  { id: 'kaf', fa: 'ک', name: 'kaf', sound: 'k' },
  { id: 'gaf', fa: 'گ', name: 'gaf', sound: 'g' },
  { id: 'lam', fa: 'ل', name: 'lam', sound: 'l' },
  { id: 'mim', fa: 'م', name: 'mim', sound: 'm' },
  { id: 'nun', fa: 'ن', name: 'nun', sound: 'n' },
  { id: 'vav', fa: 'و', name: 'vav', sound: 'v' },
  { id: 'he-docheshm', fa: 'ه', name: 'he do cheshm', sound: 'h' },
  { id: 'ye', fa: 'ی', name: 'ye', sound: 'y' },
];

// mock: how far in you are
export const LEARNED = 18;

export type LearnModule = {
  key: string; title: string; persian: string; x: string;
  icon: string; tint: string; route: string;
  done: number; total: number; unit: string;
};

export type LearnGroup = { key: string; label: string; note: string; modules: LearnModule[] };

export const LEARN_GROUPS: LearnGroup[] = [
  {
    key: 'tools', label: 'TOOLS', labelFa: 'ابزارها', note: 'For when you need it, not for study.', noteFa: 'برای وقتی که لازمت می‌شود، نه برای درس خواندن.',
    modules: [
      { key: 'translate', title: 'Translate', persian: 'برگردان', x: 'Any language into Persian, and back.', xFa: 'هر زبانی به فارسی، و برعکس.',
        icon: 'swap-horizontal-outline', tint: '#3F5D46', route: '/learn/translate', done: 0, total: 0, unit: '' },
      { key: 'phrasebook', title: 'Phrasebook', persian: 'عبارت‌ها', x: 'Fifty things worth being able to say. Tap any line to hear it.', xFa: 'پنجاه چیز که ارزش گفتن دارد. هر سطر را بزن تا بشنوی.',
        icon: 'chatbubbles-outline', tint: '#4A6B50', route: '/learn/phrasebook', done: 0, total: 50, unit: 'phrases' },
    ],
  },
];

// what you were last doing
export const CONTINUE = {
  module: 'Writing',
  detail: 'letter ش, shin',
  fa: 'ش',
  route: '/learn/writing?start=shin',
  x: 'You stopped halfway through the tail.',
};

export const LEARN_STATS = [
  { v: '32', k: 'letters to learn' },
  { v: '1', k: 'day streak' },
  { v: '3', k: 'quizzes done' },
];
