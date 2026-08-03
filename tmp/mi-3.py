# -*- coding: utf-8 -*-
# Modern Iran: the oil years and how the White Revolution landed differently
# for different people. Modern register throughout.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'pull', x: 'Within a decade Iran had gone from the edge of the modern world to a seat at its table.' }",
  "{ t: 'pull', x: 'Within a decade Iran had gone from the edge of the modern world to a seat at its table.', fa: 'ایران در طول یک دهه، از حاشیهٔ جهان مدرن به یکی از صندلی‌های سر میزش رسید.' }"),

 ("{ t: 'p', x: 'With the oil revenues of the 1970s the money arriving in the country was extraordinary. Iran bought advanced technology, built an air force among the most capable anywhere, hosted world leaders, and was spoken of as a coming power. For a great many Iranians those years were the best their families had ever had.' }",
  "{ t: 'p', x: 'With the oil revenues of the 1970s the money arriving in the country was extraordinary. Iran bought advanced technology, built an air force among the most capable anywhere, hosted world leaders, and was spoken of as a coming power. For a great many Iranians those years were the best their families had ever had.', fa: 'با درآمد نفت در دههٔ ۱۳۵۰، پولی که وارد کشور می‌شد چشمگیر بود. ایران فناوری پیشرفته خرید، یکی از تواناترین نیروهای هوایی جهان را ساخت، میزبان رهبران جهان شد، و از آن به‌عنوان قدرتی در راه سخن می‌گفتند. برای شمار زیادی از ایرانی‌ها، آن سال‌ها بهترین سال‌هایی بود که خانواده‌شان تا آن زمان دیده بود.' }"),

 ("{ t: 'h', x: 'What people experienced' }",
  "{ t: 'h', x: 'What people experienced', fa: 'مردم چه تجربه کردند' }"),

 ("{ t: 'p', x: 'A programme that large touches everyone differently, and the reactions to it varied enormously depending on who you were.' }",
  "{ t: 'p', x: 'A programme that large touches everyone differently, and the reactions to it varied enormously depending on who you were.', fa: 'برنامه‌ای به این بزرگی، با هر کسی جور دیگری برخورد می‌کند، و واکنش‌ها به آن بسته به اینکه چه کسی بودی، بسیار متفاوت بود.' }"),

 # the boxes
 ("{ title: 'Many families', x: 'Rose. Land of their own, schooling for their children, work in the new industries, and lives visibly better than their parents had.' }",
  "{ title: 'Many families', titleFa: 'بسیاری از خانواده‌ها', x: 'Rose. Land of their own, schooling for their children, work in the new industries, and lives visibly better than their parents had.', fa: 'بالا آمدند. زمینی از آنِ خودشان، مدرسه برای بچه‌ها، کار در صنایع تازه، و زندگی‌ای که آشکارا از زندگی پدر و مادرشان بهتر بود.' }"),

 ("{ title: 'Landowners', x: 'Large holdings were broken up. A class that had held land and influence for generations lost much of both.' }",
  "{ title: 'Landowners', titleFa: 'زمین‌داران', x: 'Large holdings were broken up. A class that had held land and influence for generations lost much of both.', fa: 'املاک بزرگ تقسیم شد. طبقه‌ای که نسل‌ها زمین و نفوذ داشت، بخش زیادی از هر دو را از دست داد.' }"),

 ("{ title: 'Some farmers', x: 'Received plots too small to support a family, with little credit to work them. Many sold and moved to the cities, arriving with nothing.' }",
  "{ title: 'Some farmers', titleFa: 'بخشی از کشاورزان', x: 'Received plots too small to support a family, with little credit to work them. Many sold and moved to the cities, arriving with nothing.', fa: 'زمین‌هایی گرفتند که برای گذران یک خانواده کوچک بود، و وامی هم برای کار روی آن در کار نبود. خیلی‌ها فروختند و به شهرها رفتند، و دست‌خالی رسیدند.' }"),

 ("{ title: 'The clergy', x: 'Objected to female suffrage, and to land reform reaching religious endowments. Some read the wider programme as reducing their place in Iranian life.' }",
  "{ title: 'The clergy', titleFa: 'روحانیت', x: 'Objected to female suffrage, and to land reform reaching religious endowments. Some read the wider programme as reducing their place in Iranian life.', fa: 'به حق رأی زنان اعتراض کرد، و به اینکه اصلاحات ارضی به موقوفات هم برسد. بعضی‌ها کل این برنامه را تلاشی برای کم کردن جایگاهشان در زندگی ایران می‌دیدند.' }"),

 ("{ title: 'The secular left', x: 'Argued that change handed down from a throne, without a corresponding widening of political life, was incomplete.' }",
  "{ title: 'The secular left', titleFa: 'چپ غیرمذهبی', x: 'Argued that change handed down from a throne, without a corresponding widening of political life, was incomplete.', fa: 'می‌گفت تغییری که از بالا و از سوی یک تخت پادشاهی می‌آید، بدون آنکه فضای سیاسی هم به همان اندازه باز شود، ناقص است.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
