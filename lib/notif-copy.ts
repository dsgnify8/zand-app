// What the app says when it interrupts someone.
//
// One place for every notification's words, because they are the part
// people actually experience and they should be written, not assembled.
//
// Three rules the shape of this file enforces:
//
//   Variants. Each kind holds several wordings and rotates through them,
//   so the same sentence never arrives twice running. A notification you
//   have read before is one you stop reading.
//
//   Both languages, always. A Persian reader getting an English push is
//   worse than getting none.
//
//   Additive. A new part of the app adds a kind here and the scheduling
//   picks it up — nobody has to remember to write copy later, because
//   the copy is the first thing that exists.

import { getLang } from '@/lib/i18n';

export type Kind =
  | 'firstLesson'
  | 'streakAtRisk'
  | 'midChapter'
  | 'dormant'
  | 'friendSent'
  | 'nearYou'
  | 'chapterDone';

type Line = { title: string; body: string };
type Variant = { en: Line; fa: Line };

/** Filled from context: {name}, {thing}, {days}, {place}, {count}. */
const COPY: Record<Kind, Variant[]> = {
  // Once, ever, the evening after someone finishes their first lesson.
  firstLesson: [
    {
      en: { title: 'First one done', body: 'You have started. Tomorrow, the letters start joining up.' },
      fa: { title: 'اولی تمام شد', body: 'شروع کردی. فردا، حرف‌ها به هم می‌چسبند.' },
    },
    {
      en: { title: 'That is one', body: 'The hard part was opening it. The rest is easier.' },
      fa: { title: 'یکی شد', body: 'سخت‌ترین کار، باز کردنش بود. باقی‌اش آسان‌تر است.' },
    },
    {
      en: { title: 'You have begun', body: 'A few minutes a day is genuinely enough.' },
      fa: { title: 'شروع کرده‌ای', body: 'روزی چند دقیقه، واقعاً کافی است.' },
    },
  ],

  // A chapter finished. Quiet praise, and the next thing named.
  chapterDone: [
    {
      en: { title: '{thing}, finished', body: 'There is more where that came from.' },
      fa: { title: '{thing} تمام شد', body: 'از همین‌ها باز هم هست.' },
    },
    {
      en: { title: 'Through {thing}', body: 'The next one picks up where it left off.' },
      fa: { title: '{thing} را تمام کردی', body: 'بعدی از همان‌جا ادامه می‌دهد.' },
    },
  ],

  // Only for a streak of three or more, and only if they have not
  // opened the app by evening.
  streakAtRisk: [
    {
      en: { title: 'Your streak is at {days} days', body: 'A few minutes keeps it.' },
      fa: { title: 'رشته‌ات به {days} روز رسیده', body: 'چند دقیقه نگهش می‌دارد.' },
    },
    {
      en: { title: '{days} days so far', body: 'Tonight would make it {next}.' },
      fa: { title: 'تا اینجا {days} روز', body: 'امشب می‌شود {next}.' },
    },
    {
      en: { title: 'Still {days} days', body: 'One word would do it.' },
      fa: { title: 'هنوز {days} روز', body: 'یک واژه هم کافی است.' },
    },
  ],

  // Something left unfinished a few days ago.
  midChapter: [
    {
      en: { title: 'You were reading {thing}', body: 'It is still where you left it.' },
      fa: { title: 'داشتی {thing} را می‌خواندی', body: 'همان‌جا که گذاشتی، منتظر است.' },
    },
    {
      en: { title: '{thing}, half read', body: 'Ten minutes finishes it.' },
      fa: { title: '{thing}، نیمه‌خوانده', body: 'ده دقیقه تمامش می‌کند.' },
    },
    {
      en: { title: 'Back to {thing}?', body: 'You stopped somewhere interesting.' },
      fa: { title: 'برگردیم به {thing}؟', body: 'جای خوبی ایستادی.' },
    },
  ],

  // Downloaded, did nothing. Weekly at the very most.
  dormant: [
    {
      en: { title: 'Something to start with', body: 'Five minutes on Hafez, or the letters. Whichever suits tonight.' },
      fa: { title: 'از یک جا شروع کن', body: 'پنج دقیقه با حافظ، یا با الفبا. هرکدام امشب بهتر است.' },
    },
    {
      en: { title: 'Thirty two letters', body: 'That is the whole alphabet. It takes a week.' },
      fa: { title: 'سی و دو حرف', body: 'کل الفبا همین است. یک هفته وقت می‌برد.' },
    },
    {
      en: { title: 'One word a day', body: 'Start with دل. Everything else is built from it.' },
      fa: { title: 'روزی یک واژه', body: 'با «دل» شروع کن. باقی همه از آن ساخته شده.' },
    },
  ],

  // Needs the server: the device cannot know until it is told.
  friendSent: [
    {
      en: { title: '{name} sent you {thing}', body: 'They thought you would like it.' },
      fa: { title: '{name} برایت {thing} فرستاد', body: 'فکر کرد خوشت بیاید.' },
    },
    {
      en: { title: 'Something from {name}', body: '{thing} — waiting for you.' },
      fa: { title: 'چیزی از {name}', body: '{thing} — منتظر توست.' },
    },
  ],

  // Also needs the server: it knows the city and what is new in it.
  nearYou: [
    {
      en: { title: '{count} new places in {place}', body: 'Worth a look this week.' },
      fa: { title: '{count} جای تازه در {place}', body: 'این هفته ارزش سر زدن دارد.' },
    },
    {
      en: { title: 'New in {place}', body: '{count} Iranian places added since you last looked.' },
      fa: { title: 'تازه در {place}', body: 'از آخرین باری که سر زدی، {count} جای ایرانی اضافه شده.' },
    },
  ],
};

/**
 * A wording for this kind, in the reader's language.
 *
 * Rotated by the day rather than at random, so two people opening the
 * same notification see the same words and nobody sees one sentence
 * twice in a week. `seed` separates otherwise-identical sends — two
 * friends sending on the same day should not read identically.
 */
export function notifCopy(
  kind: Kind,
  fill: Record<string, string | number> = {},
  seed = 0,
): Line {
  const set = COPY[kind];
  const day = Math.floor(Date.now() / 86400000);
  const v = set[(day + seed) % set.length];
  const line = getLang() === 'fa' ? v.fa : v.en;

  const put = (t: string) =>
    Object.entries(fill).reduce(
      (out, [k, val]) => out.replace(new RegExp('\\{' + k + '\\}', 'g'), String(val)),
      t,
    );

  return { title: put(line.title), body: put(line.body) };
}

/** For the settings screen, and for anything that wants to preview. */
export function notifKinds(): Kind[] {
  return Object.keys(COPY) as Kind[];
}
