# -*- coding: utf-8 -*-
# Nizami, fifth batch: هفت پیکر and بهرام گور.
# Plus the three outstanding veils elsewhere in the file, each of which
# carries a real line:
#   Rudaki   میر ماه است و بخارا آسمان / ماه سوی آسمان آید همی
#   Khayyam  از دی که گذشت هیچ ازو یاد مکن ... (the moving finger)
#   Saadi    هر که نصیحت خودرای کند، او نصیحت‌گری را محتاج است

import sys
sys.path.insert(0, "tmp")
import lit_scope

NIZAMI = [
 ("{ t: 'p', x: 'Sufis read this as the whole path: love a person completely enough and the person dissolves and you are left loving God, who was the object the entire time. Others read it as a straightforward tragedy about a boy who went mad and died in a desert. Nizami permits both, and never once tells you which.' }",
  "{ t: 'p', x: 'Sufis read this as the whole path: love a person completely enough and the person dissolves and you are left loving God, who was the object the entire time. Others read it as a straightforward tragedy about a boy who went mad and died in a desert. Nizami permits both, and never once tells you which.', fa: 'صوفیان این را تمامِ راه می‌خوانند: کسی را چنان تمام و کمال دوست بدار که خودِ او حل شود و آنچه بماند عشق به خدا باشد، که از اول هم مقصود همو بوده. دیگران آن را سوگ‌نامه‌ای ساده می‌خوانند دربارهٔ پسری که دیوانه شد و در بیابانی مرد. نظامی هر دو را روا می‌دارد، و حتی یک بار هم نمی‌گوید کدام.' }"),

 ("{ t: 'p', x: 'And then he built the strangest thing in Persian literature.' }",
  "{ t: 'p', x: 'And then he built the strangest thing in Persian literature.', fa: 'و بعد، غریب‌ترین چیز ادبیات فارسی را ساخت.' }"),

 ("{ t: 'p', x: 'King Bahram Gur builds seven domed pavilions. Each is a single colour. Each belongs to a planet and a day of the week. In each lives a princess from a different country of the world. On each day he goes to the dome of that day, dressed in that colour, and the princess tells him a story.' }",
  "{ t: 'p', x: 'King Bahram Gur builds seven domed pavilions. Each is a single colour. Each belongs to a planet and a day of the week. In each lives a princess from a different country of the world. On each day he goes to the dome of that day, dressed in that colour, and the princess tells him a story.', fa: 'بهرام گور هفت گنبد می‌سازد. هر یک به یک رنگ. هر یک از آنِ سیاره‌ای و روزی از هفته. در هر گنبد شاهدختی از کشوری دیگرِ جهان زندگی می‌کند. هر روز به گنبد همان روز می‌رود، به رنگ همان روز جامه می‌پوشد، و شاهدخت برایش داستانی می‌گوید.' }"),

 ("{ t: 'p', x: 'Touch a dome.' }",
  "{ t: 'p', x: 'Touch a dome.', fa: 'یکی از گنبدها را لمس کن.' }"),

 ("{ t: 'h', x: 'Why this is not decoration' }",
  "{ t: 'h', x: 'Why this is not decoration', fa: 'چرا این تزیین نیست' }"),

 ("{ t: 'p', x: 'The colours are a sequence and they are going somewhere. He begins in black, the dome of Saturn, and the tale told there is the darkest. He ends in white, the dome of Venus, and the tale is the simplest and cleanest. The week is a journey out of darkness into light, and the king walks it one day at a time without noticing.' }",
  "{ t: 'p', x: 'The colours are a sequence and they are going somewhere. He begins in black, the dome of Saturn, and the tale told there is the darkest. He ends in white, the dome of Venus, and the tale is the simplest and cleanest. The week is a journey out of darkness into light, and the king walks it one day at a time without noticing.', fa: 'رنگ‌ها یک توالی‌اند و به جایی می‌روند. از سیاه آغاز می‌کند، گنبد کیوان، و داستانی که آنجا گفته می‌شود تاریک‌ترین است. به سپید ختم می‌کند، گنبد ناهید، و داستانش ساده‌ترین و پاک‌ترین. آن هفته سفری است از تاریکی به روشنایی، و شاه روز به روز می‌پیمایدش بی‌آنکه متوجه باشد.' }"),

 ("{ t: 'p', x: 'And the stories are not moral lessons. They are strange, erotic, funny, cruel, and they refuse to resolve neatly. Nizami is doing something no one else in Persian was doing: building a structure where the shape is the argument.' }",
  "{ t: 'p', x: 'And the stories are not moral lessons. They are strange, erotic, funny, cruel, and they refuse to resolve neatly. Nizami is doing something no one else in Persian was doing: building a structure where the shape is the argument.', fa: 'و این داستان‌ها درس اخلاقی نیستند. غریب‌اند، شهوانی، خنده‌دار، بی‌رحم، و حاضر نیستند تمیز و مرتب به نتیجه برسند. نظامی کاری می‌کند که هیچ‌کس دیگری در فارسی نمی‌کرد: ساختاری می‌سازد که در آن، خودِ شکل همان استدلال است.' }"),

 ("{ t: 'mark', x: 'Seven colours, seven planets, seven days, seven countries. Nothing in it is accidental.' }",
  "{ t: 'mark', x: 'Seven colours, seven planets, seven days, seven countries. Nothing in it is accidental.', fa: 'هفت رنگ، هفت سیاره، هفت روز، هفت سرزمین. هیچ چیزش تصادفی نیست.' }"),
]

lit_scope.apply("nizami", NIZAMI)

# --- the three outstanding veils, each in its own poet's block ---
lit_scope.apply("rudaki", [
 ("surface: 'The prince is the moon and Bukhara the sky. The moon is coming to the sky.'",
  "surface: 'The prince is the moon and Bukhara the sky. The moon is coming to the sky.', surfaceFa: 'میر ماه است و بخارا آسمان\\u200Cماه سوی آسمان آید همی'"),
])

lit_scope.apply("khayyam", [
 ("surface: 'The moving finger writes, and having writ moves on. Nor all your piety nor wit shall lure it back to cancel half a line, nor all your tears wash out a word of it.'",
  "surface: 'The moving finger writes, and having writ moves on. Nor all your piety nor wit shall lure it back to cancel half a line, nor all your tears wash out a word of it.', surfaceFa: 'از دی که گذشت هیچ ازو یاد مکن\\u200Cفردا که نیامده‌ست فریاد مکن'"),
])

lit_scope.apply("saadi", [
 ("surface: 'Whoever gives advice to a self willed man is himself in need of advice.'",
  "surface: 'Whoever gives advice to a self willed man is himself in need of advice.', surfaceFa: 'هر که نصیحت خودرای کند، او نصیحت‌گری را محتاج است'"),
])
