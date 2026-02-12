export const SITE_URL = "https://tedslesinski.github.io";
export const AUTHOR_NAME = "Ted Slesinski";
export const SITE_TITLE = AUTHOR_NAME;
export const SITE_DESCRIPTION =
  "Writing about AI integration, agentic frameworks, and software engineering.";

export const SOCIAL_LINKS = {
  github: "https://github.com/energee",
  linkedin: "https://linkedin.com/in/slesinski",
} as const;

export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}
