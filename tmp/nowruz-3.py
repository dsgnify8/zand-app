# -*- coding: utf-8 -*-
# Nowruz, third batch: امشاسپندان, and سال تحویل itself.
# The money in the Quran or the Hafez is عیدی — the Persian names it.

p = "constants/nowruz.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Nobody knows for certain, which is worth saying plainly. The likeliest answer is the Amesha Spenta, the seven holy immortals of Zoroastrianism, the aspects of the divine that hold up the world. Seven has been sacred here for a very long time, and the letter is probably the later excuse for a number that was already fixed.' }",
  "{ t: 'p', x: 'Nobody knows for certain, which is worth saying plainly. The likeliest answer is the Amesha Spenta, the seven holy immortals of Zoroastrianism, the aspects of the divine that hold up the world. Seven has been sacred here for a very long time, and the letter is probably the later excuse for a number that was already fixed.', fa: 'هیچ‌کس به‌یقین نمی‌داند، و بهتر است همین را ساده بگوییم. محتمل‌ترین پاسخ امشاسپندان است؛ همان هفت جاودانِ مقدس در آیین زرتشتی، جلوه‌هایی از ایزد که جهان را بر پا نگه می‌دارند. عدد هفت مدت‌هاست در این سرزمین مقدس بوده، و حرف «س» احتمالاً بهانه‌ای است که بعدها برای عددی تراشیده شد که از پیش ثابت بود.' }"),

 ("{ t: 'h', x: 'And the guests' }",
  "{ t: 'h', x: 'And the guests', fa: 'و مهمان‌های سفره' }"),

 ("{ t: 'p', x: 'Everything else is optional and everyone brings it anyway.' }",
  "{ t: 'p', x: 'Everything else is optional and everyone brings it anyway.', fa: 'باقی‌اش اختیاری است، و همه هم می‌آورندش.' }"),

 ("{ t: 'p', x: 'Here is what happens at the second itself, and it is the same in almost every Iranian house on earth.' }",
  "{ t: 'p', x: 'Here is what happens at the second itself, and it is the same in almost every Iranian house on earth.', fa: 'و اما در خودِ آن ثانیه چه می‌گذرد؛ و تقریباً در هر خانهٔ ایرانی روی این زمین یکسان است.' }"),

 ("{ t: 'p', x: 'Everyone is at the table. Everyone is in something new, because you wear new clothes for it. The television is on with the countdown, or someone has the radio, or now a phone. Nobody is speaking much.' }",
  "{ t: 'p', x: 'Everyone is at the table. Everyone is in something new, because you wear new clothes for it. The television is on with the countdown, or someone has the radio, or now a phone. Nobody is speaking much.', fa: 'همه سر سفره‌اند. همه چیزی نو پوشیده‌اند، چون برای سال تحویل لباس نو می‌پوشند. تلویزیون روشن است و شمارش معکوس را نشان می‌دهد، یا یکی رادیو گرفته، یا این روزها گوشی. کسی زیاد حرف نمی‌زند.' }"),

 ("{ t: 'p', x: 'And then the cannon goes, or the announcer says it, and the year has turned. And in that instant the room detonates. Everyone kisses everyone. The eldest gives out money, crisp notes kept in the Quran or the Hafez all year for exactly this. Somebody is crying and pretending not to.' }",
  "{ t: 'p', x: 'And then the cannon goes, or the announcer says it, and the year has turned. And in that instant the room detonates. Everyone kisses everyone. The eldest gives out money, crisp notes kept in the Quran or the Hafez all year for exactly this. Somebody is crying and pretending not to.', fa: 'و بعد توپ در می‌رود، یا گوینده می‌گوید، و سال تحویل شده است. و در همان لحظه اتاق منفجر می‌شود. همه همدیگر را می‌بوسند. بزرگ‌تر عیدی می‌دهد؛ اسکناس‌های نو و تانخورده که تمام سال لای قرآن یا لای دیوان حافظ مانده‌اند، دقیقاً برای همین لحظه. یکی دارد گریه می‌کند و وانمود می‌کند که نمی‌کند.' }"),

 ("{ t: 'mark', x: 'It happens at three in the afternoon or at four in the morning. The sun does not care, and neither does anyone at the table.' }",
  "{ t: 'mark', x: 'It happens at three in the afternoon or at four in the morning. The sun does not care, and neither does anyone at the table.', fa: 'ممکن است ساعت سه بعدازظهر باشد یا چهار صبح. خورشید اهمیتی نمی‌دهد، و هیچ‌کس سر آن سفره هم نمی‌دهد.' }"),

 ("{ t: 'p', x: 'That last part matters. Because the moment is astronomical, Nowruz arrives whenever it arrives. Families set alarms for the middle of the night and wake the children and sit at the table at four in the morning in their new clothes, because you do not miss it.' }",
  "{ t: 'p', x: 'That last part matters. Because the moment is astronomical, Nowruz arrives whenever it arrives. Families set alarms for the middle of the night and wake the children and sit at the table at four in the morning in their new clothes, because you do not miss it.', fa: 'همین نکتهٔ آخر مهم است. چون آن لحظه نجومی است، نوروز هر وقت که برسد می‌رسد. خانواده‌ها برای نیمه‌شب ساعت کوک می‌کنند، بچه‌ها را بیدار می‌کنند، و ساعت چهار صبح با لباس نو سر سفره می‌نشینند؛ چون سال تحویل را از دست نمی‌دهند.' }"),

 ("{ t: 'h', x: 'And then the book' }",
  "{ t: 'h', x: 'And then the book', fa: 'و بعد، آن کتاب' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:60])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
