# -*- coding: utf-8 -*-
# Adds the Farsi translation to the Ebi article.
# Every block is matched on a distinctive slice of its English text, and the
# script refuses to write unless every single one is found.

p = "constants/articles.ts"
s = open(p).read()

# article-level fields, inserted right after subject: 'Ebi',
HEAD_ANCHOR = "  subject: 'Ebi',"
HEAD_ADD = """  subject: 'Ebi',
  subjectFa: 'ابی',
  kickerFa: 'موسیقی',
  titleFa: 'پنجاه سال صدایی که قرار بود شنیده نشود',
  standfirstFa: 'ابراهیم حامدی در سال ۱۹۷۷ برای یک تور رفت و دیگر برنگشت. ممنوعیتی که در پی آن آمد، مخاطبش را کم نکرد. چند برابر کرد.',
  excerptFa: 'در ۱۹۷۷ برای یک تور رفت و دیگر برنگشت. ممنوعیت، مخاطبش را کم نکرد.',"""

# (english fragment, farsi text)
PAIRS = [
 ("Before he was a pop singer he was a boy reciting the Quran",
  "پیش از آنکه خوانندهٔ پاپ باشد، پسربچه‌ای بود که قرآن می‌خواند. خودش گفته است که خواندن از همان‌جا شروع شد، و این در تکنیکش پیداست: نفسی که بلند نگه داشته می‌شود، نتی که بدون فشار کشیده می‌شود، و معنایی که با وزن منتقل می‌شود نه با بلندی صدا."),

 ("Ebrahim Hamedi was born in 1949, the eldest of six",
  "ابراهیم حامدی در سال ۱۹۴۹ به دنیا آمد، بزرگ‌ترینِ شش فرزند. پدرش اهل اراک بود و مادرش اهل کرج. در خانه می‌خواند، برای هم‌کلاسی‌ها می‌خواند، برای بچه‌های کوچه می‌خواند. هنوز هیچ‌کدام حرفه نبود. عادتی بود که اتفاقاً استعداد هم بود."),

 ("Then the Beatles reached Tehran",
  "بعد بیتلز به تهران رسید. اواسط دههٔ شصت میلادی، گروهی به نام ریبلز را با شهرام شب‌پره و سیاوش قمیشی راه انداخت. از سان‌بویز و بلک‌کتس هم گذشت. اوایل دههٔ هفتاد دیگر یکی از چند صدا نبود؛ همان صدایی بود که مردم برایش می‌آمدند."),

 ("The tour that never ended",
  "توری که تمام نشد"),

 ("In 1977 he flew to the United States to tour",
  "در سال ۱۹۷۷ برای اجرا به آمریکا رفت. دو سال بعد انقلاب شد و او دیگر برنگشت. ترتیب ماجرا مهم است: فرار نکرد. برای کار رفت، و کشوری که پشت سر گذاشته بود، در غیاب او دیگر وجود نداشت."),

 ("He packed for a tour. He has been on it",
  "چمدانش را برای یک تور بست. نزدیک پنجاه سال است که در همان تور است."),

 ("What happened next is the part that makes his career strange",
  "آنچه بعد اتفاق افتاد، همان چیزی است که کارنامه‌اش را عجیب می‌کند. موسیقی‌اش در ایران ممنوع شد. پخشش جرم بود. و مخاطبش داخل کشور همچنان بیشتر شد؛ دست‌به‌دست روی نوار کاست، بعد ماهواره، بعد اینترنت، تا جایی که سه نسل همان ترانه‌ها را از بر شدند بی‌آنکه حتی یک‌بار از رادیوی خانه شنیده باشندشان."),

 ("The ban did not remove him from Iranian life",
  "ممنوعیت او را از زندگی ایرانی حذف نکرد. به زیرزمین بردش، جایی که به چیزی شبیه یک میراث مشترک تبدیل شد."),

 ("The records that stuck",
  "آلبوم‌هایی که ماندند"),

 ("In 1990 he and Dariush released Noon O Panir O Sabzi",
  "در سال ۱۹۹۰ با داریوش آلبوم «نون و پنیر و سبزی» را منتشر کرد و در سالن یونیورسال روی صحنه رفتند. در همان دوره «خلیج» را خواند، ترانه‌ای دربارهٔ خلیج فارس با شعر عادل حسنی و آهنگ محمد شمس. گفته است یکی از معدود اجراهای خودش است که به آن افتخار می‌کند."),

 ("The 1995 album Setarehaye Sorbi is the one that settled",
  "آلبوم «ستاره‌های سربی» در سال ۱۹۹۵ همان کاری است که بحث را تمام کرد. شعر از ایرج جنتی عطایی و آهنگ از سیاوش قمیشی. وقتی من‌وتو بعدها از بینندگانش خواست بیست ترانهٔ برترش را انتخاب کنند، دو ترانهٔ اول هر دو از همین آلبوم بودند."),

 ("Singing at the state",
  "خواندن رو‌به‌روی قدرت"),

 ("He has never treated the politics as separate from the work",
  "هیچ‌وقت سیاست را از کارش جدا ندانسته است. «حالا» که در سال ۱۹۹۹ منتشر شد، شعری از مینا اسدی بود با کار اسفندیار منفردزاده؛ خودش آن را مهم‌ترین ترانهٔ سیاسی‌اش خوانده است. در سال ۲۰۰۹ با «تصمیم» به انتخابات جنجالی ریاست‌جمهوری پاسخ داد. در سال ۲۰۱۹ «کوچهٔ نسترن» به جنگ ایران و عراق و جوان‌هایی که در آن از دست رفتند پرداخت، و دقیقاً همان بحثی را برانگیخت که انتظارش می‌رفت."),

 ("In 2022 he stood outside the United Nations",
  "در سال ۲۰۲۲ مقابل سازمان ملل ایستاد تا به حضور ابراهیم رئیسی اعتراض کند، و از اعتراض‌هایی که پس از مرگ مهسا امینی شکل گرفت حمایت کرد. تعریف خودش ساده است و دهه‌هاست آن را تکرار می‌کند."),

 ("I have always sung for my roots",
  "من همیشه برای ریشه‌هایم خوانده‌ام."),

 ("Still working",
  "هنوز کار می‌کند"),

 ("In 2014 he recorded Nostalgia with Googoosh",
  "در سال ۲۰۱۴ آلبوم «نوستالژی» را با گوگوش ضبط کرد و با آن به تور رفت؛ شروعش دبی بود. دو صدای تبعیدی از یک دوران رادیویی از دست رفته، روی یک صحنه، برای سالن‌هایی پر از آدم‌هایی که با هر دو بزرگ شده بودند. سخت بتوان خلاصهٔ دقیق‌تری از سرنوشت پاپ ایرانی بعد از ۱۹۷۹ پیدا کرد."),

 ("The numbers are large and not really the point",
  "عددها بزرگ‌اند و چندان مهم نیستند: بیش از سی آلبوم، نزدیک دویست تک‌آهنگ، شب‌های پر در رویال آلبرت هال، ومبلی و اپرای سیدنی. از ازدواج اولش که بیست‌وپنج سال طول کشید سه دختر دارد، اوایل دههٔ ۲۰۰۰ در سوئد زندگی می‌کرد و حالا بین ماربیا و لس‌آنجلس در رفت‌وآمد است."),

 ("The country that banned him has never stopped listening",
  "کشوری که ممنوعش کرد، هیچ‌وقت از شنیدنش دست نکشید."),
]

missing = [en for en, _ in PAIRS if en not in s]
if missing:
    print("ABORT: could not find", len(missing), "block(s):")
    for m in missing:
        print("   -", m[:60])
    raise SystemExit

if HEAD_ANCHOR not in s:
    print("ABORT: subject anchor not found"); raise SystemExit
if "subjectFa: 'ابی'" in s:
    print("ABORT: farsi already applied"); raise SystemExit

# apply article-level fields
s = s.replace(HEAD_ANCHOR, HEAD_ADD, 1)

# apply each block: insert fa right after the closing quote of that block's x value
applied = 0
for en, fa in PAIRS:
    i = s.find(en)
    if i == -1:
        print("ABORT mid-run:", en[:40]); raise SystemExit
    # find the end of this x string: the closing ' followed by  }
    j = s.find("' }", i)
    if j == -1:
        print("ABORT: could not find end of block for", en[:40]); raise SystemExit
    s = s[:j+1] + ", fa: '" + fa + "'" + s[j+1:]
    applied += 1

open(p, "w").write(s)
print("blocks translated:", applied, "of", len(PAIRS))
print("article fields added:", "titleFa: 'پنجاه" in s)
