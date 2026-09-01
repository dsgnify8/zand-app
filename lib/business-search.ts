// Finding an English listing in Persian.
//
// Two mechanisms, because neither alone is enough:
//
//   1. A synonym map. Most searches are for a kind of thing — غذا,
//      آرایشگاه, نانوایی — and those map cleanly onto categories we
//      already have. This costs nothing, works offline, and is right
//      every time, but only covers what we thought to include.
//
//   2. A translated index, built when a listing is saved. Covers the
//      specifics a map never would: a bakery whose keyword is
//      "sourdough", a garage that says "gearbox". Machine translation
//      is imperfect, which is why it supplements the map rather than
//      replacing it.
//
// Neither is shown to anyone. They exist only to make a query match.

import { supabase } from '@/lib/supabase';

/* ---------------- the synonym map ---------------- */

// Persian term → the English words and category keys it should find.
// Written the way people actually type, including the loose spellings:
// someone searching for a hairdresser might write آرایشگاه or سلمانی.
const FA_SYNONYMS: Record<string, string[]> = {
  // food
  'غذا': ['restaurant', 'food', 'kitchen', 'dining'],
  'خوراک': ['restaurant', 'food'],
  'رستوران': ['restaurant'],
  'کباب': ['restaurant', 'kebab', 'grill'],
  'چلوکباب': ['restaurant', 'kebab'],
  'قهوه': ['cafe', 'coffee'],
  'کافه': ['cafe', 'coffee'],
  'چای': ['cafe', 'tea'],
  'نان': ['bakery', 'bread'],
  'نانوایی': ['bakery', 'bread'],
  'شیرینی': ['bakery', 'pastry', 'sweets'],
  'قنادی': ['bakery', 'pastry'],
  'بستنی': ['cafe', 'ice cream'],
  'سوپرمارکت': ['grocery', 'supermarket'],
  'خواربار': ['grocery'],
  'بقالی': ['grocery'],
  'میوه': ['grocery', 'fruit'],
  'گوشت': ['grocery', 'butcher', 'meat'],
  'قصابی': ['grocery', 'butcher'],

  // body and appearance
  'آرایشگاه': ['salon', 'hair', 'barber'],
  'سلمانی': ['salon', 'barber', 'hair'],
  'پیرایش': ['salon', 'barber'],
  'مو': ['salon', 'hair'],
  'ناخن': ['nails', 'manicure'],
  'زیبایی': ['beauty', 'salon'],
  'ماساژ': ['beauty', 'massage'],

  // trades and services
  'تعمیرگاه': ['repair', 'mechanic', 'garage'],
  'مکانیک': ['repair', 'mechanic'],
  'ماشین': ['repair', 'car'],
  'خودرو': ['repair', 'car'],
  'لوله‌کشی': ['repair', 'plumbing'],
  'برق': ['repair', 'electrician'],

  // things to buy
  'لباس': ['clothing', 'fashion'],
  'پوشاک': ['clothing'],
  'کفش': ['clothing', 'shoes'],
  'طلا': ['jewellery', 'gold'],
  'جواهر': ['jewellery'],
  'فرش': ['interior', 'rug', 'carpet'],
  'قالی': ['interior', 'rug', 'carpet'],
  'مبل': ['interior', 'furniture'],
  'دکوراسیون': ['interior', 'design'],

  // professional
  'وکیل': ['legal', 'lawyer'],
  'حقوقی': ['legal'],
  'دکتر': ['medical', 'doctor'],
  'پزشک': ['medical', 'doctor'],
  'دندان': ['dental', 'dentist'],
  'دندانپزشک': ['dental'],
  'حسابدار': ['finance', 'accountant'],
  'مالی': ['finance'],
  'وام': ['finance', 'mortgage'],
  'بیمه': ['finance', 'insurance'],
  'املاک': ['property', 'estate'],
  'خانه': ['property', 'house'],

  // the rest
  'عکاس': ['photo', 'photography'],
  'عکاسی': ['photo'],
  'عروسی': ['events', 'wedding'],
  'تشریفات': ['events'],
  'موسیقی': ['music'],
  'ساز': ['music', 'instrument'],
  'هنر': ['arts', 'gallery'],
  'گالری': ['arts', 'gallery'],
  'سفر': ['travel', 'agency'],
  'بلیط': ['travel', 'flights'],
  'ورزش': ['fitness', 'gym'],
  'باشگاه': ['fitness', 'gym'],
  'آموزش': ['tutoring', 'lessons'],
  'کلاس': ['tutoring', 'lessons'],
  'مدرسه': ['tutoring', 'school'],
};

/**
 * Widen a query into every term worth matching on.
 *
 * A Persian word brings in its English equivalents; an English word is
 * left alone. Partial matches count, so someone typing آرایش still
 * reaches آرایشگاه.
 */
export function expandQuery(q: string): string[] {
  const t = q.trim().toLowerCase();
  if (!t) return [];

  const out = new Set<string>([t]);

  for (const [fa, ens] of Object.entries(FA_SYNONYMS)) {
    if (fa.includes(t) || t.includes(fa)) {
      ens.forEach((e) => out.add(e));
      out.add(fa);
    }
  }

  return [...out];
}

/* ---------------- the translated index ---------------- */

/**
 * Build the Persian search text for a listing and store it.
 *
 * Called after a save. Failure is silent and harmless: the listing
 * simply keeps whatever index it had, and the synonym map still works.
 */
export async function buildSearchIndex(b: {
  id: string;
  name?: string | null;
  tagline?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  category?: string | null;
  city?: string | null;
}) {
  const source = [
    b.name, b.tagline, b.description,
    ...(b.keywords ?? []),
    b.category, b.city,
  ].filter(Boolean).join('. ');

  if (!source.trim()) return;

  try {
    const { data } = await supabase.functions.invoke('translate', {
      body: { text: source, from: 'en', to: 'fa' },
    });
    const fa = (data?.text ?? '').trim();
    if (!fa) return;

    await supabase
      .from('businesses')
      .update({ search_fa: fa + ' ' + source })
      .eq('id', b.id);

    // Separately, fill in the Persian a Persian reader will actually see
    // — but only where the owner left it blank. Anything they wrote
    // themselves is theirs and must never be overwritten by a machine.
    await fillMissingPersian(b);
  } catch {
    // the synonym map carries it
  }
}


/**
 * Machine-translate the display fields an owner did not fill in.
 *
 * Deliberately conservative: it only writes where the field is empty. An
 * owner who wrote their own Persian description knows their business
 * better than a translation API does, and having their words replaced
 * would be worse than having none.
 */
async function fillMissingPersian(b: {
  id: string;
  name?: string | null;
  tagline?: string | null;
  description?: string | null;
  name_fa?: string | null;
  tagline_fa?: string | null;
  description_fa?: string | null;
  city?: string | null;
  city_fa?: string | null;
  badge?: string | null;
  badge_fa?: string | null;
}) {
  const jobs: [string, string][] = [];
  if (b.description && !b.description_fa) jobs.push(['description_fa', b.description]);
  if (b.tagline && !b.tagline_fa) jobs.push(['tagline_fa', b.tagline]);
  if (b.city && !b.city_fa) jobs.push(['city_fa', b.city]);
  if (b.badge && !b.badge_fa) jobs.push(['badge_fa', b.badge]);
  // name_fa is left alone on purpose: a business name is not a phrase to
  // be translated, and "Saffron & Rose" rendered into Persian by a
  // machine would be wrong in a way an owner would resent.

  if (jobs.length === 0) return;

  const patch: Record<string, string> = {};
  for (const [field, text] of jobs) {
    try {
      const { data } = await supabase.functions.invoke('translate', {
        body: { text, from: 'en', to: 'fa' },
      });
      const out = (data?.text ?? '').trim();
      if (out) patch[field] = out;
    } catch (e) {
      // Kept deliberately. A failing translate call leaves the listing in
      // English, and without this there is nothing anywhere to say why.
      console.log('[fa-fill] failed', field, e);
    }
  }

  if (Object.keys(patch).length) {
    await supabase.from('businesses').update(patch).eq('id', b.id);
  }
}
