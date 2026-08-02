# -*- coding: utf-8 -*-
# The Parthian Empire, first batch: Greek rule and the reconquest.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The empire of horsemen and archers that reclaimed Iran from Greek rule, held Rome at bay for centuries, and kept the Persian spirit alive between two golden ages.',",
  "essence: 'The empire of horsemen and archers that reclaimed Iran from Greek rule, held Rome at bay for centuries, and kept the Persian spirit alive between two golden ages.',\n  essenceFa: 'امپراتوری سوارکاران و کمانداران؛ آنان که ایران را از چنگ فرمانروایی یونانی بیرون کشیدند، قرن‌ها روم را پشت مرز نگاه داشتند، و روح ایرانی را میان دو عصر طلایی زنده نگه داشتند.',"),

 ("title: 'Iran Under Foreign Kings',", "title: 'Iran Under Foreign Kings', titleFa: 'ایران زیر فرمان شاهان بیگانه',"),
 ("title: 'After Alexander',", "title: 'After Alexander', titleFa: 'پس از اسکندر',"),
 ("title: 'The Reconquest of a Homeland',", "title: 'The Reconquest of a Homeland', titleFa: 'بازپس‌گیری یک سرزمین',"),
 ("title: 'The Wall Against Rome',", "title: 'The Wall Against Rome', titleFa: 'دیوار در برابر روم',"),
 ("title: 'Crossroads of the World',", "title: 'Crossroads of the World', titleFa: 'چهارراه جهان',"),
 ("title: 'The Parthian peace',", "title: 'The Parthian peace', titleFa: 'آرامش اشکانی',"),
 ("title: 'The Silk Road',", "title: 'The Silk Road', titleFa: 'جادهٔ ابریشم',"),
 ("title: 'The Passing of the Torch',", "title: 'The Passing of the Torch', titleFa: 'سپردن مشعل',"),

 ("""{ t: 'p', x: 'When Alexander of Macedon defeated the last Achaemenid king, the empire that Cyrus had built passed into foreign hands. After Alexander\\'s death his generals divided his conquests, and Iran fell to the Seleucids, a Greek dynasty who ruled the ancient land of Persia as outsiders.' }""",
  """{ t: 'p', x: 'When Alexander of Macedon defeated the last Achaemenid king, the empire that Cyrus had built passed into foreign hands. After Alexander\\'s death his generals divided his conquests, and Iran fell to the Seleucids, a Greek dynasty who ruled the ancient land of Persia as outsiders.', fa: 'چون اسکندر مقدونی واپسین شاه هخامنشی را شکست داد، امپراتوری‌ای که کوروش ساخته بود به دست بیگانگان افتاد. پس از مرگ اسکندر، سردارانش سرزمین‌های فتح‌شده را میان خود بخش کردند و ایران به سلوکیان رسید؛ سلسله‌ای یونانی که بر سرزمین کهن پارس همچون غریبه فرمان می‌راند.' }"""),

 ("{ t: 'p', x: 'For a time, Greek kings sat where the Persian kings of kings had ruled. Greek became the language of the court, Greek cities rose across the plateau, and the proud heartland of Cyrus and Darius answered to masters from a distant western land.' }",
  "{ t: 'p', x: 'For a time, Greek kings sat where the Persian kings of kings had ruled. Greek became the language of the court, Greek cities rose across the plateau, and the proud heartland of Cyrus and Darius answered to masters from a distant western land.', fa: 'چندی، شاهان یونانی بر جایی نشستند که پیش‌تر شاهنشاهان ایران فرمان رانده بودند. یونانی زبان دربار شد، شهرهای یونانی بر فلات سر برآوردند، و دل سربلند سرزمین کوروش و داریوش به اربابانی از دیاری دور در غرب پاسخ می‌داد.' }"),

 ("{ t: 'markline', x: 'The land of Cyrus, for the first time, obeyed foreign kings.' }",
  "{ t: 'markline', x: 'The land of Cyrus, for the first time, obeyed foreign kings.', fa: 'سرزمین کوروش، برای نخستین بار، از شاهان بیگانه فرمان برد.' }"),

 ("{ t: 'h', x: 'A people from the steppe' }",
  "{ t: 'h', x: 'A people from the steppe', fa: 'مردمی از دشت‌های شمال' }"),

 ("{ t: 'p', x: 'But Iran would not stay in foreign hands. From the northeast, from the wide grasslands beyond the Caspian, came a people of hardy nomadic horsemen: the Parni, led by a chief named Arsaces. Around the middle of the third century BCE, they swept into the region of Parthia and threw off Greek rule.' }",
  "{ t: 'p', x: 'But Iran would not stay in foreign hands. From the northeast, from the wide grasslands beyond the Caspian, came a people of hardy nomadic horsemen: the Parni, led by a chief named Arsaces. Around the middle of the third century BCE, they swept into the region of Parthia and threw off Greek rule.', fa: 'اما ایران در دست بیگانه نماند. از شمال شرق، از علفزارهای پهناور آن سوی خزر، مردمی آمدند از سوارکاران کوچ‌نشین و سرسخت: پَرنی‌ها، به سرکردگی مردی به نام اشک. حدود میانهٔ سدهٔ سوم پیش از میلاد به سرزمین پارت تاختند و یوغ یونانی را به کناری افکندند.' }"),

 ("{ t: 'p', x: 'From that homeland the dynasty took its name, and Arsaces gave his to the line of kings who followed, the Arsacids. From these beginnings, a small rebellion on the edge of a Greek empire, would grow one of the great powers of the ancient world.' }",
  "{ t: 'p', x: 'From that homeland the dynasty took its name, and Arsaces gave his to the line of kings who followed, the Arsacids. From these beginnings, a small rebellion on the edge of a Greek empire, would grow one of the great powers of the ancient world.', fa: 'سلسله نام خود را از همان سرزمین گرفت، و اشک نامش را به تبار شاهانی داد که پس از او آمدند: اشکانیان. از این آغاز کوچک، شورشی در حاشیهٔ یک امپراتوری یونانی، یکی از قدرت‌های بزرگ جهان باستان برخاست.' }"),

 ("{ t: 'p', x: 'What began as a frontier revolt became, over the generations, the reconquest of an entire empire. The Parthian kings pushed steadily westward and southward, city by city and province by province, driving back the weakening Greek Seleucids and restoring Iranian rule over the ancient Persian lands.' }",
  "{ t: 'p', x: 'What began as a frontier revolt became, over the generations, the reconquest of an entire empire. The Parthian kings pushed steadily westward and southward, city by city and province by province, driving back the weakening Greek Seleucids and restoring Iranian rule over the ancient Persian lands.', fa: 'آنچه شورشی مرزی آغاز شد، در گذر نسل‌ها به بازپس‌گیری یک امپراتوری تمام بدل شد. شاهان اشکانی پیوسته به غرب و جنوب پیش رفتند، شهر به شهر و ولایت به ولایت، سلوکیانِ رو به ناتوانی را عقب راندند و فرمانروایی ایرانی را بر سرزمین‌های کهن پارس بازگرداندند.' }"),

 ("{ t: 'p', x: 'The greatest of these early kings was Mithridates the First, who in the second century BCE transformed the Parthian realm from a kingdom into an empire, taking the rich lands of Mesopotamia and the title, once more, of a great Iranian king.' }",
  "{ t: 'p', x: 'The greatest of these early kings was Mithridates the First, who in the second century BCE transformed the Parthian realm from a kingdom into an empire, taking the rich lands of Mesopotamia and the title, once more, of a great Iranian king.', fa: 'بزرگ‌ترینِ این شاهان نخستین، مهرداد یکم بود که در سدهٔ دوم پیش از میلاد قلمرو اشکانی را از یک پادشاهی به یک امپراتوری بدل کرد؛ سرزمین‌های حاصلخیز میان‌رودان را گرفت و بار دیگر لقب شاه بزرگ ایران را از آن خود ساخت.' }"),
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
