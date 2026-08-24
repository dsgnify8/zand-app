// English under every option and every chip.
//
// At chapter one nobody can read the script yet, so a multiple choice
// written entirely in Persian is a coin flip rather than a question. The
// same goes for the word-order chips: tapping four shapes into a row is not
// a language exercise if you cannot tell which shape is which.
//
// ChoiceStep already renders `ens` and BuildStep already renders `partEns`;
// the data simply never supplied them. Rather than authoring a translation
// onto every exercise by hand — and re-authoring it every time a lesson is
// added — this builds a lexicon from the course itself. Nearly every option
// and chip is a word the course teaches somewhere as a `meet`, `sense` or
// `sentence` step, and those already carry `tr` and `en`.
//
// What the course never teaches standalone are the grammatical words: the
// copula, the object marker, the prepositions. Those are the hand-written
// map below, and it is short by design.
//
// Where neither source has a gloss, nothing renders. A wrong translation
// under a chip is worse than a blank one.

import { UNITS, type Lesson, type Step } from '@/constants/curriculum';
import type { LearnerName } from '@/lib/learner-name';

export type Gloss = { tr: string; en: string };

/* ------------------------------------------------------------------ *
 * Matching. Options carry punctuation the vocabulary entry does not,
 * and Arabic ya/kaf look identical to Persian ones but are different
 * codepoints — normalise both sides or half the lookups miss.
 * ------------------------------------------------------------------ */
export function normFa(s: string): string {
  return s
    .trim()
    .replace(/[؟،.!?:؛]/g, '')
    .replace(/\u064A/g, '\u06CC') // ARABIC YEH -> FARSI YEH
    .replace(/\u0643/g, '\u06A9') // ARABIC KAF -> KEHEH
    .replace(/[\u064B-\u0652]/g, '') // harakat
    .replace(/\s+/g, ' ');
}

/* ------------------------------------------------------------------ *
 * The words the course uses but never introduces on their own.
 * ------------------------------------------------------------------ */
const FUNCTION_WORDS: Record<string, Gloss> = {
  'است': { tr: 'ast', en: 'is' },
  'هست': { tr: 'hast', en: 'is, there is' },
  'نیست': { tr: 'nist', en: 'is not' },
  'بود': { tr: 'bud', en: 'was' },
  'را': { tr: 'rā', en: 'the (object marker)' },
  'رو': { tr: 'ro', en: 'the (object marker)' },
  'به': { tr: 'be', en: 'to' },
  'از': { tr: 'az', en: 'from' },
  'با': { tr: 'bā', en: 'with' },
  'در': { tr: 'dar', en: 'in' },
  'تو': { tr: 'to', en: 'you' },
  'که': { tr: 'ke', en: 'that' },
  'و': { tr: 'va', en: 'and' },
  'یا': { tr: 'yā', en: 'or' },
  'هم': { tr: 'ham', en: 'also, too' },
  'ولی': { tr: 'vali', en: 'but' },
  'اما': { tr: 'ammā', en: 'but' },
  'برای': { tr: 'barāye', en: 'for' },
  'تا': { tr: 'tā', en: 'until' },
  'این': { tr: 'in', en: 'this' },
  'آن': { tr: 'ān', en: 'that' },
  'اون': { tr: 'un', en: 'that' },
  'من': { tr: 'man', en: 'I, me' },
  'او': { tr: 'u', en: 'he, she' },
  'ما': { tr: 'mā', en: 'we, us' },
  'شما': { tr: 'shomā', en: 'you (polite)' },
  'آنها': { tr: 'ānhā', en: 'they' },
  'اونها': { tr: 'unhā', en: 'they' },
  'بله': { tr: 'bale', en: 'yes' },
  'آره': { tr: 'āre', en: 'yeah' },
  'نه': { tr: 'na', en: 'no' },
  'خیلی': { tr: 'kheyli', en: 'very' },
  'چه': { tr: 'che', en: 'what' },
  'چی': { tr: 'chi', en: 'what' },
  'کی': { tr: 'ki', en: 'who' },
  'کجا': { tr: 'kojā', en: 'where' },
  'چرا': { tr: 'cherā', en: 'why' },
  'چطور': { tr: 'chetor', en: 'how' },
  'چند': { tr: 'chand', en: 'how many' },
  'یک': { tr: 'yek', en: 'one, a' },
  'خوب': { tr: 'khub', en: 'good' },
  'بد': { tr: 'bad', en: 'bad' },
  'الان': { tr: 'alān', en: 'now' },
  'امروز': { tr: 'emruz', en: 'today' },
};

/* ------------------------------------------------------------------ *
 * The lexicon, built once from every lesson in the course.
 * ------------------------------------------------------------------ */
let LEXICON: Map<string, Gloss> | null = null;

function add(m: Map<string, Gloss>, fa?: string, tr?: string, en?: string) {
  if (!fa || !tr || !en) return;
  const k = normFa(fa);
  // First definition wins: a word is glossed where it is taught, not by a
  // later sentence that happens to contain it.
  if (k && !m.has(k)) m.set(k, { tr, en });
}

function buildLexicon(): Map<string, Gloss> {
  const m = new Map<string, Gloss>();

  for (const unit of UNITS as any[]) {
    for (const lesson of unit.lessons ?? []) {
      for (const step of (lesson.steps ?? []) as Step[]) {
        const s = step as any;

        // Anything carrying fa/tr/en teaches that string.
        add(m, s.fa, s.tr, s.en);

        // Glosses an author has already written by hand outrank ours.
        if (s.optionTrs && s.optionEns) {
          for (const k of Object.keys(s.optionEns)) add(m, k, s.optionTrs[k], s.optionEns[k]);
        }
        if (s.partTrs && s.partEns) {
          for (const k of Object.keys(s.partEns)) add(m, k, s.partTrs[k], s.partEns[k]);
        }

        // Letters teach a word per position; vowels teach a short list.
        for (const p of s.positions ?? []) add(m, p.word, p.tr, p.en);
        for (const e of s.examples ?? []) add(m, e.fa, e.tr, e.en);
      }
    }
  }

  for (const [k, v] of Object.entries(FUNCTION_WORDS)) {
    const key = normFa(k);
    if (!m.has(key)) m.set(key, v);
  }

  return m;
}

export function glossFor(fa: string, extra?: Map<string, Gloss>): Gloss | undefined {
  if (!LEXICON) LEXICON = buildLexicon();
  const k = normFa(fa);
  return extra?.get(k) ?? LEXICON.get(k);
}

/* ------------------------------------------------------------------ *
 * Filling a lesson in.
 * ------------------------------------------------------------------ */

/**
 * Adds any missing option and chip glosses to a lesson.
 *
 * Call this *after* the learner's name has been substituted, so the lookup
 * keys match the strings actually on screen. The learner's own name is
 * passed in because it is the one word in the course that no lexicon could
 * contain.
 */
export function withGlosses(lesson: Lesson, learner?: LearnerName): Lesson {
  const extra = new Map<string, Gloss>();
  if (learner) {
    extra.set(normFa(learner.fa), { tr: learner.tr, en: learner.en });
  }

  const fill = (keys: string[], existing?: Record<string, string>, pick?: keyof Gloss) => {
    const out: Record<string, string> = { ...(existing ?? {}) };
    let changed = false;
    for (const k of keys) {
      if (out[k]) continue;
      const g = glossFor(k, extra);
      if (g && pick) {
        out[k] = g[pick];
        changed = true;
      }
    }
    return changed || existing ? out : undefined;
  };

  const steps = lesson.steps.map((step) => {
    const s = step as any;

    if (s.t === 'listen' || s.t === 'choose') {
      const options: string[] = s.options ?? [];
      return {
        ...s,
        optionTrs: fill(options, s.optionTrs, 'tr'),
        optionEns: fill(options, s.optionEns, 'en'),
      };
    }

    if (s.t === 'build') {
      const parts: string[] = s.parts ?? [];
      return {
        ...s,
        partTrs: fill(parts, s.partTrs, 'tr'),
        partEns: fill(parts, s.partEns, 'en'),
      };
    }

    return step;
  });

  return { ...lesson, steps: steps as Step[] };
}

/**
 * Which options and chips in the whole course still have no gloss.
 * Not called at runtime — run it from a screen or a script when adding
 * lessons, to see what the hand-written map is still missing.
 */
export function missingGlosses(): string[] {
  const gaps = new Set<string>();
  for (const unit of UNITS as any[]) {
    for (const lesson of unit.lessons ?? []) {
      for (const step of (lesson.steps ?? []) as any[]) {
        const words: string[] = step.t === 'build' ? step.parts ?? [] : step.options ?? [];
        for (const w of words) if (!glossFor(w)) gaps.add(w);
      }
    }
  }
  return [...gaps];
}
