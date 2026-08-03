# -*- coding: utf-8 -*-
# Hafez: why the fal works, and the turn towards his philosophy.
# لسان‌الغیب is his title, not a description, so it stands untranslated.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'No one decided this. It grew. It happened because his double meanings mean the verse will always have something to say to whatever you brought to it, and because the country trusted him. He is called Lisan al Ghayb, the Tongue of the Unseen, and the title was not given lightly. Iranians believe, or half believe, or enjoy believing, that he sees.' }",
  "{ t: 'p', x: 'No one decided this. It grew. It happened because his double meanings mean the verse will always have something to say to whatever you brought to it, and because the country trusted him. He is called Lisan al Ghayb, the Tongue of the Unseen, and the title was not given lightly. Iranians believe, or half believe, or enjoy believing, that he sees.', fa: 'کسی چنین تصمیمی نگرفت. خودش رویید. از آن رو رخ داد که ایهام او سبب می‌شود بیت همیشه چیزی برای گفتن به هر پرسشی داشته باشد که با خود آورده‌ای، و از آن رو که این سرزمین به او اعتماد کرد. او را لسان‌الغیب می‌خوانند، و این لقب را به آسانی نداده‌اند. ایرانیان باور دارند، یا نیمه‌باور، یا از باور کردنش لذت می‌برند، که او می‌بیند.' }"),

 ("{ t: 'p', x: 'And the reading is never literal. A verse about wine answers a question about a marriage. A verse about a rose answers a question about leaving the country. This is not a failure of the method. It is the method. Hafez does not tell you what to do. He tells you what you already think, in words beautiful enough that you can finally hear it.' }",
  "{ t: 'p', x: 'And the reading is never literal. A verse about wine answers a question about a marriage. A verse about a rose answers a question about leaving the country. This is not a failure of the method. It is the method. Hafez does not tell you what to do. He tells you what you already think, in words beautiful enough that you can finally hear it.', fa: 'و خواندن هرگز تحت‌اللفظی نیست. بیتی دربارهٔ می، پاسخ پرسشی دربارهٔ ازدواج می‌شود. بیتی دربارهٔ گل، پاسخ پرسشی دربارهٔ رفتن از این کشور. این نقصِ روش نیست؛ خودِ روش است. حافظ به تو نمی‌گوید چه کن. آنچه را خودت پیش‌تر می‌اندیشیدی به تو می‌گوید، با واژه‌هایی چنان زیبا که سرانجام بتوانی بشنوی‌اش.' }"),

 ("{ t: 'p', x: 'Ask him yourself. Hold your question, and open the book.' }",
  "{ t: 'p', x: 'Ask him yourself. Hold your question, and open the book.', fa: 'خودت از او بپرس. نیت کن، و کتاب را بگشا.' }"),

 ("{ t: 'aside', x: 'Ask once, and sit with what you are given. That is the whole tradition.' }",
  "{ t: 'aside', x: 'Ask once, and sit with what you are given. That is the whole tradition.', fa: 'یک بار بپرس، و با آنچه به تو داده‌اند بنشین. تمام آیین همین است.' }"),

 ("{ t: 'p', x: 'Beneath the wine and the roses there is a philosophy, and it is fierce. Hafez spent his life attacking one thing above all others, and it was not sin. It was hypocrisy.' }",
  "{ t: 'p', x: 'Beneath the wine and the roses there is a philosophy, and it is fierce. Hafez spent his life attacking one thing above all others, and it was not sin. It was hypocrisy.', fa: 'زیر آن می و گل، اندیشه‌ای نشسته است، و اندیشه‌ای تند و بی‌رحم. حافظ عمرش را صرف تاختن بر یک چیز کرد، بیش از هر چیز دیگر، و آن گناه نبود. ریا بود.' }"),
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
