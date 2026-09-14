# The Qajars, in Nojan's Persian.
#
# Thirty-six pairs. Matched whole field to whole field; anything carrying
# an apostrophe is anchored on a fragment without one instead, because
# the file spells them three different ways and matching the whole string
# has failed on that before.

import re

PAIRS = [
 ("The Qajar Dynasty", "سلسله قاجار"),
 ("A New Dynasty from the North", "سلسله‌ای تازه از شمال"),

 ("After the gentle Zand dynasty fell, a harder power rose to take its place. Agha Mohammad Khan, chief of the Qajar tribe of the north, fought his way to mastery over Iran and had himself crowned Shah in the last years of the eighteenth century.",
  "پس از فروپاشی سلسله زند، قدرتی سخت‌تر جای آن را گرفت. آقامحمدخان، سرکرده ایل قاجار در شمال، با جنگ و نبرد راه خود را به فرمانروایی بر ایران باز کرد و در واپسین سال‌های سده هجدهم تاج شاهی بر سر گذاشت."),

 ("He was a ruler of iron will and, by all accounts, fearsome cruelty, forged in a lifetime of struggle and captivity. But he reunited a country that had again fallen into division, and he founded a dynasty that would rule Iran for well over a century.",
  "فرمانروایی بود با اراده‌ای آهنین و، به روایت‌های مختلف، بی‌رحمی‌ای هولناک؛ شخصیتی که یک عمر کشمکش و اسارت او را چنین ساخته بود. اما کشوری را که دوباره دچار تفرقه شده بود یکپارچه کرد و سلسله‌ای بنیان گذاشت که بیش از یک قرن بر ایران فرمان راند."),

 ("The founder", "بنیان‌گذار"),
 ("A capital named Tehran", "پایتختی به نام تهران"),

 ("It was the Qajars who chose as their capital a modest town in the north of Iran, one that would grow, over their long rule and the ages after, into the great metropolis of the nation. That town was Tehran, and it has been the heart of Iran ever since.",
  "این قاجارها بودند که شهرکی ساده در شمال ایران را به پایتختی برگزیدند؛ شهرکی که در طول فرمانروایی طولانی آنان و در سال‌های پس از آن، به کلان‌شهر بزرگ کشور تبدیل شد. آن شهرک تهران بود و از آن زمان تاکنون قلب ایران بوده است."),

 ("Under the Qajars, Tehran became the capital it remains to this day.",
  "در دوره قاجار، تهران به پایتخت تبدیل شد و تا امروز پایتخت ایران مانده است."),

 ("The crown passed to Fath Ali Shah, whose long reign was famous for its splendour and ceremony, its jewelled court and its portraits of a bearded king in golden robes. But beyond the glitter of the court, storm clouds were gathering on the horizon.",
  "تاج شاهی به فتحعلی‌شاه رسید؛ شاهی که دوران طولانی سلطنتش به شکوه و تشریفات، دربار آراسته به جواهرات و تصویرهای شاهی ریش‌دار با جامه‌های زرین شهرت داشت. اما آن‌سوی زرق‌وبرق دربار، ابرهای توفان در افق در حال جمع شدن بودند."),

 ("Caught Between Empires", "گرفتار میان دو امپراتوری"),

 ("The nineteenth century was the age of the great European empires, and Iran found itself caught between two of the hungriest. To the north loomed the vast and expanding empire of Russia. To the east and south stretched the power of the British, masters of India.",
  "سده نوزدهم، عصر امپراتوری‌های بزرگ اروپایی بود و ایران خود را گرفتار میان دو تا از توسعه‌طلب‌ترین آن‌ها دید. در شمال، امپراتوری پهناور و رو به گسترش روسیه قد علم کرده بود. در شرق و جنوب، قدرت بریتانیا گسترده بود؛ قدرتی که بر هند فرمان می‌راند."),

 ("Between these two giants, Iran was squeezed, courted, and pressured, its fate bound up in a great game of empires that it had not the strength to control. It was a hard and humbling position for a proud and ancient nation.",
  "ایران میان این دو غول، تحت فشار بود، هر دو طرف می‌کوشیدند دلش را به دست بیاورند و هم‌زمان بر آن فشار می‌آوردند؛ سرنوشتش به بازی بزرگ امپراتوری‌ها گره خورده بود، بازی‌ای که توان کنترلش را نداشت. برای ملتی سربلند و کهن، جایگاهی سخت و تحقیرآمیز بود."),

 ("The wars with Russia", "جنگ‌های ایران و روسیه"),

 ("Twice in the early century Iran went to war with Russia over the lands of the Caucasus, and twice it was defeated by the superior arms and organization of the Russian armies. The cost of those defeats was severe, and it was paid in Iranian soil.",
  "در سال‌های آغازین آن قرن، ایران دو بار بر سر سرزمین‌های قفقاز با روسیه وارد جنگ شد و هر دو بار، در برابر سلاح‌ها و سازمان‌دهی برتر ارتش روسیه شکست خورد. بهای این شکست‌ها سنگین بود و با از دست رفتن بخشی از خاک ایران پرداخت شد."),

 ("A proud nation learned, painfully, that valour alone could not stand against modern empires.",
  "ملتی سربلند، به تلخی آموخت که دلاوری به‌تنهایی در برابر امپراتوری‌های مدرن کافی نیست."),

 ("The Reformer Who Was Lost", "اصلاحگری که از دست رفت"),
 ("Amir Kabir", "امیرکبیر"),
 ("A vision of a modern Iran", "چشم‌اندازی از ایران مدرن"),
 ("His vision", "چشم‌انداز او"),
 ("His enemies", "دشمنانش"),

 ("Iran lost, in one stroke, the greatest reformer of its age. It is one of history's saddest what-ifs.",
  "ایران در یک لحظه بزرگ‌ترین اصلاحگر روزگار خود را از دست داد. این یکی از غم‌انگیزترین «اگر»های تاریخ است."),

 ("What Iran might have become, had Amir Kabir been allowed to finish his work, is one of the great questions of the nation's history. His death was a tragedy, and the reforms he began were largely undone.",
  "اینکه اگر می‌گذاشتند امیرکبیر کارش را به پایان برساند، ایران چه می‌توانست بشود، یکی از پرسش‌های بزرگ تاریخ این ملت است. مرگش یک تراژدی بود و بیشتر اصلاحاتی که آغاز کرده بود، از میان رفت."),

 ("The Awakening of a Nation", "بیداری یک ملت"),

 ("As the century wore on, the kings sold ever more of the nation's wealth and rights to foreign powers and companies, granting concessions over tobacco, banking, oil, and more, to fill an empty treasury. But the people of Iran were beginning to stir.",
  "هرچه قرن پیش می‌رفت، شاهان بخش بیشتری از ثروت و حقوق این ملت را به قدرت‌ها و شرکت‌های بیگانه واگذار می‌کردند؛ امتیاز تنباکو، بانک، نفت و بسیاری چیزهای دیگر را می‌فروختند تا خزانه تهی را پر کنند. اما مردم ایران کم‌کم داشتند به حرکت درمی‌آمدند."),

 ("The Tobacco Protest", "نهضت تنباکو"),

 ("For the first time, the people had spoken with one voice, and the throne had been made to listen.",
  "برای نخستین بار، مردم یکصدا سخن گفته بودند و شاه ناچار شده بود صدای آنها را بشنود."),

 ("The Constitutional Revolution", "انقلاب مشروطه"),

 ("The Tobacco Protest was only the beginning. The demand grew for a government of laws rather than the whim of kings, and in 1906 the movement triumphed. The Shah was compelled to grant a constitution and to establish the Majles, the national parliament, the first in Iranian history.",
  "نهضت تنباکو تنها آغاز کار بود. خواستِ برپایی حکومتی بر پایه قانون، به‌جای اراده و هوس شاهان، روزبه‌روز بیشتر شد و در سال ۱۲۸۵ خورشیدی این جنبش به پیروزی رسید. شاه ناچار شد فرمان مشروطیت را صادر کند و مجلس شورای ملی را برپا سازد؛ نخستین مجلس در تاریخ ایران."),

 ("A nation had awoken to the idea that it belonged to its people.",
  "ملتی بیدار شده بود و به این باور رسیده بود که کشورش از آنِ مردم است."),

 ("The End of an Age", "پایان یک دوران"),
 ("A soldier steps forward", "سربازی پا پیش می‌گذارد"),

 ("The Qajar century closed, and the Pahlavi age of modern Iran began.",
  "قرن قاجار به پایان رسید و دوران پهلوی و ایران مدرن آغاز شد."),

 ("From the trials of the Qajar century, a new and modern Iran was struggling to be born. And when at last it emerged, it would carry forward both the wounds and the awakenings of these long and difficult years.",
  "از دل سختی‌ها و آزمون‌های قرن قاجار، ایرانی تازه و مدرن در تلاش بود تا متولد شود. و وقتی سرانجام سر برآورد، هم زخم‌های این سال‌های طولانی و دشوار را با خود به آینده برد و هم بیداری‌هایی را که در همین دوران شکل گرفته بود."),

 ("In its century of hardship, the nation found its own voice.",
  "ملت در قرنِ سختی، صدای خودش را پیدا کرد."),
]

# Apostrophes in the file are spelled variously, so these match on a
# fragment that has none.
ANCHORED = [
 ("In the middle of the century there rose a man who saw clearly",
  "همه افول ایران را نپذیرفتند. در میانه آن قرن، مردی برخاست که به‌روشنی می‌دید کشورش به چه نیاز دارد و کوشید در چند سال کوتاه، آن را به جهان مدرن وارد کند. نامش امیرکبیر بود؛ صدراعظم شاه جوان، ناصرالدین‌شاه."),
 ("exiled, and soon after put to death",
  "اما همین موفقیت برایش دشمن تراشید. درباریانی که فسادشان را در خطر می‌دیدند و از نفوذ او بر شاه جوان می‌ترسیدند، شاه را علیه او برانگیختند. در سال ۱۲۳۰ خورشیدی، از کار برکنار و تبعید شد و اندکی بعد، به فرمان شاه، در حمام فین کاشان به قتل رسید."),
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
