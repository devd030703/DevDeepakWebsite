export const siteConfig = {
  name: "Dev Deepak",
  description:
    "Product at Engine by Starling. Operator, builder, and competitor pursuing excellence across technology, leadership, and sport.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devdeepak.vercel.app",
  linkedinUrl: "https://www.linkedin.com/in/dev-deepak2024/",
};

export const navigation = [
  { href: "#highlights", label: "Highlights" },
  { href: "#career", label: "Career" },
  { href: "#timeline", label: "Timeline" },
  { href: "#beyond-work", label: "Beyond Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const heroStats = [
  {
    value: "Youngest PM",
    label: "Starling Group history",
    detail: "First graduate in a 30+ cohort placed in Product. First ever placed at Engine by Starling.",
  },
  {
    value: "Top Decile",
    label: "Apple, Brompton Road",
    detail: "35% AppleCare attachment rate. Contributed to 20% of total store revenue.",
  },
  {
    value: "KCL",
    label: "Economics & Management",
    detail: "Graduated 2024. Youngest-ever President of King's Entrepreneurs Society.",
  },
] as const;


export const highlights = [
  "First and only graduate to secure a full-time role at Engine by Starling",
  "Youngest person in Product across Starling Group at 22",
  "Designed Engineering Enablement programme approved by CTO",
  "Youngest President in 10+ year history of King’s Entrepreneurs Society",
  "Grew committee from 4 to 20+ members",
  "Mentored student from ABB to A*A*A and Morgan Stanley Summer School",
  "Raised £1,800 for WaterAid",
  "London Marathon finisher",
] as const;

export const careerItems = [
  {
    company: "Engine by Starling",
    role: "Product Associate",
    mark: "EBS",
    summary:
      "Responsible for AI strategy and product generalist work across cards, lending, payments, onboarding, savings, and more.",
    points: [
      "Designed the internal Engineering Enablement programme.",
      "Operating across multiple product surfaces with a broad, high-context remit.",
    ],
    areas: ["AI Strategy", "Cards", "Lending", "Payments", "Onboarding", "Savings"],
  },
  {
    company: "Starling Bank",
    role: "Analyst, Graduate Scheme",
    mark: "SB",
    summary:
      "Built product perspective through rotation work, cards and payment strategy, and a lending secondment at Engine.",
    points: [
      "Completed a product rotation inside the graduate scheme.",
      "Worked on Cards and Payment Strategy before seconding into lending at Engine.",
    ],
    areas: ["Graduate Scheme", "Product", "Cards", "Payments", "Lending"],
  },
  {
    company: "amicable",
    role: "Founder’s Associate",
    mark: "A",
    summary:
      "Reported directly to the co-founder and worked across product, M&A, partnerships, marketing, and data.",
    points: [
      "Operated as a generalist across strategy and execution.",
      "Learned how to move close to founders in a fast-changing environment.",
    ],
    areas: ["Product", "M&A", "Partnerships", "Marketing", "Data"],
  },
  {
    company: "King’s Entrepreneurs Society",
    role: "President, then Chairman",
    mark: "KES",
    summary:
      "Youngest president in society history, scaling committee size, event ambition, and the operating standard of the society.",
    points: [
      "Grew the committee from 4 to more than 20 members.",
      "Expanded the reach and consistency of events across the academic year.",
    ],
    areas: ["Leadership", "Community", "Events", "Growth"],
  },
] as const;

const timelinePlaceholderPhotos = [
  "/photos/IMG_0022.JPG",
  "/photos/IMG_0111.jpeg",
  "/photos/IMG_0360.jpeg",
  "/photos/IMG_0547.jpeg",
  "/photos/IMG_1105.jpeg",
  "/photos/IMG_1201.jpeg",
  "/photos/IMG_3055.jpeg",
  "/photos/IMG_7880.jpeg",
] as const;

function pickTimelineMedia(startIndex: number) {
  return [
    timelinePlaceholderPhotos[startIndex % timelinePlaceholderPhotos.length],
    timelinePlaceholderPhotos[(startIndex + 2) % timelinePlaceholderPhotos.length],
    timelinePlaceholderPhotos[(startIndex + 5) % timelinePlaceholderPhotos.length],
  ] as const;
}

export const timelineEntries = [
  {
    company: "Engine by Starling",
    role: "Product Associate",
    date: "Sept 2025 – Present",
    descriptor: "First and only junior PM in the Starling Group's history.",
    media: pickTimelineMedia(0),
  },
  {
    company: "Engine by Starling",
    role: "Analyst (Secondment)",
    date: "Mar 2025 – Sept 2025",
    descriptor: "First graduate in cohort placed at Engine, Starling's SaaS venture.",
    media: pickTimelineMedia(1),
  },
  {
    company: "Starling Bank",
    role: "Analyst",
    date: "Sept 2024 – Sept 2025",
    descriptor: "First graduate in cohort of 30+ placed in Product.",
    media: pickTimelineMedia(2),
  },
  {
    company: "amicable",
    role: "Founder's Associate",
    date: "May 2024 – Aug 2024",
    descriptor: "Drove 25% customer growth. Led £50M London tube campaign.",
    media: pickTimelineMedia(3),
  },
  {
    company: "Episode 1 Ventures",
    role: "Visiting Analyst",
    date: "Sept 2023 – Feb 2024",
    descriptor: "Europe's top decile seed fund. First backers of Shazam and Zoopla.",
    media: pickTimelineMedia(4),
  },
  {
    company: "Starling Bank",
    role: "Vendor Management Intern",
    date: "Jul 2023 – Aug 2023",
    descriptor: "Managed compliance and onboarding for 200+ vendors.",
    media: pickTimelineMedia(5),
  },
  {
    company: "Apple",
    role: "Product Specialist, Core NSO Team",
    date: "Jul 2022 – Jun 2023",
    descriptor: "Flagship Brompton Road launch. Top decile. 35% AppleCare attachment.",
    media: pickTimelineMedia(6),
  },
  {
    company: "Kraken",
    role: "Growth & Product Intern",
    date: "Jul 2022 – Sept 2022",
    descriptor: "Modelled 20+ CRM providers. Shaped strategic growth roadmap.",
    media: pickTimelineMedia(7),
  },
  {
    company: "King's College London",
    role: "BSc Economics & Management",
    date: "Sep 2021 – Jun 2024",
    descriptor: "Upper Second-Class Honours. Chairman of King's Entrepreneurs Society.",
    media: pickTimelineMedia(8),
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

export const educationTimeline = [
  {
    stage: "01",
    institution: "Nower Hill High School",
    story:
      "A library kid who discovered academics as a competitive outlet and built the first version of his standard there.",
    achievements: ["9 Grade 9s at GCSE", "UKMT Bronze"],
  },
  {
    stage: "02",
    institution: "Highgate School",
    story:
      "An environment that sharpened the pace, the ceiling, and the expectation across quantitative and technical work.",
    achievements: [
      "A*A*A*A in Maths, Further Maths, Economics, Computer Science",
      "UKMT Silver",
    ],
  },
  {
    stage: "03",
    institution: "King’s College London",
    story:
      "Studied Economics and Management, led King’s Entrepreneurs Society, and found entrepreneurship, running, and boxing.",
    achievements: [
      "BSc Economics and Management",
      "King’s Entrepreneurs Society leadership",
      "Discovered entrepreneurship, running and boxing",
    ],
  },
] as const;

export const beyondWork = {
  athletics: [
    { label: "London Marathon", value: "Finisher" },
    { label: "Manchester Marathon", value: "In training" },
    { label: "Half Marathon PB", value: "1:58:56" },
    { label: "Boxing", value: "3+ years" },
  ],
  strength: ["100kg bench", "100kg squat", "140kg deadlift"],
  mentoring: [
    "Zero Gravity mentor",
    "Helped a student improve from ABB to A*A*A",
    "Supported a Morgan Stanley Summer School outcome",
  ],
  impact: [
    "Food For All UK volunteer",
    "Optimized delivery routes for 100+ food parcels per day",
    "WaterAid fundraiser (£1,800)",
  ],
} as const;
