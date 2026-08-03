# -*- coding: utf-8 -*-
# Hafez: the ghazal as a form, and the fal. غزل, ردیف, قافیه, تفأل, نیت,
# and the two occasions Iranians actually do it: نوروز and شب یلدا.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'He wrote the ghazal, a form of independent couplets bound by rhyme and a single mood rather than a single argument. Each couplet stands alone and could be quoted alone, which is exactly why his lines travel so easily into ordinary speech. A ghazal is not a story. It is a scattering of jewels that somehow make a necklace.' }",
  "{ t: 'p', x: 'He wrote the ghazal, a form of independent couplets bound by rhyme and a single mood rather than a single argument. Each couplet stands alone and could be quoted alone, which is exactly why his lines travel so easily into ordinary speech. A ghazal is not a story. It is a scattering of jewels that somehow make a necklace.', fa: 'او غزل سرود؛ قالبی از بیت‌های مستقل که قافیه و ردیف و یک حال و هوای واحد به هم می‌بنددشان، نه یک استدلال پیوسته. هر بیت بر پای خود می‌ایستد و می‌توان تنها همان را نقل کرد، و درست به همین سبب است که بیت‌هایش این‌چنین آسان به زبان مردم راه می‌یابند. غزل داستان نیست. پراکندنِ گوهرهایی است که به‌نحوی گردنبند می‌شوند.' }"),

 ("{ t: 'p', x: 'That refrain, gham makhor, do not grieve, has been said by mothers to children and by strangers to strangers for six hundred years. It is not advice. It is a hand on the shoulder.' }",
  "{ t: 'p', x: 'That refrain, gham makhor, do not grieve, has been said by mothers to children and by strangers to strangers for six hundred years. It is not advice. It is a hand on the shoulder.', fa: 'آن ردیف، غم مخور، شش قرن است که مادران به فرزندان و غریبه‌ها به غریبه‌ها می‌گویندش. نصیحت نیست. دستی است که بر شانه می‌نشیند.' }"),

 ("{ t: 'p', x: 'Here is what no other poet in the world has. Iranians do not only read Hafez. They ask him.' }",
  "{ t: 'p', x: 'Here is what no other poet in the world has. Iranians do not only read Hafez. They ask him.', fa: 'و اینجا چیزی هست که هیچ شاعر دیگری در جهان ندارد. ایرانیان حافظ را تنها نمی‌خوانند. از او می‌پرسند.' }"),

 ("{ t: 'p', x: 'The custom is called fal e Hafez, the omen of Hafez. You hold a question in your heart, a real one, the kind you have been carrying. You touch the book. You open it at random. And the verse your eye falls on is read as the answer, not as a prediction of what will happen, but as a mirror held up to what you already know and have not admitted.' }",
  "{ t: 'p', x: 'The custom is called fal e Hafez, the omen of Hafez. You hold a question in your heart, a real one, the kind you have been carrying. You touch the book. You open it at random. And the verse your eye falls on is read as the answer, not as a prediction of what will happen, but as a mirror held up to what you already know and have not admitted.', fa: 'این آیین را فال حافظ می‌خوانند. پرسشی را در دل نگاه می‌داری، پرسشی راستین، از آنها که مدتی است با خود می‌بری. نیت می‌کنی. دست بر کتاب می‌گذاری و بی‌قصد بازش می‌کنی. و بیتی که چشمت بر آن می‌افتد پاسخ خوانده می‌شود؛ نه پیشگویی آنچه رخ خواهد داد، که آینه‌ای در برابر آنچه خود می‌دانی و به آن اعتراف نکرده‌ای.' }"),

 ("{ t: 'aside', x: 'It happens at Nowruz around the Haft Seen, at Yalda in the long night, and any evening a family needs it.' }",
  "{ t: 'aside', x: 'It happens at Nowruz around the Haft Seen, at Yalda in the long night, and any evening a family needs it.', fa: 'نوروز، گرد سفرهٔ هفت‌سین؛ شب یلدا، در آن شب دراز؛ و هر شبی که خانواده‌ای به آن نیاز داشته باشد.' }"),
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
