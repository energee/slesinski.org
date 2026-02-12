export interface Project {
  title: string;
  description: string;
  href?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Personal Site",
    description:
      "This site. A statically-exported Next.js blog with MDX, AEO-optimized structured data, and dark mode.",
    href: "https://github.com/energee/tedslesinski.github.io",
    tags: ["next.js", "mdx", "tailwind"],
  },
  // Add more projects here
];
