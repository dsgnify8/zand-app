# -*- coding: utf-8 -*-
# The Zand dynasty: the last untranslated blocks and the timeline.
# These use double-quoted strings, which is why earlier passes missed them.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ('{ t: \'p\', x: "In 1747 the great conqueror Nader Shah, the last of Iran\\\'s warrior kings, was assassinated by his own officers. With his death the country he had ruled by fear fell into chaos, and for years the land was torn apart by warlords and generals fighting over the ruins of his empire." }',
  '{ t: \'p\', x: "In 1747 the great conqueror Nader Shah, the last of Iran\\\'s warrior kings, was assassinated by his own officers. With his death the country he had ruled by fear fell into chaos, and for years the land was torn apart by warlords and generals fighting over the ruins of his empire.", fa: \'در سال ۱۷۴۷ نادرشاه، آن فاتح بزرگ و واپسین شاهِ جنگاور ایران، به دست افسران خودش ترور شد. با مرگ او، کشوری که با ترس اداره‌اش کرده بود به هرج‌ومرج افتاد، و سال‌ها این سرزمین را سرداران و خان‌هایی که بر سر ویرانه‌های امپراتوری او می‌جنگیدند از هم دریدند.\' }'),

 ('{ t: \'p\', x: "It was one of the darkest and most violent periods in Iran\\\'s long history. Out of that darkness, and out of the mountains of the west, rose a man who would offer his exhausted country something it had almost forgotten: peace, and a ruler who cared for it." }',
  '{ t: \'p\', x: "It was one of the darkest and most violent periods in Iran\\\'s long history. Out of that darkness, and out of the mountains of the west, rose a man who would offer his exhausted country something it had almost forgotten: peace, and a ruler who cared for it.", fa: \'یکی از تاریک‌ترین و خشونت‌بارترین دوره‌های تاریخ بلند ایران بود. از دل همان تاریکی، و از کوه‌های غرب، مردی برخاست که به کشور خستهٔ خود چیزی را پیشنهاد کرد که تقریباً از یاد برده بود: آرامش، و فرمانروایی که به فکرش باشد.\' }'),

 ('{ t: \'p\', x: "Here Karim Khan did something almost unheard of in the history of kings. With Iran his to command, and the throne there for the taking, he refused the title of Shah, the king of kings. Instead he kept a young prince of the old Safavid line as nominal monarch, and styled himself Vakil e-Ra\\\'aya, the Advocate, or Deputy, of the People." }',
  '{ t: \'p\', x: "Here Karim Khan did something almost unheard of in the history of kings. With Iran his to command, and the throne there for the taking, he refused the title of Shah, the king of kings. Instead he kept a young prince of the old Safavid line as nominal monarch, and styled himself Vakil e-Ra\\\'aya, the Advocate, or Deputy, of the People.", fa: \'اینجا کریم‌خان کاری کرد که در تاریخ شاهان تقریباً بی‌سابقه است. ایران در فرمانش بود و تخت هم آمادهٔ نشستن، اما لقب شاه، شاهنشاه، را نپذیرفت. به جای آن شاهزاده‌ای جوان از تبار صفوی را به نامِ پادشاه نگاه داشت و خود را وکیل‌الرعایا خواند؛ یعنی وکیل مردم.\' }'),

 ('{ t: \'pull\', x: "He gave his beloved city monuments that still bear his people\\\'s name, not his own." }',
  '{ t: \'pull\', x: "He gave his beloved city monuments that still bear his people\\\'s name, not his own.", fa: \'به شهر محبوبش بناهایی بخشید که هنوز نام مردمش را بر خود دارند، نه نام خودش را.\' }'),

 ('{ t: \'p\', x: "The years of Karim Khan\\\'s rule were, for most Iranians, a rare and precious season of calm. After decades of war, famine, and cruelty, the country knew peace, and under peace it began to heal and to prosper." }',
  '{ t: \'p\', x: "The years of Karim Khan\\\'s rule were, for most Iranians, a rare and precious season of calm. After decades of war, famine, and cruelty, the country knew peace, and under peace it began to heal and to prosper.", fa: \'سال‌های فرمانروایی کریم‌خان، برای بیشتر ایرانیان، فصلی بود کمیاب و گران‌بها از آرامش. پس از دهه‌ها جنگ و قحطی و بی‌رحمی، کشور آرامش را چشید، و در سایهٔ آرامش رو به بهبود و آبادانی گذاشت.\' }'),

 # timeline
 ("{ year: '1747', label: 'Nader Shah assassinated' }",
  "{ year: '1747', label: 'Nader Shah assassinated', labelFa: 'ترور نادرشاه' }"),
 ("{ year: '1751', label: 'Karim Khan rises to power' }",
  "{ year: '1751', label: 'Karim Khan rises to power', labelFa: 'کریم‌خان به قدرت می‌رسد' }"),
 ("{ year: '1765', label: 'Shiraz made the capital' }",
  "{ year: '1765', label: 'Shiraz made the capital', labelFa: 'شیراز پایتخت می‌شود' }"),
 ("{ year: '1779', label: 'Death of Karim Khan' }",
  "{ year: '1779', label: 'Death of Karim Khan', labelFa: 'درگذشت کریم‌خان' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:75])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
