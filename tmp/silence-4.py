# -*- coding: utf-8 -*-
# Two Centuries of Silence: ribbon, numstat, and the Ferdowsi blocks.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 # the ribbon timeline
 ("{ year: '651', label: 'The fall of the Sasanians; the silence begins' }",
  "{ year: '651', label: 'The fall of the Sasanians; the silence begins', labelFa: 'فروپاشی ساسانیان؛ سکوت آغاز می‌شود' }"),
 ("{ year: '750', label: 'A new age dawns; Persian influence rises again' }",
  "{ year: '750', label: 'A new age dawns; Persian influence rises again', labelFa: 'روزگاری تازه سر می‌رسد؛ نفوذ ایرانی دوباره بالا می‌گیرد' }"),
 ("{ year: '820', label: 'Persian dynasties rule once more in the east' }",
  "{ year: '820', label: 'Persian dynasties rule once more in the east', labelFa: 'سلسله‌های ایرانی دوباره در شرق فرمان می‌رانند' }"),
 ("{ year: '900', label: 'The Persian language and spirit begin to bloom anew' }",
  "{ year: '900', label: 'The Persian language and spirit begin to bloom anew', labelFa: 'زبان و روح ایرانی از نو شکفتن می‌گیرد' }"),

 # the numbers
 ("{ n: '30+', label: 'Years of his life given to the work' }",
  "{ n: '30+', label: 'Years of his life given to the work', labelFa: 'سال از عمرش که پای این کار گذاشت' }"),
 ("{ n: '~60,000', label: 'Verses in the Shahnameh' }",
  "{ n: '~60,000', label: 'Verses in the Shahnameh', labelFa: 'بیت در شاهنامه' }"),
 ("{ n: '1,000+', label: 'Years it has been loved, unbroken' }",
  "{ n: '1,000+', label: 'Years it has been loved, unbroken', labelFa: 'سال که بی‌وقفه دوستش داشته‌اند' }"),
 ("{ n: 'One', label: 'Book that saved a language' }",
  "{ n: 'One', label: 'Book that saved a language', labelFa: 'کتابی که زبانی را نجات داد' }"),

 # the glossary paragraph
 ("{ t: 'ptext', x: 'His name was {{ferdowsi|Ferdowsi}}, and his task was to gather all the ancient stories of Iran, its myths, its legends, its kings and heroes from the dawn of time to the fall of the Sasanians, and to set them down in Persian verse, in a single great epic. He called it the Shahnameh, the Book of Kings.' }",
  "{ t: 'ptext', x: 'His name was {{ferdowsi|Ferdowsi}}, and his task was to gather all the ancient stories of Iran, its myths, its legends, its kings and heroes from the dawn of time to the fall of the Sasanians, and to set them down in Persian verse, in a single great epic. He called it the Shahnameh, the Book of Kings.', fa: 'نامش {{ferdowsi|فردوسی}} بود، و کاری که بر دوش گرفت این بود: همهٔ داستان‌های کهن ایران را گرد آورد، اسطوره‌ها و افسانه‌ها و شاهان و پهلوانان را، از آغاز زمان تا فروپاشی ساسانیان، و همه را در یک حماسهٔ بزرگ به شعر فارسی درآورد. آن را شاهنامه نامید، نامهٔ شاهان.' }"),

 # the split image
 ("{ t: 'splitimg', key: 'silence-ferdowsi', title: 'Ferdowsi of Tus', x: 'For over thirty years Ferdowsi labored on the Shahnameh, giving his life to preserve the stories, and the language, of his people.' }",
  "{ t: 'splitimg', key: 'silence-ferdowsi', title: 'Ferdowsi of Tus', titleFa: 'فردوسیِ توس', x: 'For over thirty years Ferdowsi labored on the Shahnameh, giving his life to preserve the stories, and the language, of his people.', fa: 'فردوسی بیش از سی سال بر شاهنامه رنج برد و عمر خود را داد تا داستان‌ها، و زبان، مردمش را نگاه دارد.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
