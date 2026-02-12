interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}
