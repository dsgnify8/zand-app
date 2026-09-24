// The card at the foot of the home page.
//
// It was always the Hafez fal, which is a lovely thing to be asked once
// and a piece of furniture by the fifth time. These are the same card
// with something else behind it: a question, a table, a word, a book.
//
// Deliberately plain. Every other card on the home page carries a
// photograph, and the pages this points into are the ones with the
// illustrations — the invitation does not need to compete with them.
//
// One of these at a time, changed every second day someone opens the
// app rather than every second day on the calendar. Somebody who comes
// back on Friday should find the card they have not read yet, not the
// one they missed on Tuesday.

export type Invitation = {
  key: string;
  /** The Persian line at the top, in gold. */
  fa: string;
  title: string;
  titleFa: string;
  x: string;
  xFa: string;
  /** The words in the button. */
  cta?: string;
  ctaFa?: string;
  route: string;
};

export const INVITATIONS: Invitation[] = [
  {
    key: 'fal',
    fa: 'فال حافظ',
    title: 'Ask the book a question',
    titleFa: 'از کتاب سؤالی بپرس',
    x: 'Hold something in your heart and open it at random. Iranians have been doing this for six hundred years.',
    xFa: 'چیزی را در دل نگه دار و کتاب را بی‌قصد باز کن. ایرانی‌ها ششصد سال است همین کار را می‌کنند.',
    route: '/literature/reader?author=hafez&page=6',
  },
  {
    key: 'haftseen',
    fa: 'هفت‌سین',
    title: 'Seven things on a table',
    titleFa: 'هفت چیز روی یک سفره',
    x: 'A mirror, a book, a fish, and four more. Every one of them is there for a reason.',
    xFa: 'آینه، کتاب، ماهی و چهار چیز دیگر. هرکدام برای خودش دلیلی دارد.',
    route: '/traditions?t=nowruz',
  },
  {
    key: 'taarof',
    fa: 'تعارف',
    title: 'The offer you must refuse',
    titleFa: 'پیشنهادی که باید ردش کنی',
    x: 'Offering what you will not give. Refusing what you want. Three times, at least.',
    xFa: 'پیشنهاد دادنِ چیزی که قرار نیست بدهی، رد کردنِ چیزی که می‌خواهی. دست‌کم سه بار.',
    route: '/culture/topic?topic=taarof',
  },
  {
    key: 'del',
    fa: 'دل',
    title: 'One word, a whole life',
    titleFa: 'یک کلمه، یک زندگی',
    x: 'Persian runs its entire emotional life through a single organ. Miss someone and your heart goes tight.',
    xFa: 'فارسی تمام زندگی احساسی‌اش را از یک عضو عبور می‌دهد. دلت برای کسی تنگ می‌شود، همین.',
    route: '/culture/topic?topic=del',
  },
  {
    key: 'mehmun',
    fa: 'مهمان',
    title: 'Hospitality as combat',
    titleFa: 'مهمان‌نوازی در قامت نبرد',
    x: 'The guest is beloved of God, you will be fed until you suffer, and you are not permitted to leave.',
    xFa: 'مهمان حبیب خداست؛ آن‌قدر غذا می‌خوری تا به زحمت بیفتی، و اجازهٔ رفتن هم نداری.',
    route: '/culture/topic?topic=mehmun',
  },
  {
    key: 'chai',
    fa: 'چای',
    title: 'The shape of an evening',
    titleFa: 'شکلِ یک عصر',
    x: 'The samovar, the small glass, the sugar held in the teeth. Never a drink. Always an occasion.',
    xFa: 'سماور، استکان کمرباریک، و حبه‌قندی لای دندان. هیچ‌وقت فقط یک نوشیدنی نیست.',
    route: '/culture/topic?topic=chai',
  },
  {
    key: 'javanmardi',
    fa: 'جوانمردی',
    title: 'The house of strength',
    titleFa: 'خانهٔ زور',
    x: 'A thousand year old code, and a pit where men swing clubs while a drummer chants Ferdowsi at them.',
    xFa: 'مرامی هزارساله، و گودی که در آن مردها میل می‌چرخانند و مرشد برایشان شاهنامه می‌خواند.',
    route: '/culture/topic?topic=javanmardi',
  },
  {
    key: 'shahnameh',
    fa: 'شاهنامه',
    title: 'Sixty thousand lines',
    titleFa: 'شصت هزار بیت',
    x: 'One man, thirty years, and the language came out the other side intact.',
    xFa: 'یک مرد، سی سال، و زبانی که از آن سو سالم بیرون آمد.',
    cta: 'READ',
    ctaFa: 'بخوان',
    route: '/literature/reader?author=ferdowsi&page=0',
  },
  {
    key: 'khayyam',
    fa: 'رباعی',
    title: 'Four lines at a time',
    titleFa: 'چهار مصرع، نه بیشتر',
    x: 'An astronomer who measured the year to six decimal places, remembered for quatrains about wine.',
    xFa: 'ستاره‌شناسی که طول سال را تا شش رقم اعشار اندازه گرفت، و به رباعی‌هایی دربارهٔ شراب شناخته می‌شود.',
    cta: 'READ',
    ctaFa: 'بخوان',
    route: '/literature/reader?author=khayyam&page=0',
  },
  {
    key: 'yalda',
    fa: 'یلدا',
    title: 'The longest night',
    titleFa: 'بلندترین شب',
    x: 'Watermelon in the middle of winter, and a room that stays awake until the dark gives in.',
    xFa: 'هندوانه در دلِ زمستان، و اتاقی که تا تسلیم شدنِ تاریکی بیدار می‌ماند.',
    route: '/traditions?t=yalda',
  },
  {
    key: 'language',
    fa: 'زبان',
    title: 'Words you already know',
    titleFa: 'کلمه‌هایی که از قبل بلدی',
    x: 'Paradise, pyjamas, lemon, sugar, candy, bazaar. Persian got there first.',
    xFa: 'بهشت، پیژامه، لیمو، شکر، آب‌نبات، بازار. فارسی زودتر رسیده بود.',
    cta: 'LOOK',
    ctaFa: 'ببین',
    route: '/language',
  },
];

/**
 * Which one to show.
 *
 * The count is of days the app was actually opened, so the card changes
 * on every second visit-day rather than every second date. Steady
 * within a day, and steady for the day after.
 */
export function invitationFor(visitDayCount: number): Invitation {
  const step = Math.floor(Math.max(0, visitDayCount) / 2);
  return INVITATIONS[step % INVITATIONS.length];
}
