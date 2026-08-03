# -*- coding: utf-8 -*-
# Mohammad Reza Shah: the last six. The Pasargadae line is restored to the
# words he actually said — کوروش، آسوده بخواب، که ما بیداریم — which every
# Iranian knows and which cannot be a back-translation.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

PAIRS = [
 # the quotes
 ('{ t: \'q\', x: "Cyrus, rest in peace, for we are awake.", by: \'the Shah, at the tomb of Cyrus, 1971\' }',
  '{ t: \'q\', x: "Cyrus, rest in peace, for we are awake.", fa: \'کوروش، آسوده بخواب، که ما بیداریم.\', by: \'the Shah, at the tomb of Cyrus, 1971\', byFa: \'شاه، بر آرامگاه کوروش، ۱۳۵۰\' }'),

 ('{ t: \'q\', x: "I did not want my people to look back and say that their king had abandoned them, nor that he had stayed only by shedding their blood.", by: \'attributed to the Shah, in exile\' }',
  '{ t: \'q\', x: "I did not want my people to look back and say that their king had abandoned them, nor that he had stayed only by shedding their blood.", fa: \'نمی‌خواستم مردمم روزی به گذشته نگاه کنند و بگویند شاهشان رهایشان کرد، و نه اینکه بگویند تنها با ریختن خون آنها ماند.\', by: \'attributed to the Shah, in exile\', byFa: \'منسوب به شاه، در تبعید\' }'),

 ('{ t: \'q\', x: "All my life I have loved my country. Whatever I did, I did for Iran, and for its people.", by: \'the spirit of his own words, Answer to History\' }',
  '{ t: \'q\', x: "All my life I have loved my country. Whatever I did, I did for Iran, and for its people.", fa: \'تمام عمرم کشورم را دوست داشته‌ام. هر چه کردم، برای ایران کردم و برای مردمش.\', by: \'the spirit of his own words, Answer to History\', byFa: \'برگرفته از سخنان خودش در «پاسخ به تاریخ»\' }'),

 # the glossary paragraph
 ('{ t: \'ptext\', x: "His father, {{reza-khan|Reza Khan}}, had risen from the mountain village of Alasht to become an officer in the Persian Cossack Brigade. Tall, forceful, and self taught, he was a soldier of real presence and iron will, and he believed that only a strong hand could lift Iran out of its weakness." }',
  '{ t: \'ptext\', x: "His father, {{reza-khan|Reza Khan}}, had risen from the mountain village of Alasht to become an officer in the Persian Cossack Brigade. Tall, forceful, and self taught, he was a soldier of real presence and iron will, and he believed that only a strong hand could lift Iran out of its weakness.", fa: \'پدرش، {{reza-khan|رضاخان}}، از روستای کوهستانی الاشت برخاسته و افسر بریگاد قزاق شده بود. بلندبالا و پرصلابت و خودآموخته؛ سربازی با حضوری واقعی و ارادهٔ آهنین، که باور داشت تنها یک دست نیرومند می‌تواند ایران را از ناتوانی بیرون بکشد.\' }'),

 # timeline
 ("{ year: '1939', label: 'Marries Fawzia' }",
  "{ year: '1939', yearFa: '۱۳۱۸', label: 'Marries Fawzia', labelFa: 'ازدواج با فوزیه' }"),
 ("{ year: '1941', label: 'Allied invasion' }",
  "{ year: '1941', yearFa: '۱۳۲۰', label: 'Allied invasion', labelFa: 'حملهٔ متفقین' }"),
 ("{ year: '1941', label: 'Mohammad Reza becomes king' }",
  "{ year: '1941', yearFa: '۱۳۲۰', label: 'Mohammad Reza becomes king', labelFa: 'محمدرضا شاه می‌شود' }"),
 ("{ year: '1943', label: 'Tehran Conference' }",
  "{ year: '1943', yearFa: '۱۳۲۲', label: 'Tehran Conference', labelFa: 'کنفرانس تهران' }"),
 ("{ year: '1944', label: 'Reza Shah dies in exile' }",
  "{ year: '1944', yearFa: '۱۳۲۳', label: 'Reza Shah dies in exile', labelFa: 'مرگ رضاشاه در تبعید' }"),

 # circles
 ("{ value: '×4', label: 'Oil price, 1973' }",
  "{ value: '×4', label: 'Oil price, 1973', labelFa: 'قیمت نفت، ۱۳۵۲' }"),
 ("{ value: 'Arms', label: 'A vast new military' }",
  "{ value: 'Arms', valueFa: 'سلاح', label: 'A vast new military', labelFa: 'ارتشی تازه و عظیم' }"),
 ("{ value: 'Build', label: 'Industry and dams' }",
  "{ value: 'Build', valueFa: 'ساخت', label: 'Industry and dams', labelFa: 'صنعت و سد' }"),
 ("{ value: 'Fast', label: 'Change accelerated' }",
  "{ value: 'Fast', valueFa: 'شتاب', label: 'Change accelerated', labelFa: 'تغییر شتاب گرفت' }"),
]

mrp_scope.apply(PAIRS)
