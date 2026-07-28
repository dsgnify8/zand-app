# -*- coding: utf-8 -*-
# Adds a textbook-style 'letter' step (four positions, a real word for each),
# a vowels lesson, and letter lessons for che, khe, heh, dal, zal, noon,
# shin and feh. Refuses to write unless every anchor is found.

p = "constants/curriculum.ts"
s = open(p).read()

if "t: 'letter'" in s:
    print("ABORT: already applied"); raise SystemExit

# 1. the new step type
OLD_TYPE = "  | { t: 'note'; title: string; body: string };"
NEW_TYPE = """  | { t: 'note'; title: string; body: string }
  | { t: 'letter'; letter: string; name: string; sound: string; like: string;
      positions: { pos: string; form: string; word: string; tr: string; en: string }[];
      note?: string }
  | { t: 'vowel'; mark: string; name: string; sound: string; like: string;
      examples: { fa: string; tr: string; en: string }[]; body: string };"""

if OLD_TYPE not in s:
    print("ABORT: step union not found"); raise SystemExit
s = s.replace(OLD_TYPE, NEW_TYPE)

CODE = '''
/* ------------------------------------------------------------------ */
/* Letters, one at a time, the way a textbook does it                  */
/* ------------------------------------------------------------------ */

const vowels: Lesson = {
  key: 'vowels',
  title: 'The vowels you see, and the ones you do not',
  titleFa: 'صداها',
  blurb: 'The single hardest thing about reading Persian, explained once.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'Persian has six vowels and writes three',
      body: 'Three long vowels get letters of their own and sit on the page where you can see them. Three short vowels get nothing at all in ordinary writing. Everyone reading Persian is supplying half the vowels from memory, and once you know that, the script stops feeling broken.' },
    { t: 'vowel', mark: 'ا', name: '\\u0101lef', sound: '\\u0101', like: 'the a in father',
      examples: [
        { fa: 'آب', tr: '\\u0101b', en: 'water' },
        { fa: 'بابا', tr: 'b\\u0101b\\u0101', en: 'dad' },
        { fa: 'نان', tr: 'n\\u0101n', en: 'bread' },
      ],
      body: 'The long \\u0101 is written, always. When it opens a word it wears a hat: آ. In the middle or at the end it is bare: ا.' },
    { t: 'vowel', mark: 'و', name: 'v\\u0101v', sound: 'u', like: 'the oo in moon',
      examples: [
        { fa: 'دو', tr: 'do', en: 'two' },
        { fa: 'تو', tr: 'to', en: 'you' },
        { fa: 'سوت', tr: 'sut', en: 'whistle' },
      ],
      body: 'This letter does two jobs: it is the long u, and it is also the consonant v. Which one it is depends on the word, and you learn them as you go.' },
    { t: 'vowel', mark: 'ی', name: 'ye', sound: 'i', like: 'the ee in see',
      examples: [
        { fa: 'سی', tr: 'si', en: 'thirty' },
        { fa: 'ایرانی', tr: '\\u012Br\\u0101ni', en: 'Iranian' },
        { fa: 'چای', tr: 'ch\\u0101y', en: 'tea' },
      ],
      body: 'Like v\\u0101v, this one is both a vowel and a consonant: the long i, and the y sound.' },
    { t: 'note', title: 'Now the three that are not there',
      body: 'a as in cat, e as in bed, and o as in more. None of them are written. اسم is spelled with three letters and pronounced esm: the e simply is not on the page. Children learning to read get little marks above the letters to help. Adult books do not.' },
    { t: 'choose', prompt: 'The word اسم is written with three letters. How many vowels do you hear when it is spoken?',
      answer: 'One, and it is not written',
      options: ['One, and it is not written', 'None at all', 'Three, one per letter', 'Two, both written'],
      why: 'esm. The e is spoken but never appears. This is the whole puzzle of reading Persian, and it is why you learn words as shapes rather than sounding them out letter by letter.' },
    { t: 'note', title: 'How anyone manages',
      body: 'You stop decoding and start recognising. A Persian reader does not assemble n-\\u0101-n and arrive at bread, they see نان and know it, the way you see the word through without reading t-h-r-o-u-g-h. It takes a few hundred words and then it is automatic.' },
    { t: 'write', fa: 'آب', tr: '\\u0101b', en: 'water', hint: 'The \\u0101lef with its hat, then be' },
  ],
};

const lettersOne: Lesson = {
  key: 'letters-one',
  title: 'che, khe, and heh',
  titleFa: 'چ خ ه',
  blurb: 'Three letters, and the sound English does not have.',
  minutes: 8,
  steps: [
    { t: 'letter', letter: 'چ', name: 'che', sound: 'ch', like: 'the ch in chair',
      positions: [
        { pos: 'INITIAL', form: 'چـ', word: 'چای', tr: 'ch\\u0101y', en: 'tea' },
        { pos: 'MEDIAL', form: 'ـچـ', word: 'کوچک', tr: 'kuchak', en: 'small' },
        { pos: 'FINAL', form: 'ـچ', word: 'پنج', tr: 'panj', en: 'five' },
        { pos: 'ALONE', form: 'چ', word: 'هیچ', tr: 'hich', en: 'nothing' },
      ],
      note: 'One of the four letters Persian added to the Arabic alphabet for sounds Arabic does not have. The others are پ, ژ and گ.' },
    { t: 'letter', letter: 'خ', name: 'khe', sound: 'kh', like: 'the ch in Bach, from the back of the throat',
      positions: [
        { pos: 'INITIAL', form: 'خـ', word: 'خوب', tr: 'khub', en: 'good' },
        { pos: 'MEDIAL', form: 'ـخـ', word: 'بخور', tr: 'bokhor', en: 'eat' },
        { pos: 'FINAL', form: 'ـخ', word: 'تلخ', tr: 'talkh', en: 'bitter' },
        { pos: 'ALONE', form: 'خ', word: 'شاخ', tr: 'sh\\u0101kh', en: 'horn, branch' },
      ],
      note: 'This is the one English speakers dread and it is not that hard: start to say a k, then let the air keep flowing instead of stopping it. You already make this sound at the end of loch.' },
    { t: 'note', title: 'kh opens a lot of doors',
      body: 'khub, good. kh\\u0101har, sister. khoshmaze, delicious. khod\\u0101h\\u0101fez, goodbye. khoshbakhtam, pleased to meet you. Get comfortable with this one sound and a large stretch of everyday Persian becomes sayable.' },
    { t: 'letter', letter: 'ه', name: 'he', sound: 'h', like: 'the h in hat',
      positions: [
        { pos: 'INITIAL', form: 'هـ', word: 'هفت', tr: 'haft', en: 'seven' },
        { pos: 'MEDIAL', form: 'ـهـ', word: 'مهم', tr: 'mohem', en: 'important' },
        { pos: 'FINAL', form: 'ـه', word: 'ماه', tr: 'm\\u0101h', en: 'moon, month' },
        { pos: 'ALONE', form: 'ه', word: 'راه', tr: 'r\\u0101h', en: 'road' },
      ],
      note: 'At the end of a word this letter often carries a silent e sound instead of an h: kh\\u0101ne, house, ends in it. Persian gives this letter two jobs and lets context sort it out.' },
    { t: 'choose', prompt: 'Which word starts with the sound at the back of the throat?',
      answer: 'خوب',
      options: ['خوب', 'چای', 'هفت', 'نان'],
      optionTrs: { 'خوب': 'khub', 'چای': 'ch\\u0101y', 'هفت': 'haft', 'نان': 'n\\u0101n' },
      why: 'khub. The kh is that scraped sound; the h in haft is a soft ordinary breath.' },
    { t: 'listen', fa: 'خوب', tr: 'khub', en: 'good',
      options: ['خوب', 'چای', 'هفت', 'کوچک'],
      optionTrs: { 'خوب': 'khub', 'چای': 'ch\\u0101y', 'هفت': 'haft', 'کوچک': 'kuchak' } },
    { t: 'write', fa: 'چای', tr: 'ch\\u0101y', en: 'tea' },
  ],
};

const lettersTwo: Lesson = {
  key: 'letters-two',
  title: 'dal, zal, and the letters that will not join',
  titleFa: 'د ذ',
  blurb: 'Two letters, and a rule that changes how words look.',
  minutes: 7,
  steps: [
    { t: 'letter', letter: 'د', name: 'd\\u0101l', sound: 'd', like: 'the d in door',
      positions: [
        { pos: 'INITIAL', form: 'د', word: 'دل', tr: 'del', en: 'heart' },
        { pos: 'MEDIAL', form: 'ـد', word: 'مادر', tr: 'm\\u0101dar', en: 'mother' },
        { pos: 'FINAL', form: 'ـد', word: 'بد', tr: 'bad', en: 'bad' },
        { pos: 'ALONE', form: 'د', word: 'دو', tr: 'do', en: 'two' },
      ],
      note: 'Notice the form barely changes. That is because d\\u0101l is one of the seven letters that never join to what comes after them.' },
    { t: 'note', title: 'Seven letters that refuse to hold hands',
      body: 'ا د ذ ر ز ژ و. These seven join to the letter before them but never to the letter after. That is why مادر has a visible gap in the middle: the d\\u0101l will not connect forward. When you see a break inside a word, one of these seven is usually the reason, and it is a useful clue when reading.' },
    { t: 'letter', letter: 'ذ', name: 'z\\u0101l', sound: 'z', like: 'the z in zoo',
      positions: [
        { pos: 'INITIAL', form: 'ذ', word: 'ذهن', tr: 'zehn', en: 'mind' },
        { pos: 'MEDIAL', form: 'ـذ', word: 'کاغذ', tr: 'k\\u0101ghaz', en: 'paper' },
        { pos: 'FINAL', form: 'ـذ', word: 'لذت', tr: 'lezzat', en: 'pleasure' },
        { pos: 'ALONE', form: 'ذ', word: 'غذا', tr: 'ghaz\\u0101', en: 'food' },
      ],
      note: 'Same shape as d\\u0101l with a dot on top, and it sounds nothing like it. Persian has four letters that all make a z sound: ز ذ ض ظ. Only the spelling tells them apart, and you learn which word takes which.' },
    { t: 'choose', prompt: 'Why does مادر have a gap in the middle?',
      answer: 'The d\\u0101l will not join to what follows it',
      options: ['The d\\u0101l will not join to what follows it', 'It is two separate words', 'A vowel is missing there', 'It is a spelling mistake'],
      why: 'd\\u0101l is one of the seven non-joining letters. The gap is correct, and it is a signal rather than a flaw.' },
    { t: 'listen', fa: 'مادر', tr: 'm\\u0101dar', en: 'mother',
      options: ['مادر', 'پدر', 'غذا', 'دل'],
      optionTrs: { 'مادر': 'm\\u0101dar', 'پدر': 'pedar', 'غذا': 'ghaz\\u0101', 'دل': 'del' } },
    { t: 'write', fa: 'دل', tr: 'del', en: 'heart' },
  ],
};

const lettersThree: Lesson = {
  key: 'letters-three',
  title: 'noon, shin, and feh',
  titleFa: 'ن ش ف',
  blurb: 'Three more, and you can read most of what you have learned.',
  minutes: 8,
  steps: [
    { t: 'letter', letter: 'ن', name: 'nun', sound: 'n', like: 'the n in nine',
      positions: [
        { pos: 'INITIAL', form: 'نـ', word: 'نان', tr: 'n\\u0101n', en: 'bread' },
        { pos: 'MEDIAL', form: 'ـنـ', word: 'خانه', tr: 'kh\\u0101ne', en: 'house' },
        { pos: 'FINAL', form: 'ـن', word: 'من', tr: 'man', en: 'I' },
        { pos: 'ALONE', form: 'ن', word: 'زن', tr: 'zan', en: 'woman' },
      ] },
    { t: 'letter', letter: 'ش', name: 'shin', sound: 'sh', like: 'the sh in ship',
      positions: [
        { pos: 'INITIAL', form: 'شـ', word: 'شب', tr: 'shab', en: 'night' },
        { pos: 'MEDIAL', form: 'ـشـ', word: 'خوشحال', tr: 'khoshh\\u0101l', en: 'happy' },
        { pos: 'FINAL', form: 'ـش', word: 'شش', tr: 'shesh', en: 'six' },
        { pos: 'ALONE', form: 'ش', word: 'آش', tr: '\\u0101sh', en: 'thick soup' },
      ],
      note: '\\u0101sh is the word behind the English dish name and behind \\u0101shpaz, cook: literally soup-maker. The kitchen in Persian is named after this one soup.' },
    { t: 'letter', letter: 'ف', name: 'fe', sound: 'f', like: 'the f in fine',
      positions: [
        { pos: 'INITIAL', form: 'فـ', word: 'فردا', tr: 'fard\\u0101', en: 'tomorrow' },
        { pos: 'MEDIAL', form: 'ـفـ', word: 'سفید', tr: 'sefid', en: 'white' },
        { pos: 'FINAL', form: 'ـف', word: 'حرف', tr: 'harf', en: 'word, letter' },
        { pos: 'ALONE', form: 'ف', word: 'کیف', tr: 'kif', en: 'bag' },
      ] },
    { t: 'note', title: 'Count what you can read now',
      body: 'With these three you can read n\\u0101n, man, zan, shab, shesh, fard\\u0101, sefid and kh\\u0101ne, and every one of them is a word you have already met in a lesson. Reading is not a separate skill you add at the end. It arrives quietly, a letter at a time.' },
    { t: 'choose', prompt: 'Read this: شب',
      answer: 'night',
      options: ['night', 'six', 'bread', 'white'],
      why: 'shab. shin then be. And Shab-e Yald\\u0101 is the night of Yalda, which you already knew.' },
    { t: 'listen', fa: 'فردا', tr: 'fard\\u0101', en: 'tomorrow',
      options: ['فردا', 'سفید', 'شب', 'خانه'],
      optionTrs: { 'فردا': 'fard\\u0101', 'سفید': 'sefid', 'شب': 'shab', 'خانه': 'kh\\u0101ne' } },
    { t: 'write', fa: 'شب', tr: 'shab', en: 'night' },
  ],
};

'''

ENTRY = '''  {
    key: 'script',
    roman: '0',
    title: 'The script, letter by letter',
    titleFa: 'خط',
    blurb: 'The vowels Persian hides, and the letters one at a time.',
    level: 'beginner',
    lessons: [vowels, lettersOne, lettersTwo, lettersThree],
  },
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS not found"); raise SystemExit

s = s.replace(anchor, CODE.replace("\\\\u", "\\u") + "\n" + anchor)

# goes in right after the reading unit
mark = "    lessons: [reading],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: reading unit entry not found"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + ENTRY + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'script'" in s, "| letter step:", "t: 'letter'" in s)
