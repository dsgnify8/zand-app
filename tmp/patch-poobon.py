# Poobon, as filed. Fifth in the feed.
#
# The rhythm goes big, pair, band, pair — so positions one and five get a
# full-width card. Isam has one. This takes five.
#
# Hossein's questions are the best-written in the set: long, specific, and
# argued rather than asked. They stay in full, and the interviewer is
# named, because a question that makes a case deserves attribution.
#
# Fixed: em-dash triples from the document conversion. Nothing else.
#
# Ours: title, standfirst, four section breaks, two pulled quotes.

p = "constants/tpm-content.ts"
s = open(p).read()

PIECE = """  {
    key: 'poobon',
    kind: 'feature',
    title: 'The quiet periods are when the best ideas are born',
    subject: 'Poobon',
    discipline: 'Music',
    standfirst:
      'A decade at the centre of Iranian popular music, and still refusing '
      + 'to repeat himself. On drum & bass, Hichkas, Tory Lanez, and silence.',
    cover: 'tpm-poobon-cover',
    images: [],
    minutes: 15,
    body: [
      { t: 'lead', x: 'When we step into the vast and unpredictable world of music and take a closer look at the lives of musicians, we begin to understand the relentless work, risk, and persistence behind every song that finds its way to our ears. *It soon becomes clear that lasting success is never the product of chance.*' },

      { t: 'p', x: "To remain relevant for years, to win the hearts of a wide audience, and to gain the respect of serious critics — this is a rare combination, and a true measure of artistry. For many listeners, one of the great joys of music is discovering voices that signal something fresh on the horizon — artists who might shape the future of Iran's ever-shifting musical landscape. And yet, the past two decades have shown us just how fleeting fame can be: countless newcomers appear with a hit single, only to fade away as quickly as they arrived. What separates a lasting artist from the rest is not luck, but vision, creativity, and the courage to experiment." },

      { t: 'p', x: "Poobon is a striking example of this. For nearly a decade, he has not only stayed at the center of Iran's popular music but has also defined its energy and ambition. Whether one loves or resists his work, it is difficult to deny his mastery and his drive to push boundaries. In a scene shaped by constant change, his presence feels like a reminder that Iranian music's evolution depends on those who choose innovation over repetition, and boldness over comfort." },

      { t: 'p', x: 'Listeners today are more open than ever to new sounds, even those that may initially feel unfamiliar. This openness is not accidental — it is the result of musicians like Poobon, who have taken the harder road of experimentation, often facing waves of criticism for refusing to play it safe. His path has never been about fitting into ready-made categories. He was never quite a rapper, yet his role in Persian rap is undeniable, marked by collaborations with some of its most significant voices. In fact, many listeners admit to waiting through an entire track just for the moment Poobon\\'s voice appears.' },

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

      { t: 'qa', q: "You're one of the few musicians who actively follow the current state of Iranian music and pay close attention to emerging rappers inside the country. What are the main factors you consider when choosing Iranian-based musicians to work with?", who: 'HOSSEIN', x: 'I mostly collaborate with artists who create a movement of their own. This has nothing to do with my personal taste, or even with whether I think their work is "good" or "bad." One of my reasons for collaborating is to challenge myself by stepping into different currents of music, and to test my ability to build working relationships and reach mutual understanding with other artists in a variety of projects. That way, we can complement each other\\'s strengths and weaknesses and ultimately produce something valuable.' },

      { t: 'qa', x: "Another reason is that I genuinely like bringing together listeners from different scenes, and I feel that this has started happening in Iranian music in recent years. For example, I collaborated with Safir, one of the old-school underground rappers in Iran, and I think moments like that help break down listeners' barriers. In other words, by presenting such projects, we can broaden the listening tastes of society as a whole. So, the point shouldn't be that underground musicians must only work with one another. Ultimately, these collaborations help merge different communities — and that has been the central aim of my recent work." },

      { t: 'h', x: 'A debt to hip-hop' },

      { t: 'qa', q: "You can never really be categorized as a rapper. So why have you always tried to maintain your connection with Iran's hip-hop community?", who: 'HOSSEIN', x: "That's absolutely right — I'm no longer a rapper. These days my style leans more toward electronic pop. But I myself used to rap, and my first steps were in rap and beat-making. I never managed to release those early tracks because distributing music back then was far more difficult, and since we were very young, we were just doing it for fun. There was no clear goal, no real motivation behind it, and certainly no vision for the future. Everything was defined in the moment. Hip-hop culture had only just arrived in Iran and it was incredibly hot." },

      { t: 'qa', x: "Even though my music today isn't hip-hop, I've always considered myself indebted to that movement and a part of Iran's hip-hop family. In my view, hip-hop in Iran was nothing short of a revolution — Persian hip-hop was the starting point for independent music as we know it. So, all of us artists who found our paths afterward owe a debt to that wave. That's why Iranian hip-hop has always been something deeply sweet and valuable to me." },

      { t: 'qa', q: 'What do you think are the reasons behind the current success of Persian rap compared to other music scenes in Iran?', who: 'HOSSEIN', x: "Persian rap has always been powerful because of its authenticity — because it came directly from the people. In reality, it belongs first and foremost to the people of Iran. This genre isn't just for a handful of artists or rappers; it's for the people. Everyone feels a personal sense of ownership over it, and that's what makes it so strong." },

      { t: 'q', x: 'It belongs first and foremost to the people of Iran.', who: 'Poobon' },

      { t: 'h', x: 'The gap' },

      { t: 'qa', q: "I believe the Iranian music market, within its own means and limitations, has reached a fairly respectable level. Still, there's a significant gap compared to the world's major music markets. What short- and long-term strategies should be adopted to help bridge it?", who: 'HOSSEIN', x: 'For Iranian music to reach its full potential, collaboration is essential between two groups: artists and audiences on one side, and the government on the other. Without unity between these two, the goal will never be achieved. Right now, both artists and audiences are already giving their maximum. Countless concerts are being held abroad, and listeners inside Iran mostly engage with music through streaming platforms. Artists are investing in improving the quality of their work — for example, international collaborations, which are one way to carry our sound to audiences in other countries. I, along with artists like Arta and Koorosh, have pursued this path many times.' },

      { t: 'qa', x: "So, what you see today is essentially the very limit of what Iranian artists and listeners can achieve independently. But it's still not enough. Support and promotion from the government matter far more than any other factor. When artists are denied the possibility of appearing on television or performing in cities and stadiums in their own country, it inevitably creates a huge barrier in their path. Meanwhile, in many countries, music is regarded as something highly significant. When artists there reach a certain level, it's clear that their success hasn't come solely from independent activity — it's the result of labels, investment, and governmental support smoothing the way." },

      { t: 'qa', x: 'In this landscape, when you have global markets investing billions of dollars, how could a handful of independent Iranian artists possibly compete? It\\'s practically impossible, and the reason is obvious. In fact, the current standing of Iranian music — achieved under such independent and restrictive conditions — is already remarkable and deserves genuine admiration.' },

      { t: 'qa', q: "A major part of a musician's identity is often measured by their albums. It's been nearly five years since your last one. Why is that?", who: 'HOSSEIN', x: "At the moment, my focus is mainly on singles. That said, I've also been working on an album in parallel for quite a while. Right now, I'm in a phase where I want to explore a wider range of experiences — on one hand, I'm still learning, and on the other, I'm also sharing what I've learned with others. Because of this variety of activities, it's difficult for me to stop everything and dedicate myself fully to just one project. So, the album is gradually taking shape alongside my other work. As I mentioned, I'm currently producing singles and performing concerts, but I can promise you this: by next year, you'll definitely hear a new album from me." },

      { t: 'h', x: 'Variety over formula' },

      { t: 'qa', q: "What's the biggest mistake you've made in your professional career? And on the flip side, what's the boldest decision you've made that you now admire yourself for?", who: 'HOSSEIN', x: 'Honestly, I don\\'t see any mistakes in my career. And I don\\'t say that out of pride — it\\'s just that nothing comes to mind where I could say, *"If I hadn\\'t done that, everything would be different now."* But the best and boldest decision I\\'ve made so far has been to always try different paths and never be afraid of new experiences. I\\'ve never thought about whether a choice would bring more streams or harm my career. I\\'ve simply done whatever I loved in the moment, as long as my mind affirmed that it felt right musically.' },

      { t: 'qa', x: 'This approach has brought me a lot of positive feedback and has played a key role in the place I\\'ve reached in Iranian music today. Many artists, once they become famous, stick to repeating the same "successful" formula without taking any meaningful steps forward. I\\'ve always tried to do the opposite — to embrace variety. One day I might make a drum & bass track, the next I might experiment with reggaeton, or even sing in a pop style. On this path, anything can happen, and it all depends on how I feel in that moment.' },

      { t: 'qa', q: "In the past, the vibe you delivered was equally shaped by the music and the lyrics. Nowadays your focus seems to have shifted toward making your musical ideas richer, more mature. What made you take this turn, especially since your previous approach was already very successful?", who: 'HOSSEIN', x: "Right now, I'm moving along a path that I actually started a long time ago. It's just that many people may only notice a fraction of what I've done along the way, and naturally, some parts of that path might not be embraced by the majority. I genuinely love all my fans, I deeply respect them, and I've always said I owe everything to them. But at the same time, what matters most to me is my own journey. So, neither public opinion nor the urge to satisfy others can shape my direction." },

      { t: 'qa', x: "The fact that my work now feels more advanced or complex is really just a reflection of how my personality itself has grown and become more layered compared to before. I can't hold myself back just because a big part of my audience connected more with a certain era of my career. My technical skills have grown much wider, and naturally, I now find myself in a place — both within the Iranian music community and globally — where I have to showcase that. I need to create music that reflects the extent of what I've learned, so that if one day I sit in a studio with a major international artist, I'll have something truly valuable to bring to the table." },

      { t: 'qa', x: "That said, I'll always be grateful to anyone who has been with me at any point in this journey. My older music is still out there, and whoever feels more connected to that particular era can always go back and listen to it. Tastes and listening preferences are naturally different, so the only path that makes sense for me is to stay true to my own taste and my current state of mind." },

      { t: 'qa', q: 'What is your usual method for coming up with new ideas in songwriting and composing?', who: 'HOSSEIN', x: 'In my opinion, the best ideas always come during practice. For instance, if you want to compose a good piano piece, the first step is simply to practice piano. After spending some time at it, suddenly — almost as if from some vast database or another world — great ideas just appear in your mind. It feels exactly like a miracle. That\\'s why, whenever I want to create something truly good and high-quality, I start with practice and improvisation.' },

      { t: 'qa', q: 'Over the past decade your name has consistently stood out as one of the leading figures in contemporary Iranian music. What challenges have you faced in keeping that position, and what advice would you give to younger musicians?', who: 'HOSSEIN', x: "In my view, the difference between successful artists and those who appear for a while and then disappear lies in consistency and discipline. And this isn't only true in music — it applies to any field. Alongside consistency and discipline, you also need a visual presence; you have to continually put yourself in front of people's eyes. If you do that, you'll never lose your place. Just look at many of our artists who are now in their sixties, seventies, or even eighties but are still active. They keep releasing music every year, performing concerts, and maintaining that visible presence." },

      { t: 'qa', x: "So, my advice to younger artists would be: don't get overly caught up in views, fame, or money. These things will ultimately distract you from your true path and your fundamental mission as an artist. Your focus should be solely on improving the quality of your work. Once you do that, you'll see that fame, popularity, money, and opportunities will all line up before you. The most important factor in music is producing a quality product. Just like a chef is judged by the taste of their food, a musician is judged by the quality of their music." },

      { t: 'h', x: 'Hichkas, and Tory Lanez' },

      { t: 'qa', q: "Given that your *RUNAWAY* music video was so well-received and is the most-viewed video on your channel, why don't you usually release videos alongside your tracks?", who: 'HOSSEIN', x: "I've always wanted the music videos I make to go beyond being just regular clips — to truly add depth to the music. For me, a video shouldn't be just a superficial promotional product; it should be an artwork in itself. That's why, unless the right idea and the ideal conditions come together, I prefer to release fewer music videos, but ones with higher quality and greater lasting impact. That said, I'm currently working on several really big and exciting music video projects, and I hope I'll be able to bring them to completion soon." },

      { t: 'qa', q: 'Even when you release pop tracks, listeners can clearly distinguish your work from mainstream pop in Iran or Los Angeles. If you sing over a drum-and-bass track, there is still an unmistakable Iranian character in it. How have you achieved this ability to personalize every genre you work in?', who: 'HOSSEIN', x: 'I think this balance in my music comes from both experience and listening to a wide range of different genres. Like many others, I grew up with Iranian music, and over time, it became ingrained in me almost unconsciously. At the same time, I discovered Western music at a very young age because my older brother used to listen to some incredible artists. I remember our home was always filled with sounds from the Eagles, Michael Jackson, Linkin Park, Massive Attack, and so on. So, very early on, I was exposed to a variety of styles from different parts of the world. As a result, this "formula" isn\\'t something I deliberately crafted — like deciding to mix Iranian music with another style. Instead, it\\'s a natural and internalized blend, and that\\'s why, whatever genre I work in now, this tone and character just surface on their own.' },

      { t: 'qa', q: 'What different kinds of challenges did working with Hichkas and Tory Lanez present?', who: 'HOSSEIN', x: 'Both collaborations were incredibly exciting and challenging in their own ways. The challenge of working with Hichkas was more emotional and cultural. I had been a huge fan of his since childhood, and in a way, it has always been the dream of the entire Iranian music market to collaborate with him. For me, this collaboration felt like a checkpoint in my musical journey.' },

      { t: 'qa', x: 'Working with Tory Lanez was fascinating on a different level. I had always wanted to sit in a studio with an artist of that caliber and just create music together — not necessarily with the goal of releasing it, but for the technical challenge of seeing how he works firsthand. I wanted to observe how he records vocals, how he writes and delivers his lyrics. Experiencing that process up close and comparing it with what we do was very eye-opening. I had always wondered if they were doing something otherworldly. But when I actually saw it, I realized they were essentially doing the same things we do. Of course, Tory Lanez is an outstanding artist, but in terms of process, there wasn\\'t any major difference between us.' },

      { t: 'divider' },

      { t: 'qa', q: 'Any final words?', who: 'HOSSEIN', x: "I think something that isn't talked about enough is the impact of silence and stepping away from the public eye on an artist's creativity. What I mean is that sometimes these quieter periods, when an artist seems to disappear from the spotlight, are exactly when the best ideas are born. From the outside, it might look like a lack of releases equals inactivity, but behind the scenes, I'm constantly creating and experimenting." },

      { t: 'qa', x: "Every day I'm writing, exploring, and developing new ideas to eventually share with my audience so we can enjoy them together. For me, this is extremely important. From 6 a.m. when I wake up until midnight when I go to sleep, I'm working nonstop on music. My thoughts, my friends, my schedule — everything revolves around it. Every chance I get, I'm learning. One interesting experience during this period was teaching around 70 people, both online and in person here in Toronto. That turned out to be a really valuable journey, because teaching has made me much stronger as an artist too. It keeps me in a state of constant learning throughout the day." },
    ],
  },
"""

# Fifth position: after the fourth piece's closing brace. Anchored on the
# key that currently sits fifth, so nothing is counted or split.
import re
keys = re.findall(r"\n  \{\n    key: '([a-z0-9]+)',", s)
print("current order:", keys[:6])
if len(keys) >= 5:
    anchor = "\n  {\n    key: '%s'," % keys[4]
    i = s.find(anchor)
    s = s[:i + 1] + PIECE + s[i + 1:]
    print("inserted before:", keys[4])
else:
    print("   fewer than five pieces")
open(p, "w").write(s)
