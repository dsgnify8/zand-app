# -*- coding: utf-8 -*-
# The advanced tier proper: compound verbs, the object marker rā, the ezāfe
# chain, the subjunctive, and reported speech.
# Refuses to write unless every anchor is found.

p = "constants/curriculum.ts"
s = open(p).read()

if "key: 'compounds'" in s:
    print("ABORT: already applied"); raise SystemExit

CODE = '''
/* ------------------------------------------------------------------ */
/* Compound verbs: how Persian actually makes verbs                    */
/* ------------------------------------------------------------------ */

const compounds: Lesson = {
  key: 'compounds',
  title: 'How Persian builds verbs',
  titleFa: 'فعل مرکب',
  blurb: 'A few hundred simple verbs, and thousands made from them.',
  minutes: 11,
  steps: [
    { t: 'note', title: 'Persian stopped making new verbs',
      body: 'Modern Persian has only a few hundred simple verbs, and almost none have been added in centuries. Everything else is a compound: a noun or adjective, plus a small helper verb that carries the grammar. Once you see the pattern, thousands of verbs become predictable instead of memorised.' },
    { t: 'meet', fa: 'کردن', tr: 'kardan', en: 'to do, to make' },
    { t: 'sense', fa: 'کار کردن', tr: 'k\\u0101r kardan', en: 'to work',
      body: 'k\\u0101r is work, kardan is to do. Work-do. And that is the whole machine: take a noun, add kardan, and you have a verb. The noun stays put and only kardan conjugates: k\\u0101r mikonam, I work. k\\u0101r kardam, I worked.' },
    { t: 'meet', fa: 'صحبت کردن', tr: 'sohbat kardan', en: 'to speak', literal: 'conversation-do' },
    { t: 'meet', fa: 'فکر کردن', tr: 'fekr kardan', en: 'to think', literal: 'thought-do' },
    { t: 'meet', fa: 'کمک کردن', tr: 'komak kardan', en: 'to help', literal: 'help-do' },
    { t: 'gap', before: 'من هر روز', after: 'می‌کنم', answer: 'کار',
      tr: 'man har ruz k\\u0101r mikonam', en: 'I work every day',
      options: ['کار', 'فکر', 'کمک', 'صحبت'],
      optionTrs: { 'کار': 'k\\u0101r, work', 'فکر': 'fekr, thought', 'کمک': 'komak, help', 'صحبت': 'sohbat, conversation' },
      why: 'k\\u0101r mikonam, I work. Notice mikonam sits at the end and k\\u0101r never changes.' },
    { t: 'meet', fa: 'شدن', tr: 'shodan', en: 'to become' },
    { t: 'sense', fa: 'شدن', tr: 'shodan', en: 'to become',
      body: 'The second great helper. Where kardan does a thing, shodan has a thing happen to you. b\\u0101z kardan is to open something; b\\u0101z shodan is for something to open. khoshh\\u0101l kardan is to make someone happy; khoshh\\u0101l shodan is to become happy. This pair does the work English needs the passive voice for.' },
    { t: 'meet', fa: 'زدن', tr: 'zadan', en: 'to hit, to strike' },
    { t: 'note', title: 'zadan is stranger than it looks',
      body: 'zadan literally means to strike, and it turns up everywhere: telefon zadan, to phone, literally to strike a telephone. harf zadan, to talk, to strike words. ghadam zadan, to stroll, to strike steps. When a compound looks odd, zadan is usually the reason, and the image is usually worth keeping.' },
    { t: 'meet', fa: 'حرف زدن', tr: 'harf zadan', en: 'to talk', literal: 'word-strike' },
    { t: 'meet', fa: 'تلفن زدن', tr: 'telefon zadan', en: 'to phone', literal: 'telephone-strike' },
    { t: 'meet', fa: 'دوست داشتن', tr: 'dust d\\u0101shtan', en: 'to like, to love', literal: 'friendship-have' },
    { t: 'gap', before: 'تو را خیلی', after: 'دارم', answer: 'دوست',
      tr: 'to r\\u0101 kheyli dust d\\u0101ram', en: 'I love you very much',
      options: ['دوست', 'کار', 'حرف', 'فکر'],
      optionTrs: { 'دوست': 'dust, friendship', 'کار': 'k\\u0101r, work', 'حرف': 'harf, word', 'فکر': 'fekr, thought' },
      why: 'dust d\\u0101ram, literally I have friendship for you. Persian says both like and love with this one compound, and lets context decide.' },
    { t: 'choose', prompt: 'You have learned kardan, shodan, zadan and d\\u0101shtan. Roughly how many Persian verbs does that open?',
      answer: 'Thousands',
      options: ['Thousands', 'About twenty', 'About a hundred', 'Only these four'],
      why: 'Nearly every verb you meet from here will be a noun plus one of these. The helper carries the tense and the person; the noun carries the meaning.' },
    { t: 'listen', fa: 'باهات حرف می‌زنم', tr: 'b\\u0101h\\u0101t harf mizanam', en: 'I will talk to you',
      options: ['باهات حرف می‌زنم', 'کار می‌کنم', 'فکر می‌کنم', 'تلفن می‌زنم'],
      optionTrs: { 'باهات حرف می‌زنم': 'b\\u0101h\\u0101t harf mizanam', 'کار می‌کنم': 'k\\u0101r mikonam', 'فکر می‌کنم': 'fekr mikonam', 'تلفن می‌زنم': 'telefon mizanam' } },
    { t: 'type', fa: 'کار کردن', tr: 'k\\u0101r kardan', en: 'to work' },
  ],
};

/* ------------------------------------------------------------------ */
/* rā, the object marker                                                */
/* ------------------------------------------------------------------ */

const objectMarker: Lesson = {
  key: 'ra',
  title: 'The little word rā',
  titleFa: 'را',
  blurb: 'Two letters that tell you what a sentence is about.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'Persian marks the object, sometimes',
      body: 'r\\u0101 sits after a definite object: the thing being acted on, when it is a specific thing. English uses word order for this and Persian uses r\\u0101, which is why Persian can move words around far more freely than English and still be understood.' },
    { t: 'meet', fa: 'را', tr: 'r\\u0101', en: 'marks a definite object' },
    { t: 'sentence', fa: 'کتاب را خواندم', tr: 'ket\\u0101b r\\u0101 kh\\u0101ndam', en: 'I read the book', focus: 'را' },
    { t: 'sense', fa: 'کتاب را خواندم', tr: 'ket\\u0101b r\\u0101 kh\\u0101ndam', en: 'I read the book',
      body: 'With r\\u0101 it is THE book, one you both know about. Without it, ket\\u0101b kh\\u0101ndam is I read a book, or simply I did some reading. Persian has no word for the, and r\\u0101 quietly does that job for objects.' },
    { t: 'note', title: 'In speech it becomes a vowel',
      body: 'Written r\\u0101. Spoken, it usually collapses onto the word before it: ket\\u0101b-o kh\\u0101ndam. After a vowel it becomes -ro: injuro bebin, look at this. You will hear the o everywhere and see the r\\u0101 everywhere, and they are the same thing.' },
    { t: 'gap', before: 'من تو', after: 'دوست دارم', answer: 'را',
      tr: 'man to r\\u0101 dust d\\u0101ram', en: 'I love you',
      options: ['را', 'به', 'از', 'با'],
      optionTrs: { 'را': 'r\\u0101, object marker', 'به': 'be, to', 'از': 'az, from', 'با': 'b\\u0101, with' },
      why: 'to is the object of the loving, and it is definite, so it takes r\\u0101.' },
    { t: 'choose', prompt: 'What is the difference between ket\\u0101b kh\\u0101ndam and ket\\u0101b r\\u0101 kh\\u0101ndam?',
      answer: 'The second means a specific book',
      options: ['The second means a specific book', 'They are identical', 'The second is past tense', 'The second is a question'],
      why: 'r\\u0101 makes the object definite. I read the book, the one we both have in mind, rather than I did some reading.' },
    { t: 'sentence', fa: 'در را ببند', tr: 'dar r\\u0101 beband', en: 'close the door', focus: 'را' },
    { t: 'build', fa: 'کتاب را خواندم', tr: 'ket\\u0101b r\\u0101 kh\\u0101ndam', en: 'I read the book',
      parts: ['کتاب', 'را', 'خواندم', 'به'],
      partTrs: { 'کتاب': 'ket\\u0101b', 'را': 'r\\u0101', 'خواندم': 'kh\\u0101ndam', 'به': 'be' } },
    { t: 'listen', fa: 'در را ببند', tr: 'dar r\\u0101 beband', en: 'close the door',
      options: ['در را ببند', 'کتاب را خواندم', 'تو را دوست دارم', 'اینجا را ببین'],
      optionTrs: { 'در را ببند': 'dar r\\u0101 beband', 'کتاب را خواندم': 'ket\\u0101b r\\u0101 kh\\u0101ndam', 'تو را دوست دارم': 'to r\\u0101 dust d\\u0101ram', 'اینجا را ببین': 'inj\\u0101 r\\u0101 bebin' } },
    { t: 'type', fa: 'را', tr: 'r\\u0101', en: 'the object marker' },
  ],
};

/* ------------------------------------------------------------------ */
/* The ezāfe chain                                                      */
/* ------------------------------------------------------------------ */

const ezafeChain: Lesson = {
  key: 'ezafe',
  title: 'Chains of ezāfe',
  titleFa: 'اضافه',
  blurb: 'How Persian stacks words, and how to read a long phrase.',
  minutes: 10,
  steps: [
    { t: 'note', title: 'You have been using this since lesson two',
      body: 'esm-e man. m\\u0101dar-e man. ch\\u0101y-e d\\u0101gh. That small -e is the ez\\u0101fe, and it links a noun to whatever describes or possesses it. It is almost never written. At this level the thing to learn is that it chains: one phrase can carry four or five in a row, and reading Persian well means hearing where the chain breaks.' },
    { t: 'meet', fa: 'کتابِ من', tr: 'ket\\u0101b-e man', en: 'my book' },
    { t: 'meet', fa: 'کتابِ خوبِ من', tr: 'ket\\u0101b-e khub-e man', en: 'my good book' },
    { t: 'sense', fa: 'کتابِ خوبِ من', tr: 'ket\\u0101b-e khub-e man', en: 'my good book',
      body: 'book-of-good-of-me. The chain runs left to right in the transliteration and each link adds one more piece. English would say my good book, front-loading everything; Persian starts with the thing itself and adds detail behind it.' },
    { t: 'sentence', fa: 'خانهٔ قدیمیِ پدربزرگِ من', tr: 'kh\\u0101ne-ye ghadimi-ye pedarbozorg-e man', en: 'my grandfather\\u2019s old house', focus: 'خانه' },
    { t: 'note', title: 'Read the chain backwards',
      body: 'kh\\u0101ne-ye ghadimi-ye pedarbozorg-e man is four links: house, old, grandfather, me. To get the English, read it back to front: my grandfather\\u2019s old house. This is the single most useful reading trick in Persian, and it works on almost any long phrase you meet.' },
    { t: 'choose', prompt: 'What does ket\\u0101b-e t\\u0101ze-ye kh\\u0101har-e man mean?',
      answer: 'my sister\\u2019s new book',
      options: ['my sister\\u2019s new book', 'my new sister\\u2019s book', 'the book of my new sister', 'a new book and my sister'],
      why: 'book, new, sister, me. Read it back to front and you have it.' },
    { t: 'gap', before: 'چایِ', after: 'را دوست دارم', answer: 'داغ',
      tr: 'ch\\u0101y-e d\\u0101gh r\\u0101 dust d\\u0101ram', en: 'I like hot tea',
      options: ['داغ', 'سرد', 'بزرگ', 'دور'],
      optionTrs: { 'داغ': 'd\\u0101gh, hot', 'سرد': 'sard, cold', 'بزرگ': 'bozorg, big', 'دور': 'dur, far' },
      why: 'ch\\u0101y-e d\\u0101gh, tea-of-hot. And r\\u0101 after it, because it is a definite object.' },
    { t: 'note', title: 'Why it is never written',
      body: 'The ez\\u0101fe is a short vowel, and Persian does not write short vowels. Readers supply it from knowing where noun phrases join. This is the last piece of the puzzle you met in the vowels lesson: reading Persian is partly an act of reconstruction, and by now you are already doing it.' },
    { t: 'listen', fa: 'خانهٔ قدیمیِ پدربزرگِ من', tr: 'kh\\u0101ne-ye ghadimi-ye pedarbozorg-e man', en: 'my grandfather\\u2019s old house',
      options: ['خانهٔ قدیمیِ پدربزرگِ من', 'کتابِ خوبِ من', 'چایِ داغ', 'مادرِ من'],
      optionTrs: { 'خانهٔ قدیمیِ پدربزرگِ من': 'kh\\u0101ne-ye ghadimi-ye pedarbozorg-e man', 'کتابِ خوبِ من': 'ket\\u0101b-e khub-e man', 'چایِ داغ': 'ch\\u0101y-e d\\u0101gh', 'مادرِ من': 'm\\u0101dar-e man' } },
    { t: 'type', fa: 'کتاب من', tr: 'ket\\u0101b-e man', en: 'my book', hint: 'The ez\\u0101fe is heard, not typed.' },
  ],
};

/* ------------------------------------------------------------------ */
/* The subjunctive                                                      */
/* ------------------------------------------------------------------ */

const subjunctive: Lesson = {
  key: 'subjunctive',
  title: 'Things that have not happened',
  titleFa: 'التزامی',
  blurb: 'Wanting, needing, maybe, and if.',
  minutes: 10,
  steps: [
    { t: 'note', title: 'A whole mood for the unreal',
      body: 'Persian has a separate verb form for things that are wanted, needed, possible or conditional rather than actual. English has traces of it in if I were you. Persian uses it constantly, and you cannot say I want to go without it.' },
    { t: 'meet', fa: 'بروم', tr: 'beravam', en: 'that I go' },
    { t: 'sense', fa: 'بروم', tr: 'beravam', en: 'that I go',
      body: 'The present is miravam, I go. The subjunctive swaps mi- for be-: beravam, that I might go. Same stem, same endings, different prefix. In speech it shortens to beram, exactly as miravam shortens to miram.' },
    { t: 'meet', fa: 'می‌خواهم بروم', tr: 'mikh\\u0101ham beravam', en: 'I want to go' },
    { t: 'note', title: 'Two verbs, and the second one bends',
      body: 'Persian cannot say I want to go with an infinitive the way English does. It says I want that I go. The first verb is ordinary, the second goes subjunctive. mikh\\u0101ham beravam. mitav\\u0101nam beravam, I can go. b\\u0101yad beravam, I must go. The shape never varies.' },
    { t: 'meet', fa: 'باید', tr: 'b\\u0101yad', en: 'must, have to' },
    { t: 'meet', fa: 'شاید', tr: 'sh\\u0101yad', en: 'maybe, perhaps' },
    { t: 'gap', before: 'باید', after: 'خانه', answer: 'بروم',
      tr: 'b\\u0101yad beravam kh\\u0101ne', en: 'I have to go home',
      options: ['بروم', 'می‌روم', 'رفتم', 'رفته'],
      optionTrs: { 'بروم': 'beravam, that I go', 'می‌روم': 'miravam, I go', 'رفتم': 'raftam, I went', 'رفته': 'rafte, gone' },
      why: 'After b\\u0101yad the verb must be subjunctive. b\\u0101yad miravam is not Persian.' },
    { t: 'sentence', fa: 'شاید فردا بیایم', tr: 'sh\\u0101yad fard\\u0101 biy\\u0101yam', en: 'maybe I will come tomorrow', focus: 'شاید' },
    { t: 'choose', prompt: 'Which is correct for I can come?',
      answer: 'می‌توانم بیایم',
      options: ['می‌توانم بیایم', 'می‌توانم می‌آیم', 'توانم آمدن', 'می‌توانم آمدم'],
      optionTrs: { 'می‌توانم بیایم': 'mitav\\u0101nam biy\\u0101yam', 'می‌توانم می‌آیم': 'mitav\\u0101nam mi\\u0101yam', 'توانم آمدن': 'tav\\u0101nam \\u0101madan', 'می‌توانم آمدم': 'mitav\\u0101nam \\u0101madam' },
      why: 'First verb ordinary, second subjunctive. I can that I come.' },
    { t: 'listen', fa: 'باید بروم', tr: 'b\\u0101yad beravam', en: 'I have to go',
      options: ['باید بروم', 'شاید بیایم', 'می‌خواهم بروم', 'می‌روم'],
      optionTrs: { 'باید بروم': 'b\\u0101yad beravam', 'شاید بیایم': 'sh\\u0101yad biy\\u0101yam', 'می‌خواهم بروم': 'mikh\\u0101ham beravam', 'می‌روم': 'miravam' } },
    { t: 'type', fa: 'باید', tr: 'b\\u0101yad', en: 'must' },
  ],
};

/* ------------------------------------------------------------------ */
/* Reported speech                                                      */
/* ------------------------------------------------------------------ */

const reported: Lesson = {
  key: 'reported',
  title: 'Saying what someone else said',
  titleFa: 'نقل قول',
  blurb: 'Persian keeps the original words. English does not.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'Persian does not shift the tense',
      body: 'English moves the verb back: he said he WAS coming. Persian leaves it exactly as the person said it: goft ke mi\\u0101yad, he said that he IS coming. You report the words rather than rewriting them, which is simpler and catches English speakers out constantly.' },
    { t: 'meet', fa: 'گفت که', tr: 'goft ke', en: 'he said that' },
    { t: 'sentence', fa: 'گفت که می‌آید', tr: 'goft ke mi\\u0101yad', en: 'he said that he is coming', focus: 'که' },
    { t: 'sense', fa: 'گفت که می‌آید', tr: 'goft ke mi\\u0101yad', en: 'he said he was coming',
      body: 'The original words were mi\\u0101yam, I am coming. Reporting them, only the person changes, to mi\\u0101yad. The tense stays present even though the saying happened in the past. English would force was coming and Persian never does.' },
    { t: 'meet', fa: 'پرسید', tr: 'porsid', en: 'he asked' },
    { t: 'sentence', fa: 'پرسید که کجا می‌روی', tr: 'porsid ke koj\\u0101 miravi', en: 'he asked where you are going', focus: 'پرسید' },
    { t: 'gap', before: 'گفت', after: 'فردا می‌آید', answer: 'که',
      tr: 'goft ke fard\\u0101 mi\\u0101yad', en: 'he said that he is coming tomorrow',
      options: ['که', 'را', 'ولی', 'اگر'],
      optionTrs: { 'که': 'ke, that', 'را': 'r\\u0101, object marker', 'ولی': 'vali, but', 'اگر': 'agar, if' },
      why: 'ke joins the two clauses. It is the hinge you met in the sentence-joining lesson, doing the same job here.' },
    { t: 'choose', prompt: 'Your friend said mi\\u0101yam. How do you report it?',
      answer: 'گفت که می‌آید',
      options: ['گفت که می‌آید', 'گفت که آمد', 'گفت که می‌آمد', 'گفت که بیاید'],
      optionTrs: { 'گفت که می‌آید': 'goft ke mi\\u0101yad', 'گفت که آمد': 'goft ke \\u0101mad', 'گفت که می‌آمد': 'goft ke mi\\u0101mad', 'گفت که بیاید': 'goft ke biy\\u0101yad' },
      why: 'Keep the tense, change only the person. mi\\u0101yam becomes mi\\u0101yad.' },
    { t: 'listen', fa: 'گفت که فردا می‌آید', tr: 'goft ke fard\\u0101 mi\\u0101yad', en: 'he said he is coming tomorrow',
      options: ['گفت که فردا می‌آید', 'پرسید که کجا می‌روی', 'گفتم که می‌آیم', 'باید بروم'],
      optionTrs: { 'گفت که فردا می‌آید': 'goft ke fard\\u0101 mi\\u0101yad', 'پرسید که کجا می‌روی': 'porsid ke koj\\u0101 miravi', 'گفتم که می‌آیم': 'goftam ke mi\\u0101yam', 'باید بروم': 'b\\u0101yad beravam' } },
    { t: 'type', fa: 'گفت که', tr: 'goft ke', en: 'he said that' },
  ],
};

'''

ENTRIES = '''  {
    key: 'compounds',
    roman: 'XVIII',
    title: 'How verbs are built',
    titleFa: 'فعل مرکب',
    blurb: 'A handful of helpers, and thousands of verbs.',
    level: 'advanced',
    lessons: [compounds],
  },
  {
    key: 'ra',
    roman: 'XIX',
    title: 'The object marker',
    titleFa: 'را',
    blurb: 'Two letters that tell you what a sentence is about.',
    level: 'advanced',
    lessons: [objectMarker],
  },
  {
    key: 'ezafe',
    roman: 'XX',
    title: 'Chains of ezāfe',
    titleFa: 'اضافه',
    blurb: 'Reading long Persian phrases without losing the thread.',
    level: 'advanced',
    lessons: [ezafeChain],
  },
  {
    key: 'subjunctive',
    roman: 'XXI',
    title: 'Things that have not happened',
    titleFa: 'التزامی',
    blurb: 'Wanting, needing, maybe and if.',
    level: 'advanced',
    lessons: [subjunctive],
  },
  {
    key: 'reported',
    roman: 'XXII',
    title: 'Reported speech',
    titleFa: 'نقل قول',
    blurb: 'Persian keeps the words as they were said.',
    level: 'advanced',
    lessons: [reported],
  },
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS not found"); raise SystemExit
s = s.replace(anchor, CODE.replace("\\\\u", "\\u") + "\n" + anchor)

mark = "    lessons: [joining],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: joining entry not found"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + ENTRIES + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'compounds'" in s, "key: 'ra'" in s, "key: 'ezafe'" in s,
      "key: 'subjunctive'" in s, "key: 'reported'" in s)
