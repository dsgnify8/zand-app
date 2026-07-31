# -*- coding: utf-8 -*-
# Replaces chapter mi2 of the modern-iran topic.

p = "constants/education.ts"
s = open(p).read()

start = s.find("      key: 'mi2',")
if start == -1:
    print("ABORT: mi2 not found"); raise SystemExit
end = s.find("      key: 'mi3',")
if end == -1:
    print("ABORT: mi3 not found"); raise SystemExit
open_brace = s.rfind("    {", 0, start)
close_before_next = s.rfind("    {", 0, end)

NEW = '''    {
      key: 'mi2',
      title: 'The New Order',
      subtitle: '1979 - 1981',
      pages: [
        { blocks: [
          { t: 'p', x: 'Revolutionary courts were established within weeks. They sat quickly, often at night, frequently without defence counsel, and sentences were carried out at once.' },
          { t: 'p', x: 'The armed forces went first. Iran\\u2019s most senior officers, generals who had spent their entire working lives in the service of the country, were brought before the courts one after another and shot. Many of them had trained abroad, commanded the country\\u2019s defence for decades, and had no political role at all. The charge, broadly, was that they had served.' },
          { t: 'p', x: 'The purge widened from there. Ministers, provincial governors, senior police, court officials, and men who had held office years earlier and retired quietly. In practice almost anything that still carried the mark of the old order was a target, and the reach of that went further than people expect: the Shah\\u2019s own horses were killed, for no reason beyond whose horses they had been.' },
          { t: 'markline', x: 'It was not only people who were being removed. It was every trace.' },
          { t: 'p', x: 'The effect on the military was severe and immediate. Thousands of officers were dismissed, imprisoned or executed, and the air force in particular lost most of its senior command in the space of a year. The consequences of that arrived faster than anyone had planned for, and they are the subject of the chapter after this one.' },
          { t: 'div' },
        ] },
        { blocks: [
          { t: 'h', x: 'Hoveyda' },
          { t: 'img', key: 'hoveyda-portrait' },
          { t: 'ptext', x: '{{hoveyda|Amir-Abbas Hoveyda}} was prime minister of Iran for twelve years, from 1965 to 1977, the longest tenure in the country\\u2019s history. He was the Shah\\u2019s right hand through the years when Iran changed fastest, and a great deal of what was built in that period passed across his desk.' },
          { t: 'p', x: 'The expansion of the universities, the growth of the health service into the provinces, the industrial programme, the arrival of a modern civil service: he ran the machinery of all of it. He was educated in Beirut, Brussels and Paris, spoke several languages, was known for a pipe and an orchid in his lapel, and was a familiar and largely liked figure in Iranian public life for over a decade.' },
          { t: 'p', x: 'He was held by the new government after the revolution. He was given no lawyer, and so he spoke for himself. He was tried and executed on the same day, 7 April 1979.' },
          { t: 'p', x: 'He had had opportunities to leave the country and had not taken them.' },
          { t: 'quotebig', x: 'He answered for twelve years of government in a single afternoon, alone, and without counsel.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Four hundred and forty-four days' },
          { t: 'img', key: 'embassy' },
          { t: 'p', x: 'On 4 November 1979 several hundred student militants climbed the walls of the United States embassy in Tehran. They had planned a symbolic sit-in lasting a few days. It lasted fourteen months and became one of the defining international crises of the century.' },
          { t: 'p', x: 'The immediate cause was the Shah. He had been admitted to the United States in October for cancer treatment, and to many in Tehran that looked like the beginning of the same story as 1953, when American and British intelligence had helped return him to the throne. The fear that he would be restored a second time was the spark.' },
          { t: 'timeline', items: [
            { y: '4 Nov 1979', t: 'The embassy is taken', x: 'Students scale the walls and occupy the compound. Sixty-six Americans are held. Thirteen women and African Americans are released within weeks, and one more later on medical grounds, leaving fifty-two.' },
            { y: 'Nov 1979', t: 'Six get out', x: 'Six embassy staff escape during the takeover and shelter in the Canadian ambassador\\u2019s residence. They are eventually brought out of Iran on Canadian passports, in an operation run with the CIA that stayed classified for eighteen years.' },
            { y: '24 Apr 1980', t: 'Operation Eagle Claw', x: 'An American rescue attempt using helicopters and transport aircraft is launched. It fails in the Iranian desert at a staging point before reaching Tehran. A helicopter and a transport plane collide, and eight American servicemen are killed. The mission is aborted.' },
            { y: 'Sept 1980', t: 'The war begins', x: 'Iraq invades Iran, and the hostages become a secondary concern for a government now fighting for survival.' },
            { y: '20 Jan 1981', t: 'Released', x: 'After months of negotiation through Algerian intermediaries, the fifty-two are freed. They are released minutes after Ronald Reagan is sworn in as president, having been held for four hundred and forty-four days.' },
          ] },
          { t: 'p', x: 'The timing of the release, to the minute, was not an accident. It was the last word in a long argument with an administration that had already lost an election over it.' },
          { t: 'p', x: 'Whatever else the crisis did, it set the relationship between Iran and the United States for the next four decades, and it gave the new government a permanent external adversary, which is a useful thing for any government still consolidating power at home.' },
          { t: 'div' },
          { t: 'h', x: 'The constitution' },
          { t: 'p', x: 'The constitution ratified in 1979 created an elected president and an elected parliament, and above them the velayat-e faqih: a Supreme Leader, a cleric, holding final authority over the armed forces, the judiciary, the broadcasters, and the vetting of who may stand for election. Iran would have votes, and it would also have someone standing above their results. Khomeini took the post and held it until his death.' },
          { t: 'p', x: 'By 1981 the other partners in the revolution were gone. The first president was impeached and left the country in disguise. The left was suppressed, its organisations broken up and its members imprisoned. The coalition of 1979 had narrowed to a single faction of itself, and that faction now held everything.' },
        ] },
      ],
    },
'''

s = s[:open_brace] + NEW + s[close_before_next:]
open(p, "w").write(s)
print("chapter two rewritten")
