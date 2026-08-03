# -*- coding: utf-8 -*-
# Modern Iran, chapter six: the streets. کوی دانشگاه, ۱۸ تیر, جنبش سبز,
# کهریزک, گشت ارشاد, ژینا, زن زندگی آزادی. Iranian dates throughout —
# these are events people name by their dates.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'Iranians have gone out into the streets again and again, and each time the pattern has been close to the same: something breaks, it spreads faster than anyone expects, it is put down, and the quiet that follows is mistaken abroad for agreement.' }",
  "{ t: 'p', x: 'Iranians have gone out into the streets again and again, and each time the pattern has been close to the same: something breaks, it spreads faster than anyone expects, it is put down, and the quiet that follows is mistaken abroad for agreement.', fa: 'ایرانی‌ها بارها و بارها به خیابان آمده‌اند، و هر بار الگو تقریباً یکی بوده: چیزی می‌شکند، سریع‌تر از آنچه کسی انتظار دارد گسترده می‌شود، سرکوب می‌شود، و سکوتی که پس از آن می‌آید در بیرون از ایران به حساب رضایت گذاشته می‌شود.' }"),

 ("{ t: 'p', x: 'What follows is not a list of failures. It is a record of people who kept going out knowing exactly what it cost.' }",
  "{ t: 'p', x: 'What follows is not a list of failures. It is a record of people who kept going out knowing exactly what it cost.', fa: 'آنچه در پی می‌آید فهرست شکست‌ها نیست. سند کسانی است که با علم به بهایش، باز هم بیرون آمدند.' }"),

 ("{ t: 'h', x: '1999: the dormitories' }",
  "{ t: 'h', x: '1999: the dormitories', fa: '۱۳۷۸: کوی دانشگاه' }"),

 ("{ t: 'p', x: 'In July 1999 a reformist newspaper was closed and students at the University of Tehran protested. On the night of 9 July, security forces and plain-clothes paramilitaries entered the student dormitories at Kuy-e Daneshgah.' }",
  "{ t: 'p', x: 'In July 1999 a reformist newspaper was closed and students at the University of Tehran protested. On the night of 9 July, security forces and plain-clothes paramilitaries entered the student dormitories at Kuy-e Daneshgah.', fa: 'در تیر ۱۳۷۸ یک روزنامهٔ اصلاح‌طلب توقیف شد و دانشجویان دانشگاه تهران اعتراض کردند. شب ۱۸ تیر، نیروهای امنیتی و لباس‌شخصی‌ها وارد خوابگاه کوی دانشگاه شدند.' }"),

 ("{ t: 'p', x: 'They went room by room. Students were beaten in their beds. Some were thrown from upper-floor windows and balconies. At least one student was killed outright and hundreds were injured, and more than a thousand were arrested in the days that followed. It became the largest unrest since the revolution to that point, and the image of young people being thrown from the windows of their own university stayed with the generation that saw it.' }",
  "{ t: 'p', x: 'They went room by room. Students were beaten in their beds. Some were thrown from upper-floor windows and balconies. At least one student was killed outright and hundreds were injured, and more than a thousand were arrested in the days that followed. It became the largest unrest since the revolution to that point, and the image of young people being thrown from the windows of their own university stayed with the generation that saw it.', fa: 'اتاق به اتاق رفتند. دانشجویان را در تختخوابشان زدند. بعضی را از پنجره و بالکن طبقات بالا به بیرون پرتاب کردند. دست‌کم یک دانشجو همان‌جا کشته شد و صدها نفر زخمی شدند، و در روزهای بعد بیش از هزار نفر بازداشت شدند. این بزرگ‌ترین ناآرامی پس از انقلاب تا آن زمان بود، و تصویر جوان‌هایی که از پنجرهٔ دانشگاه خودشان به بیرون پرت می‌شوند، با نسلی که آن را دید ماند.' }"),

 ("{ t: 'p', x: 'Almost nobody was held responsible. Of the many officers charged, one was convicted, for stealing an electric shaver.' }",
  "{ t: 'p', x: 'Almost nobody was held responsible. Of the many officers charged, one was convicted, for stealing an electric shaver.', fa: 'تقریباً هیچ‌کس پاسخگو نشد. از میان مأموران متعددی که تحت تعقیب قرار گرفتند، تنها یک نفر محکوم شد؛ به جرم دزدیدن یک ریش‌تراش برقی.' }"),

 ("{ t: 'markline', x: 'One conviction, for a shaver. That was the accounting.' }",
  "{ t: 'markline', x: 'One conviction, for a shaver. That was the accounting.', fa: 'یک محکومیت، بابت یک ریش‌تراش. حساب‌وکتاب همین بود.' }"),

 ("{ t: 'h', x: '2009: the Green Movement' }",
  "{ t: 'h', x: '2009: the Green Movement', fa: '۱۳۸۸: جنبش سبز' }"),

 ("{ t: 'p', x: 'The June 2009 presidential election was called for the incumbent within hours of polls closing, by a margin nobody had seen coming and with a speed the counting could not plausibly have allowed. Mir-Hossein Mousavi, the reformist candidate, said the result had been manufactured.' }",
  "{ t: 'p', x: 'The June 2009 presidential election was called for the incumbent within hours of polls closing, by a margin nobody had seen coming and with a speed the counting could not plausibly have allowed. Mir-Hossein Mousavi, the reformist candidate, said the result had been manufactured.', fa: 'نتیجهٔ انتخابات ریاست‌جمهوری خرداد ۱۳۸۸، چند ساعت پس از بسته شدن صندوق‌ها به نفع رئیس‌جمهور وقت اعلام شد؛ با اختلافی که کسی انتظارش را نداشت و با سرعتی که شمارش آرا عملاً اجازه‌اش را نمی‌داد. میرحسین موسوی، نامزد اصلاح‌طلب، گفت این نتیجه ساخته شده است.' }"),

 ("{ t: 'p', x: 'What followed was the largest demonstration Iran had seen since 1979. Millions walked in silence through Tehran, wearing green, carrying a single question written on paper: where is my vote.' }",
  "{ t: 'p', x: 'What followed was the largest demonstration Iran had seen since 1979. Millions walked in silence through Tehran, wearing green, carrying a single question written on paper: where is my vote.', fa: 'آنچه پس از آن آمد، بزرگ‌ترین تظاهراتی بود که ایران از سال ۱۳۵۷ به خود دیده بود. میلیون‌ها نفر در سکوت در تهران راه رفتند، سبزپوش، با یک پرسش که روی کاغذ نوشته بودند.' }"),

 ("{ t: 'p', x: 'The crackdown came within days. Protesters were beaten in the streets and detained in their thousands. At Kahrizak detention centre, prisoners were tortured and several died, and the scandal was severe enough that even parts of the establishment objected.' }",
  "{ t: 'p', x: 'The crackdown came within days. Protesters were beaten in the streets and detained in their thousands. At Kahrizak detention centre, prisoners were tortured and several died, and the scandal was severe enough that even parts of the establishment objected.', fa: 'سرکوب ظرف چند روز رسید. معترضان را در خیابان زدند و هزاران نفر را بازداشت کردند. در بازداشتگاه کهریزک، زندانیان شکنجه شدند و چند نفر جان باختند؛ رسوایی چنان بزرگ بود که حتی بخش‌هایی از خود حاکمیت هم اعتراض کردند.' }"),

 ("{ t: 'p', x: 'On 20 June a young woman named Neda Agha-Soltan, who had stepped out of a car in the heat, was shot in the chest on a Tehran street. Someone filmed her dying. It went around the world within hours and became the image of that summer.' }",
  "{ t: 'p', x: 'On 20 June a young woman named Neda Agha-Soltan, who had stepped out of a car in the heat, was shot in the chest on a Tehran street. Someone filmed her dying. It went around the world within hours and became the image of that summer.', fa: 'در ۳۰ خرداد، دختر جوانی به نام ندا آقاسلطان که از گرما از ماشین پیاده شده بود، در خیابانی در تهران از ناحیهٔ سینه هدف گلوله قرار گرفت. کسی لحظهٔ جان دادنش را فیلم گرفت. ظرف چند ساعت در سراسر جهان پخش شد و به تصویر آن تابستان بدل شد.' }"),

 ("{ t: 'p', x: 'Mousavi and his wife Zahra Rahnavard, along with the other reformist candidate Mehdi Karroubi, were placed under house arrest in 2011. They remained there for more than a decade, never charged and never tried.' }",
  "{ t: 'p', x: 'Mousavi and his wife Zahra Rahnavard, along with the other reformist candidate Mehdi Karroubi, were placed under house arrest in 2011. They remained there for more than a decade, never charged and never tried.', fa: 'موسوی و همسرش زهرا رهنورد، همراه با مهدی کروبی، نامزد اصلاح‌طلب دیگر، در سال ۱۳۸۹ در حصر خانگی قرار گرفتند. بیش از یک دهه در همان حال ماندند، بی‌آنکه اتهامی علیه‌شان مطرح شود یا محاکمه‌ای در کار باشد.' }"),

 ("{ t: 'h', x: '2017 and 2019' }",
  "{ t: 'h', x: '2017 and 2019', fa: 'دی ۹۶ و آبان ۹۸' }"),

 ("{ t: 'p', x: 'The protests of late 2017 began over the price of eggs and spread within days to around a hundred towns, most of them small, provincial, and previously quiet. That was what alarmed people about them: this was not students in the capital, it was working families in places that had always been assumed loyal.' }",
  "{ t: 'p', x: 'The protests of late 2017 began over the price of eggs and spread within days to around a hundred towns, most of them small, provincial, and previously quiet. That was what alarmed people about them: this was not students in the capital, it was working families in places that had always been assumed loyal.', fa: 'اعتراض‌های دی ۹۶ بر سر قیمت تخم‌مرغ شروع شد و ظرف چند روز به حدود صد شهر رسید؛ بیشترشان کوچک، در شهرستان‌ها، و تا آن زمان آرام. همین بود که نگران‌کننده‌اش می‌کرد: این دانشجویان پایتخت نبودند، خانواده‌های کارگری در جاهایی بودند که همیشه وفادار فرض می‌شدند.' }"),

 ("{ t: 'p', x: 'In November 2019 the petrol price was raised overnight without warning and the country came out again. The government shut off the national internet for about a week, and the crackdown happened inside that blackout. Reuters later reported around fifteen hundred dead. It was the first full-scale demonstration of a method that would be used again on a much larger scale.' }",
  "{ t: 'p', x: 'In November 2019 the petrol price was raised overnight without warning and the country came out again. The government shut off the national internet for about a week, and the crackdown happened inside that blackout. Reuters later reported around fifteen hundred dead. It was the first full-scale demonstration of a method that would be used again on a much larger scale.', fa: 'در آبان ۹۸، قیمت بنزین یک‌شبه و بدون اطلاع قبلی بالا رفت و کشور دوباره به خیابان آمد. حکومت اینترنت را حدود یک هفته در سراسر کشور قطع کرد، و سرکوب در دل همان خاموشی انجام شد. رویترز بعدها از حدود هزار و پانصد کشته خبر داد. این نخستین اجرای تمام‌عیار روشی بود که بعدها در ابعادی بسیار بزرگ‌تر تکرار شد.' }"),

 ("{ t: 'h', x: '2022: Woman, Life, Freedom' }",
  "{ t: 'h', x: '2022: Woman, Life, Freedom', fa: '۱۴۰۱: زن، زندگی، آزادی' }"),

 ("{ t: 'p', x: 'On 13 September 2022 a twenty-two year old Kurdish woman named Mahsa Jina Amini was detained in Tehran by the morality police over how she was wearing her hijab. She collapsed in custody and died three days later. Her family said she had been beaten. The authorities said she had a pre-existing condition.' }",
  "{ t: 'p', x: 'On 13 September 2022 a twenty-two year old Kurdish woman named Mahsa Jina Amini was detained in Tehran by the morality police over how she was wearing her hijab. She collapsed in custody and died three days later. Her family said she had been beaten. The authorities said she had a pre-existing condition.', fa: 'در ۲۲ شهریور ۱۴۰۱، دختر کرد بیست و دو ساله‌ای به نام مهسا ژینا امینی در تهران به دست گشت ارشاد و به بهانهٔ نحوهٔ پوشیدن حجابش بازداشت شد. در بازداشت از حال رفت و سه روز بعد درگذشت. خانواده‌اش گفتند کتک خورده است. مقام‌ها گفتند بیماری زمینه‌ای داشته.' }"),

 ("{ t: 'p', x: 'Her funeral in Saqqez became the first protest, and it did not stop there. Within a week it had reached every province in the country.' }",
  "{ t: 'p', x: 'Her funeral in Saqqez became the first protest, and it did not stop there. Within a week it had reached every province in the country.', fa: 'مراسم خاکسپاری‌اش در سقز به نخستین اعتراض بدل شد، و همان‌جا نماند. ظرف یک هفته به همهٔ استان‌های کشور رسید.' }"),

 ("{ t: 'p', x: 'What made it different was who led it. Schoolgirls climbed onto desks and took off their headscarves and filmed it. University students walked out of segregated canteens. Women cut their hair in the street and in public squares. The slogan, Kurdish before it was Persian, was heard everywhere: zan, zendegi, azadi. Woman, life, freedom.' }",
  "{ t: 'p', x: 'What made it different was who led it. Schoolgirls climbed onto desks and took off their headscarves and filmed it. University students walked out of segregated canteens. Women cut their hair in the street and in public squares. The slogan, Kurdish before it was Persian, was heard everywhere: zan, zendegi, azadi. Woman, life, freedom.', fa: 'آنچه این یکی را متفاوت می‌کرد، این بود که چه کسانی پیشاپیشش بودند. دخترهای مدرسه‌ای روی نیمکت‌ها می‌ایستادند، روسری‌شان را برمی‌داشتند و فیلم می‌گرفتند. دانشجویان از سلف‌های تفکیک‌شده بیرون می‌آمدند. زنان در خیابان و در میدان‌های شهر موهایشان را می‌بریدند. آن شعار، که پیش از فارسی کردی بود، همه‌جا شنیده می‌شد: ژن، ژیان، ئازادی؛ زن، زندگی، آزادی.' }"),

 ("{ t: 'p', x: 'It ran for months. Hundreds were killed, including dozens of children. Tens of thousands were arrested. Protesters were blinded by shotgun pellets fired at faces, and Iranian ophthalmologists reported treating hundreds of such injuries. Several young men were executed publicly and quickly, after trials measured in days, and executions of people arrested in 2022 have continued in the years since.' }",
  "{ t: 'p', x: 'It ran for months. Hundreds were killed, including dozens of children. Tens of thousands were arrested. Protesters were blinded by shotgun pellets fired at faces, and Iranian ophthalmologists reported treating hundreds of such injuries. Several young men were executed publicly and quickly, after trials measured in days, and executions of people arrested in 2022 have continued in the years since.', fa: 'ماه‌ها ادامه یافت. صدها نفر کشته شدند، از جمله ده‌ها کودک. ده‌ها هزار نفر بازداشت شدند. معترضان با ساچمه‌ای که به صورتشان شلیک می‌شد نابینا شدند، و چشم‌پزشکان ایرانی از درمان صدها مورد از این آسیب‌ها خبر دادند. چند مرد جوان به‌سرعت و در ملأ عام اعدام شدند، پس از محاکمه‌هایی که چند روز بیشتر طول نکشید، و اعدام کسانی که در ۱۴۰۱ بازداشت شده بودند در سال‌های بعد هم ادامه یافت.' }"),

 ("{ t: 'p', x: 'The protests were suppressed. But something did shift: in the years after, large numbers of women simply stopped covering their hair in public and continued not to, in defiance of a law still on the books. The enforcement of it has never been the same since.' }",
  "{ t: 'p', x: 'The protests were suppressed. But something did shift: in the years after, large numbers of women simply stopped covering their hair in public and continued not to, in defiance of a law still on the books. The enforcement of it has never been the same since.', fa: 'اعتراض‌ها سرکوب شد. اما چیزی جابه‌جا شد: در سال‌های پس از آن، شمار زیادی از زنان به‌سادگی دیگر موهایشان را در ملأ عام نپوشاندند و همین‌طور ادامه دادند، در برابر قانونی که هنوز پابرجاست. اجرای آن قانون از آن روز دیگر مثل سابق نشد.' }"),

 ("{ t: 'pull', x: 'A law can stay written and stop being obeyed. That is its own kind of answer.' }",
  "{ t: 'pull', x: 'A law can stay written and stop being obeyed. That is its own kind of answer.', fa: 'یک قانون می‌تواند نوشته بماند و دیگر اجرا نشود. این هم خودش نوعی پاسخ است.' }"),
]

mi_scope.apply(PAIRS)
