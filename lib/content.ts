export const siteConfig = {
  name: "Dev Deepak",
  description:
    "Product at Engine by Starling. Operator, builder, and competitor pursuing excellence across technology, leadership, and sport.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devdeepak.vercel.app",
  linkedinUrl: "https://www.linkedin.com/in/dev-deepak2024/",
};

type TimelineEntry = {
  company: string;
  role: string;
  date: string;
  descriptor: string;
  textFontFamily?: string;
};

export const timelineEntries: readonly TimelineEntry[] = [
  {
    company: "Engine by Starling",
    role: "Product Associate",
    date: "Sept 2025 – Present",
    descriptor: "Working across Lending, FinCrime, Savings, Payments, Card and Customer Service products",
    textFontFamily: '"Universal Sans", sans-serif',
  },
  {
    company: "Engine by Starling",
    role: "Analyst (Graduate Scheme - Secondment)",
    date: "Mar 2025 – Sept 2025",
    descriptor: "First graduate (30+) to be placed at Engine, Starling's SaaS venture. 2nd Rotation in Lending",
    textFontFamily: '"Universal Sans", sans-serif',
  },
  {
    company: "Starling Bank",
    role: "Analyst (Graduate Scheme)",
    date: "Sept 2024 – Sept 2025",
    descriptor: "First graduate (30+) to be placed in Product. 1st Rotation in Car Payments",
    textFontFamily: '"Avantt", "Inter Tight", sans-serif',
  },
  {
    company: "amicable",
    role: "Founder's Associate",
    date: "May 2024 – Aug 2024",
    descriptor: "Reported directly to Kate Daley (Founder) to build out Marketing, Data and Sales functions",
    textFontFamily: 'Solomon, Arial, sans-serif',
  },
  {
    company: "Episode 1 Ventures",
    role: "Visiting Analyst",
    date: "Sept 2023 – Feb 2024",
    descriptor: "Europe's top decile seed fund. First backers of Shazam, Zoopla, Betfair, Viagogo and Carwow.",
    textFontFamily: '"Fk Grotesk Neue", sans-serif',
  },
  {
    company: "Starling Bank",
    role: "Summer Analyst",
    date: "Jul 2023 – Aug 2023",
    descriptor: "Interned in Starling Bank's Vendor Management Team",
    textFontFamily: '"Avantt", "Inter Tight", sans-serif',
  },
  {
    company: "Apple",
    role: "Product Specialist, Core NSO Team",
    date: "Jul 2022 – Jun 2023",
    descriptor: "Joined the New Store Opening Team at Apple to launch the latest Flagship store on Brompton Road",
    textFontFamily:
      '"SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  {
    company: "Kraken",
    role: "Growth & Product Intern",
    date: "Jul 2022 – Sept 2022",
    descriptor: "Modelled 20+ CRM providers to support the team building out a strategic growth roadmap into Water and Telecommunications",
    textFontFamily: '"Chromatophore", Helvetica, sans-serif',
  },
  {
    company: "King's College London",
    role: "BSc Economics & Management",
    date: "Sep 2021 – Jun 2024",
    descriptor: "President & Chairman of King's Entrepreneurs Society.",
    textFontFamily:
      '"KingsBureauGrotFiveOne", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  },
  {
    company: "Highgate School",
    role: "A-Levels",
    date: "Sep 2019 – Jul 2021",
    descriptor: "Studied Maths, Further Maths, Economics, Computer Science (A*A*A*A).",
  },
  {
    company: "Nower Hill High School",
    role: "GCSEs",
    date: "Sep 2016 – Jul 2019",
    descriptor: "Straight 9s and an extra A in Astronomy",
  },
] as const;

export const beyondWork = {
  athletics: [
    { label: "Half Marathon", value: "1:36" },
    { label: "Boxing", value: "Active" },
    { label: "Hyrox", value: "Training" },
    { label: "Consistency", value: "Year-round" },
  ],
  strength: ["Deadlift 180kg", "Squat 140kg", "Bench 100kg"],
  mentoring: [
    "Supporting younger operators breaking into product and strategy roles.",
    "Sharing practical interview preparation and career decision frameworks.",
    "Helping peers raise the bar on execution, communication, and ownership.",
  ],
  impact: [
    "Community-minded work that pairs service with disciplined follow-through.",
    "A bias toward initiatives where measurable effort compounds over time.",
    "Long-term focus on contribution, leadership, and durable standards.",
  ],
} as const;

export const navigation = [
  { href: "#top", label: "Home" },
  { href: "#timeline", label: "Timeline" },
  { href: "#career", label: "Career" },
  { href: "#beyond-work", label: "Beyond Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const highlights = [
  "First graduate in cohort placed into Product at Starling.",
  "First graduate in cohort seconded into Engine by Starling.",
  "Led across startup, fintech, retail, and venture environments early.",
  "Consistent focus on ownership, pace, and steep learning curves.",
] as const;

export const careerItems = [
  {
    company: "Engine by Starling",
    role: "Product Associate",
    mark: "EBS",
    summary:
      "Driving product work in banking infrastructure with a bias for execution, clarity, and ownership.",
    areas: ["Product", "Execution", "Fintech"],
    points: [
      "Operating as the first junior PM in the group's history.",
      "Working across ambiguous problems with senior stakeholder exposure.",
      "Balancing product judgment with analytical rigor and delivery discipline.",
    ],
  },
  {
    company: "amicable",
    role: "Founder's Associate",
    mark: "AMB",
    summary:
      "Worked directly on growth and operating priorities inside a venture-backed company.",
    areas: ["Growth", "Strategy", "Operations"],
    points: [
      "Supported customer growth and commercial execution.",
      "Contributed to high-visibility campaign and go-to-market work.",
      "Built founder-mode instincts around range and speed.",
    ],
  },
  {
    company: "Apple",
    role: "Product Specialist",
    mark: "APL",
    summary:
      "Customer-facing performance in a high-bar retail environment with measurable outcomes.",
    areas: ["Sales", "Operations", "Customer"],
    points: [
      "Worked on the Brompton Road flagship launch team.",
      "Delivered strong attachment and service performance.",
      "Built communication discipline under pressure and pace.",
    ],
  },
  {
    company: "Episode 1 Ventures",
    role: "Visiting Analyst",
    mark: "E1",
    summary:
      "Built pattern recognition around early-stage technology, markets, and founders.",
    areas: ["Venture", "Research", "Markets"],
    points: [
      "Assessed startups and market narratives across software categories.",
      "Strengthened written judgment and synthesis under tight timelines.",
      "Learned to spot quality signals in teams, products, and markets.",
    ],
  },
] as const;
