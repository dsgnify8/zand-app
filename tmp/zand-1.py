# -*- coding: utf-8 -*-
# The Zand dynasty. Note: this topic uses double-quoted strings, so the
# anchors are written accordingly.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 # header
 ("""  name: 'The Zand Dynasty',
  persian: 'زندیان',""",
  """  name: 'The Zand Dynasty',
  nameFa: 'زندیان',
  persian: 'زندیان',"""),

 # chapter titles
 ("title: 'After the Storm',", "title: 'After the Storm', titleFa: 'پس از توفان',"),
 ("title: 'The Advocate of the People',", "title: 'The Advocate of the People', titleFa: 'وکیل‌الرعایا',"),
 ("title: 'Shiraz, the Beloved City',", "title: 'Shiraz, the Beloved City', titleFa: 'شیراز، شهر محبوب',"),
 ("title: 'A Reign of Peace and Plenty',", "title: 'A Reign of Peace and Plenty', titleFa: 'روزگار آرامش و فراوانی',"),
 ("title: 'The End of a Gentle King',", "title: 'The End of a Gentle King', titleFa: 'پایان یک پادشاه مهربان',"),

 ('{ t: \'h\', x: \'A soldier of the Zagros\' }',
  '{ t: \'h\', x: \'A soldier of the Zagros\', fa: \'سربازی از زاگرس\' }'),

 ('{ t: \'p\', x: "His name was Karim Khan, of the Zand, a tribe of the Zagros mountains in western Iran. He was not born to greatness or to noble blood. He was a soldier, plainspoken and shrewd, who rose by his ability, his fairness, and the loyalty he inspired in the men around him." }',
  '{ t: \'p\', x: "His name was Karim Khan, of the Zand, a tribe of the Zagros mountains in western Iran. He was not born to greatness or to noble blood. He was a soldier, plainspoken and shrewd, who rose by his ability, his fairness, and the loyalty he inspired in the men around him.", fa: \'نامش کریم‌خان بود، از ایل زند، تیره‌ای از کوه‌های زاگرس در غرب ایران. نه در بزرگی زاده شده بود و نه از تبار اشراف. سربازی بود ساده‌گو و زیرک که با توانایی خود، با انصافش، و با وفاداری‌ای که در مردان پیرامونش برمی‌انگیخت بالا آمد.\' }'),

 ('{ t: \'p\', x: "Through years of civil war he outlasted and outgoverned his rivals. Where others ruled the lands they took by terror, Karim Khan won people to his side by justice and mercy, and by the simple fact that life was better and safer under his hand. By around 1751 he had become the dominant power over most of Iran." }',
  '{ t: \'p\', x: "Through years of civil war he outlasted and outgoverned his rivals. Where others ruled the lands they took by terror, Karim Khan won people to his side by justice and mercy, and by the simple fact that life was better and safer under his hand. By around 1751 he had become the dominant power over most of Iran.", fa: \'در سال‌های جنگ داخلی، هم بیش از رقیبانش دوام آورد و هم بهتر از آنان حکومت کرد. دیگران بر سرزمین‌هایی که می‌گرفتند با وحشت فرمان می‌راندند؛ کریم‌خان اما مردم را با عدالت و بخشش به سوی خود کشید، و با این واقعیت ساده که زندگی زیر دست او بهتر و امن‌تر بود. تا حدود سال ۱۷۵۱ به قدرت مسلط بر بیشتر ایران بدل شده بود.\' }'),

 ('{ t: \'h\', x: \'The crown he refused\' }',
  '{ t: \'h\', x: \'The crown he refused\', fa: \'تاجی که نپذیرفت\' }'),

 ('{ t: \'pull\', x: "He would not be called king. He chose instead to be the servant of his people." }',
  '{ t: \'pull\', x: "He would not be called king. He chose instead to be the servant of his people.", fa: \'نپذیرفت که او را شاه بخوانند. به جای آن برگزید که خدمتگزار مردمش باشد.\' }'),

 ('{ t: \'p\', x: "It was far more than a matter of a title. It expressed how he understood his own power, not as a possession to be flaunted, but as a trust held on behalf of the ordinary people of Iran, the farmers and merchants and families who had suffered so much. In a cruel age, it was a rare and beautiful idea, and it made him beloved." }',
  '{ t: \'p\', x: "It was far more than a matter of a title. It expressed how he understood his own power, not as a possession to be flaunted, but as a trust held on behalf of the ordinary people of Iran, the farmers and merchants and families who had suffered so much. In a cruel age, it was a rare and beautiful idea, and it made him beloved.", fa: \'این بسی فراتر از یک لقب بود. نشان می‌داد که او قدرت خویش را چگونه می‌فهمد: نه مِلکی برای به رخ کشیدن، بلکه امانتی که از سوی مردم عادی ایران در دست دارد؛ همان کشاورزان و بازرگانان و خانواده‌هایی که این‌همه رنج کشیده بودند. در روزگاری بی‌رحم، این اندیشه‌ای نادر و زیبا بود، و او را محبوب کرد.\' }'),

 ('{ t: \'p\', x: "What set Karim Khan apart was not conquest but character. In an age of tyrants, he was known for his plainness, his humor, and his genuine care for ordinary people. He never forgot that he had risen from among them, and he never pretended to be more than he was." }',
  '{ t: \'p\', x: "What set Karim Khan apart was not conquest but character. In an age of tyrants, he was known for his plainness, his humor, and his genuine care for ordinary people. He never forgot that he had risen from among them, and he never pretended to be more than he was.", fa: \'آنچه کریم‌خان را متمایز می‌کرد فتح نبود، بلکه شخصیت بود. در روزگار خودکامگان، او را به سادگی، به شوخ‌طبعی، و به دلسوزی راستینش برای مردم عادی می‌شناختند. هرگز از یاد نبرد که خود از میان همان مردم برخاسته است، و هرگز وانمود نکرد بیش از آنچه هست.\' }'),

 ('{ t: \'p\', x: "He lived simply for a ruler of his power, dressed without extravagance, and kept an open and approachable court. The stories told of him, many still remembered in Iran, paint a picture of a warm, shrewd, and deeply humane man." }',
  '{ t: \'p\', x: "He lived simply for a ruler of his power, dressed without extravagance, and kept an open and approachable court. The stories told of him, many still remembered in Iran, paint a picture of a warm, shrewd, and deeply humane man.", fa: \'برای فرمانروایی با آن اندازه قدرت، ساده زندگی می‌کرد؛ بی‌تجمل می‌پوشید و درباری باز و دردسترس داشت. حکایت‌هایی که از او نقل کرده‌اند، و بسیاری‌شان هنوز در ایران بر سر زبان‌هاست، تصویر مردی را می‌سازند گرم، زیرک و عمیقاً انسان.\' }'),
]

applied, skipped = 0, []
for a, b in PAIRS:
    if a in s:
        s = s.replace(a, b, 1); applied += 1
    else:
        skipped.append(a[:70])

open(p, "w").write(s)
print("applied", applied, "of", len(PAIRS))
for k in skipped:
    print("   skipped:", k)
