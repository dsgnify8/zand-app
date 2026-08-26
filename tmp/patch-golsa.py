# Golsa, as filed.
#
# The piece has a stranger in it. Ramin walks into the interview and never
# leaves, and the writer builds the whole thing around him — so the
# opening section is his, and the notes where he reappears stay notes,
# which is how an aside behaves on a page.
#
# Their section headings kept: The Jazz Journey, Studio or Stage?, Covers,
# Inspiration, The Glamorous Golsa.
#
# The source has a broken em dash in one sentence ("the Golsa in my head a
# version of me") which is a dropped dash rather than a choice. Restored.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'golsa',
    kind: 'feature',
    title: 'Rehearsal: Golsa and the Music of the Streets',
    subject: 'Golsa',
    discipline: 'Music',
    standfirst:
      'An interview conducted on a cold uphill street in Tehran, joined '
      + 'midway by a lawyer named Ramin who was not invited and did not leave.',
    cover: 'tpm-golsa-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'lead', x: 'The interview with Golsa started in a way that was as unique as the artist herself. I could hear the unmistakable sounds of bustling Iranian high streets in the background as we finally connected. *It\\'s a cold day, she\\'s probably walking an uphill pathway as she keeps breathing between every few words or so.*' },

      { t: 'p', x: 'And then, just as we were settling in, life decided to hand us an uninvited guest. It started with a pause. Golsa, mid-sentence, making accidental eye contact with a passing stranger. Most people would simply move on. Ramin, however, saw this as an open invitation. Within moments, he had seamlessly inserted himself into our interview. A lawyer, as it turned out, with absolutely no hesitation about joining a conversation that had nothing to do with him. He started small; just a comment here, a question there. But before I knew it, he was fully involved, steering the chat in directions I definitely hadn\\'t planned for.' },

      { t: 'p', x: 'And, of course, his timing was impeccable. He made his grand entrance right in the middle of Golsa\\'s heartfelt confession about love, ensuring that whatever moment of emotional depth we were about to experience was immediately shared with a complete stranger.' },

      { t: 'h', x: 'The Jazz Journey' },

      { t: 'p', x: 'Golsa\\'s journey into music was something I\\'d long been curious about, particularly her relationship with jazz. She shared that her collaborations with Sardar Sarmast were transformative.' },

      { t: 'q', x: "Working with Sardar started to affect me and my musicality. He's the kind of person that changes your vision for music, and also as a friend, he changes many things in your life.", who: 'Golsa' },

      { t: 'note', x: 'She paused here to warn Ramin — who was, apparently, sliding on ice — to watch his footing.' },

      { t: 'p', x: 'Their weekly sessions were the cornerstone of her evolution. "We\\'d work on a few songs each week. Over time, these turned into long sets we took to live performances."' },

      { t: 'h', x: 'Studio or Stage?' },

      { t: 'p', x: "When asked whether she saw herself as more of a studio or live artist, Golsa's response revealed her adaptability." },

      { t: 'q', x: "I adore both opportunities. Studio settings can be restrictive, and my perfectionism sometimes gets in the way. But I've learned that imperfections often become part of the identity of a song. With live performances, the energy exchange with the audience is so unpredictable. It can lift me to the clouds or leave me empty inside, but either way, I express everything.", who: 'Golsa' },

      { t: 'p', x: 'One thing she treasures most on stage is when the crowd sings along with her. "Seeing people sing the lyrics with me. It\\'s the best feeling I can get on stage."' },

      { t: 'h', x: 'Covers: Saving Forgotten Songs' },

      { t: 'p', x: "Golsa's approach to covering old songs has made her a viral sensation. Her reimaginings breathe life into forgotten pieces, connecting younger audiences to Iran's rich musical heritage." },

      { t: 'q', x: "It's like saving a song from being forgotten. When I delve into these songs, they become very dear to me. Tweaking the arrangements or performances is like giving them new life so people can resonate with them again.", who: 'Golsa' },

      { t: 'h', x: 'Inspiration: Streets and Stories of Tehran' },

      { t: 'p', x: 'Much of Golsa\\'s work draws inspiration from Tehran, a city she describes with love and complexity. "For me, it\\'s not about East or West. I\\'ve always been curious about the Koocheh Bazari vibe; the folksy, street-style songs that tell stories of working-class life. **Every street and corner in Tehran has a story to tell.**"' },

      { t: 'p', x: "When I asked her if Tehran was a recurring character in her music, she didn't hesitate." },

      { t: 'q', x: "Every song I write is for Tehran. It's a love-hate relationship. The city can be tough, but the moments you overcome challenges with your loved ones make it the loveliest. I've always loved this city, even in its darkest alleys.", who: 'Golsa' },

      { t: 'note', x: 'At one point, Golsa and Ramin — yes, still there — broke into a duet, humming an Iranian vocal piece. It was both surreal and heartwarming, perfectly encapsulating the spontaneity of the interview.' },

      { t: 'h', x: 'The Glamorous Golsa' },

      { t: 'p', x: 'Golsa\\'s on-stage persona is bold and dazzling, with glittering makeup and eye-catching costumes. When asked about this aesthetic, she shared, "On stage, I can be whoever I want. For that set or that night, I reflect the Golsa in my head — a version of me that doesn\\'t need to censor her words or worry about how she dresses."' },

      { t: 'p', x: "As the conversation wound down, I was struck by how seamlessly Golsa bridges Iran's musical past with its present. Her ability to revive forgotten songs while carving out her own identity is a testament to her artistry. With her love for storytelling, connection, and performance, Golsa remains a force to watch." },

      { t: 'line', x: 'And as for Ramin? Well, he might just have earned a cameo in this article and the unforgettable story of this interview.' },
    ],
  },
"""
print("golsa:", a in s)
open(p, "w").write(s.replace(a, b, 1))
