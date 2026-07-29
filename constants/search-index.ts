// Universal search index — built from existing content so it grows automatically.
import { PERSIAN_ALPHABET } from '@/constants/persian-alphabet';

export type SearchEntry = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  route: string;
  keywords: string;
};

// Navigable sections, modules, and themes.
const NAV_ENTRIES: SearchEntry[] = [
  { id: 's-translate', title: 'Translate', subtitle: 'Tools', category: 'Learn', route: '/learn/translate', keywords: 'translate translator برگردان ترجمه farsi english dictionary speak mic voice' },
  { id: 's-converse', title: 'Conversation', subtitle: 'Talk to someone', category: 'Learn', route: '/learn/converse', keywords: 'conversation talk speak interpreter two way voice mic گفتگو' },
  { id: 's-phrasebook', title: 'Phrasebook', subtitle: 'Learn', category: 'Learn', route: '/learn/phrasebook', keywords: 'phrases phrasebook sayings عبارت‌ها common say' },
  { id: 's-alphabet2', title: 'The Alphabet', subtitle: 'Learn', category: 'Learn', route: '/learn/alphabet', keywords: 'alphabet letters الفبا abc script write' },
  { id: 's-learnmap', title: 'Learn Persian', subtitle: 'Your route', category: 'Learn', route: '/learn/map', keywords: 'learn persian farsi lessons course route path فارسی' },
  { id: 's-review', title: 'Review', subtitle: 'Learn', category: 'Learn', route: '/learn/review', keywords: 'review revise practice words مرور' },
  // Learn modules
  { id: 'm-alphabet', title: 'Alphabet', subtitle: 'Learn Persian', category: 'Learn', route: '/learn/alphabet', keywords: 'الفبا letters script abjad' },
  { id: 'm-flashcards', title: 'Flashcards', subtitle: 'Learn Persian', category: 'Learn', route: '/learn', keywords: 'کارت‌ها review spaced repetition' },
  { id: 'm-pronunciation', title: 'Pronunciation', subtitle: 'Learn Persian', category: 'Learn', route: '/learn', keywords: 'تلفظ sounds audio speak' },
  { id: 'm-writing', title: 'Writing', subtitle: 'Learn Persian', category: 'Learn', route: '/learn', keywords: 'نوشتن trace handwriting' },
  { id: 'm-quizzes', title: 'Quizzes', subtitle: 'Learn Persian', category: 'Learn', route: '/learn', keywords: 'آزمون test practice' },
  { id: 'm-vocabulary', title: 'Vocabulary', subtitle: 'Learn Persian', category: 'Learn', route: '/learn', keywords: 'واژگان words phrases' },

  // Explore sections
  { id: 's-education', title: 'Education', subtitle: 'Explore', category: 'Explore', route: '/section/education', keywords: 'آموزش learn heritage' },
  { id: 's-videos', title: 'Videos', subtitle: 'Explore', category: 'Explore', route: '/section/videos', keywords: 'ویدیوها watch film' },
  { id: 's-podcasts', title: 'Podcasts', subtitle: 'Explore', category: 'Explore', route: '/section/podcasts', keywords: 'پادکست‌ها listen audio' },
  { id: 's-articles', title: 'Articles', subtitle: 'Explore', category: 'Explore', route: '/section/articles', keywords: 'مقاله‌ها read interviews essays' },

  // Education themes
  { id: 'e-history', title: 'History', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'تاریخ empire ancient persia' },
  { id: 'e-language', title: 'Language', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'زبان farsi persian roots' },
  { id: 'e-culture', title: 'Culture', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'فرهنگ customs life' },
  { id: 'e-art', title: 'Art', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'هنر miniature calligraphy' },
  { id: 'e-architecture', title: 'Architecture', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'معماری domes gardens mosque' },
  { id: 'e-philosophy', title: 'Philosophy', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'فلسفه mysticism sufism ideas' },
  { id: 'e-literature', title: 'Literature', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'ادبیات poetry rumi hafez ferdowsi' },
  { id: 'e-traditions', title: 'Traditions', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'آیین‌ها nowruz yalda festivals' },
  { id: 'e-science', title: 'Science', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'علم math medicine astronomy' },
  { id: 'e-geography', title: 'Geography', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'جغرافیا land cities maps' },
  { id: 'e-food', title: 'Food', subtitle: 'Education', category: 'Education', route: '/section/education', keywords: 'غذا cuisine saffron dishes' },

  // Shop
  { id: 'shop', title: 'Shop', subtitle: 'Featured makers', category: 'Shop', route: '/shop', keywords: 'فروشگاه buy products artists makers' },
];

// Every alphabet letter becomes searchable by name and sound.
const LETTER_ENTRIES: SearchEntry[] = PERSIAN_ALPHABET.map((l, i) => ({
  id: 'letter-' + i,
  title: l.name,
  subtitle: 'Letter · ' + l.char + ' · sounds like “' + l.sound + '”',
  category: 'Alphabet',
  route: '/learn/alphabet',
  keywords: l.char + ' ' + l.sound + ' ' + (l.exampleWord ?? '') + ' letter',
}));

export const SEARCH_INDEX: SearchEntry[] = [...NAV_ENTRIES, ...LETTER_ENTRIES];

export function searchZand(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.subtitle.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.keywords.toLowerCase().includes(q)
  ).slice(0, 40);
}
