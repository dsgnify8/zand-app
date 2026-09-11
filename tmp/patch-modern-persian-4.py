# Modern Iran, fourth batch — the revolution and the new order.

import os
import re

PAIRS = [
 ("He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes and carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no practical way to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in it.",
  "چهارده سال بعد را ابتدا در ترکیه، سپس در نجفِ عراق و بعد، برای مدتی کوتاه، در حومه پاریس گذراند و در تمام این سال‌ها به فعالیت خود ادامه داد. سخنرانی‌هایش روی نوار کاست ضبط می‌شد، مسافران و زائران آن‌ها را به ایران می‌آوردند، نوارها تکثیر می‌شدند و دست‌به‌دست می‌گشتند. در عمل، راهی برای جلوگیری از جابه‌جایی نواری که در جیب کت کسی گذاشته شده بود وجود نداشت. تا اواخر دهه ۱۳۵۰، مردی که بیش از یک دهه پا به ایران نگذاشته بود، به یکی از شنیده‌شده‌ترین صداهای کشور تبدیل شده بود."),

 ("Exile removed him from Iran. It did not remove him from Iranian ears.",
  "تبعید او را از ایران دور کرد، اما صدایش را از گوش ایرانیان دور نکرد."),

 ("Political life in those years ran within limits. SAVAK, the national intelligence and security organisation founded in 1957, handled internal security and counter-intelligence, and open opposition movements operated with difficulty. Religious spaces, meanwhile, kept their own life and their own gatherings, which is part of why the mosque networks proved so effective when 1978 came.",
  "زندگی سیاسی در آن سال‌ها در چارچوبی محدود جریان داشت. ساواک، سازمان اطلاعات و امنیت کشور که در سال ۱۳۳۵ تأسیس شده بود، مسئولیت امنیت داخلی و ضداطلاعات را بر عهده داشت و جریان‌های مخالفِ علنی به‌سختی می‌توانستند فعالیت کنند. در همین حال، محافل مذهبی زندگی و گردهمایی‌های خودشان را حفظ کرده بودند؛ و همین یکی از دلایلی بود که شبکه مساجد در سال ۱۳۵۷ توانست چنین نقش مؤثری ایفا کند."),

 ("The year it broke",
  "سالی که همه‌چیز از هم گسست"),

 ("In January 1978 a newspaper article attacking Khomeini prompted protests in Qom. In Shia practice the dead are mourned again on the fortieth day, so each funeral produced another gathering forty days later, and each gathering produced the next. The cycle ran through the year and grew each time.",
  "در دی‌ماه ۱۳۵۶، انتشار مقاله‌ای در یکی از روزنامه‌ها که به خمینی حمله کرده بود، اعتراض‌هایی را در قم برانگیخت. در سنت شیعه، برای درگذشتگان در چهلمین روز نیز مراسمی برگزار می‌شود. به این ترتیب، هر مراسم چهل روز بعد به گردهمایی دیگری می‌انجامید و هر گردهمایی نیز زمینه‌ساز گردهمایی بعدی می‌شد. این چرخه در طول سال ادامه پیدا کرد و هر بار گسترده‌تر شد."),

 ("On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it a negotiated settlement was much harder to reach. Strikes spread through the oil industry, the bazaar and the civil service. By December the country had largely stopped working.",
  "در ۱۷ شهریور ۱۳۵۷، نیروهای نظامی در میدان ژاله تهران به سوی جمعیت بزرگی از معترضان آتش گشودند. این روز بعدها به «جمعه سیاه» معروف شد و پس از آن، رسیدن به یک راه‌حل از طریق مذاکره بسیار دشوارتر شد. اعتصاب‌ها به صنعت نفت، بازار و دستگاه‌های دولتی کشیده شد و تا آذرماه، بخش بزرگی از کشور عملاً از کار افتاده بود."),

 ("On 16 January 1979 the Shah left Iran. Photographs from that morning show him weeping on the tarmac, something no one had seen from him before. He had spent thirty-seven years on the throne and had built much of what stood around him, and he left rather than remain somewhere he was no longer wanted, and rather than turn the army fully on the crowds.",
  "در ۲۶ دی ۱۳۵۷، شاه از ایران رفت. عکس‌های آن صبح او را در حالی نشان می‌دهند که روی باند فرودگاه گریه می‌کند؛ چیزی که پیش از آن کسی از او ندیده بود. سی‌وهفت سال بر تخت سلطنت نشسته بود و بخش بزرگی از آنچه در اطرافش ساخته شده بود، حاصل همان دوران بود. با این حال، رفت؛ به‌جای آنکه در کشوری بماند که دیگر او را نمی‌خواست، و به‌جای آنکه ارتش را تمام‌قد به روی جمعیت به حرکت درآورد."),

 ("He did not fall in a battle. He walked out of a country that had stopped seeing him.",
  "در میدان نبرد سقوط نکرد. از کشوری بیرون رفت که دیگر او را به چشم حاکم خود نمی‌دید."),

 ("On 1 February Khomeini flew into Tehran and several million people came out to meet him. In April a referendum was held on becoming an Islamic republic, and the result was overwhelming.",
  "در ۱۲ بهمن، خمینی با هواپیما به تهران آمد و چند میلیون نفر برای استقبال از او به خیابان‌ها آمدند. در فروردین، همه‌پرسی درباره تبدیل کشور به جمهوری اسلامی برگزار شد و نتیجه قاطع بود."),

 ("One thing about that moment is often forgotten. The coalition that removed the monarchy was extremely broad: communists, liberal nationalists, bazaar merchants, students, clerics, and a great many people with no politics at all who simply wanted something different. Within two years it was not broad at all. What happened in between is the next chapter.",
  "یک نکته درباره آن دوره اغلب از یاد می‌رود. ائتلافی که سلطنت را کنار زد، بسیار گسترده بود: کمونیست‌ها، ملی‌گرایان لیبرال، بازاری‌ها، دانشجویان، روحانیان و خیلی‌های دیگری که اصلاً کاری به سیاست نداشتند و فقط می‌خواستند اوضاع طور دیگری باشد. دو سال بعد، دیگر خبری از آن گستردگی نبود. آنچه در این فاصله اتفاق افتاد، موضوع فصل بعد است."),

 ("The New Order",
  "نظم تازه"),

 ("1979 - 1981",
  "۱۳۵۷ تا ۱۳۶۰"),

 ("Revolutionary courts were established within weeks. They sat quickly, often at night, frequently without defence counsel, and sentences were carried out at once.",
  "دادگاه‌های انقلاب ظرف چند هفته تشکیل شدند. رسیدگی‌ها سریع انجام می‌شد، اغلب شب‌ها و بیشتر وقت‌ها بدون حضور وکیل مدافع؛ و حکم‌ها نیز بی‌درنگ اجرا می‌شدند."),

 ("The armed forces went first. Iran’s most senior officers, generals who had spent their entire working lives in the service of the country, were brought before the courts one after another and shot. Many of them had trained abroad, commanded the country’s defence for decades, and had no political role at all. The charge, broadly, was that they had served.",
  "اول از همه سراغ نیروهای مسلح رفتند. بلندپایه‌ترین افسران ایران، ژنرال‌هایی که تمام عمر کاری‌شان را در خدمت کشور گذرانده بودند، یکی پس از دیگری به دادگاه برده و تیرباران شدند. خیلی‌هایشان در خارج از کشور آموزش دیده بودند، دهه‌ها فرماندهی دفاع کشور را بر عهده داشتند و اصلاً نقشی سیاسی نداشتند. اتهام، در یک کلام، این بود که خدمت کرده بودند."),

 ("The purge widened from there. Ministers, provincial governors, senior police, court officials, and men who had held office years earlier and retired quietly. In practice almost anything that still carried the mark of the old order was a target, and the reach of that went further than people expect: the Shah’s own horses were killed, for no reason beyond whose horses they had been.",
  "پاکسازی از همان‌جا گسترده‌تر شد. وزیران، استانداران، فرماندهان ارشد پلیس، مقام‌های دربار و کسانی که سال‌ها پیش مقامی داشتند و بی‌سروصدا بازنشسته شده بودند، همگی هدف قرار گرفتند. در عمل، تقریباً هر چیزی که هنوز نشانی از نظم قدیم داشت، می‌توانست هدف باشد؛ و دامنه این پاکسازی حتی از آنچه تصور می‌شود فراتر رفت: اسب‌های خود شاه را هم کشتند، فقط به این دلیل که اسب‌های او بودند."),

 ("It was not only people who were being removed. It was every trace.",
  "فقط آدم‌ها را کنار نمی‌زدند؛ هر ردی را هم پاک می‌کردند."),

 ("The effect on the military was severe and immediate. Thousands of officers were dismissed, imprisoned or executed, and the air force in particular lost most of its senior command in the space of a year. The consequences of that arrived faster than anyone had planned for, and they are the subject of the chapter after this one.",
  "تأثیر این پاکسازی بر ارتش شدید و فوری بود. هزاران افسر برکنار، زندانی یا اعدام شدند و نیروی هوایی، به‌ویژه، در فاصله یک سال بخش بزرگی از فرماندهان ارشد خود را از دست داد. پیامدهای این اتفاق خیلی زودتر از آنچه کسی انتظار داشت خودشان را نشان دادند، و موضوع فصل بعدی همین کتاب‌اند."),

 ("Hoveyda",
  "هویدا"),
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
                    r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years): '"
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
