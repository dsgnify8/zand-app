# Owdez and Mubie, as filed.
#
# A review rather than a profile, which is a fifth shape. Their headings
# come as a bold label and a title on one line — "Resonance Review: Adamaye
# Bad" — and that pattern is kept.
#
# The lyrics they quote are set as quotes without attribution, since the
# writer is quoting the song rather than the artist speaking. Line breaks
# inside the lyric are preserved.
#
# Fixed: the document had hard line wrapping mid-sentence, which is a
# layout artefact of the file rather than the writing. Rejoined.
#
# Ours: title, standfirst, one pulled line.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'owdezmubie',
    kind: 'feature',
    title: 'The Artistry of Owdez and Mubie: A Musical Alchemy',
    subject: 'Owdez & Mubie',
    discipline: 'Music',
    standfirst:
      'Kamran and Mobina make music where the vocal is treated as an '
      + 'instrument and the lyric is what turns it into something else.',
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
"""
print("owdez:", a in s)
open(p, "w").write(s.replace(a, b, 1))
