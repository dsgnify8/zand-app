# -*- coding: utf-8 -*-
# Ferdowsi: the closing chapters.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Through all his reflection runs a profound and tender love of Iran, its land, its people, its honor, and its ancient glory. This love is the beating heart of the Shahnameh, the reason he gave thirty years of his life to it. He wrote to remind his people who they were, and to make sure they never forgot.' }",
  "{ t: 'p', x: 'Through all his reflection runs a profound and tender love of Iran, its land, its people, its honor, and its ancient glory. This love is the beating heart of the Shahnameh, the reason he gave thirty years of his life to it. He wrote to remind his people who they were, and to make sure they never forgot.', fa: 'در سرتاسر این تأمل‌ها، عشقی ژرف و نازک به ایران جاری است؛ به خاکش، به مردمش، به آبرویش، و به شکوه باستانی‌اش. همین عشق قلب تپندهٔ شاهنامه است، و همان دلیلی که سی سال از عمرش را پایش گذاشت. نوشت تا به مردمش یادآوری کند که کیستند، و تا مطمئن شود هرگز از یاد نمی‌برند.' }"),

 ("{ t: 'p', x: 'Ferdowsi died around the year 1020, an old man, in the same town of Tus where he had been born. Legend tells that as his funeral procession left the city, the long-promised reward from the court arrived at last at the gate, too late for the poet to ever see it. He had died without earthly reward.' }",
  "{ t: 'p', x: 'Ferdowsi died around the year 1020, an old man, in the same town of Tus where he had been born. Legend tells that as his funeral procession left the city, the long-promised reward from the court arrived at last at the gate, too late for the poet to ever see it. He had died without earthly reward.', fa: 'فردوسی حدود سال ۱۰۲۰ میلادی، در کهنسالی، در همان شهر توس که زاده شده بود درگذشت. افسانه می‌گوید هنگامی که تابوتش از شهر بیرون می‌رفت، صلهٔ دیرْوعده‌دادهٔ دربار سرانجام به دروازه رسید؛ دیرتر از آنکه شاعر هرگز ببیندش. بی‌آنکه پاداشی این‌جهانی ببیند از دنیا رفت.' }"),

 ("{ t: 'p', x: 'But he had won something far greater than gold. He had known, even as he finished his great work, exactly what he had achieved, and he said so, in words that have proven truer than perhaps any poet has ever spoken of his own work.' }",
  "{ t: 'p', x: 'But he had won something far greater than gold. He had known, even as he finished his great work, exactly what he had achieved, and he said so, in words that have proven truer than perhaps any poet has ever spoken of his own work.', fa: 'اما چیزی به دست آورده بود بسی گران‌بهاتر از زر. همان دم که کار سترگش را به پایان می‌رساند، دقیقاً می‌دانست چه کرده است، و گفتش؛ با واژه‌هایی که شاید راست‌تر از هر سخنی درآمده‌اند که شاعری تاکنون دربارهٔ کار خودش گفته باشد.' }"),

 ("{ t: 'p', x: 'He was right. Because of the Shahnameh, the Persian language did not fade but flourished, and became one of the great literary tongues of the world. Every poet who came after, Rumi, Saadi, Hafez, Khayyam, wrote in the language that Ferdowsi had preserved and ennobled. He is, in the truest sense, the father of them all.' }",
  "{ t: 'p', x: 'He was right. Because of the Shahnameh, the Persian language did not fade but flourished, and became one of the great literary tongues of the world. Every poet who came after, Rumi, Saadi, Hafez, Khayyam, wrote in the language that Ferdowsi had preserved and ennobled. He is, in the truest sense, the father of them all.', fa: 'و راست می‌گفت. به برکت شاهنامه، زبان فارسی نه‌تنها رنگ نباخت که بالید، و یکی از زبان‌های بزرگ ادبی جهان شد. هر شاعری که پس از او آمد، مولانا و سعدی و حافظ و خیام، به زبانی سرود که فردوسی نگاهش داشته و بلندش کرده بود. او، به راست‌ترین معنا، پدر همهٔ آنان است.' }"),

 ("""{ t: 'p', x: 'For a thousand years his verses have been recited in palaces and in village homes, memorized by the learned and the humble alike, told to children and treasured by kings. The Shahnameh became, and remains, the national epic of Iran, the book that holds the nation\\'s soul.' }""",
  """{ t: 'p', x: 'For a thousand years his verses have been recited in palaces and in village homes, memorized by the learned and the humble alike, told to children and treasured by kings. The Shahnameh became, and remains, the national epic of Iran, the book that holds the nation\\'s soul.', fa: 'هزار سال است که بیت‌هایش را در کاخ‌ها و در خانه‌های روستایی خوانده‌اند، دانشمند و مردم ساده هر دو از بر کرده‌اند، برای کودکان گفته‌اند و شاهان عزیزش داشته‌اند. شاهنامه حماسهٔ ملی ایران شد و مانده است؛ کتابی که جان این ملت را در خود نگاه داشته.' }"""),

 ("{ t: 'p', x: 'This has been a glimpse of Ferdowsi, the poet of Tus, one of the greatest who ever lived. He was a man who gave everything he had, his fortune, his years, his very life, to a single, magnificent purpose: to save the language and the memory of his people, and to give them back their voice.' }",
  "{ t: 'p', x: 'This has been a glimpse of Ferdowsi, the poet of Tus, one of the greatest who ever lived. He was a man who gave everything he had, his fortune, his years, his very life, to a single, magnificent purpose: to save the language and the memory of his people, and to give them back their voice.', fa: 'این نگاهی بود کوتاه به فردوسی، حکیم توس، از بزرگ‌ترین شاعرانی که زیسته‌اند. مردی که هرچه داشت، دارایی‌اش، سال‌هایش، خودِ زندگی‌اش، پای یک هدف باشکوه گذاشت: نگاه داشتن زبان و خاطرهٔ مردمش، و بازگرداندن صدایشان به آنان.' }"),

 ("{ t: 'p', x: 'He succeeded beyond any dream. In giving Iran the Shahnameh, he gave it back itself. And so, just as he foretold, he did not die. In every Persian word of beauty spoken in the thousand years since, Ferdowsi lives on.' }",
  "{ t: 'p', x: 'He succeeded beyond any dream. In giving Iran the Shahnameh, he gave it back itself. And so, just as he foretold, he did not die. In every Persian word of beauty spoken in the thousand years since, Ferdowsi lives on.', fa: 'کامیابی‌اش از هر رؤیایی فراتر رفت. با بخشیدن شاهنامه به ایران، خودِ ایران را به او بازگرداند. و چنان‌که خود پیش‌بینی کرده بود، نمرد. در هر واژهٔ زیبای فارسی که در هزار سال گذشته بر زبان آمده، فردوسی زنده است.' }"),
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
