# -*- coding: utf-8 -*-
# Modern Iran: the topic header, the chapter titles, and the opening of
# chapter one. Iranian dates where the event has an Iranian name.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The revolution, the war, the leaders who followed, and the long descent of the currency. What happened, in order, as plainly as it can be told.',",
  "essence: 'The revolution, the war, the leaders who followed, and the long descent of the currency. What happened, in order, as plainly as it can be told.',\n  essenceFa: 'انقلاب، جنگ، فرمانروایانی که پس از آن آمدند، و سقوط طولانی پول ملی. آنچه رخ داد، به ترتیب، و تا آنجا که بتوان ساده گفتش.',"),

 ("title: 'How It Began',", "title: 'How It Began', titleFa: 'چگونه آغاز شد',"),
 ("title: '1963 - 1979',", "title: '1963 - 1979', titleFa: '۱۳۴۲ تا ۱۳۵۷',"),
 ("title: 'The New Order',", "title: 'The New Order', titleFa: 'نظم تازه',"),
 ("title: '1979 - 1981',", "title: '1979 - 1981', titleFa: '۱۳۵۷ تا ۱۳۶۰',"),
 ("title: 'The War',", "title: 'The War', titleFa: 'جنگ',"),
 ("title: '1980 - 1988',", "title: '1980 - 1988', titleFa: '۱۳۵۹ تا ۱۳۶۷',"),
 ("title: 'The Leaders Who Followed',", "title: 'The Leaders Who Followed', titleFa: 'آنان که پس از او آمدند',"),
 ("title: '1989 - today',", "title: '1989 - today', titleFa: '۱۳۶۸ تا امروز',"),
 ("title: 'What Happened to the Money',", "title: 'What Happened to the Money', titleFa: 'بر سر پول چه آمد',"),
 ("title: '1979 - 2026',", "title: '1979 - 2026', titleFa: '۱۳۵۷ تا ۱۴۰۴',"),
 ("title: 'The Streets',", "title: 'The Streets', titleFa: 'خیابان',"),
 ("title: '1999 - 2022',", "title: '1999 - 2022', titleFa: '۱۳۷۸ تا ۱۴۰۱',"),
 ("title: 'The Wars Return',", "title: 'The Wars Return', titleFa: 'بازگشت جنگ',"),
 ("title: '2025 - 2026',", "title: '2025 - 2026', titleFa: '۱۴۰۴',"),
 ("title: 'The Winter of 2025',", "title: 'The Winter of 2025', titleFa: 'زمستان ۱۴۰۴',"),
 ("title: 'December 2025 - January 2026',", "title: 'December 2025 - January 2026', titleFa: 'دی و بهمن ۱۴۰۴',"),
 ("title: 'Where It Stands',", "title: 'Where It Stands', titleFa: 'اکنون کجاییم',"),
 ("title: 'Today',", "title: 'Today', titleFa: 'امروز',"),

 # the opening
 ("{ t: 'p', x: 'The Iran that exists today began in 1979. Everything since, the war, the money, the leaders, the arguments at every dinner table, runs back to that year.' }",
  "{ t: 'p', x: 'The Iran that exists today began in 1979. Everything since, the war, the money, the leaders, the arguments at every dinner table, runs back to that year.', fa: 'ایرانی که امروز هست، از سال ۱۳۵۷ آغاز شد. هرچه پس از آن آمده است، جنگ، پول، فرمانروایان، و بحث‌هایی که سر هر سفره‌ای درمی‌گیرد، به همان سال بازمی‌گردد.' }"),

 ("{ t: 'p', x: 'This is the hardest chapter in this book to write, because it is not finished. It is not a settled history that everyone has agreed on. It is still being lived, by people who were there and by their children, and almost every family holds a different piece of it.' }",
  "{ t: 'p', x: 'This is the hardest chapter in this book to write, because it is not finished. It is not a settled history that everyone has agreed on. It is still being lived, by people who were there and by their children, and almost every family holds a different piece of it.', fa: 'نوشتن این فصل از همهٔ فصل‌های این کتاب دشوارتر است، چرا که به پایان نرسیده. تاریخی نیست که همه بر سرش به توافق رسیده باشند. هنوز زیسته می‌شود؛ به دست کسانی که آنجا بودند و به دست فرزندانشان، و تقریباً هر خانواده‌ای تکه‌ای دیگر از آن را در دست دارد.' }"),

 ("{ t: 'p', x: 'So this is not a verdict. It is an account: what happened, in order, from the years before the Shah left to where the country stands now. Where the facts are clear they are stated plainly. Where people saw the same events and drew opposite conclusions, both are set down.' }",
  "{ t: 'p', x: 'So this is not a verdict. It is an account: what happened, in order, from the years before the Shah left to where the country stands now. Where the facts are clear they are stated plainly. Where people saw the same events and drew opposite conclusions, both are set down.', fa: 'پس این حکم نیست. روایتی است: آنچه رخ داد، به ترتیب، از سال‌های پیش از رفتن شاه تا جایی که این کشور امروز ایستاده است. هرجا واقعیت روشن است، ساده گفته شده. هرجا مردم یک رویداد را دیدند و به نتیجه‌های مخالف رسیدند، هر دو نوشته شده است.' }"),

 ("{ t: 'markline', x: 'Begin where it begins, and let the record speak.' }",
  "{ t: 'markline', x: 'Begin where it begins, and let the record speak.', fa: 'از همان‌جا که آغاز می‌شود آغاز کن، و بگذار سند سخن بگوید.' }"),
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
