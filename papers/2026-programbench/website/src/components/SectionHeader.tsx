import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </header>
  );
}
