# -*- coding: utf-8 -*-
# The daily cards. These rotate on the home page, so they are the most-read
# text in the app. Several are about Persian idiom, which means the Persian
# version can state the thing directly where the English has to explain it.

p = "constants/stories.ts"
s = open(p).read()

if "titleFa" not in s:
    # the type carries the new fields
    import re
    m = re.search(r"export type Daily = \{[^}]*\}", s)
    if m and "titleFa" not in m.group(0):
        s = s.replace(m.group(0), m.group(0).rstrip("}").rstrip() + "; titleFa?: string; xFa?: string }")
        print("type extended")

FA = [
 ("Your heart has gone tight",
  "It is how Persian says I miss you. Not a report of an absence, a symptom happening in your chest right now.",
  "دلت تنگ شده",
  "این است شیوهٔ فارسی برای گفتن دلتنگی. خبر دادن از یک نبود نیست؛ حالی است که همین حالا در سینه‌ات می‌گذرد."),

 ("Do not grieve",
  "Gham makhor. Hafez wrote it six hundred years ago and Iranians have been saying it to each other ever since. It is not advice. It is a hand on the shoulder.",
  "غم مخور",
  "حافظ ششصد سال پیش نوشتش و ایرانیان از آن روز تا امروز به هم می‌گویندش. نصیحت نیست؛ دستی است که بر شانه می‌نشیند."),

 ("The calendar you are not using is better",
  "Khayyam measured the year to six decimal places in 1079 with brass instruments. His calendar drifts a day every five thousand years. The Gregorian drifts one every three thousand.",
  "تقویمی که به کار نمی‌بری، دقیق‌تر است",
  "خیام در سال ۱۰۷۹ با ابزارهای برنجی طول سال را تا شش رقم اعشار اندازه گرفت. تقویم او هر پنج هزار سال یک روز خطا دارد؛ تقویم میلادی هر سه هزار سال یک روز."),

 ("Offer it three times",
  "Nothing is real until it has been offered three times. Accept on the first and everyone knows you were waiting for it.",
  "سه بار تعارف کن",
  "هیچ‌چیز جدی نیست مگر سه بار تعارف شده باشد. بار اول قبول کنی، همه می‌فهمند منتظرش بوده‌ای."),

 ("Paradise was a garden with a wall around it",
  "Pairidaeza just meant an enclosed space. The Greeks borrowed the word, scripture borrowed it, and an ordinary Persian garden became the name for heaven.",
  "بهشت، باغی بود با دیواری گرداگردش",
  "پیریدَئِزَه فقط یعنی جایی که دورش را بسته باشند. یونانیان این واژه را وام گرفتند، کتاب‌های مقدس هم، و باغی ساده و ایرانی نام بهشت شد."),

 ("The best thing is an accident",
  "The golden crust at the bottom of the rice pot. Guests get it first. Then the family goes to war over what is left.",
  "بهترین قسمت، اتفاقی است",
  "همان پوستهٔ طلایی ته دیگ. اول به مهمان می‌رسد. بعد خانواده بر سر باقی‌اش به جان هم می‌افتد."),

 ("You are the reed",
  "Rumi opens the Masnavi with a flute crying for the reed bed it was cut from. Twenty six thousand couplets follow, and they are all about that.",
  "تو همان نی هستی",
  "مولانا مثنوی را با نالهٔ نی‌ای آغاز می‌کند که از نیستان بریده شده است. بیست و شش هزار بیت پس از آن می‌آید، و همه‌اش دربارهٔ همان است."),

 ("A poem got a king onto a horse without his boots",
  "Rudaki sang about the smell of a stream in Bukhara. The king had refused to go home for four years. He rode out barefoot.",
  "شعری شاهی را بی‌چکمه بر اسب نشاند",
  "رودکی از بوی جوی مولیان خواند. شاه چهار سال بود که به خانه بازنمی‌گشت. پابرهنه سوار شد و رفت."),

 ("May I be sacrificed for you",
  "Said constantly, to almost anyone, meaning roughly thanks. Persian does not do small affection.",
  "قربانت بروم",
  "مدام گفته می‌شود، به تقریباً هر کسی، و معنایش چیزی نزدیک به سپاسگزارم است. فارسی محبت را کوچک بیان نمی‌کند."),

 ("Iran has been calling itself Iran the whole time",
  "From Aryanam, the noble ones. Persia was the outside name, from Pars, one province. The country never changed what it calls itself.",
  "ایران، همیشه خودش را ایران خوانده است",
  "از آریانام، یعنی نجیبان. پرشیا نامی بود که بیرونی‌ها گذاشته بودند، برگرفته از پارس، تنها یکی از استان‌ها. این کشور هرگز نامی را که بر خود می‌گذارد عوض نکرد."),

 ("The oldest symbol",
  "The pomegranate is one of the oldest symbols in Persian art and myth, a sign of abundance, life, and eternity.",
  "کهن‌ترین نماد",
  "انار از کهن‌ترین نمادهای هنر و اسطورهٔ ایرانی است؛ نشانهٔ فراوانی، زندگی و جاودانگی."),

 ("Paradise was a garden",
  "The English word paradise traces back to an ancient Persian word for a walled garden.",
  "بهشت، یک باغ بود",
  "واژهٔ انگلیسی paradise به واژه‌ای کهن در زبان ایرانی بازمی‌گردد که معنایش باغی دیواردار بود: پردیس."),

 ("The oldest carpet",
  "The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.",
  "کهن‌ترین فرش",
  "فرش پازیریک، با حدود ۲٬۵۰۰ سال قدمت، کهن‌ترین فرش گره‌بافتهٔ شناخته‌شدهٔ جهان است که به جا مانده."),

 ("Air conditioning, ancient",
  "Long before electricity, Persian windcatchers, tall towers called badgir, cooled homes by guiding the breeze downward.",
  "تهویهٔ مطبوع، از روزگار باستان",
  "مدت‌ها پیش از برق، بادگیرهای ایرانی، همان برج‌های بلند، با هدایت نسیم به پایین خانه‌ها را خنک می‌کردند."),
]

applied, skipped = 0, []
for en_t, en_x, fa_t, fa_x in FA:
    anchor = "title: '" + en_t + "', x: '" + en_x + "'"
    if anchor in s:
        s = s.replace(anchor, "title: '" + en_t + "', titleFa: '" + fa_t + "', x: '" + en_x + "', xFa: '" + fa_x + "'", 1)
        applied += 1
    else:
        skipped.append(en_t)

open(p, "w").write(s)
print("applied", applied, "of", len(FA))
for k in skipped:
    print("   skipped:", k)
