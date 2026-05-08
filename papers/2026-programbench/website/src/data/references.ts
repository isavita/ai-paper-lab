import type { ReferenceItem } from "../types";

export const references: ReferenceItem[] = [
  {
    title: "ProgramBench: Can Language Models Rebuild Programs From Scratch?",
    url: "https://arxiv.org/abs/2605.03546",
    kind: "paper",
    note: "Original arXiv paper, submitted May 5, 2026.",
  },
  {
    title: "facebookresearch/ProgramBench",
    url: "https://github.com/facebookresearch/ProgramBench",
    kind: "code",
    note: "Official code repository, usage guide, releases, and issue tracker.",
  },
  {
    title: "ProgramBench official leaderboard",
    url: "https://programbench.com/",
    kind: "website",
    note: "Live benchmark website and leaderboard. Values may change after the paper release.",
  },
  {
    title: "ProgramBench Generated Tests",
    url: "https://huggingface.co/datasets/programbench/ProgramBench-Tests",
    kind: "dataset",
    note: "Hugging Face dataset containing generated test suites and attribution files.",
  },
  {
    title: "mini-SWE-agent",
    url: "https://mini-swe-agent.com/",
    kind: "code",
    note: "Agent scaffold used for ProgramBench task construction and main model evaluation.",
  },
  {
    title: "Some task_cleanroom Docker images do not contain all documentation",
    url: "https://github.com/facebookresearch/ProgramBench/issues/7",
    kind: "issue",
    note: "Official issue discussing overzealous cleanup of documentation in some cleanroom images.",
  },
  {
    title: "tomnomnom__gron task and task_cleanroom images use different Go toolchains",
    url: "https://github.com/facebookresearch/ProgramBench/issues/9",
    kind: "issue",
    note: "Official issue documenting a task/evaluation environment mismatch.",
  },
  {
    title: "bellard_1776_quickjs.d7ae12a:task_cleanroom contains readable executable",
    url: "https://github.com/facebookresearch/ProgramBench/issues/14",
    kind: "issue",
    note: "Official issue reporting an image hygiene problem that weakens execute-only assumptions for one task.",
  },
  {
    title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
    url: "https://arxiv.org/abs/2310.06770",
    kind: "related",
    note: "Related issue-resolution benchmark contrasted with ProgramBench.",
  },
  {
    title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering",
    url: "https://arxiv.org/abs/2405.15793",
    kind: "related",
    note: "Prior SWE-agent work cited by the paper.",
  },
];
