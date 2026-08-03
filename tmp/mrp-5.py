# -*- coding: utf-8 -*-
# Mohammad Reza Shah, fifth batch: the young king, Tehran conference,
# and the Azerbaijan crisis. ۲۵ شهریور ۱۳۲۰, کنفرانس تهران, غائلهٔ آذربایجان.

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
 ("Mohammad Reza Pahlavi becomes king", 'محمدرضا پهلوی شاه می‌شود'),

 ("On 16 September 1941, at just twenty one, Mohammad Reza Pahlavi took the throne. He became king in a capital full of foreign soldiers, with real power resting, for now, in the parliament and in the Allied armies.",
  'در ۲۵ شهریور ۱۳۲۰، در بیست و یک سالگی، محمدرضا پهلوی بر تخت نشست. در پایتختی شاه شد که پر از سرباز خارجی بود، و قدرت واقعی، دست‌کم فعلاً، در مجلس و در دست ارتش‌های متفقین بود.'),

 ("Before parliament he swore to uphold the constitution, and he presented himself, at first, as a modest and careful constitutional monarch, a deliberate contrast to his father's absolute rule. He would spend years quietly gathering the authority that his crown, in these early days, did not yet hold.",
  'در برابر مجلس سوگند خورد که قانون اساسی را پاس بدارد، و در آغاز خود را پادشاهی مشروطه و محتاط نشان داد؛ تضادی عامدانه با حکومت مطلق پدرش. سال‌ها بی‌سروصدا اختیاراتی را جمع کرد که تاج او در آن روزهای اول هنوز نداشت.'),

 ("He had inherited a throne, but not yet the power that came with it.",
  'تخت را به ارث برده بود، اما قدرتی را که با آن می‌آید هنوز نه.'),

 ("In 1943 Tehran hosted Churchill, Roosevelt, and Stalin, who settled the course of the war in his own capital while the young Shah looked on from its edges. He met the three leaders, but the great decisions were made around him, not by him, and the humiliation lodged deep.",
  'در سال ۱۳۲۲، تهران میزبان چرچیل و روزولت و استالین بود؛ آنها مسیر جنگ را در پایتخت خودِ او تعیین کردند و شاه جوان از حاشیه تماشا کرد. با هر سه رهبر دیدار کرد، اما تصمیم‌های بزرگ دور و بر او گرفته شد، نه به دست او، و این خواری در جانش نشست.'),

 ("These lean early years taught him patience, and left him with a lasting wariness of the great powers whose armies filled his streets. He resolved that one day he would rule in fact, and not merely reign in name.",
  'آن سال‌های اول و کم‌رمق به او صبر آموخت، و بی‌اعتمادی ماندگاری نسبت به قدرت‌های بزرگی که ارتش‌هایشان خیابان‌های او را پر کرده بود در او گذاشت. با خود عهد کرد روزی در عمل حکومت کند، نه فقط به اسم پادشاه باشد.'),

 ("The Azerbaijan crisis", 'غائلهٔ آذربایجان'),

 ("The young Shah's first great test came in 1946. Soviet troops had lingered in the north after the war and backed two breakaway states, one in Azerbaijan and one in Kurdistan. For a moment it seemed Iran might be pulled apart, its northern provinces slipping out of Tehran's hands.",
  'نخستین آزمون بزرگ شاه جوان در سال ۱۳۲۵ از راه رسید. نیروهای شوروی پس از جنگ در شمال مانده بودند و از دو حکومت جدایی‌طلب پشتیبانی می‌کردند، یکی در آذربایجان و یکی در کردستان. مدتی چنین می‌نمود که ایران ممکن است از هم بپاشد و استان‌های شمالی‌اش از دست تهران در برود.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
