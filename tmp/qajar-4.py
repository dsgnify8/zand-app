# -*- coding: utf-8 -*-
# The Qajar dynasty, final batch: the war years and the handover.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'p', x: 'The final years of the Qajars were the hardest of all. During the First World War, though Iran declared its neutrality, the armies of Russia, Britain, and the Ottomans marched across its soil at will, and famine and disorder swept the land. The Qajar state had become too weak to protect its own people.' }",
  "{ t: 'p', x: 'The final years of the Qajars were the hardest of all. During the First World War, though Iran declared its neutrality, the armies of Russia, Britain, and the Ottomans marched across its soil at will, and famine and disorder swept the land. The Qajar state had become too weak to protect its own people.', fa: 'واپسین سال‌های قاجار از همه سخت‌تر بود. در جنگ جهانی اول، هرچند ایران بی‌طرفی خود را اعلام کرده بود، سپاهیان روس و بریتانیا و عثمانی هرگاه خواستند از خاکش گذشتند، و قحطی و آشوب این سرزمین را فرا گرفت. دولت قاجار چنان ناتوان شده بود که از مردم خودش هم نمی‌توانست نگهبانی کند.' }"),

 ("{ t: 'h', x: 'A soldier steps forward' }",
  "{ t: 'h', x: 'A soldier steps forward', fa: 'سربازی پا پیش می‌گذارد' }"),

 ("{ t: 'p', x: 'Out of this chaos, in 1921, stepped a commander of the Cossack Brigade named Reza Khan, who marched on Tehran and seized the initiative. For a few years he ruled in the shadow of the last, powerless Qajar king. Then, in 1925, the parliament set the old dynasty aside and raised him to the throne as Reza Shah Pahlavi.' }",
  "{ t: 'p', x: 'Out of this chaos, in 1921, stepped a commander of the Cossack Brigade named Reza Khan, who marched on Tehran and seized the initiative. For a few years he ruled in the shadow of the last, powerless Qajar king. Then, in 1925, the parliament set the old dynasty aside and raised him to the throne as Reza Shah Pahlavi.', fa: 'از دل همین آشوب، در اسفند ۱۲۹۹، فرماندهی از بریگاد قزاق به نام رضاخان پا پیش گذاشت؛ به سوی تهران راه افتاد و ابتکار عمل را به دست گرفت. چند سالی در سایهٔ واپسین شاه ناتوان قاجار حکم راند. سپس، در سال ۱۳۰۴، مجلس سلسلهٔ کهنه را کنار گذاشت و او را با نام رضاشاه پهلوی بر تخت نشاند.' }"),

 ("{ t: 'markline', x: 'The Qajar century closed, and the Pahlavi age of modern Iran began.' }",
  "{ t: 'markline', x: 'The Qajar century closed, and the Pahlavi age of modern Iran began.', fa: 'قرن قاجار بسته شد، و روزگار پهلوی و ایران مدرن آغاز گرفت.' }"),

 ("{ t: 'p', x: 'This has been a glimpse of the Qajars, who ruled Iran through a long and testing century. It was, in many ways, an age of hardship and decline, of lost wars and foreign pressure. Yet it was also the age in which the Iranian nation awoke, demanded a voice in its own affairs, and won its first constitution.' }",
  "{ t: 'p', x: 'This has been a glimpse of the Qajars, who ruled Iran through a long and testing century. It was, in many ways, an age of hardship and decline, of lost wars and foreign pressure. Yet it was also the age in which the Iranian nation awoke, demanded a voice in its own affairs, and won its first constitution.', fa: 'این نگاهی بود کوتاه به قاجارها، که ایران را در قرنی دراز و آزماینده اداره کردند. از بسیاری جهات روزگار سختی و افول بود؛ روزگار جنگ‌های باخته و فشار بیگانه. اما همان روزگاری هم بود که ملت ایران بیدار شد، خواست در کار خودش سهمی داشته باشد، و نخستین قانون اساسی‌اش را به دست آورد.' }"),

 ("{ t: 'p', x: 'From the trials of the Qajar century, a new and modern Iran was struggling to be born. And when at last it emerged, it would carry forward both the wounds and the awakenings of these long and difficult years.' }",
  "{ t: 'p', x: 'From the trials of the Qajar century, a new and modern Iran was struggling to be born. And when at last it emerged, it would carry forward both the wounds and the awakenings of these long and difficult years.', fa: 'از دل سختی‌های قرن قاجار، ایرانی تازه و مدرن برای زاده شدن دست‌وپا می‌زد. و آنگاه که سرانجام سر برآورد، هم زخم‌های این سال‌های دراز و دشوار را با خود برد و هم بیداری‌هایش را.' }"),

 ("{ t: 'pull', x: 'In its century of hardship, the nation found its own voice.' }",
  "{ t: 'pull', x: 'In its century of hardship, the nation found its own voice.', fa: 'ملت در قرنِ سختی‌اش، صدای خودش را پیدا کرد.' }"),
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
