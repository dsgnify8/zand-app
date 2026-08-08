# -*- coding: utf-8 -*-
# Rudaki, third batch: the lost work, the fall, and the blinding.
# کلیله و دمنه, قصیده, پنجرود.

import sys
sys.path.insert(0, "tmp")
import lit_scope

PAIRS = [
 ("{ t: 'p', x: 'Persians have told this story for a thousand years because of what it claims: that a poem is not decoration, it is a lever, and applied to the right man at the right hour it moves the world.' }",
  "{ t: 'p', x: 'Persians have told this story for a thousand years because of what it claims: that a poem is not decoration, it is a lever, and applied to the right man at the right hour it moves the world.', fa: 'ایرانی‌ها هزار سال است این حکایت را نقل می‌کنند، به سبب آنچه ادعا می‌کند: که شعر تزیین نیست، اهرم است؛ و اگر در ساعت درست بر مرد درست وارد شود، جهان را جابه‌جا می‌کند.' }"),

 ("{ t: 'p', x: 'And now the hard part. Rudaki was enormously prolific. The old sources give numbers, and the numbers are impossible to verify and impossible to ignore. A hundred thousand verses is the figure usually given. One medieval writer claimed over a million, which nobody believes.' }",
  "{ t: 'p', x: 'And now the hard part. Rudaki was enormously prolific. The old sources give numbers, and the numbers are impossible to verify and impossible to ignore. A hundred thousand verses is the figure usually given. One medieval writer claimed over a million, which nobody believes.', fa: 'و حالا بخش دشوار. رودکی به‌شدت پرکار بود. سرچشمه‌های کهن رقم می‌دهند، و این رقم‌ها را نه می‌توان تأیید کرد و نه می‌توان نادیده گرفت. رقمی که معمولاً می‌آورند صد هزار بیت است. یکی از نویسندگان سده‌های میانه از بیش از یک میلیون بیت گفته، که کسی باورش نمی‌کند.' }"),

 ("{ t: 'p', x: 'What survives is about a thousand lines. Roughly one percent. Everything else is gone, into fires and floods and the Mongols and simple neglect, and it is not coming back.' }",
  "{ t: 'p', x: 'What survives is about a thousand lines. Roughly one percent. Everything else is gone, into fires and floods and the Mongols and simple neglect, and it is not coming back.', fa: 'آنچه به جا مانده حدود هزار بیت است. تقریباً یک درصد. باقی همه رفته؛ در آتش و سیل و مغول و بی‌اعتنایی ساده، و برنمی‌گردد.' }"),

 ("{ t: 'p', x: 'That grid is the honest picture. Every mark is a hundred verses. The gold ones are what we have.' }",
  "{ t: 'p', x: 'That grid is the honest picture. Every mark is a hundred verses. The gold ones are what we have.', fa: 'آن شبکه، تصویر صادقانه است. هر نشانه صد بیت است. طلایی‌ها آن چیزی است که داریم.' }"),

 ("{ t: 'p', x: 'We know he wrote a Kalila and Dimna in verse, the great book of animal fables, because people quote it. The book itself is gone. We have fragments of odes to patrons whose names mean nothing now. We have single couplets, quoted in other men books to make a point about grammar, floating free of whatever poem they came from.' }",
  "{ t: 'p', x: 'We know he wrote a Kalila and Dimna in verse, the great book of animal fables, because people quote it. The book itself is gone. We have fragments of odes to patrons whose names mean nothing now. We have single couplets, quoted in other men books to make a point about grammar, floating free of whatever poem they came from.', fa: 'می‌دانیم که کلیله و دمنه را به نظم درآورد، آن کتاب بزرگ افسانه‌های جانوران، چون دیگران از آن نقل کرده‌اند. خودِ کتاب رفته است. پاره‌هایی از قصیده‌هایی در مدح ممدوحانی داریم که نامشان امروز هیچ معنایی ندارد. بیت‌هایی تک داریم که در کتاب دیگران برای اثبات نکته‌ای دستوری نقل شده‌اند، جدا افتاده از هر شعری که از آن آمده‌اند.' }"),

 ("{ t: 'p', x: 'It is worth sitting with what that means. The judgement that he was the greatest of his age was made by people who could read all of it. We are agreeing with a verdict on evidence we do not have.' }",
  "{ t: 'p', x: 'It is worth sitting with what that means. The judgement that he was the greatest of his age was made by people who could read all of it. We are agreeing with a verdict on evidence we do not have.', fa: 'ارزشش را دارد کمی با معنای این جمله بنشینیم. آن داوری که او بزرگ‌ترین شاعر روزگارش بود، به دست کسانی صادر شد که می‌توانستند همهٔ کارش را بخوانند. ما با حکمی موافقیم که سندش را در دست نداریم.' }"),

 ("{ t: 'p', x: 'He did not die at court. Somewhere near the end the politics turned, his patron fell, and Rudaki was expelled. He went back to the village he came from, poor, and died there around 941.' }",
  "{ t: 'p', x: 'He did not die at court. Somewhere near the end the politics turned, his patron fell, and Rudaki was expelled. He went back to the village he came from, poor, and died there around 941.', fa: 'در دربار نمرد. جایی نزدیک پایان، سیاست برگشت، ممدوحش از قدرت افتاد، و رودکی رانده شد. به همان روستایی که از آن آمده بود بازگشت، تنگدست، و حدود سال ۹۴۱ میلادی همان‌جا درگذشت.' }"),

 ("{ t: 'p', x: 'And he was blind. The sources agree on that much and on nothing else about it. Some say from birth, though he writes about colour with an accuracy that makes that hard to believe. When Soviet archaeologists opened what they believed was his grave in 1965, they reported that the skull showed the sockets had been burned, which would mean he was blinded with hot iron, late, deliberately, by someone.' }",
  "{ t: 'p', x: 'And he was blind. The sources agree on that much and on nothing else about it. Some say from birth, though he writes about colour with an accuracy that makes that hard to believe. When Soviet archaeologists opened what they believed was his grave in 1965, they reported that the skull showed the sockets had been burned, which would mean he was blinded with hot iron, late, deliberately, by someone.', fa: 'و نابینا بود. سرچشمه‌ها بر همین یک نکته توافق دارند و بر هیچ چیز دیگری دربارهٔ آن. بعضی می‌گویند از تولد، هرچند او دربارهٔ رنگ‌ها با دقتی می‌نویسد که باور کردن این را دشوار می‌کند. وقتی باستان‌شناسان شوروی در سال ۱۹۶۵ گوری را که گمان می‌کردند از او باشد گشودند، گزارش دادند که جمجمه نشان می‌دهد حدقه‌ها سوزانده شده‌اند؛ و این یعنی او را با آهن گداخته کور کرده‌اند، دیرهنگام، عامدانه، به دست کسی.' }"),
]

lit_scope.apply("rudaki", PAIRS)
