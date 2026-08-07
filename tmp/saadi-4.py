# -*- coding: utf-8 -*-
# Saadi, fourth batch: the carpet at the United Nations, Franklin,
# and the European readers.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'That is the part worth holding. This is not the work of a comfortable man in a peaceful century. It was written by someone who had watched the world tear itself apart and concluded, from inside the wreckage, that humanity is a single body.' }",
  "{ t: 'p', x: 'That is the part worth holding. This is not the work of a comfortable man in a peaceful century. It was written by someone who had watched the world tear itself apart and concluded, from inside the wreckage, that humanity is a single body.', fa: 'همین نکته است که باید نگهش داشت. این کارِ مردی آسوده در قرنی آرام نیست. کسی نوشته‌اش که دیده بود جهان خودش را تکه‌تکه می‌کند، و از دل همان آوار به این نتیجه رسیده بود که آدمیزاد یک پیکر است.' }"),

 ("{ t: 'h', x: 'Where it went' }",
  "{ t: 'h', x: 'Where it went', fa: 'به کجا رسید' }"),

 ("{ t: 'p', x: 'A carpet bearing these lines hangs in the United Nations building in New York, given by Iran. Secretaries General have quoted it. So have presidents. It is often said in Iran that it is carved over the entrance, which is not quite the case, but the pride behind the claim is understandable enough.' }",
  "{ t: 'p', x: 'A carpet bearing these lines hangs in the United Nations building in New York, given by Iran. Secretaries General have quoted it. So have presidents. It is often said in Iran that it is carved over the entrance, which is not quite the case, but the pride behind the claim is understandable enough.', fa: 'فرشی با همین بیت‌ها در ساختمان سازمان ملل در نیویورک آویخته است، هدیهٔ ایران. دبیرکل‌ها نقلش کرده‌اند. رؤسای جمهور هم. در ایران اغلب می‌گویند بالای سردر ورودی حک شده، که دقیقاً چنین نیست، اما غروری که پشت این حرف است کاملاً قابل درک است.' }"),

 ("{ t: 'aside', x: 'The truth is smaller and better: an eight hundred year old Persian couplet is hanging in the room where the world argues.' }",
  "{ t: 'aside', x: 'The truth is smaller and better: an eight hundred year old Persian couplet is hanging in the room where the world argues.', fa: 'حقیقت کوچک‌تر است و بهتر: بیتی فارسی از هشتصد سال پیش، در همان اتاقی آویخته که جهان در آن با هم بحث می‌کند.' }"),

 ("{ t: 'p', x: 'Saadi reached Europe long before most Persian poets, and one episode is too good not to tell.' }",
  "{ t: 'p', x: 'Saadi reached Europe long before most Persian poets, and one episode is too good not to tell.', fa: 'سعدی خیلی پیش از بیشتر شاعران ایرانی به اروپا رسید، و یک ماجرا هست که نگفتنش حیف است.' }"),

 ("{ t: 'p', x: 'Benjamin Franklin loved a story from the Bustan. Abraham refuses to feed an old traveller who will not worship his God, and drives him out into the night. Then God asks Abraham: I have fed and tolerated that man for a hundred years, and you could not manage one night.' }",
  "{ t: 'p', x: 'Benjamin Franklin loved a story from the Bustan. Abraham refuses to feed an old traveller who will not worship his God, and drives him out into the night. Then God asks Abraham: I have fed and tolerated that man for a hundred years, and you could not manage one night.', fa: 'بنجامین فرانکلین شیفتهٔ حکایتی از بوستان بود. ابراهیم از دادن غذا به مسافری سالخورده که خدای او را نمی‌پرستد سر باز می‌زند و او را در دل شب بیرون می‌کند. آنگاه خداوند از ابراهیم می‌پرسد: من صد سال است روزی‌اش می‌دهم و تحملش می‌کنم، و تو یک شب نتوانستی؟' }"),

 ("{ t: 'h', x: 'The others who found him' }",
  "{ t: 'h', x: 'The others who found him', fa: 'دیگرانی که او را یافتند' }"),

 ("{ t: 'p', x: 'Voltaire knew him. Goethe read him alongside Hafez. Emerson wrote an essay about him and put him among the small handful of writers who belong to everyone. Diderot and Rousseau read him. For a long stretch of European history, Saadi was the Persian poet, better known in the West than Hafez or Rumi.' }",
  "{ t: 'p', x: 'Voltaire knew him. Goethe read him alongside Hafez. Emerson wrote an essay about him and put him among the small handful of writers who belong to everyone. Diderot and Rousseau read him. For a long stretch of European history, Saadi was the Persian poet, better known in the West than Hafez or Rumi.', fa: 'ولتر می‌شناختش. گوته او را در کنار حافظ می‌خواند. امرسون مقاله‌ای دربارهٔ او نوشت و در شمار همان انگشت‌شمار نویسندگانی گذاشتش که به همه تعلق دارند. دیدرو و روسو خوانده بودندش. در بازهٔ درازی از تاریخ اروپا، سعدی همان شاعر ایرانی بود؛ در غرب شناخته‌شده‌تر از حافظ و مولانا.' }"),
]

lit_scope.apply("saadi", PAIRS)
