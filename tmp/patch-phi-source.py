# Ali Phi, as filed.
#
# Their questions in full, their answers verbatim. Fixed: "simillar", one
# question whose transcription broke ("the experiences you think of your
# parents" — cut, since nobody can know what was meant), and a doubled
# space or two.
#
# Ours: the title, the standfirst, the pull-quote, and where the section
# breaks fall.

p = "constants/tpm-content.ts"
s = open(p).read()

i = s.find("  {\n    key: 'phi',")
if i > 0:
    j = s.find("\n  {\n    key:", i + 10)
    if j < 0:
        j = s.find("\n];", i)
    s = s[:i] + s[j:].lstrip("\n")
    print("old phi removed")

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'phi',
    kind: 'feature',
    title: 'Machines and false mirrors',
    subject: 'Ali Phi',
    discipline: 'Transmedia art',
    standfirst:
      'The Iranian-Canadian transmedia artist on digital waste, Achaemenid '
      + 'theory, and building spaces that hand people back to themselves.',
    cover: 'tpm-phi-cover',
    images: [],
    minutes: 7,
    body: [
      { t: 'lead', x: 'In a rapidly evolving world where technology and tradition often stand at odds, *Ali Phi crafts a space where the two not only coexist but converse.*' },

      { t: 'p', x: 'As a pioneering Iranian Canadian transmedia artist, founder of Nullsight, and Artistic Director of TADEX (Tehran Annual Digital Arts Exhibition), Ali Phi has made a name for himself across global stages with immersive audiovisual performances that draw from Persian mysticism, generative design, and contemporary code-based art. Ali Phi\\'s work spans international stages, where he blends computer programming and generative design to create complex visual experiences. Drawing inspiration from tradition, architecture, and the visual languages of ancient Persia and the Middle East, he builds immersive, forward-looking worlds rooted in cultural memory.' },

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

      { t: 'qa', x: 'The term "transmedia artist" is probably the most accurate way to describe my practice. I have experience in creating new spaces, working with architecture, physical modelling, and digital fabrication. Each project is different. Recently, I started using robotic tools to create artworks. The process is digital, but the final piece is mechanical and physical. There are many mutual points between contemporary artists and new media artists today. The types of projects I do are so diverse that I\\'m constantly learning. I don\\'t believe in barriers or limitations when it comes to exploring new areas. I try to challenge myself by accepting unfamiliar projects and stepping into new fields. For a while, I moved away from stage design, but recently I\\'ve returned to it, combining technology with light, sound, and visuals to create immersive and collective experiences for audiences.' },

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
"""
print("phi:", a in s)
open(p, "w").write(s.replace(a, b, 1))
