# -*- coding: utf-8 -*-
# Reza Shah: the war years and the Allied invasion.

p = "constants/education.ts"
s = open(p).read()

if "نقطهٔ ثابتی بود که" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 # the quote, which carries a 'by' field
 ("""{ t: 'q', x: 'Now I can die in peace. I have connected the Persian Gulf to the Caspian with Iranian hands and Iranian money.', by: 'Reza Shah, at the railway\\'s opening, 1938' }""",
  """{ t: 'q', x: 'Now I can die in peace. I have connected the Persian Gulf to the Caspian with Iranian hands and Iranian money.', fa: 'حالا می‌توانم آسوده بمیرم. خلیج فارس را با دست ایرانی و پول ایرانی به دریای خزر رساندم.', by: 'Reza Shah, at the railway\\'s opening, 1938', byFa: 'رضاشاه، در افتتاح راه‌آهن، ۱۳۱۷' }"""),

 ("{ t: 'p', x: 'To his children he was the fixed point around which the whole household turned. They remembered his rare smiles as precious things, and carried his example, his devotion to Iran above all else, for the rest of their lives.' }",
  "{ t: 'p', x: 'To his children he was the fixed point around which the whole household turned. They remembered his rare smiles as precious things, and carried his example, his devotion to Iran above all else, for the rest of their lives.', fa: 'برای فرزندانش نقطهٔ ثابتی بود که تمام خانه گرد آن می‌چرخید. لبخندهای کمیابش را چون چیزی گران‌بها به یاد داشتند، و سرمشق او را، آن دلبستگی به ایران که بر همه‌چیز مقدم بود، تا پایان عمر با خود بردند.' }"),

 ("{ t: 'p', x: 'As the 1930s ended, the shadow of another world war fell across Europe, and Iran could not stay clear of it. Reza Shah had turned to Germany for the engineers and industry he needed, and German experts had helped build many of his factories and railways. When war came, those ties would prove dangerous.' }",
  "{ t: 'p', x: 'As the 1930s ended, the shadow of another world war fell across Europe, and Iran could not stay clear of it. Reza Shah had turned to Germany for the engineers and industry he needed, and German experts had helped build many of his factories and railways. When war came, those ties would prove dangerous.', fa: 'با پایان دههٔ ۱۹۳۰، سایهٔ جنگی جهانی دیگر بر اروپا افتاد و ایران نتوانست از آن کنار بماند. رضاشاه برای مهندس و صنعتی که لازم داشت رو به آلمان آورده بود، و کارشناسان آلمانی در ساختن بسیاری از کارخانه‌ها و راه‌آهن‌هایش دست داشتند. وقتی جنگ رسید، همین پیوندها خطرناک از آب درآمدند.' }"),

 ("{ t: 'p', x: 'When the Second World War broke out, Iran declared itself neutral, as it had in the first. But its geography, and its railway, made neutrality almost impossible to defend.' }",
  "{ t: 'p', x: 'When the Second World War broke out, Iran declared itself neutral, as it had in the first. But its geography, and its railway, made neutrality almost impossible to defend.', fa: 'وقتی جنگ جهانی دوم درگرفت، ایران خود را بی‌طرف اعلام کرد، همان‌گونه که در جنگ نخست کرده بود. اما جغرافیایش، و راه‌آهنش، نگه داشتن آن بی‌طرفی را تقریباً ناممکن کرد.' }"),

 ("{ t: 'h', x: 'The Persian Corridor' }",
  "{ t: 'h', x: 'The Persian Corridor', fa: 'کریدور ایران' }"),

 ("{ t: 'p', x: 'In June 1941 Germany invaded the Soviet Union. Overnight, Britain and the Soviet Union became allies in desperate need of a secure land route to move supplies to the Soviet front. Iran, with its north to south railway, was the perfect corridor, and the Allies were determined to control it.' }",
  "{ t: 'p', x: 'In June 1941 Germany invaded the Soviet Union. Overnight, Britain and the Soviet Union became allies in desperate need of a secure land route to move supplies to the Soviet front. Iran, with its north to south railway, was the perfect corridor, and the Allies were determined to control it.', fa: 'در ژوئن ۱۹۴۱ آلمان به اتحاد شوروی حمله کرد. یک‌شبه، بریتانیا و شوروی متحد شدند و هر دو به‌شدت به راهی زمینی و امن نیاز داشتند تا تدارکات را به جبههٔ شوروی برسانند. ایران، با راه‌آهنی که از شمال تا جنوب کشیده شده بود، کریدوری بی‌نقص بود، و متفقین مصمم بودند آن را در دست بگیرند.' }"),

 ("""{ t: 'p', x: 'They demanded that Iran expel its German nationals and grant free passage for Allied supplies. Reza Shah, proud and unwilling to surrender his country\\'s neutrality, sought to negotiate rather than simply submit.' }""",
  """{ t: 'p', x: 'They demanded that Iran expel its German nationals and grant free passage for Allied supplies. Reza Shah, proud and unwilling to surrender his country\\'s neutrality, sought to negotiate rather than simply submit.', fa: 'خواستند ایران اتباع آلمانی را اخراج کند و راه را برای تدارکات متفقین باز بگذارد. رضاشاه که سربلند بود و حاضر نبود بی‌طرفی کشورش را واگذار کند، کوشید گفت‌وگو کند، نه اینکه تنها تسلیم شود.' }"""),

 ("{ t: 'h', x: 'The invasion' }",
  "{ t: 'h', x: 'The invasion', fa: 'حمله' }"),

 ("{ t: 'p', x: 'On 25 August 1941, British forces invaded from the south and Soviet forces from the north. The army that Reza Shah had spent his reign building, the pride of his modern state, was overwhelmed within days by the two great powers striking together.' }",
  "{ t: 'p', x: 'On 25 August 1941, British forces invaded from the south and Soviet forces from the north. The army that Reza Shah had spent his reign building, the pride of his modern state, was overwhelmed within days by the two great powers striking together.', fa: 'در سوم شهریور ۱۳۲۰، نیروهای بریتانیا از جنوب و نیروهای شوروی از شمال وارد شدند. ارتشی که رضاشاه تمام دوران پادشاهی‌اش را صرف ساختنش کرده بود، مایهٔ فخر دولت مدرنش، در چند روز زیر ضربهٔ همزمان دو قدرت بزرگ از پا درآمد.' }"),

 ("""{ t: 'p', x: 'It was a bitter blow. The very foundation of his life\\'s work, a strong and independent Iran, was overrun by the same foreign powers he had spent twenty years trying to keep at bay.' }""",
  """{ t: 'p', x: 'It was a bitter blow. The very foundation of his life\\'s work, a strong and independent Iran, was overrun by the same foreign powers he had spent twenty years trying to keep at bay.', fa: 'ضربه‌ای تلخ بود. بنیاد کار تمام عمرش، ایرانی نیرومند و مستقل، زیر پای همان قدرت‌های بیگانه‌ای رفت که بیست سال کوشیده بود دورشان نگه دارد.' }"""),

 ("{ t: 'h', x: 'The hardest choice' }",
  "{ t: 'h', x: 'The hardest choice', fa: 'سخت‌ترین انتخاب' }"),
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
print("translated:", len(PAIRS), "blocks")
