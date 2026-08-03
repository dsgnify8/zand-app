# -*- coding: utf-8 -*-
# Mohammad Reza Shah: the seven call blocks. Two of these are the most
# carefully balanced passages in the topic — «حقیقت، ساده و روشن» on 1953
# and «دست دیگران» on his belief about betrayal. The Persian keeps their
# hedging exactly: تاریخ‌نگاران بر سر آن اختلاف دارند.

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

TITLES = [
 ("title: 'A weight placed early'", "title: 'A weight placed early', titleFa: 'باری که زود بر دوشش گذاشتند'"),
 ("title: 'A belief in destiny'", "title: 'A belief in destiny', titleFa: 'باور به تقدیر'"),
 ("title: 'The truth, plainly'", "title: 'The truth, plainly', titleFa: 'حقیقت، ساده و روشن'"),
 ("title: 'The seeds of opposition'", "title: 'The seeds of opposition', titleFa: 'بذرهای مخالفت'"),
 ("title: 'The other side'", "title: 'The other side', titleFa: 'روی دیگر'"),
 ("title: 'A secret carried alone'", "title: 'A secret carried alone', titleFa: 'رازی که تنها حملش می‌کرد'"),
 ("title: 'The hands of others'", "title: 'The hands of others', titleFa: 'دست دیگران'"),
]

ITEMS = [
 ("He was raised not as a child but as a future king. It gave him a deep sense of duty, and also a lifelong, sometimes anxious wish to earn the approval of the formidable man who had made him crown prince.",
  'او را نه مثل یک بچه، که مثل شاه آینده بار آوردند. این به او حس عمیقی از وظیفه داد، و در کنارش آرزویی مادام‌العمر و گاه مضطرب برای به دست آوردن تأیید همان مرد مهیبی که ولیعهدش کرده بود.'),

 ("More than once in his life the Shah brushed against death and walked away. He came to see these escapes as signs of a divine mission. This is his own account of himself, offered here to understand how he saw his role, and how that certainty shaped the choices he made.",
  'شاه بیش از یک بار در زندگی‌اش از کنار مرگ گذشت و سالم بیرون آمد. کم‌کم این جان به در بردن‌ها را نشانهٔ رسالتی الهی دانست. این روایت خودش از خودش است، و اینجا آورده شده تا بفهمیم نقش خود را چگونه می‌دید، و آن یقین چگونه انتخاب‌هایش را شکل داد.'),

 ("Unable to break Mossadegh alone, Britain turned to the United States. Fearing that a weakened Iran might fall to communism, President Eisenhower approved a covert operation, known to the Americans as Ajax and to the British as Boot. Run by the CIA's Kermit Roosevelt with British intelligence, it funded street gangs, bribed officers and newspapers, and prepared to remove the prime minister.",
  'بریتانیا که به‌تنهایی از پس مصدق برنمی‌آمد، به آمریکا رو آورد. رئیس‌جمهور آیزنهاور که نگران بود ایرانِ ناتوان به دامان کمونیسم بیفتد، عملیاتی پنهانی را تأیید کرد؛ آمریکایی‌ها آن را آژاکس می‌خواندند و بریتانیایی‌ها بوت. این عملیات را کرمیت روزولت از سیا با همکاری سرویس اطلاعاتی بریتانیا اداره می‌کرد؛ به اراذل خیابانی پول رساند، به افسران و روزنامه‌ها رشوه داد، و زمینهٔ برکناری نخست‌وزیر را فراهم کرد.'),

 ("But the reforms made powerful enemies. Landowners lost their estates, and part of the clergy opposed the changes, above all the land reform and the new rights for women. Among the fiercest voices was a cleric named Ruhollah Khomeini.",
  'اما این اصلاحات دشمنان نیرومندی تراشید. زمین‌داران املاکشان را از دست دادند، و بخشی از روحانیت با این تغییرها مخالفت کرد؛ بیش از همه با اصلاحات ارضی و با حقوق تازهٔ زنان. یکی از تندترین صداها، روحانی‌ای بود به نام روح‌الله خمینی.'),

 ("But the same drive that built roads, dams, and universities also left little room for dissent. Organized opposition was not permitted, the press was closely controlled, and the intelligence service, SAVAK, watched critics with a heavy hand. The nation was being modernized swiftly, but from above, and the space for those who disagreed grew narrow. It was a tension that would matter greatly in the end.",
  'اما همان نیرویی که جاده و سد و دانشگاه ساخت، جای چندانی برای مخالفت باقی نگذاشت. مخالفت سازمان‌یافته اجازه نداشت، مطبوعات به‌دقت کنترل می‌شد، و ساواک، سازمان اطلاعات، منتقدان را با دستی سنگین زیر نظر داشت. کشور سریع مدرن می‌شد، اما از بالا، و فضا برای کسانی که موافق نبودند تنگ‌تر شد. این تنشی بود که در پایان بسیار مهم از آب درآمد.'),

 ("Privately, the Shah was gravely ill. In 1974 French doctors had diagnosed a form of cancer, and he kept it secret for years, even from Farah. The illness, and the treatments that dulled and tired him, quietly drained the decisiveness that his hardest hour, now approaching, would demand of him.",
  'در خلوت، شاه به‌سختی بیمار بود. در سال ۱۳۵۳ پزشکان فرانسوی نوعی سرطان را در او تشخیص داده بودند، و او سال‌ها این را پنهان نگه داشت، حتی از فرح. این بیماری، و درمان‌هایی که کرختش می‌کرد و از پا می‌انداختش، بی‌سروصدا همان قاطعیتی را از او گرفت که سخت‌ترین ساعت زندگی‌اش، که داشت نزدیک می‌شد، از او می‌طلبید.'),

 ("He came to believe, and wrote at length, that foreign powers had turned against him, that the same Western allies he had served now abandoned him or worked for his fall. Historians debate how far this is so. What is clear is that by early 1979 he stood almost alone, ill, exhausted, and out of choices.",
  'به این باور رسید، و مفصل هم نوشتش، که قدرت‌های خارجی علیه او برگشته‌اند؛ که همان متحدان غربی‌ای که به آنها خدمت کرده بود حالا یا رهایش کرده‌اند یا برای سقوطش کار می‌کنند. تاریخ‌نگاران بر سر اینکه این تا چه اندازه درست است اختلاف دارند. آنچه روشن است این است که تا اوایل سال ۱۳۵۷، او تقریباً تنها ایستاده بود؛ بیمار، فرسوده، و بی‌هیچ انتخابی.'),
]

PAIRS = list(TITLES)
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
