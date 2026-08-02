# -*- coding: utf-8 -*-
# Two Centuries of Silence: the embers, the revival, and Ferdowsi.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'In the villages and the mountains, in the lullabies of mothers and the tales of grandfathers, the Persian language lived on. The old stories of the kings and heroes of Iran, of Jamshid and Fereydun and Rostam, were still told around the fires at night. The memory of a glorious past was kept alive, a quiet ember waiting for the wind that would make it blaze again.' }",
  "{ t: 'p', x: 'In the villages and the mountains, in the lullabies of mothers and the tales of grandfathers, the Persian language lived on. The old stories of the kings and heroes of Iran, of Jamshid and Fereydun and Rostam, were still told around the fires at night. The memory of a glorious past was kept alive, a quiet ember waiting for the wind that would make it blaze again.', fa: 'در دهکده‌ها و کوهستان‌ها، در لالایی مادران و قصهٔ پدربزرگ‌ها، زبان فارسی زنده ماند. داستان‌های کهن شاهان و پهلوانان ایران، از جمشید و فریدون و رستم، هنوز شب‌ها بر گرد آتش گفته می‌شد. یاد گذشته‌ای پرشکوه زنده نگاه داشته شد؛ اخگری خاموش، در انتظار بادی که دوباره شعله‌ورش کند.' }"),

 ("{ t: 'h', x: 'The stirrings of revival' }",
  "{ t: 'h', x: 'The stirrings of revival', fa: 'نخستین جنبش‌های بیداری' }"),

 ("{ t: 'p', x: 'Slowly, over the generations, Iran began to stir. The Persian genius, far from being extinguished, poured itself into the new civilization and helped to build its golden age, its scholars, its poets, its statesmen shaping the culture of the whole Islamic world. Iran was not erased. It was transformed, and it transformed everything it touched.' }",
  "{ t: 'p', x: 'Slowly, over the generations, Iran began to stir. The Persian genius, far from being extinguished, poured itself into the new civilization and helped to build its golden age, its scholars, its poets, its statesmen shaping the culture of the whole Islamic world. Iran was not erased. It was transformed, and it transformed everything it touched.', fa: 'به‌آرامی و در گذر نسل‌ها، ایران جنبیدن گرفت. نبوغ ایرانی نه‌تنها خاموش نشده بود، که خود را در تمدن تازه ریخت و در ساختن عصر طلایی آن سهم گرفت؛ دانشمندان، شاعران و دیوانیانش فرهنگ سراسر جهان اسلام را شکل دادند. ایران محو نشد. دگرگون شد، و هر چه را که لمس کرد دگرگون ساخت.' }"),

 ("{ t: 'p', x: 'And in the east, in the lands of Khorasan far from the seat of the conquerors, Persian princes began to rule again, and to gather at their courts the poets and scholars who spoke the old tongue. The Samanids and others gave shelter to the Persian language and the Persian spirit, and a great revival began to gather its strength. The silence was ending.' }",
  "{ t: 'p', x: 'And in the east, in the lands of Khorasan far from the seat of the conquerors, Persian princes began to rule again, and to gather at their courts the poets and scholars who spoke the old tongue. The Samanids and others gave shelter to the Persian language and the Persian spirit, and a great revival began to gather its strength. The silence was ending.', fa: 'و در شرق، در سرزمین خراسان و دور از مرکز فاتحان، شاهزادگان ایرانی دوباره به فرمانروایی رسیدند و شاعران و دانشمندانی را که به زبان کهن سخن می‌گفتند در دربار خود گرد آوردند. سامانیان و دیگران زبان فارسی و روح ایرانی را پناه دادند، و رستاخیزی بزرگ کم‌کم نیرو گرفت. سکوت داشت به پایان می‌رسید.' }"),

 ("{ t: 'p', x: 'Every people needs a voice to speak its soul, and Iran found hers in one of the greatest poets who ever lived. In the eastern city of Tus, a nobleman set himself a task that would consume more than thirty years of his life, and that would give Iran back its very self.' }",
  "{ t: 'p', x: 'Every people needs a voice to speak its soul, and Iran found hers in one of the greatest poets who ever lived. In the eastern city of Tus, a nobleman set himself a task that would consume more than thirty years of his life, and that would give Iran back its very self.', fa: 'هر ملتی صدایی می‌خواهد تا جانش را بر زبان آورد، و ایران صدای خود را در یکی از بزرگ‌ترین شاعران تاریخ یافت. در شهر توس، در شرق ایران، مردی از خاندان دهقانان کاری را بر دوش گرفت که بیش از سی سال از عمرش را برد، و ایران را به خودش بازگرداند.' }"),

 ("{ t: 'h', x: 'A book to hold a nation' }",
  "{ t: 'h', x: 'A book to hold a nation', fa: 'کتابی که ملتی را در خود نگاه داشت' }"),

 ("{ t: 'p', x: 'The Shahnameh is one of the longest and greatest epic poems ever composed by a single hand, nearly sixty thousand verses, a whole world of kings and warriors, love and war, tragedy and glory. But it was far more than a collection of stories. It was an act of preservation, and of defiance.' }",
  "{ t: 'p', x: 'The Shahnameh is one of the longest and greatest epic poems ever composed by a single hand, nearly sixty thousand verses, a whole world of kings and warriors, love and war, tragedy and glory. But it was far more than a collection of stories. It was an act of preservation, and of defiance.', fa: 'شاهنامه از بلندترین و بزرگ‌ترین حماسه‌هایی است که به دست یک تن سروده شده؛ نزدیک شصت هزار بیت، جهانی تمام از شاهان و پهلوانان، از عشق و جنگ، از سوگ و شکوه. اما این کتاب بسی بیش از مجموعه‌ای از داستان‌ها بود. کاری بود از جنس نگاهبانی، و از جنس ایستادگی.' }"),

 ("""{ t: 'p', x: 'For Ferdowsi wrote it in pure Persian, reaching for the old words and turning away from the Arabic that had flooded the language, determined to prove that Persian could carry the whole weight of a nation\\'s memory and glory. In giving Iran its epic, he gave it back its language, whole and alive.' }""",
  """{ t: 'p', x: 'For Ferdowsi wrote it in pure Persian, reaching for the old words and turning away from the Arabic that had flooded the language, determined to prove that Persian could carry the whole weight of a nation\\'s memory and glory. In giving Iran its epic, he gave it back its language, whole and alive.', fa: 'زیرا فردوسی آن را به فارسی سره سرود؛ واژه‌های کهن را جست و از عربی‌ای که زبان را فرا گرفته بود روی گرداند، و بر آن بود تا نشان دهد فارسی می‌تواند تمام بار خاطره و شکوه یک ملت را بر دوش بکشد. او با بخشیدن حماسه به ایران، زبانش را نیز به او بازگرداند؛ درست و زنده.' }"""),
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
