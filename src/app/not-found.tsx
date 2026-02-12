import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-muted">This page doesn't exist.</p>
      <Link
        href="/"
        className="mt-6 text-sm text-muted hover:text-foreground transition-colors hover-underline"
      >
        Back home
      </Link>
    </div>
  );
}
