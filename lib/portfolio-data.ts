// Single source of truth for portfolio content.
//
// Each section is rendered twice — once as a static, SEO-friendly page under
// `app/*/page.tsx` and once as an interactive pane under
// `components/TerminalComp/*`. The two renderings differ on purpose, but the
// underlying data must not. Both sides import from here so the lists stay in
// lock-step (they had already drifted before this was centralized).

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export interface Project {
  name: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    name: "AutoPulse",
    description:
      "A multi-tenant dealership and automotive management application for showroom visitor management with WhatsApp integration, digital & field enquiries, delivery updates, vehicle models, lead sources, and templates. Includes RBAC, organization-level feature toggles, lead/CRM workflows, and has been deployed to 5+ showrooms with 5000+ visitor entries.",
    imageUrl: "/images/autopulse.png",
    liveUrl: "#",
    githubUrl: "https://github.com/anupPradhan0/AutoPulseOLD",
    tech: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Radix UI",
      "Express.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "RabbitMQ",
    ],
  },
  {
    name: "AI-powered personal finance tracker",
    description:
      "RukiAI is an AI-driven personal finance tracker designed to help users log expenses, set budgets, and receive smart, personalized financial advice. Built with Node.js, MongoDB, and EJS, it integrates Cohere's AI API to deliver real-time insights while also featuring a custom local AI model to demonstrate advanced AI capabilities for recruiters. The project showcases both cloud-based AI integration and self-hosted model development in one application.",
    imageUrl: "/images/ruki-ai-project.png",
    liveUrl: "https://www.rukiai.online/",
    githubUrl: "https://github.com/anupPradhan0/AI-Personal-Finance-Tracker",
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "EJS",
      "Tailwind",
      "JavaScript",
      "Cohere AI",
    ],
  },
  {
    name: "WhatsApp Campaign Management Platform",
    description:
      "A full-stack MERN application for managing WhatsApp marketing campaigns with role-based access for admins and resellers. Features include client onboarding, financial transaction tracking with credit/debit records, and an integrated complaint management system. Built with React and TypeScript, featuring hierarchical user tree visualization with collapsible nodes and modal views. Backend powered by Node.js, Express, and MongoDB with Mongoose ODM for handling transactions, user management, and campaign operations. Integrated Cloudinary for image storage with automated cleanup scheduling.",
    imageUrl: "/images/whatsApp-Campaign.png",
    liveUrl: "https://whats-app-campaigner.vercel.app",
    githubUrl: "https://github.com/anupPradhan0/WhatsApp-Campaigner",
    tech: [
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose(ODM)",
      "Cloudinary",
    ],
  },
  {
    name: "Neural Network From Scratch (in Python)",
    description:
      "Tech: Python, NumPy, Matplotlib, Tensorflow. Implemented a basic neural network from the ground up using only Python and NumPy—no external ML libraries. Designed input, hidden, and output layers; implemented forward propagation, activation functions (Sigmoid/ReLU), and backpropagation manually. Trained on sample data to demonstrate model learning.",
    imageUrl: "/images/neural-network-project.png",
    liveUrl: "https://digit-recognizer-fullstack.vercel.app/",
    githubUrl: "https://github.com/anupPradhan0/digit-recognition-neural-network",
    tech: ["Python", "NumPy", "Matplotlib", "Tensorflow", "Jupyter Notebook"],
  },
  {
    name: "YouTube Backend",
    description:
      "Designed and built a backend system simulating YouTube features using Node.js, Express, and MongoDB. Implemented video upload, metadata storage, user registration & login with JWT auth. Structured REST APIs to handle likes, comments, views, and subscriptions. Deployed with Postman testing and MongoDB Atlas.",
    imageUrl: "/images/youtube-backend-project.png",
    liveUrl: "#",
    githubUrl: "https://github.com/anupPradhan0/YouTube-Clone-Backend",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Postman", "MongoDB Atlas"],
  },
  {
    name: "Network Marketing Full-stack",
    description:
      "Network Marketing Platform is a full-stack web application for managing a multi-level marketing (MLM) system. It allows users to register, refer others through unique affiliate links, track team members, view transaction and purchase histories, and monitor course progress.",
    imageUrl: "/images/network-marketing-project.png",
    liveUrl: "#",
    githubUrl: "https://github.com/anupPradhan0/Network-Marketing",
    tech: [
      "MongoDB",
      "Express",
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind",
    ],
  },
  {
    name: "AI Fiesta clone Fun projects",
    description:
      "AI Madness is a premium web application that lets users submit a single prompt and instantly compare responses from multiple AI models (ChatGPT, Claude, Gemini, Perplexity, DeepSeek) on one dashboard. Built with Node.js, Express, MongoDB, and Cohere API, featuring glassmorphism design, neon effects, and toggle-enabled AI panels for seamless multi-model testing.",
    imageUrl: "/images/ai-fiesta-project.png",
    liveUrl: "https://ai-madness.onrender.com/",
    githubUrl: "https://github.com/anupPradhan0/AI-Madness",
    tech: [
      "Node.js",
      "MongoDB",
      "Express",
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind",
      "Cohere AI",
    ],
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export interface SkillsCategory {
  ai_architecture: string[];
  backend: string[];
  frontend: string[];
  databases: string[];
  cloud_devops: string[];
  ecommerce_cms: string[];
}

export const skills: SkillsCategory = {
  ai_architecture: [
    "Agentic Workflows",
    "AI-Augmented Solutions",
    "Multi-tenant Architecture",
    "Harness Design",
  ],
  backend: [
    ".NET Core",
    "ASP.NET",
    "Node.js",
    "Fastify",
    "Express.js",
    "Python",
    "Microservices",
    "BDD/TDD",
  ],
  frontend: ["React TS", "Next.js", "JavaScript", "TypeScript"],
  databases: [
    "SQL Server",
    "MySQL",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "ElasticSearch",
  ],
  cloud_devops: [
    "Docker",
    "Azure",
    "AWS",
    "Google Cloud",
    "CI/CD",
    "Docker",
    "Nginx",
    "Cloudflare",
    "Service Bus",
  ],
  ecommerce_cms: ["Shopify Plus", "Wix"],
};

// Faux shell command shown above each skill category.
export const skillCommands: Record<keyof SkillsCategory, string> = {
  ai_architecture: "cat /skills/architecture/agents.md",
  backend: "ps aux | grep backend",
  frontend: "cat /skills/frontend/stack.txt",
  databases: "show databases;",
  cloud_devops: "kubectl get deployments -A",
  ecommerce_cms: "ls /skills/ecommerce/",
};

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const CONTACT_EMAIL = "binhhp20@gmail.com";
export const CONTACT_LOCATION = "Bhubaneswar, Odisha, India";

// Icon rendering differs between the static page and the terminal pane, so each
// side keys its own icon set off `name`; only the link metadata lives here.
export interface SocialLinkData {
  name: string;
  href: string;
  color: string;
}

export const socialLinks: SocialLinkData[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/tat-binh-vu-7a28a817b/", color: "blue" },
  { name: "GitHub", href: "https://github.com/billyvu9322", color: "purple" },
];

// ---------------------------------------------------------------------------
// Experience — role start/end dates
//
// Durations are recomputed from these on every render (see lib/duration), so
// the visible "X mos" labels stay current without manual edits each month.
// ---------------------------------------------------------------------------

export const CHATI_INTERN_START = new Date(2019, 11, 1); // Dec 2019
export const CHATI_INTERN_END = new Date(2020, 0, 1); // Jan 2020
export const CHATI_JR_START = new Date(2021, 10, 1); // Nov 2021
export const PROMINDS_START = new Date(2022, 11, 1); // Dec 2022
