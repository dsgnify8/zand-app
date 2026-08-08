# -*- coding: utf-8 -*-
# Nizami, final batch: the sting in Haft Peykar, his afterlife, the close.
# نگارگری, فرهاد, مجنون.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'And there is a sting. While Bahram spends his week moving from dome to dome, his kingdom is being ruined by a corrupt minister, and he does not notice. The king perfecting himself through beauty is failing at the only job he has. Nizami lets the reader work that out alone.' }",
  "{ t: 'p', x: 'And there is a sting. While Bahram spends his week moving from dome to dome, his kingdom is being ruined by a corrupt minister, and he does not notice. The king perfecting himself through beauty is failing at the only job he has. Nizami lets the reader work that out alone.', fa: 'و نیشی هم در کار است. در همان هفته‌ای که بهرام از گنبدی به گنبد دیگر می‌رود، وزیری فاسد دارد کشورش را به باد می‌دهد، و او متوجه نیست. شاهی که با زیبایی خودش را کامل می‌کند، در تنها کاری که بر عهده دارد شکست می‌خورد. نظامی می‌گذارد خواننده خودش به این برسد.' }"),

 ("{ t: 'p', x: 'He died in Ganja around 1209, in the city he never left, and is buried there.' }",
  "{ t: 'p', x: 'He died in Ganja around 1209, in the city he never left, and is buried there.', fa: 'حدود سال ۱۲۰۹ میلادی در گنجه درگذشت، در همان شهری که هرگز ترکش نکرد، و همان‌جا به خاک سپرده شد.' }"),

 ("{ t: 'p', x: 'His afterlife is enormous. Every miniature painter for the next six hundred years painted his scenes: Shirin at the pool, Farhad on the mountain, Majnun among the animals, the seven domes. Walk any museum with Persian art and you are looking at Nizami, whether the label says so or not. Poets from Turkey to India rewrote his five poems in their own languages as a test of skill.' }",
  "{ t: 'p', x: 'His afterlife is enormous. Every miniature painter for the next six hundred years painted his scenes: Shirin at the pool, Farhad on the mountain, Majnun among the animals, the seven domes. Walk any museum with Persian art and you are looking at Nizami, whether the label says so or not. Poets from Turkey to India rewrote his five poems in their own languages as a test of skill.', fa: 'آنچه پس از او ماند عظیم است. در ششصد سال بعد، هر نگارگری صحنه‌های او را کشید: شیرین بر لب چشمه، فرهاد بر کوه، مجنون میان جانوران، و آن هفت گنبد. در هر موزه‌ای که هنر ایرانی دارد قدم بزنی، داری نظامی را تماشا می‌کنی، چه روی برچسبش نوشته باشند و چه نه. شاعران، از ترکیه تا هند، پنج منظومهٔ او را به زبان خودشان از نو نوشتند، به‌عنوان محک هنرشان.' }"),

 ("{ t: 'h', x: 'The inventor of the interior' }",
  "{ t: 'h', x: 'The inventor of the interior', fa: 'کاشفِ درون' }"),

 ("{ t: 'p', x: 'Here is the claim for him. Before Nizami, Persian narrative was about what people did. After Nizami, it was about what people felt while doing it. He is the one who turned the camera around.' }",
  "{ t: 'p', x: 'Here is the claim for him. Before Nizami, Persian narrative was about what people did. After Nizami, it was about what people felt while doing it. He is the one who turned the camera around.', fa: 'ادعا دربارهٔ او این است: پیش از نظامی، روایت فارسی دربارهٔ آن بود که آدم‌ها چه کردند. پس از نظامی، دربارهٔ آن شد که حین آن کار چه حسی داشتند. او همان کسی است که دوربین را برگرداند.' }"),

 ("{ t: 'p', x: 'And he gave the language its vocabulary of love. Not the mystical love of Hafez, and not the ethical love of Saadi. The other one. Wanting a specific person, being refused, and what that does to a life. Farhad and Majnun are still the two words Iranians reach for, and both of them are his.' }",
  "{ t: 'p', x: 'And he gave the language its vocabulary of love. Not the mystical love of Hafez, and not the ethical love of Saadi. The other one. Wanting a specific person, being refused, and what that does to a life. Farhad and Majnun are still the two words Iranians reach for, and both of them are his.', fa: 'و واژگانِ عشق را به این زبان داد. نه عشق عارفانهٔ حافظ، و نه عشق اخلاقی سعدی. آن یکی دیگر: خواستنِ یک آدم مشخص، جواب رد شنیدن، و آنچه این بر سر یک زندگی می‌آورد. فرهاد و مجنون هنوز دو واژه‌ای‌اند که ایرانی‌ها سراغشان می‌روند، و هر دو از او است.' }"),

 ("{ t: 'mark', x: 'Hafez taught Iran how to love God. Nizami taught it how to love a person.' }",
  "{ t: 'mark', x: 'Hafez taught Iran how to love God. Nizami taught it how to love a person.', fa: 'حافظ به ایران آموخت چگونه خدا را دوست بدارد. نظامی آموخت چگونه یک آدم را.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Nizami of Ganja, who stayed in one small city, refused the courts, and wrote five poems that gave a civilization its picture of what love is.' }",
  "{ t: 'p', x: 'This has been a glimpse of Nizami of Ganja, who stayed in one small city, refused the courts, and wrote five poems that gave a civilization its picture of what love is.', fa: 'این نگاهی بود کوتاه به نظامی گنجوی؛ که در یک شهر کوچک ماند، دربارها را نپذیرفت، و پنج منظومه سرود که تصویر عشق را به یک تمدن بخشید.' }"),

 ("{ t: 'p', x: 'He made a stonecutter who cut through a mountain and died of a rumour. He made a boy who loved a girl until she was no longer necessary. He made seven domes of seven colours and a king too busy being perfected to notice his kingdom falling. And he wrote all of it while burying, one by one, every woman he loved.' }",
  "{ t: 'p', x: 'He made a stonecutter who cut through a mountain and died of a rumour. He made a boy who loved a girl until she was no longer necessary. He made seven domes of seven colours and a king too busy being perfected to notice his kingdom falling. And he wrote all of it while burying, one by one, every woman he loved.', fa: 'سنگ‌تراشی ساخت که کوه را شکافت و از یک شایعه مرد. پسری ساخت که دختری را چندان دوست داشت تا دیگر به خودش نیازی نماند. هفت گنبد به هفت رنگ ساخت، و شاهی که چنان سرگرم کامل کردن خودش بود که ندید کشورش دارد فرو می‌ریزد. و همهٔ اینها را نوشت، در حالی که یکی‌یکی زنانی را که دوست داشت به خاک می‌سپرد.' }"),
]

lit_scope.apply("nizami", PAIRS)
