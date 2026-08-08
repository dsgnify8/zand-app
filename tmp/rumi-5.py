# -*- coding: utf-8 -*-
# Rumi, fifth batch: the reed and the sama.
# نی, نیستان, سماع, درویش, صحاف/زرگر — the goldsmiths' quarter is بازار
# زرگران in Konya. The Reed component already shows بشنو این نی, so the
# prose points at it rather than repeating it.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'A reed is cut from the reed bed to make a ney. The music the flute makes is the sound of a plant crying for the water it was taken from. It only sings because it was wounded, and what it sings about is the wound.' }",
  "{ t: 'p', x: 'A reed is cut from the reed bed to make a ney. The music the flute makes is the sound of a plant crying for the water it was taken from. It only sings because it was wounded, and what it sings about is the wound.', fa: 'نی را از نیستان می‌برند تا از آن ساز بسازند. آوایی که نی می‌دهد، نالهٔ گیاهی است برای آبی که از آن جدایش کرده‌اند. تنها به این سبب می‌نوازد که زخم خورده، و آنچه از آن می‌نوازد همان زخم است.' }"),

 ("{ t: 'mark', x: 'You are the reed. You were cut from something. Everything you have ever wanted is that.' }",
  "{ t: 'mark', x: 'You are the reed. You were cut from something. Everything you have ever wanted is that.', fa: 'تو همان نی هستی. از چیزی بریده‌ات کرده‌اند. هر چه در عمرت خواسته‌ای، همان است.' }"),

 ("{ t: 'p', x: 'That is the Masnavi in one image, delivered in the first minute, and the remaining twenty six thousand couplets are elaboration. It is also, unmistakably, a man explaining what happened to him when he lost Shams and discovering that it explains the universe.' }",
  "{ t: 'p', x: 'That is the Masnavi in one image, delivered in the first minute, and the remaining twenty six thousand couplets are elaboration. It is also, unmistakably, a man explaining what happened to him when he lost Shams and discovering that it explains the universe.', fa: 'تمام مثنوی در یک تصویر است، که در دقیقهٔ اول تحویل داده می‌شود، و آن بیست و شش هزار بیت دیگر شرح همین است. و در عین حال، بی‌هیچ تردیدی، مردی است که دارد توضیح می‌دهد وقتی شمس را از دست داد بر او چه گذشت، و کشف می‌کند که همین توضیح، جهان را هم توضیح می‌دهد.' }"),

 ("{ t: 'p', x: 'The story is that he was walking through the goldsmiths quarter of Konya, and the hammers were beating on the metal, and in the rhythm he heard something, and he raised his arms and began to turn in the street, and did not stop.' }",
  "{ t: 'p', x: 'The story is that he was walking through the goldsmiths quarter of Konya, and the hammers were beating on the metal, and in the rhythm he heard something, and he raised his arms and began to turn in the street, and did not stop.', fa: 'حکایت این است که از بازار زرگران قونیه می‌گذشت، و چکش‌ها بر فلز فرود می‌آمدند، و او در آن ضرب چیزی شنید؛ دست‌هایش را بالا برد و همان‌جا در کوچه به چرخیدن افتاد، و دست برنداشت.' }"),

 ("{ t: 'p', x: 'Touch it, and let it turn.' }",
  "{ t: 'p', x: 'Touch it, and let it turn.', fa: 'لمسش کن و بگذار بچرخد.' }"),

 ("{ t: 'h', x: 'Nothing about it is arbitrary' }",
  "{ t: 'h', x: 'Nothing about it is arbitrary', fa: 'هیچ چیزش دلبخواهی نیست' }"),

 ("{ t: 'p', x: 'Every part of the sama means something, and it was formalised into an order after his death by his son. The white robe is a shroud. The black cloak is the tomb, and it is dropped at the beginning, because the dervish is stepping out of his grave. The tall felt hat is a headstone.' }",
  "{ t: 'p', x: 'Every part of the sama means something, and it was formalised into an order after his death by his son. The white robe is a shroud. The black cloak is the tomb, and it is dropped at the beginning, because the dervish is stepping out of his grave. The tall felt hat is a headstone.', fa: 'هر جزء سماع معنایی دارد، و پس از مرگ او پسرش آن را به آیینی منظم درآورد. تنورهٔ سپید، کفن است. خرقهٔ سیاه، گور است، و در آغاز از تن می‌افتد، چون درویش دارد از گور خودش بیرون می‌آید. کلاه بلند نمدی، سنگ گور است.' }"),

 ("{ t: 'p', x: 'The right hand turns up to receive from heaven. The left hand turns down to give to the earth. Nothing is kept. The dervish is a pipe, not a cup, and whatever comes through goes straight out the other side into the world.' }",
  "{ t: 'p', x: 'The right hand turns up to receive from heaven. The left hand turns down to give to the earth. Nothing is kept. The dervish is a pipe, not a cup, and whatever comes through goes straight out the other side into the world.', fa: 'دست راست رو به بالا می‌چرخد تا از آسمان بگیرد. دست چپ رو به پایین تا به زمین ببخشد. هیچ چیز نگه داشته نمی‌شود. درویش لوله است، نه جام؛ و هر چه از او می‌گذرد، از آن سو یکراست به جهان می‌ریزد.' }"),
]

lit_scope.apply("rumi", PAIRS)
