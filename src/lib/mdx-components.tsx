import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props) => <p className="mb-4 leading-7" {...props} />,
  a: (props) => (
    <a
      className="text-foreground underline decoration-muted/50 underline-offset-2 hover:decoration-foreground transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => <ul className="mb-4 ml-6 list-disc space-y-1" {...props} />,
  ol: (props) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-2 border-border pl-4 italic text-muted"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border p-4 text-sm"
      {...props}
    />
  ),
  code: (props) => {
    const isInline = typeof props.children === "string";
    if (!isInline) return <code {...props} />;
    return (
      <code
        className="rounded bg-surface px-1.5 py-0.5 text-sm"
        {...props}
      />
    );
  },
  table: (props) => (
    <div className="mb-4 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-surface px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border border-border px-4 py-2"
      {...props}
    />
  ),
};
