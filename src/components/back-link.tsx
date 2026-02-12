import Link from "next/link";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
    >
      &larr; {children}
    </Link>
  );
}
