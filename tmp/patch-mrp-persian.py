# Mohammad Reza Shah, in Nojan's Persian.
#
# Every pair he confirmed, from both passes. Items 1 and 12 of the first
# extraction are deliberately absent: the extractor had paired a heading
# with the next paragraph's translation, so what looked like a bad
# translation was a bad reading of the file.

import os
import re

PAIRS = [
 ("Born", "به دنیا آمد"),
 ("Reza Khan born", "رضاخان به دنیا آمد"),
 ("Mohammad Reza born", "محمدرضا به دنیا آمد"),
 ("The coup", "کودتا"),
 ("Pahlavi dynasty founded", "بنیان‌گذاری سلسله پهلوی"),
 ("A childhood set apart", "کودکی متفاوت"),

 ("The young prince with his father, Reza Shah, the founder of the dynasty.",
  "ولیعهد خردسال در کنار پدرش، رضاشاه، بنیان‌گذار سلسله پهلوی."),

 ("A brush with death", "یک قدم تا مرگ"),
 ("A weight placed early", "باری که از همان کودکی بر دوشش گذاشته شد"),
 ("A bridge between two worlds", "پلی میان دو جهان"),
 ("Arrived in Switzerland", "ورود به سوئیس"),
 ("Abroad at Le Rosey", "تحصیل دور از وطن، در لوروزه"),
 ("A second language", "زبانِ دوم"),

 ("The crown prince, shaped by two worlds, returns home to serve Iran.",
  "ولیعهد، که میان دو جهان شکل گرفته بود، به وطن بازمی‌گردد تا به ایران خدمت کند."),

 ("Marriage, War, and a Crown", "ازدواج، جنگ و تاج"),
 ("First marriage", "نخستین ازدواج"),
 ("The war reaches Iran", "جنگ به ایران می‌رسد"),
 ("Reza Shah Pahlavi abdicates", "رضاشاه پهلوی از سلطنت کناره می‌گیرد"),

 ("Reza Shah, who abdicated in 1941 so the dynasty might endure through his son.",
  "رضاشاه، که در سال ۱۳۲۰ از سلطنت کناره گرفت تا سلسله از طریق پسرش ادامه پیدا کند."),

 ("Mohammad Reza Pahlavi becomes king", "محمدرضا پهلوی شاه می‌شود"),

 ("The young Mohammad Reza Pahlavi, the new king of Iran.",
  "محمدرضا پهلوی جوان، شاه تازه ایران."),

 ("Marries Fawzia", "ازدواج با فوزیه"),
 ("Allied invasion", "حمله متفقین"),
 ("Mohammad Reza becomes king", "محمدرضا شاه می‌شود"),
 ("Tehran Conference", "کنفرانس تهران"),
 ("Reza Shah dies in exile", "رضاشاه در تبعید درگذشت"),
 ("Finding His Feet", "پیدا کردن جای پای خود"),
 ("The Azerbaijan crisis", "غائله آذربایجان"),

 ("The young Shah in the early years of his reign, finding his footing as king.",
  "شاه جوان در سال‌های نخست سلطنتش، در تلاش برای پیدا کردن جای پای خود به‌عنوان پادشاه."),

 ("The Shot at the University", "تیراندازی در دانشگاه"),
 ("A belief in destiny", "باور به تقدیر"),
 ("A new love", "عشقی تازه"),

 ("The Shah and Soraya, whose marriage was, by every account, a true love match.",
  "شاه و ثریا؛ ازدواجی که، به روایت همه، از عشق واقعی شکل گرفته بود."),

 ("A restless nation", "ملتی بی‌قرار"),
 ("The Oil Crisis and 1953", "بحران نفت و سال ۱۳۳۲"),

 ("The Abadan refinery, once the largest in the world, at the heart of the oil dispute.",
  "پالایشگاه آبادان، که زمانی بزرگ‌ترین پالایشگاه جهان بود، در قلب مناقشه نفتی قرار داشت."),

 ("Mossadegh rises", "برآمدن مصدق"),
 ("The boycott and the standoff", "تحریم و بن‌بست"),
 ("Foreign hands", "دخالت بیگانگان"),
 ("The truth, plainly", "حقیقت، بی‌پرده"),
 ("August 1953", "مرداد ۱۳۳۲"),
 ("Soraya, and the Search for an Heir", "ثریا و جست‌وجو برای وارث"),
 ("An impossible choice", "انتخابی ناممکن"),
 ("The crown", "تاج سلطنت"),

 ("A dynasty required a male heir to secure the succession.",
  "برای اینکه جانشینی در خاندان سلطنتی تضمین شود، سلسله به یک ولیعهد پسر نیاز داشت."),

 ("His heart", "دلش"),

 ("By every account he was truly in love with Soraya.",
  "به روایت همه، او واقعاً عاشق ثریا بود."),

 ("The clergy", "روحانیت"),

 ("A second wife or a change of succession met resistance.",
  "پیشنهاد ازدواج با همسر دوم یا تغییر ترتیب جانشینی با مقاومت روبه‌رو شد."),

 ("The choice", "انتخاب"),

 ("In the end, duty was made to outweigh love.",
  "در نهایت، وظیفه بر عشق چربید."),

 ("Farah, and the White Revolution", "فرح و انقلاب سفید"),
 ("An heir at last", "سرانجام، یک ولیعهد"),
 ("The dynasty secured", "تداوم سلسله تضمین شد"),

 ("The Shah with his son, Crown Prince Reza Pahlavi.",
  "شاه در کنار پسرش، ولیعهد رضا پهلوی."),

 ("The White Revolution", "انقلاب سفید"),
 ("Land reform for peasants", "اصلاحات ارضی برای کشاورزان"),
 ("Literacy Corps", "سپاه دانش"),
 ("Profit sharing", "سهیم شدن کارگران در سود"),
 ("The seeds of opposition", "بذرهای مخالفت"),

 ("A thriving, modernizing Iran during the years of the Great Civilization.",
  "ایرانی شکوفا و رو به مدرن‌شدن، در سال‌های «تمدن بزرگ»."),

 ("A crown earned and worn with pride", "تاجی که به دست آمد و با افتخار بر سر گذاشته شد"),

 ("The coronation of 1967. The Shah crowned himself, then Farah as Shahbanou.",
  "تاج‌گذاری سال ۱۳۴۶. شاه ابتدا تاج را بر سر خود گذاشت و سپس فرح را به عنوان شهبانو تاج‌گذاری کرد."),

 ("The Persepolis celebration", "جشن‌های تخت جمشید"),

 ("The 2,500 year celebration at Persepolis, 1971. Tents, banquets, and a parade of Iran through the ages.",
  "جشن‌های دو هزار و پانصد ساله در تخت جمشید، ۱۳۵۰. چادرها، ضیافت‌ها و نمایشی از تاریخ ایران در گذر روزگاران."),

 ("The tomb of Cyrus the Great at Pasargadae, honored at the heart of the celebration.",
  "آرامگاه کوروش بزرگ در پاسارگاد، که در مرکز این جشن‌ها جای داشت و مورد احترام قرار گرفت."),

 ("The other side", "روی دیگر ماجرا"),
 ("The Boom and the Cracks", "رونق و شکاف‌ها"),
 ("A flood of oil wealth", "سیل ثروت نفتی"),
 ("Oil price, 1973", "قیمت نفت، ۱۳۵۲"),
 ("A vast new military", "نیروی نظامی تازه و عظیم"),
 ("Industry and dams", "صنعت و سدسازی"),
 ("Change accelerated", "تغییر شتاب گرفت"),
 ("More money than the country could absorb", "پولی بیشتر از آنچه کشور می‌توانست جذب کند"),

 ("One party, and a hidden illness", "یک حزب، و بیماری‌ای پنهان"),
 ("A secret carried alone", "رازی که تنهایی به دوش می‌کشید"),
 ("The Storm and the Departure", "توفان و رفتن"),
 ("The gathering storm", "توفانی که در راه بود"),
 ("A wavering king", "شاهی مردد"),
 ("The hands of others", "دست دیگران"),
 ("The departure", "رفتن"),

 ("In exile, the Shah reflects on his reign and his departure. Tap to watch.",
  "شاه در تبعید، از دوران سلطنت و رفتنش می‌گوید. برای تماشا بزن."),

 ("Answer to History", "پاسخ به تاریخ"),
 ("A king without a country", "شاهی بی‌کشور"),
 ("The hostage crisis", "بحران گروگان‌گیری"),

 ("The seizure of the American embassy in Tehran, November 1979.",
  "تسخیر سفارت آمریکا در تهران، آبان ۱۳۵۸."),

 ("The last book", "آخرین کتاب"),
 ("The end", "پایان"),
 ("Died", "درگذشت"),
]

# Anchored on a fragment with no apostrophe, because the file spells one
# three different ways and matching the whole string has failed on that
# three times now.
ANCHORED = [
 ("the nationalist prime minister who nationalized",
  "محمد مصدق، نخست‌وزیر ملی‌گرا که صنعت نفت ایران را ملی کرد."),
 ("cities at a breathless pace",
  "سال‌های رونق، شهرهای ایران را با شتابی نفس‌گیر دگرگون کردند."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


p = "constants/education.ts"
s = open(p).read()
applied = 0

for en, fa in PAIRS:
    pat = re.compile(
        r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years): '"
        + re.escape(esc(en))
        + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
    )
    s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
    applied += n

for anchor, fa in ANCHORED:
    i = s.find(anchor)
    if i < 0:
        print("   anchor not found:", anchor[:40]); continue
    m = re.compile(r"(?:[a-zA-Z]*[Ff]a): '((?:[^'\\]|\\.)*)'").search(s, i)
    if not m:
        print("   no fa after:", anchor[:40]); continue
    s = s[:m.start(1)] + esc(fa) + s[m.end(1):]
    applied += 1

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS), "+", len(ANCHORED), "anchored")
for m in miss:
    print("   missed:", m)
