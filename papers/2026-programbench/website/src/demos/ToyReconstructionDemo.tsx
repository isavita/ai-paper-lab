import { Play, RotateCcw, TerminalSquare } from "lucide-react";
import { useMemo, useState } from "react";

type ProbeId = "help" | "count" | "freq" | "stdin" | "empty";

interface Probe {
  id: ProbeId;
  command: string;
  output: string;
  reveals: string[];
}

interface ImplementationPlan {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
}

interface EvaluationCase {
  name: string;
  visibleFrom?: ProbeId;
  requiredCapabilities: string[];
}

const probes: Probe[] = [
  {
    id: "help",
    command: "./wordstat --help",
    output: "Usage: wordstat [count|freq] [--lower] [FILE]\nReads stdin when FILE is omitted.",
    reveals: ["help text", "subcommands", "--lower flag", "stdin fallback"],
  },
  {
    id: "count",
    command: "./wordstat count poem.txt",
    output: "lines=2 words=9 chars=43",
    reveals: ["line count", "word count", "character count"],
  },
  {
    id: "freq",
    command: "./wordstat freq --lower poem.txt",
    output: "the 3\nbench 2\nprogram 1",
    reveals: ["frequency ordering", "case folding", "stable text formatting"],
  },
  {
    id: "stdin",
    command: "printf 'A b b' | ./wordstat freq --lower",
    output: "b 2\na 1",
    reveals: ["pipe input", "lowercased stdin", "descending frequency"],
  },
  {
    id: "empty",
    command: "./wordstat count empty.txt",
    output: "lines=0 words=0 chars=0",
    reveals: ["empty files", "zero-valued summaries"],
  },
];

const implementationPlans: ImplementationPlan[] = [
  {
    id: "stub",
    name: "Observed-output stub",
    description: "Memorizes the exact probes already seen and returns generic output otherwise.",
    capabilities: ["help text"],
  },
  {
    id: "surface",
    name: "Surface CLI clone",
    description: "Implements help text and basic counts, but treats tokenization and stdin casually.",
    capabilities: ["help text", "line count", "word count", "character count"],
  },
  {
    id: "token",
    name: "Token-aware implementation",
    description: "Handles files, stdin, lowercasing, and frequency ordering, but misses empty edge cases.",
    capabilities: [
      "help text",
      "line count",
      "word count",
      "character count",
      "frequency ordering",
      "case folding",
      "pipe input",
      "descending frequency",
    ],
  },
  {
    id: "faithful",
    name: "Faithful toy reconstruction",
    description: "Implements the full toy behavior covered by visible and hidden tests.",
    capabilities: probes.flatMap((probe) => probe.reveals),
  },
];

const evaluationCases: EvaluationCase[] = [
  { name: "Help output names both subcommands", visibleFrom: "help", requiredCapabilities: ["help text", "subcommands"] },
  { name: "File summary matches line, word, and char counts", visibleFrom: "count", requiredCapabilities: ["line count", "word count", "character count"] },
  { name: "Frequency mode lowercases tokens", visibleFrom: "freq", requiredCapabilities: ["frequency ordering", "case folding"] },
  { name: "Stdin path omits filename gracefully", visibleFrom: "stdin", requiredCapabilities: ["pipe input", "descending frequency"] },
  { name: "Empty file returns zero counts", visibleFrom: "empty", requiredCapabilities: ["empty files", "zero-valued summaries"] },
  { name: "Unseen punctuation stays attached to tokens", requiredCapabilities: ["frequency ordering", "stable text formatting"] },
  { name: "Unseen mixed-case stdin respects --lower", requiredCapabilities: ["pipe input", "case folding", "lowercased stdin"] },
  { name: "Unseen empty stdin returns zero counts", requiredCapabilities: ["empty files", "zero-valued summaries", "pipe input"] },
];

function countPassed(plan: ImplementationPlan, cases: EvaluationCase[]) {
  const capabilitySet = new Set(plan.capabilities);
  return cases.filter((testCase) => testCase.requiredCapabilities.every((capability) => capabilitySet.has(capability))).length;
}

export function ToyReconstructionDemo() {
  const [selectedProbeIds, setSelectedProbeIds] = useState<ProbeId[]>(["help", "count"]);
  const [planId, setPlanId] = useState("surface");

  const selectedPlan = implementationPlans.find((plan) => plan.id === planId) ?? implementationPlans[0];
  const selectedProbeSet = useMemo(() => new Set(selectedProbeIds), [selectedProbeIds]);
  const visibleCases = evaluationCases.filter(
    (testCase) => testCase.visibleFrom !== undefined && selectedProbeSet.has(testCase.visibleFrom),
  );
  const hiddenCases = evaluationCases.filter((testCase) => testCase.visibleFrom === undefined);
  const visiblePassed = countPassed(selectedPlan, visibleCases);
  const hiddenPassed = countPassed(selectedPlan, hiddenCases);
  const allPassed = countPassed(selectedPlan, evaluationCases);

  const toggleProbe = (probeId: ProbeId) => {
    setSelectedProbeIds((current) =>
      current.includes(probeId) ? current.filter((id) => id !== probeId) : [...current, probeId],
    );
  };

  const resetDemo = () => {
    setSelectedProbeIds(["help", "count"]);
    setPlanId("surface");
  };

  return (
    <section className="demo-panel">
      <div className="demo-header">
        <div>
          <span className="eyebrow">Interactive Toy Demo</span>
          <h3>Rebuild a tiny executable from probes</h3>
          <p>
            This is a simplified ProgramBench task. The reference executable is a toy CLI named wordstat; probes
            reveal behavior, then hidden tests check whether the chosen reconstruction generalizes.
          </p>
        </div>
        <button type="button" className="icon-button" onClick={resetDemo} title="Reset demo" aria-label="Reset demo">
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="demo-grid">
        <section className="demo-column">
          <h4>1. Probe the reference executable</h4>
          <div className="probe-list">
            {probes.map((probe) => (
              <button
                key={probe.id}
                type="button"
                className={selectedProbeSet.has(probe.id) ? "probe active" : "probe"}
                onClick={() => toggleProbe(probe.id)}
              >
                <TerminalSquare size={17} />
                <span>{probe.command}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="demo-column transcript-column">
          <h4>Oracle transcript</h4>
          <div className="transcript">
            {probes
              .filter((probe) => selectedProbeSet.has(probe.id))
              .map((probe) => (
                <article key={probe.id}>
                  <code>$ {probe.command}</code>
                  <pre>{probe.output}</pre>
                  <p>Reveals: {probe.reveals.join(", ")}</p>
                </article>
              ))}
          </div>
        </section>
      </div>

      <section className="plan-panel">
        <h4>2. Choose a reconstruction strategy</h4>
        <div className="plan-options" role="radiogroup" aria-label="Implementation strategy">
          {implementationPlans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={plan.id === planId}
              className={plan.id === planId ? "plan-option active" : "plan-option"}
              onClick={() => setPlanId(plan.id)}
            >
              <strong>{plan.name}</strong>
              <span>{plan.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="score-panel">
        <div className="score-card">
          <Play size={18} />
          <span>Visible tests</span>
          <strong>
            {visiblePassed}/{visibleCases.length || 0}
          </strong>
          <p>Tests implied by probes you selected.</p>
        </div>
        <div className="score-card hidden-score">
          <Play size={18} />
          <span>Hidden tests</span>
          <strong>
            {hiddenPassed}/{hiddenCases.length}
          </strong>
          <p>Held-out behavior that checks generalization.</p>
        </div>
        <div className="score-card total-score">
          <Play size={18} />
          <span>Total behavior</span>
          <strong>
            {allPassed}/{evaluationCases.length}
          </strong>
          <p>ProgramBench's real tasks require every hidden test to pass.</p>
        </div>
      </section>

      <div className="demo-notes">
        <p>
          Faithful to the paper: black-box probing, no prescribed architecture, hidden behavioral tests, and finite
          observable assertions.
        </p>
        <p>
          Simplified: one tiny deterministic CLI, no Docker image, no generated pytest files, no real model trajectory,
          and no expensive whole-program reconstruction.
        </p>
      </div>
    </section>
  );
}
