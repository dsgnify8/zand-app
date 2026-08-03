# -*- coding: utf-8 -*-
# Modern Iran: the cities, and Khomeini's exile. Scoped to the topic.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'The cities grew very fast, faster than housing or services could follow. The gap between those doing well from the boom and those newly arrived and struggling became visible in a way that was difficult to explain away, and that gap did more to shape what came next than any argument about doctrine.' }",
  "{ t: 'p', x: 'The cities grew very fast, faster than housing or services could follow. The gap between those doing well from the boom and those newly arrived and struggling became visible in a way that was difficult to explain away, and that gap did more to shape what came next than any argument about doctrine.', fa: 'شهرها خیلی سریع بزرگ شدند، سریع‌تر از آنکه مسکن و خدمات به آنها برسد. فاصلهٔ میان کسانی که از این رونق سود می‌بردند و کسانی که تازه رسیده بودند و در تنگنا بودند، چنان آشکار شد که نمی‌شد توجیهش کرد؛ و همین فاصله، بیش از هر بحث عقیدتی، آنچه را که بعد آمد شکل داد.' }"),

 ("{ t: 'h', x: 'A cleric in exile' }",
  "{ t: 'h', x: 'A cleric in exile', fa: 'روحانی‌ای در تبعید' }"),

 ("{ t: 'p', x: 'Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963, objecting in particular to women voting and to land reform touching religious endowments. He was arrested, and his arrest set off large riots in Qom and Tehran.' }",
  "{ t: 'p', x: 'Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963, objecting in particular to women voting and to land reform touching religious endowments. He was arrested, and his arrest set off large riots in Qom and Tehran.', fa: 'روح‌الله خمینی، از روحانیان بلندپایهٔ قم، در سال ۱۳۴۲ «انقلاب سفید» را محکوم کرد؛ به‌ویژه به حق رأی زنان و به اینکه اصلاحات ارضی به موقوفات هم برسد اعتراض داشت. بازداشت شد، و بازداشتش شورش‌های بزرگی در قم و تهران به راه انداخت.' }"),

 ("{ t: 'p', x: 'In 1964 he was expelled from the country. That decision is worth pausing on: he could have been imprisoned indefinitely, and instead he was put on a plane.' }",
  "{ t: 'p', x: 'In 1964 he was expelled from the country. That decision is worth pausing on: he could have been imprisoned indefinitely, and instead he was put on a plane.', fa: 'در سال ۱۳۴۳ از کشور اخراج شد. روی این تصمیم می‌ارزد کمی مکث کنیم: می‌شد او را تا هر وقت که بخواهند در زندان نگه دارند، اما به جایش سوار هواپیمایش کردند.' }"),

 ("{ t: 'p', x: 'He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes and carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no practical way to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in it.' }",
  "{ t: 'p', x: 'He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes and carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no practical way to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in it.', fa: 'چهارده سال بعد را در ترکیه گذراند، بعد در نجف، و مدت کوتاهی هم در حومهٔ پاریس؛ و در تمام این سال‌ها کار کرد. سخنرانی‌هایش روی نوار کاست ضبط می‌شد و مسافران و زائران آن را به ایران می‌آوردند، تکثیر می‌شد و دست به دست می‌گشت. عملاً راهی نبود که بشود نواری را از جیب کت کسی گرفت. تا اواخر دههٔ ۱۳۵۰، مردی که بیش از ده سال پا به ایران نگذاشته بود، یکی از پرشنونده‌ترین صداهای همان کشور بود.' }"),
]

mi_scope.apply(PAIRS)
