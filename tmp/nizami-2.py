# -*- coding: utf-8 -*-
# Nizami, second batch: خمسه, خسرو و شیرین, فرهاد, بیستون.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'h', x: 'The five' }",
  "{ t: 'h', x: 'The five', fa: 'پنج گنج' }"),

 ("{ t: 'p', x: 'His life work is called the Khamsa, the Quintet. Five long narrative poems, around thirty thousand couplets in total. Before him, Persian narrative meant Ferdowsi and kings and war. Nizami turned the epic inward and pointed it at two people in a room.' }",
  "{ t: 'p', x: 'His life work is called the Khamsa, the Quintet. Five long narrative poems, around thirty thousand couplets in total. Before him, Persian narrative meant Ferdowsi and kings and war. Nizami turned the epic inward and pointed it at two people in a room.', fa: 'کار عمرش را خمسه می‌خوانند، یا پنج گنج. پنج منظومهٔ بلند روایی، رویهم حدود سی هزار بیت. پیش از او، روایت در فارسی یعنی فردوسی و شاهان و جنگ. نظامی حماسه را به درون چرخاند و آن را به دو نفر در یک اتاق نشانه رفت.' }"),

 ("{ t: 'p', x: 'And he did something nobody had done: he gave the women interior lives. Shirin argues, refuses, negotiates, and is often the most intelligent person in the poem. Layli is not a prize. She speaks, and what she says is sharper than anything the men manage.' }",
  "{ t: 'p', x: 'And he did something nobody had done: he gave the women interior lives. Shirin argues, refuses, negotiates, and is often the most intelligent person in the poem. Layli is not a prize. She speaks, and what she says is sharper than anything the men manage.', fa: 'و کاری کرد که هیچ‌کس نکرده بود: به زنان جهانِ درونی داد. شیرین بحث می‌کند، رد می‌کند، چانه می‌زند، و اغلب خردمندترین شخصیت منظومه است. لیلی جایزه نیست. حرف می‌زند، و آنچه می‌گوید تیزتر از هر چیزی است که از دهان مردان درمی‌آید.' }"),

 ("{ t: 'p', x: 'Khosrow and Shirin takes a real Sasanian king, Khosrow Parviz, and a real queen, and builds around them a long, difficult, adult romance of pride and delay and missed chances. It is not a fairy tale. Khosrow is vain and often a coward, and Shirin is better than him, and both of them know it.' }",
  "{ t: 'p', x: 'Khosrow and Shirin takes a real Sasanian king, Khosrow Parviz, and a real queen, and builds around them a long, difficult, adult romance of pride and delay and missed chances. It is not a fairy tale. Khosrow is vain and often a coward, and Shirin is better than him, and both of them know it.', fa: 'خسرو و شیرین شاهی واقعی از ساسانیان را برمی‌دارد، خسرو پرویز، و ملکه‌ای واقعی را، و گرد آن دو داستانی عاشقانه می‌سازد؛ بلند و دشوار و بزرگسالانه، از غرور و تعلل و فرصت‌های از دست رفته. افسانهٔ پریان نیست. خسرو خودخواه است و اغلب ترسو، و شیرین از او بهتر است، و هر دو این را می‌دانند.' }"),

 ("{ t: 'p', x: 'And then Nizami invents a character who was not in any history, and the invention swallows the poem.' }",
  "{ t: 'p', x: 'And then Nizami invents a character who was not in any history, and the invention swallows the poem.', fa: 'و بعد نظامی شخصیتی می‌آفریند که در هیچ تاریخی نبوده، و همان آفریده، منظومه را می‌بلعد.' }"),

 ("{ t: 'h', x: 'Farhad' }",
  "{ t: 'h', x: 'Farhad', fa: 'فرهاد' }"),

 ("{ t: 'p', x: 'Farhad is a stonecutter. He sees Shirin once and loves her with a completeness that the king, with all his armies, cannot match. He is not noble, he is not rich, and he is not going to stop.' }",
  "{ t: 'p', x: 'Farhad is a stonecutter. He sees Shirin once and loves her with a completeness that the king, with all his armies, cannot match. He is not noble, he is not rich, and he is not going to stop.', fa: 'فرهاد سنگ‌تراش است. شیرین را یک بار می‌بیند و چنان تمام و کمال عاشقش می‌شود که شاه، با همهٔ سپاهش، به گَردش نمی‌رسد. نه اشراف‌زاده است، نه توانگر، و قرار هم نیست دست بردارد.' }"),

 ("{ t: 'p', x: 'Khosrow, jealous of a labourer, sets him an impossible task. Cut a channel through Mount Bisotun, and Shirin is yours. It cannot be done. That is why it is offered.' }",
  "{ t: 'p', x: 'Khosrow, jealous of a labourer, sets him an impossible task. Cut a channel through Mount Bisotun, and Shirin is yours. It cannot be done. That is why it is offered.', fa: 'خسرو که به یک کارگر رشک می‌برد، کاری ناممکن پیش پایش می‌گذارد: از دل کوه بیستون جوی بکَن، و شیرین از آنِ توست. شدنی نیست. پیشنهاد هم به همین دلیل داده می‌شود.' }"),
]

lit_scope.apply("nizami", PAIRS)
