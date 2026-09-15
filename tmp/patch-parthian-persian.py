# The Parthians, in Nojan's Persian.
#
# Thirty-eight pairs. The dynasty between Alexander and the Sasanians —
# the one that kept Iran Iranian for five centuries and gets least
# credit for it.

import re

PAIRS = [
 ("The Parthian Empire", "شاهنشاهی اشکانی"),
 ("Iran Under Foreign Kings", "ایران زیر فرمان شاهان بیگانه"),
 ("After Alexander", "پس از اسکندر"),

 ("For a time, Greek kings sat where the Persian kings of kings had ruled. Greek became the language of the court, Greek cities rose across the plateau, and the proud heartland of Cyrus and Darius answered to masters from a distant western land.",
  "مدتی، شاهان یونانی بر جایی فرمان راندند که پیش‌تر شاهنشاهان ایران بر آن حکومت می‌کردند. یونانی زبان دربار شد، شهرهای یونانی در سراسر فلات سر برآوردند و قلب سربلند سرزمین کوروش و داریوش به فرمانروایانی از سرزمینی دور در غرب گردن نهاد."),

 ("The land of Cyrus, for the first time, obeyed foreign kings.",
  "سرزمین کوروش، برای نخستین بار، از شاهان بیگانه فرمان برد."),

 ("A people from the steppe", "مردمی از دشت‌های شمال"),

 ("But Iran would not stay in foreign hands. From the northeast, from the wide grasslands beyond the Caspian, came a people of hardy nomadic horsemen: the Parni, led by a chief named Arsaces. Around the middle of the third century BCE, they swept into the region of Parthia and threw off Greek rule.",
  "اما ایران قرار نبود برای همیشه در دست بیگانگان بماند. از شمال‌شرق، از علفزارهای پهناور آن سوی خزر، مردمی از سوارکاران کوچ‌نشین و سخت‌جان آمدند: پَرنی‌ها، به رهبری سرداری به نام ارشک. حدود میانهٔ سدهٔ سوم پیش از میلاد، به سرزمین پارت تاختند و یوغ فرمانروایی یونانیان را برکندند."),

 ("From that homeland the dynasty took its name, and Arsaces gave his to the line of kings who followed, the Arsacids. From these beginnings, a small rebellion on the edge of a Greek empire, would grow one of the great powers of the ancient world.",
  "سلسله نام خود را از همان سرزمین گرفت و ارشک نیز نامش را به تبار شاهانی داد که پس از او آمدند: اشکانیان. از همین آغاز کوچک، یعنی شورشی در حاشیهٔ یک امپراتوری یونانی، یکی از قدرت‌های بزرگ جهان باستان سر برآورد."),

 ("Arsaces I, chief of the Parni, founded the dynasty that would drive the Greeks from Iran and rule for nearly five centuries.",
  "ارشک یکم، سردار پَرنی‌ها، سلسله‌ای را بنیان گذاشت که یونانیان را از ایران بیرون راند و نزدیک به پنج قرن بر کشور فرمان راند."),

 ("The Reconquest of a Homeland", "بازپس‌گیری سرزمین مادری"),

 ("What began as a frontier revolt became, over the generations, the reconquest of an entire empire. The Parthian kings pushed steadily westward and southward, city by city and province by province, driving back the weakening Greek Seleucids and restoring Iranian rule over the ancient Persian lands.",
  "آنچه با شورشی در مرزها آغاز شده بود، در گذر نسل‌ها به بازپس‌گیری یک امپراتوری تمام‌عیار تبدیل شد. شاهان اشکانی پیوسته به سوی غرب و جنوب پیش رفتند، شهر به شهر و سرزمین به سرزمین، سلوکیانِ رو به ضعف را عقب راندند و فرمانروایی ایرانی را بر سرزمین‌های کهن پارس دوباره برقرار کردند."),

 ("The greatest of these early kings was Mithridates the First, who in the second century BCE transformed the Parthian realm from a kingdom into an empire, taking the rich lands of Mesopotamia and the title, once more, of a great Iranian king.",
  "بزرگ‌ترینِ این شاهان نخستین، مهرداد یکم بود که در سدهٔ دوم پیش از میلاد قلمرو اشکانی را از پادشاهی به امپراتوری تبدیل کرد؛ سرزمین‌های ثروتمند میان‌رودان را به تصرف درآورد و بار دیگر عنوان شاه بزرگ ایران را از آنِ خود کرد."),

 ("Arsaces founds the Parthian state", "اشک دولت اشکانی را بنیان می‌گذارد"),
 ("Mithridates I begins the great expansion", "مهرداد یکم گسترش بزرگ را آغاز می‌کند"),
 ("The Parthians take Mesopotamia and Babylon", "اشکانیان میان‌رودان و بابل را تصرف می‌کنند"),
 ("Parthia stands as a great world power", "اشکانیان در جایگاه یک قدرت بزرگ جهانی قرار می‌گیرند"),

 ("From horsemen of the steppe rose the empire that made Iran Iranian again.",
  "از میان سوارکاران دشت، امپراتوری‌ای برخاست که ایران را دوباره ایرانی کرد."),

 ("The Wall Against Rome", "دیوار در برابر روم"),

 ("Rome, used to conquering all before it, found in Parthia an equal it could not overcome. Again and again the legions marched east, and again and again the Parthians turned them back. The Euphrates became the wall against which Roman ambition broke.",
  "روم که به فتح هر سرزمینی پیش رویش عادت داشت، در اشکانیان هماوردی یافت که نتوانست بر آن غلبه کند. بارها لژیون‌های روم به سوی شرق لشکر کشیدند و بارها اشکانیان آنها را عقب راندند. فرات به دیواری تبدیل شد که جاه‌طلبی روم بر آن درهم شکست."),

 ("The disaster at Carrhae", "فاجعهٔ حَرّان"),
 ("The battle of Carrhae", "نبرد حَرّان"),
 ("The Roman commander slain", "سردار رومی که کشته شد"),
 ("Years Parthia held Rome at bay", "سال‌هایی که اشکانیان روم را پشت مرزهای خود نگه داشتند"),
 ("The frontier Rome could not cross", "مرزی که روم نتوانست از آن عبور کند"),
 ("The Parthian shot", "تیر پارتی"),

 ("They mastered the art of striking hardest at the moment they seemed to flee.",
  "آنان هنر آن را آموخته بودند که درست در لحظه‌ای که گویی در حال گریزند، سخت‌ترین ضربه را وارد کنند."),

 ("Crossroads of the World", "چهارراه جهان"),
 ("The Parthian peace", "آرامش اشکانی"),

 ("The Parthian Empire sat astride the greatest trade route in the world: the Silk Road, the long ribbon of commerce that linked the empires of Rome and China. Through Parthian lands passed the silk of the east and the gold of the west, and the empire grew rich as the great middleman of the world.",
  "امپراتوری اشکانی بر سر بزرگ‌ترین راه بازرگانی جهان قرار داشت: جادهٔ ابریشم، نوار بلند تجارت که امپراتوری‌های روم و چین را به هم پیوند می‌داد. ابریشم شرق و طلای غرب از سرزمین‌های اشکانی می‌گذشت و امپراتوری از این نقش واسطهٔ بزرگ میان شرق و غرب ثروتمند شد."),

 ("The Silk Road", "جادهٔ ابریشم"),
 ("A looser kind of empire", "امپراتوری‌ای با انسجامی سست‌تر"),

 ("For all its strength against Rome, the empire was often divided within, and its long centuries were marked by civil wars and contested successions that slowly wore at its foundations.",
  "با همهٔ قدرتی که در برابر روم داشت، امپراتوری اغلب در درون خود دچار تفرقه بود و قرن‌های طولانی فرمانروایی‌اش با جنگ‌های داخلی و کشمکش بر سر جانشینی همراه شد؛ کشمکش‌هایی که به‌آرامی پایه‌های آن را فرسوده کردند."),

 ("The Passing of the Torch", "سپردن مشعل"),

 ("After nearly five hundred years, the Parthian Empire grew weary. Weakened by endless wars with Rome and by its own internal divisions, the once mighty realm was ripe for change. And change came, as it so often did in Iran, from the ancient heartland of Persia in the south.",
  "پس از نزدیک به پانصد سال، امپراتوری اشکانی فرسوده شد. جنگ‌های بی‌پایان با روم و تفرقه‌های درونی آن را ناتوان کرده بود و این قلمروِ روزگاری نیرومند آمادهٔ دگرگونی بود. و دگرگونی، چنان‌که بارها در تاریخ ایران رخ داده است، از قلب کهن سرزمین پارس در جنوب آمد."),

 ("There, a prince named Ardashir rose in rebellion. In 224 CE he defeated the last Parthian king in battle, and upon the ruins of the Arsacid realm he raised a new empire, the Sasanian, which would carry Persia to fresh heights of glory.",
  "آنجا شاهزاده‌ای به نام اردشیر سر به شورش برداشت. در سال ۲۲۴ میلادی، واپسین شاه اشکانی را در نبرد شکست داد و بر ویرانه‌های قلمرو اشکانی، امپراتوری تازه‌ای برپا کرد: شاهنشاهی ساسانی، که ایران را به اوج‌های تازه‌ای از شکوه می‌رساند."),

 ("One Iranian empire gave way to another, and the flame passed on.",
  "یک امپراتوری ایرانی جای خود را به دیگری داد و شعله به دست دیگری سپرده شد."),

 ("They kept the flame of Iran burning through the long centuries between two golden ages, and they handed it on, undimmed, to those who followed. Without the horsemen of Parthia, the story of Iran might have ended long ago.",
  "آنان شعلهٔ ایران را در قرن‌های طولانی میان دو عصر طلایی فروزان نگه داشتند و آن را بی‌آنکه از فروغش کاسته شود، به آیندگان سپردند. اگر سوارکاران پارت نبودند، شاید داستان ایران قرن‌ها پیش به پایان رسیده بود."),

 ("They kept the flame of Iran alive, and passed it on undimmed.",
  "آنان شعلهٔ ایران را زنده نگه داشتند و بی‌آنکه از فروغش کاسته شود، آن را به آیندگان سپردند."),
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
