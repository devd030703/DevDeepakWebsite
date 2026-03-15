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
    value: "22",
    label: "Product Associate",
    detail: "Youngest person in Product across Starling Group",
  },
  {
    value: "King's College London",
    label: "BSc Economics and Management",
    detail: "Graduated in 2024. Ran London's fastest growing Entreprenuers Society at 18 as the youngest President in our 10+ year history",
  },
  {
    value: "Love hard things",
    label: "two Marathons, two Half Marathons and one Hyrox",
    detail: "Love to keep myself busy outside of work",
  },
] as const;

export const photoGallery = [
  {
    src: "/photos/05bff0c1-7e74-4103-a5c7-79208c1c7932.jpg",
    alt: "Dev Deepak photo 1",
  },
  {
    src: "/photos/IMG_0022.JPG",
    alt: "Dev Deepak photo 2",
  },
  {
    src: "/photos/IMG_0111.jpeg",
    alt: "Dev Deepak photo 3",
  },
  {
    src: "/photos/IMG_0360.jpeg",
    alt: "Dev Deepak photo 4",
  },
  {
    src: "/photos/IMG_0547.jpeg",
    alt: "Dev Deepak photo 5",
  },
  {
    src: "/photos/IMG_1105.jpeg",
    alt: "Dev Deepak photo 6",
  },
  {
    src: "/photos/IMG_1201.jpeg",
    alt: "Dev Deepak photo 7",
  },
  {
    src: "/photos/IMG_3055.jpeg",
    alt: "Dev Deepak photo 8",
  },
  {
    src: "/photos/IMG_7880.jpeg",
    alt: "Dev Deepak photo 9",
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
