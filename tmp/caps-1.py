# -*- coding: utf-8 -*-
# The 22 untranslated image captions in education.ts.
# Terms match their chapters: راه‌آهن سراسری, منشور کوروش, پاسارگاد,
# وکیل, صفوی, اشکانی.

p = "constants/education.ts"
s = open(p).read()

C = [
 ("Reza Khan in his youth, before his rise through the ranks.",
  'رضاخان در جوانی، پیش از بالا رفتنش در سلسله‌مراتب نظامی.'),
 ("Reza Khan at the time of the march on Tehran, 1921.",
  'رضاخان در روزهای حرکت به سوی تهران، ۱۲۹۹.'),
 ("Reza Shah, the builder of the modern Iranian state.",
  'رضاشاه، سازندهٔ دولت مدرن ایران.'),
 ("The Trans-Iranian Railway, binding the Persian Gulf to the Caspian across 1,394 km.",
  'راه‌آهن سراسری ایران، که در ۱۳۹۴ کیلومتر خلیج فارس را به دریای خزر بست.'),
 ("Reza Shah with his children, among them the future Shah, Mohammad Reza.",
  'رضاشاه در کنار فرزندانش، و در میانشان محمدرضا، شاه آینده.'),
 ("Reza Shah with his son and heir, the young Mohammad Reza.",
  'رضاشاه با پسر و ولیعهدش، محمدرضای نوجوان.'),
 ("The young royal children, raised to serve the nation their father was building.",
  'فرزندان خردسال خاندان سلطنتی، که برای خدمت به کشوری بار می‌آمدند که پدرشان می‌ساخت.'),
 ("Cyrus the Great, founder of the Persian Empire, as imagined in later ages.",
  'کوروش بزرگ، بنیان‌گذار شاهنشاهی ایران، آن‌گونه که در روزگاران بعد تصویرش کرده‌اند.'),
 ("The conquests of Cyrus, in sequence: Media, then Lydia, then Babylon.",
  'فتوحات کوروش، به ترتیب: ماد، سپس لیدی، سپس بابل.'),
 ("The Cyrus Cylinder, on which the king recorded his acts. It survives in the British Museum.",
  'منشور کوروش، که شاه کارهایش را بر آن ثبت کرد. امروز در موزهٔ بریتانیا نگهداری می‌شود.'),
 ("The empire of Cyrus at its height, from the Aegean and Egypt to the Indus.",
  'شاهنشاهی کوروش در اوج خود، از دریای اژه و مصر تا رود سند.'),
 ("A relief from the age of the empire he founded.",
  'نقش‌برجسته‌ای از روزگار شاهنشاهی‌ای که او بنیان گذاشت.'),
 ("The tomb of Cyrus the Great at Pasargadae, which has stood for over 2,500 years.",
  'آرامگاه کوروش بزرگ در پاسارگاد، که بیش از دو هزار و پانصد سال سرِ پا مانده است.'),
 ("The remains of Pasargadae, the capital Cyrus built, still standing on the Iranian plain.",
  'بازماندهٔ پاسارگاد، پایتختی که کوروش ساخت، هنوز بر دشت ایران ایستاده.'),
 ("The Vakil Mosque and the Vakil Bazaar in Shiraz, built by Karim Khan and still in use today.",
  'مسجد وکیل و بازار وکیل در شیراز، ساختهٔ کریم‌خان، که امروز هم در استفاده‌اند.'),
 ("Shah Ismail I, founder of the Safavid dynasty, who took the throne at fourteen.",
  'شاه اسماعیل یکم، بنیان‌گذار سلسلهٔ صفوی، که در چهارده سالگی بر تخت نشست.'),
 ("The Safavids faced the great powers of their age on every frontier.",
  'صفویان در هر مرزی با قدرت‌های بزرگ روزگار خود روبه‌رو بودند.'),
 ("Shah Abbas the Great, under whom the Safavid Empire reached its height.",
  'شاه عباس بزرگ، که امپراتوری صفوی در روزگار او به اوج رسید.'),
 ("Isfahan, the capital of Shah Abbas, one of the most beautiful cities ever built.",
  'اصفهان، پایتخت شاه عباس، یکی از زیباترین شهرهایی که تاکنون ساخته شده.'),
 ("The great mosques of Isfahan, masterpieces of blue tilework raised under Shah Abbas.",
  'مسجدهای بزرگ اصفهان، شاهکارهای کاشی‌کاری آبی که در روزگار شاه عباس برپا شد.'),
]

applied, skipped = 0, []
for en, fa in C:
    a = "cap: '" + en + "'"
    if a in s:
        s = s.replace(a, a + ", capFa: '" + fa + "'", 1); applied += 1
    else:
        skipped.append(en[:45])

open(p, "w").write(s)
print("applied", applied, "of", len(C))
for k in skipped: print("   skipped:", k)
