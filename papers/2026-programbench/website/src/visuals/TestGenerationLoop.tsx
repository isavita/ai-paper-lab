import { CheckCircle2, FileSearch, Repeat2, TestTube2, TriangleAlert } from "lucide-react";

const loopSteps = [
  { label: "Probe executable", icon: FileSearch, text: "Run flags, docs examples, inputs, and existing behavioral tests." },
  { label: "Write tests", icon: TestTube2, text: "Codify observed behavior as pytest assertions." },
  { label: "Measure coverage", icon: Repeat2, text: "Use line coverage to locate untested code paths." },
  { label: "Lint assertions", icon: TriangleAlert, text: "Flag empty, weak, disjunctive, or trivially true assertions." },
  { label: "Keep stable tests", icon: CheckCircle2, text: "Discard nondeterministic tests and tests a dummy binary can pass." },
];

export function TestGenerationLoop() {
  return (
    <section className="visual-panel loop-panel">
      <div className="visual-heading">
        <h3>Coverage-Guided Test Generation Loop</h3>
        <p>The paper's strongest test-generation strategy repeatedly probes, measures, and revises.</p>
      </div>
      <div className="loop-track">
        {loopSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article className="loop-step" key={step.label}>
              <span>{index + 1}</span>
              <Icon size={23} />
              <h4>{step.label}</h4>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
