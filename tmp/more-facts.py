# -*- coding: utf-8 -*-
# More for the daily pool.
#
# Two registers mixed, because the existing eight are all in the second
# and a pool of only broad claims gets samey:
#
#   * Small and specific. A town, a tree, a tunnel. The kind of thing
#     that sends someone looking it up.
#   * Broad and surprising. Where a word came from, what was first done
#     where, a number worth knowing.
#
# Everything here is checkable. Nothing rounds a claim upward, and where
# a date is disputed the phrasing says so rather than picking a side.

p = "constants/stories.ts"
s = open(p).read()

NEW = """  { kind: 'fact', fa: 'ماسوله', title: 'A town built as a staircase', titleFa: 'شهری که پلکان است', x: 'In Masuleh, the roof of one house is the courtyard of the next. The whole town climbs the mountain that way, and no cars can enter it.', xFa: 'در ماسوله، بام هر خانه حیاط خانهٔ بالایی است. تمام شهر همین‌طور از کوه بالا می‌رود، و ماشین به آن راه ندارد.' },
  { kind: 'fact', fa: 'سرو ابرکوه', title: 'Older than any building', titleFa: 'کهن‌تر از هر بنایی', x: 'The cypress of Abarkuh has been standing for something like four thousand years. It was already ancient when Persepolis was new.', xFa: 'سرو ابرکوه چیزی حدود چهار هزار سال است که ایستاده. وقتی تخت جمشید تازه ساخته شده بود، این درخت پیر بود.' },
  { kind: 'fact', fa: 'کاریز کیش', title: 'A tunnel through coral', titleFa: 'تونلی در دل مرجان', x: 'The kariz beneath Kish was cut through fossilised coral around two and a half thousand years ago. You can walk it, and the shells are still in the walls.', xFa: 'کاریز زیر کیش حدود دو هزار و پانصد سال پیش در دل مرجان سنگ‌شده کنده شد. می‌شود در آن قدم زد، و صدف‌ها هنوز در دیواره‌اند.' },
  { kind: 'fact', fa: 'یزد', title: 'A city of raw earth', titleFa: 'شهری از خاک', x: 'Yazd is one of the oldest continuously inhabited cities on earth, and much of it is built from mud brick that keeps the desert heat out.', xFa: 'یزد یکی از کهن‌ترین شهرهای جهان است که پیوسته مسکونی مانده، و بخش بزرگی از آن از خشت ساخته شده که گرمای کویر را بیرون نگه می‌دارد.' },
  { kind: 'fact', fa: 'شطرنج', title: 'How chess travelled', titleFa: 'شطرنج چطور سفر کرد', x: 'Chess reached Persia from India, took the name shatranj, and travelled onward to Europe from there. Checkmate comes from shah mat, the king is helpless.', xFa: 'شطرنج از هند به ایران رسید، نامش شترنج شد، و از همان‌جا به اروپا رفت. واژهٔ checkmate از «شاه مات» می‌آید.' },
  { kind: 'fact', fa: 'آسیاب بادی', title: 'The first windmills', titleFa: 'نخستین آسیاب‌های بادی', x: 'The earliest known windmills turned in eastern Iran more than a thousand years ago. Some at Nashtifan still work.', xFa: 'نخستین آسیاب‌های بادی شناخته‌شده بیش از هزار سال پیش در شرق ایران می‌چرخیدند. برخی از آن‌ها در نشتیفان هنوز کار می‌کنند.' },
  { kind: 'fact', fa: 'یخچال', title: 'Ice in the desert', titleFa: 'یخ در کویر', x: 'Persian yakhchals made ice in the desert and kept it through summer, using nothing but shade, evaporation and a very thick wall.', xFa: 'یخچال‌های ایرانی در کویر یخ می‌ساختند و تا تابستان نگه می‌داشتند؛ فقط با سایه، تبخیر و دیواری بسیار ضخیم.' },
  { kind: 'fact', fa: 'زعفران', title: 'Seventy thousand flowers', titleFa: 'هفتاد هزار گل', x: 'It takes roughly seventy thousand crocus flowers to make a single pound of saffron, and every stigma is pulled by hand.', xFa: 'برای یک پوند زعفران چیزی حدود هفتاد هزار گل لازم است، و هر کلاله را با دست می‌چینند.' },
  { kind: 'fact', fa: 'شیراز', title: 'Two poets, one city', titleFa: 'دو شاعر، یک شهر', x: 'Hafez and Saadi are both buried in Shiraz, within sight of each other. People still go to read at both.', xFa: 'حافظ و سعدی هر دو در شیراز آرمیده‌اند، در چشم‌انداز یکدیگر. مردم هنوز بر سر هر دو مزار می‌روند و می‌خوانند.' },
  { kind: 'fact', fa: 'دماوند', title: 'The mountain in the stories', titleFa: 'کوهی که در قصه‌هاست', x: 'Damavand is the highest peak in the Middle East, and in the Shahnameh it is where the tyrant Zahhak is chained inside the mountain.', xFa: 'دماوند بلندترین قلهٔ خاورمیانه است، و در شاهنامه همان جایی است که ضحاک در دلش به بند کشیده شد.' },
  { kind: 'fact', fa: 'گربهٔ ایرانی', title: 'The cat is from here', titleFa: 'گربه از همین‌جاست', x: 'The Persian cat takes its name from where it came from, and it reached Europe in the seventeenth century as a gift worth giving.', xFa: 'گربهٔ ایرانی نامش را از جایی که از آن آمده گرفته، و در قرن هفدهم به‌عنوان هدیه‌ای درخور به اروپا رسید.' },
  { kind: 'fact', fa: 'تخت جمشید', title: 'Paid, not enslaved', titleFa: 'مزدبگیر، نه برده', x: 'Tablets found at Persepolis record wages paid to the workers who built it, including women, and including maternity leave.', xFa: 'لوح‌های یافته‌شده در تخت جمشید دستمزد کارگرانی را ثبت کرده‌اند که آن را ساختند؛ از جمله زنان، و از جمله مرخصی زایمان.' },
  { kind: 'fact', fa: 'نوروز', title: 'Counted to the second', titleFa: 'ثانیه به ثانیه', x: 'Nowruz begins at the exact moment of the spring equinox, which is why the time changes every year and families wait for it.', xFa: 'نوروز دقیقاً در لحظهٔ اعتدال بهاری آغاز می‌شود؛ برای همین ساعتش هر سال فرق می‌کند و خانواده‌ها منتظرش می‌نشینند.' },
  { kind: 'fact', fa: 'خط', title: 'Three scripts, one language', titleFa: 'سه خط، یک زبان', x: 'Persian has been written in cuneiform, then in Pahlavi, and now in an adapted Arabic script. The language survived all three.', xFa: 'فارسی را به خط میخی نوشته‌اند، بعد به پهلوی، و حالا به خطی برگرفته از عربی. زبان از هر سه جان به در برد.' },
  { kind: 'fact', fa: 'چهار حرف', title: 'Four letters added', titleFa: 'چهار حرف افزوده', x: 'When Persian took the Arabic script it added four letters for sounds Arabic does not have: پ چ ژ گ.', xFa: 'وقتی فارسی خط عربی را گرفت، چهار حرف برای صداهایی افزود که در عربی نبود: پ چ ژ گ.' },
  { kind: 'fact', fa: 'لیمو', title: 'Words that travelled', titleFa: 'واژه‌هایی که سفر کردند', x: 'Lemon, orange, spinach, jasmine, khaki, bazaar, caravan and pyjama all reached English from Persian, most of them by a long road.', xFa: 'lemon و orange و spinach و jasmine و khaki و bazaar و caravan و pyjama همه از فارسی به انگلیسی رسیده‌اند، بیشترشان از راهی دراز.' },
  { kind: 'fact', fa: 'تخته‌نرد', title: 'Older than the rules', titleFa: 'کهن‌تر از قاعده‌هایش', x: 'Backgammon in something like its present form was played in Persia well over a thousand years ago, and the board has barely changed.', xFa: 'تخته‌نرد، کمابیش به همین شکل امروزی، بیش از هزار سال پیش در ایران بازی می‌شد، و صفحه‌اش تقریباً تغییری نکرده.' },
  { kind: 'fact', fa: 'کویر لوت', title: 'The hottest ground measured', titleFa: 'داغ‌ترین زمین اندازه‌گیری‌شده', x: 'The Lut desert has recorded some of the highest land surface temperatures ever measured from orbit, above seventy degrees.', xFa: 'کویر لوت یکی از بالاترین دماهای سطح زمین را که تا کنون از مدار اندازه گرفته شده ثبت کرده؛ بالای هفتاد درجه.' },
  { kind: 'fact', fa: 'گل محمدی', title: 'A month of roses', titleFa: 'یک ماه، پر از گل', x: 'Every spring Kashan spends weeks distilling rosewater, and the whole town smells of it. The season has its own name: golabgiri.', xFa: 'هر بهار کاشان هفته‌ها گلاب می‌گیرد و تمام شهر بوی گل می‌دهد. این فصل نام خودش را دارد: گلاب‌گیری.' },
  { kind: 'fact', fa: 'شاهنامه', title: 'Fifty thousand couplets', titleFa: 'پنجاه هزار بیت', x: 'The Shahnameh runs to around fifty thousand couplets, written by one man over roughly thirty years.', xFa: 'شاهنامه نزدیک پنجاه هزار بیت است، نوشتهٔ یک نفر در حدود سی سال.' },
  { kind: 'fact', fa: 'تبریز', title: 'A bazaar with a roof', titleFa: 'بازاری زیر یک سقف', x: 'The covered bazaar of Tabriz is one of the largest roofed markets in the world, and it has been trading for centuries.', xFa: 'بازار سرپوشیدهٔ تبریز یکی از بزرگ‌ترین بازارهای سقف‌دار جهان است، و قرن‌هاست که در آن داد و ستد می‌شود.' },
  { kind: 'fact', fa: 'قهوه‌خانه', title: 'Tea, in a coffee house', titleFa: 'چای، در قهوه‌خانه', x: 'Iranian tea houses are still called qahvekhaneh, coffee houses, from the days before tea arrived and took over entirely.', xFa: 'چای‌خانه‌های ایران هنوز قهوه‌خانه نامیده می‌شوند؛ از روزگاری مانده که هنوز چای نیامده بود و همه‌چیز را نگرفته بود.' },
  { kind: 'fact', fa: 'ورزش زورخانه', title: 'A gym with a poet', titleFa: 'باشگاهی با شاعر', x: 'In the zurkhaneh, men train to the beat of a drum while someone recites Ferdowsi over the top of it.', xFa: 'در زورخانه، مردان با ضرب می‌ورزند و کسی بالای سرشان شاهنامه می‌خواند.' },
  { kind: 'fact', fa: 'قنات', title: 'Still running', titleFa: 'هنوز جاری', x: 'Some qanats dug two and a half thousand years ago still carry water today, maintained by hand across a hundred generations.', xFa: 'برخی قنات‌هایی که دو هزار و پانصد سال پیش کنده شده‌اند هنوز آب می‌آورند؛ صد نسل با دست نگهشان داشته‌اند.' },
"""

anchor = "const ALL_DAILY: Daily[] = [...DAILY_POOL, ...DYK];"
i = s.rfind("];", 0, s.find(anchor))
if i == -1 or "A town built as a staircase" in s:
    print("already added or anchor not found")
else:
    s = s[:i] + NEW + s[i:]
    open(p, "w").write(s)
    print("facts added:", NEW.count("kind: 'fact'"))
