# -*- coding: utf-8 -*-
# Shab e Yalda. شب یلدا, شب چله, چله, مهر, انقلاب زمستانی.
# The register: written from inside the night, not explaining it to anyone.

p = "constants/yalda.ts"
s = open(p).read()

PAIRS = [
 # chapter titles
 ("title: 'The Longest Night', nav: 'The Night'",
  "title: 'The Longest Night', titleFa: 'درازترین شب', nav: 'The Night', navFa: 'شب'"),
 ("title: 'What the Name Means', nav: 'The Root'",
  "title: 'What the Name Means', titleFa: 'نام از کجا آمده', nav: 'The Root', navFa: 'ریشه'"),
 ("title: 'The Red Table', nav: 'The Table'",
  "title: 'The Red Table', titleFa: 'سفرهٔ سرخ', nav: 'The Table', navFa: 'سفره'"),
 ("title: 'The Book and the Grandmother', nav: 'The Night Itself'",
  "title: 'The Book and the Grandmother', titleFa: 'کتاب و مادربزرگ', nav: 'The Night Itself', navFa: 'خودِ شب'"),
 ("title: 'Why It Held', nav: 'Why'",
  "title: 'Why It Held', titleFa: 'چرا ماند', nav: 'Why', navFa: 'چرا'"),

 # the prose
 ("{ t: 'lead', x: 'One night a year, the dark wins. So Iranians sit up and refuse to let it happen alone.'",
  "{ t: 'lead', x: 'One night a year, the dark wins. So Iranians sit up and refuse to let it happen alone.', fa: 'سالی یک شب، تاریکی می‌برد. پس ایرانی‌ها بیدار می‌مانند و نمی‌گذارند این اتفاق در تنهایی بیفتد.'"),

 ("{ t: 'p', x: 'Shab e Yalda is the winter solstice, the longest night of the year, and it is the last night of autumn. After it, every night is shorter than the one before. The dark has reached its maximum and begins, from that hour, to lose.' }",
  "{ t: 'p', x: 'Shab e Yalda is the winter solstice, the longest night of the year, and it is the last night of autumn. After it, every night is shorter than the one before. The dark has reached its maximum and begins, from that hour, to lose.', fa: 'شب یلدا همان انقلاب زمستانی است، درازترین شب سال، و آخرین شب پاییز. پس از آن، هر شب از شب پیش کوتاه‌تر است. تاریکی به بیشترین اندازهٔ خود رسیده و از همان ساعت شروع می‌کند به باختن.' }"),

 ("{ t: 'p', x: 'And the response to it is not to sleep through it. It is to gather at the eldest person house, light the room, cover a table in red fruit, and stay awake until the sun comes back.' }",
  "{ t: 'p', x: 'And the response to it is not to sleep through it. It is to gather at the eldest person house, light the room, cover a table in red fruit, and stay awake until the sun comes back.', fa: 'و پاسخ به آن، خوابیدن تا صبح نیست. این است که در خانهٔ بزرگ‌ترِ فامیل جمع شوی، اتاق را روشن کنی، سفره‌ای پر از میوهٔ سرخ بچینی، و تا بازگشتن خورشید بیدار بمانی.' }"),

 ("{ t: 'mark', x: 'You do not survive the longest night. You throw a party in the middle of it.' }",
  "{ t: 'mark', x: 'You do not survive the longest night. You throw a party in the middle of it.', fa: 'درازترین شب را تحمل نمی‌کنی. وسطش بساط جشن راه می‌اندازی.' }"),

 ("{ t: 'p', x: 'Yalda is not a Persian word. It is Syriac, and it means birth. It came into Persian through the Christian communities of the region, and it was borrowed for exactly one reason: on this night, something is born.' }",
  "{ t: 'p', x: 'Yalda is not a Persian word. It is Syriac, and it means birth. It came into Persian through the Christian communities of the region, and it was borrowed for exactly one reason: on this night, something is born.', fa: 'یلدا واژه‌ای فارسی نیست. سریانی است و معنایش زایش است. از راه جامعه‌های مسیحی این منطقه به فارسی آمد، و دقیقاً به یک دلیل وام گرفته شد: در این شب، چیزی زاده می‌شود.' }"),

 ("{ t: 'p', x: 'The other name is older and more Persian. Shab e Chelleh, the night of the forty, because it opens the first forty day stretch of winter. Iranians count winter in two chelleh, the big one and the small one, and this night is the door into the first.' }",
  "{ t: 'p', x: 'The other name is older and more Persian. Shab e Chelleh, the night of the forty, because it opens the first forty day stretch of winter. Iranians count winter in two chelleh, the big one and the small one, and this night is the door into the first.', fa: 'نام دیگرش کهن‌تر است و ایرانی‌تر: شب چله، چون چهل روز نخست زمستان را می‌گشاید. ایرانی‌ها زمستان را با دو چله می‌شمارند، چلهٔ بزرگ و چلهٔ کوچک، و این شب دروازهٔ چلهٔ اول است.' }"),

 ("{ t: 'h', x: 'The sun is born tonight' }",
  "{ t: 'h', x: 'The sun is born tonight', fa: 'امشب خورشید زاده می‌شود' }"),

 ("{ t: 'p', x: 'Underneath it is Zoroastrian, and it is the same argument as Nowruz seen from the other end of the year. Light and dark are in a real contest. On this night dark holds its greatest possible territory, and then loses it, and every night after is a retreat. So the sun is born at dawn, and Mithra, the ancient Iranian divinity of the sun and of covenant, is associated with that dawn.' }",
  "{ t: 'p', x: 'Underneath it is Zoroastrian, and it is the same argument as Nowruz seen from the other end of the year. Light and dark are in a real contest. On this night dark holds its greatest possible territory, and then loses it, and every night after is a retreat. So the sun is born at dawn, and Mithra, the ancient Iranian divinity of the sun and of covenant, is associated with that dawn.', fa: 'زیرِ همهٔ اینها اندیشه‌ای زرتشتی نشسته است، و همان استدلال نوروز است که از آن سرِ دیگر سال دیده شود. روشنایی و تاریکی به‌راستی در نبردند. در این شب، تاریکی بیشترین قلمروی ممکنش را در دست دارد، و بعد از دستش می‌دهد، و هر شب پس از آن یک عقب‌نشینی است. پس خورشید سپیده‌دم زاده می‌شود، و مهر، ایزد کهن ایرانی خورشید و پیمان، با همان سپیده پیوند خورده است.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:55])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
