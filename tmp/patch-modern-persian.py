# Modern Iran, in Nojan's Persian.
#
# Only the pairs whose English is actually English. The extraction that
# produced this list picked up some Persian values as if they were the
# English key, then paired each with the *next* Persian field — so those
# entries are shifted duplicates of their neighbours, and applying them
# would put a paragraph where a heading belongs.
#
# Skipping them loses nothing: every real pair appears correctly in the
# entry above or below the artifact.

import os
import re

PAIRS = [
 ("The clergy",
  "روحانیت"),

 ("Objected to female suffrage, and to land reform reaching religious endowments. Some read the wider programme as reducing their place in Iranian life.",
  "با حق رأی زنان و نیز با گسترش اصلاحات ارضی به موقوفات مخالفت می‌کرد. برخی، مجموعهٔ گسترده‌تر این اصلاحات را تلاشی برای کم‌رنگ کردن جایگاه آنان در زندگی ایران می‌دانستند."),

 ("The secular left",
  "چپ سکولار"),

 ("Argued that change handed down from a throne, without a corresponding widening of political life, was incomplete.",
  "استدلال می‌کرد که تغییراتی که از بالا و از جانب سلطنت تحمیل می‌شوند، بدون گشایش هم‌زمان فضای سیاسی، ناقص‌اند."),

 ("The cities grew very fast, faster than housing or services could follow. The gap between those doing well from the boom and those newly arrived and struggling became visible in a way that was difficult to explain away, and that gap did more to shape what came next than any argument about doctrine.",
  "شهرها با سرعتی بسیار زیاد گسترش یافتند؛ سریع‌تر از آن‌که ساخت مسکن و توسعهٔ خدمات بتواند هم‌پای آن پیش برود. شکاف میان کسانی که از رونق اقتصادی بهره می‌بردند و تازه‌واردانی که با دشواری‌های زندگی دست‌وپنجه نرم می‌کردند، به‌وضوح دیده می‌شد و دیگر نمی‌شد به‌سادگی آن را نادیده گرفت. همین شکاف، بیش از هر بحث و جدل عقیدتی، در شکل‌گیری تحولات بعدی نقش داشت."),

 ("A cleric in exile",
  "روحانی‌ای در تبعید"),

 ("Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963, objecting in particular to women voting and to land reform touching religious endowments. He was arrested, and his arrest set off large riots in Qom and Tehran.",
  "روح‌الله خمینی، از روحانیان بلندپایهٔ قم، در سال ۱۳۴۲ «انقلاب سفید» را محکوم کرد و به‌ویژه با حق رأی زنان و با شمول اصلاحات ارضی نسبت به موقوفات مخالفت کرد. او بازداشت شد و بازداشتش به شورش‌های گسترده‌ای در قم و تهران انجامید."),

 ("In 1964 he was expelled from the country. That decision is worth pausing on: he could have been imprisoned indefinitely, and instead he was put on a plane.",
  "در سال ۱۳۴۳ از کشور تبعید شد. این تصمیم شایستهٔ کمی تأمل است: می‌توانستند او را برای همیشه در زندان نگه دارند، اما به‌جای آن، او را سوار هواپیما کردند و از کشور بیرون فرستادند."),

 ("He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes and carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no practical way to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in it.",
  "چهارده سال بعد را ابتدا در ترکیه، سپس در نجفِ عراق و بعد، برای مدتی کوتاه، در حومهٔ پاریس گذراند؛ و در تمام این سال‌ها به فعالیت خود ادامه داد. سخنرانی‌هایش روی نوار کاست ضبط می‌شد و مسافران و زائران آن‌ها را به ایران می‌آوردند. نوارها تکثیر می‌شدند و دست‌به‌دست می‌گشتند. در عمل، راه چندانی برای جلوگیری از جابه‌جایی نواری که در جیب کت کسی پنهان شده بود وجود نداشت. تا اواخر دههٔ ۱۳۵۰، مردی که بیش از یک دهه پا به ایران نگذاشته بود، به یکی از پرشنونده‌ترین صداهای کشور تبدیل شده بود."),

 ("Exile removed him from Iran. It did not remove him from Iranian ears.",
  "تبعید او را از ایران دور کرد، اما صدایش را از گوش ایرانیان دور نکرد."),

 ("Political life in those years ran within limits. SAVAK, the national intelligence and security organisation founded in 1957, handled internal security and counter-intelligence, and open opposition movements operated with difficulty. Religious spaces, meanwhile, kept their own life and their own gatherings, which is part of why the mosque networks proved so effective when 1978 came.",
  "زندگی سیاسی در آن سال‌ها در چارچوبی محدود جریان داشت. ساواک، سازمان اطلاعات و امنیت کشور که در سال ۱۳۳۵ تأسیس شده بود، مسئولیت امنیت داخلی و ضداطلاعات را بر عهده داشت و جریان‌های مخالفِ علنی به‌سختی می‌توانستند فعالیت کنند. در همین حال، محافل مذهبی همچنان مجالس و شبکه‌های اجتماعی خود را حفظ کرده بودند؛ و همین یکی از دلایلی بود که شبکهٔ مساجد در سال ۱۳۵۷ توانست چنین نقش مؤثری ایفا کند."),

 ("In January 1978 a newspaper article attacking Khomeini prompted protests in Qom. In Shia practice the dead are mourned again on the fortieth day, so each funeral produced another gathering forty days later, and each gathering produced the next. The cycle ran through the year and grew each time.",
  "در دی‌ماه ۱۳۵۶، انتشار مقاله‌ای در یکی از روزنامه‌ها که به خمینی حمله کرده بود، اعتراض‌هایی را در قم برانگیخت. در سنت شیعی، چهلم درگذشتگان نیز مراسم و گردهمایی ویژه‌ای دارد. بنابراین هر مراسم، چهل روز بعد به گردهمایی تازه‌ای می‌انجامید و هر گردهمایی نیز زمینهٔ گردهمایی بعدی را فراهم می‌کرد. این چرخه در طول سال ادامه یافت و هر بار ابعاد گسترده‌تری پیدا کرد."),

 ("On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it a negotiated settlement was much harder to reach. Strikes spread through the oil industry, the bazaar and the civil service. By December the country had largely stopped working.",
  "در ۱۷ شهریور ۱۳۵۷، نیروهای نظامی در میدان ژالهٔ تهران به سوی جمعیت بزرگی از معترضان آتش گشودند. این روز بعدها به «جمعهٔ سیاه» معروف شد و پس از آن، دستیابی به یک راه‌حل از طریق مذاکره بسیار دشوارتر شد. اعتصاب‌ها به صنعت نفت، بازار و دستگاه‌های دولتی گسترش یافت و تا آذرماه، بخش بزرگی از کشور عملاً از کار افتاده بود."),
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
                # Whole field to whole field. The English key can be any of
                # these; the Persian that follows is the next Fa-suffixed
                # key in the same object.
                pat = re.compile(
                    r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap): '"
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
