import { Metadata } from "next";

// Enhanced SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://billyvu.nimo.io.vn"),
  title: "About Me | Full-stack Developer & Microsoft MVP",
  description:
    "Passionate and versatile Full-stack Developer with a track record of building complex scalable services and AI-augmented solutions. Microsoft MVP in Developer Technologies specializing in agentic workflows, multi-tenant architecture, .NET, Node.js, React TS, Next.js, Shopify Plus, and Wix.",
  keywords: [
    "Software Developer",
    "Software Developer Bhubaneswar",
    "Software Developer India",
    "Backend Developer",
    "MongoDB Developer",
    "Express.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Machine Learning Developer",
    "Machine Learning",
    "TensorFlow",
    "RESTful API Development",
    "JWT Authentication",
    "Tailwind CSS",
    "Docker",
    "Cloud Deployment",
    "Amity University BCA",
    "Web Developer India",
    "API Development",
    "Next.js Developer",
    "Python Developer",
    "Developer Portfolio",
    "Freelance Developer",
  ],
  authors: [{ name: "Binh Vu", url: "https://billyvu.nimo.io.vn" }],
  creator: "Binh Vu",
  publisher: "Binh Vu",
  openGraph: {
    title: "About Me | Full-stack Developer & Microsoft MVP",
    description:
      "Full-stack Developer and Microsoft MVP in Developer Technologies specializing in agentic workflows, multi-tenant architecture, .NET, Node.js, cloud systems, and scalable e-commerce experiences.",
    type: "profile",
    url: "https://billyvu.nimo.io.vn/about",
    siteName: "Binh Vu - Developer Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "https://billyvu.nimo.io.vn/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Binh Vu - Full-stack Developer & Microsoft MVP",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnupPradhan0",
    creator: "@AnupPradhan0",
    title: "About Me | Full-stack Developer & Microsoft MVP",
    description:
      "Full-stack Developer focused on agentic workflows, backend systems, cloud infrastructure, and scalable web experiences.",
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
    canonical: "https://billyvu.nimo.io.vn/about",
    languages: {
      en: "https://billyvu.nimo.io.vn/about",
    },
  },
  category: "Technology",
  classification: "Developer Portfolio",
};

// Simplified SVG Icons
const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Code icon"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const SystemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="System design icon"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// Enhanced JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://billyvu.nimo.io.vn/#person",
  name: "Binh Vu",
  givenName: "Binh",
  familyName: "Vu",
  url: "https://billyvu.nimo.io.vn",
  mainEntityOfPage: "https://billyvu.nimo.io.vn/about",
  image: "https://billyvu.nimo.io.vn/images/logo.jpg",
  email: "mailto:binhhp20@gmail.com",
  jobTitle: "Full-stack Developer",
  description:
    "Passionate and versatile Full-stack Developer and Microsoft MVP in Developer Technologies building complex scalable services and AI-augmented solutions with strong depth in .NET, Node.js, agentic workflows, multi-tenant architecture, and modern commerce platforms.",
  worksFor: [
    { "@type": "Organization", name: "Add-On Development" },
    { "@type": "Organization", name: "iCommerce" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  nationality: { "@type": "Country", name: "India" },
  knowsLanguage: ["English", "Hindi", "Odia"],
  knowsAbout: [
    "Software Development",
    "Backend Development",
    "Full Stack Development",
    "AI Calling",
    "WebRTC",
    "SIP",
    "Real-time Voice",
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Machine Learning",
    "TensorFlow",
    "RESTful API",
    "JWT Authentication",
    "Tailwind CSS",
    "Docker",
    "Git",
    "Cloudinary",
    "Vercel",
    "Render",
    "Python",
    "scikit-learn",
    "NumPy",
    "pandas",
    "System Design",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Amity University",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "Bachelor's Degree",
      about: "Bachelor of Computer Application (BCA)",
      recognizedBy: {
        "@type": "EducationalOrganization",
        name: "Amity University",
      },
    },
  ],
  skills:
    "Agentic Workflows, AI-Augmented Solutions, Multi-tenant Architecture, Harness Design, .NET Core, ASP.NET, Node.js, React TS, Next.js, Shopify Plus, Wix, CI/CD, Cloud Infrastructure",
  sameAs: [
    "https://github.com/billyvu9322",
    "https://www.linkedin.com/in/tat-binh-vu-7a28a817b/",
  ],
};

// AboutPage Structured Data — wraps the Person and is the page's primary entity
const aboutPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://billyvu.nimo.io.vn/about#aboutpage",
  url: "https://billyvu.nimo.io.vn/about",
  name: "About Binh Vu",
  description:
    "About Binh Vu — Full-stack Developer and Microsoft MVP focused on agentic workflows, multi-tenant systems, robust backend ecosystems, and scalable e-commerce delivery.",
  inLanguage: "en-IN",
  mainEntity: { "@id": "https://billyvu.nimo.io.vn/#person" },
  author: { "@id": "https://billyvu.nimo.io.vn/#person" },
  about: { "@id": "https://billyvu.nimo.io.vn/#person" },
  primaryImageOfPage: "https://billyvu.nimo.io.vn/images/logo.jpg",
  isPartOf: { "@id": "https://billyvu.nimo.io.vn/#website" },
  breadcrumb: {
    "@id": "https://billyvu.nimo.io.vn/about#breadcrumb",
  },
  datePublished: "2025-03-01",
  dateModified: new Date().toISOString().slice(0, 10),
};

// Breadcrumb Structured Data
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://billyvu.nimo.io.vn/about#breadcrumb",
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
      name: "About",
      item: "https://billyvu.nimo.io.vn/about",
    },
  ],
};

// Main Server Component - Lightweight Version
export default function About() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageStructuredData),
        }}
      />
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

      <div lang="en">
        {/* Main content */}
        <main>
          {/* Header */}
          <header>
            <h1 itemProp="name">About Me</h1>
            <p>
              By{" "}
              <a
                href="https://billyvu.nimo.io.vn"
                rel="author"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">Binh Vu</span>
              </a>
              {" · "}
              <span itemProp="jobTitle">Full-stack Developer</span>
              {" · "}
              <a href="mailto:binhhp20@gmail.com" rel="me">
                binhhp20@gmail.com
              </a>
            </p>
          </header>

          <div>
            {/* About Me Section */}
            <section id="about-section" aria-labelledby="about-heading">
              <div>
                <span>$</span>
                <h2 id="about-heading">About Me</h2>
              </div>

              <div>
                <p>
                  I&apos;m a <strong>passionate and versatile Full-stack Developer</strong> with a strong track record of building complex, scalable services and cutting-edge AI-augmented solutions. As a <strong>Microsoft MVP in Developer Technologies</strong>, I specialize in agentic workflows, multi-tenant architectures, and robust backend ecosystems using .NET and Node.js. I thrive in dynamic environments, blending technical precision with modern AI tools to accelerate development.
                </p>

                <div role="list" aria-label="Technical skills">
                  {[
                    ".NET",
                    "Agentic Workflows",
                    "Node.js",
                    "Cloud Infrastructure",
                    "CI/CD",
                    "Shopify Plus",
                    "Wix",
                    "React TS",
                    "Next.js",
                  ].map((tech) => (
                    <span key={tech} role="listitem">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education-section" aria-labelledby="education-heading">
              <div>
                <span>$</span>
                <h2 id="education-heading">Education</h2>
              </div>

              <div
                itemScope
                itemType="https://schema.org/EducationalOccupationalCredential"
              >
                {/* Amity University */}
                <article
                  aria-labelledby="amity-heading"
                  itemScope
                  itemType="https://schema.org/EducationalOrganization"
                >
                  <div>
                    <h3 id="amity-heading" itemProp="name">
                      Amity University
                    </h3>
                    <time dateTime="2024/2027" itemProp="temporalCoverage">
                      2024 — 2027
                    </time>
                  </div>
                  <p itemProp="description">
                    Pursuing Bachelor of Computer Application (BCA) with strong
                    academic performance.
                  </p>
                  <div>
                    <span itemProp="credentialCategory">CGPA: 8.93</span>
                  </div>
                </article>

                {/* Autonomous College Khariar */}
                <article
                  aria-labelledby="ack-heading"
                  itemScope
                  itemType="https://schema.org/EducationalOrganization"
                >
                  <div>
                    <h3 id="ack-heading" itemProp="name">
                      Autonomous College Khariar
                    </h3>
                    <time dateTime="2022/2024" itemProp="temporalCoverage">
                      2022 — 2024
                    </time>
                  </div>
                  <p itemProp="description">
                    Completed higher secondary education (11th and 12th grade)
                    specializing in Information Technology.
                  </p>
                </article>

                {/* High School */}
                <article
                  aria-labelledby="highschool-heading"
                  itemScope
                  itemType="https://schema.org/EducationalOrganization"
                >
                  <div>
                    <h3 id="highschool-heading" itemProp="name">
                      High School
                    </h3>
                    <time dateTime="2009/2022" itemProp="temporalCoverage">
                      2009 — 2022
                    </time>
                  </div>
                  <p itemProp="description">
                    Completed primary and secondary education, building
                    foundational knowledge.
                  </p>
                </article>
              </div>
            </section>

            {/* Current focus */}
            <section id="focus-section" aria-labelledby="focus-heading">
              <div>
                <span>$</span>
                <h2 id="focus-heading">What I&apos;m Doing</h2>
              </div>

              <div>
                {/* Software Engineer @ Add-On Development */}
                <article>
                  <div>
                    <CodeIcon />
                  </div>
                  <h3>Software Engineer @ Add-On Development</h3>
                  <p>
                    Designing and implementing <strong>agentic workflows</strong>, multi-tenant architectures, and complex system harnesses using .NET, Node.js, cloud infrastructure, and CI/CD pipelines.
                  </p>
                </article>

                {/* System Design & Automation */}
                <article>
                  <div>
                    <SystemIcon />
                  </div>
                  <h3>Freelance Web Developer @ iCommerce</h3>
                  <p>
                    Delivering tailored e-commerce and web solutions with high scalability and optimized UI/UX across <strong>Shopify Plus</strong>, <strong>Wix</strong>, <strong>React TS</strong>, and <strong>Next.js</strong>.
                    and building small automation tools to remove repetitive
                    work from my day-to-day flow.
                  </p>
                </article>
              </div>
            </section>

            {/* Status footer */}
            <footer>
              <div>
                <span>Status: Ready for new challenges</span>
                <span>Online</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
