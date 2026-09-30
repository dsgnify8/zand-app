// Is this listing already here?
//
// Two questions, and they want different answers.
//
// The same name twice in the same city is a mistake nearly every time:
// somebody submitting again because they thought the first one failed, or a
// second person claiming a business that is already listed. A directory with
// two identical rows in one city cannot tell anyone which is which, so that
// is refused at the form.
//
// The same name in another city is the opposite: it is Cult Gaia in Cannes
// and Cult Gaia in New York, and asking the second one to call itself
// something else would be asking it to lie. That goes through, and the
// admin is told.
//
// A name close to one already here is usually not a mistake. It is a
// second branch, a franchise, a family that split, or two unrelated
// places that happened to land on the same word. None of those is ours
// to decide from a form, so the listing goes through and we are told,
// which is the whole point of the check.
//
// Matching is on a flattened form of the name rather than the name itself,
// because case, punctuation, accents, the Persian and Arabic digit shapes,
// and the letters people type two ways all vary between two people
// describing the same shop.
//
// Two flattenings, for the two questions. nameKey is strict: the same
// words in the same order, tidied. looseKey drops the trade words and puts
// the rest in order, which is what makes "Cafe Zand" and "Zand Cafe" meet.
// The strict one is what the database indexes, so a name is refused only
// when it is the same name.

/** Words that carry no identity of their own. */
const NOISE = new Set([
  'the', 'a', 'an', 'and', 'of', 'at', 'by', 'for',
  'restaurant', 'restaurants', 'cafe', 'caffe', 'coffee', 'bakery', 'patisserie',
  'grocery', 'grocer', 'market', 'supermarket', 'store', 'shop', 'boutique',
  'salon', 'studio', 'clinic', 'centre', 'center', 'company', 'co',
  'llc', 'ltd', 'limited', 'inc', 'incorporated', 'gmbh', 'ab', 'bv', 'sarl',
  'group', 'holdings', 'trading', 'services', 'service', 'international',
  // Persian equivalents of the same
  'رستوران', 'کافه', 'قنادی', 'شیرینی', 'فروشگاه', 'سوپر', 'سوپرمارکت',
  'آرایشگاه', 'کلینیک', 'شرکت', 'گروه',
]);

/**
 * Combining marks, Latin and Arabic.
 *
 * The Latin range is what is left behind when é is decomposed. The Arabic
 * ranges are the tashkeel, plus the maddah and hamza that sit above an
 * alef — those are part of a letter rather than an accent on it, and
 * leaving one behind broke the word in two.
 */
const MARKS = /[\u0300-\u036f\u064b-\u065f\u0670\u06d6-\u06ed]/g;

/** Arabic-Indic and Persian digits, so ۲ and ٢ and 2 are one digit. */
const DIGITS: Record<string, string> = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
};

/**
 * The name, flattened to what actually identifies it.
 *
 * Also the thing the database indexes, so the two have to agree: the
 * matching function in SQL is written to produce the same string.
 */
export function nameKey(raw: string | null | undefined): string {
  let v = (raw ?? '').toLowerCase().trim();
  if (!v) return '';

  // Persian and Arabic digits to Latin, so ۲ and ٢ and 2 are one digit.
  v = v.replace(/[۰-۹٠-٩]/g, (d) => DIGITS[d] ?? d);

  // Marks off, in both scripts, and in that order.
  //
  // Decomposing turns é into e plus a combining acute, which is what we
  // want. It also turns آ into ا plus a combining maddah — and a mark left
  // behind is not a letter, so the step below turned it into a space and
  // split a Persian word down the middle. Both sets of marks go here.
  v = v.normalize('NFD').replace(MARKS, '').normalize('NFC');

  // Zero-width joiners, which Persian keyboards scatter freely.
  v = v.replace(/[\u200b-\u200f\u2060\ufeff]/g, '');

  // Letters people type two ways. The Arabic ي and the Persian ی are the
  // same letter to a reader and different bytes to a database.
  v = v.replace(/[\u0649\u064a\u0626]/g, '\u06cc')   // ى ي ئ  ->  ی
       .replace(/\u0643/g, '\u06a9')                  // ك       ->  ک
       .replace(/\u0629/g, '\u0647')                  // ة       ->  ه
       .replace(/\u0624/g, '\u0648')                  // ؤ       ->  و
       .replace(/[\u0623\u0625\u0622\u0671]/g, '\u0627'); // أإآٱ ->  ا

  // Anything that is not a letter or a digit becomes a space.
  v = v.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

  return v.split(' ').filter(Boolean).join(' ');
}

/**
 * The same name with the trade words dropped and the rest put in order.
 *
 * This is for the softer question. "Cafe Zand" and "Zand Cafe" are almost
 * certainly one shop, and so are "Akbar Joojeh" and "Akbar Joojeh North
 * Vancouver" — but "Zand Cafe" and "Zand Restaurant" may well be two
 * different places, and refusing the second on the strength of a word
 * like "cafe" would be us deciding something we cannot know.
 *
 * So the strict key above is what blocks, and this is what asks.
 */
export function looseKey(raw: string | null | undefined): string {
  const words = nameKey(raw).split(' ').filter(Boolean);
  const kept = words.filter((w) => !NOISE.has(w));
  // If the trade words were the whole name, keep the name.
  return (kept.length ? kept : words).slice().sort().join(' ');
}

/** Edit distance, capped because we only care about close pairs. */
function distance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = row;
  }
  return prev[b.length];
}

/**
 * How alike two names are, from 0 to 1.
 *
 * Both a letter-level and a word-level view, because they catch different
 * things: "Azimzadeh" against "Azimzade" is a letter apart, while
 * "Akbar Joojeh Vancouver" against "Akbar Joojeh" shares every word it
 * has and differs by a third of its letters.
 */
export function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const letters = 1 - distance(a, b) / Math.max(a.length, b.length);

  const wa = new Set(a.split(' '));
  const wb = new Set(b.split(' '));
  let shared = 0;
  wa.forEach((w) => { if (wb.has(w)) shared += 1; });
  // Against the shorter one on purpose. A branch name is the parent name
  // plus a place, and measuring against the union would punish it for
  // being longer.
  const words = shared / Math.min(wa.size, wb.size);

  return Math.max(letters, words);
}

/** Close enough to be worth a person looking at. */
export const SIMILAR_AT = 0.72;

export type NameMatch = {
  id: string;
  name: string;
  city?: string | null;
  country?: string | null;
  status?: string | null;
  score: number;
};

/**
 * Sort the candidates into the one that blocks and the ones that warn.
 *
 * `taken` is an identical flattened name. `similar` is everything close
 * enough to be a branch or a namesake, most alike first.
 */
export function compareNames(
  mine: string,
  myCity: string | null | undefined,
  others: { id: string; name: string; name_fa?: string | null; city?: string | null; country?: string | null; status?: string | null }[],
  excludeId?: string,
): { taken: NameMatch | null; similar: NameMatch[] } {
  const strict = nameKey(mine);
  const loose = looseKey(mine);
  const city = nameKey(myCity);
  if (!strict) return { taken: null, similar: [] };

  let taken: NameMatch | null = null;
  const similar: NameMatch[] = [];

  for (const o of others) {
    if (excludeId && o.id === excludeId) continue;
    // Either language. Somebody listing under the Persian name of a shop
    // that is already here in English is the same shop.
    const theirStrict = [nameKey(o.name), nameKey(o.name_fa)].filter(Boolean);
    const theirLoose = [looseKey(o.name), looseKey(o.name_fa)].filter(Boolean);
    if (theirStrict.length === 0) continue;

    const row = (score: number): NameMatch => ({
      id: o.id, name: o.name, city: o.city, country: o.country,
      status: o.status, score,
    });

    if (theirStrict.includes(strict)) {
      // Same name, same city: the same listing twice. Same name, another
      // city: a second branch, which is the admin's to look at rather than
      // ours to refuse.
      if (nameKey(o.city) === city) {
        if (!taken) taken = row(1);
      } else {
        similar.push(row(1));
      }
      continue;
    }
    const score = Math.max(0, ...theirLoose.map((k) => similarity(loose, k)));
    if (score >= SIMILAR_AT) similar.push(row(score));
  }

  similar.sort((a, b) => b.score - a.score);
  return { taken, similar: similar.slice(0, 5) };
}
