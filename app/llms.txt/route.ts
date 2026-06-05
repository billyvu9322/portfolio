import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { getLlmsTemplate, getSiteUrl } from "@/lib/llms";

export const dynamic = "force-static";

export async function GET() {
  const SITE_URL = getSiteUrl();
  const posts = getAllPosts();

  const postLines = posts.flatMap((p) => [
    `Post: ${p.title}`,
    `URL: ${SITE_URL}/blog/${p.slug}`,
    p.date ? `Published: ${p.date}` : null,
    p.excerpt ? `Summary: ${p.excerpt}` : null,
    p.tags && p.tags.length > 0 ? `Tags: ${p.tags.join(", ")}` : null,
    "",
  ]).filter((l): l is string => l !== null);

  const content = getLlmsTemplate()
    .replaceAll("{{SITE_URL}}", SITE_URL)
    .replaceAll(
      "{{POST_LINES}}",
      (postLines.length > 0 ? postLines : ["(no posts yet)", ""]).join("\n")
    );

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
