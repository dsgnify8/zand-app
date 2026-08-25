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

export const cityInfo = (city: string | null | undefined): CityInfo | null =>
  city ? CITIES[city.trim().toLowerCase()] ?? null : null;

export const cityBlurb = (city: string | null | undefined, fa: boolean) => {
  const c = cityInfo(city);
  return c ? (fa ? c.fa : c.en) : null;
};
