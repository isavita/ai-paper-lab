import type { PaperSection } from "../types";

export const paperSections: PaperSection[] = [
  {
    id: "abstract",
    title: "Abstract",
    paperPart: "Front matter",
    role: "States the problem and headline result.",
    keyPoints: [
      "Agents increasingly build software projects from scratch, but existing benchmarks mostly test localized coding tasks.",
      "ProgramBench asks agents to rebuild a program from only a compiled executable and documentation.",
      "The paper reports that no evaluated model fully resolves any task, with the best model nearly solving only 3% of tasks.",
    ],
  },
  {
    id: "introduction",
    title: "Introduction",
    paperPart: "Section 1",
    role: "Motivates whole-program software design as an evaluation gap.",
    keyPoints: [
      "The authors contrast ProgramBench with function generation and issue-resolution benchmarks.",
      "They argue that from-scratch development requires language choice, build-system choice, data modeling, error handling, and module decomposition.",
      "The benchmark frames the executable as a black-box oracle that agents must query systematically.",
    ],
  },
  {
    id: "programbench",
    title: "ProgramBench Formulation",
    paperPart: "Sections 2.1-2.4",
    role: "Defines the task and explains why it is implementation agnostic.",
    keyPoints: [
      "A task worker receives a gold executable and documentation, then writes source code and a build script.",
      "Hidden tests compare candidate and gold executable behavior rather than source code structure.",
      "Task instances are constructed by building open-source projects, stripping source/tests, injecting the executable into a clean image, and retaining usage docs/assets.",
    ],
  },
  {
    id: "experiments",
    title: "Experiments",
    paperPart: "Section 3",
    role: "Specifies models, scaffold, resource limits, and metrics.",
    keyPoints: [
      "Nine recent language models are evaluated through mini-SWE-agent.",
      "Runs have 20 CPUs, 60 GB RAM, a 1,000-step limit, and a 6-hour wall-clock limit.",
      "The primary metric is % Resolved; % Tests Passed and % Almost Resolved are used for partial progress analysis.",
    ],
  },
  {
    id: "results",
    title: "Results and Ablations",
    paperPart: "Section 4",
    role: "Shows that the benchmark is difficult and explores language/internet constraints.",
    keyPoints: [
      "No model fully solves any task in the main setting.",
      "Task difficulty appears broadly model-agnostic: simpler CLI tools score higher, while FFmpeg, PHP, Typst, and AST-grep remain difficult.",
      "Forcing a different implementation language hurts some models but improves GPT-family models, suggesting language choice is itself unreliable.",
      "Open-internet runs produce substantial cheating rates and unreliable judge agreement, supporting the no-internet default.",
    ],
  },
  {
    id: "analysis",
    title: "Analysis",
    paperPart: "Section 5",
    role: "Examines generated tests, codebase structure, and agent trajectories.",
    keyPoints: [
      "Generated test suites reach high line coverage and compare reasonably with native behavioral suites.",
      "Assertion-quality linting reduces tests that trivial dummy programs can pass.",
      "Model solutions are usually shorter, flatter, and more monolithic than references, with fewer and longer functions.",
      "Agent trajectories vary sharply: some models iterate gradually, while others generate most code in one large edit.",
    ],
  },
  {
    id: "related-work",
    title: "Related Work",
    paperPart: "Section 6",
    role: "Positions ProgramBench against repository generation, issue resolution, environment setup, and optimization benchmarks.",
    keyPoints: [
      "Prior whole-repo generation benchmarks often prescribe skeletons or class signatures.",
      "SWE-bench-style issue resolution is complementary because it modifies existing codebases rather than creating them.",
      "Performance optimization benchmarks preserve a known specification, whereas ProgramBench requires recovering the specification.",
    ],
  },
  {
    id: "discussion",
    title: "Discussion and Appendix",
    paperPart: "Section 7 and Appendices A-C",
    role: "Documents limitations, feasibility arguments, guardrails, test generation details, and full dataset statistics.",
    keyPoints: [
      "The authors acknowledge finite behavioral tests, missing non-functional requirements, and lack of human studies.",
      "Appendix A explains cheating mitigation, no-internet constraints, execute-only binaries, and cleanroom construction.",
      "Appendices B-C add result breakdowns, implementation language choices, and the full 200-repository index.",
    ],
  },
];
