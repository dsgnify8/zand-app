# -*- coding: utf-8 -*-
# Reza Shah: abdication, exile, and the closing.

p = "constants/education.ts"
s = open(p).read()

if "با ارتش بیگانه در کشورش" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'With foreign armies in his country and his own overwhelmed, Reza Shah faced an impossible position. Rather than see the dynasty destroyed and Iran left leaderless under occupation, he chose to step aside so that the crown might pass to his son.' }",
  "{ t: 'p', x: 'With foreign armies in his country and his own overwhelmed, Reza Shah faced an impossible position. Rather than see the dynasty destroyed and Iran left leaderless under occupation, he chose to step aside so that the crown might pass to his son.', fa: 'با ارتش بیگانه در کشورش و ارتش خودش از پا درآمده، رضاشاه در موقعیتی ناممکن گرفتار شد. به جای آنکه سلسله از میان برود و ایران زیر اشغال بی‌سرپرست بماند، کنار رفت تا تاج به پسرش برسد.' }"),

 ("{ t: 'p', x: 'On 16 September 1941, under direct British pressure, Reza Shah abdicated in favor of his twenty one year old son, Mohammad Reza Pahlavi. He signed the document without hesitation, and in doing so handed his son both a throne and a nation under occupation.' }",
  "{ t: 'p', x: 'On 16 September 1941, under direct British pressure, Reza Shah abdicated in favor of his twenty one year old son, Mohammad Reza Pahlavi. He signed the document without hesitation, and in doing so handed his son both a throne and a nation under occupation.', fa: 'در ۲۵ شهریور ۱۳۲۰، زیر فشار مستقیم بریتانیا، رضاشاه به سود پسر بیست و یک ساله‌اش، محمدرضا پهلوی، از سلطنت کناره گرفت. سند را بی‌درنگ امضا کرد، و با همان امضا هم تختی به پسرش سپرد و هم کشوری در اشغال.' }"),

 ("{ t: 'p', x: 'The British took the old king into exile, first to the island of Mauritius in the Indian Ocean, and then to Johannesburg, in South Africa. The man who had bound the Persian Gulf to the Caspian, who had built a state where there had been disorder, now lived out his days far from the country he had remade.' }",
  "{ t: 'p', x: 'The British took the old king into exile, first to the island of Mauritius in the Indian Ocean, and then to Johannesburg, in South Africa. The man who had bound the Persian Gulf to the Caspian, who had built a state where there had been disorder, now lived out his days far from the country he had remade.', fa: 'بریتانیا شاه پیر را به تبعید برد، نخست به جزیرهٔ موریس در اقیانوس هند و سپس به ژوهانسبورگ در آفریقای جنوبی. مردی که خلیج فارس را به دریای خزر بسته بود، و آنجا که آشفتگی بود دولتی ساخته بود، اکنون روزهایش را دور از کشوری می‌گذراند که خودش از نو ساخته بودش.' }"),

 ("{ t: 'p', x: 'He died in exile in Johannesburg on 26 July 1944, at the age of sixty six. He never saw Iran again. His body was first carried to Egypt and laid to rest there for a time. Years later, in 1950, his remains were brought home to Iran, received with the honor of a returning founder. A solemn ceremony and days of national mourning marked his homecoming, and he was laid to rest in a grand mausoleum near Tehran, in the soil of the country he had done so much to build.' }",
  "{ t: 'p', x: 'He died in exile in Johannesburg on 26 July 1944, at the age of sixty six. He never saw Iran again. His body was first carried to Egypt and laid to rest there for a time. Years later, in 1950, his remains were brought home to Iran, received with the honor of a returning founder. A solemn ceremony and days of national mourning marked his homecoming, and he was laid to rest in a grand mausoleum near Tehran, in the soil of the country he had done so much to build.', fa: 'در ۲۶ ژوئیهٔ ۱۹۴۴، در شصت و شش سالگی، در تبعید در ژوهانسبورگ درگذشت. دیگر هرگز ایران را ندید. پیکرش را نخست به مصر بردند و مدتی آنجا به خاک سپردند. سال‌ها بعد، در ۱۳۲۹، بازمانده‌اش را به ایران آوردند و چون بنیان‌گذاری که بازمی‌گردد پذیرایش شدند. مراسمی باشکوه و روزها عزای عمومی بازگشتش را نشان کرد، و در آرامگاهی بزرگ نزدیک تهران به خاک سپرده شد، در خاک کشوری که این‌همه برای ساختنش کرده بود.' }"),

 ("{ t: 'pull', x: 'He built modern Iran almost single handedly, in only sixteen years.' }",
  "{ t: 'pull', x: 'He built modern Iran almost single handedly, in only sixteen years.', fa: 'ایران مدرن را تقریباً به تنهایی ساخت، آن هم تنها در شانزده سال.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of the life of Reza Shah, the soldier from a mountain village who rose to found a dynasty and to build a nation. In only sixteen years he gave Iran a railway that crossed the country, a national army, universities and schools, roads and factories, a modern government, and its own name. He built a nation that has endured to this day, the modern foundation of the Iran we know now.' }",
  "{ t: 'p', x: 'This has been a glimpse of the life of Reza Shah, the soldier from a mountain village who rose to found a dynasty and to build a nation. In only sixteen years he gave Iran a railway that crossed the country, a national army, universities and schools, roads and factories, a modern government, and its own name. He built a nation that has endured to this day, the modern foundation of the Iran we know now.', fa: 'این نگاهی بود کوتاه به زندگی رضاشاه؛ سربازی از یک روستای کوهستانی که برخاست تا سلسله‌ای بنیان بگذارد و ملتی بسازد. تنها در شانزده سال، به ایران راه‌آهنی داد که کشور را درنوردید، ارتشی ملی، دانشگاه و مدرسه، راه و کارخانه، دولتی مدرن، و نام خودش را. کشوری ساخت که تا امروز مانده است، همان بنیاد مدرنِ ایرانی که اکنون می‌شناسیم.' }"),

 ("{ t: 'p', x: 'He was a hard man in a hard time, and he asked much of his country and his family. Yet his devotion to Iran never wavered, and the modern nation his son would inherit, and that Iranians would carry forward, was in great part his to build. He gave his life to the making of modern Iran.' }",
  "{ t: 'p', x: 'He was a hard man in a hard time, and he asked much of his country and his family. Yet his devotion to Iran never wavered, and the modern nation his son would inherit, and that Iranians would carry forward, was in great part his to build. He gave his life to the making of modern Iran.', fa: 'مردی سخت بود در روزگاری سخت، و از کشور و خانواده‌اش بسیار خواست. با این همه دلبستگی‌اش به ایران هرگز نلرزید، و کشور مدرنی که پسرش به ارث برد و ایرانیان پیش بردند، بخش بزرگی از آن کار او بود. عمرش را پای ساختن ایران مدرن گذاشت.' }"),

 ("{ t: 'pull', x: 'From a mountain village, he built a nation.' }",
  "{ t: 'pull', x: 'From a mountain village, he built a nation.', fa: 'از یک روستای کوهستانی، ملتی ساخت.' }"),
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
print("translated:", len(PAIRS), "blocks — Reza Shah complete")
