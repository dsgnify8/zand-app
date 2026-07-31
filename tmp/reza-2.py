# -*- coding: utf-8 -*-
# Reza Shah: consolidation and the building years.

p = "constants/education.ts"
s = open(p).read()

if "افسار دولت را یکسره" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'Over the next four years he gathered the reins of the state into his own hands. He crushed the tribal rebellions and separatist revolts that had torn the provinces apart, and for the first time in living memory, a single authority reached from Tehran to the farthest corners of the country.' }",
  "{ t: 'p', x: 'Over the next four years he gathered the reins of the state into his own hands. He crushed the tribal rebellions and separatist revolts that had torn the provinces apart, and for the first time in living memory, a single authority reached from Tehran to the farthest corners of the country.', fa: 'در چهار سال بعد، افسار دولت را یکسره در دست خود گرفت. شورش‌های ایلی و جنبش‌های جدایی‌خواه را که ولایات را از هم دریده بودند فرو نشاند، و برای نخستین بار در حافظهٔ زندگان، یک قدرت واحد از تهران تا دورترین گوشه‌های کشور رسید.' }"),

 ("{ t: 'p', x: 'In 1923 he became prime minister. The old dynasty was fading, and the nation was ready for a strong hand. In 1925, with the approval of a constituent assembly, the Qajar dynasty was set aside, and Reza Khan was proclaimed Reza Shah Pahlavi, founder of a new royal house.' }",
  "{ t: 'p', x: 'In 1923 he became prime minister. The old dynasty was fading, and the nation was ready for a strong hand. In 1925, with the approval of a constituent assembly, the Qajar dynasty was set aside, and Reza Khan was proclaimed Reza Shah Pahlavi, founder of a new royal house.', fa: 'در ۱۹۲۳ نخست‌وزیر شد. سلسلهٔ کهنه رو به خاموشی می‌رفت و کشور آمادهٔ دستی نیرومند بود. در ۱۹۲۵، با رأی مجلس مؤسسان، سلسلهٔ قاجار کنار گذاشته شد و رضاخان با عنوان رضاشاه پهلوی، بنیان‌گذار خاندانی تازه، بر تخت نشست.' }"),

 ("{ t: 'p', x: 'What Reza Shah did in the next sixteen years was remarkable by any measure. He set out to drag Iran, almost by force of will, out of the past and into the modern world, and the scale of what he built in so short a time still shapes the nation today.' }",
  "{ t: 'p', x: 'What Reza Shah did in the next sixteen years was remarkable by any measure. He set out to drag Iran, almost by force of will, out of the past and into the modern world, and the scale of what he built in so short a time still shapes the nation today.', fa: 'آنچه رضاشاه در شانزده سال بعد کرد، به هر معیاری که بسنجی، چشمگیر بود. کوشید ایران را، تقریباً با زور اراده، از گذشته بیرون بکشد و به جهان مدرن برساند، و اندازهٔ آنچه در چنین زمان کوتاهی ساخت هنوز شکل امروز کشور را تعیین می‌کند.' }"),


 ("{ t: 'p', x: 'He created a modern conscript army and ended the tribal revolts that had long divided the land. He founded the University of Tehran in 1934, made primary schooling compulsory, and sent thousands of young Iranians to study in Europe so they might return and build the nation.' }",
  "{ t: 'p', x: 'He created a modern conscript army and ended the tribal revolts that had long divided the land. He founded the University of Tehran in 1934, made primary schooling compulsory, and sent thousands of young Iranians to study in Europe so they might return and build the nation.', fa: 'ارتشی مدرن بر پایهٔ خدمت وظیفه ساخت و به شورش‌های ایلی که مدت‌ها سرزمین را چندپاره کرده بودند پایان داد. در ۱۹۳۴ دانشگاه تهران را بنیان نهاد، آموزش ابتدایی را اجباری کرد، و هزاران جوان ایرانی را برای تحصیل به اروپا فرستاد تا بازگردند و کشور را بسازند.' }"),

 ("{ t: 'h', x: 'A new nation, remade' }",
  "{ t: 'h', x: 'A new nation, remade', fa: 'ملتی که از نو ساخته شد' }"),

 ("{ t: 'p', x: 'He built thousands of miles of modern roads and the first real factories, registered the land, and nationalized the forests. He replaced religious law with a European style civil code, brought in Western dress for men, and in 1936 ordered the removal of the veil, a reform welcomed by some and deeply resented by others.' }",
  "{ t: 'p', x: 'He built thousands of miles of modern roads and the first real factories, registered the land, and nationalized the forests. He replaced religious law with a European style civil code, brought in Western dress for men, and in 1936 ordered the removal of the veil, a reform welcomed by some and deeply resented by others.', fa: 'هزاران کیلومتر راه مدرن و نخستین کارخانه‌های واقعی را ساخت، زمین‌ها را به ثبت رساند و جنگل‌ها را ملی کرد. قانون مدنی به سبک اروپایی را جایگزین قوانین شرعی کرد، لباس غربی را برای مردان آورد، و در ۱۳۱۴ فرمان کشف حجاب داد؛ اصلاحی که گروهی از آن استقبال کردند و گروهی دیگر به‌سختی از آن رنجیدند.' }"),

 ("{ t: 'p', x: 'In 1935 he asked the world to call the country by the name its own people used, Iran, the land of the Aryans, rather than the Greek name Persia. It was a small change of a word that carried a whole vision, a nation reclaiming itself and stepping forward under its own name.' }",
  "{ t: 'p', x: 'In 1935 he asked the world to call the country by the name its own people used, Iran, the land of the Aryans, rather than the Greek name Persia. It was a small change of a word that carried a whole vision, a nation reclaiming itself and stepping forward under its own name.', fa: 'در ۱۹۳۵ از جهان خواست کشور را به همان نامی بخوانند که مردمش می‌خواندند، ایران، به جای نام یونانی پرشیا. تغییری کوچک در یک واژه بود که چشم‌اندازی کامل را با خود داشت: ملتی که خودش را پس می‌گیرد و با نام خودش پیش می‌آید.' }"),

 ("{ t: 'h', x: 'The railway across the roof of Iran' }",
  "{ t: 'h', x: 'The railway across the roof of Iran', fa: 'راه‌آهنی از بام ایران' }"),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "block(s):")
    for m in missing:
        print("   -", m[:80])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b, 1)

open(p, "w").write(s)
print("translated:", len(PAIRS), "blocks")
