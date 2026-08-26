# Soheil Alavi, as filed.
#
# Sixteen numbered questions in the source. The numbers are a working
# convention from the document rather than something a reader needs, so
# the questions stay and the Q1–Q16 prefixes go — the question itself is
# the marker.
#
# Nothing else changed. Ours: the title, four section breaks, two pulled
# quotes.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'soheil',
    kind: 'feature',
    title: 'The podcast is the seed. The community is the tree.',
    subject: 'Soheil Alavi',
    discipline: 'Podcasting',
    standfirst:
      'Tabaghe 16 began on a sixteenth floor with no music, no editing, and '
      + 'no plan. Its founder on honesty, silence, and why he left his startup for it.',
    cover: 'tpm-soheil-cover',
    images: [],
    minutes: 13,
    body: [
      { t: 'lead', x: 'In a world where stories are often polished and ready-made, *Tabaghe 16* by Soheil Alavi has carved out a different space; somewhere between art and everyday life, between a friendly conversation and a work of art. This podcast doesn\\'t rely on flashy music or heavy editing, but instead invites listeners in through unfiltered honesty and meaningful silences.' },

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

      { t: 'qa', x: 'At the same time, there was also a deeper, cultural reason. In our society, feelings like doubt, fear of failure, or not being "enough" often stay hidden. The longer they remain unspoken, the more people start to believe they\\'re wrong to even have them. I wanted to break that silence and show that these struggles are universal.' },

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
"""
print("soheil:", a in s)
open(p, "w").write(s.replace(a, b, 1))
