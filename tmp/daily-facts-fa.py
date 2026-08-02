# -*- coding: utf-8 -*-
# The daily facts, translated. These rotate on the home page, so they are
# among the most-read text in the app.

p = "constants/daily-facts.ts"
s = open(p).read()

if "textFa" in s:
    print("ABORT: already applied"); raise SystemExit

# schema
s = s.replace("export type DailyFact = { text: string; word: string };",
              "export type DailyFact = { text: string; word: string; textFa?: string };")

FA = {
 'The pomegranate is one of the oldest symbols in Persian art and mythology — a sign of abundance, life, and eternity.':
 'انار از کهن‌ترین نمادهای هنر و اسطورهٔ ایرانی است؛ نشانهٔ فراوانی، زندگی و جاودانگی.',

 'Nowruz, the Persian New Year, has been celebrated at the spring equinox for over three thousand years.':
 'نوروز، سال نوی ایرانی، بیش از سه هزار سال است که در لحظهٔ اعتدال بهاری جشن گرفته می‌شود.',

 'The English word \\u201Cparadise\\u201D traces back to an ancient Persian word for a walled garden.':
 'واژهٔ انگلیسی «paradise» به واژه‌ای کهن در زبان ایرانی بازمی‌گردد که به معنای باغی دیواردار بود: پردیس.',

 'On Yalda, the longest night of the year, families gather over poetry and pomegranates to welcome the return of the light.':
 'در شب یلدا، درازترین شب سال، خانواده‌ها گرد شعر و انار جمع می‌شوند تا بازگشت روشنایی را خوشامد بگویند.',

 'Ferdowsi spent about thirty years writing the Shahnameh — nearly 50,000 couplets that helped keep the Persian language alive.':
 'فردوسی نزدیک سی سال بر شاهنامه رنج برد؛ حدود ۵۰٬۰۰۰ بیت که زبان فارسی را زنده نگاه داشت.',

 'The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.':
 'فرش پازیریک، با حدود ۲٬۵۰۰ سال قدمت، کهن‌ترین فرش گره‌بافتهٔ شناخته‌شدهٔ جهان است که به جا مانده.',

 'Long before electricity, Persian windcatchers — tall towers called b\\u00e2dgir — cooled homes by guiding the breeze downward.':
 'مدت‌ها پیش از برق، بادگیرهای ایرانی، همان برج‌های بلند، با هدایت نسیم به پایین خانه‌ها را خنک می‌کردند.',

 'Qanats, gently sloping underground channels, carried water across the desert for thousands of years.':
 'قنات‌ها، کاریزهای زیرزمینی با شیبی ملایم، هزاران سال آب را از دل کویر گذراندند.',

 'Iran grows the vast majority of the world\\u2019s saffron, the crimson spice worth more than its weight in gold.':
 'بخش بزرگی از زعفران جهان در ایران کشت می‌شود؛ ادویه‌ای سرخ که هم‌وزن خود از طلا گران‌بهاتر است.',

 'The 13th-century Persian poet Rumi remains one of the best-selling poets in the world today.':
 'مولانا، شاعر ایرانی سدهٔ هفتم هجری، هنوز از پرفروش‌ترین شاعران جهان امروز است.',

 'Many Persian homes keep a book of Hafez to open at random for guidance — a cherished tradition called f\\u00e2l-e H\\u00e2fez.':
 'در بسیاری از خانه‌های ایرانی دیوان حافظ هست تا برای راهنمایی تصادفی گشوده شود؛ آیینی دوست‌داشتنی به نام فال حافظ.',

 'The Cyrus Cylinder, from the reign of Cyrus the Great, is often described as one of the earliest declarations of tolerance.':
 'استوانهٔ کوروش، از روزگار کوروش بزرگ، را اغلب یکی از نخستین بیانیه‌های بردباری خوانده‌اند.',

 'Around 550 BCE, Cyrus the Great founded the Achaemenid Empire \\u2014 the largest the ancient world had yet seen, reaching from the Aegean Sea to the Indus Valley. At its height it is thought to have ruled a striking share of the world\\u2019s people.':
 'حدود ۵۵۰ پیش از میلاد، کوروش بزرگ امپراتوری هخامنشی را بنیان نهاد؛ بزرگ‌ترین امپراتوری‌ای که جهان باستان تا آن روز دیده بود، از دریای اژه تا درّهٔ سند. در اوج خود، گمان می‌رود بر سهم چشمگیری از مردم جهان فرمان می‌رانده است.',

 'Built by Darius I around 518 BCE, Persepolis was the ceremonial capital of the Achaemenid Empire. Its grand stairways and reliefs welcomed delegations from across the empire \\u2014 a record in stone of many nations united under one rule.':
 'تخت جمشید که داریوش یکم حدود ۵۱۸ پیش از میلاد بنا کرد، پایتخت آیینی هخامنشیان بود. پلکان‌های باشکوه و نقش‌برجسته‌هایش پذیرای نمایندگانی از سراسر امپراتوری بود؛ سندی در سنگ از ملت‌های بسیار که زیر یک فرمان گرد آمده بودند.',

 'Under Cyrus the Great and Darius I, the Persian Empire built the Royal Road \\u2014 a vast relay network of stations and couriers. Messages travelled across the empire with remarkable speed, making it the ancient world\\u2019s first true postal system.':
 'در روزگار کوروش بزرگ و داریوش یکم، امپراتوری ایران راه شاهی را ساخت؛ شبکه‌ای گسترده از چاپارخانه‌ها و پیک‌ها. پیام‌ها با سرعتی شگفت‌آور سراسر امپراتوری را می‌پیمودند، و این نخستین نظام پستی راستین جهان باستان بود.',

 'Completed around 1010 CE by Ferdowsi, the Shahnameh preserved Iran\\u2019s myths, kings, and heroes in more than 50,000 verses \\u2014 giving the Persian world one of history\\u2019s greatest literary epics centuries before Shakespeare.':
 'شاهنامه که فردوسی حدود سال ۱۰۱۰ میلادی به پایان رساند، اسطوره‌ها و شاهان و پهلوانان ایران را در بیش از ۵۰٬۰۰۰ بیت نگاه داشت؛ و قرن‌ها پیش از شکسپیر، یکی از بزرگ‌ترین حماسه‌های ادبی تاریخ را به جهان فارسی بخشید.',
}

applied, skipped = 0, []
for en, fa in FA.items():
    en = en.replace("\\u201C", "\u201c").replace("\\u201D", "\u201d")
    en = en.replace("\\u2019", "\u2019").replace("\\u2014", "\u2014").replace("\\u00e2", "\u00e2")
    anchor = "text: '" + en + "'"
    if anchor in s:
        s = s.replace(anchor, anchor + ", textFa: '" + fa + "'", 1)
        applied += 1
    else:
        skipped.append(en[:60])

open(p, "w").write(s)
print("applied", applied, "of", len(FA))
for k in skipped:
    print("   skipped:", k)
