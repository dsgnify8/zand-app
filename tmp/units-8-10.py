# -*- coding: utf-8 -*-
# Expands describing with colours, and adds places, feelings and conversation.
# Refuses to write unless every anchor is found.

p = "constants/curriculum.ts"
s = open(p).read()

if "key: 'colours'" in s:
    print("ABORT: already applied"); raise SystemExit

CODE = '''
const colours: Lesson = {
  key: 'colours',
  title: 'Colours',
  titleFa: 'رنگ‌ها',
  blurb: 'And the ones that carry meaning beyond the colour.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'رنگ', tr: 'rang', en: 'colour' },
    { t: 'meet', fa: 'قرمز', tr: 'ghermez', en: 'red' },
    { t: 'meet', fa: 'آبی', tr: '\\u0101bi', en: 'blue' },
    { t: 'sense', fa: 'آبی', tr: '\\u0101bi', en: 'blue',
      body: 'You already know this word. \\u0101b is water, and \\u0101bi is water-coloured. Persian builds colours out of the things that have them: the ending -i turns a noun into the shade it carries.' },
    { t: 'meet', fa: 'سبز', tr: 'sabz', en: 'green' },
    { t: 'meet', fa: 'زرد', tr: 'zard', en: 'yellow' },
    { t: 'meet', fa: 'سفید', tr: 'sefid', en: 'white' },
    { t: 'meet', fa: 'سیاه', tr: 'si\\u0101h', en: 'black' },
    { t: 'note', title: 'Green is the colour of alive',
      body: 'sabz is green, and sabze is the dish of sprouted wheat on the Nowruz table, the one that stands for rebirth. sabzi is herbs, the great heap of them on every Persian table. When Iranians say someone has sabz eyes they mean green, but the word carries growing and living inside it.' },
    { t: 'sentence', fa: 'چشم‌های سبز', tr: 'cheshm-h\\u0101-ye sabz', en: 'green eyes', focus: 'سبز' },
    { t: 'choose', prompt: 'Which one is blue?',
      answer: 'آبی',
      options: ['آبی', 'سبز', 'قرمز', 'زرد'],
      optionTrs: { 'آبی': '\\u0101bi', 'سبز': 'sabz', 'قرمز': 'ghermez', 'زرد': 'zard' },
      why: '\\u0101bi, from \\u0101b, water.' },
    { t: 'sense', fa: 'دلم سیاه شد', tr: 'delam si\\u0101h shod', en: 'my heart went black',
      body: 'Colours carry feeling in Persian. A black heart is grief. A white face, ru-sefid, means honour and pride: you have done well and can hold your head up. A black face, ru-si\\u0101h, is shame. These are not poetry, they are everyday speech.' },
    { t: 'build', fa: 'چشم‌های سبز', tr: 'cheshm-h\\u0101-ye sabz', en: 'green eyes',
      parts: ['چشم‌های', 'سبز', 'آبی', 'قرمز'],
      partTrs: { 'چشم‌های': 'cheshm-h\\u0101-ye', 'سبز': 'sabz', 'آبی': '\\u0101bi', 'قرمز': 'ghermez' } },
    { t: 'listen', fa: 'قرمز', tr: 'ghermez', en: 'red',
      options: ['قرمز', 'سبز', 'سفید', 'سیاه'],
      optionTrs: { 'قرمز': 'ghermez', 'سبز': 'sabz', 'سفید': 'sefid', 'سیاه': 'si\\u0101h' } },
    { t: 'write', fa: 'سبز', tr: 'sabz', en: 'green' },
  ],
};

const moreDescribing: Lesson = {
  key: 'more-describing',
  title: 'Hot, cold, near, far',
  titleFa: 'بیشتر',
  blurb: 'The adjectives you need every day.',
  minutes: 6,
  steps: [
    { t: 'meet', fa: 'داغ', tr: 'd\\u0101gh', en: 'hot' },
    { t: 'meet', fa: 'سرد', tr: 'sard', en: 'cold' },
    { t: 'sentence', fa: 'چای داغ', tr: 'ch\\u0101y-e d\\u0101gh', en: 'hot tea', focus: 'داغ' },
    { t: 'meet', fa: 'نزدیک', tr: 'nazdik', en: 'near' },
    { t: 'meet', fa: 'دور', tr: 'dur', en: 'far' },
    { t: 'meet', fa: 'تازه', tr: 't\\u0101ze', en: 'fresh, new' },
    { t: 'sense', fa: 'تازه', tr: 't\\u0101ze', en: 'fresh',
      body: 'n\\u0101n-e t\\u0101ze is fresh bread, and it is close to a moral category in Iran. Bread is bought the same day, still warm, and t\\u0101ze is the highest praise you can give it. The word also means recently: t\\u0101ze \\u0101madam, I have just arrived.' },
    { t: 'meet', fa: 'قدیمی', tr: 'ghadimi', en: 'old' },
    { t: 'choose', prompt: 'The tea has gone cold. Which word do you need?',
      answer: 'سرد',
      options: ['سرد', 'داغ', 'تازه', 'دور'],
      optionTrs: { 'سرد': 'sard', 'داغ': 'd\\u0101gh', 'تازه': 't\\u0101ze', 'دور': 'dur' },
      why: 'sard, cold. d\\u0101gh is hot, and Persian tea should always be d\\u0101gh.' },
    { t: 'build', fa: 'چای داغ می‌خواهم', tr: 'ch\\u0101y-e d\\u0101gh mikh\\u0101ham', en: 'I want hot tea',
      parts: ['چای', 'داغ', 'می‌خواهم', 'سرد'],
      partTrs: { 'چای': 'ch\\u0101y', 'داغ': 'd\\u0101gh', 'می‌خواهم': 'mikh\\u0101ham', 'سرد': 'sard' } },
    { t: 'listen', fa: 'خیلی دور است', tr: 'kheyli dur ast', en: 'it is very far',
      options: ['خیلی دور است', 'خیلی نزدیک است', 'چای داغ', 'نان تازه'],
      optionTrs: { 'خیلی دور است': 'kheyli dur ast', 'خیلی نزدیک است': 'kheyli nazdik ast', 'چای داغ': 'ch\\u0101y-e d\\u0101gh', 'نان تازه': 'n\\u0101n-e t\\u0101ze' } },
    { t: 'write', fa: 'سرد', tr: 'sard', en: 'cold' },
  ],
};

/* ------------------------------------------------------------------ */
/* UNIT VIII — places and getting around                               */
/* ------------------------------------------------------------------ */

const places: Lesson = {
  key: 'places',
  title: 'Where things are',
  titleFa: 'جاها',
  blurb: 'Asking for a place, and understanding the answer.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'کجا', tr: 'koj\\u0101', en: 'where' },
    { t: 'sentence', fa: 'کجاست؟', tr: 'koj\\u0101st?', en: 'where is it?', focus: 'کجا' },
    { t: 'meet', fa: 'خانه', tr: 'kh\\u0101ne', en: 'house, home' },
    { t: 'meet', fa: 'شهر', tr: 'shahr', en: 'city' },
    { t: 'note', title: 'shahr is hiding in the map',
      body: 'shahr is city, and it is the ending of half the place names in Iran. Kerm\\u0101nsh\\u0101h, B\\u0101ndar Abb\\u0101s, and dozens of towns ending in -shahr. When you see it you are reading city, and the first half tells you whose.' },
    { t: 'meet', fa: 'خیابان', tr: 'khi\\u0101b\\u0101n', en: 'street' },
    { t: 'meet', fa: 'بازار', tr: 'b\\u0101z\\u0101r', en: 'bazaar, market' },
    { t: 'note', title: 'A word that went everywhere',
      body: 'b\\u0101z\\u0101r is Persian, and it travelled: into Turkish, Arabic, Italian, French and English, all meaning the same covered market. When you say bazaar in English you are speaking Persian without noticing.' },
    { t: 'meet', fa: 'اینجا', tr: 'inj\\u0101', en: 'here' },
    { t: 'meet', fa: 'آنجا', tr: '\\u0101nj\\u0101', en: 'there' },
    { t: 'sense', fa: 'اینجا', tr: 'inj\\u0101', en: 'here',
      body: 'in is this, \\u0101n is that, and j\\u0101 is place. this-place and that-place. In speech \\u0101nj\\u0101 usually softens to unj\\u0101. Again: pieces you already have, stuck together.' },
    { t: 'sentence', fa: 'بازار کجاست؟', tr: 'b\\u0101z\\u0101r koj\\u0101st?', en: 'where is the bazaar?', focus: 'کجاست' },
    { t: 'choose', prompt: 'You are lost and looking for the street. What do you ask?',
      answer: 'خیابان کجاست؟',
      options: ['خیابان کجاست؟', 'خیابان اینجاست', 'کجا می‌روم', 'شهر بزرگ است'],
      optionTrs: { 'خیابان کجاست؟': 'khi\\u0101b\\u0101n koj\\u0101st?', 'خیابان اینجاست': 'khi\\u0101b\\u0101n inj\\u0101st', 'کجا می‌روم': 'koj\\u0101 miravam', 'شهر بزرگ است': 'shahr bozorg ast' },
      why: 'The place first, then koj\\u0101st. Same shape as b\\u0101z\\u0101r koj\\u0101st.' },
    { t: 'build', fa: 'بازار کجاست؟', tr: 'b\\u0101z\\u0101r koj\\u0101st?', en: 'where is the bazaar?',
      parts: ['بازار', 'کجاست؟', 'اینجا', 'خانه'],
      partTrs: { 'بازار': 'b\\u0101z\\u0101r', 'کجاست؟': 'koj\\u0101st', 'اینجا': 'inj\\u0101', 'خانه': 'kh\\u0101ne' } },
    { t: 'listen', fa: 'خانه نزدیک است', tr: 'kh\\u0101ne nazdik ast', en: 'the house is near',
      options: ['خانه نزدیک است', 'بازار کجاست؟', 'شهر دور است', 'اینجا نیست'],
      optionTrs: { 'خانه نزدیک است': 'kh\\u0101ne nazdik ast', 'بازار کجاست؟': 'b\\u0101z\\u0101r koj\\u0101st?', 'شهر دور است': 'shahr dur ast', 'اینجا نیست': 'inj\\u0101 nist' } },
    { t: 'write', fa: 'کجا', tr: 'koj\\u0101', en: 'where' },
  ],
};

/* ------------------------------------------------------------------ */
/* UNIT IX — the heart, and how Persian carries feeling                */
/* ------------------------------------------------------------------ */

const feelings: Lesson = {
  key: 'feelings',
  title: 'The heart does the work',
  titleFa: 'دل',
  blurb: 'How Persian says what it feels, through one small word.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'دل', tr: 'del', en: 'heart' },
    { t: 'sense', fa: 'دل', tr: 'del', en: 'heart',
      body: 'del is the heart, and in Persian it is where nearly every feeling lives. You cannot really talk about emotion without it. Homesickness, courage, longing, kindness, worry: all of them are built on this one syllable, and once you have it, a whole layer of the language opens.' },
    { t: 'meet', fa: 'دلم برات تنگ شده', tr: 'delam bar\\u0101t tang shode', en: 'I miss you', literal: 'my heart has grown tight for you' },
    { t: 'note', title: 'The most Persian sentence there is',
      body: 'Not I miss you, which puts the lack on you. My heart has grown tight for you: the feeling happens in the speaker\\u2019s chest, physically, as a narrowing. If you learn one full sentence in Persian, learn this one. It will do more work than any other.' },
    { t: 'meet', fa: 'دلتنگ', tr: 'deltang', en: 'homesick, longing', literal: 'heart-tight' },
    { t: 'meet', fa: 'دلبر', tr: 'delbar', en: 'beloved', literal: 'heart-carrier' },
    { t: 'note', title: 'The one who carries your heart away',
      body: 'delbar is made of del, heart, and bar, to carry. The beloved is not someone you love, they are someone who took your heart and left with it. Persian poetry ran on this word for a thousand years and it is still an ordinary thing to call someone.' },
    { t: 'meet', fa: 'خوشحال', tr: 'khoshh\\u0101l', en: 'happy', literal: 'good-state' },
    { t: 'meet', fa: 'ناراحت', tr: 'n\\u0101r\\u0101hat', en: 'upset', literal: 'not-comfortable' },
    { t: 'sentence', fa: 'خیلی خوشحالم', tr: 'kheyli khoshh\\u0101lam', en: 'I am very happy', focus: 'خوشحالم' },
    { t: 'choose', prompt: 'You are calling your grandmother in Tehran. What do you say?',
      answer: 'دلم برات تنگ شده',
      options: ['دلم برات تنگ شده', 'خیلی خوشحالم', 'ناراحت هستم', 'کجاست؟'],
      optionTrs: { 'دلم برات تنگ شده': 'delam bar\\u0101t tang shode', 'خیلی خوشحالم': 'kheyli khoshh\\u0101lam', 'ناراحت هستم': 'n\\u0101r\\u0101hat hastam', 'کجاست؟': 'koj\\u0101st?' },
      why: 'I miss you. It is the thing she is waiting to hear, and it is worth being able to say without hesitating.' },
    { t: 'listen', fa: 'دلم برات تنگ شده', tr: 'delam bar\\u0101t tang shode', en: 'I miss you',
      options: ['دلم برات تنگ شده', 'خیلی خوشحالم', 'دلبر', 'ناراحت'],
      optionTrs: { 'دلم برات تنگ شده': 'delam bar\\u0101t tang shode', 'خیلی خوشحالم': 'kheyli khoshh\\u0101lam', 'دلبر': 'delbar', 'ناراحت': 'n\\u0101r\\u0101hat' } },
    { t: 'build', fa: 'خیلی خوشحالم', tr: 'kheyli khoshh\\u0101lam', en: 'I am very happy',
      parts: ['خیلی', 'خوشحالم', 'دل', 'ناراحت'],
      partTrs: { 'خیلی': 'kheyli', 'خوشحالم': 'khoshh\\u0101lam', 'دل': 'del', 'ناراحت': 'n\\u0101r\\u0101hat' } },
    { t: 'write', fa: 'دل', tr: 'del', en: 'heart' },
  ],
};

/* ------------------------------------------------------------------ */
/* UNIT X — holding a conversation                                     */
/* ------------------------------------------------------------------ */

const conversation: Lesson = {
  key: 'conversation',
  title: 'Keeping it going',
  titleFa: 'گفت‌وگو',
  blurb: 'Asking back, not understanding, and buying time.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'نمی‌فهمم', tr: 'nemifahmam', en: 'I do not understand' },
    { t: 'sense', fa: 'نمی‌فهمم', tr: 'nemifahmam', en: 'I do not understand',
      body: 'Look at the front: ne-mi-fahm-am. The mi- you know, it makes it present. The ne- in front of it is the negative. Put ne- on any verb and you have flipped it: miravam, I go; nemiravam, I do not go. One syllable, and every verb you know just doubled.' },
    { t: 'meet', fa: 'یواش‌تر', tr: 'yav\\u0101sh-tar', en: 'slower' },
    { t: 'meet', fa: 'دوباره', tr: 'dob\\u0101re', en: 'again' },
    { t: 'sentence', fa: 'دوباره بگو، لطفاً', tr: 'dob\\u0101re begu, lotfan', en: 'say it again, please', focus: 'دوباره' },
    { t: 'meet', fa: 'چی؟', tr: 'chi?', en: 'what?' },
    { t: 'meet', fa: 'چرا', tr: 'chér\\u0101', en: 'why' },
    { t: 'note', title: 'Persian says yes to a no',
      body: 'If someone asks a negative question, you do not have coffee?, and you want to say yes I do, the answer is cher\\u0101. It exists purely to contradict a negative. English has lost this; French keeps it as si and German as doch. Persian kept it too.' },
    { t: 'meet', fa: 'فارسی بلد نیستم', tr: 'f\\u0101rsi balad nistam', en: 'I do not speak Persian' },
    { t: 'meet', fa: 'کمی فارسی بلدم', tr: 'kami f\\u0101rsi baladam', en: 'I speak a little Persian' },
    { t: 'note', title: 'Say the second one, not the first',
      body: 'kami f\\u0101rsi baladam, I speak a little Persian, will change every conversation you have in Iran. It is the difference between being answered in English and being answered in Persian, slowly, with patience. Iranians are famously delighted by anyone trying.' },
    { t: 'choose', prompt: 'Someone is speaking too fast for you. What do you say?',
      answer: 'یواش‌تر، لطفاً',
      options: ['یواش‌تر، لطفاً', 'نمی‌فهمم', 'چرا', 'دوباره'],
      optionTrs: { 'یواش‌تر، لطفاً': 'yav\\u0101sh-tar, lotfan', 'نمی‌فهمم': 'nemifahmam', 'چرا': 'cher\\u0101', 'دوباره': 'dob\\u0101re' },
      why: 'All four are useful, but slower, please keeps the conversation alive instead of stopping it.' },
    { t: 'build', fa: 'کمی فارسی بلدم', tr: 'kami f\\u0101rsi baladam', en: 'I speak a little Persian',
      parts: ['کمی', 'فارسی', 'بلدم', 'نیستم'],
      partTrs: { 'کمی': 'kami', 'فارسی': 'f\\u0101rsi', 'بلدم': 'baladam', 'نیستم': 'nistam' } },
    { t: 'listen', fa: 'نمی‌فهمم', tr: 'nemifahmam', en: 'I do not understand',
      options: ['نمی‌فهمم', 'دوباره بگو', 'یواش‌تر', 'کمی فارسی بلدم'],
      optionTrs: { 'نمی‌فهمم': 'nemifahmam', 'دوباره بگو': 'dob\\u0101re begu', 'یواش‌تر': 'yav\\u0101sh-tar', 'کمی فارسی بلدم': 'kami f\\u0101rsi baladam' } },
    { t: 'write', fa: 'دوباره', tr: 'dob\\u0101re', en: 'again' },
  ],
};

'''

ENTRIES = '''  {
    key: 'places',
    roman: 'VIII',
    title: 'Places',
    titleFa: 'جاها',
    blurb: 'Asking where something is, and understanding the answer.',
    level: 'elementary',
    lessons: [places],
  },
  {
    key: 'feelings',
    roman: 'IX',
    title: 'Feeling',
    titleFa: 'دل',
    blurb: 'How Persian says what it feels.',
    level: 'intermediate',
    lessons: [feelings],
  },
  {
    key: 'conversation',
    roman: 'X',
    title: 'Conversation',
    titleFa: 'گفت‌وگو',
    blurb: 'Keeping a conversation alive when you are out of your depth.',
    level: 'intermediate',
    lessons: [conversation],
  },
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS not found"); raise SystemExit
s = s.replace(anchor, CODE.replace("\\\\u", "\\u") + "\n" + anchor)

# describing gains two more lessons
old_desc = "    lessons: [describing],"
if old_desc not in s:
    print("ABORT: describing unit not found"); raise SystemExit
s = s.replace(old_desc, "    lessons: [describing, colours, moreDescribing],")

# numbers fold into time
old_time = "    lessons: [timeWords],"
if old_time not in s:
    print("ABORT: time unit not found"); raise SystemExit
s = s.replace(old_time, "    lessons: [timeWords, numbersOne, numbersUse],")
s = s.replace("""    title: 'Time',
    titleFa: 'زمان',
    blurb: 'Today, tomorrow, and the year that starts in spring.',""",
"""    title: 'Time and numbers',
    titleFa: 'زمان و شمارش',
    blurb: 'Today, tomorrow, counting, age and price.',""")

# remove the now-empty numbers unit entry
import re
m = re.search(r"  \{\n    key: 'numbers',[\s\S]*?lessons: \[numbersOne, numbersUse\],\n  \},\n", s)
if m:
    s = s[:m.start()] + s[m.end():]

mark = "    lessons: [timeWords, numbersOne, numbersUse],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: time entry not found after edit"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + ENTRIES + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'colours'" in s, "key: 'places'" in s, "key: 'feelings'" in s, "key: 'conversation'" in s)
print("numbers merged into time:", "lessons: [timeWords, numbersOne, numbersUse]" in s)
