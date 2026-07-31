# -*- coding: utf-8 -*-
# Rewrites chapters mi6, mi8, mi9 and patches mi3 of the modern-iran topic.

p = "constants/education.ts"
s = open(p).read()

def replace_chapter(src, key, nxt, new):
    start = src.find("      key: '" + key + "',")
    if start == -1:
        raise SystemExit("ABORT: " + key + " not found")
    end = src.find("      key: '" + nxt + "',")
    if end == -1:
        raise SystemExit("ABORT: " + nxt + " not found")
    open_brace = src.rfind("    {", 0, start)
    close_before = src.rfind("    {", 0, end)
    return src[:open_brace] + new + src[close_before:]


# ---- mi3: more on what the war did to the country, and the 1988 line ----

PATCHES = [
 ("{ t: 'p', x: 'In July 1988 Iran accepted United Nations Resolution 598. Khomeini said that doing so was more deadly to him than drinking poison. The border ended where it had begun.' },",
  """{ t: 'p', x: 'In July 1988 Iran accepted United Nations Resolution 598. Khomeini said that doing so was more deadly to him than drinking poison. The border ended where it had begun.' },
          { t: 'div' },
          { t: 'h', x: 'What it did to the country' },
          { t: 'p', x: 'The border provinces took the worst of it. Khorramshahr, a city of more than a hundred thousand, was fought through street by street and left largely rubble; Iranians called it Khuninshahr afterwards, the city of blood. Abadan, Ahvaz, Dezful and dozens of smaller towns were shelled for years. Whole villages along the frontier were emptied and never rebuilt.' },
          { t: 'p', x: 'Something close to two million people were displaced inside their own country. Many spent years in temporary housing in cities that had no room for them, and a great many never went home at all, because home had been flattened or the land was still mined. Parts of that border remain uncleared today, and people are still injured on it.' },
          { t: 'p', x: 'The economy was reorganised entirely around the war. Oil terminals were bombed and exports collapsed. Rationing came in for bread, meat, petrol and cooking oil, and stayed. Everything not needed for the front stopped being built. The reconstruction that followed took the whole of the next decade and much of the money that might have gone anywhere else.' },
          { t: 'p', x: 'And an entire generation came home injured, or did not come home. Iran still supports hundreds of thousands of war-disabled, including men whose lungs were destroyed by gas in the 1980s and who have been dying of it slowly ever since.' },"""),

 ("{ t: 'p', x: 'The number has never been established. Human rights organisations have documented thousands of names; some estimates run considerably higher. No official account has ever been published, and no one has been tried for it.' },",
  """{ t: 'p', x: 'You can imagine what those panels were. A handful of questions, asked of someone already in a cell, and any wrong answer cost a life. People who had months left of a sentence, who expected to go home, did not.' },
          { t: 'p', x: 'The number has never been established. Human rights organisations have documented thousands of names; some estimates run considerably higher. No official account has ever been published, and no one has been tried for it. Families were not told where the graves were, and many searched for years.' },"""),
]

for a, b in PATCHES:
    if a in s:
        s = s.replace(a, b, 1)
    else:
        print("  miss (mi3):", a[:60])


# ---- mi6: the streets, in full ----

MI6 = '''    {
      key: 'mi6',
      title: 'The Streets',
      subtitle: '1999 - 2022',
      pages: [
        { blocks: [
          { t: 'p', x: 'Iranians have gone out into the streets again and again, and each time the pattern has been close to the same: something breaks, it spreads faster than anyone expects, it is put down, and the quiet that follows is mistaken abroad for agreement.' },
          { t: 'p', x: 'What follows is not a list of failures. It is a record of people who kept going out knowing exactly what it cost.' },
          { t: 'div' },
          { t: 'h', x: '1999: the dormitories' },
          { t: 'p', x: 'In July 1999 a reformist newspaper was closed and students at the University of Tehran protested. On the night of 9 July, security forces and plain-clothes paramilitaries entered the student dormitories at Kuy-e Daneshgah.' },
          { t: 'p', x: 'They went room by room. Students were beaten in their beds. Some were thrown from upper-floor windows and balconies. At least one student was killed outright and hundreds were injured, and more than a thousand were arrested in the days that followed. It became the largest unrest since the revolution to that point, and the image of young people being thrown from the windows of their own university stayed with the generation that saw it.' },
          { t: 'p', x: 'Almost nobody was held responsible. Of the many officers charged, one was convicted, for stealing an electric shaver.' },
          { t: 'markline', x: 'One conviction, for a shaver. That was the accounting.' },
        ] },
        { blocks: [
          { t: 'h', x: '2009: the Green Movement' },
          { t: 'img', key: 'green-movement' },
          { t: 'p', x: 'The June 2009 presidential election was called for the incumbent within hours of polls closing, by a margin nobody had seen coming and with a speed the counting could not plausibly have allowed. Mir-Hossein Mousavi, the reformist candidate, said the result had been manufactured.' },
          { t: 'p', x: 'What followed was the largest demonstration Iran had seen since 1979. Millions walked in silence through Tehran, wearing green, carrying a single question written on paper: where is my vote.' },
          { t: 'quotebig', x: 'رأی من کجاست' },
          { t: 'p', x: 'The crackdown came within days. Protesters were beaten in the streets and detained in their thousands. At Kahrizak detention centre, prisoners were tortured and several died, and the scandal was severe enough that even parts of the establishment objected.' },
          { t: 'p', x: 'On 20 June a young woman named Neda Agha-Soltan, who had stepped out of a car in the heat, was shot in the chest on a Tehran street. Someone filmed her dying. It went around the world within hours and became the image of that summer.' },
          { t: 'p', x: 'Mousavi and his wife Zahra Rahnavard, along with the other reformist candidate Mehdi Karroubi, were placed under house arrest in 2011. They remained there for more than a decade, never charged and never tried.' },
          { t: 'div' },
          { t: 'h', x: '2017 and 2019' },
          { t: 'p', x: 'The protests of late 2017 began over the price of eggs and spread within days to around a hundred towns, most of them small, provincial, and previously quiet. That was what alarmed people about them: this was not students in the capital, it was working families in places that had always been assumed loyal.' },
          { t: 'p', x: 'In November 2019 the petrol price was raised overnight without warning and the country came out again. The government shut off the national internet for about a week, and the crackdown happened inside that blackout. Reuters later reported around fifteen hundred dead. It was the first full-scale demonstration of a method that would be used again on a much larger scale.' },
        ] },
        { blocks: [
          { t: 'h', x: '2022: Woman, Life, Freedom' },
          { t: 'img', key: 'mahsa-1' },
          { t: 'p', x: 'On 13 September 2022 a twenty-two year old Kurdish woman named Mahsa Jina Amini was detained in Tehran by the morality police over how she was wearing her hijab. She collapsed in custody and died three days later. Her family said she had been beaten. The authorities said she had a pre-existing condition.' },
          { t: 'p', x: 'Her funeral in Saqqez became the first protest, and it did not stop there. Within a week it had reached every province in the country.' },
          { t: 'p', x: 'What made it different was who led it. Schoolgirls climbed onto desks and took off their headscarves and filmed it. University students walked out of segregated canteens. Women cut their hair in the street and in public squares. The slogan, Kurdish before it was Persian, was heard everywhere: zan, zendegi, azadi. Woman, life, freedom.' },
          { t: 'img', key: 'mahsa-2' },
          { t: 'p', x: 'It ran for months. Hundreds were killed, including dozens of children. Tens of thousands were arrested. Protesters were blinded by shotgun pellets fired at faces, and Iranian ophthalmologists reported treating hundreds of such injuries. Several young men were executed publicly and quickly, after trials measured in days, and executions of people arrested in 2022 have continued in the years since.' },
          { t: 'p', x: 'The protests were suppressed. But something did shift: in the years after, large numbers of women simply stopped covering their hair in public and continued not to, in defiance of a law still on the books. The enforcement of it has never been the same since.' },
          { t: 'pull', x: 'A law can stay written and stop being obeyed. That is its own kind of answer.' },
        ] },
      ],
    },
'''
s = replace_chapter(s, "mi6", "mi7", MI6)


# ---- mi8: the winter ----

MI8 = '''    {
      key: 'mi8',
      title: 'The Winter of 2025',
      subtitle: 'December 2025 - January 2026',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 28 December 2025 the rial fell to the lowest point in its history. It had been falling for years, but this was different in kind: prices in the shops changed between the morning and the afternoon, and importers stopped quoting at all because no quote survived the day.' },
          { t: 'p', x: 'The bazaars closed. Not because of a strike called by anyone, but because merchants in Tehran, Isfahan, Tabriz and Mashhad pulled down their shutters and refused to trade at prices they could no longer make sense of. When the bazaar closes in Iran it has always meant something, and everyone knew what it meant.' },
          { t: 'p', x: 'Ordinary households had already been cutting. Meat had gone first, then dairy, then fruit. By that December a large part of the country was managing on bread, rice and whatever else could be found, and the fall in the currency meant even that was moving out of reach.' },
          { t: 'markline', x: 'It began over the price of food, as these things usually do.' },
          { t: 'p', x: 'People went out that same week, and within days it was no longer about prices. The demand was for the government to go.' },
          { t: 'img', key: 'winter-1' },
        ] },
        { blocks: [
          { t: 'h', x: 'The eighth of January' },
          { t: 'p', x: 'On 8 January 2026 the government shut off the internet across the entire country. It stayed off longer than any national shutdown recorded anywhere in the world.' },
          { t: 'p', x: 'Nothing came out. Families abroad could not reach anyone. Hospitals could not be contacted. Journalists could not file, and nobody could count. Whatever happened in those days happened in the dark, and that was the purpose of the dark.' },
          { t: 'img', key: 'winter-2' },
          { t: 'p', x: 'People were killed in the streets, one after another, over roughly two days, and thousands more across the weeks around them. Nurses and medics who treated the wounded were taken; some were killed, and there are accounts of women in custody being raped. People who stopped to carry someone who had been shot were shot themselves. Couples. Children. Athletes. People who had come out and people who had simply been walking.' },
          { t: 'img', key: 'winter-3' },
          { t: 'p', x: 'The count grew every day and it grew from the bottom, because families went looking themselves. People searched hospitals, then morgues, then rows of body bags, trying to find someone they knew. Some found them. Some are still looking, and bodies are still being identified now.' },
          { t: 'p', x: 'No settled figure exists and there may never be one. Credible estimates range from several thousand to many times that, and the range exists for one reason: the state made counting impossible while it was happening, and has not permitted it since.' },
          { t: 'img', key: 'winter-4' },
          { t: 'div' },
          { t: 'h', x: 'After' },
          { t: 'p', x: 'Tens of thousands were arrested. Death sentences were handed down in numbers not seen before, and the executions have continued. They did not stop. People detained in January are being executed now, and so are people who were arrested during the protests of 2022, years after the fact.' },
          { t: 'p', x: 'That is the part that is easiest to lose from a distance. The event is written about in the past tense. For the families waiting outside a prison for news, it is not in the past tense at all.' },
        ] },
      ],
    },
'''
s = replace_chapter(s, "mi8", "mi9", MI8)


# ---- mi9: where it stands ----

MI9 = '''    {
      key: 'mi9',
      title: 'Where It Stands',
      subtitle: 'Today',
      pages: [
        { blocks: [
          { t: 'p', x: 'Life continues, and that is worth saying first, because coverage of Iran consists almost entirely of its worst days. People are working, marrying, studying, arguing about films. Nowruz is laid out on the same cloth it always was. The mountains above Tehran fill on Fridays. The country is not a ruin and its people are not waiting to be pitied.' },
          { t: 'p', x: 'But it is hard, and it is hard in the specific way that grinds people down: not drama, but arithmetic. A wage that buys less each month than it did the month before. Electricity that fails in July and gas that fails in January, in a country sitting on some of the largest energy reserves on earth. Aquifers falling, rivers gone, Lake Urmia largely dried. Almost every family with someone abroad and a chair at the table that stays empty at new year.' },
          { t: 'p', x: 'And the division does not run between households. It runs through them. There are people certain the system can still be changed from within and people certain it cannot. People who want it gone at any cost and people who watched Iraq and Syria and are frightened of what the cost might be. People who were out in January, people who lost someone in January, and people who did neither and cannot talk about it. These are the same family, at the same dinner.' },
          { t: 'div' },
        ] },
        { blocks: [
          { t: 'h', x: 'What people want' },
          { t: 'p', x: 'If you ask, the answers are not complicated, and they are strikingly consistent across people who agree on nothing else.' },
          { t: 'p', x: 'An economy that works for the people living in it, where a month of work covers a month of living and savings are still worth something a year later. A government that makes its decisions out of care for the country rather than the need to hold on to it. Leaders chosen by the people, replaced by the people, without anyone having to die to make the point.' },
          { t: 'p', x: 'Streets where a disagreement can be spoken aloud. Universities where an argument stays an argument. A country you can travel out of and back into freely, that the rest of the world can travel to, and that is known abroad for what it actually is rather than for its government.' },
          { t: 'quotebig', x: 'Not a country feared for what it might do. A country visited for what it already is.' },
          { t: 'p', x: 'There is a generation now that never saw the years before 1979 and has heard about them their whole lives: the pace of it, the confidence, the sense of a country arriving somewhere. They are not nostalgic for a monarchy. They are hungry for the feeling of a country moving forward, because they have only ever been told about it.' },
          { t: 'div' },
          { t: 'p', x: 'What comes next is not written, and anyone who says they know is guessing. But Iran has outlasted every empire that ever governed it, and it has done so through people who kept the language, the poetry, the food and the new year going without being asked and without being paid.' },
          { t: 'p', x: 'That is the part of this history with the longest record, and it is the part still running. The year still turns at the equinox. It has turned through worse than this.' },
          { t: 'pull', x: 'It is a long country. This is not the longest night it has had.' },
        ] },
      ],
    },
'''
# mi9 is the last chapter, so bound it by the end of the chapters array
start = s.find("      key: 'mi9',")
if start == -1:
    print("  miss: mi9"); 
else:
    open_brace = s.rfind("    {", 0, start)
    tail = s.find("\n  ],\n};", start)
    if tail == -1:
        print("  miss: end of chapters array")
    else:
        s = s[:open_brace] + MI9.rstrip() + "\n" + s[tail+1:]

open(p, "w").write(s)
print("chapters 3, 6, 8 patched/rewritten")
print("mi9 rewritten:", "Not a country feared for what it might do" in s)
