# -*- coding: utf-8 -*-
# The Afsharid dynasty, third batch: the treasures, the gifts, the shadow.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Among the treasures he took were the most legendary jewels in the world. He carried away the fabled Peacock Throne of the Mughal emperors, glittering with gems, which became the very symbol of the Persian monarchy for centuries after.' }",
  "{ t: 'p', x: 'Among the treasures he took were the most legendary jewels in the world. He carried away the fabled Peacock Throne of the Mughal emperors, glittering with gems, which became the very symbol of the Persian monarchy for centuries after.', fa: 'در میان گنج‌هایی که برد، افسانه‌ای‌ترین جواهرات جهان بود. تخت طاووس پادشاهان گورکانی را با خود آورد، آن تختِ پر از نگین درخشان، که قرن‌ها پس از آن به نماد خودِ پادشاهی ایران بدل شد.' }"),

 ("""{ t: 'p', x: 'And among the jewels were two of the most famous diamonds ever known: the Darya-ye Noor, the Sea of Light, which remains in Iran to this day, and the Koh-i-Noor, the Mountain of Light, whose later journey would carry it, in time, to the crown jewels of England. The treasures of Nader\\'s Indian campaign became legends in their own right.' }""",
  """{ t: 'p', x: 'And among the jewels were two of the most famous diamonds ever known: the Darya-ye Noor, the Sea of Light, which remains in Iran to this day, and the Koh-i-Noor, the Mountain of Light, whose later journey would carry it, in time, to the crown jewels of England. The treasures of Nader\\'s Indian campaign became legends in their own right.', fa: 'و در میان جواهرات، دو تن از نامدارترین الماس‌های تاریخ بودند: دریای نور، که تا امروز در ایران مانده است، و کوه نور، که سفر بعدی‌اش سرانجام آن را به جواهرات سلطنتی انگلستان رساند. گنج‌های لشکرکشی هند نادر، خود افسانه شدند.' }"""),

 ("{ t: 'p', x: 'Nader was a man of dazzling gifts, and his mind ranged far beyond the battlefield. He was a military innovator who understood artillery and the modern arts of war better than almost anyone in the East, and he even sought to build a navy for Iran on the Persian Gulf, a rare and forward-looking ambition.' }",
  "{ t: 'p', x: 'Nader was a man of dazzling gifts, and his mind ranged far beyond the battlefield. He was a military innovator who understood artillery and the modern arts of war better than almost anyone in the East, and he even sought to build a navy for Iran on the Persian Gulf, a rare and forward-looking ambition.', fa: 'نادر مردی بود با توانایی‌های خیره‌کننده، و ذهنش بسی فراتر از میدان جنگ می‌رفت. نوآوری نظامی بود که توپخانه و فنون نوین جنگ را بهتر از تقریباً هر کس دیگری در شرق می‌فهمید، و حتی کوشید برای ایران در خلیج فارس نیروی دریایی بسازد؛ آرزویی کمیاب و آینده‌نگر.' }"),

 ("{ t: 'p', x: 'He was also, in matters of faith, a pragmatist who tried to heal the ancient rift between the Sunni and Shia branches of Islam, hoping to unite them and end centuries of division, a strikingly bold idea for his age.' }",
  "{ t: 'p', x: 'He was also, in matters of faith, a pragmatist who tried to heal the ancient rift between the Sunni and Shia branches of Islam, hoping to unite them and end centuries of division, a strikingly bold idea for his age.', fa: 'در کار دین نیز مردی عمل‌گرا بود؛ کوشید شکاف کهن میان شیعه و سنی را التیام بخشد، به امید آنکه آن دو را یکی کند و به قرن‌ها جدایی پایان دهد. اندیشه‌ای بود به‌شدت جسورانه برای روزگار خودش.' }"),

 ("{ t: 'h', x: 'The darkening of a great mind' }",
  "{ t: 'h', x: 'The darkening of a great mind', fa: 'تیره شدن یک ذهن بزرگ' }"),

 ("{ t: 'p', x: 'But there was a shadow over his greatness, and it grew darker with the years. The endless wars and the burdens of rule seemed to poison his mind. He grew suspicious, harsh, and terribly cruel, crushing his own people with heavy taxes to fund his campaigns and answering the smallest disloyalty with horrifying punishment.' }",
  "{ t: 'p', x: 'But there was a shadow over his greatness, and it grew darker with the years. The endless wars and the burdens of rule seemed to poison his mind. He grew suspicious, harsh, and terribly cruel, crushing his own people with heavy taxes to fund his campaigns and answering the smallest disloyalty with horrifying punishment.', fa: 'اما سایه‌ای بر بزرگی‌اش افتاده بود، و سال به سال تیره‌تر می‌شد. گویی جنگ‌های بی‌پایان و بار فرمانروایی ذهنش را زهرآگین کرد. بدگمان شد و سختگیر و به‌شدت بی‌رحم؛ مردم خودش را زیر مالیات‌های سنگین برای تأمین لشکرکشی‌هایش خرد کرد و کوچک‌ترین نافرمانی را با کیفری هولناک پاسخ داد.' }"),

 ("{ t: 'p', x: 'In a fit of paranoia he had his own son blinded, suspecting him of treason, a deed he is said to have regretted for the rest of his life. The savior of Iran had become its tormentor, and the brilliant mind that had raised the nation now cast a long and terrible shadow over it.' }",
  "{ t: 'p', x: 'In a fit of paranoia he had his own son blinded, suspecting him of treason, a deed he is said to have regretted for the rest of his life. The savior of Iran had become its tormentor, and the brilliant mind that had raised the nation now cast a long and terrible shadow over it.', fa: 'در تشنج بدگمانی، فرمان داد چشمان پسر خودش را کور کنند، چون به خیانتش مظنون شده بود؛ کاری که گفته‌اند تا پایان عمر از آن پشیمان ماند. ناجی ایران به عذاب‌دهندهٔ آن بدل شده بود، و همان ذهن درخشانی که این ملت را برافراشته بود، اکنون سایه‌ای دراز و هولناک بر آن می‌انداخت.' }"),

 ("{ t: 'markline', x: 'The sword that saved Iran turned, in the end, against its own people.' }",
  "{ t: 'markline', x: 'The sword that saved Iran turned, in the end, against its own people.', fa: 'شمشیری که ایران را نجات داد، سرانجام رو به مردم خودش گرداند.' }"),
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
