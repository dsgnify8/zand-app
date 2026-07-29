# -*- coding: utf-8 -*-
# Geography chapter three: The Neighbours.
# Refuses to write unless every anchor is found.

p = "constants/geography.ts"
s = open(p).read()

if "همسایه‌ها" in s and "titleFa: 'همسایه‌ها'" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("""    title: 'The Neighbours',
    nav: 'Neighbours',
    subtitle: 'IRAN TODAY',""",
  """    title: 'The Neighbours',
    titleFa: 'همسایه‌ها',
    nav: 'Neighbours',
    navFa: 'همسایه‌ها',
    subtitle: 'IRAN TODAY',
    subtitleFa: 'ایران امروز',"""),

 ("{ t: 'p', x: 'Few countries touch as many others. Iran shares a land border with seven nations and a sea border with several more, and each frontier is a different world.' }",
  "{ t: 'p', x: 'Few countries touch as many others. Iran shares a land border with seven nations and a sea border with several more, and each frontier is a different world.', fa: 'کمتر کشوری این‌همه همسایه دارد. ایران با هفت کشور مرز خاکی دارد و با چند کشور دیگر مرز آبی، و پشت هر مرز دنیایی دیگر است.' }"),

 ("cap: 'Iran and its seven land neighbours.'",
  "cap: 'Iran and its seven land neighbours.', capFa: 'ایران و هفت همسایهٔ خاکی‌اش.'"),

 ("{ t: 'h', x: 'The gate of the world' }",
  "{ t: 'h', x: 'The gate of the world', fa: 'دروازهٔ جهان' }"),

 ("{ t: 'p', x: 'At the southern tip, the Strait of Hormuz narrows to a channel a few dozen kilometres wide. Through it passes roughly a fifth of the oil consumed on earth. There is no substitute passage. It is, in the most literal sense, one of the most important stretches of water in the world, and Iran holds its northern shore.' }",
  "{ t: 'p', x: 'At the southern tip, the Strait of Hormuz narrows to a channel a few dozen kilometres wide. Through it passes roughly a fifth of the oil consumed on earth. There is no substitute passage. It is, in the most literal sense, one of the most important stretches of water in the world, and Iran holds its northern shore.', fa: 'در نوک جنوبی، تنگهٔ هرمز به گذرگاهی چند ده کیلومتری تنگ می‌شود. حدود یک‌پنجم نفتی که جهان مصرف می‌کند از همین‌جا می‌گذرد و راه جایگزینی هم ندارد. به معنای دقیق کلمه یکی از مهم‌ترین باریکه‌های آب روی زمین است، و ساحل شمالی‌اش دست ایران است.' }"),

 ("{ t: 'mark', x: 'A fifth of the world energy passes a coastline you could see across.' }",
  "{ t: 'mark', x: 'A fifth of the world energy passes a coastline you could see across.', fa: 'یک‌پنجم انرژی جهان از کنار ساحلی می‌گذرد که آن‌سویش پیداست.' }"),

 ("{ t: 'h', x: 'Two seas' }",
  "{ t: 'h', x: 'Two seas', fa: 'دو دریا' }"),

 ("{ t: 'p', x: 'Iran is one of the few countries to touch two entirely separate seas of different character. The Caspian in the north is the largest inland body of water on earth, fresh enough at its edges to grow rice and tea on its shore. The Gulf in the south is warm, salt, and shallow, a trading sea since before writing.' }",
  "{ t: 'p', x: 'Iran is one of the few countries to touch two entirely separate seas of different character. The Caspian in the north is the largest inland body of water on earth, fresh enough at its edges to grow rice and tea on its shore. The Gulf in the south is warm, salt, and shallow, a trading sea since before writing.', fa: 'ایران از معدود کشورهایی است که به دو دریای کاملاً جدا با دو طبیعت متفاوت راه دارد. خزر در شمال بزرگ‌ترین پهنهٔ آب محصور در خشکی روی زمین است، و کناره‌هایش آن‌قدر شیرین که در ساحلش برنج و چای می‌روید. خلیج فارس در جنوب گرم است و شور و کم‌عمق؛ دریایی بازرگانی، از پیش از آنکه نوشتن اختراع شود.' }"),

 ("{ t: 'p', x: 'Between them, eighteen hundred kilometres apart, lies everything: mountain, desert, orchard, and city.' }",
  "{ t: 'p', x: 'Between them, eighteen hundred kilometres apart, lies everything: mountain, desert, orchard, and city.', fa: 'میان این دو، هزار و هشتصد کیلومتر فاصله، همه‌چیز جا گرفته است: کوه، کویر، باغ و شهر.' }"),

 ("{ t: 'p', x: 'People who have never been picture Iran as desert. It is one of the great misreadings of any country on earth. Iran holds rainforest and salt flat, alpine snowfield and mangrove swamp, and you can pass between them in a single day of driving.' }",
  "{ t: 'p', x: 'People who have never been picture Iran as desert. It is one of the great misreadings of any country on earth. Iran holds rainforest and salt flat, alpine snowfield and mangrove swamp, and you can pass between them in a single day of driving.', fa: 'کسی که نیامده، ایران را کویر تصور می‌کند. کمتر کشوری روی زمین این‌قدر بد فهمیده شده است. ایران هم جنگل بارانی دارد و هم پهنهٔ نمک، هم برف کوهستان و هم مرداب حرا، و می‌شود در یک روز رانندگی از یکی به دیگری رسید.' }"),

 ("cap: 'The Alborz, walling off the Caspian from the plateau.'",
  "cap: 'The Alborz, walling off the Caspian from the plateau.', capFa: 'البرز، دیواری میان خزر و فلات.'"),

 ("{ t: 'h', x: 'The green north' }",
  "{ t: 'h', x: 'The green north', fa: 'شمالِ سبز' }"),

 ("{ t: 'p', x: 'Between the Alborz and the Caspian lies a strip of forest so old it survived the last ice age intact. It rains here. Rice grows, tea grows, and the hills are the deep green of somewhere far further north. Villages sit in mist. It looks nothing like the Iran of the imagination.' }",
  "{ t: 'p', x: 'Between the Alborz and the Caspian lies a strip of forest so old it survived the last ice age intact. It rains here. Rice grows, tea grows, and the hills are the deep green of somewhere far further north. Villages sit in mist. It looks nothing like the Iran of the imagination.', fa: 'میان البرز و خزر نواری از جنگل کشیده شده که آن‌قدر کهن است که آخرین عصر یخبندان را دست‌نخورده از سر گذرانده. اینجا باران می‌بارد. برنج می‌روید، چای می‌روید، و تپه‌ها سبزِ تیره‌اند، سبزِ جایی بسیار شمالی‌تر. روستاها در مه نشسته‌اند. هیچ شباهتی به ایرانِ تصورها ندارد.' }"),

 ("cap: 'The Caspian forest, among the oldest living woodland on earth.'",
  "cap: 'The Caspian forest, among the oldest living woodland on earth.', capFa: 'جنگل‌های خزری، از کهن‌ترین جنگل‌های زندهٔ جهان.'"),

 ("{ t: 'h', x: 'The empty centre' }",
  "{ t: 'h', x: 'The empty centre', fa: 'مرکزِ خالی' }"),

 ("{ t: 'p', x: 'Inside the ring of mountains lie the two great deserts. The Dasht e Kavir is a crust of salt so hostile that little lives on it. The Dasht e Lut is worse, and better. It holds the hottest land surface temperature ever recorded anywhere on the planet, and its wind carved ridges run for hundreds of kilometres like a sea frozen mid wave.' }",
  "{ t: 'p', x: 'Inside the ring of mountains lie the two great deserts. The Dasht e Kavir is a crust of salt so hostile that little lives on it. The Dasht e Lut is worse, and better. It holds the hottest land surface temperature ever recorded anywhere on the planet, and its wind carved ridges run for hundreds of kilometres like a sea frozen mid wave.', fa: 'درون حلقهٔ کوه‌ها دو کویر بزرگ خوابیده‌اند. دشت کویر پوسته‌ای از نمک است، چنان نامهربان که چیزی رویش دوام نمی‌آورد. دشت لوت هم بدتر است و هم بهتر: داغ‌ترین دمای سطح زمین که تا امروز در هیچ کجای کرهٔ خاکی ثبت شده، اینجا اندازه گرفته شده، و کلوت‌هایی که باد تراشیده صدها کیلومتر ادامه دارند، مثل دریایی که وسط موج یخ زده باشد.' }"),

 ("cap: 'The Lut, where the ground has been measured hotter than anywhere else on earth.'",
  "cap: 'The Lut, where the ground has been measured hotter than anywhere else on earth.', capFa: 'لوت، جایی که زمینش داغ‌تر از هر نقطهٔ دیگر جهان اندازه گرفته شده.'"),

 ("{ t: 'mark', x: 'The hottest place ever measured on earth is a day drive from a rainforest.' }",
  "{ t: 'mark', x: 'The hottest place ever measured on earth is a day drive from a rainforest.', fa: 'داغ‌ترین نقطهٔ ثبت‌شدهٔ زمین، یک روز راه با یک جنگل بارانی فاصله دارد.' }"),

 ("{ t: 'h', x: 'The mountains' }",
  "{ t: 'h', x: 'The mountains', fa: 'کوه‌ها' }"),

 ("{ t: 'p', x: 'The Zagros run for fifteen hundred kilometres down the western flank, folded like cloth, holding oak forest and the migration routes the Bakhtiari still walk twice a year. And above everything stands Damavand, a dormant volcano and the highest peak in the Middle East, visible from Tehran on a clear day, the mountain where the Shahnameh chains the tyrant Zahhak for eternity.' }",
  "{ t: 'p', x: 'The Zagros run for fifteen hundred kilometres down the western flank, folded like cloth, holding oak forest and the migration routes the Bakhtiari still walk twice a year. And above everything stands Damavand, a dormant volcano and the highest peak in the Middle East, visible from Tehran on a clear day, the mountain where the Shahnameh chains the tyrant Zahhak for eternity.', fa: 'زاگرس هزار و پانصد کیلومتر در کنارهٔ غربی کشیده شده، تاخورده مثل پارچه، با جنگل بلوط و راه‌های کوچی که بختیاری‌ها هنوز سالی دو بار می‌پیمایند. و بالای همه‌چیز دماوند ایستاده است، آتشفشانی خاموش و بلندترین قلهٔ خاورمیانه، که روز صاف از تهران پیداست؛ همان کوهی که شاهنامه ضحاک را تا ابد در آن به بند کشیده.' }"),

 ("cap: 'Damavand, 5,610 metres, the roof of the Middle East and a mountain of myth.'",
  "cap: 'Damavand, 5,610 metres, the roof of the Middle East and a mountain of myth.', capFa: 'دماوند، ۵۶۱۰ متر، بام خاورمیانه و کوهی در دل اسطوره.'"),

 ("{ t: 'h', x: 'The two coasts' }",
  "{ t: 'h', x: 'The two coasts', fa: 'دو ساحل' }"),

 ("{ t: 'p', x: 'North is the Caspian, cool and fresh at its edges. South is the Gulf, warm and salt, with mangroves along its shallows and islands whose hills are striped red and gold with mineral. One country, two seas, and eighteen hundred kilometres between them.' }",
  "{ t: 'p', x: 'North is the Caspian, cool and fresh at its edges. South is the Gulf, warm and salt, with mangroves along its shallows and islands whose hills are striped red and gold with mineral. One country, two seas, and eighteen hundred kilometres between them.', fa: 'شمال خزر است، خنک و در کناره‌ها شیرین. جنوب خلیج فارس است، گرم و شور، با جنگل‌های حرا در کم‌عمق‌هایش و جزیره‌هایی که تپه‌هایشان از کانی سرخ و طلایی راه‌راه شده. یک کشور، دو دریا، و هزار و هشتصد کیلومتر میانشان.' }"),

 ("cap: 'The Gulf coast, and the painted hills of Hormuz.'",
  "cap: 'The Gulf coast, and the painted hills of Hormuz.', capFa: 'ساحل خلیج فارس و تپه‌های رنگی هرمز.'"),
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
print("chapter three translated:", len(PAIRS), "blocks")
