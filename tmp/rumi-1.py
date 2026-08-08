# -*- coding: utf-8 -*-
# Rumi, first batch. مولانا throughout, not Rumi — that is the name Iran
# uses, and a chapter that ends by criticising the West for flattening him
# should itself call him what his own language calls him.
# جلال‌الدین محمد, بلخ, قونیه, روم, عطار نیشابوری.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("essence: 'The best selling poet in America is a thirteenth century Muslim jurist from Balkh who lost his closest friend and turned the grief into forty thousand verses, and signed the greatest of them with the dead man name.'",
  "essence: 'The best selling poet in America is a thirteenth century Muslim jurist from Balkh who lost his closest friend and turned the grief into forty thousand verses, and signed the greatest of them with the dead man name.', essenceFa: 'پرفروش‌ترین شاعر آمریکا، فقیهی مسلمان از بلخ در سدهٔ سیزدهم میلادی است که نزدیک‌ترین دوستش را از دست داد، آن اندوه را به چهل هزار بیت بدل کرد، و بهترینشان را به نام همان مرد مرده امضا کرد.'"),

 ("{ t: 'lead', x: 'He was a respectable man. That is the part people forget.'",
  "{ t: 'lead', x: 'He was a respectable man. That is the part people forget.', fa: 'مردی بود آبرومند و سرشناس. همین بخش است که از یاد می‌رود.'"),

 ("{ t: 'p', x: 'Jalal al Din was born in 1207 in Balkh, in the far east of the Persian world, in what is now Afghanistan. His father was a serious scholar with a serious following. The boy was raised to inherit that, and he did.' }",
  "{ t: 'p', x: 'Jalal al Din was born in 1207 in Balkh, in the far east of the Persian world, in what is now Afghanistan. His father was a serious scholar with a serious following. The boy was raised to inherit that, and he did.', fa: 'جلال‌الدین محمد در سال ۱۲۰۷ میلادی در بلخ به دنیا آمد، در شرقِ دورِ جهان ایرانی، در افغانستانِ امروز. پدرش عالمی جدی بود با پیروانی جدی. پسر را برای به ارث بردن همین بار آوردند، و به ارث هم برد.' }"),

 ("{ t: 'p', x: 'Then the Mongols came. The family left, ahead of the destruction, and never went back. Balkh was erased behind them. Rumi spent his whole life as a man from a city that no longer existed.' }",
  "{ t: 'p', x: 'Then the Mongols came. The family left, ahead of the destruction, and never went back. Balkh was erased behind them. Rumi spent his whole life as a man from a city that no longer existed.', fa: 'بعد مغول‌ها آمدند. خانواده پیش از رسیدن ویرانی راه افتاد و دیگر هرگز بازنگشت. بلخ پشت سرشان از روی زمین پاک شد. مولانا تمام عمرش را مردی گذراند از شهری که دیگر وجود نداشت.' }"),

 ("{ t: 'h', x: 'A prophecy on the road' }",
  "{ t: 'h', x: 'A prophecy on the road', fa: 'پیشگویی‌ای در راه' }"),

 ("{ t: 'p', x: 'They travelled for years. Nishapur, Baghdad, Mecca, Damascus, and finally Konya in Anatolia, deep in the old Byzantine lands, which Persians called Rum. That is where his name comes from. Rumi means simply the one from Rum, the Roman. The most Persian of poets is named after the Roman empire.' }",
  "{ t: 'p', x: 'They travelled for years. Nishapur, Baghdad, Mecca, Damascus, and finally Konya in Anatolia, deep in the old Byzantine lands, which Persians called Rum. That is where his name comes from. Rumi means simply the one from Rum, the Roman. The most Persian of poets is named after the Roman empire.', fa: 'سال‌ها در راه بودند. نیشابور، بغداد، مکه، دمشق، و سرانجام قونیه در آناتولی، در دل سرزمین‌های کهن بیزانس، که ایرانیان آن را روم می‌خواندند. نام رومی از همین‌جا می‌آید و معنایش همین است: اهل روم. ایرانی‌ترین شاعران، نامش را از امپراتوری روم گرفته است.' }"),

 ("{ t: 'p', x: 'And in Nishapur, the story goes, the family met Attar, the old master of Persian mysticism. Attar looked at the boy, gave him a copy of his book, and told the father that his son would one day set the lovers of the world on fire.' }",
  "{ t: 'p', x: 'And in Nishapur, the story goes, the family met Attar, the old master of Persian mysticism. Attar looked at the boy, gave him a copy of his book, and told the father that his son would one day set the lovers of the world on fire.', fa: 'و در نیشابور، چنان‌که حکایت می‌کنند، خانواده با عطار روبه‌رو شد، آن استاد پیر عرفان ایرانی. عطار به پسر نگاه کرد، نسخه‌ای از کتابش را به او داد، و به پدر گفت که این پسر روزی آتش در جان عاشقان جهان خواهد زد.' }"),

 ("{ t: 'aside', x: 'The story may well be later invention. It is also too good to leave out, and Iranians have never left it out.' }",
  "{ t: 'aside', x: 'The story may well be later invention. It is also too good to leave out, and Iranians have never left it out.', fa: 'چه‌بسا این حکایت را بعدها ساخته باشند. در عین حال آن‌قدر خوب است که نشود کنارش گذاشت، و ایرانی‌ها هم هرگز کنارش نگذاشته‌اند.' }"),

 ("{ t: 'h', x: 'The life he was living' }",
  "{ t: 'h', x: 'The life he was living', fa: 'زندگی‌ای که داشت' }"),

 # the Nizami illumin that was still outstanding
 ("{ t: 'illumin', x: 'He wrote, half joking and not joking at all, asking God why a wife must be taken for every poem finished.' }",
  "{ t: 'illumin', x: 'He wrote, half joking and not joking at all, asking God why a wife must be taken for every poem finished.', fa: 'نوشت، نیمه‌شوخی و در عین حال کاملاً جدی، و از خدا پرسید چرا باید بابت هر منظومه‌ای که تمام می‌شود، همسری گرفته شود.' }"),
]

lit_scope.apply("rumi", PAIRS[:-1])
lit_scope.apply("nizami", PAIRS[-1:])
