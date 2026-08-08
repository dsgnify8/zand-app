# -*- coding: utf-8 -*-
# Rumi, sixth batch: what the sama is not, and the beginning of the
# section on how the West received him. کعبه, طواف, مولویه.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'And the turn is counterclockwise, around the heart, in the same direction as the pilgrims around the Kaaba, and the planets, and everything else that goes around a centre.' }",
  "{ t: 'p', x: 'And the turn is counterclockwise, around the heart, in the same direction as the pilgrims around the Kaaba, and the planets, and everything else that goes around a centre.', fa: 'و چرخش پادساعتگرد است، گرد قلب، در همان جهتی که حاجیان بر گرد کعبه طواف می‌کنند، و سیارات، و هر چیز دیگری که گرد مرکزی می‌گردد.' }"),

 ("{ t: 'h', x: 'What it is not' }",
  "{ t: 'h', x: 'What it is not', fa: 'چه چیزی نیست' }"),

 ("{ t: 'p', x: 'It is not a dance, and it is not a performance, whatever the tourist shows in Konya have made of it. It is a prayer with the body in it, and its purpose is to spin the self out of the way so that something else can occupy the room.' }",
  "{ t: 'p', x: 'It is not a dance, and it is not a performance, whatever the tourist shows in Konya have made of it. It is a prayer with the body in it, and its purpose is to spin the self out of the way so that something else can occupy the room.', fa: 'رقص نیست، و نمایش هم نیست، هر بلایی که برنامه‌های توریستی قونیه سرش آورده باشند. نمازی است که تن هم در آن هست، و هدفش این است که «خود» را از سر راه بچرخاند تا چیز دیگری بتواند جای آن اتاق را بگیرد.' }"),

 ("{ t: 'p', x: 'Rumi did not found the order. He simply could not stop turning, and after he died the people who loved him built a discipline around what he had done instinctively in the street.' }",
  "{ t: 'p', x: 'Rumi did not found the order. He simply could not stop turning, and after he died the people who loved him built a discipline around what he had done instinctively in the street.', fa: 'مولانا این طریقت را بنیان نگذاشت. فقط نمی‌توانست از چرخیدن دست بردارد، و پس از مرگش کسانی که دوستش داشتند گرد همان کاری که او در کوچه از سر غریزه کرده بود، آیینی منظم ساختند.' }"),

 ("{ t: 'p', x: 'Rumi is, by a wide margin, the best selling poet in the United States. He has been for years. He is read at weddings, printed on cards, tattooed, quoted by people who could not name a single other poet born before 1900.' }",
  "{ t: 'p', x: 'Rumi is, by a wide margin, the best selling poet in the United States. He has been for years. He is read at weddings, printed on cards, tattooed, quoted by people who could not name a single other poet born before 1900.', fa: 'مولانا، با اختلافی زیاد، پرفروش‌ترین شاعر ایالات متحده است. سال‌هاست که هست. در مراسم ازدواج می‌خوانندش، روی کارت چاپش می‌کنند، بر بدن خالکوبی‌اش می‌کنند، و کسانی نقلش می‌کنند که نمی‌توانند نام حتی یک شاعر دیگر متولد پیش از ۱۹۰۰ را بگویند.' }"),

 ("{ t: 'p', x: 'Almost all of them are reading Coleman Barks, an American poet who does not read Persian. He works from older English translations and reshapes them into free verse, and he has said plainly that this is what he does.' }",
  "{ t: 'p', x: 'Almost all of them are reading Coleman Barks, an American poet who does not read Persian. He works from older English translations and reshapes them into free verse, and he has said plainly that this is what he does.', fa: 'تقریباً همه‌شان دارند کولمن بارکس را می‌خوانند؛ شاعری آمریکایی که فارسی نمی‌داند. از روی ترجمه‌های انگلیسی قدیمی‌تر کار می‌کند و آنها را به شعر آزاد بازمی‌سراید، و خودش هم صریح گفته که کارش همین است.' }"),

 ("{ t: 'p', x: 'He made millions of people love a Persian name, and that is not nothing. But something specific was removed on the way, and it is worth naming exactly.' }",
  "{ t: 'p', x: 'He made millions of people love a Persian name, and that is not nothing. But something specific was removed on the way, and it is worth naming exactly.', fa: 'او کاری کرد که میلیون‌ها نفر یک نام ایرانی را دوست بدارند، و این چیز کمی نیست. اما در این مسیر چیز مشخصی حذف شد، و ارزشش را دارد که دقیق نامش را ببریم.' }"),

 ("{ t: 'h', x: 'The scholar disappears' }",
  "{ t: 'h', x: 'The scholar disappears', fa: 'آن عالم دین ناپدید می‌شود' }"),
]

lit_scope.apply("rumi", PAIRS)
