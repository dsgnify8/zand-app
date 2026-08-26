# Niousha Noor, as filed.
#
# Four paragraphs of setup, then initialled turns — CJ and NN — which is a
# different convention again from the named labels in the earlier pieces.
# Kept, because it is theirs, and expanded to full names on the page since
# initials mean nothing to a reader arriving cold.
#
# The introduction quotes her twice before the interview begins, which is
# the writer weaving her in. Those stay inside the prose.
#
# The HED line is the standfirst. Ours: the title, three section breaks,
# one pulled quote.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'niousha',
    kind: 'feature',
    title: 'It just chips away at your soul',
    subject: 'Niousha Noor',
    discipline: 'Film',
    standfirst:
      'In conversation with Niousha Noor: can the quintessentially Iranian '
      + 'cycle of intergenerational trauma be broken?',
    cover: 'tpm-niousha-cover',
    images: [],
    minutes: 11,
    body: [
      { t: 'open', x: 'At the heart of *The Persian Version*, an American comedy-drama directed by Maryam Keshavarz, lies a message about cultural identity and family relationships. The Sundance award-winning film is loosely based on the director\\'s life, who grew up in the United States, and was recently released in Europe — perhaps intentionally or by pure coincidence — at the beginning of the Persian year.' },

      { t: 'p', x: 'The film, starring Layla Mohammadi as Leila and Niousha Noor as her mother Shireen, tells the story of a young, gay Iranian-American woman navigating her relationship with her family, particularly her mother, after getting pregnant from a one-night stand with a drag queen. Where it really starts to take on true depth however, is when an extended flashback sequence begins, shifting us back to 1960s Iran, where a younger Shireen takes control ("played by the brilliant Kamand [Shafieisabet] in her first movie, by the way, she was phenomenal," says Niousha), in order to tell her own story: married off at 13 and pregnant not long after — a common trauma amongst Iranian women who grew up during the Shah\\'s regime.' },

      { t: 'p', x: "When we hear the word 'trauma', we tend to associate that word with negativity. It's a type of pain well-known to most Iranians, no matter their economic or social status, nor their geographical location. Just as it's portrayed in The Persian Version, these traumas are not only experienced today but have been carried through generations, stemming back all the way to the Shah's regime and shaping the identities and behaviours of Iranians, especially women, who have always been disproportionately affected still to this day. In The Persian Version, however, the message appears to be that — perhaps — just maybe, learning about our own intergenerational trauma, rather than avoiding these conversations and even creating false stories to try and erase them, can help us better understand each other and ourselves." },

      { t: 'p', x: 'Niousha Noor herself is no stranger to the feeling of *ghorbat*, which in English could only be described as a sense of foreignness, or being trapped in a place that doesn\\'t feel like home despite the hardest efforts. Based out of Hollywood, she moved to the US from Iran when she was 11. Having grown up around the world of cinema due to her father\\'s work as a cinematographer in the Iranian film industry, she knew she had a calling to the arts, and finally decided to take the risk and jump into acting, after a stint in the corporate world, and having studied communications at university. She often found herself auditioning for roles that portrayed Iranians from a stereotypical American perspective, however, "and every time, it feels like it just chips away at your soul," she says.' },

      { t: 'p', x: 'The tide initially started to turn when, after a "dry spot", Niousha suddenly landed a role as Shahab Hosseini\\'s co-star on a film called *The Night*, an Iranian film shot in the United States which became the first such co-production between the two countries since the Islamic Revolution. "What I liked about that film, was that it was just a psychological thriller about a husband and wife who are trapped in a hotel. It didn\\'t have anything to do with national identity, national security and other things that we\\'re usually prone to audition for here," she says. "And it critically did well. I got a good team because of that movie. I got a good agent, I got a good manager, and that\\'s when I really started to see opportunities in a different way."' },

      { t: 'divider' },

      { t: 'qa', q: "It's quite amazing to have been able to be Shahab Hosseini's co-star — I mean, he's pretty much a superstar actor. What was that experience like?", who: 'NIOUSHA NOOR', x: "At first, of course, it's intimidating because he's such a good actor. He's a great actor and I've watched most of his films. But once you're in character, and you see how he works and the professionalism, it kind of just elevates your work, because you want to match. So that was an exciting part, and I felt like we had a good dynamic. I learned a lot from him. Overall it was a really cool experience. I think it was the first [American-made] film that got a theatrical licence to show in Iran as well [since 1979]. I made my cousins go out in Tehran and take photos of all the cinemas because my face and Shahab's face were on the marquees. Like Cinema Farhang — which was where I used to grow up. I used to go to that movie theatre all the time when I was a kid, so that was a cool full circle moment." },

      { t: 'h', x: 'Representation' },

      { t: 'qa', q: 'With this film also being the first co-production since the revolution between the US and Iran, I guess it was kind of like a bridge between the two countries in cinema for the first time. How important is this kind of representation to you?', who: 'NIOUSHA NOOR', x: "I mean, it goes without saying that film as a visual medium, it can create an emotional connection with audiences. I think it's a powerful tool in breaking stereotypes, shaping perceptions and influencing societal attitudes. Because of that, I've always been a big advocate of playing movies or characters where it prioritises the human experience, where the human is the focus, however flawed [they may be]. In that movie, it's just a husband and wife dynamic, and people could relate to that. Even The Persian Version — same thing — a mother-daughter relationship, strength of women, complex family dynamics, the traumas of the generations. I think these are the kind of stories we need, in order to turn a page on prejudice and on indifference. Stories that can extract empathy and you can really connect to. There's a lot of them, because we just have a lot more in common than we have differences. I try to take on stories or characters that show the multifaceted humans that we all are, like my role in Kaleidoscope on Netflix, which actually was a big hit in Iran as well. In that role I played a flawed FBI character, and my nationality was secondary and not important to the story." },

      { t: 'qa', who: 'NIOUSHA NOOR', x: "But of course I've auditioned for [those stereotypical or one-dimensional roles]. And every time you do, it just chips away at your soul. But it's changing — it was a lot worse years ago… here in America, you just feel this distance, and you feel like you're trying to climb out of this reductive generalisation, and show the human, and then it's just like… the writing… they almost want you to represent the ideology of like, 15 countries all of a sudden, and you're like, wait, what? So… it just feels very, not *khodemuni*… or not right." },

      { t: 'qa', who: 'NIOUSHA NOOR', x: 'I think, because of The Persian Version, and so many other films, the big executives and producers are now saying, "Okay, there is a hunger for authentic storytelling." It makes a huge impact on society.' },

      { t: 'h', x: 'Sundance' },

      { t: 'qa', q: 'When it comes to The Persian Version, that was a film that definitely had a very different angle on how Iranians are usually represented in Hollywood or American cinema. What was it like working on that film?', who: 'NIOUSHA NOOR', x: "You know, I've said this in past interviews, and I mean it. There was this collective excitement, and awareness of the magic that this film had, because of what you just said. We haven't had a lot of movies of this kind in a wide distribution. Unfortunately, it hit the [SAG-AFTRA] strike when it came out, but it was still released in over 700 theatres across the United States alone. That was unheard of. That was the kind of representation that we hadn't had. When we were making it, we all, the cast, the crew, we just knew we were making something special, even though you never know if that's going to translate on screen or if audiences are going to relate to it or not." },

      { t: 'qa', who: 'NIOUSHA NOOR', x: 'My first time that I saw the film actually was at Sundance, so that was a nerve-wracking experience. It was a packed theatre, like 600 people. There is a unique magic in seeing a room full of people from all walks of life, majority non-Iranian, united by the emotions evoked by this film and sharing laughs, shedding tears, dancing, being moved. And we got a standing ovation. Those are moments I will never forget in my career.' },

      { t: 'qa', who: 'NIOUSHA NOOR', x: 'I can\\'t tell you how many people came up to us after to say funny things, like, "Oh, we didn\\'t know Iranians were so hot!", because the brothers in the movie are also very good looking and so is Layla. Something as simple and shallow sounding as that, is actually still important. And so many mothers or daughters coming up to us and saying that the film makes them see and understand their mother or daughter in a different way. It was just so heartwarming to know that your portrayal or the story was able to cause these sorts of reflections in people. I couldn\\'t ask for anything better. It was a very beautiful journey to be on.' },

      { t: 'h', x: 'Asking her mother' },

      { t: 'qa', q: "Was there anything about playing Shireen's character that maybe resonated with you on a personal level?", who: 'NIOUSHA NOOR', x: "I am not a mother in that sense, but I got to ask my own mother a lot of questions that I never thought to ask before. **We forget that they're a whole individual** with a plethora of feelings and emotions and experiences as a woman, or even as a man, but in the case of my mother, moving here at a young age and having two kids, I just always saw her as my mother and didn't really consider her individual psyche and her emotions as a woman coming here to this new country. I asked Maryam Keshavarz's mother a lot of questions as well, because that's who ultimately I was portraying. That was very insightful. Myself too, I moved here to the United States at the age of 11, also at a young age like her. So navigating these cultural nuances, I could relate to trying to fit in. Also, the strength of her, the inner drive, the inner resilience, the strength that she portrays… I've seen it in a lot of mothers, immigrant mothers, and especially of course, Iranian mothers. So it was an honour to bring that to the big screen, because it's a fact and a truth that we all know." },

      { t: 'qa', q: "This film explores a lot of intergenerational trauma that our people just seem to be plagued with, diaspora or not. When it comes to this cycle that a lot of people watching the film would have experienced themselves, do you think these are cycles that can be broken?", who: 'NIOUSHA NOOR', x: "I do. I think the medium of film is a powerful tool in helping that happen, because it holds a mirror up to us. I think showing these sorts of personal stories, depicting it in a way that's not judging or vilifying the characters, but just trying to understand one another, this medium of storytelling is so important. Again, so many Iranians who came up to me, and all the messages on social media from other screenings, just understanding, just seeing so much of themselves on the screen and that reflection, and I think that's very important. I think it can help break the cycle. We just need more authentic stories." },

      { t: 'q', x: 'It holds a mirror up to us.', who: 'Niousha Noor' },

      { t: 'qa', q: "The film also touched on other issues as well, such as Layla's queerness and topics about mental health. Shireen wasn't very approving of her daughter. Do you think that amongst our people, there is a lot of stigma still attached to these things?", who: 'NIOUSHA NOOR', x: "I think so. It's definitely changing. I see a change, at least in my family, and because of how times have changed and because of social media and how we have exposure to so much more than before, it's allowed us to have a wider understanding of the world, everyone in it, and all our differences. Something like The Persian Version, someone looks at it and understands the daughter, or feels more empathy for the daughter and how isolated she feels, because of the lack of affection that she feels her mother has towards her. And looking at the mother, in the beginning of the film, you don't really like the mother. She's mean, she's cold. But you understand her by the end, or at least that's the goal. It's not about justifying these reservations or prejudices that you have, but just understanding it — then you can turn a page from that." },

      { t: 'qa', q: "Absolutely. Looking to the future now, what's next for you?", who: 'NIOUSHA NOOR', x: "I've written this script that's in the process of development right now, that I can't say much about… but I'm very excited about this. And if all goes well, by September is when we can start the pre-production for this film, titled *Blue Flower*." },
    ],
  },
"""
print("niousha:", a in s)
open(p, "w").write(s.replace(a, b, 1))
