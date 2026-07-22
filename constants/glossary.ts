// Tappable glossary terms. Add freely — reused across all education content.
export type GlossaryTerm = { id: string; term: string; title: string; description: string };

export const GLOSSARY: Record<string, GlossaryTerm> = {
  'khayyam': {
    id: 'khayyam',
    term: 'Omar Khayyam',
    title: 'Omar Khayyam',
    description: 'Poet, mathematician, and astronomer of Neyshabur. He advanced algebra, reformed the calendar, and wrote the Rubaiyat.',
  },
  'ferdowsi': {
    id: 'ferdowsi',
    term: 'Ferdowsi',
    title: 'Ferdowsi',
    description: 'The poet who wrote the Shahnameh and saved the Persian language. Revered as the father of Persian literature.',
  },
  'reza-khan': {
    id: 'reza-khan',
    term: 'Reza Khan',
    title: 'Reza Shah Pahlavi',
    description: 'Former ruler of Iran and founder of the Pahlavi dynasty. Father of Mohammad Reza Shah.',
  },
};

export function findTerm(id?: string) {
  return id ? GLOSSARY[id] : undefined;
}
