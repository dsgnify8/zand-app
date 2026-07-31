# -*- coding: utf-8 -*-
# Cyrus, chapter six: the death of a king.

p = "constants/education.ts"
s = open(p).read()

if "بزرگ‌ترین شاهان نیز" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'Even the greatest of kings must meet his end. In his final years Cyrus turned to secure the far northeastern frontier of his empire, where the fierce nomadic peoples of Central Asia raided the borders. It was there, around 530 BCE, that he met his death, campaigning against a people the Greeks called the Massagetae.' }",
  "{ t: 'p', x: 'Even the greatest of kings must meet his end. In his final years Cyrus turned to secure the far northeastern frontier of his empire, where the fierce nomadic peoples of Central Asia raided the borders. It was there, around 530 BCE, that he met his death, campaigning against a people the Greeks called the Massagetae.', fa: 'بزرگ‌ترین شاهان نیز روزی به پایان خود می‌رسند. کوروش در واپسین سال‌هایش رو به مرزهای دوردست شمال شرقی امپراتوری‌اش آورد، جایی که کوچ‌نشینان سرسخت آسیای میانه بر مرزها می‌تاختند. همان‌جا بود، حدود ۵۳۰ پیش از میلاد، که مرگش فرا رسید، در لشکرکشی بر مردمی که یونانیان ماساگت می‌خواندندشان.' }"),

 ("""{ t: 'p', x: 'The accounts of his end differ, as befits a figure who had already passed into legend. Herodotus tells a dramatic tale of the warrior queen Tomyris, who ruled the Massagetae, and whose son fell into Cyrus\\'s hands and died. In her grief and fury, she is said to have sworn vengeance.' }""",
  """{ t: 'p', x: 'The accounts of his end differ, as befits a figure who had already passed into legend. Herodotus tells a dramatic tale of the warrior queen Tomyris, who ruled the Massagetae, and whose son fell into Cyrus\\'s hands and died. In her grief and fury, she is said to have sworn vengeance.', fa: 'روایت‌های پایان کارش با هم نمی‌خوانند، چنان‌که شایستهٔ کسی است که پیش از آن به افسانه پیوسته بود. هرودوت داستانی پرشور از تهم‌رییس می‌آورد، ملکهٔ جنگاور ماساگت‌ها، که پسرش به دست کوروش افتاد و کشته شد. گفته‌اند که او در سوگ و خشم خود سوگند کین خورد.' }"""),

 ("{ t: 'p', x: 'In the great battle that followed, Herodotus writes, Cyrus was killed and his army defeated. It was, he says, the most violent battle fought among barbarian peoples in all his knowledge. Whether the tale is true in every detail, or grew in the telling, the core is remembered: the great king fell in the field, far from home, still leading his armies.' }",
  "{ t: 'p', x: 'In the great battle that followed, Herodotus writes, Cyrus was killed and his army defeated. It was, he says, the most violent battle fought among barbarian peoples in all his knowledge. Whether the tale is true in every detail, or grew in the telling, the core is remembered: the great king fell in the field, far from home, still leading his armies.', fa: 'هرودوت می‌نویسد در نبرد بزرگی که در پی آمد، کوروش کشته شد و سپاهش شکست خورد. به گفتهٔ او، خونین‌ترین نبردی بود که در میان مردمان بیگانه سراغ داشت. این روایت در همهٔ جزئیاتش درست باشد یا در بازگویی بزرگ شده باشد، مغزش در یاد مانده است: شاه بزرگ در میدان افتاد، دور از خانه، در حالی که هنوز خود سپاهش را می‌برد.' }"),

 ("{ t: 'p', x: 'His body was brought back across the length of the empire he had built, to rest in the land of his birth, at his capital of Pasargadae.' }",
  "{ t: 'p', x: 'His body was brought back across the length of the empire he had built, to rest in the land of his birth, at his capital of Pasargadae.', fa: 'پیکرش را در سراسر درازای امپراتوری‌ای که ساخته بود بازگرداندند تا در زادبومش بیارامد، در پایتختش پاسارگاد.' }"),

 ("{ t: 'h', x: 'The tomb at Pasargadae' }",
  "{ t: 'h', x: 'The tomb at Pasargadae', fa: 'آرامگاه پاسارگاد' }"),

 ("{ t: 'p', x: 'There, upon the plain of Pasargadae, stands his tomb, a simple and noble structure of pale stone that has endured for two and a half thousand years. It survived even the coming of Alexander the Great, who, conquering Persia two centuries later, is said to have honored the tomb of Cyrus and ordered it protected.' }",
  "{ t: 'p', x: 'There, upon the plain of Pasargadae, stands his tomb, a simple and noble structure of pale stone that has endured for two and a half thousand years. It survived even the coming of Alexander the Great, who, conquering Persia two centuries later, is said to have honored the tomb of Cyrus and ordered it protected.', fa: 'آنجا، بر دشت پاسارگاد، آرامگاهش ایستاده است؛ بنایی ساده و شکوهمند از سنگ روشن که دو هزار و پانصد سال دوام آورده است. حتی از آمدن اسکندر هم جان به در برد؛ او که دو قرن بعد پارس را گشود، گفته‌اند آرامگاه کوروش را گرامی داشت و فرمان داد از آن نگهداری کنند.' }"),

 ("{ t: 'p', x: 'An inscription said to have once stood there carried words of quiet dignity, a king asking not for glory but for peace, reminding the passer by that he too was mortal.' }",
  "{ t: 'p', x: 'An inscription said to have once stood there carried words of quiet dignity, a king asking not for glory but for peace, reminding the passer by that he too was mortal.', fa: 'گفته‌اند روزی سنگ‌نوشته‌ای آنجا بوده با کلماتی آرام و باوقار؛ شاهی که نه شکوه، که آسودگی می‌خواست، و به رهگذر یادآوری می‌کرد که او نیز میرا بوده است.' }"),

 ("{ t: 'quotebig', x: 'O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.' }",
  "{ t: 'quotebig', x: 'O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.', fa: 'ای انسان، هر که هستی و از هر کجا که می‌آیی، من کوروشم که برای پارسیان امپراتوری را به دست آوردم. بر این اندک خاکی که تنم را پوشانده رشک مبر.' }"),
]

# SKIP_MISSING: apply what matches, report the rest rather than aborting
applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1)
        applied += 1
    else:
        skipped.append(a[:70])
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)

open(p, "w").write(s)
print("chapter six translated:", len(PAIRS), "blocks")
