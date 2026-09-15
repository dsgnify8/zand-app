# Tea, in Nojan's Persian.
#
# Twelve pairs. The same principles as the rest of the culture section:
# the sentence rebuilt for Persian rather than carried over from English,
# the joins said rather than implied, the ezafe marked where it changes
# the reading, and the explaining stripped out — an Iranian does not need
# to be told what a samovar is, so the Persian says what it means instead
# of what it is.

import re

PAIRS = [
 ("Chai", "چای"),
 ("THE SHAPE OF AN EVENING", "شکلِ یک عصر"),

 ("The samovar, the small glass, the sugar cube held in the teeth. Never a drink. Always an occasion.",
  "سماور، استکان کمرباریک، و حبه‌قندی که لای دندان نگه داشته می‌شود. هیچ‌وقت فقط یک نوشیدنی نیست؛ همیشه بهانه‌ای برای یک دورهمی است."),

 ("Never Just a Drink", "هیچ‌وقت فقط یک نوشیدنی"),

 ("Nobody in Iran has ever had a cup of tea. They have had an occasion, and there was tea in it.",
  "هیچ‌کس در ایران تا حالا فقط «یک استکان چای» نخورده است. همیشه اتفاقی در میان بوده و چای هم بخشی از آن بوده است."),

 ("It arrives when you arrive, before anything is said. It arrives when a deal is being discussed, and again when it is done. It arrives at the end of every meal. Refusing it is not really available to you.",
  "همان لحظه که می‌رسی، پیش از آنکه حرفی زده شود، چای می‌آید. وقتی دارند سر معامله‌ای صحبت می‌کنند، می‌آید و وقتی معامله جوش می‌خورد، باز هم می‌آید. آخر هر غذا هم می‌آید. رد کردنش عملاً گزینه‌ای نیست که داشته باشی."),

 ("The Sugar Goes in Your Mouth", "قند در دهان می‌رود"),

 ("The thing visitors never forget. The sugar does not go in the glass. You take a hard cube of sugar, ghand, put it between your front teeth, and drink the hot tea through it.",
  "چیزی که هیچ مهمانی فراموشش نمی‌کند. قند داخل استکان نمی‌رود. یک حبه قند برمی‌داری، آن را لای دندان‌های جلویت می‌گذاری و چای داغ را از روی آن می‌نوشی."),

 ("The cube dissolves slowly as the tea passes over it, so the sweetness is at the front and the tea stays clean behind it. One cube can last most of a glass. Watch an old man do it and you will see it is a technique.",
  "حبه قند وقتی چای از رویش رد می‌شود، آرام‌آرام آب می‌شود؛ در نتیجه شیرینی در جلوی دهان می‌ماند و چای پشت آن طعم خالص خودش را حفظ می‌کند. یک حبه قند می‌تواند بیشترِ یک استکان دوام بیاورد. کافی است پیرمردی را ببینی که این کار را می‌کند تا بفهمی خودش یک فن است."),

 ("The samovar", "سماور"),

 ("And it means the tea is always ready. There is no putting the kettle on in an Iranian house. There is no delay between someone arriving and being handed something. That is the entire point of the object.",
  "و یعنی چای همیشه آماده است. در خانهٔ ایرانی قرار نیست تازه کتری را روی اجاق بگذاری و منتظر بمانی. بین رسیدن کسی و چیزی که به دستش می‌دهند، وقفه‌ای وجود ندارد. تمام فلسفهٔ وجودی این وسیله همین است."),

 ("A samovar kept hot all day so that no one who walks in ever has to wait. That is not a tea habit. That is a statement about how a house should treat whoever comes through the door.",
  "سماوری که تمام روز داغ نگه داشته می‌شود تا هر کس وارد شد، هیچ‌وقت مجبور نباشد منتظر بماند. این فقط عادت چای‌خوری نیست؛ بیانی است از اینکه یک خانه باید با هر کسی که از در وارد می‌شود چگونه رفتار کند."),
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
