# Typical Persian, in Nojan's Persian.
#
# Fifty-eight pairs, and the last of the culture section. The jokes are
# the hardest thing in the app to translate: a line that lands in English
# because it is observed from outside has to land in Persian because it
# is recognised from inside. "YOU KNOW THE ONES" becomes "خودت می‌دانی
# کدام‌ها را می‌گویم" — not a description of the reader, an address to
# them.

import re

PAIRS = [
 ("Typical Persian", "ایرانیِ اصیل"),
 ("YOU KNOW THE ONES", "خودت می‌دانی کدام‌ها را می‌گویم"),

 ("Persian Standard Time. The gold at birth. The forty minute goodbye at the door. Tap a card and find the truth underneath the joke.",
  "وقتِ ایرانی. طلایی که از همان بدو تولد نصیبت می‌شود. خداحافظیِ چهل‌دقیقه‌ای دمِ در. روی هر کارت بزن و حقیقتِ پشتِ شوخی را پیدا کن."),

 ("You Know the Ones", "خودت می‌دانی کدام‌ها را می‌گویم"),

 ("Every Iranian recognises these instantly, and every one of them is a joke with something true sitting underneath it. Tap a card to turn it over.",
  "هر ایرانی این‌ها را همان لحظه می‌شناسد؛ چون پشتِ هر کدام، زیرِ شوخی، تکه‌ای از یک حقیقت نشسته است. روی هر کارت بزن تا روی دیگرش را ببینی."),

 ("Persian Standard Time is a real unit of measurement.", "وقتِ ایرانی واقعاً یک واحد اندازه‌گیری است."),
 ("Every Persian knows someone who knows someone.", "هر ایرانی یکی را می‌شناسد که یکی را می‌شناسد."),
 ("A Persian girl first gift was gold.", "اولین هدیهٔ یک دختر ایرانی، طلاست."),
 ("Nobody has ever successfully paid a bill at a Persian restaurant.", "هیچ‌کس تا حالا نتوانسته در یک رستوران ایرانی بی‌دردسر حساب کند."),
 ("The Persian goodbye takes forty minutes.", "خداحافظیِ ایرانی چهل دقیقه طول می‌کشد."),
 ("Your mother thinks you are too thin.", "مادرت همیشه فکر می‌کند زیادی لاغری."),

 ("You have always been too thin. You will be too thin at every weight you ever are. This is not about your body. Feeding you is how she says the thing she was never taught to say out loud, and as long as you are too thin, there is more of it to say.",
  "تو همیشه زیادی لاغر بوده‌ای. هر وزنی هم که داشته باشی، باز هم از نظر او زیادی لاغری. این ماجرا اصلاً دربارهٔ بدن تو نیست. غذا دادن به تو، زبانِ حرفی است که هیچ‌وقت یاد نگرفته با صدای بلند بزند؛ و تا وقتی زیادی لاغری، هنوز حرف‌های بیشتری برای گفتن هست."),

 ("Everyone is your amoo or khaleh.", "همه برایت عمو یا خاله اند"),
 ("The tahdig will be gone before you get there.", "تا برسی، ته‌دیگ دیگر تمام شده است."),
 ("Have you eaten is a greeting, not a question.", "«غذا خوردی؟» یک سلام است، نه یک سؤال."),

 ("It means hello. It also means are you all right, and are you being looked after, and I am checking. In a culture where you do not ask someone directly how they are doing, you ask about the one thing that would show it.",
  "یعنی سلام. در عین حال یعنی حالت خوب است؟ یعنی کسی هوایت را دارد؟ یعنی دارم حواسم به تو هست. در فرهنگی که مستقیم از کسی نمی‌پرسند حالت چطور است، سراغ همان یک چیزی می‌روند که جوابش همه‌چیز را لو می‌دهد."),

 ("There is a room in the house nobody is allowed to sit in.", "یک اتاق در خانه هست که هیچ‌کس اجازه ندارد در آن بنشیند."),
 ("You will leave with food you did not ask for.", "با غذایی از خانه بیرون می‌آیی که اصلاً نخواسته بودی."),

 ("In a container that must be returned, which means you must come back. It is a very old trick and it is not remotely accidental. Nobody has ever returned a Persian container empty, either, so the whole thing loops forever, which is the design.",
  "در ظرفی که باید پسش بدهی، یعنی باید دوباره برگردی. این ترفندی بسیار قدیمی است و ذره‌ای هم تصادفی نیست. تازه، هیچ‌کس هم تا حالا ظرف یک ایرانی را خالی پس نداده؛ پس این چرخه تا ابد ادامه پیدا می‌کند، و دقیقاً قرار است همین‌طور باشد."),

 ("Shoes come off. This is not negotiable.", "کفش‌ها درمی‌آیند. این یکی جای بحث ندارد."),

 ("Not a preference, not a house rule, not a request. It happens at the door without anyone saying anything. Persians sit on floors, eat on floors, sleep on floors. The floor is not the ground, it is furniture, and you do not stand on furniture in your shoes.",
  "نه سلیقه است، نه قانون خانه، نه درخواست. همان دمِ در اتفاق می‌افتد، بی‌آنکه کسی چیزی بگوید. ایرانی‌ها روی زمین می‌نشینند، روی زمین غذا می‌خورند و روی زمین می‌خوابند. کف خانه «زمین» نیست، مبلمان است؛ و آدم با کفش روی مبل نمی‌ایستد."),

 ("Saffron is measured in fear.", "زعفران با ترس پیمانه می‌شود."),
 ("Your cousin is a doctor. You will hear about it.", "پسرخاله‌ات دکتر شده. حتماً خبرش را به تو می‌دهند."),

 ("THE NATIONAL DISH", "غذای ملی"),
 ("THE STRANGE ONE", "آن یکی عجیب"),

 ("Chicken or duck in ground walnuts and pomegranate molasses, cooked until the walnut oil separates and the sauce goes almost black. Dark, sour, sweet, and completely unlike anything in any other cuisine. It is the dish that surprises people most.",
  "مرغ یا اردک با گردوی ساییده و رب انار، که آن‌قدر می‌پزد تا روغن گردو پس بدهد و رنگ خورش تقریباً سیاه شود. تیره، ترش و شیرین است و در هیچ آشپزی دیگری نظیری برایش پیدا نمی‌شود. غذایی است که بیش از هر چیز دیگری آدم‌ها را غافلگیر می‌کند."),

 ("THE JEWELLED ONE", "جواهرنشان"),

 ("Saffron rice scattered with barberries, tiny sour red jewels, served with chicken. It is what appears at weddings and at every occasion that matters, because it is beautiful before anyone has tasted it. The barberries are sharp enough to make you blink.",
  "برنج زعفرانی که با زرشک، این جواهرهای ریزِ سرخ و ترش، آراسته شده و با مرغ سرو می‌شود. همان چیزی است که سرِ سفرهٔ عروسی و هر مناسبت مهمی می‌آید، چون پیش از آنکه کسی مزه‌اش را بچشد، زیباست. زرشک آن‌قدر ترش و تیز است که چشم‌هایت را جمع می‌کنی."),

 ("THE WEEKNIGHT ONE", "غذای شب‌های معمولی"),

 ("Green beans and minced meat cooked with tomato and cinnamon and folded through the rice, so the rice is the dish rather than a bed for it. Homely, quick by Persian standards, and the one that Iranians abroad make when they are homesick and short of time.",
  "لوبیا سبز و گوشت چرخ‌کرده که با گوجه و دارچین پخته می‌شود و لابه‌لای برنج می‌رود، طوری که برنج خودش غذاست، نه بستری برای آن. غذایی خانگی است، به معیار ایرانی نسبتاً سریع، و همان غذایی است که ایرانی‌های خارج از کشور وقتی دلتنگ خانه‌اند و وقت کمی دارند، درست می‌کنند."),

 ("THE EVERYDAY ONE", "غذای هرروزه"),

 ("Minced lamb and onion pressed by hand onto a flat wide skewer and grilled over coal. Eaten with rice, a grilled tomato, raw onion, and sumac. It looks simple and it is not. If the mix is wrong it falls off the skewer into the fire, and the whole skill is in the hands.",
  "گوشت چرخ‌کردهٔ گوسفند و پیاز که با دست روی سیخ پهن فشرده می‌شود و روی زغال کباب می‌شود. با برنج، گوجهٔ کبابی، پیاز خام و سماق خورده می‌شود. ساده به نظر می‌رسد، اما ساده نیست. اگر مایه‌اش درست نباشد، از سیخ می‌افتد توی آتش؛ و تمام هنرِ کار در دست‌هاست."),

 ("THE ONE YOU GIVE AWAY", "آن یکی که نذری می‌دهند"),

 ("Thick soup of herbs, beans, and noodles, finished with kashk, a tart dried whey. Made in enormous pots, and traditionally made to be given away: cooked as a vow and handed out to neighbours and strangers. Making ash for the whole street is an act of charity with its own name.",
  "آشی غلیظ از سبزی، حبوبات و رشته که با کشک، این فرآوردهٔ ترشِ حاصل از آب‌پنیر خشک‌شده، تمام می‌شود. آن را در دیگ‌های بزرگ می‌پزند و به‌طور سنتی برای بخشیدن به دیگران درست می‌کنند: نذری می‌پزند و میان همسایه‌ها و غریبه‌ها پخش می‌کنند. آش پختن برای کل کوچه، نوعی کار خیر است که خودش اسم و رسم دارد."),

 ("TWO MEALS, ONE POT", "دو غذا، یک دیزی"),
 ("BREAKFAST, AND A TEST", "صبحانه، و یک امتحان"),
 ("THE PRIZE", "جایزه"),

 ("The golden crust from the bottom of the rice pot. Sometimes plain rice, sometimes with potato or flatbread laid underneath. It is turned out at the table and it is gone within a minute, and there has never in the history of Iran been enough of it.",
  "همان پوستهٔ طلاییِ تهِ قابلمهٔ برنج. گاهی خودِ برنج است، گاهی سیب‌زمینی یا نان لواش زیرش گذاشته‌اند. سر سفره برش می‌گردانند و ظرف یک دقیقه تمام می‌شود؛ و در تمام تاریخ ایران حتی یک بار هم به اندازهٔ کافی از آن نبوده است."),

 ("ON EVERY TABLE", "سر هر سفره‌ای"),

 ("A plate of raw herbs. Mint, tarragon, basil, radish, spring onion. Eaten by the handful with bread, white cheese, and walnuts, throughout the meal, not before it. Iranians eat more raw herbs than almost anyone, and it is the flavour they miss most abroad.",
  "یک بشقاب سبزی تازه. نعنا، ترخون، ریحان، تربچه، پیازچه. مشت‌مشت با نان و پنیر و گردو، در طول غذا خورده می‌شود، نه پیش از آن. ایرانی‌ها بیش از تقریباً هر ملت دیگری سبزی خام می‌خورند و همین طعمی است که در خارج از کشور بیش از هر چیز دیگری دلشان برایش تنگ می‌شود."),

 ("THE SPRING ONE", "غذای بهاری"),

 ("Rice steamed with broad beans and enough dill to turn the whole pot green, served with a lamb shank that gives way to a fork. The dill is not a hint of dill. It is most of the dish, and it is what a Persian kitchen smells like in spring.",
  "برنجی که با باقالی و آن‌قدر شوید دم می‌کشد که تمام قابلمه سبز می‌شود و با ماهیچه‌ای سرو می‌شود که با فشار چنگال از هم باز می‌شود. شوید در این غذا فقط یک عطر و طعمِ فرعی نیست؛ بخش اصلی غذاست و همان بویی است که آشپزخانهٔ ایرانی در بهار می‌دهد."),

 ("SWEET IN THE MIDDLE OF THE MEAL", "شیرینی، وسط غذا"),

 ("Lentils and rice with raisins, dates and fried onion, often cinnamon, sometimes minced meat. It unsettles anyone who believes sweetness belongs at the end of a meal. In Iran it belongs in the middle of the rice.",
  "عدس و برنج با کشمش، خرما و پیاز داغ، اغلب با دارچین و گاهی با گوشت چرخ‌کرده. هر کسی را که فکر می‌کند شیرینی جای آخرِ غذاست، غافلگیر می‌کند. در ایران، جای شیرینی وسطِ برنج است."),

 ("THE FIRST MEAL OF THE YEAR", "نخستین غذای سال"),

 ("Herbed rice with fried white fish, eaten on the night of Nowruz in almost every Iranian house there is. Green for the new year, fish for the life in the water. It is the one meal in the calendar that nearly everybody eats on the same evening.",
  "برنج سبزی‌دار با ماهی سفیدِ سرخ‌شده، که شب نوروز تقریباً در هر خانهٔ ایرانی بر سر سفره می‌آید. سبزی‌اش برای سال نوست و ماهی‌اش برای زندگی در آب. تنها وعده‌ای در تقویم است که تقریباً همه، در یک شب، می‌خورند."),

 ("SMOKE, FROM THE CASPIAN", "دود، از شمال"),

 ("Aubergine held over a flame until the skin blisters and splits, then mashed with garlic, tomato and egg. From Gilan on the Caspian coast, and the smoke is the entire point. Cooked in an oven instead of over fire it becomes a different and lesser dish.",
  "بادمجان را روی شعله نگه می‌دارند تا پوستش تاول بزند و ترک بخورد، بعد با سیر و گوجه و تخم‌مرغ له می‌کنند. این غذا از گیلان، در کرانهٔ دریای کاسپین، می‌آید و تمام ماجرا همان دود و عطرِ دودی است. اگر به‌جای آتش در فر پخته شود، هم غذای دیگری می‌شود و هم چیزی از آن کم می‌شود."),

 ("THE ONE THAT ARRIVES FIRST", "آن یکی که اول می‌آید"),

 ("Fried aubergine crushed with garlic and mint oil, finished with kashk, a fermented whey whose sourness sits closer to cheese than to yoghurt. It comes out before the meal, it is eaten with bread, and it is usually gone before the rice arrives.",
  "بادمجان سرخ‌شده که با سیر و نعنا داغ کوبیده می‌شود و در آخر با کشک تمامش می‌کنند؛ کشکی که از آب‌پنیر تخمیرشده به دست می‌آید و ترشی‌اش بیشتر به پنیر نزدیک است تا ماست. پیش از غذا سر سفره می‌آید، با نان خورده می‌شود و معمولاً پیش از رسیدن برنج تمام شده است."),

 ("THE UNDERRATED ONE", "آن یکی که دست‌کم گرفته می‌شود"),

 ("Celery stewed slowly with lamb, mint and parsley, then sharpened at the end with lemon or sour grape juice. Most cuisines use celery for flavour and throw it away. Persian cooking puts it at the centre of the dish, and is right to.",
  "کرفس که آرام‌آرام با گوشت بره، نعنا و جعفری می‌پزد و آخر کار با لیمو یا آبغوره طعمش تیزتر می‌شود. در بیشتر آشپزی‌ها کرفس را فقط برای طعم دادن به کار می‌برند و بعد دور می‌ریزند. آشپزی ایرانی آن را در مرکز غذا می‌گذارد، و کار درستی هم می‌کند."),

 ("ONE POT, NO CEREMONY", "یک قابلمه، بی‌تشریفات"),

 ("Tomato rice cooked with potato and minced meat in a single pot: no separate stew, nothing strained, nothing layered. Student food, travel food, and what gets made on a night when nobody has the patience for anything else. Every Iranian has a view on how much tomato is correct.",
  "برنج گوجه‌ای که با سیب‌زمینی و گوشت چرخ‌کرده در یک قابلمه پخته می‌شود؛ نه خورش جداگانه‌ای در کار است، نه آبکشی، نه لایه‌لایه چیدن. غذای دانشجویی است، غذای سفر، و همان چیزی که شبی درست می‌شود که هیچ‌کس حوصلهٔ هیچ کار دیگری را ندارد. هر ایرانی هم نظری دارد که مقدار درست گوجه چقدر است."),

 ("SAFFRON ICE CREAM", "بستنی زعفرانی"),
 ("OLDER THAN YOU THINK", "کهن‌تر از آن چیزی که فکر می‌کنی"),
 ("EVERY PERSIAN CHILDHOOD", "کودکیِ هر ایرانی"),
 ("FROM ISFAHAN", "سوغات اصفهان"),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


paths = ["constants/culture.ts", "components/culture-blocks.tsx"]
applied = 0
touched = set()

for p in paths:
    try:
        s = open(p).read()
    except FileNotFoundError:
        continue
    before = s

    for en, fa in PAIRS:
        pat = re.compile(
            r"((?:x|title|sub|h|lead|en|blurb|tag|label|front|back|name|note): '"
            + re.escape(esc(en))
            + r"',\s*(?:[a-zA-Z]*[Ff]a|persian): ')((?:[^'\\]|\\.)*)(')"
        )
        s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
        applied += n

    if s != before:
        open(p, "w").write(s)
        touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = "".join(open(p).read() for p in paths)
miss = [en[:52] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
