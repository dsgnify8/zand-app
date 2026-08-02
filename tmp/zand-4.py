# -*- coding: utf-8 -*-
# The Zand dynasty: the last two call blocks, and the steps items.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ('{ t: \'call\', title: \'A rare kind of power\', x: "Power rarely makes men gentler. In Karim Khan it did. He understood his authority as a duty owed to his people, and that understanding is the quiet heart of the whole Zand story." }',
  '{ t: \'call\', title: \'A rare kind of power\', titleFa: \'گونه‌ای کمیاب از قدرت\', x: "Power rarely makes men gentler. In Karim Khan it did. He understood his authority as a duty owed to his people, and that understanding is the quiet heart of the whole Zand story.", fa: \'قدرت به‌ندرت آدمیان را مهربان‌تر می‌کند. در کریم‌خان چنین کرد. او اقتدار خود را وظیفه‌ای می‌دانست که به مردمش بدهکار است، و همین درک، قلب آرام تمام داستان زند است.\' }'),

 ('{ t: \'call\', title: \'Remembered with love\', x: "History is full of conquerors who won great empires and are remembered with fear. Karim Khan won something rarer. He is remembered with affection, as a good man who used his power to shelter his people rather than to glorify himself." }',
  '{ t: \'call\', title: \'Remembered with love\', titleFa: \'با محبت به یاد مانده\', x: "History is full of conquerors who won great empires and are remembered with fear. Karim Khan won something rarer. He is remembered with affection, as a good man who used his power to shelter his people rather than to glorify himself.", fa: \'تاریخ پر است از فاتحانی که امپراتوری‌های بزرگ به دست آوردند و با ترس به یاد آورده می‌شوند. کریم‌خان چیز کمیاب‌تری به دست آورد: با محبت به یاد آورده می‌شود، چون مرد نیکی که قدرتش را برای پناه دادن به مردمش به کار برد، نه برای بزرگ کردن خویش.\' }'),
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
