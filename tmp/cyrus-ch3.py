# -*- coding: utf-8 -*-
# Cyrus, chapter three.

p = "constants/education.ts"
s = open(p).read()

if "نامش خود مترادف ثروت" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'To the west lay Lydia, a kingdom of legendary wealth ruled by Croesus, whose very name became a byword for riches. Alarmed by the rise of Persia, Croesus resolved to strike first, and before he marched he sent to the famous oracle at Delphi to ask what would happen if he made war on Cyrus.' }",
  "{ t: 'p', x: 'To the west lay Lydia, a kingdom of legendary wealth ruled by Croesus, whose very name became a byword for riches. Alarmed by the rise of Persia, Croesus resolved to strike first, and before he marched he sent to the famous oracle at Delphi to ask what would happen if he made war on Cyrus.', fa: 'در غرب لیدیه بود، پادشاهی‌ای با ثروتی افسانه‌ای، به فرمان کرزوس، که نامش خود مترادف ثروت شد. برآمدن پارس او را نگران کرد و بر آن شد که پیش‌دستی کند. پیش از لشکرکشی، کسی را نزد پیشگوی نامدار دلفی فرستاد تا بپرسد اگر با کوروش بجنگد چه خواهد شد.' }"),

 ("{ t: 'p', x: 'The oracle gave its famous reply, that if Croesus went to war he would destroy a great empire. Delighted, he took it as a promise of victory. He did not consider that the great empire he would destroy might be his own.' }",
  "{ t: 'p', x: 'The oracle gave its famous reply, that if Croesus went to war he would destroy a great empire. Delighted, he took it as a promise of victory. He did not consider that the great empire he would destroy might be his own.', fa: 'پیشگو پاسخ نامدارش را داد: اگر کرزوس به جنگ رود، امپراتوری بزرگی را نابود خواهد کرد. کرزوس شادمان شد و آن را نویدِ پیروزی گرفت. به این نیندیشید که آن امپراتوری بزرگ شاید امپراتوری خودش باشد.' }"),

 ("{ t: 'q', x: 'If Croesus makes war on the Persians, he will destroy a mighty empire.' }",
  "{ t: 'q', x: 'If Croesus makes war on the Persians, he will destroy a mighty empire.', fa: 'اگر کرزوس با پارسیان بجنگد، امپراتوری بزرگی را نابود خواهد کرد.' }"),

 ("{ t: 'h', x: 'A trick of camels' }",
  "{ t: 'h', x: 'A trick of camels', fa: 'ترفند شتران' }"),

 ("{ t: 'p', x: 'The armies met, and after an indecisive battle Croesus withdrew for the winter, expecting Cyrus to do the same. But Cyrus did not follow the old rules of war. He pursued at once, marching in the cold to strike while the Lydian army was dispersed, and appeared before the walls of Sardes when he was least expected.' }",
  "{ t: 'p', x: 'The armies met, and after an indecisive battle Croesus withdrew for the winter, expecting Cyrus to do the same. But Cyrus did not follow the old rules of war. He pursued at once, marching in the cold to strike while the Lydian army was dispersed, and appeared before the walls of Sardes when he was least expected.', fa: 'دو سپاه به هم رسیدند و پس از نبردی بی‌نتیجه، کرزوس برای زمستان عقب نشست، به گمان اینکه کوروش نیز چنین کند. اما کوروش به قاعده‌های کهن جنگ پایبند نبود. بی‌درنگ در پی او رفت، در سرما لشکر کشید تا در همان هنگام که سپاه لیدیه پراکنده بود ضربه بزند، و درست وقتی که انتظارش را نداشتند پیش دیوارهای سارد پدیدار شد.' }"),

 ("{ t: 'p', x: 'In the battle before the city, the famed Lydian cavalry was the finest in the world. So Cyrus, by the counsel of Harpagus, placed his baggage camels at the front of his line. The horses of the Lydians, unused to the sight and smell of camels, panicked and refused to charge, and the battle was won.' }",
  "{ t: 'p', x: 'In the battle before the city, the famed Lydian cavalry was the finest in the world. So Cyrus, by the counsel of Harpagus, placed his baggage camels at the front of his line. The horses of the Lydians, unused to the sight and smell of camels, panicked and refused to charge, and the battle was won.', fa: 'در نبردِ پیش شهر، سوارهٔ نامدار لیدیه بهترین سوارهٔ جهان بود. پس کوروش به رایزنی هارپاگ، شتران بارکشش را در صف نخست نشاند. اسبان لیدیه که به دیدن و بوی شتر خو نداشتند، رَم کردند و از یورش سر باز زدند، و نبرد برده شد.' }"),

 ("{ t: 'h', x: 'The mercy of the victor' }",
  "{ t: 'h', x: 'The mercy of the victor', fa: 'بخشش فاتح' }"),

 ("{ t: 'p', x: 'Sardes fell, and Croesus was taken. By some accounts Cyrus had built a great pyre to burn the captured king, as was the custom. But as the flames rose, Croesus called out the name of the Athenian sage Solon, who had once warned him that no man should be counted happy until his life had ended well.' }",
  "{ t: 'p', x: 'Sardes fell, and Croesus was taken. By some accounts Cyrus had built a great pyre to burn the captured king, as was the custom. But as the flames rose, Croesus called out the name of the Athenian sage Solon, who had once warned him that no man should be counted happy until his life had ended well.', fa: 'سارد افتاد و کرزوس اسیر شد. بنا بر برخی روایت‌ها، کوروش هیمه‌ای بزرگ برافراشت تا شاهِ اسیر را بسوزاند، چنان‌که رسم بود. اما همچنان که شعله‌ها بالا می‌گرفت، کرزوس نام سولون، فرزانهٔ آتنی، را بر زبان آورد؛ همان که روزی هشدارش داده بود هیچ‌کس را نباید خوشبخت شمرد تا زندگی‌اش به نیکی به پایان نرسیده باشد.' }"),

 ("{ t: 'p', x: 'Struck by the words, and by the turning of fortune that could bring the richest king on earth to a burning pyre, Cyrus ordered the fire quenched and spared him. Croesus, the stories say, became a trusted counsellor at the Persian court. Once again the defeated enemy was made a friend.' }",
  "{ t: 'p', x: 'Struck by the words, and by the turning of fortune that could bring the richest king on earth to a burning pyre, Cyrus ordered the fire quenched and spared him. Croesus, the stories say, became a trusted counsellor at the Persian court. Once again the defeated enemy was made a friend.', fa: 'این سخن، و گردش بختی که می‌توانست توانگرترین شاه روی زمین را به پای هیمهٔ آتش بکشاند، کوروش را تکان داد. فرمان داد آتش را خاموش کنند و جانش را بخشید. روایت‌ها می‌گویند کرزوس مشاور مورد اعتماد دربار پارس شد. باز هم دشمنِ شکست‌خورده دوست شد.' }"),

 ("{ t: 'pull', x: 'No man should be counted happy until the end of his life is known.' }",
  "{ t: 'pull', x: 'No man should be counted happy until the end of his life is known.', fa: 'هیچ‌کس را خوشبخت مخوان، تا پایان زندگی‌اش را ندانی.' }"),
]

# SKIP_MISSING: apply what matches, report the rest rather than aborting
applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1)
        applied += 1
    else:
        skipped.append(a[:70])
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

open(p, "w").write(s)
print("chapter three translated:", len(PAIRS), "blocks")
