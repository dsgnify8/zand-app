# The Sasanians, in Nojan's Persian.
#
# Fifty-four pairs. The last empire before Islam — the one the Shahnameh
# mourns — so the register is the most formal of the history topics.

import re

PAIRS = [
 ("The Sasanian Empire", "شاهنشاهی ساسانی"),
 ("The Rebirth of Persia", "زایش دوباره ایران"),

 ("For nearly five centuries after Alexander, the glory of Cyrus and Darius had faded. Iran was ruled first by Greek kings and then by the Parthians, a capable but loosely bound dynasty. The memory of the great Persian Empire lived on, but its full splendour had dimmed.",
  "نزدیک به پنج قرن پس از اسکندر، شکوه کوروش و داریوش رنگ باخته بود. بر ایران نخست شاهان یونانی فرمان راندند و سپس اشکانیان، سلسله‌ای کاردان اما نه‌چندان یکپارچه. یاد امپراتوری بزرگ ایران زنده مانده بود، اما شکوه و درخشش آن دیگر مانند گذشته نبود."),

 ("Then, in 224 CE, a prince from the south, from the very heartland of Persia where Cyrus had once ruled, rose up and restored the ancient glory. His name was Ardashir, and he founded the Sasanian dynasty, the last and one of the greatest of the pre-Islamic Persian empires.",
  "سپس، در سال ۲۲۴ میلادی، شاهزاده‌ای از جنوب، از همان قلب سرزمین پارس که روزگاری کوروش بر آن فرمان می‌راند، برخاست و شکوه باستانی را بازگرداند. نامش اردشیر بود و سلسله ساسانی را بنیان نهاد؛ واپسین و یکی از بزرگ‌ترین امپراتوری‌های ایران پیش از اسلام."),

 ("Ardashir I", "اردشیر یکم"),

 ("Ardashir overthrew the Parthians and founded a new empire that consciously looked back to the Achaemenids of Cyrus and Darius, seeking to restore the true glory of Persia.",
  "اردشیر اشکانیان را برانداخت و امپراتوری تازه‌ای بنیان نهاد که آگاهانه به هخامنشیانِ کوروش و داریوش چشم داشت و می‌کوشید شکوه راستین ایران را بازگرداند."),

 ("A conscious return to greatness", "بازگشتی آگاهانه به بزرگی"),

 ("The Sasanians saw themselves as the true heirs of the ancient Persian kings. They revived the old titles, the old glory, and the old faith, and set out to build an empire worthy of the Achaemenid name. Under them, Persia was reborn as a great power of the world.",
  "ساسانیان خود را وارثان راستین شاهان باستانی ایران می‌دانستند. لقب‌های کهن، شکوه گذشته و آیین کهن را زنده کردند و بر آن شدند امپراتوری‌ای بسازند که درخور نام هخامنشی باشد. در روزگار آنان، ایران دوباره به قدرتی بزرگ در جهان تبدیل شد."),

 ("After five centuries, the true glory of Persia rose again.",
  "پس از پنج قرن، شکوه راستین ایران دوباره سر برآورد."),

 ("For more than four hundred years the Sasanians would rule a vast and brilliant empire, stretching across the Iranian plateau and beyond, a civilization of magnificent cities, learning, and art that shaped the world far beyond its borders.",
  "ساسانیان بیش از چهارصد سال بر امپراتوری‌ای پهناور و درخشان فرمان راندند که سراسر فلات ایران و فراتر از آن را دربر می‌گرفت؛ تمدنی با شهرهای باشکوه، دانش و هنر که تأثیرش بسیار فراتر از مرزهای ایران رفت."),

 ("The Faith of the Sacred Fire", "آیین آتش مقدس"),
 ("The soul of Sasanian Iran", "جان ایران ساسانی"),

 ("At the very heart of the Sasanian world lay a faith of great antiquity and beauty: Zoroastrianism, the religion of the prophet Zarathustra, which the Persians had followed for more than a thousand years. Under the Sasanians it became the official faith of the empire, woven into the state itself.",
  "در قلب جهان ساسانی، آیینی کهن و زیبا جای داشت: آیین زرتشتی، دین زرتشت پیامبر، که ایرانیان بیش از هزار سال به آن باور داشتند. در روزگار ساسانیان، این آیین به دین رسمی امپراتوری تبدیل شد و با ساختار حکومت درهم آمیخت."),

 ("It is one of the oldest revealed religions in the world, and among the most influential. It taught of a single supreme God, Ahura Mazda, the Wise Lord, and of the eternal struggle between truth and light on one side, and falsehood and darkness on the other, a struggle in which every person must choose their part.",
  "این آیین یکی از کهن‌ترین ادیان وحیانی جهان و از اثرگذارترین آنهاست. از خدای یگانه و برتری به نام اهورامزدا، خداوند دانا، سخن می‌گفت و از نبردی جاودانه میان راستی و روشنایی از یک سو و دروغ و تاریکی از سوی دیگر؛ نبردی که هر انسان باید در آن جایگاه خود را انتخاب کند."),

 ("Good thoughts, good words, good deeds", "پندار نیک، گفتار نیک، کردار نیک"),
 ("Good thoughts, good words, good deeds.", "پندار نیک، گفتار نیک، کردار نیک."),
 ("The sacred fire", "آتش مقدس"),

 ("Great fire temples burned across the empire, their flames a symbol of the divine light. Some, it was said, had burned without pause for centuries.",
  "آتشکده‌های بزرگ در سراسر امپراتوری فروزان بودند و شعله‌هایشان نماد نور الهی بود. می‌گفتند برخی از آنها قرن‌ها بی‌وقفه روشن مانده بودند."),

 ("A faith worthy of its own telling", "آیینی که شایسته روایتی جداگانه است"),

 ("Zoroastrianism is one of the great treasures of Iranian heritage, and its full story, its prophet, its scripture, and its enduring influence, deserves a telling all its own, which it will one day have.",
  "آیین زرتشتی یکی از گنجینه‌های بزرگ میراث ایرانی است و داستان کامل آن، از پیامبر و کتاب مقدسش گرفته تا تأثیر ماندگارش، شایسته روایتی جداگانه است؛ روایتی که روزی به آن خواهیم پرداخت."),

 ("The Rival of Rome", "هماورد روم"),

 ("For over four hundred years, the Sasanian Empire stood as the great rival of Rome, and later of its successor, the Byzantine Empire. These were the two superpowers of the ancient world, and between them stretched a frontier contested in war after war across the centuries.",
  "بیش از چهارصد سال، شاهنشاهی ساسانی رقیب بزرگ روم و سپس جانشین آن، امپراتوری بیزانس، بود. این دو ابرقدرت جهان باستان بودند و میانشان مرزی قرار داشت که قرن‌ها جنگ پس از جنگ بر سر آن درگرفت."),

 ("Shapur I", "شاپور یکم"),

 ("Shapur the Great defeated three Roman emperors and captured one, Valerian, in battle. His victories are carved into the rock reliefs of Persia, where they endure to this day.",
  "شاپور بزرگ سه امپراتور روم را شکست داد و یکی از آنها، والرین، را در نبرد به اسارت گرفت. پیروزی‌های او بر نقش‌برجسته‌های سنگی ایران حک شده و تا امروز بر جا مانده‌اند."),

 ("Roman emperors defeated by Shapur I", "امپراتوران روم که شاپور یکم شکست داد"),
 ("The Roman emperor Valerian captured", "اسارت والرین، امپراتور روم"),
 ("Years as a great world power", "سال‌ها در جایگاه یک قدرت بزرگ جهانی"),
 ("Its equal and rival for centuries", "همتای آن و رقیبش در طول قرن‌ها"),
 ("A golden age of civilization", "عصر طلایی یک تمدن"),

 ("The Sasanian centuries were a golden age of Persian civilization. Their capital, Ctesiphon, was one of the greatest cities in the world, home to the mighty arch of Taq Kasra, the largest brick vault ever built, which still stands after seventeen hundred years.",
  "قرن‌های ساسانی عصر طلایی تمدن ایرانی بود. پایتختشان، تیسفون، یکی از بزرگ‌ترین شهرهای جهان به شمار می‌رفت و طاق سترگ کسری را در خود جای داده بود؛ بزرگ‌ترین طاق آجری که تا آن زمان ساخته شده بود و پس از هزار و هفتصد سال هنوز پابرجاست."),

 ("From Rome to China, the world knew the splendour of Sasanian Persia.",
  "از روم تا چین، جهان شکوه و عظمت ایران ساسانی را می‌شناخت."),

 ("The Last Glory and the Long War", "واپسین شکوه و جنگی طولانی"),

 ("The empire reached its final height under the great king Khosrow the First, remembered as Anushirvan, the Immortal Soul, a byword for justice and wisdom for centuries after. Under him the empire was reformed, learning flourished, and Persia stood at the very peak of its power and prestige.",
  "امپراتوری در روزگار خسرو یکم به واپسین اوج خود رسید؛ پادشاه بزرگی که او را انوشیروان، به معنای «روان جاودان»، می‌خواندند و نامش قرن‌ها نماد دادگری و خرد بود. در دوران او، امپراتوری اصلاح شد، دانش رونق گرفت و ایران به اوج قدرت و اعتبار خود رسید."),

 ("Khosrow Anushirvan", "خسرو انوشیروان"),

 ("Khosrow the First was remembered across the East as the model of the just and wise king. Under him, Sasanian Persia reached its golden height.",
  "خسرو یکم در سراسر شرق به‌عنوان نمونهٔ شاهی دادگر و خردمند شناخته می‌شد. در روزگار او، ایران ساسانی به اوج عصر طلایی خود رسید."),

 ("The war that exhausted two empires", "جنگی که دو امپراتوری را از پا انداخت"),
 ("The last great war with Byzantium begins", "واپسین جنگ بزرگ با بیزانس آغاز می‌شود"),
 ("Persia conquers Jerusalem and the Holy Land", "ایران اورشلیم و سرزمین مقدس را فتح می‌کند"),
 ("The Sasanian army reaches Constantinople", "سپاه ساسانی به قسطنطنیه می‌رسد"),
 ("The war collapses; both empires lie exhausted", "جنگ فرو می‌پاشد؛ هر دو امپراتوری از پا افتاده‌اند"),

 ("Then the tide turned. The Byzantine emperor struck back and carried the war deep into the heart of Persia. When at last the fighting ended, after twenty six years, both great empires were utterly exhausted, their treasuries empty, their armies bled white, their people weary of endless war.",
  "سپس ورق برگشت. امپراتور بیزانس ضدحمله زد و جنگ را تا قلب ایران پیش برد. وقتی سرانجام پس از بیست‌وشش سال نبرد پایان یافت، هر دو امپراتوری بزرگ یکسره از پا افتاده بودند؛ خزانه‌ها تهی، سپاه‌ها تحلیل‌رفته و مردم از جنگ بی‌پایان خسته شده بودند."),

 ("The two great powers of the world had fought each other to the point of ruin.",
  "دو قدرت بزرگ جهان آن‌قدر با یکدیگر جنگیده بودند که هر دو را تا مرز ویرانی پیش برده بودند."),

 ("Neither empire knew it, but a new power was rising in the deserts of Arabia to the south, one that would sweep away the exhausted old order and change the world forever.",
  "هیچ‌یک از دو امپراتوری از آن خبر نداشت، اما در بیابان‌های عربستان در جنوب، قدرتی تازه در حال سر برآوردن بود؛ قدرتی که نظم کهنه و فرسوده را از میان می‌برد و جهان را برای همیشه دگرگون می‌کرد."),

 ("The Coming of Islam", "ظهور اسلام"),

 ("In the deserts of Arabia, a new faith had been born. Islam had united the Arab tribes as never before, and filled them with a burning purpose. In the 630s, the armies of the young Muslim state burst out of Arabia, and they turned toward the two exhausted empires to the north.",
  "در بیابان‌های عربستان، آیینی تازه زاده شده بود. اسلام قبایل عرب را چنان که پیش از آن هرگز نشده بود متحد کرد و آنان را از آرمانی سوزان سرشار ساخت. در دههٔ ۶۳۰ میلادی، سپاهیان دولت جوان مسلمان از عربستان بیرون آمدند و رو به دو امپراتوری خسته در شمال نهادند."),

 ("The Sasanian Empire, drained by its long war with Byzantium and weakened by years of turmoil at its court, was not the power it had been. Yet few could have imagined how swiftly the ancient empire would fall.",
  "امپراتوری ساسانی که جنگ طولانی با بیزانس توانش را فرسوده و سال‌ها آشوب در دربارش آن را تضعیف کرده بود، دیگر آن قدرت سابق نبود. با این همه، کمتر کسی می‌توانست تصور کند که این امپراتوری کهن با چه سرعتی فرو خواهد ریخت."),

 ("The battle that decided an empire", "نبردی که سرنوشت یک امپراتوری را رقم زد"),

 ("The decisive blow came at the battle of Qadisiyyah, around the year 636, where the main Sasanian army met the Arab forces. After days of hard fighting, the Persian army was broken. The road to the capital lay open, and the great city of Ctesiphon fell to the conquerors.",
  "ضربهٔ سرنوشت‌ساز در نبرد قادسیه، حدود سال ۶۳۶ میلادی، فرود آمد؛ جایی که سپاه اصلی ساسانی با نیروهای عرب روبه‌رو شد. پس از روزها نبرد سخت، سپاه ایران درهم شکست. راه پایتخت باز شد و شهر بزرگ تیسفون به دست فاتحان افتاد."),

 ("The battle of Qadisiyyah breaks the Persian army", "نبرد قادسیه سپاه ایران را درهم می‌شکند"),
 ("The capital, Ctesiphon, falls", "پایتخت، تیسفون، سقوط می‌کند"),
 ("The battle of Nahavand, the final defeat", "نبرد نهاوند، شکست نهایی"),
 ("The last Sasanian king dies; the empire ends", "واپسین شاه ساسانی می‌میرد؛ امپراتوری پایان می‌یابد"),
 ("The end of an age", "پایان یک دوران"),

 ("An empire that had rivalled Rome for four hundred years had fallen in a single generation.",
  "امپراتوری‌ای که چهارصد سال با روم رقابت کرده بود، در فاصلهٔ یک نسل فرو ریخت."),

 ("The empire fell, but the soul of Iran endured, and would one day speak again.",
  "امپراتوری فرو ریخت، اما جان ایران پابرجا ماند و روزی دوباره به سخن درآمد."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


p = "constants/education.ts"
s = open(p).read()
applied = 0

for en, fa in PAIRS:
    pat = re.compile(
        r"((?:x|title|sub|h|lead|en|subtitle|name|label|q|a|cap|blurb|years|value): '"
        + re.escape(esc(en))
        + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
    )
    s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
    applied += n

open(p, "w").write(s)

miss = [en[:52] for en, fa in PAIRS if esc(fa) not in s]
print("replacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
