// Whose name the lessons use.
//
// The course was written with one name in it. A learner should see their
// own, so a sentence like "my name is ___" is a sentence they will actually
// say. Signed out, everyone is Sara — a name, not a placeholder, so the
// example still reads as Persian rather than as a form field.
//
// The hard part is the Persian script. There is no reliable way to get from
// an arbitrary Latin spelling to Persian letters: Persian does not write
// short vowels, so Sārā is سارا but Maryam is مریم, and nothing in the
// spelling tells you which vowels are long. So: a curated map does the real
// work, and the rule-based fallback below is best-effort for names that are
// not in it. ADD TO THE MAP rather than tuning the fallback — the map is
// always right and the fallback never quite is.

import { useMemo } from 'react';
import { useAuth } from '@/lib/auth';

export type LearnerName = { en: string; fa: string; tr: string };

// Signed out. A real name, so the example sentence still sounds like one.
const GUEST: LearnerName = { en: 'Sara', fa: 'سارا', tr: 'Sārā' };

// auth.tsx falls back to this when there is no name on the account. It is a
// greeting, not a name, and must never end up inside a sentence.
const NOT_A_NAME = new Set(['there', 'friend', 'user', 'admin', '']);

/* ------------------------------------------------------------------ *
 * The curated map. Persian spelling, and the transliteration used in
 * the romanised line under each sentence.
 * ------------------------------------------------------------------ */
const KNOWN: Record<string, [fa: string, tr: string]> = {
  // Persian names, most common first
  sara: ['سارا', 'Sārā'],
  sarah: ['سارا', 'Sārā'],
  maryam: ['مریم', 'Maryam'],
  mariam: ['مریم', 'Maryam'],
  fatemeh: ['فاطمه', 'Fātemeh'],
  zahra: ['زهرا', 'Zahrā'],
  narges: ['نرگس', 'Narges'],
  niloufar: ['نیلوفر', 'Nilufar'],
  nilufar: ['نیلوفر', 'Nilufar'],
  shirin: ['شیرین', 'Shirin'],
  laleh: ['لاله', 'Lāleh'],
  leila: ['لیلا', 'Leylā'],
  leyla: ['لیلا', 'Leylā'],
  layla: ['لیلا', 'Leylā'],
  yasmin: ['یاسمین', 'Yāsmin'],
  yasaman: ['یاسمن', 'Yāsaman'],
  parisa: ['پریسا', 'Parisā'],
  paria: ['پریا', 'Pariā'],
  golnaz: ['گلناز', 'Golnāz'],
  goli: ['گلی', 'Goli'],
  mahsa: ['مهسا', 'Mahsā'],
  mahtab: ['مهتاب', 'Mahtāb'],
  roya: ['رویا', 'Royā'],
  rana: ['رعنا', 'Ranā'],
  setareh: ['ستاره', 'Setāreh'],
  simin: ['سیمین', 'Simin'],
  soraya: ['ثریا', 'Sorayyā'],
  tara: ['تارا', 'Tārā'],
  taraneh: ['ترانه', 'Tarāneh'],
  anahita: ['آناهیتا', 'Ānāhitā'],
  arezoo: ['آرزو', 'Ārezu'],
  azadeh: ['آزاده', 'Āzādeh'],
  bahar: ['بهار', 'Bahār'],
  banafsheh: ['بنفشه', 'Banafsheh'],
  darya: ['دریا', 'Daryā'],
  donya: ['دنیا', 'Donyā'],
  elham: ['الهام', 'Elhām'],
  elnaz: ['الناز', 'Elnāz'],
  hediyeh: ['هدیه', 'Hediyeh'],
  katayoun: ['کتایون', 'Katāyun'],
  ladan: ['لادن', 'Lādan'],
  mitra: ['میترا', 'Mitrā'],
  nazanin: ['نازنین', 'Nāzanin'],
  negar: ['نگار', 'Negār'],
  neda: ['ندا', 'Nedā'],
  pardis: ['پردیس', 'Pardis'],
  parvaneh: ['پروانه', 'Parvāneh'],
  shadi: ['شادی', 'Shādi'],
  shaghayegh: ['شقایق', 'Shaghāyegh'],
  shohreh: ['شهره', 'Shohreh'],
  sahar: ['سحر', 'Sahar'],
  sanaz: ['ساناز', 'Sānāz'],
  shabnam: ['شبنم', 'Shabnam'],

  ali: ['علی', 'Ali'],
  amir: ['امیر', 'Amir'],
  arash: ['آرش', 'Ārash'],
  ardeshir: ['اردشیر', 'Ardeshir'],
  babak: ['بابک', 'Bābak'],
  bahram: ['بهرام', 'Bahrām'],
  bijan: ['بیژن', 'Bizhan'],
  cyrus: ['کوروش', 'Kurosh'],
  kourosh: ['کوروش', 'Kurosh'],
  dara: ['دارا', 'Dārā'],
  darius: ['داریوش', 'Dāriush'],
  dariush: ['داریوش', 'Dāriush'],
  ebrahim: ['ابراهیم', 'Ebrāhim'],
  farhad: ['فرهاد', 'Farhād'],
  farzad: ['فرزاد', 'Farzād'],
  hamid: ['حمید', 'Hamid'],
  hossein: ['حسین', 'Hosseyn'],
  iman: ['ایمان', 'Imān'],
  kaveh: ['کاوه', 'Kāveh'],
  kian: ['کیان', 'Kiān'],
  mehdi: ['مهدی', 'Mehdi'],
  mehran: ['مهران', 'Mehrān'],
  mohammad: ['محمد', 'Mohammad'],
  nima: ['نیما', 'Nimā'],
  nojan: ['نوژان', 'Nozhān'],
  omid: ['امید', 'Omid'],
  parsa: ['پارسا', 'Pārsā'],
  payam: ['پیام', 'Payām'],
  pedram: ['پدرام', 'Pedrām'],
  peyman: ['پیمان', 'Peymān'],
  pouya: ['پویا', 'Puyā'],
  ramin: ['رامین', 'Rāmin'],
  reza: ['رضا', 'Rezā'],
  rostam: ['رستم', 'Rostam'],
  saeed: ['سعید', 'Saʿid'],
  sam: ['سام', 'Sām'],
  sasan: ['ساسان', 'Sāsān'],
  shahin: ['شاهین', 'Shāhin'],
  shayan: ['شایان', 'Shāyān'],
  sina: ['سینا', 'Sinā'],
  siavash: ['سیاوش', 'Siāvash'],
  soheil: ['سهیل', 'Soheyl'],
  vahid: ['وحید', 'Vahid'],
  yashar: ['یاشار', 'Yāshār'],

  // Common non-Persian names, since the diaspora is not only Persian names
  alex: ['الکس', 'Alex'],
  anna: ['آنا', 'Ānā'],
  daniel: ['دنیل', 'Dāniel'],
  david: ['دیوید', 'David'],
  emma: ['اما', 'Emmā'],
  james: ['جیمز', 'James'],
  jessica: ['جسیکا', 'Jesikā'],
  john: ['جان', 'Jān'],
  laura: ['لورا', 'Lorā'],
  maria: ['ماریا', 'Māriā'],
  michael: ['مایکل', 'Māykel'],
  nina: ['نینا', 'Ninā'],
  sofia: ['سوفیا', 'Sofiā'],
  sophie: ['سوفی', 'Sofi'],
  thomas: ['توماس', 'Tomās'],
};

/* ------------------------------------------------------------------ *
 * Fallback transliteration. Best-effort only — see the note above.
 * ------------------------------------------------------------------ */
const DIGRAPHS: [string, string][] = [
  ['kh', 'خ'], ['gh', 'ق'], ['sh', 'ش'], ['ch', 'چ'], ['zh', 'ژ'],
  ['ph', 'ف'], ['th', 'ت'], ['ck', 'ک'], ['oo', 'و'], ['ou', 'و'],
  ['ee', 'ی'], ['ei', 'ی'], ['ai', 'ای'], ['ay', 'ای'],
];

const LETTERS: Record<string, string> = {
  b: 'ب', c: 'ک', d: 'د', f: 'ف', g: 'گ', h: 'ه', j: 'ج', k: 'ک', l: 'ل',
  m: 'م', n: 'ن', p: 'پ', q: 'ق', r: 'ر', s: 'س', t: 'ت', v: 'و', w: 'و',
  x: 'کس', y: 'ی', z: 'ز',
};

function transliterate(name: string): string {
  let s = name.toLowerCase().replace(/[^a-z]/g, '');
  if (!s) return GUEST.fa;

  // Digraphs first, held as private-use markers so later passes skip them.
  const held: string[] = [];
  DIGRAPHS.forEach(([latin, fa]) => {
    s = s.split(latin).join('\uE000' + (held.push(fa) - 1) + '\uE001');
  });

  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (c === '\uE000') {
      const end = s.indexOf('\uE001', i);
      out += held[Number(s.slice(i + 1, end))];
      i = end;
      continue;
    }

    const first = out === '';
    const last = i === s.length - 1;

    // Persian writes long vowels and leaves short ones off the page. At the
    // start and end of a word they are always written; in the middle we drop
    // them, which is right more often than not.
    if ('aeiou'.includes(c)) {
      if (first) out += c === 'a' ? 'آ' : 'aeiou'.indexOf(c) < 3 ? 'ای' : 'او';
      else if (last) out += c === 'a' ? 'ا' : c === 'e' ? 'ه' : c === 'i' ? 'ی' : 'و';
      else if (c === 'i') out += 'ی';
      else if (c === 'u') out += 'و';
      continue;
    }

    if (c === s[i - 1]) continue; // doubled consonants are written once
    out += LETTERS[c] ?? '';
  }

  return out || GUEST.fa;
}

/* ------------------------------------------------------------------ */

const isPersianScript = (s: string) => /[\u0600-\u06FF]/.test(s);

/** First name only. "Sara Ahmadi" and "sara.ahmadi" both give Sara. */
function firstNameOf(display?: string | null): string | null {
  if (!display) return null;
  const raw = display.trim().split(/[\s._-]+/)[0];
  if (!raw || NOT_A_NAME.has(raw.toLowerCase())) return null;
  if (isPersianScript(raw)) return raw;
  return raw[0].toUpperCase() + raw.slice(1).toLowerCase();
}

export function resolveLearnerName(display?: string | null): LearnerName {
  const first = firstNameOf(display);
  if (!first) return GUEST;

  // Someone who signed up in Persian already gave us the hard part.
  if (isPersianScript(first)) return { en: first, fa: first, tr: first };

  const known = KNOWN[first.toLowerCase()];
  if (known) return { en: first, fa: known[0], tr: known[1] };

  return { en: first, fa: transliterate(first), tr: first };
}

export function useLearnerName(): LearnerName {
  const { user, displayName } = useAuth();
  // Signed out, displayName is a greeting rather than a name.
  return useMemo(() => resolveLearnerName(user ? displayName : null), [user, displayName]);
}

/* ------------------------------------------------------------------ *
 * Putting the name into a lesson.
 * ------------------------------------------------------------------ */

// Every spelling of the authored name, plus tokens for anything written
// later. Longest first so Nojān is matched before Nojan.
const TOKENS = (n: LearnerName): [RegExp, string][] => [
  [/\{nameFa\}/g, n.fa],
  [/\{nameTr\}/g, n.tr],
  [/\{name\}/g, n.en],
  [/نوژان/g, n.fa],
  [/نوجان/g, n.fa],
  [/Nojān/g, n.tr],
  [/Nojan/g, n.en],
];

/**
 * Deep substitution over a lesson — **keys as well as values**.
 *
 * This matters more than it looks. optionTrs is keyed by the Persian option
 * string, so the name appears both as a key and inside the option array. If
 * the two are substituted at different moments the lookup misses, the
 * transliteration under that option silently disappears, and nothing throws.
 * One traversal keeps them in step.
 */
export function personalise<T>(value: T, name: LearnerName): T {
  const rules = TOKENS(name);
  const walk = (v: any): any => {
    if (typeof v === 'string') return rules.reduce((s, [re, to]) => s.replace(re, to), v);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') {
      const out: any = {};
      for (const k of Object.keys(v)) out[walk(k)] = walk(v[k]);
      return out;
    }
    return v;
  };
  return walk(value);
}
