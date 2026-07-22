// Fill-in-the-blank exercises, grouped by category — native Persian.

export type BlankQuestion = {
  before: string;
  after: string;
  answer: string;
  options: string[];
  translit: string;
  en: string;
};

export type BlankCategory = {
  key: string;
  title: string;
  persian: string;
  icon: string;
  questions: BlankQuestion[];
};

export const BLANK_CATEGORIES: BlankCategory[] = [
  {
    key: 'everyday',
    title: 'Everyday',
    persian: 'روزمره',
    icon: 'sunny-outline',
    questions: [
      { before: 'من ', after: ' می‌نوشم', answer: 'آب', options: ['آب', 'نان', 'شب', 'پنج'], translit: 'man âb minusham', en: 'I drink water.' },
      { before: 'من ', after: ' می‌خورم', answer: 'نان', options: ['نان', 'آب', 'شهر', 'خوب'], translit: 'man nân mikhoram', en: 'I eat bread.' },
      { before: 'این ', after: ' بزرگ است', answer: 'خانه', options: ['خانه', 'درود', 'پنج', 'سپاس'], translit: 'in khâne bozorg ast', en: 'This house is big.' },
      { before: 'من چای ', after: '', answer: 'می‌نوشم', options: ['می‌نوشم', 'می‌خورم', 'می‌روم', 'هستم'], translit: 'man châi minusham', en: 'I drink tea.' },
      { before: 'من ', after: ' می‌خورم', answer: 'سیب', options: ['سیب', 'شب', 'سه', 'درود'], translit: 'man sib mikhoram', en: 'I eat an apple.' },
      { before: 'من ', after: ' می‌خورم', answer: 'برنج', options: ['برنج', 'شیر', 'خانه', 'نه'], translit: 'man berenj mikhoram', en: 'I eat rice.' },
      { before: 'او ', after: ' می‌نوشد', answer: 'شیر', options: ['شیر', 'آب', 'نان', 'شهر'], translit: 'u shir minushad', en: 'He drinks milk.' },
      { before: 'این ', after: ' خوب است', answer: 'خوراک', options: ['خوراک', 'خودرو', 'روز', 'زن'], translit: 'in khorâk khub ast', en: 'This food is good.' },
      { before: 'من ', after: ' دارم', answer: 'خودرو', options: ['خودرو', 'میوه', 'شب', 'سه'], translit: 'man khodro dâram', en: 'I have a car.' },
      { before: '', after: ' خوب است', answer: 'امروز', options: ['امروز', 'فردا', 'نان', 'مرد'], translit: 'emruz khub ast', en: 'Today is good.' },
      { before: 'این ', after: ' بزرگ است', answer: 'شهر', options: ['شهر', 'خانه', 'سیب', 'دو'], translit: 'in shahr bozorg ast', en: 'This city is big.' },
      { before: 'آن خانه ', after: ' است', answer: 'کوچک', options: ['کوچک', 'بزرگ', 'مهربان', 'سه'], translit: 'ân khâne kuchak ast', en: 'That house is small.' },
      { before: 'من ', after: ' می‌خورم', answer: 'میوه', options: ['میوه', 'گوشت', 'آب', 'شب'], translit: 'man mive mikhoram', en: 'I eat fruit.' },
      { before: 'او ', after: ' می‌خورد', answer: 'گوشت', options: ['گوشت', 'میوه', 'چای', 'نان'], translit: 'u gusht mikhorad', en: 'He eats meat.' },
    ],
  },
  {
    key: 'greetings',
    title: 'Greetings',
    persian: 'درودها',
    icon: 'hand-left-outline',
    questions: [
      { before: '', after: '، چطور هستید؟', answer: 'درود', options: ['درود', 'سپاس', 'نان', 'نه'], translit: 'dorud, chetor hastid?', en: 'Hello, how are you?' },
      { before: 'بسیار ', after: '', answer: 'سپاس', options: ['سپاس', 'درود', 'آب', 'خانه'], translit: 'besyâr sepâs', en: 'Many thanks.' },
      { before: 'شب ', after: '', answer: 'خوش', options: ['خوش', 'بزرگ', 'زن', 'سه'], translit: 'shab khosh', en: 'Good night.' },
      { before: 'بامداد ', after: '', answer: 'خوش', options: ['خوش', 'بزرگ', 'نان', 'دو'], translit: 'bâmdâd khosh', en: 'Good morning.' },
      { before: '', after: '! دوست من', answer: 'بدرود', options: ['بدرود', 'درود', 'سپاس', 'نه'], translit: 'bedrud! dust-e man', en: 'Goodbye, my friend!' },
      { before: '', after: '، من خوبم', answer: 'بله', options: ['بله', 'نه', 'سپاس', 'شب'], translit: 'bale, man khubam', en: "Yes, I'm good." },
      { before: '', after: '، سپاس', answer: 'نه', options: ['نه', 'بله', 'درود', 'نان'], translit: 'na, sepâs', en: 'No, thank you.' },
      { before: 'سپاس، شما ', after: ' هستید', answer: 'مهربان', options: ['مهربان', 'بزرگ', 'کوچک', 'سه'], translit: 'sepâs, shomâ mehrabân hastid', en: 'Thank you, you are kind.' },
      { before: '', after: '، دوست من', answer: 'خداحافظ', options: ['خداحافظ', 'درود', 'سپاس', 'آب'], translit: 'khodâhâfez, dust-e man', en: 'Goodbye, my friend.' },
      { before: '', after: ' از شما', answer: 'ممنون', options: ['ممنون', 'نان', 'شب', 'سه'], translit: 'mamnun az shomâ', en: 'Thanks to you.' },
      { before: '', after: '!', answer: 'مرسی', options: ['مرسی', 'درود', 'زن', 'دو'], translit: 'merci!', en: 'Thanks!' },
      { before: 'من ', after: '', answer: 'خوبم', options: ['خوبم', 'هستم', 'می‌روم', 'دارم'], translit: 'man khubam', en: "I'm good." },
      { before: '', after: ' بر تو', answer: 'درود', options: ['درود', 'بدرود', 'سپاس', 'نه'], translit: 'dorud bar to', en: 'Greetings to you.' },
    ],
  },
  {
    key: 'people',
    title: 'People',
    persian: 'مردم',
    icon: 'people-outline',
    questions: [
      { before: '', after: ' من مهربان است', answer: 'مادر', options: ['مادر', 'خانه', 'سه', 'خودرو'], translit: 'mâdar-e man mehrabân ast', en: 'My mother is kind.' },
      { before: 'او ', after: ' کتاب دارد', answer: 'سه', options: ['سه', 'شیر', 'زن', 'درود'], translit: 'u se ketâb dârad', en: 'He has three books.' },
      { before: 'تو ', after: ' هستی', answer: 'مهربان', options: ['مهربان', 'نان', 'دو', 'شهر'], translit: 'to mehrabân hasti', en: 'You are kind.' },
      { before: '', after: ' من مهربان است', answer: 'پدر', options: ['پدر', 'شب', 'آب', 'پنج'], translit: 'pedar-e man mehrabân ast', en: 'My father is kind.' },
      { before: '', after: ' من بزرگ است', answer: 'برادر', options: ['برادر', 'میوه', 'شهر', 'سه'], translit: 'barâdar-e man bozorg ast', en: 'My brother is older.' },
      { before: '', after: ' من کوچک است', answer: 'خواهر', options: ['خواهر', 'خانه', 'آب', 'دو'], translit: 'khâhar-e man kuchak ast', en: 'My sister is younger.' },
      { before: '', after: ' من خوب است', answer: 'دوست', options: ['دوست', 'شب', 'نان', 'سه'], translit: 'dust-e man khub ast', en: 'My friend is good.' },
      { before: 'پدر یک ', after: ' است', answer: 'مرد', options: ['مرد', 'زن', 'نان', 'سه'], translit: 'pedar yek mard ast', en: 'A father is a man.' },
      { before: 'مادر یک ', after: ' است', answer: 'زن', options: ['زن', 'مرد', 'شب', 'دو'], translit: 'mâdar yek zan ast', en: 'A mother is a woman.' },
      { before: 'من ', after: ' برادر دارم', answer: 'دو', options: ['دو', 'سه', 'پنج', 'ده'], translit: 'man do barâdar dâram', en: 'I have two brothers.' },
      { before: '', after: ' من زیبا است', answer: 'مادر', options: ['مادر', 'خودرو', 'شب', 'نان'], translit: 'mâdar-e man zibâ ast', en: 'My mother is beautiful.' },
      { before: 'من یک ', after: ' دارم', answer: 'دوست', options: ['دوست', 'شهر', 'آب', 'سه'], translit: 'man yek dust dâram', en: 'I have a friend.' },
      { before: 'شما ', after: ' هستید', answer: 'مهربان', options: ['مهربان', 'بزرگ', 'کوچک', 'پنج'], translit: 'shomâ mehrabân hastid', en: 'You are kind.' },
    ],
  },
];

export function findCategory(key?: string) {
  return BLANK_CATEGORIES.find((c) => c.key === key);
}
