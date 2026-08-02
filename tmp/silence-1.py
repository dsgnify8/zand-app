# -*- coding: utf-8 -*-
# Two Centuries of Silence. The register here leans literary: this is the
# chapter about the survival of Persian, so the Persian reaches for Persian
# words wherever one exists.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 # header and chapter titles
 ("essence: 'The long, quiet age after the fall of Persia, when a conquered people held fast to their soul, until a poet gave them back their voice.',",
  "essence: 'The long, quiet age after the fall of Persia, when a conquered people held fast to their soul, until a poet gave them back their voice.',\n  essenceFa: 'روزگار دراز و خاموشی که پس از فروپاشی ایران فرا رسید؛ آنگاه که مردمی شکست‌خورده جان خود را نگاه داشتند، تا شاعری صدایشان را به آنان بازگرداند.',"),

 ("title: 'The Silence Falls',", "title: 'The Silence Falls', titleFa: 'سکوت فرود می‌آید',"),
 ("title: 'The Soul That Would Not Die',", "title: 'The Soul That Would Not Die', titleFa: 'جانی که نمرد',"),
 ("title: 'The Poet Who Saved a Language',", "title: 'The Poet Who Saved a Language', titleFa: 'شاعری که زبانی را نجات داد',"),
 ("title: 'The Voice Returns',", "title: 'The Voice Returns', titleFa: 'صدا بازمی‌گردد',"),

 ("{ t: 'p', x: 'When the last Sasanian king fell and the ancient empire came to its end, a strange and heavy quiet settled over the land of Iran. The throne of Cyrus was gone. The sacred fires that had burned for a thousand years grew dim. A proud and ancient nation found itself, for the first time in its long memory, conquered and ruled by others.' }",
  "{ t: 'p', x: 'When the last Sasanian king fell and the ancient empire came to its end, a strange and heavy quiet settled over the land of Iran. The throne of Cyrus was gone. The sacred fires that had burned for a thousand years grew dim. A proud and ancient nation found itself, for the first time in its long memory, conquered and ruled by others.', fa: 'چون واپسین شهریار ساسانی فرو افتاد و امپراتوری کهن به پایان رسید، خاموشی‌ای غریب و سنگین بر سرزمین ایران نشست. تخت کوروش دیگر نبود. آتش‌های مقدسی که هزار سال فروزان بودند رو به خاموشی گذاشتند. ملتی سربلند و باستانی، برای نخستین بار در حافظهٔ بلند خویش، خود را مغلوب و زیر فرمان دیگران یافت.' }"),

 ("{ t: 'p', x: 'The historian who gave this age its name called it the two centuries of silence. It was not that nothing happened, for much did. It was that the voice of Iran itself, its language in the halls of power, its kings, its own telling of its own story, seemed to fall quiet, muffled beneath the weight of conquest.' }",
  "{ t: 'p', x: 'The historian who gave this age its name called it the two centuries of silence. It was not that nothing happened, for much did. It was that the voice of Iran itself, its language in the halls of power, its kings, its own telling of its own story, seemed to fall quiet, muffled beneath the weight of conquest.', fa: 'تاریخ‌نگاری که نام این روزگار را برگزید، آن را دو قرن سکوت خواند. نه آنکه چیزی روی نداده باشد؛ بسیار چیزها روی داد. سخن بر سر آن بود که صدای خودِ ایران خاموش شده بود: زبانش در دستگاه قدرت، شاهانش، و روایتی که خود از خویش داشت، همه زیر بار فتح فرو نشسته بودند.' }"),

 ("{ t: 'markline', x: 'A nation that had spoken to the world for a thousand years fell suddenly quiet.' }",
  "{ t: 'markline', x: 'A nation that had spoken to the world for a thousand years fell suddenly quiet.', fa: 'ملتی که هزار سال با جهان سخن گفته بود، ناگهان خاموش شد.' }"),

 ("{ t: 'h', x: 'A world turned over' }",
  "{ t: 'h', x: 'A world turned over', fa: 'جهانی که زیر و رو شد' }"),

 ("{ t: 'p', x: 'The change reached into every corner of life. Arabic became the language of government, of learning, and of the new faith. For a Persian of noble memory, it was a hard and disorienting age, to see the ways of a thousand years set aside, and the language of the conquerors rise in their place.' }",
  "{ t: 'p', x: 'The change reached into every corner of life. Arabic became the language of government, of learning, and of the new faith. For a Persian of noble memory, it was a hard and disorienting age, to see the ways of a thousand years set aside, and the language of the conquerors rise in their place.', fa: 'دگرگونی به هر گوشه‌ای از زندگی رسید. عربی زبان دیوان شد، زبان دانش، و زبان آیین تازه. برای ایرانی‌ای که یاد گذشته را در سینه داشت، روزگاری بود سخت و گیج‌کننده: می‌دید که راه و رسم هزار ساله را کنار می‌نهند و زبان فاتحان به جای آن بالا می‌آید.' }"),

 ("{ t: 'p', x: 'Many converted to the new faith, some by conviction, some by the slow pressure of the centuries, some to escape the heavier taxes laid upon those who did not. The Iran of the fire temples faded, and a new, Islamic Iran slowly took its place. It was, for those who lived through it, the passing of an entire world.' }",
  "{ t: 'p', x: 'Many converted to the new faith, some by conviction, some by the slow pressure of the centuries, some to escape the heavier taxes laid upon those who did not. The Iran of the fire temples faded, and a new, Islamic Iran slowly took its place. It was, for those who lived through it, the passing of an entire world.', fa: 'بسیاری به آیین نو گرویدند؛ گروهی از سر باور، گروهی زیر فشار آرام قرن‌ها، و گروهی برای گریز از مالیات سنگین‌تری که بر دوش ناگرویدگان بود. ایرانِ آتشکده‌ها رنگ باخت و ایرانی تازه و اسلامی به‌آهستگی جای آن را گرفت. برای کسانی که آن روزگار را زیستند، این رفتنِ یک جهانِ تمام بود.' }"),

 ("{ t: 'p', x: 'And yet, beneath the silence, something refused to die. A conquered people may lose its throne and even its faith, and still keep its soul. And the soul of Iran, its language, its memory, its sense of who it was, endured stubbornly in the homes and the hearts of ordinary people, passed quietly from parent to child.' }",
  "{ t: 'p', x: 'And yet, beneath the silence, something refused to die. A conquered people may lose its throne and even its faith, and still keep its soul. And the soul of Iran, its language, its memory, its sense of who it was, endured stubbornly in the homes and the hearts of ordinary people, passed quietly from parent to child.', fa: 'با این همه، زیر آن خاموشی، چیزی از مردن سر باز زد. مردمی شکست‌خورده ممکن است تخت خود را از دست بدهند و حتی آیین خود را، و باز جان خویش را نگاه دارند. و جان ایران، یعنی زبانش، خاطره‌اش، و آن دریافتی که از خود داشت، سرسختانه در خانه‌ها و در دل مردم عادی ماند و بی‌صدا از پدر و مادر به فرزند رسید.' }"),

 ("{ t: 'markline', x: 'They took our throne, but they could not take our language, nor our memory.' }",
  "{ t: 'markline', x: 'They took our throne, but they could not take our language, nor our memory.', fa: 'تخت ما را گرفتند، اما زبان ما را نتوانستند بگیرند، و خاطرهٔ ما را نیز.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
