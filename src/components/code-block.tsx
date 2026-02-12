"use client";

import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  raw: string;
  children: React.ReactNode;
}

export function CodeBlock({ raw, children }: CodeBlockProps) {
  return (
    <div className="group/code relative">
      <CopyButton text={raw} />
      {children}
    </div>
  );
}
