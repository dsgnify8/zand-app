# -*- coding: utf-8 -*-
# Khayyam, final batch: the theft-or-gift question, the blossoms on his
# grave, and the close. نظامی عروضی, آرامگاه نیشابور.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'h', x: 'Was it a theft or a gift' }",
  "{ t: 'h', x: 'Was it a theft or a gift', fa: 'دزدی بود یا هدیه' }"),

 ("{ t: 'p', x: 'Both, honestly, and it is worth holding both. FitzGerald misrepresented him. He also made a genuinely great English poem, and he made the world care about a Persian name at a moment when the West cared about very little east of Athens. Iranians tend to feel the two things at once, and that is the correct response.' }",
  "{ t: 'p', x: 'Both, honestly, and it is worth holding both. FitzGerald misrepresented him. He also made a genuinely great English poem, and he made the world care about a Persian name at a moment when the West cared about very little east of Athens. Iranians tend to feel the two things at once, and that is the correct response.', fa: 'راستش، هر دو؛ و ارزشش را دارد که هر دو را با هم نگه داریم. فیتزجرالد او را وارونه نشان داد. در عین حال شعری انگلیسی و به‌راستی بزرگ ساخت، و در روزگاری که غرب به شرقِ آتن تقریباً هیچ اعتنایی نداشت، کاری کرد که جهان به یک نام ایرانی اهمیت بدهد. ایرانی‌ها معمولاً هر دو حس را همزمان دارند، و همین پاسخ درست است.' }"),

 ("{ t: 'p', x: 'The strange result is that the Khayyam the world loves is a collaboration between an eleventh century Iranian mathematician and a nineteenth century Suffolk bachelor, and neither of them could have made him alone.' }",
  "{ t: 'p', x: 'The strange result is that the Khayyam the world loves is a collaboration between an eleventh century Iranian mathematician and a nineteenth century Suffolk bachelor, and neither of them could have made him alone.', fa: 'نتیجهٔ غریبش این است که آن خیامی که جهان دوستش دارد، حاصل همکاری یک ریاضی‌دان ایرانی سدهٔ پنجم هجری است با یک مرد مجرد اهل سافکِ سدهٔ نوزدهم، و هیچ‌یک از آن دو به‌تنهایی نمی‌توانست بسازدش.' }"),

 ("{ t: 'p', x: 'There is a story, and unusually for such stories it comes from someone who knew him. Nizami Aruzi wrote that Khayyam once said his grave would lie in a place where the north wind would scatter blossoms over it.' }",
  "{ t: 'p', x: 'There is a story, and unusually for such stories it comes from someone who knew him. Nizami Aruzi wrote that Khayyam once said his grave would lie in a place where the north wind would scatter blossoms over it.', fa: 'حکایتی هست، و برخلاف بیشتر چنین حکایت‌ها، از کسی نقل شده که خودش او را می‌شناخته. نظامی عروضی نوشته که خیام روزی گفت گورش جایی خواهد بود که باد شمال بر آن شکوفه بریزد.' }"),

 ("{ t: 'p', x: 'Years after Khayyam died, Aruzi went to Neyshabur and found the tomb. It sat at the foot of a garden wall, and pear and peach trees leaned over that wall, and the ground was so buried in fallen blossom that the grave was hidden beneath it. He wrote that he wept.' }",
  "{ t: 'p', x: 'Years after Khayyam died, Aruzi went to Neyshabur and found the tomb. It sat at the foot of a garden wall, and pear and peach trees leaned over that wall, and the ground was so buried in fallen blossom that the grave was hidden beneath it. He wrote that he wept.', fa: 'سال‌ها پس از مرگ خیام، عروضی به نیشابور رفت و گور را یافت. پای دیوار باغی بود، و درختان امرود و هلو بر آن دیوار خم شده بودند، و زمین چنان زیر شکوفهٔ ریخته پنهان شده بود که گور در آن گم بود. نوشت که گریست.' }"),

 ("{ t: 'h', x: 'The double injustice' }",
  "{ t: 'h', x: 'The double injustice', fa: 'بی‌انصافیِ دوسویه' }"),

 ("{ t: 'p', x: 'Here is where he sits, and it is a strange seat. In the West he is a famous poet and an unknown scientist. In Iran he is respected as a scientist and argued about as a poet. Almost nobody, anywhere, holds both halves at once.' }",
  "{ t: 'p', x: 'Here is where he sits, and it is a strange seat. In the West he is a famous poet and an unknown scientist. In Iran he is respected as a scientist and argued about as a poet. Almost nobody, anywhere, holds both halves at once.', fa: 'جایگاهش این است، و جایگاه غریبی است. در غرب شاعری نامدار است و دانشمندی ناشناخته. در ایران به‌عنوان دانشمند محترم است و به‌عنوان شاعر محل بحث. تقریباً هیچ‌کس، هیچ‌جا، هر دو نیمه را با هم نگه نمی‌دارد.' }"),

 ("{ t: 'p', x: 'The full man is better than either half. He measured the year to six decimal places with brass instruments. He solved cubic equations by drawing them. He built the calendar Iran still lives by. And in his private hours he wrote four line poems saying that none of it can tell you what happens next, so pour the wine.' }",
  "{ t: 'p', x: 'The full man is better than either half. He measured the year to six decimal places with brass instruments. He solved cubic equations by drawing them. He built the calendar Iran still lives by. And in his private hours he wrote four line poems saying that none of it can tell you what happens next, so pour the wine.', fa: 'آن مردِ تمام، از هر دو نیمه‌اش بهتر است. طول سال را با ابزارهای برنجی تا شش رقم اعشار اندازه گرفت. معادلات درجهٔ سوم را با کشیدنشان حل کرد. تقویمی ساخت که ایران هنوز با آن زندگی می‌کند. و در ساعت‌های خلوتش رباعی‌هایی نوشت که می‌گویند هیچ‌کدام از اینها نمی‌تواند بگوید بعد چه می‌شود، پس می را بریز.' }"),

 ("{ t: 'p', x: 'That is not a contradiction. It is the same man. Precision about what can be measured, and honesty about what cannot. The quatrains are what a scientist writes when the instruments run out.' }",
  "{ t: 'p', x: 'That is not a contradiction. It is the same man. Precision about what can be measured, and honesty about what cannot. The quatrains are what a scientist writes when the instruments run out.', fa: 'این تناقض نیست. همان یک مرد است. دقت در آنچه اندازه‌پذیر است، و صداقت در آنچه نیست. رباعی‌ها همان چیزی است که یک دانشمند می‌نویسد وقتی ابزارهایش به آخر می‌رسند.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Omar Khayyam, the tentmaker son of Neyshabur, who was asked to fix a calendar and fixed it so well that it is still running, and who is loved around the world for a book he did not quite write.' }",
  "{ t: 'p', x: 'This has been a glimpse of Omar Khayyam, the tentmaker son of Neyshabur, who was asked to fix a calendar and fixed it so well that it is still running, and who is loved around the world for a book he did not quite write.', fa: 'این نگاهی بود کوتاه به عمر خیام؛ پسرِ خیمه‌دوزِ نیشابور، که از او خواستند تقویمی را درست کند و چنان درستش کرد که هنوز کار می‌کند، و که در سراسر جهان به سبب کتابی دوستش دارند که دقیقاً از او نبود.' }"),

 ("{ t: 'p', x: 'Every Nowruz, at the exact second the sun crosses the equator, an entire country checks the clock. That instant is his. It is the most widely used and least credited piece of Persian science on earth, and it happens once a year, in every Iranian home, forever.' }",
  "{ t: 'p', x: 'Every Nowruz, at the exact second the sun crosses the equator, an entire country checks the clock. That instant is his. It is the most widely used and least credited piece of Persian science on earth, and it happens once a year, in every Iranian home, forever.', fa: 'هر نوروز، در همان ثانیه‌ای که خورشید از استوا می‌گذرد، یک کشور تمام چشم به ساعت می‌دوزد. آن لحظه از آنِ اوست. پرکاربردترین و کم‌قدرشناسی‌شده‌ترین دستاورد علم ایرانی روی زمین است، و سالی یک بار رخ می‌دهد، در هر خانهٔ ایرانی، تا همیشه.' }"),
]

lit_scope.apply("khayyam", PAIRS)
