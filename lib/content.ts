export const siteConfig = {
  name: "Dev Deepak",
  description:
    "Product at Engine by Starling. Operator, builder, and competitor pursuing excellence across technology, leadership, and sport.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devdeepak.vercel.app",
  linkedinUrl: "https://www.linkedin.com/in/dev-deepak2024/",
};

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
