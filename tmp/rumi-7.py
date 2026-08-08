# -*- coding: utf-8 -*-
# Rumi, seventh batch: the section on what the English versions removed.
# ایمان و کفر kept as the actual terms, since the whole paragraph turns on
# them. Tone: precise, not aggrieved — the same as the English.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'Rumi was a Muslim jurist. He knew the Quran the way you know your own hands, and the Masnavi is soaked in it, quoting it, arguing with it, building on it in nearly every section. He led prayers. He issued legal rulings. Islam is not the background of his poetry. It is the material.' }",
  "{ t: 'p', x: 'Rumi was a Muslim jurist. He knew the Quran the way you know your own hands, and the Masnavi is soaked in it, quoting it, arguing with it, building on it in nearly every section. He led prayers. He issued legal rulings. Islam is not the background of his poetry. It is the material.', fa: 'مولانا فقیهی مسلمان بود. قرآن را چنان می‌شناخت که تو دست‌های خودت را، و مثنوی از آن اشباع است؛ نقلش می‌کند، با آن بحث می‌کند، و تقریباً در هر بخشی بر آن بنا می‌گذارد. امام جماعت بود. فتوا می‌داد. اسلام پس‌زمینهٔ شعر او نیست؛ مصالح آن است.' }"),

 ("{ t: 'p', x: 'In the popular English versions, most of that is gone. The Quranic citations, the references to the Prophet, the specifically Islamic frame, thinned out or removed, leaving a warm and boundless spiritual figure who could have come from anywhere.' }",
  "{ t: 'p', x: 'In the popular English versions, most of that is gone. The Quranic citations, the references to the Prophet, the specifically Islamic frame, thinned out or removed, leaving a warm and boundless spiritual figure who could have come from anywhere.', fa: 'در نسخه‌های پرطرفدار انگلیسی، بیشتر این‌ها رفته است. ارجاع‌های قرآنی، اشاره‌ها به پیامبر، آن قاب مشخصاً اسلامی، رقیق یا حذف شده‌اند، و چهره‌ای معنوی و گرم و بی‌مرز باقی مانده که می‌توانست اهل هر جایی باشد.' }"),

 ("{ t: 'p', x: 'Look at the swap. Belief and unbelief, iman and kufr, are precise theological terms in Islam, and Rumi is making a bold and specifically religious claim about a place past both of them. In English they became wrongdoing and rightdoing, which is a claim about ethics, which is not what he said at all.' }",
  "{ t: 'p', x: 'Look at the swap. Belief and unbelief, iman and kufr, are precise theological terms in Islam, and Rumi is making a bold and specifically religious claim about a place past both of them. In English they became wrongdoing and rightdoing, which is a claim about ethics, which is not what he said at all.', fa: 'به این جابه‌جایی نگاه کن. ایمان و کفر در اسلام اصطلاحاتی دقیق و کلامی‌اند، و مولانا دارد ادعایی جسورانه و مشخصاً دینی می‌کند دربارهٔ جایی آن‌سوی هر دو. در انگلیسی این‌ها به «بدکرداری» و «نیک‌کرداری» بدل شدند، که ادعایی است اخلاقی، و اصلاً آن چیزی نیست که او گفت.' }"),

 ("{ t: 'mark', x: 'A Muslim scholar saying something daring about faith was turned into a life coach saying something safe about judgement.' }",
  "{ t: 'mark', x: 'A Muslim scholar saying something daring about faith was turned into a life coach saying something safe about judgement.', fa: 'عالمی مسلمان که حرفی جسورانه دربارهٔ ایمان می‌زد، بدل شد به مربی زندگی‌ای که حرفی بی‌خطر دربارهٔ قضاوت کردن می‌زند.' }"),

 ("{ t: 'h', x: 'Holding both' }",
  "{ t: 'h', x: 'Holding both', fa: 'هر دو را با هم نگه داشتن' }"),

 ("{ t: 'p', x: 'The fair verdict is uncomfortable, and it is the same one Khayyam earned. The English Rumi is not the real Rumi. The English Rumi also made the world care, and some of the people it reached went and found the real one.' }",
  "{ t: 'p', x: 'The fair verdict is uncomfortable, and it is the same one Khayyam earned. The English Rumi is not the real Rumi. The English Rumi also made the world care, and some of the people it reached went and found the real one.', fa: 'داوری منصفانه، معذب‌کننده است، و همان داوری‌ای است که دربارهٔ خیام هم گفتیم. آن مولانای انگلیسی، مولانای واقعی نیست. همان مولانای انگلیسی، در عین حال کاری کرد که جهان اهمیت بدهد، و بعضی از کسانی که به آنها رسید، رفتند و مولانای واقعی را پیدا کردند.' }"),

 ("{ t: 'p', x: 'The loss is not that he was made too spiritual. It is that he was made too easy. The real Rumi is harder, funnier, dirtier, more argumentative, and immeasurably stranger than the one on the greeting card, and he is right there, in the Persian, unread.' }",
  "{ t: 'p', x: 'The loss is not that he was made too spiritual. It is that he was made too easy. The real Rumi is harder, funnier, dirtier, more argumentative, and immeasurably stranger than the one on the greeting card, and he is right there, in the Persian, unread.', fa: 'آنچه از دست رفت این نیست که او را زیادی معنوی کردند. این است که زیادی آسانش کردند. مولانای واقعی سخت‌تر است، بامزه‌تر، بی‌پرواتر، جدلی‌تر، و بی‌اندازه غریب‌تر از آن یکی که روی کارت تبریک است؛ و همان‌جاست، در فارسی، نخوانده.' }"),

 ("{ t: 'p', x: 'He died on the seventeenth of December, 1273, in Konya.' }",
  "{ t: 'p', x: 'He died on the seventeenth of December, 1273, in Konya.', fa: 'در هفدهم دسامبر ۱۲۷۳ میلادی، در قونیه، درگذشت.' }"),
]

lit_scope.apply("rumi", PAIRS)
