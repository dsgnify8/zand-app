# -*- coding: utf-8 -*-
# Ferdowsi's scene blocks. These are the famous tales, so the Persian uses
# the names and phrasing they carry in the Shahnameh: ضحاک, کاوهٔ آهنگر,
# درفش کاویانی, رخش, مهره for the token.

p = "constants/literature.ts"
s = open(p).read()

PAIRS = [
 ("""title: 'A poet\\'s sacrifice', x: 'It is said that Ferdowsi was promised a great reward for his work, a gold coin for every verse. But when the treasure finally came, it was silver, not gold, and far too little. Proud and wounded, the old poet gave the money away, to a bath keeper and a seller of drinks, and asked for nothing. He had not written for gold.'""",
  """title: 'A poet\\'s sacrifice', titleFa: 'گذشتِ یک شاعر', x: 'It is said that Ferdowsi was promised a great reward for his work, a gold coin for every verse. But when the treasure finally came, it was silver, not gold, and far too little. Proud and wounded, the old poet gave the money away, to a bath keeper and a seller of drinks, and asked for nothing. He had not written for gold.', fa: 'گفته‌اند که به فردوسی وعدهٔ صله‌ای بزرگ داده بودند: برای هر بیت یک سکهٔ زر. اما آنگاه که صله سرانجام رسید، سیم بود نه زر، و بسیار کمتر از آنچه باید. شاعر پیر، سربلند و دل‌آزرده، پول را بخشید؛ به گرمابه‌بان و به فقاع‌فروش، و چیزی نخواست. برای زر ننوشته بود.'"""),

 ("""title: 'Zahhak, the Serpent King', x: 'In the ancient days, the tyrant Zahhak was tricked by the devil, who kissed his shoulders, from which sprang two hungry serpents that fed upon the brains of the young. For a thousand years his cruelty darkened the world, until a blacksmith named Kaveh raised his leather apron as a banner of revolt and rallied the people to overthrow him. It is one of the oldest tales of tyranny undone by the courage of ordinary people.'""",
  """title: 'Zahhak, the Serpent King', titleFa: 'ضحاک ماردوش', x: 'In the ancient days, the tyrant Zahhak was tricked by the devil, who kissed his shoulders, from which sprang two hungry serpents that fed upon the brains of the young. For a thousand years his cruelty darkened the world, until a blacksmith named Kaveh raised his leather apron as a banner of revolt and rallied the people to overthrow him. It is one of the oldest tales of tyranny undone by the courage of ordinary people.', fa: 'در روزگاران کهن، ابلیس ضحاک ستمگر را فریفت و بر دو شانه‌اش بوسه زد، و از آن دو بوسه دو مار گرسنه رویید که از مغز جوانان تغذیه می‌کردند. هزار سال ستم او جهان را تیره کرد، تا آنکه آهنگری به نام کاوه چرم‌پارهٔ خود را چون درفشِ شورش برافراشت و مردم را برای براندازی‌اش گرد آورد. این یکی از کهن‌ترین داستان‌های جهان است دربارهٔ ستمی که با دلیری مردم عادی فرو می‌ریزد.'"""),

 ("""title: 'Rostam, the Greatest Hero', x: 'Towering over the whole epic is Rostam, the mightiest champion of Iran, a warrior of superhuman strength who serves king after king across centuries, riding his faithful horse Rakhsh through impossible trials. He is the heart of the Shahnameh, the very image of loyalty, courage, and might in service of his homeland.'""",
  """title: 'Rostam, the Greatest Hero', titleFa: 'رستم دستان', x: 'Towering over the whole epic is Rostam, the mightiest champion of Iran, a warrior of superhuman strength who serves king after king across centuries, riding his faithful horse Rakhsh through impossible trials. He is the heart of the Shahnameh, the very image of loyalty, courage, and might in service of his homeland.', fa: 'بر سرتاسر این حماسه رستم سایه انداخته است، نیرومندترین پهلوان ایران؛ جنگاوری با توانی فراتر از آدمی که قرن‌ها شاه پس از شاه را خدمت می‌کند و بر رخشِ وفادارش از خوان‌های ناممکن می‌گذرد. او قلب شاهنامه است، و خودِ تصویر وفاداری و دلیری و توان، در خدمت میهن.'"""),

 ("""title: 'Rostam and Sohrab', x: 'Rostam had a son he had never known, Sohrab, born and raised far away. Grown into a mighty warrior himself, Sohrab set out to find his father. But fate is cruel: the two met not as father and son but as champions of opposing armies, neither knowing the other. They fought, and Rostam, the greater warrior, struck the fatal blow. Only as the young man lay dying did the truth emerge, in a token Rostam had once given the boy\\'s mother. The mightiest hero in the world had killed his own son, and no strength on earth could undo it.'""",
  """title: 'Rostam and Sohrab', titleFa: 'رستم و سهراب', x: 'Rostam had a son he had never known, Sohrab, born and raised far away. Grown into a mighty warrior himself, Sohrab set out to find his father. But fate is cruel: the two met not as father and son but as champions of opposing armies, neither knowing the other. They fought, and Rostam, the greater warrior, struck the fatal blow. Only as the young man lay dying did the truth emerge, in a token Rostam had once given the boy\\'s mother. The mightiest hero in the world had killed his own son, and no strength on earth could undo it.', fa: 'رستم پسری داشت که هرگز ندیده بودش: سهراب، که دور از او زاده و بزرگ شده بود. سهراب که خود پهلوانی نیرومند شده بود، به جست‌وجوی پدر راه افتاد. اما سرنوشت بی‌رحم است: آن دو نه چون پدر و پسر که چون پهلوانان دو سپاه رویاروی به هم رسیدند، و هیچ‌کدام دیگری را نشناخت. جنگیدند، و رستم که پهلوان‌تر بود ضربهٔ کاری را زد. تنها آنگاه که جوان در خون خود افتاده بود حقیقت آشکار شد؛ از مهره‌ای که رستم روزی به مادر او سپرده بود. نیرومندترین پهلوان جهان پسر خودش را کشته بود، و هیچ توانی بر روی زمین نمی‌توانست آن را بازگرداند.'"""),
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
