# Geography, in Nojan's Persian.
#
# Applied by matching the English, since that is stable — the Persian is
# what changes, and matching on it would fail the moment it did.
#
# Arabic ي and ك normalised to Persian ی and ک. They look almost the same
# and are different characters: Vazirmatn shapes them differently, and a
# search for یک would never find يك.

import os
import re

SWAP = {'\u064a': '\u06cc', '\u0643': '\u06a9'}


def persian(t: str) -> str:
    for a, b in SWAP.items():
        t = t.replace(a, b)
    return t


PAIRS = [
 ("The Beating Heart",
  "قلب تپنده"),

 ("Look at a map of the old world and your eye is drawn, almost against its will, to one place.",
  "به نقشهٔ دنیای قدیم که نگاه می‌کنی، چشمت بی‌اختیار به یک نقطه جذب می‌شود."),

 ("Iran sits at the exact hinge of the ancient world. West lies the Mediterranean and the empires of Rome and Byzantium. East lie India and China. North are the steppes of Central Asia. South is the warm water of the Gulf and the sea road to Africa. Everything that moved between these worlds moved through here.",
  "ایران درست بر چهارراه دنیای کهن ایستاده است. در غرب، مدیترانه و امپراتوری‌های روم و بیزانس؛ در شرق، هند و چین؛ در شمال، دشت‌های بی‌کران آسیای میانه؛ و در جنوب، آب‌های گرم خلیج فارس و راه دریایی آفریقا. هر چه میان این جهان‌ها رفت و آمد کرده، از ایران گذشته است."),

 ("A bridge, not a corner",
  "یک پل، نه یک گوشه"),

 ("Most nations sit at the edge of something. Iran sits in the middle of everything. The Silk Road did not pass by Iran, it passed through it. The goods of China reached Rome through Persian hands. The mathematics of India reached Europe through Persian scholars. This was not an accident of trade. It was geography.",
  "بیشتر کشورها در حاشیهٔ چیزی نشسته‌اند. ایران در میانهٔ همه‌چیز. جادهٔ ابریشم از کنار ایران نگذشت، از دلش عبور کرد. کالای چین با دست ایرانی به روم رسید و ریاضیات هند با قلم دانشمند ایرانی به اروپا. این اتفاقِ تجارت نبود، جغرافیا بود."),

 ("Iran is not on the way to somewhere. It is the way.",
  "ایران سرِ راهِ جایی نیست؛ خودش راه است."),

 ("A land in the middle of everything receives everything, and gives everything back changed. That is why Persian civilization has always been a civilization of synthesis, taking in the world and returning it transformed, in art, in language, in thought.",
  "سرزمینی که در میانهٔ همه‌چیز باشد، همه‌چیز را می‌گیرد و دگرگون‌شده پس می‌دهد. برای همین تمدن ایرانی همیشه تمدنِ آمیختن بوده است: جهان را در خود می‌گیرد و پرمایه‌تر بازمی‌گرداند؛ در هنر، در زبان، در اندیشه."),

 ("The shape of the land",
  "شکل سرزمین"),

 ("Iran is a high plateau, ringed by mountains like the rim of a bowl. The Zagros run down its western flank, the Alborz wall off the Caspian in the north, and within their embrace lie the great deserts, the Dasht e Kavir and the Dasht e Lut.",
  "ایران فلاتی بلند است، حلقه‌زده در کوه‌ها، مثل لبهٔ یک کاسه. زاگرس در غرب پایین می‌آید، البرز در شمال دریای خزر را پشت دیوار نگه می‌دارد، و در آغوش این دو، کویرهای بزرگ نشسته‌اند: دشت کویر و دشت لوت."),

 ("This is a country that holds rainforest and salt desert, snowfield and mangrove, sometimes within a single day of travel. Few nations on earth contain such extremes inside one border.",
  "کشوری است که جنگل بارانی و کویر نمک را با هم دارد، برف و حرا را، گاهی به فاصلهٔ یک روز راه. کمتر جایی روی زمین این‌همه تضاد را در یک مرز جا داده است."),

 ("The Gift and the Burden",
  "موهبت و مسئولیت"),

 ("To sit at the centre of the world is a gift and a burden, and Iran has known both in full measure. The same position that brought wealth brought armies. The same openness that let ideas in let invaders in.",
  "در مرکز جهان نشستن هم موهبت است و هم مسئولیت، و ایران هر دو را تمام و کمال چشیده است. همان موقعیتی که ثروت آورد، لشکرکشی هم آورد. همان دری که اندیشه را به درون راه داد، مهاجم را هم راه داد."),

 ("What the land gave",
  "آنچه این سرزمین بخشید"),

 ("The mountains were a fortress. Time and again the Zagros and the Alborz broke the force of invasion, and gave the people of the plateau a place to gather and return. The Parthians used this country to hold Rome at the Euphrates for three centuries. Rome never crossed the plateau.",
  "کوه‌ها دژ بودند. بارها و بارها زاگرس و البرز شتاب حمله را شکستند و به مردم فلات جایی دادند تا گرد هم آیند و بازگردند. اشکانیان با همین سرزمین سه قرن روم را پشت فرات نگه داشتند. روم هرگز از فلات نگذشت."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


roots = ["constants", "components", "app"]

for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            p = os.path.join(dirpath, f)
            s = open(p).read()
            before = s

            for en, fa in PAIRS:
                fa = persian(fa)
                needle = esc(en)
                at = s.find(needle)
                if at < 0:
                    continue
                # The Persian field that follows this English one, within
                # the same object. Bounded so a miss cannot reach into the
                # next entry and overwrite something unrelated.
                tail = s[at + len(needle): at + len(needle) + 900]
                fm = re.search(r"[Ff]a: '([^']*)'", tail)
                if not fm:
                    continue
                start = at + len(needle) + fm.start(1)
                end = at + len(needle) + fm.end(1)
                s = s[:start] + esc(fa) + s[end:]

            if s != before:
                open(p, "w").write(s)
                print("updated:", p)

# and a report on what actually landed
blob = ""
for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if f.endswith((".ts", ".tsx")):
                blob += open(os.path.join(dirpath, f)).read()

hit, miss = 0, []
for en, fa in PAIRS:
    if esc(persian(fa)) in blob:
        hit += 1
    else:
        miss.append(en[:58])

print("\napplied:", hit, "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
