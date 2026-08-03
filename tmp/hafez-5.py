# -*- coding: utf-8 -*-
# Hafez: the attack on hypocrisy, love as a discipline, and the Hafezieh.
# رند is the key word here — the one the English has no equivalent for.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'He goes after the preacher who tells others to fast while eating, the judge who sells verdicts, the ascetic whose piety is a performance. In his poems the honest drunk is closer to God than the dishonest saint, because the drunk at least is not pretending. This was not blasphemy. It was a demand that the sacred be real.' }",
  "{ t: 'p', x: 'He goes after the preacher who tells others to fast while eating, the judge who sells verdicts, the ascetic whose piety is a performance. In his poems the honest drunk is closer to God than the dishonest saint, because the drunk at least is not pretending. This was not blasphemy. It was a demand that the sacred be real.', fa: 'به واعظی می‌تازد که دیگران را به روزه می‌خواند و خود می‌خورد، به قاضی‌ای که حکم می‌فروشد، به زاهدی که پارسایی‌اش نمایش است. در شعر او رندِ راستگو به خدا نزدیک‌تر است تا زاهدِ دروغین، چرا که رند دست‌کم وانمود نمی‌کند. این کفر نبود. خواستی بود برای آنکه امر مقدس، راستین باشد.' }"),

 ("{ t: 'p', x: 'Against the hypocrite he sets one thing: love. Not sentiment, but love as a discipline that dissolves the self and its calculations. He holds that a heart alive with love does not die, that the lover who counts the cost has not loved, and that this is the only path that leads anywhere true.' }",
  "{ t: 'p', x: 'Against the hypocrite he sets one thing: love. Not sentiment, but love as a discipline that dissolves the self and its calculations. He holds that a heart alive with love does not die, that the lover who counts the cost has not loved, and that this is the only path that leads anywhere true.', fa: 'در برابر ریاکار یک چیز می‌نشاند: عشق. نه احساساتی‌گری، که عشق چون راه و ریاضتی که خود و حساب‌وکتاب‌هایش را در خود حل می‌کند. بر آن است که دلی که به عشق زنده باشد نمی‌میرد، که عاشقی که بها را می‌شمارد عاشق نبوده، و که تنها همین راه است که به جایی راستین می‌رسد.' }"),

 ("{ t: 'p', x: 'And through it all runs a tenderness toward human failure. Hafez never condemns the weak. He condemns only those who condemn the weak. That is why a nation has trusted him with its questions.' }",
  "{ t: 'p', x: 'And through it all runs a tenderness toward human failure. Hafez never condemns the weak. He condemns only those who condemn the weak. That is why a nation has trusted him with its questions.', fa: 'و در سرتاسر این‌ها مهری نسبت به لغزش آدمی جاری است. حافظ هرگز ناتوان را سرزنش نمی‌کند. تنها کسانی را سرزنش می‌کند که ناتوان را سرزنش می‌کنند. به همین سبب است که یک ملت پرسش‌هایش را به او سپرده است.' }"),

 ("{ t: 'p', x: 'He was buried in a garden in Shiraz, and the garden is still there. It is called the Hafezieh, and it is one of the few tombs in the world that people visit not to mourn but to sit. They read to each other. They drink tea. They open the book, and ask, and go home lighter.' }",
  "{ t: 'p', x: 'He was buried in a garden in Shiraz, and the garden is still there. It is called the Hafezieh, and it is one of the few tombs in the world that people visit not to mourn but to sit. They read to each other. They drink tea. They open the book, and ask, and go home lighter.', fa: 'در باغی در شیراز به خاک سپرده شد، و آن باغ هنوز هست. حافظیه‌اش می‌خوانند، و از معدود آرامگاه‌های جهان است که مردم نه برای سوگواری، که برای نشستن به آن می‌روند. برای هم می‌خوانند. چای می‌نوشند. کتاب را می‌گشایند و می‌پرسند، و سبک‌تر به خانه برمی‌گردند.' }"),

 ("{ t: 'p', x: 'His reach went far beyond Persian. Goethe read him in translation and was so shaken that he wrote an entire book in answer, calling Hafez his twin. Emerson translated him. Nietzsche praised him. And every one of them was reading a shadow of the original, because his wordplay does not survive the crossing.' }",
  "{ t: 'p', x: 'His reach went far beyond Persian. Goethe read him in translation and was so shaken that he wrote an entire book in answer, calling Hafez his twin. Emerson translated him. Nietzsche praised him. And every one of them was reading a shadow of the original, because his wordplay does not survive the crossing.', fa: 'دامنهٔ اثرش بسی فراتر از فارسی رفت. گوته او را در ترجمه خواند و چنان تکان خورد که کتابی تمام در پاسخش نوشت و حافظ را همزاد خود خواند. امرسون ترجمه‌اش کرد. نیچه ستودش. و هر یک از آنان سایه‌ای از اصل را می‌خواندند، چرا که بازی او با واژه‌ها از این گذر جان به در نمی‌برد.' }"),
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
