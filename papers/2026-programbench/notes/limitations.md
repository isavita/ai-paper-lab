# Limitations and Failure Modes

## Limitations stated by the authors

- Behavioral tests are finite and under-approximate each executable's full specification.
- Passing all tests would not prove semantic equivalence on untested inputs.
- Tests focus on input-output equivalence and do not capture speed, memory use, disk footprint, maintainability, or security properties.
- Some correct-looking reconstructions could be orders of magnitude slower or more resource intensive than the original.
- ProgramBench uses a single SWE-agent baseline in the main experiments, leaving multi-agent or human-guided workflows for future work.
- The authors did not conduct formal human studies, so human difficulty and expected time-to-solve are inferred rather than measured.

## Additional inferred limitations

- Source-aware test generation can discover obscure behaviors that are observable in principle but unlikely to be found by a task worker without source access.
- The benchmark may conflate specification exploration, implementation ability, software architecture, dependency selection, and build-system setup into one score.
- The no-internet rule improves contamination control but makes the setting less representative of normal software engineering practice.
- Some tasks may depend on documentation quality after automated cleanup. If documentation is removed or incomplete, task difficulty changes in ways unrelated to model capability.
- ProgramBench's primary metric, `% Resolved`, is unforgiving. That is appropriate for correctness, but it can hide meaningful partial capability differences unless paired with softer metrics.
- `% Tests Passed` is useful for ranking models but should not be interpreted as percentage of functionality implemented.
- Models might pass many tests by implementing a narrow behavioral shell instead of building a maintainable, general program.
- The dataset is weighted toward command-line executables and projects that can be containerized, so GUI, service, distributed-system, and cloud-native software are underrepresented.

## Serious shortcomings to track

- Official repository issue #7 suggests some cleanroom images lack full documentation because cleanup scripts removed docs too aggressively.
- Official repository issue #9 documents a task/cleanroom Go toolchain mismatch for one task, which can change build and runtime behavior.
- Official repository issue #14 reports a readable injected executable in one cleanroom image, undermining the execute-only binary guardrail for that task.
- The paper's anti-cheating restrictions rely heavily on container hygiene. Any leaked source, build artifact, cache, or readable binary can compromise a task.
- The current leaderboard can change as images, tasks, or evaluation code are patched, so paper-reported numbers should be distinguished from live results.

## Deployment risks

- Benchmark optimization could train agents to over-probe executables mechanically rather than reason about product requirements or user needs.
- Agents that reconstruct behavior from binaries raise dual-use concerns: legitimate compatibility and migration work overlaps with reverse engineering proprietary tools.
- Generated tests may encode license-sensitive behavior or derive from copyleft test suites. The Hugging Face dataset notes license and attribution concerns for original repositories.
- A high ProgramBench score would not guarantee secure, efficient, maintainable, or legally clean code.

## Open questions

- How do humans perform on a representative subset with the same constraints and time budget?
- How much do scores improve with access to official documentation but not source code?
- Can test generation be made less source-dependent while maintaining coverage?
- How stable are model rankings after cleanroom image issues are patched?
- Which failures are due to poor probing, poor architecture, poor implementation, or insufficient time?
- Would multi-agent systems or human-in-the-loop review produce more modular, reference-like codebases?
