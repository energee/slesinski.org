# slesinski.org

Personal site and blog built with Next.js, Tailwind CSS, and MDX.

## Stack

- **Next.js 16** with static export
- **Tailwind CSS v4** for styling
- **MDX** blog posts with rehype-pretty-code syntax highlighting
- **Geist** font family

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output is generated in the `out/` directory.

## Adding a blog post

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Post Title"
date: "2026-01-01"
summary: "A short summary."
tags: ["tag1", "tag2"]
---

Your content here.
```

## Deployment

Deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.
