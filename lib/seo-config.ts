/** Shared site SEO constants — single source of truth for URLs and author. */
export const SITE_URL = "https://billyvu.nimo.io.vn";
export const SITE_NAME = "Binh Vu";
export const SITE_TAGLINE = "Full-stack Developer & Microsoft MVP";
export const AUTHOR_URL = SITE_URL;
export const TWITTER_HANDLE = "@AnupPradhan0";
export const DEFAULT_OG_IMAGE = "/images/logo.jpg";
export const LOGO_URL = `${SITE_URL}/images/logo.jpg`;

export const BLOG_PATH = "/blog";
export const BLOG_RSS_PATH = "/blog/rss.xml";
export const BLOG_CANONICAL = `${SITE_URL}${BLOG_PATH}`;
export const BLOG_RSS_URL = `${SITE_URL}${BLOG_RSS_PATH}`;

export const BLOG_DESCRIPTION =
  "Developer blog by Binh Vu — essays on backend engineering, system design, WebRTC/SIP, AI calling, open-source security, supply-chain risk, and experiments from real projects.";

export function toIsoDateTime(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function postOgImageUrl(slug: string): string {
  return absoluteUrl(`/blog/${slug}/opengraph-image`);
}
