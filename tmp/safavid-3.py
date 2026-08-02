# -*- coding: utf-8 -*-
# Safavid: Isfahan, the long twilight, and the closing.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'At the heart of the city he laid out a vast royal square, the Naqsh-e Jahan, the Image of the World, one of the largest and most magnificent public squares ever built. Around it he raised buildings of such beauty that they remain, to this day, among the treasures of all humanity.' }",
  "{ t: 'p', x: 'At the heart of the city he laid out a vast royal square, the Naqsh-e Jahan, the Image of the World, one of the largest and most magnificent public squares ever built. Around it he raised buildings of such beauty that they remain, to this day, among the treasures of all humanity.', fa: 'در قلب شهر میدانی شاهی و پهناور طرح ریخت: نقش جهان، از بزرگ‌ترین و باشکوه‌ترین میدان‌های عمومی که تا آن روز ساخته شده بود. پیرامون آن بناهایی برافراشت چنان زیبا که تا امروز در شمار گنجینه‌های همهٔ بشریت مانده‌اند.' }"),

 ("{ t: 'h', x: 'Wonders in tile and stone' }",
  "{ t: 'h', x: 'Wonders in tile and stone', fa: 'شگفتی‌هایی از کاشی و سنگ' }"),

 ("{ t: 'p', x: 'On the square rose the great Shah Mosque, its dome and portals covered in dazzling blue tilework, a masterpiece of Persian architecture. Nearby stood the exquisite Sheikh Lotfollah Mosque, the graceful Ali Qapu palace, and the entrance to the endless royal bazaar.' }",
  "{ t: 'p', x: 'On the square rose the great Shah Mosque, its dome and portals covered in dazzling blue tilework, a masterpiece of Persian architecture. Nearby stood the exquisite Sheikh Lotfollah Mosque, the graceful Ali Qapu palace, and the entrance to the endless royal bazaar.', fa: 'بر این میدان مسجد بزرگ شاه سر برآورد، با گنبد و سردری پوشیده از کاشی‌کاری خیره‌کنندهٔ لاجوردی؛ شاهکاری از معماری ایرانی. در همان نزدیکی مسجد ظریف شیخ لطف‌الله ایستاده بود، کاخ موزون عالی‌قاپو، و سردر بازار بی‌انتهای شاهی.' }"),

 ("{ t: 'p', x: 'He built bridges across the river that were themselves works of art, and gardens and avenues that made the city a paradise. The mastery of the Persian artist reached its very summit here, in colour, in geometry, and in grace.' }",
  "{ t: 'p', x: 'He built bridges across the river that were themselves works of art, and gardens and avenues that made the city a paradise. The mastery of the Persian artist reached its very summit here, in colour, in geometry, and in grace.', fa: 'بر رودخانه پل‌هایی ساخت که خود اثر هنری بودند، و باغ‌ها و خیابان‌هایی که شهر را به بهشت بدل کردند. چیره‌دستی هنرمند ایرانی همین‌جا به اوج خود رسید: در رنگ، در هندسه، و در لطافت.' }"),

 ("{ t: 'p', x: 'The Isfahan of Shah Abbas still stands, and still takes the breath away. To walk its great square is to step into the golden age of Iran, and to see what the Persian genius could raise when it reached its height.' }",
  "{ t: 'p', x: 'The Isfahan of Shah Abbas still stands, and still takes the breath away. To walk its great square is to step into the golden age of Iran, and to see what the Persian genius could raise when it reached its height.', fa: 'اصفهانِ شاه عباس هنوز پابرجاست و هنوز نفس را در سینه حبس می‌کند. قدم زدن در میدان بزرگش، پا گذاشتن به عصر طلایی ایران است؛ و دیدن آنچه نبوغ ایرانی، آنگاه که به اوج خود می‌رسد، می‌تواند برافرازد.' }"),

 ("{ t: 'p', x: 'No golden age lasts forever. After the death of Shah Abbas the Great in 1629, the empire he had built lived on for another century, still rich, still cultured, still magnificent to behold. But its strength slowly ebbed away.' }",
  "{ t: 'p', x: 'No golden age lasts forever. After the death of Shah Abbas the Great in 1629, the empire he had built lived on for another century, still rich, still cultured, still magnificent to behold. But its strength slowly ebbed away.', fa: 'هیچ عصر طلایی جاودانه نیست. پس از مرگ شاه عباس بزرگ در سال ۱۶۲۹، امپراتوری‌ای که ساخته بود یک قرن دیگر دوام آورد؛ همچنان ثروتمند، همچنان فرهیخته، همچنان در چشم بیننده باشکوه. اما توانش به‌آرامی رو به کاستی گذاشت.' }"),

 ("{ t: 'p', x: 'The later kings were, too often, men raised in the ease of the palace rather than the hardship of the field. Some were gifted, but few had the iron of Abbas, and the vigour that had carried the dynasty to greatness gradually faded.' }",
  "{ t: 'p', x: 'The later kings were, too often, men raised in the ease of the palace rather than the hardship of the field. Some were gifted, but few had the iron of Abbas, and the vigour that had carried the dynasty to greatness gradually faded.', fa: 'پادشاهان بعدی، بیش از آنکه در سختی میدان بار آمده باشند، اغلب در آسایش کاخ پرورش یافته بودند. برخی توانمند بودند، اما کمتر کسی صلابت عباس را داشت، و آن نیرویی که سلسله را به بزرگی رسانده بود رفته‌رفته فروکش کرد.' }"),

 ("{ t: 'h', x: 'The fall of Isfahan' }",
  "{ t: 'h', x: 'The fall of Isfahan', fa: 'سقوط اصفهان' }"),

 ("{ t: 'p', x: 'The end, when it came, was sudden and sorrowful. In 1722 an army of Afghan rebels marched on the heart of the empire and laid siege to Isfahan itself. After months of terrible hunger, the jewel of Iran, the city that was half the world, fell.' }",
  "{ t: 'p', x: 'The end, when it came, was sudden and sorrowful. In 1722 an army of Afghan rebels marched on the heart of the empire and laid siege to Isfahan itself. After months of terrible hunger, the jewel of Iran, the city that was half the world, fell.', fa: 'پایان، آنگاه که رسید، ناگهانی و اندوهبار بود. در سال ۱۷۲۲ سپاهی از شورشیان افغان به قلب امپراتوری تاختند و خودِ اصفهان را به محاصره درآوردند. پس از ماه‌ها گرسنگی هولناک، نگین ایران، شهری که نصف جهان بود، فرو افتاد.' }"),

 ("{ t: 'p', x: 'It was a bitter blow to a proud nation, and it marked the effective end of Safavid power. The dynasty lingered a few years more in name, but its greatness was gone.' }",
  "{ t: 'p', x: 'It was a bitter blow to a proud nation, and it marked the effective end of Safavid power. The dynasty lingered a few years more in name, but its greatness was gone.', fa: 'این ضربه‌ای تلخ بر ملتی سربلند بود و در عمل پایان قدرت صفوی را رقم زد. سلسله چند سالی دیگر تنها به نام باقی ماند، اما بزرگی‌اش رفته بود.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of the Safavids, the dynasty that raised Iran from division into unity, and from weakness into one of the golden ages of its long history. They gave the nation its faith, its renewed strength, and in Isfahan a beauty that has never been surpassed.' }",
  "{ t: 'p', x: 'This has been a glimpse of the Safavids, the dynasty that raised Iran from division into unity, and from weakness into one of the golden ages of its long history. They gave the nation its faith, its renewed strength, and in Isfahan a beauty that has never been surpassed.', fa: 'این نگاهی بود کوتاه به صفویان؛ سلسله‌ای که ایران را از تفرقه به یکپارچگی رساند و از ناتوانی به یکی از عصرهای طلایی تاریخ بلندش. آنان به این ملت آیینش را دادند، توان دوباره‌اش را، و در اصفهان زیبایی‌ای که هرگز از آن پیشی گرفته نشد.' }"),

 ("{ t: 'p', x: 'For two centuries they made Iran a great power and a wonder of the world, and though their empire fell, what they built endures. In the blue domes of Isfahan, the golden age of the Safavids still shines.' }",
  "{ t: 'p', x: 'For two centuries they made Iran a great power and a wonder of the world, and though their empire fell, what they built endures. In the blue domes of Isfahan, the golden age of the Safavids still shines.', fa: 'دو قرن ایران را قدرتی بزرگ و شگفتی جهان کردند، و هرچند امپراتوری‌شان فرو ریخت، آنچه ساختند بر جای مانده است. در گنبدهای لاجوردی اصفهان، عصر طلایی صفویان هنوز می‌درخشد.' }"),

 ("{ t: 'pull', x: 'They made Iran whole again, and left it a beauty that still shines.' }",
  "{ t: 'pull', x: 'They made Iran whole again, and left it a beauty that still shines.', fa: 'ایران را دوباره یکپارچه کردند، و زیبایی‌ای برایش به جا گذاشتند که هنوز می‌درخشد.' }"),
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
