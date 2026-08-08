# -*- coding: utf-8 -*-
# Rudaki, final batch: the poem on old age, and the close.
# The famous opening is مرا بسود و فروریخت هر چه دندان بود, and the Persian
# names it where the English can only describe it.
# آدم‌الشعرا, قصیده, غزل, رباعی, مثنوی.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'aside', x: 'The identification of the grave is not certain, and the finding has been questioned. It may be true. We will probably never know.' }",
  "{ t: 'aside', x: 'The identification of the grave is not certain, and the finding has been questioned. It may be true. We will probably never know.', fa: 'اینکه آن گور از او باشد قطعی نیست، و در این یافته تردید کرده‌اند. ممکن است راست باشد. احتمالاً هرگز نخواهیم دانست.' }"),

 ("{ t: 'h', x: 'The teeth' }",
  "{ t: 'h', x: 'The teeth', fa: 'دندان‌ها' }"),

 ("{ t: 'p', x: 'And then, at the end, old and poor and back in the mountains, he wrote the poem that is the reason he is not just a historical first.' }",
  "{ t: 'p', x: 'And then, at the end, old and poor and back in the mountains, he wrote the poem that is the reason he is not just a historical first.', fa: 'و بعد، در پایان، پیر و تنگدست و بازگشته به کوه‌ها، شعری سرود که همان دلیلِ این است که او فقط یک «نخستینِ تاریخی» نیست.' }"),

 ("{ t: 'p', x: 'It begins with his teeth. It is about his teeth falling out. It is one of the great poems about growing old in any language on earth.' }",
  "{ t: 'p', x: 'It begins with his teeth. It is about his teeth falling out. It is one of the great poems about growing old in any language on earth.', fa: 'با دندان‌هایش آغاز می‌شود: «مرا بسود و فروریخت هر چه دندان بود.» دربارهٔ ریختن دندان‌هایش است. و یکی از بزرگ‌ترین شعرهای پیر شدن است، در هر زبانی روی این زمین.' }"),

 ("{ t: 'p', x: 'It goes on. He remembers when he was young and the world was open, when he had wine and music and women and everything was easy and he never once thought to be grateful for it. He does not moralise about this. He is not building to a lesson. He is an old blind man in a village listing what he had, and the list is the poem.' }",
  "{ t: 'p', x: 'It goes on. He remembers when he was young and the world was open, when he had wine and music and women and everything was easy and he never once thought to be grateful for it. He does not moralise about this. He is not building to a lesson. He is an old blind man in a village listing what he had, and the list is the poem.', fa: 'ادامه می‌دهد. به یاد می‌آورد وقتی جوان بود و جهان باز بود، وقتی می و موسیقی و زن داشت و همه‌چیز آسان بود و حتی یک بار به سرش نزد که سپاسگزار باشد. دربارهٔ این هیچ موعظه‌ای نمی‌کند. به هیچ درسی هم نمی‌رسد. پیرمردی نابیناست در روستایی که فهرست می‌کند چه داشته، و همان فهرست، خودِ شعر است.' }"),

 ("{ t: 'p', x: 'There is no consolation in it, no God, no wisdom earned. Persian poetry begins with a man refusing to pretend that losing everything was worth it. That is a remarkable thing for a literature to start with, and it may be why the literature never became sentimental.' }",
  "{ t: 'p', x: 'There is no consolation in it, no God, no wisdom earned. Persian poetry begins with a man refusing to pretend that losing everything was worth it. That is a remarkable thing for a literature to start with, and it may be why the literature never became sentimental.', fa: 'در آن تسلایی نیست، خدایی نیست، حکمتی هم که به دست آمده باشد نیست. شعر فارسی با مردی آغاز می‌شود که حاضر نیست وانمود کند از دست دادن همه‌چیز ارزشش را داشت. این آغاز شگفتی است برای یک ادبیات، و شاید همین دلیل آن است که این ادبیات هرگز احساساتی نشد.' }"),

 ("{ t: 'p', x: 'Iranians call him Adam al Shoara, the Adam of Poets. The first man of the tribe. Everyone in this section is descended from him.' }",
  "{ t: 'p', x: 'Iranians call him Adam al Shoara, the Adam of Poets. The first man of the tribe. Everyone in this section is descended from him.', fa: 'ایرانی‌ها او را آدم‌الشعرا می‌خوانند؛ آدمِ شاعران. نخستین مرد این تبار. همهٔ کسانی که در این بخش هستند از نسل او هستند.' }"),

 ("{ t: 'p', x: 'He is buried in Tajikistan, which is worth pausing on, because it says something true about Persian. The language is bigger than the country. It began in Bukhara and Samarkand, cities that are not in Iran and have not been for centuries, and the first great poet of Iran lies outside it. Persian was never contained by a border.' }",
  "{ t: 'p', x: 'He is buried in Tajikistan, which is worth pausing on, because it says something true about Persian. The language is bigger than the country. It began in Bukhara and Samarkand, cities that are not in Iran and have not been for centuries, and the first great poet of Iran lies outside it. Persian was never contained by a border.', fa: 'در تاجیکستان به خاک سپرده شده، و ارزشش را دارد که روی این مکث کنیم، چون چیزی راست دربارهٔ فارسی می‌گوید: این زبان از آن کشور بزرگ‌تر است. در بخارا و سمرقند آغاز شد، شهرهایی که در ایران نیستند و قرن‌ها نبوده‌اند، و نخستین شاعر بزرگ ایران بیرون از ایران آرمیده است. فارسی هرگز در هیچ مرزی نگنجید.' }"),

 ("{ t: 'h', x: 'What he handed forward' }",
  "{ t: 'h', x: 'What he handed forward', fa: 'آنچه به دست بعدی‌ها داد' }"),

 ("{ t: 'p', x: 'He set the forms. The qasida, the ghazal, the rubai, the masnavi. Everything Ferdowsi and Hafez and Saadi and Khayyam used was already shaped and waiting for them, and Rudaki is the one who shaped it. They inherited a working instrument because he built it.' }",
  "{ t: 'p', x: 'He set the forms. The qasida, the ghazal, the rubai, the masnavi. Everything Ferdowsi and Hafez and Saadi and Khayyam used was already shaped and waiting for them, and Rudaki is the one who shaped it. They inherited a working instrument because he built it.', fa: 'قالب‌ها را او بنا گذاشت: قصیده، غزل، رباعی، مثنوی. هر چه فردوسی و حافظ و سعدی و خیام به کار بردند، از پیش شکل گرفته و در انتظارشان بود، و رودکی همان کسی است که شکلش داد. سازی کارآمد به ارث بردند، چون او ساخته بودش.' }"),

 ("{ t: 'p', x: 'And he set the tone. Direct, musical, unashamed of pleasure, unashamed of loss. Persian poetry could have gone in any direction at the start. It went in his.' }",
  "{ t: 'p', x: 'And he set the tone. Direct, musical, unashamed of pleasure, unashamed of loss. Persian poetry could have gone in any direction at the start. It went in his.', fa: 'و لحن را هم او گذاشت: صریح، آهنگین، بی‌شرم از لذت، بی‌شرم از فقدان. شعر فارسی در آغاز می‌توانست به هر سویی برود. به سوی او رفت.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Rudaki, the blind singer from the stream village, who took a language that nobody wrote poems in and wrote enough of them to settle the question forever.' }",
  "{ t: 'p', x: 'This has been a glimpse of Rudaki, the blind singer from the stream village, who took a language that nobody wrote poems in and wrote enough of them to settle the question forever.', fa: 'این نگاهی بود کوتاه به رودکی؛ خنیاگر نابینای روستای جویبار، که زبانی را برگرفت که کسی به آن شعر نمی‌گفت و آن‌قدر شعر به آن سرود که پرسش برای همیشه بسته شد.' }"),

 ("{ t: 'p', x: 'He sang a king off his cushion and onto a barefoot horse. He wrote a hundred thousand verses and kept a thousand. He was thrown out of the court he had made famous, and went home to the mountains, and wrote about his teeth.' }",
  "{ t: 'p', x: 'He sang a king off his cushion and onto a barefoot horse. He wrote a hundred thousand verses and kept a thousand. He was thrown out of the court he had made famous, and went home to the mountains, and wrote about his teeth.', fa: 'با آواز، شاهی را از بالش برداشت و پابرهنه بر اسب نشاند. صد هزار بیت سرود و هزار بیتش ماند. از همان درباری که نامدارش کرده بود بیرون انداختندش، و به کوه‌ها برگشت، و از دندان‌هایش نوشت.' }"),
]

lit_scope.apply("rudaki", PAIRS)
