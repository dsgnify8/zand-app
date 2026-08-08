# -*- coding: utf-8 -*-
# Nowruz, closing pass: the last three haft-seen items, the seven guests
# of the sofreh, and every chapter title and nav label.

import re
p = "constants/nowruz.ts"
s = open(p).read()

PAIRS = [
 # --- the three remaining seen items ---
 ("means: 'Love',", "means: 'Love', meansFa: 'عشق',"),
 ("means: 'Health',", "means: 'Health', meansFa: 'تندرستی',"),
 ("means: 'Beauty',", "means: 'Beauty', meansFa: 'زیبایی',"),

 ("x: 'A head of garlic, unpeeled. It has been medicine in Iran for thousands of years, and it is on the table as the wish for a body that holds up through the year.',",
  "x: 'A head of garlic, unpeeled. It has been medicine in Iran for thousands of years, and it is on the table as the wish for a body that holds up through the year.', xFa: 'یک بُنه سیر، پوست‌نکنده. هزاران سال در ایران دارو بوده، و روی سفره است چون آرزوی تنی است که یک سال تمام دوام بیاورد.',"),

 ("x: 'Red apples, for beauty and for health together, because Persian has never quite separated the two. Often polished until they shine, sometimes with a coin pressed beneath.',",
  "x: 'Red apples, for beauty and for health together, because Persian has never quite separated the two. Often polished until they shine, sometimes with a coin pressed beneath.', xFa: 'سیب سرخ، هم برای زیبایی و هم برای سلامتی، چون فارسی هیچ‌وقت این دو را کاملاً از هم جدا نکرده است. اغلب چنان برقشان می‌اندازند که بدرخشند، و گاهی سکه‌ای زیرشان می‌گذارند.',"),

 # --- chapter titles and nav ---
 ("title: 'The Oldest New Year', nav: 'The Turn'",
  "title: 'The Oldest New Year', titleFa: 'کهن‌ترین سال نو', nav: 'The Turn', navFa: 'تحویل'"),
 ("title: 'Older Than History', nav: 'The Root'",
  "title: 'Older Than History', titleFa: 'کهن‌تر از تاریخ', nav: 'The Root', navFa: 'ریشه'"),
 ("title: 'Jumping the Fire', nav: 'The Fire'",
  "title: 'Jumping the Fire', titleFa: 'پریدن از روی آتش', nav: 'The Fire', navFa: 'آتش'"),
 ("title: 'The Table', nav: 'Haft Seen'",
  "title: 'The Table', titleFa: 'سفره', nav: 'Haft Seen', navFa: 'هفت‌سین'"),
 ("title: 'The Moment', nav: 'The Instant'",
  "title: 'The Moment', titleFa: 'آن لحظه', nav: 'The Instant', navFa: 'سال تحویل'"),
 ("title: 'Thirteen Days', nav: 'The Visits'",
  "title: 'Thirteen Days', titleFa: 'سیزده روز', nav: 'The Visits', navFa: 'دید و بازدید'"),
 ("title: 'Out on the Thirteenth', nav: 'Sizdah'",
  "title: 'Out on the Thirteenth', titleFa: 'سیزده‌بدر', nav: 'Sizdah', navFa: 'سیزده'"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:55])

# the senjed body, matched loosely since it was truncated in the audit
m = re.search(r"x: 'The dried fruit of the wild olive tree,((?:[^'\\]|\\.)*)',", s)
if m and "xFa" not in s[m.end():m.end() + 12]:
    fa = ("xFa: 'میوهٔ خشک درخت سنجد، ریز و سرخ‌قهوه‌ای و آردی. می‌گویند شکوفه‌اش در بهار دل را به عشق می‌اندازد، "
          "و از همین رو میوه‌اش سر سفره می‌نشیند.',")
    s = s[:m.end()] + " " + fa + s[m.end():]
    applied += 1

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS) + 1)
for k in skipped:
    print("   skipped:", k)
