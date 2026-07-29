# -*- coding: utf-8 -*-
# Geography chapter six: Small Places, Long Shadows. Includes the closing block.

p = "constants/geography.ts"
s = open(p).read()

if "titleFa: 'جاهای کوچک، سایه‌های بلند'" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("""    title: 'Small Places, Long Shadows',
    nav: 'Places',
    subtitle: 'THE UNEXPECTED ONES',""",
  """    title: 'Small Places, Long Shadows',
    titleFa: 'جاهای کوچک، سایه‌های بلند',
    nav: 'Places',
    navFa: 'جاها',
    subtitle: 'THE UNEXPECTED ONES',
    subtitleFa: 'آن‌ها که انتظارشان را نداری',"""),

 ("{ t: 'p', x: 'Beyond the great cities are smaller places whose names carry further than their size would suggest. Some gave the world a fruit, some a building, some a person whose words outlived every empire of their age.' }",
  "{ t: 'p', x: 'Beyond the great cities are smaller places whose names carry further than their size would suggest. Some gave the world a fruit, some a building, some a person whose words outlived every empire of their age.', fa: 'آن‌سوی شهرهای بزرگ، جاهای کوچک‌تری هستند که نامشان دورتر از اندازه‌شان رفته است. یکی میوه‌ای به جهان داد، یکی بنایی، و یکی کسی را که سخنش از همهٔ امپراتوری‌های روزگارش بیشتر عمر کرد.' }"),

 ("{ t: 'p', x: 'This is the pattern of the land. A country of extremes, held between mountain and desert, placed at the centre of everything, whose people learned to draw water from under the sand and beauty from the driest places. The geography made the history, and the history made the nation.' }",
  "{ t: 'p', x: 'This is the pattern of the land. A country of extremes, held between mountain and desert, placed at the centre of everything, whose people learned to draw water from under the sand and beauty from the driest places. The geography made the history, and the history made the nation.', fa: 'الگوی این سرزمین همین است. کشوری از تضادها، گرفته میان کوه و کویر، نشسته در مرکز همه‌چیز، که مردمش یاد گرفتند آب را از زیر شن بیرون بکشند و زیبایی را از خشک‌ترین جاها. جغرافیا تاریخ را ساخت، و تاریخ ملت را.' }"),

 ("{ t: 'close', x: 'A land that has held everything the world came looking for, and been asked for little else. Empires crossed it, took what they wanted, and left their dust in its soil. It gave water where there was none, poetry where there was silence, and beauty out of the driest ground on earth. It has been wanted often and understood rarely. Still it stands, between two seas, holding its own name.'",
  "{ t: 'close', x: 'A land that has held everything the world came looking for, and been asked for little else. Empires crossed it, took what they wanted, and left their dust in its soil. It gave water where there was none, poetry where there was silence, and beauty out of the driest ground on earth. It has been wanted often and understood rarely. Still it stands, between two seas, holding its own name.', fa: 'سرزمینی که هر چه جهان به دنبالش آمد در خود داشت، و کمتر چیز دیگری از او خواستند. امپراتوری‌ها از آن گذشتند، آنچه می‌خواستند بردند و غبارشان را در خاکش جا گذاشتند. آب داد آنجا که آبی نبود، شعر داد آنجا که سکوت بود، و زیبایی را از خشک‌ترین خاک روی زمین بیرون کشید. بارها خواسته شده و کم فهمیده شده. هنوز ایستاده است، میان دو دریا، با نام خودش در دست.'"),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "anchor(s):")
    for m in missing:
        print("   -", m[:70])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b, 1)

open(p, "w").write(s)
print("chapter six translated:", len(PAIRS), "blocks")
