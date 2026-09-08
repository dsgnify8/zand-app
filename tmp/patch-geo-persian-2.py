# Geography, second pass.
#
# Items 15 to 58 in Nojan's numbering. Applied by matching the English,
# which is stable; the Persian is what changes.
#
# Item 40 arrived carrying item 38's Persian — the Zagros and Damavand
# text under "The two coasts". Left alone here rather than written by me,
# since guessing at content in a language I cannot check is how wrong
# things end up shipping.

import os
import re

PAIRS = [
 ("The position was a fortune. Every empire that ruled here grew rich on the trade that had nowhere else to go. Silk, spice, and gold crossed Iranian soil, and Iranian hands took their share.",
  "این موقعیت جغرافیایی خودش یک ثروت بود. هر امپراتوری‌ای که بر این سرزمین حکومت کرد، از تجارتی که راه دیگری جز عبور از اینجا نداشت، ثروتمند شد. ابریشم، ادویه و طلا از خاک ایران می‌گذشتند و ایرانیان هم سهم خود را از این تجارت می‌گرفتند."),

 ("And where water was scarce, Iranians invented their way around it. The qanat, an underground channel tapping mountain groundwater and carrying it for miles beneath the desert, is a Persian invention thousands of years old, and it made cities possible where there was no river at all.",
  "و هر جا آب کمیاب بود، ایرانیان راهی برای کنار آمدن با آن پیدا می‌کردند. قنات، همان کانال زیرزمینی‌ای که آب‌های زیرزمینیِ دامنه‌های کوهستان را جمع می‌کند و کیلومترها آن را از زیر بیابان به جریان می‌اندازد، اختراعی ایرانی است که قدمتی چند هزار ساله دارد. قنات باعث شد حتی در جاهایی که هیچ رودی وجود نداشت، امکان شکل‌گیری شهرها فراهم شود."),

 ("They could not move the desert, so they ran rivers underneath it.",
  "نمی‌توانستند کویر را جابه‌جا کنند؛ پس رودخانه‌ها را از زیر آن عبور دادند."),

 ("What the land cost",
  "بهایی که سرزمین پرداخت"),

 ("The open east was a wound that never closed. Across the steppe came the Turks, the Mongols, and Timur, and each time the flat northeast offered no wall to stop them. The Mongol invasion, arriving through that open door, was among the greatest catastrophes Iran ever suffered.",
  "شرقِ باز، زخمی بود که هیچ‌وقت التیام پیدا نکرد. از آن سوی دشت‌ها ترک‌ها آمدند، مغول‌ها آمدند و تیمور آمد؛ و هر بار، پهنهٔ هموار شمال‌شرق هیچ دیواری نداشت که جلویشان را بگیرد. هجوم مغولان که از همین درِ باز وارد شد، یکی از بزرگ‌ترین فاجعه‌هایی بود که ایران در تاریخ خود متحمل شد."),

 ("And in the modern age the same centrality drew a different kind of pressure. Russia to the north and Britain to the south did not want Iran for its soil but for its position, and later for what lay beneath it. A country at the centre of the world is never left alone by the powers of the world.",
  "در دوران مدرن هم همین موقعیت مرکزی، فشار دیگری را به همراه آورد. روسیه در شمال و بریتانیا در جنوب، ایران را نه به خاطر خاکش، بلکه به خاطر موقعیتش می‌خواستند؛ و بعدها، به خاطر آنچه در زیر خاکش نهفته بود. کشوری که در مرکز جهان قرار دارد، هیچ‌وقت از دخالت و فشار قدرت‌های جهان در امان نمی‌ماند."),

 ("The oil found in Khuzestan in the early twentieth century made that truth heavier still. Geography had given Iran the crossroads, and then it gave it the prize.",
  "کشف نفت در خوزستان در اوایل قرن بیستم، این واقعیت را سنگین‌تر کرد. جغرافیا ابتدا چهارراه را به ایران داده بود؛ و بعد، جایزه را هم در اختیارش گذاشت."),

 ("The Neighbours",
  "همسایه‌ها"),

 ("Few countries touch as many others. Iran shares a land border with seven nations and a sea border with several more, and each frontier is a different world.",
  "کمتر کشوری در جهان این‌همه همسایه دارد. ایران با هفت کشور مرز زمینی دارد و با چند کشور دیگر از راه دریا هم مرز است؛ و پشت هر مرز، دنیایی متفاوت آغاز می‌شود."),

 ("The gate of the world",
  "دروازهٔ جهان"),

 ("At the southern tip, the Strait of Hormuz narrows to a channel a few dozen kilometres wide. Through it passes roughly a fifth of the oil consumed on earth. There is no substitute passage. It is, in the most literal sense, one of the most important stretches of water in the world, and Iran holds its northern shore.",
  "در جنوبی‌ترین نقطه، تنگهٔ هرمز به گذرگاهی تنها چند ده کیلومتری تبدیل می‌شود. نزدیک به یک‌پنجم نفت مصرفی جهان از همین مسیر عبور می‌کند و مسیر جایگزین دیگری هم وجود ندارد. به معنای واقعی کلمه، اینجا یکی از مهم‌ترین آبراه‌های دنیاست؛ و ساحل شمالی آن در اختیار ایران است."),

 ("A fifth of the world energy passes a coastline you could see across.",
  "یک‌پنجم انرژی جهان از کنار ساحلی می‌گذرد که آن‌سویش پیداست."),

 ("Two seas",
  "دو دریا"),

 ("Iran is one of the few countries to touch two entirely separate seas of different character. The Caspian in the north is the largest inland body of water on earth, fresh enough at its edges to grow rice and tea on its shore. The Gulf in the south is warm, salt, and shallow, a trading sea since before writing.",
  "ایران یکی از معدود کشورهایی است که به دو دریای کاملاً متفاوت دسترسی دارد؛ دو دریا با طبیعتی متفاوت. در شمال، دریای خزر قرار دارد؛ بزرگ‌ترین پهنهٔ آبیِ محصور در خشکی در جهان، که در کناره‌هایش آن‌قدر آب شیرین و هوای مناسب هست که برنج و چای در ساحلش می‌روید. در جنوب، خلیج فارس است؛ گرم، شور و کم‌عمق، دریایی که از هزاران سال پیش و حتی پیش از پیدایش خط، مسیر تجارت بوده است."),

 ("Between them, eighteen hundred kilometres apart, lies everything: mountain, desert, orchard, and city.",
  "میان این دو، با فاصله‌ای حدود هزار و هشتصد کیلومتر، همه‌چیز جای گرفته است: کوه، کویر، باغ و شهر."),

 ("The Landscapes",
  "چشم‌اندازها"),

 ("People who have never been picture Iran as desert. It is one of the great misreadings of any country on earth. Iran holds rainforest and salt flat, alpine snowfield and mangrove swamp, and you can pass between them in a single day of driving.",
  "کسی که هرگز به ایران سفر نکرده، معمولاً این کشور را سرزمین کویر تصور می‌کند. اما این یکی از بزرگ‌ترین برداشت‌های اشتباه دربارهٔ ایران است. ایران هم جنگل بارانی دارد، هم دشت‌های نمکی؛ هم قله‌های پوشیده از برف، هم مرداب‌های حرا. و می‌توان تنها با یک روز رانندگی از یکی به دیگری رسید."),

 ("The green north",
  "شمالِ سبز"),

 ("The empty centre",
  "مرکزِ خالی"),

 ("Inside the ring of mountains lie the two great deserts. The Dasht e Kavir is a crust of salt so hostile that little lives on it. The Dasht e Lut is worse, and better. It holds the hottest land surface temperature ever recorded anywhere on the planet, and its wind carved ridges run for hundreds of kilometres like a sea frozen mid wave.",
  "درون حلقهٔ کوهستان‌ها، دو کویر بزرگ قرار گرفته‌اند. دشت کویر پوسته‌ای عظیم از نمک است؛ آن‌قدر خشن و نامهربان که تقریباً هیچ چیز در آن دوام نمی‌آورد. دشت لوت از این هم افراطی‌تر است، اما از جهتی شگفت‌انگیزتر. بالاترین دمای سطح زمین که تاکنون در جایی از کرهٔ زمین ثبت شده، در این منطقه اندازه‌گیری شده است. کلوت‌هایی که باد در دل آن تراشیده، صدها کیلومتر امتداد دارند؛ انگار دریایی بوده که درست در میانهٔ یک موج یخ زده است."),

 ("The hottest place ever measured on earth is a day drive from a rainforest.",
  "داغ‌ترین نقطه‌ای که تاکنون روی زمین اندازه‌گیری شده، تنها یک روز رانندگی با یک جنگل بارانی فاصله دارد."),

 ("The mountains",
  "کوه‌ها"),

 ("The Zagros run for fifteen hundred kilometres down the western flank, folded like cloth, holding oak forest and the migration routes the Bakhtiari still walk twice a year. And above everything stands Damavand, a dormant volcano and the highest peak in the Middle East, visible from Tehran on a clear day, the mountain where the Shahnameh chains the tyrant Zahhak for eternity.",
  "رشته‌کوه زاگرس در امتداد غرب ایران، حدود هزار و پانصد کیلومتر کشیده شده؛ چین‌خورده و پیچ‌وتاب‌خورده، مثل پارچه‌ای عظیم، با جنگل‌های بلوط و مسیرهای کوچ که بختیاری‌ها هنوز سالی دو بار در آن‌ها رفت‌وآمد می‌کنند. و بالاتر از همه، دماوند ایستاده است؛ آتشفشانی خاموش و بلندترین قلهٔ خاورمیانه که در روزهای صاف از تهران دیده می‌شود. همان کوهی که در شاهنامه، ضحاک را برای همیشه در آن به بند می‌کشند."),

 ("The two coasts",
  "دو ساحل"),

 ("The Thirty One",
  "سی و یک استان"),

 ("Iran is made of thirty one provinces, and no two are alike. Touch any one to learn what makes it itself.",
  "ایران از سی‌ویک استان تشکیل شده و هیچ دو استانی شبیه هم نیستند. هر کدام را که انتخاب کنی، چیزی را می‌بینی که آن را منحصربه‌فرد کرده است."),

 ("The Great Cities",
  "شهرهای بزرگ"),

 ("A country is its cities, and Iran cities were placed by water and by road. Where a mountain stream could be tapped, or a trade route had to pass, a city grew. Some have stood so long that their founding is myth rather than record.",
  "هر کشور را می‌توان از روی شهرهایش شناخت؛ و شهرهای ایران را آب و راه به وجود آوردند. هر جا می‌شد آب یک رود یا جویبار کوهستانی را مهار کرد، یا جایی که یک مسیر تجاری ناگزیر از آن عبور می‌کرد، شهری شکل گرفت. بعضی از این شهرها آن‌قدر قدمت دارند که بنیان‌گذاری‌شان بیشتر به افسانه شبیه است تا یک واقعهٔ ثبت‌شده در تاریخ."),

 ("Why they stand where they stand",
  "چرا درست همان‌جا قرار گرفته‌اند؟"),

 ("Look closely and a pattern appears. Almost every great Iranian city sits at the foot of a mountain, not on a river. Tehran against the Alborz, Shiraz and Isfahan in the folds of the Zagros, Mashhad below the hills of Khorasan. The mountains held the snow, the snow fed the springs, and the qanats carried that water out to the plain.",
  "اگر دقیق‌تر نگاه کنیم، الگویی آشکار می‌شود. تقریباً هر شهر بزرگ ایران در دامنهٔ یک کوه قرار دارد، نه کنار یک رودخانه. تهران در پای البرز، شیراز و اصفهان در میان چین‌و‌شکن‌های زاگرس، و مشهد در دامنهٔ ارتفاعات خراسان. کوه‌ها برف را در خود نگه می‌داشتند، برف چشمه‌ها را تغذیه می‌کرد و قنات‌ها این آب را به دشت می‌رساندند."),

 ("Iranian cities were not built on rivers. They were built on the memory of snow.",
  "شهرهای ایران را کنار رودخانه‌ها نساختند؛ آن‌ها را بر پایهٔ خاطرهٔ برف ساختند."),

 ("This is why the map of Iran cities is really a map of its mountains. Where the ranges run, the cities follow, strung along the inner edge of the highlands like beads on a thread, with the empty deserts held at the centre.",
  "برای همین است که نقشهٔ شهرهای ایران، در واقع نقشهٔ کوهستان‌های آن است. هر جا رشته‌کوه‌ها امتداد پیدا می‌کنند، شهرها هم به دنبالشان می‌آیند؛ مثل مهره‌هایی که بر نخ کشیده شده باشند، در امتداد لبهٔ درونی ارتفاعات. و در مرکز، کویرهای خالی گسترده‌اند."),

 ("Small Places, Long Shadows",
  "جاهای کوچک، سایه‌های بلند"),

 ("Beyond the great cities are smaller places whose names carry further than their size would suggest. Some gave the world a fruit, some a building, some a person whose words outlived every empire of their age.",
  "فراتر از شهرهای بزرگ، جاهای کوچک‌تری قرار دارند که نامشان بسیار فراتر از اندازه‌شان رفته است. بعضی از آن‌ها میوه‌ای به جهان داده‌اند، بعضی بنایی، و بعضی انسانی که سخنانش از عمر تمام امپراتوری‌های زمانه‌اش بیشتر دوام آورده است."),

 ("This is the pattern of the land. A country of extremes, held between mountain and desert, placed at the centre of everything, whose people learned to draw water from under the sand and beauty from the driest places. The geography made the history, and the history made the nation.",
  "این الگوی این سرزمین است: کشوری سرشار از تضاد، گرفتار میان کوه و کویر، قرارگرفته در مرکز همه‌چیز؛ سرزمینی که مردمش یاد گرفتند آب را از زیر شن بیرون بکشند و از خشک‌ترین جاها، زیبایی بیافرینند. جغرافیا تاریخ را ساخت و تاریخ، ملت را."),

 ("A land that has held everything the world came looking for, and been asked for little else. Empires crossed it, took what they wanted, and left their dust in its soil. It gave water where there was none, poetry where there was silence, and beauty out of the driest ground on earth. It has been wanted often and understood rarely. Still it stands, between two seas, holding its own name.",
  "سرزمینی که هرچه جهان برای یافتنش به اینجا آمد، در خود داشت، اما کمتر چیز دیگری از آن خواستند. امپراتوری‌ها از این سرزمین گذشتند، هرچه می‌خواستند با خود بردند و غبارشان را در خاک آن به جا گذاشتند. ایران آنجا که آبی نبود، آب فراهم کرد؛ آنجا که سکوت بود، شعر آفرید؛ و از خشک‌ترین خاک روی زمین، زیبایی بیرون کشید. بارها خواسته شد، اما به‌ندرت فهمیده شد. با این همه، هنوز ایستاده است؛ میان دو دریا، با نام خودش."),

 ("Capital, and one of the largest cities in western Asia. A modest town the Qajars chose, now millions strong against the snow line of the Alborz.",
  "پایتخت و یکی از بزرگ‌ترین شهرهای غرب آسیا. شهرکی کوچک که قاجارها آن را برگزیدند و امروز میلیون‌ها نفر در دامنهٔ برف‌گیر البرز در آن زندگی می‌کنند."),

 ("The great pilgrimage city of the east, drawing millions each year, and the largest city of Khorasan.",
  "بزرگ‌ترین شهر زیارتی شرق ایران؛ شهری که هر سال میلیون‌ها زائر را به سوی خود می‌کشاند و بزرگ‌ترین شهر خراسان است."),

 ("Once called half the world. Shah Abbas laid out a square here that remains among the most beautiful ever built.",
  "روزی آن را «نصف جهان» می‌نامیدند. شاه عباس در اینجا میدانی بنا کرد که هنوز هم یکی از زیباترین میدان‌های ساخته‌شده در جهان به شمار می‌رود."),

 ("City of poets, roses, and gardens. Hafez and Saadi are buried here, and Karim Khan made it his capital.",
  "شهر شاعران، گل‌ها و باغ‌ها. حافظ و سعدی در اینجا آرمیده‌اند و کریم‌خان آن را پایتخت خود کرد."),

 ("The north western gate, holding one of the oldest and largest covered bazaars on earth.",
  "دروازهٔ شمال‌غرب ایران؛ شهری که یکی از کهن‌ترین و بزرگ‌ترین بازارهای سرپوشیدهٔ جهان را در خود جای داده است."),

 ("A desert city of mud brick and wind towers, and a living centre of Zoroastrian faith.",
  "شهری کویری از خشت و بادگیر؛ و یکی از مراکز زنده و مهم آیین زرتشتی."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


roots = ["constants", "components", "app"]
touched = set()

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
                needle = esc(en)
                at = s.find(needle)
                if at < 0:
                    continue
                tail = s[at + len(needle): at + len(needle) + 1400]
                fm = re.search(r"[Ff]a: '([^']*)'", tail)
                if not fm:
                    continue
                start = at + len(needle) + fm.start(1)
                end = at + len(needle) + fm.end(1)
                s = s[:start] + esc(fa) + s[end:]

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

hit, miss = 0, []
for en, fa in PAIRS:
    if esc(fa) in blob:
        hit += 1
    else:
        miss.append(en[:58])

print("\napplied:", hit, "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
