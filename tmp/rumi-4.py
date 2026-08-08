# -*- coding: utf-8 -*-
# Rumi, fourth batch: دیوان شمس تبریزی and مثنوی معنوی.
# تخلص is the technical term for the signature line — the English has to
# explain it as "where a Persian poet puts his own name"; Persian names it.
# قرآن در زبان پهلوی / قرآن پارسی is the traditional phrase for the Masnavi.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'And he did not write them, in the way we mean. He spoke them. Walking, turning, in the middle of conversation, at any hour, and a devoted man named Husam al Din wrote them down as fast as they came.' }",
  "{ t: 'p', x: 'And he did not write them, in the way we mean. He spoke them. Walking, turning, in the middle of conversation, at any hour, and a devoted man named Husam al Din wrote them down as fast as they came.', fa: 'و آنها را ننوشت، به آن معنایی که ما می‌فهمیم. گفت. در حال راه رفتن، در حال چرخیدن، وسط گفت‌وگو، در هر ساعتی؛ و مریدی سرسپرده به نام حسام‌الدین چلبی هر چه می‌آمد به همان سرعت می‌نوشت.' }"),

 ("{ t: 'h', x: 'The book with the wrong name' }",
  "{ t: 'h', x: 'The book with the wrong name', fa: 'کتابی با نام اشتباه' }"),

 ("{ t: 'p', x: 'The first is a collection of ghazals, around forty thousand verses of them, and it is his greatest lyric work. It is called the Divan e Shams e Tabrizi. The Divan of Shams of Tabriz.' }",
  "{ t: 'p', x: 'The first is a collection of ghazals, around forty thousand verses of them, and it is his greatest lyric work. It is called the Divan e Shams e Tabrizi. The Divan of Shams of Tabriz.', fa: 'نخستین، مجموعه‌ای است از غزل، حدود چهل هزار بیت، و بزرگ‌ترین کار غنایی اوست. نامش دیوان شمس تبریزی است. دیوانِ شمسِ تبریزی.' }"),

 ("{ t: 'p', x: 'He signed the dead man name to his own poems. Not as dedication, as authorship. At the end of a ghazal, where a Persian poet puts his own name and always has, Rumi put Shams.' }",
  "{ t: 'p', x: 'He signed the dead man name to his own poems. Not as dedication, as authorship. At the end of a ghazal, where a Persian poet puts his own name and always has, Rumi put Shams.', fa: 'نام آن مرد مرده را پای شعرهای خودش گذاشت. نه به‌عنوان تقدیم، بلکه به‌عنوان سراینده. در بیت پایانی غزل، همان‌جا که شاعر فارسی تخلصش را می‌آورد و همیشه آورده است، مولانا نام شمس را گذاشت.' }"),

 ("{ t: 'p', x: 'And it is not humility, or not only. It is the actual claim. He believed the voice was not his. The self that would have signed it was the thing that dissolved in that room in 1244, and what was left did not have a name to put down.' }",
  "{ t: 'p', x: 'And it is not humility, or not only. It is the actual claim. He believed the voice was not his. The self that would have signed it was the thing that dissolved in that room in 1244, and what was left did not have a name to put down.', fa: 'و این فروتنی نیست، یا دست‌کم فقط فروتنی نیست. ادعای واقعی اوست. باور داشت آن صدا از آنِ او نیست. آن «خود»ی که قرار بود پای شعر را امضا کند، همان چیزی بود که در آن اتاق، در سال ۱۲۴۴، حل شد؛ و آنچه باقی مانده بود نامی نداشت که بگذارد.' }"),

 ("{ t: 'h', x: 'The Masnavi' }",
  "{ t: 'h', x: 'The Masnavi', fa: 'مثنوی معنوی' }"),

 ("{ t: 'p', x: 'The second book is the Masnavi, twenty six thousand couplets across six volumes, and Persians have called it the Quran in the Persian tongue for seven hundred years. It is stories, digressions, jokes, arguments, jurisprudence, and long passages of the purest mysticism in the language, and it wanders like a conversation because it was one.' }",
  "{ t: 'p', x: 'The second book is the Masnavi, twenty six thousand couplets across six volumes, and Persians have called it the Quran in the Persian tongue for seven hundred years. It is stories, digressions, jokes, arguments, jurisprudence, and long passages of the purest mysticism in the language, and it wanders like a conversation because it was one.', fa: 'کتاب دوم مثنوی معنوی است، بیست و شش هزار بیت در شش دفتر، و هفتصد سال است که ایرانیان آن را «قرآن در زبان پارسی» خوانده‌اند. حکایت است و حاشیه‌روی و شوخی و بحث و فقه، و بندهای بلندی از خالص‌ترین عرفانی که این زبان دارد؛ و مثل یک گفت‌وگو این‌سو و آن‌سو می‌رود، چون در واقع یک گفت‌وگو بود.' }"),

 ("{ t: 'p', x: 'It opens with eighteen lines about a flute, and those eighteen lines contain the entire thesis.' }",
  "{ t: 'p', x: 'It opens with eighteen lines about a flute, and those eighteen lines contain the entire thesis.', fa: 'با هجده بیت دربارهٔ یک نی آغاز می‌شود، و تمام حرف کتاب در همان هجده بیت هست.' }"),
]

lit_scope.apply("rumi", PAIRS)
