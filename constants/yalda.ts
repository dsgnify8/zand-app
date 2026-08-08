// Yalda: the longest night. Deep and warm, the opposite of the Nowruz page.

export const yl = {
  bg: '#241A1E',
  bgLift: '#31232A',
  surface: '#3A2A31',
  raised: '#46333B',
  text: '#F0E6E8',
  textDim: '#B09099',
  hair: '#584249',
  gold: '#C9A05C',
  anar: '#A82C3E',
  wine: '#6E2338',
  cream: '#E8DCC8',
  rose: '#BF949F',
};

// The December solstice, computed to the minute. Yalda is the night it falls on.
export const YALDA_MOMENTS = [
  '2026-12-21T20:50:13Z',
  '2027-12-22T02:42:17Z',
  '2028-12-21T08:20:07Z',
  '2029-12-21T14:14:24Z',
  '2030-12-21T20:09:34Z',
  '2031-12-22T01:56:05Z',
  '2032-12-21T07:56:13Z',
  '2033-12-21T13:45:43Z',
  '2034-12-21T19:34:03Z',
  '2035-12-22T01:31:00Z',
  '2036-12-21T07:12:54Z',
  '2037-12-21T13:07:50Z',
  '2038-12-21T19:02:15Z',
  '2039-12-22T00:40:59Z',
  '2040-12-21T06:33:15Z',
];

export type YlBlock =
  | { t: 'p'; x: string }
  | { t: 'ptext'; x: string }
  | { t: 'h'; x: string }
  | { t: 'lead'; x: string }
  | { t: 'mark'; x: string }
  | { t: 'aside'; x: string }
  | { t: 'solstice' }
  | { t: 'anar' }
  | { t: 'nightarc' }
  | { t: 'table'; items: { fa: string; en: string; x: string }[] }
  | { t: 'img'; key: string; cap?: string }
  | { t: 'close'; glyph: string; x: string };

export type YlChapter = { key: string; title: string; nav: string; subtitle?: string; blocks: YlBlock[] };

export const YALDA_CHAPTERS: YlChapter[] = [
  {
    key: 'y1', title: 'The Longest Night', titleFa: 'درازترین شب', nav: 'The Night', navFa: 'شب',
    subtitle: 'شب یلدا',
    blocks: [
      { t: 'lead', x: 'One night a year, the dark wins. So Iranians sit up and refuse to let it happen alone.', fa: 'سالی یک شب، تاریکی می‌برد. پس ایرانی‌ها بیدار می‌مانند و نمی‌گذارند این اتفاق در تنهایی بیفتد.' },
      { t: 'p', x: 'Shab e Yalda is the winter solstice, the longest night of the year, and it is the last night of autumn. After it, every night is shorter than the one before. The dark has reached its maximum and begins, from that hour, to lose.', fa: 'شب یلدا همان انقلاب زمستانی است، درازترین شب سال، و آخرین شب پاییز. پس از آن، هر شب از شب پیش کوتاه‌تر است. تاریکی به بیشترین اندازهٔ خود رسیده و از همان ساعت شروع می‌کند به باختن.' },
      { t: 'p', x: 'And the response to it is not to sleep through it. It is to gather at the eldest person house, light the room, cover a table in red fruit, and stay awake until the sun comes back.', fa: 'و پاسخ به آن، خوابیدن تا صبح نیست. این است که در خانهٔ بزرگ‌ترِ فامیل جمع شوی، اتاق را روشن کنی، سفره‌ای پر از میوهٔ سرخ بچینی، و تا بازگشتن خورشید بیدار بمانی.' },
      { t: 'solstice' },
      { t: 'mark', x: 'You do not survive the longest night. You throw a party in the middle of it.', fa: 'درازترین شب را تحمل نمی‌کنی. وسطش بساط جشن راه می‌اندازی.' },
    ],
  },
  {
    key: 'y2', title: 'What the Name Means', titleFa: 'نام از کجا آمده', nav: 'The Root', navFa: 'ریشه',
    subtitle: 'WHERE IT COMES FROM',
    blocks: [
      { t: 'p', x: 'Yalda is not a Persian word. It is Syriac, and it means birth. It came into Persian through the Christian communities of the region, and it was borrowed for exactly one reason: on this night, something is born.', fa: 'یلدا واژه‌ای فارسی نیست. سریانی است و معنایش زایش است. از راه جامعه‌های مسیحی این منطقه به فارسی آمد، و دقیقاً به یک دلیل وام گرفته شد: در این شب، چیزی زاده می‌شود.' },
      { t: 'p', x: 'The other name is older and more Persian. Shab e Chelleh, the night of the forty, because it opens the first forty day stretch of winter. Iranians count winter in two chelleh, the big one and the small one, and this night is the door into the first.', fa: 'نام دیگرش کهن‌تر است و ایرانی‌تر: شب چله، چون چهل روز نخست زمستان را می‌گشاید. ایرانی‌ها زمستان را با دو چله می‌شمارند، چلهٔ بزرگ و چلهٔ کوچک، و این شب دروازهٔ چلهٔ اول است.' },
      { t: 'h', x: 'The sun is born tonight', fa: 'امشب خورشید زاده می‌شود' },
      { t: 'p', x: 'Underneath it is Zoroastrian, and it is the same argument as Nowruz seen from the other end of the year. Light and dark are in a real contest. On this night dark holds its greatest possible territory, and then loses it, and every night after is a retreat. So the sun is born at dawn, and Mithra, the ancient Iranian divinity of the sun and of covenant, is associated with that dawn.', fa: 'زیرِ همهٔ اینها اندیشه‌ای زرتشتی نشسته است، و همان استدلال نوروز است که از آن سرِ دیگر سال دیده شود. روشنایی و تاریکی به‌راستی در نبردند. در این شب، تاریکی بیشترین قلمروی ممکنش را در دست دارد، و بعد از دستش می‌دهد، و هر شب پس از آن یک عقب‌نشینی است. پس خورشید سپیده‌دم زاده می‌شود، و مهر، ایزد کهن ایرانی خورشید و پیمان، با همان سپیده پیوند خورده است.' },
      { t: 'p', x: 'You will often see it claimed that this is where the December date of Christmas comes from, through the Roman cult of Mithras. It is a popular claim and a genuinely disputed one, and honest scholars disagree about how much the Roman Mithras owes to the Iranian Mithra at all. What is not disputed is simpler: people at this latitude have been marking the turn of the dark for as long as there have been people here.', fa: 'بارها می‌شنوی که می‌گویند تاریخ کریسمس در دسامبر از همین‌جا آمده، از راه آیین میترای رومی. ادعایی است رایج و به‌راستی محل بحث، و پژوهشگران منصف بر سر اینکه میترای رومی اصلاً چقدر به مهرِ ایرانی بدهکار است اختلاف دارند. آنچه محل بحث نیست ساده‌تر است: مردمِ این عرض جغرافیایی، از وقتی که در اینجا مردمی بوده، چرخش تاریکی را نشان کرده‌اند.' },
      { t: 'nightarc' },
    ],
  },
  {
    key: 'y3', title: 'The Red Table', titleFa: 'سفرهٔ سرخ', nav: 'The Table', navFa: 'سفره',
    subtitle: 'WHAT IS ON IT',
    blocks: [
      { t: 'p', x: 'The table is red, and it is red on purpose. Red is the colour of the dawn that is coming, and every important thing on the table has it.', fa: 'سفره سرخ است، و عمداً سرخ است. سرخ رنگ همان سپیده‌ای است که در راه است، و هر چیز مهمی که روی سفره است این رنگ را دارد.' },
      { t: 'table', items: [
        { fa: 'هندوانه', en: 'Watermelon', x: 'The strange one. A summer fruit, kept for months, cut open in the deepest cold of the year. It is said to keep you from falling ill all winter. Really, it is a piece of summer opened in the dark, in a room in December, and everyone watching the knife go in.' },
        { fa: 'انار', en: 'Pomegranate', x: 'The heart of the table. Red skin, red seeds, red juice. An old Iranian symbol of birth and of life, and the fruit is broken open on the longest night to spill the colour of the sunrise across the table.' },
        { fa: 'آجیل', en: 'Ajil', x: 'The nut mix, in a bowl, all night. Pistachios, almonds, roasted chickpeas, figs, dried mulberries. It exists so nobody ever has to stop eating, because stopping is how a night ends early.' },
        { fa: 'چای', en: 'Chai', x: 'Endlessly. The samovar stays on until dawn, because the night has to be held up somehow and this is what holds it.' },
      ] },
      { t: 'anar' },
    ],
  },
  {
    key: 'y4', title: 'The Book and the Grandmother', titleFa: 'کتاب و مادربزرگ', nav: 'The Night Itself', navFa: 'خودِ شب',
    subtitle: 'WHAT ACTUALLY HAPPENS',
    blocks: [
      { t: 'p', x: 'What Yalda actually is, underneath the fruit, is old people talking and young people listening.', fa: 'یلدا، زیر آن‌همه میوه، در واقع یعنی بزرگ‌ترها حرف بزنند و کوچک‌ترها گوش بدهند.' },
      { t: 'p', x: 'Everyone goes to the grandparents. The children are allowed to stay up, which at that age is the entire point. And then, for hours, the stories come out. The village, the war, the people who are gone, the ones who left and did not come back, and how things were, which is a subject with no bottom to it.', fa: 'همه به خانهٔ پدربزرگ و مادربزرگ می‌روند. به بچه‌ها اجازه می‌دهند بیدار بمانند، که در آن سن‌وسال تمام ماجرا همین است. و بعد، ساعت‌ها، قصه‌ها بیرون می‌آید. از ده، از جنگ، از کسانی که دیگر نیستند، از آنها که رفتند و برنگشتند، و از اینکه اوضاع چطور بود؛ که موضوعی است بی‌ته.' },
      { t: 'h', x: 'And the book comes out', fa: 'و بعد کتاب می‌آید' },
      { t: 'ptext', x: 'And at some point someone reaches for the {{hafez|Hafez}}. This is the second of the two nights a year when an entire country asks a poem for an answer. You hold your question, you open it at random, and the eldest reads it aloud, and everyone in the room argues about what it means for you.', fa: 'و جایی در همان شب، یکی دست به سوی {{hafez|دیوان حافظ}} می‌برد. این دومینِ آن دو شبی در سال است که یک کشور تمام، پاسخش را از یک شعر می‌خواهد. نیت می‌کنی، بی‌قصد بازش می‌کنی، بزرگ‌ترِ جمع بلند می‌خواندش، و همهٔ اهل اتاق سر اینکه برای تو چه معنایی دارد بحث می‌کنند.' },
      { t: 'mark', x: 'On the longest night of the year, a nation opens a book of poems and asks it what happens next.', fa: 'در درازترین شب سال، یک ملت دیوان شعری را می‌گشاید و از آن می‌پرسد بعد چه می‌شود.' },
      { t: 'p', x: 'Some families read the Shahnameh instead, or as well, and the children fall asleep somewhere in the middle of Rostam, which is how it is supposed to go.', fa: 'بعضی خانواده‌ها به جایش شاهنامه می‌خوانند، یا هر دو را، و بچه‌ها جایی وسط داستان رستم خوابشان می‌برد؛ که دقیقاً همان‌طوری است که باید باشد.' },
      { t: 'aside', x: 'There is no religion in any of this, and there never was. It is a family, a table, and a poet.', fa: 'در هیچ‌کدام از اینها دینی در کار نیست، و هرگز هم نبوده. یک خانواده است، یک سفره، و یک شاعر.' },
    ],
  },
  {
    key: 'y5', title: 'Why It Held', titleFa: 'چرا ماند', nav: 'Why', navFa: 'چرا',
    subtitle: 'AND WHAT IT IS FOR',
    blocks: [
      { t: 'p', x: 'Like Nowruz, Yalda had no protection. It is not Islamic. It comes from the faith that was replaced, it has no doctrine, no clergy, and nothing about it is required of anyone. It should have quietly disappeared a thousand years ago.', fa: 'یلدا هم مثل نوروز هیچ پشتیبانی نداشت. اسلامی نیست. از همان آیینی می‌آید که جایش را گرفتند، مکتبی ندارد، روحانی‌ای ندارد، و هیچ چیزش بر کسی واجب نیست. باید هزار سال پیش بی‌سروصدا از میان می‌رفت.' },
      { t: 'p', x: 'It did not, and the reason is not religious. It is that on the darkest night of the year, in a cold country, an old idea says: go to the people you belong to, sit with them until morning, and do not be alone while the dark is at its worst.', fa: 'نرفت، و دلیلش دینی نیست. دلیلش این است که در تاریک‌ترین شب سال، در سرزمینی سرد، اندیشه‌ای کهن می‌گوید: برو پیش کسانی که به آنها تعلق داری، تا صبح کنارشان بنشین، و تا وقتی تاریکی در بدترین حالش است تنها نباش.' },
      { t: 'mark', x: 'It survived because the instruction is good, and because it costs nothing, and because it works.', fa: 'ماند، چون دستورش خوب است، چون هیچ خرجی ندارد، و چون جواب می‌دهد.' },
      { t: 'p', x: 'And it is kept by everyone. Muslims keep it. Jews keep it. Zoroastrians keep it. Iranians who believe in nothing at all keep it. Afghans and Tajiks and Kurds keep it. And Iranians abroad keep it hardest of all, in December, in cities where nobody around them has ever heard of it, cutting a watermelon at midnight because their grandmother did.', fa: 'و همه نگهش می‌دارند. مسلمان نگهش می‌دارد. یهودی نگهش می‌دارد. زرتشتی نگهش می‌دارد. ایرانی‌ای که به هیچ چیز باور ندارد نگهش می‌دارد. افغان و تاجیک و کرد نگهش می‌دارند. و ایرانی‌های خارج از کشور از همه سفت‌تر نگهش می‌دارند؛ در دسامبر، در شهرهایی که هیچ‌کس دور و برشان اسمش را هم نشنیده، نیمه‌شب هندوانه‌ای می‌برند، چون مادربزرگشان می‌برید.' },
      { t: 'close', glyph: 'یلدا', x: 'The night the dark reaches as far as it can go and then begins, from that hour, to lose. Iranians answer it by staying awake in a warm room, with red fruit on the table and a poet in someone hand, and the oldest person present talking until the young ones fall asleep. Nothing is asked of you. Nobody is converted. You simply do not spend the longest night alone. It has outlasted every empire that arrived after it, and it will come again in December, at the minute, whatever else has happened.', fa: 'شبی که تاریکی تا هر کجا که می‌تواند پیش می‌رود و بعد، از همان ساعت، شروع می‌کند به باختن. ایرانی‌ها پاسخش را این‌طور می‌دهند: در اتاقی گرم بیدار می‌مانند، با میوهٔ سرخ روی سفره و دیوان شعری در دست کسی، و بزرگ‌ترین فردِ حاضر حرف می‌زند تا کوچک‌ترها خوابشان ببرد. چیزی از تو خواسته نمی‌شود. کسی به دینی دعوت نمی‌شود. فقط درازترین شب را تنها نمی‌گذرانی. از هر امپراتوری‌ای که پس از آن آمد بیشتر عمر کرده، و دسامبر دوباره می‌آید، سرِ همان دقیقه، هر چه هم که در این میان گذشته باشد.' },
    ],
  },
];
