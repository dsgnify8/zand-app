# -*- coding: utf-8 -*-
# The Zand dynasty, third batch: the reign of plenty and the fall.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ('{ t: \'p\', x: "He also laid out gardens and repaired the shrines and tombs of the poets, honoring the cultural soul of the city. Under his care, Shiraz became again what it had long been in the Persian imagination: a place of beauty, learning, and peace." }',
  '{ t: \'p\', x: "He also laid out gardens and repaired the shrines and tombs of the poets, honoring the cultural soul of the city. Under his care, Shiraz became again what it had long been in the Persian imagination: a place of beauty, learning, and peace.", fa: \'باغ‌ها نیز طرح ریخت و زیارتگاه‌ها و آرامگاه شاعران را تعمیر کرد، و بدین‌سان جان فرهنگی شهر را گرامی داشت. زیر مراقبت او، شیراز دوباره همان شد که دیرزمانی در خیال ایرانی بود: جایگاه زیبایی، دانش و آرامش.\' }'),

 ('{ t: \'p\', x: "He encouraged agriculture and trade, and he worked to reopen commerce with the wider world, including dealings with the British East India Company on the Persian Gulf coast. Markets filled, roads grew safer, and the ordinary business of life, so long disrupted by war, resumed." }',
  '{ t: \'p\', x: "He encouraged agriculture and trade, and he worked to reopen commerce with the wider world, including dealings with the British East India Company on the Persian Gulf coast. Markets filled, roads grew safer, and the ordinary business of life, so long disrupted by war, resumed.", fa: \'کشاورزی و بازرگانی را رونق بخشید و کوشید داد و ستد با جهان بیرون را از نو بگشاید، از جمله در معامله با کمپانی هند شرقی بریتانیا در کرانهٔ خلیج فارس. بازارها پر شد، راه‌ها امن‌تر شد، و کار و بار روزمرهٔ زندگی، که مدت‌ها جنگ آن را از هم گسسته بود، دوباره به جریان افتاد.\' }'),

 ('{ t: \'p\', x: "He was no builder of a vast empire, and he did not seek to be. His ambition was smaller and, in its way, greater: to give his people a good and peaceful life. By the measure that mattered most to him, the wellbeing of ordinary Iranians, his reign was a quiet triumph." }',
  '{ t: \'p\', x: "He was no builder of a vast empire, and he did not seek to be. His ambition was smaller and, in its way, greater: to give his people a good and peaceful life. By the measure that mattered most to him, the wellbeing of ordinary Iranians, his reign was a quiet triumph.", fa: \'سازندهٔ امپراتوری‌ای پهناور نبود و در پی آن هم نبود. آرزویش کوچک‌تر بود و، به شیوهٔ خود، بزرگ‌تر: اینکه به مردمش زندگی‌ای خوب و آرام بدهد. با معیاری که برای خود او از همه مهم‌تر بود، یعنی آسایش مردم عادی ایران، سلطنتش پیروزی‌ای بی‌سر و صدا بود.\' }'),

 ('{ t: \'p\', x: "For a few decades, in a corner of a turbulent world, a ruler governed by decency, and his people flourished. It is one of the gentlest chapters in the long history of Iran." }',
  '{ t: \'p\', x: "For a few decades, in a corner of a turbulent world, a ruler governed by decency, and his people flourished. It is one of the gentlest chapters in the long history of Iran.", fa: \'چند دهه، در گوشه‌ای از جهانی پرآشوب، فرمانروایی با شرافت حکومت کرد و مردمش بالیدند. این یکی از مهربان‌ترین فصل‌های تاریخ بلند ایران است.\' }'),

 ('{ t: \'p\', x: "Karim Khan died in Shiraz in 1779, full of years and mourned by his people. For nearly thirty years he had given Iran peace, and his passing was felt as the loss of a protector. With him, the calm he had built began to unravel." }',
  '{ t: \'p\', x: "Karim Khan died in Shiraz in 1779, full of years and mourned by his people. For nearly thirty years he had given Iran peace, and his passing was felt as the loss of a protector. With him, the calm he had built began to unravel.", fa: \'کریم‌خان در سال ۱۷۷۹ در شیراز درگذشت، سالخورده و در سوگ مردمش. نزدیک سی سال به ایران آرامش داده بود، و رفتنش چون از دست دادن یک پشتیبان احساس شد. با او، آرامشی که ساخته بود رو به گسستن گذاشت.\' }'),

 ('{ t: \'p\', x: "He left no successor of his own strength, and the old pattern reasserted itself. His relatives and rivals fell to fighting over the succession, and the peace of the Zand years gave way once more to struggle." }',
  '{ t: \'p\', x: "He left no successor of his own strength, and the old pattern reasserted itself. His relatives and rivals fell to fighting over the succession, and the peace of the Zand years gave way once more to struggle.", fa: \'جانشینی هم‌اندازهٔ خود بر جای نگذاشت، و الگوی کهنه دوباره سر برآورد. خویشان و رقیبانش بر سر جانشینی به جان هم افتادند، و آرامش سال‌های زند بار دیگر جای خود را به کشمکش داد.\' }'),

 ('{ t: \'h\', x: \'The last of the Zand\' }',
  '{ t: \'h\', x: \'The last of the Zand\', fa: \'آخرین زند\' }'),

 ('{ t: \'p\', x: "As the dynasty weakened, a new and ruthless power rose in the north under Agha Mohammad Khan, founder of the Qajar dynasty. One by one the Zand were overcome, until only a single young prince remained to carry their standard: Lotf Ali Khan, the last of the Zand." }',
  '{ t: \'p\', x: "As the dynasty weakened, a new and ruthless power rose in the north under Agha Mohammad Khan, founder of the Qajar dynasty. One by one the Zand were overcome, until only a single young prince remained to carry their standard: Lotf Ali Khan, the last of the Zand.", fa: \'همچنان که سلسله ناتوان می‌شد، در شمال قدرتی تازه و بی‌رحم به رهبری آقامحمدخان، بنیان‌گذار سلسلهٔ قاجار، سر برآورد. زندیان یکی پس از دیگری از پای درآمدند، تا آنکه تنها یک شاهزادهٔ جوان ماند که درفش آنان را برافراشته نگاه دارد: لطفعلی‌خان، آخرین زند.\' }'),

 ('{ t: \'p\', x: "Brave, handsome, and gallant, Lotf Ali Khan fought on against overwhelming odds in a struggle that has passed into legend. For years he resisted, winning the devotion of those who followed him, a young hero defending a lost cause with a courage that Iranians still remember." }',
  '{ t: \'p\', x: "Brave, handsome, and gallant, Lotf Ali Khan fought on against overwhelming odds in a struggle that has passed into legend. For years he resisted, winning the devotion of those who followed him, a young hero defending a lost cause with a courage that Iranians still remember.", fa: \'دلیر و خوش‌سیما و جوانمرد، لطفعلی‌خان در برابر نیرویی به‌مراتب بزرگ‌تر جنگید؛ نبردی که به افسانه پیوسته است. سال‌ها ایستادگی کرد و دل کسانی را که به دنبالش رفتند به دست آورد؛ قهرمانی جوان که از آرمانی شکست‌خورده دفاع می‌کرد، با شجاعتی که ایرانیان هنوز به یاد دارند.\' }'),
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
