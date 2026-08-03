# -*- coding: utf-8 -*-
# Modern Iran, chapters seven and eight: the wars return, and the winter.
# The most sensitive material in the app. Plain, modern, unadorned.
# Iranian dates throughout — هجدهم دی is how that day will be named.

import sys
sys.path.insert(0, "tmp")
import mi_scope

PAIRS = [
 ("{ t: 'p', x: 'On 13 June 2025 Israel struck Iran directly: nuclear facilities, military sites, and the homes of senior commanders and nuclear scientists, many of whom were killed in the first hours. Iran answered with several hundred ballistic missiles and around a thousand drones over the following days. On 22 June the United States bombed three Iranian nuclear sites. A ceasefire took effect on 24 June.' }",
  "{ t: 'p', x: 'On 13 June 2025 Israel struck Iran directly: nuclear facilities, military sites, and the homes of senior commanders and nuclear scientists, many of whom were killed in the first hours. Iran answered with several hundred ballistic missiles and around a thousand drones over the following days. On 22 June the United States bombed three Iranian nuclear sites. A ceasefire took effect on 24 June.', fa: 'در ۲۳ خرداد ۱۴۰۴، اسرائیل مستقیماً به ایران حمله کرد: تأسیسات هسته‌ای، مراکز نظامی، و خانهٔ فرماندهان ارشد و دانشمندان هسته‌ای، که بسیاری‌شان در همان ساعات اول کشته شدند. ایران در روزهای بعد با چند صد موشک بالستیک و حدود هزار پهپاد پاسخ داد. در ۱ تیر، آمریکا سه تأسیسات هسته‌ای ایران را بمباران کرد. آتش‌بس از ۳ تیر برقرار شد.' }"),

 ("{ t: 'p', x: 'It lasted twelve days. In Iran roughly a thousand people were killed, including several hundred civilians; in Israel twenty-eight civilians and one soldier died. The war made public something that had previously been argued about: Iran\\u2019s air defences could not keep Israeli aircraft out, and the allies it had spent decades cultivating offered very little when it mattered.' }",
  "{ t: 'p', x: 'It lasted twelve days. In Iran roughly a thousand people were killed, including several hundred civilians; in Israel twenty-eight civilians and one soldier died. The war made public something that had previously been argued about: Iran\\u2019s air defences could not keep Israeli aircraft out, and the allies it had spent decades cultivating offered very little when it mattered.', fa: 'دوازده روز طول کشید. در ایران حدود هزار نفر کشته شدند، از جمله چند صد غیرنظامی؛ در اسرائیل بیست و هشت غیرنظامی و یک سرباز جان باختند. این جنگ چیزی را علنی کرد که پیش‌تر بر سرش بحث بود: پدافند هوایی ایران نمی‌توانست جلوی هواپیماهای اسرائیلی را بگیرد، و متحدانی که دهه‌ها رویشان سرمایه‌گذاری شده بود، وقتی به کار می‌آمدند خیلی کم آوردند.' }"),

 ("{ t: 'p', x: 'In September 2025 United Nations sanctions were reimposed after the Security Council failed to extend the relief agreed a decade earlier. The arms embargo, the missile restrictions and the asset freezes came back. The rial fell further.' }",
  "{ t: 'p', x: 'In September 2025 United Nations sanctions were reimposed after the Security Council failed to extend the relief agreed a decade earlier. The arms embargo, the missile restrictions and the asset freezes came back. The rial fell further.', fa: 'در شهریور ۱۴۰۴، پس از آنکه شورای امنیت نتوانست تعلیق تحریم‌های یک دههٔ پیش را تمدید کند، تحریم‌های سازمان ملل بازگشت. تحریم تسلیحاتی، محدودیت موشکی و مسدود کردن دارایی‌ها دوباره برقرار شد. ریال باز هم پایین‌تر رفت.' }"),

 ("{ t: 'p', x: 'In late February 2026, after negotiations between Iran and the United States broke down, Israel and the United States began a further and much larger campaign of strikes. It ran into the spring.' }",
  "{ t: 'p', x: 'In late February 2026, after negotiations between Iran and the United States broke down, Israel and the United States began a further and much larger campaign of strikes. It ran into the spring.', fa: 'اواخر بهمن ۱۴۰۴، پس از آنکه مذاکرات ایران و آمریکا شکست خورد، اسرائیل و آمریکا موج تازه و بسیار گسترده‌تری از حملات را آغاز کردند. تا بهار ادامه یافت.' }"),

 ("{ t: 'p', x: 'On 28 December 2025 the rial fell to the lowest point in its history. It had been falling for years, but this was different in kind: prices in the shops changed between the morning and the afternoon, and importers stopped quoting at all because no quote survived the day.' }",
  "{ t: 'p', x: 'On 28 December 2025 the rial fell to the lowest point in its history. It had been falling for years, but this was different in kind: prices in the shops changed between the morning and the afternoon, and importers stopped quoting at all because no quote survived the day.', fa: 'در ۷ دی ۱۴۰۴، ریال به پایین‌ترین نقطهٔ تاریخش رسید. سال‌ها بود که پایین می‌آمد، اما این یکی از جنس دیگری بود: قیمت‌ها در مغازه‌ها میان صبح و بعدازظهر عوض می‌شد، و واردکننده‌ها دیگر اصلاً قیمت نمی‌دادند، چون هیچ قیمتی تا آخر روز دوام نمی‌آورد.' }"),

 ("{ t: 'p', x: 'The bazaars closed. Not because of a strike called by anyone, but because merchants in Tehran, Isfahan, Tabriz and Mashhad pulled down their shutters and refused to trade at prices they could no longer make sense of. When the bazaar closes in Iran it has always meant something, and everyone knew what it meant.' }",
  "{ t: 'p', x: 'The bazaars closed. Not because of a strike called by anyone, but because merchants in Tehran, Isfahan, Tabriz and Mashhad pulled down their shutters and refused to trade at prices they could no longer make sense of. When the bazaar closes in Iran it has always meant something, and everyone knew what it meant.', fa: 'بازارها بسته شد. نه به این دلیل که کسی اعتصاب اعلام کرده باشد، بلکه چون بازاری‌های تهران و اصفهان و تبریز و مشهد کرکره‌ها را پایین کشیدند و حاضر نشدند با قیمت‌هایی که دیگر برایشان معنا نداشت داد و ستد کنند. در ایران، بسته شدن بازار همیشه معنایی داشته، و همه می‌دانستند معنایش چیست.' }"),

 ("{ t: 'p', x: 'Ordinary households had already been cutting. Meat had gone first, then dairy, then fruit. By that December a large part of the country was managing on bread, rice and whatever else could be found, and the fall in the currency meant even that was moving out of reach.' }",
  "{ t: 'p', x: 'Ordinary households had already been cutting. Meat had gone first, then dairy, then fruit. By that December a large part of the country was managing on bread, rice and whatever else could be found, and the fall in the currency meant even that was moving out of reach.', fa: 'خانواده‌های معمولی پیش‌تر شروع به حذف کرده بودند. اول گوشت رفت، بعد لبنیات، بعد میوه. تا آن دی‌ماه، بخش بزرگی از کشور با نان و برنج و هر چه دیگر که پیدا می‌شد سر می‌کرد، و افت ارزش پول یعنی همان هم داشت از دسترس خارج می‌شد.' }"),

 ("{ t: 'markline', x: 'It began over the price of food, as these things usually do.' }",
  "{ t: 'markline', x: 'It began over the price of food, as these things usually do.', fa: 'سر قیمت نان و خوراک شروع شد، همان‌طور که این چیزها معمولاً شروع می‌شوند.' }"),

 ("{ t: 'p', x: 'People went out that same week, and within days it was no longer about prices. The demand was for the government to go.' }",
  "{ t: 'p', x: 'People went out that same week, and within days it was no longer about prices. The demand was for the government to go.', fa: 'مردم همان هفته به خیابان آمدند، و ظرف چند روز دیگر بحث قیمت نبود. خواسته این بود که حکومت برود.' }"),

 ("{ t: 'h', x: 'The eighth of January' }",
  "{ t: 'h', x: 'The eighth of January', fa: 'هجدهم دی' }"),

 ("{ t: 'p', x: 'On 8 January 2026 the government shut off the internet across the entire country. It stayed off longer than any national shutdown recorded anywhere in the world.' }",
  "{ t: 'p', x: 'On 8 January 2026 the government shut off the internet across the entire country. It stayed off longer than any national shutdown recorded anywhere in the world.', fa: 'در ۱۸ دی ۱۴۰۴، حکومت اینترنت را در سراسر کشور قطع کرد. طولانی‌تر از هر قطعی سراسری‌ای که تا آن روز در هیچ کجای جهان ثبت شده بود، خاموش ماند.' }"),

 ("{ t: 'p', x: 'Nothing came out. Families abroad could not reach anyone. Hospitals could not be contacted. Journalists could not file, and nobody could count. Whatever happened in those days happened in the dark, and that was the purpose of the dark.' }",
  "{ t: 'p', x: 'Nothing came out. Families abroad could not reach anyone. Hospitals could not be contacted. Journalists could not file, and nobody could count. Whatever happened in those days happened in the dark, and that was the purpose of the dark.', fa: 'هیچ خبری بیرون نیامد. خانواده‌های خارج از کشور به هیچ‌کس دسترسی نداشتند. با بیمارستان‌ها نمی‌شد تماس گرفت. خبرنگارها نمی‌توانستند گزارش بفرستند، و هیچ‌کس نمی‌توانست بشمارد. هر چه در آن روزها گذشت، در تاریکی گذشت؛ و دلیلِ آن تاریکی هم همین بود.' }"),

 ("{ t: 'p', x: 'People were killed in the streets, one after another, over roughly two days, and thousands more across the weeks around them. Nurses and medics who treated the wounded were taken; some were killed, and there are accounts of women in custody being raped. People who stopped to carry someone who had been shot were shot themselves. Couples. Children. Athletes. People who had come out and people who had simply been walking.' }",
  "{ t: 'p', x: 'People were killed in the streets, one after another, over roughly two days, and thousands more across the weeks around them. Nurses and medics who treated the wounded were taken; some were killed, and there are accounts of women in custody being raped. People who stopped to carry someone who had been shot were shot themselves. Couples. Children. Athletes. People who had come out and people who had simply been walking.', fa: 'مردم در خیابان کشته شدند، یکی پس از دیگری، در حدود دو روز؛ و هزاران نفر دیگر در هفته‌های پیش و پس از آن. پرستارها و امدادگرانی که زخمی‌ها را درمان می‌کردند بازداشت شدند؛ بعضی کشته شدند، و گزارش‌هایی از تجاوز به زنان در بازداشت هست. کسانی که ایستادند تا زخمی‌ای را ببرند، خودشان هدف گلوله قرار گرفتند. زن و شوهرها. بچه‌ها. ورزشکارها. کسانی که به خیابان آمده بودند و کسانی که فقط داشتند رد می‌شدند.' }"),

 ("{ t: 'p', x: 'The count grew every day and it grew from the bottom, because families went looking themselves. People searched hospitals, then morgues, then rows of body bags, trying to find someone they knew. Some found them. Some are still looking, and bodies are still being identified now.' }",
  "{ t: 'p', x: 'The count grew every day and it grew from the bottom, because families went looking themselves. People searched hospitals, then morgues, then rows of body bags, trying to find someone they knew. Some found them. Some are still looking, and bodies are still being identified now.', fa: 'شمار کشته‌ها هر روز بالا رفت، و از پایین بالا رفت؛ چون خانواده‌ها خودشان به جست‌وجو رفتند. مردم بیمارستان‌ها را گشتند، بعد سردخانه‌ها را، بعد ردیف کیسه‌های جسد را، به امید پیدا کردن کسی که می‌شناختند. بعضی پیدایشان کردند. بعضی هنوز دنبالشان می‌گردند، و هنوز پیکرها شناسایی می‌شوند.' }"),

 ("{ t: 'p', x: 'No settled figure exists and there may never be one. Credible estimates range from several thousand to many times that, and the range exists for one reason: the state made counting impossible while it was happening, and has not permitted it since.' }",
  "{ t: 'p', x: 'No settled figure exists and there may never be one. Credible estimates range from several thousand to many times that, and the range exists for one reason: the state made counting impossible while it was happening, and has not permitted it since.', fa: 'هیچ رقم قطعی‌ای وجود ندارد و شاید هرگز وجود نداشته باشد. برآوردهای معتبر از چند هزار تا چند برابر آن را در بر می‌گیرد، و این فاصله یک دلیل دارد: حکومت در همان زمان شمردن را ناممکن کرد، و از آن پس هم اجازه‌اش را نداده است.' }"),

 ("{ t: 'h', x: 'The names' }",
  "{ t: 'h', x: 'The names', fa: 'نام‌ها' }"),

 ("{ t: 'p', x: 'Thousands of people have been killed in these years, and most of them will never be named anywhere. Some names travelled, because someone filmed, or because a mother spoke at a funeral, or because a photograph was already circulating before the person in it died. The rest did not, and their absence from lists like this one is not an absence from the count.' }",
  "{ t: 'p', x: 'Thousands of people have been killed in these years, and most of them will never be named anywhere. Some names travelled, because someone filmed, or because a mother spoke at a funeral, or because a photograph was already circulating before the person in it died. The rest did not, and their absence from lists like this one is not an absence from the count.', fa: 'در این سال‌ها هزاران نفر کشته شده‌اند، و نام بیشترشان هیچ‌جا ثبت نخواهد شد. بعضی نام‌ها به گوش‌ها رسید، چون کسی فیلم گرفت، یا مادری بر سر خاک حرف زد، یا عکسی پیش از مرگِ صاحبش دست به دست شده بود. بقیه نرسید، و نبودنشان در فهرست‌هایی مثل این، به معنای نبودنشان در شمار نیست.' }"),

 ("{ t: 'h', x: 'After' }",
  "{ t: 'h', x: 'After', fa: 'پس از آن' }"),

 ("{ t: 'p', x: 'Tens of thousands were arrested. Death sentences were handed down in numbers not seen before, and the executions have continued. They did not stop. People detained in January are being executed now, and so are people who were arrested during the protests of 2022, years after the fact.' }",
  "{ t: 'p', x: 'Tens of thousands were arrested. Death sentences were handed down in numbers not seen before, and the executions have continued. They did not stop. People detained in January are being executed now, and so are people who were arrested during the protests of 2022, years after the fact.', fa: 'ده‌ها هزار نفر بازداشت شدند. احکام اعدام به تعدادی صادر شد که پیش از آن سابقه نداشت، و اعدام‌ها ادامه پیدا کرد. متوقف نشد. کسانی که در دی بازداشت شدند همین حالا اعدام می‌شوند، و همین‌طور کسانی که در اعتراض‌های ۱۴۰۱ بازداشت شده بودند؛ سال‌ها پس از آن ماجرا.' }"),

 ("{ t: 'p', x: 'That is the part that is easiest to lose from a distance. The event is written about in the past tense. For the families waiting outside a prison for news, it is not in the past tense at all.' }",
  "{ t: 'p', x: 'That is the part that is easiest to lose from a distance. The event is written about in the past tense. For the families waiting outside a prison for news, it is not in the past tense at all.', fa: 'همین بخش است که از دور راحت‌تر از همه از دست می‌رود. دربارهٔ این ماجرا با فعل گذشته می‌نویسند. برای خانواده‌هایی که بیرون زندان منتظر خبرند، هیچ چیزش گذشته نیست.' }"),
]

mi_scope.apply(PAIRS)
