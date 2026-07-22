// Traditions: a light, elegant, symbol-driven content world (separate from the dark history reader).

export const light = {
  bg: '#FBF7F1',        // warm paper
  surface: '#FFFFFF',
  text: '#3B3330',      // soft ink
  textDim: '#9A8F88',
  hair: '#EADFD3',
  gold: '#C6A15B',
  goldSoft: '#EFE4CE',
  accent: '#B9506B',    // soft rose
  accentSoft: '#F4E4E9',
  sage: '#8AA079',
};

// A symbol is drawn with layered styled views (no SVG). Each has a glyph + palette.
export type TraditionSection = {
  key: string;
  symbol: string;        // an emoji-free motif id the reader maps to a drawn shape
  glyph?: string;        // optional Persian word shown lightly
  title: string;
  body: string[];        // paragraphs
  note?: string;         // a soft aside
  items?: { label: string; meaning: string }[]; // e.g. the seven S's
};

export type Tradition = {
  key: string;
  name: string;
  persian: string;
  season: string;
  tagline: string;
  cover?: string;
  intro: string;
  sections: TraditionSection[];
  status: 'ready' | 'soon';
};

const nowruz: Tradition = {
  key: 'nowruz',
  name: 'Nowruz',
  persian: 'نوروز',
  season: 'The Spring Equinox',
  tagline: 'The Persian New Year, and the rebirth of the world',
  cover: 'nowruz-cover',
  intro: 'For more than three thousand years, Iranians have greeted the first breath of spring with Nowruz, the New Day. It is a festival of renewal, of light returning, of the earth waking green again. Follow the thread through its meaning, its rituals, and its joys.',
  status: 'ready',
  sections: [
    {
      key: 'meaning',
      symbol: 'sun',
      glyph: 'نوروز',
      title: 'The New Day',
      body: [
        'Nowruz means, quite simply, the New Day. It falls at the very moment of the spring equinox, when day and night stand equal and the sun crosses into a new year, usually the twentieth or twenty first of March.',
        'Its roots reach back thousands of years, into ancient Persia and the faith of Zoroaster, when the return of spring was celebrated as the triumph of light over darkness, and life over the long sleep of winter.',
        'But Nowruz is more than a date. It is a philosophy written into the year itself. It teaches that time renews, that after every winter comes a spring, and that we too may begin again. Old quarrels are set aside, homes and hearts are made clean, and the year turns with hope. To celebrate Nowruz is to believe, each spring, in a fresh beginning.',
      ],
      note: 'Nowruz is not tied to any one religion. It belongs to all Iranians, and to many peoples across a wide world, from the Caucasus to Central Asia.',
    },
    {
      key: 'haftseen',
      symbol: 'mirror',
      glyph: 'هفت‌سین',
      title: 'The Haft-Seen',
      body: [
        'At the heart of Nowruz is the Haft-Seen, a beautiful table setting of seven symbolic items, each beginning with the Persian letter Seen. Each carries a wish for the year to come.',
        'Families arrange the Haft-Seen with care and pride, and around these seven it is adorned with a mirror, candles, painted eggs, a goldfish, and often a book of poetry or faith.',
      ],
      items: [
        { label: 'Sabzeh', meaning: 'Sprouted greens, for rebirth and growth' },
        { label: 'Samanu', meaning: 'A sweet wheat pudding, for strength' },
        { label: 'Senjed', meaning: 'The dried lotus fruit, for love' },
        { label: 'Seer', meaning: 'Garlic, for health' },
        { label: 'Seeb', meaning: 'Apple, for beauty' },
        { label: 'Somaq', meaning: 'Sumac, for the color of sunrise' },
        { label: 'Serkeh', meaning: 'Vinegar, for patience and age' },
      ],
    },
    {
      key: 'spent',
      symbol: 'fire',
      glyph: 'چهارشنبه‌سوری',
      title: 'How It Is Spent',
      body: [
        'The days around Nowruz are full of ritual and joy. Before the New Year, homes are cleaned from top to bottom in the khaneh tekani, the shaking of the house, sweeping out the old year to welcome the new.',
        'On the last Wednesday eve of the year comes Chaharshanbe Suri, the festival of fire, when people leap over small bonfires and call out to the flames, asking them to take away their pallor and weakness and give back warmth and life.',
        'When the New Year arrives, families visit one another in order of age, the young calling first upon their elders. Children receive eidi, small gifts of money, and every home offers sweets, tea, and welcome.',
      ],
    },
    {
      key: 'eaten',
      symbol: 'wheat',
      glyph: 'سبزی‌پلو',
      title: 'What Is Eaten',
      body: [
        'The Nowruz table is green with the promise of spring. The dish of the New Year is sabzi polo ba mahi, herbed rice fragrant with dill and coriander, served with fish, a meal for renewal and abundance.',
        'There is reshteh, a noodle dish said to help one take hold of the threads of life, and a table of sweets and pastries, baklava, chickpea cookies, and rice-flour treats, offered to every guest who calls.',
      ],
      note: 'The green herbs of the New Year table echo the green of the sprouting sabzeh, and the green of the waking earth itself.',
    },
    {
      key: 'poetry',
      symbol: 'sun',
      glyph: 'شعر',
      title: 'The Poetry of the Turn',
      body: [
        'No account of Nowruz is complete without poetry, for poetry is the very soul of the Persian spirit. At the turning of the year, families gather around the Haft-Seen and read aloud, and the book they most often hold is the Divan of Hafez, the beloved poet of Shiraz.',
        'There is a cherished custom called fal-e Hafez, the taking of an omen from Hafez. A person makes a wish in their heart, then opens his book at random, and the verse they find is read as a gentle message for the year to come. His words, written six centuries ago, still seem to answer.',
        'Alongside Hafez are the verses of Saadi, Ferdowsi, and Rumi, and the old poems that praise the spring, the rose, and the nightingale. For Iranians, to welcome the new year in the company of the poets is to be reminded of who they are, a people who have always answered hardship with beauty.',
      ],
      note: 'It is said that in every Persian home there are two books: the holy book, and the Divan of Hafez. At Nowruz, both are given a place of honor.',
    },
    {
      key: 'sizdah',
      symbol: 'leaf',
      glyph: 'سیزده‌بدر',
      title: 'The Thirteenth Day',
      body: [
        'Nowruz lasts thirteen days, and on the thirteenth comes Sizdah Bedar, when every family goes out into nature, to the parks and the countryside, to spend the day among the green and the growing.',
        'They carry with them the sabzeh from the Haft-Seen, grown these thirteen days, and cast it into flowing water, letting it carry away the troubles of the old year. And so the festival ends as it began, with the earth, and with hope.',
      ],
      note: 'To stay indoors on the thirteenth day is thought to invite misfortune. So all of Iran spills outdoors, and the parks fill with picnics and laughter.',
    },
  ],
};

export const TRADITIONS: Tradition[] = [nowruz];

export function findTradition(key?: string) {
  return TRADITIONS.find((t) => t.key === key);
}
