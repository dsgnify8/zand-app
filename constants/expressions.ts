// Persian expressions, the ones that carry more culture than words.
// Each has a literal reading, because the literal reading is usually the
// whole point: Persian says things sideways and means them warmly.

export type Expression = {
  key: string;
  fa: string;
  tr: string;
  en: string;        // what it does
  literal: string;   // what it actually says
  when: string;      // when you would use it
  note?: string;
};

export const EXPRESSIONS: Expression[] = [
  {
    key: 'ghadam',
    fa: 'قدمت روی چشم',
    tr: 'ghadamet ru-ye cheshm',
    en: 'you are most welcome here',
    literal: 'your step upon my eyes',
    when: 'Said to someone arriving, or when you invite them and want them to know you mean it.',
    note: 'The eye is the most delicate thing a person has, and you are offering it as ground to walk on. Persian does this constantly: the extravagance is the courtesy.',
  },
  {
    key: 'khaste',
    fa: 'خسته نباشی',
    tr: 'khaste nab\u0101shi',
    en: 'thank you for your work',
    literal: 'may you not be tired',
    when: 'To anyone who has been working: a shopkeeper, a driver, a colleague, your mother in the kitchen.',
    note: 'There is no English for this and its absence is felt. You acknowledge someone\u2019s effort simply by wishing them un-tired. Iranians say it dozens of times a day.',
  },
  {
    key: 'damet',
    fa: 'دمت گرم',
    tr: 'damet garm',
    en: 'well done, you are a good one',
    literal: 'may your breath be warm',
    when: 'When someone does something generous or impressive. Warm, informal, a little slangy.',
    note: 'Warm breath means alive and vital. Telling someone their breath is warm is telling them they are fully alive, which is a large compliment to make casually.',
  },
  {
    key: 'ghorbunet',
    fa: 'قربونت برم',
    tr: 'ghorbunet beram',
    en: 'you are so dear to me',
    literal: 'may I be sacrificed for you',
    when: 'To family, to someone you love, and often to soften a request or a thank you.',
    note: 'Wildly literal and entirely unremarkable in daily speech. Nobody is offering to die. It means roughly you are precious, said with the volume turned up.',
  },
  {
    key: 'jan',
    fa: 'جانم',
    tr: 'j\u0101nam',
    en: 'yes? / my dear',
    literal: 'my soul',
    when: 'When someone calls your name and you answer. Also as an endearment on its own.',
    note: 'Persian answers a call with my soul rather than yes. Attach it to a name and it becomes affection: Sara-j\u0101n, Maman-j\u0101n. It softens everything it touches.',
  },
  {
    key: 'cheshmam',
    fa: 'چشمم روشن',
    tr: 'cheshmam roshan',
    en: 'how lovely to see you',
    literal: 'my eye is bright',
    when: 'When someone appears after a long absence.',
    note: 'Beware: said in the right tone it also means well, well, look who finally turned up. Persian keeps a sarcastic edge on several of its warmest phrases.',
  },
  {
    key: 'zahmat',
    fa: 'زحمت کشیدی',
    tr: 'zahmat keshidi',
    en: 'you went to trouble for me',
    literal: 'you pulled hardship',
    when: 'When someone has gone out of their way for you.',
  },
  {
    key: 'salamati',
    fa: 'به سلامتی',
    tr: 'be sal\u0101mati',
    en: 'cheers, to your health',
    literal: 'to wellness',
    when: 'Raising a glass, or wishing someone well as they set off.',
  },
  {
    key: 'cheshm',
    fa: 'چشم',
    tr: 'cheshm',
    en: 'of course, consider it done',
    literal: 'eye',
    when: 'Agreeing to do what someone asked, especially an elder.',
    note: 'One word, and it means upon my eyes I will do it. The full phrase wore away over centuries until only the eye was left, and it still carries the whole promise.',
  },
  {
    key: 'nafas',
    fa: 'نفسم',
    tr: 'nafasam',
    en: 'my darling',
    literal: 'my breath',
    when: 'To a child, or someone you love very much.',
  },
  {
    key: 'taarof',
    fa: 'تعارف نکن',
    tr: 't\u0101rof nakon',
    en: 'please, do not stand on ceremony',
    literal: 'do not taarof',
    when: 'When you want someone to actually take the food, the seat, the last cup of tea.',
    note: 'The only way out of the loop is to name it. Saying t\u0101rof nakon gives the other person permission to drop the ritual and say what they want, and it is understood as kindness rather than rudeness.',
  },
  {
    key: 'ishalla',
    fa: 'ایشالله',
    tr: 'ish\u0101ll\u0101',
    en: 'hopefully, God willing',
    literal: 'if God wills',
    when: 'About anything in the future, from a wedding to a bus arriving.',
    note: 'Said by the devout and the entirely secular alike. It has drifted loose from religion and now just means let us hope so, with a shrug attached.',
  },
  {
    key: 'delam',
    fa: 'دلم برات تنگ شده',
    tr: 'delam bar\u0101t tang shode',
    en: 'I miss you',
    literal: 'my heart has grown tight for you',
    when: 'On the phone to anyone far away.',
    note: 'The feeling is located in the speaker\u2019s chest as a physical narrowing. Not I miss you, which points outward, but my heart has closed in on itself in your absence.',
  },
  {
    key: 'jigar',
    fa: 'جیگرتو بخورم',
    tr: 'jigareto bokhoram',
    en: 'I adore you',
    literal: 'let me eat your liver',
    when: 'To a small child, usually one being unbearably sweet.',
    note: 'Persian keeps the liver where English keeps the heart. It sounds alarming and it is pure tenderness: grandmothers say it constantly.',
  },
  {
    key: 'nushejan',
    fa: 'نوش جان',
    tr: 'nush-e j\u0101n',
    en: 'enjoy your food',
    literal: 'may it be sweet to your soul',
    when: 'To anyone eating, and to the cook after a meal.',
  },
];

// A different one each day, the same for everyone, no repeats until the list runs out.
export function expressionOfDay(d = new Date()): Expression {
  const day = Math.floor(d.getTime() / 86400000);
  return EXPRESSIONS[day % EXPRESSIONS.length];
}
