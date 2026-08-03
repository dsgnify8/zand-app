# -*- coding: utf-8 -*-
# Modern Iran, chapter nine: where it stands. The closing, and the passage
# for those outside. The last line carries a یلدا echo, which the Persian
# can make explicit in a way the English cannot.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'Life continues, and that is worth saying first, because coverage of Iran consists almost entirely of its worst days. People are working, marrying, studying, arguing about films. Nowruz is laid out on the same cloth it always was. The mountains above Tehran fill on Fridays. The country is not a ruin and its people are not waiting to be pitied.' }",
  "{ t: 'p', x: 'Life continues, and that is worth saying first, because coverage of Iran consists almost entirely of its worst days. People are working, marrying, studying, arguing about films. Nowruz is laid out on the same cloth it always was. The mountains above Tehran fill on Fridays. The country is not a ruin and its people are not waiting to be pitied.', fa: 'زندگی ادامه دارد، و این را باید اول از همه گفت؛ چون آنچه دربارهٔ ایران منتشر می‌شود تقریباً تماماً بدترین روزهایش است. مردم کار می‌کنند، ازدواج می‌کنند، درس می‌خوانند، سر فیلم‌ها بحث می‌کنند. سفرهٔ هفت‌سین روی همان سفره‌ای پهن می‌شود که همیشه بود. جمعه‌ها کوه‌های شمال تهران پر می‌شود. این کشور ویرانه نیست و مردمش منتظر ترحم کسی نیستند.' }"),

 ("{ t: 'p', x: 'But it is hard, and it is hard in the specific way that grinds people down: not drama, but arithmetic. A wage that buys less each month than it did the month before. Electricity that fails in July and gas that fails in January, in a country sitting on some of the largest energy reserves on earth. Aquifers falling, rivers gone, Lake Urmia largely dried. Almost every family with someone abroad and a chair at the table that stays empty at new year.' }",
  "{ t: 'p', x: 'But it is hard, and it is hard in the specific way that grinds people down: not drama, but arithmetic. A wage that buys less each month than it did the month before. Electricity that fails in July and gas that fails in January, in a country sitting on some of the largest energy reserves on earth. Aquifers falling, rivers gone, Lake Urmia largely dried. Almost every family with someone abroad and a chair at the table that stays empty at new year.', fa: 'اما سخت است، و به همان شکل خاصی سخت است که آدم را می‌ساید: نه ماجرا، بلکه حساب و کتاب. دستمزدی که هر ماه کمتر از ماه قبل می‌خرد. برقی که تیر ماه می‌رود و گازی که دی ماه، در کشوری که روی یکی از بزرگ‌ترین ذخایر انرژی جهان نشسته. سفره‌های زیرزمینی آب پایین می‌رود، رودها رفته‌اند، دریاچهٔ ارومیه تا حد زیادی خشک شده. تقریباً هر خانواده‌ای کسی را در خارج دارد و صندلی‌ای سر سفره که سال تحویل خالی می‌ماند.' }"),

 ("{ t: 'p', x: 'And the division does not run between households. It runs through them. There are people certain the system can still be changed from within and people certain it cannot. People who want it gone at any cost and people who watched Iraq and Syria and are frightened of what the cost might be. People who were out in January, people who lost someone in January, and people who did neither and cannot talk about it. These are the same family, at the same dinner.' }",
  "{ t: 'p', x: 'And the division does not run between households. It runs through them. There are people certain the system can still be changed from within and people certain it cannot. People who want it gone at any cost and people who watched Iraq and Syria and are frightened of what the cost might be. People who were out in January, people who lost someone in January, and people who did neither and cannot talk about it. These are the same family, at the same dinner.', fa: 'و این شکاف میان خانه‌ها نیست؛ از وسط خودِ خانه‌ها می‌گذرد. کسانی هستند که مطمئن‌اند این نظام هنوز از درون قابل تغییر است و کسانی که مطمئن‌اند نیست. کسانی که به هر قیمتی رفتنش را می‌خواهند و کسانی که عراق و سوریه را دیده‌اند و از آن قیمت می‌ترسند. کسانی که دی‌ماه در خیابان بودند، کسانی که دی‌ماه عزیزی را از دست دادند، و کسانی که هیچ‌کدام نبودند و نمی‌توانند درباره‌اش حرف بزنند. اینها همه یک خانواده‌اند، سر یک سفره.' }"),

 ("{ t: 'h', x: 'What people want' }",
  "{ t: 'h', x: 'What people want', fa: 'مردم چه می‌خواهند' }"),

 ("{ t: 'p', x: 'If you ask, the answers are not complicated, and they are strikingly consistent across people who agree on nothing else.' }",
  "{ t: 'p', x: 'If you ask, the answers are not complicated, and they are strikingly consistent across people who agree on nothing else.', fa: 'اگر بپرسی، پاسخ‌ها پیچیده نیست، و به‌طرز چشمگیری میان کسانی که بر سر هیچ چیز دیگری توافق ندارند، یکی است.' }"),

 ("{ t: 'p', x: 'An economy that works for the people living in it, where a month of work covers a month of living and savings are still worth something a year later. A government that makes its decisions out of care for the country rather than the need to hold on to it. Leaders chosen by the people, replaced by the people, without anyone having to die to make the point.' }",
  "{ t: 'p', x: 'An economy that works for the people living in it, where a month of work covers a month of living and savings are still worth something a year later. A government that makes its decisions out of care for the country rather than the need to hold on to it. Leaders chosen by the people, replaced by the people, without anyone having to die to make the point.', fa: 'اقتصادی که به کار مردمی بیاید که در آن زندگی می‌کنند؛ جایی که یک ماه کار، خرج یک ماه زندگی را بدهد و پس‌انداز یک سال بعد هنوز ارزشی داشته باشد. حکومتی که تصمیم‌هایش را از سر دلسوزی برای این سرزمین بگیرد، نه از سر نیاز به نگه داشتن قدرت. رهبرانی که مردم انتخابشان کنند و مردم کنارشان بگذارند، بی‌آنکه کسی مجبور باشد برای گفتن این حرف بمیرد.' }"),

 ("{ t: 'p', x: 'Streets where a disagreement can be spoken aloud. Universities where an argument stays an argument. A country you can travel out of and back into freely, that the rest of the world can travel to, and that is known abroad for what it actually is rather than for its government.' }",
  "{ t: 'p', x: 'Streets where a disagreement can be spoken aloud. Universities where an argument stays an argument. A country you can travel out of and back into freely, that the rest of the world can travel to, and that is known abroad for what it actually is rather than for its government.', fa: 'خیابان‌هایی که در آن بشود مخالفت را بلند گفت. دانشگاه‌هایی که در آن بحث، بحث بماند. کشوری که بشود آزادانه از آن بیرون رفت و به آن برگشت، که بقیهٔ جهان بتواند به آن سفر کند، و که در بیرون به خاطر آنچه واقعاً هست شناخته شود، نه به خاطر حکومتش.' }"),

 ("{ t: 'quotebig', x: 'Not a country feared for what it might do. A country visited for what it already is.' }",
  "{ t: 'quotebig', x: 'Not a country feared for what it might do. A country visited for what it already is.', fa: 'نه کشوری که از کاری که ممکن است بکند بترسند. کشوری که به خاطر آنچه همین حالا هست، به دیدنش بیایند.' }"),

 ("{ t: 'p', x: 'There is a generation now that never saw the years before 1979 and has heard about them their whole lives: the pace of it, the confidence, the sense of a country arriving somewhere. They are not nostalgic for a monarchy. They are hungry for the feeling of a country moving forward, because they have only ever been told about it.' }",
  "{ t: 'p', x: 'There is a generation now that never saw the years before 1979 and has heard about them their whole lives: the pace of it, the confidence, the sense of a country arriving somewhere. They are not nostalgic for a monarchy. They are hungry for the feeling of a country moving forward, because they have only ever been told about it.', fa: 'حالا نسلی هست که سال‌های پیش از ۱۳۵۷ را ندیده و تمام عمرش دربارهٔ آن شنیده است: از سرعتش، از اعتمادبه‌نفسش، از این حس که کشوری دارد به جایی می‌رسد. دلتنگ پادشاهی نیستند. تشنهٔ همان حسِ رو به جلو رفتنِ یک کشورند، چون فقط برایشان تعریفش کرده‌اند.' }"),

 ("{ t: 'p', x: 'What comes next is not written, and anyone who says they know is guessing. But Iran has outlasted every empire that ever governed it, and it has done so through people who kept the language, the poetry, the food and the new year going without being asked and without being paid.' }",
  "{ t: 'p', x: 'What comes next is not written, and anyone who says they know is guessing. But Iran has outlasted every empire that ever governed it, and it has done so through people who kept the language, the poetry, the food and the new year going without being asked and without being paid.', fa: 'آنچه در پیش است نوشته نشده، و هر کس بگوید می‌داند، دارد حدس می‌زند. اما ایران از هر امپراتوری‌ای که بر آن حکم رانده عمر بیشتری کرده، و این کار را با مردمی کرده که زبان و شعر و غذا و سال نو را زنده نگه داشتند؛ بی‌آنکه کسی از آنها خواسته باشد و بی‌آنکه پولی بگیرند.' }"),

 ("{ t: 'p', x: 'That is the part of this history with the longest record, and it is the part still running. The year still turns at the equinox. It has turned through worse than this.' }",
  "{ t: 'p', x: 'That is the part of this history with the longest record, and it is the part still running. The year still turns at the equinox. It has turned through worse than this.', fa: 'همین بخش از این تاریخ است که طولانی‌ترین سابقه را دارد، و همین بخش است که هنوز ادامه دارد. سال هنوز سر اعتدال بهاری تحویل می‌شود. از بدتر از این هم گذشته و تحویل شده است.' }"),

 ("{ t: 'h', x: 'And for those watching from outside' }",
  "{ t: 'h', x: 'And for those watching from outside', fa: 'و برای آنها که از دور نگاه می‌کنند' }"),

 ("{ t: 'p', x: 'There are millions of Iranians who are not there, and who have spent these years refreshing a feed at three in the morning, waiting for a message to deliver, calling a number that does not connect. There is very little that can be done from a distance, and knowing that is its own weight.' }",
  "{ t: 'p', x: 'There are millions of Iranians who are not there, and who have spent these years refreshing a feed at three in the morning, waiting for a message to deliver, calling a number that does not connect. There is very little that can be done from a distance, and knowing that is its own weight.', fa: 'میلیون‌ها ایرانی هستند که آنجا نیستند، و این سال‌ها را با تازه کردن صفحه در ساعت سه بامداد گذرانده‌اند، منتظر اینکه یک پیام تحویل داده شود، با شماره‌ای گرفتن که وصل نمی‌شود. از راه دور کار چندانی از کسی برنمی‌آید، و دانستن همین خودش یک بار است.' }"),

 ("{ t: 'p', x: 'A sadness has been woven into ordinary life abroad: you see the footage, you hear the words, and then you go to work, because the world you are standing in has not stopped. Being far away does not spare anyone. It only removes the option of doing anything about it.' }",
  "{ t: 'p', x: 'A sadness has been woven into ordinary life abroad: you see the footage, you hear the words, and then you go to work, because the world you are standing in has not stopped. Being far away does not spare anyone. It only removes the option of doing anything about it.', fa: 'غمی در زندگی روزمرهٔ آدم‌ها در خارج بافته شده است: فیلم‌ها را می‌بینی، حرف‌ها را می‌شنوی، و بعد سر کار می‌روی، چون جهانی که در آن ایستاده‌ای متوقف نشده. دور بودن کسی را معاف نمی‌کند. فقط این امکان را از آدم می‌گیرد که کاری بکند.' }"),

 ("{ t: 'p', x: 'That grief is real and it is shared, and it belongs to the story as much as anything that happened in the street. A country is not only the people standing on its soil.' }",
  "{ t: 'p', x: 'That grief is real and it is shared, and it belongs to the story as much as anything that happened in the street. A country is not only the people standing on its soil.', fa: 'آن اندوه واقعی است و مشترک، و به اندازهٔ هر چیزی که در خیابان گذشت به این روایت تعلق دارد. یک کشور فقط آدم‌هایی نیست که روی خاکش ایستاده‌اند.' }"),

 ("{ t: 'pull', x: 'It is a long country. This is not the longest night it has had.' }",
  "{ t: 'pull', x: 'It is a long country. This is not the longest night it has had.', fa: 'این سرزمین، سرزمینِ درازی است. و این، درازترین شبی نیست که به خود دیده.' }"),
]

mi_scope.apply(PAIRS)
