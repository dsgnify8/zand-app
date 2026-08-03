# -*- coding: utf-8 -*-
# Mohammad Reza Shah, fourteenth batch: the last years and the revolution
# gathering. Same framing the modern chapter uses for these months.

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
 ("To the world he still stood at the peak of his power. Beneath it, the ground was beginning to shift.",
  'در چشم جهان هنوز در اوج قدرتش ایستاده بود. زیر پایش اما، زمین داشت می‌لرزید.'),

 ("The gathering storm", 'توفانی که جمع می‌شد'),

 ("By the late 1970s pressure was building on every side. Abroad, a new American president, Jimmy Carter, pressed him on human rights, and the Shah, hoping to please his ally and soften his image, loosened some of the controls that had held the country tight. Into that small opening rushed years of pent up grievance.",
  'تا اواخر دههٔ ۵۰، فشار از هر سو بالا می‌رفت. در بیرون، رئیس‌جمهور تازهٔ آمریکا، جیمی کارتر، در زمینهٔ حقوق بشر بر او فشار می‌آورد، و شاه به امید راضی کردن متحدش و نرم کردن چهره‌اش، بخشی از کنترل‌هایی را که کشور را سفت نگه داشته بود شل کرد. از همان روزنهٔ کوچک، سال‌ها نارضایتی انباشته بیرون زد.'),

 ("Through 1978 the discontent gathered into a vast movement that crossed every line. Religious and secular, left and right, bazaar merchant and university student, they agreed on little except that the throne must go. Protests grew, met by crackdowns, and each death fed the next in a rising cycle the government could not break.",
  'در طول سال ۱۳۵۷، این نارضایتی به جنبشی گسترده بدل شد که از هر مرزی گذشت. مذهبی و غیرمذهبی، چپ و راست، بازاری و دانشجو، بر سر چیزی توافق نداشتند جز اینکه این تخت باید برود. اعتراض‌ها بزرگ شد و با سرکوب پاسخ گرفت، و هر کشته، کشتهٔ بعدی را در چرخه‌ای فزاینده تغذیه کرد که دولت نتوانست بشکندش.'),

 ("Khomeini's voice", 'صدای خمینی'),

 ("From his exile, at last in a suburb of Paris, the Ayatollah Khomeini became the single voice around which the revolution turned. His sermons, recorded on cassette tapes, were smuggled into Iran and passed hand to hand, played in mosques and homes across the country, calling without compromise for the Shah to go.",
  'از تبعید، که سرانجام در حومهٔ پاریس بود، آیت‌الله خمینی به تنها صدایی بدل شد که انقلاب گرد آن می‌چرخید. سخنرانی‌هایش روی نوار کاست ضبط می‌شد، قاچاقی به ایران می‌رسید و دست به دست می‌گشت، در مسجدها و خانه‌های سراسر کشور پخش می‌شد، و بی‌هیچ مصالحه‌ای رفتن شاه را می‌خواست.'),

 ("Uncompromising where others wavered, he offered not reform but the end of the monarchy itself, and to a nation weary of one man's rule, that clarity proved magnetic. The more the Shah offered, the more the streets demanded, until nothing short of his departure would satisfy them.",
  'آنجا که دیگران تردید داشتند او کوتاه نمی‌آمد؛ نه اصلاحات، که پایان خودِ پادشاهی را پیشنهاد می‌کرد، و برای ملتی که از حکومت یک نفر خسته بود، این صراحت جذاب از آب درآمد. هرچه شاه بیشتر پیشنهاد می‌داد، خیابان بیشتر می‌خواست، تا جایی که چیزی جز رفتن او راضی‌شان نمی‌کرد.'),

 ("A wavering king", 'شاهی که مردد بود'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
