# -*- coding: utf-8 -*-
# The language chapter. A Persian reader doesn't need پدر transliterated —
# the word can simply be shown against father, which makes the point faster
# than the English can.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'lead', x: 'Persian was never the language of the strongest army. It simply kept becoming the language of whoever won.'",
  "{ t: 'lead', x: 'Persian was never the language of the strongest army. It simply kept becoming the language of whoever won.', fa: 'فارسی هیچ‌وقت زبان قوی‌ترین ارتش نبود. فقط هر بار زبانِ کسی می‌شد که برنده شده بود.'"),

 ("{ t: 'p', x: 'Say pedar out loud, then say father. Persian is not a distant cousin of English. It is family. Both descend from a single language spoken somewhere on the steppe thousands of years ago, by people who left no writing and whose name we do not know. Their children walked west into Europe and east into Iran and India, and their words walked with them.' }",
  "{ t: 'p', x: 'Say pedar out loud, then say father. Persian is not a distant cousin of English. It is family. Both descend from a single language spoken somewhere on the steppe thousands of years ago, by people who left no writing and whose name we do not know. Their children walked west into Europe and east into Iran and India, and their words walked with them.', fa: '«پدر» را بلند بگو، بعد «father» را. فارسی پسرعموی دورِ انگلیسی نیست؛ خانوادهٔ نزدیک است. هر دو از یک زبان واحد می‌آیند که هزاران سال پیش جایی در دشت‌های شمالی حرف زده می‌شد، به دهان مردمی که هیچ نوشته‌ای از خود به جا نگذاشتند و نامشان را هم نمی‌دانیم. فرزندانشان رو به غرب به اروپا رفتند و رو به شرق به ایران و هند، و واژه‌هایشان هم با آنها راه افتادند.' }"),

 ("{ t: 'p', x: 'Nobody borrowed these. They were inherited, from the same mouth, before Rome, before Athens, before Persepolis.' }",
  "{ t: 'p', x: 'Nobody borrowed these. They were inherited, from the same mouth, before Rome, before Athens, before Persepolis.', fa: 'هیچ‌کس این واژه‌ها را از دیگری وام نگرفته. به ارث رسیده‌اند، از یک دهان، پیش از روم، پیش از آتن، پیش از تخت جمشید.' }"),

 ("{ t: 'h', x: 'One tongue, many children' }",
  "{ t: 'h', x: 'One tongue, many children', fa: 'یک زبان، فرزندان بسیار' }"),
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
