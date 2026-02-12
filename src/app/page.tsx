import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { Tag } from "@/components/tag";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";

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
        <SectionHeading>About</SectionHeading>
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

      {projects.length > 0 && (
        <section className="mb-16 border-t border-border/60 pt-16">
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.title} className="-mx-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface">
                <h3 className="font-medium">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-foreground/70 transition-colors"
                    >
                      {project.title}
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border/60 pt-16">
        <SectionHeading>Latest Posts</SectionHeading>
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
