// Extra words for the Pronunciation reference library. Add freely — grows over time.
export type PronWord = { fa: string; translit: string; en: string; group: string };

export const PRON_WORDS: PronWord[] = [
  // Love & feeling
  { fa: 'عشق', translit: 'eshgh', en: 'Love', group: 'Feelings' },
  { fa: 'عاشقتم', translit: 'âsheghetam', en: 'I love you', group: 'Feelings' },
  { fa: 'دوستت دارم', translit: 'dustet dâram', en: 'I like you', group: 'Feelings' },
  { fa: 'دل', translit: 'del', en: 'Heart', group: 'Feelings' },
  { fa: 'مهر', translit: 'mehr', en: 'Affection / kindness', group: 'Feelings' },
  { fa: 'شادی', translit: 'shâdi', en: 'Joy', group: 'Feelings' },
  { fa: 'آرامش', translit: 'ârâmesh', en: 'Peace / calm', group: 'Feelings' },
  { fa: 'امید', translit: 'omid', en: 'Hope', group: 'Feelings' },
  { fa: 'دلتنگ', translit: 'deltang', en: 'Missing someone', group: 'Feelings' },
  { fa: 'خوشحال', translit: 'khoshhâl', en: 'Happy', group: 'Feelings' },
  { fa: 'غمگین', translit: 'ghamgin', en: 'Sad', group: 'Feelings' },

  // Nature
  { fa: 'خورشید', translit: 'khorshid', en: 'Sun', group: 'Nature' },
  { fa: 'ماه', translit: 'mâh', en: 'Moon', group: 'Nature' },
  { fa: 'ستاره', translit: 'setâre', en: 'Star', group: 'Nature' },
  { fa: 'آسمان', translit: 'âsemân', en: 'Sky', group: 'Nature' },
  { fa: 'دریا', translit: 'daryâ', en: 'Sea', group: 'Nature' },
  { fa: 'کوه', translit: 'kuh', en: 'Mountain', group: 'Nature' },
  { fa: 'گل', translit: 'gol', en: 'Flower', group: 'Nature' },
  { fa: 'درخت', translit: 'derakht', en: 'Tree', group: 'Nature' },
  { fa: 'باران', translit: 'bârân', en: 'Rain', group: 'Nature' },
  { fa: 'باد', translit: 'bâd', en: 'Wind', group: 'Nature' },
  { fa: 'آتش', translit: 'âtash', en: 'Fire', group: 'Nature' },
  { fa: 'برف', translit: 'barf', en: 'Snow', group: 'Nature' },

  // Time
  { fa: 'زمان', translit: 'zamân', en: 'Time', group: 'Time' },
  { fa: 'سال', translit: 'sâl', en: 'Year', group: 'Time' },
  { fa: 'ماه', translit: 'mâh', en: 'Month', group: 'Time' },
  { fa: 'هفته', translit: 'hafte', en: 'Week', group: 'Time' },
  { fa: 'ساعت', translit: 'sâat', en: 'Hour / clock', group: 'Time' },
  { fa: 'صبح', translit: 'sobh', en: 'Morning', group: 'Time' },
  { fa: 'ظهر', translit: 'zohr', en: 'Noon', group: 'Time' },
  { fa: 'دیروز', translit: 'diruz', en: 'Yesterday', group: 'Time' },

  // Common verbs
  { fa: 'رفتن', translit: 'raftan', en: 'To go', group: 'Verbs' },
  { fa: 'آمدن', translit: 'âmadan', en: 'To come', group: 'Verbs' },
  { fa: 'خوردن', translit: 'khordan', en: 'To eat', group: 'Verbs' },
  { fa: 'نوشیدن', translit: 'nushidan', en: 'To drink', group: 'Verbs' },
  { fa: 'دیدن', translit: 'didan', en: 'To see', group: 'Verbs' },
  { fa: 'گفتن', translit: 'goftan', en: 'To say', group: 'Verbs' },
  { fa: 'دانستن', translit: 'dânestan', en: 'To know', group: 'Verbs' },
  { fa: 'خواستن', translit: 'khâstan', en: 'To want', group: 'Verbs' },
  { fa: 'داشتن', translit: 'dâshtan', en: 'To have', group: 'Verbs' },
  { fa: 'بودن', translit: 'budan', en: 'To be', group: 'Verbs' },

  // Useful nouns
  { fa: 'نام', translit: 'nâm', en: 'Name', group: 'Common' },
  { fa: 'کار', translit: 'kâr', en: 'Work', group: 'Common' },
  { fa: 'پول', translit: 'pul', en: 'Money', group: 'Common' },
  { fa: 'راه', translit: 'râh', en: 'Road / way', group: 'Common' },
  { fa: 'کشور', translit: 'keshvar', en: 'Country', group: 'Common' },
  { fa: 'مردم', translit: 'mardom', en: 'People', group: 'Common' },
  { fa: 'زبان', translit: 'zabân', en: 'Language', group: 'Common' },
  { fa: 'ایران', translit: 'irân', en: 'Iran', group: 'Common' },
];
