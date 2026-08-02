# -*- coding: utf-8 -*-
# The Sasanian Empire: splitimg bodies, the call block, ribbon and numstats.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 # splitimg and call bodies
 ("x: 'Ardashir overthrew the Parthians and founded a new empire that consciously looked back to the Achaemenids of Cyrus and Darius, seeking to restore the true glory of Persia.'",
  "x: 'Ardashir overthrew the Parthians and founded a new empire that consciously looked back to the Achaemenids of Cyrus and Darius, seeking to restore the true glory of Persia.', fa: 'اردشیر اشکانیان را برانداخت و امپراتوری تازه‌ای بنیان نهاد که آگاهانه رو به هخامنشیانِ کوروش و داریوش داشت، و می‌خواست شکوه راستین ایران را بازگرداند.'"),

 ("x: 'Great fire temples burned across the empire, their flames a symbol of the divine light. Some, it was said, had burned without pause for centuries.'",
  "x: 'Great fire temples burned across the empire, their flames a symbol of the divine light. Some, it was said, had burned without pause for centuries.', fa: 'آتشکده‌های بزرگ سراسر امپراتوری فروزان بودند و شعله‌هایشان نماد روشنایی ایزدی بود. می‌گفتند برخی از آنها قرن‌ها بی‌آنکه لحظه‌ای خاموش شوند سوخته‌اند.'"),

 ("x: 'Zoroastrianism is one of the great treasures of Iranian heritage, and its full story, its prophet, its scripture, and its enduring influence, deserves a telling all its own, which it will one day have.'",
  "x: 'Zoroastrianism is one of the great treasures of Iranian heritage, and its full story, its prophet, its scripture, and its enduring influence, deserves a telling all its own, which it will one day have.', fa: 'آیین زرتشتی از گنجینه‌های بزرگ میراث ایرانی است، و روایت کامل آن، پیامبرش، کتابش و اثر ماندگارش، شایستهٔ حکایتی است از آنِ خود؛ حکایتی که روزی خواهد داشت.'"),

 ("x: 'Shapur the Great defeated three Roman emperors and captured one, Valerian, in battle. His victories are carved into the rock reliefs of Persia, where they endure to this day.'",
  "x: 'Shapur the Great defeated three Roman emperors and captured one, Valerian, in battle. His victories are carved into the rock reliefs of Persia, where they endure to this day.', fa: 'شاپور بزرگ سه امپراتور روم را شکست داد و یکی از آنان، والرین، را در نبرد به اسارت گرفت. پیروزی‌هایش بر نقش‌برجسته‌های سنگی ایران کنده شده و تا امروز بر جا مانده است.'"),

 ("x: 'Khosrow the First was remembered across the East as the model of the just and wise king. Under him, Sasanian Persia reached its golden height.'",
  "x: 'Khosrow the First was remembered across the East as the model of the just and wise king. Under him, Sasanian Persia reached its golden height.', fa: 'خسرو یکم را در سراسر شرق نمونهٔ شاه دادگر و خردمند می‌دانستند. در روزگار او، ایران ساسانی به اوج طلایی خود رسید.'"),

 # ribbon
 ("{ year: '602', label: 'The last great war with Byzantium begins' }",
  "{ year: '602', label: 'The last great war with Byzantium begins', labelFa: 'واپسین جنگ بزرگ با بیزانس آغاز می‌شود' }"),
 ("{ year: '614', label: 'Persia conquers Jerusalem and the Holy Land' }",
  "{ year: '614', label: 'Persia conquers Jerusalem and the Holy Land', labelFa: 'ایران اورشلیم و سرزمین مقدس را می‌گیرد' }"),
 ("{ year: '626', label: 'The Sasanian army reaches Constantinople' }",
  "{ year: '626', label: 'The Sasanian army reaches Constantinople', labelFa: 'سپاه ساسانی به قسطنطنیه می‌رسد' }"),
 ("{ year: '628', label: 'The war collapses; both empires lie exhausted' }",
  "{ year: '628', label: 'The war collapses; both empires lie exhausted', labelFa: 'جنگ فرو می‌پاشد؛ هر دو امپراتوری از پا افتاده‌اند' }"),

 # numstat, Shapur
 ("{ n: '3', label: 'Roman emperors defeated by Shapur I' }",
  "{ n: '3', label: 'Roman emperors defeated by Shapur I', labelFa: 'امپراتور رومی که شاپور یکم شکست داد' }"),
 ("{ n: '260 CE', label: 'The Roman emperor Valerian captured' }",
  "{ n: '260 CE', nFa: '۲۶۰ م', label: 'The Roman emperor Valerian captured', labelFa: 'اسارت والرین، امپراتور روم' }"),
 ("{ n: '400+', label: 'Years as a great world power' }",
  "{ n: '400+', label: 'Years as a great world power', labelFa: 'سال در جایگاه یک قدرت بزرگ جهانی' }"),
 ("{ n: 'Rome', label: 'Its equal and rival for centuries' }",
  "{ n: 'Rome', nFa: 'روم', label: 'Its equal and rival for centuries', labelFa: 'هماورد و رقیبش در طول قرن‌ها' }"),

 # numstat, the fall
 ("{ n: '636', label: 'The battle of Qadisiyyah breaks the Persian army' }",
  "{ n: '636', label: 'The battle of Qadisiyyah breaks the Persian army', labelFa: 'نبرد قادسیه سپاه ایران را در هم می‌شکند' }"),
 ("{ n: '637', label: 'The capital, Ctesiphon, falls' }",
  "{ n: '637', label: 'The capital, Ctesiphon, falls', labelFa: 'پایتخت، تیسفون، فرو می‌افتد' }"),
 ("{ n: '642', label: 'The battle of Nahavand, the final defeat' }",
  "{ n: '642', label: 'The battle of Nahavand, the final defeat', labelFa: 'نبرد نهاوند، شکست نهایی' }"),
 ("{ n: '651', label: 'The last Sasanian king dies; the empire ends' }",
  "{ n: '651', label: 'The last Sasanian king dies; the empire ends', labelFa: 'واپسین شهریار ساسانی می‌میرد؛ امپراتوری به پایان می‌رسد' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:65])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
