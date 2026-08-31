// The learning journey, as an ordered map of steps.
// A step is either a lesson from the curriculum, or one of the tools
// scoped to that point in the route. Nothing is locked: the order is a
// recommendation, and every node is tappable from the first day.

export type StepKind = 'lesson' | 'alphabet' | 'writing' | 'flashcards' | 'review' | 'quiz';

export type JourneyStep = {
  key: string;
  kind: StepKind;
  title: string;
  titleFa?: string;
  sub: string;
  route: string;
  // lessons carry these so progress can be looked up
  unit?: string;
  lesson?: string;
};

export type Stage = {
  key: string;
  level?: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  roman: string;
  title: string;
  titleFa: string;
  blurb: string;
  steps: JourneyStep[];
};

export const STAGES: Stage[] = [
  {
    key: 'letters',
    level: 'beginner',
    roman: 'I',
    title: 'The letters',
    titleFa: 'حروف',
    blurb: 'Nothing else works until these do.',
    steps: [
      { key: 'alphabet', kind: 'alphabet', title: 'The alphabet', titleFa: 'الفبا',
        sub: 'Thirty two letters, their shapes and sounds', route: '/learn/alphabet?step=alphabet' },
      { key: 'writing', kind: 'writing', title: 'Writing them', titleFa: 'نوشتن',
        sub: 'Each letter changes shape by where it sits', route: '/learn/writing?step=writing' },
      { key: 'vowels', kind: 'lesson', title: 'The vowels you cannot see', titleFa: 'صداها',
        sub: 'Three written, three invisible', route: '/learn/lesson?unit=script&lesson=vowels&step=vowels',
        unit: 'script', lesson: 'vowels' },
      { key: 'letters-one', kind: 'lesson', title: 'che, khe, heh', titleFa: 'چ خ ه',
        sub: 'Including the sound English does not have', route: '/learn/lesson?unit=script&lesson=letters-one&step=letters-one',
        unit: 'script', lesson: 'letters-one' },
      { key: 'letters-two', kind: 'lesson', title: 'dal and zal', titleFa: 'د ذ',
        sub: 'And the seven letters that will not join', route: '/learn/lesson?unit=script&lesson=letters-two&step=letters-two',
        unit: 'script', lesson: 'letters-two' },
      { key: 'letters-three', kind: 'lesson', title: 'noon, shin, feh', titleFa: 'ن ش ف',
        sub: 'Enough to read what you have learned', route: '/learn/lesson?unit=script&lesson=letters-three&step=letters-three',
        unit: 'script', lesson: 'letters-three' },
      { key: 'reading', kind: 'lesson', title: 'Reading your first words', titleFa: 'خواندن',
        sub: 'Letters joined up, and the vowels nobody writes', route: '/learn/lesson?unit=letters&lesson=reading&step=reading',
        unit: 'letters', lesson: 'reading' },
    ],
  },
  {
    key: 'first-words',
    level: 'beginner',
    roman: 'II',
    title: 'First words',
    titleFa: 'کلمه‌های اول',
    blurb: 'Enough to greet someone and say who you are.',
    steps: [
      { key: 'greetings', kind: 'lesson', title: 'Hello, and how are you', titleFa: 'سلام',
        sub: 'The exchange that opens everything', route: '/learn/lesson?unit=first-words&lesson=greetings&step=greetings',
        unit: 'first-words', lesson: 'greetings' },
      { key: 'introductions', kind: 'lesson', title: 'Saying who you are', titleFa: 'معرفی',
        sub: 'Your name, and asking for theirs', route: '/learn/lesson?unit=first-words&lesson=introductions&step=introductions',
        unit: 'first-words', lesson: 'introductions' },
      { key: 'politeness', kind: 'lesson', title: 'Please and sorry', titleFa: 'ادب',
        sub: 'The words that soften everything', route: '/learn/lesson?unit=first-words&lesson=politeness&step=politeness',
        unit: 'first-words', lesson: 'politeness' },
      { key: 'cards-1', kind: 'flashcards', title: 'Drill these words', titleFa: 'تمرین',
        sub: 'Everything from stage two, one card at a time', route: '/learn/cards?stage=first-words&step=cards-1' },
    ],
  },
  {
    key: 'family',
    level: 'beginner',
    roman: 'III',
    title: 'People and sentences',
    titleFa: 'خانواده',
    blurb: 'Family, and how Persian puts a sentence together.',
    steps: [
      { key: 'family-words', kind: 'lesson', title: 'Mother, father, the rest', titleFa: 'خانواده',
        sub: 'The words you will use most', route: '/learn/lesson?unit=family&lesson=family-words&step=family-words',
        unit: 'family', lesson: 'family-words' },
      { key: 'family-talk', kind: 'lesson', title: 'Talking about them', titleFa: 'حرف زدن',
        sub: 'This is my mother. I have one sister.', route: '/learn/lesson?unit=family&lesson=family-talk&step=family-talk',
        unit: 'family', lesson: 'family-talk' },
      { key: 'blanks-1', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'Fill the gap from what you have learned', route: '/learn/blanks?stage=family&step=blanks-1' },
      { key: 'review-1', kind: 'review', title: 'Review', titleFa: 'مرور',
        sub: 'Ten words from everything so far', route: '/learn/review?step=review-1' },
    ],
  },
  {
    key: 'table',
    level: 'beginner',
    roman: 'IV',
    title: 'The table',
    titleFa: 'سفره',
    blurb: 'Food, and the manners that come with it.',
    steps: [
      { key: 'table-words', kind: 'lesson', title: 'Bread, water, tea', titleFa: 'نان و آب',
        sub: 'What is always on the table', route: '/learn/lesson?unit=table&lesson=table-words&step=table-words',
        unit: 'table', lesson: 'table-words' },
      { key: 'table-manners', kind: 'lesson', title: 'Offering and refusing', titleFa: 'تعارف',
        sub: 'The ritual nobody explains', route: '/learn/lesson?unit=table&lesson=table-manners&step=table-manners',
        unit: 'table', lesson: 'table-manners' },
      { key: 'cards-2', kind: 'flashcards', title: 'Drill the table', titleFa: 'تمرین',
        sub: 'Everything from stage four', route: '/learn/cards?stage=table&step=cards-2' },
      { key: 'blanks-2', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'The table, without the words in front of you', route: '/learn/blanks?stage=table&step=blanks-2' },
    ],
  },
  {
    key: 'verbs',
    level: 'elementary',
    roman: 'V',
    title: 'Verbs',
    titleFa: 'فعل‌ها',
    blurb: 'Learn six endings and every verb opens at once.',
    steps: [
      { key: 'verbs-being', kind: 'lesson', title: 'To be, and to have', titleFa: 'بودن',
        sub: 'The two verbs holding up every sentence', route: '/learn/lesson?unit=verbs&lesson=verbs-being&step=verbs-being',
        unit: 'verbs', lesson: 'verbs-being' },
      { key: 'verbs-doing', kind: 'lesson', title: 'Going, eating, wanting', titleFa: 'فعل‌ها',
        sub: 'Real verbs, and the mi- that makes them present', route: '/learn/lesson?unit=verbs&lesson=verbs-doing&step=verbs-doing',
        unit: 'verbs', lesson: 'verbs-doing' },
      { key: 'cards-3', kind: 'flashcards', title: 'Drill the verbs', titleFa: 'تمرین',
        sub: 'Every verb form from this stage', route: '/learn/cards?stage=verbs&step=cards-3' },
      { key: 'blanks-3', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'Put the right verb in the gap', route: '/learn/blanks?stage=verbs&step=blanks-3' },
    ],
  },
  {
    key: 'describing',
    level: 'elementary',
    roman: 'VI',
    title: 'Describing things',
    titleFa: 'صفت‌ها',
    blurb: 'Good, big, beautiful, and where they sit.',
    steps: [
      { key: 'describing', kind: 'lesson', title: 'Good, big, beautiful', titleFa: 'صفت‌ها',
        sub: 'Adjectives, and the order Persian wants', route: '/learn/lesson?unit=describing&lesson=describing&step=describing',
        unit: 'describing', lesson: 'describing' },
      { key: 'colours', kind: 'lesson', title: 'Colours', titleFa: 'رنگ‌ها',
        sub: 'And the ones that mean more than a colour', route: '/learn/lesson?unit=describing&lesson=colours&step=colours',
        unit: 'describing', lesson: 'colours' },
      { key: 'more-describing', kind: 'lesson', title: 'Hot, cold, near, far', titleFa: 'بیشتر',
        sub: 'The adjectives you need every day', route: '/learn/lesson?unit=describing&lesson=more-describing&step=more-describing',
        unit: 'describing', lesson: 'more-describing' },
      { key: 'review-2', kind: 'review', title: 'Review', titleFa: 'مرور',
        sub: 'Everything you have met so far', route: '/learn/review?step=review-2' },
    ],
  },
  {
    key: 'time',
    level: 'elementary',
    roman: 'VII',
    title: 'Time and numbers',
    titleFa: 'زمان و شمارش',
    blurb: 'Today, tomorrow, and the year that starts in spring.',
    steps: [
      { key: 'time-words', kind: 'lesson', title: 'Today, tomorrow, yesterday', titleFa: 'زمان',
        sub: 'Placing things in time', route: '/learn/lesson?unit=time&lesson=time-words&step=time-words',
        unit: 'time', lesson: 'time-words' },
      { key: 'numbers-one', kind: 'lesson', title: 'One to ten', titleFa: 'شمارش',
        sub: 'Counting, and the Persian numerals', route: '/learn/lesson?unit=time&lesson=numbers-one&step=numbers-one',
        unit: 'time', lesson: 'numbers-one' },
      { key: 'numbers-use', kind: 'lesson', title: 'Age and price', titleFa: 'چند',
        sub: 'How old are you, how much is it', route: '/learn/lesson?unit=time&lesson=numbers-use&step=numbers-use',
        unit: 'time', lesson: 'numbers-use' },
      { key: 'cards-4', kind: 'flashcards', title: 'Drill time words', titleFa: 'تمرین',
        sub: 'Everything from this stage', route: '/learn/cards?stage=time&step=cards-4' },
    ],
  },
  {
    key: 'places',
    level: 'elementary',
    roman: 'VIII',
    title: 'Places',
    titleFa: 'جاها',
    blurb: 'Asking where something is, and understanding the answer.',
    steps: [
      { key: 'places', kind: 'lesson', title: 'Where things are', titleFa: 'جاها',
        sub: 'Street, city, bazaar, here and there', route: '/learn/lesson?unit=places&lesson=places&step=places',
        unit: 'places', lesson: 'places' },
      { key: 'blanks-4', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'Places, without the words in front of you', route: '/learn/blanks?stage=places&step=blanks-4' },
    ],
  },
  {
    key: 'feelings',
    level: 'intermediate',
    roman: 'IX',
    title: 'Feeling',
    titleFa: 'دل',
    blurb: 'One small word carries almost every emotion in Persian.',
    steps: [
      { key: 'feelings', kind: 'lesson', title: 'The heart does the work', titleFa: 'دل',
        sub: 'del, and everything built on it', route: '/learn/lesson?unit=feelings&lesson=feelings&step=feelings',
        unit: 'feelings', lesson: 'feelings' },
      { key: 'emotions', kind: 'lesson', title: 'Calm, angry, and under it', titleFa: 'حال‌ها',
        sub: 'The states Persian names and English cannot', route: '/learn/lesson?unit=feelings&lesson=emotions&step=emotions',
        unit: 'feelings', lesson: 'emotions' },
      { key: 'cards-5', kind: 'flashcards', title: 'Drill these', titleFa: 'تمرین',
        sub: 'The words of feeling', route: '/learn/cards?stage=feelings&step=cards-5' },
    ],
  },
  {
    key: 'conversation',
    level: 'intermediate',
    roman: 'X',
    title: 'Conversation',
    titleFa: 'گفت‌وگو',
    blurb: 'Staying afloat when you are out of your depth.',
    steps: [
      { key: 'conversation', kind: 'lesson', title: 'Keeping it going', titleFa: 'گفت‌وگو',
        sub: 'Not understanding, asking again, buying time', route: '/learn/lesson?unit=conversation&lesson=conversation&step=conversation',
        unit: 'conversation', lesson: 'conversation' },
      { key: 'review-3', kind: 'review', title: 'Review everything', titleFa: 'مرور',
        sub: 'Every word you have met', route: '/learn/review?step=review-3' },
    ],
  },
  {
    key: 'questions',
    level: 'elementary',
    roman: 'XI',
    title: 'Asking things',
    titleFa: 'پرسیدن',
    blurb: 'Five words that turn a statement into a question.',
    steps: [
      { key: 'questions', kind: 'lesson', title: 'When, where, what, why, how', titleFa: 'پرسیدن',
        sub: 'And why Persian asks at the end', route: '/learn/lesson?unit=questions&lesson=questions&step=questions',
        unit: 'questions', lesson: 'questions' },
      { key: 'blanks-5', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'Put the right question word in', route: '/learn/blanks?stage=questions&step=blanks-5' },
    ],
  },
  {
    key: 'transport',
    level: 'elementary',
    roman: 'XII',
    title: 'Getting around',
    titleFa: 'رفت و آمد',
    blurb: 'Taxis, tickets, and telling a driver where to stop.',
    steps: [
      { key: 'transport', kind: 'lesson', title: 'Getting around', titleFa: 'رفت و آمد',
        sub: 'What to say in a Tehran taxi', route: '/learn/lesson?unit=transport&lesson=transport&step=transport',
        unit: 'transport', lesson: 'transport' },
      { key: 'cards-6', kind: 'flashcards', title: 'Drill these', titleFa: 'تمرین',
        sub: 'Everything from getting around', route: '/learn/cards?stage=transport&step=cards-6' },
    ],
  },
  {
    key: 'seasons',
    level: 'elementary',
    roman: 'XIII',
    title: 'The year',
    titleFa: 'سال',
    blurb: 'Seasons, months, and a calendar that starts in spring.',
    steps: [
      { key: 'seasons', kind: 'lesson', title: 'Seasons and months', titleFa: 'فصل‌ها',
        sub: 'The months are Zoroastrian, and still in use', route: '/learn/lesson?unit=seasons&lesson=seasons&step=seasons',
        unit: 'seasons', lesson: 'seasons' },
    ],
  },
  {
    key: 'colloquial',
    level: 'intermediate',
    roman: 'XIV',
    title: 'Written and spoken',
    titleFa: 'رسمی و محاوره‌ای',
    blurb: 'What books say, and what people actually say.',
    steps: [
      { key: 'colloquial', kind: 'lesson', title: 'The two Persians', titleFa: 'محاوره‌ای',
        sub: 'mitavānam on the page, mitunam in the room', route: '/learn/lesson?unit=colloquial&lesson=colloquial&step=colloquial',
        unit: 'colloquial', lesson: 'colloquial' },
      { key: 'review-4', kind: 'review', title: 'Review everything', titleFa: 'مرور',
        sub: 'Every word you have met', route: '/learn/review?step=review-4' },
    ],
  },
  {
    key: 'past',
    level: 'intermediate',
    roman: 'XV',
    title: 'The past',
    titleFa: 'گذشته',
    blurb: 'Easier than the present, and it lets you tell a story.',
    steps: [
      { key: 'past', kind: 'lesson', title: 'What happened', titleFa: 'گذشته',
        sub: 'Same endings, new stem', route: '/learn/lesson?unit=past&lesson=past&step=past',
        unit: 'past', lesson: 'past' },
      { key: 'blanks-6', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'Past tense, in context', route: '/learn/blanks?stage=past&step=blanks-6' },
    ],
  },
  {
    key: 'possessives',
    level: 'intermediate',
    roman: 'XXIII',
    title: 'My, your, his',
    titleFa: 'ضمیر ملکی',
    blurb: 'Endings that replace a whole word.',
    steps: [
      { key: 'possessives', kind: 'lesson', title: 'My, your, his', titleFa: 'ضمیر ملکی',
        sub: 'ketābam instead of ketāb-e man', route: '/learn/lesson?unit=possessives&lesson=possessives&step=possessives',
        unit: 'possessives', lesson: 'possessives' },
      { key: 'plurals', kind: 'lesson', title: 'More than one', titleFa: 'جمع',
        sub: 'One ending does almost all of it', route: '/learn/lesson?unit=possessives&lesson=plurals&step=plurals',
        unit: 'possessives', lesson: 'plurals' },
      { key: 'blanks-7', kind: 'quiz', title: 'Finish the sentence', titleFa: 'جای خالی',
        sub: 'Possessives and plurals in context', route: '/learn/blanks?stage=possessives&step=blanks-7' },
    ],
  },
  {
    key: 'comparisons',
    level: 'intermediate',
    roman: 'XXIV',
    title: 'Comparing things',
    titleFa: 'مقایسه',
    blurb: 'Two endings, and every adjective triples.',
    steps: [
      { key: 'comparisons', kind: 'lesson', title: 'Bigger, smaller, best', titleFa: 'مقایسه',
        sub: '-tar, -tarin, and az for than', route: '/learn/lesson?unit=comparisons&lesson=comparisons&step=comparisons',
        unit: 'comparisons', lesson: 'comparisons' },
    ],
  },
  {
    key: 'work',
    level: 'intermediate',
    roman: 'XXV',
    title: 'Work and the day',
    titleFa: 'کار و روز',
    blurb: 'What you do, and when you do it.',
    steps: [
      { key: 'work', kind: 'lesson', title: 'Work and the shape of a day', titleFa: 'کار',
        sub: 'Jobs, titles, and sar-e kār', route: '/learn/lesson?unit=work&lesson=work&step=work',
        unit: 'work', lesson: 'work' },
      { key: 'cards-8', kind: 'flashcards', title: 'Drill these', titleFa: 'تمرین',
        sub: 'Everything from work', route: '/learn/cards?stage=work&step=cards-8' },
    ],
  },
  {
    key: 'shopping',
    level: 'intermediate',
    roman: 'XXVI',
    title: 'Buying things',
    titleFa: 'خرید',
    blurb: 'Prices, bargaining, and refusing your money.',
    steps: [
      { key: 'shopping', kind: 'lesson', title: 'Buying things', titleFa: 'خرید',
        sub: 'And when bargaining is expected', route: '/learn/lesson?unit=shopping&lesson=shopping&step=shopping',
        unit: 'shopping', lesson: 'shopping' },
    ],
  },
  {
    key: 'health',
    level: 'intermediate',
    roman: 'XXVII',
    title: 'When something hurts',
    titleFa: 'سلامتی',
    blurb: 'The body, and saying what is wrong.',
    steps: [
      { key: 'health', kind: 'lesson', title: 'When something hurts', titleFa: 'سلامتی',
        sub: 'saram dard mikonad', route: '/learn/lesson?unit=health&lesson=health&step=health',
        unit: 'health', lesson: 'health' },
    ],
  },
  {
    key: 'plans',
    level: 'intermediate',
    roman: 'XXVIII',
    title: 'Making plans',
    titleFa: 'قرار',
    blurb: 'Telling a real invitation from a polite one.',
    steps: [
      { key: 'plans', kind: 'lesson', title: 'Making plans', titleFa: 'قرار',
        sub: 'The thing nobody explains about invitations', route: '/learn/lesson?unit=plans&lesson=plans&step=plans',
        unit: 'plans', lesson: 'plans' },
      { key: 'review-7', kind: 'review', title: 'Review everything', titleFa: 'مرور',
        sub: 'Every word you have met', route: '/learn/review?step=review-7' },
    ],
  },
  {
    key: 'formality',
    level: 'advanced',
    roman: 'XVI',
    title: 'Formality',
    titleFa: 'تو و شما',
    blurb: 'The choice you cannot avoid making.',
    steps: [
      { key: 'formality', kind: 'lesson', title: 'to and shomā', titleFa: 'تو و شما',
        sub: 'Getting it wrong is social, not grammatical', route: '/learn/lesson?unit=formality&lesson=formality&step=formality',
        unit: 'formality', lesson: 'formality' },
    ],
  },
  {
    key: 'joining',
    level: 'advanced',
    roman: 'XVII',
    title: 'Longer sentences',
    titleFa: 'جمله‌سازی',
    blurb: 'Joining two thoughts into one.',
    steps: [
      { key: 'joining', kind: 'lesson', title: 'Making longer sentences', titleFa: 'جمله‌سازی',
        sub: 'ke, vali, chun, agar', route: '/learn/lesson?unit=joining&lesson=joining&step=joining',
        unit: 'joining', lesson: 'joining' },
      { key: 'read-1', kind: 'lesson', title: 'Read something real', titleFa: 'خواندن',
        sub: 'Whole texts, with every word one tap away', route: '/learn/read?step=read-1' },
      { key: 'review-5', kind: 'review', title: 'Review everything', titleFa: 'مرور',
        sub: 'Every word you have met', route: '/learn/review?step=review-5' },
    ],
  },
  {
    key: 'compounds',
    level: 'advanced',
    roman: 'XVIII',
    title: 'How verbs are built',
    titleFa: 'فعل مرکب',
    blurb: 'A handful of helpers, and thousands of verbs.',
    steps: [
      { key: 'compounds', kind: 'lesson', title: 'How Persian builds verbs', titleFa: 'فعل مرکب',
        sub: 'kardan, shodan, zadan, dāshtan', route: '/learn/lesson?unit=compounds&lesson=compounds&step=compounds',
        unit: 'compounds', lesson: 'compounds' },
      { key: 'cards-7', kind: 'flashcards', title: 'Drill the compounds', titleFa: 'تمرین',
        sub: 'Every compound from this chapter', route: '/learn/cards?stage=compounds&step=cards-7' },
    ],
  },
  {
    key: 'ra',
    level: 'advanced',
    roman: 'XIX',
    title: 'The object marker',
    titleFa: 'را',
    blurb: 'Two letters that tell you what a sentence is about.',
    steps: [
      { key: 'ra', kind: 'lesson', title: 'The little word rā', titleFa: 'را',
        sub: 'And why Persian can move its words around', route: '/learn/lesson?unit=ra&lesson=ra&step=ra',
        unit: 'ra', lesson: 'ra' },
    ],
  },
  {
    key: 'ezafe',
    level: 'advanced',
    roman: 'XX',
    title: 'Chains of ezāfe',
    titleFa: 'اضافه',
    blurb: 'Reading a long phrase without losing the thread.',
    steps: [
      { key: 'ezafe', kind: 'lesson', title: 'Chains of ezāfe', titleFa: 'اضافه',
        sub: 'Read the chain backwards and it opens', route: '/learn/lesson?unit=ezafe&lesson=ezafe&step=ezafe',
        unit: 'ezafe', lesson: 'ezafe' },
      { key: 'read-2', kind: 'lesson', title: 'Read something real', titleFa: 'خواندن',
        sub: 'Whole texts, every word one tap away', route: '/learn/read?step=read-2' },
    ],
  },
  {
    key: 'subjunctive',
    level: 'advanced',
    roman: 'XXI',
    title: 'The unreal',
    titleFa: 'التزامی',
    blurb: 'Wanting, needing, maybe and if.',
    steps: [
      { key: 'subjunctive', kind: 'lesson', title: 'Things that have not happened', titleFa: 'التزامی',
        sub: 'Two verbs, and the second one bends', route: '/learn/lesson?unit=subjunctive&lesson=subjunctive&step=subjunctive',
        unit: 'subjunctive', lesson: 'subjunctive' },
    ],
  },
  {
    key: 'reported',
    level: 'advanced',
    roman: 'XXII',
    title: 'Reported speech',
    titleFa: 'نقل قول',
    blurb: 'Persian keeps the words as they were said.',
    steps: [
      { key: 'reported', kind: 'lesson', title: 'Saying what someone said', titleFa: 'نقل قول',
        sub: 'The tense does not shift', route: '/learn/lesson?unit=reported&lesson=reported&step=reported',
        unit: 'reported', lesson: 'reported' },
      { key: 'review-6', kind: 'review', title: 'Review everything', titleFa: 'مرور',
        sub: 'Every word you have met', route: '/learn/review?step=review-6' },
    ],
  },
];

// Flat list, for finding where you are.
export function allSteps(): JourneyStep[] {
  return STAGES.flatMap((s) => s.steps);
}

// Side quests: useful, but not on the route.
export const SIDE_QUESTS: JourneyStep[] = [];

// Where the level questionnaire drops you in.
// Which stage each level joins the route at.
export const LEVEL_ENTRY: Record<string, string> = {
  beginner: 'letters',
  elementary: 'verbs',
  intermediate: 'feelings',
  advanced: 'conversation',
};


/**
 * What comes after a given step, walking into the next stage when the
 * current one runs out. Returns null at the very end of the journey.
 *
 * `endsStage` tells the caller they have just finished a chapter, which
 * is worth marking rather than sliding silently into the next one.
 */
export function nextStep(stepKey: string): { step: JourneyStep; endsStage: boolean } | null {
  for (let si = 0; si < STAGES.length; si++) {
    const steps = STAGES[si].steps;
    const i = steps.findIndex((x) => x.key === stepKey);
    if (i === -1) continue;

    if (i + 1 < steps.length) {
      return { step: steps[i + 1], endsStage: false };
    }
    // last step of this stage: hand back the first of the next one
    const next = STAGES[si + 1];
    if (!next || !next.steps.length) return null;
    return { step: next.steps[0], endsStage: true };
  }
  return null;
}

/** True when this step is the last in its stage. */
export function isLastOfStage(stepKey: string): boolean {
  return STAGES.some((st) => st.steps.length > 0 && st.steps[st.steps.length - 1].key === stepKey);
}
