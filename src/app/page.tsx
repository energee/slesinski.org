import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <section className="mb-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/headshot.png"
            alt="Ted Slesinski"
            width={128}
            height={128}
            className="size-32 rounded-full object-cover shrink-0"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Ted Slesinski
            </h1>
            <p className="mt-2 text-muted leading-relaxed">
              Engineer building with AI. Writing about agentic frameworks,
              AI integration patterns, and the tools shaping how we build
              software.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t border-border/60 pt-16">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          About
        </h2>
        <div className="space-y-4 text-muted leading-7">
          <p>
            I'm a software engineer focused on the intersection of AI and
            developer tooling. Most of my time goes toward building agentic
            systems, designing integration patterns for large language models,
            and figuring out how to make AI useful in real production
            environments rather than just demos.
          </p>
          <p>
            Before getting deep into AI, I spent years working across the stack
            on web applications, distributed systems, and infrastructure. That
            background shapes how I think about LLM-powered features: reliability
            and developer experience matter just as much as the model itself.
          </p>
          <p>
            This site is where I write about what I'm learning along the way.
            Expect posts on agentic frameworks, prompt engineering, tool use
            patterns, and the practical side of shipping AI-powered software.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 pt-16">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          Latest Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <div className="space-y-1">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
