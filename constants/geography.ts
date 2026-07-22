// Geography: the land of Iran, its place in the world, its provinces and cities.
// Uses the dark reader palette so maps and landscape imagery sit well.

export type ProvinceDot = { name: string; persian: string; x: number; y: number; fact: string };

export const PROVINCE_DOTS: ProvinceDot[] = [
  { name: 'West Azarbaijan', persian: 'آذربایجان غربی', x: 0.0566, y: 0.0863, fact: 'Home to Lake Urmia, once the largest lake in the Middle East, and to the ancient fortress of Takht e Soleyman, a Sasanian fire temple ringed by a volcanic lake.' },
  { name: 'East Azarbaijan', persian: 'آذربایجان شرقی', x: 0.1241, y: 0.1411, fact: 'Its capital Tabriz has one of the oldest and largest covered bazaars on earth, a labyrinth of brick vaults that has traded since antiquity.' },
  { name: 'Ardebil', persian: 'اردبیل', x: 0.2231, y: 0.1218, fact: 'The birthplace of the Safavid order, whose shrine complex here became the spiritual seed of the dynasty that reunified Iran.' },
  { name: 'Gilan', persian: 'گیلان', x: 0.3026, y: 0.2008, fact: 'Green and rain soaked on the Caspian shore, it grows most of Iran rice and tea, a landscape that looks nothing like the deserts people imagine.' },
  { name: 'Kordestan', persian: 'کردستان', x: 0.1668, y: 0.2886, fact: 'Mountain country of the Zagros, where the village of Palangan climbs a gorge in stacked stone terraces, each roof the neighbour courtyard.' },
  { name: 'Kermanshah', persian: 'کرمانشاه', x: 0.1269, y: 0.3644, fact: 'Site of Bisotun, where Darius the Great carved his victory into a cliff in three languages, the inscription that unlocked cuneiform for the modern world.' },
  { name: 'Ilam', persian: 'ایلام', x: 0.1445, y: 0.4438, fact: 'Oak forests of the Zagros cover its hills, remnants of the woodland that once clothed the whole western spine of Iran.' },
  { name: 'Khuzestan', persian: 'خوزستان', x: 0.2629, y: 0.547, fact: 'The cradle of Elam, one of the oldest civilizations on earth, and home to Choqa Zanbil, a ziggurat raised more than three thousand years ago.' },
  { name: 'North Khorasan', persian: 'خراسان شمالی', x: 0.6617, y: 0.1655, fact: 'Rolling steppe on the old road to Central Asia, long a crossing place for the peoples who moved between Iran and the grasslands beyond.' },
  { name: 'Golestan', persian: 'گلستان', x: 0.5807, y: 0.1742, fact: 'Guarded by the Great Wall of Gorgan, a Sasanian rampart nearly two hundred kilometres long, older and longer than most of Hadrian Wall.' },
  { name: 'Mazandaran', persian: 'مازندران', x: 0.4712, y: 0.246, fact: 'Between the Caspian and the Alborz, its forests are among the oldest living woodlands on the planet, surviving the last ice age intact.' },
  { name: 'Razavi Khorasan', persian: 'خراسان رضوی', x: 0.7783, y: 0.2868, fact: 'Mashhad draws millions of pilgrims a year, and nearby Tus was the home of Ferdowsi, who wrote the Shahnameh and saved the Persian language.' },
  { name: 'South Khorasan', persian: 'خراسان جنوبی', x: 0.7919, y: 0.5066, fact: 'Its saffron fields produce much of the world supply, gram for gram the most expensive spice on earth, grown from a purple autumn crocus.' },
  { name: 'Semnan', persian: 'سمنان', x: 0.5787, y: 0.2966, fact: 'Where the mountains give way to the Dasht e Kavir, the great salt desert, a surface so hostile that little grows and the crust cracks into plates.' },
  { name: 'Tehran', persian: 'تهران', x: 0.3881, y: 0.2943, fact: 'A modest town the Qajars chose as their capital, now a metropolis of millions rising against the snow line of the Alborz.' },
  { name: 'Alborz', persian: 'البرز', x: 0.3592, y: 0.265, fact: 'Named for the mountain range that walls off the Caspian, the range that in myth holds the peak where the hero Fereydun bound the tyrant Zahhak.' },
  { name: 'Qazvin', persian: 'قزوین', x: 0.3109, y: 0.2608, fact: 'A former Safavid capital, and gateway to Alamut, the mountain valley where the fortress of the Assassins once commanded the passes.' },
  { name: 'Zanjan', persian: 'زنجان', x: 0.2383, y: 0.2291, fact: 'Home to Soltaniyeh, whose vast turquoise dome is one of the largest brick domes ever raised, and a direct ancestor of the Taj Mahal.' },
  { name: 'Hamadan', persian: 'همدان', x: 0.2493, y: 0.3283, fact: 'Built on Ecbatana, capital of the Medes, making it one of the oldest continuously inhabited cities in the world.' },
  { name: 'Markazi', persian: 'مرکزی', x: 0.3023, y: 0.3789, fact: 'Its name simply means central, and it sits at the meeting of the Zagros and the plateau, long a corridor between north and south.' },
  { name: 'Qom', persian: 'قم', x: 0.3702, y: 0.3441, fact: 'A centre of religious learning for centuries, its seminaries drawing scholars from across the Islamic world.' },
  { name: 'Lorestan', persian: 'لرستان', x: 0.2133, y: 0.4265, fact: 'The Lurs of these mountains produced the famed Luristan bronzes, intricate animal figures cast three thousand years ago.' },
  { name: 'Esfahan', persian: 'اصفهان', x: 0.4126, y: 0.45, fact: 'Its capital was called half the world, and the square Shah Abbas laid out remains among the largest and most beautiful ever built.' },
  { name: 'Chahar Mahall and Bakhtiari', persian: 'چهارمحال و بختیاری', x: 0.3552, y: 0.5357, fact: 'Country of the Bakhtiari, whose tribes still drive their herds over the Zagros twice a year, one of the great migrations left on earth.' },
  { name: 'Kohgiluyeh and Buyer Ahmad', persian: 'کهگیلویه و بویراحمد', x: 0.3549, y: 0.6062, fact: 'Steep and forested, it holds some of the last wild pistachio and oak stands of the southern Zagros.' },
  { name: 'Bushehr', persian: 'بوشهر', x: 0.393, y: 0.7451, fact: 'A Gulf port that traded with India and Africa for centuries, its old town built of coral stone against the heat.' },
  { name: 'Fars', persian: 'فارس', x: 0.4915, y: 0.739, fact: 'The heartland. Persia takes its name from here, and here stand Persepolis, Pasargadae, and the tomb of Cyrus, with Shiraz and its poets.' },
  { name: 'Yazd', persian: 'یزد', x: 0.6277, y: 0.4612, fact: 'A desert city of mud brick and wind towers, the ancient air conditioning of Iran, and a living centre of Zoroastrian faith.' },
  { name: 'Kerman', persian: 'کرمان', x: 0.6889, y: 0.6602, fact: 'Holds the Lut desert, where satellites recorded the hottest land surface temperature ever measured on earth, over seventy degrees.' },
  { name: 'Hormozgan', persian: 'هرمزگان', x: 0.621, y: 0.8078, fact: 'Commands the Strait of Hormuz, the narrow gate through which a fifth of the world oil still passes, and the painted hills of Hormuz island.' },
  { name: 'Sistan and Baluchestan', persian: 'سیستان و بلوچستان', x: 0.8447, y: 0.8282, fact: 'Where the Shahnameh places the homeland of Rostam, greatest hero of the Persian epic, and where the wind blows for a hundred and twenty days.' },
];

export type GeoBlock =
  | { t: 'p'; x: string }
  | { t: 'h'; x: string }
  | { t: 'lead'; x: string }
  | { t: 'map'; key: string; cap?: string }
  | { t: 'provincemap' }
  | { t: 'img'; key: string; cap?: string }
  | { t: 'imgwide'; key: string; cap?: string }
  | { t: 'stat'; items: { n: string; label: string }[] }
  | { t: 'mark'; x: string }
  | { t: 'facts'; items: { k: string; v: string }[] }
  | { t: 'imgrow2'; keys: string[]; cap?: string }
  | { t: 'cities' }
  | { t: 'places' }
  | { t: 'close'; x: string; glyph: string }
  | { t: 'div' };

export type GeoPage = { blocks: GeoBlock[] };
export type GeoChapter = { key: string; title: string; nav?: string; subtitle?: string; pages: GeoPage[] };

export const GEO_CHAPTERS: GeoChapter[] = [
  {
    key: 'g1',
    title: 'The Beating Heart',
    nav: 'The Heart',
    subtitle: 'WHERE IRAN SITS',
    pages: [
      { blocks: [
        { t: 'lead', x: 'Look at a map of the old world and your eye is drawn, almost against its will, to one place.' },
        { t: 'p', x: 'Iran sits at the exact hinge of the ancient world. West lies the Mediterranean and the empires of Rome and Byzantium. East lie India and China. North are the steppes of Central Asia. South is the warm water of the Gulf and the sea road to Africa. Everything that moved between these worlds moved through here.' },
        { t: 'map', key: 'iran-crossroads', cap: 'Iran at the hinge of the old world, between the Mediterranean, the steppe, India, and the Gulf.' },
      ] },
      { blocks: [
        { t: 'h', x: 'A bridge, not a corner' },
        { t: 'p', x: 'Most nations sit at the edge of something. Iran sits in the middle of everything. The Silk Road did not pass by Iran, it passed through it. The goods of China reached Rome through Persian hands. The mathematics of India reached Europe through Persian scholars. This was not an accident of trade. It was geography.' },
        { t: 'mark', x: 'Iran is not on the way to somewhere. It is the way.' },
        { t: 'p', x: 'A land in the middle of everything receives everything, and gives everything back changed. That is why Persian civilization has always been a civilization of synthesis, taking in the world and returning it transformed, in art, in language, in thought.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The shape of the land' },
        { t: 'p', x: 'Iran is a high plateau, ringed by mountains like the rim of a bowl. The Zagros run down its western flank, the Alborz wall off the Caspian in the north, and within their embrace lie the great deserts, the Dasht e Kavir and the Dasht e Lut.' },
        { t: 'stat', items: [
          { n: '1.6M', label: 'Square kilometres, the eighteenth largest country on earth' },
          { n: '5,610m', label: 'Damavand, the highest peak in the Middle East' },
          { n: '31', label: 'Provinces, from Caspian forest to Gulf coast' },
          { n: '7', label: 'Land neighbours, more than almost any nation' },
        ] },
        { t: 'p', x: 'This is a country that holds rainforest and salt desert, snowfield and mangrove, sometimes within a single day of travel. Few nations on earth contain such extremes inside one border.' },
      ] },
    ],
  },
  {
    key: 'g2',
    title: 'The Gift and the Burden',
    nav: 'History',
    subtitle: 'GEOGRAPHY THROUGH HISTORY',
    pages: [
      { blocks: [
        { t: 'p', x: 'To sit at the centre of the world is a gift and a burden, and Iran has known both in full measure. The same position that brought wealth brought armies. The same openness that let ideas in let invaders in.' },
      ] },
      { blocks: [
        { t: 'h', x: 'What the land gave' },
        { t: 'p', x: 'The mountains were a fortress. Time and again the Zagros and the Alborz broke the force of invasion, and gave the people of the plateau a place to gather and return. The Parthians used this country to hold Rome at the Euphrates for three centuries. Rome never crossed the plateau.' },
        { t: 'p', x: 'The position was a fortune. Every empire that ruled here grew rich on the trade that had nowhere else to go. Silk, spice, and gold crossed Iranian soil, and Iranian hands took their share.' },
        { t: 'p', x: 'And where water was scarce, Iranians invented their way around it. The qanat, an underground channel tapping mountain groundwater and carrying it for miles beneath the desert, is a Persian invention thousands of years old, and it made cities possible where there was no river at all.' },
        { t: 'mark', x: 'They could not move the desert, so they ran rivers underneath it.' },
      ] },
      { blocks: [
        { t: 'h', x: 'What the land cost' },
        { t: 'p', x: 'The open east was a wound that never closed. Across the steppe came the Turks, the Mongols, and Timur, and each time the flat northeast offered no wall to stop them. The Mongol invasion, arriving through that open door, was among the greatest catastrophes Iran ever suffered.' },
        { t: 'p', x: 'And in the modern age the same centrality drew a different kind of pressure. Russia to the north and Britain to the south did not want Iran for its soil but for its position, and later for what lay beneath it. A country at the centre of the world is never left alone by the powers of the world.' },
        { t: 'p', x: 'The oil found in Khuzestan in the early twentieth century made that truth heavier still. Geography had given Iran the crossroads, and then it gave it the prize.' },
      ] },
    ],
  },
  {
    key: 'g3',
    title: 'The Neighbours',
    nav: 'Neighbours',
    subtitle: 'IRAN TODAY',
    pages: [
      { blocks: [
        { t: 'p', x: 'Few countries touch as many others. Iran shares a land border with seven nations and a sea border with several more, and each frontier is a different world.' },
        { t: 'map', key: 'iran-neighbours', cap: 'Iran and its seven land neighbours.' },
        { t: 'facts', items: [
          { k: 'North west', v: 'Armenia, Azerbaijan, and Turkey' },
          { k: 'North', v: 'The Caspian, and Turkmenistan' },
          { k: 'East', v: 'Afghanistan and Pakistan' },
          { k: 'West', v: 'Iraq' },
          { k: 'South', v: 'The Gulf, and the Strait of Hormuz' },
        ] },
      ] },
      { blocks: [
        { t: 'h', x: 'The gate of the world' },
        { t: 'p', x: 'At the southern tip, the Strait of Hormuz narrows to a channel a few dozen kilometres wide. Through it passes roughly a fifth of the oil consumed on earth. There is no substitute passage. It is, in the most literal sense, one of the most important stretches of water in the world, and Iran holds its northern shore.' },
        { t: 'mark', x: 'A fifth of the world energy passes a coastline you could see across.' },
      ] },
      { blocks: [
        { t: 'h', x: 'Two seas' },
        { t: 'p', x: 'Iran is one of the few countries to touch two entirely separate seas of different character. The Caspian in the north is the largest inland body of water on earth, fresh enough at its edges to grow rice and tea on its shore. The Gulf in the south is warm, salt, and shallow, a trading sea since before writing.' },
        { t: 'p', x: 'Between them, eighteen hundred kilometres apart, lies everything: mountain, desert, orchard, and city.' },
      ] },
    ],
  },
  {
    key: 'g4b',
    title: 'The Landscapes',
    nav: 'Landscapes',
    subtitle: 'WHAT THE LAND LOOKS LIKE',
    pages: [
      { blocks: [
        { t: 'p', x: 'People who have never been picture Iran as desert. It is one of the great misreadings of any country on earth. Iran holds rainforest and salt flat, alpine snowfield and mangrove swamp, and you can pass between them in a single day of driving.' },
        { t: 'imgwide', key: 'geo-alborz', cap: 'The Alborz, walling off the Caspian from the plateau.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The green north' },
        { t: 'p', x: 'Between the Alborz and the Caspian lies a strip of forest so old it survived the last ice age intact. It rains here. Rice grows, tea grows, and the hills are the deep green of somewhere far further north. Villages sit in mist. It looks nothing like the Iran of the imagination.' },
        { t: 'img', key: 'geo-caspian', cap: 'The Caspian forest, among the oldest living woodland on earth.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The empty centre' },
        { t: 'p', x: 'Inside the ring of mountains lie the two great deserts. The Dasht e Kavir is a crust of salt so hostile that little lives on it. The Dasht e Lut is worse, and better. It holds the hottest land surface temperature ever recorded anywhere on the planet, and its wind carved ridges run for hundreds of kilometres like a sea frozen mid wave.' },
        { t: 'img', key: 'geo-lut', cap: 'The Lut, where the ground has been measured hotter than anywhere else on earth.' },
        { t: 'mark', x: 'The hottest place ever measured on earth is a day drive from a rainforest.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The mountains' },
        { t: 'p', x: 'The Zagros run for fifteen hundred kilometres down the western flank, folded like cloth, holding oak forest and the migration routes the Bakhtiari still walk twice a year. And above everything stands Damavand, a dormant volcano and the highest peak in the Middle East, visible from Tehran on a clear day, the mountain where the Shahnameh chains the tyrant Zahhak for eternity.' },
        { t: 'img', key: 'geo-damavand', cap: 'Damavand, 5,610 metres, the roof of the Middle East and a mountain of myth.' },
      ] },
      { blocks: [
        { t: 'h', x: 'The two coasts' },
        { t: 'p', x: 'North is the Caspian, cool and fresh at its edges. South is the Gulf, warm and salt, with mangroves along its shallows and islands whose hills are striped red and gold with mineral. One country, two seas, and eighteen hundred kilometres between them.' },
        { t: 'imgrow2', keys: ['geo-gulf', 'geo-hormuz'], cap: 'The Gulf coast, and the painted hills of Hormuz.' },
      ] },
    ],
  },
  {
    key: 'g4',
    title: 'The Thirty One',
    nav: 'Provinces',
    subtitle: 'THE PROVINCES',
    pages: [
      { blocks: [
        { t: 'p', x: 'Iran is made of thirty one provinces, and no two are alike. Touch any one to learn what makes it itself.' },
        { t: 'provincemap' },
      ] },
    ],
  },
  {
    key: 'g5',
    title: 'The Great Cities',
    nav: 'Cities',
    subtitle: 'WHERE THE PEOPLE ARE',
    pages: [
      { blocks: [
        { t: 'p', x: 'A country is its cities, and Iran cities were placed by water and by road. Where a mountain stream could be tapped, or a trade route had to pass, a city grew. Some have stood so long that their founding is myth rather than record.' },
        { t: 'cities' },
      ] },
      { blocks: [
        { t: 'h', x: 'Why they stand where they stand' },
        { t: 'p', x: 'Look closely and a pattern appears. Almost every great Iranian city sits at the foot of a mountain, not on a river. Tehran against the Alborz, Shiraz and Isfahan in the folds of the Zagros, Mashhad below the hills of Khorasan. The mountains held the snow, the snow fed the springs, and the qanats carried that water out to the plain.' },
        { t: 'mark', x: 'Iranian cities were not built on rivers. They were built on the memory of snow.' },
        { t: 'p', x: 'This is why the map of Iran cities is really a map of its mountains. Where the ranges run, the cities follow, strung along the inner edge of the highlands like beads on a thread, with the empty deserts held at the centre.' },
      ] },
    ],
  },
  {
    key: 'g6',
    title: 'Small Places, Long Shadows',
    nav: 'Places',
    subtitle: 'THE UNEXPECTED ONES',
    pages: [
      { blocks: [
        { t: 'p', x: 'Beyond the great cities are smaller places whose names carry further than their size would suggest. Some gave the world a fruit, some a building, some a person whose words outlived every empire of their age.' },
      ] },
      { blocks: [
        { t: 'places' },
        { t: 'div' },
        { t: 'p', x: 'This is the pattern of the land. A country of extremes, held between mountain and desert, placed at the centre of everything, whose people learned to draw water from under the sand and beauty from the driest places. The geography made the history, and the history made the nation.' },
        { t: 'close', glyph: 'ایران', x: 'A land that has held everything the world came looking for, and been asked for little else. Empires crossed it, took what they wanted, and left their dust in its soil. It gave water where there was none, poetry where there was silence, and beauty out of the driest ground on earth. It has been wanted often and understood rarely. Still it stands, between two seas, holding its own name.' },
      ] },
    ],
  },
];

export type City = { name: string; persian: string; x: number; y: number; blurb: string; images: string[] };

export const CITIES: City[] = [
  { name: 'Tehran', persian: 'تهران', x: 0.3861, y: 0.2876, blurb: 'Capital, and one of the largest cities in western Asia. A modest town the Qajars chose, now millions strong against the snow line of the Alborz.', images: ['tehran-1','tehran-2','tehran-3'] },
  { name: 'Mashhad', persian: 'مشهد', x: 0.7969, y: 0.2482, blurb: 'The great pilgrimage city of the east, drawing millions each year, and the largest city of Khorasan.', images: ['mashhad-1','mashhad-2','mashhad-3'] },
  { name: 'Isfahan', persian: 'اصفهان', x: 0.4, y: 0.4848, blurb: 'Once called half the world. Shah Abbas laid out a square here that remains among the most beautiful ever built.', images: ['isfahan-1','isfahan-2','isfahan-3'] },
  { name: 'Shiraz', persian: 'شیراز', x: 0.4432, y: 0.6833, blurb: 'City of poets, roses, and gardens. Hafez and Saadi are buried here, and Karim Khan made it his capital.', images: ['shiraz-1','shiraz-2','shiraz-3'] },
  { name: 'Tabriz', persian: 'تبریز', x: 0.1314, y: 0.1325, blurb: 'The north western gate, holding one of the oldest and largest covered bazaars on earth.', images: ['tabriz-1','tabriz-2','tabriz-3'] },
  { name: 'Yazd', persian: 'یزد', x: 0.535, y: 0.5336, blurb: 'A desert city of mud brick and wind towers, and a living centre of Zoroastrian faith.', images: ['yazd-1','yazd-2','yazd-3'] },
];

export type Place = { name: string; persian: string; x: number; y: number; text: string; image?: string };

export const PLACES: Place[] = [
  { name: 'Tus', persian: 'توس', x: 0.7941, y: 0.2363, text: 'A modest town in Khorasan, and the home of {{ferdowsi|Ferdowsi}}. For thirty years he sat here and wrote the Shahnameh, and in doing so saved the Persian language. No city of millions has done more for Iran than this one town did through one man.', image: 'place-tus' },
  { name: 'Kashan', persian: 'کاشان', x: 0.3885, y: 0.3983, text: 'A desert town that turned water and roses into an art. Its rosewater is distilled each spring in a ritual centuries old, its carpets are famous, and its merchant houses hide vast cool courtyards behind plain mud walls.', image: 'place-kashan' },
  { name: 'Maragheh', persian: 'مراغه', x: 0.1287, y: 0.1772, text: 'Here, under the Ilkhanids, an observatory was built that mapped the heavens with an accuracy that reached Europe and helped reshape how the world understood the sky.', image: 'place-maragheh' },
  { name: 'Masuleh', persian: 'ماسوله', x: 0.2662, y: 0.1928, text: 'A village in the Gilan mountains built so steeply that the roof of one house is the courtyard of the house above, and the whole settlement is a staircase. Cars cannot enter.', image: 'place-masuleh' },
  { name: 'Bam', persian: 'بم', x: 0.7344, y: 0.7147, text: 'A citadel of mud brick in the Kerman desert, once the largest such structure on earth, and the country around it gives the sweetest dates in Iran.', image: 'place-bam' },
  { name: 'Neyshabur', persian: 'نیشابور', x: 0.7564, y: 0.2536, text: 'Home of {{khayyam|Omar Khayyam}}, poet and mathematician both, and the source of the turquoise that coloured the domes and the jewellery of half the world.', image: 'place-neyshabur' },
];
