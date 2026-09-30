// Where a listing is, at the size worth browsing.
//
// The page used to list cities, and a directory this young has four in
// Dubai and two in London, which reads as emptiness rather than as a
// beginning. Regions hold their shape while the numbers grow: five names
// that always look deliberate, and a city page inside each one when
// there is enough to warrant it.
//
// Matched on the country as the owner typed it, so the spellings people
// actually use are all here rather than a tidy list that misses half of
// them.

export type Region = {
  key: string;
  en: string;
  fa: string;
  /** Lowercased country names that belong to this region. */
  countries: string[];
};

export const REGIONS: Region[] = [
  {
    key: 'usa', en: 'United States', fa: 'آمریکا',
    countries: ['united states', 'united states of america', 'usa', 'us', 'u.s.', 'u.s.a.', 'america'],
  },
  {
    key: 'canada', en: 'Canada', fa: 'کانادا',
    countries: ['canada', 'ca'],
  },
  {
    key: 'europe', en: 'Europe', fa: 'اروپا',
    countries: [
      // The north sits in here rather than on its own. A region with one
      // listing in it reads as an empty shop, and the page is a map of
      // where the directory reaches, not a list of everywhere it has
      // ever been.
      'sweden', 'sverige', 'norway', 'norge', 'denmark', 'danmark',
      'finland', 'suomi', 'iceland', 'island',
      'united kingdom', 'uk', 'england', 'scotland', 'wales', 'ireland',
      'france', 'germany', 'deutschland', 'netherlands', 'holland', 'belgium',
      'spain', 'portugal', 'italy', 'austria', 'switzerland', 'greece',
      'poland', 'czechia', 'czech republic', 'hungary', 'romania', 'bulgaria',
      'croatia', 'serbia', 'slovenia', 'slovakia', 'estonia', 'latvia',
      'lithuania', 'luxembourg', 'malta', 'cyprus', 'monaco',
    ],
  },
  {
    // Nothing shows here until it has enough behind it, so this sits
    // ready rather than waiting to be remembered later.
    key: 'australia', en: 'Australia', fa: 'استرالیا',
    countries: ['australia', 'new zealand', 'aotearoa'],
  },
  {
    key: 'middle-east', en: 'Middle East', fa: 'خاورمیانه',
    countries: [
      'united arab emirates', 'uae', 'u.a.e.', 'emirates',
      'iran', 'qatar', 'kuwait', 'bahrain', 'oman', 'saudi arabia', 'ksa',
      'turkey', 'türkiye', 'israel', 'jordan', 'lebanon', 'iraq', 'egypt',
      'armenia', 'georgia', 'azerbaijan',
    ],
  },
];

const BY_COUNTRY: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const r of REGIONS) for (const c of r.countries) m[c] = r.key;
  return m;
})();

/** Which region a listing belongs to, or null for somewhere not listed yet. */
export function regionOf(country?: string | null): string | null {
  const k = (country ?? '').trim().toLowerCase();
  if (!k) return null;
  return BY_COUNTRY[k] ?? null;
}

export function regionByKey(key?: string | null): Region | undefined {
  return REGIONS.find((r) => r.key === key);
}
