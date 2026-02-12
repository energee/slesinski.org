import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  date: string;
  updated?: string;
  summary: string;
  tags: string[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: number;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

function getMdxFiles(): string[] {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
}

function toSlug(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

function parsePost(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(
    path.join(postsDirectory, `${slug}.mdx`),
    "utf-8"
  );
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      ...(data as PostFrontmatter),
      readingTime: estimateReadingTime(content),
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getMdxFiles()
    .map((filename) => parsePost(toSlug(filename)).meta)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): {
  meta: PostMeta;
  content: string;
} {
  return parsePost(slug);
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map(toSlug);
}

export function getAllTags(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const depth = match[1].length as 2 | 3;
      const text = match[2].trim();
      headings.push({ depth, text, id: slugify(text) });
    }
  }
  return headings;
}
