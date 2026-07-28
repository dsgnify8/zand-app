# -*- coding: utf-8 -*-
# Adds: question words, transport, months and seasons, formal vs colloquial.
# Refuses to write unless every anchor is found.

p = "constants/curriculum.ts"
s = open(p).read()

if "key: 'questions'" in s:
    print("ABORT: already applied"); raise SystemExit

CODE = '''
/* ------------------------------------------------------------------ */
/* Asking things                                                        */
/* ------------------------------------------------------------------ */

const questions: Lesson = {
  key: 'questions',
  title: 'When, where, what, why, how',
  titleFa: 'پرسیدن',
  blurb: 'Five words that turn statements into questions.',
  minutes: 8,
  steps: [
    { t: 'note', title: 'Persian asks at the end',
      body: 'English moves the words around to make a question: you are going, are you going. Persian usually leaves the sentence exactly as it was and puts the question word in, often near the end. Nothing else has to change, which makes asking things far easier than it is in English.' },
    { t: 'meet', fa: 'چی', tr: 'chi', en: 'what' },
    { t: 'meet', fa: 'کی', tr: 'key', en: 'when' },
    { t: 'meet', fa: 'کجا', tr: 'koj\\u0101', en: 'where' },
    { t: 'meet', fa: 'چرا', tr: 'cher\\u0101', en: 'why' },
    { t: 'meet', fa: 'چطور', tr: 'chetor', en: 'how' },
    { t: 'sense', fa: 'چی', tr: 'chi', en: 'what',
      body: 'Written Persian says che. Everyone speaking says chi. You will see چه on a page and hear چی in the room, and both are the same word. This gap between written and spoken runs through the whole language, and this is the first place you meet it.' },
    { t: 'sentence', fa: 'کی می‌روی؟', tr: 'key miravi?', en: 'when are you going?', focus: 'کی' },
    { t: 'sentence', fa: 'چرا نمی‌آیی؟', tr: 'cher\\u0101 nemi\\u0101yi?', en: 'why are you not coming?', focus: 'چرا' },
    { t: 'note', title: 'chetori is how are you',
      body: 'chetor is how, and chetori is literally how are you. You have been using a question word since the first lesson without knowing it. Persian builds a lot of everyday phrases this way, out of pieces that are still visible if you look.' },
    { t: 'choose', prompt: 'You want to ask where the bazaar is. Which word do you need?',
      answer: 'کجا',
      options: ['کجا', 'کی', 'چرا', 'چطور'],
      optionTrs: { 'کجا': 'koj\\u0101', 'کی': 'key', 'چرا': 'cher\\u0101', 'چطور': 'chetor' },
      why: 'koj\\u0101, where. b\\u0101z\\u0101r koj\\u0101st.' },
    { t: 'build', fa: 'کی می‌روی؟', tr: 'key miravi?', en: 'when are you going?',
      parts: ['کی', 'می‌روی؟', 'کجا', 'چرا'],
      partTrs: { 'کی': 'key', 'می‌روی؟': 'miravi', 'کجا': 'koj\\u0101', 'چرا': 'cher\\u0101' } },
    { t: 'listen', fa: 'چرا نمی‌آیی؟', tr: 'cher\\u0101 nemi\\u0101yi?', en: 'why are you not coming?',
      options: ['چرا نمی‌آیی؟', 'کی می‌روی؟', 'کجاست؟', 'چطوری؟'],
      optionTrs: { 'چرا نمی‌آیی؟': 'cher\\u0101 nemi\\u0101yi?', 'کی می‌روی؟': 'key miravi?', 'کجاست؟': 'koj\\u0101st?', 'چطوری؟': 'chetori?' } },
    { t: 'write', fa: 'کجا', tr: 'koj\\u0101', en: 'where' },
  ],
};

/* ------------------------------------------------------------------ */
/* Getting around                                                       */
/* ------------------------------------------------------------------ */

const transport: Lesson = {
  key: 'transport',
  title: 'Getting around',
  titleFa: 'رفت و آمد',
  blurb: 'Taxis, buses, and telling a driver where to go.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'ماشین', tr: 'm\\u0101shin', en: 'car' },
    { t: 'meet', fa: 'تاکسی', tr: 't\\u0101ksi', en: 'taxi' },
    { t: 'meet', fa: 'اتوبوس', tr: 'otobus', en: 'bus' },
    { t: 'meet', fa: 'مترو', tr: 'metro', en: 'metro' },
    { t: 'note', title: 'Half of these are French',
      body: 'otobus, metro, t\\u0101ksi. Persian took its transport vocabulary from French in the early twentieth century, along with mersi and m\\u0101m\\u0101n. If a modern Persian word sounds European, it usually came through French rather than English.' },
    { t: 'meet', fa: 'فرودگاه', tr: 'forudg\\u0101h', en: 'airport', literal: 'landing-place' },
    { t: 'sense', fa: 'فرودگاه', tr: 'forudg\\u0101h', en: 'airport',
      body: 'forud is descent, g\\u0101h is place. The place of coming down. Persian builds new words out of old Persian pieces rather than borrowing, whenever anyone lets it: d\\u0101neshg\\u0101h, university, is knowledge-place by the same logic.' },
    { t: 'meet', fa: 'بلیت', tr: 'belit', en: 'ticket' },
    { t: 'sentence', fa: 'یک بلیت می‌خواهم', tr: 'yek belit mikh\\u0101ham', en: 'I want one ticket', focus: 'بلیت' },
    { t: 'meet', fa: 'نگه دار', tr: 'negah d\\u0101r', en: 'stop, pull over' },
    { t: 'note', title: 'What to say in a Tehran taxi',
      body: 'negah d\\u0101r is stop here, and it is the phrase you will use most. Shared taxis run fixed routes and you get out wherever you like: you say negah d\\u0101r, lotfan, and the driver pulls over. Add dast-e r\\u0101st, on the right, if you want to be precise.' },
    { t: 'sentence', fa: 'اینجا نگه دار، لطفاً', tr: 'inj\\u0101 negah d\\u0101r, lotfan', en: 'stop here, please', focus: 'نگه دار' },
    { t: 'choose', prompt: 'You are in a taxi and want to get out at the next corner. What do you say?',
      answer: 'اینجا نگه دار، لطفاً',
      options: ['اینجا نگه دار، لطفاً', 'یک بلیت می‌خواهم', 'فرودگاه کجاست؟', 'اتوبوس دور است'],
      optionTrs: { 'اینجا نگه دار، لطفاً': 'inj\\u0101 negah d\\u0101r, lotfan', 'یک بلیت می‌خواهم': 'yek belit mikh\\u0101ham', 'فرودگاه کجاست؟': 'forudg\\u0101h koj\\u0101st?', 'اتوبوس دور است': 'otobus dur ast' },
      why: 'inj\\u0101, here, and negah d\\u0101r, stop. The two words you met in this lesson doing exactly what you need.' },
    { t: 'build', fa: 'اینجا نگه دار', tr: 'inj\\u0101 negah d\\u0101r', en: 'stop here',
      parts: ['اینجا', 'نگه', 'دار', 'بلیت'],
      partTrs: { 'اینجا': 'inj\\u0101', 'نگه': 'negah', 'دار': 'd\\u0101r', 'بلیت': 'belit' } },
    { t: 'listen', fa: 'فرودگاه کجاست؟', tr: 'forudg\\u0101h koj\\u0101st?', en: 'where is the airport?',
      options: ['فرودگاه کجاست؟', 'اینجا نگه دار', 'یک بلیت می‌خواهم', 'مترو نزدیک است'],
      optionTrs: { 'فرودگاه کجاست؟': 'forudg\\u0101h koj\\u0101st?', 'اینجا نگه دار': 'inj\\u0101 negah d\\u0101r', 'یک بلیت می‌خواهم': 'yek belit mikh\\u0101ham', 'مترو نزدیک است': 'metro nazdik ast' } },
    { t: 'write', fa: 'بلیت', tr: 'belit', en: 'ticket' },
  ],
};

/* ------------------------------------------------------------------ */
/* The year                                                             */
/* ------------------------------------------------------------------ */

const seasons: Lesson = {
  key: 'seasons',
  title: 'Seasons and months',
  titleFa: 'فصل‌ها و ماه‌ها',
  blurb: 'A year that begins in spring, and the months nobody else uses.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'بهار', tr: 'bah\\u0101r', en: 'spring' },
    { t: 'meet', fa: 'تابستان', tr: 't\\u0101best\\u0101n', en: 'summer' },
    { t: 'meet', fa: 'پاییز', tr: 'p\\u0101yiz', en: 'autumn' },
    { t: 'meet', fa: 'زمستان', tr: 'zemest\\u0101n', en: 'winter' },
    { t: 'sense', fa: 'تابستان', tr: 't\\u0101best\\u0101n', en: 'summer',
      body: 'Look at the ending on two of them: t\\u0101best\\u0101n and zemest\\u0101n. That -st\\u0101n means place of, the same ending in Afgh\\u0101nist\\u0101n, T\\u0101jikist\\u0101n and Golest\\u0101n, the place of flowers. Summer is the place of heat, winter the place of cold.' },
    { t: 'note', title: 'The year opens in spring',
      body: 'The Iranian year begins at the spring equinox, not in January. bah\\u0101r is the first season, not the second, and Farvardin is the first month. When Iranians talk about the start of the year they mean the moment the earth tilts, which is a more defensible place to begin than an arbitrary winter night.' },
    { t: 'meet', fa: 'فروردین', tr: 'Farvardin', en: 'the first month', literal: 'late March to late April' },
    { t: 'meet', fa: 'اسفند', tr: 'Esfand', en: 'the last month', literal: 'late February to late March' },
    { t: 'note', title: 'The months are Zoroastrian',
      body: 'Every Iranian month is named after a Zoroastrian divine being: Farvardin for the guardian spirits of the dead, Ordibehesht for best truth, Mehr for the god of covenant and light. This calendar has been running for well over a thousand years, and every date written in Iran still carries those names.' },
    { t: 'meet', fa: 'ماه', tr: 'm\\u0101h', en: 'month, moon' },
    { t: 'sense', fa: 'ماه', tr: 'm\\u0101h', en: 'moon and month',
      body: 'One word for both, as in English month and moon, and for the same reason: months were moons. m\\u0101h is also what you call someone beautiful. Telling a person they are a moon is an ordinary compliment in Persian, not a poetic flourish.' },
    { t: 'sentence', fa: 'بهار خیلی قشنگ است', tr: 'bah\\u0101r kheyli ghashang ast', en: 'spring is very beautiful', focus: 'بهار' },
    { t: 'choose', prompt: 'Which season does the Iranian year start in?',
      answer: 'بهار',
      options: ['بهار', 'زمستان', 'تابستان', 'پاییز'],
      optionTrs: { 'بهار': 'bah\\u0101r', 'زمستان': 'zemest\\u0101n', 'تابستان': 't\\u0101best\\u0101n', 'پاییز': 'p\\u0101yiz' },
      why: 'bah\\u0101r, spring. Nowruz falls on the equinox and the new year begins at that exact moment.' },
    { t: 'listen', fa: 'زمستان سرد است', tr: 'zemest\\u0101n sard ast', en: 'winter is cold',
      options: ['زمستان سرد است', 'بهار قشنگ است', 'تابستان داغ است', 'پاییز'],
      optionTrs: { 'زمستان سرد است': 'zemest\\u0101n sard ast', 'بهار قشنگ است': 'bah\\u0101r ghashang ast', 'تابستان داغ است': 't\\u0101best\\u0101n d\\u0101gh ast', 'پاییز': 'p\\u0101yiz' } },
    { t: 'write', fa: 'بهار', tr: 'bah\\u0101r', en: 'spring' },
  ],
};

/* ------------------------------------------------------------------ */
/* Written Persian and spoken Persian                                   */
/* ------------------------------------------------------------------ */

const colloquial: Lesson = {
  key: 'colloquial',
  title: 'What books say, what people say',
  titleFa: 'رسمی و محاوره‌ای',
  blurb: 'The gap between written Persian and the Persian you will hear.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'Two Persians, and you need both',
      body: 'Persian is written one way and spoken another, and the difference is bigger than in English. A newspaper says mitav\\u0101nam. A person says mitunam. Neither is wrong. If you only learn the written form you will read well and understand nobody; if you only learn the spoken form you cannot read a sign. The good news is that the changes follow patterns.' },
    { t: 'meet', fa: 'می‌توانم', tr: 'mitav\\u0101nam', en: 'I can', literal: 'written form' },
    { t: 'meet', fa: 'می‌تونم', tr: 'mitunam', en: 'I can', literal: 'spoken form' },
    { t: 'sense', fa: 'می‌تونم', tr: 'mitunam', en: 'I can',
      body: 'The pattern: \\u0101n in the middle of a word collapses to un. mitav\\u0101nam becomes mitunam. kh\\u0101ne becomes khune, house. n\\u0101n becomes nun, bread. Once you know this one rule you can decode a great deal of spoken Persian that looked unfamiliar.' },
    { t: 'meet', fa: 'خانه', tr: 'kh\\u0101ne', en: 'house', literal: 'written; spoken khune' },
    { t: 'meet', fa: 'می‌روم', tr: 'miravam', en: 'I go', literal: 'written; spoken miram' },
    { t: 'note', title: 'The other pattern: things fall out',
      body: 'Spoken Persian drops sounds. miravam loses its v and becomes miram. ast at the end of a sentence shrinks to a single e: khubast becomes khube. Persian in the mouth is faster and shorter than Persian on the page, in every direction.' },
    { t: 'meet', fa: 'باشه', tr: 'b\\u0101she', en: 'okay, fine', literal: 'let it be' },
    { t: 'sense', fa: 'باشه', tr: 'b\\u0101she', en: 'okay',
      body: 'Written b\\u0101shad, spoken b\\u0101she, and it means let it be, so fine, alright, agreed. You will hear it constantly, ending conversations and settling plans. It is the single most useful colloquial word in Persian.' },
    { t: 'choose', prompt: 'You hear someone say khune. What are they saying?',
      answer: 'خانه',
      options: ['خانه', 'خوب', 'خون', 'کجا'],
      optionTrs: { 'خانه': 'kh\\u0101ne, house', 'خوب': 'khub, good', 'خون': 'khun, blood', 'کجا': 'koj\\u0101, where' },
      why: 'kh\\u0101ne spoken aloud becomes khune. The \\u0101n to un rule again, the same one behind mitunam.' },
    { t: 'choose', prompt: 'A friend says b\\u0101she at the end of a plan. What did they mean?',
      answer: 'Alright, agreed',
      options: ['Alright, agreed', 'Where are you', 'I do not understand', 'Thank you'],
      why: 'b\\u0101she, from b\\u0101shad, let it be. It closes the matter.' },
    { t: 'listen', fa: 'باشه', tr: 'b\\u0101she', en: 'okay',
      options: ['باشه', 'خانه', 'می‌تونم', 'کجا'],
      optionTrs: { 'باشه': 'b\\u0101she', 'خانه': 'kh\\u0101ne', 'می‌تونم': 'mitunam', 'کجا': 'koj\\u0101' } },
    { t: 'note', title: 'How to hold both',
      body: 'Read the written form so you can handle a book, a sign or a message. Say the spoken form so you sound like a person rather than a document. Every lesson in this app gives you the written Persian and tells you what it becomes in the mouth, and after a while you stop noticing you are doing two things at once.' },
    { t: 'write', fa: 'باشه', tr: 'b\\u0101she', en: 'okay' },
  ],
};

'''

ENTRIES = '''  {
    key: 'questions',
    roman: 'XI',
    title: 'Asking things',
    titleFa: 'پرسیدن',
    blurb: 'When, where, what, why and how.',
    level: 'elementary',
    lessons: [questions],
  },
  {
    key: 'transport',
    roman: 'XII',
    title: 'Getting around',
    titleFa: 'رفت و آمد',
    blurb: 'Taxis, tickets, and telling a driver where to stop.',
    level: 'elementary',
    lessons: [transport],
  },
  {
    key: 'seasons',
    roman: 'XIII',
    title: 'The year',
    titleFa: 'سال',
    blurb: 'Seasons, months, and a calendar that starts in spring.',
    level: 'elementary',
    lessons: [seasons],
  },
  {
    key: 'colloquial',
    roman: 'XIV',
    title: 'Written and spoken',
    titleFa: 'رسمی و محاوره‌ای',
    blurb: 'The gap between the page and the room.',
    level: 'intermediate',
    lessons: [colloquial],
  },
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS not found"); raise SystemExit
s = s.replace(anchor, CODE.replace("\\\\u", "\\u") + "\n" + anchor)

mark = "    lessons: [conversation],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: conversation entry not found"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + ENTRIES + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'questions'" in s, "key: 'transport'" in s, "key: 'seasons'" in s, "key: 'colloquial'" in s)
