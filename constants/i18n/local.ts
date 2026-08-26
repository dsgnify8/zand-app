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
  newlyOpened: { en: 'NEWLY OPENED', fa: 'تازه‌بازشده‌ها' },
  justAdded: { en: 'JUST ADDED', fa: 'تازه‌ها' },
  seeAll: { en: 'SEE ALL', fa: 'همه' },
  closestTo: { en: 'CLOSEST TO', fa: 'نزدیک‌ترین‌ها به' },
  newestHere: { en: 'JUST ADDED', fa: 'تازه اضافه‌شده‌ها' },

  everythingSaved: { en: 'EVERYTHING SAVED', fa: 'همهٔ ذخیره‌شده‌ها' },
  folderEmpty: { en: 'Nothing in this folder yet.', fa: 'هنوز چیزی در این پوشه نیست.' },
  savedNoAccount: { en: 'Saved on this phone', fa: 'روی همین گوشی ذخیره شد' },
  foldersNeedAccount: {
    en: 'Folders need an account, so they follow you to another phone.',
    fa: 'برای ساختن پوشه باید حساب داشته باشی تا روی گوشی دیگر هم همراهت بیاید.',
  },
  signIn: { en: 'Sign in', fa: 'ورود' },
  shareWithFriend: { en: 'Share with a friend', fa: 'با یک دوست' },
  shareLinkShort: { en: 'Send a link', fa: 'فرستادن لینک' },
  justYou: { en: 'just you', fa: 'فقط خودت' },
  keepThis: { en: 'keep this', fa: 'نفر این را دارند' },
  deleteFolder: { en: 'Delete folder', fa: 'حذف پوشه' },
  deleteFolderX: { en: 'What is in it stays saved.', fa: 'چیزهایی که داخلش است ذخیره می‌ماند.' },
  deleteFolderShared: {
    en: 'This folder is shared. Deleting it removes it for everyone in it. What is in it stays saved for each of you.',
    fa: 'این پوشه مشترک است. با حذفش برای همه پاک می‌شود. چیزهایی که داخلش است برای هرکدام ذخیره می‌ماند.',
  },
  leaveFolder: { en: 'Leave this folder', fa: 'از این پوشه بیرون بیا' },
  leaveFolderX: {
    en: 'It stays with whoever else is in it. You can be added again.',
    fa: 'پوشه برای بقیه می‌ماند. دوباره هم می‌توانند اضافه‌ات کنند.',
  },
  cancel: { en: 'Cancel', fa: 'بی‌خیال' },
  shareFolder: { en: 'Share', fa: 'هم‌رسانی' },
  shareFolderX: {
    en: 'They keep the same folder, not a copy — whatever either of you adds, both see.',
    fa: 'همان پوشه را با هم دارید، نه یک کپی؛ هرچه هرکدام اضافه کند، دیگری هم می‌بیند.',
  },
  alreadyIn: { en: 'in', fa: 'دارد' },
  noFriendsYet: { en: 'Add a friend first.', fa: 'اول یک دوست اضافه کن.' },
  saveTo: { en: 'Save to', fa: 'ذخیره در' },
  newFolder: { en: 'New folder', fa: 'پوشهٔ جدید' },
  folderName: { en: 'Name it', fa: 'نام‌گذاری' },
  savedAnyway: { en: 'Saved either way — folders are optional.', fa: 'در هر صورت ذخیره شد؛ ایجاد پوشه اختیاری است.' },
  savedTitle: { en: 'Saved', fa: 'ذخیره‌شده‌ها' },
  nothingSaved: { en: 'Nothing saved yet', fa: 'هنوز چیزی ذخیره نکرده‌ای' },
  nothingSavedX: { en: 'Tap the bookmark on any listing to keep it here.', fa: 'روی نشان کتاب هر کسب‌وکاری بزن تا اینجا بماند.' },
  browseLocal: { en: 'Browse Local', fa: 'گشتی بزن' },

  // browsing
  localHome: { en: 'Local home', fa: 'خانهٔ محلی' },
  localHomeX: { en: 'back to the feed', fa: 'برگرد به صفحهٔ اصلی' },
  byCityTitle: { en: 'By city', fa: 'بر اساس شهر' },
  byCityX: { en: 'every place, gathered by where it is', fa: 'همه‌جا، بر اساس شهر' },
  byCountryTitle: { en: 'By country', fa: 'بر اساس کشور' },
  byCountryX: { en: 'every place, gathered by where it is', fa: 'همه‌جا، بر اساس کشور' },
  pickACategory: { en: 'Pick a category to see everywhere it exists.', fa: 'یک دسته انتخاب کن تا همه‌جای دنیا را ببینی.' },
  byCategoryTitle: { en: 'By category', fa: 'بر اساس دسته' },
  byCategoryX: { en: 'restaurants, cafés, everything else', fa: 'رستوران، کافه، و بقیه' },
  listBusinessX: { en: 'yours, on the map', fa: 'مال تو، روی نقشه' },
  chooseYourPlace: { en: 'CHOOSE YOUR PLACE', fa: 'کشورت را انتخاب کن' },
  menu: { en: 'Browse', fa: 'گشتن' },

  categories: { en: 'Categories', fa: 'دسته‌ها' },
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
