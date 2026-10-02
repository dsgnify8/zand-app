// The screens someone lands on from a shared link.
//
// Written for a stranger. Whoever taps an invitation may never have
// opened ZAND before, so nothing here assumes they know what a folder is
// or who we are.

export const HANDOFF = {
  connecting:   { en: 'Connecting you', fa: 'در حال وصل کردن' },
  connected:    { en: 'You are connected', fa: 'وصل شدید' },
  connectedX: {
    en: 'You and {name} can send each other words, places and poems now.',
    fa: 'تو و {name} از این به بعد می‌توانید برای هم واژه، جا و شعر بفرستید.',
  },
  asked:        { en: 'Invitation sent', fa: 'دعوت فرستاده شد' },
  askedX: {
    en: 'We have told {name} you would like to connect.',
    fa: 'به {name} گفتیم که می‌خواهی وصل شوی.',
  },
  ownLink:      { en: 'That is your own invitation', fa: 'این دعوت خودت است' },
  ownLinkX: {
    en: 'Send it to somebody else and it will bring them here.',
    fa: 'برای کسی دیگر بفرست تا او را به اینجا بیاورد.',
  },
  needAccount:  { en: 'One moment', fa: 'یک لحظه' },
  needAccountX: {
    en: 'Make an account and the invitation will be waiting.',
    fa: 'حساب بساز و دعوت همان‌جا منتظرت است.',
  },

  folderOpening: { en: 'Opening the folder', fa: 'در حال باز کردن پوشه' },
  folderGone:    { en: 'That folder is not there', fa: 'آن پوشه پیدا نشد' },
  folderGoneX: {
    en: 'The link may have been withdrawn. Ask for a new one.',
    fa: 'شاید پیوند پس گرفته شده باشد. یکی تازه بخواه.',
  },

  listingOpening: { en: 'Opening', fa: 'در حال باز کردن' },
  listingGone:    { en: 'That place is not listed', fa: 'آن جا در فهرست نیست' },
  listingGoneX: {
    en: 'It may have come down. Have a look at what else is nearby.',
    fa: 'شاید برداشته شده باشد. ببین دیگر چه چیزی این نزدیکی است.',
  },

  lost:  { en: 'Nothing here', fa: 'اینجا چیزی نیست' },
  lostX: { en: 'Taking you back.', fa: 'برمی‌گردانیمت.' },

  someone:  { en: 'they', fa: 'او' },

  goOn:     { en: 'Go on', fa: 'برو' },
  toLocal:  { en: 'Open Local', fa: 'محلی را باز کن' },
  makeOne:  { en: 'Make an account', fa: 'حساب بساز' },
} as const;
