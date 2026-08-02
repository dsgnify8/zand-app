# -*- coding: utf-8 -*-
# The Sasanian Empire, fourth batch: the tide turns, and Qadisiyyah.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Then the tide turned. The Byzantine emperor struck back and carried the war deep into the heart of Persia. When at last the fighting ended, after twenty six years, both great empires were utterly exhausted, their treasuries empty, their armies bled white, their people weary of endless war.' }",
  "{ t: 'p', x: 'Then the tide turned. The Byzantine emperor struck back and carried the war deep into the heart of Persia. When at last the fighting ended, after twenty six years, both great empires were utterly exhausted, their treasuries empty, their armies bled white, their people weary of endless war.', fa: 'سپس ورق برگشت. امپراتور بیزانس پاسخ داد و جنگ را تا دل ایران پیش برد. وقتی سرانجام پس از بیست و شش سال نبرد به پایان رسید، هر دو امپراتوری بزرگ یکسره از پا افتاده بودند: خزانه‌ها تهی، سپاه‌ها خون‌باخته، و مردم از جنگ بی‌پایان خسته.' }"),

 ("{ t: 'markline', x: 'The two great powers of the world had fought each other to the point of ruin.' }",
  "{ t: 'markline', x: 'The two great powers of the world had fought each other to the point of ruin.', fa: 'دو قدرت بزرگ جهان چندان با هم جنگیدند تا هر دو به ویرانی رسیدند.' }"),

 ("{ t: 'p', x: 'Neither empire knew it, but a new power was rising in the deserts of Arabia to the south, one that would sweep away the exhausted old order and change the world forever.' }",
  "{ t: 'p', x: 'Neither empire knew it, but a new power was rising in the deserts of Arabia to the south, one that would sweep away the exhausted old order and change the world forever.', fa: 'هیچ‌یک از دو امپراتوری نمی‌دانست، اما در بیابان‌های عربستان در جنوب، قدرتی تازه سر برمی‌آورد؛ قدرتی که نظم کهنه و فرسوده را از میان برمی‌داشت و جهان را برای همیشه دگرگون می‌کرد.' }"),

 ("{ t: 'p', x: 'In the deserts of Arabia, a new faith had been born. Islam had united the Arab tribes as never before, and filled them with a burning purpose. In the 630s, the armies of the young Muslim state burst out of Arabia, and they turned toward the two exhausted empires to the north.' }",
  "{ t: 'p', x: 'In the deserts of Arabia, a new faith had been born. Islam had united the Arab tribes as never before, and filled them with a burning purpose. In the 630s, the armies of the young Muslim state burst out of Arabia, and they turned toward the two exhausted empires to the north.', fa: 'در بیابان‌های عربستان آیینی تازه زاده شده بود. اسلام قبایل عرب را چنان یکپارچه کرد که پیش‌تر هرگز نشده بودند، و آنان را از هدفی سوزان آکند. در دههٔ ۶۳۰ میلادی، سپاهیان دولت جوان مسلمان از عربستان بیرون زدند و رو به دو امپراتوری خسته در شمال آوردند.' }"),

 ("{ t: 'p', x: 'The Sasanian Empire, drained by its long war with Byzantium and weakened by years of turmoil at its court, was not the power it had been. Yet few could have imagined how swiftly the ancient empire would fall.' }",
  "{ t: 'p', x: 'The Sasanian Empire, drained by its long war with Byzantium and weakened by years of turmoil at its court, was not the power it had been. Yet few could have imagined how swiftly the ancient empire would fall.', fa: 'امپراتوری ساسانی که جنگ دراز با بیزانس تهی‌اش کرده بود و سال‌ها آشوب در دربار ناتوانش، دیگر آن قدرت پیشین نبود. با این همه، کمتر کسی می‌توانست تصور کند این امپراتوری کهن با چه شتابی فرو خواهد ریخت.' }"),

 ("{ t: 'h', x: 'The battle that decided an empire' }",
  "{ t: 'h', x: 'The battle that decided an empire', fa: 'نبردی که سرنوشت یک امپراتوری را رقم زد' }"),

 ("{ t: 'p', x: 'The decisive blow came at the battle of Qadisiyyah, around the year 636, where the main Sasanian army met the Arab forces. After days of hard fighting, the Persian army was broken. The road to the capital lay open, and the great city of Ctesiphon fell to the conquerors.' }",
  "{ t: 'p', x: 'The decisive blow came at the battle of Qadisiyyah, around the year 636, where the main Sasanian army met the Arab forces. After days of hard fighting, the Persian army was broken. The road to the capital lay open, and the great city of Ctesiphon fell to the conquerors.', fa: 'ضربهٔ سرنوشت‌ساز در نبرد قادسیه فرود آمد، حدود سال ۶۳۶ میلادی، آنجا که سپاه اصلی ساسانی با نیروهای عرب روبه‌رو شد. پس از روزها نبرد سخت، سپاه ایران شکست. راه پایتخت باز شد، و شهر بزرگ تیسفون به دست فاتحان افتاد.' }"),
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
