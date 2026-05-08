# Implementation Notes

## What was implemented

- A self-contained paper folder at `papers/2026-programbench/`.
- A Vite + React + TypeScript website with persistent tabs for Overview, Paper Map, Core Idea, Visuals, Implementation, Demo, Experiments & Results, Critique, Limitations, and References.
- Structured data modules for paper metadata, section summaries, results, references, critique, and limitations.
- Original recreated visuals for the benchmark pipeline, test generation loop, task/language distribution, model results, and codebase-shape analysis.
- A toy interactive demo that simulates probing a reference executable and evaluating candidate reconstructions against visible and hidden behavioral tests.
- Paper-level `README.md`, `metadata.json`, `references.md`, `notes/critique.md`, `notes/limitations.md`, and this file.

## What was simplified

- The demo uses a tiny synthetic CLI called `wordstat` rather than attempting to reproduce a real ProgramBench task.
- The results charts use key paper-reported aggregate values rather than the full 200-task result matrix.
- Diagrams are recreated explanatory visuals, not copies of paper figures.
- Code snippets show benchmark pseudocode and evaluation logic rather than the actual ProgramBench implementation.

## What was omitted

- No full reproduction of ProgramBench evaluation was attempted because it would require Docker task images, the official harness, model API access, and substantial compute.
- No screenshots are included yet.
- No automated browser visual test was added; validation focuses on TypeScript build success.

## How the demo works

The demo gives the visitor a toy reference executable with several possible probes. Each probe reveals part of the executable's behavior. The visitor then selects a candidate reconstruction strategy. The demo compares that strategy against visible tests derived from observed probes and hidden tests that represent ProgramBench-style held-out behavioral assertions. It is deterministic and intended to teach why passing observed examples is not the same as reconstructing the executable.

## Possible future improvements

- Add a small downloadable toy task with a real executable and generated pytest tests.
- Add task-level browsing for a subset of the 200 ProgramBench repositories.
- Add screenshots and a deploy target for the website.
- Add a Playwright visual smoke test for the interactive demo and charts.
- Update the critique after the official repository issues are resolved or new replications appear.
