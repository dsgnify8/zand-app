# -*- coding: utf-8 -*-
# Saadi, third batch: استاد سخن, and the بنی‌آدم passage.
# The commentary on the poem must not restate the poem — the component
# already shows it. So the prose points at it and explains.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'h', x: 'Speech as the art' }",
  "{ t: 'h', x: 'Speech as the art', fa: 'سخن، همچون هنر' }"),

 ("{ t: 'p', x: 'His title is Ostad e Sokhan, the Master of Speech, and it is not decoration. Persian prose was not really a literary art before him. He made it one, and set a standard so high that Iranians still measure sentences against it.' }",
  "{ t: 'p', x: 'His title is Ostad e Sokhan, the Master of Speech, and it is not decoration. Persian prose was not really a literary art before him. He made it one, and set a standard so high that Iranians still measure sentences against it.', fa: 'لقبش استاد سخن است، و این تزیین نیست. نثر فارسی پیش از او به‌راستی هنری ادبی نبود. او آن را هنر کرد، و معیاری چنان بلند گذاشت که ایرانی‌ها هنوز جمله‌هایشان را با آن می‌سنجند.' }"),

 ("{ t: 'p', x: 'And he understood silence as part of speech. A whole chapter of the Golestan is on knowing when not to talk, which is a strange subject for a man who lived by talking.' }",
  "{ t: 'p', x: 'And he understood silence as part of speech. A whole chapter of the Golestan is on knowing when not to talk, which is a strange subject for a man who lived by talking.', fa: 'و خاموشی را هم بخشی از سخن می‌دانست. یک باب کامل از گلستان دربارهٔ فواید خاموشی است؛ موضوعی غریب برای مردی که نانش را از سخن گفتن می‌خورد.' }"),

 ("{ t: 'p', x: 'Somewhere in the Golestan, without warning, in the middle of a chapter about kings, Saadi writes four lines that will outlive everything else he made.' }",
  "{ t: 'p', x: 'Somewhere in the Golestan, without warning, in the middle of a chapter about kings, Saadi writes four lines that will outlive everything else he made.', fa: 'جایی در گلستان، بی‌هیچ مقدمه‌ای، وسط بابی دربارهٔ پادشاهان، سعدی چهار مصراع می‌نویسد که از هر چیز دیگری که ساخته عمر بیشتری خواهند کرد.' }"),

 ("{ t: 'p', x: 'Touch it. That is the poem, and that is also the argument.' }",
  "{ t: 'p', x: 'Touch it. That is the poem, and that is also the argument.', fa: 'لمسش کن. شعر همین است، و استدلال هم همین.' }"),

 ("{ t: 'h', x: 'What it actually says' }",
  "{ t: 'h', x: 'What it actually says', fa: 'در واقع چه می‌گوید' }"),

 ("{ t: 'p', x: 'Read it carefully, because it is more radical than it first sounds. It does not say we should be kind to one another. It says we are not separate. Your pain is in my body already, and if I do not feel it, the failure is not moral, it is anatomical. Something in me is not working.' }",
  "{ t: 'p', x: 'Read it carefully, because it is more radical than it first sounds. It does not say we should be kind to one another. It says we are not separate. Your pain is in my body already, and if I do not feel it, the failure is not moral, it is anatomical. Something in me is not working.', fa: 'با دقت بخوانش، چون از آنچه در نگاه اول به گوش می‌آید بنیادی‌تر است. نمی‌گوید باید با هم مهربان باشیم. می‌گوید ما از هم جدا نیستیم. درد تو همین حالا در تن من است، و اگر حسش نکنم، اشکال اخلاقی نیست، اشکال در ساختار تن است. چیزی در من کار نمی‌کند.' }"),

 ("{ t: 'p', x: 'And the last line is a threat, gently delivered. If you do not feel the suffering of others, you do not deserve to be called human. Saadi does not ask. He defines.' }",
  "{ t: 'p', x: 'And the last line is a threat, gently delivered. If you do not feel the suffering of others, you do not deserve to be called human. Saadi does not ask. He defines.', fa: 'و بیت آخر تهدیدی است که به نرمی گفته می‌شود: اگر از محنت دیگران بی‌غم باشی، نشاید که نامت را آدمی بگذارند. سعدی خواهش نمی‌کند. تعریف می‌کند.' }"),
]

lit_scope.apply("saadi", PAIRS)
