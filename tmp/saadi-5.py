# -*- coding: utf-8 -*-
# Saadi, final batch: the tomb, his place in the language, and the close.
# سعدیه, حافظیه.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'What travelled was not the beauty, because the prose does not survive translation. It was the ethics. Saadi was the one who made the most sense in a foreign room.' }",
  "{ t: 'p', x: 'What travelled was not the beauty, because the prose does not survive translation. It was the ethics. Saadi was the one who made the most sense in a foreign room.', fa: 'آنچه سفر کرد زیبایی نبود، چون نثر او از ترجمه جان به در نمی‌برد. اخلاقش بود که سفر کرد. سعدی همان کسی بود که در اتاقی بیگانه بیش از همه معنا می‌داد.' }"),

 ("{ t: 'p', x: 'He died in Shiraz, very old, and was buried there. His tomb is called the Saadieh, and it sits a short distance from the Hafezieh, so that the two poets of that city lie almost within sight of one another, the teacher and the mystic, the road and the wine.' }",
  "{ t: 'p', x: 'He died in Shiraz, very old, and was buried there. His tomb is called the Saadieh, and it sits a short distance from the Hafezieh, so that the two poets of that city lie almost within sight of one another, the teacher and the mystic, the road and the wine.', fa: 'در شیراز درگذشت، در کهنسالی، و همان‌جا به خاک سپرده شد. آرامگاهش را سعدیه می‌خوانند، و فاصلهٔ کوتاهی با حافظیه دارد؛ چنان‌که دو شاعر آن شهر تقریباً در دیدرس هم آرمیده‌اند، معلم و عارف، راه و می.' }"),

 ("{ t: 'p', x: 'Hafez was born after Saadi died and grew up reading him. Every Persian poet after Saadi grew up reading him. He is the foundation the others are standing on.' }",
  "{ t: 'p', x: 'Hafez was born after Saadi died and grew up reading him. Every Persian poet after Saadi grew up reading him. He is the foundation the others are standing on.', fa: 'حافظ پس از مرگ سعدی به دنیا آمد و با خواندن او بزرگ شد. هر شاعر ایرانی پس از سعدی با خواندن او بزرگ شد. او همان بنیادی است که بقیه بر آن ایستاده‌اند.' }"),

 ("{ t: 'h', x: 'The poet of the ordinary day' }",
  "{ t: 'h', x: 'The poet of the ordinary day', fa: 'شاعرِ روزِ معمولی' }"),

 ("{ t: 'p', x: 'Here is his real position, and it is unusual. Iranians quote Hafez when they need an answer from beyond. They quote Saadi when they are talking to each other. His lines come out in arguments about money, about neighbours, about ungrateful children and difficult bosses. He is in the language itself now, and most people using him have stopped noticing.' }",
  "{ t: 'p', x: 'Here is his real position, and it is unusual. Iranians quote Hafez when they need an answer from beyond. They quote Saadi when they are talking to each other. His lines come out in arguments about money, about neighbours, about ungrateful children and difficult bosses. He is in the language itself now, and most people using him have stopped noticing.', fa: 'جایگاه واقعی‌اش این است، و جایگاه غریبی است. ایرانی‌ها وقتی پاسخی از آن سو می‌خواهند، حافظ می‌خوانند. وقتی با همدیگر حرف می‌زنند، سعدی نقل می‌کنند. بیت‌هایش وسط بحث بر سر پول درمی‌آید، بر سر همسایه، بر سر بچهٔ ناسپاس و رئیس بداخلاق. او حالا در خودِ زبان است، و بیشتر کسانی که به کارش می‌برند دیگر متوجهش نمی‌شوند.' }"),

 ("{ t: 'p', x: 'That is a rarer immortality than being famous. Ferdowsi saved the language. Hafez became its soul. Saadi became its common sense.' }",
  "{ t: 'p', x: 'That is a rarer immortality than being famous. Ferdowsi saved the language. Hafez became its soul. Saadi became its common sense.', fa: 'این جاودانگی کمیاب‌تری است از نامدار بودن. فردوسی زبان را نجات داد. حافظ جانِ زبان شد. سعدی عقلِ سلیمِ آن شد.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Saadi, who lost his country young, walked the world for thirty years, and came home to a surviving city to write down what he had learned about people.' }",
  "{ t: 'p', x: 'This has been a glimpse of Saadi, who lost his country young, walked the world for thirty years, and came home to a surviving city to write down what he had learned about people.', fa: 'این نگاهی بود کوتاه به سعدی؛ که در جوانی کشورش را از دست داد، سی سال جهان را پیاده پیمود، و به شهری که جان به در برده بود بازگشت تا آنچه دربارهٔ آدم‌ها آموخته بود بنویسد.' }"),

 ("{ t: 'p', x: 'He watched the Mongols end the world he was raised in, and what he took from it was not bitterness. It was a rose garden, a set of stories, and four lines saying that the human race is one body and that anyone who cannot feel the pain of a stranger has something wrong with them.' }",
  "{ t: 'p', x: 'He watched the Mongols end the world he was raised in, and what he took from it was not bitterness. It was a rose garden, a set of stories, and four lines saying that the human race is one body and that anyone who cannot feel the pain of a stranger has something wrong with them.', fa: 'دید که مغول جهانی را که در آن بار آمده بود به پایان رساند، و آنچه از آن برداشت تلخی نبود. یک گلستان بود، مجموعه‌ای از حکایت‌ها، و چهار مصراع که می‌گوید نوع بشر یک پیکر است و هر کس نتواند درد یک غریبه را حس کند، چیزی در او درست کار نمی‌کند.' }"),
]

lit_scope.apply("saadi", PAIRS)
