# -*- coding: utf-8 -*-
# Khayyam, second batch: the calendar and the algebra.
# تقویم جلالی, هجری شمسی, اعتدال بهاری, سفرهٔ هفت‌سین, معادلات درجهٔ سوم.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'They measured it as 365.24219858 days. The real figure, as we know it now with satellites and atomic clocks, is 365.242190. He was working with instruments made of brass and wood, and he was wrong by about a millionth of a day.' }",
  "{ t: 'p', x: 'They measured it as 365.24219858 days. The real figure, as we know it now with satellites and atomic clocks, is 365.242190. He was working with instruments made of brass and wood, and he was wrong by about a millionth of a day.', fa: 'اندازه‌اش را ۳۶۵٫۲۴۲۱۹۸۵۸ روز به دست آوردند. رقم واقعی، آن‌گونه که امروز با ماهواره و ساعت اتمی می‌دانیم، ۳۶۵٫۲۴۲۱۹۰ است. او با ابزارهایی از برنج و چوب کار می‌کرد، و خطایش حدود یک‌میلیونیم روز بود.' }"),

 ("{ t: 'p', x: 'The calendar Europe adopted five centuries after him, the Gregorian, is less accurate than the one he made. That is not Iranian pride talking. It is arithmetic.' }",
  "{ t: 'p', x: 'The calendar Europe adopted five centuries after him, the Gregorian, is less accurate than the one he made. That is not Iranian pride talking. It is arithmetic.', fa: 'تقویمی که اروپا پنج قرن پس از او پذیرفت، یعنی تقویم میلادی، از آنچه او ساخت کم‌دقت‌تر است. این حرف از سر غرور ایرانی نیست؛ حساب است.' }"),

 ("{ t: 'h', x: 'And it is still running' }",
  "{ t: 'h', x: 'And it is still running', fa: 'و هنوز کار می‌کند' }"),

 ("{ t: 'p', x: 'This is the part that surprises people. His calendar was not a curiosity that was admired and abandoned. It is the calendar of Iran today. The Solar Hijri calendar, still official, still used for every date in the country, descends directly from the one Khayyam built in 1079.' }",
  "{ t: 'p', x: 'This is the part that surprises people. His calendar was not a curiosity that was admired and abandoned. It is the calendar of Iran today. The Solar Hijri calendar, still official, still used for every date in the country, descends directly from the one Khayyam built in 1079.', fa: 'همین بخش است که مردم را شگفت‌زده می‌کند. تقویم او چیز عجیبی نبود که تحسینش کنند و کنارش بگذارند. همان تقویم امروز ایران است. تقویم هجری شمسی، که هنوز رسمی است و هر تاریخی در این کشور با آن نوشته می‌شود، مستقیماً از تقویم جلالی می‌آید که خیام در سال ۴۵۸ خورشیدی ساخت.' }"),

 ("{ t: 'p', x: 'And it is why Nowruz is exact. Persian new year does not fall on a date someone chose. It falls at the precise instant the sun crosses the equator, and the whole calendar is anchored to that moment. Every Iranian family sitting at the Haft Seen, watching the clock turn, is using Khayyam.' }",
  "{ t: 'p', x: 'And it is why Nowruz is exact. Persian new year does not fall on a date someone chose. It falls at the precise instant the sun crosses the equator, and the whole calendar is anchored to that moment. Every Iranian family sitting at the Haft Seen, watching the clock turn, is using Khayyam.', fa: 'و دلیل اینکه نوروز دقیق است هم همین است. سال نو ایرانی در تاریخی که کسی انتخابش کرده باشد نمی‌افتد؛ در همان لحظهٔ دقیقی می‌افتد که خورشید از استوا می‌گذرد، و تمام تقویم به همان لحظه گره خورده است. هر خانوادهٔ ایرانی که سر سفرهٔ هفت‌سین نشسته و چشم به ساعت دارد تا سال تحویل شود، دارد از خیام استفاده می‌کند.' }"),

 ("{ t: 'h', x: 'The mathematics' }",
  "{ t: 'h', x: 'The mathematics', fa: 'ریاضیات' }"),

 ("{ t: 'p', x: 'The calendar was not even his deepest work. Khayyam wrote a treatise on algebra that classified cubic equations, the ones with a cube in them, and solved them. Nobody had done this systematically before.' }",
  "{ t: 'p', x: 'The calendar was not even his deepest work. Khayyam wrote a treatise on algebra that classified cubic equations, the ones with a cube in them, and solved them. Nobody had done this systematically before.', fa: 'تقویم حتی ژرف‌ترین کار او نبود. خیام رساله‌ای در جبر نوشت که در آن معادلات درجهٔ سوم، یعنی معادله‌هایی که مجهولشان به توان سه می‌رسد، را دسته‌بندی و حل کرد. پیش از او هیچ‌کس این کار را به‌طور نظام‌مند انجام نداده بود.' }"),

 ("{ t: 'p', x: 'His method is beautiful. He could not solve them with numbers, because the algebra to do that would not exist for another five hundred years. So he solved them with shapes. He drew a parabola and a circle, arranged so that where they crossed was the answer, and read the solution off the geometry. He turned algebra into a picture.' }",
  "{ t: 'p', x: 'His method is beautiful. He could not solve them with numbers, because the algebra to do that would not exist for another five hundred years. So he solved them with shapes. He drew a parabola and a circle, arranged so that where they crossed was the answer, and read the solution off the geometry. He turned algebra into a picture.', fa: 'روشش زیباست. نمی‌توانست آنها را با عدد حل کند، چون جبری که این کار را ممکن می‌کرد تا پانصد سال بعد هنوز پدید نیامده بود. پس با شکل حلشان کرد. سهمی و دایره‌ای می‌کشید و چنان می‌چیدشان که محل تقاطعشان همان پاسخ باشد، و جواب را از روی هندسه می‌خواند. جبر را به تصویر بدل کرد.' }"),
]

lit_scope.apply("khayyam", PAIRS)
