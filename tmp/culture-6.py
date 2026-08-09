# -*- coding: utf-8 -*-
# Culture: تختی, and the close of the javanmardi chapter.
# The "give it to a Persian man and it will get done" paragraph is the one
# that has to land — it is the chapter speaking to its own readers.

p = "constants/culture.ts"
s = open(p).read()

PAIRS = [
 ("x: 'Wrestling a Russian opponent who had an injured right leg, Takhti did not touch it once. He wrestled the man honestly, on his strength, and won without exploiting the injury. The opponent mother is said to have kissed him afterward.'",
  "x: 'Wrestling a Russian opponent who had an injured right leg, Takhti did not touch it once. He wrestled the man honestly, on his strength, and won without exploiting the injury. The opponent mother is said to have kissed him afterward.', fa: 'در کشتی با حریفی روس که پای راستش آسیب دیده بود، تختی حتی یک بار هم به آن پا دست نزد. صادقانه و با تکیه بر توان خودش کشتی گرفت و بی‌آنکه از آن آسیب سوءاستفاده کند برد. می‌گویند مادرِ آن حریف بعد از مسابقه او را بوسید.'"),

 ("{ t: 'p', x: 'And when an earthquake destroyed a town, Takhti went into the streets of Tehran with a collection tin himself, in person, and people gave him everything they had because it was him. He died in 1968, and the circumstances are still argued about, and his funeral filled the city.' }",
  "{ t: 'p', x: 'And when an earthquake destroyed a town, Takhti went into the streets of Tehran with a collection tin himself, in person, and people gave him everything they had because it was him. He died in 1968, and the circumstances are still argued about, and his funeral filled the city.', fa: 'و وقتی زلزله شهری را با خاک یکسان کرد، تختی خودش، شخصاً، با یک صندوق کمک به خیابان‌های تهران رفت؛ و مردم هر چه داشتند به او دادند، فقط چون او بود. در سال ۱۳۴۶ درگذشت، و هنوز بر سر چگونگی مرگش بحث است، و تشییع جنازه‌اش شهر را پر کرد.' }"),

 ("{ t: 'h', x: 'And it is still in the room' }",
  "{ t: 'h', x: 'And it is still in the room', fa: 'و هنوز هم هست' }"),

 ("{ t: 'p', x: 'This is not history. Ask around any Iranian family and you will hear the same thing said with total confidence: give it to a Persian man and it will get done. Whatever it is. The car, the paperwork, the impossible favour, the thing that officially cannot be arranged.' }",
  "{ t: 'p', x: 'This is not history. Ask around any Iranian family and you will hear the same thing said with total confidence: give it to a Persian man and it will get done. Whatever it is. The car, the paperwork, the impossible favour, the thing that officially cannot be arranged.', fa: 'این تاریخ نیست. در هر خانوادهٔ ایرانی که بگردی، همین یک جمله را با اطمینان کامل می‌شنوی: بسپارش به یک مرد ایرانی، انجام می‌شود. حالا هر چه که باشد. ماشین، کارهای اداری، آن لطفِ ناممکن، و همان چیزی که رسماً هیچ راهی برایش نیست.' }"),

 ("{ t: 'p', x: 'And the pride in it is real. To be the one who was relied on and delivered is, quietly, the whole thing a Persian man is playing for. It is javanmardi with the poetry taken off: not being asked twice, not making a fuss, and not letting the person who trusted you down.' }",
  "{ t: 'p', x: 'And the pride in it is real. To be the one who was relied on and delivered is, quietly, the whole thing a Persian man is playing for. It is javanmardi with the poetry taken off: not being asked twice, not making a fuss, and not letting the person who trusted you down.', fa: 'و غروری که در این کار هست واقعی است. اینکه تو همان کسی باشی که روی او حساب کردند و از پسش برآمد، بی‌سروصدا، تمام آن چیزی است که یک مرد ایرانی برایش بازی می‌کند. این همان جوانمردی است که شعر را از رویش برداشته باشی: اینکه لازم نباشد دو بار از تو بخواهند، اینکه شلوغش نکنی، و اینکه کسی را که به تو اعتماد کرده زمین نگذاری.' }"),

 ("{ t: 'mark', x: 'You do not have to ask a second time. That is the entire compliment, and it is the highest one available.' }",
  "{ t: 'mark', x: 'You do not have to ask a second time. That is the entire compliment, and it is the highest one available.', fa: 'لازم نیست دو بار بخواهی. تمام آن تعریف همین است، و بالاترین تعریفی است که وجود دارد.' }"),

 ("{ t: 'close', x: 'A country that has produced conquerors and kings and poets chose, as the man it loves most, a wrestler who would not touch an injured leg.' }",
  "{ t: 'close', x: 'A country that has produced conquerors and kings and poets chose, as the man it loves most, a wrestler who would not touch an injured leg.', fa: 'کشوری که فاتح و شاه و شاعر تحویل جهان داده، محبوب‌ترین مردش را کسی انتخاب کرد که کشتی‌گیری بود و حاضر نشد به یک پای آسیب‌دیده دست بزند.' }"),

 ("{ t: 'lead', x: 'A Persian table is not laid with a meal. It is laid with everything you could possibly need, and then more, in case you need that too.'",
  "{ t: 'lead', x: 'A Persian table is not laid with a meal. It is laid with everything you could possibly need, and then more, in case you need that too.', fa: 'سفرهٔ ایرانی را با یک وعده غذا نمی‌چینند. با هر چیزی می‌چینند که ممکن است لازمت شود، و بعد بیشتر از آن، محض احتیاط که شاید آن را هم بخواهی.'"),
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
