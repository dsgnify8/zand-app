# Pozx, as filed.
#
# A companion to the Isam interview — same format, same series. His
# self-introduction is inside the writer's opening paragraph in the
# source; it stays there rather than being promoted into a Q&A, because
# the writer put it there deliberately.
#
# Fixed: two doubled spaces. Nothing else.
#
# Ours: the title, the standfirst, three section breaks, one pulled quote.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'pozx',
    kind: 'feature',
    title: 'Everyone is part of their own main stream',
    subject: 'Pozx',
    discipline: 'Music',
    standfirst:
      'The Lo-Fi Guy, from Tehran — on cassette warmth, being expelled '
      + 'repeatedly, and why he does not believe in mainstream.',
    cover: 'tpm-pozx-cover',
    images: [],
    minutes: 10,
    body: [
      { t: 'open', x: 'Pooria, also known as "POZX" (Pooria On Zodiac\\'s Expansion), is a 25-year-old Iranian singer, songwriter, and musician based in Tehran. Most Iranian music enthusiasts recognize him for his involvement in the lo-fi genre, and his choice of the username "The Lo-Fi Guy" on Instagram has reinforced this perception.' },

      { t: 'p', x: 'His distinctive lyrical style, which deviates from conventional songwriting rules in popular music genres, his extensive vocabulary, unique performance and expression style, proficiency in playing various instruments including piano, guitar, saxophone, melodica and bass guitar, and his fusion of different styles while focusing on lo-fi, have made him **a truly unique figure in Iranian music**.' },

      { t: 'p', x: '"Begoo Kojaei," one of Pozx\\'s latest tracks, was his first collaboration with The Persian Magazine, and the music video was exclusively released on TPM\\'s YouTube page on June 2nd of this year. In its ongoing series of interviews with young Iranian musicians, The Persian Magazine has now turned to Pooria. In this interview, we discussed the reasons behind his choice of the lo-fi genre, the challenges of being a musician in Iran, the positive and negative impacts of his education at the Tehran Conservatory of Music Boys, the conditions for earning a living through music, the mainstream and alternative music scenes in Iran, the strengths and weaknesses of Iranian music in recent years, his unique lyrical language, among other topics.' },

      { t: 'p', x: 'Before posing the interview questions, I asked him to briefly introduce himself: "My name is Pooria. I was born on April 20, 1999, in Tehran, where I have also grown up. I have an older sister who holds a master\\'s degree in violin pedagogy from Graz, Austria, and is currently studying electronic music. My education includes a diploma in music from the Tehran Conservatory of Music Boys. I have repeatedly tried to pursue further education at the university level, but I have always been expelled."' },

      { t: 'divider' },

      { t: 'qa', q: 'Where did your first steps into the world of music begin?', x: 'Because my family, like many Iranian families, wanted us to pursue music alongside our education (laughs), my sister and I entered the world of music at a young age, and I started learning the piano.' },

      { t: 'qa', q: 'What styles and singers did your family members typically enjoy?', x: "My mom was very fond of Ramesh, and my dad loved Dariush and was also very interested in Varoujan Hakhbandian's works. But since my sister and I are involved in music, we naturally prefer to listen to everything like all musicians do and try to analyze works from all styles. From a young age, I listened a lot to classical and jazz music, and my musical taste later expanded to include other genres such as soul, neo-soul, rap, hip-hop, rock, and more." },

      { t: 'qa', q: 'Did you always think about pursuing music as your profession?', x: 'Yes, it seems like everything was serious for me from the start. When I think about it, I realize that my goal from childhood was to become a musician (laughs). Of course, I used to watch the series "The Big Bang Theory" and really wanted to become a physicist, but that never made me think that if I wasn\\'t doing music, I would become a physicist. I believe that even if I didn\\'t pursue music, I would still end up being a musician (laughs). On the other hand, my sister entered the music conservatory a bit earlier. Although music was serious for me from the beginning, this also had a significant impact on my decision to study at the music conservatory.' },

      { t: 'qa', q: "What was your family's opinion about pursuing a professional career in music?", x: 'Since childhood, my parents have been very supportive of my musical journey, even though they might not have listened to my works. For example, when I first started piano lessons, my mom bought me a piano after the very first session.' },

      { t: 'qa', q: 'What were the positive and negative impacts of studying music academically?', x: "In my opinion, everything has both positive and negative sides. I believe that in every step you take in life, you decide whether to adhere to or break the established framework. Essentially, if someone chooses to play a role within the academic framework, they will always remain in that defined space; like many of my friends who are still studying at university or teaching at conservatories. I can't claim that this approach is wrong; after all, that person is now a very skilled musician. But such a path is not ideal for my lifestyle. I see myself as a creator rather than someone who follows predefined paths. I apply the same approach in other aspects of my life as well." },

      { t: 'h', x: 'Finding lo-fi by accident' },

      { t: 'qa', q: 'Why did you choose the lo-fi style?', x: "This question has been asked of me a lot. I never specifically chose lo-fi. When I was 18-19 years old, I accidentally created several songs that had a cassette-like vibe; it was like they were both clean and dirty at the same time. It's like I made something that I myself had no awareness of, and the jazz chords I played under the vocals really moved me. I wasn't sure how to label it. At that time, after some searching, I came across the lo-fi style and realized that there were actually people working in this genre." },

      { t: 'qa', x: "I had been experimenting with music production in various styles like EDM, Dubstep, House, Tech House since I was 13, while also practicing Bach's piano concertos and Chopin's etudes for my conservatory exams. So, there was a strange contradiction in my musical path at that time. Therefore, I wanted to find unity in music after completing my studies. I decided to, for example, play and sing the chords I like in a certain format and in general, start using this musical knowledge of mine." },

      { t: 'qa', q: 'Don\\'t you think choosing the title "The Lo-Fi Guy" might prevent you from distancing yourself from that musical structure?', x: 'I\\'m not bothered at all by the fact that my name is "The Lo-Fi Guy." At present, all my audience knows that I don\\'t only work in the lo-fi genre, and I\\'ve experimented with many other styles like funk, disco, hip-hop, and rap alongside lo-fi. For this reason, I don\\'t think my name can limit me to the framework of the lo-fi genre.' },

      { t: 'qa', q: 'What is the most important factor in distinguishing yourself from other Iranian musicians?', x: "I believe that everyone is creating music together, and there's no need to separate yourself from others due to stylistic differences. In my opinion, the only thing that sets artists apart from each other is their artistic color. Otherwise, one could argue that their lifestyles, emotions, and experiences are almost similar. That is, artists can only be distinguished from each other through that color." },

      { t: 'qa', q: 'What was the biggest mistake you made during your music career?', x: "I've made many mistakes in my life, but I never view them as mistakes. There was a period where I could have made a name for myself in my career, but I was struggling with severe depression. Now, everyone tells me I wish I had been more dedicated during that time. But I believe it's never too late, and there's always an opportunity to shine, even though fame has never been my main concern. So, I think if I had been able to overcome that struggle and depression in some way at that time, I might have had a much different position in the Iranian music scene today." },

      { t: 'qa', q: 'You perform in a genre known for its slow tempo and repetitive rhythm, typically regarded as background music for study. How can you implement all your musical ideas within such an apparently limited framework?', x: "Yes, the tempo of all my music is slow, and listeners simultaneously study, sleep, and so on. I like everything to be chill, even though I am constantly on the move and very active. Interestingly, in my recently released EP, the tempo of the tracks has increased a bit so that people can listen to it in much more varied situations than before, especially for fun and entertainment. Therefore, perhaps due to the recent change in my mood, this has happened, and the tempo of the works is both high and low. In other words, my effort has been to show people the mood switch in my album and how they can experience such a thing in their own lives. For example, when you read a book in the romance genre or watch a film in this genre, it's not entirely romantic. Parts of it might be very sad, happy, hopeful, and so on. I see my musical approach in the same way." },

      { t: 'h', x: 'Against classification' },

      { t: 'qa', q: 'Your music is categorized as alternative, contrasting with mainstream Iranian music. What is your opinion about these classifications?', x: "I don't believe in such classifications in music, and I think everyone has their own set of mainstream musicians. For example, when I was a child, popular music meant someone sitting behind a piano and performing pieces, with the audience eventually applauding. So, in my opinion, everyone has a unique perspective and point of view, and based on that, mainstream is defined. Forget about mainstream and these definitions (laughs). The division of music only into these two parts seems really ridiculous to me. In such circumstances, everyone tries to be part of the mainstream, and everyone becomes similar to each other. I believe that everyone belongs to one stream. We are the ones who separate artists from each other." },

      { t: 'q', x: 'We are the ones who separate artists from each other.', who: 'Pozx' },

      { t: 'qa', q: 'How do you evaluate the current state of music in Iran?', x: "I think currently Iranian musicians are definitely working much better compared to previous years, and the music itself has become much more innovative. However, there is one unpleasant issue which is the lack of performance culture in Iran, and this cultural phenomenon hasn't changed for music audiences in Iran who are reluctant to spend money on music. This issue has nothing to do with the artists themselves because they are doing very well even in these unfavorable conditions. The problem is not that we don't like to perform, but rather that the audience is not willing to pay much for music, whether it's buying albums or concert tickets. So, if the issue of artists' performances in Iran can reach a satisfactory level, then Iranian music can truly make a mark on the world stage." },

      { t: 'qa', q: 'If you were a musician in Europe, the United States, or Canada and followed the same path, how would your position be different?', x: 'This is a very interesting question. Well, certainly, I would be operating at a different level right now because many prominent musicians like Steve Lacy are around my age, but our positions differ significantly. If I were to look at this matter realistically, if I were born in another country, I believe my position would be entirely different. However, I am truly content that I was born in Iran because wherever one is born, they grow up and mature with that culture. I genuinely love the culture of my country and all the familiar people around me, and I enjoy being Iranian because, in my opinion, many of my Iranian friends are more warm-hearted than my foreign friends (laughs), and at the same time, they are much more hardworking. So, I have never regretted not being born in, for example, the United States, and I don\\'t really dwell on this matter.' },

      { t: 'qa', q: 'Do you currently make a living through music?', x: "Yes, because music is the only thing I know how to do, and I have always passionately pursued it in any circumstance. However, compared to the experience I have gained over the years and the time I have dedicated to this work, I have earned very little money, and generally, we don't make that much money from music. So, the notion that people have about us always living the good life is completely inaccurate." },

      { t: 'h', x: 'A different alphabet' },

      { t: 'qa', q: 'The language of your poetry, which is relatively different from colloquial language, is inspired by what?', x: "Well, I've always been immersed in music, and as a result, I've kept my distance from vocabulary. I believe most musicians are familiar with a different alphabet. I spoke with that alphabet, fell in love with it during high school, and suffered heartbreak with the same alphabet. Our alphabet consists of 'Do, Re, Mi, Fa, Sol, La, Si, Do,' with sharps, flats, etc. From the beginning, I wrote very simple poetry because I believe that music and harmony have the duty of conveying emotions to the listeners." },

      { t: 'qa', q: "How did you come up with this particular pattern in poetry, while I think there hasn't been any internal example with such a structure in Iranian music?", x: 'This pattern hasn\\'t been specifically for me. From the beginning, I would put together a series of words with rhyme to convey my musical feelings more simply and to reach a wider range of music listeners. Thus, I could breathe life into those words in the form of music.' },

      { t: 'qa', q: "In my opinion, one of the fundamental weaknesses of alternative music in Iran is the musicians' inability to write lyrics, which has led artists to cover songs. Did you think from the beginning about producing music accompanied by vocals and lyrics?", x: "Firstly, I must mention that I disagree with you on this point because you have the ability to elegantly place a few truly ordinary and simple words together in such beauty and finesse that no one would notice their ordinariness. I didn't initially think that producing music necessarily had to be accompanied by vocals, and that's why I didn't sing myself at all. I was working on music with a friend of mine, Paria, and she wrote and sang all the vocals in English. Suddenly, after a while, I also felt inclined to sing myself, in addition to composing. I had ideas beforehand and had written some lyrics, and then I performed them along with piano and guitar." },

      { t: 'qa', q: 'How did "Begoo Kojaei" come about, and what concept did you have in mind?', x: '"Begoo Kojaei" initially started as a loop session video that I shared on Instagram a while ago. After its release, I realized that this track had the potential to become a complete piece of music. So, I decided to finish the lyrics and release it as a single track. Coincidentally, the release date matched my meeting with the TPM team for an interview, photo shoot, and video shoot for the magazine. It was at that moment, after hearing the piece, that they suggested making a music video for the track. We began brainstorming and gathering everything we wanted to include in the video.' },

      { t: 'qa', x: 'In essence, this piece for me is about "searching for something," as opposed to others\\' interpretations of "searching for someone." In other words, everyone thinks that the title of the piece comes with a question mark and poses the question, "Where are you?" However, what I had in mind was a more imperative tone, as in "Tell me where you are right now, as soon as possible."' },

      { t: 'qa', q: 'What advice do you have for young Iranian musicians?', x: "My advice to young musicians would be to understand that everyone's life is their main stream. So, don't even think about music having a main or substream because there really isn't such categorization anymore. Everyone living and everyone making music, in my opinion, is part of their own main stream. So, just move forward with that understanding. I think that's the most logical advice for young musicians." },
    ],
  },
"""
print("pozx:", a in s)
open(p, "w").write(s.replace(a, b, 1))
