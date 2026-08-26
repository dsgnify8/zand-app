# Shahrzad Shokouhivand, as filed.
#
# Opens plain — no statement, no drop capital. The first sentence is a
# list of what she has done, and that is strong enough without help. A
# third kind of opening, which is the point of having them.
#
# The source sets her quotes in bold italics inside asterisks; those are
# formatting marks from the document, not emphasis she asked for, so the
# quotes become quotes and the marks go.
#
# Ours: the title, the standfirst, three section breaks.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'shahrzad',
    kind: 'feature',
    title: "Lost but Not Forgotten: Reviving Iran's Flavors",
    subject: 'Shahrzad Shokouhivand',
    discipline: 'Pastry',
    standfirst:
      'The first Iranian to receive the Ordre du Mérite Agricole, on French '
      + 'technique, Tabrizi childhoods, and selling pastries one at a time.',
    cover: 'tpm-shahrzad-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'p', x: "I had the opportunity to speak with Shahrzad Shokouhivand, a graduate of Le Cordon Bleu pastry school, founder of L'Atelier de Shahrzad and Femme Chic Patisserie, the first Iranian to receive the esteemed L'Ordre du Mérite Agricole. As a visionary pastry chef and entrepreneur, she has been instrumental in reviving Iran's forgotten flavors and bringing Persian pastry to the global stage. In our conversation, she reflected on her journey, the challenges she has faced, and the inspiration behind her culinary creations." },

      { t: 'p', x: 'We began our conversation by exploring what led Shahrzad toward a career in the culinary world:' },

      { t: 'q', x: "I've always had a passion for preparing food and bringing joy to the people I love. From a young age, I always enjoyed preparing breakfast in bed for my parents and serving those I love. Over time, this love for creating meaningful dining experiences grew, eventually leading me to pursue a career in pastry-making.", who: 'Shahrzad Shokouhivand' },

      { t: 'h', x: 'French technique, Persian flavour' },

      { t: 'p', x: "Shahrzad is committed to using all-natural ingredients to revive the authentic flavors of Persian heritage in her creations. Building on the foundations of classic French pastry, she infuses traditional techniques with unique Persian flavors and recipes, putting her distinctive signature on each dessert. Her approach often involves preserving key elements of French pastries while introducing new textures, flavors, and techniques that celebrate Persian culinary traditions." },

      { t: 'p', x: "She reimagines delicacies from across Iran, transforming them into elegant, contemporary creations that are both visually stunning and innovative. Inspired by her family's deep culinary roots in Tabriz, many of her pastries reflect the flavors of her childhood and the dishes she grew up enjoying. Others draw from the diverse tastes she has encountered throughout Iran, resulting in a harmonious fusion of tradition and creativity." },

      { t: 'p', x: 'One of her most notable creations is *Baba Tabrizi*, a unique twist on the classic *Baba au Rhum* — a small yeast cake traditionally soaked in syrup made with hard liquor. Developed years before opening her pastry shop, this signature dessert beautifully reflects her fusion of French technique with Persian tradition.' },

      { t: 'q', x: "On the 20th anniversary of my father-in-law's passing, we held a family gathering and served dishes from the culinary heritage of Tabriz — foods my husband and I grew up eating. For the occasion, I prepared a revised version of the Persian-Azeri dessert Khagineh (also known as Geyganakh) — a traditional batter of flour, eggs, sugar, and milk or water, fried and later drizzled with syrup. It was an instant hit, and we named it Baba Tabrizi (Baba meaning 'father' in Persian) as a tribute to that day. Later, it became one of the first pastries introduced at the opening of Femme Chic Patisserie.", who: 'Shahrzad Shokouhivand' },

      { t: 'h', x: 'Selling one pastry at a time' },

      { t: 'p', x: "With the recent celebration of Femme Chic's 6th anniversary, we spoke with Shahrzad about the challenges of pioneering Persian-French fusion pastry in Iran. Beyond the long-standing difficulties of sourcing high-quality ingredients such as vanilla and flour, she also had to navigate a major cultural shift in how pastries were consumed." },

      { t: 'p', x: 'Femme Chic Patisserie was established when most pastries in Iran were purchased in bulk, as Persian sweets were traditionally sold by weight. Aside from a handful of French pastry shops catering to a niche audience, **the concept of individually sold, high-quality pastries was virtually unheard of**.' },

      { t: 'q', x: 'Introducing a system where people bought individual, artisanal French-inspired pastries — focusing on elegant presentation and high-quality ingredients — was not easy.', who: 'Shahrzad Shokouhivand' },

      { t: 'p', x: 'In the early years, she faced resistance, but she believes the culture has evolved over time. With the rise of the internet and the emergence of similar pastry shops, the idea of artisanal, individually crafted pastries has now firmly taken root in Iran.' },

      { t: 'h', x: 'The embassy next door' },

      { t: 'p', x: "Femme Chic Patisserie also played a key role in Shahrzad being honored with the prestigious *L'Ordre du Mérite Agricole*. Its location near the French Embassy in Tehran made it a favorite among French diplomats longing for a taste of home. Their frequent visits eventually drew the attention of the *Goût de France* committee members, who recognized Shahrzad's innovative work blending Persian and French culinary traditions. This fusion of cultures and her dedication to excellence ultimately earned her the esteemed award." },

      { t: 'p', x: "Shahrzad remains devoted to her craft, continually redefining food culture across Iran by participating in events like *Four Hands*, which highlights the collaboration between two chefs. Looking ahead, she hopes to see Iran's food industry evolve with more refined and professionalized grading standards." },

      { t: 'line', x: "Through her work, Shahrzad Shokouhivand is safeguarding the legacy of Iran's forgotten flavors, one exquisite dessert at a time." },

      { t: 'note', x: 'By Parisa Mohsen.' },
    ],
  },
"""
print("shahrzad:", a in s)
open(p, "w").write(s.replace(a, b, 1))
