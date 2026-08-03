# -*- coding: utf-8 -*-
# Hafez: the Timur anecdote and the double meaning. The Persian names the
# things Persian has names for: خال, ساقی, می, رند, محتسب, ایهام.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'There is a story, and it may even be true, that when Timur took Shiraz he summoned Hafez to answer for a famous line, the one offering Samarkand and Bukhara, Timur own cities, for the mole on a beautiful face. How dare you, the conqueror asked, give away my cities for a mole. Hafez, old and poor and standing before the most feared man alive, replied that it was precisely such extravagance that had reduced him to this poverty. Timur laughed, and let him go.' }",
  "{ t: 'p', x: 'There is a story, and it may even be true, that when Timur took Shiraz he summoned Hafez to answer for a famous line, the one offering Samarkand and Bukhara, Timur own cities, for the mole on a beautiful face. How dare you, the conqueror asked, give away my cities for a mole. Hafez, old and poor and standing before the most feared man alive, replied that it was precisely such extravagance that had reduced him to this poverty. Timur laughed, and let him go.', fa: 'حکایتی هست، و شاید راست هم باشد، که چون تیمور شیراز را گرفت حافظ را خواست تا پاسخ آن بیت نامدارش را بدهد؛ همان که سمرقند و بخارا، شهرهای خودِ تیمور، را به خالِ رخساری می‌بخشد. فاتح پرسید: چگونه جرئت می‌کنی شهرهای مرا به یک خال ببخشی؟ حافظ، پیر و تنگدست، ایستاده در برابر هراس‌انگیزترین مرد زنده، پاسخ داد که از همین بخشندگی است که به این تنگدستی افتاده است. تیمور خندید و رهایش کرد.' }"),

 ("{ t: 'p', x: 'To read Hafez is to learn that a line can hold two meanings at once and mean both of them completely. This is the whole art, and it is why he has never been exhausted in six hundred years of reading.' }",
  "{ t: 'p', x: 'To read Hafez is to learn that a line can hold two meanings at once and mean both of them completely. This is the whole art, and it is why he has never been exhausted in six hundred years of reading.', fa: 'حافظ خواندن یعنی آموختن اینکه یک بیت می‌تواند دو معنا را با هم در خود داشته باشد و هر دو را تمام و کمال بخواهد. ایهام، تمامِ هنر همین است، و به همین سبب است که شش قرن خواندن هنوز او را ته نکشیده.' }"),

 ("{ t: 'p', x: 'When he writes of wine, he means wine, and he means the intoxication of the divine. When he writes of the beloved, he means a person, and he means God. When he mocks the hypocrite preacher, he means that preacher, and he means every hollow authority that has ever lived. He never chooses. The choice is left to you, and what you choose reveals you.' }",
  "{ t: 'p', x: 'When he writes of wine, he means wine, and he means the intoxication of the divine. When he writes of the beloved, he means a person, and he means God. When he mocks the hypocrite preacher, he means that preacher, and he means every hollow authority that has ever lived. He never chooses. The choice is left to you, and what you choose reveals you.', fa: 'وقتی از می می‌گوید، هم می را می‌خواهد و هم مستی حق را. وقتی از معشوق می‌گوید، هم آدمی را می‌خواهد و هم خدا را. وقتی واعظ ریاکار را دست می‌اندازد، هم همان واعظ را می‌خواهد و هم هر اقتدار توخالی‌ای که تاکنون بوده. هرگز یکی را برنمی‌گزیند. گزینش را به تو وامی‌گذارد، و آنچه برمی‌گزینی، تو را آشکار می‌کند.' }"),

 ("{ t: 'p', x: 'This was not a game. Hafez lived under rulers who policed piety, and one of them, Mobarez al Din, was so severe that Hafez and his circle called him the police officer. To say the true thing plainly was dangerous. To say it in a way that could always mean something else was survival, and it was art.' }",
  "{ t: 'p', x: 'This was not a game. Hafez lived under rulers who policed piety, and one of them, Mobarez al Din, was so severe that Hafez and his circle called him the police officer. To say the true thing plainly was dangerous. To say it in a way that could always mean something else was survival, and it was art.', fa: 'این بازی نبود. حافظ زیر فرمان حاکمانی می‌زیست که پارسایی را پاس می‌داشتند و بر آن نظارت می‌کردند، و یکی از آنان، امیر مبارزالدین، چنان سختگیر بود که حافظ و یارانش او را محتسب می‌خواندند. حقیقت را آشکارا گفتن خطر داشت. آن را چنان گفتن که همیشه بتواند معنای دیگری هم داشته باشد، هم ماندن بود و هم هنر.' }"),

 ("{ t: 'p', x: 'So the tavern in his poems is the mosque and it is not the mosque. The wine cup is a real cup and it is the whole world. He wrote in a language that authority could not convict, and everyone understood him anyway.' }",
  "{ t: 'p', x: 'So the tavern in his poems is the mosque and it is not the mosque. The wine cup is a real cup and it is the whole world. He wrote in a language that authority could not convict, and everyone understood him anyway.', fa: 'پس خرابات در شعر او هم مسجد است و هم نیست. جام می هم جامی واقعی است و هم تمام جهان. به زبانی نوشت که قدرت نمی‌توانست بر آن حکم ببندد، و با این حال همه می‌فهمیدندش.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
