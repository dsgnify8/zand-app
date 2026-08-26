# BY BANOO, as filed.
#
# Their questions in full, their answers verbatim. Nothing cut. The only
# fixes are a doubled space and a hyphen that should have been a dash.
#
# Ours: the title, the standfirst, the pull-quote, and where the two
# section breaks fall.

p = "constants/tpm-content.ts"
s = open(p).read()

i = s.find("  {\n    key: 'bybanoo',")
if i > 0:
    j = s.find("\n  {\n    key:", i + 10)
    if j < 0:
        j = s.find("\n];", i)
    s = s[:i] + s[j:].lstrip("\n")
    print("old bybanoo removed")

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
    minutes: 7,
    body: [
      { t: 'lead', x: 'In 2017, Persheng Babaheidari, a newly graduated engineer, entered the workplace as a management consultant. However, she quickly realized something was missing — *a chic and practical laptop bag designed specifically for women like herself.*' },

      { t: 'p', x: 'Frustrated by the lack of options, Persheng teamed up with her sister Perdica Babaheidari, a medical student, to address this gap in the market. Together, the two Swedish-Iranian sisters founded BY BANOO, a company dedicated to providing stylish and functional working bags made to fit the needs of modern professional women.' },

      { t: 'p', x: 'I had the opportunity to interview Persheng and Perdica, who graciously shared their journey with me. Their journey from identifying the problem to launching a successful business speaks volumes about their entrepreneurial drive and commitment to empowering women in the workplace.' },

      { t: 'divider' },

      { t: 'qa', q: 'What led to the founding of BY BANOO?', who: 'PERSHENG', x: "It was when I began working as a management consultant that I discovered how challenging it was to find a stylish and practical laptop bag. I have always been very interested in fashion, but there was no stylish bag that could fit the laptop. I asked my female friends and colleagues where they bought their laptop bags and everyone said it was very difficult to find one. When we looked at what men had, they had a classic briefcase, but none of the women carried them, because they obviously weren't stylish or functional enough for their needs." },

      { t: 'qa', who: 'PERSHENG', x: 'After I had been working for two years I asked my sister if we should create a company that provides working bags for women and Perdica thought it was a very good idea. However, it takes quite a long time to start a company, so I chose to continue working as a management consultant and Perdica chose to continue studying to become a doctor, until we reached a point where we felt we had to focus full-time on the company. Therefore I quit my job a little over a year ago, and Perdica finished her studies in January and has been working full-time since then, so now we are both doing it full-time.' },

      { t: 'qa', q: 'Starting and running a business involves taking risks. How has it been for you to set aside your previous careers to focus fully on the company?', who: 'PERDICA', x: "One thing we have learned from our parents quite early on and that they have instilled in us is to **dare to be brave**. We have been told since we were young that you can do exactly what you want and you can accomplish many things. It wasn't like choosing a career and just sticking to it, but that careers can be combined if you want to." },

      { t: 'qa', who: 'PERDICA', x: 'It is also about the opportunity we have in Sweden and it feels stupid not to take that opportunity. If there is any country that has your back in terms of entrepreneurship, career and education it is Sweden. We have not really reflected on being brave. We hear it quite often, but it is not something either I or Persheng feel. It is more about that we have this opportunity, so why would we not take it?' },

      { t: 'qa', who: 'PERSHENG', x: 'The reason we have not felt that we are brave is because we have had other scenarios to compare with. When we see our relatives in Iran, who do not have the same opportunities as us, we realize there is a lot that we can do here and we almost do it because we can and therefore it feels very obvious that we should do it. We gained the perspective that Sweden is the land of opportunities and that you can become whatever you want here, because education is free and we grew up with the confidence that everything is possible just because our parents had another perspective growing up during war in Iran.' },

      { t: 'qa', who: 'PERSHENG', x: 'We also want to use our brand to show and inspire others to dare to invest in their careers. Today there are very few women in boardrooms and in leadership positions and there is a reason why this type of product has not existed before, because this type of job is often dominated by men. My previous job as a management consultant was male-dominated, and therefore it is a social issue for us when it comes to problems women face. Women should dare to invest in their careers, just as we have dared to invest in our company and we want to see these bags in important rooms where important decisions are made.' },

      { t: 'q', x: 'We want to see these bags in important rooms where important decisions are made.', who: 'Persheng Babaheidari' },

      { t: 'h', x: 'The name' },

      { t: 'qa', q: "Why did you choose to name the company BY BANOO, and what significance does the company's name hold for you?", who: 'PERDICA', x: 'Actually, it was our father who helped us name our company and *banoo* is a Persian word, meaning lady, queen or woman. In the beginning we just thought of being called "banoo", but that domain name was taken. However, we really liked "banoo", so we came up with BY BANOO, which means, by the queen or by the lady, and we realized that it can be cool too. It also has a personal touch to it as it shows our heritage and that it is from the woman. I think for us it has been a representation of us clearly in the name, but also a representation of what we do and not just who we are and what we do, but a combination of both.' },

      { t: 'h', x: 'What makes a work bag' },

      { t: 'qa', q: 'What features do you consider important in a good work bag, and what sets your work bag apart from others on the market?', who: 'PERSHENG', x: 'According to us, a good work bag is one that is both functional and stylish. Personally, I would never buy a bag that is ugly but functional, or vice versa, because I need both, so it is something we absolutely do not compromise on when we design. When it comes to functionality, it should be a bag that can withstand a lot of weight, so it needs to be constructed in a way where you can fill the bag a lot without it becoming deformed. The bag should also have a laptop compartment, because most jobs that we target are usually in need of a laptop.' },

      { t: 'qa', who: 'PERSHENG', x: 'When it comes to material we have chosen to work with Italian leather because it lasts a long time and it looks very nice. It is also a by-product, so no animals die because you use leather, but it is something you handle as waste and you can choose to either throw it away or use it.' },

      { t: 'qa', who: 'PERSHENG', x: 'Furthermore, we also have a very strong focus on sustainability and manufacture all our products in Europe to ensure good working conditions for those who manufacture the bags, as they are under EU legislation. Before, we used to manufacture in Estonia, but we have recently moved the production to Portugal.' },

      { t: 'qa', who: 'PERSHENG', x: 'All our materials are purchased in Italy to minimize transport distances because often today, much in the fashion industry is produced in Asia and then it is transported to Sweden. The transport distances become so long, so we try to minimize the climate impact in that way, but at the same time we try to make a high-quality bag that lasts a long time, so you do not have to buy many bags, because it is not good for the environment to overconsume.' },

      { t: 'qa', who: 'PERSHENG', x: 'What sets our bag apart from other bags is when we started, this type of product did not exist and there were really few on the market and we were as far as I know among the first in the Nordics to develop this product. Before what was comparable was a male briefcase and a large backpack, or completely different types of bags that do not fulfill the function our bag does, and we wanted to develop a briefcase as our first bag because there was no briefcase for women in that way.' },

      { t: 'qa', who: 'PERSHENG', x: 'Today, since there are more people who have experienced this problem, more companies have also emerged. Design and functionality is our core, but we are also authentic behind the brand. We are two women who are sisters behind the brand and that is also what we show in the marketing. The whole message behind the brand is about women daring to invest in their careers and that is also what characterizes us as a company.' },

      { t: 'qa', who: 'PERDICA', x: 'Authenticity has been very important to us because we ourselves have dared to invest in our own careers. Both I and Persheng are business women, which makes us our own customers. This makes it easier for us to identify features in the bag that make it easier for us to design the product and I think we can offer a bag that the business woman really wants, because we ourselves are the customer.' },

      { t: 'h', x: 'Where it goes' },

      { t: 'qa', q: 'What goals have you achieved with BY BANOO so far, and what does the future look like for you and your company?', who: 'PERDICA', x: 'We have quite rapidly reached the global market, which we maybe did not expect at the beginning, but it is really fun and today we sell to 40 countries.' },

      { t: 'qa', who: 'PERSHENG', x: 'I would also say that all the thousands of customers we have and the pop-up store in Stockholm last year are some other achievements. We have really hit a need that not only we feel, but that many others also recognize. I also think it has been a key factor in why we have succeeded well with marketing because we communicate a problem that many women experience and not just us.' },

      { t: 'qa', who: 'PERSHENG', x: 'Until now, we have only sold through our own e-commerce, but are now expanding to sell through retailers and we have signed our first retailer, which we will announce shortly and we are very excited about that. It has been very hard work behind it, but we are just looking forward to expanding our company.' },

      { t: 'qa', who: 'PERSHENG', x: 'We want to become a big global brand with a focus on business women because we feel that there has not been a fashion brand where the businesswoman is the focus. Much of the fashion before has just been about looking good, which we agree with, but it is about the idea that one should look chic and also have a higher purpose with what one does and that women are not just pretty, but also very smart and driven. Everyone can go as far as they want as long as they believe in themselves and have a community that also believes in them.' },

      { t: 'qa', who: 'PERDICA', x: "I think our long-term goal is to become the go-to brand for women's work bags. We should be the first thing you think of and if you see a BY BANOO bag in town, you should immediately think that it is a businesswoman." },

      { t: 'qa', who: 'PERSHENG', x: 'We want women to feel empowered when they have our products. You should get that boost and feel that I will ace this interview, I will nail this pitch or whatever it is you do in your career. We want women to feel like they can do whatever they want.' },
    ],
  },
"""
print("bybanoo:", a in s)
open(p, "w").write(s.replace(a, b, 1))
