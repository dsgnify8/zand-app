// Phrases worth having ready. Not a course, a reference you dip into.
// Everything carries a transliteration; a beginner cannot read the script yet.

export type Phrase = { fa: string; tr: string; en: string; note?: string };
export type PhraseSet = {
  key: string; title: string; titleFa: string; glyph: string;
  blurb: string; phrases: Phrase[];
};

export const PHRASE_SETS: PhraseSet[] = [
  {
    key: 'greetings',
    title: 'Greetings',
    titleFa: 'سلام و احوالپرسی',
    glyph: 'س',
    blurb: 'Opening and closing a conversation.',
    phrases: [
      { fa: 'سلام', tr: 'salām', en: 'hello' },
      { fa: 'درود', tr: 'dorud', en: 'hello', note: 'the older Persian word, no Arabic in it' },
      { fa: 'صبح بخیر', tr: 'sobh bekheyr', en: 'good morning' },
      { fa: 'شب بخیر', tr: 'shab bekheyr', en: 'good night' },
      { fa: 'خوبی؟', tr: 'khubi?', en: 'are you well?' },
      { fa: 'چطوری؟', tr: 'chetori?', en: 'how are you?', note: 'casual, with friends' },
      { fa: 'خوبم، مرسی', tr: 'khubam, mersi', en: 'I am well, thank you' },
      { fa: 'خداحافظ', tr: 'khodāhāfez', en: 'goodbye' },
      { fa: 'فعلاً', tr: 'fe’lan', en: 'see you', note: 'literally: for now' },
      { fa: 'به امید دیدار', tr: 'be omide didār', en: 'until we meet again', note: 'warmer, a little formal' },
    ],
  },
  {
    key: 'politeness',
    title: 'Politeness',
    titleFa: 'ادب',
    glyph: 'ل',
    blurb: 'The words that soften everything.',
    phrases: [
      { fa: 'لطفاً', tr: 'lotfan', en: 'please' },
      { fa: 'مرسی', tr: 'mersi', en: 'thank you' },
      { fa: 'ممنون', tr: 'mamnun', en: 'thank you', note: 'slightly more formal than mersi' },
      { fa: 'خواهش می‌کنم', tr: 'khāhesh mikonam', en: 'you are welcome' },
      { fa: 'ببخشید', tr: 'bebakhshid', en: 'excuse me, sorry' },
      { fa: 'اشکالی نداره', tr: 'eshkāli nadāre', en: 'no problem' },
      { fa: 'قربان شما', tr: 'ghorbān-e shomā', en: 'you are too kind', note: 'taarof; nobody means it literally' },
      { fa: 'خوشبختم', tr: 'khoshbakhtam', en: 'pleased to meet you' },
    ],
  },
  {
    key: 'table',
    title: 'At the table',
    titleFa: 'سر سفره',
    glyph: 'غ',
    blurb: 'Eating, offering, refusing, accepting.',
    phrases: [
      { fa: 'نوش جان', tr: 'nush-e jān', en: 'enjoy your meal', note: 'literally: may it nourish your soul' },
      { fa: 'دستت درد نکنه', tr: 'dastet dard nakone', en: 'thank you for cooking', note: 'literally: may your hand not hurt' },
      { fa: 'خیلی خوشمزه است', tr: 'kheyli khoshmaze ast', en: 'it is delicious' },
      { fa: 'سیر شدم', tr: 'sir shodam', en: 'I am full' },
      { fa: 'یک کم دیگه', tr: 'yek kam dige', en: 'a little more' },
      { fa: 'نه مرسی، واقعاً', tr: 'na mersi, vāghe’an', en: 'no thank you, really', note: 'you will need this three times before they believe you' },
      { fa: 'آب', tr: 'āb', en: 'water' },
      { fa: 'چای', tr: 'chāy', en: 'tea' },
    ],
  },
  {
    key: 'family',
    title: 'Family',
    titleFa: 'خانواده',
    glyph: 'خ',
    blurb: 'The people you are calling.',
    phrases: [
      { fa: 'مامان', tr: 'māmān', en: 'mum' },
      { fa: 'بابا', tr: 'bābā', en: 'dad' },
      { fa: 'مادربزرگ', tr: 'mādarbozorg', en: 'grandmother', note: 'literally: big mother' },
      { fa: 'پدربزرگ', tr: 'pedarbozorg', en: 'grandfather' },
      { fa: 'خواهر', tr: 'khāhar', en: 'sister' },
      { fa: 'برادر', tr: 'barādar', en: 'brother' },
      { fa: 'عمه', tr: 'amme', en: 'aunt', note: 'father’s sister; Persian names each one differently' },
      { fa: 'خاله', tr: 'khāle', en: 'aunt', note: 'mother’s sister' },
      { fa: 'دلم برات تنگ شده', tr: 'delam barāt tang shode', en: 'I miss you', note: 'literally: my heart has grown tight for you' },
    ],
  },
  {
    key: 'out',
    title: 'Out and about',
    titleFa: 'بیرون',
    glyph: 'ر',
    blurb: 'Asking, buying, getting somewhere.',
    phrases: [
      { fa: 'چقدر است؟', tr: 'cheghadr ast?', en: 'how much is it?' },
      { fa: 'کجاست؟', tr: 'kojāst?', en: 'where is it?' },
      { fa: 'نمی‌فهمم', tr: 'nemifahmam', en: 'I do not understand' },
      { fa: 'دوباره بگو', tr: 'dobāre begu', en: 'say it again' },
      { fa: 'یواش‌تر لطفاً', tr: 'yavāsh-tar lotfan', en: 'slower please' },
      { fa: 'فارسی بلد نیستم', tr: 'fārsi balad nistam', en: 'I do not speak Persian' },
      { fa: 'کمی فارسی بلدم', tr: 'kami fārsi baladam', en: 'I speak a little Persian' },
      { fa: 'انگلیسی بلدید؟', tr: 'engelisi baladid?', en: 'do you speak English?' },
    ],
  },
];

export function phraseSetByKey(k?: string) {
  return PHRASE_SETS.find((p) => p.key === k);
}
