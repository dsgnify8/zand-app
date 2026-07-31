# -*- coding: utf-8 -*-
# Cyrus, chapter two.

p = "constants/education.ts"
s = open(p).read()

if "برخاست و درفش شورش" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'When Cyrus came to the throne of Persia around 559 BCE, his people were still vassals of the Median king Astyages, the very grandfather who, in legend, had once tried to kill him. For a time the young king bided his time, gathering the loyalty of the Persian tribes and waiting for his moment.' }",
  "{ t: 'p', x: 'When Cyrus came to the throne of Persia around 559 BCE, his people were still vassals of the Median king Astyages, the very grandfather who, in legend, had once tried to kill him. For a time the young king bided his time, gathering the loyalty of the Persian tribes and waiting for his moment.', fa: 'وقتی کوروش حدود ۵۵۹ پیش از میلاد بر تخت پارس نشست، مردمش هنوز دست‌نشاندهٔ آستیاگ بودند، شاه ماد؛ همان پدربزرگی که بنا بر افسانه روزی خواسته بود او را بکشد. شاه جوان چندی درنگ کرد، وفاداری تیره‌های پارسی را گرد آورد و منتظر لحظهٔ خود ماند.' }"),

 ("{ t: 'p', x: 'That moment came around 553 BCE, when Cyrus raised the standard of revolt. The Persians were fewer and poorer than their Median overlords, but they were hardy mountain people, and they had a leader unlike any they had known.' }",
  "{ t: 'p', x: 'That moment came around 553 BCE, when Cyrus raised the standard of revolt. The Persians were fewer and poorer than their Median overlords, but they were hardy mountain people, and they had a leader unlike any they had known.', fa: 'آن لحظه حدود ۵۵۳ پیش از میلاد رسید، آنگاه که کوروش برخاست و درفش شورش را بلند کرد. پارسیان از سرورانِ مادی خود کم‌شمارتر و تهی‌دست‌تر بودند، اما مردمی سرسخت از کوهستان بودند، و فرمانروایی داشتند که مانندش را ندیده بودند.' }"),

 ("{ t: 'h', x: 'The battle that changed everything' }",
  "{ t: 'h', x: 'The battle that changed everything', fa: 'نبردی که همه‌چیز را دگرگون کرد' }"),

 ("{ t: 'p', x: 'Astyages marched against the rebels with a great army. But according to the ancient accounts, his own general, Harpagus, still nursed a bitter hatred of the king, and at the decisive moment much of the Median army went over to Cyrus rather than fight him. Astyages was captured, and the Median crown passed to the Persian.' }",
  "{ t: 'p', x: 'Astyages marched against the rebels with a great army. But according to the ancient accounts, his own general, Harpagus, still nursed a bitter hatred of the king, and at the decisive moment much of the Median army went over to Cyrus rather than fight him. Astyages was captured, and the Median crown passed to the Persian.', fa: 'آستیاگ با سپاهی بزرگ به سوی شورشیان تاخت. اما بنا بر روایت‌های کهن، سردار خودش، هارپاگ، هنوز کینه‌ای تلخ از شاه به دل داشت، و در لحظهٔ سرنوشت‌ساز بخش بزرگی از سپاه ماد به جای جنگیدن با کوروش به او پیوست. آستیاگ به اسارت افتاد و تاج ماد به پارسی رسید.' }"),

 ("{ t: 'p', x: 'It was a turning of the world. The subject had become the master, and the small kingdom of Persia now ruled the vast lands of the Medes. Yet Cyrus did something remarkable, and characteristic. He did not execute or humiliate his defeated grandfather, but spared his life and, it is said, kept him at his court.' }",
  "{ t: 'p', x: 'It was a turning of the world. The subject had become the master, and the small kingdom of Persia now ruled the vast lands of the Medes. Yet Cyrus did something remarkable, and characteristic. He did not execute or humiliate his defeated grandfather, but spared his life and, it is said, kept him at his court.', fa: 'جهان زیر و رو شد. زیردست، سرور شده بود، و پادشاهی کوچک پارس اکنون بر سرزمین‌های پهناور ماد فرمان می‌راند. اما کوروش کاری کرد که هم شگفت بود و هم از او بعید نبود: پدربزرگ شکست‌خورده‌اش را نه کشت و نه خوار کرد، جانش را بخشید و گفته‌اند که او را در دربار خود نگه داشت.' }"),

 ("{ t: 'call', x: 'From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.' }",
  "{ t: 'call', x: 'From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.', fa: 'کوروش از همان نخستین پیروزی، خصلتی را نشان داد که او را تعریف می‌کرد. جایی که دیگر فاتحان آن روزگار با کشتار و وحشت حکم می‌راندند، او با شکست‌خوردگان مدارا کرد و آنان را در نظم تازهٔ خود بافت. این تنها مهربانی نبود؛ راهی خردمندانه‌تر و ماندگارتر برای فرمانروایی بود.' }"),

 ("""{ t: 'p', x: 'With Media his, Cyrus inherited not only its lands but its network of tributaries and its place among the great powers. The kings of the age now took notice of the newcomer who had risen so suddenly in the east. Among them was Croesus of Lydia, the richest man in the known world, who watched the Persian\\'s rise with growing alarm.' }""",
  """{ t: 'p', x: 'With Media his, Cyrus inherited not only its lands but its network of tributaries and its place among the great powers. The kings of the age now took notice of the newcomer who had risen so suddenly in the east. Among them was Croesus of Lydia, the richest man in the known world, who watched the Persian\\'s rise with growing alarm.', fa: 'با به دست آوردن ماد، کوروش نه تنها سرزمین‌هایش را که شبکهٔ باج‌گزارانش و جایگاهش در میان قدرت‌های بزرگ را نیز به ارث برد. شاهان آن روزگار حالا تازه‌واردی را می‌دیدند که چنین ناگهانی در شرق سر برآورده بود. یکی از آنان کرزوس لیدیه بود، ثروتمندترین مرد جهانِ شناخته‌شده، که برآمدن این پارسی را با نگرانی روزافزون تماشا می‌کرد.' }"""),
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
print("chapter two translated:", len(PAIRS), "blocks")
