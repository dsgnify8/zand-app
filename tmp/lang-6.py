# -*- coding: utf-8 -*-
# Language, sixth batch: Ferdowsi, and the Persian words that went out
# into English. پردیس is the key one — in Persian it needs no explaining,
# so the sentence becomes recognition rather than revelation.
# Vocabulary matches the Two Centuries of Silence chapter: فارسی سره.

p = "constants/language.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Ferdowsi wrote the Shahnameh in a Persian deliberately stripped of Arabic wherever he could manage it, to prove the language needed to borrow nothing to carry a nation. Sixty thousand couplets, and the point was made permanently. That story has its own telling in Literature.' }",
  "{ t: 'p', x: 'Ferdowsi wrote the Shahnameh in a Persian deliberately stripped of Arabic wherever he could manage it, to prove the language needed to borrow nothing to carry a nation. Sixty thousand couplets, and the point was made permanently. That story has its own telling in Literature.', fa: 'فردوسی شاهنامه را به فارسی‌ای سرود که آگاهانه و تا آنجا که از دستش برمی‌آمد از عربی پیراسته بود، تا ثابت کند این زبان برای بر دوش کشیدن یک ملت به وام گرفتن از هیچ‌کس نیاز ندارد. شصت هزار بیت، و حرف برای همیشه ثابت شد. آن داستان، روایت جداگانهٔ خودش را در بخش ادبیات دارد.' }"),

 ("{ t: 'p', x: 'You have been speaking Persian your whole life without noticing. These crossed into English through trade, through conquest, through the long road between Iran and everywhere else.' }",
  "{ t: 'p', x: 'You have been speaking Persian your whole life without noticing. These crossed into English through trade, through conquest, through the long road between Iran and everywhere else.', fa: 'انگلیسی‌زبان‌ها تمام عمرشان فارسی حرف زده‌اند بی‌آنکه متوجه باشند. این واژه‌ها از راه بازرگانی، از راه لشکرکشی، و از راه آن جادهٔ دراز میان ایران و بقیهٔ جهان، به انگلیسی رفته‌اند.' }"),

 ("{ t: 'mark', x: 'When you say paradise, you are describing a Persian garden with a wall around it.' }",
  "{ t: 'mark', x: 'When you say paradise, you are describing a Persian garden with a wall around it.', fa: 'وقتی کسی می‌گوید paradise، دارد باغی ایرانی را وصف می‌کند که دورش دیوار کشیده‌اند.' }"),

 ("{ t: 'p', x: 'That one is worth sitting with. Pairidaeza meant simply a walled enclosure, the sort of green space a Persian king built to hold the world in order: water, shade, symmetry, and birds. The Greeks borrowed the word, then scripture borrowed it, and an ordinary Persian garden became the name for heaven itself across the entire western world.' }",
  "{ t: 'p', x: 'That one is worth sitting with. Pairidaeza meant simply a walled enclosure, the sort of green space a Persian king built to hold the world in order: water, shade, symmetry, and birds. The Greeks borrowed the word, then scripture borrowed it, and an ordinary Persian garden became the name for heaven itself across the entire western world.', fa: 'روی همین یکی می‌ارزد کمی مکث کنیم. «پیریدَئِزَه» فقط یعنی جایی که دورش را بسته باشند؛ همان فضای سبزی که شاه ایرانی می‌ساخت تا جهان را در نظمی نگه دارد: آب، سایه، تقارن، و پرنده. یونانیان این واژه را وام گرفتند، بعد کتاب‌های مقدس، و یک باغ سادهٔ ایرانی در سرتاسر جهان غرب به نام خودِ بهشت بدل شد. همان واژه در فارسی «پردیس» شد.' }"),
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
