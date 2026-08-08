# -*- coding: utf-8 -*-
# Khayyam, first batch. حکیم عمر خیام, نیشابور, تقویم جلالی, رصدخانه.
# The two rubai blocks are FitzGerald renderings, so the Persian restores
# the quatrains they came from rather than translating FitzGerald back.
# Both identifications are flagged in the notes for confirmation.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("essence: 'The mathematician of Neyshabur who built a calendar more accurate than the one the world uses today, and who became world famous for poetry he may not have written, in a translation that was not accurate.'",
  "essence: 'The mathematician of Neyshabur who built a calendar more accurate than the one the world uses today, and who became world famous for poetry he may not have written, in a translation that was not accurate.', essenceFa: 'ریاضی‌دانِ نیشابور که تقویمی ساخت دقیق‌تر از آنچه جهان امروز به کار می‌برد، و به سبب شعرهایی جهانی شد که شاید از او نباشند، آن هم در ترجمه‌ای که دقیق نبود.'"),

 ("{ t: 'lead', x: 'He is the most famous Persian poet in the English language, and he was not a poet.'",
  "{ t: 'lead', x: 'He is the most famous Persian poet in the English language, and he was not a poet.', fa: 'نامدارترین شاعر ایرانی در زبان انگلیسی است، و شاعر نبود.'"),

 ("{ t: 'p', x: 'That is not a riddle. In his own lifetime, in his own country, Omar Khayyam was known as one of the finest mathematicians and astronomers alive. Nobody called him a poet. The quatrains that made him a household name in London seven centuries later were not what he was for.' }",
  "{ t: 'p', x: 'That is not a riddle. In his own lifetime, in his own country, Omar Khayyam was known as one of the finest mathematicians and astronomers alive. Nobody called him a poet. The quatrains that made him a household name in London seven centuries later were not what he was for.', fa: 'این معما نیست. در زمان خودش و در سرزمین خودش، حکیم عمر خیام را یکی از بهترین ریاضی‌دانان و ستاره‌شناسان زنده می‌دانستند. هیچ‌کس او را شاعر نمی‌خواند. رباعی‌هایی که هفت قرن بعد نامش را در لندن بر سر زبان‌ها انداختند، آن چیزی نبود که او برایش شناخته می‌شد.' }"),

 ("{ t: 'p', x: 'He was born in Neyshabur, in Khorasan, around 1048. Khayyam is not a family name in the way we mean it. It means tentmaker, and it was almost certainly his father trade. The boy who would measure the length of the year was the son of a man who stitched canvas.' }",
  "{ t: 'p', x: 'He was born in Neyshabur, in Khorasan, around 1048. Khayyam is not a family name in the way we mean it. It means tentmaker, and it was almost certainly his father trade. The boy who would measure the length of the year was the son of a man who stitched canvas.', fa: 'حدود سال ۱۰۴۸ میلادی در نیشابور، در خراسان، به دنیا آمد. خیام به آن معنایی که ما از نام خانوادگی می‌فهمیم نام خانوادگی نیست؛ یعنی خیمه‌دوز، و تقریباً به‌یقین پیشهٔ پدرش بوده است. پسری که قرار بود درازای سال را اندازه بگیرد، فرزند مردی بود که چادر می‌دوخت.' }"),

 ("{ t: 'h', x: 'A good century to be a scholar' }",
  "{ t: 'h', x: 'A good century to be a scholar', fa: 'قرن خوبی برای دانشمند بودن' }"),

 ("{ t: 'p', x: 'He grew up under the Seljuks, and this was the one thing the Seljuks did superbly. Turkic warlords by origin, they had adopted Persian culture completely and they paid for science with an open hand. Nizam al Mulk, the great Persian vizier, built the observatories and the schools.' }",
  "{ t: 'p', x: 'He grew up under the Seljuks, and this was the one thing the Seljuks did superbly. Turkic warlords by origin, they had adopted Persian culture completely and they paid for science with an open hand. Nizam al Mulk, the great Persian vizier, built the observatories and the schools.', fa: 'در روزگار سلجوقیان بزرگ شد، و این همان یک کاری بود که سلجوقیان بی‌نقص انجامش می‌دادند. در اصل سرداران ترک بودند، اما فرهنگ ایرانی را یکسره از آنِ خود کرده بودند و برای دانش دست‌ودل‌بازانه خرج می‌کردند. خواجه نظام‌الملک، آن وزیر بزرگ ایرانی، رصدخانه‌ها و مدرسه‌ها را بنا کرد.' }"),

 ("{ t: 'p', x: 'So Khayyam went to Isfahan, and the sultan Malik Shah gave him an observatory and a team and a question: fix the calendar. He was around thirty. What he did with that assignment is the reason his name should be spoken alongside anyone in the history of science.' }",
  "{ t: 'p', x: 'So Khayyam went to Isfahan, and the sultan Malik Shah gave him an observatory and a team and a question: fix the calendar. He was around thirty. What he did with that assignment is the reason his name should be spoken alongside anyone in the history of science.', fa: 'پس خیام به اصفهان رفت، و ملکشاه سلجوقی رصدخانه‌ای و گروهی و یک پرسش به او سپرد: تقویم را درست کن. حدود سی سال داشت. آنچه با این مأموریت کرد، دلیل آن است که نامش باید در کنار هر نامی در تاریخ علم برده شود.' }"),

 ("{ t: 'aside', x: 'The famous story that he studied alongside Nizam al Mulk and Hassan e Sabbah of the Assassins is almost certainly a later legend. The dates do not work.' }",
  "{ t: 'aside', x: 'The famous story that he studied alongside Nizam al Mulk and Hassan e Sabbah of the Assassins is almost certainly a later legend. The dates do not work.', fa: 'آن حکایت نامدار که او با نظام‌الملک و حسن صباح هم‌درس بوده، تقریباً به‌یقین افسانه‌ای است که بعدها ساخته شده. تاریخ‌ها با هم نمی‌خوانند.' }"),

 ("{ t: 'p', x: 'In 1079 Khayyam and his team delivered a calendar. To build it, they had to answer one question with terrible precision: exactly how long is a year.' }",
  "{ t: 'p', x: 'In 1079 Khayyam and his team delivered a calendar. To build it, they had to answer one question with terrible precision: exactly how long is a year.', fa: 'در سال ۱۰۷۹ میلادی، خیام و گروهش تقویمی تحویل دادند. برای ساختنش باید به یک پرسش با دقتی هولناک پاسخ می‌دادند: یک سال، دقیقاً چقدر است؟' }"),

 # --- the two rubais ---
 # FitzGerald XXIX. The Persian original this renders:
 #   آورد به اضطرارم اول به وجود / جز حیرتم از حیات چیزی نفزود
 #   رفتیم به اکراه و ندانیم چه بود / زین آمدن و بودن و رفتن مقصود
 ("lines: ['Into this universe, and why not knowing,', 'nor whence, like water willy nilly flowing.', 'And out of it, as wind along the waste,', 'I know not whither, willy nilly blowing.'], note: 'FitzGerald rendering, 1859.'",
  "lines: ['Into this universe, and why not knowing,', 'nor whence, like water willy nilly flowing.', 'And out of it, as wind along the waste,', 'I know not whither, willy nilly blowing.'], linesFa: ['آورد به اضطرارم اول به وجود', 'جز حیرتم از حیات چیزی نفزود', 'رفتیم به اکراه و ندانیم چه بود', 'زین آمدن و بودن و رفتن مقصود'], note: 'FitzGerald rendering, 1859.', noteFa: 'رباعی خیام. ترجمهٔ فیتزجرالد، ۱۸۵۹.'"),

 # FitzGerald XXIV. The Persian original this renders:
 #   ای دوست بیا تا غم فردا نخوریم / وین یکدم عمر را غنیمت شمریم
 #   فردا که ازین دیر فنا درگذریم / با هفت‌هزار سالگان سربه‌سریم
 ("lines: ['Ah, make the most of what we yet may spend,', 'before we too into the dust descend.', 'Dust into dust, and under dust, to lie,', 'sans wine, sans song, sans singer, and, sans end.'], note: 'FitzGerald, 1859.'",
  "lines: ['Ah, make the most of what we yet may spend,', 'before we too into the dust descend.', 'Dust into dust, and under dust, to lie,', 'sans wine, sans song, sans singer, and, sans end.'], linesFa: ['ای دوست بیا تا غم فردا نخوریم', 'وین یکدم عمر را غنیمت شمریم', 'فردا که ازین دیر فنا درگذریم', 'با هفت‌هزار سالگان سربه‌سریم'], note: 'FitzGerald, 1859.', noteFa: 'رباعی خیام. ترجمهٔ فیتزجرالد، ۱۸۵۹.'"),
]

lit_scope.apply("khayyam", PAIRS)
