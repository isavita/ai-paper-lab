import { Boxes, FileText, Hammer, SearchCheck, ShieldCheck, TerminalSquare } from "lucide-react";

const pipelineSteps = [
  {
    title: "Source repository",
    icon: Boxes,
    detail: "Open-source project that builds a standalone executable.",
  },
  {
    title: "Build gold executable",
    icon: Hammer,
    detail: "A SWE-agent compiles the project and records build commands.",
  },
  {
    title: "Generate behavior tests",
    icon: SearchCheck,
    detail: "Agents probe code, docs, executable behavior, and coverage to create hidden pytest suites.",
  },
  {
    title: "Cleanroom task",
    icon: ShieldCheck,
    detail: "Source and implementation artifacts are removed; executable and usage docs remain.",
  },
  {
    title: "Agent reconstruction",
    icon: TerminalSquare,
    detail: "The task worker writes original source and a build script without internet access.",
  },
  {
    title: "Behavioral evaluation",
    icon: FileText,
    detail: "Candidate and gold executable are compared on hidden observable effects.",
  },
];

export function BenchmarkPipeline() {
  return (
    <section className="visual-panel">
      <div className="visual-heading">
        <h3>Benchmark Construction And Evaluation Flow</h3>
        <p>Recreated explanatory diagram based on the paper's pipeline.</p>
      </div>
      <div className="pipeline-grid">
        {pipelineSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article className="pipeline-step" key={step.title}>
              <span className="step-index">{index + 1}</span>
              <Icon size={24} />
              <h4>{step.title}</h4>
              <p>{step.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
