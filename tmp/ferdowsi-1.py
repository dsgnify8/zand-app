# -*- coding: utf-8 -*-
# Ferdowsi, first prose batch. The register here is the literary one: this is
# the chapter about the man who saved the language, so it reaches for Persian
# words wherever one exists.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'lead', x: 'To understand Iran, you must first know its poet.' }",
  "{ t: 'lead', x: 'To understand Iran, you must first know its poet.', fa: 'برای شناختن ایران، نخست باید شاعرش را شناخت.' }"),

 ("{ t: 'p', x: 'He was born around the year 940 in a village near Tus, in the green province of Khorasan in the northeast of Iran. His name was Abul-Qasim, and the world would come to know him as Ferdowsi, a name that means, fittingly, the man of paradise.' }",
  "{ t: 'p', x: 'He was born around the year 940 in a village near Tus, in the green province of Khorasan in the northeast of Iran. His name was Abul-Qasim, and the world would come to know him as Ferdowsi, a name that means, fittingly, the man of paradise.', fa: 'حدود سال ۹۴۰ میلادی در روستایی نزدیک توس زاده شد، در خراسانِ سبز، در شمال شرق ایران. نامش ابوالقاسم بود، و جهان او را با نام فردوسی شناخت؛ نامی که، به‌جا، یعنی مردِ بهشت.' }"),

 ("{ t: 'p', x: 'He came from the dehqans, the old landed gentry of Iran, a class that took special pride in preserving the ancient traditions, the stories, and the memory of Persia as it had been before the Arab conquest. From childhood he breathed in the old tales of kings and heroes, and they never left him.' }",
  "{ t: 'p', x: 'He came from the dehqans, the old landed gentry of Iran, a class that took special pride in preserving the ancient traditions, the stories, and the memory of Persia as it had been before the Arab conquest. From childhood he breathed in the old tales of kings and heroes, and they never left him.', fa: 'از دهقانان بود، همان طبقهٔ کهن زمین‌دار ایران که نگاهبانی از آیین‌ها و داستان‌ها و خاطرهٔ ایرانِ پیش از فتح عرب را مایهٔ سربلندی خود می‌دانست. از کودکی داستان‌های کهن شاهان و پهلوانان را نفس کشید، و آن داستان‌ها هرگز رهایش نکردند.' }"),

 ("{ t: 'p', x: 'The Iran of his birth was a land two centuries removed from the fall of its empire. Arabic had become the language of religion, of scholarship, and of prestige, and the Persian tongue, though still spoken everywhere, had been pushed from the halls of learning and power. To many, it seemed a lesser language, unfit for great works.' }",
  "{ t: 'p', x: 'The Iran of his birth was a land two centuries removed from the fall of its empire. Arabic had become the language of religion, of scholarship, and of prestige, and the Persian tongue, though still spoken everywhere, had been pushed from the halls of learning and power. To many, it seemed a lesser language, unfit for great works.', fa: 'ایرانی که در آن زاده شد، دو قرن از فروپاشی امپراتوری‌اش فاصله داشت. عربی زبان دین و دانش و اعتبار شده بود، و زبان فارسی، هرچند هنوز همه‌جا بر زبان مردم جاری بود، از دهلیزهای دانش و قدرت رانده شده بود. به چشم بسیاری زبانی فروتر می‌نمود، نااهلِ کارهای بزرگ.' }"),

 ("{ t: 'p', x: 'But in the east, in Khorasan, a quiet revival was stirring. Persian princes ruled again, and at their courts the old language was cherished. A few brave poets had begun to write in Persian once more, and one had even begun to set the ancient national stories into verse, before death cut his work short. It was this unfinished task that would find its true master in Ferdowsi.' }",
  "{ t: 'p', x: 'But in the east, in Khorasan, a quiet revival was stirring. Persian princes ruled again, and at their courts the old language was cherished. A few brave poets had begun to write in Persian once more, and one had even begun to set the ancient national stories into verse, before death cut his work short. It was this unfinished task that would find its true master in Ferdowsi.', fa: 'اما در شرق، در خراسان، بیداری‌ای آرام در کار بود. شاهزادگان ایرانی دوباره فرمان می‌راندند و در دربارهایشان زبان کهن را عزیز می‌داشتند. چند شاعر دلیر دوباره به فارسی نوشتن گرفته بودند، و یکی از آنان حتی داستان‌های ملی کهن را به نظم درآورده بود، پیش از آنکه مرگ کارش را ناتمام بگذارد. همین کار ناتمام بود که استاد راستین خود را در فردوسی یافت.' }"),

 ("{ t: 'aside', x: 'He was heir to a thousand-year memory, born at the very moment his people needed someone to write it down.' }",
  "{ t: 'aside', x: 'He was heir to a thousand-year memory, born at the very moment his people needed someone to write it down.', fa: 'وارث خاطره‌ای هزارساله بود، و درست در لحظه‌ای زاده شد که مردمش به کسی نیاز داشتند تا آن را بنویسد.' }"),
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
