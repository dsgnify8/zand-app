# -*- coding: utf-8 -*-
# The Cyrus blocks that carry extra fields, in the revised register.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'call', title: 'A new kind of conqueror', x: 'From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.' }",
  "{ t: 'call', title: 'A new kind of conqueror', titleFa: 'فاتحی از گونه‌ای دیگر', x: 'From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.', fa: 'کوروش از همان نخستین پیروزی، خصلتی را آشکار کرد که بعدها او را تعریف می‌کرد. در روزگاری که دیگر فاتحان با کشتار و وحشت فرمان می‌راندند، او با شکست‌خوردگان مدارا کرد و آنان را در نظم تازهٔ خود جای داد. این تنها مهربانی نبود؛ شیوه‌ای خردمندانه‌تر و ماندگارتر برای فرمانروایی بود.' }"),

 ("{ t: 'q', x: 'If Croesus makes war on the Persians, he will destroy a mighty empire.', by: 'the Oracle of Delphi, in Herodotus' }",
  "{ t: 'q', x: 'If Croesus makes war on the Persians, he will destroy a mighty empire.', fa: 'اگر کرزوس با پارسیان بجنگد، امپراتوری بزرگی را نابود خواهد کرد.', by: 'the Oracle of Delphi, in Herodotus', byFa: 'پیشگوی دلفی، به روایت هرودوت' }"),

 ("{ t: 'q', x: 'I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.', by: 'the Cyrus Cylinder' }",
  "{ t: 'q', x: 'I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.', fa: 'خدایانی را که در آنجا می‌زیستند به جایگاه خویش بازگرداندم و چنان کردم که در خانه‌های جاودان خود بیارامند. همهٔ مردمان ایشان را گرد آوردم و خانه‌هایشان را به آنان بازگرداندم.', by: 'the Cyrus Cylinder', byFa: 'استوانهٔ کوروش' }"),

 ("{ t: 'q', x: 'Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.', by: 'The Book of Ezra' }",
  "{ t: 'q', x: 'Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.', fa: 'کوروش، شاه پارس، چنین می‌گوید: خداوند مرا فرمان داده است تا خانه‌ای برای او در اورشلیم بنا کنم. هر که از قوم او در میان شماست، برخیزد و برود.', by: 'The Book of Ezra', byFa: 'کتاب عزرا' }"),

 ("{ title: 'Tolerance of faith', x: 'Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.' }",
  "{ title: 'Tolerance of faith', titleFa: 'بردباری در دین', x: 'Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.', fa: 'هر مردمی آزاد بود خدایان خویش را بپرستد. کوروش نیایشگاه‌های سرزمین‌هایی را که بر آنها فرمان می‌راند، گرامی داشت.' }"),

 ("{ t: 'call', title: 'An idea that endures', x: 'The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.' }",
  "{ t: 'call', title: 'An idea that endures', titleFa: 'اندیشه‌ای که مانده است', x: 'The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.', fa: 'آرمان کوروش، اینکه مردمان گوناگون بتوانند زیر یک فرمانروایی دادگر در کنار هم زندگی کنند و هر یک هویت خویش را نگاه دارد، از کهن‌ترین و ماندگارترین آرمان‌های داستان بشر است. بیش از دو هزار و پانصد سال بعد، هنوز با ما سخن می‌گوید.' }"),

 ("{ t: 'quotebig', x: 'O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.', by: 'ATTRIBUTED TO THE TOMB OF CYRUS' }",
  "{ t: 'quotebig', x: 'O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.', fa: 'ای انسان، هر که هستی و از هر کجا که می‌آیی، من کوروشم که برای پارسیان امپراتوری را به دست آوردم. بر این اندک خاکی که پیکرم را پوشانده است رشک مبر.', by: 'ATTRIBUTED TO THE TOMB OF CYRUS', byFa: 'منسوب به آرامگاه کوروش' }"),
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
