// Tappable glossary terms. Add freely — reused across all education content.
export type GlossaryTerm = { id: string; term: string; title: string; description: string; titleFa?: string; descriptionFa?: string; video?: string; videoLabel?: string };

export const GLOSSARY: Record<string, GlossaryTerm> = {
  'hafez': {
    id: 'hafez',
    term: 'Hafez',
    title: 'The Divan of Hafez',
    titleFa: 'دیوان حافظ',
    description: 'The collected ghazals of Hafez of Shiraz, c. 1315 to 1390. It sits in most Iranian homes and is opened at Nowruz and at Yalda to be asked a question, a custom called fal e Hafez.',
    descriptionFa: 'مجموعهٔ غزل‌های حافظ شیرازی، حدود ۱۳۱۵ تا ۱۳۹۰ میلادی. در بیشتر خانه‌های ایرانی هست و نوروز و شب یلدا آن را می‌گشایند تا از او بپرسند؛ آیینی که فال حافظ خوانده می‌شود.',
  },
  'hoveyda': {
    id: 'hoveyda',
    term: 'Hoveyda',
    title: 'Amir-Abbas Hoveyda',
    titleFa: 'امیرعباس هویدا',
    description: 'Prime Minister from 1965 to 1977, the longest serving in Iranian history. Arrested by the Shah\u2019s own government in late 1978 as a concession to the protests, tried by a revolutionary court and executed on 7 April 1979.',
    descriptionFa: 'نخست‌وزیر ایران از ۱۹۶۵ تا ۱۹۷۷، طولانی‌ترین دورهٔ نخست‌وزیری در تاریخ ایران. اواخر ۱۹۷۸ به دست دولت خودِ شاه و در پاسخ به اعتراض‌ها بازداشت شد، در دادگاه انقلاب محاکمه و در ۷ آوریل ۱۹۷۹ اعدام شد.',
    video: '/section/videos?playlist=hoveyda',
    videoLabel: 'Watch: the life of Hoveyda',
  },
  'khayyam': {
    id: 'khayyam',
    term: 'Omar Khayyam',
    title: 'Omar Khayyam',
    titleFa: 'عمر خیام',
    description: 'Poet, mathematician, and astronomer of Neyshabur. He advanced algebra, reformed the calendar, and wrote the Rubaiyat.',
    descriptionFa: 'شاعر، ریاضی‌دان و ستاره‌شناس نیشابور. جبر را پیش برد، تقویم را اصلاح کرد و رباعیات را سرود.',
  },
  'ferdowsi': {
    id: 'ferdowsi',
    term: 'Ferdowsi',
    title: 'Ferdowsi',
    titleFa: 'فردوسی',
    description: 'The poet who wrote the Shahnameh and saved the Persian language. Revered as the father of Persian literature.',
    descriptionFa: 'شاعری که شاهنامه را سرود و زبان فارسی را نگه داشت. او را پدر ادبیات فارسی می‌دانند.',
  },
  'reza-khan': {
    id: 'reza-khan',
    term: 'Reza Khan',
    title: 'Reza Shah Pahlavi',
    titleFa: 'رضاشاه پهلوی',
    description: 'Former ruler of Iran and founder of the Pahlavi dynasty. Father of Mohammad Reza Shah.',
    descriptionFa: 'پادشاه پیشین ایران و بنیان‌گذار سلسلهٔ پهلوی. پدر محمدرضا شاه.',
  },
};

export function findTerm(id?: string) {
  return id ? GLOSSARY[id] : undefined;
}
