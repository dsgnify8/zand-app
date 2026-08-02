# -*- coding: utf-8 -*-
# Two Centuries of Silence: the verse, and the closing.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'There is a line, long attributed to him, that captures all he did and all he hoped. Having labored so long, he looked upon his finished work and understood what he had built, a monument no conqueror could throw down.' }",
  "{ t: 'p', x: 'There is a line, long attributed to him, that captures all he did and all he hoped. Having labored so long, he looked upon his finished work and understood what he had built, a monument no conqueror could throw down.', fa: 'بیتی هست که دیرزمانی به او نسبت داده‌اند و همهٔ آنچه کرد و همهٔ آنچه امید داشت در آن گرد آمده است. پس از آن‌همه رنج، به کار به‌پایان‌رسیدهٔ خویش نگریست و دریافت چه برافراشته است: بنایی که هیچ فاتحی توان فرو ریختنش را ندارد.' }"),

 # Ferdowsi's own verse, restored rather than translated back
 ("{ t: 'quotebig', x: 'I have suffered greatly these thirty years, but I have revived the Persians with this Persian tongue.' }",
  "{ t: 'quotebig', x: 'I have suffered greatly these thirty years, but I have revived the Persians with this Persian tongue.', fa: 'بسی رنج بردم در این سال سی\\u200Cعجم زنده کردم بدین پارسی' }"),

 ("{ t: 'p', x: 'Ferdowsi died, it is said, without the reward he had been promised, and legend tells that the gift arrived at the gate of his city just as his funeral procession left it. But he had won a prize greater than gold. He had given his people back their voice, and it would never fall silent again.' }",
  "{ t: 'p', x: 'Ferdowsi died, it is said, without the reward he had been promised, and legend tells that the gift arrived at the gate of his city just as his funeral procession left it. But he had won a prize greater than gold. He had given his people back their voice, and it would never fall silent again.', fa: 'گفته‌اند فردوسی بی‌آنکه پاداش وعده‌داده‌شده را ببیند درگذشت، و افسانه می‌گوید که آن هدیه درست هنگامی به دروازهٔ شهرش رسید که تابوتش از آن بیرون می‌رفت. اما او جایزه‌ای بزرگ‌تر از زر به دست آورده بود: صدای مردمش را به آنان بازگردانده بود، و آن صدا دیگر هرگز خاموش نشد.' }"),

 ("{ t: 'p', x: 'Because of the Shahnameh, the Persian language survived, flourished, and became one of the great literary tongues of the world. The poets who came after, Rumi, Hafez, Saadi, Khayyam, all wrote in the language that Ferdowsi had saved. Every Persian word of beauty spoken in the thousand years since owes something to the poet of Tus.' }",
  "{ t: 'p', x: 'Because of the Shahnameh, the Persian language survived, flourished, and became one of the great literary tongues of the world. The poets who came after, Rumi, Hafez, Saadi, Khayyam, all wrote in the language that Ferdowsi had saved. Every Persian word of beauty spoken in the thousand years since owes something to the poet of Tus.', fa: 'به برکت شاهنامه، زبان فارسی ماند، بالید، و به یکی از زبان‌های بزرگ ادبی جهان بدل شد. شاعرانی که پس از او آمدند، مولانا و حافظ و سعدی و خیام، همه به زبانی سرودند که فردوسی نگاهش داشته بود. هر واژهٔ زیبای فارسی که در هزار سال گذشته بر زبان آمده، وامدار حکیم توس است.' }"),

 ("{ t: 'markline', x: 'The two centuries of silence ended, and Iran has never stopped speaking since.' }",
  "{ t: 'markline', x: 'The two centuries of silence ended, and Iran has never stopped speaking since.', fa: 'دو قرن سکوت به پایان رسید، و ایران از آن پس هرگز از سخن گفتن باز نایستاد.' }"),

 ("""{ t: 'p', x: 'This has been a glimpse of the two centuries of silence, and of its ending. It is, in truth, one of the most moving stories in all of Iran\\'s long history, the story of a people who lost everything but their soul, who held that soul in secret through the long dark, and who found in a single devoted poet the voice to speak it aloud once more.' }""",
  """{ t: 'p', x: 'This has been a glimpse of the two centuries of silence, and of its ending. It is, in truth, one of the most moving stories in all of Iran\\'s long history, the story of a people who lost everything but their soul, who held that soul in secret through the long dark, and who found in a single devoted poet the voice to speak it aloud once more.', fa: 'این نگاهی بود کوتاه به دو قرن سکوت و به پایان آن. به‌راستی یکی از تکان‌دهنده‌ترین داستان‌های تاریخ بلند ایران است: داستان مردمی که همه‌چیز جز جان خود را از دست دادند، آن جان را در تاریکی دراز پنهانی نگاه داشتند، و سرانجام در یک شاعر یگانه صدایی یافتند تا دوباره آن را بلند بر زبان آورد.' }"""),

 ("{ t: 'p', x: 'Iran did not survive the conquest by resisting change, but by absorbing it, transforming it, and remaining, through it all, unmistakably itself. The silence was real, and it was long. But it was not the end. It was the deep breath before the nation spoke again, and what it said next would be beautiful beyond measure.' }",
  "{ t: 'p', x: 'Iran did not survive the conquest by resisting change, but by absorbing it, transforming it, and remaining, through it all, unmistakably itself. The silence was real, and it was long. But it was not the end. It was the deep breath before the nation spoke again, and what it said next would be beautiful beyond measure.', fa: 'ایران از این فتح جان به در نبرد از آن رو که در برابر دگرگونی ایستاد، بلکه از آن رو که آن را در خود گرفت، دگرگونش کرد، و در تمام این مسیر آشکارا خودش ماند. آن سکوت واقعی بود و دراز. اما پایان نبود. نفسی عمیق بود پیش از آنکه این ملت دوباره لب بگشاید، و آنچه پس از آن گفت زیباتر از آن بود که به سنجش درآید.' }"),

 ("{ t: 'pull', x: 'A people held their soul through the long silence, and a poet gave them back their voice.' }",
  "{ t: 'pull', x: 'A people held their soul through the long silence, and a poet gave them back their voice.', fa: 'مردمی جان خود را در سکوتی دراز نگاه داشتند، و شاعری صدایشان را به آنان بازگرداند.' }"),
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
