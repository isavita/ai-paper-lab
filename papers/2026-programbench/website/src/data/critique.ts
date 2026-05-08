import type { CritiqueItem, LimitationGroup } from "../types";

export const critiqueItems: CritiqueItem[] = [
  {
    title: "The benchmark asks a valuable question",
    evidence:
      "From-scratch program reconstruction forces agents to choose language, architecture, modules, data structures, probing strategy, and build tooling.",
    assessment:
      "This is a meaningful gap between function-level coding benchmarks and realistic autonomous software development.",
    severity: "strength",
  },
  {
    title: "Behavioral equivalence is principled but incomplete",
    evidence:
      "Tests check observable behavior such as stdout, stderr, exit codes, and file effects; they do not check source structure.",
    assessment:
      "This makes evaluation implementation agnostic, but a finite suite can only under-approximate the executable's full behavior.",
    severity: "caution",
  },
  {
    title: "Source-aware test generation creates an asymmetry",
    evidence:
      "The test-generation agent can inspect source, existing tests, and coverage, while the task worker sees only the executable and docs.",
    assessment:
      "The paper argues tests remain discoverable because they assert observed behavior, but some edge cases may be practically hard to find.",
    severity: "caution",
  },
  {
    title: "Container hygiene is part of benchmark validity",
    evidence:
      "Official GitHub issues report missing cleanroom documentation, a readable injected executable, and a task/evaluation toolchain mismatch.",
    assessment:
      "These issues are fixable engineering problems, but they matter because ProgramBench's claims depend on clean, consistent task environments.",
    severity: "risk",
  },
  {
    title: "No-internet is defensible but less realistic",
    evidence:
      "The paper documents high cheating rates with internet access and moderate judge agreement for cheat detection.",
    assessment:
      "Blocking internet is clean for benchmarking, but real developers and deployed agents often use external documentation and package registries.",
    severity: "caution",
  },
];

export const limitations: LimitationGroup[] = [
  {
    title: "Author-stated limitations",
    items: [
      "Finite behavioral tests under-approximate full executable specifications.",
      "Input-output equivalence ignores execution speed, memory, disk footprint, and maintainability.",
      "The paper does not include formal human studies on task difficulty.",
      "The main results use a single SWE-agent baseline rather than multiple scaffolds or human-guided workflows.",
    ],
  },
  {
    title: "Additional inferred limitations",
    items: [
      "Documentation cleanup quality can change task difficulty independently of model capability.",
      "Source-aware generated tests can target rare behaviors that are observable but not obvious from documentation.",
      "% Tests Passed is useful for ranking but should not be read as percentage of implemented functionality.",
      "The dataset is heavily oriented toward command-line executables rather than GUI, cloud, or distributed systems.",
    ],
  },
  {
    title: "Safety and misuse concerns",
    items: [
      "Program reconstruction has legitimate compatibility uses but overlaps with reverse-engineering workflows.",
      "High benchmark scores would not guarantee that generated software is secure, maintainable, efficient, or license-safe.",
      "The Hugging Face test dataset contains tasks from many source licenses, so reuse requires attention to attribution and derivative-work obligations.",
    ],
  },
];

export const externalIssues = [
  {
    title: "Missing cleanroom documentation",
    source: "GitHub issue #7",
    detail:
      "A maintainer wrote that an LM-generated cleanup script appears to have removed entire docs directories in multiple task images.",
    url: "https://github.com/facebookresearch/ProgramBench/issues/7",
  },
  {
    title: "Toolchain mismatch",
    source: "GitHub issue #9",
    detail:
      "A reported gron task mismatch used Go 1.21.0 in task_cleanroom and Go 1.24.2 in the task image used by evaluation defaults.",
    url: "https://github.com/facebookresearch/ProgramBench/issues/9",
  },
  {
    title: "Readable injected executable",
    source: "GitHub issue #14",
    detail:
      "A QuickJS cleanroom image reportedly contained a readable executable copy at /tmp/_inject_exe.",
    url: "https://github.com/facebookresearch/ProgramBench/issues/14",
  },
];
