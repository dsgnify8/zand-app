# The Seljuks, in Nojan's Persian.
#
# Twenty-four pairs. Turkic sultans who governed in Persian — the topic's
# best line is that Iran conquered them back with its culture.

import re

PAIRS = [
 ("The Seljuk Empire", "شاهنشاهی سلجوقی"),
 ("Horsemen from the Steppe", "سوارکارانی از دشت"),

 ("In 1040 they shattered the armies of the reigning power at the battle of Dandanaqan, and the road into Iran lay open. Under their leader Tughril, they took city after city, until at last Tughril entered Baghdad itself and was named Sultan, protector of the Islamic world.",
  "در سال ۱۰۴۰، در نبرد دندانقان، سپاه قدرت حاکم را درهم شکستند و راه ورود به ایران برایشان گشوده شد. به رهبری طغرل، شهر پس از شهر را گرفتند تا سرانجام طغرل خود وارد بغداد شد و او را سلطان، یعنی نگاهبان جهان اسلام، خواندند."),

 ("Tughril Beg", "طغرل بیک"),

 ("Tughril led the Seljuks from the steppe into Iran and beyond, founding an empire that stretched from Central Asia to the Mediterranean.",
  "طغرل سلجوقیان را از دشت‌های آسیای میانه به ایران و فراتر از آن رهبری کرد و امپراتوری‌ای بنیان گذاشت که از آسیای میانه تا مدیترانه گسترده بود."),

 ("Conquerors who became Persians", "فاتحانی که ایرانی شدند"),

 ("They conquered Iran with the sword, and Iran conquered them with its culture.",
  "آنان ایران را با شمشیر فتح کردند و ایران آنان را با فرهنگ خود فتح کرد."),

 ("The conquerors became patrons of Persian civilization, and under their rule, though the sultans were Turks, the soul of the state was Persian. It was a marriage of the vigour of the steppe and the refinement of Iran, and it produced a golden age.",
  "فاتحان به حامیان تمدن ایرانی بدل شدند و در روزگار آنان، هرچند سلطان‌ها ترک بودند، روح و فرهنگ دولت ایرانی بود. این پیوندی بود میان نیروی دشت و ظرافت ایران و از دل آن عصری طلایی زاده شد."),

 ("The Great Vizier and the Golden Age", "وزیر بزرگ و عصر طلایی"),

 ("The true architect of the Seljuk golden age was not a sultan but a Persian statesman, one of the greatest administrators in the history of Iran: Nizam al-Mulk, the great vizier who guided the empire at its height for thirty years.",
  "معمار راستین عصر طلایی سلجوقیان نه یک سلطان، بلکه سیاستمداری ایرانی بود؛ یکی از بزرگ‌ترین دولتمردان تاریخ ایران: خواجه نظام‌الملک، وزیر بزرگی که سی سال در دوران اوج امپراتوری، آن را اداره کرد."),

 ("Nizam al-Mulk", "خواجه نظام‌الملک"),

 ("The brilliant Persian vizier who ran the Seljuk Empire for three decades and wrote a famous book on the art of governing.",
  "وزیر درخشان ایرانی که سه دهه امپراتوری سلجوقی را اداره کرد و کتابی نامدار دربارهٔ هنر کشورداری نوشت."),

 ("The age of Khayyam", "روزگار خیام"),

 ("This was an age of extraordinary Persian genius. At the Seljuk court worked Omar Khayyam, one of the most remarkable minds of any age: a brilliant mathematician who advanced algebra, and an astronomer who reformed the calendar into one more accurate than any then known in the world.",
  "این روزگار، عصر نبوغ چشمگیر ایرانی بود. در دربار سلجوقی عمر خیام فعالیت می‌کرد؛ یکی از شگفت‌انگیزترین ذهن‌های هر عصر، ریاضی‌دانی درخشان که علم جبر را پیش برد و ستاره‌شناسی که تقویم را چنان اصلاح کرد که از هر تقویم شناخته‌شدهٔ آن روز جهان دقیق‌تر بود."),

 ("And Khayyam was also a poet, whose quatrains, the Rubaiyat, meditating on life, time, and the fleeting beauty of the world, would one day be loved across the entire earth. That one man could be at once a great scientist and a great poet is a wonder that captures the spirit of this golden age.",
  "خیام شاعر هم بود؛ رباعیاتش، که در آنها از زندگی، زمان و زیبایی گذرای جهان تأمل می‌کرد، روزی در سراسر جهان محبوب شد. اینکه یک نفر می‌توانست هم‌زمان دانشمندی بزرگ و شاعری بزرگ باشد، شگفتی‌ای است که به‌خوبی روح این عصر طلایی را نشان می‌دهد."),

 ("Khayyam advanced its foundations", "خیام بنیادهای آن را پیش برد"),
 ("A reform of astonishing accuracy", "اصلاحی با دقتی شگفت‌انگیز"),
 ("Poetry beloved around the world", "شعری محبوب در سراسر جهان"),
 ("Scientist and poet at once", "هم دانشمند و هم شاعر"),

 ("A golden age of Persian art and science bloomed under the Turkish sultans.",
  "در زیر فرمان سلطان‌های ترک، عصری طلایی از هنر و دانش ایرانی شکوفا شد."),

 ("The Empire Divides", "امپراتوری چندپاره می‌شود"),

 ("These successor states carried on the Seljuk legacy for another century, and in places like Anatolia the Seljuk name endured even longer, laying foundations for the Turkish presence there that continues to this day. But the unity of the great empire was gone.",
  "این دولت‌های جانشین یک قرن دیگر میراث سلجوقی را ادامه دادند و در جاهایی مانند آناتولی، نام سلجوقیان حتی مدت بیشتری باقی ماند و پایه‌های حضور ترک‌ها را در آنجا گذاشت؛ حضوری که تا امروز ادامه دارد. اما یکپارچگی آن امپراتوری بزرگ دیگر از میان رفته بود."),

 ("The conquerors came as masters, and stayed as students of Iran.",
  "فاتحان چون ارباب آمدند و چون شاگرد ایران ماندند."),
]

# The closing paragraph carries an apostrophe in "Iran's culture".
ANCHORED = [
 ("This has been a glimpse of the Seljuks",
  "این نگاهی کوتاه بود به سلجوقیان؛ فاتحانی ترک که به حامیان بزرگ تمدن ایرانی بدل شدند. در روزگار آنان، فرهنگ، هنر، معماری و دانش ایران با شکوهی چشمگیر شکوفا شد و نفوذش در امپراتوری‌ای پهناور از آسیای میانه تا مدیترانه گسترش یافت."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


p = "constants/education.ts"
s = open(p).read()
applied = 0

for en, fa in PAIRS:
    pat = re.compile(
        r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years|value): '"
        + re.escape(esc(en))
        + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
    )
    s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
    applied += n

for anchor, fa in ANCHORED:
    i = s.find(anchor)
    if i < 0:
        print("   anchor not found:", anchor[:44]); continue
    m = re.compile(r"(?:[a-zA-Z]*[Ff]a): '((?:[^'\\]|\\.)*)'").search(s, i)
    if not m:
        print("   no fa after:", anchor[:44]); continue
    s = s[:m.start(1)] + esc(fa) + s[m.end(1):]
    applied += 1

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS), "+", len(ANCHORED), "anchored")
for m in miss:
    print("   missed:", m)
