// Tappable glossary terms. Add freely — reused across all education content.
export type GlossaryTerm = { id: string; term: string; title: string; description: string; titleFa?: string; descriptionFa?: string };

export const GLOSSARY: Record<string, GlossaryTerm> = {
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
