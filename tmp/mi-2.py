# -*- coding: utf-8 -*-
# Modern Iran: the White Revolution. Modern register, modern vocabulary.
# انقلاب سفید, اصلاحات ارضی, سپاه دانش, سپاه بهداشت — the actual names
# of these programmes in Persian.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'h', x: 'The White Revolution' }",
  "{ t: 'h', x: 'The White Revolution', fa: 'انقلاب سفید' }"),

 ("{ t: 'p', x: 'In 1963 Mohammad Reza Shah announced a programme he called the White Revolution: a revolution from above, made without bloodshed. His stated ambition was to move Iran, within a single generation, from a largely agricultural country into the front rank of nations.' }",
  "{ t: 'p', x: 'In 1963 Mohammad Reza Shah announced a programme he called the White Revolution: a revolution from above, made without bloodshed. His stated ambition was to move Iran, within a single generation, from a largely agricultural country into the front rank of nations.', fa: 'در سال ۱۳۴۲، محمدرضا شاه برنامه‌ای را اعلام کرد که نامش را انقلاب سفید گذاشت: انقلابی از بالا، بدون خون‌ریزی. هدفی که خودش بیان کرد این بود که ایران را در فاصلهٔ یک نسل، از کشوری عمدتاً کشاورزی به صف نخست کشورهای جهان برساند.' }"),

 ("{ t: 'p', x: 'It is worth remembering what Iran looked like before it. Most people worked land they did not own. Literacy outside the cities was low. Electricity, running water and roads reached only part of the country. The modern industrial economy had barely begun.' }",
  "{ t: 'p', x: 'It is worth remembering what Iran looked like before it. Most people worked land they did not own. Literacy outside the cities was low. Electricity, running water and roads reached only part of the country. The modern industrial economy had barely begun.', fa: 'خوب است به یاد بیاوریم ایران پیش از آن چه شکلی بود. بیشتر مردم روی زمینی کار می‌کردند که مال خودشان نبود. سواد بیرون از شهرها پایین بود. برق و آب لوله‌کشی و جاده تنها به بخشی از کشور رسیده بود. اقتصاد صنعتی مدرن تازه داشت شروع می‌شد.' }"),

 ("{ t: 'p', x: 'The programme set out to change all of that at once. Large estates were broken up and the land distributed to the farmers working it. Factories were required to share profits with their workers. Forests and waterways passed to the state. A literacy corps of young conscripts was sent into the villages to teach, and a health corps followed them. Roads, dams, power stations and universities were built at a pace the country had never seen.' }",
  "{ t: 'p', x: 'The programme set out to change all of that at once. Large estates were broken up and the land distributed to the farmers working it. Factories were required to share profits with their workers. Forests and waterways passed to the state. A literacy corps of young conscripts was sent into the villages to teach, and a health corps followed them. Roads, dams, power stations and universities were built at a pace the country had never seen.', fa: 'این برنامه می‌خواست همهٔ اینها را یکجا تغییر دهد. با اصلاحات ارضی، املاک بزرگ تقسیم شد و زمین به کشاورزانی رسید که رویش کار می‌کردند. کارخانه‌ها موظف شدند سود را با کارگرانشان سهیم شوند. جنگل‌ها و آب‌ها به دولت رسید. سپاه دانش، متشکل از سربازان جوان، برای درس دادن به روستاها فرستاده شد و سپاه بهداشت هم پس از آن آمد. جاده و سد و نیروگاه و دانشگاه با سرعتی ساخته شد که کشور تا آن روز ندیده بود.' }"),

 ("{ t: 'p', x: 'And women were given the vote. They could stand for parliament, and did. The legal age of marriage was raised, family law was reformed to give women rights in divorce and custody, and by the 1970s Iranian women were serving as ministers, judges, ambassadors, doctors and pilots.' }",
  "{ t: 'p', x: 'And women were given the vote. They could stand for parliament, and did. The legal age of marriage was raised, family law was reformed to give women rights in divorce and custody, and by the 1970s Iranian women were serving as ministers, judges, ambassadors, doctors and pilots.', fa: 'و زنان حق رأی گرفتند. می‌توانستند نامزد مجلس شوند، و شدند. سن قانونی ازدواج بالا رفت، قانون حمایت خانواده اصلاح شد تا به زنان در طلاق و حضانت حق بدهد، و تا دههٔ ۱۳۵۰ زنان ایرانی وزیر و قاضی و سفیر و پزشک و خلبان بودند.' }"),
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
