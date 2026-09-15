# The Timurids, in Nojan's Persian.
#
# The last of the eleven history topics. Two paragraphs carrying an
# apostrophe are anchored on a fragment without one.

import re

PAIRS = [
 ("The Timurid Empire", "امپراتوری تیموری"),
 ("The Last Great Conqueror", "واپسین فاتح بزرگ"),
 ("Timur (Tamerlane)", "تیمور لنگ"),

 ("A conqueror never defeated in battle, and one of the most feared men in history, Timur built a vast empire across the Persian world.",
  "تیمور، فاتحی که هرگز در میدان نبرد شکست نخورد و یکی از هراس‌انگیزترین مردان تاریخ بود، امپراتوری‌ای پهناور در سراسر جهان ایرانی برپا کرد."),

 ("The jewel of Samarkand", "نگین سمرقند"),

 ("Yet this terrible conqueror was also a great patron of beauty. He gathered to his capital of Samarkand the finest artists, architects, and craftsmen from across all the lands he conquered, and adorned the city with monuments of breathtaking splendour, blue-domed and shimmering, among the wonders of the world.",
  "با این همه، این فاتح هولناک حامی بزرگ هنر و زیبایی نیز بود. او بهترین هنرمندان، معماران و صنعتگران را از سراسر سرزمین‌هایی که فتح کرده بود به پایتختش، سمرقند، آورد و شهر را با بناهایی خیره‌کننده آراست؛ بناهایی با گنبدهای آبی و درخشان که در شمار شگفتی‌های جهان بودند."),

 ("The hand that raised towers of skulls also raised the shimmering domes of Samarkand.",
  "همان دستی که کله‌مناره‌ها را برپا می‌کرد، گنبدهای درخشان سمرقند را نیز برپا کرد."),

 ("The Timurid Renaissance", "رنسانس تیموری"),

 ("His son Shahrukh and grandson Ulugh Beg, and later the court at Herat, made their cities into dazzling centers of art, learning, and refinement, where the Persian genius reached new summits in almost every field.",
  "پسرش شاهرخ و نوه‌اش الغ‌بیگ، و پس از آنان دربار هرات، شهرهای خود را به کانون‌های درخشان هنر، دانش و ظرافت تبدیل کردند؛ جایی که نبوغ ایرانی تقریباً در هر زمینه‌ای به قله‌های تازه‌ای رسید."),

 ("A king who mapped the stars", "شاهی که ستارگان را نقشه‌برداری کرد"),
 ("A capital of dazzling art and poetry", "پایتختی از هنر و شعر خیره‌کننده"),
 ("An observatory that mapped the stars", "رصدخانه‌ای که ستارگان را نقشه‌برداری کرد"),
 ("The golden age of the Persian miniature", "عصر طلایی نگارگری ایرانی"),
 ("The summit of Persian art", "قلهٔ هنر ایرانی"),
 ("The Persian miniature", "نگارگری ایرانی"),

 ("Under the Timurids, the art of the miniature reached a delicacy and beauty that has never been surpassed.",
  "در روزگار تیموریان، هنر نگارگری به چنان ظرافت و زیبایی‌ای رسید که از آن پس هرگز نظیری برایش پدید نیامد."),

 ("The legacy reached even further. A prince of this house, Babur, would journey to India and found the great Mughal Empire, carrying the refined Persian culture of the Timurids to the subcontinent, where it would shape a whole civilization and raise wonders like the Taj Mahal.",
  "این میراث حتی دورتر رفت. شاهزاده‌ای از همین خاندان، بابر، راهی هند شد و امپراتوری بزرگ گورکانی را بنیان نهاد؛ فرهنگ ظریف ایرانیِ تیموریان را با خود به شبه‌قاره برد، جایی که تمدنی تمام را شکل داد و شگفتی‌هایی چون تاج‌محل را برافراشت."),

 ("In the shimmering domes of Samarkand, the exquisite paintings of Herat, and the poetry and science of their courts, the Timurids left a legacy of beauty that still shines across the centuries, and carried the light of Persian civilization to the ends of the earth.",
  "در گنبدهای درخشان سمرقند، در نگاره‌های ظریف هرات، و در شعر و دانش دربارهایشان، تیموریان میراثی از زیبایی بر جای گذاشتند که هنوز از پس قرن‌ها می‌درخشد، و روشنایی تمدن ایرانی را تا دورترین کرانه‌های زمین بردند."),

 ("From the harshest of ages, the Persian world raised a renaissance of pure beauty.",
  "از سخت‌ترین روزگاران، جهان ایرانی رستاخیزی از زیبایی محض برآورد."),
]

# These carry apostrophes — "history's", "Timur's", "Italy's" — which the
# file spells inconsistently, so they match on a fragment without one.
ANCHORED = [
 ("that a man of such cruelty should also be the founder",
  "این یکی از تناقض‌های بزرگ تاریخ است که مردی با چنین بی‌رحمی، بنیان‌گذار یکی از زیباترین دوره‌های فرهنگی‌ای باشد که شرق به خود دیده است. اما چنین شد و شکوهی که او آغاز کرد، در روزگار بازماندگانش به‌تمامی شکوفا شد."),
 ("his descendants gave up the endless conquering",
  "پس از مرگ تیمور، بازماندگانش فتوحات بی‌پایان را رها کردند و به پرورش هنر و زیبایی روی آوردند. در روزگار آنان، جهان ایرانی وارد یکی از درخشان‌ترین دوره‌های شکوفایی فرهنگی در سراسر تاریخ خود شد؛ شکوفایی‌ای که بسیاری آن را با رنسانس ایتالیا در همان دوران مقایسه کرده‌اند."),
 ("A flowering to rival Italy",
  "شکوفایی‌ای هم‌سنگ رنسانس ایتالیا"),
 ("whose story holds the strange and beautiful contradiction",
  "این نگاهی بود کوتاه به تیموریان؛ روایتی که آن تناقض غریب و زیبای این روزگار را در خود دارد: وحشتِ فاتح و شکوهِ فرهنگی که خود ممکنش کرد. از دل بی‌رحمی تیمور، یکی از تابناک‌ترین دوران‌های فرهنگی جهان ایرانی رویید."),
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
