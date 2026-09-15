# The Table, in Nojan's Persian.
#
# Twenty-three pairs. Note the tahdig line: "the bottom of the pot" is
# both the literal translation and the name, which in English needs
# explaining and in Persian does not — so the Persian says the word and
# then glosses it the other way round.

import re

PAIRS = [
 ("The Table", "سفره"),
 ("FOOD, AND WHAT IT MEANS", "غذا، و معنایی که با خود دارد"),

 ("Rice is not a side dish. The crust at the bottom of the pot is fought over. Nobody eats alone if it can be helped.",
  "برنج غذای فرعی نیست. سرِ ته‌دیگ رقابت است. و تا جایی که بشود، هیچ‌کس تنها غذا نمی‌خورد."),

 ("Everything, All at Once", "همه‌چیز، یکجا"),

 ("A Persian table is not laid with a meal. It is laid with everything you could possibly need, and then more, in case you need that too.",
  "سفرهٔ ایرانی را فقط برای یک وعدهٔ غذا نمی‌چینند. هر چیزی را که ممکن است لازم داشته باشی، سر سفره می‌گذارند؛ و بعد باز هم بیشتر، برای اینکه اگر آن را هم خواستی، آماده باشد."),

 ("The sofreh is the spread. And the rule of it is abundance: the rice, the stew, the kabab, the bread, the yoghurt, the pickles, the raw herbs, the salad, the butter, the extra plate of rice nobody asked for. It is all there before you sit, and it stays there until you leave.",
  "سفره یعنی همهٔ این بساطِ رنگارنگ. و قاعده‌اش فراوانی است: برنج، خورش، کباب، نان، ماست، ترشی، سبزی خوردن، سالاد، کره، و آن بشقاب اضافهٔ برنج که هیچ‌کس درخواستش نکرده. همه‌چیز پیش از آنکه بنشینی سر سفره حاضر است و تا وقتی بروی همان‌جا می‌ماند."),

 ("Nothing arrives in courses. Nothing is portioned out for you. Everything is in the middle, within reach, and you take what you want and go back for more, and the bowls are refilled while you are still eating out of them.",
  "هیچ‌چیز مرحله‌به‌مرحله سر سفره نمی‌آید. هیچ‌چیز هم از قبل برایت سهم‌بندی نمی‌شود. همه‌چیز وسط سفره و دم دست است؛ هرچه بخواهی برمی‌داری، دوباره سراغش می‌روی و ظرف‌ها را همان‌طور که هنوز مشغول خوردنی، دوباره پر می‌کنند."),

 ("A guest should never have to ask for anything. That is the whole design of the table.",
  "مهمان نباید هیچ‌وقت مجبور شود چیزی بخواهد. تمام فلسفهٔ چیدن سفره همین است."),

 ("That is why it looks like too much. It is supposed to. A table with exactly enough on it is a table that was calculated, and calculating what a guest needs is the one thing a host must never be caught doing.",
  "برای همین است که سفره انگار بیش از حد پُر است. قرار است همین‌طور باشد. سفره‌ای که دقیقاً به اندازهٔ نیاز روی آن چیده شده، یعنی همه‌چیز از قبل حساب شده؛ و حساب‌وکتاب کردنِ اینکه مهمان چه چیزی و چقدر لازم دارد، تنها کاری است که میزبان نباید هرگز هنگام انجامش گیر بیفتد."),

 ("Rice Is Not a Side Dish", "برنج غذای فرعی نیست"),

 ("Understand this and you understand the kitchen. In Iran, rice is not something served alongside the meal. Rice is the meal. Everything else is an accompaniment to it, including the meat.",
  "این را که بفهمی، آشپزی ایرانی را فهمیده‌ای. در ایران، برنج چیزی نیست که کنار غذا سرو شود؛ برنج خودِ غذاست. هر چیز دیگری همراهِ آن است، حتی گوشت."),

 ("And the crust", "و آن پوسته"),

 ("At the bottom of the pot, where the rice meets the oil, a golden crust forms. Tahdig, the bottom of the pot. It is crunchy, it is the best thing on the table, and there is never enough of it.",
  "تهِ قابلمه، همان‌جا که برنج به روغن می‌رسد، پوسته‌ای طلایی شکل می‌گیرد: ته‌دیگ، همان تهِ قابلمه. ترد و برشته است، بهترین چیز روی سفره است، و هیچ‌وقت هم به اندازهٔ کافی از آن نیست."),

 ("The greatest thing in Persian cooking is the accident at the bottom of the pot.",
  "بهترین چیز در آشپزی ایرانی، همان اتفاقی است که تهِ قابلمه می‌افتد."),

 ("What Is On It", "چه چیزهایی روی سفره است"),
 ("Touch a dish to see it.", "روی هر غذا بزن تا ببینیش."),
 ("Sour, Slow, and Never Hot", "ترش، آرام و هرگز تند"),

 ("It is almost never hot. Iranians do not do chilli. The complexity comes from time and from sour, not from heat, and a stew that has not cooked for four hours is not finished. Ask an Iranian how long ghormeh sabzi takes and the honest answer is most of a day.",
  "تقریباً هیچ‌وقت تند نیست. ایرانی‌ها اهل فلفل تند نیستند. پیچیدگیِ طعم از زمان و ترشی می‌آید، نه از تندی؛ و خورشی که چهار ساعت نپخته باشد، هنوز جا نیفتاده است. از یک ایرانی بپرس قرمه‌سبزی چقدر زمان می‌برد، و جواب صادقانه‌اش این است: بیشترِ یک روز."),

 ("No heat, no rush, and no shortcuts. Persian food is slow on purpose.",
  "نه تندی، نه عجله و نه میان‌بُر. غذای ایرانی عمداً با حوصله پخته می‌شود."),

 ("A cuisine of long slow sourness, built around a grain, whose greatest achievement is the crust at the bottom of the pot, laid out all at once so that nobody has to ask for anything.",
  "آشپزی‌ای بر پایهٔ ترشیِ آرام و طولانی، حول یک دانه شکل گرفته، که بزرگ‌ترین شاهکارش همان ته‌دیگِ تهِ قابلمه است؛ همه‌چیز هم یکجا روی سفره چیده می‌شود تا هیچ‌کس مجبور نباشد چیزی بخواهد."),

 ("After, and In Between", "بعد از غذا، و میان وعده‌ها"),

 ("Persian sweetness is not the sugar of a European dessert. It runs on saffron, rosewater, pistachio, and sour, and quite a lot of it is not really a dessert at all. It is the thing that is out on the table permanently, for anyone who walks in.",
  "شیرینیِ ایرانی، آن شیرینیِ پرشکرِ دسرهای اروپایی نیست. عطر و طعمش از زعفران و گلاب و پسته و ترشی می‌آید، و خیلی از چیزهایی که در این دسته قرار می‌گیرند اصلاً دسر به معنای معمول کلمه نیستند. همان چیزهایی‌اند که همیشه روی سفره حاضرند، برای هر کسی که از در وارد شود."),

 ("The ice cream stretches, the fruit leather is sour enough to hurt, and there is always a bowl of nuts already out.",
  "بستنی کش می‌آید، لواشک آن‌قدر ترش است که دهانت را جمع می‌کند، و همیشه یک کاسه آجیل از قبل روی سفره هست."),
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
            r"((?:x|title|sub|h|lead|en|blurb|tag|label|front|back|name): '"
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
