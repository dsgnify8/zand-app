// Geography: the land of Iran, its place in the world, its provinces and cities.
// Uses the dark reader palette so maps and landscape imagery sit well.

export type ProvinceDot = { name: string; persian: string; x: number; y: number; fact: string; factFa?: string };

export const PROVINCE_DOTS: ProvinceDot[] = [
  { name: 'West Azarbaijan', persian: 'آذربایجان غربی', x: 0.0566, y: 0.0863, fact: 'Home to Lake Urmia, once the largest lake in the Middle East, and to the ancient fortress of Takht e Soleyman, a Sasanian fire temple ringed by a volcanic lake.', factFa: 'خانهٔ دریاچهٔ ارومیه، که روزگاری بزرگ‌ترین دریاچهٔ خاورمیانه بود، و تخت سلیمان، آتشکده‌ای ساسانی که دریاچه‌ای آتشفشانی دورش حلقه زده.' },
  { name: 'East Azarbaijan', persian: 'آذربایجان شرقی', x: 0.1241, y: 0.1411, fact: 'Its capital Tabriz has one of the oldest and largest covered bazaars on earth, a labyrinth of brick vaults that has traded since antiquity.', factFa: 'تبریز، مرکزش، یکی از کهن‌ترین و بزرگ‌ترین بازارهای سرپوشیدهٔ جهان را دارد؛ هزارتویی از طاق‌های آجری که از دوران باستان داد و ستد در آن جریان داشته.' },
  { name: 'Ardebil', persian: 'اردبیل', x: 0.2231, y: 0.1218, fact: 'The birthplace of the Safavid order, whose shrine complex here became the spiritual seed of the dynasty that reunified Iran.', factFa: 'زادگاه طریقت صفوی، که بقعه‌اش اینجا بذر معنوی سلسله‌ای شد که ایران را دوباره یکپارچه کرد.' },
  { name: 'Gilan', persian: 'گیلان', x: 0.3026, y: 0.2008, fact: 'Green and rain soaked on the Caspian shore, it grows most of Iran rice and tea, a landscape that looks nothing like the deserts people imagine.', factFa: 'سبز و باران‌خورده در کنارهٔ خزر، بیشتر برنج و چای ایران را می‌رویاند؛ چشم‌اندازی که هیچ شباهتی به کویرهای تصور مردم ندارد.' },
  { name: 'Kordestan', persian: 'کردستان', x: 0.1668, y: 0.2886, fact: 'Mountain country of the Zagros, where the village of Palangan climbs a gorge in stacked stone terraces, each roof the neighbour courtyard.', factFa: 'سرزمین کوهستانی زاگرس، جایی که روستای پالنگان روی دیوارهٔ درّه بالا می‌رود، پله‌پله از سنگ، و بام هر خانه حیاط خانهٔ بالایی است.' },
  { name: 'Kermanshah', persian: 'کرمانشاه', x: 0.1269, y: 0.3644, fact: 'Site of Bisotun, where Darius the Great carved his victory into a cliff in three languages, the inscription that unlocked cuneiform for the modern world.', factFa: 'جایگاه بیستون، جایی که داریوش بزرگ پیروزی‌اش را به سه زبان بر صخره کند؛ همان سنگ‌نوشته‌ای که کلید خط میخی را به دست جهان امروز داد.' },
  { name: 'Ilam', persian: 'ایلام', x: 0.1445, y: 0.4438, fact: 'Oak forests of the Zagros cover its hills, remnants of the woodland that once clothed the whole western spine of Iran.', factFa: 'جنگل‌های بلوط زاگرس تپه‌هایش را پوشانده‌اند، بازماندهٔ جنگلی که روزگاری تمام ستون فقرات غربی ایران را می‌پوشاند.' },
  { name: 'Khuzestan', persian: 'خوزستان', x: 0.2629, y: 0.547, fact: 'The cradle of Elam, one of the oldest civilizations on earth, and home to Choqa Zanbil, a ziggurat raised more than three thousand years ago.', factFa: 'گهوارهٔ ایلام، از کهن‌ترین تمدن‌های روی زمین، و خانهٔ چغازنبیل، زیگوراتی که بیش از سه هزار سال پیش برافراشته شد.' },
  { name: 'North Khorasan', persian: 'خراسان شمالی', x: 0.6617, y: 0.1655, fact: 'Rolling steppe on the old road to Central Asia, long a crossing place for the peoples who moved between Iran and the grasslands beyond.', factFa: 'دشت‌های موّاج بر سر راه کهن آسیای میانه؛ دیرزمانی گذرگاه مردمانی که میان ایران و علفزارهای آن سو در رفت و آمد بودند.' },
  { name: 'Golestan', persian: 'گلستان', x: 0.5807, y: 0.1742, fact: 'Guarded by the Great Wall of Gorgan, a Sasanian rampart nearly two hundred kilometres long, older and longer than most of Hadrian Wall.', factFa: 'دیوار بزرگ گرگان نگهبانش بوده، بارویی ساسانی به درازای نزدیک دویست کیلومتر، کهن‌تر و بلندتر از بیشتر دیوار هادریان.' },
  { name: 'Mazandaran', persian: 'مازندران', x: 0.4712, y: 0.246, fact: 'Between the Caspian and the Alborz, its forests are among the oldest living woodlands on the planet, surviving the last ice age intact.', factFa: 'میان خزر و البرز، جنگل‌هایش از کهن‌ترین جنگل‌های زندهٔ سیاره‌اند؛ آخرین عصر یخبندان را دست‌نخورده از سر گذرانده‌اند.' },
  { name: 'Razavi Khorasan', persian: 'خراسان رضوی', x: 0.7783, y: 0.2868, fact: 'Mashhad draws millions of pilgrims a year, and nearby Tus was the home of Ferdowsi, who wrote the Shahnameh and saved the Persian language.', factFa: 'مشهد سالانه میلیون‌ها زائر را به خود می‌کشد، و توسِ نزدیکش خانهٔ فردوسی بود؛ کسی که شاهنامه را سرود و زبان فارسی را نگه داشت.' },
  { name: 'South Khorasan', persian: 'خراسان جنوبی', x: 0.7919, y: 0.5066, fact: 'Its saffron fields produce much of the world supply, gram for gram the most expensive spice on earth, grown from a purple autumn crocus.', factFa: 'زعفران‌زارهایش بخش بزرگی از عرضهٔ جهان را تأمین می‌کنند؛ گرم به گرم گران‌ترین ادویهٔ روی زمین، برآمده از گلی بنفش که در پاییز می‌شکفد.' },
  { name: 'Semnan', persian: 'سمنان', x: 0.5787, y: 0.2966, fact: 'Where the mountains give way to the Dasht e Kavir, the great salt desert, a surface so hostile that little grows and the crust cracks into plates.', factFa: 'جایی که کوه‌ها جا را به دشت کویر می‌دهند، کویر بزرگ نمک؛ سطحی چنان نامهربان که چیزی در آن نمی‌روید و پوسته‌اش به قطعه‌قطعه می‌شکافد.' },
  { name: 'Tehran', persian: 'تهران', x: 0.3881, y: 0.2943, fact: 'A modest town the Qajars chose as their capital, now a metropolis of millions rising against the snow line of the Alborz.', factFa: 'شهرکی ساده که قاجارها پایتختش کردند، و حالا کلان‌شهری میلیونی است که پای خط برف البرز قد کشیده.' },
  { name: 'Alborz', persian: 'البرز', x: 0.3592, y: 0.265, fact: 'Named for the mountain range that walls off the Caspian, the range that in myth holds the peak where the hero Fereydun bound the tyrant Zahhak.', factFa: 'نامش از رشته‌کوهی است که خزر را پشت دیوار نگه می‌دارد؛ همان رشته‌کوهی که در اسطوره قله‌ای را در خود دارد که فریدون، ضحاک را در آن به بند کشید.' },
  { name: 'Qazvin', persian: 'قزوین', x: 0.3109, y: 0.2608, fact: 'A former Safavid capital, and gateway to Alamut, the mountain valley where the fortress of the Assassins once commanded the passes.', factFa: 'روزگاری پایتخت صفوی، و دروازهٔ الموت؛ درّه‌ای کوهستانی که دژ حشاشین از آن بر گذرگاه‌ها فرمان می‌راند.' },
  { name: 'Zanjan', persian: 'زنجان', x: 0.2383, y: 0.2291, fact: 'Home to Soltaniyeh, whose vast turquoise dome is one of the largest brick domes ever raised, and a direct ancestor of the Taj Mahal.', factFa: 'خانهٔ سلطانیه، که گنبد فیروزه‌ای بزرگش از بزرگ‌ترین گنبدهای آجری برافراشته‌شدهٔ جهان است و نیای مستقیم تاج‌محل.' },
  { name: 'Hamadan', persian: 'همدان', x: 0.2493, y: 0.3283, fact: 'Built on Ecbatana, capital of the Medes, making it one of the oldest continuously inhabited cities in the world.', factFa: 'بر هگمتانه بنا شده، پایتخت مادها؛ و همین آن را از کهن‌ترین شهرهای پیوسته مسکون جهان می‌کند.' },
  { name: 'Markazi', persian: 'مرکزی', x: 0.3023, y: 0.3789, fact: 'Its name simply means central, and it sits at the meeting of the Zagros and the plateau, long a corridor between north and south.', factFa: 'نامش به‌سادگی یعنی میانی، و درست بر محل تلاقی زاگرس و فلات نشسته؛ دیرزمانی راهرویی میان شمال و جنوب.' },
  { name: 'Qom', persian: 'قم', x: 0.3702, y: 0.3441, fact: 'A centre of religious learning for centuries, its seminaries drawing scholars from across the Islamic world.', factFa: 'قرن‌هاست مرکز آموزش دینی است و حوزه‌هایش طلبه و عالم را از سراسر جهان اسلام به خود کشیده‌اند.' },
  { name: 'Lorestan', persian: 'لرستان', x: 0.2133, y: 0.4265, fact: 'The Lurs of these mountains produced the famed Luristan bronzes, intricate animal figures cast three thousand years ago.', factFa: 'لُرهای این کوه‌ها مفرغ‌های نامدار لرستان را ساختند؛ پیکره‌های ظریف جانوری که سه هزار سال پیش ریخته‌گری شده‌اند.' },
  { name: 'Esfahan', persian: 'اصفهان', x: 0.4126, y: 0.45, fact: 'Its capital was called half the world, and the square Shah Abbas laid out remains among the largest and most beautiful ever built.', factFa: 'مرکزش را نصف جهان خوانده‌اند، و میدانی که شاه عباس طرحش را ریخت هنوز از بزرگ‌ترین و زیباترین میدان‌های ساخته‌شدهٔ جهان است.' },
  { name: 'Chahar Mahall and Bakhtiari', persian: 'چهارمحال و بختیاری', x: 0.3552, y: 0.5357, fact: 'Country of the Bakhtiari, whose tribes still drive their herds over the Zagros twice a year, one of the great migrations left on earth.', factFa: 'سرزمین بختیاری، که ایل‌هایش هنوز سالی دو بار گله را از زاگرس می‌گذرانند؛ یکی از آخرین کوچ‌های بزرگ باقی‌مانده روی زمین.' },
  { name: 'Kohgiluyeh and Buyer Ahmad', persian: 'کهگیلویه و بویراحمد', x: 0.3549, y: 0.6062, fact: 'Steep and forested, it holds some of the last wild pistachio and oak stands of the southern Zagros.', factFa: 'پرشیب و جنگلی، و نگهدار آخرین بیشه‌های پستهٔ وحشی و بلوط زاگرس جنوبی.' },
  { name: 'Bushehr', persian: 'بوشهر', x: 0.393, y: 0.7451, fact: 'A Gulf port that traded with India and Africa for centuries, its old town built of coral stone against the heat.', factFa: 'بندری در خلیج فارس که قرن‌ها با هند و آفریقا داد و ستد کرد، و بافت کهنش را از سنگ مرجان در برابر گرما ساخته‌اند.' },
  { name: 'Fars', persian: 'فارس', x: 0.4915, y: 0.739, fact: 'The heartland. Persia takes its name from here, and here stand Persepolis, Pasargadae, and the tomb of Cyrus, with Shiraz and its poets.', factFa: 'دلِ سرزمین. نام پارس از همین‌جا برخاسته، و تخت جمشید و پاسارگاد و آرامگاه کوروش همین‌جا ایستاده‌اند، کنار شیراز و شاعرانش.' },
  { name: 'Yazd', persian: 'یزد', x: 0.6277, y: 0.4612, fact: 'A desert city of mud brick and wind towers, the ancient air conditioning of Iran, and a living centre of Zoroastrian faith.', factFa: 'شهری کویری از خشت و بادگیر، تهویهٔ باستانی ایران، و کانونی زنده برای آیین زرتشتی.' },
  { name: 'Kerman', persian: 'کرمان', x: 0.6889, y: 0.6602, fact: 'Holds the Lut desert, where satellites recorded the hottest land surface temperature ever measured on earth, over seventy degrees.', factFa: 'کویر لوت را در خود دارد، جایی که ماهواره‌ها داغ‌ترین دمای سطح زمین را ثبت کردند؛ بیش از هفتاد درجه.' },
  { name: 'Hormozgan', persian: 'هرمزگان', x: 0.621, y: 0.8078, fact: 'Commands the Strait of Hormuz, the narrow gate through which a fifth of the world oil still passes, and the painted hills of Hormuz island.', factFa: 'بر تنگهٔ هرمز مسلط است، همان دروازهٔ باریکی که هنوز یک‌پنجم نفت جهان از آن می‌گذرد، و تپه‌های رنگی جزیرهٔ هرمز.' },
  { name: 'Sistan and Baluchestan', persian: 'سیستان و بلوچستان', x: 0.8447, y: 0.8282, fact: 'Where the Shahnameh places the homeland of Rostam, greatest hero of the Persian epic, and where the wind blows for a hundred and twenty days.', factFa: 'جایی که شاهنامه زادبوم رستم را در آن می‌نشاند، بزرگ‌ترین پهلوان حماسهٔ ایران، و جایی که باد صد و بیست روز می‌وزد.' },
];

export type GeoBlock =
  | { t: 'p'; x: string; fa?: string }
  | { t: 'h'; x: string; fa?: string }
  | { t: 'lead'; x: string; fa?: string }
  | { t: 'map'; key: string; cap?: string; capFa?: string }
  | { t: 'provincemap' }
  | { t: 'img'; key: string; cap?: string; capFa?: string }
  | { t: 'imgwide'; key: string; cap?: string; capFa?: string }
  | { t: 'stat'; items: { n: string; label: string }[] }
  | { t: 'mark'; x: string; fa?: string }
  | { t: 'facts'; items: { k: string; v: string }[] }
  | { t: 'imgrow2'; keys: string[]; cap?: string }
  | { t: 'cities' }
  | { t: 'places' }
  | { t: 'close'; x: string; fa?: string; glyph: string }
  | { t: 'div' };

export type GeoPage = { blocks: GeoBlock[] };
export type GeoChapter = {
  titleFa?: string;
  navFa?: string;
  subtitleFa?: string; key: string; title: string; nav?: string; subtitle?: string; pages: GeoPage[] };

export const GEO_CHAPTERS: GeoChapter[] = [
  {
    key: 'g1',
    title: 'The Beating Heart',
    titleFa: 'قلب تپنده',
    nav: 'The Heart',
    navFa: 'قلب',
    subtitle: 'WHERE IRAN SITS',
    subtitleFa: 'ایران کجا ایستاده است',
    pages: [
      { blocks: [
        { t: 'lead', x: 'Look at a map of the old world and your eye is drawn, almost against its will, to one place.', fa: 'به نقشهٔ دنیای قدیم که نگاه می‌کنی، چشمت بی‌اختیار به یک نقطه جذب می‌شود.' },
        { t: 'p', x: 'Iran sits at the exact hinge of the ancient world. West lies the Mediterranean and the empires of Rome and Byzantium. East lie India and China. North are the steppes of Central Asia. South is the warm water of the Gulf and the sea road to Africa. Everything that moved between these worlds moved through here.', fa: 'ایران درست بر چهارراه دنیای کهن ایستاده است. در غرب، مدیترانه و امپراتوری‌های روم و بیزانس؛ در شرق، هند و چین؛ در شمال، دشت‌های بی‌کران آسیای میانه؛ و در جنوب، آب‌های گرم خلیج فارس و راه دریایی آفریقا. هر چه میان این جهان‌ها رفت و آمد کرده، از ایران گذشته است.' },
        { t: 'map', key: 'iran-crossroads', cap: 'Iran at the hinge of the old world, between the Mediterranean, the steppe, India, and the Gulf.', capFa: 'ایران بر چهارراه دنیای کهن؛ میان مدیترانه، دشت‌های شمال، هند و خلیج فارس.' },
      ] },
      { blocks: [
        { t: 'h', x: 'A bridge, not a corner', fa: 'یک پل، نه یک گوشه' },
        { t: 'p', x: 'Most nations sit at the edge of something. Iran sits in the middle of everything. The Silk Road did not pass by Iran, it passed through it. The goods of China reached Rome through Persian hands. The mathematics of India reached Europe through Persian scholars. This was not an accident of trade. It was geography.', fa: 'بیشتر کشورها در حاشیهٔ چیزی نشسته‌اند. ایران در میانهٔ همه‌چیز. جادهٔ ابریشم از کنار ایران نگذشت، از دلش عبور کرد. کالای چین با دست ایرانی به روم رسید و ریاضیات هند با قلم دانشمند ایرانی به اروپا. این اتفاقِ تجارت نبود، جغرافیا بود.' },
        { t: 'mark', x: 'Iran is not on the way to somewhere. It is the way.', fa: 'ایران سرِ راهِ جایی نیست؛ خودش راه است.' },
        { t: 'p', x: 'A land in the middle of everything receives everything, and gives everything back changed. That is why Persian civilization has always been a civilization of synthesis, taking in the world and returning it transformed, in art, in language, in thought.', fa: 'سرزمینی که در میانهٔ همه‌چیز باشد، همه‌چیز را می‌گیرد و دگرگون‌شده پس می‌دهد. برای همین تمدن ایرانی همیشه تمدنِ آمیختن بوده است: جهان را در خود می‌گیرد و پرمایه‌تر بازمی‌گرداند؛ در هنر، در زبان، در اندیشه.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The shape of the land', fa: 'شکل سرزمین' },
        { t: 'p', x: 'Iran is a high plateau, ringed by mountains like the rim of a bowl. The Zagros run down its western flank, the Alborz wall off the Caspian in the north, and within their embrace lie the great deserts, the Dasht e Kavir and the Dasht e Lut.', fa: 'ایران فلاتی بلند است، حلقه‌زده در کوه‌ها، مثل لبهٔ یک کاسه. زاگرس در غرب پایین می‌آید، البرز در شمال دریای خزر را پشت دیوار نگه می‌دارد، و در آغوش این دو، کویرهای بزرگ نشسته‌اند: دشت کویر و دشت لوت.' },
        { t: 'stat', items: [
          { n: '1.6M', label: 'Square kilometres, the eighteenth largest country on earth' },
          { n: '5,610m', label: 'Damavand, the highest peak in the Middle East' },
          { n: '31', label: 'Provinces, from Caspian forest to Gulf coast' },
          { n: '7', label: 'Land neighbours, more than almost any nation' },
        ] },
        { t: 'p', x: 'This is a country that holds rainforest and salt desert, snowfield and mangrove, sometimes within a single day of travel. Few nations on earth contain such extremes inside one border.', fa: 'کشوری است که جنگل بارانی و کویر نمک را با هم دارد، برف و حرا را، گاهی به فاصلهٔ یک روز راه. کمتر جایی روی زمین این‌همه تضاد را در یک مرز جا داده است.' },
      ] },
    ],
  },
  {
    key: 'g2',
    title: 'The Gift and the Burden',
    titleFa: 'موهبت و مسئولیت',
    nav: 'History',
    navFa: 'تاریخ',
    subtitle: 'GEOGRAPHY THROUGH HISTORY',
    subtitleFa: 'جغرافیا در گذر تاریخ',
    pages: [
      { blocks: [
        { t: 'p', x: 'To sit at the centre of the world is a gift and a burden, and Iran has known both in full measure. The same position that brought wealth brought armies. The same openness that let ideas in let invaders in.', fa: 'در مرکز جهان نشستن هم موهبت است و هم مسئولیت، و ایران هر دو را تمام و کمال چشیده است. همان موقعیتی که ثروت آورد، لشکرکشی هم آورد. همان دری که اندیشه را به درون راه داد، مهاجم را هم راه داد.' },
      ] },
      { blocks: [
        { t: 'h', x: 'What the land gave', fa: 'آنچه این سرزمین بخشید' },
        { t: 'p', x: 'The mountains were a fortress. Time and again the Zagros and the Alborz broke the force of invasion, and gave the people of the plateau a place to gather and return. The Parthians used this country to hold Rome at the Euphrates for three centuries. Rome never crossed the plateau.', fa: 'کوه‌ها دژ بودند. بارها و بارها زاگرس و البرز شتاب حمله را شکستند و به مردم فلات جایی دادند تا گرد هم آیند و بازگردند. اشکانیان با همین سرزمین سه قرن روم را پشت فرات نگه داشتند. روم هرگز از فلات نگذشت.' },
        { t: 'p', x: 'The position was a fortune. Every empire that ruled here grew rich on the trade that had nowhere else to go. Silk, spice, and gold crossed Iranian soil, and Iranian hands took their share.', fa: 'این موقعیت خودش ثروت بود. هر امپراتوری که اینجا حکم راند، از تجارتی که راه دیگری نداشت توانگر شد. ابریشم و ادویه و طلا از خاک ایران گذشتند و دست ایرانی سهم خودش را برداشت.' },
        { t: 'p', x: 'And where water was scarce, Iranians invented their way around it. The qanat, an underground channel tapping mountain groundwater and carrying it for miles beneath the desert, is a Persian invention thousands of years old, and it made cities possible where there was no river at all.', fa: 'و هر جا آب کم بود، ایرانی راهی از دلش بیرون کشید. قنات، کاریزی زیرزمینی که آب کوه را می‌گیرد و فرسنگ‌ها زیر کویر می‌بَرد، اختراعی ایرانی است به قدمت هزاران سال، و شهرهایی را ممکن کرد که هیچ رودی نداشتند.' },
        { t: 'mark', x: 'They could not move the desert, so they ran rivers underneath it.', fa: 'کویر را نمی‌شد جابه‌جا کرد، پس رود را از زیرش گذراندند.' },
      ] },
      { blocks: [
        { t: 'h', x: 'What the land cost', fa: 'آنچه سرزمین گرفت' },
        { t: 'p', x: 'The open east was a wound that never closed. Across the steppe came the Turks, the Mongols, and Timur, and each time the flat northeast offered no wall to stop them. The Mongol invasion, arriving through that open door, was among the greatest catastrophes Iran ever suffered.', fa: 'شرقِ باز زخمی بود که هرگز بسته نشد. از آن سوی دشت‌ها ترکان آمدند، مغولان آمدند، تیمور آمد، و هر بار شمال شرقِ هموار دیواری برای بازداشتنشان نداشت. هجوم مغول، که از همان در باز رسید، از بزرگ‌ترین فاجعه‌هایی بود که بر ایران گذشت.' },
        { t: 'p', x: 'And in the modern age the same centrality drew a different kind of pressure. Russia to the north and Britain to the south did not want Iran for its soil but for its position, and later for what lay beneath it. A country at the centre of the world is never left alone by the powers of the world.', fa: 'و در دوران جدید، همین مرکزیت فشاری از جنس دیگر آورد. روسیه از شمال و بریتانیا از جنوب، ایران را نه برای خاکش که برای جایش می‌خواستند، و بعدها برای آنچه زیر خاکش بود. کشوری که در مرکز جهان است، هیچ‌وقت از سوی قدرت‌های جهان به حال خود رها نمی‌شود.' },
        { t: 'p', x: 'The oil found in Khuzestan in the early twentieth century made that truth heavier still. Geography had given Iran the crossroads, and then it gave it the prize.', fa: 'نفتی که اوایل قرن بیستم در خوزستان پیدا شد، این حقیقت را سنگین‌تر کرد. جغرافیا اول چهارراه را به ایران داده بود، بعد جایزه را هم گذاشت وسط.' },
      ] },
    ],
  },
  {
    key: 'g3',
    title: 'The Neighbours',
    titleFa: 'همسایه‌ها',
    nav: 'Neighbours',
    navFa: 'همسایه‌ها',
    subtitle: 'IRAN TODAY',
    subtitleFa: 'ایران امروز',
    pages: [
      { blocks: [
        { t: 'p', x: 'Few countries touch as many others. Iran shares a land border with seven nations and a sea border with several more, and each frontier is a different world.', fa: 'کمتر کشوری این‌همه همسایه دارد. ایران با هفت کشور مرز خاکی دارد و با چند کشور دیگر مرز آبی، و پشت هر مرز دنیایی دیگر است.' },
        { t: 'map', key: 'iran-neighbours', cap: 'Iran and its seven land neighbours.', capFa: 'ایران و هفت همسایهٔ خاکی‌اش.' },
        { t: 'facts', items: [
          { k: 'North west', v: 'Armenia, Azerbaijan, and Turkey' },
          { k: 'North', v: 'The Caspian, and Turkmenistan' },
          { k: 'East', v: 'Afghanistan and Pakistan' },
          { k: 'West', v: 'Iraq' },
          { k: 'South', v: 'The Gulf, and the Strait of Hormuz' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'The gate of the world', fa: 'دروازهٔ جهان' },
        { t: 'p', x: 'At the southern tip, the Strait of Hormuz narrows to a channel a few dozen kilometres wide. Through it passes roughly a fifth of the oil consumed on earth. There is no substitute passage. It is, in the most literal sense, one of the most important stretches of water in the world, and Iran holds its northern shore.', fa: 'در نوک جنوبی، تنگهٔ هرمز به گذرگاهی چند ده کیلومتری تنگ می‌شود. حدود یک‌پنجم نفتی که جهان مصرف می‌کند از همین‌جا می‌گذرد و راه جایگزینی هم ندارد. به معنای دقیق کلمه یکی از مهم‌ترین باریکه‌های آب روی زمین است، و ساحل شمالی‌اش دست ایران است.' },
        { t: 'mark', x: 'A fifth of the world energy passes a coastline you could see across.', fa: 'یک‌پنجم انرژی جهان از کنار ساحلی می‌گذرد که آن‌سویش پیداست.' },
      ] },
      { blocks: [
        { t: 'h', x: 'Two seas', fa: 'دو دریا' },
        { t: 'p', x: 'Iran is one of the few countries to touch two entirely separate seas of different character. The Caspian in the north is the largest inland body of water on earth, fresh enough at its edges to grow rice and tea on its shore. The Gulf in the south is warm, salt, and shallow, a trading sea since before writing.', fa: 'ایران از معدود کشورهایی است که به دو دریای کاملاً جدا با دو طبیعت متفاوت راه دارد. خزر در شمال بزرگ‌ترین پهنهٔ آب محصور در خشکی روی زمین است، و کناره‌هایش آن‌قدر شیرین که در ساحلش برنج و چای می‌روید. خلیج فارس در جنوب گرم است و شور و کم‌عمق؛ دریایی بازرگانی، از پیش از آنکه نوشتن اختراع شود.' },
        { t: 'p', x: 'Between them, eighteen hundred kilometres apart, lies everything: mountain, desert, orchard, and city.', fa: 'میان این دو، هزار و هشتصد کیلومتر فاصله، همه‌چیز جا گرفته است: کوه، کویر، باغ و شهر.' },
      ] },
    ],
  },
  {
    key: 'g4b',
    title: 'The Landscapes',
    titleFa: 'چشم‌اندازها',
    nav: 'Landscapes',
    navFa: 'چشم‌اندازها',
    subtitle: 'WHAT THE LAND LOOKS LIKE',
    subtitleFa: 'سرزمین چه شکلی است',
    pages: [
      { blocks: [
        { t: 'p', x: 'People who have never been picture Iran as desert. It is one of the great misreadings of any country on earth. Iran holds rainforest and salt flat, alpine snowfield and mangrove swamp, and you can pass between them in a single day of driving.', fa: 'کسی که نیامده، ایران را کویر تصور می‌کند. کمتر کشوری روی زمین این‌قدر بد فهمیده شده است. ایران هم جنگل بارانی دارد و هم پهنهٔ نمک، هم برف کوهستان و هم مرداب حرا، و می‌شود در یک روز رانندگی از یکی به دیگری رسید.' },
        { t: 'imgwide', key: 'geo-alborz', cap: 'The Alborz, walling off the Caspian from the plateau.', capFa: 'البرز، دیواری میان خزر و فلات.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The green north', fa: 'شمالِ سبز' },
        { t: 'p', x: 'Between the Alborz and the Caspian lies a strip of forest so old it survived the last ice age intact. It rains here. Rice grows, tea grows, and the hills are the deep green of somewhere far further north. Villages sit in mist. It looks nothing like the Iran of the imagination.', fa: 'میان البرز و خزر نواری از جنگل کشیده شده که آن‌قدر کهن است که آخرین عصر یخبندان را دست‌نخورده از سر گذرانده. اینجا باران می‌بارد. برنج می‌روید، چای می‌روید، و تپه‌ها سبزِ تیره‌اند، سبزِ جایی بسیار شمالی‌تر. روستاها در مه نشسته‌اند. هیچ شباهتی به ایرانِ تصورها ندارد.' },
        { t: 'img', key: 'geo-caspian', cap: 'The Caspian forest, among the oldest living woodland on earth.', capFa: 'جنگل‌های خزری، از کهن‌ترین جنگل‌های زندهٔ جهان.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The empty centre', fa: 'مرکزِ خالی' },
        { t: 'p', x: 'Inside the ring of mountains lie the two great deserts. The Dasht e Kavir is a crust of salt so hostile that little lives on it. The Dasht e Lut is worse, and better. It holds the hottest land surface temperature ever recorded anywhere on the planet, and its wind carved ridges run for hundreds of kilometres like a sea frozen mid wave.', fa: 'درون حلقهٔ کوه‌ها دو کویر بزرگ خوابیده‌اند. دشت کویر پوسته‌ای از نمک است، چنان نامهربان که چیزی رویش دوام نمی‌آورد. دشت لوت هم بدتر است و هم بهتر: داغ‌ترین دمای سطح زمین که تا امروز در هیچ کجای کرهٔ خاکی ثبت شده، اینجا اندازه گرفته شده، و کلوت‌هایی که باد تراشیده صدها کیلومتر ادامه دارند، مثل دریایی که وسط موج یخ زده باشد.' },
        { t: 'img', key: 'geo-lut', cap: 'The Lut, where the ground has been measured hotter than anywhere else on earth.', capFa: 'لوت، جایی که زمینش داغ‌تر از هر نقطهٔ دیگر جهان اندازه گرفته شده.' },
        { t: 'mark', x: 'The hottest place ever measured on earth is a day drive from a rainforest.', fa: 'داغ‌ترین نقطهٔ ثبت‌شدهٔ زمین، یک روز راه با یک جنگل بارانی فاصله دارد.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The mountains', fa: 'کوه‌ها' },
        { t: 'p', x: 'The Zagros run for fifteen hundred kilometres down the western flank, folded like cloth, holding oak forest and the migration routes the Bakhtiari still walk twice a year. And above everything stands Damavand, a dormant volcano and the highest peak in the Middle East, visible from Tehran on a clear day, the mountain where the Shahnameh chains the tyrant Zahhak for eternity.', fa: 'زاگرس هزار و پانصد کیلومتر در کنارهٔ غربی کشیده شده، تاخورده مثل پارچه، با جنگل بلوط و راه‌های کوچی که بختیاری‌ها هنوز سالی دو بار می‌پیمایند. و بالای همه‌چیز دماوند ایستاده است، آتشفشانی خاموش و بلندترین قلهٔ خاورمیانه، که روز صاف از تهران پیداست؛ همان کوهی که شاهنامه ضحاک را تا ابد در آن به بند کشیده.' },
        { t: 'img', key: 'geo-damavand', cap: 'Damavand, 5,610 metres, the roof of the Middle East and a mountain of myth.', capFa: 'دماوند، ۵۶۱۰ متر، بام خاورمیانه و کوهی در دل اسطوره.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The two coasts', fa: 'دو ساحل' },
        { t: 'p', x: 'North is the Caspian, cool and fresh at its edges. South is the Gulf, warm and salt, with mangroves along its shallows and islands whose hills are striped red and gold with mineral. One country, two seas, and eighteen hundred kilometres between them.', fa: 'شمال خزر است، خنک و در کناره‌ها شیرین. جنوب خلیج فارس است، گرم و شور، با جنگل‌های حرا در کم‌عمق‌هایش و جزیره‌هایی که تپه‌هایشان از کانی سرخ و طلایی راه‌راه شده. یک کشور، دو دریا، و هزار و هشتصد کیلومتر میانشان.' },
        { t: 'imgrow2', keys: ['geo-gulf', 'geo-hormuz'], cap: 'The Gulf coast, and the painted hills of Hormuz.', capFa: 'ساحل خلیج فارس و تپه‌های رنگی هرمز.' },
      ] },
    ],
  },
  {
    key: 'g4',
    title: 'The Thirty One',
    titleFa: 'سی و یک استان',
    nav: 'Provinces',
    navFa: 'استان‌ها',
    subtitle: 'THE PROVINCES',
    subtitleFa: 'استان‌ها',
    pages: [
      { blocks: [
        { t: 'p', x: 'Iran is made of thirty one provinces, and no two are alike. Touch any one to learn what makes it itself.', fa: 'ایران از سی و یک استان ساخته شده و هیچ دو تایشان شبیه هم نیستند. روی هرکدام بزن تا ببینی چه چیزی آن را خودش کرده است.' },
        { t: 'provincemap' },
      ] },
    ],
  },
  {
    key: 'g5',
    title: 'The Great Cities',
    titleFa: 'شهرهای بزرگ',
    nav: 'Cities',
    navFa: 'شهرها',
    subtitle: 'WHERE THE PEOPLE ARE',
    subtitleFa: 'مردم کجا هستند',
    pages: [
      { blocks: [
        { t: 'imgwide', key: 'geo-cities-cover' },
        { t: 'p', x: 'A country is its cities, and Iran cities were placed by water and by road. Where a mountain stream could be tapped, or a trade route had to pass, a city grew. Some have stood so long that their founding is myth rather than record.', fa: 'کشور همان شهرهایش است، و شهرهای ایران را آب و راه جانمایی کرده‌اند. هر جا می‌شد چشمه‌ای کوهستانی را گرفت، یا راه بازرگانی ناچار از آنجا می‌گذشت، شهری بالا آمد. بعضی‌شان چنان دیرپا هستند که بنیادشان به جای تاریخ، در اسطوره ثبت شده.' },
        { t: 'cities' },
      ] },
      { blocks: [
        { t: 'h', x: 'Why they stand where they stand', fa: 'چرا همان‌جا ایستاده‌اند' },
        { t: 'p', x: 'Look closely and a pattern appears. Almost every great Iranian city sits at the foot of a mountain, not on a river. Tehran against the Alborz, Shiraz and Isfahan in the folds of the Zagros, Mashhad below the hills of Khorasan. The mountains held the snow, the snow fed the springs, and the qanats carried that water out to the plain.', fa: 'کمی دقیق‌تر که نگاه کنی، الگویی بیرون می‌زند. تقریباً هر شهر بزرگ ایران پای کوه نشسته، نه کنار رود. تهران تکیه داده به البرز، شیراز و اصفهان در چین‌های زاگرس، مشهد زیر تپه‌های خراسان. کوه برف را نگه می‌داشت، برف چشمه را می‌خوراند، و قنات آن آب را تا دشت می‌بُرد.' },
        { t: 'mark', x: 'Iranian cities were not built on rivers. They were built on the memory of snow.', fa: 'شهرهای ایران را کنار رود نساختند. روی خاطرهٔ برف ساختند.' },
        { t: 'p', x: 'This is why the map of Iran cities is really a map of its mountains. Where the ranges run, the cities follow, strung along the inner edge of the highlands like beads on a thread, with the empty deserts held at the centre.', fa: 'برای همین نقشهٔ شهرهای ایران در حقیقت نقشهٔ کوه‌هایش است. هر جا رشته‌کوه می‌رود، شهرها هم دنبالش می‌روند؛ مثل مهره‌هایی به نخ کشیده در لبهٔ درونی بلندی‌ها، و کویرهای خالی در میانه نگه داشته شده‌اند.' },
      ] },
    ],
  },
  {
    key: 'g6',
    title: 'Small Places, Long Shadows',
    titleFa: 'جاهای کوچک، سایه‌های بلند',
    nav: 'Places',
    navFa: 'جاها',
    subtitle: 'THE UNEXPECTED ONES',
    subtitleFa: 'آن‌ها که انتظارشان را نداری',
    pages: [
      { blocks: [
        { t: 'p', x: 'Beyond the great cities are smaller places whose names carry further than their size would suggest. Some gave the world a fruit, some a building, some a person whose words outlived every empire of their age.', fa: 'آن‌سوی شهرهای بزرگ، جاهای کوچک‌تری هستند که نامشان دورتر از اندازه‌شان رفته است. یکی میوه‌ای به جهان داد، یکی بنایی، و یکی کسی را که سخنش از همهٔ امپراتوری‌های روزگارش بیشتر عمر کرد.' },
      ] },
      { blocks: [
        { t: 'places' },
        { t: 'div' },
        { t: 'p', x: 'This is the pattern of the land. A country of extremes, held between mountain and desert, placed at the centre of everything, whose people learned to draw water from under the sand and beauty from the driest places. The geography made the history, and the history made the nation.', fa: 'الگوی این سرزمین همین است. کشوری از تضادها، گرفته میان کوه و کویر، نشسته در مرکز همه‌چیز، که مردمش یاد گرفتند آب را از زیر شن بیرون بکشند و زیبایی را از خشک‌ترین جاها. جغرافیا تاریخ را ساخت، و تاریخ ملت را.' },
        { t: 'close', glyph: 'ایران', x: 'A land that has held everything the world came looking for, and been asked for little else. Empires crossed it, took what they wanted, and left their dust in its soil. It gave water where there was none, poetry where there was silence, and beauty out of the driest ground on earth. It has been wanted often and understood rarely. Still it stands, between two seas, holding its own name.', fa: 'سرزمینی که هر چه جهان به دنبالش آمد در خود داشت، و کمتر چیز دیگری از او خواستند. امپراتوری‌ها از آن گذشتند، آنچه می‌خواستند بردند و غبارشان را در خاکش جا گذاشتند. آب داد آنجا که آبی نبود، شعر داد آنجا که سکوت بود، و زیبایی را از خشک‌ترین خاک روی زمین بیرون کشید. بارها خواسته شده و کم فهمیده شده. هنوز ایستاده است، میان دو دریا، با نام خودش در دست.' },
      ] },
    ],
  },
];

export type City = { name: string; persian: string; x: number; y: number; blurb: string; blurbFa?: string; images: string[] };

export const CITIES: City[] = [
  { name: 'Tehran', persian: 'تهران', x: 0.3861, y: 0.2876, blurb: 'Capital, and one of the largest cities in western Asia. A modest town the Qajars chose, now millions strong against the snow line of the Alborz.', blurbFa: 'پایتخت، و یکی از بزرگ‌ترین شهرهای غرب آسیا. شهرکی ساده که قاجارها انتخابش کردند، و حالا میلیون‌ها نفر پای خط برف البرز.', images: ['tehran-1','tehran-2','tehran-3'] },
  { name: 'Mashhad', persian: 'مشهد', x: 0.7969, y: 0.2482, blurb: 'The great pilgrimage city of the east, drawing millions each year, and the largest city of Khorasan.', blurbFa: 'شهر بزرگ زیارتی شرق، که سالانه میلیون‌ها نفر را به خود می‌کشد، و بزرگ‌ترین شهر خراسان.', images: ['mashhad-1','mashhad-2','mashhad-3'] },
  { name: 'Isfahan', persian: 'اصفهان', x: 0.4, y: 0.4848, blurb: 'Once called half the world. Shah Abbas laid out a square here that remains among the most beautiful ever built.', blurbFa: 'روزگاری نصف جهان خوانده شد. شاه عباس اینجا میدانی طرح ریخت که هنوز از زیباترین میدان‌های ساخته‌شدهٔ جهان است.', images: ['isfahan-1','isfahan-2','isfahan-3'] },
  { name: 'Shiraz', persian: 'شیراز', x: 0.4432, y: 0.6833, blurb: 'City of poets, roses, and gardens. Hafez and Saadi are buried here, and Karim Khan made it his capital.', blurbFa: 'شهر شاعران و گل و باغ. حافظ و سعدی اینجا خفته‌اند، و کریم‌خان پایتختش کرد.', images: ['shiraz-1','shiraz-2','shiraz-3'] },
  { name: 'Tabriz', persian: 'تبریز', x: 0.1314, y: 0.1325, blurb: 'The north western gate, holding one of the oldest and largest covered bazaars on earth.', blurbFa: 'دروازهٔ شمال غرب، با یکی از کهن‌ترین و بزرگ‌ترین بازارهای سرپوشیدهٔ جهان.', images: ['tabriz-1','tabriz-2','tabriz-3'] },
  { name: 'Yazd', persian: 'یزد', x: 0.535, y: 0.5336, blurb: 'A desert city of mud brick and wind towers, and a living centre of Zoroastrian faith.', blurbFa: 'شهری کویری از خشت و بادگیر، و کانونی زنده برای آیین زرتشتی.', images: ['yazd-1','yazd-2','yazd-3'] },
];

export type Place = { name: string; persian: string; x: number; y: number; text: string; textFa?: string; image?: string };

export const PLACES: Place[] = [
  { name: 'Tus', persian: 'توس', x: 0.7941, y: 0.2363, text: 'A modest town in Khorasan, and the home of {{ferdowsi|Ferdowsi}}. For thirty years he sat here and wrote the Shahnameh, and in doing so saved the Persian language. No city of millions has done more for Iran than this one town did through one man.', textFa: 'شهرکی ساده در خراسان، و خانهٔ {{ferdowsi|فردوسی}}. سی سال اینجا نشست و شاهنامه را سرود، و با همین کار زبان فارسی را نگه داشت. هیچ شهر میلیونی برای ایران آن نکرد که این شهرک با یک نفر کرد.', image: 'place-tus' },
  { name: 'Kashan', persian: 'کاشان', x: 0.3885, y: 0.3983, text: 'A desert town that turned water and roses into an art. Its rosewater is distilled each spring in a ritual centuries old, its carpets are famous, and its merchant houses hide vast cool courtyards behind plain mud walls.', textFa: 'شهری کویری که آب و گل را به هنر بدل کرد. گلابش هر بهار در آیینی چند صد ساله گرفته می‌شود، فرش‌هایش نامدارند، و خانه‌های تاجرانش پشت دیوارهای ساده خشتی، حیاط‌های بزرگ و خنک پنهان کرده‌اند.', image: 'place-kashan' },
  { name: 'Maragheh', persian: 'مراغه', x: 0.1287, y: 0.1772, text: 'Here, under the Ilkhanids, an observatory was built that mapped the heavens with an accuracy that reached Europe and helped reshape how the world understood the sky.', textFa: 'اینجا در روزگار ایلخانان رصدخانه‌ای ساخته شد که آسمان را با دقتی نقشه کرد که تا اروپا رسید و در دگرگونی فهم جهان از آسمان سهم داشت.', image: 'place-maragheh' },
  { name: 'Masuleh', persian: 'ماسوله', x: 0.2662, y: 0.1928, text: 'A village in the Gilan mountains built so steeply that the roof of one house is the courtyard of the house above, and the whole settlement is a staircase. Cars cannot enter.', textFa: 'روستایی در کوه‌های گیلان، چنان پرشیب ساخته شده که بام هر خانه حیاط خانهٔ بالایی است و کل آبادی یک پلکان است. ماشین نمی‌تواند واردش شود.', image: 'place-masuleh' },
  { name: 'Bam', persian: 'بم', x: 0.7344, y: 0.7147, text: 'A citadel of mud brick in the Kerman desert, once the largest such structure on earth, and the country around it gives the sweetest dates in Iran.', textFa: 'ارگی خشتی در کویر کرمان، که روزگاری بزرگ‌ترین بنای خشتی روی زمین بود، و پیرامونش شیرین‌ترین خرمای ایران را می‌دهد.', image: 'place-bam' },
  { name: 'Neyshabur', persian: 'نیشابور', x: 0.7564, y: 0.2536, text: 'Home of {{khayyam|Omar Khayyam}}, poet and mathematician both, and the source of the turquoise that coloured the domes and the jewellery of half the world.', textFa: 'خانهٔ {{khayyam|عمر خیام}}، هم شاعر و هم ریاضی‌دان، و سرچشمهٔ فیروزه‌ای که گنبدها و جواهر نیمی از جهان را رنگ زد.', image: 'place-neyshabur' },
];
