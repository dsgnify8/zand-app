# -*- coding: utf-8 -*-
# Nizami, fourth batch: Majnun in the desert, Layli's famous reply, and
# what the poem is about. The reply is known in Persian as
# «باید به چشم مجنون دید» — one must look with Majnun's eyes.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'He goes into the desert. He stops eating, stops washing, stops speaking to people. Wild animals gather around him and do not run, because there is nothing left of him to fear. Layli is married off to a man she will not touch. Both of them die apart.' }",
  "{ t: 'p', x: 'He goes into the desert. He stops eating, stops washing, stops speaking to people. Wild animals gather around him and do not run, because there is nothing left of him to fear. Layli is married off to a man she will not touch. Both of them die apart.', fa: 'به بیابان می‌زند. از خوردن می‌افتد، از شستن، از حرف زدن با مردم. جانوران وحشی گردش جمع می‌شوند و نمی‌گریزند، چون دیگر چیزی از او نمانده که از آن بترسند. لیلی را به مردی می‌دهند که هرگز دست به او نمی‌زند. هر دو، دور از هم، می‌میرند.' }"),

 ("{ t: 'h', x: 'The line every Iranian knows' }",
  "{ t: 'h', x: 'The line every Iranian knows', fa: 'آن جمله که هر ایرانی می‌داند' }"),

 ("{ t: 'p', x: 'A ruler hears about this famous madness and has Layli brought to him. He looks at her, and he is unimpressed, and he says so: are you the one who drove that man out of his mind? You are not so beautiful.' }",
  "{ t: 'p', x: 'A ruler hears about this famous madness and has Layli brought to him. He looks at her, and he is unimpressed, and he says so: are you the one who drove that man out of his mind? You are not so beautiful.', fa: 'فرمانروایی از این دیوانگی نامدار می‌شنود و لیلی را نزد خود می‌آورد. نگاهش می‌کند، چیز چندانی در او نمی‌بیند، و همین را هم می‌گوید: تو همانی که آن مرد را از خود بی‌خود کرد؟ چندان هم زیبا نیستی.' }"),

 ("{ t: 'p', x: 'That reply is quoted in Iran to this day, by people who have never read the poem, at anyone who dismisses something they cannot feel.' }",
  "{ t: 'p', x: 'That reply is quoted in Iran to this day, by people who have never read the poem, at anyone who dismisses something they cannot feel.', fa: 'همان پاسخ تا امروز در ایران نقل می‌شود، به این صورت که «باید از چشم مجنون به لیلی نگاه کرد»؛ و کسانی نقلش می‌کنند که هرگز خود منظومه را نخوانده‌اند، خطاب به هر کسی که چیزی را دست‌کم می‌گیرد چون خودش حسش نمی‌کند.' }"),

 ("{ t: 'h', x: 'What the story is actually about' }",
  "{ t: 'h', x: 'What the story is actually about', fa: 'این داستان در واقع دربارهٔ چیست' }"),

 ("{ t: 'p', x: 'Late in the poem, someone offers Majnun a way to reach Layli, and he refuses. This is the moment the whole thing turns on, and it is why the poem has lasted.' }",
  "{ t: 'p', x: 'Late in the poem, someone offers Majnun a way to reach Layli, and he refuses. This is the moment the whole thing turns on, and it is why the poem has lasted.', fa: 'اواخر منظومه، کسی به مجنون راهی برای رسیدن به لیلی پیشنهاد می‌کند، و او نمی‌پذیرد. تمام کار بر همین لحظه می‌چرخد، و همین است که این منظومه را ماندگار کرده.' }"),

 ("{ t: 'p', x: 'The love has outgrown its object. He does not want Layli anymore. He wants the state of loving her, which has become larger and more real than the woman ever was. She has become a door, and he is no longer interested in what is behind it, because he is standing in the light coming through.' }",
  "{ t: 'p', x: 'The love has outgrown its object. He does not want Layli anymore. He wants the state of loving her, which has become larger and more real than the woman ever was. She has become a door, and he is no longer interested in what is behind it, because he is standing in the light coming through.', fa: 'عشق از موضوع خودش بزرگ‌تر شده است. دیگر لیلی را نمی‌خواهد. آن حالِ عاشقیِ لیلی را می‌خواهد، که بزرگ‌تر و واقعی‌تر از خودِ آن زن شده است. لیلی به دری بدل شده، و مجنون دیگر به پشت آن در کاری ندارد، چون در همان نوری ایستاده که از آن می‌تابد.' }"),

 ("{ t: 'mark', x: 'He loved her until she was no longer necessary.' }",
  "{ t: 'mark', x: 'He loved her until she was no longer necessary.', fa: 'چندان عاشقش بود که دیگر به خودش نیازی نماند.' }"),
]

lit_scope.apply("nizami", PAIRS)
