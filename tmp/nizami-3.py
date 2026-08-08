# -*- coding: utf-8 -*-
# Nizami, third batch: Farhad's end, and لیلی و مجنون.
# قیس, مجنون, تیشه, بیستون.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'He does it. That is the turn nobody expects. Farhad takes his axe to the mountain and begins to cut, and he does not stop, and the mountain begins to give way.' }",
  "{ t: 'p', x: 'He does it. That is the turn nobody expects. Farhad takes his axe to the mountain and begins to cut, and he does not stop, and the mountain begins to give way.', fa: 'و انجامش می‌دهد. این همان چرخشی است که کسی انتظارش را ندارد. فرهاد تیشه‌اش را بر کوه می‌گذارد و شروع به تراشیدن می‌کند، و دست برنمی‌دارد، و کوه کم‌کم تسلیم می‌شود.' }"),

 ("{ t: 'h', x: 'And then the lie' }",
  "{ t: 'h', x: 'And then the lie', fa: 'و بعد، آن دروغ' }"),

 ("{ t: 'p', x: 'Khosrow panics. He is a king, and he has been beaten by a man with a hammer, so he does the thing a king can always do. He sends a messenger with false news: Shirin is dead.' }",
  "{ t: 'p', x: 'Khosrow panics. He is a king, and he has been beaten by a man with a hammer, so he does the thing a king can always do. He sends a messenger with false news: Shirin is dead.', fa: 'خسرو وحشت می‌کند. شاه است، و مردی با یک پتک شکستش داده، پس همان کاری را می‌کند که از دست هر شاهی همیشه برمی‌آید: پیکی می‌فرستد با خبری دروغ؛ شیرین مرده است.' }"),

 ("{ t: 'p', x: 'Farhad, standing in the wound he has cut through a mountain for her, hears it, and throws his axe into the air, and follows it down.' }",
  "{ t: 'p', x: 'Farhad, standing in the wound he has cut through a mountain for her, hears it, and throws his axe into the air, and follows it down.', fa: 'فرهاد، ایستاده در همان شکافی که به خاطر او در دل کوه تراشیده، این را می‌شنود، تیشه را به هوا می‌اندازد، و پشت سرش فرو می‌افتد.' }"),

 ("{ t: 'p', x: 'Every Iranian knows Farhad, and knows he is not in the histories, and does not care. He became the word for a certain kind of love: the kind that does the impossible thing and is destroyed by something small and cheap. To call a man Farhad is to say he loved past all reason and it cost him everything.' }",
  "{ t: 'p', x: 'Every Iranian knows Farhad, and knows he is not in the histories, and does not care. He became the word for a certain kind of love: the kind that does the impossible thing and is destroyed by something small and cheap. To call a man Farhad is to say he loved past all reason and it cost him everything.', fa: 'هر ایرانی فرهاد را می‌شناسد، و می‌داند که در تاریخ‌ها نیست، و برایش مهم نیست. او به واژه‌ای بدل شد برای نوعی از عشق: عشقی که کار ناممکن را می‌کند و بعد با چیزی کوچک و ارزان نابود می‌شود. وقتی به مردی می‌گویند فرهاد، یعنی فراتر از هر عقلی عاشق شد و همه‌چیزش را بر سرش داد.' }"),

 ("{ t: 'aside', x: 'Bisotun is real. Darius carved his inscription into that cliff fifteen hundred years before Nizami. Iranians will tell you the marks on the rock are Farhad work, and they will smile when they tell you.' }",
  "{ t: 'aside', x: 'Bisotun is real. Darius carved his inscription into that cliff fifteen hundred years before Nizami. Iranians will tell you the marks on the rock are Farhad work, and they will smile when they tell you.', fa: 'بیستون واقعی است. داریوش هزار و پانصد سال پیش از نظامی سنگ‌نبشته‌اش را بر آن صخره کند. ایرانی‌ها به تو می‌گویند آن نشانه‌ها روی سنگ کارِ فرهاد است، و وقتی می‌گویند لبخند می‌زنند.' }"),

 ("{ t: 'p', x: 'It began as an Arab desert legend, thin and old. Nizami rewrote it in 1188, and his version became the definitive one across half the world, from Istanbul to Delhi. It is the Persian love story, and it is four hundred years older than Romeo and Juliet.' }",
  "{ t: 'p', x: 'It began as an Arab desert legend, thin and old. Nizami rewrote it in 1188, and his version became the definitive one across half the world, from Istanbul to Delhi. It is the Persian love story, and it is four hundred years older than Romeo and Juliet.', fa: 'در آغاز افسانه‌ای عربی بود از دل بیابان، کهنه و کم‌جان. نظامی در سال ۱۱۸۸ میلادی از نو نوشتش، و روایت او در نیمی از جهان روایت قطعی شد، از استانبول تا دهلی. این همان داستان عاشقانهٔ ایرانی است، و چهارصد سال از رومئو و ژولیت کهن‌تر.' }"),

 ("{ t: 'p', x: 'A boy called Qays loves a girl called Layli at school. Their families forbid it. He does not recover. He begins reciting poems about her in the street, and the shame of that public love is exactly what makes the marriage impossible forever. People start calling him Majnun, which is not a name. It means possessed. Madman.' }",
  "{ t: 'p', x: 'A boy called Qays loves a girl called Layli at school. Their families forbid it. He does not recover. He begins reciting poems about her in the street, and the shame of that public love is exactly what makes the marriage impossible forever. People start calling him Majnun, which is not a name. It means possessed. Madman.', fa: 'پسری به نام قیس، در مکتب‌خانه عاشق دختری به نام لیلی می‌شود. خانواده‌هایشان اجازه نمی‌دهند. او دیگر خوب نمی‌شود. در کوچه و خیابان دربارهٔ لیلی شعر می‌خواند، و ننگِ همین عشقِ علنی است که ازدواج را برای همیشه ناممکن می‌کند. مردم کم‌کم مجنونش می‌خوانند، که نام نیست؛ یعنی جن‌زده. دیوانه.' }"),
]

lit_scope.apply("nizami", PAIRS)
