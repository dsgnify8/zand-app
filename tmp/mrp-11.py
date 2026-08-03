# -*- coding: utf-8 -*-
# Mohammad Reza Shah, eleventh batch: the White Revolution and the boom.
# Same names as the modern chapter uses: انقلاب سفید, اصلاحات ارضی,
# سپاه دانش, هویدا.

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
 ("With his personal foundation finally settled, and his authority firm, the Shah turned to the great project of his reign, the remaking of Iran itself.",
  'حالا که زندگی شخصی‌اش سرانجام سر و سامان گرفته بود و اقتدارش تثبیت شده بود، شاه به پروژهٔ بزرگ دوران سلطنتش رو آورد: از نو ساختن خودِ ایران.'),

 ("In January 1963 he launched what he called the White Revolution, a sweeping program of reform from above, meant, in his words, to carry out a revolution by the throne so that none need be made against it. He put it to a national vote, and it passed overwhelmingly.",
  'در بهمن ۱۳۴۱ برنامه‌ای را آغاز کرد که نامش را «انقلاب سفید» گذاشت؛ مجموعه‌ای گسترده از اصلاحات از بالا، که به گفتهٔ خودش قرار بود انقلابی به دست سلطنت باشد تا نیازی به انقلابی علیه آن نماند. آن را به همه‌پرسی گذاشت و با اکثریتی قاطع تصویب شد.'),

 ("Great estates were broken up and their land given to peasants who had never owned the soil they worked. Women won the right to vote and to stand for office. A Literacy Corps of young conscripts went out to teach reading in the villages, and health and development programs followed.",
  'با اصلاحات ارضی، املاک بزرگ تقسیم شد و زمینشان به روستاییانی رسید که هرگز مالک خاکی که رویش کار می‌کردند نبودند. زنان حق رأی و حق نامزد شدن گرفتند. سپاه دانش، متشکل از سربازان جوان، برای سوادآموزی به روستاها رفت، و برنامه‌های بهداشت و عمران هم پس از آن آمد.'),

 ("In his books the Shah described these years as the very heart of his mission, to lift the peasantry, to modernize the nation, and to bind its people directly to the crown that had freed them. To millions it was real and visible progress, and his popularity soared.",
  'شاه در کتاب‌هایش این سال‌ها را قلب رسالتش توصیف کرد: بالا بردن روستاییان، مدرن کردن کشور، و پیوند دادن مستقیم مردم به سلطنتی که آزادشان کرده بود. برای میلیون‌ها نفر این پیشرفتی واقعی و دیدنی بود، و محبوبیتش بالا گرفت.'),

 ("In June 1963 Khomeini's denunciations sparked days of violent protest. They were suppressed by force, and in 1964 he was sent into exile, where he would wait, and watch, for fifteen years. A reform meant to unite the country had also drawn the battle lines of its future.",
  'در خرداد ۱۳۴۲، سخنان کوبندهٔ خمینی چند روز اعتراض خشونت‌بار به دنبال آورد. با زور سرکوب شد، و در سال ۱۳۴۳ او به تبعید فرستاده شد؛ جایی که پانزده سال منتظر ماند و تماشا کرد. اصلاحاتی که قرار بود کشور را یکپارچه کند، خط مقدم آیندهٔ آن را هم ترسیم کرد.'),

 ("These were the years of the throne at its height. Oil revenue climbed, factories rose, universities filled, and the Shah's confidence grew with his country's. In 1965, after his prime minister was assassinated by a young radical, Amir Abbas Hoveyda took office and would serve for nearly thirteen years, the steady hand of the boom.",
  'این‌ها سال‌های اوج سلطنت بود. درآمد نفت بالا رفت، کارخانه‌ها ساخته شد، دانشگاه‌ها پر شد، و اعتمادبه‌نفس شاه همراه با کشورش بالا رفت. در سال ۱۳۴۴، پس از ترور نخست‌وزیرش به دست جوانی تندرو، امیرعباس هویدا به این مقام رسید و نزدیک سیزده سال ماند؛ دست باثبات دوران رونق.'),

 ("The Shah now ruled with a firm grip. He guided the great decisions himself, from oil to industry to the army, and Iran began to carry real weight in the world, courted by East and West alike for its stability and its oil.",
  'شاه حالا با دستی محکم حکومت می‌کرد. تصمیم‌های بزرگ را خودش می‌گرفت، از نفت تا صنعت تا ارتش، و ایران در جهان وزنی واقعی پیدا کرد؛ شرق و غرب هر دو به خاطر ثبات و نفتش به سراغش می‌آمدند.'),

 ("A crown earned and worn with pride", 'تاجی که به دست آمد و با سربلندی بر سر ماند'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
