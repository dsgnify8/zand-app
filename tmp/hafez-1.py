# -*- coding: utf-8 -*-
# Hafez, first prose batch. حافظ means one who holds the Quran in memory,
# which the Persian can state directly where the English must explain it.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'lead', x: 'There are two books in almost every Iranian home. One is holy. The other is Hafez.'",
  "{ t: 'lead', x: 'There are two books in almost every Iranian home. One is holy. The other is Hafez.', fa: 'در خانهٔ تقریباً هر ایرانی دو کتاب هست. یکی مقدس است. دیگری حافظ.'"),

 ("{ t: 'p', x: 'He was born Shams al Din Mohammad, in Shiraz, in a century when the city passed from one ruler to the next like a coin. His father died when he was young. The family had little. He worked, by the old accounts, in a bakery, and delivered bread to the wealthy quarters of the city.' }",
  "{ t: 'p', x: 'He was born Shams al Din Mohammad, in Shiraz, in a century when the city passed from one ruler to the next like a coin. His father died when he was young. The family had little. He worked, by the old accounts, in a bakery, and delivered bread to the wealthy quarters of the city.', fa: 'شمس‌الدین محمد زاده شد، در شیراز، در قرنی که این شهر چون سکه‌ای از دستی به دست دیگر می‌گشت. پدرش در کودکی او درگذشت. خانواده چیز چندانی نداشت. بنا بر روایت‌های کهن، در نانوایی کار می‌کرد و نان را به محله‌های توانگرنشین شهر می‌رساند.' }"),

 ("{ t: 'p', x: 'And somewhere in those years he memorised the Quran, entirely, word for word. That is what his name means. Hafez is not a name at all. It is a title given to one who holds the whole book in memory. The boy who carried bread through Shiraz was carrying something else as well.' }",
  "{ t: 'p', x: 'And somewhere in those years he memorised the Quran, entirely, word for word. That is what his name means. Hafez is not a name at all. It is a title given to one who holds the whole book in memory. The boy who carried bread through Shiraz was carrying something else as well.', fa: 'و جایی در همان سال‌ها قرآن را از بر کرد، تمامش، واژه به واژه. معنای نامش همین است. حافظ اصلاً نام نیست؛ لقبی است برای کسی که تمام کتاب را در حافظه دارد. پسری که نان را در شیراز این‌سو و آن‌سو می‌برد، چیز دیگری هم با خود حمل می‌کرد.' }"),

 ("{ t: 'p', x: 'Shiraz was already the city of Saadi, already famous for its gardens, its wine, its roses and its nightingales. Hafez almost never left it. In a century of conquerors, when Timur was burning his way across the world, this poet stayed in one city and wrote about one city, and became universal by doing so.' }",
  "{ t: 'p', x: 'Shiraz was already the city of Saadi, already famous for its gardens, its wine, its roses and its nightingales. Hafez almost never left it. In a century of conquerors, when Timur was burning his way across the world, this poet stayed in one city and wrote about one city, and became universal by doing so.', fa: 'شیراز از پیش شهر سعدی بود، از پیش به باغ‌ها و می و گل و بلبلش نامدار. حافظ تقریباً هرگز از آن بیرون نرفت. در قرنی پر از فاتحان، آنگاه که تیمور جهان را می‌سوزاند و پیش می‌رفت، این شاعر در یک شهر ماند و از یک شهر نوشت، و درست با همین کار جهانی شد.' }"),

 ("{ t: 'aside', x: 'He is the least travelled of the great Persian poets, and the most widely read.' }",
  "{ t: 'aside', x: 'He is the least travelled of the great Persian poets, and the most widely read.', fa: 'کم‌سفرترین شاعر بزرگ ایران است، و پرخواننده‌ترینشان.' }"),
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
