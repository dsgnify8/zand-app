# -*- coding: utf-8 -*-
# Modern Iran, the rest of chapter one: SAVAK, the year it broke, and the
# Shah's departure. Iranian dates for the events that have Iranian names:
# جمعهٔ سیاه, ۲۶ دی ۱۳۵۷, ۱۲ بهمن, ۲۲ بهمن.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'markline', x: 'Exile removed him from Iran. It did not remove him from Iranian ears.' }",
  "{ t: 'markline', x: 'Exile removed him from Iran. It did not remove him from Iranian ears.', fa: 'تبعید او را از ایران بیرون برد. از گوش ایرانی‌ها بیرون نبرد.' }"),

 ("{ t: 'p', x: 'Political life in those years ran within limits. SAVAK, the national intelligence and security organisation founded in 1957, handled internal security and counter-intelligence, and open opposition movements operated with difficulty. Religious spaces, meanwhile, kept their own life and their own gatherings, which is part of why the mosque networks proved so effective when 1978 came.' }",
  "{ t: 'p', x: 'Political life in those years ran within limits. SAVAK, the national intelligence and security organisation founded in 1957, handled internal security and counter-intelligence, and open opposition movements operated with difficulty. Religious spaces, meanwhile, kept their own life and their own gatherings, which is part of why the mosque networks proved so effective when 1978 came.', fa: 'زندگی سیاسی در آن سال‌ها در چارچوب مشخصی جریان داشت. ساواک، سازمان اطلاعات و امنیت کشور که در سال ۱۳۳۵ تأسیس شد، کار امنیت داخلی و ضداطلاعات را بر عهده داشت، و جریان‌های مخالفِ علنی به‌سختی می‌توانستند فعالیت کنند. در همان حال، فضاهای مذهبی زندگی و مجالس خودشان را داشتند، و همین یکی از دلایلی است که شبکهٔ مسجدها در سال ۱۳۵۶ این‌قدر کارآمد از آب درآمد.' }"),

 ("{ t: 'h', x: 'The year it broke' }",
  "{ t: 'h', x: 'The year it broke', fa: 'سالی که همه‌چیز شکست' }"),

 ("{ t: 'p', x: 'In January 1978 a newspaper article attacking Khomeini prompted protests in Qom. In Shia practice the dead are mourned again on the fortieth day, so each funeral produced another gathering forty days later, and each gathering produced the next. The cycle ran through the year and grew each time.' }",
  "{ t: 'p', x: 'In January 1978 a newspaper article attacking Khomeini prompted protests in Qom. In Shia practice the dead are mourned again on the fortieth day, so each funeral produced another gathering forty days later, and each gathering produced the next. The cycle ran through the year and grew each time.', fa: 'در دی ۱۳۵۶، مقاله‌ای در یک روزنامه که به خمینی حمله کرده بود، اعتراض‌هایی را در قم برانگیخت. در آیین شیعه چهلم مرده را می‌گیرند، پس هر تشییع، چهل روز بعد گردهمایی تازه‌ای می‌ساخت، و هر گردهمایی، گردهمایی بعدی را. این چرخه تمام سال ادامه یافت و هر بار بزرگ‌تر شد.' }"),

 ("{ t: 'p', x: 'On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it a negotiated settlement was much harder to reach. Strikes spread through the oil industry, the bazaar and the civil service. By December the country had largely stopped working.' }",
  "{ t: 'p', x: 'On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it a negotiated settlement was much harder to reach. Strikes spread through the oil industry, the bazaar and the civil service. By December the country had largely stopped working.', fa: 'در ۱۷ شهریور ۱۳۵۷، در میدان ژاله تهران، نظامیان به روی تظاهراتی بزرگ آتش گشودند. آن روز به جمعهٔ سیاه معروف شد، و پس از آن رسیدن به توافق بسیار سخت‌تر شد. اعتصاب در صنعت نفت، در بازار و در ادارات دولتی گسترش یافت. تا آذر، کشور تقریباً از کار افتاده بود.' }"),

 ("{ t: 'p', x: 'On 16 January 1979 the Shah left Iran. Photographs from that morning show him weeping on the tarmac, something no one had seen from him before. He had spent thirty-seven years on the throne and had built much of what stood around him, and he left rather than remain somewhere he was no longer wanted, and rather than turn the army fully on the crowds.' }",
  "{ t: 'p', x: 'On 16 January 1979 the Shah left Iran. Photographs from that morning show him weeping on the tarmac, something no one had seen from him before. He had spent thirty-seven years on the throne and had built much of what stood around him, and he left rather than remain somewhere he was no longer wanted, and rather than turn the army fully on the crowds.', fa: 'در ۲۶ دی ۱۳۵۷، شاه از ایران رفت. عکس‌های آن روز صبح او را در حال گریه روی باند فرودگاه نشان می‌دهند؛ چیزی که پیش از آن کسی از او ندیده بود. سی و هفت سال بر تخت نشسته بود و بخش بزرگی از آنچه دور و برش ایستاده بود را خودش ساخته بود، و رفت؛ به جای آنکه در جایی بماند که دیگر خواسته نمی‌شد، و به جای آنکه ارتش را تمام‌قد به روی مردم بیاورد.' }"),

 ("{ t: 'quotebig', x: 'He did not fall in a battle. He walked out of a country that had stopped seeing him.' }",
  "{ t: 'quotebig', x: 'He did not fall in a battle. He walked out of a country that had stopped seeing him.', fa: 'در نبردی سقوط نکرد. از کشوری بیرون رفت که دیگر او را نمی‌دید.' }"),

 ("{ t: 'p', x: 'On 1 February Khomeini flew into Tehran and several million people came out to meet him. In April a referendum was held on becoming an Islamic republic, and the result was overwhelming.' }",
  "{ t: 'p', x: 'On 1 February Khomeini flew into Tehran and several million people came out to meet him. In April a referendum was held on becoming an Islamic republic, and the result was overwhelming.', fa: 'در ۱۲ بهمن، خمینی به تهران آمد و چند میلیون نفر به استقبالش رفتند. در فروردین، همه‌پرسی‌ای برای تبدیل شدن به جمهوری اسلامی برگزار شد و نتیجه‌اش قاطع بود.' }"),

 ("{ t: 'p', x: 'One thing about that moment is often forgotten. The coalition that removed the monarchy was extremely broad: communists, liberal nationalists, bazaar merchants, students, clerics, and a great many people with no politics at all who simply wanted something different. Within two years it was not broad at all. What happened in between is the next chapter.' }",
  "{ t: 'p', x: 'One thing about that moment is often forgotten. The coalition that removed the monarchy was extremely broad: communists, liberal nationalists, bazaar merchants, students, clerics, and a great many people with no politics at all who simply wanted something different. Within two years it was not broad at all. What happened in between is the next chapter.', fa: 'یک نکته دربارهٔ آن لحظه معمولاً از یاد می‌رود. ائتلافی که پادشاهی را برانداخت بسیار گسترده بود: کمونیست‌ها، ملی‌گرایان لیبرال، بازاری‌ها، دانشجویان، روحانیان، و شمار زیادی آدم بی‌ارتباط با سیاست که فقط چیز دیگری می‌خواستند. دو سال بعد، دیگر اصلاً گسترده نبود. آنچه در این فاصله گذشت، موضوع فصل بعد است.' }"),
]

mi_scope.apply(PAIRS)
