// Hamdeli, in both languages.
//
// The Persian is written rather than translated. "Anything is something"
// has no literal Persian that is not clumsy, so the Persian line says the
// thing a Persian speaker would actually say: کم و زیادش مهم نیست.

export const HAMDELI = {
  // English readers get the meaning, Persian readers get the word.
  // همدلی is one-heartedness, which no single English word carries,
  // so the English side says what it does rather than transliterating.
  title:      { en: 'Hand in Hand', fa: 'همدلی' },
  glyph:      { en: 'همدلی', fa: 'همدلی' },
  // One line under the title, the way Nowruz has one. The fuller intro
  // follows as its own paragraph.
  sub: {
    en: 'People doing quiet, difficult work, chosen one by one.',
    fa: 'آدم‌هایی که کار سخت و بی‌سروصدا می‌کنند، یکی‌یکی انتخاب‌شده.',
  },
  bigger:     { en: 'Make a bigger difference.', fa: 'تأثیر بزرگ‌تری بگذار.' },
  meet:       { en: 'meet them', fa: 'ببینشان' },

  // Exposure is the point, and saying so is what keeps the section
  // honest: most readers are outside Iran and cannot adopt a dog in
  // Tehran or join an Iranian society. Attention they can give.
  intro: {
    en: 'People and organisations doing quiet, difficult work in Iran and across the diaspora, chosen one by one. The point is that they are seen. Follow them, share them, send them to someone closer than you are. Nothing here is an advertisement and nothing is paid for.',
    fa: 'آدم‌ها و سازمان‌هایی که در ایران و میان ایرانیان جهان، کار سخت و بی‌سروصدا می‌کنند. یکی‌یکی انتخابشان کرده‌ایم. مهم این است که دیده شوند. دنبالشان کن، معرفی‌شان کن، یا برای کسی بفرست که از تو نزدیک‌تر است. اینجا نه تبلیغ است و نه کسی بابتش پولی داده.',
  },
  anything: {
    en: 'Anything is something.',
    fa: 'کم و زیادش مهم نیست.',
  },

  // On a profile.
  whatHelps:  { en: 'What helps', fa: 'چه کمکی به کار می‌آید' },
  watch:      { en: 'Watch', fa: 'تماشا' },
  // Said before the tap, so leaving the app is never a surprise.
  opensIg:    { en: 'Opens in Instagram', fa: 'در اینستاگرام باز می‌شود' },
  // Not "Share": the thing being passed on is a person, not a link.
  share:      { en: 'Pass this on', fa: 'معرفی‌شان کن' },
  openIg:     { en: 'Instagram', fa: 'اینستاگرام' },
  openWeb:    { en: 'Website', fa: 'وب‌سایت' },
  donate:     { en: 'Donate', fa: 'کمک مالی' },
  // Said plainly, because a reader handing over money deserves to know
  // exactly where it goes and who is holding it.
  donateNote: {
    en: 'Donations go directly to them. ZAND takes nothing and handles no money.',
    fa: 'کمک‌ها مستقیم به خودشان می‌رسد. زند چیزی برنمی‌دارد و پولی جابه‌جا نمی‌کند.',
  },

  // Kinds.
  animals:    { en: 'Animals', fa: 'حیوانات' },
  people:     { en: 'People', fa: 'مردم' },
  children:   { en: 'Children', fa: 'کودکان' },
  other:      { en: 'Other', fa: 'دیگر' },

  empty: {
    en: 'The first profiles are being chosen. Come back soon.',
    fa: 'داریم نخستین پروفایل‌ها را انتخاب می‌کنیم. به‌زودی سر بزن.',
  },
} as const;
