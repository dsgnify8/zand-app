// The Persian Mag inside ZAND.
//
// Posts mirror what they publish: portraits, studio visits, short profiles
// of people making things. Image keys are slots the admin fills, the same
// way article covers work.

export type TpmKind = 'portrait' | 'studio' | 'feature' | 'archive';

export type TpmBlock =
  | { t: 'lead'; x: string; fa?: string }        // a statement, with a rule
  | { t: 'open'; x: string; fa?: string }        // a drop capital, quieter        // the opening, set larger
  | { t: 'p'; x: string; fa?: string }
  | { t: 'h'; x: string; fa?: string }           // section heading
  | { t: 'q'; x: string; who?: string; fa?: string; whoFa?: string }
  | { t: 'line'; x: string; fa?: string }        // one sentence, alone
  | { t: 'note'; x: string; fa?: string }        // an aside, tinted
  | { t: 'img'; key: string; cap?: string; capFa?: string }
  | { t: 'duo'; keys: [string, string]; cap?: string; capFa?: string }
  | { t: 'qa'; q?: string; who?: string; x: string; qFa?: string; whoFa?: string; fa?: string }
  | { t: 'term'; x: string; fa?: string; def: string; defFa?: string }
  | { t: 'divider' };

export type TpmPost = {
  key: string;
  kind: TpmKind;
  title: string;
  subject: string;         // who it is about
  discipline: string;      // what they do
  standfirst: string;
  cover: string;           // image key
  images?: string[];       // extra image keys, shown as a gallery
  minutes: number;
  /**
   * The piece, as blocks.
   *
   * Nine kinds rather than three, so two articles marked up differently
   * read differently. The variation is in the marking up, not in the
   * renderer guessing — a magazine looks varied because someone laid each
   * page out, not because a rule alternated.
   */
  body: TpmBlock[];
};

export type TpmCreative = {
  key: string;
  name: string;
  discipline: string;
  city: string;
  image: string;
  line: string;            // one line about them
};

export const TPM_POSTS: TpmPost[] = [
  {
    key: 'keayaun',
    kind: 'portrait',
    title: 'Keayaun climbs the parts of the city you never see',
    subject: 'Keayaun',
    discipline: 'Photography',
    standfirst:
      'Rooftops, tunnels, and a jump from a moving train on his 22nd '
      + 'birthday that changed how he thinks about time.',
    cover: 'tpm-keayaun-cover',
    images: [],
    minutes: 5,
    body: [
      { t: 'open', x: "In the hidden layers of the city, there exist things that don't catch the eye in everyday life. *Every day as we ride the metro, pass by a bank building, or glimpse an abandoned house, we pass indifferently through their inner layers and move on with our lives.*" },

      { t: 'p', x: "Nevertheless, there are those whose love for uncovering the city's hidden layers is stronger, leading to the emergence of a street exploration activity. Street exploration, once considered an exciting and lightweight activity in urban photography, has gained significant popularity in recent years with the expansion of artists' activities in this field in the virtual space." },

      { t: 'p', x: 'Keayaun, an Iranian explorer residing in Canada, has been familiar with street culture in Iran and the streets of Ekbatan for years. He began his artistic work with portrait photography and graffiti in the corners of Ekbatan, gradually realizing that he wanted to share the hidden layers of the city with his audience through his photos.' },

      { t: 'h', x: 'A rooftop in Toronto' },

      { t: 'p', x: 'After migrating to Canada, in the early days, a photograph became a source of renewed motivation for Keayaun to continue this activity. He says:' },

      { t: 'q', x: 'During those difficult days, I went to the rooftop in Toronto with my camera. Despite having suicidal thoughts, with the help of a friend and reflecting on the promises I made to my mother, I was able to move past those thoughts and return to life. Right there, I took a picture of the view in front of me and shared it on my Instagram page. Much more support came for my photo than I had expected. This made me feel like I belong to a community and that there are people in this world who think like me and appreciate my perspective on life.', who: 'Keayaun' },

      { t: 'p', x: 'Since then, Keayaun has been striving to portray to his audience what lies within the tunnels, atop the rooftops of skyscrapers, and artistically concealed from the public eye, all while preserving his personal identity through his photographs.' },

      { t: 'h', x: 'The risk that is not the height' },

      { t: 'p', x: 'Contrary to common belief that fear of heights and the risk of death are the biggest challenges of this activity, for Keayaun, the greatest challenge is **the risk of getting caught**. That\'s why urban explorers usually obsessively choose buildings and environments where there is generally a possibility of access. Over time, as building security systems have become more sophisticated, this activity has become even more challenging, making entry into certain spaces that were previously possible now impossible.' },

      { t: 'p', x: 'Moreover, with the increasing number of surveillance cameras and facial recognition capabilities, the risk of getting caught increases, and as Keayaun puts it, "In this field, our eyes are always on our shadow." This has led explorers to operate incognito, creating a distance between the artist and their audience. This distance sometimes causes us to forget that they are people just like us, individuals with ordinary lives whom we might pass by on the street or in the subway one day.' },

      { t: 'divider' },

      { t: 'p', x: 'We must not forget that the mortal risks of this activity are very high. Keayaun recounts his most challenging and unforgettable day:' },

      { t: 'q', x: 'On my 22nd birthday, I was on top of a moving train approaching a very narrow tunnel. At that moment, I realized I had to jump off the train; I made this decision in less than four seconds. After jumping, my gears broke, I suffered a brain concussion, and my left shoulder was completely dislocated. At that moment when I lay motionless on the ground, unsure if I would survive or not, the only regret I had was regrets of things left undone. That near-death experience changed my perspective on life forever, and I realized I shouldn\'t procrastinate because there may not be a tomorrow. That moment gave me the courage to live, and now I have no regrets.', who: 'Keayaun' },
    ],
  },

  {
    key: 'isam',
    kind: 'feature',
    title: 'Isam is filling a gap in Persian rap nobody else could',
    subject: 'Isam',
    discipline: 'Music',
    standfirst:
      'The Toronto rapper on writing in two languages, the platforms that ignore Iranian artists, and finishing his first album.',
    cover: 'tpm-isam-cover',
    images: [],
    minutes: 9,
    body: [
      { t: 'open', x: 'Sam, also known as "Isam," is a 27-year-old Iranian rapper (born on August 5, 1999) living in Toronto, Canada. He is perhaps one of the few Iranian rappers whose unique voice and melodies are enjoyed by Iranian music audiences of all tastes. He began his career by designing covers for other musicians\' tracks and quickly became one of the most prominent figures in the Iranian rap scene in recent years.' },

      { t: 'p', x: 'His adventurous spirit and unique position in the world of rap music have filled a void that no artist had been able to fill with such quality for years. One of the main features of the recent era of Persian rap has been the addition of a modern Western perspective and spirit through the use of English words and phrases in the lyrics of Iranian rappers\' works. Due to living in Europe from a young age, he is well-versed in Western culture and fluent in English, making him an unparalleled example in the new path of Persian rap.' },

      { t: 'p', x: 'His remarkable variety of flows and melodies has led the most renowned Iranian musicians to seek collaborations with him in recent years. The astonishing journey Isam has taken in this short time is undoubtedly an inspiration for the young generation of Iranian musicians. Therefore, choosing him as the cover star of the fair issue of "The Persian Magazine" signifies the emergence of a new figure in the Iranian music scene, who, with his unique and personal signature, has the potential to soon become **one of the most influential rappers in the history of popular Iranian music**.' },

      { t: 'p', x: 'In addition to collaborating with prominent Iranian rappers and performing concerts in various cities worldwide, he has the distinction of being the first Iranian rapper to perform on the program "On The Radar." He is currently completing his first album titled *Fereshteye Bad* (Bad Angel).' },

      { t: 'divider' },

      { t: 'qa', q: 'Why did you decide to pursue a professional music career?', x: 'Growing up in Europe, my friends were also foreigners, and we always listened to foreign music together, particularly American rap and hip-hop. I wanted to produce music that was contemporary and included a wide range of international vocabulary. I hoped that when my friends listened to it, they would realize that Persian rap can be just as appealing as American rap.' },

      { t: 'qa', q: 'What are the reasons for the remarkable reception of your work by audiences, despite the noticeable difference between your themes and their lifestyle?', x: "I have always aimed to convey relatable feelings in each song to resonate with my audience, primarily targeting the general public. Some aspects mentioned in my works may be beyond their immediate understanding, but I believe they find it intriguing to gain knowledge about them. In essence, it's the noticeable difference that perhaps makes this style of writing appealing to them." },

      { t: 'qa', q: 'How did you transition from cover art design to such a prominent position in music?', x: "My passion has always been art. Since childhood, I've enjoyed visiting various museums and admiring old paintings, as well as having a strong interest in gallery art. Alongside this, music has always been a passion of mine. While I initially expressed my feelings through cover art and visual art, I eventually felt that these mediums couldn't fully capture the depth of the messages I wanted to convey. This led me to transition into music, where I could express much more detail and complexity. Additionally, I saw greater potential for progress within the music industry compared to other artistic fields." },

      { t: 'h', x: 'The infrastructure problem' },

      { t: 'qa', q: "You are one of the few rappers outside of Iran who has become so prominent among Iranian music audiences in recent years. What is the reason for the Iranian diaspora's weakness in introducing new faces?", x: "I believe the lack of exposure for new artists in recent years is primarily due to the limited support for Iranian artists on mainstream music platforms such as Spotify, Apple Music, and others. Unlike foreign artists who receive promotion and support through placement on Spotify playlists and other promotional avenues, young Iranian artists face significant hurdles in gaining visibility. While collaborations with platforms like Radio Javan can alleviate some of these challenges, independent artists often struggle to navigate this landscape. This lack of promotional infrastructure is a significant barrier for emerging talents. However, it's worth noting that the landscape for Persian rap has evolved considerably since I started, with audiences now showing more support for young artists." },

      { t: 'qa', q: 'What challenges have arisen from your distance from Iranian society?', x: 'I keenly feel the limitations of my understanding of issues in Iran. Despite staying informed about Iranian news, those of us living abroad cannot fully comprehend the depth of the situation. While I strive to maintain a connection to Iranian culture, the reality is that true authenticity in writing about it requires being immersed in that environment. Another challenge is keeping up with the slang terms that are popular among Iranian youth, which we outside of Iran often learn about with some delay and consequently use less frequently. Nonetheless, we continuously endeavor to stay updated and incorporate new vocabulary into our work. If I were in Iran surrounded by Iranian peers, my situation would undoubtedly be easier, and I might rely less on English words in my songs.' },

      { t: 'q', x: 'True authenticity in writing about it requires being immersed in that environment.', who: 'Isam' },

      { t: 'h', x: 'Two languages' },

      { t: 'qa', q: 'What is your view on the blending of Persian and English words in the recent works of Iranian rappers?', x: "I've always believed in writing lyrics in a manner that reflects natural conversation, making the work more relatable. It's evident that Iranians now commonly incorporate English words into their daily speech. Additionally, I think integrating certain English words can foster innovation in lyricism and contribute to a fresh sound. Therefore, I appreciate this approach, but it's crucial to use it judiciously and with care in Persian songs." },

      { t: 'qa', q: 'What technique do you use for writing lyrics and creating such a variety of melodies and flows?', x: "I find that the most common technique among artists nowadays is to first create melodies over the beat and then craft lyrics to fit those melodies, which I believe is the most straightforward approach. However, I am particularly sensitive to the beauty of my song's melodies in the music production process, although it's essential to note that I also value the lyrical content. I believe the strength of my work lies in the melodies of my choruses, likely because I've been exposed to high-quality music since childhood." },

      { t: 'h', x: 'What comes next' },

      { t: 'qa', q: 'What outlook do you envision for Persian rap in the coming years?', x: 'Persian rap is experiencing rapid growth, fueled in part by the increasing preference for streaming platforms among listeners. As these platforms continue to attract more users, they will play a significant role in shaping the future of Iranian music. This growth not only translates to higher earnings for artists but also attracts attention from prominent foreign labels looking to enter this market. Overall, conditions have significantly improved compared to recent years and are continuing to evolve. Therefore, I anticipate the emergence of new styles in the next wave of Persian rap, including more experimental ones. While commercial success previously relied heavily on high view counts and mainstream appeal, Persian rap is gradually reaching a point where artists with more experimental styles can also thrive financially.' },

      { t: 'qa', q: 'What attracted you to the Iranian music market?', x: 'To be honest, I perceived a significant gap in the Iranian music market. At the time, I felt that in genres like R&B or trap, we had the potential to create a more contemporary sound. My decision to pursue a professional career in music stemmed from a desire to demonstrate to Iranian teenagers who grew up outside of Iran that Iranian music, including rap and R&B, can be as captivating as American counterparts. Additionally, my love for literature and the Persian language drew me to Iranian music. When I listen to music myself, I prefer Iranian music, especially Persian rap. We have some incredibly talented artists like Koorosh, Behzad Leito, Gdaal, CatchyBeatz, Poobon, Arta, Zedbazi, Mehrad Hidden, and many more. These artists are truly legendary, and I find myself relating more to them than to foreign artists.' },

      { t: 'qa', q: 'What have been the main weaknesses of different periods of Persian rap?', x: 'Throughout various periods, the most significant challenge for artists has been the limited listenership on platforms like Spotify compared to platforms such as Telegram or Radio Javan. As a result, independent artists often struggled to generate significant financial returns. I believe this was the primary hurdle in the Persian rap market, although it has gradually improved over time. Additionally, the impact of sanctions against Iran has exacerbated these challenges. Had we received support from platforms like Apple Music and Spotify, our progress could have been much faster. Increased revenue from music would have enabled us to produce higher-quality music videos and shows.' },
    ],
  },
  {
    key: 'pozx',
    kind: 'feature',
    title: 'Pozx, the Lo-Fi Guy of Tehran',
    subject: 'Pozx',
    discipline: 'Music',
    standfirst:
      'He found the genre by accident at nineteen. On cassette warmth, being expelled repeatedly, and why he does not believe in mainstream.',
    cover: 'tpm-pozx-cover',
    images: [],
    minutes: 10,
    body: [
      { t: 'open', x: 'Pooria, also known as "POZX" (Pooria On Zodiac\'s Expansion), is a 27-year-old Iranian singer, songwriter, and musician based in Tehran. Most Iranian music enthusiasts recognize him for his involvement in the lo-fi genre, and his choice of the username "The Lo-Fi Guy" on Instagram has reinforced this perception.' },

      { t: 'p', x: 'His distinctive lyrical style, which deviates from conventional songwriting rules in popular music genres, his extensive vocabulary, unique performance and expression style, proficiency in playing various instruments including piano, guitar, saxophone, melodica and bass guitar, and his fusion of different styles while focusing on lo-fi, have made him **a truly unique figure in Iranian music**.' },

      { t: 'p', x: '"Begoo Kojaei," one of Pozx\'s latest tracks, was his first collaboration with The Persian Magazine, and the music video was exclusively released on TPM\'s YouTube page on June 2nd of this year. In its ongoing series of interviews with young Iranian musicians, The Persian Magazine has now turned to Pooria. In this interview, we discussed the reasons behind his choice of the lo-fi genre, the challenges of being a musician in Iran, the positive and negative impacts of his education at the Tehran Conservatory of Music Boys, the conditions for earning a living through music, the mainstream and alternative music scenes in Iran, the strengths and weaknesses of Iranian music in recent years, his unique lyrical language, among other topics.' },

      { t: 'p', x: 'Before posing the interview questions, I asked him to briefly introduce himself: "My name is Pooria. I was born on April 20, 1999, in Tehran, where I have also grown up. I have an older sister who holds a master\'s degree in violin pedagogy from Graz, Austria, and is currently studying electronic music. My education includes a diploma in music from the Tehran Conservatory of Music Boys. I have repeatedly tried to pursue further education at the university level, but I have always been expelled."' },

      { t: 'divider' },

      { t: 'qa', q: 'Where did your first steps into the world of music begin?', x: 'Because my family, like many Iranian families, wanted us to pursue music alongside our education (laughs), my sister and I entered the world of music at a young age, and I started learning the piano.' },

      { t: 'qa', q: 'What styles and singers did your family members typically enjoy?', x: "My mom was very fond of Ramesh, and my dad loved Dariush and was also very interested in Varoujan Hakhbandian's works. But since my sister and I are involved in music, we naturally prefer to listen to everything like all musicians do and try to analyze works from all styles. From a young age, I listened a lot to classical and jazz music, and my musical taste later expanded to include other genres such as soul, neo-soul, rap, hip-hop, rock, and more." },

      { t: 'qa', q: 'Did you always think about pursuing music as your profession?', x: 'Yes, it seems like everything was serious for me from the start. When I think about it, I realize that my goal from childhood was to become a musician (laughs). Of course, I used to watch the series "The Big Bang Theory" and really wanted to become a physicist, but that never made me think that if I wasn\'t doing music, I would become a physicist. I believe that even if I didn\'t pursue music, I would still end up being a musician (laughs). On the other hand, my sister entered the music conservatory a bit earlier. Although music was serious for me from the beginning, this also had a significant impact on my decision to study at the music conservatory.' },

      { t: 'qa', q: "What was your family's opinion about pursuing a professional career in music?", x: 'Since childhood, my parents have been very supportive of my musical journey, even though they might not have listened to my works. For example, when I first started piano lessons, my mom bought me a piano after the very first session.' },

      { t: 'qa', q: 'What were the positive and negative impacts of studying music academically?', x: "In my opinion, everything has both positive and negative sides. I believe that in every step you take in life, you decide whether to adhere to or break the established framework. Essentially, if someone chooses to play a role within the academic framework, they will always remain in that defined space; like many of my friends who are still studying at university or teaching at conservatories. I can't claim that this approach is wrong; after all, that person is now a very skilled musician. But such a path is not ideal for my lifestyle. I see myself as a creator rather than someone who follows predefined paths. I apply the same approach in other aspects of my life as well." },

      { t: 'h', x: 'Finding lo-fi by accident' },

      { t: 'qa', q: 'Why did you choose the lo-fi style?', x: "This question has been asked of me a lot. I never specifically chose lo-fi. When I was 18-19 years old, I accidentally created several songs that had a cassette-like vibe; it was like they were both clean and dirty at the same time. It's like I made something that I myself had no awareness of, and the jazz chords I played under the vocals really moved me. I wasn't sure how to label it. At that time, after some searching, I came across the lo-fi style and realized that there were actually people working in this genre." },

      { t: 'qa', x: "I had been experimenting with music production in various styles like EDM, Dubstep, House, Tech House since I was 13, while also practicing Bach's piano concertos and Chopin's etudes for my conservatory exams. So, there was a strange contradiction in my musical path at that time. Therefore, I wanted to find unity in music after completing my studies. I decided to, for example, play and sing the chords I like in a certain format and in general, start using this musical knowledge of mine." },

      { t: 'qa', q: 'Don\'t you think choosing the title "The Lo-Fi Guy" might prevent you from distancing yourself from that musical structure?', x: 'I\'m not bothered at all by the fact that my name is "The Lo-Fi Guy." At present, all my audience knows that I don\'t only work in the lo-fi genre, and I\'ve experimented with many other styles like funk, disco, hip-hop, and rap alongside lo-fi. For this reason, I don\'t think my name can limit me to the framework of the lo-fi genre.' },

      { t: 'qa', q: 'What is the most important factor in distinguishing yourself from other Iranian musicians?', x: "I believe that everyone is creating music together, and there's no need to separate yourself from others due to stylistic differences. In my opinion, the only thing that sets artists apart from each other is their artistic color. Otherwise, one could argue that their lifestyles, emotions, and experiences are almost similar. That is, artists can only be distinguished from each other through that color." },

      { t: 'qa', q: 'What was the biggest mistake you made during your music career?', x: "I've made many mistakes in my life, but I never view them as mistakes. There was a period where I could have made a name for myself in my career, but I was struggling with severe depression. Now, everyone tells me I wish I had been more dedicated during that time. But I believe it's never too late, and there's always an opportunity to shine, even though fame has never been my main concern. So, I think if I had been able to overcome that struggle and depression in some way at that time, I might have had a much different position in the Iranian music scene today." },

      { t: 'qa', q: 'You perform in a genre known for its slow tempo and repetitive rhythm, typically regarded as background music for study. How can you implement all your musical ideas within such an apparently limited framework?', x: "Yes, the tempo of all my music is slow, and listeners simultaneously study, sleep, and so on. I like everything to be chill, even though I am constantly on the move and very active. Interestingly, in my recently released EP, the tempo of the tracks has increased a bit so that people can listen to it in much more varied situations than before, especially for fun and entertainment. Therefore, perhaps due to the recent change in my mood, this has happened, and the tempo of the works is both high and low. In other words, my effort has been to show people the mood switch in my album and how they can experience such a thing in their own lives. For example, when you read a book in the romance genre or watch a film in this genre, it's not entirely romantic. Parts of it might be very sad, happy, hopeful, and so on. I see my musical approach in the same way." },

      { t: 'h', x: 'Against classification' },

      { t: 'qa', q: 'Your music is categorized as alternative, contrasting with mainstream Iranian music. What is your opinion about these classifications?', x: "I don't believe in such classifications in music, and I think everyone has their own set of mainstream musicians. For example, when I was a child, popular music meant someone sitting behind a piano and performing pieces, with the audience eventually applauding. So, in my opinion, everyone has a unique perspective and point of view, and based on that, mainstream is defined. Forget about mainstream and these definitions (laughs). The division of music only into these two parts seems really ridiculous to me. In such circumstances, everyone tries to be part of the mainstream, and everyone becomes similar to each other. I believe that everyone belongs to one stream. We are the ones who separate artists from each other." },

      { t: 'q', x: 'We are the ones who separate artists from each other.', who: 'Pozx' },

      { t: 'qa', q: 'How do you evaluate the current state of music in Iran?', x: "I think currently Iranian musicians are definitely working much better compared to previous years, and the music itself has become much more innovative. However, there is one unpleasant issue which is the lack of performance culture in Iran, and this cultural phenomenon hasn't changed for music audiences in Iran who are reluctant to spend money on music. This issue has nothing to do with the artists themselves because they are doing very well even in these unfavorable conditions. The problem is not that we don't like to perform, but rather that the audience is not willing to pay much for music, whether it's buying albums or concert tickets. So, if the issue of artists' performances in Iran can reach a satisfactory level, then Iranian music can truly make a mark on the world stage." },

      { t: 'qa', q: 'If you were a musician in Europe, the United States, or Canada and followed the same path, how would your position be different?', x: 'This is a very interesting question. Well, certainly, I would be operating at a different level right now because many prominent musicians like Steve Lacy are around my age, but our positions differ significantly. If I were to look at this matter realistically, if I were born in another country, I believe my position would be entirely different. However, I am truly content that I was born in Iran because wherever one is born, they grow up and mature with that culture. I genuinely love the culture of my country and all the familiar people around me, and I enjoy being Iranian because, in my opinion, many of my Iranian friends are more warm-hearted than my foreign friends (laughs), and at the same time, they are much more hardworking. So, I have never regretted not being born in, for example, the United States, and I don\'t really dwell on this matter.' },

      { t: 'qa', q: 'Do you currently make a living through music?', x: "Yes, because music is the only thing I know how to do, and I have always passionately pursued it in any circumstance. However, compared to the experience I have gained over the years and the time I have dedicated to this work, I have earned very little money, and generally, we don't make that much money from music. So, the notion that people have about us always living the good life is completely inaccurate." },

      { t: 'h', x: 'A different alphabet' },

      { t: 'qa', q: 'The language of your poetry, which is relatively different from colloquial language, is inspired by what?', x: "Well, I've always been immersed in music, and as a result, I've kept my distance from vocabulary. I believe most musicians are familiar with a different alphabet. I spoke with that alphabet, fell in love with it during high school, and suffered heartbreak with the same alphabet. Our alphabet consists of 'Do, Re, Mi, Fa, Sol, La, Si, Do,' with sharps, flats, etc. From the beginning, I wrote very simple poetry because I believe that music and harmony have the duty of conveying emotions to the listeners." },

      { t: 'qa', q: "How did you come up with this particular pattern in poetry, while I think there hasn't been any internal example with such a structure in Iranian music?", x: 'This pattern hasn\'t been specifically for me. From the beginning, I would put together a series of words with rhyme to convey my musical feelings more simply and to reach a wider range of music listeners. Thus, I could breathe life into those words in the form of music.' },

      { t: 'qa', q: "In my opinion, one of the fundamental weaknesses of alternative music in Iran is the musicians' inability to write lyrics, which has led artists to cover songs. Did you think from the beginning about producing music accompanied by vocals and lyrics?", x: "Firstly, I must mention that I disagree with you on this point because you have the ability to elegantly place a few truly ordinary and simple words together in such beauty and finesse that no one would notice their ordinariness. I didn't initially think that producing music necessarily had to be accompanied by vocals, and that's why I didn't sing myself at all. I was working on music with a friend of mine, Paria, and she wrote and sang all the vocals in English. Suddenly, after a while, I also felt inclined to sing myself, in addition to composing. I had ideas beforehand and had written some lyrics, and then I performed them along with piano and guitar." },

      { t: 'qa', q: 'How did "Begoo Kojaei" come about, and what concept did you have in mind?', x: '"Begoo Kojaei" initially started as a loop session video that I shared on Instagram a while ago. After its release, I realized that this track had the potential to become a complete piece of music. So, I decided to finish the lyrics and release it as a single track. Coincidentally, the release date matched my meeting with the TPM team for an interview, photo shoot, and video shoot for the magazine. It was at that moment, after hearing the piece, that they suggested making a music video for the track. We began brainstorming and gathering everything we wanted to include in the video.' },

      { t: 'qa', x: 'In essence, this piece for me is about "searching for something," as opposed to others\' interpretations of "searching for someone." In other words, everyone thinks that the title of the piece comes with a question mark and poses the question, "Where are you?" However, what I had in mind was a more imperative tone, as in "Tell me where you are right now, as soon as possible."' },

      { t: 'qa', q: 'What advice do you have for young Iranian musicians?', x: "My advice to young musicians would be to understand that everyone's life is their main stream. So, don't even think about music having a main or substream because there really isn't such categorization anymore. Everyone living and everyone making music, in my opinion, is part of their own main stream. So, just move forward with that understanding. I think that's the most logical advice for young musicians." },
    ],
  },

  {
    key: 'soheil',
    kind: 'feature',
    title: 'Soheil Alavi built a podcast with no music and no editing',
    subject: 'Soheil Alavi',
    discipline: 'Podcasting',
    standfirst:
      'Tabaghe 16 began on a sixteenth floor as founder-to-founder therapy. He has since left his startup for it.',
    cover: 'tpm-soheil-cover',
    images: [],
    minutes: 13,
    body: [
      { t: 'lead', x: 'In a world where stories are often polished and ready-made, *Tabaghe 16* by Soheil Alavi has carved out a different space; somewhere between art and everyday life, between a friendly conversation and a work of art. This podcast doesn\'t rely on flashy music or heavy editing, but instead invites listeners in through unfiltered honesty and meaningful silences.' },

      { t: 'p', x: 'Many first came to know Soheil Alavi as a successful entrepreneur and active figure in the Iranian startup scene, someone whose combined vision of technology and creativity helped shape a variety of projects and made him a familiar name in that community.' },

      { t: 'p', x: 'But his journey was never limited to his home country. After moving abroad, he immersed himself in new experiences across fields ranging from technology and digital arts to content creation and storytelling. All of these paths eventually led to the birth of Tabaghe 16: a podcast that, for many, has become not just an audio program, but a deeply human and artistic experience.' },

      { t: 'p', x: 'For this issue of the magazine, I sat down with him to talk about *Tabaghe 16*, a project that began in a sixteenth-floor apartment and has since become an honest window into the inner worlds of creators and seekers of meaning. For me, *Tabaghe 16* was more than just a podcast; it was an artistic and human experience that redefined the boundary between personal storytelling and cultural work. That was what made me want to reach out to Soheil, and to explore with him the journey and the essence of his podcast.' },

      { t: 'divider' },

      { t: 'qa', q: 'After your successful experiences in startups and business, what led you to start a podcast?', x: 'I realized there is always a gap between what people usually say in public and what founders actually go through. On stage or in interviews, you mostly hear polished stories. But in private, when it is just two founders talking, that is where the real stuff comes out. The doubts, the dilemmas, the mistakes you would never admit publicly but that actually shape who you are.' },

      { t: 'qa', x: 'Those off-the-record conversations always felt like therapy to me. You could be vulnerable, drop the shield, and talk about what it really means to build and struggle. And I realized how much of a privilege it is to even have those conversations, because not everyone has access to that circle.' },

      { t: 'qa', x: 'So I thought: what if I could recreate that feeling for others? A place where it is not about teaching or preaching, but about sharing raw, honest conversations. I wanted to make it less of a "show" and more like sitting with a friend. In a way, the podcast became my way of opening up that founder-to-founder therapy room to a much bigger tribe of people who might be searching for the same thing.' },

      { t: 'qa', q: 'Where did the idea and the name Tabaghe 16 come from?', x: "The name came from the 16th floor where I used to record the podcast. At first it was just a physical place, but it quickly became something more. It was a space that felt private and familiar, like hanging out at a friend's place late at night. That is the atmosphere I wanted to create. Not a coffee shop, not a public stage, but a spot where you can drop the mask and just have a real conversation." },

      { t: 'qa', x: '*Tabaghe 16* started with founders and people in the startup world, but I have realized it speaks to a much wider audience. Anyone who is building something, whether it is a company, a career, or even just a new chapter in life, faces their own challenges. In that sense, **everyone is a kind of founder or creator**. So the podcast became a place where those honest stories could be shared, without filters or performances. Listeners are not just overhearing an interview, they are right there with us in the room, part of the conversation.' },

      { t: 'qa', q: 'Was it more of a personal need, or something bigger?', x: "It started as something very personal. For me, those private founder-to-founder talks always felt like therapy, a place where you could drop the mask and be vulnerable. I wanted to recreate that same safe space, not just for myself but for anyone listening who needed to hear they weren't alone." },

      { t: 'qa', x: 'At the same time, there was also a deeper, cultural reason. In our society, feelings like doubt, fear of failure, or not being "enough" often stay hidden. The longer they remain unspoken, the more people start to believe they\'re wrong to even have them. I wanted to break that silence and show that these struggles are universal.' },

      { t: 'qa', x: 'For me personally, *Tabaghe 16* became both therapy and self-expression, a way to turn vulnerability into strength, and to connect with people in the most honest way possible.' },

      { t: 'h', x: 'No music' },

      { t: 'qa', q: 'You do not really use music or sound effects. Why is that, and how do you think it affects the final result?', x: 'For me it was simple: I wanted it to feel real. When you are actually sitting with someone you trust, there is no soundtrack in the background. It is just voices, pauses, sometimes laughter, sometimes silence. And those silences are powerful because they carry emotion in a way music cannot.' },

      { t: 'qa', x: 'I did not want to hide behind production. The honesty of the conversation had to stand on its own. That choice gave *Tabaghe 16* a rawness, almost like you are overhearing something you were not supposed to. It is not polished like a radio show, but that is exactly why people connect with it.' },

      { t: 'qa', q: 'Did you model it on any artistic or literary tradition?', x: 'I think every founder or creator brings their own mix of influences. Just like in startups, you take small pieces from different places, connect them in your own way, and something unique is born. It is never about following a single model. For me, it has been about drawing one thing from here, another from somewhere else, and blending them until it feels authentic to me.' },

      { t: 'qa', x: 'On the modern side, I have always liked the relaxed, unscripted style of Joe Rogan, the depth of Diary of a CEO or Lex Fridman, and even the vulnerability you hear in Theo Von. None of them directly define Tabaghe 16, but each left something with me. At the same time, I grew up in Iran where storytelling is a huge part of culture. Long nights of sharing poems, life stories, and philosophy without scripts or structure. That spirit stayed with me, and I think it naturally shaped how I wanted the podcast to feel: unfiltered, intimate, and timeless in a way.' },

      { t: 'h', x: 'Storytelling, and the margins' },

      { t: 'qa', q: "What impact do you think Iran's tradition of storytelling has on the taste of audiences?", x: 'Storytelling is in our DNA as Iranians. From poetry to long night gatherings, we grew up with stories being the way wisdom and emotion were passed on. That tradition shaped an audience that values depth, not just information, but the feeling that comes with it.' },

      { t: 'qa', x: 'What is different now is technology. With the click of a button, you can share your story with thousands of people. But here is the thing: in our culture, many of us learned to stay low profile, to keep our thoughts to ourselves. And I think that is a loss, because there are so many people with powerful stories and lessons who are not telling them.' },

      { t: 'qa', x: 'Technology does not have to just be about entertainment. It can be about education, engagement, and entertainment all together. I believe the future will not be about everyone tuning into the same few channels anymore. It is shifting to tribes, many-to-many conversations, where people find their group and share openly. That is where *Tabaghe 16* fits in. It is continuing an old tradition of storytelling, but powered by new tools that make it possible for those stories to reach and build new tribes.' },

      { t: 'qa', q: 'For you personally, does the microphone feel more like a stage or like a friend?', x: 'That description is very accurate, and honestly it was intentional. I never wanted the podcast to feel like a lecture or a stage performance. For me the mic is not a stage, it is more like sitting across from a friend late at night, having a real talk.' },

      { t: 'qa', x: 'Part of that is about vulnerability. I try to be open, to confess my mistakes and doubts easily, because I want guests, and listeners, to feel they can do the same. When someone hears you admit to a failure without fear of being judged, it releases that pressure inside them. They realize they are not alone, and in fact, it takes courage to put it into words.' },

      { t: 'qa', x: 'Life is not supposed to be a perfect sequence of right moves. The wrong and the right are woven together, and that mix is what makes us human. By being vulnerable myself, I try to show that mistakes are not something to hide, they are something to share, because sharing them turns them into lessons for everyone.' },

      { t: 'q', x: 'The mic is not a spotlight for me. It is a companion, a witness.', who: 'Soheil Alavi' },

      { t: 'qa', q: 'What matters more: honesty in words or beauty in form?', x: 'For me, honesty always comes first. If the words are not real, no level of polish will matter. People can sense when something is authentic and when it is just staged.' },

      { t: 'qa', x: 'But I also cannot dismiss form. To me, form is like a tactic delivered in style, it shapes how the truth is received. I find joy in making the conversations flow well, in the silences, in the little details that make it feel right. I am competitive enough to want every aspect to satisfy something inside me.' },

      { t: 'qa', x: 'It is like Toy Story. At the time it was an animation masterpiece, but it would not have mattered without a powerful story behind it. The form was groundbreaking, but the story is what made people fall in love. That is how I see *Tabaghe 16*. Honesty is the story, and form is the craft that makes it resonate even deeper.' },

      { t: 'h', x: 'What came back' },

      { t: 'qa', q: "How have the audience reactions been? Has there ever been a message or listener's story that left a strong impact on you?", x: 'The feedback has been one of the most moving parts of this journey. When I started, I thought of it as founder-to-founder therapy, but I did not expect how deeply it would resonate with people outside of startups. I have had messages from listeners saying the podcast gave them the courage to finally start the project they had always dreamed of, or the strength to push through a hard moment in life. Some even told me it completely changed how they saw themselves and their future.' },

      { t: 'qa', x: 'Honestly, I cannot think of better feedback than that. In startups, we are proud when a product saves someone five minutes of time, and that is valuable. But here, the feedback is profoundly life-changing for people. That is on a different level.' },

      { t: 'qa', q: 'What differences do you see between Persian podcasts and foreign ones, and between their audiences?', x: 'One big difference is in the culture of conversation. In English-language podcasts, there is a long tradition of being direct and open, even brutally honest, about personal struggles or controversial topics. In Persian culture, people are often more cautious, more careful about what they say. That makes the audience hungry for honesty, but also sometimes surprised when they actually hear it.' },

      { t: 'qa', x: 'Another difference is how the message is received. I have noticed that sometimes in Iran, the internet audience will take a small byproduct of something said in a podcast and blow it up, while missing the whole core message. It really shows me how much we have been wired to focus on the margins rather than the essence. And I think it is not by accident; it comes from living in a society where people often feel powerless to impact the core, so they channel energy into the margins instead.' },

      { t: 'qa', q: 'If you had created Tabaghe 16 in Iran, how would it have been different?', x: 'Honestly, I am not sure I would have even started it in Iran. One of my motivations was to close a gap, to make Iran feel more connected to the world and part of the international conversation. In recent years, immigration and the Iranian diaspora are no longer just a separate group; almost every family has someone abroad. And yet, because of what is happening in the country, people inside are becoming more and more disconnected from the outside world.' },

      { t: 'qa', x: 'I wanted to bridge that. I wanted to create a space where Iranians could hear directly from those working at global companies, seeing how they think, what tools they use, how they operate. At the same time, I wanted the outside world to see the incredible talent inside Iran. Our startups are working at the highest levels, and when international listeners hear these conversations, they are often blown away by the skill and depth of the people I host.' },

      { t: 'h', x: 'Keeping the gaps in' },

      { t: 'qa', q: 'When you first started, what expectations did you have?', x: 'When I first started, I honestly had no big expectations. It began as an experiment, a way to capture those raw conversations I was already having with founders and creators. I thought maybe a small circle of people would listen, mostly those who shared the same struggles.' },

      { t: 'qa', x: 'What I did not expect was how wide the impact would become. Now I feel, or maybe I just want to believe, that this means I have a bigger purpose. If life brought me here, maybe it is a sign there is a responsibility on my shoulders. When I hear Gen Z and Gen Alpha say they listen to *Tabaghe 16*, I realize it carries a cultural weight. I do not even think of it as a tech podcast anymore. For me, it has become a cultural project, a space to preserve honesty, vulnerability, and connection in our community.' },

      { t: 'qa', q: 'Have you ever regretted releasing an episode after publishing it?', x: 'There have been moments where right after publishing, I wondered if I had said too much, or if a guest had been too vulnerable. You feel protective, both of yourself and of them. But over time, I learned to be okay with that feeling. It actually made navigating life easier. I stopped overanalyzing, stopped eating myself up over what was right or wrong, or what people might think.' },

      { t: 'qa', x: 'Honestly, I do not really care what people think about me. What I care about is whether the guest feels okay with what we put out. That is where my responsibility lies.' },

      { t: 'qa', x: 'And I think part of the magic of *Tabaghe 16* is in keeping things raw. I even tell my editor not to cut out the gaps. If we take a break to grab water or use the washroom, I want that in there. Because that is the real rhythm of a conversation. The listener is part of that vibe too, it is not a polished performance, it is all of us just living that moment together.' },

      { t: 'qa', q: 'You do not have sponsors or big backers. What challenges has this independence created?', x: 'For me, creating the podcast was never about money in the beginning. I already had my own startup, so income from *Tabaghe 16* was not something I needed to depend on. That gave me the freedom to do it purely from the heart, not from logic, not from optimization. I did it at my own pace, on my own terms. And I loved that freedom, so I protected it.' },

      { t: 'qa', x: 'At the same time, I do not see money as something evil. Money is fuel, it is what lets you scale an idea once it proves itself. And at some point, I realized the podcast had proved itself. What started as a side project began to feel like my real startup. That is why I recently stepped back from the day-to-day operations of my company and shifted my focus toward the podcast. Now I treat it exactly like a startup: raising funds, hiring, building a team, changing the operations while keeping the outcome intact.' },

      { t: 'qa', x: 'So independence was not really a challenge, instead it was a privilege. It let me build *Tabaghe 16* without compromise. And now, just like with any startup, the challenge is how to take it to the next level without losing the soul that made it special.' },

      { t: 'h', x: 'The tribe' },

      { t: 'qa', q: 'Will Tabaghe 16 expand into other mediums or spaces?', x: 'The way I see it, *Tabaghe 16* was never just a podcast. The medium casts a shadow that makes people think that is all it is, but from the very beginning it has been a community. The show was only the visible part of something larger.' },

      { t: 'qa', x: 'Around it, a group of people started forming. We talked to each other, we trained together, we organized events, we shared resources, we collaborated on projects. It naturally grew into a tribe. That is why when I say I am focusing more on *Tabaghe 16*, I do not just mean recording more interviews. I mean building out the entire ecosystem around it.' },

      { t: 'qa', x: "For me, the podcast is simply one expression of the community. The bigger vision is to expand into online communities, events, media projects, maybe even a founders' fund. I see it as a living network, a place where people connect through honesty, creativity, and the shared experience of building." },

      { t: 'qa', q: 'Any final words for our readers?', x: '*Tabaghe 16* has never really been about me. It has always been about us, a place where honesty and vulnerability are not weaknesses but bridges. A place where we can sit together, share our doubts, our wins, our mistakes, and realize we are not alone.' },

      { t: 'qa', x: 'I am grateful to everyone who has listened and shared their stories. You have turned this from a podcast into a community. And I believe this is only the beginning. My hope is that *Tabaghe 16* goes beyond being a show. That it becomes a new way of living, thinking, and collaborating.' },

      { t: 'qa', x: 'Because in reality, there is not just one *Tabaghe 16*. There are many. In every country, every city, every neighborhood, there are small circles of people coming together in their own way. What excites me is the idea that through this movement, and maybe even through a podcast network, we can connect those circles, so they do not feel isolated but part of something larger.' },

      { t: 'line', x: 'For me, the podcast is just the seed. The real vision is to grow a culture of communities that help us thrive together.' },
    ],
  },

  {
    key: 'slang2',
    kind: 'feature',
    title: 'The Beginner\'s Guide to Persian Slang, Volume #2',
    subject: 'Persian slang',
    discipline: 'Language',
    standfirst:
      'The words and phrases you will not learn in class or read in classical literature.',
    cover: 'tpm-slang2-cover',
    images: [],
    minutes: 7,
    body: [
      { t: 'open', x: "There was a time recently when I had forgotten that perhaps I shouldn't speak to others the same way that I do with my friends. Slang is often used as a way to form a special type of communication with a particular subset of people — and this is where concepts like 'code-switching' come from — where certain groups of people often change the way they speak depending on the situation or who they're speaking to." },

      { t: 'p', x: 'I was speaking to someone who I had met at the gym, a guy who was 43 years old (i.e. 23 years my senior, at the time). He was telling me about his journey and how his body had changed in the past year, and with the intention of expressing my approval for his efforts, I said, "yeah, you really ate."' },

      { t: 'q', x: 'I ate?' },

      { t: 'q', x: 'Oh, you mean I ate and got fat. Thanks.' },

      { t: 'p', x: 'This is only a mild example of slang used in the wrong situation. Like the fatally flawed humans whose uncensored emotions it represents, the most commonly-used slang tends to link with sex and relationships, the body and its functions, and intoxications such as drink and drugs. **As always, be careful with many of the phrases you read in this guide**, as most are not appropriate to use outside of conversations with friends, and some can be offensive.' },

      { t: 'line', x: 'These are the words and phrases you won\'t learn in class or read in classical literature.' },

      { t: 'divider' },

      { t: 'term', x: 'Abji / Aji', fa: 'آبجی / آجی', def: "An informal term to call your (usually older) sister. The shortened version Aji, however, is the Persian equivalent of 'sis' in English, and so may be used to refer to anyone." },

      { t: 'term', x: 'Badfaz', fa: 'بدفاز', def: 'A cold and moody person, generally someone with a negative aura.' },

      { t: 'term', x: 'Barnamz', fa: 'برنامز', def: 'Making plans to see one another.' },

      { t: 'term', x: 'Binamoos', fa: 'بی ناموس', def: 'An insult that you can use towards anybody, even though it literally means someone who has no significant female figures in their life (such as a mother, sister, or girlfriend).' },

      { t: 'term', x: 'Dahan service kardan', fa: 'دهان سرویس کردن', def: "Literally means 'to service one's mouth'. It sounds obscene in English, but this is a very idiomatic phrase that can mean different things depending on the tone and context. You may say 'Dahanet service!' if a friend has either said something very funny that made you laugh, or something wrong that has annoyed you. You may also say 'dahanam service shod' if someone has talked or bothered you so much to the point of annoying you, or something else has tired you out, such as your school exams for example." },

      { t: 'term', x: 'Dor dor', fa: 'دور دور', def: 'This term refers to when separate groups of young men and women drive around in cars, usually on certain boulevards in the evenings, pulling up alongside each other in traffic so they can flirt and exchange socials or phone numbers through the window.' },

      { t: 'term', x: 'Joon', fa: 'جون', def: "This is the word for the essence of life but is also used colloquially as a term of endearment. The meaning easily changes, however, to express sexual attraction or arousal once pronounced with more stress on the vowels or when dragged out (i.e. 'joooon')." },

      { t: 'term', x: 'Joozi', fa: 'جوزی', def: "An adjective used to describe someone who's always paranoid." },

      { t: 'term', x: 'Kalan', fa: 'کلان', def: "The police, or 'the cops'." },

      { t: 'term', x: 'Khaz', fa: 'خز', def: 'This word originally refers to fur (as a material rather than on a living animal), but can also be used to refer to something or someone as almost cringingly out-of-fashion.' },

      { t: 'term', x: 'Kheyli khiare', fa: 'خیلی خیاره', def: "Literally meaning 'that's so cucumber', this phrase is used to describe something as being unattractively cringe, disreputable, or unfashionable. Similar to the American words 'ratchet' and 'ghetto'." },

      { t: 'term', x: 'Khoshfaz', fa: 'خوشفاز', def: 'Someone easygoing, positive and fun.' },

      { t: 'term', x: 'Kooft', fa: 'کوفت', def: "Meaning something along the lines of 'pain', this word is often used similarly to 'shut up'." },

      { t: 'term', x: 'Lash style', fa: 'استایل لش', def: 'A style somewhat popular with teenagers, inspired by 90s American hip-hop culture and modern Korean streetwear. It emphasises large, baggy and oversized clothing.' },

      { t: 'term', x: 'Palang', fa: 'پلنگ', def: "This is the word for a leopard, but 'palangs' are also part of a subculture of women who are obsessed with beauty and look outlandish and exaggerated in appearance. With Iran having become one of the world's leading capitals for cosmetic surgery, the 'palang' look today manifests in the form of highly excessive surgeries and fillers, but can otherwise also be characterised by over-the-top makeup and flamboyant clothing." },

      { t: 'term', x: 'Palasht', fa: 'پلشت', def: 'A dumb person, an airhead.' },

      { t: 'term', x: 'Pedar Sag', fa: 'پدر سگ', def: 'A common insult you would call someone, literally meaning that you are calling their father a dog.' },

      { t: 'term', x: 'Samm', fa: 'سم', def: "Meaning 'poison' or 'toxic' depending on whether it's used as a noun or an adjective. This is also what memes are referred to as." },

      { t: 'term', x: 'Sootoon', fa: 'ستون', def: "Meaning 'pillar' or 'column', this is a word also used as slang, mostly amongst men, as a term of endearment to each other. A common variation is 'sootoon-e gang', which itself tends to be perceived as a phrase only used by cringe straight men." },

      { t: 'term', x: 'Yobs', fa: 'یوبز', def: 'See *Palasht*.' },

      { t: 'term', x: 'Yool', fa: 'یول', def: 'See *Palasht* also.' },

      { t: 'term', x: 'Zahre Mar', fa: 'زهرمار', def: "Meaning 'snake venom', this is a more advanced and impactful form of *'khafe sho'*, or 'shut up' in English." },

      { t: 'note', x: 'By Cyrus Jarvis.' },
    ],
  },


  {
    key: 'poobon',
    kind: 'feature',
    title: 'Poobon on a decade at the centre of Iranian music',
    subject: 'Poobon',
    discipline: 'Music',
    standfirst:
      'Drum & bass that should not have worked, collaborations with Hichkas and Tory Lanez, and why the quiet years matter most.',
    cover: 'tpm-poobon-cover',
    images: [],
    minutes: 15,
    body: [
      { t: 'lead', x: 'When we step into the vast and unpredictable world of music and take a closer look at the lives of musicians, we begin to understand the relentless work, risk, and persistence behind every song that finds its way to our ears. *It soon becomes clear that lasting success is never the product of chance.*' },

      { t: 'p', x: "To remain relevant for years, to win the hearts of a wide audience, and to gain the respect of serious critics — this is a rare combination, and a true measure of artistry. For many listeners, one of the great joys of music is discovering voices that signal something fresh on the horizon — artists who might shape the future of Iran's ever-shifting musical landscape. And yet, the past two decades have shown us just how fleeting fame can be: countless newcomers appear with a hit single, only to fade away as quickly as they arrived. What separates a lasting artist from the rest is not luck, but vision, creativity, and the courage to experiment." },

      { t: 'p', x: "Poobon is a striking example of this. For nearly a decade, he has not only stayed at the center of Iran's popular music but has also defined its energy and ambition. Whether one loves or resists his work, it is difficult to deny his mastery and his drive to push boundaries. In a scene shaped by constant change, his presence feels like a reminder that Iranian music's evolution depends on those who choose innovation over repetition, and boldness over comfort." },

      { t: 'p', x: 'Listeners today are more open than ever to new sounds, even those that may initially feel unfamiliar. This openness is not accidental — it is the result of musicians like Poobon, who have taken the harder road of experimentation, often facing waves of criticism for refusing to play it safe. His path has never been about fitting into ready-made categories. He was never quite a rapper, yet his role in Persian rap is undeniable, marked by collaborations with some of its most significant voices. In fact, many listeners admit to waiting through an entire track just for the moment Poobon\'s voice appears.' },

      { t: 'p', x: 'What sets him apart is not only his original work but also the way he approaches reinterpretation. **A Poobon cover is never just a cover** — it feels like the unveiling of something entirely new. This vitality and reinvention, whether in his own music or in reimagined pieces, has allowed him to carve out a place in Iranian music that remains uniquely his.' },

      { t: 'p', x: "Over the years, I've found myself returning to a question: what makes certain songs so quickly become collective experiences — sung, shouted, or whispered in gatherings across Iran and even far beyond its borders? Beyond the nostalgic treasures of Iranian pop, only a handful of contemporary songs carry this power. And yet, Poobon's voice has repeatedly been part of these shared moments, threading itself into the soundtrack of countless lives." },

      { t: 'divider' },

      { t: 'qa', q: 'On paper, drum & bass seemed quite alien to the listening tastes of mainstream music audiences in Iran. Yet the very tracks you released in that style brought a meaningful leap in your musical trajectory. Before releasing them, did you anticipate such positive feedback, or were you simply trying something different without considering the possible outcomes?', who: 'HOSSEIN', x: "Honestly, throughout the projects I've made over the past two or three years, I never thought about the end result. There were times I was absolutely sure a piece had the makings of a hit — and it simply wouldn't happen. Conversely, tracks I put together very quickly, sometimes in less than a day, ended up playing a major role in my career. The drum & bass pieces were in that second category." },

      { t: 'qa', x: "Years ago, when I was living in Iran, I had made plenty of tracks in this style, but I never found the right opportunity to properly fuse the identity of Iranian music with drum & bass. Then one day in the studio, while working on a project, I felt in the moment that this track was strong, had real potential, and — put simply — was really cool. Still, I didn't expect it to succeed at this level. My priority has always been to enjoy what I create." },

      { t: 'qa', x: "What made it even more striking was that the piece was electronic and, in fact, left relatively little room for vocals. In other words, it went completely against everything I thought I knew about the Iranian music market. That's why, as I mentioned, from that point on I stopped thinking about the possible outcomes of my projects and focused solely on making what genuinely makes me happy. Performing these songs at concerts and seeing how much people loved them was fascinating." },

      { t: 'h', x: 'Inside and outside' },

      { t: 'qa', q: 'I feel that pursuing music is equally challenging for musicians living in Iran and for Iranian musicians abroad. As someone who migrated years ago, what have been the positives and negatives of this decision?', who: 'HOSSEIN', x: "I completely agree with your perspective. For Iranian musicians, challenges exist no matter what — whether you're in Iran or outside of it. Still, both sides come with their own advantages and disadvantages. For musicians inside Iran, it's naturally much easier to recognize what today's audience wants — to sense what kind of music resonates culturally at a given moment. That closeness allows listeners to feel a stronger connection with you, and as a result, there's a much deeper emotional exchange between the artist and the audience." },

      { t: 'qa', x: "But the most obvious downside for musicians in Iran is the prohibition of any official activity within their own country. Beyond censorship and filtering, there's always the possibility of arrest. They also don't have access to credit cards, which means they can't receive payments from streaming platforms. Professionally, these obstacles pose serious risks." },

      { t: 'qa', x: "On the other hand, the greatest advantage for Iranian musicians abroad is the ability to connect with and collaborate with major producers. But the most evident drawback is being physically separated from their own people. Since Iranian listeners don't have access to major platforms, this inevitably impacts a musician's career. The success of an international artist is measured through platforms like Spotify, which labels take very seriously and use as the basis for signing contracts. Alongside that, the clear cultural differences with local audiences can't be overlooked. Under such conditions, a significant distance emerges between you and your listeners — and in my view, that distance is the most pressing challenge for Iranian musicians living abroad." },

      { t: 'qa', q: "You're one of the few musicians who actively follow the current state of Iranian music and pay close attention to emerging rappers inside the country. What are the main factors you consider when choosing Iranian-based musicians to work with?", who: 'HOSSEIN', x: 'I mostly collaborate with artists who create a movement of their own. This has nothing to do with my personal taste, or even with whether I think their work is "good" or "bad." One of my reasons for collaborating is to challenge myself by stepping into different currents of music, and to test my ability to build working relationships and reach mutual understanding with other artists in a variety of projects. That way, we can complement each other\'s strengths and weaknesses and ultimately produce something valuable.' },

      { t: 'qa', x: "Another reason is that I genuinely like bringing together listeners from different scenes, and I feel that this has started happening in Iranian music in recent years. For example, I collaborated with Safir, one of the old-school underground rappers in Iran, and I think moments like that help break down listeners' barriers. In other words, by presenting such projects, we can broaden the listening tastes of society as a whole. So, the point shouldn't be that underground musicians must only work with one another. Ultimately, these collaborations help merge different communities — and that has been the central aim of my recent work." },

      { t: 'h', x: 'A debt to hip-hop' },

      { t: 'qa', q: "You can never really be categorized as a rapper. So why have you always tried to maintain your connection with Iran's hip-hop community?", who: 'HOSSEIN', x: "That's absolutely right — I'm no longer a rapper. These days my style leans more toward electronic pop. But I myself used to rap, and my first steps were in rap and beat-making. I never managed to release those early tracks because distributing music back then was far more difficult, and since we were very young, we were just doing it for fun. There was no clear goal, no real motivation behind it, and certainly no vision for the future. Everything was defined in the moment. Hip-hop culture had only just arrived in Iran and it was incredibly hot." },

      { t: 'qa', x: "Even though my music today isn't hip-hop, I've always considered myself indebted to that movement and a part of Iran's hip-hop family. In my view, hip-hop in Iran was nothing short of a revolution — Persian hip-hop was the starting point for independent music as we know it. So, all of us artists who found our paths afterward owe a debt to that wave. That's why Iranian hip-hop has always been something deeply sweet and valuable to me." },

      { t: 'qa', q: 'What do you think are the reasons behind the current success of Persian rap compared to other music scenes in Iran?', who: 'HOSSEIN', x: "Persian rap has always been powerful because of its authenticity — because it came directly from the people. In reality, it belongs first and foremost to the people of Iran. This genre isn't just for a handful of artists or rappers; it's for the people. Everyone feels a personal sense of ownership over it, and that's what makes it so strong." },

      { t: 'q', x: 'It belongs first and foremost to the people of Iran.', who: 'Poobon' },

      { t: 'h', x: 'The gap' },

      { t: 'qa', q: "I believe the Iranian music market, within its own means and limitations, has reached a fairly respectable level. Still, there's a significant gap compared to the world's major music markets. What short- and long-term strategies should be adopted to help bridge it?", who: 'HOSSEIN', x: 'For Iranian music to reach its full potential, collaboration is essential between two groups: artists and audiences on one side, and the government on the other. Without unity between these two, the goal will never be achieved. Right now, both artists and audiences are already giving their maximum. Countless concerts are being held abroad, and listeners inside Iran mostly engage with music through streaming platforms. Artists are investing in improving the quality of their work — for example, international collaborations, which are one way to carry our sound to audiences in other countries. I, along with artists like Arta and Koorosh, have pursued this path many times.' },

      { t: 'qa', x: "So, what you see today is essentially the very limit of what Iranian artists and listeners can achieve independently. But it's still not enough. Support and promotion from the government matter far more than any other factor. When artists are denied the possibility of appearing on television or performing in cities and stadiums in their own country, it inevitably creates a huge barrier in their path. Meanwhile, in many countries, music is regarded as something highly significant. When artists there reach a certain level, it's clear that their success hasn't come solely from independent activity — it's the result of labels, investment, and governmental support smoothing the way." },

      { t: 'qa', x: 'In this landscape, when you have global markets investing billions of dollars, how could a handful of independent Iranian artists possibly compete? It\'s practically impossible, and the reason is obvious. In fact, the current standing of Iranian music — achieved under such independent and restrictive conditions — is already remarkable and deserves genuine admiration.' },

      { t: 'qa', q: "A major part of a musician's identity is often measured by their albums. It's been nearly five years since your last one. Why is that?", who: 'HOSSEIN', x: "At the moment, my focus is mainly on singles. That said, I've also been working on an album in parallel for quite a while. Right now, I'm in a phase where I want to explore a wider range of experiences — on one hand, I'm still learning, and on the other, I'm also sharing what I've learned with others. Because of this variety of activities, it's difficult for me to stop everything and dedicate myself fully to just one project. So, the album is gradually taking shape alongside my other work. As I mentioned, I'm currently producing singles and performing concerts, but I can promise you this: by next year, you'll definitely hear a new album from me." },

      { t: 'h', x: 'Variety over formula' },

      { t: 'qa', q: "What's the biggest mistake you've made in your professional career? And on the flip side, what's the boldest decision you've made that you now admire yourself for?", who: 'HOSSEIN', x: 'Honestly, I don\'t see any mistakes in my career. And I don\'t say that out of pride — it\'s just that nothing comes to mind where I could say, *"If I hadn\'t done that, everything would be different now."* But the best and boldest decision I\'ve made so far has been to always try different paths and never be afraid of new experiences. I\'ve never thought about whether a choice would bring more streams or harm my career. I\'ve simply done whatever I loved in the moment, as long as my mind affirmed that it felt right musically.' },

      { t: 'qa', x: 'This approach has brought me a lot of positive feedback and has played a key role in the place I\'ve reached in Iranian music today. Many artists, once they become famous, stick to repeating the same "successful" formula without taking any meaningful steps forward. I\'ve always tried to do the opposite — to embrace variety. One day I might make a drum & bass track, the next I might experiment with reggaeton, or even sing in a pop style. On this path, anything can happen, and it all depends on how I feel in that moment.' },

      { t: 'qa', q: "In the past, the vibe you delivered was equally shaped by the music and the lyrics. Nowadays your focus seems to have shifted toward making your musical ideas richer, more mature. What made you take this turn, especially since your previous approach was already very successful?", who: 'HOSSEIN', x: "Right now, I'm moving along a path that I actually started a long time ago. It's just that many people may only notice a fraction of what I've done along the way, and naturally, some parts of that path might not be embraced by the majority. I genuinely love all my fans, I deeply respect them, and I've always said I owe everything to them. But at the same time, what matters most to me is my own journey. So, neither public opinion nor the urge to satisfy others can shape my direction." },

      { t: 'qa', x: "The fact that my work now feels more advanced or complex is really just a reflection of how my personality itself has grown and become more layered compared to before. I can't hold myself back just because a big part of my audience connected more with a certain era of my career. My technical skills have grown much wider, and naturally, I now find myself in a place — both within the Iranian music community and globally — where I have to showcase that. I need to create music that reflects the extent of what I've learned, so that if one day I sit in a studio with a major international artist, I'll have something truly valuable to bring to the table." },

      { t: 'qa', x: "That said, I'll always be grateful to anyone who has been with me at any point in this journey. My older music is still out there, and whoever feels more connected to that particular era can always go back and listen to it. Tastes and listening preferences are naturally different, so the only path that makes sense for me is to stay true to my own taste and my current state of mind." },

      { t: 'qa', q: 'What is your usual method for coming up with new ideas in songwriting and composing?', who: 'HOSSEIN', x: 'In my opinion, the best ideas always come during practice. For instance, if you want to compose a good piano piece, the first step is simply to practice piano. After spending some time at it, suddenly — almost as if from some vast database or another world — great ideas just appear in your mind. It feels exactly like a miracle. That\'s why, whenever I want to create something truly good and high-quality, I start with practice and improvisation.' },

      { t: 'qa', q: 'Over the past decade your name has consistently stood out as one of the leading figures in contemporary Iranian music. What challenges have you faced in keeping that position, and what advice would you give to younger musicians?', who: 'HOSSEIN', x: "In my view, the difference between successful artists and those who appear for a while and then disappear lies in consistency and discipline. And this isn't only true in music — it applies to any field. Alongside consistency and discipline, you also need a visual presence; you have to continually put yourself in front of people's eyes. If you do that, you'll never lose your place. Just look at many of our artists who are now in their sixties, seventies, or even eighties but are still active. They keep releasing music every year, performing concerts, and maintaining that visible presence." },

      { t: 'qa', x: "So, my advice to younger artists would be: don't get overly caught up in views, fame, or money. These things will ultimately distract you from your true path and your fundamental mission as an artist. Your focus should be solely on improving the quality of your work. Once you do that, you'll see that fame, popularity, money, and opportunities will all line up before you. The most important factor in music is producing a quality product. Just like a chef is judged by the taste of their food, a musician is judged by the quality of their music." },

      { t: 'h', x: 'Hichkas, and Tory Lanez' },

      { t: 'qa', q: "Given that your *RUNAWAY* music video was so well-received and is the most-viewed video on your channel, why don't you usually release videos alongside your tracks?", who: 'HOSSEIN', x: "I've always wanted the music videos I make to go beyond being just regular clips — to truly add depth to the music. For me, a video shouldn't be just a superficial promotional product; it should be an artwork in itself. That's why, unless the right idea and the ideal conditions come together, I prefer to release fewer music videos, but ones with higher quality and greater lasting impact. That said, I'm currently working on several really big and exciting music video projects, and I hope I'll be able to bring them to completion soon." },

      { t: 'qa', q: 'Even when you release pop tracks, listeners can clearly distinguish your work from mainstream pop in Iran or Los Angeles. If you sing over a drum-and-bass track, there is still an unmistakable Iranian character in it. How have you achieved this ability to personalize every genre you work in?', who: 'HOSSEIN', x: 'I think this balance in my music comes from both experience and listening to a wide range of different genres. Like many others, I grew up with Iranian music, and over time, it became ingrained in me almost unconsciously. At the same time, I discovered Western music at a very young age because my older brother used to listen to some incredible artists. I remember our home was always filled with sounds from the Eagles, Michael Jackson, Linkin Park, Massive Attack, and so on. So, very early on, I was exposed to a variety of styles from different parts of the world. As a result, this "formula" isn\'t something I deliberately crafted — like deciding to mix Iranian music with another style. Instead, it\'s a natural and internalized blend, and that\'s why, whatever genre I work in now, this tone and character just surface on their own.' },

      { t: 'qa', q: 'What different kinds of challenges did working with Hichkas and Tory Lanez present?', who: 'HOSSEIN', x: 'Both collaborations were incredibly exciting and challenging in their own ways. The challenge of working with Hichkas was more emotional and cultural. I had been a huge fan of his since childhood, and in a way, it has always been the dream of the entire Iranian music market to collaborate with him. For me, this collaboration felt like a checkpoint in my musical journey.' },

      { t: 'qa', x: 'Working with Tory Lanez was fascinating on a different level. I had always wanted to sit in a studio with an artist of that caliber and just create music together — not necessarily with the goal of releasing it, but for the technical challenge of seeing how he works firsthand. I wanted to observe how he records vocals, how he writes and delivers his lyrics. Experiencing that process up close and comparing it with what we do was very eye-opening. I had always wondered if they were doing something otherworldly. But when I actually saw it, I realized they were essentially doing the same things we do. Of course, Tory Lanez is an outstanding artist, but in terms of process, there wasn\'t any major difference between us.' },

      { t: 'divider' },

      { t: 'qa', q: 'Any final words?', who: 'HOSSEIN', x: "I think something that isn't talked about enough is the impact of silence and stepping away from the public eye on an artist's creativity. What I mean is that sometimes these quieter periods, when an artist seems to disappear from the spotlight, are exactly when the best ideas are born. From the outside, it might look like a lack of releases equals inactivity, but behind the scenes, I'm constantly creating and experimenting." },

      { t: 'qa', x: "Every day I'm writing, exploring, and developing new ideas to eventually share with my audience so we can enjoy them together. For me, this is extremely important. From 6 a.m. when I wake up until midnight when I go to sleep, I'm working nonstop on music. My thoughts, my friends, my schedule — everything revolves around it. Every chance I get, I'm learning. One interesting experience during this period was teaching around 70 people, both online and in person here in Toronto. That turned out to be a really valuable journey, because teaching has made me much stronger as an artist too. It keeps me in a state of constant learning throughout the day." },
    ],
  },
  {
    key: 'niousha',
    kind: 'feature',
    title: 'Niousha Noor on The Persian Version and the cycle it might break',
    subject: 'Niousha Noor',
    discipline: 'Film',
    standfirst:
      'The actor on stereotyped auditions, a standing ovation at Sundance, and asking her own mother questions she had never thought to ask.',
    cover: 'tpm-niousha-cover',
    images: [],
    minutes: 11,
    body: [
      { t: 'open', x: 'At the heart of *The Persian Version*, an American comedy-drama directed by Maryam Keshavarz, lies a message about cultural identity and family relationships. The Sundance award-winning film is loosely based on the director\'s life, who grew up in the United States, and was recently released in Europe — perhaps intentionally or by pure coincidence — at the beginning of the Persian year.' },

      { t: 'p', x: 'The film, starring Layla Mohammadi as Leila and Niousha Noor as her mother Shireen, tells the story of a young, gay Iranian-American woman navigating her relationship with her family, particularly her mother, after getting pregnant from a one-night stand with a drag queen. Where it really starts to take on true depth however, is when an extended flashback sequence begins, shifting us back to 1960s Iran, where a younger Shireen takes control ("played by the brilliant Kamand [Shafieisabet] in her first movie, by the way, she was phenomenal," says Niousha), in order to tell her own story: married off at 13 and pregnant not long after — a common trauma amongst Iranian women who grew up during the Shah\'s regime.' },

      { t: 'p', x: "When we hear the word 'trauma', we tend to associate that word with negativity. It's a type of pain well-known to most Iranians, no matter their economic or social status, nor their geographical location. Just as it's portrayed in The Persian Version, these traumas are not only experienced today but have been carried through generations, stemming back all the way to the Shah's regime and shaping the identities and behaviours of Iranians, especially women, who have always been disproportionately affected still to this day. In The Persian Version, however, the message appears to be that — perhaps — just maybe, learning about our own intergenerational trauma, rather than avoiding these conversations and even creating false stories to try and erase them, can help us better understand each other and ourselves." },

      { t: 'p', x: 'Niousha Noor herself is no stranger to the feeling of *ghorbat*, which in English could only be described as a sense of foreignness, or being trapped in a place that doesn\'t feel like home despite the hardest efforts. Based out of Hollywood, she moved to the US from Iran when she was 11. Having grown up around the world of cinema due to her father\'s work as a cinematographer in the Iranian film industry, she knew she had a calling to the arts, and finally decided to take the risk and jump into acting, after a stint in the corporate world, and having studied communications at university. She often found herself auditioning for roles that portrayed Iranians from a stereotypical American perspective, however, "and every time, it feels like it just chips away at your soul," she says.' },

      { t: 'p', x: 'The tide initially started to turn when, after a "dry spot", Niousha suddenly landed a role as Shahab Hosseini\'s co-star on a film called *The Night*, an Iranian film shot in the United States which became the first such co-production between the two countries since the Islamic Revolution. "What I liked about that film, was that it was just a psychological thriller about a husband and wife who are trapped in a hotel. It didn\'t have anything to do with national identity, national security and other things that we\'re usually prone to audition for here," she says. "And it critically did well. I got a good team because of that movie. I got a good agent, I got a good manager, and that\'s when I really started to see opportunities in a different way."' },

      { t: 'divider' },

      { t: 'qa', q: "It's quite amazing to have been able to be Shahab Hosseini's co-star — I mean, he's pretty much a superstar actor. What was that experience like?", who: 'NIOUSHA NOOR', x: "At first, of course, it's intimidating because he's such a good actor. He's a great actor and I've watched most of his films. But once you're in character, and you see how he works and the professionalism, it kind of just elevates your work, because you want to match. So that was an exciting part, and I felt like we had a good dynamic. I learned a lot from him. Overall it was a really cool experience. I think it was the first [American-made] film that got a theatrical licence to show in Iran as well [since 1979]. I made my cousins go out in Tehran and take photos of all the cinemas because my face and Shahab's face were on the marquees. Like Cinema Farhang — which was where I used to grow up. I used to go to that movie theatre all the time when I was a kid, so that was a cool full circle moment." },

      { t: 'h', x: 'Representation' },

      { t: 'qa', q: 'With this film also being the first co-production since the revolution between the US and Iran, I guess it was kind of like a bridge between the two countries in cinema for the first time. How important is this kind of representation to you?', who: 'NIOUSHA NOOR', x: "I mean, it goes without saying that film as a visual medium, it can create an emotional connection with audiences. I think it's a powerful tool in breaking stereotypes, shaping perceptions and influencing societal attitudes. Because of that, I've always been a big advocate of playing movies or characters where it prioritises the human experience, where the human is the focus, however flawed [they may be]. In that movie, it's just a husband and wife dynamic, and people could relate to that. Even The Persian Version — same thing — a mother-daughter relationship, strength of women, complex family dynamics, the traumas of the generations. I think these are the kind of stories we need, in order to turn a page on prejudice and on indifference. Stories that can extract empathy and you can really connect to. There's a lot of them, because we just have a lot more in common than we have differences. I try to take on stories or characters that show the multifaceted humans that we all are, like my role in Kaleidoscope on Netflix, which actually was a big hit in Iran as well. In that role I played a flawed FBI character, and my nationality was secondary and not important to the story." },

      { t: 'qa', who: 'NIOUSHA NOOR', x: "But of course I've auditioned for [those stereotypical or one-dimensional roles]. And every time you do, it just chips away at your soul. But it's changing — it was a lot worse years ago… here in America, you just feel this distance, and you feel like you're trying to climb out of this reductive generalisation, and show the human, and then it's just like… the writing… they almost want you to represent the ideology of like, 15 countries all of a sudden, and you're like, wait, what? So… it just feels very, not *khodemuni*… or not right." },

      { t: 'qa', who: 'NIOUSHA NOOR', x: 'I think, because of The Persian Version, and so many other films, the big executives and producers are now saying, "Okay, there is a hunger for authentic storytelling." It makes a huge impact on society.' },

      { t: 'h', x: 'Sundance' },

      { t: 'qa', q: 'When it comes to The Persian Version, that was a film that definitely had a very different angle on how Iranians are usually represented in Hollywood or American cinema. What was it like working on that film?', who: 'NIOUSHA NOOR', x: "You know, I've said this in past interviews, and I mean it. There was this collective excitement, and awareness of the magic that this film had, because of what you just said. We haven't had a lot of movies of this kind in a wide distribution. Unfortunately, it hit the [SAG-AFTRA] strike when it came out, but it was still released in over 700 theatres across the United States alone. That was unheard of. That was the kind of representation that we hadn't had. When we were making it, we all, the cast, the crew, we just knew we were making something special, even though you never know if that's going to translate on screen or if audiences are going to relate to it or not." },

      { t: 'qa', who: 'NIOUSHA NOOR', x: 'My first time that I saw the film actually was at Sundance, so that was a nerve-wracking experience. It was a packed theatre, like 600 people. There is a unique magic in seeing a room full of people from all walks of life, majority non-Iranian, united by the emotions evoked by this film and sharing laughs, shedding tears, dancing, being moved. And we got a standing ovation. Those are moments I will never forget in my career.' },

      { t: 'qa', who: 'NIOUSHA NOOR', x: 'I can\'t tell you how many people came up to us after to say funny things, like, "Oh, we didn\'t know Iranians were so hot!", because the brothers in the movie are also very good looking and so is Layla. Something as simple and shallow sounding as that, is actually still important. And so many mothers or daughters coming up to us and saying that the film makes them see and understand their mother or daughter in a different way. It was just so heartwarming to know that your portrayal or the story was able to cause these sorts of reflections in people. I couldn\'t ask for anything better. It was a very beautiful journey to be on.' },

      { t: 'h', x: 'Asking her mother' },

      { t: 'qa', q: "Was there anything about playing Shireen's character that maybe resonated with you on a personal level?", who: 'NIOUSHA NOOR', x: "I am not a mother in that sense, but I got to ask my own mother a lot of questions that I never thought to ask before. **We forget that they're a whole individual** with a plethora of feelings and emotions and experiences as a woman, or even as a man, but in the case of my mother, moving here at a young age and having two kids, I just always saw her as my mother and didn't really consider her individual psyche and her emotions as a woman coming here to this new country. I asked Maryam Keshavarz's mother a lot of questions as well, because that's who ultimately I was portraying. That was very insightful. Myself too, I moved here to the United States at the age of 11, also at a young age like her. So navigating these cultural nuances, I could relate to trying to fit in. Also, the strength of her, the inner drive, the inner resilience, the strength that she portrays… I've seen it in a lot of mothers, immigrant mothers, and especially of course, Iranian mothers. So it was an honour to bring that to the big screen, because it's a fact and a truth that we all know." },

      { t: 'qa', q: "This film explores a lot of intergenerational trauma that our people just seem to be plagued with, diaspora or not. When it comes to this cycle that a lot of people watching the film would have experienced themselves, do you think these are cycles that can be broken?", who: 'NIOUSHA NOOR', x: "I do. I think the medium of film is a powerful tool in helping that happen, because it holds a mirror up to us. I think showing these sorts of personal stories, depicting it in a way that's not judging or vilifying the characters, but just trying to understand one another, this medium of storytelling is so important. Again, so many Iranians who came up to me, and all the messages on social media from other screenings, just understanding, just seeing so much of themselves on the screen and that reflection, and I think that's very important. I think it can help break the cycle. We just need more authentic stories." },

      { t: 'q', x: 'It holds a mirror up to us.', who: 'Niousha Noor' },

      { t: 'qa', q: "The film also touched on other issues as well, such as Layla's queerness and topics about mental health. Shireen wasn't very approving of her daughter. Do you think that amongst our people, there is a lot of stigma still attached to these things?", who: 'NIOUSHA NOOR', x: "I think so. It's definitely changing. I see a change, at least in my family, and because of how times have changed and because of social media and how we have exposure to so much more than before, it's allowed us to have a wider understanding of the world, everyone in it, and all our differences. Something like The Persian Version, someone looks at it and understands the daughter, or feels more empathy for the daughter and how isolated she feels, because of the lack of affection that she feels her mother has towards her. And looking at the mother, in the beginning of the film, you don't really like the mother. She's mean, she's cold. But you understand her by the end, or at least that's the goal. It's not about justifying these reservations or prejudices that you have, but just understanding it — then you can turn a page from that." },

      { t: 'qa', q: "Absolutely. Looking to the future now, what's next for you?", who: 'NIOUSHA NOOR', x: "I've written this script that's in the process of development right now, that I can't say much about… but I'm very excited about this. And if all goes well, by September is when we can start the pre-production for this film, titled *Blue Flower*." },
    ],
  },

  {
    key: 'neena',
    kind: 'feature',
    title: 'Neena Roe grew up in Detroit and sings in Farsi anyway',
    subject: 'Neena Roe',
    discipline: 'Music',
    standfirst:
      'The cover of our first print edition. On microtones, Tumblr, and the cousin whose favourite song became her first Persian release.',
    cover: 'tpm-neena-cover',
    images: [],
    minutes: 14,
    body: [
      { t: 'p', x: 'Perhaps these days, popular music in Iran is experiencing its most exciting period yet, with phenomena emerging in various genres, from pop and rap as the most beloved and popular genres among youth, to various styles of alternative music. Among the plethora of musicians that have captured the attention of the young generation in recent years, selecting just one artist as the main figure for the first physical edition of "The Persian Magazine" was a challenging task.' },

      { t: 'p', x: 'While it seemed that due to the undeniable enthusiasm of Iranian youth for Persian rap and the significant portion of the magazine\'s ideology dedicated to youth culture and hip-hop, the most obvious approach would be to choose one of the faces of this music genre, it was **"Neena Roe"** who captured our attention due to her unique qualities and remarkable distinction from other Iranian musicians.' },

      { t: 'p', x: 'Neena is a singer, songwriter, and producer residing in the United States. Her works often blend indie-pop and R&B styles. Neena began her professional career with the release of the song "Chelsea\'s Song" in 2017, and after releasing several singles that were highly acclaimed by her audience, she is now in the final stages of producing and releasing her EP titled "How to be Alone."' },

      { t: 'p', x: 'In this intimate conversation with Neena about her life experiences as an Iranian immigrant in America, her family\'s artistic and musical background, her initial steps, and reasons for aspiring to become a professional musician, the obstacles and challenges of entering the music scene, the role of Iranian culture in her musical and non-musical thoughts, the significant expansion of her English-speaking audience as opposed to Iranian audiences, her familiarity with the current state of music in Iran and her knowledge of the new generation of Iranian musicians, the reasons for choosing the song "Bordi Az Yadam" as her first Persian project, the challenges and difficulties of operating in the American music market compared to the Iranian music market, and so on, we talked.' },

      { t: 'divider' },

      { t: 'qa', q: 'Neena introduces herself as follows:', x: "I'm Neena Roe, I was born in Detroit, Michigan. My parents and older sister were born in Iran. Aside from my own family, I didn't grow up around many Iranians. Detroit is around 80 percent Black, so most of my friends were from that background and I was immersed in Black culture, which I am grateful to have experienced. But my parents spoke Farsi with me at home since childhood. Later, when I was 14, we moved to a predominantly white suburb. At that age, the move was really hard for me, but I began to find my place after a year. It was a big lesson in adapting. Since then, I've lived in a lot of places like Chicago, New York, Los Angeles. I even lived in El Salvador for a year, that's how I learned Spanish. I think my Spanish is much better than my Farsi now (laughs)." },

      { t: 'qa', q: 'When you were younger, what genres of music were usually listened to in your family?', x: 'My parents always played Iranian music in the house and on drives. My dad was more into classical Iranian music and singers like Mohammad Reza Shajarian and Hayedeh. My mom liked the classics too but also Iranian pop music from the 90s — there was a lot of Googoosh and Moein.' },

      { t: 'qa', q: 'When did you realize that you wanted to pursue music professionally?', x: "Since I can remember, I was drawn to music. When I was 3 or 4 years old, I'd get in front of my family at *mehmoonis* and perform songs by Celine Dion or Brittney Spears. No one told me to do it; I always just had a passion for performance. I loved dressing up in fancy clothes in my room and performing songs in front of the mirror. Before Facebook became popular, everyone was active on MySpace. There was also another website called Tumblr, which was more for people into the underground, alternative scenes. Lana Del Rey, A$AP Rocky, Frank Ocean, The Weeknd and others all became famous on Tumblr. It was kind of like Instagram, you could post anything like songs, photos, videos." },

      { t: 'qa', q: 'Were you also active on Tumblr during those years?', x: 'Yeah, I used to have a Tumblr page, and in high school I would share my own covers of songs by Drake, The Weeknd, I remember covering this song called "Pretend" by Lights. One feature on Tumblr was an anonymous "ask me" box. I remember when I was around 16, someone on Tumblr wrote to me, "You have a really beautiful voice. Why don\'t you become a singer?" In response, I wrote something like: "Because being a singer isn\'t a real career" (laughs). At the same time, I knew the answer I gave him wasn\'t my actual opinion, it was more a reflection of the perspectives around me.' },

      { t: 'qa', q: 'Why did you feel that way about singing?', x: "I think when people emigrate from one country to another, they're main focus is survival. Their dreams can become very limited. Your concerns become learning a new language, assimilating and finding a job to support your family. Because this was my family's reality, for years, despite so many people telling me that I have the talent, I never thought I could have a career as a singer. But even then, since high school, I was in the studio with my friends singing hooks on their songs, because I just loved doing it. I was in choir and theater in school, just always looking for opportunities to sing. Finally, after graduating from university, I started to believe a career in music was possible for me." },

      { t: 'q', x: 'When people emigrate from one country to another, their main focus is survival. Their dreams can become very limited.', who: 'Neena Roe' },

      { t: 'qa', q: 'So, the beginning of your professional music career started just after you graduated from university. How did you start this path?', x: "After I graduated, I moved to California for a year. That's when I started writing songs. I released my first single 'Chelsea's Song' on SoundCloud in 2017, which was based on a story from one of my friends' lives that really spoke to my heart. The song has around 90,000 plays now. I was super encouraged by the success and thought to myself, 'Wow! People want to hear what I'm singing.' Then, I released my second single 'New in Town' in 2019, which has over 100k plays. All of that was really motivating for me." },

      { t: 'qa', q: 'Were you working independently at that time?', x: "I was completely independent. No one was funding my career or pushing my music, aside from loved ones who would share it. I would upload my songs on 'DistroKid,' and they would be distributed to other streaming platforms. Then, 'Apple Music' premiered two of my songs on 'Apple Music Radio.' They even brought me on for a photoshoot with Beats by Dre. It felt like everything was aligning. And then I started to perform in different places. At every show, you could see how the music connected everyone in the room. It showed me the power of music to bring people from all different walks of life together. Especially in a world where we are so deeply divided, music is like medicine that doesn't belong to this world but can be created in this world; much greater than anything here (laughs)." },

      { t: 'h', x: 'A white room and a mahogany piano' },

      { t: 'qa', q: 'What is your first memory of music?', x: 'I remember being around two or three years old visiting my aunt and uncle\'s house. They had this massive, beautiful sitting room where everything was white. The walls, the carpet, the sofas, were all white. And then there was this gorgeous dark mahogany Steinway grand piano that was probably worth $50,000. I loved sitting in front of that piano and just touching the keys with my fingers. My uncle is a really great pianist and he\'d sit beside me and teach me to play songs like "Hot Cross Buns." Eventually, my parents put me in piano classes, but at some point, I lost interest in the class environment, but I kept practicing on my own. Honestly, there\'s no feeling in the world like when I\'m creating or performing music. When I\'m creating music, I can be alone in a room and work for 12 hours straight, and it feels like only 10 minutes have passed. I become consumed by it, and nothing else gives me that feeling. This is one of the reasons why music is my main goal in life. I don\'t think it\'s a coincidence. It\'s not by chance that someone feels this way.' },

      { t: 'qa', q: 'Why did you get into music in general?', x: "I believe that the purpose of human life is not just about the individual. We're not in this world to only think about ourselves and our own families or cultural groups. We're all gifted with qualities that make this world a better place for everyone. I try to have an impact on people's lives through my music, to help along their healing journeys. The things that I write about go beyond romantic love and heartbreak. It's about the common human experiences of feeling alone in a room full of people, not knowing the purpose of your existence, or being scared for the future. These feelings are universal, whether you're 13 or 70 years old. The experiences that connect us. So yeah, the reason why I make music or why I decided to pursue music is that I felt I was given a gift for a reason, and I owe it to myself and to the world to put in the effort that I can to see this through." },

      { t: 'qa', q: 'Is there a history of artistic or musical activities among your family members?', x: "If you were to ask my parents this question, they would tell you, 'No, nobody in our family was into music,' but that isn't true (laughs). My mom has a very beautiful voice, and ever since she was younger and lived in Iran, she always sang. My dad is the same way. When they were young, my parents lived in the same neighborhood. My mom always tells me how my dad used to chant beautifully when he was young. Now my dad plays traditional instruments like the santoor and tombak. My dad's cousin was a famous pop singer in Iran before the revolution, named 'Gloria Rohani.' My uncle is also a drummer in a band. I think music is in our blood." },

      { t: 'h', x: 'Finding a sound' },

      { t: 'qa', q: 'What is the reason that most of your focus has been on genres like R&B or indie/alternative?', x: "During my early artist development, I was back in Detroit. I was there when I wrote the song 'New in Town,' and a lot of the music creators around me were mainly making R&B and hip-hop music. So I thought, 'Okay, it makes sense for me to develop my sound in the R&B realm.' But the influences of indie have always been present in my life because I have a sister who is 10 years older than me. I always listened to her CDs when I was a kid. She had a lot of R&B, but also 90s alternative and pop like Alanis Morissette, Fiona Apple, Metric, No Doubt, Mazzy Star, which all had a big impact on my musical taste. I think as an artist, I hadn't matured yet. I was still learning, still figuring out what my sound is. I was going to the studio pretty much every day, trying new things. Some sounded amazing and other things not so much. When I moved to California in 2022, we started focusing on my debut EP. We rented a cabin in the mountains, and for three days, my producer, guitarist, and I went there to write. We made almost all the songs for the EP, and everything had more of an indie feel. It might've had something to do with being in the woods with an acoustic guitar (laughs). I think just from developing as an artist, I became more comfortable trying different sounds, and I will continue to try different sounds. I feel my fans are invested in me as an artist and not so much in a genre. So I think whatever I make, the essence of who I am as an artist is going to be in that music. That's what attracts people." },

      { t: 'qa', q: 'I know you are very interested in the R&B style in the late 90s to early 2000s. Which musicians of this period did you get inspired by?', x: "Honestly, I don't draw direct inspiration from any one musician. When I was a kid, I would listen to a lot of Alicia Keys, Aaliyah and also people like Sara Bareilles and Lenka. As a teenager, I listened to a lot of Adele. And also other musicians like Damien Rice and Amy Winehouse. I feel like I learned how to sing in the school of Adele, especially her albums '19' and '21.' I know all the words to almost all of the songs on those projects." },

      { t: 'h', x: 'Being Iranian enough' },

      { t: 'qa', q: "It seems that a significant portion of your audience is from the American community. There doesn't appear to be any indication of Iranian culture in your works. Was this a deliberate decision, or did your path naturally veer in this direction?", x: 'My music is entirely in English, so it\'s not always clear that I\'m of Iranian descent. Also, my name isn\'t something like Sahar or Parisa which would clearly indicate my Iranian heritage (laughs). But, I\'ve never tried to hide my culture. I\'ve always been very proud of it. I didn\'t want to exploit my Iranian identity for fame. I can\'t write songs in Persian. Seven-year-old kids in Iran speak much better Farsi than me (laughs). But in the end, I\'m an Iranian artist, nothing can take away from that. My parents always told me, "Please sing a song in Persian." Truthfully, I was a little bit insecure about my accent and my language skills. The style and music I create are so different from the Iranian style of music. I wasn\'t sure how Persians would receive it.' },

      { t: 'qa', q: 'On your TikTok page, where you have a lot of followers, all three videos that have been pinned and are much more popular than your other videos are related to Iranian culture and music. Do you have any plans to highlight this aspect of yourself, whether in the field of music or beyond?', x: 'What\'s funny is that none of this was intentional. A few years ago, I had around 300 followers on TikTok and shared a video without any specific goal in mind. I was just thinking to myself, "This is so funny and relatable." In the video, my mom pretty much shoved a spoonful of "Zeytoon Parvardeh" in my mouth, which I had never tasted before. I made a kind of shocked expression because it was too sour, and my mom asked me, "What happened? Was it sour?" And that was it. The video got more than 10 million views so far, which is insane.' },

      { t: 'qa', x: 'After that, I started posting more about being an Iranian growing up in America, my life experiences, relationship with my parents, and my racial identity because the U.S. categorizes Middle Easterners as "white," which I don\'t agree with. Eventually, I started posting my music on that page, and people would comment like, "Have you ever sung in Persian?" At the end of the day, I\'m Iranian. Persian music is a part of my history. Being born and raised here doesn\'t mean that I don\'t have a right to the sound and this music that shaped us.' },

      { t: 'qa', x: 'I remember being in recording sessions with my producer and he would tell me that my singing style shows that I grew up with Iranian music. There\'s a thing called **microtones** in singing — it\'s certain notes that are heard way more in Middle Eastern-influenced music more than anything else, and I sing in that way. So, it\'s always been a part of me, but then my TikTok audience really encouraged me to sing in Farsi. Then, I made one video where I sang "Masti" by Hayedeh. I sang it acapella in a dome, which was actually designed by a Persian architect, Nader Khalili, and that video kind of went viral. It got like 100,000 combined views on Instagram and around 80,000 views on my TikTok. After that I was like, okay maybe I\'ll start singing more in Persian here and there. That\'s when I covered "Bordi Az Yadam", and people really loved it. It got a lot of love on TikTok now and has over 100,000 views there. I decided to release it because a lot of Iranians who grew up elsewhere really loved it. I think it\'s because the song kind of brings together their Persian culture and heritage with an acoustic style that feels more similar to what they\'re used to hearing in English music, if that makes sense.' },

      { t: 'qa', q: 'How much are you looking for Iranian audiences to listen to your music?', x: "It's so cool to me that an audience in Iran would want to hear my music or would enjoy what I'm creating. That's so special. Because growing up in a country that is not really your own, you always have this feeling that you want to be connected with the place that you come from. I grew up in the U.S., but who I am is because my parents are from Iran. I wouldn't be the person that I am today if it wasn't for that. I used to feel like my take on Persian music wasn't good enough because my Farsi isn't great or I'm not Iranian enough or whatever. I didn't think that people in Iran would enjoy what I'm making. But now that I see that diasporic Iranians here are listening to it and enjoying it, it makes that feel more possible and I think that would be really special." },

      { t: 'h', x: 'Sheyda' },

      { t: 'qa', q: 'You recently covered the song "Bordi Az Yadam" by Delkash and Viguen. Why did you choose this song as the first Persian song released by you?', x: "I have two answers for this: I think the golden era of Persian music is from the 50s to the early 70s. That's my favorite era. I think the quality of singers, the production, the instrumentals, the lyrics were so special. And, that's the soundtrack of the version of Iran during the time that my parents were there." },

      { t: 'qa', x: 'A few days ago, when I was thinking about this, I realized I had another reason for choosing this song that I had completely forgotten. When I was 12, my cousin "Sheyda," passed away at the age of 14. She was one of my closest friends. I remember we used to message each other on MySpace because they lived in Canada and it was long distance to talk on the phone. A few months before she passed, she came to Michigan with her family and we bought a dress for her eighth-grade graduation ceremony.' },

      { t: 'qa', x: "I still remember the day she passed away so clearly. My parents and aunt picked me up from school in the middle of the day, which was weird. They told me we were going to Canada because Sheyda was in the hospital. I asked why and they said her leg was broken. I was 12 years old but I wasn't stupid (laughs). I knew that people don't get hospitalized for a broken leg. After a few hours in the car, I somehow realized Sheyda had passed away." },

      { t: 'qa', x: 'When we got to their house, it felt so heavy. Her mother kept playing the song "Bordi Az Yadam" and said that it was Sheyda\'s favorite. For years after she died, I would cry anytime I heard it. After a while, I stopped listening to it because I was tired of being sad. Then, like ten years later when I was listening to it again, I realized it was one of the only Persian songs that I knew all the lyrics to because I listened to it so much after she died. I was like, this is actually the perfect song for me to sing, but I had forgotten why I knew all the words and then recently I remembered.' },

      { t: 'divider' },

      { t: 'qa', q: 'One of the things that can be seen in abundance on Instagram is the presence of a significant number of artists just covering famous songs. In general, what is your ideology on the subject of covering?', x: "When I cover a song, I never try to replicate the original singer's style exactly because they've already performed it best. I'd rather reimagine it into a new style that will still connect with people. Sometimes older songs fade away for newer generations and they can be transformed to resonate with modern music while keeping their essence. I never want to be a musician who just covers other people's songs; I want to write songs. My passion is songwriting. If a song is very special to me, I'll cover it, but I don't want the world to know me for covering other musicians' songs." },

      { t: 'qa', q: 'Now that the song "Bordi Az Yadam" has been released, do you have any plans to make another song in Persian based on the feedback you received?', x: 'When something feels right, I do it, and I like to see how it unfolds. It felt right to release a cover of "Bordi Az Yadam." Now, do I have a plan to cover more Persian songs in the future? I\'m not sure. Right now, my focus is on my EP "How to be Alone," which we\'ve been working on since September 2022. It\'s really special to me. The second single will be released by late April. But I\'m open to doing more Persian covers or even integrating Persian instruments and sounds into my music in a way that feels authentic to me.' },

      { t: 'h', x: 'Detroit, and hip-hop' },

      { t: 'qa', q: 'Despite your interest in genres such as R&B and indie, what was the reason for your activity as a reporter in the field of rap music?', x: 'Hip-hop has a rich history in Detroit. Eminem is from Detroit, Royce da 5\'9" and rappers like Blade Icewood and Big Sean. Detroit is just a big music city. R&B, hip-hop, even pop music and rock at their root, are all black genres of music. They were invented and pioneered by black Americans. Growing up in Detroit, which is a predominantly black city, I consumed a lot of black music including hip-hop. My sister had CDs of Dr. Dre, Eminem, Jay-Z, and others. I\'ve always loved it. Almost every concert that I went to in high school was a rap concert. I was a huge fan of J. Cole; I went to every one of his tours since 2011. I think hip-hop is poetry. It\'s an art form that has always worked to fight inequality and to give a voice to the experiences of marginalized people. It\'s music with a greater purpose. In Iran as well, many Iranian rappers talk about sociopolitical struggles and personal challenges. Rap at it\'s heart isn\'t just about the individual, it\'s about a collective experience.' },

      { t: 'qa', q: 'Rap music in Iran is one of the most attractive artistic scenes. Do you know any Iranian rappers?', x: 'I have some knowledge of what\'s going on and some familiarity with the Persian rap scene. Honestly, "TPM" (The Persian Magazine) has been helpful (Laughs). I think it\'s one of the only platforms that helped me learn about what pop culture is like in Iran. I know some of the artists, like Young Sudden, Toomaj Salehi, Chvrsi, etc. Those guys are very interesting to me.' },

      { t: 'qa', q: 'What about musicians from other genres of music in Iran?', x: 'I don\'t know many, but that\'s not just specific to Iran. In the last year, I haven\'t really been keeping up with new artists in general. I\'ve been listening to a lot of older stuff, even English-speaking artists, but I would love to learn more about Iranian artists and what they\'re creating, especially within the alternative scene. I think it\'d be really cool to connect with them, maybe even collaborate. But it\'s really hard when you live here. There aren\'t a lot of platforms to connect with what\'s going on there. So, I don\'t even know where to look. The only platform that communicates between here and there is "TPM," and I don\'t know of any others. It\'s very difficult for us here to know what\'s happening in Iranian music.' },

      { t: 'h', x: 'The journey, not the outcome' },

      { t: 'qa', q: 'Playing a role in the American music market is, contrary to what it seems, very difficult. For this reason, most Iranian musicians living abroad prefer to work in the Iranian music market in order to guarantee their success. Currently, what is your short-term and long-term vision in this music market?', x: "I never think about having 10 million monthly listeners. I don't pay much attention to numbers, for better or for worse. My only wish is to share my music with the world to a point that it can sustain my life financially and provide for my family. The rest is up to God (laughs). I never want to be so famous that I can't even go to the store to buy onions without being recognized. I want to have a relatively normal life, but at the same time, I want to be able to bring joy to as many people as possible through my music. Becoming sustainable as a musician in the U.S. is incredibly hard. But I believe in my music, I know that it's going to become something that's bigger than me, but I don't have crazy expectations of what I want it to be because I find that in life you shouldn't be so focused on the outcome, you should be more focused on the journey. So I'm just enjoying the journey and doing what feels right. I guess in five years, we'll see what happens." },

      { t: 'qa', q: 'One of the most important goals of musicians working in this field is to gain fame in the shortest possible time. You have no desire to gain fame?', x: "Not really (laughs). Fame seems nice, but it's super isolating. Famous people's reality is so different from the rest of the world, and I always want to feel grounded and connected to people." },

      { t: 'qa', q: 'What are we going to hear from you in the near future?', x: 'My EP is going to come out this year. It\'s called "How to be Alone," and it\'s basically about my experiences of being by myself and having to get through things alone or even feeling alone inside despite being surrounded by people. I think a lot of people feel lonely in their hearts and minds, even though they live with their families or are constantly around others. It\'s also about being away from your homeland and culture, just different faces of loneliness and the world that exists inside of us. The first song, "concrete floors" came out in October of last year and the second song "broken!" will be out soon. Hopefully after the release, I\'ll do some shows around the U.S.' },

      { t: 'qa', q: 'What advice do you have for young Iranian musicians? What should they do for success in this path?', x: "I think there are two important things to remember. One is to spend as much time as you can imagining the things that feel impossible. When you're sitting in your car, or at night before you go to bed, or in the morning when you wake up, think about all the things you want in your career, even if you feel deep down you'll never achieve them, because thoughts gradually become reality. Another thing is that you have to dedicate your time to creating music as much as possible. Spend as much time as possible with a guitar or piano, writing songs to beats, or learning how to use different music creation platforms. Spend as much time as possible on your craft, and the rest of the time, spend dreaming about everything that you want for yourself." },

      { t: 'line', x: "Because at the end of the day, the only thing that's stopping you, is you." },
    ],
  },

  {
    key: 'owdezmubie',
    kind: 'feature',
    title: 'Owdez and Mubie treat the voice as an instrument',
    subject: 'Owdez & Mubie',
    discipline: 'Music',
    standfirst:
      'Kamran and Mobina on Adamaye Bad, self-made visuals, and the lyric that turns a vocal stem into something else.',
    cover: 'tpm-owdez-cover',
    images: [],
    minutes: 5,
    body: [
      { t: 'open', x: 'In a world where music and words intertwine to weave stories of depth and emotion, Kamran and Mobina, known artistically as Owdez and Mubie, have become a clear example of creativity and innovation. Their journey is not just an exploration of sound but a deep dive into the essence of what it means to create, to express, and to connect on a level that transcends the mere physical. With each track, they invite us into a realm where the auditory and the visual collide, creating landscapes of emotion and thought that linger long after the last note fades.' },

      { t: 'p', x: "Their creative process mirrors a dance. Owdez, with his self-taught mastery over the sonic landscape, and Mubie, with her lyrical prowess that paints vivid scenes and evokes deep emotions, together craft music that is both innovative and introspective. Their work is a testament to the power of artistic collaboration, where different talents and perspectives merge to create something truly unique and impactful." },

      { t: 'q', x: "The vocal stems are only treated as instruments and it's the lyric that morphs them into a beyond.", who: 'Mubie' },

      { t: 'p', x: 'She believes the soul of a song lies in its vocal depth, where emotion and intention breathe life into lyrics, making each word a vessel for storytelling. This insight invites us to listen not just with our ears, but with our inner thoughts, as we explore the narratives woven into their melodies, where vocals are not mere sounds, but the essence of connection and expression.' },

      { t: 'h', x: 'Resonance Review: Adamaye Bad' },

      { t: 'p', x: 'Stepping into the heart of their discography, *Adamaye Bad* stands out as a masterpiece that captures the essence of their collaboration. This track, even after years and numerous releases, remains a resonant favourite, embodying the freedom and creativity that marks the early work of artists.' },

      { t: 'p', x: "The track is an odyssey in itself, beginning with echoes that lead us down dark corridors illuminated by narrow beams of light, into cities of mystery where dreams are frozen and realities are mirrored. Owdez's skilful blend of synthesisers, drum lines, and white noise creates a backdrop that amplifies the imagery, making each lyric come alive, each moment a scene from a larger narrative." },

      { t: 'q', x: "There's a dark way behind this wall, there's a narrow light further down the corridor." },

      { t: 'p', x: "Mubie's voice guides us through a journey of mystery and discovery, her words painting scenes that linger in the mind's eye. The track unfolds like a story, with her voice leading the way through cities of mystery and landscapes reversed." },

      { t: 'q', x: "It's all reversed, just like me in the mirror, a reversed sun, crazy people and unchangeable it all is. Bad people, this is what we are." },

      { t: 'p', x: 'She reflects, offering a mirror to the complexities of human nature and the world we inhabit. The final repetition of the first verse, now cloaked in the ethereal touch of a Vocoder, leaves us in contemplation, pondering the layers of meaning woven into the fabric of the song.' },

      { t: 'h', x: 'Continuing the Journey: The Evolution of Owdez and Mubie' },

      { t: 'p', x: 'As we delve deeper into the narrative of Owdez and Mubie, we see a duo unafraid to push boundaries and explore new territories. Their venture into self made visuals and their dedication to creating a unique sonic and visual identity speak volumes of their commitment to growth and exploration. Through SLVC Records, they aim to create a platform that not only showcases their vision but also opens the door for future collaborations and projects.' },

      { t: 'p', x: 'Their story is one of resilience, creativity, and the relentless pursuit of artistic expression. In a world often confined by borders and limitations, Owdez and Mubie joyfully announce their expansion into the Western music scene, particularly in Austria, where one-half of the duo will now be based, heralding a vibrant new chapter in their artistic journey.' },

      { t: 'h', x: 'A Reflection on Music and Beyond' },

      { t: 'p', x: 'As we close this feature, let us reflect on the journey of Owdez and Mubie, not just as musicians but as visionaries who remind us of the transformative power of art. Their music, a blend of sound and story, invites us to explore the depths of our own experiences, find beauty in the complex tapestry of human emotion, and connect with others on a level that transcends language and geography.' },

      { t: 'p', x: 'In the end, the story of Owdez and Mubie is a testament to the enduring spirit of creativity, a reminder that art, in its many forms, has the power to challenge, inspire, and unite. As you turn the pages of The Persian Magazine, carry with you the melodies and words of this remarkable duo, a beacon of hope and innovation in a world ever in need of both.' },

      { t: 'note', x: 'By Seper Mardani.' },
    ],
  },

  {
    key: 'shahrzad',
    kind: 'feature',
    title: 'Shahrzad Shokouhivand is reviving Iran\'s lost flavours',
    subject: 'Shahrzad Shokouhivand',
    discipline: 'Pastry',
    standfirst:
      'The first Iranian to receive the Ordre du Mérite Agricole, on French technique, a Tabrizi childhood, and selling pastries one at a time.',
    cover: 'tpm-shahrzad-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'p', x: "I had the opportunity to speak with Shahrzad Shokouhivand, a graduate of Le Cordon Bleu pastry school, founder of L'Atelier de Shahrzad and Femme Chic Patisserie, the first Iranian to receive the esteemed L'Ordre du Mérite Agricole. As a visionary pastry chef and entrepreneur, she has been instrumental in reviving Iran's forgotten flavors and bringing Persian pastry to the global stage. In our conversation, she reflected on her journey, the challenges she has faced, and the inspiration behind her culinary creations." },

      { t: 'p', x: 'We began our conversation by exploring what led Shahrzad toward a career in the culinary world:' },

      { t: 'q', x: "I've always had a passion for preparing food and bringing joy to the people I love. From a young age, I always enjoyed preparing breakfast in bed for my parents and serving those I love. Over time, this love for creating meaningful dining experiences grew, eventually leading me to pursue a career in pastry-making.", who: 'Shahrzad Shokouhivand' },

      { t: 'h', x: 'French technique, Persian flavour' },

      { t: 'p', x: "Shahrzad is committed to using all-natural ingredients to revive the authentic flavors of Persian heritage in her creations. Building on the foundations of classic French pastry, she infuses traditional techniques with unique Persian flavors and recipes, putting her distinctive signature on each dessert. Her approach often involves preserving key elements of French pastries while introducing new textures, flavors, and techniques that celebrate Persian culinary traditions." },

      { t: 'p', x: "She reimagines delicacies from across Iran, transforming them into elegant, contemporary creations that are both visually stunning and innovative. Inspired by her family's deep culinary roots in Tabriz, many of her pastries reflect the flavors of her childhood and the dishes she grew up enjoying. Others draw from the diverse tastes she has encountered throughout Iran, resulting in a harmonious fusion of tradition and creativity." },

      { t: 'p', x: 'One of her most notable creations is *Baba Tabrizi*, a unique twist on the classic *Baba au Rhum* — a small yeast cake traditionally soaked in syrup made with hard liquor. Developed years before opening her pastry shop, this signature dessert beautifully reflects her fusion of French technique with Persian tradition.' },

      { t: 'q', x: "On the 20th anniversary of my father-in-law's passing, we held a family gathering and served dishes from the culinary heritage of Tabriz — foods my husband and I grew up eating. For the occasion, I prepared a revised version of the Persian-Azeri dessert Khagineh (also known as Geyganakh) — a traditional batter of flour, eggs, sugar, and milk or water, fried and later drizzled with syrup. It was an instant hit, and we named it Baba Tabrizi (Baba meaning 'father' in Persian) as a tribute to that day. Later, it became one of the first pastries introduced at the opening of Femme Chic Patisserie.", who: 'Shahrzad Shokouhivand' },

      { t: 'h', x: 'Selling one pastry at a time' },

      { t: 'p', x: "With the recent celebration of Femme Chic's 6th anniversary, we spoke with Shahrzad about the challenges of pioneering Persian-French fusion pastry in Iran. Beyond the long-standing difficulties of sourcing high-quality ingredients such as vanilla and flour, she also had to navigate a major cultural shift in how pastries were consumed." },

      { t: 'p', x: 'Femme Chic Patisserie was established when most pastries in Iran were purchased in bulk, as Persian sweets were traditionally sold by weight. Aside from a handful of French pastry shops catering to a niche audience, **the concept of individually sold, high-quality pastries was virtually unheard of**.' },

      { t: 'q', x: 'Introducing a system where people bought individual, artisanal French-inspired pastries — focusing on elegant presentation and high-quality ingredients — was not easy.', who: 'Shahrzad Shokouhivand' },

      { t: 'p', x: 'In the early years, she faced resistance, but she believes the culture has evolved over time. With the rise of the internet and the emergence of similar pastry shops, the idea of artisanal, individually crafted pastries has now firmly taken root in Iran.' },

      { t: 'h', x: 'The embassy next door' },

      { t: 'p', x: "Femme Chic Patisserie also played a key role in Shahrzad being honored with the prestigious *L'Ordre du Mérite Agricole*. Its location near the French Embassy in Tehran made it a favorite among French diplomats longing for a taste of home. Their frequent visits eventually drew the attention of the *Goût de France* committee members, who recognized Shahrzad's innovative work blending Persian and French culinary traditions. This fusion of cultures and her dedication to excellence ultimately earned her the esteemed award." },

      { t: 'p', x: "Shahrzad remains devoted to her craft, continually redefining food culture across Iran by participating in events like *Four Hands*, which highlights the collaboration between two chefs. Looking ahead, she hopes to see Iran's food industry evolve with more refined and professionalized grading standards." },

      { t: 'line', x: "Through her work, Shahrzad Shokouhivand is safeguarding the legacy of Iran's forgotten flavors, one exquisite dessert at a time." },

      { t: 'note', x: 'By Parisa Mohsen.' },
    ],
  },

  {
    key: 'golsa',
    kind: 'feature',
    title: 'Golsa and the music of the streets',
    subject: 'Golsa',
    discipline: 'Music',
    standfirst:
      'An interview on a cold uphill street in Tehran, joined midway by a lawyer named Ramin who was not invited and did not leave.',
    cover: 'tpm-golsa-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'open', x: 'The interview with Golsa started in a way that was as unique as the artist herself. I could hear the unmistakable sounds of bustling Iranian high streets in the background as we finally connected. *It\'s a cold day, she\'s probably walking an uphill pathway as she keeps breathing between every few words or so.*' },

      { t: 'p', x: 'And then, just as we were settling in, life decided to hand us an uninvited guest. It started with a pause. Golsa, mid-sentence, making accidental eye contact with a passing stranger. Most people would simply move on. Ramin, however, saw this as an open invitation. Within moments, he had seamlessly inserted himself into our interview. A lawyer, as it turned out, with absolutely no hesitation about joining a conversation that had nothing to do with him. He started small; just a comment here, a question there. But before I knew it, he was fully involved, steering the chat in directions I definitely hadn\'t planned for.' },

      { t: 'p', x: 'And, of course, his timing was impeccable. He made his grand entrance right in the middle of Golsa\'s heartfelt confession about love, ensuring that whatever moment of emotional depth we were about to experience was immediately shared with a complete stranger.' },

      { t: 'h', x: 'The Jazz Journey' },

      { t: 'p', x: 'Golsa\'s journey into music was something I\'d long been curious about, particularly her relationship with jazz. She shared that her collaborations with Sardar Sarmast were transformative.' },

      { t: 'q', x: "Working with Sardar started to affect me and my musicality. He's the kind of person that changes your vision for music, and also as a friend, he changes many things in your life.", who: 'Golsa' },

      { t: 'note', x: 'She paused here to warn Ramin — who was, apparently, sliding on ice — to watch his footing.' },

      { t: 'p', x: 'Their weekly sessions were the cornerstone of her evolution. "We\'d work on a few songs each week. Over time, these turned into long sets we took to live performances."' },

      { t: 'h', x: 'Studio or Stage?' },

      { t: 'p', x: "When asked whether she saw herself as more of a studio or live artist, Golsa's response revealed her adaptability." },

      { t: 'q', x: "I adore both opportunities. Studio settings can be restrictive, and my perfectionism sometimes gets in the way. But I've learned that imperfections often become part of the identity of a song. With live performances, the energy exchange with the audience is so unpredictable. It can lift me to the clouds or leave me empty inside, but either way, I express everything.", who: 'Golsa' },

      { t: 'p', x: 'One thing she treasures most on stage is when the crowd sings along with her. "Seeing people sing the lyrics with me. It\'s the best feeling I can get on stage."' },

      { t: 'h', x: 'Covers: Saving Forgotten Songs' },

      { t: 'p', x: "Golsa's approach to covering old songs has made her a viral sensation. Her reimaginings breathe life into forgotten pieces, connecting younger audiences to Iran's rich musical heritage." },

      { t: 'q', x: "It's like saving a song from being forgotten. When I delve into these songs, they become very dear to me. Tweaking the arrangements or performances is like giving them new life so people can resonate with them again.", who: 'Golsa' },

      { t: 'h', x: 'Inspiration: Streets and Stories of Tehran' },

      { t: 'p', x: 'Much of Golsa\'s work draws inspiration from Tehran, a city she describes with love and complexity. "For me, it\'s not about East or West. I\'ve always been curious about the Koocheh Bazari vibe; the folksy, street-style songs that tell stories of working-class life. **Every street and corner in Tehran has a story to tell.**"' },

      { t: 'p', x: "When I asked her if Tehran was a recurring character in her music, she didn't hesitate." },

      { t: 'q', x: "Every song I write is for Tehran. It's a love-hate relationship. The city can be tough, but the moments you overcome challenges with your loved ones make it the loveliest. I've always loved this city, even in its darkest alleys.", who: 'Golsa' },

      { t: 'note', x: 'At one point, Golsa and Ramin — yes, still there — broke into a duet, humming an Iranian vocal piece. It was both surreal and heartwarming, perfectly encapsulating the spontaneity of the interview.' },

      { t: 'h', x: 'The Glamorous Golsa' },

      { t: 'p', x: 'Golsa\'s on-stage persona is bold and dazzling, with glittering makeup and eye-catching costumes. When asked about this aesthetic, she shared, "On stage, I can be whoever I want. For that set or that night, I reflect the Golsa in my head — a version of me that doesn\'t need to censor her words or worry about how she dresses."' },

      { t: 'p', x: "As the conversation wound down, I was struck by how seamlessly Golsa bridges Iran's musical past with its present. Her ability to revive forgotten songs while carving out her own identity is a testament to her artistry. With her love for storytelling, connection, and performance, Golsa remains a force to watch." },

      { t: 'line', x: 'And as for Ramin? Well, he might just have earned a cameo in this article and the unforgettable story of this interview.' },
    ],
  },

  {
    key: 'alaei',
    kind: 'portrait',
    title: 'Forough Alaei photographed the women sneaking into stadiums',
    subject: 'Forough Alaei',
    discipline: 'Photography',
    standfirst:
      'She disguised herself as a man to document them. The series won a World Press Photo prize.',
    cover: 'tpm-alaei-cover',
    images: [],
    minutes: 3,
    body: [
      { t: 'lead', x: "In Iran, football is everything. It's noise, emotion, pride — the kind of thing that connects everyone, no matter where they're from. *But for women, the gates to the stadium have always been closed.* Watching the game from behind screens or outside the fences has been their only option for years." },

      { t: 'p', x: "In 2018, under pressure from FIFA and waves of social media protests, a small group of women were finally let into Tehran's Azadi Stadium. For a moment, it felt like history. Like maybe something was changing. But it didn't last. A few months later, conservative officials reversed the decision, and the ban came back just as quietly as it had been lifted." },

      { t: 'line', x: "Still, women found ways in." },

      { t: 'p', x: "They cut their hair short, borrowed their brothers' clothes, glued on fake beards — anything to stand among the crowd and feel the pulse of the game." },

      { t: 'p', x: "Photographer Forough Alaei was one of them. She disguised herself as a man to document the women who refused to accept the ban, capturing rare glimpses of defiance, fear, and joy. Her series — later awarded a World Press Photo prize — goes beyond football. It's a story about belonging, about how far people will go just to be seen, and about women who won't wait for permission to take up space." },
    ],
  },

  {
    key: 'lotfi',
    kind: 'portrait',
    title: 'Ella Lotfi is redefining what a body can do',
    subject: 'Ella Lotfi',
    discipline: 'Movement',
    standfirst:
      'A gymnast, dancer and choreographer whose videos went viral as memes — and what competitive gymnastics cost her to get there.',
    cover: 'tpm-lotfi-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'open', x: "Ella Lotfi's Instagram lately begs a lot of questions. In one video, she's at the gym using a chest press *with her legs*, and in another, she climbs a staircase in a manner that can only be described as being akin to an upside-down spider, while two other guys fall down the same staircase like a couple of rag dolls thrown aimlessly by a child." },

      { t: 'p', x: "A gymnast, rhythmic gymnast, dancer, and choreographer, the 26-year-old defies easy categorisation. She first started creating content during the Covid pandemic, and found an audience on Twitter soon after, where users were posting her videos as memes accompanied by captions such as, 'the jinn in my house at 2am' and 'the toilet hose in my bathroom when it slips while I'm using it'." },

      { t: 'q', x: "At first I wasn't used to it and I would get a little disheartened. But I realised that these reactions would help my work be seen… there are very few people in Iran who know what this type of thing is.", who: 'Ella Lotfi' },

      { t: 'p', x: "Ella explains that although these videos and posts seem strange and bizarre to many, they were actually just gymnastic poses. \"When you watch a gymnastics routine, all the moves are done in succession. In my case, I only showed single moves on their own, which I think people hadn't seen before and so it was weird to them.\"" },

      { t: 'h', x: 'Beginnings' },

      { t: 'p', x: 'Ella\'s journey began at a young age. She was diagnosed with osteomalacia at birth, and after a series of injections, her parents decided to enroll her into gymnastics at the age of seven, in an attempt to help her recover from the condition. Despite initial resistance — "I started crying on my first day and said I didn\'t want to do this anymore because it hurt" — she found herself drawn back to the gymnasium. "My parents wanted me to try different sports until something stuck, but I woke up the next morning and said I liked gymnastics."' },

      { t: 'p', x: 'Later, Ella discovered rhythmic gymnastics. At the time, it was a discipline still relatively new in Iran, but she had progressed so far that her coaches suggested it to her as the natural next step, and after that, she then found contemporary dance. It\'s this distinctive blend of three different disciplines that she\'s become so widely known for on social media.' },

      { t: 'p', x: 'She explains that, rather than embracing the attention she received from Twitter and being "bizarre" on purpose, her recent and more unconventional videos actually arise organically, as collaborations with friends and athletes. But, she adds that, "people are more interested in the fun part of my work. And thus they get closer and try to understand what it is I\'m doing." She harnesses this to try and bridge the gap between her art and her audience, by sparking conversation.' },

      { t: 'h', x: 'What it cost' },

      { t: 'p', x: "Beneath her social media presence, Ella's journey reveals the severe physical and psychological hurdles faced by many athletes in competitive gymnastics — and is indicative of how global the scale of this problem really is, with similar cases having previously been reported in Russia and England. She mentions various physical injuries, including some that have returned or that she still has to live with today — as well as a battle with anorexia that was induced by the intense pressure and stress of having to be a certain weight for her competitions. In fact, her weight dropped so dangerously low that a doctor warned her she may go into a coma." },

      { t: 'q', x: 'I no longer compete. But in any case, women are forbidden now in Iran to participate in gymnastic competitions after the age of 20 anyway.', who: 'Ella Lotfi' },

      { t: 'h', x: 'What comes next' },

      { t: 'p', x: 'Now, as a physiotherapy student, she channels her experiences into teaching, primarily offering gymnastics instruction online. But her ambitions stretch beyond teaching and studying, and she describes her ideal future as being able to train professionally in contemporary dance sometime soon, under a coach who understands its technical and artistic elements.' },

      { t: 'p', x: 'Citing Soroush Kariminejad as a significant inspiration, she speaks of channeling her emotions, whether positive or negative, into her work. "That feeling of being sad and upset while my knee was sprained a month before I was meant to compete — I tried to pull something out of that that would be worthy of being seen," she shares. "It makes me feel better and I feel lighter… I think it\'s this that pushes me towards dance the most."' },
    ],
  },

  {
    key: 'churooks',
    kind: 'feature',
    title: 'Churooks are building a scene that does not exist yet',
    subject: 'Churooks',
    discipline: 'Music',
    standfirst:
      'Four musicians in Tehran making progressive funk rock, giving out stickers, and putting every show at fifty-fifty odds of happening.',
    cover: 'tpm-churooks-cover',
    images: [],
    minutes: 10,
    body: [
      { t: 'lead', x: 'Amazing boys. I started my chat with them by asking about some of their recent on-repeat songs. In the middle of our conversation, Bardia said his was *Starship Syncopation* by Cory Wong. Spot on. That\'s it. That\'s exactly where I wanted to begin.' },

      { t: 'p', x: "The element that is very noticeable when listening to the Churooks' songs is the fact that how professional they sound. Especially, the rhythm elements. It has a funky vibe, and the fills and pauses are all spot on." },

      { t: 'divider' },

      { t: 'qa', q: 'You guys sound incredibly literate in music. Have you studied it academically?', who: 'KOUROSH — DRUMS', x: "I'm 25 now, and I haven't had much formal music education, but I've been playing drums since I was eight or nine. Since starting this project, I've paid a lot of attention to details — those subtle, tasteful rhythmic choices that have inspired me over the years. I try to weave them into Churooks' sound." },

      { t: 'qa', who: 'KOUROSH', x: "Ali and I usually handle the rhythm section. We bring our initial ideas to the band, but the process is fluid. It's like a puzzle — things evolve constantly until the final version of the song takes shape." },

      { t: 'qa', q: 'So does that mean you compose linearly, starting at the beginning and progressing forward?', who: 'KOUROSH', x: 'Most of the time, yes. But it depends. Sometimes we create phrases and develop them, and the overall vibe dictates where they fit best in the song.' },

      { t: 'qa', who: 'ALI — BASS', x: "My education has nothing to do with my role in the band — most of my family wasn't involved in music either. They mostly listened to Persian traditional music. I studied Graphic Arts at a fine arts school. But what shaped my musicianship was playing in a band while learning my instrument. There's no better way to grow as a musician than learning inside the context of a band." },

      { t: 'qa', who: 'ALI', x: "Another thing that strengthens our sound is how much time we spend together. I've known Arash since childhood, and Kourosh and I used to hang out constantly back in school. That level of familiarity makes a huge difference when we play together. It's why we sound so tight. Even the funky vibe in our music is a direct result of this connection." },

      { t: 'qa', who: 'KOUROSH', x: "Ali's right. That familiarity was the foundation of everything. He and I went to the same finance school, then we met Bardia and Arash, and that's when things started to take shape. But funnily enough, Arash and I had already played together before — when we were kids in an Orff class. We didn't even realise it until much later." },

      { t: 'qa', q: 'Bardia, what about you? How did your journey with music start?', who: 'BARDIA — VOCALS, GUITAR', x: "I started playing music when I was around 18 or 19. At university, I was studying chemistry, but over time, music became more serious for me. So, I switched to audio production to align my studies with my passion. The technical knowledge I've gained in university has been really helpful — I get to bring it into our projects and blend it with everything we do." },

      { t: 'qa', q: 'So how did Churooks officially form?', who: 'BARDIA', x: "Honestly, we all owe Arash for bringing us together. I already knew him, and he was trying to assemble a group for a project. He reached out to all of us individually, and that's how we first gathered as a band." },

      { t: 'qa', q: 'Alright, Arash, seems like you were the common thread here. How did that happen?', who: 'ARASH — VOCALS, GUITAR', x: 'I never had formal music training, but my father introduced me to music when I was a kid. He had this massive collection. Fleetwood Mac one day, something completely different the next. Every evening after work, he\'d put on his headphones and watch his favourite performances. One day, he asked me to join him, and that was my first real introduction to music.' },

      { t: 'qa', who: 'ARASH', x: "When I was about eight or nine, my mum took me to an Orff class, the same as my older brother. When it came time to choose an instrument, I was so set on picking the cello. Then, at the very last moment, the instructor played the Pink Panther theme on electric guitar, and just like that, I switched to guitar instead. It's hilarious looking back." },

      { t: 'h', x: "The Aesthetics of Churooks' Sound" },

      { t: 'qa', q: 'One of the most striking aspects of your music is your frequent use of 6/8 time signatures. Is that a deliberate choice because it resonates so well with Iranian audiences? Or is there another reason behind it?', who: 'KOUROSH', x: "It's a fundamental part of our sound. We believe in understanding what grooves, melodies, and rhythms connect with our audience. So yes, the 6/8 time signature is something we intentionally use. It's deeply rooted in Iranian music. But we don't just stop there. We want to twist it in ways that feel fresh and unique. We don't want to simply reference these traditional elements; we want to **reshape them into something that listeners can't find anywhere else**." },

      { t: 'qa', who: 'BARDIA', x: "Beyond our cultural roots, we also admire old-school Iranian pop legends like Shahram Shabpareh and Sandy. They knew how to create infectious grooves. And of course, we're influenced by both Eastern and Western music." },

      { t: 'qa', q: 'Are there any contemporary Iranian bands that influence you?', who: 'BARDIA', x: "Definitely Ballgard. They're the boldest reference for us. Personally, since I focus a lot on guitar and lyrics, they've influenced me massively. In fact, I even spent some time learning from Ali Aflatooni, Ballgard's guitarist." },

      { t: 'qa', who: 'BARDIA', x: "But honestly, the indie funk-rock scene in Iran is practically nonexistent. There's no solid community. No real space where bands like us can belong. If there's one thing we've always tried to do, it's build a scene around this project. We don't just want to make music. We want to inspire other people to start playing, to experiment with sound, to add more diversity to the Iranian music industry." },

      { t: 'qa', q: 'The monotony in the Iranian music scene is frustrating, to be honest.', who: 'BARDIA', x: "There's so much more for Iranian listeners to experience. So many sounds that haven't even been created yet. Right now, people's ears are conditioned to hearing the same viral formulas over and over. We want to change that." },

      { t: 'q', x: 'Music should take you on a journey and influence people. Going viral is secondary; maybe even lower on the list of priorities.' },

      { t: 'qa', q: 'Has anyone else in the band had direct mentorship from Ballgard members?', who: 'ALI', x: "Yeah, apart from self-studying bass, I also spent time learning from Hamed Hamidzadeh, Ballgard's bassist. So it's fair to say Ballgard has had a very direct impact on our sound." },

      { t: 'qa', q: "You talk a lot about influence. What exactly do you mean by it? What does it mean to create a 'community' and take your audience on a 'journey'?", who: 'ARASH', x: "Music is an interaction between two groups. The musicians and the listeners. Our sound carries references to brilliant older-generation musicians who already have a deep connection with audiences. But at the same time, we embed our own creative approach into it. We don't want to make music so complex that nobody can listen to it, but we also refuse to be just another copy-paste band." },

      { t: 'h', x: 'Making Memories: The Keepsakes and the Risk Factor' },

      { t: 'p', x: 'Beyond just playing music, Churooks puts effort into creating a lasting experience for their audience. Kourosh explained how they provide small mementoes to commemorate each show.' },

      { t: 'qa', who: 'KOUROSH', x: "We give out stickers and cards as a keepsake from the night. It's really cool to see people putting these stickers on the backs of their phone cases or laptops. It means something to them. But at the same time, it reminds us of our responsibility to make each night truly special and memorable. The cards usually have the date of the show and a photo of us, so they can carry that memory with them." },

      { t: 'p', x: "But live shows for Churooks don't come without challenges. Bardia shared the unpredictable nature of organising these events." },

      { t: 'qa', who: 'BARDIA', x: "To be honest, every time we plan a show, we give it a 50-50 chance of either getting cancelled or actually happening. But that unpredictability adds to the energy in the room. Even the audience is, in a way, taking a risk just by attending. These private shows exist in a kind of rebellious space. If they're taking a risk and we're taking a risk, that energy turns into excitement. And when excitement spreads, the room becomes more alive, and the whole experience becomes even more intense and fun." },

      { t: 'h', x: 'The Challenges of Live Performance and the Need for Support' },

      { t: 'p', x: 'Beyond the unavoidable restrictions on certain genres and the limitations on venue sizes, I asked the band what could help ease the challenges of performing live.' },

      { t: 'qa', who: 'ARASH', x: 'Sponsorship has always been one of the biggest factors that could ease the burden on our shoulders when it comes to live performances. A well-structured sponsorship plan could support both the venue and us, the musicians, creating a more sustainable ecosystem. Many of our logistical concerns could be solved with proper, organised sponsorship, making event planning more structured and less stressful.' },

      { t: 'h', x: 'Defying Genre Limitations' },

      { t: 'qa', q: 'Would you label Churooks as a funk rock band?', who: 'ALI', x: "The underground Iranian scene doesn't allow you to box yourself into one category. We mix a lot of things such as progressive rock, funk, and alternative. If we had to put a label on it, maybe 'progressive rock with funk elements' comes closest. But even that feels restrictive." },

      { t: 'qa', who: 'BARDIA', x: "It's more about musicianship, groove, and precision. That's what we focus on, more than sticking to a specific genre." },

      { t: 'h', x: 'Collaboration, Workflow, and Mutual Influence' },

      { t: 'p', x: 'Given their tight arrangements and cohesive sound, I was curious about their creative process; whether each musician works strictly within their own section or if there\'s cross-involvement in shaping elements like melody, rhythm, and structure.' },

      { t: 'qa', who: 'KOUROSH', x: "It's unpredictable every time. We never know how a single choice from any of us might change our approach while working on a song. This unpredictability carries over to our live performances too. No two sets are exactly the same. We have designated structures, but we also introduce variations with each performance." },

      { t: 'p', x: 'This fluidity is balanced by constant dialogue.' },

      { t: 'qa', who: 'KOUROSH', x: "There's always interaction between different sections. If the rhythm gets too complicated, the others will call it out. If something in the guitar lines doesn't align with the rest of the song, we discuss it and either modify or remove it. No one takes things personally. The goal is to make it work for the song as a whole." },

      { t: 'h', x: 'Roles Beyond the Music' },

      { t: 'p', x: "To understand their internal dynamics better, I asked about each member's role beyond playing their instruments." },

      { t: 'qa', who: 'ARASH', x: "I usually bring in the first sparks of an idea. The initial sketches become starting points for songs. I also focus on polishing and filtering our ideas. While it's great to have everyone's input, we also need realistic visions. My job is to refine and align all these creative fragments into something cohesive." },

      { t: 'qa', who: 'KOUROSH', x: 'Aside from being the drummer, I handle some aspects of event management and social media, along with content creation like motion design and graphics. I also manage communication with studios and venues.' },

      { t: 'qa', who: 'ALI', x: 'I work closely with Kourosh, almost like a PR team. I also oversee production-related aspects, including printed materials.' },

      { t: 'qa', who: 'BARDIA', x: 'Besides guitar, vocals, and lyrics, I help with management tasks. Since my schedule is more flexible, I focus on things like event dates, promotions, and release planning.' },

      { t: 'h', x: "What's Next for Churooks?" },

      { t: 'p', x: 'Before wrapping up, I asked about their upcoming releases.' },

      { t: 'qa', who: 'ALI', x: "We're working on multiple projects at the moment. We're aiming for a release before the Iranian New Year, and we're also considering an EP in the coming year." },

      { t: 'line', x: "With their structured yet adaptive approach, Churooks isn't just refining their own sound. They're building a model for how a progressive funk rock band in Tehran can navigate, survive, and thrive." },
    ],
  },

  {
    key: 'jabbar',
    kind: 'portrait',
    title: 'DJ Jabbar and the sound of Tehran\'s underground',
    subject: 'DJ Jabbar',
    discipline: 'Music',
    standfirst:
      'A B-boy from Mashhad who found his sound in a rented basement, a circus scrapheap, and the streets.',
    cover: 'tpm-jabbar-cover',
    images: [],
    minutes: 12,
    body: [
      { t: 'open', x: "In Tehran's underground music scene, where basements double as dance floors, a new sound is taking shape. *It doesn't borrow from Berlin's clubs or Detroit's after-hours, but grows from the city's own restrictions, where limits spark creativity.* This is where Milad Jabbar Imani, known as DJ Jabbar, found his beats." },

      { t: 'p', x: 'He began as a B-boy in Mashhad, then moved from the floor to the decks, creating beats dancers could battle to. When the pandemic hit in 2019, he turned fully to producing, mixing, and shaping a sound that moves between funk, break-beat, and techno. His work connects scenes and cultures, giving the underground space to breathe and grow. For Jabbar, music isn\'t just escape, it\'s a way back to the community that keeps the movement alive.' },

      { t: 'p', x: "This is where Tehran's underground meets Toronto's sound: a conversation between two DJs from the Deep House Tehran platform. DJ Jabbar is here. Mahan is here. And the beat? It never stops." },

      { t: 'divider' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'You went into DJing partly for money, but also because you loved dancing. What really pushed you towards it?' },
      { t: 'turn', who: 'JABBAR', x: "I loved breakdancing so much that I knew, even if I got older and couldn't dance anymore, I'd still need to stay connected somehow. The music side of breakdancing was a way to stay part of the community. That's what pushed me toward DJing." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Did you already know DJs back then?' },
      { t: 'turn', who: 'JABBAR', x: "Back in Mashhad, there weren't really any DJs. We just had cyphers, and maybe once a year a dance battle with DJ would happen in Tehran. Most of the time, someone would just hand over a trance CD, usually DJ Aligator or something like that. But then at one battle in Tehran, a DJ named Soroosh Bipolar showed up. The tracks he played were unreal, I couldn't believe it." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'When you got decks, did you pull in your crew?' },
      { t: 'turn', who: 'JABBAR', x: "Definitely. We rented a basement at Faramarz Crossroads. Every Friday people from Tehran and other cities came through. I'd practice scratching while dancers trained, and it became a hub where we could connect and have fun. If someone needed a DJ for an event, I'd bring my gear and play." },

      { t: 'h', x: 'The scrapheap' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'How did your journey in street percussion start?' },
      { t: 'turn', who: 'JABBAR', x: "That started alongside DJing. Even in early cyphers, I'd add rhythm to keep dancers moving. Once I moved to Tehran in 2018, I took it more seriously, scratching, juggling, producing, and spending time at underground parties. By the end of 2019, some friends were performing in a circus, and that's when we really began experimenting with street percussion." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'A circus?' },
      { t: 'turn', who: 'JABBAR', x: "Yeah, the circus had a name but I can't remember. I was living in Tehran then, and the scene was wild, full of unpredictable, creative people from all over Iran. Some of my close friends were in the show, and I'd hang out with them, sometimes even crash there. One night when there wasn't a performance, we were sitting around bored. Outside the tent was this pile of scrap." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Like building leftovers?' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly, junk, random thrown-out stuff. My friend picked something up and started banging on it. I grabbed another piece, then someone else joined in. Suddenly there were ten of us playing together, and we realized we had created this **wild little percussion orchestra**.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: "That's incredible." },
      { t: 'turn', who: 'JABBAR', x: 'We were banging out breakbeats and wild rhythms, and the energy was instant. When we took it to the streets, crowds would flood in, sometimes a thousand people, completely blown away. Later our crew started building instruments: cylinders that opened and closed with air pressure, PVC pipes tuned to different notes. But at the start it was pure percussion, raw beats and counterbeats. I had seen similar things in New York, but in Iran it just didn\'t exist. Suddenly we were starting a movement. You would have toddlers stopping in amazement, or elderly religious men clapping along. Whether it was techno, breakbeat, whatever, the energy connected everyone.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Breakbeat in the streets of Tehran. Unreal.' },
      { t: 'turn', who: 'JABBAR', x: "We were bringing modern culture straight into people's eyes and ears in a new way. It felt amazing. Then the pandemic hit. I left Tehran and went back to Mashhad." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Because of COVID?' },
      { t: 'turn', who: 'JABBAR', x: "Not just COVID. Life in Tehran wasn't stable for me then. My first move there didn't go as planned financially, and when the pandemic came, I decided to head back. I set up my gear in my dad's house, and that became my spot. The crew kept reaching out. Someone needed a podcast, another wanted a DJ set for a rap project. We shot videos, shared stories, and in between I was producing. I stayed busy." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Since you were producing so much, how did the street percussion fit in? Did it influence your breakbeat tracks, or did production start shaping the percussion?' },
      { t: 'turn', who: 'JABBAR', x: 'Before we ever started drumming on buckets or junk, I had been playing percussion since I was a kid. But the street style opened everything up. We realized anything could make a sound and every object could become an instrument. That gave the music character. It erased limits for me.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'So those limits just disappeared?' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly. I could hit something from any angle and get a new texture. You could stack hundreds of sounds. In live shows we improvised, banging on trash, mixing it all in. And in production those same raw sounds found structure. They were not messy anymore, they fit.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'When you talk about it as a movement, it feels like your whole journey. It starts underground but spills into the street, where it is raw and immediate. Do the underground and the street carry the same weight for you?' },
      { t: 'turn', who: 'JABBAR', x: 'At a certain point, yes. They support each other.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: "Now you are fully based in Tehran and part of the community. But when you first came, you did not know anyone. You were not fully DJing yet, you were dancing, battling, exploring. The scene is small, and I think that's how you met your community. What actually excites you more: building your base in the underground, or creating something with people in the street?" },
      { t: 'turn', who: 'JABBAR', x: 'Underground or street? It depends on my mood, the period I\'m in. I don\'t think, "This is for the underground crowd." I do it for myself. Always.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'For the music itself.' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly. For the flow inside me, whatever I need to express at that moment.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'And dance? Do you still love it as much as before?' },
      { t: 'turn', who: 'JABBAR', x: "The same love, but in a different way. I don't train like I used to. Now it's about reading the dance, experimenting with new states, following a feeling rather than practicing." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Let\'s say people could only know you as one thing: dancer, DJ, or producer. Which would you want?' },
      { t: 'turn', who: 'JABBAR', x: "For me, dance and music are inseparable. From the outside I don't know what people see, but dance is a clear part of who I am." },

      { t: 'h', x: 'The economics' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'In Toronto, most DJs have to chase labels and gigs. Ninety-eight percent of the work is reaching out. But some are so good people go to them. Have you reached that point? Do foreign labels approach you?' },
      { t: 'turn', who: 'JABBAR', x: "It's starting. A few labels reach out now, but it still feels like the beginning. What matters most is being here in Iran, enjoying the music and doing the work right. If I stay focused on that, the rest will follow. Ninety-nine percent of it is just making sure my own work is solid." },

      { t: 'turn', who: 'MAHAN', ask: true, x: "Do you see yourself staying an artist long-term? Running a label one day, maybe teaching? What's the vision?" },
      { t: 'turn', who: 'JABBAR', x: 'I want to work with big, exciting labels, to push myself and my sound as far as possible. I want to be the best I can at what I love.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'And on the money side? With your style, you could sell snippets, tracks, all kinds of things. Are you making income that way? How much does that keep you satisfied as an artist?' },
      { t: 'turn', who: 'JABBAR', x: 'Honestly, not much from sales. The market is not really focused on that. I have sold beats when I needed to, but these days I just put tracks on platforms and let them circulate. It is nothing major. Things are a little better now, with more cash flow for artists than before, but financially it is still just okay.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'And like you said, the goal is working with bigger labels. But right now, is your income coming more from the underground scene or from outside work? You also mentioned things have improved for artists. Is that mainly because of the underground, like parties with sponsors and events that bring in money?' },
      { t: 'turn', who: 'JABBAR', x: 'For me it is mostly underground. There may be another market forming on the side, but right now it is underground.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'So it is not about good or bad, just the reality of how closed off that scene is in Tehran.' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly. Every so often you can take another step forward, but there is always a ceiling. Still, things are moving slowly and steadily in the right direction. It has not stopped, and I am hopeful it keeps improving.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'I would love to know more about dance battles. Are they like freestyle rap battles, just another way of competing?' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly, except there is no money in it. It is very raw, very street. The real way to make money from dance, at least in my experience, is teaching, running classes, having your own studio. That is where most of the money comes from. Some people also go the social media route, especially Instagram here, trying to build hype and land sponsors.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Yeah, exactly.' },
      { t: 'turn', who: 'JABBAR', x: 'Teaching is still the most reliable option financially. If you have ten, twenty, thirty students, that is steady income.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'So that is how you made money from dance, by teaching.' },
      { t: 'turn', who: 'JABBAR', x: 'Yeah, most of my income from dance came from teaching.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'What about music? When did you first get paid for that?' },
      { t: 'turn', who: 'JABBAR', x: 'My first payment probably just covered part of a trip. Like, traveling from Mashhad to Tehran and back, it might have paid for half the cost. That was it.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Still, that first time means a lot. Even if it just covers travel, it feels important. And then you are staying with friends in those posh districts. Were those early gigs through the Tehran community you are part of now, or through another circle before you were more recognized?' },
      { t: 'turn', who: 'JABBAR', x: 'For the most part, from the very first time I played and someone clapped for me, it was within this same community, or close to it.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'You never thought about starting your own label? A place where artists could record, learn, and grow? You have been producing for almost three years now.' },
      { t: 'turn', who: 'JABBAR', x: 'Yeah, maybe a little more. But seriously producing, around two or three years.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'The tools you use are things you could easily teach others. I do not just mean an electronic label that releases tracks, but one that also focuses on teaching, where you could pass on your knowledge. Have you thought about that?' },
      { t: 'turn', who: 'JABBAR', x: 'Honestly, yes. I would love to start a label. But right now, just living in Tehran is still a challenge. It is getting better and I am becoming more stable here, but it is still a work in progress.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'This is your first time living away from home long term, right? Tehran is your first real move.' },
      { t: 'turn', who: 'JABBAR', x: 'Yeah. I lived in Mashhad too, but this is different.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Because there you had family around, and here you are on your own.' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly. And the more stable I get, the more I want to push forward. I like trying different things, focusing on live sets, experimenting with new genres. I even tried to start a label once, but it did not work out. Right now I am just developing myself.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Are you working with any international radio shows or podcasts?' },
      { t: 'turn', who: 'JABBAR', x: 'Not this year. I have been focused on live performance, getting deeper into gear and machines, and experimenting with new styles. Next year I want to start releasing more, whether through foreign labels, physical releases, or radio shows.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'You must have a lot of material stacked up by now.' },
      { t: 'turn', who: 'JABBAR', x: 'True. I have released only a fraction of what I have made. Sometimes I will create tracks for a show, polish them just enough, and then move on. I might make ten or fifteen dance tracks and let them sit. By the time I revisit something, I already have newer material waiting. It piles up fast.' },

      { t: 'h', x: 'The basement' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'If you look back and think, "That was the moment I became Jabbar," where is it? The wallpaper room, the basement, the circus?' },
      { t: 'turn', who: 'JABBAR', x: 'Honestly, all of them shaped me. But if I had to choose a turning point, it was the basement. That was when I started taking music seriously, dropped the side projects, and focused in. Even my life outside music shifted. That is what eventually pushed me to move to Tehran.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: "Damn, what a basement. I had no idea about that part of your story. It's funny, most of the time we only see the surface version of an artist's life. Even with close friends, you rarely get into the real journey. But once you do, you realize it could be a movie. If you had stayed in your hometown, would you still be the Jabbar you are today? Moving to Tehran must have played a role. In Mashhad, do opportunities like this even exist?" },
      { t: 'turn', who: 'JABBAR', x: 'Not on this scale. Tehran is really the only place in Iran where things happen at this level. Other cities might have smaller versions, but it is not the same.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'The scene here feels different. Sponsorships, visuals, sound systems, it is all bigger. In other cities it is still mostly house parties. For us, that is where it all began. But over the last few years things have grown.' },
      { t: 'turn', who: 'JABBAR', x: 'Yeah, I have started taking it more seriously now. There is some money moving around, which feels good, even if it is not much yet. But I did some things in Mashhad right after the pandemic. We organized a battle and b-boys came from all over Iran. I handled the music on a system I had built myself. It was in a wrestling gym, and the energy was unreal. Authorities showed up and gave us thirty minutes to shut down, but we managed to finish.' },

      { t: 'turn', who: 'JABBAR', x: 'Another time a friend had this lot behind a shopping mall. We told people to meet us there, set up buckets and a bass system, and jammed in the street for hours while dancers battled. The vibe was perfect.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'And the crowd, was it more like the rap scene?' },
      { t: 'turn', who: 'JABBAR', x: 'A mix. In both Mashhad and Tehran you would see all kinds, but most were hip hop heads, basketball players, rappers, dancers, people from the street scene.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'That makes sense. Honestly, the community in Tehran is one of the most talented when it comes to throwing events. The visuals, the atmosphere, the sound, they are some of the best. But back in Mashhad, it sounds like you were really the first DJ to bring an underground project out into the open.' },
      { t: 'turn', who: 'JABBAR', x: 'Yeah, DJ-wise, it was me. There were dancers, but no other DJs.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Right, no one else was really in the scene. So yeah, you were the first.' },
      { t: 'turn', who: 'JABBAR', x: 'As far as I remember, yeah.' },

      { t: 'divider' },

      { t: 'turn', who: 'MAHAN', ask: true, x: "Let me say this, Jabbar, I really enjoyed this. I do not know if you have ever done an interview like this before. I am not a pro, you know that, but there were questions I wanted to ask, not just for The Persian Magazine, but for myself. I wanted to know your character better. Props to the team for letting me do this, and I hope you enjoyed it. I want this hour we have had together to be something you can look back on and feel good about. I have missed you a lot. Next time I am in Tehran, let's meet up and have some fun, okay? Let's stay in touch." },
      { t: 'turn', who: 'JABBAR', x: 'Yeah, for sure. Sounds good. We will keep in touch.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'You know, I was looking through old party photos, and I realized we do not have a single picture together. If you come across one in your archives, anything except the post-party bad ones, send it to me.' },
      { t: 'turn', who: 'JABBAR', x: 'Sure, bro. Of course. I will check.' },

      { t: 'note', x: 'Milad Jabbar Imani, interviewee. Mahan Abbaszadeh, interviewer. Written by Lenia.' },
    ],
  },

  {
    key: 'bybanoo',
    kind: 'feature',
    title: 'BY BANOO: the sisters who built the bag they could not find',
    subject: 'Persheng & Perdica Babaheidari',
    discipline: 'Fashion',
    standfirst:
      'Persheng and Perdica Babaheidari left a consultancy and a medical degree. They now sell to forty countries.',
    cover: 'tpm-bybanoo-cover',
    images: [],
    minutes: 7,
    body: [
      { t: 'lead', x: 'In 2017, Persheng Babaheidari, a newly graduated engineer, entered the workplace as a management consultant. However, she quickly realized something was missing — *a chic and practical laptop bag designed specifically for women like herself.*' },

      { t: 'p', x: 'Frustrated by the lack of options, Persheng teamed up with her sister Perdica Babaheidari, a medical student, to address this gap in the market. Together, the two Swedish-Iranian sisters founded BY BANOO, a company dedicated to providing stylish and functional working bags made to fit the needs of modern professional women.' },

      { t: 'p', x: 'I had the opportunity to interview Persheng and Perdica, who graciously shared their journey with me. Their journey from identifying the problem to launching a successful business speaks volumes about their entrepreneurial drive and commitment to empowering women in the workplace.' },

      { t: 'divider' },

      { t: 'qa', q: 'What led to the founding of BY BANOO?', who: 'PERSHENG', x: "It was when I began working as a management consultant that I discovered how challenging it was to find a stylish and practical laptop bag. I have always been very interested in fashion, but there was no stylish bag that could fit the laptop. I asked my female friends and colleagues where they bought their laptop bags and everyone said it was very difficult to find one. When we looked at what men had, they had a classic briefcase, but none of the women carried them, because they obviously weren't stylish or functional enough for their needs." },

      { t: 'qa', who: 'PERSHENG', x: 'After I had been working for two years I asked my sister if we should create a company that provides working bags for women and Perdica thought it was a very good idea. However, it takes quite a long time to start a company, so I chose to continue working as a management consultant and Perdica chose to continue studying to become a doctor, until we reached a point where we felt we had to focus full-time on the company. Therefore I quit my job a little over a year ago, and Perdica finished her studies in January and has been working full-time since then, so now we are both doing it full-time.' },

      { t: 'qa', q: 'Starting and running a business involves taking risks. How has it been for you to set aside your previous careers to focus fully on the company?', who: 'PERDICA', x: "One thing we have learned from our parents quite early on and that they have instilled in us is to **dare to be brave**. We have been told since we were young that you can do exactly what you want and you can accomplish many things. It wasn't like choosing a career and just sticking to it, but that careers can be combined if you want to." },

      { t: 'qa', who: 'PERDICA', x: 'It is also about the opportunity we have in Sweden and it feels stupid not to take that opportunity. If there is any country that has your back in terms of entrepreneurship, career and education it is Sweden. We have not really reflected on being brave. We hear it quite often, but it is not something either I or Persheng feel. It is more about that we have this opportunity, so why would we not take it?' },

      { t: 'qa', who: 'PERSHENG', x: 'The reason we have not felt that we are brave is because we have had other scenarios to compare with. When we see our relatives in Iran, who do not have the same opportunities as us, we realize there is a lot that we can do here and we almost do it because we can and therefore it feels very obvious that we should do it. We gained the perspective that Sweden is the land of opportunities and that you can become whatever you want here, because education is free and we grew up with the confidence that everything is possible just because our parents had another perspective growing up during war in Iran.' },

      { t: 'qa', who: 'PERSHENG', x: 'We also want to use our brand to show and inspire others to dare to invest in their careers. Today there are very few women in boardrooms and in leadership positions and there is a reason why this type of product has not existed before, because this type of job is often dominated by men. My previous job as a management consultant was male-dominated, and therefore it is a social issue for us when it comes to problems women face. Women should dare to invest in their careers, just as we have dared to invest in our company and we want to see these bags in important rooms where important decisions are made.' },

      { t: 'q', x: 'We want to see these bags in important rooms where important decisions are made.', who: 'Persheng Babaheidari' },

      { t: 'h', x: 'The name' },

      { t: 'qa', q: "Why did you choose to name the company BY BANOO, and what significance does the company's name hold for you?", who: 'PERDICA', x: 'Actually, it was our father who helped us name our company and *banoo* is a Persian word, meaning lady, queen or woman. In the beginning we just thought of being called "banoo", but that domain name was taken. However, we really liked "banoo", so we came up with BY BANOO, which means, by the queen or by the lady, and we realized that it can be cool too. It also has a personal touch to it as it shows our heritage and that it is from the woman. I think for us it has been a representation of us clearly in the name, but also a representation of what we do and not just who we are and what we do, but a combination of both.' },

      { t: 'h', x: 'What makes a work bag' },

      { t: 'qa', q: 'What features do you consider important in a good work bag, and what sets your work bag apart from others on the market?', who: 'PERSHENG', x: 'According to us, a good work bag is one that is both functional and stylish. Personally, I would never buy a bag that is ugly but functional, or vice versa, because I need both, so it is something we absolutely do not compromise on when we design. When it comes to functionality, it should be a bag that can withstand a lot of weight, so it needs to be constructed in a way where you can fill the bag a lot without it becoming deformed. The bag should also have a laptop compartment, because most jobs that we target are usually in need of a laptop.' },

      { t: 'qa', who: 'PERSHENG', x: 'When it comes to material we have chosen to work with Italian leather because it lasts a long time and it looks very nice. It is also a by-product, so no animals die because you use leather, but it is something you handle as waste and you can choose to either throw it away or use it.' },

      { t: 'qa', who: 'PERSHENG', x: 'Furthermore, we also have a very strong focus on sustainability and manufacture all our products in Europe to ensure good working conditions for those who manufacture the bags, as they are under EU legislation. Before, we used to manufacture in Estonia, but we have recently moved the production to Portugal.' },

      { t: 'qa', who: 'PERSHENG', x: 'All our materials are purchased in Italy to minimize transport distances because often today, much in the fashion industry is produced in Asia and then it is transported to Sweden. The transport distances become so long, so we try to minimize the climate impact in that way, but at the same time we try to make a high-quality bag that lasts a long time, so you do not have to buy many bags, because it is not good for the environment to overconsume.' },

      { t: 'qa', who: 'PERSHENG', x: 'What sets our bag apart from other bags is when we started, this type of product did not exist and there were really few on the market and we were as far as I know among the first in the Nordics to develop this product. Before what was comparable was a male briefcase and a large backpack, or completely different types of bags that do not fulfill the function our bag does, and we wanted to develop a briefcase as our first bag because there was no briefcase for women in that way.' },

      { t: 'qa', who: 'PERSHENG', x: 'Today, since there are more people who have experienced this problem, more companies have also emerged. Design and functionality is our core, but we are also authentic behind the brand. We are two women who are sisters behind the brand and that is also what we show in the marketing. The whole message behind the brand is about women daring to invest in their careers and that is also what characterizes us as a company.' },

      { t: 'qa', who: 'PERDICA', x: 'Authenticity has been very important to us because we ourselves have dared to invest in our own careers. Both I and Persheng are business women, which makes us our own customers. This makes it easier for us to identify features in the bag that make it easier for us to design the product and I think we can offer a bag that the business woman really wants, because we ourselves are the customer.' },

      { t: 'h', x: 'Where it goes' },

      { t: 'qa', q: 'What goals have you achieved with BY BANOO so far, and what does the future look like for you and your company?', who: 'PERDICA', x: 'We have quite rapidly reached the global market, which we maybe did not expect at the beginning, but it is really fun and today we sell to 40 countries.' },

      { t: 'qa', who: 'PERSHENG', x: 'I would also say that all the thousands of customers we have and the pop-up store in Stockholm last year are some other achievements. We have really hit a need that not only we feel, but that many others also recognize. I also think it has been a key factor in why we have succeeded well with marketing because we communicate a problem that many women experience and not just us.' },

      { t: 'qa', who: 'PERSHENG', x: 'Until now, we have only sold through our own e-commerce, but are now expanding to sell through retailers and we have signed our first retailer, which we will announce shortly and we are very excited about that. It has been very hard work behind it, but we are just looking forward to expanding our company.' },

      { t: 'qa', who: 'PERSHENG', x: 'We want to become a big global brand with a focus on business women because we feel that there has not been a fashion brand where the businesswoman is the focus. Much of the fashion before has just been about looking good, which we agree with, but it is about the idea that one should look chic and also have a higher purpose with what one does and that women are not just pretty, but also very smart and driven. Everyone can go as far as they want as long as they believe in themselves and have a community that also believes in them.' },

      { t: 'qa', who: 'PERDICA', x: "I think our long-term goal is to become the go-to brand for women's work bags. We should be the first thing you think of and if you see a BY BANOO bag in town, you should immediately think that it is a businesswoman." },

      { t: 'qa', who: 'PERSHENG', x: 'We want women to feel empowered when they have our products. You should get that boost and feel that I will ace this interview, I will nail this pitch or whatever it is you do in your career. We want women to feel like they can do whatever they want.' },
    ],
  },

  {
    key: 'phi',
    kind: 'feature',
    title: 'Ali Phi builds machines and false mirrors',
    subject: 'Ali Phi',
    discipline: 'Transmedia art',
    standfirst:
      'The Iranian-Canadian transmedia artist on digital waste, Achaemenid theory, and installations that hand people back to themselves.',
    cover: 'tpm-phi-cover',
    images: [],
    minutes: 7,
    body: [
      { t: 'lead', x: 'In a rapidly evolving world where technology and tradition often stand at odds, *Ali Phi crafts a space where the two not only coexist but converse.*' },

      { t: 'p', x: 'As a pioneering Iranian Canadian transmedia artist, founder of Nullsight, and Artistic Director of TADEX (Tehran Annual Digital Arts Exhibition), Ali Phi has made a name for himself across global stages with immersive audiovisual performances that draw from Persian mysticism, generative design, and contemporary code-based art. Ali Phi\'s work spans international stages, where he blends computer programming and generative design to create complex visual experiences. Drawing inspiration from tradition, architecture, and the visual languages of ancient Persia and the Middle East, he builds immersive, forward-looking worlds rooted in cultural memory.' },

      { t: 'p', x: 'The Persian Magazine Canada sat down with Ali Phi to delve into his creative process, the future of this new and ever-evolving field, and how identity and architecture shape his creative vision.' },

      { t: 'divider' },

      { t: 'qa', q: 'An introduction from Ali Phi:', x: "I'm a transmedia artist and creative technologist. I work with computer programming, coding, fabrication, and digital media to create immersive, spatial spaces, as well as generative content. I work with a diverse type of media elements that connects to digital technologies, using these tools to create my artworks." },

      { t: 'qa', q: 'What are you currently working on, and what do you have planned for the future?', x: "Currently, I'm working on a project where the concept is based on digital waste and the human footprint. I've been working on this project for the past two years, and it's now in the phase of being performed and toured across countries in the MENA region, Europe, and North America. I think for the next couple of years, I'm going to stay focused on this concept and on incorporating different sorts of AI-driven technologies or any new advancements in technology that could benefit my work and the materials I use to create my artwork." },

      { t: 'qa', q: "What's something about you or your work that might surprise people?", x: 'I usually consider my works as machines and false mirrors. In my installations, I confront the audience with themselves, reflecting their inner thoughts and feelings. Each project varies depending on the concept, but this element is a consistent thread throughout my installation work. I also perform audiovisual pieces, which differ in context from the installations sometimes.' },

      { t: 'q', x: 'I confront the audience with themselves, reflecting their inner thoughts and feelings.', who: 'Ali Phi' },

      { t: 'qa', q: 'How do you think the next generation would interact and approach your field of work, keeping in mind the advancement of AI? How do you see AI affecting your field of work?', x: "I use AI like any other material or tool I've worked with over the past 15 years. It's a new technology, and there's a lot of hype around it. It will definitely influence how I create, affecting both the speed and the way I approach my work. But I don't see it as something purely practical or functional, like it's used in industries or corporations. I usually take similar technologies and hack or reverse-engineer them, using them as raw material for creating artworks." },

      { t: 'qa', x: "As for the next generation, I think it really depends on what kind of media resonates with them and how they think. The work I present usually reaches a specific community of people who are interested in contemporary art or open to new experiences. It's not necessarily meant to be popular. The visuals and sounds I create are more about inviting the audience to reflect and to find themselves within the work." },

      { t: 'qa', x: "When it comes to the next generation, their engagement with art will depend a lot on their individual backgrounds. It depends on what they study, what they let into their minds, what they see, and what they observe. I don't have a clear answer, but I think it will vary from person to person." },

      { t: 'h', x: 'Where the practice sits' },

      { t: 'qa', q: 'Do you see yourself more as a fine art artist or a new media artist, and have you had prior experience with commercial galleries in and outside of Toronto?', x: "The types of projects I've been working on are very diverse, ranging from theatre and stage design to building my own machines and developing my personal art practice. I think that in 2025, there will be a lot of overlaps. People are starting to see how much everything is integrated across different contexts and concepts." },

      { t: 'qa', x: 'The term "transmedia artist" is probably the most accurate way to describe my practice. I have experience in creating new spaces, working with architecture, physical modelling, and digital fabrication. Each project is different. Recently, I started using robotic tools to create artworks. The process is digital, but the final piece is mechanical and physical. There are many mutual points between contemporary artists and new media artists today. The types of projects I do are so diverse that I\'m constantly learning. I don\'t believe in barriers or limitations when it comes to exploring new areas. I try to challenge myself by accepting unfamiliar projects and stepping into new fields. For a while, I moved away from stage design, but recently I\'ve returned to it, combining technology with light, sound, and visuals to create immersive and collective experiences for audiences.' },

      { t: 'qa', x: 'As new media artists, we also have to consider how to make a living. That was the reason why I started a collective called Nullsight. The idea was to support both the community and individual artists while also helping artists find new ways to produce work. The focus is no longer just on advertising or commercial projects. This initiative is almost as old as my artistic career, and it is still growing and trying out new models for creative work.' },

      { t: 'h', x: 'Space, and where it comes from' },

      { t: 'qa', q: 'Can you explain how architecture and spatial elements influence your creative process?', x: 'Architecture has always been one of my favourite areas to study. I was trained as a civil engineer and spent a lot of time designing concrete and metal structures. I have always been deeply inspired by space, the energy it holds, and what you can create within it. Designing spaces or elements of spaces that people can experience has deeply influenced me.' },

      { t: 'qa', x: 'The effect of space on an audience has been a key focus for me since early in my career. I aimed to create immersive environments by filling spaces with media, sound, and visuals. This has remained a central theme in my installations and presentations.' },

      { t: 'qa', x: "After working on several projects, I became increasingly interested in the challenge of creating spaces. I'm especially inspired by Persian architecture, sacred geometry, and design elements rooted in the Iranian plateau. I am still learning and working to build a dialogue between digital forms and historical ones, connecting the past with the present in my new works." },

      { t: 'qa', q: 'How does your Iranian heritage inform artistic practice? Is it through the dialogue with traditional Persian architecture?', x: 'My work is mostly inspired by the theory from the Achaemenid dynasty and other very ancient civilisations. The idea behind this inspiration is that they were trying to **spread heaven over the earth** instead of just waiting to die and go to heaven. This belief led to the creation of many Persian gardens and carpets. They aimed to bring art and beauty into their lifestyle rather than simply framing it and putting it on the wall.' },

      { t: 'qa', x: 'This is the main inspiration from Iranian culture and art. Iranian artists have always tried to be very creative, influencing a much larger region beyond the borders of Iran. I often work with Iranian ritual and regional music for my sound designs and audiovisual performances. Anything that has a connection to the past, whether in sound, space, or visual inspiration, I usually incorporate into my creations.' },

      { t: 'qa', q: 'Do you think art, especially digital art, should aspire to permanence, or is impermanence part of the medium?', x: 'I think this has been a challenge since the early days, about 10 years ago, when new media and digital arts first became popular internationally. One of the ongoing challenges is collecting digital art and its digital essence for many collectors and audiences.' },

      { t: 'qa', x: 'For me, the moment of experiencing and activating different senses at the same time is a key and important aspect of digital art. I usually prefer to create memories or experiences that exist temporarily for the audience.' },

      { t: 'qa', x: "However, I believe it is still too soon to fully address this because the technology has not yet advanced enough and I think we don't yet have digital works that can last for a long time or be truly sustainable." },
    ],
  },

  {
    key: 'mahini',
    kind: 'portrait',
    title: 'Ali Mahini photographs the people nobody looks at',
    subject: 'Ali Mahini',
    discipline: 'Photography',
    standfirst:
      'A Gen Z photographer digging under Iranian identity, and the intellectual space he is trying to destroy.',
    cover: 'tpm-mahini-cover',
    images: [],
    minutes: 5,
    body: [
      { t: 'lead', x: '*"Irooni Boodan"* is a timeless and spaceless mindset and a place that displays the set of behaviors of Iranian people. These behaviors, which have no meaning for a first world, make our identity.' },

      { t: 'p', x: 'Ali Mahini, the young photographer of generation Z, uses the curiosity and arrogance of his generation, to dig into the lower layers of this Iranian identity, and by pulling out the elements that are not seen in everyday life, he bears the burden of displaying them. Observing his personal filters, he shoots native subjects of cities in Iran in order to depict the truth and reality in Iranian society for history.' },

      { t: 'p', x: 'Like most photographers, Ali started his photography journey by taking warm and beautiful photos of nature, but during his travels to different regions of Iran and talking with people, his concept of beauty and concerns changed. He mentions about his trips:' },

      { t: 'q', x: 'During my trips, when I was hitchhiking, I was constantly talking to the drivers. Every car I rode, I was a new Ali. These conversations were practice for me, practice of speech and light.', who: 'Ali Mahini' },

      { t: 'p', x: 'During these trips, the sunset was no longer the subject of photography and his camera lens was directed towards a more dynamic subject. Sitting with people and talking to them without any judgment and seeing their concerns made Ali interested in photographing spaces where human life is felt. Generally, his subjects are people who not only no lens but **no eyes are directed towards them**.' },

      { t: 'p', x: 'During the shooting, Ali communicates with his subjects and spends hours talking with them. Taking pictures is not a priority for him, and the personal process of getting to the picture is more important. Generally, his photos tell their own story and he depicts the subjects in a public space, side by side with everyday life. Ali bypasses any kind of censorship by not manipulating the photography scene and leaving the subject free to choose the pose and location.' },

      { t: 'h', x: 'Prince of Persia' },

      { t: 'p', x: "In the collection that Ali mentions under the title of Prince of Persia, all the censorships of the Iranian society fade away, and our photographer confronts us with a problem that has no expiration date. By discovering the unknowns of Daneshjoo Park, he brings forward a topic that is censored by people's eyes every day in the crowded and busiest street of Tehran." },

      { t: 'p', x: 'In the process of this collection, Ali listens to these people without any judgment and does not reduce them to objects for his photography. During the conversations, he finds the roots of the chaos in the lives of his subjects and reaches the hidden layers of their personalities. As the conversation progresses, he realizes that there is no gap between us and the subject.' },

      { t: 'p', x: "In the whole process of photography, Ali is trying to reduce his ego and leave the subject free and not force them into his intellectual space. From Ali's point of view, this intellectual atmosphere is the reason why people ignore such issues in society. So by leaving this censored space, he takes his lens towards the chaos to show the whole society, ugliness and beauty together." },

      { t: 'p', x: 'Ignoring these issues and preventing them from understanding, or in Ali\'s words, the intellectual space of "I don\'t see it, so it doesn\'t exist!" — is an important part of his photography concern. As a photographer, he shows his audience the unseen aspects of Iranian life, and by giving them a shock, he leads them to understand the subject in order to destroy this intellectual space.' },

      { t: 'divider' },

      { t: 'q', x: 'Sometimes people around me say why do you show such dirt? But I have no fear about showing the ugliness. In my opinion, the beauty of the story has been seen far too much and my concern is to show the coldness that is sometimes not desired by my audience.', who: 'Ali Mahini' },
    ],
  },

];

/** Empty until TPM send real people. The page hides the rail when it is. */
export const TPM_CREATIVES: TpmCreative[] = [];

export function tpmPost(k?: string) {
  return TPM_POSTS.find((p) => p.key === k);
}
