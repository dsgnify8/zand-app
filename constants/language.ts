// Language: the story of Persian. Its own world, dark but lighter in tone than history.
// Continuous scroll with a nav strip, in the manner of Geography.

export const lang = {
  bg: '#1E1B26',        // deep indigo, cooler than the history reader
  surface: '#2A2634',
  raised: '#332E3F',
  text: '#EFEAF2',
  textDim: '#A79FB4',
  hair: '#3E3849',
  gold: '#C9A86A',
  accent: '#8B7BB8',    // soft violet
  jade: '#7FA893',
};

export type LangBlock =
  | { t: 'p'; x: string }
  | { t: 'h'; x: string }
  | { t: 'lead'; x: string }
  | { t: 'mark'; x: string }
  | { t: 'cognates'; items: { fa: string; tr: string; en: string }[] }
  | { t: 'tree' }
  | { t: 'era'; items: { age: string; script: string; note: string }[] }
  | { t: 'loans'; items: { en: string; from: string; note: string }[] }
  | { t: 'split'; left: { title: string; x: string }; right: { title: string; x: string } }
  | { t: 'learncta' }
  | { t: 'close'; glyph: string; x: string };

export type LangPage = { blocks: LangBlock[] };
export type LangChapter = { key: string; title: string; nav: string; subtitle?: string; pages: LangPage[] };

export const LANG_CHAPTERS: LangChapter[] = [
  {
    key: 'l1',
    title: 'The Family',
    nav: 'The Root',
    subtitle: 'WHERE PERSIAN COMES FROM',
    pages: [
      { blocks: [
        { t: 'lead', x: 'Persian was never the language of the strongest army. It simply kept becoming the language of whoever won.', fa: 'فارسی هیچ‌وقت زبان قوی‌ترین ارتش نبود. فقط هر بار زبانِ کسی می‌شد که برنده شده بود.' },
        { t: 'p', x: 'Say pedar out loud, then say father. Persian is not a distant cousin of English. It is family. Both descend from a single language spoken somewhere on the steppe thousands of years ago, by people who left no writing and whose name we do not know. Their children walked west into Europe and east into Iran and India, and their words walked with them.', fa: '«پدر» را بلند بگو، بعد «father» را. فارسی پسرعموی دورِ انگلیسی نیست؛ خانوادهٔ نزدیک است. هر دو از یک زبان واحد می‌آیند که هزاران سال پیش جایی در دشت‌های شمالی حرف زده می‌شد، به دهان مردمی که هیچ نوشته‌ای از خود به جا نگذاشتند و نامشان را هم نمی‌دانیم. فرزندانشان رو به غرب به اروپا رفتند و رو به شرق به ایران و هند، و واژه‌هایشان هم با آنها راه افتادند.' },
        { t: 'p', x: 'Nobody borrowed these. They were inherited, from the same mouth, before Rome, before Athens, before Persepolis.', fa: 'هیچ‌کس این واژه‌ها را از دیگری وام نگرفته. به ارث رسیده‌اند، از یک دهان، پیش از روم، پیش از آتن، پیش از تخت جمشید.' },
        { t: 'cognates', items: [
          { fa: 'پدر', tr: 'pedar', en: 'father' },
          { fa: 'مادر', tr: 'madar', en: 'mother' },
          { fa: 'برادر', tr: 'baradar', en: 'brother' },
          { fa: 'دختر', tr: 'dokhtar', en: 'daughter' },
          { fa: 'نام', tr: 'nam', en: 'name' },
          { fa: 'دو', tr: 'do', en: 'two' },
          { fa: 'سه', tr: 'se', en: 'three' },
          { fa: 'ستاره', tr: 'setare', en: 'star' },
          { fa: 'ابرو', tr: 'abru', en: 'brow' },
          { fa: 'لب', tr: 'lab', en: 'lip' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'One tongue, many children', fa: 'یک زبان، فرزندان بسیار' },
        { t: 'p', x: 'The family is called Indo European, and it is the largest on earth. English, German, Spanish, Greek, Russian, Hindi, and Persian are all leaves on one tree. When an Iranian says madar and an Englishman says mother, they are both saying a word that was already old when the pyramids were young.', fa: 'نام این خانواده هندواروپایی است، و بزرگ‌ترین خانوادهٔ زبانی روی زمین. انگلیسی، آلمانی، اسپانیایی، یونانی، روسی، هندی و فارسی، همه برگ‌های یک درختند. وقتی یک ایرانی می‌گوید «مادر» و یک انگلیسی می‌گوید «mother»، هر دو دارند واژه‌ای را به زبان می‌آورند که وقتی اهرام مصر تازه‌ساز بودند، خودش دیگر کهنه شده بود.' },
        { t: 'tree' },
        { t: 'mark', x: 'Persian and English are cousins who last shared a house five thousand years ago.', fa: 'فارسی و انگلیسی پسرعموهایی هستند که آخرین بار پنج هزار سال پیش زیر یک سقف بوده‌اند.' },
      ] },
      { blocks: [
        { t: 'h', x: 'And the name of the land', fa: 'و نام این سرزمین' },
        { t: 'p', x: 'The word Iran carries this. It comes from Aryanam, meaning of the Aryans, which was simply what these people called themselves: the noble ones. The same root sits inside the name Eire, the old name for Ireland, at the other end of the same migration. The country never changed its name. Iran has been calling itself Iran for as long as it has been calling itself anything.', fa: 'خودِ واژهٔ «ایران» همین را با خود دارد. از «آریانام» می‌آید، یعنی سرزمینِ آریاییان، و آریایی چیزی نبود جز نامی که این مردم بر خودشان گذاشته بودند: نجیبان. همین ریشه در نام «ائیره» هم هست، نام کهن ایرلند، در آن سرِ دیگرِ همان کوچ. این کشور هیچ‌وقت نامش را عوض نکرد. ایران از وقتی که اصلاً نامی بر خود گذاشته، خودش را ایران خوانده است.' },
        { t: 'aside', x: 'Persia was the outside name, from Pars, one province. Iranians have always said Iran.', fa: '«پرشیا» نامی بود که بیرونی‌ها گذاشته بودند، برگرفته از پارس، که تنها یکی از استان‌ها بود. ایرانی‌ها همیشه گفته‌اند ایران.' },
      ] },
    ],
  },
  {
    key: 'l2',
    title: 'Three Thousand Years',
    nav: 'The Journey',
    subtitle: 'THE THREE AGES OF PERSIAN',
    pages: [
      { blocks: [
        { t: 'p', x: 'Very few languages on earth can be read across three thousand years and still be recognisably themselves. Persian can. It has changed its alphabet twice and its grammar has simplified beautifully, but the thread never broke.', fa: 'زبان‌های خیلی کمی روی زمین هستند که بشود سه هزار سال از تاریخشان را خواند و هنوز همان زبان را در آن شناخت. فارسی می‌تواند. دو بار خطش را عوض کرده و دستور زبانش هم به‌زیبایی ساده شده، اما آن رشته هیچ‌وقت پاره نشد.' },
        { t: 'era', items: [
          { age: 'Old Persian', ageFa: 'فارسی باستان', script: 'Cuneiform', scriptFa: 'میخی', note: 'The language of Darius, carved into the cliff at Bisotun. Wedge shaped marks pressed into stone.', noteFa: 'زبان داریوش، کنده‌شده بر صخرهٔ بیستون. نشانه‌هایی گوه‌مانند که بر سنگ فرو رفته‌اند.' },
          { age: 'Middle Persian', ageFa: 'فارسی میانه', script: 'Pahlavi', scriptFa: 'پهلوی', note: 'The language of the Sasanians, of the fire temples and the court, written in a script descended from Aramaic.', noteFa: 'زبان ساسانیان، زبان آتشکده‌ها و دربار، که با خطی نوشته می‌شد برگرفته از آرامی.' },
          { age: 'New Persian', ageFa: 'فارسی نو', script: 'Perso Arabic', scriptFa: 'فارسی‌عربی', note: 'The language of Ferdowsi, Hafez, and of Iran today. A new alphabet, the same tongue underneath.', noteFa: 'زبان فردوسی، حافظ، و ایرانِ امروز. الفبایی تازه، و همان زبان در زیرش.' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'Simpler, not weaker', fa: 'ساده‌تر، نه ضعیف‌تر' },
        { t: 'p', x: 'Old Persian was heavy with grammar, cases and genders and endings, in the way Latin was. Modern Persian shed almost all of it. There is no gender at all. No masculine table, no feminine chair. The same word, u, means he and she, and Persian has never needed to know which.', fa: 'فارسی باستان از دستور زبان سنگین بود؛ حالت و جنسیت و شناسه داشت، درست مثل لاتین. فارسی امروز تقریباً همهٔ اینها را کنار گذاشت. اصلاً جنسیت ندارد. نه میزِ مذکر، نه صندلیِ مؤنث. یک واژه، «او»، هم he است و هم she، و فارسی هیچ‌وقت لازم نداشته بداند کدام.' },
        { t: 'split', left: { title: 'What it dropped', titleFa: 'چه چیزی را کنار گذاشت', x: 'Cases, grammatical gender, most irregular endings. The scaffolding came down.', fa: 'حالت‌های صرفی، جنسیت دستوری، و بیشتر شناسه‌های بی‌قاعده. داربست فرو ریخت.' }, right: { title: 'What it kept', titleFa: 'چه چیزی را نگه داشت', x: 'Its word order, its verbs, its bones, and almost every word for the things that matter most.', fa: 'ترتیب واژه‌ها، فعل‌هایش، استخوان‌بندی‌اش، و تقریباً هر واژه‌ای برای چیزهایی که بیش از همه اهمیت دارند.' } },
        { t: 'p', x: 'This is why Persian is far easier for an English speaker than its script suggests. The alphabet looks foreign. The grammar underneath is a cousin, and it is gentler than French.', fa: 'برای همین است که فارسی برای یک انگلیسی‌زبان بسیار آسان‌تر از آن است که خطش نشان می‌دهد. الفبا بیگانه به نظر می‌رسد. اما دستور زبانی که زیرش نشسته، خویشاوند است؛ و از فرانسه هم مهربان‌تر.' },
      ] },
    ],
  },
  {
    key: 'l3',
    title: 'What Arabic Took',
    nav: 'The Conquest',
    subtitle: 'AND WHAT IT COULD NOT',
    pages: [
      { blocks: [
        { t: 'p', x: 'After the Arab conquest, Arabic became the language of religion, of scholarship, and of power. For two centuries Persian went quiet in the places that mattered. When it came back, it came back wearing Arabic letters and carrying thousands of Arabic words.', fa: 'پس از فتح عرب، عربی زبان دین شد و دانش و قدرت. دو قرن، فارسی در جاهایی که اهمیت داشت خاموش ماند. وقتی بازگشت، با حروف عربی بازگشت و هزاران واژهٔ عربی هم با خود آورد.' },
        { t: 'p', x: 'People often look at that and conclude that Persian became a kind of Arabic. It is one of the most common misreadings there is, and it is wrong in a way worth understanding precisely.', fa: 'خیلی‌ها به این نگاه می‌کنند و نتیجه می‌گیرند که فارسی نوعی عربی شده است. این یکی از رایج‌ترین برداشت‌های غلطی است که وجود دارد، و به شکلی نادرست است که می‌ارزد دقیق بفهمیمش.' },
        { t: 'split', left: { title: 'It took the script', titleFa: 'خط را گرفت', x: 'The alphabet is Arabic, with four letters added for sounds Arabic does not have: p, ch, zh, g. پ چ ژ گ' , fa: 'الفبا عربی است، با چهار حرف که برای صداهایی افزوده شد که در عربی نیست: پ چ ژ گ' }, right: { title: 'It took vocabulary', titleFa: 'واژه گرفت', x: 'Thousands of words, especially for law, faith, and learning. English did the same with French after 1066.', fa: 'هزاران واژه، به‌ویژه در حقوق و دین و دانش. انگلیسی هم پس از سال ۱۰۶۶ همین کار را با فرانسه کرد.' } },
      ] },
      { blocks: [
        { t: 'h', x: 'What it could not touch', fa: 'آنچه دست‌نخورده ماند' },
        { t: 'p', x: 'The grammar. Arabic is Semitic, built on three letter roots that bend into patterns. Persian is Indo European, and its verbs, its word order, its whole architecture stayed exactly where they were. A Persian sentence is not an Arabic sentence with different words. It is a different machine.', fa: 'دستور زبان. عربی زبانی سامی است، بنا شده بر ریشه‌های سه‌حرفی که در وزن‌های مشخص صرف می‌شوند. فارسی هندواروپایی است، و فعل‌هایش، ترتیب واژه‌هایش، و تمام معماری‌اش دقیقاً همان‌جا ماند که بود. یک جملهٔ فارسی، جملهٔ عربی با واژه‌های دیگر نیست. ماشین دیگری است.' },
        { t: 'mark', x: 'Persian borrowed Arabic words the way English borrowed French. The bones never changed.', fa: 'فارسی از عربی واژه وام گرفت، همان‌طور که انگلیسی از فرانسه وام گرفت. استخوان‌بندی هیچ‌وقت عوض نشد.' },
        { t: 'p', x: 'And the words closest to the heart stayed Persian. Mother, father, water, bread, fire, sky, love, and every number from one to ten. The conqueror language reached the courts and the books. It never reached the kitchen or the lullaby.', fa: 'و واژه‌هایی که به دل نزدیک‌ترند فارسی ماندند. مادر، پدر، آب، نان، آتش، آسمان، عشق، و هر عددی از یک تا ده. زبان فاتح به دربارها رسید و به کتاب‌ها. هیچ‌وقت به آشپزخانه و لالایی نرسید.' },
        { t: 'cognates', items: [
          { fa: 'آب', tr: 'ab', en: 'water' },
          { fa: 'نان', tr: 'nan', en: 'bread' },
          { fa: 'آتش', tr: 'atash', en: 'fire' },
          { fa: 'آسمان', tr: 'aseman', en: 'sky' },
          { fa: 'دل', tr: 'del', en: 'heart' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'And then a poet drew the line', fa: 'و بعد شاعری خط را کشید' },
        { t: 'p', x: 'Ferdowsi wrote the Shahnameh in a Persian deliberately stripped of Arabic wherever he could manage it, to prove the language needed to borrow nothing to carry a nation. Sixty thousand couplets, and the point was made permanently. That story has its own telling in Literature.', fa: 'فردوسی شاهنامه را به فارسی‌ای سرود که آگاهانه و تا آنجا که از دستش برمی‌آمد از عربی پیراسته بود، تا ثابت کند این زبان برای بر دوش کشیدن یک ملت به وام گرفتن از هیچ‌کس نیاز ندارد. شصت هزار بیت، و حرف برای همیشه ثابت شد. آن داستان، روایت جداگانهٔ خودش را در بخش ادبیات دارد.' },
      ] },
    ],
  },
  {
    key: 'l4',
    title: 'Words You Already Speak',
    nav: 'In English',
    subtitle: 'PERSIAN IN YOUR MOUTH',
    pages: [
      { blocks: [
        { t: 'p', x: 'You have been speaking Persian your whole life without noticing. These crossed into English through trade, through conquest, through the long road between Iran and everywhere else.', fa: 'انگلیسی‌زبان‌ها تمام عمرشان فارسی حرف زده‌اند بی‌آنکه متوجه باشند. این واژه‌ها از راه بازرگانی، از راه لشکرکشی، و از راه آن جادهٔ دراز میان ایران و بقیهٔ جهان، به انگلیسی رفته‌اند.' },
        { t: 'loans', items: [
          { en: 'paradise', from: 'pairidaeza', fromFa: 'پیریدَئِزَه', note: 'A walled garden. The Persian word for an enclosed garden became the word for heaven in half the languages of the world.', noteFa: 'باغی دیواردار. واژهٔ ایرانی برای باغِ بسته، در نیمی از زبان‌های جهان به واژهٔ بهشت بدل شد. در فارسی هم «پردیس» شد.' },
          { en: 'bazaar', from: 'bazar', fromFa: 'بازار', note: 'The market. It travelled with the goods.', noteFa: 'بازار. همراه با خودِ کالاها سفر کرد.' },
          { en: 'khaki', from: 'khak', fromFa: 'خاک', note: 'Dust, earth. The colour is named for the ground.', noteFa: 'خاک. نام آن رنگ از زمین گرفته شده.' },
          { en: 'pyjama', from: 'pay jameh', fromFa: 'پاجامه', note: 'Leg garment. It reached England through India.', noteFa: 'جامهٔ پا. از راه هند به انگلستان رسید.' },
          { en: 'candy', from: 'qand', fromFa: 'قند', note: 'Crystallised sugar.', noteFa: 'قند.' },
          { en: 'lemon', from: 'limu', fromFa: 'لیمو', note: 'And lime with it.', noteFa: 'و lime هم با آن رفت.' },
          { en: 'orange', from: 'narang', fromFa: 'نارنگ', note: 'The n was lost in the crossing. A narange became an orange.', noteFa: 'حرف «ن» در راه گم شد. a narange شد an orange.' },
          { en: 'spinach', from: 'esfenaj', fromFa: 'اسفناج', note: 'The plant travelled west from Iran.', noteFa: 'خودِ این گیاه از ایران رو به غرب رفت.' },
          { en: 'jasmine', from: 'yasamin', fromFa: 'یاسمین', note: 'The flower, and the name.', noteFa: 'هم گل، هم نام.' },
          { en: 'caravan', from: 'karvan', fromFa: 'کاروان', note: 'And caravanserai with it, the inn on the road.', noteFa: 'و کاروانسرا هم با آن رفت؛ همان منزلگاه سر راه.' },
          { en: 'kiosk', from: 'kushk', fromFa: 'کوشک', note: 'A garden pavilion. It became a newsstand.', noteFa: 'کوشک، یعنی عمارت کوچک میان باغ. در آن سر دنیا شد دکهٔ روزنامه‌فروشی.' },
          { en: 'magic', from: 'magush', fromFa: 'مُغ', note: 'From the Magi, the Zoroastrian priests of Persia.', noteFa: 'از مُغان، همان موبدان زرتشتی ایران.' },
        ] },
      ] },
      { blocks: [
        { t: 'mark', x: 'When you say paradise, you are describing a Persian garden with a wall around it.', fa: 'وقتی کسی می‌گوید paradise، دارد باغی ایرانی را وصف می‌کند که دورش دیوار کشیده‌اند.' },
        { t: 'p', x: 'That one is worth sitting with. Pairidaeza meant simply a walled enclosure, the sort of green space a Persian king built to hold the world in order: water, shade, symmetry, and birds. The Greeks borrowed the word, then scripture borrowed it, and an ordinary Persian garden became the name for heaven itself across the entire western world.', fa: 'روی همین یکی می‌ارزد کمی مکث کنیم. «پیریدَئِزَه» فقط یعنی جایی که دورش را بسته باشند؛ همان فضای سبزی که شاه ایرانی می‌ساخت تا جهان را در نظمی نگه دارد: آب، سایه، تقارن، و پرنده. یونانیان این واژه را وام گرفتند، بعد کتاب‌های مقدس، و یک باغ سادهٔ ایرانی در سرتاسر جهان غرب به نام خودِ بهشت بدل شد. همان واژه در فارسی «پردیس» شد.' },
        { t: 'p', x: 'The garden came too. The four quartered garden split by water channels, the chahar bagh, is the Persian design that produced the Taj Mahal gardens and every formal garden that followed them east.', fa: 'خودِ باغ هم رفت. آن باغِ چهارقسمتی که جوی‌های آب از میانش می‌گذرند، یعنی چهارباغ، همان طرح ایرانی است که باغ‌های تاج‌محل و هر باغ رسمیِ پس از آن در شرق از رویش ساخته شد.' },
      ] },
    ],
  },
  {
    key: 'l5',
    title: 'Alive and Spoken',
    nav: 'Today',
    subtitle: 'THE LANGUAGE NOW',
    pages: [
      { blocks: [
        { t: 'p', x: 'Persian is spoken by well over a hundred million people, and not only in Iran. It is Dari in Afghanistan and Tajik in Tajikistan, three names for what is substantially one language, and a speaker of each can follow the others.', fa: 'بیش از صد میلیون نفر فارسی حرف می‌زنند، و نه فقط در ایران. در افغانستان دری است و در تاجیکستان تاجیکی؛ سه نام برای چیزی که در اساس یک زبان است، و گویشور هر کدام حرف آن دو تای دیگر را می‌فهمد.' },
        { t: 'p', x: 'It runs right to left, joins its letters, and drops most short vowels from the writing, which is why the script looks harder than the language is. A reader supplies the vowels from knowing the word, exactly as you read English without noticing that ough says six different things.', fa: 'از راست به چپ می‌رود، حروفش به هم می‌چسبند، و بیشتر مصوت‌های کوتاه را نمی‌نویسد؛ برای همین خط سخت‌تر از خودِ زبان به نظر می‌رسد. خواننده مصوت‌ها را از شناختن خودِ واژه پر می‌کند، درست همان‌طور که تو «کرد» را می‌خوانی و از روی جمله می‌فهمی kard است یا kord یا Kord، بی‌آنکه یک لحظه هم مکث کنی.' },
        { t: 'split', left: { title: 'The hard part', titleFa: 'بخش سختش', x: 'A new alphabet, right to left, letters that change shape by position.', fa: 'الفبایی تازه، از راست به چپ، و حروفی که بسته به جایشان شکل عوض می‌کنند.' }, right: { title: 'The easy part', titleFa: 'بخش آسانش', x: 'No gender, no cases, regular verbs, and hundreds of words you already half know.', fa: 'نه جنسیت، نه حالت صرفی، فعل‌های باقاعده، و صدها واژه که نیمی از آنها را از پیش می‌شناسی.' } },
      ] },
      { blocks: [
        { t: 'h', x: 'Why it held', fa: 'چرا ماند' },
        { t: 'p', x: 'Languages die when their speakers stop needing them. Persian was conquered by Arabs, ruled by Turks, and burned through by Mongols, and it outlived every one of them, because the conquerors kept adopting it. The Seljuks ruled in Persian. The Mongol Ilkhans ended up patronising Persian. It was the language of courts from Istanbul to Delhi for centuries.', fa: 'زبان‌ها وقتی می‌میرند که گویشورانشان دیگر به آنها نیازی نداشته باشند. فارسی را عرب‌ها فتح کردند، ترک‌ها بر آن حکم راندند، و مغول‌ها از میانش گذشتند و سوزاندندش؛ و از همهٔ آنها عمر بیشتری کرد، چون فاتحان یکی پس از دیگری خودشان به آن رو آوردند. سلجوقیان به فارسی حکومت کردند. ایلخانان مغول سرانجام حامی فارسی شدند. قرن‌ها زبان دربارها بود، از استانبول تا دهلی.' },
        { t: 'mark', x: 'Every conqueror arrived to rule it, and stayed to speak it.', fa: 'هر فاتحی آمد تا بر آن حکم براند، و ماند تا به آن حرف بزند.' },
        { t: 'close', glyph: 'فارسی', x: 'A tongue that came off the steppe with words for mother and fire and star, that was carved in cuneiform and then in stone and then in ink, that lost its empire and kept its grammar, and that is still, this morning, being spoken to a child somewhere who will carry it another lifetime forward.', fa: 'زبانی که از دشت‌ها آمد و واژه‌هایی برای مادر و آتش و ستاره با خود آورد؛ که به خط میخی کنده شد، بعد بر سنگ، و بعد با مرکب نوشته شد؛ که امپراتوری‌اش را از دست داد و دستور زبانش را نگه داشت؛ و همین امروز صبح، جایی، دارد برای کودکی گفته می‌شود که یک عمر دیگر آن را با خود پیش خواهد برد.' },
        { t: 'learncta' },
      ] },
    ],
  },
];
