# -*- coding: utf-8 -*-
# Mohammad Reza Shah, fourth batch: Fawzia, the invasion, the abdication.
# Dates match the Reza Shah topic: شهریور ۱۳۲۰ for the invasion.

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
 ("In 1939 the crown prince married Princess Fawzia of Egypt, the sister of King Farouk. The union joined two royal houses and filled the newsreels with glamour, and a daughter, Shahnaz, was born the following year.",
  'در سال ۱۳۱۸، ولیعهد با شاهزاده فوزیه، خواهر فاروق پادشاه مصر، ازدواج کرد. این پیوند دو خاندان سلطنتی را به هم رساند و خبرهای تصویری را از شکوه پر کرد، و سال بعد دختری به نام شهناز به دنیا آمد.'),

 ("Yet the marriage had been arranged for reasons of state as much as of the heart. Fawzia, celebrated across the world for her beauty, was unhappy far from home in the cold formality of the Tehran court, and a quiet distance grew between them that the years would only widen.",
  'اما این ازدواج به همان اندازه که از سر دل بود، از سر مصلحت کشور هم بود. فوزیه که زیبایی‌اش در سراسر جهان زبانزد بود، دور از وطن و در تشریفات سرد دربار تهران خوشحال نبود، و فاصله‌ای خاموش میانشان افتاد که سال‌ها فقط بیشترش کرد.'),

 ("The war reaches Iran", 'جنگ به ایران می‌رسد'),

 ("Iran had declared itself neutral, but neutrality could not protect it. Reza Shah's ties to German engineers and trade, and above all the Trans Iranian Railway he had built, made the country too important to leave alone. Britain and the Soviet Union needed that railway to carry supplies to the Soviet front.",
  'ایران خود را بی‌طرف اعلام کرده بود، اما بی‌طرفی نتوانست از آن محافظت کند. پیوند رضاشاه با مهندسان و تجارت آلمان، و بیش از همه راه‌آهن سراسری‌ای که ساخته بود، این کشور را مهم‌تر از آن کرد که به حال خود رها شود. بریتانیا و شوروی به آن راه‌آهن نیاز داشتند تا تدارکات را به جبههٔ شوروی برسانند.'),

 ("In August 1941 their armies invaded from north and south at once. The Iranian forces, the pride of Reza Shah's reign, were overwhelmed within days. For the old king it was a bitter blow, to watch the army he had built collapse before the very powers he had tried to keep at arm's length.",
  'در شهریور ۱۳۲۰، ارتش‌های آنها همزمان از شمال و جنوب وارد شدند. نیروهای ایران، مایهٔ فخر دوران رضاشاه، ظرف چند روز از پا درآمدند. برای شاه پیر ضربه‌ای تلخ بود که ببیند ارتشی که ساخته بود در برابر همان قدرت‌هایی فرو می‌ریزد که کوشیده بود دورشان نگه دارد.'),

 ("Reza Shah Pahlavi abdicates", 'رضاشاه پهلوی از سلطنت کناره می‌گیرد'),

 ("The occupying powers no longer wanted Reza Shah on the throne. Rather than see the dynasty destroyed, he abdicated in favor of his son and left the country. The founder of modern Iran, the strong father who had shaped the prince's entire world, was carried away into exile.",
  'قدرت‌های اشغالگر دیگر رضاشاه را بر تخت نمی‌خواستند. به جای آنکه سلسله از میان برود، به سود پسرش کناره گرفت و از کشور رفت. بنیان‌گذار ایران مدرن، همان پدر مقتدری که تمام جهان ولیعهد را شکل داده بود، به تبعید برده شد.'),

 ("He was taken first to Mauritius, then to South Africa, and he died in Johannesburg in 1944, never seeing Iran again. For Mohammad Reza the loss was personal as much as political. He remembered his father with awe and love, and the pain of that parting stayed with him for the rest of his life.",
  'نخست به موریس بردندش، بعد به آفریقای جنوبی، و در سال ۱۳۲۳ در ژوهانسبورگ درگذشت، بی‌آنکه دیگر ایران را ببیند. برای محمدرضا این فقدان به همان اندازه که سیاسی بود، شخصی هم بود. پدرش را با هیبت و محبت به یاد می‌آورد، و درد آن جدایی تا آخر عمر با او ماند.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
