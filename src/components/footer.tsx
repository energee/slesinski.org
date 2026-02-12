import { Github, Linkedin } from "lucide-react";
import { SOCIAL_LINKS, AUTHOR_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";

const socialLinks = [
  { href: SOCIAL_LINKS.github, label: "GitHub", icon: Github },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", icon: Linkedin },
] as const;

export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl border-t border-border/60 px-6 py-10">
      <div className="flex flex-col items-center justify-between gap-5 text-sm text-muted sm:flex-row">
        <span>&copy; {new Date().getFullYear()} {AUTHOR_NAME}</span>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="h-4 w-px bg-border" aria-hidden="true" />
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
