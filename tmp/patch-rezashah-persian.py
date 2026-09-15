# Reza Shah, in Nojan's Persian.
#
# Anything carrying an apostrophe is anchored on a fragment without one,
# since the file spells them three different ways and whole-string
# matching has failed on that repeatedly.

import re

PAIRS = [
 ("Reza Shah Pahlavi", "رضاشاه پهلوی"),
 ("From a Mountain Village", "از یک روستای کوهستانی"),

 ("Reza Khan was born on 15 March 1878 in Alasht, a small village high in the mountains of Mazandaran, in the green north of Iran. His people were of modest means, and the world he entered was a hard one, far from the comforts of the capital.",
  "رضاخان در ۱۵ مارس ۱۸۷۸ در الاشت به دنیا آمد؛ روستایی کوچک در ارتفاعات مازندران، در شمال سرسبز ایران. خانواده‌اش تنگدست بودند و دنیایی که پا به آن گذاشت، دنیایی سخت و دور از آسایش پایتخت بود."),

 ("Reza Khan in his youth, before his rise through the ranks.",
  "رضاخان در جوانی، پیش از آنکه در سلسله‌مراتب نظامی بالا برود."),

 ("The Iran around him was a nation in decline, its government bankrupt, its provinces ruled by tribes and foreign interests, its affairs decided in London and Saint Petersburg. For a proud soldier who loved his country, the humiliation was a fire that would drive him for the rest of his life.",
  "ایرانی که پیرامونش می‌دید، کشوری رو به افول بود؛ دولتش ورشکسته، ولایاتش در دست ایل‌ها و منافع بیگانه، و سرنوشت امورش در لندن و سن‌پترزبورگ تعیین می‌شد. برای سربازی سربلند که کشورش را دوست داشت، این خواری آتشی بود که تا پایان عمر او را به پیش می‌راند."),

 ("The March on Tehran", "حرکت به سوی تهران"),
 ("February 1921", "اسفند ۱۲۹۹"),
 ("A nation adrift", "کشوری بی‌سکان"),
 ("The coup", "کودتا"),

 ("In February 1921, Reza Khan marched from Qazvin to Tehran at the head of only about two thousand five hundred to three thousand well disciplined troops. They entered the capital almost without resistance and took control of the city in a single, bloodless stroke.",
  "در اسفند ۱۲۹۹، رضاخان در رأس تنها حدود دو هزار و پانصد تا سه هزار سرباز منضبط، از قزوین به سوی تهران حرکت کرد. تقریباً بدون مقاومت وارد پایتخت شدند و در یک حرکت، بدون خون‌ریزی، کنترل شهر را به دست گرفتند."),

 ("Reza Khan at the time of the march on Tehran, 1921.",
  "رضاخان در زمان حرکت به سوی تهران، ۱۲۹۹."),

 ("Over the next four years he gathered the reins of the state into his own hands. He crushed the tribal rebellions and separatist revolts that had torn the provinces apart, and for the first time in living memory, a single authority reached from Tehran to the farthest corners of the country.",
  "در چهار سال بعد، افسار حکومت را یکسره در دست گرفت. شورش‌های ایلی و جنبش‌های جدایی‌خواهی را که ولایات را از هم گسسته بودند سرکوب کرد و برای نخستین بار در حافظه نسل زنده، قدرتی واحد از تهران تا دورترین گوشه‌های کشور اعمال می‌شد."),

 ("In 1923 he became prime minister. The old dynasty was fading, and the nation was ready for a strong hand. In 1925, with the approval of a constituent assembly, the Qajar dynasty was set aside, and Reza Khan was proclaimed Reza Shah Pahlavi, founder of a new royal house.",
  "در سال ۱۹۲۳ نخست‌وزیر شد. سلسله کهنه رو به افول بود و کشور آماده پذیرش دستی نیرومند بود. در سال ۱۹۲۵، با تصویب مجلس مؤسسان، سلسله قاجار کنار گذاشته شد و رضاخان با عنوان رضاشاه پهلوی، بنیان‌گذار خاندان سلطنتی تازه، بر تخت نشست."),

 ("Building a Nation", "ساختن یک ملت"),
 ("A national army", "ارتشی ملی"),

 ("A modern conscript army that ended the tribal revolts and unified the land under one authority.",
  "ارتشی مدرن و مبتنی بر خدمت وظیفه که به شورش‌های ایلی پایان داد و کشور را زیر یک قدرت واحد متحد کرد."),

 ("The Trans-Iranian Railway", "راه‌آهن سراسری"),

 ("A railway binding the Persian Gulf to the Caspian, built with Iranian money alone.",
  "راه‌آهنی که خلیج فارس را به دریای خزر پیوند داد و تنها با پول ایران ساخته شد."),

 ("Schools and a university", "مدرسه و دانشگاه"),

 ("Compulsory primary education, the University of Tehran in 1934, and thousands of students sent to study in Europe.",
  "آموزش ابتدایی اجباری، تأسیس دانشگاه تهران در سال ۱۳۱۳، و اعزام هزاران دانشجو برای تحصیل به اروپا."),

 ("A modern state", "دولتی مدرن"),

 ("Roads, factories, a civil code, land registered and forests nationalized, a government that finally reached the whole country.",
  "جاده‌ها، کارخانه‌ها، قانون مدنی، ثبت زمین‌ها و ملی شدن جنگل‌ها؛ دولتی که سرانجام در سراسر کشور حضور داشت."),

 ("He created a modern conscript army and ended the tribal revolts that had long divided the land. He founded the University of Tehran in 1934, made primary schooling compulsory, and sent thousands of young Iranians to study in Europe so they might return and build the nation.",
  "ارتشی مدرن و مبتنی بر خدمت وظیفه ساخت و به شورش‌های ایلی که سال‌ها کشور را چندپاره کرده بودند پایان داد. در سال ۱۳۱۳ دانشگاه تهران را بنیان گذاشت، آموزش ابتدایی را اجباری کرد و هزاران جوان ایرانی را برای تحصیل به اروپا فرستاد تا بازگردند و کشور را بسازند."),

 ("A new nation, remade", "ملتی که از نو ساخته شد"),

 ("Reza Shah, the builder of the modern Iranian state.",
  "رضاشاه، سازنده دولت مدرن ایران."),

 ("The railway across the roof of Iran", "راه‌آهنی از بام ایران"),

 ("Of all he built, the Trans-Iranian Railway was his proudest achievement. Stretching one thousand three hundred and ninety four kilometres, it bound the Persian Gulf in the south to the Caspian Sea in the north, crossing the length of a rugged and mountainous land.",
  "از میان همه آنچه ساخت، راه‌آهن سراسری بیش از همه مایه افتخارش بود. این راه‌آهن با طول هزار و سیصد و نود و چهار کیلومتر، خلیج فارس در جنوب را به دریای خزر در شمال پیوند می‌داد و سراسر سرزمینی ناهموار و کوهستانی را درمی‌نوردید."),

 ("The route climbed over the Zagros and the Alborz, the two great mountain ranges, rising past two thousand two hundred metres at its highest point, near the very limit of what the steam engines of the day could manage. It required more than ninety kilometres of tunnels and over four thousand bridges.",
  "مسیر از زاگرس و البرز، دو رشته‌کوه بزرگ ایران، عبور می‌کرد و در بلندترین نقطه خود به ارتفاعی بیش از دو هزار و دویست متر می‌رسید؛ تقریباً تا مرز توان لکوموتیوهای بخار آن روزگار. ساخت آن به بیش از نود کیلومتر تونل و بیش از چهار هزار پل نیاز داشت."),

 ("Now I can die in peace. I have connected the Persian Gulf to the Caspian with Iranian hands and Iranian money.",
  "حالا می‌توانم با خیال آسوده بمیرم. خلیج فارس را با دست ایرانی و پول ایرانی به دریای خزر پیوند دادم."),

 ("The Trans-Iranian Railway, binding the Persian Gulf to the Caspian across 1,394 km.",
  "راه‌آهن سراسری ایران، که در طول ۱۳۹۴ کیلومتر خلیج فارس را به دریای خزر پیوند داد."),

 ("The railway was inaugurated with great ceremony on 26 August 1938. Years later, during the Second World War, this same line became the vital Persian Corridor, carrying nearly five million tons of supplies to the Soviet Union. It remains in daily use to this day.",
  "راه‌آهن در ۴ شهریور ۱۳۱۷ با تشریفاتی باشکوه افتتاح شد. سال‌ها بعد، در جریان جنگ جهانی دوم، همین خط به کریدور حیاتی ایران تبدیل شد و نزدیک به پنج میلیون تن تدارکات را به اتحاد شوروی رساند. این خط هنوز هم هر روز مورد استفاده قرار می‌گیرد."),

 ("The Father and the Man", "پدر و آن مرد"),

 ("Behind the towering public figure was a father whose children remembered him with deep love and no small awe. He was stern, demanding, and impatient with weakness, yet those closest to him spoke of a warmth and a tenderness that the public rarely saw.",
  "پشت آن چهره قدرتمند و پرابهت، پدری بود که فرزندانش با عشقی عمیق و هیبتی کم‌نظیر از او یاد می‌کردند. سختگیر و پرتوقع بود و با ضعف و سستی کنار نمی‌آمد؛ اما نزدیک‌ترین کسانش از گرمی و مهری می‌گفتند که مردم کمتر از او می‌دیدند."),

 ("Reza Shah with his children, among them the future Shah, Mohammad Reza.",
  "رضاشاه در کنار فرزندانش، از جمله محمدرضا، شاه آینده."),

 ("Reza Shah with his son and heir, the young Mohammad Reza.",
  "رضاشاه در کنار پسر و ولیعهدش، محمدرضای جوان."),

 ("He raised his sons and daughters to serve Iran, and he placed on his eldest son and heir, Mohammad Reza, the heaviest expectations of all. In the family memoirs his children describe a man of simple habits and iron discipline, who rose early, worked without rest, and expected the same of everyone around him.",
  "پسران و دخترانش را برای خدمت به ایران تربیت کرد و سنگین‌ترین انتظارها را از پسر بزرگ و ولیعهدش، محمدرضا، داشت. فرزندانش در خاطرات خانوادگی از مردی با عادت‌هایی ساده و انضباطی آهنین یاد می‌کنند؛ مردی که صبح زود از خواب برمی‌خاست، بی‌وقفه کار می‌کرد و همین را از همه اطرافیانش انتظار داشت."),

 ("The young royal children, raised to serve the nation their father was building.",
  "فرزندان خردسال خاندان سلطنتی، که برای خدمت به کشوری تربیت می‌شدند که پدرشان در حال ساختنش بود."),

 ("To his children he was the fixed point around which the whole household turned. They remembered his rare smiles as precious things, and carried his example, his devotion to Iran above all else, for the rest of their lives.",
  "برای فرزندانش نقطه ثابتی بود که تمام خانه حول آن می‌چرخید. لبخندهای کمیابش را چون خاطراتی گران‌بها به یاد داشتند و سرمشق او، یعنی دلبستگی‌اش به ایران بیش از هر چیز دیگری، را تا پایان عمر با خود داشتند."),

 ("The Gathering War", "جنگی که در راه بود"),

 ("When the Second World War broke out, Iran declared itself neutral, as it had in the first. But its geography, and its railway, made neutrality almost impossible to defend.",
  "وقتی جنگ جهانی دوم درگرفت، ایران خود را بی‌طرف اعلام کرد، همان‌طور که در جنگ جهانی اول کرده بود. اما موقعیت جغرافیایی ایران و راه‌آهنش، حفظ این بی‌طرفی را تقریباً ناممکن می‌کرد."),

 ("The Persian Corridor", "کریدور ایران"),
 ("The invasion", "حمله"),

 ("On 25 August 1941, British forces invaded from the south and Soviet forces from the north. The army that Reza Shah had spent his reign building, the pride of his modern state, was overwhelmed within days by the two great powers striking together.",
  "در ۳ شهریور ۱۳۲۰، نیروهای بریتانیا از جنوب و نیروهای شوروی از شمال به ایران حمله کردند. ارتشی که رضاشاه تمام دوران سلطنتش را صرف ساختن آن کرده بود و مایه افتخار دولت مدرنش بود، ظرف چند روز زیر حمله هم‌زمان دو قدرت بزرگ از پا درآمد."),

 ("Abdication and Exile", "کناره‌گیری و تبعید"),
 ("The hardest choice", "سخت‌ترین انتخاب"),

 ("With foreign armies in his country and his own overwhelmed, Reza Shah faced an impossible position. Rather than see the dynasty destroyed and Iran left leaderless under occupation, he chose to step aside so that the crown might pass to his son.",
  "با حضور ارتش‌های بیگانه در کشور و از پا درآمدن ارتش خودش، رضاشاه در موقعیتی ناممکن قرار گرفت. به‌جای آنکه شاهد از میان رفتن سلسله و بی‌سرپرست ماندن ایران در دوران اشغال باشد، کنار رفت تا تاج به پسرش برسد."),

 ("On 16 September 1941, under direct British pressure, Reza Shah abdicated in favor of his twenty one year old son, Mohammad Reza Pahlavi. He signed the document without hesitation, and in doing so handed his son both a throne and a nation under occupation.",
  "در ۲۵ شهریور ۱۳۲۰، زیر فشار مستقیم بریتانیا، رضاشاه به نفع پسر بیست‌ویک‌ساله‌اش، محمدرضا پهلوی، از سلطنت کناره گرفت. سند را بی‌درنگ امضا کرد و با این کار، هم تاج‌وتخت را به پسرش سپرد و هم کشوری را که در اشغال بود."),

 ("He built modern Iran almost single handedly, in only sixteen years.",
  "او تقریباً به‌تنهایی ایران مدرن را ساخت، آن هم تنها در شانزده سال."),

 ("He was a hard man in a hard time, and he asked much of his country and his family. Yet his devotion to Iran never wavered, and the modern nation his son would inherit, and that Iranians would carry forward, was in great part his to build. He gave his life to the making of modern Iran.",
  "مردی سخت بود در روزگاری سخت و از کشور و خانواده‌اش بسیار می‌خواست. با این همه، دلبستگی‌اش به ایران هرگز تزلزل پیدا نکرد و ایران مدرنی که پسرش به ارث برد و ایرانیان آن را به پیش بردند، تا حد زیادی حاصل کار او بود. او زندگی‌اش را وقف ساختن ایران مدرن کرد."),

 ("From a mountain village, he built a nation.",
  "از یک روستای کوهستانی برخاست و ملتی ساخت."),
]

# Apostrophes in the file are spelled variously, so these match on a
# fragment that has none.
ANCHORED = [
 ("His father, an officer, died when Reza was only a few months old",
  "پدرش که افسر بود، وقتی رضا تنها چند ماه داشت درگذشت. مادرش نوزادش را در میان برف‌های زمستان به سوی تهران برد تا نزد خویشاوندان برود؛ سفری که نزدیک بود جان هر دویشان را بگیرد. بدون ثروت و پشتوانه بزرگ شد و از همان کودکی، سختی‌ها و اراده سرسخت خودش شخصیتش را شکل دادند."),
 ("They demanded that Iran expel its German nationals",
  "آنها از ایران خواستند اتباع آلمانی را اخراج کند و اجازه دهد تدارکات متفقین آزادانه از خاک کشور عبور کند. رضاشاه، که سربلند بود و حاضر نبود بی‌طرفی کشورش را واگذار کند، تلاش کرد مذاکره کند، نه اینکه صرفاً تسلیم شود."),
 ("He had little patience for luxury or ceremony",
  "حوصله چندانی برای تجمل یا تشریفاتِ صرفاً تشریفاتی نداشت. چیزی که برایش اهمیت داشت، کارِ ساختن بود و با تمرکز و جدیتی شبیه یک سرباز، خود را وقف آن می‌کرد. بی‌خبر سرِ یک کارگاه، پادگان یا مدرسه حاضر می‌شد، بازرسی می‌کرد، سؤال می‌پرسید و کار را به جلو می‌راند."),
 ("It was a bitter blow. The very foundation",
  "ضربه‌ای تلخ بود. همان چیزی که پایه تمام کارهای زندگی‌اش بود، یعنی ایرانی نیرومند و مستقل، به دست همان قدرت‌های بیگانه‌ای اشغال شد که بیست سال تلاش کرده بود آنها را از کشور دور نگه دارد."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


p = "constants/education.ts"
s = open(p).read()
applied = 0

for en, fa in PAIRS:
    pat = re.compile(
        r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years): '"
        + re.escape(esc(en))
        + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
    )
    s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
    applied += n

for anchor, fa in ANCHORED:
    i = s.find(anchor)
    if i < 0:
        print("   anchor not found:", anchor[:44]); continue
    m = re.compile(r"(?:[a-zA-Z]*[Ff]a): '((?:[^'\\]|\\.)*)'").search(s, i)
    if not m:
        print("   no fa after:", anchor[:44]); continue
    s = s[:m.start(1)] + esc(fa) + s[m.end(1):]
    applied += 1

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS), "+", len(ANCHORED), "anchored")
for m in miss:
    print("   missed:", m)
