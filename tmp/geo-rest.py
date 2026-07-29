# -*- coding: utf-8 -*-
# The Landscapes chapter heading, six cities, six places.

p = "constants/geography.ts"
s = open(p).read()

if "titleFa: 'چشم‌اندازها'" in s:
    print("ABORT: already applied"); raise SystemExit

HEAD = ("""    title: 'The Landscapes',
    nav: 'Landscapes',
    subtitle: 'WHAT THE LAND LOOKS LIKE',""",
  """    title: 'The Landscapes',
    titleFa: 'چشم‌اندازها',
    nav: 'Landscapes',
    navFa: 'چشم‌اندازها',
    subtitle: 'WHAT THE LAND LOOKS LIKE',
    subtitleFa: 'سرزمین چه شکلی است',""")

CITIES = {
 'Capital, and one of the largest cities in western Asia. A modest town the Qajars chose, now millions strong against the snow line of the Alborz.':
 'پایتخت، و یکی از بزرگ‌ترین شهرهای غرب آسیا. شهرکی ساده که قاجارها انتخابش کردند، و حالا میلیون‌ها نفر پای خط برف البرز.',

 'The great pilgrimage city of the east, drawing millions each year, and the largest city of Khorasan.':
 'شهر بزرگ زیارتی شرق، که سالانه میلیون‌ها نفر را به خود می‌کشد، و بزرگ‌ترین شهر خراسان.',

 'Once called half the world. Shah Abbas laid out a square here that remains among the most beautiful ever built.':
 'روزگاری نصف جهان خوانده شد. شاه عباس اینجا میدانی طرح ریخت که هنوز از زیباترین میدان‌های ساخته‌شدهٔ جهان است.',

 'City of poets, roses, and gardens. Hafez and Saadi are buried here, and Karim Khan made it his capital.':
 'شهر شاعران و گل و باغ. حافظ و سعدی اینجا خفته‌اند، و کریم‌خان پایتختش کرد.',

 'The north western gate, holding one of the oldest and largest covered bazaars on earth.':
 'دروازهٔ شمال غرب، با یکی از کهن‌ترین و بزرگ‌ترین بازارهای سرپوشیدهٔ جهان.',

 'A desert city of mud brick and wind towers, and a living centre of Zoroastrian faith.':
 'شهری کویری از خشت و بادگیر، و کانونی زنده برای آیین زرتشتی.',
}

PLACES = {
 'A modest town in Khorasan, and the home of {{ferdowsi|Ferdowsi}}. For thirty years he sat here and wrote the Shahnameh, and in doing so saved the Persian language. No city of millions has done more for Iran than this one town did through one man.':
 'شهرکی ساده در خراسان، و خانهٔ {{ferdowsi|فردوسی}}. سی سال اینجا نشست و شاهنامه را سرود، و با همین کار زبان فارسی را نگه داشت. هیچ شهر میلیونی برای ایران آن نکرد که این شهرک با یک نفر کرد.',

 'A desert town that turned water and roses into an art. Its rosewater is distilled each spring in a ritual centuries old, its carpets are famous, and its merchant houses hide vast cool courtyards behind plain mud walls.':
 'شهری کویری که آب و گل را به هنر بدل کرد. گلابش هر بهار در آیینی چند صد ساله گرفته می‌شود، فرش‌هایش نامدارند، و خانه‌های تاجرانش پشت دیوارهای ساده خشتی، حیاط‌های بزرگ و خنک پنهان کرده‌اند.',

 'Here, under the Ilkhanids, an observatory was built that mapped the heavens with an accuracy that reached Europe and helped reshape how the world understood the sky.':
 'اینجا در روزگار ایلخانان رصدخانه‌ای ساخته شد که آسمان را با دقتی نقشه کرد که تا اروپا رسید و در دگرگونی فهم جهان از آسمان سهم داشت.',

 'A village in the Gilan mountains built so steeply that the roof of one house is the courtyard of the house above, and the whole settlement is a staircase. Cars cannot enter.':
 'روستایی در کوه‌های گیلان، چنان پرشیب ساخته شده که بام هر خانه حیاط خانهٔ بالایی است و کل آبادی یک پلکان است. ماشین نمی‌تواند واردش شود.',

 'A citadel of mud brick in the Kerman desert, once the largest such structure on earth, and the country around it gives the sweetest dates in Iran.':
 'ارگی خشتی در کویر کرمان، که روزگاری بزرگ‌ترین بنای خشتی روی زمین بود، و پیرامونش شیرین‌ترین خرمای ایران را می‌دهد.',

 'Home of {{khayyam|Omar Khayyam}}, poet and mathematician both, and the source of the turquoise that coloured the domes and the jewellery of half the world.':
 'خانهٔ {{khayyam|عمر خیام}}، هم شاعر و هم ریاضی‌دان، و سرچشمهٔ فیروزه‌ای که گنبدها و جواهر نیمی از جهان را رنگ زد.',
}

if HEAD[0] not in s:
    print("ABORT: Landscapes heading not matched"); raise SystemExit

missing = [k for k in list(CITIES) if ("blurb: '" + k + "'") not in s]
missing += [k for k in list(PLACES) if ("text: '" + k + "'") not in s]
if missing:
    print("ABORT:", len(missing), "not matched:")
    for m in missing[:4]:
        print("   -", m[:60])
    raise SystemExit

s = s.replace(HEAD[0], HEAD[1], 1)

n = 0
for en, fa in CITIES.items():
    s = s.replace("blurb: '" + en + "'", "blurb: '" + en + "', blurbFa: '" + fa + "'", 1)
    n += 1
for en, fa in PLACES.items():
    s = s.replace("text: '" + en + "'", "text: '" + en + "', textFa: '" + fa + "'", 1)
    n += 1

open(p, "w").write(s)
print("landscapes heading + " + str(n) + " entries translated")
