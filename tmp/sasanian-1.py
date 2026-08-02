# -*- coding: utf-8 -*-
# The Sasanian Empire, first batch: the rebirth and the faith.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("essence: 'The last great empire of pre-Islamic Iran, a rival of Rome and a golden age of Persian culture, faith, and art, until the coming of Islam changed the nation forever.',",
  "essence: 'The last great empire of pre-Islamic Iran, a rival of Rome and a golden age of Persian culture, faith, and art, until the coming of Islam changed the nation forever.',\n  essenceFa: 'واپسین امپراتوری بزرگ ایران پیش از اسلام؛ هماورد روم و عصر طلایی فرهنگ و آیین و هنر ایرانی، تا آنکه آمدن اسلام این سرزمین را برای همیشه دگرگون کرد.',"),

 ("title: 'The Rebirth of Persia',", "title: 'The Rebirth of Persia', titleFa: 'زایش دوبارهٔ ایران',"),
 ("title: 'Ardashir I',", "title: 'Ardashir I', titleFa: 'اردشیر بابکان',"),
 ("title: 'The Faith of the Sacred Fire',", "title: 'The Faith of the Sacred Fire', titleFa: 'آیین آتش مقدس',"),
 ("title: 'The soul of Sasanian Iran',", "title: 'The soul of Sasanian Iran', titleFa: 'جان ایران ساسانی',"),
 ("title: 'The sacred fire',", "title: 'The sacred fire', titleFa: 'آتش مقدس',"),
 ("title: 'A faith worthy of its own telling',", "title: 'A faith worthy of its own telling', titleFa: 'آیینی که روایت خودش را می‌طلبد',"),
 ("title: 'The Rival of Rome',", "title: 'The Rival of Rome', titleFa: 'هماورد روم',"),
 ("title: 'Shapur I',", "title: 'Shapur I', titleFa: 'شاپور یکم',"),
 ("title: 'The Last Glory and the Long War',", "title: 'The Last Glory and the Long War', titleFa: 'واپسین شکوه و جنگ دراز',"),
 ("title: 'Khosrow Anushirvan',", "title: 'Khosrow Anushirvan', titleFa: 'خسرو انوشیروان',"),
 ("title: 'The Coming of Islam',", "title: 'The Coming of Islam', titleFa: 'آمدن اسلام',"),

 ("{ t: 'p', x: 'For nearly five centuries after Alexander, the glory of Cyrus and Darius had faded. Iran was ruled first by Greek kings and then by the Parthians, a capable but loosely bound dynasty. The memory of the great Persian Empire lived on, but its full splendour had dimmed.' }",
  "{ t: 'p', x: 'For nearly five centuries after Alexander, the glory of Cyrus and Darius had faded. Iran was ruled first by Greek kings and then by the Parthians, a capable but loosely bound dynasty. The memory of the great Persian Empire lived on, but its full splendour had dimmed.', fa: 'نزدیک پنج قرن پس از اسکندر، شکوه کوروش و داریوش رنگ باخته بود. بر ایران نخست شاهان یونانی فرمان راندند و سپس اشکانیان، سلسله‌ای کاردان اما با بندهایی سست. یاد امپراتوری بزرگ ایران زنده مانده بود، اما درخشش کاملش کم‌فروغ شده بود.' }"),

 ("{ t: 'p', x: 'Then, in 224 CE, a prince from the south, from the very heartland of Persia where Cyrus had once ruled, rose up and restored the ancient glory. His name was Ardashir, and he founded the Sasanian dynasty, the last and one of the greatest of the pre-Islamic Persian empires.' }",
  "{ t: 'p', x: 'Then, in 224 CE, a prince from the south, from the very heartland of Persia where Cyrus had once ruled, rose up and restored the ancient glory. His name was Ardashir, and he founded the Sasanian dynasty, the last and one of the greatest of the pre-Islamic Persian empires.', fa: 'سپس، در سال ۲۲۴ میلادی، شاهزاده‌ای از جنوب، از همان دل سرزمین پارس که روزی کوروش بر آن فرمان می‌راند، برخاست و شکوه باستانی را بازگرداند. نامش اردشیر بود، و سلسلهٔ ساسانی را بنیان نهاد؛ واپسین و یکی از بزرگ‌ترین امپراتوری‌های ایران پیش از اسلام.' }"),

 ("{ t: 'h', x: 'A conscious return to greatness' }",
  "{ t: 'h', x: 'A conscious return to greatness', fa: 'بازگشتی آگاهانه به بزرگی' }"),

 ("{ t: 'p', x: 'The Sasanians saw themselves as the true heirs of the ancient Persian kings. They revived the old titles, the old glory, and the old faith, and set out to build an empire worthy of the Achaemenid name. Under them, Persia was reborn as a great power of the world.' }",
  "{ t: 'p', x: 'The Sasanians saw themselves as the true heirs of the ancient Persian kings. They revived the old titles, the old glory, and the old faith, and set out to build an empire worthy of the Achaemenid name. Under them, Persia was reborn as a great power of the world.', fa: 'ساسانیان خود را وارثان راستین شاهان باستانی ایران می‌دانستند. لقب‌های کهن، شکوه کهن و آیین کهن را زنده کردند و بر آن شدند امپراتوری‌ای بسازند که درخور نام هخامنشی باشد. زیر فرمان آنان، ایران دوباره چون قدرتی بزرگ در جهان زاده شد.' }"),

 ("{ t: 'markline', x: 'After five centuries, the true glory of Persia rose again.' }",
  "{ t: 'markline', x: 'After five centuries, the true glory of Persia rose again.', fa: 'پس از پنج قرن، شکوه راستین ایران دوباره برخاست.' }"),

 ("{ t: 'p', x: 'For more than four hundred years the Sasanians would rule a vast and brilliant empire, stretching across the Iranian plateau and beyond, a civilization of magnificent cities, learning, and art that shaped the world far beyond its borders.' }",
  "{ t: 'p', x: 'For more than four hundred years the Sasanians would rule a vast and brilliant empire, stretching across the Iranian plateau and beyond, a civilization of magnificent cities, learning, and art that shaped the world far beyond its borders.', fa: 'ساسانیان بیش از چهارصد سال بر امپراتوری‌ای پهناور و درخشان فرمان راندند که سراسر فلات ایران و فراتر از آن را در بر می‌گرفت؛ تمدنی از شهرهای باشکوه و دانش و هنر، که جهان را بسی فراتر از مرزهای خود شکل داد.' }"),

 ("{ t: 'p', x: 'At the very heart of the Sasanian world lay a faith of great antiquity and beauty: Zoroastrianism, the religion of the prophet Zarathustra, which the Persians had followed for more than a thousand years. Under the Sasanians it became the official faith of the empire, woven into the state itself.' }",
  "{ t: 'p', x: 'At the very heart of the Sasanian world lay a faith of great antiquity and beauty: Zoroastrianism, the religion of the prophet Zarathustra, which the Persians had followed for more than a thousand years. Under the Sasanians it became the official faith of the empire, woven into the state itself.', fa: 'در دل جهان ساسانی آیینی نشسته بود کهن و زیبا: دین زرتشتی، آیین زرتشت پیامبر، که ایرانیان بیش از هزار سال آن را پیروی کرده بودند. زیر فرمان ساسانیان به آیین رسمی امپراتوری بدل شد و در تار و پود خود دولت بافته شد.' }"),
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
