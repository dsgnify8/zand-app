# -*- coding: utf-8 -*-
# The fal readings. Register: the voice a Persian reader expects from a فال —
# addressed to you, present tense, aphoristic, unexplaining.

p = "constants/fal.ts"
s = open(p).read()

if "readingFa" not in s:
    s = s.replace("  reading: string;\n};", "  reading: string;\n  readingFa?: string;\n};")
    print("schema extended")

FA = [
 ("You are building on something that will not hold. This is not a warning to despair, but to loosen your grip. What you are gripping so tightly was never solid. Hold the moment instead.",
  "بر چیزی بنا می‌کنی که پایدار نیست. این هشدار به نومیدی نیست، هشدار به رها کردن است. آنچه چنین سخت در مشت گرفته‌ای هرگز محکم نبوده. به جایش همین دم را نگاه دار."),

 ("The difficulty is not a sign you took the wrong road. It is a sign you took the road at all. Nothing worth having sits unguarded. What you are facing is the guardian, not the obstacle.",
  "این دشواری نشانهٔ آن نیست که راه را اشتباه رفته‌ای. نشانهٔ آن است که اصلاً به راه افتاده‌ای. هیچ چیز ارزشمندی بی‌نگهبان رها نشده است. آنچه پیش رویت ایستاده نگهبان است، نه مانع."),

 ("Stop pushing. There is a moment for effort and a moment for watching, and this is the second kind. What you are trying to force will move on its own if you let it.",
  "فشار را بردار. وقتی هست برای کوشیدن و وقتی برای نگریستن، و این از دستهٔ دوم است. آنچه می‌خواهی به زور پیش ببری، اگر رهایش کنی خودش راه می‌افتد."),

 ("What you give your heart to outlives you. This is an answer of yes, but not the small yes you wanted. It is telling you the thing you love is the thing that lasts.",
  "آنچه دل به آن می‌سپاری، پس از تو می‌ماند. این پاسخ آری است، اما نه آن آریِ کوچکی که می‌خواستی. می‌گوید همان چیزی که دوستش داری، همان است که می‌ماند."),

 ("The sacred is not where you are looking for it. It is in the ordinary place you dismissed. Look again at what you walked past.",
  "آنچه مقدس است، آنجا نیست که دنبالش می‌گردی. در همان جای ساده‌ای است که از کنارش گذشتی. یک بار دیگر به آنچه پشت سر گذاشته‌ای نگاه کن."),

 ("You are being asked what you would trade. The answer reveals what you actually want, not what you say you want. Be honest about the price you are willing to pay.",
  "از تو می‌پرسند حاضری چه بدهی. پاسخ نشان می‌دهد در حقیقت چه می‌خواهی، نه آنچه می‌گویی می‌خواهی. با خودت روراست باش که تا کجا حاضری بها بدهی."),

 ("This is the most beloved answer Hafez gives. What has been lost is not gone. The season you are in is a season, not a permanent condition. Wait. It turns.",
  "این محبوب‌ترین پاسخی است که حافظ می‌دهد. آنچه گم شده، از میان نرفته است. فصلی که در آنی فصل است، نه سرنوشت همیشگی. صبر کن؛ می‌گردد."),

 ("The situation asks for repair, not for winning. There is a relationship here worth more than the argument inside it. Choose the tree.",
  "این حال، ترمیم می‌خواهد نه بردن. پیوندی در میان است که از دعوای درونش ارزشمندتر است. درخت را برگزین."),

 ("You already have it. You have been searching outside for a thing that has been in your own hands the whole time. Stop looking outward.",
  "همین حالا داری‌اش. بیرون را گشته‌ای پی چیزی که تمام این مدت در دست خودت بوده. دیگر بیرون را نگرد."),

 ("Act now. The window you are considering will not stay open while you deliberate. This is a yes, but a yes with an expiry.",
  "همین حالا دست به کار شو. دری که درباره‌اش می‌اندیشی تا پایان اندیشیدنت باز نمی‌ماند. این آری است، اما آریِ مهلت‌دار."),

 ("You are being asked to speak. What you have been keeping unsaid needs a voice, and you have the words. The veil lifts when someone lifts it.",
  "از تو خواسته‌اند سخن بگویی. آنچه ناگفته نگاه داشته‌ای صدا می‌خواهد، و واژه‌هایش را داری. پرده وقتی کنار می‌رود که کسی کنارش بزند."),

 ("Stop taking sides in the argument. The freedom you want is not on either side of it. Step out of the frame entirely.",
  "در این دعوا طرف نگیر. آزادی‌ای که می‌خواهی در هیچ‌کدام از دو سو نیست. یکسره از این قاب بیرون بیا."),

 ("The thing you are ashamed of is the opening. What broke in you is not the damage, it is the way in. Do not rush to repair it before you have looked inside.",
  "همان چیزی که از آن شرم داری، همان روزنه است. آنچه در تو شکسته، آسیب نیست؛ راه ورود است. پیش از آنکه درونش را ببینی، برای بستنش شتاب نکن."),

 ("You are calculating something that cannot be calculated. Trust it, or leave it, but stop weighing it. The scale is the wrong instrument here.",
  "چیزی را می‌سنجی که سنجیدنی نیست. یا به آن دل بسپار یا رهایش کن، اما از وزن کردنش دست بردار. اینجا ترازو ابزار درستی نیست."),

 ("This passes. Not because you will fix it, but because nothing holds its shape forever, including this. The night is long, not endless.",
  "این می‌گذرد. نه از آن رو که تو درستش می‌کنی، بلکه از آن رو که هیچ چیز شکل خود را برای همیشه نگاه نمی‌دارد، از جمله همین. شب دراز است، بی‌پایان نیست."),

 ("Patience is the instruction. What you want is being made, slowly, and it will not be rushed into being. The pearl takes the time it takes.",
  "دستور، صبر است. آنچه می‌خواهی دارد ساخته می‌شود، آهسته، و با شتاب به هستی نمی‌آید. مروارید همان‌قدر وقت می‌برد که می‌برد."),
]

applied, skipped = 0, []
for en, fa in FA:
    a = "reading: '" + en + "'"
    if a in s:
        s = s.replace(a, a + ",\n    readingFa: '" + fa + "'", 1)
        applied += 1
    else:
        skipped.append(en[:50])

open(p, "w").write(s)
print("applied", applied, "of", len(FA))
for k in skipped:
    print("   skipped:", k)
