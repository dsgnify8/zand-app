// Literature: a light, poetic reading world. Its own theme, model, and illustration blocks
// (distinct from the dark History reader). Author -> Chapters -> Pages -> Blocks.

export const lit = {
  bg: '#F7F4EF',        // soft ivory
  surface: '#FFFFFF',
  raised: '#FBF9F5',
  text: '#2E2A26',      // deep ink
  textDim: '#8C8378',
  hair: '#E6DFD4',
  gold: '#B08A46',      // antique gold
  goldSoft: '#EFE6D4',
  ink: '#3A4A5A',       // slate blue accent
  inkSoft: '#E4E9EE',
  rose: '#A8586E',
};

// Bespoke Literature blocks — poetic, symbol-led. NOT shared with history.
export type LitBlock =
  | { t: 'p'; x: string }                                   // body prose
  | { t: 'lead'; x: string; mark?: string }                                // large opening line
  | { t: 'verse'; lines: string[]; by?: string }            // a poem, centered, elegant
  | { t: 'couplet'; a: string; b: string }                  // two balanced lines
  | { t: 'illumin'; x: string }                             // an illuminated pull-quote with ornament
  | { t: 'gloss'; term: string; meaning: string }           // a soft word-and-meaning
  | { t: 'motif'; symbol: string; caption?: string }        // a decorative symbol beat
  | { t: 'scene'; title: string; x: string }                // a named tale/scene card
  | { t: 'aside'; x: string }                                // a soft margin note
  | { t: 'ptext'; x: string }                               // prose w/ glossary links
  | { t: 'img'; key: string; cap?: string }
  | { t: 'imgframe'; key: string; cap?: string }            // an ornately framed image
  | { t: 'fal' }
  | { t: 'baniadam' }
  | { t: 'drift' }
  | { t: 'chang' }
  | { t: 'mountain' }
  | { t: 'sama' }
  | { t: 'reed' }
  | { t: 'haftpeykar' }
  | { t: 'lostverses' }
  | { t: 'rubai'; lines: string[]; note?: string }
  | { t: 'twotrans'; a: { label: string; x: string }; b: { label: string; x: string } }
  | { t: 'story'; title: string; x: string; moral: string }
  | { t: 'ghazal'; couplets: { a: string; b: string }[]; note?: string }
  | { t: 'veil'; surface: string; hidden: string }
  | { t: 'rule' };                                          // a decorative divider

export type LitPage = { blocks: LitBlock[] };
export type LitChapter = { key: string; title: string; nav?: string; subtitle?: string; pages: LitPage[] };

export type Author = {
  key: string;
  name: string;
  persian: string;
  epithet: string;      // "Father of the Persian Language"
  years: string;
  essence: string;
  cover?: string;
  closing?: string;
  chapters: LitChapter[];
  status: 'ready' | 'soon';
};

// Placeholder authors for the hub; Ferdowsi content comes next turn.
const ferdowsi: Author = {
  key: 'ferdowsi',
  name: 'Ferdowsi',
  persian: 'فردوسی',
  epithet: 'Father of the Persian Language',
  years: 'c. 940 - 1020',
  essence: 'The poet who spent thirty years writing the Shahnameh, and in doing so saved the Persian language and gave a nation back its soul.',
  cover: 'lit-ferdowsi-cover',
  closing: 'lit-ferdowsi-cover',
  status: 'ready',
  chapters: [
    {
      key: 'fd1',
      title: 'The Poet of Tus', titleFa: 'حکیم توس',
      nav: 'Tus',
      subtitle: 'HIS WORLD',
      pages: [
        { blocks: [
          { t: 'lead', x: 'To understand Iran, you must first know its poet.', fa: 'برای شناختن ایران، نخست باید شاعرش را شناخت.', mark: 'crown' },
          { t: 'p', x: 'He was born around the year 940 in a village near Tus, in the green province of Khorasan in the northeast of Iran. His name was Abul-Qasim, and the world would come to know him as Ferdowsi, a name that means, fittingly, the man of paradise.', fa: 'حدود سال ۹۴۰ میلادی در روستایی نزدیک توس زاده شد، در خراسانِ سبز، در شمال شرق ایران. نامش ابوالقاسم بود، و جهان او را با نام فردوسی شناخت؛ نامی که، به‌جا، یعنی مردِ بهشت.' },
          { t: 'p', x: 'He came from the dehqans, the old landed gentry of Iran, a class that took special pride in preserving the ancient traditions, the stories, and the memory of Persia as it had been before the Arab conquest. From childhood he breathed in the old tales of kings and heroes, and they never left him.', fa: 'از دهقانان بود، همان طبقهٔ کهن زمین‌دار ایران که نگاهبانی از آیین‌ها و داستان‌ها و خاطرهٔ ایرانِ پیش از فتح عرب را مایهٔ سربلندی خود می‌دانست. از کودکی داستان‌های کهن شاهان و پهلوانان را نفس کشید، و آن داستان‌ها هرگز رهایش نکردند.' },
          { t: 'motif', symbol: 'pen', caption: 'The reed pen of Tus that would write a nation into being.', captionFa: 'قلم نیِ توس، که ملتی را به نوشتن هستی بخشید.' },
        ] },
        { blocks: [
          { t: 'p', x: 'The Iran of his birth was a land two centuries removed from the fall of its empire. Arabic had become the language of religion, of scholarship, and of prestige, and the Persian tongue, though still spoken everywhere, had been pushed from the halls of learning and power. To many, it seemed a lesser language, unfit for great works.', fa: 'ایرانی که در آن زاده شد، دو قرن از فروپاشی امپراتوری‌اش فاصله داشت. عربی زبان دین و دانش و اعتبار شده بود، و زبان فارسی، هرچند هنوز همه‌جا بر زبان مردم جاری بود، از دهلیزهای دانش و قدرت رانده شده بود. به چشم بسیاری زبانی فروتر می‌نمود، نااهلِ کارهای بزرگ.' },
          { t: 'p', x: 'But in the east, in Khorasan, a quiet revival was stirring. Persian princes ruled again, and at their courts the old language was cherished. A few brave poets had begun to write in Persian once more, and one had even begun to set the ancient national stories into verse, before death cut his work short. It was this unfinished task that would find its true master in Ferdowsi.', fa: 'اما در شرق، در خراسان، بیداری‌ای آرام در کار بود. شاهزادگان ایرانی دوباره فرمان می‌راندند و در دربارهایشان زبان کهن را عزیز می‌داشتند. چند شاعر دلیر دوباره به فارسی نوشتن گرفته بودند، و یکی از آنان حتی داستان‌های ملی کهن را به نظم درآورده بود، پیش از آنکه مرگ کارش را ناتمام بگذارد. همین کار ناتمام بود که استاد راستین خود را در فردوسی یافت.' },
          { t: 'aside', x: 'He was heir to a thousand-year memory, born at the very moment his people needed someone to write it down.', fa: 'وارث خاطره‌ای هزارساله بود، و درست در لحظه‌ای زاده شد که مردمش به کسی نیاز داشتند تا آن را بنویسد.' },
        ] },
      ],
    },
    {
      key: 'fd2',
      title: 'The Great Task', titleFa: 'آن کار سترگ',
      nav: 'The Task',
      subtitle: 'HIS DEVOTION',
      pages: [
        { blocks: [
          { t: 'p', x: 'Around the age of forty, Ferdowsi took up a task so vast it would consume the rest of his life. He set out to gather every ancient story of Iran, its myths and legends, its kings and champions, from the first man to the last Sasanian king, and to weave them all into a single great epic, written in pure and noble Persian verse.', fa: 'نزدیک چهل سالگی، فردوسی کاری را بر دوش گرفت چنان سترگ که باقی عمرش را بلعید. بر آن شد همهٔ داستان‌های کهن ایران را گرد آورد، اسطوره‌ها و افسانه‌ها، شاهان و پهلوانان، از نخستین انسان تا واپسین شهریار ساسانی، و همه را در یک حماسهٔ بزرگ به هم ببافد؛ به نظمی از فارسی سره و بلند.' },
          { t: 'p', x: 'He would call it the Shahnameh, the Book of Kings. It would take him more than thirty years.', fa: 'نامش را شاهنامه گذاشت، نامهٔ شاهان. بیش از سی سال از او گرفت.' },
          { t: 'illumin', x: 'A single man set out to hold a thousand years of memory in his hands, and would not let it fall.', fa: 'یک تن بر آن شد که هزار سال خاطره را در دست نگاه دارد، و نگذاشت از دستش بیفتد.' },
        ] },
        { blocks: [
          { t: 'p', x: 'It was a labor of staggering devotion. Year after year, through the seasons and the decades, he worked, gathering the old sources, shaping the verse, refining every line. He poured his fortune, his health, and his youth into the work, and as the years passed he grew old over his pages, watching his wealth dwindle and his hair turn white in service of the task.', fa: 'رنجی بود از سرِ سرسپردگی محض. سال از پی سال، در گذر فصل‌ها و دهه‌ها، کار کرد؛ سرچشمه‌های کهن را گرد آورد، بیت را ساخت و هر مصراع را پرداخت. دارایی و تندرستی و جوانی‌اش را در این کار ریخت، و سال‌ها که گذشت بر سر برگ‌هایش پیر شد؛ دید که ثروتش آب می‌رود و مویش در خدمت این کار سپید می‌شود.' },
          { t: 'p', x: 'He was driven not by hope of riches, but by something deeper: the conviction that if he did not save these stories, and the language that carried them, they might be lost forever. He was fighting, alone at his desk, to keep the soul of a nation alive.', fa: 'آنچه او را پیش می‌راند امید به ثروت نبود، چیزی ژرف‌تر بود: این باور که اگر او این داستان‌ها و زبانی را که حاملشان بود نگاه ندارد، شاید برای همیشه از دست بروند. تنها، پشت میز خود، می‌جنگید تا جان یک ملت زنده بماند.' },
          { t: 'couplet', a: 'I have toiled these thirty years in pain and strife,', b: 'to bring the Persians back to a Persian life.', aFa: 'بسی رنج بردم در این سال سی', bFa: 'عجم زنده کردم بدین پارسی' },
        ] },
        { blocks: [
          { t: 'p', x: 'He wrote in a Persian deliberately purified, reaching for the old and native words, turning away wherever he could from the Arabic that had flooded the tongue. It was a conscious act. He would prove that Persian could carry the whole weight of a nation\'s glory, that it needed to borrow from no one.', fa: 'به فارسی‌ای نوشت که آگاهانه پیراسته بود؛ واژه‌های کهن و بومی را می‌جست و هر جا می‌توانست از عربی‌ای که زبان را فرا گرفته بود روی می‌گرداند. کاری بود از سر آگاهی. می‌خواست ثابت کند فارسی می‌تواند تمام بار شکوه یک ملت را بر دوش بکشد و نیازی به وام گرفتن از کسی ندارد.' },
          { t: 'p', x: 'In this he succeeded beyond all measure. The language of the Shahnameh became a wellspring from which Persian would flow, renewed and unbroken, for a thousand years to come.', fa: 'و در این کار بیش از هر اندازه‌ای کامیاب شد. زبان شاهنامه سرچشمه‌ای شد که فارسی هزار سال از آن جاری ماند؛ تازه و ناگسسته.' },
          { t: 'scene', title: 'A poet\'s sacrifice', titleFa: 'گذشتِ یک شاعر', x: 'It is said that Ferdowsi was promised a great reward for his work, a gold coin for every verse. But when the treasure finally came, it was silver, not gold, and far too little. Proud and wounded, the old poet gave the money away, to a bath keeper and a seller of drinks, and asked for nothing. He had not written for gold.', fa: 'گفته‌اند که به فردوسی وعدهٔ صله‌ای بزرگ داده بودند: برای هر بیت یک سکهٔ زر. اما آنگاه که صله سرانجام رسید، سیم بود نه زر، و بسیار کمتر از آنچه باید. شاعر پیر، سربلند و دل‌آزرده، پول را بخشید؛ به گرمابه‌بان و به فقاع‌فروش، و چیزی نخواست. برای زر ننوشته بود.' },
        ] },
      ],
    },
    {
      key: 'fd3',
      title: 'The Book of Kings', titleFa: 'نامهٔ شاهان',
      nav: 'Shahnameh',
      subtitle: 'HIS MASTERWORK',
      pages: [
        { blocks: [
          { t: 'p', x: 'The Shahnameh is one of the longest epic poems ever written by a single hand: nearly sixty thousand couplets, a whole universe of story. It carries the reader across the entire sweep of Iranian legend and history, from the creation of the world and the first king, through the age of heroes, to the fall of the last Persian empire.', fa: 'شاهنامه از بلندترین حماسه‌هایی است که به دست یک تن سروده شده: نزدیک شصت هزار بیت، جهانی تمام از داستان. خواننده را از سرتاسر افسانه و تاریخ ایران می‌گذراند؛ از آفرینش جهان و نخستین شاه، از میان روزگار پهلوانان، تا فروپاشی واپسین امپراتوری ایران.' },
          { t: 'p', x: 'It is myth and history, tragedy and triumph, woven together into a single vast tapestry. And running through it all is a set of deep and abiding themes: the eternal struggle of good against evil, the glory and the burden of kingship, the workings of fate, and above all, the love of Iran.', fa: 'اسطوره است و تاریخ، سوگ است و پیروزی، همه در یک فرشِ پهناور به هم بافته. و در سرتاسرش مایه‌هایی ژرف و ماندگار جریان دارد: نبرد جاودانهٔ نیکی با بدی، شکوه و بار پادشاهی، کار سرنوشت، و بیش از همه، عشق به ایران.' },
        ] },
        { blocks: [
          { t: 'scene', title: 'Zahhak, the Serpent King', titleFa: 'ضحاک ماردوش', x: 'In the ancient days, the tyrant Zahhak was tricked by the devil, who kissed his shoulders, from which sprang two hungry serpents that fed upon the brains of the young. For a thousand years his cruelty darkened the world, until a blacksmith named Kaveh raised his leather apron as a banner of revolt and rallied the people to overthrow him. It is one of the oldest tales of tyranny undone by the courage of ordinary people.', fa: 'در روزگاران کهن، ابلیس ضحاک ستمگر را فریفت و بر دو شانه‌اش بوسه زد، و از آن دو بوسه دو مار گرسنه رویید که از مغز جوانان تغذیه می‌کردند. هزار سال ستم او جهان را تیره کرد، تا آنکه آهنگری به نام کاوه چرم‌پارهٔ خود را چون درفشِ شورش برافراشت و مردم را برای براندازی‌اش گرد آورد. این یکی از کهن‌ترین داستان‌های جهان است دربارهٔ ستمی که با دلیری مردم عادی فرو می‌ریزد.' },
          { t: 'aside', x: 'The blacksmith\'s apron became a banner of freedom, a symbol Iranians would remember for a thousand years.', fa: 'چرم‌پارهٔ آهنگر درفش آزادی شد؛ درفش کاویانی، نشانه‌ای که ایرانیان هزار سال به یادش داشتند.' },
        ] },
        { blocks: [
          { t: 'scene', title: 'Rostam, the Greatest Hero', titleFa: 'رستم دستان', x: 'Towering over the whole epic is Rostam, the mightiest champion of Iran, a warrior of superhuman strength who serves king after king across centuries, riding his faithful horse Rakhsh through impossible trials. He is the heart of the Shahnameh, the very image of loyalty, courage, and might in service of his homeland.', fa: 'بر سرتاسر این حماسه رستم سایه انداخته است، نیرومندترین پهلوان ایران؛ جنگاوری با توانی فراتر از آدمی که قرن‌ها شاه پس از شاه را خدمت می‌کند و بر رخشِ وفادارش از خوان‌های ناممکن می‌گذرد. او قلب شاهنامه است، و خودِ تصویر وفاداری و دلیری و توان، در خدمت میهن.' },
          { t: 'p', x: 'But even the greatest hero cannot escape the cruelty of fate, and it is in Rostam\'s story that Ferdowsi reaches the deepest and most heartbreaking note in all his work.', fa: 'اما حتی بزرگ‌ترین پهلوان هم از بی‌رحمی سرنوشت نمی‌گریزد، و فردوسی در داستان رستم به ژرف‌ترین و جگرسوزترین نقطهٔ تمام کارش می‌رسد.' },
        ] },
        { blocks: [
          { t: 'scene', title: 'Rostam and Sohrab', titleFa: 'رستم و سهراب', x: 'Rostam had a son he had never known, Sohrab, born and raised far away. Grown into a mighty warrior himself, Sohrab set out to find his father. But fate is cruel: the two met not as father and son but as champions of opposing armies, neither knowing the other. They fought, and Rostam, the greater warrior, struck the fatal blow. Only as the young man lay dying did the truth emerge, in a token Rostam had once given the boy\'s mother. The mightiest hero in the world had killed his own son, and no strength on earth could undo it.', fa: 'رستم پسری داشت که هرگز ندیده بودش: سهراب، که دور از او زاده و بزرگ شده بود. سهراب که خود پهلوانی نیرومند شده بود، به جست‌وجوی پدر راه افتاد. اما سرنوشت بی‌رحم است: آن دو نه چون پدر و پسر که چون پهلوانان دو سپاه رویاروی به هم رسیدند، و هیچ‌کدام دیگری را نشناخت. جنگیدند، و رستم که پهلوان‌تر بود ضربهٔ کاری را زد. تنها آنگاه که جوان در خون خود افتاده بود حقیقت آشکار شد؛ از مهره‌ای که رستم روزی به مادر او سپرده بود. نیرومندترین پهلوان جهان پسر خودش را کشته بود، و هیچ توانی بر روی زمین نمی‌توانست آن را بازگرداند.' },
          { t: 'illumin', x: 'The greatest hero of all could conquer any foe, but not the fate that made him slay his own child.', fa: 'بزرگ‌ترین پهلوان می‌توانست بر هر دشمنی چیره شود، اما نه بر سرنوشتی که فرزند خودش را به دست او کشت.' },
          { t: 'p', x: 'The tale of Rostam and Sohrab is among the most powerful tragedies in all of world literature, a meditation on fate, on the gulf between fathers and sons, and on the sorrow woven into even the greatest of lives. Through it, Ferdowsi shows us that his epic is not only about glory, but about the deep and human sadness at the heart of things.', fa: 'داستان رستم و سهراب از نیرومندترین سوگ‌نامه‌های ادبیات جهان است؛ تأملی بر سرنوشت، بر فاصله‌ای که میان پدران و پسران می‌افتد، و بر اندوهی که در تار و پود حتی بزرگ‌ترین زندگی‌ها بافته شده. فردوسی با این داستان به ما نشان می‌دهد که حماسه‌اش تنها از شکوه نمی‌گوید، بلکه از آن غمِ ژرف و انسانی می‌گوید که در دل هر چیزی نشسته است.' },
        ] },
      ],
    },
    {
      key: 'fd4',
      title: 'His Mind and His Ideals', titleFa: 'اندیشه و آرمان‌های او',
      nav: 'Philosophy',
      subtitle: 'HIS PHILOSOPHY',
      pages: [
        { blocks: [
          { t: 'p', x: 'Ferdowsi was far more than a teller of tales. Woven through the Shahnameh is a whole vision of life, a philosophy of wisdom, justice, and the right way to live and to rule. He speaks often, in his own voice, pausing the story to reflect on what it means.', fa: 'فردوسی بسی بیش از یک داستان‌گو بود. در تار و پود شاهنامه جهان‌بینی کاملی تنیده شده است؛ حکمتی دربارهٔ خرد، داد، و شیوهٔ درستِ زیستن و فرمان راندن. بارها داستان را نگاه می‌دارد و با زبان خودش سخن می‌گوید، تا در معنای آنچه گفته درنگ کند.' },
          { t: 'p', x: 'Above all he prized wisdom and knowledge, which he held to be the highest of all human goods, the light by which a life should be led.', fa: 'بیش از هر چیز خرد و دانش را ارج می‌نهاد و آنها را برترین سرمایهٔ آدمی می‌دانست؛ چراغی که باید زندگی را با آن پیمود.' },
          { t: 'verse', lines: ['Seek wisdom, for wisdom will guide you well;', 'the wise alone are truly free.'], linesFa: ['توانا بود هر که دانا بود', 'ز دانش دل پیر برنا بود'], by: 'THE SHAHNAMEH', byFa: 'شاهنامه' },
        ] },
        { blocks: [
          { t: 'p', x: 'He believed deeply in justice, and held that the worth of a king lay not in his power but in his fairness and his care for his people. A ruler who was cruel or unjust, however mighty, was in Ferdowsi\'s eyes no true king at all, and was doomed to fall. Kingship, for him, was a sacred trust, not a possession.', fa: 'به داد باوری ژرف داشت و بر آن بود که ارزش شاه نه در توانش، که در دادگری و دلسوزی‌اش برای مردم است. فرمانروای ستمگر یا بیدادگر، هر اندازه هم نیرومند، در چشم فردوسی اصلاً شاه نبود و سرنوشتش فروافتادن بود. پادشاهی نزد او فرّ ایزدی بود، امانتی مقدس، نه مِلک شخصی.' },
          { t: 'p', x: 'And he wrote, again and again, of the fleeting nature of the world, of how kings and heroes and empires all pass away, how fortune turns and glory fades, and how only good deeds and a good name endure beyond the grave. His epic is filled with a wise and gentle sorrow at the passing of all things.', fa: 'و بارها و بارها از ناپایداری جهان نوشت؛ از اینکه شاهان و پهلوانان و امپراتوری‌ها همه می‌گذرند، بخت می‌گردد و شکوه رنگ می‌بازد، و تنها کردار نیک و نام نیک است که از گور فراتر می‌رود. حماسه‌اش سرشار است از اندوهی خردمندانه و ملایم بر گذر همه‌چیز.' },
          { t: 'couplet', a: 'The world is a tale, and we are the telling;', b: 'only the word remains when we are gone.', aFa: 'جهان یادگارست و ما رفتنی', bFa: 'به گیتی نماند به جز گفتنی' },
        ] },
        { blocks: [
          { t: 'p', x: 'Through all his reflection runs a profound and tender love of Iran, its land, its people, its honor, and its ancient glory. This love is the beating heart of the Shahnameh, the reason he gave thirty years of his life to it. He wrote to remind his people who they were, and to make sure they never forgot.', fa: 'در سرتاسر این تأمل‌ها، عشقی ژرف و نازک به ایران جاری است؛ به خاکش، به مردمش، به آبرویش، و به شکوه باستانی‌اش. همین عشق قلب تپندهٔ شاهنامه است، و همان دلیلی که سی سال از عمرش را پایش گذاشت. نوشت تا به مردمش یادآوری کند که کیستند، و تا مطمئن شود هرگز از یاد نمی‌برند.' },
          { t: 'illumin', x: 'He gave his life to a single belief: that a people who remember who they are can never truly be conquered.', fa: 'عمرش را پای یک باور گذاشت: مردمی که به یاد داشته باشند که هستند، هرگز به‌راستی مغلوب نمی‌شوند.' },
        ] },
      ],
    },
    {
      key: 'fd5',
      title: 'The Immortal', titleFa: 'جاودانه',
      nav: 'Legacy',
      subtitle: 'HIS LEGACY',
      pages: [
        { blocks: [
          { t: 'p', x: 'Ferdowsi died around the year 1020, an old man, in the same town of Tus where he had been born. Legend tells that as his funeral procession left the city, the long-promised reward from the court arrived at last at the gate, too late for the poet to ever see it. He had died without earthly reward.', fa: 'فردوسی حدود سال ۱۰۲۰ میلادی، در کهنسالی، در همان شهر توس که زاده شده بود درگذشت. افسانه می‌گوید هنگامی که تابوتش از شهر بیرون می‌رفت، صلهٔ دیرْوعده‌دادهٔ دربار سرانجام به دروازه رسید؛ دیرتر از آنکه شاعر هرگز ببیندش. بی‌آنکه پاداشی این‌جهانی ببیند از دنیا رفت.' },
          { t: 'p', x: 'But he had won something far greater than gold. He had known, even as he finished his great work, exactly what he had achieved, and he said so, in words that have proven truer than perhaps any poet has ever spoken of his own work.', fa: 'اما چیزی به دست آورده بود بسی گران‌بهاتر از زر. همان دم که کار سترگش را به پایان می‌رساند، دقیقاً می‌دانست چه کرده است، و گفتش؛ با واژه‌هایی که شاید راست‌تر از هر سخنی درآمده‌اند که شاعری تاکنون دربارهٔ کار خودش گفته باشد.' },
          { t: 'verse', lines: ['I shall not die, these seeds I\'ve sown will save', 'my name and reputation from the grave,', 'and men of sense and wisdom will proclaim,', 'when I have gone, my praises and my fame.'], linesFa: ['نمیرم از این پس که من زنده‌ام', 'که تخم سخن را پراکنده‌ام'], by: 'FERDOWSI, THE SHAHNAMEH', byFa: 'فردوسی، شاهنامه' },
        ] },
        { blocks: [
          { t: 'p', x: 'He was right. Because of the Shahnameh, the Persian language did not fade but flourished, and became one of the great literary tongues of the world. Every poet who came after, Rumi, Saadi, Hafez, Khayyam, wrote in the language that Ferdowsi had preserved and ennobled. He is, in the truest sense, the father of them all.', fa: 'و راست می‌گفت. به برکت شاهنامه، زبان فارسی نه‌تنها رنگ نباخت که بالید، و یکی از زبان‌های بزرگ ادبی جهان شد. هر شاعری که پس از او آمد، مولانا و سعدی و حافظ و خیام، به زبانی سرود که فردوسی نگاهش داشته و بلندش کرده بود. او، به راست‌ترین معنا، پدر همهٔ آنان است.' },
          { t: 'p', x: 'For a thousand years his verses have been recited in palaces and in village homes, memorized by the learned and the humble alike, told to children and treasured by kings. The Shahnameh became, and remains, the national epic of Iran, the book that holds the nation\'s soul.', fa: 'هزار سال است که بیت‌هایش را در کاخ‌ها و در خانه‌های روستایی خوانده‌اند، دانشمند و مردم ساده هر دو از بر کرده‌اند، برای کودکان گفته‌اند و شاهان عزیزش داشته‌اند. شاهنامه حماسهٔ ملی ایران شد و مانده است؛ کتابی که جان این ملت را در خود نگاه داشته.' },
          { t: 'imgframe', key: 'tomb-ferdowsi', cap: 'The tomb of Ferdowsi at Tus, a place of pilgrimage for lovers of Persian poetry.' },
          { t: 'rule' },
        ] },
        { blocks: [
          { t: 'p', x: 'This has been a glimpse of Ferdowsi, the poet of Tus, one of the greatest who ever lived. He was a man who gave everything he had, his fortune, his years, his very life, to a single, magnificent purpose: to save the language and the memory of his people, and to give them back their voice.', fa: 'این نگاهی بود کوتاه به فردوسی، حکیم توس، از بزرگ‌ترین شاعرانی که زیسته‌اند. مردی که هرچه داشت، دارایی‌اش، سال‌هایش، خودِ زندگی‌اش، پای یک هدف باشکوه گذاشت: نگاه داشتن زبان و خاطرهٔ مردمش، و بازگرداندن صدایشان به آنان.' },
          { t: 'p', x: 'He succeeded beyond any dream. In giving Iran the Shahnameh, he gave it back itself. And so, just as he foretold, he did not die. In every Persian word of beauty spoken in the thousand years since, Ferdowsi lives on.', fa: 'کامیابی‌اش از هر رؤیایی فراتر رفت. با بخشیدن شاهنامه به ایران، خودِ ایران را به او بازگرداند. و چنان‌که خود پیش‌بینی کرده بود، نمرد. در هر واژهٔ زیبای فارسی که در هزار سال گذشته بر زبان آمده، فردوسی زنده است.' },
          { t: 'illumin', x: 'He said he would not die. A thousand years later, he speaks still.', fa: 'گفت که نمی‌میرد. هزار سال بعد، هنوز سخن می‌گوید.' },
          { t: 'motif', symbol: 'star', caption: 'فردوسی' },
        ] },
      ],
    },
  ],
};

const hafez: Author = {
  key: 'hafez',
  name: 'Hafez',
  persian: 'حافظ',
  epithet: 'The Tongue of the Unseen',
  years: 'c. 1315 - 1390',
  essence: 'The poet of Shiraz whose book sits in almost every Iranian home, opened at the turning of the year and at every crossroads of a life, still answering after six hundred years.',
  cover: 'lit-hafez-cover',
  closing: 'hafez-tomb',
  status: 'ready',
  chapters: [
    {
      key: 'hz1',
      title: 'The One Who Remembered', titleFa: 'آن‌که از بر داشت',
      nav: 'Shiraz', navFa: 'شیراز',
      subtitle: 'SHIRAZ, c. 1315',
      pages: [
        { blocks: [
          { t: 'lead', x: 'There are two books in almost every Iranian home. One is holy. The other is Hafez.', fa: 'در خانهٔ تقریباً هر ایرانی دو کتاب هست. یکی مقدس است. دیگری حافظ.', fa: 'در خانهٔ تقریباً هر ایرانی دو کتاب هست. یکی مقدس است. دیگری حافظ.', mark: 'cup' },
          { t: 'p', x: 'He was born Shams al Din Mohammad, in Shiraz, in a century when the city passed from one ruler to the next like a coin. His father died when he was young. The family had little. He worked, by the old accounts, in a bakery, and delivered bread to the wealthy quarters of the city.', fa: 'شمس‌الدین محمد زاده شد، در شیراز، در قرنی که این شهر چون سکه‌ای از دستی به دست دیگر می‌گشت. پدرش در کودکی او درگذشت. خانواده چیز چندانی نداشت. بنا بر روایت‌های کهن، در نانوایی کار می‌کرد و نان را به محله‌های توانگرنشین شهر می‌رساند.' },
          { t: 'p', x: 'And somewhere in those years he memorised the Quran, entirely, word for word. That is what his name means. Hafez is not a name at all. It is a title given to one who holds the whole book in memory. The boy who carried bread through Shiraz was carrying something else as well.', fa: 'و جایی در همان سال‌ها قرآن را از بر کرد، تمامش، واژه به واژه. معنای نامش همین است. حافظ اصلاً نام نیست؛ لقبی است برای کسی که تمام کتاب را در حافظه دارد. پسری که نان را در شیراز این‌سو و آن‌سو می‌برد، چیز دیگری هم با خود حمل می‌کرد.' },
          { t: 'motif', symbol: 'book', caption: 'حافظ, the one who holds it all in memory.', captionFa: 'حافظ؛ آن‌که همه را در حافظه دارد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A city worth loving', fa: 'شهری که ارزش دوست داشتن دارد' },
          { t: 'p', x: 'Shiraz was already the city of Saadi, already famous for its gardens, its wine, its roses and its nightingales. Hafez almost never left it. In a century of conquerors, when Timur was burning his way across the world, this poet stayed in one city and wrote about one city, and became universal by doing so.', fa: 'شیراز از پیش شهر سعدی بود، از پیش به باغ‌ها و می و گل و بلبلش نامدار. حافظ تقریباً هرگز از آن بیرون نرفت. در قرنی پر از فاتحان، آنگاه که تیمور جهان را می‌سوزاند و پیش می‌رفت، این شاعر در یک شهر ماند و از یک شهر نوشت، و درست با همین کار جهانی شد.' },
          { t: 'aside', x: 'He is the least travelled of the great Persian poets, and the most widely read.', fa: 'کم‌سفرترین شاعر بزرگ ایران است، و پرخواننده‌ترینشان.' },
          { t: 'p', x: 'There is a story, and it may even be true, that when Timur took Shiraz he summoned Hafez to answer for a famous line, the one offering Samarkand and Bukhara, Timur own cities, for the mole on a beautiful face. How dare you, the conqueror asked, give away my cities for a mole. Hafez, old and poor and standing before the most feared man alive, replied that it was precisely such extravagance that had reduced him to this poverty. Timur laughed, and let him go.', fa: 'حکایتی هست، و شاید راست هم باشد، که چون تیمور شیراز را گرفت حافظ را خواست تا پاسخ آن بیت نامدارش را بدهد؛ همان که سمرقند و بخارا، شهرهای خودِ تیمور، را به خالِ رخساری می‌بخشد. فاتح پرسید: چگونه جرئت می‌کنی شهرهای مرا به یک خال ببخشی؟ حافظ، پیر و تنگدست، ایستاده در برابر هراس‌انگیزترین مرد زنده، پاسخ داد که از همین بخشندگی است که به این تنگدستی افتاده است. تیمور خندید و رهایش کرد.' },
          { t: 'illumin', x: 'A poet with nothing disarmed the conqueror of the world with a joke.', fa: 'شاعری که هیچ نداشت، فاتح جهان را با یک شوخی خلع سلاح کرد.' },
        ] },
      ],
    },
    {
      key: 'hz2',
      title: 'The Art of Saying Two Things', titleFa: 'هنر دو معنا گفتن',
      nav: 'His Art', navFa: 'هنر او',
      subtitle: 'HOW HE WRITES',
      pages: [
        { blocks: [
          { t: 'p', x: 'To read Hafez is to learn that a line can hold two meanings at once and mean both of them completely. This is the whole art, and it is why he has never been exhausted in six hundred years of reading.', fa: 'حافظ خواندن یعنی آموختن اینکه یک بیت می‌تواند دو معنا را با هم در خود داشته باشد و هر دو را تمام و کمال بخواهد. ایهام، تمامِ هنر همین است، و به همین سبب است که شش قرن خواندن هنوز او را ته نکشیده.' },
          { t: 'p', x: 'When he writes of wine, he means wine, and he means the intoxication of the divine. When he writes of the beloved, he means a person, and he means God. When he mocks the hypocrite preacher, he means that preacher, and he means every hollow authority that has ever lived. He never chooses. The choice is left to you, and what you choose reveals you.', fa: 'وقتی از می می‌گوید، هم می را می‌خواهد و هم مستی حق را. وقتی از معشوق می‌گوید، هم آدمی را می‌خواهد و هم خدا را. وقتی واعظ ریاکار را دست می‌اندازد، هم همان واعظ را می‌خواهد و هم هر اقتدار توخالی‌ای که تاکنون بوده. هرگز یکی را برنمی‌گزیند. گزینش را به تو وامی‌گذارد، و آنچه برمی‌گزینی، تو را آشکار می‌کند.' },
          { t: 'veil', surface: 'Come, for the palace of hope is built on sand. Bring wine, for the foundation of life is wind.', surfaceFa: 'بیا که قصر امل سخت سست بنیادست\u200Cبیار باده که بنیاد عمر بر بادست', hidden: 'On the surface, a drinking song. Beneath, one of the oldest truths there is: everything you are building will not hold, so stop clutching at permanence and be present in the hour you actually have.', hiddenFa: 'در ظاهر، ترانه‌ای در ستایش می. در باطن، یکی از کهن‌ترین حقیقت‌هایی که هست: هرچه می‌سازی پایدار نمی‌ماند، پس دست از چنگ زدن به ماندگاری بردار و در همان ساعتی باش که به‌راستی داری.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Why the double meaning mattered', fa: 'چرا ایهام اهمیت داشت' },
          { t: 'p', x: 'This was not a game. Hafez lived under rulers who policed piety, and one of them, Mobarez al Din, was so severe that Hafez and his circle called him the police officer. To say the true thing plainly was dangerous. To say it in a way that could always mean something else was survival, and it was art.', fa: 'این بازی نبود. حافظ زیر فرمان حاکمانی می‌زیست که پارسایی را پاس می‌داشتند و بر آن نظارت می‌کردند، و یکی از آنان، امیر مبارزالدین، چنان سختگیر بود که حافظ و یارانش او را محتسب می‌خواندند. حقیقت را آشکارا گفتن خطر داشت. آن را چنان گفتن که همیشه بتواند معنای دیگری هم داشته باشد، هم ماندن بود و هم هنر.' },
          { t: 'p', x: 'So the tavern in his poems is the mosque and it is not the mosque. The wine cup is a real cup and it is the whole world. He wrote in a language that authority could not convict, and everyone understood him anyway.', fa: 'پس خرابات در شعر او هم مسجد است و هم نیست. جام می هم جامی واقعی است و هم تمام جهان. به زبانی نوشت که قدرت نمی‌توانست بر آن حکم ببندد، و با این حال همه می‌فهمیدندش.' },
          { t: 'veil', surface: 'Last night I saw the angels knocking at the tavern door, kneading the clay of Adam and casting it into a cup.', surfaceFa: 'دوش دیدم که ملائک در میخانه زدند\u200Cگِل آدم بسرشتند و به پیمانه زدند', hidden: 'The sacred is not in the place the pious told you to look. It is in the tavern, the ruined place, the disreputable corner. God is being made where the respectable would never think to search.', hiddenFa: 'آنچه مقدس است، آنجا نیست که پارسایان نشانت دادند. در میخانه است، در خرابات، در همان گوشهٔ بدنام. کارِ خدا آنجا در جریان است که آبرومندان هرگز به فکرِ گشتنش نمی‌افتند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The form he perfected', fa: 'قالبی که به کمال رساندش' },
          { t: 'p', x: 'He wrote the ghazal, a form of independent couplets bound by rhyme and a single mood rather than a single argument. Each couplet stands alone and could be quoted alone, which is exactly why his lines travel so easily into ordinary speech. A ghazal is not a story. It is a scattering of jewels that somehow make a necklace.', fa: 'او غزل سرود؛ قالبی از بیت‌های مستقل که قافیه و ردیف و یک حال و هوای واحد به هم می‌بنددشان، نه یک استدلال پیوسته. هر بیت بر پای خود می‌ایستد و می‌توان تنها همان را نقل کرد، و درست به همین سبب است که بیت‌هایش این‌چنین آسان به زبان مردم راه می‌یابند. غزل داستان نیست. پراکندنِ گوهرهایی است که به‌نحوی گردنبند می‌شوند.' },
          { t: 'ghazal', couplets: [
            { a: 'Do not grieve. The lost Joseph will return to Canaan.', b: 'The house of sorrow will become a garden. Do not grieve.', aFa: 'یوسف گمگشته بازآید به کنعان غم مخور', bFa: 'کلبهٔ احزان شود روزی گلستان غم مخور' },
            { a: 'Do not grieve, sorrowing heart, your state will mend.', b: 'That head will find its calm again. Do not grieve.', aFa: 'ای دل غمدیده حالت به شود دل بد مکن', bFa: 'وین سر شوریده بازآید به سامان غم مخور' },
            { a: 'The dark night and the fear of waves and the terrible whirlpool,', b: 'what do they know of our state, those light on the shore.', aFa: 'شب تاریک و بیم موج و گردابی چنین هایل', bFa: 'کجا دانند حال ما سبکباران ساحل‌ها' },
          ], note: 'From the most beloved ghazal in the Persian language. Every Iranian knows the refrain.', noteFa: 'از محبوب‌ترین غزل زبان فارسی. ردیفش را هر ایرانی از بر است.' },
          { t: 'p', x: 'That refrain, gham makhor, do not grieve, has been said by mothers to children and by strangers to strangers for six hundred years. It is not advice. It is a hand on the shoulder.', fa: 'آن ردیف، غم مخور، شش قرن است که مادران به فرزندان و غریبه‌ها به غریبه‌ها می‌گویندش. نصیحت نیست. دستی است که بر شانه می‌نشیند.' },
        ] },
      ],
    },
    {
      key: 'hz3',
      title: 'The Book That Answers', titleFa: 'کتابی که پاسخ می‌دهد',
      nav: 'The Fal', navFa: 'فال',
      subtitle: 'FAL E HAFEZ',
      pages: [
        { blocks: [
          { t: 'p', x: 'Here is what no other poet in the world has. Iranians do not only read Hafez. They ask him.', fa: 'و اینجا چیزی هست که هیچ شاعر دیگری در جهان ندارد. ایرانیان حافظ را تنها نمی‌خوانند. از او می‌پرسند.' },
          { t: 'p', x: 'The custom is called fal e Hafez, the omen of Hafez. You hold a question in your heart, a real one, the kind you have been carrying. You touch the book. You open it at random. And the verse your eye falls on is read as the answer, not as a prediction of what will happen, but as a mirror held up to what you already know and have not admitted.', fa: 'این آیین را فال حافظ می‌خوانند. پرسشی را در دل نگاه می‌داری، پرسشی راستین، از آنها که مدتی است با خود می‌بری. نیت می‌کنی. دست بر کتاب می‌گذاری و بی‌قصد بازش می‌کنی. و بیتی که چشمت بر آن می‌افتد پاسخ خوانده می‌شود؛ نه پیشگویی آنچه رخ خواهد داد، که آینه‌ای در برابر آنچه خود می‌دانی و به آن اعتراف نکرده‌ای.' },
          { t: 'aside', x: 'It happens at Nowruz around the Haft Seen, at Yalda in the long night, and any evening a family needs it.', fa: 'نوروز، گرد سفرهٔ هفت‌سین؛ شب یلدا، در آن شب دراز؛ و هر شبی که خانواده‌ای به آن نیاز داشته باشد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Why him', fa: 'چرا او' },
          { t: 'p', x: 'No one decided this. It grew. It happened because his double meanings mean the verse will always have something to say to whatever you brought to it, and because the country trusted him. He is called Lisan al Ghayb, the Tongue of the Unseen, and the title was not given lightly. Iranians believe, or half believe, or enjoy believing, that he sees.', fa: 'کسی چنین تصمیمی نگرفت. خودش رویید. از آن رو رخ داد که ایهام او سبب می‌شود بیت همیشه چیزی برای گفتن به هر پرسشی داشته باشد که با خود آورده‌ای، و از آن رو که این سرزمین به او اعتماد کرد. او را لسان‌الغیب می‌خوانند، و این لقب را به آسانی نداده‌اند. ایرانیان باور دارند، یا نیمه‌باور، یا از باور کردنش لذت می‌برند، که او می‌بیند.' },
          { t: 'p', x: 'And the reading is never literal. A verse about wine answers a question about a marriage. A verse about a rose answers a question about leaving the country. This is not a failure of the method. It is the method. Hafez does not tell you what to do. He tells you what you already think, in words beautiful enough that you can finally hear it.', fa: 'و خواندن هرگز تحت‌اللفظی نیست. بیتی دربارهٔ می، پاسخ پرسشی دربارهٔ ازدواج می‌شود. بیتی دربارهٔ گل، پاسخ پرسشی دربارهٔ رفتن از این کشور. این نقصِ روش نیست؛ خودِ روش است. حافظ به تو نمی‌گوید چه کن. آنچه را خودت پیش‌تر می‌اندیشیدی به تو می‌گوید، با واژه‌هایی چنان زیبا که سرانجام بتوانی بشنوی‌اش.' },
          { t: 'illumin', x: 'It is not fortune telling. It is a nation using poetry as a mirror.', fa: 'این پیشگویی نیست. ملتی است که شعر را آینه کرده است.' },
        ] },
        { blocks: [
          { t: 'p', x: 'Ask him yourself. Hold your question, and open the book.', fa: 'خودت از او بپرس. نیت کن، و کتاب را بگشا.' },
          { t: 'fal' },
          { t: 'aside', x: 'Ask once, and sit with what you are given. That is the whole tradition.', fa: 'یک بار بپرس، و با آنچه به تو داده‌اند بنشین. تمام آیین همین است.' },
        ] },
      ],
    },
    {
      key: 'hz4',
      title: 'What He Believed', titleFa: 'به چه باور داشت',
      nav: 'His Mind', navFa: 'اندیشهٔ او',
      subtitle: 'HIS MIND',
      pages: [
        { blocks: [
          { t: 'p', x: 'Beneath the wine and the roses there is a philosophy, and it is fierce. Hafez spent his life attacking one thing above all others, and it was not sin. It was hypocrisy.', fa: 'زیر آن می و گل، اندیشه‌ای نشسته است، و اندیشه‌ای تند و بی‌رحم. حافظ عمرش را صرف تاختن بر یک چیز کرد، بیش از هر چیز دیگر، و آن گناه نبود. ریا بود.' },
          { t: 'p', x: 'He goes after the preacher who tells others to fast while eating, the judge who sells verdicts, the ascetic whose piety is a performance. In his poems the honest drunk is closer to God than the dishonest saint, because the drunk at least is not pretending. This was not blasphemy. It was a demand that the sacred be real.', fa: 'به واعظی می‌تازد که دیگران را به روزه می‌خواند و خود می‌خورد، به قاضی‌ای که حکم می‌فروشد، به زاهدی که پارسایی‌اش نمایش است. در شعر او رندِ راستگو به خدا نزدیک‌تر است تا زاهدِ دروغین، چرا که رند دست‌کم وانمود نمی‌کند. این کفر نبود. خواستی بود برای آنکه امر مقدس، راستین باشد.' },
          { t: 'ghazal', couplets: [
            { a: 'Preachers who make their display in pulpit and prayer niche,', b: 'do other work when they are alone behind the door.', aFa: 'واعظان کاین جلوه در محراب و منبر می‌کنند', bFa: 'چون به خلوت می‌روند آن کار دیگر می‌کنند' },
            { a: 'I have a question. Ask the learned of the assembly:', b: 'why do those who order repentance so seldom repent.', aFa: 'مشکلی دارم ز دانشمند مجلس بازپرس', bFa: 'توبه‌فرمایان چرا خود توبه کمتر می‌کنند' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'Love as the only law', fa: 'عشق، تنها شریعت' },
          { t: 'p', x: 'Against the hypocrite he sets one thing: love. Not sentiment, but love as a discipline that dissolves the self and its calculations. He holds that a heart alive with love does not die, that the lover who counts the cost has not loved, and that this is the only path that leads anywhere true.', fa: 'در برابر ریاکار یک چیز می‌نشاند: عشق. نه احساساتی‌گری، که عشق چون راه و ریاضتی که خود و حساب‌وکتاب‌هایش را در خود حل می‌کند. بر آن است که دلی که به عشق زنده باشد نمی‌میرد، که عاشقی که بها را می‌شمارد عاشق نبوده، و که تنها همین راه است که به جایی راستین می‌رسد.' },
          { t: 'veil', surface: 'I am the slave of the spirit that has no colour of attachment, not to disbelief, not to faith, not to certainty, not to doubt.', surfaceFa: 'غلام همت آنم که زیر چرخ کبود\u200Cز هر چه رنگ تعلق پذیرد آزاد است', hidden: 'He refuses every camp, including the ones that would claim him. Not the pious side, not the sceptical side. The freedom he wants is outside the argument entirely, and this line has protected him from six centuries of people trying to enlist him.', hiddenFa: 'هیچ اردوگاهی را نمی‌پذیرد، حتی آنها را که او را از آنِ خود می‌خوانند. نه سمت پارسایان، نه سمت شکاکان. آزادی‌ای که می‌خواهد یکسره بیرون از این دعواست، و همین یک بیت شش قرن او را از دست کسانی که می‌خواستند زیر پرچم خودشان بکشندش نگاه داشته است.' },
          { t: 'p', x: 'And through it all runs a tenderness toward human failure. Hafez never condemns the weak. He condemns only those who condemn the weak. That is why a nation has trusted him with its questions.', fa: 'و در سرتاسر این‌ها مهری نسبت به لغزش آدمی جاری است. حافظ هرگز ناتوان را سرزنش نمی‌کند. تنها کسانی را سرزنش می‌کند که ناتوان را سرزنش می‌کنند. به همین سبب است که یک ملت پرسش‌هایش را به او سپرده است.' },
        ] },
      ],
    },
    {
      key: 'hz5',
      title: 'Still Answering', titleFa: 'هنوز پاسخ می‌دهد',
      nav: 'Legacy', navFa: 'میراث',
      subtitle: 'HIS LEGACY',
      pages: [
        { blocks: [
          { t: 'p', x: 'He was buried in a garden in Shiraz, and the garden is still there. It is called the Hafezieh, and it is one of the few tombs in the world that people visit not to mourn but to sit. They read to each other. They drink tea. They open the book, and ask, and go home lighter.', fa: 'در باغی در شیراز به خاک سپرده شد، و آن باغ هنوز هست. حافظیه‌اش می‌خوانند، و از معدود آرامگاه‌های جهان است که مردم نه برای سوگواری، که برای نشستن به آن می‌روند. برای هم می‌خوانند. چای می‌نوشند. کتاب را می‌گشایند و می‌پرسند، و سبک‌تر به خانه برمی‌گردند.' },
          { t: 'imgframe', key: 'hafez-tomb', cap: 'The Hafezieh in Shiraz, where people come to read rather than to grieve.' },
          { t: 'p', x: 'His reach went far beyond Persian. Goethe read him in translation and was so shaken that he wrote an entire book in answer, calling Hafez his twin. Emerson translated him. Nietzsche praised him. And every one of them was reading a shadow of the original, because his wordplay does not survive the crossing.', fa: 'دامنهٔ اثرش بسی فراتر از فارسی رفت. گوته او را در ترجمه خواند و چنان تکان خورد که کتابی تمام در پاسخش نوشت و حافظ را همزاد خود خواند. امرسون ترجمه‌اش کرد. نیچه ستودش. و هر یک از آنان سایه‌ای از اصل را می‌خواندند، چرا که بازی او با واژه‌ها از این گذر جان به در نمی‌برد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The guide', fa: 'پیر مغان' },
          { t: 'p', x: 'What matters most is smaller than any of that. It is that an ordinary family, on the longest night of the year, opens a book of poems and asks it what to do. Six hundred years after his death, a poet is still the household oracle of a nation, consulted about marriages and moves and grief.', fa: 'اما آنچه بیش از همه اهمیت دارد، از همهٔ اینها کوچک‌تر است: اینکه خانواده‌ای معمولی، در درازترین شب سال، دیوان شعری را می‌گشاید و از آن می‌پرسد چه کند. ششصد سال پس از مرگش، شاعری هنوز غیب‌گوی خانگی یک ملت است؛ در کار ازدواج و کوچ و سوگ با او مشورت می‌کنند.' },
          { t: 'p', x: 'No other literature on earth has quite this. Not one poet in one country holding this position for this long, in homes that have nothing else in common. Hafez is not read in Iran. He is consulted.', fa: 'هیچ ادبیات دیگری بر روی زمین درست چنین چیزی ندارد. نه یک شاعر در یک کشور که این‌همه سال چنین جایگاهی داشته باشد، در خانه‌هایی که جز همین هیچ وجه اشتراکی ندارند. حافظ را در ایران نمی‌خوانند. با او مشورت می‌کنند.' },
          { t: 'illumin', x: 'A country that has lost much has never once lost him.', fa: 'کشوری که بسیار از دست داده، حتی یک بار او را از دست نداده است.' },
        ] },
        { blocks: [
          { t: 'rule' },
          { t: 'p', x: 'This has been a glimpse of Hafez, the orphan of Shiraz who memorised one book and then wrote another, and who taught a whole civilization how to say the forbidden thing beautifully enough to survive saying it.', fa: 'این نگاهی بود کوتاه به حافظ؛ یتیم شیراز که کتابی را از بر کرد و سپس کتابی دیگر نوشت، و به تمدنی تمام آموخت که چگونه سخن ممنوع را چنان زیبا بگوید که از گفتنش جان به در ببرد.' },
          { t: 'p', x: 'He offered no doctrine and demanded no belief. He only insisted that hypocrisy is the sin, that love is the law, and that the moment in your hand is the only one you were ever given. Iranians have been opening his book for six hundred years, and it has not run out of answers yet.', fa: 'نه مکتبی عرضه کرد و نه باوری خواست. تنها بر این پای فشرد که ریا همان گناه است، که عشق همان شریعت است، و که همین دمی که در دست داری تنها دمی است که به تو داده‌اند. ایرانیان ششصد سال است دیوانش را می‌گشایند، و هنوز پاسخ‌هایش ته نکشیده.' },
          { t: 'illumin', x: 'Ask him a question, and he will give you back your own heart, in better words than you had.', fa: 'از او بپرس، و دل خودت را به تو بازمی‌گرداند؛ با واژه‌هایی بهتر از آنچه داشتی.' },
          { t: 'motif', symbol: 'moon', caption: 'حافظ' },
        ] },
      ],
    },
  ],
};

const saadi: Author = {
  key: 'saadi',
  name: 'Saadi',
  persian: 'سعدی',
  epithet: 'The Master of Speech',
  years: 'c. 1210 - 1291',
  essence: 'The traveller of Shiraz who spent thirty years walking the world and came home to write how to live in it. His lines are quoted in Iranian kitchens every day, and one of them hangs in the United Nations.', essenceFa: 'جهانگردِ شیراز که سی سال جهان را پیاده پیمود و بازگشت تا بنویسد چگونه باید در آن زیست. بیت‌هایش هر روز در آشپزخانه‌های ایران نقل می‌شود، و یکی از آنها بر دیوار سازمان ملل است.',
  cover: 'lit-saadi-cover',
  closing: 'saadi-tomb',
  status: 'ready',
  chapters: [
    {
      key: 'sd1',
      title: 'The Long Road Home', titleFa: 'راه دراز بازگشت',
      nav: 'The Road', navFa: 'راه',
      subtitle: 'SHIRAZ, c. 1210',
      pages: [
        { blocks: [
          { t: 'lead', x: 'Hafez asked the questions. Saadi answered them.', fa: 'حافظ پرسش‌ها را طرح کرد. سعدی پاسخشان را داد.', mark: 'rose' },
          { t: 'p', x: 'They were born in the same city, a century apart, and Iran has kept them both. But they are not the same kind of poet at all. Hafez writes about the soul in love. Saadi writes about how to behave on a Tuesday, among difficult people, when you are tired.', fa: 'هر دو در یک شهر به دنیا آمدند، با فاصله‌ای یک‌صدساله، و ایران هر دو را در حافظهٔ خود نگاه داشته است. اما این دو، به‌هیچ‌وجه از یک جنس شاعر نیستند. حافظ از جانِ عاشق و شورِ عشق می‌سراید؛ سعدی اما از این می‌گوید که در یک روز معمولی، میان آدم‌های دشوار، وقتی خسته‌ای، چگونه باید رفتار کنی.' },
          { t: 'p', x: 'He was born in Shiraz around 1210, lost his father young, and was sent to Baghdad to study at the Nizamiyya, the finest school in the Islamic world. And then the world he was studying began to end.', fa: 'حدود سال ۱۲۱۰ میلادی در شیراز زاده شد، در کودکی پدرش را از دست داد، و برای تحصیل به نظامیهٔ بغداد فرستاده شد؛ بهترین مدرسهٔ جهان اسلام. و بعد، همان جهانی که داشت درسش را می‌خواند، رو به پایان گذاشت.' },
          { t: 'motif', symbol: 'rose', caption: 'سعدی' },
        ] },
        { blocks: [
          { t: 'h', x: 'Thirty years of walking', fa: 'سی سال راه رفتن' },
          { t: 'p', x: 'The Mongols were coming. Saadi left, and did not come back for roughly thirty years. He went to Anatolia, to Syria, to Egypt, to Arabia and the Hejaz, and by some accounts as far as India. He was not travelling for pleasure. He was a man whose country was being destroyed behind him.', fa: 'مغول‌ها داشتند می‌آمدند. سعدی رفت، و نزدیک سی سال بازنگشت. به آناتولی رفت، به شام، به مصر، به عربستان و حجاز، و به روایتی تا هند. برای تفریح سفر نمی‌کرد. مردی بود که پشت سرش کشورش را ویران می‌کردند.' },
          { t: 'p', x: 'He preached in mosques, worked, went hungry, and watched. And unlike almost every other great Persian poet, he wrote about ordinary people, because he had spent three decades among them, at their level, with nothing.', fa: 'در مسجدها وعظ کرد، کار کرد، گرسنگی کشید، و نگاه کرد. و برخلاف تقریباً هر شاعر بزرگ دیگر ایران، دربارهٔ مردم عادی نوشت؛ چون سه دهه میان همان‌ها زیسته بود، هم‌سطح خودشان، و بی‌هیچ چیز.' },
          { t: 'aside', x: 'He tells us he was captured by Crusaders near Acre and set to digging trenches, until a merchant of Aleppo recognised him and paid his ransom.', fa: 'خودش می‌گوید نزدیک عکا به دست صلیبیان اسیر شد و وادارش کردند خندق بکَنَد، تا آنکه بازرگانی از حلب او را شناخت و بازخریدش کرد.' },
          { t: 'p', x: 'Then the merchant offered him his daughter in marriage, and the marriage was miserable. Saadi tells this story about himself, including the part where the wife reminds him he was bought. He is the only one of the great poets who is consistently, deliberately funny about his own humiliations.', fa: 'بعد همان بازرگان دخترش را به او داد، و این ازدواج فلاکت‌بار از آب درآمد. سعدی این حکایت را دربارهٔ خودش نقل می‌کند، از جمله آن تکه که زن به یادش می‌آورد خریده شده است. او تنها شاعر بزرگی است که پیوسته و عامدانه دربارهٔ خواری‌های خودش شوخی می‌کند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The city that survived', fa: 'شهری که جان به در برد' },
          { t: 'p', x: 'He came home around 1257, and found something remarkable. Shiraz was standing. Its rulers had read the situation, submitted to the Mongols, paid, and spared the city the fate of Baghdad and Nishapur. It was not glorious. It saved everything.', fa: 'حدود سال ۱۲۵۷ به خانه بازگشت و با منظره‌ای شگفت‌انگیز روبه‌رو شد: شیراز همچنان سرِ پا بود. حاکمان شهر اوضاع را درست تشخیص داده بودند؛ به مغولان تسلیم شده، باج پرداخته و شهر را از سرنوشتی که بر بغداد و نیشابور رفت، در امان نگه داشته بودند. کار باشکوهی نبود؛ اما همه‌چیز را نجات داد.' },
          { t: 'p', x: 'In 1258 the Mongols took Baghdad and killed the caliph and put the greatest library in the world into the river. That same year, in the one Persian city still intact, Saadi finished the Golestan.', fa: 'در سال ۱۲۵۸ مغول‌ها بغداد را گرفتند، خلیفه را کشتند، و بزرگ‌ترین کتابخانهٔ جهان را به رودخانه ریختند. همان سال، در تنها شهر ایرانی که هنوز سالم مانده بود، سعدی گلستان را به پایان رساند.' },
          { t: 'illumin', x: 'The world was burning. He sat in a garden and wrote about kindness.', fa: 'جهان می‌سوخت. او در باغی نشست و از مهربانی نوشت.' },
        ] },
      ],
    },
    {
      key: 'sd2',
      title: 'The Rose Garden', titleFa: 'گلستان',
      nav: 'Golestan', navFa: 'گلستان',
      subtitle: 'HIS TWO BOOKS',
      pages: [
        { blocks: [
          { t: 'p', x: 'He wrote two books that Iranians have not stopped reading since. The Bustan, the Orchard, all in verse, on how a good life should be lived. And the Golestan, the Rose Garden, which is stranger and greater.', fa: 'دو کتاب نوشت که ایرانیان از آن روز تا امروز از خواندنشان دست نکشیده‌اند. بوستان، که یکسره به نظم است، دربارهٔ اینکه زندگی نیک را چگونه باید زیست. و گلستان، که غریب‌تر است و بزرگ‌تر.' },
          { t: 'p', x: 'The Golestan is short stories. Real ones, about kings and beggars and thieves and fools, told in a few lines of prose, each ending in a couplet that lands the point like a hand on a table. Nothing else in Persian literature is built this way.', fa: 'گلستان مجموعه‌ای از حکایت‌های کوتاه است. حکایت‌هایی واقعی، دربارهٔ شاهان و گدایان و دزدان و ابلهان، در چند سطر نثر، که هر کدام به بیتی ختم می‌شود و آن بیت مطلب را می‌کوبد، مثل دستی که روی میز فرود بیاید. هیچ چیز دیگری در ادبیات فارسی این‌گونه ساخته نشده است.' },
          { t: 'story', title: 'The King and the Frightened Slave', titleFa: 'پادشاه و غلام ترسیده', x: 'A slave on a ship panics and will not stop screaming. Nothing calms him. A wise man tells the crew to throw him into the sea, and they do, and after he has swallowed water and been hauled back aboard, he sits quietly in a corner. Asked why, the wise man says: he had never known the danger of drowning, so he never valued the safety of the boat.', fa: 'غلامی در کشتی وحشت می‌کند و دست از فریاد برنمی‌دارد. هیچ‌چیز آرامش نمی‌کند. حکیمی به ملاحان می‌گوید او را به دریا بیندازند، و می‌اندازند؛ و پس از آنکه چند جرعه آب خورد و بازش کشیدند، ساکت در گوشه‌ای می‌نشیند. می‌پرسند چرا، و حکیم می‌گوید: خطر غرق شدن را نچشیده بود، پس قدر امنیت کشتی را نمی‌دانست.', moral: 'You will not know what you have while you have it.', moralFa: 'قدر آنچه داری را تا وقتی داری‌اش نمی‌دانی.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Why it is taught to children', fa: 'چرا آن را به کودکان می‌آموزند' },
          { t: 'p', x: 'For seven hundred years the Golestan was the first book Persian children learned to read properly. Not because it was simple, but because its prose is the most graceful ever written in the language, and because every story teaches something without ever quite lecturing.', fa: 'هفتصد سال، گلستان نخستین کتابی بود که کودکان ایرانی درست‌وحسابی با آن خواندن می‌آموختند. نه از آن رو که ساده بود، بلکه از آن رو که نثرش موزون‌ترین نثری است که در این زبان نوشته شده، و از آن رو که هر حکایتش چیزی می‌آموزد بی‌آنکه هرگز کاملاً به موعظه بیفتد.' },
          { t: 'p', x: 'Saadi is never pious about it. His moral is often uncomfortable. He tells you that a lie which prevents harm is better than a truth that causes it, which is not what a holy man is supposed to say.', fa: 'سعدی هرگز در این کار زاهدمآب نیست. اخلاقی که پیشنهاد می‌کند اغلب معذب‌کننده است. می‌گوید دروغِ مصلحت‌آمیز به ز راستیِ فتنه‌انگیز، و این آن چیزی نیست که از یک مرد دین انتظار می‌رود.' },
          { t: 'ghazal', couplets: [
            { a: 'A falsehood mixed with good intent', b: 'is better than a truth that stirs up strife.' },
          ], note: 'From the Golestan. It has been quoted by Iranians in arguments for seven centuries.' },
          { t: 'story', title: 'The Man Who Boasted of His Piety', titleFa: 'مردی که به پارسایی‌اش می‌بالید', x: 'A man tells Saadi how much he prays, how much he fasts, how little he eats. Saadi says nothing. Later the man asks why he was silent. Because, Saadi tells him, the one who truly does these things does not keep the accounts.', fa: 'مردی برای سعدی می‌گوید که چقدر نماز می‌خواند، چقدر روزه می‌گیرد، چه کم می‌خورد. سعدی چیزی نمی‌گوید. بعدتر مرد می‌پرسد چرا خاموش بودی. سعدی می‌گوید: چون آن که این کارها را به‌راستی می‌کند، حسابشان را نگه نمی‌دارد.', moral: 'Goodness announced is goodness spent.', moralFa: 'نیکی‌ای که جار زده شود، خرج شده است.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Speech as the art', fa: 'سخن، همچون هنر' },
          { t: 'p', x: 'His title is Ostad e Sokhan, the Master of Speech, and it is not decoration. Persian prose was not really a literary art before him. He made it one, and set a standard so high that Iranians still measure sentences against it.', fa: 'لقبش استاد سخن است، و این تزیین نیست. نثر فارسی پیش از او به‌راستی هنری ادبی نبود. او آن را هنر کرد، و معیاری چنان بلند گذاشت که ایرانی‌ها هنوز جمله‌هایشان را با آن می‌سنجند.' },
          { t: 'p', x: 'And he understood silence as part of speech. A whole chapter of the Golestan is on knowing when not to talk, which is a strange subject for a man who lived by talking.', fa: 'و خاموشی را هم بخشی از سخن می‌دانست. یک باب کامل از گلستان دربارهٔ فواید خاموشی است؛ موضوعی غریب برای مردی که نانش را از سخن گفتن می‌خورد.' },
          { t: 'veil', surface: 'Whoever gives advice to a self willed man is himself in need of advice.', surfaceFa: 'هر که نصیحت خودرای کند، او نصیحت‌گری را محتاج است', hidden: 'Not cynicism. A working rule: you cannot teach someone who has decided they already know, and the effort damages you rather than them. Saadi spent thirty years learning this on the road.' },
        ] },
      ],
    },
    {
      key: 'sd3',
      title: 'Of One Body', titleFa: 'از یک پیکر',
      nav: 'Bani Adam', navFa: 'بنی‌آدم',
      subtitle: 'THE FAMOUS LINES',
      pages: [
        { blocks: [
          { t: 'p', x: 'Somewhere in the Golestan, without warning, in the middle of a chapter about kings, Saadi writes four lines that will outlive everything else he made.', fa: 'جایی در گلستان، بی‌هیچ مقدمه‌ای، وسط بابی دربارهٔ پادشاهان، سعدی چهار مصراع می‌نویسد که از هر چیز دیگری که ساخته عمر بیشتری خواهند کرد.' },
          { t: 'baniadam' },
          { t: 'p', x: 'Touch it. That is the poem, and that is also the argument.', fa: 'لمسش کن. شعر همین است، و استدلال هم همین.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What it actually says', fa: 'در واقع چه می‌گوید' },
          { t: 'p', x: 'Read it carefully, because it is more radical than it first sounds. It does not say we should be kind to one another. It says we are not separate. Your pain is in my body already, and if I do not feel it, the failure is not moral, it is anatomical. Something in me is not working.', fa: 'با دقت بخوانش، چون از آنچه در نگاه اول به گوش می‌آید بنیادی‌تر است. نمی‌گوید باید با هم مهربان باشیم. می‌گوید ما از هم جدا نیستیم. درد تو همین حالا در تن من است، و اگر حسش نکنم، اشکال اخلاقی نیست، اشکال در ساختار تن است. چیزی در من کار نمی‌کند.' },
          { t: 'p', x: 'And the last line is a threat, gently delivered. If you do not feel the suffering of others, you do not deserve to be called human. Saadi does not ask. He defines.', fa: 'و بیت آخر تهدیدی است که به نرمی گفته می‌شود: اگر از محنت دیگران بی‌غم باشی، نشاید که نامت را آدمی بگذارند. سعدی خواهش نمی‌کند. تعریف می‌کند.' },
          { t: 'illumin', x: 'He wrote it in the decade the Mongols were emptying the cities of Iran.', fa: 'آن را در همان دهه‌ای نوشت که مغول‌ها داشتند شهرهای ایران را خالی می‌کردند.' },
          { t: 'p', x: 'That is the part worth holding. This is not the work of a comfortable man in a peaceful century. It was written by someone who had watched the world tear itself apart and concluded, from inside the wreckage, that humanity is a single body.', fa: 'همین نکته است که باید نگهش داشت. این کارِ مردی آسوده در قرنی آرام نیست. کسی نوشته‌اش که دیده بود جهان خودش را تکه‌تکه می‌کند، و از دل همان آوار به این نتیجه رسیده بود که آدمیزاد یک پیکر است.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Where it went', fa: 'به کجا رسید' },
          { t: 'p', x: 'A carpet bearing these lines hangs in the United Nations building in New York, given by Iran. Secretaries General have quoted it. So have presidents. It is often said in Iran that it is carved over the entrance, which is not quite the case, but the pride behind the claim is understandable enough.', fa: 'فرشی با همین بیت‌ها در ساختمان سازمان ملل در نیویورک آویخته است، هدیهٔ ایران. دبیرکل‌ها نقلش کرده‌اند. رؤسای جمهور هم. در ایران اغلب می‌گویند بالای سردر ورودی حک شده، که دقیقاً چنین نیست، اما غروری که پشت این حرف است کاملاً قابل درک است.' },
          { t: 'aside', x: 'The truth is smaller and better: an eight hundred year old Persian couplet is hanging in the room where the world argues.', fa: 'حقیقت کوچک‌تر است و بهتر: بیتی فارسی از هشتصد سال پیش، در همان اتاقی آویخته که جهان در آن با هم بحث می‌کند.' },
        ] },
      ],
    },
    {
      key: 'sd4',
      title: 'The Stolen Chapter', titleFa: 'آن باب دزدیده',
      nav: 'The West', navFa: 'غرب',
      subtitle: 'SAADI ABROAD',
      pages: [
        { blocks: [
          { t: 'p', x: 'Saadi reached Europe long before most Persian poets, and one episode is too good not to tell.', fa: 'سعدی خیلی پیش از بیشتر شاعران ایرانی به اروپا رسید، و یک ماجرا هست که نگفتنش حیف است.' },
          { t: 'p', x: 'Benjamin Franklin loved a story from the Bustan. Abraham refuses to feed an old traveller who will not worship his God, and drives him out into the night. Then God asks Abraham: I have fed and tolerated that man for a hundred years, and you could not manage one night.', fa: 'بنجامین فرانکلین شیفتهٔ حکایتی از بوستان بود. ابراهیم از دادن غذا به مسافری سالخورده که خدای او را نمی‌پرستد سر باز می‌زند و او را در دل شب بیرون می‌کند. آنگاه خداوند از ابراهیم می‌پرسد: من صد سال است روزی‌اش می‌دهم و تحملش می‌کنم، و تو یک شب نتوانستی؟' },
          { t: 'story', title: 'The Parable Against Persecution', titleFa: 'حکایتی در نکوهش آزار دیگران', x: 'Franklin liked it so much that he printed it in the style of scripture, in biblical language, and passed it off as a missing chapter of Genesis. He would keep it in his Bible and read it aloud to guests, waiting to see how long it took anyone to notice it was not there.', fa: 'فرانکلین چنان از این حکایت خوشش آمد که آن را به سبک کتاب مقدس و با زبان تورات چاپ کرد و جا زد که بابی گمشده از سِفر پیدایش است. آن را لای انجیلش نگه می‌داشت و برای مهمان‌ها بلند می‌خواند، و منتظر می‌ماند ببیند چقدر طول می‌کشد تا کسی بفهمد چنین بابی در کار نیست.', moral: 'A founding father of America used a Persian poem to prank his friends about tolerance.', moralFa: 'یکی از بنیان‌گذاران آمریکا با یک شعر فارسی سر دوستانش را دربارهٔ مدارا کلاه گذاشت.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The others who found him', fa: 'دیگرانی که او را یافتند' },
          { t: 'p', x: 'Voltaire knew him. Goethe read him alongside Hafez. Emerson wrote an essay about him and put him among the small handful of writers who belong to everyone. Diderot and Rousseau read him. For a long stretch of European history, Saadi was the Persian poet, better known in the West than Hafez or Rumi.', fa: 'ولتر می‌شناختش. گوته او را در کنار حافظ می‌خواند. امرسون مقاله‌ای دربارهٔ او نوشت و در شمار همان انگشت‌شمار نویسندگانی گذاشتش که به همه تعلق دارند. دیدرو و روسو خوانده بودندش. در بازهٔ درازی از تاریخ اروپا، سعدی همان شاعر ایرانی بود؛ در غرب شناخته‌شده‌تر از حافظ و مولانا.' },
          { t: 'p', x: 'What travelled was not the beauty, because the prose does not survive translation. It was the ethics. Saadi was the one who made the most sense in a foreign room.', fa: 'آنچه سفر کرد زیبایی نبود، چون نثر او از ترجمه جان به در نمی‌برد. اخلاقش بود که سفر کرد. سعدی همان کسی بود که در اتاقی بیگانه بیش از همه معنا می‌داد.' },
        ] },
      ],
    },
    {
      key: 'sd5',
      title: 'The Garden Still Open', titleFa: 'باغی که هنوز باز است',
      nav: 'Legacy', navFa: 'میراث',
      subtitle: 'HIS PLACE',
      pages: [
        { blocks: [
          { t: 'p', x: 'He died in Shiraz, very old, and was buried there. His tomb is called the Saadieh, and it sits a short distance from the Hafezieh, so that the two poets of that city lie almost within sight of one another, the teacher and the mystic, the road and the wine.', fa: 'در شیراز درگذشت، در کهنسالی، و همان‌جا به خاک سپرده شد. آرامگاهش را سعدیه می‌خوانند، و فاصلهٔ کوتاهی با حافظیه دارد؛ چنان‌که دو شاعر آن شهر تقریباً در دیدرس هم آرمیده‌اند، معلم و عارف، راه و می.' },
          { t: 'imgframe', key: 'saadi-tomb', cap: 'The Saadieh in Shiraz, where the master of speech is buried.' },
          { t: 'p', x: 'Hafez was born after Saadi died and grew up reading him. Every Persian poet after Saadi grew up reading him. He is the foundation the others are standing on.', fa: 'حافظ پس از مرگ سعدی به دنیا آمد و با خواندن او بزرگ شد. هر شاعر ایرانی پس از سعدی با خواندن او بزرگ شد. او همان بنیادی است که بقیه بر آن ایستاده‌اند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The poet of the ordinary day', fa: 'شاعرِ روزِ معمولی' },
          { t: 'p', x: 'Here is his real position, and it is unusual. Iranians quote Hafez when they need an answer from beyond. They quote Saadi when they are talking to each other. His lines come out in arguments about money, about neighbours, about ungrateful children and difficult bosses. He is in the language itself now, and most people using him have stopped noticing.', fa: 'جایگاه واقعی‌اش این است، و جایگاه غریبی است. ایرانی‌ها وقتی پاسخی از آن سو می‌خواهند، حافظ می‌خوانند. وقتی با همدیگر حرف می‌زنند، سعدی نقل می‌کنند. بیت‌هایش وسط بحث بر سر پول درمی‌آید، بر سر همسایه، بر سر بچهٔ ناسپاس و رئیس بداخلاق. او حالا در خودِ زبان است، و بیشتر کسانی که به کارش می‌برند دیگر متوجهش نمی‌شوند.' },
          { t: 'p', x: 'That is a rarer immortality than being famous. Ferdowsi saved the language. Hafez became its soul. Saadi became its common sense.', fa: 'این جاودانگی کمیاب‌تری است از نامدار بودن. فردوسی زبان را نجات داد. حافظ جانِ زبان شد. سعدی عقلِ سلیمِ آن شد.' },
          { t: 'illumin', x: 'The highest thing a writer can become is a thing people say without remembering they read it.', fa: 'بالاترین چیزی که یک نویسنده می‌تواند بشود، این است که به حرفی بدل شود که مردم می‌گویند بی‌آنکه یادشان بیاید کجا خوانده‌اندش.' },
        ] },
        { blocks: [
          { t: 'rule' },
          { t: 'p', x: 'This has been a glimpse of Saadi, who lost his country young, walked the world for thirty years, and came home to a surviving city to write down what he had learned about people.', fa: 'این نگاهی بود کوتاه به سعدی؛ که در جوانی کشورش را از دست داد، سی سال جهان را پیاده پیمود، و به شهری که جان به در برده بود بازگشت تا آنچه دربارهٔ آدم‌ها آموخته بود بنویسد.' },
          { t: 'p', x: 'He watched the Mongols end the world he was raised in, and what he took from it was not bitterness. It was a rose garden, a set of stories, and four lines saying that the human race is one body and that anyone who cannot feel the pain of a stranger has something wrong with them.', fa: 'دید که مغول جهانی را که در آن بار آمده بود به پایان رساند، و آنچه از آن برداشت تلخی نبود. یک گلستان بود، مجموعه‌ای از حکایت‌ها، و چهار مصراع که می‌گوید نوع بشر یک پیکر است و هر کس نتواند درد یک غریبه را حس کند، چیزی در او درست کار نمی‌کند.' },
          { t: 'illumin', x: 'He had every reason to write about cruelty. He wrote about kindness instead.', fa: 'هر دلیلی داشت که از بی‌رحمی بنویسد. به جایش از مهربانی نوشت.' },
          { t: 'motif', symbol: 'rose', caption: 'سعدی' },
        ] },
      ],
    },
  ],
};

const khayyam: Author = {
  key: 'khayyam',
  name: 'Omar Khayyam',
  persian: 'عمر خیام',
  epithet: 'The Measurer of Time',
  years: 'c. 1048 - 1131',
  essence: 'The mathematician of Neyshabur who built a calendar more accurate than the one the world uses today, and who became world famous for poetry he may not have written, in a translation that was not accurate.', essenceFa: 'ریاضی‌دانِ نیشابور که تقویمی ساخت دقیق‌تر از آنچه جهان امروز به کار می‌برد، و به سبب شعرهایی جهانی شد که شاید از او نباشند، آن هم در ترجمه‌ای که دقیق نبود.',
  cover: 'lit-khayyam-cover',
  closing: 'khayyam-tomb',
  status: 'ready',
  chapters: [
    {
      key: 'kh1',
      title: 'The Tentmaker Son', titleFa: 'پسرِ خیمه‌دوز',
      nav: 'Neyshabur', navFa: 'نیشابور',
      subtitle: 'NEYSHABUR, c. 1048',
      pages: [
        { blocks: [
          { t: 'lead', x: 'He is the most famous Persian poet in the English language, and he was not a poet.', fa: 'نامدارترین شاعر ایرانی در زبان انگلیسی است، و شاعر نبود.', mark: 'star' },
          { t: 'p', x: 'That is not a riddle. In his own lifetime, in his own country, Omar Khayyam was known as one of the finest mathematicians and astronomers alive. Nobody called him a poet. The quatrains that made him a household name in London seven centuries later were not what he was for.', fa: 'این معما نیست. در زمان خودش و در سرزمین خودش، حکیم عمر خیام را یکی از بهترین ریاضی‌دانان و ستاره‌شناسان زنده می‌دانستند. هیچ‌کس او را شاعر نمی‌خواند. رباعی‌هایی که هفت قرن بعد نامش را در لندن بر سر زبان‌ها انداختند، آن چیزی نبود که او برایش شناخته می‌شد.' },
          { t: 'p', x: 'He was born in Neyshabur, in Khorasan, around 1048. Khayyam is not a family name in the way we mean it. It means tentmaker, and it was almost certainly his father trade. The boy who would measure the length of the year was the son of a man who stitched canvas.', fa: 'حدود سال ۱۰۴۸ میلادی در نیشابور، در خراسان، به دنیا آمد. خیام به آن معنایی که ما از نام خانوادگی می‌فهمیم نام خانوادگی نیست؛ یعنی خیمه‌دوز، و تقریباً به‌یقین پیشهٔ پدرش بوده است. پسری که قرار بود درازای سال را اندازه بگیرد، فرزند مردی بود که چادر می‌دوخت.' },
          { t: 'motif', symbol: 'star', caption: 'خیام' },
        ] },
        { blocks: [
          { t: 'h', x: 'A good century to be a scholar', fa: 'قرن خوبی برای دانشمند بودن' },
          { t: 'p', x: 'He grew up under the Seljuks, and this was the one thing the Seljuks did superbly. Turkic warlords by origin, they had adopted Persian culture completely and they paid for science with an open hand. Nizam al Mulk, the great Persian vizier, built the observatories and the schools.', fa: 'در روزگار سلجوقیان بزرگ شد، و این همان یک کاری بود که سلجوقیان بی‌نقص انجامش می‌دادند. در اصل سرداران ترک بودند، اما فرهنگ ایرانی را یکسره از آنِ خود کرده بودند و برای دانش دست‌ودل‌بازانه خرج می‌کردند. خواجه نظام‌الملک، آن وزیر بزرگ ایرانی، رصدخانه‌ها و مدرسه‌ها را بنا کرد.' },
          { t: 'p', x: 'So Khayyam went to Isfahan, and the sultan Malik Shah gave him an observatory and a team and a question: fix the calendar. He was around thirty. What he did with that assignment is the reason his name should be spoken alongside anyone in the history of science.', fa: 'پس خیام به اصفهان رفت، و ملکشاه سلجوقی رصدخانه‌ای و گروهی و یک پرسش به او سپرد: تقویم را درست کن. حدود سی سال داشت. آنچه با این مأموریت کرد، دلیل آن است که نامش باید در کنار هر نامی در تاریخ علم برده شود.' },
          { t: 'aside', x: 'The famous story that he studied alongside Nizam al Mulk and Hassan e Sabbah of the Assassins is almost certainly a later legend. The dates do not work.', fa: 'آن حکایت نامدار که او با نظام‌الملک و حسن صباح هم‌درس بوده، تقریباً به‌یقین افسانه‌ای است که بعدها ساخته شده. تاریخ‌ها با هم نمی‌خوانند.' },
        ] },
      ],
    },
    {
      key: 'kh2',
      title: 'The Measure of a Year', titleFa: 'اندازهٔ یک سال',
      nav: 'The Science', navFa: 'دانش',
      subtitle: 'WHAT HE ACTUALLY DID',
      pages: [
        { blocks: [
          { t: 'p', x: 'In 1079 Khayyam and his team delivered a calendar. To build it, they had to answer one question with terrible precision: exactly how long is a year.', fa: 'در سال ۱۰۷۹ میلادی، خیام و گروهش تقویمی تحویل دادند. برای ساختنش باید به یک پرسش با دقتی هولناک پاسخ می‌دادند: یک سال، دقیقاً چقدر است؟' },
          { t: 'p', x: 'They measured it as 365.24219858 days. The real figure, as we know it now with satellites and atomic clocks, is 365.242190. He was working with instruments made of brass and wood, and he was wrong by about a millionth of a day.', fa: 'اندازه‌اش را ۳۶۵٫۲۴۲۱۹۸۵۸ روز به دست آوردند. رقم واقعی، آن‌گونه که امروز با ماهواره و ساعت اتمی می‌دانیم، ۳۶۵٫۲۴۲۱۹۰ است. او با ابزارهایی از برنج و چوب کار می‌کرد، و خطایش حدود یک‌میلیونیم روز بود.' },
          { t: 'drift' },
          { t: 'p', x: 'The calendar Europe adopted five centuries after him, the Gregorian, is less accurate than the one he made. That is not Iranian pride talking. It is arithmetic.', fa: 'تقویمی که اروپا پنج قرن پس از او پذیرفت، یعنی تقویم میلادی، از آنچه او ساخت کم‌دقت‌تر است. این حرف از سر غرور ایرانی نیست؛ حساب است.' },
        ] },
        { blocks: [
          { t: 'h', x: 'And it is still running', fa: 'و هنوز کار می‌کند' },
          { t: 'p', x: 'This is the part that surprises people. His calendar was not a curiosity that was admired and abandoned. It is the calendar of Iran today. The Solar Hijri calendar, still official, still used for every date in the country, descends directly from the one Khayyam built in 1079.', fa: 'همین بخش است که مردم را شگفت‌زده می‌کند. تقویم او چیز عجیبی نبود که تحسینش کنند و کنارش بگذارند. همان تقویم امروز ایران است. تقویم هجری شمسی، که هنوز رسمی است و هر تاریخی در این کشور با آن نوشته می‌شود، مستقیماً از تقویم جلالی می‌آید که خیام در سال ۴۵۸ خورشیدی ساخت.' },
          { t: 'mark', x: 'Iran has been keeping time by a mathematician quatrain of a calendar for nine hundred and fifty years.' },
          { t: 'p', x: 'And it is why Nowruz is exact. Persian new year does not fall on a date someone chose. It falls at the precise instant the sun crosses the equator, and the whole calendar is anchored to that moment. Every Iranian family sitting at the Haft Seen, watching the clock turn, is using Khayyam.', fa: 'و دلیل اینکه نوروز دقیق است هم همین است. سال نو ایرانی در تاریخی که کسی انتخابش کرده باشد نمی‌افتد؛ در همان لحظهٔ دقیقی می‌افتد که خورشید از استوا می‌گذرد، و تمام تقویم به همان لحظه گره خورده است. هر خانوادهٔ ایرانی که سر سفرهٔ هفت‌سین نشسته و چشم به ساعت دارد تا سال تحویل شود، دارد از خیام استفاده می‌کند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The mathematics', fa: 'ریاضیات' },
          { t: 'p', x: 'The calendar was not even his deepest work. Khayyam wrote a treatise on algebra that classified cubic equations, the ones with a cube in them, and solved them. Nobody had done this systematically before.', fa: 'تقویم حتی ژرف‌ترین کار او نبود. خیام رساله‌ای در جبر نوشت که در آن معادلات درجهٔ سوم، یعنی معادله‌هایی که مجهولشان به توان سه می‌رسد، را دسته‌بندی و حل کرد. پیش از او هیچ‌کس این کار را به‌طور نظام‌مند انجام نداده بود.' },
          { t: 'p', x: 'His method is beautiful. He could not solve them with numbers, because the algebra to do that would not exist for another five hundred years. So he solved them with shapes. He drew a parabola and a circle, arranged so that where they crossed was the answer, and read the solution off the geometry. He turned algebra into a picture.', fa: 'روشش زیباست. نمی‌توانست آنها را با عدد حل کند، چون جبری که این کار را ممکن می‌کرد تا پانصد سال بعد هنوز پدید نیامده بود. پس با شکل حلشان کرد. سهمی و دایره‌ای می‌کشید و چنان می‌چیدشان که محل تقاطعشان همان پاسخ باشد، و جواب را از روی هندسه می‌خواند. جبر را به تصویر بدل کرد.' },
          { t: 'illumin', x: 'When numbers could not reach it, he drew it instead.' },
          { t: 'p', x: 'He also pushed at Euclid parallel postulate, the assumption that troubled geometers for two thousand years, and got closer to breaking it than anyone before him. When European mathematicians finally cracked it open in the nineteenth century and found non Euclidean geometry, they were walking a road Khayyam had already been down.', fa: 'به اصل توازی اقلیدس هم فشار آورد؛ همان فرضی که دو هزار سال هندسه‌دانان را آزار داد، و بیش از هر کس پیش از خودش به شکستنش نزدیک شد. وقتی ریاضی‌دانان اروپایی سرانجام در سدهٔ نوزدهم آن را گشودند و هندسهٔ نااقلیدسی را یافتند، در راهی قدم می‌گذاشتند که خیام پیش‌تر از آن گذشته بود.' },
        ] },
      ],
    },
    {
      key: 'kh3',
      title: 'The Quatrains', titleFa: 'رباعیات',
      nav: 'Rubaiyat', navFa: 'رباعیات',
      subtitle: 'WHAT HE MAY HAVE WRITTEN',
      pages: [
        { blocks: [
          { t: 'p', x: 'A rubai is a quatrain, four lines, rhyming AABA. The third line breaks the pattern and the fourth closes it, so the whole thing turns on a hinge. It is a small, hard, complete form, like an epigram with a blade in it.', fa: 'رباعی چهار مصراع است، با قافیهٔ الف الف ب الف. مصراع سوم الگو را می‌شکند و مصراع چهارم آن را می‌بندد، پس تمام رباعی بر یک لولا می‌چرخد. قالبی است کوچک و سخت و تمام، مثل سخنی کوتاه که تیغی در آن پنهان است.' },
          { t: 'p', x: 'Khayyam wrote them, we think, privately. They were not published, not performed, not part of his reputation. They surfaced slowly after his death, and here is the honest problem: nobody knows how many are his. Manuscripts written centuries later attribute anywhere from a dozen to a thousand quatrains to him. Scholars who have spent lifetimes on it think perhaps a hundred are genuine, and disagree about which hundred.', fa: 'گمان می‌کنیم خیام رباعی‌ها را در خلوت خودش می‌سرود. نه منتشر می‌شدند، نه در مجلسی خوانده می‌شدند، و نه بخشی از آوازهٔ او بودند. پس از مرگش کم‌کم سر برآوردند، و مشکل صادقانه همین‌جاست: هیچ‌کس نمی‌داند چند تایشان از او است. نسخه‌هایی که قرن‌ها بعد نوشته شده‌اند، از دوازده تا هزار رباعی را به او نسبت داده‌اند. پژوهشگرانی که عمرشان را بر سر این کار گذاشته‌اند گمان می‌کنند شاید صد رباعی اصیل باشد، و بر سر اینکه کدام صد رباعی، با هم اختلاف دارند.' },
          { t: 'aside', x: 'A quatrain is easy to write and easy to attribute. For centuries, anonymous verses that were too sceptical to sign got filed under Khayyam.', fa: 'رباعی هم آسان سروده می‌شود و هم آسان به کسی نسبت داده می‌شود. قرن‌ها، شعرهای بی‌نامی که برای امضا کردن بیش از حد شکاکانه بودند، زیر نام خیام بایگانی شدند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What the voice says', fa: 'این صدا چه می‌گوید' },
          { t: 'p', x: 'Whoever wrote them, they share one mind, and it is a mind unlike anything else in Persian poetry. It is the mind of a scientist who has looked hard at the evidence for what happens after death and found the file empty.', fa: 'هر کس سروده باشدشان، همه از یک ذهن برمی‌آیند؛ ذهنی که شبیه هیچ چیز دیگری در شعر فارسی نیست. ذهنِ دانشمندی است که به شواهدِ آنچه پس از مرگ رخ می‌دهد خوب نگاه کرده و پرونده را خالی یافته است.' },
          { t: 'rubai', lines: ['Into this universe, and why not knowing,', 'nor whence, like water willy nilly flowing.', 'And out of it, as wind along the waste,', 'I know not whither, willy nilly blowing.'], linesFa: ['آورد به اضطرارم اول به وجود', 'جز حیرتم از حیات چیزی نفزود', 'رفتیم به اکراه و ندانیم چه بود', 'زین آمدن و بودن و رفتن مقصود'], note: 'FitzGerald rendering, 1859.', noteFa: 'رباعی خیام. ترجمهٔ فیتزجرالد، ۱۸۵۹.' },
          { t: 'p', x: 'He does not rage at heaven and he does not deny it. He says he does not know, that nobody who claims to know has been there, and that the only thing certainly in your hands is this hour. He is the least mystical of the great Persian poets. Where Hafez sees a beloved behind the veil, Khayyam sees a veil.', fa: 'نه بر آسمان خشم می‌گیرد و نه منکرش می‌شود. می‌گوید نمی‌دانم، و می‌گوید هیچ‌یک از آنها که ادعای دانستن دارند آنجا نبوده‌اند، و تنها چیزی که به‌یقین در دست توست همین ساعت است. از میان شاعران بزرگ ایران، کم‌عارف‌ترینشان است. آنجا که حافظ معشوقی را پشت پرده می‌بیند، خیام پرده را می‌بیند.' },
          { t: 'veil', surface: 'The moving finger writes, and having writ moves on. Nor all your piety nor wit shall lure it back to cancel half a line.', hidden: 'This is FitzGerald most quoted line, and it is more or less Khayyam. It says the past is closed. Not that it should be accepted, that it is closed, as a matter of fact, the way a proof is closed. It is a mathematician way of describing regret.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The wine question', fa: 'مسئلهٔ می' },
          { t: 'p', x: 'His quatrains are full of wine, and Iranians have argued about this for nine hundred years. The pious read it as Sufi symbol, the divine intoxication, as it is in Hafez. The plain reading is that Khayyam meant wine.', fa: 'رباعی‌هایش پر از می است، و ایرانی‌ها نهصد سال است بر سر این موضوع بحث می‌کنند. پارسایان آن را نماد صوفیانه می‌خوانند، همان مستی حق، چنان‌که در حافظ هست. خوانش ساده‌تر این است که خیام همان می را می‌خواست.' },
          { t: 'p', x: 'The plain reading is probably right, and it is not a scandal. His argument is consistent: the beyond is unverifiable, the moment is verifiable, so attend to the moment. Wine is the moment. It is not blasphemy. It is empiricism with a cup in its hand.', fa: 'خوانش ساده‌تر احتمالاً درست است، و رسوایی هم در آن نیست. استدلال او یکدست است: آن سو را نمی‌توان آزمود، این دم را می‌توان، پس به این دم بپرداز. می، همان این دم است. این کفر نیست؛ تجربه‌گرایی است که جامی در دست دارد.' },
          { t: 'rubai', lines: ['Ah, make the most of what we yet may spend,', 'before we too into the dust descend.', 'Dust into dust, and under dust, to lie,', 'sans wine, sans song, sans singer, and, sans end.'], linesFa: ['ای دوست بیا تا غم فردا نخوریم', 'وین یکدم عمر را غنیمت شمریم', 'فردا که ازین دیر فنا درگذریم', 'با هفت‌هزار سالگان سربه‌سریم'], note: 'FitzGerald, 1859.', noteFa: 'رباعی خیام. ترجمهٔ فیتزجرالد، ۱۸۵۹.' },
        ] },
      ],
    },
    {
      key: 'kh4',
      title: 'The Englishman', titleFa: 'آن مرد انگلیسی',
      nav: 'FitzGerald', navFa: 'فیتزجرالد',
      subtitle: 'HOW THE WEST MADE HIM',
      pages: [
        { blocks: [
          { t: 'p', x: 'In 1859 an eccentric English gentleman named Edward FitzGerald privately printed two hundred and fifty copies of a small book of verses translated from Persian. Nobody bought it. The copies ended up in a bargain box outside a London bookshop, marked down to a penny.', fa: 'در سال ۱۸۵۹، مرد انگلیسی عجیبی به نام ادوارد فیتزجرالد، دویست و پنجاه نسخه از کتابچه‌ای شعر که از فارسی ترجمه کرده بود با هزینهٔ خودش چاپ کرد. کسی نخریدش. نسخه‌ها سر از جعبهٔ حراج بیرون یک کتاب‌فروشی لندن درآوردند، با قیمت یک پنی.' },
          { t: 'p', x: 'Someone found one. It reached Rossetti, then Swinburne, then everyone, and within a decade Omar Khayyam was one of the most quoted poets in the English speaking world. He stayed there for a century. There were Khayyam clubs and Khayyam wallpaper and quatrains carved on gravestones.', fa: 'کسی یکی از آنها را پیدا کرد. به دست روزتی رسید، بعد سوینبرن، بعد همه، و ظرف یک دهه عمر خیام یکی از پرنقل‌ترین شاعران جهان انگلیسی‌زبان شد. یک قرن همان‌جا ماند. انجمن خیام درست شد، کاغذدیواری خیام، و رباعی‌هایی که بر سنگ قبرها کندند.' },
          { t: 'p', x: 'And FitzGerald was not translating. He said so himself, cheerfully, that he took whatever liberties he liked with these Persians. He merged quatrains, invented lines, dropped what bored him, and shaped the whole into an English poem with a mood of his own.', fa: 'و فیتزجرالد ترجمه نمی‌کرد. خودش هم با خوش‌رویی همین را گفت: که با این ایرانی‌ها هر آزادی‌ای که دلش خواسته به خود داده است. رباعی‌ها را در هم آمیخت، مصراع از خودش ساخت، هر چه حوصله‌اش را سر می‌برد انداخت، و کل آن را به شعری انگلیسی با حال و هوای خودش درآورد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What he did to the mutton', fa: 'با ران گوسفند چه کرد' },
          { t: 'p', x: 'The most famous lines he ever produced run: a book of verses underneath the bough, a jug of wine, a loaf of bread, and thou beside me singing in the wilderness. Millions of people know it. It is on a thousand greeting cards.', fa: 'نامدارترین سطرهایی که از او درآمد چنین است: کتابی شعر زیر شاخه‌ها، سبویی می، نانی، و تو در کنارم که در بیابان آواز می‌خوانی. میلیون‌ها نفر این را از بر دارند. روی هزار کارت تبریک نوشته شده.' },
          { t: 'twotrans', a: { label: 'FITZGERALD, 1859', x: 'A Book of Verses underneath the Bough, a Jug of Wine, a Loaf of Bread, and Thou beside me singing in the Wilderness.' }, b: { label: 'WHAT THE PERSIAN SAYS', x: 'A loaf of bread, a gourd of wine, a thigh of mutton, and you and I sitting in the wilderness. That is a pleasure beyond any sultan kingdom.' } },
          { t: 'p', x: 'FitzGerald removed the leg of lamb and put a book of poetry in its place. That single edit is the whole story of how the West received Persia. A blunt, physical, funny Persian picnic became a soft Victorian daydream, and the daydream is what the world memorised.', fa: 'رباعی اصلی این است: «گر دست دهد ز مغز گندم نانی، وز می دو منی ز گوسفندی رانی.» فیتزجرالد ران گوسفند را برداشت و به جایش کتاب شعر گذاشت. همین یک دخل و تصرف، تمام داستانِ آن است که غرب ایران را چگونه دریافت. یک بزم ایرانیِ صریح و جسمانی و خنده‌دار، به خیال‌بافی نرم ویکتوریایی بدل شد، و همان خیال‌بافی بود که جهان از بر کرد.' },
          { t: 'illumin', x: 'The mutton became a book of verses, and nobody noticed for a hundred years.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Was it a theft or a gift', fa: 'دزدی بود یا هدیه' },
          { t: 'p', x: 'Both, honestly, and it is worth holding both. FitzGerald misrepresented him. He also made a genuinely great English poem, and he made the world care about a Persian name at a moment when the West cared about very little east of Athens. Iranians tend to feel the two things at once, and that is the correct response.', fa: 'راستش، هر دو؛ و ارزشش را دارد که هر دو را با هم نگه داریم. فیتزجرالد او را وارونه نشان داد. در عین حال شعری انگلیسی و به‌راستی بزرگ ساخت، و در روزگاری که غرب به شرقِ آتن تقریباً هیچ اعتنایی نداشت، کاری کرد که جهان به یک نام ایرانی اهمیت بدهد. ایرانی‌ها معمولاً هر دو حس را همزمان دارند، و همین پاسخ درست است.' },
          { t: 'p', x: 'The strange result is that the Khayyam the world loves is a collaboration between an eleventh century Iranian mathematician and a nineteenth century Suffolk bachelor, and neither of them could have made him alone.', fa: 'نتیجهٔ غریبش این است که آن خیامی که جهان دوستش دارد، حاصل همکاری یک ریاضی‌دان ایرانی سدهٔ پنجم هجری است با یک مرد مجرد اهل سافکِ سدهٔ نوزدهم، و هیچ‌یک از آن دو به‌تنهایی نمی‌توانست بسازدش.' },
        ] },
      ],
    },
    {
      key: 'kh5',
      title: 'Where the Blossoms Fall', titleFa: 'آنجا که شکوفه می‌ریزد',
      nav: 'Legacy', navFa: 'میراث',
      subtitle: 'NEYSHABUR, AGAIN',
      pages: [
        { blocks: [
          { t: 'p', x: 'There is a story, and unusually for such stories it comes from someone who knew him. Nizami Aruzi wrote that Khayyam once said his grave would lie in a place where the north wind would scatter blossoms over it.', fa: 'حکایتی هست، و برخلاف بیشتر چنین حکایت‌ها، از کسی نقل شده که خودش او را می‌شناخته. نظامی عروضی نوشته که خیام روزی گفت گورش جایی خواهد بود که باد شمال بر آن شکوفه بریزد.' },
          { t: 'p', x: 'Years after Khayyam died, Aruzi went to Neyshabur and found the tomb. It sat at the foot of a garden wall, and pear and peach trees leaned over that wall, and the ground was so buried in fallen blossom that the grave was hidden beneath it. He wrote that he wept.', fa: 'سال‌ها پس از مرگ خیام، عروضی به نیشابور رفت و گور را یافت. پای دیوار باغی بود، و درختان امرود و هلو بر آن دیوار خم شده بودند، و زمین چنان زیر شکوفهٔ ریخته پنهان شده بود که گور در آن گم بود. نوشت که گریست.' },
          { t: 'imgframe', key: 'khayyam-tomb', cap: 'The tomb at Neyshabur, rebuilt in 1963 as a lattice of interlocking geometry, for a man who solved equations with shapes.' },
          { t: 'illumin', x: 'The man who would not predict the afterlife predicted his own grave, and got it right.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The double injustice', fa: 'بی‌انصافیِ دوسویه' },
          { t: 'p', x: 'Here is where he sits, and it is a strange seat. In the West he is a famous poet and an unknown scientist. In Iran he is respected as a scientist and argued about as a poet. Almost nobody, anywhere, holds both halves at once.', fa: 'جایگاهش این است، و جایگاه غریبی است. در غرب شاعری نامدار است و دانشمندی ناشناخته. در ایران به‌عنوان دانشمند محترم است و به‌عنوان شاعر محل بحث. تقریباً هیچ‌کس، هیچ‌جا، هر دو نیمه را با هم نگه نمی‌دارد.' },
          { t: 'p', x: 'The full man is better than either half. He measured the year to six decimal places with brass instruments. He solved cubic equations by drawing them. He built the calendar Iran still lives by. And in his private hours he wrote four line poems saying that none of it can tell you what happens next, so pour the wine.', fa: 'آن مردِ تمام، از هر دو نیمه‌اش بهتر است. طول سال را با ابزارهای برنجی تا شش رقم اعشار اندازه گرفت. معادلات درجهٔ سوم را با کشیدنشان حل کرد. تقویمی ساخت که ایران هنوز با آن زندگی می‌کند. و در ساعت‌های خلوتش رباعی‌هایی نوشت که می‌گویند هیچ‌کدام از اینها نمی‌تواند بگوید بعد چه می‌شود، پس می را بریز.' },
          { t: 'mark', x: 'The most precise mind of his century spent its evenings writing about how little can be known.' },
          { t: 'p', x: 'That is not a contradiction. It is the same man. Precision about what can be measured, and honesty about what cannot. The quatrains are what a scientist writes when the instruments run out.', fa: 'این تناقض نیست. همان یک مرد است. دقت در آنچه اندازه‌پذیر است، و صداقت در آنچه نیست. رباعی‌ها همان چیزی است که یک دانشمند می‌نویسد وقتی ابزارهایش به آخر می‌رسند.' },
        ] },
        { blocks: [
          { t: 'rule' },
          { t: 'p', x: 'This has been a glimpse of Omar Khayyam, the tentmaker son of Neyshabur, who was asked to fix a calendar and fixed it so well that it is still running, and who is loved around the world for a book he did not quite write.', fa: 'این نگاهی بود کوتاه به عمر خیام؛ پسرِ خیمه‌دوزِ نیشابور، که از او خواستند تقویمی را درست کند و چنان درستش کرد که هنوز کار می‌کند، و که در سراسر جهان به سبب کتابی دوستش دارند که دقیقاً از او نبود.' },
          { t: 'p', x: 'Every Nowruz, at the exact second the sun crosses the equator, an entire country checks the clock. That instant is his. It is the most widely used and least credited piece of Persian science on earth, and it happens once a year, in every Iranian home, forever.', fa: 'هر نوروز، در همان ثانیه‌ای که خورشید از استوا می‌گذرد، یک کشور تمام چشم به ساعت می‌دوزد. آن لحظه از آنِ اوست. پرکاربردترین و کم‌قدرشناسی‌شده‌ترین دستاورد علم ایرانی روی زمین است، و سالی یک بار رخ می‌دهد، در هر خانهٔ ایرانی، تا همیشه.' },
          { t: 'illumin', x: 'He gave Iran the moment its year turns, and the world forgot he was a scientist at all.' },
          { t: 'motif', symbol: 'star', caption: 'خیام' },
        ] },
      ],
    },
  ],
};

const rudaki: Author = {
  key: 'rudaki',
  name: 'Rudaki',
  persian: 'رودکی',
  epithet: 'The Adam of Poets',
  years: 'c. 858 - 941',
  essence: 'The first. Before Ferdowsi, before Hafez, before any of them, a blind singer from a mountain village proved that Persian could be a language of poetry. Of the hundred thousand verses he is said to have written, about a thousand survive.', essenceFa: 'نخستین. پیش از فردوسی، پیش از حافظ، پیش از همه‌شان، خنیاگری نابینا از روستایی کوهستانی نشان داد که فارسی می‌تواند زبان شعر باشد. از صد هزار بیتی که می‌گویند سروده است، حدود هزار بیت به جا مانده.',
  cover: 'lit-rudaki-cover',
  closing: 'rudaki-tomb',
  status: 'ready',
  chapters: [
    {
      key: 'rd1',
      title: 'Before Anyone', titleFa: 'پیش از همه',
      nav: 'The First', navFa: 'نخستین',
      subtitle: 'PANJRUD, c. 858',
      pages: [
        { blocks: [
          { t: 'lead', x: 'Someone has to be first. Someone has to write in a language before anyone knows it can be written in.', fa: 'یکی باید نخستین باشد. یکی باید به زبانی بنویسد، پیش از آنکه کسی بداند می‌شود به آن نوشت.', mark: 'strings' },
          { t: 'p', x: 'When Rudaki was born, around 858, Persian had been silent for two hundred years. The conquest had made Arabic the language of everything that counted, of law, of learning, of poetry. Persian survived in kitchens and villages. Nobody wrote serious literature in it. There was no reason to think anyone could.', fa: 'وقتی رودکی حدود سال ۸۵۸ میلادی به دنیا آمد، فارسی دو قرن خاموش بود. فتح، عربی را زبان هر چیزی کرده بود که به شمار می‌آمد: زبان شرع، زبان دانش، زبان شعر. فارسی در آشپزخانه‌ها و روستاها زنده مانده بود. کسی به آن ادبیات جدی نمی‌نوشت. دلیلی هم نبود که کسی گمان کند می‌شود نوشت.' },
          { t: 'p', x: 'He came from a village called Panjrud, in the mountains east of Samarkand, in what is now Tajikistan. Rudaki is not a name either. It means from Rudak, the place of the little river. He is the poet from the stream village.', fa: 'اهل روستایی بود به نام پنجرود، در کوه‌های شرق سمرقند، در تاجیکستانِ امروز. رودکی هم نام نیست؛ یعنی اهل رودک، جای رودِ کوچک. او شاعرِ روستای جویبار است.' },
          { t: 'motif', symbol: 'harp', caption: 'رودکی' },
        ] },
        { blocks: [
          { t: 'h', x: 'The court that made a language', fa: 'درباری که زبانی ساخت' },
          { t: 'p', x: 'The Samanids ruled Bukhara, and they made a deliberate and world changing decision. They were Persians, they were proud of it, and they chose to have their court speak and write and celebrate in Persian while the whole Islamic world around them ran on Arabic. They paid for it. They defended it. It was policy.', fa: 'سامانیان بر بخارا فرمان می‌راندند، و تصمیمی گرفتند آگاهانه که جهان را عوض کرد. ایرانی بودند و به آن سربلند، و برگزیدند که دربارشان به فارسی حرف بزند و بنویسد و جشن بگیرد، در حالی که تمام جهان اسلام پیرامونشان با عربی می‌گشت. برایش پول دادند. از آن دفاع کردند. این یک سیاست بود.' },
          { t: 'p', x: 'Rudaki was their poet, and he was the proof. If Persian could produce this, at this level, then Persian was a literary language, and the argument was over. Everything that follows in this section stands on that.', fa: 'رودکی شاعر آنان بود، و او همان دلیل بود. اگر فارسی می‌توانست چنین چیزی و در چنین سطحی پدید بیاورد، پس فارسی زبانی ادبی بود و بحث تمام. هر چه در این بخش پس از او می‌آید، بر همین می‌ایستد.' },
          { t: 'mark', x: 'Ferdowsi saved the language. Rudaki proved there was something worth saving.', fa: 'فردوسی زبان را نجات داد. رودکی نشان داد چیزی هست که ارزش نجات دادن دارد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The singer', fa: 'خنیاگر' },
          { t: 'p', x: 'He was not only a poet. He was a musician, and by every account a great one. He played the chang, the Persian harp, and he sang his own verses. Persian poetry did not begin on a page. It began as a voice with strings under it, in a room, in front of people.', fa: 'تنها شاعر نبود. نوازنده هم بود، و به گواه همه نوازنده‌ای بزرگ. چنگ می‌نواخت و شعرهای خودش را می‌خواند. شعر فارسی روی کاغذ آغاز نشد؛ با صدایی آغاز شد که سیم‌هایی زیرش بود، در اتاقی، در برابر مردم.' },
          { t: 'chang' },
          { t: 'p', x: 'That is worth remembering when you read any of it. These were songs. The rhythm is not decoration. It is the missing music.', fa: 'هر چه از او می‌خوانی، این را به یاد داشته باش: اینها ترانه بودند. وزن، تزیین نیست؛ همان موسیقیِ گم‌شده است.' },
        ] },
      ],
    },
    {
      key: 'rd2',
      title: 'The Poem That Moved a King', titleFa: 'شعری که شاهی را به راه انداخت',
      nav: 'The Ride', navFa: 'آن سواری',
      subtitle: 'BUKHARA, c. 930',
      pages: [
        { blocks: [
          { t: 'p', x: 'This is the most famous story in Persian literature, and it is about the practical power of a poem.', fa: 'این نامدارترین حکایت ادبیات فارسی است، و دربارهٔ قدرت عملی یک شعر.' },
          { t: 'p', x: 'The Samanid king, Nasr II, took his court to Herat one summer. He liked it. He stayed. A season became a year, and a year became four, and the entire court was homesick for Bukhara and could not say so, because you do not tell a king he is wrong.', fa: 'نصر بن احمد سامانی تابستانی دربارش را به هرات برد. خوشش آمد. ماند. یک فصل شد یک سال، و یک سال شد چهار سال، و تمام درباریان دلتنگ بخارا بودند و نمی‌توانستند بگویند، چون به شاه نمی‌گویند که اشتباه می‌کند.' },
          { t: 'p', x: 'So they went to Rudaki and offered him money to do something. He waited for a morning when the king was drinking, took up his harp, and sang.', fa: 'پس سراغ رودکی رفتند و به او پول دادند تا کاری بکند. صبحی را که شاه در حال باده‌نوشی بود انتظار کشید، چنگ را برداشت، و خواند.' },
        ] },
        { blocks: [
          { t: 'ghazal', couplets: [
            { a: 'The scent of the Muliyan stream comes to me,', b: 'the memory of a kind friend comes to me.' },
            { a: 'The sands of the Oxus, and all its rough road,', b: 'come soft as silk beneath my feet.' },
            { a: 'The waters of the Jayhun, in joy at the friend face,', b: 'rise to our horse belly as we cross.' },
            { a: 'O Bukhara, rejoice, and live long,', b: 'the prince comes to you in gladness.' },
            { a: 'The prince is the moon and Bukhara the sky,', b: 'the moon is coming to the sky.' },
            { a: 'The prince is the cypress and Bukhara the garden,', b: 'the cypress is coming to the garden.' },
          ], note: 'Buy e Juy e Muliyan. Plain rendering. The Persian rhymes on a single repeated sound that falls like a footstep.' },
          { t: 'p', x: 'The king got up. He did not send for his boots. He got onto his horse barefoot and rode for Bukhara, and the court scrambled after him, and someone caught up with him two stages down the road to put his boots on him.', fa: 'شاه از جا برخاست. کسی را پی چکمه‌هایش نفرستاد. پابرهنه بر اسب نشست و به سوی بخارا تاخت، و درباریان دست‌وپا زدند تا پشت سرش برسند، و دو منزل آن‌سوتر کسی به او رسید تا چکمه‌هایش را پایش کند.' },
          { t: 'illumin', x: 'A poem got a king onto a horse without his boots.', fa: 'شعری شاهی را بی‌چکمه بر اسب نشاند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Why it worked', fa: 'چرا کارگر افتاد' },
          { t: 'p', x: 'Look at what he actually did, because it is a masterclass. He never says come home. He never mentions the court, or duty, or the four wasted years. He does not argue at all.', fa: 'نگاه کن ببین در واقع چه کرد، چون درسی است تمام. هیچ‌جا نمی‌گوید به خانه برگرد. از دربار حرفی نمی‌زند، از وظیفه، از آن چهار سال بر باد رفته. اصلاً استدلال نمی‌کند.' },
          { t: 'p', x: 'He starts with a smell. The scent of a particular stream, the Muliyan, that ran through Bukhara. Not a description of the city, a smell of it, which goes past the reasoning part of a man entirely. Then he makes the hard road home feel like silk underfoot, so returning is not effort. Then he turns the king into the moon and Bukhara into the sky.', fa: 'با یک بو آغاز می‌کند: «بوی جوی مولیان آید همی» — بوی همان جویِ مشخصی که در بخارا جاری بود. نه وصفِ شهر، بلکه بویِ شهر، که یکسره از بخش استدلال‌کنندهٔ آدم می‌گذرد. بعد راه سخت بازگشت را زیر پا مثل ابریشم می‌کند: «ریگ آموی و درشتی راه او، زیر پایم پرنیان آید همی» — پس بازگشتن دیگر زحمت نیست. و بعد شاه را ماه می‌کند و بخارا را آسمان: «میر ماه است و بخارا آسمان، ماه سوی آسمان آید همی».' },
          { t: 'veil', surface: 'The prince is the moon and Bukhara the sky. The moon is coming to the sky.', surfaceFa: 'میر ماه است و بخارا آسمان\u200Cماه سوی آسمان آید همی', hidden: 'This is the whole trick. Going home is no longer a retreat or an admission. It is the moon returning to where the moon belongs, a movement of nature, inevitable and dignified. Rudaki gave the king a way to change his mind without losing face, and he did it in eight words.' },
          { t: 'p', x: 'Persians have told this story for a thousand years because of what it claims: that a poem is not decoration, it is a lever, and applied to the right man at the right hour it moves the world.', fa: 'ایرانی‌ها هزار سال است این حکایت را نقل می‌کنند، به سبب آنچه ادعا می‌کند: که شعر تزیین نیست، اهرم است؛ و اگر در ساعت درست بر مرد درست وارد شود، جهان را جابه‌جا می‌کند.' },
        ] },
      ],
    },
    {
      key: 'rd3',
      title: 'What Was Lost', titleFa: 'آنچه از دست رفت',
      nav: 'The Loss', navFa: 'فقدان',
      subtitle: 'A HUNDRED THOUSAND VERSES',
      pages: [
        { blocks: [
          { t: 'p', x: 'And now the hard part. Rudaki was enormously prolific. The old sources give numbers, and the numbers are impossible to verify and impossible to ignore. A hundred thousand verses is the figure usually given. One medieval writer claimed over a million, which nobody believes.', fa: 'و حالا بخش دشوار. رودکی به‌شدت پرکار بود. سرچشمه‌های کهن رقم می‌دهند، و این رقم‌ها را نه می‌توان تأیید کرد و نه می‌توان نادیده گرفت. رقمی که معمولاً می‌آورند صد هزار بیت است. یکی از نویسندگان سده‌های میانه از بیش از یک میلیون بیت گفته، که کسی باورش نمی‌کند.' },
          { t: 'p', x: 'What survives is about a thousand lines. Roughly one percent. Everything else is gone, into fires and floods and the Mongols and simple neglect, and it is not coming back.', fa: 'آنچه به جا مانده حدود هزار بیت است. تقریباً یک درصد. باقی همه رفته؛ در آتش و سیل و مغول و بی‌اعتنایی ساده، و برنمی‌گردد.' },
          { t: 'lostverses' },
        ] },
        { blocks: [
          { t: 'p', x: 'That grid is the honest picture. Every mark is a hundred verses. The gold ones are what we have.', fa: 'آن شبکه، تصویر صادقانه است. هر نشانه صد بیت است. طلایی‌ها آن چیزی است که داریم.' },
          { t: 'p', x: 'We know he wrote a Kalila and Dimna in verse, the great book of animal fables, because people quote it. The book itself is gone. We have fragments of odes to patrons whose names mean nothing now. We have single couplets, quoted in other men books to make a point about grammar, floating free of whatever poem they came from.', fa: 'می‌دانیم که کلیله و دمنه را به نظم درآورد، آن کتاب بزرگ افسانه‌های جانوران، چون دیگران از آن نقل کرده‌اند. خودِ کتاب رفته است. پاره‌هایی از قصیده‌هایی در مدح ممدوحانی داریم که نامشان امروز هیچ معنایی ندارد. بیت‌هایی تک داریم که در کتاب دیگران برای اثبات نکته‌ای دستوری نقل شده‌اند، جدا افتاده از هر شعری که از آن آمده‌اند.' },
          { t: 'mark', x: 'We are reading the father of Persian poetry through the footnotes of other people.', fa: 'ما پدر شعر فارسی را از لابه‌لای پانویس‌های دیگران می‌خوانیم.' },
          { t: 'p', x: 'It is worth sitting with what that means. The judgement that he was the greatest of his age was made by people who could read all of it. We are agreeing with a verdict on evidence we do not have.', fa: 'ارزشش را دارد کمی با معنای این جمله بنشینیم. آن داوری که او بزرگ‌ترین شاعر روزگارش بود، به دست کسانی صادر شد که می‌توانستند همهٔ کارش را بخوانند. ما با حکمی موافقیم که سندش را در دست نداریم.' },
        ] },
      ],
    },
    {
      key: 'rd4',
      title: 'The Old Man', titleFa: 'پیرمرد',
      nav: 'The Fall', navFa: 'افتادن',
      subtitle: 'HOW IT ENDED',
      pages: [
        { blocks: [
          { t: 'p', x: 'He did not die at court. Somewhere near the end the politics turned, his patron fell, and Rudaki was expelled. He went back to the village he came from, poor, and died there around 941.', fa: 'در دربار نمرد. جایی نزدیک پایان، سیاست برگشت، ممدوحش از قدرت افتاد، و رودکی رانده شد. به همان روستایی که از آن آمده بود بازگشت، تنگدست، و حدود سال ۹۴۱ میلادی همان‌جا درگذشت.' },
          { t: 'p', x: 'And he was blind. The sources agree on that much and on nothing else about it. Some say from birth, though he writes about colour with an accuracy that makes that hard to believe. When Soviet archaeologists opened what they believed was his grave in 1965, they reported that the skull showed the sockets had been burned, which would mean he was blinded with hot iron, late, deliberately, by someone.', fa: 'و نابینا بود. سرچشمه‌ها بر همین یک نکته توافق دارند و بر هیچ چیز دیگری دربارهٔ آن. بعضی می‌گویند از تولد، هرچند او دربارهٔ رنگ‌ها با دقتی می‌نویسد که باور کردن این را دشوار می‌کند. وقتی باستان‌شناسان شوروی در سال ۱۹۶۵ گوری را که گمان می‌کردند از او باشد گشودند، گزارش دادند که جمجمه نشان می‌دهد حدقه‌ها سوزانده شده‌اند؛ و این یعنی او را با آهن گداخته کور کرده‌اند، دیرهنگام، عامدانه، به دست کسی.' },
          { t: 'aside', x: 'The identification of the grave is not certain, and the finding has been questioned. It may be true. We will probably never know.', fa: 'اینکه آن گور از او باشد قطعی نیست، و در این یافته تردید کرده‌اند. ممکن است راست باشد. احتمالاً هرگز نخواهیم دانست.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The teeth', fa: 'دندان‌ها' },
          { t: 'p', x: 'And then, at the end, old and poor and back in the mountains, he wrote the poem that is the reason he is not just a historical first.', fa: 'و بعد، در پایان، پیر و تنگدست و بازگشته به کوه‌ها، شعری سرود که همان دلیلِ این است که او فقط یک «نخستینِ تاریخی» نیست.' },
          { t: 'p', x: 'It begins with his teeth. It is about his teeth falling out. It is one of the great poems about growing old in any language on earth.', fa: 'با دندان‌هایش آغاز می‌شود: «مرا بسود و فروریخت هر چه دندان بود.» دربارهٔ ریختن دندان‌هایش است. و یکی از بزرگ‌ترین شعرهای پیر شدن است، در هر زبانی روی این زمین.' },
          { t: 'ghazal', couplets: [
            { a: 'Every tooth I had has worn away and fallen.', b: 'They were not teeth. They were shining lamps.' },
            { a: 'They were rows of silver, they were pearl and coral,', b: 'they were the morning star, they were drops of rain.' },
            { a: 'Not one is left of all of them now.', b: 'What bad luck was this. It was the bad luck of Saturn.' },
          ], note: 'From the late poem on old age. Plain rendering.' },
          { t: 'p', x: 'It goes on. He remembers when he was young and the world was open, when he had wine and music and women and everything was easy and he never once thought to be grateful for it. He does not moralise about this. He is not building to a lesson. He is an old blind man in a village listing what he had, and the list is the poem.', fa: 'ادامه می‌دهد. به یاد می‌آورد وقتی جوان بود و جهان باز بود، وقتی می و موسیقی و زن داشت و همه‌چیز آسان بود و حتی یک بار به سرش نزد که سپاسگزار باشد. دربارهٔ این هیچ موعظه‌ای نمی‌کند. به هیچ درسی هم نمی‌رسد. پیرمردی نابیناست در روستایی که فهرست می‌کند چه داشته، و همان فهرست، خودِ شعر است.' },
          { t: 'illumin', x: 'The first poet of the Persian language used it, at the end, to say that he misses being young.', fa: 'نخستین شاعر زبان فارسی، در پایان، از آن استفاده کرد تا بگوید دلش برای جوانی‌اش تنگ است.' },
        ] },
        { blocks: [
          { t: 'p', x: 'There is no consolation in it, no God, no wisdom earned. Persian poetry begins with a man refusing to pretend that losing everything was worth it. That is a remarkable thing for a literature to start with, and it may be why the literature never became sentimental.', fa: 'در آن تسلایی نیست، خدایی نیست، حکمتی هم که به دست آمده باشد نیست. شعر فارسی با مردی آغاز می‌شود که حاضر نیست وانمود کند از دست دادن همه‌چیز ارزشش را داشت. این آغاز شگفتی است برای یک ادبیات، و شاید همین دلیل آن است که این ادبیات هرگز احساساتی نشد.' },
        ] },
      ],
    },
    {
      key: 'rd5',
      title: 'The Adam of Poets', titleFa: 'آدم‌الشعرا',
      nav: 'Legacy', navFa: 'میراث',
      subtitle: 'HIS PLACE',
      pages: [
        { blocks: [
          { t: 'p', x: 'Iranians call him Adam al Shoara, the Adam of Poets. The first man of the tribe. Everyone in this section is descended from him.', fa: 'ایرانی‌ها او را آدم‌الشعرا می‌خوانند؛ آدمِ شاعران. نخستین مرد این تبار. همهٔ کسانی که در این بخش هستند از نسل او هستند.' },
          { t: 'imgframe', key: 'rudaki-tomb', cap: 'The tomb at Panjrud, in the mountains of Tajikistan, where the first Persian poet went home to die.' },
          { t: 'p', x: 'He is buried in Tajikistan, which is worth pausing on, because it says something true about Persian. The language is bigger than the country. It began in Bukhara and Samarkand, cities that are not in Iran and have not been for centuries, and the first great poet of Iran lies outside it. Persian was never contained by a border.', fa: 'در تاجیکستان به خاک سپرده شده، و ارزشش را دارد که روی این مکث کنیم، چون چیزی راست دربارهٔ فارسی می‌گوید: این زبان از آن کشور بزرگ‌تر است. در بخارا و سمرقند آغاز شد، شهرهایی که در ایران نیستند و قرن‌ها نبوده‌اند، و نخستین شاعر بزرگ ایران بیرون از ایران آرمیده است. فارسی هرگز در هیچ مرزی نگنجید.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What he handed forward', fa: 'آنچه به دست بعدی‌ها داد' },
          { t: 'p', x: 'He set the forms. The qasida, the ghazal, the rubai, the masnavi. Everything Ferdowsi and Hafez and Saadi and Khayyam used was already shaped and waiting for them, and Rudaki is the one who shaped it. They inherited a working instrument because he built it.', fa: 'قالب‌ها را او بنا گذاشت: قصیده، غزل، رباعی، مثنوی. هر چه فردوسی و حافظ و سعدی و خیام به کار بردند، از پیش شکل گرفته و در انتظارشان بود، و رودکی همان کسی است که شکلش داد. سازی کارآمد به ارث بردند، چون او ساخته بودش.' },
          { t: 'p', x: 'And he set the tone. Direct, musical, unashamed of pleasure, unashamed of loss. Persian poetry could have gone in any direction at the start. It went in his.', fa: 'و لحن را هم او گذاشت: صریح، آهنگین، بی‌شرم از لذت، بی‌شرم از فقدان. شعر فارسی در آغاز می‌توانست به هر سویی برود. به سوی او رفت.' },
          { t: 'mark', x: 'Every poet in this section is standing on a man whose work we have almost entirely lost.', fa: 'هر شاعری در این بخش، بر شانهٔ مردی ایستاده که کارش را تقریباً به‌تمامی از دست داده‌ایم.' },
        ] },
        { blocks: [
          { t: 'rule' },
          { t: 'p', x: 'This has been a glimpse of Rudaki, the blind singer from the stream village, who took a language that nobody wrote poems in and wrote enough of them to settle the question forever.', fa: 'این نگاهی بود کوتاه به رودکی؛ خنیاگر نابینای روستای جویبار، که زبانی را برگرفت که کسی به آن شعر نمی‌گفت و آن‌قدر شعر به آن سرود که پرسش برای همیشه بسته شد.' },
          { t: 'p', x: 'He sang a king off his cushion and onto a barefoot horse. He wrote a hundred thousand verses and kept a thousand. He was thrown out of the court he had made famous, and went home to the mountains, and wrote about his teeth.', fa: 'با آواز، شاهی را از بالش برداشت و پابرهنه بر اسب نشاند. صد هزار بیت سرود و هزار بیتش ماند. از همان درباری که نامدارش کرده بود بیرون انداختندش، و به کوه‌ها برگشت، و از دندان‌هایش نوشت.' },
          { t: 'illumin', x: 'The first voice in Persian, and we can only hear one word of it in a hundred.', fa: 'نخستین صدای فارسی، و ما از هر صد واژه‌اش تنها یکی را می‌شنویم.' },
          { t: 'motif', symbol: 'harp', caption: 'رودکی' },
        ] },
      ],
    },
  ],
};

const nizami: Author = {
  key: 'nizami',
  name: 'Nizami',
  persian: 'نظامی',
  epithet: 'The Master of Romance',
  years: 'c. 1141 - 1209',
  essence: 'He wrote the greatest love stories in the Persian language, and buried every woman he loved. Layli and Majnun, Khosrow and Shirin, and seven domes of seven colours are all his.', essenceFa: 'بزرگ‌ترین داستان‌های عاشقانهٔ زبان فارسی را سرود، و هر زنی را که دوست داشت به خاک سپرد. لیلی و مجنون، خسرو و شیرین، و هفت گنبد به هفت رنگ، همه از او است.',
  cover: 'lit-nizami-cover',
  closing: 'nizami-tomb',
  status: 'ready',
  chapters: [
    {
      key: 'nz1',
      title: 'The Quiet Man of Ganja', titleFa: 'مرد خاموش گنجه',
      nav: 'Ganja', navFa: 'گنجه',
      subtitle: 'GANJA, c. 1141',
      pages: [
        { blocks: [
          { t: 'lead', x: 'The man who taught a civilization how to write about love was widowed three times.', fa: 'مردی که به یک تمدن آموخت چگونه از عشق بنویسد، سه بار همسرش را از دست داد.', mark: 'domes' },
          { t: 'p', x: 'Nizami was born around 1141 in Ganja, in the Caucasus, and appears to have almost never left it. No travels like Saadi, no court like Rudaki. He turned down invitations from kings. He stayed in one provincial city, orphaned young, raised by an uncle, and quietly wrote five long poems that changed what Persian could do.', fa: 'نظامی حدود سال ۱۱۴۱ میلادی در گنجه، در قفقاز، به دنیا آمد و چنین می‌نماید که تقریباً هرگز از آن بیرون نرفت. نه سفرهایی مثل سعدی، نه درباری مثل رودکی. دعوت شاهان را نپذیرفت. در یک شهر دورافتاده ماند، در کودکی یتیم شد، دایی‌اش بزرگش کرد، و بی‌سروصدا پنج منظومهٔ بلند سرود که توانِ زبان فارسی را دگرگون کرد.' },
          { t: 'p', x: 'He wrote in Persian, entirely. Ganja is in Azerbaijan today, and Rudaki is buried in Tajikistan, and this is simply what Persian was: a language of a whole region, never contained by any one border.', fa: 'یکسره به فارسی نوشت. گنجه امروز در جمهوری آذربایجان است و رودکی در تاجیکستان به خاک سپرده شده، و فارسی همین بود: زبان یک منطقهٔ تمام، که هرگز در هیچ مرزی نگنجید.' },
          { t: 'motif', symbol: 'rose', caption: 'نظامی' },
        ] },
        { blocks: [
          { t: 'h', x: 'Afaq', fa: 'آفاق' },
          { t: 'p', x: 'A ruler sent him a gift: a Kipchak slave girl named Afaq. Nizami freed her and married her, and by every trace he left, he loved her without reservation. She bore him a son. And while he was writing Khosrow and Shirin, the great romance, she died.', fa: 'فرمانروایی برایش هدیه‌ای فرستاد: کنیزی قبچاق به نام آفاق. نظامی آزادش کرد و با او ازدواج کرد، و به گواه هر نشانی که از خود گذاشته، بی‌هیچ قید و شرطی دوستش داشت. آفاق پسری برایش آورد. و در همان روزهایی که نظامی خسرو و شیرین را می‌سرود، آن منظومهٔ بزرگ عاشقانه، آفاق درگذشت.' },
          { t: 'p', x: 'He put her death into the poem. In the middle of the love story he was writing, he stops, and mourns his wife, and then goes on. It is one of the most unguarded moments in classical Persian literature.', fa: 'مرگ او را در همان منظومه گذاشت. وسط داستان عاشقانه‌ای که می‌نوشت، می‌ایستد، بر همسرش سوگ می‌گزارد، و بعد ادامه می‌دهد. این یکی از بی‌پرده‌ترین لحظه‌های ادبیات کلاسیک فارسی است.' },
          { t: 'p', x: 'He married again. That wife died as he finished Layli and Majnun. He married a third time. She died as he finished the Haft Peykar. Three books, three wives, each one gone as the ink dried.', fa: 'دوباره ازدواج کرد. آن همسر درست وقتی درگذشت که لیلی و مجنون را به پایان می‌رساند. بار سوم ازدواج کرد. او هم وقتی رفت که هفت پیکر تمام می‌شد. سه کتاب، سه همسر، و هر یک درست وقتی رفت که مرکب خشک می‌شد.' },
          { t: 'illumin', x: 'He wrote, half joking and not joking at all, asking God why a wife must be taken for every poem finished.', fa: 'نوشت، نیمه‌شوخی و در عین حال کاملاً جدی، و از خدا پرسید چرا باید بابت هر منظومه‌ای که تمام می‌شود، همسری گرفته شود.' },
          { t: 'mark', x: 'Every great love story in this language was written by a man burying the woman he loved.', fa: 'هر داستان عاشقانهٔ بزرگ این زبان را مردی نوشت که داشت زنِ محبوبش را به خاک می‌سپرد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The five', fa: 'پنج گنج' },
          { t: 'p', x: 'His life work is called the Khamsa, the Quintet. Five long narrative poems, around thirty thousand couplets in total. Before him, Persian narrative meant Ferdowsi and kings and war. Nizami turned the epic inward and pointed it at two people in a room.', fa: 'کار عمرش را خمسه می‌خوانند، یا پنج گنج. پنج منظومهٔ بلند روایی، رویهم حدود سی هزار بیت. پیش از او، روایت در فارسی یعنی فردوسی و شاهان و جنگ. نظامی حماسه را به درون چرخاند و آن را به دو نفر در یک اتاق نشانه رفت.' },
          { t: 'p', x: 'And he did something nobody had done: he gave the women interior lives. Shirin argues, refuses, negotiates, and is often the most intelligent person in the poem. Layli is not a prize. She speaks, and what she says is sharper than anything the men manage.', fa: 'و کاری کرد که هیچ‌کس نکرده بود: به زنان جهانِ درونی داد. شیرین بحث می‌کند، رد می‌کند، چانه می‌زند، و اغلب خردمندترین شخصیت منظومه است. لیلی جایزه نیست. حرف می‌زند، و آنچه می‌گوید تیزتر از هر چیزی است که از دهان مردان درمی‌آید.' },
        ] },
      ],
    },
    {
      key: 'nz2',
      title: 'The Man Who Carved a Mountain', titleFa: 'مردی که کوه را تراشید',
      nav: 'Farhad', navFa: 'فرهاد',
      subtitle: 'KHOSROW AND SHIRIN',
      pages: [
        { blocks: [
          { t: 'p', x: 'Khosrow and Shirin takes a real Sasanian king, Khosrow Parviz, and a real queen, and builds around them a long, difficult, adult romance of pride and delay and missed chances. It is not a fairy tale. Khosrow is vain and often a coward, and Shirin is better than him, and both of them know it.', fa: 'خسرو و شیرین شاهی واقعی از ساسانیان را برمی‌دارد، خسرو پرویز، و ملکه‌ای واقعی را، و گرد آن دو داستانی عاشقانه می‌سازد؛ بلند و دشوار و بزرگسالانه، از غرور و تعلل و فرصت‌های از دست رفته. افسانهٔ پریان نیست. خسرو خودخواه است و اغلب ترسو، و شیرین از او بهتر است، و هر دو این را می‌دانند.' },
          { t: 'p', x: 'And then Nizami invents a character who was not in any history, and the invention swallows the poem.', fa: 'و بعد نظامی شخصیتی می‌آفریند که در هیچ تاریخی نبوده، و همان آفریده، منظومه را می‌بلعد.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Farhad', fa: 'فرهاد' },
          { t: 'p', x: 'Farhad is a stonecutter. He sees Shirin once and loves her with a completeness that the king, with all his armies, cannot match. He is not noble, he is not rich, and he is not going to stop.', fa: 'فرهاد سنگ‌تراش است. شیرین را یک بار می‌بیند و چنان تمام و کمال عاشقش می‌شود که شاه، با همهٔ سپاهش، به گَردش نمی‌رسد. نه اشراف‌زاده است، نه توانگر، و قرار هم نیست دست بردارد.' },
          { t: 'p', x: 'Khosrow, jealous of a labourer, sets him an impossible task. Cut a channel through Mount Bisotun, and Shirin is yours. It cannot be done. That is why it is offered.', fa: 'خسرو که به یک کارگر رشک می‌برد، کاری ناممکن پیش پایش می‌گذارد: از دل کوه بیستون جوی بکَن، و شیرین از آنِ توست. شدنی نیست. پیشنهاد هم به همین دلیل داده می‌شود.' },
          { t: 'mountain' },
          { t: 'p', x: 'He does it. That is the turn nobody expects. Farhad takes his axe to the mountain and begins to cut, and he does not stop, and the mountain begins to give way.', fa: 'و انجامش می‌دهد. این همان چرخشی است که کسی انتظارش را ندارد. فرهاد تیشه‌اش را بر کوه می‌گذارد و شروع به تراشیدن می‌کند، و دست برنمی‌دارد، و کوه کم‌کم تسلیم می‌شود.' },
        ] },
        { blocks: [
          { t: 'h', x: 'And then the lie', fa: 'و بعد، آن دروغ' },
          { t: 'p', x: 'Khosrow panics. He is a king, and he has been beaten by a man with a hammer, so he does the thing a king can always do. He sends a messenger with false news: Shirin is dead.', fa: 'خسرو وحشت می‌کند. شاه است، و مردی با یک پتک شکستش داده، پس همان کاری را می‌کند که از دست هر شاهی همیشه برمی‌آید: پیکی می‌فرستد با خبری دروغ؛ شیرین مرده است.' },
          { t: 'p', x: 'Farhad, standing in the wound he has cut through a mountain for her, hears it, and throws his axe into the air, and follows it down.', fa: 'فرهاد، ایستاده در همان شکافی که به خاطر او در دل کوه تراشیده، این را می‌شنود، تیشه را به هوا می‌اندازد، و پشت سرش فرو می‌افتد.' },
          { t: 'illumin', x: 'The mountain could be beaten. A lie could not.', fa: 'کوه را می‌شد شکست. دروغ را نه.' },
          { t: 'p', x: 'Every Iranian knows Farhad, and knows he is not in the histories, and does not care. He became the word for a certain kind of love: the kind that does the impossible thing and is destroyed by something small and cheap. To call a man Farhad is to say he loved past all reason and it cost him everything.', fa: 'هر ایرانی فرهاد را می‌شناسد، و می‌داند که در تاریخ‌ها نیست، و برایش مهم نیست. او به واژه‌ای بدل شد برای نوعی از عشق: عشقی که کار ناممکن را می‌کند و بعد با چیزی کوچک و ارزان نابود می‌شود. وقتی به مردی می‌گویند فرهاد، یعنی فراتر از هر عقلی عاشق شد و همه‌چیزش را بر سرش داد.' },
          { t: 'aside', x: 'Bisotun is real. Darius carved his inscription into that cliff fifteen hundred years before Nizami. Iranians will tell you the marks on the rock are Farhad work, and they will smile when they tell you.', fa: 'بیستون واقعی است. داریوش هزار و پانصد سال پیش از نظامی سنگ‌نبشته‌اش را بر آن صخره کند. ایرانی‌ها به تو می‌گویند آن نشانه‌ها روی سنگ کارِ فرهاد است، و وقتی می‌گویند لبخند می‌زنند.' },
        ] },
      ],
    },
    {
      key: 'nz3',
      title: 'The Madman', titleFa: 'مجنون',
      nav: 'Majnun', navFa: 'مجنون',
      subtitle: 'LAYLI AND MAJNUN',
      pages: [
        { blocks: [
          { t: 'p', x: 'It began as an Arab desert legend, thin and old. Nizami rewrote it in 1188, and his version became the definitive one across half the world, from Istanbul to Delhi. It is the Persian love story, and it is four hundred years older than Romeo and Juliet.', fa: 'در آغاز افسانه‌ای عربی بود از دل بیابان، کهنه و کم‌جان. نظامی در سال ۱۱۸۸ میلادی از نو نوشتش، و روایت او در نیمی از جهان روایت قطعی شد، از استانبول تا دهلی. این همان داستان عاشقانهٔ ایرانی است، و چهارصد سال از رومئو و ژولیت کهن‌تر.' },
          { t: 'p', x: 'A boy called Qays loves a girl called Layli at school. Their families forbid it. He does not recover. He begins reciting poems about her in the street, and the shame of that public love is exactly what makes the marriage impossible forever. People start calling him Majnun, which is not a name. It means possessed. Madman.', fa: 'پسری به نام قیس، در مکتب‌خانه عاشق دختری به نام لیلی می‌شود. خانواده‌هایشان اجازه نمی‌دهند. او دیگر خوب نمی‌شود. در کوچه و خیابان دربارهٔ لیلی شعر می‌خواند، و ننگِ همین عشقِ علنی است که ازدواج را برای همیشه ناممکن می‌کند. مردم کم‌کم مجنونش می‌خوانند، که نام نیست؛ یعنی جن‌زده. دیوانه.' },
          { t: 'p', x: 'He goes into the desert. He stops eating, stops washing, stops speaking to people. Wild animals gather around him and do not run, because there is nothing left of him to fear. Layli is married off to a man she will not touch. Both of them die apart.', fa: 'به بیابان می‌زند. از خوردن می‌افتد، از شستن، از حرف زدن با مردم. جانوران وحشی گردش جمع می‌شوند و نمی‌گریزند، چون دیگر چیزی از او نمانده که از آن بترسند. لیلی را به مردی می‌دهند که هرگز دست به او نمی‌زند. هر دو، دور از هم، می‌میرند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The line every Iranian knows', fa: 'آن جمله که هر ایرانی می‌داند' },
          { t: 'p', x: 'A ruler hears about this famous madness and has Layli brought to him. He looks at her, and he is unimpressed, and he says so: are you the one who drove that man out of his mind? You are not so beautiful.', fa: 'فرمانروایی از این دیوانگی نامدار می‌شنود و لیلی را نزد خود می‌آورد. نگاهش می‌کند، چیز چندانی در او نمی‌بیند، و همین را هم می‌گوید: تو همانی که آن مرد را از خود بی‌خود کرد؟ چندان هم زیبا نیستی.' },
          { t: 'veil', surface: 'Be silent. You are not Majnun.', surfaceFa: 'خاموش باش، که تو مجنون نیستی.', hidden: 'Layli answer, and it ends the argument permanently. Beauty is not a property of the object. It is an event between two people. The caliph cannot see it because he lacks the instrument, not because it is not there. She is not defending her looks. She is telling the most powerful man present that he is blind.', hiddenFa: 'پاسخ لیلی، که بحث را برای همیشه می‌بندد. زیبایی، خاصیتِ آن چیزی که به آن نگاه می‌کنی نیست؛ رویدادی است میان دو نفر. خلیفه نمی‌بیندش، نه از آن رو که نیست، بلکه از آن رو که ابزارش را ندارد. لیلی از ظاهر خودش دفاع نمی‌کند. دارد به نیرومندترین مرد حاضر در آن مجلس می‌گوید که کور است.' },
          { t: 'p', x: 'That reply is quoted in Iran to this day, by people who have never read the poem, at anyone who dismisses something they cannot feel.', fa: 'همین پاسخ تا امروز در ایران نقل می‌شود؛ آن هم از زبان کسانی که هرگز خود منظومه را نخوانده‌اند، خطاب به هر کسی که چیزی را دست‌کم می‌گیرد، فقط چون خودش حسش نمی‌کند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What the story is actually about', fa: 'این داستان در واقع دربارهٔ چیست' },
          { t: 'p', x: 'Late in the poem, someone offers Majnun a way to reach Layli, and he refuses. This is the moment the whole thing turns on, and it is why the poem has lasted.', fa: 'اواخر منظومه، کسی به مجنون راهی برای رسیدن به لیلی پیشنهاد می‌کند، و او نمی‌پذیرد. تمام کار بر همین لحظه می‌چرخد، و همین است که این منظومه را ماندگار کرده.' },
          { t: 'p', x: 'The love has outgrown its object. He does not want Layli anymore. He wants the state of loving her, which has become larger and more real than the woman ever was. She has become a door, and he is no longer interested in what is behind it, because he is standing in the light coming through.', fa: 'عشق از موضوع خودش بزرگ‌تر شده است. دیگر لیلی را نمی‌خواهد. آن حالِ عاشقیِ لیلی را می‌خواهد، که بزرگ‌تر و واقعی‌تر از خودِ آن زن شده است. لیلی به دری بدل شده، و مجنون دیگر به پشت آن در کاری ندارد، چون در همان نوری ایستاده که از آن می‌تابد.' },
          { t: 'mark', x: 'He loved her until she was no longer necessary.', fa: 'چندان عاشقش بود که دیگر به خودش نیازی نماند.' },
          { t: 'p', x: 'Sufis read this as the whole path: love a person completely enough and the person dissolves and you are left loving God, who was the object the entire time. Others read it as a straightforward tragedy about a boy who went mad and died in a desert. Nizami permits both, and never once tells you which.', fa: 'صوفیان این را تمامِ راه می‌خوانند: کسی را چنان تمام و کمال دوست بدار که خودِ او حل شود و آنچه بماند عشق به خدا باشد، که از اول هم مقصود همو بوده. دیگران آن را سوگ‌نامه‌ای ساده می‌خوانند دربارهٔ پسری که دیوانه شد و در بیابانی مرد. نظامی هر دو را روا می‌دارد، و حتی یک بار هم نمی‌گوید کدام.' },
        ] },
      ],
    },
    {
      key: 'nz4',
      title: 'Seven Domes', titleFa: 'هفت پیکر',
      nav: 'The Domes', navFa: 'هفت گنبد',
      subtitle: 'HAFT PEYKAR',
      pages: [
        { blocks: [
          { t: 'p', x: 'And then he built the strangest thing in Persian literature.', fa: 'و بعد، غریب‌ترین چیز ادبیات فارسی را ساخت.' },
          { t: 'p', x: 'King Bahram Gur builds seven domed pavilions. Each is a single colour. Each belongs to a planet and a day of the week. In each lives a princess from a different country of the world. On each day he goes to the dome of that day, dressed in that colour, and the princess tells him a story.', fa: 'بهرام گور هفت گنبد می‌سازد. هر یک به یک رنگ. هر یک از آنِ سیاره‌ای و روزی از هفته. در هر گنبد شاهدختی از کشوری دیگرِ جهان زندگی می‌کند. هر روز به گنبد همان روز می‌رود، به رنگ همان روز جامه می‌پوشد، و شاهدخت برایش داستانی می‌گوید.' },
          { t: 'haftpeykar' },
          { t: 'p', x: 'Touch a dome.', fa: 'یکی از گنبدها را لمس کن.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Why this is not decoration', fa: 'چرا این تزیین نیست' },
          { t: 'p', x: 'The colours are a sequence and they are going somewhere. He begins in black, the dome of Saturn, and the tale told there is the darkest. He ends in white, the dome of Venus, and the tale is the simplest and cleanest. The week is a journey out of darkness into light, and the king walks it one day at a time without noticing.', fa: 'رنگ‌ها یک توالی‌اند و به جایی می‌روند. از سیاه آغاز می‌کند، گنبد کیوان، و داستانی که آنجا گفته می‌شود تاریک‌ترین است. به سپید ختم می‌کند، گنبد ناهید، و داستانش ساده‌ترین و پاک‌ترین. آن هفته سفری است از تاریکی به روشنایی، و شاه روز به روز می‌پیمایدش بی‌آنکه متوجه باشد.' },
          { t: 'p', x: 'And the stories are not moral lessons. They are strange, erotic, funny, cruel, and they refuse to resolve neatly. Nizami is doing something no one else in Persian was doing: building a structure where the shape is the argument.', fa: 'و این داستان‌ها درس اخلاقی نیستند. غریب‌اند، شهوانی، خنده‌دار، بی‌رحم، و حاضر نیستند تمیز و مرتب به نتیجه برسند. نظامی کاری می‌کند که هیچ‌کس دیگری در فارسی نمی‌کرد: ساختاری می‌سازد که در آن، خودِ شکل همان استدلال است.' },
          { t: 'mark', x: 'Seven colours, seven planets, seven days, seven countries. Nothing in it is accidental.', fa: 'هفت رنگ، هفت سیاره، هفت روز، هفت سرزمین. هیچ چیزش تصادفی نیست.' },
          { t: 'p', x: 'And there is a sting. While Bahram spends his week moving from dome to dome, his kingdom is being ruined by a corrupt minister, and he does not notice. The king perfecting himself through beauty is failing at the only job he has. Nizami lets the reader work that out alone.', fa: 'و نیشی هم در کار است. در همان هفته‌ای که بهرام از گنبدی به گنبد دیگر می‌رود، وزیری فاسد دارد کشورش را به باد می‌دهد، و او متوجه نیست. شاهی که با زیبایی خودش را کامل می‌کند، در تنها کاری که بر عهده دارد شکست می‌خورد. نظامی می‌گذارد خواننده خودش به این برسد.' },
          { t: 'illumin', x: 'He built the most beautiful structure in the language, and then quietly asked what it cost.', fa: 'زیباترین ساختار این زبان را ساخت، و بعد بی‌سروصدا پرسید بهایش چه بود.' },
        ] },
      ],
    },
    {
      key: 'nz5',
      title: 'What He Left', titleFa: 'آنچه بر جای گذاشت',
      nav: 'Legacy', navFa: 'میراث',
      subtitle: 'HIS PLACE',
      pages: [
        { blocks: [
          { t: 'p', x: 'He died in Ganja around 1209, in the city he never left, and is buried there.', fa: 'حدود سال ۱۲۰۹ میلادی در گنجه درگذشت، در همان شهری که هرگز ترکش نکرد، و همان‌جا به خاک سپرده شد.' },
          { t: 'imgframe', key: 'nizami-tomb', cap: 'The tomb at Ganja, for the man who wrote the loves everyone else would spend eight centuries painting.' },
          { t: 'p', x: 'His afterlife is enormous. Every miniature painter for the next six hundred years painted his scenes: Shirin at the pool, Farhad on the mountain, Majnun among the animals, the seven domes. Walk any museum with Persian art and you are looking at Nizami, whether the label says so or not. Poets from Turkey to India rewrote his five poems in their own languages as a test of skill.', fa: 'آنچه پس از او ماند عظیم است. در ششصد سال بعد، هر نگارگری صحنه‌های او را کشید: شیرین بر لب چشمه، فرهاد بر کوه، مجنون میان جانوران، و آن هفت گنبد. در هر موزه‌ای که هنر ایرانی دارد قدم بزنی، داری نظامی را تماشا می‌کنی، چه روی برچسبش نوشته باشند و چه نه. شاعران، از ترکیه تا هند، پنج منظومهٔ او را به زبان خودشان از نو نوشتند، به‌عنوان محک هنرشان.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The inventor of the interior', fa: 'کاشفِ درون' },
          { t: 'p', x: 'Here is the claim for him. Before Nizami, Persian narrative was about what people did. After Nizami, it was about what people felt while doing it. He is the one who turned the camera around.', fa: 'ادعا دربارهٔ او این است: پیش از نظامی، روایت فارسی دربارهٔ آن بود که آدم‌ها چه کردند. پس از نظامی، دربارهٔ آن شد که حین آن کار چه حسی داشتند. او همان کسی است که دوربین را برگرداند.' },
          { t: 'p', x: 'And he gave the language its vocabulary of love. Not the mystical love of Hafez, and not the ethical love of Saadi. The other one. Wanting a specific person, being refused, and what that does to a life. Farhad and Majnun are still the two words Iranians reach for, and both of them are his.', fa: 'و واژگانِ عشق را به این زبان داد. نه عشق عارفانهٔ حافظ، و نه عشق اخلاقی سعدی. آن یکی دیگر: خواستنِ یک آدم مشخص، جواب رد شنیدن، و آنچه این بر سر یک زندگی می‌آورد. فرهاد و مجنون هنوز دو واژه‌ای‌اند که ایرانی‌ها سراغشان می‌روند، و هر دو از او است.' },
          { t: 'mark', x: 'Hafez taught Iran how to love God. Nizami taught it how to love a person.', fa: 'حافظ به ایران آموخت چگونه خدا را دوست بدارد. نظامی آموخت چگونه یک آدم را.' },
        ] },
        { blocks: [
          { t: 'rule' },
          { t: 'p', x: 'This has been a glimpse of Nizami of Ganja, who stayed in one small city, refused the courts, and wrote five poems that gave a civilization its picture of what love is.', fa: 'این نگاهی بود کوتاه به نظامی گنجوی؛ که در یک شهر کوچک ماند، دربارها را نپذیرفت، و پنج منظومه سرود که تصویر عشق را به یک تمدن بخشید.' },
          { t: 'p', x: 'He made a stonecutter who cut through a mountain and died of a rumour. He made a boy who loved a girl until she was no longer necessary. He made seven domes of seven colours and a king too busy being perfected to notice his kingdom falling. And he wrote all of it while burying, one by one, every woman he loved.', fa: 'سنگ‌تراشی ساخت که کوه را شکافت و از یک شایعه مرد. پسری ساخت که دختری را چندان دوست داشت تا دیگر به خودش نیازی نماند. هفت گنبد به هفت رنگ ساخت، و شاهی که چنان سرگرم کامل کردن خودش بود که ندید کشورش دارد فرو می‌ریزد. و همهٔ اینها را نوشت، در حالی که یکی‌یکی زنانی را که دوست داشت به خاک می‌سپرد.' },
          { t: 'illumin', x: 'He knew what he was writing about. That is the whole problem.', fa: 'می‌دانست دربارهٔ چه می‌نویسد. تمام مشکل همین است.' },
          { t: 'motif', symbol: 'rose', caption: 'نظامی' },
        ] },
      ],
    },
  ],
};

const rumi: Author = {
  key: 'rumi',
  name: 'Rumi',
  persian: 'مولانا',
  epithet: 'The Reed Cut from the Bed',
  years: '1207 - 1273',
  essence: 'The best selling poet in America is a thirteenth century Muslim jurist from Balkh who lost his closest friend and turned the grief into forty thousand verses, and signed the greatest of them with the dead man name.', essenceFa: 'پرفروش‌ترین شاعر آمریکا، فقیهی مسلمان از بلخ در سدهٔ سیزدهم میلادی است که نزدیک‌ترین دوستش را از دست داد، آن اندوه را به چهل هزار بیت بدل کرد، و بهترینشان را به نام همان مرد مرده امضا کرد.',
  cover: 'lit-rumi-cover',
  closing: 'rumi-tomb',
  status: 'ready',
  chapters: [
    {
      key: 'rm1',
      title: 'The Road Out', titleFa: 'راه بیرون',
      nav: 'The Road', navFa: 'راه',
      subtitle: 'BALKH, 1207',
      pages: [
        { blocks: [
          { t: 'lead', x: 'He was a respectable man. That is the part people forget.', fa: 'مردی بود آبرومند و سرشناس. همین بخش است که از یاد می‌رود.', mark: 'spiral' },
          { t: 'p', x: 'Jalal al Din was born in 1207 in Balkh, in the far east of the Persian world, in what is now Afghanistan. His father was a serious scholar with a serious following. The boy was raised to inherit that, and he did.', fa: 'جلال‌الدین محمد در سال ۱۲۰۷ میلادی در بلخ به دنیا آمد، در شرقِ دورِ جهان ایرانی، در افغانستانِ امروز. پدرش عالمی جدی بود با پیروانی جدی. پسر را برای به ارث بردن همین بار آوردند، و به ارث هم برد.' },
          { t: 'p', x: 'Then the Mongols came. The family left, ahead of the destruction, and never went back. Balkh was erased behind them. Rumi spent his whole life as a man from a city that no longer existed.', fa: 'بعد مغول‌ها آمدند. خانواده پیش از رسیدن ویرانی راه افتاد و دیگر هرگز بازنگشت. بلخ پشت سرشان از روی زمین پاک شد. مولانا تمام عمرش را مردی گذراند از شهری که دیگر وجود نداشت.' },
          { t: 'motif', symbol: 'moon', caption: 'مولانا' },
        ] },
        { blocks: [
          { t: 'h', x: 'A prophecy on the road', fa: 'پیشگویی‌ای در راه' },
          { t: 'p', x: 'They travelled for years. Nishapur, Baghdad, Mecca, Damascus, and finally Konya in Anatolia, deep in the old Byzantine lands, which Persians called Rum. That is where his name comes from. Rumi means simply the one from Rum, the Roman. The most Persian of poets is named after the Roman empire.', fa: 'سال‌ها در راه بودند. نیشابور، بغداد، مکه، دمشق، و سرانجام قونیه در آناتولی، در دل سرزمین‌های کهن بیزانس، که ایرانیان آن را روم می‌خواندند. نام رومی از همین‌جا می‌آید و معنایش همین است: اهل روم. ایرانی‌ترین شاعران، نامش را از امپراتوری روم گرفته است.' },
          { t: 'p', x: 'And in Nishapur, the story goes, the family met Attar, the old master of Persian mysticism. Attar looked at the boy, gave him a copy of his book, and told the father that his son would one day set the lovers of the world on fire.', fa: 'و در نیشابور، چنان‌که حکایت می‌کنند، خانواده با عطار روبه‌رو شد، آن استاد پیر عرفان ایرانی. عطار به پسر نگاه کرد، نسخه‌ای از کتابش را به او داد، و به پدر گفت که این پسر روزی آتش در جان عاشقان جهان خواهد زد.' },
          { t: 'aside', x: 'The story may well be later invention. It is also too good to leave out, and Iranians have never left it out.', fa: 'چه‌بسا این حکایت را بعدها ساخته باشند. در عین حال آن‌قدر خوب است که نشود کنارش گذاشت، و ایرانی‌ها هم هرگز کنارش نگذاشته‌اند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The life he was living', fa: 'زندگی‌ای که داشت' },
          { t: 'p', x: 'By his late thirties Rumi was the most respected religious authority in Konya. He taught law. He issued rulings. He preached to crowds. He had hundreds of students and a household and a reputation, and he was, by every account, excellent at all of it.', fa: 'تا اواخر دههٔ سی زندگی‌اش، مولانا محترم‌ترین مرجع دینی قونیه بود. فقه درس می‌داد. فتوا می‌داد. برای جمعیت موعظه می‌کرد. صدها شاگرد داشت و خانه‌ای و آبرویی، و به گواه همه، در همهٔ این کارها عالی بود.' },
          { t: 'p', x: 'He had written almost no poetry. There was no reason to think he ever would. He was a scholar in a turban, forty years old, at the top of his profession, and his life was finished being decided.', fa: 'تقریباً هیچ شعری نگفته بود. دلیلی هم نبود که کسی گمان کند روزی خواهد گفت. عالمی بود با عمامه، چهل ساله، در اوج کارش، و تکلیف زندگی‌اش دیگر روشن شده بود.' },
          { t: 'mark', x: 'Everything he is famous for happened after he was forty, and none of it was planned.', fa: 'هر آنچه او را به آن می‌شناسند پس از چهل سالگی رخ داد، و هیچ‌کدامش برنامه‌ریزی نشده بود.' },
        ] },
      ],
    },
    {
      key: 'rm2',
      title: 'The Meeting', titleFa: 'آن دیدار',
      nav: 'Shams', navFa: 'شمس',
      subtitle: 'KONYA, 1244',
      pages: [
        { blocks: [
          { t: 'p', x: 'In 1244 a wandering dervish came to Konya. His name was Shams e Tabrizi, Shams meaning the sun. He was old, poor, rude, and by every account extraordinarily difficult. He had spent his life looking for someone who could bear his company, and had not found one.', fa: 'در سال ۱۲۴۴ میلادی درویشی دوره‌گرد به قونیه آمد. نامش شمس تبریزی بود، و شمس یعنی خورشید. پیر بود و تنگدست و تندزبان، و به گواه همه به‌شدت سخت‌برخورد. عمرش را صرف جست‌وجوی کسی کرده بود که تاب هم‌نشینی با او را داشته باشد، و پیدایش نکرده بود.' },
          { t: 'p', x: 'He found Rumi. Accounts differ on how. The most repeated one has Shams pushing through a crowd to ask the great scholar a question.', fa: 'مولانا را پیدا کرد. در اینکه چگونه، روایت‌ها یکی نیستند. پرتکرارترینشان این است که شمس از میان جمعیت راه باز کرد تا از آن عالم بزرگ پرسشی بپرسد.' },
          { t: 'story', title: 'The Question', x: 'Who was greater, Shams asked, the Prophet Muhammad or Bayazid Bastami? Rumi answered as any scholar would: the Prophet, without question. Then why, said Shams, did the Prophet say we have not known You as You should be known, while Bayazid said glory be to me, how great is my majesty?', moral: 'Rumi understood, and by some accounts fell to the ground.' },
          { t: 'p', x: 'The point being made was that the Prophet had gone so far he knew how far there was left to go, while Bayazid had glimpsed a little and mistaken it for everything. It is a question about the difference between an experience and the truth. It undid a man who had spent forty years being certain.', fa: 'نکته‌ای که مطرح می‌شد این بود که پیامبر چندان پیش رفته بود که می‌دانست چقدر راه مانده است، حال آنکه بایزید تنها اندکی دیده و همان را همه‌چیز پنداشته بود. این پرسشی است دربارهٔ تفاوت میان یک تجربه و خودِ حقیقت. و مردی را که چهل سال یقین داشت، از هم پاشاند.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What followed', fa: 'آنچه پس از آن آمد' },
          { t: 'p', x: 'They went into seclusion together, and for months nobody saw them. Rumi stopped teaching. He stopped issuing rulings. He stopped appearing. The most eminent man in the city vanished into a room with a homeless dervish and did not come out.', fa: 'با هم به خلوت رفتند، و ماه‌ها کسی ندیدشان. مولانا درس دادن را رها کرد. فتوا دادن را رها کرد. دیگر جایی ظاهر نشد. سرشناس‌ترین مرد شهر با درویشی بی‌خانمان در اتاقی ناپدید شد و بیرون نیامد.' },
          { t: 'p', x: 'His students were humiliated, then angry, and the anger was aimed at Shams. This ragged nobody had stolen their master. Shams left once, for Damascus, and Rumi fell apart so completely that he sent his own son to beg him back.' },
          { t: 'p', x: 'And then in 1248 Shams disappeared for good.' },
          { t: 'illumin', x: 'Nobody knows what happened to him. That is not a mystery the sources are being coy about. It is genuinely unknown.' },
          { t: 'p', x: 'The likeliest reading is that he was murdered, quietly, by people close to Rumi who wanted their teacher back, possibly with the knowledge of Rumi own son. There is a well in Konya they will show you. There is no body, and there never was.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The search' },
          { t: 'p', x: 'Rumi did not accept it. He went to Damascus looking for him. He went twice. He asked everyone. He walked the streets of a foreign city calling for a man everyone else knew was dead.' },
          { t: 'p', x: 'And somewhere in that, something broke open. He stopped looking, and wrote that he had searched and searched and had finally found Shams inside himself. Not as consolation. As a discovery. The thing he had loved in the man was not the man.' },
          { t: 'mark', x: 'He went out to find his friend and found him in his own chest, and then he began to sing.' },
        ] },
      ],
    },
    {
      key: 'rm3',
      title: 'The Reed Cut from the Bed', titleFa: 'نی، بریده از نیستان',
      nav: 'The Voice', navFa: 'آن صدا',
      subtitle: 'WHAT THE GRIEF MADE',
      pages: [
        { blocks: [
          { t: 'p', x: 'What came out of him after Shams is one of the strangest events in the history of literature. A man who had written almost nothing produced, in the remaining twenty five years of his life, roughly seventy thousand lines of poetry.' },
          { t: 'p', x: 'And he did not write them, in the way we mean. He spoke them. Walking, turning, in the middle of conversation, at any hour, and a devoted man named Husam al Din wrote them down as fast as they came.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The book with the wrong name' },
          { t: 'p', x: 'The first is a collection of ghazals, around forty thousand verses of them, and it is his greatest lyric work. It is called the Divan e Shams e Tabrizi. The Divan of Shams of Tabriz.' },
          { t: 'p', x: 'He signed the dead man name to his own poems. Not as dedication, as authorship. At the end of a ghazal, where a Persian poet puts his own name and always has, Rumi put Shams.' },
          { t: 'illumin', x: 'He wrote the best poetry of his life and gave the credit to a man who was probably murdered by his own household.' },
          { t: 'p', x: 'And it is not humility, or not only. It is the actual claim. He believed the voice was not his. The self that would have signed it was the thing that dissolved in that room in 1244, and what was left did not have a name to put down.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Masnavi' },
          { t: 'p', x: 'The second book is the Masnavi, twenty six thousand couplets across six volumes, and Persians have called it the Quran in the Persian tongue for seven hundred years. It is stories, digressions, jokes, arguments, jurisprudence, and long passages of the purest mysticism in the language, and it wanders like a conversation because it was one.' },
          { t: 'p', x: 'It opens with eighteen lines about a flute, and those eighteen lines contain the entire thesis.' },
          { t: 'reed' },
          { t: 'p', x: 'A reed is cut from the reed bed to make a ney. The music the flute makes is the sound of a plant crying for the water it was taken from. It only sings because it was wounded, and what it sings about is the wound.' },
          { t: 'mark', x: 'You are the reed. You were cut from something. Everything you have ever wanted is that.' },
          { t: 'p', x: 'That is the Masnavi in one image, delivered in the first minute, and the remaining twenty six thousand couplets are elaboration. It is also, unmistakably, a man explaining what happened to him when he lost Shams and discovering that it explains the universe.' },
        ] },
      ],
    },
    {
      key: 'rm4',
      title: 'The Turning', titleFa: 'چرخیدن',
      nav: 'Sama', navFa: 'سماع',
      subtitle: 'WHY HE SPINS',
      pages: [
        { blocks: [
          { t: 'p', x: 'The story is that he was walking through the goldsmiths quarter of Konya, and the hammers were beating on the metal, and in the rhythm he heard something, and he raised his arms and began to turn in the street, and did not stop.' },
          { t: 'sama' },
          { t: 'p', x: 'Touch it, and let it turn.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Nothing about it is arbitrary' },
          { t: 'p', x: 'Every part of the sama means something, and it was formalised into an order after his death by his son. The white robe is a shroud. The black cloak is the tomb, and it is dropped at the beginning, because the dervish is stepping out of his grave. The tall felt hat is a headstone.' },
          { t: 'p', x: 'The right hand turns up to receive from heaven. The left hand turns down to give to the earth. Nothing is kept. The dervish is a pipe, not a cup, and whatever comes through goes straight out the other side into the world.' },
          { t: 'p', x: 'And the turn is counterclockwise, around the heart, in the same direction as the pilgrims around the Kaaba, and the planets, and everything else that goes around a centre.' },
          { t: 'illumin', x: 'A man spinning in a room is doing what the solar system is doing, and knows it.' },
        ] },
        { blocks: [
          { t: 'h', x: 'What it is not' },
          { t: 'p', x: 'It is not a dance, and it is not a performance, whatever the tourist shows in Konya have made of it. It is a prayer with the body in it, and its purpose is to spin the self out of the way so that something else can occupy the room.' },
          { t: 'p', x: 'Rumi did not found the order. He simply could not stop turning, and after he died the people who loved him built a discipline around what he had done instinctively in the street.' },
        ] },
      ],
    },
    {
      key: 'rm5',
      title: 'What Was Taken Out', titleFa: 'آنچه حذف شد',
      nav: 'The West', navFa: 'غرب',
      subtitle: 'RUMI IN ENGLISH',
      pages: [
        { blocks: [
          { t: 'p', x: 'Rumi is, by a wide margin, the best selling poet in the United States. He has been for years. He is read at weddings, printed on cards, tattooed, quoted by people who could not name a single other poet born before 1900.' },
          { t: 'p', x: 'Almost all of them are reading Coleman Barks, an American poet who does not read Persian. He works from older English translations and reshapes them into free verse, and he has said plainly that this is what he does.' },
          { t: 'p', x: 'He made millions of people love a Persian name, and that is not nothing. But something specific was removed on the way, and it is worth naming exactly.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The scholar disappears' },
          { t: 'p', x: 'Rumi was a Muslim jurist. He knew the Quran the way you know your own hands, and the Masnavi is soaked in it, quoting it, arguing with it, building on it in nearly every section. He led prayers. He issued legal rulings. Islam is not the background of his poetry. It is the material.' },
          { t: 'p', x: 'In the popular English versions, most of that is gone. The Quranic citations, the references to the Prophet, the specifically Islamic frame, thinned out or removed, leaving a warm and boundless spiritual figure who could have come from anywhere.' },
          { t: 'twotrans', a: { label: 'THE POPULAR ENGLISH', x: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I will meet you there.' }, b: { label: 'WHAT THE PERSIAN SAYS', x: 'Beyond belief and unbelief there is a plain. I will meet you there.' } },
          { t: 'p', x: 'Look at the swap. Belief and unbelief, iman and kufr, are precise theological terms in Islam, and Rumi is making a bold and specifically religious claim about a place past both of them. In English they became wrongdoing and rightdoing, which is a claim about ethics, which is not what he said at all.' },
          { t: 'mark', x: 'A Muslim scholar saying something daring about faith was turned into a life coach saying something safe about judgement.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Holding both' },
          { t: 'p', x: 'The fair verdict is uncomfortable, and it is the same one Khayyam earned. The English Rumi is not the real Rumi. The English Rumi also made the world care, and some of the people it reached went and found the real one.' },
          { t: 'p', x: 'The loss is not that he was made too spiritual. It is that he was made too easy. The real Rumi is harder, funnier, dirtier, more argumentative, and immeasurably stranger than the one on the greeting card, and he is right there, in the Persian, unread.' },
        ] },
      ],
    },
    {
      key: 'rm6',
      title: 'The Wedding Night', titleFa: 'شب عروس',
      nav: 'Legacy', navFa: 'میراث',
      subtitle: 'KONYA, 1273',
      pages: [
        { blocks: [
          { t: 'p', x: 'He died on the seventeenth of December, 1273, in Konya.' },
          { t: 'p', x: 'The funeral is the thing to know about him. Christians came. Jews came. Greeks and Armenians and Turks and Persians came, and when they were asked why, the answer that survives is that each of them had found their own prophet in him. The procession took hours to pass.' },
          { t: 'imgframe', key: 'rumi-tomb', cap: 'The green dome at Konya, where they still come, seven hundred and fifty years on.' },
          { t: 'p', x: 'And he had told them not to mourn. He called the night of his death Shab e Arus, the wedding night, because dying was the reunion, the reed going back to the water. It is still marked in Konya every December, on the anniversary, as a wedding.' },
          { t: 'illumin', x: 'He named the night of his own death the wedding night, and they have kept the name.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The six of them' },
          { t: 'p', x: 'This is the last of them, so it is worth standing back. Rudaki proved the language could hold poetry. Ferdowsi saved the language itself. Nizami taught it to look inward at love. Saadi taught it how to live among people. Khayyam measured the sky and doubted everything above it. Hafez became its soul.' },
          { t: 'p', x: 'And Rumi took one man grief at losing one friend and made it the sound of everything that has ever been separated from what it came from.' },
          { t: 'mark', x: 'Six men, four hundred years, one language. No other tongue has a spine like it.' },
        ] },
        { blocks: [
          { t: 'rule' },
          { t: 'p', x: 'This has been a glimpse of Rumi, the scholar from a city the Mongols erased, who was respectable and certain and forty years old when a rude old dervish walked into his life and took it apart.' },
          { t: 'p', x: 'He lost the man. He looked for him in two countries and found him in his own chest instead. And then, for twenty five years, he spoke poems into the air and other people wrote them down, and he signed the best of them with the dead man name, because he did not believe the voice had ever been his.' },
          { t: 'p', x: 'He said we are all reeds, cut from the bed, and that every sound we make is about the water. He would say it about this too.' },
          { t: 'illumin', x: 'Listen to the reed, how it complains. Since they cut me from the reed bed, everyone has wept at my cry.' },
          { t: 'motif', symbol: 'moon', caption: 'مولانا' },
        ] },
      ],
    },
  ],
};

export const AUTHORS: Author[] = [ferdowsi, hafez, saadi, khayyam, rudaki, nizami, rumi];

export function findAuthor(key?: string) {
  return AUTHORS.find((a) => a.key === key);
}

export const LITERATURE_FIGURES = [
  { name: 'Ferdowsi', persian: 'فردوسی', epithet: 'Father of the Persian Language', years: 'c. 940 – 1020', authorKey: 'ferdowsi', status: 'ready' as const },
  { name: 'Rudaki', persian: 'رودکی', epithet: 'The First Great Poet of Persian', years: 'c. 858 – 941', authorKey: 'rudaki', tag: 'THE FIRST POET', status: 'ready' as const },
  { name: 'Omar Khayyam', persian: 'خیام', epithet: 'Poet of the Fleeting Moment', years: '1048 – 1131', authorKey: 'khayyam', tag: 'THE CALENDAR INSIDE', status: 'ready' as const },
  { name: 'Nizami', persian: 'نظامی', epithet: 'Master of the Romance', years: '1141 – 1209', authorKey: 'nizami', tag: 'SEVEN DOMES INSIDE', status: 'ready' as const },
  { name: 'Saadi', persian: 'سعدی', epithet: 'The Voice of Wisdom', years: 'c. 1210 – 1291', authorKey: 'saadi', tag: 'BANI ADAM INSIDE', status: 'ready' as const },
  { name: 'Rumi', persian: 'مولانا', epithet: 'The Poet of the Soul', years: '1207 – 1273', authorKey: 'rumi', tag: 'THE WHIRLING INSIDE', status: 'ready' as const },
  { name: 'Hafez', persian: 'حافظ', epithet: 'The Tongue of the Unseen', years: 'c. 1315 – 1390', authorKey: 'hafez', tag: 'FAL E HAFEZ INSIDE', status: 'ready' as const },
];
