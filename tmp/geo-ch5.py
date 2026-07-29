# -*- coding: utf-8 -*-
# Geography chapter five: The Great Cities.

p = "constants/geography.ts"
s = open(p).read()

if "titleFa: 'شهرهای بزرگ'" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("""    title: 'The Great Cities',
    nav: 'Cities',
    subtitle: 'WHERE THE PEOPLE ARE',""",
  """    title: 'The Great Cities',
    titleFa: 'شهرهای بزرگ',
    nav: 'Cities',
    navFa: 'شهرها',
    subtitle: 'WHERE THE PEOPLE ARE',
    subtitleFa: 'مردم کجا هستند',"""),

 ("{ t: 'p', x: 'A country is its cities, and Iran cities were placed by water and by road. Where a mountain stream could be tapped, or a trade route had to pass, a city grew. Some have stood so long that their founding is myth rather than record.' }",
  "{ t: 'p', x: 'A country is its cities, and Iran cities were placed by water and by road. Where a mountain stream could be tapped, or a trade route had to pass, a city grew. Some have stood so long that their founding is myth rather than record.', fa: 'کشور همان شهرهایش است، و شهرهای ایران را آب و راه جانمایی کرده‌اند. هر جا می‌شد چشمه‌ای کوهستانی را گرفت، یا راه بازرگانی ناچار از آنجا می‌گذشت، شهری بالا آمد. بعضی‌شان چنان دیرپا هستند که بنیادشان به جای تاریخ، در اسطوره ثبت شده.' }"),

 ("{ t: 'h', x: 'Why they stand where they stand' }",
  "{ t: 'h', x: 'Why they stand where they stand', fa: 'چرا همان‌جا ایستاده‌اند' }"),

 ("{ t: 'p', x: 'Look closely and a pattern appears. Almost every great Iranian city sits at the foot of a mountain, not on a river. Tehran against the Alborz, Shiraz and Isfahan in the folds of the Zagros, Mashhad below the hills of Khorasan. The mountains held the snow, the snow fed the springs, and the qanats carried that water out to the plain.' }",
  "{ t: 'p', x: 'Look closely and a pattern appears. Almost every great Iranian city sits at the foot of a mountain, not on a river. Tehran against the Alborz, Shiraz and Isfahan in the folds of the Zagros, Mashhad below the hills of Khorasan. The mountains held the snow, the snow fed the springs, and the qanats carried that water out to the plain.', fa: 'کمی دقیق‌تر که نگاه کنی، الگویی بیرون می‌زند. تقریباً هر شهر بزرگ ایران پای کوه نشسته، نه کنار رود. تهران تکیه داده به البرز، شیراز و اصفهان در چین‌های زاگرس، مشهد زیر تپه‌های خراسان. کوه برف را نگه می‌داشت، برف چشمه را می‌خوراند، و قنات آن آب را تا دشت می‌بُرد.' }"),

 ("{ t: 'mark', x: 'Iranian cities were not built on rivers. They were built on the memory of snow.' }",
  "{ t: 'mark', x: 'Iranian cities were not built on rivers. They were built on the memory of snow.', fa: 'شهرهای ایران را کنار رود نساختند. روی خاطرهٔ برف ساختند.' }"),

 ("{ t: 'p', x: 'This is why the map of Iran cities is really a map of its mountains. Where the ranges run, the cities follow, strung along the inner edge of the highlands like beads on a thread, with the empty deserts held at the centre.' }",
  "{ t: 'p', x: 'This is why the map of Iran cities is really a map of its mountains. Where the ranges run, the cities follow, strung along the inner edge of the highlands like beads on a thread, with the empty deserts held at the centre.', fa: 'برای همین نقشهٔ شهرهای ایران در حقیقت نقشهٔ کوه‌هایش است. هر جا رشته‌کوه می‌رود، شهرها هم دنبالش می‌روند؛ مثل مهره‌هایی به نخ کشیده در لبهٔ درونی بلندی‌ها، و کویرهای خالی در میانه نگه داشته شده‌اند.' }"),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "anchor(s):")
    for m in missing:
        print("   -", m[:70])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b, 1)

open(p, "w").write(s)
print("chapter five translated:", len(PAIRS), "blocks")
