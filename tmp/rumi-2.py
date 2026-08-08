# -*- coding: utf-8 -*-
# Rumi, second batch: the respectable life, and the arrival of Shams.
# شمس تبریزی, درویش, فتوا, بایزید بسطامی.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'By his late thirties Rumi was the most respected religious authority in Konya. He taught law. He issued rulings. He preached to crowds. He had hundreds of students and a household and a reputation, and he was, by every account, excellent at all of it.' }",
  "{ t: 'p', x: 'By his late thirties Rumi was the most respected religious authority in Konya. He taught law. He issued rulings. He preached to crowds. He had hundreds of students and a household and a reputation, and he was, by every account, excellent at all of it.', fa: 'تا اواخر دههٔ سی زندگی‌اش، مولانا محترم‌ترین مرجع دینی قونیه بود. فقه درس می‌داد. فتوا می‌داد. برای جمعیت موعظه می‌کرد. صدها شاگرد داشت و خانه‌ای و آبرویی، و به گواه همه، در همهٔ این کارها عالی بود.' }"),

 ("{ t: 'p', x: 'He had written almost no poetry. There was no reason to think he ever would. He was a scholar in a turban, forty years old, at the top of his profession, and his life was finished being decided.' }",
  "{ t: 'p', x: 'He had written almost no poetry. There was no reason to think he ever would. He was a scholar in a turban, forty years old, at the top of his profession, and his life was finished being decided.', fa: 'تقریباً هیچ شعری نگفته بود. دلیلی هم نبود که کسی گمان کند روزی خواهد گفت. عالمی بود با عمامه، چهل ساله، در اوج کارش، و تکلیف زندگی‌اش دیگر روشن شده بود.' }"),

 ("{ t: 'mark', x: 'Everything he is famous for happened after he was forty, and none of it was planned.' }",
  "{ t: 'mark', x: 'Everything he is famous for happened after he was forty, and none of it was planned.', fa: 'هر آنچه او را به آن می‌شناسند پس از چهل سالگی رخ داد، و هیچ‌کدامش برنامه‌ریزی نشده بود.' }"),

 ("{ t: 'p', x: 'In 1244 a wandering dervish came to Konya. His name was Shams e Tabrizi, Shams meaning the sun. He was old, poor, rude, and by every account extraordinarily difficult. He had spent his life looking for someone who could bear his company, and had not found one.' }",
  "{ t: 'p', x: 'In 1244 a wandering dervish came to Konya. His name was Shams e Tabrizi, Shams meaning the sun. He was old, poor, rude, and by every account extraordinarily difficult. He had spent his life looking for someone who could bear his company, and had not found one.', fa: 'در سال ۱۲۴۴ میلادی درویشی دوره‌گرد به قونیه آمد. نامش شمس تبریزی بود، و شمس یعنی خورشید. پیر بود و تنگدست و تندزبان، و به گواه همه به‌شدت سخت‌برخورد. عمرش را صرف جست‌وجوی کسی کرده بود که تاب هم‌نشینی با او را داشته باشد، و پیدایش نکرده بود.' }"),

 ("{ t: 'p', x: 'He found Rumi. Accounts differ on how. The most repeated one has Shams pushing through a crowd to ask the great scholar a question.' }",
  "{ t: 'p', x: 'He found Rumi. Accounts differ on how. The most repeated one has Shams pushing through a crowd to ask the great scholar a question.', fa: 'مولانا را پیدا کرد. در اینکه چگونه، روایت‌ها یکی نیستند. پرتکرارترینشان این است که شمس از میان جمعیت راه باز کرد تا از آن عالم بزرگ پرسشی بپرسد.' }"),

 ("{ t: 'p', x: 'The point being made was that the Prophet had gone so far he knew how far there was left to go, while Bayazid had glimpsed a little and mistaken it for everything. It is a question about the difference between an experience and the truth. It undid a man who had spent forty years being certain.' }",
  "{ t: 'p', x: 'The point being made was that the Prophet had gone so far he knew how far there was left to go, while Bayazid had glimpsed a little and mistaken it for everything. It is a question about the difference between an experience and the truth. It undid a man who had spent forty years being certain.', fa: 'نکته‌ای که مطرح می‌شد این بود که پیامبر چندان پیش رفته بود که می‌دانست چقدر راه مانده است، حال آنکه بایزید تنها اندکی دیده و همان را همه‌چیز پنداشته بود. این پرسشی است دربارهٔ تفاوت میان یک تجربه و خودِ حقیقت. و مردی را که چهل سال یقین داشت، از هم پاشاند.' }"),

 ("{ t: 'h', x: 'What followed' }",
  "{ t: 'h', x: 'What followed', fa: 'آنچه پس از آن آمد' }"),

 ("{ t: 'p', x: 'They went into seclusion together, and for months nobody saw them. Rumi stopped teaching. He stopped issuing rulings. He stopped appearing. The most eminent man in the city vanished into a room with a homeless dervish and did not come out.' }",
  "{ t: 'p', x: 'They went into seclusion together, and for months nobody saw them. Rumi stopped teaching. He stopped issuing rulings. He stopped appearing. The most eminent man in the city vanished into a room with a homeless dervish and did not come out.', fa: 'با هم به خلوت رفتند، و ماه‌ها کسی ندیدشان. مولانا درس دادن را رها کرد. فتوا دادن را رها کرد. دیگر جایی ظاهر نشد. سرشناس‌ترین مرد شهر با درویشی بی‌خانمان در اتاقی ناپدید شد و بیرون نیامد.' }"),
]

lit_scope.apply("rumi", PAIRS)
