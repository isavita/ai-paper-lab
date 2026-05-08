import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileCode2,
  FlaskConical,
  Gauge,
  Github,
  LayoutDashboard,
  MapIcon,
  Network,
  ScrollText,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Callout } from "./components/Callout";
import { CodeBlock } from "./components/CodeBlock";
import { EquationBlock } from "./components/EquationBlock";
import { Layout } from "./components/Layout";
import { MetricCard } from "./components/MetricCard";
import { ReferenceList } from "./components/ReferenceList";
import { SectionHeader } from "./components/SectionHeader";
import { ToyReconstructionDemo } from "./demos/ToyReconstructionDemo";
import { assumptions, benchmarkMechanics, headlineStats, keyTakeaways, paperMetadata } from "./data/paper";
import { critiqueItems, externalIssues, limitations } from "./data/critique";
import { references } from "./data/references";
import {
  benchmarkClaims,
  codebaseShape,
  difficultyDistribution,
  languageDistribution,
  modelResults,
  taskScaleStats,
  testGenerationStats,
} from "./data/results";
import { paperSections } from "./data/sections";
import type { NavItem, TabId } from "./types";
import { BenchmarkPipeline } from "./visuals/BenchmarkPipeline";
import { CodebaseShape } from "./visuals/CodebaseShape";
import { ResultsChart } from "./visuals/ResultsChart";
import { TaskDistribution } from "./visuals/TaskDistribution";
import { TestGenerationLoop } from "./visuals/TestGenerationLoop";

const navItems: NavItem[] = [
  { id: "overview", label: "Fast Read", icon: LayoutDashboard },
  { id: "core", label: "Core Idea", icon: Sparkles },
  { id: "visuals", label: "Diagrams", icon: Network },
  { id: "experiments", label: "Results", icon: BarChart3 },
  { id: "demo", label: "Try It", icon: FlaskConical },
  { id: "implementation", label: "Implementation", icon: Code2 },
  { id: "map", label: "Paper Map", icon: MapIcon },
  { id: "critique", label: "Critique", icon: AlertTriangle },
  { id: "references", label: "References", icon: ScrollText },
];

const fastPipeline = [
  {
    icon: TerminalSquare,
    title: "1. Black-box executable",
    text: "Agent gets a compiled program plus usage docs. No source. No internet. No skeleton.",
  },
  {
    icon: SearchCheck,
    title: "2. Probe behavior",
    text: "Run the binary with crafted inputs to infer what it actually does.",
  },
  {
    icon: FileCode2,
    title: "3. Reconstruct codebase",
    text: "Write original source plus a build script in any language. Pure cleanroom rebuild.",
  },
  {
    icon: ShieldCheck,
    title: "4. Hidden behavioral tests",
    text: "Candidate vs. gold executable: stdout, stderr, exit code, files. All must match.",
  },
];

const quickFacts = [
  { icon: CheckCircle2, label: "Tasks evaluated", value: "200 real OSS projects" },
  { icon: XCircle, label: "Models that fully solved a task", value: "0 of 9" },
  { icon: Gauge, label: "Best partial score", value: "Claude Opus 4.7 — 3% near-solve" },
  { icon: Boxes, label: "Median reference project", value: "~8.6k LOC, 50 files" },
];

const reconstructionPseudocode = `for task in ProgramBench:
    gold = task.executable
    docs = read(task.documentation)
    observations = []

    while budget_remains:
        probe = choose_next_command(docs, observations)
        observations.append(run(gold, probe))
        source = update_candidate_source(observations)
        if builds(source) and local_checks_pass(source):
            refine_edge_cases()

    submit(source, build_script)

score = all(hidden_behavioral_tests_pass(candidate, gold))`;

const evaluationPseudocode = `def behavioral_test(candidate, gold, invocation, stdin=None, files=None):
    gold_result = run(gold, invocation, stdin=stdin, files=files)
    candidate_result = run(candidate, invocation, stdin=stdin, files=files)

    assert candidate_result.stdout == gold_result.stdout
    assert candidate_result.stderr == gold_result.stderr
    assert candidate_result.exit_code == gold_result.exit_code
    assert candidate_result.files == gold_result.files`;

function Overview() {
  return (
    <section className="page-section">
      <section className="hero">
        <div className="hero-eyebrow">
          <span>{paperMetadata.year}</span>
          <span>{paperMetadata.venue}</span>
          <span>arXiv:{paperMetadata.arxivId}</span>
        </div>
        <h1 className="hero-title">{paperMetadata.title}</h1>
        <p className="hero-tldr">
          <strong>TL;DR.</strong> Give a model a compiled program plus its docs and ask it to rebuild the source from
          scratch in a no-internet sandbox. Across 200 real open-source projects and 9 frontier models, <em>none</em>
          {" "}fully solved a single task. The best model only got close on 3% of them.
        </p>
        <div className="hero-cta">
          <a className="hero-button primary" href={paperMetadata.paperUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> Read the paper
          </a>
          <a className="hero-button" href={paperMetadata.codeUrl} target="_blank" rel="noreferrer">
            <Github size={16} /> Source repo
          </a>
        </div>
      </section>

      <div className="metric-grid">
        {headlineStats.map((stat) => (
          <MetricCard key={stat.label} stat={stat} />
        ))}
      </div>

      <section className="content-band">
        <h3>How the benchmark works in 4 steps</h3>
        <p className="band-lede">Read left-to-right; each step strips a kind of help an agent normally relies on.</p>
        <div className="flow-strip">
          {fastPipeline.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div className="flow-step" key={step.title}>
                <div className="flow-icon">
                  <Icon size={22} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                {idx < fastPipeline.length - 1 ? <ArrowRight className="flow-arrow" size={18} /> : null}
              </div>
            );
          })}
        </div>
      </section>

      <div className="split-grid">
        <section className="text-panel before-after">
          <span className="chip chip-muted">Before</span>
          <h3>Patching, not building</h3>
          <p>
            Function generation, issue resolution, and skeleton-filling benchmarks let the model lean on an existing
            repo structure, names, and tests.
          </p>
        </section>
        <section className="text-panel before-after">
          <span className="chip chip-blue">ProgramBench</span>
          <h3>Specification recovery + cleanroom build</h3>
          <p>
            The model has to <em>infer</em> the spec from a binary, then choose language, architecture, modules, and
            build pipeline on its own.
          </p>
        </section>
      </div>

      <section className="content-band">
        <h3>5 things to take away</h3>
        <div className="takeaway-grid">
          {keyTakeaways.map((takeaway, i) => (
            <article className="takeaway" key={takeaway}>
              <span className="takeaway-num">{i + 1}</span>
              <p>{takeaway}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <h3>Quick facts</h3>
        <div className="fact-grid">
          {quickFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <article className="fact" key={fact.label}>
                <Icon size={20} />
                <div>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Callout title="What the headline result really means" tone="warning">
        <p>
          0% resolved doesn't mean models wrote nothing useful. They produce buildable code that passes 30–50% of hidden
          tests on average, but every project still has at least one behavior the model misses. The gap is in <em>full
          spec recovery</em>, not in writing code.
        </p>
      </Callout>

      <section className="content-band">
        <h3>Benchmark mechanics</h3>
        <div className="mechanics-grid">
          {benchmarkMechanics.map((item) => (
            <article className="mechanic" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function PaperMap() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Structured Walkthrough" title="Paper Map">
        Each section contributes a different piece of the benchmark argument, from task framing to guardrail details.
      </SectionHeader>
      <div className="paper-map">
        {paperSections.map((section) => (
          <article className="map-item" key={section.id}>
            <span>{section.paperPart}</span>
            <h3>{section.title}</h3>
            <p>{section.role}</p>
            <ul>
              {section.keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CoreIdea() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Mechanism" title="The Core Idea">
        ProgramBench turns a compiled program into a black-box specification oracle and scores candidate source code by
        behavioral equivalence.
      </SectionHeader>

      <div className="split-grid">
        <Callout title="Central mechanism" tone="success">
          <p>
            The benchmark hides implementation structure and makes behavior the target. Agents can probe the executable
            like a product oracle, but every design decision in the replacement codebase is their own.
          </p>
        </Callout>
        <Callout title="Why it matters" tone="warning">
          <p>
            A model that can patch a function may still fail when it must discover the spec, choose abstractions, write a
            buildable project, and handle edge cases without a skeleton.
          </p>
        </Callout>
      </div>

      <div className="equation-grid">
        <EquationBlock
          equation="Resolved(task, solution) = 1 if every hidden behavioral test passes, else 0"
          caption="The primary metric is strict: a single failed hidden test means the task is not resolved."
        />
        <EquationBlock
          equation="difficulty = clamp(log10(code lines) + log10(1 + runtime deps) - 2, 0, 10)"
          caption="The appendix defines a repo-intrinsic difficulty score from code size and runtime dependencies."
        />
      </div>

      <section className="content-band">
        <h3>Implementation-oriented translation</h3>
        <p>
          You can think of each task as a loop over three state variables: documented interfaces, observed behavior, and
          the candidate implementation. The agent repeatedly chooses commands to run against the gold executable, updates
          a mental model of the program, writes code, builds it, and tests against its own probes. Final scoring happens
          on hidden tests the agent never sees.
        </p>
        <CodeBlock title="Task-worker loop, simplified" language="python" code={reconstructionPseudocode} />
      </section>

      <section className="content-band">
        <h3>Assumptions required for the method to work</h3>
        <div className="assumption-list">
          {assumptions.map((assumption) => (
            <article key={assumption}>
              <Boxes size={18} />
              <p>{assumption}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function Visuals() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Recreated Visual Explanations" title="How ProgramBench Moves Information">
        These are original explanatory visuals based on the paper; no paper figures are copied.
      </SectionHeader>
      <BenchmarkPipeline />
      <TestGenerationLoop />
      <div className="visual-pair">
        <TaskDistribution
          title="Reference Language Mix"
          description="The 200 tasks are mostly Rust, Go, and C/C++ projects."
          data={languageDistribution}
          total={200}
        />
        <TaskDistribution
          title="Difficulty Bins"
          description="The appendix bins tasks by code lines and runtime dependencies."
          data={difficultyDistribution}
          total={200}
        />
      </div>
      <CodebaseShape data={codebaseShape} />
    </section>
  );
}

function Implementation() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Implementation View" title="What The Benchmark Has To Build">
        The paper is a benchmark contribution rather than a model architecture, so the useful implementation view is the
        task pipeline and evaluation harness.
      </SectionHeader>

      <div className="split-grid">
        <section className="text-panel">
          <h3>Core data structures</h3>
          <p>
            A task instance needs a reference executable, documentation files, optional evaluation assets, metadata, and a
            hidden test suite. A model run adds a trajectory, generated source files, a build script, and evaluation
            results.
          </p>
        </section>
        <section className="text-panel">
          <h3>Control flow</h3>
          <p>
            ProgramBench separates task construction from inference. Test generation can inspect source and coverage;
            task workers cannot. Evaluation then runs generated tests against the submitted executable.
          </p>
        </section>
      </div>

      <CodeBlock title="Behavioral test shape, simplified" language="python" code={evaluationPseudocode} />

      <section className="content-band">
        <h3>What is faithful and what is simplified here</h3>
        <div className="mechanics-grid">
          <article className="mechanic">
            <h4>Faithful</h4>
            <p>
              The lab represents the black-box oracle, hidden behavioral tests, no prescribed architecture, generated test
              loop, and paper-reported results.
            </p>
          </article>
          <article className="mechanic">
            <h4>Simplified</h4>
            <p>
              The interactive demo uses a tiny deterministic CLI instead of Docker images, thousands of tests, real
              executables, or model API trajectories.
            </p>
          </article>
          <article className="mechanic">
            <h4>Omitted</h4>
            <p>
              This lab does not run the official ProgramBench harness or reproduce the 1,800 model runs; it explains the
              paper and gives a compact toy simulation.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}

function Demo() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Toy Reconstruction" title="Probe, Implement, Then Hit Hidden Tests">
        A small deterministic demo that makes the paper's evaluation pressure visible.
      </SectionHeader>
      <ToyReconstructionDemo />
    </section>
  );
}

function Experiments() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Experiments And Results" title="What The Evaluation Shows">
        The main result is not just low absolute score; it is the shape of partial progress and the kind of code models
        produce.
      </SectionHeader>

      <ResultsChart results={modelResults} />

      <div className="visual-pair">
        <TaskDistribution
          title="Generated Test Sources"
          description="Most generated tests come from the agent rather than harvesting existing suites."
          data={testGenerationStats}
          total={100}
          valueSuffix="%"
        />
        <section className="visual-panel compact-visual">
          <div className="visual-heading">
            <h3>Task Scale Snapshot</h3>
            <p>Median task statistics from the paper's dataset table.</p>
          </div>
          <div className="scale-list">
            {taskScaleStats.map((stat) => (
              <article key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="content-band">
        <h3>Which claims the results support</h3>
        <div className="claim-grid">
          {benchmarkClaims.map((claim) => (
            <article className="claim" key={claim.claim}>
              <h4>{claim.claim}</h4>
              <p>{claim.support}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function Critique() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Technical Critique" title="What The Paper Gets Right And Where To Be Careful">
        The critique separates the paper's evidence from external repository issues found after release.
      </SectionHeader>
      <div className="critique-grid">
        {critiqueItems.map((item) => (
          <article className={`critique-card critique-${item.severity}`} key={item.title}>
            <span>{item.severity}</span>
            <h3>{item.title}</h3>
            <p>{item.evidence}</p>
            <strong>{item.assessment}</strong>
          </article>
        ))}
      </div>

      <Callout title="Evidence assessment" tone="warning">
        <p>
          The paper strongly supports the claim that current models struggle under ProgramBench's cleanroom,
          no-internet, single-agent setup. It is weaker evidence for broad claims about all autonomous software
          engineering, because real deployments may use richer scaffolds, external documentation, human guidance, and
          longer timelines.
        </p>
      </Callout>

      <section className="content-band">
        <h3>External critique and live repository issues</h3>
        <p>
          No mature third-party replication was found during implementation. The following official repository issues are
          useful early evidence about benchmark hygiene and should be tracked.
        </p>
        <div className="issue-grid">
          {externalIssues.map((issue) => (
            <article className="issue-card" key={issue.url}>
              <span>{issue.source}</span>
              <h4>{issue.title}</h4>
              <p>{issue.detail}</p>
              <a href={issue.url} target="_blank" rel="noreferrer">
                Open issue
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <h3>Limitations to keep in mind</h3>
        <div className="limitations-grid">
          {limitations.map((group) => (
            <article className="limitation-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <Callout title="Known gap in this lab" tone="critical">
          <p>
            This website explains and simulates the benchmark, but it does not run the official Docker tasks or
            reproduce model evaluations. That would require the ProgramBench harness, task images, model API access,
            and substantial compute.
          </p>
        </Callout>
      </section>
    </section>
  );
}

function _UnusedLimitations() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Limitations" title="What ProgramBench Does Not Prove">
        The benchmark is intentionally strict, but that strictness creates interpretation boundaries.
      </SectionHeader>
      <div className="limitations-grid">
        {limitations.map((group) => (
          <article className="limitation-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Callout title="Known gap in this lab" tone="critical">
        <p>
          This website explains and simulates the benchmark, but it does not run the official Docker tasks or reproduce
          model evaluations. That would require the ProgramBench harness, task images, model API access, and substantial
          compute.
        </p>
      </Callout>
    </section>
  );
}

function References() {
  return (
    <section className="page-section">
      <SectionHeader eyebrow="Sources" title="References And External Material">
        All external sources used in this lab are listed here and in the paper folder's references file.
      </SectionHeader>
      <ReferenceList references={references} />
    </section>
  );
}

function renderActiveTab(activeTab: TabId) {
  switch (activeTab) {
    case "overview":
      return <Overview />;
    case "map":
      return <PaperMap />;
    case "core":
      return <CoreIdea />;
    case "visuals":
      return <Visuals />;
    case "implementation":
      return <Implementation />;
    case "demo":
      return <Demo />;
    case "experiments":
      return <Experiments />;
    case "critique":
      return <Critique />;
    case "limitations":
      return <Critique />;
    case "references":
      return <References />;
    default:
      return <Overview />;
  }
}

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <Layout navItems={navItems} activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveTab(activeTab)}
    </Layout>
  );
}
