# -*- coding: utf-8 -*-
# Mohammad Reza Shah, final batch: the departure, exile, illness, the book,
# and the end. فرودگاه مهرآباد, «پاسخ به تاریخ», مسجد الرفاعی.
# Dates match the modern chapter: ۲۶ دی ۱۳۵۷, ۱۳ آبان ۱۳۵۸.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

def pairs_for(en, fa):
    out = []
    for q in ('"', "'"):
        esc = en.replace("'", "\\'") if q == "'" else en
        a = 'x: ' + q + esc + q
        out.append((a, a + ", fa: '" + fa + "'"))
    return out

ITEMS = [
 ("To the world he still stood at the peak of his power. Beneath it, the ground was beginning to shift.",
  'در چشم جهان هنوز در اوج قدرتش ایستاده بود. زیر پایش اما، زمین داشت می‌لرزید.'),

 ("Weakened by his hidden illness and torn between force and concession, the Shah wavered at the decisive hour. He installed a military government, then a reformist one; he freed prisoners, apologized to the nation, and went on television to say he had heard the voice of their revolution. The next day the streets filled again.",
  'شاه که بیماری پنهانش ناتوانش کرده بود و میان زور و امتیاز دادن دودل مانده بود، در ساعت سرنوشت‌ساز تردید کرد. دولتی نظامی سر کار آورد، بعد دولتی اصلاح‌طلب؛ زندانیان را آزاد کرد، از ملت عذرخواهی کرد، و از تلویزیون گفت که پیام انقلاب مردم را شنیده است. فردای آن روز، خیابان‌ها دوباره پر شد.'),

 ("In his memoirs he wrote that he could not bring himself to save his throne by drowning his own people in blood, that a king who rules by massacre is no longer worthy of the name. His critics called it fatal indecision; he called it a refusal to become a tyrant in his final hour. Both may be true.",
  'در خاطراتش نوشت که نتوانست تختش را با غرق کردن مردم خودش در خون نجات دهد، و شاهی که با کشتار حکومت کند دیگر لایق این نام نیست. منتقدانش نامش را تردیدی مرگبار گذاشتند؛ خودش آن را سر باز زدن از خودکامه شدن در واپسین ساعت خواند. شاید هر دو درست باشد.'),

 ("The departure", 'رفتن'),

 ("On 16 January 1979, the Shah left Iran. The trip was called a temporary rest abroad, but everyone understood. At Mehrabad Airport, an officer knelt to kiss his feet, and the Shah, visibly moved, raised the man up. He took a small box of Iranian soil with him.",
  'در ۲۶ دی ۱۳۵۷، شاه از ایران رفت. سفر را استراحتی موقت در خارج نامیدند، اما همه می‌فهمیدند. در فرودگاه مهرآباد، افسری زانو زد تا پایش را ببوسد، و شاه که آشکارا منقلب شده بود او را از زمین بلند کرد. جعبهٔ کوچکی از خاک ایران را با خود برد.'),

 ("He wept as the plane lifted off. In his own words, he left with an empty heart, carrying the weight of a thousand years of monarchy that ended with him, and a love for a country he knew, even then, he might never see again. Within weeks Khomeini returned to Tehran to enormous crowds, and the monarchy his father had founded came to an end.",
  'وقتی هواپیما از زمین بلند شد گریست. به گفتهٔ خودش، با دلی خالی رفت؛ با بار هزار سال پادشاهی که با او تمام می‌شد، و با عشق به کشوری که همان موقع هم می‌دانست شاید دیگر هرگز نبیندش. چند هفته بعد خمینی با استقبال جمعیتی عظیم به تهران بازگشت، و پادشاهی‌ای که پدرش بنیان گذاشته بود به پایان رسید.'),

 ("He left the country he had ruled for thirty seven years, and never returned.",
  'از کشوری رفت که سی و هفت سال بر آن حکومت کرده بود، و دیگر بازنگشت.'),

 ("A king without a country", 'شاهی بی‌کشور'),

 ("His exile became a lonely odyssey across the world. Egypt received him first, then Morocco, the Bahamas, and Mexico, each stay shorter than the last as governments feared the anger of the new Iran. The man who had dined with the kings of the earth now struggled to find a country that would take him in.",
  'تبعیدش به سفری تنها در سراسر جهان بدل شد. اول مصر پذیرایش شد، بعد مراکش و باهاما و مکزیک، و هر اقامت کوتاه‌تر از قبلی، چون دولت‌ها از خشم ایرانِ تازه می‌ترسیدند. مردی که با شاهان روی زمین بر یک سفره نشسته بود، حالا به‌سختی کشوری پیدا می‌کرد که راهش دهد.'),

 ("Through these years he was quietly battling cancer, an illness he bore with private dignity. He needed proper medical care, yet as country after country turned him away, the treatment he deserved was too often delayed or denied him.",
  'در تمام این سال‌ها بی‌سروصدا با سرطان می‌جنگید؛ بیماری‌ای که با وقاری خصوصی تحملش کرد. به درمان درست نیاز داشت، اما همچنان که کشورها یکی پس از دیگری راهش نمی‌دادند، درمانی که حقش بود اغلب به تعویق افتاد یا از او دریغ شد.'),

 ("The hostage crisis", 'بحران گروگان‌گیری'),

 ("In October 1979 the United States admitted him for medical treatment in New York. In Tehran the decision was taken as proof that America meant to restore him, as it had in 1953, and on 4 November students stormed the American embassy and seized its staff.",
  'در مهر ۱۳۵۸، آمریکا او را برای درمان در نیویورک پذیرفت. در تهران این تصمیم را دلیلی گرفتند بر اینکه آمریکا قصد دارد او را بازگرداند، همان‌طور که در سال ۱۳۳۲ کرده بود، و در ۱۳ آبان دانشجویان به سفارت آمریکا حمله کردند و کارکنانش را گروگان گرفتند.'),

 ("Fifty two Americans were held for four hundred and forty four days, a crisis that gripped the world, sank a presidency, and poisoned relations between the two nations for decades to come. At its center, unwillingly, was the ailing Shah, whose presence on American soil had lit the fuse. Under the pressure he soon moved on again, to Panama, and at last back to Egypt.",
  'پنجاه و دو آمریکایی چهارصد و چهل و چهار روز در گروگان ماندند؛ بحرانی که جهان را در خود گرفت، یک ریاست‌جمهوری را به زیر کشید، و رابطهٔ دو کشور را برای دهه‌ها مسموم کرد. در مرکز آن، بی‌آنکه بخواهد، شاهِ بیمار بود که حضورش بر خاک آمریکا فتیله را روشن کرده بود. زیر همین فشار، به‌زودی دوباره جابه‌جا شد؛ به پاناما، و سرانجام دوباره به مصر.'),

 ("The last book", 'آخرین کتاب'),

 ("There in Cairo, President Anwar Sadat offered him refuge and dignity when almost no one else would. And there, in his final months, the Shah wrote his last book, Answer to History, part memoir and part defense, his own account of a life spent trying to modernize a nation that, in the end, turned from him.",
  'آنجا در قاهره، انور سادات به او پناه و حرمت داد، وقتی تقریباً هیچ‌کس دیگری نمی‌داد. و همان‌جا، در ماه‌های آخر عمرش، شاه آخرین کتابش را نوشت، «پاسخ به تاریخ»؛ نیمی خاطره و نیمی دفاعیه، روایت خودش از عمری که صرف مدرن کردن ملتی شد که سرانجام از او رو گرداند.'),

 ("He wrote without bitterness toward his people, reserving his sorrow for what he saw as the betrayals of allies and the tragedy of a work left unfinished.",
  'بی‌هیچ تلخی نسبت به مردمش نوشت، و اندوهش را برای چیزی نگه داشت که خیانت متحدان می‌دانست، و برای مصیبت کاری که ناتمام ماند.'),

 ("The end", 'پایان'),

 ("Mohammad Reza Shah Pahlavi died in Cairo on 27 July 1980, at the age of sixty. President Sadat gave him a state funeral, and he was laid to rest in the Al Rifa'i Mosque, where he remains to this day, far from the country he loved.",
  'محمدرضا شاه پهلوی در ۵ مرداد ۱۳۵۹، در شصت سالگی، در قاهره درگذشت. سادات برایش مراسم رسمی دولتی برگزار کرد، و در مسجد الرفاعی به خاک سپرده شد؛ همان‌جا که تا امروز آرمیده است، دور از کشوری که دوستش داشت.'),

 ("This has been a glimpse of the life of the king who ruled Iran. A prince raised for a throne, who carried the weight of a nation from the age of twenty one, and who gave the whole of his life to the country he loved.",
  'این نگاهی بود کوتاه به زندگی شاهی که بر ایران حکومت کرد. شاهزاده‌ای که برای تخت بار آمد، از بیست و یک سالگی بار یک ملت را بر دوش کشید، و تمام عمرش را به کشوری داد که دوستش داشت.'),

 ("He dreamed of an Iran that was modern, proud, and strong, and he worked without rest to build it, roads and schools, universities and industry, land for the farmer and a voice for the woman, a nation lifted and set among the great powers of the world. Through triumph and hardship, and to his final breath in exile, his devotion to Iran never wavered.",
  'رؤیای ایرانی را در سر داشت که مدرن باشد و سربلند و نیرومند، و بی‌وقفه برای ساختنش کار کرد؛ جاده و مدرسه، دانشگاه و صنعت، زمین برای کشاورز و صدا برای زن، ملتی که بالا کشیده شود و میان قدرت‌های بزرگ جهان بنشیند. در پیروزی و در سختی، و تا واپسین نفسش در تبعید، دلبستگی‌اش به ایران هرگز نلرزید.'),

 ("He gave his life, and his heart, to Iran.",
  'جانش را، و دلش را، به ایران داد.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
