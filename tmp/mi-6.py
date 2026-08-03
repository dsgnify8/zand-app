# -*- coding: utf-8 -*-
# Modern Iran, chapter two: the new order, Hoveyda, the embassy, the
# constitution. دادگاه انقلاب, ولایت فقیه, سفارت آمریکا, لانهٔ جاسوسی.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'Revolutionary courts were established within weeks. They sat quickly, often at night, frequently without defence counsel, and sentences were carried out at once.' }",
  "{ t: 'p', x: 'Revolutionary courts were established within weeks. They sat quickly, often at night, frequently without defence counsel, and sentences were carried out at once.', fa: 'دادگاه‌های انقلاب ظرف چند هفته تشکیل شد. سریع رسیدگی می‌کردند، اغلب شبانه، و بیشتر وقت‌ها بدون وکیل مدافع؛ و حکم بی‌درنگ اجرا می‌شد.' }"),

 ("{ t: 'p', x: 'The armed forces went first. Iran\\u2019s most senior officers, generals who had spent their entire working lives in the service of the country, were brought before the courts one after another and shot. Many of them had trained abroad, commanded the country\\u2019s defence for decades, and had no political role at all. The charge, broadly, was that they had served.' }",
  "{ t: 'p', x: 'The armed forces went first. Iran\\u2019s most senior officers, generals who had spent their entire working lives in the service of the country, were brought before the courts one after another and shot. Many of them had trained abroad, commanded the country\\u2019s defence for decades, and had no political role at all. The charge, broadly, was that they had served.', fa: 'اول از همه سراغ ارتش رفتند. بلندپایه‌ترین افسران ایران، سرلشکرهایی که تمام عمر کاری‌شان را در خدمت کشور گذرانده بودند، یکی پس از دیگری به دادگاه برده و تیرباران شدند. خیلی‌هایشان در خارج آموزش دیده بودند، دهه‌ها فرماندهی دفاع کشور را بر عهده داشتند، و هیچ نقش سیاسی‌ای نداشتند. اتهام، در یک کلام، این بود که خدمت کرده بودند.' }"),

 ("{ t: 'p', x: 'The purge widened from there. Ministers, provincial governors, senior police, court officials, and men who had held office years earlier and retired quietly. In practice almost anything that still carried the mark of the old order was a target, and the reach of that went further than people expect: the Shah\\u2019s own horses were killed, for no reason beyond whose horses they had been.' }",
  "{ t: 'p', x: 'The purge widened from there. Ministers, provincial governors, senior police, court officials, and men who had held office years earlier and retired quietly. In practice almost anything that still carried the mark of the old order was a target, and the reach of that went further than people expect: the Shah\\u2019s own horses were killed, for no reason beyond whose horses they had been.', fa: 'پاکسازی از همان‌جا گسترده‌تر شد. وزیران، استانداران، فرماندهان شهربانی، مقام‌های دربار، و کسانی که سال‌ها پیش‌تر مقامی داشتند و بی‌سروصدا بازنشسته شده بودند. در عمل تقریباً هر چیزی که هنوز نشانی از نظم قدیم داشت هدف بود، و دامنه‌اش از آنچه تصور می‌شود فراتر رفت: اسب‌های خود شاه را کشتند، بی‌هیچ دلیلی جز اینکه اسب‌های چه کسی بوده‌اند.' }"),

 ("{ t: 'markline', x: 'It was not only people who were being removed. It was every trace.' }",
  "{ t: 'markline', x: 'It was not only people who were being removed. It was every trace.', fa: 'فقط آدم‌ها را حذف نمی‌کردند. هر ردی را حذف می‌کردند.' }"),

 ("{ t: 'p', x: 'The effect on the military was severe and immediate. Thousands of officers were dismissed, imprisoned or executed, and the air force in particular lost most of its senior command in the space of a year. The consequences of that arrived faster than anyone had planned for, and they are the subject of the chapter after this one.' }",
  "{ t: 'p', x: 'The effect on the military was severe and immediate. Thousands of officers were dismissed, imprisoned or executed, and the air force in particular lost most of its senior command in the space of a year. The consequences of that arrived faster than anyone had planned for, and they are the subject of the chapter after this one.', fa: 'اثرش بر ارتش شدید و فوری بود. هزاران افسر برکنار، زندانی یا اعدام شدند، و به‌ویژه نیروی هوایی بخش بزرگی از فرماندهان ارشدش را ظرف یک سال از دست داد. پیامدش زودتر از آنکه کسی حسابش را کرده باشد از راه رسید، و موضوع فصل بعدِ همین فصل است.' }"),

 ("{ t: 'h', x: 'Hoveyda' }",
  "{ t: 'h', x: 'Hoveyda', fa: 'هویدا' }"),

 ("{ t: 'p', x: 'The expansion of the universities, the growth of the health service into the provinces, the industrial programme, the arrival of a modern civil service: he ran the machinery of all of it. He was educated in Beirut, Brussels and Paris, spoke several languages, was known for a pipe and an orchid in his lapel, and was a familiar and largely liked figure in Iranian public life for over a decade.' }",
  "{ t: 'p', x: 'The expansion of the universities, the growth of the health service into the provinces, the industrial programme, the arrival of a modern civil service: he ran the machinery of all of it. He was educated in Beirut, Brussels and Paris, spoke several languages, was known for a pipe and an orchid in his lapel, and was a familiar and largely liked figure in Iranian public life for over a decade.', fa: 'گسترش دانشگاه‌ها، رساندن خدمات بهداشتی به استان‌ها، برنامهٔ صنعتی، و شکل گرفتن یک نظام اداری مدرن؛ چرخ همهٔ اینها را او می‌گرداند. در بیروت و بروکسل و پاریس درس خوانده بود، به چند زبان حرف می‌زد، به پیپ و گل ارکیدهٔ روی یقه‌اش شناخته می‌شد، و بیش از یک دهه چهره‌ای آشنا و تا حد زیادی محبوب در زندگی عمومی ایران بود.' }"),

 ("{ t: 'p', x: 'He was held by the new government after the revolution. He was given no lawyer, and so he spoke for himself. He was tried and executed on the same day, 7 April 1979.' }",
  "{ t: 'p', x: 'He was held by the new government after the revolution. He was given no lawyer, and so he spoke for himself. He was tried and executed on the same day, 7 April 1979.', fa: 'پس از انقلاب، حکومت تازه او را بازداشت کرد. وکیلی به او ندادند، پس خودش از خودش دفاع کرد. در ۱۸ فروردین ۱۳۵۸ محاکمه و همان روز اعدام شد.' }"),

 ("{ t: 'p', x: 'He had had opportunities to leave the country and had not taken them.' }",
  "{ t: 'p', x: 'He had had opportunities to leave the country and had not taken them.', fa: 'فرصت‌هایی برای رفتن از کشور داشت و از هیچ‌کدامشان استفاده نکرد.' }"),

 ("{ t: 'quotebig', x: 'He answered for twelve years of government in a single afternoon, alone, and without counsel.' }",
  "{ t: 'quotebig', x: 'He answered for twelve years of government in a single afternoon, alone, and without counsel.', fa: 'پاسخِ دوازده سال حکومت را در یک بعدازظهر داد؛ تنها، و بدون وکیل.' }"),

 ("{ t: 'h', x: 'Four hundred and forty-four days' }",
  "{ t: 'h', x: 'Four hundred and forty-four days', fa: 'چهارصد و چهل و چهار روز' }"),

 ("{ t: 'p', x: 'On 4 November 1979 several hundred student militants climbed the walls of the United States embassy in Tehran. They had planned a symbolic sit-in lasting a few days. It lasted fourteen months and became one of the defining international crises of the century.' }",
  "{ t: 'p', x: 'On 4 November 1979 several hundred student militants climbed the walls of the United States embassy in Tehran. They had planned a symbolic sit-in lasting a few days. It lasted fourteen months and became one of the defining international crises of the century.', fa: 'در ۱۳ آبان ۱۳۵۸، چند صد دانشجوی انقلابی از دیوار سفارت آمریکا در تهران بالا رفتند. برنامه‌شان یک تحصن نمادین چندروزه بود. چهارده ماه طول کشید و به یکی از بحران‌های تعیین‌کنندهٔ آن قرن بدل شد.' }"),

 ("{ t: 'p', x: 'The immediate cause was the Shah. He had been admitted to the United States in October for cancer treatment, and to many in Tehran that looked like the beginning of the same story as 1953, when American and British intelligence had helped return him to the throne. The fear that he would be restored a second time was the spark.' }",
  "{ t: 'p', x: 'The immediate cause was the Shah. He had been admitted to the United States in October for cancer treatment, and to many in Tehran that looked like the beginning of the same story as 1953, when American and British intelligence had helped return him to the throne. The fear that he would be restored a second time was the spark.', fa: 'علت فوری‌اش شاه بود. مهر آن سال برای درمان سرطان به آمریکا راه داده شده بود، و برای خیلی‌ها در تهران این آغاز همان داستان سال ۱۳۳۲ به نظر می‌رسید؛ وقتی سرویس‌های اطلاعاتی آمریکا و بریتانیا به بازگرداندنش به تخت کمک کردند. ترس از اینکه بار دوم هم برگردانده شود، جرقه را زد.' }"),

 ("{ t: 'h', x: 'How it unfolded' }",
  "{ t: 'h', x: 'How it unfolded', fa: 'ماجرا چطور پیش رفت' }"),

 ("{ t: 'p', x: 'The timing of the release, to the minute, was not an accident. It was the last word in a long argument with an administration that had already lost an election over it.' }",
  "{ t: 'p', x: 'The timing of the release, to the minute, was not an accident. It was the last word in a long argument with an administration that had already lost an election over it.', fa: 'زمان آزادی گروگان‌ها، دقیقه به دقیقه، تصادفی نبود. حرف آخر در یک کشمکش طولانی با دولتی بود که پیش‌تر بر سر همین ماجرا انتخابات را باخته بود.' }"),

 ("{ t: 'p', x: 'Whatever else the crisis did, it set the relationship between Iran and the United States for the next four decades, and it gave the new government a permanent external adversary, which is a useful thing for any government still consolidating power at home.' }",
  "{ t: 'p', x: 'Whatever else the crisis did, it set the relationship between Iran and the United States for the next four decades, and it gave the new government a permanent external adversary, which is a useful thing for any government still consolidating power at home.', fa: 'این بحران هر کار دیگری هم کرده باشد، رابطهٔ ایران و آمریکا را برای چهار دههٔ بعد تعیین کرد، و به حکومت تازه یک دشمن خارجی دائمی داد؛ چیزی که برای هر حکومتی که هنوز دارد قدرتش را در داخل تثبیت می‌کند به کار می‌آید.' }"),

 ("{ t: 'h', x: 'The constitution' }",
  "{ t: 'h', x: 'The constitution', fa: 'قانون اساسی' }"),

 ("{ t: 'p', x: 'The constitution ratified in 1979 created an elected president and an elected parliament, and above them the velayat-e faqih: a Supreme Leader, a cleric, holding final authority over the armed forces, the judiciary, the broadcasters, and the vetting of who may stand for election. Iran would have votes, and it would also have someone standing above their results. Khomeini took the post and held it until his death.' }",
  "{ t: 'p', x: 'The constitution ratified in 1979 created an elected president and an elected parliament, and above them the velayat-e faqih: a Supreme Leader, a cleric, holding final authority over the armed forces, the judiciary, the broadcasters, and the vetting of who may stand for election. Iran would have votes, and it would also have someone standing above their results. Khomeini took the post and held it until his death.', fa: 'قانون اساسی‌ای که در سال ۱۳۵۸ تصویب شد، رئیس‌جمهور و مجلسِ انتخابی ایجاد کرد، و بالای سر هر دو، ولایت فقیه را: رهبری روحانی با اختیار نهایی بر نیروهای مسلح، قوهٔ قضاییه، صداوسیما، و تأیید صلاحیت کسانی که می‌توانند نامزد شوند. ایران رأی‌گیری داشت، و در عین حال کسی را هم داشت که بالای سر نتیجهٔ رأی‌ها می‌ایستاد. خمینی این جایگاه را گرفت و تا پایان عمرش نگه داشت.' }"),

 ("{ t: 'p', x: 'By 1981 the other partners in the revolution were gone. The first president was impeached and left the country in disguise. The left was suppressed, its organisations broken up and its members imprisoned. The coalition of 1979 had narrowed to a single faction of itself, and that faction now held everything.' }",
  "{ t: 'p', x: 'By 1981 the other partners in the revolution were gone. The first president was impeached and left the country in disguise. The left was suppressed, its organisations broken up and its members imprisoned. The coalition of 1979 had narrowed to a single faction of itself, and that faction now held everything.', fa: 'تا سال ۱۳۶۰، دیگر شریکان انقلاب رفته بودند. نخستین رئیس‌جمهور برکنار شد و با تغییر قیافه از کشور خارج شد. چپ سرکوب شد، تشکیلاتش از هم پاشید و اعضایش به زندان افتادند. ائتلاف سال ۱۳۵۷ به یک جناح از خودش تقلیل یافته بود، و حالا همان جناح همه‌چیز را در دست داشت.' }"),
]

mi_scope.apply(PAIRS)

# the Hoveyda ptext block, which carries glossary markup
s = open("constants/education.ts").read()
old = "{ t: 'ptext', x: '{{hoveyda|Amir-Abbas Hoveyda}} was prime minister of Iran for twelve years, from 1965 to 1977, the longest tenure in the country\\u2019s history. He was the Shah\\u2019s right hand through the years when Iran changed fastest, and a great deal of what was built in that period passed across his desk.' }"
new = "{ t: 'ptext', x: '{{hoveyda|Amir-Abbas Hoveyda}} was prime minister of Iran for twelve years, from 1965 to 1977, the longest tenure in the country\\u2019s history. He was the Shah\\u2019s right hand through the years when Iran changed fastest, and a great deal of what was built in that period passed across his desk.', fa: '{{hoveyda|امیرعباس هویدا}} دوازده سال نخست‌وزیر ایران بود، از ۱۳۴۳ تا ۱۳۵۶؛ طولانی‌ترین دورهٔ نخست‌وزیری در تاریخ این کشور. در سال‌هایی که ایران سریع‌تر از همیشه تغییر می‌کرد، دست راست شاه بود، و بخش بزرگی از آنچه در آن دوره ساخته شد از روی میز او گذشت.' }"
if old in s:
    open("constants/education.ts", "w").write(s.replace(old, new, 1))
    print("hoveyda ptext translated")
else:
    print("  hoveyda ptext not matched")
