# -*- coding: utf-8 -*-
# The intermediate tier: possessive endings, plurals, comparisons, and the
# practical ground of work, shopping, health and making plans.

p = "constants/curriculum.ts"
s = open(p).read()

if "key: 'possessives'" in s:
    print("ABORT: already applied"); raise SystemExit

CODE = '''
/* ------------------------------------------------------------------ */
/* Possessive endings                                                  */
/* ------------------------------------------------------------------ */

const possessives: Lesson = {
  key: 'possessives',
  title: 'My, your, his: the short way',
  titleFa: 'ضمیر ملکی',
  blurb: 'Endings that replace a whole word.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'There is a shorter way to say my',
      body: 'You know ket\\u0101b-e man, the book of me. Persian has a faster version: stick the ending straight onto the noun. ket\\u0101bam, my book. One word instead of three, and it is what people actually say.' },
    { t: 'meet', fa: 'کتابم', tr: 'ket\\u0101bam', en: 'my book' },
    { t: 'meet', fa: 'کتابت', tr: 'ket\\u0101bat', en: 'your book' },
    { t: 'meet', fa: 'کتابش', tr: 'ket\\u0101bash', en: 'his book, her book' },
    { t: 'sense', fa: 'کتابم', tr: 'ket\\u0101bam', en: 'my book',
      body: 'The endings are -am, -at, -ash for one person, and -em\\u0101n, -et\\u0101n, -esh\\u0101n for more than one. They attach to anything: kh\\u0101nam, my house. esmam, my name. m\\u0101daram, my mother. You have already been using one without noticing: delam bar\\u0101t tang shode, my heart.' },
    { t: 'meet', fa: 'اسمم', tr: 'esmam', en: 'my name' },
    { t: 'meet', fa: 'مادرم', tr: 'm\\u0101daram', en: 'my mother' },
    { t: 'gap', before: '', after: 'سارا است', answer: 'اسمم',
      tr: 'esmam S\\u0101r\\u0101 ast', en: 'My name is Sara',
      options: ['اسمم', 'اسمت', 'اسمش', 'اسم'],
      optionTrs: { 'اسمم': 'esmam, my name', 'اسمت': 'esmat, your name', 'اسمش': 'esmash, his or her name', 'اسم': 'esm, name' },
      why: 'The -am ending is mine. Shorter than esm-e man and far more common in speech.' },
    { t: 'note', title: 'Which one to use',
      body: 'Both are correct. ket\\u0101b-e man puts a little weight on the me, so use it when the owner matters: MY book, not yours. ket\\u0101bam is the neutral everyday form. Persian speakers switch between them without thinking, and so will you.' },
    { t: 'choose', prompt: 'How would you say her mother?',
      answer: 'مادرش',
      options: ['مادرش', 'مادرم', 'مادرت', 'مادر من'],
      optionTrs: { 'مادرش': 'm\\u0101darash', 'مادرم': 'm\\u0101daram', 'مادرت': 'm\\u0101darat', 'مادر من': 'm\\u0101dar-e man' },
      why: 'The -ash ending covers his, her and its. Persian does not mark gender at all.' },
    { t: 'listen', fa: 'اسمم سارا است', tr: 'esmam S\\u0101r\\u0101 ast', en: 'my name is Sara',
      options: ['اسمم سارا است', 'کتابم اینجاست', 'مادرش معلم است', 'اسمت چیه؟'],
      optionTrs: { 'اسمم سارا است': 'esmam S\\u0101r\\u0101 ast', 'کتابم اینجاست': 'ket\\u0101bam inj\\u0101st', 'مادرش معلم است': 'm\\u0101darash moallem ast', 'اسمت چیه؟': 'esmat chi-e?' } },
    { t: 'write', fa: 'کتابم', tr: 'ket\\u0101bam', en: 'my book' },
  ],
};

/* ------------------------------------------------------------------ */
/* Plurals                                                             */
/* ------------------------------------------------------------------ */

const plurals: Lesson = {
  key: 'plurals',
  title: 'More than one',
  titleFa: 'جمع',
  blurb: 'One ending does almost all of it.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'ها', tr: '-h\\u0101', en: 'the plural ending' },
    { t: 'sense', fa: 'کتاب‌ها', tr: 'ket\\u0101bh\\u0101', en: 'books',
      body: 'Add -h\\u0101 to anything and it is plural. ket\\u0101bh\\u0101, books. kh\\u0101neh\\u0101, houses. There are no irregular plurals to learn, no changing vowels, no exceptions worth worrying about. After English this feels like being handed something for free.' },
    { t: 'meet', fa: 'خانه‌ها', tr: 'kh\\u0101neh\\u0101', en: 'houses' },
    { t: 'meet', fa: 'بچه‌ها', tr: 'bache-h\\u0101', en: 'children' },
    { t: 'note', title: 'The half-space matters',
      body: 'کتاب‌ها is written with a zero-width non-joiner between the noun and the h\\u0101, so the letters do not fuse. It is the ن\\u06CC\\u0645\\u200Cفاصله key on the keyboard you have been using. In speech it changes nothing; on the page it is the difference between correct Persian and something that looks wrong.' },
    { t: 'meet', fa: 'آن', tr: '-\\u0101n', en: 'the older plural, for people' },
    { t: 'sense', fa: 'دوستان', tr: 'dust\\u0101n', en: 'friends',
      body: 'There is a second plural, -\\u0101n, used mainly for people and in more formal or literary Persian. dust\\u0101n, friends. zan\\u0101n, women. mard\\u0101n, men. dusth\\u0101 is perfectly correct and more casual; dust\\u0101n is what you will meet in writing and in speeches.' },
    { t: 'note', title: 'After a number, stay singular',
      body: 'This one catches everyone. Persian does not pluralise after a number: do ket\\u0101b, two book. panj kh\\u0101ne, five house. The number has already told you there is more than one, so the noun does not repeat the information. English does the same thing in five foot tall.' },
    { t: 'gap', before: 'من سه', after: 'دارم', answer: 'برادر',
      tr: 'man se bar\\u0101dar d\\u0101ram', en: 'I have three brothers',
      options: ['برادر', 'برادرها', 'برادران', 'برادرم'],
      optionTrs: { 'برادر': 'bar\\u0101dar, brother', 'برادرها': 'bar\\u0101darh\\u0101, brothers', 'برادران': 'bar\\u0101dar\\u0101n, brothers, formal', 'برادرم': 'bar\\u0101daram, my brother' },
      why: 'After a number the noun stays singular. se bar\\u0101dar, three brother.' },
    { t: 'choose', prompt: 'Which is the everyday plural of dust, friend?',
      answer: 'دوست‌ها',
      options: ['دوست‌ها', 'دوستان', 'دوستم', 'دوست'],
      optionTrs: { 'دوست‌ها': 'dusth\\u0101', 'دوستان': 'dust\\u0101n', 'دوستم': 'dustam', 'دوست': 'dust' },
      why: 'Both dusth\\u0101 and dust\\u0101n mean friends. dusth\\u0101 is what you say; dust\\u0101n is what you write.' },
    { t: 'listen', fa: 'بچه‌ها کجا هستند؟', tr: 'bache-h\\u0101 koj\\u0101 hastand?', en: 'where are the children?',
      options: ['بچه‌ها کجا هستند؟', 'کتاب‌ها اینجاست', 'سه برادر دارم', 'دوستان من'],
      optionTrs: { 'بچه‌ها کجا هستند؟': 'bache-h\\u0101 koj\\u0101 hastand?', 'کتاب‌ها اینجاست': 'ket\\u0101bh\\u0101 inj\\u0101st', 'سه برادر دارم': 'se bar\\u0101dar d\\u0101ram', 'دوستان من': 'dust\\u0101n-e man' } },
    { t: 'write', fa: 'کتاب‌ها', tr: 'ket\\u0101bh\\u0101', en: 'books' },
  ],
};

/* ------------------------------------------------------------------ */
/* Comparisons                                                         */
/* ------------------------------------------------------------------ */

const comparisons: Lesson = {
  key: 'comparisons',
  title: 'Bigger, smaller, best',
  titleFa: 'مقایسه',
  blurb: 'Two endings, and you can compare anything.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'تر', tr: '-tar', en: 'more, -er' },
    { t: 'meet', fa: 'ترین', tr: '-tarin', en: 'most, -est' },
    { t: 'sense', fa: 'بزرگ‌تر', tr: 'bozorg-tar', en: 'bigger',
      body: 'bozorg, big. bozorgtar, bigger. bozorgtarin, biggest. Two endings and every adjective you know just tripled. No irregular forms, no more and most to worry about: khubtar and khubtarin are as regular as everything else.' },
    { t: 'meet', fa: 'بزرگ‌تر', tr: 'bozorgtar', en: 'bigger' },
    { t: 'meet', fa: 'بهتر', tr: 'behtar', en: 'better' },
    { t: 'note', title: 'The one exception worth knowing',
      body: 'khub is good, but better is behtar rather than khubtar, from beh, an older word for good. Same as English good and better coming from different roots. behtarin is best. It is the only irregular comparison you really need.' },
    { t: 'meet', fa: 'از', tr: 'az', en: 'than, from' },
    { t: 'sentence', fa: 'این از آن بهتر است', tr: 'in az \\u0101n behtar ast', en: 'this is better than that', focus: 'از' },
    { t: 'sense', fa: 'از', tr: 'az', en: 'than',
      body: 'Persian uses az, from, where English uses than. This is FROM that better. The thing being compared against comes first, then az, then the comparison. It sounds backwards for a week and then it does not.' },
    { t: 'gap', before: 'تهران از اصفهان', after: 'است', answer: 'بزرگ‌تر',
      tr: 'Tehr\\u0101n az Esfah\\u0101n bozorgtar ast', en: 'Tehran is bigger than Isfahan',
      options: ['بزرگ‌تر', 'بزرگ', 'بزرگ‌ترین', 'کوچک'],
      optionTrs: { 'بزرگ‌تر': 'bozorgtar, bigger', 'بزرگ': 'bozorg, big', 'بزرگ‌ترین': 'bozorgtarin, biggest', 'کوچک': 'kuchak, small' },
      why: 'Comparing two things takes -tar. -tarin would mean the biggest of all, which needs no az.' },
    { t: 'sentence', fa: 'بهترین دوست من', tr: 'behtarin dust-e man', en: 'my best friend', focus: 'بهترین' },
    { t: 'choose', prompt: 'How do you say the smallest?',
      answer: 'کوچک‌ترین',
      options: ['کوچک‌ترین', 'کوچک‌تر', 'کوچک', 'از کوچک'],
      optionTrs: { 'کوچک‌ترین': 'kuchaktarin', 'کوچک‌تر': 'kuchaktar', 'کوچک': 'kuchak', 'از کوچک': 'az kuchak' },
      why: '-tarin is the most of something. And unlike -tar, it goes before the noun: kuchaktarin kh\\u0101ne, the smallest house.' },
    { t: 'listen', fa: 'این از آن بهتر است', tr: 'in az \\u0101n behtar ast', en: 'this is better than that',
      options: ['این از آن بهتر است', 'بهترین دوست من', 'تهران بزرگ‌تر است', 'کوچک‌ترین'],
      optionTrs: { 'این از آن بهتر است': 'in az \\u0101n behtar ast', 'بهترین دوست من': 'behtarin dust-e man', 'تهران بزرگ‌تر است': 'Tehr\\u0101n bozorgtar ast', 'کوچک‌ترین': 'kuchaktarin' } },
    { t: 'write', fa: 'بهتر', tr: 'behtar', en: 'better' },
  ],
};

/* ------------------------------------------------------------------ */
/* Work and the day                                                    */
/* ------------------------------------------------------------------ */

const work: Lesson = {
  key: 'work',
  title: 'Work and the shape of a day',
  titleFa: 'کار و روز',
  blurb: 'What you do, and when you do it.',
  minutes: 9,
  steps: [
    { t: 'meet', fa: 'کار', tr: 'k\\u0101r', en: 'work, job' },
    { t: 'meet', fa: 'شغل', tr: 'shoghl', en: 'occupation, profession' },
    { t: 'sentence', fa: 'شغلت چیه؟', tr: 'shoghlet chi-e?', en: 'what do you do?', focus: 'شغل' },
    { t: 'meet', fa: 'معلم', tr: 'moallem', en: 'teacher' },
    { t: 'meet', fa: 'دکتر', tr: 'doktor', en: 'doctor' },
    { t: 'meet', fa: 'مهندس', tr: 'mohandes', en: 'engineer' },
    { t: 'note', title: 'Titles are used constantly',
      body: 'Iranians address people by profession far more than English speakers do. Doktor Ahmadi, Mohandes Rez\\u0101i, Ost\\u0101d for a teacher or master of a craft. Using someone\\u2019s title is ordinary respect rather than formality, and dropping it can read as a slight.' },
    { t: 'meet', fa: 'دانشگاه', tr: 'd\\u0101neshg\\u0101h', en: 'university', literal: 'knowledge-place' },
    { t: 'meet', fa: 'دفتر', tr: 'daftar', en: 'office' },
    { t: 'gap', before: 'من', after: 'هستم', answer: 'معلم',
      tr: 'man moallem hastam', en: 'I am a teacher',
      options: ['معلم', 'دکتر', 'مهندس', 'دانشگاه'],
      optionTrs: { 'معلم': 'moallem, teacher', 'دکتر': 'doktor, doctor', 'مهندس': 'mohandes, engineer', 'دانشگاه': 'd\\u0101neshg\\u0101h, university' },
      why: 'Persian does not use a for a job: man moallem hastam, I teacher am.' },
    { t: 'meet', fa: 'صبح زود', tr: 'sobh zud', en: 'early morning' },
    { t: 'sentence', fa: 'صبح زود سر کار می‌روم', tr: 'sobh zud sar-e k\\u0101r miravam', en: 'I go to work early in the morning', focus: 'کار' },
    { t: 'sense', fa: 'سر کار', tr: 'sar-e k\\u0101r', en: 'at work, to work',
      body: 'sar is head, and sar-e k\\u0101r is literally at the head of work. Persian uses sar for being at or on something: sar-e miz, at the table. sar-e r\\u0101h, on the way. It is one of those small words that turns up everywhere once you notice it.' },
    { t: 'listen', fa: 'شغلت چیه؟', tr: 'shoghlet chi-e?', en: 'what do you do?',
      options: ['شغلت چیه؟', 'کجا کار می‌کنی؟', 'معلم هستم', 'سر کار می‌روم'],
      optionTrs: { 'شغلت چیه؟': 'shoghlet chi-e?', 'کجا کار می‌کنی؟': 'koj\\u0101 k\\u0101r mikoni?', 'معلم هستم': 'moallem hastam', 'سر کار می‌روم': 'sar-e k\\u0101r miravam' } },
    { t: 'write', fa: 'کار', tr: 'k\\u0101r', en: 'work' },
  ],
};

/* ------------------------------------------------------------------ */
/* Shopping                                                            */
/* ------------------------------------------------------------------ */

const shopping: Lesson = {
  key: 'shopping',
  title: 'Buying things',
  titleFa: 'خرید',
  blurb: 'Prices, bargaining, and the ritual of refusing payment.',
  minutes: 9,
  steps: [
    { t: 'meet', fa: 'خریدن', tr: 'kharidan', en: 'to buy' },
    { t: 'meet', fa: 'گران', tr: 'ger\\u0101n', en: 'expensive' },
    { t: 'meet', fa: 'ارزان', tr: 'arz\\u0101n', en: 'cheap' },
    { t: 'sentence', fa: 'خیلی گران است', tr: 'kheyli ger\\u0101n ast', en: 'it is very expensive', focus: 'گران' },
    { t: 'meet', fa: 'تخفیف', tr: 'takhfif', en: 'discount' },
    { t: 'sentence', fa: 'تخفیف می‌دهید؟', tr: 'takhfif midahid?', en: 'will you give a discount?', focus: 'تخفیف' },
    { t: 'note', title: 'Bargaining is expected, up to a point',
      body: 'In a bazaar, yes. In a shop with price tags, no. Asking takhfif midahid in a supermarket will get you a blank look; asking it over a carpet is the beginning of a conversation both people expect to have.' },
    { t: 'meet', fa: 'قابل نداره', tr: 'gh\\u0101bel nad\\u0101re', en: 'please, it is nothing', literal: 'it has no worth' },
    { t: 'note', title: 'The shopkeeper will refuse your money',
      body: 'gh\\u0101bel nad\\u0101re means it is not worthy of you, take it. They do not mean it. This is taarof at its purest: you insist on paying, they refuse once or twice, and then they tell you the price. Walking out without paying is not an option anyone is offering.' },
    { t: 'gap', before: 'این خیلی', after: 'است', answer: 'گران',
      tr: 'in kheyli ger\\u0101n ast', en: 'this is very expensive',
      options: ['گران', 'ارزان', 'تخفیف', 'خوب'],
      optionTrs: { 'گران': 'ger\\u0101n, expensive', 'ارزان': 'arz\\u0101n, cheap', 'تخفیف': 'takhfif, discount', 'خوب': 'khub, good' },
      why: 'ger\\u0101n. And saying it out loud is the standard opening move in a bazaar.' },
    { t: 'choose', prompt: 'The shopkeeper says gh\\u0101bel nad\\u0101re. What do you do?',
      answer: 'Insist on paying',
      options: ['Insist on paying', 'Thank them and leave', 'Offer half', 'Walk away'],
      why: 'It is taarof. Insist, they will name a price, and everyone has performed the ritual correctly.' },
    { t: 'listen', fa: 'تخفیف می‌دهید؟', tr: 'takhfif midahid?', en: 'will you give a discount?',
      options: ['تخفیف می‌دهید؟', 'خیلی گران است', 'چقدر است؟', 'قابل نداره'],
      optionTrs: { 'تخفیف می‌دهید؟': 'takhfif midahid?', 'خیلی گران است': 'kheyli ger\\u0101n ast', 'چقدر است؟': 'cheghadr ast?', 'قابل نداره': 'gh\\u0101bel nad\\u0101re' } },
    { t: 'write', fa: 'گران', tr: 'ger\\u0101n', en: 'expensive' },
  ],
};

/* ------------------------------------------------------------------ */
/* Health                                                              */
/* ------------------------------------------------------------------ */

const health: Lesson = {
  key: 'health',
  title: 'When something hurts',
  titleFa: 'سلامتی',
  blurb: 'The body, and saying what is wrong.',
  minutes: 9,
  steps: [
    { t: 'meet', fa: 'سر', tr: 'sar', en: 'head' },
    { t: 'meet', fa: 'دل', tr: 'del', en: 'stomach, heart' },
    { t: 'sense', fa: 'دل', tr: 'del', en: 'stomach and heart',
      body: 'You met del as the seat of feeling. It is also the stomach. delam dard mikone can mean my stomach hurts or, in the right conversation, that something is grieving you. Persian keeps the physical and emotional in the same word and lets you work out which.' },
    { t: 'meet', fa: 'درد', tr: 'dard', en: 'pain' },
    { t: 'sentence', fa: 'سرم درد می‌کند', tr: 'saram dard mikonad', en: 'my head hurts', focus: 'درد' },
    { t: 'sense', fa: 'سرم درد می‌کند', tr: 'saram dard mikonad', en: 'my head hurts',
      body: 'Literally my head does pain. Another compound verb, dard kardan, to hurt, built exactly like k\\u0101r kardan. And the possessive ending you just learned is doing the work: sar-am, my head.' },
    { t: 'meet', fa: 'مریض', tr: 'mariz', en: 'ill' },
    { t: 'meet', fa: 'دارو', tr: 'd\\u0101ru', en: 'medicine' },
    { t: 'meet', fa: 'داروخانه', tr: 'd\\u0101rukh\\u0101ne', en: 'pharmacy', literal: 'medicine-house' },
    { t: 'gap', before: 'من', after: 'هستم', answer: 'مریض',
      tr: 'man mariz hastam', en: 'I am ill',
      options: ['مریض', 'دارو', 'درد', 'سر'],
      optionTrs: { 'مریض': 'mariz, ill', 'دارو': 'd\\u0101ru, medicine', 'درد': 'dard, pain', 'سر': 'sar, head' },
      why: 'mariz hastam, I am ill. In speech it shortens to marizam.' },
    { t: 'note', title: 'What to say to someone ill',
      body: 'zud khub sho, get well soon. Or the warmer beh sal\\u0101mati, to your health. And if someone tells you they are unwell, the expected response is concern followed by an offer of help, not a polite acknowledgement. Persian does not do the English habit of leaving people to it.' },
    { t: 'listen', fa: 'سرم درد می‌کند', tr: 'saram dard mikonad', en: 'my head hurts',
      options: ['سرم درد می‌کند', 'مریض هستم', 'داروخانه کجاست؟', 'دلم درد می‌کند'],
      optionTrs: { 'سرم درد می‌کند': 'saram dard mikonad', 'مریض هستم': 'mariz hastam', 'داروخانه کجاست؟': 'd\\u0101rukh\\u0101ne koj\\u0101st?', 'دلم درد می‌کند': 'delam dard mikone' } },
    { t: 'write', fa: 'درد', tr: 'dard', en: 'pain' },
  ],
};

/* ------------------------------------------------------------------ */
/* Making plans                                                        */
/* ------------------------------------------------------------------ */

const plans: Lesson = {
  key: 'plans',
  title: 'Making plans',
  titleFa: 'قرار گذاشتن',
  blurb: 'Inviting, accepting, and how to tell a real invitation from a polite one.',
  minutes: 10,
  steps: [
    { t: 'meet', fa: 'قرار', tr: 'ghar\\u0101r', en: 'plan, arrangement, date' },
    { t: 'meet', fa: 'قرار گذاشتن', tr: 'ghar\\u0101r gozashtan', en: 'to make a plan', literal: 'to place an arrangement' },
    { t: 'sentence', fa: 'فردا قرار داریم', tr: 'fard\\u0101 ghar\\u0101r d\\u0101rim', en: 'we have plans tomorrow', focus: 'قرار' },
    { t: 'meet', fa: 'دعوت', tr: 'davat', en: 'invitation' },
    { t: 'sentence', fa: 'دعوتت می‌کنم', tr: 'davatet mikonam', en: 'I am inviting you', focus: 'دعوت' },
    { t: 'note', title: 'Not every invitation is one',
      body: 'This is the hardest thing about Persian social life. bi\\u0101 kh\\u0101ne-ye m\\u0101, come to our house, may be a genuine invitation or pure courtesy. The test is repetition and specificity: a real invitation comes back a second time and names a day. A polite one stays vague and is never mentioned again. Iranians read this instantly and nobody teaches it.' },
    { t: 'meet', fa: 'کی؟', tr: 'key?', en: 'when?' },
    { t: 'meet', fa: 'ساعت چند؟', tr: 's\\u0101at chand?', en: 'what time?' },
    { t: 'sense', fa: 'ساعت چند؟', tr: 's\\u0101at chand?', en: 'what time?',
      body: 's\\u0101at is both hour and clock and watch. s\\u0101at chand is literally hour how-many. And s\\u0101at panj is five o\\u2019clock. If you want to test whether an invitation is real, this is the question to ask: a genuine one produces an answer.' },
    { t: 'gap', before: 'فردا ساعت', after: 'می‌بینمت', answer: 'پنج',
      tr: 'fard\\u0101 s\\u0101at panj mibinamet', en: 'I will see you tomorrow at five',
      options: ['پنج', 'قرار', 'دعوت', 'کی'],
      optionTrs: { 'پنج': 'panj, five', 'قرار': 'ghar\\u0101r, plan', 'دعوت': 'davat, invitation', 'کی': 'key, when' },
      why: 's\\u0101at panj, five o\\u2019clock. And mibinamet, I see you, with the object ending stuck on the end.' },
    { t: 'choose', prompt: 'Someone says come to our house sometime, and never mentions it again. What was it?',
      answer: 'Politeness, not a plan',
      options: ['Politeness, not a plan', 'A firm invitation', 'A request for an invitation', 'A refusal'],
      why: 'Real invitations repeat and name a time. This one was taarof, and turning up would be a mistake.' },
    { t: 'listen', fa: 'فردا قرار داریم', tr: 'fard\\u0101 ghar\\u0101r d\\u0101rim', en: 'we have plans tomorrow',
      options: ['فردا قرار داریم', 'دعوتت می‌کنم', 'ساعت چند؟', 'کی می‌آیی؟'],
      optionTrs: { 'فردا قرار داریم': 'fard\\u0101 ghar\\u0101r d\\u0101rim', 'دعوتت می‌کنم': 'davatet mikonam', 'ساعت چند؟': 's\\u0101at chand?', 'کی می‌آیی؟': 'key mi\\u0101yi?' } },
    { t: 'write', fa: 'قرار', tr: 'ghar\\u0101r', en: 'plan' },
  ],
};

'''

ENTRIES = '''  {
    key: 'possessives',
    roman: 'XXIII',
    title: 'My, your, his',
    titleFa: 'ضمیر ملکی',
    blurb: 'Endings that replace a whole word.',
    level: 'intermediate',
    lessons: [possessives, plurals],
  },
  {
    key: 'comparisons',
    roman: 'XXIV',
    title: 'Comparing things',
    titleFa: 'مقایسه',
    blurb: 'Two endings, and every adjective triples.',
    level: 'intermediate',
    lessons: [comparisons],
  },
  {
    key: 'work',
    roman: 'XXV',
    title: 'Work and the day',
    titleFa: 'کار و روز',
    blurb: 'What you do, and when you do it.',
    level: 'intermediate',
    lessons: [work],
  },
  {
    key: 'shopping',
    roman: 'XXVI',
    title: 'Buying things',
    titleFa: 'خرید',
    blurb: 'Prices, bargaining, and refusing to take your money.',
    level: 'intermediate',
    lessons: [shopping],
  },
  {
    key: 'health',
    roman: 'XXVII',
    title: 'When something hurts',
    titleFa: 'سلامتی',
    blurb: 'The body, and saying what is wrong.',
    level: 'intermediate',
    lessons: [health],
  },
  {
    key: 'plans',
    roman: 'XXVIII',
    title: 'Making plans',
    titleFa: 'قرار',
    blurb: 'Telling a real invitation from a polite one.',
    level: 'intermediate',
    lessons: [plans],
  },
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS not found"); raise SystemExit
s = s.replace(anchor, CODE.replace("\\\\u", "\\u") + "\n" + anchor)

mark = "    lessons: [pastTense],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: past unit entry not found"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + ENTRIES + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'possessives'" in s, "key: 'comparisons'" in s, "key: 'work'" in s,
      "key: 'shopping'" in s, "key: 'health'" in s, "key: 'plans'" in s)
