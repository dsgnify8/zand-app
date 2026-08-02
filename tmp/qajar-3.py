# -*- coding: utf-8 -*-
# The Qajar dynasty, third batch: the tobacco boycott and the Constitutional
# Revolution. Both have their own names in Persian.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'h', x: 'The Tobacco Protest' }",
  "{ t: 'h', x: 'The Tobacco Protest', fa: 'تحریم تنباکو' }"),

 ("{ t: 'p', x: 'In 1890 the Shah granted a sweeping monopoly over all Iranian tobacco to a British company. The nation erupted. Led by the clergy and the merchants, Iranians of every class joined a boycott so complete that, it is said, even the women of the royal harem refused to smoke. The Shah was forced to cancel the concession.' }",
  "{ t: 'p', x: 'In 1890 the Shah granted a sweeping monopoly over all Iranian tobacco to a British company. The nation erupted. Led by the clergy and the merchants, Iranians of every class joined a boycott so complete that, it is said, even the women of the royal harem refused to smoke. The Shah was forced to cancel the concession.', fa: 'در سال ۱۸۹۰ شاه امتیاز انحصار تمام تنباکوی ایران را به یک شرکت بریتانیایی واگذار کرد. کشور به جوش آمد. به پیشگامی روحانیان و بازاریان، ایرانیان از هر طبقه به تحریمی پیوستند چنان فراگیر که، به روایتی، حتی زنان اندرون شاهی هم قلیان را کنار گذاشتند. شاه ناچار شد امتیاز را لغو کند.' }"),

 ("{ t: 'markline', x: 'For the first time, the people had spoken with one voice, and the throne had been made to listen.' }",
  "{ t: 'markline', x: 'For the first time, the people had spoken with one voice, and the throne had been made to listen.', fa: 'برای نخستین بار، مردم یکصدا سخن گفتند، و تخت ناچار شد بشنود.' }"),

 ("{ t: 'h', x: 'The Constitutional Revolution' }",
  "{ t: 'h', x: 'The Constitutional Revolution', fa: 'انقلاب مشروطه' }"),

 ("{ t: 'p', x: 'The Tobacco Protest was only the beginning. The demand grew for a government of laws rather than the whim of kings, and in 1906 the movement triumphed. The Shah was compelled to grant a constitution and to establish the Majles, the national parliament, the first in Iranian history.' }",
  "{ t: 'p', x: 'The Tobacco Protest was only the beginning. The demand grew for a government of laws rather than the whim of kings, and in 1906 the movement triumphed. The Shah was compelled to grant a constitution and to establish the Majles, the national parliament, the first in Iranian history.', fa: 'تحریم تنباکو تنها آغاز بود. خواستِ حکومتِ قانون به جای هوس شاهان بالا گرفت، و در سال ۱۲۸۵ خورشیدی این جنبش به پیروزی رسید. شاه ناگزیر شد فرمان مشروطیت را امضا کند و مجلس شورای ملی را برپا دارد؛ نخستین مجلس تاریخ ایران.' }"),

 ("{ t: 'p', x: 'It was a hard-won and fragile victory, and the struggle between the crown and the constitution would go on for years, with the parliament even bombarded at one point by Russian-officered forces. But something fundamental had changed. The idea had taken root that the people, not the king alone, were the source of authority in Iran.' }",
  "{ t: 'p', x: 'It was a hard-won and fragile victory, and the struggle between the crown and the constitution would go on for years, with the parliament even bombarded at one point by Russian-officered forces. But something fundamental had changed. The idea had taken root that the people, not the king alone, were the source of authority in Iran.', fa: 'پیروزی‌ای بود به‌سختی به دست آمده و شکننده، و کشمکش میان تاج و مشروطه سال‌ها ادامه یافت؛ تا آنجا که یک بار نیروهایی به فرماندهی افسران روس مجلس را به توپ بستند. اما چیزی بنیادی تغییر کرده بود. این اندیشه ریشه دوانده بود که سرچشمهٔ قدرت در ایران مردم‌اند، نه تنها شاه.' }"),

 ("{ t: 'markline', x: 'A nation had awoken to the idea that it belonged to its people.' }",
  "{ t: 'markline', x: 'A nation had awoken to the idea that it belonged to its people.', fa: 'ملتی بیدار شد به این اندیشه که این سرزمین از آنِ مردمش است.' }"),
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
