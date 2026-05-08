import type { StatCard } from "../types";

interface MetricCardProps {
  stat: StatCard;
}

export function MetricCard({ stat }: MetricCardProps) {
  return (
    <article className={`metric-card metric-${stat.tone}`}>
      <span>{stat.label}</span>
      <strong>{stat.value}</strong>
      <p>{stat.detail}</p>
    </article>
  );
}
