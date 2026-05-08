import type { ModelResult } from "../types";

interface ResultsChartProps {
  results: ModelResult[];
}

const familyClass = {
  Anthropic: "family-anthropic",
  Google: "family-google",
  OpenAI: "family-openai",
};

export function ResultsChart({ results }: ResultsChartProps) {
  return (
    <section className="visual-panel results-panel">
      <div className="visual-heading">
        <h3>Main Result Snapshot</h3>
        <p>All models report 0% resolved; the bars show macro-average test pass rate and near-solve rate.</p>
      </div>
      <div className="result-table" role="table" aria-label="ProgramBench model results">
        <div className="result-row result-head" role="row">
          <span>Model</span>
          <span>Macro pass</span>
          <span>Almost</span>
          <span>Avg calls</span>
          <span>Avg cost</span>
        </div>
        {results.map((result) => (
          <div className="result-row" role="row" key={result.model}>
            <span className="model-cell">
              <i className={familyClass[result.family]} />
              {result.model}
            </span>
            <span className="bar-cell">
              <b style={{ width: `${result.macroPass}%` }} />
              <em>{result.macroPass.toFixed(1)}%</em>
            </span>
            <span>{result.almost.toFixed(1)}%</span>
            <span>{result.calls}</span>
            <span>${result.cost.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
