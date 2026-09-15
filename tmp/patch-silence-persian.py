# The Two Centuries of Silence, in Nojan's Persian.
#
# One thing to note about the Ferdowsi quotation: it is now the couplet
# itself rather than a prose rendering of it, and it carries a line break
# between the two hemistichs. That break is written as an escaped \n so
# the string survives the file, and the reader will show it as two lines
# — which is how a beyt should be read.

import re

PAIRS = [
 ("Two Centuries of Silence", "دو قرن سکوت"),
 ("The Silence Falls", "سکوت فرود می‌آید"),
 ("After the fall", "پس از فروپاشی"),

 ("A nation that had spoken to the world for a thousand years fell suddenly quiet.",
  "ملتی که هزار سال با جهان سخن گفته بود، ناگهان خاموش شد."),

 ("A world turned over", "جهانی که زیر و رو شد"),

 ("The change reached into every corner of life. Arabic became the language of government, of learning, and of the new faith. For a Persian of noble memory, it was a hard and disorienting age, to see the ways of a thousand years set aside, and the language of the conquerors rise in their place.",
  "این دگرگونی به هر گوشهٔ زندگی راه یافت. عربی زبان حکومت، دانش و آیین تازه شد. برای ایرانی‌ای که گذشته‌ای پرافتخار را به یاد داشت، روزگاری سخت و سردرگم‌کننده بود؛ روزگاری که می‌دید راه و رسم هزارساله را کنار می‌گذارند و زبان فاتحان جای آن را می‌گیرد."),

 ("The Soul That Would Not Die", "جانی که تن به مرگ نداد"),
 ("The quiet endurance", "پایداری خاموش"),

 ("They took our throne, but they could not take our language, nor our memory.",
  "تخت ما را گرفتند، اما نتوانستند زبان و خاطرهٔ ما را از ما بگیرند."),

 ("The stirrings of revival", "نخستین نشانه‌های بیداری"),
 ("The fall of the Sasanians; the silence begins", "فروپاشی ساسانیان؛ سکوت آغاز می‌شود"),
 ("A new age dawns; Persian influence rises again", "عصر تازه‌ای آغاز می‌شود؛ نفوذ ایران دوباره اوج می‌گیرد"),
 ("Persian dynasties rule once more in the east", "سلسله‌های ایرانی بار دیگر در شرق فرمان می‌رانند"),
 ("The Persian language and spirit begin to bloom anew", "زبان و روح ایرانی دوباره جان می‌گیرند و شکوفا می‌شوند"),

 ("The Poet Who Saved a Language", "شاعری که زبانی را نجات داد"),
 ("Ferdowsi, c. 977 - 1010", "فردوسی، حدود ۹۷۷ تا ۱۰۱۰"),

 ("Every people needs a voice to speak its soul, and Iran found hers in one of the greatest poets who ever lived. In the eastern city of Tus, a nobleman set himself a task that would consume more than thirty years of his life, and that would give Iran back its very self.",
  "هر ملتی به صدایی نیاز دارد تا جانش را به زبان بیاورد، و ایران این صدا را در یکی از بزرگ‌ترین شاعران تاریخ یافت. در شهر توس، در شرق ایران، مردی از خاندان دهقانان کاری را بر عهده گرفت که بیش از سی سال از عمرش را گرفت و قرار بود ایران را دوباره به خودش بازگرداند."),

 ("Ferdowsi of Tus", "فردوسیِ توس"),

 ("For over thirty years Ferdowsi labored on the Shahnameh, giving his life to preserve the stories, and the language, of his people.",
  "فردوسی بیش از سی سال برای سرودن شاهنامه رنج برد و عمر خود را وقف حفظ داستان‌ها و زبان مردمش کرد."),

 ("A book to hold a nation", "کتابی که ملتی را در خود نگاه داشت"),

 ("The Shahnameh is one of the longest and greatest epic poems ever composed by a single hand, nearly sixty thousand verses, a whole world of kings and warriors, love and war, tragedy and glory. But it was far more than a collection of stories. It was an act of preservation, and of defiance.",
  "شاهنامه یکی از بلندترین و بزرگ‌ترین حماسه‌هایی است که به دست یک شاعر سروده شده؛ نزدیک به شصت هزار بیت، جهانی کامل از شاهان و پهلوانان، عشق و جنگ، سوگ و شکوه. اما شاهنامه بسیار فراتر از مجموعه‌ای از داستان‌ها بود؛ تلاشی برای حفظ میراث یک ملت و ایستادگی در برابر فراموشی."),

 ("Years of his life given to the work", "سال‌هایی از عمرش که پای این کار گذاشت"),
 ("Verses in the Shahnameh", "بیت‌های شاهنامه"),
 ("Years it has been loved, unbroken", "سال‌هایی که بی‌وقفه محبوب بوده است"),
 ("Book that saved a language", "کتابی که زبانی را نجات داد"),

 ("There is a line, long attributed to him, that captures all he did and all he hoped. Having labored so long, he looked upon his finished work and understood what he had built, a monument no conqueror could throw down.",
  "بیتی هست که از دیرباز به او نسبت داده‌اند و همهٔ آنچه کرد و همهٔ آنچه امید داشت را در خود خلاصه می‌کند. پس از آن‌همه سال رنج و تلاش، به اثر به‌پایان‌رسیدهٔ خود نگریست و فهمید چه بنای ماندگاری ساخته است؛ یادگاری که هیچ فاتحی نمی‌توانست آن را فرو بریزد."),

 # The couplet itself. \n between the hemistichs, written escaped so the
 # single-quoted string in the file survives it.
 ("I have suffered greatly these thirty years, but I have revived the Persians with this Persian tongue.",
  "بسی رنج بردم در این سال سی\\nعجم زنده کردم بدین پارسی"),

 ("The Voice Returns", "صدا بازمی‌گردد"),
 ("The legacy", "میراث"),

 ("The two centuries of silence ended, and Iran has never stopped speaking since.",
  "دو قرن سکوت به پایان رسید و ایران از آن پس هرگز از سخن گفتن بازنایستاد."),

 ("A people held their soul through the long silence, and a poet gave them back their voice.",
  "مردمی در طول آن سکوت طولانی جان خود را حفظ کردند و شاعری صدایشان را به آنان بازگرداند."),
]


def esc(t: str) -> str:
    # The couplet's \n is already escaped in the source above, so only
    # backslashes that are not part of it need doubling.
    return t.replace("'", "\\'")


p = "constants/education.ts"
s = open(p).read()
applied = 0

for en, fa in PAIRS:
    pat = re.compile(
        r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years|value): '"
        + re.escape(en.replace("'", "\\'"))
        + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
    )
    s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
    applied += n

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
