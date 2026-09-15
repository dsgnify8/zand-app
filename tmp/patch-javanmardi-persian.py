# Javanmardi, in Nojan's Persian.
#
# Twenty-three pairs. The English has to explain a word Persian readers
# already own, so several lines that work as introduction in English
# would be condescending in Persian — the translations tighten them
# rather than rendering them literally.

import re

PAIRS = [
 ("Javanmardi", "جوانمردی"),
 ("THE HOUSE OF STRENGTH", "خانهٔ زور"),

 ("A thousand year old code of chivalry, and a pit where men swing clubs while a drummer chants Ferdowsi at them.",
  "مرامی هزارساله، و گودی که در آن مردها میل می‌چرخانند و مرشد با ضرب گرفتن، اشعار فردوسی را برایشان می‌خواند."),

 ("The Young Man Way", "راه و رسم جوانمردی"),

 ("Persian chivalry. A thousand years old, still the highest compliment you can pay a man in Iran, and almost unknown outside it.",
  "جوانمردی ایرانی. هزار سال قدمت دارد، هنوز بالاترین تعریفی است که می‌توان از یک مرد در ایران کرد، و بیرون از ایران تقریباً ناشناخته است."),

 ("The House of Strength", "خانهٔ زور"),

 ("And then there is the building. The zurkhaneh, the house of strength, is one of the strangest and best institutions Iran has produced, and it is roughly a thousand years old.",
  "و بعد، خودِ ساختمان. زورخانه، یعنی خانهٔ زور، یکی از عجیب‌ترین و در عین حال ارزشمندترین نهادهایی است که ایران پدید آورده و حدود هزار سال قدمت دارد."),

 ("It is a low domed room with a pit in the middle, sunk below the floor, so that everyone who enters must step down. Men train in that pit. They swing enormous wooden clubs, they lift a wooden shield, they turn in place, they wrestle.",
  "اتاقی با گنبدی کوتاه است و گودی‌ای در وسط آن که پایین‌تر از کف قرار گرفته، طوری که هر کس وارد می‌شود باید چند پله پایین برود. مردها در همان گود تمرین می‌کنند؛ میل‌های چوبی بزرگ را می‌چرخانند، سنگ‌های زورخانه را بلند می‌کنند، در جای خود می‌چرخند و کشتی می‌گیرند."),

 ("The drum and the poem", "ضرب و شعر"),

 ("And here is the part nobody expects. In a raised seat at the edge sits the morshed, the master, with a goblet drum and a bell. He drums the rhythm the men move to, and while he drums, he chants. He chants Ferdowsi. He chants Hafez and Rumi and Saadi.",
  "و حالا می‌رسیم به آن بخشی که هیچ‌کس انتظارش را ندارد. بر سکویی بلند در کنار گود، مرشد نشسته است؛ با یک ضرب و یک زنگ. ریتمی می‌گیرد که مردها با آن حرکت می‌کنند و هم‌زمان با ضرب گرفتن، آواز می‌خواند. از فردوسی می‌خواند؛ از حافظ و مولانا و سعدی."),

 ("It is a gym where the poetry is played over the sound system, live, by a man with a drum, and the poetry is eight hundred years old.",
  "باشگاهی است که در آن شعر زنده، با ضرب گرفتنِ مردی که آن را می‌خواند، در فضا طنین می‌اندازد؛ و خودِ آن شعر هشتصد سال قدمت دارد."),

 ("So the men in the pit are not only training. They are being told, in rhythm, in verse, what a man is for. The physical culture and the ethical culture and the literature are the same activity, in the same room, at the same time. Nothing else in the world quite works like this.",
  "پس مردهایی که در گود هستند فقط تمرین نمی‌کنند. با ریتم و شعر به آنها یادآوری می‌شود که مرد بودن یعنی چه و چه معنایی دارد. پرورش تن، پرورش اخلاق و ادبیات، همه یک کارند؛ در یک اتاق و در یک زمان. در هیچ جای دیگری از دنیا چیزی دقیقاً شبیه این وجود ندارد."),

 ("The pit is sunk below floor level for a reason. You step down to enter. Nobody stands above anybody.",
  "گود را عمداً پایین‌تر از سطح زمین ساخته‌اند. برای وارد شدن باید پایین بروی. اینجا هیچ‌کس بالاتر از دیگری نمی‌ایستد."),

 ("The Man They Loved", "مردی که دوستش داشتند"),

 ("If you want to know what Iranians mean by javanmard, they will not explain. They will tell you about Takhti.",
  "اگر می‌خواهی بدانی ایرانی‌ها از جوانمرد چه می‌فهمند، برایت توضیح نمی‌دهند؛ از تختی برایت می‌گویند."),

 ("Gholamreza Takhti was a wrestler, an Olympic champion, and the most beloved athlete in Iranian history. But that is not why he is beloved. The stories are all about the same thing.",
  "غلامرضا تختی کشتی‌گیر و قهرمان المپیک بود و محبوب‌ترین ورزشکار تاریخ ایران به شمار می‌رفت. اما دلیل محبوبیتش اینها نیست. همهٔ داستان‌هایی که درباره‌اش مانده، به یک چیز برمی‌گردند."),

 ("The Injured Leg", "آن پای آسیب‌دیده"),

 ("Wrestling a Russian opponent who had an injured right leg, Takhti did not touch it once. He wrestled the man honestly, on his strength, and won without exploiting the injury. The opponent mother is said to have kissed him afterward.",
  "در مسابقه با حریفی روس که پای راستش آسیب دیده بود، تختی حتی یک بار هم سراغ آن پا نرفت. مردانه و جوانمردانه، با تکیه بر توان خودش کشتی گرفت و بدون سوءاستفاده از آسیب حریف پیروز شد. می‌گویند مادر آن حریف بعد از مسابقه او را بوسید."),

 ("And when an earthquake destroyed a town, Takhti went into the streets of Tehran with a collection tin himself, in person, and people gave him everything they had because it was him. He died in 1968, and the circumstances are still argued about, and his funeral filled the city.",
  "و وقتی زلزله‌ای شهری را ویران کرد، تختی خودش، شخصاً، با صندوق جمع‌آوری کمک به خیابان‌های تهران رفت؛ و مردم هرچه داشتند به او دادند، فقط چون تختی بود. او در سال ۱۳۴۶ درگذشت و هنوز هم دربارهٔ چگونگی مرگش بحث و اختلاف‌نظر وجود دارد. تشییع جنازه‌اش شهر را پر کرد."),

 ("And it is still in the room", "و هنوز هم در همان گود هست"),

 ("This is not history. Ask around any Iranian family and you will hear the same thing said with total confidence: give it to a Persian man and it will get done. Whatever it is. The car, the paperwork, the impossible favour, the thing that officially cannot be arranged.",
  "این دیگر فقط تاریخ نیست. در هر خانوادهٔ ایرانی سراغ بگیری، همین جمله را با اطمینان کامل می‌شنوی: بسپارش به یک مرد ایرانی، انجامش می‌دهد. هرچه باشد؛ تعمیر ماشین، کارهای اداری، آن لطفِ ناممکن، یا کاری که رسماً هیچ راهی برای انجام دادنش نیست."),

 ("You do not have to ask a second time. That is the entire compliment, and it is the highest one available.",
  "لازم نیست بار دوم هم درخواست کنی. تمام تعریف همین است، و بالاترین تعریفی است که می‌شود از یک مرد کرد."),

 ("A country that has produced conquerors and kings and poets chose, as the man it loves most, a wrestler who would not touch an injured leg.",
  "کشوری که فاتحان و شاهان و شاعران بزرگی به جهان عرضه کرده، محبوب‌ترین مردش را از میان کشتی‌گیران برگزید؛ مردی که حاضر نشد حتی به پای آسیب‌دیدهٔ حریفش دست بزند."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


paths = ["constants/culture.ts", "components/culture-blocks.tsx"]
applied = 0
touched = set()

for p in paths:
    try:
        s = open(p).read()
    except FileNotFoundError:
        continue
    before = s

    for en, fa in PAIRS:
        pat = re.compile(
            r"((?:x|title|sub|h|lead|en|blurb|tag|label|front|back|name): '"
            + re.escape(esc(en))
            + r"',\s*(?:[a-zA-Z]*[Ff]a|persian): ')((?:[^'\\]|\\.)*)(')"
        )
        s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
        applied += n

    if s != before:
        open(p, "w").write(s)
        touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = "".join(open(p).read() for p in paths)
miss = [en[:52] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
