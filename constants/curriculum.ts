// The Persian curriculum.
//
// Shape: UNIT -> LESSON -> STEP[]. A lesson walks one small set of words
// through the same progression a good textbook uses:
//
//   meet      see the word, its sound, its meaning
//   sense     what it actually means in use, where the English is misleading
//   sentence  the word inside a real sentence
//   listen    hear it without seeing it
//   build     assemble the sentence from parts
//   write     produce it yourself
//   note      a short cultural or grammatical aside
//
// Every Persian string carries a transliteration with the short vowels
// written out, because they are not in the script and a learner cannot
// guess them.

export type Step =
  | { t: 'meet'; fa: string; tr: string; en: string; literal?: string }
  | { t: 'sense'; fa: string; tr: string; en: string; body: string }
  | { t: 'sentence'; fa: string; tr: string; en: string; focus?: string }
  | { t: 'listen'; fa: string; tr: string; en: string; options: string[]; optionTrs?: Record<string, string> }
  | { t: 'build'; fa: string; tr: string; en: string; parts: string[]; partTrs?: Record<string, string> }
  | { t: 'write'; fa: string; tr: string; en: string; hint?: string }
  | { t: 'choose'; prompt: string; answer: string; options: string[]; why?: string; optionTrs?: Record<string, string> }
  | { t: 'note'; title: string; body: string };

export type Lesson = {
  key: string;
  title: string;
  titleFa: string;
  blurb: string;
  minutes: number;
  steps: Step[];
};

export type Unit = {
  key: string;
  roman: string;
  title: string;
  titleFa: string;
  blurb: string;
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  lessons: Lesson[];
};

/* ------------------------------------------------------------------ */
/* UNIT I — the first words you will ever need                         */
/* ------------------------------------------------------------------ */

const greetings: Lesson = {
  key: 'greetings',
  title: 'Hello, and how are you',
  titleFa: 'سلام و احوالپرسی',
  blurb: 'The exchange that opens every Persian conversation.',
  minutes: 6,
  steps: [
    { t: 'meet', fa: 'سلام', tr: 'salām', en: 'hello', literal: 'peace' },
    {
      t: 'sense',
      fa: 'سلام',
      tr: 'salām',
      en: 'hello',
      body:
        'It is the same word as the Arabic salām, meaning peace, and it works at every hour and with anyone. ' +
        'There is no Persian equivalent of the awkward choice between good morning and good evening. You say salām and you are through the door.',
    },
    { t: 'meet', fa: 'درود', tr: 'dorud', en: 'hello, greetings', literal: 'praise, blessing' },
    { t: 'note', title: 'The older hello',
      body: 'dorud is the Persian word, older than salām and with no Arabic in it. Some people prefer it for exactly that reason, and you will hear it more in writing, in poetry, and among people who care about keeping Persian Persian. salām is what you will hear in the street. Both are correct, and using dorud says something small about you.' },
    { t: 'meet', fa: 'خوبی؟', tr: 'khubi?', en: 'are you well?', literal: 'you are good?' },
    {
      t: 'sense',
      fa: 'خوبی؟',
      tr: 'khubi?',
      en: 'are you well?',
      body:
        'Persian does not ask how are you as a question expecting an answer. ' +
        'It asks are you well, and the expected reply is that you are, followed by asking the same thing back. ' +
        'Skipping the return question is the rude part, not a short answer.',
    },
    {
      t: 'sentence',
      fa: 'سلام، خوبی؟',
      tr: 'salām, khubi?',
      en: 'Hello, are you well?',
      focus: 'خوبی',
    },
    { t: 'meet', fa: 'مرسی', tr: 'mersi', en: 'thank you', literal: 'from the French merci' },
    {
      t: 'note',
      title: 'A French word in the middle of Persian',
      body:
        'mersi is borrowed straight from French and is what most Iranians actually say. ' +
        'The formal alternatives, motshakkeram and mamnun, are both correct and both heavier. ' +
        'In speech, mersi is the default.',
    },
    {
      t: 'sentence',
      fa: 'خوبم، مرسی',
      tr: 'khubam, mersi',
      en: 'I am well, thank you',
      focus: 'خوبم',
    },
    {
      t: 'choose',
      prompt: 'Someone says salām, khubi? What do you say back?',
      answer: 'خوبم، مرسی. تو خوبی؟',
      options: ['خوبم، مرسی. تو خوبی؟', 'سلام سلام', 'خداحافظ', 'مرسی خداحافظ'],
      optionTrs: { 'خوبم، مرسی. تو خوبی؟': 'khubam, mersi. to khubi?', 'سلام سلام': 'salām salām', 'خداحافظ': 'khodāhāfez', 'مرسی خداحافظ': 'mersi khodāhāfez' },
      why: 'You answer, you thank them, and you ask back. The return question is the part that matters.',
    },
    {
      t: 'listen',
      fa: 'سلام، خوبی؟',
      tr: 'salām, khubi?',
      en: 'Hello, are you well?',
      options: ['سلام، خوبی؟', 'خوبم، مرسی', 'اسم من', 'خداحافظ'],
    },
    {
      t: 'build',
      fa: 'خوبم، مرسی',
      tr: 'khubam, mersi',
      en: 'I am well, thank you',
      parts: ['خوبم', 'مرسی', 'سلام', 'خوبی'],
    },
    { t: 'meet', fa: 'خداحافظ', tr: 'khodāhāfez', en: 'goodbye', literal: 'may God protect you' },
    {
      t: 'note',
      title: 'The goodbye is a blessing',
      body:
        'khodāhāfez breaks into khodā, God, and hāfez, protector. You are saying may God keep you. ' +
        'Nobody hears the religion in it any more, the way nobody hears goodbye as God be with you, but it is there.',
    },
    { t: 'write', fa: 'سلام', tr: 'salām', en: 'hello', hint: 'Four letters, right to left: س ل ا م' },
  ],
};

const introductions: Lesson = {
  key: 'introductions',
  title: 'Saying who you are',
  titleFa: 'معرفی کردن',
  blurb: 'Your name, and asking for someone else’s.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'من', tr: 'man', en: 'I, me' },
    { t: 'meet', fa: 'اسم', tr: 'esm', en: 'name' },
    {
      t: 'sense',
      fa: 'اسم من',
      tr: 'esme man',
      en: 'my name',
      body:
        'Persian links two nouns with a small vowel sound, the ezāfe: esm-e man, the name of me. ' +
        'It is not written in the script at all. You hear it, you say it, and you will not see it on the page. ' +
        'This one sound holds most of Persian grammar together.',
    },
    {
      t: 'sentence',
      fa: 'اسم من نوجان است',
      tr: 'esme man Nojān ast',
      en: 'My name is Nojan',
      focus: 'اسم من',
    },
    {
      t: 'note',
      title: 'What people actually say',
      body:
        'The written form ends in ast. In speech it collapses to e: esme man Nojān-e. ' +
        'Both are correct. Learn the written form so you can read, and expect the spoken one everywhere else.',
    },
    { t: 'meet', fa: 'اسم تو چیه؟', tr: 'esme to chi-e?', en: 'what is your name?' },
    {
      t: 'choose',
      prompt: 'Which is asking, rather than telling?',
      answer: 'اسم تو چیه؟',
      options: ['اسم تو چیه؟', 'اسم من نوجان است', 'من خوبم', 'سلام'],
      optionTrs: { 'اسم تو چیه؟': 'esme to chi-e?', 'اسم من نوجان است': 'esme man Nojān ast', 'من خوبم': 'man khubam', 'سلام': 'salām' },
      why: 'chi-e is what is it. The question sits at the end, where Persian usually puts it.',
    },
    {
      t: 'build',
      fa: 'اسم من نوجان است',
      tr: 'esme man Nojān ast',
      en: 'My name is Nojan',
      parts: ['اسم', 'من', 'نوجان', 'است'],
    },
    { t: 'meet', fa: 'خوشبختم', tr: 'khoshbakhtam', en: 'pleased to meet you', literal: 'I am fortunate' },
    {
      t: 'sense',
      fa: 'خوشبختم',
      tr: 'khoshbakhtam',
      en: 'pleased to meet you',
      body:
        'khosh is good or pleasant, bakht is fortune. You are saying I am fortunate, meaning fortunate to have met you. ' +
        'Persian tends to put the good feeling on your own side rather than complimenting the other person directly.',
    },
    {
      t: 'listen',
      fa: 'اسم تو چیه؟',
      tr: 'esme to chi-e?',
      en: 'what is your name?',
      options: ['اسم تو چیه؟', 'اسم من نوجان است', 'خوشبختم', 'خداحافظ'],
    },
    { t: 'write', fa: 'اسم من', tr: 'esme man', en: 'my name', hint: 'Two words. The ezāfe between them is heard, not written.' },
  ],
};

const politeness: Lesson = {
  key: 'politeness',
  title: 'The words that soften everything',
  titleFa: 'ادب',
  blurb: 'Please, sorry, and the ritual of taarof.',
  minutes: 6,
  steps: [
    { t: 'meet', fa: 'لطفاً', tr: 'lotfan', en: 'please', literal: 'with kindness' },
    { t: 'meet', fa: 'ببخشید', tr: 'bebakhshid', en: 'excuse me, sorry', literal: 'forgive' },
    {
      t: 'sense',
      fa: 'ببخشید',
      tr: 'bebakhshid',
      en: 'excuse me, sorry',
      body:
        'One word covers getting someone’s attention, squeezing past them, and apologising properly. ' +
        'It is the single most useful word to have ready in a Persian street.',
    },
    {
      t: 'sentence',
      fa: 'ببخشید، یک سؤال دارم',
      tr: 'bebakhshid, yek so’āl dāram',
      en: 'Excuse me, I have a question',
      focus: 'ببخشید',
    },
    { t: 'meet', fa: 'قربان شما', tr: 'ghorbān-e shomā', en: 'at your service', literal: 'a sacrifice for you' },
    {
      t: 'note',
      title: 'Taarof begins here',
      body:
        'Persian politeness runs on deliberate overstatement. ghorbān-e shomā literally offers yourself as a sacrifice, ' +
        'and it means roughly you are too kind. Nobody takes it literally. The extravagance is the courtesy: ' +
        'you say more than you mean, and the other person understands exactly how much to discount it.',
    },
    {
      t: 'choose',
      prompt: 'You need to get past someone in a crowded bazaar. What do you say?',
      answer: 'ببخشید',
      options: ['ببخشید', 'خداحافظ', 'خوشبختم', 'مرسی'],
      optionTrs: { 'ببخشید': 'bebakhshid', 'خداحافظ': 'khodāhāfez', 'خوشبختم': 'khoshbakhtam', 'مرسی': 'mersi' },
      why: 'bebakhshid does everything here: it excuses you, and it asks without asking.',
    },
    {
      t: 'build',
      fa: 'ببخشید، یک سؤال دارم',
      tr: 'bebakhshid, yek so’āl dāram',
      en: 'Excuse me, I have a question',
      parts: ['ببخشید', 'یک', 'سؤال', 'دارم'],
    },
    { t: 'write', fa: 'مرسی', tr: 'mersi', en: 'thank you' },
  ],
};

/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/* UNIT II — the people closest to you                                 */
/* ------------------------------------------------------------------ */

const familyWords: Lesson = {
  key: 'family-words',
  title: 'Mother, father, the rest',
  titleFa: 'خانواده',
  blurb: 'The words you will use more than any others.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'مادر', tr: 'm\u0101dar', en: 'mother' },
    { t: 'meet', fa: 'پدر', tr: 'pedar', en: 'father' },
    { t: 'note', title: 'You already half know these',
      body: 'm\u0101dar and pedar are cousins of mother and father, and of Latin mater and pater. Persian, English, Latin and Sanskrit all descend from the same ancestor language, and the family words changed least of all. d\u0101dar and brother, dokhtar and daughter. Six thousand years apart and still recognisable.' },
    { t: 'meet', fa: 'مامان', tr: 'm\u0101m\u0101n', en: 'mum', literal: 'from the French maman' },
    { t: 'meet', fa: 'بابا', tr: 'b\u0101b\u0101', en: 'dad' },
    { t: 'sense', fa: 'مامان و بابا', tr: 'm\u0101m\u0101n va b\u0101b\u0101', en: 'mum and dad',
      body: 'Nobody calls their parents m\u0101dar and pedar to their face. Those are the words for describing them to someone else. In the room you say m\u0101m\u0101n and b\u0101b\u0101, and you will hear grown adults with grey hair using exactly these.' },
    { t: 'meet', fa: 'خواهر', tr: 'kh\u0101har', en: 'sister' },
    { t: 'meet', fa: 'برادر', tr: 'bar\u0101dar', en: 'brother' },
    { t: 'choose', prompt: 'Which one means sister?',
      answer: 'خواهر',
      options: ['خواهر', 'برادر', 'مادر', 'پدر'],
      optionTrs: { 'خواهر': 'kh\u0101har', 'برادر': 'bar\u0101dar', 'مادر': 'm\u0101dar', 'پدر': 'pedar' },
      why: 'kh\u0101har, sister. The kh is the sound at the back of the throat, like the ch in Bach.' },
    { t: 'listen', fa: 'مادر', tr: 'm\u0101dar', en: 'mother',
      options: ['مادر', 'پدر', 'برادر', 'خواهر'],
      optionTrs: { 'مادر': 'm\u0101dar', 'پدر': 'pedar', 'برادر': 'bar\u0101dar', 'خواهر': 'kh\u0101har' } },
    { t: 'meet', fa: 'خانواده', tr: 'kh\u0101nev\u0101de', en: 'family', literal: 'those of the house' },
    { t: 'sentence', fa: 'خانوادهٔ من', tr: 'kh\u0101nev\u0101de-ye man', en: 'my family', focus: 'خانواده' },
    { t: 'write', fa: 'مادر', tr: 'm\u0101dar', en: 'mother' },
  ],
};

const familyTalk: Lesson = {
  key: 'family-talk',
  title: 'Talking about them',
  titleFa: 'حرف زدن دربارهٔ خانواده',
  blurb: 'Saying who someone is, and how many you have.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'این', tr: 'in', en: 'this' },
    { t: 'sentence', fa: 'این مادر من است', tr: 'in m\u0101dare man ast', en: 'This is my mother', focus: 'این' },
    { t: 'sense', fa: 'مادرِ من', tr: 'm\u0101dar-e man', en: 'my mother',
      body: 'The ez\u0101fe again, that small e between two words. m\u0101dar-e man is the mother of me. You met it in esm-e man. It will appear in almost every sentence you build from here, and it is still never written.' },
    { t: 'build', fa: 'این مادر من است', tr: 'in m\u0101dare man ast', en: 'This is my mother',
      parts: ['این', 'مادر', 'من', 'است'],
      partTrs: { 'این': 'in', 'مادر': 'm\u0101dar', 'من': 'man', 'است': 'ast' } },
    { t: 'meet', fa: 'دارم', tr: 'd\u0101ram', en: 'I have' },
    { t: 'sentence', fa: 'یک خواهر دارم', tr: 'yek kh\u0101har d\u0101ram', en: 'I have one sister', focus: 'دارم' },
    { t: 'note', title: 'The verb waits at the end',
      body: 'Persian puts the verb last. I one sister have. It feels backwards for about a week and then it stops feeling like anything at all. Once you expect the verb at the end you can follow long sentences without knowing every word in the middle.' },
    { t: 'choose', prompt: 'How do you say I have two brothers?',
      answer: 'دو برادر دارم',
      options: ['دو برادر دارم', 'دارم دو برادر', 'برادر من است', 'دو خواهر دارم'],
      optionTrs: { 'دو برادر دارم': 'do bar\u0101dar d\u0101ram', 'دارم دو برادر': 'd\u0101ram do bar\u0101dar', 'برادر من است': 'bar\u0101dare man ast', 'دو خواهر دارم': 'do kh\u0101har d\u0101ram' },
      why: 'Number, noun, verb. The verb goes last, always.' },
    { t: 'listen', fa: 'یک خواهر دارم', tr: 'yek kh\u0101har d\u0101ram', en: 'I have one sister',
      options: ['یک خواهر دارم', 'دو برادر دارم', 'این مادر من است', 'خانوادهٔ من'],
      optionTrs: { 'یک خواهر دارم': 'yek kh\u0101har d\u0101ram', 'دو برادر دارم': 'do bar\u0101dar d\u0101ram', 'این مادر من است': 'in m\u0101dare man ast', 'خانوادهٔ من': 'kh\u0101nev\u0101de-ye man' } },
    { t: 'write', fa: 'دارم', tr: 'd\u0101ram', en: 'I have' },
  ],
};



/* ------------------------------------------------------------------ */
/* UNIT III — counting, and the numerals themselves                    */
/* ------------------------------------------------------------------ */

const numbersOne: Lesson = {
  key: 'numbers-one',
  title: 'One to ten',
  titleFa: 'یک تا ده',
  blurb: 'The numbers, and the shapes Iran writes them with.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'یک', tr: 'yek', en: 'one' },
    { t: 'meet', fa: 'دو', tr: 'do', en: 'two' },
    { t: 'meet', fa: 'سه', tr: 'se', en: 'three' },
    { t: 'note', title: 'You have seen these before',
      body: 'yek, do, se. Then chah\u0101r, panj, shesh. Compare Spanish uno dos tres, or Hindi ek do teen. Persian, Hindi and every European language except a handful count from the same root. The numbers are the oldest words we still share.' },
    { t: 'meet', fa: 'چهار', tr: 'chah\u0101r', en: 'four' },
    { t: 'meet', fa: 'پنج', tr: 'panj', en: 'five' },
    { t: 'sense', fa: 'پنج', tr: 'panj', en: 'five',
      body: 'panj is five, and it is hiding inside a word you know. Punjab is panj \u0101b, five waters, for the five rivers running through it. Persian words travelled a long way east.' },
    { t: 'choose', prompt: 'Which one is five?',
      answer: 'پنج',
      options: ['پنج', 'چهار', 'سه', 'دو'],
      optionTrs: { 'پنج': 'panj', 'چهار': 'chah\u0101r', 'سه': 'se', 'دو': 'do' },
      why: 'panj. The j is soft, like the j in jam.' },
    { t: 'meet', fa: 'شش', tr: 'shesh', en: 'six' },
    { t: 'meet', fa: 'هفت', tr: 'haft', en: 'seven' },
    { t: 'note', title: 'Seven is everywhere in Persian',
      body: 'haft, seven. Haft-sin, the seven things on the Nowruz table. Haft khan, the seven trials of Rostam in the Shahnameh. Seven is the number Persian reaches for when it wants to say a complete set of trials, or a whole world.' },
    { t: 'meet', fa: 'هشت', tr: 'hasht', en: 'eight' },
    { t: 'meet', fa: 'نه', tr: 'noh', en: 'nine' },
    { t: 'meet', fa: 'ده', tr: 'dah', en: 'ten' },
    { t: 'listen', fa: 'هفت', tr: 'haft', en: 'seven',
      options: ['هفت', 'هشت', 'شش', 'ده'],
      optionTrs: { 'هفت': 'haft', 'هشت': 'hasht', 'شش': 'shesh', 'ده': 'dah' } },
    { t: 'note', title: 'The other numerals',
      body: 'Iran writes numbers with its own digits: \u06f1 \u06f2 \u06f3 \u06f4 \u06f5 \u06f6 \u06f7 \u06f8 \u06f9. You will see them on prices, on number plates, on every page of a Persian newspaper. \u06f2 is two, \u06f3 is three, and \u06f6 looks like a European 7 but means 6. That one catches everybody.' },
    { t: 'write', fa: 'ده', tr: 'dah', en: 'ten' },
  ],
};

const numbersUse: Lesson = {
  key: 'numbers-use',
  title: 'Using them',
  titleFa: 'شمردن',
  blurb: 'Age, price, and how many.',
  minutes: 6,
  steps: [
    { t: 'meet', fa: 'چند', tr: 'chand', en: 'how many, how much' },
    { t: 'sentence', fa: 'چند سالته؟', tr: 'chand s\u0101lete?', en: 'How old are you?', focus: 'چند' },
    { t: 'sense', fa: 'چند سالته؟', tr: 'chand s\u0101lete?', en: 'how old are you?',
      body: 'Literally how many years is yours. Persian does not say you are twenty, it says twenty years is yours. Age is something you have rather than something you are.' },
    { t: 'sentence', fa: 'من سی سالمه', tr: 'man si s\u0101lame', en: 'I am thirty', focus: 'سی' },
    { t: 'meet', fa: 'بیست', tr: 'bist', en: 'twenty' },
    { t: 'meet', fa: 'سی', tr: 'si', en: 'thirty' },
    { t: 'meet', fa: 'صد', tr: 'sad', en: 'hundred' },
    { t: 'build', fa: 'من بیست سالمه', tr: 'man bist s\u0101lame', en: 'I am twenty',
      parts: ['من', 'بیست', 'سالمه'],
      partTrs: { 'من': 'man', 'بیست': 'bist', 'سالمه': 's\u0101lame' } },
    { t: 'sentence', fa: 'چقدر است؟', tr: 'cheghadr ast?', en: 'How much is it?' },
    { t: 'choose', prompt: 'You are in a shop and want the price. What do you say?',
      answer: 'چقدر است؟',
      options: ['چقدر است؟', 'چند سالته؟', 'اسم تو چیه؟', 'خوبی؟'],
      optionTrs: { 'چقدر است؟': 'cheghadr ast?', 'چند سالته؟': 'chand s\u0101lete?', 'اسم تو چیه؟': 'esme to chi-e?', 'خوبی؟': 'khubi?' },
      why: 'cheghadr is how much. chand s\u0101lete would be asking the shopkeeper their age.' },
    { t: 'listen', fa: 'چقدر است؟', tr: 'cheghadr ast?', en: 'how much is it?',
      options: ['چقدر است؟', 'چند سالته؟', 'من سی سالمه', 'صد'],
      optionTrs: { 'چقدر است؟': 'cheghadr ast?', 'چند سالته؟': 'chand s\u0101lete?', 'من سی سالمه': 'man si s\u0101lame', 'صد': 'sad' } },
    { t: 'write', fa: 'یک', tr: 'yek', en: 'one' },
  ],
};


export const UNITS: Unit[] = [
  {
    key: 'first-words',
    roman: 'I',
    title: 'First words',
    titleFa: 'کلمه‌های اول',
    blurb: 'Enough to greet someone, say who you are, and leave politely.',
    level: 'beginner',
    lessons: [greetings, introductions, politeness],
  },
  {
    key: 'family',
    roman: 'II',
    title: 'The people closest to you',
    titleFa: 'خانواده',
    blurb: 'Family, and how Persian sentences are put together.',
    level: 'beginner',
    lessons: [familyWords, familyTalk],
  },
  {
    key: 'numbers',
    roman: 'III',
    title: 'Counting',
    titleFa: 'شمارش',
    blurb: 'One to a hundred, age, price, and the Persian numerals.',
    level: 'beginner',
    lessons: [numbersOne, numbersUse],
  },
];

export function unitByKey(k?: string) {
  return UNITS.find((u) => u.key === k);
}

export function lessonByKey(unitKey?: string, lessonKey?: string) {
  const u = unitByKey(unitKey);
  return u?.lessons.find((l) => l.key === lessonKey);
}

export function unitsForLevel(level?: string | null) {
  if (!level) return UNITS;
  return UNITS.filter((u) => u.level === level);
}
