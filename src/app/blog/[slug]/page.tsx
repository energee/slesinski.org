import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { BackLink } from "@/components/back-link";
import { JsonLd } from "@/components/json-ld";
import { Tag } from "@/components/tag";
import { TableOfContents } from "@/components/table-of-contents";
import { SITE_URL, formatDate } from "@/lib/constants";
import { mdxComponents } from "@/lib/mdx-components";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/metadata";
import { getAllSlugs, getPostBySlug, extractHeadings } from "@/lib/posts";
import { rehypeCodeWrapper } from "@/lib/rehype-code-wrapper";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);

  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      title: meta.title,
      description: meta.summary,
      type: "article",
      publishedTime: meta.date,
      ...(meta.updated && { modifiedTime: meta.updated }),
      url: `${SITE_URL}/blog/${meta.slug}`,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);
  const headings = extractHeadings(content);

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: { dark: "github-dark", light: "github-light" },
              keepBackground: false,
            },
          ],
          rehypeCodeWrapper,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  return (
    <>
      <JsonLd data={articleJsonLd(meta)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/" },
          { name: meta.title, href: `/blog/${meta.slug}` },
        ])}
      />

      <BackLink href="/">Back</BackLink>

      <article>
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">{meta.title}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{meta.readingTime} min read</span>
            {meta.updated && (
              <span>
                (updated{" "}
                <time dateTime={meta.updated}>
                  {formatDate(meta.updated)}
                </time>
                )
              </span>
            )}
          </div>
          {meta.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Tag key={tag} href={`/tags/${tag}`}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </header>

        {headings.length > 0 && <TableOfContents headings={headings} />}

        <div className="prose">{mdxContent}</div>
      </article>
    </>
  );
}
