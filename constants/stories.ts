// Stories: the people. Written to be read as a magazine, not a database.

export type Story = {
  key: string;
  article?: string;
  hook: string;        // the line that stops you
  title: string;       // the piece
  who: string;
  where: string;
  read: string;
  image: string;
  tint: string;
  tag: 'INTERVIEW' | 'PROFILE' | 'ESSAY' | 'IN THEIR WORDS';
};

export const STORIES: Story[] = [
  { key: 'st1', article: 'khalili',
    hook: 'The architect already building for Mars.',
    title: 'Earth, geometry, and a pair of hands.',
    who: 'Nader Khalili',
    where: 'Iran to California',
    read: '6 min',
    image: 'article-khalili-cover',
    tint: '#8C3A2E',
    tag: 'INTERVIEW' },

  { key: 'st2',
    hook: 'She has made samanu every spring for fifty one years.',
    title: 'She has never once used sugar.',
    who: 'Maman Mahin',
    where: 'Shiraz',
    read: '6 min',
    image: 'food-bastani',
    tint: '#B08A46',
    tag: 'PROFILE' },

  { key: 'st3',
    hook: 'He restores carpets nobody else will touch.',
    title: 'Some of them are older than his country.',
    who: 'Farhad Ahmadi',
    where: 'Los Angeles',
    read: '11 min',
    image: 'safavid-cover',
    tint: '#417270',
    tag: 'PROFILE' },

  { key: 'st4',
    hook: 'They built a zurkhaneh in a Toronto basement.',
    title: 'The drum still starts at seven.',
    who: 'The Pahlavan Club',
    where: 'Toronto',
    read: '9 min',
    image: 'zand-arg',
    tint: '#6E8C5A',
    tag: 'PROFILE' },

  { key: 'st5',
    hook: 'She left in 1979 and never went back.',
    title: 'Her daughter went last spring, and called her from the street she grew up on.',
    who: 'Nasrin and Leila',
    where: 'London and Tehran',
    read: '13 min',
    image: 'tehran-1',
    tint: '#8C3A2E',
    tag: 'IN THEIR WORDS' },

  { key: 'st6',
    hook: 'The saffron in your kitchen was picked by hand.',
    title: 'It takes a family a morning to fill a thimble.',
    who: 'The harvest',
    where: 'Khorasan',
    read: '7 min',
    image: 'food-zereshk-polo',
    tint: '#E0A63C',
    tag: 'ESSAY' },

  { key: 'st7',
    hook: 'He has been writing the same four lines for thirty years.',
    title: 'A calligrapher on why it is never finished.',
    who: 'Ostad Rezaei',
    where: 'Isfahan',
    read: '10 min',
    image: 'lit-hafez-cover',
    tint: '#5E7F8C',
    tag: 'INTERVIEW' },

  { key: 'st8',
    hook: 'Nobody taught her Persian.',
    title: 'At thirty four, she started with the alphabet.',
    who: 'Sara Kazemi',
    where: 'Melbourne',
    read: '5 min',
    image: 'silence-cover',
    tint: '#6B5D50',
    tag: 'IN THEIR WORDS' },

  { key: 'st9',
    hook: 'The qanat under his village is three thousand years old.',
    title: 'He is the last man who knows how to repair it.',
    who: 'Amoo Rahim',
    where: 'Yazd',
    read: '12 min',
    image: 'geo-lut',
    tint: '#417270',
    tag: 'PROFILE' },

  { key: 'st10',
    hook: 'His father played the tar. So did his grandfather.',
    title: 'He plays it in a flat in Berlin, with the windows shut.',
    who: 'Kaveh Sharifi',
    where: 'Berlin',
    read: '9 min',
    image: 'lit-rudaki-cover',
    tint: '#8A5A9E',
    tag: 'INTERVIEW' },
];

/* one thing, every day, pulled from everything you have built */

export type DailyKind = 'word' | 'verse' | 'fact' | 'card' | 'dish';

export type Daily = {
  kind: DailyKind;
  fa?: string;
  tr?: string;
  title: string;
  titleFa?: string;
  x: string;
  xFa?: string;
  route?: string;   // present = flips and links out
  cta?: string;
};

export const DAILY_POOL: Daily[] = [
  { kind: 'word', fa: 'دلتنگ', tr: 'deltang', title: 'Your heart has gone tight', titleFa: 'دلت تنگ شده',
    x: 'It is how Persian says I miss you. Not a report of an absence, a symptom happening in your chest right now.', xFa: 'این است شیوهٔ فارسی برای گفتن دلتنگی. خبر دادن از یک نبود نیست؛ حالی است که همین حالا در سینه‌ات می‌گذرد.',
    route: '/culture/topic?topic=del', cta: 'the whole word map' },
  { kind: 'verse', title: 'Do not grieve', titleFa: 'غم مخور',
    x: 'Gham makhor. Hafez wrote it six hundred years ago and Iranians have been saying it to each other ever since. It is not advice. It is a hand on the shoulder.', xFa: 'حافظ ششصد سال پیش نوشتش و ایرانیان از آن روز تا امروز به هم می‌گویندش. نصیحت نیست؛ دستی است که بر شانه می‌نشیند.',
    route: '/literature/reader?author=hafez&page=0', cta: 'read Hafez' },
  { kind: 'fact', title: 'The calendar you are not using is better', titleFa: 'تقویمی که به کار نمی‌بری، دقیق‌تر است',
    x: 'Khayyam measured the year to six decimal places in 1079 with brass instruments. His calendar drifts a day every five thousand years. The Gregorian drifts one every three thousand.', xFa: 'خیام در سال ۱۰۷۹ با ابزارهای برنجی طول سال را تا شش رقم اعشار اندازه گرفت. تقویم او هر پنج هزار سال یک روز خطا دارد؛ تقویم میلادی هر سه هزار سال یک روز.',
    route: '/literature/reader?author=khayyam&page=0', cta: 'how he did it' },
  { kind: 'word', fa: 'تعارف', tr: 'taarof', title: 'Offer it three times', titleFa: 'سه بار تعارف کن',
    x: 'Nothing is real until it has been offered three times. Accept on the first and everyone knows you were waiting for it.', xFa: 'هیچ‌چیز جدی نیست مگر سه بار تعارف شده باشد. بار اول قبول کنی، همه می‌فهمند منتظرش بوده‌ای.',
    route: '/culture/topic?topic=taarof', cta: 'try the simulator' },
  { kind: 'fact', title: 'Paradise was a garden with a wall around it', titleFa: 'بهشت، باغی بود با دیواری گرداگردش',
    x: 'Pairidaeza just meant an enclosed space. The Greeks borrowed the word, scripture borrowed it, and an ordinary Persian garden became the name for heaven.', xFa: 'پیریدَئِزَه فقط یعنی جایی که دورش را بسته باشند. یونانیان این واژه را وام گرفتند، کتاب‌های مقدس هم، و باغی ساده و ایرانی نام بهشت شد.',
    route: '/language', cta: 'more words you already speak' },
  { kind: 'dish', fa: 'ته دیگ', tr: 'tahdig', title: 'The best thing is an accident', titleFa: 'بهترین قسمت، اتفاقی است',
    x: 'The golden crust at the bottom of the rice pot. Guests get it first. Then the family goes to war over what is left.', xFa: 'همان پوستهٔ طلایی ته دیگ. اول به مهمان می‌رسد. بعد خانواده بر سر باقی‌اش به جان هم می‌افتد.',
    route: '/culture/topic?topic=sofreh', cta: 'the table' },
  { kind: 'verse', title: 'You are the reed', titleFa: 'تو همان نی هستی',
    x: 'Rumi opens the Masnavi with a flute crying for the reed bed it was cut from. Twenty six thousand couplets follow, and they are all about that.', xFa: 'مولانا مثنوی را با نالهٔ نی‌ای آغاز می‌کند که از نیستان بریده شده است. بیست و شش هزار بیت پس از آن می‌آید، و همه‌اش دربارهٔ همان است.',
    route: '/literature/reader?author=rumi&page=0', cta: 'read Rumi' },
  { kind: 'fact', title: 'A poem got a king onto a horse without his boots', titleFa: 'شعری شاهی را بی‌چکمه بر اسب نشاند',
    x: 'Rudaki sang about the smell of a stream in Bukhara. The king had refused to go home for four years. He rode out barefoot.', xFa: 'رودکی از بوی جوی مولیان خواند. شاه چهار سال بود که به خانه بازنمی‌گشت. پابرهنه سوار شد و رفت.',
    route: '/literature/reader?author=rudaki&page=0', cta: 'the whole story' },
  { kind: 'word', fa: 'قربونت برم', tr: 'ghorboonet beram', title: 'May I be sacrificed for you', titleFa: 'قربانت بروم',
    x: 'Said constantly, to almost anyone, meaning roughly thanks. Persian does not do small affection.', xFa: 'مدام گفته می‌شود، به تقریباً هر کسی، و معنایش چیزی نزدیک به سپاسگزارم است. فارسی محبت را کوچک بیان نمی‌کند.',
    route: '/language', cta: 'the language' },
  { kind: 'fact', title: 'Iran has been calling itself Iran the whole time', titleFa: 'ایران، همیشه خودش را ایران خوانده است',
    x: 'From Aryanam, the noble ones. Persia was the outside name, from Pars, one province. The country never changed what it calls itself.', xFa: 'از آریانام، یعنی نجیبان. پرشیا نامی بود که بیرونی‌ها گذاشته بودند، برگرفته از پارس، تنها یکی از استان‌ها. این کشور هرگز نامی را که بر خود می‌گذارد عوض نکرد.',
    route: '/language', cta: 'where Persian comes from' },
];


// folded in from the old "Did you know" set. Flat cards, no flip.
const DYK: Daily[] = [
  { kind: 'fact', fa: 'انار', title: 'The oldest symbol', titleFa: 'کهن‌ترین نماد', x: 'The pomegranate is one of the oldest symbols in Persian art and myth, a sign of abundance, life, and eternity.', xFa: 'انار از کهن‌ترین نمادهای هنر و اسطورهٔ ایرانی است؛ نشانهٔ فراوانی، زندگی و جاودانگی.' },
  { kind: 'fact', fa: 'پردیس', title: 'Paradise was a garden', titleFa: 'بهشت، یک باغ بود', x: 'The English word paradise traces back to an ancient Persian word for a walled garden.', xFa: 'واژهٔ انگلیسی paradise به واژه‌ای کهن در زبان ایرانی بازمی‌گردد که معنایش باغی دیواردار بود: پردیس.' },
  { kind: 'fact', fa: 'فرش', title: 'The oldest carpet', titleFa: 'کهن‌ترین فرش', x: 'The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.', xFa: 'فرش پازیریک، با حدود ۲٬۵۰۰ سال قدمت، کهن‌ترین فرش گره‌بافتهٔ شناخته‌شدهٔ جهان است که به جا مانده.' },
  { kind: 'fact', fa: 'بادگیر', title: 'Air conditioning, ancient', titleFa: 'تهویهٔ مطبوع، از روزگار باستان', x: 'Long before electricity, Persian windcatchers, tall towers called badgir, cooled homes by guiding the breeze downward.', xFa: 'مدت‌ها پیش از برق، بادگیرهای ایرانی، همان برج‌های بلند، با هدایت نسیم به پایین خانه‌ها را خنک می‌کردند.' },
  { kind: 'fact', fa: 'قنات', title: 'Water across the desert', titleFa: 'آب، از دل کویر', x: 'Qanats, gently sloping underground channels, carried water across the desert for thousands of years.', xFa: 'قنات‌ها، کاریزهای زیرزمینی با شیبی ملایم، هزاران سال آب را از دل کویر گذراندند.' },
  { kind: 'fact', fa: 'زعفران', title: 'Worth more than gold', titleFa: 'گران‌بهاتر از طلا', x: 'Iran grows the vast majority of the world saffron, the crimson spice worth more than its weight in gold.', xFa: 'بخش بزرگی از زعفران جهان در ایران کشت می‌شود؛ ادویه‌ای سرخ که هم‌وزن خود از طلا گران‌بهاتر است.' },
  { kind: 'fact', fa: 'کوروش', title: 'The first declaration', titleFa: 'نخستین بیانیه', x: 'The Cyrus Cylinder, from the reign of Cyrus the Great, is often described as one of the earliest declarations of tolerance.', xFa: 'استوانهٔ کوروش، از روزگار کوروش بزرگ، را اغلب یکی از نخستین بیانیه‌های بردباری خوانده‌اند.' },
  { kind: 'fact', fa: 'هخامنشی', title: 'The largest yet seen', titleFa: 'بزرگ‌ترین که تا آن روز دیده شده بود', x: 'Around 550 BCE, Cyrus founded the Achaemenid Empire, the largest the ancient world had yet seen, reaching from the Aegean to the Indus.', xFa: 'حدود ۵۵۰ پیش از میلاد، کوروش امپراتوری هخامنشی را بنیان نهاد؛ بزرگ‌ترین امپراتوری‌ای که جهان باستان تا آن روز دیده بود، از دریای اژه تا سند.' },
  { kind: 'fact', fa: 'تخت‌جمشید', title: 'A record in stone', titleFa: 'سندی در سنگ', x: 'Built by Darius around 518 BCE, Persepolis welcomed delegations from across the empire, a record in stone of many nations under one rule.', xFa: 'تخت جمشید که داریوش حدود ۵۱۸ پیش از میلاد ساخت، پذیرای نمایندگانی از سراسر امپراتوری بود؛ سندی در سنگ از ملت‌های بسیار زیر یک فرمان.' },
  { kind: 'fact', fa: 'راه‌شاهی', title: 'The first postal system', titleFa: 'نخستین نظام پستی', x: 'The Persian Royal Road was a vast relay of stations and couriers. Messages crossed the empire with remarkable speed, the ancient world first true post.', xFa: 'راه شاهی ایران شبکه‌ای گسترده از چاپارخانه‌ها و پیک‌ها بود. پیام‌ها با سرعتی شگفت‌آور امپراتوری را می‌پیمودند؛ نخستین نظام پستی راستین جهان باستان.' },
  { kind: 'fact', fa: 'ماسوله', title: 'A town built as a staircase', titleFa: 'شهری که پلکان است', x: 'In Masuleh, the roof of one house is the courtyard of the next. The whole town climbs the mountain that way, and no cars can enter it.', xFa: 'در ماسوله، بام هر خانه حیاط خانهٔ بالایی است. تمام شهر همین‌طور از کوه بالا می‌رود، و ماشین به آن راه ندارد.' },
  { kind: 'fact', fa: 'سرو ابرکوه', title: 'Older than any building', titleFa: 'کهن‌تر از هر بنایی', x: 'The cypress of Abarkuh has been standing for something like four thousand years. It was already ancient when Persepolis was new.', xFa: 'سرو ابرکوه چیزی حدود چهار هزار سال است که ایستاده. وقتی تخت جمشید تازه ساخته شده بود، این درخت پیر بود.' },
  { kind: 'fact', fa: 'کاریز کیش', title: 'A tunnel through coral', titleFa: 'تونلی در دل مرجان', x: 'The kariz beneath Kish was cut through fossilised coral around two and a half thousand years ago. You can walk it, and the shells are still in the walls.', xFa: 'کاریز زیر کیش حدود دو هزار و پانصد سال پیش در دل مرجان سنگ‌شده کنده شد. می‌شود در آن قدم زد، و صدف‌ها هنوز در دیواره‌اند.' },
  { kind: 'fact', fa: 'یزد', title: 'A city of raw earth', titleFa: 'شهری از خاک', x: 'Yazd is one of the oldest continuously inhabited cities on earth, and much of it is built from mud brick that keeps the desert heat out.', xFa: 'یزد یکی از کهن‌ترین شهرهای جهان است که پیوسته مسکونی مانده، و بخش بزرگی از آن از خشت ساخته شده که گرمای کویر را بیرون نگه می‌دارد.' },
  { kind: 'fact', fa: 'شطرنج', title: 'How chess travelled', titleFa: 'شطرنج چطور سفر کرد', x: 'Chess reached Persia from India, took the name shatranj, and travelled onward to Europe from there. Checkmate comes from shah mat, the king is helpless.', xFa: 'شطرنج از هند به ایران رسید، نامش شترنج شد، و از همان‌جا به اروپا رفت. واژهٔ checkmate از «شاه مات» می‌آید.' },
  { kind: 'fact', fa: 'آسیاب بادی', title: 'The first windmills', titleFa: 'نخستین آسیاب‌های بادی', x: 'The earliest known windmills turned in eastern Iran more than a thousand years ago. Some at Nashtifan still work.', xFa: 'نخستین آسیاب‌های بادی شناخته‌شده بیش از هزار سال پیش در شرق ایران می‌چرخیدند. برخی از آن‌ها در نشتیفان هنوز کار می‌کنند.' },
  { kind: 'fact', fa: 'یخچال', title: 'Ice in the desert', titleFa: 'یخ در کویر', x: 'Persian yakhchals made ice in the desert and kept it through summer, using nothing but shade, evaporation and a very thick wall.', xFa: 'یخچال‌های ایرانی در کویر یخ می‌ساختند و تا تابستان نگه می‌داشتند؛ فقط با سایه، تبخیر و دیواری بسیار ضخیم.' },
  { kind: 'fact', fa: 'زعفران', title: 'Seventy thousand flowers', titleFa: 'هفتاد هزار گل', x: 'It takes roughly seventy thousand crocus flowers to make a single pound of saffron, and every stigma is pulled by hand.', xFa: 'برای یک پوند زعفران چیزی حدود هفتاد هزار گل لازم است، و هر کلاله را با دست می‌چینند.' },
  { kind: 'fact', fa: 'شیراز', title: 'Two poets, one city', titleFa: 'دو شاعر، یک شهر', x: 'Hafez and Saadi are both buried in Shiraz, within sight of each other. People still go to read at both.', xFa: 'حافظ و سعدی هر دو در شیراز آرمیده‌اند، در چشم‌انداز یکدیگر. مردم هنوز بر سر هر دو مزار می‌روند و می‌خوانند.' },
  { kind: 'fact', fa: 'دماوند', title: 'The mountain in the stories', titleFa: 'کوهی که در قصه‌هاست', x: 'Damavand is the highest peak in the Middle East, and in the Shahnameh it is where the tyrant Zahhak is chained inside the mountain.', xFa: 'دماوند بلندترین قلهٔ خاورمیانه است، و در شاهنامه همان جایی است که ضحاک در دلش به بند کشیده شد.' },
  { kind: 'fact', fa: 'گربهٔ ایرانی', title: 'The cat is from here', titleFa: 'گربه از همین‌جاست', x: 'The Persian cat takes its name from where it came from, and it reached Europe in the seventeenth century as a gift worth giving.', xFa: 'گربهٔ ایرانی نامش را از جایی که از آن آمده گرفته، و در قرن هفدهم به‌عنوان هدیه‌ای درخور به اروپا رسید.' },
  { kind: 'fact', fa: 'تخت جمشید', title: 'Paid, not enslaved', titleFa: 'مزدبگیر، نه برده', x: 'Tablets found at Persepolis record wages paid to the workers who built it, including women, and including maternity leave.', xFa: 'لوح‌های یافته‌شده در تخت جمشید دستمزد کارگرانی را ثبت کرده‌اند که آن را ساختند؛ از جمله زنان، و از جمله مرخصی زایمان.' },
  { kind: 'fact', fa: 'نوروز', title: 'Counted to the second', titleFa: 'ثانیه به ثانیه', x: 'Nowruz begins at the exact moment of the spring equinox, which is why the time changes every year and families wait for it.', xFa: 'نوروز دقیقاً در لحظهٔ اعتدال بهاری آغاز می‌شود؛ برای همین ساعتش هر سال فرق می‌کند و خانواده‌ها منتظرش می‌نشینند.' },
  { kind: 'fact', fa: 'خط', title: 'Three scripts, one language', titleFa: 'سه خط، یک زبان', x: 'Persian has been written in cuneiform, then in Pahlavi, and now in an adapted Arabic script. The language survived all three.', xFa: 'فارسی را به خط میخی نوشته‌اند، بعد به پهلوی، و حالا به خطی برگرفته از عربی. زبان از هر سه جان به در برد.' },
  { kind: 'fact', fa: 'چهار حرف', title: 'Four letters added', titleFa: 'چهار حرف افزوده', x: 'When Persian took the Arabic script it added four letters for sounds Arabic does not have: پ چ ژ گ.', xFa: 'وقتی فارسی خط عربی را گرفت، چهار حرف برای صداهایی افزود که در عربی نبود: پ چ ژ گ.' },
  { kind: 'fact', fa: 'لیمو', title: 'Words that travelled', titleFa: 'واژه‌هایی که سفر کردند', x: 'Lemon, orange, spinach, jasmine, khaki, bazaar, caravan and pyjama all reached English from Persian, most of them by a long road.', xFa: 'lemon و orange و spinach و jasmine و khaki و bazaar و caravan و pyjama همه از فارسی به انگلیسی رسیده‌اند، بیشترشان از راهی دراز.' },
  { kind: 'fact', fa: 'تخته‌نرد', title: 'Older than the rules', titleFa: 'کهن‌تر از قاعده‌هایش', x: 'Backgammon in something like its present form was played in Persia well over a thousand years ago, and the board has barely changed.', xFa: 'تخته‌نرد، کمابیش به همین شکل امروزی، بیش از هزار سال پیش در ایران بازی می‌شد، و صفحه‌اش تقریباً تغییری نکرده.' },
  { kind: 'fact', fa: 'کویر لوت', title: 'The hottest ground measured', titleFa: 'داغ‌ترین زمین اندازه‌گیری‌شده', x: 'The Lut desert has recorded some of the highest land surface temperatures ever measured from orbit, above seventy degrees.', xFa: 'کویر لوت یکی از بالاترین دماهای سطح زمین را که تا کنون از مدار اندازه گرفته شده ثبت کرده؛ بالای هفتاد درجه.' },
  { kind: 'fact', fa: 'گل محمدی', title: 'A month of roses', titleFa: 'یک ماه، پر از گل', x: 'Every spring Kashan spends weeks distilling rosewater, and the whole town smells of it. The season has its own name: golabgiri.', xFa: 'هر بهار کاشان هفته‌ها گلاب می‌گیرد و تمام شهر بوی گل می‌دهد. این فصل نام خودش را دارد: گلاب‌گیری.' },
  { kind: 'fact', fa: 'شاهنامه', title: 'Fifty thousand couplets', titleFa: 'پنجاه هزار بیت', x: 'The Shahnameh runs to around fifty thousand couplets, written by one man over roughly thirty years.', xFa: 'شاهنامه نزدیک پنجاه هزار بیت است، نوشتهٔ یک نفر در حدود سی سال.' },
  { kind: 'fact', fa: 'تبریز', title: 'A bazaar with a roof', titleFa: 'بازاری زیر یک سقف', x: 'The covered bazaar of Tabriz is one of the largest roofed markets in the world, and it has been trading for centuries.', xFa: 'بازار سرپوشیدهٔ تبریز یکی از بزرگ‌ترین بازارهای سقف‌دار جهان است، و قرن‌هاست که در آن داد و ستد می‌شود.' },
  { kind: 'fact', fa: 'قهوه‌خانه', title: 'Tea, in a coffee house', titleFa: 'چای، در قهوه‌خانه', x: 'Iranian tea houses are still called qahvekhaneh, coffee houses, from the days before tea arrived and took over entirely.', xFa: 'چای‌خانه‌های ایران هنوز قهوه‌خانه نامیده می‌شوند؛ از روزگاری مانده که هنوز چای نیامده بود و همه‌چیز را نگرفته بود.' },
  { kind: 'fact', fa: 'ورزش زورخانه', title: 'A gym with a poet', titleFa: 'باشگاهی با شاعر', x: 'In the zurkhaneh, men train to the beat of a drum while someone recites Ferdowsi over the top of it.', xFa: 'در زورخانه، مردان با ضرب می‌ورزند و کسی بالای سرشان شاهنامه می‌خواند.' },
  { kind: 'fact', fa: 'قنات', title: 'Still running', titleFa: 'هنوز جاری', x: 'Some qanats dug two and a half thousand years ago still carry water today, maintained by hand across a hundred generations.', xFa: 'برخی قنات‌هایی که دو هزار و پانصد سال پیش کنده شده‌اند هنوز آب می‌آورند؛ صد نسل با دست نگهشان داشته‌اند.' },
];

// Verses are excluded on purpose — the daily slot is for facts. The
// entries themselves are left in DAILY_POOL; drop 'verse' from this list
// to bring them back.
const DAILY_OFF: DailyKind[] = ['verse'];

const ALL_DAILY: Daily[] = [...DAILY_POOL, ...DYK].filter(
  (x) => !DAILY_OFF.includes(x.kind),
);

export function dailyFor(d = new Date()) {
  const day = Math.floor(d.getTime() / 86400000);
  return ALL_DAILY[day % ALL_DAILY.length];
}
