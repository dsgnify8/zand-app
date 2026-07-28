# -*- coding: utf-8 -*-
# Adds three units to the curriculum: verbs (the present tense), describing
# things, and time. Refuses to write unless every anchor is found.

p = "constants/curriculum.ts"
s = open(p).read()

if "key: 'verbs'" in s:
    print("ABORT: already applied"); raise SystemExit

UNITS_CODE = '''
/* ------------------------------------------------------------------ */
/* UNIT V — verbs, and the endings that run the whole language         */
/* ------------------------------------------------------------------ */

const verbsBeing: Lesson = {
  key: 'verbs-being',
  title: 'To be, and to have',
  titleFa: 'بودن و داشتن',
  blurb: 'The two verbs holding up every sentence you will make.',
  minutes: 8,
  steps: [
    { t: 'note', title: 'Persian verbs are regular, and that is the gift',
      body: 'English has am, is, are, was, were. Persian has one set of endings that attach to almost every verb, almost always. Learn the six endings once and you can conjugate verbs you have never seen. This is the single biggest thing standing between you and speaking.' },
    { t: 'meet', fa: 'هستم', tr: 'hastam', en: 'I am' },
    { t: 'meet', fa: 'هستی', tr: 'hasti', en: 'you are' },
    { t: 'meet', fa: 'هست', tr: 'hast', en: 'he is, she is, it is' },
    { t: 'sense', fa: 'هستم', tr: 'hastam', en: 'I am',
      body: 'Look at the ends: hast-AM, hast-I, hast. That -am is I, the -i is you, and nothing on the end means he, she or it. Those same three endings will appear on every verb in this unit and every verb after it.' },
    { t: 'meet', fa: 'ایرانی', tr: '\\u012Br\\u0101ni', en: 'Iranian' },
    { t: 'sentence', fa: 'من ایرانی هستم', tr: 'man \\u012Br\\u0101ni hastam', en: 'I am Iranian', focus: 'هستم' },
    { t: 'note', title: 'You do not need the man',
      body: 'man \\u012Br\\u0101ni hastam is I Iranian am. But the -am already says I, so \\u012Br\\u0101ni hastam is complete on its own. Persian drops the pronoun constantly, because the ending has already told you who is speaking. You add man back only for emphasis: as for ME, I am Iranian.' },
    { t: 'meet', fa: 'دارم', tr: 'd\\u0101ram', en: 'I have' },
    { t: 'meet', fa: 'داری', tr: 'd\\u0101ri', en: 'you have' },
    { t: 'meet', fa: 'دارد', tr: 'd\\u0101rad', en: 'he has, she has' },
    { t: 'sense', fa: 'دارم', tr: 'd\\u0101ram', en: 'I have',
      body: 'Same endings again. d\\u0101r is the stem, and -am, -i, -ad ride on the back of it. In speech d\\u0101rad flattens to d\\u0101re, which is what you will actually hear.' },
    { t: 'choose', prompt: 'Which one means you have?',
      answer: 'داری',
      options: ['داری', 'دارم', 'دارد', 'هستم'],
      optionTrs: { 'داری': 'd\\u0101ri', 'دارم': 'd\\u0101ram', 'دارد': 'd\\u0101rad', 'هستم': 'hastam' },
      why: 'The -i ending is you. It never changes, on any verb.' },
    { t: 'build', fa: 'من ایرانی هستم', tr: 'man \\u012Br\\u0101ni hastam', en: 'I am Iranian',
      parts: ['من', 'ایرانی', 'هستم', 'داری'],
      partTrs: { 'من': 'man', 'ایرانی': '\\u012Br\\u0101ni', 'هستم': 'hastam', 'داری': 'd\\u0101ri' } },
    { t: 'listen', fa: 'من ایرانی هستم', tr: 'man \\u012Br\\u0101ni hastam', en: 'I am Iranian',
      options: ['من ایرانی هستم', 'تو ایرانی هستی', 'من دارم', 'او دارد'],
      optionTrs: { 'من ایرانی هستم': 'man \\u012Br\\u0101ni hastam', 'تو ایرانی هستی': 'to \\u012Br\\u0101ni hasti', 'من دارم': 'man d\\u0101ram', 'او دارد': 'u d\\u0101rad' } },
    { t: 'write', fa: 'هستم', tr: 'hastam', en: 'I am' },
  ],
};

const verbsDoing: Lesson = {
  key: 'verbs-doing',
  title: 'Going, eating, wanting',
  titleFa: 'فعل‌ها',
  blurb: 'Real verbs, and the mi- that makes them present.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'One prefix, and you are in the present',
      body: 'Persian marks the present tense with mi- on the front. Take the stem, put mi- before it and the ending after it, and you have a working verb. mi + rav + am = miravam, I go. That pattern does not change.' },
    { t: 'meet', fa: 'می‌روم', tr: 'miravam', en: 'I go' },
    { t: 'meet', fa: 'می‌روی', tr: 'miravi', en: 'you go' },
    { t: 'meet', fa: 'می‌رود', tr: 'miravad', en: 'he goes, she goes' },
    { t: 'note', title: 'What people actually say',
      body: 'Written Persian says miravam. Spoken Persian says miram. The v drops out and the word shortens: miram, miri, mire. Every Iranian you meet will use the short form, and every book will use the long one. Learn both and you can read and talk.' },
    { t: 'meet', fa: 'می‌خورم', tr: 'mikhoram', en: 'I eat' },
    { t: 'sentence', fa: 'نان می‌خورم', tr: 'n\\u0101n mikhoram', en: 'I eat bread', focus: 'می‌خورم' },
    { t: 'sense', fa: 'نان می‌خورم', tr: 'n\\u0101n mikhoram', en: 'I eat bread',
      body: 'Object first, verb last. Bread I eat. You met this in unit three and it will hold for every sentence you build: whatever is being done to, comes before the doing.' },
    { t: 'meet', fa: 'می‌خواهم', tr: 'mikh\\u0101ham', en: 'I want' },
    { t: 'note', title: 'The most useful verb in the language',
      body: 'mikh\\u0101ham is I want, and in speech it becomes mikh\\u0101m. Put it in front of anything: mikh\\u0101m ch\\u0101y, I want tea. It is the fastest way to be understood in a shop, a taxi or a kitchen, and it does not require you to know any other verb.' },
    { t: 'sentence', fa: 'چای می‌خواهم', tr: 'ch\\u0101y mikh\\u0101ham', en: 'I want tea', focus: 'می‌خواهم' },
    { t: 'choose', prompt: 'How do you say I want water?',
      answer: 'آب می‌خواهم',
      options: ['آب می‌خواهم', 'می‌خواهم آب', 'آب می‌خورم', 'آب دارم'],
      optionTrs: { 'آب می‌خواهم': '\\u0101b mikh\\u0101ham', 'می‌خواهم آب': 'mikh\\u0101ham \\u0101b', 'آب می‌خورم': '\\u0101b mikhoram', 'آب دارم': '\\u0101b d\\u0101ram' },
      why: 'The thing wanted comes first, the verb last. \\u0101b mikhoram would be I drink water, which is also correct Persian but a different sentence.' },
    { t: 'build', fa: 'چای می‌خواهم', tr: 'ch\\u0101y mikh\\u0101ham', en: 'I want tea',
      parts: ['چای', 'می‌خواهم', 'نان', 'می‌روم'],
      partTrs: { 'چای': 'ch\\u0101y', 'می‌خواهم': 'mikh\\u0101ham', 'نان': 'n\\u0101n', 'می‌روم': 'miravam' } },
    { t: 'listen', fa: 'نان می‌خورم', tr: 'n\\u0101n mikhoram', en: 'I eat bread',
      options: ['نان می‌خورم', 'چای می‌خواهم', 'می‌روم', 'آب دارم'],
      optionTrs: { 'نان می‌خورم': 'n\\u0101n mikhoram', 'چای می‌خواهم': 'ch\\u0101y mikh\\u0101ham', 'می‌روم': 'miravam', 'آب دارم': '\\u0101b d\\u0101ram' } },
    { t: 'write', fa: 'می‌روم', tr: 'miravam', en: 'I go' },
  ],
};

/* ------------------------------------------------------------------ */
/* UNIT VI — describing things                                         */
/* ------------------------------------------------------------------ */

const describing: Lesson = {
  key: 'describing',
  title: 'Good, big, beautiful',
  titleFa: 'صفت‌ها',
  blurb: 'Adjectives, and where Persian puts them.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'خوب', tr: 'khub', en: 'good' },
    { t: 'meet', fa: 'بد', tr: 'bad', en: 'bad' },
    { t: 'note', title: 'You are not imagining it',
      body: 'bad means bad. Same sound, same meaning, and the two words are almost certainly unrelated: a coincidence so exact that linguists keep having to explain it. Persian and English do share hundreds of real cousins, but this famous one is not among them.' },
    { t: 'meet', fa: 'بزرگ', tr: 'bozorg', en: 'big' },
    { t: 'meet', fa: 'کوچک', tr: 'kuchak', en: 'small' },
    { t: 'meet', fa: 'قشنگ', tr: 'ghashang', en: 'beautiful, pretty' },
    { t: 'sense', fa: 'خانهٔ بزرگ', tr: 'kh\\u0101ne-ye bozorg', en: 'a big house',
      body: 'The adjective comes after the noun, joined by that same ez\\u0101fe sound: house-of-big. This is the reverse of English and it takes a few days. m\\u0101dar-e khub, a good mother. ch\\u0101y-e d\\u0101gh, hot tea.' },
    { t: 'choose', prompt: 'Which is the right way to say a big house?',
      answer: 'خانهٔ بزرگ',
      options: ['خانهٔ بزرگ', 'بزرگ خانه', 'خانه بزرگم', 'بزرگ است خانه'],
      optionTrs: { 'خانهٔ بزرگ': 'kh\\u0101ne-ye bozorg', 'بزرگ خانه': 'bozorg kh\\u0101ne', 'خانه بزرگم': 'kh\\u0101ne bozorgam', 'بزرگ است خانه': 'bozorg ast kh\\u0101ne' },
      why: 'Noun first, then the adjective, with the ez\\u0101fe between them.' },
    { t: 'meet', fa: 'خیلی', tr: 'kheyli', en: 'very' },
    { t: 'sentence', fa: 'خیلی خوب است', tr: 'kheyli khub ast', en: 'it is very good', focus: 'خیلی' },
    { t: 'note', title: 'kheyli is everywhere',
      body: 'kheyli means very, a lot, really. kheyli mamnun, thanks a lot. kheyli khoshmaze, really delicious. kheyli dur, very far. If you learn one intensifier, learn this one; Iranians use it constantly.' },
    { t: 'build', fa: 'خیلی خوب است', tr: 'kheyli khub ast', en: 'it is very good',
      parts: ['خیلی', 'خوب', 'است', 'بد'],
      partTrs: { 'خیلی': 'kheyli', 'خوب': 'khub', 'است': 'ast', 'بد': 'bad' } },
    { t: 'listen', fa: 'خیلی قشنگ است', tr: 'kheyli ghashang ast', en: 'it is very beautiful',
      options: ['خیلی قشنگ است', 'خیلی خوب است', 'خانهٔ بزرگ', 'خیلی بد است'],
      optionTrs: { 'خیلی قشنگ است': 'kheyli ghashang ast', 'خیلی خوب است': 'kheyli khub ast', 'خانهٔ بزرگ': 'kh\\u0101ne-ye bozorg', 'خیلی بد است': 'kheyli bad ast' } },
    { t: 'write', fa: 'خوب', tr: 'khub', en: 'good' },
  ],
};

/* ------------------------------------------------------------------ */
/* UNIT VII — time                                                     */
/* ------------------------------------------------------------------ */

const timeWords: Lesson = {
  key: 'time-words',
  title: 'Today, tomorrow, yesterday',
  titleFa: 'زمان',
  blurb: 'Placing things in time, and the Iranian calendar.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'امروز', tr: 'emruz', en: 'today', literal: 'this day' },
    { t: 'meet', fa: 'فردا', tr: 'fard\\u0101', en: 'tomorrow' },
    { t: 'meet', fa: 'دیروز', tr: 'diruz', en: 'yesterday' },
    { t: 'sense', fa: 'امروز', tr: 'emruz', en: 'today',
      body: 'em-ruz is this-day, and ruz is day. diruz is yesterday, emruz today, and once you see ruz sitting inside both you stop memorising them separately. Persian builds a lot of words this way, out of pieces you already have.' },
    { t: 'meet', fa: 'صبح', tr: 'sobh', en: 'morning' },
    { t: 'meet', fa: 'شب', tr: 'shab', en: 'night' },
    { t: 'note', title: 'Yalda is the longest night',
      body: 'shab is night. Shab-e Yald\\u0101 is the night of Yalda, the longest night of the year, when families stay up together eating pomegranate and watermelon and reading H\\u0101fez aloud. The word shab is doing all the work in that name, and you now know it.' },
    { t: 'sentence', fa: 'فردا می‌روم', tr: 'fard\\u0101 miravam', en: 'I am going tomorrow', focus: 'فردا' },
    { t: 'note', title: 'The present tense is also the future',
      body: 'Persian rarely bothers with a separate future tense in speech. fard\\u0101 miravam is tomorrow I go, and it means I will go. The time word does the work, so the verb does not have to.' },
    { t: 'meet', fa: 'الان', tr: 'al\\u0101n', en: 'now' },
    { t: 'choose', prompt: 'Which one means tomorrow?',
      answer: 'فردا',
      options: ['فردا', 'دیروز', 'امروز', 'الان'],
      optionTrs: { 'فردا': 'fard\\u0101', 'دیروز': 'diruz', 'امروز': 'emruz', 'الان': 'al\\u0101n' },
      why: 'fard\\u0101. The only one of the four without ruz or an now in it.' },
    { t: 'build', fa: 'فردا می‌روم', tr: 'fard\\u0101 miravam', en: 'I am going tomorrow',
      parts: ['فردا', 'می‌روم', 'امروز', 'الان'],
      partTrs: { 'فردا': 'fard\\u0101', 'می‌روم': 'miravam', 'امروز': 'emruz', 'الان': 'al\\u0101n' } },
    { t: 'listen', fa: 'امروز خوب است', tr: 'emruz khub ast', en: 'today is good',
      options: ['امروز خوب است', 'فردا می‌روم', 'دیروز بود', 'الان می‌خواهم'],
      optionTrs: { 'امروز خوب است': 'emruz khub ast', 'فردا می‌روم': 'fard\\u0101 miravam', 'دیروز بود': 'diruz bud', 'الان می‌خواهم': 'al\\u0101n mikh\\u0101ham' } },
    { t: 'note', title: 'The year starts in spring',
      body: 'Iran runs on the solar Hijri calendar, and the year turns at the exact moment of the spring equinox, not at midnight on an arbitrary winter day. That is Nowruz, literally new day. When an Iranian says the year 1403, that is the same stretch of time as 2024 and 2025 overlapping.' },
    { t: 'write', fa: 'امروز', tr: 'emruz', en: 'today' },
  ],
};

'''

UNIT_ENTRIES = '''  {
    key: 'verbs',
    roman: 'V',
    title: 'Verbs',
    titleFa: 'فعل‌ها',
    blurb: 'The endings that run the whole language.',
    level: 'elementary',
    lessons: [verbsBeing, verbsDoing],
  },
  {
    key: 'describing',
    roman: 'VI',
    title: 'Describing things',
    titleFa: 'صفت‌ها',
    blurb: 'Good, big, beautiful, and where Persian puts them.',
    level: 'elementary',
    lessons: [describing],
  },
  {
    key: 'time',
    roman: 'VII',
    title: 'Time',
    titleFa: 'زمان',
    blurb: 'Today, tomorrow, and the year that starts in spring.',
    level: 'elementary',
    lessons: [timeWords],
  },
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS array not found"); raise SystemExit

s = s.replace(anchor, UNITS_CODE.replace("\\\\u", "\\u") + "\n" + anchor)

mark = "    lessons: [tableWords, tableManners],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: table unit entry not found"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + UNIT_ENTRIES + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'verbs'" in s, "key: 'describing'" in s, "key: 'time'" in s)
