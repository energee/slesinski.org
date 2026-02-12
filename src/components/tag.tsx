import Link from "next/link";

interface TagProps {
  children: string;
  href?: string;
}

export function Tag({ children, href }: TagProps) {
  const className =
    "rounded-full border border-border px-2.5 py-0.5 text-xs text-muted hover:text-foreground hover:border-foreground/30 transition-colors";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}
