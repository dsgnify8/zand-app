// Cities, and what we know about them.
//
// The cover and the line of text are ours rather than the listings' — a
// city page opening on a photograph of somebody's salon does not say
// Stockholm, it says salon. Where there is no cover here the page falls
// back to a listing photo, which is worse but never empty.
//
// Keyed on the lowercased city name because `city` on a listing is free
// text: "Stockholm", "stockholm" and " Stockholm " all have to land here.

export type CityInfo = {
  cover?: any;
  en: string;
  fa: string;
};

export const CITIES: Record<string, CityInfo> = {
  stockholm: {
    cover: require('@/assets/cities/city-stockholm.jpg'),
    en: 'The largest Iranian community in Scandinavia, and the food to prove it.',
    fa: 'بزرگ‌ترین جامعهٔ ایرانی اسکاندیناوی، و غذایی که گواهش است.',
  },
  gothenburg: {
    en: 'A west-coast city where the Persian grocers outnumber the tourists.',
    fa: 'شهری در ساحل غربی، جایی که سوپرمارکت‌های ایرانی از توریست‌ها بیشترند.',
  },
  dubai: {
    en: 'Two hours from Tehran, and it shows on every menu.',
    fa: 'دو ساعت تا تهران، و این را در هر منو می‌بینی.',
  },
  london: {
    en: 'Kensington to Finchley, a century of arrivals.',
    fa: 'از کنزینگتون تا فینچلی، یک قرن آمدن.',
  },
  montreal: {
    en: 'Cold winters, warm rooms, and saffron in the corner shops.',
    fa: 'زمستان سرد، اتاق‌های گرم، و زعفران در مغازه‌های سر کوچه.',
  },
  vancouver: {
    en: 'North Shore to Coquitlam — the largest Iranian population in Canada.',
    fa: 'از نورث‌شور تا کوکیتلام؛ بزرگ‌ترین جمعیت ایرانی کانادا.',
  },
  'los angeles': {
    en: 'Tehrangeles. Nowhere outside Iran has more.',
    fa: 'تهرانجلس. بیرون از ایران هیچ‌جا بیشتر از اینجا نیست.',
  },
  toronto: {
    en: 'Yonge Street north, where the signs start reading in Persian.',
    fa: 'شمال خیابان یانگ، جایی که تابلوها فارسی می‌شوند.',
  },
};

/**
 * Cities that exist in the data but not as a place to browse.
 *
 * A listing in Lusail or Great Tew is real and belongs on the feed and the
 * map. Neither is somewhere anyone browses *to* — a city page with one
 * restaurant on it promises more than it has.
 */
const NOT_A_DESTINATION = ['lusail', 'great tew', 'sharjah'];

export const isDestination = (city: string | null | undefined) =>
  !!city && !NOT_A_DESTINATION.includes(city.trim().toLowerCase());

export const cityInfo = (city: string | null | undefined): CityInfo | null =>
  city ? CITIES[city.trim().toLowerCase()] ?? null : null;

export const cityBlurb = (city: string | null | undefined, fa: boolean) => {
  const c = cityInfo(city);
  return c ? (fa ? c.fa : c.en) : null;
};


/**
 * Cities to offer as someone types.
 *
 * Matched against the ones we know rather than a geocoder: it answers on
 * the first keystroke, costs nothing, and a directory should suggest the
 * places it actually has listings in before it suggests anywhere else.
 *
 * Prefix matches first, then anything containing the text — so "lo" leads
 * with London and still finds Los Angeles.
 */
export function suggestCities(text: string, limit = 5) {
  const q = text.trim().toLowerCase();
  if (q.length < 1) return [];

  const names = Object.keys(CITIES).filter(isDestination);
  const starts = names.filter((n) => n.startsWith(q));
  const has = names.filter((n) => !n.startsWith(q) && n.includes(q));

  return [...starts, ...has]
    .slice(0, limit)
    .map((key) => ({
      key,
      // Title case for display: the map is keyed lowercase.
      label: key.replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
}
