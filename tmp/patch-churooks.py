# Churooks, as filed.
#
# Four speakers, and the piece arrives with its own section headings — so
# those are theirs, kept exactly. The interviewer's questions run in
# quotation marks in the original and as plain sentences elsewhere; both
# are questions, so both are set as questions.
#
# The narrative bridges between sections are the writer's and stay as
# paragraphs. Nothing cut.
#
# Ours: the title, the standfirst, two pull-quotes lifted from lines
# already in the piece.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'churooks',
    kind: 'feature',
    title: 'Rehearsal: Churooks',
    subject: 'Churooks',
    discipline: 'Music',
    standfirst:
      'Four musicians in Tehran making progressive funk rock for a scene '
      + 'that does not exist yet — so they are building it.',
    cover: 'tpm-churooks-cover',
    images: [],
    minutes: 10,
    body: [
      { t: 'lead', x: 'Amazing boys. I started my chat with them by asking about some of their recent on-repeat songs. In the middle of our conversation, Bardia said his was *Starship Syncopation* by Cory Wong. Spot on. That\\'s it. That\\'s exactly where I wanted to begin.' },

      { t: 'p', x: "The element that is very noticeable when listening to the Churooks' songs is the fact that how professional they sound. Especially, the rhythm elements. It has a funky vibe, and the fills and pauses are all spot on." },

      { t: 'divider' },

      { t: 'qa', q: 'You guys sound incredibly literate in music. Have you studied it academically?', who: 'KOUROSH — DRUMS', x: "I'm 23 now, and I haven't had much formal music education, but I've been playing drums since I was eight or nine. Since starting this project, I've paid a lot of attention to details — those subtle, tasteful rhythmic choices that have inspired me over the years. I try to weave them into Churooks' sound." },

      { t: 'qa', who: 'KOUROSH', x: "Ali and I usually handle the rhythm section. We bring our initial ideas to the band, but the process is fluid. It's like a puzzle — things evolve constantly until the final version of the song takes shape." },

      { t: 'qa', q: 'So does that mean you compose linearly, starting at the beginning and progressing forward?', who: 'KOUROSH', x: 'Most of the time, yes. But it depends. Sometimes we create phrases and develop them, and the overall vibe dictates where they fit best in the song.' },

      { t: 'qa', who: 'ALI — BASS', x: "My education has nothing to do with my role in the band — most of my family wasn't involved in music either. They mostly listened to Persian traditional music. I studied Graphic Arts at a fine arts school. But what shaped my musicianship was playing in a band while learning my instrument. There's no better way to grow as a musician than learning inside the context of a band." },

      { t: 'qa', who: 'ALI', x: "Another thing that strengthens our sound is how much time we spend together. I've known Arash since childhood, and Kourosh and I used to hang out constantly back in school. That level of familiarity makes a huge difference when we play together. It's why we sound so tight. Even the funky vibe in our music is a direct result of this connection." },

      { t: 'qa', who: 'KOUROSH', x: "Ali's right. That familiarity was the foundation of everything. He and I went to the same finance school, then we met Bardia and Arash, and that's when things started to take shape. But funnily enough, Arash and I had already played together before — when we were kids in an Orff class. We didn't even realise it until much later." },

      { t: 'qa', q: 'Bardia, what about you? How did your journey with music start?', who: 'BARDIA — VOCALS, GUITAR', x: "I started playing music when I was around 18 or 19. At university, I was studying chemistry, but over time, music became more serious for me. So, I switched to audio production to align my studies with my passion. The technical knowledge I've gained in university has been really helpful — I get to bring it into our projects and blend it with everything we do." },

      { t: 'qa', q: 'So how did Churooks officially form?', who: 'BARDIA', x: "Honestly, we all owe Arash for bringing us together. I already knew him, and he was trying to assemble a group for a project. He reached out to all of us individually, and that's how we first gathered as a band." },

      { t: 'qa', q: 'Alright, Arash, seems like you were the common thread here. How did that happen?', who: 'ARASH — VOCALS, GUITAR', x: 'I never had formal music training, but my father introduced me to music when I was a kid. He had this massive collection. Fleetwood Mac one day, something completely different the next. Every evening after work, he\\'d put on his headphones and watch his favourite performances. One day, he asked me to join him, and that was my first real introduction to music.' },

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

      { t: 'p', x: 'Given their tight arrangements and cohesive sound, I was curious about their creative process; whether each musician works strictly within their own section or if there\\'s cross-involvement in shaping elements like melody, rhythm, and structure.' },

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
"""
print("churooks:", a in s)
open(p, "w").write(s.replace(a, b, 1))
