# -*- coding: utf-8 -*-
# The Ilkhanate, final batch: Ghazan, Rashid al-Din, and the flowering.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The turning point came when the Ilkhan Ghazan converted to Islam and embraced the ways of the land he ruled. Guided by a brilliant Persian vizier, he set about rebuilding what his ancestors had destroyed, reforming the government, restoring the ruined lands, and becoming a patron of Persian art and learning.' }",
  "{ t: 'p', x: 'The turning point came when the Ilkhan Ghazan converted to Islam and embraced the ways of the land he ruled. Guided by a brilliant Persian vizier, he set about rebuilding what his ancestors had destroyed, reforming the government, restoring the ruined lands, and becoming a patron of Persian art and learning.', fa: 'نقطهٔ چرخش آنگاه رسید که غازان خان به اسلام گروید و راه و رسم سرزمینی را که بر آن فرمان می‌راند پذیرفت. به راهنمایی وزیری درخشان و ایرانی، دست به بازسازی آنچه نیاکانش ویران کرده بودند زد؛ دیوان را اصلاح کرد، سرزمین‌های ویران را آباد کرد، و به حامی هنر و دانش ایرانی بدل شد.' }"),

 ("{ t: 'h', x: 'A flowering from the ashes' }",
  "{ t: 'h', x: 'A flowering from the ashes', fa: 'شکوفه‌ای از دل خاکستر' }"),

 ("{ t: 'p', x: 'What followed was, astonishingly, a cultural golden age. The vizier Rashid al-Din, one of the great minds of the age, composed a monumental history of the world, perhaps the first truly global history ever written, drawing on the knowledge the vast Mongol empire had gathered from China to Europe.' }",
  "{ t: 'p', x: 'What followed was, astonishingly, a cultural golden age. The vizier Rashid al-Din, one of the great minds of the age, composed a monumental history of the world, perhaps the first truly global history ever written, drawing on the knowledge the vast Mongol empire had gathered from China to Europe.', fa: 'آنچه پس از آن آمد، شگفت‌آورانه، عصری طلایی در فرهنگ بود. رشیدالدین فضل‌الله، وزیر و از بزرگ‌ترین ذهن‌های آن روزگار، تاریخی سترگ از جهان نوشت، جامع‌التواریخ؛ شاید نخستین تاریخ به‌راستی جهانی که تا آن روز نوشته شده بود، بر پایهٔ دانشی که امپراتوری پهناور مغول از چین تا اروپا گرد آورده بود.' }"),

 ("{ t: 'p', x: 'Persian painting, enriched now by contact with the art of China, entered one of its most beautiful periods. Architecture, history, and science flourished under Mongol patronage. From the ashes of the greatest catastrophe, Iran had conjured a new flowering of its genius.' }",
  "{ t: 'p', x: 'Persian painting, enriched now by contact with the art of China, entered one of its most beautiful periods. Architecture, history, and science flourished under Mongol patronage. From the ashes of the greatest catastrophe, Iran had conjured a new flowering of its genius.', fa: 'نگارگری ایرانی که اکنون از برخورد با هنر چین توانگر شده بود، به یکی از زیباترین دوره‌های خود پا گذاشت. معماری و تاریخ‌نگاری و دانش زیر حمایت مغولان بالیدند. ایران از خاکستر بزرگ‌ترین فاجعه‌اش، شکوفایی تازه‌ای از نبوغ خود بیرون کشید.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of the Ilkhanate, the age of the Mongols in Iran, a story of catastrophe and, against all odds, of renewal. The Mongol invasion was among the most destructive events the nation ever suffered, and its wounds were deep and lasting.' }",
  "{ t: 'p', x: 'This has been a glimpse of the Ilkhanate, the age of the Mongols in Iran, a story of catastrophe and, against all odds, of renewal. The Mongol invasion was among the most destructive events the nation ever suffered, and its wounds were deep and lasting.', fa: 'این نگاهی بود کوتاه به ایلخانان، روزگار مغول در ایران؛ روایتی از فاجعه و، برخلاف همهٔ انتظارها، از نوزایی. هجوم مغول از ویرانگرترین رویدادهایی بود که بر این ملت گذشت، و زخم‌هایش ژرف و ماندگار بود.' }"),

 ("{ t: 'p', x: 'Yet even this could not extinguish the Iranian spirit. Within a few generations, Iran had absorbed and transformed even the terrible Mongols, turning destroyers into patrons and drawing from the darkest of times a new age of beauty. It stands as perhaps the greatest testament of all to the deathless resilience of Persian civilization.' }",
  "{ t: 'p', x: 'Yet even this could not extinguish the Iranian spirit. Within a few generations, Iran had absorbed and transformed even the terrible Mongols, turning destroyers into patrons and drawing from the darkest of times a new age of beauty. It stands as perhaps the greatest testament of all to the deathless resilience of Persian civilization.', fa: 'با این همه، حتی این هم نتوانست روح ایرانی را خاموش کند. در فاصلهٔ چند نسل، ایران حتی مغولان هولناک را نیز در خود گرفت و دگرگون کرد؛ ویرانگران را به حامیان بدل ساخت و از تاریک‌ترین روزگاران، عصری تازه از زیبایی بیرون کشید. این شاید بزرگ‌ترین گواه بر تاب‌آوری نمیرای تمدن ایرانی باشد.' }"),

 ("{ t: 'pull', x: 'Even the Mongols, in the end, were conquered by the soul of Iran.' }",
  "{ t: 'pull', x: 'Even the Mongols, in the end, were conquered by the soul of Iran.', fa: 'سرانجام حتی مغولان هم مغلوب جان ایران شدند.' }"),
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
