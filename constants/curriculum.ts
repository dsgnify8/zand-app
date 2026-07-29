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
  | { t: 'gap'; before: string; after: string; answer: string; tr: string; en: string;
      options: string[]; optionTrs?: Record<string, string>; why?: string }
  | { t: 'type'; fa: string; tr: string; en: string; hint?: string }
  | { t: 'note'; title: string; body: string }
  | { t: 'letter'; letter: string; name: string; sound: string; like: string;
      positions: { pos: string; form: string; word: string; tr: string; en: string }[];
      note?: string }
  | { t: 'vowel'; mark: string; name: string; sound: string; like: string;
      examples: { fa: string; tr: string; en: string }[]; body: string };

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



/* ------------------------------------------------------------------ */
/* UNIT IV — the table                                                 */
/* ------------------------------------------------------------------ */

const tableWords: Lesson = {
  key: 'table-words',
  title: 'Bread, water, tea',
  titleFa: 'نان و آب و چای',
  blurb: 'The things always on a Persian table.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'نان', tr: 'n\u0101n', en: 'bread' },
    { t: 'meet', fa: 'آب', tr: '\u0101b', en: 'water' },
    { t: 'meet', fa: 'چای', tr: 'ch\u0101y', en: 'tea' },
    { t: 'note', title: 'Tea is not a drink, it is a fixture',
      body: 'ch\u0101y arrives whether you asked or not, before the conversation, during it, and after. Refusing the first glass is close to refusing the house. Persian tea is black, drunk from a small glass called an est\u0113k\u0101n, and taken with a sugar cube held between the teeth rather than stirred in.' },
    { t: 'meet', fa: 'برنج', tr: 'berenj', en: 'rice' },
    { t: 'meet', fa: 'غذا', tr: 'ghaz\u0101', en: 'food' },
    { t: 'sense', fa: 'نان و پنیر', tr: 'n\u0101n-o panir', en: 'bread and cheese',
      body: 'n\u0101n-o panir is bread and cheese, and it means far more than the sum of it: breakfast, a quick meal, what you eat when there is nothing else and it is still enough. There is a well known song by that name. Some phrases are food and memory at once.' },
    { t: 'choose', prompt: 'Which one is water?',
      answer: 'آب',
      options: ['آب', 'نان', 'چای', 'برنج'],
      optionTrs: { 'آب': '\u0101b', 'نان': 'n\u0101n', 'چای': 'ch\u0101y', 'برنج': 'berenj' },
      why: '\u0101b, water. The \u0101 is long, like the a in father.' },
    { t: 'listen', fa: 'چای', tr: 'ch\u0101y', en: 'tea',
      options: ['چای', 'آب', 'نان', 'غذا'],
      optionTrs: { 'چای': 'ch\u0101y', 'آب': '\u0101b', 'نان': 'n\u0101n', 'غذا': 'ghaz\u0101' } },
    { t: 'meet', fa: 'گرسنه', tr: 'gorosne', en: 'hungry' },
    { t: 'sentence', fa: 'من گرسنه‌ام', tr: 'man gorosne-am', en: 'I am hungry', focus: 'گرسنه' },
    { t: 'build', fa: 'من گرسنه‌ام', tr: 'man gorosne-am', en: 'I am hungry',
      parts: ['من', 'گرسنه‌ام', 'آب', 'چای'],
      partTrs: { 'من': 'man', 'گرسنه‌ام': 'gorosne-am', 'آب': '\u0101b', 'چای': 'ch\u0101y' } },
    { t: 'write', fa: 'آب', tr: '\u0101b', en: 'water' },
  ],
};

const tableManners: Lesson = {
  key: 'table-manners',
  title: 'Offering and refusing',
  titleFa: 'تعارف سر سفره',
  blurb: 'The ritual nobody explains, and everybody follows.',
  minutes: 8,
  steps: [
    { t: 'meet', fa: 'نوش جان', tr: 'nush-e j\u0101n', en: 'enjoy your meal', literal: 'may it nourish your soul' },
    { t: 'sense', fa: 'نوش جان', tr: 'nush-e j\u0101n', en: 'enjoy your meal',
      body: 'Said to someone who is eating, and said warmly. There is no exact English for it. Bon app\u00e9tit is close but colder: nush-e j\u0101n is about the soul, not the appetite.' },
    { t: 'meet', fa: 'دستت درد نکنه', tr: 'dastet dard nakone', en: 'thank you for the food', literal: 'may your hand not hurt' },
    { t: 'note', title: 'Thanking the hands, not the person',
      body: 'You do not thank the cook. You wish their hand no pain, because the hand did the work. Persian is full of this: gratitude aimed sideways at the part that did the labour rather than straight at the person, which would be too direct.' },
    { t: 'sentence', fa: 'خیلی خوشمزه است', tr: 'kheyli khoshmaze ast', en: 'it is delicious', focus: 'خوشمزه' },
    { t: 'meet', fa: 'سیر شدم', tr: 'sir shodam', en: 'I am full' },
    { t: 'note', title: 'Refusing takes three tries',
      body: 'You will be offered more. You will say no. You will be offered again, and again. This is taarof, and both sides know the script: the host must insist, the guest must decline, and somewhere around the third round the truth is settled. Accepting the first offer looks greedy. Refusing once and being believed means the host was not really offering.' },
    { t: 'choose', prompt: 'Your aunt has filled your plate for the third time. You genuinely cannot eat more. What do you say?',
      answer: 'سیر شدم، دستت درد نکنه',
      options: ['سیر شدم، دستت درد نکنه', 'نوش جان', 'من گرسنه‌ام', 'خیلی خوشمزه است'],
      optionTrs: {
        'سیر شدم، دستت درد نکنه': 'sir shodam, dastet dard nakone',
        'نوش جان': 'nush-e j\u0101n',
        'من گرسنه‌ام': 'man gorosne-am',
        'خیلی خوشمزه است': 'kheyli khoshmaze ast' },
      why: 'You say you are full and you thank the hands. Saying only that you are full can read as a complaint about the food.' },
    { t: 'listen', fa: 'دستت درد نکنه', tr: 'dastet dard nakone', en: 'thank you for the food',
      options: ['دستت درد نکنه', 'نوش جان', 'سیر شدم', 'خیلی خوشمزه است'],
      optionTrs: {
        'دستت درد نکنه': 'dastet dard nakone',
        'نوش جان': 'nush-e j\u0101n',
        'سیر شدم': 'sir shodam',
        'خیلی خوشمزه است': 'kheyli khoshmaze ast' } },
    { t: 'build', fa: 'خیلی خوشمزه است', tr: 'kheyli khoshmaze ast', en: 'it is delicious',
      parts: ['خیلی', 'خوشمزه', 'است', 'سیر'],
      partTrs: { 'خیلی': 'kheyli', 'خوشمزه': 'khoshmaze', 'است': 'ast', 'سیر': 'sir' } },
    { t: 'write', fa: 'نان', tr: 'n\u0101n', en: 'bread' },
  ],
};



/* ------------------------------------------------------------------ */
/* UNIT 0 — reading: turning letters into words                        */
/* ------------------------------------------------------------------ */

const reading: Lesson = {
  key: 'reading',
  title: 'Reading your first words',
  titleFa: 'خواندن',
  blurb: 'Letters joined together, and the vowels nobody writes.',
  minutes: 8,
  steps: [
    { t: 'note', title: 'Right to left, and joined up',
      body: 'Persian runs right to left, and the letters hold hands. Most of them change shape depending on whether they sit at the start of a word, the middle, or the end. It looks like a lot until you notice that the core of each letter never changes: only the tail does.' },
    { t: 'meet', fa: 'ب', tr: 'b', en: 'the letter b' },
    { t: 'meet', fa: 'ا', tr: '\u0101', en: 'the letter \u0101', literal: 'a long a, like the a in father' },
    { t: 'sense', fa: 'بابا', tr: 'b\u0101b\u0101', en: 'dad',
      body: 'Four letters: b, \u0101, b, \u0101. Read right to left and you get b\u0101-b\u0101. The two b shapes look slightly different because one sits at the start and one in the middle, but it is the same letter. Your first Persian word, and you already knew what it meant.' },
    { t: 'meet', fa: 'م', tr: 'm', en: 'the letter m' },
    { t: 'sentence', fa: 'مامان', tr: 'm\u0101m\u0101n', en: 'mum', focus: 'مامان' },
    { t: 'note', title: 'The vowels are not there',
      body: 'This is the thing that catches everyone. Persian writes the long vowels but not the short ones. The word for name is written as two letters, esm, but the e is nowhere on the page. Readers supply the short vowels from knowing the word already. It sounds impossible and then one day it is not: you stop reading letters and start recognising shapes.' },
    { t: 'choose', prompt: 'Read this: بابا',
      answer: 'dad',
      options: ['dad', 'mum', 'bread', 'water'],
      why: 'b\u0101b\u0101. Right to left: b, \u0101, b, \u0101.' },
    { t: 'meet', fa: 'ن', tr: 'n', en: 'the letter n' },
    { t: 'choose', prompt: 'Read this: نان',
      answer: 'bread',
      options: ['bread', 'dad', 'name', 'tea'],
      why: 'n\u0101n, bread. n at the start, \u0101 in the middle, n at the end. The two n shapes differ, the letter does not.' },
    { t: 'listen', fa: 'مامان', tr: 'm\u0101m\u0101n', en: 'mum',
      options: ['مامان', 'بابا', 'نان', 'آب'],
      optionTrs: { 'مامان': 'm\u0101m\u0101n', 'بابا': 'b\u0101b\u0101', 'نان': 'n\u0101n', 'آب': '\u0101b' } },
    { t: 'write', fa: 'بابا', tr: 'b\u0101b\u0101', en: 'dad', hint: 'Right to left: b, \u0101, b, \u0101' },
    { t: 'note', title: 'What you can do now',
      body: 'Four letters and you can read three words. That is how it goes from here: each new letter unlocks more words than the last, because the words reuse what you already have. By the twelfth letter you will be reading signs.' },
  ],
};



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
    { t: 'meet', fa: 'ایرانی', tr: '\u012Br\u0101ni', en: 'Iranian' },
    { t: 'sentence', fa: 'من ایرانی هستم', tr: 'man \u012Br\u0101ni hastam', en: 'I am Iranian', focus: 'هستم' },
    { t: 'note', title: 'You do not need the man',
      body: 'man \u012Br\u0101ni hastam is I Iranian am. But the -am already says I, so \u012Br\u0101ni hastam is complete on its own. Persian drops the pronoun constantly, because the ending has already told you who is speaking. You add man back only for emphasis: as for ME, I am Iranian.' },
    { t: 'meet', fa: 'دارم', tr: 'd\u0101ram', en: 'I have' },
    { t: 'meet', fa: 'داری', tr: 'd\u0101ri', en: 'you have' },
    { t: 'meet', fa: 'دارد', tr: 'd\u0101rad', en: 'he has, she has' },
    { t: 'sense', fa: 'دارم', tr: 'd\u0101ram', en: 'I have',
      body: 'Same endings again. d\u0101r is the stem, and -am, -i, -ad ride on the back of it. In speech d\u0101rad flattens to d\u0101re, which is what you will actually hear.' },
    { t: 'choose', prompt: 'Which one means you have?',
      answer: 'داری',
      options: ['داری', 'دارم', 'دارد', 'هستم'],
      optionTrs: { 'داری': 'd\u0101ri', 'دارم': 'd\u0101ram', 'دارد': 'd\u0101rad', 'هستم': 'hastam' },
      why: 'The -i ending is you. It never changes, on any verb.' },
    { t: 'build', fa: 'من ایرانی هستم', tr: 'man \u012Br\u0101ni hastam', en: 'I am Iranian',
      parts: ['من', 'ایرانی', 'هستم', 'داری'],
      partTrs: { 'من': 'man', 'ایرانی': '\u012Br\u0101ni', 'هستم': 'hastam', 'داری': 'd\u0101ri' } },
    { t: 'listen', fa: 'من ایرانی هستم', tr: 'man \u012Br\u0101ni hastam', en: 'I am Iranian',
      options: ['من ایرانی هستم', 'تو ایرانی هستی', 'من دارم', 'او دارد'],
      optionTrs: { 'من ایرانی هستم': 'man \u012Br\u0101ni hastam', 'تو ایرانی هستی': 'to \u012Br\u0101ni hasti', 'من دارم': 'man d\u0101ram', 'او دارد': 'u d\u0101rad' } },
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
    { t: 'sentence', fa: 'نان می‌خورم', tr: 'n\u0101n mikhoram', en: 'I eat bread', focus: 'می‌خورم' },
    { t: 'sense', fa: 'نان می‌خورم', tr: 'n\u0101n mikhoram', en: 'I eat bread',
      body: 'Object first, verb last. Bread I eat. You met this in unit three and it will hold for every sentence you build: whatever is being done to, comes before the doing.' },
    { t: 'meet', fa: 'می‌خواهم', tr: 'mikh\u0101ham', en: 'I want' },
    { t: 'note', title: 'The most useful verb in the language',
      body: 'mikh\u0101ham is I want, and in speech it becomes mikh\u0101m. Put it in front of anything: mikh\u0101m ch\u0101y, I want tea. It is the fastest way to be understood in a shop, a taxi or a kitchen, and it does not require you to know any other verb.' },
    { t: 'sentence', fa: 'چای می‌خواهم', tr: 'ch\u0101y mikh\u0101ham', en: 'I want tea', focus: 'می‌خواهم' },
    { t: 'choose', prompt: 'How do you say I want water?',
      answer: 'آب می‌خواهم',
      options: ['آب می‌خواهم', 'می‌خواهم آب', 'آب می‌خورم', 'آب دارم'],
      optionTrs: { 'آب می‌خواهم': '\u0101b mikh\u0101ham', 'می‌خواهم آب': 'mikh\u0101ham \u0101b', 'آب می‌خورم': '\u0101b mikhoram', 'آب دارم': '\u0101b d\u0101ram' },
      why: 'The thing wanted comes first, the verb last. \u0101b mikhoram would be I drink water, which is also correct Persian but a different sentence.' },
    { t: 'build', fa: 'چای می‌خواهم', tr: 'ch\u0101y mikh\u0101ham', en: 'I want tea',
      parts: ['چای', 'می‌خواهم', 'نان', 'می‌روم'],
      partTrs: { 'چای': 'ch\u0101y', 'می‌خواهم': 'mikh\u0101ham', 'نان': 'n\u0101n', 'می‌روم': 'miravam' } },
    { t: 'listen', fa: 'نان می‌خورم', tr: 'n\u0101n mikhoram', en: 'I eat bread',
      options: ['نان می‌خورم', 'چای می‌خواهم', 'می‌روم', 'آب دارم'],
      optionTrs: { 'نان می‌خورم': 'n\u0101n mikhoram', 'چای می‌خواهم': 'ch\u0101y mikh\u0101ham', 'می‌روم': 'miravam', 'آب دارم': '\u0101b d\u0101ram' } },
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
    { t: 'sense', fa: 'خانهٔ بزرگ', tr: 'kh\u0101ne-ye bozorg', en: 'a big house',
      body: 'The adjective comes after the noun, joined by that same ez\u0101fe sound: house-of-big. This is the reverse of English and it takes a few days. m\u0101dar-e khub, a good mother. ch\u0101y-e d\u0101gh, hot tea.' },
    { t: 'choose', prompt: 'Which is the right way to say a big house?',
      answer: 'خانهٔ بزرگ',
      options: ['خانهٔ بزرگ', 'بزرگ خانه', 'خانه بزرگم', 'بزرگ است خانه'],
      optionTrs: { 'خانهٔ بزرگ': 'kh\u0101ne-ye bozorg', 'بزرگ خانه': 'bozorg kh\u0101ne', 'خانه بزرگم': 'kh\u0101ne bozorgam', 'بزرگ است خانه': 'bozorg ast kh\u0101ne' },
      why: 'Noun first, then the adjective, with the ez\u0101fe between them.' },
    { t: 'meet', fa: 'خیلی', tr: 'kheyli', en: 'very' },
    { t: 'sentence', fa: 'خیلی خوب است', tr: 'kheyli khub ast', en: 'it is very good', focus: 'خیلی' },
    { t: 'note', title: 'kheyli is everywhere',
      body: 'kheyli means very, a lot, really. kheyli mamnun, thanks a lot. kheyli khoshmaze, really delicious. kheyli dur, very far. If you learn one intensifier, learn this one; Iranians use it constantly.' },
    { t: 'build', fa: 'خیلی خوب است', tr: 'kheyli khub ast', en: 'it is very good',
      parts: ['خیلی', 'خوب', 'است', 'بد'],
      partTrs: { 'خیلی': 'kheyli', 'خوب': 'khub', 'است': 'ast', 'بد': 'bad' } },
    { t: 'listen', fa: 'خیلی قشنگ است', tr: 'kheyli ghashang ast', en: 'it is very beautiful',
      options: ['خیلی قشنگ است', 'خیلی خوب است', 'خانهٔ بزرگ', 'خیلی بد است'],
      optionTrs: { 'خیلی قشنگ است': 'kheyli ghashang ast', 'خیلی خوب است': 'kheyli khub ast', 'خانهٔ بزرگ': 'kh\u0101ne-ye bozorg', 'خیلی بد است': 'kheyli bad ast' } },
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
    { t: 'meet', fa: 'فردا', tr: 'fard\u0101', en: 'tomorrow' },
    { t: 'meet', fa: 'دیروز', tr: 'diruz', en: 'yesterday' },
    { t: 'sense', fa: 'امروز', tr: 'emruz', en: 'today',
      body: 'em-ruz is this-day, and ruz is day. diruz is yesterday, emruz today, and once you see ruz sitting inside both you stop memorising them separately. Persian builds a lot of words this way, out of pieces you already have.' },
    { t: 'meet', fa: 'صبح', tr: 'sobh', en: 'morning' },
    { t: 'meet', fa: 'شب', tr: 'shab', en: 'night' },
    { t: 'note', title: 'Yalda is the longest night',
      body: 'shab is night. Shab-e Yald\u0101 is the night of Yalda, the longest night of the year, when families stay up together eating pomegranate and watermelon and reading H\u0101fez aloud. The word shab is doing all the work in that name, and you now know it.' },
    { t: 'sentence', fa: 'فردا می‌روم', tr: 'fard\u0101 miravam', en: 'I am going tomorrow', focus: 'فردا' },
    { t: 'note', title: 'The present tense is also the future',
      body: 'Persian rarely bothers with a separate future tense in speech. fard\u0101 miravam is tomorrow I go, and it means I will go. The time word does the work, so the verb does not have to.' },
    { t: 'meet', fa: 'الان', tr: 'al\u0101n', en: 'now' },
    { t: 'choose', prompt: 'Which one means tomorrow?',
      answer: 'فردا',
      options: ['فردا', 'دیروز', 'امروز', 'الان'],
      optionTrs: { 'فردا': 'fard\u0101', 'دیروز': 'diruz', 'امروز': 'emruz', 'الان': 'al\u0101n' },
      why: 'fard\u0101. The only one of the four without ruz or an now in it.' },
    { t: 'build', fa: 'فردا می‌روم', tr: 'fard\u0101 miravam', en: 'I am going tomorrow',
      parts: ['فردا', 'می‌روم', 'امروز', 'الان'],
      partTrs: { 'فردا': 'fard\u0101', 'می‌روم': 'miravam', 'امروز': 'emruz', 'الان': 'al\u0101n' } },
    { t: 'listen', fa: 'امروز خوب است', tr: 'emruz khub ast', en: 'today is good',
      options: ['امروز خوب است', 'فردا می‌روم', 'دیروز بود', 'الان می‌خواهم'],
      optionTrs: { 'امروز خوب است': 'emruz khub ast', 'فردا می‌روم': 'fard\u0101 miravam', 'دیروز بود': 'diruz bud', 'الان می‌خواهم': 'al\u0101n mikh\u0101ham' } },
    { t: 'note', title: 'The year starts in spring',
      body: 'Iran runs on the solar Hijri calendar, and the year turns at the exact moment of the spring equinox, not at midnight on an arbitrary winter day. That is Nowruz, literally new day. When an Iranian says the year 1403, that is the same stretch of time as 2024 and 2025 overlapping.' },
    { t: 'write', fa: 'امروز', tr: 'emruz', en: 'today' },
  ],
};



const colours: Lesson = {
  key: 'colours',
  title: 'Colours',
  titleFa: 'رنگ‌ها',
  blurb: 'And the ones that carry meaning beyond the colour.',
  minutes: 7,
  steps: [
    { t: 'meet', fa: 'رنگ', tr: 'rang', en: 'colour' },
    { t: 'meet', fa: 'قرمز', tr: 'ghermez', en: 'red' },
    { t: 'meet', fa: 'آبی', tr: '\u0101bi', en: 'blue' },
    { t: 'sense', fa: 'آبی', tr: '\u0101bi', en: 'blue',
      body: 'You already know this word. \u0101b is water, and \u0101bi is water-coloured. Persian builds colours out of the things that have them: the ending -i turns a noun into the shade it carries.' },
    { t: 'meet', fa: 'سبز', tr: 'sabz', en: 'green' },
    { t: 'meet', fa: 'زرد', tr: 'zard', en: 'yellow' },
    { t: 'meet', fa: 'سفید', tr: 'sefid', en: 'white' },
    { t: 'meet', fa: 'سیاه', tr: 'si\u0101h', en: 'black' },
    { t: 'note', title: 'Green is the colour of alive',
      body: 'sabz is green, and sabze is the dish of sprouted wheat on the Nowruz table, the one that stands for rebirth. sabzi is herbs, the great heap of them on every Persian table. When Iranians say someone has sabz eyes they mean green, but the word carries growing and living inside it.' },
    { t: 'sentence', fa: 'چشم‌های سبز', tr: 'cheshm-h\u0101-ye sabz', en: 'green eyes', focus: 'سبز' },
    { t: 'choose', prompt: 'Which one is blue?',
      answer: 'آبی',
      options: ['آبی', 'سبز', 'قرمز', 'زرد'],
      optionTrs: { 'آبی': '\u0101bi', 'سبز': 'sabz', 'قرمز': 'ghermez', 'زرد': 'zard' },
      why: '\u0101bi, from \u0101b, water.' },
    { t: 'sense', fa: 'دلم سیاه شد', tr: 'delam si\u0101h shod', en: 'my heart went black',
      body: 'Colours carry feeling in Persian. A black heart is grief. A white face, ru-sefid, means honour and pride: you have done well and can hold your head up. A black face, ru-si\u0101h, is shame. These are not poetry, they are everyday speech.' },
    { t: 'build', fa: 'چشم‌های سبز', tr: 'cheshm-h\u0101-ye sabz', en: 'green eyes',
      parts: ['چشم‌های', 'سبز', 'آبی', 'قرمز'],
      partTrs: { 'چشم‌های': 'cheshm-h\u0101-ye', 'سبز': 'sabz', 'آبی': '\u0101bi', 'قرمز': 'ghermez' } },
    { t: 'listen', fa: 'قرمز', tr: 'ghermez', en: 'red',
      options: ['قرمز', 'سبز', 'سفید', 'سیاه'],
      optionTrs: { 'قرمز': 'ghermez', 'سبز': 'sabz', 'سفید': 'sefid', 'سیاه': 'si\u0101h' } },
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
    { t: 'meet', fa: 'داغ', tr: 'd\u0101gh', en: 'hot' },
    { t: 'meet', fa: 'سرد', tr: 'sard', en: 'cold' },
    { t: 'sentence', fa: 'چای داغ', tr: 'ch\u0101y-e d\u0101gh', en: 'hot tea', focus: 'داغ' },
    { t: 'meet', fa: 'نزدیک', tr: 'nazdik', en: 'near' },
    { t: 'meet', fa: 'دور', tr: 'dur', en: 'far' },
    { t: 'meet', fa: 'تازه', tr: 't\u0101ze', en: 'fresh, new' },
    { t: 'sense', fa: 'تازه', tr: 't\u0101ze', en: 'fresh',
      body: 'n\u0101n-e t\u0101ze is fresh bread, and it is close to a moral category in Iran. Bread is bought the same day, still warm, and t\u0101ze is the highest praise you can give it. The word also means recently: t\u0101ze \u0101madam, I have just arrived.' },
    { t: 'meet', fa: 'قدیمی', tr: 'ghadimi', en: 'old' },
    { t: 'choose', prompt: 'The tea has gone cold. Which word do you need?',
      answer: 'سرد',
      options: ['سرد', 'داغ', 'تازه', 'دور'],
      optionTrs: { 'سرد': 'sard', 'داغ': 'd\u0101gh', 'تازه': 't\u0101ze', 'دور': 'dur' },
      why: 'sard, cold. d\u0101gh is hot, and Persian tea should always be d\u0101gh.' },
    { t: 'build', fa: 'چای داغ می‌خواهم', tr: 'ch\u0101y-e d\u0101gh mikh\u0101ham', en: 'I want hot tea',
      parts: ['چای', 'داغ', 'می‌خواهم', 'سرد'],
      partTrs: { 'چای': 'ch\u0101y', 'داغ': 'd\u0101gh', 'می‌خواهم': 'mikh\u0101ham', 'سرد': 'sard' } },
    { t: 'listen', fa: 'خیلی دور است', tr: 'kheyli dur ast', en: 'it is very far',
      options: ['خیلی دور است', 'خیلی نزدیک است', 'چای داغ', 'نان تازه'],
      optionTrs: { 'خیلی دور است': 'kheyli dur ast', 'خیلی نزدیک است': 'kheyli nazdik ast', 'چای داغ': 'ch\u0101y-e d\u0101gh', 'نان تازه': 'n\u0101n-e t\u0101ze' } },
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
    { t: 'meet', fa: 'کجا', tr: 'koj\u0101', en: 'where' },
    { t: 'sentence', fa: 'کجاست؟', tr: 'koj\u0101st?', en: 'where is it?', focus: 'کجا' },
    { t: 'meet', fa: 'خانه', tr: 'kh\u0101ne', en: 'house, home' },
    { t: 'meet', fa: 'شهر', tr: 'shahr', en: 'city' },
    { t: 'note', title: 'shahr is hiding in the map',
      body: 'shahr is city, and it is the ending of half the place names in Iran. Kerm\u0101nsh\u0101h, B\u0101ndar Abb\u0101s, and dozens of towns ending in -shahr. When you see it you are reading city, and the first half tells you whose.' },
    { t: 'meet', fa: 'خیابان', tr: 'khi\u0101b\u0101n', en: 'street' },
    { t: 'meet', fa: 'بازار', tr: 'b\u0101z\u0101r', en: 'bazaar, market' },
    { t: 'note', title: 'A word that went everywhere',
      body: 'b\u0101z\u0101r is Persian, and it travelled: into Turkish, Arabic, Italian, French and English, all meaning the same covered market. When you say bazaar in English you are speaking Persian without noticing.' },
    { t: 'meet', fa: 'اینجا', tr: 'inj\u0101', en: 'here' },
    { t: 'meet', fa: 'آنجا', tr: '\u0101nj\u0101', en: 'there' },
    { t: 'sense', fa: 'اینجا', tr: 'inj\u0101', en: 'here',
      body: 'in is this, \u0101n is that, and j\u0101 is place. this-place and that-place. In speech \u0101nj\u0101 usually softens to unj\u0101. Again: pieces you already have, stuck together.' },
    { t: 'sentence', fa: 'بازار کجاست؟', tr: 'b\u0101z\u0101r koj\u0101st?', en: 'where is the bazaar?', focus: 'کجاست' },
    { t: 'choose', prompt: 'You are lost and looking for the street. What do you ask?',
      answer: 'خیابان کجاست؟',
      options: ['خیابان کجاست؟', 'خیابان اینجاست', 'کجا می‌روم', 'شهر بزرگ است'],
      optionTrs: { 'خیابان کجاست؟': 'khi\u0101b\u0101n koj\u0101st?', 'خیابان اینجاست': 'khi\u0101b\u0101n inj\u0101st', 'کجا می‌روم': 'koj\u0101 miravam', 'شهر بزرگ است': 'shahr bozorg ast' },
      why: 'The place first, then koj\u0101st. Same shape as b\u0101z\u0101r koj\u0101st.' },
    { t: 'build', fa: 'بازار کجاست؟', tr: 'b\u0101z\u0101r koj\u0101st?', en: 'where is the bazaar?',
      parts: ['بازار', 'کجاست؟', 'اینجا', 'خانه'],
      partTrs: { 'بازار': 'b\u0101z\u0101r', 'کجاست؟': 'koj\u0101st', 'اینجا': 'inj\u0101', 'خانه': 'kh\u0101ne' } },
    { t: 'listen', fa: 'خانه نزدیک است', tr: 'kh\u0101ne nazdik ast', en: 'the house is near',
      options: ['خانه نزدیک است', 'بازار کجاست؟', 'شهر دور است', 'اینجا نیست'],
      optionTrs: { 'خانه نزدیک است': 'kh\u0101ne nazdik ast', 'بازار کجاست؟': 'b\u0101z\u0101r koj\u0101st?', 'شهر دور است': 'shahr dur ast', 'اینجا نیست': 'inj\u0101 nist' } },
    { t: 'write', fa: 'کجا', tr: 'koj\u0101', en: 'where' },
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
    { t: 'meet', fa: 'دلم برات تنگ شده', tr: 'delam bar\u0101t tang shode', en: 'I miss you', literal: 'my heart has grown tight for you' },
    { t: 'note', title: 'The most Persian sentence there is',
      body: 'Not I miss you, which puts the lack on you. My heart has grown tight for you: the feeling happens in the speaker\u2019s chest, physically, as a narrowing. If you learn one full sentence in Persian, learn this one. It will do more work than any other.' },
    { t: 'meet', fa: 'دلتنگ', tr: 'deltang', en: 'homesick, longing', literal: 'heart-tight' },
    { t: 'meet', fa: 'دلبر', tr: 'delbar', en: 'beloved', literal: 'heart-carrier' },
    { t: 'note', title: 'The one who carries your heart away',
      body: 'delbar is made of del, heart, and bar, to carry. The beloved is not someone you love, they are someone who took your heart and left with it. Persian poetry ran on this word for a thousand years and it is still an ordinary thing to call someone.' },
    { t: 'meet', fa: 'خوشحال', tr: 'khoshh\u0101l', en: 'happy', literal: 'good-state' },
    { t: 'meet', fa: 'ناراحت', tr: 'n\u0101r\u0101hat', en: 'upset', literal: 'not-comfortable' },
    { t: 'sentence', fa: 'خیلی خوشحالم', tr: 'kheyli khoshh\u0101lam', en: 'I am very happy', focus: 'خوشحالم' },
    { t: 'choose', prompt: 'You are calling your grandmother in Tehran. What do you say?',
      answer: 'دلم برات تنگ شده',
      options: ['دلم برات تنگ شده', 'خیلی خوشحالم', 'ناراحت هستم', 'کجاست؟'],
      optionTrs: { 'دلم برات تنگ شده': 'delam bar\u0101t tang shode', 'خیلی خوشحالم': 'kheyli khoshh\u0101lam', 'ناراحت هستم': 'n\u0101r\u0101hat hastam', 'کجاست؟': 'koj\u0101st?' },
      why: 'I miss you. It is the thing she is waiting to hear, and it is worth being able to say without hesitating.' },
    { t: 'listen', fa: 'دلم برات تنگ شده', tr: 'delam bar\u0101t tang shode', en: 'I miss you',
      options: ['دلم برات تنگ شده', 'خیلی خوشحالم', 'دلبر', 'ناراحت'],
      optionTrs: { 'دلم برات تنگ شده': 'delam bar\u0101t tang shode', 'خیلی خوشحالم': 'kheyli khoshh\u0101lam', 'دلبر': 'delbar', 'ناراحت': 'n\u0101r\u0101hat' } },
    { t: 'build', fa: 'خیلی خوشحالم', tr: 'kheyli khoshh\u0101lam', en: 'I am very happy',
      parts: ['خیلی', 'خوشحالم', 'دل', 'ناراحت'],
      partTrs: { 'خیلی': 'kheyli', 'خوشحالم': 'khoshh\u0101lam', 'دل': 'del', 'ناراحت': 'n\u0101r\u0101hat' } },
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
    { t: 'meet', fa: 'یواش‌تر', tr: 'yav\u0101sh-tar', en: 'slower' },
    { t: 'meet', fa: 'دوباره', tr: 'dob\u0101re', en: 'again' },
    { t: 'sentence', fa: 'دوباره بگو، لطفاً', tr: 'dob\u0101re begu, lotfan', en: 'say it again, please', focus: 'دوباره' },
    { t: 'meet', fa: 'چی؟', tr: 'chi?', en: 'what?' },
    { t: 'meet', fa: 'چرا', tr: 'chér\u0101', en: 'why' },
    { t: 'note', title: 'Persian says yes to a no',
      body: 'If someone asks a negative question, you do not have coffee?, and you want to say yes I do, the answer is cher\u0101. It exists purely to contradict a negative. English has lost this; French keeps it as si and German as doch. Persian kept it too.' },
    { t: 'meet', fa: 'فارسی بلد نیستم', tr: 'f\u0101rsi balad nistam', en: 'I do not speak Persian' },
    { t: 'meet', fa: 'کمی فارسی بلدم', tr: 'kami f\u0101rsi baladam', en: 'I speak a little Persian' },
    { t: 'note', title: 'Say the second one, not the first',
      body: 'kami f\u0101rsi baladam, I speak a little Persian, will change every conversation you have in Iran. It is the difference between being answered in English and being answered in Persian, slowly, with patience. Iranians are famously delighted by anyone trying.' },
    { t: 'choose', prompt: 'Someone is speaking too fast for you. What do you say?',
      answer: 'یواش‌تر، لطفاً',
      options: ['یواش‌تر، لطفاً', 'نمی‌فهمم', 'چرا', 'دوباره'],
      optionTrs: { 'یواش‌تر، لطفاً': 'yav\u0101sh-tar, lotfan', 'نمی‌فهمم': 'nemifahmam', 'چرا': 'cher\u0101', 'دوباره': 'dob\u0101re' },
      why: 'All four are useful, but slower, please keeps the conversation alive instead of stopping it.' },
    { t: 'build', fa: 'کمی فارسی بلدم', tr: 'kami f\u0101rsi baladam', en: 'I speak a little Persian',
      parts: ['کمی', 'فارسی', 'بلدم', 'نیستم'],
      partTrs: { 'کمی': 'kami', 'فارسی': 'f\u0101rsi', 'بلدم': 'baladam', 'نیستم': 'nistam' } },
    { t: 'listen', fa: 'نمی‌فهمم', tr: 'nemifahmam', en: 'I do not understand',
      options: ['نمی‌فهمم', 'دوباره بگو', 'یواش‌تر', 'کمی فارسی بلدم'],
      optionTrs: { 'نمی‌فهمم': 'nemifahmam', 'دوباره بگو': 'dob\u0101re begu', 'یواش‌تر': 'yav\u0101sh-tar', 'کمی فارسی بلدم': 'kami f\u0101rsi baladam' } },
    { t: 'write', fa: 'دوباره', tr: 'dob\u0101re', en: 'again' },
  ],
};



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
    { t: 'vowel', mark: 'ا', name: '\u0101lef', sound: '\u0101', like: 'the a in father',
      examples: [
        { fa: 'آب', tr: '\u0101b', en: 'water' },
        { fa: 'بابا', tr: 'b\u0101b\u0101', en: 'dad' },
        { fa: 'نان', tr: 'n\u0101n', en: 'bread' },
      ],
      body: 'The long \u0101 is written, always. When it opens a word it wears a hat: آ. In the middle or at the end it is bare: ا.' },
    { t: 'vowel', mark: 'و', name: 'v\u0101v', sound: 'u', like: 'the oo in moon',
      examples: [
        { fa: 'دو', tr: 'do', en: 'two' },
        { fa: 'تو', tr: 'to', en: 'you' },
        { fa: 'سوت', tr: 'sut', en: 'whistle' },
      ],
      body: 'This letter does two jobs: it is the long u, and it is also the consonant v. Which one it is depends on the word, and you learn them as you go.' },
    { t: 'vowel', mark: 'ی', name: 'ye', sound: 'i', like: 'the ee in see',
      examples: [
        { fa: 'سی', tr: 'si', en: 'thirty' },
        { fa: 'ایرانی', tr: '\u012Br\u0101ni', en: 'Iranian' },
        { fa: 'چای', tr: 'ch\u0101y', en: 'tea' },
      ],
      body: 'Like v\u0101v, this one is both a vowel and a consonant: the long i, and the y sound.' },
    { t: 'note', title: 'Now the three that are not there',
      body: 'a as in cat, e as in bed, and o as in more. None of them are written. اسم is spelled with three letters and pronounced esm: the e simply is not on the page. Children learning to read get little marks above the letters to help. Adult books do not.' },
    { t: 'choose', prompt: 'The word اسم is written with three letters. How many vowels do you hear when it is spoken?',
      answer: 'One, and it is not written',
      options: ['One, and it is not written', 'None at all', 'Three, one per letter', 'Two, both written'],
      why: 'esm. The e is spoken but never appears. This is the whole puzzle of reading Persian, and it is why you learn words as shapes rather than sounding them out letter by letter.' },
    { t: 'note', title: 'How anyone manages',
      body: 'You stop decoding and start recognising. A Persian reader does not assemble n-\u0101-n and arrive at bread, they see نان and know it, the way you see the word through without reading t-h-r-o-u-g-h. It takes a few hundred words and then it is automatic.' },
    { t: 'write', fa: 'آب', tr: '\u0101b', en: 'water', hint: 'The \u0101lef with its hat, then be' },
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
        { pos: 'INITIAL', form: 'چـ', word: 'چای', tr: 'ch\u0101y', en: 'tea' },
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
        { pos: 'ALONE', form: 'خ', word: 'شاخ', tr: 'sh\u0101kh', en: 'horn, branch' },
      ],
      note: 'This is the one English speakers dread and it is not that hard: start to say a k, then let the air keep flowing instead of stopping it. You already make this sound at the end of loch.' },
    { t: 'note', title: 'kh opens a lot of doors',
      body: 'khub, good. kh\u0101har, sister. khoshmaze, delicious. khod\u0101h\u0101fez, goodbye. khoshbakhtam, pleased to meet you. Get comfortable with this one sound and a large stretch of everyday Persian becomes sayable.' },
    { t: 'letter', letter: 'ه', name: 'he', sound: 'h', like: 'the h in hat',
      positions: [
        { pos: 'INITIAL', form: 'هـ', word: 'هفت', tr: 'haft', en: 'seven' },
        { pos: 'MEDIAL', form: 'ـهـ', word: 'مهم', tr: 'mohem', en: 'important' },
        { pos: 'FINAL', form: 'ـه', word: 'ماه', tr: 'm\u0101h', en: 'moon, month' },
        { pos: 'ALONE', form: 'ه', word: 'راه', tr: 'r\u0101h', en: 'road' },
      ],
      note: 'At the end of a word this letter often carries a silent e sound instead of an h: kh\u0101ne, house, ends in it. Persian gives this letter two jobs and lets context sort it out.' },
    { t: 'choose', prompt: 'Which word starts with the sound at the back of the throat?',
      answer: 'خوب',
      options: ['خوب', 'چای', 'هفت', 'نان'],
      optionTrs: { 'خوب': 'khub', 'چای': 'ch\u0101y', 'هفت': 'haft', 'نان': 'n\u0101n' },
      why: 'khub. The kh is that scraped sound; the h in haft is a soft ordinary breath.' },
    { t: 'listen', fa: 'خوب', tr: 'khub', en: 'good',
      options: ['خوب', 'چای', 'هفت', 'کوچک'],
      optionTrs: { 'خوب': 'khub', 'چای': 'ch\u0101y', 'هفت': 'haft', 'کوچک': 'kuchak' } },
    { t: 'write', fa: 'چای', tr: 'ch\u0101y', en: 'tea' },
  ],
};

const lettersTwo: Lesson = {
  key: 'letters-two',
  title: 'dal, zal, and the letters that will not join',
  titleFa: 'د ذ',
  blurb: 'Two letters, and a rule that changes how words look.',
  minutes: 7,
  steps: [
    { t: 'letter', letter: 'د', name: 'd\u0101l', sound: 'd', like: 'the d in door',
      positions: [
        { pos: 'INITIAL', form: 'د', word: 'دل', tr: 'del', en: 'heart' },
        { pos: 'MEDIAL', form: 'ـد', word: 'مادر', tr: 'm\u0101dar', en: 'mother' },
        { pos: 'FINAL', form: 'ـد', word: 'بد', tr: 'bad', en: 'bad' },
        { pos: 'ALONE', form: 'د', word: 'دو', tr: 'do', en: 'two' },
      ],
      note: 'Notice the form barely changes. That is because d\u0101l is one of the seven letters that never join to what comes after them.' },
    { t: 'note', title: 'Seven letters that refuse to hold hands',
      body: 'ا د ذ ر ز ژ و. These seven join to the letter before them but never to the letter after. That is why مادر has a visible gap in the middle: the d\u0101l will not connect forward. When you see a break inside a word, one of these seven is usually the reason, and it is a useful clue when reading.' },
    { t: 'letter', letter: 'ذ', name: 'z\u0101l', sound: 'z', like: 'the z in zoo',
      positions: [
        { pos: 'INITIAL', form: 'ذ', word: 'ذهن', tr: 'zehn', en: 'mind' },
        { pos: 'MEDIAL', form: 'ـذ', word: 'کاغذ', tr: 'k\u0101ghaz', en: 'paper' },
        { pos: 'FINAL', form: 'ـذ', word: 'لذت', tr: 'lezzat', en: 'pleasure' },
        { pos: 'ALONE', form: 'ذ', word: 'غذا', tr: 'ghaz\u0101', en: 'food' },
      ],
      note: 'Same shape as d\u0101l with a dot on top, and it sounds nothing like it. Persian has four letters that all make a z sound: ز ذ ض ظ. Only the spelling tells them apart, and you learn which word takes which.' },
    { t: 'choose', prompt: 'Why does مادر have a gap in the middle?',
      answer: 'The d\u0101l will not join to what follows it',
      options: ['The d\u0101l will not join to what follows it', 'It is two separate words', 'A vowel is missing there', 'It is a spelling mistake'],
      why: 'd\u0101l is one of the seven non-joining letters. The gap is correct, and it is a signal rather than a flaw.' },
    { t: 'listen', fa: 'مادر', tr: 'm\u0101dar', en: 'mother',
      options: ['مادر', 'پدر', 'غذا', 'دل'],
      optionTrs: { 'مادر': 'm\u0101dar', 'پدر': 'pedar', 'غذا': 'ghaz\u0101', 'دل': 'del' } },
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
        { pos: 'INITIAL', form: 'نـ', word: 'نان', tr: 'n\u0101n', en: 'bread' },
        { pos: 'MEDIAL', form: 'ـنـ', word: 'خانه', tr: 'kh\u0101ne', en: 'house' },
        { pos: 'FINAL', form: 'ـن', word: 'من', tr: 'man', en: 'I' },
        { pos: 'ALONE', form: 'ن', word: 'زن', tr: 'zan', en: 'woman' },
      ] },
    { t: 'letter', letter: 'ش', name: 'shin', sound: 'sh', like: 'the sh in ship',
      positions: [
        { pos: 'INITIAL', form: 'شـ', word: 'شب', tr: 'shab', en: 'night' },
        { pos: 'MEDIAL', form: 'ـشـ', word: 'خوشحال', tr: 'khoshh\u0101l', en: 'happy' },
        { pos: 'FINAL', form: 'ـش', word: 'شش', tr: 'shesh', en: 'six' },
        { pos: 'ALONE', form: 'ش', word: 'آش', tr: '\u0101sh', en: 'thick soup' },
      ],
      note: '\u0101sh is the word behind the English dish name and behind \u0101shpaz, cook: literally soup-maker. The kitchen in Persian is named after this one soup.' },
    { t: 'letter', letter: 'ف', name: 'fe', sound: 'f', like: 'the f in fine',
      positions: [
        { pos: 'INITIAL', form: 'فـ', word: 'فردا', tr: 'fard\u0101', en: 'tomorrow' },
        { pos: 'MEDIAL', form: 'ـفـ', word: 'سفید', tr: 'sefid', en: 'white' },
        { pos: 'FINAL', form: 'ـف', word: 'حرف', tr: 'harf', en: 'word, letter' },
        { pos: 'ALONE', form: 'ف', word: 'کیف', tr: 'kif', en: 'bag' },
      ] },
    { t: 'note', title: 'Count what you can read now',
      body: 'With these three you can read n\u0101n, man, zan, shab, shesh, fard\u0101, sefid and kh\u0101ne, and every one of them is a word you have already met in a lesson. Reading is not a separate skill you add at the end. It arrives quietly, a letter at a time.' },
    { t: 'choose', prompt: 'Read this: شب',
      answer: 'night',
      options: ['night', 'six', 'bread', 'white'],
      why: 'shab. shin then be. And Shab-e Yald\u0101 is the night of Yalda, which you already knew.' },
    { t: 'listen', fa: 'فردا', tr: 'fard\u0101', en: 'tomorrow',
      options: ['فردا', 'سفید', 'شب', 'خانه'],
      optionTrs: { 'فردا': 'fard\u0101', 'سفید': 'sefid', 'شب': 'shab', 'خانه': 'kh\u0101ne' } },
    { t: 'write', fa: 'شب', tr: 'shab', en: 'night' },
  ],
};



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
    { t: 'meet', fa: 'کجا', tr: 'koj\u0101', en: 'where' },
    { t: 'meet', fa: 'چرا', tr: 'cher\u0101', en: 'why' },
    { t: 'meet', fa: 'چطور', tr: 'chetor', en: 'how' },
    { t: 'sense', fa: 'چی', tr: 'chi', en: 'what',
      body: 'Written Persian says che. Everyone speaking says chi. You will see چه on a page and hear چی in the room, and both are the same word. This gap between written and spoken runs through the whole language, and this is the first place you meet it.' },
    { t: 'sentence', fa: 'کی می‌روی؟', tr: 'key miravi?', en: 'when are you going?', focus: 'کی' },
    { t: 'sentence', fa: 'چرا نمی‌آیی؟', tr: 'cher\u0101 nemi\u0101yi?', en: 'why are you not coming?', focus: 'چرا' },
    { t: 'note', title: 'chetori is how are you',
      body: 'chetor is how, and chetori is literally how are you. You have been using a question word since the first lesson without knowing it. Persian builds a lot of everyday phrases this way, out of pieces that are still visible if you look.' },
    { t: 'choose', prompt: 'You want to ask where the bazaar is. Which word do you need?',
      answer: 'کجا',
      options: ['کجا', 'کی', 'چرا', 'چطور'],
      optionTrs: { 'کجا': 'koj\u0101', 'کی': 'key', 'چرا': 'cher\u0101', 'چطور': 'chetor' },
      why: 'koj\u0101, where. b\u0101z\u0101r koj\u0101st.' },
    { t: 'build', fa: 'کی می‌روی؟', tr: 'key miravi?', en: 'when are you going?',
      parts: ['کی', 'می‌روی؟', 'کجا', 'چرا'],
      partTrs: { 'کی': 'key', 'می‌روی؟': 'miravi', 'کجا': 'koj\u0101', 'چرا': 'cher\u0101' } },
    { t: 'listen', fa: 'چرا نمی‌آیی؟', tr: 'cher\u0101 nemi\u0101yi?', en: 'why are you not coming?',
      options: ['چرا نمی‌آیی؟', 'کی می‌روی؟', 'کجاست؟', 'چطوری؟'],
      optionTrs: { 'چرا نمی‌آیی؟': 'cher\u0101 nemi\u0101yi?', 'کی می‌روی؟': 'key miravi?', 'کجاست؟': 'koj\u0101st?', 'چطوری؟': 'chetori?' } },
    { t: 'write', fa: 'کجا', tr: 'koj\u0101', en: 'where' },
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
    { t: 'meet', fa: 'ماشین', tr: 'm\u0101shin', en: 'car' },
    { t: 'meet', fa: 'تاکسی', tr: 't\u0101ksi', en: 'taxi' },
    { t: 'meet', fa: 'اتوبوس', tr: 'otobus', en: 'bus' },
    { t: 'meet', fa: 'مترو', tr: 'metro', en: 'metro' },
    { t: 'note', title: 'Half of these are French',
      body: 'otobus, metro, t\u0101ksi. Persian took its transport vocabulary from French in the early twentieth century, along with mersi and m\u0101m\u0101n. If a modern Persian word sounds European, it usually came through French rather than English.' },
    { t: 'meet', fa: 'فرودگاه', tr: 'forudg\u0101h', en: 'airport', literal: 'landing-place' },
    { t: 'sense', fa: 'فرودگاه', tr: 'forudg\u0101h', en: 'airport',
      body: 'forud is descent, g\u0101h is place. The place of coming down. Persian builds new words out of old Persian pieces rather than borrowing, whenever anyone lets it: d\u0101neshg\u0101h, university, is knowledge-place by the same logic.' },
    { t: 'meet', fa: 'بلیت', tr: 'belit', en: 'ticket' },
    { t: 'sentence', fa: 'یک بلیت می‌خواهم', tr: 'yek belit mikh\u0101ham', en: 'I want one ticket', focus: 'بلیت' },
    { t: 'meet', fa: 'نگه دار', tr: 'negah d\u0101r', en: 'stop, pull over' },
    { t: 'note', title: 'What to say in a Tehran taxi',
      body: 'negah d\u0101r is stop here, and it is the phrase you will use most. Shared taxis run fixed routes and you get out wherever you like: you say negah d\u0101r, lotfan, and the driver pulls over. Add dast-e r\u0101st, on the right, if you want to be precise.' },
    { t: 'sentence', fa: 'اینجا نگه دار، لطفاً', tr: 'inj\u0101 negah d\u0101r, lotfan', en: 'stop here, please', focus: 'نگه دار' },
    { t: 'choose', prompt: 'You are in a taxi and want to get out at the next corner. What do you say?',
      answer: 'اینجا نگه دار، لطفاً',
      options: ['اینجا نگه دار، لطفاً', 'یک بلیت می‌خواهم', 'فرودگاه کجاست؟', 'اتوبوس دور است'],
      optionTrs: { 'اینجا نگه دار، لطفاً': 'inj\u0101 negah d\u0101r, lotfan', 'یک بلیت می‌خواهم': 'yek belit mikh\u0101ham', 'فرودگاه کجاست؟': 'forudg\u0101h koj\u0101st?', 'اتوبوس دور است': 'otobus dur ast' },
      why: 'inj\u0101, here, and negah d\u0101r, stop. The two words you met in this lesson doing exactly what you need.' },
    { t: 'build', fa: 'اینجا نگه دار', tr: 'inj\u0101 negah d\u0101r', en: 'stop here',
      parts: ['اینجا', 'نگه', 'دار', 'بلیت'],
      partTrs: { 'اینجا': 'inj\u0101', 'نگه': 'negah', 'دار': 'd\u0101r', 'بلیت': 'belit' } },
    { t: 'listen', fa: 'فرودگاه کجاست؟', tr: 'forudg\u0101h koj\u0101st?', en: 'where is the airport?',
      options: ['فرودگاه کجاست؟', 'اینجا نگه دار', 'یک بلیت می‌خواهم', 'مترو نزدیک است'],
      optionTrs: { 'فرودگاه کجاست؟': 'forudg\u0101h koj\u0101st?', 'اینجا نگه دار': 'inj\u0101 negah d\u0101r', 'یک بلیت می‌خواهم': 'yek belit mikh\u0101ham', 'مترو نزدیک است': 'metro nazdik ast' } },
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
    { t: 'meet', fa: 'بهار', tr: 'bah\u0101r', en: 'spring' },
    { t: 'meet', fa: 'تابستان', tr: 't\u0101best\u0101n', en: 'summer' },
    { t: 'meet', fa: 'پاییز', tr: 'p\u0101yiz', en: 'autumn' },
    { t: 'meet', fa: 'زمستان', tr: 'zemest\u0101n', en: 'winter' },
    { t: 'sense', fa: 'تابستان', tr: 't\u0101best\u0101n', en: 'summer',
      body: 'Look at the ending on two of them: t\u0101best\u0101n and zemest\u0101n. That -st\u0101n means place of, the same ending in Afgh\u0101nist\u0101n, T\u0101jikist\u0101n and Golest\u0101n, the place of flowers. Summer is the place of heat, winter the place of cold.' },
    { t: 'note', title: 'The year opens in spring',
      body: 'The Iranian year begins at the spring equinox, not in January. bah\u0101r is the first season, not the second, and Farvardin is the first month. When Iranians talk about the start of the year they mean the moment the earth tilts, which is a more defensible place to begin than an arbitrary winter night.' },
    { t: 'meet', fa: 'فروردین', tr: 'Farvardin', en: 'the first month', literal: 'late March to late April' },
    { t: 'meet', fa: 'اسفند', tr: 'Esfand', en: 'the last month', literal: 'late February to late March' },
    { t: 'note', title: 'The months are Zoroastrian',
      body: 'Every Iranian month is named after a Zoroastrian divine being: Farvardin for the guardian spirits of the dead, Ordibehesht for best truth, Mehr for the god of covenant and light. This calendar has been running for well over a thousand years, and every date written in Iran still carries those names.' },
    { t: 'meet', fa: 'ماه', tr: 'm\u0101h', en: 'month, moon' },
    { t: 'sense', fa: 'ماه', tr: 'm\u0101h', en: 'moon and month',
      body: 'One word for both, as in English month and moon, and for the same reason: months were moons. m\u0101h is also what you call someone beautiful. Telling a person they are a moon is an ordinary compliment in Persian, not a poetic flourish.' },
    { t: 'sentence', fa: 'بهار خیلی قشنگ است', tr: 'bah\u0101r kheyli ghashang ast', en: 'spring is very beautiful', focus: 'بهار' },
    { t: 'choose', prompt: 'Which season does the Iranian year start in?',
      answer: 'بهار',
      options: ['بهار', 'زمستان', 'تابستان', 'پاییز'],
      optionTrs: { 'بهار': 'bah\u0101r', 'زمستان': 'zemest\u0101n', 'تابستان': 't\u0101best\u0101n', 'پاییز': 'p\u0101yiz' },
      why: 'bah\u0101r, spring. Nowruz falls on the equinox and the new year begins at that exact moment.' },
    { t: 'listen', fa: 'زمستان سرد است', tr: 'zemest\u0101n sard ast', en: 'winter is cold',
      options: ['زمستان سرد است', 'بهار قشنگ است', 'تابستان داغ است', 'پاییز'],
      optionTrs: { 'زمستان سرد است': 'zemest\u0101n sard ast', 'بهار قشنگ است': 'bah\u0101r ghashang ast', 'تابستان داغ است': 't\u0101best\u0101n d\u0101gh ast', 'پاییز': 'p\u0101yiz' } },
    { t: 'write', fa: 'بهار', tr: 'bah\u0101r', en: 'spring' },
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
      body: 'Persian is written one way and spoken another, and the difference is bigger than in English. A newspaper says mitav\u0101nam. A person says mitunam. Neither is wrong. If you only learn the written form you will read well and understand nobody; if you only learn the spoken form you cannot read a sign. The good news is that the changes follow patterns.' },
    { t: 'meet', fa: 'می‌توانم', tr: 'mitav\u0101nam', en: 'I can', literal: 'written form' },
    { t: 'meet', fa: 'می‌تونم', tr: 'mitunam', en: 'I can', literal: 'spoken form' },
    { t: 'sense', fa: 'می‌تونم', tr: 'mitunam', en: 'I can',
      body: 'The pattern: \u0101n in the middle of a word collapses to un. mitav\u0101nam becomes mitunam. kh\u0101ne becomes khune, house. n\u0101n becomes nun, bread. Once you know this one rule you can decode a great deal of spoken Persian that looked unfamiliar.' },
    { t: 'meet', fa: 'خانه', tr: 'kh\u0101ne', en: 'house', literal: 'written; spoken khune' },
    { t: 'meet', fa: 'می‌روم', tr: 'miravam', en: 'I go', literal: 'written; spoken miram' },
    { t: 'note', title: 'The other pattern: things fall out',
      body: 'Spoken Persian drops sounds. miravam loses its v and becomes miram. ast at the end of a sentence shrinks to a single e: khubast becomes khube. Persian in the mouth is faster and shorter than Persian on the page, in every direction.' },
    { t: 'meet', fa: 'باشه', tr: 'b\u0101she', en: 'okay, fine', literal: 'let it be' },
    { t: 'sense', fa: 'باشه', tr: 'b\u0101she', en: 'okay',
      body: 'Written b\u0101shad, spoken b\u0101she, and it means let it be, so fine, alright, agreed. You will hear it constantly, ending conversations and settling plans. It is the single most useful colloquial word in Persian.' },
    { t: 'choose', prompt: 'You hear someone say khune. What are they saying?',
      answer: 'خانه',
      options: ['خانه', 'خوب', 'خون', 'کجا'],
      optionTrs: { 'خانه': 'kh\u0101ne, house', 'خوب': 'khub, good', 'خون': 'khun, blood', 'کجا': 'koj\u0101, where' },
      why: 'kh\u0101ne spoken aloud becomes khune. The \u0101n to un rule again, the same one behind mitunam.' },
    { t: 'choose', prompt: 'A friend says b\u0101she at the end of a plan. What did they mean?',
      answer: 'Alright, agreed',
      options: ['Alright, agreed', 'Where are you', 'I do not understand', 'Thank you'],
      why: 'b\u0101she, from b\u0101shad, let it be. It closes the matter.' },
    { t: 'listen', fa: 'باشه', tr: 'b\u0101she', en: 'okay',
      options: ['باشه', 'خانه', 'می‌تونم', 'کجا'],
      optionTrs: { 'باشه': 'b\u0101she', 'خانه': 'kh\u0101ne', 'می‌تونم': 'mitunam', 'کجا': 'koj\u0101' } },
    { t: 'note', title: 'How to hold both',
      body: 'Read the written form so you can handle a book, a sign or a message. Say the spoken form so you sound like a person rather than a document. Every lesson in this app gives you the written Persian and tells you what it becomes in the mouth, and after a while you stop noticing you are doing two things at once.' },
    { t: 'write', fa: 'باشه', tr: 'b\u0101she', en: 'okay' },
  ],
};



const emotions: Lesson = {
  key: 'emotions',
  title: 'Calm, angry, and everything under it',
  titleFa: 'حال‌ها',
  blurb: 'The states Persian names precisely, and English does not.',
  minutes: 10,
  steps: [
    { t: 'meet', fa: 'آروم', tr: '\u0101rum', en: 'calm, quiet, at ease' },
    { t: 'sense', fa: 'آروم', tr: '\u0101rum', en: 'calm',
      body: '\u0101rum is calm, but it is also gently, softly, slowly. \u0101rum harf bezan means speak quietly. \u0101rum bor\u014D means go slowly. The same word covers a state of mind and a way of moving through the world, because Persian treats them as the same thing.' },
    { t: 'meet', fa: 'عصبانی', tr: 'asab\u0101ni', en: 'angry' },
    { t: 'meet', fa: 'بی‌اعصاب', tr: 'bi-asab', en: 'short-tempered, on edge', literal: 'without nerves' },
    { t: 'sense', fa: 'بی‌اعصاب', tr: 'bi-asab', en: 'short-tempered',
      body: 'asab is nerve. asab\u0101ni is angry right now; bi-asab is the person who has no nerves left, who snaps at everything. One is a moment, the other is a condition. English needs a whole phrase for the second and Persian needs one word.' },
    { t: 'note', title: 'The prefix bi- takes things away',
      body: 'bi- means without, and it turns any noun into its absence. bi-asab, without nerves. bi-adab, without manners, rude. bi-kh\u0101b, without sleep. bi-hesi, without feeling. Once you have this prefix you can decode dozens of words on sight.' },
    { t: 'meet', fa: 'دلخور', tr: 'delkhor', en: 'hurt, quietly offended', literal: 'heart-eaten' },
    { t: 'sense', fa: 'دلخور', tr: 'delkhor', en: 'hurt',
      body: 'Not angry. Not sad. delkhor is the specific ache of having been let down by someone you care about, and saying nothing. Your heart has been eaten at. It is one of the most useful words in Persian family life and English has no single word for it at all.' },
    { t: 'meet', fa: 'نگران', tr: 'negar\u0101n', en: 'worried' },
    { t: 'meet', fa: 'دلواپس', tr: 'delv\u0101pas', en: 'anxious for someone', literal: 'heart hanging back' },
    { t: 'sense', fa: 'دلواپس', tr: 'delv\u0101pas', en: 'anxious for someone',
      body: 'negar\u0101n is worried about a thing: an exam, a bill. delv\u0101pas is the worry you carry for a person, the one that sits in you while someone you love is travelling and has not called. Your heart is hanging back, still attached to them. Persian separates these two anxieties and English collapses them into one word.' },
    { t: 'meet', fa: 'شوکه', tr: 'shoke', en: 'shocked' },
    { t: 'meet', fa: 'خوشحال', tr: 'khoshh\u0101l', en: 'happy', literal: 'good-state' },
    { t: 'meet', fa: 'ناراحت', tr: 'n\u0101r\u0101hat', en: 'upset, unwell in yourself', literal: 'not-comfortable' },
    { t: 'note', title: 'hāl is the state you are in',
      body: 'h\u0101l means condition, state, how you are. khosh-h\u0101l is good-state, happy. bad-h\u0101l is bad-state, unwell. h\u0101let chetore is how is your state, meaning how are you, and it is warmer than khubi. Persian keeps returning to this one noun for everything about how a person is doing.' },
    { t: 'choose', prompt: 'Your brother has not answered his phone all evening and you keep checking it. Which word is it?',
      answer: 'دلواپس',
      options: ['دلواپس', 'عصبانی', 'دلخور', 'آروم'],
      optionTrs: { 'دلواپس': 'delv\u0101pas', 'عصبانی': 'asab\u0101ni', 'دلخور': 'delkhor', 'آروم': '\u0101rum' },
      why: 'delv\u0101pas. Worry attached to a person rather than a thing. negar\u0101n would work but it is colder; this is the one an Iranian would reach for.' },
    { t: 'choose', prompt: 'A friend forgot your birthday. You are not angry, but something in you has gone quiet. Which word?',
      answer: 'دلخور',
      options: ['دلخور', 'عصبانی', 'شوکه', 'ناراحت'],
      optionTrs: { 'دلخور': 'delkhor', 'عصبانی': 'asab\u0101ni', 'شوکه': 'shoke', 'ناراحت': 'n\u0101r\u0101hat' },
      why: 'delkhor. Hurt by someone close, and not saying so. This is the word that exists precisely for the feeling you just had.' },
    { t: 'sentence', fa: 'آروم باش', tr: '\u0101rum b\u0101sh', en: 'calm down', focus: 'آروم' },
    { t: 'build', fa: 'خیلی نگران هستم', tr: 'kheyli negar\u0101n hastam', en: 'I am very worried',
      parts: ['خیلی', 'نگران', 'هستم', 'آروم'],
      partTrs: { 'خیلی': 'kheyli', 'نگران': 'negar\u0101n', 'هستم': 'hastam', 'آروم': '\u0101rum' } },
    { t: 'listen', fa: 'آروم باش', tr: '\u0101rum b\u0101sh', en: 'calm down',
      options: ['آروم باش', 'نگران هستم', 'عصبانی است', 'دلخورم'],
      optionTrs: { 'آروم باش': '\u0101rum b\u0101sh', 'نگران هستم': 'negar\u0101n hastam', 'عصبانی است': 'asab\u0101ni ast', 'دلخورم': 'delkhoram' } },
    { t: 'write', fa: 'آروم', tr: '\u0101rum', en: 'calm' },
  ],
};



/* ------------------------------------------------------------------ */
/* The past                                                            */
/* ------------------------------------------------------------------ */

const pastTense: Lesson = {
  key: 'past',
  title: 'Talking about what happened',
  titleFa: 'گذشته',
  blurb: 'The past tense, which is easier than the present.',
  minutes: 10,
  steps: [
    { t: 'note', title: 'Persian gives you the past for free',
      body: 'Every Persian verb has two stems: a present one and a past one. The past stem is the infinitive with its -an removed, and it never changes. raftan, to go, gives raft. khordan, to eat, gives khord. Put the same endings you already know on the back of it and you are speaking in the past. No new endings, no irregular forms to memorise.' },
    { t: 'meet', fa: 'رفتم', tr: 'raftam', en: 'I went' },
    { t: 'meet', fa: 'رفتی', tr: 'rafti', en: 'you went' },
    { t: 'meet', fa: 'رفت', tr: 'raft', en: 'he went, she went' },
    { t: 'sense', fa: 'رفتم', tr: 'raftam', en: 'I went',
      body: 'raft-am, raft-i, raft. Exactly the endings from d\u0101ram and hastam. And notice the third person: raft, with nothing on the end at all. The bare past stem is already he went. Persian could not have made this simpler if it tried.' },
    { t: 'meet', fa: 'خوردم', tr: 'khordam', en: 'I ate' },
    { t: 'meet', fa: 'دیدم', tr: 'didam', en: 'I saw' },
    { t: 'meet', fa: 'گفتم', tr: 'goftam', en: 'I said' },
    { t: 'gap', before: 'دیروز به بازار', after: '', answer: 'رفتم',
      tr: 'diruz be b\u0101z\u0101r raftam', en: 'Yesterday I went to the bazaar',
      options: ['رفتم', 'می‌روم', 'رفتی', 'می‌رفت'],
      optionTrs: { 'رفتم': 'raftam, I went', 'می‌روم': 'miravam, I go', 'رفتی': 'rafti, you went', 'می‌رفت': 'miraft, he was going' },
      why: 'diruz, yesterday, so the verb has to be past, and the -am makes it I.' },
    { t: 'note', title: 'The past that was still going on',
      body: 'Put mi- back on the front of a past verb and it becomes the past that continued: raftam is I went, miraftam is I was going, or I used to go. That one prefix carries the whole difference between a finished action and a habit, and it is the same mi- that makes the present.' },
    { t: 'meet', fa: 'می‌رفتم', tr: 'miraftam', en: 'I used to go, I was going' },
    { t: 'sentence', fa: 'هر روز به مدرسه می‌رفتم', tr: 'har ruz be madrese miraftam', en: 'Every day I used to go to school', focus: 'می‌رفتم' },
    { t: 'choose', prompt: 'You want to say I ate bread yesterday. Which verb?',
      answer: 'خوردم',
      options: ['خوردم', 'می‌خورم', 'خوردی', 'می‌خوردم'],
      optionTrs: { 'خوردم': 'khordam, I ate', 'می‌خورم': 'mikhoram, I eat', 'خوردی': 'khordi, you ate', 'می‌خوردم': 'mikhordam, I used to eat' },
      why: 'khordam. A finished action, once, in the past. mikhordam would mean you used to eat bread, habitually.' },
    { t: 'build', fa: 'دیروز نان خوردم', tr: 'diruz n\u0101n khordam', en: 'Yesterday I ate bread',
      parts: ['دیروز', 'نان', 'خوردم', 'می‌خورم'],
      partTrs: { 'دیروز': 'diruz', 'نان': 'n\u0101n', 'خوردم': 'khordam', 'می‌خورم': 'mikhoram' } },
    { t: 'gap', before: 'او به من', after: 'که فردا می‌آید', answer: 'گفت',
      tr: 'u be man goft ke fard\u0101 mi\u0101yad', en: 'He told me that he is coming tomorrow',
      options: ['گفت', 'گفتم', 'می‌گویم', 'گفتی'],
      optionTrs: { 'گفت': 'goft, he said', 'گفتم': 'goftam, I said', 'می‌گویم': 'miguyam, I say', 'گفتی': 'gofti, you said' },
      why: 'u is he, and the third person past takes no ending at all: goft.' },
    { t: 'listen', fa: 'دیروز به بازار رفتم', tr: 'diruz be b\u0101z\u0101r raftam', en: 'Yesterday I went to the bazaar',
      options: ['دیروز به بازار رفتم', 'فردا به بازار می‌روم', 'نان خوردم', 'او گفت'],
      optionTrs: { 'دیروز به بازار رفتم': 'diruz be b\u0101z\u0101r raftam', 'فردا به بازار می‌روم': 'fard\u0101 be b\u0101z\u0101r miravam', 'نان خوردم': 'n\u0101n khordam', 'او گفت': 'u goft' } },
    { t: 'type', fa: 'رفتم', tr: 'raftam', en: 'I went', hint: 'Four letters. The keyboard is the Iranian layout.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Formality                                                           */
/* ------------------------------------------------------------------ */

const formality: Lesson = {
  key: 'formality',
  title: 'to and shomā',
  titleFa: 'تو و شما',
  blurb: 'Choosing how close to stand, in every sentence.',
  minutes: 9,
  steps: [
    { t: 'note', title: 'Persian makes you choose, constantly',
      body: 'There are two words for you, and you cannot avoid picking one. to is for friends, children, family and anyone younger. shom\u0101 is for elders, strangers, teachers, anyone senior, and anyone you want to hold at a respectful distance. Getting it wrong is not a grammar mistake, it is a social one, and it is the thing heritage speakers most often stumble on.' },
    { t: 'meet', fa: 'تو', tr: 'to', en: 'you, familiar' },
    { t: 'meet', fa: 'شما', tr: 'shom\u0101', en: 'you, respectful' },
    { t: 'sense', fa: 'شما', tr: 'shom\u0101', en: 'you, respectful',
      body: 'shom\u0101 is grammatically plural, and takes plural verbs even when you are talking to one person. shom\u0101 chetorid, how are you. This is the same instinct as French vous or German Sie: you address one respected person as though they were several.' },
    { t: 'meet', fa: 'چطوری', tr: 'chetori', en: 'how are you, familiar' },
    { t: 'meet', fa: 'چطورید', tr: 'chetorid', en: 'how are you, respectful' },
    { t: 'gap', before: 'سلام آقای احمدی،', after: 'خوب هستید؟',
      answer: 'شما',
      tr: 'sal\u0101m \u0101gh\u0101-ye Ahmadi, shom\u0101 khub hastid?',
      en: 'Hello Mr Ahmadi, are you well?',
      options: ['شما', 'تو', 'من', 'او'],
      optionTrs: { 'شما': 'shom\u0101, you respectful', 'تو': 'to, you familiar', 'من': 'man, I', 'او': 'u, he or she' },
      why: 'You are using his surname and a title, so shom\u0101 is the only possible choice. Using to here would be startling.' },
    { t: 'note', title: 'When in doubt, use shomā',
      body: 'Over-formality is a small awkwardness. Under-formality is a real one. An older Iranian will usually invite you to switch by saying to as if we are family, and until they do, stay with shom\u0101. The exception is children and close friends, where shom\u0101 sounds cold or sarcastic.' },
    { t: 'meet', fa: 'بفرمایید', tr: 'befarm\u0101yid', en: 'please, go ahead, help yourself' },
    { t: 'sense', fa: 'بفرمایید', tr: 'befarm\u0101yid', en: 'please, go ahead',
      body: 'The most polite word in daily Persian, and it does everything: come in, sit down, take some, after you, go ahead and speak. It is the respectful form of a verb meaning to command, so you are literally inviting the other person to give the orders. You will hear it fifty times a day in Iran.' },
    { t: 'choose', prompt: 'You are meeting your friend\u2019s grandmother for the first time. Which do you use?',
      answer: 'شما',
      options: ['شما', 'تو', 'either is fine', 'neither'],
      why: 'shom\u0101, without hesitation. She may well tell you to use to within the hour, and then you switch.' },
    { t: 'listen', fa: 'بفرمایید', tr: 'befarm\u0101yid', en: 'please, go ahead',
      options: ['بفرمایید', 'چطورید', 'شما', 'خوش آمدید'],
      optionTrs: { 'بفرمایید': 'befarm\u0101yid', 'چطورید': 'chetorid', 'شما': 'shom\u0101', 'خوش آمدید': 'khosh \u0101madid' } },
    { t: 'write', fa: 'شما', tr: 'shom\u0101', en: 'you, respectful' },
  ],
};

/* ------------------------------------------------------------------ */
/* Longer sentences                                                    */
/* ------------------------------------------------------------------ */

const joining: Lesson = {
  key: 'joining',
  title: 'Making longer sentences',
  titleFa: 'جمله‌های بلندتر',
  blurb: 'The small words that join two thoughts into one.',
  minutes: 10,
  steps: [
    { t: 'meet', fa: 'که', tr: 'ke', en: 'that, which, who' },
    { t: 'sense', fa: 'که', tr: 'ke', en: 'that',
      body: 'ke is the hinge of Persian. It joins any two clauses: I said THAT I am coming, the man WHO was here, the book THAT you gave me. English drops its that all the time; Persian keeps ke in almost every case, so once you can hear it you can hear where one thought ends and the next begins.' },
    { t: 'sentence', fa: 'گفتم که می‌آیم', tr: 'goftam ke mi\u0101yam', en: 'I said that I am coming', focus: 'که' },
    { t: 'meet', fa: 'ولی', tr: 'vali', en: 'but' },
    { t: 'meet', fa: 'چون', tr: 'chun', en: 'because' },
    { t: 'meet', fa: 'اگر', tr: 'agar', en: 'if' },
    { t: 'gap', before: 'می‌خواستم بیایم', after: 'وقت نداشتم', answer: 'ولی',
      tr: 'mikh\u0101stam biy\u0101yam vali vaght nad\u0101shtam',
      en: 'I wanted to come but I did not have time',
      options: ['ولی', 'چون', 'اگر', 'که'],
      optionTrs: { 'ولی': 'vali, but', 'چون': 'chun, because', 'اگر': 'agar, if', 'که': 'ke, that' },
      why: 'Two things in tension: wanting to come, and not having time. vali holds them against each other.' },
    { t: 'gap', before: 'نیامدم', after: 'مریض بودم', answer: 'چون',
      tr: 'nay\u0101madam chun mariz budam',
      en: 'I did not come because I was ill',
      options: ['چون', 'ولی', 'اگر', 'و'],
      optionTrs: { 'چون': 'chun, because', 'ولی': 'vali, but', 'اگر': 'agar, if', 'و': 'va, and' },
      why: 'The second half explains the first, so chun. And notice nay\u0101madam: the negative na- on a past verb.' },
    { t: 'note', title: 'Persian stacks clauses happily',
      body: 'Written Persian, especially older or literary Persian, runs sentences much longer than English tolerates, joined by ke after ke. This is not bad style, it is the shape of the language. When you read something that seems to go on forever, look for the ke and you will find the joints.' },
    { t: 'sentence', fa: 'اگر وقت داشته باشم، فردا می‌آیم',
      tr: 'agar vaght d\u0101shte b\u0101sham, fard\u0101 mi\u0101yam',
      en: 'If I have time, I will come tomorrow', focus: 'اگر' },
    { t: 'note', title: 'agar wants the subjunctive',
      body: 'After agar, if, Persian uses a mood for things that have not happened yet: d\u0101shte b\u0101sham rather than d\u0101ram. English does something similar in if I were you. It is the one place Persian grammar gets genuinely fiddly, and recognising it in reading matters more than producing it perfectly.' },
    { t: 'build', fa: 'گفتم که می‌آیم', tr: 'goftam ke mi\u0101yam', en: 'I said that I am coming',
      parts: ['گفتم', 'که', 'می‌آیم', 'ولی'],
      partTrs: { 'گفتم': 'goftam', 'که': 'ke', 'می‌آیم': 'mi\u0101yam', 'ولی': 'vali' } },
    { t: 'listen', fa: 'می‌خواستم بیایم ولی وقت نداشتم',
      tr: 'mikh\u0101stam biy\u0101yam vali vaght nad\u0101shtam',
      en: 'I wanted to come but I did not have time',
      options: ['می‌خواستم بیایم ولی وقت نداشتم', 'نیامدم چون مریض بودم', 'گفتم که می‌آیم', 'اگر وقت داشته باشم'],
      optionTrs: {
        'می‌خواستم بیایم ولی وقت نداشتم': 'mikh\u0101stam biy\u0101yam vali vaght nad\u0101shtam',
        'نیامدم چون مریض بودم': 'nay\u0101madam chun mariz budam',
        'گفتم که می‌آیم': 'goftam ke mi\u0101yam',
        'اگر وقت داشته باشم': 'agar vaght d\u0101shte b\u0101sham' } },
    { t: 'type', fa: 'ولی', tr: 'vali', en: 'but' },
  ],
};



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
    { t: 'sense', fa: 'کار کردن', tr: 'k\u0101r kardan', en: 'to work',
      body: 'k\u0101r is work, kardan is to do. Work-do. And that is the whole machine: take a noun, add kardan, and you have a verb. The noun stays put and only kardan conjugates: k\u0101r mikonam, I work. k\u0101r kardam, I worked.' },
    { t: 'meet', fa: 'صحبت کردن', tr: 'sohbat kardan', en: 'to speak', literal: 'conversation-do' },
    { t: 'meet', fa: 'فکر کردن', tr: 'fekr kardan', en: 'to think', literal: 'thought-do' },
    { t: 'meet', fa: 'کمک کردن', tr: 'komak kardan', en: 'to help', literal: 'help-do' },
    { t: 'gap', before: 'من هر روز', after: 'می‌کنم', answer: 'کار',
      tr: 'man har ruz k\u0101r mikonam', en: 'I work every day',
      options: ['کار', 'فکر', 'کمک', 'صحبت'],
      optionTrs: { 'کار': 'k\u0101r, work', 'فکر': 'fekr, thought', 'کمک': 'komak, help', 'صحبت': 'sohbat, conversation' },
      why: 'k\u0101r mikonam, I work. Notice mikonam sits at the end and k\u0101r never changes.' },
    { t: 'meet', fa: 'شدن', tr: 'shodan', en: 'to become' },
    { t: 'sense', fa: 'شدن', tr: 'shodan', en: 'to become',
      body: 'The second great helper. Where kardan does a thing, shodan has a thing happen to you. b\u0101z kardan is to open something; b\u0101z shodan is for something to open. khoshh\u0101l kardan is to make someone happy; khoshh\u0101l shodan is to become happy. This pair does the work English needs the passive voice for.' },
    { t: 'meet', fa: 'زدن', tr: 'zadan', en: 'to hit, to strike' },
    { t: 'note', title: 'zadan is stranger than it looks',
      body: 'zadan literally means to strike, and it turns up everywhere: telefon zadan, to phone, literally to strike a telephone. harf zadan, to talk, to strike words. ghadam zadan, to stroll, to strike steps. When a compound looks odd, zadan is usually the reason, and the image is usually worth keeping.' },
    { t: 'meet', fa: 'حرف زدن', tr: 'harf zadan', en: 'to talk', literal: 'word-strike' },
    { t: 'meet', fa: 'تلفن زدن', tr: 'telefon zadan', en: 'to phone', literal: 'telephone-strike' },
    { t: 'meet', fa: 'دوست داشتن', tr: 'dust d\u0101shtan', en: 'to like, to love', literal: 'friendship-have' },
    { t: 'gap', before: 'تو را خیلی', after: 'دارم', answer: 'دوست',
      tr: 'to r\u0101 kheyli dust d\u0101ram', en: 'I love you very much',
      options: ['دوست', 'کار', 'حرف', 'فکر'],
      optionTrs: { 'دوست': 'dust, friendship', 'کار': 'k\u0101r, work', 'حرف': 'harf, word', 'فکر': 'fekr, thought' },
      why: 'dust d\u0101ram, literally I have friendship for you. Persian says both like and love with this one compound, and lets context decide.' },
    { t: 'choose', prompt: 'You have learned kardan, shodan, zadan and d\u0101shtan. Roughly how many Persian verbs does that open?',
      answer: 'Thousands',
      options: ['Thousands', 'About twenty', 'About a hundred', 'Only these four'],
      why: 'Nearly every verb you meet from here will be a noun plus one of these. The helper carries the tense and the person; the noun carries the meaning.' },
    { t: 'listen', fa: 'باهات حرف می‌زنم', tr: 'b\u0101h\u0101t harf mizanam', en: 'I will talk to you',
      options: ['باهات حرف می‌زنم', 'کار می‌کنم', 'فکر می‌کنم', 'تلفن می‌زنم'],
      optionTrs: { 'باهات حرف می‌زنم': 'b\u0101h\u0101t harf mizanam', 'کار می‌کنم': 'k\u0101r mikonam', 'فکر می‌کنم': 'fekr mikonam', 'تلفن می‌زنم': 'telefon mizanam' } },
    { t: 'type', fa: 'کار کردن', tr: 'k\u0101r kardan', en: 'to work' },
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
      body: 'r\u0101 sits after a definite object: the thing being acted on, when it is a specific thing. English uses word order for this and Persian uses r\u0101, which is why Persian can move words around far more freely than English and still be understood.' },
    { t: 'meet', fa: 'را', tr: 'r\u0101', en: 'marks a definite object' },
    { t: 'sentence', fa: 'کتاب را خواندم', tr: 'ket\u0101b r\u0101 kh\u0101ndam', en: 'I read the book', focus: 'را' },
    { t: 'sense', fa: 'کتاب را خواندم', tr: 'ket\u0101b r\u0101 kh\u0101ndam', en: 'I read the book',
      body: 'With r\u0101 it is THE book, one you both know about. Without it, ket\u0101b kh\u0101ndam is I read a book, or simply I did some reading. Persian has no word for the, and r\u0101 quietly does that job for objects.' },
    { t: 'note', title: 'In speech it becomes a vowel',
      body: 'Written r\u0101. Spoken, it usually collapses onto the word before it: ket\u0101b-o kh\u0101ndam. After a vowel it becomes -ro: injuro bebin, look at this. You will hear the o everywhere and see the r\u0101 everywhere, and they are the same thing.' },
    { t: 'gap', before: 'من تو', after: 'دوست دارم', answer: 'را',
      tr: 'man to r\u0101 dust d\u0101ram', en: 'I love you',
      options: ['را', 'به', 'از', 'با'],
      optionTrs: { 'را': 'r\u0101, object marker', 'به': 'be, to', 'از': 'az, from', 'با': 'b\u0101, with' },
      why: 'to is the object of the loving, and it is definite, so it takes r\u0101.' },
    { t: 'choose', prompt: 'What is the difference between ket\u0101b kh\u0101ndam and ket\u0101b r\u0101 kh\u0101ndam?',
      answer: 'The second means a specific book',
      options: ['The second means a specific book', 'They are identical', 'The second is past tense', 'The second is a question'],
      why: 'r\u0101 makes the object definite. I read the book, the one we both have in mind, rather than I did some reading.' },
    { t: 'sentence', fa: 'در را ببند', tr: 'dar r\u0101 beband', en: 'close the door', focus: 'را' },
    { t: 'build', fa: 'کتاب را خواندم', tr: 'ket\u0101b r\u0101 kh\u0101ndam', en: 'I read the book',
      parts: ['کتاب', 'را', 'خواندم', 'به'],
      partTrs: { 'کتاب': 'ket\u0101b', 'را': 'r\u0101', 'خواندم': 'kh\u0101ndam', 'به': 'be' } },
    { t: 'listen', fa: 'در را ببند', tr: 'dar r\u0101 beband', en: 'close the door',
      options: ['در را ببند', 'کتاب را خواندم', 'تو را دوست دارم', 'اینجا را ببین'],
      optionTrs: { 'در را ببند': 'dar r\u0101 beband', 'کتاب را خواندم': 'ket\u0101b r\u0101 kh\u0101ndam', 'تو را دوست دارم': 'to r\u0101 dust d\u0101ram', 'اینجا را ببین': 'inj\u0101 r\u0101 bebin' } },
    { t: 'type', fa: 'را', tr: 'r\u0101', en: 'the object marker' },
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
      body: 'esm-e man. m\u0101dar-e man. ch\u0101y-e d\u0101gh. That small -e is the ez\u0101fe, and it links a noun to whatever describes or possesses it. It is almost never written. At this level the thing to learn is that it chains: one phrase can carry four or five in a row, and reading Persian well means hearing where the chain breaks.' },
    { t: 'meet', fa: 'کتابِ من', tr: 'ket\u0101b-e man', en: 'my book' },
    { t: 'meet', fa: 'کتابِ خوبِ من', tr: 'ket\u0101b-e khub-e man', en: 'my good book' },
    { t: 'sense', fa: 'کتابِ خوبِ من', tr: 'ket\u0101b-e khub-e man', en: 'my good book',
      body: 'book-of-good-of-me. The chain runs left to right in the transliteration and each link adds one more piece. English would say my good book, front-loading everything; Persian starts with the thing itself and adds detail behind it.' },
    { t: 'sentence', fa: 'خانهٔ قدیمیِ پدربزرگِ من', tr: 'kh\u0101ne-ye ghadimi-ye pedarbozorg-e man', en: 'my grandfather\u2019s old house', focus: 'خانه' },
    { t: 'note', title: 'Read the chain backwards',
      body: 'kh\u0101ne-ye ghadimi-ye pedarbozorg-e man is four links: house, old, grandfather, me. To get the English, read it back to front: my grandfather\u2019s old house. This is the single most useful reading trick in Persian, and it works on almost any long phrase you meet.' },
    { t: 'choose', prompt: 'What does ket\u0101b-e t\u0101ze-ye kh\u0101har-e man mean?',
      answer: 'my sister\u2019s new book',
      options: ['my sister\u2019s new book', 'my new sister\u2019s book', 'the book of my new sister', 'a new book and my sister'],
      why: 'book, new, sister, me. Read it back to front and you have it.' },
    { t: 'gap', before: 'چایِ', after: 'را دوست دارم', answer: 'داغ',
      tr: 'ch\u0101y-e d\u0101gh r\u0101 dust d\u0101ram', en: 'I like hot tea',
      options: ['داغ', 'سرد', 'بزرگ', 'دور'],
      optionTrs: { 'داغ': 'd\u0101gh, hot', 'سرد': 'sard, cold', 'بزرگ': 'bozorg, big', 'دور': 'dur, far' },
      why: 'ch\u0101y-e d\u0101gh, tea-of-hot. And r\u0101 after it, because it is a definite object.' },
    { t: 'note', title: 'Why it is never written',
      body: 'The ez\u0101fe is a short vowel, and Persian does not write short vowels. Readers supply it from knowing where noun phrases join. This is the last piece of the puzzle you met in the vowels lesson: reading Persian is partly an act of reconstruction, and by now you are already doing it.' },
    { t: 'listen', fa: 'خانهٔ قدیمیِ پدربزرگِ من', tr: 'kh\u0101ne-ye ghadimi-ye pedarbozorg-e man', en: 'my grandfather\u2019s old house',
      options: ['خانهٔ قدیمیِ پدربزرگِ من', 'کتابِ خوبِ من', 'چایِ داغ', 'مادرِ من'],
      optionTrs: { 'خانهٔ قدیمیِ پدربزرگِ من': 'kh\u0101ne-ye ghadimi-ye pedarbozorg-e man', 'کتابِ خوبِ من': 'ket\u0101b-e khub-e man', 'چایِ داغ': 'ch\u0101y-e d\u0101gh', 'مادرِ من': 'm\u0101dar-e man' } },
    { t: 'type', fa: 'کتاب من', tr: 'ket\u0101b-e man', en: 'my book', hint: 'The ez\u0101fe is heard, not typed.' },
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
    { t: 'meet', fa: 'می‌خواهم بروم', tr: 'mikh\u0101ham beravam', en: 'I want to go' },
    { t: 'note', title: 'Two verbs, and the second one bends',
      body: 'Persian cannot say I want to go with an infinitive the way English does. It says I want that I go. The first verb is ordinary, the second goes subjunctive. mikh\u0101ham beravam. mitav\u0101nam beravam, I can go. b\u0101yad beravam, I must go. The shape never varies.' },
    { t: 'meet', fa: 'باید', tr: 'b\u0101yad', en: 'must, have to' },
    { t: 'meet', fa: 'شاید', tr: 'sh\u0101yad', en: 'maybe, perhaps' },
    { t: 'gap', before: 'باید', after: 'خانه', answer: 'بروم',
      tr: 'b\u0101yad beravam kh\u0101ne', en: 'I have to go home',
      options: ['بروم', 'می‌روم', 'رفتم', 'رفته'],
      optionTrs: { 'بروم': 'beravam, that I go', 'می‌روم': 'miravam, I go', 'رفتم': 'raftam, I went', 'رفته': 'rafte, gone' },
      why: 'After b\u0101yad the verb must be subjunctive. b\u0101yad miravam is not Persian.' },
    { t: 'sentence', fa: 'شاید فردا بیایم', tr: 'sh\u0101yad fard\u0101 biy\u0101yam', en: 'maybe I will come tomorrow', focus: 'شاید' },
    { t: 'choose', prompt: 'Which is correct for I can come?',
      answer: 'می‌توانم بیایم',
      options: ['می‌توانم بیایم', 'می‌توانم می‌آیم', 'توانم آمدن', 'می‌توانم آمدم'],
      optionTrs: { 'می‌توانم بیایم': 'mitav\u0101nam biy\u0101yam', 'می‌توانم می‌آیم': 'mitav\u0101nam mi\u0101yam', 'توانم آمدن': 'tav\u0101nam \u0101madan', 'می‌توانم آمدم': 'mitav\u0101nam \u0101madam' },
      why: 'First verb ordinary, second subjunctive. I can that I come.' },
    { t: 'listen', fa: 'باید بروم', tr: 'b\u0101yad beravam', en: 'I have to go',
      options: ['باید بروم', 'شاید بیایم', 'می‌خواهم بروم', 'می‌روم'],
      optionTrs: { 'باید بروم': 'b\u0101yad beravam', 'شاید بیایم': 'sh\u0101yad biy\u0101yam', 'می‌خواهم بروم': 'mikh\u0101ham beravam', 'می‌روم': 'miravam' } },
    { t: 'type', fa: 'باید', tr: 'b\u0101yad', en: 'must' },
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
      body: 'English moves the verb back: he said he WAS coming. Persian leaves it exactly as the person said it: goft ke mi\u0101yad, he said that he IS coming. You report the words rather than rewriting them, which is simpler and catches English speakers out constantly.' },
    { t: 'meet', fa: 'گفت که', tr: 'goft ke', en: 'he said that' },
    { t: 'sentence', fa: 'گفت که می‌آید', tr: 'goft ke mi\u0101yad', en: 'he said that he is coming', focus: 'که' },
    { t: 'sense', fa: 'گفت که می‌آید', tr: 'goft ke mi\u0101yad', en: 'he said he was coming',
      body: 'The original words were mi\u0101yam, I am coming. Reporting them, only the person changes, to mi\u0101yad. The tense stays present even though the saying happened in the past. English would force was coming and Persian never does.' },
    { t: 'meet', fa: 'پرسید', tr: 'porsid', en: 'he asked' },
    { t: 'sentence', fa: 'پرسید که کجا می‌روی', tr: 'porsid ke koj\u0101 miravi', en: 'he asked where you are going', focus: 'پرسید' },
    { t: 'gap', before: 'گفت', after: 'فردا می‌آید', answer: 'که',
      tr: 'goft ke fard\u0101 mi\u0101yad', en: 'he said that he is coming tomorrow',
      options: ['که', 'را', 'ولی', 'اگر'],
      optionTrs: { 'که': 'ke, that', 'را': 'r\u0101, object marker', 'ولی': 'vali, but', 'اگر': 'agar, if' },
      why: 'ke joins the two clauses. It is the hinge you met in the sentence-joining lesson, doing the same job here.' },
    { t: 'choose', prompt: 'Your friend said mi\u0101yam. How do you report it?',
      answer: 'گفت که می‌آید',
      options: ['گفت که می‌آید', 'گفت که آمد', 'گفت که می‌آمد', 'گفت که بیاید'],
      optionTrs: { 'گفت که می‌آید': 'goft ke mi\u0101yad', 'گفت که آمد': 'goft ke \u0101mad', 'گفت که می‌آمد': 'goft ke mi\u0101mad', 'گفت که بیاید': 'goft ke biy\u0101yad' },
      why: 'Keep the tense, change only the person. mi\u0101yam becomes mi\u0101yad.' },
    { t: 'listen', fa: 'گفت که فردا می‌آید', tr: 'goft ke fard\u0101 mi\u0101yad', en: 'he said he is coming tomorrow',
      options: ['گفت که فردا می‌آید', 'پرسید که کجا می‌روی', 'گفتم که می‌آیم', 'باید بروم'],
      optionTrs: { 'گفت که فردا می‌آید': 'goft ke fard\u0101 mi\u0101yad', 'پرسید که کجا می‌روی': 'porsid ke koj\u0101 miravi', 'گفتم که می‌آیم': 'goftam ke mi\u0101yam', 'باید بروم': 'b\u0101yad beravam' } },
    { t: 'type', fa: 'گفت که', tr: 'goft ke', en: 'he said that' },
  ],
};



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
      body: 'You know ket\u0101b-e man, the book of me. Persian has a faster version: stick the ending straight onto the noun. ket\u0101bam, my book. One word instead of three, and it is what people actually say.' },
    { t: 'meet', fa: 'کتابم', tr: 'ket\u0101bam', en: 'my book' },
    { t: 'meet', fa: 'کتابت', tr: 'ket\u0101bat', en: 'your book' },
    { t: 'meet', fa: 'کتابش', tr: 'ket\u0101bash', en: 'his book, her book' },
    { t: 'sense', fa: 'کتابم', tr: 'ket\u0101bam', en: 'my book',
      body: 'The endings are -am, -at, -ash for one person, and -em\u0101n, -et\u0101n, -esh\u0101n for more than one. They attach to anything: kh\u0101nam, my house. esmam, my name. m\u0101daram, my mother. You have already been using one without noticing: delam bar\u0101t tang shode, my heart.' },
    { t: 'meet', fa: 'اسمم', tr: 'esmam', en: 'my name' },
    { t: 'meet', fa: 'مادرم', tr: 'm\u0101daram', en: 'my mother' },
    { t: 'gap', before: '', after: 'سارا است', answer: 'اسمم',
      tr: 'esmam S\u0101r\u0101 ast', en: 'My name is Sara',
      options: ['اسمم', 'اسمت', 'اسمش', 'اسم'],
      optionTrs: { 'اسمم': 'esmam, my name', 'اسمت': 'esmat, your name', 'اسمش': 'esmash, his or her name', 'اسم': 'esm, name' },
      why: 'The -am ending is mine. Shorter than esm-e man and far more common in speech.' },
    { t: 'note', title: 'Which one to use',
      body: 'Both are correct. ket\u0101b-e man puts a little weight on the me, so use it when the owner matters: MY book, not yours. ket\u0101bam is the neutral everyday form. Persian speakers switch between them without thinking, and so will you.' },
    { t: 'choose', prompt: 'How would you say her mother?',
      answer: 'مادرش',
      options: ['مادرش', 'مادرم', 'مادرت', 'مادر من'],
      optionTrs: { 'مادرش': 'm\u0101darash', 'مادرم': 'm\u0101daram', 'مادرت': 'm\u0101darat', 'مادر من': 'm\u0101dar-e man' },
      why: 'The -ash ending covers his, her and its. Persian does not mark gender at all.' },
    { t: 'listen', fa: 'اسمم سارا است', tr: 'esmam S\u0101r\u0101 ast', en: 'my name is Sara',
      options: ['اسمم سارا است', 'کتابم اینجاست', 'مادرش معلم است', 'اسمت چیه؟'],
      optionTrs: { 'اسمم سارا است': 'esmam S\u0101r\u0101 ast', 'کتابم اینجاست': 'ket\u0101bam inj\u0101st', 'مادرش معلم است': 'm\u0101darash moallem ast', 'اسمت چیه؟': 'esmat chi-e?' } },
    { t: 'write', fa: 'کتابم', tr: 'ket\u0101bam', en: 'my book' },
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
    { t: 'meet', fa: 'ها', tr: '-h\u0101', en: 'the plural ending' },
    { t: 'sense', fa: 'کتاب‌ها', tr: 'ket\u0101bh\u0101', en: 'books',
      body: 'Add -h\u0101 to anything and it is plural. ket\u0101bh\u0101, books. kh\u0101neh\u0101, houses. There are no irregular plurals to learn, no changing vowels, no exceptions worth worrying about. After English this feels like being handed something for free.' },
    { t: 'meet', fa: 'خانه‌ها', tr: 'kh\u0101neh\u0101', en: 'houses' },
    { t: 'meet', fa: 'بچه‌ها', tr: 'bache-h\u0101', en: 'children' },
    { t: 'note', title: 'The half-space matters',
      body: 'کتاب‌ها is written with a zero-width non-joiner between the noun and the h\u0101, so the letters do not fuse. It is the ن\u06CC\u0645\u200Cفاصله key on the keyboard you have been using. In speech it changes nothing; on the page it is the difference between correct Persian and something that looks wrong.' },
    { t: 'meet', fa: 'آن', tr: '-\u0101n', en: 'the older plural, for people' },
    { t: 'sense', fa: 'دوستان', tr: 'dust\u0101n', en: 'friends',
      body: 'There is a second plural, -\u0101n, used mainly for people and in more formal or literary Persian. dust\u0101n, friends. zan\u0101n, women. mard\u0101n, men. dusth\u0101 is perfectly correct and more casual; dust\u0101n is what you will meet in writing and in speeches.' },
    { t: 'note', title: 'After a number, stay singular',
      body: 'This one catches everyone. Persian does not pluralise after a number: do ket\u0101b, two book. panj kh\u0101ne, five house. The number has already told you there is more than one, so the noun does not repeat the information. English does the same thing in five foot tall.' },
    { t: 'gap', before: 'من سه', after: 'دارم', answer: 'برادر',
      tr: 'man se bar\u0101dar d\u0101ram', en: 'I have three brothers',
      options: ['برادر', 'برادرها', 'برادران', 'برادرم'],
      optionTrs: { 'برادر': 'bar\u0101dar, brother', 'برادرها': 'bar\u0101darh\u0101, brothers', 'برادران': 'bar\u0101dar\u0101n, brothers, formal', 'برادرم': 'bar\u0101daram, my brother' },
      why: 'After a number the noun stays singular. se bar\u0101dar, three brother.' },
    { t: 'choose', prompt: 'Which is the everyday plural of dust, friend?',
      answer: 'دوست‌ها',
      options: ['دوست‌ها', 'دوستان', 'دوستم', 'دوست'],
      optionTrs: { 'دوست‌ها': 'dusth\u0101', 'دوستان': 'dust\u0101n', 'دوستم': 'dustam', 'دوست': 'dust' },
      why: 'Both dusth\u0101 and dust\u0101n mean friends. dusth\u0101 is what you say; dust\u0101n is what you write.' },
    { t: 'listen', fa: 'بچه‌ها کجا هستند؟', tr: 'bache-h\u0101 koj\u0101 hastand?', en: 'where are the children?',
      options: ['بچه‌ها کجا هستند؟', 'کتاب‌ها اینجاست', 'سه برادر دارم', 'دوستان من'],
      optionTrs: { 'بچه‌ها کجا هستند؟': 'bache-h\u0101 koj\u0101 hastand?', 'کتاب‌ها اینجاست': 'ket\u0101bh\u0101 inj\u0101st', 'سه برادر دارم': 'se bar\u0101dar d\u0101ram', 'دوستان من': 'dust\u0101n-e man' } },
    { t: 'write', fa: 'کتاب‌ها', tr: 'ket\u0101bh\u0101', en: 'books' },
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
    { t: 'sentence', fa: 'این از آن بهتر است', tr: 'in az \u0101n behtar ast', en: 'this is better than that', focus: 'از' },
    { t: 'sense', fa: 'از', tr: 'az', en: 'than',
      body: 'Persian uses az, from, where English uses than. This is FROM that better. The thing being compared against comes first, then az, then the comparison. It sounds backwards for a week and then it does not.' },
    { t: 'gap', before: 'تهران از اصفهان', after: 'است', answer: 'بزرگ‌تر',
      tr: 'Tehr\u0101n az Esfah\u0101n bozorgtar ast', en: 'Tehran is bigger than Isfahan',
      options: ['بزرگ‌تر', 'بزرگ', 'بزرگ‌ترین', 'کوچک'],
      optionTrs: { 'بزرگ‌تر': 'bozorgtar, bigger', 'بزرگ': 'bozorg, big', 'بزرگ‌ترین': 'bozorgtarin, biggest', 'کوچک': 'kuchak, small' },
      why: 'Comparing two things takes -tar. -tarin would mean the biggest of all, which needs no az.' },
    { t: 'sentence', fa: 'بهترین دوست من', tr: 'behtarin dust-e man', en: 'my best friend', focus: 'بهترین' },
    { t: 'choose', prompt: 'How do you say the smallest?',
      answer: 'کوچک‌ترین',
      options: ['کوچک‌ترین', 'کوچک‌تر', 'کوچک', 'از کوچک'],
      optionTrs: { 'کوچک‌ترین': 'kuchaktarin', 'کوچک‌تر': 'kuchaktar', 'کوچک': 'kuchak', 'از کوچک': 'az kuchak' },
      why: '-tarin is the most of something. And unlike -tar, it goes before the noun: kuchaktarin kh\u0101ne, the smallest house.' },
    { t: 'listen', fa: 'این از آن بهتر است', tr: 'in az \u0101n behtar ast', en: 'this is better than that',
      options: ['این از آن بهتر است', 'بهترین دوست من', 'تهران بزرگ‌تر است', 'کوچک‌ترین'],
      optionTrs: { 'این از آن بهتر است': 'in az \u0101n behtar ast', 'بهترین دوست من': 'behtarin dust-e man', 'تهران بزرگ‌تر است': 'Tehr\u0101n bozorgtar ast', 'کوچک‌ترین': 'kuchaktarin' } },
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
    { t: 'meet', fa: 'کار', tr: 'k\u0101r', en: 'work, job' },
    { t: 'meet', fa: 'شغل', tr: 'shoghl', en: 'occupation, profession' },
    { t: 'sentence', fa: 'شغلت چیه؟', tr: 'shoghlet chi-e?', en: 'what do you do?', focus: 'شغل' },
    { t: 'meet', fa: 'معلم', tr: 'moallem', en: 'teacher' },
    { t: 'meet', fa: 'دکتر', tr: 'doktor', en: 'doctor' },
    { t: 'meet', fa: 'مهندس', tr: 'mohandes', en: 'engineer' },
    { t: 'note', title: 'Titles are used constantly',
      body: 'Iranians address people by profession far more than English speakers do. Doktor Ahmadi, Mohandes Rez\u0101i, Ost\u0101d for a teacher or master of a craft. Using someone\u2019s title is ordinary respect rather than formality, and dropping it can read as a slight.' },
    { t: 'meet', fa: 'دانشگاه', tr: 'd\u0101neshg\u0101h', en: 'university', literal: 'knowledge-place' },
    { t: 'meet', fa: 'دفتر', tr: 'daftar', en: 'office' },
    { t: 'gap', before: 'من', after: 'هستم', answer: 'معلم',
      tr: 'man moallem hastam', en: 'I am a teacher',
      options: ['معلم', 'دکتر', 'مهندس', 'دانشگاه'],
      optionTrs: { 'معلم': 'moallem, teacher', 'دکتر': 'doktor, doctor', 'مهندس': 'mohandes, engineer', 'دانشگاه': 'd\u0101neshg\u0101h, university' },
      why: 'Persian does not use a for a job: man moallem hastam, I teacher am.' },
    { t: 'meet', fa: 'صبح زود', tr: 'sobh zud', en: 'early morning' },
    { t: 'sentence', fa: 'صبح زود سر کار می‌روم', tr: 'sobh zud sar-e k\u0101r miravam', en: 'I go to work early in the morning', focus: 'کار' },
    { t: 'sense', fa: 'سر کار', tr: 'sar-e k\u0101r', en: 'at work, to work',
      body: 'sar is head, and sar-e k\u0101r is literally at the head of work. Persian uses sar for being at or on something: sar-e miz, at the table. sar-e r\u0101h, on the way. It is one of those small words that turns up everywhere once you notice it.' },
    { t: 'listen', fa: 'شغلت چیه؟', tr: 'shoghlet chi-e?', en: 'what do you do?',
      options: ['شغلت چیه؟', 'کجا کار می‌کنی؟', 'معلم هستم', 'سر کار می‌روم'],
      optionTrs: { 'شغلت چیه؟': 'shoghlet chi-e?', 'کجا کار می‌کنی؟': 'koj\u0101 k\u0101r mikoni?', 'معلم هستم': 'moallem hastam', 'سر کار می‌روم': 'sar-e k\u0101r miravam' } },
    { t: 'write', fa: 'کار', tr: 'k\u0101r', en: 'work' },
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
    { t: 'meet', fa: 'گران', tr: 'ger\u0101n', en: 'expensive' },
    { t: 'meet', fa: 'ارزان', tr: 'arz\u0101n', en: 'cheap' },
    { t: 'sentence', fa: 'خیلی گران است', tr: 'kheyli ger\u0101n ast', en: 'it is very expensive', focus: 'گران' },
    { t: 'meet', fa: 'تخفیف', tr: 'takhfif', en: 'discount' },
    { t: 'sentence', fa: 'تخفیف می‌دهید؟', tr: 'takhfif midahid?', en: 'will you give a discount?', focus: 'تخفیف' },
    { t: 'note', title: 'Bargaining is expected, up to a point',
      body: 'In a bazaar, yes. In a shop with price tags, no. Asking takhfif midahid in a supermarket will get you a blank look; asking it over a carpet is the beginning of a conversation both people expect to have.' },
    { t: 'meet', fa: 'قابل نداره', tr: 'gh\u0101bel nad\u0101re', en: 'please, it is nothing', literal: 'it has no worth' },
    { t: 'note', title: 'The shopkeeper will refuse your money',
      body: 'gh\u0101bel nad\u0101re means it is not worthy of you, take it. They do not mean it. This is taarof at its purest: you insist on paying, they refuse once or twice, and then they tell you the price. Walking out without paying is not an option anyone is offering.' },
    { t: 'gap', before: 'این خیلی', after: 'است', answer: 'گران',
      tr: 'in kheyli ger\u0101n ast', en: 'this is very expensive',
      options: ['گران', 'ارزان', 'تخفیف', 'خوب'],
      optionTrs: { 'گران': 'ger\u0101n, expensive', 'ارزان': 'arz\u0101n, cheap', 'تخفیف': 'takhfif, discount', 'خوب': 'khub, good' },
      why: 'ger\u0101n. And saying it out loud is the standard opening move in a bazaar.' },
    { t: 'choose', prompt: 'The shopkeeper says gh\u0101bel nad\u0101re. What do you do?',
      answer: 'Insist on paying',
      options: ['Insist on paying', 'Thank them and leave', 'Offer half', 'Walk away'],
      why: 'It is taarof. Insist, they will name a price, and everyone has performed the ritual correctly.' },
    { t: 'listen', fa: 'تخفیف می‌دهید؟', tr: 'takhfif midahid?', en: 'will you give a discount?',
      options: ['تخفیف می‌دهید؟', 'خیلی گران است', 'چقدر است؟', 'قابل نداره'],
      optionTrs: { 'تخفیف می‌دهید؟': 'takhfif midahid?', 'خیلی گران است': 'kheyli ger\u0101n ast', 'چقدر است؟': 'cheghadr ast?', 'قابل نداره': 'gh\u0101bel nad\u0101re' } },
    { t: 'write', fa: 'گران', tr: 'ger\u0101n', en: 'expensive' },
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
      body: 'Literally my head does pain. Another compound verb, dard kardan, to hurt, built exactly like k\u0101r kardan. And the possessive ending you just learned is doing the work: sar-am, my head.' },
    { t: 'meet', fa: 'مریض', tr: 'mariz', en: 'ill' },
    { t: 'meet', fa: 'دارو', tr: 'd\u0101ru', en: 'medicine' },
    { t: 'meet', fa: 'داروخانه', tr: 'd\u0101rukh\u0101ne', en: 'pharmacy', literal: 'medicine-house' },
    { t: 'gap', before: 'من', after: 'هستم', answer: 'مریض',
      tr: 'man mariz hastam', en: 'I am ill',
      options: ['مریض', 'دارو', 'درد', 'سر'],
      optionTrs: { 'مریض': 'mariz, ill', 'دارو': 'd\u0101ru, medicine', 'درد': 'dard, pain', 'سر': 'sar, head' },
      why: 'mariz hastam, I am ill. In speech it shortens to marizam.' },
    { t: 'note', title: 'What to say to someone ill',
      body: 'zud khub sho, get well soon. Or the warmer beh sal\u0101mati, to your health. And if someone tells you they are unwell, the expected response is concern followed by an offer of help, not a polite acknowledgement. Persian does not do the English habit of leaving people to it.' },
    { t: 'listen', fa: 'سرم درد می‌کند', tr: 'saram dard mikonad', en: 'my head hurts',
      options: ['سرم درد می‌کند', 'مریض هستم', 'داروخانه کجاست؟', 'دلم درد می‌کند'],
      optionTrs: { 'سرم درد می‌کند': 'saram dard mikonad', 'مریض هستم': 'mariz hastam', 'داروخانه کجاست؟': 'd\u0101rukh\u0101ne koj\u0101st?', 'دلم درد می‌کند': 'delam dard mikone' } },
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
    { t: 'meet', fa: 'قرار', tr: 'ghar\u0101r', en: 'plan, arrangement, date' },
    { t: 'meet', fa: 'قرار گذاشتن', tr: 'ghar\u0101r gozashtan', en: 'to make a plan', literal: 'to place an arrangement' },
    { t: 'sentence', fa: 'فردا قرار داریم', tr: 'fard\u0101 ghar\u0101r d\u0101rim', en: 'we have plans tomorrow', focus: 'قرار' },
    { t: 'meet', fa: 'دعوت', tr: 'davat', en: 'invitation' },
    { t: 'sentence', fa: 'دعوتت می‌کنم', tr: 'davatet mikonam', en: 'I am inviting you', focus: 'دعوت' },
    { t: 'note', title: 'Not every invitation is one',
      body: 'This is the hardest thing about Persian social life. bi\u0101 kh\u0101ne-ye m\u0101, come to our house, may be a genuine invitation or pure courtesy. The test is repetition and specificity: a real invitation comes back a second time and names a day. A polite one stays vague and is never mentioned again. Iranians read this instantly and nobody teaches it.' },
    { t: 'meet', fa: 'کی؟', tr: 'key?', en: 'when?' },
    { t: 'meet', fa: 'ساعت چند؟', tr: 's\u0101at chand?', en: 'what time?' },
    { t: 'sense', fa: 'ساعت چند؟', tr: 's\u0101at chand?', en: 'what time?',
      body: 's\u0101at is both hour and clock and watch. s\u0101at chand is literally hour how-many. And s\u0101at panj is five o\u2019clock. If you want to test whether an invitation is real, this is the question to ask: a genuine one produces an answer.' },
    { t: 'gap', before: 'فردا ساعت', after: 'می‌بینمت', answer: 'پنج',
      tr: 'fard\u0101 s\u0101at panj mibinamet', en: 'I will see you tomorrow at five',
      options: ['پنج', 'قرار', 'دعوت', 'کی'],
      optionTrs: { 'پنج': 'panj, five', 'قرار': 'ghar\u0101r, plan', 'دعوت': 'davat, invitation', 'کی': 'key, when' },
      why: 's\u0101at panj, five o\u2019clock. And mibinamet, I see you, with the object ending stuck on the end.' },
    { t: 'choose', prompt: 'Someone says come to our house sometime, and never mentions it again. What was it?',
      answer: 'Politeness, not a plan',
      options: ['Politeness, not a plan', 'A firm invitation', 'A request for an invitation', 'A refusal'],
      why: 'Real invitations repeat and name a time. This one was taarof, and turning up would be a mistake.' },
    { t: 'listen', fa: 'فردا قرار داریم', tr: 'fard\u0101 ghar\u0101r d\u0101rim', en: 'we have plans tomorrow',
      options: ['فردا قرار داریم', 'دعوتت می‌کنم', 'ساعت چند؟', 'کی می‌آیی؟'],
      optionTrs: { 'فردا قرار داریم': 'fard\u0101 ghar\u0101r d\u0101rim', 'دعوتت می‌کنم': 'davatet mikonam', 'ساعت چند؟': 's\u0101at chand?', 'کی می‌آیی؟': 'key mi\u0101yi?' } },
    { t: 'write', fa: 'قرار', tr: 'ghar\u0101r', en: 'plan' },
  ],
};


export const UNITS: Unit[] = [
  {
    key: 'letters',
    roman: '0',
    title: 'Reading',
    titleFa: 'خواندن',
    blurb: 'Joining letters into words, and the vowels Persian leaves out.',
    level: 'beginner',
    lessons: [reading],
  },
  {
    key: 'script',
    roman: '0',
    title: 'The script, letter by letter',
    titleFa: 'خط',
    blurb: 'The vowels Persian hides, and the letters one at a time.',
    level: 'beginner',
    lessons: [vowels, lettersOne, lettersTwo, lettersThree],
  },
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
    key: 'table',
    roman: 'IV',
    title: 'The table',
    titleFa: 'سفره',
    blurb: 'Food, and the manners that come with it.',
    level: 'beginner',
    lessons: [tableWords, tableManners],
  },
  {
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
    lessons: [describing, colours, moreDescribing],
  },
  {
    key: 'time',
    roman: 'VII',
    title: 'Time and numbers',
    titleFa: 'زمان و شمارش',
    blurb: 'Today, tomorrow, counting, age and price.',
    level: 'elementary',
    lessons: [timeWords, numbersOne, numbersUse],
  },
  {
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
    lessons: [feelings, emotions],
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
  {
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
  {
    key: 'past',
    roman: 'XV',
    title: 'The past',
    titleFa: 'گذشته',
    blurb: 'What happened, and what used to happen.',
    level: 'intermediate',
    lessons: [pastTense],
  },
  {
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
  {
    key: 'formality',
    roman: 'XVI',
    title: 'Formality',
    titleFa: 'تو و شما',
    blurb: 'Choosing how close to stand, in every sentence.',
    level: 'advanced',
    lessons: [formality],
  },
  {
    key: 'joining',
    roman: 'XVII',
    title: 'Longer sentences',
    titleFa: 'جمله‌سازی',
    blurb: 'Joining thoughts with ke, vali, chun and agar.',
    level: 'advanced',
    lessons: [joining],
  },
  {
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
