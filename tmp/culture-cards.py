# -*- coding: utf-8 -*-
# The nine typical-Persian cards. These are jokes, and a joke rendered
# literally stops being one. Each front is written as a Persian would
# actually say it; آشناباز, دورهمی, اتاق مهمان, قابلمه‌ای که باید برگردد.

p = "constants/culture.ts"
s = open(p).read()

C = [
 ("Every Persian knows someone who knows someone.",
  'هر ایرانی یکی را می‌شناسد که یکی دیگر را می‌شناسد.',
  "Need a surgeon, a visa, a plumber, a spare part they stopped making in 1994? Someone will make a phone call. It is called ashnabazi, and it grew in a place where official channels often did not work, so people built a second network out of relatives and favours. It has never stopped running.",
  'جراح می‌خواهی؟ ویزا؟ لوله‌کش؟ قطعه‌ای که تولیدش از سال ۷۳ متوقف شده؟ یکی یک زنگ می‌زند و درست می‌شود. اسمش آشنابازی است، و در جایی رشد کرد که راه‌های رسمی اغلب کار نمی‌کردند؛ پس مردم یک شبکهٔ دوم از فامیل و رفاقت ساختند. آن شبکه هیچ‌وقت از کار نیفتاده.'),

 ("Nobody has ever successfully paid a bill at a Persian restaurant.",
  'تا حالا هیچ‌کس نتوانسته در یک رستوران ایرانی صورت‌حساب را حساب کند.',
  "The fight is physical. Two grown men wrestling over a card machine while the waiter waits. Some people bribe the waiter in advance and are resented for it anyway. This is taarof in its most extreme form: paying is a way of establishing that you are the more generous person, so it must be contested.",
  'دعوا واقعاً فیزیکی است. دو مرد بالغ سر دستگاه کارت‌خوان با هم کشتی می‌گیرند و گارسون هم ایستاده تماشا می‌کند. بعضی‌ها از قبل یواشکی با گارسون هماهنگ می‌کنند و باز هم ازشان دلخور می‌شوند. این تعارف است در افراطی‌ترین شکلش: پرداختن یعنی اثبات اینکه تو بخشنده‌تری، پس حتماً باید سرش جنگید.'),

 ("The Persian goodbye takes forty minutes.",
  'خداحافظی ایرانی چهل دقیقه طول می‌کشد.',
  "You stand up. You are told to sit. You reach the hallway and a new conversation starts. You reach the door and someone remembers something. You reach the car and food is brought out. The goodbye is not the end of the visit. It is its own event, and rushing it says you wanted to leave.",
  'بلند می‌شوی. می‌گویند بنشین. به راهرو می‌رسی و یک گفت‌وگوی تازه شروع می‌شود. به در می‌رسی و یکی یادش می‌افتد چیزی بگوید. به ماشین می‌رسی و ظرف غذا را می‌آورند. خداحافظی پایان مهمانی نیست؛ خودش یک برنامهٔ جداگانه است، و اگر عجله کنی یعنی از اول دلت می‌خواست بروی.'),

 ("Your mother thinks you are too thin.",
  'مادرت فکر می‌کند لاغر شده‌ای.',
  "You have always been too thin. You will be too thin at every weight you ever are. This is not about your body. Feeding you is how she says the thing she was never taught to say out loud, and as long as you are too thin, there is more of it to say.",
  'همیشه لاغر بوده‌ای. در هر وزنی که در عمرت داشته باشی، لاغری. ماجرا اصلاً سرِ بدن تو نیست. غذا دادن به تو، همان راهی است که او برای گفتنِ حرفی دارد که هیچ‌وقت یادش ندادند بلند بگوید؛ و تا وقتی که لاغری، هنوز حرف برای گفتن مانده.'),

 ("Have you eaten is a greeting, not a question.",
  '«غذا خوردی؟» یک سلام است، نه یک سؤال.',
  "It means hello. It also means are you all right, and are you being looked after, and I am checking. In a culture where you do not ask someone directly how they are doing, you ask about the one thing that would show it.",
  'یعنی سلام. در عین حال یعنی حالت خوب است؟ و یعنی کسی هوایت را دارد؟ و یعنی من دارم چک می‌کنم. در فرهنگی که مستقیم از کسی نمی‌پرسند حالت چطور است، سراغ همان یک چیزی می‌روند که جوابش را لو می‌دهد.'),

 ("There is a room in the house nobody is allowed to sit in.",
  'یک اتاق در خانه هست که اجازه نداری در آن بنشینی.',
  "The good room, kept immaculate for guests who might arrive. Sometimes with the furniture still covered. It is not vanity. It is readiness. The house is permanently prepared for someone to walk in, because someone might, and they must find it perfect.",
  'اتاق مهمان، که بی‌عیب و نقص نگه داشته می‌شود برای مهمانی که شاید بیاید. گاهی حتی روکش مبل‌ها را هم برنداشته‌اند. این خودنمایی نیست؛ آمادگی است. خانه همیشه آمادهٔ این است که کسی از در وارد شود، چون ممکن است بشود، و آن کس باید همه‌چیز را بی‌نقص ببیند.'),

 ("You will leave with food you did not ask for.",
  'با غذایی از خانه بیرون می‌آیی که نخواسته بودی.',
  "In a container that must be returned, which means you must come back. It is a very old trick and it is not remotely accidental. Nobody has ever returned a Persian container empty, either, so the whole thing loops forever, which is the design.",
  'در ظرفی که باید برگردانده شود، یعنی باید دوباره بیایی. این ترفند خیلی قدیمی است و ذره‌ای هم تصادفی نیست. ضمناً تا حالا هیچ‌کس ظرف یک ایرانی را خالی پس نداده، پس این چرخه تا ابد ادامه دارد؛ که خودش دقیقاً همان نقشه است.'),

 ("Shoes come off. This is not negotiable.",
  'کفش‌ها در می‌آید. این یکی جای بحث ندارد.',
  "Not a preference, not a house rule, not a request. It happens at the door without anyone saying anything. Persians sit on floors, eat on floors, sleep on floors. The floor is not the ground, it is furniture, and you do not stand on furniture in your shoes.",
  'نه سلیقه است، نه قانون خانه، و نه درخواست. همان دم در اتفاق می‌افتد، بی‌آنکه کسی چیزی بگوید. ایرانی‌ها روی زمین می‌نشینند، روی زمین غذا می‌خورند، روی زمین می‌خوابند. کف خانه «زمین» نیست، مبلمان است؛ و آدم با کفش روی مبل نمی‌ایستد.'),

 ("Your cousin is a doctor. You will hear about it.",
  'پسرخاله‌ات دکتر شده. خبرش را به تو خواهند داد.',
  "Everyone has the cousin. The comparison is relentless and it is not really about you. It comes from a generation that lost a great deal and rebuilt from nothing, for whom a child professional standing was the visible proof it was worth it. It lands badly. It was meant as love.",
  'همه یک پسرخاله دارند. این مقایسه بی‌امان است و در واقع اصلاً به تو ربطی ندارد. از نسلی می‌آید که خیلی چیزها را از دست داد و از صفر دوباره ساخت، و برایش جایگاه شغلی فرزندش تنها مدرک قابل دیدنِ این بود که ارزشش را داشت. بد به دل می‌نشیند. اما از سر محبت گفته شده.'),
]

applied, skipped = 0, []
for enF, faF, enB, faB in C:
    a = "front: '" + enF + "',"
    if a in s:
        s = s.replace(a, a + " frontFa: '" + faF + "',", 1); applied += 1
    else:
        skipped.append("F: " + enF[:40])
    b = "back: '" + enB + "'"
    if b in s:
        s = s.replace(b, b + ", backFa: '" + faB + "'", 1); applied += 1
    else:
        skipped.append("B: " + enF[:40])

open(p, "w").write(s)
print("applied", applied, "of", len(C) * 2)
for k in skipped: print("   skipped:", k)
