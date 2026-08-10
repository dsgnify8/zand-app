# -*- coding: utf-8 -*-
# Language, second batch. هندواروپایی, آریانام, ایر.
# مادر against mother, same as پدر against father.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The family is called Indo European, and it is the largest on earth. English, German, Spanish, Greek, Russian, Hindi, and Persian are all leaves on one tree. When an Iranian says madar and an Englishman says mother, they are both saying a word that was already old when the pyramids were young.' }",
  "{ t: 'p', x: 'The family is called Indo European, and it is the largest on earth. English, German, Spanish, Greek, Russian, Hindi, and Persian are all leaves on one tree. When an Iranian says madar and an Englishman says mother, they are both saying a word that was already old when the pyramids were young.', fa: 'نام این خانواده هندواروپایی است، و بزرگ‌ترین خانوادهٔ زبانی روی زمین. انگلیسی، آلمانی، اسپانیایی، یونانی، روسی، هندی و فارسی، همه برگ‌های یک درختند. وقتی یک ایرانی می‌گوید «مادر» و یک انگلیسی می‌گوید «mother»، هر دو دارند واژه‌ای را به زبان می‌آورند که وقتی اهرام مصر تازه‌ساز بودند، خودش دیگر کهنه شده بود.' }"),

 ("{ t: 'mark', x: 'Persian and English are cousins who last shared a house five thousand years ago.' }",
  "{ t: 'mark', x: 'Persian and English are cousins who last shared a house five thousand years ago.', fa: 'فارسی و انگلیسی پسرعموهایی هستند که آخرین بار پنج هزار سال پیش زیر یک سقف بوده‌اند.' }"),

 ("{ t: 'h', x: 'And the name of the land' }",
  "{ t: 'h', x: 'And the name of the land', fa: 'و نام این سرزمین' }"),

 ("{ t: 'p', x: 'The word Iran carries this. It comes from Aryanam, meaning of the Aryans, which was simply what these people called themselves: the noble ones. The same root sits inside the name Eire, the old name for Ireland, at the other end of the same migration. The country never changed its name. Iran has been calling itself Iran for as long as it has been calling itself anything.' }",
  "{ t: 'p', x: 'The word Iran carries this. It comes from Aryanam, meaning of the Aryans, which was simply what these people called themselves: the noble ones. The same root sits inside the name Eire, the old name for Ireland, at the other end of the same migration. The country never changed its name. Iran has been calling itself Iran for as long as it has been calling itself anything.', fa: 'خودِ واژهٔ «ایران» همین را با خود دارد. از «آریانام» می‌آید، یعنی سرزمینِ آریاییان، و آریایی چیزی نبود جز نامی که این مردم بر خودشان گذاشته بودند: نجیبان. همین ریشه در نام «ائیره» هم هست، نام کهن ایرلند، در آن سرِ دیگرِ همان کوچ. این کشور هیچ‌وقت نامش را عوض نکرد. ایران از وقتی که اصلاً نامی بر خود گذاشته، خودش را ایران خوانده است.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:50])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
