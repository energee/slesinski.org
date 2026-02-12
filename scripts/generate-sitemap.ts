import fs from "fs";
import path from "path";

import { SITE_URL } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

function generateSitemap(): string {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))];
  const today = new Date().toISOString().split("T")[0];

  const urls: { loc: string; lastmod: string }[] = [
    { loc: SITE_URL, lastmod: today },
    { loc: `${SITE_URL}/tags`, lastmod: today },
    ...tags.map((tag) => ({ loc: `${SITE_URL}/tags/${tag}`, lastmod: today })),
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.date,
    })),
  ];

  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const outPath = path.join(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(outPath, generateSitemap(), "utf-8");
console.log("Generated public/sitemap.xml");
