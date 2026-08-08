# -*- coding: utf-8 -*-
# Nowruz, second batch: چهارشنبه‌سوری and the beginning of سفرهٔ هفت‌سین.
# The line people shout is زردی من از تو، سرخی تو از من — the Persian
# quotes it rather than translating it.

p = "constants/nowruz.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'It starts before the year does. On the last Tuesday evening of the old year, in streets and courtyards and car parks across Iran, people light small fires and jump over them.' }",
  "{ t: 'p', x: 'It starts before the year does. On the last Tuesday evening of the old year, in streets and courtyards and car parks across Iran, people light small fires and jump over them.', fa: 'پیش از آنکه سال شروع شود، شروع می‌شود. شب آخرین سه‌شنبهٔ سال، در کوچه‌ها و حیاط‌ها و پارکینگ‌های سراسر ایران، مردم آتش‌های کوچک روشن می‌کنند و از رویشان می‌پرند.' }"),

 ("{ t: 'p', x: 'And as you jump, you say the line. Everyone knows it. Nobody had to learn it.' }",
  "{ t: 'p', x: 'And as you jump, you say the line. Everyone knows it. Nobody had to learn it.', fa: 'و همان‌طور که می‌پری، آن جمله را می‌گویی. همه بلدند. هیچ‌کس لازم نبوده یادش بگیرد.' }"),

 ("{ t: 'h', x: 'What you are actually saying' }",
  "{ t: 'h', x: 'What you are actually saying', fa: 'در واقع داری چه می‌گویی' }"),

 ("{ t: 'p', x: 'My yellow is yours, your red is mine. You give the fire your sickness, your pallor, the tiredness of the year, and you take its heat and its colour in exchange. It is a trade, and it is stated out loud, and it is three thousand years old.' }",
  "{ t: 'p', x: 'My yellow is yours, your red is mine. You give the fire your sickness, your pallor, the tiredness of the year, and you take its heat and its colour in exchange. It is a trade, and it is stated out loud, and it is three thousand years old.', fa: 'زردی من از تو، سرخی تو از من. بیماری‌ات را به آتش می‌دهی، رنگ‌پریدگی‌ات را، خستگی یک سال را؛ و در عوض گرما و رنگش را می‌گیری. یک معامله است، بلند هم گفته می‌شود، و سه هزار سال قدمت دارد.' }"),

 ("{ t: 'p', x: 'The fire is not being worshipped, whatever anyone says. It is being used. Zoroastrians never worshipped fire either. They faced it, because it is the clearest thing there is, and you turn toward what you want to be like.' }",
  "{ t: 'p', x: 'The fire is not being worshipped, whatever anyone says. It is being used. Zoroastrians never worshipped fire either. They faced it, because it is the clearest thing there is, and you turn toward what you want to be like.', fa: 'آتش پرستیده نمی‌شود، هر کس هر چه بگوید. به کار گرفته می‌شود. زرتشتیان هم هرگز آتش را نمی‌پرستیدند؛ رو به آن می‌ایستادند، چون پاک‌ترین و روشن‌ترین چیزی است که هست، و آدم رو به چیزی می‌ایستد که می‌خواهد مثل آن باشد.' }"),

 ("{ t: 'aside', x: 'It has been discouraged and sometimes banned in the years since the revolution. It has not stopped once.' }",
  "{ t: 'aside', x: 'It has been discouraged and sometimes banned in the years since the revolution. It has not stopped once.', fa: 'در سال‌های پس از انقلاب از آن نهی کرده‌اند و گاهی ممنوعش کرده‌اند. حتی یک سال هم تعطیل نشده.' }"),

 ("{ t: 'p', x: 'A cloth is laid, and on it go seven things, and every one of them begins with the Persian letter seen. That is the rule, and it is the only rule, and everything else on the table is a guest.' }",
  "{ t: 'p', x: 'A cloth is laid, and on it go seven things, and every one of them begins with the Persian letter seen. That is the rule, and it is the only rule, and everything else on the table is a guest.', fa: 'سفره‌ای پهن می‌شود و هفت چیز رویش می‌رود، و نام هر هفت‌تا با حرف «س» آغاز می‌شود. قاعده همین است، و تنها قاعده هم همین است؛ هر چیز دیگری که روی سفره باشد، مهمان است.' }"),

 ("{ t: 'p', x: 'Swipe through them.' }",
  "{ t: 'p', x: 'Swipe through them.', fa: 'یکی‌یکی ببینشان.' }"),

 ("{ t: 'h', x: 'Why seven' }",
  "{ t: 'h', x: 'Why seven', fa: 'چرا هفت' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:60])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
