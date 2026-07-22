// Nowruz: the Persian new year. Its own world, light and spring toned.

export const nz = {
  bg: '#F2EBE1',
  surface: '#FBF7F1',
  raised: '#E9E0D3',
  text: '#2E2823',
  textDim: '#8A7F73',
  hair: '#DACFBE',
  gold: '#B08A46',
  green: '#6E8C5A',
  accent: '#A6704E',
  rose: '#C08497',
};

// The instant of the March equinox, computed to the minute. Nowruz is not a date.
export const NOWRUZ_MOMENTS = [
  '2026-03-20T14:45:36Z',
  '2027-03-20T20:24:54Z',
  '2028-03-20T02:17:09Z',
  '2029-03-20T08:01:42Z',
  '2030-03-20T13:51:55Z',
  '2031-03-20T19:41:08Z',
  '2032-03-20T01:22:14Z',
  '2033-03-20T07:23:03Z',
  '2034-03-20T13:17:40Z',
  '2035-03-20T19:03:30Z',
  '2036-03-20T01:02:49Z',
  '2037-03-20T06:49:52Z',
  '2038-03-20T12:40:40Z',
  '2039-03-20T18:32:15Z',
  '2040-03-20T00:11:47Z',
];

export type SeenItem = {
  key: string;
  fa: string;
  tr: string;
  en: string;
  means: string;
  x: string;
  note?: string;
};

export const HAFT_SEEN: SeenItem[] = [
  {
    key: 'sabzeh', fa: 'سبزه', tr: 'Sabzeh', en: 'Sprouts', means: 'Rebirth',
    x: 'Wheat or lentils sprouted in a dish, started weeks before, so that they are green and thick by the day. It is the only item on the table that is alive, and it is grown by hand in the house, usually by a child who has been told not to forget the water.',
    note: 'On the thirteenth day it is thrown into running water, carrying the year troubles away.',
  },
  {
    key: 'samanu', fa: 'سمنو', tr: 'Samanu', en: 'Wheat pudding', means: 'Patience rewarded',
    x: 'A dark sweet paste made from sprouted wheat, and made without a single grain of sugar. The sweetness is drawn out of the wheat itself by stirring it for a whole night. The women of a family cook it together, taking turns at the pot, telling stories to stay awake.',
    note: 'The sweetest thing on the table has no sugar in it. That is the entire point.',
  },
  {
    key: 'senjed', fa: 'سنجد', tr: 'Senjed', en: 'Oleaster', means: 'Love',
    x: 'The dried fruit of the wild olive tree, small and red brown and floury. It is said its blossom in spring makes the heart fall in love, and so the fruit sits on the table for love itself.',
  },
  {
    key: 'seer', fa: 'سیر', tr: 'Seer', en: 'Garlic', means: 'Health',
    x: 'A head of garlic, unpeeled. It has been medicine in Iran for thousands of years, and it is on the table as the wish for a body that holds up through the year.',
  },
  {
    key: 'seeb', fa: 'سیب', tr: 'Seeb', en: 'Apple', means: 'Beauty',
    x: 'Red apples, for beauty and for health together, because Persian has never quite separated the two. Often polished until they shine, sometimes with a coin pressed beneath.',
  },
  {
    key: 'somaq', fa: 'سماق', tr: 'Somaq', en: 'Sumac', means: 'The sunrise',
    x: 'Crushed sumac, deep red, the colour of the sky at the moment the sun comes over the edge. It is on the table for the daybreak, and for the old Zoroastrian idea underneath all of this: that light arrives and darkness does not win.',
  },
  {
    key: 'serkeh', fa: 'سرکه', tr: 'Serkeh', en: 'Vinegar', means: 'Age and patience',
    x: 'Vinegar, which is wine that has waited. It sits on a table full of youth and sweetness to say the other thing: that getting older is not a loss, and that some things only become themselves by being left alone for years.',
    note: 'The table has an apple for youth and a vinegar for age, side by side, and does not choose.',
  },
];

export type Guest = { key: string; fa: string; en: string; x: string };

export const SEEN_GUESTS: Guest[] = [
  { key: 'mirror', fa: 'آینه', en: 'The mirror', x: 'Placed at the back, facing the room. You are supposed to see yourself in it at the moment the year turns.' },
  { key: 'candle', fa: 'شمع', en: 'Candles', x: 'One for each child of the house, often. Fire, which is the oldest thing on this table by far.' },
  { key: 'goldfish', fa: 'ماهی', en: 'The goldfish', x: 'A live fish in a bowl, for life itself, and for Pisces, the sign the year is leaving.' },
  { key: 'eggs', fa: 'تخم مرغ', en: 'Painted eggs', x: 'One for each member of the family. Some say the egg on the mirror trembles at the instant of the turn.' },
  { key: 'book', fa: 'کتاب', en: 'A book', x: 'The {{hafez|Hafez}}, usually. It is there to be opened and asked, at the turn, for the shape of the year.' },
  { key: 'coin', fa: 'سکه', en: 'Coins', x: 'For the year prosperity, and because a table should have something on it that is only worth what people agree it is worth.' },
  { key: 'sonbol', fa: 'سنبل', en: 'Hyacinth', x: 'For the smell. The whole house smells of it for a week, and that smell is what Iranians abroad say they miss most.' },
];

export type NzBlock =
  | { t: 'p'; x: string }
  | { t: 'ptext'; x: string }
  | { t: 'h'; x: string }
  | { t: 'lead'; x: string }
  | { t: 'mark'; x: string }
  | { t: 'aside'; x: string }
  | { t: 'tahvil' }
  | { t: 'haftseen' }
  | { t: 'guests' }
  | { t: 'fire' }
  | { t: 'knot' }
  | { t: 'img'; key: string; cap?: string }
  | { t: 'days'; items: { d: string; n: string; x: string }[] }
  | { t: 'close'; glyph: string; x: string };

export type NzChapter = { key: string; title: string; nav: string; subtitle?: string; blocks: NzBlock[] };

export const NOWRUZ_CHAPTERS: NzChapter[] = [
  {
    key: 'n1', title: 'The Oldest New Year', nav: 'The Turn',
    subtitle: 'WHAT IT IS',
    blocks: [
      { t: 'lead', x: 'Every other new year is a date somebody chose. This one is an event.' },
      { t: 'p', x: 'Nowruz does not fall on a day. It falls at an instant, the exact second the sun crosses the equator and the northern half of the world tips back toward the light. Astronomers can give you that second. Iranians will be watching the clock for it.' },
      { t: 'tahvil' },
      { t: 'p', x: 'That is the real countdown, calculated the same way Khayyam calculated it in 1079 when he built the calendar Iran still uses. He is the reason it is exact.' },
      { t: 'mark', x: 'Nobody voted for this new year. The solar system decides it.' },
    ],
  },
  {
    key: 'n2', title: 'Older Than History', nav: 'The Root',
    subtitle: 'WHERE IT COMES FROM',
    blocks: [
      { t: 'p', x: 'It is at least three thousand years old, and probably older. It comes out of Zoroastrian Iran, out of a religion built on the argument between light and dark, where the return of the sun was not a metaphor for anything. It was the news.' },
      { t: 'p', x: 'The Achaemenids kept it. The reliefs at Persepolis show delegations from every corner of the empire arriving with gifts, and many scholars read that as a Nowruz procession carved in stone twenty five centuries ago.' },
      { t: 'h', x: 'What could not be taken' },
      { t: 'p', x: 'Nowruz was never a religious festival. It belonged to no doctrine and asked for no belief. It was simply the turning of the year, marked by a people who had always watched the sky. That is exactly why it endured: it was woven into the rhythm of the land itself, not into any single faith.' },
      { t: 'p', x: 'It did not. It was too deep in the year, in the food, in the houses. So it survived, quietly, and then loudly, and it is now kept by Muslims, by Jews, by Zoroastrians, by Christians, by Kurds and Afghans and Tajiks and Azeris, by people who have no religion at all, and by people whose grandparents left Iran and who cannot read a word of Persian.' },
      { t: 'mark', x: 'It survived every empire that arrived to replace it, because it was never about who was in charge.' },
    ],
  },
  {
    key: 'n3', title: 'Jumping the Fire', nav: 'The Fire',
    subtitle: 'CHAHARSHANBE SURI',
    blocks: [
      { t: 'p', x: 'It starts before the year does. On the last Tuesday evening of the old year, in streets and courtyards and car parks across Iran, people light small fires and jump over them.' },
      { t: 'fire' },
      { t: 'p', x: 'And as you jump, you say the line. Everyone knows it. Nobody had to learn it.' },
      { t: 'h', x: 'What you are actually saying' },
      { t: 'p', x: 'My yellow is yours, your red is mine. You give the fire your sickness, your pallor, the tiredness of the year, and you take its heat and its colour in exchange. It is a trade, and it is stated out loud, and it is three thousand years old.' },
      { t: 'p', x: 'The fire is not being worshipped, whatever anyone says. It is being used. Zoroastrians never worshipped fire either. They faced it, because it is the clearest thing there is, and you turn toward what you want to be like.' },
      { t: 'aside', x: 'It has been discouraged and sometimes banned in the years since the revolution. It has not stopped once.' },
    ],
  },
  {
    key: 'n4', title: 'The Table', nav: 'Haft Seen',
    subtitle: 'SEVEN THINGS BEGINNING WITH S',
    blocks: [
      { t: 'p', x: 'A cloth is laid, and on it go seven things, and every one of them begins with the Persian letter seen. That is the rule, and it is the only rule, and everything else on the table is a guest.' },
      { t: 'p', x: 'Swipe through them.' },
      { t: 'haftseen' },
      { t: 'h', x: 'Why seven' },
      { t: 'p', x: 'Nobody knows for certain, which is worth saying plainly. The likeliest answer is the Amesha Spenta, the seven holy immortals of Zoroastrianism, the aspects of the divine that hold up the world. Seven has been sacred here for a very long time, and the letter is probably the later excuse for a number that was already fixed.' },
      { t: 'h', x: 'And the guests' },
      { t: 'p', x: 'Everything else is optional and everyone brings it anyway.' },
      { t: 'guests' },
    ],
  },
  {
    key: 'n5', title: 'The Moment', nav: 'The Instant',
    subtitle: 'TAHVIL E SAL',
    blocks: [
      { t: 'p', x: 'Here is what happens at the second itself, and it is the same in almost every Iranian house on earth.' },
      { t: 'p', x: 'Everyone is at the table. Everyone is in something new, because you wear new clothes for it. The television is on with the countdown, or someone has the radio, or now a phone. Nobody is speaking much.' },
      { t: 'p', x: 'And then the cannon goes, or the announcer says it, and the year has turned. And in that instant the room detonates. Everyone kisses everyone. The eldest gives out money, crisp notes kept in the Quran or the Hafez all year for exactly this. Somebody is crying and pretending not to.' },
      { t: 'mark', x: 'It happens at three in the afternoon or at four in the morning. The sun does not care, and neither does anyone at the table.' },
      { t: 'p', x: 'That last part matters. Because the moment is astronomical, Nowruz arrives whenever it arrives. Families set alarms for the middle of the night and wake the children and sit at the table at four in the morning in their new clothes, because you do not miss it.' },
      { t: 'h', x: 'And then the book' },
      { t: 'ptext', x: 'Someone reaches for the {{hafez|Hafez}}. A wish is held, the book is opened at random, and the verse is read aloud to the whole family, and everyone argues about what it means for the year ahead. It is the first thing done in the new year, and it is done with a poem.' },
    ],
  },
  {
    key: 'n6', title: 'Thirteen Days', nav: 'The Visits',
    subtitle: 'WHAT COMES AFTER',
    blocks: [
      { t: 'p', x: 'The moment is not the holiday. The holiday is thirteen days long, and it has rules older than anyone can explain.' },
      { t: 'days', items: [
        { d: 'Days 1 to 12', n: 'Did o Bazdid', x: 'Visiting. And there is an order to it: the young go to the old first, never the other way round. You visit your grandparents, then your parents, then outward. Everyone is fed. Nobody is allowed to leave quickly.' },
        { d: 'Every visit', n: 'Eydi', x: 'The elders give money to the young. New notes, always. A child can make a small fortune over thirteen days and will be talking about it for a year.' },
        { d: 'The whole time', n: 'Ajil and shirini', x: 'Nuts, dried fruit, and pastry, in every house, in the same bowls, and you must eat some in each one, and there are eleven more houses.' },
        { d: 'Day 13', n: 'Sizdah Bedar', x: 'Everyone goes outside. Not some people. Everyone.' },
      ] },
    ],
  },
  {
    key: 'n7', title: 'Out on the Thirteenth', nav: 'Sizdah',
    subtitle: 'SIZDAH BEDAR',
    blocks: [
      { t: 'p', x: 'Thirteen is unlucky, so on the thirteenth day of the year the entire country leaves the house and spends the whole day outdoors. Every park, every roadside, every scrap of grass in Iran is covered in families on carpets, cooking, sleeping, playing, from morning until dark. It is possibly the largest simultaneous picnic on earth.' },
      { t: 'p', x: 'To stay indoors is bad luck. So nobody does.' },
      { t: 'h', x: 'The sabzeh goes into the water' },
      { t: 'p', x: 'And you bring the sprouts. The sabzeh that has sat on the table for thirteen days, absorbing whatever was in the house, is carried out and thrown into running water and let go. Whatever it took on goes downstream.' },
      { t: 'h', x: 'And the knot' },
      { t: 'p', x: 'Before you throw it, unmarried young people tie a knot in the grass and make a wish. Tying the knot is asking for the tie: a marriage, a person, a life. Untying it is left to whoever finds it, which is the joke and also not a joke.' },
      { t: 'knot' },
      { t: 'close', glyph: 'نوروز', x: 'A new year that begins at an exact second decided by the sun and not by a committee. A fire you give your tiredness to. A table with an apple for youth and a vinegar for age sitting side by side. Thirteen days of being fed by people who love you. And then everyone, the whole country at once, out on the grass, letting the year troubles go downstream. It has outlived every empire that tried to end it, and it will be here next spring, at the second, whatever else has happened.' },
    ],
  },
];
