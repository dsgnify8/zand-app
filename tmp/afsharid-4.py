# -*- coding: utf-8 -*-
# The Afsharid dynasty, final batch: the assassination and the collapse.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'In the end, the fear he inspired was his undoing. By 1747, his cruelty had made him enemies even among his own most trusted officers, who came to believe that none of them was safe from his suspicion. Rather than wait to be struck down, they resolved to strike first.' }",
  "{ t: 'p', x: 'In the end, the fear he inspired was his undoing. By 1747, his cruelty had made him enemies even among his own most trusted officers, who came to believe that none of them was safe from his suspicion. Rather than wait to be struck down, they resolved to strike first.', fa: 'سرانجام همان هراسی که برمی‌انگیخت، کار خودش را ساخت. تا سال ۱۷۴۷، بی‌رحمی‌اش حتی در میان مورد اعتمادترین افسرانش دشمن تراشیده بود؛ کسانی که به این باور رسیده بودند هیچ‌کدامشان از بدگمانی او در امان نیست. به جای آنکه منتظر ضربه بمانند، بر آن شدند خود پیش‌دستی کنند.' }"),

 ("{ t: 'p', x: 'In the night, a band of his own commanders crept into his tent and killed him as he slept. The greatest warrior of the age, who had conquered from the Caucasus to Delhi and whom no enemy could defeat in the field, fell at last to the daggers of his own men.' }",
  "{ t: 'p', x: 'In the night, a band of his own commanders crept into his tent and killed him as he slept. The greatest warrior of the age, who had conquered from the Caucasus to Delhi and whom no enemy could defeat in the field, fell at last to the daggers of his own men.', fa: 'شبانه، گروهی از فرماندهان خودش به خیمه‌اش خزیدند و او را در خواب کشتند. بزرگ‌ترین جنگاور آن روزگار، که از قفقاز تا دهلی را گشوده بود و هیچ دشمنی در میدان از پسش برنیامده بود، سرانجام به خنجر مردان خودش از پا درآمد.' }"),

 ("{ t: 'markline', x: 'No enemy could defeat him. Only his own could bring him down.' }",
  "{ t: 'markline', x: 'No enemy could defeat him. Only his own could bring him down.', fa: 'هیچ دشمنی نتوانست شکستش دهد. تنها خودی‌ها توانستند از پا درش آورند.' }"),

 ("""{ t: 'p', x: 'With Nader\\'s death, the empire he had built by the sheer force of his will fell apart almost at once. He had conquered vast lands, but he had not built the institutions to hold them, and without him at their head, they scattered. His dynasty clung to a fragment of power in Khorasan for a few decades more, but its glory had died with its founder.' }""",
  """{ t: 'p', x: 'With Nader\\'s death, the empire he had built by the sheer force of his will fell apart almost at once. He had conquered vast lands, but he had not built the institutions to hold them, and without him at their head, they scattered. His dynasty clung to a fragment of power in Khorasan for a few decades more, but its glory had died with its founder.', fa: 'با مرگ نادر، امپراتوری‌ای که تنها با نیروی ارادهٔ او برپا شده بود، تقریباً بی‌درنگ از هم پاشید. سرزمین‌های پهناوری گشوده بود، اما نهادهایی نساخته بود که آنها را نگاه دارد، و بی‌او در رأس، پراکنده شدند. سلسله‌اش چند دههٔ دیگر به تکه‌ای از قدرت در خراسان چنگ زد، اما شکوهش با بنیان‌گذارش مرده بود.' }"""),

 ("{ t: 'p', x: 'From the chaos that followed his death, in time, would rise the gentle Karim Khan of the Zand, who gave Iran the peace that Nader, for all his conquests, never could.' }",
  "{ t: 'p', x: 'From the chaos that followed his death, in time, would rise the gentle Karim Khan of the Zand, who gave Iran the peace that Nader, for all his conquests, never could.', fa: 'از آشوبی که پس از مرگش برخاست، به وقت خود کریم‌خان زندِ مهربان سر برآورد؛ کسی که آرامشی به ایران داد که نادر، با همهٔ فتوحاتش، هرگز نتوانست بدهد.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of Nader Shah and the Afsharids, one of the most extraordinary and complex stories in all of Iranian history. Nader was a shepherd boy who became a conqueror to rival the greatest of the ancient world, a military genius who saved his nation from ruin and carried its banners to the gates of the East.' }",
  "{ t: 'p', x: 'This has been a glimpse of Nader Shah and the Afsharids, one of the most extraordinary and complex stories in all of Iranian history. Nader was a shepherd boy who became a conqueror to rival the greatest of the ancient world, a military genius who saved his nation from ruin and carried its banners to the gates of the East.', fa: 'این نگاهی بود کوتاه به نادرشاه و افشاریان؛ یکی از شگفت‌ترین و پیچیده‌ترین روایت‌های تمام تاریخ ایران. نادر پسرکِ چوپانی بود که فاتحی شد هم‌سنگ بزرگ‌ترین فاتحان جهان باستان؛ نابغه‌ای نظامی که ملتش را از ویرانی نجات داد و درفشش را تا دروازه‌های شرق برد.' }"),

 ("""{ t: 'p', x: 'He was also a warning, of how the very brilliance and will that can save a nation can, unchecked, turn to darkness. He remains one of history\\'s most dazzling and troubling figures, a comet that blazed across the sky of Iran, brilliant and terrible, and was gone almost as swiftly as it had come.' }""",
  """{ t: 'p', x: 'He was also a warning, of how the very brilliance and will that can save a nation can, unchecked, turn to darkness. He remains one of history\\'s most dazzling and troubling figures, a comet that blazed across the sky of Iran, brilliant and terrible, and was gone almost as swiftly as it had come.', fa: 'و در عین حال هشداری بود: که همان درخشش و ارادهٔ نجات‌بخش، اگر مهار نشود، می‌تواند به تاریکی بگراید. او یکی از خیره‌کننده‌ترین و آزاردهنده‌ترین چهره‌های تاریخ مانده است؛ ستارهٔ دنباله‌داری که بر آسمان ایران شعله کشید، درخشان و هولناک، و تقریباً به همان شتابی که آمده بود رفت.' }"""),

 ("{ t: 'pull', x: 'A shepherd who conquered an empire, and a genius undone by his own shadow.' }",
  "{ t: 'pull', x: 'A shepherd who conquered an empire, and a genius undone by his own shadow.', fa: 'چوپانی که امپراتوری گشود، و نابغه‌ای که سایهٔ خودش از پا درش آورد.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
