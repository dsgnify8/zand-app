# -*- coding: utf-8 -*-
# Khayyam, fourth batch: the wine question and FitzGerald.
# The mutton paragraph names the actual rubai FitzGerald edited:
#   گر دست دهد ز مغز گندم نانی / وز می دو منی ز گوسفندی رانی
#   با لاله‌رخی و گوشهٔ بستانی / عیشی بود آن نه حد هر سلطانی

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'His quatrains are full of wine, and Iranians have argued about this for nine hundred years. The pious read it as Sufi symbol, the divine intoxication, as it is in Hafez. The plain reading is that Khayyam meant wine.' }",
  "{ t: 'p', x: 'His quatrains are full of wine, and Iranians have argued about this for nine hundred years. The pious read it as Sufi symbol, the divine intoxication, as it is in Hafez. The plain reading is that Khayyam meant wine.', fa: 'رباعی‌هایش پر از می است، و ایرانی‌ها نهصد سال است بر سر این موضوع بحث می‌کنند. پارسایان آن را نماد صوفیانه می‌خوانند، همان مستی حق، چنان‌که در حافظ هست. خوانش ساده‌تر این است که خیام همان می را می‌خواست.' }"),

 ("{ t: 'p', x: 'The plain reading is probably right, and it is not a scandal. His argument is consistent: the beyond is unverifiable, the moment is verifiable, so attend to the moment. Wine is the moment. It is not blasphemy. It is empiricism with a cup in its hand.' }",
  "{ t: 'p', x: 'The plain reading is probably right, and it is not a scandal. His argument is consistent: the beyond is unverifiable, the moment is verifiable, so attend to the moment. Wine is the moment. It is not blasphemy. It is empiricism with a cup in its hand.', fa: 'خوانش ساده‌تر احتمالاً درست است، و رسوایی هم در آن نیست. استدلال او یکدست است: آن سو را نمی‌توان آزمود، این دم را می‌توان، پس به این دم بپرداز. می، همان این دم است. این کفر نیست؛ تجربه‌گرایی است که جامی در دست دارد.' }"),

 ("{ t: 'p', x: 'In 1859 an eccentric English gentleman named Edward FitzGerald privately printed two hundred and fifty copies of a small book of verses translated from Persian. Nobody bought it. The copies ended up in a bargain box outside a London bookshop, marked down to a penny.' }",
  "{ t: 'p', x: 'In 1859 an eccentric English gentleman named Edward FitzGerald privately printed two hundred and fifty copies of a small book of verses translated from Persian. Nobody bought it. The copies ended up in a bargain box outside a London bookshop, marked down to a penny.', fa: 'در سال ۱۸۵۹، مرد انگلیسی عجیبی به نام ادوارد فیتزجرالد، دویست و پنجاه نسخه از کتابچه‌ای شعر که از فارسی ترجمه کرده بود با هزینهٔ خودش چاپ کرد. کسی نخریدش. نسخه‌ها سر از جعبهٔ حراج بیرون یک کتاب‌فروشی لندن درآوردند، با قیمت یک پنی.' }"),

 ("{ t: 'p', x: 'Someone found one. It reached Rossetti, then Swinburne, then everyone, and within a decade Omar Khayyam was one of the most quoted poets in the English speaking world. He stayed there for a century. There were Khayyam clubs and Khayyam wallpaper and quatrains carved on gravestones.' }",
  "{ t: 'p', x: 'Someone found one. It reached Rossetti, then Swinburne, then everyone, and within a decade Omar Khayyam was one of the most quoted poets in the English speaking world. He stayed there for a century. There were Khayyam clubs and Khayyam wallpaper and quatrains carved on gravestones.', fa: 'کسی یکی از آنها را پیدا کرد. به دست روزتی رسید، بعد سوینبرن، بعد همه، و ظرف یک دهه عمر خیام یکی از پرنقل‌ترین شاعران جهان انگلیسی‌زبان شد. یک قرن همان‌جا ماند. انجمن خیام درست شد، کاغذدیواری خیام، و رباعی‌هایی که بر سنگ قبرها کندند.' }"),

 ("{ t: 'p', x: 'And FitzGerald was not translating. He said so himself, cheerfully, that he took whatever liberties he liked with these Persians. He merged quatrains, invented lines, dropped what bored him, and shaped the whole into an English poem with a mood of his own.' }",
  "{ t: 'p', x: 'And FitzGerald was not translating. He said so himself, cheerfully, that he took whatever liberties he liked with these Persians. He merged quatrains, invented lines, dropped what bored him, and shaped the whole into an English poem with a mood of his own.', fa: 'و فیتزجرالد ترجمه نمی‌کرد. خودش هم با خوش‌رویی همین را گفت: که با این ایرانی‌ها هر آزادی‌ای که دلش خواسته به خود داده است. رباعی‌ها را در هم آمیخت، مصراع از خودش ساخت، هر چه حوصله‌اش را سر می‌برد انداخت، و کل آن را به شعری انگلیسی با حال و هوای خودش درآورد.' }"),

 ("{ t: 'h', x: 'What he did to the mutton' }",
  "{ t: 'h', x: 'What he did to the mutton', fa: 'با ران گوسفند چه کرد' }"),

 ("{ t: 'p', x: 'The most famous lines he ever produced run: a book of verses underneath the bough, a jug of wine, a loaf of bread, and thou beside me singing in the wilderness. Millions of people know it. It is on a thousand greeting cards.' }",
  "{ t: 'p', x: 'The most famous lines he ever produced run: a book of verses underneath the bough, a jug of wine, a loaf of bread, and thou beside me singing in the wilderness. Millions of people know it. It is on a thousand greeting cards.', fa: 'نامدارترین سطرهایی که از او درآمد چنین است: کتابی شعر زیر شاخه‌ها، سبویی می، نانی، و تو در کنارم که در بیابان آواز می‌خوانی. میلیون‌ها نفر این را از بر دارند. روی هزار کارت تبریک نوشته شده.' }"),

 ("{ t: 'p', x: 'FitzGerald removed the leg of lamb and put a book of poetry in its place. That single edit is the whole story of how the West received Persia. A blunt, physical, funny Persian picnic became a soft Victorian daydream, and the daydream is what the world memorised.' }",
  "{ t: 'p', x: 'FitzGerald removed the leg of lamb and put a book of poetry in its place. That single edit is the whole story of how the West received Persia. A blunt, physical, funny Persian picnic became a soft Victorian daydream, and the daydream is what the world memorised.', fa: 'رباعی اصلی این است: «گر دست دهد ز مغز گندم نانی، وز می دو منی ز گوسفندی رانی.» فیتزجرالد ران گوسفند را برداشت و به جایش کتاب شعر گذاشت. همین یک دخل و تصرف، تمام داستانِ آن است که غرب ایران را چگونه دریافت. یک بزم ایرانیِ صریح و جسمانی و خنده‌دار، به خیال‌بافی نرم ویکتوریایی بدل شد، و همان خیال‌بافی بود که جهان از بر کرد.' }"),
]

lit_scope.apply("khayyam", PAIRS)
