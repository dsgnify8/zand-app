# -*- coding: utf-8 -*-
# Hafez: the closing.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'What matters most is smaller than any of that. It is that an ordinary family, on the longest night of the year, opens a book of poems and asks it what to do. Six hundred years after his death, a poet is still the household oracle of a nation, consulted about marriages and moves and grief.' }",
  "{ t: 'p', x: 'What matters most is smaller than any of that. It is that an ordinary family, on the longest night of the year, opens a book of poems and asks it what to do. Six hundred years after his death, a poet is still the household oracle of a nation, consulted about marriages and moves and grief.', fa: 'اما آنچه بیش از همه اهمیت دارد، از همهٔ اینها کوچک‌تر است: اینکه خانواده‌ای معمولی، در درازترین شب سال، دیوان شعری را می‌گشاید و از آن می‌پرسد چه کند. ششصد سال پس از مرگش، شاعری هنوز غیب‌گوی خانگی یک ملت است؛ در کار ازدواج و کوچ و سوگ با او مشورت می‌کنند.' }"),

 ("{ t: 'p', x: 'No other literature on earth has quite this. Not one poet in one country holding this position for this long, in homes that have nothing else in common. Hafez is not read in Iran. He is consulted.' }",
  "{ t: 'p', x: 'No other literature on earth has quite this. Not one poet in one country holding this position for this long, in homes that have nothing else in common. Hafez is not read in Iran. He is consulted.', fa: 'هیچ ادبیات دیگری بر روی زمین درست چنین چیزی ندارد. نه یک شاعر در یک کشور که این‌همه سال چنین جایگاهی داشته باشد، در خانه‌هایی که جز همین هیچ وجه اشتراکی ندارند. حافظ را در ایران نمی‌خوانند. با او مشورت می‌کنند.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Hafez, the orphan of Shiraz who memorised one book and then wrote another, and who taught a whole civilization how to say the forbidden thing beautifully enough to survive saying it.' }",
  "{ t: 'p', x: 'This has been a glimpse of Hafez, the orphan of Shiraz who memorised one book and then wrote another, and who taught a whole civilization how to say the forbidden thing beautifully enough to survive saying it.', fa: 'این نگاهی بود کوتاه به حافظ؛ یتیم شیراز که کتابی را از بر کرد و سپس کتابی دیگر نوشت، و به تمدنی تمام آموخت که چگونه سخن ممنوع را چنان زیبا بگوید که از گفتنش جان به در ببرد.' }"),

 ("{ t: 'p', x: 'He offered no doctrine and demanded no belief. He only insisted that hypocrisy is the sin, that love is the law, and that the moment in your hand is the only one you were ever given. Iranians have been opening his book for six hundred years, and it has not run out of answers yet.' }",
  "{ t: 'p', x: 'He offered no doctrine and demanded no belief. He only insisted that hypocrisy is the sin, that love is the law, and that the moment in your hand is the only one you were ever given. Iranians have been opening his book for six hundred years, and it has not run out of answers yet.', fa: 'نه مکتبی عرضه کرد و نه باوری خواست. تنها بر این پای فشرد که ریا همان گناه است، که عشق همان شریعت است، و که همین دمی که در دست داری تنها دمی است که به تو داده‌اند. ایرانیان ششصد سال است دیوانش را می‌گشایند، و هنوز پاسخ‌هایش ته نکشیده.' }"),
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
