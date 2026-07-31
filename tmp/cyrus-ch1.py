# -*- coding: utf-8 -*-
# Cyrus, chapter one. Refuses to write unless every anchor is found.

p = "constants/education.ts"
s = open(p).read()

if "کودکی به دنیا آمد" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'More than two and a half thousand years ago, in the highlands of what is now southern Iran, a child was born who would change the shape of the ancient world. His name was Kurush, whom history remembers as Cyrus, and the empire he built would be the largest the world had yet seen.' }",
  "{ t: 'p', x: 'More than two and a half thousand years ago, in the highlands of what is now southern Iran, a child was born who would change the shape of the ancient world. His name was Kurush, whom history remembers as Cyrus, and the empire he built would be the largest the world had yet seen.', fa: 'بیش از دو هزار و پانصد سال پیش، در بلندی‌های جنوب ایرانِ امروز، کودکی به دنیا آمد که قرار بود شکل جهان باستان را دگرگون کند. نامش کوروش بود، و امپراتوری‌ای که برپا کرد بزرگ‌ترین چیزی شد که جهان تا آن روز به خود دیده بود.' }"),

 ("{ t: 'p', x: 'The land of his birth, Persia, was then a small kingdom of herders and farmers, a subject people living in the shadow of the mighty Median Empire to their north. Few could have imagined that from this modest place would rise a ruler whose name would still be spoken with reverence across the world, so many centuries later.' }",
  "{ t: 'p', x: 'The land of his birth, Persia, was then a small kingdom of herders and farmers, a subject people living in the shadow of the mighty Median Empire to their north. Few could have imagined that from this modest place would rise a ruler whose name would still be spoken with reverence across the world, so many centuries later.', fa: 'زادگاهش، پارس، آن روزها پادشاهی کوچکی بود از چوپانان و کشاورزان؛ مردمی زیردست که در سایهٔ امپراتوری نیرومند ماد در شمالشان زندگی می‌کردند. کمتر کسی می‌توانست تصور کند که از چنین جای فروتنی فرمانروایی برخیزد که قرن‌ها بعد هنوز نامش را در سراسر جهان با احترام بر زبان بیاورند.' }"),

 ("{ t: 'h', x: 'The legend of the infant king' }",
  "{ t: 'h', x: 'The legend of the infant king', fa: 'افسانهٔ شاهِ نوزاد' }"),

 ("""{ t: 'p', x: 'The Greek historian Herodotus, writing a century after Cyrus, preserved a story that reads like myth. Astyages, king of the Medes and Cyrus\\'s own grandfather, dreamed that his daughter\\'s child would one day overthrow him. Fearing the omen, he ordered the newborn boy to be killed.' }""",
  """{ t: 'p', x: 'The Greek historian Herodotus, writing a century after Cyrus, preserved a story that reads like myth. Astyages, king of the Medes and Cyrus\\'s own grandfather, dreamed that his daughter\\'s child would one day overthrow him. Fearing the omen, he ordered the newborn boy to be killed.', fa: 'هرودوت، تاریخ‌نگار یونانی، یک قرن پس از کوروش داستانی را نگه داشت که بیشتر به اسطوره می‌ماند. آستیاگ، شاه ماد و پدربزرگ خودِ کوروش، خواب دید که فرزند دخترش روزی او را از تخت به زیر خواهد کشید. از این نشانه ترسید و فرمان داد نوزاد را بکشند.' }"""),

 ("{ t: 'p', x: 'But the servant charged with the deed could not do it. The infant was given instead to a herdsman in the mountains, who raised him as his own. The child grew strong and commanding, and even at play the other children chose him as their king, so plainly did he seem born to rule.' }",
  "{ t: 'p', x: 'But the servant charged with the deed could not do it. The infant was given instead to a herdsman in the mountains, who raised him as his own. The child grew strong and commanding, and even at play the other children chose him as their king, so plainly did he seem born to rule.', fa: 'اما خدمتکاری که مأمور این کار شد، نتوانست انجامش دهد. نوزاد را به چوپانی در کوهستان سپردند و او کودک را چون فرزند خود بزرگ کرد. پسر نیرومند و فرمانده بار آمد، و حتی در بازی هم بچه‌های دیگر او را شاه خود می‌کردند، چنان آشکار بود که برای فرمانروایی زاده شده است.' }"),

 ("{ t: 'q', x: 'This boy, the son of a herdsman as we supposed, is in truth the grandson of the king.' }",
  "{ t: 'q', x: 'This boy, the son of a herdsman as we supposed, is in truth the grandson of the king.', fa: 'این پسر که او را پسر چوپان می‌پنداشتیم، در حقیقت نوهٔ شاه است.' }"),

 ("{ t: 'p', x: 'In time the truth was discovered, and the boy was restored to his royal family. Whether the tale is history or legend, it carried a deeper meaning for those who told it. Greatness, they believed, could not be hidden or destroyed. It would find its way into the world no matter what stood against it.' }",
  "{ t: 'p', x: 'In time the truth was discovered, and the boy was restored to his royal family. Whether the tale is history or legend, it carried a deeper meaning for those who told it. Greatness, they believed, could not be hidden or destroyed. It would find its way into the world no matter what stood against it.', fa: 'سرانجام حقیقت آشکار شد و پسر را به خاندان شاهی‌اش بازگرداندند. این روایت تاریخ باشد یا افسانه، برای آنان که بازگویش می‌کردند معنایی ژرف‌تر داشت: بزرگی را نمی‌توان پنهان کرد و نمی‌توان از میان برد. راه خود را به جهان باز می‌کند، هر چه هم در برابرش بایستد.' }"),

 ("{ t: 'p', x: 'Behind the legend lies the record. Cyrus was born of the royal house of Persia, the Achaemenid line, son of Cambyses, king of Anshan, and, by his mother Mandane, grandson of the Median king himself. He was heir to a small throne, but through his veins ran the blood of kings.' }",
  "{ t: 'p', x: 'Behind the legend lies the record. Cyrus was born of the royal house of Persia, the Achaemenid line, son of Cambyses, king of Anshan, and, by his mother Mandane, grandson of the Median king himself. He was heir to a small throne, but through his veins ran the blood of kings.', fa: 'پشت افسانه، سند ایستاده است. کوروش از خاندان شاهی پارس بود، از تبار هخامنشی؛ پسر کمبوجیه، شاه انشان، و از سوی مادرش ماندانا، نوهٔ خودِ شاه ماد. وارث تختی کوچک بود، اما در رگ‌هایش خون شاهان می‌دوید.' }"),

 ("{ t: 'h', x: 'A world waiting to be remade' }",
  "{ t: 'h', x: 'A world waiting to be remade', fa: 'جهانی در انتظار دگرگونی' }"),

 ("{ t: 'p', x: 'The world into which Cyrus came was divided among four great powers. The Medes ruled the Iranian plateau, Babylon held the fertile heart of Mesopotamia, Lydia commanded the wealth of Asia Minor, and Egypt guarded the ancient valley of the Nile. Persia was a minor kingdom among giants.' }",
  "{ t: 'p', x: 'The world into which Cyrus came was divided among four great powers. The Medes ruled the Iranian plateau, Babylon held the fertile heart of Mesopotamia, Lydia commanded the wealth of Asia Minor, and Egypt guarded the ancient valley of the Nile. Persia was a minor kingdom among giants.', fa: 'جهانی که کوروش در آن پا گذاشت میان چهار قدرت بزرگ بخش شده بود. مادها بر فلات ایران فرمان می‌راندند، بابل قلب حاصلخیز میان‌رودان را در دست داشت، لیدیه بر ثروت آسیای صغیر مسلط بود، و مصر درّهٔ کهن نیل را پاس می‌داشت. پارس پادشاهی کوچکی بود در میان غول‌ها.' }"),

 ("{ t: 'p', x: 'Within a single generation, Cyrus would bring all but one of these under his rule, and bind them into a single empire stretching from the Aegean Sea to the edge of India. It would be the first empire in history to unite so many peoples, and the first to attempt to rule them with tolerance rather than terror.' }",
  "{ t: 'p', x: 'Within a single generation, Cyrus would bring all but one of these under his rule, and bind them into a single empire stretching from the Aegean Sea to the edge of India. It would be the first empire in history to unite so many peoples, and the first to attempt to rule them with tolerance rather than terror.', fa: 'در فاصلهٔ یک نسل، کوروش همهٔ اینها جز یکی را زیر فرمان خود آورد و در امپراتوری واحدی به هم بست که از دریای اژه تا کرانهٔ هند کشیده می‌شد. نخستین امپراتوری تاریخ بود که این‌همه مردم را یکجا گرد آورد، و نخستینی که کوشید آنان را با بردباری اداره کند نه با وحشت.' }"),

 ("{ t: 'pull', x: 'From a small kingdom of herders, he would build the greatest empire the world had known.' }",
  "{ t: 'pull', x: 'From a small kingdom of herders, he would build the greatest empire the world had known.', fa: 'از پادشاهی کوچکی از چوپانان، بزرگ‌ترین امپراتوری‌ای را ساخت که جهان می‌شناخت.' }"),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "block(s):")
    for m in missing:
        print("   -", m[:80])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b, 1)

open(p, "w").write(s)
print("chapter one translated:", len(PAIRS), "blocks")
