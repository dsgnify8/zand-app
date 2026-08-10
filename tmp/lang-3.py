# -*- coding: utf-8 -*-
# Language, third batch: پارس/پرشیا, and the shedding of grammar.
# The gender paragraph is the one the Persian tells better — «او» needs no
# transliteration, and a Persian reader has never once thought about it.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'aside', x: 'Persia was the outside name, from Pars, one province. Iranians have always said Iran.' }",
  "{ t: 'aside', x: 'Persia was the outside name, from Pars, one province. Iranians have always said Iran.', fa: '«پرشیا» نامی بود که بیرونی‌ها گذاشته بودند، برگرفته از پارس، که تنها یکی از استان‌ها بود. ایرانی‌ها همیشه گفته‌اند ایران.' }"),

 ("{ t: 'p', x: 'Very few languages on earth can be read across three thousand years and still be recognisably themselves. Persian can. It has changed its alphabet twice and its grammar has simplified beautifully, but the thread never broke.' }",
  "{ t: 'p', x: 'Very few languages on earth can be read across three thousand years and still be recognisably themselves. Persian can. It has changed its alphabet twice and its grammar has simplified beautifully, but the thread never broke.', fa: 'زبان‌های خیلی کمی روی زمین هستند که بشود سه هزار سال از تاریخشان را خواند و هنوز همان زبان را در آن شناخت. فارسی می‌تواند. دو بار خطش را عوض کرده و دستور زبانش هم به‌زیبایی ساده شده، اما آن رشته هیچ‌وقت پاره نشد.' }"),

 ("{ t: 'h', x: 'Simpler, not weaker' }",
  "{ t: 'h', x: 'Simpler, not weaker', fa: 'ساده‌تر، نه ضعیف‌تر' }"),

 ("{ t: 'p', x: 'Old Persian was heavy with grammar, cases and genders and endings, in the way Latin was. Modern Persian shed almost all of it. There is no gender at all. No masculine table, no feminine chair. The same word, u, means he and she, and Persian has never needed to know which.' }",
  "{ t: 'p', x: 'Old Persian was heavy with grammar, cases and genders and endings, in the way Latin was. Modern Persian shed almost all of it. There is no gender at all. No masculine table, no feminine chair. The same word, u, means he and she, and Persian has never needed to know which.', fa: 'فارسی باستان از دستور زبان سنگین بود؛ حالت و جنسیت و شناسه داشت، درست مثل لاتین. فارسی امروز تقریباً همهٔ اینها را کنار گذاشت. اصلاً جنسیت ندارد. نه میزِ مذکر، نه صندلیِ مؤنث. یک واژه، «او»، هم he است و هم she، و فارسی هیچ‌وقت لازم نداشته بداند کدام.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:50])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
