// Language: the story of Persian. Its own world, dark but lighter in tone than history.
// Continuous scroll with a nav strip, in the manner of Geography.

export const lang = {
  bg: '#1E1B26',        // deep indigo, cooler than the history reader
  surface: '#2A2634',
  raised: '#332E3F',
  text: '#EFEAF2',
  textDim: '#A79FB4',
  hair: '#3E3849',
  gold: '#C9A86A',
  accent: '#8B7BB8',    // soft violet
  jade: '#7FA893',
};

export type LangBlock =
  | { t: 'p'; x: string }
  | { t: 'h'; x: string }
  | { t: 'lead'; x: string }
  | { t: 'mark'; x: string }
  | { t: 'cognates'; items: { fa: string; tr: string; en: string }[] }
  | { t: 'tree' }
  | { t: 'era'; items: { age: string; script: string; note: string }[] }
  | { t: 'loans'; items: { en: string; from: string; note: string }[] }
  | { t: 'split'; left: { title: string; x: string }; right: { title: string; x: string } }
  | { t: 'learncta' }
  | { t: 'close'; glyph: string; x: string };

export type LangPage = { blocks: LangBlock[] };
export type LangChapter = { key: string; title: string; nav: string; subtitle?: string; pages: LangPage[] };

export const LANG_CHAPTERS: LangChapter[] = [
  {
    key: 'l1',
    title: 'The Family',
    nav: 'The Root',
    subtitle: 'WHERE PERSIAN COMES FROM',
    pages: [
      { blocks: [
        { t: 'lead', x: 'Persian was never the language of the strongest army. It simply kept becoming the language of whoever won.' },
        { t: 'p', x: 'Say pedar out loud, then say father. Persian is not a distant cousin of English. It is family. Both descend from a single language spoken somewhere on the steppe thousands of years ago, by people who left no writing and whose name we do not know. Their children walked west into Europe and east into Iran and India, and their words walked with them.' },
        { t: 'p', x: 'Nobody borrowed these. They were inherited, from the same mouth, before Rome, before Athens, before Persepolis.' },
        { t: 'cognates', items: [
          { fa: 'پدر', tr: 'pedar', en: 'father' },
          { fa: 'مادر', tr: 'madar', en: 'mother' },
          { fa: 'برادر', tr: 'baradar', en: 'brother' },
          { fa: 'دختر', tr: 'dokhtar', en: 'daughter' },
          { fa: 'نام', tr: 'nam', en: 'name' },
          { fa: 'دو', tr: 'do', en: 'two' },
          { fa: 'سه', tr: 'se', en: 'three' },
          { fa: 'ستاره', tr: 'setare', en: 'star' },
          { fa: 'ابرو', tr: 'abru', en: 'brow' },
          { fa: 'لب', tr: 'lab', en: 'lip' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'One tongue, many children' },
        { t: 'p', x: 'The family is called Indo European, and it is the largest on earth. English, German, Spanish, Greek, Russian, Hindi, and Persian are all leaves on one tree. When an Iranian says madar and an Englishman says mother, they are both saying a word that was already old when the pyramids were young.' },
        { t: 'tree' },
        { t: 'mark', x: 'Persian and English are cousins who last shared a house five thousand years ago.' },
      ] },
      { blocks: [
        { t: 'h', x: 'And the name of the land' },
        { t: 'p', x: 'The word Iran carries this. It comes from Aryanam, meaning of the Aryans, which was simply what these people called themselves: the noble ones. The same root sits inside the name Eire, the old name for Ireland, at the other end of the same migration. The country never changed its name. Iran has been calling itself Iran for as long as it has been calling itself anything.' },
        { t: 'aside', x: 'Persia was the outside name, from Pars, one province. Iranians have always said Iran.' },
      ] },
    ],
  },
  {
    key: 'l2',
    title: 'Three Thousand Years',
    nav: 'The Journey',
    subtitle: 'THE THREE AGES OF PERSIAN',
    pages: [
      { blocks: [
        { t: 'p', x: 'Very few languages on earth can be read across three thousand years and still be recognisably themselves. Persian can. It has changed its alphabet twice and its grammar has simplified beautifully, but the thread never broke.' },
        { t: 'era', items: [
          { age: 'Old Persian', script: 'Cuneiform', note: 'The language of Darius, carved into the cliff at Bisotun. Wedge shaped marks pressed into stone.' },
          { age: 'Middle Persian', script: 'Pahlavi', note: 'The language of the Sasanians, of the fire temples and the court, written in a script descended from Aramaic.' },
          { age: 'New Persian', script: 'Perso Arabic', note: 'The language of Ferdowsi, Hafez, and of Iran today. A new alphabet, the same tongue underneath.' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'Simpler, not weaker' },
        { t: 'p', x: 'Old Persian was heavy with grammar, cases and genders and endings, in the way Latin was. Modern Persian shed almost all of it. There is no gender at all. No masculine table, no feminine chair. The same word, u, means he and she, and Persian has never needed to know which.' },
        { t: 'split', left: { title: 'What it dropped', x: 'Cases, grammatical gender, most irregular endings. The scaffolding came down.' }, right: { title: 'What it kept', x: 'Its word order, its verbs, its bones, and almost every word for the things that matter most.' } },
        { t: 'p', x: 'This is why Persian is far easier for an English speaker than its script suggests. The alphabet looks foreign. The grammar underneath is a cousin, and it is gentler than French.' },
      ] },
    ],
  },
  {
    key: 'l3',
    title: 'What Arabic Took',
    nav: 'The Conquest',
    subtitle: 'AND WHAT IT COULD NOT',
    pages: [
      { blocks: [
        { t: 'p', x: 'After the Arab conquest, Arabic became the language of religion, of scholarship, and of power. For two centuries Persian went quiet in the places that mattered. When it came back, it came back wearing Arabic letters and carrying thousands of Arabic words.' },
        { t: 'p', x: 'People often look at that and conclude that Persian became a kind of Arabic. It is one of the most common misreadings there is, and it is wrong in a way worth understanding precisely.' },
        { t: 'split', left: { title: 'It took the script', x: 'The alphabet is Arabic, with four letters added for sounds Arabic does not have: p, ch, zh, g. پ چ ژ گ' }, right: { title: 'It took vocabulary', x: 'Thousands of words, especially for law, faith, and learning. English did the same with French after 1066.' } },
      ] },
      { blocks: [
        { t: 'h', x: 'What it could not touch' },
        { t: 'p', x: 'The grammar. Arabic is Semitic, built on three letter roots that bend into patterns. Persian is Indo European, and its verbs, its word order, its whole architecture stayed exactly where they were. A Persian sentence is not an Arabic sentence with different words. It is a different machine.' },
        { t: 'mark', x: 'Persian borrowed Arabic words the way English borrowed French. The bones never changed.' },
        { t: 'p', x: 'And the words closest to the heart stayed Persian. Mother, father, water, bread, fire, sky, love, and every number from one to ten. The conqueror language reached the courts and the books. It never reached the kitchen or the lullaby.' },
        { t: 'cognates', items: [
          { fa: 'آب', tr: 'ab', en: 'water' },
          { fa: 'نان', tr: 'nan', en: 'bread' },
          { fa: 'آتش', tr: 'atash', en: 'fire' },
          { fa: 'آسمان', tr: 'aseman', en: 'sky' },
          { fa: 'دل', tr: 'del', en: 'heart' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'And then a poet drew the line' },
        { t: 'p', x: 'Ferdowsi wrote the Shahnameh in a Persian deliberately stripped of Arabic wherever he could manage it, to prove the language needed to borrow nothing to carry a nation. Sixty thousand couplets, and the point was made permanently. That story has its own telling in Literature.' },
      ] },
    ],
  },
  {
    key: 'l4',
    title: 'Words You Already Speak',
    nav: 'In English',
    subtitle: 'PERSIAN IN YOUR MOUTH',
    pages: [
      { blocks: [
        { t: 'p', x: 'You have been speaking Persian your whole life without noticing. These crossed into English through trade, through conquest, through the long road between Iran and everywhere else.' },
        { t: 'loans', items: [
          { en: 'paradise', from: 'pairidaeza', note: 'A walled garden. The Persian word for an enclosed garden became the word for heaven in half the languages of the world.' },
          { en: 'bazaar', from: 'bazar', note: 'The market. It travelled with the goods.' },
          { en: 'khaki', from: 'khak', note: 'Dust, earth. The colour is named for the ground.' },
          { en: 'pyjama', from: 'pay jameh', note: 'Leg garment. It reached England through India.' },
          { en: 'candy', from: 'qand', note: 'Crystallised sugar.' },
          { en: 'lemon', from: 'limu', note: 'And lime with it.' },
          { en: 'orange', from: 'narang', note: 'The n was lost in the crossing. A narange became an orange.' },
          { en: 'spinach', from: 'esfenaj', note: 'The plant travelled west from Iran.' },
          { en: 'jasmine', from: 'yasamin', note: 'The flower, and the name.' },
          { en: 'caravan', from: 'karvan', note: 'And caravanserai with it, the inn on the road.' },
          { en: 'kiosk', from: 'kushk', note: 'A garden pavilion. It became a newsstand.' },
          { en: 'magic', from: 'magush', note: 'From the Magi, the Zoroastrian priests of Persia.' },
        ] },
      ] },
      { blocks: [
        { t: 'mark', x: 'When you say paradise, you are describing a Persian garden with a wall around it.' },
        { t: 'p', x: 'That one is worth sitting with. Pairidaeza meant simply a walled enclosure, the sort of green space a Persian king built to hold the world in order: water, shade, symmetry, and birds. The Greeks borrowed the word, then scripture borrowed it, and an ordinary Persian garden became the name for heaven itself across the entire western world.' },
        { t: 'p', x: 'The garden came too. The four quartered garden split by water channels, the chahar bagh, is the Persian design that produced the Taj Mahal gardens and every formal garden that followed them east.' },
      ] },
    ],
  },
  {
    key: 'l5',
    title: 'Alive and Spoken',
    nav: 'Today',
    subtitle: 'THE LANGUAGE NOW',
    pages: [
      { blocks: [
        { t: 'p', x: 'Persian is spoken by well over a hundred million people, and not only in Iran. It is Dari in Afghanistan and Tajik in Tajikistan, three names for what is substantially one language, and a speaker of each can follow the others.' },
        { t: 'p', x: 'It runs right to left, joins its letters, and drops most short vowels from the writing, which is why the script looks harder than the language is. A reader supplies the vowels from knowing the word, exactly as you read English without noticing that ough says six different things.' },
        { t: 'split', left: { title: 'The hard part', x: 'A new alphabet, right to left, letters that change shape by position.' }, right: { title: 'The easy part', x: 'No gender, no cases, regular verbs, and hundreds of words you already half know.' } },
      ] },
      { blocks: [
        { t: 'h', x: 'Why it held' },
        { t: 'p', x: 'Languages die when their speakers stop needing them. Persian was conquered by Arabs, ruled by Turks, and burned through by Mongols, and it outlived every one of them, because the conquerors kept adopting it. The Seljuks ruled in Persian. The Mongol Ilkhans ended up patronising Persian. It was the language of courts from Istanbul to Delhi for centuries.' },
        { t: 'mark', x: 'Every conqueror arrived to rule it, and stayed to speak it.' },
        { t: 'close', glyph: 'فارسی', x: 'A tongue that came off the steppe with words for mother and fire and star, that was carved in cuneiform and then in stone and then in ink, that lost its empire and kept its grammar, and that is still, this morning, being spoken to a child somewhere who will carry it another lifetime forward.' },
        { t: 'learncta' },
      ] },
    ],
  },
];
