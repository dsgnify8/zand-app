# -*- coding: utf-8 -*-
# Nowruz, first batch. This has to read as though written in Persian from
# the start — it is about what Iranians do, not an explanation to outsiders.
# سال تحویل, اعتدال بهاری, تقویم جلالی, نوروز.

p = "constants/nowruz.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'lead', x: 'Every other new year is a date somebody chose. This one is an event.'",
  "{ t: 'lead', x: 'Every other new year is a date somebody chose. This one is an event.', fa: 'هر سال نوِ دیگری تاریخی است که کسی انتخابش کرده. این یکی یک رویداد است.'"),

 ("{ t: 'p', x: 'Nowruz does not fall on a day. It falls at an instant, the exact second the sun crosses the equator and the northern half of the world tips back toward the light. Astronomers can give you that second. Iranians will be watching the clock for it.' }",
  "{ t: 'p', x: 'Nowruz does not fall on a day. It falls at an instant, the exact second the sun crosses the equator and the northern half of the world tips back toward the light. Astronomers can give you that second. Iranians will be watching the clock for it.', fa: 'نوروز در یک روز نمی‌افتد؛ در یک لحظه می‌افتد. همان ثانیهٔ دقیقی که خورشید از استوا می‌گذرد و نیمهٔ شمالی زمین دوباره رو به روشنایی می‌چرخد. ستاره‌شناسان آن ثانیه را به تو می‌دهند. ایرانی‌ها چشمشان به ساعت است تا برسد.' }"),

 ("{ t: 'p', x: 'That is the real countdown, calculated the same way Khayyam calculated it in 1079 when he built the calendar Iran still uses. He is the reason it is exact.' }",
  "{ t: 'p', x: 'That is the real countdown, calculated the same way Khayyam calculated it in 1079 when he built the calendar Iran still uses. He is the reason it is exact.', fa: 'شمارش معکوس واقعی همین است، و به همان روشی حساب می‌شود که خیام در سال ۴۵۸ خورشیدی حساب کرد، وقتی تقویمی را ساخت که ایران هنوز با آن زندگی می‌کند. دقیق بودنش را از او داریم.' }"),

 ("{ t: 'mark', x: 'Nobody voted for this new year. The solar system decides it.' }",
  "{ t: 'mark', x: 'Nobody voted for this new year. The solar system decides it.', fa: 'کسی به این سال نو رأی نداده. منظومهٔ شمسی تعیینش می‌کند.' }"),

 ("{ t: 'p', x: 'It is at least three thousand years old, and probably older. It comes out of Zoroastrian Iran, out of a religion built on the argument between light and dark, where the return of the sun was not a metaphor for anything. It was the news.' }",
  "{ t: 'p', x: 'It is at least three thousand years old, and probably older. It comes out of Zoroastrian Iran, out of a religion built on the argument between light and dark, where the return of the sun was not a metaphor for anything. It was the news.', fa: 'دست‌کم سه هزار سال قدمت دارد، و احتمالاً بیشتر. از ایرانِ زرتشتی می‌آید؛ از آیینی که بر نبرد روشنایی و تاریکی بنا شده بود، و در آن بازگشت خورشید استعارهٔ هیچ چیز نبود. خودِ خبر بود.' }"),

 ("{ t: 'p', x: 'The Achaemenids kept it. The reliefs at Persepolis show delegations from every corner of the empire arriving with gifts, and many scholars read that as a Nowruz procession carved in stone twenty five centuries ago.' }",
  "{ t: 'p', x: 'The Achaemenids kept it. The reliefs at Persepolis show delegations from every corner of the empire arriving with gifts, and many scholars read that as a Nowruz procession carved in stone twenty five centuries ago.', fa: 'هخامنشیان نگهش داشتند. نقش‌برجسته‌های تخت جمشید نمایندگانی را نشان می‌دهد که از هر گوشهٔ امپراتوری با هدیه می‌آیند، و بسیاری از پژوهشگران آن را صف نوروزی می‌خوانند که بیست و پنج قرن پیش بر سنگ کنده شده است.' }"),

 ("{ t: 'h', x: 'What could not be taken' }",
  "{ t: 'h', x: 'What could not be taken', fa: 'آنچه نتوانستند بگیرند' }"),

 ("{ t: 'p', x: 'Nowruz was never a religious festival. It belonged to no doctrine and asked for no belief. It was simply the turning of the year, marked by a people who had always watched the sky. That is exactly why it endured: it was woven into the rhythm of the land itself, not into any single faith.' }",
  "{ t: 'p', x: 'Nowruz was never a religious festival. It belonged to no doctrine and asked for no belief. It was simply the turning of the year, marked by a people who had always watched the sky. That is exactly why it endured: it was woven into the rhythm of the land itself, not into any single faith.', fa: 'نوروز هیچ‌گاه جشنی دینی نبود. به هیچ مکتبی تعلق نداشت و از کسی باور نمی‌خواست. فقط گردش سال بود، که مردمی آن را نگه می‌داشتند که همیشه چشم به آسمان داشته‌اند. دقیقاً به همین سبب ماند: در ضرباهنگ خودِ این سرزمین بافته شده بود، نه در هیچ آیین خاصی.' }"),

 ("{ t: 'p', x: 'It did not. It was too deep in the year, in the food, in the houses. So it survived, quietly, and then loudly, and it is now kept by Muslims, by Jews, by Zoroastrians, by Christians, by Kurds and Afghans and Tajiks and Azeris, by people who have no religion at all, and by people whose grandparents left Iran and who cannot read a word of Persian.' }",
  "{ t: 'p', x: 'It did not. It was too deep in the year, in the food, in the houses. So it survived, quietly, and then loudly, and it is now kept by Muslims, by Jews, by Zoroastrians, by Christians, by Kurds and Afghans and Tajiks and Azeris, by people who have no religion at all, and by people whose grandparents left Iran and who cannot read a word of Persian.', fa: 'و از میان نرفت. بیش از آن در سال ریشه داشت، در غذا، در خانه‌ها. پس ماند؛ اول بی‌سروصدا و بعد بلند و آشکار. امروز مسلمان و یهودی و زرتشتی و مسیحی نگهش می‌دارند، کرد و افغان و تاجیک و آذری، کسانی که هیچ دینی ندارند، و کسانی که پدربزرگ و مادربزرگشان از ایران رفته‌اند و خودشان یک کلمه فارسی نمی‌توانند بخوانند.' }"),

 ("{ t: 'mark', x: 'It survived every empire that arrived to replace it, because it was never about who was in charge.' }",
  "{ t: 'mark', x: 'It survived every empire that arrived to replace it, because it was never about who was in charge.', fa: 'از هر امپراتوری‌ای که آمد تا جایش را بگیرد جان به در برد، چون هرگز به این ربطی نداشت که چه کسی حاکم است.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:60])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
