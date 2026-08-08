import projectsData from "@/data/projects.json";

export const personal = {
  name: "Muhammad Ahmad",
  initials: "MA",
  titles: [
    "Software Engineer",
    "AI Automation Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Freelancer",
  ],
  email: "ahmadtahirc1@gmail.com",
  phone: "0326-4526269",
  whatsapp: "0311-7019326",
  location: "Faisalabad, Pakistan",
  resumeUrl: "/resume.pdf",
  university: "COMSATS University Islamabad, Lahore Campus",
};

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/ahmadtahirc1",
    icon: "Github",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1BEmVi9oLJ/",
    icon: "Facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ahmad_jutt_315?igsh=anlrY21kN3FodTd4",
    icon: "Instagram",
  },
  {
    name: "Email",
    href: "mailto:ahmadtahirc1@gmail.com",
    icon: "Mail",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export type SkillCategory = {
  category: string;
  icon: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "LayoutGrid",
    description: "Crafting interfaces that feel alive",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: "Server",
    description: "APIs and systems that hold it together",
    skills: ["Node.js", "Express", "REST APIs", "Java", "C#", "Python"],
  },
  {
    category: "Database",
    icon: "Database",
    description: "Structuring and storing what matters",
    skills: ["MongoDB", "Supabase", "SQLite", "SQL"],
  },
  {
    category: "AI",
    icon: "Sparkles",
    description: "Building with intelligent systems",
    skills: ["OpenAI APIs", "Claude APIs", "Prompt Engineering", "AI Integrations"],
  },
  {
    category: "Automation",
    icon: "Workflow",
    description: "Making businesses run themselves",
    skills: ["N8N", "Workflow Automation", "Process Design", "Business Logic"],
  },
  {
    category: "Deployment",
    icon: "Rocket",
    description: "Shipping fast, shipping reliably",
    skills: ["Vercel", "Git", "GitHub", "CI/CD"],
  },
  {
    category: "UI Design",
    icon: "Palette",
    description: "Design systems that scale",
    skills: ["Design Systems", "Prototyping", "Responsive Design", "Micro-interactions"],
  },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlight?: string;
  featured: boolean;
};

// Sourced from src/data/projects.json so the admin panel can add/edit/remove
// projects by committing to that file directly — no code changes needed.
export const projects: Project[] = projectsData as Project[];

export type TimelineItem = {
  type: "education" | "work";
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: TimelineItem[] = [
  {
    type: "education",
    role: "BS Software Engineering",
    company: "COMSATS University Islamabad, Lahore Campus",
    period: "2023 — 2027",
    points: [
      "Session 2023–2027, currently mid-way through the program.",
      "Coursework in software design, databases, and systems — applied directly to freelance and client work alongside study.",
    ],
  },
  {
    type: "work",
    role: "Business Developer & Software Developer",
    company: "BerryBuilds",
    period: "2023 — Ongoing",
    points: [
      "Manage client communication and requirement gathering from first contact to delivery.",
      "Contribute across the stack — from feature builds to full project delivery.",
      "Translate business operations into working software solutions for real clients.",
      "Support business growth through client engagement and technical consultation.",
    ],
  },
  {
    type: "work",
    role: "Freelance Software & AI Automation Developer",
    company: "Self-employed",
    period: "Ongoing",
    points: [
      "Build web applications, business automation tools, and management systems for independent clients.",
      "Design and ship portfolio websites, educational platforms, and desktop POS software.",
      "Integrate AI APIs (OpenAI, Claude) and automation tools like N8N into business workflows.",
    ],
  },
  {
    type: "work",
    role: "Software Developer — AI Automation",
    company: "DDC Solutions (ddcsolutions.co.uk)",
    period: "Present",
    points: [
      "Build internal automation tools that interpret business strategy documents and generate structured configuration and reporting output.",
      "Develop internal web applications to manage and monitor automated workflows.",
      "Work across Python-based data processing and reporting pipelines for real service-strategy operations.",
    ],
  },
];

export const services = [
  {
    title: "Website Development",
    icon: "Globe",
    description: "Business websites, landing pages, and portfolio sites built to convert and impress.",
    items: ["Business Websites", "Landing Pages", "Portfolio Websites"],
  },
  {
    title: "AI Automation",
    icon: "Bot",
    description: "Automating the repetitive parts of running a business, powered by modern AI tooling.",
    items: ["Business Automation", "POS Systems", "Management Systems"],
  },
  {
    title: "Full Stack Development",
    icon: "Layers",
    description: "End-to-end applications — from database design to a polished, responsive frontend.",
    items: ["Frontend Development", "Full Stack Development", "API Integrations"],
  },
];

export const whyWorkWithMe = [
  { title: "Fast Delivery", icon: "Zap" },
  { title: "Clean Code", icon: "Code2" },
  { title: "Modern UI", icon: "Wand2" },
  { title: "Responsive Design", icon: "Smartphone" },
  { title: "Performance Optimized", icon: "Gauge" },
  { title: "Scalable Architecture", icon: "Blocks" },
  { title: "Professional Communication", icon: "MessagesSquare" },
];

export const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 6, suffix: "+" },
  { label: "Years Learning", value: 4, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

export const testimonials = [
  {
    name: "Muneeb",
    role: "Owner, Muneeb Traders",
    quote:
      "Ahmad understood exactly what our business needed. The site loads fast, looks professional, and customers actually comment on it.",
  },
  {
    name: "Retail Client",
    role: "POS Software User",
    quote:
      "We switched our entire billing process to his POS system. Barcode scanning and reporting alone saved us hours every week.",
  },
  {
    name: "FAAST Administration",
    role: "FAAST Academy",
    quote:
      "Professional, responsive, and easy to work with. He delivered a modern site that represents our institution well.",
  },
  {
    name: "BerryBuilds",
    role: "Business Partner",
    quote:
      "Reliable communication and solid technical execution — Ahmad consistently turns business requirements into working software.",
  },
];
