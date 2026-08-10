# -*- coding: utf-8 -*-
# Language, fifth batch. The heart-words paragraph is the one that lands
# hardest in Persian, because the reader can say each word as it appears:
# مادر، پدر، آب، نان، آتش، آسمان، عشق، یک تا ده.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The grammar. Arabic is Semitic, built on three letter roots that bend into patterns. Persian is Indo European, and its verbs, its word order, its whole architecture stayed exactly where they were. A Persian sentence is not an Arabic sentence with different words. It is a different machine.' }",
  "{ t: 'p', x: 'The grammar. Arabic is Semitic, built on three letter roots that bend into patterns. Persian is Indo European, and its verbs, its word order, its whole architecture stayed exactly where they were. A Persian sentence is not an Arabic sentence with different words. It is a different machine.', fa: 'دستور زبان. عربی زبانی سامی است، بنا شده بر ریشه‌های سه‌حرفی که در وزن‌های مشخص صرف می‌شوند. فارسی هندواروپایی است، و فعل‌هایش، ترتیب واژه‌هایش، و تمام معماری‌اش دقیقاً همان‌جا ماند که بود. یک جملهٔ فارسی، جملهٔ عربی با واژه‌های دیگر نیست. ماشین دیگری است.' }"),

 ("{ t: 'mark', x: 'Persian borrowed Arabic words the way English borrowed French. The bones never changed.' }",
  "{ t: 'mark', x: 'Persian borrowed Arabic words the way English borrowed French. The bones never changed.', fa: 'فارسی از عربی واژه وام گرفت، همان‌طور که انگلیسی از فرانسه وام گرفت. استخوان‌بندی هیچ‌وقت عوض نشد.' }"),

 ("{ t: 'p', x: 'And the words closest to the heart stayed Persian. Mother, father, water, bread, fire, sky, love, and every number from one to ten. The conqueror language reached the courts and the books. It never reached the kitchen or the lullaby.' }",
  "{ t: 'p', x: 'And the words closest to the heart stayed Persian. Mother, father, water, bread, fire, sky, love, and every number from one to ten. The conqueror language reached the courts and the books. It never reached the kitchen or the lullaby.', fa: 'و واژه‌هایی که به دل نزدیک‌ترند فارسی ماندند. مادر، پدر، آب، نان، آتش، آسمان، عشق، و هر عددی از یک تا ده. زبان فاتح به دربارها رسید و به کتاب‌ها. هیچ‌وقت به آشپزخانه و لالایی نرسید.' }"),

 ("{ t: 'h', x: 'And then a poet drew the line' }",
  "{ t: 'h', x: 'And then a poet drew the line', fa: 'و بعد شاعری خط را کشید' }"),
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
