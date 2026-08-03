# -*- coding: utf-8 -*-
# Mohammad Reza Shah, ninth batch: 28 Mordad and after. ۲۸ مرداد ۱۳۳۲,
# سرلشکر زاهدی, کنسرسیوم نفت. The legitimacy paragraph keeps its balance.

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
 ("The Shah signed royal decrees dismissing Mossadegh and appointing General Zahedi in his place. The first attempt, in mid August, failed. Mossadegh's supporters held the streets, and the frightened king fled the country, first to Baghdad and then to Rome, convinced he had lost his throne forever.",
  'شاه فرمان‌هایی امضا کرد که مصدق را برکنار و سرلشکر زاهدی را به جای او منصوب می‌کرد. تلاش اول، در نیمهٔ مرداد، شکست خورد. هواداران مصدق خیابان‌ها را در دست گرفتند، و شاهِ هراسان از کشور گریخت؛ نخست به بغداد و بعد به رم، با این باور که تختش را برای همیشه از دست داده است.'),

 ("For several days the outcome hung in the balance. Then, on 19 August, organized crowds and loyal army units turned the tide, Mossadegh's government fell, and Zahedi took power. Stunned and relieved, the Shah flew home to cheering crowds and a throne restored.",
  'چند روز نتیجه در تعلیق ماند. سپس، در ۲۸ مرداد، جمعیت‌های سازمان‌یافته و یگان‌های وفادار ارتش ورق را برگرداندند، دولت مصدق سقوط کرد، و زاهدی قدرت را به دست گرفت. شاه، مبهوت و آسوده، به کشور بازگشت؛ به استقبال جمعیت و به تختی که دوباره برایش برپا شده بود.'),

 ("From this moment he would rule, and no longer merely reign.",
  'از این لحظه به بعد حکومت می‌کرد، نه اینکه فقط پادشاه باشد.'),

 ("The year 1953 was the hinge of his reign. It gave him at last the power that had eluded him since boyhood. But the manner of his return, carried home on foreign shoulders, cast a long shadow over his legitimacy that he would never fully escape, however much he later sought to minimize the hands that had helped him.",
  'سال ۱۳۳۲ لولای سلطنت او بود. سرانجام قدرتی را به او داد که از کودکی از دستش می‌گریخت. اما شیوهٔ بازگشتش، که بر دوش بیگانه به خانه آورده شد، سایه‌ای دراز بر مشروعیتش انداخت؛ سایه‌ای که هرگز به‌تمامی از آن رها نشد، هر قدر هم بعدها کوشید نقش دست‌هایی را که کمکش کرده بودند کم‌رنگ کند.'),

 ("With his throne secured, the Shah turned to rebuilding. A fair new oil agreement in 1954 restored the country's income, American aid flowed in, and the economy slowly steadied. For a few years the king and his young queen seemed to have everything before them.",
  'با تثبیت تخت، شاه به بازسازی رو آورد. قرارداد نفتی تازه‌ای در سال ۱۳۳۳ درآمد کشور را بازگرداند، کمک آمریکا سرازیر شد، و اقتصاد به‌آرامی سر و سامان گرفت. چند سالی چنین می‌نمود که شاه و ملکهٔ جوانش همه‌چیز را پیش رو دارند.'),

 ("Yet a shadow lay over the palace. The dynasty needed a male heir, and as the years passed, Soraya bore no child. In a monarchy whose survival depended on the line of succession, it was the one problem that power and wealth could not solve.",
  'اما سایه‌ای بر کاخ افتاده بود. سلسله به ولیعهد پسر نیاز داشت، و سال‌ها گذشت و ثریا فرزندی نیاورد. در پادشاهی‌ای که بقایش به خط جانشینی بستگی داشت، این تنها مشکلی بود که قدرت و ثروت نمی‌توانست حلش کند.'),

 ("An impossible choice", 'انتخابی ناممکن'),

 ("Doctors were consulted across Europe, and the pressure grew heavier each year, from the court, from the clergy, and from the cold logic of the crown itself. The Shah, by his own account, loved Soraya deeply and searched for any way to keep her.",
  'در سراسر اروپا با پزشکان مشورت شد، و فشار هر سال سنگین‌تر شد؛ از سوی دربار، از سوی روحانیت، و از سوی همان منطق سرد خودِ سلطنت. شاه، به روایت خودش، ثریا را عمیقاً دوست داشت و دنبال هر راهی می‌گشت که نگهش دارد.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
