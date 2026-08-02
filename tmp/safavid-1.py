# -*- coding: utf-8 -*-
# Safavid: the boy king, the new faith, and Chaldiran.
# Register: written Persian. Impersonal, fuller verbs, sentences broken
# where English would run them together.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 # header and chapter titles
 ("essence: 'The dynasty that reunited Iran, made it a great power once more, and raised Isfahan into one of the most beautiful cities the world has ever seen.',",
  "essence: 'The dynasty that reunited Iran, made it a great power once more, and raised Isfahan into one of the most beautiful cities the world has ever seen.',\n  essenceFa: 'سلسله‌ای که ایران را دوباره یکپارچه کرد، آن را بار دیگر به قدرتی بزرگ بدل ساخت، و اصفهان را به یکی از زیباترین شهرهایی رساند که جهان به خود دیده است.',"),

 ("      title: 'A Boy King and a New Faith',\n      subtitle: '1501',",
  "      title: 'A Boy King and a New Faith',\n      titleFa: 'شاهی نوجوان و آیینی تازه',\n      subtitle: '1501',\n      subtitleFa: '۱۵۰۱ میلادی',"),

 ("      title: 'The Struggle for the Realm',\n      subtitle: '1514 - 1587',",
  "      title: 'The Struggle for the Realm',\n      titleFa: 'کشمکش بر سر قلمرو',\n      subtitle: '1514 - 1587',\n      subtitleFa: '۱۵۱۴ تا ۱۵۸۷',"),

 ("      title: 'Shah Abbas the Great',\n      subtitle: '1587 - 1629',",
  "      title: 'Shah Abbas the Great',\n      titleFa: 'شاه عباس بزرگ',\n      subtitle: '1587 - 1629',\n      subtitleFa: '۱۵۸۷ تا ۱۶۲۹',"),

 ("      title: 'Isfahan, Half the World',",
  "      title: 'Isfahan, Half the World',\n      titleFa: 'اصفهان، نصف جهان',"),

 ("      title: 'The Long Twilight',\n      subtitle: '1629 - 1736',",
  "      title: 'The Long Twilight',\n      titleFa: 'غروبی طولانی',\n      subtitle: '1629 - 1736',\n      subtitleFa: '۱۶۲۹ تا ۱۷۳۶',"),

 # chapter one
 ("{ t: 'p', x: 'For centuries after the Mongol storm, Iran had been a patchwork of rival lords and warring tribes, with no single ruler and no single soul. Then, at the very dawn of the sixteenth century, a boy of fourteen changed the course of the nation forever.' }",
  "{ t: 'p', x: 'For centuries after the Mongol storm, Iran had been a patchwork of rival lords and warring tribes, with no single ruler and no single soul. Then, at the very dawn of the sixteenth century, a boy of fourteen changed the course of the nation forever.', fa: 'قرن‌ها پس از توفان مغول، ایران به تکه‌هایی پراکنده از خان‌های رقیب و ایل‌های در جنگ بدل شده بود؛ نه فرمانروایی واحد داشت و نه روحی یگانه. سپس، درست در سپیده‌دم سدهٔ شانزدهم، نوجوانی چهارده ساله مسیر این ملت را برای همیشه دگرگون کرد.' }"),

 ("{ t: 'p', x: 'His name was Ismail, and he was the young leader of the Safavid order, a devoted religious brotherhood from the northwest of Iran. Around him gathered fierce and loyal warriors, and at their head he swept across the land, defeating all who stood against him.' }",
  "{ t: 'p', x: 'His name was Ismail, and he was the young leader of the Safavid order, a devoted religious brotherhood from the northwest of Iran. Around him gathered fierce and loyal warriors, and at their head he swept across the land, defeating all who stood against him.', fa: 'نامش اسماعیل بود، پیشوای جوان طریقت صفوی؛ برادری‌ای دینی و سرسپرده از شمال غرب ایران. جنگاورانی دلیر و وفادار گرد او جمع شدند، و او در رأس آنان سرتاسر سرزمین را درنوردید و هر که را در برابرش ایستاد از پای درآورد.' }"),

 ("{ t: 'h', x: 'The crown at fourteen' }",
  "{ t: 'h', x: 'The crown at fourteen', fa: 'تاج در چهارده سالگی' }"),

 ("{ t: 'p', x: 'In 1501 Ismail entered the city of Tabriz in triumph and had himself proclaimed Shah, the king of kings, taking the ancient title of the Persian monarchs. A boy still, he had founded a dynasty that would rule Iran for more than two centuries and restore it to greatness.' }",
  "{ t: 'p', x: 'In 1501 Ismail entered the city of Tabriz in triumph and had himself proclaimed Shah, the king of kings, taking the ancient title of the Persian monarchs. A boy still, he had founded a dynasty that would rule Iran for more than two centuries and restore it to greatness.', fa: 'در سال ۱۵۰۱ اسماعیل پیروزمندانه وارد تبریز شد و خود را شاه خواند؛ شاهنشاه، با همان لقب کهن پادشاهان ایران. هنوز نوجوان بود که سلسله‌ای بنیان گذاشت که بیش از دو قرن بر ایران فرمان راند و آن را به بزرگی بازگرداند.' }"),

 ("{ t: 'h', x: 'A faith that shaped a nation' }",
  "{ t: 'h', x: 'A faith that shaped a nation', fa: 'آیینی که ملتی را شکل داد' }"),

 ("{ t: 'p', x: 'Ismail did something that would define Iran to this very day. He made Shia Islam the faith of his realm, setting Iran apart from its powerful Sunni neighbours and giving the nation a distinct religious identity that has endured for five hundred years.' }",
  "{ t: 'p', x: 'Ismail did something that would define Iran to this very day. He made Shia Islam the faith of his realm, setting Iran apart from its powerful Sunni neighbours and giving the nation a distinct religious identity that has endured for five hundred years.', fa: 'اسماعیل کاری کرد که تا همین امروز ایران را تعریف می‌کند. تشیع را آیین رسمی قلمرو خود قرار داد و بدین‌سان ایران را از همسایگان نیرومند سنی‌مذهبش جدا ساخت؛ هویتی دینی و متمایز به این ملت بخشید که پانصد سال دوام آورده است.' }"),

 ("{ t: 'p', x: 'It was a decision of enormous consequence. It unified the many peoples of Iran under one faith and one crown, forged a strong sense of a single nation, and shaped the character of the country for all the centuries that followed. Modern Iran, in its faith and its borders, was born in these years.' }",
  "{ t: 'p', x: 'It was a decision of enormous consequence. It unified the many peoples of Iran under one faith and one crown, forged a strong sense of a single nation, and shaped the character of the country for all the centuries that followed. Modern Iran, in its faith and its borders, was born in these years.', fa: 'این تصمیمی بود با پیامدهایی عظیم. مردمان گوناگون ایران را زیر یک آیین و یک تاج گرد آورد، حس نیرومندی از ملتی واحد پدید آورد، و خصلت این کشور را برای همهٔ قرن‌های پس از آن تعیین کرد. ایران امروز، در آیین و در مرزهایش، در همین سال‌ها زاده شد.' }"),

 ("{ t: 'pull', x: 'From a fractured land, a single nation was reborn.' }",
  "{ t: 'pull', x: 'From a fractured land, a single nation was reborn.', fa: 'از سرزمینی چندپاره، ملتی یگانه دوباره زاده شد.' }"),

 # chapter two
 ("{ t: 'p', x: 'A reborn Iran did not go unchallenged. To the west lay the mighty Ottoman Empire, the greatest power of the age, and between the two great empires there began a long and bitter rivalry that would last for generations.' }",
  "{ t: 'p', x: 'A reborn Iran did not go unchallenged. To the west lay the mighty Ottoman Empire, the greatest power of the age, and between the two great empires there began a long and bitter rivalry that would last for generations.', fa: 'ایرانِ دوباره‌زاده بی‌رقیب نماند. در غرب امپراتوری نیرومند عثمانی قرار داشت، بزرگ‌ترین قدرت آن روزگار، و میان این دو امپراتوری بزرگ رقابتی دیرپا و تلخ آغاز شد که نسل‌ها ادامه یافت.' }"),

 ("{ t: 'p', x: 'In 1514, at the battle of Chaldiran, the young Safavid state met the Ottomans in the field. The Ottomans had cannon and firearms, weapons the Safavid cavalry lacked, and the day went against Iran. It was a hard and early lesson that valour alone could not win a modern war.' }",
  "{ t: 'p', x: 'In 1514, at the battle of Chaldiran, the young Safavid state met the Ottomans in the field. The Ottomans had cannon and firearms, weapons the Safavid cavalry lacked, and the day went against Iran. It was a hard and early lesson that valour alone could not win a modern war.', fa: 'در سال ۱۵۱۴، در نبرد چالدران، دولت جوان صفوی در میدان با عثمانی روبه‌رو شد. عثمانیان توپ و سلاح آتشین داشتند، چیزی که سوارهٔ صفوی از آن بی‌بهره بود، و روز به زیان ایران تمام شد. این درسی سخت و زودهنگام بود: دلاوری به‌تنهایی جنگی مدرن را نمی‌برد.' }"),

 ("{ t: 'h', x: 'A kingdom tested' }",
  "{ t: 'h', x: 'A kingdom tested', fa: 'پادشاهی‌ای در بوتهٔ آزمایش' }"),

 ("{ t: 'p', x: 'The decades that followed were difficult ones. The dynasty was pressed on its frontiers by the Ottomans in the west and the Uzbeks in the east, and troubled at home by the rivalries of the powerful tribal chiefs on whom the throne depended.' }",
  "{ t: 'p', x: 'The decades that followed were difficult ones. The dynasty was pressed on its frontiers by the Ottomans in the west and the Uzbeks in the east, and troubled at home by the rivalries of the powerful tribal chiefs on whom the throne depended.', fa: 'دهه‌های پس از آن دشوار بودند. سلسله در مرزهایش از غرب زیر فشار عثمانی و از شرق زیر فشار ازبکان بود، و در درون نیز رقابت خان‌های نیرومند ایلی گرفتارش کرده بود؛ همان‌ها که تخت به آنان تکیه داشت.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1)
        applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
