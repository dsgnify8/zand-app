# -*- coding: utf-8 -*-
# Reza Shah: header, and the first two chapters.

p = "constants/education.ts"
s = open(p).read()

if "در روستای الاشت" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 # header
 ("essence: 'The soldier from a mountain village who founded a dynasty and built the modern Iranian state, almost single handedly, in sixteen years.',",
  "essence: 'The soldier from a mountain village who founded a dynasty and built the modern Iranian state, almost single handedly, in sixteen years.',\n  essenceFa: 'سربازی از یک روستای کوهستانی که سلسله‌ای بنیان نهاد و دولت مدرن ایران را، تقریباً به تنهایی، در شانزده سال ساخت.',"),

 ("      title: 'From a Mountain Village',\n      subtitle: '1878 – 1900',",
  "      title: 'From a Mountain Village',\n      titleFa: 'از یک روستای کوهستانی',\n      subtitle: '1878 – 1900',\n      subtitleFa: '۱۸۷۸ تا ۱۹۰۰',"),

 ("      title: 'The March on Tehran',\n      subtitle: 'February 1921',",
  "      title: 'The March on Tehran',\n      titleFa: 'راهپیمایی به سوی تهران',\n      subtitle: 'February 1921',\n      subtitleFa: 'اسفند ۱۲۹۹',"),

 ("      title: 'Building a Nation',\n      subtitle: '1925 – 1941',",
  "      title: 'Building a Nation',\n      titleFa: 'ساختن یک ملت',\n      subtitle: '1925 – 1941',\n      subtitleFa: '۱۹۲۵ تا ۱۹۴۱',"),

 ("      title: 'The Father and the Man',",
  "      title: 'The Father and the Man',\n      titleFa: 'پدر، و آن مرد',"),

 ("      title: 'The Gathering War',\n      subtitle: '1939 – 1941',",
  "      title: 'The Gathering War',\n      titleFa: 'جنگی که نزدیک می‌شد',\n      subtitle: '1939 – 1941',\n      subtitleFa: '۱۹۳۹ تا ۱۹۴۱',"),

 ("      title: 'Abdication and Exile',\n      subtitle: '1941 – 1944',",
  "      title: 'Abdication and Exile',\n      titleFa: 'کناره‌گیری و تبعید',\n      subtitle: '1941 – 1944',\n      subtitleFa: '۱۹۴۱ تا ۱۹۴۴',"),

 # chapter one
 ("{ t: 'p', x: 'Reza Khan was born on 15 March 1878 in Alasht, a small village high in the mountains of Mazandaran, in the green north of Iran. His people were of modest means, and the world he entered was a hard one, far from the comforts of the capital.' }",
  "{ t: 'p', x: 'Reza Khan was born on 15 March 1878 in Alasht, a small village high in the mountains of Mazandaran, in the green north of Iran. His people were of modest means, and the world he entered was a hard one, far from the comforts of the capital.', fa: 'رضاخان در ۱۵ مارس ۱۸۷۸ در روستای الاشت به دنیا آمد، دهکده‌ای کوچک در بلندی‌های کوه‌های مازندران، در شمال سبز ایران. خانواده‌اش تنگدست بودند و جهانی که پا به آن گذاشت سخت بود، دور از آسایش پایتخت.' }"),

 ("{ t: 'p', x: 'His father, an officer, died when Reza was only a few months old. His mother carried her infant son through winter snows toward Tehran to find family, a journey that nearly cost them both their lives. He grew up without wealth or connection, shaped early by hardship and by his own stubborn strength of will.' }",
  "{ t: 'p', x: 'His father, an officer, died when Reza was only a few months old. His mother carried her infant son through winter snows toward Tehran to find family, a journey that nearly cost them both their lives. He grew up without wealth or connection, shaped early by hardship and by his own stubborn strength of will.', fa: 'پدرش که افسر بود، وقتی رضا تنها چند ماه داشت درگذشت. مادرش نوزادش را در برف‌های زمستان به سوی تهران برد تا خویشاوندی بیابد؛ سفری که نزدیک بود جان هر دو را بگیرد. بی‌ثروت و بی‌پشتوانه بزرگ شد، و از همان آغاز، سختی و ارادهٔ سرسخت خودش او را ساختند.' }"),

 ("{ t: 'p', x: 'As a young man he joined the Persian Cossack Brigade, the only modern, disciplined military unit in a Qajar Iran that was otherwise weak and disordered. There he found his calling. Tall, commanding, and fearless, he rose steadily through the ranks by sheer ability in an age when birth usually counted for more.' }",
  "{ t: 'p', x: 'As a young man he joined the Persian Cossack Brigade, the only modern, disciplined military unit in a Qajar Iran that was otherwise weak and disordered. There he found his calling. Tall, commanding, and fearless, he rose steadily through the ranks by sheer ability in an age when birth usually counted for more.', fa: 'در جوانی به بریگاد قزاق پیوست، تنها یگان نظامی مدرن و منضبط در ایرانِ قاجاری‌ای که در باقی امور ناتوان و پریشان بود. راه خودش را همان‌جا یافت. بلندقامت، فرمانده‌وار و بی‌باک، تنها با توانایی خودش پله‌پله بالا رفت، در روزگاری که معمولاً نسب بیشتر از لیاقت به کار می‌آمد.' }"),

 ("{ t: 'p', x: 'The Iran around him was a nation in decline, its government bankrupt, its provinces ruled by tribes and foreign interests, its affairs decided in London and Saint Petersburg. For a proud soldier who loved his country, the humiliation was a fire that would drive him for the rest of his life.' }",
  "{ t: 'p', x: 'The Iran around him was a nation in decline, its government bankrupt, its provinces ruled by tribes and foreign interests, its affairs decided in London and Saint Petersburg. For a proud soldier who loved his country, the humiliation was a fire that would drive him for the rest of his life.', fa: 'ایرانی که پیرامونش بود، کشوری رو به افول بود؛ خزانه‌اش تهی، ولایاتش در دست ایل‌ها و منافع بیگانه، و کارهایش در لندن و سن‌پترزبورگ تعیین می‌شد. برای سربازی سربلند که کشورش را دوست داشت، این خواری آتشی بود که تا پایان عمر او را پیش راند.' }"),

 # chapter two
 ("{ t: 'h', x: 'A nation adrift' }",
  "{ t: 'h', x: 'A nation adrift', fa: 'کشوری بی‌سکان' }"),

 ("{ t: 'p', x: 'By 1921 Iran was close to collapse. The First World War had ravaged the country though it was never a combatant, famine had killed untold numbers, and the young Qajar king, Ahmad Shah, was powerless to hold the state together. Into that vacuum stepped a soldier who had decided that someone must act.' }",
  "{ t: 'p', x: 'By 1921 Iran was close to collapse. The First World War had ravaged the country though it was never a combatant, famine had killed untold numbers, and the young Qajar king, Ahmad Shah, was powerless to hold the state together. Into that vacuum stepped a soldier who had decided that someone must act.', fa: 'تا ۱۹۲۱ ایران تا آستانهٔ فروپاشی رفته بود. جنگ جهانی اول کشور را ویران کرده بود، هرچند ایران هرگز در آن جنگ طرف نبود؛ قحطی شمار بی‌شماری را کشته بود، و احمدشاه جوان قاجار توان نگه داشتن دولت را نداشت. در این خلأ، سربازی پا پیش گذاشت که به این نتیجه رسیده بود کسی باید کاری کند.' }"),

 ("{ t: 'h', x: 'The coup' }",
  "{ t: 'h', x: 'The coup', fa: 'کودتا' }"),

 ("{ t: 'p', x: 'In February 1921, Reza Khan marched from Qazvin to Tehran at the head of only about two thousand five hundred to three thousand well disciplined troops. They entered the capital almost without resistance and took control of the city in a single, bloodless stroke.' }",
  "{ t: 'p', x: 'In February 1921, Reza Khan marched from Qazvin to Tehran at the head of only about two thousand five hundred to three thousand well disciplined troops. They entered the capital almost without resistance and took control of the city in a single, bloodless stroke.', fa: 'در اسفند ۱۲۹۹، رضاخان در رأس تنها حدود دو هزار و پانصد تا سه هزار سرباز منضبط از قزوین به سوی تهران راه افتاد. تقریباً بدون مقاومت وارد پایتخت شدند و شهر را در یک حرکت، بی‌آنکه خونی ریخته شود، در دست گرفتند.' }"),

 ("""{ t: 'p', x: 'He installed a new government with the journalist Seyyed Zia Tabatabaei as prime minister, and took for himself the command of the armed forces, with the title Sardar Sepah, commander of the army. The Qajar Shah remained on his throne in name, but real power in Iran had changed hands. This quiet, disciplined coup is the true beginning of Reza Shah\\'s rise.' }""",
  """{ t: 'p', x: 'He installed a new government with the journalist Seyyed Zia Tabatabaei as prime minister, and took for himself the command of the armed forces, with the title Sardar Sepah, commander of the army. The Qajar Shah remained on his throne in name, but real power in Iran had changed hands. This quiet, disciplined coup is the true beginning of Reza Shah\\'s rise.', fa: 'دولتی تازه بر سر کار آورد با سید ضیاءالدین طباطبایی، روزنامه‌نگار، در مقام نخست‌وزیر، و فرماندهی نیروهای مسلح را خود بر عهده گرفت با لقب سردار سپه. شاه قاجار به نام بر تخت ماند، اما قدرت واقعی در ایران دست به دست شده بود. همین کودتای آرام و منضبط، آغاز راستین برآمدن رضاشاه است.' }"""),
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
print("reza shah: header + chapters one and two,", len(PAIRS), "entries")
