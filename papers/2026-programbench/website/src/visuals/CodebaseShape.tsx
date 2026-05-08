interface ShapeDatum {
  label: string;
  reference: number;
  model: number;
  unit: string;
}

interface CodebaseShapeProps {
  data: ShapeDatum[];
}

export function CodebaseShape({ data }: CodebaseShapeProps) {
  return (
    <section className="visual-panel shape-panel">
      <div className="visual-heading">
        <h3>Reference Codebases Vs Model Reconstructions</h3>
        <p>Paper-reported medians for model solutions passing at least 75% of tests.</p>
      </div>
      <div className="shape-grid">
        {data.map((item) => {
          const maximum = Math.max(item.reference, item.model);
          const referenceWidth = (item.reference / maximum) * 100;
          const modelWidth = (item.model / maximum) * 100;

          return (
            <article className="shape-card" key={item.label}>
              <h4>{item.label}</h4>
              <div className="shape-bars">
                <div>
                  <span>Reference</span>
                  <b className="reference-bar" style={{ width: `${referenceWidth}%` }} />
                  <em>
                    {item.reference.toLocaleString()} {item.unit}
                  </em>
                </div>
                <div>
                  <span>Model</span>
                  <b className="model-bar" style={{ width: `${modelWidth}%` }} />
                  <em>
                    {item.model.toLocaleString()} {item.unit}
                  </em>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
