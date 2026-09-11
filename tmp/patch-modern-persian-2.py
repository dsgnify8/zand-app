# Modern Iran, second batch.
#
# Applied exactly as written. No date conversion beyond what Nojan did
# himself — Gregorian stays wherever he left it.

import os
import re

PAIRS = [
 ("Iran Since the Revolution",
  "ایران از انقلاب تاکنون: جنگ، فرمانروایانی که پس از آن آمدند، و سقوطی طولانی و پیوسته در ارزش پول ملی. آنچه بر کشور گذشت، به ترتیب، و تا حد ممکن ساده و روشن."),

 ("How It Began",
  "آغاز ماجرا"),

 ("1963 - 1979",
  "۱۳۴۲ تا ۱۳۵۷"),

 ("The Iran that exists today began in 1979. Everything since, the war, the money, the leaders, the arguments at every dinner table, runs back to that year.",
  "ایرانِ امروز، از سال ۱۳۵۷ شکل گرفت. هرآنچه پس از آن رخ داده است—از جنگ و پول و رهبران گرفته تا بحث‌هایی که بر سر هر سفره‌ای درمی‌گیرد—به همان سال بازمی‌گردد."),

 ("This is the hardest chapter in this book to write, because it is not finished. It is not a settled history that everyone has agreed on. It is still being lived, by people who were there and by their children, and almost every family holds a different piece of it.",
  "نوشتن این فصل از همه فصل‌های این کتاب دشوارتر است، چون هنوز به پایان نرسیده. این تاریخی نیست که درباره‌اش اجماعی شکل گرفته باشد و همه روایت واحدی از آن داشته باشند. این تاریخ هنوز در زندگی کسانی که آن روزها را به چشم دیده‌اند و در زندگی فرزندانشان جریان دارد، و تقریباً هر خانواده بخشی متفاوت از آن را در حافظه خود دارد."),

 ("So this is not a verdict. It is an account: what happened, in order, from the years before the Shah left to where the country stands now. Where the facts are clear they are stated plainly. Where people saw the same events and drew opposite conclusions, both are set down.",
  "پس اینجا قرار نیست حکمی صادر شود؛ قرار است روایتی از آنچه رخ داد ارائه شود: به ترتیب، از سال‌های پیش از رفتن شاه تا جایی که کشور امروز در آن ایستاده است. هرجا واقعیت روشن باشد، همان‌طور روشن و بی‌پیرایه بیان می‌شود. و هرجا مردم یک رویداد واحد را دیده‌اند اما از آن به نتایجی کاملاً متفاوت رسیده‌اند، هر دو روایت در کنار هم آورده می‌شود."),

 ("Begin where it begins, and let the record speak.",
  "از همان‌جایی آغاز کنیم که ماجرا آغاز شد، و بگذاریم اسناد خود سخن بگویند."),

 ("The White Revolution",
  "انقلاب سفید"),

 ("In 1963 Mohammad Reza Shah announced a programme he called the White Revolution: a revolution from above, made without bloodshed. His stated ambition was to move Iran, within a single generation, from a largely agricultural country into the front rank of nations.",
  "در سال ۱۳۴۲، محمدرضا شاه برنامه‌ای را اعلام کرد که آن را «انقلاب سفید» نامید؛ انقلابی از بالا، بدون خون‌ریزی. هدفی که او برای این برنامه اعلام می‌کرد، آن بود که ایران در فاصله یک نسل، از کشوری عمدتاً کشاورزی به یکی از کشورهای پیشرو جهان تبدیل شود."),

 ("It is worth remembering what Iran looked like before it. Most people worked land they did not own. Literacy outside the cities was low. Electricity, running water and roads reached only part of the country. The modern industrial economy had barely begun.",
  "بد نیست به یاد بیاوریم ایران پیش از آن چه وضعی داشت. بیشتر مردم روی زمین‌هایی کار می‌کردند که مالکشان نبودند. میزان باسوادی در خارج از شهرها پایین بود. برق، آب لوله‌کشی و راه‌های ارتباطی تنها به بخشی از کشور رسیده بود. اقتصاد صنعتی مدرن نیز هنوز در آغاز راه بود."),

 ("The programme set out to change all of that at once. Large estates were broken up and the land distributed to the farmers working it. Factories were required to share profits with their workers. Forests and waterways passed to the state. A literacy corps of young conscripts was sent into the villages to teach, and a health corps followed them. Roads, dams, power stations and universities were built at a pace the country had never seen.",
  "این برنامه می‌خواست همه این وضعیت را یک‌باره دگرگون کند. املاک بزرگ در چارچوب اصلاحات ارضی تقسیم شد و زمین‌ها به کشاورزانی رسید که روی آن‌ها کار می‌کردند. کارخانه‌ها موظف شدند بخشی از سود خود را با کارگرانشان سهیم شوند. جنگل‌ها و منابع آبی در اختیار دولت قرار گرفت. سپاه دانش، متشکل از سربازان جوان، برای آموزش به روستاها اعزام شد و پس از آن، سپاه بهداشت نیز به روستاها رفت. جاده‌ها، سدها، نیروگاه‌ها و دانشگاه‌ها با سرعتی ساخته شدند که کشور تا آن زمان به خود ندیده بود."),

 ("And women were given the vote. They could stand for parliament, and did. The legal age of marriage was raised, family law was reformed to give women rights in divorce and custody, and by the 1970s Iranian women were serving as ministers, judges, ambassadors, doctors and pilots.",
  "زنان نیز حق رأی به دست آوردند. می‌توانستند برای نمایندگی مجلس نامزد شوند، و چنین کردند. سن قانونی ازدواج افزایش یافت و قوانین خانواده اصلاح شد تا زنان از حقوق بیشتری در زمینه طلاق و حضانت برخوردار شوند. تا دهه ۱۳۵۰، زنان ایرانی در مقام وزیر، قاضی، سفیر، پزشک و خلبان فعالیت می‌کردند."),

 ("Within a decade Iran had gone from the edge of the modern world to a seat at its table.",
  "ایران در فاصله یک دهه، از حاشیه جهان مدرن به جایگاهی در میان قدرت‌های آن رسید."),

 ("With the oil revenues of the 1970s the money arriving in the country was extraordinary. Iran bought advanced technology, built an air force among the most capable anywhere, hosted world leaders, and was spoken of as a coming power. For a great many Iranians those years were the best their families had ever had.",
  "با افزایش درآمدهای نفتی در دهه ۱۳۵۰، حجم پولی که وارد کشور می‌شد بی‌سابقه بود. ایران فناوری‌های پیشرفته خرید، یکی از قدرتمندترین نیروهای هوایی جهان را ساخت، میزبان رهبران کشورهای مختلف شد و از آن به‌عنوان قدرتی نوظهور در عرصه جهانی یاد می‌کردند. برای بسیاری از ایرانیان، آن سال‌ها بهترین دورانی بود که خانواده‌هایشان تا آن زمان تجربه کرده بودند."),

 ("What people experienced",
  "آنچه مردم تجربه کردند"),

 ("A programme that large touches everyone differently, and the reactions to it varied enormously depending on who you were.",
  "برنامه‌ای با چنین ابعادی، زندگی آدم‌ها را به شکل‌های متفاوتی تحت تأثیر قرار می‌دهد؛ و واکنش‌ها به آن نیز، بسته به اینکه چه کسی و از چه جایگاهی بودید، تفاوت بسیاری داشت."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


roots = ["constants", "components", "app"]
touched = set()
applied = 0

for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            p = os.path.join(dirpath, f)
            s = open(p).read()
            before = s

            for en, fa in PAIRS:
                pat = re.compile(
                    r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb): '"
                    + re.escape(esc(en))
                    + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
                )
                s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
                applied += n

            if s != before:
                open(p, "w").write(s)
                touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = ""
for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if f.endswith((".ts", ".tsx")):
                blob += open(os.path.join(dirpath, f)).read()

miss = [en[:56] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
