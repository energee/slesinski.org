import type { Metadata } from "next";

import { BackLink } from "@/components/back-link";
import { PostCard } from "@/components/post-card";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getAllTags().keys()].map((tag) => ({ tag }));
}

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `All posts tagged with "${tag}".`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <>
      <BackLink href="/tags">All Tags</BackLink>

      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Posts tagged &ldquo;{tag}&rdquo;
      </h1>

      <div className="space-y-1">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
