# -*- coding: utf-8 -*-
# The Seljuk Empire, first batch: the conquest and the vizier.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The Turkic dynasty that ruled a vast Islamic empire from Iran, and under whom Persian culture, art, and learning reached a brilliant new height.',",
  "essence: 'The Turkic dynasty that ruled a vast Islamic empire from Iran, and under whom Persian culture, art, and learning reached a brilliant new height.',\n  essenceFa: 'سلسله‌ای ترک‌تبار که امپراتوری بزرگ اسلامی را از ایران اداره کرد، و در روزگارشان فرهنگ و هنر و دانش ایرانی به بلندای تازه‌ای رسید.',"),

 ("title: 'Horsemen from the Steppe',", "title: 'Horsemen from the Steppe', titleFa: 'سوارکارانی از دشت',"),
 ("title: 'Tughril Beg',", "title: 'Tughril Beg', titleFa: 'طغرل بیک',"),
 ("title: 'The Great Vizier and the Golden Age',", "title: 'The Great Vizier and the Golden Age', titleFa: 'وزیر بزرگ و عصر طلایی',"),
 ("title: 'Nizam al-Mulk',", "title: 'Nizam al-Mulk', titleFa: 'خواجه نظام‌الملک',"),
 ("title: 'The Empire Divides',", "title: 'The Empire Divides', titleFa: 'امپراتوری چندپاره می‌شود',"),

 ("{ t: 'p', x: 'From the wide grasslands of Central Asia came a people of nomadic Turkic horsemen, the Seljuks, named for a chieftain of old. Hardy, warlike, and newly devoted to Islam, they swept south and west into the Iranian world in the eleventh century, and within a single generation had built one of the great empires of the age.' }",
  "{ t: 'p', x: 'From the wide grasslands of Central Asia came a people of nomadic Turkic horsemen, the Seljuks, named for a chieftain of old. Hardy, warlike, and newly devoted to Islam, they swept south and west into the Iranian world in the eleventh century, and within a single generation had built one of the great empires of the age.', fa: 'از علفزارهای پهناور آسیای میانه مردمی آمدند از سوارکاران کوچ‌نشین ترک، سلجوقیان، که نامشان را از سرکرده‌ای کهن گرفته بودند. سرسخت بودند و جنگاور و تازه به اسلام گرویده. در سدهٔ یازدهم رو به جنوب و غرب به جهان ایرانی تاختند، و در فاصلهٔ یک نسل یکی از امپراتوری‌های بزرگ آن روزگار را برپا کردند.' }"),

 ("{ t: 'p', x: 'In 1040 they shattered the armies of the reigning power at the battle of Dandanaqan, and the road into Iran lay open. Under their leader Tughril, they took city after city, until at last Tughril entered Baghdad itself and was named Sultan, protector of the Islamic world.' }",
  "{ t: 'p', x: 'In 1040 they shattered the armies of the reigning power at the battle of Dandanaqan, and the road into Iran lay open. Under their leader Tughril, they took city after city, until at last Tughril entered Baghdad itself and was named Sultan, protector of the Islamic world.', fa: 'در سال ۱۰۴۰ در نبرد دندانقان سپاه قدرت حاکم را در هم شکستند و راه ایران باز شد. به رهبری طغرل، شهر پس از شهر را گرفتند، تا آنکه سرانجام طغرل خود وارد بغداد شد و او را سلطان خواندند؛ نگاهبان جهان اسلام.' }"),

 ("{ t: 'h', x: 'Conquerors who became Persians' }",
  "{ t: 'h', x: 'Conquerors who became Persians', fa: 'فاتحانی که ایرانی شدند' }"),

 ("""{ t: 'p', x: 'Here a pattern repeated that runs through all of Iran\\'s history. The Seljuks came as foreign conquerors, but they were swiftly captivated by the older and more sophisticated Persian civilization they had overrun. They adopted its language of culture, its arts, its ways of government, and its administrators.' }""",
  """{ t: 'p', x: 'Here a pattern repeated that runs through all of Iran\\'s history. The Seljuks came as foreign conquerors, but they were swiftly captivated by the older and more sophisticated Persian civilization they had overrun. They adopted its language of culture, its arts, its ways of government, and its administrators.', fa: 'اینجا الگویی تکرار شد که در سراسر تاریخ ایران جاری است. سلجوقیان چون فاتحانی بیگانه آمدند، اما به‌سرعت شیفتهٔ تمدن ایرانی شدند؛ تمدنی کهن‌تر و پرورده‌تر از آنِ خودشان که بر آن چیره شده بودند. زبان فرهنگی‌اش را پذیرفتند، هنرهایش را، شیوهٔ دیوانداری‌اش را، و دیوانیانش را.' }"""),

 ("{ t: 'markline', x: 'They conquered Iran with the sword, and Iran conquered them with its culture.' }",
  "{ t: 'markline', x: 'They conquered Iran with the sword, and Iran conquered them with its culture.', fa: 'ایران را با شمشیر گرفتند، و ایران آنان را با فرهنگش گرفت.' }"),

 ("{ t: 'p', x: 'The conquerors became patrons of Persian civilization, and under their rule, though the sultans were Turks, the soul of the state was Persian. It was a marriage of the vigour of the steppe and the refinement of Iran, and it produced a golden age.' }",
  "{ t: 'p', x: 'The conquerors became patrons of Persian civilization, and under their rule, though the sultans were Turks, the soul of the state was Persian. It was a marriage of the vigour of the steppe and the refinement of Iran, and it produced a golden age.', fa: 'فاتحان به حامیان تمدن ایرانی بدل شدند، و در روزگار آنان، هرچند سلطان‌ها ترک بودند، جان دولت ایرانی بود. این پیوند نیروی دشت بود با ظرافت ایران، و عصری طلایی از آن زاده شد.' }"),

 ("{ t: 'p', x: 'The true architect of the Seljuk golden age was not a sultan but a Persian statesman, one of the greatest administrators in the history of Iran: Nizam al-Mulk, the great vizier who guided the empire at its height for thirty years.' }",
  "{ t: 'p', x: 'The true architect of the Seljuk golden age was not a sultan but a Persian statesman, one of the greatest administrators in the history of Iran: Nizam al-Mulk, the great vizier who guided the empire at its height for thirty years.', fa: 'معمار راستین عصر طلایی سلجوقی سلطان نبود، بلکه سیاستمداری ایرانی بود؛ یکی از بزرگ‌ترین دیوانسالاران تاریخ ایران: خواجه نظام‌الملک، وزیر بزرگی که سی سال امپراتوری را در اوجش راه برد.' }"),

 ("{ t: 'p', x: 'A master of statecraft, he organized the sprawling empire, built roads and institutions, and wrote a celebrated book on the art of government that was studied for centuries. Above all, he founded a network of great colleges, the Nizamiyya, across the empire, among the finest centers of learning in the world of their day.' }",
  "{ t: 'p', x: 'A master of statecraft, he organized the sprawling empire, built roads and institutions, and wrote a celebrated book on the art of government that was studied for centuries. Above all, he founded a network of great colleges, the Nizamiyya, across the empire, among the finest centers of learning in the world of their day.', fa: 'استادِ کشورداری بود؛ امپراتوری گسترده را سامان داد، راه و نهاد ساخت، و کتابی نامدار در آیین حکومت نوشت، سیاست‌نامه، که قرن‌ها آن را می‌خواندند. از همه مهم‌تر، شبکه‌ای از مدرسه‌های بزرگ را در سراسر امپراتوری بنیان نهاد، نظامیه‌ها، که از بهترین کانون‌های دانش روزگار خود بودند.' }"),
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
