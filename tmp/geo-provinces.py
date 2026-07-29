# -*- coding: utf-8 -*-
# Geography chapter four plus all thirty one province facts.

p = "constants/geography.ts"
s = open(p).read()

if "titleFa: 'سی و یک استان'" in s:
    print("ABORT: already applied"); raise SystemExit

HEAD = [
 ("""    title: 'The Thirty One',
    nav: 'Provinces',
    subtitle: 'THE PROVINCES',""",
  """    title: 'The Thirty One',
    titleFa: 'سی و یک استان',
    nav: 'Provinces',
    navFa: 'استان‌ها',
    subtitle: 'THE PROVINCES',
    subtitleFa: 'استان‌ها',"""),

 ("{ t: 'p', x: 'Iran is made of thirty one provinces, and no two are alike. Touch any one to learn what makes it itself.' }",
  "{ t: 'p', x: 'Iran is made of thirty one provinces, and no two are alike. Touch any one to learn what makes it itself.', fa: 'ایران از سی و یک استان ساخته شده و هیچ دو تایشان شبیه هم نیستند. روی هرکدام بزن تا ببینی چه چیزی آن را خودش کرده است.' }"),
]

# fact: farsi
FACTS = {
 'Home to Lake Urmia, once the largest lake in the Middle East, and to the ancient fortress of Takht e Soleyman, a Sasanian fire temple ringed by a volcanic lake.':
 'خانهٔ دریاچهٔ ارومیه، که روزگاری بزرگ‌ترین دریاچهٔ خاورمیانه بود، و تخت سلیمان، آتشکده‌ای ساسانی که دریاچه‌ای آتشفشانی دورش حلقه زده.',

 'Its capital Tabriz has one of the oldest and largest covered bazaars on earth, a labyrinth of brick vaults that has traded since antiquity.':
 'تبریز، مرکزش، یکی از کهن‌ترین و بزرگ‌ترین بازارهای سرپوشیدهٔ جهان را دارد؛ هزارتویی از طاق‌های آجری که از دوران باستان داد و ستد در آن جریان داشته.',

 'The birthplace of the Safavid order, whose shrine complex here became the spiritual seed of the dynasty that reunified Iran.':
 'زادگاه طریقت صفوی، که بقعه‌اش اینجا بذر معنوی سلسله‌ای شد که ایران را دوباره یکپارچه کرد.',

 'Green and rain soaked on the Caspian shore, it grows most of Iran rice and tea, a landscape that looks nothing like the deserts people imagine.':
 'سبز و باران‌خورده در کنارهٔ خزر، بیشتر برنج و چای ایران را می‌رویاند؛ چشم‌اندازی که هیچ شباهتی به کویرهای تصور مردم ندارد.',

 'Mountain country of the Zagros, where the village of Palangan climbs a gorge in stacked stone terraces, each roof the neighbour courtyard.':
 'سرزمین کوهستانی زاگرس، جایی که روستای پالنگان روی دیوارهٔ درّه بالا می‌رود، پله‌پله از سنگ، و بام هر خانه حیاط خانهٔ بالایی است.',

 'Site of Bisotun, where Darius the Great carved his victory into a cliff in three languages, the inscription that unlocked cuneiform for the modern world.':
 'جایگاه بیستون، جایی که داریوش بزرگ پیروزی‌اش را به سه زبان بر صخره کند؛ همان سنگ‌نوشته‌ای که کلید خط میخی را به دست جهان امروز داد.',

 'Oak forests of the Zagros cover its hills, remnants of the woodland that once clothed the whole western spine of Iran.':
 'جنگل‌های بلوط زاگرس تپه‌هایش را پوشانده‌اند، بازماندهٔ جنگلی که روزگاری تمام ستون فقرات غربی ایران را می‌پوشاند.',

 'The cradle of Elam, one of the oldest civilizations on earth, and home to Choqa Zanbil, a ziggurat raised more than three thousand years ago.':
 'گهوارهٔ ایلام، از کهن‌ترین تمدن‌های روی زمین، و خانهٔ چغازنبیل، زیگوراتی که بیش از سه هزار سال پیش برافراشته شد.',

 'Rolling steppe on the old road to Central Asia, long a crossing place for the peoples who moved between Iran and the grasslands beyond.':
 'دشت‌های موّاج بر سر راه کهن آسیای میانه؛ دیرزمانی گذرگاه مردمانی که میان ایران و علفزارهای آن سو در رفت و آمد بودند.',

 'Guarded by the Great Wall of Gorgan, a Sasanian rampart nearly two hundred kilometres long, older and longer than most of Hadrian Wall.':
 'دیوار بزرگ گرگان نگهبانش بوده، بارویی ساسانی به درازای نزدیک دویست کیلومتر، کهن‌تر و بلندتر از بیشتر دیوار هادریان.',

 'Between the Caspian and the Alborz, its forests are among the oldest living woodlands on the planet, surviving the last ice age intact.':
 'میان خزر و البرز، جنگل‌هایش از کهن‌ترین جنگل‌های زندهٔ سیاره‌اند؛ آخرین عصر یخبندان را دست‌نخورده از سر گذرانده‌اند.',

 'Mashhad draws millions of pilgrims a year, and nearby Tus was the home of Ferdowsi, who wrote the Shahnameh and saved the Persian language.':
 'مشهد سالانه میلیون‌ها زائر را به خود می‌کشد، و توسِ نزدیکش خانهٔ فردوسی بود؛ کسی که شاهنامه را سرود و زبان فارسی را نگه داشت.',

 'Its saffron fields produce much of the world supply, gram for gram the most expensive spice on earth, grown from a purple autumn crocus.':
 'زعفران‌زارهایش بخش بزرگی از عرضهٔ جهان را تأمین می‌کنند؛ گرم به گرم گران‌ترین ادویهٔ روی زمین، برآمده از گلی بنفش که در پاییز می‌شکفد.',

 'Where the mountains give way to the Dasht e Kavir, the great salt desert, a surface so hostile that little grows and the crust cracks into plates.':
 'جایی که کوه‌ها جا را به دشت کویر می‌دهند، کویر بزرگ نمک؛ سطحی چنان نامهربان که چیزی در آن نمی‌روید و پوسته‌اش به قطعه‌قطعه می‌شکافد.',

 'A modest town the Qajars chose as their capital, now a metropolis of millions rising against the snow line of the Alborz.':
 'شهرکی ساده که قاجارها پایتختش کردند، و حالا کلان‌شهری میلیونی است که پای خط برف البرز قد کشیده.',

 'Named for the mountain range that walls off the Caspian, the range that in myth holds the peak where the hero Fereydun bound the tyrant Zahhak.':
 'نامش از رشته‌کوهی است که خزر را پشت دیوار نگه می‌دارد؛ همان رشته‌کوهی که در اسطوره قله‌ای را در خود دارد که فریدون، ضحاک را در آن به بند کشید.',

 'A former Safavid capital, and gateway to Alamut, the mountain valley where the fortress of the Assassins once commanded the passes.':
 'روزگاری پایتخت صفوی، و دروازهٔ الموت؛ درّه‌ای کوهستانی که دژ حشاشین از آن بر گذرگاه‌ها فرمان می‌راند.',

 'Home to Soltaniyeh, whose vast turquoise dome is one of the largest brick domes ever raised, and a direct ancestor of the Taj Mahal.':
 'خانهٔ سلطانیه، که گنبد فیروزه‌ای بزرگش از بزرگ‌ترین گنبدهای آجری برافراشته‌شدهٔ جهان است و نیای مستقیم تاج‌محل.',

 'Built on Ecbatana, capital of the Medes, making it one of the oldest continuously inhabited cities in the world.':
 'بر هگمتانه بنا شده، پایتخت مادها؛ و همین آن را از کهن‌ترین شهرهای پیوسته مسکون جهان می‌کند.',

 'Its name simply means central, and it sits at the meeting of the Zagros and the plateau, long a corridor between north and south.':
 'نامش به‌سادگی یعنی میانی، و درست بر محل تلاقی زاگرس و فلات نشسته؛ دیرزمانی راهرویی میان شمال و جنوب.',

 'A centre of religious learning for centuries, its seminaries drawing scholars from across the Islamic world.':
 'قرن‌هاست مرکز آموزش دینی است و حوزه‌هایش طلبه و عالم را از سراسر جهان اسلام به خود کشیده‌اند.',

 'The Lurs of these mountains produced the famed Luristan bronzes, intricate animal figures cast three thousand years ago.':
 'لُرهای این کوه‌ها مفرغ‌های نامدار لرستان را ساختند؛ پیکره‌های ظریف جانوری که سه هزار سال پیش ریخته‌گری شده‌اند.',

 'Its capital was called half the world, and the square Shah Abbas laid out remains among the largest and most beautiful ever built.':
 'مرکزش را نصف جهان خوانده‌اند، و میدانی که شاه عباس طرحش را ریخت هنوز از بزرگ‌ترین و زیباترین میدان‌های ساخته‌شدهٔ جهان است.',

 'Country of the Bakhtiari, whose tribes still drive their herds over the Zagros twice a year, one of the great migrations left on earth.':
 'سرزمین بختیاری، که ایل‌هایش هنوز سالی دو بار گله را از زاگرس می‌گذرانند؛ یکی از آخرین کوچ‌های بزرگ باقی‌مانده روی زمین.',

 'Steep and forested, it holds some of the last wild pistachio and oak stands of the southern Zagros.':
 'پرشیب و جنگلی، و نگهدار آخرین بیشه‌های پستهٔ وحشی و بلوط زاگرس جنوبی.',

 'A Gulf port that traded with India and Africa for centuries, its old town built of coral stone against the heat.':
 'بندری در خلیج فارس که قرن‌ها با هند و آفریقا داد و ستد کرد، و بافت کهنش را از سنگ مرجان در برابر گرما ساخته‌اند.',

 'The heartland. Persia takes its name from here, and here stand Persepolis, Pasargadae, and the tomb of Cyrus, with Shiraz and its poets.':
 'دلِ سرزمین. نام پارس از همین‌جا برخاسته، و تخت جمشید و پاسارگاد و آرامگاه کوروش همین‌جا ایستاده‌اند، کنار شیراز و شاعرانش.',

 'A desert city of mud brick and wind towers, the ancient air conditioning of Iran, and a living centre of Zoroastrian faith.':
 'شهری کویری از خشت و بادگیر، تهویهٔ باستانی ایران، و کانونی زنده برای آیین زرتشتی.',

 'Holds the Lut desert, where satellites recorded the hottest land surface temperature ever measured on earth, over seventy degrees.':
 'کویر لوت را در خود دارد، جایی که ماهواره‌ها داغ‌ترین دمای سطح زمین را ثبت کردند؛ بیش از هفتاد درجه.',

 'Commands the Strait of Hormuz, the narrow gate through which a fifth of the world oil still passes, and the painted hills of Hormuz island.':
 'بر تنگهٔ هرمز مسلط است، همان دروازهٔ باریکی که هنوز یک‌پنجم نفت جهان از آن می‌گذرد، و تپه‌های رنگی جزیرهٔ هرمز.',

 'Where the Shahnameh places the homeland of Rostam, greatest hero of the Persian epic, and where the wind blows for a hundred and twenty days.':
 'جایی که شاهنامه زادبوم رستم را در آن می‌نشاند، بزرگ‌ترین پهلوان حماسهٔ ایران، و جایی که باد صد و بیست روز می‌وزد.',
}

for a, b in HEAD:
    if a not in s:
        print("ABORT: head anchor missing:", a[:50]); raise SystemExit

missing = [k for k in FACTS if ("fact: '" + k + "'") not in s]
if missing:
    print("ABORT:", len(missing), "province fact(s) not matched:")
    for m in missing[:5]:
        print("   -", m[:60])
    raise SystemExit

for a, b in HEAD:
    s = s.replace(a, b, 1)

n = 0
for en, fa in FACTS.items():
    s = s.replace("fact: '" + en + "'", "fact: '" + en + "', factFa: '" + fa + "'", 1)
    n += 1

open(p, "w").write(s)
print("chapter four + provinces translated:", n, "facts")
