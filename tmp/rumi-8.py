# -*- coding: utf-8 -*-
# Rumi, final batch: the funeral, شب عروس, and the closing summary of all
# six poets. This is the last prose in the literature section.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'The funeral is the thing to know about him. Christians came. Jews came. Greeks and Armenians and Turks and Persians came, and when they were asked why, the answer that survives is that each of them had found their own prophet in him. The procession took hours to pass.' }",
  "{ t: 'p', x: 'The funeral is the thing to know about him. Christians came. Jews came. Greeks and Armenians and Turks and Persians came, and when they were asked why, the answer that survives is that each of them had found their own prophet in him. The procession took hours to pass.', fa: 'اگر یک چیز دربارهٔ او باید دانست، همان تشییع اوست. مسیحیان آمدند. یهودیان آمدند. یونانی و ارمنی و ترک و ایرانی آمدند، و وقتی پرسیدند چرا، پاسخی که به جا مانده این است که هر کدامشان پیامبر خودش را در او یافته بود. گذشتن آن جمعیت ساعت‌ها طول کشید.' }"),

 ("{ t: 'p', x: 'And he had told them not to mourn. He called the night of his death Shab e Arus, the wedding night, because dying was the reunion, the reed going back to the water. It is still marked in Konya every December, on the anniversary, as a wedding.' }",
  "{ t: 'p', x: 'And he had told them not to mourn. He called the night of his death Shab e Arus, the wedding night, because dying was the reunion, the reed going back to the water. It is still marked in Konya every December, on the anniversary, as a wedding.', fa: 'و به آنان گفته بود سوگواری نکنند. شب مرگش را شب عروس نامید، شب عروسی، چون مردن همان وصال بود؛ بازگشتن نی به آب. هنوز هم هر سال در قونیه، در سالگردش، آن شب را چون یک عروسی برگزار می‌کنند.' }"),

 ("{ t: 'h', x: 'The six of them' }",
  "{ t: 'h', x: 'The six of them', fa: 'آن شش تن' }"),

 ("{ t: 'p', x: 'This is the last of them, so it is worth standing back. Rudaki proved the language could hold poetry. Ferdowsi saved the language itself. Nizami taught it to look inward at love. Saadi taught it how to live among people. Khayyam measured the sky and doubted everything above it. Hafez became its soul.' }",
  "{ t: 'p', x: 'This is the last of them, so it is worth standing back. Rudaki proved the language could hold poetry. Ferdowsi saved the language itself. Nizami taught it to look inward at love. Saadi taught it how to live among people. Khayyam measured the sky and doubted everything above it. Hafez became its soul.', fa: 'این آخرینشان است، پس بد نیست کمی عقب بایستیم. رودکی نشان داد این زبان می‌تواند شعر را در خود نگه دارد. فردوسی خودِ زبان را نجات داد. نظامی به آن آموخت که در عشق به درون نگاه کند. سعدی آموخت چگونه میان مردم زیست. خیام آسمان را اندازه گرفت و به هر چه بالای آن بود شک کرد. حافظ جانِ این زبان شد.' }"),

 ("{ t: 'p', x: 'And Rumi took one man grief at losing one friend and made it the sound of everything that has ever been separated from what it came from.' }",
  "{ t: 'p', x: 'And Rumi took one man grief at losing one friend and made it the sound of everything that has ever been separated from what it came from.', fa: 'و مولانا اندوه یک مرد را در از دست دادن یک دوست برداشت و آن را به آوای هر چیزی بدل کرد که تا به حال از سرچشمه‌اش جدا افتاده است.' }"),

 ("{ t: 'mark', x: 'Six men, four hundred years, one language. No other tongue has a spine like it.' }",
  "{ t: 'mark', x: 'Six men, four hundred years, one language. No other tongue has a spine like it.', fa: 'شش تن، چهارصد سال، یک زبان. هیچ زبان دیگری چنین ستون فقراتی ندارد.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Rumi, the scholar from a city the Mongols erased, who was respectable and certain and forty years old when a rude old dervish walked into his life and took it apart.' }",
  "{ t: 'p', x: 'This has been a glimpse of Rumi, the scholar from a city the Mongols erased, who was respectable and certain and forty years old when a rude old dervish walked into his life and took it apart.', fa: 'این نگاهی بود کوتاه به مولانا؛ عالمی از شهری که مغول‌ها از روی زمین پاکش کردند، که آبرومند بود و مطمئن و چهل ساله، وقتی درویشی پیر و تندزبان وارد زندگی‌اش شد و آن را از هم پاشاند.' }"),

 ("{ t: 'p', x: 'He lost the man. He looked for him in two countries and found him in his own chest instead. And then, for twenty five years, he spoke poems into the air and other people wrote them down, and he signed the best of them with the dead man name, because he did not believe the voice had ever been his.' }",
  "{ t: 'p', x: 'He lost the man. He looked for him in two countries and found him in his own chest instead. And then, for twenty five years, he spoke poems into the air and other people wrote them down, and he signed the best of them with the dead man name, because he did not believe the voice had ever been his.', fa: 'آن مرد را از دست داد. در دو کشور دنبالش گشت و به جایش او را در سینهٔ خودش یافت. و بعد، بیست و پنج سال، شعر را در هوا گفت و دیگران نوشتندش، و بهترینشان را به نام همان مرد مرده امضا کرد؛ چون باور نداشت که آن صدا هرگز از آنِ خودش بوده باشد.' }"),

 ("{ t: 'p', x: 'He said we are all reeds, cut from the bed, and that every sound we make is about the water. He would say it about this too.' }",
  "{ t: 'p', x: 'He said we are all reeds, cut from the bed, and that every sound we make is about the water. He would say it about this too.', fa: 'گفت همهٔ ما نی هستیم، بریده از نیستان، و هر صدایی که از ما برمی‌آید دربارهٔ آب است. دربارهٔ همین هم همین را می‌گفت.' }"),
]

lit_scope.apply("rumi", PAIRS)
