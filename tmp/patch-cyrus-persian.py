# Cyrus the Great, in Nojan's Persian.
#
# Seventy-nine pairs. Matched whole field to whole field — `x: '<exactly
# this>'` — never on a substring, because an earlier pass searched for the
# English anywhere in the file and a heading overwrote a paragraph that
# happened to contain the same words.
#
# The English here came out of the file, so its curly apostrophes are the
# file's own. Matched as-is rather than normalised.

import os
import re

PAIRS = [
 ("Cyrus the Great", "کوروش بزرگ"),
 ("A King Is Born", "شاهی زاده می‌شود"),
 ("c. 600 BCE", "حدود ۶۰۰ پیش از میلاد"),

 ("More than two and a half thousand years ago, in the highlands of what is now southern Iran, a child was born who would change the shape of the ancient world. His name was Kurush, whom history remembers as Cyrus, and the empire he built would be the largest the world had yet seen.",
  "بیش از دو هزار و پانصد سال پیش، در سرزمین‌های کوهستانیِ جایی که امروز جنوب ایران نام دارد، کودکی چشم به جهان گشود که بعدها چهرهٔ جهان باستان را دگرگون کرد. نام او کوروش بود؛ همان کسی که تاریخ او را با نام کوروش به یاد سپرده است. امپراتوری‌ای که او بنا کرد، بزرگ‌ترین امپراتوری بود که جهان تا آن روز به خود دیده بود."),

 ("The land of his birth, Persia, was then a small kingdom of herders and farmers, a subject people living in the shadow of the mighty Median Empire to their north. Few could have imagined that from this modest place would rise a ruler whose name would still be spoken with reverence across the world, so many centuries later.",
  "سرزمین زادگاه او، پارس، در آن روزگار پادشاهی کوچکی از چوپانان و کشاورزان بود؛ مردمانی که زیر فرمان و در سایهٔ امپراتوری نیرومند ماد، در شمال، زندگی می‌کردند. کمتر کسی می‌توانست تصور کند که از دل چنین سرزمین کوچکی فرمانروایی ظهور خواهد کرد که قرن‌ها بعد، نامش همچنان در سراسر جهان با احترام بر زبان‌ها جاری باشد."),

 ("The legend of the infant king", "افسانهٔ شاهِ نوزاد"),

 ("The Greek historian Herodotus, writing a century after Cyrus, preserved a story that reads like myth. Astyages, king of the Medes and Cyrus’s own grandfather, dreamed that his daughter’s child would one day overthrow him. Fearing the omen, he ordered the newborn boy to be killed.",
  "هرودوت، تاریخ‌نگار یونانی که حدود یک قرن پس از کوروش می‌نوشت، داستانی را ثبت کرده است که بیشتر به افسانه‌ای اسطوره‌ای می‌ماند. آستیاگ، شاه ماد و پدربزرگ مادری کوروش، خواب دید که فرزند دخترش روزی او را از تخت پادشاهی سرنگون خواهد کرد. او که از این خواب بیمناک شده بود، فرمان داد نوزاد را به قتل برسانند."),

 ("But the servant charged with the deed could not do it. The infant was given instead to a herdsman in the mountains, who raised him as his own. The child grew strong and commanding, and even at play the other children chose him as their king, so plainly did he seem born to rule.",
  "اما خدمتکاری که مأمور اجرای این فرمان شده بود، نتوانست دست به چنین کاری بزند. در عوض، نوزاد را به چوپانی در کوهستان سپردند و او کودک را همچون فرزند خودش بزرگ کرد. کودک رشد کرد و به پسری نیرومند و باصلابت بدل شد. حتی هنگام بازی نیز دیگر کودکان او را به پادشاهی برمی‌گزیدند؛ چنان‌که گویی از همان ابتدا برای فرمانروایی زاده شده بود."),

 ("This boy, the son of a herdsman as we supposed, is in truth the grandson of the king.",
  "این پسر، که گمان می‌کردیم فرزند یک چوپان است، در حقیقت نوهٔ شاه است."),

 ("In time the truth was discovered, and the boy was restored to his royal family. Whether the tale is history or legend, it carried a deeper meaning for those who told it. Greatness, they believed, could not be hidden or destroyed. It would find its way into the world no matter what stood against it.",
  "سرانجام حقیقت آشکار شد و پسر به خاندان سلطنتی خود بازگردانده شد. این داستان تاریخی باشد یا افسانه، برای کسانی که آن را نسل‌به‌نسل روایت کردند، معنایی عمیق‌تر داشت. آنان باور داشتند که بزرگی را نه می‌توان پنهان کرد و نه از میان برد. بزرگی، هر مانعی هم که در برابرش قرار گیرد، سرانجام راه خود را به جهان خواهد گشود."),

 ("Behind the legend lies the record. Cyrus was born of the royal house of Persia, the Achaemenid line, son of Cambyses, king of Anshan, and, by his mother Mandane, grandson of the Median king himself. He was heir to a small throne, but through his veins ran the blood of kings.",
  "پشت این افسانه، روایت تاریخی نیز قرار دارد. کوروش از خاندان شاهی پارس و از دودمان هخامنشی بود؛ پسر کمبوجیه، شاه انشان، و از سوی مادرش ماندانا، نوهٔ آستیاگ، شاه ماد. او وارث تختی کوچک بود، اما خون شاهان در رگ‌هایش جاری بود."),

 ("A world waiting to be remade", "جهانی در انتظار دگرگونی"),

 ("The world into which Cyrus came was divided among four great powers. The Medes ruled the Iranian plateau, Babylon held the fertile heart of Mesopotamia, Lydia commanded the wealth of Asia Minor, and Egypt guarded the ancient valley of the Nile. Persia was a minor kingdom among giants.",
  "جهانی که کوروش در آن چشم به دنیا گشود، میان چهار قدرت بزرگ تقسیم شده بود. مادها بر فلات ایران فرمان می‌راندند، بابل بر قلب حاصلخیز میان‌رودان تسلط داشت، لیدیه ثروت آسیای صغیر را در اختیار گرفته بود و مصر از درهٔ کهن نیل پاسداری می‌کرد. در میان این غول‌ها، پارس تنها پادشاهی کوچکی بود."),

 ("Within a single generation, Cyrus would bring all but one of these under his rule, and bind them into a single empire stretching from the Aegean Sea to the edge of India. It would be the first empire in history to unite so many peoples, and the first to attempt to rule them with tolerance rather than terror.",
  "اما در طول یک نسل، کوروش همهٔ این قدرت‌ها جز یکی را زیر فرمان خود درمی‌آورد و آنها را در امپراتوری واحدی گرد می‌آورد؛ امپراتوری‌ای که از دریای اژه تا مرزهای هند امتداد داشت. این نخستین امپراتوری تاریخ بود که چنین شمار بزرگی از مردمان گوناگون را در قلمرو واحدی گرد آورد و کوشید به جای وحشت و خشونت، با مدارا بر آنان حکومت کند."),

 ("From a small kingdom of herders, he would build the greatest empire the world had known.",
  "او از پادشاهی کوچکِ چوپانان، بزرگ‌ترین امپراتوری جهانِ آن روز را بنا کرد."),

 ("The Rise Against the Medes", "خیزش در برابر مادها"),
 ("c. 553 – 550 BCE", "حدود ۵۵۳ تا ۵۵۰ پیش از میلاد"),

 ("When Cyrus came to the throne of Persia around 559 BCE, his people were still vassals of the Median king Astyages, the very grandfather who, in legend, had once tried to kill him. For a time the young king bided his time, gathering the loyalty of the Persian tribes and waiting for his moment.",
  "هنگامی که کوروش حدود ۵۵۹ پیش از میلاد بر تخت پارس نشست، مردم او همچنان تابع آستیاگ، شاه ماد، بودند؛ همان پدربزرگی که بنا بر افسانه، روزی فرمان قتل او را صادر کرده بود. شاه جوان مدتی شکیبایی پیشه کرد، وفاداری قبایل پارسی را به دست آورد و در انتظار فرصت مناسب ماند."),

 ("That moment came around 553 BCE, when Cyrus raised the standard of revolt. The Persians were fewer and poorer than their Median overlords, but they were hardy mountain people, and they had a leader unlike any they had known.",
  "آن فرصت سرانجام حدود ۵۵۳ پیش از میلاد فرا رسید؛ زمانی که کوروش پرچم شورش را برافراشت. پارسیان از فرمانروایان مادی خود کم‌شمارتر و فقیرتر بودند، اما مردمانی سخت‌جان و پرتوان از سرزمین‌های کوهستانی بودند و رهبری داشتند که مانندش را پیش از آن ندیده بودند."),

 ("The battle that changed everything", "نبردی که همه‌چیز را دگرگون کرد"),

 ("Astyages marched against the rebels with a great army. But according to the ancient accounts, his own general, Harpagus, still nursed a bitter hatred of the king, and at the decisive moment much of the Median army went over to Cyrus rather than fight him. Astyages was captured, and the Median crown passed to the Persian.",
  "آستیاگ با سپاهی بزرگ به جنگ شورشیان رفت. اما بنا بر روایت‌های کهن، سردار خود او، هارپاگ، همچنان کینه‌ای عمیق از شاه در دل داشت. در لحظهٔ سرنوشت‌ساز، بخش بزرگی از سپاه ماد به جای جنگیدن با کوروش، به او پیوست. آستیاگ به اسارت درآمد و تاج‌وتخت ماد به دست پارسیان افتاد."),

 ("It was a turning of the world. The subject had become the master, and the small kingdom of Persia now ruled the vast lands of the Medes. Yet Cyrus did something remarkable, and characteristic. He did not execute or humiliate his defeated grandfather, but spared his life and, it is said, kept him at his court.",
  "گویی جهان یک‌باره زیرورو شده بود. آن‌که تا دیروز زیردست بود، اکنون سرور شده بود و پادشاهی کوچک پارس بر سرزمین‌های پهناور ماد فرمان می‌راند. با این همه، کوروش دست به کاری زد که هم شگفت‌انگیز بود و هم با منش او سازگار. او پدربزرگ شکست‌خورده‌اش را نه کشت و نه تحقیر کرد؛ جانش را بخشید و، بنا بر روایت‌ها، او را در دربار خود نگاه داشت."),

 ("A new kind of conqueror", "فاتحی از جنس دیگر"),

 ("From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.",
  "کوروش از همان نخستین پیروزی، خصلتی را آشکار کرد که بعدها ویژگی برجستهٔ فرمانروایی او شد. در روزگاری که دیگر فاتحان با کشتار و وحشت حکومت می‌کردند، او با شکست‌خوردگان مدارا کرد و آنان را در نظم تازه‌ای که می‌ساخت جای داد. این تنها مهربانی نبود؛ شیوه‌ای خردمندانه‌تر و ماندگارتر برای فرمانروایی بود."),

 ("With Media his, Cyrus inherited not only its lands but its network of tributaries and its place among the great powers. The kings of the age now took notice of the newcomer who had risen so suddenly in the east. Among them was Croesus of Lydia, the richest man in the known world, who watched the Persian’s rise with growing alarm.",
  "با به دست آوردن ماد، کوروش نه‌تنها سرزمین‌های آن را تصاحب کرد، بلکه شبکهٔ حکومت‌های خراج‌گزار و جایگاه آن را در میان قدرت‌های بزرگ نیز به ارث برد. شاهان آن روزگار اکنون متوجه فرمانروای تازه‌ای شده بودند که ناگهان در شرق سر برآورده بود. یکی از آنان کرزوس، شاه لیدیه و ثروتمندترین مرد جهان شناخته‌شده، بود که با نگرانی روزافزون به قدرت گرفتن این پارسی می‌نگریست."),

 ("Cyrus becomes king of Persia", "کوروش شاه پارس می‌شود"),
 ("Revolt against the Medes", "شورش در برابر مادها"),
 ("Astyages falls; Media is won", "سقوط آستیاگ؛ فتح ماد"),
 ("Croesus and the Fall of Lydia", "کرزوس و سقوط لیدیه"),
 ("c. 547 BCE", "حدود ۵۴۷ پیش از میلاد"),

 ("To the west lay Lydia, a kingdom of legendary wealth ruled by Croesus, whose very name became a byword for riches. Alarmed by the rise of Persia, Croesus resolved to strike first, and before he marched he sent to the famous oracle at Delphi to ask what would happen if he made war on Cyrus.",
  "در غرب، لیدیه قرار داشت؛ پادشاهی‌ای با ثروتی افسانه‌ای که کرزوس بر آن فرمان می‌راند و نامش خود به نمادی از ثروت و توانگری تبدیل شده بود. کرزوس که از قدرت گرفتن پارس بیمناک بود، تصمیم گرفت پیش‌دستی کند. پیش از لشکرکشی، نزد پیشگوی نامدار دلفی فرستاد تا بپرسد اگر با کوروش وارد جنگ شود، چه سرنوشتی در انتظارش خواهد بود."),

 ("The oracle gave its famous reply, that if Croesus went to war he would destroy a great empire. Delighted, he took it as a promise of victory. He did not consider that the great empire he would destroy might be his own.",
  "پیشگو پاسخ مشهور خود را داد: اگر کرزوس به جنگ برود، امپراتوری بزرگی را نابود خواهد کرد. کرزوس از شنیدن این پاسخ شادمان شد و آن را نوید پیروزی دانست. اما به این احتمال فکر نکرد که آن امپراتوری بزرگ شاید امپراتوری خودش باشد."),

 ("If Croesus makes war on the Persians, he will destroy a mighty empire.",
  "اگر کرزوس با پارسیان وارد جنگ شود، امپراتوری بزرگی را نابود خواهد کرد."),

 ("A trick of camels", "ترفند شترها"),

 ("The armies met, and after an indecisive battle Croesus withdrew for the winter, expecting Cyrus to do the same. But Cyrus did not follow the old rules of war. He pursued at once, marching in the cold to strike while the Lydian army was dispersed, and appeared before the walls of Sardes when he was least expected.",
  "دو سپاه به هم رسیدند و پس از نبردی بی‌نتیجه، کرزوس برای زمستان عقب نشست؛ با این تصور که کوروش نیز همین کار را خواهد کرد. اما کوروش خود را پایبند قواعد دیرین جنگ نمی‌دانست. بی‌درنگ به تعقیب او پرداخت و در سرمای زمستان پیش رفت تا زمانی ضربه بزند که سپاه لیدیه پراکنده بود. سپس در زمانی که هیچ‌کس انتظارش را نداشت، در برابر دیوارهای سارد ظاهر شد."),

 ("In the battle before the city, the famed Lydian cavalry was the finest in the world. So Cyrus, by the counsel of Harpagus, placed his baggage camels at the front of his line. The horses of the Lydians, unused to the sight and smell of camels, panicked and refused to charge, and the battle was won.",
  "در نبردی که در برابر شهر درگرفت، سواره‌نظام نامدار لیدیه بهترینِ جهان به شمار می‌رفت. از این رو، کوروش به پیشنهاد هارپاگ، شترهای بارکش را در پیشاپیش صفوف سپاهش قرار داد. اسب‌های لیدیه که به دیدن و بوی شتر عادت نداشتند، رم کردند و از یورش سرباز زدند؛ و همین تدبیر سرنوشت نبرد را رقم زد."),

 ("The mercy of the victor", "بخششِ فاتح"),

 ("Sardes fell, and Croesus was taken. By some accounts Cyrus had built a great pyre to burn the captured king, as was the custom. But as the flames rose, Croesus called out the name of the Athenian sage Solon, who had once warned him that no man should be counted happy until his life had ended well.",
  "سارد سقوط کرد و کرزوس به اسارت درآمد. بنا بر برخی روایت‌ها، کوروش مطابق رسم آن روزگار هیزم و هیمهٔ بزرگی فراهم کرده بود تا شاه اسیر را در آتش بسوزاند. اما هنگامی که شعله‌ها زبانه کشیدند، کرزوس نام سولون، حکیم آتنی، را بر زبان آورد؛ همان کسی که روزی به او هشدار داده بود هیچ انسانی را نمی‌توان خوشبخت دانست، مگر آنکه زندگی‌اش به نیکی به پایان رسیده باشد."),

 ("Struck by the words, and by the turning of fortune that could bring the richest king on earth to a burning pyre, Cyrus ordered the fire quenched and spared him. Croesus, the stories say, became a trusted counsellor at the Persian court. Once again the defeated enemy was made a friend.",
  "کوروش تحت تأثیر این سخنان و نیز گردش شگفت‌انگیز بخت قرار گرفت؛ همان بختی که می‌توانست ثروتمندترین شاه روی زمین را بر هیزمی افروخته بنشاند. پس فرمان داد آتش را خاموش کنند و جان او را بخشید. بنا بر روایت‌ها، کرزوس بعدها به مشاوری مورد اعتماد در دربار پارس تبدیل شد. بار دیگر، دشمن شکست‌خورده به دوست بدل شد."),

 ("No man should be counted happy until the end of his life is known.",
  "هیچ‌کس را خوشبخت مشمار، مگر آنکه پایان زندگی‌اش را دیده باشی."),

 ("Babylon and the Freeing of the Captives", "بابل و رهایی اسیران"),
 ("539 BCE", "۵۳۹ پیش از میلاد"),

 ("Now only one of the great powers stood between Cyrus and mastery of the known world: Babylon, the ancient and magnificent city on the Euphrates, its walls counted among the wonders of the earth. In 539 BCE, Cyrus turned toward it.",
  "اکنون تنها یکی از قدرت‌های بزرگ میان کوروش و فرمانروایی بر جهان شناخته‌شده قرار داشت: بابل، شهر باستانی و باشکوه بر کرانهٔ فرات، با دیوارهایی که از شگفتی‌های جهان به شمار می‌آمدند. در سال ۵۳۹ پیش از میلاد، کوروش روی به سوی آن نهاد."),

 ("Babylon was ruled by Nabonidus, a king who had estranged his own priests and people. When Cyrus came, the accounts tell that the city opened its gates to him almost without a fight, its people welcoming him less as a conqueror than as a deliverer.",
  "بابل زیر فرمان نبونید بود؛ شاهی که کاهنان و مردم خود را از خویش بیگانه کرده بود. روایت‌ها می‌گویند هنگامی که کوروش از راه رسید، شهر تقریباً بدون نبرد دروازه‌هایش را به روی او گشود و مردم، بیش از آنکه او را فاتحی بیگانه بدانند، همچون رهایی‌بخشی به استقبالش رفتند."),

 ("The Cyrus Cylinder", "استوانهٔ کوروش"),

 ("What Cyrus did next echoed through history. Rather than sack the great city or drag its gods away in chains, as conquerors before him had done, he entered in peace, honored the Babylonian god Marduk, restored the temples, and let the life of the city go on undisturbed.",
  "آنچه کوروش پس از آن انجام داد، در تاریخ طنین‌انداز شد. برخلاف فاتحان پیش از خود که شهرهای بزرگ را غارت می‌کردند و خدایانشان را به زنجیر می‌کشیدند، کوروش در صلح وارد بابل شد، به مردوک، خدای بزرگ بابلیان، احترام گذاشت، نیایشگاه‌ها را بازسازی کرد و اجازه داد زندگی شهر بدون آشوب ادامه یابد."),

 ("He recorded his acts on a clay barrel now known as the Cyrus Cylinder, one of the most remarkable objects to survive from the ancient world. In it he tells how he freed the peoples held captive in Babylon and let them return to their homelands, and how he restored their temples and their gods.",
  "او اقدامات خود را بر استوانه‌ای گِلی ثبت کرد که امروز آن را «استوانهٔ کوروش» می‌نامیم؛ یکی از برجسته‌ترین آثار به‌جامانده از جهان باستان. در آن، از آزادی مردمانی سخن می‌گوید که در بابل به اسارت گرفته شده بودند و اجازه یافتند به سرزمین‌های خود بازگردند؛ همچنین از بازسازی نیایشگاه‌ها و بازگرداندن خدایان آنان به جایگاهشان سخن می‌گوید."),

 ("I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.",
  "خدایانی را که در آنجا می‌زیستند، به جایگاه‌هایشان بازگرداندم و گذاشتم در خانه‌های جاودان خویش سکونت کنند. مردمانشان را گرد آوردم و خانه‌هایشان را به آنان بازگرداندم."),

 ("The return of the exiles", "بازگشت تبعیدیان"),

 ("Among those he freed were the people of Judah, carried off to Babylon in captivity a generation before. Cyrus allowed them to return to Jerusalem and to rebuild their temple, an act remembered in the Hebrew Bible with extraordinary gratitude. In its pages he is called the anointed of God, the only foreign ruler ever given that title.",
  "در میان کسانی که کوروش آزاد کرد، مردم یهودا نیز بودند؛ مردمانی که یک نسل پیش‌تر به اسارت به بابل برده شده بودند. کوروش به آنان اجازه داد به اورشلیم بازگردند و معبد خود را از نو بنا کنند؛ اقدامی که در کتاب مقدس عبری با سپاسی کم‌نظیر از آن یاد شده است. در آن کتاب، کوروش «مسح‌شدهٔ خداوند» خوانده شده است؛ تنها فرمانروای بیگانه‌ای که چنین عنوانی به او داده شده است."),

 ("Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.",
  "کوروش، شاه پارس، چنین می‌گوید: خداوند مرا فرمان داده است تا برای او در اورشلیم خانه‌ای بنا کنم. هر کس از قوم او در میان شماست، برخیزد و به آنجا برود."),

 ("It is a rare thing in history for a conqueror to be remembered as a liberator by the people he ruled. Cyrus was remembered so by Babylonians, by Jews, and by Greeks alike, each in their own writings, each telling of a king who ruled with a restraint the ancient world had never seen.",
  "در تاریخ کمتر پیش می‌آید که مردمی، فاتحی را که بر آنان فرمان رانده است، به عنوان رهایی‌بخش به یاد آورند. اما بابلیان، یهودیان و یونانیان، هر یک در نوشته‌های خود، کوروش را چنین به یاد سپردند؛ هر یک از شاهی سخن گفتند که با خویشتن‌داری‌ای فرمان می‌راند که جهان باستان کمتر نظیر آن را دیده بود."),

 ("The Empire and Its Ideals", "امپراتوری و آرمان‌های آن"),

 ("By now the empire of Cyrus stretched from the Aegean Sea in the west to the borders of India in the east, the largest the world had yet seen. But its true greatness lay not in its size. It lay in how he chose to rule it.",
  "اکنون امپراتوری کوروش از دریای اژه در غرب تا مرزهای هند در شرق گسترده شده بود؛ بزرگ‌ترین امپراتوری‌ای که جهان تا آن روز به خود دیده بود. اما عظمت واقعی آن در وسعتش نبود؛ در شیوه‌ای بود که کوروش برای فرمانروایی بر آن برگزیده بود."),

 ("A new idea of empire", "نگاهی نو به مفهوم امپراتوری"),

 ("The empires before him had ruled by fear. They deported whole peoples, burned rebellious cities, and demanded that the conquered abandon their gods and their ways. Cyrus built something different. He let the many peoples of his empire keep their own faiths, their own customs, and their own local rulers, so long as they kept the peace and paid their tribute.",
  "امپراتوری‌های پیش از او با ترس و وحشت حکومت می‌کردند. آنان مردمان را دسته‌جمعی از سرزمین‌هایشان کوچ می‌دادند، شهرهای سرکش را به آتش می‌کشیدند و از اقوام مغلوب می‌خواستند خدایان و آیین‌های خود را کنار بگذارند. اما کوروش راه دیگری در پیش گرفت. او به مردمان گوناگون امپراتوری‌اش اجازه داد دین و آیین، رسم‌ورسوم و حتی فرمانروایان محلی خود را حفظ کنند؛ به شرط آنکه صلح و نظم را برهم نزنند و خراج خود را بپردازند."),

 ("Tolerance of faith", "بردباری دینی"),

 ("Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.",
  "هر قوم آزاد بود خدایان خود را بپرستد. کوروش نیز به نیایشگاه‌های سرزمین‌هایی که بر آنها فرمان می‌راند، احترام می‌گذاشت."),

 ("This was more than mercy. It was a philosophy of power, the understanding that an empire held together by respect would outlast one held together by fear. For his ideals of tolerance and human dignity, the Cyrus Cylinder is sometimes called the first charter of human rights, and a copy of it rests today at the United Nations.",
  "این چیزی فراتر از بخشش بود؛ نوعی فلسفهٔ قدرت بود: این درک که امپراتوری‌ای که با احترام در کنار هم نگه داشته شود، از امپراتوری‌ای که با ترس حفظ شود، پایدارتر خواهد بود. به سبب برداشت‌هایی که از آرمان‌های کوروش دربارهٔ بردباری و کرامت انسانی شده است، استوانهٔ کوروش گاه «نخستین منشور حقوق بشر» نامیده می‌شود و نسخه‌ای از آن امروزه در سازمان ملل متحد نگهداری می‌شود."),

 ("An idea that endures", "اندیشه‌ای ماندگار"),

 ("The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.",
  "آرمان کوروش، اینکه مردمان گوناگون بتوانند زیر فرمانروایی دادگرانه در کنار یکدیگر زندگی کنند و هر یک هویت خود را حفظ کنند، یکی از کهن‌ترین و ماندگارترین آرمان‌های تاریخ بشر است. بیش از دو هزار و پانصد سال بعد، این اندیشه هنوز با ما سخن می‌گوید."),

 ("The Death of a King", "مرگ یک شاه"),
 ("c. 530 BCE", "حدود ۵۳۰ پیش از میلاد"),

 ("Even the greatest of kings must meet his end. In his final years Cyrus turned to secure the far northeastern frontier of his empire, where the fierce nomadic peoples of Central Asia raided the borders. It was there, around 530 BCE, that he met his death, campaigning against a people the Greeks called the Massagetae.",
  "حتی بزرگ‌ترین شاهان نیز سرانجام با مرگ روبه‌رو می‌شوند. کوروش در واپسین سال‌های زندگی‌اش برای استوار کردن مرزهای دوردست شمال‌شرقی امپراتوری خود به آن نواحی رفت؛ جایی که اقوام کوچ‌نشین و جنگاور آسیای میانه پیوسته به مرزها یورش می‌بردند. همان‌جا بود، حدود ۵۳۰ پیش از میلاد، که در جریان لشکرکشی علیه قومی که یونانیان «ماساگت‌ها» می‌نامیدند، جان باخت."),

 ("The accounts of his end differ, as befits a figure who had already passed into legend. Herodotus tells a dramatic tale of the warrior queen Tomyris, who ruled the Massagetae, and whose son fell into Cyrus’s hands and died. In her grief and fury, she is said to have sworn vengeance.",
  "روایت‌ها دربارهٔ چگونگی مرگ او متفاوت‌اند؛ چنان‌که از شخصیتی که تا آن زمان به چهره‌ای افسانه‌ای بدل شده بود، انتظار می‌رود. هرودوت داستانی پرهیجان از تهم‌ریش، ملکهٔ جنگاور ماساگت‌ها، نقل می‌کند؛ زنی که پسرش به دست کوروش افتاد و جان باخت. گفته‌اند تهم‌ریش در سوگ و خشم، سوگند به انتقام خورد."),

 ("In the great battle that followed, Herodotus writes, Cyrus was killed and his army defeated. It was, he says, the most violent battle fought among barbarian peoples in all his knowledge. Whether the tale is true in every detail, or grew in the telling, the core is remembered: the great king fell in the field, far from home, still leading his armies.",
  "هرودوت می‌نویسد که در نبرد بزرگی که پس از آن درگرفت، کوروش کشته شد و سپاهش شکست خورد. به گفتهٔ او، این خشن‌ترین نبردی بود که میان اقوامی که آنان را «بربر» می‌نامید، در سراسر زندگی‌اش دیده بود. اینکه داستان در تمام جزئیات درست باشد یا در گذر زمان رنگ افسانه به خود گرفته باشد، اصل ماجرا همچنان باقی است: شاه بزرگ در میدان نبرد، دور از زادگاهش و در حالی که هنوز سپاهش را رهبری می‌کرد، جان باخت."),

 ("His body was brought back across the length of the empire he had built, to rest in the land of his birth, at his capital of Pasargadae.",
  "پیکر او را از سراسر امپراتوری‌ای که خود بنا کرده بود بازگرداندند تا در سرزمین زادگاهش، در پایتخت او، پاسارگاد، آرام گیرد."),

 ("The tomb at Pasargadae", "آرامگاه پاسارگاد"),

 ("There, upon the plain of Pasargadae, stands his tomb, a simple and noble structure of pale stone that has endured for two and a half thousand years. It survived even the coming of Alexander the Great, who, conquering Persia two centuries later, is said to have honored the tomb of Cyrus and ordered it protected.",
  "آنجا، در دشت پاسارگاد، آرامگاه او هنوز پابرجاست؛ بنایی ساده و باشکوه از سنگ‌های روشن که دو هزار و پانصد سال در برابر گذر زمان دوام آورده است. این آرامگاه حتی از روزگار اسکندر مقدونی نیز جان به در برد؛ اسکندری که دو قرن بعد پارس را فتح کرد و بنا بر روایت‌ها، به آرامگاه کوروش ادای احترام کرد و فرمان داد از آن محافظت شود."),

 ("An inscription said to have once stood there carried words of quiet dignity, a king asking not for glory but for peace, reminding the passer by that he too was mortal.",
  "گفته‌اند زمانی سنگ‌نوشته‌ای در آنجا قرار داشته که کلماتی ساده و باوقار بر آن نقش بسته بود؛ سخنان شاهی که نه شکوه، بلکه آرامش می‌خواست و به هر رهگذری یادآوری می‌کرد که او نیز فانی است."),

 ("O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.",
  "ای انسان، هر که هستی، من کوروشم؛ آن‌که برای پارسیان امپراتوری‌ای به دست آورد. بر این اندک خاکی که پیکرم را پوشانده است، دریغ مدار."),

 ("The Legacy That Endures", "میراثی که ماندگار است"),

 ("The empire Cyrus founded did not die with him. Under his son Cambyses and then Darius the Great it grew still larger, reaching into Egypt and to the plains of India and the edge of Europe, and it endured for two hundred years as the mightiest power on earth, until the coming of Alexander.",
  "امپراتوری‌ای که کوروش بنیان گذاشت، با مرگ او از میان نرفت. در دوران پسرش، کمبوجیه، و پس از او در زمان داریوش بزرگ، این امپراتوری باز هم گسترده‌تر شد؛ تا مصر، دشت‌های هند و مرزهای اروپا پیش رفت و نزدیک به دویست سال به عنوان نیرومندترین قدرت روی زمین پابرجا ماند، تا سرانجام اسکندر از راه رسید."),

 ("But the deeper legacy of Cyrus was not his empire. It was his example. He showed that a ruler could be strong and merciful at once, that a conqueror could also be a liberator, and that an empire of many peoples could be bound together by respect rather than fear.",
  "اما میراث ژرف‌تر کوروش، امپراتوری او نبود؛ سرمشقی بود که از خود به جا گذاشت. او نشان داد که یک فرمانروا می‌تواند در عین نیرومندی، بخشنده نیز باشد؛ اینکه یک فاتح می‌تواند رهایی‌بخش هم باشد؛ و اینکه امپراتوری‌ای متشکل از مردمان گوناگون را می‌توان با احترام به یکدیگر پیوند داد، نه با ترس."),

 ("The king the world remembered", "شاهی که جهان به یاد سپرد"),

 ("The Greeks, who were his people’s great rivals, could not help but admire him. Xenophon wrote a whole book, the Cyropaedia, holding Cyrus up as the model of the ideal ruler, a book later read by kings and thinkers for centuries. The founders of nations far in the future would look back to Cyrus as an example of just rule.",
  "یونانیان، که رقیبان بزرگ پارسیان بودند، نیز نتوانستند تحسین خود را از او پنهان کنند. گزنفون کتابی سراسر دربارهٔ او نوشت، «کوروش‌نامه»، و کوروش را نمونهٔ فرمانروای آرمانی معرفی کرد؛ کتابی که بعدها قرن‌ها مورد مطالعهٔ شاهان و اندیشمندان قرار گرفت. بنیان‌گذاران ملت‌هایی در قرن‌های بعد نیز به کوروش به عنوان الگویی از فرمانروایی دادگرانه نگاه کردند."),

 ("For Iranians above all, he remains the father of the nation, the founder of the first Persian Empire and of an idea of Iran that has lasted through every age since. His name is spoken with a pride that has not dimmed in two and a half thousand years.",
  "اما بیش از همه، برای ایرانیان، کوروش همچنان پدر ملت و بنیان‌گذار نخستین امپراتوری پارس و یکی از نخستین صورت‌بندی‌های اندیشهٔ ایران است؛ اندیشه‌ای که در گذر همهٔ این قرن‌ها پابرجا مانده است. نام او با غروری بر زبان آورده می‌شود که در طول دو هزار و پانصد سال کم‌رنگ نشده است."),

 ("This has been a glimpse of the life of Cyrus the Great, the herdsman’s foster son who became king of the world, the conqueror who ruled with mercy, the founder of an empire and of an ideal. From a small kingdom in the highlands of Persia, he built something that outlasted his empire and outlasts us still, the belief that power is noblest when it is just.",
  "این نگاهی کوتاه بود به زندگی کوروش بزرگ؛ پسرخواندهٔ چوپانی که به شاه جهان بدل شد، فاتحی که با بخشندگی فرمان راند، و بنیان‌گذار امپراتوری و آرمانی بزرگ. او از پادشاهی کوچکی در بلندی‌های پارس، چیزی بنا کرد که از امپراتوری خودش نیز بیشتر دوام آورد و هنوز از عمر ما نیز فراتر خواهد رفت: این باور که قدرت، زمانی به والاترین مرتبهٔ خود می‌رسد که با عدالت همراه باشد."),

 ("He won an empire by the sword, and kept it by justice. The world has not forgotten him.",
  "او امپراتوری را با شمشیر به دست آورد، اما آن را با عدالت حفظ کرد. جهان هنوز او را از یاد نبرده است."),
]


def esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "\\'")


roots = ["constants", "components", "app"]
touched = set()
applied = 0

for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            p = os.path.join(dirpath, f)
            s = open(p).read()
            before = s

            for en, fa in PAIRS:
                pat = re.compile(
                    r"((?:x|title|sub|h|lead|en|subtitle|name|label): '"
                    + re.escape(esc(en))
                    + r"',\s*(?:[a-zA-Z]*[Ff]a): ')((?:[^'\\]|\\.)*)(')"
                )
                s, n = pat.subn(lambda m: m.group(1) + esc(fa) + m.group(3), s)
                applied += n

            if s != before:
                open(p, "w").write(s)
                touched.add(p)

for p in sorted(touched):
    print("updated:", p)

blob = ""
for root in roots:
    for dirpath, _, files in os.walk(root):
        if "node_modules" in dirpath:
            continue
        for f in files:
            if f.endswith((".ts", ".tsx")):
                blob += open(os.path.join(dirpath, f)).read()

miss = [en[:56] for en, fa in PAIRS if esc(fa) not in blob]
print("\nreplacements made:", applied)
print("pairs landed:", len(PAIRS) - len(miss), "of", len(PAIRS))
for m in miss:
    print("   missed:", m)
