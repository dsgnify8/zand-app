# -*- coding: utf-8 -*-
# Ferdowsi's verse blocks. Each of these is a real Shahnameh couplet, so the
# Persian side restores Ferdowsi's own line rather than translating the
# English rendering back.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 # بسی رنج بردم در این سال سی / عجم زنده کردم بدین پارسی
 ("{ t: 'couplet', a: 'I have toiled these thirty years in pain and strife,', b: 'to bring the Persians back to a Persian life.' }",
  "{ t: 'couplet', a: 'I have toiled these thirty years in pain and strife,', b: 'to bring the Persians back to a Persian life.', aFa: 'بسی رنج بردم در این سال سی', bFa: 'عجم زنده کردم بدین پارسی' }"),

 # توانا بود هر که دانا بود / ز دانش دل پیر برنا بود
 ("{ t: 'verse', lines: ['Seek wisdom, for wisdom will guide you well;', 'the wise alone are truly free.'], by: 'THE SHAHNAMEH' }",
  "{ t: 'verse', lines: ['Seek wisdom, for wisdom will guide you well;', 'the wise alone are truly free.'], linesFa: ['توانا بود هر که دانا بود', 'ز دانش دل پیر برنا بود'], by: 'THE SHAHNAMEH', byFa: 'شاهنامه' }"),

 # جهان یادگارست و ما رفتنی / به گیتی نماند به جز گفتنی
 ("{ t: 'couplet', a: 'The world is a tale, and we are the telling;', b: 'only the word remains when we are gone.' }",
  "{ t: 'couplet', a: 'The world is a tale, and we are the telling;', b: 'only the word remains when we are gone.', aFa: 'جهان یادگارست و ما رفتنی', bFa: 'به گیتی نماند به جز گفتنی' }"),

 # نمیرم از این پس که من زنده‌ام / که تخم سخن را پراکنده‌ام
 ("{ t: 'verse', lines: ['I shall not die, these seeds I\\'ve sown will save', 'my name and reputation from the grave,', 'and men of sense and wisdom will proclaim,', 'when I have gone, my praises and my fame.'], by: 'FERDOWSI, THE SHAHNAMEH' }",
  "{ t: 'verse', lines: ['I shall not die, these seeds I\\'ve sown will save', 'my name and reputation from the grave,', 'and men of sense and wisdom will proclaim,', 'when I have gone, my praises and my fame.'], linesFa: ['نمیرم از این پس که من زنده‌ام', 'که تخم سخن را پراکنده‌ام'], by: 'FERDOWSI, THE SHAHNAMEH', byFa: 'فردوسی، شاهنامه' }"),

 # the illuminated lines
 ("{ t: 'illumin', x: 'A single man set out to hold a thousand years of memory in his hands, and would not let it fall.' }",
  "{ t: 'illumin', x: 'A single man set out to hold a thousand years of memory in his hands, and would not let it fall.', fa: 'یک تن بر آن شد که هزار سال خاطره را در دست نگاه دارد، و نگذاشت از دستش بیفتد.' }"),

 ("{ t: 'illumin', x: 'The greatest hero of all could conquer any foe, but not the fate that made him slay his own child.' }",
  "{ t: 'illumin', x: 'The greatest hero of all could conquer any foe, but not the fate that made him slay his own child.', fa: 'بزرگ‌ترین پهلوان می‌توانست بر هر دشمنی چیره شود، اما نه بر سرنوشتی که فرزند خودش را به دست او کشت.' }"),

 ("{ t: 'illumin', x: 'He gave his life to a single belief: that a people who remember who they are can never truly be conquered.' }",
  "{ t: 'illumin', x: 'He gave his life to a single belief: that a people who remember who they are can never truly be conquered.', fa: 'عمرش را پای یک باور گذاشت: مردمی که به یاد داشته باشند که هستند، هرگز به‌راستی مغلوب نمی‌شوند.' }"),

 ("{ t: 'illumin', x: 'He said he would not die. A thousand years later, he speaks still.' }",
  "{ t: 'illumin', x: 'He said he would not die. A thousand years later, he speaks still.', fa: 'گفت که نمی‌میرد. هزار سال بعد، هنوز سخن می‌گوید.' }"),

 ("{ t: 'motif', symbol: 'pen', caption: 'The reed pen of Tus that would write a nation into being.' }",
  "{ t: 'motif', symbol: 'pen', caption: 'The reed pen of Tus that would write a nation into being.', captionFa: 'قلم نیِ توس، که ملتی را به نوشتن هستی بخشید.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:75])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
