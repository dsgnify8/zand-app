// Culture: the social operating system. The unwritten rules.
// Its own world. Warm taupe ground, each chapter with its own accent.

export const cu = {
  bg: '#3D3730',
  bgLift: '#494139',
  surface: '#4E463C',
  raised: '#584E44',
  text: '#F1E9DD',
  textDim: '#A99C8C',
  hair: '#665C50',
  gold: '#D9A94C',
  saffron: '#E0A63C',
  pomegranate: '#B4434F',
  pistachio: '#8FA86B',
  turquoise: '#4E9AA0',
  rose: '#C4808B',
};

export type CultureTopic = {
  key: string;
  title: string;
  persian: string;
  tag: string;
  blurb: string;
  accent: string;
  glyph: string;
  image?: string;
};

export const CULTURE_TOPICS: CultureTopic[] = [
  { key: 'taarof', title: 'Taarof', titleFa: 'تعارف', persian: 'تعارف', tag: 'THE RULE NOBODY EXPLAINS', tagFa: 'قاعده‌ای که هیچ‌کس توضیحش نمی‌دهد', blurb: 'Offering what you will not give. Refusing what you want. The most confusing thing about Iranians, to everyone including Iranians.', blurbFa: 'پیشنهاد دادنِ چیزی که قرار نیست بدهی. رد کردنِ چیزی که واقعاً می‌خواهی. گیج‌کننده‌ترین چیز دربارهٔ ایرانی‌ها برای همه، حتی خود ایرانی‌ها.', accent: '#E0A63C', glyph: 'swap-horizontal' },
  { key: 'del', title: 'The Heart', titleFa: 'دل', persian: 'دل', tag: 'ONE WORD, A WHOLE LIFE', tagFa: 'یک کلمه، یک زندگی کامل', blurb: 'Persian runs its entire emotional life through a single organ. Miss someone and your heart goes tight.', blurbFa: 'فارسی تمام زندگی احساسی‌اش را از یک عضو بدن عبور می‌دهد. دلت برای کسی تنگ می‌شود، همین.', accent: '#B4434F', glyph: 'heart' },
  { key: 'mehmun', title: 'The Guest', titleFa: 'مهمان', persian: 'مهمان', tag: 'HOSPITALITY AS COMBAT', tagFa: 'مهمان‌نوازی در قامت یک نبرد', blurb: 'The guest is beloved of God, and you will be fed until you suffer, and you are not permitted to leave.', blurbFa: 'مهمان حبیب خداست؛ آن‌قدر به تو غذا می‌دهند تا به زحمت بیفتی، و اجازهٔ رفتن هم نداری.', accent: '#C4808B', glyph: 'home' },
  { key: 'javanmardi', title: 'Javanmardi', titleFa: 'جوانمردی', persian: 'جوانمردی', tag: 'THE HOUSE OF STRENGTH', tagFa: 'خانهٔ زور', blurb: 'A thousand year old code of chivalry, and a pit where men swing clubs while a drummer chants Ferdowsi at them.', blurbFa: 'مرامی هزارساله، و گودی که در آن مردها میل می‌چرخانند و مرشد برایشان شاهنامه می‌خواند.', accent: '#8FA86B', glyph: 'shield' },
  { key: 'sofreh', title: 'The Table', titleFa: 'سفره', persian: 'سفره', tag: 'FOOD, AND WHAT IT MEANS', tagFa: 'غذا، و آنچه معنا می‌دهد', blurb: 'Rice is not a side dish. The crust at the bottom of the pot is fought over. Nobody eats alone if it can be helped.', blurbFa: 'برنج غذای کناری نیست. سر ته دیگ دعوا می‌شود. و تا جایی که بشود، هیچ‌کس تنها غذا نمی‌خورد.', accent: '#4E9AA0', glyph: 'restaurant' },
  { key: 'chai', title: 'Chai', titleFa: 'چای', persian: 'چای', tag: 'THE SHAPE OF AN EVENING', tagFa: 'شکلِ یک عصر', blurb: 'The samovar, the small glass, the sugar cube held in the teeth. Never a drink. Always an occasion.', blurbFa: 'سماور، استکان کمرباریک، و حبه قندی که لای دندان است. هیچ‌وقت فقط یک نوشیدنی نیست. همیشه یک موقعیت است.', accent: '#D9A94C', glyph: 'cafe' },
  { key: 'typical', title: 'Typical Persian', titleFa: 'ایرانیِ اصیل', persian: 'ایرانی', tag: 'YOU KNOW THE ONES', tagFa: 'خودت می‌دانی کدام‌ها را می‌گویم', blurb: 'Persian Standard Time. The gold at birth. The forty minute goodbye at the door. Tap a card and find the truth underneath the joke.', blurbFa: 'ساعت به وقت ایرانی. طلایی که سر تولد می‌دهند. خداحافظیِ چهل‌دقیقه‌ای دم در. روی هر کارت بزن و حقیقتی را که زیر شوخی است پیدا کن.', accent: '#4E9AA0', glyph: 'happy' },
];

export type CuBlock =
  | { t: 'p'; x: string }
  | { t: 'h'; x: string }
  | { t: 'lead'; x: string }
  | { t: 'mark'; x: string }
  | { t: 'aside'; x: string }
  | { t: 'phrase'; fa: string; tr: string; lit: string; means: string }
  | { t: 'taarofsim' }
  | { t: 'delmap' }
  | { t: 'cards' }
  | { t: 'zurkhaneh' }
  | { t: 'rice' }
  | { t: 'steps'; items: { n: string; x: string }[] }
  | { t: 'close'; x: string };

export type CuPage = { key: string; nav: string; title: string; eyebrow?: string; blocks: CuBlock[] };

export const CULTURE_PAGES: Record<string, CuPage[]> = {

  taarof: [
    { key: 't1', nav: 'The Dance', navFa: 'رقص', title: 'The Offer You Must Refuse', titleFa: 'پیشنهادی که باید ردش کنی', eyebrow: 'WHAT TAAROF IS',
      blocks: [
        { t: 'lead', x: 'Everything is offered. Almost nothing is meant. And everyone in the room knows exactly which is which.', fa: 'همه‌چیز تعارف می‌شود. تقریباً هیچ‌کدام واقعاً جدی نیست. و همهٔ کسانی که در جمع هستند دقیقاً می‌دانند کدام‌یک جدی است و کدام‌یک نیست.' },
        { t: 'p', x: 'Taarof is the ritual of not saying the thing. You offer what you would rather keep. You refuse what you badly want. You insist, and are refused, and insist again, and the whole exchange is a piece of theatre both people are performing perfectly while appearing to mean every word.', fa: 'تعارف یعنی رسمِ نگفتنِ آن چیزی که واقعاً می‌خواهی بگویی. چیزی را تعارف می‌کنی که ته دلت می‌خواهی برای خودت نگه داری. چیزی را رد می‌کنی که خودت شدیداً می‌خواهی. اصرار می‌کنی، طرف مقابل رد می‌کند، و تو دوباره اصرار می‌کنی؛ و تمام این رفت‌وبرگشت، نمایشی است که هر دو نفر آن را بی‌نقص بازی می‌کنند، در حالی که هر کدام طوری رفتار می‌کنند انگار تک‌تک کلماتی که می‌گویند کاملاً جدی و از ته دل است.' },
        { t: 'p', x: 'To an outsider it looks like lying. It is closer to the opposite. It is a system for protecting people from ever having to be humiliated by a direct no.', fa: 'برای کسی که از بیرون نگاه می‌کند، ممکن است شبیه دروغ به نظر برسد. اما در واقع، تقریباً برعکس آن است. تعارف راهی است برای اینکه هیچ‌کس مجبور نشود با شنیدن یک «نه» مستقیم، احساس خجالت یا تحقیر کند.' },
        { t: 'taarofsim' },
      ] },
    { key: 't2', nav: 'The Rules', navFa: 'قاعده‌ها', title: 'Three Times', titleFa: 'سه بار', eyebrow: 'HOW IT WORKS',
      blocks: [
        { t: 'p', x: 'The engine is the rule of three. Nothing is real until it has been offered three times, and nothing is refused until it has been refused three times. Accept on the first offer and you have revealed that you were waiting for it. Refuse a third genuine offer and you have insulted the person giving it.', fa: 'اساس تعارف، قانونِ سه بار است. هیچ پیشنهادی جدی تلقی نمی‌شود، مگر اینکه سه بار مطرح شده باشد؛ و هیچ پیشنهادی واقعاً ردشده محسوب نمی‌شود، مگر اینکه سه بار رد شده باشد. اگر همان بار اول قبول کنی، معلوم می‌شود که از ابتدا منتظرش بوده‌ای. اما اگر سومین پیشنهادِ واقعاً جدی را هم رد کنی، به کسی که آن را به تو پیشنهاد کرده توهین کرده‌ای.' },
        { t: 'steps', items: [
          { n: 'The first offer', nFa: 'تعارف اول', x: 'Almost always empty. It is politeness. Take it and you have misread the room.', fa: 'تقریباً همیشه توخالی است؛ فقط نشانهٔ ادب است. اگر همان بار اول قبولش کنی، یعنی فضای جمع را درست درک نکرده‌ای.' },
          { n: 'The second offer', nFa: 'تعارف دوم', x: 'Getting warmer. Still refuse. This is where the other person shows they meant it.', fa: 'دارد جدی‌تر می‌شود. اما هنوز باید ردش کنی. اینجاست که طرف مقابل نشان می‌دهد پیشنهادش واقعاً جدی بوده است.' },
          { n: 'The third offer', nFa: 'تعارف سوم', x: 'Now it is real. Now you may accept, and everyone is satisfied, and nobody was ever exposed.', fa: 'حالا دیگر واقعی است. حالا می‌توانی قبولش کنی؛ همه راضی‌اند و هیچ‌کس هم در موقعیتی قرار نگرفته که احساس شرمندگی کند.' },
        ] },
        { t: 'mark', x: 'The rule of three exists so that nobody ever has to hear a real no.', fa: 'قانون سه بار وجود دارد تا هیچ‌کس مجبور نشود یک «نه» واقعی و مستقیم بشنود.' },
        { t: 'h', x: 'The shopkeeper', fa: 'مغازه‌دار' },
        { t: 'p', x: 'The purest form. You buy something, you ask the price, and the shopkeeper waves his hand and tells you it is worthless, take it, be my guest. He does not mean it. You do not for one second think he means it. You insist on paying. He refuses. You insist again. He names a price.', fa: 'شاید خالص‌ترین شکل تعارف را بتوان در مغازه دید. چیزی می‌خری، قیمتش را می‌پرسی، و مغازه‌دار دستش را تکان می‌دهد و می‌گوید: «قابلی نداره، بردار، مهمان ما باش.» خودش می‌داند که واقعاً منظورش این نیست و تو هم حتی برای یک لحظه فکر نمی‌کنی که جدی می‌گوید. اصرار می‌کنی که پولش را بدهی. او قبول نمی‌کند. دوباره اصرار می‌کنی. و در نهایت، قیمت را می‌گوید.' },
        { t: 'phrase', fa: 'قابل نداره', tr: 'ghabel nadare', lit: 'it has no worth', means: 'The shopkeeper is not giving you the rug. He is saying that money is beneath the dignity of this moment between us. Then you pay him.' },
      ] },
    { key: 't3', nav: 'The Cost', navFa: 'هزینه', title: 'What It Is For', titleFa: 'تعارف برای چیست؟', eyebrow: 'AND WHAT IT COSTS',
      blocks: [
        { t: 'p', x: 'The argument for taarof is that it makes a hierarchy survivable. In a society where status is real and refusing your superior openly is dangerous, taarof gives everyone a way to decline without ever having declined, to negotiate without ever appearing to want anything.', fa: 'استدلالی که به سود تعارف می‌آورند این است که زندگی کردن در یک سلسله‌مراتب را قابل تحمل می‌کند. در جامعه‌ای که جایگاه آدم‌ها واقعاً اهمیت دارد و رد کردنِ آشکارِ حرف کسی که بالاتر از توست می‌تواند خطرناک باشد، تعارف به همه راهی می‌دهد تا نه بگویند بی‌آنکه اصلاً نه گفته باشند، و چانه بزنند بی‌آنکه به نظر برسد چیزی می‌خواهند.' },
        { t: 'p', x: 'It is also, genuinely, a form of care. The offer is a way of saying you matter more to me than the thing. Even when it is empty, the shape of it is generous, and the shape is the message.', fa: 'تعارف در عین حال، واقعاً نوعی محبت و توجه است. آن پیشنهاد راهی است برای گفتن اینکه تو برای من از آن چیز مهم‌تری. حتی وقتی پیشنهادی واقعی در کار نیست، خودِ این رفتار سخاوتمندانه است و همین شکلِ رفتار، پیام را می‌رساند.' },
        { t: 'h', x: 'And it costs', fa: 'و بی‌هزینه هم نیست' },
        { t: 'p', x: 'It is exhausting. Two Iranians can spend eleven minutes at a doorway arguing about who goes first. Restaurant bills are physically fought over, and there are stories of people slipping the waiter money in advance to avoid the fight and being resented for it anyway.', fa: 'خسته‌کننده است. دو ایرانی می‌توانند یازده دقیقه دم در بایستند و سر اینکه کدامشان اول وارد شود بحث کنند. سر صورت‌حساب رستوران واقعاً و به‌طور فیزیکی دعوا می‌شود، و روایت‌هایی هست از کسانی که از قبل پول را یواشکی به گارسون داده‌اند تا از این کشمکش فرار کنند، و باز هم طرف مقابل از دستشان دلخور شده است.' },
        { t: 'p', x: 'And it is a real problem in the diaspora. A child raised abroad hears the offer, accepts it, and watches the adults freeze. Nobody explained it to them, because nobody explains it. You are supposed to absorb it, and if you did not grow up inside it you spend your life half a beat behind.', fa: 'و برای ایرانی‌های خارج از کشور، این یک مشکل واقعی است. بچه‌ای که در خارج بزرگ شده تعارف را می‌شنود، قبول می‌کند، و بعد می‌بیند که بزرگ‌ترها خشکشان زده. هیچ‌کس برایش توضیح نداده بود، چون اصلاً کسی این را توضیح نمی‌دهد. قرار است خودت جذبش کنی؛ و اگر داخل آن بزرگ نشده باشی، تمام عمرت نیم‌قدم عقب‌تر از بقیه‌ای.' },
        { t: 'aside', x: 'This is the thing most Iranians abroad say they get wrong with their own relatives.', fa: 'بیشتر ایرانی‌های خارج از کشور می‌گویند همین چیزی است که در برخورد با فامیل خودشان درست متوجهش نمی‌شوند.' },
        { t: 'close', x: 'It is not dishonesty. It is a language in which the words are not the message and everybody fluent knows it. The only people it fools are the ones taking it literally.', fa: 'این دورویی یا بی‌صداقتی نیست. تعارف زبانی است که در آن خودِ کلمات پیام اصلی نیستند و هرکس این زبان را بلد باشد این را می‌داند. تنها کسانی را به اشتباه می‌اندازد که حرف‌ها را تحت‌اللفظی می‌گیرند.' },
      ] },
  ],

  del: [
    { key: 'd1', nav: 'The Word', navFa: 'واژه', title: 'Everything Is in the Heart', titleFa: 'همه‌چیز در دل است', eyebrow: 'دل',
      blocks: [
        { t: 'lead', x: 'Persian did not build a vocabulary for feeling. It built one word, and then built everything out of it.', fa: 'فارسی برای احساس، یک دایرهٔ واژگان نساخت. یک کلمه ساخت، و بعد هر چیز دیگری را از دل همان بیرون کشید.' },
        { t: 'p', x: 'Del means heart. Not the romantic heart of English, which mostly handles love and courage. The Persian del is the seat of the entire inner life: longing, courage, worry, kindness, grief, nerve, and the thing that goes tight when someone is far away.', fa: 'دل، یعنی همان دل. اما نه آن قلبِ عاشقانه‌ای که در انگلیسی هست و بیشتر کارش عشق است و شجاعت. دلِ فارسی جایگاه تمام زندگی درونی آدم است: دلتنگی، جرئت، نگرانی، مهربانی، اندوه، جربزه، و همان چیزی که وقتی کسی دور است تنگ می‌شود.' },
        { t: 'p', x: 'And it compounds. Tap it.', fa: 'و ترکیب می‌سازد؛ آن هم چه ترکیب‌هایی. رویش بزن.' },
        { t: 'delmap' },
      ] },
    { key: 'd2', nav: 'The Tightness', navFa: 'دلتنگی', title: 'When the Heart Goes Tight', titleFa: 'وقتی دل تنگ می‌شود', eyebrow: 'THE ONE THEY MISS',
      blocks: [
        { t: 'phrase', fa: 'دلم برات تنگ شده', tr: 'delam barat tang shode', lit: 'my heart has gone tight for you', means: 'I miss you. But the English is a flat report of an absence. The Persian is a physical event happening in your chest right now, and it is happening because of a specific person, and you are telling them.' },
        { t: 'p', x: 'Ask any Iranian abroad which phrase does not survive translation and this is the one they name. I miss you is information. Delam barat tang shode is a symptom.', fa: 'از هر ایرانی خارج از کشور بپرسی کدام عبارت است که از ترجمه جان به در نمی‌برد، همین را می‌گوید. «I miss you» یک خبر است، یک اطلاع. «دلم برات تنگ شده» یک حال است؛ چیزی که همین حالا در سینه‌ات دارد اتفاق می‌افتد.' },
        { t: 'h', x: 'And the other one', fa: 'و آن یکی دیگر' },
        { t: 'phrase', fa: 'دل به دل راه داره', tr: 'del be del rah dare', lit: 'heart has a road to heart', means: 'Said when two people feel the same thing without saying it, or when you were thinking of someone the moment they called. Not mysticism. A quiet claim that hearts are connected by roads and that traffic moves on them.' },
        { t: 'mark', x: 'A language that gave the heart its own road system.', fa: 'زبانی که برای دل، یک شبکهٔ راه مستقل کشیده است.' },
        { t: 'h', x: 'What they tell their sons', fa: 'آنچه به پسرهایشان می‌گویند' },
        { t: 'p', x: 'And there is one line that Persian mothers and fathers say to their boys, and it is not advice about behaviour. It is a warning about the value of a thing.', fa: 'و یک جمله هست که پدر و مادرهای ایرانی به پسرهایشان می‌گویند، و این نصیحتی دربارهٔ رفتار نیست. هشداری است دربارهٔ ارزشِ یک چیز.' },
        { t: 'phrase', fa: 'دل دختر ایرانی رو هیچ وقت نشکن', tr: 'dele dokhtare irani ro hich vaght nashkan', lit: 'never break the heart of an Iranian girl', means: 'It is said as though describing an object of great worth that you have been trusted with. Not do not hurt her, which would be about you. This is about what she is carrying, and the assumption underneath it is that a Persian girl heart is precious enough that breaking it is not a mistake, it is damage.' },
      ] },
    { key: 'd3', nav: 'Why', navFa: 'چرا', title: 'Why One Word', titleFa: 'چرا فقط یک کلمه', eyebrow: 'WHAT IT MEANS',
      blocks: [
        { t: 'p', x: 'Because Persian does not put much distance between the body and the feeling. English says I am sad, which is a fact about a state. Persian says my heart is tight, which is a fact about an organ, and it is more accurate, because that is where you feel it.', fa: 'چون فارسی فاصلهٔ چندانی میان تن و احساس نمی‌گذارد. انگلیسی می‌گوید «I am sad»، که خبری است دربارهٔ یک حالت. فارسی می‌گوید «دلم گرفته»، که خبری است دربارهٔ یک عضو از بدن؛ و دقیق‌تر هم هست، چون آدم واقعاً همان‌جا حسش می‌کند.' },
        { t: 'p', x: 'It also means that in Persian you cannot really talk about emotion without talking about the heart, which means the poets and the grandmothers and the taxi drivers are all using the same instrument. Hafez did not invent a special vocabulary. He used del, like everyone else, better.', fa: 'این یعنی در فارسی نمی‌شود واقعاً از احساس حرف زد بی‌آنکه از دل حرف بزنی؛ و یعنی شاعرها و مادربزرگ‌ها و رانندهٔ تاکسی، همه دارند از یک ساز استفاده می‌کنند. حافظ واژگان ویژه‌ای اختراع نکرد. از همان «دل» استفاده کرد، مثل بقیه؛ فقط بهتر.' },
        { t: 'close', x: 'One word, doing the work that other languages spread across fifty. Everything a Persian feels, they feel in the same place, and they say so.', fa: 'یک کلمه، که کارِ پنجاه کلمه را در زبان‌های دیگر انجام می‌دهد. هر چه یک ایرانی حس می‌کند، در همان یک جا حسش می‌کند؛ و همین را هم می‌گوید.' },
      ] },
  ],

  mehmun: [
    { key: 'm1', nav: 'The Guest', navFa: 'مهمان', title: 'Beloved of God', titleFa: 'حبیب خدا', eyebrow: 'مهمان',
      blocks: [
        { t: 'lead', x: 'The guest is beloved of God. This is not a saying. It is an instruction, and it will be carried out.', fa: 'مهمان حبیب خداست. این یک ضرب‌المثل نیست. یک دستور است، و اجرا هم خواهد شد.' },
        { t: 'p', x: 'Persian hospitality is not gentle. It is a campaign. You will be sat in the best seat, which you will try to refuse and fail. You will be given tea within ninety seconds of arriving. You will be fed past the point of comfort and then fed again, and every refusal will be treated as taarof and overruled.', fa: 'مهمان‌نوازی ایرانی ملایم نیست. یک عملیات تمام‌عیار است. تو را در بهترین جا می‌نشانند، و تلاش می‌کنی قبول نکنی و موفق نمی‌شوی. نود ثانیه از رسیدنت نگذشته، چای جلویت است. آن‌قدر به تو غذا می‌دهند که از مرز راحتی رد شوی، و بعد باز هم می‌دهند؛ و هر بار که نه بگویی، حملش می‌کنند بر تعارف و نادیده‌اش می‌گیرند.' },
        { t: 'phrase', fa: 'مهمان روزی خودش را با خود می‌آورد', tr: 'mehman ruzi ye khodesh ra ba khod miavarad', lit: 'the guest brings his own sustenance with him', means: 'The oldest answer to the oldest worry. You are never a cost. Whatever is eaten in your honour was never the host to begin with, it arrived with you, so there is nothing to weigh and nothing to be careful about. It is a sentence designed to make it impossible for a guest to feel expensive.' },
      ] },
    { key: 'm2', nav: 'The Siege', navFa: 'محاصره', title: 'You Are Not Leaving', titleFa: 'اجازهٔ رفتن نداری', eyebrow: 'HOW IT GOES',
      blocks: [
        { t: 'steps', items: [
          { n: 'You arrive', nFa: 'می‌رسی', x: 'Shoes off at the door, always, without discussion. Tea appears before you have sat down. Fruit is cut, whether or not anyone wants fruit.', fa: 'کفش‌ها دم در در می‌آید، همیشه، بی‌هیچ بحثی. هنوز ننشسته‌ای که چای می‌رسد. میوه پوست کنده می‌شود، حالا هر کسی میوه بخواهد یا نخواهد.' },
          { n: 'You are fed', x: 'More than anyone could eat. If you clear your plate it means you were not given enough, and it is refilled. If you leave food, you are asked what is wrong with it. There is no correct move.', fa: 'بیشتر از آن چیزی که هر آدمی بتواند بخورد. اگر بشقابت را تمام کنی، یعنی به تو کم داده‌اند و دوباره پرش می‌کنند. اگر غذا را نیمه بگذاری، می‌پرسند مگر چه ایرادی داشت. هیچ حرکت درستی در کار نیست.' },
          { n: 'You say you are full', x: 'This is heard as taarof and dismissed. You will be served again. Say it three times and possibly, possibly, you will be believed.', fa: 'این را حمل بر تعارف می‌کنند و نادیده می‌گیرند. باز هم برایت می‌کشند. سه بار که بگویی، شاید، فقط شاید، باورت کنند.' },
          { n: 'You try to leave', x: 'This takes forty minutes. You stand. You are told to sit. You reach the hallway. A conversation begins in the hallway. You reach the door. A new conversation begins at the door.', fa: 'این مرحله چهل دقیقه طول می‌کشد. بلند می‌شوی. می‌گویند بنشین. به راهرو می‌رسی. در راهرو یک گفت‌وگوی تازه شروع می‌شود. به در می‌رسی. دم در یک گفت‌وگوی تازهٔ دیگر شروع می‌شود.' },
          { n: 'You reach the car', x: 'Someone comes out with food for you to take home. This is not optional either.', fa: 'یکی با ظرف غذا می‌آید بیرون که با خودت ببری. این یکی هم اختیاری نیست.' },
        ] },
        { t: 'mark', x: 'The Persian goodbye is not the end of the visit. It is a distinct event, and it is longer than most meetings.', fa: 'خداحافظی ایرانی، پایان مهمانی نیست. خودش یک برنامهٔ جداگانه است، و از خیلی از جلسه‌ها هم طولانی‌تر.' },
      ] },
    { key: 'm3', nav: 'Why', navFa: 'چرا', title: 'What Is Actually Happening', titleFa: 'در واقع چه خبر است', eyebrow: 'UNDERNEATH IT',
      blocks: [
        { t: 'p', x: 'Some of it is old. Iran is a country of deserts and long roads, and for most of its history a traveller who was turned away could die. Hospitality was not a nicety, it was infrastructure, and the caravanserais on every route were built on exactly this principle.', fa: 'بخشی از این ماجرا خیلی قدیمی است. ایران سرزمین کویر است و جاده‌های دراز، و در بیشتر تاریخش مسافری که از خانه‌ای رانده می‌شد، می‌توانست جانش را از دست بدهد. مهمان‌نوازی یک خوش‌رفتاری ساده نبود؛ زیرساخت بود، و کاروانسراهایی که سر هر راهی ساخته شده بودند دقیقاً بر همین اصل بنا شده بودند.' },
        { t: 'p', x: 'And some of it is simpler. Feeding people is how affection is expressed in a culture where saying it outright is difficult. The plate that keeps being refilled is a sentence that nobody in the room is able to say.', fa: 'و بخشی از آن ساده‌تر است. در فرهنگی که گفتنِ مستقیمِ محبت سخت است، غذا دادن همان راهِ ابراز محبت است. آن بشقابی که مدام دوباره پر می‌شود، جمله‌ای است که هیچ‌کس در آن اتاق نمی‌تواند به زبان بیاورد.' },
        { t: 'aside', x: 'This is why Persian mothers send you home with food. It is not about the food.', fa: 'برای همین است که مادرهای ایرانی موقع رفتن ظرف غذا دستت می‌دهند. ماجرا اصلاً سرِ غذا نیست.' },
        { t: 'p', x: 'And look at what all of it is actually doing. Eat more. Take this. Sit down. Stay a little longer. It is called friendliness, and it is not friendliness. It is a refusal to let anyone be alone in our presence, carried out by force if necessary.', fa: 'و ببین همهٔ این کارها در واقع دارند چه می‌کنند. بیشتر بخور. این را بردار. بنشین. کمی دیگر بمان. اسمش را می‌گذارند خوش‌برخوردی، و خوش‌برخوردی نیست. این است که ما حاضر نیستیم بگذاریم کسی در حضور ما تنها باشد؛ و اگر لازم باشد، به زور هم که شده.' },
        { t: 'mark', x: 'It is not that Iranians are welcoming. It is that we will not permit you to be lonely in front of us.', fa: 'قضیه این نیست که ایرانی‌ها مهمان‌نوازند. قضیه این است که ما اجازه نمی‌دهیم تو جلوی چشم ما تنها باشی.' },
        { t: 'close', x: 'You will be fed until you suffer, kept at the door for forty minutes, and sent home with a bag you did not ask for. All of it is one message, delivered in the only vocabulary available.', fa: 'آن‌قدر به تو غذا می‌دهند تا به زحمت بیفتی، چهل دقیقه دم در نگهت می‌دارند، و با کیسه‌ای که اصلاً نخواسته بودی راهی خانه‌ات می‌کنند. تمام اینها یک پیام است، که با تنها واژگانِ در دسترس گفته می‌شود.' },
      ] },
  ],

  javanmardi: [
    { key: 'j1', nav: 'The Code', navFa: 'مرام', title: 'The Young Man Way', titleFa: 'راه و رسم جوانمردی', eyebrow: 'جوانمردی',
      blocks: [
        { t: 'lead', x: 'Persian chivalry. A thousand years old, still the highest compliment you can pay a man in Iran, and almost unknown outside it.', fa: 'مرام و مردانگیِ ایرانی. هزار سال قدمت دارد، هنوز بالاترین تعریفی است که می‌شود در ایران از یک مرد کرد، و بیرون از ایران تقریباً هیچ‌کس نمی‌شناسدش.' },
        { t: 'p', x: 'Javanmardi means, literally, young manliness, and it means almost the opposite of what that sounds like. It is not swagger. It is the opposite of swagger. Its core is strength that refuses to be used on anyone weaker, generosity that does not announce itself, and keeping your word when it costs you.', fa: 'جوانمردی، تحت‌اللفظی یعنی جوان‌مرد بودن، و معنایش تقریباً برعکس آن چیزی است که از ظاهرش برمی‌آید. قلدری نیست. دقیقاً نقطهٔ مقابل قلدری است. هستهٔ اصلی‌اش این است: زوری که حاضر نیست روی کسی که ضعیف‌تر است استفاده شود، بخششی که خودش را جار نمی‌زند، و سر قول ماندن، آن هم وقتی که برایت گران تمام می‌شود.' },
        { t: 'p', x: 'The javanmard does not humiliate an opponent he has beaten. He does not take from someone who cannot refuse. He does not mention what he gave. Iranians will describe a man as javanmard the way the English might say a man is decent, except with far more weight in it.', fa: 'جوانمرد، حریفی را که شکست داده خوار نمی‌کند. از کسی که نمی‌تواند نه بگوید چیزی نمی‌گیرد. و از آنچه بخشیده حرفی نمی‌زند. ایرانی‌ها وقتی می‌گویند فلانی جوانمرد است، تقریباً همان کاری را می‌کنند که انگلیسی‌زبان‌ها با گفتنِ «آدم درست‌وحسابی» می‌کنند؛ فقط با وزنی به‌مراتب سنگین‌تر.' },
        { t: 'phrase', fa: 'مرام', tr: 'maram', lit: 'the way one goes', means: 'A related word, and the one you will actually hear. He has maram means he behaves properly toward people when nothing forces him to, and everyone can tell.' },
      ] },
    { key: 'j2', nav: 'The Pit', navFa: 'گود', title: 'The House of Strength', titleFa: 'خانهٔ زور', eyebrow: 'ZURKHANEH',
      blocks: [
        { t: 'p', x: 'And then there is the building. The zurkhaneh, the house of strength, is one of the strangest and best institutions Iran has produced, and it is roughly a thousand years old.', fa: 'و بعد، خودِ آن ساختمان. زورخانه، یعنی خانهٔ زور، یکی از غریب‌ترین و بهترین نهادهایی است که ایران ساخته، و حدود هزار سال قدمت دارد.' },
        { t: 'p', x: 'It is a low domed room with a pit in the middle, sunk below the floor, so that everyone who enters must step down. Men train in that pit. They swing enormous wooden clubs, they lift a wooden shield, they turn in place, they wrestle.', fa: 'اتاقی است گنبدی و کوتاه، با گودی در وسط که پایین‌تر از کف زمین است، طوری که هر کس وارد می‌شود باید پایین برود. مردها در همان گود تمرین می‌کنند. میل‌های چوبی سنگین می‌چرخانند، سنگ برمی‌دارند، در جای خود می‌چرخند، و کشتی می‌گیرند.' },
        { t: 'zurkhaneh' },
        { t: 'h', x: 'The drum and the poem', fa: 'ضرب و شعر' },
        { t: 'p', x: 'And here is the part nobody expects. In a raised seat at the edge sits the morshed, the master, with a goblet drum and a bell. He drums the rhythm the men move to, and while he drums, he chants. He chants Ferdowsi. He chants Hafez and Rumi and Saadi.', fa: 'و حالا آن بخشی که هیچ‌کس انتظارش را ندارد. در سکویی بلند کنار گود، مرشد نشسته است، با یک ضرب و یک زنگ. ضربی می‌زند که مردها با ریتمش حرکت می‌کنند، و همان‌طور که می‌زند، می‌خواند. شاهنامه می‌خواند. حافظ و مولانا و سعدی می‌خواند.' },
        { t: 'mark', x: 'It is a gym where the poetry is played over the sound system, live, by a man with a drum, and the poetry is eight hundred years old.', fa: 'باشگاهی است که در آن شعر از بلندگو پخش می‌شود؛ زنده، به دست مردی با یک ضرب، و آن شعر هشتصد سال قدمت دارد.' },
        { t: 'p', x: 'So the men in the pit are not only training. They are being told, in rhythm, in verse, what a man is for. The physical culture and the ethical culture and the literature are the same activity, in the same room, at the same time. Nothing else in the world quite works like this.', fa: 'پس مردهایی که در گودند فقط تمرین نمی‌کنند. دارند به آنها، با ریتم و با شعر، گفته می‌شود که مرد بودن به چه کار می‌آید. پرورش تن و پرورش اخلاق و ادبیات، همه یک کارند؛ در یک اتاق، در یک زمان. هیچ چیز دیگری در دنیا دقیقاً این‌طور کار نمی‌کند.' },
        { t: 'aside', x: 'The pit is sunk below floor level for a reason. You step down to enter. Nobody stands above anybody.', fa: 'اینکه گود پایین‌تر از کف زمین است بی‌دلیل نیست. برای وارد شدن باید پایین بروی. هیچ‌کس بالای سر کسی نمی‌ایستد.' },
      ] },
    { key: 'j3', nav: 'Takhti', navFa: 'تختی', title: 'The Man They Loved', titleFa: 'مردی که دوستش داشتند', eyebrow: 'THE MODERN SAINT',
      blocks: [
        { t: 'p', x: 'If you want to know what Iranians mean by javanmard, they will not explain. They will tell you about Takhti.', fa: 'اگر بخواهی بدانی ایرانی‌ها از جوانمرد چه منظوری دارند، برایت توضیح نمی‌دهند. از تختی برایت می‌گویند.' },
        { t: 'p', x: 'Gholamreza Takhti was a wrestler, an Olympic champion, and the most beloved athlete in Iranian history. But that is not why he is beloved. The stories are all about the same thing.', fa: 'غلامرضا تختی کشتی‌گیر بود، قهرمان المپیک، و محبوب‌ترین ورزشکار تاریخ ایران. اما محبوبیتش به این دلیل نیست. حکایت‌هایی که از او مانده، همه دربارهٔ یک چیزند.' },
        { t: 'story', title: 'The Injured Leg', titleFa: 'آن پای آسیب‌دیده', x: 'Wrestling a Russian opponent who had an injured right leg, Takhti did not touch it once. He wrestled the man honestly, on his strength, and won without exploiting the injury. The opponent mother is said to have kissed him afterward.', fa: 'در کشتی با حریفی روس که پای راستش آسیب دیده بود، تختی حتی یک بار هم به آن پا دست نزد. صادقانه و با تکیه بر توان خودش کشتی گرفت و بی‌آنکه از آن آسیب سوءاستفاده کند برد. می‌گویند مادرِ آن حریف بعد از مسابقه او را بوسید.', moral: 'He could have won faster. He would rather have won properly.' },
        { t: 'p', x: 'And when an earthquake destroyed a town, Takhti went into the streets of Tehran with a collection tin himself, in person, and people gave him everything they had because it was him. He died in 1968, and the circumstances are still argued about, and his funeral filled the city.', fa: 'و وقتی زلزله شهری را با خاک یکسان کرد، تختی خودش، شخصاً، با یک صندوق کمک به خیابان‌های تهران رفت؛ و مردم هر چه داشتند به او دادند، فقط چون او بود. در سال ۱۳۴۶ درگذشت، و هنوز بر سر چگونگی مرگش بحث است، و تشییع جنازه‌اش شهر را پر کرد.' },
        { t: 'h', x: 'And it is still in the room', fa: 'و هنوز هم هست' },
        { t: 'p', x: 'This is not history. Ask around any Iranian family and you will hear the same thing said with total confidence: give it to a Persian man and it will get done. Whatever it is. The car, the paperwork, the impossible favour, the thing that officially cannot be arranged.', fa: 'این تاریخ نیست. در هر خانوادهٔ ایرانی که بگردی، همین یک جمله را با اطمینان کامل می‌شنوی: بسپارش به یک مرد ایرانی، انجام می‌شود. حالا هر چه که باشد. ماشین، کارهای اداری، آن لطفِ ناممکن، و همان چیزی که رسماً هیچ راهی برایش نیست.' },
        { t: 'p', x: 'And the pride in it is real. To be the one who was relied on and delivered is, quietly, the whole thing a Persian man is playing for. It is javanmardi with the poetry taken off: not being asked twice, not making a fuss, and not letting the person who trusted you down.', fa: 'و غروری که در این کار هست واقعی است. اینکه تو همان کسی باشی که روی او حساب کردند و از پسش برآمد، بی‌سروصدا، تمام آن چیزی است که یک مرد ایرانی برایش بازی می‌کند. این همان جوانمردی است که شعر را از رویش برداشته باشی: اینکه لازم نباشد دو بار از تو بخواهند، اینکه شلوغش نکنی، و اینکه کسی را که به تو اعتماد کرده زمین نگذاری.' },
        { t: 'mark', x: 'You do not have to ask a second time. That is the entire compliment, and it is the highest one available.', fa: 'لازم نیست دو بار بخواهی. تمام آن تعریف همین است، و بالاترین تعریفی است که وجود دارد.' },
        { t: 'close', x: 'A country that has produced conquerors and kings and poets chose, as the man it loves most, a wrestler who would not touch an injured leg.', fa: 'کشوری که فاتح و شاه و شاعر تحویل جهان داده، محبوب‌ترین مردش را کسی انتخاب کرد که کشتی‌گیری بود و حاضر نشد به یک پای آسیب‌دیده دست بزند.' },
      ] },
  ],

  sofreh: [
    { key: 's1', nav: 'The Spread', navFa: 'سفره', title: 'Everything, All at Once', titleFa: 'همه‌چیز، یکجا', eyebrow: 'سفره',
      blocks: [
        { t: 'lead', x: 'A Persian table is not laid with a meal. It is laid with everything you could possibly need, and then more, in case you need that too.', fa: 'سفرهٔ ایرانی را با یک وعده غذا نمی‌چینند. با هر چیزی می‌چینند که ممکن است لازمت شود، و بعد بیشتر از آن، محض احتیاط که شاید آن را هم بخواهی.' },
        { t: 'p', x: 'The sofreh is the spread. And the rule of it is abundance: the rice, the stew, the kabab, the bread, the yoghurt, the pickles, the raw herbs, the salad, the butter, the extra plate of rice nobody asked for. It is all there before you sit, and it stays there until you leave.', fa: 'سفره یعنی همان چیدمانِ کامل. و قاعده‌اش فراوانی است: برنج، خورش، کباب، نان، ماست، ترشی، سبزی خوردن، سالاد، کره، و آن بشقاب اضافهٔ برنج که هیچ‌کس نخواسته بود. همه‌اش پیش از آنکه بنشینی سر جایش است، و تا وقتی که بروی هم همان‌جا می‌ماند.' },
        { t: 'p', x: 'Nothing arrives in courses. Nothing is portioned out for you. Everything is in the middle, within reach, and you take what you want and go back for more, and the bowls are refilled while you are still eating out of them.', fa: 'هیچ‌چیز مرحله به مرحله نمی‌آید. هیچ‌چیز هم برایت جیره‌بندی نمی‌شود. همه‌چیز وسط سفره است، در دسترس، و هر چه بخواهی برمی‌داری و باز هم برمی‌گردی سراغش؛ و ظرف‌ها را در حالی پر می‌کنند که هنوز داری از همان‌ها می‌خوری.' },
        { t: 'mark', x: 'A guest should never have to ask for anything. That is the whole design of the table.', fa: 'مهمان نباید هیچ‌وقت مجبور شود چیزی بخواهد. تمام طراحی این سفره بر همین اصل است.' },
        { t: 'p', x: 'That is why it looks like too much. It is supposed to. A table with exactly enough on it is a table that was calculated, and calculating what a guest needs is the one thing a host must never be caught doing.', fa: 'برای همین است که به نظر زیادی می‌آید. قرار هم هست که زیادی به نظر بیاید. سفره‌ای که رویش دقیقاً به اندازه باشد، یعنی حساب‌وکتاب شده؛ و حساب کردنِ اینکه مهمان چقدر لازم دارد، تنها کاری است که میزبان نباید هرگز موقع انجامش مچش گرفته شود.' },
      ] },
    { key: 's2', nav: 'Rice', navFa: 'برنج', title: 'Rice Is Not a Side Dish', titleFa: 'برنج غذای کناری نیست', eyebrow: 'THE CENTRE',
      blocks: [
        { t: 'p', x: 'Understand this and you understand the kitchen. In Iran, rice is not something served alongside the meal. Rice is the meal. Everything else is an accompaniment to it, including the meat.', fa: 'این یکی را که بفهمی، کل آشپزخانه را فهمیده‌ای. در ایران، برنج چیزی نیست که کنار غذا بیاید. برنج، خودِ غذاست. هر چیز دیگری همراهِ آن است، حتی گوشت.' },
        { t: 'p', x: 'And it is not boiled. Persian rice is a two stage operation: parboiled, drained, then steamed slowly under a cloth wrapped lid until every grain is separate, long, and standing on its own. A cook is judged on whether the grains stick. It takes real skill and everyone knows who has it.', fa: 'و آب‌پز هم نمی‌شود. برنج ایرانی دو مرحله دارد: اول نیم‌پز و آبکش می‌شود، بعد زیر درِ دم‌کنی‌پیچیده آرام‌آرام دم می‌کشد تا هر دانه‌اش جدا باشد و کشیده و سرِ پا. آشپز را از روی همین قضاوت می‌کنند که دانه‌ها به هم چسبیده‌اند یا نه. مهارت واقعی می‌خواهد، و همه هم می‌دانند دستِ چه کسی خوب است.' },
        { t: 'rice' },
        { t: 'h', x: 'And the crust', fa: 'و آن پوستهٔ ته دیگ' },
        { t: 'p', x: 'At the bottom of the pot, where the rice meets the oil, a golden crust forms. Tahdig, the bottom of the pot. It is crunchy, it is the best thing on the table, and there is never enough of it.', fa: 'ته قابلمه، همان‌جا که برنج به روغن می‌رسد، پوسته‌ای طلایی می‌بندد. ته دیگ. برشته است، بهترین چیز روی سفره است، و هیچ‌وقت هم به اندازهٔ کافی نیست.' },
        { t: 'p', x: 'It is fought over. Not metaphorically. Guests are given it first, which is obligatory, and then the family fights over what is left. Iranians raised abroad will tell you that tahdig is the single food they would choose as their last meal, over anything else on earth.', fa: 'سرش دعوا می‌شود. نه به‌طور استعاری. اول به مهمان می‌دهند، که اجباری است، و بعد خانواده بر سر باقی‌ماندهٔ آن به جان هم می‌افتد. ایرانی‌هایی که در خارج بزرگ شده‌اند به تو می‌گویند اگر قرار باشد آخرین غذای عمرشان را انتخاب کنند، ته دیگ را انتخاب می‌کنند؛ به هر چیز دیگری روی این کرهٔ خاکی ترجیحش می‌دهند.' },
        { t: 'mark', x: 'The greatest thing in Persian cooking is the accident at the bottom of the pot.', fa: 'بهترین چیز آشپزی ایرانی، همان اتفاقی است که ته قابلمه می‌افتد.' },
      ] },
    { key: 's3', nav: 'The Dishes', navFa: 'غذاها', title: 'What Is On It', titleFa: 'روی سفره چه هست', eyebrow: 'THE FOOD',
      blocks: [
        { t: 'p', x: 'Touch a dish to see it.', fa: 'روی هر غذایی بزن تا ببینی‌اش.' },
        { t: 'dishes' },
      ] },
    { key: 's4', nav: 'The Flavour', navFa: 'طعم', title: 'Sour, Slow, and Never Hot', titleFa: 'ترش، آرام، و هیچ‌وقت تند', eyebrow: 'HOW IT TASTES',
      blocks: [
        { t: 'p', x: 'Persian cooking is built on sourness, which is unusual, and on things most kitchens never touch. Dried limes, sour cherries, pomegranate molasses, barberries, unripe grapes, and above all saffron, which is measured in fear because of what it costs.', fa: 'آشپزی ایرانی بر پایهٔ ترشی بنا شده، که چیز غیرمعمولی است، و بر پایهٔ چیزهایی که بیشتر آشپزخانه‌های دنیا اصلاً سراغشان نمی‌روند: لیمو عمانی، آلبالو، رب انار، زرشک، غوره، و بالاتر از همه زعفران، که آدم با ترس و لرز اندازه‌اش می‌گیرد، چون می‌داند چقدر می‌ارزد.' },
        { t: 'p', x: 'It is almost never hot. Iranians do not do chilli. The complexity comes from time and from sour, not from heat, and a stew that has not cooked for four hours is not finished. Ask an Iranian how long ghormeh sabzi takes and the honest answer is most of a day.', fa: 'تقریباً هیچ‌وقت تند نیست. ایرانی‌ها اهل فلفل تند نیستند. آن پیچیدگی از زمان می‌آید و از ترشی، نه از تندی؛ و خورشی که چهار ساعت نپخته باشد، هنوز تمام نشده. از یک ایرانی بپرس قرمه‌سبزی چقدر طول می‌کشد، و پاسخ صادقانه‌اش این است: بیشترِ یک روز.' },
        { t: 'mark', x: 'No heat, no rush, and no shortcuts. Persian food is slow on purpose.', fa: 'نه تندی، نه عجله، و نه هیچ میان‌بری. غذای ایرانی عمداً کند است.' },
        { t: 'p', x: 'And there is one more thing on every table that is not a dish at all. Sabzi khordan, a plate of raw herbs: mint, tarragon, basil, radish, spring onion, eaten by the handful with bread and white cheese and walnuts, all the way through the meal. It is not a garnish. Nobody in Iran has ever thought of it as a garnish.', fa: 'و یک چیز دیگر هم سر هر سفره‌ای هست که اصلاً غذا نیست: سبزی خوردن. یک بشقاب سبزی تازه؛ نعنا، ترخون، ریحان، تربچه، پیازچه، که مشت‌مشت با نان و پنیر و گردو خورده می‌شود، از اول تا آخر غذا. تزیین نیست. هیچ‌کس در ایران حتی یک بار هم به چشم تزیین نگاهش نکرده.' },
        { t: 'close', x: 'A cuisine of long slow sourness, built around a grain, whose greatest achievement is the crust at the bottom of the pot, laid out all at once so that nobody has to ask for anything.', fa: 'آشپزی‌ای بر پایهٔ ترشیِ آرام و طولانی، ساخته‌شده گرد یک دانه، که بزرگ‌ترین دستاوردش پوستهٔ ته قابلمه است؛ و همه‌اش یکجا چیده می‌شود تا هیچ‌کس مجبور نشود چیزی بخواهد.' },
      ] },
    { key: 's5', nav: 'The Sweet', navFa: 'شیرینی', title: 'After, and In Between', titleFa: 'بعدش، و لای کارها', eyebrow: 'SHIRINI',
      blocks: [
        { t: 'p', x: 'Persian sweetness is not the sugar of a European dessert. It runs on saffron, rosewater, pistachio, and sour, and quite a lot of it is not really a dessert at all. It is the thing that is out on the table permanently, for anyone who walks in.', fa: 'شیرینیِ ایرانی، آن شکرِ دسرهای اروپایی نیست. با زعفران و گلاب و پسته و ترشی کار می‌کند، و خیلی از آنچه در این دسته می‌گنجد اصلاً دسر نیست. آن چیزی است که همیشه روی میز است، برای هر کسی که از در وارد شود.' },
        { t: 'sweets' },
        { t: 'mark', x: 'The ice cream stretches, the fruit leather is sour enough to hurt, and there is always a bowl of nuts already out.', fa: 'بستنی‌اش کش می‌آید، لواشکش آن‌قدر ترش است که دهانت را جمع کند، و همیشه یک ظرف آجیل از قبل بیرون است.' },
        { t: 'p', x: 'And the ice cream deserves its own note. Iranians are quietly, completely certain that bastani is the best ice cream on earth, and they are not being patriotic about it. Saffron, rosewater, pistachio, and frozen cream, invented in a country that was storing ice in the desert two thousand years ago.', fa: 'و بستنی حق دارد جداگانه از آن گفته شود. ایرانی‌ها بی‌سروصدا و با اطمینان کامل معتقدند بستنی ایرانی بهترین بستنی روی زمین است، و این را از سر وطن‌پرستی نمی‌گویند. زعفران و گلاب و پسته و خامهٔ یخ‌زده؛ اختراع کشوری که دو هزار سال پیش در دل کویر یخ نگه می‌داشت.' },
      ] },
  ],

  chai: [
    { key: 'c1', nav: 'The Glass', navFa: 'استکان', title: 'Never Just a Drink', titleFa: 'هیچ‌وقت فقط یک نوشیدنی', eyebrow: 'چای',
      blocks: [
        { t: 'lead', x: 'Nobody in Iran has ever had a cup of tea. They have had an occasion, and there was tea in it.', fa: 'هیچ‌کس در ایران تا حالا فقط «یک استکان چای» نخورده است. یک موقعیت بوده، که چای هم در آن بوده.' },
        { t: 'p', x: 'It arrives when you arrive, before anything is said. It arrives when a deal is being discussed, and again when it is done. It arrives at the end of every meal. Refusing it is not really available to you.', fa: 'همان لحظه که می‌رسی می‌آید، پیش از آنکه حرفی زده شود. وقتی دارند سر معامله‌ای صحبت می‌کنند می‌آید، و وقتی معامله جوش خورد باز هم می‌آید. آخر هر غذایی می‌آید. و رد کردنش اصلاً جزو گزینه‌های تو نیست.' },
        { t: 'p', x: 'And it is served in a small glass, never a mug, because the colour matters. Iranians judge tea by looking at it. It should be deep amber and clear, dark enough to be serious, and you can see straight through it. Tea you cannot see is a failure.', fa: 'و در استکان کوچک می‌دهند، هرگز در ماگ، چون رنگش اهمیت دارد. ایرانی‌ها چای را با نگاه کردن قضاوت می‌کنند. باید کهربایی و سیر باشد و در عین حال زلال؛ آن‌قدر پررنگ که جدی باشد، و آن‌قدر شفاف که از پشتش را ببینی. چایی که نشود از پشتش را دید، شکست خورده است.' },
      ] },
    { key: 'c2', nav: 'The Cube', navFa: 'قند', title: 'The Sugar Goes in Your Mouth', titleFa: 'قند در دهان می‌رود', eyebrow: 'GHAND',
      blocks: [
        { t: 'p', x: 'The thing visitors never forget. The sugar does not go in the glass. You take a hard cube of sugar, ghand, put it between your front teeth, and drink the hot tea through it.', fa: 'آن چیزی که هیچ مهمان خارجی فراموشش نمی‌کند: قند در استکان نمی‌رود. یک حبه قند برمی‌داری، می‌گذاری‌اش لای دندان‌های جلو، و چای داغ را از رویش می‌نوشی.' },
        { t: 'p', x: 'The cube dissolves slowly as the tea passes over it, so the sweetness is at the front and the tea stays clean behind it. One cube can last most of a glass. Watch an old man do it and you will see it is a technique.', fa: 'قند همان‌طور که چای از رویش می‌گذرد آرام‌آرام آب می‌شود، پس شیرینی جلوی دهان است و چای پشت سرش دست‌نخورده می‌ماند. یک حبه می‌تواند تا آخرِ استکان دوام بیاورد. یک بار به یک پیرمرد نگاه کن که این کار را می‌کند؛ می‌بینی که خودش یک فن است.' },
        { t: 'phrase', fa: 'چای دبش', tr: 'chai e dabash', lit: 'strong, dark tea', means: 'The good stuff. Dark, hot, and strong enough to mean it. Saying someone made chai e dabash is a compliment about more than the tea.' },
        { t: 'h', x: 'The samovar', fa: 'سماور' },
        { t: 'p', x: 'The samovar sits and stays hot all day. On top of it sits a small pot of concentrated brew, and the samovar below holds the water. You pour a little of the concentrate and dilute it to the strength you want, which means everyone in the room gets their tea exactly as they like it from the same pot.', fa: 'سماور تمام روز سر جایش است و داغ می‌ماند. رویش قوری کوچکی از چای دم‌کشیده و پررنگ نشسته، و آب هم در خودِ سماور است. کمی از آن پررنگ را می‌ریزی و به هر غلظتی که دوست داری رقیقش می‌کنی؛ یعنی همه در آن اتاق چایشان را دقیقاً همان‌طور که می‌پسندند می‌گیرند، آن هم از یک قوری.' },
        { t: 'p', x: 'And it means the tea is always ready. There is no putting the kettle on in an Iranian house. There is no delay between someone arriving and being handed something. That is the entire point of the object.', fa: 'و یعنی چای همیشه آماده است. در خانهٔ ایرانی چیزی به اسم «بگذار کتری را بار بگذارم» وجود ندارد. میان رسیدن یک نفر و چیزی که به دستش می‌دهند، هیچ فاصله‌ای نیست. تمام فلسفهٔ وجودی این وسیله همین است.' },
        { t: 'close', x: 'A samovar kept hot all day so that no one who walks in ever has to wait. That is not a tea habit. That is a statement about how a house should treat whoever comes through the door.', fa: 'سماوری که تمام روز داغ نگه داشته می‌شود تا هیچ‌کس که وارد می‌شود مجبور به انتظار نباشد. این یک عادتِ چای‌خوری نیست. یک اعلام موضع است دربارهٔ اینکه یک خانه باید با هر کسی که از در وارد می‌شود چطور رفتار کند.' },
      ] },
  ],

  typical: [
    { key: 'tp1', nav: 'The Cards', navFa: 'کارت‌ها', title: 'You Know the Ones', titleFa: 'خودت می‌دانی کدام‌ها را می‌گویم', eyebrow: 'TYPICAL PERSIAN',
      blocks: [
        { t: 'p', x: 'Every Iranian recognises these instantly, and every one of them is a joke with something true sitting underneath it. Tap a card to turn it over.', fa: 'هر ایرانی این‌ها را در یک لحظه می‌شناسد، و هر کدامشان شوخی‌ای است که یک حقیقت زیرش نشسته. روی هر کارت بزن تا برگردد.' },
        { t: 'cards' },
      ] },
  ],
};

export type TypicalCard = { front: string; fa?: string; back: string; isNew?: boolean };

export const TYPICAL_CARDS: TypicalCard[] = [
  { front: 'Persian Standard Time is a real unit of measurement.',
    fa: 'ساعت ایرانی',
    back: 'The party starts at eight, which means arrive at ten, and the host will still be in the shower. Turning up on time is genuinely rude, because it means you have caught them unprepared. Every Iranian knows the conversion rate and nobody has ever written it down.' },
  { front: 'Every Persian knows someone who knows someone.', frontFa: 'هر ایرانی یکی را می‌شناسد که یکی دیگر را می‌شناسد.',
    back: 'Need a surgeon, a visa, a plumber, a spare part they stopped making in 1994? Someone will make a phone call. It is called ashnabazi, and it grew in a place where official channels often did not work, so people built a second network out of relatives and favours. It has never stopped running.', backFa: 'جراح می‌خواهی؟ ویزا؟ لوله‌کش؟ قطعه‌ای که تولیدش از سال ۷۳ متوقف شده؟ یکی یک زنگ می‌زند و درست می‌شود. اسمش آشنابازی است، و در جایی رشد کرد که راه‌های رسمی اغلب کار نمی‌کردند؛ پس مردم یک شبکهٔ دوم از فامیل و رفاقت ساختند. آن شبکه هیچ‌وقت از کار نیفتاده.' },
  { front: 'A Persian girl first gift was gold.',
    fa: 'طلا',
    back: 'A coin, a bangle, a tiny necklace, given at birth or soon after. Partly beauty, mostly economics. In a country that has been through revolutions, wars, sanctions and currency collapse, gold is the one thing that does not evaporate. Iranians give their daughters something that will still be worth something when the money is not.' },
  { front: 'Nobody has ever successfully paid a bill at a Persian restaurant.', frontFa: 'تا حالا هیچ‌کس نتوانسته در یک رستوران ایرانی صورت‌حساب را حساب کند.',
    back: 'The fight is physical. Two grown men wrestling over a card machine while the waiter waits. Some people bribe the waiter in advance and are resented for it anyway. This is taarof in its most extreme form: paying is a way of establishing that you are the more generous person, so it must be contested.', backFa: 'دعوا واقعاً فیزیکی است. دو مرد بالغ سر دستگاه کارت‌خوان با هم کشتی می‌گیرند و گارسون هم ایستاده تماشا می‌کند. بعضی‌ها از قبل یواشکی با گارسون هماهنگ می‌کنند و باز هم ازشان دلخور می‌شوند. این تعارف است در افراطی‌ترین شکلش: پرداختن یعنی اثبات اینکه تو بخشنده‌تری، پس حتماً باید سرش جنگید.' },
  { front: 'The Persian goodbye takes forty minutes.', frontFa: 'خداحافظی ایرانی چهل دقیقه طول می‌کشد.',
    back: 'You stand up. You are told to sit. You reach the hallway and a new conversation starts. You reach the door and someone remembers something. You reach the car and food is brought out. The goodbye is not the end of the visit. It is its own event, and rushing it says you wanted to leave.', backFa: 'بلند می‌شوی. می‌گویند بنشین. به راهرو می‌رسی و یک گفت‌وگوی تازه شروع می‌شود. به در می‌رسی و یکی یادش می‌افتد چیزی بگوید. به ماشین می‌رسی و ظرف غذا را می‌آورند. خداحافظی پایان مهمانی نیست؛ خودش یک برنامهٔ جداگانه است، و اگر عجله کنی یعنی از اول دلت می‌خواست بروی.' },
  { front: 'Your mother thinks you are too thin.', frontFa: 'مادرت فکر می‌کند لاغر شده‌ای.',
    back: 'You have always been too thin. You will be too thin at every weight you ever are. This is not about your body. Feeding you is how she says the thing she was never taught to say out loud, and as long as you are too thin, there is more of it to say.', backFa: 'همیشه لاغر بوده‌ای. در هر وزنی که در عمرت داشته باشی، لاغری. ماجرا اصلاً سرِ بدن تو نیست. غذا دادن به تو، همان راهی است که او برای گفتنِ حرفی دارد که هیچ‌وقت یادش ندادند بلند بگوید؛ و تا وقتی که لاغری، هنوز حرف برای گفتن مانده.' },
  { front: 'Everyone is your amoo or khaleh.',
    fa: 'عمو، خاله',
    back: 'Your father friend is uncle. Your mother friend is aunt. The neighbour is aunt. Nobody is related to anybody. Persian has no comfortable word for an adult who is simply a stranger to a child, so it does not have strangers. It has relatives who happen not to be.' },
  { front: 'The tahdig will be gone before you get there.',
    fa: 'ته دیگ',
    back: 'The golden crust at the bottom of the rice pot. Guests are offered it first, which is obligatory, and then the family goes to war over the remainder. Iranians abroad name it, more than anything else, as the food they would choose for a last meal.' },
  { front: 'Have you eaten is a greeting, not a question.', frontFa: '«غذا خوردی؟» یک سلام است، نه یک سؤال.',
    back: 'It means hello. It also means are you all right, and are you being looked after, and I am checking. In a culture where you do not ask someone directly how they are doing, you ask about the one thing that would show it.', backFa: 'یعنی سلام. در عین حال یعنی حالت خوب است؟ و یعنی کسی هوایت را دارد؟ و یعنی من دارم چک می‌کنم. در فرهنگی که مستقیم از کسی نمی‌پرسند حالت چطور است، سراغ همان یک چیزی می‌روند که جوابش را لو می‌دهد.' },
  { front: 'There is a room in the house nobody is allowed to sit in.', frontFa: 'یک اتاق در خانه هست که اجازه نداری در آن بنشینی.',
    back: 'The good room, kept immaculate for guests who might arrive. Sometimes with the furniture still covered. It is not vanity. It is readiness. The house is permanently prepared for someone to walk in, because someone might, and they must find it perfect.', backFa: 'اتاق مهمان، که بی‌عیب و نقص نگه داشته می‌شود برای مهمانی که شاید بیاید. گاهی حتی روکش مبل‌ها را هم برنداشته‌اند. این خودنمایی نیست؛ آمادگی است. خانه همیشه آمادهٔ این است که کسی از در وارد شود، چون ممکن است بشود، و آن کس باید همه‌چیز را بی‌نقص ببیند.' },
  { front: 'You will leave with food you did not ask for.', frontFa: 'با غذایی از خانه بیرون می‌آیی که نخواسته بودی.',
    back: 'In a container that must be returned, which means you must come back. It is a very old trick and it is not remotely accidental. Nobody has ever returned a Persian container empty, either, so the whole thing loops forever, which is the design.', backFa: 'در ظرفی که باید برگردانده شود، یعنی باید دوباره بیایی. این ترفند خیلی قدیمی است و ذره‌ای هم تصادفی نیست. ضمناً تا حالا هیچ‌کس ظرف یک ایرانی را خالی پس نداده، پس این چرخه تا ابد ادامه دارد؛ که خودش دقیقاً همان نقشه است.' },
  { front: 'Shoes come off. This is not negotiable.', frontFa: 'کفش‌ها در می‌آید. این یکی جای بحث ندارد.',
    back: 'Not a preference, not a house rule, not a request. It happens at the door without anyone saying anything. Persians sit on floors, eat on floors, sleep on floors. The floor is not the ground, it is furniture, and you do not stand on furniture in your shoes.', backFa: 'نه سلیقه است، نه قانون خانه، و نه درخواست. همان دم در اتفاق می‌افتد، بی‌آنکه کسی چیزی بگوید. ایرانی‌ها روی زمین می‌نشینند، روی زمین غذا می‌خورند، روی زمین می‌خوابند. کف خانه «زمین» نیست، مبلمان است؛ و آدم با کفش روی مبل نمی‌ایستد.' },
  { front: 'Saffron is measured in fear.',
    fa: 'زعفران',
    back: 'The most expensive spice on earth, grown in Khorasan, and a Persian kitchen uses it constantly. It is ground with a pestle, bloomed in a spoonful of hot water, and poured over rice like something being administered. Nobody is casual with it. Nobody ever has been.' },
  { front: 'Your cousin is a doctor. You will hear about it.', frontFa: 'پسرخاله‌ات دکتر شده. خبرش را به تو خواهند داد.',
    back: 'Everyone has the cousin. The comparison is relentless and it is not really about you. It comes from a generation that lost a great deal and rebuilt from nothing, for whom a child professional standing was the visible proof it was worth it. It lands badly. It was meant as love.', backFa: 'همه یک پسرخاله دارند. این مقایسه بی‌امان است و در واقع اصلاً به تو ربطی ندارد. از نسلی می‌آید که خیلی چیزها را از دست داد و از صفر دوباره ساخت، و برایش جایگاه شغلی فرزندش تنها مدرک قابل دیدنِ این بود که ارزشش را داشت. بد به دل می‌نشیند. اما از سر محبت گفته شده.' },
];

export type Dish = {
  key: string; fa: string; name: string; tag: string; x: string; image: string;
  // Present on every entry; the type simply never said so.
  tagFa?: string; xFa?: string;
};

export const DISHES: Dish[] = [
  { key: 'ghormeh', fa: 'قرمه سبزی', name: 'Ghormeh Sabzi', tag: 'THE NATIONAL DISH', tagFa: 'غذای ملی', image: 'food-ghormeh-sabzi',
    x: 'If Iran has one dish, this is it. A dark green stew of herbs fried down for hours, with lamb, kidney beans, and dried lime that gives it a sourness nothing else on earth has. It takes most of a day. Every family thinks their mother made it best, and every family is correct.', xFa: 'اگر قرار باشد ایران یک غذا داشته باشد، همین است. خورشی سبزِ تیره از سبزی‌ای که ساعت‌ها سرخ شده، با گوشت گوسفند و لوبیا قرمز و لیمو عمانی، که ترشی‌ای به آن می‌دهد که هیچ چیز دیگری روی زمین ندارد. بیشترِ یک روز وقت می‌برد. هر خانواده‌ای فکر می‌کند مادر خودش بهترینش را می‌پخته، و حق هم با همهٔ آنهاست.' },
  { key: 'fesenjan', fa: 'فسنجان', name: 'Fesenjan', tag: 'THE STRANGE ONE', tagFa: 'آن یکی عجیب', image: 'food-fesenjan',
    x: 'Chicken or duck in ground walnuts and pomegranate molasses, cooked until the walnut oil separates and the sauce goes almost black. Dark, sour, sweet, and completely unlike anything in any other cuisine. It is the dish that surprises people most.', xFa: 'مرغ یا اردک در گردوی ساییده و رب انار، که آن‌قدر می‌پزد تا روغن گردو بیفتد و رنگ خورش تقریباً سیاه شود. تیره است و ترش و شیرین، و به هیچ چیزی در هیچ آشپزی دیگری شبیه نیست. این همان غذایی است که بیش از همه آدم‌ها را غافلگیر می‌کند.' },
  { key: 'zereshk', fa: 'زرشک پلو', name: 'Zereshk Polo', tag: 'THE JEWELLED ONE', tagFa: 'جواهرنشان', image: 'food-zereshk-polo',
    x: 'Saffron rice scattered with barberries, tiny sour red jewels, served with chicken. It is what appears at weddings and at every occasion that matters, because it is beautiful before anyone has tasted it. The barberries are sharp enough to make you blink.', xFa: 'برنج زعفرانی که رویش زرشک پاشیده‌اند، آن جواهرهای ریزِ سرخِ ترش، و با مرغ سرو می‌شود. همانی است که سر عروسی و هر مناسبت مهمی می‌آید، چون پیش از آنکه کسی مزه‌اش کند زیباست. زرشکش آن‌قدر تیز است که چشمت را ببندی.' },
  { key: 'lobia', fa: 'لوبیا پلو', name: 'Lobia Polo', tag: 'THE WEEKNIGHT ONE', tagFa: 'غذای شب‌های معمولی', image: 'food-lobia-polo',
    x: 'Green beans and minced meat cooked with tomato and cinnamon and folded through the rice, so the rice is the dish rather than a bed for it. Homely, quick by Persian standards, and the one that Iranians abroad make when they are homesick and short of time.', xFa: 'لوبیا سبز و گوشت چرخ‌کرده که با گوجه و دارچین پخته و لای برنج مخلوط می‌شود، طوری که برنج خودش غذاست نه بستری برای آن. خانگی است، به معیار ایرانی سریع، و همانی است که ایرانی‌های خارج از کشور وقتی دلتنگ‌اند و وقت کم دارند می‌پزند.' },
  { key: 'koobideh', fa: 'کوبیده', name: 'Kabab Koobideh', tag: 'THE EVERYDAY ONE', tagFa: 'همیشگی', image: 'food-koobideh',
    x: 'Minced lamb and onion pressed by hand onto a flat wide skewer and grilled over coal. Eaten with rice, a grilled tomato, raw onion, and sumac. It looks simple and it is not. If the mix is wrong it falls off the skewer into the fire, and the whole skill is in the hands.', xFa: 'گوشت چرخ‌کردهٔ گوسفند و پیاز که با دست روی سیخ پهن فشرده می‌شود و روی زغال کباب. با برنج و گوجهٔ کبابی و پیاز خام و سماق خورده می‌شود. ساده به نظر می‌رسد و نیست. اگر مخلوطش درست نباشد از سیخ می‌افتد توی آتش، و تمام هنر در همان دست است.' },
  { key: 'ash', fa: 'آش رشته', name: 'Ash Reshte', tag: 'THE ONE YOU GIVE AWAY', tagFa: 'آن که نذر می‌کنند', image: 'food-ash-reshte',
    x: 'Thick soup of herbs, beans, and noodles, finished with kashk, a tart dried whey. Made in enormous pots, and traditionally made to be given away: cooked as a vow and handed out to neighbours and strangers. Making ash for the whole street is an act of charity with its own name.', xFa: 'آشی غلیظ از سبزی و حبوبات و رشته، که با کشک تمام می‌شود. در دیگ‌های بزرگ می‌پزند، و به‌طور سنتی برای بخشیدن می‌پزند: نذری، که میان همسایه و غریبه پخش می‌شود. آش پختن برای کل کوچه، کارِ خیری است که خودش اسم دارد.' },
  { key: 'abgoosht', fa: 'آبگوشت', name: 'Abgoosht', tag: 'TWO MEALS, ONE POT', tagFa: 'دو غذا، یک دیزی', image: 'food-abgoosht',
    x: 'Lamb, chickpeas, and potato slow cooked in a stone crock, and then you take it apart. First you strain off the broth and eat it with torn bread. Then you take a pestle and mash everything left in the pot into a paste and eat that as a second course. One pot, two dishes, and a tool at the table.', xFa: 'گوشت گوسفند و نخود و سیب‌زمینی که آرام در دیزی سنگی می‌پزد، و بعد خودت بازش می‌کنی. اول آبش را جدا می‌کنی و با نان تیلیت می‌خوری. بعد گوشت‌کوب برمی‌داری و هر چه ته دیزی مانده را می‌کوبی تا خمیر شود و همان را به‌عنوان غذای دوم می‌خوری. یک دیزی، دو غذا، و یک ابزار سر سفره.' },
  { key: 'kale', fa: 'کله پاچه', name: 'Kale Pache', tag: 'BREAKFAST, AND A TEST', tagFa: 'صبحانه، و یک امتحان', image: 'food-kale-pache',
    x: 'Sheep head and trotters, simmered all night, and eaten at dawn. The brain, the tongue, the cheek, in a clear broth with lemon and cinnamon. It is a breakfast, it is a delicacy, and it is the thing Iranians use to find out whether you are serious. The men who eat it will tell you there is nothing better.', xFa: 'کله و پاچهٔ گوسفند که تمام شب می‌جوشد و سحر خورده می‌شود. مغز، زبان، بناگوش، در آبی صاف با لیمو و دارچین. هم صبحانه است، هم خوراکی اعیانی، و هم همان چیزی که ایرانی‌ها با آن می‌سنجند طرف جدی هست یا نه. آنهایی که می‌خورندش به تو می‌گویند هیچ چیز از این بهتر نیست.' },
  { key: 'tahdig', fa: 'ته دیگ', name: 'Tahdig', tag: 'THE PRIZE', tagFa: 'جایزه', image: 'food-tahdig',
    x: 'The golden crust from the bottom of the rice pot. Sometimes plain rice, sometimes with potato or flatbread laid underneath. It is turned out at the table and it is gone within a minute, and there has never in the history of Iran been enough of it.', xFa: 'همان پوستهٔ طلایی ته قابلمهٔ برنج. گاهی خودِ برنج، گاهی با سیب‌زمینی یا نان لواش که زیرش انداخته‌اند. سر سفره برش می‌گردانند و ظرف یک دقیقه تمام می‌شود، و در تمام تاریخ ایران حتی یک بار هم به اندازهٔ کافی نبوده.' },
  { key: 'sabzi', fa: 'سبزی خوردن', name: 'Sabzi Khordan', tag: 'ON EVERY TABLE', tagFa: 'سر هر سفره‌ای', image: 'food-sabzi-khordan',
    x: 'A plate of raw herbs. Mint, tarragon, basil, radish, spring onion. Eaten by the handful with bread, white cheese, and walnuts, throughout the meal, not before it. Iranians eat more raw herbs than almost anyone, and it is the flavour they miss most abroad.', xFa: 'یک بشقاب سبزی تازه. نعنا، ترخون، ریحان، تربچه، پیازچه. مشت‌مشت با نان و پنیر و گردو خورده می‌شود، در طول غذا، نه پیش از آن. ایرانی‌ها بیش از تقریباً هر ملت دیگری سبزی خام می‌خورند، و همین طعمی است که در خارج بیش از همه دلشان برایش تنگ می‌شود.' },
  { key: 'baghali', fa: 'باقالی پلو', name: 'Baghali Polo', tag: 'THE SPRING ONE', tagFa: 'بهاری', image: 'food-baghali-polo',
    x: 'Rice steamed with broad beans and enough dill to turn the whole pot green, served with a lamb shank that gives way to a fork. The dill is not a hint of dill. It is most of the dish, and it is what a Persian kitchen smells like in spring.', xFa: 'برنجی که با باقالی و آن‌قدر شوید دم می‌کشد که تمام قابلمه سبز شود، و با ماهیچه‌ای که با فشار چنگال از هم باز می‌شود. شوید در آن اشاره نیست؛ بیشترِ غذاست، و آشپزخانهٔ ایرانی در بهار همین بو را دارد.' },
  { key: 'adas', fa: 'عدس پلو', name: 'Adas Polo', tag: 'SWEET IN THE MIDDLE OF THE MEAL', tagFa: 'شیرینی، وسط غذا', image: 'food-adas-polo',
    x: 'Lentils and rice with raisins, dates and fried onion, often cinnamon, sometimes minced meat. It unsettles anyone who believes sweetness belongs at the end of a meal. In Iran it belongs in the middle of the rice.', xFa: 'عدس و برنج با کشمش و خرما و پیاز داغ، معمولاً با دارچین و گاهی با گوشت چرخ‌کرده. هر کسی را که باور دارد شیرینی جای آخر غذاست به هم می‌ریزد. در ایران جایش وسط برنج است.' },
  { key: 'sabzipolo', fa: 'سبزی پلو ماهی', name: 'Sabzi Polo Mahi', tag: 'THE FIRST MEAL OF THE YEAR', tagFa: 'نخستین غذای سال', image: 'food-sabzi-polo-mahi',
    x: 'Herbed rice with fried white fish, eaten on the night of Nowruz in almost every Iranian house there is. Green for the new year, fish for the life in the water. It is the one meal in the calendar that nearly everybody eats on the same evening.', xFa: 'برنج سبزی‌دار با ماهی سرخ‌شده، که شب نوروز تقریباً در هر خانهٔ ایرانی خورده می‌شود. سبز برای سال نو، ماهی برای جانِ آب. تنها وعده‌ای در تقویم است که نزدیک به همه، یک شب، با هم می‌خورند.' },
  { key: 'mirza', fa: 'میرزا قاسمی', name: 'Mirza Ghasemi', tag: 'SMOKE, FROM THE CASPIAN', tagFa: 'دودِ شمال', image: 'food-mirza-ghasemi',
    x: 'Aubergine held over a flame until the skin blisters and splits, then mashed with garlic, tomato and egg. From Gilan on the Caspian coast, and the smoke is the entire point. Cooked in an oven instead of over fire it becomes a different and lesser dish.', xFa: 'بادمجانی که روی شعله می‌ماند تا پوستش تاول بزند و بترکد، بعد با سیر و گوجه و تخم‌مرغ له می‌شود. اهل گیلان است، کنار دریای کاسپین، و همهٔ ماجرا همان دود است. اگر در فر بپزد، غذای دیگری می‌شود و کمتر.' },
  { key: 'kashk', fa: 'کشک بادمجان', name: 'Kashk-e Bademjan', tag: 'THE ONE THAT ARRIVES FIRST', tagFa: 'اولی که می‌آید', image: 'food-kashk-bademjan',
    x: 'Fried aubergine crushed with garlic and mint oil, finished with kashk, a fermented whey whose sourness sits closer to cheese than to yoghurt. It comes out before the meal, it is eaten with bread, and it is usually gone before the rice arrives.', xFa: 'بادمجان سرخ‌شده که با سیر و نعنا داغ کوبیده می‌شود و رویش کشک می‌آید؛ همان فرآوردهٔ ترشی که مزه‌اش به پنیر نزدیک‌تر است تا ماست. پیش از غذا می‌آید، با نان خورده می‌شود، و معمولاً تا برنج برسد تمام شده است.' },
  { key: 'karafs', fa: 'خورش کرفس', name: 'Khoresh-e Karafs', tag: 'THE UNDERRATED ONE', tagFa: 'دست‌کم‌گرفته', image: 'food-khoresh-karafs',
    x: 'Celery stewed slowly with lamb, mint and parsley, then sharpened at the end with lemon or sour grape juice. Most cuisines use celery for flavour and throw it away. Persian cooking puts it at the centre of the dish, and is right to.', xFa: 'کرفس که آرام با گوشت و نعنا و جعفری می‌پزد و آخر کار با لیمو یا آبغوره تیز می‌شود. بیشتر آشپزی‌ها کرفس را برای طعم به کار می‌برند و بعد دور می‌ریزند. آشپزی ایرانی وسط غذا می‌نشاندش، و حق دارد.' },
  { key: 'estanboli', fa: 'استانبولی پلو', name: 'Estanboli Polo', tag: 'ONE POT, NO CEREMONY', tagFa: 'یک قابلمه، بی‌تشریفات', image: 'food-estanboli-polo',
    x: 'Tomato rice cooked with potato and minced meat in a single pot: no separate stew, nothing strained, nothing layered. Student food, travel food, and what gets made on a night when nobody has the patience for anything else. Every Iranian has a view on how much tomato is correct.', xFa: 'برنج گوجه‌ای که با سیب‌زمینی و گوشت چرخ‌کرده در یک قابلمه می‌پزد؛ نه خورشی جدا، نه آبکشی، نه دم‌کردنی لایه‌لایه. غذای دانشجویی است، غذای سفر، و همان چیزی که شبی پخته می‌شود که حوصلهٔ هیچ کار دیگری نیست. هر ایرانی نظری دارد که چقدر گوجه درست است.' },
];

export const SWEETS: Dish[] = [
  { key: 'bastani', fa: 'بستنی سنتی', name: 'Bastani Sonnati', tag: 'SAFFRON ICE CREAM', tagFa: 'بستنی زعفرانی', image: 'food-bastani',
    x: 'Saffron, rosewater, and pistachio, with chunks of frozen clotted cream running through it. It stretches when you pull it, because of the salep in it, and that pull is how you know it is the real thing. Eat it pressed between two thin wafers, as bastani nooni, and it is the best ice cream in the world. That is not a Persian opinion. Ask anyone who has had it.', xFa: 'زعفران و گلاب و پسته، با تکه‌های خامهٔ یخ‌زده که لابه‌لایش رفته. وقتی می‌کشی‌اش کش می‌آید، به خاطر ثعلبی که در آن است، و همان کش آمدن است که نشان می‌دهد اصل است. لای دو ورق نان بگذار و بستنی نونی بخور؛ بهترین بستنی دنیاست. این نظر یک ایرانی نیست. از هر کسی که خورده باشد بپرس.' },
  { key: 'faloodeh', fa: 'فالوده', name: 'Faloodeh', tag: 'OLDER THAN YOU THINK', tagFa: 'کهن‌تر از آنچه فکر می‌کنی', image: 'food-faloodeh',
    x: 'Thin frozen rice noodles in a rosewater syrup, served with lime squeezed over the top so it is sour and cold at once. Shiraz is famous for it. And it is ancient. Persians were making frozen desserts more than two thousand years ago, packing ice into yakhchals in the desert to have it in summer, which is its own piece of engineering.', xFa: 'رشته‌های نازک و یخ‌زدهٔ نشاسته در شربت گلاب، که با آبلیمو رویش سرو می‌شود تا هم ترش باشد و هم سرد. شیراز به آن نامدار است. و کهن هم هست: ایرانیان بیش از دو هزار سال پیش دسر یخ‌زده درست می‌کردند و یخ را در یخچال‌های کویری انبار می‌کردند تا تابستان از آن داشته باشند؛ که خودش یک شاهکار مهندسی است.' },
  { key: 'lavashak', fa: 'لواشک', name: 'Lavashak', tag: 'EVERY PERSIAN CHILDHOOD', tagFa: 'کودکی هر ایرانی', image: 'food-lavashak',
    x: 'Fruit pulp, plum or apricot or pomegranate, spread thin and dried in the sun into a sheet of sour leather. Sometimes salted. Every Iranian child has torn a piece off a sheet of this, and every Iranian adult still wants it. It is sour enough to make your jaw ache and nobody has ever been able to stop at one strip.', xFa: 'لُبِ میوه، آلو یا زردآلو یا انار، که نازک پهن می‌شود و زیر آفتاب خشک می‌شود تا ورقی ترش شود. گاهی نمکی. هر بچهٔ ایرانی یک تکه از این ورق را کنده و خورده، و هر بزرگسال ایرانی هنوز هم دلش می‌خواهد. آن‌قدر ترش است که فکت تیر بکشد، و تا حالا هیچ‌کس نتوانسته به یک تکه بسنده کند.' },
  { key: 'gaz', fa: 'گز', name: 'Gaz', tag: 'FROM ISFAHAN', tagFa: 'سوغات اصفهان', image: 'food-gaz',
    x: 'Nougat, white and soft and heavy with pistachios, made from the sap that a small insect leaves on tamarisk trees in the hills near Isfahan. Nobody who eats it thinks about that. It is what you bring back from Isfahan, and you bring back a lot of it, because you will be asked.', xFa: 'گز، سفید و نرم و پر از پسته، که از شیرابه‌ای درست می‌شود که حشره‌ای ریز روی درختان گز در تپه‌های اطراف اصفهان به جا می‌گذارد. هیچ‌کس موقع خوردن به این فکر نمی‌کند. سوغات اصفهان همین است، و زیاد هم می‌آوری، چون حتماً ازت می‌خواهند.' },
  { key: 'sohan', fa: 'سوهان', name: 'Sohan', tag: 'FROM QOM', tagFa: 'سوغات قم', image: 'food-sohan',
    x: 'A saffron brittle of wheat sprout, butter, and sugar, studded with pistachio and almond, snapped from a wheel. Deep gold, hard, and dangerous to a filling. Qom makes it, and a tin of it travels back with everyone who passes through.', xFa: 'شیرینی‌ای زعفرانی و ترد از جوانهٔ گندم و کره و شکر، پر از پسته و بادام، که تکه‌تکه از یک قرص بزرگ جدا می‌شود. طلایی سیر است و سفت، و برای پر کردگی دندان خطرناک. سوغات قم است، و هر کسی از آنجا رد شود یک جعبه‌اش را با خودش برمی‌گرداند.' },
  { key: 'ajil', fa: 'آجیل', name: 'Ajil', tag: 'THE BOWL ON THE TABLE', tagFa: 'ظرفی که همیشه روی میز است', image: 'food-ajil',
    x: 'The nut mix, and it is not a snack, it is an institution. Pistachios, almonds, roasted chickpeas, hazelnuts, dried figs, mulberries, sour cherries, and seeds. Every house has a bowl of it out. It appears at Nowruz and at Yalda and on any evening at all. Iranians eat it constantly and the shells pile up in a second bowl beside it.', xFa: 'آجیل، که یک تنقلات ساده نیست، خودش یک نهاد است. پسته، بادام، نخودچی، فندق، انجیر خشک، توت، آلبالو، و انواع تخمه. در هر خانه‌ای یک ظرفش بیرون است. سر نوروز می‌آید، شب یلدا می‌آید، و هر عصر دیگری هم می‌آید. ایرانی‌ها مدام می‌خورندش و پوستش در ظرف دومی کنارش تلنبار می‌شود.' },
  { key: 'qottab', fa: 'قطاب', name: 'Qottab', tag: 'YAZD, UNDER ICING SUGAR', tagFa: 'یزد، زیر پودر قند', image: 'food-qottab',
    x: 'A fried almond and walnut pastry folded into a small crescent and buried in icing sugar. Yazd is a desert city that built a reputation on sweets, and this is the one it is known for.', xFa: 'شیرینی سرخ‌شده‌ای با مغز بادام و گردو که هلالی کوچک تا می‌شود و زیر پودر قند پنهان می‌ماند. یزد شهری کویری است که نامش را با شیرینی ساخت، و قطاب همانی است که به آن شناخته می‌شود.' },
  { key: 'zoolbia', fa: 'زولبیا و بامیه', name: 'Zoolbia and Bamieh', tag: 'RAMADAN, AFTER DARK', tagFa: 'رمضان، بعد از غروب', image: 'food-zoolbia-bamieh',
    x: 'Batter piped into hot oil and dropped straight into saffron and rosewater syrup: zoolbia in lacy spirals, bamieh in short ridged fingers. They fill every window during Ramadan and are eaten at the breaking of the fast, with tea, in quantities nobody admits to.', xFa: 'خمیری که در روغن داغ ریخته می‌شود و یک‌راست می‌رود توی شربت زعفران و گلاب؛ زولبیا به شکل تورهای پیچ‌درپیچ، بامیه به شکل انگشت‌های کوتاه شیاردار. ماه رمضان ویترین‌ها پر از آن است و سر افطار با چای خورده می‌شود، به مقداری که کسی اعترافش نمی‌کند.' },
  { key: 'sholehzard', fa: 'شله زرد', name: 'Sholeh Zard', tag: 'MADE TO GIVE AWAY', tagFa: 'برای نذر', image: 'food-sholeh-zard',
    x: 'Saffron rice pudding, set in a shallow dish and written on in cinnamon and slivered almonds before it is carried next door. It is cooked for a vow, in enormous quantity, and almost never for the household alone.', xFa: 'فرنی زعفرانیِ برنجی که در ظرف کم‌عمق می‌بندد و پیش از آنکه در خانهٔ همسایه را بزنند، رویش با دارچین و خلال بادام می‌نویسند. برای نذر پخته می‌شود، به مقدار زیاد، و تقریباً هیچ‌وقت فقط برای خود خانه.' },
  { key: 'ranginak', fa: 'رنگینک', name: 'Ranginak', tag: 'DATES, FROM THE SOUTH', tagFa: 'خرما، از جنوب', image: 'food-ranginak',
    x: 'Dates stuffed with walnuts, laid out in a tray and covered in flour toasted in butter until it smells like caramel. From the south, around Shiraz and Bushehr. Sweet the way dates are sweet, which is not the way sugar is.', xFa: 'خرمای مغزدار با گردو که در سینی چیده می‌شود و رویش آردی می‌آید که در کره آن‌قدر تفت خورده تا بوی کارامل بدهد. اهل جنوب است، حوالی شیراز و بوشهر. شیرینی‌اش شیرینیِ خرماست، نه شیرینیِ شکر.' },
  { key: 'halva', fa: 'حلوا', name: 'Halva', tag: 'FOR THE DEAD, AND FOR GUESTS', tagFa: 'برای رفتگان، و برای مهمان', image: 'food-halva',
    x: 'Flour cooked slowly in butter until it darkens, loosened with saffron and rosewater syrup, then smoothed flat with the back of a spoon. It is made for funerals and memorials, which is why the smell of it carries a particular weight in an Iranian house.', xFa: 'آردی که آرام در کره می‌سوزد تا رنگ بگیرد، با شربت زعفران و گلاب باز می‌شود و با پشت قاشق صاف. برای ختم و یادبود پخته می‌شود، و برای همین بویش در خانهٔ ایرانی وزن خاصی دارد.' },
  { key: 'nanberenji', fa: 'نان برنجی', name: 'Nan-e Berenji', tag: 'KERMANSHAH, AT NOWRUZ', tagFa: 'کرمانشاه، سر نوروز', image: 'food-nan-berenji',
    x: 'A pale rice flour biscuit with cardamom and a scatter of poppy seeds, so short it collapses the moment it is bitten. It comes out at Nowruz beside the tea, and it is the one that leaves crumbs across the whole room.', xFa: 'شیرینی روشنی از آرد برنج با هل و چند دانه خشخاش، چنان ترد که تا گاز می‌زنی از هم می‌پاشد. نوروز کنار چای می‌آید، و همانی است که تمام اتاق را خرده‌ریز می‌کند.' },
];


/* A different order every visit, and one card carried to the front each week. */
export function weekNumber(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 604800000);
}

export function typicalDeck(): TypicalCard[] {
  const deck = TYPICAL_CARDS.map((c) => ({ ...c }));

  // this week's card, rotating steadily through the pack
  const wk = weekNumber() % deck.length;
  deck[wk].isNew = true;
  const fresh = deck.splice(wk, 1)[0];

  // shuffle the rest
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return [fresh, ...deck];
}


// A different card each day for the home screen, deterministic by date.
export function typicalOfDay(d = new Date()): TypicalCard {
  const day = Math.floor(d.getTime() / 86400000);
  return TYPICAL_CARDS[day % TYPICAL_CARDS.length];
}
