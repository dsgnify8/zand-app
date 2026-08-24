# Seven dishes and six sweets.
#
# Inserted at the end of each array by finding the declaration and then the
# array's own closing bracket, rather than by matching the last entry — the
# entries are long single lines and an anchor on one of them is brittle.
#
# Bakhtiari is deliberately absent.
#
# The Dish type also gains tagFa/xFa. Every existing entry already carries
# them; the type never declared them. Babel strips types so nothing broke,
# but it has been a quiet error this whole time.

p = "constants/culture.ts"
s = open(p).read()

# ------------------------------------------------------------ the type
a = "export type Dish = { key: string; fa: string; name: string; tag: string; x: string; image: string };"
b = ("export type Dish = {\n"
     "  key: string; fa: string; name: string; tag: string; x: string; image: string;\n"
     "  // Present on every entry; the type simply never said so.\n"
     "  tagFa?: string; xFa?: string;\n"
     "};")
typed = a in s
if typed:
    s = s.replace(a, b, 1)

# ------------------------------------------------------------ the food
DISHES = """  { key: 'baghali', fa: 'باقالی پلو', name: 'Baghali Polo', tag: 'THE SPRING ONE', tagFa: 'بهاری', image: 'food-baghali-polo',
    x: 'Rice steamed with broad beans and enough dill to turn the whole pot green, served with a lamb shank that gives way to a fork. The dill is not a hint of dill. It is most of the dish, and it is what a Persian kitchen smells like in spring.', xFa: 'برنجی که با باقالی و آن‌قدر شوید دم می‌کشد که تمام قابلمه سبز شود، و با ماهیچه‌ای که با فشار چنگال از هم باز می‌شود. شوید در آن اشاره نیست؛ بیشترِ غذاست، و آشپزخانهٔ ایرانی در بهار همین بو را دارد.' },
  { key: 'adas', fa: 'عدس پلو', name: 'Adas Polo', tag: 'SWEET IN THE MIDDLE OF THE MEAL', tagFa: 'شیرینی، وسط غذا', image: 'food-adas-polo',
    x: 'Lentils and rice with raisins, dates and fried onion, often cinnamon, sometimes minced meat. It unsettles anyone who believes sweetness belongs at the end of a meal. In Iran it belongs in the middle of the rice.', xFa: 'عدس و برنج با کشمش و خرما و پیاز داغ، معمولاً با دارچین و گاهی با گوشت چرخ‌کرده. هر کسی را که باور دارد شیرینی جای آخر غذاست به هم می‌ریزد. در ایران جایش وسط برنج است.' },
  { key: 'sabzipolo', fa: 'سبزی پلو ماهی', name: 'Sabzi Polo Mahi', tag: 'THE FIRST MEAL OF THE YEAR', tagFa: 'نخستین غذای سال', image: 'food-sabzi-polo-mahi',
    x: 'Herbed rice with fried white fish, eaten on the night of Nowruz in almost every Iranian house there is. Green for the new year, fish for the life in the water. It is the one meal in the calendar that nearly everybody eats on the same evening.', xFa: 'برنج سبزی‌دار با ماهی سرخ‌شده، که شب نوروز تقریباً در هر خانهٔ ایرانی خورده می‌شود. سبز برای سال نو، ماهی برای جانِ آب. تنها وعده‌ای در تقویم است که نزدیک به همه، یک شب، با هم می‌خورند.' },
  { key: 'mirza', fa: 'میرزا قاسمی', name: 'Mirza Ghasemi', tag: 'SMOKE, FROM THE CASPIAN', tagFa: 'دودِ شمال', image: 'food-mirza-ghasemi',
    x: 'Aubergine held over a flame until the skin blisters and splits, then mashed with garlic, tomato and egg. From Gilan on the Caspian coast, and the smoke is the entire point. Cooked in an oven instead of over fire it becomes a different and lesser dish.', xFa: 'بادمجانی که روی شعله می‌ماند تا پوستش تاول بزند و بترکد، بعد با سیر و گوجه و تخم‌مرغ له می‌شود. اهل گیلان است، کنار دریای کاسپین، و همهٔ ماجرا همان دود است. اگر در فر بپزد، غذای دیگری می‌شود و کمتر.' },
  { key: 'kashk', fa: 'کشک بادمجان', name: 'Kashk-e Bademjan', tag: 'THE ONE THAT ARRIVES FIRST', tagFa: 'اولی که می‌آید', image: 'food-kashk-bademjan',
    x: 'Fried aubergine crushed with garlic and mint oil, finished with kashk, a fermented whey whose sourness sits closer to cheese than to yoghurt. It comes out before the meal, it is eaten with bread, and it is usually gone before the rice arrives.', xFa: 'بادمجان سرخ‌شده که با سیر و نعنا داغ کوبیده می‌شود و رویش کشک می‌آید؛ همان فرآوردهٔ ترشی که مزه‌اش به پنیر نزدیک‌تر است تا ماست. پیش از غذا می‌آید، با نان خورده می‌شود، و معمولاً تا برنج برسد تمام شده است.' },
  { key: 'karafs', fa: 'خورش کرفس', name: 'Khoresh-e Karafs', tag: 'THE UNDERRATED ONE', tagFa: 'دست‌کم‌گرفته', image: 'food-khoresh-karafs',
    x: 'Celery stewed slowly with lamb, mint and parsley, then sharpened at the end with lemon or sour grape juice. Most cuisines use celery for flavour and throw it away. Persian cooking puts it at the centre of the dish, and is right to.', xFa: 'کرفس که آرام با گوشت و نعنا و جعفری می‌پزد و آخر کار با لیمو یا آبغوره تیز می‌شود. بیشتر آشپزی‌ها کرفس را برای طعم به کار می‌برند و بعد دور می‌ریزند. آشپزی ایرانی وسط غذا می‌نشاندش، و حق دارد.' },
  { key: 'estanboli', fa: 'استانبولی پلو', name: 'Estanboli Polo', tag: 'ONE POT, NO CEREMONY', tagFa: 'یک قابلمه، بی‌تشریفات', image: 'food-estanboli-polo',
    x: 'Tomato rice cooked with potato and minced meat in a single pot: no separate stew, nothing strained, nothing layered. Student food, travel food, and what gets made on a night when nobody has the patience for anything else. Every Iranian has a view on how much tomato is correct.', xFa: 'برنج گوجه‌ای که با سیب‌زمینی و گوشت چرخ‌کرده در یک قابلمه می‌پزد؛ نه خورشی جدا، نه آبکشی، نه دم‌کردنی لایه‌لایه. غذای دانشجویی است، غذای سفر، و همان چیزی که شبی پخته می‌شود که حوصلهٔ هیچ کار دیگری نیست. هر ایرانی نظری دارد که چقدر گوجه درست است.' },
"""

SWEETS = """  { key: 'qottab', fa: 'قطاب', name: 'Qottab', tag: 'YAZD, UNDER ICING SUGAR', tagFa: 'یزد، زیر پودر قند', image: 'food-qottab',
    x: 'A fried almond and walnut pastry folded into a small crescent and buried in icing sugar. Yazd is a desert city that built a reputation on sweets, and this is the one it is known for.', xFa: 'شیرینی سرخ‌شده‌ای با مغز بادام و گردو که هلالی کوچک تا می‌شود و زیر پودر قند پنهان می‌ماند. یزد شهری کویری است که نامش را با شیرینی ساخت، و قطاب همانی است که به آن شناخته می‌شود.' },
  { key: 'zoolbia', fa: 'زولبیا و بامیه', name: 'Zoolbia and Bamieh', tag: 'RAMADAN, AFTER DARK', tagFa: 'رمضان، بعد از غروب', image: 'food-zoolbia-bamieh',
    x: 'Batter piped into hot oil and dropped straight into saffron and rosewater syrup: zoolbia in lacy spirals, bamieh in short ridged fingers. They fill every window during Ramadan and are eaten at the breaking of the fast, with tea, in quantities nobody admits to.', xFa: 'خمیری که در روغن داغ ریخته می‌شود و یک‌راست می‌رود توی شربت زعفران و گلاب؛ زولبیا به شکل تورهای پیچ‌درپیچ، بامیه به شکل انگشت‌های کوتاه شیاردار. ماه رمضان ویترین‌ها پر از آن است و سر افطار با چای خورده می‌شود، به مقداری که کسی اعترافش نمی‌کند.' },
  { key: 'sholehzard', fa: 'شله زرد', name: 'Sholeh Zard', tag: 'MADE TO GIVE AWAY', tagFa: 'برای نذر', image: 'food-sholeh-zard',
    x: 'Saffron rice pudding, set in a shallow dish and written on in cinnamon and slivered almonds before it is carried next door. It is cooked for a vow, in enormous quantity, and almost never for the household alone.', xFa: 'فرنی زعفرانیِ برنجی که در ظرف کم‌عمق می‌بندد و پیش از آنکه در خانهٔ همسایه را بزنند، رویش با دارچین و خلال بادام می‌نویسند. برای نذر پخته می‌شود، به مقدار زیاد، و تقریباً هیچ‌وقت فقط برای خود خانه.' },
  { key: 'ranginak', fa: 'رنگینک', name: 'Ranginak', tag: 'DATES, FROM THE SOUTH', tagFa: 'خرما، از جنوب', image: 'food-ranginak',
    x: 'Dates stuffed with walnuts, laid out in a tray and covered in flour toasted in butter until it smells like caramel. From the south, around Shiraz and Bushehr. Sweet the way dates are sweet, which is not the way sugar is.', xFa: 'خرمای مغزدار با گردو که در سینی چیده می‌شود و رویش آردی می‌آید که در کره آن‌قدر تفت خورده تا بوی کارامل بدهد. اهل جنوب است، حوالی شیراز و بوشهر. شیرینی‌اش شیرینیِ خرماست، نه شیرینیِ شکر.' },
  { key: 'halva', fa: 'حلوا', name: 'Halva', tag: 'FOR THE DEAD, AND FOR GUESTS', tagFa: 'برای رفتگان، و برای مهمان', image: 'food-halva',
    x: 'Flour cooked slowly in butter until it darkens, loosened with saffron and rosewater syrup, then smoothed flat with the back of a spoon. It is made for funerals and memorials, which is why the smell of it carries a particular weight in an Iranian house.', xFa: 'آردی که آرام در کره می‌سوزد تا رنگ بگیرد، با شربت زعفران و گلاب باز می‌شود و با پشت قاشق صاف. برای ختم و یادبود پخته می‌شود، و برای همین بویش در خانهٔ ایرانی وزن خاصی دارد.' },
  { key: 'nanberenji', fa: 'نان برنجی', name: 'Nan-e Berenji', tag: 'KERMANSHAH, AT NOWRUZ', tagFa: 'کرمانشاه، سر نوروز', image: 'food-nan-berenji',
    x: 'A pale rice flour biscuit with cardamom and a scatter of poppy seeds, so short it collapses the moment it is bitten. It comes out at Nowruz beside the tea, and it is the one that leaves crumbs across the whole room.', xFa: 'شیرینی روشنی از آرد برنج با هل و چند دانه خشخاش، چنان ترد که تا گاز می‌زنی از هم می‌پاشد. نوروز کنار چای می‌آید، و همانی است که تمام اتاق را خرده‌ریز می‌کند.' },
"""


def append_to(src: str, decl: str, block: str):
    """Insert before the array's own closing bracket."""
    i = src.index(decl)
    end = src.index("\n];", i)
    return src[: end + 1] + block + src[end + 1 :]


ok = []
for decl, block, label in [
    ("export const DISHES: Dish[] = [", DISHES, "DISHES"),
    ("export const SWEETS: Dish[] = [", SWEETS, "SWEETS"),
]:
    if decl in s:
        s = append_to(s, decl, block)
        ok.append(label)
    else:
        print("   declaration not found:", label)

open(p, "w").write(s)

print("Dish type widened:", typed)
print("appended to:", ", ".join(ok) if ok else "nothing")
print("dishes now:", s.count("image: 'food-"))
for k in ['baghali', 'adas', 'sabzipolo', 'mirza', 'kashk', 'karafs', 'estanboli',
          'qottab', 'zoolbia', 'sholehzard', 'ranginak', 'halva', 'nanberenji']:
    if "key: '" + k + "'" not in s:
        print("   MISSING:", k)
print("bakhtiari present:", "bakhtiari" in s)
