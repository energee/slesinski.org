import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/constants";
import { Tag } from "@/components/tag";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group -mx-3 rounded-lg px-3 py-4 transition-colors hover:bg-surface">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-lg font-medium group-hover:text-foreground/70 transition-colors">
            {post.title}
          </h2>
          <span className="flex shrink-0 items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>
              {formatDate(post.date, { month: "short" })}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime} min read</span>
          </span>
        </div>
        <p className="mt-1 text-sm text-muted leading-relaxed">
          {post.summary}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
