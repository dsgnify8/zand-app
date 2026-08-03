# -*- coding: utf-8 -*-
# Mohammad Reza Shah: image captions, fact rows, and the list blocks.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

def cap_pairs(en, fa):
    out = []
    for q in ('"', "'"):
        esc = en.replace("'", "\\'") if q == "'" else en
        a = 'cap: ' + q + esc + q
        out.append((a, a + ", capFa: '" + fa + "'"))
    return out

CAPS = [
 ("The young prince with his father, Reza Shah, the founder of the dynasty.",
  'ولیعهد خردسال در کنار پدرش، رضاشاه، بنیان‌گذار سلسله.'),
 ("The crown prince, farthest to the left, during his years at the Institut Le Rosey in Switzerland.",
  'ولیعهد، در انتهای سمت چپ، در سال‌های تحصیلش در مدرسهٔ لوروزه سوئیس.'),
 ("The crown prince, shaped by two worlds, returns home to serve Iran.",
  'ولیعهد، که دو جهان شکلش داده بودند، برای خدمت به ایران به وطن بازمی‌گردد.'),
 ("Mohammad Reza and Queen Fawzia in the early years of their marriage.",
  'محمدرضا و ملکه فوزیه در سال‌های نخست ازدواجشان.'),
 ("Reza Shah, who abdicated in 1941 so the dynasty might endure through his son.",
  'رضاشاه، که در سال ۱۳۲۰ کناره گرفت تا سلسله از راه پسرش دوام بیاورد.'),
 ("The young Mohammad Reza Pahlavi, the new king of Iran.",
  'محمدرضا پهلوی جوان، شاه تازهٔ ایران.'),
 ("The young Shah in the early years of his reign, finding his footing as king.",
  'شاه جوان در سال‌های نخست سلطنتش، در حال یافتن جای پای خود.'),
 ("The Shah and Soraya, whose marriage was, by every account, a true love match.",
  'شاه و ثریا، که ازدواجشان به گواه همه از سر عشق واقعی بود.'),
 ("The Abadan refinery, once the largest in the world, at the heart of the oil dispute.",
  'پالایشگاه آبادان، که روزگاری بزرگ‌ترین پالایشگاه جهان بود، در کانون اختلاف نفت.'),
 ("Mohammad Mossadegh, the nationalist prime minister who nationalized Iran's oil.",
  'محمد مصدق، نخست‌وزیر ملی‌گرا که صنعت نفت ایران را ملی کرد.'),
 ("The wedding of Mohammad Reza and Farah, 1959. Tap to watch.",
  'مراسم ازدواج محمدرضا و فرح، ۱۳۳۸. برای تماشا بزن.'),
 ("The Shah with his son, Crown Prince Reza Pahlavi.",
  'شاه در کنار پسرش، ولیعهد رضا پهلوی.'),
 ("A thriving, modernizing Iran during the years of the Great Civilization.",
  'ایرانی شکوفا و رو به مدرن شدن، در سال‌های «تمدن بزرگ».'),
 ("The coronation of 1967. The Shah crowned himself, then Farah as Shahbanou.",
  'تاج‌گذاری سال ۱۳۴۶. شاه ابتدا تاج را بر سر خود گذاشت، سپس فرح را شهبانو کرد.'),
 ("The 2,500 year celebration at Persepolis, 1971. Tents, banquets, and a parade of Iran through the ages.",
  'جشن‌های دو هزار و پانصد ساله در تخت جمشید، ۱۳۵۰. چادرها، ضیافت‌ها، و رژهٔ ایران در گذر روزگاران.'),
 ("The tomb of Cyrus the Great at Pasargadae, honored at the heart of the celebration.",
  'آرامگاه کوروش بزرگ در پاسارگاد، که در قلب این جشن‌ها گرامی داشته شد.'),
 ("The boom years transformed Iran's cities at a breathless pace.",
  'سال‌های رونق، شهرهای ایران را با شتابی نفس‌گیر دگرگون کرد.'),
 ("In exile, the Shah reflects on his reign and his departure. Tap to watch.",
  'شاه در تبعید، دربارهٔ سلطنت و رفتنش سخن می‌گوید. برای تماشا بزن.'),
 ("The seizure of the American embassy in Tehran, November 1979.",
  'تسخیر سفارت آمریکا در تهران، آبان ۱۳۵۸.'),
 ("The Shah's tomb at the Al Rifa'i Mosque in Cairo, where he rests in exile.",
  'آرامگاه شاه در مسجد الرفاعی قاهره، جایی که در تبعید آرمیده است.'),
]

PAIRS = []
for en, fa in CAPS:
    PAIRS.extend(cap_pairs(en, fa))

# facts
PAIRS += [
 ("label: 'Born', value: '26 October 1919, Tehran'",
  "label: 'Born', labelFa: 'زادروز', value: '26 October 1919, Tehran', valueFa: '۴ آبان ۱۲۹۸، تهران'"),
 ("label: 'First marriage', value: 'Princess Fawzia of Egypt, 1939'",
  "label: 'First marriage', labelFa: 'نخستین ازدواج', value: 'Princess Fawzia of Egypt, 1939', valueFa: 'شاهزاده فوزیهٔ مصر، ۱۳۱۸'"),
 ("label: 'The dynasty secured', value: 'Crown Prince Reza born, 31 Oct 1960'",
  "label: 'The dynasty secured', labelFa: 'سلسله تضمین شد', value: 'Crown Prince Reza born, 31 Oct 1960', valueFa: 'تولد ولیعهد رضا، ۹ آبان ۱۳۳۹'"),
 ("label: 'Died', value: '27 July 1980, Cairo'",
  "label: 'Died', labelFa: 'درگذشت', value: '27 July 1980, Cairo', valueFa: '۵ مرداد ۱۳۵۹، قاهره'"),

 # timeline
 ("{ year: '1878', label: 'Reza Khan born' }",
  "{ year: '1878', yearFa: '۱۲۵۷', label: 'Reza Khan born', labelFa: 'تولد رضاخان' }"),
 ("{ year: '1919', label: 'Mohammad Reza born' }",
  "{ year: '1919', yearFa: '۱۲۹۸', label: 'Mohammad Reza born', labelFa: 'تولد محمدرضا' }"),
 ("{ year: '1921', label: 'The coup' }",
  "{ year: '1921', yearFa: '۱۲۹۹', label: 'The coup', labelFa: 'کودتا' }"),
 ("{ year: '1925', label: 'Pahlavi dynasty founded' }",
  "{ year: '1925', yearFa: '۱۳۰۴', label: 'Pahlavi dynasty founded', labelFa: 'بنیان‌گذاری سلسلهٔ پهلوی' }"),

 # stat
 ("{ value: '1931', label: 'Arrived in Switzerland' }",
  "{ value: '1931', valueFa: '۱۳۱۰', label: 'Arrived in Switzerland', labelFa: 'ورود به سوئیس' }"),
 ("{ value: '5 yrs', label: 'Abroad at Le Rosey' }",
  "{ value: '5 yrs', valueFa: '۵ سال', label: 'Abroad at Le Rosey', labelFa: 'دور از وطن، در لوروزه' }"),
 ("{ value: 'French', label: 'A second language' }",
  "{ value: 'French', valueFa: 'فرانسه', label: 'A second language', labelFa: 'زبان دوم' }"),

 # circles
 ("{ value: 'Land', label: 'Land reform for peasants' }",
  "{ value: 'Land', valueFa: 'زمین', label: 'Land reform for peasants', labelFa: 'اصلاحات ارضی برای روستاییان' }"),
 ('{ value: \'Vote\', label: "Women\'s suffrage" }',
  '{ value: \'Vote\', valueFa: \'رأی\', label: "Women\'s suffrage", labelFa: \'حق رأی زنان\' }'),
 ("{ value: 'Read', label: 'Literacy Corps' }",
  "{ value: 'Read', valueFa: 'سواد', label: 'Literacy Corps', labelFa: 'سپاه دانش' }"),
 ("{ value: 'Share', label: 'Profit sharing' }",
  "{ value: 'Share', valueFa: 'سهم', label: 'Profit sharing', labelFa: 'سهیم شدن در سود' }"),

 # boxes
 ("{ title: 'The crown', x: 'A dynasty required a male heir to secure the succession.' }",
  "{ title: 'The crown', titleFa: 'تاج', x: 'A dynasty required a male heir to secure the succession.', fa: 'یک سلسله برای تضمین جانشینی به ولیعهد پسر نیاز داشت.' }"),
 ("{ title: 'His heart', x: 'By every account he was truly in love with Soraya.' }",
  "{ title: 'His heart', titleFa: 'دلش', x: 'By every account he was truly in love with Soraya.', fa: 'به گواه همه، واقعاً عاشق ثریا بود.' }"),
 ("{ title: 'The clergy', x: 'A second wife or a change of succession met resistance.' }",
  "{ title: 'The clergy', titleFa: 'روحانیت', x: 'A second wife or a change of succession met resistance.', fa: 'گرفتن همسر دوم یا تغییر خط جانشینی با مقاومت روبه‌رو شد.' }"),
 ("{ title: 'The choice', x: 'In the end, duty was made to outweigh love.' }",
  "{ title: 'The choice', titleFa: 'انتخاب', x: 'In the end, duty was made to outweigh love.', fa: 'در پایان، کاری کردند که وظیفه بر عشق بچربد.' }"),
]

mrp_scope.apply(PAIRS)
