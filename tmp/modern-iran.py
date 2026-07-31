# -*- coding: utf-8 -*-
# Adds "Iran Since the Revolution" to the history topics.
# Refuses to write unless the anchor is found.

p = "constants/education.ts"
s = open(p).read()

if "key: 'modern-iran'" in s:
    print("ABORT: already applied"); raise SystemExit

TOPIC = '''
const modernIran: Topic = {
  key: 'modern-iran',
  category: 'history',
  name: 'Iran Since the Revolution',
  persian: 'ایران پس از انقلاب',
  years: '1979 - today',
  essence: 'The revolution, the war, the leaders who followed, and the long descent of the currency. What happened, in order, as plainly as it can be told.',
  cover: 'modern-cover',
  closing: 'modern-cover',
  status: 'ready',
  sources: [
    'Contemporary reporting and the historical record',
    'United Nations and human rights organisation documentation',
    'Central Bank of Iran and World Bank economic data',
  ],
  chapters: [
    {
      key: 'mi1',
      title: 'Why 1979 Happened',
      subtitle: '1953 - 1978',
      pages: [
        { blocks: [
          { t: 'p', x: 'Revolutions are usually explained afterwards as though they were inevitable. They rarely feel that way while they are happening. In the middle of 1977 the Shah was, by most external measures, secure: oil revenue was enormous, the army was the strongest in the region, and the American president had toasted Iran as an island of stability. Eighteen months later he left the country and did not return.' },
          { t: 'h', x: 'The shadow of 1953' },
          { t: 'p', x: 'In 1953 the elected prime minister Mohammad Mosaddegh, who had nationalised the British-owned oil company, was removed in a coup organised with British and American intelligence. The Shah, who had briefly fled, returned to a throne that many Iranians now understood to rest partly on foreign support. Whatever one thinks of Mosaddegh or of the monarchy, the memory of that year sat underneath Iranian politics for the next quarter of a century, and it was invoked constantly in 1978.' },
          { t: 'div' },
          { t: 'h', x: 'The White Revolution' },
          { t: 'p', x: 'In 1963 the Shah announced a programme of reforms he called the White Revolution: a revolution, as he described it, made from above without bloodshed. In his own writing he set out the aims plainly. Land held by large estates would be redistributed to the peasants who worked it. Women would get the vote. A literacy corps of conscripts would be sent to teach in villages. Factory workers would share in profits. Forests and waterways would pass to the state.' },
          { t: 'p', x: 'Those were the stated intentions. What people experienced varied enormously depending on who they were, and the reactions are worth setting out separately from the programme itself.' },
          { t: 'boxes', items: [
            { k: 'Landowners', v: 'Large holdings were broken up. A class that had held both land and political influence for generations lost much of both, and did not forgive it.' },
            { k: 'Many peasants', v: 'Received title to land. But plots were often too small to support a family, credit was scarce, and a great many sold up and moved to the cities, where they arrived poor and unhoused.' },
            { k: 'The clergy', v: 'Objected to female suffrage, and to land reform reaching religious endowments. Some also read the programme as a broader move to reduce their standing in Iranian life.' },
            { k: 'The secular left', v: 'Argued that reform handed down from a throne, with no corresponding political freedom and no free press, was not reform at all.' },
          ] },
          { t: 'p', x: 'The cities grew very fast. Oil money after 1973 poured into a country that could not absorb it evenly, and the gap between those who did well from it and those who did not became visible in a way that was hard to explain away. Meanwhile the security service, SAVAK, made open political opposition dangerous. That combination mattered: when ordinary politics is closed, opposition does not disappear, it moves to the one place the state cannot easily enter.' },
          { t: 'pull', x: 'The mosque was the only building in Iran where people could gather in numbers without asking permission.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A cleric in exile' },
          { t: 'p', x: 'Ruhollah Khomeini, a senior cleric in Qom, denounced the White Revolution in 1963 in terms that went well beyond its contents. He was arrested, and his arrest set off riots in June of that year that were put down with considerable loss of life. In 1964 he was expelled from the country. It is worth pausing on that decision: he could have been imprisoned or executed, and instead he was put on a plane.' },
          { t: 'p', x: 'He spent the next fourteen years in Turkey, then in Najaf in Iraq, then briefly outside Paris, and he spent them working. Sermons were recorded onto cassette tapes, carried into Iran by travellers and pilgrims, copied, and passed hand to hand. There was no way for the state to intercept a tape in a coat pocket. By the late 1970s a man who had not set foot in Iran for over a decade was among the most widely heard voices in the country.' },
          { t: 'markline', x: 'Exile removed him from Iran. It did not remove him from Iranian ears.' },
          { t: 'div' },
          { t: 'h', x: 'The year it broke' },
          { t: 'p', x: 'In January 1978 a newspaper article attacking Khomeini prompted protests in Qom, and police fired on them. In Shia practice the dead are mourned again on the fortieth day, so the funerals produced another gathering forty days later, which produced more dead, which produced another gathering. The cycle ran through the year and grew each time.' },
          { t: 'p', x: 'On 8 September 1978, in Jaleh Square in Tehran, troops fired on a large demonstration. It became known as Black Friday, and after it the possibility of a negotiated settlement largely closed. Strikes spread through the oil industry, the bazaar, the civil service. By December the country had effectively stopped working.' },
          { t: 'p', x: 'On 16 January 1979 the Shah left Iran, saying he was going abroad for a rest. On 1 February Khomeini flew into Tehran and several million people came out to meet him. In April a referendum was held on becoming an Islamic republic, and the result was overwhelming.' },
          { t: 'p', x: 'One thing about that moment is often forgotten. The coalition that removed the monarchy was extremely broad: communists, liberal nationalists, bazaar merchants, students, clerics, ordinary people with no politics at all. Within two years it was not broad at all. What happened in between is the next chapter.' },
        ] },
      ],
    },
    {
      key: 'mi2',
      title: 'The New Order',
      subtitle: '1979 - 1981',
      pages: [
        { blocks: [
          { t: 'p', x: 'Revolutionary courts were established within weeks. They sat quickly, often at night, frequently without defence counsel, and the sentences were carried out at once. Senior officers of the army and the security service went first, then ministers and officials of the former government.' },
          { t: 'ptext', x: 'Among them was {{hoveyda|Amir-Abbas Hoveyda}}, prime minister for twelve years and the longest-serving in Iranian history. He had been arrested in late 1978 by the Shah\\u2019s own government, as a concession to the protests, and was still in custody when the state that arrested him ceased to exist. He was tried in April 1979 and executed the same day. He had not attempted to flee when he could have.' },
          { t: 'p', x: 'The armed forces were purged heavily. Officers trained in the United States and Britain were regarded as loyal to the old order by definition. Thousands were dismissed, imprisoned or executed, and the air force in particular lost much of its senior command. This had consequences that arrived faster than anyone expected.' },
          { t: 'div' },
          { t: 'h', x: 'The embassy' },
          { t: 'p', x: 'In November 1979 students occupied the American embassy in Tehran and held fifty-two people for four hundred and forty-four days. Whatever else it did, it settled Iran\\u2019s relationship with the United States for the next four decades and gave the new government a permanent external adversary, which is useful to any government consolidating power.' },
          { t: 'h', x: 'The constitution' },
          { t: 'p', x: 'The constitution ratified that year created an elected president and parliament, and above them the velayat-e faqih: a Supreme Leader, a cleric, with final authority over the armed forces, the judiciary, the media and the vetting of candidates. Iran would have elections, and it would also have someone standing above their results. Khomeini took the post and held it until his death.' },
          { t: 'p', x: 'By 1981 the other partners in the revolution had been pushed out, arrested, or had fled. The first president was impeached and escaped the country in disguise. The left was suppressed. The coalition of 1979 had narrowed to one faction of itself.' },
        ] },
      ],
    },
    {
      key: 'mi3',
      title: 'The War',
      subtitle: '1980 - 1988',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 22 September 1980 Iraq invaded. Saddam Hussein had several reasons, and they reinforced one another.' },
          { t: 'boxes', items: [
            { k: 'The waterway', v: 'The Shatt al-Arab, the Arvand Rud in Persian, is the outlet both countries depend on. A 1975 agreement had divided it down the middle. Saddam wanted the whole of it.' },
            { k: 'Fear', v: 'Iraq had a Shia majority ruled by a secular Sunni party. A revolution next door that spoke of exporting itself was an existential worry.' },
            { k: 'Opportunity', v: 'Iran had just purged its officer corps, was isolated internationally, and was in open political turmoil. It looked like the easiest moment there would ever be.' },
          ] },
          { t: 'p', x: 'The calculation was wrong. Instead of fracturing, Iran closed ranks. Khorramshahr fell after brutal street fighting and was retaken in 1982. By that summer Iraqi forces were largely back across the border, and Saddam offered a ceasefire.' },
          { t: 'p', x: 'Iran refused it, and chose to carry the war into Iraq. That decision extended the war by six years and accounts for the majority of its dead.' },
          { t: 'div' },
          { t: 'h', x: 'How it was fought' },
          { t: 'p', x: 'Iran had numbers and little equipment; Iraq had equipment and fewer men. Iran fought accordingly, with mass infantry assaults on fortified positions. The Basij, a volunteer militia, supplied much of that infantry, and it included boys of fourteen and fifteen. Some were given plastic keys to wear, said to open the gates of paradise.' },
          { t: 'p', x: 'Iraq used chemical weapons repeatedly, against Iranian soldiers at the front and against civilians. In March 1988 the Kurdish town of Halabja was attacked with nerve and mustard agents and several thousand of its people died in a day. Tens of thousands of Iranian veterans still live with the effects of gas exposure.' },
          { t: 'p', x: 'Iraq was supplied through the war by the Soviet Union, France, and a number of other states, and received intelligence assistance from the United States. Iran, under embargo, bought what it could wherever it could, including, in one arrangement that became a scandal in Washington, from the United States itself.' },
          { t: 'p', x: 'The war reached the Gulf. Both sides attacked shipping. In July 1988 an American warship shot down an Iranian civilian airliner over the Persian Gulf, killing all two hundred and ninety people aboard. The United States said it had been mistaken for a fighter.' },
          { t: 'numstat', items: [
            { n: '8', k: 'years of war' },
            { n: '~1m', k: 'dead, both countries' },
            { n: '0', k: 'borders changed' },
          ] },
          { t: 'p', x: 'In July 1988 Iran accepted United Nations Resolution 598. Khomeini said that doing so was more deadly to him than drinking poison. The border ended where it had begun.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The pilots' },
          { t: 'p', x: 'When the war began, Iran\\u2019s air force was the one part of its military that could not be improvised. The aircraft were American, the training was American, and the men who could fly them had all been trained under the Shah. Many of them were, at that moment, in prison.' },
          { t: 'p', x: 'They were released and sent to fly. Iranian pilots flew combat missions in the first weeks of the war that are still studied, including a large strike on Iraqi airbases the day after the invasion. Their skill is not in dispute; it kept Iran in the war during the months when little else could.' },
          { t: 'markline', x: 'They were let out of prison to fly, and a number of them were returned to it afterwards.' },
          { t: 'p', x: 'Some were arrested again during and after the war, on charges of coup plotting or of loyalty to the former government. Some were executed. Others were dismissed and never flew again. The reasoning was that their training and their oath had belonged to another Iran, and that this could not be relied upon whatever they had just done.' },
          { t: 'div' },
          { t: 'h', x: 'The summer of 1988' },
          { t: 'p', x: 'In the months after the ceasefire, prisoners already serving sentences for political offences were brought before panels and asked a short series of questions about their beliefs and loyalties. Those whose answers were judged wrong were executed. It was carried out over a few months, in prisons across the country, and the bodies were buried in unmarked graves.' },
          { t: 'p', x: 'The number has never been established. Human rights organisations have documented thousands of names; some estimates run considerably higher. No official account has ever been published, and no one has been tried for it.' },
        ] },
      ],
    },
    {
      key: 'mi4',
      title: 'The Leaders Who Followed',
      subtitle: '1989 - today',
      pages: [
        { blocks: [
          { t: 'p', x: 'Khomeini died in June 1989. Ali Khamenei, then president, was elevated to Supreme Leader, a post he still holds. The presidency, meanwhile, changed hands repeatedly, and the swings between its holders are the clearest picture of how divided the country has been about its own direction.' },
          { t: 'era', items: [
            { y: '1989 - 1997', t: 'Akbar Hashemi Rafsanjani', x: 'Reconstruction after the war. Pragmatic, business-minded, and willing to reopen some doors to the world. The economy grew; so did inequality and the wealth of those close to power.' },
            { y: '1997 - 2005', t: 'Mohammad Khatami', x: 'Won nearly seventy per cent of the vote on a platform of civil society and dialogue among civilisations. Newspapers opened, students organised, and much of it was rolled back by institutions the president does not control.' },
            { y: '2005 - 2013', t: 'Mahmoud Ahmadinejad', x: 'A populist from outside the clerical establishment who spoke to those the boom had left behind. Cash handouts, confrontation abroad, an accelerating nuclear programme, and the sanctions that followed it.' },
            { y: '2013 - 2021', t: 'Hassan Rouhani', x: 'Elected to end the isolation. Negotiated the 2015 nuclear agreement, which lifted sanctions and briefly steadied the currency. The United States withdrew from it in 2018 and the recovery reversed.' },
            { y: '2021 - 2024', t: 'Ebrahim Raisi', x: 'A hardline judiciary figure elected on the lowest turnout in the republic\\u2019s history. Died in a helicopter crash in May 2024.' },
            { y: '2024 -', t: 'Masoud Pezeshkian', x: 'A reformist surgeon, elected on a promise of easing restrictions and reopening talks. Took office into the hardest circumstances any Iranian president has faced.' },
          ] },
          { t: 'p', x: 'Across all of it the Supreme Leader and the institutions around him remained constant. Presidents in Iran arrive with mandates and discover the limits of the office; this has happened to reformists and hardliners alike.' },
        ] },
      ],
    },
    {
      key: 'mi5',
      title: 'What Happened to the Money',
      subtitle: '1979 - 2026',
      pages: [
        { blocks: [
          { t: 'p', x: 'No single fact about Iran since the revolution is easier to state or harder to live with than this one. In 1979 a United States dollar bought about seventy rials. In January 2026 it bought around one and a half million.' },
          { t: 'chart' },
          { t: 'p', x: 'The line does not fall evenly. It steps. Each step corresponds to something: the war, the sanctions of the 2000s, the withdrawal from the nuclear agreement in 2018, the reimposition of United Nations sanctions in September 2025, and the collapse at the end of that year.' },
          { t: 'p', x: 'The causes are argued over and they are not all external. Sanctions cut oil revenue and cut Iran out of the international banking system. But the money supply also grew far faster than the economy did, subsidised exchange rates created a system where access to dollars depended on political standing rather than price, and large parts of the economy came under the control of institutions that answer to no shareholder.' },
          { t: 'basket' },
          { t: 'p', x: 'What that means in a household is simple enough. Salaries are paid in rials and prices track the dollar, so a wage buys less each month than it did the month before. Savings held in rials evaporate, which is why Iranians buy gold, dollars, property, and lately cryptocurrency: not as investment but as a way of not losing what they already have. Iran has an educated, capable population with an unusually high proportion of engineers and graduates, and a great many of them have left.' },
          { t: 'pull', x: 'A country can be rich in oil, water, land and people, and still have a currency nobody wants to hold.' },
        ] },
      ],
    },
    {
      key: 'mi6',
      title: 'The Streets',
      subtitle: '2009 - 2022',
      pages: [
        { blocks: [
          { t: 'p', x: 'Iranians have gone into the streets repeatedly, and the pattern has been consistent enough to describe: a trigger, rapid spread, a crackdown, and a period of quiet that is not the same as agreement.' },
          { t: 'timeline', items: [
            { y: '2009', t: 'The Green Movement', x: 'Millions protested the announced result of the presidential election, asking a single question: where is my vote. It was the largest demonstration since 1979. The leaders were placed under house arrest, where two of them remained for more than a decade. A young woman named Neda Agha-Soltan was shot in a Tehran street and filmed as she died, and the footage travelled worldwide.' },
            { y: '2017 - 18', t: 'The price protests', x: 'Began over the cost of food and spread to around a hundred towns and cities, many of them small and previously quiet. The complaints were economic before they were anything else.' },
            { y: '2019', t: 'November', x: 'A sudden rise in the petrol price brought people out across the country. The government shut down the internet nationally for about a week, and the crackdown during that blackout was severe. Casualty figures were disputed for years afterwards.' },
            { y: '2022', t: 'Woman, Life, Freedom', x: 'Mahsa Jina Amini, a twenty-two year old Kurdish woman, died in custody after being detained over her hijab. Protests ran for months, led substantially by young women and schoolgirls, and the slogan zan, zendegi, azadi was heard everywhere. Hundreds were killed and thousands arrested. Several protesters were later executed.' },
          ] },
          { t: 'p', x: 'Each of these was suppressed. None of them resolved anything, and each left a larger number of people who had lost someone or been imprisoned themselves.' },
        ] },
      ],
    },
    {
      key: 'mi7',
      title: 'The Wars Return',
      subtitle: '2025 - 2026',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 13 June 2025 Israel struck Iran directly: nuclear facilities, military sites, and the homes of senior commanders and nuclear scientists, many of whom were killed in the first hours. Iran answered with several hundred ballistic missiles and around a thousand drones over the following days. On 22 June the United States bombed three Iranian nuclear sites. A ceasefire took effect on 24 June.' },
          { t: 'p', x: 'It lasted twelve days. In Iran roughly a thousand people were killed, including several hundred civilians; in Israel twenty-eight civilians and one soldier died. The war made public something that had previously been argued about: Iran\\u2019s air defences could not keep Israeli aircraft out, and the allies it had spent decades cultivating offered very little when it mattered.' },
          { t: 'p', x: 'In September 2025 United Nations sanctions were reimposed after the Security Council failed to extend the relief agreed a decade earlier. The arms embargo, the missile restrictions and the asset freezes came back. The rial fell further.' },
          { t: 'p', x: 'In late February 2026, after negotiations between Iran and the United States broke down, Israel and the United States began a further and much larger campaign of strikes. It ran into the spring.' },
        ] },
      ],
    },
    {
      key: 'mi8',
      title: 'The Winter of 2025',
      subtitle: 'December 2025 - January 2026',
      pages: [
        { blocks: [
          { t: 'p', x: 'On 28 December 2025 the rial crashed again, and this time people went out immediately. It began over prices, in Tehran and then everywhere, and within days it was no longer about prices.' },
          { t: 'p', x: 'On 8 January 2026 the government shut off the internet across the country. It stayed off longer than any national shutdown recorded anywhere in the world. Iranians could not reach each other, hospitals could not be counted, journalists could not file, and families abroad had no way of knowing whether anyone was alive. The crackdown happened inside that darkness, which was the point of it.' },
          { t: 'p', x: 'Thousands of people were killed over roughly two days in early January, and thousands more across the weeks around them. No settled figure exists. The government has given one number, human rights organisations have documented names running to several times that, and the United Nations and others have published ranges going considerably higher again. Bodies are still being identified. Tens of thousands were arrested. Among the confirmed dead are more than a hundred children.' },
          { t: 'markline', x: 'The number is not known because the state made it impossible to count, and it is still not known now.' },
          { t: 'p', x: 'By the middle of January the protests had been suppressed. Death sentences were handed down to hundreds of people, and their execution was reported to have been suspended under external pressure. Whether they will be carried out is not clear.' },
        ] },
      ],
    },
    {
      key: 'mi9',
      title: 'Where It Stands',
      subtitle: 'Today',
      pages: [
        { blocks: [
          { t: 'p', x: 'Life continues, and it is worth saying so plainly, because coverage of Iran tends to consist only of its worst days. People are working, marrying, studying, making films and music and arguing about them. Nowruz is celebrated. The mountains above Tehran fill on Fridays. The country is not a ruin and its people are not waiting to be pitied.' },
          { t: 'p', x: 'But it is heavy at the moment, and most people there would say so. Inflation has outrun wages for years. Electricity and gas fail in the summer and the winter, in a country holding some of the largest energy reserves on earth. Water is short, aquifers are falling, and Lake Urmia has largely gone. Almost every family has someone abroad.' },
          { t: 'p', x: 'And the country is divided in a way that runs through households rather than between them. There are people who believe the system can still be reformed from within and people who are certain it cannot. There are people who want change at any cost and people who saw what happened in Iraq and Syria and are frightened of what change might mean. There are people who took part in January and people who lost someone in January and people who did neither and do not talk about it. These arguments happen at the same dinner table.' },
          { t: 'pull', x: 'Iran has outlasted every empire that governed it. It is a long country, and this is not the longest night it has had.' },
          { t: 'p', x: 'What comes next is not written. What is worth holding onto is that the things which make Iran itself, the language, the poetry, the food, the new year that begins with the spring, have survived conquest, occupation, revolution and war already, carried by ordinary people who kept them going without being asked to. That is the part of this history with the longest record.' },
        ] },
      ],
    },
  ],
};

'''

anchor = "const timurid: Topic = {"
if anchor not in s:
    print("ABORT: insertion point not found"); raise SystemExit

s = s.replace(anchor, TOPIC.replace("\\\\u", "\\u") + anchor, 1)

# add it to whatever array collects the topics
import re
m = re.search(r"export const (TOPICS|HISTORY_TOPICS|EDU_TOPICS)[^=]*= \[([^\]]*)\]", s)
if m:
    inner = m.group(2).rstrip().rstrip(",")
    s = s[:m.start(2)] + inner + ", modernIran" + s[m.end(2):]
    print("added to", m.group(1))
else:
    print("NOTE: could not find the topics array - add modernIran to it manually")

open(p, "w").write(s)
print("chapter written:", "key: 'modern-iran'" in s)
