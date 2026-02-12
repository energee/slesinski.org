interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}
