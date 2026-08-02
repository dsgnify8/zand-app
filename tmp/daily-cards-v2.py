# -*- coding: utf-8 -*-
# The daily cards. Entries wrap across lines, so title and x are matched
# separately rather than as one adjacent anchor.

p = "constants/stories.ts"
s = open(p).read()

# extend the type properly
if "titleFa" not in s:
    old = """export type Daily = {
  kind: DailyKind;
  fa?: string;
  tr?: string;
  title: string;
  x: string;
  route?: string;   // present = flips and links out
  cta?: string;
};"""
    new = """export type Daily = {
  kind: DailyKind;
  fa?: string;
  tr?: string;
  title: string;
  titleFa?: string;
  x: string;
  xFa?: string;
  route?: string;   // present = flips and links out
  cta?: string;
};"""
    if old in s:
        s = s.replace(old, new, 1)
        print("type extended")
    else:
        print("ABORT: type not matched"); raise SystemExit

TITLES = {
 'Your heart has gone tight': 'دلت تنگ شده',
 'Do not grieve': 'غم مخور',
 'The calendar you are not using is better': 'تقویمی که به کار نمی‌بری، دقیق‌تر است',
 'Offer it three times': 'سه بار تعارف کن',
 'Paradise was a garden with a wall around it': 'بهشت، باغی بود با دیواری گرداگردش',
 'The best thing is an accident': 'بهترین قسمت، اتفاقی است',
 'You are the reed': 'تو همان نی هستی',
 'A poem got a king onto a horse without his boots': 'شعری شاهی را بی‌چکمه بر اسب نشاند',
 'May I be sacrificed for you': 'قربانت بروم',
 'Iran has been calling itself Iran the whole time': 'ایران، همیشه خودش را ایران خوانده است',
 'The oldest symbol': 'کهن‌ترین نماد',
 'Paradise was a garden': 'بهشت، یک باغ بود',
 'The oldest carpet': 'کهن‌ترین فرش',
 'Air conditioning, ancient': 'تهویهٔ مطبوع، از روزگار باستان',
 'Water across the desert': 'آب، از دل کویر',
 'Worth more than gold': 'گران‌بهاتر از طلا',
 'The first declaration': 'نخستین بیانیه',
 'The largest yet seen': 'بزرگ‌ترین که تا آن روز دیده شده بود',
 'A record in stone': 'سندی در سنگ',
 'The first postal system': 'نخستین نظام پستی',
}

BODIES = {
 'It is how Persian says I miss you. Not a report of an absence, a symptom happening in your chest right now.':
 'این است شیوهٔ فارسی برای گفتن دلتنگی. خبر دادن از یک نبود نیست؛ حالی است که همین حالا در سینه‌ات می‌گذرد.',

 'Gham makhor. Hafez wrote it six hundred years ago and Iranians have been saying it to each other ever since. It is not advice. It is a hand on the shoulder.':
 'حافظ ششصد سال پیش نوشتش و ایرانیان از آن روز تا امروز به هم می‌گویندش. نصیحت نیست؛ دستی است که بر شانه می‌نشیند.',

 'Khayyam measured the year to six decimal places in 1079 with brass instruments. His calendar drifts a day every five thousand years. The Gregorian drifts one every three thousand.':
 'خیام در سال ۱۰۷۹ با ابزارهای برنجی طول سال را تا شش رقم اعشار اندازه گرفت. تقویم او هر پنج هزار سال یک روز خطا دارد؛ تقویم میلادی هر سه هزار سال یک روز.',

 'Nothing is real until it has been offered three times. Accept on the first and everyone knows you were waiting for it.':
 'هیچ‌چیز جدی نیست مگر سه بار تعارف شده باشد. بار اول قبول کنی، همه می‌فهمند منتظرش بوده‌ای.',

 'Pairidaeza just meant an enclosed space. The Greeks borrowed the word, scripture borrowed it, and an ordinary Persian garden became the name for heaven.':
 'پیریدَئِزَه فقط یعنی جایی که دورش را بسته باشند. یونانیان این واژه را وام گرفتند، کتاب‌های مقدس هم، و باغی ساده و ایرانی نام بهشت شد.',

 'The golden crust at the bottom of the rice pot. Guests get it first. Then the family goes to war over what is left.':
 'همان پوستهٔ طلایی ته دیگ. اول به مهمان می‌رسد. بعد خانواده بر سر باقی‌اش به جان هم می‌افتد.',

 'Rumi opens the Masnavi with a flute crying for the reed bed it was cut from. Twenty six thousand couplets follow, and they are all about that.':
 'مولانا مثنوی را با نالهٔ نی‌ای آغاز می‌کند که از نیستان بریده شده است. بیست و شش هزار بیت پس از آن می‌آید، و همه‌اش دربارهٔ همان است.',

 'Rudaki sang about the smell of a stream in Bukhara. The king had refused to go home for four years. He rode out barefoot.':
 'رودکی از بوی جوی مولیان خواند. شاه چهار سال بود که به خانه بازنمی‌گشت. پابرهنه سوار شد و رفت.',

 'Said constantly, to almost anyone, meaning roughly thanks. Persian does not do small affection.':
 'مدام گفته می‌شود، به تقریباً هر کسی، و معنایش چیزی نزدیک به سپاسگزارم است. فارسی محبت را کوچک بیان نمی‌کند.',

 'From Aryanam, the noble ones. Persia was the outside name, from Pars, one province. The country never changed what it calls itself.':
 'از آریانام، یعنی نجیبان. پرشیا نامی بود که بیرونی‌ها گذاشته بودند، برگرفته از پارس، تنها یکی از استان‌ها. این کشور هرگز نامی را که بر خود می‌گذارد عوض نکرد.',

 'The pomegranate is one of the oldest symbols in Persian art and myth, a sign of abundance, life, and eternity.':
 'انار از کهن‌ترین نمادهای هنر و اسطورهٔ ایرانی است؛ نشانهٔ فراوانی، زندگی و جاودانگی.',

 'The English word paradise traces back to an ancient Persian word for a walled garden.':
 'واژهٔ انگلیسی paradise به واژه‌ای کهن در زبان ایرانی بازمی‌گردد که معنایش باغی دیواردار بود: پردیس.',

 'The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.':
 'فرش پازیریک، با حدود ۲٬۵۰۰ سال قدمت، کهن‌ترین فرش گره‌بافتهٔ شناخته‌شدهٔ جهان است که به جا مانده.',

 'Long before electricity, Persian windcatchers, tall towers called badgir, cooled homes by guiding the breeze downward.':
 'مدت‌ها پیش از برق، بادگیرهای ایرانی، همان برج‌های بلند، با هدایت نسیم به پایین خانه‌ها را خنک می‌کردند.',

 'Qanats, gently sloping underground channels, carried water across the desert for thousands of years.':
 'قنات‌ها، کاریزهای زیرزمینی با شیبی ملایم، هزاران سال آب را از دل کویر گذراندند.',

 'Iran grows the vast majority of the world saffron, the crimson spice worth more than its weight in gold.':
 'بخش بزرگی از زعفران جهان در ایران کشت می‌شود؛ ادویه‌ای سرخ که هم‌وزن خود از طلا گران‌بهاتر است.',

 'The Cyrus Cylinder, from the reign of Cyrus the Great, is often described as one of the earliest declarations of tolerance.':
 'استوانهٔ کوروش، از روزگار کوروش بزرگ، را اغلب یکی از نخستین بیانیه‌های بردباری خوانده‌اند.',

 'Around 550 BCE, Cyrus founded the Achaemenid Empire, the largest the ancient world had yet seen, reaching from the Aegean to the Indus.':
 'حدود ۵۵۰ پیش از میلاد، کوروش امپراتوری هخامنشی را بنیان نهاد؛ بزرگ‌ترین امپراتوری‌ای که جهان باستان تا آن روز دیده بود، از دریای اژه تا سند.',

 'Built by Darius around 518 BCE, Persepolis welcomed delegations from across the empire, a record in stone of many nations under one rule.':
 'تخت جمشید که داریوش حدود ۵۱۸ پیش از میلاد ساخت، پذیرای نمایندگانی از سراسر امپراتوری بود؛ سندی در سنگ از ملت‌های بسیار زیر یک فرمان.',

 'The Persian Royal Road was a vast relay of stations and couriers. Messages crossed the empire with remarkable speed, the ancient world first true post.':
 'راه شاهی ایران شبکه‌ای گسترده از چاپارخانه‌ها و پیک‌ها بود. پیام‌ها با سرعتی شگفت‌آور امپراتوری را می‌پیمودند؛ نخستین نظام پستی راستین جهان باستان.',
}

t_ok, t_miss = 0, []
for en, fa in TITLES.items():
    a = "title: '" + en + "'"
    if a in s and "titleFa" not in s[s.find(a):s.find(a) + len(a) + 12]:
        s = s.replace(a, a + ", titleFa: '" + fa + "'", 1); t_ok += 1
    else:
        t_miss.append(en)

x_ok, x_miss = 0, []
for en, fa in BODIES.items():
    a = "x: '" + en + "'"
    if a in s:
        s = s.replace(a, a + ", xFa: '" + fa + "'", 1); x_ok += 1
    else:
        x_miss.append(en[:50])

open(p, "w").write(s)
print("titles:", t_ok, "of", len(TITLES))
for m in t_miss: print("   miss title:", m)
print("bodies:", x_ok, "of", len(BODIES))
for m in x_miss: print("   miss body:", m)
