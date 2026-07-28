// Short Persian texts, graded, with every word glossed.
//
// The point is connected prose rather than isolated sentences: a learner
// who knows two hundred words still cannot read a paragraph until they
// have read paragraphs. Tap any word to see what it is doing.

export type Gloss = { fa: string; tr: string; en: string };

export type Reading = {
  key: string;
  title: string;
  titleFa: string;
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  minutes: number;
  blurb: string;
  // the text, split into lines; each line is an array of words
  lines: string[][];
  gloss: Record<string, Gloss>;
  translation: string[];
  note?: string;
};

export const READINGS: Reading[] = [
  {
    key: 'about-me',
    title: 'Telling someone about yourself',
    titleFa: 'دربارهٔ من',
    level: 'beginner',
    minutes: 3,
    blurb: 'Six short lines using only what you already know.',
    lines: [
      ['سلام،', 'اسم', 'من', 'سارا', 'است.'],
      ['من', 'ایرانی', 'هستم.'],
      ['یک', 'خواهر', 'و', 'دو', 'برادر', 'دارم.'],
      ['مادر', 'من', 'معلم', 'است.'],
      ['من', 'چای', 'خیلی', 'دوست', 'دارم.'],
      ['خوشبختم.'],
    ],
    gloss: {
      'سلام،': { fa: 'سلام', tr: 'salām', en: 'hello' },
      'اسم': { fa: 'اسم', tr: 'esm', en: 'name' },
      'من': { fa: 'من', tr: 'man', en: 'I, my' },
      'سارا': { fa: 'سارا', tr: 'Sārā', en: 'Sara, a name' },
      'است.': { fa: 'است', tr: 'ast', en: 'is' },
      'ایرانی': { fa: 'ایرانی', tr: 'īrāni', en: 'Iranian' },
      'هستم.': { fa: 'هستم', tr: 'hastam', en: 'I am' },
      'یک': { fa: 'یک', tr: 'yek', en: 'one' },
      'خواهر': { fa: 'خواهر', tr: 'khāhar', en: 'sister' },
      'و': { fa: 'و', tr: 'va', en: 'and' },
      'دو': { fa: 'دو', tr: 'do', en: 'two' },
      'برادر': { fa: 'برادر', tr: 'barādar', en: 'brother' },
      'دارم.': { fa: 'دارم', tr: 'dāram', en: 'I have' },
      'مادر': { fa: 'مادر', tr: 'mādar', en: 'mother' },
      'معلم': { fa: 'معلم', tr: 'moallem', en: 'teacher' },
      'چای': { fa: 'چای', tr: 'chāy', en: 'tea' },
      'خیلی': { fa: 'خیلی', tr: 'kheyli', en: 'very, a lot' },
      'دوست': { fa: 'دوست', tr: 'dust', en: 'friend; with dāram, to like' },
      'خوشبختم.': { fa: 'خوشبختم', tr: 'khoshbakhtam', en: 'pleased to meet you' },
    },
    translation: [
      'Hello, my name is Sara.',
      'I am Iranian.',
      'I have one sister and two brothers.',
      'My mother is a teacher.',
      'I like tea very much.',
      'Pleased to meet you.',
    ],
    note: 'dust dāram is literally I have friendship, and it is how Persian says both I like and I love. Context tells you which, and the ambiguity is doing real work: there is no hard line between the two.',
  },
  {
    key: 'the-guest',
    title: 'The guest',
    titleFa: 'مهمان',
    level: 'elementary',
    minutes: 4,
    blurb: 'What happens when someone knocks on an Iranian door.',
    lines: [
      ['مهمان', 'آمد.'],
      ['مادر', 'گفت:', 'قدمت', 'روی', 'چشم.'],
      ['چای', 'داغ', 'و', 'شیرینی', 'آورد.'],
      ['مهمان', 'گفت:', 'زحمت', 'نکشید.'],
      ['ولی', 'مادر', 'گوش', 'نکرد.'],
      ['در', 'ایران،', 'مهمان', 'همیشه', 'عزیز', 'است.'],
    ],
    gloss: {
      'مهمان': { fa: 'مهمان', tr: 'mehmān', en: 'guest' },
      'آمد.': { fa: 'آمد', tr: 'āmad', en: 'came' },
      'مادر': { fa: 'مادر', tr: 'mādar', en: 'mother' },
      'گفت:': { fa: 'گفت', tr: 'goft', en: 'said' },
      'قدمت': { fa: 'قدمت', tr: 'ghadamet', en: 'your step' },
      'روی': { fa: 'روی', tr: 'ru-ye', en: 'upon' },
      'چشم.': { fa: 'چشم', tr: 'cheshm', en: 'eye' },
      'چای': { fa: 'چای', tr: 'chāy', en: 'tea' },
      'داغ': { fa: 'داغ', tr: 'dāgh', en: 'hot' },
      'و': { fa: 'و', tr: 'va', en: 'and' },
      'شیرینی': { fa: 'شیرینی', tr: 'shirini', en: 'sweets, pastry' },
      'آورد.': { fa: 'آورد', tr: 'āvard', en: 'brought' },
      'زحمت': { fa: 'زحمت', tr: 'zahmat', en: 'trouble, effort' },
      'نکشید.': { fa: 'نکشید', tr: 'nakeshid', en: 'do not pull; with zahmat, do not go to trouble' },
      'ولی': { fa: 'ولی', tr: 'vali', en: 'but' },
      'گوش': { fa: 'گوش', tr: 'gush', en: 'ear' },
      'نکرد.': { fa: 'نکرد', tr: 'nakard', en: 'did not do; with gush, did not listen' },
      'در': { fa: 'در', tr: 'dar', en: 'in' },
      'ایران،': { fa: 'ایران', tr: 'Irān', en: 'Iran' },
      'همیشه': { fa: 'همیشه', tr: 'hamishe', en: 'always' },
      'عزیز': { fa: 'عزیز', tr: 'aziz', en: 'dear, precious' },
      'است.': { fa: 'است', tr: 'ast', en: 'is' },
    },
    translation: [
      'The guest arrived.',
      'Mother said: your step upon my eyes.',
      'She brought hot tea and sweets.',
      'The guest said: do not go to any trouble.',
      'But mother did not listen.',
      'In Iran, a guest is always precious.',
    ],
    note: 'The whole exchange is taarof. The guest must refuse the trouble, the host must ignore the refusal, and both know their lines. gush nakard, did not listen, is affectionate here rather than rude: refusing to be let off the effort is the point.',
  },
  {
    key: 'nowruz-text',
    title: 'The table of seven',
    titleFa: 'هفت‌سین',
    level: 'intermediate',
    minutes: 5,
    blurb: 'Nowruz, and what sits on the table.',
    lines: [
      ['نوروز', 'اول', 'بهار', 'است.'],
      ['سال', 'نو', 'وقتی', 'شروع', 'می‌شود', 'که', 'زمستان', 'تمام', 'می‌شود.'],
      ['روی', 'سفره', 'هفت', 'چیز', 'می‌گذارند', 'که', 'با', 'حرف', 'سین', 'شروع', 'می‌شوند.'],
      ['سبزه', 'برای', 'زندگی،', 'سیب', 'برای', 'زیبایی،', 'سکه', 'برای', 'ثروت.'],
      ['خانواده', 'دور', 'هم', 'جمع', 'می‌شوند', 'و', 'منتظر', 'می‌مانند.'],
      ['وقتی', 'سال', 'تحویل', 'می‌شود،', 'همه', 'همدیگر', 'را', 'می‌بوسند.'],
    ],
    gloss: {
      'نوروز': { fa: 'نوروز', tr: 'Nowruz', en: 'Nowruz, literally new day' },
      'اول': { fa: 'اول', tr: 'avval', en: 'first, beginning' },
      'بهار': { fa: 'بهار', tr: 'bahār', en: 'spring' },
      'است.': { fa: 'است', tr: 'ast', en: 'is' },
      'سال': { fa: 'سال', tr: 'sāl', en: 'year' },
      'نو': { fa: 'نو', tr: 'now', en: 'new' },
      'وقتی': { fa: 'وقتی', tr: 'vaghti', en: 'when' },
      'شروع': { fa: 'شروع', tr: 'shoru', en: 'start' },
      'می‌شود': { fa: 'می‌شود', tr: 'mishavad', en: 'becomes, happens' },
      'که': { fa: 'که', tr: 'ke', en: 'that, which' },
      'زمستان': { fa: 'زمستان', tr: 'zemestān', en: 'winter' },
      'تمام': { fa: 'تمام', tr: 'tamām', en: 'finished' },
      'می‌شود.': { fa: 'می‌شود', tr: 'mishavad', en: 'becomes' },
      'روی': { fa: 'روی', tr: 'ru-ye', en: 'upon' },
      'سفره': { fa: 'سفره', tr: 'sofre', en: 'the cloth a meal is laid on' },
      'هفت': { fa: 'هفت', tr: 'haft', en: 'seven' },
      'چیز': { fa: 'چیز', tr: 'chiz', en: 'thing' },
      'می‌گذارند': { fa: 'می‌گذارند', tr: 'migozārand', en: 'they place' },
      'با': { fa: 'با', tr: 'bā', en: 'with' },
      'حرف': { fa: 'حرف', tr: 'harf', en: 'letter' },
      'سین': { fa: 'سین', tr: 'sin', en: 'the letter s' },
      'می‌شوند.': { fa: 'می‌شوند', tr: 'mishavand', en: 'they become' },
      'سبزه': { fa: 'سبزه', tr: 'sabze', en: 'sprouted wheat' },
      'برای': { fa: 'برای', tr: 'barāye', en: 'for' },
      'زندگی،': { fa: 'زندگی', tr: 'zendegi', en: 'life' },
      'سیب': { fa: 'سیب', tr: 'sib', en: 'apple' },
      'زیبایی،': { fa: 'زیبایی', tr: 'zibāyi', en: 'beauty' },
      'سکه': { fa: 'سکه', tr: 'sekke', en: 'coin' },
      'ثروت.': { fa: 'ثروت', tr: 'servat', en: 'wealth' },
      'خانواده': { fa: 'خانواده', tr: 'khānevāde', en: 'family' },
      'دور': { fa: 'دور', tr: 'dowr', en: 'around' },
      'هم': { fa: 'هم', tr: 'ham', en: 'together, also' },
      'جمع': { fa: 'جمع', tr: 'jam', en: 'gathered' },
      'می‌شوند': { fa: 'می‌شوند', tr: 'mishavand', en: 'they become' },
      'و': { fa: 'و', tr: 'va', en: 'and' },
      'منتظر': { fa: 'منتظر', tr: 'montazer', en: 'waiting' },
      'می‌مانند.': { fa: 'می‌مانند', tr: 'mimānand', en: 'they remain' },
      'تحویل': { fa: 'تحویل', tr: 'tahvil', en: 'handover, turning' },
      'می‌شود،': { fa: 'می‌شود', tr: 'mishavad', en: 'becomes' },
      'همه': { fa: 'همه', tr: 'hame', en: 'everyone' },
      'همدیگر': { fa: 'همدیگر', tr: 'hamdigar', en: 'each other' },
      'را': { fa: 'را', tr: 'rā', en: 'marks the object of a verb' },
      'می‌بوسند.': { fa: 'می‌بوسند', tr: 'mibusand', en: 'they kiss' },
    },
    translation: [
      'Nowruz is the beginning of spring.',
      'The new year starts when winter ends.',
      'On the cloth they place seven things that begin with the letter s.',
      'Sprouted wheat for life, apple for beauty, a coin for wealth.',
      'The family gathers together and waits.',
      'When the year turns, everyone kisses each other.',
    ],
    note: 'sāl tahvil, the turning of the year, is an exact astronomical moment rather than a date. Families sit around the sofre watching a clock, and the year changes mid-afternoon or at four in the morning, whenever the equinox falls.',
  },
];

export function readingByKey(k?: string) {
  return READINGS.find((r) => r.key === k);
}
