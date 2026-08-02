# -*- coding: utf-8 -*-
# The Parthian Empire, final batch: the Silk Road, the loose empire, the end.

p = "constants/education.ts"
s = open(p).read()

PAIRS = [
 ("{ t: 'markline', x: 'They mastered the art of striking hardest at the moment they seemed to flee.' }",
  "{ t: 'markline', x: 'They mastered the art of striking hardest at the moment they seemed to flee.', fa: 'هنر آنان این بود که سخت‌ترین ضربه را درست هنگامی بزنند که به گریز می‌مانستند.' }"),

 ("{ t: 'p', x: 'The Parthian Empire sat astride the greatest trade route in the world: the Silk Road, the long ribbon of commerce that linked the empires of Rome and China. Through Parthian lands passed the silk of the east and the gold of the west, and the empire grew rich as the great middleman of the world.' }",
  "{ t: 'p', x: 'The Parthian Empire sat astride the greatest trade route in the world: the Silk Road, the long ribbon of commerce that linked the empires of Rome and China. Through Parthian lands passed the silk of the east and the gold of the west, and the empire grew rich as the great middleman of the world.', fa: 'امپراتوری اشکانی بر بزرگ‌ترین راه بازرگانی جهان نشسته بود: جادهٔ ابریشم، آن نوار دراز داد و ستد که امپراتوری روم و چین را به هم می‌بست. ابریشم شرق و زر غرب از خاک اشکانی می‌گذشت، و امپراتوری در مقام واسطهٔ بزرگ جهان توانگر شد.' }"),

 ("{ t: 'p', x: 'The Parthians guarded and profited from this trade, and their cities flourished as bustling crossroads where the goods, ideas, and peoples of half the world met and mingled. Iran was, once again, a bridge between civilizations, as it had been under Cyrus and would be again.' }",
  "{ t: 'p', x: 'The Parthians guarded and profited from this trade, and their cities flourished as bustling crossroads where the goods, ideas, and peoples of half the world met and mingled. Iran was, once again, a bridge between civilizations, as it had been under Cyrus and would be again.', fa: 'اشکانیان از این بازرگانی هم پاسداری کردند و هم سود بردند، و شهرهایشان چون چهارراه‌هایی پرجنب‌وجوش بالیدند؛ جایی که کالا و اندیشه و مردمانِ نیمی از جهان به هم می‌رسیدند و در هم می‌آمیختند. ایران، بار دیگر، پلی میان تمدن‌ها بود؛ چنان‌که در روزگار کوروش بود و باز هم خواهد بود.' }"),

 ("{ t: 'h', x: 'A looser kind of empire' }",
  "{ t: 'h', x: 'A looser kind of empire', fa: 'امپراتوری‌ای با بندهای سست‌تر' }"),

 ("{ t: 'p', x: 'Parthia was not a tightly centralized realm like the empires before and after it. It was more a family of kingdoms and noble houses, bound in loyalty to the Arsacid king of kings, with powerful local lords holding great sway. This gave the empire resilience, but also, in the end, a certain fragility, as the great houses and rival claimants fought among themselves.' }",
  "{ t: 'p', x: 'Parthia was not a tightly centralized realm like the empires before and after it. It was more a family of kingdoms and noble houses, bound in loyalty to the Arsacid king of kings, with powerful local lords holding great sway. This gave the empire resilience, but also, in the end, a certain fragility, as the great houses and rival claimants fought among themselves.', fa: 'اشکانیان قلمرویی به‌شدت متمرکز نبودند، آن‌گونه که امپراتوری‌های پیش و پس از آنان بودند. بیشتر خانواده‌ای بودند از پادشاهی‌ها و خاندان‌های بزرگ که در وفاداری به شاهنشاه اشکانی به هم بسته شده بودند، و خان‌های محلی نیرومند نفوذی فراوان داشتند. این ساختار به امپراتوری انعطاف داد، اما در پایان شکنندگی هم آورد؛ چرا که خاندان‌های بزرگ و مدعیان رقیب به جان هم می‌افتادند.' }"),

 ("{ t: 'p', x: 'For all its strength against Rome, the empire was often divided within, and its long centuries were marked by civil wars and contested successions that slowly wore at its foundations.' }",
  "{ t: 'p', x: 'For all its strength against Rome, the empire was often divided within, and its long centuries were marked by civil wars and contested successions that slowly wore at its foundations.', fa: 'با همهٔ توانی که در برابر روم داشت، امپراتوری اغلب در درون خود دوپاره بود، و قرن‌های بلندش را جنگ‌های داخلی و جانشینی‌های مورد نزاع نشان‌دار کرد؛ چیزی که به‌آرامی بنیادش را سایید.' }"),

 ("{ t: 'p', x: 'After nearly five hundred years, the Parthian Empire grew weary. Weakened by endless wars with Rome and by its own internal divisions, the once mighty realm was ripe for change. And change came, as it so often did in Iran, from the ancient heartland of Persia in the south.' }",
  "{ t: 'p', x: 'After nearly five hundred years, the Parthian Empire grew weary. Weakened by endless wars with Rome and by its own internal divisions, the once mighty realm was ripe for change. And change came, as it so often did in Iran, from the ancient heartland of Persia in the south.', fa: 'پس از نزدیک پانصد سال، امپراتوری اشکانی خسته شد. جنگ‌های بی‌پایان با روم و تفرقهٔ درونی ناتوانش کرده بود، و آن قلمروِ روزگاری نیرومند آمادهٔ دگرگونی بود. و دگرگونی، چنان‌که در ایران بارها روی داده، از دل سرزمین کهن پارس در جنوب آمد.' }"),

 ("{ t: 'p', x: 'There, a prince named Ardashir rose in rebellion. In 224 CE he defeated the last Parthian king in battle, and upon the ruins of the Arsacid realm he raised a new empire, the Sasanian, which would carry Persia to fresh heights of glory.' }",
  "{ t: 'p', x: 'There, a prince named Ardashir rose in rebellion. In 224 CE he defeated the last Parthian king in battle, and upon the ruins of the Arsacid realm he raised a new empire, the Sasanian, which would carry Persia to fresh heights of glory.', fa: 'آنجا شاهزاده‌ای به نام اردشیر سر به شورش برداشت. در سال ۲۲۴ میلادی واپسین شاه اشکانی را در نبرد شکست داد، و بر ویرانه‌های قلمرو اشکانی امپراتوری تازه‌ای برافراشت: ساسانیان، که پارس را به بلندی‌های تازه‌ای از شکوه می‌رساند.' }"),
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
