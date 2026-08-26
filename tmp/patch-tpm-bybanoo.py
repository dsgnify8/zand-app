# BY BANOO. Two sisters, so the answers carry a name.
#
# Third shape in three pieces: Mahini an essay, Phi a single-subject Q&A,
# this one an interview where two people answer in turn and sometimes
# answer each other. The speaker labels are the structure.
#
# Their answers are tightened where the transcript loops back on itself
# and left alone where the phrasing is theirs. "Dare to be brave" is
# their parents' line and stays exactly as filed.

p = "constants/tpm-content.ts"
s = open(p).read()

a = "export const TPM_POSTS: TpmPost[] = ["
b = """export const TPM_POSTS: TpmPost[] = [
  {
    key: 'bybanoo',
    kind: 'feature',
    title: 'Bags for the rooms where decisions get made',
    subject: 'Persheng & Perdica Babaheidari',
    discipline: 'Fashion',
    standfirst:
      'Two Swedish-Iranian sisters left a consultancy and a medical degree '
      + 'to build the work bag neither of them could find.',
    cover: 'tpm-bybanoo-cover',
    images: [],
    minutes: 6,
    body: [
      { t: 'lead', x: 'In 2017 Persheng Babaheidari started work as a management consultant and could not find a laptop bag she wanted to be seen carrying. *So she and her sister made one.*' },

      { t: 'p', x: 'Persheng was a newly graduated engineer; Perdica was studying medicine. Together they founded BY BANOO, named from the Persian for lady, or queen, or woman. It sells in forty countries.' },

      { t: 'divider' },

      { t: 'qa', q: 'What led to the founding of BY BANOO?', who: 'PERSHENG', x: "It was when I began working as a management consultant that I discovered how hard it was to find a stylish and practical laptop bag. I've always been interested in fashion, and there was nothing stylish that would fit a laptop. I asked my friends and colleagues where they bought theirs and everyone said the same thing — it was very difficult. When we looked at what men had, they had a classic briefcase. None of the women carried them, because they obviously weren't stylish or functional enough." },

      { t: 'qa', who: 'PERSHENG', x: "After two years of working I asked my sister whether we should make a company that provides working bags for women, and Perdica thought it was a very good idea. But starting a company takes a long time, so I kept consulting and she kept studying to become a doctor, until we reached a point where we had to focus on it full-time. I quit a little over a year ago. Perdica finished in January and has been full-time since." },

      { t: 'qa', q: 'How was it, setting aside your careers for this?', who: 'PERDICA', x: "One thing our parents instilled in us early is to **dare to be brave**. We were told from a young age that you can do exactly what you want, and that careers can be combined if you want them to be." },

      { t: 'qa', who: 'PERDICA', x: "It is also about the opportunity we have in Sweden, and it feels stupid not to take it. If there's any country that has your back on entrepreneurship, career and education, it's this one. We haven't really reflected on being brave. We hear it often, but it isn't something either of us feels. We have this opportunity, so why would we not take it?" },

      { t: 'qa', who: 'PERSHENG', x: "The reason we haven't felt brave is that we have other scenarios to compare it with. When we see our relatives in Iran, who don't have the same opportunities, we realise how much we can do here — and we almost do it because we can. Education is free. We grew up with the confidence that everything is possible, because our parents had a completely different perspective, growing up during a war." },

      { t: 'q', x: 'We want to see these bags in important rooms where important decisions are made.', who: 'Persheng Babaheidari' },

      { t: 'qa', who: 'PERSHENG', x: "There are very few women in boardrooms and in leadership positions, and there's a reason a product like this didn't exist before — that kind of job is dominated by men. My previous job was male-dominated. So it's a social question for us as much as a commercial one. Women should dare to invest in their careers, the way we've dared to invest in this company." },

      { t: 'h', x: 'The name' },

      { t: 'qa', q: 'Why BY BANOO?', who: 'PERDICA', x: 'It was our father who helped us name it. *Banoo* is a Persian word meaning lady, queen or woman. At first we just wanted to be called Banoo, but the domain was taken. We liked the word too much to let it go, so we arrived at BY BANOO — by the queen, by the lady. It has a personal touch, it shows our heritage, and it says it comes from the woman. It represents both who we are and what we do.' },

      { t: 'h', x: 'What makes a work bag' },

      { t: 'qa', q: 'What matters in one, and what sets yours apart?', who: 'PERSHENG', x: "A good work bag is both functional and stylish. I would never buy one that's ugly but functional, or the reverse, because I need both — so it's something we don't compromise on. It has to hold a lot of weight without deforming, and it needs a laptop compartment, because the jobs we're designing for need a laptop." },

      { t: 'qa', who: 'PERSHENG', x: "We work with Italian leather because it lasts and it looks right. It's also a by-product — no animal dies because you used leather; it's waste you can either throw away or use. Everything is manufactured in Europe so the people making it are working under EU legislation. We were in Estonia, and recently moved production to Portugal. The materials are all bought in Italy to keep transport distances short. Much of fashion is made in Asia and shipped to Sweden, and we try to reduce that — while making a bag good enough that you don't need to buy several." },

      { t: 'qa', who: 'PERSHENG', x: "When we started, this product didn't exist. As far as I know we were among the first in the Nordics. What was comparable was a men's briefcase, or a large backpack, or something that didn't do the job at all — and we wanted to make a briefcase first, because there wasn't one for women. More companies have appeared since, now that more people have felt the problem. Design and function are the core, but we're also authentic behind the brand. Two sisters, and that's what we show." },

      { t: 'qa', who: 'PERDICA', x: 'Authenticity has mattered because we did dare to invest in our own careers. We are both business women, which makes us our own customers — and that makes it much easier to identify what a bag actually needs.' },

      { t: 'h', x: 'Where it goes' },

      { t: 'qa', q: 'What have you reached, and what comes next?', who: 'PERDICA', x: "We got to the global market quite fast, which we didn't expect at the beginning. Today we sell to forty countries." },

      { t: 'qa', who: 'PERSHENG', x: "The thousands of customers, and the pop-up in Stockholm last year. We've hit a need that isn't just ours — that's a large part of why the marketing has worked, because we're describing a problem many women recognise. Until now we've sold only through our own site; we're expanding into retailers and have signed our first, which we'll announce shortly." },

      { t: 'qa', who: 'PERSHENG', x: "We want to be a big global brand focused on business women, because there hasn't been a fashion brand with the businesswoman at the centre. Fashion has largely been about looking good — which we agree with — but there should be a higher purpose alongside it. Women are not just pretty. They're smart and driven, and everyone can go as far as they want, as long as they believe it and have people around them who believe it too." },

      { t: 'qa', who: 'PERDICA', x: "Long term, we want to be the go-to brand for women's work bags. The first thing you think of. If you see a BY BANOO bag in town, you should immediately think: businesswoman." },

      { t: 'qa', who: 'PERSHENG', x: "We want women to feel it when they carry our products. That boost — I will ace this interview, I will nail this pitch, whatever it is. We want women to feel like they can do whatever they want." },
    ],
  },
"""
print("bybanoo:", a in s)
open(p, "w").write(s.replace(a, b, 1))
