# -*- coding: utf-8 -*-
# Mohammad Reza Shah, tenth batch: the divorce, Farah, and the heir.
# فرح دیبا, شهبانو, ولیعهد رضا.

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
 ("The Shah signed royal decrees dismissing Mossadegh and appointing General Zahedi in his place. The first attempt, in mid August, failed. Mossadegh's supporters held the streets, and the frightened king fled the country, first to Baghdad and then to Rome, convinced he had lost his throne forever.",
  'شاه فرمان‌هایی امضا کرد که مصدق را برکنار و سرلشکر زاهدی را به جای او منصوب می‌کرد. تلاش اول، در نیمهٔ مرداد، شکست خورد. هواداران مصدق خیابان‌ها را در دست گرفتند، و شاهِ هراسان از کشور گریخت؛ نخست به بغداد و بعد به رم، با این باور که تختش را برای همیشه از دست داده است.'),

 ("He is said to have offered to change the line of succession so that the throne might pass to a brother's son rather than lose her. It was not allowed.",
  'گفته‌اند پیشنهاد داد خط جانشینی را تغییر دهند تا تخت به پسر برادرش برسد و او مجبور به از دست دادن ثریا نشود. اجازه ندادند.'),

 ("The crown asked of him the one thing his heart refused to give easily.",
  'سلطنت از او همان یک چیزی را خواست که دلش به‌آسانی نمی‌داد.'),

 ("In 1958 they divorced. It was announced to the nation with genuine sorrow, and Soraya left Iran to live quietly abroad, remembered ever after in the press as the princess with the sad, beautiful eyes.",
  'در سال ۱۳۳۶ از هم جدا شدند. خبرش با اندوهی واقعی به مردم اعلام شد، و ثریا ایران را ترک کرد تا در خارج بی‌سروصدا زندگی کند؛ و از آن پس در مطبوعات همیشه شاهزاده‌ای با چشمان غمگین و زیبا خوانده شد.'),

 ("In his memoirs the Shah wrote of her with lasting tenderness, and never quite denied that a part of him remained bound to her. It is among the most human passages of his life, a reminder that beneath the uniform and the ceremony was a man asked to weigh love against duty, and made to choose duty.",
  'شاه در خاطراتش با مهری ماندگار از او نوشت، و هرگز به‌درستی انکار نکرد که بخشی از او همچنان به ثریا بسته مانده است. این از انسانی‌ترین فصل‌های زندگی اوست؛ یادآوری اینکه زیر آن یونیفرم و آن تشریفات، مردی بود که از او خواسته بودند عشق را در برابر وظیفه بسنجد، و وادارش کردند وظیفه را انتخاب کند.'),

 ("In 1959 the Shah met Farah Diba, a young Iranian studying architecture in Paris. Warm, cultured, and devoted to art and to her country, she was unlike the sheltered princesses of the past. They married in December 1959 in a celebrated ceremony in Tehran.",
  'در سال ۱۳۳۸، شاه با فرح دیبا آشنا شد؛ دختری ایرانی که در پاریس معماری می‌خواند. گرم بود و فرهیخته و دلبستهٔ هنر و کشورش، و شبیه شاهزاده‌خانم‌های پرورده در حصار گذشته نبود. در آذر همان سال، در مراسمی پرآوازه در تهران ازدواج کردند.'),

 ("Farah would become far more than a consort. She threw herself into the arts, education, and welfare, founded museums and cultural festivals, and in time was crowned Shahbanou, or empress, the first woman so honored in modern Iranian history.",
  'فرح بسی بیش از یک همسرِ شاه شد. خود را وقف هنر و آموزش و رفاه کرد، موزه‌ها و جشنواره‌های فرهنگی بنیان گذاشت، و به‌مرور تاج شهبانویی بر سرش گذاشته شد؛ نخستین زنی در تاریخ ایرانِ نو که چنین جایگاهی یافت.'),

 ("An heir at last", 'سرانجام یک ولیعهد'),

 ("On the last day of October 1960, Farah gave birth to a son, Reza. Church bells and gun salutes rang across the country, and the Shah, after decades of waiting, at last had the male heir his throne demanded. More children followed, and the royal family became a symbol of the modern Iran he hoped to build.",
  'در آخرین روز آبان ۱۳۳۹، فرح پسری به دنیا آورد، رضا. صدای ناقوس و شلیک توپ در سراسر کشور پیچید، و شاه پس از دهه‌ها انتظار، سرانجام ولیعهدی داشت که تختش می‌طلبید. فرزندان دیگری هم آمدند، و خانوادهٔ سلطنتی به نمادی از همان ایران مدرنی بدل شد که او امید ساختنش را داشت.'),
]

PAIRS = []
for en, fa in ITEMS:
    PAIRS.extend(pairs_for(en, fa))

mrp_scope.apply(PAIRS)
