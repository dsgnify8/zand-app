# -*- coding: utf-8 -*-
# Replaces chapter mi1 of the modern-iran topic.

p = "constants/education.ts"
s = open(p).read()

start = s.find("      key: 'mi1',")
if start == -1:
    print("ABORT: mi1 not found"); raise SystemExit
end = s.find("      key: 'mi2',")
if end == -1:
    print("ABORT: mi2 not found"); raise SystemExit
# back up to the opening brace of the mi1 chapter object
open_brace = s.rfind("    {", 0, start)
close_before_mi2 = s.rfind("    {", 0, end)

NEW = '''    {
      key: 'mi1',
      title: 'How It Began',
      subtitle: '1963 - 1979',
      pages: [
        { blocks: [
          { t: 'p', x: 'The Iran that exists today began in 1979. Everything since, the war, the money, the leaders, the arguments at every dinner table, runs back to that year.' },
          { t: 'p', x: 'This is the hardest chapter in this book to write, because it is not finished. It is not a settled history that everyone has agreed on. It is still being lived, by people who were there and by their children, and almost every family holds a different piece of it.' },
          { t: 'p', x: 'So this is not a verdict. It is an account: what happened, in order, from the years before the Shah left to where the country stands now. Where the facts are clear they are stated plainly. Where people saw the same events and drew opposite conclusions, both are set down.' },
          { t: 'markline', x: 'Begin where it begins, and let the record speak.' },
          { t: 'div' },
        ] },
        { blocks: [
          { t: 'h', x: 'The White Revolution' },
          { t: 'p', x: 'In 1963 Mohammad Reza Shah announced a programme he called the White Revolution: a revolution from above, made without bloodshed. His stated ambition was to move Iran, within a single generation, from a largely agricultural country into the front rank of nations.' },
          { t: 'p', x: 'It is worth remembering what Iran looked like before it. Most people worked land they did not own. Literacy outside the cities was low. Electricity, running water and roads reached only part of the country. The modern industrial economy had barely begun.' },
          { t: 'img', key: 'wr-1' },
          { t: 'p', x: 'The programme set out to change all of that at once. Large estates were broken up and the land distributed to the farmers working it. Factories were required to share profits with their workers. Forests and waterways passed to the state. A literacy corps of young conscripts was sent into the villages to teach, and a health corps followed them. Roads, dams, power stations and universities were built at a pace the country had never seen.' },
          { t: 'p', x: 'And women were given the vote. They could stand for parliament, and did. The legal age of marriage was raised, family law was reformed to give women rights in divorce and custody, and by the 1970s Iranian women were serving as ministers, judges, ambassadors, doctors and pilots.' },
          { t: 'pull', x: 'Within a decade Iran had gone from the edge of the modern world to a seat at its table.' },
          { t: 'img', key: 'wr-2' },
          { t: 'p', x: 'With the oil revenues of the 1970s the money arriving in the country was extraordinary. Iran bought advanced technology, built an air force among the most capable anywhere, hosted world leaders, and was spoken of as a coming power. For a great many Iranians those years were the best their families had ever had.' },
          { t: 'div' },
          { t: 'h', x: 'What people experienced' },
          { t: 'p', x: 'A programme that large touches everyone differently, and the reactions to it varied enormously depending on who you were.' },
          { t: 'boxes', items: [
            { k: 'Many families', v: 'Rose. Land of their own, schooling for their children, work in the new industries, and lives visibly better than their parents had.' },
            { k: 'Landowners', v: 'Large holdings were broken up. A class that had held land and influence for generations lost much of both.' },
            { k: 'Some farmers', v: 'Received plots too small to support a family, with little credit to work them. Many sold and moved to the cities, arriving with nothing.' },
            { k: 'The clergy', v: 'Objected to female suffrage, and to land reform reaching religious endowments. Some read the wider programme as reducing their place in Iranian life.' },
            { k: 'The secular left', v: 'Argued that change handed down from a throne, without a corresponding widening of political life, was incomplete.' },
          ] },
          { t: 'p', x: 'The cities grew very fast, faster than housing or services could follow. The gap between those doing well from the boom and those newly arrived and struggling became visible in a way that was difficult to explain away, and that gap did more to shape what came next than any argument about doctrine.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A cleric in exile' },
          { t: 'p', x: 'Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963, objecting in particular to women voting and to land reform touching religious endowments. He was arrested, and his arrest set off large riots in Qom and Tehran.' },
          { t: 'p', x: 'In 1964 he was expelled from the country. That decision is worth pausing on: he could have been imprisoned indefinitely, and instead he was put on a plane.' },
          { t: 'p', x: 'He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes and carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no practical way to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in it.' },
          { t: 'markline', x: 'Exile removed him from Iran. It did not remove him from Iranian ears.' },
          { t: 'p', x: 'Political life in those years ran within limits. SAVAK, the national intelligence and security organisation founded in 1957, handled internal security and counter-intelligence, and open opposition movements operated with difficulty. Religious spaces, meanwhile, kept their own life and their own gatherings, which is part of why the mosque networks proved so effective when 1978 came.' },
          { t: 'div' },
          { t: 'h', x: 'The year it broke' },
          { t: 'p', x: 'In January 1978 a newspaper article attacking Khomeini prompted protests in Qom. In Shia practice the dead are mourned again on the fortieth day, so each funeral produced another gathering forty days later, and each gathering produced the next. The cycle ran through the year and grew each time.' },
          { t: 'p', x: 'On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it a negotiated settlement was much harder to reach. Strikes spread through the oil industry, the bazaar and the civil service. By December the country had largely stopped working.' },
          { t: 'img', key: 'shah-departure' },
          { t: 'p', x: 'On 16 January 1979 the Shah left Iran. Photographs from that morning show him weeping on the tarmac, something no one had seen from him before. He had spent thirty-seven years on the throne and had built much of what stood around him, and he left rather than remain somewhere he was no longer wanted, and rather than turn the army fully on the crowds.' },
          { t: 'quotebig', x: 'He did not fall in a battle. He walked out of a country that had stopped seeing him.' },
          { t: 'p', x: 'On 1 February Khomeini flew into Tehran and several million people came out to meet him. In April a referendum was held on becoming an Islamic republic, and the result was overwhelming.' },
          { t: 'p', x: 'One thing about that moment is often forgotten. The coalition that removed the monarchy was extremely broad: communists, liberal nationalists, bazaar merchants, students, clerics, and a great many people with no politics at all who simply wanted something different. Within two years it was not broad at all. What happened in between is the next chapter.' },
        ] },
      ],
    },
'''

s = s[:open_brace] + NEW + s[close_before_mi2:]
open(p, "w").write(s)
print("chapter one rewritten")
