# -*- coding: utf-8 -*-
# Safavid: the reign of Shah Abbas.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Yet the young state endured. Through hard years and capable rulers it held together, waiting, though it did not yet know it, for the king who would raise it to its height.' }",
  "{ t: 'p', x: 'Yet the young state endured. Through hard years and capable rulers it held together, waiting, though it did not yet know it, for the king who would raise it to its height.', fa: 'با این همه، دولت جوان دوام آورد. در سال‌های سخت و به دست فرمانروایانی کاردان یکپارچه ماند و در انتظار نشست؛ هرچند خود هنوز نمی‌دانست در انتظار چه کسی است: شاهی که آن را به اوج خواهد رساند.' }"),

 ("{ t: 'p', x: 'In 1587 the throne passed to a prince who would become the greatest of all the Safavid kings, and one of the greatest rulers in the whole history of Iran. His name was Abbas.' }",
  "{ t: 'p', x: 'In 1587 the throne passed to a prince who would become the greatest of all the Safavid kings, and one of the greatest rulers in the whole history of Iran. His name was Abbas.', fa: 'در سال ۱۵۸۷ تخت به شاهزاده‌ای رسید که بزرگ‌ترین پادشاه صفوی و یکی از بزرگ‌ترین فرمانروایان سراسر تاریخ ایران شد. نامش عباس بود.' }"),

 ("{ t: 'p', x: 'Shah Abbas came to the throne of a troubled kingdom, hemmed in by enemies and weakened by division within. Over the course of his long reign he transformed it utterly, and left Iran stronger, richer, and more glorious than it had been in a thousand years.' }",
  "{ t: 'p', x: 'Shah Abbas came to the throne of a troubled kingdom, hemmed in by enemies and weakened by division within. Over the course of his long reign he transformed it utterly, and left Iran stronger, richer, and more glorious than it had been in a thousand years.', fa: 'شاه عباس بر تخت پادشاهی‌ای نشست که گرفتار بود؛ از بیرون در محاصرهٔ دشمنان و از درون فرسودهٔ تفرقه. در طول سلطنت بلندش آن را یکسره دگرگون کرد و ایران را نیرومندتر، ثروتمندتر و باشکوه‌تر از هزار سال گذشته‌اش بر جای گذاشت.' }"),

 ("{ t: 'p', x: 'He was a ruler of rare gifts: a brilliant soldier, a shrewd statesman, and a great patron of art and architecture. He was also, at times, a hard and suspicious man, as the great kings of that age often were. But his vision for Iran was without equal.' }",
  "{ t: 'p', x: 'He was a ruler of rare gifts: a brilliant soldier, a shrewd statesman, and a great patron of art and architecture. He was also, at times, a hard and suspicious man, as the great kings of that age often were. But his vision for Iran was without equal.', fa: 'فرمانروایی بود با توانایی‌هایی کم‌نظیر: سربازی درخشان، سیاستمداری زیرک، و حامی بزرگ هنر و معماری. گاه نیز مردی سختگیر و بدگمان بود، چنان‌که پادشاهان بزرگ آن روزگار اغلب بودند. اما چشم‌اندازی که برای ایران داشت بی‌همتا بود.' }"),

 ("{ t: 'h', x: 'The remaking of an army' }",
  "{ t: 'h', x: 'The remaking of an army', fa: 'بازساختن یک ارتش' }"),

 ("{ t: 'p', x: 'Abbas understood the lesson of Chaldiran. He built a new standing army, no longer dependent on the fickle tribal cavalry, equipped with muskets and cannon in the modern way. With it he became master in his own house and a match for his enemies abroad.' }",
  "{ t: 'p', x: 'Abbas understood the lesson of Chaldiran. He built a new standing army, no longer dependent on the fickle tribal cavalry, equipped with muskets and cannon in the modern way. With it he became master in his own house and a match for his enemies abroad.', fa: 'عباس درس چالدران را دریافته بود. ارتشی تازه و دائمی بنیان گذاشت که دیگر به سوارهٔ بی‌ثبات ایلی وابسته نبود و به شیوهٔ مدرن به تفنگ و توپ مجهز شده بود. با همین ارتش، هم در خانهٔ خود صاحب‌اختیار شد و هم در برابر دشمنان بیرونی هماورد.' }"),

 ("{ t: 'p', x: 'Then he turned that army against the empires that had pressed Iran for so long. He drove back the Uzbeks in the east, and he won back from the Ottomans the great western lands they had taken, restoring Iran to its full strength and its rightful borders.' }",
  "{ t: 'p', x: 'Then he turned that army against the empires that had pressed Iran for so long. He drove back the Uzbeks in the east, and he won back from the Ottomans the great western lands they had taken, restoring Iran to its full strength and its rightful borders.', fa: 'سپس همین ارتش را به سوی امپراتوری‌هایی گرداند که مدت‌ها بر ایران فشار آورده بودند. ازبکان را در شرق عقب راند و سرزمین‌های بزرگ غربی را که عثمانیان گرفته بودند بازپس گرفت، و ایران را به توان کامل و مرزهای شایستهٔ خود بازگرداند.' }"),

 ("{ t: 'h', x: 'A door opened to the world' }",
  "{ t: 'h', x: 'A door opened to the world', fa: 'دری که به جهان گشوده شد' }"),

 ("{ t: 'p', x: 'Abbas welcomed the world to Iran. He invited European merchants and ambassadors, encouraged the silk trade that was the treasure of his realm, and made his country a crossroads of commerce between East and West. Iranian silk and carpets travelled to the courts of Europe, and the wealth of the world flowed into Iran.' }",
  "{ t: 'p', x: 'Abbas welcomed the world to Iran. He invited European merchants and ambassadors, encouraged the silk trade that was the treasure of his realm, and made his country a crossroads of commerce between East and West. Iranian silk and carpets travelled to the courts of Europe, and the wealth of the world flowed into Iran.', fa: 'عباس جهان را به ایران فراخواند. بازرگانان و سفیران اروپایی را دعوت کرد، تجارت ابریشم را که گنج قلمروش بود رونق بخشید، و کشورش را به چهارراه بازرگانی میان شرق و غرب بدل ساخت. ابریشم و فرش ایرانی به دربارهای اروپا راه یافت و ثروت جهان به ایران سرازیر شد.' }"),

 ("{ t: 'p', x: 'Under his hand, Iran was not only strong but prosperous, respected among the great powers of the earth, and open to the world in a way it had not been for centuries.' }",
  "{ t: 'p', x: 'Under his hand, Iran was not only strong but prosperous, respected among the great powers of the earth, and open to the world in a way it had not been for centuries.', fa: 'زیر دست او ایران نه تنها نیرومند که آباد بود؛ در میان قدرت‌های بزرگ زمین محترم شمرده می‌شد، و به روی جهان گشوده بود، آن‌گونه که قرن‌ها نبوده بود.' }"),

 ("{ t: 'p', x: 'Of all that Shah Abbas achieved, none endures more beautifully than his capital. He made Isfahan the seat of his empire and set out to make it the most beautiful city on earth, and by the judgment of many who saw it, he succeeded.' }",
  "{ t: 'p', x: 'Of all that Shah Abbas achieved, none endures more beautifully than his capital. He made Isfahan the seat of his empire and set out to make it the most beautiful city on earth, and by the judgment of many who saw it, he succeeded.', fa: 'از میان همهٔ دستاوردهای شاه عباس، هیچ‌کدام به زیبایی پایتختش بر جای نمانده است. اصفهان را مقر امپراتوری خود کرد و بر آن شد که زیباترین شهر روی زمین را بسازد؛ و به داوری بسیاری از کسانی که آن را دیدند، کامیاب شد.' }"),

 ("{ t: 'p', x: 'So great was its splendour that a saying arose, repeated by travellers across the world, that captured the wonder of all who beheld it.' }",
  "{ t: 'p', x: 'So great was its splendour that a saying arose, repeated by travellers across the world, that captured the wonder of all who beheld it.', fa: 'شکوهش چندان بود که ضرب‌المثلی از آن برخاست؛ سخنی که مسافران در سراسر جهان تکرارش کردند و شگفتی همهٔ کسانی را که آن را دیده بودند در خود داشت.' }"),
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
