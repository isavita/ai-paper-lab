import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Boxes,
  Code2,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  MapIcon,
  Network,
  ScrollText,
  Sparkles,
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
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "map", label: "Paper Map", icon: MapIcon },
  { id: "core", label: "Core Idea", icon: Sparkles },
  { id: "visuals", label: "Visuals", icon: Network },
  { id: "implementation", label: "Implementation", icon: Code2 },
  { id: "demo", label: "Demo", icon: FlaskConical },
  { id: "experiments", label: "Experiments", icon: BarChart3 },
  { id: "critique", label: "Critique", icon: AlertTriangle },
  { id: "limitations", label: "Limitations", icon: ListChecks },
  { id: "references", label: "References", icon: ScrollText },
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
      <SectionHeader eyebrow="ProgramBench Lab" title={paperMetadata.title}>
        {paperMetadata.mainContribution}
      </SectionHeader>

      <div className="metadata-strip">
        <span>{paperMetadata.year}</span>
        <span>{paperMetadata.venue}</span>
        <span>arXiv:{paperMetadata.arxivId}</span>
        <span>{paperMetadata.domain}</span>
      </div>

      <div className="metric-grid">
        {headlineStats.map((stat) => (
          <MetricCard key={stat.label} stat={stat} />
        ))}
      </div>

      <Callout title="One-paragraph summary" tone="info">
        <p>
          ProgramBench evaluates software engineering agents on cleanroom program reconstruction. Each task gives an
          agent a compiled executable and usage documentation, but no source code, internet, or prescribed skeleton. The
          agent must probe the executable, infer behavior, write an original codebase, and produce a build script. Hidden
          behavioral tests compare candidate and reference executables. Across 200 tasks and 9 models, the paper reports
          no fully solved task, while revealing that model solutions tend to be shorter and more monolithic than the
          original human-written projects.
        </p>
      </Callout>

      <div className="split-grid">
        <section className="text-panel">
          <h3>What existed before</h3>
          <p>
            Earlier coding benchmarks commonly measured function generation, issue resolution inside an existing
            repository, environment setup, or skeleton-based repository filling. Those settings constrain much of the
            software design problem in advance.
          </p>
        </section>
        <section className="text-panel">
          <h3>What ProgramBench changes</h3>
          <p>
            ProgramBench removes the source structure and evaluates executable behavior. The model chooses the language,
            build system, abstractions, probing strategy, and implementation architecture.
          </p>
        </section>
      </div>

      <section className="content-band">
        <h3>Key takeaways</h3>
        <div className="takeaway-grid">
          {keyTakeaways.map((takeaway) => (
            <article className="takeaway" key={takeaway}>
              <BookOpen size={18} />
              <p>{takeaway}</p>
            </article>
          ))}
        </div>
      </section>

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
    </section>
  );
}

function Limitations() {
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
      return <Limitations />;
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
