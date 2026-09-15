# Cyrus, second pass.
#
# Refinements over the first pass, plus the image captions that pass
# missed. Anything with an apostrophe is anchored on a fragment without
# one, since the file spells them inconsistently.

import re

PAIRS = [
 ("A King Is Born", "شاهی زاده می‌شود"),

 ("More than two and a half thousand years ago, in the highlands of what is now southern Iran, a child was born who would change the shape of the ancient world. His name was Kurush, whom history remembers as Cyrus, and the empire he built would be the largest the world had yet seen.",
  "بیش از دو هزار و پانصد سال پیش، در سرزمین‌های کوهستانی جایی که امروز جنوب ایران است، کودکی به دنیا آمد که قرار بود چهره جهان باستان را دگرگون کند. نامش کوروش بود و امپراتوری‌ای که بنا کرد، بزرگ‌ترین امپراتوری‌ای شد که جهان تا آن زمان به خود دیده بود."),

 ("The land of his birth, Persia, was then a small kingdom of herders and farmers, a subject people living in the shadow of the mighty Median Empire to their north. Few could have imagined that from this modest place would rise a ruler whose name would still be spoken with reverence across the world, so many centuries later.",
  "سرزمین زادگاهش، پارس، در آن روزگار پادشاهی کوچکی از چوپانان و کشاورزان بود؛ مردمانی زیر فرمان و در سایه امپراتوری نیرومند ماد در شمال. کمتر کسی تصور می‌کرد از چنین جای کوچکی فرمانروایی برخیزد که قرن‌ها بعد، هنوز نامش با احترام در سراسر جهان برده شود."),

 ("The legend of the infant king", "افسانه شاهِ نوزاد"),

 ("This boy, the son of a herdsman as we supposed, is in truth the grandson of the king.",
  "این پسر، که گمان می‌کردیم فرزند چوپانی است، در حقیقت نوه شاه است."),

 ("A world waiting to be remade", "جهانی در انتظار دگرگونی"),

 ("From a small kingdom of herders, he would build the greatest empire the world had known.",
  "او از پادشاهی کوچک چوپانان، بزرگ‌ترین امپراتوری جهان آن روز را ساخت."),

 ("The Rise Against the Medes", "خیزش در برابر مادها"),
 ("The battle that changed everything", "نبردی که همه‌چیز را دگرگون کرد"),
 ("A new kind of conqueror", "فاتحی از جنس دیگر"),

 ("Croesus and the Fall of Lydia", "کرزوس و سقوط لیدیه"),

 ("If Croesus makes war on the Persians, he will destroy a mighty empire.",
  "اگر کرزوس با پارسیان وارد جنگ شود، امپراتوری بزرگی را نابود خواهد کرد."),

 ("A trick of camels", "ترفند شترها"),
 ("The mercy of the victor", "بخشش فاتح"),

 ("No man should be counted happy until the end of his life is known.",
  "هیچ‌کس را خوشبخت مشمار، مگر آنکه پایان زندگی‌اش را دیده باشی."),

 ("Babylon and the Freeing of the Captives", "بابل و رهایی اسیران"),

 ("Now only one of the great powers stood between Cyrus and mastery of the known world: Babylon, the ancient and magnificent city on the Euphrates, its walls counted among the wonders of the earth. In 539 BCE, Cyrus turned toward it.",
  "حالا تنها یکی از قدرت‌های بزرگ میان کوروش و فرمانروایی بر جهان شناخته‌شده قرار داشت: بابل، شهر باستانی و باشکوهی بر کرانه فرات، با دیوارهایی که از شگفتی‌های جهان به شمار می‌رفتند. در سال ۵۳۹ پیش از میلاد، کوروش به سوی آن روی آورد."),

 ("The Cyrus Cylinder", "استوانه کوروش"),

 ("The Cyrus Cylinder, on which the king recorded his acts. It survives in the British Museum.",
  "استوانه کوروش، که شاه اقدامات خود را بر آن ثبت کرد. این اثر امروز در موزه بریتانیا نگهداری می‌شود."),

 ("I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.",
  "خدایانی را که در آنجا می‌زیستند به جایگاه‌هایشان بازگرداندم و گذاشتم در جایگاه‌های جاودان خود سکونت کنند. همه مردمانشان را گرد آوردم و خانه‌هایشان را به آنان بازگرداندم."),

 ("The return of the exiles", "بازگشت تبعیدیان"),

 ("Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.",
  "کوروش، شاه پارس، چنین می‌گوید: خداوند مرا فرمان داده است تا برای او در اورشلیم خانه‌ای بنا کنم. هر کس از قوم او در میان شماست، برخیزد و به آنجا برود."),

 ("The Empire and Its Ideals", "امپراتوری و آرمان‌های آن"),

 ("By now the empire of Cyrus stretched from the Aegean Sea in the west to the borders of India in the east, the largest the world had yet seen. But its true greatness lay not in its size. It lay in how he chose to rule it.",
  "تا آن زمان، امپراتوری کوروش از دریای اژه در غرب تا مرزهای هند در شرق گسترده شده بود؛ بزرگ‌ترین امپراتوری‌ای که جهان تا آن روز به خود دیده بود. اما عظمت واقعی آن در وسعتش نبود؛ در شیوه‌ای بود که کوروش برای فرمانروایی بر آن برگزیده بود."),

 ("The empire of Cyrus at its height, from the Aegean and Egypt to the Indus.",
  "شاهنشاهی کوروش در اوج خود، از دریای اژه و مصر تا رود سند."),

 ("A new idea of empire", "نگاهی نو به مفهوم امپراتوری"),
 ("Tolerance of faith", "بردباری دینی"),

 ("Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.",
  "هر قوم آزاد بود خدایان خود را بپرستد. کوروش نیز به نیایشگاه‌های سرزمین‌هایی که بر آن‌ها فرمان می‌راند احترام می‌گذاشت."),

 ("An idea that endures", "اندیشه‌ای ماندگار"),
 ("The Death of a King", "مرگ یک شاه"),
 ("The tomb at Pasargadae", "آرامگاه پاسارگاد"),

 ("The tomb of Cyrus the Great at Pasargadae, which has stood for over 2,500 years.",
  "آرامگاه کوروش بزرگ در پاسارگاد، که بیش از دو هزار و پانصد سال است پابرجاست."),

 ("An inscription said to have once stood there carried words of quiet dignity, a king asking not for glory but for peace, reminding the passer by that he too was mortal.",
  "گفته می‌شود زمانی سنگ‌نوشته‌ای در آنجا قرار داشته که کلماتی ساده و باوقار بر آن نقش بسته بود؛ سخنان شاهی که نه شکوه، بلکه آرامش می‌خواست و به هر رهگذری یادآوری می‌کرد که او نیز فانی است."),

 ("O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.",
  "ای انسان، هر که هستی، من کوروشم؛ آن‌که برای پارسیان امپراتوری‌ای به دست آورد. بر این اندک خاکی که پیکرم را پوشانده است، دریغ مدار."),

 ("The Legacy That Endures", "میراثی که ماندگار است"),
 ("The king the world remembered", "شاهی که جهان به یاد سپرد"),

 ("The remains of Pasargadae, the capital Cyrus built, still standing on the Iranian plain.",
  "بقایای پاسارگاد، پایتختی که کوروش بنا کرد، هنوز بر دشت ایران پابرجاست."),

 ("He won an empire by the sword, and kept it by justice. The world has not forgotten him.",
  "او امپراتوری را با شمشیر به دست آورد، اما آن را با عدالت حفظ کرد. جهان هنوز او را از یاد نبرده است."),
]

ANCHORED = [
 ("whom history remembers as Cyrus",
  "بیش از دو هزار و پانصد سال پیش، در سرزمین‌های کوهستانی جایی که امروز جنوب ایران است، کودکی به دنیا آمد که قرار بود چهره جهان باستان را دگرگون کند. نامش کوروش بود و امپراتوری‌ای که بنا کرد، بزرگ‌ترین امپراتوری‌ای شد که جهان تا آن زمان به خود دیده بود."),
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
        print("   anchor not found:", anchor[:44]); continue
    m = re.compile(r"(?:[a-zA-Z]*[Ff]a): '((?:[^'\\]|\\.)*)'").search(s, i)
    if not m:
        continue
    s = s[:m.start(1)] + esc(fa) + s[m.end(1):]
    applied += 1

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
