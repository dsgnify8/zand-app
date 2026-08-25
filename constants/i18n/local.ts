// Local, and the business pages.
//
// Same conventions as profile.ts: the app addresses the reader informally,
// labels stay impersonal, relative clauses rather than nominal compounds.
//
// Not here: a business's own description. That is a row in the database
// with no Persian column, so a listing written in English stays English
// whatever the app language. Translating it needs a description_fa field
// and owners filling both in — a schema decision, not a copy one.

import type { T } from '@/lib/i18n';

export const LOCAL: Record<string, T> = {
  popular: { en: 'POPULAR', fa: 'محبوب‌ها' },
  justAdded: { en: 'JUST ADDED', fa: 'تازه‌ها' },
  seeAll: { en: 'SEE ALL', fa: 'همه' },
  closestTo: { en: 'CLOSEST TO', fa: 'نزدیک‌ترین‌ها به' },
  newestHere: { en: 'JUST ADDED', fa: 'تازه اضافه‌شده‌ها' },

  savedTitle: { en: 'Saved', fa: 'ذخیره‌شده‌ها' },
  nothingSaved: { en: 'Nothing saved yet', fa: 'هنوز چیزی ذخیره نکرده‌ای' },
  nothingSavedX: { en: 'Tap the bookmark on any listing to keep it here.', fa: 'روی نشان کتاب هر کسب‌وکاری بزن تا اینجا بماند.' },
  browseLocal: { en: 'Browse Local', fa: 'گشتی بزن' },

  // browsing
  byCountryTitle: { en: 'By country', fa: 'بر اساس کشور' },
  byCountryX: { en: 'every place, gathered by where it is', fa: 'همه‌جا، بر اساس کشور' },
  pickACategory: { en: 'Pick a category to see everywhere it exists.', fa: 'یک دسته انتخاب کن تا همه‌جای دنیا را ببینی.' },
  byCategoryTitle: { en: 'By category', fa: 'بر اساس دسته' },
  byCategoryX: { en: 'restaurants, cafés, everything else', fa: 'رستوران، کافه، و بقیه' },
  listBusinessX: { en: 'yours, on the map', fa: 'مال تو، روی نقشه' },
  chooseYourPlace: { en: 'CHOOSE YOUR PLACE', fa: 'کشورت را انتخاب کن' },
  menu: { en: 'Browse', fa: 'گشتن' },

  allCategories: { en: 'All categories', fa: 'همهٔ دسته‌ها' },
  everything: { en: 'Everything', fa: 'همه' },
  byCountry: { en: 'BY COUNTRY', fa: 'بر اساس کشور' },
  // Persian does not inflect after a number, so both are جا. Two keys only
  // because English needs them.
  place: { en: 'place', fa: 'جا' },
  places: { en: 'places', fa: 'جا' },

  // the finder
  nearYou: { en: 'Near you', fa: 'نزدیک تو' },
  everywhere: { en: 'Everywhere', fa: 'همه‌جا' },
  showEverywhere: { en: 'Show everywhere', fa: 'همه‌جا را نشان بده' },
  useMyLocation: { en: 'Use my location', fa: 'از موقعیت من استفاده کن' },
  cityPlaceholder: { en: 'Stockholm, Dubai, Gothenburg…', fa: 'استکهلم، دبی، یوتبوری…' },
  searchPlaceholder: { en: 'What are you looking for?', fa: 'دنبال چه می‌گردی؟' },

  // the pitch at the top
  // "making a name for themselves" is a pun that does not cross. نام‌درکردن
  // keeps the sense and loses the play; worth revisiting if a better line
  // turns up.
  // The one word in the headline that lifts. Kept here because it is a
  // different word in each language, and in Persian it is not even in the
  // same position in the sentence.
  knownForEm: { en: 'making', fa: 'نام‌درکردن' },
  knownFor: {
    en: 'Persians are known for making\na name for themselves.',
    fa: 'ایرانی‌ها به نام‌درکردن معروف‌اند.',
  },
  whereToFind: { en: 'Here is where to find them.', fa: 'اینجا پیدایشان می‌کنی.' },

  // listing your own
  runOne: { en: 'Run one of these? Put it on the map.', fa: 'خودت یکی از این‌ها را داری؟ روی نقشه بگذارش.' },
  runOneX: {
    en: 'Send it in, we read every one, and it goes up once approved.',
    fa: 'بفرست؛ همه را می‌خوانیم و بعد از تأیید منتشر می‌شود.',
  },
  listBusiness: { en: 'List a business', fa: 'ثبت کسب‌وکار' },
  nothingYet: { en: 'Nothing here yet. Yours could be the first.', fa: 'هنوز اینجا چیزی نیست. مال تو می‌تواند اولی باشد.' },

  // a single business
  call: { en: 'Call', fa: 'تماس' },
  addressLabel: { en: 'ADDRESS', fa: 'نشانی' },
  hoursLabel: { en: 'HOURS', fa: 'ساعت کار' },
  socialLabel: { en: 'SOCIAL', fa: 'شبکه‌های اجتماعی' },
  nearbyLabel: { en: 'NEARBY', fa: 'همین نزدیکی' },
  notFound: { en: 'Not found.', fa: 'پیدا نشد.' },
  directions: { en: 'Directions', fa: 'مسیر' },
  website: { en: 'Website', fa: 'وبسایت' },
  seeOnMap: { en: 'See it on the map', fa: 'روی نقشه ببین' },
  selfListed: { en: 'This business listed itself on Zand.', fa: 'این کسب‌وکار خودش را در زند ثبت کرده است.' },
};
