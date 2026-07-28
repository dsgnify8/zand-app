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
