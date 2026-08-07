# -*- coding: utf-8 -*-
# Saadi, second batch: the return to Shiraz, the Golestan and the Bustan.
# گلستان, بوستان, حکایت. The line about the useful lie is Saadi's own —
# دروغِ مصلحت‌آمیز به ز راستیِ فتنه‌انگیز — so it is quoted, not rendered.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'h', x: 'The city that survived' }",
  "{ t: 'h', x: 'The city that survived', fa: 'شهری که جان به در برد' }"),

 ("{ t: 'p', x: 'He came home around 1257, and found something remarkable. Shiraz was standing. Its rulers had read the situation, submitted to the Mongols, paid, and spared the city the fate of Baghdad and Nishapur. It was not glorious. It saved everything.' }",
  "{ t: 'p', x: 'He came home around 1257, and found something remarkable. Shiraz was standing. Its rulers had read the situation, submitted to the Mongols, paid, and spared the city the fate of Baghdad and Nishapur. It was not glorious. It saved everything.', fa: 'حدود سال ۱۲۵۷ به خانه بازگشت و چیز شگفتی دید: شیراز سرِ پا بود. حاکمانش وضع را درست خوانده بودند، به مغول تسلیم شده بودند، باج داده بودند، و شهر را از سرنوشت بغداد و نیشابور رهانده بودند. کار پرشکوهی نبود. اما همه‌چیز را نجات داد.' }"),

 ("{ t: 'p', x: 'In 1258 the Mongols took Baghdad and killed the caliph and put the greatest library in the world into the river. That same year, in the one Persian city still intact, Saadi finished the Golestan.' }",
  "{ t: 'p', x: 'In 1258 the Mongols took Baghdad and killed the caliph and put the greatest library in the world into the river. That same year, in the one Persian city still intact, Saadi finished the Golestan.', fa: 'در سال ۱۲۵۸ مغول‌ها بغداد را گرفتند، خلیفه را کشتند، و بزرگ‌ترین کتابخانهٔ جهان را به رودخانه ریختند. همان سال، در تنها شهر ایرانی که هنوز سالم مانده بود، سعدی گلستان را به پایان رساند.' }"),

 ("{ t: 'p', x: 'He wrote two books that Iranians have not stopped reading since. The Bustan, the Orchard, all in verse, on how a good life should be lived. And the Golestan, the Rose Garden, which is stranger and greater.' }",
  "{ t: 'p', x: 'He wrote two books that Iranians have not stopped reading since. The Bustan, the Orchard, all in verse, on how a good life should be lived. And the Golestan, the Rose Garden, which is stranger and greater.', fa: 'دو کتاب نوشت که ایرانیان از آن روز تا امروز از خواندنشان دست نکشیده‌اند. بوستان، که یکسره به نظم است، دربارهٔ اینکه زندگی نیک را چگونه باید زیست. و گلستان، که غریب‌تر است و بزرگ‌تر.' }"),

 ("{ t: 'p', x: 'The Golestan is short stories. Real ones, about kings and beggars and thieves and fools, told in a few lines of prose, each ending in a couplet that lands the point like a hand on a table. Nothing else in Persian literature is built this way.' }",
  "{ t: 'p', x: 'The Golestan is short stories. Real ones, about kings and beggars and thieves and fools, told in a few lines of prose, each ending in a couplet that lands the point like a hand on a table. Nothing else in Persian literature is built this way.', fa: 'گلستان مجموعه‌ای از حکایت‌های کوتاه است. حکایت‌هایی واقعی، دربارهٔ شاهان و گدایان و دزدان و ابلهان، در چند سطر نثر، که هر کدام به بیتی ختم می‌شود و آن بیت مطلب را می‌کوبد، مثل دستی که روی میز فرود بیاید. هیچ چیز دیگری در ادبیات فارسی این‌گونه ساخته نشده است.' }"),

 ("{ t: 'h', x: 'Why it is taught to children' }",
  "{ t: 'h', x: 'Why it is taught to children', fa: 'چرا آن را به کودکان می‌آموزند' }"),

 ("{ t: 'p', x: 'For seven hundred years the Golestan was the first book Persian children learned to read properly. Not because it was simple, but because its prose is the most graceful ever written in the language, and because every story teaches something without ever quite lecturing.' }",
  "{ t: 'p', x: 'For seven hundred years the Golestan was the first book Persian children learned to read properly. Not because it was simple, but because its prose is the most graceful ever written in the language, and because every story teaches something without ever quite lecturing.', fa: 'هفتصد سال، گلستان نخستین کتابی بود که کودکان ایرانی درست‌وحسابی با آن خواندن می‌آموختند. نه از آن رو که ساده بود، بلکه از آن رو که نثرش موزون‌ترین نثری است که در این زبان نوشته شده، و از آن رو که هر حکایتش چیزی می‌آموزد بی‌آنکه هرگز کاملاً به موعظه بیفتد.' }"),

 ("{ t: 'p', x: 'Saadi is never pious about it. His moral is often uncomfortable. He tells you that a lie which prevents harm is better than a truth that causes it, which is not what a holy man is supposed to say.' }",
  "{ t: 'p', x: 'Saadi is never pious about it. His moral is often uncomfortable. He tells you that a lie which prevents harm is better than a truth that causes it, which is not what a holy man is supposed to say.', fa: 'سعدی هرگز در این کار زاهدمآب نیست. اخلاقی که پیشنهاد می‌کند اغلب معذب‌کننده است. می‌گوید دروغِ مصلحت‌آمیز به ز راستیِ فتنه‌انگیز، و این آن چیزی نیست که از یک مرد دین انتظار می‌رود.' }"),
]

lit_scope.apply("saadi", PAIRS)
