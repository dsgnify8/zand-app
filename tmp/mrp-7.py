# -*- coding: utf-8 -*-
# Mohammad Reza Shah, seventh batch: oil and the rise of Mossadegh.
# شرکت نفت ایران و انگلیس, ملی شدن صنعت نفت, پالایشگاه آبادان, رزم‌آرا.
# Neutral throughout — the chapter explains rather than judges.

import sys
sys.path.insert(0, "tmp")
import mrp_scope

def pairs_for(en, fa):
    out = []
    for q in ('"', "'"):
        esc = en.replace("'", "\\'") if q == "'" else en
        a = 'x: ' + q + esc + q
        out.append((a, a + ", fa: '" + fa + "'"))
    return out

ITEMS = [
 ("The photographs of these years show a couple plainly devoted to each other. For a time, amid the gathering storms of politics, he had found real happiness at home.",
  'عکس‌های آن سال‌ها زوجی را نشان می‌دهد که آشکارا به هم دل‌بسته‌اند. مدتی، در میان توفان‌هایی که در سیاست جمع می‌شد، در خانه خوشبختی واقعی یافته بود.'),

 ("A restless nation", 'کشوری بی‌قرار'),

 ("The country around him, however, was anything but calm. Parliament was strong and combative, the press was loud, and a single question was rising above all others. Why did Iran's greatest treasure, its oil, remain in the hands of a foreign company that kept the lion's share of the profit?",
  'اما کشوری که دور و برش بود هر چیزی بود جز آرام. مجلس نیرومند و ستیزه‌جو بود، مطبوعات پرصدا، و یک پرسش بالاتر از همه سر برمی‌آورد: چرا بزرگ‌ترین ثروت ایران، یعنی نفتش، در دست شرکتی خارجی بماند که سهم شیر از سود را برای خود برمی‌دارد؟'),

 ("In March 1951 the prime minister, General Razmara, who had cautioned against seizing the oil, was assassinated. Within days parliament voted to nationalize the industry, and a fervent nationalist named Mohammad Mossadegh rode the wave of popular feeling to power. The stage was set for the greatest crisis of the Shah's early reign.",
  'در اسفند ۱۳۲۹، نخست‌وزیر، سپهبد رزم‌آرا، که دربارهٔ ملی کردن نفت هشدار داده بود، ترور شد. ظرف چند روز مجلس به ملی شدن صنعت نفت رأی داد، و ملی‌گرایی پرشور به نام محمد مصدق بر موج احساسات مردم به قدرت رسید. صحنه برای بزرگ‌ترین بحران سال‌های نخست سلطنت شاه آماده شده بود.'),

 ("Oil and a nation's pride", 'نفت و غرور یک ملت'),

 ("Since the first concession of 1901, Iran's oil had been controlled by the British owned Anglo Iranian Oil Company. Britain took the greater share of the wealth, while Iran received only modest royalties, and the vast refinery at Abadan, the largest in the world, stood as a daily reminder of who truly profited from Iranian soil.",
  'از نخستین امتیازنامه در سال ۱۲۸۰، نفت ایران در اختیار شرکت نفت ایران و انگلیس بود که مالکیتش بریتانیایی بود. بریتانیا سهم بزرگ‌تر ثروت را می‌برد و ایران تنها حق‌الامتیازی ناچیز می‌گرفت، و پالایشگاه عظیم آبادان، بزرگ‌ترین پالایشگاه جهان، هر روز یادآوری می‌کرد که سود واقعی خاک ایران به جیب چه کسی می‌رود.'),

 ("To many Iranians this was not just an unfair contract but a wound to national pride, a symbol of the foreign hands that had shaped their country for too long. The demand to reclaim the oil united nationalists, the left, and much of the clergy in a single, powerful cause.",
  'برای بسیاری از ایرانی‌ها این فقط یک قرارداد ناعادلانه نبود، زخمی بر غرور ملی بود؛ نماد دست‌های بیگانه‌ای که مدت‌ها بیش از حد کشورشان را شکل داده بودند. خواستِ بازپس‌گیری نفت، ملی‌گرایان و چپ و بخش بزرگی از روحانیت را زیر یک پرچم نیرومند گرد آورد.'),

 ("Mossadegh rises", 'برآمدن مصدق'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
