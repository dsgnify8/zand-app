// Beginner Persian flashcards — native Persian (Parsi) first, no Arabic/religious terms where a native word exists.

export type Flashcard = { fa: string; translit: string; en: string; symbol?: string; note?: string };

export type Deck = {
  key: string;
  title: string;
  persian: string;
  description: string;
  cards: Flashcard[];
};

export const DECKS: Deck[] = [
  {
    key: 'greetings',
    title: 'Greetings & Politeness',
    persian: 'درودها',
    description: 'The first words you will actually use.',
    cards: [
      { fa: 'درود', translit: 'dorud', en: 'Hello' },
      { fa: 'بدرود', translit: 'bedrud', en: 'Goodbye (formal)' },
      { fa: 'خداحافظ', translit: 'khodâhâfez', en: 'Goodbye (informal)' },
      { fa: 'بله', translit: 'bale', en: 'Yes (formal)' },
      { fa: 'آره', translit: 'âre', en: 'Yes (informal)' },
      { fa: 'نه', translit: 'na', en: 'No' },
      { fa: 'سپاس', translit: 'sepâs', en: 'Thank you (formal)' },
      { fa: 'ممنون', translit: 'mamnun', en: 'Thank you (common)' },
      { fa: 'مرسی', translit: 'merci', en: 'Thanks (casual)' },
      { fa: 'خواهش می‌کنم', translit: 'khâhesh mikonam', en: "You're welcome" },
      { fa: 'بفرمایید', translit: 'befarmâyid', en: 'Please / here you are' },
      { fa: 'ببخشید', translit: 'bebakhshid', en: 'Excuse me / Sorry' },
      { fa: 'بامداد خوش', translit: 'bâmdâd khosh', en: 'Good morning' },
      { fa: 'شب خوش', translit: 'shab khosh', en: 'Good night' },
    ],
  },
  {
    key: 'numbers',
    title: 'Numbers 1–10',
    persian: 'شماره‌ها',
    description: 'Count from one to ten, with Persian numerals.',
    cards: [
      { fa: 'یک', translit: 'yek', en: 'One', symbol: '۱' },
      { fa: 'دو', translit: 'do', en: 'Two', symbol: '۲' },
      { fa: 'سه', translit: 'se', en: 'Three', symbol: '۳' },
      { fa: 'چهار', translit: 'chahâr', en: 'Four', symbol: '۴' },
      { fa: 'پنج', translit: 'panj', en: 'Five', symbol: '۵' },
      { fa: 'شش', translit: 'shesh', en: 'Six', symbol: '۶' },
      { fa: 'هفت', translit: 'haft', en: 'Seven', symbol: '۷' },
      { fa: 'هشت', translit: 'hasht', en: 'Eight', symbol: '۸' },
      { fa: 'نه', translit: 'noh', en: 'Nine', symbol: '۹' },
      { fa: 'ده', translit: 'dah', en: 'Ten', symbol: '۱۰' },
    ],
  },
  {
    key: 'family',
    title: 'Family & People',
    persian: 'خانواده',
    description: 'The people closest to you.',
    cards: [
      { fa: 'من', translit: 'man', en: 'I / me' },
      { fa: 'تو', translit: 'to', en: 'You (informal)' },
      { fa: 'شما', translit: 'shomâ', en: 'You (formal / plural)' },
      { fa: 'مادر', translit: 'mâdar', en: 'Mother' },
      { fa: 'پدر', translit: 'pedar', en: 'Father' },
      { fa: 'خواهر', translit: 'khâhar', en: 'Sister' },
      { fa: 'برادر', translit: 'barâdar', en: 'Brother' },
      { fa: 'دوست', translit: 'dust', en: 'Friend' },
      { fa: 'زن', translit: 'zan', en: 'Woman / wife' },
      { fa: 'مرد', translit: 'mard', en: 'Man' },
    ],
  },
  {
    key: 'food',
    title: 'Food & Drink',
    persian: 'خوراک',
    description: 'At the table and the market.',
    cards: [
      { fa: 'آب', translit: 'âb', en: 'Water' },
      { fa: 'نان', translit: 'nân', en: 'Bread' },
      { fa: 'چای', translit: 'châi', en: 'Tea' },
      { fa: 'دوغ', translit: 'dugh', en: 'Dugh (yogurt drink)' },
      { fa: 'برنج', translit: 'berenj', en: 'Rice' },
      { fa: 'گوشت', translit: 'gusht', en: 'Meat' },
      { fa: 'میوه', translit: 'mive', en: 'Fruit' },
      { fa: 'سیب', translit: 'sib', en: 'Apple' },
      { fa: 'شیر', translit: 'shir', en: 'Milk' },
      { fa: 'خوراک', translit: 'khorâk', en: 'Food' },
    ],
  },
  {
    key: 'everyday',
    title: 'Everyday Words',
    persian: 'واژه‌های روزمره',
    description: 'Words you will meet every day.',
    cards: [
      { fa: 'خانه', translit: 'khâne', en: 'Home / house' },
      { fa: 'شهر', translit: 'shahr', en: 'City' },
      { fa: 'خودرو', translit: 'khodro', en: 'Car' },
      { fa: 'روز', translit: 'ruz', en: 'Day' },
      { fa: 'شب', translit: 'shab', en: 'Night' },
      { fa: 'امروز', translit: 'emruz', en: 'Today' },
      { fa: 'فردا', translit: 'fardâ', en: 'Tomorrow' },
      { fa: 'خوب', translit: 'khub', en: 'Good' },
      { fa: 'بزرگ', translit: 'bozorg', en: 'Big' },
      { fa: 'کوچک', translit: 'kuchak', en: 'Small' },
    ],
  },
  {
    key: 'compliments',
    title: 'Compliments',
    persian: 'ستایش',
    description: 'Kind words to brighten a day.',
    cards: [
      { fa: 'تو زیبا هستی', translit: 'to zibâ hasti', en: 'You are beautiful' },
      { fa: 'تو مهربان هستی', translit: 'to mehrabân hasti', en: 'You are kind' },
      { fa: 'آفرین', translit: 'âfarin', en: 'Well done / Bravo' },
      { fa: 'تو باهوش هستی', translit: 'to bâhush hasti', en: 'You are clever' },
      { fa: 'تو توانا هستی', translit: 'to tavânâ hasti', en: 'You are capable' },
      { fa: 'تو دلیر هستی', translit: 'to dalir hasti', en: 'You are brave' },
      { fa: 'کارت خوب بود', translit: 'kârat khub bud', en: 'Your work was good' },
      { fa: 'چه زیبا', translit: 'che zibâ', en: 'How lovely' },
      { fa: 'تو باهنر هستی', translit: 'to bâhonar hasti', en: 'You are talented' },
      { fa: 'دوست خوبی هستی', translit: 'dust-e khubi hasti', en: 'You are a good friend' },
    ],
  },
  {
    key: 'phrases',
    title: 'Useful Phrases',
    persian: 'گفته‌ها',
    description: 'Short sentences to get by.',
    cards: [
      { fa: 'چطور هستید؟', translit: 'chetor hastid?', en: 'How are you?' },
      { fa: 'خوبم', translit: 'khubam', en: "I'm good" },
      { fa: 'نام شما چیست؟', translit: 'nâm-e shomâ chist?', en: "What's your name?" },
      { fa: 'نام من ... است', translit: 'nâm-e man ... ast', en: 'My name is ...' },
      { fa: 'نمی‌دانم', translit: 'nemidânam', en: "I don't know" },
      { fa: 'کمک!', translit: 'komak!', en: 'Help!' },
      { fa: 'این چند است؟', translit: 'in chand ast?', en: 'How much is this?' },
      { fa: 'کجاست؟', translit: 'kojâst?', en: 'Where is it?' },
      { fa: 'بسیار سپاس', translit: 'besyâr sepâs', en: 'Many thanks' },
      { fa: 'دوستت دارم', translit: 'dustet dâram', en: 'I like you' },
    ],
  },
];

export function findDeck(key?: string) {
  return DECKS.find((d) => d.key === key);
}
