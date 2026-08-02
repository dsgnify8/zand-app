# -*- coding: utf-8 -*-
# The Afsharid dynasty, first batch: the shepherd, the rescue, the crown.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The dynasty of Nader Shah, the shepherd boy who became the last great conqueror of the East, and one of the most brilliant and terrible military minds in history.',",
  "essence: 'The dynasty of Nader Shah, the shepherd boy who became the last great conqueror of the East, and one of the most brilliant and terrible military minds in history.',\n  essenceFa: 'سلسلهٔ نادرشاه؛ پسرکِ چوپانی که واپسین فاتح بزرگ شرق شد، و یکی از درخشان‌ترین و هولناک‌ترین ذهن‌های نظامی تاریخ.',"),

 ("title: 'From Shepherd to Warlord',", "title: 'From Shepherd to Warlord', titleFa: 'از چوپانی تا سرداری',"),
 ("title: 'Nader of the Afshar',", "title: 'Nader of the Afshar', titleFa: 'نادرِ افشار',"),
 ("title: 'The Crown and the Conqueror',", "title: 'The Crown and the Conqueror', titleFa: 'تاج و فاتح',"),
 ("title: 'The March on India',", "title: 'The March on India', titleFa: 'لشکرکشی به هند',"),
 ("title: 'The Peacock Throne',", "title: 'The Peacock Throne', titleFa: 'تخت طاووس',"),
 ("title: 'The Genius and the Shadow',", "title: 'The Genius and the Shadow', titleFa: 'نبوغ و سایه',"),
 ("title: 'The two faces of Nader',", "title: 'The two faces of Nader', titleFa: 'دو چهرهٔ نادر',"),
 ("title: 'The genius',", "title: 'The genius', titleFa: 'نبوغ',"),
 ("title: 'The shadow',", "title: 'The shadow', titleFa: 'سایه',"),
 ("title: 'The Fall of the Sword',", "title: 'The Fall of the Sword', titleFa: 'فرود آمدن شمشیر',"),

 ("{ t: 'p', x: 'He was born into poverty in the northern lands of Khorasan, a boy of a humble tribe named Afshar, in a time of chaos. As a child, it is said, he and his mother were carried off by raiders and enslaved, and he escaped to make his own way in a broken world. From these lowest of beginnings would rise the most feared conqueror of his age.' }",
  "{ t: 'p', x: 'He was born into poverty in the northern lands of Khorasan, a boy of a humble tribe named Afshar, in a time of chaos. As a child, it is said, he and his mother were carried off by raiders and enslaved, and he escaped to make his own way in a broken world. From these lowest of beginnings would rise the most feared conqueror of his age.', fa: 'در تنگدستی زاده شد، در شمال خراسان، پسری از ایلی گمنام به نام افشار، در روزگاری آشفته. گفته‌اند در کودکی او و مادرش را غارتگران بردند و به بردگی گرفتند، و او گریخت تا در جهانی از هم پاشیده راه خود را بیابد. از همین پست‌ترین آغازها، هراس‌انگیزترین فاتح روزگارش برخاست.' }"),

 ("{ t: 'p', x: 'His name was Nader. Tall, powerful, and possessed of a will of iron and a genius for war, he rose through sheer ability in a land that had fallen into anarchy. When the Safavid Empire collapsed and Afghan invaders seized the throne of Iran, it was Nader, a warlord commanding his own band of fighters, who would answer the call to save the nation.' }",
  "{ t: 'p', x: 'His name was Nader. Tall, powerful, and possessed of a will of iron and a genius for war, he rose through sheer ability in a land that had fallen into anarchy. When the Safavid Empire collapsed and Afghan invaders seized the throne of Iran, it was Nader, a warlord commanding his own band of fighters, who would answer the call to save the nation.', fa: 'نامش نادر بود. بلندبالا و نیرومند، با ارادهٔ آهنین و نبوغی در جنگ، تنها با توانایی خود در سرزمینی که به هرج‌ومرج افتاده بود بالا آمد. وقتی امپراتوری صفوی فرو ریخت و مهاجمان افغان بر تخت ایران نشستند، همین نادر بود، سرداری در رأس دسته‌ای از جنگاوران خودش، که به ندای نجات کشور پاسخ داد.' }"),

 ("{ t: 'h', x: 'The savior of Iran' }",
  "{ t: 'h', x: 'The savior of Iran', fa: 'ناجی ایران' }"),

 ("{ t: 'p', x: 'Iran in the 1720s was a nation on its knees. The proud Safavid Empire had fallen to a band of Afghan rebels, foreign powers circled to seize its lands, and the country lay open to ruin. Into this darkness stepped Nader, offering his sword to a Safavid prince and swiftly becoming the true power behind the throne.' }",
  "{ t: 'p', x: 'Iran in the 1720s was a nation on its knees. The proud Safavid Empire had fallen to a band of Afghan rebels, foreign powers circled to seize its lands, and the country lay open to ruin. Into this darkness stepped Nader, offering his sword to a Safavid prince and swiftly becoming the true power behind the throne.', fa: 'ایرانِ دههٔ ۱۷۲۰ ملتی بود به زانو درآمده. امپراتوری سربلند صفوی به دست دسته‌ای شورشی افغان افتاده بود، قدرت‌های بیگانه گرد سرزمینش می‌چرخیدند تا تکه‌ای بردارند، و کشور در برابر ویرانی بی‌دفاع بود. نادر در همین تاریکی پا پیش گذاشت؛ شمشیرش را به شاهزاده‌ای صفوی سپرد و به‌سرعت به قدرت واقعی پشت تخت بدل شد.' }"),

 ("{ t: 'p', x: 'With a reborn army trained to his own exacting standard, he drove the Afghan occupiers out of Iran, then turned on the Ottomans and the Russians who had seized Iranian lands in the time of weakness, and won them back one by one. In a few short years, he had raised Iran from the grave.' }",
  "{ t: 'p', x: 'With a reborn army trained to his own exacting standard, he drove the Afghan occupiers out of Iran, then turned on the Ottomans and the Russians who had seized Iranian lands in the time of weakness, and won them back one by one. In a few short years, he had raised Iran from the grave.', fa: 'با ارتشی از نو ساخته که به معیار سختگیرانهٔ خودش آموزش دیده بود، اشغالگران افغان را از ایران بیرون راند، سپس رو به عثمانی و روسیه آورد که در روزگار ناتوانی سرزمین‌های ایرانی را گرفته بودند، و یکی پس از دیگری بازپسشان گرفت. در چند سال کوتاه، ایران را از گور بیرون کشید.' }"),

 ("{ t: 'markline', x: 'A shepherd boy had become the sword that saved a nation.' }",
  "{ t: 'markline', x: 'A shepherd boy had become the sword that saved a nation.', fa: 'پسرکِ چوپان، شمشیری شد که ملتی را نجات داد.' }"),

 ("{ t: 'p', x: 'Having saved Iran, Nader saw no reason to hand it back. In 1736, on a great plain where he summoned the nobles of the realm, he had himself proclaimed Shah, setting aside the last of the Safavids and founding his own dynasty, the Afsharid. The captive shepherd boy now wore the crown of the kings of kings.' }",
  "{ t: 'p', x: 'Having saved Iran, Nader saw no reason to hand it back. In 1736, on a great plain where he summoned the nobles of the realm, he had himself proclaimed Shah, setting aside the last of the Safavids and founding his own dynasty, the Afsharid. The captive shepherd boy now wore the crown of the kings of kings.', fa: 'نادر که ایران را نجات داده بود، دلیلی نمی‌دید آن را پس بدهد. در سال ۱۷۳۶، در دشت مغان که بزرگان کشور را در آن گرد آورده بود، خود را شاه خواند، واپسین صفوی را کنار گذاشت و سلسلهٔ خودش را بنیان نهاد: افشاریان. آن پسرکِ به‌اسارت‌رفتهٔ چوپان، اکنون تاج شاهنشاهی بر سر داشت.' }"),

 ("{ t: 'h', x: 'The Napoleon of Persia' }",
  "{ t: 'h', x: 'The Napoleon of Persia', fa: 'شمشیری که شرق را لرزاند' }"),
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
