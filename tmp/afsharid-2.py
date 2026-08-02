# -*- coding: utf-8 -*-
# The Afsharid dynasty, second batch: the army, Karnal, and Delhi.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Historians have called him the Napoleon of Persia, and the comparison is fitting. Like that later conqueror, Nader rose from obscurity by pure military genius, remade the army of his nation, and led it to victories that astonished the world. He was a master of speed, of surprise, and of the bold stroke that broke his enemies before they could gather.' }",
  "{ t: 'p', x: 'Historians have called him the Napoleon of Persia, and the comparison is fitting. Like that later conqueror, Nader rose from obscurity by pure military genius, remade the army of his nation, and led it to victories that astonished the world. He was a master of speed, of surprise, and of the bold stroke that broke his enemies before they could gather.', fa: 'تاریخ‌نگاران او را ناپلئون ایران خوانده‌اند، و شباهت بی‌راه نیست؛ هرچند نادر شصت سال پیش از ناپلئون می‌زیست. مانند آن فاتح متأخر، نادر تنها با نبوغ نظامی از گمنامی برخاست، ارتش کشورش را از نو ساخت و آن را به پیروزی‌هایی رساند که جهان را حیرت‌زده کرد. استاد سرعت بود، استاد غافلگیری، و استاد آن ضربهٔ جسورانه که دشمن را پیش از آنکه گرد هم آید در هم می‌شکست.' }"),

 ("{ t: 'p', x: 'His soldiers, hardened by constant campaign and devoted to a leader who shared their every hardship, became the most formidable fighting force in Asia. Under Nader, the armies of Iran marched from victory to victory, and the name of the Persian Shah was feared from the Caucasus to the plains of India.' }",
  "{ t: 'p', x: 'His soldiers, hardened by constant campaign and devoted to a leader who shared their every hardship, became the most formidable fighting force in Asia. Under Nader, the armies of Iran marched from victory to victory, and the name of the Persian Shah was feared from the Caucasus to the plains of India.', fa: 'سربازانش که لشکرکشی پیوسته آبدیده‌شان کرده بود و به فرماندهی دل بسته بودند که در هر سختی شریکشان بود، به مهیب‌ترین نیروی جنگی آسیا بدل شدند. زیر فرمان نادر، سپاهیان ایران از پیروزی به پیروزی رفتند، و نام شاه ایران از قفقاز تا دشت‌های هند هراس می‌انگیخت.' }"),

 ("{ t: 'markline', x: 'He remade the army of Iran into the terror of the East.' }",
  "{ t: 'markline', x: 'He remade the army of Iran into the terror of the East.', fa: 'ارتش ایران را از نو ساخت و آن را به وحشت شرق بدل کرد.' }"),

 ("""{ t: 'p', x: 'Nader\\'s most famous campaign was his boldest. In 1738 he led his army eastward, through Afghanistan and over the mountains, and descended upon the vast and fabulously wealthy Mughal Empire of India, the richest realm on earth.' }""",
  """{ t: 'p', x: 'Nader\\'s most famous campaign was his boldest. In 1738 he led his army eastward, through Afghanistan and over the mountains, and descended upon the vast and fabulously wealthy Mughal Empire of India, the richest realm on earth.', fa: 'نامدارترین لشکرکشی نادر، جسورانه‌ترینش هم بود. در سال ۱۷۳۸ سپاهش را رو به شرق برد، از افغانستان و از فراز کوه‌ها گذشت، و بر امپراتوری پهناور و افسانه‌وار ثروتمند گورکانیان هند فرود آمد؛ توانگرترین قلمرو روی زمین.' }"""),

 ("{ t: 'p', x: 'At the battle of Karnal, his smaller, hardened army shattered the enormous but unwieldy Mughal host in a single day. The road to Delhi, the jewel of the East, lay open before him.' }",
  "{ t: 'p', x: 'At the battle of Karnal, his smaller, hardened army shattered the enormous but unwieldy Mughal host in a single day. The road to Delhi, the jewel of the East, lay open before him.', fa: 'در نبرد کرنال، سپاه کوچک‌تر اما آبدیده‌اش لشکر عظیم و بی‌قوارهٔ گورکانی را در یک روز در هم شکست. راه دهلی، نگین شرق، پیش رویش باز شد.' }"),

 ("{ t: 'h', x: 'The treasure of the world' }",
  "{ t: 'h', x: 'The treasure of the world', fa: 'گنج جهان' }"),

 ("{ t: 'p', x: 'Nader entered Delhi in triumph, and the wealth he carried away from it was almost beyond counting, the accumulated treasure of the Mughal emperors gathered over two centuries. The plunder was so immense that, upon his return, he is said to have exempted the people of Iran from taxes for years.' }",
  "{ t: 'p', x: 'Nader entered Delhi in triumph, and the wealth he carried away from it was almost beyond counting, the accumulated treasure of the Mughal emperors gathered over two centuries. The plunder was so immense that, upon his return, he is said to have exempted the people of Iran from taxes for years.', fa: 'نادر پیروزمندانه وارد دهلی شد، و ثروتی که از آنجا با خود برد تقریباً به شمار درنمی‌آمد؛ گنجینه‌ای که پادشاهان گورکانی در دو قرن انباشته بودند. غنیمت چندان کلان بود که گفته‌اند پس از بازگشت، مردم ایران را سال‌ها از مالیات معاف کرد.' }"),

 ("{ t: 'h', x: 'The Peacock Throne and a mountain of light' }",
  "{ t: 'h', x: 'The Peacock Throne and a mountain of light', fa: 'تخت طاووس و کوه نور' }"),
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
