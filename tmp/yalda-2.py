# -*- coding: utf-8 -*-
# Yalda, final batch. The closing paragraph is the one a diaspora reader
# will feel — cutting a watermelon at midnight because their grandmother did.

p = "constants/yalda.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'You will often see it claimed that this is where the December date of Christmas comes from, through the Roman cult of Mithras. It is a popular claim and a genuinely disputed one, and honest scholars disagree about how much the Roman Mithras owes to the Iranian Mithra at all. What is not disputed is simpler: people at this latitude have been marking the turn of the dark for as long as there have been people here.' }",
  "{ t: 'p', x: 'You will often see it claimed that this is where the December date of Christmas comes from, through the Roman cult of Mithras. It is a popular claim and a genuinely disputed one, and honest scholars disagree about how much the Roman Mithras owes to the Iranian Mithra at all. What is not disputed is simpler: people at this latitude have been marking the turn of the dark for as long as there have been people here.', fa: 'بارها می‌شنوی که می‌گویند تاریخ کریسمس در دسامبر از همین‌جا آمده، از راه آیین میترای رومی. ادعایی است رایج و به‌راستی محل بحث، و پژوهشگران منصف بر سر اینکه میترای رومی اصلاً چقدر به مهرِ ایرانی بدهکار است اختلاف دارند. آنچه محل بحث نیست ساده‌تر است: مردمِ این عرض جغرافیایی، از وقتی که در اینجا مردمی بوده، چرخش تاریکی را نشان کرده‌اند.' }"),

 ("{ t: 'p', x: 'The table is red, and it is red on purpose. Red is the colour of the dawn that is coming, and every important thing on the table has it.' }",
  "{ t: 'p', x: 'The table is red, and it is red on purpose. Red is the colour of the dawn that is coming, and every important thing on the table has it.', fa: 'سفره سرخ است، و عمداً سرخ است. سرخ رنگ همان سپیده‌ای است که در راه است، و هر چیز مهمی که روی سفره است این رنگ را دارد.' }"),

 ("{ t: 'p', x: 'What Yalda actually is, underneath the fruit, is old people talking and young people listening.' }",
  "{ t: 'p', x: 'What Yalda actually is, underneath the fruit, is old people talking and young people listening.', fa: 'یلدا، زیر آن‌همه میوه، در واقع یعنی بزرگ‌ترها حرف بزنند و کوچک‌ترها گوش بدهند.' }"),

 ("{ t: 'p', x: 'Everyone goes to the grandparents. The children are allowed to stay up, which at that age is the entire point. And then, for hours, the stories come out. The village, the war, the people who are gone, the ones who left and did not come back, and how things were, which is a subject with no bottom to it.' }",
  "{ t: 'p', x: 'Everyone goes to the grandparents. The children are allowed to stay up, which at that age is the entire point. And then, for hours, the stories come out. The village, the war, the people who are gone, the ones who left and did not come back, and how things were, which is a subject with no bottom to it.', fa: 'همه به خانهٔ پدربزرگ و مادربزرگ می‌روند. به بچه‌ها اجازه می‌دهند بیدار بمانند، که در آن سن‌وسال تمام ماجرا همین است. و بعد، ساعت‌ها، قصه‌ها بیرون می‌آید. از ده، از جنگ، از کسانی که دیگر نیستند، از آنها که رفتند و برنگشتند، و از اینکه اوضاع چطور بود؛ که موضوعی است بی‌ته.' }"),

 ("{ t: 'h', x: 'And the book comes out' }",
  "{ t: 'h', x: 'And the book comes out', fa: 'و بعد کتاب می‌آید' }"),

 ("{ t: 'mark', x: 'On the longest night of the year, a nation opens a book of poems and asks it what happens next.' }",
  "{ t: 'mark', x: 'On the longest night of the year, a nation opens a book of poems and asks it what happens next.', fa: 'در درازترین شب سال، یک ملت دیوان شعری را می‌گشاید و از آن می‌پرسد بعد چه می‌شود.' }"),

 ("{ t: 'p', x: 'Some families read the Shahnameh instead, or as well, and the children fall asleep somewhere in the middle of Rostam, which is how it is supposed to go.' }",
  "{ t: 'p', x: 'Some families read the Shahnameh instead, or as well, and the children fall asleep somewhere in the middle of Rostam, which is how it is supposed to go.', fa: 'بعضی خانواده‌ها به جایش شاهنامه می‌خوانند، یا هر دو را، و بچه‌ها جایی وسط داستان رستم خوابشان می‌برد؛ که دقیقاً همان‌طوری است که باید باشد.' }"),

 ("{ t: 'aside', x: 'There is no religion in any of this, and there never was. It is a family, a table, and a poet.' }",
  "{ t: 'aside', x: 'There is no religion in any of this, and there never was. It is a family, a table, and a poet.', fa: 'در هیچ‌کدام از اینها دینی در کار نیست، و هرگز هم نبوده. یک خانواده است، یک سفره، و یک شاعر.' }"),

 ("{ t: 'p', x: 'Like Nowruz, Yalda had no protection. It is not Islamic. It comes from the faith that was replaced, it has no doctrine, no clergy, and nothing about it is required of anyone. It should have quietly disappeared a thousand years ago.' }",
  "{ t: 'p', x: 'Like Nowruz, Yalda had no protection. It is not Islamic. It comes from the faith that was replaced, it has no doctrine, no clergy, and nothing about it is required of anyone. It should have quietly disappeared a thousand years ago.', fa: 'یلدا هم مثل نوروز هیچ پشتیبانی نداشت. اسلامی نیست. از همان آیینی می‌آید که جایش را گرفتند، مکتبی ندارد، روحانی‌ای ندارد، و هیچ چیزش بر کسی واجب نیست. باید هزار سال پیش بی‌سروصدا از میان می‌رفت.' }"),

 ("{ t: 'p', x: 'It did not, and the reason is not religious. It is that on the darkest night of the year, in a cold country, an old idea says: go to the people you belong to, sit with them until morning, and do not be alone while the dark is at its worst.' }",
  "{ t: 'p', x: 'It did not, and the reason is not religious. It is that on the darkest night of the year, in a cold country, an old idea says: go to the people you belong to, sit with them until morning, and do not be alone while the dark is at its worst.', fa: 'نرفت، و دلیلش دینی نیست. دلیلش این است که در تاریک‌ترین شب سال، در سرزمینی سرد، اندیشه‌ای کهن می‌گوید: برو پیش کسانی که به آنها تعلق داری، تا صبح کنارشان بنشین، و تا وقتی تاریکی در بدترین حالش است تنها نباش.' }"),

 ("{ t: 'mark', x: 'It survived because the instruction is good, and because it costs nothing, and because it works.' }",
  "{ t: 'mark', x: 'It survived because the instruction is good, and because it costs nothing, and because it works.', fa: 'ماند، چون دستورش خوب است، چون هیچ خرجی ندارد، و چون جواب می‌دهد.' }"),

 ("{ t: 'p', x: 'And it is kept by everyone. Muslims keep it. Jews keep it. Zoroastrians keep it. Iranians who believe in nothing at all keep it. Afghans and Tajiks and Kurds keep it. And Iranians abroad keep it hardest of all, in December, in cities where nobody around them has ever heard of it, cutting a watermelon at midnight because their grandmother did.' }",
  "{ t: 'p', x: 'And it is kept by everyone. Muslims keep it. Jews keep it. Zoroastrians keep it. Iranians who believe in nothing at all keep it. Afghans and Tajiks and Kurds keep it. And Iranians abroad keep it hardest of all, in December, in cities where nobody around them has ever heard of it, cutting a watermelon at midnight because their grandmother did.', fa: 'و همه نگهش می‌دارند. مسلمان نگهش می‌دارد. یهودی نگهش می‌دارد. زرتشتی نگهش می‌دارد. ایرانی‌ای که به هیچ چیز باور ندارد نگهش می‌دارد. افغان و تاجیک و کرد نگهش می‌دارند. و ایرانی‌های خارج از کشور از همه سفت‌تر نگهش می‌دارند؛ در دسامبر، در شهرهایی که هیچ‌کس دور و برشان اسمش را هم نشنیده، نیمه‌شب هندوانه‌ای می‌برند، چون مادربزرگشان می‌برید.' }"),

 ("{ t: 'close', x: 'The night the dark reaches as far as it can go and then begins, from that hour, to lose. Iranians answer it by staying awake in a warm room, with red fruit on the table and a poet in someone hand, and the oldest person present talking until the young ones fall asleep. Nothing is asked of you. Nobody is converted. You simply do not spend the longest night alone. It has outlasted every empire that arrived after it, and it will come again in December, at the minute, whatever else has happened.' }",
  "{ t: 'close', x: 'The night the dark reaches as far as it can go and then begins, from that hour, to lose. Iranians answer it by staying awake in a warm room, with red fruit on the table and a poet in someone hand, and the oldest person present talking until the young ones fall asleep. Nothing is asked of you. Nobody is converted. You simply do not spend the longest night alone. It has outlasted every empire that arrived after it, and it will come again in December, at the minute, whatever else has happened.', fa: 'شبی که تاریکی تا هر کجا که می‌تواند پیش می‌رود و بعد، از همان ساعت، شروع می‌کند به باختن. ایرانی‌ها پاسخش را این‌طور می‌دهند: در اتاقی گرم بیدار می‌مانند، با میوهٔ سرخ روی سفره و دیوان شعری در دست کسی، و بزرگ‌ترین فردِ حاضر حرف می‌زند تا کوچک‌ترها خوابشان ببرد. چیزی از تو خواسته نمی‌شود. کسی به دینی دعوت نمی‌شود. فقط درازترین شب را تنها نمی‌گذرانی. از هر امپراتوری‌ای که پس از آن آمد بیشتر عمر کرده، و دسامبر دوباره می‌آید، سرِ همان دقیقه، هر چه هم که در این میان گذشته باشد.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:55])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
