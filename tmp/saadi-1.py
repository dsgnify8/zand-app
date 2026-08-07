# -*- coding: utf-8 -*-
# Saadi, first batch. شیخ اجل, نظامیهٔ بغداد, حکایت.
# The register: a Persian book about a Persian book. Saadi's own prose in
# the Golestan is plain and witty, and the chapter should sound like it.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("essence: 'The traveller of Shiraz who spent thirty years walking the world and came home to write how to live in it. His lines are quoted in Iranian kitchens every day, and one of them hangs in the United Nations.'",
  "essence: 'The traveller of Shiraz who spent thirty years walking the world and came home to write how to live in it. His lines are quoted in Iranian kitchens every day, and one of them hangs in the United Nations.', essenceFa: 'جهانگردِ شیراز که سی سال جهان را پیاده پیمود و بازگشت تا بنویسد چگونه باید در آن زیست. بیت‌هایش هر روز در آشپزخانه‌های ایران نقل می‌شود، و یکی از آنها بر دیوار سازمان ملل است.'"),

 ("{ t: 'lead', x: 'Hafez asked the questions. Saadi answered them.'",
  "{ t: 'lead', x: 'Hafez asked the questions. Saadi answered them.', fa: 'حافظ پرسش‌ها را طرح کرد. سعدی پاسخشان را داد.'"),

 ("{ t: 'p', x: 'They were born in the same city, a century apart, and Iran has kept them both. But they are not the same kind of poet at all. Hafez writes about the soul in love. Saadi writes about how to behave on a Tuesday, among difficult people, when you are tired.' }",
  "{ t: 'p', x: 'They were born in the same city, a century apart, and Iran has kept them both. But they are not the same kind of poet at all. Hafez writes about the soul in love. Saadi writes about how to behave on a Tuesday, among difficult people, when you are tired.', fa: 'در یک شهر زاده شدند، به فاصلهٔ یک قرن، و ایران هر دو را نگاه داشته است. اما اصلاً از یک جنس شاعر نیستند. حافظ از جانِ عاشق می‌نویسد. سعدی می‌نویسد که یک روز عادی، میان آدم‌های دشوار، وقتی خسته‌ای، چطور باید رفتار کنی.' }"),

 ("{ t: 'p', x: 'He was born in Shiraz around 1210, lost his father young, and was sent to Baghdad to study at the Nizamiyya, the finest school in the Islamic world. And then the world he was studying began to end.' }",
  "{ t: 'p', x: 'He was born in Shiraz around 1210, lost his father young, and was sent to Baghdad to study at the Nizamiyya, the finest school in the Islamic world. And then the world he was studying began to end.', fa: 'حدود سال ۱۲۱۰ میلادی در شیراز زاده شد، در کودکی پدرش را از دست داد، و برای تحصیل به نظامیهٔ بغداد فرستاده شد؛ بهترین مدرسهٔ جهان اسلام. و بعد، همان جهانی که داشت درسش را می‌خواند، رو به پایان گذاشت.' }"),

 ("{ t: 'h', x: 'Thirty years of walking' }",
  "{ t: 'h', x: 'Thirty years of walking', fa: 'سی سال راه رفتن' }"),

 ("{ t: 'p', x: 'The Mongols were coming. Saadi left, and did not come back for roughly thirty years. He went to Anatolia, to Syria, to Egypt, to Arabia and the Hejaz, and by some accounts as far as India. He was not travelling for pleasure. He was a man whose country was being destroyed behind him.' }",
  "{ t: 'p', x: 'The Mongols were coming. Saadi left, and did not come back for roughly thirty years. He went to Anatolia, to Syria, to Egypt, to Arabia and the Hejaz, and by some accounts as far as India. He was not travelling for pleasure. He was a man whose country was being destroyed behind him.', fa: 'مغول‌ها داشتند می‌آمدند. سعدی رفت، و نزدیک سی سال بازنگشت. به آناتولی رفت، به شام، به مصر، به عربستان و حجاز، و به روایتی تا هند. برای تفریح سفر نمی‌کرد. مردی بود که پشت سرش کشورش را ویران می‌کردند.' }"),

 ("{ t: 'p', x: 'He preached in mosques, worked, went hungry, and watched. And unlike almost every other great Persian poet, he wrote about ordinary people, because he had spent three decades among them, at their level, with nothing.' }",
  "{ t: 'p', x: 'He preached in mosques, worked, went hungry, and watched. And unlike almost every other great Persian poet, he wrote about ordinary people, because he had spent three decades among them, at their level, with nothing.', fa: 'در مسجدها وعظ کرد، کار کرد، گرسنگی کشید، و نگاه کرد. و برخلاف تقریباً هر شاعر بزرگ دیگر ایران، دربارهٔ مردم عادی نوشت؛ چون سه دهه میان همان‌ها زیسته بود، هم‌سطح خودشان، و بی‌هیچ چیز.' }"),

 ("{ t: 'aside', x: 'He tells us he was captured by Crusaders near Acre and set to digging trenches, until a merchant of Aleppo recognised him and paid his ransom.' }",
  "{ t: 'aside', x: 'He tells us he was captured by Crusaders near Acre and set to digging trenches, until a merchant of Aleppo recognised him and paid his ransom.', fa: 'خودش می‌گوید نزدیک عکا به دست صلیبیان اسیر شد و وادارش کردند خندق بکَنَد، تا آنکه بازرگانی از حلب او را شناخت و بازخریدش کرد.' }"),

 ("{ t: 'p', x: 'Then the merchant offered him his daughter in marriage, and the marriage was miserable. Saadi tells this story about himself, including the part where the wife reminds him he was bought. He is the only one of the great poets who is consistently, deliberately funny about his own humiliations.' }",
  "{ t: 'p', x: 'Then the merchant offered him his daughter in marriage, and the marriage was miserable. Saadi tells this story about himself, including the part where the wife reminds him he was bought. He is the only one of the great poets who is consistently, deliberately funny about his own humiliations.', fa: 'بعد همان بازرگان دخترش را به او داد، و این ازدواج فلاکت‌بار از آب درآمد. سعدی این حکایت را دربارهٔ خودش نقل می‌کند، از جمله آن تکه که زن به یادش می‌آورد خریده شده است. او تنها شاعر بزرگی است که پیوسته و عامدانه دربارهٔ خواری‌های خودش شوخی می‌کند.' }"),
]

lit_scope.apply("saadi", PAIRS)
