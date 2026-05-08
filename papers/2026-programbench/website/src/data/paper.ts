import type { PaperMetadata, StatCard } from "../types";

export const paperMetadata: PaperMetadata = {
  title: "ProgramBench: Can Language Models Rebuild Programs From Scratch?",
  authors: [
    "John Yang",
    "Kilian Lieret",
    "Jeffrey Ma",
    "Parth Thakkar",
    "Dmitrii Pedchenko",
    "Sten Sootla",
    "Emily McMilin",
    "Pengcheng Yin",
    "Rui Hou",
    "Gabriel Synnaeve",
    "Diyi Yang",
    "Ofir Press",
  ],
  year: 2026,
  venue: "arXiv preprint",
  arxivId: "2605.03546",
  doi: "10.48550/arXiv.2605.03546",
  paperUrl: "https://arxiv.org/abs/2605.03546",
  codeUrl: "https://github.com/facebookresearch/ProgramBench",
  domain: "Software engineering agents, code generation benchmarks, behavioral reconstruction",
  mainContribution:
    "A 200-task benchmark where agents rebuild executable behavior from a compiled program and documentation, evaluated by hidden behavioral tests generated through agent-driven fuzzing.",
};

export const headlineStats: StatCard[] = [
  {
    label: "Task instances",
    value: "200",
    detail: "Open-source repositories converted into cleanroom executable reconstruction tasks.",
    tone: "blue",
  },
  {
    label: "Generated tests",
    value: "248,853",
    detail: "Behavioral test functions across all task instances.",
    tone: "green",
  },
  {
    label: "Fully resolved",
    value: "0%",
    detail: "No evaluated model passed all tests on any task in the paper's main results.",
    tone: "red",
  },
  {
    label: "Best near-solve rate",
    value: "3.0%",
    detail: "Claude Opus 4.7 reached at least 95% tests passed on 3% of tasks.",
    tone: "amber",
  },
];

export const keyTakeaways = [
  "ProgramBench shifts evaluation from patching existing code to reconstructing a full program from observed behavior.",
  "The reference executable acts as the specification oracle, but the agent must decide which behaviors to probe.",
  "Hidden tests target observable behavior rather than source structure, so solutions may use different languages or architectures.",
  "Current models make partial progress but fail to fully solve tasks, and their codebases are usually shorter and more monolithic than human-written references.",
  "The benchmark's rigor depends heavily on cleanroom container hygiene, documentation retention, and robust cheating prevention.",
];

export const benchmarkMechanics = [
  {
    title: "Inputs to the task worker",
    text: "A compiled executable, usage-related documentation, any hard-to-synthesize assets, and a clean terminal environment with no internet access.",
  },
  {
    title: "Required output",
    text: "Original source code plus a build script that creates a candidate executable matching the reference executable's behavior.",
  },
  {
    title: "Evaluation target",
    text: "End-to-end behavioral equivalence on hidden tests: stdout, stderr, exit codes, files, and other observable effects.",
  },
  {
    title: "What is deliberately not prescribed",
    text: "Language, architecture, module boundaries, algorithms, file layout, and internal abstractions.",
  },
];

export const assumptions = [
  "The executable plus bundled documentation expose enough behavior to make each tested requirement discoverable.",
  "Generated tests are strong enough to reject shallow or incorrect reconstructions without overspecifying implementation internals.",
  "No-internet cleanroom conditions are necessary to prevent source-code lookup and binary wrapping from dominating the benchmark.",
  "Behavioral equivalence is the right primary signal for whole-program reconstruction, even though maintainability and performance are not captured.",
];
