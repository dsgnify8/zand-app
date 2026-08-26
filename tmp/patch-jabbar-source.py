# DJ Jabbar, as filed. Every turn.
#
# Sixty-odd exchanges between two friends who are also two DJs. Nothing
# is removed — Mahan's short reactions are as much the piece as the long
# answers, because what makes it readable is that it is a conversation
# rather than an interview.
#
# The typography does the work instead: his turns are set back and
# smaller, and a very short one sits tight against the answer it is
# reacting to rather than taking a full block.
#
# Ours: title, standfirst, one pull-quote, three section breaks.

p = "constants/tpm-content.ts"
s = open(p).read()

i = s.find("  {\n    key: 'jabbar',")
if i > 0:
    j = s.find("\n  {\n    key:", i + 10)
    if j < 0:
        j = s.find("\n];", i)
    s = s[:i] + s[j:].lstrip("\n")
    print("old jabbar removed")

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'jabbar',
    kind: 'portrait',
    title: "Breakbeats and basements: DJ Jabbar and the sound of Tehran's underground",
    subject: 'DJ Jabbar',
    discipline: 'Music',
    standfirst:
      'A B-boy from Mashhad who found his sound in a rented basement, a '
      + 'circus scrapheap, and the streets of Tehran.',
    cover: 'tpm-jabbar-cover',
    images: [],
    minutes: 12,
    body: [
      { t: 'lead', x: "In Tehran's underground music scene, where basements double as dance floors, a new sound is taking shape. *It doesn't borrow from Berlin's clubs or Detroit's after-hours, but grows from the city's own restrictions, where limits spark creativity.* This is where Milad Jabbar Imani, known as DJ Jabbar, found his beats." },

      { t: 'p', x: 'He began as a B-boy in Mashhad, then moved from the floor to the decks, creating beats dancers could battle to. When the pandemic hit in 2019, he turned fully to producing, mixing, and shaping a sound that moves between funk, break-beat, and techno. His work connects scenes and cultures, giving the underground space to breathe and grow. For Jabbar, music isn\\'t just escape, it\\'s a way back to the community that keeps the movement alive.' },

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
      { t: 'turn', who: 'JABBAR', x: 'We were banging out breakbeats and wild rhythms, and the energy was instant. When we took it to the streets, crowds would flood in, sometimes a thousand people, completely blown away. Later our crew started building instruments: cylinders that opened and closed with air pressure, PVC pipes tuned to different notes. But at the start it was pure percussion, raw beats and counterbeats. I had seen similar things in New York, but in Iran it just didn\\'t exist. Suddenly we were starting a movement. You would have toddlers stopping in amazement, or elderly religious men clapping along. Whether it was techno, breakbeat, whatever, the energy connected everyone.' },

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
      { t: 'turn', who: 'JABBAR', x: 'Underground or street? It depends on my mood, the period I\\'m in. I don\\'t think, "This is for the underground crowd." I do it for myself. Always.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'For the music itself.' },
      { t: 'turn', who: 'JABBAR', x: 'Exactly. For the flow inside me, whatever I need to express at that moment.' },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'And dance? Do you still love it as much as before?' },
      { t: 'turn', who: 'JABBAR', x: "The same love, but in a different way. I don't train like I used to. Now it's about reading the dance, experimenting with new states, following a feeling rather than practicing." },

      { t: 'turn', who: 'MAHAN', ask: true, x: 'Let\\'s say people could only know you as one thing: dancer, DJ, or producer. Which would you want?' },
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
"""
print("jabbar:", a in s)
open(p, "w").write(s.replace(a, b, 1))
