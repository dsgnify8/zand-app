# -*- coding: utf-8 -*-
# Nowruz, final prose batch: دید و بازدید, سیزده‌بدر, سبزه, گره زدن.
# The closing paragraph is the one a Persian reader will feel most.

p = "constants/nowruz.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The moment is not the holiday. The holiday is thirteen days long, and it has rules older than anyone can explain.' }",
  "{ t: 'p', x: 'The moment is not the holiday. The holiday is thirteen days long, and it has rules older than anyone can explain.', fa: 'آن لحظه، خودِ عید نیست. عید سیزده روز است، و قاعده‌هایی دارد کهن‌تر از آنکه کسی بتواند توضیحشان دهد.' }"),

 ("{ t: 'days', x: 'Visiting. And there is an order to it: the young go to the old first, never the other way round. You visit your grandparents, then your parents, then outward. Everyone is fed. Nobody is allowed to leave quickly.' }",
  "{ t: 'days', x: 'Visiting. And there is an order to it: the young go to the old first, never the other way round. You visit your grandparents, then your parents, then outward. Everyone is fed. Nobody is allowed to leave quickly.', fa: 'دید و بازدید. و ترتیبی هم دارد: کوچک‌ترها اول به دیدن بزرگ‌ترها می‌روند، هرگز برعکس. اول خانهٔ پدربزرگ و مادربزرگ، بعد پدر و مادر، بعد بقیه. به همه غذا داده می‌شود. و اجازه نمی‌دهند کسی زود بلند شود.' }"),

 ("{ t: 'p', x: 'Thirteen is unlucky, so on the thirteenth day of the year the entire country leaves the house and spends the whole day outdoors. Every park, every roadside, every scrap of grass in Iran is covered in families on carpets, cooking, sleeping, playing, from morning until dark. It is possibly the largest simultaneous picnic on earth.' }",
  "{ t: 'p', x: 'Thirteen is unlucky, so on the thirteenth day of the year the entire country leaves the house and spends the whole day outdoors. Every park, every roadside, every scrap of grass in Iran is covered in families on carpets, cooking, sleeping, playing, from morning until dark. It is possibly the largest simultaneous picnic on earth.', fa: 'سیزده نحس است، پس روز سیزدهم سال تمام کشور از خانه بیرون می‌زند و تمام روز را بیرون می‌گذراند. هر پارک، هر حاشیهٔ جاده، هر تکه چمن در ایران پر می‌شود از خانواده‌هایی روی فرش؛ می‌پزند، می‌خوابند، بازی می‌کنند، از صبح تا تاریکی. شاید بزرگ‌ترین پیک‌نیک همزمان روی زمین باشد.' }"),

 ("{ t: 'p', x: 'To stay indoors is bad luck. So nobody does.' }",
  "{ t: 'p', x: 'To stay indoors is bad luck. So nobody does.', fa: 'ماندن در خانه نحسی می‌آورد. پس هیچ‌کس نمی‌ماند.' }"),

 ("{ t: 'h', x: 'The sabzeh goes into the water' }",
  "{ t: 'h', x: 'The sabzeh goes into the water', fa: 'سبزه را به آب می‌سپارند' }"),

 ("{ t: 'p', x: 'And you bring the sprouts. The sabzeh that has sat on the table for thirteen days, absorbing whatever was in the house, is carried out and thrown into running water and let go. Whatever it took on goes downstream.' }",
  "{ t: 'p', x: 'And you bring the sprouts. The sabzeh that has sat on the table for thirteen days, absorbing whatever was in the house, is carried out and thrown into running water and let go. Whatever it took on goes downstream.', fa: 'و سبزه را هم با خودت می‌بری. همان سبزه‌ای که سیزده روز سر سفره نشسته و هر چه در خانه بوده به خود گرفته، بیرون برده می‌شود و به آب روان سپرده می‌شود و رها. هر چه برداشته، با آب می‌رود.' }"),

 ("{ t: 'h', x: 'And the knot' }",
  "{ t: 'h', x: 'And the knot', fa: 'و آن گره' }"),

 ("{ t: 'p', x: 'Before you throw it, unmarried young people tie a knot in the grass and make a wish. Tying the knot is asking for the tie: a marriage, a person, a life. Untying it is left to whoever finds it, which is the joke and also not a joke.' }",
  "{ t: 'p', x: 'Before you throw it, unmarried young people tie a knot in the grass and make a wish. Tying the knot is asking for the tie: a marriage, a person, a life. Untying it is left to whoever finds it, which is the joke and also not a joke.', fa: 'پیش از آنکه به آبش بسپاری، جوان‌های مجرد گرهی به سبزه می‌زنند و آرزویی می‌کنند. گره زدن یعنی خواستنِ همان گره: یک ازدواج، یک نفر، یک زندگی. باز کردنش هم به عهدهٔ هر کسی است که پیدایش کند، که هم شوخی است و هم نیست.' }"),

 ("{ t: 'close', x: 'A new year that begins at an exact second decided by the sun and not by a committee. A fire you give your tiredness to. A table with an apple for youth and a vinegar for age sitting side by side. Thirteen days of being fed by people who love you. And then everyone, the whole country at once, out on the grass, letting the year troubles go downstream. It has outlived every empire that tried to end it, and it will be here next spring, at the second, whatever else has happened.' }",
  "{ t: 'close', x: 'A new year that begins at an exact second decided by the sun and not by a committee. A fire you give your tiredness to. A table with an apple for youth and a vinegar for age sitting side by side. Thirteen days of being fed by people who love you. And then everyone, the whole country at once, out on the grass, letting the year troubles go downstream. It has outlived every empire that tried to end it, and it will be here next spring, at the second, whatever else has happened.', fa: 'سال نویی که در ثانیه‌ای دقیق آغاز می‌شود، ثانیه‌ای که خورشید تعیینش کرده نه هیچ کمیته‌ای. آتشی که خستگی‌ات را به آن می‌دهی. سفره‌ای که سیب برای جوانی و سرکه برای پیری، کنار هم رویش نشسته‌اند. سیزده روز که کسانی که دوستت دارند سیرت می‌کنند. و بعد همه، یک کشور تمام و یکجا، روی چمن، تا سختی‌های سال را به آب بسپارند. از هر امپراتوری‌ای که خواست تمامش کند عمر بیشتری کرده، و بهار بعد هم سر همان ثانیه اینجاست، هر چه هم که در این میان گذشته باشد.' }"),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:60])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped: print("   skipped:", k)
