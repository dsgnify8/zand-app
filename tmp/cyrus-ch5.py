# -*- coding: utf-8 -*-
# Cyrus, chapter five: the empire and its ideals.

p = "constants/education.ts"
s = open(p).read()

if "بزرگی راستینش" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'By now the empire of Cyrus stretched from the Aegean Sea in the west to the borders of India in the east, the largest the world had yet seen. But its true greatness lay not in its size. It lay in how he chose to rule it.' }",
  "{ t: 'p', x: 'By now the empire of Cyrus stretched from the Aegean Sea in the west to the borders of India in the east, the largest the world had yet seen. But its true greatness lay not in its size. It lay in how he chose to rule it.', fa: 'اکنون امپراتوری کوروش از دریای اژه در غرب تا مرزهای هند در شرق کشیده شده بود، بزرگ‌ترین امپراتوری‌ای که جهان تا آن روز دیده بود. اما بزرگی راستینش در وسعتش نبود؛ در شیوه‌ای بود که برای فرمانروایی برگزید.' }"),

 ("{ t: 'h', x: 'A new idea of empire' }",
  "{ t: 'h', x: 'A new idea of empire', fa: 'اندیشه‌ای تازه از امپراتوری' }"),

 ("{ t: 'p', x: 'The empires before him had ruled by fear. They deported whole peoples, burned rebellious cities, and demanded that the conquered abandon their gods and their ways. Cyrus built something different. He let the many peoples of his empire keep their own faiths, their own customs, and their own local rulers, so long as they kept the peace and paid their tribute.' }",
  "{ t: 'p', x: 'The empires before him had ruled by fear. They deported whole peoples, burned rebellious cities, and demanded that the conquered abandon their gods and their ways. Cyrus built something different. He let the many peoples of his empire keep their own faiths, their own customs, and their own local rulers, so long as they kept the peace and paid their tribute.', fa: 'امپراتوری‌های پیش از او با ترس حکم رانده بودند. مردمانی را یکسره کوچ می‌دادند، شهرهای سرکش را می‌سوزاندند و از شکست‌خوردگان می‌خواستند خدایان و آیین‌های خود را رها کنند. کوروش چیز دیگری ساخت. گذاشت مردمان بسیار امپراتوری‌اش دین خود، رسم خود و فرمانروایان بومی خود را نگه دارند، تا زمانی که آرامش را برهم نزنند و باج خود را بپردازند.' }"),

 ("{ t: 'steps', x: 'Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.' }",
  "{ t: 'steps', x: 'Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.', fa: 'هر مردمی آزاد بود خدایان خود را بپرستد. کوروش نیایشگاه‌های سرزمین‌هایی را که بر آنها فرمان می‌راند، گرامی داشت.' }"),

 ("{ t: 'p', x: 'This was more than mercy. It was a philosophy of power, the understanding that an empire held together by respect would outlast one held together by fear. For his ideals of tolerance and human dignity, the Cyrus Cylinder is sometimes called the first charter of human rights, and a copy of it rests today at the United Nations.' }",
  "{ t: 'p', x: 'This was more than mercy. It was a philosophy of power, the understanding that an empire held together by respect would outlast one held together by fear. For his ideals of tolerance and human dignity, the Cyrus Cylinder is sometimes called the first charter of human rights, and a copy of it rests today at the United Nations.', fa: 'این فراتر از بخشش بود. فلسفه‌ای از قدرت بود؛ این دریافت که امپراتوری‌ای که با احترام به هم بسته شده باشد، از امپراتوری‌ای که با ترس نگه داشته شده، دیرتر می‌پاید. به سبب همین آرمان‌های بردباری و کرامت انسانی، استوارنهٔ کوروش را گاه نخستین منشور حقوق بشر خوانده‌اند، و رونوشتی از آن امروز در سازمان ملل نگهداری می‌شود.' }"),

 ("{ t: 'call', x: 'The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.' }",
  "{ t: 'call', x: 'The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.', fa: 'آرمان کوروش، اینکه مردمانِ گوناگون بتوانند زیر یک فرمانروایی دادگر با هم زندگی کنند و هر یک هویت خود را نگه دارد، از کهن‌ترین و ماندگارترین آرمان‌های داستان بشر است. بیش از دو هزار و پانصد سال بعد، هنوز با ما سخن می‌گوید.' }"),
]

# SKIP_MISSING: apply what matches, report the rest rather than aborting
applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1)
        applied += 1
    else:
        skipped.append(a[:70])
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

# a typo guard: the cylinder is استوانه, not استوارنه
s = s.replace("استوارنهٔ کوروش", "استوانهٔ کوروش")

open(p, "w").write(s)
print("chapter five translated:", len(PAIRS), "blocks")
