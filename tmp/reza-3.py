# -*- coding: utf-8 -*-
# Reza Shah: the Trans-Iranian Railway, and the private portrait.

p = "constants/education.ts"
s = open(p).read()

if "راه‌آهن سراسری، سربلندترین" in s:
    print("ABORT: already applied"); raise SystemExit

PAIRS = [
 ("{ t: 'p', x: 'Of all he built, the Trans-Iranian Railway was his proudest achievement. Stretching one thousand three hundred and ninety four kilometres, it bound the Persian Gulf in the south to the Caspian Sea in the north, crossing the length of a rugged and mountainous land.' }",
  "{ t: 'p', x: 'Of all he built, the Trans-Iranian Railway was his proudest achievement. Stretching one thousand three hundred and ninety four kilometres, it bound the Persian Gulf in the south to the Caspian Sea in the north, crossing the length of a rugged and mountainous land.', fa: 'از میان همهٔ آنچه ساخت، راه‌آهن سراسری، سربلندترین کارش بود. با هزار و سیصد و نود و چهار کیلومتر درازا، خلیج فارس در جنوب را به دریای خزر در شمال بست و سرتاسر سرزمینی ناهموار و کوهستانی را درنوردید.' }"),

 ("{ t: 'p', x: 'What made it extraordinary was not only the engineering but the pride behind it. It was built entirely with Iranian money, without a single foreign loan or concession, paid for by taxes on tea and sugar, so that in a sense every Iranian helped to build it with every cup of tea they drank.' }",
  "{ t: 'p', x: 'What made it extraordinary was not only the engineering but the pride behind it. It was built entirely with Iranian money, without a single foreign loan or concession, paid for by taxes on tea and sugar, so that in a sense every Iranian helped to build it with every cup of tea they drank.', fa: 'آنچه آن را استثنایی می‌کرد تنها مهندسی‌اش نبود، غروری بود که پشتش ایستاده بود. تمامش با پول ایران ساخته شد، بی‌آنکه یک وام یا امتیاز خارجی در کار باشد؛ هزینه‌اش از مالیات چای و قند تأمین شد، و به یک معنا هر ایرانی با هر استکان چایی که نوشید در ساختنش سهم داشت.' }"),

 ("{ t: 'p', x: 'The route climbed over the Zagros and the Alborz, the two great mountain ranges, rising past two thousand two hundred metres at its highest point, near the very limit of what the steam engines of the day could manage. It required more than ninety kilometres of tunnels and over four thousand bridges.' }",
  "{ t: 'p', x: 'The route climbed over the Zagros and the Alborz, the two great mountain ranges, rising past two thousand two hundred metres at its highest point, near the very limit of what the steam engines of the day could manage. It required more than ninety kilometres of tunnels and over four thousand bridges.', fa: 'مسیر از زاگرس و البرز بالا می‌رفت، دو رشته‌کوه بزرگ، و در بلندترین نقطه‌اش از دو هزار و دویست متر می‌گذشت؛ نزدیک به مرزِ توانِ لکوموتیوهای بخار آن روزگار. بیش از نود کیلومتر تونل و بیش از چهار هزار پل لازم داشت.' }"),

 ("{ t: 'p', x: 'Among its wonders were the Veresk Bridge in Mazandaran, one hundred and ten metres long and sixty six metres high, built without scaffolding and still standing as an engineering marvel, and the famous Three Golden Lines, a section of three switchback loops that climbed the steep Gaduk pass. Built between 1933 and 1938 across such terrain, it was a feat far ahead of its time.' }",
  "{ t: 'p', x: 'Among its wonders were the Veresk Bridge in Mazandaran, one hundred and ten metres long and sixty six metres high, built without scaffolding and still standing as an engineering marvel, and the famous Three Golden Lines, a section of three switchback loops that climbed the steep Gaduk pass. Built between 1933 and 1938 across such terrain, it was a feat far ahead of its time.', fa: 'از شگفتی‌هایش پل ورسک در مازندران بود، صد و ده متر درازا و شصت و شش متر بلندی، که بدون داربست ساخته شد و هنوز چون شاهکاری مهندسی ایستاده است؛ و سه خط طلا، سه حلقهٔ مارپیچ نامدار که از گردنهٔ پرشیب گدوک بالا می‌رفتند. ساختنش میان ۱۹۳۳ تا ۱۹۳۸ و در چنین زمینی، کاری بود بسیار جلوتر از زمانهٔ خود.' }"),

 ("{ t: 'p', x: 'The railway was inaugurated with great ceremony on 26 August 1938. Years later, during the Second World War, this same line became the vital Persian Corridor, carrying nearly five million tons of supplies to the Soviet Union. It remains in daily use to this day.' }",
  "{ t: 'p', x: 'The railway was inaugurated with great ceremony on 26 August 1938. Years later, during the Second World War, this same line became the vital Persian Corridor, carrying nearly five million tons of supplies to the Soviet Union. It remains in daily use to this day.', fa: 'راه‌آهن در ۲۶ اوت ۱۹۳۸ با تشریفاتی بزرگ افتتاح شد. سال‌ها بعد، در جنگ جهانی دوم، همین خط به کریدور ایران بدل شد و نزدیک پنج میلیون تن تدارکات را به اتحاد شوروی رساند. تا امروز هر روز در کار است.' }"),

 ("{ t: 'p', x: 'Behind the towering public figure was a father whose children remembered him with deep love and no small awe. He was stern, demanding, and impatient with weakness, yet those closest to him spoke of a warmth and a tenderness that the public rarely saw.' }",
  "{ t: 'p', x: 'Behind the towering public figure was a father whose children remembered him with deep love and no small awe. He was stern, demanding, and impatient with weakness, yet those closest to him spoke of a warmth and a tenderness that the public rarely saw.', fa: 'پشت آن چهرهٔ بلندبالای عمومی، پدری بود که فرزندانش با محبتی عمیق و هیبتی کم‌نظیر به یادش می‌آوردند. سختگیر بود، پرتوقع، و با سستی سر ناسازگاری داشت؛ اما نزدیک‌ترین کسانش از گرمی و مهری می‌گفتند که مردم کمتر می‌دیدند.' }"),

 ("{ t: 'p', x: 'He raised his sons and daughters to serve Iran, and he placed on his eldest son and heir, Mohammad Reza, the heaviest expectations of all. In the family memoirs his children describe a man of simple habits and iron discipline, who rose early, worked without rest, and expected the same of everyone around him.' }",
  "{ t: 'p', x: 'He raised his sons and daughters to serve Iran, and he placed on his eldest son and heir, Mohammad Reza, the heaviest expectations of all. In the family memoirs his children describe a man of simple habits and iron discipline, who rose early, worked without rest, and expected the same of everyone around him.', fa: 'پسران و دخترانش را برای خدمت به ایران بار آورد، و سنگین‌ترین انتظارها را بر دوش پسر بزرگ و ولیعهدش، محمدرضا، گذاشت. فرزندانش در خاطراتشان از مردی می‌نویسند با عادت‌هایی ساده و انضباطی آهنین؛ سحرخیز، بی‌وقفه در کار، و با همین توقع از هر که پیرامونش بود.' }"),

 ("""{ t: 'p', x: 'He had little patience for luxury or ceremony for its own sake. What moved him was the work of building, and he threw himself into it with a soldier\\'s single mindedness. He would appear without warning at a worksite or a barracks or a school, inspecting, questioning, driving the work forward.' }""",
  """{ t: 'p', x: 'He had little patience for luxury or ceremony for its own sake. What moved him was the work of building, and he threw himself into it with a soldier\\'s single mindedness. He would appear without warning at a worksite or a barracks or a school, inspecting, questioning, driving the work forward.', fa: 'حوصلهٔ تجمل و تشریفاتِ بی‌سبب را نداشت. آنچه او را به حرکت می‌آورد کارِ ساختن بود، و با یکدندگی یک سرباز خود را در آن انداخت. بی‌خبر سر کارگاه یا پادگان یا مدرسه‌ای پیدا می‌شد، بازرسی می‌کرد، می‌پرسید، و کار را جلو می‌راند.' }"""),
]

missing = [a for a, _ in PAIRS if a not in s]
if missing:
    print("ABORT: could not find", len(missing), "block(s):")
    for m in missing:
        print("   -", m[:80])
    raise SystemExit

for a, b in PAIRS:
    s = s.replace(a, b, 1)

open(p, "w").write(s)
print("translated:", len(PAIRS), "blocks")
