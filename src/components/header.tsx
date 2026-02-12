import Link from "next/link";
import { SITE_TITLE } from "@/lib/constants";

export function Header() {
  return (
    <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
      <Link href="/" className="text-lg font-semibold hover-underline">
        {SITE_TITLE}
      </Link>
      <nav>
        <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors hover-underline">
          Blog
        </Link>
      </nav>
    </header>
  );
}
