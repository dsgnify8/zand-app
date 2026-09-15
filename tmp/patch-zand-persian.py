# The Zands, in Nojan's Persian.
#
# Thirty-nine pairs, mostly short — headings, timeline entries and image
# captions. The dynasty the app is named after, so worth getting right.

import re

PAIRS = [
 ("The Zand Dynasty", "سلسله زند"),
 ("After the Storm", "پس از توفان"),
 ("1747 - 1751", "۱۷۴۷ تا ۱۷۵۱"),
 ("The dynasty begins", "آغاز سلسله"),
 ("A soldier of the Zagros", "سربازی از زاگرس"),
 ("Nader Shah assassinated", "ترور نادرشاه"),
 ("Karim Khan rises to power", "کریم‌خان به قدرت می‌رسد"),
 ("Shiraz made the capital", "شیراز پایتخت می‌شود"),
 ("Death of Karim Khan", "درگذشت کریم‌خان"),
 ("The crown he refused", "تاجی که نپذیرفت"),
 ("The meaning of a name", "معنای یک نام"),
 ("The Advocate of the People", "وکیل‌الرعایا"),
 ("The character of Karim Khan", "خوی و منش کریم‌خان"),

 ("Karim Khan Zand, the Advocate of the People.",
  "کریم‌خان زند، وکیل‌الرعایا."),

 ("The Zand court, a rare season of gentle rule in a violent age.",
  "دربار زند؛ دوره‌ای کمیاب از فرمانروایی آرام و مداراگر در روزگاری خشونت‌بار."),

 ("The ruler who listened", "فرمانروایی که گوش می‌داد"),
 ("A rare kind of power", "قدرتی از جنس دیگر"),
 ("Shiraz, the Beloved City", "شیراز، شهر محبوب"),
 ("The Zand capital", "پایتخت زند"),

 ("Shiraz, the city of poets, which Karim Khan made his capital and adorned.",
  "شیراز، شهر شاعران، که کریم‌خان آن را پایتخت خود کرد و آراست."),

 ("The gifts he left in stone", "یادگارهایی که در سنگ به جا گذاشت"),

 ("The Arg of Karim Khan, his citadel at the heart of Shiraz.",
  "ارگ کریم‌خان، دژ او در قلب شیراز."),

 ("The Vakil Mosque and the Vakil Bazaar in Shiraz, built by Karim Khan and still in use today.",
  "مسجد وکیل و بازار وکیل در شیراز، ساخته کریم‌خان، که هنوز هم مورد استفاده‌اند."),

 ("A Reign of Peace and Plenty", "روزگار آرامش و فراوانی"),
 ("c. 1751 - 1779", "حدود ۱۷۵۱ تا ۱۷۷۹"),
 ("Light taxes", "مالیات‌های سبک"),

 ("He kept the burden on farmers and merchants low, and the people prospered.",
  "بار مالیاتی بر دوش کشاورزان و بازرگانان را سبک نگه داشت و مردم رونق گرفتند."),

 ("Justice for all", "عدالت برای همه"),

 ("Rich and poor alike could seek his judgment, and he was known for fairness.",
  "توانگر و تهی‌دست، هر دو می‌توانستند برای دادخواهی نزد او بروند و او به انصاف و عدالت شناخته می‌شد."),

 ("Trade revived", "رونق دوباره بازرگانی"),

 ("He reopened commerce, including trade through the Persian Gulf with distant lands.",
  "بازرگانی را دوباره رونق داد، از جمله تجارت از راه خلیج فارس با سرزمین‌های دوردست."),

 ("Peace at home", "آرامش در داخل کشور"),

 ("The wars that had torn Iran apart were stilled, and the country breathed again.",
  "جنگ‌هایی که ایران را از هم دریده بودند فروکش کردند و کشور دوباره نفس کشید."),

 ("Remembered with love", "با مهر به یاد مانده"),
 ("The End of a Gentle King", "پایان یک پادشاه مهربان"),
 ("1779 - 1794", "۱۷۷۹ تا ۱۷۹۴"),
 ("Died", "درگذشت"),
 ("The last of the Zand", "واپسین فرمانروای زند"),
 ("Years of peace he gave Iran", "سال‌های آرامشی که به ایران بخشید"),
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

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
