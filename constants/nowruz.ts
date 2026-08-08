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
    key: 'sabzeh', fa: 'سبزه', tr: 'Sabzeh', en: 'Sprouts', means: 'Rebirth', meansFa: 'زایش دوباره',
    x: 'Wheat or lentils sprouted in a dish, started weeks before, so that they are green and thick by the day. It is the only item on the table that is alive, and it is grown by hand in the house, usually by a child who has been told not to forget the water.', xFa: 'گندم یا عدسی که در ظرفی سبز شده، هفته‌ها پیش‌تر کاشته‌اند تا سر سال سبز و پرپشت باشد. تنها چیز زندهٔ روی سفره است، و در خانه و با دست پرورده می‌شود؛ معمولاً به دست بچه‌ای که سپرده‌اند آبش را یادش نرود.',
    note: 'On the thirteenth day it is thrown into running water, carrying the year troubles away.', noteFa: 'روز سیزدهم به آب روان سپرده می‌شود و سختی‌های سال را با خود می‌برد.',
  },
  {
    key: 'samanu', fa: 'سمنو', tr: 'Samanu', en: 'Wheat pudding', means: 'Patience rewarded', meansFa: 'پاداش صبر',
    x: 'A dark sweet paste made from sprouted wheat, and made without a single grain of sugar. The sweetness is drawn out of the wheat itself by stirring it for a whole night. The women of a family cook it together, taking turns at the pot, telling stories to stay awake.', xFa: 'حلوایی تیره و شیرین از جوانهٔ گندم، بی‌آنکه حتی یک دانه شکر در آن باشد. شیرینی را با هم زدنِ یک شب تمام، از خودِ گندم بیرون می‌کشند. زنان خانواده با هم می‌پزندش، نوبتی پای دیگ می‌ایستند و برای بیدار ماندن قصه می‌گویند.',
    note: 'The sweetest thing on the table has no sugar in it. That is the entire point.', noteFa: 'شیرین‌ترین چیز سفره، یک ذره شکر ندارد. تمام حرف همین است.',
  },
  {
    key: 'senjed', fa: 'سنجد', tr: 'Senjed', en: 'Oleaster', means: 'Love', meansFa: 'عشق', meansFa: 'عشق',
    x: 'The dried fruit of the wild olive tree, small and red brown and floury. It is said its blossom in spring makes the heart fall in love, and so the fruit sits on the table for love itself.', xFa: 'میوهٔ خشک درخت سنجد، ریز و سرخ‌قهوه‌ای و آردی. می‌گویند شکوفه‌اش در بهار دل را به عشق می‌اندازد، و از همین رو میوه‌اش سر سفره می‌نشیند.',
  },
  {
    key: 'seer', fa: 'سیر', tr: 'Seer', en: 'Garlic', means: 'Health', meansFa: 'تندرستی',
    x: 'A head of garlic, unpeeled. It has been medicine in Iran for thousands of years, and it is on the table as the wish for a body that holds up through the year.', xFa: 'یک بُنه سیر، پوست‌نکنده. هزاران سال در ایران دارو بوده، و روی سفره است چون آرزوی تنی است که یک سال تمام دوام بیاورد.',
  },
  {
    key: 'seeb', fa: 'سیب', tr: 'Seeb', en: 'Apple', means: 'Beauty', meansFa: 'زیبایی',
    x: 'Red apples, for beauty and for health together, because Persian has never quite separated the two. Often polished until they shine, sometimes with a coin pressed beneath.', xFa: 'سیب سرخ، هم برای زیبایی و هم برای سلامتی، چون فارسی هیچ‌وقت این دو را کاملاً از هم جدا نکرده است. اغلب چنان برقشان می‌اندازند که بدرخشند، و گاهی سکه‌ای زیرشان می‌گذارند.',
  },
  {
    key: 'somaq', fa: 'سماق', tr: 'Somaq', en: 'Sumac', means: 'The sunrise', meansFa: 'برآمدن آفتاب',
    x: 'Crushed sumac, deep red, the colour of the sky at the moment the sun comes over the edge. It is on the table for the daybreak, and for the old Zoroastrian idea underneath all of this: that light arrives and darkness does not win.', xFa: 'سماق ساییده، سرخِ تیره، به رنگ آسمان در همان لحظه‌ای که خورشید از لبهٔ افق بالا می‌آید. برای سپیده‌دم روی سفره است، و برای همان اندیشهٔ کهن زرتشتی که زیر تمام این آیین نشسته: روشنایی می‌رسد و تاریکی پیروز نمی‌شود.',
  },
  {
    key: 'serkeh', fa: 'سرکه', tr: 'Serkeh', en: 'Vinegar', means: 'Age and patience', meansFa: 'سالخوردگی و صبر',
    x: 'Vinegar, which is wine that has waited. It sits on a table full of youth and sweetness to say the other thing: that getting older is not a loss, and that some things only become themselves by being left alone for years.', xFa: 'سرکه، که همان می است پس از انتظار. روی سفره‌ای پر از جوانی و شیرینی می‌نشیند تا آن حرف دیگر را بزند: که پیر شدن باختن نیست، و بعضی چیزها فقط وقتی خودشان می‌شوند که سال‌ها به حال خود رها شده باشند.',
    note: 'The table has an apple for youth and a vinegar for age, side by side, and does not choose.', noteFa: 'سفره سیبی دارد برای جوانی و سرکه‌ای برای پیری، کنار هم، و میانشان یکی را برنمی‌گزیند.',
  },
];

export type Guest = { key: string; fa: string; en: string; x: string };

export const SEEN_GUESTS: Guest[] = [
  { key: 'mirror', fa: 'آینه', en: 'The mirror', enFa: 'آینه', x: 'Placed at the back, facing the room. You are supposed to see yourself in it at the moment the year turns.', xFa: 'پشت سفره می‌گذارندش، رو به اتاق. قرار است در لحظهٔ سال تحویل خودت را در آن ببینی.' },
  { key: 'candle', fa: 'شمع', en: 'Candles', enFa: 'شمع', x: 'One for each child of the house, often. Fire, which is the oldest thing on this table by far.', xFa: 'اغلب برای هر بچهٔ خانه یکی. آتش، که با فاصلهٔ زیاد کهن‌ترین چیز روی این سفره است.' },
  { key: 'goldfish', fa: 'ماهی', en: 'The goldfish', enFa: 'ماهی قرمز', x: 'A live fish in a bowl, for life itself, and for Pisces, the sign the year is leaving.', xFa: 'ماهی زنده در تنگ، برای خودِ زندگی، و برای برج حوت که سال دارد از آن بیرون می‌رود.' },
  { key: 'eggs', fa: 'تخم مرغ', en: 'Painted eggs', enFa: 'تخم‌مرغ رنگی', x: 'One for each member of the family. Some say the egg on the mirror trembles at the instant of the turn.', xFa: 'برای هر عضو خانواده یکی. بعضی می‌گویند تخم‌مرغی که روی آینه است، در لحظهٔ سال تحویل می‌لرزد.' },
  { key: 'book', fa: 'کتاب', en: 'A book', enFa: 'کتاب', x: 'The {{hafez|Hafez}}, usually. It is there to be opened and asked, at the turn, for the shape of the year.', xFa: 'معمولاً {{hafez|دیوان حافظ}}. آنجاست تا سر سال تحویل بازش کنند و از او بپرسند سالِ پیش رو چه شکلی است.' },
  { key: 'coin', fa: 'سکه', en: 'Coins', enFa: 'سکه', x: 'For the year prosperity, and because a table should have something on it that is only worth what people agree it is worth.', xFa: 'برای برکت سال، و چون روی سفره باید چیزی باشد که ارزشش فقط همان است که مردم بر سرش توافق کرده‌اند.' },
  { key: 'sonbol', fa: 'سنبل', en: 'Hyacinth', enFa: 'سنبل', x: 'For the smell. The whole house smells of it for a week, and that smell is what Iranians abroad say they miss most.', xFa: 'برای بویش. یک هفته تمام خانه بوی سنبل می‌دهد، و ایرانی‌های خارج از کشور می‌گویند همین بو است که بیش از هر چیز دلشان برایش تنگ می‌شود.' },
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
    key: 'n1', title: 'The Oldest New Year', titleFa: 'کهن‌ترین سال نو', nav: 'The Turn', navFa: 'تحویل',
    subtitle: 'WHAT IT IS',
    blocks: [
      { t: 'lead', x: 'Every other new year is a date somebody chose. This one is an event.', fa: 'هر سال نوِ دیگری تاریخی است که کسی انتخابش کرده. این یکی یک رویداد است.' },
      { t: 'p', x: 'Nowruz does not fall on a day. It falls at an instant, the exact second the sun crosses the equator and the northern half of the world tips back toward the light. Astronomers can give you that second. Iranians will be watching the clock for it.', fa: 'نوروز در یک روز نمی‌افتد؛ در یک لحظه می‌افتد. همان ثانیهٔ دقیقی که خورشید از استوا می‌گذرد و نیمهٔ شمالی زمین دوباره رو به روشنایی می‌چرخد. ستاره‌شناسان آن ثانیه را به تو می‌دهند. ایرانی‌ها چشمشان به ساعت است تا برسد.' },
      { t: 'tahvil' },
      { t: 'p', x: 'That is the real countdown, calculated the same way Khayyam calculated it in 1079 when he built the calendar Iran still uses. He is the reason it is exact.', fa: 'شمارش معکوس واقعی همین است، و به همان روشی حساب می‌شود که خیام در سال ۴۵۸ خورشیدی حساب کرد، وقتی تقویمی را ساخت که ایران هنوز با آن زندگی می‌کند. دقیق بودنش را از او داریم.' },
      { t: 'mark', x: 'Nobody voted for this new year. The solar system decides it.', fa: 'کسی به این سال نو رأی نداده. منظومهٔ شمسی تعیینش می‌کند.' },
    ],
  },
  {
    key: 'n2', title: 'Older Than History', titleFa: 'کهن‌تر از تاریخ', nav: 'The Root', navFa: 'ریشه',
    subtitle: 'WHERE IT COMES FROM',
    blocks: [
      { t: 'p', x: 'It is at least three thousand years old, and probably older. It comes out of Zoroastrian Iran, out of a religion built on the argument between light and dark, where the return of the sun was not a metaphor for anything. It was the news.', fa: 'دست‌کم سه هزار سال قدمت دارد، و احتمالاً بیشتر. از ایرانِ زرتشتی می‌آید؛ از آیینی که بر نبرد روشنایی و تاریکی بنا شده بود، و در آن بازگشت خورشید استعارهٔ هیچ چیز نبود. خودِ خبر بود.' },
      { t: 'p', x: 'The Achaemenids kept it. The reliefs at Persepolis show delegations from every corner of the empire arriving with gifts, and many scholars read that as a Nowruz procession carved in stone twenty five centuries ago.', fa: 'هخامنشیان نگهش داشتند. نقش‌برجسته‌های تخت جمشید نمایندگانی را نشان می‌دهد که از هر گوشهٔ امپراتوری با هدیه می‌آیند، و بسیاری از پژوهشگران آن را صف نوروزی می‌خوانند که بیست و پنج قرن پیش بر سنگ کنده شده است.' },
      { t: 'h', x: 'What could not be taken', fa: 'آنچه نتوانستند بگیرند' },
      { t: 'p', x: 'Nowruz was never a religious festival. It belonged to no doctrine and asked for no belief. It was simply the turning of the year, marked by a people who had always watched the sky. That is exactly why it endured: it was woven into the rhythm of the land itself, not into any single faith.', fa: 'نوروز هیچ‌گاه جشنی دینی نبود. به هیچ مکتبی تعلق نداشت و از کسی باور نمی‌خواست. فقط گردش سال بود، که مردمی آن را نگه می‌داشتند که همیشه چشم به آسمان داشته‌اند. دقیقاً به همین سبب ماند: در ضرباهنگ خودِ این سرزمین بافته شده بود، نه در هیچ آیین خاصی.' },
      { t: 'p', x: 'It did not. It was too deep in the year, in the food, in the houses. So it survived, quietly, and then loudly, and it is now kept by Muslims, by Jews, by Zoroastrians, by Christians, by Kurds and Afghans and Tajiks and Azeris, by people who have no religion at all, and by people whose grandparents left Iran and who cannot read a word of Persian.', fa: 'و از میان نرفت. بیش از آن در سال ریشه داشت، در غذا، در خانه‌ها. پس ماند؛ اول بی‌سروصدا و بعد بلند و آشکار. امروز مسلمان و یهودی و زرتشتی و مسیحی نگهش می‌دارند، کرد و افغان و تاجیک و آذری، کسانی که هیچ دینی ندارند، و کسانی که پدربزرگ و مادربزرگشان از ایران رفته‌اند و خودشان یک کلمه فارسی نمی‌توانند بخوانند.' },
      { t: 'mark', x: 'It survived every empire that arrived to replace it, because it was never about who was in charge.', fa: 'از هر امپراتوری‌ای که آمد تا جایش را بگیرد جان به در برد، چون هرگز به این ربطی نداشت که چه کسی حاکم است.' },
    ],
  },
  {
    key: 'n3', title: 'Jumping the Fire', titleFa: 'پریدن از روی آتش', nav: 'The Fire', navFa: 'آتش',
    subtitle: 'CHAHARSHANBE SURI',
    blocks: [
      { t: 'p', x: 'It starts before the year does. On the last Tuesday evening of the old year, in streets and courtyards and car parks across Iran, people light small fires and jump over them.', fa: 'پیش از آنکه سال شروع شود، شروع می‌شود. شب آخرین سه‌شنبهٔ سال، در کوچه‌ها و حیاط‌ها و پارکینگ‌های سراسر ایران، مردم آتش‌های کوچک روشن می‌کنند و از رویشان می‌پرند.' },
      { t: 'fire' },
      { t: 'p', x: 'And as you jump, you say the line. Everyone knows it. Nobody had to learn it.', fa: 'و همان‌طور که می‌پری، آن جمله را می‌گویی. همه بلدند. هیچ‌کس لازم نبوده یادش بگیرد.' },
      { t: 'h', x: 'What you are actually saying', fa: 'در واقع داری چه می‌گویی' },
      { t: 'p', x: 'My yellow is yours, your red is mine. You give the fire your sickness, your pallor, the tiredness of the year, and you take its heat and its colour in exchange. It is a trade, and it is stated out loud, and it is three thousand years old.', fa: 'زردی من از تو، سرخی تو از من. بیماری‌ات را به آتش می‌دهی، رنگ‌پریدگی‌ات را، خستگی یک سال را؛ و در عوض گرما و رنگش را می‌گیری. یک معامله است، بلند هم گفته می‌شود، و سه هزار سال قدمت دارد.' },
      { t: 'p', x: 'The fire is not being worshipped, whatever anyone says. It is being used. Zoroastrians never worshipped fire either. They faced it, because it is the clearest thing there is, and you turn toward what you want to be like.', fa: 'آتش پرستیده نمی‌شود، هر کس هر چه بگوید. به کار گرفته می‌شود. زرتشتیان هم هرگز آتش را نمی‌پرستیدند؛ رو به آن می‌ایستادند، چون پاک‌ترین و روشن‌ترین چیزی است که هست، و آدم رو به چیزی می‌ایستد که می‌خواهد مثل آن باشد.' },
      { t: 'aside', x: 'It has been discouraged and sometimes banned in the years since the revolution. It has not stopped once.', fa: 'در سال‌های پس از انقلاب از آن نهی کرده‌اند و گاهی ممنوعش کرده‌اند. حتی یک سال هم تعطیل نشده.' },
    ],
  },
  {
    key: 'n4', title: 'The Table', titleFa: 'سفره', nav: 'Haft Seen', navFa: 'هفت‌سین',
    subtitle: 'SEVEN THINGS BEGINNING WITH S',
    blocks: [
      { t: 'p', x: 'A cloth is laid, and on it go seven things, and every one of them begins with the Persian letter seen. That is the rule, and it is the only rule, and everything else on the table is a guest.', fa: 'سفره‌ای پهن می‌شود و هفت چیز رویش می‌رود، و نام هر هفت‌تا با حرف «س» آغاز می‌شود. قاعده همین است، و تنها قاعده هم همین است؛ هر چیز دیگری که روی سفره باشد، مهمان است.' },
      { t: 'p', x: 'Swipe through them.', fa: 'یکی‌یکی ببینشان.' },
      { t: 'haftseen' },
      { t: 'h', x: 'Why seven', fa: 'چرا هفت' },
      { t: 'p', x: 'Nobody knows for certain, which is worth saying plainly. The likeliest answer is the Amesha Spenta, the seven holy immortals of Zoroastrianism, the aspects of the divine that hold up the world. Seven has been sacred here for a very long time, and the letter is probably the later excuse for a number that was already fixed.', fa: 'هیچ‌کس به‌یقین نمی‌داند، و بهتر است همین را ساده بگوییم. محتمل‌ترین پاسخ امشاسپندان است؛ همان هفت جاودانِ مقدس در آیین زرتشتی، جلوه‌هایی از ایزد که جهان را بر پا نگه می‌دارند. عدد هفت مدت‌هاست در این سرزمین مقدس بوده، و حرف «س» احتمالاً بهانه‌ای است که بعدها برای عددی تراشیده شد که از پیش ثابت بود.' },
      { t: 'h', x: 'And the guests', fa: 'و مهمان‌های سفره' },
      { t: 'p', x: 'Everything else is optional and everyone brings it anyway.', fa: 'باقی‌اش اختیاری است، و همه هم می‌آورندش.' },
      { t: 'guests' },
    ],
  },
  {
    key: 'n5', title: 'The Moment', titleFa: 'آن لحظه', nav: 'The Instant', navFa: 'سال تحویل',
    subtitle: 'TAHVIL E SAL',
    blocks: [
      { t: 'p', x: 'Here is what happens at the second itself, and it is the same in almost every Iranian house on earth.', fa: 'و اما در خودِ آن ثانیه چه می‌گذرد؛ و تقریباً در هر خانهٔ ایرانی روی این زمین یکسان است.' },
      { t: 'p', x: 'Everyone is at the table. Everyone is in something new, because you wear new clothes for it. The television is on with the countdown, or someone has the radio, or now a phone. Nobody is speaking much.', fa: 'همه سر سفره‌اند. همه چیزی نو پوشیده‌اند، چون برای سال تحویل لباس نو می‌پوشند. تلویزیون روشن است و شمارش معکوس را نشان می‌دهد، یا یکی رادیو گرفته، یا این روزها گوشی. کسی زیاد حرف نمی‌زند.' },
      { t: 'p', x: 'And then the cannon goes, or the announcer says it, and the year has turned. And in that instant the room detonates. Everyone kisses everyone. The eldest gives out money, crisp notes kept in the Quran or the Hafez all year for exactly this. Somebody is crying and pretending not to.', fa: 'و بعد توپ در می‌رود، یا گوینده می‌گوید، و سال تحویل شده است. و در همان لحظه اتاق منفجر می‌شود. همه همدیگر را می‌بوسند. بزرگ‌تر عیدی می‌دهد؛ اسکناس‌های نو و تانخورده که تمام سال لای قرآن یا لای دیوان حافظ مانده‌اند، دقیقاً برای همین لحظه. یکی دارد گریه می‌کند و وانمود می‌کند که نمی‌کند.' },
      { t: 'mark', x: 'It happens at three in the afternoon or at four in the morning. The sun does not care, and neither does anyone at the table.', fa: 'ممکن است ساعت سه بعدازظهر باشد یا چهار صبح. خورشید اهمیتی نمی‌دهد، و هیچ‌کس سر آن سفره هم نمی‌دهد.' },
      { t: 'p', x: 'That last part matters. Because the moment is astronomical, Nowruz arrives whenever it arrives. Families set alarms for the middle of the night and wake the children and sit at the table at four in the morning in their new clothes, because you do not miss it.', fa: 'همین نکتهٔ آخر مهم است. چون آن لحظه نجومی است، نوروز هر وقت که برسد می‌رسد. خانواده‌ها برای نیمه‌شب ساعت کوک می‌کنند، بچه‌ها را بیدار می‌کنند، و ساعت چهار صبح با لباس نو سر سفره می‌نشینند؛ چون سال تحویل را از دست نمی‌دهند.' },
      { t: 'h', x: 'And then the book', fa: 'و بعد، آن کتاب' },
      { t: 'ptext', x: 'Someone reaches for the {{hafez|Hafez}}. A wish is held, the book is opened at random, and the verse is read aloud to the whole family, and everyone argues about what it means for the year ahead. It is the first thing done in the new year, and it is done with a poem.', fa: 'یکی دست به سوی {{hafez|دیوان حافظ}} می‌برد. نیت می‌کنند، کتاب را بی‌قصد باز می‌کنند، و بیت را بلند برای تمام خانواده می‌خوانند، و همه سر اینکه برای سالِ پیش رو چه معنایی دارد بحث می‌کنند. نخستین کاری که در سال نو انجام می‌شود همین است، و با یک شعر انجام می‌شود.' },
    ],
  },
  {
    key: 'n6', title: 'Thirteen Days', titleFa: 'سیزده روز', nav: 'The Visits', navFa: 'دید و بازدید',
    subtitle: 'WHAT COMES AFTER',
    blocks: [
      { t: 'p', x: 'The moment is not the holiday. The holiday is thirteen days long, and it has rules older than anyone can explain.', fa: 'آن لحظه، خودِ عید نیست. عید سیزده روز است، و قاعده‌هایی دارد کهن‌تر از آنکه کسی بتواند توضیحشان دهد.' },
      { t: 'days', items: [
        { d: 'Days 1 to 12', dFa: 'روز اول تا دوازدهم', n: 'Did o Bazdid', nFa: 'دید و بازدید', x: 'Visiting. And there is an order to it: the young go to the old first, never the other way round. You visit your grandparents, then your parents, then outward. Everyone is fed. Nobody is allowed to leave quickly.', fa: 'ترتیبی هم دارد: کوچک‌ترها اول به دیدن بزرگ‌ترها می‌روند، هرگز برعکس. اول خانهٔ پدربزرگ و مادربزرگ، بعد پدر و مادر، بعد بقیه. به همه غذا داده می‌شود. و اجازه نمی‌دهند کسی زود بلند شود.' },
        { d: 'Every visit', dFa: 'هر دیدار', n: 'Eydi', nFa: 'عیدی', x: 'The elders give money to the young. New notes, always. A child can make a small fortune over thirteen days and will be talking about it for a year.', fa: 'بزرگ‌ترها به کوچک‌ترها پول می‌دهند. همیشه هم اسکناس نو. یک بچه می‌تواند در سیزده روز ثروت کوچکی جمع کند و تا یک سال دربارهٔ آن حرف بزند.' },
        { d: 'The whole time', dFa: 'در تمام این مدت', n: 'Ajil and shirini', nFa: 'آجیل و شیرینی', x: 'Nuts, dried fruit, and pastry, in every house, in the same bowls, and you must eat some in each one, and there are eleven more houses.', fa: 'آجیل و خشکبار و شیرینی، در هر خانه، در همان ظرف‌های همیشگی، و باید در هر خانه کمی بخوری؛ و یازده خانهٔ دیگر هم مانده.' },
        { d: 'Day 13', dFa: 'روز سیزدهم', n: 'Sizdah Bedar', nFa: 'سیزده‌بدر', x: 'Everyone goes outside. Not some people. Everyone.', fa: 'همه از خانه بیرون می‌روند. نه بعضی‌ها. همه.' },
      ] },
    ],
  },
  {
    key: 'n7', title: 'Out on the Thirteenth', titleFa: 'سیزده‌بدر', nav: 'Sizdah', navFa: 'سیزده',
    subtitle: 'SIZDAH BEDAR',
    blocks: [
      { t: 'p', x: 'Thirteen is unlucky, so on the thirteenth day of the year the entire country leaves the house and spends the whole day outdoors. Every park, every roadside, every scrap of grass in Iran is covered in families on carpets, cooking, sleeping, playing, from morning until dark. It is possibly the largest simultaneous picnic on earth.', fa: 'سیزده نحس است، پس روز سیزدهم سال تمام کشور از خانه بیرون می‌زند و تمام روز را بیرون می‌گذراند. هر پارک، هر حاشیهٔ جاده، هر تکه چمن در ایران پر می‌شود از خانواده‌هایی روی فرش؛ می‌پزند، می‌خوابند، بازی می‌کنند، از صبح تا تاریکی. شاید بزرگ‌ترین پیک‌نیک همزمان روی زمین باشد.' },
      { t: 'p', x: 'To stay indoors is bad luck. So nobody does.', fa: 'ماندن در خانه نحسی می‌آورد. پس هیچ‌کس نمی‌ماند.' },
      { t: 'h', x: 'The sabzeh goes into the water', fa: 'سبزه را به آب می‌سپارند' },
      { t: 'p', x: 'And you bring the sprouts. The sabzeh that has sat on the table for thirteen days, absorbing whatever was in the house, is carried out and thrown into running water and let go. Whatever it took on goes downstream.', fa: 'و سبزه را هم با خودت می‌بری. همان سبزه‌ای که سیزده روز سر سفره نشسته و هر چه در خانه بوده به خود گرفته، بیرون برده می‌شود و به آب روان سپرده می‌شود و رها. هر چه برداشته، با آب می‌رود.' },
      { t: 'h', x: 'And the knot', fa: 'و آن گره' },
      { t: 'p', x: 'Before you throw it, unmarried young people tie a knot in the grass and make a wish. Tying the knot is asking for the tie: a marriage, a person, a life. Untying it is left to whoever finds it, which is the joke and also not a joke.', fa: 'پیش از آنکه به آبش بسپاری، جوان‌های مجرد گرهی به سبزه می‌زنند و آرزویی می‌کنند. گره زدن یعنی خواستنِ همان گره: یک ازدواج، یک نفر، یک زندگی. باز کردنش هم به عهدهٔ هر کسی است که پیدایش کند، که هم شوخی است و هم نیست.' },
      { t: 'knot' },
      { t: 'close', glyph: 'نوروز', x: 'A new year that begins at an exact second decided by the sun and not by a committee. A fire you give your tiredness to. A table with an apple for youth and a vinegar for age sitting side by side. Thirteen days of being fed by people who love you. And then everyone, the whole country at once, out on the grass, letting the year troubles go downstream. It has outlived every empire that tried to end it, and it will be here next spring, at the second, whatever else has happened.', fa: 'سال نویی که در ثانیه‌ای دقیق آغاز می‌شود، ثانیه‌ای که خورشید تعیینش کرده نه هیچ کمیته‌ای. آتشی که خستگی‌ات را به آن می‌دهی. سفره‌ای که سیب برای جوانی و سرکه برای پیری، کنار هم رویش نشسته‌اند. سیزده روز که کسانی که دوستت دارند سیرت می‌کنند. و بعد همه، یک کشور تمام و یکجا، روی چمن، تا سختی‌های سال را به آب بسپارند. از هر امپراتوری‌ای که خواست تمامش کند عمر بیشتری کرده، و بهار بعد هم سر همان ثانیه اینجاست، هر چه هم که در این میان گذشته باشد.' },
    ],
  },
];
