# -*- coding: utf-8 -*-
# Mohammad Reza Shah, thirteenth batch: the 1973 oil money, the strain,
# and the Rastakhiz party. حزب رستاخیز.

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
 ("A flood of oil wealth", 'سیل ثروت نفتی'),

 ("In 1973 the price of oil roughly quadrupled almost overnight, and Iran was suddenly awash in wealth beyond imagining. The Shah, long an advocate of higher prices, saw his moment and seized it. He would reach his Great Civilization not in a generation, he declared, but in years.",
  'در سال ۱۳۵۲ قیمت نفت تقریباً یک‌شبه چهار برابر شد، و ایران ناگهان در ثروتی فراتر از تصور غرق شد. شاه که مدت‌ها طرفدار بالا بردن قیمت بود، لحظه‌اش را دید و از دستش نداد. اعلام کرد که به «تمدن بزرگ» نه در یک نسل، که در چند سال خواهد رسید.'),

 ("He spent boldly, on heavy industry, a modern army, nuclear plants, and grand projects, determined to vault Iran into the front rank of nations in a single leap.",
  'جسورانه خرج کرد؛ صنایع سنگین، ارتشی مدرن، نیروگاه هسته‌ای، و پروژه‌های بزرگ، با این عزم که ایران را با یک جهش به صف نخست ملت‌ها برساند.'),

 ("More money than the country could absorb", 'پولی بیشتر از آنکه کشور جذبش کند'),

 ("But money moved faster than the nation could take it in. The ports choked with goods that rotted before they could be unloaded, inflation surged, and rents soared. The gap between rich and poor widened, and villagers pouring into the cities for work found crowding and disappointment instead.",
  'اما پول سریع‌تر از آن حرکت می‌کرد که کشور بتواند جذبش کند. بندرها از کالاهایی پر شد که پیش از تخلیه فاسد می‌شدند، تورم بالا گرفت، و اجاره‌بها سر به فلک کشید. فاصلهٔ فقیر و غنی بیشتر شد، و روستاییانی که برای کار به شهرها سرازیر می‌شدند، به جای کار با ازدحام و سرخوردگی روبه‌رو شدند.'),

 ("The rapid change unsettled traditional life, and a quiet resentment gathered beneath the glittering surface of progress. Many who had once felt loyalty to the crown began, without quite saying so, to feel left behind by it.",
  'این تغییر شتابان، زندگی سنتی را به هم ریخت، و کینه‌ای خاموش زیر سطح درخشان پیشرفت جمع شد. بسیاری که روزگاری به سلطنت وفادار بودند، بی‌آنکه صریح بگویندش، کم‌کم حس کردند از قافله جا مانده‌اند.'),

 ("One party, and a hidden illness", 'یک حزب، و بیماری‌ای پنهان'),

 ("In 1975 the Shah made a fateful error of judgment. He abolished the existing parties and folded the nation's politics into a single party, the Rastakhiz, and declared that any Iranian who would not join it should take a passport and leave. Meant to unify, it instead alienated many who had felt, until then, a quiet loyalty to their king.",
  'در سال ۱۳۵۳ شاه اشتباه سرنوشت‌سازی در قضاوت کرد. احزاب موجود را منحل کرد و تمام سیاست کشور را در یک حزب واحد جمع کرد، حزب رستاخیز، و اعلام کرد هر ایرانی که نخواهد به آن بپیوندد، پاسپورتش را بگیرد و برود. قرار بود یکپارچگی بیاورد؛ به جایش بسیاری را از خود راند که تا آن روز وفاداری‌ای خاموش به شاهشان داشتند.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
