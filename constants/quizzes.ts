// Quizzes — generated from existing alphabet and vocabulary so they stay in sync.
import { PERSIAN_ALPHABET } from './persian-alphabet';
import { DECKS } from './flashcards';

export type QuizQuestion = { prompt: string; question: string; options: string[]; answer: string };
export type QuizCategory = { key: string; title: string; persian: string; icon: string; questions: QuizQuestion[] };

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(answer: string, pool: string[], seed: number): string[] {
  const uniq = Array.from(new Set(pool)).filter((p) => p !== answer);
  const others = seededShuffle(uniq, seed).slice(0, 3);
  return seededShuffle([answer, ...others], seed + 7);
}

// Letters & Sounds
const letterNames = PERSIAN_ALPHABET.map((l) => l.name);
const letterQs: QuizQuestion[] = seededShuffle(PERSIAN_ALPHABET, 5).slice(0, 12).map((l, i) => ({
  prompt: l.char,
  question: 'What is this letter called?',
  options: buildOptions(l.name, letterNames, i + 1),
  answer: l.name,
}));

// Vocabulary
const vocabKeys = ['greetings', 'family', 'food', 'everyday', 'compliments'];
const vocabCards = DECKS.filter((d) => vocabKeys.includes(d.key)).flatMap((d) => d.cards);
const vocabMeanings = vocabCards.map((c) => c.en);
const vocabQs: QuizQuestion[] = seededShuffle(vocabCards, 9).slice(0, 12).map((c, i) => ({
  prompt: c.fa,
  question: 'What does this word mean?',
  options: buildOptions(c.en, vocabMeanings, i + 2),
  answer: c.en,
}));

// Numbers
const numCards = DECKS.find((d) => d.key === 'numbers')?.cards ?? [];
const numMeanings = numCards.map((c) => c.en);
const numQs: QuizQuestion[] = numCards.map((c, i) => ({
  prompt: c.symbol ?? c.fa,
  question: 'Which number is this?',
  options: buildOptions(c.en, numMeanings, i + 3),
  answer: c.en,
}));

export const QUIZ_CATEGORIES: QuizCategory[] = [
  { key: 'letters', title: 'Letters & Sounds', persian: 'الفبا', icon: 'text-outline', questions: letterQs },
  { key: 'vocabulary', title: 'Vocabulary', persian: 'واژگان', icon: 'book-outline', questions: vocabQs },
  { key: 'numbers', title: 'Numbers', persian: 'شماره‌ها', icon: 'calculator-outline', questions: numQs },
];

export function findQuiz(key?: string) {
  return QUIZ_CATEGORIES.find((c) => c.key === key);
}
