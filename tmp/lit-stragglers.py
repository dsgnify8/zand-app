# -*- coding: utf-8 -*-
# The stragglers across the literature file: the twotrans comparison, the
# moving-finger veil, the Saadi couplet on the useful lie, the image
# captions, and the remaining illumin/mark lines.

import sys
sys.path.insert(0, "tmp")
import lit_scope

# ---------- Saadi ----------
lit_scope.apply("saadi", [
 ("{ a: 'A falsehood mixed with good intent', b: 'is better than a truth that stirs up strife.' }",
  "{ a: 'A falsehood mixed with good intent', b: 'is better than a truth that stirs up strife.', aFa: 'دروغِ مصلحت‌آمیز', bFa: 'به ز راستیِ فتنه‌انگیز' }"),

 ("note: 'From the Golestan. It has been quoted by Iranians in arguments for seven centuries.'",
  "note: 'From the Golestan. It has been quoted by Iranians in arguments for seven centuries.', noteFa: 'از گلستان. هفت قرن است که ایرانی‌ها وسط بحث نقلش می‌کنند.'"),

 ("hidden: 'Not cynicism. A working rule: you cannot teach someone who has decided they already know, and the effort damages you rather than them. Saadi spent thirty years learning this on the road.'",
  "hidden: 'Not cynicism. A working rule: you cannot teach someone who has decided they already know, and the effort damages you rather than them. Saadi spent thirty years learning this on the road.', hiddenFa: 'بدبینی نیست؛ یک قاعدهٔ کاربردی است: کسی را که تصمیم گرفته از پیش می‌داند نمی‌توان آموخت، و این تلاش به جای او، به تو آسیب می‌زند. سعدی سی سال در راه همین را آموخت.'"),

 ("cap: 'The Saadieh in Shiraz, where the master of speech is buried.'",
  "cap: 'The Saadieh in Shiraz, where the master of speech is buried.', capFa: 'سعدیه در شیراز، آرامگاه استاد سخن.'"),
])

# ---------- Ferdowsi and Hafez captions ----------
lit_scope.apply("ferdowsi", [
 ("cap: 'The tomb of Ferdowsi at Tus, a place of pilgrimage for lovers of Persian poetry.'",
  "cap: 'The tomb of Ferdowsi at Tus, a place of pilgrimage for lovers of Persian poetry.', capFa: 'آرامگاه فردوسی در توس، زیارتگاه دوستداران شعر فارسی.'"),
])

lit_scope.apply("hafez", [
 ("cap: 'The Hafezieh in Shiraz, where people come to read rather than to grieve.'",
  "cap: 'The Hafezieh in Shiraz, where people come to read rather than to grieve.', capFa: 'حافظیه در شیراز، جایی که مردم برای خواندن می‌آیند، نه برای سوگواری.'"),
])

# ---------- Khayyam ----------
lit_scope.apply("khayyam", [
 ("{ t: 'mark', x: 'Iran has been keeping time by a mathematician quatrain of a calendar for nine hundred and fifty years.' }",
  "{ t: 'mark', x: 'Iran has been keeping time by a mathematician quatrain of a calendar for nine hundred and fifty years.', fa: 'نهصد و پنجاه سال است که ایران وقتش را با تقویمی نگه می‌دارد که کار یک ریاضی‌دان است.' }"),

 ("{ t: 'illumin', x: 'When numbers could not reach it, he drew it instead.' }",
  "{ t: 'illumin', x: 'When numbers could not reach it, he drew it instead.', fa: 'آنجا که عدد به آن نمی‌رسید، به جایش کشیدش.' }"),

 ("surface: 'The moving finger writes, and having writ moves on. Nor all your piety nor wit shall lure it back to cancel half a line.'",
  "surface: 'The moving finger writes, and having writ moves on. Nor all your piety nor wit shall lure it back to cancel half a line.', surfaceFa: 'از دی که گذشت هیچ ازو یاد مکن\\u200Cفردا که نیامده‌ست فریاد مکن'"),

 ("hidden: 'This is FitzGerald most quoted line, and it is more or less Khayyam. It says the past is closed. Not that it should be accepted, that it is closed, as a matter of fact, the way a proof is closed. It is a mathematician way of describing regret.'",
  "hidden: 'This is FitzGerald most quoted line, and it is more or less Khayyam. It says the past is closed. Not that it should be accepted, that it is closed, as a matter of fact, the way a proof is closed. It is a mathematician way of describing regret.', hiddenFa: 'این پرنقل‌ترین سطر فیتزجرالد است، و کم‌وبیش همان خیام. می‌گوید گذشته بسته شده است. نه اینکه باید پذیرفتش؛ اینکه بسته شده، همان‌طور که یک برهان بسته می‌شود. این شیوهٔ یک ریاضی‌دان است برای توصیف حسرت.'"),

 ("{ label: 'FITZGERALD, 1859', x: 'A Book of Verses underneath the Bough, a Jug of Wine, a Loaf of Bread, and Thou beside me singing in the Wilderness.' }",
  "{ label: 'FITZGERALD, 1859', labelFa: 'فیتزجرالد، ۱۸۵۹', x: 'A Book of Verses underneath the Bough, a Jug of Wine, a Loaf of Bread, and Thou beside me singing in the Wilderness.', fa: 'کتابی شعر زیر شاخه‌ها، سبویی می، نانی، و تو در کنارم که در بیابان آواز می‌خوانی.' }"),

 ("{ label: 'WHAT THE PERSIAN SAYS', x: 'A loaf of bread, a gourd of wine, a thigh of mutton, and you and I sitting in the wilderness. That is a pleasure beyond any sultan kingdom.' }",
  "{ label: 'WHAT THE PERSIAN SAYS', labelFa: 'آنچه در فارسی آمده', x: 'A loaf of bread, a gourd of wine, a thigh of mutton, and you and I sitting in the wilderness. That is a pleasure beyond any sultan kingdom.', fa: 'گر دست دهد ز مغز گندم نانی، وز می دو منی ز گوسفندی رانی؛ با لاله‌رخی و گوشهٔ بستانی، عیشی بود آن نه حد هر سلطانی.' }"),

 ("{ t: 'illumin', x: 'The mutton became a book of verses, and nobody noticed for a hundred years.' }",
  "{ t: 'illumin', x: 'The mutton became a book of verses, and nobody noticed for a hundred years.', fa: 'ران گوسفند شد کتاب شعر، و صد سال کسی متوجه نشد.' }"),

 ("{ t: 'illumin', x: 'The man who would not predict the afterlife predicted his own grave, and got it right.' }",
  "{ t: 'illumin', x: 'The man who would not predict the afterlife predicted his own grave, and got it right.', fa: 'مردی که حاضر نبود دربارهٔ آن دنیا پیشگویی کند، گور خودش را پیشگویی کرد و درست هم گفت.' }"),

 ("{ t: 'mark', x: 'The most precise mind of his century spent its evenings writing about how little can be known.' }",
  "{ t: 'mark', x: 'The most precise mind of his century spent its evenings writing about how little can be known.', fa: 'دقیق‌ترین ذهن آن قرن، شب‌هایش را صرف نوشتن دربارهٔ این می‌کرد که چه اندک می‌توان دانست.' }"),

 ("{ t: 'illumin', x: 'He gave Iran the moment its year turns, and the world forgot he was a scientist at all.' }",
  "{ t: 'illumin', x: 'He gave Iran the moment its year turns, and the world forgot he was a scientist at all.', fa: 'لحظهٔ سال تحویل را به ایران داد، و جهان یکسره از یاد برد که او دانشمند بود.' }"),
])

# ---------- Rumi ----------
lit_scope.apply("rumi", [
 ("{ t: 'illumin', x: 'Nobody knows what happened to him. That is not a mystery the sources are being coy about. It is genuinely unknown.' }",
  "{ t: 'illumin', x: 'Nobody knows what happened to him. That is not a mystery the sources are being coy about. It is genuinely unknown.', fa: 'هیچ‌کس نمی‌داند بر او چه گذشت. این رازی نیست که سرچشمه‌ها دربارهٔ آن طفره بروند؛ به‌راستی ناشناخته است.' }"),

 ("{ t: 'illumin', x: 'He wrote the best poetry of his life and gave the credit to a man who was probably murdered by his own household.' }",
  "{ t: 'illumin', x: 'He wrote the best poetry of his life and gave the credit to a man who was probably murdered by his own household.', fa: 'بهترین شعرهای عمرش را سرود و نامش را به مردی بخشید که احتمالاً اهل خانهٔ خودش او را کشته بودند.' }"),

 ("{ t: 'illumin', x: 'A man spinning in a room is doing what the solar system is doing, and knows it.' }",
  "{ t: 'illumin', x: 'A man spinning in a room is doing what the solar system is doing, and knows it.', fa: 'مردی که در اتاقی می‌چرخد، همان کاری را می‌کند که منظومهٔ شمسی می‌کند، و خودش هم می‌داند.' }"),

 ("{ t: 'illumin', x: 'He named the night of his own death the wedding night, and they have kept the name.' }",
  "{ t: 'illumin', x: 'He named the night of his own death the wedding night, and they have kept the name.', fa: 'شب مرگ خودش را شب عروس نامید، و آن نام را نگه داشته‌اند.' }"),

 ("{ t: 'illumin', x: 'Listen to the reed, how it complains. Since they cut me from the reed bed, everyone has wept at my cry.' }",
  "{ t: 'illumin', x: 'Listen to the reed, how it complains. Since they cut me from the reed bed, everyone has wept at my cry.', fa: 'بشنو این نی چون شکایت می‌کند؛ کز نیستان تا مرا ببریده‌اند، در نفیرم مرد و زن نالیده‌اند.' }"),
])
