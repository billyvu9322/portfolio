import { Metadata } from "next";
import type { ReactNode } from "react";
import {
  skills as skillsData,
  skillCommands as terminalCommands,
  type SkillsCategory,
} from "@/lib/portfolio-data";

// Enhanced SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://billyvu.nimo.io.vn"),
  title: "Skills & Tech Stack | Full-stack Developer",
  description:
    "Technical skills of Binh Vu covering agentic workflows, multi-tenant architecture, .NET, Node.js, React TS, Next.js, SQL and NoSQL databases, cloud infrastructure, CI/CD, Shopify Plus, and Wix.",
  keywords: [
    "Agentic Workflow Skills",
    "JavaScript Developer",
    "TypeScript Expert",
    "React Developer",
    "Node.js Backend",
    "MongoDB Database",
    "Express.js API",
    "Next.js Framework",
    "Python Programming",
    "TensorFlow Machine Learning",
    "Docker Containers",
    "Full Stack Technologies",
    "Web Development Skills",
    "REST API Development",
    "Git Version Control",
    "Cloud Deployment Skills",
    "Full Stack Developer Bhubaneswar",
    "Full Stack Developer India",
    "AI ML Developer",
    "Machine Learning Skills",
  ],
  authors: [{ name: "Binh Vu", url: "https://billyvu.nimo.io.vn" }],
  creator: "Binh Vu",
  publisher: "Binh Vu",
  openGraph: {
    title: "Skills & Tech Stack | Full-stack Developer",
    description:
      "Expertise in AI-augmented architecture, backend systems, cloud infrastructure, modern frontend development, and e-commerce platforms.",
    type: "website",
    url: "https://billyvu.nimo.io.vn/skills",
    siteName: "Binh Vu - Developer Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "https://billyvu.nimo.io.vn/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Binh Vu - Skills & Tech Stack",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnupPradhan0",
    creator: "@AnupPradhan0",
    title: "Skills & Tech Stack | Full-stack Developer",
    description:
      "Full-stack expertise across .NET, Node.js, React TS, cloud systems, agentic workflows, and e-commerce platforms.",
    images: ["https://billyvu.nimo.io.vn/images/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://billyvu.nimo.io.vn/skills",
    languages: {
      en: "https://billyvu.nimo.io.vn/skills",
    },
  },
  category: "Technology",
  classification: "Skills Portfolio",
};

// Type definitions

interface CategoryConfig {
  key: keyof SkillsCategory;
  title: string;
  icon: ReactNode;
  skills: string[];
}


// Simplified SVG Icons
const CodeIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M8.7 15.9L4.8 12l3.9-3.9c.39-.39.39-1.01 0-1.4s-1.01-.39-1.4 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41l4.59 4.6c.39.39 1.01.39 1.4 0 .39-.39.39-1.01 0-1.41zm6.6 0l3.9-3.9-3.9-3.9c-.39-.39-.39-1.01 0-1.4s1.01-.39 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6c-.39.39-1.01.39-1.4 0-.39-.39-.39-1.01 0-1.41z" />
  </svg>
);

const LayersIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" />
  </svg>
);

const ServerIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M4 1h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm2 2v2h2v-2H6zm0-8v2h2V3H6zm12 8v2h2v-2h-2zm0-8v2h2V3h-2z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z" />
  </svg>
);

const ToolIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
);

const DeployIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-1.41-1.41L13.17 13H7v-2h6.17l-2.58-2.59L12 7l5 5z" />
  </svg>
);

// Enhanced JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Binh Vu",
  url: "https://billyvu.nimo.io.vn",
  image: "https://billyvu.nimo.io.vn/images/logo.jpg",
  knowsAbout: [
    ...skillsData.ai_architecture,
    ...skillsData.frontend,
    ...skillsData.backend,
    ...skillsData.databases,
    ...skillsData.cloud_devops,
    ...skillsData.ecommerce_cms,
  ],
  jobTitle: "Full-stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Programming Language",
      competencyRequired: "JavaScript, TypeScript, Python",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Web Development",
      competencyRequired: "React, Node.js, MongoDB, Express.js",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "DevOps & Tools",
      competencyRequired: "Git, Docker, Linux",
    },
  ],
  skills:
    "Full Stack Development, Backend Development, Frontend Development, Database Management, Machine Learning, AI Development",
};

// Breadcrumb Structured Data
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://billyvu.nimo.io.vn",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Skills",
      item: "https://billyvu.nimo.io.vn/skills",
    },
  ],
};

// Lightweight Terminal Window Component
const TerminalWindow = ({
  title,
  command,
  icon,
  skills,
}: {
  title: string;
  command: string;
  icon: ReactNode;
  skills: string[];
}) => {
  return (
    <div itemScope itemType="https://schema.org/ItemList">
      {/* Terminal header */}
      <div>
        <div>
          <div aria-hidden="true">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span>
            ~ {title}
          </span>
        </div>
        <div aria-hidden="true"></div>
      </div>

      {/* Terminal content */}
      <div>
        {/* Command line */}
        <div>
          <span>$</span>
          <span>{command}</span>
        </div>

        {/* Skills output */}
        <div>
          <div>
            {icon}
            <span>
              {title.toLowerCase()}_modules:
            </span>
          </div>
          <div
            role="list"
            aria-label={`${title} skills`}
            itemProp="itemListElement"
          >
            {skills.map((skill) => (
              <span
                key={skill}
                role="listitem"
                itemProp="name"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Server Component - Lightweight Version
export default function Skills() {
  const categories: CategoryConfig[] = [
    {
      key: "ai_architecture",
      title: "AI & Architecture",
      icon: <CodeIcon />,
      skills: skillsData.ai_architecture,
    },
    {
      key: "backend",
      title: "Backend Development",
      icon: <ServerIcon />,
      skills: skillsData.backend,
    },
    {
      key: "frontend",
      title: "Frontend Development",
      icon: <LayersIcon />,
      skills: skillsData.frontend,
    },
    {
      key: "databases",
      title: "Databases & Caching",
      icon: <DatabaseIcon />,
      skills: skillsData.databases,
    },
    {
      key: "cloud_devops",
      title: "Cloud & DevOps",
      icon: <DeployIcon />,
      skills: skillsData.cloud_devops,
    },
    {
      key: "ecommerce_cms",
      title: "E-commerce & CMS",
      icon: <ToolIcon />,
      skills: skillsData.ecommerce_cms,
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <section
        id="skills-section"
        aria-labelledby="skills-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div lang="en">
          {/* Header */}
          <header>
            <h1
              id="skills-heading"
              itemProp="name"
            >
              <span>&lt;</span>
              <span> Skills & Tech Stack </span>
              <span>/&gt;</span>
            </h1>
            <div>
              <span>$</span> ./skills --interactive --display-all
            </div>
          </header>

          {/* Terminal Windows Grid */}
          <div>
            {categories.map((category) => (
              <TerminalWindow
                key={category.key}
                title={category.title}
                command={terminalCommands[category.key]}
                icon={category.icon}
                skills={category.skills}
              />
            ))}
          </div>

          {/* Footer */}
          <footer>
            <p>
              <span>└─$</span>{" "}
              {skillsData.ai_architecture.length +
                skillsData.frontend.length +
                skillsData.backend.length +
                skillsData.databases.length +
                skillsData.cloud_devops.length +
                skillsData.ecommerce_cms.length}{" "}
              total skills across {categories.length} categories
            </p>
          </footer>
        </div>
      </section>
    </>
  );
}
