# -*- coding: utf-8 -*-
# Mohammad Reza Shah, eighth batch: Mossadegh, the boycott, and the
# question of 1953. جبههٔ ملی, قیام سی تیر, دیوان لاهه.
# The "Foreign hands" paragraph sets two accounts side by side on purpose;
# the Persian keeps that balance exactly.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

def pairs_for(en, fa):
    out = []
    for q in ('"', "'"):
        esc = en.replace("'", "\\'") if q == "'" else en
        a = 'x: ' + q + esc + q
        out.append((a, a + ", fa: '" + fa + "'"))
    return out

ITEMS = [
 ("The photographs of these years show a couple plainly devoted to each other. For a time, amid the gathering storms of politics, he had found real happiness at home.",
  'عکس‌های آن سال‌ها زوجی را نشان می‌دهد که آشکارا به هم دل‌بسته‌اند. مدتی، در میان توفان‌هایی که در سیاست جمع می‌شد، در خانه خوشبختی واقعی یافته بود.'),

 ("Mohammad Mossadegh was unlike any figure Iran had seen. Aristocratic, emotional, and by all accounts incorruptible, he could move a crowd to tears and often wept himself, conducting affairs of state from his bed and appearing in parliament in his pajamas. To his supporters he was the pure voice of the nation.",
  'محمد مصدق شبیه هیچ چهره‌ای نبود که ایران تا آن روز دیده باشد. اشراف‌زاده، احساساتی، و به گواه همه دست‌پاک؛ می‌توانست جمعیتی را به گریه بیندازد و خودش هم اغلب می‌گریست، کارهای مملکت را از بستر اداره می‌کرد و با لباس خواب در مجلس حاضر می‌شد. برای هوادارانش، صدای خالص ملت بود.'),

 ("He led the National Front, drove through the nationalization of oil, and became prime minister in 1951 to enormous acclaim, named Time's Man of the Year. Between the cautious young king who longed for authority and the popular premier who embodied the will of the street, a deep and uneasy rivalry began to grow.",
  'رهبری جبههٔ ملی را بر عهده داشت، ملی شدن نفت را به سرانجام رساند، و در سال ۱۳۳۰ با استقبالی گسترده نخست‌وزیر شد؛ مجلهٔ تایم مرد سال خواندش. میان شاه جوان و محتاطی که تشنهٔ اختیار بود و نخست‌وزیر محبوبی که ارادهٔ خیابان را نمایندگی می‌کرد، رقابتی عمیق و پرتنش شکل گرفت.'),

 ("The boycott and the standoff", 'تحریم و رویارویی'),

 ("Britain struck back hard. It organized a worldwide boycott of Iranian oil, blockaded Abadan with its navy, and took the dispute to the World Court and the United Nations. Iran's oil sales collapsed, the economy was strangled, and ordinary people began to feel the pain of empty treasuries and rising hardship.",
  'بریتانیا سخت پاسخ داد. تحریم جهانی نفت ایران را سازمان داد، آبادان را با ناوگانش محاصره کرد، و اختلاف را به دیوان لاهه و سازمان ملل برد. فروش نفت ایران فرو ریخت، اقتصاد در تنگنا افتاد، و مردم عادی درد خزانهٔ خالی و سختی روزافزون را حس کردند.'),

 ("Rather than break Mossadegh, the pressure made him stronger. He demanded emergency powers and control of the war ministry, clashing directly with the Shah over command of the army. When he briefly resigned in July 1952, a popular uprising swept him back into office. But the country was splitting apart, and the communist Tudeh was gaining in the streets.",
  'این فشار به جای شکستن مصدق، او را نیرومندتر کرد. اختیارات ویژه و کنترل وزارت جنگ را خواست، و بر سر فرماندهی ارتش مستقیماً با شاه درگیر شد. وقتی در تیر ۱۳۳۱ برای مدت کوتاهی استعفا داد، قیام مردمی سی تیر او را دوباره به قدرت بازگرداند. اما کشور داشت از هم می‌پاشید، و حزب تودهٔ کمونیست در خیابان‌ها قوی‌تر می‌شد.'),

 ("Foreign hands", 'دست‌های بیگانه'),

 ("Documents released in the decades since have made the foreign role clear. In his own books the Shah described the events as the will of his people and a lawful act of the crown. Both accounts are part of the record, and the distance between them would shape how a generation of Iranians came to see him.",
  'اسنادی که در دهه‌های بعد منتشر شد، نقش بیگانه را روشن کرد. شاه در کتاب‌های خودش این رویدادها را خواست مردمش و اقدامی قانونی از سوی سلطنت توصیف کرد. هر دو روایت بخشی از سند تاریخ‌اند، و فاصلهٔ میانشان بود که شکل داد به اینکه یک نسل از ایرانی‌ها او را چگونه ببینند.'),

 ("August 1953", 'مرداد ۱۳۳۲'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
