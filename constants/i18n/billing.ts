// The words on the one screen where money is mentioned.
//
// Nothing about a fee appears anywhere else in the app: not on the Local
// tab, not on the form, not in the menu. Somebody filling in a listing
// finds out what it costs at the moment they finish it, and not before.

export const BILLING = {
  title:        { en: 'Subscribe to go live', fa: 'برای انتشار، اشتراک بگیر' },
  lead: {
    en: 'Submit your listing to be in the ZAND directory.',
    fa: 'آگهی‌ات را بفرست تا در فهرست زند قرار بگیرد.',
  },

  stepNowT:     { en: 'Today', fa: 'امروز' },
  stepNowX:     { en: 'We approve your listing. Nothing to pay.', fa: 'آگهی‌ات را تأیید می‌کنیم. چیزی پرداخت نمی‌کنی.' },
  stepWarnT:    { en: 'In 7 days', fa: 'تا هفت روز دیگر' },
  stepWarnX:    { en: 'The free week ends.', fa: 'هفته‌ی رایگان تمام می‌شود.' },
  stepPayT:     { en: 'Then', fa: 'و بعد' },
  stepPayX:     { en: '$7.99 a month, for as long as the listing is up.', fa: 'ماهی ۷٫۹۹ دلار، تا وقتی آگهی روی سایت است.' },

  start:        { en: 'Start the free week', fa: 'شروع هفته‌ی رایگان' },
  notNow:       { en: 'Not now', fa: 'حالا نه' },
  restore:      { en: 'Restore purchase', fa: 'بازیابی خرید' },

  // Apple requires the price, the period and the renewal in plain words
  // at the point of purchase, with both links. This is that line.
  legal: {
    en: '$7.99 per month after the free week. Renews until cancelled. Cancel anytime in Settings.',
    fa: 'پس از هفته‌ی رایگان، ماهی ۷٫۹۹ دلار. تا زمانی که لغو نکنی تمدید می‌شود. هر وقت بخواهی از تنظیمات لغو می‌شود.',
  },
  terms:        { en: 'Terms', fa: 'شرایط' },
  privacy:      { en: 'Privacy', fa: 'حریم خصوصی' },

  busy:         { en: 'One moment', fa: 'یک لحظه' },
  failed:       { en: 'That did not go through. Nothing was charged.', fa: 'انجام نشد. چیزی از حسابت کم نشده.' },
  restored:     { en: 'Found it. Your listing is covered.', fa: 'پیدا شد. آگهی‌ات پوشش دارد.' },
  nothingToRestore: { en: 'Nothing to restore on this Apple ID.', fa: 'با این اپل آی‌دی چیزی برای بازیابی نیست.' },

  // On the owner's own listing page.
  manage:       { en: 'Manage subscription', fa: 'مدیریت اشتراک' },
  trialing:     { en: 'Free week', fa: 'هفته‌ی رایگان' },
  paid:         { en: 'Active', fa: 'فعال' },
} as const;
