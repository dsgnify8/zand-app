# -*- coding: utf-8 -*-
# The Ilkhanate, first batch: the Mongol storm, and the turn.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The age of the Mongol storm, when Iran suffered one of the greatest catastrophes in its history, and then, astonishingly, tamed and civilized its conquerors.',",
  "essence: 'The age of the Mongol storm, when Iran suffered one of the greatest catastrophes in its history, and then, astonishingly, tamed and civilized its conquerors.',\n  essenceFa: 'روزگار توفان مغول؛ آنگاه که ایران یکی از بزرگ‌ترین فاجعه‌های تاریخش را از سر گذراند، و سپس، شگفت‌آورتر از همه، فاتحان خود را رام کرد و به فرهنگ آورد.',"),

 ("title: 'The Storm from the East',", "title: 'The Storm from the East', titleFa: 'توفانی از شرق',"),
 ("title: 'The Taming of the Conquerors',", "title: 'The Taming of the Conquerors', titleFa: 'رام شدن فاتحان',"),
 ("title: 'Rashid al-Din',", "title: 'Rashid al-Din', titleFa: 'رشیدالدین فضل‌الله',"),

 ("{ t: 'p', x: 'In the early thirteenth century, out of the steppes of Mongolia, came the most terrible conquerors the world had ever known. Under Genghis Khan, the Mongols built a war machine of unmatched speed and ferocity, and when their fury turned toward Iran, it fell upon the land like the end of the world.' }",
  "{ t: 'p', x: 'In the early thirteenth century, out of the steppes of Mongolia, came the most terrible conquerors the world had ever known. Under Genghis Khan, the Mongols built a war machine of unmatched speed and ferocity, and when their fury turned toward Iran, it fell upon the land like the end of the world.', fa: 'در آغاز سدهٔ سیزدهم، از دشت‌های مغولستان، هولناک‌ترین فاتحانی که جهان به خود دیده بود سر رسیدند. مغولان به فرمان چنگیزخان ماشین جنگی‌ای ساخته بودند بی‌همتا در شتاب و درندگی، و چون خشمشان رو به ایران گرداند، بر این سرزمین فرود آمد چون پایان جهان.' }"),

 ("""{ t: 'p', x: 'The devastation was almost beyond describing. Great and ancient cities, centers of learning and beauty that had stood for centuries, were destroyed utterly, their people slaughtered, their libraries and canals and treasures reduced to ash and rubble. It was one of the darkest hours in all of Iran\\'s long history.' }""",
  """{ t: 'p', x: 'The devastation was almost beyond describing. Great and ancient cities, centers of learning and beauty that had stood for centuries, were destroyed utterly, their people slaughtered, their libraries and canals and treasures reduced to ash and rubble. It was one of the darkest hours in all of Iran\\'s long history.', fa: 'ویرانی چنان بود که به وصف درنمی‌آید. شهرهای بزرگ و کهن، کانون‌های دانش و زیبایی که قرن‌ها ایستاده بودند، یکسره ویران شدند؛ مردمشان از دم تیغ گذشتند و کتابخانه‌ها و قنات‌ها و گنجینه‌هایشان به خاکستر و آوار بدل شد. این یکی از تاریک‌ترین ساعت‌های تاریخ بلند ایران بود.' }"""),

 ("{ t: 'markline', x: 'The Mongol storm was one of the greatest catastrophes Iran ever endured.' }",
  "{ t: 'markline', x: 'The Mongol storm was one of the greatest catastrophes Iran ever endured.', fa: 'توفان مغول از بزرگ‌ترین فاجعه‌هایی بود که بر ایران گذشت.' }"),

 ("{ t: 'h', x: 'A wound to a civilization' }",
  "{ t: 'h', x: 'A wound to a civilization', fa: 'زخمی بر پیکر یک تمدن' }"),

 ("{ t: 'p', x: 'The scale of the ruin was staggering. Cities like Nishapur, Merv, and Rey, jewels of the Persian world, were laid waste, some never to recover. The intricate irrigation systems that had made the land bloom for millennia were shattered, and whole regions were depopulated. A brilliant civilization was struck a blow from which it would take generations to recover.' }",
  "{ t: 'p', x: 'The scale of the ruin was staggering. Cities like Nishapur, Merv, and Rey, jewels of the Persian world, were laid waste, some never to recover. The intricate irrigation systems that had made the land bloom for millennia were shattered, and whole regions were depopulated. A brilliant civilization was struck a blow from which it would take generations to recover.', fa: 'اندازهٔ ویرانی حیرت‌آور بود. شهرهایی چون نیشابور و مرو و ری، نگین‌های جهان ایرانی، با خاک یکسان شدند و برخی هرگز کمر راست نکردند. شبکه‌های پیچیدهٔ آبیاری که هزاران سال این سرزمین را شکوفا کرده بودند از هم پاشید، و مناطقی تمام از سکنه خالی شد. ضربه‌ای بر تمدنی درخشان فرود آمد که ترمیمش نسل‌ها طول کشید.' }"),

 ("{ t: 'p', x: 'In 1258 the Mongols under Hulagu, grandson of Genghis, took Baghdad, the great seat of the Islamic world, and destroyed it in an orgy of violence that shocked the age. The old order of the Islamic east was swept away, and Iran lay prostrate beneath the conquerors.' }",
  "{ t: 'p', x: 'In 1258 the Mongols under Hulagu, grandson of Genghis, took Baghdad, the great seat of the Islamic world, and destroyed it in an orgy of violence that shocked the age. The old order of the Islamic east was swept away, and Iran lay prostrate beneath the conquerors.', fa: 'در سال ۱۲۵۸ مغولان به فرماندهی هولاکو، نوهٔ چنگیز، بغداد را گرفتند، مرکز بزرگ جهان اسلام، و آن را در خشونتی چنان افسارگسیخته ویران کردند که آن روزگار را تکان داد. نظم کهن شرق اسلامی از میان رفت، و ایران زیر پای فاتحان بر خاک افتاد.' }"),

 ("{ t: 'p', x: 'And then, one of the most remarkable transformations in all of history unfolded. The Mongol rulers of Iran, called the Ilkhans, settled into the land they had ruined, and slowly, over the generations, the ancient magic of Persian civilization worked upon them. The destroyers became rebuilders. The pagan nomads became Persian kings.' }",
  "{ t: 'p', x: 'And then, one of the most remarkable transformations in all of history unfolded. The Mongol rulers of Iran, called the Ilkhans, settled into the land they had ruined, and slowly, over the generations, the ancient magic of Persian civilization worked upon them. The destroyers became rebuilders. The pagan nomads became Persian kings.', fa: 'و آنگاه یکی از شگفت‌ترین دگرگونی‌های تمام تاریخ رخ داد. فرمانروایان مغول ایران، که ایلخانان خوانده شدند، در همان سرزمینی که ویرانش کرده بودند ساکن شدند، و به‌آرامی و در گذر نسل‌ها، جادوی کهن تمدن ایرانی بر آنان کارگر افتاد. ویرانگران به سازندگان بدل شدند. کوچ‌نشینان بت‌پرست، شاهان ایرانی شدند.' }"),

 ("{ t: 'markline', x: 'The civilization they had nearly destroyed rose up and remade them in its image.' }",
  "{ t: 'markline', x: 'The civilization they had nearly destroyed rose up and remade them in its image.', fa: 'تمدنی که نزدیک بود نابودش کنند، برخاست و آنان را به شکل خود از نو ساخت.' }"),
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
