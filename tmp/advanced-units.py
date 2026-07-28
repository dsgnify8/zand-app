# -*- coding: utf-8 -*-
# Advanced tier: the past tense, the shomā/to split, and joining clauses
# into real sentences. Also threads gap-fills into existing lessons.

p = "constants/curriculum.ts"
s = open(p).read()

if "key: 'past'" in s:
    print("ABORT: already applied"); raise SystemExit

CODE = '''
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
      body: 'raft-am, raft-i, raft. Exactly the endings from d\\u0101ram and hastam. And notice the third person: raft, with nothing on the end at all. The bare past stem is already he went. Persian could not have made this simpler if it tried.' },
    { t: 'meet', fa: 'خوردم', tr: 'khordam', en: 'I ate' },
    { t: 'meet', fa: 'دیدم', tr: 'didam', en: 'I saw' },
    { t: 'meet', fa: 'گفتم', tr: 'goftam', en: 'I said' },
    { t: 'gap', before: 'دیروز به بازار', after: '', answer: 'رفتم',
      tr: 'diruz be b\\u0101z\\u0101r raftam', en: 'Yesterday I went to the bazaar',
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
    { t: 'build', fa: 'دیروز نان خوردم', tr: 'diruz n\\u0101n khordam', en: 'Yesterday I ate bread',
      parts: ['دیروز', 'نان', 'خوردم', 'می‌خورم'],
      partTrs: { 'دیروز': 'diruz', 'نان': 'n\\u0101n', 'خوردم': 'khordam', 'می‌خورم': 'mikhoram' } },
    { t: 'gap', before: 'او به من', after: 'که فردا می‌آید', answer: 'گفت',
      tr: 'u be man goft ke fard\\u0101 mi\\u0101yad', en: 'He told me that he is coming tomorrow',
      options: ['گفت', 'گفتم', 'می‌گویم', 'گفتی'],
      optionTrs: { 'گفت': 'goft, he said', 'گفتم': 'goftam, I said', 'می‌گویم': 'miguyam, I say', 'گفتی': 'gofti, you said' },
      why: 'u is he, and the third person past takes no ending at all: goft.' },
    { t: 'listen', fa: 'دیروز به بازار رفتم', tr: 'diruz be b\\u0101z\\u0101r raftam', en: 'Yesterday I went to the bazaar',
      options: ['دیروز به بازار رفتم', 'فردا به بازار می‌روم', 'نان خوردم', 'او گفت'],
      optionTrs: { 'دیروز به بازار رفتم': 'diruz be b\\u0101z\\u0101r raftam', 'فردا به بازار می‌روم': 'fard\\u0101 be b\\u0101z\\u0101r miravam', 'نان خوردم': 'n\\u0101n khordam', 'او گفت': 'u goft' } },
    { t: 'write', fa: 'رفتم', tr: 'raftam', en: 'I went' },
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
      body: 'There are two words for you, and you cannot avoid picking one. to is for friends, children, family and anyone younger. shom\\u0101 is for elders, strangers, teachers, anyone senior, and anyone you want to hold at a respectful distance. Getting it wrong is not a grammar mistake, it is a social one, and it is the thing heritage speakers most often stumble on.' },
    { t: 'meet', fa: 'تو', tr: 'to', en: 'you, familiar' },
    { t: 'meet', fa: 'شما', tr: 'shom\\u0101', en: 'you, respectful' },
    { t: 'sense', fa: 'شما', tr: 'shom\\u0101', en: 'you, respectful',
      body: 'shom\\u0101 is grammatically plural, and takes plural verbs even when you are talking to one person. shom\\u0101 chetorid, how are you. This is the same instinct as French vous or German Sie: you address one respected person as though they were several.' },
    { t: 'meet', fa: 'چطوری', tr: 'chetori', en: 'how are you, familiar' },
    { t: 'meet', fa: 'چطورید', tr: 'chetorid', en: 'how are you, respectful' },
    { t: 'gap', before: 'سلام آقای احمدی،', after: 'خوب هستید؟',
      answer: 'شما',
      tr: 'sal\\u0101m \\u0101gh\\u0101-ye Ahmadi, shom\\u0101 khub hastid?',
      en: 'Hello Mr Ahmadi, are you well?',
      options: ['شما', 'تو', 'من', 'او'],
      optionTrs: { 'شما': 'shom\\u0101, you respectful', 'تو': 'to, you familiar', 'من': 'man, I', 'او': 'u, he or she' },
      why: 'You are using his surname and a title, so shom\\u0101 is the only possible choice. Using to here would be startling.' },
    { t: 'note', title: 'When in doubt, use shomā',
      body: 'Over-formality is a small awkwardness. Under-formality is a real one. An older Iranian will usually invite you to switch by saying to as if we are family, and until they do, stay with shom\\u0101. The exception is children and close friends, where shom\\u0101 sounds cold or sarcastic.' },
    { t: 'meet', fa: 'بفرمایید', tr: 'befarm\\u0101yid', en: 'please, go ahead, help yourself' },
    { t: 'sense', fa: 'بفرمایید', tr: 'befarm\\u0101yid', en: 'please, go ahead',
      body: 'The most polite word in daily Persian, and it does everything: come in, sit down, take some, after you, go ahead and speak. It is the respectful form of a verb meaning to command, so you are literally inviting the other person to give the orders. You will hear it fifty times a day in Iran.' },
    { t: 'choose', prompt: 'You are meeting your friend\\u2019s grandmother for the first time. Which do you use?',
      answer: 'شما',
      options: ['شما', 'تو', 'either is fine', 'neither'],
      why: 'shom\\u0101, without hesitation. She may well tell you to use to within the hour, and then you switch.' },
    { t: 'listen', fa: 'بفرمایید', tr: 'befarm\\u0101yid', en: 'please, go ahead',
      options: ['بفرمایید', 'چطورید', 'شما', 'خوش آمدید'],
      optionTrs: { 'بفرمایید': 'befarm\\u0101yid', 'چطورید': 'chetorid', 'شما': 'shom\\u0101', 'خوش آمدید': 'khosh \\u0101madid' } },
    { t: 'write', fa: 'شما', tr: 'shom\\u0101', en: 'you, respectful' },
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
    { t: 'sentence', fa: 'گفتم که می‌آیم', tr: 'goftam ke mi\\u0101yam', en: 'I said that I am coming', focus: 'که' },
    { t: 'meet', fa: 'ولی', tr: 'vali', en: 'but' },
    { t: 'meet', fa: 'چون', tr: 'chun', en: 'because' },
    { t: 'meet', fa: 'اگر', tr: 'agar', en: 'if' },
    { t: 'gap', before: 'می‌خواستم بیایم', after: 'وقت نداشتم', answer: 'ولی',
      tr: 'mikh\\u0101stam biy\\u0101yam vali vaght nad\\u0101shtam',
      en: 'I wanted to come but I did not have time',
      options: ['ولی', 'چون', 'اگر', 'که'],
      optionTrs: { 'ولی': 'vali, but', 'چون': 'chun, because', 'اگر': 'agar, if', 'که': 'ke, that' },
      why: 'Two things in tension: wanting to come, and not having time. vali holds them against each other.' },
    { t: 'gap', before: 'نیامدم', after: 'مریض بودم', answer: 'چون',
      tr: 'nay\\u0101madam chun mariz budam',
      en: 'I did not come because I was ill',
      options: ['چون', 'ولی', 'اگر', 'و'],
      optionTrs: { 'چون': 'chun, because', 'ولی': 'vali, but', 'اگر': 'agar, if', 'و': 'va, and' },
      why: 'The second half explains the first, so chun. And notice nay\\u0101madam: the negative na- on a past verb.' },
    { t: 'note', title: 'Persian stacks clauses happily',
      body: 'Written Persian, especially older or literary Persian, runs sentences much longer than English tolerates, joined by ke after ke. This is not bad style, it is the shape of the language. When you read something that seems to go on forever, look for the ke and you will find the joints.' },
    { t: 'sentence', fa: 'اگر وقت داشته باشم، فردا می‌آیم',
      tr: 'agar vaght d\\u0101shte b\\u0101sham, fard\\u0101 mi\\u0101yam',
      en: 'If I have time, I will come tomorrow', focus: 'اگر' },
    { t: 'note', title: 'agar wants the subjunctive',
      body: 'After agar, if, Persian uses a mood for things that have not happened yet: d\\u0101shte b\\u0101sham rather than d\\u0101ram. English does something similar in if I were you. It is the one place Persian grammar gets genuinely fiddly, and recognising it in reading matters more than producing it perfectly.' },
    { t: 'build', fa: 'گفتم که می‌آیم', tr: 'goftam ke mi\\u0101yam', en: 'I said that I am coming',
      parts: ['گفتم', 'که', 'می‌آیم', 'ولی'],
      partTrs: { 'گفتم': 'goftam', 'که': 'ke', 'می‌آیم': 'mi\\u0101yam', 'ولی': 'vali' } },
    { t: 'listen', fa: 'می‌خواستم بیایم ولی وقت نداشتم',
      tr: 'mikh\\u0101stam biy\\u0101yam vali vaght nad\\u0101shtam',
      en: 'I wanted to come but I did not have time',
      options: ['می‌خواستم بیایم ولی وقت نداشتم', 'نیامدم چون مریض بودم', 'گفتم که می‌آیم', 'اگر وقت داشته باشم'],
      optionTrs: {
        'می‌خواستم بیایم ولی وقت نداشتم': 'mikh\\u0101stam biy\\u0101yam vali vaght nad\\u0101shtam',
        'نیامدم چون مریض بودم': 'nay\\u0101madam chun mariz budam',
        'گفتم که می‌آیم': 'goftam ke mi\\u0101yam',
        'اگر وقت داشته باشم': 'agar vaght d\\u0101shte b\\u0101sham' } },
    { t: 'write', fa: 'ولی', tr: 'vali', en: 'but' },
  ],
};

'''

ENTRIES = '''  {
    key: 'past',
    roman: 'XV',
    title: 'The past',
    titleFa: 'گذشته',
    blurb: 'What happened, and what used to happen.',
    level: 'intermediate',
    lessons: [pastTense],
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
'''

anchor = "export const UNITS: Unit[] = ["
if anchor not in s:
    print("ABORT: UNITS not found"); raise SystemExit
s = s.replace(anchor, CODE.replace("\\\\u", "\\u") + "\n" + anchor)

mark = "    lessons: [colloquial],\n  },\n"
i = s.find(mark)
if i == -1:
    print("ABORT: colloquial entry not found"); raise SystemExit
ins = i + len(mark)
s = s[:ins] + ENTRIES + s[ins:]

open(p, "w").write(s)
print("added:", "key: 'past'" in s, "key: 'formality'" in s, "key: 'joining'" in s)
