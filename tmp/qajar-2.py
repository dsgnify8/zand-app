# -*- coding: utf-8 -*-
# The Qajar dynasty, second batch: the Russian wars, Turkmenchay, Amir Kabir.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Between these two giants, Iran was squeezed, courted, and pressured, its fate bound up in a great game of empires that it had not the strength to control. It was a hard and humbling position for a proud and ancient nation.' }",
  "{ t: 'p', x: 'Between these two giants, Iran was squeezed, courted, and pressured, its fate bound up in a great game of empires that it had not the strength to control. It was a hard and humbling position for a proud and ancient nation.', fa: 'ایران میان این دو غول فشرده شد، وعده شنید و زیر فشار رفت؛ سرنوشتش گره خورده بود به بازی بزرگ امپراتوری‌ها، بازی‌ای که توان مهارش را نداشت. برای ملتی سربلند و کهن، جایگاهی بود سخت و خفت‌بار.' }"),

 ("{ t: 'h', x: 'The wars with Russia' }",
  "{ t: 'h', x: 'The wars with Russia', fa: 'جنگ‌های ایران و روس' }"),

 ("{ t: 'p', x: 'Twice in the early century Iran went to war with Russia over the lands of the Caucasus, and twice it was defeated by the superior arms and organization of the Russian armies. The cost of those defeats was severe, and it was paid in Iranian soil.' }",
  "{ t: 'p', x: 'Twice in the early century Iran went to war with Russia over the lands of the Caucasus, and twice it was defeated by the superior arms and organization of the Russian armies. The cost of those defeats was severe, and it was paid in Iranian soil.', fa: 'دو بار در آغاز آن قرن، ایران بر سر سرزمین‌های قفقاز با روسیه جنگید، و هر دو بار در برابر سلاح و سازمان برتر سپاه روس شکست خورد. بهای این شکست‌ها سنگین بود، و با خاک ایران پرداخت شد.' }"),

 ("{ t: 'p', x: 'By the Treaty of Turkmenchay, one of the most painful in Iranian history, Iran gave up its claims to the rich lands of the Caucasus and granted Russia sweeping privileges. It was a wound to national pride that would not soon heal, and a sign of how far the balance had tipped against Iran.' }",
  "{ t: 'p', x: 'By the Treaty of Turkmenchay, one of the most painful in Iranian history, Iran gave up its claims to the rich lands of the Caucasus and granted Russia sweeping privileges. It was a wound to national pride that would not soon heal, and a sign of how far the balance had tipped against Iran.', fa: 'با عهدنامهٔ ترکمانچای، از دردناک‌ترین قراردادهای تاریخ ایران، ایران از ادعای خود بر سرزمین‌های حاصلخیز قفقاز چشم پوشید و امتیازهایی گسترده به روسیه داد. زخمی بود بر غرور ملی که به این زودی‌ها التیام نیافت، و نشانه‌ای از اینکه ترازو تا کجا به زیان ایران چرخیده است.' }"),

 ("{ t: 'markline', x: 'A proud nation learned, painfully, that valour alone could not stand against modern empires.' }",
  "{ t: 'markline', x: 'A proud nation learned, painfully, that valour alone could not stand against modern empires.', fa: 'ملتی سربلند، به تلخی آموخت که دلاوری به‌تنهایی در برابر امپراتوری‌های مدرن دوام نمی‌آورد.' }"),

 ("""{ t: 'p', x: 'Not everyone accepted Iran\\'s decline. In the middle of the century there rose a man who saw clearly what his country needed, and who tried, in a few short years, to drag it into the modern world. His name was Amir Kabir, and he was the chief minister of the young Shah, Naser al-Din.' }""",
  """{ t: 'p', x: 'Not everyone accepted Iran\\'s decline. In the middle of the century there rose a man who saw clearly what his country needed, and who tried, in a few short years, to drag it into the modern world. His name was Amir Kabir, and he was the chief minister of the young Shah, Naser al-Din.', fa: 'همه به افول ایران تن ندادند. در میانهٔ آن قرن مردی برخاست که به‌روشنی می‌دید کشورش به چه نیاز دارد، و کوشید در چند سال کوتاه آن را به جهان مدرن بکشاند. نامش امیرکبیر بود، صدراعظم شاه جوان، ناصرالدین‌شاه.' }"""),
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
