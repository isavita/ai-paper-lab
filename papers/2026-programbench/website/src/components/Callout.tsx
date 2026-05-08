import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

interface CalloutProps {
  title: string;
  children: ReactNode;
  tone?: "info" | "success" | "warning" | "critical";
}

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: Lightbulb,
  critical: AlertTriangle,
};

export function Callout({ title, children, tone = "info" }: CalloutProps) {
  const Icon = icons[tone];

  return (
    <section className={`callout callout-${tone}`}>
      <div className="callout-heading">
        <Icon size={18} />
        <h3>{title}</h3>
      </div>
      <div className="callout-body">{children}</div>
    </section>
  );
}
