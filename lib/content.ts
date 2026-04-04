export const siteConfig = {
  name: "Dev Deepak",
  description:
    "Product at Engine by Starling. Operator, builder, and competitor pursuing excellence across technology, leadership, and sport.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devdeepak.vercel.app",
  linkedinUrl: "https://www.linkedin.com/in/dev-deepak2024/",
};

export type TimelineMedia = {
  src: string;
  alt: string;
  objectPosition?: string;
};

const timelinePlaceholderPhotos: readonly TimelineMedia[] = [
  {
    src: "/photos/IMG_0022.JPG",
    alt: "Personal timeline photograph 1",
    objectPosition: "center 42%",
  },
  {
    src: "/photos/IMG_0111.jpeg",
    alt: "Personal timeline photograph 2",
    objectPosition: "center 38%",
  },
  {
    src: "/photos/IMG_0360.jpeg",
    alt: "Personal timeline photograph 3",
    objectPosition: "center 36%",
  },
  {
    src: "/photos/IMG_0547.jpeg",
    alt: "Personal timeline photograph 4",
    objectPosition: "center 34%",
  },
  {
    src: "/photos/IMG_1105.jpeg",
    alt: "Personal timeline photograph 5",
    objectPosition: "center 32%",
  },
  {
    src: "/photos/Starling_Bank_3.jpeg",
    alt: "Dev Deepak at Starling Bank",
    objectPosition: "center 28%",
  },
  {
    src: "/photos/IMG_3055.jpeg",
    alt: "Personal timeline photograph 6",
    objectPosition: "center 40%",
  },
  {
    src: "/photos/King_College_London_1.jpeg",
    alt: "Dev Deepak at King's College London",
    objectPosition: "center 24%",
  },
] as const;

const mediaSets = {
  engineProductAssociate: [
    {
      src: "/photos/Engine_Product_Associate_1.PNG",
      alt: "Dev Deepak at Engine by Starling",
      objectPosition: "center 26%",
    },
    {
      src: "/photos/Engine_Product_Associate_2.jpeg",
      alt: "Engine by Starling team moment",
      objectPosition: "center 38%",
    },
    {
      src: "/photos/Engine_Product_Associate_3.jpeg",
      alt: "Dev Deepak working with the Engine by Starling team",
      objectPosition: "center 32%",
    },
  ],
  engineAnalyst: [
    {
      src: "/photos/Engine_Analyst_1.jpeg",
      alt: "Dev Deepak during his Engine by Starling analyst secondment",
      objectPosition: "center 24%",
    },
    {
      src: "/photos/Engine_Analyst_2.jpeg",
      alt: "Engine by Starling analyst work",
      objectPosition: "center 34%",
    },
    {
      src: "/photos/Engine_Analyst_4.png",
      alt: "Engine by Starling analyst presentation moment",
      objectPosition: "center 30%",
    },
  ],
  starlingBank: [
    {
      src: "/photos/Starling_Bank_1.jpeg",
      alt: "Dev Deepak at Starling Bank",
      objectPosition: "center 22%",
    },
    {
      src: "/photos/Starling_Bank_2.jpeg",
      alt: "Starling Bank team photograph",
      objectPosition: "center 36%",
    },
    {
      src: "/photos/Starling_Bank_3.jpeg",
      alt: "Dev Deepak at Starling Bank event",
      objectPosition: "center 28%",
    },
  ],
  kingsCollegeLondon: [
    {
      src: "/photos/King_College_London_1.jpeg",
      alt: "Dev Deepak at King's College London",
      objectPosition: "center 22%",
    },
    {
      src: "/photos/IMG_7880.jpeg",
      alt: "King's College London moment",
      objectPosition: "center 34%",
    },
    {
      src: "/photos/IMG_1105.jpeg",
      alt: "Dev Deepak during university",
      objectPosition: "center 30%",
    },
  ],
} as const;

type TimelineEntry = {
  company: string;
  role: string;
  date: string;
  descriptor: string;
  media: readonly TimelineMedia[];
  textFontFamily?: string;
};

function pickTimelineMedia(startIndex: number) {
  return [
    timelinePlaceholderPhotos[startIndex % timelinePlaceholderPhotos.length],
    timelinePlaceholderPhotos[(startIndex + 2) % timelinePlaceholderPhotos.length],
    timelinePlaceholderPhotos[(startIndex + 5) % timelinePlaceholderPhotos.length],
  ] as const;
}

export const timelineEntries: readonly TimelineEntry[] = [
  {
    company: "Engine by Starling",
    role: "Product Associate",
    date: "Sept 2025 – Present",
    descriptor: "First and only junior PM in the Starling Group's history.",
    textFontFamily: '"Universal Sans", sans-serif',
    media: mediaSets.engineProductAssociate,
  },
  {
    company: "Engine by Starling",
    role: "Analyst (Secondment)",
    date: "Mar 2025 – Sept 2025",
    descriptor: "First graduate in cohort placed at Engine, Starling's SaaS venture.",
    textFontFamily: '"Universal Sans", sans-serif',
    media: mediaSets.engineAnalyst,
  },
  {
    company: "Starling Bank",
    role: "Analyst",
    date: "Sept 2024 – Sept 2025",
    descriptor: "First graduate in cohort of 30+ placed in Product.",
    textFontFamily: '"Avantt", "Inter Tight", sans-serif',
    media: mediaSets.starlingBank,
  },
  {
    company: "amicable",
    role: "Founder's Associate",
    date: "May 2024 – Aug 2024",
    descriptor: "Drove 25% customer growth. Led £50M London tube campaign.",
    textFontFamily: 'Solomon, Arial, sans-serif',
    media: pickTimelineMedia(3),
  },
  {
    company: "Episode 1 Ventures",
    role: "Visiting Analyst",
    date: "Sept 2023 – Feb 2024",
    descriptor: "Europe's top decile seed fund. First backers of Shazam and Zoopla.",
    textFontFamily: '"Fk Grotesk Neue", sans-serif',
    media: pickTimelineMedia(4),
  },
  {
    company: "Starling Bank",
    role: "Vendor Management Intern",
    date: "Jul 2023 – Aug 2023",
    descriptor: "Managed compliance and onboarding for 200+ vendors.",
    textFontFamily: '"Avantt", "Inter Tight", sans-serif',
    media: mediaSets.starlingBank,
  },
  {
    company: "Apple",
    role: "Product Specialist, Core NSO Team",
    date: "Jul 2022 – Jun 2023",
    descriptor: "Flagship Brompton Road launch. Top decile. 35% AppleCare attachment.",
    textFontFamily:
      '"SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
    media: pickTimelineMedia(6),
  },
  {
    company: "Kraken",
    role: "Growth & Product Intern",
    date: "Jul 2022 – Sept 2022",
    descriptor: "Modelled 20+ CRM providers. Shaped strategic growth roadmap.",
    textFontFamily: '"Chromatophore", Helvetica, sans-serif',
    media: pickTimelineMedia(7),
  },
  {
    company: "King's College London",
    role: "BSc Economics & Management",
    date: "Sep 2021 – Jun 2024",
    descriptor: "President & Chairman of King's Entrepreneurs Society.",
    textFontFamily:
      '"KingsBureauGrotFiveOne", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    media: mediaSets.kingsCollegeLondon,
  },
  {
    company: "Highgate School",
    role: "A-Levels",
    date: "Sep 2019 – Jul 2021",
    descriptor: "A*A*A*A in Maths, Further Maths, Economics, Computer Science.",
    media: pickTimelineMedia(9),
  },
  {
    company: "Nower Hill High School",
    role: "GCSEs",
    date: "Sep 2016 – Jul 2019",
    descriptor: "9 Grade 9s.",
    media: pickTimelineMedia(10),
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
