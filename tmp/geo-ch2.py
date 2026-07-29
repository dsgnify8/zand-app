# -*- coding: utf-8 -*-
# Geography chapter two: The Gift and the Burden.
# Refuses to write unless every anchor is found.

p = "constants/geography.ts"
s = open(p).read()

if "موهبت و بار" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 # chapter heading
 ("""    title: 'The Gift and the Burden',
    nav: 'History',
    subtitle: 'GEOGRAPHY THROUGH HISTORY',""",
  """    title: 'The Gift and the Burden',
    titleFa: 'موهبت و بار',
    nav: 'History',
    navFa: 'تاریخ',
    subtitle: 'GEOGRAPHY THROUGH HISTORY',
    subtitleFa: 'جغرافیا در گذر تاریخ',"""),

 ("{ t: 'p', x: 'To sit at the centre of the world is a gift and a burden, and Iran has known both in full measure. The same position that brought wealth brought armies. The same openness that let ideas in let invaders in.' }",
  "{ t: 'p', x: 'To sit at the centre of the world is a gift and a burden, and Iran has known both in full measure. The same position that brought wealth brought armies. The same openness that let ideas in let invaders in.', fa: 'در مرکز جهان نشستن هم موهبت است و هم بار، و ایران هر دو را تمام و کمال چشیده است. همان موقعیتی که ثروت آورد، لشکر هم آورد. همان دری که اندیشه را به درون راه داد، مهاجم را هم راه داد.' }"),

 ("{ t: 'h', x: 'What the land gave' }",
  "{ t: 'h', x: 'What the land gave', fa: 'آنچه سرزمین بخشید' }"),

 ("{ t: 'p', x: 'The mountains were a fortress. Time and again the Zagros and the Alborz broke the force of invasion, and gave the people of the plateau a place to gather and return. The Parthians used this country to hold Rome at the Euphrates for three centuries. Rome never crossed the plateau.' }",
  "{ t: 'p', x: 'The mountains were a fortress. Time and again the Zagros and the Alborz broke the force of invasion, and gave the people of the plateau a place to gather and return. The Parthians used this country to hold Rome at the Euphrates for three centuries. Rome never crossed the plateau.', fa: 'کوه‌ها دژ بودند. بارها و بارها زاگرس و البرز شتاب حمله را شکستند و به مردم فلات جایی دادند تا گرد هم آیند و بازگردند. اشکانیان با همین سرزمین سه قرن روم را پشت فرات نگه داشتند. روم هرگز از فلات نگذشت.' }"),

 ("{ t: 'p', x: 'The position was a fortune. Every empire that ruled here grew rich on the trade that had nowhere else to go. Silk, spice, and gold crossed Iranian soil, and Iranian hands took their share.' }",
  "{ t: 'p', x: 'The position was a fortune. Every empire that ruled here grew rich on the trade that had nowhere else to go. Silk, spice, and gold crossed Iranian soil, and Iranian hands took their share.', fa: 'این موقعیت خودش ثروت بود. هر امپراتوری که اینجا حکم راند، از تجارتی که راه دیگری نداشت توانگر شد. ابریشم و ادویه و طلا از خاک ایران گذشتند و دست ایرانی سهم خودش را برداشت.' }"),

 ("{ t: 'p', x: 'And where water was scarce, Iranians invented their way around it. The qanat, an underground channel tapping mountain groundwater and carrying it for miles beneath the desert, is a Persian invention thousands of years old, and it made cities possible where there was no river at all.' }",
  "{ t: 'p', x: 'And where water was scarce, Iranians invented their way around it. The qanat, an underground channel tapping mountain groundwater and carrying it for miles beneath the desert, is a Persian invention thousands of years old, and it made cities possible where there was no river at all.', fa: 'و هر جا آب کم بود، ایرانی راهی از دلش بیرون کشید. قنات، کاریزی زیرزمینی که آب کوه را می‌گیرد و فرسنگ‌ها زیر کویر می‌بَرد، اختراعی ایرانی است به قدمت هزاران سال، و شهرهایی را ممکن کرد که هیچ رودی نداشتند.' }"),

 ("{ t: 'mark', x: 'They could not move the desert, so they ran rivers underneath it.' }",
  "{ t: 'mark', x: 'They could not move the desert, so they ran rivers underneath it.', fa: 'کویر را نمی‌شد جابه‌جا کرد، پس رود را از زیرش گذراندند.' }"),

 ("{ t: 'h', x: 'What the land cost' }",
  "{ t: 'h', x: 'What the land cost', fa: 'آنچه سرزمین گرفت' }"),

 ("{ t: 'p', x: 'The open east was a wound that never closed. Across the steppe came the Turks, the Mongols, and Timur, and each time the flat northeast offered no wall to stop them. The Mongol invasion, arriving through that open door, was among the greatest catastrophes Iran ever suffered.' }",
  "{ t: 'p', x: 'The open east was a wound that never closed. Across the steppe came the Turks, the Mongols, and Timur, and each time the flat northeast offered no wall to stop them. The Mongol invasion, arriving through that open door, was among the greatest catastrophes Iran ever suffered.', fa: 'شرقِ باز زخمی بود که هرگز بسته نشد. از آن سوی دشت‌ها ترکان آمدند، مغولان آمدند، تیمور آمد، و هر بار شمال شرقِ هموار دیواری برای بازداشتنشان نداشت. هجوم مغول، که از همان در باز رسید، از بزرگ‌ترین فاجعه‌هایی بود که بر ایران گذشت.' }"),

 ("{ t: 'p', x: 'And in the modern age the same centrality drew a different kind of pressure. Russia to the north and Britain to the south did not want Iran for its soil but for its position, and later for what lay beneath it. A country at the centre of the world is never left alone by the powers of the world.' }",
  "{ t: 'p', x: 'And in the modern age the same centrality drew a different kind of pressure. Russia to the north and Britain to the south did not want Iran for its soil but for its position, and later for what lay beneath it. A country at the centre of the world is never left alone by the powers of the world.', fa: 'و در دوران جدید، همین مرکزیت فشاری از جنس دیگر آورد. روسیه از شمال و بریتانیا از جنوب، ایران را نه برای خاکش که برای جایش می‌خواستند، و بعدها برای آنچه زیر خاکش بود. کشوری که در مرکز جهان است، هیچ‌وقت از سوی قدرت‌های جهان به حال خود رها نمی‌شود.' }"),

 ("{ t: 'p', x: 'The oil found in Khuzestan in the early twentieth century made that truth heavier still. Geography had given Iran the crossroads, and then it gave it the prize.' }",
  "{ t: 'p', x: 'The oil found in Khuzestan in the early twentieth century made that truth heavier still. Geography had given Iran the crossroads, and then it gave it the prize.', fa: 'نفتی که اوایل قرن بیستم در خوزستان پیدا شد، این حقیقت را سنگین‌تر کرد. جغرافیا اول چهارراه را به ایران داده بود، بعد جایزه را هم گذاشت وسط.' }"),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "anchor(s):")
    for m in missing:
        print("   -", m[:70])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b)

open(p, "w").write(s)
print("chapter two translated:", len(PAIRS), "blocks")
