# -*- coding: utf-8 -*-
# The Parthian Empire, second batch: Rome, Carrhae, and the Parthian shot.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'Under the Parthians, Iran was Iranian once more. Though they had absorbed much from the Greek world, and long kept Greek styles at their court, they revived the old Iranian ways, honored the ancient faith, and cherished the memory of the Achaemenid past. The Persian spirit, which had bent under Greek rule, straightened again.' }",
  "{ t: 'p', x: 'Under the Parthians, Iran was Iranian once more. Though they had absorbed much from the Greek world, and long kept Greek styles at their court, they revived the old Iranian ways, honored the ancient faith, and cherished the memory of the Achaemenid past. The Persian spirit, which had bent under Greek rule, straightened again.', fa: 'زیر فرمان اشکانیان، ایران دوباره ایرانی شد. هرچند بسیاری از جهان یونانی را در خود گرفته بودند و دیرزمانی سبک یونانی را در دربار نگاه داشتند، آیین‌های کهن ایرانی را زنده کردند، دین باستانی را گرامی داشتند، و یاد روزگار هخامنشی را عزیز شمردند. روح ایرانی که زیر فرمانروایی یونانی خم شده بود، دوباره راست ایستاد.' }"),

 ("{ t: 'markline', x: 'From horsemen of the steppe rose the empire that made Iran Iranian again.' }",
  "{ t: 'markline', x: 'From horsemen of the steppe rose the empire that made Iran Iranian again.', fa: 'از سوارکاران دشت، امپراتوری‌ای برخاست که ایران را دوباره ایرانی کرد.' }"),

 ("{ t: 'p', x: 'As Parthia rose in the east, a new power was rising in the west: Rome, the greatest empire the Mediterranean world had ever known. The two great powers met at the river Euphrates, and there began one of the longest rivalries in ancient history, Rome and Parthia, west and east, for nearly three hundred years.' }",
  "{ t: 'p', x: 'As Parthia rose in the east, a new power was rising in the west: Rome, the greatest empire the Mediterranean world had ever known. The two great powers met at the river Euphrates, and there began one of the longest rivalries in ancient history, Rome and Parthia, west and east, for nearly three hundred years.', fa: 'همچنان که پارت در شرق بالا می‌آمد، در غرب قدرتی تازه سر برمی‌آورد: روم، بزرگ‌ترین امپراتوری‌ای که جهان مدیترانه به خود دیده بود. این دو قدرت بزرگ بر کرانهٔ فرات به هم رسیدند، و همان‌جا یکی از درازترین رقابت‌های تاریخ باستان آغاز شد؛ روم و اشکانیان، غرب و شرق، نزدیک سیصد سال.' }"),

 ("{ t: 'p', x: 'Rome, used to conquering all before it, found in Parthia an equal it could not overcome. Again and again the legions marched east, and again and again the Parthians turned them back. The Euphrates became the wall against which Roman ambition broke.' }",
  "{ t: 'p', x: 'Rome, used to conquering all before it, found in Parthia an equal it could not overcome. Again and again the legions marched east, and again and again the Parthians turned them back. The Euphrates became the wall against which Roman ambition broke.', fa: 'روم که به فتح هر چه پیش رویش بود عادت داشت، در اشکانیان هماوردی یافت که از پسش برنیامد. بارها لژیون‌ها به سوی شرق لشکر کشیدند و بارها اشکانیان بازشان گرداندند. فرات دیواری شد که جاه‌طلبی روم بر آن شکست.' }"),

 ("{ t: 'h', x: 'The disaster at Carrhae' }",
  "{ t: 'h', x: 'The disaster at Carrhae', fa: 'فاجعهٔ حرّان' }"),

 ("{ t: 'p', x: 'The most famous clash came in 53 BCE at Carrhae, where the Roman general Crassus, one of the richest and most powerful men in Rome, invaded with a mighty army. There the Parthians taught Rome a lesson it never forgot. Their horse archers rained arrows upon the legions, and their heavy armored cavalry shattered them. The Roman army was destroyed, and Crassus was killed.' }",
  "{ t: 'p', x: 'The most famous clash came in 53 BCE at Carrhae, where the Roman general Crassus, one of the richest and most powerful men in Rome, invaded with a mighty army. There the Parthians taught Rome a lesson it never forgot. Their horse archers rained arrows upon the legions, and their heavy armored cavalry shattered them. The Roman army was destroyed, and Crassus was killed.', fa: 'نامدارترین برخورد در سال ۵۳ پیش از میلاد در حرّان روی داد، آنجا که کراسوس، سردار رومی و یکی از ثروتمندترین و نیرومندترین مردان روم، با سپاهی بزرگ به ایران تاخت. اشکانیان همان‌جا درسی به روم دادند که هرگز از یادش نبرد. کمانداران سوارشان بر لژیون‌ها باران تیر باریدند و سواره‌نظام سنگین‌زرهشان آنان را در هم شکست. سپاه روم نابود شد و کراسوس کشته شد.' }"),

 ("{ t: 'h', x: 'The Parthian shot' }",
  "{ t: 'h', x: 'The Parthian shot', fa: 'تیر پارتی' }"),

 ("{ t: 'p', x: 'The Parthians were among the finest horsemen the world had ever seen, and they gave the world a phrase still used today. Their riders would feign retreat at a gallop, then twist backward in the saddle to loose a deadly arrow at the pursuing enemy. This maneuver, the Parthian shot, was so famous it entered the languages of Europe, a parting blow delivered in the very act of withdrawal.' }",
  "{ t: 'p', x: 'The Parthians were among the finest horsemen the world had ever seen, and they gave the world a phrase still used today. Their riders would feign retreat at a gallop, then twist backward in the saddle to loose a deadly arrow at the pursuing enemy. This maneuver, the Parthian shot, was so famous it entered the languages of Europe, a parting blow delivered in the very act of withdrawal.', fa: 'اشکانیان از بهترین سوارکارانی بودند که جهان به خود دیده است، و اصطلاحی به جهان دادند که تا امروز به کار می‌رود. سوارانشان به تاخت وانمود به عقب‌نشینی می‌کردند، سپس بر زین به عقب می‌چرخیدند و تیری کشنده به سوی دشمنِ در پی رها می‌کردند. این شگرد، که آن را تیر پارتی خواندند، چنان نامدار شد که به زبان‌های اروپایی راه یافت؛ ضربه‌ای که درست در لحظهٔ واپس رفتن فرود می‌آید.' }"),
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
