# -*- coding: utf-8 -*-
# Ferdowsi: the Rostam and Sohrab tragedy, and his philosophy.
# فرّ ایزدی for the sacred trust of kingship; خرد for wisdom, which is
# the word Ferdowsi himself opens the Shahnameh with.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The tale of Rostam and Sohrab is among the most powerful tragedies in all of world literature, a meditation on fate, on the gulf between fathers and sons, and on the sorrow woven into even the greatest of lives. Through it, Ferdowsi shows us that his epic is not only about glory, but about the deep and human sadness at the heart of things.' }",
  "{ t: 'p', x: 'The tale of Rostam and Sohrab is among the most powerful tragedies in all of world literature, a meditation on fate, on the gulf between fathers and sons, and on the sorrow woven into even the greatest of lives. Through it, Ferdowsi shows us that his epic is not only about glory, but about the deep and human sadness at the heart of things.', fa: 'داستان رستم و سهراب از نیرومندترین سوگ‌نامه‌های ادبیات جهان است؛ تأملی بر سرنوشت، بر فاصله‌ای که میان پدران و پسران می‌افتد، و بر اندوهی که در تار و پود حتی بزرگ‌ترین زندگی‌ها بافته شده. فردوسی با این داستان به ما نشان می‌دهد که حماسه‌اش تنها از شکوه نمی‌گوید، بلکه از آن غمِ ژرف و انسانی می‌گوید که در دل هر چیزی نشسته است.' }"),

 ("{ t: 'p', x: 'Ferdowsi was far more than a teller of tales. Woven through the Shahnameh is a whole vision of life, a philosophy of wisdom, justice, and the right way to live and to rule. He speaks often, in his own voice, pausing the story to reflect on what it means.' }",
  "{ t: 'p', x: 'Ferdowsi was far more than a teller of tales. Woven through the Shahnameh is a whole vision of life, a philosophy of wisdom, justice, and the right way to live and to rule. He speaks often, in his own voice, pausing the story to reflect on what it means.', fa: 'فردوسی بسی بیش از یک داستان‌گو بود. در تار و پود شاهنامه جهان‌بینی کاملی تنیده شده است؛ حکمتی دربارهٔ خرد، داد، و شیوهٔ درستِ زیستن و فرمان راندن. بارها داستان را نگاه می‌دارد و با زبان خودش سخن می‌گوید، تا در معنای آنچه گفته درنگ کند.' }"),

 ("{ t: 'p', x: 'Above all he prized wisdom and knowledge, which he held to be the highest of all human goods, the light by which a life should be led.' }",
  "{ t: 'p', x: 'Above all he prized wisdom and knowledge, which he held to be the highest of all human goods, the light by which a life should be led.', fa: 'بیش از هر چیز خرد و دانش را ارج می‌نهاد و آنها را برترین سرمایهٔ آدمی می‌دانست؛ چراغی که باید زندگی را با آن پیمود.' }"),

 ("""{ t: 'p', x: 'He believed deeply in justice, and held that the worth of a king lay not in his power but in his fairness and his care for his people. A ruler who was cruel or unjust, however mighty, was in Ferdowsi\\'s eyes no true king at all, and was doomed to fall. Kingship, for him, was a sacred trust, not a possession.' }""",
  """{ t: 'p', x: 'He believed deeply in justice, and held that the worth of a king lay not in his power but in his fairness and his care for his people. A ruler who was cruel or unjust, however mighty, was in Ferdowsi\\'s eyes no true king at all, and was doomed to fall. Kingship, for him, was a sacred trust, not a possession.', fa: 'به داد باوری ژرف داشت و بر آن بود که ارزش شاه نه در توانش، که در دادگری و دلسوزی‌اش برای مردم است. فرمانروای ستمگر یا بیدادگر، هر اندازه هم نیرومند، در چشم فردوسی اصلاً شاه نبود و سرنوشتش فروافتادن بود. پادشاهی نزد او فرّ ایزدی بود، امانتی مقدس، نه مِلک شخصی.' }"""),

 ("{ t: 'p', x: 'And he wrote, again and again, of the fleeting nature of the world, of how kings and heroes and empires all pass away, how fortune turns and glory fades, and how only good deeds and a good name endure beyond the grave. His epic is filled with a wise and gentle sorrow at the passing of all things.' }",
  "{ t: 'p', x: 'And he wrote, again and again, of the fleeting nature of the world, of how kings and heroes and empires all pass away, how fortune turns and glory fades, and how only good deeds and a good name endure beyond the grave. His epic is filled with a wise and gentle sorrow at the passing of all things.', fa: 'و بارها و بارها از ناپایداری جهان نوشت؛ از اینکه شاهان و پهلوانان و امپراتوری‌ها همه می‌گذرند، بخت می‌گردد و شکوه رنگ می‌بازد، و تنها کردار نیک و نام نیک است که از گور فراتر می‌رود. حماسه‌اش سرشار است از اندوهی خردمندانه و ملایم بر گذر همه‌چیز.' }"),
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
