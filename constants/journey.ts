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
  roman: string;
  title: string;
  titleFa: string;
  blurb: string;
  steps: JourneyStep[];
};

export const STAGES: Stage[] = [
  {
    key: 'letters',
    roman: 'I',
    title: 'The letters',
    titleFa: 'حروف',
    blurb: 'Nothing else works until these do.',
    steps: [
      { key: 'alphabet', kind: 'alphabet', title: 'The alphabet', titleFa: 'الفبا',
        sub: 'Thirty two letters, their shapes and sounds', route: '/learn/alphabet' },
      { key: 'writing', kind: 'writing', title: 'Writing them', titleFa: 'نوشتن',
        sub: 'Each letter changes shape by where it sits', route: '/learn/writing' },
    ],
  },
  {
    key: 'first-words',
    roman: 'II',
    title: 'First words',
    titleFa: 'کلمه‌های اول',
    blurb: 'Enough to greet someone and say who you are.',
    steps: [
      { key: 'greetings', kind: 'lesson', title: 'Hello, and how are you', titleFa: 'سلام',
        sub: 'The exchange that opens everything', route: '/learn/lesson?unit=first-words&lesson=greetings',
        unit: 'first-words', lesson: 'greetings' },
      { key: 'introductions', kind: 'lesson', title: 'Saying who you are', titleFa: 'معرفی',
        sub: 'Your name, and asking for theirs', route: '/learn/lesson?unit=first-words&lesson=introductions',
        unit: 'first-words', lesson: 'introductions' },
      { key: 'politeness', kind: 'lesson', title: 'Please and sorry', titleFa: 'ادب',
        sub: 'The words that soften everything', route: '/learn/lesson?unit=first-words&lesson=politeness',
        unit: 'first-words', lesson: 'politeness' },
      { key: 'cards-1', kind: 'flashcards', title: 'Drill these words', titleFa: 'تمرین',
        sub: 'Everything from stage two, one card at a time', route: '/learn/cards?stage=first-words' },
    ],
  },
  {
    key: 'family',
    roman: 'III',
    title: 'People and sentences',
    titleFa: 'خانواده',
    blurb: 'Family, and how Persian puts a sentence together.',
    steps: [
      { key: 'family-words', kind: 'lesson', title: 'Mother, father, the rest', titleFa: 'خانواده',
        sub: 'The words you will use most', route: '/learn/lesson?unit=family&lesson=family-words',
        unit: 'family', lesson: 'family-words' },
      { key: 'family-talk', kind: 'lesson', title: 'Talking about them', titleFa: 'حرف زدن',
        sub: 'This is my mother. I have one sister.', route: '/learn/lesson?unit=family&lesson=family-talk',
        unit: 'family', lesson: 'family-talk' },
      { key: 'review-1', kind: 'review', title: 'Review', titleFa: 'مرور',
        sub: 'Ten words from everything so far', route: '/learn/review' },
    ],
  },
  {
    key: 'table',
    roman: 'IV',
    title: 'The table',
    titleFa: 'سفره',
    blurb: 'Food, and the manners that come with it.',
    steps: [
      { key: 'table-words', kind: 'lesson', title: 'Bread, water, tea', titleFa: 'نان و آب',
        sub: 'What is always on the table', route: '/learn/lesson?unit=table&lesson=table-words',
        unit: 'table', lesson: 'table-words' },
      { key: 'table-manners', kind: 'lesson', title: 'Offering and refusing', titleFa: 'تعارف',
        sub: 'The ritual nobody explains', route: '/learn/lesson?unit=table&lesson=table-manners',
        unit: 'table', lesson: 'table-manners' },
      { key: 'cards-2', kind: 'flashcards', title: 'Drill the table', titleFa: 'تمرین',
        sub: 'Everything from stage four', route: '/learn/cards?stage=table' },
    ],
  },
];

// Flat list, for finding where you are.
export function allSteps(): JourneyStep[] {
  return STAGES.flatMap((s) => s.steps);
}

// Side quests: useful, but not on the route.
export const SIDE_QUESTS: JourneyStep[] = [
  { key: 'numbers-one', kind: 'lesson', title: 'One to ten', titleFa: 'شمارش',
    sub: 'Counting, and the Persian numerals', route: '/learn/lesson?unit=numbers&lesson=numbers-one',
    unit: 'numbers', lesson: 'numbers-one' },
  { key: 'numbers-use', kind: 'lesson', title: 'Age and price', titleFa: 'چند',
    sub: 'How old are you, how much is it', route: '/learn/lesson?unit=numbers&lesson=numbers-use',
    unit: 'numbers', lesson: 'numbers-use' },
];

// Where the level questionnaire drops you in.
export const LEVEL_ENTRY: Record<string, string> = {
  beginner: 'alphabet',
  elementary: 'greetings',
  intermediate: 'family-words',
  advanced: 'table-words',
};
