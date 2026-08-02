# -*- coding: utf-8 -*-
# Ferdowsi: the thirty years. Register is that of a Persian book about a
# Persian book — پهلوان not "champion", نظم not "verse form", سره for pure.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Around the age of forty, Ferdowsi took up a task so vast it would consume the rest of his life. He set out to gather every ancient story of Iran, its myths and legends, its kings and champions, from the first man to the last Sasanian king, and to weave them all into a single great epic, written in pure and noble Persian verse.' }",
  "{ t: 'p', x: 'Around the age of forty, Ferdowsi took up a task so vast it would consume the rest of his life. He set out to gather every ancient story of Iran, its myths and legends, its kings and champions, from the first man to the last Sasanian king, and to weave them all into a single great epic, written in pure and noble Persian verse.', fa: 'نزدیک چهل سالگی، فردوسی کاری را بر دوش گرفت چنان سترگ که باقی عمرش را بلعید. بر آن شد همهٔ داستان‌های کهن ایران را گرد آورد، اسطوره‌ها و افسانه‌ها، شاهان و پهلوانان، از نخستین انسان تا واپسین شهریار ساسانی، و همه را در یک حماسهٔ بزرگ به هم ببافد؛ به نظمی از فارسی سره و بلند.' }"),

 ("{ t: 'p', x: 'He would call it the Shahnameh, the Book of Kings. It would take him more than thirty years.' }",
  "{ t: 'p', x: 'He would call it the Shahnameh, the Book of Kings. It would take him more than thirty years.', fa: 'نامش را شاهنامه گذاشت، نامهٔ شاهان. بیش از سی سال از او گرفت.' }"),

 ("{ t: 'p', x: 'It was a labor of staggering devotion. Year after year, through the seasons and the decades, he worked, gathering the old sources, shaping the verse, refining every line. He poured his fortune, his health, and his youth into the work, and as the years passed he grew old over his pages, watching his wealth dwindle and his hair turn white in service of the task.' }",
  "{ t: 'p', x: 'It was a labor of staggering devotion. Year after year, through the seasons and the decades, he worked, gathering the old sources, shaping the verse, refining every line. He poured his fortune, his health, and his youth into the work, and as the years passed he grew old over his pages, watching his wealth dwindle and his hair turn white in service of the task.', fa: 'رنجی بود از سرِ سرسپردگی محض. سال از پی سال، در گذر فصل‌ها و دهه‌ها، کار کرد؛ سرچشمه‌های کهن را گرد آورد، بیت را ساخت و هر مصراع را پرداخت. دارایی و تندرستی و جوانی‌اش را در این کار ریخت، و سال‌ها که گذشت بر سر برگ‌هایش پیر شد؛ دید که ثروتش آب می‌رود و مویش در خدمت این کار سپید می‌شود.' }"),

 ("{ t: 'p', x: 'He was driven not by hope of riches, but by something deeper: the conviction that if he did not save these stories, and the language that carried them, they might be lost forever. He was fighting, alone at his desk, to keep the soul of a nation alive.' }",
  "{ t: 'p', x: 'He was driven not by hope of riches, but by something deeper: the conviction that if he did not save these stories, and the language that carried them, they might be lost forever. He was fighting, alone at his desk, to keep the soul of a nation alive.', fa: 'آنچه او را پیش می‌راند امید به ثروت نبود، چیزی ژرف‌تر بود: این باور که اگر او این داستان‌ها و زبانی را که حاملشان بود نگاه ندارد، شاید برای همیشه از دست بروند. تنها، پشت میز خود، می‌جنگید تا جان یک ملت زنده بماند.' }"),

 ("""{ t: 'p', x: 'He wrote in a Persian deliberately purified, reaching for the old and native words, turning away wherever he could from the Arabic that had flooded the tongue. It was a conscious act. He would prove that Persian could carry the whole weight of a nation\\'s glory, that it needed to borrow from no one.' }""",
  """{ t: 'p', x: 'He wrote in a Persian deliberately purified, reaching for the old and native words, turning away wherever he could from the Arabic that had flooded the tongue. It was a conscious act. He would prove that Persian could carry the whole weight of a nation\\'s glory, that it needed to borrow from no one.', fa: 'به فارسی‌ای نوشت که آگاهانه پیراسته بود؛ واژه‌های کهن و بومی را می‌جست و هر جا می‌توانست از عربی‌ای که زبان را فرا گرفته بود روی می‌گرداند. کاری بود از سر آگاهی. می‌خواست ثابت کند فارسی می‌تواند تمام بار شکوه یک ملت را بر دوش بکشد و نیازی به وام گرفتن از کسی ندارد.' }"""),
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
