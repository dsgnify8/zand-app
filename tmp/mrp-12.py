# -*- coding: utf-8 -*-
# Mohammad Reza Shah, twelfth batch: the coronation, Persepolis, and the
# Great Civilization. کاخ گلستان, جشن‌های ۲۵۰۰ ساله, تخت جمشید,
# پاسارگاد, تمدن بزرگ.

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
 ("He had waited twenty six years to crown himself, refusing, he said, to be crowned king of a poor and backward nation. Only when he judged that Iran had risen did he consent. In October 1967 the ceremony was held in the Golestan Palace.",
  'بیست و شش سال صبر کرده بود تا تاج بر سر بگذارد؛ می‌گفت نمی‌خواهد شاهِ ملتی فقیر و عقب‌مانده تاج‌گذاری کند. تنها وقتی که به این نتیجه رسید ایران بالا آمده است، رضایت داد. در آبان ۱۳۴۶ مراسم در کاخ گلستان برگزار شد.'),

 ("In a gesture rich with meaning, he placed the crown upon his own head, as Napoleon once had, and then crowned Farah as Shahbanou, the first empress crowned in Iran in centuries. Their young son Reza was named heir before the assembled world.",
  'در حرکتی پرمعنا، تاج را خودش بر سر خود گذاشت، همان‌گونه که روزی ناپلئون کرده بود، و سپس تاج شهبانویی را بر سر فرح نهاد؛ نخستین ملکه‌ای که پس از قرن‌ها در ایران تاج‌گذاری می‌کرد. پسر خردسالشان رضا در برابر چشم جهانیان ولیعهد خوانده شد.'),

 ("The Persepolis celebration", 'جشن‌های تخت جمشید'),

 ("In 1971 he staged one of the most lavish events of the century, a grand celebration at the ruins of Persepolis marking two thousand five hundred years of Persian monarchy. Kings, queens, and presidents from around the world dined in silk tents amid the desert, served by the finest houses of Paris, in a display meant to place modern Iran within an unbroken line stretching back to antiquity.",
  'در سال ۱۳۵۰ یکی از پرخرج‌ترین مراسم آن قرن را برگزار کرد؛ جشنی بزرگ در ویرانه‌های تخت جمشید به مناسبت دو هزار و پانصد سال شاهنشاهی ایران. شاهان و ملکه‌ها و رؤسای جمهور از سراسر جهان در چادرهای ابریشمی میان دشت غذا خوردند، با پذیرایی بهترین خانه‌های پاریس؛ نمایشی که قرار بود ایرانِ نو را در زنجیره‌ای ناگسسته تا روزگار باستان بنشاند.'),

 ("The heart of the ceremony was a tribute to Cyrus the Great, founder of the first Persian empire. Standing before the tomb of Cyrus at Pasargadae, the Shah addressed the ancient king directly, in words that became famous, promising that Iran kept watch over the legacy he had left.",
  'قلب این مراسم ادای احترام به کوروش بزرگ بود، بنیان‌گذار نخستین امپراتوری ایران. شاه در برابر آرامگاه کوروش در پاسارگاد ایستاد و مستقیم با آن شهریار باستانی سخن گفت، با کلماتی که نامدار شد، و وعده داد که ایران بر میراث او پاسبانی می‌کند.'),

 ("Abroad it was admired as spectacle. At home, many asked why such fortunes were spent on foreign guests while villages still went without. The celebration meant to display Iran's greatness became, for his critics, a symbol of a throne grown distant from its people.",
  'در بیرون از ایران آن را چون یک نمایش باشکوه ستودند. در داخل، بسیاری پرسیدند چرا چنین هزینه‌ای صرف مهمانان خارجی می‌شود در حالی که روستاها هنوز از ابتدایی‌ترین چیزها بی‌بهره‌اند. جشنی که قرار بود بزرگی ایران را نشان دهد، برای منتقدانش به نماد تختی بدل شد که از مردمش دور افتاده بود.'),

 ("He dreamed of a Great Civilization, Iran restored to the front rank of nations.",
  'رؤیای «تمدن بزرگ» را در سر داشت؛ ایرانی که به صف نخست ملت‌ها بازگردد.'),

 ("That dream had a name and a plan. In his writings the Shah set out his vision of a Great Civilization, a modern, industrial, self reliant Iran that would take its place among the leading powers of the world within a single generation. He believed he could see the destination clearly, and that history had chosen him to lead his people there.",
  'این رؤیا نام داشت و نقشه داشت. شاه در نوشته‌هایش چشم‌انداز «تمدن بزرگ» را شرح داد: ایرانی مدرن و صنعتی و متکی به خود، که ظرف یک نسل جایش را میان قدرت‌های پیشروی جهان بگیرد. باور داشت مقصد را به‌روشنی می‌بیند، و که تاریخ او را برگزیده تا مردمش را به آنجا برساند.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
