import fs from "node:fs";
import path from "node:path";

const LLM_TEMPLATE_PATH = path.join(
  process.cwd(),
  "content",
  "llms",
  "llms-template.md"
);

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://billyvu.nimo.io.vn")
  );
}

export function getLlmsTemplate(): string {
  return fs.readFileSync(LLM_TEMPLATE_PATH, "utf8");
}
