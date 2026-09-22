// Single source of truth — all copy is derived from the TELES ADS Master
// Agency Knowledge Base (Sept 2026). No invented clients, metrics or prices.

export const brand = {
  name: "TELES ADS",
  tagline: "Your Gateway to Telegram Growth",
  rhythm: "Automate • Advertise • Achieve",
  promise: "Smart Ads. Real Results. Powered by Automation.",
  shortBio:
    "TELES ADS — Telegram Advertising & Digital Growth Agency. Targeted campaigns, community growth, Meta Ads, creative solutions, Telegram bots, and automation for online businesses worldwide.",
  description:
    "TELES ADS is a specialized digital advertising and growth agency focused on Telegram marketing, targeted audience acquisition, Meta and Instagram advertising, Google Ads, creative production, Telegram bot development, and marketing automation. We work with trading, crypto, Web3, creator, SaaS, and online-business communities to help them improve visibility, acquire relevant audiences, and scale through strategic digital campaigns.",
  regions: "India & UAE representation · International client focus",
} as const;

export const links = {
  channel: "https://t.me/TelesAds",
  contact: "https://t.me/TeIeAd",
  agentBot: "https://t.me/TelesAgentBot",
  feedback: "https://t.me/Teles_Feedback",
  site: "https://telesads.com",
  email: "work@telesads.com",
} as const;

export const services = [
  {
    id: "telegram-advertising",
    label: "A",
    title: "Telegram Advertising",
    summary:
      "Our core specialization. Channel promotion and targeted audience acquisition built on real channel research, not spray-and-pray placements.",
    points: [
      "Telegram channel promotion",
      "Targeted audience acquisition",
      "Channel discovery & audience research",
      "Competitor-channel research",
      "Campaign planning & ad placement strategy",
      "Campaign monitoring & growth reporting",
      "Creative testing & optimization",
    ],
  },
  {
    id: "meta-instagram",
    label: "B",
    title: "Meta & Instagram Advertising",
    summary:
      "Conversion-focused Facebook and Instagram campaigns with structured creative testing and ongoing optimization.",
    points: [
      "Facebook Ads & Instagram Ads",
      "Meta campaign management",
      "Audience targeting",
      "Retargeting where appropriate",
      "Creative testing",
      "Conversion-focused campaigns",
      "Campaign optimization",
    ],
  },
  {
    id: "google-ads",
    label: "C",
    title: "Google Advertising",
    summary:
      "Search and traffic acquisition planned around the destination — landing page, offer and intent.",
    points: [
      "Google Ads support",
      "Search campaigns",
      "Traffic acquisition",
      "Landing-page traffic",
      "Conversion-oriented campaign planning",
    ],
  },
  {
    id: "creative",
    label: "D",
    title: "Creative Services",
    summary:
      "Everything a campaign needs to actually run — copy, banners, video concepts and the page they land on.",
    points: [
      "Ad copywriting",
      "Banner advertisements",
      "Video ad concepts",
      "Social media creatives",
      "Landing pages",
      "Promotional graphics",
      "Campaign messaging & brand positioning",
    ],
  },
  {
    id: "growth-consulting",
    label: "E",
    title: "Telegram Growth Consulting",
    summary:
      "Strategy for channels that are already running and need direction, diagnosis and a funnel that holds.",
    points: [
      "Channel growth strategy",
      "Audience analysis",
      "Content & acquisition recommendations",
      "Community funnel planning",
      "Growth troubleshooting",
      "Campaign performance interpretation",
    ],
  },
  {
    id: "bot-development",
    label: "F",
    title: "Telegram Bot Development",
    summary:
      "Custom bots and automation workflows that onboard, qualify and support your community around the clock.",
    points: [
      "Custom Telegram bots",
      "Automation workflows",
      "Customer-support bots",
      "Lead collection & onboarding flows",
      "Campaign assistants",
      "Community utilities",
      "AI-powered Telegram tools",
    ],
  },
  {
    id: "automation-ai",
    label: "G",
    title: "Automation & AI",
    summary:
      "The operational layer — dashboards, automated reporting and assistants that remove manual campaign work.",
    points: [
      "Advertising workflow automation",
      "AI assistants",
      "Campaign-related dashboards",
      "Automated reports",
      "Lead qualification",
      "Customer support automation",
      "Telegram mini-app concepts",
    ],
  },
] as const;

export const audiences = [
  {
    title: "Forex Trading Channels",
    items: ["Signal providers", "Trading educators", "Market analysts", "Mentorship brands"],
  },
  {
    title: "Crypto & Web3",
    items: ["Crypto communities", "Token communities", "Web3 projects", "Blockchain products"],
  },
  {
    title: "Binary Trading Communities",
    items: ["Education channels", "Signal providers", "Trading communities"],
    note: "Only where advertising and legal policies permit.",
  },
  {
    title: "Gambling-Related Communities",
    items: ["Community awareness", "Audience acquisition"],
    note: "Only where lawful and compliant with platform rules and jurisdictional restrictions.",
  },
  {
    title: "Arbitrage & Finance",
    items: ["Arbitrage education", "Market-analysis communities", "Finance-focused audiences"],
    note: "No misleading financial claims.",
  },
  {
    title: "Meme Coin & Speculative",
    items: ["Community growth", "Awareness campaigns", "Audience acquisition"],
    note: "No guaranteed-profit or deceptive investment language.",
  },
  {
    title: "SaaS & Online Platforms",
    items: ["Software products", "AI tools", "Subscription businesses", "Digital services"],
  },
  {
    title: "Creators & Personal Brands",
    items: ["Influencers", "Educators", "Content creators", "Community leaders"],
  },
  {
    title: "E-commerce & Digital",
    items: ["Online stores", "Digital products", "Direct-response campaigns"],
  },
] as const;

export const process = [
  { n: "01", title: "Discovery", body: "Understand the business, niche, audience and goal. Identify the destination channel, website, bot or landing page." },
  { n: "02", title: "Qualification", body: "Confirm the business is lawful and advertising-compliant. Review the offer, claims and any high-risk content." },
  { n: "03", title: "Strategy", body: "Recommend channels and platforms, define the objective, select audience and geography, set creative direction, budget and timeline." },
  { n: "04", title: "Proposal", body: "Scope, deliverables and price — plus a clear statement of what is and is not guaranteed, and the reporting schedule." },
  { n: "05", title: "Payment & Setup", body: "Confirm payment through approved business methods, collect assets, obtain campaign approval and configure tracking where available." },
  { n: "06", title: "Launch", body: "Launch only after final confirmation. Monitor delivery and performance, and record important campaign events." },
  { n: "07", title: "Reporting", body: "Agreed performance updates covering spend, reach, clicks, conversions and audience growth where measurable — including attribution limits." },
  { n: "08", title: "Optimization & Closure", body: "Recommend adjustments, deliver the final report where included, and set the next-step strategy." },
] as const;

export const agentCapabilities = [
  "Client onboarding",
  "Campaign assistance",
  "Advertising package information",
  "Campaign workflow guidance",
  "Customer support",
  "Growth-related automation",
  "AI-powered assistance",
  "Analytics & reporting concepts",
  "Telegram mini-app experiences",
] as const;

export const portfolio = [
  { handle: "@GGShot_Bot", kind: "Telegram bot & automation" },
  { handle: "@tradingmentorsIgnaIs_bot", kind: "Telegram bot & automation" },
  { handle: "@AIGPT5Trading_bot", kind: "Telegram bot & automation" },
  { handle: "@quant_pocket_bot", kind: "Telegram bot & automation" },
] as const;

export const reportingMetrics = [
  "Ad spend",
  "Reach",
  "Impressions",
  "Clicks",
  "CTR",
  "CPC",
  "Leads",
  "Conversions",
  "Telegram joins",
  "Cost per join",
  "Landing-page visits",
  "Campaign duration",
  "Audience geography",
  "Creative performance",
] as const;

export const briefQuestions = [
  "What is your business or channel niche?",
  "What is your Telegram username or destination link?",
  "Which countries or audience segments do you target?",
  "What is your objective: members, leads, sales, traffic or awareness?",
  "What is your advertising budget?",
  "Do you have creatives, or do you need them created?",
  "What is your preferred campaign duration?",
  "Is the offer compliant with platform and local rules?",
] as const;
