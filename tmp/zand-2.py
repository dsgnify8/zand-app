# -*- coding: utf-8 -*-
# The Zand dynasty, second batch: the ruler who listened, and Shiraz.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ('{ t: \'h\', x: \'The ruler who listened\' }',
  '{ t: \'h\', x: \'The ruler who listened\', fa: \'فرمانروایی که گوش می‌داد\' }'),

 ('{ t: \'p\', x: "It was said that any subject with a grievance could bring it before him, and that he would hear the poor as readily as the powerful. He kept his own conduct plain and his taxes light, and he was known to sit among ordinary people, smoking his water pipe and talking freely, more like a village elder than a king." }',
  '{ t: \'p\', x: "It was said that any subject with a grievance could bring it before him, and that he would hear the poor as readily as the powerful. He kept his own conduct plain and his taxes light, and he was known to sit among ordinary people, smoking his water pipe and talking freely, more like a village elder than a king.", fa: \'می‌گفتند هر کس شکایتی داشت می‌توانست آن را نزد او ببرد، و او سخن فقیر را به همان آسانی می‌شنید که سخن توانگر را. رفتار خود را ساده و مالیات‌ها را سبک نگاه داشت، و معروف بود که میان مردم عادی می‌نشیند، قلیان می‌کشد و آزادانه گفت‌وگو می‌کند؛ بیشتر شبیه ریش‌سفید یک ده تا یک پادشاه.\' }'),

 ('{ t: \'p\', x: "Countless folk tales grew up around his fairness and his wit. In them he tests the honesty of officials, rewards the humble, and gently humbles the proud, always with a light touch and a sense of humor. Whether every tale is true matters less than what they reveal: this was how his people wished to remember him, and how they loved him." }',
  '{ t: \'p\', x: "Countless folk tales grew up around his fairness and his wit. In them he tests the honesty of officials, rewards the humble, and gently humbles the proud, always with a light touch and a sense of humor. Whether every tale is true matters less than what they reveal: this was how his people wished to remember him, and how they loved him.", fa: \'حکایت‌های مردمی بی‌شماری دربارهٔ انصاف و ذکاوتش پدید آمد. در این حکایت‌ها راستی کارگزاران را می‌آزماید، فروتنان را پاداش می‌دهد و متکبران را به نرمی سر جای خود می‌نشاند؛ همیشه با دستی سبک و طنزی ملایم. اینکه هر روایت راست باشد یا نه، کمتر از آن چیزی اهمیت دارد که این روایت‌ها آشکار می‌کنند: مردم می‌خواستند او را این‌گونه به یاد بیاورند، و این‌گونه دوستش داشتند.\' }'),

 ('{ t: \'p\', x: "He could be firm when he had to be, and he was a capable soldier and shrewd statesman who held a fractured country together. But he ruled with a restraint and a decency almost unknown in his violent age, and Iran, worn down by decades of war, breathed again under his hand." }',
  '{ t: \'p\', x: "He could be firm when he had to be, and he was a capable soldier and shrewd statesman who held a fractured country together. But he ruled with a restraint and a decency almost unknown in his violent age, and Iran, worn down by decades of war, breathed again under his hand.", fa: \'آنجا که لازم بود می‌توانست سختگیر باشد؛ سربازی کاردان و سیاستمداری زیرک بود که کشوری چندپاره را کنار هم نگاه داشت. اما با خویشتن‌داری و شرافتی حکومت کرد که در روزگار خشونت‌بار او تقریباً ناشناخته بود، و ایران، فرسوده از دهه‌ها جنگ، زیر دست او دوباره نفس کشید.\' }'),

 ('{ t: \'p\', x: "Karim Khan made his capital not at Tehran or Isfahan, but at Shiraz, the fabled city of roses, wine, nightingales, and poetry in the south of Iran. It was the city of the great poets Hafez and Saadi, and under Karim Khan it entered a golden age." }',
  '{ t: \'p\', x: "Karim Khan made his capital not at Tehran or Isfahan, but at Shiraz, the fabled city of roses, wine, nightingales, and poetry in the south of Iran. It was the city of the great poets Hafez and Saadi, and under Karim Khan it entered a golden age.", fa: \'کریم‌خان پایتختش را نه در تهران گذاشت و نه در اصفهان، بلکه در شیراز؛ شهر افسانه‌ای گل و می و بلبل و شعر، در جنوب ایران. شهر حافظ و سعدی بود، و زیر دست کریم‌خان به عصر طلایی خود رسید.\' }'),

 ('{ t: \'p\', x: "He loved Shiraz and lavished care upon it, determined to make it a capital worthy of a peaceful and prosperous Iran. He built and beautified, and much of what he raised still stands today, among the loveliest monuments in the country." }',
  '{ t: \'p\', x: "He loved Shiraz and lavished care upon it, determined to make it a capital worthy of a peaceful and prosperous Iran. He built and beautified, and much of what he raised still stands today, among the loveliest monuments in the country.", fa: \'شیراز را دوست می‌داشت و بر آن دل سپرد، مصمم که پایتختی درخور ایرانی آرام و آباد بسازد. ساخت و آراست، و بسیاری از آنچه برافراشت امروز هنوز پابرجاست؛ از زیباترین بناهای این سرزمین.\' }'),

 ('{ t: \'h\', x: \'The gifts he left in stone\' }',
  '{ t: \'h\', x: \'The gifts he left in stone\', fa: \'یادگارهایی که در سنگ گذاشت\' }'),

 ('{ t: \'p\', x: "At the heart of the city he built the Arg, his great citadel, and beside it a complex of buildings for the people: a mosque, a bazaar, a bathhouse, all bearing the name Vakil, the Advocate, the title he had chosen for himself. Even the monuments he raised carried his humble idea of his own role." }',
  '{ t: \'p\', x: "At the heart of the city he built the Arg, his great citadel, and beside it a complex of buildings for the people: a mosque, a bazaar, a bathhouse, all bearing the name Vakil, the Advocate, the title he had chosen for himself. Even the monuments he raised carried his humble idea of his own role.", fa: \'در قلب شهر ارگ را ساخت، دژ بزرگش، و در کنارش مجموعه‌ای از بناها برای مردم: مسجدی، بازاری، حمامی، که همه نام وکیل بر خود داشتند؛ همان لقبی که برای خویش برگزیده بود. حتی بناهایی که برافراشت، برداشت فروتنانهٔ او را از جایگاه خودش با خود داشتند.\' }'),

 ('{ t: \'p\', x: "The Vakil Mosque, with its forest of carved stone columns and its exquisite tilework, and the Vakil Bazaar, whose vaulted brick halls still shelter the merchants of Shiraz to this day, are among the treasures of Iranian architecture." }',
  '{ t: \'p\', x: "The Vakil Mosque, with its forest of carved stone columns and its exquisite tilework, and the Vakil Bazaar, whose vaulted brick halls still shelter the merchants of Shiraz to this day, are among the treasures of Iranian architecture.", fa: \'مسجد وکیل، با جنگلی از ستون‌های سنگی تراشیده و کاشی‌کاری ظریفش، و بازار وکیل، که راسته‌های آجری و طاق‌دارش تا امروز بازرگانان شیراز را در خود جای داده‌اند، از گنجینه‌های معماری ایران‌اند.\' }'),
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
