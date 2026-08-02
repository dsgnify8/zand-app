# -*- coding: utf-8 -*-
# The Timurid Empire, first batch: Timur, Samarkand, and the renaissance.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The dynasty of Tamerlane, a conqueror as terrible as any in history, whose descendants presided over one of the most dazzling cultural renaissances the Persian world ever knew.',",
  "essence: 'The dynasty of Tamerlane, a conqueror as terrible as any in history, whose descendants presided over one of the most dazzling cultural renaissances the Persian world ever knew.',\n  essenceFa: 'سلسلهٔ تیمور لنگ؛ فاتحی به هولناکی هر که تاریخ به خود دیده، که بازماندگانش بر یکی از درخشان‌ترین رستاخیزهای فرهنگی جهان ایرانی سرپرستی کردند.',"),

 ("title: 'The Last Great Conqueror',", "title: 'The Last Great Conqueror', titleFa: 'واپسین فاتح بزرگ',"),
 ("title: 'Timur (Tamerlane)',", "title: 'Timur (Tamerlane)', titleFa: 'تیمور لنگ',"),
 ("title: 'The Timurid Renaissance',", "title: 'The Timurid Renaissance', titleFa: 'رستاخیز تیموری',"),
 ("title: 'The Persian miniature',", "title: 'The Persian miniature', titleFa: 'نگارگری ایرانی',"),

 ("{ t: 'p', x: 'In the fourteenth century, out of Central Asia, rose the last of the great steppe conquerors, a man the Persians called Timur and the West would call Tamerlane. Claiming the mantle of Genghis Khan, he built an empire by the sword across the Persian world and far beyond, and his name became a byword for both brilliance and terror.' }",
  "{ t: 'p', x: 'In the fourteenth century, out of Central Asia, rose the last of the great steppe conquerors, a man the Persians called Timur and the West would call Tamerlane. Claiming the mantle of Genghis Khan, he built an empire by the sword across the Persian world and far beyond, and his name became a byword for both brilliance and terror.', fa: 'در سدهٔ چهاردهم، از آسیای میانه، واپسین فاتح بزرگ دشت‌ها برخاست؛ مردی که ایرانیان تیمور خواندندش و غرب او را تیمورلنگ نامید. ردای چنگیز را از آنِ خود دانست و با شمشیر امپراتوری‌ای در سراسر جهان ایرانی و بسی فراتر از آن برپا کرد. نامش مترادف شد با نبوغ و با وحشت، هر دو با هم.' }"),

 ("{ t: 'p', x: 'Timur was a military genius who was never once defeated in battle across a lifetime of war, and he was also fearsomely cruel, leaving towers of skulls in the wake of his conquests. He carved out a vast empire centered on the Persian world, from India to the edge of Europe, in a career of almost ceaseless campaigning.' }",
  "{ t: 'p', x: 'Timur was a military genius who was never once defeated in battle across a lifetime of war, and he was also fearsomely cruel, leaving towers of skulls in the wake of his conquests. He carved out a vast empire centered on the Persian world, from India to the edge of Europe, in a career of almost ceaseless campaigning.', fa: 'تیمور نابغه‌ای نظامی بود که در تمام عمر جنگیدنش حتی یک بار در میدان شکست نخورد، و در عین حال بی‌رحمی‌اش هولناک بود؛ در پی فتوحاتش کله‌مناره‌ها بر جای می‌گذاشت. در کارنامه‌ای از لشکرکشی تقریباً بی‌وقفه، امپراتوری‌ای پهناور بر محور جهان ایرانی تراشید، از هند تا کرانهٔ اروپا.' }"),

 ("{ t: 'h', x: 'The jewel of Samarkand' }",
  "{ t: 'h', x: 'The jewel of Samarkand', fa: 'نگین سمرقند' }"),

 ("{ t: 'p', x: 'Yet this terrible conqueror was also a great patron of beauty. He gathered to his capital of Samarkand the finest artists, architects, and craftsmen from across all the lands he conquered, and adorned the city with monuments of breathtaking splendour, blue-domed and shimmering, among the wonders of the world.' }",
  "{ t: 'p', x: 'Yet this terrible conqueror was also a great patron of beauty. He gathered to his capital of Samarkand the finest artists, architects, and craftsmen from across all the lands he conquered, and adorned the city with monuments of breathtaking splendour, blue-domed and shimmering, among the wonders of the world.', fa: 'با این همه، این فاتح هولناک حامی بزرگ زیبایی نیز بود. بهترین هنرمندان و معماران و صنعتگران را از سراسر سرزمین‌هایی که گشوده بود به پایتختش سمرقند آورد و شهر را با بناهایی آراست که نفس را می‌بریدند؛ گنبدهای لاجوردی و درخشان، از شگفتی‌های جهان.' }"),

 ("{ t: 'markline', x: 'The hand that raised towers of skulls also raised the shimmering domes of Samarkand.' }",
  "{ t: 'markline', x: 'The hand that raised towers of skulls also raised the shimmering domes of Samarkand.', fa: 'همان دستی که کله‌مناره برافراشت، گنبدهای درخشان سمرقند را نیز برافراشت.' }"),

 ("""{ t: 'p', x: 'It is one of history\\'s great contradictions, that a man of such cruelty should also be the founder of one of the most beautiful cultural ages the East ever knew. But so it was, and the splendour he began would blossom fully under his descendants.' }""",
  """{ t: 'p', x: 'It is one of history\\'s great contradictions, that a man of such cruelty should also be the founder of one of the most beautiful cultural ages the East ever knew. But so it was, and the splendour he began would blossom fully under his descendants.', fa: 'این یکی از تناقض‌های بزرگ تاریخ است: مردی با چنان بی‌رحمی، بنیان‌گذار یکی از زیباترین دوران‌های فرهنگی‌ای شود که شرق به خود دیده است. اما چنین شد، و شکوهی که او آغاز کرد در روزگار بازماندگانش به تمامی شکفت.' }"""),

 ("""{ t: 'p', x: 'After Timur\\'s death, his descendants gave up the endless conquering and turned instead to the cultivation of beauty, and under them the Persian world entered one of the most brilliant cultural renaissances in its entire history, a flowering compared by many to the Italian Renaissance of the same age.' }""",
  """{ t: 'p', x: 'After Timur\\'s death, his descendants gave up the endless conquering and turned instead to the cultivation of beauty, and under them the Persian world entered one of the most brilliant cultural renaissances in its entire history, a flowering compared by many to the Italian Renaissance of the same age.', fa: 'پس از مرگ تیمور، بازماندگانش فتحِ بی‌پایان را رها کردند و رو به پروردن زیبایی آوردند. در روزگار آنان، جهان ایرانی به یکی از درخشان‌ترین رستاخیزهای فرهنگی تمام تاریخش پا گذاشت؛ شکوفایی‌ای که بسیاری آن را با رنسانس ایتالیا در همان روزگار سنجیده‌اند.' }"""),

 ("{ t: 'p', x: 'His son Shahrukh and grandson Ulugh Beg, and later the court at Herat, made their cities into dazzling centers of art, learning, and refinement, where the Persian genius reached new summits in almost every field.' }",
  "{ t: 'p', x: 'His son Shahrukh and grandson Ulugh Beg, and later the court at Herat, made their cities into dazzling centers of art, learning, and refinement, where the Persian genius reached new summits in almost every field.', fa: 'پسرش شاهرخ و نوه‌اش الغ‌بیگ، و پس از آنان دربار هرات، شهرهایشان را به کانون‌های خیره‌کنندهٔ هنر و دانش و ظرافت بدل کردند؛ جایی که نبوغ ایرانی تقریباً در هر زمینه‌ای به قله‌های تازه‌ای رسید.' }"),
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
