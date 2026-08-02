// Daily "Did You Know?" — rotates to a new fact each day, deterministically.

export type DailyFact = { text: string; word: string; textFa?: string };

export const DAILY_FACTS: DailyFact[] = [
  { text: 'The pomegranate is one of the oldest symbols in Persian art and mythology — a sign of abundance, life, and eternity.', textFa: 'انار از کهن‌ترین نمادهای هنر و اسطورهٔ ایرانی است؛ نشانهٔ فراوانی، زندگی و جاودانگی.', word: 'انار' },
  { text: 'Nowruz, the Persian New Year, has been celebrated at the spring equinox for over three thousand years.', textFa: 'نوروز، سال نوی ایرانی، بیش از سه هزار سال است که در لحظهٔ اعتدال بهاری جشن گرفته می‌شود.', word: 'نوروز' },
  { text: 'The English word “paradise” traces back to an ancient Persian word for a walled garden.', textFa: 'واژهٔ انگلیسی «paradise» به واژه‌ای کهن در زبان ایرانی بازمی‌گردد که به معنای باغی دیواردار بود: پردیس.', word: 'پردیس' },
  { text: 'On Yalda, the longest night of the year, families gather over poetry and pomegranates to welcome the return of the light.', textFa: 'در شب یلدا، درازترین شب سال، خانواده‌ها گرد شعر و انار جمع می‌شوند تا بازگشت روشنایی را خوشامد بگویند.', word: 'یلدا' },
  { text: 'Ferdowsi spent about thirty years writing the Shahnameh — nearly 50,000 couplets that helped keep the Persian language alive.', textFa: 'فردوسی نزدیک سی سال بر شاهنامه رنج برد؛ حدود ۵۰٬۰۰۰ بیت که زبان فارسی را زنده نگاه داشت.', word: 'شاهنامه' },
  { text: 'The Pazyryk carpet, around 2,500 years old, is the oldest known surviving pile carpet in the world.', textFa: 'فرش پازیریک، با حدود ۲٬۵۰۰ سال قدمت، کهن‌ترین فرش گره‌بافتهٔ شناخته‌شدهٔ جهان است که به جا مانده.', word: 'فرش' },
  { text: 'Long before electricity, Persian windcatchers — tall towers called bâdgir — cooled homes by guiding the breeze downward.', textFa: 'مدت‌ها پیش از برق، بادگیرهای ایرانی، همان برج‌های بلند، با هدایت نسیم به پایین خانه‌ها را خنک می‌کردند.', word: 'بادگیر' },
  { text: 'Qanats, gently sloping underground channels, carried water across the desert for thousands of years.', textFa: 'قنات‌ها، کاریزهای زیرزمینی با شیبی ملایم، هزاران سال آب را از دل کویر گذراندند.', word: 'قنات' },
  { text: 'Iran grows the vast majority of the world’s saffron, the crimson spice worth more than its weight in gold.', textFa: 'بخش بزرگی از زعفران جهان در ایران کشت می‌شود؛ ادویه‌ای سرخ که هم‌وزن خود از طلا گران‌بهاتر است.', word: 'زعفران' },
  { text: 'The 13th-century Persian poet Rumi remains one of the best-selling poets in the world today.', textFa: 'مولانا، شاعر ایرانی سدهٔ هفتم هجری، هنوز از پرفروش‌ترین شاعران جهان امروز است.', word: 'مولانا' },
  { text: 'Many Persian homes keep a book of Hafez to open at random for guidance — a cherished tradition called fâl-e Hâfez.', textFa: 'در بسیاری از خانه‌های ایرانی دیوان حافظ هست تا برای راهنمایی تصادفی گشوده شود؛ آیینی دوست‌داشتنی به نام فال حافظ.', word: 'حافظ' },
  { text: 'The Cyrus Cylinder, from the reign of Cyrus the Great, is often described as one of the earliest declarations of tolerance.', textFa: 'استوانهٔ کوروش، از روزگار کوروش بزرگ، را اغلب یکی از نخستین بیانیه‌های بردباری خوانده‌اند.', word: 'کوروش' },
  { text: 'Around 550 BCE, Cyrus the Great founded the Achaemenid Empire — the largest the ancient world had yet seen, reaching from the Aegean Sea to the Indus Valley. At its height it is thought to have ruled a striking share of the world’s people.', textFa: 'حدود ۵۵۰ پیش از میلاد، کوروش بزرگ امپراتوری هخامنشی را بنیان نهاد؛ بزرگ‌ترین امپراتوری‌ای که جهان باستان تا آن روز دیده بود، از دریای اژه تا درّهٔ سند. در اوج خود، گمان می‌رود بر سهم چشمگیری از مردم جهان فرمان می‌رانده است.', word: 'هخامنشی' },
  { text: 'Built by Darius I around 518 BCE, Persepolis was the ceremonial capital of the Achaemenid Empire. Its grand stairways and reliefs welcomed delegations from across the empire — a record in stone of many nations united under one rule.', textFa: 'تخت جمشید که داریوش یکم حدود ۵۱۸ پیش از میلاد بنا کرد، پایتخت آیینی هخامنشیان بود. پلکان‌های باشکوه و نقش‌برجسته‌هایش پذیرای نمایندگانی از سراسر امپراتوری بود؛ سندی در سنگ از ملت‌های بسیار که زیر یک فرمان گرد آمده بودند.', word: 'تخت‌جمشید' },
  { text: 'Under Cyrus the Great and Darius I, the Persian Empire built the Royal Road — a vast relay network of stations and couriers. Messages travelled across the empire with remarkable speed, making it the ancient world’s first true postal system.', textFa: 'در روزگار کوروش بزرگ و داریوش یکم، امپراتوری ایران راه شاهی را ساخت؛ شبکه‌ای گسترده از چاپارخانه‌ها و پیک‌ها. پیام‌ها با سرعتی شگفت‌آور سراسر امپراتوری را می‌پیمودند، و این نخستین نظام پستی راستین جهان باستان بود.', word: 'راه‌شاهی' },
  { text: 'Completed around 1010 CE by Ferdowsi, the Shahnameh preserved Iran’s myths, kings, and heroes in more than 50,000 verses — giving the Persian world one of history’s greatest literary epics centuries before Shakespeare.', textFa: 'شاهنامه که فردوسی حدود سال ۱۰۱۰ میلادی به پایان رساند، اسطوره‌ها و شاهان و پهلوانان ایران را در بیش از ۵۰٬۰۰۰ بیت نگاه داشت؛ و قرن‌ها پیش از شکسپیر، یکی از بزرگ‌ترین حماسه‌های ادبی تاریخ را به جهان فارسی بخشید.', word: 'فردوسی' },
];

// Same fact all day; a new one tomorrow.
export function getDailyFact(date = new Date()): DailyFact {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  return DAILY_FACTS[dayOfYear % DAILY_FACTS.length];
}
