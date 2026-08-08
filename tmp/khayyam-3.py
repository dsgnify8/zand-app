# -*- coding: utf-8 -*-
# Khayyam, third batch: the parallel postulate, the rubai form, the voice.
# رباعی, مصراع, هندسهٔ نااقلیدسی, اصل توازی.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'He also pushed at Euclid parallel postulate, the assumption that troubled geometers for two thousand years, and got closer to breaking it than anyone before him. When European mathematicians finally cracked it open in the nineteenth century and found non Euclidean geometry, they were walking a road Khayyam had already been down.' }",
  "{ t: 'p', x: 'He also pushed at Euclid parallel postulate, the assumption that troubled geometers for two thousand years, and got closer to breaking it than anyone before him. When European mathematicians finally cracked it open in the nineteenth century and found non Euclidean geometry, they were walking a road Khayyam had already been down.', fa: 'به اصل توازی اقلیدس هم فشار آورد؛ همان فرضی که دو هزار سال هندسه‌دانان را آزار داد، و بیش از هر کس پیش از خودش به شکستنش نزدیک شد. وقتی ریاضی‌دانان اروپایی سرانجام در سدهٔ نوزدهم آن را گشودند و هندسهٔ نااقلیدسی را یافتند، در راهی قدم می‌گذاشتند که خیام پیش‌تر از آن گذشته بود.' }"),

 ("{ t: 'p', x: 'A rubai is a quatrain, four lines, rhyming AABA. The third line breaks the pattern and the fourth closes it, so the whole thing turns on a hinge. It is a small, hard, complete form, like an epigram with a blade in it.' }",
  "{ t: 'p', x: 'A rubai is a quatrain, four lines, rhyming AABA. The third line breaks the pattern and the fourth closes it, so the whole thing turns on a hinge. It is a small, hard, complete form, like an epigram with a blade in it.', fa: 'رباعی چهار مصراع است، با قافیهٔ الف الف ب الف. مصراع سوم الگو را می‌شکند و مصراع چهارم آن را می‌بندد، پس تمام رباعی بر یک لولا می‌چرخد. قالبی است کوچک و سخت و تمام، مثل سخنی کوتاه که تیغی در آن پنهان است.' }"),

 ("{ t: 'p', x: 'Khayyam wrote them, we think, privately. They were not published, not performed, not part of his reputation. They surfaced slowly after his death, and here is the honest problem: nobody knows how many are his. Manuscripts written centuries later attribute anywhere from a dozen to a thousand quatrains to him. Scholars who have spent lifetimes on it think perhaps a hundred are genuine, and disagree about which hundred.' }",
  "{ t: 'p', x: 'Khayyam wrote them, we think, privately. They were not published, not performed, not part of his reputation. They surfaced slowly after his death, and here is the honest problem: nobody knows how many are his. Manuscripts written centuries later attribute anywhere from a dozen to a thousand quatrains to him. Scholars who have spent lifetimes on it think perhaps a hundred are genuine, and disagree about which hundred.', fa: 'گمان می‌کنیم خیام رباعی‌ها را در خلوت خودش می‌سرود. نه منتشر می‌شدند، نه در مجلسی خوانده می‌شدند، و نه بخشی از آوازهٔ او بودند. پس از مرگش کم‌کم سر برآوردند، و مشکل صادقانه همین‌جاست: هیچ‌کس نمی‌داند چند تایشان از او است. نسخه‌هایی که قرن‌ها بعد نوشته شده‌اند، از دوازده تا هزار رباعی را به او نسبت داده‌اند. پژوهشگرانی که عمرشان را بر سر این کار گذاشته‌اند گمان می‌کنند شاید صد رباعی اصیل باشد، و بر سر اینکه کدام صد رباعی، با هم اختلاف دارند.' }"),

 ("{ t: 'aside', x: 'A quatrain is easy to write and easy to attribute. For centuries, anonymous verses that were too sceptical to sign got filed under Khayyam.' }",
  "{ t: 'aside', x: 'A quatrain is easy to write and easy to attribute. For centuries, anonymous verses that were too sceptical to sign got filed under Khayyam.', fa: 'رباعی هم آسان سروده می‌شود و هم آسان به کسی نسبت داده می‌شود. قرن‌ها، شعرهای بی‌نامی که برای امضا کردن بیش از حد شکاکانه بودند، زیر نام خیام بایگانی شدند.' }"),

 ("{ t: 'h', x: 'What the voice says' }",
  "{ t: 'h', x: 'What the voice says', fa: 'این صدا چه می‌گوید' }"),

 ("{ t: 'p', x: 'Whoever wrote them, they share one mind, and it is a mind unlike anything else in Persian poetry. It is the mind of a scientist who has looked hard at the evidence for what happens after death and found the file empty.' }",
  "{ t: 'p', x: 'Whoever wrote them, they share one mind, and it is a mind unlike anything else in Persian poetry. It is the mind of a scientist who has looked hard at the evidence for what happens after death and found the file empty.', fa: 'هر کس سروده باشدشان، همه از یک ذهن برمی‌آیند؛ ذهنی که شبیه هیچ چیز دیگری در شعر فارسی نیست. ذهنِ دانشمندی است که به شواهدِ آنچه پس از مرگ رخ می‌دهد خوب نگاه کرده و پرونده را خالی یافته است.' }"),

 ("{ t: 'p', x: 'He does not rage at heaven and he does not deny it. He says he does not know, that nobody who claims to know has been there, and that the only thing certainly in your hands is this hour. He is the least mystical of the great Persian poets. Where Hafez sees a beloved behind the veil, Khayyam sees a veil.' }",
  "{ t: 'p', x: 'He does not rage at heaven and he does not deny it. He says he does not know, that nobody who claims to know has been there, and that the only thing certainly in your hands is this hour. He is the least mystical of the great Persian poets. Where Hafez sees a beloved behind the veil, Khayyam sees a veil.', fa: 'نه بر آسمان خشم می‌گیرد و نه منکرش می‌شود. می‌گوید نمی‌دانم، و می‌گوید هیچ‌یک از آنها که ادعای دانستن دارند آنجا نبوده‌اند، و تنها چیزی که به‌یقین در دست توست همین ساعت است. از میان شاعران بزرگ ایران، کم‌عارف‌ترینشان است. آنجا که حافظ معشوقی را پشت پرده می‌بیند، خیام پرده را می‌بیند.' }"),

 ("{ t: 'h', x: 'The wine question' }",
  "{ t: 'h', x: 'The wine question', fa: 'مسئلهٔ می' }"),
]

lit_scope.apply("khayyam", PAIRS)
