# -*- coding: utf-8 -*-
# Rudaki, first batch. رودکی, پنجرود, سامانیان, بخارا, چنگ.
# The chapter is about Persian becoming a written language, so the Persian
# should feel like it knows that — plain, and reaching for Persian words.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("essence: 'The first. Before Ferdowsi, before Hafez, before any of them, a blind singer from a mountain village proved that Persian could be a language of poetry. Of the hundred thousand verses he is said to have written, about a thousand survive.'",
  "essence: 'The first. Before Ferdowsi, before Hafez, before any of them, a blind singer from a mountain village proved that Persian could be a language of poetry. Of the hundred thousand verses he is said to have written, about a thousand survive.', essenceFa: 'نخستین. پیش از فردوسی، پیش از حافظ، پیش از همه‌شان، خنیاگری نابینا از روستایی کوهستانی نشان داد که فارسی می‌تواند زبان شعر باشد. از صد هزار بیتی که می‌گویند سروده است، حدود هزار بیت به جا مانده.'"),

 ("{ t: 'lead', x: 'Someone has to be first. Someone has to write in a language before anyone knows it can be written in.'",
  "{ t: 'lead', x: 'Someone has to be first. Someone has to write in a language before anyone knows it can be written in.', fa: 'یکی باید نخستین باشد. یکی باید به زبانی بنویسد، پیش از آنکه کسی بداند می‌شود به آن نوشت.'"),

 ("{ t: 'p', x: 'When Rudaki was born, around 858, Persian had been silent for two hundred years. The conquest had made Arabic the language of everything that counted, of law, of learning, of poetry. Persian survived in kitchens and villages. Nobody wrote serious literature in it. There was no reason to think anyone could.' }",
  "{ t: 'p', x: 'When Rudaki was born, around 858, Persian had been silent for two hundred years. The conquest had made Arabic the language of everything that counted, of law, of learning, of poetry. Persian survived in kitchens and villages. Nobody wrote serious literature in it. There was no reason to think anyone could.', fa: 'وقتی رودکی حدود سال ۸۵۸ میلادی به دنیا آمد، فارسی دو قرن خاموش بود. فتح، عربی را زبان هر چیزی کرده بود که به شمار می‌آمد: زبان شرع، زبان دانش، زبان شعر. فارسی در آشپزخانه‌ها و روستاها زنده مانده بود. کسی به آن ادبیات جدی نمی‌نوشت. دلیلی هم نبود که کسی گمان کند می‌شود نوشت.' }"),

 ("{ t: 'p', x: 'He came from a village called Panjrud, in the mountains east of Samarkand, in what is now Tajikistan. Rudaki is not a name either. It means from Rudak, the place of the little river. He is the poet from the stream village.' }",
  "{ t: 'p', x: 'He came from a village called Panjrud, in the mountains east of Samarkand, in what is now Tajikistan. Rudaki is not a name either. It means from Rudak, the place of the little river. He is the poet from the stream village.', fa: 'اهل روستایی بود به نام پنجرود، در کوه‌های شرق سمرقند، در تاجیکستانِ امروز. رودکی هم نام نیست؛ یعنی اهل رودک، جای رودِ کوچک. او شاعرِ روستای جویبار است.' }"),

 ("{ t: 'h', x: 'The court that made a language' }",
  "{ t: 'h', x: 'The court that made a language', fa: 'درباری که زبانی ساخت' }"),

 ("{ t: 'p', x: 'The Samanids ruled Bukhara, and they made a deliberate and world changing decision. They were Persians, they were proud of it, and they chose to have their court speak and write and celebrate in Persian while the whole Islamic world around them ran on Arabic. They paid for it. They defended it. It was policy.' }",
  "{ t: 'p', x: 'The Samanids ruled Bukhara, and they made a deliberate and world changing decision. They were Persians, they were proud of it, and they chose to have their court speak and write and celebrate in Persian while the whole Islamic world around them ran on Arabic. They paid for it. They defended it. It was policy.', fa: 'سامانیان بر بخارا فرمان می‌راندند، و تصمیمی گرفتند آگاهانه که جهان را عوض کرد. ایرانی بودند و به آن سربلند، و برگزیدند که دربارشان به فارسی حرف بزند و بنویسد و جشن بگیرد، در حالی که تمام جهان اسلام پیرامونشان با عربی می‌گشت. برایش پول دادند. از آن دفاع کردند. این یک سیاست بود.' }"),

 ("{ t: 'p', x: 'Rudaki was their poet, and he was the proof. If Persian could produce this, at this level, then Persian was a literary language, and the argument was over. Everything that follows in this section stands on that.' }",
  "{ t: 'p', x: 'Rudaki was their poet, and he was the proof. If Persian could produce this, at this level, then Persian was a literary language, and the argument was over. Everything that follows in this section stands on that.', fa: 'رودکی شاعر آنان بود، و او همان دلیل بود. اگر فارسی می‌توانست چنین چیزی و در چنین سطحی پدید بیاورد، پس فارسی زبانی ادبی بود و بحث تمام. هر چه در این بخش پس از او می‌آید، بر همین می‌ایستد.' }"),

 ("{ t: 'h', x: 'The singer' }",
  "{ t: 'h', x: 'The singer', fa: 'خنیاگر' }"),

 ("{ t: 'p', x: 'He was not only a poet. He was a musician, and by every account a great one. He played the chang, the Persian harp, and he sang his own verses. Persian poetry did not begin on a page. It began as a voice with strings under it, in a room, in front of people.' }",
  "{ t: 'p', x: 'He was not only a poet. He was a musician, and by every account a great one. He played the chang, the Persian harp, and he sang his own verses. Persian poetry did not begin on a page. It began as a voice with strings under it, in a room, in front of people.', fa: 'تنها شاعر نبود. نوازنده هم بود، و به گواه همه نوازنده‌ای بزرگ. چنگ می‌نواخت و شعرهای خودش را می‌خواند. شعر فارسی روی کاغذ آغاز نشد؛ با صدایی آغاز شد که سیم‌هایی زیرش بود، در اتاقی، در برابر مردم.' }"),

 ("{ t: 'illumin', x: 'A poem got a king onto a horse without his boots.' }",
  "{ t: 'illumin', x: 'A poem got a king onto a horse without his boots.', fa: 'شعری شاهی را بی‌چکمه بر اسب نشاند.' }"),

 ("{ t: 'illumin', x: 'The first poet of the Persian language used it, at the end, to say that he misses being young.' }",
  "{ t: 'illumin', x: 'The first poet of the Persian language used it, at the end, to say that he misses being young.', fa: 'نخستین شاعر زبان فارسی، در پایان، از آن استفاده کرد تا بگوید دلش برای جوانی‌اش تنگ است.' }"),

 ("{ t: 'illumin', x: 'The first voice in Persian, and we can only hear one word of it in a hundred.' }",
  "{ t: 'illumin', x: 'The first voice in Persian, and we can only hear one word of it in a hundred.', fa: 'نخستین صدای فارسی، و ما از هر صد واژه‌اش تنها یکی را می‌شنویم.' }"),
]

lit_scope.apply("rudaki", PAIRS)
