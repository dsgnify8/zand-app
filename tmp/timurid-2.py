# -*- coding: utf-8 -*-
# The Timurid Empire, final batch: Ulugh Beg, the miniature, and the legacy.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'h', x: 'A king who mapped the stars' }",
  "{ t: 'h', x: 'A king who mapped the stars', fa: 'شاهی که آسمان را نقشه کرد' }"),

 ("""{ t: 'p', x: 'Timur\\'s grandson Ulugh Beg was that rarest of things, a king who was also a great scientist. At his capital of Samarkand he built one of the finest astronomical observatories of the medieval world, and there he and his scholars mapped the stars with an accuracy that would not be surpassed for centuries. A ruler of an empire spent his nights charting the heavens.' }""",
  """{ t: 'p', x: 'Timur\\'s grandson Ulugh Beg was that rarest of things, a king who was also a great scientist. At his capital of Samarkand he built one of the finest astronomical observatories of the medieval world, and there he and his scholars mapped the stars with an accuracy that would not be surpassed for centuries. A ruler of an empire spent his nights charting the heavens.', fa: 'الغ‌بیگ، نوهٔ تیمور، از آن چیزهای کمیاب بود: شاهی که دانشمندی بزرگ نیز بود. در پایتختش سمرقند یکی از بهترین رصدخانه‌های جهان سده‌های میانه را ساخت، و آنجا خود و دانشمندانش ستارگان را با دقتی نقشه کردند که قرن‌ها کسی از آن پیشی نگرفت. فرمانروای یک امپراتوری شب‌هایش را به ترسیم آسمان می‌گذراند.' }"""),

 ("{ t: 'h', x: 'The summit of Persian art' }",
  "{ t: 'h', x: 'The summit of Persian art', fa: 'قلهٔ هنر ایرانی' }"),

 ("{ t: 'p', x: 'This was the golden age of the Persian miniature, the exquisite art of painting in books, which reached under the Timurids a delicacy and beauty never surpassed. It was the age of the great poet Jami and of the master painter Behzad, whose works are treasures of world art. In poetry, painting, calligraphy, and architecture, the Timurid renaissance stands as one of the summits of Persian civilization.' }",
  "{ t: 'p', x: 'This was the golden age of the Persian miniature, the exquisite art of painting in books, which reached under the Timurids a delicacy and beauty never surpassed. It was the age of the great poet Jami and of the master painter Behzad, whose works are treasures of world art. In poetry, painting, calligraphy, and architecture, the Timurid renaissance stands as one of the summits of Persian civilization.', fa: 'این عصر طلایی نگارگری ایرانی بود، هنر ظریف نقاشی در کتاب، که زیر دست تیموریان به لطافت و زیبایی‌ای رسید که هرگز از آن پیشی گرفته نشد. روزگار جامی، شاعر بزرگ، و کمال‌الدین بهزاد، نگارگر استاد، که آثارشان از گنجینه‌های هنر جهان است. در شعر، نگارگری، خوشنویسی و معماری، رستاخیز تیموری یکی از قله‌های تمدن ایرانی است.' }"),

 ("{ t: 'p', x: 'The legacy reached even further. A prince of this house, Babur, would journey to India and found the great Mughal Empire, carrying the refined Persian culture of the Timurids to the subcontinent, where it would shape a whole civilization and raise wonders like the Taj Mahal.' }",
  "{ t: 'p', x: 'The legacy reached even further. A prince of this house, Babur, would journey to India and found the great Mughal Empire, carrying the refined Persian culture of the Timurids to the subcontinent, where it would shape a whole civilization and raise wonders like the Taj Mahal.', fa: 'این میراث حتی دورتر رفت. شاهزاده‌ای از همین خاندان، بابر، راهی هند شد و امپراتوری بزرگ گورکانی را بنیان نهاد؛ فرهنگ ظریف ایرانیِ تیموریان را با خود به شبه‌قاره برد، جایی که تمدنی تمام را شکل داد و شگفتی‌هایی چون تاج‌محل را برافراشت.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of the Timurids, whose story holds the strange and beautiful contradiction that runs through so much of this age, the terror of the conqueror and the glory of the culture he made possible. From the cruelty of Timur grew one of the most luminous cultural ages the Persian world ever knew.' }",
  "{ t: 'p', x: 'This has been a glimpse of the Timurids, whose story holds the strange and beautiful contradiction that runs through so much of this age, the terror of the conqueror and the glory of the culture he made possible. From the cruelty of Timur grew one of the most luminous cultural ages the Persian world ever knew.', fa: 'این نگاهی بود کوتاه به تیموریان؛ روایتی که آن تناقض غریب و زیبای این روزگار را در خود دارد: وحشتِ فاتح و شکوهِ فرهنگی که خود ممکنش کرد. از دل بی‌رحمی تیمور، یکی از تابناک‌ترین دوران‌های فرهنگی جهان ایرانی رویید.' }"),

 ("{ t: 'p', x: 'In the shimmering domes of Samarkand, the exquisite paintings of Herat, and the poetry and science of their courts, the Timurids left a legacy of beauty that still shines across the centuries, and carried the light of Persian civilization to the ends of the earth.' }",
  "{ t: 'p', x: 'In the shimmering domes of Samarkand, the exquisite paintings of Herat, and the poetry and science of their courts, the Timurids left a legacy of beauty that still shines across the centuries, and carried the light of Persian civilization to the ends of the earth.', fa: 'در گنبدهای درخشان سمرقند، در نگاره‌های ظریف هرات، و در شعر و دانش دربارهایشان، تیموریان میراثی از زیبایی بر جای گذاشتند که هنوز از پس قرن‌ها می‌درخشد، و روشنایی تمدن ایرانی را تا دورترین کرانه‌های زمین بردند.' }"),

 ("{ t: 'pull', x: 'From the harshest of ages, the Persian world raised a renaissance of pure beauty.' }",
  "{ t: 'pull', x: 'From the harshest of ages, the Persian world raised a renaissance of pure beauty.', fa: 'از سخت‌ترین روزگاران، جهان ایرانی رستاخیزی از زیبایی محض برآورد.' }"),
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
