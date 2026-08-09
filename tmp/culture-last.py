# -*- coding: utf-8 -*-
# سوهان and آجیل — the last two dish cards, and the end of Culture.

p = "constants/culture.ts"
s = open(p).read()

B = [
 ("A saffron brittle of wheat sprout, butter, and sugar, studded with pistachio and almond, snapped from a wheel. Deep gold, hard, and dangerous to a filling. Qom makes it, and a tin of it travels back with everyone who passes through.",
  'شیرینی‌ای زعفرانی و ترد از جوانهٔ گندم و کره و شکر، پر از پسته و بادام، که تکه‌تکه از یک قرص بزرگ جدا می‌شود. طلایی سیر است و سفت، و برای پر کردگی دندان خطرناک. سوغات قم است، و هر کسی از آنجا رد شود یک جعبه‌اش را با خودش برمی‌گرداند.'),

 ("The nut mix, and it is not a snack, it is an institution. Pistachios, almonds, roasted chickpeas, hazelnuts, dried figs, mulberries, sour cherries, and seeds. Every house has a bowl of it out. It appears at Nowruz and at Yalda and on any evening at all. Iranians eat it constantly and the shells pile up in a second bowl beside it.",
  'آجیل، که یک تنقلات ساده نیست، خودش یک نهاد است. پسته، بادام، نخودچی، فندق، انجیر خشک، توت، آلبالو، و انواع تخمه. در هر خانه‌ای یک ظرفش بیرون است. سر نوروز می‌آید، شب یلدا می‌آید، و هر عصر دیگری هم می‌آید. ایرانی‌ها مدام می‌خورندش و پوستش در ظرف دومی کنارش تلنبار می‌شود.'),
]

n = 0
for en, fa in B:
    a = "x: '" + en + "'"
    if a in s:
        s = s.replace(a, a + ", xFa: '" + fa + "'", 1); n += 1
    else:
        print("  miss:", en[:35])

open(p, "w").write(s)
print("sweets:", n, "of", len(B))
