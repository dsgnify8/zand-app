# Isam, as filed. Inserted third in the feed.
#
# TPM's cover star for that issue, and Nojan wants it high on the page.
# Third rather than first: the feed opens big, and something arriving in
# the second beat gets read as often as the first while leaving the top
# slot free to change.
#
# Fixed: a lowercase sentence start ("he began his career") and "the first
# Iranian rappers" where it should be singular. Nothing else.
#
# The numbered questions lose their numbers, as with Soheil — a working
# convention rather than something a reader needs.

p = "constants/tpm-content.ts"
s = open(p).read()

PIECE = """  {
    key: 'isam',
    kind: 'feature',
    title: 'Fereshteye Bad',
    subject: 'Isam',
    discipline: 'Music',
    standfirst:
      'The 25-year-old rapper from Toronto who has filled a gap in Persian '
      + 'rap that nobody else could — and is finishing his first album.',
    cover: 'tpm-isam-cover',
    images: [],
    minutes: 9,
    body: [
      { t: 'open', x: 'Sam, also known as "Isam," is a 25-year-old Iranian rapper (born on August 5, 1999) living in Toronto, Canada. He is perhaps one of the few Iranian rappers whose unique voice and melodies are enjoyed by Iranian music audiences of all tastes. He began his career by designing covers for other musicians\\' tracks and quickly became one of the most prominent figures in the Iranian rap scene in recent years.' },

      { t: 'p', x: 'His adventurous spirit and unique position in the world of rap music have filled a void that no artist had been able to fill with such quality for years. One of the main features of the recent era of Persian rap has been the addition of a modern Western perspective and spirit through the use of English words and phrases in the lyrics of Iranian rappers\\' works. Due to living in Europe from a young age, he is well-versed in Western culture and fluent in English, making him an unparalleled example in the new path of Persian rap.' },

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
"""

# Third in the feed: past the opening beat, still above the fold on a
# second screen. Counting the two entries that come before it.
import re
opens = [m.start() for m in re.finditer(r"\n  \{\n    key: '", s)]
if len(opens) >= 2:
    at = opens[1] + 1          # after the second piece begins... no: before the third
    at = opens[2] + 1 if len(opens) > 2 else len(s)
    s = s[:at] + PIECE + s[at:]
    print("inserted at position 3")
else:
    print("   too few pieces to place it third")
open(p, "w").write(s)
