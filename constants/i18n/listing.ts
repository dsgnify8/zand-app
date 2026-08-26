// Listing a business, in both languages.
//
// The admin screens stay English — they are read by one person who reads
// English. This one is not: it is the form a shop owner in Tehran or
// Stockholm fills in, and meeting it in English is being told, politely,
// that the app was built for somebody else.
//
// Same conventions as the rest: informal address, relative clauses rather
// than nominal compounds, and labels left impersonal.

import type { T } from '@/lib/i18n';

export const LISTING: Record<string, T> = {
  // the screen
  titleNew: { en: 'List a business', fa: 'ثبت کسب‌وکار' },
  titleEdit: { en: 'Edit listing', fa: 'ویرایش آگهی' },
  tabListing: { en: 'Listing', fa: 'آگهی' },
  tabStats: { en: 'How it is doing', fa: 'چطور پیش می‌رود' },

  // what happens after
  sent: { en: 'Sent for review', fa: 'برای بررسی فرستاده شد' },
  backToLocal: { en: 'Back to Local', fa: 'برگرد به محلی' },
  couldNotSave: { en: 'Could not save.', fa: 'ذخیره نشد.' },

  // where
  whereItIs: { en: 'WHERE IT IS', fa: 'کجاست' },
  useMyLocation: { en: 'Use my current location', fa: 'از موقعیت فعلی‌ام استفاده کن' },
  areaPlaceholder: { en: 'Central Gothenburg, Dubai Marina…', fa: 'مرکز یوتبوری، دبی مارینا…' },
  pinned: { en: 'Pinned', fa: 'روی نقشه ثبت شد' },
  streetAddress: { en: 'Street address (optional)', fa: 'نشانی خیابان (اختیاری)' },
  noLocation: {
    en: 'We could not read your location. You can type the area instead.',
    fa: 'موقعیتت را نتوانستیم بخوانیم. می‌توانی خودت منطقه را بنویسی.',
  },
  noPlace: {
    en: 'We could not find that place. Try a city or district.',
    fa: 'آنجا را پیدا نکردیم. یک شهر یا محله را امتحان کن.',
  },

  // the basics
  nameLabel: { en: 'NAME', fa: 'نام' },
  namePlaceholder: { en: 'What it is called', fa: 'اسمش چیست' },
  categoryLabel: { en: 'CATEGORY', fa: 'دسته' },

  // when it opened
  openedLabel: { en: 'WHEN IT OPENED', fa: 'کی باز شد' },
  // Named rather than left to be guessed at: someone reading Persian
  // has every reason to think a four-digit year means ۱۴۰۴.
  openedHint: {
    en: 'Gregorian year, e.g. 2019.',
    fa: 'سال میلادی، مثلاً ۲۰۱۹. (نه شمسی)',
  },
  openedPlaceholder: { en: '2019', fa: '۲۰۱۹' },
  showOpened: { en: 'Show this on my page', fa: 'روی صفحه‌ام نشان بده' },

  // photos
  coverLabel: { en: 'COVER', fa: 'عکس اصلی' },
  firstIsCover: { en: 'The first one is the cover.', fa: 'اولی می‌شود عکس اصلی.' },

  // about
  aboutLabel: { en: 'ABOUT', fa: 'درباره' },
  aboutPlaceholder: {
    en: 'What you do, and what makes it worth the trip.',
    fa: 'چه کار می‌کنی، و چرا ارزش رفتن دارد.',
  },

  // contact
  contactLabel: { en: 'CONTACT', fa: 'تماس' },
  phone: { en: 'Phone', fa: 'تلفن' },
  website: { en: 'Website', fa: 'وب‌سایت' },
  websiteLabel: {
    en: 'Call it something — Our online store',
    fa: 'یک اسم برایش بگذار — فروشگاه اینترنتی ما',
  },
  whatsapp: { en: 'WhatsApp number', fa: 'شمارهٔ واتساپ' },

  // keywords
  keywordsLabel: { en: 'KEYWORDS', fa: 'کلیدواژه‌ها' },
  keywordsHint: {
    en: 'Up to four. Helps people find you when they search.',
    fa: 'تا چهار تا. کمک می‌کند وقتی جست‌وجو می‌کنند پیدایت کنند.',
  },

  socialLabel: { en: 'SOCIAL', fa: 'شبکه‌های اجتماعی' },

  // the story
  storyLabel: { en: "WHAT'S YOUR STORY?", fa: 'داستانت چیست؟' },
  storyYes: { en: "I'd like to share it", fa: 'دوست دارم تعریفش کنم' },
  storyNote: {
    en: 'Not required, and listing does not depend on it. If there is something worth telling — how it started, who started it, what nearly stopped it — write it here.',
    fa: 'اجباری نیست و ثبت آگهی به آن بستگی ندارد. اگر چیزی هست که ارزش گفتن دارد — اینکه چطور شروع شد، چه کسی شروعش کرد، چه چیزی نزدیک بود متوقفش کند — همین‌جا بنویس.',
  },
  storyPlaceholder: { en: 'Take as long as you like.', fa: 'هر قدر که می‌خواهی بنویس.' },

  // hours
  hoursLabel: { en: 'HOURS', fa: 'ساعت کار' },
  hoursHint: { en: 'Leave a day blank if you are closed.', fa: 'روزی که تعطیلی را خالی بگذار.' },

  // the button
  saveChanges: { en: 'Save changes', fa: 'ذخیرهٔ تغییرات' },
  sendForReview: { en: 'Send for review', fa: 'بفرست برای بررسی' },
};
