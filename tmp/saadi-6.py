# -*- coding: utf-8 -*-
# Saadi's three حکایت blocks. Told the way the Golestan tells them:
# short, dry, no commentary, the point landing in the last clause.
# The first is a real Golestan tale — the slave on the ship.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("title: 'The King and the Frightened Slave'",
  "title: 'The King and the Frightened Slave', titleFa: 'پادشاه و غلام ترسیده'"),

 ("x: 'A slave on a ship panics and will not stop screaming. Nothing calms him. A wise man tells the crew to throw him into the sea, and they do, and after he has swallowed water and been hauled back aboard, he sits quietly in a corner. Asked why, the wise man says: he had never known the danger of drowning, so he never valued the safety of the boat.'",
  "x: 'A slave on a ship panics and will not stop screaming. Nothing calms him. A wise man tells the crew to throw him into the sea, and they do, and after he has swallowed water and been hauled back aboard, he sits quietly in a corner. Asked why, the wise man says: he had never known the danger of drowning, so he never valued the safety of the boat.', fa: 'غلامی در کشتی وحشت می‌کند و دست از فریاد برنمی‌دارد. هیچ‌چیز آرامش نمی‌کند. حکیمی به ملاحان می‌گوید او را به دریا بیندازند، و می‌اندازند؛ و پس از آنکه چند جرعه آب خورد و بازش کشیدند، ساکت در گوشه‌ای می‌نشیند. می‌پرسند چرا، و حکیم می‌گوید: خطر غرق شدن را نچشیده بود، پس قدر امنیت کشتی را نمی‌دانست.'"),

 ("moral: 'You will not know what you have while you have it.'",
  "moral: 'You will not know what you have while you have it.', moralFa: 'قدر آنچه داری را تا وقتی داری‌اش نمی‌دانی.'"),

 ("title: 'The Man Who Boasted of His Piety'",
  "title: 'The Man Who Boasted of His Piety', titleFa: 'مردی که به پارسایی‌اش می‌بالید'"),

 ("x: 'A man tells Saadi how much he prays, how much he fasts, how little he eats. Saadi says nothing. Later the man asks why he was silent. Because, Saadi tells him, the one who truly does these things does not keep the accounts.'",
  "x: 'A man tells Saadi how much he prays, how much he fasts, how little he eats. Saadi says nothing. Later the man asks why he was silent. Because, Saadi tells him, the one who truly does these things does not keep the accounts.', fa: 'مردی برای سعدی می‌گوید که چقدر نماز می‌خواند، چقدر روزه می‌گیرد، چه کم می‌خورد. سعدی چیزی نمی‌گوید. بعدتر مرد می‌پرسد چرا خاموش بودی. سعدی می‌گوید: چون آن که این کارها را به‌راستی می‌کند، حسابشان را نگه نمی‌دارد.'"),

 ("moral: 'Goodness announced is goodness spent.'",
  "moral: 'Goodness announced is goodness spent.', moralFa: 'نیکی‌ای که جار زده شود، خرج شده است.'"),

 ("title: 'The Parable Against Persecution'",
  "title: 'The Parable Against Persecution', titleFa: 'حکایتی در نکوهش آزار دیگران'"),

 ("x: 'Franklin liked it so much that he printed it in the style of scripture, in biblical language, and passed it off as a missing chapter of Genesis. He would keep it in his Bible and read it aloud to guests, waiting to see how long it took anyone to notice it was not there.'",
  "x: 'Franklin liked it so much that he printed it in the style of scripture, in biblical language, and passed it off as a missing chapter of Genesis. He would keep it in his Bible and read it aloud to guests, waiting to see how long it took anyone to notice it was not there.', fa: 'فرانکلین چنان از این حکایت خوشش آمد که آن را به سبک کتاب مقدس و با زبان تورات چاپ کرد و جا زد که بابی گمشده از سِفر پیدایش است. آن را لای انجیلش نگه می‌داشت و برای مهمان‌ها بلند می‌خواند، و منتظر می‌ماند ببیند چقدر طول می‌کشد تا کسی بفهمد چنین بابی در کار نیست.'"),

 ("moral: 'A founding father of America used a Persian poem to prank his friends about tolerance.'",
  "moral: 'A founding father of America used a Persian poem to prank his friends about tolerance.', moralFa: 'یکی از بنیان‌گذاران آمریکا با یک شعر فارسی سر دوستانش را دربارهٔ مدارا کلاه گذاشت.'"),
]

lit_scope.apply("saadi", PAIRS)
