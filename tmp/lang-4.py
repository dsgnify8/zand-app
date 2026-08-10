# -*- coding: utf-8 -*-
# Language, fourth batch: the Arabic misreading.
# This section matters — it is the correction of a claim Iranians hear
# constantly, so the Persian should be precise and unhurried, not defensive.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'This is why Persian is far easier for an English speaker than its script suggests. The alphabet looks foreign. The grammar underneath is a cousin, and it is gentler than French.' }",
  "{ t: 'p', x: 'This is why Persian is far easier for an English speaker than its script suggests. The alphabet looks foreign. The grammar underneath is a cousin, and it is gentler than French.', fa: 'برای همین است که فارسی برای یک انگلیسی‌زبان بسیار آسان‌تر از آن است که خطش نشان می‌دهد. الفبا بیگانه به نظر می‌رسد. اما دستور زبانی که زیرش نشسته، خویشاوند است؛ و از فرانسه هم مهربان‌تر.' }"),

 ("{ t: 'p', x: 'After the Arab conquest, Arabic became the language of religion, of scholarship, and of power. For two centuries Persian went quiet in the places that mattered. When it came back, it came back wearing Arabic letters and carrying thousands of Arabic words.' }",
  "{ t: 'p', x: 'After the Arab conquest, Arabic became the language of religion, of scholarship, and of power. For two centuries Persian went quiet in the places that mattered. When it came back, it came back wearing Arabic letters and carrying thousands of Arabic words.', fa: 'پس از فتح عرب، عربی زبان دین شد و دانش و قدرت. دو قرن، فارسی در جاهایی که اهمیت داشت خاموش ماند. وقتی بازگشت، با حروف عربی بازگشت و هزاران واژهٔ عربی هم با خود آورد.' }"),

 ("{ t: 'p', x: 'People often look at that and conclude that Persian became a kind of Arabic. It is one of the most common misreadings there is, and it is wrong in a way worth understanding precisely.' }",
  "{ t: 'p', x: 'People often look at that and conclude that Persian became a kind of Arabic. It is one of the most common misreadings there is, and it is wrong in a way worth understanding precisely.', fa: 'خیلی‌ها به این نگاه می‌کنند و نتیجه می‌گیرند که فارسی نوعی عربی شده است. این یکی از رایج‌ترین برداشت‌های غلطی است که وجود دارد، و به شکلی نادرست است که می‌ارزد دقیق بفهمیمش.' }"),

 ("{ t: 'h', x: 'What it could not touch' }",
  "{ t: 'h', x: 'What it could not touch', fa: 'آنچه دست‌نخورده ماند' }"),
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
