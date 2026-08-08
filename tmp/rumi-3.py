# -*- coding: utf-8 -*-
# Rumi, third batch: the disappearance of Shams, the search, and the
# beginning of the poetry.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'His students were humiliated, then angry, and the anger was aimed at Shams. This ragged nobody had stolen their master. Shams left once, for Damascus, and Rumi fell apart so completely that he sent his own son to beg him back.' }",
  "{ t: 'p', x: 'His students were humiliated, then angry, and the anger was aimed at Shams. This ragged nobody had stolen their master. Shams left once, for Damascus, and Rumi fell apart so completely that he sent his own son to beg him back.', fa: 'شاگردانش نخست سرشکسته شدند و بعد خشمگین، و خشمشان متوجه شمس بود. این ژنده‌پوشِ گمنام استادشان را دزدیده بود. شمس یک بار رفت، به دمشق، و مولانا چنان از هم پاشید که پسر خودش را فرستاد تا به التماس بازش گرداند.' }"),

 ("{ t: 'p', x: 'And then in 1248 Shams disappeared for good.' }",
  "{ t: 'p', x: 'And then in 1248 Shams disappeared for good.', fa: 'و بعد، در سال ۱۲۴۸ میلادی، شمس برای همیشه ناپدید شد.' }"),

 ("{ t: 'p', x: 'The likeliest reading is that he was murdered, quietly, by people close to Rumi who wanted their teacher back, possibly with the knowledge of Rumi own son. There is a well in Konya they will show you. There is no body, and there never was.' }",
  "{ t: 'p', x: 'The likeliest reading is that he was murdered, quietly, by people close to Rumi who wanted their teacher back, possibly with the knowledge of Rumi own son. There is a well in Konya they will show you. There is no body, and there never was.', fa: 'محتمل‌ترین خوانش این است که او را کشتند، بی‌سروصدا، به دست کسانی نزدیک به مولانا که استادشان را پس می‌خواستند، و چه‌بسا با آگاهی پسر خودِ مولانا. چاهی در قونیه هست که نشانت می‌دهند. پیکری در کار نیست، و هرگز هم نبود.' }"),

 ("{ t: 'h', x: 'The search' }",
  "{ t: 'h', x: 'The search', fa: 'جست‌وجو' }"),

 ("{ t: 'p', x: 'Rumi did not accept it. He went to Damascus looking for him. He went twice. He asked everyone. He walked the streets of a foreign city calling for a man everyone else knew was dead.' }",
  "{ t: 'p', x: 'Rumi did not accept it. He went to Damascus looking for him. He went twice. He asked everyone. He walked the streets of a foreign city calling for a man everyone else knew was dead.', fa: 'مولانا نپذیرفت. به دمشق رفت تا پیدایش کند. دو بار رفت. از همه پرسید. در کوچه‌های شهری بیگانه راه افتاد و مردی را صدا زد که همه می‌دانستند مرده است.' }"),

 ("{ t: 'p', x: 'And somewhere in that, something broke open. He stopped looking, and wrote that he had searched and searched and had finally found Shams inside himself. Not as consolation. As a discovery. The thing he had loved in the man was not the man.' }",
  "{ t: 'p', x: 'And somewhere in that, something broke open. He stopped looking, and wrote that he had searched and searched and had finally found Shams inside himself. Not as consolation. As a discovery. The thing he had loved in the man was not the man.', fa: 'و جایی در همان میان، چیزی شکافت. از گشتن دست کشید، و نوشت که گشت و گشت و سرانجام شمس را در خودش یافت. نه به‌عنوان تسلا؛ به‌عنوان یک کشف. آنچه در آن مرد دوست داشته بود، خودِ آن مرد نبود.' }"),

 ("{ t: 'mark', x: 'He went out to find his friend and found him in his own chest, and then he began to sing.' }",
  "{ t: 'mark', x: 'He went out to find his friend and found him in his own chest, and then he began to sing.', fa: 'بیرون رفت تا دوستش را بیابد، و او را در سینهٔ خودش یافت؛ و آنگاه به سرودن افتاد.' }"),

 ("{ t: 'p', x: 'What came out of him after Shams is one of the strangest events in the history of literature. A man who had written almost nothing produced, in the remaining twenty five years of his life, roughly seventy thousand lines of poetry.' }",
  "{ t: 'p', x: 'What came out of him after Shams is one of the strangest events in the history of literature. A man who had written almost nothing produced, in the remaining twenty five years of his life, roughly seventy thousand lines of poetry.', fa: 'آنچه پس از شمس از او بیرون آمد، یکی از غریب‌ترین رویدادهای تاریخ ادبیات است. مردی که تقریباً هیچ ننوشته بود، در بیست و پنج سال باقی‌ماندهٔ عمرش، نزدیک هفتاد هزار مصراع شعر سرود.' }"),
]

lit_scope.apply("rumi", PAIRS)
