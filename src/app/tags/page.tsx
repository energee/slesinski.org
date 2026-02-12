import type { Metadata } from "next";
import Link from "next/link";

import { BackLink } from "@/components/back-link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by tag.",
};

export default function TagsPage() {
  const tags = getAllTags();
  const sorted = [...tags.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <>
      <BackLink href="/">Back</BackLink>

      <h1 className="mb-8 text-3xl font-bold tracking-tight">Tags</h1>

      <div className="flex flex-wrap gap-3">
        {sorted.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            {tag}{" "}
            <span className="text-xs text-muted/60">({count})</span>
          </Link>
        ))}
      </div>
    </>
  );
}
