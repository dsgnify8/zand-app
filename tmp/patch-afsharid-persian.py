# The Afsharids, in Nojan's Persian.
#
# Nader Shah — the shepherd who took Delhi. Thirty-six pairs; the two
# carrying an apostrophe are anchored on a fragment without one, since
# the file spells them inconsistently.

import re

PAIRS = [
 ("The Afsharid Dynasty", "سلسله افشاریه"),
 ("From Shepherd to Warlord", "از چوپانی تا سرداری"),
 ("Nader of the Afshar", "نادرِ افشار"),

 ("Born in poverty and once a captive, Nader rose by his genius for war to command armies and, in time, an empire.",
  "نادر در تنگدستی به دنیا آمد و روزگاری نیز به اسارت رفت؛ اما نبوغش در جنگ او را از فرودستی بالا کشید تا جایی که فرمانده سپاه‌ها و سرانجام فرمانروای یک امپراتوری شد."),

 ("The savior of Iran", "ناجی ایران"),

 ("A shepherd boy had become the sword that saved a nation.",
  "پسر چوپان به شمشیری تبدیل شده بود که ایران را نجات داد."),

 ("The Crown and the Conqueror", "تاج و فاتح"),
 ("The Napoleon of Persia", "ناپلئون ایران"),

 ("He remade the army of Iran into the terror of the East.",
  "او ارتش ایران را از نو ساخت و آن را به هراسِ شرق تبدیل کرد."),

 ("The March on India", "لشکرکشی به هند"),

 ("At the battle of Karnal, his smaller, hardened army shattered the enormous but unwieldy Mughal host in a single day. The road to Delhi, the jewel of the East, lay open before him.",
  "در نبرد کرنال، سپاه کوچک‌تر اما آبدیدهٔ او لشکر عظیم و سنگین گورکانیان را در یک روز درهم شکست. راه دهلی، نگین شرق، پیش رویش گشوده شد."),

 ("The treasure of the world", "گنجینهٔ جهان"),

 ("Nader entered Delhi in triumph, and the wealth he carried away from it was almost beyond counting, the accumulated treasure of the Mughal emperors gathered over two centuries. The plunder was so immense that, upon his return, he is said to have exempted the people of Iran from taxes for years.",
  "نادر پیروزمندانه وارد دهلی شد و ثروتی که از آنجا با خود برد، تقریباً قابل شمارش نبود؛ گنجینه‌ای انباشته از ثروت پادشاهان گورکانی در طول دو قرن. غنیمت چنان عظیم بود که گفته‌اند پس از بازگشت، مردم ایران را برای سال‌ها از پرداخت مالیات معاف کرد."),

 ("Nader captures Delhi", "نادر دهلی را تصرف می‌کند"),
 ("The Mughal army destroyed in a day", "سپاه گورکانیان در یک روز درهم می‌شکند"),
 ("Taxes he waived in Iran from the plunder", "مالیات‌هایی که نادر به برکت غنیمت‌ها در ایران بخشید"),
 ("Riches carried home from India", "ثروتی که از هند به ایران آورد"),

 ("The Peacock Throne and a mountain of light", "تخت طاووس و کوه نور"),

 ("Among the treasures he took were the most legendary jewels in the world. He carried away the fabled Peacock Throne of the Mughal emperors, glittering with gems, which became the very symbol of the Persian monarchy for centuries after.",
  "در میان گنجینه‌هایی که با خود برد، افسانه‌ای‌ترین جواهرات جهان نیز بود. او تخت افسانه‌ای طاووسِ پادشاهان گورکانی را با خود آورد؛ تختی پوشیده از جواهرات درخشان که در قرن‌های پس از آن به نماد پادشاهی ایران تبدیل شد."),

 ("The Peacock Throne", "تخت طاووس"),

 ("From Delhi, Nader carried home the jewelled Peacock Throne and the legendary diamonds of the Mughals, treasures still spoken of today.",
  "نادر از دهلی تخت طاووسِ نگین‌نشان و الماس‌های افسانه‌ای گورکانیان را با خود به ایران آورد؛ گنجینه‌هایی که هنوز هم از آنها سخن گفته می‌شود."),

 ("The Genius and the Shadow", "نبوغ و سایه"),
 ("The two faces of Nader", "دو چهرهٔ نادر"),

 ("Nader was a man of dazzling gifts, and his mind ranged far beyond the battlefield. He was a military innovator who understood artillery and the modern arts of war better than almost anyone in the East, and he even sought to build a navy for Iran on the Persian Gulf, a rare and forward-looking ambition.",
  "نادر مردی با توانایی‌های خیره‌کننده بود و ذهنش بسیار فراتر از میدان جنگ می‌رفت. او نوآوری در عرصهٔ نظامی بود که توپخانه و فنون نوین جنگ را بهتر از تقریباً هر کس دیگری در شرق می‌شناخت و حتی کوشید برای ایران در خلیج فارس نیروی دریایی بسازد؛ آرزویی کم‌سابقه و آینده‌نگرانه."),

 ("He was also, in matters of faith, a pragmatist who tried to heal the ancient rift between the Sunni and Shia branches of Islam, hoping to unite them and end centuries of division, a strikingly bold idea for his age.",
  "در مسائل دینی نیز مردی عمل‌گرا بود. کوشید شکاف کهن میان دو شاخهٔ سنی و شیعهٔ اسلام را التیام بخشد، به امید آنکه آنها را به هم نزدیک کند و به قرن‌ها جدایی پایان دهد؛ اندیشه‌ای به‌طرزی چشمگیر جسورانه برای روزگار خودش."),

 ("The genius", "نبوغ"),

 ("A brilliant general and innovator who saved Iran, conquered India, and dreamed of a navy and religious peace.",
  "سرداری درخشان و نوآور که ایران را نجات داد، هند را فتح کرد و رؤیای ساختن نیروی دریایی و برقراری صلح مذهبی را در سر داشت."),

 ("The shadow", "سایه"),
 ("The darkening of a great mind", "تیره شدن ذهنی بزرگ"),

 ("The sword that saved Iran turned, in the end, against its own people.",
  "شمشیری که ایران را نجات داده بود، سرانجام علیه مردم خودش به کار افتاد."),

 ("The Fall of the Sword", "فرود آمدن شمشیر"),

 ("In the night, a band of his own commanders crept into his tent and killed him as he slept. The greatest warrior of the age, who had conquered from the Caucasus to Delhi and whom no enemy could defeat in the field, fell at last to the daggers of his own men.",
  "شبانه، گروهی از فرماندهان خودش به خیمه‌اش رفتند و او را در خواب کشتند. بزرگ‌ترین جنگاور آن روزگار، که از قفقاز تا دهلی را فتح کرده بود و هیچ دشمنی در میدان نبرد نتوانسته بود شکستش دهد، سرانجام به دست مردان خودش از پا درآمد."),

 ("No enemy could defeat him. Only his own could bring him down.",
  "هیچ دشمنی نتوانست شکستش دهد؛ تنها مردان خودش توانستند از پای درش بیاورند."),

 ("From the chaos that followed his death, in time, would rise the gentle Karim Khan of the Zand, who gave Iran the peace that Nader, for all his conquests, never could.",
  "از دل آشوبی که پس از مرگش به وجود آمد، سرانجام کریم‌خان زندِ آرام و مهربان سر برآورد؛ مردی که آرامشی به ایران بخشید که نادر، با همهٔ فتوحاتش، هرگز نتوانست به آن دست یابد."),

 ("This has been a glimpse of Nader Shah and the Afsharids, one of the most extraordinary and complex stories in all of Iranian history. Nader was a shepherd boy who became a conqueror to rival the greatest of the ancient world, a military genius who saved his nation from ruin and carried its banners to the gates of the East.",
  "این نگاهی کوتاه بود به نادرشاه و افشاریان؛ یکی از شگفت‌انگیزترین و پیچیده‌ترین داستان‌ها در سراسر تاریخ ایران. نادر پسر چوپانی بود که به فاتحی در حد بزرگ‌ترین فاتحان جهان باستان تبدیل شد؛ نابغه‌ای نظامی که ملتش را از ویرانی نجات داد و پرچم‌هایش را تا دروازه‌های شرق پیش برد."),

 ("A shepherd who conquered an empire, and a genius undone by his own shadow.",
  "چوپانی که امپراتوری‌ای را فتح کرد و نابغه‌ای که سرانجام سایهٔ خودش او را از پا درآورد."),
]

ANCHORED = [
 ("most famous campaign was his boldest",
  "نامدارترین لشکرکشی نادر، جسورانه‌ترین لشکرکشی او نیز بود. در سال ۱۷۳۸، سپاهش را به سوی شرق برد، از افغانستان و فراز کوه‌ها گذشت و بر امپراتوری پهناور و افسانه‌وار ثروتمند گورکانیان هند فرود آمد؛ ثروتمندترین قلمرو روی زمین."),
 ("the Koh-i-Noor, the Mountain of Light",
  "در میان آن جواهرات، دو الماس از مشهورترین الماس‌های تاریخ نیز بودند: دریای نور، که تا امروز در ایران باقی مانده است، و کوه نور، که در ادامهٔ سفر تاریخی خود سرانجام به جواهرات سلطنتی انگلستان راه یافت. گنجینه‌های لشکرکشی نادر به هند، خود به افسانه‌هایی ماندگار تبدیل شدند."),
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
