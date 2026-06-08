import { Metadata } from "next";
import { durationLabel, formatMonths, monthsBetween } from "@/lib/duration";
import {
  CHATI_INTERN_START,
  CHATI_INTERN_END,
  CHATI_JR_START,
  PROMINDS_START,
} from "@/lib/portfolio-data";

const SITE_URL = "https://billyvu.nimo.io.vn";
const AUTHOR_NAME = "Binh Vu";


// Static page — re-render daily so durations stay fresh between deploys.
export const revalidate = 86400;

// SEO Metadata for Experience page
export const metadata: Metadata = {
  metadataBase: new URL("https://billyvu.nimo.io.vn"),
  title: "Experience | Software Engineer · Add-On Development · iCommerce",
  description:
    "Experience of Binh Vu: Software Engineer at Add-On Development designing agentic workflows, multi-tenant architectures, and complex system harnesses; Freelance Web Developer at iCommerce delivering scalable e-commerce and web solutions; former Intern .NET Developer at 3i Company.",
  keywords: [
    "Binh Vu Experience",
    "Junior Software Developer",
    "Lead AI Engineer",
    "Software Engineer Add-On Development",
    "Intern .NET Developer 3i Company",
    "Software Developer Bhubaneswar",
    "AI Voice Calling SaaS",
    "FreeSWITCH Developer",
    "WebRTC Developer",
    "ESL Developer",
    "VoIP Engineer",
    "STT TTS LLM Pipeline",
    "AI Meeting Assistant",
    "AutoPulse CRM",
    "iCommerce",
    "Backend Developer India",
    "Data Pipeline Engineer",
    "Union-Find Deduplication",
    "RabbitMQ",
    "Bhubaneswar Software Developer",
  ],
  authors: [{ name: "Binh Vu", url: "https://billyvu.nimo.io.vn" }],
  creator: "Binh Vu",
  publisher: "Binh Vu",
  openGraph: {
    title: "Experience | Software Engineer · Add-On Development · iCommerce",
    description:
      "Software Engineer at Add-On Development, Freelance Web Developer at iCommerce, and former Intern .NET Developer at 3i Company.",
    type: "profile",
    url: "https://billyvu.nimo.io.vn/experience",
    siteName: "Binh Vu - Developer Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "https://billyvu.nimo.io.vn/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Binh Vu — Junior Software Developer (Lead AI Engineer) experience",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnupPradhan0",
    creator: "@AnupPradhan0",
    title: "Experience | Software Engineer · Add-On Development · iCommerce",
    description:
      "Software Engineer at Add-On Development, Freelance Web Developer at iCommerce, and former Intern .NET Developer at 3i Company.",
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
    canonical: "https://billyvu.nimo.io.vn/experience",
    languages: {
      en: "https://billyvu.nimo.io.vn/experience",
    },
  },
  category: "Technology",
  classification: "Professional Experience",
};

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    url: SITE_URL,
    mainEntityOfPage: `${SITE_URL}/experience`,
    image: `${SITE_URL}/images/logo.jpg`,
  jobTitle: "Software Engineer",
    hasOccupation: [
      {
        "@type": "EmployeeRole",
        roleName: "Software Engineer",
        startDate: toIso(CHATI_JR_START),
        worksFor: {
          "@type": "Organization",
            name: "Add-On Development",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhubaneswar",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "EmployeeRole",
        roleName: "Intern .NET Developer",
        startDate: toIso(CHATI_INTERN_START),
        endDate: toIso(CHATI_INTERN_END),
        worksFor: { "@type": "Organization", name: "3i Company" },
      },
      {
        "@type": "EmployeeRole",
        roleName: "Freelance Web Developer",
        startDate: toIso(PROMINDS_START),
        worksFor: {
          "@type": "Organization",
          name: "iCommerce",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhubaneswar",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/experience#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experience",
        item: `${SITE_URL}/experience`,
      },
    ],
  };

  return { personSchema, breadcrumbSchema };
}

export default function Experience() {
  const { personSchema, breadcrumbSchema } = buildStructuredData();
  const now = new Date();

  const chatiTotal = durationLabel(CHATI_INTERN_START, now);
  const chatiJr = durationLabel(CHATI_JR_START, now);
  const chatiIntern = formatMonths(monthsBetween(CHATI_INTERN_START, CHATI_INTERN_END));
  const promindsTotal = durationLabel(PROMINDS_START, now);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section
        id="experience-section"
        aria-labelledby="experience-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div lang="en">
          <header>
            <h1 id="experience-heading" itemProp="name">
              Experience
            </h1>
            <p>
              Professional roles across Add-On Development, iCommerce, and 3i Company — spanning agentic workflows, multi-tenant architecture, scalable web delivery, and .NET backend foundations.
            </p>
          </header>

          <div>
            {/* CHATI */}
            <article
              aria-labelledby="chati-heading"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <header>
                <h2 id="chati-heading" itemProp="name">
                  Add-On Development
                </h2>
                <p>
                  <strong>{chatiTotal}</strong> · Bhubaneswar, Odisha, India ·
                  Full-time
                </p>
              </header>

              {/* Junior Software Developer — Lead AI Engineer (current) */}
              <section aria-labelledby="chati-jr-heading">
                <h3 id="chati-jr-heading">
                  Software Engineer · Full-time
                </h3>
                <p>
                  <time dateTime={toIso(CHATI_JR_START)}>Nov 2021</time> —
                  Present · {chatiJr}
                </p>
                <ul itemProp="description">
                  <li>
                    Designing and implementing agentic workflows for complex software systems.
                  </li>
                  <li>
                    Building multi-tenant architectures and system harnesses for scalable services.
                  </li>
                  <li>
                    Working with .NET, Node.js, cloud infrastructure, and CI/CD pipelines in production environments.
                  </li>
                </ul>
              </section>

              {/* Software Developer Intern */}
              <section aria-labelledby="chati-intern-heading">
                <h3 id="chati-intern-heading">
                  Intern .NET Developer
                </h3>
                <p>
                  <time dateTime={toIso(CHATI_INTERN_START)}>Dec 2019</time> —{" "}
                  <time dateTime={toIso(CHATI_INTERN_END)}>Jan 2020</time> ·{" "}
                  {chatiIntern}
                </p>
                <ul itemProp="description">
                  <li>
                    Assisted in developing backend services using ASP.NET and C#.
                  </li>
                  <li>
                    Learned industry-standard software development lifecycles in a professional setting.
                  </li>
                  <li>
                    Built practical experience in .NET backend development and delivery workflows.
                  </li>
                </ul>
              </section>
            </article>

            {/* Prominds Digital */}
            <article
              aria-labelledby="prominds-heading"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <header>
                <h2 id="prominds-heading" itemProp="name">
                  iCommerce
                </h2>
                <p>
                  <strong>Freelance / Remote · {promindsTotal}</strong>
                </p>
              </header>

              <ul itemProp="description">
                <li>
                  Delivering tailored e-commerce and web solutions with strong scalability and optimized UI/UX.
                </li>
                <li>
                  Building with Shopify Plus, Wix, React TS, and Next.js based on client needs.
                </li>
                <li>
                  Focusing on scalable storefront and website experiences for freelance clients.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

