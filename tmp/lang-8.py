# -*- coding: utf-8 -*-
# The era table and the loanword list. Persian names its own scripts —
# میخی, پهلوی — and its own eras. The loanwords keep the English word in
# Latin script, since the point is where it went, not where it came from.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 # era
 ("{ age: 'Old Persian', script: 'Cuneiform', note: 'The language of Darius, carved into the cliff at Bisotun. Wedge shaped marks pressed into stone.' }",
  "{ age: 'Old Persian', ageFa: 'فارسی باستان', script: 'Cuneiform', scriptFa: 'میخی', note: 'The language of Darius, carved into the cliff at Bisotun. Wedge shaped marks pressed into stone.', noteFa: 'زبان داریوش، کنده‌شده بر صخرهٔ بیستون. نشانه‌هایی گوه‌مانند که بر سنگ فرو رفته‌اند.' }"),

 ("{ age: 'Middle Persian', script: 'Pahlavi', note: 'The language of the Sasanians, of the fire temples and the court, written in a script descended from Aramaic.' }",
  "{ age: 'Middle Persian', ageFa: 'فارسی میانه', script: 'Pahlavi', scriptFa: 'پهلوی', note: 'The language of the Sasanians, of the fire temples and the court, written in a script descended from Aramaic.', noteFa: 'زبان ساسانیان، زبان آتشکده‌ها و دربار، که با خطی نوشته می‌شد برگرفته از آرامی.' }"),

 ("{ age: 'New Persian', script: 'Perso Arabic', note: 'The language of Ferdowsi, Hafez, and of Iran today. A new alphabet, the same tongue underneath.' }",
  "{ age: 'New Persian', ageFa: 'فارسی نو', script: 'Perso Arabic', scriptFa: 'فارسی‌عربی', note: 'The language of Ferdowsi, Hafez, and of Iran today. A new alphabet, the same tongue underneath.', noteFa: 'زبان فردوسی، حافظ، و ایرانِ امروز. الفبایی تازه، و همان زبان در زیرش.' }"),

 # loans
 ("{ en: 'paradise', from: 'pairidaeza', note: 'A walled garden. The Persian word for an enclosed garden became the word for heaven in half the languages of the world.' }",
  "{ en: 'paradise', from: 'pairidaeza', fromFa: 'پیریدَئِزَه', note: 'A walled garden. The Persian word for an enclosed garden became the word for heaven in half the languages of the world.', noteFa: 'باغی دیواردار. واژهٔ ایرانی برای باغِ بسته، در نیمی از زبان‌های جهان به واژهٔ بهشت بدل شد. در فارسی هم «پردیس» شد.' }"),

 ("{ en: 'bazaar', from: 'bazar', note: 'The market. It travelled with the goods.' }",
  "{ en: 'bazaar', from: 'bazar', fromFa: 'بازار', note: 'The market. It travelled with the goods.', noteFa: 'بازار. همراه با خودِ کالاها سفر کرد.' }"),

 ("{ en: 'khaki', from: 'khak', note: 'Dust, earth. The colour is named for the ground.' }",
  "{ en: 'khaki', from: 'khak', fromFa: 'خاک', note: 'Dust, earth. The colour is named for the ground.', noteFa: 'خاک. نام آن رنگ از زمین گرفته شده.' }"),

 ("{ en: 'pyjama', from: 'pay jameh', note: 'Leg garment. It reached England through India.' }",
  "{ en: 'pyjama', from: 'pay jameh', fromFa: 'پاجامه', note: 'Leg garment. It reached England through India.', noteFa: 'جامهٔ پا. از راه هند به انگلستان رسید.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:45])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
