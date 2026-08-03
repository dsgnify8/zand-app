# -*- coding: utf-8 -*-
# Mohammad Reza Shah, sixth batch: Azerbaijan resolved, the university
# shooting, and Soraya. ۲۱ آذر, حزب توده, ثریا اسفندیاری.

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

 ("Through patient diplomacy, pressure at the newly formed United Nations, and a promise of oil concessions that was later quietly withdrawn, Iran secured the Soviet withdrawal. In December 1946 the Iranian army marched back into Tabriz, and the country was made whole again.",
  'با دیپلماسی صبورانه، فشار در سازمان ملل که تازه تأسیس شده بود، و وعدهٔ امتیاز نفتی که بعدها بی‌سروصدا پس گرفته شد، ایران خروج نیروهای شوروی را به دست آورد. در آذر ۱۳۲۵ ارتش ایران به تبریز بازگشت و کشور دوباره یکپارچه شد.'),

 ("For a king still unsure of himself, it was a formative victory. He rode north to the reclaimed provinces to cheering crowds, and for the first time felt the throne truly his.",
  'برای شاهی که هنوز به خودش مطمئن نبود، این پیروزی شکل‌دهنده بود. به شمال و به استان‌های بازپس‌گرفته‌شده رفت و مردم به شادی به استقبالش آمدند، و برای نخستین بار حس کرد این تخت واقعاً مال اوست.'),

 ("The Shot at the University", 'تیراندازی در دانشگاه'),

 ("In February 1949, at a ceremony at Tehran University, a gunman hidden among the press drew a pistol and fired at close range. Several bullets struck near his face, one passing through his military cap, yet he walked away with only minor wounds. The assassin was shot dead on the spot.",
  'در بهمن ۱۳۲۷، در مراسمی در دانشگاه تهران، ضاربی که میان خبرنگاران پنهان شده بود اسلحه کشید و از فاصلهٔ نزدیک شلیک کرد. چند گلوله نزدیک صورتش نشست و یکی از کلاه نظامی‌اش گذشت، اما تنها با جراحتی سطحی از آنجا بیرون آمد. ضارب همان‌جا کشته شد.'),

 ("He took the escape as another sign that providence was guarding him for his mission. In its aftermath the government blamed the plot on the communist Tudeh party, banned it, and moved to strengthen the powers of the crown, creating a senate and widening the king's authority.",
  'جان سالم به در بردن را نشانهٔ دیگری دانست از اینکه تقدیر او را برای رسالتش نگه داشته است. پس از آن، دولت حزب تودهٔ کمونیست را عامل توطئه دانست، آن را ممنوع کرد، و به تقویت اختیارات سلطنت پرداخت؛ مجلس سنا تشکیل شد و دامنهٔ قدرت شاه گسترده‌تر شد.'),

 ("A new love", 'عشقی تازه'),

 ("His personal life was shifting too. His marriage to Fawzia had grown cold, and in 1948 it ended in divorce. She returned to Egypt, and their daughter Shahnaz remained a bond between the two royal families.",
  'زندگی شخصی‌اش هم داشت تغییر می‌کرد. ازدواجش با فوزیه سرد شده بود و در سال ۱۳۲۷ به طلاق انجامید. فوزیه به مصر بازگشت، و دخترشان شهناز پیوندی میان دو خاندان سلطنتی باقی ماند.'),

 ("In 1951 he married Soraya Esfandiary, a young woman of Iranian and German parentage, barely eighteen. By every account it was a genuine love match.",
  'در سال ۱۳۲۹ با ثریا اسفندیاری ازدواج کرد؛ دختری از پدری ایرانی و مادری آلمانی، که به‌زحمت هجده سال داشت. به گواه همهٔ روایت‌ها، این ازدواج از سر عشق بود.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
