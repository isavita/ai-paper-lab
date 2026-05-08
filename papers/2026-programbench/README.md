# ProgramBench: Can Language Models Rebuild Programs From Scratch?

## Summary

ProgramBench is a benchmark for evaluating whether software engineering agents can rebuild complete programs from scratch. Given only a compiled executable and usage documentation, an agent must infer behavior by probing the binary, choose its own architecture and language, write source code, and produce a build script. The paper constructs 200 tasks from open-source projects and evaluates reconstructions with hidden behavioral tests generated through agent-driven fuzzing.

## Main contribution

The central contribution is a behavior-first benchmark design for whole-program reconstruction: evaluation checks observable executable behavior rather than source structure, so models must solve specification discovery, implementation, and software design together.

## Website

```bash
cd website
npm install
npm run dev
```

## Contents

- `paper.pdf` - original paper
- `website/` - interactive explanation
- `notes/critique.md` - detailed critique
- `notes/limitations.md` - limitations and failure modes
- `notes/implementation-notes.md` - implementation notes for this lab
- `references.md` - paper and external references

## Status

Implemented
