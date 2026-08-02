# -*- coding: utf-8 -*-
# The Sasanian Empire, second batch: the faith, and the rivalry with Rome.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'It is one of the oldest revealed religions in the world, and among the most influential. It taught of a single supreme God, Ahura Mazda, the Wise Lord, and of the eternal struggle between truth and light on one side, and falsehood and darkness on the other, a struggle in which every person must choose their part.' }",
  "{ t: 'p', x: 'It is one of the oldest revealed religions in the world, and among the most influential. It taught of a single supreme God, Ahura Mazda, the Wise Lord, and of the eternal struggle between truth and light on one side, and falsehood and darkness on the other, a struggle in which every person must choose their part.', fa: 'این آیین از کهن‌ترین دین‌های وحیانی جهان است و از اثرگذارترین‌ها. از خدایی یگانه و برتر سخن می‌گفت، اهورامزدا، خداوند دانا، و از نبردی جاودانه میان راستی و روشنایی از یک سو، و دروغ و تاریکی از سوی دیگر؛ نبردی که هر کس باید در آن سهم خود را برگزیند.' }"),

 ("{ t: 'h', x: 'Good thoughts, good words, good deeds' }",
  "{ t: 'h', x: 'Good thoughts, good words, good deeds', fa: 'پندار نیک، گفتار نیک، کردار نیک' }"),

 ("{ t: 'p', x: 'At the core of the faith was a simple and beautiful ideal, that a good life is built on three things: good thoughts, good words, and good deeds. Fire, as the symbol of divine light and purity, was honored in great fire temples that burned across the land, tended by priests and never allowed to go out.' }",
  "{ t: 'p', x: 'At the core of the faith was a simple and beautiful ideal, that a good life is built on three things: good thoughts, good words, and good deeds. Fire, as the symbol of divine light and purity, was honored in great fire temples that burned across the land, tended by priests and never allowed to go out.', fa: 'در دل این آیین آرمانی ساده و زیبا نشسته بود: زندگی نیک بر سه چیز بنا می‌شود، پندار نیک، گفتار نیک و کردار نیک. آتش، چون نماد روشنایی و پاکی ایزدی، در آتشکده‌های بزرگی گرامی داشته می‌شد که سراسر این سرزمین فروزان بودند؛ موبدان نگاهبانشان بودند و هرگز نمی‌گذاشتند خاموش شوند.' }"),

 ("{ t: 'markline', x: 'Good thoughts, good words, good deeds.' }",
  "{ t: 'markline', x: 'Good thoughts, good words, good deeds.', fa: 'پندار نیک، گفتار نیک، کردار نیک.' }"),

 ("{ t: 'p', x: 'The influence of this ancient faith reached far beyond Iran. Its ideas of a single God, of heaven and hell, of angels, of a final judgment, and of a savior to come, are believed by many scholars to have shaped the great religions that followed. The spiritual legacy of Zoroastrian Persia lives on in the faith of much of the world to this day.' }",
  "{ t: 'p', x: 'The influence of this ancient faith reached far beyond Iran. Its ideas of a single God, of heaven and hell, of angels, of a final judgment, and of a savior to come, are believed by many scholars to have shaped the great religions that followed. The spiritual legacy of Zoroastrian Persia lives on in the faith of much of the world to this day.', fa: 'اثر این آیین کهن بسی فراتر از ایران رفت. بسیاری از پژوهشگران بر این باورند که اندیشه‌های آن دربارهٔ خدای یگانه، بهشت و دوزخ، فرشتگان، داوری واپسین و منجی‌ای که خواهد آمد، دین‌های بزرگ پس از خود را شکل داده است. میراث معنوی ایرانِ زرتشتی تا امروز در باور بخش بزرگی از جهان زنده است.' }"),

 ("{ t: 'p', x: 'For over four hundred years, the Sasanian Empire stood as the great rival of Rome, and later of its successor, the Byzantine Empire. These were the two superpowers of the ancient world, and between them stretched a frontier contested in war after war across the centuries.' }",
  "{ t: 'p', x: 'For over four hundred years, the Sasanian Empire stood as the great rival of Rome, and later of its successor, the Byzantine Empire. These were the two superpowers of the ancient world, and between them stretched a frontier contested in war after war across the centuries.', fa: 'بیش از چهارصد سال، امپراتوری ساسانی هماورد بزرگ روم بود و سپس هماورد جانشینش، امپراتوری بیزانس. این دو ابرقدرت جهان باستان بودند، و میانشان مرزی کشیده شده بود که قرن‌ها جنگ پس از جنگ بر سرش درگرفت.' }"),

 ("{ t: 'p', x: 'It was a rivalry of equals, and Persia gave as good as it got. In one of the most famous moments of the age, the Sasanian king Shapur the Great defeated and captured the Roman emperor Valerian himself, an almost unthinkable humiliation for Rome, and a triumph carved in stone in the cliffs of Iran, where it can still be seen today.' }",
  "{ t: 'p', x: 'It was a rivalry of equals, and Persia gave as good as it got. In one of the most famous moments of the age, the Sasanian king Shapur the Great defeated and captured the Roman emperor Valerian himself, an almost unthinkable humiliation for Rome, and a triumph carved in stone in the cliffs of Iran, where it can still be seen today.', fa: 'این رقابت میان دو هماورد برابر بود، و ایران هر ضربه را با ضربه‌ای پاسخ داد. در یکی از نامدارترین لحظه‌های آن روزگار، شاپور بزرگ، شاه ساسانی، والرین امپراتور روم را شکست داد و به اسارت گرفت؛ خواری‌ای که برای روم تقریباً باورنکردنی بود، و پیروزی‌ای که بر صخره‌های ایران کنده شد و تا امروز می‌توان دیدش.' }"),
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
