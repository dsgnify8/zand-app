# Modern Iran, third batch.
#
# Several of these revise wording from the first batch — the later version
# wins, which is what a second pass is for.

import os
import re

PAIRS = [
 ("Rose. Land of their own, schooling for their children, work in the new industries, and lives visibly better than their parents had.",
  "پیشرفت کردند. صاحب زمین شدند، فرزندانشان به مدرسه رفتند، در صنایع تازه‌تأسیس مشغول به کار شدند و زندگی‌ای داشتند که آشکارا از زندگی نسل پیشینشان بهتر بود."),

 ("Landowners",
  "زمین‌داران"),

 ("Large holdings were broken up. A class that had held land and influence for generations lost much of both.",
  "املاک بزرگ تجزیه و تقسیم شد. طبقه‌ای که نسل‌ها صاحب زمین و نفوذ بود، بخش بزرگی از هر دو را از دست داد."),

 ("Some farmers",
  "برخی از کشاورزان"),

 ("Received plots too small to support a family, with little credit to work them. Many sold and moved to the cities, arriving with nothing.",
  "قطعه‌زمین‌هایی دریافت کردند که برای تأمین زندگی یک خانواده کافی نبود و منابع مالی چندانی هم برای کشت و بهره‌برداری از آن در اختیارشان نبود. بسیاری زمین خود را فروختند و راهی شهرها شدند، بی‌آنکه چیزی جز دست خالی با خود داشته باشند."),

 ("The clergy",
  "روحانیت"),

 ("Objected to female suffrage, and to land reform reaching religious endowments. Some read the wider programme as reducing their place in Iranian life.",
  "با حق رأی زنان و نیز با تسری اصلاحات ارضی به موقوفات مخالفت کردند. برخی، مجموعه این اصلاحات را تلاشی برای کاستن از جایگاه روحانیت در زندگی اجتماعی و سیاسی ایران می‌دانستند."),

 ("The secular left",
  "چپ سکولار"),

 ("Argued that change handed down from a throne, without a corresponding widening of political life, was incomplete.",
  "استدلال می‌کرد که تغییراتی که از سوی سلطنت و از بالا به جامعه تحمیل می‌شود، اگر با گشایش هم‌زمان فضای سیاسی همراه نباشد، ناقص خواهد بود."),

 ("The cities grew very fast, faster than housing or services could follow. The gap between those doing well from the boom and those newly arrived and struggling became visible in a way that was difficult to explain away, and that gap did more to shape what came next than any argument about doctrine.",
  "شهرها با سرعتی بسیار زیاد گسترش یافتند؛ سریع‌تر از آنکه ساخت مسکن و گسترش خدمات بتواند هم‌پای این رشد پیش برود. شکاف میان کسانی که از رونق اقتصادی بهره‌مند شده بودند و تازه‌واردانی که برای گذران زندگی تقلا می‌کردند، روزبه‌روز آشکارتر شد؛ شکافی که دیگر نمی‌شد به‌سادگی نادیده‌اش گرفت یا برایش توجیهی آورد. و همین شکاف، بیش از هر بحث و جدل نظری، در شکل‌دادن به آنچه بعدتر رخ داد نقش داشت."),

 ("A cleric in exile",
  "روحانی‌ای در تبعید"),

 ("Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963, objecting in particular to women voting and to land reform touching religious endowments. He was arrested, and his arrest set off large riots in Qom and Tehran.",
  "روح‌الله خمینی، از روحانیان بلندپایه قم، در سال ۱۳۴۲ «انقلاب سفید» را محکوم کرد و به‌ویژه به حق رأی زنان و گسترش اصلاحات ارضی به موقوفات اعتراض داشت. او بازداشت شد و بازداشتش به شورش‌های گسترده‌ای در قم و تهران انجامید."),

 ("In 1964 he was expelled from the country. That decision is worth pausing on: he could have been imprisoned indefinitely, and instead he was put on a plane.",
  "در سال ۱۳۴۳ از کشور تبعید شد. این تصمیم درنگی کوتاه می‌طلبد: می‌توانستند او را برای مدتی نامحدود در زندان نگه دارند، اما به‌جای آن، سوار هواپیما شد و از کشور خارجش کردند."),

 ("Many families",
  "خیلی از خانواده‌ها"),
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
