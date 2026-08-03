# -*- coding: utf-8 -*-
# Modern Iran, chapter three: the war. خرمشهر/خونین‌شهر, اروندرود, بسیج,
# حلبچه, جانبازان, قطعنامهٔ ۵۹۸, جام زهر.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'On 22 September 1980 Iraq invaded. Saddam Hussein had several reasons, and they reinforced one another.' }",
  "{ t: 'p', x: 'On 22 September 1980 Iraq invaded. Saddam Hussein had several reasons, and they reinforced one another.', fa: 'در ۳۱ شهریور ۱۳۵۹، عراق به ایران حمله کرد. صدام حسین چند دلیل داشت، و این دلایل یکدیگر را تقویت می‌کردند.' }"),

 # the three boxes
 ("{ title: 'The waterway', x: 'The Shatt al-Arab, the Arvand Rud in Persian, is the outlet both countries depend on. A 1975 agreement had divided it down the middle. Saddam wanted the whole of it.' }",
  "{ title: 'The waterway', titleFa: 'آبراه', x: 'The Shatt al-Arab, the Arvand Rud in Persian, is the outlet both countries depend on. A 1975 agreement had divided it down the middle. Saddam wanted the whole of it.', fa: 'اروندرود، راه خروجی‌ای که هر دو کشور به آن وابسته‌اند. قرارداد ۱۹۷۵ آن را از وسط میان دو کشور تقسیم کرده بود. صدام همه‌اش را می‌خواست.' }"),

 ("{ title: 'Fear', x: 'Iraq had a Shia majority ruled by a secular Sunni party. A revolution next door that spoke of exporting itself was an existential worry.' }",
  "{ title: 'Fear', titleFa: 'ترس', x: 'Iraq had a Shia majority ruled by a secular Sunni party. A revolution next door that spoke of exporting itself was an existential worry.', fa: 'عراق اکثریتی شیعه داشت که یک حزب سنیِ غیرمذهبی بر آن حکومت می‌کرد. انقلابی در همسایگی که از صدور خودش حرف می‌زد، نگرانی‌ای بود در حد بقا.' }"),

 ("{ title: 'Opportunity', x: 'Iran had just purged its officer corps, was isolated internationally, and was in open political turmoil. It looked like the easiest moment there would ever be.' }",
  "{ title: 'Opportunity', titleFa: 'فرصت', x: 'Iran had just purged its officer corps, was isolated internationally, and was in open political turmoil. It looked like the easiest moment there would ever be.', fa: 'ایران تازه کادر افسری‌اش را پاکسازی کرده بود، در سطح بین‌المللی منزوی بود، و درگیر آشوب سیاسی آشکار. به نظر می‌رسید آسان‌ترین لحظهٔ ممکن است.' }"),

 ("{ t: 'p', x: 'The calculation was wrong. Instead of fracturing, Iran closed ranks. Khorramshahr fell after brutal street fighting and was retaken in 1982. By that summer Iraqi forces were largely back across the border, and Saddam offered a ceasefire.' }",
  "{ t: 'p', x: 'The calculation was wrong. Instead of fracturing, Iran closed ranks. Khorramshahr fell after brutal street fighting and was retaken in 1982. By that summer Iraqi forces were largely back across the border, and Saddam offered a ceasefire.', fa: 'این حساب غلط از آب درآمد. ایران به جای آنکه از هم بپاشد، صف‌هایش را فشرده کرد. خرمشهر پس از جنگ خیابانی هولناکی سقوط کرد و در خرداد ۱۳۶۱ آزاد شد. تا آن تابستان، نیروهای عراقی تا حد زیادی به آن سوی مرز بازگشته بودند و صدام آتش‌بس پیشنهاد داد.' }"),

 ("{ t: 'p', x: 'Iran refused it, and chose to carry the war into Iraq. That decision extended the war by six years and accounts for the majority of its dead.' }",
  "{ t: 'p', x: 'Iran refused it, and chose to carry the war into Iraq. That decision extended the war by six years and accounts for the majority of its dead.', fa: 'ایران نپذیرفت و تصمیم گرفت جنگ را به داخل خاک عراق ببرد. همین تصمیم جنگ را شش سال دیگر کش داد و بیشتر کشته‌های آن مربوط به همین شش سال است.' }"),

 ("{ t: 'h', x: 'How it was fought' }",
  "{ t: 'h', x: 'How it was fought', fa: 'چگونه جنگیده شد' }"),

 ("{ t: 'p', x: 'Iran had numbers and little equipment; Iraq had equipment and fewer men. Iran fought accordingly, with mass infantry assaults on fortified positions. The Basij, a volunteer militia, supplied much of that infantry, and it included boys of fourteen and fifteen. Some were given plastic keys to wear, said to open the gates of paradise.' }",
  "{ t: 'p', x: 'Iran had numbers and little equipment; Iraq had equipment and fewer men. Iran fought accordingly, with mass infantry assaults on fortified positions. The Basij, a volunteer militia, supplied much of that infantry, and it included boys of fourteen and fifteen. Some were given plastic keys to wear, said to open the gates of paradise.', fa: 'ایران نیرو داشت و تجهیزات کم؛ عراق تجهیزات داشت و نیروی کمتر. ایران متناسب با همین جنگید: حملهٔ گستردهٔ پیاده‌نظام به مواضع مستحکم. بخش بزرگی از این پیاده‌نظام را بسیج تأمین می‌کرد، نیرویی داوطلب، و در میانشان پسرهای چهارده و پانزده ساله هم بودند. به بعضی‌هایشان کلیدهای پلاستیکی می‌دادند که می‌گفتند در بهشت را باز می‌کند.' }"),

 ("{ t: 'p', x: 'Iraq used chemical weapons repeatedly, against Iranian soldiers at the front and against civilians. In March 1988 the Kurdish town of Halabja was attacked with nerve and mustard agents and several thousand of its people died in a day. Tens of thousands of Iranian veterans still live with the effects of gas exposure.' }",
  "{ t: 'p', x: 'Iraq used chemical weapons repeatedly, against Iranian soldiers at the front and against civilians. In March 1988 the Kurdish town of Halabja was attacked with nerve and mustard agents and several thousand of its people died in a day. Tens of thousands of Iranian veterans still live with the effects of gas exposure.', fa: 'عراق بارها از سلاح شیمیایی استفاده کرد؛ هم علیه سربازان ایرانی در جبهه و هم علیه غیرنظامیان. در اسفند ۱۳۶۶، شهر کردنشین حلبچه با گاز اعصاب و خردل بمباران شد و چند هزار نفر از مردمش در یک روز کشته شدند. ده‌ها هزار جانباز ایرانی هنوز با عوارض گاز شیمیایی زندگی می‌کنند.' }"),

 ("{ t: 'p', x: 'Iraq was supplied through the war by the Soviet Union, France, and a number of other states, and received intelligence assistance from the United States. Iran, under embargo, bought what it could wherever it could, including, in one arrangement that became a scandal in Washington, from the United States itself.' }",
  "{ t: 'p', x: 'Iraq was supplied through the war by the Soviet Union, France, and a number of other states, and received intelligence assistance from the United States. Iran, under embargo, bought what it could wherever it could, including, in one arrangement that became a scandal in Washington, from the United States itself.', fa: 'در طول جنگ، شوروی و فرانسه و چند کشور دیگر به عراق تسلیحات رساندند، و آمریکا اطلاعات در اختیارش گذاشت. ایران که زیر تحریم بود، هر چه می‌توانست از هر جا که می‌شد خرید؛ از جمله، در معامله‌ای که در واشینگتن به رسوایی انجامید، از خود آمریکا.' }"),

 ("{ t: 'p', x: 'The war reached the Gulf. Both sides attacked shipping. In July 1988 an American warship shot down an Iranian civilian airliner over the Persian Gulf, killing all two hundred and ninety people aboard. The United States said it had been mistaken for a fighter.' }",
  "{ t: 'p', x: 'The war reached the Gulf. Both sides attacked shipping. In July 1988 an American warship shot down an Iranian civilian airliner over the Persian Gulf, killing all two hundred and ninety people aboard. The United States said it had been mistaken for a fighter.', fa: 'جنگ به خلیج فارس هم رسید. هر دو طرف به کشتی‌ها حمله کردند. در تیر ۱۳۶۷، یک ناو آمریکایی هواپیمای مسافربری ایران را بر فراز خلیج فارس سرنگون کرد و هر دویست و نود سرنشین آن کشته شدند. آمریکا گفت آن را با یک جنگنده اشتباه گرفته است.' }"),

 ("{ t: 'p', x: 'In July 1988 Iran accepted United Nations Resolution 598. Khomeini said that doing so was more deadly to him than drinking poison. The border ended where it had begun.' }",
  "{ t: 'p', x: 'In July 1988 Iran accepted United Nations Resolution 598. Khomeini said that doing so was more deadly to him than drinking poison. The border ended where it had begun.', fa: 'در تیر ۱۳۶۷، ایران قطعنامهٔ ۵۹۸ سازمان ملل را پذیرفت. خمینی گفت پذیرفتنش برای او از سر کشیدن جام زهر کشنده‌تر است. مرز همان‌جا تمام شد که از آن آغاز شده بود.' }"),

 ("{ t: 'h', x: 'What it did to the country' }",
  "{ t: 'h', x: 'What it did to the country', fa: 'با کشور چه کرد' }"),

 ("{ t: 'p', x: 'The border provinces took the worst of it. Khorramshahr, a city of more than a hundred thousand, was fought through street by street and left largely rubble; Iranians called it Khuninshahr afterwards, the city of blood. Abadan, Ahvaz, Dezful and dozens of smaller towns were shelled for years. Whole villages along the frontier were emptied and never rebuilt.' }",
  "{ t: 'p', x: 'The border provinces took the worst of it. Khorramshahr, a city of more than a hundred thousand, was fought through street by street and left largely rubble; Iranians called it Khuninshahr afterwards, the city of blood. Abadan, Ahvaz, Dezful and dozens of smaller towns were shelled for years. Whole villages along the frontier were emptied and never rebuilt.', fa: 'بیشترین آسیب به استان‌های مرزی رسید. خرمشهر، شهری با بیش از صد هزار نفر جمعیت، خیابان به خیابان جنگیده شد و تقریباً به آوار بدل شد؛ ایرانی‌ها از آن پس خونین‌شهر صدایش کردند. آبادان و اهواز و دزفول و ده‌ها شهر کوچک‌تر سال‌ها زیر گلوله‌باران بودند. روستاهای کاملی در امتداد مرز خالی شدند و دیگر هرگز ساخته نشدند.' }"),

 ("{ t: 'p', x: 'Something close to two million people were displaced inside their own country. Many spent years in temporary housing in cities that had no room for them, and a great many never went home at all, because home had been flattened or the land was still mined. Parts of that border remain uncleared today, and people are still injured on it.' }",
  "{ t: 'p', x: 'Something close to two million people were displaced inside their own country. Many spent years in temporary housing in cities that had no room for them, and a great many never went home at all, because home had been flattened or the land was still mined. Parts of that border remain uncleared today, and people are still injured on it.', fa: 'نزدیک دو میلیون نفر در داخل کشور خودشان آواره شدند. خیلی‌ها سال‌ها در مسکن موقت ماندند، در شهرهایی که جا برایشان نداشت، و شمار زیادی هرگز به خانه برنگشتند؛ چون خانه با خاک یکسان شده بود یا زمین هنوز مین داشت. بخش‌هایی از آن مرز تا امروز پاک‌سازی نشده و هنوز مردم روی آن آسیب می‌بینند.' }"),

 ("{ t: 'p', x: 'The economy was reorganised entirely around the war. Oil terminals were bombed and exports collapsed. Rationing came in for bread, meat, petrol and cooking oil, and stayed. Everything not needed for the front stopped being built. The reconstruction that followed took the whole of the next decade and much of the money that might have gone anywhere else.' }",
  "{ t: 'p', x: 'The economy was reorganised entirely around the war. Oil terminals were bombed and exports collapsed. Rationing came in for bread, meat, petrol and cooking oil, and stayed. Everything not needed for the front stopped being built. The reconstruction that followed took the whole of the next decade and much of the money that might have gone anywhere else.', fa: 'اقتصاد یکسره حول جنگ بازآرایی شد. پایانه‌های نفتی بمباران شد و صادرات فرو ریخت. کوپن برای نان و گوشت و بنزین و روغن آمد، و ماند. هر چیزی که جبهه به آن نیاز نداشت، ساختنش متوقف شد. بازسازیِ پس از جنگ تمام دههٔ بعد را گرفت، و بخش بزرگی از پولی را که می‌توانست جای دیگری خرج شود.' }"),

 ("{ t: 'p', x: 'And an entire generation came home injured, or did not come home. Iran still supports hundreds of thousands of war-disabled, including men whose lungs were destroyed by gas in the 1980s and who have been dying of it slowly ever since.' }",
  "{ t: 'p', x: 'And an entire generation came home injured, or did not come home. Iran still supports hundreds of thousands of war-disabled, including men whose lungs were destroyed by gas in the 1980s and who have been dying of it slowly ever since.', fa: 'یک نسل کامل یا زخمی به خانه برگشت، یا اصلاً برنگشت. ایران هنوز از صدها هزار جانباز جنگ نگهداری می‌کند؛ از جمله مردانی که ریه‌شان در دههٔ ۶۰ با گاز شیمیایی از بین رفت و از آن روز تا حالا دارند به‌آرامی از همان می‌میرند.' }"),

 ("{ t: 'h', x: 'The pilots' }",
  "{ t: 'h', x: 'The pilots', fa: 'خلبان‌ها' }"),

 ("{ t: 'p', x: 'When the war began, Iran\\u2019s air force was the one part of its military that could not be improvised. The aircraft were American, the training was American, and the men who could fly them had all been trained under the Shah. Many of them were, at that moment, in prison.' }",
  "{ t: 'p', x: 'When the war began, Iran\\u2019s air force was the one part of its military that could not be improvised. The aircraft were American, the training was American, and the men who could fly them had all been trained under the Shah. Many of them were, at that moment, in prison.', fa: 'وقتی جنگ شروع شد، نیروی هوایی تنها بخشی از ارتش ایران بود که نمی‌شد سرِ هم‌بندی‌اش کرد. هواپیماها آمریکایی بودند، آموزش آمریکایی بود، و کسانی که می‌توانستند این هواپیماها را برانند همه در دورهٔ شاه آموزش دیده بودند. خیلی‌هایشان در همان لحظه در زندان بودند.' }"),

 ("{ t: 'p', x: 'They were released and sent to fly. Iranian pilots flew combat missions in the first weeks of the war that are still studied, including a large strike on Iraqi airbases the day after the invasion. Their skill is not in dispute; it kept Iran in the war during the months when little else could.' }",
  "{ t: 'p', x: 'They were released and sent to fly. Iranian pilots flew combat missions in the first weeks of the war that are still studied, including a large strike on Iraqi airbases the day after the invasion. Their skill is not in dispute; it kept Iran in the war during the months when little else could.', fa: 'آزادشان کردند و فرستادندشان که پرواز کنند. خلبان‌های ایرانی در هفته‌های اول جنگ عملیات‌هایی انجام دادند که هنوز موضوع مطالعه‌اند؛ از جمله حملهٔ بزرگ به پایگاه‌های هوایی عراق، یک روز پس از آغاز حمله. در مهارتشان بحثی نیست؛ همین مهارت بود که در ماه‌هایی که چیز دیگری از دست کسی برنمی‌آمد، ایران را در جنگ نگه داشت.' }"),

 ("{ t: 'markline', x: 'They were let out of prison to fly, and a number of them were returned to it afterwards.' }",
  "{ t: 'markline', x: 'They were let out of prison to fly, and a number of them were returned to it afterwards.', fa: 'از زندان بیرونشان آوردند تا پرواز کنند، و شماری از آنها را بعد دوباره به همان‌جا برگرداندند.' }"),

 ("{ t: 'p', x: 'Some were arrested again during and after the war, on charges of coup plotting or of loyalty to the former government. Some were executed. Others were dismissed and never flew again. The reasoning was that their training and their oath had belonged to another Iran, and that this could not be relied upon whatever they had just done.' }",
  "{ t: 'p', x: 'Some were arrested again during and after the war, on charges of coup plotting or of loyalty to the former government. Some were executed. Others were dismissed and never flew again. The reasoning was that their training and their oath had belonged to another Iran, and that this could not be relied upon whatever they had just done.', fa: 'بعضی‌هایشان در طول جنگ و پس از آن دوباره بازداشت شدند، به اتهام طراحی کودتا یا وفاداری به حکومت پیشین. بعضی اعدام شدند. بعضی دیگر برکنار شدند و دیگر هرگز پرواز نکردند. استدلال این بود که آموزش و سوگندشان به ایرانی دیگر تعلق داشته، و هر کاری هم که همین حالا کرده باشند، نمی‌شود روی آن حساب کرد.' }"),

 ("{ t: 'h', x: 'The summer of 1988' }",
  "{ t: 'h', x: 'The summer of 1988', fa: 'تابستان ۱۳۶۷' }"),

 ("{ t: 'p', x: 'In the months after the ceasefire, prisoners already serving sentences for political offences were brought before panels and asked a short series of questions about their beliefs and loyalties. Those whose answers were judged wrong were executed. It was carried out over a few months, in prisons across the country, and the bodies were buried in unmarked graves.' }",
  "{ t: 'p', x: 'In the months after the ceasefire, prisoners already serving sentences for political offences were brought before panels and asked a short series of questions about their beliefs and loyalties. Those whose answers were judged wrong were executed. It was carried out over a few months, in prisons across the country, and the bodies were buried in unmarked graves.', fa: 'در ماه‌های پس از آتش‌بس، زندانیانی که پیش‌تر به جرم سیاسی محکوم شده بودند و دوران محکومیتشان را می‌گذراندند، مقابل هیئت‌هایی برده شدند و چند پرسش کوتاه دربارهٔ عقاید و وفاداری‌شان از آنها شد. کسانی که پاسخشان نادرست تشخیص داده شد، اعدام شدند. این کار طی چند ماه، در زندان‌های سراسر کشور انجام شد، و پیکرها در گورهای بی‌نشان دفن شدند.' }"),

 ("{ t: 'p', x: 'You can imagine what those panels were. A handful of questions, asked of someone already in a cell, and any wrong answer cost a life. People who had months left of a sentence, who expected to go home, did not.' }",
  "{ t: 'p', x: 'You can imagine what those panels were. A handful of questions, asked of someone already in a cell, and any wrong answer cost a life. People who had months left of a sentence, who expected to go home, did not.', fa: 'می‌شود تصور کرد آن هیئت‌ها چه بودند. چند پرسش، از کسی که همین حالا در سلول است، و هر پاسخ نادرست به قیمت یک جان تمام می‌شد. کسانی که چند ماه از محکومیتشان مانده بود و انتظار داشتند به خانه برگردند، برنگشتند.' }"),

 ("{ t: 'p', x: 'The number has never been established. Human rights organisations have documented thousands of names; some estimates run considerably higher. No official account has ever been published, and no one has been tried for it. Families were not told where the graves were, and many searched for years.' }",
  "{ t: 'p', x: 'The number has never been established. Human rights organisations have documented thousands of names; some estimates run considerably higher. No official account has ever been published, and no one has been tried for it. Families were not told where the graves were, and many searched for years.', fa: 'شمارشان هرگز روشن نشد. سازمان‌های حقوق بشری هزاران نام را مستند کرده‌اند؛ برخی برآوردها بسیار بالاتر می‌رود. هیچ گزارش رسمی‌ای هرگز منتشر نشده و هیچ‌کس به خاطرش محاکمه نشده است. به خانواده‌ها نگفتند گورها کجاست، و خیلی‌ها سال‌ها دنبالش گشتند.' }"),
]

mi_scope.apply(PAIRS)
