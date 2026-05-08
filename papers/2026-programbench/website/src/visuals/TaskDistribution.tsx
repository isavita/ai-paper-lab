import type { DistributionDatum } from "../types";

interface TaskDistributionProps {
  title: string;
  description: string;
  data: DistributionDatum[];
  total?: number;
  valueSuffix?: string;
}

export function TaskDistribution({ title, description, data, total, valueSuffix = "" }: TaskDistributionProps) {
  const denominator = total ?? data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="visual-panel compact-visual">
      <div className="visual-heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="bar-stack">
        {data.map((item) => {
          const width = Math.max((item.value / denominator) * 100, 3);

          return (
            <article className="horizontal-bar" key={item.label}>
              <div className="bar-label">
                <strong>{item.label}</strong>
                <span>
                  {item.value.toLocaleString()}
                  {valueSuffix}
                </span>
              </div>
              <div className="bar-track" aria-hidden="true">
                <div className="bar-fill" style={{ width: `${width}%` }} />
              </div>
              {item.detail ? <p>{item.detail}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
