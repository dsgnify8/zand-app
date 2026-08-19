# -*- coding: utf-8 -*-
# Three additions to the hostage crisis section.
#
#   1. Name it. The section describes the crisis thoroughly without ever
#      calling it what everyone else calls it, so a reader who knows the
#      phrase does not connect the two.
#   2. What the students actually wanted — the Shah sent back — and why
#      Carter of all presidents could not give it to them.
#   3. What it left behind in America, stated once and quietly.

p = "constants/education.ts"
s = open(p).read()
did = []

# ---- 1. name it, right at the start ----
a = "{ t: 'h', x: 'How it unfolded', fa: 'ماجرا چطور پیش رفت' },"
b = """{ t: 'p', x: 'In America it is remembered as the Iran hostage crisis, and for most Americans alive at the time it was the first thing they ever learned about Iran. Before November 1979 the country, the Shah, and the revolution were barely known outside the foreign desks of newspapers. After it, they were on the evening news every night for over a year.', fa: 'در آمریکا از آن به نام «بحران گروگان‌گیری ایران» یاد می‌شود، و برای بیشتر آمریکایی‌های آن روزگار نخستین چیزی بود که دربارهٔ ایران آموختند. پیش از آبان ۱۳۵۸، این کشور و شاه و انقلاب بیرون از صفحه‌های خارجی روزنامه‌ها تقریباً ناشناخته بودند. پس از آن، بیش از یک سال هر شب در اخبار شامگاهی بودند.' },

          { t: 'h', x: 'How it unfolded', fa: 'ماجرا چطور پیش رفت' },"""
if a in s:
    s = s.replace(a, b, 1); did.append("named")

# ---- 2. the demand, and Carter's position ----
a2 = "          { t: 'p', x: 'The timing of the release, to the minute, was not an accident."
b2 = """          { t: 'p', x: 'What the students wanted was simple to state and impossible to give: the Shah, sent back to Iran. Washington had let him in for treatment and would not hand him over, and the man who had let him in was Jimmy Carter. That made Carter the last person in the world able to negotiate his way out of it. The students in the compound were in no mood to release him from the position he had put himself in.', fa: 'چیزی که دانشجویان می‌خواستند گفتنش ساده بود و دادنش ناممکن: شاه، بازگردانده شود به ایران. واشینگتن او را برای درمان راه داده بود و پسش نمی‌داد، و کسی که راهش داده بود جیمی کارتر بود. همین کارتر را به آخرین کسی در دنیا بدل کرد که می‌توانست از این ماجرا بیرون بیاید. دانشجویانِ داخل سفارت هم حوصلهٔ رها کردنش را نداشتند.' },

          { t: 'p', x: 'Above them stood Khomeini, who had no interest in an early settlement. The crisis was doing useful work at home, and every month it continued was a month the new order consolidated. So the talks went nowhere, month after month, with Carter effectively confined to the White House by a problem he could not solve. By the spring he had run out of patience and reached for the only option left, which was the rescue that failed in the desert.', fa: 'بالای سرشان خمینی بود که هیچ علاقه‌ای به حل زودهنگام ماجرا نداشت. بحران در داخل کار مفیدی می‌کرد، و هر ماه که ادامه می‌یافت ماهی بود که نظم تازه محکم‌تر می‌شد. پس گفت‌وگوها ماه از پی ماه به جایی نرسید، و کارتر عملاً در کاخ سفید گرفتار مسئله‌ای شد که نمی‌توانست حلش کند. تا بهار صبرش تمام شد و به تنها گزینهٔ باقی‌مانده دست برد؛ همان عملیات نجاتی که در کویر شکست خورد.' },

          { t: 'p', x: 'The timing of the release, to the minute, was not an accident."""
if a2 in s:
    s = s.replace(a2, b2, 1); did.append("the demand")

# ---- 3. what it left in America ----
a3 = "{ t: 'p', x: 'Whatever else the crisis did, it set the relationship between Iran and the United States for the next four decades,"
b3 = """{ t: 'p', x: 'It left something on the other side too. A generation of Americans learned about Iran, and about the Muslim world more broadly, through fourteen months of blindfolded men on the evening news. A great deal of what came afterwards was read through that.', fa: 'در آن سوی ماجرا هم چیزی به جا گذاشت. نسلی از آمریکایی‌ها ایران را، و به‌طور کلی‌تر جهان اسلام را، از خلال چهارده ماه تصویر مردانِ چشم‌بسته در اخبار شامگاهی شناختند. بسیاری از آنچه بعدها آمد، از پس همان تصویر خوانده شد.' },

          { t: 'p', x: 'Whatever else the crisis did, it set the relationship between Iran and the United States for the next four decades,"""
if a3 in s:
    s = s.replace(a3, b3, 1); did.append("the aftermath")

open(p, "w").write(s)
print("applied:", " | ".join(did) if did else "nothing matched")
