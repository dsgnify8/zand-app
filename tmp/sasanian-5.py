# -*- coding: utf-8 -*-
# The Sasanian Empire, final batch: the end of an age.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'h', x: 'The end of an age' }",
  "{ t: 'h', x: 'The end of an age', fa: 'پایان یک دوران' }"),

 ("{ t: 'p', x: 'The last Sasanian king, Yazdegerd the Third, fled eastward across his crumbling empire, seeking in vain to raise an army to turn back the tide. He was pursued from city to city, and in 651, abandoned and alone, he was killed near the far eastern city of Merv. With his death, four centuries of Sasanian rule, and more than a thousand years of the Persian Zoroastrian empire, came to an end.' }",
  "{ t: 'p', x: 'The last Sasanian king, Yazdegerd the Third, fled eastward across his crumbling empire, seeking in vain to raise an army to turn back the tide. He was pursued from city to city, and in 651, abandoned and alone, he was killed near the far eastern city of Merv. With his death, four centuries of Sasanian rule, and more than a thousand years of the Persian Zoroastrian empire, came to an end.', fa: 'واپسین شهریار ساسانی، یزدگرد سوم، از میان امپراتوری فروریزنده‌اش رو به شرق گریخت و بیهوده کوشید سپاهی گرد آورد تا این موج را بازگرداند. شهر به شهر تعقیبش کردند، و در سال ۶۵۱، رهاشده و تنها، در نزدیکی مرو در شرق دوردست کشته شد. با مرگ او، چهار قرن فرمانروایی ساسانی و بیش از هزار سال امپراتوری زرتشتی ایران به پایان رسید.' }"),

 ("{ t: 'markline', x: 'An empire that had rivalled Rome for four hundred years had fallen in a single generation.' }",
  "{ t: 'markline', x: 'An empire that had rivalled Rome for four hundred years had fallen in a single generation.', fa: 'امپراتوری‌ای که چهارصد سال هماورد روم بود، در فاصلهٔ یک نسل فرو ریخت.' }"),

 ("{ t: 'p', x: 'The conquest changed Iran forever. Over the generations that followed, Islam gradually became the faith of the Iranian people, and the sacred fires of Zoroastrianism, which had burned for over a thousand years, slowly dimmed. The old faith did not vanish, and its communities endure to this day, but it was no longer the soul of the state.' }",
  "{ t: 'p', x: 'The conquest changed Iran forever. Over the generations that followed, Islam gradually became the faith of the Iranian people, and the sacred fires of Zoroastrianism, which had burned for over a thousand years, slowly dimmed. The old faith did not vanish, and its communities endure to this day, but it was no longer the soul of the state.', fa: 'این فتح ایران را برای همیشه دگرگون کرد. در نسل‌های پس از آن، اسلام رفته‌رفته آیین مردم ایران شد، و آتش‌های مقدس زرتشتی که بیش از هزار سال فروزان بودند به‌آرامی کم‌فروغ شدند. آیین کهن از میان نرفت و جامعه‌هایش تا امروز مانده‌اند، اما دیگر جانِ دولت نبود.' }"),

 ("{ t: 'p', x: 'What followed was a long and difficult age, sometimes called the two centuries of silence, when the Persian language and the Persian voice seemed to grow quiet under the new order. Yet Iran did not disappear. Its language, its poetry, its memory, and its spirit endured beneath the surface, and in time they would rise again, transformed, to shape a new and lasting Iranian civilization.' }",
  "{ t: 'p', x: 'What followed was a long and difficult age, sometimes called the two centuries of silence, when the Persian language and the Persian voice seemed to grow quiet under the new order. Yet Iran did not disappear. Its language, its poetry, its memory, and its spirit endured beneath the surface, and in time they would rise again, transformed, to shape a new and lasting Iranian civilization.', fa: 'آنچه پس از آن آمد روزگاری بود دراز و دشوار که گاه آن را دو قرن سکوت خوانده‌اند؛ روزگاری که زبان فارسی و صدای ایرانی زیر نظم تازه خاموش می‌نمود. با این همه، ایران ناپدید نشد. زبانش، شعرش، خاطره‌اش و روحش زیر سطح دوام آوردند، و به وقت خود دوباره برخاستند، دگرگون‌شده، تا تمدنی تازه و ماندگار بسازند.' }"),

 ("{ t: 'pull', x: 'The empire fell, but the soul of Iran endured, and would one day speak again.' }",
  "{ t: 'pull', x: 'The empire fell, but the soul of Iran endured, and would one day speak again.', fa: 'امپراتوری فرو ریخت، اما جان ایران ماند، و روزی دوباره به سخن آمد.' }"),
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
