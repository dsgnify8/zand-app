# -*- coding: utf-8 -*-
# Mohammad Reza Shah, third batch. Headings appear to use single quotes
# while paragraphs use double, so each pair is tried in both styles.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

def pairs_for(en, fa):
    """Try both quote styles; whichever matches will apply."""
    out = []
    for q in ('"', "'"):
        esc = en.replace("'", "\\'") if q == "'" else en
        a = 'x: ' + q + esc + q
        out.append((a, a + ", fa: '" + fa + "'"))
    return out

ITEMS = [
 ("A childhood set apart", 'کودکی‌ای جدا از بقیه'),
 ("A brush with death", 'یک قدمی مرگ'),
 ("A bridge between two worlds", 'پلی میان دو جهان'),

 ("He came to admire the order, the science, and the industry of the West, and to ask why his own ancient nation had fallen so far behind. Yet the more European he became in his habits, the more he felt the pull of Iran, its poetry, its history, its faith in itself.",
  'به نظم و دانش و صنعت غرب دل بست، و از خود پرسید چرا ملت کهن خودش این‌قدر عقب مانده است. اما هرچه در عادت‌هایش اروپایی‌تر می‌شد، کشش ایران را بیشتر حس می‌کرد؛ شعرش، تاریخش، و باوری که به خودش داشت.'),

 ("Out of that tension grew the idea that would guide his whole reign. Iran, he believed, must modernize swiftly and boldly, but in its own way, without surrendering the Persian soul that made it itself. He began to see himself as the bridge between the two.",
  'از دل همین کشمکش، اندیشه‌ای زاده شد که تمام دوران سلطنتش را هدایت کرد. باور داشت ایران باید سریع و جسورانه مدرن شود، اما به شیوهٔ خودش، بی‌آنکه آن جان ایرانی را که ایرانش می‌کند واگذار کند. کم‌کم خودش را پل میان این دو دید.'),

 ("He returned to Iran in 1936 and entered the military academy in Tehran, stepping into the disciplined, uniformed world his father prized above all. He graduated as a young officer, proud of the army his father had built and eager to serve it.",
  'در سال ۱۳۱۵ به ایران بازگشت و وارد دانشکدهٔ افسری تهران شد؛ پا گذاشتن به همان جهان منضبط و یونیفرم‌پوشی که پدرش بیش از هر چیز ارج می‌نهاد. به‌عنوان افسری جوان فارغ‌التحصیل شد، سربلند از ارتشی که پدرش ساخته بود و مشتاق خدمت در آن.'),

 ("Two Irans lived in him already, the modern and the ancient, the European and the Persian.",
  'دو ایران از همان موقع در او زندگی می‌کردند؛ مدرن و باستانی، اروپایی و ایرانی.'),

 ("Holding those two Irans together would become the work of his life. In these school years the tension was still a promise rather than a problem, and the young prince believed, with the confidence of the young, that he could honor both at once.",
  'کنار هم نگه داشتن این دو ایران، کار تمام عمرش شد. در آن سال‌های مدرسه، این کشمکش هنوز یک نوید بود نه یک مشکل، و ولیعهد جوان با اعتمادبه‌نفس جوانی باور داشت که می‌تواند حق هر دو را با هم ادا کند.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
