# -*- coding: utf-8 -*-
# The Qajar dynasty, first batch: the founding, Tehran, and the two empires.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The dynasty that ruled Iran through a long and difficult century, caught between the great powers, until the ground was laid for a new age.',",
  "essence: 'The dynasty that ruled Iran through a long and difficult century, caught between the great powers, until the ground was laid for a new age.',\n  essenceFa: 'سلسله‌ای که ایران را در قرنی دراز و دشوار اداره کرد، گرفتار میان قدرت‌های بزرگ، تا آنکه زمین برای روزگاری تازه آماده شد.',"),

 ("title: 'A New Dynasty from the North',", "title: 'A New Dynasty from the North', titleFa: 'سلسله‌ای تازه از شمال',"),
 ("title: 'The founder',", "title: 'The founder', titleFa: 'بنیان‌گذار',"),
 ("title: 'Caught Between Empires',", "title: 'Caught Between Empires', titleFa: 'گرفتار میان دو امپراتوری',"),
 ("title: 'The Reformer Who Was Lost',", "title: 'The Reformer Who Was Lost', titleFa: 'اصلاحگری که از دست رفت',"),
 ("title: 'Amir Kabir',", "title: 'Amir Kabir', titleFa: 'امیرکبیر',"),
 ("title: 'His vision',", "title: 'His vision', titleFa: 'آنچه در سر داشت',"),
 ("title: 'His enemies',", "title: 'His enemies', titleFa: 'دشمنانش',"),
 ("title: 'The Awakening of a Nation',", "title: 'The Awakening of a Nation', titleFa: 'بیداری یک ملت',"),
 ("title: 'The End of an Age',", "title: 'The End of an Age', titleFa: 'پایان یک دوران',"),

 ("{ t: 'p', x: 'After the gentle Zand dynasty fell, a harder power rose to take its place. Agha Mohammad Khan, chief of the Qajar tribe of the north, fought his way to mastery over Iran and had himself crowned Shah in the last years of the eighteenth century.' }",
  "{ t: 'p', x: 'After the gentle Zand dynasty fell, a harder power rose to take its place. Agha Mohammad Khan, chief of the Qajar tribe of the north, fought his way to mastery over Iran and had himself crowned Shah in the last years of the eighteenth century.', fa: 'پس از فروپاشی سلسلهٔ مهربان زند، قدرتی سخت‌تر جایش را گرفت. آقامحمدخان، سرکردهٔ ایل قاجار در شمال، با جنگ راه خود را تا فرمانروایی بر ایران باز کرد و در واپسین سال‌های سدهٔ هجدهم تاج بر سر گذاشت.' }"),

 ("{ t: 'p', x: 'He was a ruler of iron will and, by all accounts, fearsome cruelty, forged in a lifetime of struggle and captivity. But he reunited a country that had again fallen into division, and he founded a dynasty that would rule Iran for well over a century.' }",
  "{ t: 'p', x: 'He was a ruler of iron will and, by all accounts, fearsome cruelty, forged in a lifetime of struggle and captivity. But he reunited a country that had again fallen into division, and he founded a dynasty that would rule Iran for well over a century.', fa: 'فرمانروایی بود با ارادهٔ آهنین و، به گواه همهٔ روایت‌ها، بی‌رحمی‌ای هولناک؛ کسی که عمری کشمکش و اسارت او را چنین ساخته بود. اما کشوری را که دوباره به تفرقه افتاده بود یکپارچه کرد، و سلسله‌ای بنیان نهاد که بیش از یک قرن بر ایران فرمان راند.' }"),

 ("{ t: 'h', x: 'A capital named Tehran' }",
  "{ t: 'h', x: 'A capital named Tehran', fa: 'پایتختی به نام تهران' }"),

 ("{ t: 'p', x: 'It was the Qajars who chose as their capital a modest town in the north of Iran, one that would grow, over their long rule and the ages after, into the great metropolis of the nation. That town was Tehran, and it has been the heart of Iran ever since.' }",
  "{ t: 'p', x: 'It was the Qajars who chose as their capital a modest town in the north of Iran, one that would grow, over their long rule and the ages after, into the great metropolis of the nation. That town was Tehran, and it has been the heart of Iran ever since.', fa: 'این قاجارها بودند که شهرکی ساده در شمال ایران را پایتخت خود کردند؛ شهرکی که در طول فرمانروایی بلندشان و روزگاران پس از آن، به کلان‌شهر بزرگ این کشور بدل شد. آن شهرک تهران بود، و از آن روز تا امروز قلب ایران مانده است.' }"),

 ("{ t: 'markline', x: 'Under the Qajars, Tehran became the capital it remains to this day.' }",
  "{ t: 'markline', x: 'Under the Qajars, Tehran became the capital it remains to this day.', fa: 'در روزگار قاجار، تهران پایتخت شد و تا امروز مانده است.' }"),

 ("{ t: 'p', x: 'The crown passed to Fath Ali Shah, whose long reign was famous for its splendour and ceremony, its jewelled court and its portraits of a bearded king in golden robes. But beyond the glitter of the court, storm clouds were gathering on the horizon.' }",
  "{ t: 'p', x: 'The crown passed to Fath Ali Shah, whose long reign was famous for its splendour and ceremony, its jewelled court and its portraits of a bearded king in golden robes. But beyond the glitter of the court, storm clouds were gathering on the horizon.', fa: 'تاج به فتحعلی‌شاه رسید، که سلطنت بلندش به شکوه و تشریفات نامدار بود؛ به درباری پر از جواهر و به آن نگاره‌های شاهی ریش‌بلند در جامهٔ زرین. اما آن‌سوی درخشش دربار، ابرهای توفان بر افق گرد می‌آمدند.' }"),

 ("{ t: 'p', x: 'The nineteenth century was the age of the great European empires, and Iran found itself caught between two of the hungriest. To the north loomed the vast and expanding empire of Russia. To the east and south stretched the power of the British, masters of India.' }",
  "{ t: 'p', x: 'The nineteenth century was the age of the great European empires, and Iran found itself caught between two of the hungriest. To the north loomed the vast and expanding empire of Russia. To the east and south stretched the power of the British, masters of India.', fa: 'سدهٔ نوزدهم روزگار امپراتوری‌های بزرگ اروپایی بود، و ایران خود را گرفتار میان دو تا از گرسنه‌ترینشان یافت. در شمال، امپراتوری پهناور و روبه‌گسترش روسیه سایه انداخته بود. در شرق و جنوب، قدرت بریتانیا کشیده شده بود؛ اربابان هند.' }"),
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
