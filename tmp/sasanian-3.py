# -*- coding: utf-8 -*-
# The Sasanian Empire, third batch: Ctesiphon, Anushirvan, and the last war.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'h', x: 'A golden age of civilization' }",
  "{ t: 'h', x: 'A golden age of civilization', fa: 'عصر طلایی یک تمدن' }"),

 ("{ t: 'p', x: 'The Sasanian centuries were a golden age of Persian civilization. Their capital, Ctesiphon, was one of the greatest cities in the world, home to the mighty arch of Taq Kasra, the largest brick vault ever built, which still stands after seventeen hundred years.' }",
  "{ t: 'p', x: 'The Sasanian centuries were a golden age of Persian civilization. Their capital, Ctesiphon, was one of the greatest cities in the world, home to the mighty arch of Taq Kasra, the largest brick vault ever built, which still stands after seventeen hundred years.', fa: 'قرن‌های ساسانی عصر طلایی تمدن ایرانی بودند. پایتختشان تیسفون یکی از بزرگ‌ترین شهرهای جهان بود، خانهٔ طاق کسری، آن طاق سترگ که بزرگ‌ترین طاق آجری ساخته‌شدهٔ تاریخ است و پس از هزار و هفتصد سال هنوز ایستاده.' }"),

 ("{ t: 'p', x: 'They were patrons of learning who welcomed scholars from across the world, gathered and translated the knowledge of Greece, India, and beyond, and advanced medicine, astronomy, and philosophy. Persian art, music, silverwork, and textiles of this age were treasured from Rome to China. It was one of the summits of the ancient world.' }",
  "{ t: 'p', x: 'They were patrons of learning who welcomed scholars from across the world, gathered and translated the knowledge of Greece, India, and beyond, and advanced medicine, astronomy, and philosophy. Persian art, music, silverwork, and textiles of this age were treasured from Rome to China. It was one of the summits of the ancient world.', fa: 'حامیان دانش بودند؛ دانشمندان را از سراسر جهان پذیرا شدند، دانش یونان و هند و فراتر از آن را گرد آوردند و ترجمه کردند، و پزشکی و ستاره‌شناسی و فلسفه را پیش بردند. هنر و موسیقی و زرگری و پارچه‌بافی ایرانی این روزگار، از روم تا چین گران‌بها شمرده می‌شد. این یکی از قله‌های جهان باستان بود.' }"),

 ("{ t: 'markline', x: 'From Rome to China, the world knew the splendour of Sasanian Persia.' }",
  "{ t: 'markline', x: 'From Rome to China, the world knew the splendour of Sasanian Persia.', fa: 'از روم تا چین، جهان شکوه ایران ساسانی را می‌شناخت.' }"),

 ("{ t: 'p', x: 'The empire reached its final height under the great king Khosrow the First, remembered as Anushirvan, the Immortal Soul, a byword for justice and wisdom for centuries after. Under him the empire was reformed, learning flourished, and Persia stood at the very peak of its power and prestige.' }",
  "{ t: 'p', x: 'The empire reached its final height under the great king Khosrow the First, remembered as Anushirvan, the Immortal Soul, a byword for justice and wisdom for centuries after. Under him the empire was reformed, learning flourished, and Persia stood at the very peak of its power and prestige.', fa: 'امپراتوری در روزگار خسرو یکم به واپسین اوج خود رسید؛ همان که او را انوشیروان خواندند، یعنی دارای روان جاودان، و قرن‌ها پس از آن نامش مترادف داد و خرد ماند. زیر فرمان او امپراتوری اصلاح شد، دانش بالید، و ایران در بلندترین نقطهٔ قدرت و اعتبار خود ایستاد.' }"),

 ("{ t: 'h', x: 'The war that exhausted two empires' }",
  "{ t: 'h', x: 'The war that exhausted two empires', fa: 'جنگی که دو امپراتوری را از پا انداخت' }"),

 ("{ t: 'p', x: 'But the long rivalry with the Romans was to prove fatal to both. In the early seventh century, the Sasanians under Khosrow the Second launched a vast war against the Byzantine Empire, and at first they triumphed spectacularly, conquering Egypt, Syria, and the Holy Land, and reaching the very walls of Constantinople.' }",
  "{ t: 'p', x: 'But the long rivalry with the Romans was to prove fatal to both. In the early seventh century, the Sasanians under Khosrow the Second launched a vast war against the Byzantine Empire, and at first they triumphed spectacularly, conquering Egypt, Syria, and the Holy Land, and reaching the very walls of Constantinople.', fa: 'اما رقابت دراز با رومیان سرانجام برای هر دو کشنده از آب درآمد. در آغاز سدهٔ هفتم، ساسانیان به فرمان خسرو پرویز جنگی بزرگ با امپراتوری بیزانس به راه انداختند، و نخست پیروزی‌هایی چشمگیر به دست آوردند: مصر و شام و سرزمین مقدس را گرفتند و تا خودِ دیوارهای قسطنطنیه پیش رفتند.' }"),
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
