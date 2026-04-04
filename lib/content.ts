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
};

export const timelineEntries: readonly TimelineEntry[] = [
  {
    company: "Engine by Starling",
    role: "Product Associate",
    date: "Sept 2025 – Present",
    descriptor: "Working across Lending, FinCrime, Savings, Payments, Card and Customer Service products",
  },
  {
    company: "Engine by Starling",
    role: "Analyst (Graduate Scheme - Secondment)",
    date: "Mar 2025 – Sept 2025",
    descriptor: "First graduate (30+) to be placed at Engine, Starling's SaaS venture. 2nd Rotation in Lending",
  },
  {
    company: "Starling Bank",
    role: "Analyst (Graduate Scheme)",
    date: "Sept 2024 – Sept 2025",
    descriptor: "First graduate (30+) to be placed in Product. 1st Rotation in Car Payments",
  },
  {
    company: "amicable",
    role: "Founder's Associate",
    date: "May 2024 – Aug 2024",
    descriptor: "Reported directly to Kate Daley (Founder) to build out Marketing, Data and Sales functions",
  },
  {
    company: "Episode 1 Ventures",
    role: "Visiting Analyst",
    date: "Sept 2023 – Feb 2024",
    descriptor: "Europe's top decile seed fund. First backers of Shazam, Zoopla, Betfair, Viagogo and Carwow.",
  },
  {
    company: "Starling Bank",
    role: "Summer Analyst",
    date: "Jul 2023 – Aug 2023",
    descriptor: "Interned in Starling Bank's Vendor Management Team",
  },
  {
    company: "Apple",
    role: "Product Specialist, Core NSO Team",
    date: "Jul 2022 – Jun 2023",
    descriptor: "Joined the New Store Opening Team at Apple to launch the latest Flagship store on Brompton Road",
  },
  {
    company: "Kraken",
    role: "Growth & Product Intern",
    date: "Jul 2022 – Sept 2022",
    descriptor: "Modelled 20+ CRM providers to support the team building out a strategic growth roadmap into Water and Telecommunications",
  },
  {
    company: "King's College London",
    role: "BSc Economics & Management",
    date: "Sep 2021 – Jun 2024",
    descriptor: "President & Chairman of King's Entrepreneurs Society.",
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
