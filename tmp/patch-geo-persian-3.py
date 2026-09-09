# Geography, third pass.
#
# Matched on the complete field value this time, not a substring. The
# earlier pass searched for the English anywhere in the file, and "The
# mountains" turned up inside "The mountains above Tehran fill on
# Fridays" — which replaced a paragraph's translation with a heading's.
# Requiring `x: '<exactly this>'` makes that impossible.

import os
import re

PAIRS = [
 ("The position was a fortune. Every empire that ruled here grew rich on the trade that had nowhere else to go. Silk, spice, and gold crossed Iranian soil, and Iranian hands took their share.",
  "این موقعیت به خودی خود، ثروت بود. هر امپراتوری که اینجا حکم راند، از تجارتی که راه دیگری به جز ایران نداشت، توانگر شد. ابریشم و ادویه و طلا از خاک ایران گذشتند و ایرانی‌ها سهم خود را برداشتند."),

 ("And where water was scarce, Iranians invented their way around it. The qanat, an underground channel tapping mountain groundwater and carrying it for miles beneath the desert, is a Persian invention thousands of years old, and it made cities possible where there was no river at all.",
  "و هر جا آب کم بود، ایرانی راهی از دلش بیرون کشید. قنات، کاریزی زیرزمینی که آب کوه را می‌گیرد و فرسنگ‌ها زیر کویر می‌بَرد، اختراعی ایرانی است به قدمت هزاران سال، و آبادیِ شهرهایی را ممکن کرد که هیچ رودی نداشتند."),

 ("They could not move the desert, so they ran rivers underneath it.",
  "کویر را نمی‌توانستند جابه‌جا کنند؛ پس رود را از زیرش گذراندند."),

 ("What the land cost",
  "این سرزمین چه هزینه‌ای پرداخت"),

 ("The open east was a wound that never closed. Across the steppe came the Turks, the Mongols, and Timur, and each time the flat northeast offered no wall to stop them. The Mongol invasion, arriving through that open door, was among the greatest catastrophes Iran ever suffered.",
  "باز بودنِ مرزهای شرقی زخمی بود که هرگز بسته نشد. از آن سوی دشت‌ها ترکان آمدند، مغولان آمدند، تیمور آمد؛ و هر بار مرزِ هموارِ شمال شرقی دیواری برای بازداشتنشان نداشت. هجوم مغول، که از همان درِ باز رسید، از بزرگ‌ترین فاجعه‌هایی بود که بر ایران گذشت."),

 ("And in the modern age the same centrality drew a different kind of pressure. Russia to the north and Britain to the south did not want Iran for its soil but for its position, and later for what lay beneath it. A country at the centre of the world is never left alone by the powers of the world.",
  "و در دوران جدید، همین مرکزیت فشاری از جنس دیگر آورد. روسیه از شمال و بریتانیا از جنوب، ایران را نه برای خاکش که برای موقعیت جغرافیایی‌اش می‌خواستند، و بعدها برای آنچه زیر خاکش بود. کشوری که در مرکز جهان است، هیچ‌وقت از سوی قدرت‌های جهان به حال خود رها نمی‌شود."),

 ("The oil found in Khuzestan in the early twentieth century made that truth heavier still. Geography had given Iran the crossroads, and then it gave it the prize.",
  "نفتی که اوایل قرن بیستم در خوزستان پیدا شد، این حقیقت را سنگین‌تر کرد. جغرافیا اول چهارراه را به ایران داده بود، بعد جایزه را هم در مرکز همان چهارراه گذاشت."),

 ("The Neighbours",
  "همسایه‌ها"),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


roots = ["constants", "components", "app"]
touched = set()
applied = 0

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
                # The whole field, quote to quote — so a heading can never
                # match inside a paragraph that happens to contain it.
                pat = re.compile(
                    r"(x: '" + re.escape(esc(en)) + r"',\s*(?:[a-zA-Z]*[Ff]a): ')([^']*)(')"
                )
                s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
                applied += n

            if s != before:
                open(p, "w").write(s)
                touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = ""
for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if f.endswith((".ts", ".tsx")):
                blob += open(os.path.join(dirpath, f)).read()

miss = [en[:58] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
