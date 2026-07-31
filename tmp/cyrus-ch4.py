# -*- coding: utf-8 -*-
# Cyrus, chapter four: Babylon and the Cylinder.

p = "constants/education.ts"
s = open(p).read()

if "دروازه‌هایش را تقریباً بی‌جنگ" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'Now only one of the great powers stood between Cyrus and mastery of the known world: Babylon, the ancient and magnificent city on the Euphrates, its walls counted among the wonders of the earth. In 539 BCE, Cyrus turned toward it.' }",
  "{ t: 'p', x: 'Now only one of the great powers stood between Cyrus and mastery of the known world: Babylon, the ancient and magnificent city on the Euphrates, its walls counted among the wonders of the earth. In 539 BCE, Cyrus turned toward it.', fa: 'اکنون تنها یکی از قدرت‌های بزرگ میان کوروش و فرمانروایی بر جهانِ شناخته‌شده ایستاده بود: بابل، شهر کهن و باشکوه کنار فرات، که دیوارهایش را از شگفتی‌های زمین می‌شمردند. در ۵۳۹ پیش از میلاد، کوروش رو به سوی آن آورد.' }"),

 ("{ t: 'p', x: 'Babylon was ruled by Nabonidus, a king who had estranged his own priests and people. When Cyrus came, the accounts tell that the city opened its gates to him almost without a fight, its people welcoming him less as a conqueror than as a deliverer.' }",
  "{ t: 'p', x: 'Babylon was ruled by Nabonidus, a king who had estranged his own priests and people. When Cyrus came, the accounts tell that the city opened its gates to him almost without a fight, its people welcoming him less as a conqueror than as a deliverer.', fa: 'بر بابل نبونید فرمان می‌راند، شاهی که کاهنان و مردم خودش را از خود رنجانده بود. روایت‌ها می‌گویند وقتی کوروش رسید، شهر دروازه‌هایش را تقریباً بی‌جنگ بر او گشود، و مردمش او را نه چندان چون فاتح که چون رهایی‌بخش پذیرا شدند.' }"),

 ("{ t: 'h', x: 'The Cyrus Cylinder' }",
  "{ t: 'h', x: 'The Cyrus Cylinder', fa: 'استوانهٔ کوروش' }"),

 ("{ t: 'p', x: 'What Cyrus did next echoed through history. Rather than sack the great city or drag its gods away in chains, as conquerors before him had done, he entered in peace, honored the Babylonian god Marduk, restored the temples, and let the life of the city go on undisturbed.' }",
  "{ t: 'p', x: 'What Cyrus did next echoed through history. Rather than sack the great city or drag its gods away in chains, as conquerors before him had done, he entered in peace, honored the Babylonian god Marduk, restored the temples, and let the life of the city go on undisturbed.', fa: 'آنچه کوروش پس از آن کرد، در تاریخ پژواک انداخت. به جای غارت شهر بزرگ یا به زنجیر کشیدن خدایانش، چنان‌که فاتحان پیش از او کرده بودند، به صلح وارد شد، مردوک خدای بابلی را گرامی داشت، نیایشگاه‌ها را بازساخت و گذاشت زندگی شهر بی‌آشوب ادامه یابد.' }"),

 ("{ t: 'p', x: 'He recorded his acts on a clay barrel now known as the Cyrus Cylinder, one of the most remarkable objects to survive from the ancient world. In it he tells how he freed the peoples held captive in Babylon and let them return to their homelands, and how he restored their temples and their gods.' }",
  "{ t: 'p', x: 'He recorded his acts on a clay barrel now known as the Cyrus Cylinder, one of the most remarkable objects to survive from the ancient world. In it he tells how he freed the peoples held captive in Babylon and let them return to their homelands, and how he restored their temples and their gods.', fa: 'کارهایش را بر استوانه‌ای گِلی نوشت که امروز آن را استوانهٔ کوروش می‌نامند، از شگفت‌ترین چیزهایی که از جهان باستان به جا مانده است. در آن می‌گوید چگونه مردمانی را که در بابل به اسارت نگه داشته شده بودند آزاد کرد و گذاشت به سرزمین‌های خود بازگردند، و چگونه نیایشگاه‌ها و خدایانشان را به آنان بازگرداند.' }"),

 ("{ t: 'q', x: 'I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.' }",
  "{ t: 'q', x: 'I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.', fa: 'خدایانی را که در آنجا می‌زیستند به جایگاهشان بازگرداندم و گذاشتم در خانه‌های جاودان خود بمانند. همهٔ مردمانشان را گرد آوردم و خانه‌هایشان را به آنان بازگرداندم.' }"),

 ("{ t: 'h', x: 'The return of the exiles' }",
  "{ t: 'h', x: 'The return of the exiles', fa: 'بازگشت تبعیدیان' }"),

 ("{ t: 'p', x: 'Among those he freed were the people of Judah, carried off to Babylon in captivity a generation before. Cyrus allowed them to return to Jerusalem and to rebuild their temple, an act remembered in the Hebrew Bible with extraordinary gratitude. In its pages he is called the anointed of God, the only foreign ruler ever given that title.' }",
  "{ t: 'p', x: 'Among those he freed were the people of Judah, carried off to Babylon in captivity a generation before. Cyrus allowed them to return to Jerusalem and to rebuild their temple, an act remembered in the Hebrew Bible with extraordinary gratitude. In its pages he is called the anointed of God, the only foreign ruler ever given that title.', fa: 'در میان آزادشدگان، مردم یهودا بودند که یک نسل پیش‌تر به اسارت به بابل برده شده بودند. کوروش به آنان اجازه داد به اورشلیم بازگردند و معبدشان را از نو بسازند؛ کاری که در کتاب مقدس عبری با سپاسی کم‌مانند به یاد آورده شده است. در آن صفحه‌ها او را مسیحِ خداوند خوانده‌اند، تنها فرمانروای بیگانه‌ای که چنین لقبی گرفته است.' }"),

 ("{ t: 'q', x: 'Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.' }",
  "{ t: 'q', x: 'Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.', fa: 'کوروش، شاه پارس، چنین می‌گوید: خداوند مرا فرمان داده است که خانه‌ای برای او در اورشلیم بنا کنم. هر که از قوم او در میان شماست، برخیزد و برود.' }"),

 ("{ t: 'p', x: 'It is a rare thing in history for a conqueror to be remembered as a liberator by the people he ruled. Cyrus was remembered so by Babylonians, by Jews, and by Greeks alike, each in their own writings, each telling of a king who ruled with a restraint the ancient world had never seen.' }",
  "{ t: 'p', x: 'It is a rare thing in history for a conqueror to be remembered as a liberator by the people he ruled. Cyrus was remembered so by Babylonians, by Jews, and by Greeks alike, each in their own writings, each telling of a king who ruled with a restraint the ancient world had never seen.', fa: 'کم پیش می‌آید در تاریخ که فاتحی را مردمی که بر آنان فرمان رانده، رهایی‌بخش به یاد بیاورند. کوروش را بابلیان، یهودیان و یونانیان، هر یک در نوشته‌های خودشان، همین‌گونه به یاد آوردند؛ هر یک از شاهی گفتند که با خویشتن‌داری‌ای فرمان راند که جهان باستان مانندش را ندیده بود.' }"),
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
print("chapter four translated:", len(PAIRS), "blocks")
