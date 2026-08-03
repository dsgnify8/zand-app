# -*- coding: utf-8 -*-
# Mohammad Reza Shah, first batch: birth and childhood. Double-quoted
# strings in this topic. تاج‌الملوک, ولیعهد, کودتای سوم اسفند.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

PAIRS = [
 ('{ t: \'p\', x: "Mohammad Reza was born in Tehran on an autumn morning in 1919, arriving only minutes before his twin sister, Ashraf. Their closeness would last a lifetime, and in the years to come she would be one of the fiercest defenders of his throne." }',
  '{ t: \'p\', x: "Mohammad Reza was born in Tehran on an autumn morning in 1919, arriving only minutes before his twin sister, Ashraf. Their closeness would last a lifetime, and in the years to come she would be one of the fiercest defenders of his throne.", fa: \'محمدرضا در صبحی پاییزی در سال ۱۲۹۸ در تهران به دنیا آمد، تنها چند دقیقه پیش از خواهر دوقلویش، اشرف. این نزدیکی تا آخر عمر میانشان ماند، و در سال‌های بعد اشرف یکی از سرسخت‌ترین مدافعان تخت او شد.\' }'),

 ('{ t: \'p\', x: "The Iran of his birth was weak and often humiliated. Its affairs were shaped in London and in Moscow as much as in Tehran, its treasury was empty, and its roads and schools were few. To grow up in that country was to feel, keenly, how far the nation had fallen from its ancient greatness." }',
  '{ t: \'p\', x: "The Iran of his birth was weak and often humiliated. Its affairs were shaped in London and in Moscow as much as in Tehran, its treasury was empty, and its roads and schools were few. To grow up in that country was to feel, keenly, how far the nation had fallen from its ancient greatness.", fa: \'ایرانی که در آن زاده شد ناتوان بود و اغلب سرافکنده. کارهایش به همان اندازه که در تهران، در لندن و مسکو تعیین می‌شد؛ خزانه‌اش خالی بود و راه و مدرسه‌اش انگشت‌شمار. بزرگ شدن در چنین کشوری یعنی به‌روشنی حس کردن اینکه این ملت از بزرگی باستانی‌اش چقدر پایین آمده است.\' }'),

 ('{ t: \'p\', x: "In his memoirs the Shah returned to this wound again and again. The wish to restore Iran to dignity, to make it modern and respected in the world, was for him never merely a policy. It was a feeling he traced all the way back to childhood." }',
  '{ t: \'p\', x: "In his memoirs the Shah returned to this wound again and again. The wish to restore Iran to dignity, to make it modern and respected in the world, was for him never merely a policy. It was a feeling he traced all the way back to childhood.", fa: \'شاه در خاطراتش بارها به همین زخم برگشت. آرزوی بازگرداندن آبروی ایران، مدرن کردنش و محترم شدنش در جهان، برای او هرگز صرفاً یک سیاست نبود. حسی بود که ریشه‌اش را تا کودکی‌اش دنبال می‌کرد.\' }'),

 ('{ t: \'p\', x: "In February 1921 Reza Khan marched on the capital and took power in a nearly bloodless coup. For a few years he governed from behind the scenes as minister of war and then prime minister, building the army and the machinery of a modern state. Then, in 1925, he set aside the last Qajar ruler and was crowned Reza Shah Pahlavi, founding a new dynasty." }',
  '{ t: \'p\', x: "In February 1921 Reza Khan marched on the capital and took power in a nearly bloodless coup. For a few years he governed from behind the scenes as minister of war and then prime minister, building the army and the machinery of a modern state. Then, in 1925, he set aside the last Qajar ruler and was crowned Reza Shah Pahlavi, founding a new dynasty.", fa: \'در اسفند ۱۲۹۹، رضاخان به سوی پایتخت راه افتاد و در کودتایی که تقریباً بدون خون‌ریزی بود قدرت را گرفت. چند سالی از پشت صحنه حکومت کرد، اول به‌عنوان وزیر جنگ و بعد نخست‌وزیر، و در همان سال‌ها ارتش و دستگاه یک دولت مدرن را ساخت. سپس، در سال ۱۳۰۴، آخرین شاه قاجار را کنار گذاشت و با نام رضاشاه پهلوی تاج‌گذاری کرد و سلسله‌ای تازه بنیان نهاد.\' }'),

 ('{ t: \'h\', x: "A childhood set apart" }',
  '{ t: \'h\', x: "A childhood set apart", fa: \'کودکی‌ای جدا از بقیه\' }'),

 ('{ t: \'p\', x: "At six years old, Mohammad Reza became crown prince of a kingdom his father meant to remake from the ground up. He was raised apart from other children, handed to tutors and officers, and taught from the start that a throne and a mission were waiting for him. His father was determined that his heir would not be a soft, pampered prince of the old Qajar kind." }',
  '{ t: \'p\', x: "At six years old, Mohammad Reza became crown prince of a kingdom his father meant to remake from the ground up. He was raised apart from other children, handed to tutors and officers, and taught from the start that a throne and a mission were waiting for him. His father was determined that his heir would not be a soft, pampered prince of the old Qajar kind.", fa: \'محمدرضا در شش سالگی ولیعهد کشوری شد که پدرش می‌خواست از پایه از نو بسازد. جدا از بچه‌های دیگر بزرگ شد، به دست معلم‌ها و افسرها سپرده شد، و از همان اول به او آموختند که تخت و رسالتی در انتظارش است. پدرش مصمم بود که ولیعهدش شاهزاده‌ای نازپرورده از جنس قاجارها نباشد.\' }'),

 ('{ t: \'p\', x: "Between a stern, towering father and a devoted mother, Tadj ol Molouk, the boy grew up carrying expectations far heavier than his years. He adored his father and feared him in equal measure, and much of his life would be spent trying to prove worthy of him." }',
  '{ t: \'p\', x: "Between a stern, towering father and a devoted mother, Tadj ol Molouk, the boy grew up carrying expectations far heavier than his years. He adored his father and feared him in equal measure, and much of his life would be spent trying to prove worthy of him.", fa: \'میان پدری سختگیر و بلندبالا و مادری دلسوز، تاج‌الملوک، پسر با انتظاراتی بزرگ‌تر از سن‌وسالش بار آمد. پدرش را می‌پرستید و به همان اندازه از او می‌ترسید، و بخش بزرگی از عمرش را صرف این کرد که ثابت کند لایق اوست.\' }'),

 ('{ t: \'h\', x: "A brush with death" }',
  '{ t: \'h\', x: "A brush with death", fa: \'یک قدمی مرگ\' }'),
]

mrp_scope.apply(PAIRS)
