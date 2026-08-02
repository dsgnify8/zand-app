# -*- coding: utf-8 -*-
# The Seljuk Empire, final batch: Khayyam, the Assassins, and the fracture.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'h', x: 'The age of Khayyam' }",
  "{ t: 'h', x: 'The age of Khayyam', fa: 'روزگار خیام' }"),

 ("{ t: 'p', x: 'This was an age of extraordinary Persian genius. At the Seljuk court worked Omar Khayyam, one of the most remarkable minds of any age: a brilliant mathematician who advanced algebra, and an astronomer who reformed the calendar into one more accurate than any then known in the world.' }",
  "{ t: 'p', x: 'This was an age of extraordinary Persian genius. At the Seljuk court worked Omar Khayyam, one of the most remarkable minds of any age: a brilliant mathematician who advanced algebra, and an astronomer who reformed the calendar into one more accurate than any then known in the world.', fa: 'این روزگار، روزگار نبوغ چشمگیر ایرانی بود. در دربار سلجوقی عمر خیام کار می‌کرد، از شگفت‌ترین ذهن‌های هر عصری: ریاضی‌دانی درخشان که جبر را پیش برد، و ستاره‌شناسی که تقویم را چنان اصلاح کرد که دقیق‌تر از هر تقویم شناخته‌شدهٔ آن روز جهان شد.' }"),

 ("{ t: 'p', x: 'And Khayyam was also a poet, whose quatrains, the Rubaiyat, meditating on life, time, and the fleeting beauty of the world, would one day be loved across the entire earth. That one man could be at once a great scientist and a great poet is a wonder that captures the spirit of this golden age.' }",
  "{ t: 'p', x: 'And Khayyam was also a poet, whose quatrains, the Rubaiyat, meditating on life, time, and the fleeting beauty of the world, would one day be loved across the entire earth. That one man could be at once a great scientist and a great poet is a wonder that captures the spirit of this golden age.', fa: 'و خیام شاعر هم بود؛ رباعیاتش، در تأمل بر زندگی و زمان و زیبایی گذرای جهان، روزی در سراسر زمین دوست داشته شد. اینکه یک تن بتواند هم دانشمندی بزرگ باشد و هم شاعری بزرگ، شگفتی‌ای است که روح این عصر طلایی را در خود دارد.' }"),

 ("{ t: 'p', x: 'But the golden age carried the seeds of its own troubles. Nizam al-Mulk was assassinated in 1092, struck down, it is said, by the daggers of a shadowy new sect, the Assassins, who from their mountain fortresses would haunt the region for generations. Soon after, the great sultan died too, and the empire began to fracture among rival heirs.' }",
  "{ t: 'p', x: 'But the golden age carried the seeds of its own troubles. Nizam al-Mulk was assassinated in 1092, struck down, it is said, by the daggers of a shadowy new sect, the Assassins, who from their mountain fortresses would haunt the region for generations. Soon after, the great sultan died too, and the empire began to fracture among rival heirs.', fa: 'اما عصر طلایی بذر گرفتاری‌های خود را نیز با خود داشت. نظام‌الملک در سال ۱۰۹۲ ترور شد؛ گفته‌اند به خنجر فرقه‌ای تازه و پنهان‌کار، حشاشین، که از دژهای کوهستانی‌شان نسل‌ها سایه بر این سرزمین انداختند. اندکی بعد سلطان بزرگ نیز درگذشت، و امپراتوری میان وارثان رقیب رو به چندپارگی گذاشت.' }"),

 ("{ t: 'markline', x: 'A golden age of Persian art and science bloomed under the Turkish sultans.' }",
  "{ t: 'markline', x: 'A golden age of Persian art and science bloomed under the Turkish sultans.', fa: 'عصری طلایی از هنر و دانش ایرانی، زیر فرمان سلطان‌های ترک شکفت.' }"),

 ("{ t: 'p', x: 'After the deaths of the great sultan and his great vizier, the vast Seljuk empire, held together by their skill, began to come apart. It split into smaller kingdoms ruled by rival branches of the family, each holding a piece of the once mighty realm.' }",
  "{ t: 'p', x: 'After the deaths of the great sultan and his great vizier, the vast Seljuk empire, held together by their skill, began to come apart. It split into smaller kingdoms ruled by rival branches of the family, each holding a piece of the once mighty realm.', fa: 'پس از مرگ سلطان بزرگ و وزیر بزرگش، امپراتوری پهناور سلجوقی که با کاردانی آن دو یکپارچه مانده بود، رو به گسستن گذاشت. به پادشاهی‌های کوچک‌تری بخش شد که شاخه‌های رقیب همان خاندان بر آنها فرمان می‌راندند، و هر یک تکه‌ای از قلمروِ روزگاری نیرومند را در دست داشت.' }"),

 ("{ t: 'p', x: 'These successor states carried on the Seljuk legacy for another century, and in places like Anatolia the Seljuk name endured even longer, laying foundations for the Turkish presence there that continues to this day. But the unity of the great empire was gone.' }",
  "{ t: 'p', x: 'These successor states carried on the Seljuk legacy for another century, and in places like Anatolia the Seljuk name endured even longer, laying foundations for the Turkish presence there that continues to this day. But the unity of the great empire was gone.', fa: 'این دولت‌های جانشین یک قرن دیگر میراث سلجوقی را پیش بردند، و در جاهایی چون آناتولی نام سلجوقی حتی دیرتر ماند و بنیاد حضور ترکان را در آنجا گذاشت که تا امروز ادامه دارد. اما یکپارچگی آن امپراتوری بزرگ رفته بود.' }"),

 ("""{ t: 'p', x: 'This has been a glimpse of the Seljuks, Turkic conquerors who became the great patrons of Persian civilization. Under their rule, Iran\\'s culture, art, architecture, and science flourished brilliantly, and its influence spread across a vast empire from Central Asia to the Mediterranean.' }""",
  """{ t: 'p', x: 'This has been a glimpse of the Seljuks, Turkic conquerors who became the great patrons of Persian civilization. Under their rule, Iran\\'s culture, art, architecture, and science flourished brilliantly, and its influence spread across a vast empire from Central Asia to the Mediterranean.', fa: 'این نگاهی بود کوتاه به سلجوقیان؛ فاتحانی ترک که به حامیان بزرگ تمدن ایرانی بدل شدند. در روزگار آنان فرهنگ و هنر و معماری و دانش ایران به‌درخشندگی شکفت، و نفوذش در امپراتوری‌ای پهناور از آسیای میانه تا مدیترانه گسترد.' }"""),

 ("""{ t: 'p', x: 'They showed, as others had before and would again, the deep power of Iranian civilization to absorb and transform its conquerors. The steppe warriors who rode in as foreign masters became, within a generation, the proud custodians of Persian art and learning. It is one of the recurring wonders of Iran\\'s long story.' }""",
  """{ t: 'p', x: 'They showed, as others had before and would again, the deep power of Iranian civilization to absorb and transform its conquerors. The steppe warriors who rode in as foreign masters became, within a generation, the proud custodians of Persian art and learning. It is one of the recurring wonders of Iran\\'s long story.', fa: 'آنان نشان دادند، چنان‌که پیش از ایشان دیگران نشان داده بودند و پس از ایشان هم خواهند داد، که تمدن ایرانی چه توان ژرفی در جذب و دگرگون کردن فاتحانش دارد. جنگاوران دشت که چون اربابانی بیگانه وارد شدند، در فاصلهٔ یک نسل به نگاهبانان سربلند هنر و دانش ایرانی بدل شدند. این یکی از شگفتی‌های همیشه‌تکرارشوندهٔ داستان بلند ایران است.' }"""),

 ("{ t: 'pull', x: 'The conquerors came as masters, and stayed as students of Iran.' }",
  "{ t: 'pull', x: 'The conquerors came as masters, and stayed as students of Iran.', fa: 'فاتحان چون ارباب آمدند، و چون شاگرد ایران ماندند.' }"),
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
