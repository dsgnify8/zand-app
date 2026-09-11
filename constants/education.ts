// Education content system. Topic -> Chapters -> Pages -> Blocks.

export const dark = {
  bg: '#17110F',
  surface: '#241C19',
  surfaceAlt: '#2E2420',
  text: '#F2EAE4',
  textDim: '#A99C95',
  hair: '#3A2F2A',
  accent: '#C85A4A',
  gold: '#C6A15B',
};

export type Block =
  | { t: 'h'; x: string; fa?: string }
  | { t: 'p'; x: string; fa?: string }
  | { t: 'ptext'; x: string; fa?: string }
  | { t: 'pull'; x: string; fa?: string }
  | { t: 'q'; x: string; fa?: string; by?: string }
  | { t: 'call'; title: string; x: string }
  | { t: 'fact'; label: string; value: string }
  | { t: 'stat'; items: { value: string; label: string }[] }
  | { t: 'timeline'; items: { year: string; label: string }[] }
  | { t: 'img'; key: string; cap?: string }
  | { t: 'imgwide'; key: string; cap?: string }
  | { t: 'imgsm'; key: string; cap?: string }
  | { t: 'imgrow'; keys: string[]; cap?: string }
  | { t: 'collage'; keys: string[]; cap?: string }
  | { t: 'circles'; items: { value: string; label: string }[] }
  | { t: 'boxes'; items: { title: string; x: string }[] }
  | { t: 'steps'; items: { title: string; x: string }[] }
  | { t: 'keyvalue'; items: { k: string; v: string }[] }
  | { t: 'quotebig'; x: string; fa?: string; by?: string }
  | { t: 'era'; value: string; label: string }
  | { t: 'numstat'; items: { n: string; label: string }[] }
  | { t: 'ribbon'; items: { year: string; label: string }[] }
  | { t: 'splitimg'; key: string; title: string; x: string }
  | { t: 'markline'; x: string; fa?: string }
  | { t: 'duo'; left: { title: string; x: string }; right: { title: string; x: string } }
  | { t: 'video'; key: string; cap?: string }
  | { t: 'map'; cap?: string }
  | { t: 'div' };

export type Page = { blocks: Block[] };
export type Chapter = {
  titleFa?: string;
  subtitleFa?: string; key: string; title: string; subtitle?: string; pages: Page[] };

export type Topic = {
  nameFa?: string;
  essenceFa?: string;
  closingFa?: string;
  key: string;
  category: string;
  name: string;
  persian?: string;
  years: string;
  essence: string;
  cover?: string;
  closing?: string;
  chapters: Chapter[];
  sources: string[];
  status: 'ready' | 'soon';
};

const mrp: Topic = {
  key: 'mohammad-reza-shah',
  category: 'history',
  name: 'Mohammad Reza Shah Pahlavi',
  persian: 'محمدرضا پهلوی',
  years: '1919 – 1980',
  essence: "The last Shah of Iran. A modernizer whose ambitions, reforms, and private burdens shaped the nation he ruled for nearly four decades.",
  essenceFa: 'آخرین شاه ایران. نوگرایی که آرزوها و اصلاحات و بارهای شخصی‌اش، کشوری را که نزدیک چهار دهه بر آن حکومت کرد شکل داد.',
  cover: 'mrp-cover',
  closing: 'mrp-cover',
  status: 'ready',
  sources: [
    'Mission for My Country (1961)',
    'The White Revolution (1966)',
    'The Philosophy Behind the Revolution (1971)',
    'On Oil (1971)',
    'Toward the Great Civilization (1977)',
    'Answer to History (1980)',
    'Abbas Milani, The Shah (2011)',
  ],
  chapters: [
    {
      key: 'ch1',
      title: 'A Prince and a New Dynasty',
      subtitle: '1919 – 1925',
      pages: [
        { blocks: [
          { t: 'fact', label: 'Born', labelFa: 'زادروز', value: '26 October 1919, Tehran', valueFa: '۴ آبان ۱۲۹۸، تهران' },
          { t: 'p', x: "Mohammad Reza was born in Tehran on an autumn morning in 1919, arriving only minutes before his twin sister, Ashraf. Their closeness would last a lifetime, and in the years to come she would be one of the fiercest defenders of his throne.", fa: 'محمدرضا در صبحی پاییزی در سال ۱۲۹۸ در تهران به دنیا آمد، تنها چند دقیقه پیش از خواهر دوقلویش، اشرف. این نزدیکی تا آخر عمر میانشان ماند، و در سال‌های بعد اشرف یکی از سرسخت‌ترین مدافعان تخت او شد.' },
          { t: 'p', x: "The Iran of his birth was weak and often humiliated. Its affairs were shaped in London and in Moscow as much as in Tehran, its treasury was empty, and its roads and schools were few. To grow up in that country was to feel, keenly, how far the nation had fallen from its ancient greatness.", fa: 'ایرانی که در آن زاده شد ناتوان بود و اغلب سرافکنده. کارهایش به همان اندازه که در تهران، در لندن و مسکو تعیین می‌شد؛ خزانه‌اش خالی بود و راه و مدرسه‌اش انگشت‌شمار. بزرگ شدن در چنین کشوری یعنی به‌روشنی حس کردن اینکه این ملت از بزرگی باستانی‌اش چقدر پایین آمده است.' },
          { t: 'p', x: "In his memoirs the Shah returned to this wound again and again. The wish to restore Iran to dignity, to make it modern and respected in the world, was for him never merely a policy. It was a feeling he traced all the way back to childhood.", fa: 'شاه در خاطراتش بارها به همین زخم برگشت. آرزوی بازگرداندن آبروی ایران، مدرن کردنش و محترم شدنش در جهان، برای او هرگز صرفاً یک سیاست نبود. حسی بود که ریشه‌اش را تا کودکی‌اش دنبال می‌کرد.' },
        ] },
        { blocks: [
          { t: 'ptext', x: "His father, {{reza-khan|Reza Khan}}, had risen from the mountain village of Alasht to become an officer in the Persian Cossack Brigade. Tall, forceful, and self taught, he was a soldier of real presence and iron will, and he believed that only a strong hand could lift Iran out of its weakness.", fa: 'پدرش، {{reza-khan|رضاخان}}، از روستای کوهستانی الاشت برخاسته و افسر بریگاد قزاق شده بود. بلندبالا و پرصلابت و خودآموخته؛ سربازی با حضوری واقعی و ارادهٔ آهنین، که باور داشت تنها یک دست نیرومند می‌تواند ایران را از ناتوانی بیرون بکشد.' },
          { t: 'p', x: "In February 1921 Reza Khan marched on the capital and took power in a nearly bloodless coup. For a few years he governed from behind the scenes as minister of war and then prime minister, building the army and the machinery of a modern state. Then, in 1925, he set aside the last Qajar ruler and was crowned Reza Shah Pahlavi, founding a new dynasty.", fa: 'در اسفند ۱۲۹۹، رضاخان به سوی پایتخت راه افتاد و در کودتایی که تقریباً بدون خون‌ریزی بود قدرت را گرفت. چند سالی از پشت صحنه حکومت کرد، اول به‌عنوان وزیر جنگ و بعد نخست‌وزیر، و در همان سال‌ها ارتش و دستگاه یک دولت مدرن را ساخت. سپس، در سال ۱۳۰۴، آخرین شاه قاجار را کنار گذاشت و با نام رضاشاه پهلوی تاج‌گذاری کرد و سلسله‌ای تازه بنیان نهاد.' },
          { t: 'timeline', items: [
            { year: '1878', yearFa: '۱۲۵۷', label: 'Reza Khan born', labelFa: 'تولد رضاخان' },
            { year: '1919', yearFa: '۱۲۹۸', label: 'Mohammad Reza born', labelFa: 'تولد محمدرضا' },
            { year: '1921', yearFa: '۱۲۹۹', label: 'The coup', labelFa: 'کودتا' },
            { year: '1925', yearFa: '۱۳۰۴', label: 'Pahlavi dynasty founded', labelFa: 'بنیان‌گذاری سلسلهٔ پهلوی' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A childhood set apart', fa: 'کودکی‌ای جدا از بقیه' },
          { t: 'p', x: "At six years old, Mohammad Reza became crown prince of a kingdom his father meant to remake from the ground up. He was raised apart from other children, handed to tutors and officers, and taught from the start that a throne and a mission were waiting for him. His father was determined that his heir would not be a soft, pampered prince of the old Qajar kind.", fa: 'محمدرضا در شش سالگی ولیعهد کشوری شد که پدرش می‌خواست از پایه از نو بسازد. جدا از بچه‌های دیگر بزرگ شد، به دست معلم‌ها و افسرها سپرده شد، و از همان اول به او آموختند که تخت و رسالتی در انتظارش است. پدرش مصمم بود که ولیعهدش شاهزاده‌ای نازپرورده از جنس قاجارها نباشد.' },
          { t: 'p', x: "Between a stern, towering father and a devoted mother, Tadj ol Molouk, the boy grew up carrying expectations far heavier than his years. He adored his father and feared him in equal measure, and much of his life would be spent trying to prove worthy of him.", fa: 'میان پدری سختگیر و بلندبالا و مادری دلسوز، تاج‌الملوک، پسر با انتظاراتی بزرگ‌تر از سن‌وسالش بار آمد. پدرش را می‌پرستید و به همان اندازه از او می‌ترسید، و بخش بزرگی از عمرش را صرف این کرد که ثابت کند لایق اوست.' },
          { t: 'imgsm', key: 'mrp-father', cap: 'The young prince with his father, Reza Shah, the founder of the dynasty.', capFa: 'ولیعهد خردسال در کنار پدرش، رضاشاه، بنیان‌گذار سلسله.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A brush with death', fa: 'یک قدمی مرگ' },
          { t: 'p', x: "As a small boy he fell gravely ill with typhoid fever and very nearly died. In his own account he emerged from the fever changed, believing he had been visited in his delirium by a saint and spared for a reason.", fa: 'در کودکی به تیفوئید مبتلا شد و تا آستانهٔ مرگ رفت. به روایت خودش، از آن تب دگرگون بیرون آمد؛ باور داشت که در هذیان تب، بزرگی بر او ظاهر شده و او را به دلیلی زنده نگه داشته‌اند.' },
          { t: 'p', x: "That conviction, that his life had been set apart for a purpose, never left him. It gave him courage in dark moments and, his critics would later say, a certainty that could shade into stubbornness.", fa: 'این باور، که زندگی‌اش برای هدفی کنار گذاشته شده، هرگز رهایش نکرد. در لحظه‌های تاریک به او جرئت می‌داد، و به گفتهٔ منتقدانش، یقینی به او می‌داد که گاه به لجاجت پهلو می‌زد.' },
          { t: 'call', title: 'A weight placed early', titleFa: 'باری که زود بر دوشش گذاشتند', x: "He was raised not as a child but as a future king. It gave him a deep sense of duty, and also a lifelong, sometimes anxious wish to earn the approval of the formidable man who had made him crown prince.", fa: 'او را نه مثل یک بچه، که مثل شاه آینده بار آوردند. این به او حس عمیقی از وظیفه داد، و در کنارش آرزویی مادام‌العمر و گاه مضطرب برای به دست آوردن تأیید همان مرد مهیبی که ولیعهدش کرده بود.' },
        ] },
      ],
    },
    {
      key: 'ch2',
      title: 'An Education Between Two Worlds',
      subtitle: '1925 – 1936',
      pages: [
        { blocks: [
          { t: 'p', x: "Reza Shah wanted his heir ready for a world his own generation had never seen. The boy was taken early from the women's quarters of the palace and placed under the care of tutors and officers, groomed with deliberate discipline for the throne.", fa: 'رضاشاه می‌خواست ولیعهدش برای جهانی آماده باشد که نسل خودش هرگز ندیده بود. پسر را زود از اندرونی کاخ بیرون آوردند و به معلم‌ها و افسرها سپردند، و با انضباطی حساب‌شده برای تخت آماده‌اش کردند.' },
          { t: 'p', x: "In 1931, at the age of twelve, he was sent abroad to the Institut Le Rosey in Switzerland. He was the first Iranian royal ever educated in Europe. His father meant it as preparation. The prince, at first, felt it as exile from everything he knew.", fa: 'در سال ۱۳۱۰، در دوازده سالگی، به مدرسهٔ لوروزه در سوئیس فرستاده شد. نخستین عضو خاندان سلطنتی ایران بود که در اروپا درس می‌خواند. پدرش این را آماده‌سازی می‌دانست. ولیعهد اما در آغاز، آن را تبعید از هر چه می‌شناخت حس کرد.' },
        ] },
        { blocks: [
          { t: 'img', key: 'mrp-school', cap: "The crown prince, farthest to the left, during his years at the Institut Le Rosey in Switzerland.", capFa: 'ولیعهد، در انتهای سمت چپ، در سال‌های تحصیلش در مدرسهٔ لوروزه سوئیس.' },
          { t: 'p', x: "At Le Rosey he learned French, took to football and skiing, and absorbed the manners and ideas of Europe. For the first time he lived among boys who did not bow to him, and he had to earn his place by character rather than birth. It was a lesson in standing on his own.", fa: 'در لوروزه فرانسه یاد گرفت، به فوتبال و اسکی رو آورد، و آداب و اندیشه‌های اروپا را در خود گرفت. برای نخستین بار میان پسرهایی زندگی می‌کرد که در برابرش تعظیم نمی‌کردند، و باید جایگاهش را با شخصیتش به دست می‌آورد نه با نسبش. درسی بود در روی پای خود ایستادن.' },
          { t: 'p', x: "He formed friendships that followed him home, among them the Swiss born Ernest Perron, who would remain close to him for years. In his memoirs he described these as the years his vision took shape.", fa: 'دوستی‌هایی در آنجا بست که تا ایران دنبالش آمدند؛ از جمله با ارنست پرون سوئیسی، که سال‌ها نزدیک او ماند. در خاطراتش این سال‌ها را سال‌هایی خواند که نگاهش در آن شکل گرفت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A bridge between two worlds', fa: 'پلی میان دو جهان' },
          { t: 'p', x: "He came to admire the order, the science, and the industry of the West, and to ask why his own ancient nation had fallen so far behind. Yet the more European he became in his habits, the more he felt the pull of Iran, its poetry, its history, its faith in itself.", fa: 'به نظم و دانش و صنعت غرب دل بست، و از خود پرسید چرا ملت کهن خودش این‌قدر عقب مانده است. اما هرچه در عادت‌هایش اروپایی‌تر می‌شد، کشش ایران را بیشتر حس می‌کرد؛ شعرش، تاریخش، و باوری که به خودش داشت.' },
          { t: 'p', x: "Out of that tension grew the idea that would guide his whole reign. Iran, he believed, must modernize swiftly and boldly, but in its own way, without surrendering the Persian soul that made it itself. He began to see himself as the bridge between the two.", fa: 'از دل همین کشمکش، اندیشه‌ای زاده شد که تمام دوران سلطنتش را هدایت کرد. باور داشت ایران باید سریع و جسورانه مدرن شود، اما به شیوهٔ خودش، بی‌آنکه آن جان ایرانی را که ایرانش می‌کند واگذار کند. کم‌کم خودش را پل میان این دو دید.' },
        ] },
        { blocks: [
          { t: 'stat', items: [
            { value: '1931', valueFa: '۱۳۱۰', label: 'Arrived in Switzerland', labelFa: 'ورود به سوئیس' },
            { value: '5 yrs', valueFa: '۵ سال', label: 'Abroad at Le Rosey', labelFa: 'دور از وطن، در لوروزه' },
            { value: 'French', valueFa: 'فرانسه', label: 'A second language', labelFa: 'زبان دوم' },
          ] },
          { t: 'p', x: "He returned to Iran in 1936 and entered the military academy in Tehran, stepping into the disciplined, uniformed world his father prized above all. He graduated as a young officer, proud of the army his father had built and eager to serve it.", fa: 'در سال ۱۳۱۵ به ایران بازگشت و وارد دانشکدهٔ افسری تهران شد؛ پا گذاشتن به همان جهان منضبط و یونیفرم‌پوشی که پدرش بیش از هر چیز ارج می‌نهاد. به‌عنوان افسری جوان فارغ‌التحصیل شد، سربلند از ارتشی که پدرش ساخته بود و مشتاق خدمت در آن.' },
          { t: 'pull', x: "Two Irans lived in him already, the modern and the ancient, the European and the Persian.", fa: 'دو ایران از همان موقع در او زندگی می‌کردند؛ مدرن و باستانی، اروپایی و ایرانی.' },
          { t: 'p', x: "Holding those two Irans together would become the work of his life. In these school years the tension was still a promise rather than a problem, and the young prince believed, with the confidence of the young, that he could honor both at once.", fa: 'کنار هم نگه داشتن این دو ایران، کار تمام عمرش شد. در آن سال‌های مدرسه، این کشمکش هنوز یک نوید بود نه یک مشکل، و ولیعهد جوان با اعتمادبه‌نفس جوانی باور داشت که می‌تواند حق هر دو را با هم ادا کند.' },
          { t: 'imgsm', key: 'mrp-ch2-end', cap: 'The crown prince, shaped by two worlds, returns home to serve Iran.', capFa: 'ولیعهد، که دو جهان شکلش داده بودند، برای خدمت به ایران به وطن بازمی‌گردد.' },
        ] },
      ],
    },
    {
      key: 'ch3',
      title: 'Marriage, War, and a Crown',
      subtitle: '1939 – 1943',
      pages: [
        { blocks: [
          { t: 'p', x: "In 1939 the crown prince married Princess Fawzia of Egypt, the sister of King Farouk. The union joined two royal houses and filled the newsreels with glamour, and a daughter, Shahnaz, was born the following year.", fa: 'در سال ۱۳۱۸، ولیعهد با شاهزاده فوزیه، خواهر فاروق پادشاه مصر، ازدواج کرد. این پیوند دو خاندان سلطنتی را به هم رساند و خبرهای تصویری را از شکوه پر کرد، و سال بعد دختری به نام شهناز به دنیا آمد.' },
          { t: 'fact', label: 'First marriage', labelFa: 'نخستین ازدواج', value: 'Princess Fawzia of Egypt, 1939', valueFa: 'شاهزاده فوزیهٔ مصر، ۱۳۱۸' },
          { t: 'imgsm', key: 'mrp-fawzia', cap: "Mohammad Reza and Queen Fawzia in the early years of their marriage.", capFa: 'محمدرضا و ملکه فوزیه در سال‌های نخست ازدواجشان.' },
          { t: 'p', x: "Yet the marriage had been arranged for reasons of state as much as of the heart. Fawzia, celebrated across the world for her beauty, was unhappy far from home in the cold formality of the Tehran court, and a quiet distance grew between them that the years would only widen.", fa: 'اما این ازدواج به همان اندازه که از سر دل بود، از سر مصلحت کشور هم بود. فوزیه که زیبایی‌اش در سراسر جهان زبانزد بود، دور از وطن و در تشریفات سرد دربار تهران خوشحال نبود، و فاصله‌ای خاموش میانشان افتاد که سال‌ها فقط بیشترش کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The war reaches Iran', fa: 'جنگ به ایران می‌رسد' },
          { t: 'p', x: "Iran had declared itself neutral, but neutrality could not protect it. Reza Shah's ties to German engineers and trade, and above all the Trans Iranian Railway he had built, made the country too important to leave alone. Britain and the Soviet Union needed that railway to carry supplies to the Soviet front.", fa: 'ایران خود را بی‌طرف اعلام کرده بود، اما بی‌طرفی نتوانست از آن محافظت کند. پیوند رضاشاه با مهندسان و تجارت آلمان، و بیش از همه راه‌آهن سراسری‌ای که ساخته بود، این کشور را مهم‌تر از آن کرد که به حال خود رها شود. بریتانیا و شوروی به آن راه‌آهن نیاز داشتند تا تدارکات را به جبههٔ شوروی برسانند.' },
          { t: 'p', x: "In August 1941 their armies invaded from north and south at once. The Iranian forces, the pride of Reza Shah's reign, were overwhelmed within days. For the old king it was a bitter blow, to watch the army he had built collapse before the very powers he had tried to keep at arm's length.", fa: 'در شهریور ۱۳۲۰، ارتش‌های آنها همزمان از شمال و جنوب وارد شدند. نیروهای ایران، مایهٔ فخر دوران رضاشاه، ظرف چند روز از پا درآمدند. برای شاه پیر ضربه‌ای تلخ بود که ببیند ارتشی که ساخته بود در برابر همان قدرت‌هایی فرو می‌ریزد که کوشیده بود دورشان نگه دارد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Reza Shah Pahlavi abdicates', fa: 'رضاشاه پهلوی از سلطنت کناره می‌گیرد' },
          { t: 'p', x: "The occupying powers no longer wanted Reza Shah on the throne. Rather than see the dynasty destroyed, he abdicated in favor of his son and left the country. The founder of modern Iran, the strong father who had shaped the prince's entire world, was carried away into exile.", fa: 'قدرت‌های اشغالگر دیگر رضاشاه را بر تخت نمی‌خواستند. به جای آنکه سلسله از میان برود، به سود پسرش کناره گرفت و از کشور رفت. بنیان‌گذار ایران مدرن، همان پدر مقتدری که تمام جهان ولیعهد را شکل داده بود، به تبعید برده شد.' },
          { t: 'p', x: "He was taken first to Mauritius, then to South Africa, and he died in Johannesburg in 1944, never seeing Iran again. For Mohammad Reza the loss was personal as much as political. He remembered his father with awe and love, and the pain of that parting stayed with him for the rest of his life.", fa: 'نخست به موریس بردندش، بعد به آفریقای جنوبی، و در سال ۱۳۲۳ در ژوهانسبورگ درگذشت، بی‌آنکه دیگر ایران را ببیند. برای محمدرضا این فقدان به همان اندازه که سیاسی بود، شخصی هم بود. پدرش را با هیبت و محبت به یاد می‌آورد، و درد آن جدایی تا آخر عمر با او ماند.' },
          { t: 'imgsm', key: 'mrp-abdicate', cap: 'Reza Shah, who abdicated in 1941 so the dynasty might endure through his son.', capFa: 'رضاشاه، که در سال ۱۳۲۰ کناره گرفت تا سلسله از راه پسرش دوام بیاورد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Mohammad Reza Pahlavi becomes king', fa: 'محمدرضا پهلوی شاه می‌شود' },
          { t: 'p', x: "On 16 September 1941, at just twenty one, Mohammad Reza Pahlavi took the throne. He became king in a capital full of foreign soldiers, with real power resting, for now, in the parliament and in the Allied armies.", fa: 'در ۲۵ شهریور ۱۳۲۰، در بیست و یک سالگی، محمدرضا پهلوی بر تخت نشست. در پایتختی شاه شد که پر از سرباز خارجی بود، و قدرت واقعی، دست‌کم فعلاً، در مجلس و در دست ارتش‌های متفقین بود.' },
          { t: 'p', x: "Before parliament he swore to uphold the constitution, and he presented himself, at first, as a modest and careful constitutional monarch, a deliberate contrast to his father's absolute rule. He would spend years quietly gathering the authority that his crown, in these early days, did not yet hold.", fa: 'در برابر مجلس سوگند خورد که قانون اساسی را پاس بدارد، و در آغاز خود را پادشاهی مشروطه و محتاط نشان داد؛ تضادی عامدانه با حکومت مطلق پدرش. سال‌ها بی‌سروصدا اختیاراتی را جمع کرد که تاج او در آن روزهای اول هنوز نداشت.' },
          { t: 'imgsm', key: 'mrp-young-king', cap: 'The young Mohammad Reza Pahlavi, the new king of Iran.', capFa: 'محمدرضا پهلوی جوان، شاه تازهٔ ایران.' },
          { t: 'pull', x: "He had inherited a throne, but not yet the power that came with it.", fa: 'تخت را به ارث برده بود، اما قدرتی را که با آن می‌آید هنوز نه.' },
        ] },
        { blocks: [
          { t: 'p', x: "In 1943 Tehran hosted Churchill, Roosevelt, and Stalin, who settled the course of the war in his own capital while the young Shah looked on from its edges. He met the three leaders, but the great decisions were made around him, not by him, and the humiliation lodged deep.", fa: 'در سال ۱۳۲۲، تهران میزبان چرچیل و روزولت و استالین بود؛ آنها مسیر جنگ را در پایتخت خودِ او تعیین کردند و شاه جوان از حاشیه تماشا کرد. با هر سه رهبر دیدار کرد، اما تصمیم‌های بزرگ دور و بر او گرفته شد، نه به دست او، و این خواری در جانش نشست.' },
          { t: 'p', x: "These lean early years taught him patience, and left him with a lasting wariness of the great powers whose armies filled his streets. He resolved that one day he would rule in fact, and not merely reign in name.", fa: 'آن سال‌های اول و کم‌رمق به او صبر آموخت، و بی‌اعتمادی ماندگاری نسبت به قدرت‌های بزرگی که ارتش‌هایشان خیابان‌های او را پر کرده بود در او گذاشت. با خود عهد کرد روزی در عمل حکومت کند، نه فقط به اسم پادشاه باشد.' },
          { t: 'timeline', items: [
            { year: '1939', yearFa: '۱۳۱۸', label: 'Marries Fawzia', labelFa: 'ازدواج با فوزیه' },
            { year: '1941', yearFa: '۱۳۲۰', label: 'Allied invasion', labelFa: 'حملهٔ متفقین' },
            { year: '1941', yearFa: '۱۳۲۰', label: 'Mohammad Reza becomes king', labelFa: 'محمدرضا شاه می‌شود' },
            { year: '1943', yearFa: '۱۳۲۲', label: 'Tehran Conference', labelFa: 'کنفرانس تهران' },
            { year: '1944', yearFa: '۱۳۲۳', label: 'Reza Shah dies in exile', labelFa: 'مرگ رضاشاه در تبعید' },
          ] },
        ] },
      ],
    },
    {
      key: 'ch4',
      title: 'Finding His Feet',
      subtitle: '1946 – 1951',
      pages: [
        { blocks: [
          { t: 'h', x: 'The Azerbaijan crisis', fa: 'غائلهٔ آذربایجان' },
          { t: 'p', x: "The young Shah's first great test came in 1946. Soviet troops had lingered in the north after the war and backed two breakaway states, one in Azerbaijan and one in Kurdistan. For a moment it seemed Iran might be pulled apart, its northern provinces slipping out of Tehran's hands.", fa: 'نخستین آزمون بزرگ شاه جوان در سال ۱۳۲۵ از راه رسید. نیروهای شوروی پس از جنگ در شمال مانده بودند و از دو حکومت جدایی‌طلب پشتیبانی می‌کردند، یکی در آذربایجان و یکی در کردستان. مدتی چنین می‌نمود که ایران ممکن است از هم بپاشد و استان‌های شمالی‌اش از دست تهران در برود.' },
          { t: 'p', x: "Through patient diplomacy, pressure at the newly formed United Nations, and a promise of oil concessions that was later quietly withdrawn, Iran secured the Soviet withdrawal. In December 1946 the Iranian army marched back into Tabriz, and the country was made whole again.", fa: 'با دیپلماسی صبورانه، فشار در سازمان ملل که تازه تأسیس شده بود، و وعدهٔ امتیاز نفتی که بعدها بی‌سروصدا پس گرفته شد، ایران خروج نیروهای شوروی را به دست آورد. در آذر ۱۳۲۵ ارتش ایران به تبریز بازگشت و کشور دوباره یکپارچه شد.' },
          { t: 'p', x: "For a king still unsure of himself, it was a formative victory. He rode north to the reclaimed provinces to cheering crowds, and for the first time felt the throne truly his.", fa: 'برای شاهی که هنوز به خودش مطمئن نبود، این پیروزی شکل‌دهنده بود. به شمال و به استان‌های بازپس‌گرفته‌شده رفت و مردم به شادی به استقبالش آمدند، و برای نخستین بار حس کرد این تخت واقعاً مال اوست.' },
          { t: 'imgrow', keys: ['mrp-ch4-a', 'mrp-ch4-b'], cap: 'The young Shah in the early years of his reign, finding his footing as king.', capFa: 'شاه جوان در سال‌های نخست سلطنتش، در حال یافتن جای پای خود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Shot at the University', fa: 'تیراندازی در دانشگاه' },
          { t: 'p', x: "In February 1949, at a ceremony at Tehran University, a gunman hidden among the press drew a pistol and fired at close range. Several bullets struck near his face, one passing through his military cap, yet he walked away with only minor wounds. The assassin was shot dead on the spot.", fa: 'در بهمن ۱۳۲۷، در مراسمی در دانشگاه تهران، ضاربی که میان خبرنگاران پنهان شده بود اسلحه کشید و از فاصلهٔ نزدیک شلیک کرد. چند گلوله نزدیک صورتش نشست و یکی از کلاه نظامی‌اش گذشت، اما تنها با جراحتی سطحی از آنجا بیرون آمد. ضارب همان‌جا کشته شد.' },
          { t: 'p', x: "He took the escape as another sign that providence was guarding him for his mission. In its aftermath the government blamed the plot on the communist Tudeh party, banned it, and moved to strengthen the powers of the crown, creating a senate and widening the king's authority.", fa: 'جان سالم به در بردن را نشانهٔ دیگری دانست از اینکه تقدیر او را برای رسالتش نگه داشته است. پس از آن، دولت حزب تودهٔ کمونیست را عامل توطئه دانست، آن را ممنوع کرد، و به تقویت اختیارات سلطنت پرداخت؛ مجلس سنا تشکیل شد و دامنهٔ قدرت شاه گسترده‌تر شد.' },
          { t: 'call', title: 'A belief in destiny', titleFa: 'باور به تقدیر', x: "More than once in his life the Shah brushed against death and walked away. He came to see these escapes as signs of a divine mission. This is his own account of himself, offered here to understand how he saw his role, and how that certainty shaped the choices he made.", fa: 'شاه بیش از یک بار در زندگی‌اش از کنار مرگ گذشت و سالم بیرون آمد. کم‌کم این جان به در بردن‌ها را نشانهٔ رسالتی الهی دانست. این روایت خودش از خودش است، و اینجا آورده شده تا بفهمیم نقش خود را چگونه می‌دید، و آن یقین چگونه انتخاب‌هایش را شکل داد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A new love', fa: 'عشقی تازه' },
          { t: 'p', x: "His personal life was shifting too. His marriage to Fawzia had grown cold, and in 1948 it ended in divorce. She returned to Egypt, and their daughter Shahnaz remained a bond between the two royal families.", fa: 'زندگی شخصی‌اش هم داشت تغییر می‌کرد. ازدواجش با فوزیه سرد شده بود و در سال ۱۳۲۷ به طلاق انجامید. فوزیه به مصر بازگشت، و دخترشان شهناز پیوندی میان دو خاندان سلطنتی باقی ماند.' },
          { t: 'p', x: "In 1951 he married Soraya Esfandiary, a young woman of Iranian and German parentage, barely eighteen. By every account it was a genuine love match.", fa: 'در سال ۱۳۲۹ با ثریا اسفندیاری ازدواج کرد؛ دختری از پدری ایرانی و مادری آلمانی، که به‌زحمت هجده سال داشت. به گواه همهٔ روایت‌ها، این ازدواج از سر عشق بود.' },
          { t: 'collage', keys: ['mrp-soraya-1', 'mrp-soraya-2'], cap: 'The Shah and Soraya, whose marriage was, by every account, a true love match.', capFa: 'شاه و ثریا، که ازدواجشان به گواه همه از سر عشق واقعی بود.' },
          { t: 'p', x: "The photographs of these years show a couple plainly devoted to each other. For a time, amid the gathering storms of politics, he had found real happiness at home.", fa: 'عکس‌های آن سال‌ها زوجی را نشان می‌دهد که آشکارا به هم دل‌بسته‌اند. مدتی، در میان توفان‌هایی که در سیاست جمع می‌شد، در خانه خوشبختی واقعی یافته بود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A restless nation', fa: 'کشوری بی‌قرار' },
          { t: 'p', x: "The country around him, however, was anything but calm. Parliament was strong and combative, the press was loud, and a single question was rising above all others. Why did Iran's greatest treasure, its oil, remain in the hands of a foreign company that kept the lion's share of the profit?", fa: 'اما کشوری که دور و برش بود هر چیزی بود جز آرام. مجلس نیرومند و ستیزه‌جو بود، مطبوعات پرصدا، و یک پرسش بالاتر از همه سر برمی‌آورد: چرا بزرگ‌ترین ثروت ایران، یعنی نفتش، در دست شرکتی خارجی بماند که سهم شیر از سود را برای خود برمی‌دارد؟' },
          { t: 'p', x: "In March 1951 the prime minister, General Razmara, who had cautioned against seizing the oil, was assassinated. Within days parliament voted to nationalize the industry, and a fervent nationalist named Mohammad Mossadegh rode the wave of popular feeling to power. The stage was set for the greatest crisis of the Shah's early reign.", fa: 'در اسفند ۱۳۲۹، نخست‌وزیر، سپهبد رزم‌آرا، که دربارهٔ ملی کردن نفت هشدار داده بود، ترور شد. ظرف چند روز مجلس به ملی شدن صنعت نفت رأی داد، و ملی‌گرایی پرشور به نام محمد مصدق بر موج احساسات مردم به قدرت رسید. صحنه برای بزرگ‌ترین بحران سال‌های نخست سلطنت شاه آماده شده بود.' },
        ] },
      ],
    },
    {
      key: 'ch5',
      title: 'The Oil Crisis and 1953',
      subtitle: '1951 – 1953',
      pages: [
        { blocks: [
          { t: 'h', x: "Oil and a nation's pride", fa: 'نفت و غرور یک ملت' },
          { t: 'p', x: "Since the first concession of 1901, Iran's oil had been controlled by the British owned Anglo Iranian Oil Company. Britain took the greater share of the wealth, while Iran received only modest royalties, and the vast refinery at Abadan, the largest in the world, stood as a daily reminder of who truly profited from Iranian soil.", fa: 'از نخستین امتیازنامه در سال ۱۲۸۰، نفت ایران در اختیار شرکت نفت ایران و انگلیس بود که مالکیتش بریتانیایی بود. بریتانیا سهم بزرگ‌تر ثروت را می‌برد و ایران تنها حق‌الامتیازی ناچیز می‌گرفت، و پالایشگاه عظیم آبادان، بزرگ‌ترین پالایشگاه جهان، هر روز یادآوری می‌کرد که سود واقعی خاک ایران به جیب چه کسی می‌رود.' },
          { t: 'p', x: "To many Iranians this was not just an unfair contract but a wound to national pride, a symbol of the foreign hands that had shaped their country for too long. The demand to reclaim the oil united nationalists, the left, and much of the clergy in a single, powerful cause.", fa: 'برای بسیاری از ایرانی‌ها این فقط یک قرارداد ناعادلانه نبود، زخمی بر غرور ملی بود؛ نماد دست‌های بیگانه‌ای که مدت‌ها بیش از حد کشورشان را شکل داده بودند. خواستِ بازپس‌گیری نفت، ملی‌گرایان و چپ و بخش بزرگی از روحانیت را زیر یک پرچم نیرومند گرد آورد.' },
          { t: 'imgsm', key: 'mrp-oil', cap: 'The Abadan refinery, once the largest in the world, at the heart of the oil dispute.', capFa: 'پالایشگاه آبادان، که روزگاری بزرگ‌ترین پالایشگاه جهان بود، در کانون اختلاف نفت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Mossadegh rises', fa: 'برآمدن مصدق' },
          { t: 'p', x: "Mohammad Mossadegh was unlike any figure Iran had seen. Aristocratic, emotional, and by all accounts incorruptible, he could move a crowd to tears and often wept himself, conducting affairs of state from his bed and appearing in parliament in his pajamas. To his supporters he was the pure voice of the nation.", fa: 'محمد مصدق شبیه هیچ چهره‌ای نبود که ایران تا آن روز دیده باشد. اشراف‌زاده، احساساتی، و به گواه همه دست‌پاک؛ می‌توانست جمعیتی را به گریه بیندازد و خودش هم اغلب می‌گریست، کارهای مملکت را از بستر اداره می‌کرد و با لباس خواب در مجلس حاضر می‌شد. برای هوادارانش، صدای خالص ملت بود.' },
          { t: 'imgsm', key: 'mrp-mossadegh', cap: 'Mohammad Mossadegh, the nationalist prime minister who nationalized Iran\'s oil.', capFa: 'محمد مصدق، نخست‌وزیر ملی‌گرا که صنعت نفت ایران را ملی کرد.' },
          { t: 'p', x: "He led the National Front, drove through the nationalization of oil, and became prime minister in 1951 to enormous acclaim, named Time's Man of the Year. Between the cautious young king who longed for authority and the popular premier who embodied the will of the street, a deep and uneasy rivalry began to grow.", fa: 'رهبری جبههٔ ملی را بر عهده داشت، ملی شدن نفت را به سرانجام رساند، و در سال ۱۳۳۰ با استقبالی گسترده نخست‌وزیر شد؛ مجلهٔ تایم مرد سال خواندش. میان شاه جوان و محتاطی که تشنهٔ اختیار بود و نخست‌وزیر محبوبی که ارادهٔ خیابان را نمایندگی می‌کرد، رقابتی عمیق و پرتنش شکل گرفت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The boycott and the standoff', fa: 'تحریم و رویارویی' },
          { t: 'p', x: "Britain struck back hard. It organized a worldwide boycott of Iranian oil, blockaded Abadan with its navy, and took the dispute to the World Court and the United Nations. Iran's oil sales collapsed, the economy was strangled, and ordinary people began to feel the pain of empty treasuries and rising hardship.", fa: 'بریتانیا سخت پاسخ داد. تحریم جهانی نفت ایران را سازمان داد، آبادان را با ناوگانش محاصره کرد، و اختلاف را به دیوان لاهه و سازمان ملل برد. فروش نفت ایران فرو ریخت، اقتصاد در تنگنا افتاد، و مردم عادی درد خزانهٔ خالی و سختی روزافزون را حس کردند.' },
          { t: 'p', x: "Rather than break Mossadegh, the pressure made him stronger. He demanded emergency powers and control of the war ministry, clashing directly with the Shah over command of the army. When he briefly resigned in July 1952, a popular uprising swept him back into office. But the country was splitting apart, and the communist Tudeh was gaining in the streets.", fa: 'این فشار به جای شکستن مصدق، او را نیرومندتر کرد. اختیارات ویژه و کنترل وزارت جنگ را خواست، و بر سر فرماندهی ارتش مستقیماً با شاه درگیر شد. وقتی در تیر ۱۳۳۱ برای مدت کوتاهی استعفا داد، قیام مردمی سی تیر او را دوباره به قدرت بازگرداند. اما کشور داشت از هم می‌پاشید، و حزب تودهٔ کمونیست در خیابان‌ها قوی‌تر می‌شد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Foreign hands', fa: 'دست‌های بیگانه' },
          { t: 'call', title: 'The truth, plainly', titleFa: 'حقیقت، ساده و روشن', x: "Unable to break Mossadegh alone, Britain turned to the United States. Fearing that a weakened Iran might fall to communism, President Eisenhower approved a covert operation, known to the Americans as Ajax and to the British as Boot. Run by the CIA's Kermit Roosevelt with British intelligence, it funded street gangs, bribed officers and newspapers, and prepared to remove the prime minister.", fa: 'بریتانیا که به‌تنهایی از پس مصدق برنمی‌آمد، به آمریکا رو آورد. رئیس‌جمهور آیزنهاور که نگران بود ایرانِ ناتوان به دامان کمونیسم بیفتد، عملیاتی پنهانی را تأیید کرد؛ آمریکایی‌ها آن را آژاکس می‌خواندند و بریتانیایی‌ها بوت. این عملیات را کرمیت روزولت از سیا با همکاری سرویس اطلاعاتی بریتانیا اداره می‌کرد؛ به اراذل خیابانی پول رساند، به افسران و روزنامه‌ها رشوه داد، و زمینهٔ برکناری نخست‌وزیر را فراهم کرد.' },
          { t: 'p', x: "Documents released in the decades since have made the foreign role clear. In his own books the Shah described the events as the will of his people and a lawful act of the crown. Both accounts are part of the record, and the distance between them would shape how a generation of Iranians came to see him.", fa: 'اسنادی که در دهه‌های بعد منتشر شد، نقش بیگانه را روشن کرد. شاه در کتاب‌های خودش این رویدادها را خواست مردمش و اقدامی قانونی از سوی سلطنت توصیف کرد. هر دو روایت بخشی از سند تاریخ‌اند، و فاصلهٔ میانشان بود که شکل داد به اینکه یک نسل از ایرانی‌ها او را چگونه ببینند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'August 1953', fa: 'مرداد ۱۳۳۲' },
          { t: 'p', x: "The Shah signed royal decrees dismissing Mossadegh and appointing General Zahedi in his place. The first attempt, in mid August, failed. Mossadegh's supporters held the streets, and the frightened king fled the country, first to Baghdad and then to Rome, convinced he had lost his throne forever.", fa: 'شاه فرمان‌هایی امضا کرد که مصدق را برکنار و سرلشکر زاهدی را به جای او منصوب می‌کرد. تلاش اول، در نیمهٔ مرداد، شکست خورد. هواداران مصدق خیابان‌ها را در دست گرفتند، و شاهِ هراسان از کشور گریخت؛ نخست به بغداد و بعد به رم، با این باور که تختش را برای همیشه از دست داده است.' },
          { t: 'p', x: "For several days the outcome hung in the balance. Then, on 19 August, organized crowds and loyal army units turned the tide, Mossadegh's government fell, and Zahedi took power. Stunned and relieved, the Shah flew home to cheering crowds and a throne restored.", fa: 'چند روز نتیجه در تعلیق ماند. سپس، در ۲۸ مرداد، جمعیت‌های سازمان‌یافته و یگان‌های وفادار ارتش ورق را برگرداندند، دولت مصدق سقوط کرد، و زاهدی قدرت را به دست گرفت. شاه، مبهوت و آسوده، به کشور بازگشت؛ به استقبال جمعیت و به تختی که دوباره برایش برپا شده بود.' },
          { t: 'pull', x: "From this moment he would rule, and no longer merely reign.", fa: 'از این لحظه به بعد حکومت می‌کرد، نه اینکه فقط پادشاه باشد.' },
          { t: 'p', x: "The year 1953 was the hinge of his reign. It gave him at last the power that had eluded him since boyhood. But the manner of his return, carried home on foreign shoulders, cast a long shadow over his legitimacy that he would never fully escape, however much he later sought to minimize the hands that had helped him.", fa: 'سال ۱۳۳۲ لولای سلطنت او بود. سرانجام قدرتی را به او داد که از کودکی از دستش می‌گریخت. اما شیوهٔ بازگشتش، که بر دوش بیگانه به خانه آورده شد، سایه‌ای دراز بر مشروعیتش انداخت؛ سایه‌ای که هرگز به‌تمامی از آن رها نشد، هر قدر هم بعدها کوشید نقش دست‌هایی را که کمکش کرده بودند کم‌رنگ کند.' },
        ] },
      ],
    },
    {
      key: 'ch6',
      title: 'Soraya, and the Search for an Heir',
      subtitle: '1954 – 1958',
      pages: [
        { blocks: [
          { t: 'p', x: "With his throne secured, the Shah turned to rebuilding. A fair new oil agreement in 1954 restored the country's income, American aid flowed in, and the economy slowly steadied. For a few years the king and his young queen seemed to have everything before them.", fa: 'با تثبیت تخت، شاه به بازسازی رو آورد. قرارداد نفتی تازه‌ای در سال ۱۳۳۳ درآمد کشور را بازگرداند، کمک آمریکا سرازیر شد، و اقتصاد به‌آرامی سر و سامان گرفت. چند سالی چنین می‌نمود که شاه و ملکهٔ جوانش همه‌چیز را پیش رو دارند.' },
          { t: 'p', x: "Yet a shadow lay over the palace. The dynasty needed a male heir, and as the years passed, Soraya bore no child. In a monarchy whose survival depended on the line of succession, it was the one problem that power and wealth could not solve.", fa: 'اما سایه‌ای بر کاخ افتاده بود. سلسله به ولیعهد پسر نیاز داشت، و سال‌ها گذشت و ثریا فرزندی نیاورد. در پادشاهی‌ای که بقایش به خط جانشینی بستگی داشت، این تنها مشکلی بود که قدرت و ثروت نمی‌توانست حلش کند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'An impossible choice', fa: 'انتخابی ناممکن' },
          { t: 'p', x: "Doctors were consulted across Europe, and the pressure grew heavier each year, from the court, from the clergy, and from the cold logic of the crown itself. The Shah, by his own account, loved Soraya deeply and searched for any way to keep her.", fa: 'در سراسر اروپا با پزشکان مشورت شد، و فشار هر سال سنگین‌تر شد؛ از سوی دربار، از سوی روحانیت، و از سوی همان منطق سرد خودِ سلطنت. شاه، به روایت خودش، ثریا را عمیقاً دوست داشت و دنبال هر راهی می‌گشت که نگهش دارد.' },
          { t: 'boxes', items: [
            { title: 'The crown', titleFa: 'تاج', x: 'A dynasty required a male heir to secure the succession.', fa: 'یک سلسله برای تضمین جانشینی به ولیعهد پسر نیاز داشت.' },
            { title: 'His heart', titleFa: 'دلش', x: 'By every account he was truly in love with Soraya.', fa: 'به گواه همه، واقعاً عاشق ثریا بود.' },
            { title: 'The clergy', titleFa: 'روحانیت', x: 'A second wife or a change of succession met resistance.', fa: 'گرفتن همسر دوم یا تغییر خط جانشینی با مقاومت روبه‌رو شد.' },
            { title: 'The choice', titleFa: 'انتخاب', x: 'In the end, duty was made to outweigh love.', fa: 'در پایان، کاری کردند که وظیفه بر عشق بچربد.' },
          ] },
          { t: 'p', x: "He is said to have offered to change the line of succession so that the throne might pass to a brother's son rather than lose her. It was not allowed.", fa: 'گفته‌اند پیشنهاد داد خط جانشینی را تغییر دهند تا تخت به پسر برادرش برسد و او مجبور به از دست دادن ثریا نشود. اجازه ندادند.' },
        ] },
        { blocks: [
          { t: 'pull', x: "The crown asked of him the one thing his heart refused to give easily.", fa: 'سلطنت از او همان یک چیزی را خواست که دلش به‌آسانی نمی‌داد.' },
          { t: 'p', x: "In 1958 they divorced. It was announced to the nation with genuine sorrow, and Soraya left Iran to live quietly abroad, remembered ever after in the press as the princess with the sad, beautiful eyes.", fa: 'در سال ۱۳۳۶ از هم جدا شدند. خبرش با اندوهی واقعی به مردم اعلام شد، و ثریا ایران را ترک کرد تا در خارج بی‌سروصدا زندگی کند؛ و از آن پس در مطبوعات همیشه شاهزاده‌ای با چشمان غمگین و زیبا خوانده شد.' },
          { t: 'p', x: "In his memoirs the Shah wrote of her with lasting tenderness, and never quite denied that a part of him remained bound to her. It is among the most human passages of his life, a reminder that beneath the uniform and the ceremony was a man asked to weigh love against duty, and made to choose duty.", fa: 'شاه در خاطراتش با مهری ماندگار از او نوشت، و هرگز به‌درستی انکار نکرد که بخشی از او همچنان به ثریا بسته مانده است. این از انسانی‌ترین فصل‌های زندگی اوست؛ یادآوری اینکه زیر آن یونیفرم و آن تشریفات، مردی بود که از او خواسته بودند عشق را در برابر وظیفه بسنجد، و وادارش کردند وظیفه را انتخاب کند.' },
        ] },
      ],
    },
    {
      key: 'ch7',
      title: 'Farah, and the White Revolution',
      subtitle: '1959 – 1963',
      pages: [
        { blocks: [
          { t: 'p', x: "In 1959 the Shah met Farah Diba, a young Iranian studying architecture in Paris. Warm, cultured, and devoted to art and to her country, she was unlike the sheltered princesses of the past. They married in December 1959 in a celebrated ceremony in Tehran.", fa: 'در سال ۱۳۳۸، شاه با فرح دیبا آشنا شد؛ دختری ایرانی که در پاریس معماری می‌خواند. گرم بود و فرهیخته و دلبستهٔ هنر و کشورش، و شبیه شاهزاده‌خانم‌های پرورده در حصار گذشته نبود. در آذر همان سال، در مراسمی پرآوازه در تهران ازدواج کردند.' },
          { t: 'video', key: 'mrp-wedding-farah', cap: 'The wedding of Mohammad Reza and Farah, 1959. Tap to watch.', capFa: 'مراسم ازدواج محمدرضا و فرح، ۱۳۳۸. برای تماشا بزن.' },
          { t: 'p', x: "Farah would become far more than a consort. She threw herself into the arts, education, and welfare, founded museums and cultural festivals, and in time was crowned Shahbanou, or empress, the first woman so honored in modern Iranian history.", fa: 'فرح بسی بیش از یک همسرِ شاه شد. خود را وقف هنر و آموزش و رفاه کرد، موزه‌ها و جشنواره‌های فرهنگی بنیان گذاشت، و به‌مرور تاج شهبانویی بر سرش گذاشته شد؛ نخستین زنی در تاریخ ایرانِ نو که چنین جایگاهی یافت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'An heir at last', fa: 'سرانجام یک ولیعهد' },
          { t: 'fact', label: 'The dynasty secured', labelFa: 'سلسله تضمین شد', value: 'Crown Prince Reza born, 31 Oct 1960', valueFa: 'تولد ولیعهد رضا، ۹ آبان ۱۳۳۹' },
          { t: 'imgsm', key: 'mrp-heir', cap: 'The Shah with his son, Crown Prince Reza Pahlavi.', capFa: 'شاه در کنار پسرش، ولیعهد رضا پهلوی.' },
          { t: 'p', x: "On the last day of October 1960, Farah gave birth to a son, Reza. Church bells and gun salutes rang across the country, and the Shah, after decades of waiting, at last had the male heir his throne demanded. More children followed, and the royal family became a symbol of the modern Iran he hoped to build.", fa: 'در آخرین روز آبان ۱۳۳۹، فرح پسری به دنیا آورد، رضا. صدای ناقوس و شلیک توپ در سراسر کشور پیچید، و شاه پس از دهه‌ها انتظار، سرانجام ولیعهدی داشت که تختش می‌طلبید. فرزندان دیگری هم آمدند، و خانوادهٔ سلطنتی به نمادی از همان ایران مدرنی بدل شد که او امید ساختنش را داشت.' },
          { t: 'p', x: "With his personal foundation finally settled, and his authority firm, the Shah turned to the great project of his reign, the remaking of Iran itself.", fa: 'حالا که زندگی شخصی‌اش سرانجام سر و سامان گرفته بود و اقتدارش تثبیت شده بود، شاه به پروژهٔ بزرگ دوران سلطنتش رو آورد: از نو ساختن خودِ ایران.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The White Revolution', fa: 'انقلاب سفید' },
          { t: 'p', x: "In January 1963 he launched what he called the White Revolution, a sweeping program of reform from above, meant, in his words, to carry out a revolution by the throne so that none need be made against it. He put it to a national vote, and it passed overwhelmingly.", fa: 'در بهمن ۱۳۴۱ برنامه‌ای را آغاز کرد که نامش را «انقلاب سفید» گذاشت؛ مجموعه‌ای گسترده از اصلاحات از بالا، که به گفتهٔ خودش قرار بود انقلابی به دست سلطنت باشد تا نیازی به انقلابی علیه آن نماند. آن را به همه‌پرسی گذاشت و با اکثریتی قاطع تصویب شد.' },
          { t: 'circles', items: [
            { value: 'Land', valueFa: 'زمین', label: 'Land reform for peasants', labelFa: 'اصلاحات ارضی برای روستاییان' },
            { value: 'Vote', valueFa: 'رأی', label: "Women's suffrage", labelFa: 'حق رأی زنان' },
            { value: 'Read', valueFa: 'سواد', label: 'Literacy Corps', labelFa: 'سپاه دانش' },
            { value: 'Share', valueFa: 'سهم', label: 'Profit sharing', labelFa: 'سهیم شدن در سود' },
          ] },
          { t: 'p', x: "Great estates were broken up and their land given to peasants who had never owned the soil they worked. Women won the right to vote and to stand for office. A Literacy Corps of young conscripts went out to teach reading in the villages, and health and development programs followed.", fa: 'با اصلاحات ارضی، املاک بزرگ تقسیم شد و زمینشان به روستاییانی رسید که هرگز مالک خاکی که رویش کار می‌کردند نبودند. زنان حق رأی و حق نامزد شدن گرفتند. سپاه دانش، متشکل از سربازان جوان، برای سوادآموزی به روستاها رفت، و برنامه‌های بهداشت و عمران هم پس از آن آمد.' },
        ] },
        { blocks: [
          { t: 'p', x: "In his books the Shah described these years as the very heart of his mission, to lift the peasantry, to modernize the nation, and to bind its people directly to the crown that had freed them. To millions it was real and visible progress, and his popularity soared.", fa: 'شاه در کتاب‌هایش این سال‌ها را قلب رسالتش توصیف کرد: بالا بردن روستاییان، مدرن کردن کشور، و پیوند دادن مستقیم مردم به سلطنتی که آزادشان کرده بود. برای میلیون‌ها نفر این پیشرفتی واقعی و دیدنی بود، و محبوبیتش بالا گرفت.' },
          { t: 'call', title: 'The seeds of opposition', titleFa: 'بذرهای مخالفت', x: "But the reforms made powerful enemies. Landowners lost their estates, and part of the clergy opposed the changes, above all the land reform and the new rights for women. Among the fiercest voices was a cleric named Ruhollah Khomeini.", fa: 'اما این اصلاحات دشمنان نیرومندی تراشید. زمین‌داران املاکشان را از دست دادند، و بخشی از روحانیت با این تغییرها مخالفت کرد؛ بیش از همه با اصلاحات ارضی و با حقوق تازهٔ زنان. یکی از تندترین صداها، روحانی‌ای بود به نام روح‌الله خمینی.' },
          { t: 'p', x: "In June 1963 Khomeini's denunciations sparked days of violent protest. They were suppressed by force, and in 1964 he was sent into exile, where he would wait, and watch, for fifteen years. A reform meant to unite the country had also drawn the battle lines of its future.", fa: 'در خرداد ۱۳۴۲، سخنان کوبندهٔ خمینی چند روز اعتراض خشونت‌بار به دنبال آورد. با زور سرکوب شد، و در سال ۱۳۴۳ او به تبعید فرستاده شد؛ جایی که پانزده سال منتظر ماند و تماشا کرد. اصلاحاتی که قرار بود کشور را یکپارچه کند، خط مقدم آیندهٔ آن را هم ترسیم کرد.' },
        ] },
      ],
    },
    {
      key: 'ch8',
      title: 'Toward the Great Civilization',
      subtitle: '1965 – 1971',
      pages: [
        { blocks: [
          { t: 'p', x: "These were the years of the throne at its height. Oil revenue climbed, factories rose, universities filled, and the Shah's confidence grew with his country's. In 1965, after his prime minister was assassinated by a young radical, Amir Abbas Hoveyda took office and would serve for nearly thirteen years, the steady hand of the boom.", fa: 'این‌ها سال‌های اوج سلطنت بود. درآمد نفت بالا رفت، کارخانه‌ها ساخته شد، دانشگاه‌ها پر شد، و اعتمادبه‌نفس شاه همراه با کشورش بالا رفت. در سال ۱۳۴۴، پس از ترور نخست‌وزیرش به دست جوانی تندرو، امیرعباس هویدا به این مقام رسید و نزدیک سیزده سال ماند؛ دست باثبات دوران رونق.' },
          { t: 'p', x: "The Shah now ruled with a firm grip. He guided the great decisions himself, from oil to industry to the army, and Iran began to carry real weight in the world, courted by East and West alike for its stability and its oil.", fa: 'شاه حالا با دستی محکم حکومت می‌کرد. تصمیم‌های بزرگ را خودش می‌گرفت، از نفت تا صنعت تا ارتش، و ایران در جهان وزنی واقعی پیدا کرد؛ شرق و غرب هر دو به خاطر ثبات و نفتش به سراغش می‌آمدند.' },
          { t: 'imgrow', keys: ['mrp-civ-1', 'mrp-civ-2'], cap: 'A thriving, modernizing Iran during the years of the Great Civilization.', capFa: 'ایرانی شکوفا و رو به مدرن شدن، در سال‌های «تمدن بزرگ».' },
        ] },
        { blocks: [
          { t: 'h', x: 'A crown earned and worn with pride', fa: 'تاجی که به دست آمد و با سربلندی بر سر ماند' },
          { t: 'p', x: "He had waited twenty six years to crown himself, refusing, he said, to be crowned king of a poor and backward nation. Only when he judged that Iran had risen did he consent. In October 1967 the ceremony was held in the Golestan Palace.", fa: 'بیست و شش سال صبر کرده بود تا تاج بر سر بگذارد؛ می‌گفت نمی‌خواهد شاهِ ملتی فقیر و عقب‌مانده تاج‌گذاری کند. تنها وقتی که به این نتیجه رسید ایران بالا آمده است، رضایت داد. در آبان ۱۳۴۶ مراسم در کاخ گلستان برگزار شد.' },
          { t: 'p', x: "In a gesture rich with meaning, he placed the crown upon his own head, as Napoleon once had, and then crowned Farah as Shahbanou, the first empress crowned in Iran in centuries. Their young son Reza was named heir before the assembled world.", fa: 'در حرکتی پرمعنا، تاج را خودش بر سر خود گذاشت، همان‌گونه که روزی ناپلئون کرده بود، و سپس تاج شهبانویی را بر سر فرح نهاد؛ نخستین ملکه‌ای که پس از قرن‌ها در ایران تاج‌گذاری می‌کرد. پسر خردسالشان رضا در برابر چشم جهانیان ولیعهد خوانده شد.' },
          { t: 'imgrow', keys: ['mrp-coronation-1', 'mrp-coronation-2', 'mrp-coronation-3'], cap: 'The coronation of 1967. The Shah crowned himself, then Farah as Shahbanou.', capFa: 'تاج‌گذاری سال ۱۳۴۶. شاه ابتدا تاج را بر سر خود گذاشت، سپس فرح را شهبانو کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Persepolis celebration', fa: 'جشن‌های تخت جمشید' },
          { t: 'p', x: "In 1971 he staged one of the most lavish events of the century, a grand celebration at the ruins of Persepolis marking two thousand five hundred years of Persian monarchy. Kings, queens, and presidents from around the world dined in silk tents amid the desert, served by the finest houses of Paris, in a display meant to place modern Iran within an unbroken line stretching back to antiquity.", fa: 'در سال ۱۳۵۰ یکی از پرخرج‌ترین مراسم آن قرن را برگزار کرد؛ جشنی بزرگ در ویرانه‌های تخت جمشید به مناسبت دو هزار و پانصد سال شاهنشاهی ایران. شاهان و ملکه‌ها و رؤسای جمهور از سراسر جهان در چادرهای ابریشمی میان دشت غذا خوردند، با پذیرایی بهترین خانه‌های پاریس؛ نمایشی که قرار بود ایرانِ نو را در زنجیره‌ای ناگسسته تا روزگار باستان بنشاند.' },
          { t: 'imgrow', keys: ['mrp-persepolis-1', 'mrp-persepolis-2'], cap: 'The 2,500 year celebration at Persepolis, 1971. Tents, banquets, and a parade of Iran through the ages.', capFa: 'جشن‌های دو هزار و پانصد ساله در تخت جمشید، ۱۳۵۰. چادرها، ضیافت‌ها، و رژهٔ ایران در گذر روزگاران.' },
          { t: 'p', x: "The heart of the ceremony was a tribute to Cyrus the Great, founder of the first Persian empire. Standing before the tomb of Cyrus at Pasargadae, the Shah addressed the ancient king directly, in words that became famous, promising that Iran kept watch over the legacy he had left.", fa: 'قلب این مراسم ادای احترام به کوروش بزرگ بود، بنیان‌گذار نخستین امپراتوری ایران. شاه در برابر آرامگاه کوروش در پاسارگاد ایستاد و مستقیم با آن شهریار باستانی سخن گفت، با کلماتی که نامدار شد، و وعده داد که ایران بر میراث او پاسبانی می‌کند.' },
          { t: 'q', x: "Cyrus, rest in peace, for we are awake.", fa: 'کوروش، آسوده بخواب، که ما بیداریم.', by: 'the Shah, at the tomb of Cyrus, 1971', byFa: 'شاه، بر آرامگاه کوروش، ۱۳۵۰' },
          { t: 'imgsm', key: 'mrp-cyrus', cap: 'The tomb of Cyrus the Great at Pasargadae, honored at the heart of the celebration.', capFa: 'آرامگاه کوروش بزرگ در پاسارگاد، که در قلب این جشن‌ها گرامی داشته شد.' },
          { t: 'p', x: "Abroad it was admired as spectacle. At home, many asked why such fortunes were spent on foreign guests while villages still went without. The celebration meant to display Iran's greatness became, for his critics, a symbol of a throne grown distant from its people.", fa: 'در بیرون از ایران آن را چون یک نمایش باشکوه ستودند. در داخل، بسیاری پرسیدند چرا چنین هزینه‌ای صرف مهمانان خارجی می‌شود در حالی که روستاها هنوز از ابتدایی‌ترین چیزها بی‌بهره‌اند. جشنی که قرار بود بزرگی ایران را نشان دهد، برای منتقدانش به نماد تختی بدل شد که از مردمش دور افتاده بود.' },
          { t: 'pull', x: "He dreamed of a Great Civilization, Iran restored to the front rank of nations.", fa: 'رؤیای «تمدن بزرگ» را در سر داشت؛ ایرانی که به صف نخست ملت‌ها بازگردد.' },
        ] },
        { blocks: [
          { t: 'p', x: "That dream had a name and a plan. In his writings the Shah set out his vision of a Great Civilization, a modern, industrial, self reliant Iran that would take its place among the leading powers of the world within a single generation. He believed he could see the destination clearly, and that history had chosen him to lead his people there.", fa: 'این رؤیا نام داشت و نقشه داشت. شاه در نوشته‌هایش چشم‌انداز «تمدن بزرگ» را شرح داد: ایرانی مدرن و صنعتی و متکی به خود، که ظرف یک نسل جایش را میان قدرت‌های پیشروی جهان بگیرد. باور داشت مقصد را به‌روشنی می‌بیند، و که تاریخ او را برگزیده تا مردمش را به آنجا برساند.' },
          { t: 'call', title: 'The other side', titleFa: 'روی دیگر', x: "But the same drive that built roads, dams, and universities also left little room for dissent. Organized opposition was not permitted, the press was closely controlled, and the intelligence service, SAVAK, watched critics with a heavy hand. The nation was being modernized swiftly, but from above, and the space for those who disagreed grew narrow. It was a tension that would matter greatly in the end.", fa: 'اما همان نیرویی که جاده و سد و دانشگاه ساخت، جای چندانی برای مخالفت باقی نگذاشت. مخالفت سازمان‌یافته اجازه نداشت، مطبوعات به‌دقت کنترل می‌شد، و ساواک، سازمان اطلاعات، منتقدان را با دستی سنگین زیر نظر داشت. کشور سریع مدرن می‌شد، اما از بالا، و فضا برای کسانی که موافق نبودند تنگ‌تر شد. این تنشی بود که در پایان بسیار مهم از آب درآمد.' },
        ] },
      ],
    },
    {
      key: 'ch9',
      title: 'The Boom and the Cracks',
      subtitle: '1973 – 1977',
      pages: [
        { blocks: [
          { t: 'h', x: 'A flood of oil wealth', fa: 'سیل ثروت نفتی' },
          { t: 'p', x: "In 1973 the price of oil roughly quadrupled almost overnight, and Iran was suddenly awash in wealth beyond imagining. The Shah, long an advocate of higher prices, saw his moment and seized it. He would reach his Great Civilization not in a generation, he declared, but in years.", fa: 'در سال ۱۳۵۲ قیمت نفت تقریباً یک‌شبه چهار برابر شد، و ایران ناگهان در ثروتی فراتر از تصور غرق شد. شاه که مدت‌ها طرفدار بالا بردن قیمت بود، لحظه‌اش را دید و از دستش نداد. اعلام کرد که به «تمدن بزرگ» نه در یک نسل، که در چند سال خواهد رسید.' },
          { t: 'circles', items: [
            { value: '×4', label: 'Oil price, 1973', labelFa: 'قیمت نفت، ۱۳۵۲' },
            { value: 'Arms', valueFa: 'سلاح', label: 'A vast new military', labelFa: 'ارتشی تازه و عظیم' },
            { value: 'Build', valueFa: 'ساخت', label: 'Industry and dams', labelFa: 'صنعت و سد' },
            { value: 'Fast', valueFa: 'شتاب', label: 'Change accelerated', labelFa: 'تغییر شتاب گرفت' },
          ] },
          { t: 'p', x: "He spent boldly, on heavy industry, a modern army, nuclear plants, and grand projects, determined to vault Iran into the front rank of nations in a single leap.", fa: 'جسورانه خرج کرد؛ صنایع سنگین، ارتشی مدرن، نیروگاه هسته‌ای، و پروژه‌های بزرگ، با این عزم که ایران را با یک جهش به صف نخست ملت‌ها برساند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'More money than the country could absorb', fa: 'پولی بیشتر از آنکه کشور جذبش کند' },
          { t: 'p', x: "But money moved faster than the nation could take it in. The ports choked with goods that rotted before they could be unloaded, inflation surged, and rents soared. The gap between rich and poor widened, and villagers pouring into the cities for work found crowding and disappointment instead.", fa: 'اما پول سریع‌تر از آن حرکت می‌کرد که کشور بتواند جذبش کند. بندرها از کالاهایی پر شد که پیش از تخلیه فاسد می‌شدند، تورم بالا گرفت، و اجاره‌بها سر به فلک کشید. فاصلهٔ فقیر و غنی بیشتر شد، و روستاییانی که برای کار به شهرها سرازیر می‌شدند، به جای کار با ازدحام و سرخوردگی روبه‌رو شدند.' },
          { t: 'p', x: "The rapid change unsettled traditional life, and a quiet resentment gathered beneath the glittering surface of progress. Many who had once felt loyalty to the crown began, without quite saying so, to feel left behind by it.", fa: 'این تغییر شتابان، زندگی سنتی را به هم ریخت، و کینه‌ای خاموش زیر سطح درخشان پیشرفت جمع شد. بسیاری که روزگاری به سلطنت وفادار بودند، بی‌آنکه صریح بگویندش، کم‌کم حس کردند از قافله جا مانده‌اند.' },
          { t: 'collage', keys: ['mrp-boom-1', 'mrp-boom-2'], cap: 'The boom years transformed Iran\'s cities at a breathless pace.', capFa: 'سال‌های رونق، شهرهای ایران را با شتابی نفس‌گیر دگرگون کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'One party, and a hidden illness', fa: 'یک حزب، و بیماری‌ای پنهان' },
          { t: 'p', x: "In 1975 the Shah made a fateful error of judgment. He abolished the existing parties and folded the nation's politics into a single party, the Rastakhiz, and declared that any Iranian who would not join it should take a passport and leave. Meant to unify, it instead alienated many who had felt, until then, a quiet loyalty to their king.", fa: 'در سال ۱۳۵۳ شاه اشتباه سرنوشت‌سازی در قضاوت کرد. احزاب موجود را منحل کرد و تمام سیاست کشور را در یک حزب واحد جمع کرد، حزب رستاخیز، و اعلام کرد هر ایرانی که نخواهد به آن بپیوندد، پاسپورتش را بگیرد و برود. قرار بود یکپارچگی بیاورد؛ به جایش بسیاری را از خود راند که تا آن روز وفاداری‌ای خاموش به شاهشان داشتند.' },
          { t: 'call', title: 'A secret carried alone', titleFa: 'رازی که تنها حملش می‌کرد', x: "Privately, the Shah was gravely ill. In 1974 French doctors had diagnosed a form of cancer, and he kept it secret for years, even from Farah. The illness, and the treatments that dulled and tired him, quietly drained the decisiveness that his hardest hour, now approaching, would demand of him.", fa: 'در خلوت، شاه به‌سختی بیمار بود. در سال ۱۳۵۳ پزشکان فرانسوی نوعی سرطان را در او تشخیص داده بودند، و او سال‌ها این را پنهان نگه داشت، حتی از فرح. این بیماری، و درمان‌هایی که کرختش می‌کرد و از پا می‌انداختش، بی‌سروصدا همان قاطعیتی را از او گرفت که سخت‌ترین ساعت زندگی‌اش، که داشت نزدیک می‌شد، از او می‌طلبید.' },
          { t: 'p', x: "To the world he still stood at the peak of his power. Beneath it, the ground was beginning to shift.", fa: 'در چشم جهان هنوز در اوج قدرتش ایستاده بود. زیر پایش اما، زمین داشت می‌لرزید.' },
        ] },
      ],
    },
    {
      key: 'ch10',
      title: 'The Storm and the Departure',
      subtitle: '1977 – 1979',
      pages: [
        { blocks: [
          { t: 'h', x: 'The gathering storm', fa: 'توفانی که جمع می‌شد' },
          { t: 'p', x: "By the late 1970s pressure was building on every side. Abroad, a new American president, Jimmy Carter, pressed him on human rights, and the Shah, hoping to please his ally and soften his image, loosened some of the controls that had held the country tight. Into that small opening rushed years of pent up grievance.", fa: 'تا اواخر دههٔ ۵۰، فشار از هر سو بالا می‌رفت. در بیرون، رئیس‌جمهور تازهٔ آمریکا، جیمی کارتر، در زمینهٔ حقوق بشر بر او فشار می‌آورد، و شاه به امید راضی کردن متحدش و نرم کردن چهره‌اش، بخشی از کنترل‌هایی را که کشور را سفت نگه داشته بود شل کرد. از همان روزنهٔ کوچک، سال‌ها نارضایتی انباشته بیرون زد.' },
          { t: 'p', x: "Through 1978 the discontent gathered into a vast movement that crossed every line. Religious and secular, left and right, bazaar merchant and university student, they agreed on little except that the throne must go. Protests grew, met by crackdowns, and each death fed the next in a rising cycle the government could not break.", fa: 'در طول سال ۱۳۵۷، این نارضایتی به جنبشی گسترده بدل شد که از هر مرزی گذشت. مذهبی و غیرمذهبی، چپ و راست، بازاری و دانشجو، بر سر چیزی توافق نداشتند جز اینکه این تخت باید برود. اعتراض‌ها بزرگ شد و با سرکوب پاسخ گرفت، و هر کشته، کشتهٔ بعدی را در چرخه‌ای فزاینده تغذیه کرد که دولت نتوانست بشکندش.' },
        ] },
        { blocks: [
          { t: 'h', x: "Khomeini's voice", fa: 'صدای خمینی' },
          { t: 'p', x: "From his exile, at last in a suburb of Paris, the Ayatollah Khomeini became the single voice around which the revolution turned. His sermons, recorded on cassette tapes, were smuggled into Iran and passed hand to hand, played in mosques and homes across the country, calling without compromise for the Shah to go.", fa: 'از تبعید، که سرانجام در حومهٔ پاریس بود، آیت‌الله خمینی به تنها صدایی بدل شد که انقلاب گرد آن می‌چرخید. سخنرانی‌هایش روی نوار کاست ضبط می‌شد، قاچاقی به ایران می‌رسید و دست به دست می‌گشت، در مسجدها و خانه‌های سراسر کشور پخش می‌شد، و بی‌هیچ مصالحه‌ای رفتن شاه را می‌خواست.' },
          { t: 'p', x: "Uncompromising where others wavered, he offered not reform but the end of the monarchy itself, and to a nation weary of one man's rule, that clarity proved magnetic. The more the Shah offered, the more the streets demanded, until nothing short of his departure would satisfy them.", fa: 'آنجا که دیگران تردید داشتند او کوتاه نمی‌آمد؛ نه اصلاحات، که پایان خودِ پادشاهی را پیشنهاد می‌کرد، و برای ملتی که از حکومت یک نفر خسته بود، این صراحت جذاب از آب درآمد. هرچه شاه بیشتر پیشنهاد می‌داد، خیابان بیشتر می‌خواست، تا جایی که چیزی جز رفتن او راضی‌شان نمی‌کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A wavering king', fa: 'شاهی که مردد بود' },
          { t: 'p', x: "Weakened by his hidden illness and torn between force and concession, the Shah wavered at the decisive hour. He installed a military government, then a reformist one; he freed prisoners, apologized to the nation, and went on television to say he had heard the voice of their revolution. The next day the streets filled again.", fa: 'شاه که بیماری پنهانش ناتوانش کرده بود و میان زور و امتیاز دادن دودل مانده بود، در ساعت سرنوشت‌ساز تردید کرد. دولتی نظامی سر کار آورد، بعد دولتی اصلاح‌طلب؛ زندانیان را آزاد کرد، از ملت عذرخواهی کرد، و از تلویزیون گفت که پیام انقلاب مردم را شنیده است. فردای آن روز، خیابان‌ها دوباره پر شد.' },
          { t: 'p', x: "In his memoirs he wrote that he could not bring himself to save his throne by drowning his own people in blood, that a king who rules by massacre is no longer worthy of the name. His critics called it fatal indecision; he called it a refusal to become a tyrant in his final hour. Both may be true.", fa: 'در خاطراتش نوشت که نتوانست تختش را با غرق کردن مردم خودش در خون نجات دهد، و شاهی که با کشتار حکومت کند دیگر لایق این نام نیست. منتقدانش نامش را تردیدی مرگبار گذاشتند؛ خودش آن را سر باز زدن از خودکامه شدن در واپسین ساعت خواند. شاید هر دو درست باشد.' },
          { t: 'call', title: 'The hands of others', titleFa: 'دست دیگران', x: "He came to believe, and wrote at length, that foreign powers had turned against him, that the same Western allies he had served now abandoned him or worked for his fall. Historians debate how far this is so. What is clear is that by early 1979 he stood almost alone, ill, exhausted, and out of choices.", fa: 'به این باور رسید، و مفصل هم نوشتش، که قدرت‌های خارجی علیه او برگشته‌اند؛ که همان متحدان غربی‌ای که به آنها خدمت کرده بود حالا یا رهایش کرده‌اند یا برای سقوطش کار می‌کنند. تاریخ‌نگاران بر سر اینکه این تا چه اندازه درست است اختلاف دارند. آنچه روشن است این است که تا اوایل سال ۱۳۵۷، او تقریباً تنها ایستاده بود؛ بیمار، فرسوده، و بی‌هیچ انتخابی.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The departure', fa: 'رفتن' },
          { t: 'p', x: "On 16 January 1979, the Shah left Iran. The trip was called a temporary rest abroad, but everyone understood. At Mehrabad Airport, an officer knelt to kiss his feet, and the Shah, visibly moved, raised the man up. He took a small box of Iranian soil with him.", fa: 'در ۲۶ دی ۱۳۵۷، شاه از ایران رفت. سفر را استراحتی موقت در خارج نامیدند، اما همه می‌فهمیدند. در فرودگاه مهرآباد، افسری زانو زد تا پایش را ببوسد، و شاه که آشکارا منقلب شده بود او را از زمین بلند کرد. جعبهٔ کوچکی از خاک ایران را با خود برد.' },
          { t: 'p', x: "He wept as the plane lifted off. In his own words, he left with an empty heart, carrying the weight of a thousand years of monarchy that ended with him, and a love for a country he knew, even then, he might never see again. Within weeks Khomeini returned to Tehran to enormous crowds, and the monarchy his father had founded came to an end.", fa: 'وقتی هواپیما از زمین بلند شد گریست. به گفتهٔ خودش، با دلی خالی رفت؛ با بار هزار سال پادشاهی که با او تمام می‌شد، و با عشق به کشوری که همان موقع هم می‌دانست شاید دیگر هرگز نبیندش. چند هفته بعد خمینی با استقبال جمعیتی عظیم به تهران بازگشت، و پادشاهی‌ای که پدرش بنیان گذاشته بود به پایان رسید.' },
          { t: 'video', key: 'mrp-exile-interview', cap: 'In exile, the Shah reflects on his reign and his departure. Tap to watch.', capFa: 'شاه در تبعید، دربارهٔ سلطنت و رفتنش سخن می‌گوید. برای تماشا بزن.' },
          { t: 'pull', x: "He left the country he had ruled for thirty seven years, and never returned.", fa: 'از کشوری رفت که سی و هفت سال بر آن حکومت کرده بود، و دیگر بازنگشت.' },
        ] },
      ],
    },
    {
      key: 'ch11',
      title: 'Answer to History',
      subtitle: '1979 – 1980',
      pages: [
        { blocks: [
          { t: 'h', x: 'A king without a country', fa: 'شاهی بی‌کشور' },
          { t: 'p', x: "His exile became a lonely odyssey across the world. Egypt received him first, then Morocco, the Bahamas, and Mexico, each stay shorter than the last as governments feared the anger of the new Iran. The man who had dined with the kings of the earth now struggled to find a country that would take him in.", fa: 'تبعیدش به سفری تنها در سراسر جهان بدل شد. اول مصر پذیرایش شد، بعد مراکش و باهاما و مکزیک، و هر اقامت کوتاه‌تر از قبلی، چون دولت‌ها از خشم ایرانِ تازه می‌ترسیدند. مردی که با شاهان روی زمین بر یک سفره نشسته بود، حالا به‌سختی کشوری پیدا می‌کرد که راهش دهد.' },
          { t: 'p', x: "Through these years he was quietly battling cancer, an illness he bore with private dignity. He needed proper medical care, yet as country after country turned him away, the treatment he deserved was too often delayed or denied him.", fa: 'در تمام این سال‌ها بی‌سروصدا با سرطان می‌جنگید؛ بیماری‌ای که با وقاری خصوصی تحملش کرد. به درمان درست نیاز داشت، اما همچنان که کشورها یکی پس از دیگری راهش نمی‌دادند، درمانی که حقش بود اغلب به تعویق افتاد یا از او دریغ شد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The hostage crisis', fa: 'بحران گروگان‌گیری' },
          { t: 'p', x: "In October 1979 the United States admitted him for medical treatment in New York. In Tehran the decision was taken as proof that America meant to restore him, as it had in 1953, and on 4 November students stormed the American embassy and seized its staff.", fa: 'در مهر ۱۳۵۸، آمریکا او را برای درمان در نیویورک پذیرفت. در تهران این تصمیم را دلیلی گرفتند بر اینکه آمریکا قصد دارد او را بازگرداند، همان‌طور که در سال ۱۳۳۲ کرده بود، و در ۱۳ آبان دانشجویان به سفارت آمریکا حمله کردند و کارکنانش را گروگان گرفتند.' },
          { t: 'imgsm', key: 'mrp-hostage', cap: 'The seizure of the American embassy in Tehran, November 1979.', capFa: 'تسخیر سفارت آمریکا در تهران، آبان ۱۳۵۸.' },
          { t: 'p', x: "Fifty two Americans were held for four hundred and forty four days, a crisis that gripped the world, sank a presidency, and poisoned relations between the two nations for decades to come. At its center, unwillingly, was the ailing Shah, whose presence on American soil had lit the fuse. Under the pressure he soon moved on again, to Panama, and at last back to Egypt.", fa: 'پنجاه و دو آمریکایی چهارصد و چهل و چهار روز در گروگان ماندند؛ بحرانی که جهان را در خود گرفت، یک ریاست‌جمهوری را به زیر کشید، و رابطهٔ دو کشور را برای دهه‌ها مسموم کرد. در مرکز آن، بی‌آنکه بخواهد، شاهِ بیمار بود که حضورش بر خاک آمریکا فتیله را روشن کرده بود. زیر همین فشار، به‌زودی دوباره جابه‌جا شد؛ به پاناما، و سرانجام دوباره به مصر.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The last book', fa: 'آخرین کتاب' },
          { t: 'p', x: "There in Cairo, President Anwar Sadat offered him refuge and dignity when almost no one else would. And there, in his final months, the Shah wrote his last book, Answer to History, part memoir and part defense, his own account of a life spent trying to modernize a nation that, in the end, turned from him.", fa: 'آنجا در قاهره، انور سادات به او پناه و حرمت داد، وقتی تقریباً هیچ‌کس دیگری نمی‌داد. و همان‌جا، در ماه‌های آخر عمرش، شاه آخرین کتابش را نوشت، «پاسخ به تاریخ»؛ نیمی خاطره و نیمی دفاعیه، روایت خودش از عمری که صرف مدرن کردن ملتی شد که سرانجام از او رو گرداند.' },
          { t: 'q', x: "I did not want my people to look back and say that their king had abandoned them, nor that he had stayed only by shedding their blood.", fa: 'نمی‌خواستم مردمم روزی به گذشته نگاه کنند و بگویند شاهشان رهایشان کرد، و نه اینکه بگویند تنها با ریختن خون آنها ماند.', by: 'attributed to the Shah, in exile', byFa: 'منسوب به شاه، در تبعید' },
          { t: 'p', x: "He wrote without bitterness toward his people, reserving his sorrow for what he saw as the betrayals of allies and the tragedy of a work left unfinished.", fa: 'بی‌هیچ تلخی نسبت به مردمش نوشت، و اندوهش را برای چیزی نگه داشت که خیانت متحدان می‌دانست، و برای مصیبت کاری که ناتمام ماند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The end', fa: 'پایان' },
          { t: 'fact', label: 'Died', labelFa: 'درگذشت', value: '27 July 1980, Cairo', valueFa: '۵ مرداد ۱۳۵۹، قاهره' },
          { t: 'p', x: "Mohammad Reza Shah Pahlavi died in Cairo on 27 July 1980, at the age of sixty. President Sadat gave him a state funeral, and he was laid to rest in the Al Rifa'i Mosque, where he remains to this day, far from the country he loved.", fa: 'محمدرضا شاه پهلوی در ۵ مرداد ۱۳۵۹، در شصت سالگی، در قاهره درگذشت. سادات برایش مراسم رسمی دولتی برگزار کرد، و در مسجد الرفاعی به خاک سپرده شد؛ همان‌جا که تا امروز آرمیده است، دور از کشوری که دوستش داشت.' },
          { t: 'collage', keys: ['mrp-grave-1', 'mrp-grave-2'], cap: "The Shah's tomb at the Al Rifa'i Mosque in Cairo, where he rests in exile.", capFa: 'آرامگاه شاه در مسجد الرفاعی قاهره، جایی که در تبعید آرمیده است.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: "This has been a glimpse of the life of the king who ruled Iran. A prince raised for a throne, who carried the weight of a nation from the age of twenty one, and who gave the whole of his life to the country he loved.", fa: 'این نگاهی بود کوتاه به زندگی شاهی که بر ایران حکومت کرد. شاهزاده‌ای که برای تخت بار آمد، از بیست و یک سالگی بار یک ملت را بر دوش کشید، و تمام عمرش را به کشوری داد که دوستش داشت.' },
          { t: 'p', x: "He dreamed of an Iran that was modern, proud, and strong, and he worked without rest to build it, roads and schools, universities and industry, land for the farmer and a voice for the woman, a nation lifted and set among the great powers of the world. Through triumph and hardship, and to his final breath in exile, his devotion to Iran never wavered.", fa: 'رؤیای ایرانی را در سر داشت که مدرن باشد و سربلند و نیرومند، و بی‌وقفه برای ساختنش کار کرد؛ جاده و مدرسه، دانشگاه و صنعت، زمین برای کشاورز و صدا برای زن، ملتی که بالا کشیده شود و میان قدرت‌های بزرگ جهان بنشیند. در پیروزی و در سختی، و تا واپسین نفسش در تبعید، دلبستگی‌اش به ایران هرگز نلرزید.' },
          { t: 'q', x: "All my life I have loved my country. Whatever I did, I did for Iran, and for its people.", fa: 'تمام عمرم کشورم را دوست داشته‌ام. هر چه کردم، برای ایران کردم و برای مردمش.', by: 'the spirit of his own words, Answer to History', byFa: 'برگرفته از سخنان خودش در «پاسخ به تاریخ»' },
          { t: 'pull', x: "He gave his life, and his heart, to Iran.", fa: 'جانش را، و دلش را، به ایران داد.' },
        ] },
      ],
    },
  ],
};

const rezaShah: Topic = {
  key: 'reza-shah',
  category: 'history',
  name: 'Reza Shah Pahlavi',
  persian: 'رضا شاه',
  years: '1878 – 1944',
  essence: 'The soldier from a mountain village who founded a dynasty and built the modern Iranian state, almost single handedly, in sixteen years.',
  essenceFa: 'سربازی از یک روستای کوهستانی که سلسله‌ای بنیان نهاد و دولت مدرن ایران را، تقریباً به تنهایی، در شانزده سال ساخت.',
  cover: 'reza-cover',
  closing: 'reza-cover',
  status: 'ready',
  sources: [
    'Mohammad Reza Pahlavi, Mission for My Country (1961)',
    'Gholamreza Pahlavi, Mon pere, mon frere, les Shahs d Iran',
    'Abbas Milani, The Shah (2011)',
    'The historical record of the Pahlavi era',
  ],
  chapters: [
    {
      key: 'rz1',
      title: 'From a Mountain Village',
      titleFa: 'از یک روستای کوهستانی',
      subtitle: '1878 – 1900',
      subtitleFa: '۱۸۷۸ تا ۱۹۰۰',
      pages: [
        { blocks: [
          { t: 'fact', label: 'Born', value: '15 March 1878, Alasht, Mazandaran' },
          { t: 'p', x: 'Reza Khan was born on 15 March 1878 in Alasht, a small village high in the mountains of Mazandaran, in the green north of Iran. His people were of modest means, and the world he entered was a hard one, far from the comforts of the capital.', fa: 'رضاخان در ۱۵ مارس ۱۸۷۸ در روستای الاشت به دنیا آمد، دهکده‌ای کوچک در بلندی‌های کوه‌های مازندران، در شمال سبز ایران. خانواده‌اش تنگدست بودند و جهانی که پا به آن گذاشت سخت بود، دور از آسایش پایتخت.' },
          { t: 'p', x: 'His father, an officer, died when Reza was only a few months old. His mother carried her infant son through winter snows toward Tehran to find family, a journey that nearly cost them both their lives. He grew up without wealth or connection, shaped early by hardship and by his own stubborn strength of will.', fa: 'پدرش که افسر بود، وقتی رضا تنها چند ماه داشت درگذشت. مادرش نوزادش را در برف‌های زمستان به سوی تهران برد تا خویشاوندی بیابد؛ سفری که نزدیک بود جان هر دو را بگیرد. بی‌ثروت و بی‌پشتوانه بزرگ شد، و از همان آغاز، سختی و ارادهٔ سرسخت خودش او را ساختند.' },
          { t: 'imgsm', key: 'reza-teen', cap: 'Reza Khan in his youth, before his rise through the ranks.', capFa: 'رضاخان در جوانی، پیش از بالا رفتنش در سلسله‌مراتب نظامی.' },
        ] },
        { blocks: [
          { t: 'p', x: 'As a young man he joined the Persian Cossack Brigade, the only modern, disciplined military unit in a Qajar Iran that was otherwise weak and disordered. There he found his calling. Tall, commanding, and fearless, he rose steadily through the ranks by sheer ability in an age when birth usually counted for more.', fa: 'در جوانی به بریگاد قزاق پیوست، تنها یگان نظامی مدرن و منضبط در ایرانِ قاجاری‌ای که در باقی امور ناتوان و پریشان بود. راه خودش را همان‌جا یافت. بلندقامت، فرمانده‌وار و بی‌باک، تنها با توانایی خودش پله‌پله بالا رفت، در روزگاری که معمولاً نسب بیشتر از لیاقت به کار می‌آمد.' },
          { t: 'p', x: 'The Iran around him was a nation in decline, its government bankrupt, its provinces ruled by tribes and foreign interests, its affairs decided in London and Saint Petersburg. For a proud soldier who loved his country, the humiliation was a fire that would drive him for the rest of his life.', fa: 'ایرانی که پیرامونش بود، کشوری رو به افول بود؛ خزانه‌اش تهی، ولایاتش در دست ایل‌ها و منافع بیگانه، و کارهایش در لندن و سن‌پترزبورگ تعیین می‌شد. برای سربازی سربلند که کشورش را دوست داشت، این خواری آتشی بود که تا پایان عمر او را پیش راند.' },
        ] },
      ],
    },
    {
      key: 'rz2',
      title: 'The March on Tehran',
      titleFa: 'راهپیمایی به سوی تهران',
      subtitle: 'February 1921',
      subtitleFa: 'اسفند ۱۲۹۹',
      pages: [
        { blocks: [
          { t: 'h', x: 'A nation adrift', fa: 'کشوری بی‌سکان' },
          { t: 'p', x: 'By 1921 Iran was close to collapse. The First World War had ravaged the country though it was never a combatant, famine had killed untold numbers, and the young Qajar king, Ahmad Shah, was powerless to hold the state together. Into that vacuum stepped a soldier who had decided that someone must act.', fa: 'تا ۱۹۲۱ ایران تا آستانهٔ فروپاشی رفته بود. جنگ جهانی اول کشور را ویران کرده بود، هرچند ایران هرگز در آن جنگ طرف نبود؛ قحطی شمار بی‌شماری را کشته بود، و احمدشاه جوان قاجار توان نگه داشتن دولت را نداشت. در این خلأ، سربازی پا پیش گذاشت که به این نتیجه رسیده بود کسی باید کاری کند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The coup', fa: 'کودتا' },
          { t: 'p', x: 'In February 1921, Reza Khan marched from Qazvin to Tehran at the head of only about two thousand five hundred to three thousand well disciplined troops. They entered the capital almost without resistance and took control of the city in a single, bloodless stroke.', fa: 'در اسفند ۱۲۹۹، رضاخان در رأس تنها حدود دو هزار و پانصد تا سه هزار سرباز منضبط از قزوین به سوی تهران راه افتاد. تقریباً بدون مقاومت وارد پایتخت شدند و شهر را در یک حرکت، بی‌آنکه خونی ریخته شود، در دست گرفتند.' },
          { t: 'stat', items: [
            { value: '~3,000', label: 'Troops in the march' },
            { value: '0', label: 'Lives lost in the coup' },
            { value: '1921', label: 'The capital taken' },
          ] },
          { t: 'p', x: 'He installed a new government with the journalist Seyyed Zia Tabatabaei as prime minister, and took for himself the command of the armed forces, with the title Sardar Sepah, commander of the army. The Qajar Shah remained on his throne in name, but real power in Iran had changed hands. This quiet, disciplined coup is the true beginning of Reza Shah\'s rise.', fa: 'دولتی تازه بر سر کار آورد با سید ضیاءالدین طباطبایی، روزنامه‌نگار، در مقام نخست‌وزیر، و فرماندهی نیروهای مسلح را خود بر عهده گرفت با لقب سردار سپه. شاه قاجار به نام بر تخت ماند، اما قدرت واقعی در ایران دست به دست شده بود. همین کودتای آرام و منضبط، آغاز راستین برآمدن رضاشاه است.' },
          { t: 'imgsm', key: 'reza-coup', cap: 'Reza Khan at the time of the march on Tehran, 1921.', capFa: 'رضاخان در روزهای حرکت به سوی تهران، ۱۲۹۹.' },
        ] },
        { blocks: [
          { t: 'p', x: 'Over the next four years he gathered the reins of the state into his own hands. He crushed the tribal rebellions and separatist revolts that had torn the provinces apart, and for the first time in living memory, a single authority reached from Tehran to the farthest corners of the country.', fa: 'در چهار سال بعد، افسار دولت را یکسره در دست خود گرفت. شورش‌های ایلی و جنبش‌های جدایی‌خواه را که ولایات را از هم دریده بودند فرو نشاند، و برای نخستین بار در حافظهٔ زندگان، یک قدرت واحد از تهران تا دورترین گوشه‌های کشور رسید.' },
          { t: 'p', x: 'In 1923 he became prime minister. The old dynasty was fading, and the nation was ready for a strong hand. In 1925, with the approval of a constituent assembly, the Qajar dynasty was set aside, and Reza Khan was proclaimed Reza Shah Pahlavi, founder of a new royal house.', fa: 'در ۱۹۲۳ نخست‌وزیر شد. سلسلهٔ کهنه رو به خاموشی می‌رفت و کشور آمادهٔ دستی نیرومند بود. در ۱۹۲۵، با رأی مجلس مؤسسان، سلسلهٔ قاجار کنار گذاشته شد و رضاخان با عنوان رضاشاه پهلوی، بنیان‌گذار خاندانی تازه، بر تخت نشست.' },
          { t: 'timeline', items: [
            { year: '1921', label: 'The coup' },
            { year: '1923', label: 'Prime minister' },
            { year: '1925', label: 'Crowned Reza Shah' },
            { year: '1926', label: 'Formal coronation' },
          ] },
        ] },
      ],
    },
    {
      key: 'rz3',
      title: 'Building a Nation',
      titleFa: 'ساختن یک ملت',
      subtitle: '1925 – 1941',
      subtitleFa: '۱۹۲۵ تا ۱۹۴۱',
      pages: [
        { blocks: [
          { t: 'p', x: 'What Reza Shah did in the next sixteen years was remarkable by any measure. He set out to drag Iran, almost by force of will, out of the past and into the modern world, and the scale of what he built in so short a time still shapes the nation today.', fa: 'آنچه رضاشاه در شانزده سال بعد انجام داد، با هر معیاری که سنجیده شود، چشمگیر و کم‌نظیر بود. او مصمم بود ایران را، گویی تنها با نیروی ارادهٔ خود، از گذشته جدا کند و به دنیای مدرن وارد سازد. گستردگی دستاوردهایی که در چنین مدت کوتاهی پدید آورد، هنوز هم در شکل‌گیری ایران امروز نقش تعیین‌کننده‌ای دارد.' },
          { t: 'steps', items: [
            { title: 'A national army', titleFa: 'ارتش ملی', x: 'A modern conscript army that ended the tribal revolts and unified the land under one authority.', fa: 'ارتشی مدرن بر پایهٔ خدمت وظیفه که به شورش‌های ایلی پایان داد و سرزمین را زیر یک قدرت یکپارچه کرد.' },
            { title: 'The Trans-Iranian Railway', titleFa: 'راه‌آهن سراسری', x: 'A railway binding the Persian Gulf to the Caspian, built with Iranian money alone.', fa: 'راه‌آهنی که خلیج فارس را به دریای خزر بست، و تنها با پول ایران ساخته شد.' },
            { title: 'Schools and a university', titleFa: 'مدرسه و دانشگاه', x: 'Compulsory primary education, the University of Tehran in 1934, and thousands of students sent to study in Europe.', fa: 'آموزش ابتدایی اجباری، دانشگاه تهران در ۱۳۱۳، و هزاران دانشجو که برای تحصیل به اروپا فرستاده شدند.' },
            { title: 'A modern state', titleFa: 'دولتی مدرن', x: 'Roads, factories, a civil code, land registered and forests nationalized, a government that finally reached the whole country.', fa: 'راه، کارخانه، قانون مدنی، ثبت زمین و ملی شدن جنگل‌ها؛ دولتی که سرانجام به همهٔ کشور رسید.' },
          ] },
          { t: 'p', x: 'He created a modern conscript army and ended the tribal revolts that had long divided the land. He founded the University of Tehran in 1934, made primary schooling compulsory, and sent thousands of young Iranians to study in Europe so they might return and build the nation.', fa: 'ارتشی مدرن بر پایهٔ خدمت وظیفه ساخت و به شورش‌های ایلی که مدت‌ها سرزمین را چندپاره کرده بودند پایان داد. در ۱۹۳۴ دانشگاه تهران را بنیان نهاد، آموزش ابتدایی را اجباری کرد، و هزاران جوان ایرانی را برای تحصیل به اروپا فرستاد تا بازگردند و کشور را بسازند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A new nation, remade', fa: 'ملتی که از نو ساخته شد' },
          { t: 'p', x: 'He built thousands of miles of modern roads and the first real factories, registered the land, and nationalized the forests. He replaced religious law with a European style civil code, brought in Western dress for men, and in 1936 ordered the removal of the veil, a reform welcomed by some and deeply resented by others.', fa: 'هزاران کیلومتر راه مدرن و نخستین کارخانه‌های واقعی را ساخت، زمین‌ها را به ثبت رساند و جنگل‌ها را ملی کرد. قانون مدنی به سبک اروپایی را جایگزین قوانین شرعی کرد، لباس غربی را برای مردان آورد، و در ۱۳۱۴ فرمان کشف حجاب داد؛ اصلاحی که گروهی از آن استقبال کردند و گروهی دیگر به‌سختی از آن رنجیدند.' },
          { t: 'p', x: 'In 1935 he asked the world to call the country by the name its own people used, Iran, the land of the Aryans, rather than the Greek name Persia. It was a small change of a word that carried a whole vision, a nation reclaiming itself and stepping forward under its own name.', fa: 'در سال ۱۹۳۵ از جهان خواست به‌جای نام یونانی «پرشیا»، کشور را با همان نامی بخوانند که مردمش به کار می‌بردند: «ایران»، سرزمین آریاییان. این تنها تغییر یک واژه بود، اما در دل خود چشم‌اندازی کامل را حمل می‌کرد؛ ملتی که هویت خود را بازپس می‌گیرد و با نام خود به پیش می‌رود.' },
          { t: 'imgsm', key: 'reza-serving', cap: 'Reza Shah, the builder of the modern Iranian state.', capFa: 'رضاشاه، سازندهٔ دولت مدرن ایران.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The railway across the roof of Iran', fa: 'راه‌آهنی از بام ایران' },
          { t: 'p', x: 'Of all he built, the Trans-Iranian Railway was his proudest achievement. Stretching one thousand three hundred and ninety four kilometres, it bound the Persian Gulf in the south to the Caspian Sea in the north, crossing the length of a rugged and mountainous land.', fa: 'از میان همهٔ آنچه ساخت، راه‌آهن سراسری، سربلندترین کارش بود. با هزار و سیصد و نود و چهار کیلومتر درازا، خلیج فارس در جنوب را به دریای خزر در شمال بست و سرتاسر سرزمینی ناهموار و کوهستانی را درنوردید.' },
          { t: 'stat', items: [
            { value: '1,394 km', label: 'Gulf to Caspian' },
            { value: '224', label: 'Tunnels' },
            { value: '4,000+', label: 'Bridges and viaducts' },
          ] },
          { t: 'p', x: 'What made it extraordinary was not only the engineering but the pride behind it. It was built entirely with Iranian money, without a single foreign loan or concession, paid for by taxes on tea and sugar, so that in a sense every Iranian helped to build it with every cup of tea they drank.', fa: 'آنچه آن را استثنایی می‌کرد تنها مهندسی‌اش نبود، غروری بود که پشتش ایستاده بود. تمامش با پول ایران ساخته شد، بی‌آنکه یک وام یا امتیاز خارجی در کار باشد؛ هزینه‌اش از مالیات چای و قند تأمین شد، و به یک معنا هر ایرانی با هر استکان چایی که نوشید در ساختنش سهم داشت.' },
        ] },
        { blocks: [
          { t: 'p', x: 'The route climbed over the Zagros and the Alborz, the two great mountain ranges, rising past two thousand two hundred metres at its highest point, near the very limit of what the steam engines of the day could manage. It required more than ninety kilometres of tunnels and over four thousand bridges.', fa: 'مسیر از زاگرس و البرز بالا می‌رفت، دو رشته‌کوه بزرگ، و در بلندترین نقطه‌اش از دو هزار و دویست متر می‌گذشت؛ نزدیک به مرزِ توانِ لکوموتیوهای بخار آن روزگار. بیش از نود کیلومتر تونل و بیش از چهار هزار پل لازم داشت.' },
          { t: 'p', x: 'Among its wonders were the Veresk Bridge in Mazandaran, one hundred and ten metres long and sixty six metres high, built without scaffolding and still standing as an engineering marvel, and the famous Three Golden Lines, a section of three switchback loops that climbed the steep Gaduk pass. Built between 1933 and 1938 across such terrain, it was a feat far ahead of its time.', fa: 'از شگفتی‌هایش پل ورسک در مازندران بود، صد و ده متر درازا و شصت و شش متر بلندی، که بدون داربست ساخته شد و هنوز چون شاهکاری مهندسی ایستاده است؛ و سه خط طلا، سه حلقهٔ مارپیچ نامدار که از گردنهٔ پرشیب گدوک بالا می‌رفتند. ساختنش میان ۱۹۳۳ تا ۱۹۳۸ و در چنین زمینی، کاری بود بسیار جلوتر از زمانهٔ خود.' },
          { t: 'q', x: 'Now I can die in peace. I have connected the Persian Gulf to the Caspian with Iranian hands and Iranian money.', fa: 'حالا می‌توانم آسوده بمیرم. خلیج فارس را با دست ایرانی و پول ایرانی به دریای خزر رساندم.', by: 'Reza Shah, at the railway\'s opening, 1938', byFa: 'رضاشاه، در افتتاح راه‌آهن، ۱۳۱۷' },
          { t: 'img', key: 'iran-railway', cap: 'The Trans-Iranian Railway, binding the Persian Gulf to the Caspian across 1,394 km.', capFa: 'راه‌آهن سراسری ایران، که در ۱۳۹۴ کیلومتر خلیج فارس را به دریای خزر بست.' },
          { t: 'p', x: 'The railway was inaugurated with great ceremony on 26 August 1938. Years later, during the Second World War, this same line became the vital Persian Corridor, carrying nearly five million tons of supplies to the Soviet Union. It remains in daily use to this day.', fa: 'راه‌آهن در ۲۶ اوت ۱۹۳۸ با تشریفاتی بزرگ افتتاح شد. سال‌ها بعد، در جنگ جهانی دوم، همین خط به کریدور ایران بدل شد و نزدیک پنج میلیون تن تدارکات را به اتحاد شوروی رساند. تا امروز هر روز در کار است.' },
        ] },
      ],
    },
    {
      key: 'rz4',
      title: 'The Father and the Man',
      titleFa: 'پدر، و آن مرد',
      subtitle: 'A private portrait',
      pages: [
        { blocks: [
          { t: 'p', x: 'Behind the towering public figure was a father whose children remembered him with deep love and no small awe. He was stern, demanding, and impatient with weakness, yet those closest to him spoke of a warmth and a tenderness that the public rarely saw.', fa: 'پشت آن چهرهٔ بلندبالای عمومی، پدری بود که فرزندانش با محبتی عمیق و هیبتی کم‌نظیر به یادش می‌آوردند. سختگیر بود، پرتوقع، و با سستی سر ناسازگاری داشت؛ اما نزدیک‌ترین کسانش از گرمی و مهری می‌گفتند که مردم کمتر می‌دیدند.' },
          { t: 'img', key: 'reza-children', cap: 'Reza Shah with his children, among them the future Shah, Mohammad Reza.', capFa: 'رضاشاه در کنار فرزندانش، و در میانشان محمدرضا، شاه آینده.' },
          { t: 'img', key: 'reza-command', cap: 'Reza Shah with his son and heir, the young Mohammad Reza.', capFa: 'رضاشاه با پسر و ولیعهدش، محمدرضای نوجوان.' },
          { t: 'p', x: 'He raised his sons and daughters to serve Iran, and he placed on his eldest son and heir, Mohammad Reza, the heaviest expectations of all. In the family memoirs his children describe a man of simple habits and iron discipline, who rose early, worked without rest, and expected the same of everyone around him.', fa: 'پسران و دخترانش را برای خدمت به ایران بار آورد، و سنگین‌ترین انتظارها را بر دوش پسر بزرگ و ولیعهدش، محمدرضا، گذاشت. فرزندانش در خاطراتشان از مردی می‌نویسند با عادت‌هایی ساده و انضباطی آهنین؛ سحرخیز، بی‌وقفه در کار، و با همین توقع از هر که پیرامونش بود.' },
        ] },
        { blocks: [
          { t: 'p', x: 'He had little patience for luxury or ceremony for its own sake. What moved him was the work of building, and he threw himself into it with a soldier\'s single mindedness. He would appear without warning at a worksite or a barracks or a school, inspecting, questioning, driving the work forward.', fa: 'حوصلهٔ تجمل و تشریفاتِ بی‌سبب را نداشت. آنچه او را به حرکت می‌آورد کارِ ساختن بود، و با یکدندگی یک سرباز خود را در آن انداخت. بی‌خبر سر کارگاه یا پادگان یا مدرسه‌ای پیدا می‌شد، بازرسی می‌کرد، می‌پرسید، و کار را جلو می‌راند.' },
          { t: 'img', key: 'reza-young-kids', cap: 'The young royal children, raised to serve the nation their father was building.', capFa: 'فرزندان خردسال خاندان سلطنتی، که برای خدمت به کشوری بار می‌آمدند که پدرشان می‌ساخت.' },
          { t: 'p', x: 'To his children he was the fixed point around which the whole household turned. They remembered his rare smiles as precious things, and carried his example, his devotion to Iran above all else, for the rest of their lives.', fa: 'برای فرزندانش نقطهٔ ثابتی بود که تمام خانه گرد آن می‌چرخید. لبخندهای کمیابش را چون چیزی گران‌بها به یاد داشتند، و سرمشق او را، آن دلبستگی به ایران که بر همه‌چیز مقدم بود، تا پایان عمر با خود بردند.' },
        ] },
      ],
    },
    {
      key: 'rz5',
      title: 'The Gathering War',
      titleFa: 'جنگی که نزدیک می‌شد',
      subtitle: '1939 – 1941',
      subtitleFa: '۱۹۳۹ تا ۱۹۴۱',
      pages: [
        { blocks: [
          { t: 'p', x: 'As the 1930s ended, the shadow of another world war fell across Europe, and Iran could not stay clear of it. Reza Shah had turned to Germany for the engineers and industry he needed, and German experts had helped build many of his factories and railways. When war came, those ties would prove dangerous.', fa: 'با پایان دههٔ ۱۹۳۰، سایهٔ جنگی جهانی دیگر بر اروپا افتاد و ایران نتوانست از آن کنار بماند. رضاشاه برای مهندس و صنعتی که لازم داشت رو به آلمان آورده بود، و کارشناسان آلمانی در ساختن بسیاری از کارخانه‌ها و راه‌آهن‌هایش دست داشتند. وقتی جنگ رسید، همین پیوندها خطرناک از آب درآمدند.' },
          { t: 'p', x: 'When the Second World War broke out, Iran declared itself neutral, as it had in the first. But its geography, and its railway, made neutrality almost impossible to defend.', fa: 'وقتی جنگ جهانی دوم درگرفت، ایران خود را بی‌طرف اعلام کرد، همان‌گونه که در جنگ نخست کرده بود. اما جغرافیایش، و راه‌آهنش، نگه داشتن آن بی‌طرفی را تقریباً ناممکن کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Persian Corridor', fa: 'کریدور ایران' },
          { t: 'p', x: 'In June 1941 Germany invaded the Soviet Union. Overnight, Britain and the Soviet Union became allies in desperate need of a secure land route to move supplies to the Soviet front. Iran, with its north to south railway, was the perfect corridor, and the Allies were determined to control it.', fa: 'در ژوئن ۱۹۴۱ آلمان به اتحاد شوروی حمله کرد. یک‌شبه، بریتانیا و شوروی متحد شدند و هر دو به‌شدت به راهی زمینی و امن نیاز داشتند تا تدارکات را به جبههٔ شوروی برسانند. ایران، با راه‌آهنی که از شمال تا جنوب کشیده شده بود، کریدوری بی‌نقص بود، و متفقین مصمم بودند آن را در دست بگیرند.' },
          { t: 'p', x: 'They demanded that Iran expel its German nationals and grant free passage for Allied supplies. Reza Shah, proud and unwilling to surrender his country\'s neutrality, sought to negotiate rather than simply submit.', fa: 'خواستند ایران اتباع آلمانی را اخراج کند و راه را برای تدارکات متفقین باز بگذارد. رضاشاه که سربلند بود و حاضر نبود بی‌طرفی کشورش را واگذار کند، کوشید گفت‌وگو کند، نه اینکه تنها تسلیم شود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The invasion', fa: 'حمله' },
          { t: 'p', x: 'On 25 August 1941, British forces invaded from the south and Soviet forces from the north. The army that Reza Shah had spent his reign building, the pride of his modern state, was overwhelmed within days by the two great powers striking together.', fa: 'در سوم شهریور ۱۳۲۰، نیروهای بریتانیا از جنوب و نیروهای شوروی از شمال وارد شدند. ارتشی که رضاشاه تمام دوران پادشاهی‌اش را صرف ساختنش کرده بود، مایهٔ فخر دولت مدرنش، در چند روز زیر ضربهٔ همزمان دو قدرت بزرگ از پا درآمد.' },
          { t: 'p', x: 'It was a bitter blow. The very foundation of his life\'s work, a strong and independent Iran, was overrun by the same foreign powers he had spent twenty years trying to keep at bay.', fa: 'ضربه‌ای تلخ بود. بنیاد کار تمام عمرش، ایرانی نیرومند و مستقل، زیر پای همان قدرت‌های بیگانه‌ای رفت که بیست سال کوشیده بود دورشان نگه دارد.' },
        ] },
      ],
    },
    {
      key: 'rz6',
      title: 'Abdication and Exile',
      titleFa: 'کناره‌گیری و تبعید',
      subtitle: '1941 – 1944',
      subtitleFa: '۱۹۴۱ تا ۱۹۴۴',
      pages: [
        { blocks: [
          { t: 'h', x: 'The hardest choice', fa: 'سخت‌ترین انتخاب' },
          { t: 'p', x: 'With foreign armies in his country and his own overwhelmed, Reza Shah faced an impossible position. Rather than see the dynasty destroyed and Iran left leaderless under occupation, he chose to step aside so that the crown might pass to his son.', fa: 'با ارتش بیگانه در کشورش و ارتش خودش از پا درآمده، رضاشاه در موقعیتی ناممکن گرفتار شد. به جای آنکه سلسله از میان برود و ایران زیر اشغال بی‌سرپرست بماند، کنار رفت تا تاج به پسرش برسد.' },
          { t: 'p', x: 'On 16 September 1941, under direct British pressure, Reza Shah abdicated in favor of his twenty one year old son, Mohammad Reza Pahlavi. He signed the document without hesitation, and in doing so handed his son both a throne and a nation under occupation.', fa: 'در ۲۵ شهریور ۱۳۲۰، زیر فشار مستقیم بریتانیا، رضاشاه به سود پسر بیست و یک ساله‌اش، محمدرضا پهلوی، از سلطنت کناره گرفت. سند را بی‌درنگ امضا کرد، و با همان امضا هم تختی به پسرش سپرد و هم کشوری در اشغال.' },
          { t: 'fact', label: 'Abdicated', value: '16 September 1941' },
        ] },
        { blocks: [
          { t: 'p', x: 'The British took the old king into exile, first to the island of Mauritius in the Indian Ocean, and then to Johannesburg, in South Africa. The man who had bound the Persian Gulf to the Caspian, who had built a state where there had been disorder, now lived out his days far from the country he had remade.', fa: 'بریتانیا شاه پیر را به تبعید برد، نخست به جزیرهٔ موریس در اقیانوس هند و سپس به ژوهانسبورگ در آفریقای جنوبی. مردی که خلیج فارس را به دریای خزر بسته بود، و آنجا که آشفتگی بود دولتی ساخته بود، اکنون روزهایش را دور از کشوری می‌گذراند که خودش از نو ساخته بودش.' },
          { t: 'p', x: 'He died in exile in Johannesburg on 26 July 1944, at the age of sixty six. He never saw Iran again. His body was first carried to Egypt and laid to rest there for a time. Years later, in 1950, his remains were brought home to Iran, received with the honor of a returning founder. A solemn ceremony and days of national mourning marked his homecoming, and he was laid to rest in a grand mausoleum near Tehran, in the soil of the country he had done so much to build.', fa: 'در ۲۶ ژوئیهٔ ۱۹۴۴، در شصت و شش سالگی، در تبعید در ژوهانسبورگ درگذشت. دیگر هرگز ایران را ندید. پیکرش را نخست به مصر بردند و مدتی آنجا به خاک سپردند. سال‌ها بعد، در ۱۳۲۹، بازمانده‌اش را به ایران آوردند و چون بنیان‌گذاری که بازمی‌گردد پذیرایش شدند. مراسمی باشکوه و روزها عزای عمومی بازگشتش را نشان کرد، و در آرامگاهی بزرگ نزدیک تهران به خاک سپرده شد، در خاک کشوری که این‌همه برای ساختنش کرده بود.' },
          { t: 'pull', x: 'He built modern Iran almost single handedly, in only sixteen years.', fa: 'ایران مدرن را تقریباً به تنهایی ساخت، آن هم تنها در شانزده سال.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the life of Reza Shah, the soldier from a mountain village who rose to found a dynasty and to build a nation. In only sixteen years he gave Iran a railway that crossed the country, a national army, universities and schools, roads and factories, a modern government, and its own name. He built a nation that has endured to this day, the modern foundation of the Iran we know now.', fa: 'این نگاهی بود کوتاه به زندگی رضاشاه؛ سربازی از یک روستای کوهستانی که برخاست تا سلسله‌ای بنیان بگذارد و ملتی بسازد. تنها در شانزده سال، به ایران راه‌آهنی داد که کشور را درنوردید، ارتشی ملی، دانشگاه و مدرسه، راه و کارخانه، دولتی مدرن، و نام خودش را. کشوری ساخت که تا امروز مانده است، همان بنیاد مدرنِ ایرانی که اکنون می‌شناسیم.' },
          { t: 'p', x: 'He was a hard man in a hard time, and he asked much of his country and his family. Yet his devotion to Iran never wavered, and the modern nation his son would inherit, and that Iranians would carry forward, was in great part his to build. He gave his life to the making of modern Iran.', fa: 'مردی سخت بود در روزگاری سخت، و از کشور و خانواده‌اش بسیار خواست. با این همه دلبستگی‌اش به ایران هرگز نلرزید، و کشور مدرنی که پسرش به ارث برد و ایرانیان پیش بردند، بخش بزرگی از آن کار او بود. عمرش را پای ساختن ایران مدرن گذاشت.' },
          { t: 'pull', x: 'From a mountain village, he built a nation.', fa: 'از یک روستای کوهستانی، ملتی ساخت.' },
        ] },
      ],
    },
  ],
};

const cyrus: Topic = {
  key: 'cyrus-the-great',
  category: 'history',
  name: 'Cyrus the Great',
  nameFa: 'کوروش بزرگ',
  persian: 'کوروش بزرگ',
  years: 'c. 600 – 530 BCE',
  essence: 'The founder of the first Persian Empire, and of an idea of just and tolerant rule that echoes to this day.',
  essenceFa: 'بنیان‌گذار نخستین امپراتوری ایران، و آغازگر اندیشه‌ای از فرمانروایی دادگر و بردبار که پژواکش تا امروز رسیده است.',
  cover: 'cyrus-cover',
  closing: 'cyrus-tomb',
  status: 'ready',
  sources: [
    'Herodotus, The Histories',
    'Xenophon, Cyropaedia',
    'The Cyrus Cylinder (British Museum)',
    'The Hebrew Bible, Books of Ezra and Isaiah',
    'Pierre Briant, From Cyrus to Alexander',
  ],
  chapters: [
    {
      key: 'cy1',
      title: 'A King Is Born',
      titleFa: 'شاهی زاده می‌شود',
      subtitle: 'c. 600 BCE',
      subtitleFa: 'حدود ۶۰۰ پیش از میلاد',
      pages: [
        { blocks: [
          { t: 'p', x: 'More than two and a half thousand years ago, in the highlands of what is now southern Iran, a child was born who would change the shape of the ancient world. His name was Kurush, whom history remembers as Cyrus, and the empire he built would be the largest the world had yet seen.', fa: 'بیش از دو هزار و پانصد سال پیش، در سرزمین‌های کوهستانیِ جایی که امروز جنوب ایران نام دارد، کودکی چشم به جهان گشود که بعدها چهرهٔ جهان باستان را دگرگون کرد. نام او کوروش بود؛ همان کسی که تاریخ او را با نام کوروش به یاد سپرده است. امپراتوری‌ای که او بنا کرد، بزرگ‌ترین امپراتوری بود که جهان تا آن روز به خود دیده بود.' },
          { t: 'p', x: 'The land of his birth, Persia, was then a small kingdom of herders and farmers, a subject people living in the shadow of the mighty Median Empire to their north. Few could have imagined that from this modest place would rise a ruler whose name would still be spoken with reverence across the world, so many centuries later.', fa: 'سرزمین زادگاه او، پارس، در آن روزگار پادشاهی کوچکی از چوپانان و کشاورزان بود؛ مردمانی که زیر فرمان و در سایهٔ امپراتوری نیرومند ماد، در شمال، زندگی می‌کردند. کمتر کسی می‌توانست تصور کند که از دل چنین سرزمین کوچکی فرمانروایی ظهور خواهد کرد که قرن‌ها بعد، نامش همچنان در سراسر جهان با احترام بر زبان‌ها جاری باشد.' },
          { t: 'imgsm', key: 'cyrus-face', cap: 'Cyrus the Great, founder of the Persian Empire, as imagined in later ages.', capFa: 'کوروش بزرگ، بنیان‌گذار شاهنشاهی ایران، آن‌گونه که در روزگاران بعد تصویرش کرده‌اند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The legend of the infant king', fa: 'افسانهٔ شاهِ نوزاد' },
          { t: 'p', x: 'The Greek historian Herodotus, writing a century after Cyrus, preserved a story that reads like myth. Astyages, king of the Medes and Cyrus\'s own grandfather, dreamed that his daughter\'s child would one day overthrow him. Fearing the omen, he ordered the newborn boy to be killed.', fa: 'هرودوت، تاریخ‌نگار یونانی که حدود یک قرن پس از کوروش می‌نوشت، داستانی را ثبت کرده است که بیشتر به افسانه‌ای اسطوره‌ای می‌ماند. آستیاگ، شاه ماد و پدربزرگ مادری کوروش، خواب دید که فرزند دخترش روزی او را از تخت پادشاهی سرنگون خواهد کرد. او که از این خواب بیمناک شده بود، فرمان داد نوزاد را به قتل برسانند.' },
          { t: 'p', x: 'But the servant charged with the deed could not do it. The infant was given instead to a herdsman in the mountains, who raised him as his own. The child grew strong and commanding, and even at play the other children chose him as their king, so plainly did he seem born to rule.', fa: 'اما خدمتکاری که مأمور اجرای این فرمان شده بود، نتوانست دست به چنین کاری بزند. در عوض، نوزاد را به چوپانی در کوهستان سپردند و او کودک را همچون فرزند خودش بزرگ کرد. کودک رشد کرد و به پسری نیرومند و باصلابت بدل شد. حتی هنگام بازی نیز دیگر کودکان او را به پادشاهی برمی‌گزیدند؛ چنان‌که گویی از همان ابتدا برای فرمانروایی زاده شده بود.' },
          { t: 'q', x: 'This boy, the son of a herdsman as we supposed, is in truth the grandson of the king.', fa: 'این پسر، که گمان می‌کردیم فرزند یک چوپان است، در حقیقت نوهٔ شاه است.', by: 'Herodotus, The Histories', byFa: 'هرودوت، تاریخ' },
        ] },
        { blocks: [
          { t: 'p', x: 'In time the truth was discovered, and the boy was restored to his royal family. Whether the tale is history or legend, it carried a deeper meaning for those who told it. Greatness, they believed, could not be hidden or destroyed. It would find its way into the world no matter what stood against it.', fa: 'سرانجام حقیقت آشکار شد و پسر به خاندان سلطنتی خود بازگردانده شد. این داستان تاریخی باشد یا افسانه، برای کسانی که آن را نسل‌به‌نسل روایت کردند، معنایی عمیق‌تر داشت. آنان باور داشتند که بزرگی را نه می‌توان پنهان کرد و نه از میان برد. بزرگی، هر مانعی هم که در برابرش قرار گیرد، سرانجام راه خود را به جهان خواهد گشود.' },
          { t: 'p', x: 'Behind the legend lies the record. Cyrus was born of the royal house of Persia, the Achaemenid line, son of Cambyses, king of Anshan, and, by his mother Mandane, grandson of the Median king himself. He was heir to a small throne, but through his veins ran the blood of kings.', fa: 'پشت این افسانه، روایت تاریخی نیز قرار دارد. کوروش از خاندان شاهی پارس و از دودمان هخامنشی بود؛ پسر کمبوجیه، شاه انشان، و از سوی مادرش ماندانا، نوهٔ آستیاگ، شاه ماد. او وارث تختی کوچک بود، اما خون شاهان در رگ‌هایش جاری بود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A world waiting to be remade', fa: 'جهانی در انتظار دگرگونی' },
          { t: 'p', x: 'The world into which Cyrus came was divided among four great powers. The Medes ruled the Iranian plateau, Babylon held the fertile heart of Mesopotamia, Lydia commanded the wealth of Asia Minor, and Egypt guarded the ancient valley of the Nile. Persia was a minor kingdom among giants.', fa: 'جهانی که کوروش در آن چشم به دنیا گشود، میان چهار قدرت بزرگ تقسیم شده بود. مادها بر فلات ایران فرمان می‌راندند، بابل بر قلب حاصلخیز میان‌رودان تسلط داشت، لیدیه ثروت آسیای صغیر را در اختیار گرفته بود و مصر از درهٔ کهن نیل پاسداری می‌کرد. در میان این غول‌ها، پارس تنها پادشاهی کوچکی بود.' },
          { t: 'p', x: 'Within a single generation, Cyrus would bring all but one of these under his rule, and bind them into a single empire stretching from the Aegean Sea to the edge of India. It would be the first empire in history to unite so many peoples, and the first to attempt to rule them with tolerance rather than terror.', fa: 'اما در طول یک نسل، کوروش همهٔ این قدرت‌ها جز یکی را زیر فرمان خود درمی‌آورد و آنها را در امپراتوری واحدی گرد می‌آورد؛ امپراتوری‌ای که از دریای اژه تا مرزهای هند امتداد داشت. این نخستین امپراتوری تاریخ بود که چنین شمار بزرگی از مردمان گوناگون را در قلمرو واحدی گرد آورد و کوشید به جای وحشت و خشونت، با مدارا بر آنان حکومت کند.' },
          { t: 'img', key: 'cyrus-empire', cap: 'The Achaemenid Empire at its height, from the Aegean and Egypt to the Indus. Its capital, Pasargadae, is marked in gold.', capFa: 'شاهنشاهی هخامنشی در اوج خود، از دریای اژه و مصر تا رود سند. پایتختش، پاسارگاد، با رنگ طلایی نشان داده شده.' },
          { t: 'keyvalue', items: [ { k: 'Founded', v: 'c. 550 BCE' }, { k: 'Capital', v: 'Pasargadae' }, { k: 'Extent', v: 'Aegean Sea to the Indus' }, { k: 'A first', v: 'Empire ruled by tolerance' } ] },
          { t: 'pull', x: 'From a small kingdom of herders, he would build the greatest empire the world had known.', fa: 'او از پادشاهی کوچکِ چوپانان، بزرگ‌ترین امپراتوری جهانِ آن روز را بنا کرد.' },
        ] },
      ],
    },
    {
      key: 'cy2',
      title: 'The Rise Against the Medes',
      titleFa: 'خیزش در برابر مادها',
      subtitle: 'c. 553 – 550 BCE',
      subtitleFa: 'حدود ۵۵۳ تا ۵۵۰ پیش از میلاد',
      pages: [
        { blocks: [
          { t: 'p', x: 'When Cyrus came to the throne of Persia around 559 BCE, his people were still vassals of the Median king Astyages, the very grandfather who, in legend, had once tried to kill him. For a time the young king bided his time, gathering the loyalty of the Persian tribes and waiting for his moment.', fa: 'هنگامی که کوروش حدود ۵۵۹ پیش از میلاد بر تخت پارس نشست، مردم او همچنان تابع آستیاگ، شاه ماد، بودند؛ همان پدربزرگی که بنا بر افسانه، روزی فرمان قتل او را صادر کرده بود. شاه جوان مدتی شکیبایی پیشه کرد، وفاداری قبایل پارسی را به دست آورد و در انتظار فرصت مناسب ماند.' },
          { t: 'p', x: 'That moment came around 553 BCE, when Cyrus raised the standard of revolt. The Persians were fewer and poorer than their Median overlords, but they were hardy mountain people, and they had a leader unlike any they had known.', fa: 'آن فرصت سرانجام حدود ۵۵۳ پیش از میلاد فرا رسید؛ زمانی که کوروش پرچم شورش را برافراشت. پارسیان از فرمانروایان مادی خود کم‌شمارتر و فقیرتر بودند، اما مردمانی سخت‌جان و پرتوان از سرزمین‌های کوهستانی بودند و رهبری داشتند که مانندش را پیش از آن ندیده بودند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The battle that changed everything', fa: 'نبردی که همه‌چیز را دگرگون کرد' },
          { t: 'p', x: 'Astyages marched against the rebels with a great army. But according to the ancient accounts, his own general, Harpagus, still nursed a bitter hatred of the king, and at the decisive moment much of the Median army went over to Cyrus rather than fight him. Astyages was captured, and the Median crown passed to the Persian.', fa: 'آستیاگ با سپاهی بزرگ به جنگ شورشیان رفت. اما بنا بر روایت‌های کهن، سردار خود او، هارپاگ، همچنان کینه‌ای عمیق از شاه در دل داشت. در لحظهٔ سرنوشت‌ساز، بخش بزرگی از سپاه ماد به جای جنگیدن با کوروش، به او پیوست. آستیاگ به اسارت درآمد و تاج‌وتخت ماد به دست پارسیان افتاد.' },
          { t: 'p', x: 'It was a turning of the world. The subject had become the master, and the small kingdom of Persia now ruled the vast lands of the Medes. Yet Cyrus did something remarkable, and characteristic. He did not execute or humiliate his defeated grandfather, but spared his life and, it is said, kept him at his court.', fa: 'گویی جهان یک‌باره زیرورو شده بود. آن‌که تا دیروز زیردست بود، اکنون سرور شده بود و پادشاهی کوچک پارس بر سرزمین‌های پهناور ماد فرمان می‌راند. با این همه، کوروش دست به کاری زد که هم شگفت‌انگیز بود و هم با منش او سازگار. او پدربزرگ شکست‌خورده‌اش را نه کشت و نه تحقیر کرد؛ جانش را بخشید و، بنا بر روایت‌ها، او را در دربار خود نگاه داشت.' },
          { t: 'call', title: 'A new kind of conqueror', titleFa: 'فاتحی از جنس دیگر', x: 'From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.', fa: 'کوروش از همان نخستین پیروزی، خصلتی را آشکار کرد که بعدها ویژگی برجستهٔ فرمانروایی او شد. در روزگاری که دیگر فاتحان با کشتار و وحشت حکومت می‌کردند، او با شکست‌خوردگان مدارا کرد و آنان را در نظم تازه‌ای که می‌ساخت جای داد. این تنها مهربانی نبود؛ شیوه‌ای خردمندانه‌تر و ماندگارتر برای فرمانروایی بود.' },
        ] },
        { blocks: [
          { t: 'p', x: 'With Media his, Cyrus inherited not only its lands but its network of tributaries and its place among the great powers. The kings of the age now took notice of the newcomer who had risen so suddenly in the east. Among them was Croesus of Lydia, the richest man in the known world, who watched the Persian\'s rise with growing alarm.', fa: 'با به دست آوردن ماد، کوروش نه‌تنها سرزمین‌های آن را تصاحب کرد، بلکه شبکهٔ حکومت‌های خراج‌گزار و جایگاه آن را در میان قدرت‌های بزرگ نیز به ارث برد. شاهان آن روزگار اکنون متوجه فرمانروای تازه‌ای شده بودند که ناگهان در شرق سر برآورده بود. یکی از آنان کرزوس، شاه لیدیه و ثروتمندترین مرد جهان شناخته‌شده، بود که با نگرانی روزافزون به قدرت گرفتن این پارسی می‌نگریست.' },
          { t: 'timeline', items: [
            { year: '559', label: 'Cyrus becomes king of Persia' },
            { year: '553', label: 'Revolt against the Medes' },
            { year: '550', label: 'Astyages falls; Media is won' },
          ] },
        ] },
      ],
    },
    {
      key: 'cy3',
      title: 'Croesus and the Fall of Lydia',
      titleFa: 'کرزوس و سقوط لیدیه',
      subtitle: 'c. 547 BCE',
      subtitleFa: 'حدود ۵۴۷ پیش از میلاد',
      pages: [
        { blocks: [
          { t: 'p', x: 'To the west lay Lydia, a kingdom of legendary wealth ruled by Croesus, whose very name became a byword for riches. Alarmed by the rise of Persia, Croesus resolved to strike first, and before he marched he sent to the famous oracle at Delphi to ask what would happen if he made war on Cyrus.', fa: 'در غرب، لیدیه قرار داشت؛ پادشاهی‌ای با ثروتی افسانه‌ای که کرزوس بر آن فرمان می‌راند و نامش خود به نمادی از ثروت و توانگری تبدیل شده بود. کرزوس که از قدرت گرفتن پارس بیمناک بود، تصمیم گرفت پیش‌دستی کند. پیش از لشکرکشی، نزد پیشگوی نامدار دلفی فرستاد تا بپرسد اگر با کوروش وارد جنگ شود، چه سرنوشتی در انتظارش خواهد بود.' },
          { t: 'p', x: 'The oracle gave its famous reply, that if Croesus went to war he would destroy a great empire. Delighted, he took it as a promise of victory. He did not consider that the great empire he would destroy might be his own.', fa: 'پیشگو پاسخ مشهور خود را داد: اگر کرزوس به جنگ برود، امپراتوری بزرگی را نابود خواهد کرد. کرزوس از شنیدن این پاسخ شادمان شد و آن را نوید پیروزی دانست. اما به این احتمال فکر نکرد که آن امپراتوری بزرگ شاید امپراتوری خودش باشد.' },
          { t: 'q', x: 'If Croesus makes war on the Persians, he will destroy a mighty empire.', fa: 'اگر کرزوس با پارسیان وارد جنگ شود، امپراتوری بزرگی را نابود خواهد کرد.', by: 'the Oracle of Delphi, in Herodotus', byFa: 'پیشگوی دلفی، به روایت هرودوت' },
        ] },
        { blocks: [
          { t: 'h', x: 'A trick of camels', fa: 'ترفند شترها' },
          { t: 'p', x: 'The armies met, and after an indecisive battle Croesus withdrew for the winter, expecting Cyrus to do the same. But Cyrus did not follow the old rules of war. He pursued at once, marching in the cold to strike while the Lydian army was dispersed, and appeared before the walls of Sardes when he was least expected.', fa: 'دو سپاه به هم رسیدند و پس از نبردی بی‌نتیجه، کرزوس برای زمستان عقب نشست؛ با این تصور که کوروش نیز همین کار را خواهد کرد. اما کوروش خود را پایبند قواعد دیرین جنگ نمی‌دانست. بی‌درنگ به تعقیب او پرداخت و در سرمای زمستان پیش رفت تا زمانی ضربه بزند که سپاه لیدیه پراکنده بود. سپس در زمانی که هیچ‌کس انتظارش را نداشت، در برابر دیوارهای سارد ظاهر شد.' },
          { t: 'p', x: 'In the battle before the city, the famed Lydian cavalry was the finest in the world. So Cyrus, by the counsel of Harpagus, placed his baggage camels at the front of his line. The horses of the Lydians, unused to the sight and smell of camels, panicked and refused to charge, and the battle was won.', fa: 'در نبردی که در برابر شهر درگرفت، سواره‌نظام نامدار لیدیه بهترینِ جهان به شمار می‌رفت. از این رو، کوروش به پیشنهاد هارپاگ، شترهای بارکش را در پیشاپیش صفوف سپاهش قرار داد. اسب‌های لیدیه که به دیدن و بوی شتر عادت نداشتند، رم کردند و از یورش سرباز زدند؛ و همین تدبیر سرنوشت نبرد را رقم زد.' },
          { t: 'img', key: 'cyrus-conquests', cap: 'The conquests of Cyrus, in sequence: Media, then Lydia, then Babylon.', capFa: 'فتوحات کوروش، به ترتیب: ماد، سپس لیدی، سپس بابل.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The mercy of the victor', fa: 'بخششِ فاتح' },
          { t: 'p', x: 'Sardes fell, and Croesus was taken. By some accounts Cyrus had built a great pyre to burn the captured king, as was the custom. But as the flames rose, Croesus called out the name of the Athenian sage Solon, who had once warned him that no man should be counted happy until his life had ended well.', fa: 'سارد سقوط کرد و کرزوس به اسارت درآمد. بنا بر برخی روایت‌ها، کوروش مطابق رسم آن روزگار هیزم و هیمهٔ بزرگی فراهم کرده بود تا شاه اسیر را در آتش بسوزاند. اما هنگامی که شعله‌ها زبانه کشیدند، کرزوس نام سولون، حکیم آتنی، را بر زبان آورد؛ همان کسی که روزی به او هشدار داده بود هیچ انسانی را نمی‌توان خوشبخت دانست، مگر آنکه زندگی‌اش به نیکی به پایان رسیده باشد.' },
          { t: 'p', x: 'Struck by the words, and by the turning of fortune that could bring the richest king on earth to a burning pyre, Cyrus ordered the fire quenched and spared him. Croesus, the stories say, became a trusted counsellor at the Persian court. Once again the defeated enemy was made a friend.', fa: 'کوروش تحت تأثیر این سخنان و نیز گردش شگفت‌انگیز بخت قرار گرفت؛ همان بختی که می‌توانست ثروتمندترین شاه روی زمین را بر هیزمی افروخته بنشاند. پس فرمان داد آتش را خاموش کنند و جان او را بخشید. بنا بر روایت‌ها، کرزوس بعدها به مشاوری مورد اعتماد در دربار پارس تبدیل شد. بار دیگر، دشمن شکست‌خورده به دوست بدل شد.' },
          { t: 'pull', x: 'No man should be counted happy until the end of his life is known.', fa: 'هیچ‌کس را خوشبخت مشمار، مگر آنکه پایان زندگی‌اش را دیده باشی.' },
        ] },
      ],
    },
    {
      key: 'cy4',
      title: 'Babylon and the Freeing of the Captives',
      titleFa: 'بابل و رهایی اسیران',
      subtitle: '539 BCE',
      subtitleFa: '۵۳۹ پیش از میلاد',
      pages: [
        { blocks: [
          { t: 'p', x: 'Now only one of the great powers stood between Cyrus and mastery of the known world: Babylon, the ancient and magnificent city on the Euphrates, its walls counted among the wonders of the earth. In 539 BCE, Cyrus turned toward it.', fa: 'اکنون تنها یکی از قدرت‌های بزرگ میان کوروش و فرمانروایی بر جهان شناخته‌شده قرار داشت: بابل، شهر باستانی و باشکوه بر کرانهٔ فرات، با دیوارهایی که از شگفتی‌های جهان به شمار می‌آمدند. در سال ۵۳۹ پیش از میلاد، کوروش روی به سوی آن نهاد.' },
          { t: 'p', x: 'Babylon was ruled by Nabonidus, a king who had estranged his own priests and people. When Cyrus came, the accounts tell that the city opened its gates to him almost without a fight, its people welcoming him less as a conqueror than as a deliverer.', fa: 'بابل زیر فرمان نبونید بود؛ شاهی که کاهنان و مردم خود را از خویش بیگانه کرده بود. روایت‌ها می‌گویند هنگامی که کوروش از راه رسید، شهر تقریباً بدون نبرد دروازه‌هایش را به روی او گشود و مردم، بیش از آنکه او را فاتحی بیگانه بدانند، همچون رهایی‌بخشی به استقبالش رفتند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Cyrus Cylinder', fa: 'استوانهٔ کوروش' },
          { t: 'p', x: 'What Cyrus did next echoed through history. Rather than sack the great city or drag its gods away in chains, as conquerors before him had done, he entered in peace, honored the Babylonian god Marduk, restored the temples, and let the life of the city go on undisturbed.', fa: 'آنچه کوروش پس از آن انجام داد، در تاریخ طنین‌انداز شد. برخلاف فاتحان پیش از خود که شهرهای بزرگ را غارت می‌کردند و خدایانشان را به زنجیر می‌کشیدند، کوروش در صلح وارد بابل شد، به مردوک، خدای بزرگ بابلیان، احترام گذاشت، نیایشگاه‌ها را بازسازی کرد و اجازه داد زندگی شهر بدون آشوب ادامه یابد.' },
          { t: 'p', x: 'He recorded his acts on a clay barrel now known as the Cyrus Cylinder, one of the most remarkable objects to survive from the ancient world. In it he tells how he freed the peoples held captive in Babylon and let them return to their homelands, and how he restored their temples and their gods.', fa: 'او اقدامات خود را بر استوانه‌ای گِلی ثبت کرد که امروز آن را «استوانهٔ کوروش» می‌نامیم؛ یکی از برجسته‌ترین آثار به‌جامانده از جهان باستان. در آن، از آزادی مردمانی سخن می‌گوید که در بابل به اسارت گرفته شده بودند و اجازه یافتند به سرزمین‌های خود بازگردند؛ همچنین از بازسازی نیایشگاه‌ها و بازگرداندن خدایان آنان به جایگاهشان سخن می‌گوید.' },
          { t: 'imgsm', key: 'cyrus-cylinder', cap: 'The Cyrus Cylinder, on which the king recorded his acts. It survives in the British Museum.', capFa: 'منشور کوروش، که شاه کارهایش را بر آن ثبت کرد. امروز در موزهٔ بریتانیا نگهداری می‌شود.' },
          { t: 'q', x: 'I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.', fa: 'خدایانی را که در آنجا می‌زیستند، به جایگاه‌هایشان بازگرداندم و گذاشتم در خانه‌های جاودان خویش سکونت کنند. مردمانشان را گرد آوردم و خانه‌هایشان را به آنان بازگرداندم.', by: 'the Cyrus Cylinder', byFa: 'استوانهٔ کوروش' },
        ] },
        { blocks: [
          { t: 'h', x: 'The return of the exiles', fa: 'بازگشت تبعیدیان' },
          { t: 'p', x: 'Among those he freed were the people of Judah, carried off to Babylon in captivity a generation before. Cyrus allowed them to return to Jerusalem and to rebuild their temple, an act remembered in the Hebrew Bible with extraordinary gratitude. In its pages he is called the anointed of God, the only foreign ruler ever given that title.', fa: 'در میان کسانی که کوروش آزاد کرد، مردم یهودا نیز بودند؛ مردمانی که یک نسل پیش‌تر به اسارت به بابل برده شده بودند. کوروش به آنان اجازه داد به اورشلیم بازگردند و معبد خود را از نو بنا کنند؛ اقدامی که در کتاب مقدس عبری با سپاسی کم‌نظیر از آن یاد شده است. در آن کتاب، کوروش «مسح‌شدهٔ خداوند» خوانده شده است؛ تنها فرمانروای بیگانه‌ای که چنین عنوانی به او داده شده است.' },
          { t: 'q', x: 'Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.', fa: 'کوروش، شاه پارس، چنین می‌گوید: خداوند مرا فرمان داده است تا برای او در اورشلیم خانه‌ای بنا کنم. هر کس از قوم او در میان شماست، برخیزد و به آنجا برود.', by: 'The Book of Ezra', byFa: 'کتاب عزرا' },
          { t: 'p', x: 'It is a rare thing in history for a conqueror to be remembered as a liberator by the people he ruled. Cyrus was remembered so by Babylonians, by Jews, and by Greeks alike, each in their own writings, each telling of a king who ruled with a restraint the ancient world had never seen.', fa: 'در تاریخ کمتر پیش می‌آید که مردمی، فاتحی را که بر آنان فرمان رانده است، به عنوان رهایی‌بخش به یاد آورند. اما بابلیان، یهودیان و یونانیان، هر یک در نوشته‌های خود، کوروش را چنین به یاد سپردند؛ هر یک از شاهی سخن گفتند که با خویشتن‌داری‌ای فرمان می‌راند که جهان باستان کمتر نظیر آن را دیده بود.' },
        ] },
      ],
    },
    {
      key: 'cy5',
      title: 'The Empire and Its Ideals',
      titleFa: 'امپراتوری و آرمان‌های آن',
      subtitle: 'The vision of Cyrus',
      pages: [
        { blocks: [
          { t: 'p', x: 'By now the empire of Cyrus stretched from the Aegean Sea in the west to the borders of India in the east, the largest the world had yet seen. But its true greatness lay not in its size. It lay in how he chose to rule it.', fa: 'اکنون امپراتوری کوروش از دریای اژه در غرب تا مرزهای هند در شرق گسترده شده بود؛ بزرگ‌ترین امپراتوری‌ای که جهان تا آن روز به خود دیده بود. اما عظمت واقعی آن در وسعتش نبود؛ در شیوه‌ای بود که کوروش برای فرمانروایی بر آن برگزیده بود.' },
          { t: 'img', key: 'cyrus-empire', cap: 'The empire of Cyrus at its height, from the Aegean and Egypt to the Indus.', capFa: 'شاهنشاهی کوروش در اوج خود، از دریای اژه و مصر تا رود سند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A new idea of empire', fa: 'نگاهی نو به مفهوم امپراتوری' },
          { t: 'p', x: 'The empires before him had ruled by fear. They deported whole peoples, burned rebellious cities, and demanded that the conquered abandon their gods and their ways. Cyrus built something different. He let the many peoples of his empire keep their own faiths, their own customs, and their own local rulers, so long as they kept the peace and paid their tribute.', fa: 'امپراتوری‌های پیش از او با ترس و وحشت حکومت می‌کردند. آنان مردمان را دسته‌جمعی از سرزمین‌هایشان کوچ می‌دادند، شهرهای سرکش را به آتش می‌کشیدند و از اقوام مغلوب می‌خواستند خدایان و آیین‌های خود را کنار بگذارند. اما کوروش راه دیگری در پیش گرفت. او به مردمان گوناگون امپراتوری‌اش اجازه داد دین و آیین، رسم‌ورسوم و حتی فرمانروایان محلی خود را حفظ کنند؛ به شرط آنکه صلح و نظم را برهم نزنند و خراج خود را بپردازند.' },
          { t: 'steps', items: [
            { title: 'Tolerance of faith', titleFa: 'بردباری دینی', x: 'Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.', fa: 'هر قوم آزاد بود خدایان خود را بپرستد. کوروش نیز به نیایشگاه‌های سرزمین‌هایی که بر آنها فرمان می‌راند، احترام می‌گذاشت.' },
            { title: 'Return of the exiled', x: 'He freed captive peoples and let them return to their homelands and rebuild.' },
            { title: 'Rule through respect', x: 'Local customs and leaders were preserved, not erased. The empire was a family of nations.' },
            { title: 'Justice over terror', x: 'Where others ruled by massacre, he sought the loyalty that comes from fair and merciful rule.' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'This was more than mercy. It was a philosophy of power, the understanding that an empire held together by respect would outlast one held together by fear. For his ideals of tolerance and human dignity, the Cyrus Cylinder is sometimes called the first charter of human rights, and a copy of it rests today at the United Nations.', fa: 'این چیزی فراتر از بخشش بود؛ نوعی فلسفهٔ قدرت بود: این درک که امپراتوری‌ای که با احترام در کنار هم نگه داشته شود، از امپراتوری‌ای که با ترس حفظ شود، پایدارتر خواهد بود. به سبب برداشت‌هایی که از آرمان‌های کوروش دربارهٔ بردباری و کرامت انسانی شده است، استوانهٔ کوروش گاه «نخستین منشور حقوق بشر» نامیده می‌شود و نسخه‌ای از آن امروزه در سازمان ملل متحد نگهداری می‌شود.' },
          { t: 'call', title: 'An idea that endures', titleFa: 'اندیشه‌ای ماندگار', x: 'The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.', fa: 'آرمان کوروش، اینکه مردمان گوناگون بتوانند زیر فرمانروایی دادگرانه در کنار یکدیگر زندگی کنند و هر یک هویت خود را حفظ کنند، یکی از کهن‌ترین و ماندگارترین آرمان‌های تاریخ بشر است. بیش از دو هزار و پانصد سال بعد، این اندیشه هنوز با ما سخن می‌گوید.' },
          { t: 'imgsm', key: 'cyrus-relief', cap: 'A relief from the age of the empire he founded.', capFa: 'نقش‌برجسته‌ای از روزگار شاهنشاهی‌ای که او بنیان گذاشت.' },
        ] },
      ],
    },
    {
      key: 'cy6',
      title: 'The Death of a King',
      titleFa: 'مرگ یک شاه',
      subtitle: 'c. 530 BCE',
      subtitleFa: 'حدود ۵۳۰ پیش از میلاد',
      pages: [
        { blocks: [
          { t: 'p', x: 'Even the greatest of kings must meet his end. In his final years Cyrus turned to secure the far northeastern frontier of his empire, where the fierce nomadic peoples of Central Asia raided the borders. It was there, around 530 BCE, that he met his death, campaigning against a people the Greeks called the Massagetae.', fa: 'حتی بزرگ‌ترین شاهان نیز سرانجام با مرگ روبه‌رو می‌شوند. کوروش در واپسین سال‌های زندگی‌اش برای استوار کردن مرزهای دوردست شمال‌شرقی امپراتوری خود به آن نواحی رفت؛ جایی که اقوام کوچ‌نشین و جنگاور آسیای میانه پیوسته به مرزها یورش می‌بردند. همان‌جا بود، حدود ۵۳۰ پیش از میلاد، که در جریان لشکرکشی علیه قومی که یونانیان «ماساگت‌ها» می‌نامیدند، جان باخت.' },
          { t: 'p', x: 'The accounts of his end differ, as befits a figure who had already passed into legend. Herodotus tells a dramatic tale of the warrior queen Tomyris, who ruled the Massagetae, and whose son fell into Cyrus\'s hands and died. In her grief and fury, she is said to have sworn vengeance.', fa: 'روایت‌ها دربارهٔ چگونگی مرگ او متفاوت‌اند؛ چنان‌که از شخصیتی که تا آن زمان به چهره‌ای افسانه‌ای بدل شده بود، انتظار می‌رود. هرودوت داستانی پرهیجان از تهم‌ریش، ملکهٔ جنگاور ماساگت‌ها، نقل می‌کند؛ زنی که پسرش به دست کوروش افتاد و جان باخت. گفته‌اند تهم‌ریش در سوگ و خشم، سوگند به انتقام خورد.' },
        ] },
        { blocks: [
          { t: 'p', x: 'In the great battle that followed, Herodotus writes, Cyrus was killed and his army defeated. It was, he says, the most violent battle fought among barbarian peoples in all his knowledge. Whether the tale is true in every detail, or grew in the telling, the core is remembered: the great king fell in the field, far from home, still leading his armies.', fa: 'هرودوت می‌نویسد که در نبرد بزرگی که پس از آن درگرفت، کوروش کشته شد و سپاهش شکست خورد. به گفتهٔ او، این خشن‌ترین نبردی بود که میان اقوامی که آنان را «بربر» می‌نامید، در سراسر زندگی‌اش دیده بود. اینکه داستان در تمام جزئیات درست باشد یا در گذر زمان رنگ افسانه به خود گرفته باشد، اصل ماجرا همچنان باقی است: شاه بزرگ در میدان نبرد، دور از زادگاهش و در حالی که هنوز سپاهش را رهبری می‌کرد، جان باخت.' },
          { t: 'p', x: 'His body was brought back across the length of the empire he had built, to rest in the land of his birth, at his capital of Pasargadae.', fa: 'پیکر او را از سراسر امپراتوری‌ای که خود بنا کرده بود بازگرداندند تا در سرزمین زادگاهش، در پایتخت او، پاسارگاد، آرام گیرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The tomb at Pasargadae', fa: 'آرامگاه پاسارگاد' },
          { t: 'p', x: 'There, upon the plain of Pasargadae, stands his tomb, a simple and noble structure of pale stone that has endured for two and a half thousand years. It survived even the coming of Alexander the Great, who, conquering Persia two centuries later, is said to have honored the tomb of Cyrus and ordered it protected.', fa: 'آنجا، در دشت پاسارگاد، آرامگاه او هنوز پابرجاست؛ بنایی ساده و باشکوه از سنگ‌های روشن که دو هزار و پانصد سال در برابر گذر زمان دوام آورده است. این آرامگاه حتی از روزگار اسکندر مقدونی نیز جان به در برد؛ اسکندری که دو قرن بعد پارس را فتح کرد و بنا بر روایت‌ها، به آرامگاه کوروش ادای احترام کرد و فرمان داد از آن محافظت شود.' },
          { t: 'img', key: 'cyrus-tomb', cap: 'The tomb of Cyrus the Great at Pasargadae, which has stood for over 2,500 years.', capFa: 'آرامگاه کوروش بزرگ در پاسارگاد، که بیش از دو هزار و پانصد سال سرِ پا مانده است.' },
          { t: 'p', x: 'An inscription said to have once stood there carried words of quiet dignity, a king asking not for glory but for peace, reminding the passer by that he too was mortal.', fa: 'گفته‌اند زمانی سنگ‌نوشته‌ای در آنجا قرار داشته که کلماتی ساده و باوقار بر آن نقش بسته بود؛ سخنان شاهی که نه شکوه، بلکه آرامش می‌خواست و به هر رهگذری یادآوری می‌کرد که او نیز فانی است.' },
          { t: 'quotebig', x: 'O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.', fa: 'ای انسان، هر که هستی، من کوروشم؛ آن‌که برای پارسیان امپراتوری‌ای به دست آورد. بر این اندک خاکی که پیکرم را پوشانده است، دریغ مدار.', by: 'ATTRIBUTED TO THE TOMB OF CYRUS', byFa: 'منسوب به آرامگاه کوروش' },
        ] },
      ],
    },
    {
      key: 'cy7',
      title: 'The Legacy That Endures',
      titleFa: 'میراثی که ماندگار است',
      subtitle: 'From his day to ours',
      pages: [
        { blocks: [
          { t: 'p', x: 'The empire Cyrus founded did not die with him. Under his son Cambyses and then Darius the Great it grew still larger, reaching into Egypt and to the plains of India and the edge of Europe, and it endured for two hundred years as the mightiest power on earth, until the coming of Alexander.', fa: 'امپراتوری‌ای که کوروش بنیان گذاشت، با مرگ او از میان نرفت. در دوران پسرش، کمبوجیه، و پس از او در زمان داریوش بزرگ، این امپراتوری باز هم گسترده‌تر شد؛ تا مصر، دشت‌های هند و مرزهای اروپا پیش رفت و نزدیک به دویست سال به عنوان نیرومندترین قدرت روی زمین پابرجا ماند، تا سرانجام اسکندر از راه رسید.' },
          { t: 'p', x: 'But the deeper legacy of Cyrus was not his empire. It was his example. He showed that a ruler could be strong and merciful at once, that a conqueror could also be a liberator, and that an empire of many peoples could be bound together by respect rather than fear.', fa: 'اما میراث ژرف‌تر کوروش، امپراتوری او نبود؛ سرمشقی بود که از خود به جا گذاشت. او نشان داد که یک فرمانروا می‌تواند در عین نیرومندی، بخشنده نیز باشد؛ اینکه یک فاتح می‌تواند رهایی‌بخش هم باشد؛ و اینکه امپراتوری‌ای متشکل از مردمان گوناگون را می‌توان با احترام به یکدیگر پیوند داد، نه با ترس.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The king the world remembered', fa: 'شاهی که جهان به یاد سپرد' },
          { t: 'p', x: 'The Greeks, who were his people\'s great rivals, could not help but admire him. Xenophon wrote a whole book, the Cyropaedia, holding Cyrus up as the model of the ideal ruler, a book later read by kings and thinkers for centuries. The founders of nations far in the future would look back to Cyrus as an example of just rule.', fa: 'یونانیان، که رقیبان بزرگ پارسیان بودند، نیز نتوانستند تحسین خود را از او پنهان کنند. گزنفون کتابی سراسر دربارهٔ او نوشت، «کوروش‌نامه»، و کوروش را نمونهٔ فرمانروای آرمانی معرفی کرد؛ کتابی که بعدها قرن‌ها مورد مطالعهٔ شاهان و اندیشمندان قرار گرفت. بنیان‌گذاران ملت‌هایی در قرن‌های بعد نیز به کوروش به عنوان الگویی از فرمانروایی دادگرانه نگاه کردند.' },
          { t: 'imgrow', keys: ['cyrus-building-1', 'cyrus-building-2'], cap: 'The remains of Pasargadae, the capital Cyrus built, still standing on the Iranian plain.', capFa: 'بازماندهٔ پاسارگاد، پایتختی که کوروش ساخت، هنوز بر دشت ایران ایستاده.' },
          { t: 'p', x: 'For Iranians above all, he remains the father of the nation, the founder of the first Persian Empire and of an idea of Iran that has lasted through every age since. His name is spoken with a pride that has not dimmed in two and a half thousand years.', fa: 'اما بیش از همه، برای ایرانیان، کوروش همچنان پدر ملت و بنیان‌گذار نخستین امپراتوری پارس و یکی از نخستین صورت‌بندی‌های اندیشهٔ ایران است؛ اندیشه‌ای که در گذر همهٔ این قرن‌ها پابرجا مانده است. نام او با غروری بر زبان آورده می‌شود که در طول دو هزار و پانصد سال کم‌رنگ نشده است.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the life of Cyrus the Great, the herdsman\'s foster son who became king of the world, the conqueror who ruled with mercy, the founder of an empire and of an ideal. From a small kingdom in the highlands of Persia, he built something that outlasted his empire and outlasts us still, the belief that power is noblest when it is just.', fa: 'این نگاهی کوتاه بود به زندگی کوروش بزرگ؛ پسرخواندهٔ چوپانی که به شاه جهان بدل شد، فاتحی که با بخشندگی فرمان راند، و بنیان‌گذار امپراتوری و آرمانی بزرگ. او از پادشاهی کوچکی در بلندی‌های پارس، چیزی بنا کرد که از امپراتوری خودش نیز بیشتر دوام آورد و هنوز از عمر ما نیز فراتر خواهد رفت: این باور که قدرت، زمانی به والاترین مرتبهٔ خود می‌رسد که با عدالت همراه باشد.' },
          { t: 'pull', x: 'He won an empire by the sword, and kept it by justice. The world has not forgotten him.', fa: 'او امپراتوری را با شمشیر به دست آورد، اما آن را با عدالت حفظ کرد. جهان هنوز او را از یاد نبرده است.' },
        ] },
      ],
    },
  ],
};

const zand: Topic = {
  key: 'zand-dynasty',
  category: 'history',
  name: 'The Zand Dynasty',
  nameFa: 'زندیان',
  persian: 'زندیان',
  years: '1751 – 1794',
  essence: "The dynasty of Karim Khan, the ruler who refused the title of king and chose instead to be the advocate of his people.",
  essenceFa: 'سلسلهٔ کریم‌خان؛ فرمانروایی که لقب شاه را نپذیرفت و به جای آن برگزید وکیل مردمش باشد.',
  cover: 'zand-cover',
  closing: 'zand-cover',
  status: 'ready',
  sources: [
    'The historical record of the Zand era',
    'Contemporary Persian chronicles',
    'John R. Perry, Karim Khan Zand',
  ],
  chapters: [
    {
      key: 'zd1',
      title: 'After the Storm', titleFa: 'پس از توفان',
      subtitle: '1747 - 1751', titleFa: '۱۷۴۷ تا ۱۷۵۱',
      pages: [
        { blocks: [
          { t: 'fact', label: 'The dynasty begins', labelFa: 'آغاز سلسله', value: 'Karim Khan Zand, c. 1751', valueFa: 'کریم‌خان زند، حدود ۱۷۵۱' },
          { t: 'p', x: "In 1747 the great conqueror Nader Shah, the last of Iran\'s warrior kings, was assassinated by his own officers. With his death the country he had ruled by fear fell into chaos, and for years the land was torn apart by warlords and generals fighting over the ruins of his empire.", fa: 'در سال ۱۷۴۷ نادرشاه، آن فاتح بزرگ و واپسین شاهِ جنگاور ایران، به دست افسران خودش ترور شد. با مرگ او، کشوری که با ترس اداره‌اش کرده بود به هرج‌ومرج افتاد، و سال‌ها این سرزمین را سرداران و خان‌هایی که بر سر ویرانه‌های امپراتوری او می‌جنگیدند از هم دریدند.' },
          { t: 'p', x: "It was one of the darkest and most violent periods in Iran\'s long history. Out of that darkness, and out of the mountains of the west, rose a man who would offer his exhausted country something it had almost forgotten: peace, and a ruler who cared for it.", fa: 'یکی از تاریک‌ترین و خشونت‌بارترین دوره‌های تاریخ بلند ایران بود. از دل همان تاریکی، و از کوه‌های غرب، مردی برخاست که به کشور خستهٔ خود چیزی را پیشنهاد کرد که تقریباً از یاد برده بود: آرامش، و فرمانروایی که به فکرش باشد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A soldier of the Zagros', fa: 'سربازی از زاگرس' },
          { t: 'p', x: "His name was Karim Khan, of the Zand, a tribe of the Zagros mountains in western Iran. He was not born to greatness or to noble blood. He was a soldier, plainspoken and shrewd, who rose by his ability, his fairness, and the loyalty he inspired in the men around him.", fa: 'نامش کریم‌خان بود، از ایل زند، تیره‌ای از کوه‌های زاگرس در غرب ایران. نه در بزرگی زاده شده بود و نه از تبار اشراف. سربازی بود ساده‌گو و زیرک که با توانایی خود، با انصافش، و با وفاداری‌ای که در مردان پیرامونش برمی‌انگیخت بالا آمد.' },
          { t: 'p', x: "Through years of civil war he outlasted and outgoverned his rivals. Where others ruled the lands they took by terror, Karim Khan won people to his side by justice and mercy, and by the simple fact that life was better and safer under his hand. By around 1751 he had become the dominant power over most of Iran.", fa: 'در سال‌های جنگ داخلی، هم بیش از رقیبانش دوام آورد و هم بهتر از آنان حکومت کرد. دیگران بر سرزمین‌هایی که می‌گرفتند با وحشت فرمان می‌راندند؛ کریم‌خان اما مردم را با عدالت و بخشش به سوی خود کشید، و با این واقعیت ساده که زندگی زیر دست او بهتر و امن‌تر بود. تا حدود سال ۱۷۵۱ به قدرت مسلط بر بیشتر ایران بدل شده بود.' },
          { t: 'timeline', items: [
            { year: '1747', label: 'Nader Shah assassinated', labelFa: 'ترور نادرشاه' },
            { year: '1751', label: 'Karim Khan rises to power', labelFa: 'کریم‌خان به قدرت می‌رسد' },
            { year: '1765', label: 'Shiraz made the capital', labelFa: 'شیراز پایتخت می‌شود' },
            { year: '1779', label: 'Death of Karim Khan', labelFa: 'درگذشت کریم‌خان' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The crown he refused', fa: 'تاجی که نپذیرفت' },
          { t: 'p', x: "Here Karim Khan did something almost unheard of in the history of kings. With Iran his to command, and the throne there for the taking, he refused the title of Shah, the king of kings. Instead he kept a young prince of the old Safavid line as nominal monarch, and styled himself Vakil e-Ra\'aya, the Advocate, or Deputy, of the People.", fa: 'اینجا کریم‌خان کاری کرد که در تاریخ شاهان تقریباً بی‌سابقه است. ایران در فرمانش بود و تخت هم آمادهٔ نشستن، اما لقب شاه، شاهنشاه، را نپذیرفت. به جای آن شاهزاده‌ای جوان از تبار صفوی را به نامِ پادشاه نگاه داشت و خود را وکیل‌الرعایا خواند؛ یعنی وکیل مردم.' },
          { t: 'pull', x: "He would not be called king. He chose instead to be the servant of his people.", fa: 'نپذیرفت که او را شاه بخوانند. به جای آن برگزید که خدمتگزار مردمش باشد.' },
          { t: 'p', x: "It was far more than a matter of a title. It expressed how he understood his own power, not as a possession to be flaunted, but as a trust held on behalf of the ordinary people of Iran, the farmers and merchants and families who had suffered so much. In a cruel age, it was a rare and beautiful idea, and it made him beloved.", fa: 'این بسی فراتر از یک لقب بود. نشان می‌داد که او قدرت خویش را چگونه می‌فهمد: نه مِلکی برای به رخ کشیدن، بلکه امانتی که از سوی مردم عادی ایران در دست دارد؛ همان کشاورزان و بازرگانان و خانواده‌هایی که این‌همه رنج کشیده بودند. در روزگاری بی‌رحم، این اندیشه‌ای نادر و زیبا بود، و او را محبوب کرد.' },
          { t: 'call', title: 'The meaning of a name', titleFa: 'معنای یک نام', x: "This gentle dynasty gave Iran a rare season of peace and plenty. Its name, Zand, still carries the memory of a ruler who placed his people above his own glory.", fa: 'این سلسلهٔ مهربان به ایران فصلی نادر از آرامش و فراوانی بخشید. نامش، زند، هنوز یاد فرمانروایی را با خود دارد که مردمش را بر شکوه خویش مقدم داشت.' },
        ] },
      ],
    },
    {
      key: 'zd2',
      title: 'The Advocate of the People', titleFa: 'وکیل‌الرعایا',
      subtitle: 'The character of Karim Khan', titleFa: 'خوی و منش کریم‌خان',
      pages: [
        { blocks: [
          { t: 'p', x: "What set Karim Khan apart was not conquest but character. In an age of tyrants, he was known for his plainness, his humor, and his genuine care for ordinary people. He never forgot that he had risen from among them, and he never pretended to be more than he was.", fa: 'آنچه کریم‌خان را متمایز می‌کرد فتح نبود، بلکه شخصیت بود. در روزگار خودکامگان، او را به سادگی، به شوخ‌طبعی، و به دلسوزی راستینش برای مردم عادی می‌شناختند. هرگز از یاد نبرد که خود از میان همان مردم برخاسته است، و هرگز وانمود نکرد بیش از آنچه هست.' },
          { t: 'imgsm', key: 'zand-portrait', cap: 'Karim Khan Zand, the Advocate of the People.', capFa: 'کریم‌خان زند، وکیل‌الرعایا.' },
          { t: 'imgsm', key: 'zand-rulers', cap: 'The Zand court, a rare season of gentle rule in a violent age.', capFa: 'دربار زند؛ فصلی کمیاب از فرمانروایی مهربان در روزگاری خشونت‌بار.' },
          { t: 'p', x: "He lived simply for a ruler of his power, dressed without extravagance, and kept an open and approachable court. The stories told of him, many still remembered in Iran, paint a picture of a warm, shrewd, and deeply humane man.", fa: 'برای فرمانروایی با آن اندازه قدرت، ساده زندگی می‌کرد؛ بی‌تجمل می‌پوشید و درباری باز و دردسترس داشت. حکایت‌هایی که از او نقل کرده‌اند، و بسیاری‌شان هنوز در ایران بر سر زبان‌هاست، تصویر مردی را می‌سازند گرم، زیرک و عمیقاً انسان.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The ruler who listened', fa: 'فرمانروایی که گوش می‌داد' },
          { t: 'p', x: "It was said that any subject with a grievance could bring it before him, and that he would hear the poor as readily as the powerful. He kept his own conduct plain and his taxes light, and he was known to sit among ordinary people, smoking his water pipe and talking freely, more like a village elder than a king.", fa: 'می‌گفتند هر کس شکایتی داشت می‌توانست آن را نزد او ببرد، و او سخن فقیر را به همان آسانی می‌شنید که سخن توانگر را. رفتار خود را ساده و مالیات‌ها را سبک نگاه داشت، و معروف بود که میان مردم عادی می‌نشیند، قلیان می‌کشد و آزادانه گفت‌وگو می‌کند؛ بیشتر شبیه ریش‌سفید یک ده تا یک پادشاه.' },
          { t: 'p', x: "Countless folk tales grew up around his fairness and his wit. In them he tests the honesty of officials, rewards the humble, and gently humbles the proud, always with a light touch and a sense of humor. Whether every tale is true matters less than what they reveal: this was how his people wished to remember him, and how they loved him.", fa: 'حکایت‌های مردمی بی‌شماری دربارهٔ انصاف و ذکاوتش پدید آمد. در این حکایت‌ها راستی کارگزاران را می‌آزماید، فروتنان را پاداش می‌دهد و متکبران را به نرمی سر جای خود می‌نشاند؛ همیشه با دستی سبک و طنزی ملایم. اینکه هر روایت راست باشد یا نه، کمتر از آن چیزی اهمیت دارد که این روایت‌ها آشکار می‌کنند: مردم می‌خواستند او را این‌گونه به یاد بیاورند، و این‌گونه دوستش داشتند.' },
          { t: 'q', x: "I am not the king. I am only the deputy of the people, and I hold this power in trust for them.", fa: 'من شاه نیستم. من تنها وکیل مردمم، و این قدرت را چون امانتی از سوی آنان در دست دارم.', by: 'the spirit of Karim Khan\'s rule', byFa: 'روح حکومت کریم‌خان' },
        ] },
        { blocks: [
          { t: 'p', x: "He could be firm when he had to be, and he was a capable soldier and shrewd statesman who held a fractured country together. But he ruled with a restraint and a decency almost unknown in his violent age, and Iran, worn down by decades of war, breathed again under his hand.", fa: 'آنجا که لازم بود می‌توانست سختگیر باشد؛ سربازی کاردان و سیاستمداری زیرک بود که کشوری چندپاره را کنار هم نگاه داشت. اما با خویشتن‌داری و شرافتی حکومت کرد که در روزگار خشونت‌بار او تقریباً ناشناخته بود، و ایران، فرسوده از دهه‌ها جنگ، زیر دست او دوباره نفس کشید.' },
          { t: 'call', title: 'A rare kind of power', titleFa: 'گونه‌ای کمیاب از قدرت', x: "Power rarely makes men gentler. In Karim Khan it did. He understood his authority as a duty owed to his people, and that understanding is the quiet heart of the whole Zand story.", fa: 'قدرت به‌ندرت آدمیان را مهربان‌تر می‌کند. در کریم‌خان چنین کرد. او اقتدار خود را وظیفه‌ای می‌دانست که به مردمش بدهکار است، و همین درک، قلب آرام تمام داستان زند است.' },
        ] },
      ],
    },
    {
      key: 'zd3',
      title: 'Shiraz, the Beloved City', titleFa: 'شیراز، شهر محبوب',
      subtitle: 'The Zand capital', titleFa: 'پایتخت زند',
      pages: [
        { blocks: [
          { t: 'p', x: "Karim Khan made his capital not at Tehran or Isfahan, but at Shiraz, the fabled city of roses, wine, nightingales, and poetry in the south of Iran. It was the city of the great poets Hafez and Saadi, and under Karim Khan it entered a golden age.", fa: 'کریم‌خان پایتختش را نه در تهران گذاشت و نه در اصفهان، بلکه در شیراز؛ شهر افسانه‌ای گل و می و بلبل و شعر، در جنوب ایران. شهر حافظ و سعدی بود، و زیر دست کریم‌خان به عصر طلایی خود رسید.' },
          { t: 'imgsm', key: 'zand-shiraz-city', cap: 'Shiraz, the city of poets, which Karim Khan made his capital and adorned.', capFa: 'شیراز، شهر شاعران، که کریم‌خان پایتختش کرد و آراستش.' },
          { t: 'p', x: "He loved Shiraz and lavished care upon it, determined to make it a capital worthy of a peaceful and prosperous Iran. He built and beautified, and much of what he raised still stands today, among the loveliest monuments in the country.", fa: 'شیراز را دوست می‌داشت و بر آن دل سپرد، مصمم که پایتختی درخور ایرانی آرام و آباد بسازد. ساخت و آراست، و بسیاری از آنچه برافراشت امروز هنوز پابرجاست؛ از زیباترین بناهای این سرزمین.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The gifts he left in stone', fa: 'یادگارهایی که در سنگ گذاشت' },
          { t: 'p', x: "At the heart of the city he built the Arg, his great citadel, and beside it a complex of buildings for the people: a mosque, a bazaar, a bathhouse, all bearing the name Vakil, the Advocate, the title he had chosen for himself. Even the monuments he raised carried his humble idea of his own role.", fa: 'در قلب شهر ارگ را ساخت، دژ بزرگش، و در کنارش مجموعه‌ای از بناها برای مردم: مسجدی، بازاری، حمامی، که همه نام وکیل بر خود داشتند؛ همان لقبی که برای خویش برگزیده بود. حتی بناهایی که برافراشت، برداشت فروتنانهٔ او را از جایگاه خودش با خود داشتند.' },
          { t: 'imgsm', key: 'zand-arg', cap: 'The Arg of Karim Khan, his citadel at the heart of Shiraz.', capFa: 'ارگ کریم‌خان، دژ او در قلب شیراز.' },
          { t: 'p', x: "The Vakil Mosque, with its forest of carved stone columns and its exquisite tilework, and the Vakil Bazaar, whose vaulted brick halls still shelter the merchants of Shiraz to this day, are among the treasures of Iranian architecture.", fa: 'مسجد وکیل، با جنگلی از ستون‌های سنگی تراشیده و کاشی‌کاری ظریفش، و بازار وکیل، که راسته‌های آجری و طاق‌دارش تا امروز بازرگانان شیراز را در خود جای داده‌اند، از گنجینه‌های معماری ایران‌اند.' },
        ] },
        { blocks: [
          { t: 'imgrow', keys: ['zand-vakil-mosque', 'zand-vakil-bazaar'], cap: 'The Vakil Mosque and the Vakil Bazaar in Shiraz, built by Karim Khan and still in use today.', capFa: 'مسجد وکیل و بازار وکیل در شیراز، ساختهٔ کریم‌خان، که امروز هم در استفاده‌اند.' },
          { t: 'p', x: "He also laid out gardens and repaired the shrines and tombs of the poets, honoring the cultural soul of the city. Under his care, Shiraz became again what it had long been in the Persian imagination: a place of beauty, learning, and peace.", fa: 'باغ‌ها نیز طرح ریخت و زیارتگاه‌ها و آرامگاه شاعران را تعمیر کرد، و بدین‌سان جان فرهنگی شهر را گرامی داشت. زیر مراقبت او، شیراز دوباره همان شد که دیرزمانی در خیال ایرانی بود: جایگاه زیبایی، دانش و آرامش.' },
          { t: 'pull', x: "He gave his beloved city monuments that still bear his people\'s name, not his own.", fa: 'به شهر محبوبش بناهایی بخشید که هنوز نام مردمش را بر خود دارند، نه نام خودش را.' },
        ] },
      ],
    },
    {
      key: 'zd4',
      title: 'A Reign of Peace and Plenty', titleFa: 'روزگار آرامش و فراوانی',
      subtitle: 'c. 1751 - 1779', titleFa: 'حدود ۱۷۵۱ تا ۱۷۷۹',
      pages: [
        { blocks: [
          { t: 'p', x: "The years of Karim Khan\'s rule were, for most Iranians, a rare and precious season of calm. After decades of war, famine, and cruelty, the country knew peace, and under peace it began to heal and to prosper.", fa: 'سال‌های فرمانروایی کریم‌خان، برای بیشتر ایرانیان، فصلی بود کمیاب و گران‌بها از آرامش. پس از دهه‌ها جنگ و قحطی و بی‌رحمی، کشور آرامش را چشید، و در سایهٔ آرامش رو به بهبود و آبادانی گذاشت.' },
          { t: 'steps', items: [
            { title: 'Light taxes', titleFa: 'مالیات سبک', x: 'He kept the burden on farmers and merchants low, and the people prospered.', fa: 'بار مالیات را بر دوش کشاورزان و بازرگانان سبک نگاه داشت، و مردم بالیدند.' },
            { title: 'Justice for all', titleFa: 'داد برای همه', x: 'Rich and poor alike could seek his judgment, and he was known for fairness.', fa: 'توانگر و تهی‌دست هر دو می‌توانستند داوری او را بخواهند، و به انصاف شناخته می‌شد.' },
            { title: 'Trade revived', titleFa: 'رونق بازرگانی', x: 'He reopened commerce, including trade through the Persian Gulf with distant lands.', fa: 'داد و ستد را از نو گشود، از جمله بازرگانی از راه خلیج فارس با سرزمین‌های دور.' },
            { title: 'Peace at home', titleFa: 'آرامش در خانه', x: 'The wars that had torn Iran apart were stilled, and the country breathed again.', fa: 'جنگ‌هایی که ایران را از هم دریده بودند فرو نشستند، و کشور دوباره نفس کشید.' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: "He encouraged agriculture and trade, and he worked to reopen commerce with the wider world, including dealings with the British East India Company on the Persian Gulf coast. Markets filled, roads grew safer, and the ordinary business of life, so long disrupted by war, resumed.", fa: 'کشاورزی و بازرگانی را رونق بخشید و کوشید داد و ستد با جهان بیرون را از نو بگشاید، از جمله در معامله با کمپانی هند شرقی بریتانیا در کرانهٔ خلیج فارس. بازارها پر شد، راه‌ها امن‌تر شد، و کار و بار روزمرهٔ زندگی، که مدت‌ها جنگ آن را از هم گسسته بود، دوباره به جریان افتاد.' },
          { t: 'p', x: "He was no builder of a vast empire, and he did not seek to be. His ambition was smaller and, in its way, greater: to give his people a good and peaceful life. By the measure that mattered most to him, the wellbeing of ordinary Iranians, his reign was a quiet triumph.", fa: 'سازندهٔ امپراتوری‌ای پهناور نبود و در پی آن هم نبود. آرزویش کوچک‌تر بود و، به شیوهٔ خود، بزرگ‌تر: اینکه به مردمش زندگی‌ای خوب و آرام بدهد. با معیاری که برای خود او از همه مهم‌تر بود، یعنی آسایش مردم عادی ایران، سلطنتش پیروزی‌ای بی‌سر و صدا بود.' },
        ] },
        { blocks: [
          { t: 'call', title: 'Remembered with love', titleFa: 'با محبت به یاد مانده', x: "History is full of conquerors who won great empires and are remembered with fear. Karim Khan won something rarer. He is remembered with affection, as a good man who used his power to shelter his people rather than to glorify himself.", fa: 'تاریخ پر است از فاتحانی که امپراتوری‌های بزرگ به دست آوردند و با ترس به یاد آورده می‌شوند. کریم‌خان چیز کمیاب‌تری به دست آورد: با محبت به یاد آورده می‌شود، چون مرد نیکی که قدرتش را برای پناه دادن به مردمش به کار برد، نه برای بزرگ کردن خویش.' },
          { t: 'p', x: "For a few decades, in a corner of a turbulent world, a ruler governed by decency, and his people flourished. It is one of the gentlest chapters in the long history of Iran.", fa: 'چند دهه، در گوشه‌ای از جهانی پرآشوب، فرمانروایی با شرافت حکومت کرد و مردمش بالیدند. این یکی از مهربان‌ترین فصل‌های تاریخ بلند ایران است.' },
        ] },
      ],
    },
    {
      key: 'zd5',
      title: 'The End of a Gentle King', titleFa: 'پایان یک پادشاه مهربان',
      subtitle: '1779 - 1794', titleFa: '۱۷۷۹ تا ۱۷۹۴',
      pages: [
        { blocks: [
          { t: 'p', x: "Karim Khan died in Shiraz in 1779, full of years and mourned by his people. For nearly thirty years he had given Iran peace, and his passing was felt as the loss of a protector. With him, the calm he had built began to unravel.", fa: 'کریم‌خان در سال ۱۷۷۹ در شیراز درگذشت، سالخورده و در سوگ مردمش. نزدیک سی سال به ایران آرامش داده بود، و رفتنش چون از دست دادن یک پشتیبان احساس شد. با او، آرامشی که ساخته بود رو به گسستن گذاشت.' },
          { t: 'fact', label: 'Died', labelFa: 'درگذشت', value: '1779, Shiraz', valueFa: '۱۷۷۹، شیراز' },
          { t: 'p', x: "He left no successor of his own strength, and the old pattern reasserted itself. His relatives and rivals fell to fighting over the succession, and the peace of the Zand years gave way once more to struggle.", fa: 'جانشینی هم‌اندازهٔ خود بر جای نگذاشت، و الگوی کهنه دوباره سر برآورد. خویشان و رقیبانش بر سر جانشینی به جان هم افتادند، و آرامش سال‌های زند بار دیگر جای خود را به کشمکش داد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The last of the Zand', fa: 'آخرین زند' },
          { t: 'p', x: "As the dynasty weakened, a new and ruthless power rose in the north under Agha Mohammad Khan, founder of the Qajar dynasty. One by one the Zand were overcome, until only a single young prince remained to carry their standard: Lotf Ali Khan, the last of the Zand.", fa: 'همچنان که سلسله ناتوان می‌شد، در شمال قدرتی تازه و بی‌رحم به رهبری آقامحمدخان، بنیان‌گذار سلسلهٔ قاجار، سر برآورد. زندیان یکی پس از دیگری از پای درآمدند، تا آنکه تنها یک شاهزادهٔ جوان ماند که درفش آنان را برافراشته نگاه دارد: لطفعلی‌خان، آخرین زند.' },
          { t: 'p', x: "Brave, handsome, and gallant, Lotf Ali Khan fought on against overwhelming odds in a struggle that has passed into legend. For years he resisted, winning the devotion of those who followed him, a young hero defending a lost cause with a courage that Iranians still remember.", fa: 'دلیر و خوش‌سیما و جوانمرد، لطفعلی‌خان در برابر نیرویی به‌مراتب بزرگ‌تر جنگید؛ نبردی که به افسانه پیوسته است. سال‌ها ایستادگی کرد و دل کسانی را که به دنبالش رفتند به دست آورد؛ قهرمانی جوان که از آرمانی شکست‌خورده دفاع می‌کرد، با شجاعتی که ایرانیان هنوز به یاد دارند.' },
        ] },
        { blocks: [
          { t: 'p', x: "In 1794 he was at last betrayed and captured, and with his death the Zand dynasty came to its end. The gentle house that had given Iran a season of peace passed into history, and a harder age began under the Qajars.", fa: 'در سال ۱۷۹۴ سرانجام به او خیانت شد و به اسارت درآمد، و با مرگش سلسلهٔ زند به پایان رسید. آن خاندان مهربان که به ایران فصلی از آرامش بخشیده بود به تاریخ پیوست، و روزگاری سخت‌تر زیر فرمان قاجار آغاز شد.' },
          { t: 'div' },
          { t: 'p', x: "This has been a glimpse of the Zand, and of Karim Khan, the soldier who would not be called king. In a cruel and violent age he chose mercy over conquest and his people over his own glory, and he gave Iran a rare and gentle peace.", fa: 'این نگاهی بود کوتاه به زندیان، و به کریم‌خان؛ سربازی که نپذیرفت او را شاه بخوانند. در روزگاری بی‌رحم و خشونت‌بار، بخشش را بر فتح برگزید و مردمش را بر شکوه خویش، و به ایران آرامشی نادر و مهربان بخشید.' },
          { t: 'era', value: '28', label: 'Years of peace he gave Iran', labelFa: 'سالی که به ایران آرامش داد' },
          { t: 'pull', x: "He called himself not king, but the Advocate of the People. His people never forgot it.", fa: 'خود را شاه نخواند، وکیل‌الرعایا خواند. مردمش هرگز آن را از یاد نبردند.' },
        ] },
      ],
    },
  ],
};

const safavid: Topic = {
  key: 'safavid-empire',
  category: 'history',
  name: 'The Safavid Empire',
  persian: 'صفویان',
  years: '1501 - 1736',
  essence: 'The dynasty that reunited Iran, made it a great power once more, and raised Isfahan into one of the most beautiful cities the world has ever seen.',
  essenceFa: 'سلسله‌ای که ایران را دوباره یکپارچه کرد، آن را بار دیگر به قدرتی بزرگ بدل ساخت، و اصفهان را به یکی از زیباترین شهرهایی رساند که جهان به خود دیده است.',
  cover: 'safavid-cover',
  closing: 'safavid-isfahan',
  status: 'ready',
  sources: [
    'The historical record of the Safavid era',
    'Contemporary Persian and European accounts',
    'Roger Savory, Iran Under the Safavids',
  ],
  chapters: [
    {
      key: 'sf1',
      title: 'A Boy King and a New Faith',
      titleFa: 'شاهی نوجوان و آیینی تازه',
      subtitle: '1501',
      subtitleFa: '۱۵۰۱ میلادی',
      pages: [
        { blocks: [
          { t: 'p', x: 'For centuries after the Mongol storm, Iran had been a patchwork of rival lords and warring tribes, with no single ruler and no single soul. Then, at the very dawn of the sixteenth century, a boy of fourteen changed the course of the nation forever.', fa: 'قرن‌ها پس از توفان مغول، ایران به تکه‌هایی پراکنده از خان‌های رقیب و ایل‌های در جنگ بدل شده بود؛ نه فرمانروایی واحد داشت و نه روحی یگانه. سپس، درست در سپیده‌دم سدهٔ شانزدهم، نوجوانی چهارده ساله مسیر این ملت را برای همیشه دگرگون کرد.' },
          { t: 'p', x: 'His name was Ismail, and he was the young leader of the Safavid order, a devoted religious brotherhood from the northwest of Iran. Around him gathered fierce and loyal warriors, and at their head he swept across the land, defeating all who stood against him.', fa: 'نامش اسماعیل بود، پیشوای جوان طریقت صفوی؛ برادری‌ای دینی و سرسپرده از شمال غرب ایران. جنگاورانی دلیر و وفادار گرد او جمع شدند، و او در رأس آنان سرتاسر سرزمین را درنوردید و هر که را در برابرش ایستاد از پای درآورد.' },
          { t: 'imgsm', key: 'safavid-ismail', cap: 'Shah Ismail I, founder of the Safavid dynasty, who took the throne at fourteen.', capFa: 'شاه اسماعیل یکم، بنیان‌گذار سلسلهٔ صفوی، که در چهارده سالگی بر تخت نشست.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The crown at fourteen', fa: 'تاج در چهارده سالگی' },
          { t: 'p', x: 'In 1501 Ismail entered the city of Tabriz in triumph and had himself proclaimed Shah, the king of kings, taking the ancient title of the Persian monarchs. A boy still, he had founded a dynasty that would rule Iran for more than two centuries and restore it to greatness.', fa: 'در سال ۱۵۰۱ اسماعیل پیروزمندانه وارد تبریز شد و خود را شاه خواند؛ شاهنشاه، با همان لقب کهن پادشاهان ایران. هنوز نوجوان بود که سلسله‌ای بنیان گذاشت که بیش از دو قرن بر ایران فرمان راند و آن را به بزرگی بازگرداند.' },
          { t: 'keyvalue', items: [
            { k: 'Founded', v: '1501, in Tabriz' },
            { k: 'Founder', v: 'Shah Ismail I, aged 14' },
            { k: 'Duration', v: 'Over 200 years' },
            { k: 'Legacy', v: 'A reunified, reborn Iran' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A faith that shaped a nation', fa: 'آیینی که ملتی را شکل داد' },
          { t: 'p', x: 'Ismail did something that would define Iran to this very day. He made Shia Islam the faith of his realm, setting Iran apart from its powerful Sunni neighbours and giving the nation a distinct religious identity that has endured for five hundred years.', fa: 'اسماعیل کاری کرد که تا همین امروز ایران را تعریف می‌کند. تشیع را آیین رسمی قلمرو خود قرار داد و بدین‌سان ایران را از همسایگان نیرومند سنی‌مذهبش جدا ساخت؛ هویتی دینی و متمایز به این ملت بخشید که پانصد سال دوام آورده است.' },
          { t: 'p', x: 'It was a decision of enormous consequence. It unified the many peoples of Iran under one faith and one crown, forged a strong sense of a single nation, and shaped the character of the country for all the centuries that followed. Modern Iran, in its faith and its borders, was born in these years.', fa: 'این تصمیمی بود با پیامدهایی عظیم. مردمان گوناگون ایران را زیر یک آیین و یک تاج گرد آورد، حس نیرومندی از ملتی واحد پدید آورد، و خصلت این کشور را برای همهٔ قرن‌های پس از آن تعیین کرد. ایران امروز، در آیین و در مرزهایش، در همین سال‌ها زاده شد.' },
          { t: 'pull', x: 'From a fractured land, a single nation was reborn.', fa: 'از سرزمینی چندپاره، ملتی یگانه دوباره زاده شد.' },
        ] },
      ],
    },
    {
      key: 'sf2',
      title: 'The Struggle for the Realm',
      titleFa: 'کشمکش بر سر قلمرو',
      subtitle: '1514 - 1587',
      subtitleFa: '۱۵۱۴ تا ۱۵۸۷',
      pages: [
        { blocks: [
          { t: 'p', x: 'A reborn Iran did not go unchallenged. To the west lay the mighty Ottoman Empire, the greatest power of the age, and between the two great empires there began a long and bitter rivalry that would last for generations.', fa: 'ایرانِ دوباره‌زاده بی‌رقیب نماند. در غرب امپراتوری نیرومند عثمانی قرار داشت، بزرگ‌ترین قدرت آن روزگار، و میان این دو امپراتوری بزرگ رقابتی دیرپا و تلخ آغاز شد که نسل‌ها ادامه یافت.' },
          { t: 'p', x: 'In 1514, at the battle of Chaldiran, the young Safavid state met the Ottomans in the field. The Ottomans had cannon and firearms, weapons the Safavid cavalry lacked, and the day went against Iran. It was a hard and early lesson that valour alone could not win a modern war.', fa: 'در سال ۱۵۱۴، در نبرد چالدران، دولت جوان صفوی در میدان با عثمانی روبه‌رو شد. عثمانیان توپ و سلاح آتشین داشتند، چیزی که سوارهٔ صفوی از آن بی‌بهره بود، و روز به زیان ایران تمام شد. این درسی سخت و زودهنگام بود: دلاوری به‌تنهایی جنگی مدرن را نمی‌برد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A kingdom tested', fa: 'پادشاهی‌ای در بوتهٔ آزمایش' },
          { t: 'p', x: 'The decades that followed were difficult ones. The dynasty was pressed on its frontiers by the Ottomans in the west and the Uzbeks in the east, and troubled at home by the rivalries of the powerful tribal chiefs on whom the throne depended.', fa: 'دهه‌های پس از آن دشوار بودند. سلسله در مرزهایش از غرب زیر فشار عثمانی و از شرق زیر فشار ازبکان بود، و در درون نیز رقابت خان‌های نیرومند ایلی گرفتارش کرده بود؛ همان‌ها که تخت به آنان تکیه داشت.' },
          { t: 'img', key: 'safavid-battle', cap: 'The Safavids faced the great powers of their age on every frontier.', capFa: 'صفویان در هر مرزی با قدرت‌های بزرگ روزگار خود روبه‌رو بودند.' },
          { t: 'p', x: 'Yet the young state endured. Through hard years and capable rulers it held together, waiting, though it did not yet know it, for the king who would raise it to its height.', fa: 'با این همه، دولت جوان دوام آورد. در سال‌های سخت و به دست فرمانروایانی کاردان یکپارچه ماند و در انتظار نشست؛ هرچند خود هنوز نمی‌دانست در انتظار چه کسی است: شاهی که آن را به اوج خواهد رساند.' },
        ] },
        { blocks: [
          { t: 'era', value: '1587', label: 'The year everything changed' },
          { t: 'p', x: 'In 1587 the throne passed to a prince who would become the greatest of all the Safavid kings, and one of the greatest rulers in the whole history of Iran. His name was Abbas.', fa: 'در سال ۱۵۸۷ تخت به شاهزاده‌ای رسید که بزرگ‌ترین پادشاه صفوی و یکی از بزرگ‌ترین فرمانروایان سراسر تاریخ ایران شد. نامش عباس بود.' },
        ] },
      ],
    },
    {
      key: 'sf3',
      title: 'Shah Abbas the Great',
      titleFa: 'شاه عباس بزرگ',
      subtitle: '1587 - 1629',
      subtitleFa: '۱۵۸۷ تا ۱۶۲۹',
      pages: [
        { blocks: [
          { t: 'p', x: 'Shah Abbas came to the throne of a troubled kingdom, hemmed in by enemies and weakened by division within. Over the course of his long reign he transformed it utterly, and left Iran stronger, richer, and more glorious than it had been in a thousand years.', fa: 'شاه عباس بر تخت پادشاهی‌ای نشست که گرفتار بود؛ از بیرون در محاصرهٔ دشمنان و از درون فرسودهٔ تفرقه. در طول سلطنت بلندش آن را یکسره دگرگون کرد و ایران را نیرومندتر، ثروتمندتر و باشکوه‌تر از هزار سال گذشته‌اش بر جای گذاشت.' },
          { t: 'imgsm', key: 'safavid-abbas', cap: 'Shah Abbas the Great, under whom the Safavid Empire reached its height.', capFa: 'شاه عباس بزرگ، که امپراتوری صفوی در روزگار او به اوج رسید.' },
          { t: 'p', x: 'He was a ruler of rare gifts: a brilliant soldier, a shrewd statesman, and a great patron of art and architecture. He was also, at times, a hard and suspicious man, as the great kings of that age often were. But his vision for Iran was without equal.', fa: 'فرمانروایی بود با توانایی‌هایی کم‌نظیر: سربازی درخشان، سیاستمداری زیرک، و حامی بزرگ هنر و معماری. گاه نیز مردی سختگیر و بدگمان بود، چنان‌که پادشاهان بزرگ آن روزگار اغلب بودند. اما چشم‌اندازی که برای ایران داشت بی‌همتا بود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The remaking of an army', fa: 'بازساختن یک ارتش' },
          { t: 'p', x: 'Abbas understood the lesson of Chaldiran. He built a new standing army, no longer dependent on the fickle tribal cavalry, equipped with muskets and cannon in the modern way. With it he became master in his own house and a match for his enemies abroad.', fa: 'عباس درس چالدران را دریافته بود. ارتشی تازه و دائمی بنیان گذاشت که دیگر به سوارهٔ بی‌ثبات ایلی وابسته نبود و به شیوهٔ مدرن به تفنگ و توپ مجهز شده بود. با همین ارتش، هم در خانهٔ خود صاحب‌اختیار شد و هم در برابر دشمنان بیرونی هماورد.' },
          { t: 'p', x: 'Then he turned that army against the empires that had pressed Iran for so long. He drove back the Uzbeks in the east, and he won back from the Ottomans the great western lands they had taken, restoring Iran to its full strength and its rightful borders.', fa: 'سپس همین ارتش را به سوی امپراتوری‌هایی گرداند که مدت‌ها بر ایران فشار آورده بودند. ازبکان را در شرق عقب راند و سرزمین‌های بزرگ غربی را که عثمانیان گرفته بودند بازپس گرفت، و ایران را به توان کامل و مرزهای شایستهٔ خود بازگرداند.' },
          { t: 'steps', items: [
            { title: 'A modern army', titleFa: 'ارتشی مدرن', x: 'A standing force with muskets and cannon, loyal to the crown alone.', fa: 'نیرویی دائمی، مجهز به تفنگ و توپ، که تنها به تاج وفادار بود.' },
            { title: 'Enemies driven back', titleFa: 'دشمنان عقب رانده شدند', x: 'The Uzbeks in the east and the Ottomans in the west were defeated.', fa: 'ازبکان در شرق و عثمانیان در غرب شکست خوردند.' },
            { title: 'Trade and wealth', titleFa: 'تجارت و ثروت', x: 'He welcomed merchants from across the world and made Iran rich.', fa: 'بازرگانان را از سراسر جهان پذیرا شد و ایران را ثروتمند کرد.' },
            { title: 'A new capital', titleFa: 'پایتختی تازه', x: 'He made Isfahan his capital and adorned it beyond compare.', fa: 'اصفهان را پایتخت خود کرد و آن را چنان آراست که همتا نداشت.' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A door opened to the world', fa: 'دری که به جهان گشوده شد' },
          { t: 'p', x: 'Abbas welcomed the world to Iran. He invited European merchants and ambassadors, encouraged the silk trade that was the treasure of his realm, and made his country a crossroads of commerce between East and West. Iranian silk and carpets travelled to the courts of Europe, and the wealth of the world flowed into Iran.', fa: 'عباس جهان را به ایران فراخواند. بازرگانان و سفیران اروپایی را دعوت کرد، تجارت ابریشم را که گنج قلمروش بود رونق بخشید، و کشورش را به چهارراه بازرگانی میان شرق و غرب بدل ساخت. ابریشم و فرش ایرانی به دربارهای اروپا راه یافت و ثروت جهان به ایران سرازیر شد.' },
          { t: 'p', x: 'Under his hand, Iran was not only strong but prosperous, respected among the great powers of the earth, and open to the world in a way it had not been for centuries.', fa: 'زیر دست او ایران نه تنها نیرومند که آباد بود؛ در میان قدرت‌های بزرگ زمین محترم شمرده می‌شد، و به روی جهان گشوده بود، آن‌گونه که قرن‌ها نبوده بود.' },
        ] },
      ],
    },
    {
      key: 'sf4',
      title: 'Isfahan, Half the World',
      titleFa: 'اصفهان، نصف جهان',
      subtitle: 'The jewel of the empire',
      pages: [
        { blocks: [
          { t: 'p', x: 'Of all that Shah Abbas achieved, none endures more beautifully than his capital. He made Isfahan the seat of his empire and set out to make it the most beautiful city on earth, and by the judgment of many who saw it, he succeeded.', fa: 'از میان همهٔ دستاوردهای شاه عباس، هیچ‌کدام به زیبایی پایتختش بر جای نمانده است. اصفهان را مقر امپراتوری خود کرد و بر آن شد که زیباترین شهر روی زمین را بسازد؛ و به داوری بسیاری از کسانی که آن را دیدند، کامیاب شد.' },
          { t: 'img', key: 'safavid-isfahan', cap: 'Isfahan, the capital of Shah Abbas, one of the most beautiful cities ever built.', capFa: 'اصفهان، پایتخت شاه عباس، یکی از زیباترین شهرهایی که تاکنون ساخته شده.' },
          { t: 'p', x: 'So great was its splendour that a saying arose, repeated by travellers across the world, that captured the wonder of all who beheld it.', fa: 'شکوهش چندان بود که ضرب‌المثلی از آن برخاست؛ سخنی که مسافران در سراسر جهان تکرارش کردند و شگفتی همهٔ کسانی را که آن را دیده بودند در خود داشت.' },
        ] },
        { blocks: [
          { t: 'quotebig', x: 'Isfahan is half the world.', fa: 'اصفهان نصف جهان است.', by: 'A SAYING OF THE AGE', byFa: 'ضرب‌المثلی از آن روزگار' },
          { t: 'p', x: 'At the heart of the city he laid out a vast royal square, the Naqsh-e Jahan, the Image of the World, one of the largest and most magnificent public squares ever built. Around it he raised buildings of such beauty that they remain, to this day, among the treasures of all humanity.', fa: 'در قلب شهر میدانی شاهی و پهناور طرح ریخت: نقش جهان، از بزرگ‌ترین و باشکوه‌ترین میدان‌های عمومی که تا آن روز ساخته شده بود. پیرامون آن بناهایی برافراشت چنان زیبا که تا امروز در شمار گنجینه‌های همهٔ بشریت مانده‌اند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Wonders in tile and stone', fa: 'شگفتی‌هایی از کاشی و سنگ' },
          { t: 'p', x: 'On the square rose the great Shah Mosque, its dome and portals covered in dazzling blue tilework, a masterpiece of Persian architecture. Nearby stood the exquisite Sheikh Lotfollah Mosque, the graceful Ali Qapu palace, and the entrance to the endless royal bazaar.', fa: 'بر این میدان مسجد بزرگ شاه سر برآورد، با گنبد و سردری پوشیده از کاشی‌کاری خیره‌کنندهٔ لاجوردی؛ شاهکاری از معماری ایرانی. در همان نزدیکی مسجد ظریف شیخ لطف‌الله ایستاده بود، کاخ موزون عالی‌قاپو، و سردر بازار بی‌انتهای شاهی.' },
          { t: 'imgrow', keys: ['safavid-mosque-1', 'safavid-mosque-2'], cap: 'The great mosques of Isfahan, masterpieces of blue tilework raised under Shah Abbas.', capFa: 'مسجدهای بزرگ اصفهان، شاهکارهای کاشی‌کاری آبی که در روزگار شاه عباس برپا شد.' },
          { t: 'p', x: 'He built bridges across the river that were themselves works of art, and gardens and avenues that made the city a paradise. The mastery of the Persian artist reached its very summit here, in colour, in geometry, and in grace.', fa: 'بر رودخانه پل‌هایی ساخت که خود اثر هنری بودند، و باغ‌ها و خیابان‌هایی که شهر را به بهشت بدل کردند. چیره‌دستی هنرمند ایرانی همین‌جا به اوج خود رسید: در رنگ، در هندسه، و در لطافت.' },
        ] },
        { blocks: [
          { t: 'keyvalue', items: [
            { k: 'The square', v: 'Naqsh-e Jahan, the Image of the World' },
            { k: 'The great mosque', v: 'The Shah Mosque, in blue tile' },
            { k: 'The saying', v: 'Isfahan is half the world' },
            { k: 'Today', v: 'A treasure of world heritage' },
          ] },
          { t: 'p', x: 'The Isfahan of Shah Abbas still stands, and still takes the breath away. To walk its great square is to step into the golden age of Iran, and to see what the Persian genius could raise when it reached its height.', fa: 'اصفهانِ شاه عباس هنوز پابرجاست و هنوز نفس را در سینه حبس می‌کند. قدم زدن در میدان بزرگش، پا گذاشتن به عصر طلایی ایران است؛ و دیدن آنچه نبوغ ایرانی، آنگاه که به اوج خود می‌رسد، می‌تواند برافرازد.' },
        ] },
      ],
    },
    {
      key: 'sf5',
      title: 'The Long Twilight',
      titleFa: 'غروبی طولانی',
      subtitle: '1629 - 1736',
      subtitleFa: '۱۶۲۹ تا ۱۷۳۶',
      pages: [
        { blocks: [
          { t: 'p', x: 'No golden age lasts forever. After the death of Shah Abbas the Great in 1629, the empire he had built lived on for another century, still rich, still cultured, still magnificent to behold. But its strength slowly ebbed away.', fa: 'هیچ عصر طلایی جاودانه نیست. پس از مرگ شاه عباس بزرگ در سال ۱۶۲۹، امپراتوری‌ای که ساخته بود یک قرن دیگر دوام آورد؛ همچنان ثروتمند، همچنان فرهیخته، همچنان در چشم بیننده باشکوه. اما توانش به‌آرامی رو به کاستی گذاشت.' },
          { t: 'p', x: 'The later kings were, too often, men raised in the ease of the palace rather than the hardship of the field. Some were gifted, but few had the iron of Abbas, and the vigour that had carried the dynasty to greatness gradually faded.', fa: 'پادشاهان بعدی، بیش از آنکه در سختی میدان بار آمده باشند، اغلب در آسایش کاخ پرورش یافته بودند. برخی توانمند بودند، اما کمتر کسی صلابت عباس را داشت، و آن نیرویی که سلسله را به بزرگی رسانده بود رفته‌رفته فروکش کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The fall of Isfahan', fa: 'سقوط اصفهان' },
          { t: 'p', x: 'The end, when it came, was sudden and sorrowful. In 1722 an army of Afghan rebels marched on the heart of the empire and laid siege to Isfahan itself. After months of terrible hunger, the jewel of Iran, the city that was half the world, fell.', fa: 'پایان، آنگاه که رسید، ناگهانی و اندوهبار بود. در سال ۱۷۲۲ سپاهی از شورشیان افغان به قلب امپراتوری تاختند و خودِ اصفهان را به محاصره درآوردند. پس از ماه‌ها گرسنگی هولناک، نگین ایران، شهری که نصف جهان بود، فرو افتاد.' },
          { t: 'p', x: 'It was a bitter blow to a proud nation, and it marked the effective end of Safavid power. The dynasty lingered a few years more in name, but its greatness was gone.', fa: 'این ضربه‌ای تلخ بر ملتی سربلند بود و در عمل پایان قدرت صفوی را رقم زد. سلسله چند سالی دیگر تنها به نام باقی ماند، اما بزرگی‌اش رفته بود.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Safavids, the dynasty that raised Iran from division into unity, and from weakness into one of the golden ages of its long history. They gave the nation its faith, its renewed strength, and in Isfahan a beauty that has never been surpassed.', fa: 'این نگاهی بود کوتاه به صفویان؛ سلسله‌ای که ایران را از تفرقه به یکپارچگی رساند و از ناتوانی به یکی از عصرهای طلایی تاریخ بلندش. آنان به این ملت آیینش را دادند، توان دوباره‌اش را، و در اصفهان زیبایی‌ای که هرگز از آن پیشی گرفته نشد.' },
          { t: 'p', x: 'For two centuries they made Iran a great power and a wonder of the world, and though their empire fell, what they built endures. In the blue domes of Isfahan, the golden age of the Safavids still shines.', fa: 'دو قرن ایران را قدرتی بزرگ و شگفتی جهان کردند، و هرچند امپراتوری‌شان فرو ریخت، آنچه ساختند بر جای مانده است. در گنبدهای لاجوردی اصفهان، عصر طلایی صفویان هنوز می‌درخشد.' },
          { t: 'pull', x: 'They made Iran whole again, and left it a beauty that still shines.', fa: 'ایران را دوباره یکپارچه کردند، و زیبایی‌ای برایش به جا گذاشتند که هنوز می‌درخشد.' },
        ] },
      ],
    },
  ],
};

const qajar: Topic = {
  key: 'qajar-dynasty',
  category: 'history',
  name: 'The Qajar Dynasty',
  persian: 'قاجاریان',
  years: '1789 - 1925',
  essence: 'The dynasty that ruled Iran through a long and difficult century, caught between the great powers, until the ground was laid for a new age.',
  essenceFa: 'سلسله‌ای که ایران را در قرنی دراز و دشوار اداره کرد، گرفتار میان قدرت‌های بزرگ، تا آنکه زمین برای روزگاری تازه آماده شد.',
  cover: 'qajar-cover',
  closing: 'qajar-cover',
  status: 'ready',
  sources: [
    'The historical record of the Qajar era',
    'Contemporary Persian and European accounts',
    'Abbas Amanat, Pivot of the Universe',
  ],
  chapters: [
    {
      key: 'qj1',
      title: 'A New Dynasty from the North', titleFa: 'سلسله‌ای تازه از شمال',
      subtitle: '1789 - 1834',
      pages: [
        { blocks: [
          { t: 'p', x: 'After the gentle Zand dynasty fell, a harder power rose to take its place. Agha Mohammad Khan, chief of the Qajar tribe of the north, fought his way to mastery over Iran and had himself crowned Shah in the last years of the eighteenth century.', fa: 'پس از فروپاشی سلسلهٔ مهربان زند، قدرتی سخت‌تر جایش را گرفت. آقامحمدخان، سرکردهٔ ایل قاجار در شمال، با جنگ راه خود را تا فرمانروایی بر ایران باز کرد و در واپسین سال‌های سدهٔ هجدهم تاج بر سر گذاشت.' },
          { t: 'p', x: 'He was a ruler of iron will and, by all accounts, fearsome cruelty, forged in a lifetime of struggle and captivity. But he reunited a country that had again fallen into division, and he founded a dynasty that would rule Iran for well over a century.', fa: 'فرمانروایی بود با ارادهٔ آهنین و، به گواه همهٔ روایت‌ها، بی‌رحمی‌ای هولناک؛ کسی که عمری کشمکش و اسارت او را چنین ساخته بود. اما کشوری را که دوباره به تفرقه افتاده بود یکپارچه کرد، و سلسله‌ای بنیان نهاد که بیش از یک قرن بر ایران فرمان راند.' },
          { t: 'splitimg', key: 'qajar-agha-mohammad', title: 'The founder', titleFa: 'بنیان‌گذار', x: 'Agha Mohammad Khan reunited Iran by force and founded the Qajar line, though he did not live long to enjoy his throne. He was assassinated in 1797, soon after his coronation.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A capital named Tehran', fa: 'پایتختی به نام تهران' },
          { t: 'p', x: 'It was the Qajars who chose as their capital a modest town in the north of Iran, one that would grow, over their long rule and the ages after, into the great metropolis of the nation. That town was Tehran, and it has been the heart of Iran ever since.', fa: 'این قاجارها بودند که شهرکی ساده در شمال ایران را پایتخت خود کردند؛ شهرکی که در طول فرمانروایی بلندشان و روزگاران پس از آن، به کلان‌شهر بزرگ این کشور بدل شد. آن شهرک تهران بود، و از آن روز تا امروز قلب ایران مانده است.' },
          { t: 'markline', x: 'Under the Qajars, Tehran became the capital it remains to this day.', fa: 'در روزگار قاجار، تهران پایتخت شد و تا امروز مانده است.' },
          { t: 'p', x: 'The crown passed to Fath Ali Shah, whose long reign was famous for its splendour and ceremony, its jewelled court and its portraits of a bearded king in golden robes. But beyond the glitter of the court, storm clouds were gathering on the horizon.', fa: 'تاج به فتحعلی‌شاه رسید، که سلطنت بلندش به شکوه و تشریفات نامدار بود؛ به درباری پر از جواهر و به آن نگاره‌های شاهی ریش‌بلند در جامهٔ زرین. اما آن‌سوی درخشش دربار، ابرهای توفان بر افق گرد می‌آمدند.' },
        ] },
      ],
    },
    {
      key: 'qj2',
      title: 'Caught Between Empires', titleFa: 'گرفتار میان دو امپراتوری',
      subtitle: '1804 - 1828',
      pages: [
        { blocks: [
          { t: 'p', x: 'The nineteenth century was the age of the great European empires, and Iran found itself caught between two of the hungriest. To the north loomed the vast and expanding empire of Russia. To the east and south stretched the power of the British, masters of India.', fa: 'سدهٔ نوزدهم روزگار امپراتوری‌های بزرگ اروپایی بود، و ایران خود را گرفتار میان دو تا از گرسنه‌ترینشان یافت. در شمال، امپراتوری پهناور و روبه‌گسترش روسیه سایه انداخته بود. در شرق و جنوب، قدرت بریتانیا کشیده شده بود؛ اربابان هند.' },
          { t: 'p', x: 'Between these two giants, Iran was squeezed, courted, and pressured, its fate bound up in a great game of empires that it had not the strength to control. It was a hard and humbling position for a proud and ancient nation.', fa: 'ایران میان این دو غول فشرده شد، وعده شنید و زیر فشار رفت؛ سرنوشتش گره خورده بود به بازی بزرگ امپراتوری‌ها، بازی‌ای که توان مهارش را نداشت. برای ملتی سربلند و کهن، جایگاهی بود سخت و خفت‌بار.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The wars with Russia', fa: 'جنگ‌های ایران و روس' },
          { t: 'p', x: 'Twice in the early century Iran went to war with Russia over the lands of the Caucasus, and twice it was defeated by the superior arms and organization of the Russian armies. The cost of those defeats was severe, and it was paid in Iranian soil.', fa: 'دو بار در آغاز آن قرن، ایران بر سر سرزمین‌های قفقاز با روسیه جنگید، و هر دو بار در برابر سلاح و سازمان برتر سپاه روس شکست خورد. بهای این شکست‌ها سنگین بود، و با خاک ایران پرداخت شد.' },
          { t: 'numstat', items: [
            { n: '1813', label: 'The Treaty of Gulistan, after the first war' },
            { n: '1828', label: 'The Treaty of Turkmenchay, after the second' },
            { n: 'Caucasus', label: 'Georgia, and much of the Caucasus, lost' },
            { n: 'Capitulations', label: 'Special rights granted to foreign powers' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'By the Treaty of Turkmenchay, one of the most painful in Iranian history, Iran gave up its claims to the rich lands of the Caucasus and granted Russia sweeping privileges. It was a wound to national pride that would not soon heal, and a sign of how far the balance had tipped against Iran.', fa: 'با عهدنامهٔ ترکمانچای، از دردناک‌ترین قراردادهای تاریخ ایران، ایران از ادعای خود بر سرزمین‌های حاصلخیز قفقاز چشم پوشید و امتیازهایی گسترده به روسیه داد. زخمی بود بر غرور ملی که به این زودی‌ها التیام نیافت، و نشانه‌ای از اینکه ترازو تا کجا به زیان ایران چرخیده است.' },
          { t: 'markline', x: 'A proud nation learned, painfully, that valour alone could not stand against modern empires.', fa: 'ملتی سربلند، به تلخی آموخت که دلاوری به‌تنهایی در برابر امپراتوری‌های مدرن دوام نمی‌آورد.' },
        ] },
      ],
    },
    {
      key: 'qj3',
      title: 'The Reformer Who Was Lost', titleFa: 'اصلاحگری که از دست رفت',
      subtitle: '1848 - 1851',
      pages: [
        { blocks: [
          { t: 'p', x: 'Not everyone accepted Iran\'s decline. In the middle of the century there rose a man who saw clearly what his country needed, and who tried, in a few short years, to drag it into the modern world. His name was Amir Kabir, and he was the chief minister of the young Shah, Naser al-Din.', fa: 'همه به افول ایران تن ندادند. در میانهٔ آن قرن مردی برخاست که به‌روشنی می‌دید کشورش به چه نیاز دارد، و کوشید در چند سال کوتاه آن را به جهان مدرن بکشاند. نامش امیرکبیر بود، صدراعظم شاه جوان، ناصرالدین‌شاه.' },
          { t: 'splitimg', key: 'qajar-amir-kabir', title: 'Amir Kabir', titleFa: 'امیرکبیر', x: 'A brilliant and honest statesman, Amir Kabir set out to reform Iran root and branch: its army, its finances, its industry, and its schools. He is remembered as one of the greatest reformers in the nation\'s history.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A vision of a modern Iran', fa: 'چشم‌اندازی از ایرانی مدرن' },
          { t: 'p', x: 'In his brief time in power, Amir Kabir accomplished a remarkable amount. He founded the Dar ol-Fonun, the first modern institution of higher learning in Iran, a school of science, engineering, and medicine that would shape generations. He reformed the treasury, curbed corruption, and worked to build modern industry.', fa: 'امیرکبیر در همان مدت کوتاه قدرتش، کارهای چشمگیری از پیش برد. دارالفنون را بنیان نهاد، نخستین نهاد نوین آموزش عالی در ایران؛ مدرسه‌ای برای دانش و مهندسی و پزشکی که نسل‌ها را شکل داد. خزانه را سامان داد، جلوی فساد را گرفت، و برای برپا کردن صنعت نوین کوشید.' },
          { t: 'duo', left: { title: 'His vision', titleFa: 'آنچه در سر داشت', x: 'A modern, independent, educated Iran, strong enough to stand on its own among the nations.' }, right: { title: 'His enemies', titleFa: 'دشمنانش', x: 'A jealous court that feared his power and honesty, and whispered against him to the young king.' } },
        ] },
        { blocks: [
          { t: 'p', x: 'But his very success made him enemies. The courtiers whose corruption he threatened, and who feared his influence over the young Shah, turned the king against him. In 1851 he was dismissed, exiled, and soon after put to death on the Shah\'s order, in a bath house in Kashan.', fa: 'اما همین کامیابی برایش دشمن تراشید. درباریانی که فسادشان را در خطر می‌دیدند و از نفوذ او بر شاه جوان می‌ترسیدند، شاه را در برابرش برانگیختند. در سال ۱۲۳۰ خورشیدی از کار برکنار شد، به تبعید رفت، و اندکی بعد به فرمان شاه در حمام فین کاشان کشته شد.' },
          { t: 'markline', x: 'Iran lost, in one stroke, the greatest reformer of its age. It is one of history\'s saddest what-ifs.', fa: 'ایران در یک ضربه بزرگ‌ترین اصلاحگر روزگارش را از دست داد. این یکی از اندوهبارترین «اگر»های تاریخ است.' },
          { t: 'p', x: 'What Iran might have become, had Amir Kabir been allowed to finish his work, is one of the great questions of the nation\'s history. His death was a tragedy, and the reforms he began were largely undone.', fa: 'اینکه اگر می‌گذاشتند امیرکبیر کارش را به پایان برساند ایران چه می‌شد، از پرسش‌های بزرگ تاریخ این ملت است. مرگش فاجعه بود، و اصلاحاتی که آغاز کرده بود بیشترش بر باد رفت.' },
        ] },
      ],
    },
    {
      key: 'qj4',
      title: 'The Awakening of a Nation', titleFa: 'بیداری یک ملت',
      subtitle: '1890 - 1911',
      pages: [
        { blocks: [
          { t: 'p', x: 'As the century wore on, the kings sold ever more of the nation\'s wealth and rights to foreign powers and companies, granting concessions over tobacco, banking, oil, and more, to fill an empty treasury. But the people of Iran were beginning to stir.', fa: 'هرچه قرن پیش‌تر می‌رفت، شاهان بیشتر و بیشتر از ثروت و حقوق این ملت را به قدرت‌ها و شرکت‌های بیگانه فروختند؛ امتیاز تنباکو، بانک، نفت و بسیاری دیگر را واگذار کردند تا خزانهٔ تهی را پر کنند. اما مردم ایران داشتند بیدار می‌شدند.' },
          { t: 'h', x: 'The Tobacco Protest', fa: 'تحریم تنباکو' },
          { t: 'p', x: 'In 1890 the Shah granted a sweeping monopoly over all Iranian tobacco to a British company. The nation erupted. Led by the clergy and the merchants, Iranians of every class joined a boycott so complete that, it is said, even the women of the royal harem refused to smoke. The Shah was forced to cancel the concession.', fa: 'در سال ۱۸۹۰ شاه امتیاز انحصار تمام تنباکوی ایران را به یک شرکت بریتانیایی واگذار کرد. کشور به جوش آمد. به پیشگامی روحانیان و بازاریان، ایرانیان از هر طبقه به تحریمی پیوستند چنان فراگیر که، به روایتی، حتی زنان اندرون شاهی هم قلیان را کنار گذاشتند. شاه ناچار شد امتیاز را لغو کند.' },
          { t: 'markline', x: 'For the first time, the people had spoken with one voice, and the throne had been made to listen.', fa: 'برای نخستین بار، مردم یکصدا سخن گفتند، و تخت ناچار شد بشنود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Constitutional Revolution', fa: 'انقلاب مشروطه' },
          { t: 'p', x: 'The Tobacco Protest was only the beginning. The demand grew for a government of laws rather than the whim of kings, and in 1906 the movement triumphed. The Shah was compelled to grant a constitution and to establish the Majles, the national parliament, the first in Iranian history.', fa: 'تحریم تنباکو تنها آغاز بود. خواستِ حکومتِ قانون به جای هوس شاهان بالا گرفت، و در سال ۱۲۸۵ خورشیدی این جنبش به پیروزی رسید. شاه ناگزیر شد فرمان مشروطیت را امضا کند و مجلس شورای ملی را برپا دارد؛ نخستین مجلس تاریخ ایران.' },
          { t: 'ribbon', items: [
            { year: '1890', label: 'The Tobacco Protest unites the nation against a foreign monopoly' },
            { year: '1906', label: 'The Constitutional Revolution wins a constitution and a parliament' },
            { year: '1908', label: 'The Shah strikes back, and the parliament is bombarded' },
            { year: '1909', label: 'The constitutionalists retake Tehran and restore the Majles' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'It was a hard-won and fragile victory, and the struggle between the crown and the constitution would go on for years, with the parliament even bombarded at one point by Russian-officered forces. But something fundamental had changed. The idea had taken root that the people, not the king alone, were the source of authority in Iran.', fa: 'پیروزی‌ای بود به‌سختی به دست آمده و شکننده، و کشمکش میان تاج و مشروطه سال‌ها ادامه یافت؛ تا آنجا که یک بار نیروهایی به فرماندهی افسران روس مجلس را به توپ بستند. اما چیزی بنیادی تغییر کرده بود. این اندیشه ریشه دوانده بود که سرچشمهٔ قدرت در ایران مردم‌اند، نه تنها شاه.' },
          { t: 'markline', x: 'A nation had awoken to the idea that it belonged to its people.', fa: 'ملتی بیدار شد به این اندیشه که این سرزمین از آنِ مردمش است.' },
        ] },
      ],
    },
    {
      key: 'qj5',
      title: 'The End of an Age', titleFa: 'پایان یک دوران',
      subtitle: '1911 - 1925',
      pages: [
        { blocks: [
          { t: 'p', x: 'The final years of the Qajars were the hardest of all. During the First World War, though Iran declared its neutrality, the armies of Russia, Britain, and the Ottomans marched across its soil at will, and famine and disorder swept the land. The Qajar state had become too weak to protect its own people.', fa: 'واپسین سال‌های قاجار از همه سخت‌تر بود. در جنگ جهانی اول، هرچند ایران بی‌طرفی خود را اعلام کرده بود، سپاهیان روس و بریتانیا و عثمانی هرگاه خواستند از خاکش گذشتند، و قحطی و آشوب این سرزمین را فرا گرفت. دولت قاجار چنان ناتوان شده بود که از مردم خودش هم نمی‌توانست نگهبانی کند.' },
          { t: 'numstat', items: [
            { n: 'WWI', label: 'Foreign armies cross a neutral Iran' },
            { n: 'Famine', label: 'Disorder and hunger grip the land' },
            { n: '1921', label: 'A coup led by Reza Khan' },
            { n: '1925', label: 'The Qajar dynasty ends' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A soldier steps forward', fa: 'سربازی پا پیش می‌گذارد' },
          { t: 'p', x: 'Out of this chaos, in 1921, stepped a commander of the Cossack Brigade named Reza Khan, who marched on Tehran and seized the initiative. For a few years he ruled in the shadow of the last, powerless Qajar king. Then, in 1925, the parliament set the old dynasty aside and raised him to the throne as Reza Shah Pahlavi.', fa: 'از دل همین آشوب، در اسفند ۱۲۹۹، فرماندهی از بریگاد قزاق به نام رضاخان پا پیش گذاشت؛ به سوی تهران راه افتاد و ابتکار عمل را به دست گرفت. چند سالی در سایهٔ واپسین شاه ناتوان قاجار حکم راند. سپس، در سال ۱۳۰۴، مجلس سلسلهٔ کهنه را کنار گذاشت و او را با نام رضاشاه پهلوی بر تخت نشاند.' },
          { t: 'markline', x: 'The Qajar century closed, and the Pahlavi age of modern Iran began.', fa: 'قرن قاجار بسته شد، و روزگار پهلوی و ایران مدرن آغاز گرفت.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Qajars, who ruled Iran through a long and testing century. It was, in many ways, an age of hardship and decline, of lost wars and foreign pressure. Yet it was also the age in which the Iranian nation awoke, demanded a voice in its own affairs, and won its first constitution.', fa: 'این نگاهی بود کوتاه به قاجارها، که ایران را در قرنی دراز و آزماینده اداره کردند. از بسیاری جهات روزگار سختی و افول بود؛ روزگار جنگ‌های باخته و فشار بیگانه. اما همان روزگاری هم بود که ملت ایران بیدار شد، خواست در کار خودش سهمی داشته باشد، و نخستین قانون اساسی‌اش را به دست آورد.' },
          { t: 'p', x: 'From the trials of the Qajar century, a new and modern Iran was struggling to be born. And when at last it emerged, it would carry forward both the wounds and the awakenings of these long and difficult years.', fa: 'از دل سختی‌های قرن قاجار، ایرانی تازه و مدرن برای زاده شدن دست‌وپا می‌زد. و آنگاه که سرانجام سر برآورد، هم زخم‌های این سال‌های دراز و دشوار را با خود برد و هم بیداری‌هایش را.' },
          { t: 'pull', x: 'In its century of hardship, the nation found its own voice.', fa: 'ملت در قرنِ سختی‌اش، صدای خودش را پیدا کرد.' },
        ] },
      ],
    },
  ],
};

const sasanian: Topic = {
  key: 'sasanian-empire',
  category: 'history',
  name: 'The Sasanian Empire',
  persian: 'ساسانیان',
  years: '224 - 651 CE',
  essence: 'The last great empire of pre-Islamic Iran, a rival of Rome and a golden age of Persian culture, faith, and art, until the coming of Islam changed the nation forever.',
  essenceFa: 'واپسین امپراتوری بزرگ ایران پیش از اسلام؛ هماورد روم و عصر طلایی فرهنگ و آیین و هنر ایرانی، تا آنکه آمدن اسلام این سرزمین را برای همیشه دگرگون کرد.',
  cover: 'sasanian-cover',
  closing: 'sasanian-cover',
  status: 'ready',
  sources: [
    'The historical record of the Sasanian era',
    'Roman and Persian accounts of the age',
    'The Shahnameh of Ferdowsi',
    'Touraj Daryaee, Sasanian Persia',
  ],
  chapters: [
    {
      key: 'ss1',
      title: 'The Rebirth of Persia', titleFa: 'زایش دوبارهٔ ایران',
      subtitle: '224 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'For nearly five centuries after Alexander, the glory of Cyrus and Darius had faded. Iran was ruled first by Greek kings and then by the Parthians, a capable but loosely bound dynasty. The memory of the great Persian Empire lived on, but its full splendour had dimmed.', fa: 'نزدیک پنج قرن پس از اسکندر، شکوه کوروش و داریوش رنگ باخته بود. بر ایران نخست شاهان یونانی فرمان راندند و سپس اشکانیان، سلسله‌ای کاردان اما با بندهایی سست. یاد امپراتوری بزرگ ایران زنده مانده بود، اما درخشش کاملش کم‌فروغ شده بود.' },
          { t: 'p', x: 'Then, in 224 CE, a prince from the south, from the very heartland of Persia where Cyrus had once ruled, rose up and restored the ancient glory. His name was Ardashir, and he founded the Sasanian dynasty, the last and one of the greatest of the pre-Islamic Persian empires.', fa: 'سپس، در سال ۲۲۴ میلادی، شاهزاده‌ای از جنوب، از همان دل سرزمین پارس که روزی کوروش بر آن فرمان می‌راند، برخاست و شکوه باستانی را بازگرداند. نامش اردشیر بود، و سلسلهٔ ساسانی را بنیان نهاد؛ واپسین و یکی از بزرگ‌ترین امپراتوری‌های ایران پیش از اسلام.' },
          { t: 'splitimg', key: 'sasanian-ardashir', title: 'Ardashir I', titleFa: 'اردشیر بابکان', x: 'Ardashir overthrew the Parthians and founded a new empire that consciously looked back to the Achaemenids of Cyrus and Darius, seeking to restore the true glory of Persia.', fa: 'اردشیر اشکانیان را برانداخت و امپراتوری تازه‌ای بنیان نهاد که آگاهانه رو به هخامنشیانِ کوروش و داریوش داشت، و می‌خواست شکوه راستین ایران را بازگرداند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A conscious return to greatness', fa: 'بازگشتی آگاهانه به بزرگی' },
          { t: 'p', x: 'The Sasanians saw themselves as the true heirs of the ancient Persian kings. They revived the old titles, the old glory, and the old faith, and set out to build an empire worthy of the Achaemenid name. Under them, Persia was reborn as a great power of the world.', fa: 'ساسانیان خود را وارثان راستین شاهان باستانی ایران می‌دانستند. لقب‌های کهن، شکوه کهن و آیین کهن را زنده کردند و بر آن شدند امپراتوری‌ای بسازند که درخور نام هخامنشی باشد. زیر فرمان آنان، ایران دوباره چون قدرتی بزرگ در جهان زاده شد.' },
          { t: 'markline', x: 'After five centuries, the true glory of Persia rose again.', fa: 'پس از پنج قرن، شکوه راستین ایران دوباره برخاست.' },
          { t: 'p', x: 'For more than four hundred years the Sasanians would rule a vast and brilliant empire, stretching across the Iranian plateau and beyond, a civilization of magnificent cities, learning, and art that shaped the world far beyond its borders.', fa: 'ساسانیان بیش از چهارصد سال بر امپراتوری‌ای پهناور و درخشان فرمان راندند که سراسر فلات ایران و فراتر از آن را در بر می‌گرفت؛ تمدنی از شهرهای باشکوه و دانش و هنر، که جهان را بسی فراتر از مرزهای خود شکل داد.' },
        ] },
      ],
    },
    {
      key: 'ss2',
      title: 'The Faith of the Sacred Fire', titleFa: 'آیین آتش مقدس',
      subtitle: 'The soul of Sasanian Iran', titleFa: 'جان ایران ساسانی',
      pages: [
        { blocks: [
          { t: 'p', x: 'At the very heart of the Sasanian world lay a faith of great antiquity and beauty: Zoroastrianism, the religion of the prophet Zarathustra, which the Persians had followed for more than a thousand years. Under the Sasanians it became the official faith of the empire, woven into the state itself.', fa: 'در دل جهان ساسانی آیینی نشسته بود کهن و زیبا: دین زرتشتی، آیین زرتشت پیامبر، که ایرانیان بیش از هزار سال آن را پیروی کرده بودند. زیر فرمان ساسانیان به آیین رسمی امپراتوری بدل شد و در تار و پود خود دولت بافته شد.' },
          { t: 'p', x: 'It is one of the oldest revealed religions in the world, and among the most influential. It taught of a single supreme God, Ahura Mazda, the Wise Lord, and of the eternal struggle between truth and light on one side, and falsehood and darkness on the other, a struggle in which every person must choose their part.', fa: 'این آیین از کهن‌ترین دین‌های وحیانی جهان است و از اثرگذارترین‌ها. از خدایی یگانه و برتر سخن می‌گفت، اهورامزدا، خداوند دانا، و از نبردی جاودانه میان راستی و روشنایی از یک سو، و دروغ و تاریکی از سوی دیگر؛ نبردی که هر کس باید در آن سهم خود را برگزیند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Good thoughts, good words, good deeds', fa: 'پندار نیک، گفتار نیک، کردار نیک' },
          { t: 'p', x: 'At the core of the faith was a simple and beautiful ideal, that a good life is built on three things: good thoughts, good words, and good deeds. Fire, as the symbol of divine light and purity, was honored in great fire temples that burned across the land, tended by priests and never allowed to go out.', fa: 'در دل این آیین آرمانی ساده و زیبا نشسته بود: زندگی نیک بر سه چیز بنا می‌شود، پندار نیک، گفتار نیک و کردار نیک. آتش، چون نماد روشنایی و پاکی ایزدی، در آتشکده‌های بزرگی گرامی داشته می‌شد که سراسر این سرزمین فروزان بودند؛ موبدان نگاهبانشان بودند و هرگز نمی‌گذاشتند خاموش شوند.' },
          { t: 'markline', x: 'Good thoughts, good words, good deeds.', fa: 'پندار نیک، گفتار نیک، کردار نیک.' },
          { t: 'splitimg', key: 'sasanian-fire-temple', title: 'The sacred fire', titleFa: 'آتش مقدس', x: 'Great fire temples burned across the empire, their flames a symbol of the divine light. Some, it was said, had burned without pause for centuries.', fa: 'آتشکده‌های بزرگ سراسر امپراتوری فروزان بودند و شعله‌هایشان نماد روشنایی ایزدی بود. می‌گفتند برخی از آنها قرن‌ها بی‌آنکه لحظه‌ای خاموش شوند سوخته‌اند.' },
        ] },
        { blocks: [
          { t: 'p', x: 'The influence of this ancient faith reached far beyond Iran. Its ideas of a single God, of heaven and hell, of angels, of a final judgment, and of a savior to come, are believed by many scholars to have shaped the great religions that followed. The spiritual legacy of Zoroastrian Persia lives on in the faith of much of the world to this day.', fa: 'اثر این آیین کهن بسی فراتر از ایران رفت. بسیاری از پژوهشگران بر این باورند که اندیشه‌های آن دربارهٔ خدای یگانه، بهشت و دوزخ، فرشتگان، داوری واپسین و منجی‌ای که خواهد آمد، دین‌های بزرگ پس از خود را شکل داده است. میراث معنوی ایرانِ زرتشتی تا امروز در باور بخش بزرگی از جهان زنده است.' },
          { t: 'call', title: 'A faith worthy of its own telling', titleFa: 'آیینی که روایت خودش را می‌طلبد', x: 'Zoroastrianism is one of the great treasures of Iranian heritage, and its full story, its prophet, its scripture, and its enduring influence, deserves a telling all its own, which it will one day have.', fa: 'آیین زرتشتی از گنجینه‌های بزرگ میراث ایرانی است، و روایت کامل آن، پیامبرش، کتابش و اثر ماندگارش، شایستهٔ حکایتی است از آنِ خود؛ حکایتی که روزی خواهد داشت.' },
        ] },
      ],
    },
    {
      key: 'ss3',
      title: 'The Rival of Rome', titleFa: 'هماورد روم',
      subtitle: '3rd - 6th century',
      pages: [
        { blocks: [
          { t: 'p', x: 'For over four hundred years, the Sasanian Empire stood as the great rival of Rome, and later of its successor, the Byzantine Empire. These were the two superpowers of the ancient world, and between them stretched a frontier contested in war after war across the centuries.', fa: 'بیش از چهارصد سال، امپراتوری ساسانی هماورد بزرگ روم بود و سپس هماورد جانشینش، امپراتوری بیزانس. این دو ابرقدرت جهان باستان بودند، و میانشان مرزی کشیده شده بود که قرن‌ها جنگ پس از جنگ بر سرش درگرفت.' },
          { t: 'p', x: 'It was a rivalry of equals, and Persia gave as good as it got. In one of the most famous moments of the age, the Sasanian king Shapur the Great defeated and captured the Roman emperor Valerian himself, an almost unthinkable humiliation for Rome, and a triumph carved in stone in the cliffs of Iran, where it can still be seen today.', fa: 'این رقابت میان دو هماورد برابر بود، و ایران هر ضربه را با ضربه‌ای پاسخ داد. در یکی از نامدارترین لحظه‌های آن روزگار، شاپور بزرگ، شاه ساسانی، والرین امپراتور روم را شکست داد و به اسارت گرفت؛ خواری‌ای که برای روم تقریباً باورنکردنی بود، و پیروزی‌ای که بر صخره‌های ایران کنده شد و تا امروز می‌توان دیدش.' },
        ] },
        { blocks: [
          { t: 'splitimg', key: 'sasanian-shapur', title: 'Shapur I', titleFa: 'شاپور یکم', x: 'Shapur the Great defeated three Roman emperors and captured one, Valerian, in battle. His victories are carved into the rock reliefs of Persia, where they endure to this day.', fa: 'شاپور بزرگ سه امپراتور روم را شکست داد و یکی از آنان، والرین، را در نبرد به اسارت گرفت. پیروزی‌هایش بر نقش‌برجسته‌های سنگی ایران کنده شده و تا امروز بر جا مانده است.' },
          { t: 'numstat', items: [
            { n: '3', label: 'Roman emperors defeated by Shapur I', labelFa: 'امپراتور رومی که شاپور یکم شکست داد' },
            { n: '260 CE', nFa: '۲۶۰ م', label: 'The Roman emperor Valerian captured', labelFa: 'اسارت والرین، امپراتور روم' },
            { n: '400+', label: 'Years as a great world power', labelFa: 'سال در جایگاه یک قدرت بزرگ جهانی' },
            { n: 'Rome', nFa: 'روم', label: 'Its equal and rival for centuries', labelFa: 'هماورد و رقیبش در طول قرن‌ها' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A golden age of civilization', fa: 'عصر طلایی یک تمدن' },
          { t: 'p', x: 'The Sasanian centuries were a golden age of Persian civilization. Their capital, Ctesiphon, was one of the greatest cities in the world, home to the mighty arch of Taq Kasra, the largest brick vault ever built, which still stands after seventeen hundred years.', fa: 'قرن‌های ساسانی عصر طلایی تمدن ایرانی بودند. پایتختشان تیسفون یکی از بزرگ‌ترین شهرهای جهان بود، خانهٔ طاق کسری، آن طاق سترگ که بزرگ‌ترین طاق آجری ساخته‌شدهٔ تاریخ است و پس از هزار و هفتصد سال هنوز ایستاده.' },
          { t: 'p', x: 'They were patrons of learning who welcomed scholars from across the world, gathered and translated the knowledge of Greece, India, and beyond, and advanced medicine, astronomy, and philosophy. Persian art, music, silverwork, and textiles of this age were treasured from Rome to China. It was one of the summits of the ancient world.', fa: 'حامیان دانش بودند؛ دانشمندان را از سراسر جهان پذیرا شدند، دانش یونان و هند و فراتر از آن را گرد آوردند و ترجمه کردند، و پزشکی و ستاره‌شناسی و فلسفه را پیش بردند. هنر و موسیقی و زرگری و پارچه‌بافی ایرانی این روزگار، از روم تا چین گران‌بها شمرده می‌شد. این یکی از قله‌های جهان باستان بود.' },
          { t: 'markline', x: 'From Rome to China, the world knew the splendour of Sasanian Persia.', fa: 'از روم تا چین، جهان شکوه ایران ساسانی را می‌شناخت.' },
        ] },
      ],
    },
    {
      key: 'ss4',
      title: 'The Last Glory and the Long War', titleFa: 'واپسین شکوه و جنگ دراز',
      subtitle: '531 - 628 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'The empire reached its final height under the great king Khosrow the First, remembered as Anushirvan, the Immortal Soul, a byword for justice and wisdom for centuries after. Under him the empire was reformed, learning flourished, and Persia stood at the very peak of its power and prestige.', fa: 'امپراتوری در روزگار خسرو یکم به واپسین اوج خود رسید؛ همان که او را انوشیروان خواندند، یعنی دارای روان جاودان، و قرن‌ها پس از آن نامش مترادف داد و خرد ماند. زیر فرمان او امپراتوری اصلاح شد، دانش بالید، و ایران در بلندترین نقطهٔ قدرت و اعتبار خود ایستاد.' },
          { t: 'splitimg', key: 'sasanian-khosrow', title: 'Khosrow Anushirvan', titleFa: 'خسرو انوشیروان', x: 'Khosrow the First was remembered across the East as the model of the just and wise king. Under him, Sasanian Persia reached its golden height.', fa: 'خسرو یکم را در سراسر شرق نمونهٔ شاه دادگر و خردمند می‌دانستند. در روزگار او، ایران ساسانی به اوج طلایی خود رسید.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The war that exhausted two empires', fa: 'جنگی که دو امپراتوری را از پا انداخت' },
          { t: 'p', x: 'But the long rivalry with the Romans was to prove fatal to both. In the early seventh century, the Sasanians under Khosrow the Second launched a vast war against the Byzantine Empire, and at first they triumphed spectacularly, conquering Egypt, Syria, and the Holy Land, and reaching the very walls of Constantinople.', fa: 'اما رقابت دراز با رومیان سرانجام برای هر دو کشنده از آب درآمد. در آغاز سدهٔ هفتم، ساسانیان به فرمان خسرو پرویز جنگی بزرگ با امپراتوری بیزانس به راه انداختند، و نخست پیروزی‌هایی چشمگیر به دست آوردند: مصر و شام و سرزمین مقدس را گرفتند و تا خودِ دیوارهای قسطنطنیه پیش رفتند.' },
          { t: 'ribbon', items: [
            { year: '602', label: 'The last great war with Byzantium begins', labelFa: 'واپسین جنگ بزرگ با بیزانس آغاز می‌شود' },
            { year: '614', label: 'Persia conquers Jerusalem and the Holy Land', labelFa: 'ایران اورشلیم و سرزمین مقدس را می‌گیرد' },
            { year: '626', label: 'The Sasanian army reaches Constantinople', labelFa: 'سپاه ساسانی به قسطنطنیه می‌رسد' },
            { year: '628', label: 'The war collapses; both empires lie exhausted', labelFa: 'جنگ فرو می‌پاشد؛ هر دو امپراتوری از پا افتاده‌اند' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'Then the tide turned. The Byzantine emperor struck back and carried the war deep into the heart of Persia. When at last the fighting ended, after twenty six years, both great empires were utterly exhausted, their treasuries empty, their armies bled white, their people weary of endless war.', fa: 'سپس ورق برگشت. امپراتور بیزانس پاسخ داد و جنگ را تا دل ایران پیش برد. وقتی سرانجام پس از بیست و شش سال نبرد به پایان رسید، هر دو امپراتوری بزرگ یکسره از پا افتاده بودند: خزانه‌ها تهی، سپاه‌ها خون‌باخته، و مردم از جنگ بی‌پایان خسته.' },
          { t: 'markline', x: 'The two great powers of the world had fought each other to the point of ruin.', fa: 'دو قدرت بزرگ جهان چندان با هم جنگیدند تا هر دو به ویرانی رسیدند.' },
          { t: 'p', x: 'Neither empire knew it, but a new power was rising in the deserts of Arabia to the south, one that would sweep away the exhausted old order and change the world forever.', fa: 'هیچ‌یک از دو امپراتوری نمی‌دانست، اما در بیابان‌های عربستان در جنوب، قدرتی تازه سر برمی‌آورد؛ قدرتی که نظم کهنه و فرسوده را از میان برمی‌داشت و جهان را برای همیشه دگرگون می‌کرد.' },
        ] },
      ],
    },
    {
      key: 'ss5',
      title: 'The Coming of Islam', titleFa: 'آمدن اسلام',
      subtitle: '633 - 651 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the deserts of Arabia, a new faith had been born. Islam had united the Arab tribes as never before, and filled them with a burning purpose. In the 630s, the armies of the young Muslim state burst out of Arabia, and they turned toward the two exhausted empires to the north.', fa: 'در بیابان‌های عربستان آیینی تازه زاده شده بود. اسلام قبایل عرب را چنان یکپارچه کرد که پیش‌تر هرگز نشده بودند، و آنان را از هدفی سوزان آکند. در دههٔ ۶۳۰ میلادی، سپاهیان دولت جوان مسلمان از عربستان بیرون زدند و رو به دو امپراتوری خسته در شمال آوردند.' },
          { t: 'p', x: 'The Sasanian Empire, drained by its long war with Byzantium and weakened by years of turmoil at its court, was not the power it had been. Yet few could have imagined how swiftly the ancient empire would fall.', fa: 'امپراتوری ساسانی که جنگ دراز با بیزانس تهی‌اش کرده بود و سال‌ها آشوب در دربار ناتوانش، دیگر آن قدرت پیشین نبود. با این همه، کمتر کسی می‌توانست تصور کند این امپراتوری کهن با چه شتابی فرو خواهد ریخت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The battle that decided an empire', fa: 'نبردی که سرنوشت یک امپراتوری را رقم زد' },
          { t: 'p', x: 'The decisive blow came at the battle of Qadisiyyah, around the year 636, where the main Sasanian army met the Arab forces. After days of hard fighting, the Persian army was broken. The road to the capital lay open, and the great city of Ctesiphon fell to the conquerors.', fa: 'ضربهٔ سرنوشت‌ساز در نبرد قادسیه فرود آمد، حدود سال ۶۳۶ میلادی، آنجا که سپاه اصلی ساسانی با نیروهای عرب روبه‌رو شد. پس از روزها نبرد سخت، سپاه ایران شکست. راه پایتخت باز شد، و شهر بزرگ تیسفون به دست فاتحان افتاد.' },
          { t: 'numstat', items: [
            { n: '636', label: 'The battle of Qadisiyyah breaks the Persian army', labelFa: 'نبرد قادسیه سپاه ایران را در هم می‌شکند' },
            { n: '637', label: 'The capital, Ctesiphon, falls', labelFa: 'پایتخت، تیسفون، فرو می‌افتد' },
            { n: '642', label: 'The battle of Nahavand, the final defeat', labelFa: 'نبرد نهاوند، شکست نهایی' },
            { n: '651', label: 'The last Sasanian king dies; the empire ends', labelFa: 'واپسین شهریار ساسانی می‌میرد؛ امپراتوری به پایان می‌رسد' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The end of an age', fa: 'پایان یک دوران' },
          { t: 'p', x: 'The last Sasanian king, Yazdegerd the Third, fled eastward across his crumbling empire, seeking in vain to raise an army to turn back the tide. He was pursued from city to city, and in 651, abandoned and alone, he was killed near the far eastern city of Merv. With his death, four centuries of Sasanian rule, and more than a thousand years of the Persian Zoroastrian empire, came to an end.', fa: 'واپسین شهریار ساسانی، یزدگرد سوم، از میان امپراتوری فروریزنده‌اش رو به شرق گریخت و بیهوده کوشید سپاهی گرد آورد تا این موج را بازگرداند. شهر به شهر تعقیبش کردند، و در سال ۶۵۱، رهاشده و تنها، در نزدیکی مرو در شرق دوردست کشته شد. با مرگ او، چهار قرن فرمانروایی ساسانی و بیش از هزار سال امپراتوری زرتشتی ایران به پایان رسید.' },
          { t: 'markline', x: 'An empire that had rivalled Rome for four hundred years had fallen in a single generation.', fa: 'امپراتوری‌ای که چهارصد سال هماورد روم بود، در فاصلهٔ یک نسل فرو ریخت.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'The conquest changed Iran forever. Over the generations that followed, Islam gradually became the faith of the Iranian people, and the sacred fires of Zoroastrianism, which had burned for over a thousand years, slowly dimmed. The old faith did not vanish, and its communities endure to this day, but it was no longer the soul of the state.', fa: 'این فتح ایران را برای همیشه دگرگون کرد. در نسل‌های پس از آن، اسلام رفته‌رفته آیین مردم ایران شد، و آتش‌های مقدس زرتشتی که بیش از هزار سال فروزان بودند به‌آرامی کم‌فروغ شدند. آیین کهن از میان نرفت و جامعه‌هایش تا امروز مانده‌اند، اما دیگر جانِ دولت نبود.' },
          { t: 'p', x: 'What followed was a long and difficult age, sometimes called the two centuries of silence, when the Persian language and the Persian voice seemed to grow quiet under the new order. Yet Iran did not disappear. Its language, its poetry, its memory, and its spirit endured beneath the surface, and in time they would rise again, transformed, to shape a new and lasting Iranian civilization.', fa: 'آنچه پس از آن آمد روزگاری بود دراز و دشوار که گاه آن را دو قرن سکوت خوانده‌اند؛ روزگاری که زبان فارسی و صدای ایرانی زیر نظم تازه خاموش می‌نمود. با این همه، ایران ناپدید نشد. زبانش، شعرش، خاطره‌اش و روحش زیر سطح دوام آوردند، و به وقت خود دوباره برخاستند، دگرگون‌شده، تا تمدنی تازه و ماندگار بسازند.' },
          { t: 'pull', x: 'The empire fell, but the soul of Iran endured, and would one day speak again.', fa: 'امپراتوری فرو ریخت، اما جان ایران ماند، و روزی دوباره به سخن آمد.' },
        ] },
      ],
    },
  ],
};

const silence: Topic = {
  key: 'two-centuries-silence',
  category: 'history',
  name: 'Two Centuries of Silence',
  persian: 'دو قرن سکوت',
  years: '651 - 900 CE',
  essence: 'The long, quiet age after the fall of Persia, when a conquered people held fast to their soul, until a poet gave them back their voice.',
  essenceFa: 'روزگار دراز و خاموشی که پس از فروپاشی ایران فرا رسید؛ آنگاه که مردمی شکست‌خورده جان خود را نگاه داشتند، تا شاعری صدایشان را به آنان بازگرداند.',
  cover: 'silence-cover',
  closing: 'silence-ferdowsi',
  status: 'ready',
  sources: [
    'Abdolhossein Zarrinkoub, Two Centuries of Silence',
    'The Shahnameh of Ferdowsi',
    'The historical record of early Islamic Iran',
  ],
  chapters: [
    {
      key: 'tc1',
      title: 'The Silence Falls', titleFa: 'سکوت فرود می‌آید',
      subtitle: 'After the fall', titleFa: 'پس از فروپاشی',
      pages: [
        { blocks: [
          { t: 'p', x: 'When the last Sasanian king fell and the ancient empire came to its end, a strange and heavy quiet settled over the land of Iran. The throne of Cyrus was gone. The sacred fires that had burned for a thousand years grew dim. A proud and ancient nation found itself, for the first time in its long memory, conquered and ruled by others.', fa: 'چون واپسین شهریار ساسانی فرو افتاد و امپراتوری کهن به پایان رسید، خاموشی‌ای غریب و سنگین بر سرزمین ایران نشست. تخت کوروش دیگر نبود. آتش‌های مقدسی که هزار سال فروزان بودند رو به خاموشی گذاشتند. ملتی سربلند و باستانی، برای نخستین بار در حافظهٔ بلند خویش، خود را مغلوب و زیر فرمان دیگران یافت.' },
          { t: 'p', x: 'The historian who gave this age its name called it the two centuries of silence. It was not that nothing happened, for much did. It was that the voice of Iran itself, its language in the halls of power, its kings, its own telling of its own story, seemed to fall quiet, muffled beneath the weight of conquest.', fa: 'تاریخ‌نگاری که نام این روزگار را برگزید، آن را دو قرن سکوت خواند. نه آنکه چیزی روی نداده باشد؛ بسیار چیزها روی داد. سخن بر سر آن بود که صدای خودِ ایران خاموش شده بود: زبانش در دستگاه قدرت، شاهانش، و روایتی که خود از خویش داشت، همه زیر بار فتح فرو نشسته بودند.' },
          { t: 'markline', x: 'A nation that had spoken to the world for a thousand years fell suddenly quiet.', fa: 'ملتی که هزار سال با جهان سخن گفته بود، ناگهان خاموش شد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A world turned over', fa: 'جهانی که زیر و رو شد' },
          { t: 'p', x: 'The change reached into every corner of life. Arabic became the language of government, of learning, and of the new faith. For a Persian of noble memory, it was a hard and disorienting age, to see the ways of a thousand years set aside, and the language of the conquerors rise in their place.', fa: 'دگرگونی به هر گوشه‌ای از زندگی رسید. عربی زبان دیوان شد، زبان دانش، و زبان آیین تازه. برای ایرانی‌ای که یاد گذشته را در سینه داشت، روزگاری بود سخت و گیج‌کننده: می‌دید که راه و رسم هزار ساله را کنار می‌نهند و زبان فاتحان به جای آن بالا می‌آید.' },
          { t: 'p', x: 'Many converted to the new faith, some by conviction, some by the slow pressure of the centuries, some to escape the heavier taxes laid upon those who did not. The Iran of the fire temples faded, and a new, Islamic Iran slowly took its place. It was, for those who lived through it, the passing of an entire world.', fa: 'بسیاری به آیین نو گرویدند؛ گروهی از سر باور، گروهی زیر فشار آرام قرن‌ها، و گروهی برای گریز از مالیات سنگین‌تری که بر دوش ناگرویدگان بود. ایرانِ آتشکده‌ها رنگ باخت و ایرانی تازه و اسلامی به‌آهستگی جای آن را گرفت. برای کسانی که آن روزگار را زیستند، این رفتنِ یک جهانِ تمام بود.' },
        ] },
      ],
    },
    {
      key: 'tc2',
      title: 'The Soul That Would Not Die', titleFa: 'جانی که نمرد',
      subtitle: 'The quiet endurance', titleFa: 'پایداری خاموش',
      pages: [
        { blocks: [
          { t: 'p', x: 'And yet, beneath the silence, something refused to die. A conquered people may lose its throne and even its faith, and still keep its soul. And the soul of Iran, its language, its memory, its sense of who it was, endured stubbornly in the homes and the hearts of ordinary people, passed quietly from parent to child.', fa: 'با این همه، زیر آن خاموشی، چیزی از مردن سر باز زد. مردمی شکست‌خورده ممکن است تخت خود را از دست بدهند و حتی آیین خود را، و باز جان خویش را نگاه دارند. و جان ایران، یعنی زبانش، خاطره‌اش، و آن دریافتی که از خود داشت، سرسختانه در خانه‌ها و در دل مردم عادی ماند و بی‌صدا از پدر و مادر به فرزند رسید.' },
          { t: 'markline', x: 'They took our throne, but they could not take our language, nor our memory.', fa: 'تخت ما را گرفتند، اما زبان ما را نتوانستند بگیرند، و خاطرهٔ ما را نیز.' },
          { t: 'p', x: 'In the villages and the mountains, in the lullabies of mothers and the tales of grandfathers, the Persian language lived on. The old stories of the kings and heroes of Iran, of Jamshid and Fereydun and Rostam, were still told around the fires at night. The memory of a glorious past was kept alive, a quiet ember waiting for the wind that would make it blaze again.', fa: 'در دهکده‌ها و کوهستان‌ها، در لالایی مادران و قصهٔ پدربزرگ‌ها، زبان فارسی زنده ماند. داستان‌های کهن شاهان و پهلوانان ایران، از جمشید و فریدون و رستم، هنوز شب‌ها بر گرد آتش گفته می‌شد. یاد گذشته‌ای پرشکوه زنده نگاه داشته شد؛ اخگری خاموش، در انتظار بادی که دوباره شعله‌ورش کند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The stirrings of revival', fa: 'نخستین جنبش‌های بیداری' },
          { t: 'p', x: 'Slowly, over the generations, Iran began to stir. The Persian genius, far from being extinguished, poured itself into the new civilization and helped to build its golden age, its scholars, its poets, its statesmen shaping the culture of the whole Islamic world. Iran was not erased. It was transformed, and it transformed everything it touched.', fa: 'به‌آرامی و در گذر نسل‌ها، ایران جنبیدن گرفت. نبوغ ایرانی نه‌تنها خاموش نشده بود، که خود را در تمدن تازه ریخت و در ساختن عصر طلایی آن سهم گرفت؛ دانشمندان، شاعران و دیوانیانش فرهنگ سراسر جهان اسلام را شکل دادند. ایران محو نشد. دگرگون شد، و هر چه را که لمس کرد دگرگون ساخت.' },
          { t: 'p', x: 'And in the east, in the lands of Khorasan far from the seat of the conquerors, Persian princes began to rule again, and to gather at their courts the poets and scholars who spoke the old tongue. The Samanids and others gave shelter to the Persian language and the Persian spirit, and a great revival began to gather its strength. The silence was ending.', fa: 'و در شرق، در سرزمین خراسان و دور از مرکز فاتحان، شاهزادگان ایرانی دوباره به فرمانروایی رسیدند و شاعران و دانشمندانی را که به زبان کهن سخن می‌گفتند در دربار خود گرد آوردند. سامانیان و دیگران زبان فارسی و روح ایرانی را پناه دادند، و رستاخیزی بزرگ کم‌کم نیرو گرفت. سکوت داشت به پایان می‌رسید.' },
          { t: 'ribbon', items: [
            { year: '651', label: 'The fall of the Sasanians; the silence begins', labelFa: 'فروپاشی ساسانیان؛ سکوت آغاز می‌شود' },
            { year: '750', label: 'A new age dawns; Persian influence rises again', labelFa: 'روزگاری تازه سر می‌رسد؛ نفوذ ایرانی دوباره بالا می‌گیرد' },
            { year: '820', label: 'Persian dynasties rule once more in the east', labelFa: 'سلسله‌های ایرانی دوباره در شرق فرمان می‌رانند' },
            { year: '900', label: 'The Persian language and spirit begin to bloom anew', labelFa: 'زبان و روح ایرانی از نو شکفتن می‌گیرد' },
          ] },
        ] },
      ],
    },
    {
      key: 'tc3',
      title: 'The Poet Who Saved a Language', titleFa: 'شاعری که زبانی را نجات داد',
      subtitle: 'Ferdowsi, c. 977 - 1010', titleFa: 'فردوسی، حدود ۹۷۷ تا ۱۰۱۰',
      pages: [
        { blocks: [
          { t: 'p', x: 'Every people needs a voice to speak its soul, and Iran found hers in one of the greatest poets who ever lived. In the eastern city of Tus, a nobleman set himself a task that would consume more than thirty years of his life, and that would give Iran back its very self.', fa: 'هر ملتی صدایی می‌خواهد تا جانش را بر زبان آورد، و ایران صدای خود را در یکی از بزرگ‌ترین شاعران تاریخ یافت. در شهر توس، در شرق ایران، مردی از خاندان دهقانان کاری را بر دوش گرفت که بیش از سی سال از عمرش را برد، و ایران را به خودش بازگرداند.' },
          { t: 'ptext', x: 'His name was {{ferdowsi|Ferdowsi}}, and his task was to gather all the ancient stories of Iran, its myths, its legends, its kings and heroes from the dawn of time to the fall of the Sasanians, and to set them down in Persian verse, in a single great epic. He called it the Shahnameh, the Book of Kings.', fa: 'نامش {{ferdowsi|فردوسی}} بود، و کاری که بر دوش گرفت این بود: همهٔ داستان‌های کهن ایران را گرد آورد، اسطوره‌ها و افسانه‌ها و شاهان و پهلوانان را، از آغاز زمان تا فروپاشی ساسانیان، و همه را در یک حماسهٔ بزرگ به شعر فارسی درآورد. آن را شاهنامه نامید، نامهٔ شاهان.' },
          { t: 'splitimg', key: 'silence-ferdowsi', title: 'Ferdowsi of Tus', titleFa: 'فردوسیِ توس', x: 'For over thirty years Ferdowsi labored on the Shahnameh, giving his life to preserve the stories, and the language, of his people.', fa: 'فردوسی بیش از سی سال بر شاهنامه رنج برد و عمر خود را داد تا داستان‌ها، و زبان، مردمش را نگاه دارد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A book to hold a nation', fa: 'کتابی که ملتی را در خود نگاه داشت' },
          { t: 'p', x: 'The Shahnameh is one of the longest and greatest epic poems ever composed by a single hand, nearly sixty thousand verses, a whole world of kings and warriors, love and war, tragedy and glory. But it was far more than a collection of stories. It was an act of preservation, and of defiance.', fa: 'شاهنامه از بلندترین و بزرگ‌ترین حماسه‌هایی است که به دست یک تن سروده شده؛ نزدیک شصت هزار بیت، جهانی تمام از شاهان و پهلوانان، از عشق و جنگ، از سوگ و شکوه. اما این کتاب بسی بیش از مجموعه‌ای از داستان‌ها بود. کاری بود از جنس نگاهبانی، و از جنس ایستادگی.' },
          { t: 'p', x: 'For Ferdowsi wrote it in pure Persian, reaching for the old words and turning away from the Arabic that had flooded the language, determined to prove that Persian could carry the whole weight of a nation\'s memory and glory. In giving Iran its epic, he gave it back its language, whole and alive.', fa: 'زیرا فردوسی آن را به فارسی سره سرود؛ واژه‌های کهن را جست و از عربی‌ای که زبان را فرا گرفته بود روی گرداند، و بر آن بود تا نشان دهد فارسی می‌تواند تمام بار خاطره و شکوه یک ملت را بر دوش بکشد. او با بخشیدن حماسه به ایران، زبانش را نیز به او بازگرداند؛ درست و زنده.' },
          { t: 'numstat', items: [
            { n: '30+', label: 'Years of his life given to the work', labelFa: 'سال از عمرش که پای این کار گذاشت' },
            { n: '~60,000', label: 'Verses in the Shahnameh', labelFa: 'بیت در شاهنامه' },
            { n: '1,000+', label: 'Years it has been loved, unbroken', labelFa: 'سال که بی‌وقفه دوستش داشته‌اند' },
            { n: 'One', label: 'Book that saved a language', labelFa: 'کتابی که زبانی را نجات داد' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'There is a line, long attributed to him, that captures all he did and all he hoped. Having labored so long, he looked upon his finished work and understood what he had built, a monument no conqueror could throw down.', fa: 'بیتی هست که دیرزمانی به او نسبت داده‌اند و همهٔ آنچه کرد و همهٔ آنچه امید داشت در آن گرد آمده است. پس از آن‌همه رنج، به کار به‌پایان‌رسیدهٔ خویش نگریست و دریافت چه برافراشته است: بنایی که هیچ فاتحی توان فرو ریختنش را ندارد.' },
          { t: 'quotebig', x: 'I have suffered greatly these thirty years, but I have revived the Persians with this Persian tongue.', fa: 'بسی رنج بردم در این سال سی\u200Cعجم زنده کردم بدین پارسی', by: 'ATTRIBUTED TO FERDOWSI', byFa: 'منسوب به فردوسی' },
        ] },
      ],
    },
    {
      key: 'tc4',
      title: 'The Voice Returns', titleFa: 'صدا بازمی‌گردد',
      subtitle: 'The legacy', titleFa: 'میراث',
      pages: [
        { blocks: [
          { t: 'p', x: 'Ferdowsi died, it is said, without the reward he had been promised, and legend tells that the gift arrived at the gate of his city just as his funeral procession left it. But he had won a prize greater than gold. He had given his people back their voice, and it would never fall silent again.', fa: 'گفته‌اند فردوسی بی‌آنکه پاداش وعده‌داده‌شده را ببیند درگذشت، و افسانه می‌گوید که آن هدیه درست هنگامی به دروازهٔ شهرش رسید که تابوتش از آن بیرون می‌رفت. اما او جایزه‌ای بزرگ‌تر از زر به دست آورده بود: صدای مردمش را به آنان بازگردانده بود، و آن صدا دیگر هرگز خاموش نشد.' },
          { t: 'p', x: 'Because of the Shahnameh, the Persian language survived, flourished, and became one of the great literary tongues of the world. The poets who came after, Rumi, Hafez, Saadi, Khayyam, all wrote in the language that Ferdowsi had saved. Every Persian word of beauty spoken in the thousand years since owes something to the poet of Tus.', fa: 'به برکت شاهنامه، زبان فارسی ماند، بالید، و به یکی از زبان‌های بزرگ ادبی جهان بدل شد. شاعرانی که پس از او آمدند، مولانا و حافظ و سعدی و خیام، همه به زبانی سرودند که فردوسی نگاهش داشته بود. هر واژهٔ زیبای فارسی که در هزار سال گذشته بر زبان آمده، وامدار حکیم توس است.' },
          { t: 'markline', x: 'The two centuries of silence ended, and Iran has never stopped speaking since.', fa: 'دو قرن سکوت به پایان رسید، و ایران از آن پس هرگز از سخن گفتن باز نایستاد.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the two centuries of silence, and of its ending. It is, in truth, one of the most moving stories in all of Iran\'s long history, the story of a people who lost everything but their soul, who held that soul in secret through the long dark, and who found in a single devoted poet the voice to speak it aloud once more.', fa: 'این نگاهی بود کوتاه به دو قرن سکوت و به پایان آن. به‌راستی یکی از تکان‌دهنده‌ترین داستان‌های تاریخ بلند ایران است: داستان مردمی که همه‌چیز جز جان خود را از دست دادند، آن جان را در تاریکی دراز پنهانی نگاه داشتند، و سرانجام در یک شاعر یگانه صدایی یافتند تا دوباره آن را بلند بر زبان آورد.' },
          { t: 'p', x: 'Iran did not survive the conquest by resisting change, but by absorbing it, transforming it, and remaining, through it all, unmistakably itself. The silence was real, and it was long. But it was not the end. It was the deep breath before the nation spoke again, and what it said next would be beautiful beyond measure.', fa: 'ایران از این فتح جان به در نبرد از آن رو که در برابر دگرگونی ایستاد، بلکه از آن رو که آن را در خود گرفت، دگرگونش کرد، و در تمام این مسیر آشکارا خودش ماند. آن سکوت واقعی بود و دراز. اما پایان نبود. نفسی عمیق بود پیش از آنکه این ملت دوباره لب بگشاید، و آنچه پس از آن گفت زیباتر از آن بود که به سنجش درآید.' },
          { t: 'pull', x: 'A people held their soul through the long silence, and a poet gave them back their voice.', fa: 'مردمی جان خود را در سکوتی دراز نگاه داشتند، و شاعری صدایشان را به آنان بازگرداند.' },
        ] },
      ],
    },
  ],
};

const parthian: Topic = {
  key: 'parthian-empire',
  category: 'history',
  name: 'The Parthian Empire',
  persian: 'اشکانیان',
  years: '247 BCE - 224 CE',
  essence: 'The empire of horsemen and archers that reclaimed Iran from Greek rule, held Rome at bay for centuries, and kept the Persian spirit alive between two golden ages.',
  essenceFa: 'امپراتوری سوارکاران و کمانداران؛ آنان که ایران را از چنگ فرمانروایی یونانی بیرون کشیدند، قرن‌ها روم را پشت مرز نگاه داشتند، و روح ایرانی را میان دو عصر طلایی زنده نگه داشتند.',
  cover: 'parthian-cover',
  closing: 'parthian-cover',
  status: 'ready',
  sources: [
    'Greek and Roman accounts of the age',
    'The historical record of the Parthian era',
    'The Shahnameh of Ferdowsi',
  ],
  chapters: [
    {
      key: 'pt1',
      title: 'Iran Under Foreign Kings', titleFa: 'ایران زیر فرمان شاهان بیگانه',
      subtitle: 'After Alexander', titleFa: 'پس از اسکندر',
      pages: [
        { blocks: [
          { t: 'p', x: 'When Alexander of Macedon defeated the last Achaemenid king, the empire that Cyrus had built passed into foreign hands. After Alexander\'s death his generals divided his conquests, and Iran fell to the Seleucids, a Greek dynasty who ruled the ancient land of Persia as outsiders.', fa: 'چون اسکندر مقدونی واپسین شاه هخامنشی را شکست داد، امپراتوری‌ای که کوروش ساخته بود به دست بیگانگان افتاد. پس از مرگ اسکندر، سردارانش سرزمین‌های فتح‌شده را میان خود بخش کردند و ایران به سلوکیان رسید؛ سلسله‌ای یونانی که بر سرزمین کهن پارس همچون غریبه فرمان می‌راند.' },
          { t: 'p', x: 'For a time, Greek kings sat where the Persian kings of kings had ruled. Greek became the language of the court, Greek cities rose across the plateau, and the proud heartland of Cyrus and Darius answered to masters from a distant western land.', fa: 'چندی، شاهان یونانی بر جایی نشستند که پیش‌تر شاهنشاهان ایران فرمان رانده بودند. یونانی زبان دربار شد، شهرهای یونانی بر فلات سر برآوردند، و دل سربلند سرزمین کوروش و داریوش به اربابانی از دیاری دور در غرب پاسخ می‌داد.' },
          { t: 'markline', x: 'The land of Cyrus, for the first time, obeyed foreign kings.', fa: 'سرزمین کوروش، برای نخستین بار، از شاهان بیگانه فرمان برد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A people from the steppe', fa: 'مردمی از دشت‌های شمال' },
          { t: 'p', x: 'But Iran would not stay in foreign hands. From the northeast, from the wide grasslands beyond the Caspian, came a people of hardy nomadic horsemen: the Parni, led by a chief named Arsaces. Around the middle of the third century BCE, they swept into the region of Parthia and threw off Greek rule.', fa: 'اما ایران در دست بیگانه نماند. از شمال شرق، از علفزارهای پهناور آن سوی خزر، مردمی آمدند از سوارکاران کوچ‌نشین و سرسخت: پَرنی‌ها، به سرکردگی مردی به نام اشک. حدود میانهٔ سدهٔ سوم پیش از میلاد به سرزمین پارت تاختند و یوغ یونانی را به کناری افکندند.' },
          { t: 'p', x: 'From that homeland the dynasty took its name, and Arsaces gave his to the line of kings who followed, the Arsacids. From these beginnings, a small rebellion on the edge of a Greek empire, would grow one of the great powers of the ancient world.', fa: 'سلسله نام خود را از همان سرزمین گرفت، و اشک نامش را به تبار شاهانی داد که پس از او آمدند: اشکانیان. از این آغاز کوچک، شورشی در حاشیهٔ یک امپراتوری یونانی، یکی از قدرت‌های بزرگ جهان باستان برخاست.' },
          { t: 'imgwide', key: 'parthian-arsaces', capFa: 'اشک یکم، سرکردهٔ پرنی‌ها، سلسله‌ای را بنیان نهاد که یونانیان را از ایران بیرون راند.', cap: 'Arsaces I, chief of the Parni, founded the dynasty that would drive the Greeks from Iran and rule for nearly five centuries.', capFa: 'ارشک یکم، سردار پارنی‌ها، سلسله‌ای را بنیان گذاشت که یونانیان را از ایران بیرون راند و نزدیک پنج قرن فرمان راند.' },
        ] },
      ],
    },
    {
      key: 'pt2',
      title: 'The Reconquest of a Homeland', titleFa: 'بازپس‌گیری یک سرزمین',
      subtitle: '2nd century BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'What began as a frontier revolt became, over the generations, the reconquest of an entire empire. The Parthian kings pushed steadily westward and southward, city by city and province by province, driving back the weakening Greek Seleucids and restoring Iranian rule over the ancient Persian lands.', fa: 'آنچه شورشی مرزی آغاز شد، در گذر نسل‌ها به بازپس‌گیری یک امپراتوری تمام بدل شد. شاهان اشکانی پیوسته به غرب و جنوب پیش رفتند، شهر به شهر و ولایت به ولایت، سلوکیانِ رو به ناتوانی را عقب راندند و فرمانروایی ایرانی را بر سرزمین‌های کهن پارس بازگرداندند.' },
          { t: 'p', x: 'The greatest of these early kings was Mithridates the First, who in the second century BCE transformed the Parthian realm from a kingdom into an empire, taking the rich lands of Mesopotamia and the title, once more, of a great Iranian king.', fa: 'بزرگ‌ترینِ این شاهان نخستین، مهرداد یکم بود که در سدهٔ دوم پیش از میلاد قلمرو اشکانی را از یک پادشاهی به یک امپراتوری بدل کرد؛ سرزمین‌های حاصلخیز میان‌رودان را گرفت و بار دیگر لقب شاه بزرگ ایران را از آن خود ساخت.' },
        ] },
        { blocks: [
          { t: 'ribbon', items: [
            { year: '247 BCE', yearFa: '۲۴۷ پ.م', label: 'Arsaces founds the Parthian state', labelFa: 'اشک دولت اشکانی را بنیان می‌نهد' },
            { year: '171 BCE', yearFa: '۱۷۱ پ.م', label: 'Mithridates I begins the great expansion', labelFa: 'مهرداد یکم گسترش بزرگ را آغاز می‌کند' },
            { year: '141 BCE', yearFa: '۱۴۱ پ.م', label: 'The Parthians take Mesopotamia and Babylon', labelFa: 'اشکانیان میان‌رودان و بابل را می‌گیرند' },
            { year: '1st c. BCE', yearFa: 'سدهٔ یکم پ.م', label: 'Parthia stands as a great world power', labelFa: 'اشکانیان در جایگاه یک قدرت بزرگ جهانی می‌ایستند' },
          ] },
          { t: 'p', x: 'Under the Parthians, Iran was Iranian once more. Though they had absorbed much from the Greek world, and long kept Greek styles at their court, they revived the old Iranian ways, honored the ancient faith, and cherished the memory of the Achaemenid past. The Persian spirit, which had bent under Greek rule, straightened again.', fa: 'زیر فرمان اشکانیان، ایران دوباره ایرانی شد. هرچند بسیاری از جهان یونانی را در خود گرفته بودند و دیرزمانی سبک یونانی را در دربار نگاه داشتند، آیین‌های کهن ایرانی را زنده کردند، دین باستانی را گرامی داشتند، و یاد روزگار هخامنشی را عزیز شمردند. روح ایرانی که زیر فرمانروایی یونانی خم شده بود، دوباره راست ایستاد.' },
          { t: 'markline', x: 'From horsemen of the steppe rose the empire that made Iran Iranian again.', fa: 'از سوارکاران دشت، امپراتوری‌ای برخاست که ایران را دوباره ایرانی کرد.' },
        ] },
      ],
    },
    {
      key: 'pt3',
      title: 'The Wall Against Rome', titleFa: 'دیوار در برابر روم',
      subtitle: '53 BCE onward',
      pages: [
        { blocks: [
          { t: 'p', x: 'As Parthia rose in the east, a new power was rising in the west: Rome, the greatest empire the Mediterranean world had ever known. The two great powers met at the river Euphrates, and there began one of the longest rivalries in ancient history, Rome and Parthia, west and east, for nearly three hundred years.', fa: 'همچنان که پارت در شرق بالا می‌آمد، در غرب قدرتی تازه سر برمی‌آورد: روم، بزرگ‌ترین امپراتوری‌ای که جهان مدیترانه به خود دیده بود. این دو قدرت بزرگ بر کرانهٔ فرات به هم رسیدند، و همان‌جا یکی از درازترین رقابت‌های تاریخ باستان آغاز شد؛ روم و اشکانیان، غرب و شرق، نزدیک سیصد سال.' },
          { t: 'p', x: 'Rome, used to conquering all before it, found in Parthia an equal it could not overcome. Again and again the legions marched east, and again and again the Parthians turned them back. The Euphrates became the wall against which Roman ambition broke.', fa: 'روم که به فتح هر چه پیش رویش بود عادت داشت، در اشکانیان هماوردی یافت که از پسش برنیامد. بارها لژیون‌ها به سوی شرق لشکر کشیدند و بارها اشکانیان بازشان گرداندند. فرات دیواری شد که جاه‌طلبی روم بر آن شکست.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The disaster at Carrhae', fa: 'فاجعهٔ حرّان' },
          { t: 'p', x: 'The most famous clash came in 53 BCE at Carrhae, where the Roman general Crassus, one of the richest and most powerful men in Rome, invaded with a mighty army. There the Parthians taught Rome a lesson it never forgot. Their horse archers rained arrows upon the legions, and their heavy armored cavalry shattered them. The Roman army was destroyed, and Crassus was killed.', fa: 'نامدارترین برخورد در سال ۵۳ پیش از میلاد در حرّان روی داد، آنجا که کراسوس، سردار رومی و یکی از ثروتمندترین و نیرومندترین مردان روم، با سپاهی بزرگ به ایران تاخت. اشکانیان همان‌جا درسی به روم دادند که هرگز از یادش نبرد. کمانداران سوارشان بر لژیون‌ها باران تیر باریدند و سواره‌نظام سنگین‌زرهشان آنان را در هم شکست. سپاه روم نابود شد و کراسوس کشته شد.' },
          { t: 'numstat', items: [
            { n: '53 BCE', nFa: '۵۳ پ.م', label: 'The battle of Carrhae', labelFa: 'نبرد حرّان' },
            { n: 'Crassus', nFa: 'کراسوس', label: 'The Roman commander slain', labelFa: 'سردار رومی که کشته شد' },
            { n: '~300', label: 'Years Parthia held Rome at bay', labelFa: 'سال که اشکانیان روم را پشت مرز نگاه داشتند' },
            { n: 'Euphrates', nFa: 'فرات', label: 'The frontier Rome could not cross', labelFa: 'مرزی که روم نتوانست از آن بگذرد' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The Parthian shot', fa: 'تیر پارتی' },
          { t: 'p', x: 'The Parthians were among the finest horsemen the world had ever seen, and they gave the world a phrase still used today. Their riders would feign retreat at a gallop, then twist backward in the saddle to loose a deadly arrow at the pursuing enemy. This maneuver, the Parthian shot, was so famous it entered the languages of Europe, a parting blow delivered in the very act of withdrawal.', fa: 'اشکانیان از بهترین سوارکارانی بودند که جهان به خود دیده است، و اصطلاحی به جهان دادند که تا امروز به کار می‌رود. سوارانشان به تاخت وانمود به عقب‌نشینی می‌کردند، سپس بر زین به عقب می‌چرخیدند و تیری کشنده به سوی دشمنِ در پی رها می‌کردند. این شگرد، که آن را تیر پارتی خواندند، چنان نامدار شد که به زبان‌های اروپایی راه یافت؛ ضربه‌ای که درست در لحظهٔ واپس رفتن فرود می‌آید.' },
          { t: 'markline', x: 'They mastered the art of striking hardest at the moment they seemed to flee.', fa: 'هنر آنان این بود که سخت‌ترین ضربه را درست هنگامی بزنند که به گریز می‌مانستند.' },
        ] },
      ],
    },
    {
      key: 'pt4',
      title: 'Crossroads of the World', titleFa: 'چهارراه جهان',
      subtitle: 'The Parthian peace', titleFa: 'آرامش اشکانی',
      pages: [
        { blocks: [
          { t: 'p', x: 'The Parthian Empire sat astride the greatest trade route in the world: the Silk Road, the long ribbon of commerce that linked the empires of Rome and China. Through Parthian lands passed the silk of the east and the gold of the west, and the empire grew rich as the great middleman of the world.', fa: 'امپراتوری اشکانی بر بزرگ‌ترین راه بازرگانی جهان نشسته بود: جادهٔ ابریشم، آن نوار دراز داد و ستد که امپراتوری روم و چین را به هم می‌بست. ابریشم شرق و زر غرب از خاک اشکانی می‌گذشت، و امپراتوری در مقام واسطهٔ بزرگ جهان توانگر شد.' },
          { t: 'p', x: 'The Parthians guarded and profited from this trade, and their cities flourished as bustling crossroads where the goods, ideas, and peoples of half the world met and mingled. Iran was, once again, a bridge between civilizations, as it had been under Cyrus and would be again.', fa: 'اشکانیان از این بازرگانی هم پاسداری کردند و هم سود بردند، و شهرهایشان چون چهارراه‌هایی پرجنب‌وجوش بالیدند؛ جایی که کالا و اندیشه و مردمانِ نیمی از جهان به هم می‌رسیدند و در هم می‌آمیختند. ایران، بار دیگر، پلی میان تمدن‌ها بود؛ چنان‌که در روزگار کوروش بود و باز هم خواهد بود.' },
          { t: 'splitimg', key: 'parthian-silkroad', title: 'The Silk Road', titleFa: 'جادهٔ ابریشم', x: 'The wealth of the Silk Road flowed through Parthian hands, linking Rome and China through the heart of Iran.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A looser kind of empire', fa: 'امپراتوری‌ای با بندهای سست‌تر' },
          { t: 'p', x: 'Parthia was not a tightly centralized realm like the empires before and after it. It was more a family of kingdoms and noble houses, bound in loyalty to the Arsacid king of kings, with powerful local lords holding great sway. This gave the empire resilience, but also, in the end, a certain fragility, as the great houses and rival claimants fought among themselves.', fa: 'اشکانیان قلمرویی به‌شدت متمرکز نبودند، آن‌گونه که امپراتوری‌های پیش و پس از آنان بودند. بیشتر خانواده‌ای بودند از پادشاهی‌ها و خاندان‌های بزرگ که در وفاداری به شاهنشاه اشکانی به هم بسته شده بودند، و خان‌های محلی نیرومند نفوذی فراوان داشتند. این ساختار به امپراتوری انعطاف داد، اما در پایان شکنندگی هم آورد؛ چرا که خاندان‌های بزرگ و مدعیان رقیب به جان هم می‌افتادند.' },
          { t: 'p', x: 'For all its strength against Rome, the empire was often divided within, and its long centuries were marked by civil wars and contested successions that slowly wore at its foundations.', fa: 'با همهٔ توانی که در برابر روم داشت، امپراتوری اغلب در درون خود دوپاره بود، و قرن‌های بلندش را جنگ‌های داخلی و جانشینی‌های مورد نزاع نشان‌دار کرد؛ چیزی که به‌آرامی بنیادش را سایید.' },
        ] },
      ],
    },
    {
      key: 'pt5',
      title: 'The Passing of the Torch', titleFa: 'سپردن مشعل',
      subtitle: '224 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'After nearly five hundred years, the Parthian Empire grew weary. Weakened by endless wars with Rome and by its own internal divisions, the once mighty realm was ripe for change. And change came, as it so often did in Iran, from the ancient heartland of Persia in the south.', fa: 'پس از نزدیک پانصد سال، امپراتوری اشکانی خسته شد. جنگ‌های بی‌پایان با روم و تفرقهٔ درونی ناتوانش کرده بود، و آن قلمروِ روزگاری نیرومند آمادهٔ دگرگونی بود. و دگرگونی، چنان‌که در ایران بارها روی داده، از دل سرزمین کهن پارس در جنوب آمد.' },
          { t: 'p', x: 'There, a prince named Ardashir rose in rebellion. In 224 CE he defeated the last Parthian king in battle, and upon the ruins of the Arsacid realm he raised a new empire, the Sasanian, which would carry Persia to fresh heights of glory.', fa: 'آنجا شاهزاده‌ای به نام اردشیر سر به شورش برداشت. در سال ۲۲۴ میلادی واپسین شاه اشکانی را در نبرد شکست داد، و بر ویرانه‌های قلمرو اشکانی امپراتوری تازه‌ای برافراشت: ساسانیان، که پارس را به بلندی‌های تازه‌ای از شکوه می‌رساند.' },
          { t: 'markline', x: 'One Iranian empire gave way to another, and the flame passed on.', fa: 'امپراتوری‌ای ایرانی جای خود را به دیگری داد، و شعله دست به دست شد.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Parthians, an empire too often overlooked, standing as it does between the dazzling glory of Cyrus and the splendour of the Sasanians. Yet their achievement was immense. In an age when Iran might have been swallowed by the Greek and Roman west, they reclaimed the homeland, revived the Iranian spirit, and stood for centuries as the unbreakable wall of the east.', fa: 'این نگاهی بود کوتاه به اشکانیان؛ امپراتوری‌ای که بیش از اندازه نادیده گرفته می‌شود، چون میان شکوه خیره‌کنندهٔ کوروش و جلال ساسانیان ایستاده است. با این همه، کاری که کردند عظیم بود. در روزگاری که ممکن بود ایران را غربِ یونانی و رومی ببلعد، سرزمین را بازپس گرفتند، روح ایرانی را زنده کردند، و قرن‌ها چون دیوار نشکستنی شرق ایستادند.' },
          { t: 'p', x: 'They kept the flame of Iran burning through the long centuries between two golden ages, and they handed it on, undimmed, to those who followed. Without the horsemen of Parthia, the story of Iran might have ended long ago.', fa: 'آنان شعلهٔ ایران را در قرن‌های دراز میان دو عصر طلایی فروزان نگاه داشتند و بی‌آنکه از تابش آن کاسته شود به آیندگان سپردند. اگر سوارکاران پارت نبودند، شاید داستان ایران دیرزمانی پیش به پایان رسیده بود.' },
          { t: 'pull', x: 'They kept the flame of Iran alive, and passed it on undimmed.', fa: 'شعلهٔ ایران را زنده نگاه داشتند، و بی‌آنکه کم‌فروغ شود به دست بعدی‌ها سپردند.' },
        ] },
      ],
    },
  ],
};

const afsharid: Topic = {
  key: 'afsharid-dynasty',
  category: 'history',
  name: 'The Afsharid Dynasty',
  persian: 'افشاریان',
  years: '1736 - 1796',
  essence: 'The dynasty of Nader Shah, the shepherd boy who became the last great conqueror of the East, and one of the most brilliant and terrible military minds in history.',
  essenceFa: 'سلسلهٔ نادرشاه؛ پسرکِ چوپانی که واپسین فاتح بزرگ شرق شد، و یکی از درخشان‌ترین و هولناک‌ترین ذهن‌های نظامی تاریخ.',
  cover: 'afsharid-cover',
  closing: 'afsharid-cover',
  status: 'ready',
  sources: [
    'The historical record of the Afsharid era',
    'Contemporary Persian and European accounts',
    'Michael Axworthy, The Sword of Persia',
  ],
  chapters: [
    {
      key: 'af1',
      title: 'From Shepherd to Warlord', titleFa: 'از چوپانی تا سرداری',
      subtitle: 'c. 1698 - 1729',
      pages: [
        { blocks: [
          { t: 'p', x: 'He was born into poverty in the northern lands of Khorasan, a boy of a humble tribe named Afshar, in a time of chaos. As a child, it is said, he and his mother were carried off by raiders and enslaved, and he escaped to make his own way in a broken world. From these lowest of beginnings would rise the most feared conqueror of his age.', fa: 'در تنگدستی زاده شد، در شمال خراسان، پسری از ایلی گمنام به نام افشار، در روزگاری آشفته. گفته‌اند در کودکی او و مادرش را غارتگران بردند و به بردگی گرفتند، و او گریخت تا در جهانی از هم پاشیده راه خود را بیابد. از همین پست‌ترین آغازها، هراس‌انگیزترین فاتح روزگارش برخاست.' },
          { t: 'p', x: 'His name was Nader. Tall, powerful, and possessed of a will of iron and a genius for war, he rose through sheer ability in a land that had fallen into anarchy. When the Safavid Empire collapsed and Afghan invaders seized the throne of Iran, it was Nader, a warlord commanding his own band of fighters, who would answer the call to save the nation.', fa: 'نامش نادر بود. بلندبالا و نیرومند، با ارادهٔ آهنین و نبوغی در جنگ، تنها با توانایی خود در سرزمینی که به هرج‌ومرج افتاده بود بالا آمد. وقتی امپراتوری صفوی فرو ریخت و مهاجمان افغان بر تخت ایران نشستند، همین نادر بود، سرداری در رأس دسته‌ای از جنگاوران خودش، که به ندای نجات کشور پاسخ داد.' },
          { t: 'splitimg', key: 'afsharid-nader-young', title: 'Nader of the Afshar', titleFa: 'نادرِ افشار', x: 'Born in poverty and once a captive, Nader rose by his genius for war to command armies and, in time, an empire.', fa: 'در تنگدستی زاده شد و روزگاری به اسارت رفت؛ نادر با نبوغش در جنگ بالا آمد تا فرماندهٔ سپاه‌ها و سرانجام یک امپراتوری شود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The savior of Iran', fa: 'ناجی ایران' },
          { t: 'p', x: 'Iran in the 1720s was a nation on its knees. The proud Safavid Empire had fallen to a band of Afghan rebels, foreign powers circled to seize its lands, and the country lay open to ruin. Into this darkness stepped Nader, offering his sword to a Safavid prince and swiftly becoming the true power behind the throne.', fa: 'ایرانِ دههٔ ۱۷۲۰ ملتی بود به زانو درآمده. امپراتوری سربلند صفوی به دست دسته‌ای شورشی افغان افتاده بود، قدرت‌های بیگانه گرد سرزمینش می‌چرخیدند تا تکه‌ای بردارند، و کشور در برابر ویرانی بی‌دفاع بود. نادر در همین تاریکی پا پیش گذاشت؛ شمشیرش را به شاهزاده‌ای صفوی سپرد و به‌سرعت به قدرت واقعی پشت تخت بدل شد.' },
          { t: 'p', x: 'With a reborn army trained to his own exacting standard, he drove the Afghan occupiers out of Iran, then turned on the Ottomans and the Russians who had seized Iranian lands in the time of weakness, and won them back one by one. In a few short years, he had raised Iran from the grave.', fa: 'با ارتشی از نو ساخته که به معیار سختگیرانهٔ خودش آموزش دیده بود، اشغالگران افغان را از ایران بیرون راند، سپس رو به عثمانی و روسیه آورد که در روزگار ناتوانی سرزمین‌های ایرانی را گرفته بودند، و یکی پس از دیگری بازپسشان گرفت. در چند سال کوتاه، ایران را از گور بیرون کشید.' },
          { t: 'markline', x: 'A shepherd boy had become the sword that saved a nation.', fa: 'پسرکِ چوپان، شمشیری شد که ملتی را نجات داد.' },
        ] },
      ],
    },
    {
      key: 'af2',
      title: 'The Crown and the Conqueror', titleFa: 'تاج و فاتح',
      subtitle: '1736',
      pages: [
        { blocks: [
          { t: 'p', x: 'Having saved Iran, Nader saw no reason to hand it back. In 1736, on a great plain where he summoned the nobles of the realm, he had himself proclaimed Shah, setting aside the last of the Safavids and founding his own dynasty, the Afsharid. The captive shepherd boy now wore the crown of the kings of kings.', fa: 'نادر که ایران را نجات داده بود، دلیلی نمی‌دید آن را پس بدهد. در سال ۱۷۳۶، در دشت مغان که بزرگان کشور را در آن گرد آورده بود، خود را شاه خواند، واپسین صفوی را کنار گذاشت و سلسلهٔ خودش را بنیان نهاد: افشاریان. آن پسرکِ به‌اسارت‌رفتهٔ چوپان، اکنون تاج شاهنشاهی بر سر داشت.' },
          { t: 'keyvalue', items: [
            { k: 'Crowned', v: '1736, on the Moghan plain' },
            { k: 'Origin', v: 'A humble tribe of Khorasan' },
            { k: 'Genius', v: 'One of history\'s great commanders' },
            { k: 'Ambition', v: 'To rival the conquerors of old' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The Napoleon of Persia', fa: 'شمشیری که شرق را لرزاند' },
          { t: 'p', x: 'Historians have called him the Napoleon of Persia, and the comparison is fitting. Like that later conqueror, Nader rose from obscurity by pure military genius, remade the army of his nation, and led it to victories that astonished the world. He was a master of speed, of surprise, and of the bold stroke that broke his enemies before they could gather.', fa: 'تاریخ‌نگاران او را ناپلئون ایران خوانده‌اند، و شباهت بی‌راه نیست؛ هرچند نادر شصت سال پیش از ناپلئون می‌زیست. مانند آن فاتح متأخر، نادر تنها با نبوغ نظامی از گمنامی برخاست، ارتش کشورش را از نو ساخت و آن را به پیروزی‌هایی رساند که جهان را حیرت‌زده کرد. استاد سرعت بود، استاد غافلگیری، و استاد آن ضربهٔ جسورانه که دشمن را پیش از آنکه گرد هم آید در هم می‌شکست.' },
          { t: 'p', x: 'His soldiers, hardened by constant campaign and devoted to a leader who shared their every hardship, became the most formidable fighting force in Asia. Under Nader, the armies of Iran marched from victory to victory, and the name of the Persian Shah was feared from the Caucasus to the plains of India.', fa: 'سربازانش که لشکرکشی پیوسته آبدیده‌شان کرده بود و به فرماندهی دل بسته بودند که در هر سختی شریکشان بود، به مهیب‌ترین نیروی جنگی آسیا بدل شدند. زیر فرمان نادر، سپاهیان ایران از پیروزی به پیروزی رفتند، و نام شاه ایران از قفقاز تا دشت‌های هند هراس می‌انگیخت.' },
          { t: 'markline', x: 'He remade the army of Iran into the terror of the East.', fa: 'ارتش ایران را از نو ساخت و آن را به وحشت شرق بدل کرد.' },
        ] },
      ],
    },
    {
      key: 'af3',
      title: 'The March on India', titleFa: 'لشکرکشی به هند',
      subtitle: '1738 - 1739',
      pages: [
        { blocks: [
          { t: 'p', x: 'Nader\'s most famous campaign was his boldest. In 1738 he led his army eastward, through Afghanistan and over the mountains, and descended upon the vast and fabulously wealthy Mughal Empire of India, the richest realm on earth.', fa: 'نامدارترین لشکرکشی نادر، جسورانه‌ترینش هم بود. در سال ۱۷۳۸ سپاهش را رو به شرق برد، از افغانستان و از فراز کوه‌ها گذشت، و بر امپراتوری پهناور و افسانه‌وار ثروتمند گورکانیان هند فرود آمد؛ توانگرترین قلمرو روی زمین.' },
          { t: 'p', x: 'At the battle of Karnal, his smaller, hardened army shattered the enormous but unwieldy Mughal host in a single day. The road to Delhi, the jewel of the East, lay open before him.', fa: 'در نبرد کرنال، سپاه کوچک‌تر اما آبدیده‌اش لشکر عظیم و بی‌قوارهٔ گورکانی را در یک روز در هم شکست. راه دهلی، نگین شرق، پیش رویش باز شد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The treasure of the world', fa: 'گنج جهان' },
          { t: 'p', x: 'Nader entered Delhi in triumph, and the wealth he carried away from it was almost beyond counting, the accumulated treasure of the Mughal emperors gathered over two centuries. The plunder was so immense that, upon his return, he is said to have exempted the people of Iran from taxes for years.', fa: 'نادر پیروزمندانه وارد دهلی شد، و ثروتی که از آنجا با خود برد تقریباً به شمار درنمی‌آمد؛ گنجینه‌ای که پادشاهان گورکانی در دو قرن انباشته بودند. غنیمت چندان کلان بود که گفته‌اند پس از بازگشت، مردم ایران را سال‌ها از مالیات معاف کرد.' },
          { t: 'numstat', items: [
            { n: '1739', label: 'Nader captures Delhi', labelFa: 'نادر دهلی را می‌گیرد' },
            { n: 'Karnal', nFa: 'کرنال', label: 'The Mughal army destroyed in a day', labelFa: 'سپاه گورکانی در یک روز نابود شد' },
            { n: '3 years', nFa: '۳ سال', label: 'Taxes he waived in Iran from the plunder', labelFa: 'مالیاتی که از محل غنیمت در ایران بخشید' },
            { n: 'Untold', nFa: 'بی‌شمار', label: 'Riches carried home from India', labelFa: 'ثروتی که از هند به خانه آورده شد' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The Peacock Throne and a mountain of light', fa: 'تخت طاووس و کوه نور' },
          { t: 'p', x: 'Among the treasures he took were the most legendary jewels in the world. He carried away the fabled Peacock Throne of the Mughal emperors, glittering with gems, which became the very symbol of the Persian monarchy for centuries after.', fa: 'در میان گنج‌هایی که برد، افسانه‌ای‌ترین جواهرات جهان بود. تخت طاووس پادشاهان گورکانی را با خود آورد، آن تختِ پر از نگین درخشان، که قرن‌ها پس از آن به نماد خودِ پادشاهی ایران بدل شد.' },
          { t: 'p', x: 'And among the jewels were two of the most famous diamonds ever known: the Darya-ye Noor, the Sea of Light, which remains in Iran to this day, and the Koh-i-Noor, the Mountain of Light, whose later journey would carry it, in time, to the crown jewels of England. The treasures of Nader\'s Indian campaign became legends in their own right.', fa: 'و در میان جواهرات، دو تن از نامدارترین الماس‌های تاریخ بودند: دریای نور، که تا امروز در ایران مانده است، و کوه نور، که سفر بعدی‌اش سرانجام آن را به جواهرات سلطنتی انگلستان رساند. گنج‌های لشکرکشی هند نادر، خود افسانه شدند.' },
          { t: 'splitimg', key: 'afsharid-peacock-throne', title: 'The Peacock Throne', titleFa: 'تخت طاووس', x: 'From Delhi, Nader carried home the jewelled Peacock Throne and the legendary diamonds of the Mughals, treasures still spoken of today.', fa: 'نادر از دهلی تخت طاووسِ نگین‌نشان و الماس‌های افسانه‌ای گورکانیان را با خود آورد؛ گنج‌هایی که هنوز از آنها سخن می‌رود.' },
        ] },
      ],
    },
    {
      key: 'af4',
      title: 'The Genius and the Shadow', titleFa: 'نبوغ و سایه',
      subtitle: 'The two faces of Nader', titleFa: 'دو چهرهٔ نادر',
      pages: [
        { blocks: [
          { t: 'p', x: 'Nader was a man of dazzling gifts, and his mind ranged far beyond the battlefield. He was a military innovator who understood artillery and the modern arts of war better than almost anyone in the East, and he even sought to build a navy for Iran on the Persian Gulf, a rare and forward-looking ambition.', fa: 'نادر مردی بود با توانایی‌های خیره‌کننده، و ذهنش بسی فراتر از میدان جنگ می‌رفت. نوآوری نظامی بود که توپخانه و فنون نوین جنگ را بهتر از تقریباً هر کس دیگری در شرق می‌فهمید، و حتی کوشید برای ایران در خلیج فارس نیروی دریایی بسازد؛ آرزویی کمیاب و آینده‌نگر.' },
          { t: 'p', x: 'He was also, in matters of faith, a pragmatist who tried to heal the ancient rift between the Sunni and Shia branches of Islam, hoping to unite them and end centuries of division, a strikingly bold idea for his age.', fa: 'در کار دین نیز مردی عمل‌گرا بود؛ کوشید شکاف کهن میان شیعه و سنی را التیام بخشد، به امید آنکه آن دو را یکی کند و به قرن‌ها جدایی پایان دهد. اندیشه‌ای بود به‌شدت جسورانه برای روزگار خودش.' },
          { t: 'duo', left: { title: 'The genius', titleFa: 'نبوغ', x: 'A brilliant general and innovator who saved Iran, conquered India, and dreamed of a navy and religious peace.', fa: 'سرداری درخشان و نوآور که ایران را نجات داد، هند را گشود، و رؤیای نیروی دریایی و آشتی مذهبی در سر داشت.' }, right: { title: 'The shadow', titleFa: 'سایه', x: 'A ruler who grew ever more cruel, suspicious, and tyrannical as the years and the wars wore on.' } },
        ] },
        { blocks: [
          { t: 'h', x: 'The darkening of a great mind', fa: 'تیره شدن یک ذهن بزرگ' },
          { t: 'p', x: 'But there was a shadow over his greatness, and it grew darker with the years. The endless wars and the burdens of rule seemed to poison his mind. He grew suspicious, harsh, and terribly cruel, crushing his own people with heavy taxes to fund his campaigns and answering the smallest disloyalty with horrifying punishment.', fa: 'اما سایه‌ای بر بزرگی‌اش افتاده بود، و سال به سال تیره‌تر می‌شد. گویی جنگ‌های بی‌پایان و بار فرمانروایی ذهنش را زهرآگین کرد. بدگمان شد و سختگیر و به‌شدت بی‌رحم؛ مردم خودش را زیر مالیات‌های سنگین برای تأمین لشکرکشی‌هایش خرد کرد و کوچک‌ترین نافرمانی را با کیفری هولناک پاسخ داد.' },
          { t: 'p', x: 'In a fit of paranoia he had his own son blinded, suspecting him of treason, a deed he is said to have regretted for the rest of his life. The savior of Iran had become its tormentor, and the brilliant mind that had raised the nation now cast a long and terrible shadow over it.', fa: 'در تشنج بدگمانی، فرمان داد چشمان پسر خودش را کور کنند، چون به خیانتش مظنون شده بود؛ کاری که گفته‌اند تا پایان عمر از آن پشیمان ماند. ناجی ایران به عذاب‌دهندهٔ آن بدل شده بود، و همان ذهن درخشانی که این ملت را برافراشته بود، اکنون سایه‌ای دراز و هولناک بر آن می‌انداخت.' },
          { t: 'markline', x: 'The sword that saved Iran turned, in the end, against its own people.', fa: 'شمشیری که ایران را نجات داد، سرانجام رو به مردم خودش گرداند.' },
        ] },
      ],
    },
    {
      key: 'af5',
      title: 'The Fall of the Sword', titleFa: 'فرود آمدن شمشیر',
      subtitle: '1747',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the end, the fear he inspired was his undoing. By 1747, his cruelty had made him enemies even among his own most trusted officers, who came to believe that none of them was safe from his suspicion. Rather than wait to be struck down, they resolved to strike first.', fa: 'سرانجام همان هراسی که برمی‌انگیخت، کار خودش را ساخت. تا سال ۱۷۴۷، بی‌رحمی‌اش حتی در میان مورد اعتمادترین افسرانش دشمن تراشیده بود؛ کسانی که به این باور رسیده بودند هیچ‌کدامشان از بدگمانی او در امان نیست. به جای آنکه منتظر ضربه بمانند، بر آن شدند خود پیش‌دستی کنند.' },
          { t: 'p', x: 'In the night, a band of his own commanders crept into his tent and killed him as he slept. The greatest warrior of the age, who had conquered from the Caucasus to Delhi and whom no enemy could defeat in the field, fell at last to the daggers of his own men.', fa: 'شبانه، گروهی از فرماندهان خودش به خیمه‌اش خزیدند و او را در خواب کشتند. بزرگ‌ترین جنگاور آن روزگار، که از قفقاز تا دهلی را گشوده بود و هیچ دشمنی در میدان از پسش برنیامده بود، سرانجام به خنجر مردان خودش از پا درآمد.' },
          { t: 'markline', x: 'No enemy could defeat him. Only his own could bring him down.', fa: 'هیچ دشمنی نتوانست شکستش دهد. تنها خودی‌ها توانستند از پا درش آورند.' },
        ] },
        { blocks: [
          { t: 'p', x: 'With Nader\'s death, the empire he had built by the sheer force of his will fell apart almost at once. He had conquered vast lands, but he had not built the institutions to hold them, and without him at their head, they scattered. His dynasty clung to a fragment of power in Khorasan for a few decades more, but its glory had died with its founder.', fa: 'با مرگ نادر، امپراتوری‌ای که تنها با نیروی ارادهٔ او برپا شده بود، تقریباً بی‌درنگ از هم پاشید. سرزمین‌های پهناوری گشوده بود، اما نهادهایی نساخته بود که آنها را نگاه دارد، و بی‌او در رأس، پراکنده شدند. سلسله‌اش چند دههٔ دیگر به تکه‌ای از قدرت در خراسان چنگ زد، اما شکوهش با بنیان‌گذارش مرده بود.' },
          { t: 'p', x: 'From the chaos that followed his death, in time, would rise the gentle Karim Khan of the Zand, who gave Iran the peace that Nader, for all his conquests, never could.', fa: 'از آشوبی که پس از مرگش برخاست، به وقت خود کریم‌خان زندِ مهربان سر برآورد؛ کسی که آرامشی به ایران داد که نادر، با همهٔ فتوحاتش، هرگز نتوانست بدهد.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of Nader Shah and the Afsharids, one of the most extraordinary and complex stories in all of Iranian history. Nader was a shepherd boy who became a conqueror to rival the greatest of the ancient world, a military genius who saved his nation from ruin and carried its banners to the gates of the East.', fa: 'این نگاهی بود کوتاه به نادرشاه و افشاریان؛ یکی از شگفت‌ترین و پیچیده‌ترین روایت‌های تمام تاریخ ایران. نادر پسرکِ چوپانی بود که فاتحی شد هم‌سنگ بزرگ‌ترین فاتحان جهان باستان؛ نابغه‌ای نظامی که ملتش را از ویرانی نجات داد و درفشش را تا دروازه‌های شرق برد.' },
          { t: 'p', x: 'He was also a warning, of how the very brilliance and will that can save a nation can, unchecked, turn to darkness. He remains one of history\'s most dazzling and troubling figures, a comet that blazed across the sky of Iran, brilliant and terrible, and was gone almost as swiftly as it had come.', fa: 'و در عین حال هشداری بود: که همان درخشش و ارادهٔ نجات‌بخش، اگر مهار نشود، می‌تواند به تاریکی بگراید. او یکی از خیره‌کننده‌ترین و آزاردهنده‌ترین چهره‌های تاریخ مانده است؛ ستارهٔ دنباله‌داری که بر آسمان ایران شعله کشید، درخشان و هولناک، و تقریباً به همان شتابی که آمده بود رفت.' },
          { t: 'pull', x: 'A shepherd who conquered an empire, and a genius undone by his own shadow.', fa: 'چوپانی که امپراتوری گشود، و نابغه‌ای که سایهٔ خودش از پا درش آورد.' },
        ] },
      ],
    },
  ],
};

const seljuk: Topic = {
  key: 'seljuk-empire',
  category: 'history',
  name: 'The Seljuk Empire',
  persian: 'سلجوقیان',
  years: '1037 - 1194',
  essence: 'The Turkic dynasty that ruled a vast Islamic empire from Iran, and under whom Persian culture, art, and learning reached a brilliant new height.',
  essenceFa: 'سلسله‌ای ترک‌تبار که امپراتوری بزرگ اسلامی را از ایران اداره کرد، و در روزگارشان فرهنگ و هنر و دانش ایرانی به بلندای تازه‌ای رسید.',
  cover: 'seljuk-cover',
  closing: 'seljuk-cover',
  status: 'ready',
  sources: [
    'The historical record of the Seljuk era',
    'Contemporary Persian and Arabic accounts',
    'The Rubaiyat of Omar Khayyam',
  ],
  chapters: [
    {
      key: 'sj1',
      title: 'Horsemen from the Steppe', titleFa: 'سوارکارانی از دشت',
      subtitle: '11th century',
      pages: [
        { blocks: [
          { t: 'p', x: 'From the wide grasslands of Central Asia came a people of nomadic Turkic horsemen, the Seljuks, named for a chieftain of old. Hardy, warlike, and newly devoted to Islam, they swept south and west into the Iranian world in the eleventh century, and within a single generation had built one of the great empires of the age.', fa: 'از علفزارهای پهناور آسیای میانه مردمی آمدند از سوارکاران کوچ‌نشین ترک، سلجوقیان، که نامشان را از سرکرده‌ای کهن گرفته بودند. سرسخت بودند و جنگاور و تازه به اسلام گرویده. در سدهٔ یازدهم رو به جنوب و غرب به جهان ایرانی تاختند، و در فاصلهٔ یک نسل یکی از امپراتوری‌های بزرگ آن روزگار را برپا کردند.' },
          { t: 'p', x: 'In 1040 they shattered the armies of the reigning power at the battle of Dandanaqan, and the road into Iran lay open. Under their leader Tughril, they took city after city, until at last Tughril entered Baghdad itself and was named Sultan, protector of the Islamic world.', fa: 'در سال ۱۰۴۰ در نبرد دندانقان سپاه قدرت حاکم را در هم شکستند و راه ایران باز شد. به رهبری طغرل، شهر پس از شهر را گرفتند، تا آنکه سرانجام طغرل خود وارد بغداد شد و او را سلطان خواندند؛ نگاهبان جهان اسلام.' },
          { t: 'splitimg', key: 'seljuk-tughril', title: 'Tughril Beg', titleFa: 'طغرل بیک', x: 'Tughril led the Seljuks from the steppe into Iran and beyond, founding an empire that stretched from Central Asia to the Mediterranean.', fa: 'طغرل سلجوقیان را از دشت به ایران و فراتر از آن رساند، و امپراتوری‌ای بنیان نهاد که از آسیای میانه تا مدیترانه کشیده شد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Conquerors who became Persians', fa: 'فاتحانی که ایرانی شدند' },
          { t: 'p', x: 'Here a pattern repeated that runs through all of Iran\'s history. The Seljuks came as foreign conquerors, but they were swiftly captivated by the older and more sophisticated Persian civilization they had overrun. They adopted its language of culture, its arts, its ways of government, and its administrators.', fa: 'اینجا الگویی تکرار شد که در سراسر تاریخ ایران جاری است. سلجوقیان چون فاتحانی بیگانه آمدند، اما به‌سرعت شیفتهٔ تمدن ایرانی شدند؛ تمدنی کهن‌تر و پرورده‌تر از آنِ خودشان که بر آن چیره شده بودند. زبان فرهنگی‌اش را پذیرفتند، هنرهایش را، شیوهٔ دیوانداری‌اش را، و دیوانیانش را.' },
          { t: 'markline', x: 'They conquered Iran with the sword, and Iran conquered them with its culture.', fa: 'ایران را با شمشیر گرفتند، و ایران آنان را با فرهنگش گرفت.' },
          { t: 'p', x: 'The conquerors became patrons of Persian civilization, and under their rule, though the sultans were Turks, the soul of the state was Persian. It was a marriage of the vigour of the steppe and the refinement of Iran, and it produced a golden age.', fa: 'فاتحان به حامیان تمدن ایرانی بدل شدند، و در روزگار آنان، هرچند سلطان‌ها ترک بودند، جان دولت ایرانی بود. این پیوند نیروی دشت بود با ظرافت ایران، و عصری طلایی از آن زاده شد.' },
        ] },
      ],
    },
    {
      key: 'sj2',
      title: 'The Great Vizier and the Golden Age', titleFa: 'وزیر بزرگ و عصر طلایی',
      subtitle: '1063 - 1092',
      pages: [
        { blocks: [
          { t: 'p', x: 'The true architect of the Seljuk golden age was not a sultan but a Persian statesman, one of the greatest administrators in the history of Iran: Nizam al-Mulk, the great vizier who guided the empire at its height for thirty years.', fa: 'معمار راستین عصر طلایی سلجوقی سلطان نبود، بلکه سیاستمداری ایرانی بود؛ یکی از بزرگ‌ترین دیوانسالاران تاریخ ایران: خواجه نظام‌الملک، وزیر بزرگی که سی سال امپراتوری را در اوجش راه برد.' },
          { t: 'splitimg', key: 'seljuk-nizam', title: 'Nizam al-Mulk', titleFa: 'خواجه نظام‌الملک', x: 'The brilliant Persian vizier who ran the Seljuk Empire for three decades and wrote a famous book on the art of governing.', fa: 'وزیر درخشان ایرانی که سه دهه امپراتوری سلجوقی را اداره کرد و سیاست‌نامه را نوشت، کتابی نامدار در آیین حکومت.' },
          { t: 'p', x: 'A master of statecraft, he organized the sprawling empire, built roads and institutions, and wrote a celebrated book on the art of government that was studied for centuries. Above all, he founded a network of great colleges, the Nizamiyya, across the empire, among the finest centers of learning in the world of their day.', fa: 'استادِ کشورداری بود؛ امپراتوری گسترده را سامان داد، راه و نهاد ساخت، و کتابی نامدار در آیین حکومت نوشت، سیاست‌نامه، که قرن‌ها آن را می‌خواندند. از همه مهم‌تر، شبکه‌ای از مدرسه‌های بزرگ را در سراسر امپراتوری بنیان نهاد، نظامیه‌ها، که از بهترین کانون‌های دانش روزگار خود بودند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The age of Khayyam', fa: 'روزگار خیام' },
          { t: 'p', x: 'This was an age of extraordinary Persian genius. At the Seljuk court worked Omar Khayyam, one of the most remarkable minds of any age: a brilliant mathematician who advanced algebra, and an astronomer who reformed the calendar into one more accurate than any then known in the world.', fa: 'این روزگار، روزگار نبوغ چشمگیر ایرانی بود. در دربار سلجوقی عمر خیام کار می‌کرد، از شگفت‌ترین ذهن‌های هر عصری: ریاضی‌دانی درخشان که جبر را پیش برد، و ستاره‌شناسی که تقویم را چنان اصلاح کرد که دقیق‌تر از هر تقویم شناخته‌شدهٔ آن روز جهان شد.' },
          { t: 'p', x: 'And Khayyam was also a poet, whose quatrains, the Rubaiyat, meditating on life, time, and the fleeting beauty of the world, would one day be loved across the entire earth. That one man could be at once a great scientist and a great poet is a wonder that captures the spirit of this golden age.', fa: 'و خیام شاعر هم بود؛ رباعیاتش، در تأمل بر زندگی و زمان و زیبایی گذرای جهان، روزی در سراسر زمین دوست داشته شد. اینکه یک تن بتواند هم دانشمندی بزرگ باشد و هم شاعری بزرگ، شگفتی‌ای است که روح این عصر طلایی را در خود دارد.' },
          { t: 'numstat', items: [
            { n: 'Algebra', nFa: 'جبر', label: 'Khayyam advanced its foundations', labelFa: 'خیام بنیادهایش را پیش برد' },
            { n: 'Calendar', nFa: 'تقویم', label: 'A reform of astonishing accuracy', labelFa: 'اصلاحی با دقتی شگفت‌آور' },
            { n: 'Rubaiyat', nFa: 'رباعیات', label: 'Poetry beloved around the world', labelFa: 'شعری که در سراسر جهان دوست داشته شد' },
            { n: 'One mind', nFa: 'یک ذهن', label: 'Scientist and poet at once', labelFa: 'دانشمند و شاعر، هر دو با هم' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'But the golden age carried the seeds of its own troubles. Nizam al-Mulk was assassinated in 1092, struck down, it is said, by the daggers of a shadowy new sect, the Assassins, who from their mountain fortresses would haunt the region for generations. Soon after, the great sultan died too, and the empire began to fracture among rival heirs.', fa: 'اما عصر طلایی بذر گرفتاری‌های خود را نیز با خود داشت. نظام‌الملک در سال ۱۰۹۲ ترور شد؛ گفته‌اند به خنجر فرقه‌ای تازه و پنهان‌کار، حشاشین، که از دژهای کوهستانی‌شان نسل‌ها سایه بر این سرزمین انداختند. اندکی بعد سلطان بزرگ نیز درگذشت، و امپراتوری میان وارثان رقیب رو به چندپارگی گذاشت.' },
          { t: 'markline', x: 'A golden age of Persian art and science bloomed under the Turkish sultans.', fa: 'عصری طلایی از هنر و دانش ایرانی، زیر فرمان سلطان‌های ترک شکفت.' },
        ] },
      ],
    },
    {
      key: 'sj3',
      title: 'The Empire Divides', titleFa: 'امپراتوری چندپاره می‌شود',
      subtitle: '1092 - 1194',
      pages: [
        { blocks: [
          { t: 'p', x: 'After the deaths of the great sultan and his great vizier, the vast Seljuk empire, held together by their skill, began to come apart. It split into smaller kingdoms ruled by rival branches of the family, each holding a piece of the once mighty realm.', fa: 'پس از مرگ سلطان بزرگ و وزیر بزرگش، امپراتوری پهناور سلجوقی که با کاردانی آن دو یکپارچه مانده بود، رو به گسستن گذاشت. به پادشاهی‌های کوچک‌تری بخش شد که شاخه‌های رقیب همان خاندان بر آنها فرمان می‌راندند، و هر یک تکه‌ای از قلمروِ روزگاری نیرومند را در دست داشت.' },
          { t: 'p', x: 'These successor states carried on the Seljuk legacy for another century, and in places like Anatolia the Seljuk name endured even longer, laying foundations for the Turkish presence there that continues to this day. But the unity of the great empire was gone.', fa: 'این دولت‌های جانشین یک قرن دیگر میراث سلجوقی را پیش بردند، و در جاهایی چون آناتولی نام سلجوقی حتی دیرتر ماند و بنیاد حضور ترکان را در آنجا گذاشت که تا امروز ادامه دارد. اما یکپارچگی آن امپراتوری بزرگ رفته بود.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Seljuks, Turkic conquerors who became the great patrons of Persian civilization. Under their rule, Iran\'s culture, art, architecture, and science flourished brilliantly, and its influence spread across a vast empire from Central Asia to the Mediterranean.', fa: 'این نگاهی بود کوتاه به سلجوقیان؛ فاتحانی ترک که به حامیان بزرگ تمدن ایرانی بدل شدند. در روزگار آنان فرهنگ و هنر و معماری و دانش ایران به‌درخشندگی شکفت، و نفوذش در امپراتوری‌ای پهناور از آسیای میانه تا مدیترانه گسترد.' },
          { t: 'p', x: 'They showed, as others had before and would again, the deep power of Iranian civilization to absorb and transform its conquerors. The steppe warriors who rode in as foreign masters became, within a generation, the proud custodians of Persian art and learning. It is one of the recurring wonders of Iran\'s long story.', fa: 'آنان نشان دادند، چنان‌که پیش از ایشان دیگران نشان داده بودند و پس از ایشان هم خواهند داد، که تمدن ایرانی چه توان ژرفی در جذب و دگرگون کردن فاتحانش دارد. جنگاوران دشت که چون اربابانی بیگانه وارد شدند، در فاصلهٔ یک نسل به نگاهبانان سربلند هنر و دانش ایرانی بدل شدند. این یکی از شگفتی‌های همیشه‌تکرارشوندهٔ داستان بلند ایران است.' },
          { t: 'pull', x: 'The conquerors came as masters, and stayed as students of Iran.', fa: 'فاتحان چون ارباب آمدند، و چون شاگرد ایران ماندند.' },
        ] },
      ],
    },
  ],
};

const ilkhanate: Topic = {
  key: 'ilkhanate',
  category: 'history',
  name: 'The Ilkhanate',
  persian: 'ایلخانان',
  years: '1256 - 1335',
  essence: 'The age of the Mongol storm, when Iran suffered one of the greatest catastrophes in its history, and then, astonishingly, tamed and civilized its conquerors.',
  essenceFa: 'روزگار توفان مغول؛ آنگاه که ایران یکی از بزرگ‌ترین فاجعه‌های تاریخش را از سر گذراند، و سپس، شگفت‌آورتر از همه، فاتحان خود را رام کرد و به فرهنگ آورد.',
  cover: 'ilkhanate-cover',
  closing: 'ilkhanate-cover',
  status: 'ready',
  sources: [
    'The historical record of the Mongol era',
    'Persian chronicles of the age',
    'Rashid al-Din, Compendium of Chronicles',
  ],
  chapters: [
    {
      key: 'il1',
      title: 'The Storm from the East', titleFa: 'توفانی از شرق',
      subtitle: '1219 - 1258',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the early thirteenth century, out of the steppes of Mongolia, came the most terrible conquerors the world had ever known. Under Genghis Khan, the Mongols built a war machine of unmatched speed and ferocity, and when their fury turned toward Iran, it fell upon the land like the end of the world.', fa: 'در آغاز سدهٔ سیزدهم، از دشت‌های مغولستان، هولناک‌ترین فاتحانی که جهان به خود دیده بود سر رسیدند. مغولان به فرمان چنگیزخان ماشین جنگی‌ای ساخته بودند بی‌همتا در شتاب و درندگی، و چون خشمشان رو به ایران گرداند، بر این سرزمین فرود آمد چون پایان جهان.' },
          { t: 'p', x: 'The devastation was almost beyond describing. Great and ancient cities, centers of learning and beauty that had stood for centuries, were destroyed utterly, their people slaughtered, their libraries and canals and treasures reduced to ash and rubble. It was one of the darkest hours in all of Iran\'s long history.', fa: 'ویرانی چنان بود که به وصف درنمی‌آید. شهرهای بزرگ و کهن، کانون‌های دانش و زیبایی که قرن‌ها ایستاده بودند، یکسره ویران شدند؛ مردمشان از دم تیغ گذشتند و کتابخانه‌ها و قنات‌ها و گنجینه‌هایشان به خاکستر و آوار بدل شد. این یکی از تاریک‌ترین ساعت‌های تاریخ بلند ایران بود.' },
          { t: 'markline', x: 'The Mongol storm was one of the greatest catastrophes Iran ever endured.', fa: 'توفان مغول از بزرگ‌ترین فاجعه‌هایی بود که بر ایران گذشت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A wound to a civilization', fa: 'زخمی بر پیکر یک تمدن' },
          { t: 'p', x: 'The scale of the ruin was staggering. Cities like Nishapur, Merv, and Rey, jewels of the Persian world, were laid waste, some never to recover. The intricate irrigation systems that had made the land bloom for millennia were shattered, and whole regions were depopulated. A brilliant civilization was struck a blow from which it would take generations to recover.', fa: 'اندازهٔ ویرانی حیرت‌آور بود. شهرهایی چون نیشابور و مرو و ری، نگین‌های جهان ایرانی، با خاک یکسان شدند و برخی هرگز کمر راست نکردند. شبکه‌های پیچیدهٔ آبیاری که هزاران سال این سرزمین را شکوفا کرده بودند از هم پاشید، و مناطقی تمام از سکنه خالی شد. ضربه‌ای بر تمدنی درخشان فرود آمد که ترمیمش نسل‌ها طول کشید.' },
          { t: 'p', x: 'In 1258 the Mongols under Hulagu, grandson of Genghis, took Baghdad, the great seat of the Islamic world, and destroyed it in an orgy of violence that shocked the age. The old order of the Islamic east was swept away, and Iran lay prostrate beneath the conquerors.', fa: 'در سال ۱۲۵۸ مغولان به فرماندهی هولاکو، نوهٔ چنگیز، بغداد را گرفتند، مرکز بزرگ جهان اسلام، و آن را در خشونتی چنان افسارگسیخته ویران کردند که آن روزگار را تکان داد. نظم کهن شرق اسلامی از میان رفت، و ایران زیر پای فاتحان بر خاک افتاد.' },
        ] },
      ],
    },
    {
      key: 'il2',
      title: 'The Taming of the Conquerors', titleFa: 'رام شدن فاتحان',
      subtitle: '1258 - 1335',
      pages: [
        { blocks: [
          { t: 'p', x: 'And then, one of the most remarkable transformations in all of history unfolded. The Mongol rulers of Iran, called the Ilkhans, settled into the land they had ruined, and slowly, over the generations, the ancient magic of Persian civilization worked upon them. The destroyers became rebuilders. The pagan nomads became Persian kings.', fa: 'و آنگاه یکی از شگفت‌ترین دگرگونی‌های تمام تاریخ رخ داد. فرمانروایان مغول ایران، که ایلخانان خوانده شدند، در همان سرزمینی که ویرانش کرده بودند ساکن شدند، و به‌آرامی و در گذر نسل‌ها، جادوی کهن تمدن ایرانی بر آنان کارگر افتاد. ویرانگران به سازندگان بدل شدند. کوچ‌نشینان بت‌پرست، شاهان ایرانی شدند.' },
          { t: 'markline', x: 'The civilization they had nearly destroyed rose up and remade them in its image.', fa: 'تمدنی که نزدیک بود نابودش کنند، برخاست و آنان را به شکل خود از نو ساخت.' },
          { t: 'p', x: 'The turning point came when the Ilkhan Ghazan converted to Islam and embraced the ways of the land he ruled. Guided by a brilliant Persian vizier, he set about rebuilding what his ancestors had destroyed, reforming the government, restoring the ruined lands, and becoming a patron of Persian art and learning.', fa: 'نقطهٔ چرخش آنگاه رسید که غازان خان به اسلام گروید و راه و رسم سرزمینی را که بر آن فرمان می‌راند پذیرفت. به راهنمایی وزیری درخشان و ایرانی، دست به بازسازی آنچه نیاکانش ویران کرده بودند زد؛ دیوان را اصلاح کرد، سرزمین‌های ویران را آباد کرد، و به حامی هنر و دانش ایرانی بدل شد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A flowering from the ashes', fa: 'شکوفه‌ای از دل خاکستر' },
          { t: 'p', x: 'What followed was, astonishingly, a cultural golden age. The vizier Rashid al-Din, one of the great minds of the age, composed a monumental history of the world, perhaps the first truly global history ever written, drawing on the knowledge the vast Mongol empire had gathered from China to Europe.', fa: 'آنچه پس از آن آمد، شگفت‌آورانه، عصری طلایی در فرهنگ بود. رشیدالدین فضل‌الله، وزیر و از بزرگ‌ترین ذهن‌های آن روزگار، تاریخی سترگ از جهان نوشت، جامع‌التواریخ؛ شاید نخستین تاریخ به‌راستی جهانی که تا آن روز نوشته شده بود، بر پایهٔ دانشی که امپراتوری پهناور مغول از چین تا اروپا گرد آورده بود.' },
          { t: 'p', x: 'Persian painting, enriched now by contact with the art of China, entered one of its most beautiful periods. Architecture, history, and science flourished under Mongol patronage. From the ashes of the greatest catastrophe, Iran had conjured a new flowering of its genius.', fa: 'نگارگری ایرانی که اکنون از برخورد با هنر چین توانگر شده بود، به یکی از زیباترین دوره‌های خود پا گذاشت. معماری و تاریخ‌نگاری و دانش زیر حمایت مغولان بالیدند. ایران از خاکستر بزرگ‌ترین فاجعه‌اش، شکوفایی تازه‌ای از نبوغ خود بیرون کشید.' },
          { t: 'splitimg', key: 'ilkhanate-rashid', title: 'Rashid al-Din', titleFa: 'رشیدالدین فضل‌الله', x: 'The Persian vizier and scholar who wrote a history of the world, and helped transform the Mongol conquerors into patrons of Persian civilization.', fa: 'وزیر و دانشمند ایرانی که جامع‌التواریخ را نوشت و در بدل کردن فاتحان مغول به حامیان تمدن ایرانی سهم داشت.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Ilkhanate, the age of the Mongols in Iran, a story of catastrophe and, against all odds, of renewal. The Mongol invasion was among the most destructive events the nation ever suffered, and its wounds were deep and lasting.', fa: 'این نگاهی بود کوتاه به ایلخانان، روزگار مغول در ایران؛ روایتی از فاجعه و، برخلاف همهٔ انتظارها، از نوزایی. هجوم مغول از ویرانگرترین رویدادهایی بود که بر این ملت گذشت، و زخم‌هایش ژرف و ماندگار بود.' },
          { t: 'p', x: 'Yet even this could not extinguish the Iranian spirit. Within a few generations, Iran had absorbed and transformed even the terrible Mongols, turning destroyers into patrons and drawing from the darkest of times a new age of beauty. It stands as perhaps the greatest testament of all to the deathless resilience of Persian civilization.', fa: 'با این همه، حتی این هم نتوانست روح ایرانی را خاموش کند. در فاصلهٔ چند نسل، ایران حتی مغولان هولناک را نیز در خود گرفت و دگرگون کرد؛ ویرانگران را به حامیان بدل ساخت و از تاریک‌ترین روزگاران، عصری تازه از زیبایی بیرون کشید. این شاید بزرگ‌ترین گواه بر تاب‌آوری نمیرای تمدن ایرانی باشد.' },
          { t: 'pull', x: 'Even the Mongols, in the end, were conquered by the soul of Iran.', fa: 'سرانجام حتی مغولان هم مغلوب جان ایران شدند.' },
        ] },
      ],
    },
  ],
};


const modernIran: Topic = {
  key: 'modern-iran',
  category: 'history',
  name: 'Iran Since the Revolution',
  persian: 'ایران پس از انقلاب',
  years: '1979 - today',
  essence: 'The revolution, the war, the leaders who followed, and the long descent of the currency. What happened, in order, as plainly as it can be told.',
  essenceFa: 'انقلاب، جنگ، فرمانروایانی که پس از آن آمدند، و سقوط طولانی پول ملی. آنچه رخ داد، به ترتیب، و تا آنجا که بتوان ساده گفتش.',
  essenceFa: 'انقلاب، جنگ، رهبرانی که پس از آن آمدند، و افت طولانی ارزش پول. این، روایتِ آن چیزی است که رخ داد؛ به ترتیب، و تا حد ممکن ساده.',
  cover: 'modern-cover',
  closing: 'modern-cover',
  status: 'ready',
  sources: [
    'Contemporary reporting and the historical record',
    'United Nations and human rights organisation documentation',
    'Central Bank of Iran and World Bank economic data',
  ],
  chapters: [
    {
      key: 'mi1',
      title: 'How It Began', titleFa: 'آغاز ماجرا',
      subtitle: '1963 - 1979', titleFa: '۱۳۴۲ تا ۱۳۵۷',
      pages: [
        { blocks: [
          { t: 'p', x: 'The Iran that exists today began in 1979. Everything since, the war, the money, the leaders, the arguments at every dinner table, runs back to that year.', fa: 'ایرانِ امروز، از سال ۱۳۵۷ شکل گرفت. هرآنچه پس از آن رخ داده است—از جنگ و پول و رهبران گرفته تا بحث‌هایی که بر سر هر سفره‌ای درمی‌گیرد—به همان سال بازمی‌گردد.' },
          { t: 'p', x: 'This is the hardest chapter in this book to write, because it is not finished. It is not a settled history that everyone has agreed on. It is still being lived, by people who were there and by their children, and almost every family holds a different piece of it.', fa: 'نوشتن این فصل از همه فصل‌های این کتاب دشوارتر است، چون هنوز به پایان نرسیده. این تاریخی نیست که درباره‌اش اجماعی شکل گرفته باشد و همه روایت واحدی از آن داشته باشند. این تاریخ هنوز در زندگی کسانی که آن روزها را به چشم دیده‌اند و در زندگی فرزندانشان جریان دارد، و تقریباً هر خانواده بخشی متفاوت از آن را در حافظه خود دارد.' },
          { t: 'p', x: 'So this is not a verdict. It is an account: what happened, in order, from the years before the Shah left to where the country stands now. Where the facts are clear they are stated plainly. Where people saw the same events and drew opposite conclusions, both are set down.', fa: 'پس اینجا قرار نیست حکمی صادر شود؛ قرار است روایتی از آنچه رخ داد ارائه شود: به ترتیب، از سال‌های پیش از رفتن شاه تا جایی که کشور امروز در آن ایستاده است. هرجا واقعیت روشن باشد، همان‌طور روشن و بی‌پیرایه بیان می‌شود. و هرجا مردم یک رویداد واحد را دیده‌اند اما از آن به نتایجی کاملاً متفاوت رسیده‌اند، هر دو روایت در کنار هم آورده می‌شود.' },
          { t: 'markline', x: 'Begin where it begins, and let the record speak.', fa: 'از همان‌جایی آغاز کنیم که ماجرا آغاز شد، و بگذاریم اسناد خود سخن بگویند.' },
          { t: 'div' },
        ] },
        { blocks: [
          { t: 'h', x: 'The White Revolution', fa: 'انقلاب سفید' },
          { t: 'p', x: 'In 1963 Mohammad Reza Shah announced a programme he called the White Revolution: a revolution from above, made without bloodshed. His stated ambition was to move Iran, within a single generation, from a largely agricultural country into the front rank of nations.', fa: 'در سال ۱۳۴۲، محمدرضا شاه برنامه‌ای را اعلام کرد که آن را «انقلاب سفید» نامید؛ انقلابی از بالا، بدون خون‌ریزی. هدفی که او برای این برنامه اعلام می‌کرد، آن بود که ایران در فاصله یک نسل، از کشوری عمدتاً کشاورزی به یکی از کشورهای پیشرو جهان تبدیل شود.' },
          { t: 'p', x: 'It is worth remembering what Iran looked like before it. Most people worked land they did not own. Literacy outside the cities was low. Electricity, running water and roads reached only part of the country. The modern industrial economy had barely begun.', fa: 'بد نیست به یاد بیاوریم ایران پیش از آن چه وضعی داشت. بیشتر مردم روی زمین‌هایی کار می‌کردند که مالکشان نبودند. میزان باسوادی در خارج از شهرها پایین بود. برق، آب لوله‌کشی و راه‌های ارتباطی تنها به بخشی از کشور رسیده بود. اقتصاد صنعتی مدرن نیز هنوز در آغاز راه بود.' },
          { t: 'p', x: 'The programme set out to change all of that at once. Large estates were broken up and the land distributed to the farmers working it. Factories were required to share profits with their workers. Forests and waterways passed to the state. A literacy corps of young conscripts was sent into the villages to teach, and a health corps followed them. Roads, dams, power stations and universities were built at a pace the country had never seen.', fa: 'این برنامه می‌خواست همه این وضعیت را یک‌باره دگرگون کند. املاک بزرگ در چارچوب اصلاحات ارضی تقسیم شد و زمین‌ها به کشاورزانی رسید که روی آن‌ها کار می‌کردند. کارخانه‌ها موظف شدند بخشی از سود خود را با کارگرانشان سهیم شوند. جنگل‌ها و منابع آبی در اختیار دولت قرار گرفت. سپاه دانش، متشکل از سربازان جوان، برای آموزش به روستاها اعزام شد و پس از آن، سپاه بهداشت نیز به روستاها رفت. جاده‌ها، سدها، نیروگاه‌ها و دانشگاه‌ها با سرعتی ساخته شدند که کشور تا آن زمان به خود ندیده بود.' },
          { t: 'p', x: 'And women were given the vote. They could stand for parliament, and did. The legal age of marriage was raised, family law was reformed to give women rights in divorce and custody, and by the 1970s Iranian women were serving as ministers, judges, ambassadors, doctors and pilots.', fa: 'زنان نیز حق رأی به دست آوردند. می‌توانستند برای نمایندگی مجلس نامزد شوند، و چنین کردند. سن قانونی ازدواج افزایش یافت و قوانین خانواده اصلاح شد تا زنان از حقوق بیشتری در زمینه طلاق و حضانت برخوردار شوند. تا دهه ۱۳۵۰، زنان ایرانی در مقام وزیر، قاضی، سفیر، پزشک و خلبان فعالیت می‌کردند.' },
          { t: 'pull', x: 'Within a decade Iran had gone from the edge of the modern world to a seat at its table.', fa: 'ایران در فاصله یک دهه، از حاشیه جهان مدرن به جایگاهی در میان قدرت‌های آن رسید.' },
          { t: 'p', x: 'With the oil revenues of the 1970s the money arriving in the country was extraordinary. Iran bought advanced technology, built an air force among the most capable anywhere, hosted world leaders, and was spoken of as a coming power. For a great many Iranians those years were the best their families had ever had.', fa: 'با افزایش درآمدهای نفتی در دهه ۱۳۵۰، حجم پولی که وارد کشور می‌شد بی‌سابقه بود. ایران فناوری‌های پیشرفته خرید، یکی از قدرتمندترین نیروهای هوایی جهان را ساخت، میزبان رهبران کشورهای مختلف شد و از آن به‌عنوان قدرتی نوظهور در عرصه جهانی یاد می‌کردند. برای بسیاری از ایرانیان، آن سال‌ها بهترین دورانی بود که خانواده‌هایشان تا آن زمان تجربه کرده بودند.' },
          { t: 'div' },
          { t: 'h', x: 'What people experienced', fa: 'آنچه مردم تجربه کردند' },
          { t: 'p', x: 'A programme that large touches everyone differently, and the reactions to it varied enormously depending on who you were.', fa: 'برنامه‌ای با چنین ابعادی، زندگی آدم‌ها را به شکل‌های متفاوتی تحت تأثیر قرار می‌دهد؛ و واکنش‌ها به آن نیز، بسته به اینکه چه کسی و از چه جایگاهی بودید، تفاوت بسیاری داشت.' },
          { t: 'boxes', items: [
            { title: 'Many families', titleFa: 'خیلی از خانواده‌ها', x: 'Rose. Land of their own, schooling for their children, work in the new industries, and lives visibly better than their parents had.', fa: 'پیشرفت کردند. صاحب زمین شدند، فرزندانشان به مدرسه رفتند، در صنایع تازه‌تأسیس مشغول به کار شدند و زندگی‌ای داشتند که آشکارا از زندگی نسل پیشینشان بهتر بود.' },
            { title: 'Landowners', titleFa: 'زمین‌داران', x: 'Large holdings were broken up. A class that had held land and influence for generations lost much of both.', fa: 'املاک بزرگ تجزیه و تقسیم شد. طبقه‌ای که نسل‌ها صاحب زمین و نفوذ بود، بخش بزرگی از هر دو را از دست داد.' },
            { title: 'Some farmers', titleFa: 'برخی از کشاورزان', x: 'Received plots too small to support a family, with little credit to work them. Many sold and moved to the cities, arriving with nothing.', fa: 'قطعه‌زمین‌هایی دریافت کردند که برای تأمین زندگی یک خانواده کافی نبود و منابع مالی چندانی هم برای کشت و بهره‌برداری از آن در اختیارشان نبود. بسیاری زمین خود را فروختند و راهی شهرها شدند، بی‌آنکه چیزی جز دست خالی با خود داشته باشند.' },
            { title: 'The clergy', titleFa: 'روحانیت', x: 'Objected to female suffrage, and to land reform reaching religious endowments. Some read the wider programme as reducing their place in Iranian life.', fa: 'با حق رأی زنان و نیز با تسری اصلاحات ارضی به موقوفات مخالفت کردند. برخی، مجموعه این اصلاحات را تلاشی برای کاستن از جایگاه روحانیت در زندگی اجتماعی و سیاسی ایران می‌دانستند.' },
            { title: 'The secular left', titleFa: 'چپ سکولار', x: 'Argued that change handed down from a throne, without a corresponding widening of political life, was incomplete.', fa: 'استدلال می‌کرد که تغییراتی که از سوی سلطنت و از بالا به جامعه تحمیل می‌شود، اگر با گشایش هم‌زمان فضای سیاسی همراه نباشد، ناقص خواهد بود.' },
          ] },
          { t: 'p', x: 'The cities grew very fast, faster than housing or services could follow. The gap between those doing well from the boom and those newly arrived and struggling became visible in a way that was difficult to explain away, and that gap did more to shape what came next than any argument about doctrine.', fa: 'شهرها با سرعتی بسیار زیاد گسترش یافتند؛ سریع‌تر از آنکه ساخت مسکن و گسترش خدمات بتواند هم‌پای این رشد پیش برود. شکاف میان کسانی که از رونق اقتصادی بهره‌مند شده بودند و تازه‌واردانی که برای گذران زندگی تقلا می‌کردند، روزبه‌روز آشکارتر شد؛ شکافی که دیگر نمی‌شد به‌سادگی نادیده‌اش گرفت یا برایش توجیهی آورد. و همین شکاف، بیش از هر بحث و جدل نظری، در شکل‌دادن به آنچه بعدتر رخ داد نقش داشت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A cleric in exile', fa: 'روحانی‌ای در تبعید' },
          { t: 'img', key: 'khomeini-exile' },
          { t: 'p', x: 'Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963, objecting in particular to women voting and to land reform touching religious endowments. He was arrested, and his arrest set off large riots in Qom and Tehran.', fa: 'روح‌الله خمینی، از روحانیان بلندپایه قم، در سال ۱۳۴۲ «انقلاب سفید» را محکوم کرد و به‌ویژه به حق رأی زنان و گسترش اصلاحات ارضی به موقوفات اعتراض داشت. او بازداشت شد و بازداشتش به شورش‌های گسترده‌ای در قم و تهران انجامید.' },
          { t: 'p', x: 'In 1964 he was expelled from the country. That decision is worth pausing on: he could have been imprisoned indefinitely, and instead he was put on a plane.', fa: 'در سال ۱۳۴۳ از کشور تبعید شد. این تصمیم درنگی کوتاه می‌طلبد: می‌توانستند او را برای مدتی نامحدود در زندان نگه دارند، اما به‌جای آن، سوار هواپیما شد و از کشور خارجش کردند.' },
          { t: 'p', x: 'He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes and carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no practical way to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in it.', fa: 'چهارده سال بعد را ابتدا در ترکیه، سپس در نجفِ عراق و بعد، برای مدتی کوتاه، در حومه پاریس گذراند و در تمام این سال‌ها به فعالیت خود ادامه داد. سخنرانی‌هایش روی نوار کاست ضبط می‌شد، مسافران و زائران آن‌ها را به ایران می‌آوردند، نوارها تکثیر می‌شدند و دست‌به‌دست می‌گشتند. در عمل، راهی برای جلوگیری از جابه‌جایی نواری که در جیب کت کسی گذاشته شده بود وجود نداشت. تا اواخر دهه ۱۳۵۰، مردی که بیش از یک دهه پا به ایران نگذاشته بود، به یکی از شنیده‌شده‌ترین صداهای کشور تبدیل شده بود.' },
          { t: 'markline', x: 'Exile removed him from Iran. It did not remove him from Iranian ears.', fa: 'تبعید او را از ایران دور کرد، اما صدایش را از گوش ایرانیان دور نکرد.' },
          { t: 'p', x: 'Political life in those years ran within limits. SAVAK, the national intelligence and security organisation founded in 1957, handled internal security and counter-intelligence, and open opposition movements operated with difficulty. Religious spaces, meanwhile, kept their own life and their own gatherings, which is part of why the mosque networks proved so effective when 1978 came.', fa: 'زندگی سیاسی در آن سال‌ها در چارچوبی محدود جریان داشت. ساواک، سازمان اطلاعات و امنیت کشور که در سال ۱۳۳۵ تأسیس شده بود، مسئولیت امنیت داخلی و ضداطلاعات را بر عهده داشت و جریان‌های مخالفِ علنی به‌سختی می‌توانستند فعالیت کنند. در همین حال، محافل مذهبی زندگی و گردهمایی‌های خودشان را حفظ کرده بودند؛ و همین یکی از دلایلی بود که شبکه مساجد در سال ۱۳۵۷ توانست چنین نقش مؤثری ایفا کند.' },
          { t: 'div' },
          { t: 'h', x: 'The year it broke', fa: 'سالی که همه‌چیز از هم گسست' },
          { t: 'p', x: 'In January 1978 a newspaper article attacking Khomeini prompted protests in Qom. In Shia practice the dead are mourned again on the fortieth day, so each funeral produced another gathering forty days later, and each gathering produced the next. The cycle ran through the year and grew each time.', fa: 'در دی‌ماه ۱۳۵۶، انتشار مقاله‌ای در یکی از روزنامه‌ها که به خمینی حمله کرده بود، اعتراض‌هایی را در قم برانگیخت. در سنت شیعه، برای درگذشتگان در چهلمین روز نیز مراسمی برگزار می‌شود. به این ترتیب، هر مراسم چهل روز بعد به گردهمایی دیگری می‌انجامید و هر گردهمایی نیز زمینه‌ساز گردهمایی بعدی می‌شد. این چرخه در طول سال ادامه پیدا کرد و هر بار گسترده‌تر شد.' },
          { t: 'p', x: 'On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it a negotiated settlement was much harder to reach. Strikes spread through the oil industry, the bazaar and the civil service. By December the country had largely stopped working.', fa: 'در ۱۷ شهریور ۱۳۵۷، نیروهای نظامی در میدان ژاله تهران به سوی جمعیت بزرگی از معترضان آتش گشودند. این روز بعدها به «جمعه سیاه» معروف شد و پس از آن، رسیدن به یک راه‌حل از طریق مذاکره بسیار دشوارتر شد. اعتصاب‌ها به صنعت نفت، بازار و دستگاه‌های دولتی کشیده شد و تا آذرماه، بخش بزرگی از کشور عملاً از کار افتاده بود.' },
          { t: 'img', key: 'shah-departure' },
          { t: 'p', x: 'On 16 January 1979 the Shah left Iran. Photographs from that morning show him weeping on the tarmac, something no one had seen from him before. He had spent thirty-seven years on the throne and had built much of what stood around him, and he left rather than remain somewhere he was no longer wanted, and rather than turn the army fully on the crowds.', fa: 'در ۲۶ دی ۱۳۵۷، شاه از ایران رفت. عکس‌های آن صبح او را در حالی نشان می‌دهند که روی باند فرودگاه گریه می‌کند؛ چیزی که پیش از آن کسی از او ندیده بود. سی‌وهفت سال بر تخت سلطنت نشسته بود و بخش بزرگی از آنچه در اطرافش ساخته شده بود، حاصل همان دوران بود. با این حال، رفت؛ به‌جای آنکه در کشوری بماند که دیگر او را نمی‌خواست، و به‌جای آنکه ارتش را تمام‌قد به روی جمعیت به حرکت درآورد.' },
          { t: 'quotebig', x: 'He did not fall in a battle. He walked out of a country that had stopped seeing him.', fa: 'در میدان نبرد سقوط نکرد. از کشوری بیرون رفت که دیگر او را به چشم حاکم خود نمی‌دید.' },
          { t: 'p', x: 'On 1 February Khomeini flew into Tehran and several million people came out to meet him. In April a referendum was held on becoming an Islamic republic, and the result was overwhelming.', fa: 'در ۱۲ بهمن، خمینی با هواپیما به تهران آمد و چند میلیون نفر برای استقبال از او به خیابان‌ها آمدند. در فروردین، همه‌پرسی درباره تبدیل کشور به جمهوری اسلامی برگزار شد و نتیجه قاطع بود.' },
          { t: 'p', x: 'One thing about that moment is often forgotten. The coalition that removed the monarchy was extremely broad: communists, liberal nationalists, bazaar merchants, students, clerics, and a great many people with no politics at all who simply wanted something different. Within two years it was not broad at all. What happened in between is the next chapter.', fa: 'یک نکته درباره آن دوره اغلب از یاد می‌رود. ائتلافی که سلطنت را کنار زد، بسیار گسترده بود: کمونیست‌ها، ملی‌گرایان لیبرال، بازاری‌ها، دانشجویان، روحانیان و خیلی‌های دیگری که اصلاً کاری به سیاست نداشتند و فقط می‌خواستند اوضاع طور دیگری باشد. دو سال بعد، دیگر خبری از آن گستردگی نبود. آنچه در این فاصله اتفاق افتاد، موضوع فصل بعد است.' },
        ] },
      ],
    },
    {
      key: 'mi2',
      title: 'The New Order', titleFa: 'نظم تازه',
      subtitle: '1979 - 1981', titleFa: '۱۳۵۷ تا ۱۳۶۰',
      pages: [
        { blocks: [
          { t: 'img', key: 'new-order' },
          { t: 'p', x: 'Revolutionary courts were established within weeks. They sat quickly, often at night, frequently without defence counsel, and sentences were carried out at once.', fa: 'دادگاه‌های انقلاب ظرف چند هفته تشکیل شدند. رسیدگی‌ها سریع انجام می‌شد، اغلب شب‌ها و بیشتر وقت‌ها بدون حضور وکیل مدافع؛ و حکم‌ها نیز بی‌درنگ اجرا می‌شدند.' },
          { t: 'p', x: 'The armed forces went first. Iran\u2019s most senior officers, generals who had spent their entire working lives in the service of the country, were brought before the courts one after another and shot. Many of them had trained abroad, commanded the country\u2019s defence for decades, and had no political role at all. The charge, broadly, was that they had served.', fa: 'اول از همه سراغ ارتش رفتند. بلندپایه‌ترین افسران ایران، سرلشکرهایی که تمام عمر کاری‌شان را در خدمت کشور گذرانده بودند، یکی پس از دیگری به دادگاه برده و تیرباران شدند. خیلی‌هایشان در خارج آموزش دیده بودند، دهه‌ها فرماندهی دفاع کشور را بر عهده داشتند، و هیچ نقش سیاسی‌ای نداشتند. اتهام، در یک کلام، این بود که خدمت کرده بودند.' },
          { t: 'p', x: 'The purge widened from there. Ministers, provincial governors, senior police, court officials, and men who had held office years earlier and retired quietly. In practice almost anything that still carried the mark of the old order was a target, and the reach of that went further than people expect: the Shah\u2019s own horses were killed, for no reason beyond whose horses they had been.', fa: 'پاکسازی از همان‌جا گسترده‌تر شد. وزیران، استانداران، فرماندهان شهربانی، مقام‌های دربار، و کسانی که سال‌ها پیش‌تر مقامی داشتند و بی‌سروصدا بازنشسته شده بودند. در عمل تقریباً هر چیزی که هنوز نشانی از نظم قدیم داشت هدف بود، و دامنه‌اش از آنچه تصور می‌شود فراتر رفت: اسب‌های خود شاه را کشتند، بی‌هیچ دلیلی جز اینکه اسب‌های چه کسی بوده‌اند.' },
          { t: 'markline', x: 'It was not only people who were being removed. It was every trace.', fa: 'فقط آدم‌ها را کنار نمی‌زدند؛ هر ردی را هم پاک می‌کردند.' },
          { t: 'p', x: 'The effect on the military was severe and immediate. Thousands of officers were dismissed, imprisoned or executed, and the air force in particular lost most of its senior command in the space of a year. The consequences of that arrived faster than anyone had planned for, and they are the subject of the chapter after this one.', fa: 'تأثیر این پاکسازی بر ارتش شدید و فوری بود. هزاران افسر برکنار، زندانی یا اعدام شدند و نیروی هوایی، به‌ویژه، در فاصله یک سال بخش بزرگی از فرماندهان ارشد خود را از دست داد. پیامدهای این اتفاق خیلی زودتر از آنچه کسی انتظار داشت خودشان را نشان دادند، و موضوع فصل بعدی همین کتاب‌اند.' },
          { t: 'div' },
        ] },
        { blocks: [
          { t: 'h', x: 'Hoveyda', fa: 'هویدا' },
          { t: 'img', key: 'hoveyda-portrait' },
          { t: 'ptext', x: '{{hoveyda|Amir-Abbas Hoveyda}} was prime minister of Iran for twelve years, from 1965 to 1977, the longest tenure in the country\u2019s history. He was the Shah\u2019s right hand through the years when Iran changed fastest, and a great deal of what was built in that period passed across his desk.', fa: '{{hoveyda|امیرعباس هویدا}} دوازده سال نخست‌وزیر ایران بود، از ۱۳۴۳ تا ۱۳۵۶؛ طولانی‌ترین دورهٔ نخست‌وزیری در تاریخ این کشور. در سال‌هایی که ایران سریع‌تر از همیشه تغییر می‌کرد، دست راست شاه بود، و بخش بزرگی از آنچه در آن دوره ساخته شد از روی میز او گذشت.' },
          { t: 'p', x: 'The expansion of the universities, the growth of the health service into the provinces, the industrial programme, the arrival of a modern civil service: he ran the machinery of all of it. He was educated in Beirut, Brussels and Paris, spoke several languages, was known for a pipe and an orchid in his lapel, and was a familiar and largely liked figure in Iranian public life for over a decade.', fa: 'گسترش دانشگاه‌ها، رساندن خدمات بهداشتی به استان‌ها، برنامهٔ صنعتی، و شکل گرفتن یک نظام اداری مدرن؛ چرخ همهٔ اینها را او می‌گرداند. در بیروت و بروکسل و پاریس درس خوانده بود، به چند زبان حرف می‌زد، به پیپ و گل ارکیدهٔ روی یقه‌اش شناخته می‌شد، و بیش از یک دهه چهره‌ای آشنا و تا حد زیادی محبوب در زندگی عمومی ایران بود.' },
          { t: 'p', x: 'He was held by the new government after the revolution. He was given no lawyer, and so he spoke for himself. He was tried and executed on the same day, 7 April 1979.', fa: 'پس از انقلاب، حکومت تازه او را بازداشت کرد. وکیلی به او ندادند، پس خودش از خودش دفاع کرد. در ۱۸ فروردین ۱۳۵۸ محاکمه و همان روز اعدام شد.' },
          { t: 'p', x: 'He had had opportunities to leave the country and had not taken them.', fa: 'فرصت‌هایی برای رفتن از کشور داشت و از هیچ‌کدامشان استفاده نکرد.' },
          { t: 'quotebig', x: 'He answered for twelve years of government in a single afternoon, alone, and without counsel.', fa: 'پاسخِ دوازده سال حکومت را در یک بعدازظهر داد؛ تنها، و بدون وکیل.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Four hundred and forty-four days', fa: 'چهارصد و چهل و چهار روز' },
          { t: 'img', key: 'embassy' },
          { t: 'p', x: 'On 4 November 1979 several hundred student militants climbed the walls of the United States embassy in Tehran. They had planned a symbolic sit-in lasting a few days. It lasted fourteen months and became one of the defining international crises of the century.', fa: 'در ۱۳ آبان ۱۳۵۸، چند صد دانشجوی انقلابی از دیوار سفارت آمریکا در تهران بالا رفتند. برنامه‌شان یک تحصن نمادین چندروزه بود. چهارده ماه طول کشید و به یکی از بحران‌های تعیین‌کنندهٔ آن قرن بدل شد.' },
          { t: 'p', x: 'The immediate cause was the Shah. He had been admitted to the United States in October for cancer treatment, and to many in Tehran that looked like the beginning of the same story as 1953, when American and British intelligence had helped return him to the throne. The fear that he would be restored a second time was the spark.', fa: 'علت فوری‌اش شاه بود. مهر آن سال برای درمان سرطان به آمریکا راه داده شده بود، و برای خیلی‌ها در تهران این آغاز همان داستان سال ۱۳۳۲ به نظر می‌رسید؛ وقتی سرویس‌های اطلاعاتی آمریکا و بریتانیا به بازگرداندنش به تخت کمک کردند. ترس از اینکه بار دوم هم برگردانده شود، جرقه را زد.' },

          { t: 'h', x: 'How it unfolded', fa: 'ماجرا چطور پیش رفت' },
          { t: 'timeline', items: [
            { year: '4 Nov 1979', label: 'The embassy is taken', x: 'Students scale the walls and occupy the compound. Sixty-six Americans are held. Thirteen women and African Americans are released within weeks, and one more later on medical grounds, leaving fifty-two.' },
            { year: 'Nov 1979', label: 'Six get out', x: 'Six embassy staff escape during the takeover and shelter in the Canadian ambassador\u2019s residence. They are eventually brought out of Iran on Canadian passports, in an operation run with the CIA that stayed classified for eighteen years.' },
            { year: '24 Apr 1980', label: 'Operation Eagle Claw', x: 'An American rescue attempt using helicopters and transport aircraft is launched. It fails in the Iranian desert at a staging point before reaching Tehran. A helicopter and a transport plane collide, and eight American servicemen are killed. The mission is aborted.' },
            { year: 'Sept 1980', label: 'The war begins', x: 'Iraq invades Iran, and the hostages become a secondary concern for a government now fighting for survival.' },
            { year: '20 Jan 1981', label: 'Released', x: 'After months of negotiation through Algerian intermediaries, the fifty-two are freed. They are released minutes after Ronald Reagan is sworn in as president, having been held for four hundred and forty-four days.' },
          ] },

          { t: 'p', x: 'Above them stood Khomeini, who had no interest in an early settlement. The crisis was doing useful work at home, and every month it continued was a month the new order consolidated. So the talks went nowhere, month after month, with Carter effectively confined to the White House by a problem he could not solve. By the spring he had run out of patience and reached for the only option left, which was the rescue that failed in the desert.', fa: 'بالای سرشان خمینی بود که هیچ علاقه‌ای به حل زودهنگام ماجرا نداشت. بحران در داخل کار مفیدی می‌کرد، و هر ماه که ادامه می‌یافت ماهی بود که نظم تازه محکم‌تر می‌شد. پس گفت‌وگوها ماه از پی ماه به جایی نرسید، و کارتر عملاً در کاخ سفید گرفتار مسئله‌ای شد که نمی‌توانست حلش کند. تا بهار صبرش تمام شد و به تنها گزینهٔ باقی‌مانده دست برد؛ همان عملیات نجاتی که در کویر شکست خورد.' },

          { t: 'p', x: 'The timing of the release, to the minute, was not an accident. It was the last word in a long argument with an administration that had already lost an election over it.', fa: 'زمان آزادی گروگان‌ها، دقیقه به دقیقه، تصادفی نبود. حرف آخر در یک کشمکش طولانی با دولتی بود که پیش‌تر بر سر همین ماجرا انتخابات را باخته بود.' },
          { t: 'p', x: 'It left something on the other side too. A generation of Americans learned about Iran, and about the Muslim world more broadly, through fourteen months of blindfolded men on the evening news. A great deal of what came afterwards was read through that.', fa: 'در آن سوی ماجرا هم چیزی به جا گذاشت. نسلی از آمریکایی‌ها ایران را، و به‌طور کلی‌تر جهان اسلام را، از خلال چهارده ماه تصویر مردانِ چشم‌بسته در اخبار شامگاهی شناختند. بسیاری از آنچه بعدها آمد، از پس همان تصویر خوانده شد.' },

          { t: 'p', x: 'Whatever else the crisis did, it set the relationship between Iran and the United States for the next four decades, and it gave the new government a permanent external adversary, which is a useful thing for any government still consolidating power at home.', fa: 'این بحران هر کار دیگری هم کرده باشد، رابطهٔ ایران و آمریکا را برای چهار دههٔ بعد تعیین کرد، و به حکومت تازه یک دشمن خارجی دائمی داد؛ چیزی که برای هر حکومتی که هنوز دارد قدرتش را در داخل تثبیت می‌کند به کار می‌آید.' },
          { t: 'div' },
          { t: 'h', x: 'The constitution', fa: 'قانون اساسی' },
          { t: 'p', x: 'The constitution ratified in 1979 created an elected president and an elected parliament, and above them the velayat-e faqih: a Supreme Leader, a cleric, holding final authority over the armed forces, the judiciary, the broadcasters, and the vetting of who may stand for election. Iran would have votes, and it would also have someone standing above their results. Khomeini took the post and held it until his death.', fa: 'قانون اساسی‌ای که در سال ۱۳۵۸ تصویب شد، رئیس‌جمهور و مجلسِ انتخابی ایجاد کرد، و بالای سر هر دو، ولایت فقیه را: رهبری روحانی با اختیار نهایی بر نیروهای مسلح، قوهٔ قضاییه، صداوسیما، و تأیید صلاحیت کسانی که می‌توانند نامزد شوند. ایران رأی‌گیری داشت، و در عین حال کسی را هم داشت که بالای سر نتیجهٔ رأی‌ها می‌ایستاد. خمینی این جایگاه را گرفت و تا پایان عمرش نگه داشت.' },
          { t: 'p', x: 'By 1981 the other partners in the revolution were gone. The first president was impeached and left the country in disguise. The left was suppressed, its organisations broken up and its members imprisoned. The coalition of 1979 had narrowed to a single faction of itself, and that faction now held everything.', fa: 'تا سال ۱۳۶۰، دیگر شریکان انقلاب رفته بودند. نخستین رئیس‌جمهور برکنار شد و با تغییر قیافه از کشور خارج شد. چپ سرکوب شد، تشکیلاتش از هم پاشید و اعضایش به زندان افتادند. ائتلاف سال ۱۳۵۷ به یک جناح از خودش تقلیل یافته بود، و حالا همان جناح همه‌چیز را در دست داشت.' },
        ] },
      ],
    },
    {
      key: 'mi3',
      title: 'The War', titleFa: 'جنگ',
      subtitle: '1980 - 1988', titleFa: '۱۳۵۹ تا ۱۳۶۷',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 22 September 1980 Iraq invaded. Saddam Hussein had several reasons, and they reinforced one another.', fa: 'در ۳۱ شهریور ۱۳۵۹، عراق به ایران حمله کرد. صدام حسین چند دلیل داشت، و این دلایل یکدیگر را تقویت می‌کردند.' },
          { t: 'boxes', items: [
            { title: 'The waterway', titleFa: 'آبراه', x: 'The Shatt al-Arab, the Arvand Rud in Persian, is the outlet both countries depend on. A 1975 agreement had divided it down the middle. Saddam wanted the whole of it.', fa: 'اروندرود، راه خروجی‌ای که هر دو کشور به آن وابسته‌اند. قرارداد ۱۹۷۵ آن را از وسط میان دو کشور تقسیم کرده بود. صدام همه‌اش را می‌خواست.' },
            { title: 'Fear', titleFa: 'ترس', x: 'Iraq had a Shia majority ruled by a secular Sunni party. A revolution next door that spoke of exporting itself was an existential worry.', fa: 'عراق اکثریتی شیعه داشت که یک حزب سنیِ غیرمذهبی بر آن حکومت می‌کرد. انقلابی در همسایگی که از صدور خودش حرف می‌زد، نگرانی‌ای بود در حد بقا.' },
            { title: 'Opportunity', titleFa: 'فرصت', x: 'Iran had just purged its officer corps, was isolated internationally, and was in open political turmoil. It looked like the easiest moment there would ever be.', fa: 'ایران تازه کادر افسری‌اش را پاکسازی کرده بود، در سطح بین‌المللی منزوی بود، و درگیر آشوب سیاسی آشکار. به نظر می‌رسید آسان‌ترین لحظهٔ ممکن است.' },
          ] },
          { t: 'p', x: 'The calculation was wrong. Instead of fracturing, Iran closed ranks. Khorramshahr fell after brutal street fighting and was retaken in 1982. By that summer Iraqi forces were largely back across the border, and Saddam offered a ceasefire.', fa: 'این حساب غلط از آب درآمد. ایران به جای آنکه از هم بپاشد، صف‌هایش را فشرده کرد. خرمشهر پس از جنگ خیابانی هولناکی سقوط کرد و در خرداد ۱۳۶۱ آزاد شد. تا آن تابستان، نیروهای عراقی تا حد زیادی به آن سوی مرز بازگشته بودند و صدام آتش‌بس پیشنهاد داد.' },
          { t: 'p', x: 'Iran refused it, and chose to carry the war into Iraq. That decision extended the war by six years and accounts for the majority of its dead.', fa: 'ایران نپذیرفت و تصمیم گرفت جنگ را به داخل خاک عراق ببرد. همین تصمیم جنگ را شش سال دیگر کش داد و بیشتر کشته‌های آن مربوط به همین شش سال است.' },
          { t: 'div' },
          { t: 'h', x: 'How it was fought', fa: 'چگونه جنگیده شد' },
          { t: 'p', x: 'Iran had numbers and little equipment; Iraq had equipment and fewer men. Iran fought accordingly, with mass infantry assaults on fortified positions. The Basij, a volunteer militia, supplied much of that infantry, and it included boys of fourteen and fifteen. Some were given plastic keys to wear, said to open the gates of paradise.', fa: 'ایران نیرو داشت و تجهیزات کم؛ عراق تجهیزات داشت و نیروی کمتر. ایران متناسب با همین جنگید: حملهٔ گستردهٔ پیاده‌نظام به مواضع مستحکم. بخش بزرگی از این پیاده‌نظام را بسیج تأمین می‌کرد، نیرویی داوطلب، و در میانشان پسرهای چهارده و پانزده ساله هم بودند. به بعضی‌هایشان کلیدهای پلاستیکی می‌دادند که می‌گفتند در بهشت را باز می‌کند.' },
          { t: 'p', x: 'Iraq used chemical weapons repeatedly, against Iranian soldiers at the front and against civilians. In March 1988 the Kurdish town of Halabja was attacked with nerve and mustard agents and several thousand of its people died in a day. Tens of thousands of Iranian veterans still live with the effects of gas exposure.', fa: 'عراق بارها از سلاح شیمیایی استفاده کرد؛ هم علیه سربازان ایرانی در جبهه و هم علیه غیرنظامیان. در اسفند ۱۳۶۶، شهر کردنشین حلبچه با گاز اعصاب و خردل بمباران شد و چند هزار نفر از مردمش در یک روز کشته شدند. ده‌ها هزار جانباز ایرانی هنوز با عوارض گاز شیمیایی زندگی می‌کنند.' },
          { t: 'p', x: 'Iraq was supplied through the war by the Soviet Union, France, and a number of other states, and received intelligence assistance from the United States. Iran, under embargo, bought what it could wherever it could, including, in one arrangement that became a scandal in Washington, from the United States itself.', fa: 'در طول جنگ، شوروی و فرانسه و چند کشور دیگر به عراق تسلیحات رساندند، و آمریکا اطلاعات در اختیارش گذاشت. ایران که زیر تحریم بود، هر چه می‌توانست از هر جا که می‌شد خرید؛ از جمله، در معامله‌ای که در واشینگتن به رسوایی انجامید، از خود آمریکا.' },
          { t: 'p', x: 'The war reached the Gulf. Both sides attacked shipping. In July 1988 an American warship shot down an Iranian civilian airliner over the Persian Gulf, killing all two hundred and ninety people aboard. The United States said it had been mistaken for a fighter.', fa: 'جنگ به خلیج فارس هم رسید. هر دو طرف به کشتی‌ها حمله کردند. در تیر ۱۳۶۷، یک ناو آمریکایی هواپیمای مسافربری ایران را بر فراز خلیج فارس سرنگون کرد و هر دویست و نود سرنشین آن کشته شدند. آمریکا گفت آن را با یک جنگنده اشتباه گرفته است.' },
          { t: 'h', x: 'What eight years came to', fa: 'هشت سال، به کجا رسید' },
          { t: 'h', x: 'What eight years came to', fa: 'هشت سال، به کجا رسید' },
          { t: 'numstat', items: [
            { n: '8', label: 'years of war' },
            { n: '~1m', label: 'dead, both countries' },
            { n: '0', label: 'borders changed' },
          ] },
          { t: 'p', x: 'In July 1988 Iran accepted United Nations Resolution 598. Khomeini said that doing so was more deadly to him than drinking poison. The border ended where it had begun.', fa: 'در تیر ۱۳۶۷، ایران قطعنامهٔ ۵۹۸ سازمان ملل را پذیرفت. خمینی گفت پذیرفتنش برای او از سر کشیدن جام زهر کشنده‌تر است. مرز همان‌جا تمام شد که از آن آغاز شده بود.' },
          { t: 'div' },
          { t: 'h', x: 'What it did to the country', fa: 'با کشور چه کرد' },
          { t: 'p', x: 'The border provinces took the worst of it. Khorramshahr, a city of more than a hundred thousand, was fought through street by street and left largely rubble; Iranians called it Khuninshahr afterwards, the city of blood. Abadan, Ahvaz, Dezful and dozens of smaller towns were shelled for years. Whole villages along the frontier were emptied and never rebuilt.', fa: 'بیشترین آسیب به استان‌های مرزی رسید. خرمشهر، شهری با بیش از صد هزار نفر جمعیت، خیابان به خیابان جنگیده شد و تقریباً به آوار بدل شد؛ ایرانی‌ها از آن پس خونین‌شهر صدایش کردند. آبادان و اهواز و دزفول و ده‌ها شهر کوچک‌تر سال‌ها زیر گلوله‌باران بودند. روستاهای کاملی در امتداد مرز خالی شدند و دیگر هرگز ساخته نشدند.' },
          { t: 'p', x: 'Something close to two million people were displaced inside their own country. Many spent years in temporary housing in cities that had no room for them, and a great many never went home at all, because home had been flattened or the land was still mined. Parts of that border remain uncleared today, and people are still injured on it.', fa: 'نزدیک دو میلیون نفر در داخل کشور خودشان آواره شدند. خیلی‌ها سال‌ها در مسکن موقت ماندند، در شهرهایی که جا برایشان نداشت، و شمار زیادی هرگز به خانه برنگشتند؛ چون خانه با خاک یکسان شده بود یا زمین هنوز مین داشت. بخش‌هایی از آن مرز تا امروز پاک‌سازی نشده و هنوز مردم روی آن آسیب می‌بینند.' },
          { t: 'p', x: 'The economy was reorganised entirely around the war. Oil terminals were bombed and exports collapsed. Rationing came in for bread, meat, petrol and cooking oil, and stayed. Everything not needed for the front stopped being built. The reconstruction that followed took the whole of the next decade and much of the money that might have gone anywhere else.', fa: 'اقتصاد یکسره حول جنگ بازآرایی شد. پایانه‌های نفتی بمباران شد و صادرات فرو ریخت. کوپن برای نان و گوشت و بنزین و روغن آمد، و ماند. هر چیزی که جبهه به آن نیاز نداشت، ساختنش متوقف شد. بازسازیِ پس از جنگ تمام دههٔ بعد را گرفت، و بخش بزرگی از پولی را که می‌توانست جای دیگری خرج شود.' },
          { t: 'p', x: 'And an entire generation came home injured, or did not come home. Iran still supports hundreds of thousands of war-disabled, including men whose lungs were destroyed by gas in the 1980s and who have been dying of it slowly ever since.', fa: 'یک نسل کامل یا زخمی به خانه برگشت، یا اصلاً برنگشت. ایران هنوز از صدها هزار جانباز جنگ نگهداری می‌کند؛ از جمله مردانی که ریه‌شان در دههٔ ۶۰ با گاز شیمیایی از بین رفت و از آن روز تا حالا دارند به‌آرامی از همان می‌میرند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The pilots', fa: 'خلبان‌ها' },
          { t: 'p', x: 'When the war began, Iran\u2019s air force was the one part of its military that could not be improvised. The aircraft were American, the training was American, and the men who could fly them had all been trained under the Shah. Many of them were, at that moment, in prison.', fa: 'وقتی جنگ شروع شد، نیروی هوایی تنها بخشی از ارتش ایران بود که نمی‌شد سرِ هم‌بندی‌اش کرد. هواپیماها آمریکایی بودند، آموزش آمریکایی بود، و کسانی که می‌توانستند این هواپیماها را برانند همه در دورهٔ شاه آموزش دیده بودند. خیلی‌هایشان در همان لحظه در زندان بودند.' },
          { t: 'p', x: 'They were released and sent to fly. Iranian pilots flew combat missions in the first weeks of the war that are still studied, including a large strike on Iraqi airbases the day after the invasion. Their skill is not in dispute; it kept Iran in the war during the months when little else could.', fa: 'آزادشان کردند و فرستادندشان که پرواز کنند. خلبان‌های ایرانی در هفته‌های اول جنگ عملیات‌هایی انجام دادند که هنوز موضوع مطالعه‌اند؛ از جمله حملهٔ بزرگ به پایگاه‌های هوایی عراق، یک روز پس از آغاز حمله. در مهارتشان بحثی نیست؛ همین مهارت بود که در ماه‌هایی که چیز دیگری از دست کسی برنمی‌آمد، ایران را در جنگ نگه داشت.' },
          { t: 'markline', x: 'They were let out of prison to fly, and a number of them were returned to it afterwards.', fa: 'از زندان بیرونشان آوردند تا پرواز کنند، و شماری از آنها را بعد دوباره به همان‌جا برگرداندند.' },
          { t: 'p', x: 'Some were arrested again during and after the war, on charges of coup plotting or of loyalty to the former government. Some were executed. Others were dismissed and never flew again. The reasoning was that their training and their oath had belonged to another Iran, and that this could not be relied upon whatever they had just done.', fa: 'بعضی‌هایشان در طول جنگ و پس از آن دوباره بازداشت شدند، به اتهام طراحی کودتا یا وفاداری به حکومت پیشین. بعضی اعدام شدند. بعضی دیگر برکنار شدند و دیگر هرگز پرواز نکردند. استدلال این بود که آموزش و سوگندشان به ایرانی دیگر تعلق داشته، و هر کاری هم که همین حالا کرده باشند، نمی‌شود روی آن حساب کرد.' },
          { t: 'div' },
          { t: 'h', x: 'The summer of 1988', fa: 'تابستان ۱۳۶۷' },
          { t: 'p', x: 'In the months after the ceasefire, prisoners already serving sentences for political offences were brought before panels and asked a short series of questions about their beliefs and loyalties. Those whose answers were judged wrong were executed. It was carried out over a few months, in prisons across the country, and the bodies were buried in unmarked graves.', fa: 'در ماه‌های پس از آتش‌بس، زندانیانی که پیش‌تر به جرم سیاسی محکوم شده بودند و دوران محکومیتشان را می‌گذراندند، مقابل هیئت‌هایی برده شدند و چند پرسش کوتاه دربارهٔ عقاید و وفاداری‌شان از آنها شد. کسانی که پاسخشان نادرست تشخیص داده شد، اعدام شدند. این کار طی چند ماه، در زندان‌های سراسر کشور انجام شد، و پیکرها در گورهای بی‌نشان دفن شدند.' },
          { t: 'p', x: 'You can imagine what those panels were. A handful of questions, asked of someone already in a cell, and any wrong answer cost a life. People who had months left of a sentence, who expected to go home, did not.', fa: 'می‌شود تصور کرد آن هیئت‌ها چه بودند. چند پرسش، از کسی که همین حالا در سلول است، و هر پاسخ نادرست به قیمت یک جان تمام می‌شد. کسانی که چند ماه از محکومیتشان مانده بود و انتظار داشتند به خانه برگردند، برنگشتند.' },
          { t: 'p', x: 'The number has never been established. Human rights organisations have documented thousands of names; some estimates run considerably higher. No official account has ever been published, and no one has been tried for it. Families were not told where the graves were, and many searched for years.', fa: 'شمارشان هرگز روشن نشد. سازمان‌های حقوق بشری هزاران نام را مستند کرده‌اند؛ برخی برآوردها بسیار بالاتر می‌رود. هیچ گزارش رسمی‌ای هرگز منتشر نشده و هیچ‌کس به خاطرش محاکمه نشده است. به خانواده‌ها نگفتند گورها کجاست، و خیلی‌ها سال‌ها دنبالش گشتند.' },
        ] },
      ],
    },
    {
      key: 'mi4',
      title: 'The Leaders Who Followed', titleFa: 'آنان که پس از او آمدند',
      subtitle: '1989 - today', titleFa: '۱۳۶۸ تا امروز',
      pages: [
        { blocks: [
          { t: 'p', x: 'Khomeini died in June 1989. Ali Khamenei, then president, was elevated to Supreme Leader, a post he still holds. The presidency, meanwhile, changed hands repeatedly, and the swings between its holders are the clearest picture of how divided the country has been about its own direction.', fa: 'خمینی در خرداد ۱۳۶۸ درگذشت. علی خامنه‌ای که آن زمان رئیس‌جمهور بود، به رهبری رسید؛ جایگاهی که هنوز در دست اوست. ریاست‌جمهوری اما بارها دست به دست شد، و نوسان میان کسانی که این مقام را داشتند، روشن‌ترین تصویر است از اینکه این کشور بر سر مسیر خودش چقدر دوپاره بوده.' },
          { t: 'timeline', items: [
            { year: '1989 - 1997', yearFa: '۱۳۶۸ تا ۱۳۷۶', label: 'Akbar Hashemi Rafsanjani', labelFa: 'اکبر هاشمی رفسنجانی', x: 'Reconstruction after the war. Pragmatic, business-minded, and willing to reopen some doors to the world. The economy grew; so did inequality and the wealth of those close to power.', fa: 'دورهٔ سازندگی پس از جنگ. عمل‌گرا، با نگاه اقتصادی، و حاضر به باز کردن دوبارهٔ بعضی درها به روی جهان. اقتصاد رشد کرد؛ نابرابری و ثروت نزدیکان قدرت هم همین‌طور.' },
            { year: '1997 - 2005', yearFa: '۱۳۷۶ تا ۱۳۸۴', label: 'Mohammad Khatami', labelFa: 'محمد خاتمی', x: 'Won nearly seventy per cent of the vote on a platform of civil society and dialogue among civilisations. Newspapers opened, students organised, and much of it was rolled back by institutions the president does not control.', fa: 'با شعار جامعهٔ مدنی و گفت‌وگوی تمدن‌ها، نزدیک هفتاد درصد آرا را گرفت. روزنامه‌ها باز شدند، دانشجویان سازمان یافتند، و بخش بزرگی از این‌ها را نهادهایی که زیر نظر رئیس‌جمهور نیستند پس گرفتند.' },
            { year: '2005 - 2013', yearFa: '۱۳۸۴ تا ۱۳۹۲', label: 'Mahmoud Ahmadinejad', labelFa: 'محمود احمدی‌نژاد', x: 'A populist from outside the clerical establishment who spoke to those the boom had left behind. Cash handouts, confrontation abroad, an accelerating nuclear programme, and the sanctions that followed it.', fa: 'پوپولیستی از بیرون دستگاه روحانیت که با کسانی حرف می‌زد که از رونق جا مانده بودند. یارانهٔ نقدی، تقابل با جهان، برنامهٔ هسته‌ای شتاب‌گرفته، و تحریم‌هایی که پشت سرش آمد.' },
            { year: '2013 - 2021', yearFa: '۱۳۹۲ تا ۱۴۰۰', label: 'Hassan Rouhani', labelFa: 'حسن روحانی', x: 'Elected to end the isolation. Negotiated the 2015 nuclear agreement, which lifted sanctions and briefly steadied the currency. The United States withdrew from it in 2018 and the recovery reversed.', fa: 'برای پایان دادن به انزوا انتخاب شد. برجام را در سال ۱۳۹۴ به سرانجام رساند؛ توافقی که تحریم‌ها را برداشت و برای مدتی کوتاه ارزش پول را ثابت نگه داشت. آمریکا در ۱۳۹۷ از آن خارج شد و آن بهبود برگشت.' },
            { year: '2021 - 2024', yearFa: '۱۴۰۰ تا ۱۴۰۳', label: 'Ebrahim Raisi', labelFa: 'ابراهیم رئیسی', x: 'A hardline judiciary figure elected on the lowest turnout in the republic\u2019s history. Died in a helicopter crash in May 2024.', fa: 'چهره‌ای تندرو از دستگاه قضایی که با کمترین میزان مشارکت در تاریخ جمهوری اسلامی انتخاب شد. در اردیبهشت ۱۴۰۳ در سقوط بالگرد کشته شد.' },
            { year: '2024 -', yearFa: '۱۴۰۳ تا کنون', label: 'Masoud Pezeshkian', labelFa: 'مسعود پزشکیان', x: 'A reformist surgeon, elected on a promise of easing restrictions and reopening talks. Took office into the hardest circumstances any Iranian president has faced.', fa: 'جراحی اصلاح‌طلب، که با وعدهٔ کم کردن محدودیت‌ها و از سرگیری مذاکرات انتخاب شد. در سخت‌ترین شرایطی که هر رئیس‌جمهور ایرانی با آن روبه‌رو شده، کار را تحویل گرفت.' },
          ] },
          { t: 'p', x: 'Across all of it the Supreme Leader and the institutions around him remained constant. Presidents in Iran arrive with mandates and discover the limits of the office; this has happened to reformists and hardliners alike.', fa: 'در سرتاسر این سال‌ها، رهبری و نهادهای پیرامونش ثابت ماندند. رئیس‌جمهورها در ایران با آرای مردم می‌آیند و بعد به حدود اختیارات این مقام پی می‌برند؛ این هم برای اصلاح‌طلب‌ها اتفاق افتاده و هم برای اصولگراها.' },
        ] },
      ],
    },
    {
      key: 'mi5',
      title: 'What Happened to the Money', titleFa: 'بر سر پول چه آمد',
      subtitle: '1979 - 2026', titleFa: '۱۳۵۷ تا ۱۴۰۴',
      pages: [
        { blocks: [
          { t: 'p', x: 'No single fact about Iran since the revolution is easier to state or harder to live with than this one. In 1979 a United States dollar bought about seventy rials. In January 2026 it bought around one and a half million.', fa: 'هیچ واقعیتی دربارهٔ ایرانِ پس از انقلاب به این سادگی گفته نمی‌شود و به این سختی زیسته نمی‌شود. در سال ۱۳۵۷، یک دلار آمریکا حدود هفتاد ریال می‌ارزید. در دی ۱۴۰۴، حدود یک و نیم میلیون ریال.' },
          { t: 'chart' },
          { t: 'p', x: 'The line does not fall evenly. It steps. Each step corresponds to something: the war, the sanctions of the 2000s, the withdrawal from the nuclear agreement in 2018, the reimposition of United Nations sanctions in September 2025, and the collapse at the end of that year.', fa: 'این نمودار یکنواخت پایین نمی‌آید؛ پله‌پله می‌افتد. هر پله به چیزی مربوط است: جنگ، تحریم‌های دههٔ ۸۰، خروج آمریکا از برجام در ۱۳۹۷، بازگشت تحریم‌های سازمان ملل در شهریور ۱۴۰۴، و سقوط پایان همان سال.' },
          { t: 'p', x: 'The causes are argued over and they are not all external. Sanctions cut oil revenue and cut Iran out of the international banking system. But the money supply also grew far faster than the economy did, subsidised exchange rates created a system where access to dollars depended on political standing rather than price, and large parts of the economy came under the control of institutions that answer to no shareholder.', fa: 'بر سر علت‌ها بحث هست، و همه‌شان هم بیرونی نیستند. تحریم درآمد نفت را قطع کرد و ایران را از نظام بانکی جهان بیرون گذاشت. اما نقدینگی هم خیلی سریع‌تر از اقتصاد رشد کرد، ارز دولتی نظامی ساخت که در آن دسترسی به دلار به جای قیمت، به جایگاه سیاسی بستگی داشت، و بخش بزرگی از اقتصاد به دست نهادهایی افتاد که به هیچ سهامداری پاسخگو نیستند.' },
          { t: 'basket' },
          { t: 'p', x: 'What that means in a household is simple enough. Salaries are paid in rials and prices track the dollar, so a wage buys less each month than it did the month before. Savings held in rials evaporate, which is why Iranians buy gold, dollars, property, and lately cryptocurrency: not as investment but as a way of not losing what they already have. Iran has an educated, capable population with an unusually high proportion of engineers and graduates, and a great many of them have left.', fa: 'معنی‌اش در یک خانه ساده است. حقوق را به ریال می‌دهند و قیمت‌ها دنبال دلار می‌روند، پس دستمزد هر ماه کمتر از ماه قبل می‌خرد. پس‌اندازی که به ریال بماند آب می‌رود، و برای همین ایرانی‌ها طلا و دلار و ملک می‌خرند و این اواخر رمزارز: نه به‌عنوان سرمایه‌گذاری، بلکه برای اینکه آنچه را دارند از دست ندهند. ایران جمعیتی تحصیل‌کرده و توانمند دارد، با سهم غیرعادی بالایی از مهندس و دانش‌آموخته، و شمار زیادی از آنها رفته‌اند.' },
          { t: 'pull', x: 'A country can be rich in oil, water, land and people, and still have a currency nobody wants to hold.', fa: 'یک کشور می‌تواند از نفت و آب و خاک و آدم غنی باشد، و باز پولی داشته باشد که هیچ‌کس نمی‌خواهد نگهش دارد.' },
        ] },
      ],
    },
    {
      key: 'mi6',
      title: 'The Streets', titleFa: 'خیابان',
      subtitle: '1999 - 2022', titleFa: '۱۳۷۸ تا ۱۴۰۱',
      pages: [
        { blocks: [
          { t: 'p', x: 'Iranians have gone out into the streets again and again, and each time the pattern has been close to the same: something breaks, it spreads faster than anyone expects, it is put down, and the quiet that follows is mistaken abroad for agreement.', fa: 'ایرانی‌ها بارها و بارها به خیابان آمده‌اند، و هر بار الگو تقریباً یکی بوده: چیزی می‌شکند، سریع‌تر از آنچه کسی انتظار دارد گسترده می‌شود، سرکوب می‌شود، و سکوتی که پس از آن می‌آید در بیرون از ایران به حساب رضایت گذاشته می‌شود.' },
          { t: 'p', x: 'What follows is not a list of failures. It is a record of people who kept going out knowing exactly what it cost.', fa: 'آنچه در پی می‌آید فهرست شکست‌ها نیست. سند کسانی است که با علم به بهایش، باز هم بیرون آمدند.' },
          { t: 'div' },
          { t: 'h', x: '1999: the dormitories', fa: '۱۳۷۸: کوی دانشگاه' },
          { t: 'p', x: 'In July 1999 a reformist newspaper was closed and students at the University of Tehran protested. On the night of 9 July, security forces and plain-clothes paramilitaries entered the student dormitories at Kuy-e Daneshgah.', fa: 'در تیر ۱۳۷۸ یک روزنامهٔ اصلاح‌طلب توقیف شد و دانشجویان دانشگاه تهران اعتراض کردند. شب ۱۸ تیر، نیروهای امنیتی و لباس‌شخصی‌ها وارد خوابگاه کوی دانشگاه شدند.' },
          { t: 'p', x: 'They went room by room. Students were beaten in their beds. Some were thrown from upper-floor windows and balconies. At least one student was killed outright and hundreds were injured, and more than a thousand were arrested in the days that followed. It became the largest unrest since the revolution to that point, and the image of young people being thrown from the windows of their own university stayed with the generation that saw it.', fa: 'اتاق به اتاق رفتند. دانشجویان را در تختخوابشان زدند. بعضی را از پنجره و بالکن طبقات بالا به بیرون پرتاب کردند. دست‌کم یک دانشجو همان‌جا کشته شد و صدها نفر زخمی شدند، و در روزهای بعد بیش از هزار نفر بازداشت شدند. این بزرگ‌ترین ناآرامی پس از انقلاب تا آن زمان بود، و تصویر جوان‌هایی که از پنجرهٔ دانشگاه خودشان به بیرون پرت می‌شوند، با نسلی که آن را دید ماند.' },
          { t: 'p', x: 'Almost nobody was held responsible. Of the many officers charged, one was convicted, for stealing an electric shaver.', fa: 'تقریباً هیچ‌کس پاسخگو نشد. از میان مأموران متعددی که تحت تعقیب قرار گرفتند، تنها یک نفر محکوم شد؛ به جرم دزدیدن یک ریش‌تراش برقی.' },
          { t: 'markline', x: 'One conviction, for a shaver. That was the accounting.', fa: 'یک محکومیت، بابت یک ریش‌تراش. حساب‌وکتاب همین بود.' },
        ] },
        { blocks: [
          { t: 'h', x: '2009: the Green Movement', fa: '۱۳۸۸: جنبش سبز' },
          { t: 'img', key: 'green-movement' },
          { t: 'p', x: 'The June 2009 presidential election was called for the incumbent within hours of polls closing, by a margin nobody had seen coming and with a speed the counting could not plausibly have allowed. Mir-Hossein Mousavi, the reformist candidate, said the result had been manufactured.', fa: 'نتیجهٔ انتخابات ریاست‌جمهوری خرداد ۱۳۸۸، چند ساعت پس از بسته شدن صندوق‌ها به نفع رئیس‌جمهور وقت اعلام شد؛ با اختلافی که کسی انتظارش را نداشت و با سرعتی که شمارش آرا عملاً اجازه‌اش را نمی‌داد. میرحسین موسوی، نامزد اصلاح‌طلب، گفت این نتیجه ساخته شده است.' },
          { t: 'p', x: 'What followed was the largest demonstration Iran had seen since 1979. Millions walked in silence through Tehran, wearing green, carrying a single question written on paper: where is my vote.', fa: 'آنچه پس از آن آمد، بزرگ‌ترین تظاهراتی بود که ایران از سال ۱۳۵۷ به خود دیده بود. میلیون‌ها نفر در سکوت در تهران راه رفتند، سبزپوش، با یک پرسش که روی کاغذ نوشته بودند.' },
          { t: 'quotebig', x: 'رأی من کجاست' },
          { t: 'p', x: 'The crackdown came within days. Protesters were beaten in the streets and detained in their thousands. At Kahrizak detention centre, prisoners were tortured and several died, and the scandal was severe enough that even parts of the establishment objected.', fa: 'سرکوب ظرف چند روز رسید. معترضان را در خیابان زدند و هزاران نفر را بازداشت کردند. در بازداشتگاه کهریزک، زندانیان شکنجه شدند و چند نفر جان باختند؛ رسوایی چنان بزرگ بود که حتی بخش‌هایی از خود حاکمیت هم اعتراض کردند.' },
          { t: 'p', x: 'On 20 June a young woman named Neda Agha-Soltan, who had stepped out of a car in the heat, was shot in the chest on a Tehran street. Someone filmed her dying. It went around the world within hours and became the image of that summer.', fa: 'در ۳۰ خرداد، دختر جوانی به نام ندا آقاسلطان که از گرما از ماشین پیاده شده بود، در خیابانی در تهران از ناحیهٔ سینه هدف گلوله قرار گرفت. کسی لحظهٔ جان دادنش را فیلم گرفت. ظرف چند ساعت در سراسر جهان پخش شد و به تصویر آن تابستان بدل شد.' },
          { t: 'p', x: 'Mousavi and his wife Zahra Rahnavard, along with the other reformist candidate Mehdi Karroubi, were placed under house arrest in 2011. They remained there for more than a decade, never charged and never tried.', fa: 'موسوی و همسرش زهرا رهنورد، همراه با مهدی کروبی، نامزد اصلاح‌طلب دیگر، در سال ۱۳۸۹ در حصر خانگی قرار گرفتند. بیش از یک دهه در همان حال ماندند، بی‌آنکه اتهامی علیه‌شان مطرح شود یا محاکمه‌ای در کار باشد.' },
          { t: 'div' },
          { t: 'h', x: '2017 and 2019', fa: 'دی ۹۶ و آبان ۹۸' },
          { t: 'p', x: 'The protests of late 2017 began over the price of eggs and spread within days to around a hundred towns, most of them small, provincial, and previously quiet. That was what alarmed people about them: this was not students in the capital, it was working families in places that had always been assumed loyal.', fa: 'اعتراض‌های دی ۹۶ بر سر قیمت تخم‌مرغ شروع شد و ظرف چند روز به حدود صد شهر رسید؛ بیشترشان کوچک، در شهرستان‌ها، و تا آن زمان آرام. همین بود که نگران‌کننده‌اش می‌کرد: این دانشجویان پایتخت نبودند، خانواده‌های کارگری در جاهایی بودند که همیشه وفادار فرض می‌شدند.' },
          { t: 'p', x: 'In November 2019 the petrol price was raised overnight without warning and the country came out again. The government shut off the national internet for about a week, and the crackdown happened inside that blackout. Reuters later reported around fifteen hundred dead. It was the first full-scale demonstration of a method that would be used again on a much larger scale.', fa: 'در آبان ۹۸، قیمت بنزین یک‌شبه و بدون اطلاع قبلی بالا رفت و کشور دوباره به خیابان آمد. حکومت اینترنت را حدود یک هفته در سراسر کشور قطع کرد، و سرکوب در دل همان خاموشی انجام شد. رویترز بعدها از حدود هزار و پانصد کشته خبر داد. این نخستین اجرای تمام‌عیار روشی بود که بعدها در ابعادی بسیار بزرگ‌تر تکرار شد.' },
        ] },
        { blocks: [
          { t: 'h', x: '2022: Woman, Life, Freedom', fa: '۱۴۰۱: زن، زندگی، آزادی' },
          { t: 'img', key: 'mahsa-1' },
          { t: 'p', x: 'On 13 September 2022 a twenty-two year old Kurdish woman named Mahsa Jina Amini was detained in Tehran by the morality police over how she was wearing her hijab. She collapsed in custody and died three days later. Her family said she had been beaten. The authorities said she had a pre-existing condition.', fa: 'در ۲۲ شهریور ۱۴۰۱، دختر کرد بیست و دو ساله‌ای به نام مهسا ژینا امینی در تهران به دست گشت ارشاد و به بهانهٔ نحوهٔ پوشیدن حجابش بازداشت شد. در بازداشت از حال رفت و سه روز بعد درگذشت. خانواده‌اش گفتند کتک خورده است. مقام‌ها گفتند بیماری زمینه‌ای داشته.' },
          { t: 'p', x: 'Her funeral in Saqqez became the first protest, and it did not stop there. Within a week it had reached every province in the country.', fa: 'مراسم خاکسپاری‌اش در سقز به نخستین اعتراض بدل شد، و همان‌جا نماند. ظرف یک هفته به همهٔ استان‌های کشور رسید.' },
          { t: 'p', x: 'What made it different was who led it. Schoolgirls climbed onto desks and took off their headscarves and filmed it. University students walked out of segregated canteens. Women cut their hair in the street and in public squares. The slogan, Kurdish before it was Persian, was heard everywhere: zan, zendegi, azadi. Woman, life, freedom.', fa: 'آنچه این یکی را متفاوت می‌کرد، این بود که چه کسانی پیشاپیشش بودند. دخترهای مدرسه‌ای روی نیمکت‌ها می‌ایستادند، روسری‌شان را برمی‌داشتند و فیلم می‌گرفتند. دانشجویان از سلف‌های تفکیک‌شده بیرون می‌آمدند. زنان در خیابان و در میدان‌های شهر موهایشان را می‌بریدند. آن شعار، که پیش از فارسی کردی بود، همه‌جا شنیده می‌شد: ژن، ژیان، ئازادی؛ زن، زندگی، آزادی.' },
          { t: 'img', key: 'mahsa-2' },
          { t: 'p', x: 'It ran for months. Hundreds were killed, including dozens of children. Tens of thousands were arrested. Protesters were blinded by shotgun pellets fired at faces, and Iranian ophthalmologists reported treating hundreds of such injuries. Several young men were executed publicly and quickly, after trials measured in days, and executions of people arrested in 2022 have continued in the years since.', fa: 'ماه‌ها ادامه یافت. صدها نفر کشته شدند، از جمله ده‌ها کودک. ده‌ها هزار نفر بازداشت شدند. معترضان با ساچمه‌ای که به صورتشان شلیک می‌شد نابینا شدند، و چشم‌پزشکان ایرانی از درمان صدها مورد از این آسیب‌ها خبر دادند. چند مرد جوان به‌سرعت و در ملأ عام اعدام شدند، پس از محاکمه‌هایی که چند روز بیشتر طول نکشید، و اعدام کسانی که در ۱۴۰۱ بازداشت شده بودند در سال‌های بعد هم ادامه یافت.' },
          { t: 'p', x: 'The protests were suppressed. But something did shift: in the years after, large numbers of women simply stopped covering their hair in public and continued not to, in defiance of a law still on the books. The enforcement of it has never been the same since.', fa: 'اعتراض‌ها سرکوب شد. اما چیزی جابه‌جا شد: در سال‌های پس از آن، شمار زیادی از زنان به‌سادگی دیگر موهایشان را در ملأ عام نپوشاندند و همین‌طور ادامه دادند، در برابر قانونی که هنوز پابرجاست. اجرای آن قانون از آن روز دیگر مثل سابق نشد.' },
          { t: 'pull', x: 'A law can stay written and stop being obeyed. That is its own kind of answer.', fa: 'یک قانون می‌تواند نوشته بماند و دیگر اجرا نشود. این هم خودش نوعی پاسخ است.' },

        ] },
      ],
    },
    {
      key: 'mi7',
      title: 'The Wars Return', titleFa: 'بازگشت جنگ',
      subtitle: '2025 - 2026', titleFa: '۱۴۰۴',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 13 June 2025 Israel struck Iran directly: nuclear facilities, military sites, and the homes of senior commanders and nuclear scientists, many of whom were killed in the first hours. Iran answered with several hundred ballistic missiles and around a thousand drones over the following days. On 22 June the United States bombed three Iranian nuclear sites. A ceasefire took effect on 24 June.', fa: 'در ۲۳ خرداد ۱۴۰۴، اسرائیل مستقیماً به ایران حمله کرد: تأسیسات هسته‌ای، مراکز نظامی، و خانهٔ فرماندهان ارشد و دانشمندان هسته‌ای، که بسیاری‌شان در همان ساعات اول کشته شدند. ایران در روزهای بعد با چند صد موشک بالستیک و حدود هزار پهپاد پاسخ داد. در ۱ تیر، آمریکا سه تأسیسات هسته‌ای ایران را بمباران کرد. آتش‌بس از ۳ تیر برقرار شد.' },
          { t: 'p', x: 'It lasted twelve days. In Iran roughly a thousand people were killed, including several hundred civilians; in Israel twenty-eight civilians and one soldier died. The war made public something that had previously been argued about: Iran\u2019s air defences could not keep Israeli aircraft out, and the allies it had spent decades cultivating offered very little when it mattered.', fa: 'دوازده روز طول کشید. در ایران حدود هزار نفر کشته شدند، از جمله چند صد غیرنظامی؛ در اسرائیل بیست و هشت غیرنظامی و یک سرباز جان باختند. این جنگ چیزی را علنی کرد که پیش‌تر بر سرش بحث بود: پدافند هوایی ایران نمی‌توانست جلوی هواپیماهای اسرائیلی را بگیرد، و متحدانی که دهه‌ها رویشان سرمایه‌گذاری شده بود، وقتی به کار می‌آمدند خیلی کم آوردند.' },
          { t: 'p', x: 'In September 2025 United Nations sanctions were reimposed after the Security Council failed to extend the relief agreed a decade earlier. The arms embargo, the missile restrictions and the asset freezes came back. The rial fell further.', fa: 'در شهریور ۱۴۰۴، پس از آنکه شورای امنیت نتوانست تعلیق تحریم‌های یک دههٔ پیش را تمدید کند، تحریم‌های سازمان ملل بازگشت. تحریم تسلیحاتی، محدودیت موشکی و مسدود کردن دارایی‌ها دوباره برقرار شد. ریال باز هم پایین‌تر رفت.' },
          { t: 'p', x: 'In late February 2026, after negotiations between Iran and the United States broke down, Israel and the United States began a further and much larger campaign of strikes. It ran into the spring.', fa: 'اواخر بهمن ۱۴۰۴، پس از آنکه مذاکرات ایران و آمریکا شکست خورد، اسرائیل و آمریکا موج تازه و بسیار گسترده‌تری از حملات را آغاز کردند. تا بهار ادامه یافت.' },
        ] },
      ],
    },
    {
      key: 'mi8',
      title: 'The Winter of 2025', titleFa: 'زمستان ۱۴۰۴',
      subtitle: 'December 2025 - January 2026', titleFa: 'دی و بهمن ۱۴۰۴',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 28 December 2025 the rial fell to the lowest point in its history. It had been falling for years, but this was different in kind: prices in the shops changed between the morning and the afternoon, and importers stopped quoting at all because no quote survived the day.', fa: 'در ۷ دی ۱۴۰۴، ریال به پایین‌ترین نقطهٔ تاریخش رسید. سال‌ها بود که پایین می‌آمد، اما این یکی از جنس دیگری بود: قیمت‌ها در مغازه‌ها میان صبح و بعدازظهر عوض می‌شد، و واردکننده‌ها دیگر اصلاً قیمت نمی‌دادند، چون هیچ قیمتی تا آخر روز دوام نمی‌آورد.' },
          { t: 'p', x: 'The bazaars closed. Not because of a strike called by anyone, but because merchants in Tehran, Isfahan, Tabriz and Mashhad pulled down their shutters and refused to trade at prices they could no longer make sense of. When the bazaar closes in Iran it has always meant something, and everyone knew what it meant.', fa: 'بازارها بسته شد. نه به این دلیل که کسی اعتصاب اعلام کرده باشد، بلکه چون بازاری‌های تهران و اصفهان و تبریز و مشهد کرکره‌ها را پایین کشیدند و حاضر نشدند با قیمت‌هایی که دیگر برایشان معنا نداشت داد و ستد کنند. در ایران، بسته شدن بازار همیشه معنایی داشته، و همه می‌دانستند معنایش چیست.' },
          { t: 'p', x: 'Ordinary households had already been cutting. Meat had gone first, then dairy, then fruit. By that December a large part of the country was managing on bread, rice and whatever else could be found, and the fall in the currency meant even that was moving out of reach.', fa: 'خانواده‌های معمولی پیش‌تر شروع به حذف کرده بودند. اول گوشت رفت، بعد لبنیات، بعد میوه. تا آن دی‌ماه، بخش بزرگی از کشور با نان و برنج و هر چه دیگر که پیدا می‌شد سر می‌کرد، و افت ارزش پول یعنی همان هم داشت از دسترس خارج می‌شد.' },
          { t: 'markline', x: 'It began over the price of food, as these things usually do.', fa: 'سر قیمت نان و خوراک شروع شد، همان‌طور که این چیزها معمولاً شروع می‌شوند.' },
          { t: 'p', x: 'People went out that same week, and within days it was no longer about prices. The demand was for the government to go.', fa: 'مردم همان هفته به خیابان آمدند، و ظرف چند روز دیگر بحث قیمت نبود. خواسته این بود که حکومت برود.' },
          { t: 'img', key: 'winter-1' },
        ] },
        { blocks: [
          { t: 'h', x: 'The eighth of January', fa: 'هجدهم دی' },
          { t: 'p', x: 'On 8 January 2026 the government shut off the internet across the entire country. It stayed off longer than any national shutdown recorded anywhere in the world.', fa: 'در ۱۸ دی ۱۴۰۴، حکومت اینترنت را در سراسر کشور قطع کرد. طولانی‌تر از هر قطعی سراسری‌ای که تا آن روز در هیچ کجای جهان ثبت شده بود، خاموش ماند.' },
          { t: 'p', x: 'Nothing came out. Families abroad could not reach anyone. Hospitals could not be contacted. Journalists could not file, and nobody could count. Whatever happened in those days happened in the dark, and that was the purpose of the dark.', fa: 'هیچ خبری بیرون نیامد. خانواده‌های خارج از کشور به هیچ‌کس دسترسی نداشتند. با بیمارستان‌ها نمی‌شد تماس گرفت. خبرنگارها نمی‌توانستند گزارش بفرستند، و هیچ‌کس نمی‌توانست بشمارد. هر چه در آن روزها گذشت، در تاریکی گذشت؛ و دلیلِ آن تاریکی هم همین بود.' },
          { t: 'img', key: 'winter-2' },
          { t: 'p', x: 'People were killed in the streets, one after another, over roughly two days, and thousands more across the weeks around them. Nurses and medics who treated the wounded were taken; some were killed, and there are accounts of women in custody being raped. People who stopped to carry someone who had been shot were shot themselves. Couples. Children. Athletes. People who had come out and people who had simply been walking.', fa: 'مردم در خیابان کشته شدند، یکی پس از دیگری، در حدود دو روز؛ و هزاران نفر دیگر در هفته‌های پیش و پس از آن. پرستارها و امدادگرانی که زخمی‌ها را درمان می‌کردند بازداشت شدند؛ بعضی کشته شدند، و گزارش‌هایی از تجاوز به زنان در بازداشت هست. کسانی که ایستادند تا زخمی‌ای را ببرند، خودشان هدف گلوله قرار گرفتند. زن و شوهرها. بچه‌ها. ورزشکارها. کسانی که به خیابان آمده بودند و کسانی که فقط داشتند رد می‌شدند.' },
          { t: 'img', key: 'winter-3' },
          { t: 'p', x: 'The count grew every day and it grew from the bottom, because families went looking themselves. People searched hospitals, then morgues, then rows of body bags, trying to find someone they knew. Some found them. Some are still looking, and bodies are still being identified now.', fa: 'شمار کشته‌ها هر روز بالا رفت، و از پایین بالا رفت؛ چون خانواده‌ها خودشان به جست‌وجو رفتند. مردم بیمارستان‌ها را گشتند، بعد سردخانه‌ها را، بعد ردیف کیسه‌های جسد را، به امید پیدا کردن کسی که می‌شناختند. بعضی پیدایشان کردند. بعضی هنوز دنبالشان می‌گردند، و هنوز پیکرها شناسایی می‌شوند.' },
          { t: 'p', x: 'No settled figure exists and there may never be one. Credible estimates range from several thousand to many times that, and the range exists for one reason: the state made counting impossible while it was happening, and has not permitted it since.', fa: 'هیچ رقم قطعی‌ای وجود ندارد و شاید هرگز وجود نداشته باشد. برآوردهای معتبر از چند هزار تا چند برابر آن را در بر می‌گیرد، و این فاصله یک دلیل دارد: حکومت در همان زمان شمردن را ناممکن کرد، و از آن پس هم اجازه‌اش را نداده است.' },
          { t: 'div' },
          { t: 'h', x: 'The names', fa: 'نام‌ها' },
          { t: 'p', x: 'Thousands of people have been killed in these years, and most of them will never be named anywhere. Some names travelled, because someone filmed, or because a mother spoke at a funeral, or because a photograph was already circulating before the person in it died. The rest did not, and their absence from lists like this one is not an absence from the count.', fa: 'در این سال‌ها هزاران نفر کشته شده‌اند، و نام بیشترشان هیچ‌جا ثبت نخواهد شد. بعضی نام‌ها به گوش‌ها رسید، چون کسی فیلم گرفت، یا مادری بر سر خاک حرف زد، یا عکسی پیش از مرگِ صاحبش دست به دست شده بود. بقیه نرسید، و نبودنشان در فهرست‌هایی مثل این، به معنای نبودنشان در شمار نیست.' },
          { t: 'memorial' },
          { t: 'div' },
          { t: 'h', x: 'After', fa: 'پس از آن' },
          { t: 'p', x: 'Tens of thousands were arrested. Death sentences were handed down in numbers not seen before, and the executions have continued. They did not stop. People detained in January are being executed now, and so are people who were arrested during the protests of 2022, years after the fact.', fa: 'ده‌ها هزار نفر بازداشت شدند. احکام اعدام به تعدادی صادر شد که پیش از آن سابقه نداشت، و اعدام‌ها ادامه پیدا کرد. متوقف نشد. کسانی که در دی بازداشت شدند همین حالا اعدام می‌شوند، و همین‌طور کسانی که در اعتراض‌های ۱۴۰۱ بازداشت شده بودند؛ سال‌ها پس از آن ماجرا.' },
          { t: 'p', x: 'That is the part that is easiest to lose from a distance. The event is written about in the past tense. For the families waiting outside a prison for news, it is not in the past tense at all.', fa: 'همین بخش است که از دور راحت‌تر از همه از دست می‌رود. دربارهٔ این ماجرا با فعل گذشته می‌نویسند. برای خانواده‌هایی که بیرون زندان منتظر خبرند، هیچ چیزش گذشته نیست.' },
        ] },
      ],
    },
    {
      key: 'mi9',
      title: 'Where It Stands', titleFa: 'اکنون کجاییم',
      subtitle: 'Today', titleFa: 'امروز',
      pages: [
        { blocks: [
          { t: 'p', x: 'Life continues, and that is worth saying first, because coverage of Iran consists almost entirely of its worst days. People are working, marrying, studying, arguing about films. Nowruz is laid out on the same cloth it always was. The mountains above Tehran fill on Fridays. The country is not a ruin and its people are not waiting to be pitied.', fa: 'زندگی ادامه دارد، و این را باید اول از همه گفت؛ چون آنچه دربارهٔ ایران منتشر می‌شود تقریباً تماماً بدترین روزهایش است. مردم کار می‌کنند، ازدواج می‌کنند، درس می‌خوانند، سر فیلم‌ها بحث می‌کنند. سفرهٔ هفت‌سین روی همان سفره‌ای پهن می‌شود که همیشه بود. جمعه‌ها کوه‌های شمال تهران پر می‌شود. این کشور ویرانه نیست و مردمش منتظر ترحم کسی نیستند.' },
          { t: 'p', x: 'But it is hard, and it is hard in the specific way that grinds people down: not drama, but arithmetic. A wage that buys less each month than it did the month before. Electricity that fails in July and gas that fails in January, in a country sitting on some of the largest energy reserves on earth. Aquifers falling, rivers gone, Lake Urmia largely dried. Almost every family with someone abroad and a chair at the table that stays empty at new year.', fa: 'اما سخت است، و به همان شکل خاصی سخت است که آدم را می‌ساید: نه ماجرا، بلکه حساب و کتاب. دستمزدی که هر ماه کمتر از ماه قبل می‌خرد. برقی که تیر ماه می‌رود و گازی که دی ماه، در کشوری که روی یکی از بزرگ‌ترین ذخایر انرژی جهان نشسته. سفره‌های زیرزمینی آب پایین می‌رود، رودها رفته‌اند، دریاچهٔ ارومیه تا حد زیادی خشک شده. تقریباً هر خانواده‌ای کسی را در خارج دارد و صندلی‌ای سر سفره که سال تحویل خالی می‌ماند.' },
          { t: 'p', x: 'And the division does not run between households. It runs through them. There are people certain the system can still be changed from within and people certain it cannot. People who want it gone at any cost and people who watched Iraq and Syria and are frightened of what the cost might be. People who were out in January, people who lost someone in January, and people who did neither and cannot talk about it. These are the same family, at the same dinner.', fa: 'و این شکاف میان خانه‌ها نیست؛ از وسط خودِ خانه‌ها می‌گذرد. کسانی هستند که مطمئن‌اند این نظام هنوز از درون قابل تغییر است و کسانی که مطمئن‌اند نیست. کسانی که به هر قیمتی رفتنش را می‌خواهند و کسانی که عراق و سوریه را دیده‌اند و از آن قیمت می‌ترسند. کسانی که دی‌ماه در خیابان بودند، کسانی که دی‌ماه عزیزی را از دست دادند، و کسانی که هیچ‌کدام نبودند و نمی‌توانند درباره‌اش حرف بزنند. اینها همه یک خانواده‌اند، سر یک سفره.' },
          { t: 'div' },
        ] },
        { blocks: [
          { t: 'h', x: 'What people want', fa: 'مردم چه می‌خواهند' },
          { t: 'p', x: 'If you ask, the answers are not complicated, and they are strikingly consistent across people who agree on nothing else.', fa: 'اگر بپرسی، پاسخ‌ها پیچیده نیست، و به‌طرز چشمگیری میان کسانی که بر سر هیچ چیز دیگری توافق ندارند، یکی است.' },
          { t: 'p', x: 'An economy that works for the people living in it, where a month of work covers a month of living and savings are still worth something a year later. A government that makes its decisions out of care for the country rather than the need to hold on to it. Leaders chosen by the people, replaced by the people, without anyone having to die to make the point.', fa: 'اقتصادی که به کار مردمی بیاید که در آن زندگی می‌کنند؛ جایی که یک ماه کار، خرج یک ماه زندگی را بدهد و پس‌انداز یک سال بعد هنوز ارزشی داشته باشد. حکومتی که تصمیم‌هایش را از سر دلسوزی برای این سرزمین بگیرد، نه از سر نیاز به نگه داشتن قدرت. رهبرانی که مردم انتخابشان کنند و مردم کنارشان بگذارند، بی‌آنکه کسی مجبور باشد برای گفتن این حرف بمیرد.' },
          { t: 'p', x: 'Streets where a disagreement can be spoken aloud. Universities where an argument stays an argument. A country you can travel out of and back into freely, that the rest of the world can travel to, and that is known abroad for what it actually is rather than for its government.', fa: 'خیابان‌هایی که در آن بشود مخالفت را بلند گفت. دانشگاه‌هایی که در آن بحث، بحث بماند. کشوری که بشود آزادانه از آن بیرون رفت و به آن برگشت، که بقیهٔ جهان بتواند به آن سفر کند، و که در بیرون به خاطر آنچه واقعاً هست شناخته شود، نه به خاطر حکومتش.' },
          { t: 'quotebig', x: 'Not a country feared for what it might do. A country visited for what it already is.', fa: 'نه کشوری که از کاری که ممکن است بکند بترسند. کشوری که به خاطر آنچه همین حالا هست، به دیدنش بیایند.' },
          { t: 'p', x: 'There is a generation now that never saw the years before 1979 and has heard about them their whole lives: the pace of it, the confidence, the sense of a country arriving somewhere. They are not nostalgic for a monarchy. They are hungry for the feeling of a country moving forward, because they have only ever been told about it.', fa: 'حالا نسلی هست که سال‌های پیش از ۱۳۵۷ را ندیده و تمام عمرش دربارهٔ آن شنیده است: از سرعتش، از اعتمادبه‌نفسش، از این حس که کشوری دارد به جایی می‌رسد. دلتنگ پادشاهی نیستند. تشنهٔ همان حسِ رو به جلو رفتنِ یک کشورند، چون فقط برایشان تعریفش کرده‌اند.' },
          { t: 'div' },
          { t: 'p', x: 'What comes next is not written, and anyone who says they know is guessing. But Iran has outlasted every empire that ever governed it, and it has done so through people who kept the language, the poetry, the food and the new year going without being asked and without being paid.', fa: 'آنچه در پیش است نوشته نشده، و هر کس بگوید می‌داند، دارد حدس می‌زند. اما ایران از هر امپراتوری‌ای که بر آن حکم رانده عمر بیشتری کرده، و این کار را با مردمی کرده که زبان و شعر و غذا و سال نو را زنده نگه داشتند؛ بی‌آنکه کسی از آنها خواسته باشد و بی‌آنکه پولی بگیرند.' },
          { t: 'p', x: 'That is the part of this history with the longest record, and it is the part still running. The year still turns at the equinox. It has turned through worse than this.', fa: 'همین بخش از این تاریخ است که طولانی‌ترین سابقه را دارد، و همین بخش است که هنوز ادامه دارد. سال هنوز سر اعتدال بهاری تحویل می‌شود. از بدتر از این هم گذشته و تحویل شده است.' },
          { t: 'div' },
          { t: 'h', x: 'And for those watching from outside', fa: 'و برای آنها که از دور نگاه می‌کنند' },
          { t: 'p', x: 'There are millions of Iranians who are not there, and who have spent these years refreshing a feed at three in the morning, waiting for a message to deliver, calling a number that does not connect. There is very little that can be done from a distance, and knowing that is its own weight.', fa: 'میلیون‌ها ایرانی هستند که آنجا نیستند، و این سال‌ها را با تازه کردن صفحه در ساعت سه بامداد گذرانده‌اند، منتظر اینکه یک پیام تحویل داده شود، با شماره‌ای گرفتن که وصل نمی‌شود. از راه دور کار چندانی از کسی برنمی‌آید، و دانستن همین خودش یک بار است.' },
          { t: 'p', x: 'A sadness has been woven into ordinary life abroad: you see the footage, you hear the words, and then you go to work, because the world you are standing in has not stopped. Being far away does not spare anyone. It only removes the option of doing anything about it.', fa: 'غمی در زندگی روزمرهٔ آدم‌ها در خارج بافته شده است: فیلم‌ها را می‌بینی، حرف‌ها را می‌شنوی، و بعد سر کار می‌روی، چون جهانی که در آن ایستاده‌ای متوقف نشده. دور بودن کسی را معاف نمی‌کند. فقط این امکان را از آدم می‌گیرد که کاری بکند.' },
          { t: 'p', x: 'That grief is real and it is shared, and it belongs to the story as much as anything that happened in the street. A country is not only the people standing on its soil.', fa: 'آن اندوه واقعی است و مشترک، و به اندازهٔ هر چیزی که در خیابان گذشت به این روایت تعلق دارد. یک کشور فقط آدم‌هایی نیست که روی خاکش ایستاده‌اند.' },
          { t: 'pull', x: 'It is a long country. This is not the longest night it has had.', fa: 'این سرزمین، سرزمینِ درازی است. و این، درازترین شبی نیست که به خود دیده.' },
        ] },
      ],
    },
  ],
};

const timurid: Topic = {
  key: 'timurid-empire',
  category: 'history',
  name: 'The Timurid Empire',
  persian: 'تیموریان',
  years: '1370 - 1507',
  essence: 'The dynasty of Tamerlane, a conqueror as terrible as any in history, whose descendants presided over one of the most dazzling cultural renaissances the Persian world ever knew.',
  essenceFa: 'سلسلهٔ تیمور لنگ؛ فاتحی به هولناکی هر که تاریخ به خود دیده، که بازماندگانش بر یکی از درخشان‌ترین رستاخیزهای فرهنگی جهان ایرانی سرپرستی کردند.',
  cover: 'timurid-cover',
  closing: 'timurid-cover',
  status: 'ready',
  sources: [
    'The historical record of the Timurid era',
    'Contemporary Persian accounts',
    'Studies of Timurid art and architecture',
  ],
  chapters: [
    {
      key: 'tm1',
      title: 'The Last Great Conqueror', titleFa: 'واپسین فاتح بزرگ',
      subtitle: '1370 - 1405',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the fourteenth century, out of Central Asia, rose the last of the great steppe conquerors, a man the Persians called Timur and the West would call Tamerlane. Claiming the mantle of Genghis Khan, he built an empire by the sword across the Persian world and far beyond, and his name became a byword for both brilliance and terror.', fa: 'در سدهٔ چهاردهم، از آسیای میانه، واپسین فاتح بزرگ دشت‌ها برخاست؛ مردی که ایرانیان تیمور خواندندش و غرب او را تیمورلنگ نامید. ردای چنگیز را از آنِ خود دانست و با شمشیر امپراتوری‌ای در سراسر جهان ایرانی و بسی فراتر از آن برپا کرد. نامش مترادف شد با نبوغ و با وحشت، هر دو با هم.' },
          { t: 'p', x: 'Timur was a military genius who was never once defeated in battle across a lifetime of war, and he was also fearsomely cruel, leaving towers of skulls in the wake of his conquests. He carved out a vast empire centered on the Persian world, from India to the edge of Europe, in a career of almost ceaseless campaigning.', fa: 'تیمور نابغه‌ای نظامی بود که در تمام عمر جنگیدنش حتی یک بار در میدان شکست نخورد، و در عین حال بی‌رحمی‌اش هولناک بود؛ در پی فتوحاتش کله‌مناره‌ها بر جای می‌گذاشت. در کارنامه‌ای از لشکرکشی تقریباً بی‌وقفه، امپراتوری‌ای پهناور بر محور جهان ایرانی تراشید، از هند تا کرانهٔ اروپا.' },
          { t: 'splitimg', key: 'timurid-timur', title: 'Timur (Tamerlane)', titleFa: 'تیمور لنگ', x: 'A conqueror never defeated in battle, and one of the most feared men in history, Timur built a vast empire across the Persian world.', fa: 'فاتحی که هرگز در میدان شکست نخورد و از هراس‌انگیزترین مردان تاریخ؛ تیمور امپراتوری‌ای پهناور در سراسر جهان ایرانی برپا کرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The jewel of Samarkand', fa: 'نگین سمرقند' },
          { t: 'p', x: 'Yet this terrible conqueror was also a great patron of beauty. He gathered to his capital of Samarkand the finest artists, architects, and craftsmen from across all the lands he conquered, and adorned the city with monuments of breathtaking splendour, blue-domed and shimmering, among the wonders of the world.', fa: 'با این همه، این فاتح هولناک حامی بزرگ زیبایی نیز بود. بهترین هنرمندان و معماران و صنعتگران را از سراسر سرزمین‌هایی که گشوده بود به پایتختش سمرقند آورد و شهر را با بناهایی آراست که نفس را می‌بریدند؛ گنبدهای لاجوردی و درخشان، از شگفتی‌های جهان.' },
          { t: 'markline', x: 'The hand that raised towers of skulls also raised the shimmering domes of Samarkand.', fa: 'همان دستی که کله‌مناره برافراشت، گنبدهای درخشان سمرقند را نیز برافراشت.' },
          { t: 'p', x: 'It is one of history\'s great contradictions, that a man of such cruelty should also be the founder of one of the most beautiful cultural ages the East ever knew. But so it was, and the splendour he began would blossom fully under his descendants.', fa: 'این یکی از تناقض‌های بزرگ تاریخ است: مردی با چنان بی‌رحمی، بنیان‌گذار یکی از زیباترین دوران‌های فرهنگی‌ای شود که شرق به خود دیده است. اما چنین شد، و شکوهی که او آغاز کرد در روزگار بازماندگانش به تمامی شکفت.' },
        ] },
      ],
    },
    {
      key: 'tm2',
      title: 'The Timurid Renaissance', titleFa: 'رستاخیز تیموری',
      subtitle: '1405 - 1507',
      pages: [
        { blocks: [
          { t: 'p', x: 'After Timur\'s death, his descendants gave up the endless conquering and turned instead to the cultivation of beauty, and under them the Persian world entered one of the most brilliant cultural renaissances in its entire history, a flowering compared by many to the Italian Renaissance of the same age.', fa: 'پس از مرگ تیمور، بازماندگانش فتحِ بی‌پایان را رها کردند و رو به پروردن زیبایی آوردند. در روزگار آنان، جهان ایرانی به یکی از درخشان‌ترین رستاخیزهای فرهنگی تمام تاریخش پا گذاشت؛ شکوفایی‌ای که بسیاری آن را با رنسانس ایتالیا در همان روزگار سنجیده‌اند.' },
          { t: 'p', x: 'His son Shahrukh and grandson Ulugh Beg, and later the court at Herat, made their cities into dazzling centers of art, learning, and refinement, where the Persian genius reached new summits in almost every field.', fa: 'پسرش شاهرخ و نوه‌اش الغ‌بیگ، و پس از آنان دربار هرات، شهرهایشان را به کانون‌های خیره‌کنندهٔ هنر و دانش و ظرافت بدل کردند؛ جایی که نبوغ ایرانی تقریباً در هر زمینه‌ای به قله‌های تازه‌ای رسید.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A king who mapped the stars', fa: 'شاهی که آسمان را نقشه کرد' },
          { t: 'p', x: 'Timur\'s grandson Ulugh Beg was that rarest of things, a king who was also a great scientist. At his capital of Samarkand he built one of the finest astronomical observatories of the medieval world, and there he and his scholars mapped the stars with an accuracy that would not be surpassed for centuries. A ruler of an empire spent his nights charting the heavens.', fa: 'الغ‌بیگ، نوهٔ تیمور، از آن چیزهای کمیاب بود: شاهی که دانشمندی بزرگ نیز بود. در پایتختش سمرقند یکی از بهترین رصدخانه‌های جهان سده‌های میانه را ساخت، و آنجا خود و دانشمندانش ستارگان را با دقتی نقشه کردند که قرن‌ها کسی از آن پیشی نگرفت. فرمانروای یک امپراتوری شب‌هایش را به ترسیم آسمان می‌گذراند.' },
          { t: 'numstat', items: [
            { n: 'Herat', nFa: 'هرات', label: 'A capital of dazzling art and poetry', labelFa: 'پایتختی از هنر و شعر خیره‌کننده' },
            { n: 'Samarkand', nFa: 'سمرقند', label: 'An observatory that mapped the stars', labelFa: 'رصدخانه‌ای که آسمان را نقشه کرد' },
            { n: 'Painting', nFa: 'نگارگری', label: 'The golden age of the Persian miniature', labelFa: 'عصر طلایی نگارگری ایرانی' },
            { n: 'Renaissance', nFa: 'رستاخیز', label: 'A flowering to rival Italy\'s', labelFa: 'شکوفایی‌ای هم‌سنگ ایتالیا' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The summit of Persian art', fa: 'قلهٔ هنر ایرانی' },
          { t: 'p', x: 'This was the golden age of the Persian miniature, the exquisite art of painting in books, which reached under the Timurids a delicacy and beauty never surpassed. It was the age of the great poet Jami and of the master painter Behzad, whose works are treasures of world art. In poetry, painting, calligraphy, and architecture, the Timurid renaissance stands as one of the summits of Persian civilization.', fa: 'این عصر طلایی نگارگری ایرانی بود، هنر ظریف نقاشی در کتاب، که زیر دست تیموریان به لطافت و زیبایی‌ای رسید که هرگز از آن پیشی گرفته نشد. روزگار جامی، شاعر بزرگ، و کمال‌الدین بهزاد، نگارگر استاد، که آثارشان از گنجینه‌های هنر جهان است. در شعر، نگارگری، خوشنویسی و معماری، رستاخیز تیموری یکی از قله‌های تمدن ایرانی است.' },
          { t: 'splitimg', key: 'timurid-miniature', title: 'The Persian miniature', titleFa: 'نگارگری ایرانی', x: 'Under the Timurids, the art of the miniature reached a delicacy and beauty that has never been surpassed.', fa: 'زیر دست تیموریان، هنر نگارگری به لطافت و زیبایی‌ای رسید که هرگز از آن پیشی گرفته نشد.' },
          { t: 'p', x: 'The legacy reached even further. A prince of this house, Babur, would journey to India and found the great Mughal Empire, carrying the refined Persian culture of the Timurids to the subcontinent, where it would shape a whole civilization and raise wonders like the Taj Mahal.', fa: 'این میراث حتی دورتر رفت. شاهزاده‌ای از همین خاندان، بابر، راهی هند شد و امپراتوری بزرگ گورکانی را بنیان نهاد؛ فرهنگ ظریف ایرانیِ تیموریان را با خود به شبه‌قاره برد، جایی که تمدنی تمام را شکل داد و شگفتی‌هایی چون تاج‌محل را برافراشت.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Timurids, whose story holds the strange and beautiful contradiction that runs through so much of this age, the terror of the conqueror and the glory of the culture he made possible. From the cruelty of Timur grew one of the most luminous cultural ages the Persian world ever knew.', fa: 'این نگاهی بود کوتاه به تیموریان؛ روایتی که آن تناقض غریب و زیبای این روزگار را در خود دارد: وحشتِ فاتح و شکوهِ فرهنگی که خود ممکنش کرد. از دل بی‌رحمی تیمور، یکی از تابناک‌ترین دوران‌های فرهنگی جهان ایرانی رویید.' },
          { t: 'p', x: 'In the shimmering domes of Samarkand, the exquisite paintings of Herat, and the poetry and science of their courts, the Timurids left a legacy of beauty that still shines across the centuries, and carried the light of Persian civilization to the ends of the earth.', fa: 'در گنبدهای درخشان سمرقند، در نگاره‌های ظریف هرات، و در شعر و دانش دربارهایشان، تیموریان میراثی از زیبایی بر جای گذاشتند که هنوز از پس قرن‌ها می‌درخشد، و روشنایی تمدن ایرانی را تا دورترین کرانه‌های زمین بردند.' },
          { t: 'pull', x: 'From the harshest of ages, the Persian world raised a renaissance of pure beauty.', fa: 'از سخت‌ترین روزگاران، جهان ایرانی رستاخیزی از زیبایی محض برآورد.' },
        ] },
      ],
    },
  ],
};

export type EraEntry = { name: string; persian?: string; years: string; topicKey?: string; status: 'ready' | 'soon' | 'priority' };
export type EraGroup = { group: string; entries: EraEntry[] };

export const HISTORY_ERAS: EraGroup[] = [
  {
    group: 'Ancient Persia',
    entries: [
      { name: 'Cyrus the Great & the Achaemenids', persian: 'کوروش بزرگ', years: 'c. 550 – 330 BCE', topicKey: 'cyrus-the-great', status: 'priority' },
      { name: 'The Parthian Empire', persian: 'اشکانیان', years: '247 BCE – 224 CE', topicKey: 'parthian-empire', status: 'ready' },
      { name: 'The Sasanian Empire', persian: 'ساسانیان', years: '224 – 651 CE', topicKey: 'sasanian-empire', status: 'ready' },
      { name: 'Two Centuries of Silence', persian: 'دو قرن سکوت', years: '651 – 900 CE', topicKey: 'two-centuries-silence', status: 'ready' },
    ],
  },
  {
    group: 'The Medieval Age',
    entries: [
      { name: 'The Seljuk Empire', persian: 'سلجوقیان', years: '1037 – 1194', topicKey: 'seljuk-empire', status: 'ready' },
      { name: 'The Ilkhanate', persian: 'ایلخانان', years: '1256 – 1335', topicKey: 'ilkhanate', status: 'ready' },
      { name: 'The Timurid Empire', persian: 'تیموریان', years: '1370 – 1507', topicKey: 'timurid-empire', status: 'ready' },
    ],
  },
  {
    group: 'The Early Modern Age',
    entries: [
      { name: 'The Safavid Empire', persian: 'صفویان', years: '1501 – 1736', topicKey: 'safavid-empire', status: 'ready' },
      { name: 'The Afsharid Dynasty', persian: 'افشاریان', years: '1736 – 1796', topicKey: 'afsharid-dynasty', status: 'ready' },
      { name: 'The Zand Dynasty', persian: 'زندیان', years: '1751 – 1794', topicKey: 'zand-dynasty', status: 'ready' },
      { name: 'The Qajar Dynasty', persian: 'قاجاریان', years: '1789 – 1925', topicKey: 'qajar-dynasty', status: 'ready' },
    ],
  },
  {
    group: 'The Modern Age',
    entries: [
      { name: 'Reza Shah Pahlavi', persian: 'رضا شاه', years: '1878 – 1944', topicKey: 'reza-shah', status: 'ready' },
      { name: 'Mohammad Reza Shah Pahlavi', persian: 'محمدرضا پهلوی', years: '1919 – 1980', topicKey: 'mohammad-reza-shah', status: 'ready' },
      { name: 'Iran Since the Revolution', persian: 'ایران پس از انقلاب', years: '1979 – today', topicKey: 'modern-iran', status: 'ready' },
    ],
  },
];

export const TOPICS: Topic[] = [cyrus, zand, mrp, rezaShah, safavid, qajar, sasanian, silence, parthian, afsharid, seljuk, ilkhanate, timurid, modernIran];

export function findTopic(key?: string) {
  return TOPICS.find((t) => t.key === key);
}

export type FlatPage = { chapterIndex: number; chapterTitle: string; chapterSubtitle?: string; pageInChapter: number; pagesInChapter: number; blocks: Block[] };

export function flattenPages(topic: Topic): FlatPage[] {
  const out: FlatPage[] = [];
  topic.chapters.forEach((c, ci) => {
    c.pages.forEach((pg, pi) => {
      out.push({ chapterIndex: ci, chapterTitle: c.title, chapterSubtitle: c.subtitle, pageInChapter: pi, pagesInChapter: c.pages.length, blocks: pg.blocks });
    });
  });
  return out;
}
