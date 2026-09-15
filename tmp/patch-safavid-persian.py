# The Safavids, in Nojan's Persian.
#
# Forty-eight pairs. The empire that made Iran Shia and built Isfahan,
# so the register matters — this is the period Iranians are proudest of.

import re

PAIRS = [
 ("The Safavid Empire", "شاهنشاهی صفوی"),
 ("A Boy King and a New Faith", "شاهی نوجوان و آیینی تازه"),
 ("1501", "۱۵۰۱ میلادی"),

 ("For centuries after the Mongol storm, Iran had been a patchwork of rival lords and warring tribes, with no single ruler and no single soul. Then, at the very dawn of the sixteenth century, a boy of fourteen changed the course of the nation forever.",
  "قرن‌ها پس از توفان مغول، ایران مجموعه‌ای پراکنده از فرمانروایان رقیب و ایل‌های در حال جنگ بود؛ نه فرمانروایی واحد داشت و نه هویتی یکپارچه. سپس، درست در سپیده‌دم سده شانزدهم، نوجوانی چهارده‌ساله مسیر تاریخ این ملت را برای همیشه دگرگون کرد."),

 ("His name was Ismail, and he was the young leader of the Safavid order, a devoted religious brotherhood from the northwest of Iran. Around him gathered fierce and loyal warriors, and at their head he swept across the land, defeating all who stood against him.",
  "نامش اسماعیل بود؛ پیشوای جوان طریقت صفوی، یک طریقت مذهبی پرشور از شمال‌غرب ایران. جنگاورانی دلیر و وفادار گرد او جمع شدند و او در رأس آنان سراسر سرزمین را درنوردید و هرکس را که در برابرش ایستاد شکست داد."),

 ("Shah Ismail I, founder of the Safavid dynasty, who took the throne at fourteen.",
  "شاه اسماعیل یکم، بنیان‌گذار سلسله صفوی، که در چهارده‌سالگی بر تخت نشست."),

 ("The crown at fourteen", "تاج در چهارده‌سالگی"),

 ("In 1501 Ismail entered the city of Tabriz in triumph and had himself proclaimed Shah, the king of kings, taking the ancient title of the Persian monarchs. A boy still, he had founded a dynasty that would rule Iran for more than two centuries and restore it to greatness.",
  "در سال ۱۵۰۱، اسماعیل پیروزمندانه وارد تبریز شد و خود را شاه خواند؛ شاهنشاه، همان لقب کهنی که پادشاهان ایران از آن استفاده می‌کردند. هنوز نوجوان بود که سلسله‌ای بنیان گذاشت که بیش از دو قرن بر ایران فرمان راند و کشور را دوباره به جایگاه بزرگی رساند."),

 ("A faith that shaped a nation", "آیینی که ملتی را شکل داد"),

 ("Ismail did something that would define Iran to this very day. He made Shia Islam the faith of his realm, setting Iran apart from its powerful Sunni neighbours and giving the nation a distinct religious identity that has endured for five hundred years.",
  "اسماعیل کاری کرد که تا امروز هویت ایران را شکل داده است. تشیع را آیین رسمی قلمرو خود قرار داد و بدین‌ترتیب ایران را از همسایگان نیرومند سنی‌مذهبش متمایز کرد؛ هویتی دینی و متمایز به این ملت بخشید که پانصد سال دوام آورده است."),

 ("It was a decision of enormous consequence. It unified the many peoples of Iran under one faith and one crown, forged a strong sense of a single nation, and shaped the character of the country for all the centuries that followed. Modern Iran, in its faith and its borders, was born in these years.",
  "این تصمیم پیامدهایی عظیم داشت. مردمان گوناگون ایران را زیر یک آیین و یک تاج متحد کرد، حس نیرومندی از تعلق به ملتی واحد پدید آورد و سیمای این کشور را برای همه قرن‌های پس از آن شکل داد. ایران امروز، هم در آیین و هم در مرزهایش، در همین سال‌ها زاده شد."),

 ("From a fractured land, a single nation was reborn.",
  "از سرزمینی چندپاره، ملتی یکپارچه دوباره زاده شد."),

 ("The Struggle for the Realm", "کشمکش بر سر قلمرو"),
 ("1514 - 1587", "۱۵۱۴ تا ۱۵۸۷"),

 ("A reborn Iran did not go unchallenged. To the west lay the mighty Ottoman Empire, the greatest power of the age, and between the two great empires there began a long and bitter rivalry that would last for generations.",
  "ایرانِ دوباره‌زاده بی‌رقیب نماند. در غرب، امپراتوری نیرومند عثمانی قرار داشت؛ بزرگ‌ترین قدرت آن روزگار. میان این دو امپراتوری بزرگ، رقابتی دیرپا و تلخ آغاز شد که نسل‌ها ادامه یافت."),

 ("In 1514, at the battle of Chaldiran, the young Safavid state met the Ottomans in the field. The Ottomans had cannon and firearms, weapons the Safavid cavalry lacked, and the day went against Iran. It was a hard and early lesson that valour alone could not win a modern war.",
  "در سال ۱۵۱۴، در نبرد چالدران، دولت جوان صفوی در میدان نبرد با عثمانی‌ها روبه‌رو شد. عثمانی‌ها توپ و سلاح‌های آتشین داشتند، سلاح‌هایی که سواره‌نظام صفوی از آن‌ها بی‌بهره بود، و آن روز به زیان ایران تمام شد. این درسی سخت و زودهنگام بود: دلاوری به‌تنهایی نمی‌توانست یک جنگ مدرن را به پیروزی برساند."),

 ("A kingdom tested", "پادشاهی در بوته آزمایش"),

 ("The decades that followed were difficult ones. The dynasty was pressed on its frontiers by the Ottomans in the west and the Uzbeks in the east, and troubled at home by the rivalries of the powerful tribal chiefs on whom the throne depended.",
  "دهه‌های پس از آن دشوار بود. سلسله در مرزهایش از غرب زیر فشار عثمانی‌ها و از شرق زیر فشار ازبک‌ها قرار داشت و در داخل نیز گرفتار رقابت خان‌های نیرومند ایلی بود؛ همان‌هایی که تخت سلطنت به آنان تکیه داشت."),

 ("The Safavids faced the great powers of their age on every frontier.",
  "صفویان در هر مرز با قدرت‌های بزرگ روزگار خود روبه‌رو بودند."),

 ("Yet the young state endured. Through hard years and capable rulers it held together, waiting, though it did not yet know it, for the king who would raise it to its height.",
  "با این همه، دولت جوان دوام آورد. در سال‌های سخت و به دست فرمانروایانی کاردان، یکپارچه ماند و چشم‌به‌راه ماند؛ هرچند خودش هنوز نمی‌دانست در انتظار چه کسی است: شاهی که آن را به اوج قدرت خواهد رساند."),

 ("In 1587 the throne passed to a prince who would become the greatest of all the Safavid kings, and one of the greatest rulers in the whole history of Iran. His name was Abbas.",
  "در سال ۱۵۸۷، تخت به شاهزاده‌ای رسید که بزرگ‌ترین پادشاه صفوی و یکی از بزرگ‌ترین فرمانروایان در سراسر تاریخ ایران شد. نامش عباس بود."),

 ("Shah Abbas the Great", "شاه عباس بزرگ"),
 ("1587 - 1629", "۱۵۸۷ تا ۱۶۲۹"),

 ("Shah Abbas came to the throne of a troubled kingdom, hemmed in by enemies and weakened by division within. Over the course of his long reign he transformed it utterly, and left Iran stronger, richer, and more glorious than it had been in a thousand years.",
  "شاه عباس بر تخت پادشاهی‌ای نشست که گرفتار مشکلات بود؛ از بیرون در محاصره دشمنان و از درون تضعیف‌شده بر اثر تفرقه. در طول سلطنت طولانی‌اش آن را یکسره دگرگون کرد و ایران را نیرومندتر، ثروتمندتر و باشکوه‌تر از آنچه در هزار سال گذشته بود، بر جای گذاشت."),

 ("Shah Abbas the Great, under whom the Safavid Empire reached its height.",
  "شاه عباس بزرگ، که شاهنشاهی صفوی در روزگار او به اوج خود رسید."),

 ("He was a ruler of rare gifts: a brilliant soldier, a shrewd statesman, and a great patron of art and architecture. He was also, at times, a hard and suspicious man, as the great kings of that age often were. But his vision for Iran was without equal.",
  "فرمانروایی بود با توانایی‌هایی کم‌نظیر: سربازی درخشان، سیاستمداری زیرک و حامی بزرگ هنر و معماری. گاه نیز مردی سختگیر و بدگمان بود، چنان‌که پادشاهان بزرگ آن روزگار اغلب چنین بودند. اما چشم‌اندازی که برای ایران داشت، بی‌همتا بود."),

 ("The remaking of an army", "بازسازی یک ارتش"),

 ("Abbas understood the lesson of Chaldiran. He built a new standing army, no longer dependent on the fickle tribal cavalry, equipped with muskets and cannon in the modern way. With it he became master in his own house and a match for his enemies abroad.",
  "عباس درس چالدران را به‌خوبی دریافته بود. ارتشی تازه و دائمی ساخت که دیگر به سواره‌نظام متزلزل ایلی وابسته نبود و به شیوه‌ای مدرن به تفنگ و توپ مجهز شده بود. با این ارتش، هم در داخل کشور اختیار امور را به دست گرفت و هم در برابر دشمنان خارجی به رقیبی قدرتمند تبدیل شد."),

 ("Then he turned that army against the empires that had pressed Iran for so long. He drove back the Uzbeks in the east, and he won back from the Ottomans the great western lands they had taken, restoring Iran to its full strength and its rightful borders.",
  "سپس همین ارتش را علیه امپراتوری‌هایی به کار گرفت که سال‌ها بر ایران فشار آورده بودند. ازبکان را در شرق عقب راند و سرزمین‌های پهناور غربی را که عثمانیان گرفته بودند بازپس گرفت و ایران را به توان کامل و مرزهای تاریخی‌اش بازگرداند."),

 ("A modern army", "ارتشی مدرن"),

 ("A standing force with muskets and cannon, loyal to the crown alone.",
  "نیرویی دائمی، مجهز به تفنگ و توپ، که تنها به تاج‌وتخت وفادار بود."),

 ("Enemies driven back", "دشمنان عقب رانده شدند"),

 ("The Uzbeks in the east and the Ottomans in the west were defeated.",
  "ازبکان در شرق و عثمانیان در غرب شکست خوردند."),

 ("Trade and wealth", "تجارت و ثروت"),

 ("He welcomed merchants from across the world and made Iran rich.",
  "از بازرگانان سراسر جهان استقبال کرد و ایران را ثروتمند کرد."),

 ("A new capital", "پایتختی تازه"),

 ("He made Isfahan his capital and adorned it beyond compare.",
  "اصفهان را پایتخت خود کرد و آن را چنان آراست که در زیبایی همتایی نداشت."),

 ("A door opened to the world", "دری رو به جهان گشوده شد"),

 ("Abbas welcomed the world to Iran. He invited European merchants and ambassadors, encouraged the silk trade that was the treasure of his realm, and made his country a crossroads of commerce between East and West. Iranian silk and carpets travelled to the courts of Europe, and the wealth of the world flowed into Iran.",
  "عباس جهان را به روی ایران گشود. بازرگانان و سفیران اروپایی را دعوت کرد، تجارت ابریشم را که گنج قلمرو او بود رونق بخشید و کشورش را به چهارراه بازرگانی میان شرق و غرب تبدیل کرد. ابریشم و فرش ایرانی به دربارهای اروپا راه یافت و ثروت جهان به سوی ایران سرازیر شد."),

 ("Under his hand, Iran was not only strong but prosperous, respected among the great powers of the earth, and open to the world in a way it had not been for centuries.",
  "در دوران او، ایران نه‌تنها نیرومند، بلکه آباد و ثروتمند بود؛ در میان قدرت‌های بزرگ جهان احترام داشت و به روی جهان گشوده بود، آن‌گونه که قرن‌ها چنین نبود."),

 ("Isfahan, Half the World", "اصفهان، نصف جهان"),

 ("Of all that Shah Abbas achieved, none endures more beautifully than his capital. He made Isfahan the seat of his empire and set out to make it the most beautiful city on earth, and by the judgment of many who saw it, he succeeded.",
  "از میان همه دستاوردهای شاه عباس، هیچ‌کدام به زیبایی پایتختش ماندگار نشده است. اصفهان را پایتخت امپراتوری خود کرد و بر آن شد تا آن را زیباترین شهر روی زمین بسازد؛ و به گواه بسیاری از کسانی که آن را دیده بودند، در این کار موفق شد."),

 ("Isfahan, the capital of Shah Abbas, one of the most beautiful cities ever built.",
  "اصفهان، پایتخت شاه عباس، یکی از زیباترین شهرهایی که تاکنون ساخته شده است."),

 ("So great was its splendour that a saying arose, repeated by travellers across the world, that captured the wonder of all who beheld it.",
  "شکوهش چنان بود که سخنی بر سر زبان‌ها افتاد؛ جمله‌ای که مسافران از سراسر جهان آن را تکرار می‌کردند و شگفتی همه کسانی را که شهر را می‌دیدند به‌خوبی بیان می‌کرد."),

 ("Isfahan is half the world.", "اصفهان نصف جهان است."),

 ("At the heart of the city he laid out a vast royal square, the Naqsh-e Jahan, the Image of the World, one of the largest and most magnificent public squares ever built. Around it he raised buildings of such beauty that they remain, to this day, among the treasures of all humanity.",
  "در قلب شهر، میدان شاهی پهناوری بنا کرد: نقش جهان، «تصویر جهان»، یکی از بزرگ‌ترین و باشکوه‌ترین میدان‌های عمومی که تا آن زمان ساخته شده بود. پیرامون آن بناهایی ساخت چنان زیبا که هنوز هم در شمار گنجینه‌های بشریت‌اند."),

 ("Wonders in tile and stone", "شگفتی‌هایی از کاشی و سنگ"),

 ("On the square rose the great Shah Mosque, its dome and portals covered in dazzling blue tilework, a masterpiece of Persian architecture. Nearby stood the exquisite Sheikh Lotfollah Mosque, the graceful Ali Qapu palace, and the entrance to the endless royal bazaar.",
  "در میدان، مسجد بزرگ شاه سر برآورد؛ گنبد و سردرهایش پوشیده از کاشی‌کاری‌های خیره‌کننده آبی‌رنگ، شاهکاری از معماری ایرانی. در همان نزدیکی، مسجد ظریف و چشم‌نواز شیخ لطف‌الله، کاخ باشکوه عالی‌قاپو و سردر بازار بزرگ و بی‌پایان شاهی قرار داشت."),
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
