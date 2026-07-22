// Education content system. Topic -> Chapters -> Pages -> Blocks.

export const dark = {
  bg: '#17110F',
  surface: '#241C19',
  surfaceAlt: '#2E2420',
  text: '#F2EAE4',
  textDim: '#A99C95',
  hair: '#3A2F2A',
  accent: '#C85A4A',
  gold: '#C6A15B',
};

export type Block =
  | { t: 'h'; x: string }
  | { t: 'p'; x: string }
  | { t: 'ptext'; x: string }
  | { t: 'pull'; x: string }
  | { t: 'q'; x: string; by?: string }
  | { t: 'call'; title: string; x: string }
  | { t: 'fact'; label: string; value: string }
  | { t: 'stat'; items: { value: string; label: string }[] }
  | { t: 'timeline'; items: { year: string; label: string }[] }
  | { t: 'img'; key: string; cap?: string }
  | { t: 'imgwide'; key: string; cap?: string }
  | { t: 'imgsm'; key: string; cap?: string }
  | { t: 'imgrow'; keys: string[]; cap?: string }
  | { t: 'collage'; keys: string[]; cap?: string }
  | { t: 'circles'; items: { value: string; label: string }[] }
  | { t: 'boxes'; items: { title: string; x: string }[] }
  | { t: 'steps'; items: { title: string; x: string }[] }
  | { t: 'keyvalue'; items: { k: string; v: string }[] }
  | { t: 'quotebig'; x: string; by?: string }
  | { t: 'era'; value: string; label: string }
  | { t: 'numstat'; items: { n: string; label: string }[] }
  | { t: 'ribbon'; items: { year: string; label: string }[] }
  | { t: 'splitimg'; key: string; title: string; x: string }
  | { t: 'markline'; x: string }
  | { t: 'duo'; left: { title: string; x: string }; right: { title: string; x: string } }
  | { t: 'video'; key: string; cap?: string }
  | { t: 'map'; cap?: string }
  | { t: 'div' };

export type Page = { blocks: Block[] };
export type Chapter = { key: string; title: string; subtitle?: string; pages: Page[] };

export type Topic = {
  key: string;
  category: string;
  name: string;
  persian?: string;
  years: string;
  essence: string;
  cover?: string;
  closing?: string;
  chapters: Chapter[];
  sources: string[];
  status: 'ready' | 'soon';
};

const mrp: Topic = {
  key: 'mohammad-reza-shah',
  category: 'history',
  name: 'Mohammad Reza Shah Pahlavi',
  persian: 'محمدرضا پهلوی',
  years: '1919 – 1980',
  essence: "The last Shah of Iran. A modernizer whose ambitions, reforms, and private burdens shaped the nation he ruled for nearly four decades.",
  cover: 'mrp-cover',
  closing: 'mrp-cover',
  status: 'ready',
  sources: [
    'Mission for My Country (1961)',
    'The White Revolution (1966)',
    'The Philosophy Behind the Revolution (1971)',
    'On Oil (1971)',
    'Toward the Great Civilization (1977)',
    'Answer to History (1980)',
    'Abbas Milani, The Shah (2011)',
  ],
  chapters: [
    {
      key: 'ch1',
      title: 'A Prince and a New Dynasty',
      subtitle: '1919 – 1925',
      pages: [
        { blocks: [
          { t: 'fact', label: 'Born', value: '26 October 1919, Tehran' },
          { t: 'p', x: "Mohammad Reza was born in Tehran on an autumn morning in 1919, arriving only minutes before his twin sister, Ashraf. Their closeness would last a lifetime, and in the years to come she would be one of the fiercest defenders of his throne." },
          { t: 'p', x: "The Iran of his birth was weak and often humiliated. Its affairs were shaped in London and in Moscow as much as in Tehran, its treasury was empty, and its roads and schools were few. To grow up in that country was to feel, keenly, how far the nation had fallen from its ancient greatness." },
          { t: 'p', x: "In his memoirs the Shah returned to this wound again and again. The wish to restore Iran to dignity, to make it modern and respected in the world, was for him never merely a policy. It was a feeling he traced all the way back to childhood." },
        ] },
        { blocks: [
          { t: 'ptext', x: "His father, {{reza-khan|Reza Khan}}, had risen from the mountain village of Alasht to become an officer in the Persian Cossack Brigade. Tall, forceful, and self taught, he was a soldier of real presence and iron will, and he believed that only a strong hand could lift Iran out of its weakness." },
          { t: 'p', x: "In February 1921 Reza Khan marched on the capital and took power in a nearly bloodless coup. For a few years he governed from behind the scenes as minister of war and then prime minister, building the army and the machinery of a modern state. Then, in 1925, he set aside the last Qajar ruler and was crowned Reza Shah Pahlavi, founding a new dynasty." },
          { t: 'timeline', items: [
            { year: '1878', label: 'Reza Khan born' },
            { year: '1919', label: 'Mohammad Reza born' },
            { year: '1921', label: 'The coup' },
            { year: '1925', label: 'Pahlavi dynasty founded' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A childhood set apart' },
          { t: 'p', x: "At six years old, Mohammad Reza became crown prince of a kingdom his father meant to remake from the ground up. He was raised apart from other children, handed to tutors and officers, and taught from the start that a throne and a mission were waiting for him. His father was determined that his heir would not be a soft, pampered prince of the old Qajar kind." },
          { t: 'p', x: "Between a stern, towering father and a devoted mother, Tadj ol Molouk, the boy grew up carrying expectations far heavier than his years. He adored his father and feared him in equal measure, and much of his life would be spent trying to prove worthy of him." },
          { t: 'imgsm', key: 'mrp-father', cap: 'The young prince with his father, Reza Shah, the founder of the dynasty.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A brush with death' },
          { t: 'p', x: "As a small boy he fell gravely ill with typhoid fever and very nearly died. In his own account he emerged from the fever changed, believing he had been visited in his delirium by a saint and spared for a reason." },
          { t: 'p', x: "That conviction, that his life had been set apart for a purpose, never left him. It gave him courage in dark moments and, his critics would later say, a certainty that could shade into stubbornness." },
          { t: 'call', title: 'A weight placed early', x: "He was raised not as a child but as a future king. It gave him a deep sense of duty, and also a lifelong, sometimes anxious wish to earn the approval of the formidable man who had made him crown prince." },
        ] },
      ],
    },
    {
      key: 'ch2',
      title: 'An Education Between Two Worlds',
      subtitle: '1925 – 1936',
      pages: [
        { blocks: [
          { t: 'p', x: "Reza Shah wanted his heir ready for a world his own generation had never seen. The boy was taken early from the women's quarters of the palace and placed under the care of tutors and officers, groomed with deliberate discipline for the throne." },
          { t: 'p', x: "In 1931, at the age of twelve, he was sent abroad to the Institut Le Rosey in Switzerland. He was the first Iranian royal ever educated in Europe. His father meant it as preparation. The prince, at first, felt it as exile from everything he knew." },
        ] },
        { blocks: [
          { t: 'img', key: 'mrp-school', cap: "The crown prince, farthest to the left, during his years at the Institut Le Rosey in Switzerland." },
          { t: 'p', x: "At Le Rosey he learned French, took to football and skiing, and absorbed the manners and ideas of Europe. For the first time he lived among boys who did not bow to him, and he had to earn his place by character rather than birth. It was a lesson in standing on his own." },
          { t: 'p', x: "He formed friendships that followed him home, among them the Swiss born Ernest Perron, who would remain close to him for years. In his memoirs he described these as the years his vision took shape." },
        ] },
        { blocks: [
          { t: 'h', x: 'A bridge between two worlds' },
          { t: 'p', x: "He came to admire the order, the science, and the industry of the West, and to ask why his own ancient nation had fallen so far behind. Yet the more European he became in his habits, the more he felt the pull of Iran, its poetry, its history, its faith in itself." },
          { t: 'p', x: "Out of that tension grew the idea that would guide his whole reign. Iran, he believed, must modernize swiftly and boldly, but in its own way, without surrendering the Persian soul that made it itself. He began to see himself as the bridge between the two." },
        ] },
        { blocks: [
          { t: 'stat', items: [
            { value: '1931', label: 'Arrived in Switzerland' },
            { value: '5 yrs', label: 'Abroad at Le Rosey' },
            { value: 'French', label: 'A second language' },
          ] },
          { t: 'p', x: "He returned to Iran in 1936 and entered the military academy in Tehran, stepping into the disciplined, uniformed world his father prized above all. He graduated as a young officer, proud of the army his father had built and eager to serve it." },
          { t: 'pull', x: "Two Irans lived in him already, the modern and the ancient, the European and the Persian." },
          { t: 'p', x: "Holding those two Irans together would become the work of his life. In these school years the tension was still a promise rather than a problem, and the young prince believed, with the confidence of the young, that he could honor both at once." },
          { t: 'imgsm', key: 'mrp-ch2-end', cap: 'The crown prince, shaped by two worlds, returns home to serve Iran.' },
        ] },
      ],
    },
    {
      key: 'ch3',
      title: 'Marriage, War, and a Crown',
      subtitle: '1939 – 1943',
      pages: [
        { blocks: [
          { t: 'p', x: "In 1939 the crown prince married Princess Fawzia of Egypt, the sister of King Farouk. The union joined two royal houses and filled the newsreels with glamour, and a daughter, Shahnaz, was born the following year." },
          { t: 'fact', label: 'First marriage', value: 'Princess Fawzia of Egypt, 1939' },
          { t: 'imgsm', key: 'mrp-fawzia', cap: "Mohammad Reza and Queen Fawzia in the early years of their marriage." },
          { t: 'p', x: "Yet the marriage had been arranged for reasons of state as much as of the heart. Fawzia, celebrated across the world for her beauty, was unhappy far from home in the cold formality of the Tehran court, and a quiet distance grew between them that the years would only widen." },
        ] },
        { blocks: [
          { t: 'h', x: 'The war reaches Iran' },
          { t: 'p', x: "Iran had declared itself neutral, but neutrality could not protect it. Reza Shah's ties to German engineers and trade, and above all the Trans Iranian Railway he had built, made the country too important to leave alone. Britain and the Soviet Union needed that railway to carry supplies to the Soviet front." },
          { t: 'p', x: "In August 1941 their armies invaded from north and south at once. The Iranian forces, the pride of Reza Shah's reign, were overwhelmed within days. For the old king it was a bitter blow, to watch the army he had built collapse before the very powers he had tried to keep at arm's length." },
        ] },
        { blocks: [
          { t: 'h', x: 'Reza Shah Pahlavi abdicates' },
          { t: 'p', x: "The occupying powers no longer wanted Reza Shah on the throne. Rather than see the dynasty destroyed, he abdicated in favor of his son and left the country. The founder of modern Iran, the strong father who had shaped the prince's entire world, was carried away into exile." },
          { t: 'p', x: "He was taken first to Mauritius, then to South Africa, and he died in Johannesburg in 1944, never seeing Iran again. For Mohammad Reza the loss was personal as much as political. He remembered his father with awe and love, and the pain of that parting stayed with him for the rest of his life." },
          { t: 'imgsm', key: 'mrp-abdicate', cap: 'Reza Shah, who abdicated in 1941 so the dynasty might endure through his son.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Mohammad Reza Pahlavi becomes king' },
          { t: 'p', x: "On 16 September 1941, at just twenty one, Mohammad Reza Pahlavi took the throne. He became king in a capital full of foreign soldiers, with real power resting, for now, in the parliament and in the Allied armies." },
          { t: 'p', x: "Before parliament he swore to uphold the constitution, and he presented himself, at first, as a modest and careful constitutional monarch, a deliberate contrast to his father's absolute rule. He would spend years quietly gathering the authority that his crown, in these early days, did not yet hold." },
          { t: 'imgsm', key: 'mrp-young-king', cap: 'The young Mohammad Reza Pahlavi, the new king of Iran.' },
          { t: 'pull', x: "He had inherited a throne, but not yet the power that came with it." },
        ] },
        { blocks: [
          { t: 'p', x: "In 1943 Tehran hosted Churchill, Roosevelt, and Stalin, who settled the course of the war in his own capital while the young Shah looked on from its edges. He met the three leaders, but the great decisions were made around him, not by him, and the humiliation lodged deep." },
          { t: 'p', x: "These lean early years taught him patience, and left him with a lasting wariness of the great powers whose armies filled his streets. He resolved that one day he would rule in fact, and not merely reign in name." },
          { t: 'timeline', items: [
            { year: '1939', label: 'Marries Fawzia' },
            { year: '1941', label: 'Allied invasion' },
            { year: '1941', label: 'Mohammad Reza becomes king' },
            { year: '1943', label: 'Tehran Conference' },
            { year: '1944', label: 'Reza Shah dies in exile' },
          ] },
        ] },
      ],
    },
    {
      key: 'ch4',
      title: 'Finding His Feet',
      subtitle: '1946 – 1951',
      pages: [
        { blocks: [
          { t: 'h', x: 'The Azerbaijan crisis' },
          { t: 'p', x: "The young Shah's first great test came in 1946. Soviet troops had lingered in the north after the war and backed two breakaway states, one in Azerbaijan and one in Kurdistan. For a moment it seemed Iran might be pulled apart, its northern provinces slipping out of Tehran's hands." },
          { t: 'p', x: "Through patient diplomacy, pressure at the newly formed United Nations, and a promise of oil concessions that was later quietly withdrawn, Iran secured the Soviet withdrawal. In December 1946 the Iranian army marched back into Tabriz, and the country was made whole again." },
          { t: 'p', x: "For a king still unsure of himself, it was a formative victory. He rode north to the reclaimed provinces to cheering crowds, and for the first time felt the throne truly his." },
          { t: 'imgrow', keys: ['mrp-ch4-a', 'mrp-ch4-b'], cap: 'The young Shah in the early years of his reign, finding his footing as king.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Shot at the University' },
          { t: 'p', x: "In February 1949, at a ceremony at Tehran University, a gunman hidden among the press drew a pistol and fired at close range. Several bullets struck near his face, one passing through his military cap, yet he walked away with only minor wounds. The assassin was shot dead on the spot." },
          { t: 'p', x: "He took the escape as another sign that providence was guarding him for his mission. In its aftermath the government blamed the plot on the communist Tudeh party, banned it, and moved to strengthen the powers of the crown, creating a senate and widening the king's authority." },
          { t: 'call', title: 'A belief in destiny', x: "More than once in his life the Shah brushed against death and walked away. He came to see these escapes as signs of a divine mission. This is his own account of himself, offered here to understand how he saw his role, and how that certainty shaped the choices he made." },
        ] },
        { blocks: [
          { t: 'h', x: 'A new love' },
          { t: 'p', x: "His personal life was shifting too. His marriage to Fawzia had grown cold, and in 1948 it ended in divorce. She returned to Egypt, and their daughter Shahnaz remained a bond between the two royal families." },
          { t: 'p', x: "In 1951 he married Soraya Esfandiary, a young woman of Iranian and German parentage, barely eighteen. By every account it was a genuine love match." },
          { t: 'collage', keys: ['mrp-soraya-1', 'mrp-soraya-2'], cap: 'The Shah and Soraya, whose marriage was, by every account, a true love match.' },
          { t: 'p', x: "The photographs of these years show a couple plainly devoted to each other. For a time, amid the gathering storms of politics, he had found real happiness at home." },
        ] },
        { blocks: [
          { t: 'h', x: 'A restless nation' },
          { t: 'p', x: "The country around him, however, was anything but calm. Parliament was strong and combative, the press was loud, and a single question was rising above all others. Why did Iran's greatest treasure, its oil, remain in the hands of a foreign company that kept the lion's share of the profit?" },
          { t: 'p', x: "In March 1951 the prime minister, General Razmara, who had cautioned against seizing the oil, was assassinated. Within days parliament voted to nationalize the industry, and a fervent nationalist named Mohammad Mossadegh rode the wave of popular feeling to power. The stage was set for the greatest crisis of the Shah's early reign." },
        ] },
      ],
    },
    {
      key: 'ch5',
      title: 'The Oil Crisis and 1953',
      subtitle: '1951 – 1953',
      pages: [
        { blocks: [
          { t: 'h', x: "Oil and a nation's pride" },
          { t: 'p', x: "Since the first concession of 1901, Iran's oil had been controlled by the British owned Anglo Iranian Oil Company. Britain took the greater share of the wealth, while Iran received only modest royalties, and the vast refinery at Abadan, the largest in the world, stood as a daily reminder of who truly profited from Iranian soil." },
          { t: 'p', x: "To many Iranians this was not just an unfair contract but a wound to national pride, a symbol of the foreign hands that had shaped their country for too long. The demand to reclaim the oil united nationalists, the left, and much of the clergy in a single, powerful cause." },
          { t: 'imgsm', key: 'mrp-oil', cap: 'The Abadan refinery, once the largest in the world, at the heart of the oil dispute.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Mossadegh rises' },
          { t: 'p', x: "Mohammad Mossadegh was unlike any figure Iran had seen. Aristocratic, emotional, and by all accounts incorruptible, he could move a crowd to tears and often wept himself, conducting affairs of state from his bed and appearing in parliament in his pajamas. To his supporters he was the pure voice of the nation." },
          { t: 'imgsm', key: 'mrp-mossadegh', cap: 'Mohammad Mossadegh, the nationalist prime minister who nationalized Iran\'s oil.' },
          { t: 'p', x: "He led the National Front, drove through the nationalization of oil, and became prime minister in 1951 to enormous acclaim, named Time's Man of the Year. Between the cautious young king who longed for authority and the popular premier who embodied the will of the street, a deep and uneasy rivalry began to grow." },
        ] },
        { blocks: [
          { t: 'h', x: 'The boycott and the standoff' },
          { t: 'p', x: "Britain struck back hard. It organized a worldwide boycott of Iranian oil, blockaded Abadan with its navy, and took the dispute to the World Court and the United Nations. Iran's oil sales collapsed, the economy was strangled, and ordinary people began to feel the pain of empty treasuries and rising hardship." },
          { t: 'p', x: "Rather than break Mossadegh, the pressure made him stronger. He demanded emergency powers and control of the war ministry, clashing directly with the Shah over command of the army. When he briefly resigned in July 1952, a popular uprising swept him back into office. But the country was splitting apart, and the communist Tudeh was gaining in the streets." },
        ] },
        { blocks: [
          { t: 'h', x: 'Foreign hands' },
          { t: 'call', title: 'The truth, plainly', x: "Unable to break Mossadegh alone, Britain turned to the United States. Fearing that a weakened Iran might fall to communism, President Eisenhower approved a covert operation, known to the Americans as Ajax and to the British as Boot. Run by the CIA's Kermit Roosevelt with British intelligence, it funded street gangs, bribed officers and newspapers, and prepared to remove the prime minister." },
          { t: 'p', x: "Documents released in the decades since have made the foreign role clear. In his own books the Shah described the events as the will of his people and a lawful act of the crown. Both accounts are part of the record, and the distance between them would shape how a generation of Iranians came to see him." },
        ] },
        { blocks: [
          { t: 'h', x: 'August 1953' },
          { t: 'p', x: "The Shah signed royal decrees dismissing Mossadegh and appointing General Zahedi in his place. The first attempt, in mid August, failed. Mossadegh's supporters held the streets, and the frightened king fled the country, first to Baghdad and then to Rome, convinced he had lost his throne forever." },
          { t: 'p', x: "For several days the outcome hung in the balance. Then, on 19 August, organized crowds and loyal army units turned the tide, Mossadegh's government fell, and Zahedi took power. Stunned and relieved, the Shah flew home to cheering crowds and a throne restored." },
          { t: 'pull', x: "From this moment he would rule, and no longer merely reign." },
          { t: 'p', x: "The year 1953 was the hinge of his reign. It gave him at last the power that had eluded him since boyhood. But the manner of his return, carried home on foreign shoulders, cast a long shadow over his legitimacy that he would never fully escape, however much he later sought to minimize the hands that had helped him." },
        ] },
      ],
    },
    {
      key: 'ch6',
      title: 'Soraya, and the Search for an Heir',
      subtitle: '1954 – 1958',
      pages: [
        { blocks: [
          { t: 'p', x: "With his throne secured, the Shah turned to rebuilding. A fair new oil agreement in 1954 restored the country's income, American aid flowed in, and the economy slowly steadied. For a few years the king and his young queen seemed to have everything before them." },
          { t: 'p', x: "Yet a shadow lay over the palace. The dynasty needed a male heir, and as the years passed, Soraya bore no child. In a monarchy whose survival depended on the line of succession, it was the one problem that power and wealth could not solve." },
        ] },
        { blocks: [
          { t: 'h', x: 'An impossible choice' },
          { t: 'p', x: "Doctors were consulted across Europe, and the pressure grew heavier each year, from the court, from the clergy, and from the cold logic of the crown itself. The Shah, by his own account, loved Soraya deeply and searched for any way to keep her." },
          { t: 'boxes', items: [
            { title: 'The crown', x: 'A dynasty required a male heir to secure the succession.' },
            { title: 'His heart', x: 'By every account he was truly in love with Soraya.' },
            { title: 'The clergy', x: 'A second wife or a change of succession met resistance.' },
            { title: 'The choice', x: 'In the end, duty was made to outweigh love.' },
          ] },
          { t: 'p', x: "He is said to have offered to change the line of succession so that the throne might pass to a brother's son rather than lose her. It was not allowed." },
        ] },
        { blocks: [
          { t: 'pull', x: "The crown asked of him the one thing his heart refused to give easily." },
          { t: 'p', x: "In 1958 they divorced. It was announced to the nation with genuine sorrow, and Soraya left Iran to live quietly abroad, remembered ever after in the press as the princess with the sad, beautiful eyes." },
          { t: 'p', x: "In his memoirs the Shah wrote of her with lasting tenderness, and never quite denied that a part of him remained bound to her. It is among the most human passages of his life, a reminder that beneath the uniform and the ceremony was a man asked to weigh love against duty, and made to choose duty." },
        ] },
      ],
    },
    {
      key: 'ch7',
      title: 'Farah, and the White Revolution',
      subtitle: '1959 – 1963',
      pages: [
        { blocks: [
          { t: 'p', x: "In 1959 the Shah met Farah Diba, a young Iranian studying architecture in Paris. Warm, cultured, and devoted to art and to her country, she was unlike the sheltered princesses of the past. They married in December 1959 in a celebrated ceremony in Tehran." },
          { t: 'video', key: 'mrp-wedding-farah', cap: 'The wedding of Mohammad Reza and Farah, 1959. Tap to watch.' },
          { t: 'p', x: "Farah would become far more than a consort. She threw herself into the arts, education, and welfare, founded museums and cultural festivals, and in time was crowned Shahbanou, or empress, the first woman so honored in modern Iranian history." },
        ] },
        { blocks: [
          { t: 'h', x: 'An heir at last' },
          { t: 'fact', label: 'The dynasty secured', value: 'Crown Prince Reza born, 31 Oct 1960' },
          { t: 'imgsm', key: 'mrp-heir', cap: 'The Shah with his son, Crown Prince Reza Pahlavi.' },
          { t: 'p', x: "On the last day of October 1960, Farah gave birth to a son, Reza. Church bells and gun salutes rang across the country, and the Shah, after decades of waiting, at last had the male heir his throne demanded. More children followed, and the royal family became a symbol of the modern Iran he hoped to build." },
          { t: 'p', x: "With his personal foundation finally settled, and his authority firm, the Shah turned to the great project of his reign, the remaking of Iran itself." },
        ] },
        { blocks: [
          { t: 'h', x: 'The White Revolution' },
          { t: 'p', x: "In January 1963 he launched what he called the White Revolution, a sweeping program of reform from above, meant, in his words, to carry out a revolution by the throne so that none need be made against it. He put it to a national vote, and it passed overwhelmingly." },
          { t: 'circles', items: [
            { value: 'Land', label: 'Land reform for peasants' },
            { value: 'Vote', label: "Women's suffrage" },
            { value: 'Read', label: 'Literacy Corps' },
            { value: 'Share', label: 'Profit sharing' },
          ] },
          { t: 'p', x: "Great estates were broken up and their land given to peasants who had never owned the soil they worked. Women won the right to vote and to stand for office. A Literacy Corps of young conscripts went out to teach reading in the villages, and health and development programs followed." },
        ] },
        { blocks: [
          { t: 'p', x: "In his books the Shah described these years as the very heart of his mission, to lift the peasantry, to modernize the nation, and to bind its people directly to the crown that had freed them. To millions it was real and visible progress, and his popularity soared." },
          { t: 'call', title: 'The seeds of opposition', x: "But the reforms made powerful enemies. Landowners lost their estates, and part of the clergy opposed the changes, above all the land reform and the new rights for women. Among the fiercest voices was a cleric named Ruhollah Khomeini." },
          { t: 'p', x: "In June 1963 Khomeini's denunciations sparked days of violent protest. They were suppressed by force, and in 1964 he was sent into exile, where he would wait, and watch, for fifteen years. A reform meant to unite the country had also drawn the battle lines of its future." },
        ] },
      ],
    },
    {
      key: 'ch8',
      title: 'Toward the Great Civilization',
      subtitle: '1965 – 1971',
      pages: [
        { blocks: [
          { t: 'p', x: "These were the years of the throne at its height. Oil revenue climbed, factories rose, universities filled, and the Shah's confidence grew with his country's. In 1965, after his prime minister was assassinated by a young radical, Amir Abbas Hoveyda took office and would serve for nearly thirteen years, the steady hand of the boom." },
          { t: 'p', x: "The Shah now ruled with a firm grip. He guided the great decisions himself, from oil to industry to the army, and Iran began to carry real weight in the world, courted by East and West alike for its stability and its oil." },
          { t: 'imgrow', keys: ['mrp-civ-1', 'mrp-civ-2'], cap: 'A thriving, modernizing Iran during the years of the Great Civilization.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A crown earned and worn with pride' },
          { t: 'p', x: "He had waited twenty six years to crown himself, refusing, he said, to be crowned king of a poor and backward nation. Only when he judged that Iran had risen did he consent. In October 1967 the ceremony was held in the Golestan Palace." },
          { t: 'p', x: "In a gesture rich with meaning, he placed the crown upon his own head, as Napoleon once had, and then crowned Farah as Shahbanou, the first empress crowned in Iran in centuries. Their young son Reza was named heir before the assembled world." },
          { t: 'imgrow', keys: ['mrp-coronation-1', 'mrp-coronation-2', 'mrp-coronation-3'], cap: 'The coronation of 1967. The Shah crowned himself, then Farah as Shahbanou.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Persepolis celebration' },
          { t: 'p', x: "In 1971 he staged one of the most lavish events of the century, a grand celebration at the ruins of Persepolis marking two thousand five hundred years of Persian monarchy. Kings, queens, and presidents from around the world dined in silk tents amid the desert, served by the finest houses of Paris, in a display meant to place modern Iran within an unbroken line stretching back to antiquity." },
          { t: 'imgrow', keys: ['mrp-persepolis-1', 'mrp-persepolis-2'], cap: 'The 2,500 year celebration at Persepolis, 1971. Tents, banquets, and a parade of Iran through the ages.' },
          { t: 'p', x: "The heart of the ceremony was a tribute to Cyrus the Great, founder of the first Persian empire. Standing before the tomb of Cyrus at Pasargadae, the Shah addressed the ancient king directly, in words that became famous, promising that Iran kept watch over the legacy he had left." },
          { t: 'q', x: "Cyrus, rest in peace, for we are awake.", by: 'the Shah, at the tomb of Cyrus, 1971' },
          { t: 'imgsm', key: 'mrp-cyrus', cap: 'The tomb of Cyrus the Great at Pasargadae, honored at the heart of the celebration.' },
          { t: 'p', x: "Abroad it was admired as spectacle. At home, many asked why such fortunes were spent on foreign guests while villages still went without. The celebration meant to display Iran's greatness became, for his critics, a symbol of a throne grown distant from its people." },
          { t: 'pull', x: "He dreamed of a Great Civilization, Iran restored to the front rank of nations." },
        ] },
        { blocks: [
          { t: 'p', x: "That dream had a name and a plan. In his writings the Shah set out his vision of a Great Civilization, a modern, industrial, self reliant Iran that would take its place among the leading powers of the world within a single generation. He believed he could see the destination clearly, and that history had chosen him to lead his people there." },
          { t: 'call', title: 'The other side', x: "But the same drive that built roads, dams, and universities also left little room for dissent. Organized opposition was not permitted, the press was closely controlled, and the intelligence service, SAVAK, watched critics with a heavy hand. The nation was being modernized swiftly, but from above, and the space for those who disagreed grew narrow. It was a tension that would matter greatly in the end." },
        ] },
      ],
    },
    {
      key: 'ch9',
      title: 'The Boom and the Cracks',
      subtitle: '1973 – 1977',
      pages: [
        { blocks: [
          { t: 'h', x: 'A flood of oil wealth' },
          { t: 'p', x: "In 1973 the price of oil roughly quadrupled almost overnight, and Iran was suddenly awash in wealth beyond imagining. The Shah, long an advocate of higher prices, saw his moment and seized it. He would reach his Great Civilization not in a generation, he declared, but in years." },
          { t: 'circles', items: [
            { value: '×4', label: 'Oil price, 1973' },
            { value: 'Arms', label: 'A vast new military' },
            { value: 'Build', label: 'Industry and dams' },
            { value: 'Fast', label: 'Change accelerated' },
          ] },
          { t: 'p', x: "He spent boldly, on heavy industry, a modern army, nuclear plants, and grand projects, determined to vault Iran into the front rank of nations in a single leap." },
        ] },
        { blocks: [
          { t: 'h', x: 'More money than the country could absorb' },
          { t: 'p', x: "But money moved faster than the nation could take it in. The ports choked with goods that rotted before they could be unloaded, inflation surged, and rents soared. The gap between rich and poor widened, and villagers pouring into the cities for work found crowding and disappointment instead." },
          { t: 'p', x: "The rapid change unsettled traditional life, and a quiet resentment gathered beneath the glittering surface of progress. Many who had once felt loyalty to the crown began, without quite saying so, to feel left behind by it." },
          { t: 'collage', keys: ['mrp-boom-1', 'mrp-boom-2'], cap: 'The boom years transformed Iran\'s cities at a breathless pace.' },
        ] },
        { blocks: [
          { t: 'h', x: 'One party, and a hidden illness' },
          { t: 'p', x: "In 1975 the Shah made a fateful error of judgment. He abolished the existing parties and folded the nation's politics into a single party, the Rastakhiz, and declared that any Iranian who would not join it should take a passport and leave. Meant to unify, it instead alienated many who had felt, until then, a quiet loyalty to their king." },
          { t: 'call', title: 'A secret carried alone', x: "Privately, the Shah was gravely ill. In 1974 French doctors had diagnosed a form of cancer, and he kept it secret for years, even from Farah. The illness, and the treatments that dulled and tired him, quietly drained the decisiveness that his hardest hour, now approaching, would demand of him." },
          { t: 'p', x: "To the world he still stood at the peak of his power. Beneath it, the ground was beginning to shift." },
        ] },
      ],
    },
    {
      key: 'ch10',
      title: 'The Storm and the Departure',
      subtitle: '1977 – 1979',
      pages: [
        { blocks: [
          { t: 'h', x: 'The gathering storm' },
          { t: 'p', x: "By the late 1970s pressure was building on every side. Abroad, a new American president, Jimmy Carter, pressed him on human rights, and the Shah, hoping to please his ally and soften his image, loosened some of the controls that had held the country tight. Into that small opening rushed years of pent up grievance." },
          { t: 'p', x: "Through 1978 the discontent gathered into a vast movement that crossed every line. Religious and secular, left and right, bazaar merchant and university student, they agreed on little except that the throne must go. Protests grew, met by crackdowns, and each death fed the next in a rising cycle the government could not break." },
        ] },
        { blocks: [
          { t: 'h', x: "Khomeini's voice" },
          { t: 'p', x: "From his exile, at last in a suburb of Paris, the Ayatollah Khomeini became the single voice around which the revolution turned. His sermons, recorded on cassette tapes, were smuggled into Iran and passed hand to hand, played in mosques and homes across the country, calling without compromise for the Shah to go." },
          { t: 'p', x: "Uncompromising where others wavered, he offered not reform but the end of the monarchy itself, and to a nation weary of one man's rule, that clarity proved magnetic. The more the Shah offered, the more the streets demanded, until nothing short of his departure would satisfy them." },
        ] },
        { blocks: [
          { t: 'h', x: 'A wavering king' },
          { t: 'p', x: "Weakened by his hidden illness and torn between force and concession, the Shah wavered at the decisive hour. He installed a military government, then a reformist one; he freed prisoners, apologized to the nation, and went on television to say he had heard the voice of their revolution. The next day the streets filled again." },
          { t: 'p', x: "In his memoirs he wrote that he could not bring himself to save his throne by drowning his own people in blood, that a king who rules by massacre is no longer worthy of the name. His critics called it fatal indecision; he called it a refusal to become a tyrant in his final hour. Both may be true." },
          { t: 'call', title: 'The hands of others', x: "He came to believe, and wrote at length, that foreign powers had turned against him, that the same Western allies he had served now abandoned him or worked for his fall. Historians debate how far this is so. What is clear is that by early 1979 he stood almost alone, ill, exhausted, and out of choices." },
        ] },
        { blocks: [
          { t: 'h', x: 'The departure' },
          { t: 'p', x: "On 16 January 1979, the Shah left Iran. The trip was called a temporary rest abroad, but everyone understood. At Mehrabad Airport, an officer knelt to kiss his feet, and the Shah, visibly moved, raised the man up. He took a small box of Iranian soil with him." },
          { t: 'p', x: "He wept as the plane lifted off. In his own words, he left with an empty heart, carrying the weight of a thousand years of monarchy that ended with him, and a love for a country he knew, even then, he might never see again. Within weeks Khomeini returned to Tehran to enormous crowds, and the monarchy his father had founded came to an end." },
          { t: 'video', key: 'mrp-exile-interview', cap: 'In exile, the Shah reflects on his reign and his departure. Tap to watch.' },
          { t: 'pull', x: "He left the country he had ruled for thirty seven years, and never returned." },
        ] },
      ],
    },
    {
      key: 'ch11',
      title: 'Answer to History',
      subtitle: '1979 – 1980',
      pages: [
        { blocks: [
          { t: 'h', x: 'A king without a country' },
          { t: 'p', x: "His exile became a lonely odyssey across the world. Egypt received him first, then Morocco, the Bahamas, and Mexico, each stay shorter than the last as governments feared the anger of the new Iran. The man who had dined with the kings of the earth now struggled to find a country that would take him in." },
          { t: 'p', x: "Through these years he was quietly battling cancer, an illness he bore with private dignity. He needed proper medical care, yet as country after country turned him away, the treatment he deserved was too often delayed or denied him." },
        ] },
        { blocks: [
          { t: 'h', x: 'The hostage crisis' },
          { t: 'p', x: "In October 1979 the United States admitted him for medical treatment in New York. In Tehran the decision was taken as proof that America meant to restore him, as it had in 1953, and on 4 November students stormed the American embassy and seized its staff." },
          { t: 'imgsm', key: 'mrp-hostage', cap: 'The seizure of the American embassy in Tehran, November 1979.' },
          { t: 'p', x: "Fifty two Americans were held for four hundred and forty four days, a crisis that gripped the world, sank a presidency, and poisoned relations between the two nations for decades to come. At its center, unwillingly, was the ailing Shah, whose presence on American soil had lit the fuse. Under the pressure he soon moved on again, to Panama, and at last back to Egypt." },
        ] },
        { blocks: [
          { t: 'h', x: 'The last book' },
          { t: 'p', x: "There in Cairo, President Anwar Sadat offered him refuge and dignity when almost no one else would. And there, in his final months, the Shah wrote his last book, Answer to History, part memoir and part defense, his own account of a life spent trying to modernize a nation that, in the end, turned from him." },
          { t: 'q', x: "I did not want my people to look back and say that their king had abandoned them, nor that he had stayed only by shedding their blood.", by: 'attributed to the Shah, in exile' },
          { t: 'p', x: "He wrote without bitterness toward his people, reserving his sorrow for what he saw as the betrayals of allies and the tragedy of a work left unfinished." },
        ] },
        { blocks: [
          { t: 'h', x: 'The end' },
          { t: 'fact', label: 'Died', value: '27 July 1980, Cairo' },
          { t: 'p', x: "Mohammad Reza Shah Pahlavi died in Cairo on 27 July 1980, at the age of sixty. President Sadat gave him a state funeral, and he was laid to rest in the Al Rifa'i Mosque, where he remains to this day, far from the country he loved." },
          { t: 'collage', keys: ['mrp-grave-1', 'mrp-grave-2'], cap: "The Shah's tomb at the Al Rifa'i Mosque in Cairo, where he rests in exile." },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: "This has been a glimpse of the life of the king who ruled Iran. A prince raised for a throne, who carried the weight of a nation from the age of twenty one, and who gave the whole of his life to the country he loved." },
          { t: 'p', x: "He dreamed of an Iran that was modern, proud, and strong, and he worked without rest to build it, roads and schools, universities and industry, land for the farmer and a voice for the woman, a nation lifted and set among the great powers of the world. Through triumph and hardship, and to his final breath in exile, his devotion to Iran never wavered." },
          { t: 'q', x: "All my life I have loved my country. Whatever I did, I did for Iran, and for its people.", by: 'the spirit of his own words, Answer to History' },
          { t: 'pull', x: "He gave his life, and his heart, to Iran." },
        ] },
      ],
    },
  ],
};

const rezaShah: Topic = {
  key: 'reza-shah',
  category: 'history',
  name: 'Reza Shah Pahlavi',
  persian: 'رضا شاه',
  years: '1878 – 1944',
  essence: 'The soldier from a mountain village who founded a dynasty and built the modern Iranian state, almost single handedly, in sixteen years.',
  cover: 'reza-cover',
  closing: 'reza-cover',
  status: 'ready',
  sources: [
    'Mohammad Reza Pahlavi, Mission for My Country (1961)',
    'Gholamreza Pahlavi, Mon pere, mon frere, les Shahs d Iran',
    'Abbas Milani, The Shah (2011)',
    'The historical record of the Pahlavi era',
  ],
  chapters: [
    {
      key: 'rz1',
      title: 'From a Mountain Village',
      subtitle: '1878 – 1900',
      pages: [
        { blocks: [
          { t: 'fact', label: 'Born', value: '15 March 1878, Alasht, Mazandaran' },
          { t: 'p', x: 'Reza Khan was born on 15 March 1878 in Alasht, a small village high in the mountains of Mazandaran, in the green north of Iran. His people were of modest means, and the world he entered was a hard one, far from the comforts of the capital.' },
          { t: 'p', x: 'His father, an officer, died when Reza was only a few months old. His mother carried her infant son through winter snows toward Tehran to find family, a journey that nearly cost them both their lives. He grew up without wealth or connection, shaped early by hardship and by his own stubborn strength of will.' },
          { t: 'imgsm', key: 'reza-teen', cap: 'Reza Khan in his youth, before his rise through the ranks.' },
        ] },
        { blocks: [
          { t: 'p', x: 'As a young man he joined the Persian Cossack Brigade, the only modern, disciplined military unit in a Qajar Iran that was otherwise weak and disordered. There he found his calling. Tall, commanding, and fearless, he rose steadily through the ranks by sheer ability in an age when birth usually counted for more.' },
          { t: 'p', x: 'The Iran around him was a nation in decline, its government bankrupt, its provinces ruled by tribes and foreign interests, its affairs decided in London and Saint Petersburg. For a proud soldier who loved his country, the humiliation was a fire that would drive him for the rest of his life.' },
        ] },
      ],
    },
    {
      key: 'rz2',
      title: 'The March on Tehran',
      subtitle: 'February 1921',
      pages: [
        { blocks: [
          { t: 'h', x: 'A nation adrift' },
          { t: 'p', x: 'By 1921 Iran was close to collapse. The First World War had ravaged the country though it was never a combatant, famine had killed untold numbers, and the young Qajar king, Ahmad Shah, was powerless to hold the state together. Into that vacuum stepped a soldier who had decided that someone must act.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The coup' },
          { t: 'p', x: 'In February 1921, Reza Khan marched from Qazvin to Tehran at the head of only about two thousand five hundred to three thousand well disciplined troops. They entered the capital almost without resistance and took control of the city in a single, bloodless stroke.' },
          { t: 'stat', items: [
            { value: '~3,000', label: 'Troops in the march' },
            { value: '0', label: 'Lives lost in the coup' },
            { value: '1921', label: 'The capital taken' },
          ] },
          { t: 'p', x: 'He installed a new government with the journalist Seyyed Zia Tabatabaei as prime minister, and took for himself the command of the armed forces, with the title Sardar Sepah, commander of the army. The Qajar Shah remained on his throne in name, but real power in Iran had changed hands. This quiet, disciplined coup is the true beginning of Reza Shah\'s rise.' },
          { t: 'imgsm', key: 'reza-coup', cap: 'Reza Khan at the time of the march on Tehran, 1921.' },
        ] },
        { blocks: [
          { t: 'p', x: 'Over the next four years he gathered the reins of the state into his own hands. He crushed the tribal rebellions and separatist revolts that had torn the provinces apart, and for the first time in living memory, a single authority reached from Tehran to the farthest corners of the country.' },
          { t: 'p', x: 'In 1923 he became prime minister. The old dynasty was fading, and the nation was ready for a strong hand. In 1925, with the approval of a constituent assembly, the Qajar dynasty was set aside, and Reza Khan was proclaimed Reza Shah Pahlavi, founder of a new royal house.' },
          { t: 'timeline', items: [
            { year: '1921', label: 'The coup' },
            { year: '1923', label: 'Prime minister' },
            { year: '1925', label: 'Crowned Reza Shah' },
            { year: '1926', label: 'Formal coronation' },
          ] },
        ] },
      ],
    },
    {
      key: 'rz3',
      title: 'Building a Nation',
      subtitle: '1925 – 1941',
      pages: [
        { blocks: [
          { t: 'p', x: 'What Reza Shah did in the next sixteen years was remarkable by any measure. He set out to drag Iran, almost by force of will, out of the past and into the modern world, and the scale of what he built in so short a time still shapes the nation today.' },
          { t: 'steps', items: [
            { title: 'A national army', x: 'A modern conscript army that ended the tribal revolts and unified the land under one authority.' },
            { title: 'The Trans-Iranian Railway', x: 'A railway binding the Persian Gulf to the Caspian, built with Iranian money alone.' },
            { title: 'Schools and a university', x: 'Compulsory primary education, the University of Tehran in 1934, and thousands of students sent to study in Europe.' },
            { title: 'A modern state', x: 'Roads, factories, a civil code, land registered and forests nationalized, a government that finally reached the whole country.' },
          ] },
          { t: 'p', x: 'He created a modern conscript army and ended the tribal revolts that had long divided the land. He founded the University of Tehran in 1934, made primary schooling compulsory, and sent thousands of young Iranians to study in Europe so they might return and build the nation.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A new nation, remade' },
          { t: 'p', x: 'He built thousands of miles of modern roads and the first real factories, registered the land, and nationalized the forests. He replaced religious law with a European style civil code, brought in Western dress for men, and in 1936 ordered the removal of the veil, a reform welcomed by some and deeply resented by others.' },
          { t: 'p', x: 'In 1935 he asked the world to call the country by the name its own people used, Iran, the land of the Aryans, rather than the Greek name Persia. It was a small change of a word that carried a whole vision, a nation reclaiming itself and stepping forward under its own name.' },
          { t: 'imgsm', key: 'reza-serving', cap: 'Reza Shah, the builder of the modern Iranian state.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The railway across the roof of Iran' },
          { t: 'p', x: 'Of all he built, the Trans-Iranian Railway was his proudest achievement. Stretching one thousand three hundred and ninety four kilometres, it bound the Persian Gulf in the south to the Caspian Sea in the north, crossing the length of a rugged and mountainous land.' },
          { t: 'stat', items: [
            { value: '1,394 km', label: 'Gulf to Caspian' },
            { value: '224', label: 'Tunnels' },
            { value: '4,000+', label: 'Bridges and viaducts' },
          ] },
          { t: 'p', x: 'What made it extraordinary was not only the engineering but the pride behind it. It was built entirely with Iranian money, without a single foreign loan or concession, paid for by taxes on tea and sugar, so that in a sense every Iranian helped to build it with every cup of tea they drank.' },
        ] },
        { blocks: [
          { t: 'p', x: 'The route climbed over the Zagros and the Alborz, the two great mountain ranges, rising past two thousand two hundred metres at its highest point, near the very limit of what the steam engines of the day could manage. It required more than ninety kilometres of tunnels and over four thousand bridges.' },
          { t: 'p', x: 'Among its wonders were the Veresk Bridge in Mazandaran, one hundred and ten metres long and sixty six metres high, built without scaffolding and still standing as an engineering marvel, and the famous Three Golden Lines, a section of three switchback loops that climbed the steep Gaduk pass. Built between 1933 and 1938 across such terrain, it was a feat far ahead of its time.' },
          { t: 'q', x: 'Now I can die in peace. I have connected the Persian Gulf to the Caspian with Iranian hands and Iranian money.', by: 'Reza Shah, at the railway\'s opening, 1938' },
          { t: 'img', key: 'iran-railway', cap: 'The Trans-Iranian Railway, binding the Persian Gulf to the Caspian across 1,394 km.' },
          { t: 'p', x: 'The railway was inaugurated with great ceremony on 26 August 1938. Years later, during the Second World War, this same line became the vital Persian Corridor, carrying nearly five million tons of supplies to the Soviet Union. It remains in daily use to this day.' },
        ] },
      ],
    },
    {
      key: 'rz4',
      title: 'The Father and the Man',
      subtitle: 'A private portrait',
      pages: [
        { blocks: [
          { t: 'p', x: 'Behind the towering public figure was a father whose children remembered him with deep love and no small awe. He was stern, demanding, and impatient with weakness, yet those closest to him spoke of a warmth and a tenderness that the public rarely saw.' },
          { t: 'img', key: 'reza-children', cap: 'Reza Shah with his children, among them the future Shah, Mohammad Reza.' },
          { t: 'img', key: 'reza-command', cap: 'Reza Shah with his son and heir, the young Mohammad Reza.' },
          { t: 'p', x: 'He raised his sons and daughters to serve Iran, and he placed on his eldest son and heir, Mohammad Reza, the heaviest expectations of all. In the family memoirs his children describe a man of simple habits and iron discipline, who rose early, worked without rest, and expected the same of everyone around him.' },
        ] },
        { blocks: [
          { t: 'p', x: 'He had little patience for luxury or ceremony for its own sake. What moved him was the work of building, and he threw himself into it with a soldier\'s single mindedness. He would appear without warning at a worksite or a barracks or a school, inspecting, questioning, driving the work forward.' },
          { t: 'img', key: 'reza-young-kids', cap: 'The young royal children, raised to serve the nation their father was building.' },
          { t: 'p', x: 'To his children he was the fixed point around which the whole household turned. They remembered his rare smiles as precious things, and carried his example, his devotion to Iran above all else, for the rest of their lives.' },
        ] },
      ],
    },
    {
      key: 'rz5',
      title: 'The Gathering War',
      subtitle: '1939 – 1941',
      pages: [
        { blocks: [
          { t: 'p', x: 'As the 1930s ended, the shadow of another world war fell across Europe, and Iran could not stay clear of it. Reza Shah had turned to Germany for the engineers and industry he needed, and German experts had helped build many of his factories and railways. When war came, those ties would prove dangerous.' },
          { t: 'p', x: 'When the Second World War broke out, Iran declared itself neutral, as it had in the first. But its geography, and its railway, made neutrality almost impossible to defend.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Persian Corridor' },
          { t: 'p', x: 'In June 1941 Germany invaded the Soviet Union. Overnight, Britain and the Soviet Union became allies in desperate need of a secure land route to move supplies to the Soviet front. Iran, with its north to south railway, was the perfect corridor, and the Allies were determined to control it.' },
          { t: 'p', x: 'They demanded that Iran expel its German nationals and grant free passage for Allied supplies. Reza Shah, proud and unwilling to surrender his country\'s neutrality, sought to negotiate rather than simply submit.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The invasion' },
          { t: 'p', x: 'On 25 August 1941, British forces invaded from the south and Soviet forces from the north. The army that Reza Shah had spent his reign building, the pride of his modern state, was overwhelmed within days by the two great powers striking together.' },
          { t: 'p', x: 'It was a bitter blow. The very foundation of his life\'s work, a strong and independent Iran, was overrun by the same foreign powers he had spent twenty years trying to keep at bay.' },
        ] },
      ],
    },
    {
      key: 'rz6',
      title: 'Abdication and Exile',
      subtitle: '1941 – 1944',
      pages: [
        { blocks: [
          { t: 'h', x: 'The hardest choice' },
          { t: 'p', x: 'With foreign armies in his country and his own overwhelmed, Reza Shah faced an impossible position. Rather than see the dynasty destroyed and Iran left leaderless under occupation, he chose to step aside so that the crown might pass to his son.' },
          { t: 'p', x: 'On 16 September 1941, under direct British pressure, Reza Shah abdicated in favor of his twenty one year old son, Mohammad Reza Pahlavi. He signed the document without hesitation, and in doing so handed his son both a throne and a nation under occupation.' },
          { t: 'fact', label: 'Abdicated', value: '16 September 1941' },
        ] },
        { blocks: [
          { t: 'p', x: 'The British took the old king into exile, first to the island of Mauritius in the Indian Ocean, and then to Johannesburg, in South Africa. The man who had bound the Persian Gulf to the Caspian, who had built a state where there had been disorder, now lived out his days far from the country he had remade.' },
          { t: 'p', x: 'He died in exile in Johannesburg on 26 July 1944, at the age of sixty six. He never saw Iran again. His body was first carried to Egypt and laid to rest there for a time. Years later, in 1950, his remains were brought home to Iran, received with the honor of a returning founder. A solemn ceremony and days of national mourning marked his homecoming, and he was laid to rest in a grand mausoleum near Tehran, in the soil of the country he had done so much to build.' },
          { t: 'pull', x: 'He built modern Iran almost single handedly, in only sixteen years.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the life of Reza Shah, the soldier from a mountain village who rose to found a dynasty and to build a nation. In only sixteen years he gave Iran a railway that crossed the country, a national army, universities and schools, roads and factories, a modern government, and its own name. He built a nation that has endured to this day, the modern foundation of the Iran we know now.' },
          { t: 'p', x: 'He was a hard man in a hard time, and he asked much of his country and his family. Yet his devotion to Iran never wavered, and the modern nation his son would inherit, and that Iranians would carry forward, was in great part his to build. He gave his life to the making of modern Iran.' },
          { t: 'pull', x: 'From a mountain village, he built a nation.' },
        ] },
      ],
    },
  ],
};

const cyrus: Topic = {
  key: 'cyrus-the-great',
  category: 'history',
  name: 'Cyrus the Great',
  persian: 'کوروش بزرگ',
  years: 'c. 600 – 530 BCE',
  essence: 'The founder of the first Persian Empire, and of an idea of just and tolerant rule that echoes to this day.',
  cover: 'cyrus-cover',
  closing: 'cyrus-tomb',
  status: 'ready',
  sources: [
    'Herodotus, The Histories',
    'Xenophon, Cyropaedia',
    'The Cyrus Cylinder (British Museum)',
    'The Hebrew Bible, Books of Ezra and Isaiah',
    'Pierre Briant, From Cyrus to Alexander',
  ],
  chapters: [
    {
      key: 'cy1',
      title: 'A King Is Born',
      subtitle: 'c. 600 BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'More than two and a half thousand years ago, in the highlands of what is now southern Iran, a child was born who would change the shape of the ancient world. His name was Kurush, whom history remembers as Cyrus, and the empire he built would be the largest the world had yet seen.' },
          { t: 'p', x: 'The land of his birth, Persia, was then a small kingdom of herders and farmers, a subject people living in the shadow of the mighty Median Empire to their north. Few could have imagined that from this modest place would rise a ruler whose name would still be spoken with reverence across the world, so many centuries later.' },
          { t: 'imgsm', key: 'cyrus-face', cap: 'Cyrus the Great, founder of the Persian Empire, as imagined in later ages.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The legend of the infant king' },
          { t: 'p', x: 'The Greek historian Herodotus, writing a century after Cyrus, preserved a story that reads like myth. Astyages, king of the Medes and Cyrus\'s own grandfather, dreamed that his daughter\'s child would one day overthrow him. Fearing the omen, he ordered the newborn boy to be killed.' },
          { t: 'p', x: 'But the servant charged with the deed could not do it. The infant was given instead to a herdsman in the mountains, who raised him as his own. The child grew strong and commanding, and even at play the other children chose him as their king, so plainly did he seem born to rule.' },
          { t: 'q', x: 'This boy, the son of a herdsman as we supposed, is in truth the grandson of the king.', by: 'Herodotus, The Histories' },
        ] },
        { blocks: [
          { t: 'p', x: 'In time the truth was discovered, and the boy was restored to his royal family. Whether the tale is history or legend, it carried a deeper meaning for those who told it. Greatness, they believed, could not be hidden or destroyed. It would find its way into the world no matter what stood against it.' },
          { t: 'p', x: 'Behind the legend lies the record. Cyrus was born of the royal house of Persia, the Achaemenid line, son of Cambyses, king of Anshan, and, by his mother Mandane, grandson of the Median king himself. He was heir to a small throne, but through his veins ran the blood of kings.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A world waiting to be remade' },
          { t: 'p', x: 'The world into which Cyrus came was divided among four great powers. The Medes ruled the Iranian plateau, Babylon held the fertile heart of Mesopotamia, Lydia commanded the wealth of Asia Minor, and Egypt guarded the ancient valley of the Nile. Persia was a minor kingdom among giants.' },
          { t: 'p', x: 'Within a single generation, Cyrus would bring all but one of these under his rule, and bind them into a single empire stretching from the Aegean Sea to the edge of India. It would be the first empire in history to unite so many peoples, and the first to attempt to rule them with tolerance rather than terror.' },
          { t: 'img', key: 'cyrus-empire', cap: 'The Achaemenid Empire at its height, from the Aegean and Egypt to the Indus. Its capital, Pasargadae, is marked in gold.' },
          { t: 'keyvalue', items: [ { k: 'Founded', v: 'c. 550 BCE' }, { k: 'Capital', v: 'Pasargadae' }, { k: 'Extent', v: 'Aegean Sea to the Indus' }, { k: 'A first', v: 'Empire ruled by tolerance' } ] },
          { t: 'pull', x: 'From a small kingdom of herders, he would build the greatest empire the world had known.' },
        ] },
      ],
    },
    {
      key: 'cy2',
      title: 'The Rise Against the Medes',
      subtitle: 'c. 553 – 550 BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'When Cyrus came to the throne of Persia around 559 BCE, his people were still vassals of the Median king Astyages, the very grandfather who, in legend, had once tried to kill him. For a time the young king bided his time, gathering the loyalty of the Persian tribes and waiting for his moment.' },
          { t: 'p', x: 'That moment came around 553 BCE, when Cyrus raised the standard of revolt. The Persians were fewer and poorer than their Median overlords, but they were hardy mountain people, and they had a leader unlike any they had known.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The battle that changed everything' },
          { t: 'p', x: 'Astyages marched against the rebels with a great army. But according to the ancient accounts, his own general, Harpagus, still nursed a bitter hatred of the king, and at the decisive moment much of the Median army went over to Cyrus rather than fight him. Astyages was captured, and the Median crown passed to the Persian.' },
          { t: 'p', x: 'It was a turning of the world. The subject had become the master, and the small kingdom of Persia now ruled the vast lands of the Medes. Yet Cyrus did something remarkable, and characteristic. He did not execute or humiliate his defeated grandfather, but spared his life and, it is said, kept him at his court.' },
          { t: 'call', title: 'A new kind of conqueror', x: 'From his very first victory, Cyrus revealed the quality that would define him. Where other conquerors of the age ruled by massacre and terror, he showed mercy to the defeated and wove them into his new order. It was not only kindness. It was a wiser, more lasting way to rule.' },
        ] },
        { blocks: [
          { t: 'p', x: 'With Media his, Cyrus inherited not only its lands but its network of tributaries and its place among the great powers. The kings of the age now took notice of the newcomer who had risen so suddenly in the east. Among them was Croesus of Lydia, the richest man in the known world, who watched the Persian\'s rise with growing alarm.' },
          { t: 'timeline', items: [
            { year: '559', label: 'Cyrus becomes king of Persia' },
            { year: '553', label: 'Revolt against the Medes' },
            { year: '550', label: 'Astyages falls; Media is won' },
          ] },
        ] },
      ],
    },
    {
      key: 'cy3',
      title: 'Croesus and the Fall of Lydia',
      subtitle: 'c. 547 BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'To the west lay Lydia, a kingdom of legendary wealth ruled by Croesus, whose very name became a byword for riches. Alarmed by the rise of Persia, Croesus resolved to strike first, and before he marched he sent to the famous oracle at Delphi to ask what would happen if he made war on Cyrus.' },
          { t: 'p', x: 'The oracle gave its famous reply, that if Croesus went to war he would destroy a great empire. Delighted, he took it as a promise of victory. He did not consider that the great empire he would destroy might be his own.' },
          { t: 'q', x: 'If Croesus makes war on the Persians, he will destroy a mighty empire.', by: 'the Oracle of Delphi, in Herodotus' },
        ] },
        { blocks: [
          { t: 'h', x: 'A trick of camels' },
          { t: 'p', x: 'The armies met, and after an indecisive battle Croesus withdrew for the winter, expecting Cyrus to do the same. But Cyrus did not follow the old rules of war. He pursued at once, marching in the cold to strike while the Lydian army was dispersed, and appeared before the walls of Sardes when he was least expected.' },
          { t: 'p', x: 'In the battle before the city, the famed Lydian cavalry was the finest in the world. So Cyrus, by the counsel of Harpagus, placed his baggage camels at the front of his line. The horses of the Lydians, unused to the sight and smell of camels, panicked and refused to charge, and the battle was won.' },
          { t: 'img', key: 'cyrus-conquests', cap: 'The conquests of Cyrus, in sequence: Media, then Lydia, then Babylon.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The mercy of the victor' },
          { t: 'p', x: 'Sardes fell, and Croesus was taken. By some accounts Cyrus had built a great pyre to burn the captured king, as was the custom. But as the flames rose, Croesus called out the name of the Athenian sage Solon, who had once warned him that no man should be counted happy until his life had ended well.' },
          { t: 'p', x: 'Struck by the words, and by the turning of fortune that could bring the richest king on earth to a burning pyre, Cyrus ordered the fire quenched and spared him. Croesus, the stories say, became a trusted counsellor at the Persian court. Once again the defeated enemy was made a friend.' },
          { t: 'pull', x: 'No man should be counted happy until the end of his life is known.' },
        ] },
      ],
    },
    {
      key: 'cy4',
      title: 'Babylon and the Freeing of the Captives',
      subtitle: '539 BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'Now only one of the great powers stood between Cyrus and mastery of the known world: Babylon, the ancient and magnificent city on the Euphrates, its walls counted among the wonders of the earth. In 539 BCE, Cyrus turned toward it.' },
          { t: 'p', x: 'Babylon was ruled by Nabonidus, a king who had estranged his own priests and people. When Cyrus came, the accounts tell that the city opened its gates to him almost without a fight, its people welcoming him less as a conqueror than as a deliverer.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Cyrus Cylinder' },
          { t: 'p', x: 'What Cyrus did next echoed through history. Rather than sack the great city or drag its gods away in chains, as conquerors before him had done, he entered in peace, honored the Babylonian god Marduk, restored the temples, and let the life of the city go on undisturbed.' },
          { t: 'p', x: 'He recorded his acts on a clay barrel now known as the Cyrus Cylinder, one of the most remarkable objects to survive from the ancient world. In it he tells how he freed the peoples held captive in Babylon and let them return to their homelands, and how he restored their temples and their gods.' },
          { t: 'imgsm', key: 'cyrus-cylinder', cap: 'The Cyrus Cylinder, on which the king recorded his acts. It survives in the British Museum.' },
          { t: 'q', x: 'I returned to their places the gods who had dwelt there, and let them dwell in eternal abodes. I gathered all their peoples and restored to them their homes.', by: 'the Cyrus Cylinder' },
        ] },
        { blocks: [
          { t: 'h', x: 'The return of the exiles' },
          { t: 'p', x: 'Among those he freed were the people of Judah, carried off to Babylon in captivity a generation before. Cyrus allowed them to return to Jerusalem and to rebuild their temple, an act remembered in the Hebrew Bible with extraordinary gratitude. In its pages he is called the anointed of God, the only foreign ruler ever given that title.' },
          { t: 'q', x: 'Thus says Cyrus king of Persia: The Lord has charged me to build him a house at Jerusalem. Whoever is among you of all his people, let him go up.', by: 'The Book of Ezra' },
          { t: 'p', x: 'It is a rare thing in history for a conqueror to be remembered as a liberator by the people he ruled. Cyrus was remembered so by Babylonians, by Jews, and by Greeks alike, each in their own writings, each telling of a king who ruled with a restraint the ancient world had never seen.' },
        ] },
      ],
    },
    {
      key: 'cy5',
      title: 'The Empire and Its Ideals',
      subtitle: 'The vision of Cyrus',
      pages: [
        { blocks: [
          { t: 'p', x: 'By now the empire of Cyrus stretched from the Aegean Sea in the west to the borders of India in the east, the largest the world had yet seen. But its true greatness lay not in its size. It lay in how he chose to rule it.' },
          { t: 'img', key: 'cyrus-empire', cap: 'The empire of Cyrus at its height, from the Aegean and Egypt to the Indus.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A new idea of empire' },
          { t: 'p', x: 'The empires before him had ruled by fear. They deported whole peoples, burned rebellious cities, and demanded that the conquered abandon their gods and their ways. Cyrus built something different. He let the many peoples of his empire keep their own faiths, their own customs, and their own local rulers, so long as they kept the peace and paid their tribute.' },
          { t: 'steps', items: [
            { title: 'Tolerance of faith', x: 'Every people was free to worship its own gods. Cyrus honored the temples of the lands he ruled.' },
            { title: 'Return of the exiled', x: 'He freed captive peoples and let them return to their homelands and rebuild.' },
            { title: 'Rule through respect', x: 'Local customs and leaders were preserved, not erased. The empire was a family of nations.' },
            { title: 'Justice over terror', x: 'Where others ruled by massacre, he sought the loyalty that comes from fair and merciful rule.' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'This was more than mercy. It was a philosophy of power, the understanding that an empire held together by respect would outlast one held together by fear. For his ideals of tolerance and human dignity, the Cyrus Cylinder is sometimes called the first charter of human rights, and a copy of it rests today at the United Nations.' },
          { t: 'call', title: 'An idea that endures', x: 'The vision of Cyrus, that different peoples could live together under one just rule, each keeping its own identity, is one of the oldest and most enduring ideals in the human story. More than two thousand five hundred years later, it still speaks to us.' },
          { t: 'imgsm', key: 'cyrus-relief', cap: 'A relief from the age of the empire he founded.' },
        ] },
      ],
    },
    {
      key: 'cy6',
      title: 'The Death of a King',
      subtitle: 'c. 530 BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'Even the greatest of kings must meet his end. In his final years Cyrus turned to secure the far northeastern frontier of his empire, where the fierce nomadic peoples of Central Asia raided the borders. It was there, around 530 BCE, that he met his death, campaigning against a people the Greeks called the Massagetae.' },
          { t: 'p', x: 'The accounts of his end differ, as befits a figure who had already passed into legend. Herodotus tells a dramatic tale of the warrior queen Tomyris, who ruled the Massagetae, and whose son fell into Cyrus\'s hands and died. In her grief and fury, she is said to have sworn vengeance.' },
        ] },
        { blocks: [
          { t: 'p', x: 'In the great battle that followed, Herodotus writes, Cyrus was killed and his army defeated. It was, he says, the most violent battle fought among barbarian peoples in all his knowledge. Whether the tale is true in every detail, or grew in the telling, the core is remembered: the great king fell in the field, far from home, still leading his armies.' },
          { t: 'p', x: 'His body was brought back across the length of the empire he had built, to rest in the land of his birth, at his capital of Pasargadae.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The tomb at Pasargadae' },
          { t: 'p', x: 'There, upon the plain of Pasargadae, stands his tomb, a simple and noble structure of pale stone that has endured for two and a half thousand years. It survived even the coming of Alexander the Great, who, conquering Persia two centuries later, is said to have honored the tomb of Cyrus and ordered it protected.' },
          { t: 'img', key: 'cyrus-tomb', cap: 'The tomb of Cyrus the Great at Pasargadae, which has stood for over 2,500 years.' },
          { t: 'p', x: 'An inscription said to have once stood there carried words of quiet dignity, a king asking not for glory but for peace, reminding the passer by that he too was mortal.' },
          { t: 'quotebig', x: 'O man, whoever you are, I am Cyrus, who won the Persians their empire. Do not grudge me this little earth that covers my body.', by: 'ATTRIBUTED TO THE TOMB OF CYRUS' },
        ] },
      ],
    },
    {
      key: 'cy7',
      title: 'The Legacy That Endures',
      subtitle: 'From his day to ours',
      pages: [
        { blocks: [
          { t: 'p', x: 'The empire Cyrus founded did not die with him. Under his son Cambyses and then Darius the Great it grew still larger, reaching into Egypt and to the plains of India and the edge of Europe, and it endured for two hundred years as the mightiest power on earth, until the coming of Alexander.' },
          { t: 'p', x: 'But the deeper legacy of Cyrus was not his empire. It was his example. He showed that a ruler could be strong and merciful at once, that a conqueror could also be a liberator, and that an empire of many peoples could be bound together by respect rather than fear.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The king the world remembered' },
          { t: 'p', x: 'The Greeks, who were his people\'s great rivals, could not help but admire him. Xenophon wrote a whole book, the Cyropaedia, holding Cyrus up as the model of the ideal ruler, a book later read by kings and thinkers for centuries. The founders of nations far in the future would look back to Cyrus as an example of just rule.' },
          { t: 'imgrow', keys: ['cyrus-building-1', 'cyrus-building-2'], cap: 'The remains of Pasargadae, the capital Cyrus built, still standing on the Iranian plain.' },
          { t: 'p', x: 'For Iranians above all, he remains the father of the nation, the founder of the first Persian Empire and of an idea of Iran that has lasted through every age since. His name is spoken with a pride that has not dimmed in two and a half thousand years.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the life of Cyrus the Great, the herdsman\'s foster son who became king of the world, the conqueror who ruled with mercy, the founder of an empire and of an ideal. From a small kingdom in the highlands of Persia, he built something that outlasted his empire and outlasts us still, the belief that power is noblest when it is just.' },
          { t: 'pull', x: 'He won an empire by the sword, and kept it by justice. The world has not forgotten him.' },
        ] },
      ],
    },
  ],
};

const zand: Topic = {
  key: 'zand-dynasty',
  category: 'history',
  name: 'The Zand Dynasty',
  persian: 'زندیان',
  years: '1751 – 1794',
  essence: "The dynasty of Karim Khan, the ruler who refused the title of king and chose instead to be the advocate of his people.",
  cover: 'zand-cover',
  closing: 'zand-cover',
  status: 'ready',
  sources: [
    'The historical record of the Zand era',
    'Contemporary Persian chronicles',
    'John R. Perry, Karim Khan Zand',
  ],
  chapters: [
    {
      key: 'zd1',
      title: 'After the Storm',
      subtitle: '1747 - 1751',
      pages: [
        { blocks: [
          { t: 'fact', label: 'The dynasty begins', value: 'Karim Khan Zand, c. 1751' },
          { t: 'p', x: "In 1747 the great conqueror Nader Shah, the last of Iran\'s warrior kings, was assassinated by his own officers. With his death the country he had ruled by fear fell into chaos, and for years the land was torn apart by warlords and generals fighting over the ruins of his empire." },
          { t: 'p', x: "It was one of the darkest and most violent periods in Iran\'s long history. Out of that darkness, and out of the mountains of the west, rose a man who would offer his exhausted country something it had almost forgotten: peace, and a ruler who cared for it." },
        ] },
        { blocks: [
          { t: 'h', x: 'A soldier of the Zagros' },
          { t: 'p', x: "His name was Karim Khan, of the Zand, a tribe of the Zagros mountains in western Iran. He was not born to greatness or to noble blood. He was a soldier, plainspoken and shrewd, who rose by his ability, his fairness, and the loyalty he inspired in the men around him." },
          { t: 'p', x: "Through years of civil war he outlasted and outgoverned his rivals. Where others ruled the lands they took by terror, Karim Khan won people to his side by justice and mercy, and by the simple fact that life was better and safer under his hand. By around 1751 he had become the dominant power over most of Iran." },
          { t: 'timeline', items: [
            { year: '1747', label: 'Nader Shah assassinated' },
            { year: '1751', label: 'Karim Khan rises to power' },
            { year: '1765', label: 'Shiraz made the capital' },
            { year: '1779', label: 'Death of Karim Khan' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The crown he refused' },
          { t: 'p', x: "Here Karim Khan did something almost unheard of in the history of kings. With Iran his to command, and the throne there for the taking, he refused the title of Shah, the king of kings. Instead he kept a young prince of the old Safavid line as nominal monarch, and styled himself Vakil e-Ra\'aya, the Advocate, or Deputy, of the People." },
          { t: 'pull', x: "He would not be called king. He chose instead to be the servant of his people." },
          { t: 'p', x: "It was far more than a matter of a title. It expressed how he understood his own power, not as a possession to be flaunted, but as a trust held on behalf of the ordinary people of Iran, the farmers and merchants and families who had suffered so much. In a cruel age, it was a rare and beautiful idea, and it made him beloved." },
          { t: 'call', title: 'The meaning of a name', x: "This gentle dynasty gave Iran a rare season of peace and plenty. Its name, Zand, still carries the memory of a ruler who placed his people above his own glory." },
        ] },
      ],
    },
    {
      key: 'zd2',
      title: 'The Advocate of the People',
      subtitle: 'The character of Karim Khan',
      pages: [
        { blocks: [
          { t: 'p', x: "What set Karim Khan apart was not conquest but character. In an age of tyrants, he was known for his plainness, his humor, and his genuine care for ordinary people. He never forgot that he had risen from among them, and he never pretended to be more than he was." },
          { t: 'imgsm', key: 'zand-portrait', cap: 'Karim Khan Zand, the Advocate of the People.' },
          { t: 'imgsm', key: 'zand-rulers', cap: 'The Zand court, a rare season of gentle rule in a violent age.' },
          { t: 'p', x: "He lived simply for a ruler of his power, dressed without extravagance, and kept an open and approachable court. The stories told of him, many still remembered in Iran, paint a picture of a warm, shrewd, and deeply humane man." },
        ] },
        { blocks: [
          { t: 'h', x: 'The ruler who listened' },
          { t: 'p', x: "It was said that any subject with a grievance could bring it before him, and that he would hear the poor as readily as the powerful. He kept his own conduct plain and his taxes light, and he was known to sit among ordinary people, smoking his water pipe and talking freely, more like a village elder than a king." },
          { t: 'p', x: "Countless folk tales grew up around his fairness and his wit. In them he tests the honesty of officials, rewards the humble, and gently humbles the proud, always with a light touch and a sense of humor. Whether every tale is true matters less than what they reveal: this was how his people wished to remember him, and how they loved him." },
          { t: 'q', x: "I am not the king. I am only the deputy of the people, and I hold this power in trust for them.", by: 'the spirit of Karim Khan\'s rule' },
        ] },
        { blocks: [
          { t: 'p', x: "He could be firm when he had to be, and he was a capable soldier and shrewd statesman who held a fractured country together. But he ruled with a restraint and a decency almost unknown in his violent age, and Iran, worn down by decades of war, breathed again under his hand." },
          { t: 'call', title: 'A rare kind of power', x: "Power rarely makes men gentler. In Karim Khan it did. He understood his authority as a duty owed to his people, and that understanding is the quiet heart of the whole Zand story." },
        ] },
      ],
    },
    {
      key: 'zd3',
      title: 'Shiraz, the Beloved City',
      subtitle: 'The Zand capital',
      pages: [
        { blocks: [
          { t: 'p', x: "Karim Khan made his capital not at Tehran or Isfahan, but at Shiraz, the fabled city of roses, wine, nightingales, and poetry in the south of Iran. It was the city of the great poets Hafez and Saadi, and under Karim Khan it entered a golden age." },
          { t: 'imgsm', key: 'zand-shiraz-city', cap: 'Shiraz, the city of poets, which Karim Khan made his capital and adorned.' },
          { t: 'p', x: "He loved Shiraz and lavished care upon it, determined to make it a capital worthy of a peaceful and prosperous Iran. He built and beautified, and much of what he raised still stands today, among the loveliest monuments in the country." },
        ] },
        { blocks: [
          { t: 'h', x: 'The gifts he left in stone' },
          { t: 'p', x: "At the heart of the city he built the Arg, his great citadel, and beside it a complex of buildings for the people: a mosque, a bazaar, a bathhouse, all bearing the name Vakil, the Advocate, the title he had chosen for himself. Even the monuments he raised carried his humble idea of his own role." },
          { t: 'imgsm', key: 'zand-arg', cap: 'The Arg of Karim Khan, his citadel at the heart of Shiraz.' },
          { t: 'p', x: "The Vakil Mosque, with its forest of carved stone columns and its exquisite tilework, and the Vakil Bazaar, whose vaulted brick halls still shelter the merchants of Shiraz to this day, are among the treasures of Iranian architecture." },
        ] },
        { blocks: [
          { t: 'imgrow', keys: ['zand-vakil-mosque', 'zand-vakil-bazaar'], cap: 'The Vakil Mosque and the Vakil Bazaar in Shiraz, built by Karim Khan and still in use today.' },
          { t: 'p', x: "He also laid out gardens and repaired the shrines and tombs of the poets, honoring the cultural soul of the city. Under his care, Shiraz became again what it had long been in the Persian imagination: a place of beauty, learning, and peace." },
          { t: 'pull', x: "He gave his beloved city monuments that still bear his people\'s name, not his own." },
        ] },
      ],
    },
    {
      key: 'zd4',
      title: 'A Reign of Peace and Plenty',
      subtitle: 'c. 1751 - 1779',
      pages: [
        { blocks: [
          { t: 'p', x: "The years of Karim Khan\'s rule were, for most Iranians, a rare and precious season of calm. After decades of war, famine, and cruelty, the country knew peace, and under peace it began to heal and to prosper." },
          { t: 'steps', items: [
            { title: 'Light taxes', x: 'He kept the burden on farmers and merchants low, and the people prospered.' },
            { title: 'Justice for all', x: 'Rich and poor alike could seek his judgment, and he was known for fairness.' },
            { title: 'Trade revived', x: 'He reopened commerce, including trade through the Persian Gulf with distant lands.' },
            { title: 'Peace at home', x: 'The wars that had torn Iran apart were stilled, and the country breathed again.' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: "He encouraged agriculture and trade, and he worked to reopen commerce with the wider world, including dealings with the British East India Company on the Persian Gulf coast. Markets filled, roads grew safer, and the ordinary business of life, so long disrupted by war, resumed." },
          { t: 'p', x: "He was no builder of a vast empire, and he did not seek to be. His ambition was smaller and, in its way, greater: to give his people a good and peaceful life. By the measure that mattered most to him, the wellbeing of ordinary Iranians, his reign was a quiet triumph." },
        ] },
        { blocks: [
          { t: 'call', title: 'Remembered with love', x: "History is full of conquerors who won great empires and are remembered with fear. Karim Khan won something rarer. He is remembered with affection, as a good man who used his power to shelter his people rather than to glorify himself." },
          { t: 'p', x: "For a few decades, in a corner of a turbulent world, a ruler governed by decency, and his people flourished. It is one of the gentlest chapters in the long history of Iran." },
        ] },
      ],
    },
    {
      key: 'zd5',
      title: 'The End of a Gentle King',
      subtitle: '1779 - 1794',
      pages: [
        { blocks: [
          { t: 'p', x: "Karim Khan died in Shiraz in 1779, full of years and mourned by his people. For nearly thirty years he had given Iran peace, and his passing was felt as the loss of a protector. With him, the calm he had built began to unravel." },
          { t: 'fact', label: 'Died', value: '1779, Shiraz' },
          { t: 'p', x: "He left no successor of his own strength, and the old pattern reasserted itself. His relatives and rivals fell to fighting over the succession, and the peace of the Zand years gave way once more to struggle." },
        ] },
        { blocks: [
          { t: 'h', x: 'The last of the Zand' },
          { t: 'p', x: "As the dynasty weakened, a new and ruthless power rose in the north under Agha Mohammad Khan, founder of the Qajar dynasty. One by one the Zand were overcome, until only a single young prince remained to carry their standard: Lotf Ali Khan, the last of the Zand." },
          { t: 'p', x: "Brave, handsome, and gallant, Lotf Ali Khan fought on against overwhelming odds in a struggle that has passed into legend. For years he resisted, winning the devotion of those who followed him, a young hero defending a lost cause with a courage that Iranians still remember." },
        ] },
        { blocks: [
          { t: 'p', x: "In 1794 he was at last betrayed and captured, and with his death the Zand dynasty came to its end. The gentle house that had given Iran a season of peace passed into history, and a harder age began under the Qajars." },
          { t: 'div' },
          { t: 'p', x: "This has been a glimpse of the Zand, and of Karim Khan, the soldier who would not be called king. In a cruel and violent age he chose mercy over conquest and his people over his own glory, and he gave Iran a rare and gentle peace." },
          { t: 'era', value: '28', label: 'Years of peace he gave Iran' },
          { t: 'pull', x: "He called himself not king, but the Advocate of the People. His people never forgot it." },
        ] },
      ],
    },
  ],
};

const safavid: Topic = {
  key: 'safavid-empire',
  category: 'history',
  name: 'The Safavid Empire',
  persian: 'صفویان',
  years: '1501 - 1736',
  essence: 'The dynasty that reunited Iran, made it a great power once more, and raised Isfahan into one of the most beautiful cities the world has ever seen.',
  cover: 'safavid-cover',
  closing: 'safavid-isfahan',
  status: 'ready',
  sources: [
    'The historical record of the Safavid era',
    'Contemporary Persian and European accounts',
    'Roger Savory, Iran Under the Safavids',
  ],
  chapters: [
    {
      key: 'sf1',
      title: 'A Boy King and a New Faith',
      subtitle: '1501',
      pages: [
        { blocks: [
          { t: 'p', x: 'For centuries after the Mongol storm, Iran had been a patchwork of rival lords and warring tribes, with no single ruler and no single soul. Then, at the very dawn of the sixteenth century, a boy of fourteen changed the course of the nation forever.' },
          { t: 'p', x: 'His name was Ismail, and he was the young leader of the Safavid order, a devoted religious brotherhood from the northwest of Iran. Around him gathered fierce and loyal warriors, and at their head he swept across the land, defeating all who stood against him.' },
          { t: 'imgsm', key: 'safavid-ismail', cap: 'Shah Ismail I, founder of the Safavid dynasty, who took the throne at fourteen.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The crown at fourteen' },
          { t: 'p', x: 'In 1501 Ismail entered the city of Tabriz in triumph and had himself proclaimed Shah, the king of kings, taking the ancient title of the Persian monarchs. A boy still, he had founded a dynasty that would rule Iran for more than two centuries and restore it to greatness.' },
          { t: 'keyvalue', items: [
            { k: 'Founded', v: '1501, in Tabriz' },
            { k: 'Founder', v: 'Shah Ismail I, aged 14' },
            { k: 'Duration', v: 'Over 200 years' },
            { k: 'Legacy', v: 'A reunified, reborn Iran' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A faith that shaped a nation' },
          { t: 'p', x: 'Ismail did something that would define Iran to this very day. He made Shia Islam the faith of his realm, setting Iran apart from its powerful Sunni neighbours and giving the nation a distinct religious identity that has endured for five hundred years.' },
          { t: 'p', x: 'It was a decision of enormous consequence. It unified the many peoples of Iran under one faith and one crown, forged a strong sense of a single nation, and shaped the character of the country for all the centuries that followed. Modern Iran, in its faith and its borders, was born in these years.' },
          { t: 'pull', x: 'From a fractured land, a single nation was reborn.' },
        ] },
      ],
    },
    {
      key: 'sf2',
      title: 'The Struggle for the Realm',
      subtitle: '1514 - 1587',
      pages: [
        { blocks: [
          { t: 'p', x: 'A reborn Iran did not go unchallenged. To the west lay the mighty Ottoman Empire, the greatest power of the age, and between the two great empires there began a long and bitter rivalry that would last for generations.' },
          { t: 'p', x: 'In 1514, at the battle of Chaldiran, the young Safavid state met the Ottomans in the field. The Ottomans had cannon and firearms, weapons the Safavid cavalry lacked, and the day went against Iran. It was a hard and early lesson that valour alone could not win a modern war.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A kingdom tested' },
          { t: 'p', x: 'The decades that followed were difficult ones. The dynasty was pressed on its frontiers by the Ottomans in the west and the Uzbeks in the east, and troubled at home by the rivalries of the powerful tribal chiefs on whom the throne depended.' },
          { t: 'img', key: 'safavid-battle', cap: 'The Safavids faced the great powers of their age on every frontier.' },
          { t: 'p', x: 'Yet the young state endured. Through hard years and capable rulers it held together, waiting, though it did not yet know it, for the king who would raise it to its height.' },
        ] },
        { blocks: [
          { t: 'era', value: '1587', label: 'The year everything changed' },
          { t: 'p', x: 'In 1587 the throne passed to a prince who would become the greatest of all the Safavid kings, and one of the greatest rulers in the whole history of Iran. His name was Abbas.' },
        ] },
      ],
    },
    {
      key: 'sf3',
      title: 'Shah Abbas the Great',
      subtitle: '1587 - 1629',
      pages: [
        { blocks: [
          { t: 'p', x: 'Shah Abbas came to the throne of a troubled kingdom, hemmed in by enemies and weakened by division within. Over the course of his long reign he transformed it utterly, and left Iran stronger, richer, and more glorious than it had been in a thousand years.' },
          { t: 'imgsm', key: 'safavid-abbas', cap: 'Shah Abbas the Great, under whom the Safavid Empire reached its height.' },
          { t: 'p', x: 'He was a ruler of rare gifts: a brilliant soldier, a shrewd statesman, and a great patron of art and architecture. He was also, at times, a hard and suspicious man, as the great kings of that age often were. But his vision for Iran was without equal.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The remaking of an army' },
          { t: 'p', x: 'Abbas understood the lesson of Chaldiran. He built a new standing army, no longer dependent on the fickle tribal cavalry, equipped with muskets and cannon in the modern way. With it he became master in his own house and a match for his enemies abroad.' },
          { t: 'p', x: 'Then he turned that army against the empires that had pressed Iran for so long. He drove back the Uzbeks in the east, and he won back from the Ottomans the great western lands they had taken, restoring Iran to its full strength and its rightful borders.' },
          { t: 'steps', items: [
            { title: 'A modern army', x: 'A standing force with muskets and cannon, loyal to the crown alone.' },
            { title: 'Enemies driven back', x: 'The Uzbeks in the east and the Ottomans in the west were defeated.' },
            { title: 'Trade and wealth', x: 'He welcomed merchants from across the world and made Iran rich.' },
            { title: 'A new capital', x: 'He made Isfahan his capital and adorned it beyond compare.' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A door opened to the world' },
          { t: 'p', x: 'Abbas welcomed the world to Iran. He invited European merchants and ambassadors, encouraged the silk trade that was the treasure of his realm, and made his country a crossroads of commerce between East and West. Iranian silk and carpets travelled to the courts of Europe, and the wealth of the world flowed into Iran.' },
          { t: 'p', x: 'Under his hand, Iran was not only strong but prosperous, respected among the great powers of the earth, and open to the world in a way it had not been for centuries.' },
        ] },
      ],
    },
    {
      key: 'sf4',
      title: 'Isfahan, Half the World',
      subtitle: 'The jewel of the empire',
      pages: [
        { blocks: [
          { t: 'p', x: 'Of all that Shah Abbas achieved, none endures more beautifully than his capital. He made Isfahan the seat of his empire and set out to make it the most beautiful city on earth, and by the judgment of many who saw it, he succeeded.' },
          { t: 'img', key: 'safavid-isfahan', cap: 'Isfahan, the capital of Shah Abbas, one of the most beautiful cities ever built.' },
          { t: 'p', x: 'So great was its splendour that a saying arose, repeated by travellers across the world, that captured the wonder of all who beheld it.' },
        ] },
        { blocks: [
          { t: 'quotebig', x: 'Isfahan is half the world.', by: 'A SAYING OF THE AGE' },
          { t: 'p', x: 'At the heart of the city he laid out a vast royal square, the Naqsh-e Jahan, the Image of the World, one of the largest and most magnificent public squares ever built. Around it he raised buildings of such beauty that they remain, to this day, among the treasures of all humanity.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Wonders in tile and stone' },
          { t: 'p', x: 'On the square rose the great Shah Mosque, its dome and portals covered in dazzling blue tilework, a masterpiece of Persian architecture. Nearby stood the exquisite Sheikh Lotfollah Mosque, the graceful Ali Qapu palace, and the entrance to the endless royal bazaar.' },
          { t: 'imgrow', keys: ['safavid-mosque-1', 'safavid-mosque-2'], cap: 'The great mosques of Isfahan, masterpieces of blue tilework raised under Shah Abbas.' },
          { t: 'p', x: 'He built bridges across the river that were themselves works of art, and gardens and avenues that made the city a paradise. The mastery of the Persian artist reached its very summit here, in colour, in geometry, and in grace.' },
        ] },
        { blocks: [
          { t: 'keyvalue', items: [
            { k: 'The square', v: 'Naqsh-e Jahan, the Image of the World' },
            { k: 'The great mosque', v: 'The Shah Mosque, in blue tile' },
            { k: 'The saying', v: 'Isfahan is half the world' },
            { k: 'Today', v: 'A treasure of world heritage' },
          ] },
          { t: 'p', x: 'The Isfahan of Shah Abbas still stands, and still takes the breath away. To walk its great square is to step into the golden age of Iran, and to see what the Persian genius could raise when it reached its height.' },
        ] },
      ],
    },
    {
      key: 'sf5',
      title: 'The Long Twilight',
      subtitle: '1629 - 1736',
      pages: [
        { blocks: [
          { t: 'p', x: 'No golden age lasts forever. After the death of Shah Abbas the Great in 1629, the empire he had built lived on for another century, still rich, still cultured, still magnificent to behold. But its strength slowly ebbed away.' },
          { t: 'p', x: 'The later kings were, too often, men raised in the ease of the palace rather than the hardship of the field. Some were gifted, but few had the iron of Abbas, and the vigour that had carried the dynasty to greatness gradually faded.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The fall of Isfahan' },
          { t: 'p', x: 'The end, when it came, was sudden and sorrowful. In 1722 an army of Afghan rebels marched on the heart of the empire and laid siege to Isfahan itself. After months of terrible hunger, the jewel of Iran, the city that was half the world, fell.' },
          { t: 'p', x: 'It was a bitter blow to a proud nation, and it marked the effective end of Safavid power. The dynasty lingered a few years more in name, but its greatness was gone.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Safavids, the dynasty that raised Iran from division into unity, and from weakness into one of the golden ages of its long history. They gave the nation its faith, its renewed strength, and in Isfahan a beauty that has never been surpassed.' },
          { t: 'p', x: 'For two centuries they made Iran a great power and a wonder of the world, and though their empire fell, what they built endures. In the blue domes of Isfahan, the golden age of the Safavids still shines.' },
          { t: 'pull', x: 'They made Iran whole again, and left it a beauty that still shines.' },
        ] },
      ],
    },
  ],
};

const qajar: Topic = {
  key: 'qajar-dynasty',
  category: 'history',
  name: 'The Qajar Dynasty',
  persian: 'قاجاریان',
  years: '1789 - 1925',
  essence: 'The dynasty that ruled Iran through a long and difficult century, caught between the great powers, until the ground was laid for a new age.',
  cover: 'qajar-cover',
  closing: 'qajar-cover',
  status: 'ready',
  sources: [
    'The historical record of the Qajar era',
    'Contemporary Persian and European accounts',
    'Abbas Amanat, Pivot of the Universe',
  ],
  chapters: [
    {
      key: 'qj1',
      title: 'A New Dynasty from the North',
      subtitle: '1789 - 1834',
      pages: [
        { blocks: [
          { t: 'p', x: 'After the gentle Zand dynasty fell, a harder power rose to take its place. Agha Mohammad Khan, chief of the Qajar tribe of the north, fought his way to mastery over Iran and had himself crowned Shah in the last years of the eighteenth century.' },
          { t: 'p', x: 'He was a ruler of iron will and, by all accounts, fearsome cruelty, forged in a lifetime of struggle and captivity. But he reunited a country that had again fallen into division, and he founded a dynasty that would rule Iran for well over a century.' },
          { t: 'splitimg', key: 'qajar-agha-mohammad', title: 'The founder', x: 'Agha Mohammad Khan reunited Iran by force and founded the Qajar line, though he did not live long to enjoy his throne. He was assassinated in 1797, soon after his coronation.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A capital named Tehran' },
          { t: 'p', x: 'It was the Qajars who chose as their capital a modest town in the north of Iran, one that would grow, over their long rule and the ages after, into the great metropolis of the nation. That town was Tehran, and it has been the heart of Iran ever since.' },
          { t: 'markline', x: 'Under the Qajars, Tehran became the capital it remains to this day.' },
          { t: 'p', x: 'The crown passed to Fath Ali Shah, whose long reign was famous for its splendour and ceremony, its jewelled court and its portraits of a bearded king in golden robes. But beyond the glitter of the court, storm clouds were gathering on the horizon.' },
        ] },
      ],
    },
    {
      key: 'qj2',
      title: 'Caught Between Empires',
      subtitle: '1804 - 1828',
      pages: [
        { blocks: [
          { t: 'p', x: 'The nineteenth century was the age of the great European empires, and Iran found itself caught between two of the hungriest. To the north loomed the vast and expanding empire of Russia. To the east and south stretched the power of the British, masters of India.' },
          { t: 'p', x: 'Between these two giants, Iran was squeezed, courted, and pressured, its fate bound up in a great game of empires that it had not the strength to control. It was a hard and humbling position for a proud and ancient nation.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The wars with Russia' },
          { t: 'p', x: 'Twice in the early century Iran went to war with Russia over the lands of the Caucasus, and twice it was defeated by the superior arms and organization of the Russian armies. The cost of those defeats was severe, and it was paid in Iranian soil.' },
          { t: 'numstat', items: [
            { n: '1813', label: 'The Treaty of Gulistan, after the first war' },
            { n: '1828', label: 'The Treaty of Turkmenchay, after the second' },
            { n: 'Caucasus', label: 'Georgia, and much of the Caucasus, lost' },
            { n: 'Capitulations', label: 'Special rights granted to foreign powers' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'By the Treaty of Turkmenchay, one of the most painful in Iranian history, Iran gave up its claims to the rich lands of the Caucasus and granted Russia sweeping privileges. It was a wound to national pride that would not soon heal, and a sign of how far the balance had tipped against Iran.' },
          { t: 'markline', x: 'A proud nation learned, painfully, that valour alone could not stand against modern empires.' },
        ] },
      ],
    },
    {
      key: 'qj3',
      title: 'The Reformer Who Was Lost',
      subtitle: '1848 - 1851',
      pages: [
        { blocks: [
          { t: 'p', x: 'Not everyone accepted Iran\'s decline. In the middle of the century there rose a man who saw clearly what his country needed, and who tried, in a few short years, to drag it into the modern world. His name was Amir Kabir, and he was the chief minister of the young Shah, Naser al-Din.' },
          { t: 'splitimg', key: 'qajar-amir-kabir', title: 'Amir Kabir', x: 'A brilliant and honest statesman, Amir Kabir set out to reform Iran root and branch: its army, its finances, its industry, and its schools. He is remembered as one of the greatest reformers in the nation\'s history.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A vision of a modern Iran' },
          { t: 'p', x: 'In his brief time in power, Amir Kabir accomplished a remarkable amount. He founded the Dar ol-Fonun, the first modern institution of higher learning in Iran, a school of science, engineering, and medicine that would shape generations. He reformed the treasury, curbed corruption, and worked to build modern industry.' },
          { t: 'duo', left: { title: 'His vision', x: 'A modern, independent, educated Iran, strong enough to stand on its own among the nations.' }, right: { title: 'His enemies', x: 'A jealous court that feared his power and honesty, and whispered against him to the young king.' } },
        ] },
        { blocks: [
          { t: 'p', x: 'But his very success made him enemies. The courtiers whose corruption he threatened, and who feared his influence over the young Shah, turned the king against him. In 1851 he was dismissed, exiled, and soon after put to death on the Shah\'s order, in a bath house in Kashan.' },
          { t: 'markline', x: 'Iran lost, in one stroke, the greatest reformer of its age. It is one of history\'s saddest what-ifs.' },
          { t: 'p', x: 'What Iran might have become, had Amir Kabir been allowed to finish his work, is one of the great questions of the nation\'s history. His death was a tragedy, and the reforms he began were largely undone.' },
        ] },
      ],
    },
    {
      key: 'qj4',
      title: 'The Awakening of a Nation',
      subtitle: '1890 - 1911',
      pages: [
        { blocks: [
          { t: 'p', x: 'As the century wore on, the kings sold ever more of the nation\'s wealth and rights to foreign powers and companies, granting concessions over tobacco, banking, oil, and more, to fill an empty treasury. But the people of Iran were beginning to stir.' },
          { t: 'h', x: 'The Tobacco Protest' },
          { t: 'p', x: 'In 1890 the Shah granted a sweeping monopoly over all Iranian tobacco to a British company. The nation erupted. Led by the clergy and the merchants, Iranians of every class joined a boycott so complete that, it is said, even the women of the royal harem refused to smoke. The Shah was forced to cancel the concession.' },
          { t: 'markline', x: 'For the first time, the people had spoken with one voice, and the throne had been made to listen.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The Constitutional Revolution' },
          { t: 'p', x: 'The Tobacco Protest was only the beginning. The demand grew for a government of laws rather than the whim of kings, and in 1906 the movement triumphed. The Shah was compelled to grant a constitution and to establish the Majles, the national parliament, the first in Iranian history.' },
          { t: 'ribbon', items: [
            { year: '1890', label: 'The Tobacco Protest unites the nation against a foreign monopoly' },
            { year: '1906', label: 'The Constitutional Revolution wins a constitution and a parliament' },
            { year: '1908', label: 'The Shah strikes back, and the parliament is bombarded' },
            { year: '1909', label: 'The constitutionalists retake Tehran and restore the Majles' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'It was a hard-won and fragile victory, and the struggle between the crown and the constitution would go on for years, with the parliament even bombarded at one point by Russian-officered forces. But something fundamental had changed. The idea had taken root that the people, not the king alone, were the source of authority in Iran.' },
          { t: 'markline', x: 'A nation had awoken to the idea that it belonged to its people.' },
        ] },
      ],
    },
    {
      key: 'qj5',
      title: 'The End of an Age',
      subtitle: '1911 - 1925',
      pages: [
        { blocks: [
          { t: 'p', x: 'The final years of the Qajars were the hardest of all. During the First World War, though Iran declared its neutrality, the armies of Russia, Britain, and the Ottomans marched across its soil at will, and famine and disorder swept the land. The Qajar state had become too weak to protect its own people.' },
          { t: 'numstat', items: [
            { n: 'WWI', label: 'Foreign armies cross a neutral Iran' },
            { n: 'Famine', label: 'Disorder and hunger grip the land' },
            { n: '1921', label: 'A coup led by Reza Khan' },
            { n: '1925', label: 'The Qajar dynasty ends' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A soldier steps forward' },
          { t: 'p', x: 'Out of this chaos, in 1921, stepped a commander of the Cossack Brigade named Reza Khan, who marched on Tehran and seized the initiative. For a few years he ruled in the shadow of the last, powerless Qajar king. Then, in 1925, the parliament set the old dynasty aside and raised him to the throne as Reza Shah Pahlavi.' },
          { t: 'markline', x: 'The Qajar century closed, and the Pahlavi age of modern Iran began.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Qajars, who ruled Iran through a long and testing century. It was, in many ways, an age of hardship and decline, of lost wars and foreign pressure. Yet it was also the age in which the Iranian nation awoke, demanded a voice in its own affairs, and won its first constitution.' },
          { t: 'p', x: 'From the trials of the Qajar century, a new and modern Iran was struggling to be born. And when at last it emerged, it would carry forward both the wounds and the awakenings of these long and difficult years.' },
          { t: 'pull', x: 'In its century of hardship, the nation found its own voice.' },
        ] },
      ],
    },
  ],
};

const sasanian: Topic = {
  key: 'sasanian-empire',
  category: 'history',
  name: 'The Sasanian Empire',
  persian: 'ساسانیان',
  years: '224 - 651 CE',
  essence: 'The last great empire of pre-Islamic Iran, a rival of Rome and a golden age of Persian culture, faith, and art, until the coming of Islam changed the nation forever.',
  cover: 'sasanian-cover',
  closing: 'sasanian-cover',
  status: 'ready',
  sources: [
    'The historical record of the Sasanian era',
    'Roman and Persian accounts of the age',
    'The Shahnameh of Ferdowsi',
    'Touraj Daryaee, Sasanian Persia',
  ],
  chapters: [
    {
      key: 'ss1',
      title: 'The Rebirth of Persia',
      subtitle: '224 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'For nearly five centuries after Alexander, the glory of Cyrus and Darius had faded. Iran was ruled first by Greek kings and then by the Parthians, a capable but loosely bound dynasty. The memory of the great Persian Empire lived on, but its full splendour had dimmed.' },
          { t: 'p', x: 'Then, in 224 CE, a prince from the south, from the very heartland of Persia where Cyrus had once ruled, rose up and restored the ancient glory. His name was Ardashir, and he founded the Sasanian dynasty, the last and one of the greatest of the pre-Islamic Persian empires.' },
          { t: 'splitimg', key: 'sasanian-ardashir', title: 'Ardashir I', x: 'Ardashir overthrew the Parthians and founded a new empire that consciously looked back to the Achaemenids of Cyrus and Darius, seeking to restore the true glory of Persia.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A conscious return to greatness' },
          { t: 'p', x: 'The Sasanians saw themselves as the true heirs of the ancient Persian kings. They revived the old titles, the old glory, and the old faith, and set out to build an empire worthy of the Achaemenid name. Under them, Persia was reborn as a great power of the world.' },
          { t: 'markline', x: 'After five centuries, the true glory of Persia rose again.' },
          { t: 'p', x: 'For more than four hundred years the Sasanians would rule a vast and brilliant empire, stretching across the Iranian plateau and beyond, a civilization of magnificent cities, learning, and art that shaped the world far beyond its borders.' },
        ] },
      ],
    },
    {
      key: 'ss2',
      title: 'The Faith of the Sacred Fire',
      subtitle: 'The soul of Sasanian Iran',
      pages: [
        { blocks: [
          { t: 'p', x: 'At the very heart of the Sasanian world lay a faith of great antiquity and beauty: Zoroastrianism, the religion of the prophet Zarathustra, which the Persians had followed for more than a thousand years. Under the Sasanians it became the official faith of the empire, woven into the state itself.' },
          { t: 'p', x: 'It is one of the oldest revealed religions in the world, and among the most influential. It taught of a single supreme God, Ahura Mazda, the Wise Lord, and of the eternal struggle between truth and light on one side, and falsehood and darkness on the other, a struggle in which every person must choose their part.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Good thoughts, good words, good deeds' },
          { t: 'p', x: 'At the core of the faith was a simple and beautiful ideal, that a good life is built on three things: good thoughts, good words, and good deeds. Fire, as the symbol of divine light and purity, was honored in great fire temples that burned across the land, tended by priests and never allowed to go out.' },
          { t: 'markline', x: 'Good thoughts, good words, good deeds.' },
          { t: 'splitimg', key: 'sasanian-fire-temple', title: 'The sacred fire', x: 'Great fire temples burned across the empire, their flames a symbol of the divine light. Some, it was said, had burned without pause for centuries.' },
        ] },
        { blocks: [
          { t: 'p', x: 'The influence of this ancient faith reached far beyond Iran. Its ideas of a single God, of heaven and hell, of angels, of a final judgment, and of a savior to come, are believed by many scholars to have shaped the great religions that followed. The spiritual legacy of Zoroastrian Persia lives on in the faith of much of the world to this day.' },
          { t: 'call', title: 'A faith worthy of its own telling', x: 'Zoroastrianism is one of the great treasures of Iranian heritage, and its full story, its prophet, its scripture, and its enduring influence, deserves a telling all its own, which it will one day have.' },
        ] },
      ],
    },
    {
      key: 'ss3',
      title: 'The Rival of Rome',
      subtitle: '3rd - 6th century',
      pages: [
        { blocks: [
          { t: 'p', x: 'For over four hundred years, the Sasanian Empire stood as the great rival of Rome, and later of its successor, the Byzantine Empire. These were the two superpowers of the ancient world, and between them stretched a frontier contested in war after war across the centuries.' },
          { t: 'p', x: 'It was a rivalry of equals, and Persia gave as good as it got. In one of the most famous moments of the age, the Sasanian king Shapur the Great defeated and captured the Roman emperor Valerian himself, an almost unthinkable humiliation for Rome, and a triumph carved in stone in the cliffs of Iran, where it can still be seen today.' },
        ] },
        { blocks: [
          { t: 'splitimg', key: 'sasanian-shapur', title: 'Shapur I', x: 'Shapur the Great defeated three Roman emperors and captured one, Valerian, in battle. His victories are carved into the rock reliefs of Persia, where they endure to this day.' },
          { t: 'numstat', items: [
            { n: '3', label: 'Roman emperors defeated by Shapur I' },
            { n: '260 CE', label: 'The Roman emperor Valerian captured' },
            { n: '400+', label: 'Years as a great world power' },
            { n: 'Rome', label: 'Its equal and rival for centuries' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'A golden age of civilization' },
          { t: 'p', x: 'The Sasanian centuries were a golden age of Persian civilization. Their capital, Ctesiphon, was one of the greatest cities in the world, home to the mighty arch of Taq Kasra, the largest brick vault ever built, which still stands after seventeen hundred years.' },
          { t: 'p', x: 'They were patrons of learning who welcomed scholars from across the world, gathered and translated the knowledge of Greece, India, and beyond, and advanced medicine, astronomy, and philosophy. Persian art, music, silverwork, and textiles of this age were treasured from Rome to China. It was one of the summits of the ancient world.' },
          { t: 'markline', x: 'From Rome to China, the world knew the splendour of Sasanian Persia.' },
        ] },
      ],
    },
    {
      key: 'ss4',
      title: 'The Last Glory and the Long War',
      subtitle: '531 - 628 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'The empire reached its final height under the great king Khosrow the First, remembered as Anushirvan, the Immortal Soul, a byword for justice and wisdom for centuries after. Under him the empire was reformed, learning flourished, and Persia stood at the very peak of its power and prestige.' },
          { t: 'splitimg', key: 'sasanian-khosrow', title: 'Khosrow Anushirvan', x: 'Khosrow the First was remembered across the East as the model of the just and wise king. Under him, Sasanian Persia reached its golden height.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The war that exhausted two empires' },
          { t: 'p', x: 'But the long rivalry with the Romans was to prove fatal to both. In the early seventh century, the Sasanians under Khosrow the Second launched a vast war against the Byzantine Empire, and at first they triumphed spectacularly, conquering Egypt, Syria, and the Holy Land, and reaching the very walls of Constantinople.' },
          { t: 'ribbon', items: [
            { year: '602', label: 'The last great war with Byzantium begins' },
            { year: '614', label: 'Persia conquers Jerusalem and the Holy Land' },
            { year: '626', label: 'The Sasanian army reaches Constantinople' },
            { year: '628', label: 'The war collapses; both empires lie exhausted' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'Then the tide turned. The Byzantine emperor struck back and carried the war deep into the heart of Persia. When at last the fighting ended, after twenty six years, both great empires were utterly exhausted, their treasuries empty, their armies bled white, their people weary of endless war.' },
          { t: 'markline', x: 'The two great powers of the world had fought each other to the point of ruin.' },
          { t: 'p', x: 'Neither empire knew it, but a new power was rising in the deserts of Arabia to the south, one that would sweep away the exhausted old order and change the world forever.' },
        ] },
      ],
    },
    {
      key: 'ss5',
      title: 'The Coming of Islam',
      subtitle: '633 - 651 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the deserts of Arabia, a new faith had been born. Islam had united the Arab tribes as never before, and filled them with a burning purpose. In the 630s, the armies of the young Muslim state burst out of Arabia, and they turned toward the two exhausted empires to the north.' },
          { t: 'p', x: 'The Sasanian Empire, drained by its long war with Byzantium and weakened by years of turmoil at its court, was not the power it had been. Yet few could have imagined how swiftly the ancient empire would fall.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The battle that decided an empire' },
          { t: 'p', x: 'The decisive blow came at the battle of Qadisiyyah, around the year 636, where the main Sasanian army met the Arab forces. After days of hard fighting, the Persian army was broken. The road to the capital lay open, and the great city of Ctesiphon fell to the conquerors.' },
          { t: 'numstat', items: [
            { n: '636', label: 'The battle of Qadisiyyah breaks the Persian army' },
            { n: '637', label: 'The capital, Ctesiphon, falls' },
            { n: '642', label: 'The battle of Nahavand, the final defeat' },
            { n: '651', label: 'The last Sasanian king dies; the empire ends' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The end of an age' },
          { t: 'p', x: 'The last Sasanian king, Yazdegerd the Third, fled eastward across his crumbling empire, seeking in vain to raise an army to turn back the tide. He was pursued from city to city, and in 651, abandoned and alone, he was killed near the far eastern city of Merv. With his death, four centuries of Sasanian rule, and more than a thousand years of the Persian Zoroastrian empire, came to an end.' },
          { t: 'markline', x: 'An empire that had rivalled Rome for four hundred years had fallen in a single generation.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'The conquest changed Iran forever. Over the generations that followed, Islam gradually became the faith of the Iranian people, and the sacred fires of Zoroastrianism, which had burned for over a thousand years, slowly dimmed. The old faith did not vanish, and its communities endure to this day, but it was no longer the soul of the state.' },
          { t: 'p', x: 'What followed was a long and difficult age, sometimes called the two centuries of silence, when the Persian language and the Persian voice seemed to grow quiet under the new order. Yet Iran did not disappear. Its language, its poetry, its memory, and its spirit endured beneath the surface, and in time they would rise again, transformed, to shape a new and lasting Iranian civilization.' },
          { t: 'pull', x: 'The empire fell, but the soul of Iran endured, and would one day speak again.' },
        ] },
      ],
    },
  ],
};

const silence: Topic = {
  key: 'two-centuries-silence',
  category: 'history',
  name: 'Two Centuries of Silence',
  persian: 'دو قرن سکوت',
  years: '651 - 900 CE',
  essence: 'The long, quiet age after the fall of Persia, when a conquered people held fast to their soul, until a poet gave them back their voice.',
  cover: 'silence-cover',
  closing: 'silence-ferdowsi',
  status: 'ready',
  sources: [
    'Abdolhossein Zarrinkoub, Two Centuries of Silence',
    'The Shahnameh of Ferdowsi',
    'The historical record of early Islamic Iran',
  ],
  chapters: [
    {
      key: 'tc1',
      title: 'The Silence Falls',
      subtitle: 'After the fall',
      pages: [
        { blocks: [
          { t: 'p', x: 'When the last Sasanian king fell and the ancient empire came to its end, a strange and heavy quiet settled over the land of Iran. The throne of Cyrus was gone. The sacred fires that had burned for a thousand years grew dim. A proud and ancient nation found itself, for the first time in its long memory, conquered and ruled by others.' },
          { t: 'p', x: 'The historian who gave this age its name called it the two centuries of silence. It was not that nothing happened, for much did. It was that the voice of Iran itself, its language in the halls of power, its kings, its own telling of its own story, seemed to fall quiet, muffled beneath the weight of conquest.' },
          { t: 'markline', x: 'A nation that had spoken to the world for a thousand years fell suddenly quiet.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A world turned over' },
          { t: 'p', x: 'The change reached into every corner of life. Arabic became the language of government, of learning, and of the new faith. For a Persian of noble memory, it was a hard and disorienting age, to see the ways of a thousand years set aside, and the language of the conquerors rise in their place.' },
          { t: 'p', x: 'Many converted to the new faith, some by conviction, some by the slow pressure of the centuries, some to escape the heavier taxes laid upon those who did not. The Iran of the fire temples faded, and a new, Islamic Iran slowly took its place. It was, for those who lived through it, the passing of an entire world.' },
        ] },
      ],
    },
    {
      key: 'tc2',
      title: 'The Soul That Would Not Die',
      subtitle: 'The quiet endurance',
      pages: [
        { blocks: [
          { t: 'p', x: 'And yet, beneath the silence, something refused to die. A conquered people may lose its throne and even its faith, and still keep its soul. And the soul of Iran, its language, its memory, its sense of who it was, endured stubbornly in the homes and the hearts of ordinary people, passed quietly from parent to child.' },
          { t: 'markline', x: 'They took our throne, but they could not take our language, nor our memory.' },
          { t: 'p', x: 'In the villages and the mountains, in the lullabies of mothers and the tales of grandfathers, the Persian language lived on. The old stories of the kings and heroes of Iran, of Jamshid and Fereydun and Rostam, were still told around the fires at night. The memory of a glorious past was kept alive, a quiet ember waiting for the wind that would make it blaze again.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The stirrings of revival' },
          { t: 'p', x: 'Slowly, over the generations, Iran began to stir. The Persian genius, far from being extinguished, poured itself into the new civilization and helped to build its golden age, its scholars, its poets, its statesmen shaping the culture of the whole Islamic world. Iran was not erased. It was transformed, and it transformed everything it touched.' },
          { t: 'p', x: 'And in the east, in the lands of Khorasan far from the seat of the conquerors, Persian princes began to rule again, and to gather at their courts the poets and scholars who spoke the old tongue. The Samanids and others gave shelter to the Persian language and the Persian spirit, and a great revival began to gather its strength. The silence was ending.' },
          { t: 'ribbon', items: [
            { year: '651', label: 'The fall of the Sasanians; the silence begins' },
            { year: '750', label: 'A new age dawns; Persian influence rises again' },
            { year: '820', label: 'Persian dynasties rule once more in the east' },
            { year: '900', label: 'The Persian language and spirit begin to bloom anew' },
          ] },
        ] },
      ],
    },
    {
      key: 'tc3',
      title: 'The Poet Who Saved a Language',
      subtitle: 'Ferdowsi, c. 977 - 1010',
      pages: [
        { blocks: [
          { t: 'p', x: 'Every people needs a voice to speak its soul, and Iran found hers in one of the greatest poets who ever lived. In the eastern city of Tus, a nobleman set himself a task that would consume more than thirty years of his life, and that would give Iran back its very self.' },
          { t: 'ptext', x: 'His name was {{ferdowsi|Ferdowsi}}, and his task was to gather all the ancient stories of Iran, its myths, its legends, its kings and heroes from the dawn of time to the fall of the Sasanians, and to set them down in Persian verse, in a single great epic. He called it the Shahnameh, the Book of Kings.' },
          { t: 'splitimg', key: 'silence-ferdowsi', title: 'Ferdowsi of Tus', x: 'For over thirty years Ferdowsi labored on the Shahnameh, giving his life to preserve the stories, and the language, of his people.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A book to hold a nation' },
          { t: 'p', x: 'The Shahnameh is one of the longest and greatest epic poems ever composed by a single hand, nearly sixty thousand verses, a whole world of kings and warriors, love and war, tragedy and glory. But it was far more than a collection of stories. It was an act of preservation, and of defiance.' },
          { t: 'p', x: 'For Ferdowsi wrote it in pure Persian, reaching for the old words and turning away from the Arabic that had flooded the language, determined to prove that Persian could carry the whole weight of a nation\'s memory and glory. In giving Iran its epic, he gave it back its language, whole and alive.' },
          { t: 'numstat', items: [
            { n: '30+', label: 'Years of his life given to the work' },
            { n: '~60,000', label: 'Verses in the Shahnameh' },
            { n: '1,000+', label: 'Years it has been loved, unbroken' },
            { n: 'One', label: 'Book that saved a language' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'There is a line, long attributed to him, that captures all he did and all he hoped. Having labored so long, he looked upon his finished work and understood what he had built, a monument no conqueror could throw down.' },
          { t: 'quotebig', x: 'I have suffered greatly these thirty years, but I have revived the Persians with this Persian tongue.', by: 'ATTRIBUTED TO FERDOWSI' },
        ] },
      ],
    },
    {
      key: 'tc4',
      title: 'The Voice Returns',
      subtitle: 'The legacy',
      pages: [
        { blocks: [
          { t: 'p', x: 'Ferdowsi died, it is said, without the reward he had been promised, and legend tells that the gift arrived at the gate of his city just as his funeral procession left it. But he had won a prize greater than gold. He had given his people back their voice, and it would never fall silent again.' },
          { t: 'p', x: 'Because of the Shahnameh, the Persian language survived, flourished, and became one of the great literary tongues of the world. The poets who came after, Rumi, Hafez, Saadi, Khayyam, all wrote in the language that Ferdowsi had saved. Every Persian word of beauty spoken in the thousand years since owes something to the poet of Tus.' },
          { t: 'markline', x: 'The two centuries of silence ended, and Iran has never stopped speaking since.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the two centuries of silence, and of its ending. It is, in truth, one of the most moving stories in all of Iran\'s long history, the story of a people who lost everything but their soul, who held that soul in secret through the long dark, and who found in a single devoted poet the voice to speak it aloud once more.' },
          { t: 'p', x: 'Iran did not survive the conquest by resisting change, but by absorbing it, transforming it, and remaining, through it all, unmistakably itself. The silence was real, and it was long. But it was not the end. It was the deep breath before the nation spoke again, and what it said next would be beautiful beyond measure.' },
          { t: 'pull', x: 'A people held their soul through the long silence, and a poet gave them back their voice.' },
        ] },
      ],
    },
  ],
};

const parthian: Topic = {
  key: 'parthian-empire',
  category: 'history',
  name: 'The Parthian Empire',
  persian: 'اشکانیان',
  years: '247 BCE - 224 CE',
  essence: 'The empire of horsemen and archers that reclaimed Iran from Greek rule, held Rome at bay for centuries, and kept the Persian spirit alive between two golden ages.',
  cover: 'parthian-cover',
  closing: 'parthian-cover',
  status: 'ready',
  sources: [
    'Greek and Roman accounts of the age',
    'The historical record of the Parthian era',
    'The Shahnameh of Ferdowsi',
  ],
  chapters: [
    {
      key: 'pt1',
      title: 'Iran Under Foreign Kings',
      subtitle: 'After Alexander',
      pages: [
        { blocks: [
          { t: 'p', x: 'When Alexander of Macedon defeated the last Achaemenid king, the empire that Cyrus had built passed into foreign hands. After Alexander\'s death his generals divided his conquests, and Iran fell to the Seleucids, a Greek dynasty who ruled the ancient land of Persia as outsiders.' },
          { t: 'p', x: 'For a time, Greek kings sat where the Persian kings of kings had ruled. Greek became the language of the court, Greek cities rose across the plateau, and the proud heartland of Cyrus and Darius answered to masters from a distant western land.' },
          { t: 'markline', x: 'The land of Cyrus, for the first time, obeyed foreign kings.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A people from the steppe' },
          { t: 'p', x: 'But Iran would not stay in foreign hands. From the northeast, from the wide grasslands beyond the Caspian, came a people of hardy nomadic horsemen: the Parni, led by a chief named Arsaces. Around the middle of the third century BCE, they swept into the region of Parthia and threw off Greek rule.' },
          { t: 'p', x: 'From that homeland the dynasty took its name, and Arsaces gave his to the line of kings who followed, the Arsacids. From these beginnings, a small rebellion on the edge of a Greek empire, would grow one of the great powers of the ancient world.' },
          { t: 'imgwide', key: 'parthian-arsaces', cap: 'Arsaces I, chief of the Parni, founded the dynasty that would drive the Greeks from Iran and rule for nearly five centuries.' },
        ] },
      ],
    },
    {
      key: 'pt2',
      title: 'The Reconquest of a Homeland',
      subtitle: '2nd century BCE',
      pages: [
        { blocks: [
          { t: 'p', x: 'What began as a frontier revolt became, over the generations, the reconquest of an entire empire. The Parthian kings pushed steadily westward and southward, city by city and province by province, driving back the weakening Greek Seleucids and restoring Iranian rule over the ancient Persian lands.' },
          { t: 'p', x: 'The greatest of these early kings was Mithridates the First, who in the second century BCE transformed the Parthian realm from a kingdom into an empire, taking the rich lands of Mesopotamia and the title, once more, of a great Iranian king.' },
        ] },
        { blocks: [
          { t: 'ribbon', items: [
            { year: '247 BCE', label: 'Arsaces founds the Parthian state' },
            { year: '171 BCE', label: 'Mithridates I begins the great expansion' },
            { year: '141 BCE', label: 'The Parthians take Mesopotamia and Babylon' },
            { year: '1st c. BCE', label: 'Parthia stands as a great world power' },
          ] },
          { t: 'p', x: 'Under the Parthians, Iran was Iranian once more. Though they had absorbed much from the Greek world, and long kept Greek styles at their court, they revived the old Iranian ways, honored the ancient faith, and cherished the memory of the Achaemenid past. The Persian spirit, which had bent under Greek rule, straightened again.' },
          { t: 'markline', x: 'From horsemen of the steppe rose the empire that made Iran Iranian again.' },
        ] },
      ],
    },
    {
      key: 'pt3',
      title: 'The Wall Against Rome',
      subtitle: '53 BCE onward',
      pages: [
        { blocks: [
          { t: 'p', x: 'As Parthia rose in the east, a new power was rising in the west: Rome, the greatest empire the Mediterranean world had ever known. The two great powers met at the river Euphrates, and there began one of the longest rivalries in ancient history, Rome and Parthia, west and east, for nearly three hundred years.' },
          { t: 'p', x: 'Rome, used to conquering all before it, found in Parthia an equal it could not overcome. Again and again the legions marched east, and again and again the Parthians turned them back. The Euphrates became the wall against which Roman ambition broke.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The disaster at Carrhae' },
          { t: 'p', x: 'The most famous clash came in 53 BCE at Carrhae, where the Roman general Crassus, one of the richest and most powerful men in Rome, invaded with a mighty army. There the Parthians taught Rome a lesson it never forgot. Their horse archers rained arrows upon the legions, and their heavy armored cavalry shattered them. The Roman army was destroyed, and Crassus was killed.' },
          { t: 'numstat', items: [
            { n: '53 BCE', label: 'The battle of Carrhae' },
            { n: 'Crassus', label: 'The Roman commander slain' },
            { n: '~300', label: 'Years Parthia held Rome at bay' },
            { n: 'Euphrates', label: 'The frontier Rome could not cross' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The Parthian shot' },
          { t: 'p', x: 'The Parthians were among the finest horsemen the world had ever seen, and they gave the world a phrase still used today. Their riders would feign retreat at a gallop, then twist backward in the saddle to loose a deadly arrow at the pursuing enemy. This maneuver, the Parthian shot, was so famous it entered the languages of Europe, a parting blow delivered in the very act of withdrawal.' },
          { t: 'markline', x: 'They mastered the art of striking hardest at the moment they seemed to flee.' },
        ] },
      ],
    },
    {
      key: 'pt4',
      title: 'Crossroads of the World',
      subtitle: 'The Parthian peace',
      pages: [
        { blocks: [
          { t: 'p', x: 'The Parthian Empire sat astride the greatest trade route in the world: the Silk Road, the long ribbon of commerce that linked the empires of Rome and China. Through Parthian lands passed the silk of the east and the gold of the west, and the empire grew rich as the great middleman of the world.' },
          { t: 'p', x: 'The Parthians guarded and profited from this trade, and their cities flourished as bustling crossroads where the goods, ideas, and peoples of half the world met and mingled. Iran was, once again, a bridge between civilizations, as it had been under Cyrus and would be again.' },
          { t: 'splitimg', key: 'parthian-silkroad', title: 'The Silk Road', x: 'The wealth of the Silk Road flowed through Parthian hands, linking Rome and China through the heart of Iran.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A looser kind of empire' },
          { t: 'p', x: 'Parthia was not a tightly centralized realm like the empires before and after it. It was more a family of kingdoms and noble houses, bound in loyalty to the Arsacid king of kings, with powerful local lords holding great sway. This gave the empire resilience, but also, in the end, a certain fragility, as the great houses and rival claimants fought among themselves.' },
          { t: 'p', x: 'For all its strength against Rome, the empire was often divided within, and its long centuries were marked by civil wars and contested successions that slowly wore at its foundations.' },
        ] },
      ],
    },
    {
      key: 'pt5',
      title: 'The Passing of the Torch',
      subtitle: '224 CE',
      pages: [
        { blocks: [
          { t: 'p', x: 'After nearly five hundred years, the Parthian Empire grew weary. Weakened by endless wars with Rome and by its own internal divisions, the once mighty realm was ripe for change. And change came, as it so often did in Iran, from the ancient heartland of Persia in the south.' },
          { t: 'p', x: 'There, a prince named Ardashir rose in rebellion. In 224 CE he defeated the last Parthian king in battle, and upon the ruins of the Arsacid realm he raised a new empire, the Sasanian, which would carry Persia to fresh heights of glory.' },
          { t: 'markline', x: 'One Iranian empire gave way to another, and the flame passed on.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Parthians, an empire too often overlooked, standing as it does between the dazzling glory of Cyrus and the splendour of the Sasanians. Yet their achievement was immense. In an age when Iran might have been swallowed by the Greek and Roman west, they reclaimed the homeland, revived the Iranian spirit, and stood for centuries as the unbreakable wall of the east.' },
          { t: 'p', x: 'They kept the flame of Iran burning through the long centuries between two golden ages, and they handed it on, undimmed, to those who followed. Without the horsemen of Parthia, the story of Iran might have ended long ago.' },
          { t: 'pull', x: 'They kept the flame of Iran alive, and passed it on undimmed.' },
        ] },
      ],
    },
  ],
};

const afsharid: Topic = {
  key: 'afsharid-dynasty',
  category: 'history',
  name: 'The Afsharid Dynasty',
  persian: 'افشاریان',
  years: '1736 - 1796',
  essence: 'The dynasty of Nader Shah, the shepherd boy who became the last great conqueror of the East, and one of the most brilliant and terrible military minds in history.',
  cover: 'afsharid-cover',
  closing: 'afsharid-cover',
  status: 'ready',
  sources: [
    'The historical record of the Afsharid era',
    'Contemporary Persian and European accounts',
    'Michael Axworthy, The Sword of Persia',
  ],
  chapters: [
    {
      key: 'af1',
      title: 'From Shepherd to Warlord',
      subtitle: 'c. 1698 - 1729',
      pages: [
        { blocks: [
          { t: 'p', x: 'He was born into poverty in the northern lands of Khorasan, a boy of a humble tribe named Afshar, in a time of chaos. As a child, it is said, he and his mother were carried off by raiders and enslaved, and he escaped to make his own way in a broken world. From these lowest of beginnings would rise the most feared conqueror of his age.' },
          { t: 'p', x: 'His name was Nader. Tall, powerful, and possessed of a will of iron and a genius for war, he rose through sheer ability in a land that had fallen into anarchy. When the Safavid Empire collapsed and Afghan invaders seized the throne of Iran, it was Nader, a warlord commanding his own band of fighters, who would answer the call to save the nation.' },
          { t: 'splitimg', key: 'afsharid-nader-young', title: 'Nader of the Afshar', x: 'Born in poverty and once a captive, Nader rose by his genius for war to command armies and, in time, an empire.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The savior of Iran' },
          { t: 'p', x: 'Iran in the 1720s was a nation on its knees. The proud Safavid Empire had fallen to a band of Afghan rebels, foreign powers circled to seize its lands, and the country lay open to ruin. Into this darkness stepped Nader, offering his sword to a Safavid prince and swiftly becoming the true power behind the throne.' },
          { t: 'p', x: 'With a reborn army trained to his own exacting standard, he drove the Afghan occupiers out of Iran, then turned on the Ottomans and the Russians who had seized Iranian lands in the time of weakness, and won them back one by one. In a few short years, he had raised Iran from the grave.' },
          { t: 'markline', x: 'A shepherd boy had become the sword that saved a nation.' },
        ] },
      ],
    },
    {
      key: 'af2',
      title: 'The Crown and the Conqueror',
      subtitle: '1736',
      pages: [
        { blocks: [
          { t: 'p', x: 'Having saved Iran, Nader saw no reason to hand it back. In 1736, on a great plain where he summoned the nobles of the realm, he had himself proclaimed Shah, setting aside the last of the Safavids and founding his own dynasty, the Afsharid. The captive shepherd boy now wore the crown of the kings of kings.' },
          { t: 'keyvalue', items: [
            { k: 'Crowned', v: '1736, on the Moghan plain' },
            { k: 'Origin', v: 'A humble tribe of Khorasan' },
            { k: 'Genius', v: 'One of history\'s great commanders' },
            { k: 'Ambition', v: 'To rival the conquerors of old' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The Napoleon of Persia' },
          { t: 'p', x: 'Historians have called him the Napoleon of Persia, and the comparison is fitting. Like that later conqueror, Nader rose from obscurity by pure military genius, remade the army of his nation, and led it to victories that astonished the world. He was a master of speed, of surprise, and of the bold stroke that broke his enemies before they could gather.' },
          { t: 'p', x: 'His soldiers, hardened by constant campaign and devoted to a leader who shared their every hardship, became the most formidable fighting force in Asia. Under Nader, the armies of Iran marched from victory to victory, and the name of the Persian Shah was feared from the Caucasus to the plains of India.' },
          { t: 'markline', x: 'He remade the army of Iran into the terror of the East.' },
        ] },
      ],
    },
    {
      key: 'af3',
      title: 'The March on India',
      subtitle: '1738 - 1739',
      pages: [
        { blocks: [
          { t: 'p', x: 'Nader\'s most famous campaign was his boldest. In 1738 he led his army eastward, through Afghanistan and over the mountains, and descended upon the vast and fabulously wealthy Mughal Empire of India, the richest realm on earth.' },
          { t: 'p', x: 'At the battle of Karnal, his smaller, hardened army shattered the enormous but unwieldy Mughal host in a single day. The road to Delhi, the jewel of the East, lay open before him.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The treasure of the world' },
          { t: 'p', x: 'Nader entered Delhi in triumph, and the wealth he carried away from it was almost beyond counting, the accumulated treasure of the Mughal emperors gathered over two centuries. The plunder was so immense that, upon his return, he is said to have exempted the people of Iran from taxes for years.' },
          { t: 'numstat', items: [
            { n: '1739', label: 'Nader captures Delhi' },
            { n: 'Karnal', label: 'The Mughal army destroyed in a day' },
            { n: '3 years', label: 'Taxes he waived in Iran from the plunder' },
            { n: 'Untold', label: 'Riches carried home from India' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The Peacock Throne and a mountain of light' },
          { t: 'p', x: 'Among the treasures he took were the most legendary jewels in the world. He carried away the fabled Peacock Throne of the Mughal emperors, glittering with gems, which became the very symbol of the Persian monarchy for centuries after.' },
          { t: 'p', x: 'And among the jewels were two of the most famous diamonds ever known: the Darya-ye Noor, the Sea of Light, which remains in Iran to this day, and the Koh-i-Noor, the Mountain of Light, whose later journey would carry it, in time, to the crown jewels of England. The treasures of Nader\'s Indian campaign became legends in their own right.' },
          { t: 'splitimg', key: 'afsharid-peacock-throne', title: 'The Peacock Throne', x: 'From Delhi, Nader carried home the jewelled Peacock Throne and the legendary diamonds of the Mughals, treasures still spoken of today.' },
        ] },
      ],
    },
    {
      key: 'af4',
      title: 'The Genius and the Shadow',
      subtitle: 'The two faces of Nader',
      pages: [
        { blocks: [
          { t: 'p', x: 'Nader was a man of dazzling gifts, and his mind ranged far beyond the battlefield. He was a military innovator who understood artillery and the modern arts of war better than almost anyone in the East, and he even sought to build a navy for Iran on the Persian Gulf, a rare and forward-looking ambition.' },
          { t: 'p', x: 'He was also, in matters of faith, a pragmatist who tried to heal the ancient rift between the Sunni and Shia branches of Islam, hoping to unite them and end centuries of division, a strikingly bold idea for his age.' },
          { t: 'duo', left: { title: 'The genius', x: 'A brilliant general and innovator who saved Iran, conquered India, and dreamed of a navy and religious peace.' }, right: { title: 'The shadow', x: 'A ruler who grew ever more cruel, suspicious, and tyrannical as the years and the wars wore on.' } },
        ] },
        { blocks: [
          { t: 'h', x: 'The darkening of a great mind' },
          { t: 'p', x: 'But there was a shadow over his greatness, and it grew darker with the years. The endless wars and the burdens of rule seemed to poison his mind. He grew suspicious, harsh, and terribly cruel, crushing his own people with heavy taxes to fund his campaigns and answering the smallest disloyalty with horrifying punishment.' },
          { t: 'p', x: 'In a fit of paranoia he had his own son blinded, suspecting him of treason, a deed he is said to have regretted for the rest of his life. The savior of Iran had become its tormentor, and the brilliant mind that had raised the nation now cast a long and terrible shadow over it.' },
          { t: 'markline', x: 'The sword that saved Iran turned, in the end, against its own people.' },
        ] },
      ],
    },
    {
      key: 'af5',
      title: 'The Fall of the Sword',
      subtitle: '1747',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the end, the fear he inspired was his undoing. By 1747, his cruelty had made him enemies even among his own most trusted officers, who came to believe that none of them was safe from his suspicion. Rather than wait to be struck down, they resolved to strike first.' },
          { t: 'p', x: 'In the night, a band of his own commanders crept into his tent and killed him as he slept. The greatest warrior of the age, who had conquered from the Caucasus to Delhi and whom no enemy could defeat in the field, fell at last to the daggers of his own men.' },
          { t: 'markline', x: 'No enemy could defeat him. Only his own could bring him down.' },
        ] },
        { blocks: [
          { t: 'p', x: 'With Nader\'s death, the empire he had built by the sheer force of his will fell apart almost at once. He had conquered vast lands, but he had not built the institutions to hold them, and without him at their head, they scattered. His dynasty clung to a fragment of power in Khorasan for a few decades more, but its glory had died with its founder.' },
          { t: 'p', x: 'From the chaos that followed his death, in time, would rise the gentle Karim Khan of the Zand, who gave Iran the peace that Nader, for all his conquests, never could.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of Nader Shah and the Afsharids, one of the most extraordinary and complex stories in all of Iranian history. Nader was a shepherd boy who became a conqueror to rival the greatest of the ancient world, a military genius who saved his nation from ruin and carried its banners to the gates of the East.' },
          { t: 'p', x: 'He was also a warning, of how the very brilliance and will that can save a nation can, unchecked, turn to darkness. He remains one of history\'s most dazzling and troubling figures, a comet that blazed across the sky of Iran, brilliant and terrible, and was gone almost as swiftly as it had come.' },
          { t: 'pull', x: 'A shepherd who conquered an empire, and a genius undone by his own shadow.' },
        ] },
      ],
    },
  ],
};

const seljuk: Topic = {
  key: 'seljuk-empire',
  category: 'history',
  name: 'The Seljuk Empire',
  persian: 'سلجوقیان',
  years: '1037 - 1194',
  essence: 'The Turkic dynasty that ruled a vast Islamic empire from Iran, and under whom Persian culture, art, and learning reached a brilliant new height.',
  cover: 'seljuk-cover',
  closing: 'seljuk-cover',
  status: 'ready',
  sources: [
    'The historical record of the Seljuk era',
    'Contemporary Persian and Arabic accounts',
    'The Rubaiyat of Omar Khayyam',
  ],
  chapters: [
    {
      key: 'sj1',
      title: 'Horsemen from the Steppe',
      subtitle: '11th century',
      pages: [
        { blocks: [
          { t: 'p', x: 'From the wide grasslands of Central Asia came a people of nomadic Turkic horsemen, the Seljuks, named for a chieftain of old. Hardy, warlike, and newly devoted to Islam, they swept south and west into the Iranian world in the eleventh century, and within a single generation had built one of the great empires of the age.' },
          { t: 'p', x: 'In 1040 they shattered the armies of the reigning power at the battle of Dandanaqan, and the road into Iran lay open. Under their leader Tughril, they took city after city, until at last Tughril entered Baghdad itself and was named Sultan, protector of the Islamic world.' },
          { t: 'splitimg', key: 'seljuk-tughril', title: 'Tughril Beg', x: 'Tughril led the Seljuks from the steppe into Iran and beyond, founding an empire that stretched from Central Asia to the Mediterranean.' },
        ] },
        { blocks: [
          { t: 'h', x: 'Conquerors who became Persians' },
          { t: 'p', x: 'Here a pattern repeated that runs through all of Iran\'s history. The Seljuks came as foreign conquerors, but they were swiftly captivated by the older and more sophisticated Persian civilization they had overrun. They adopted its language of culture, its arts, its ways of government, and its administrators.' },
          { t: 'markline', x: 'They conquered Iran with the sword, and Iran conquered them with its culture.' },
          { t: 'p', x: 'The conquerors became patrons of Persian civilization, and under their rule, though the sultans were Turks, the soul of the state was Persian. It was a marriage of the vigour of the steppe and the refinement of Iran, and it produced a golden age.' },
        ] },
      ],
    },
    {
      key: 'sj2',
      title: 'The Great Vizier and the Golden Age',
      subtitle: '1063 - 1092',
      pages: [
        { blocks: [
          { t: 'p', x: 'The true architect of the Seljuk golden age was not a sultan but a Persian statesman, one of the greatest administrators in the history of Iran: Nizam al-Mulk, the great vizier who guided the empire at its height for thirty years.' },
          { t: 'splitimg', key: 'seljuk-nizam', title: 'Nizam al-Mulk', x: 'The brilliant Persian vizier who ran the Seljuk Empire for three decades and wrote a famous book on the art of governing.' },
          { t: 'p', x: 'A master of statecraft, he organized the sprawling empire, built roads and institutions, and wrote a celebrated book on the art of government that was studied for centuries. Above all, he founded a network of great colleges, the Nizamiyya, across the empire, among the finest centers of learning in the world of their day.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The age of Khayyam' },
          { t: 'p', x: 'This was an age of extraordinary Persian genius. At the Seljuk court worked Omar Khayyam, one of the most remarkable minds of any age: a brilliant mathematician who advanced algebra, and an astronomer who reformed the calendar into one more accurate than any then known in the world.' },
          { t: 'p', x: 'And Khayyam was also a poet, whose quatrains, the Rubaiyat, meditating on life, time, and the fleeting beauty of the world, would one day be loved across the entire earth. That one man could be at once a great scientist and a great poet is a wonder that captures the spirit of this golden age.' },
          { t: 'numstat', items: [
            { n: 'Algebra', label: 'Khayyam advanced its foundations' },
            { n: 'Calendar', label: 'A reform of astonishing accuracy' },
            { n: 'Rubaiyat', label: 'Poetry beloved around the world' },
            { n: 'One mind', label: 'Scientist and poet at once' },
          ] },
        ] },
        { blocks: [
          { t: 'p', x: 'But the golden age carried the seeds of its own troubles. Nizam al-Mulk was assassinated in 1092, struck down, it is said, by the daggers of a shadowy new sect, the Assassins, who from their mountain fortresses would haunt the region for generations. Soon after, the great sultan died too, and the empire began to fracture among rival heirs.' },
          { t: 'markline', x: 'A golden age of Persian art and science bloomed under the Turkish sultans.' },
        ] },
      ],
    },
    {
      key: 'sj3',
      title: 'The Empire Divides',
      subtitle: '1092 - 1194',
      pages: [
        { blocks: [
          { t: 'p', x: 'After the deaths of the great sultan and his great vizier, the vast Seljuk empire, held together by their skill, began to come apart. It split into smaller kingdoms ruled by rival branches of the family, each holding a piece of the once mighty realm.' },
          { t: 'p', x: 'These successor states carried on the Seljuk legacy for another century, and in places like Anatolia the Seljuk name endured even longer, laying foundations for the Turkish presence there that continues to this day. But the unity of the great empire was gone.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Seljuks, Turkic conquerors who became the great patrons of Persian civilization. Under their rule, Iran\'s culture, art, architecture, and science flourished brilliantly, and its influence spread across a vast empire from Central Asia to the Mediterranean.' },
          { t: 'p', x: 'They showed, as others had before and would again, the deep power of Iranian civilization to absorb and transform its conquerors. The steppe warriors who rode in as foreign masters became, within a generation, the proud custodians of Persian art and learning. It is one of the recurring wonders of Iran\'s long story.' },
          { t: 'pull', x: 'The conquerors came as masters, and stayed as students of Iran.' },
        ] },
      ],
    },
  ],
};

const ilkhanate: Topic = {
  key: 'ilkhanate',
  category: 'history',
  name: 'The Ilkhanate',
  persian: 'ایلخانان',
  years: '1256 - 1335',
  essence: 'The age of the Mongol storm, when Iran suffered one of the greatest catastrophes in its history, and then, astonishingly, tamed and civilized its conquerors.',
  cover: 'ilkhanate-cover',
  closing: 'ilkhanate-cover',
  status: 'ready',
  sources: [
    'The historical record of the Mongol era',
    'Persian chronicles of the age',
    'Rashid al-Din, Compendium of Chronicles',
  ],
  chapters: [
    {
      key: 'il1',
      title: 'The Storm from the East',
      subtitle: '1219 - 1258',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the early thirteenth century, out of the steppes of Mongolia, came the most terrible conquerors the world had ever known. Under Genghis Khan, the Mongols built a war machine of unmatched speed and ferocity, and when their fury turned toward Iran, it fell upon the land like the end of the world.' },
          { t: 'p', x: 'The devastation was almost beyond describing. Great and ancient cities, centers of learning and beauty that had stood for centuries, were destroyed utterly, their people slaughtered, their libraries and canals and treasures reduced to ash and rubble. It was one of the darkest hours in all of Iran\'s long history.' },
          { t: 'markline', x: 'The Mongol storm was one of the greatest catastrophes Iran ever endured.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A wound to a civilization' },
          { t: 'p', x: 'The scale of the ruin was staggering. Cities like Nishapur, Merv, and Rey, jewels of the Persian world, were laid waste, some never to recover. The intricate irrigation systems that had made the land bloom for millennia were shattered, and whole regions were depopulated. A brilliant civilization was struck a blow from which it would take generations to recover.' },
          { t: 'p', x: 'In 1258 the Mongols under Hulagu, grandson of Genghis, took Baghdad, the great seat of the Islamic world, and destroyed it in an orgy of violence that shocked the age. The old order of the Islamic east was swept away, and Iran lay prostrate beneath the conquerors.' },
        ] },
      ],
    },
    {
      key: 'il2',
      title: 'The Taming of the Conquerors',
      subtitle: '1258 - 1335',
      pages: [
        { blocks: [
          { t: 'p', x: 'And then, one of the most remarkable transformations in all of history unfolded. The Mongol rulers of Iran, called the Ilkhans, settled into the land they had ruined, and slowly, over the generations, the ancient magic of Persian civilization worked upon them. The destroyers became rebuilders. The pagan nomads became Persian kings.' },
          { t: 'markline', x: 'The civilization they had nearly destroyed rose up and remade them in its image.' },
          { t: 'p', x: 'The turning point came when the Ilkhan Ghazan converted to Islam and embraced the ways of the land he ruled. Guided by a brilliant Persian vizier, he set about rebuilding what his ancestors had destroyed, reforming the government, restoring the ruined lands, and becoming a patron of Persian art and learning.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A flowering from the ashes' },
          { t: 'p', x: 'What followed was, astonishingly, a cultural golden age. The vizier Rashid al-Din, one of the great minds of the age, composed a monumental history of the world, perhaps the first truly global history ever written, drawing on the knowledge the vast Mongol empire had gathered from China to Europe.' },
          { t: 'p', x: 'Persian painting, enriched now by contact with the art of China, entered one of its most beautiful periods. Architecture, history, and science flourished under Mongol patronage. From the ashes of the greatest catastrophe, Iran had conjured a new flowering of its genius.' },
          { t: 'splitimg', key: 'ilkhanate-rashid', title: 'Rashid al-Din', x: 'The Persian vizier and scholar who wrote a history of the world, and helped transform the Mongol conquerors into patrons of Persian civilization.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Ilkhanate, the age of the Mongols in Iran, a story of catastrophe and, against all odds, of renewal. The Mongol invasion was among the most destructive events the nation ever suffered, and its wounds were deep and lasting.' },
          { t: 'p', x: 'Yet even this could not extinguish the Iranian spirit. Within a few generations, Iran had absorbed and transformed even the terrible Mongols, turning destroyers into patrons and drawing from the darkest of times a new age of beauty. It stands as perhaps the greatest testament of all to the deathless resilience of Persian civilization.' },
          { t: 'pull', x: 'Even the Mongols, in the end, were conquered by the soul of Iran.' },
        ] },
      ],
    },
  ],
};

const timurid: Topic = {
  key: 'timurid-empire',
  category: 'history',
  name: 'The Timurid Empire',
  persian: 'تیموریان',
  years: '1370 - 1507',
  essence: 'The dynasty of Tamerlane, a conqueror as terrible as any in history, whose descendants presided over one of the most dazzling cultural renaissances the Persian world ever knew.',
  cover: 'timurid-cover',
  closing: 'timurid-cover',
  status: 'ready',
  sources: [
    'The historical record of the Timurid era',
    'Contemporary Persian accounts',
    'Studies of Timurid art and architecture',
  ],
  chapters: [
    {
      key: 'tm1',
      title: 'The Last Great Conqueror',
      subtitle: '1370 - 1405',
      pages: [
        { blocks: [
          { t: 'p', x: 'In the fourteenth century, out of Central Asia, rose the last of the great steppe conquerors, a man the Persians called Timur and the West would call Tamerlane. Claiming the mantle of Genghis Khan, he built an empire by the sword across the Persian world and far beyond, and his name became a byword for both brilliance and terror.' },
          { t: 'p', x: 'Timur was a military genius who was never once defeated in battle across a lifetime of war, and he was also fearsomely cruel, leaving towers of skulls in the wake of his conquests. He carved out a vast empire centered on the Persian world, from India to the edge of Europe, in a career of almost ceaseless campaigning.' },
          { t: 'splitimg', key: 'timurid-timur', title: 'Timur (Tamerlane)', x: 'A conqueror never defeated in battle, and one of the most feared men in history, Timur built a vast empire across the Persian world.' },
        ] },
        { blocks: [
          { t: 'h', x: 'The jewel of Samarkand' },
          { t: 'p', x: 'Yet this terrible conqueror was also a great patron of beauty. He gathered to his capital of Samarkand the finest artists, architects, and craftsmen from across all the lands he conquered, and adorned the city with monuments of breathtaking splendour, blue-domed and shimmering, among the wonders of the world.' },
          { t: 'markline', x: 'The hand that raised towers of skulls also raised the shimmering domes of Samarkand.' },
          { t: 'p', x: 'It is one of history\'s great contradictions, that a man of such cruelty should also be the founder of one of the most beautiful cultural ages the East ever knew. But so it was, and the splendour he began would blossom fully under his descendants.' },
        ] },
      ],
    },
    {
      key: 'tm2',
      title: 'The Timurid Renaissance',
      subtitle: '1405 - 1507',
      pages: [
        { blocks: [
          { t: 'p', x: 'After Timur\'s death, his descendants gave up the endless conquering and turned instead to the cultivation of beauty, and under them the Persian world entered one of the most brilliant cultural renaissances in its entire history, a flowering compared by many to the Italian Renaissance of the same age.' },
          { t: 'p', x: 'His son Shahrukh and grandson Ulugh Beg, and later the court at Herat, made their cities into dazzling centers of art, learning, and refinement, where the Persian genius reached new summits in almost every field.' },
        ] },
        { blocks: [
          { t: 'h', x: 'A king who mapped the stars' },
          { t: 'p', x: 'Timur\'s grandson Ulugh Beg was that rarest of things, a king who was also a great scientist. At his capital of Samarkand he built one of the finest astronomical observatories of the medieval world, and there he and his scholars mapped the stars with an accuracy that would not be surpassed for centuries. A ruler of an empire spent his nights charting the heavens.' },
          { t: 'numstat', items: [
            { n: 'Herat', label: 'A capital of dazzling art and poetry' },
            { n: 'Samarkand', label: 'An observatory that mapped the stars' },
            { n: 'Painting', label: 'The golden age of the Persian miniature' },
            { n: 'Renaissance', label: 'A flowering to rival Italy\'s' },
          ] },
        ] },
        { blocks: [
          { t: 'h', x: 'The summit of Persian art' },
          { t: 'p', x: 'This was the golden age of the Persian miniature, the exquisite art of painting in books, which reached under the Timurids a delicacy and beauty never surpassed. It was the age of the great poet Jami and of the master painter Behzad, whose works are treasures of world art. In poetry, painting, calligraphy, and architecture, the Timurid renaissance stands as one of the summits of Persian civilization.' },
          { t: 'splitimg', key: 'timurid-miniature', title: 'The Persian miniature', x: 'Under the Timurids, the art of the miniature reached a delicacy and beauty that has never been surpassed.' },
          { t: 'p', x: 'The legacy reached even further. A prince of this house, Babur, would journey to India and found the great Mughal Empire, carrying the refined Persian culture of the Timurids to the subcontinent, where it would shape a whole civilization and raise wonders like the Taj Mahal.' },
        ] },
        { blocks: [
          { t: 'div' },
          { t: 'p', x: 'This has been a glimpse of the Timurids, whose story holds the strange and beautiful contradiction that runs through so much of this age, the terror of the conqueror and the glory of the culture he made possible. From the cruelty of Timur grew one of the most luminous cultural ages the Persian world ever knew.' },
          { t: 'p', x: 'In the shimmering domes of Samarkand, the exquisite paintings of Herat, and the poetry and science of their courts, the Timurids left a legacy of beauty that still shines across the centuries, and carried the light of Persian civilization to the ends of the earth.' },
          { t: 'pull', x: 'From the harshest of ages, the Persian world raised a renaissance of pure beauty.' },
        ] },
      ],
    },
  ],
};

export type EraEntry = { name: string; persian?: string; years: string; topicKey?: string; status: 'ready' | 'soon' | 'priority' };
export type EraGroup = { group: string; entries: EraEntry[] };

export const HISTORY_ERAS: EraGroup[] = [
  {
    group: 'Ancient Persia',
    entries: [
      { name: 'Cyrus the Great & the Achaemenids', persian: 'کوروش بزرگ', years: 'c. 550 – 330 BCE', topicKey: 'cyrus-the-great', status: 'priority' },
      { name: 'The Parthian Empire', persian: 'اشکانیان', years: '247 BCE – 224 CE', topicKey: 'parthian-empire', status: 'ready' },
      { name: 'The Sasanian Empire', persian: 'ساسانیان', years: '224 – 651 CE', topicKey: 'sasanian-empire', status: 'ready' },
      { name: 'Two Centuries of Silence', persian: 'دو قرن سکوت', years: '651 – 900 CE', topicKey: 'two-centuries-silence', status: 'ready' },
    ],
  },
  {
    group: 'The Medieval Age',
    entries: [
      { name: 'The Seljuk Empire', persian: 'سلجوقیان', years: '1037 – 1194', topicKey: 'seljuk-empire', status: 'ready' },
      { name: 'The Ilkhanate', persian: 'ایلخانان', years: '1256 – 1335', topicKey: 'ilkhanate', status: 'ready' },
      { name: 'The Timurid Empire', persian: 'تیموریان', years: '1370 – 1507', topicKey: 'timurid-empire', status: 'ready' },
    ],
  },
  {
    group: 'The Early Modern Age',
    entries: [
      { name: 'The Safavid Empire', persian: 'صفویان', years: '1501 – 1736', topicKey: 'safavid-empire', status: 'ready' },
      { name: 'The Afsharid Dynasty', persian: 'افشاریان', years: '1736 – 1796', topicKey: 'afsharid-dynasty', status: 'ready' },
      { name: 'The Zand Dynasty', persian: 'زندیان', years: '1751 – 1794', topicKey: 'zand-dynasty', status: 'ready' },
      { name: 'The Qajar Dynasty', persian: 'قاجاریان', years: '1789 – 1925', topicKey: 'qajar-dynasty', status: 'ready' },
    ],
  },
  {
    group: 'The Modern Age',
    entries: [
      { name: 'Reza Shah Pahlavi', persian: 'رضا شاه', years: '1878 – 1944', topicKey: 'reza-shah', status: 'ready' },
      { name: 'Mohammad Reza Shah Pahlavi', persian: 'محمدرضا پهلوی', years: '1919 – 1980', topicKey: 'mohammad-reza-shah', status: 'ready' },
    ],
  },
];

export const TOPICS: Topic[] = [cyrus, zand, mrp, rezaShah, safavid, qajar, sasanian, silence, parthian, afsharid, seljuk, ilkhanate, timurid];

export function findTopic(key?: string) {
  return TOPICS.find((t) => t.key === key);
}

export type FlatPage = { chapterIndex: number; chapterTitle: string; chapterSubtitle?: string; pageInChapter: number; pagesInChapter: number; blocks: Block[] };

export function flattenPages(topic: Topic): FlatPage[] {
  const out: FlatPage[] = [];
  topic.chapters.forEach((c, ci) => {
    c.pages.forEach((pg, pi) => {
      out.push({ chapterIndex: ci, chapterTitle: c.title, chapterSubtitle: c.subtitle, pageInChapter: pi, pagesInChapter: c.pages.length, blocks: pg.blocks });
    });
  });
  return out;
}
