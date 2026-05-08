# AGENT.md

## Repository purpose

This repository is a personal AI paper reading archive. Each paper should become a self-contained folder that contains:

1. The original paper file.
2. A website implementation explaining the paper.
3. Visual explanations of the core ideas.
4. Optional runnable demos or experiments.
5. A critical review covering strengths, limitations, assumptions, risks, and serious shortcomings.
6. References to the paper and any external critique or related work used.

The goal is not just to summarize papers. The goal is to make each paper understandable, inspectable, and memorable through implementation, diagrams, examples, and criticism.

---

## Recommended project name

Use this repository name:

```text
ai-paper-lab
```

Other acceptable alternatives:

```text
paper-to-lab
ai-paper-atlas
papers-implemented
```

Use `ai-paper-lab` unless the user explicitly chooses another name.

---

## Default repository structure

Use one folder per paper under `papers/`.

```text
ai-paper-lab/
  AGENT.md
  README.md
  package.json
  papers/
    2024-attention-is-all-you-need/
      paper.pdf
      README.md
      metadata.json
      website/
        package.json
        index.html
        src/
          main.tsx
          App.tsx
          data/
          components/
          visuals/
          demos/
          styles/
      notes/
        critique.md
        limitations.md
        implementation-notes.md
      assets/
        figures/
        diagrams/
        screenshots/
      references.md
```

If the user places a paper PDF in the repository root, create the paper folder, implement the website inside it, then move the original PDF into the final paper folder at the end.

---

## Folder naming rules

Create a stable, readable slug:

```text
papers/<year>-<short-paper-title-slug>/
```

Examples:

```text
papers/2017-attention-is-all-you-need/
papers/2020-retrieval-augmented-generation/
papers/2023-direct-preference-optimization/
```

Rules:

- Use the publication year from the paper metadata.
- Use lowercase kebab-case.
- Keep the slug short but recognizable.
- Do not include punctuation, author names, or venue unless needed to disambiguate.
- If metadata is unclear, use the best available title and note the uncertainty in `metadata.json`.

---

## Paper processing workflow

When asked to implement a new paper:

1. Locate the paper PDF in the repository root or the path provided by the user.
2. Read the paper carefully before coding.
3. Extract metadata:
   - title
   - authors
   - year
   - venue, if available
   - arXiv ID, DOI, or URL, if available
   - main task or domain
   - key contribution
   - datasets used
   - models or algorithms introduced
   - evaluation metrics
4. Create the paper folder using the naming rules above.
5. Create `metadata.json`.
6. Create a short paper-level `README.md`.
7. Build the website under `website/`.
8. Create notes under `notes/`.
9. Add or generate visuals under `assets/` or `website/src/visuals/`.
10. Add references in `references.md`.
11. Move the original paper PDF into the paper folder as `paper.pdf`.
12. Ensure the website runs successfully.
13. Document how to run the website.

Do not delete the original paper until the copied or moved version exists in the final folder.

---

## Website implementation requirements

Use a modern TypeScript frontend unless the repository already uses another stack.

Preferred stack:

```text
Vite + React + TypeScript
```

The website should be clear, visual, and interactive. It should not be a plain summary page.

Minimum required tabs or sections:

1. **Overview**
   - Problem the paper addresses.
   - Why the problem matters.
   - One-paragraph summary of the paper.
   - Main contribution in plain technical language.

2. **Paper Map**
   - Structured walkthrough of the paper sections.
   - Include abstract, introduction, background or related work, method, experiments, results, ablations, discussion, conclusion, and appendix when present.
   - Explain what each section contributes to the argument.

3. **Core Idea**
   - Explain the central mechanism, algorithm, architecture, objective, or theoretical idea.
   - Include equations where relevant.
   - Translate equations into implementation-oriented explanations.

4. **Visuals**
   - Include diagrams, flowcharts, architecture sketches, timelines, or interactive animations.
   - Prefer original recreated visuals over copied paper figures.
   - If using a figure from the paper, clearly label it as reproduced from the paper and cite it.

5. **Implementation**
   - Provide pseudocode or runnable code for the core method.
   - Explain important data structures, tensors, dimensions, and control flow.
   - Include simplified examples where possible.

6. **Demo**
   - Add a small interactive demo when feasible.
   - The demo can use toy data if full reproduction is too expensive.
   - Explain what is faithful to the paper and what is simplified.

7. **Experiments & Results**
   - Explain datasets, baselines, metrics, training setup, and evaluation protocol.
   - Recreate key result tables or charts where appropriate.
   - Highlight what result supports which claim.

8. **Critique**
   - Include the agent's own technical critique.
   - Include external critique when available from reliable sources.
   - Clearly separate documented critique from the agent's own analysis.
   - Discuss whether the evidence actually supports the claims.

9. **Limitations**
   - Include limitations explicitly stated by the authors.
   - Include additional likely limitations inferred from the method, assumptions, experiments, datasets, or deployment setting.
   - Highlight serious shortcomings, failure modes, scalability issues, evaluation gaps, reproducibility issues, and ethical or safety concerns when relevant.

10. **References**
    - Cite the original paper.
    - Cite external critiques, blog posts, follow-up papers, implementations, datasets, and related work used.

---

## Design requirements

Use a clean research-lab style UI:

- readable typography
- responsive layout
- light and dark mode when feasible
- persistent navigation between tabs
- callout boxes for key insights
- diagrams and cards for complex ideas
- code blocks with syntax highlighting if available
- clear labels for assumptions, simplifications, and uncertainty

Avoid flashy design that distracts from understanding the paper.

---

## TypeScript and React requirements

When using React + TypeScript:

- Use functional components.
- Keep components small and focused.
- Use explicit types for paper metadata, sections, references, demos, and visual data.
- Avoid `any` unless there is a clear reason.
- Store paper content in structured data files when possible.
- Separate data, presentation components, visual components, and demo logic.
- Prefer deterministic examples over random output.
- Make visual components reusable.
- Add comments only where they explain non-obvious paper logic.

Suggested website structure:

```text
website/src/
  App.tsx
  main.tsx
  data/
    paper.ts
    sections.ts
    references.ts
    critique.ts
  components/
    Layout.tsx
    Tabs.tsx
    Callout.tsx
    EquationBlock.tsx
    CodeBlock.tsx
    ReferenceList.tsx
  visuals/
    ArchitectureDiagram.tsx
    AlgorithmFlow.tsx
    ResultsChart.tsx
  demos/
    ToyDemo.tsx
  styles/
    global.css
```

---

## Content quality requirements

The implementation must be technically faithful to the paper.

For every paper, include:

- What problem is being solved.
- What existed before this paper.
- What the paper changed.
- The key mechanism or insight.
- The algorithm or architecture.
- The objective or loss function, if relevant.
- The training or inference procedure, if relevant.
- The data used.
- The evaluation setup.
- The strongest empirical claims.
- The weakest empirical claims.
- The assumptions required for the method to work.
- The paper's stated limitations.
- Additional limitations not stated by the authors.
- How this paper influenced later work, if known.

Do not exaggerate the importance of a paper. Do not claim novelty unless the paper supports it.

---

## Critique requirements

The critique must be serious and specific, not generic.

Cover these angles when relevant:

1. **Problem framing**
   - Is the problem well-defined?
   - Are the authors solving the right problem?
   - Are any important use cases excluded?

2. **Assumptions**
   - What assumptions does the method rely on?
   - Are these assumptions realistic?
   - What breaks if the assumptions are false?

3. **Method**
   - Is the proposed method simpler, stronger, or more scalable than alternatives?
   - Does the method introduce hidden complexity?
   - Are there edge cases or degenerate cases?

4. **Experiments**
   - Are the datasets representative?
   - Are the baselines strong and fair?
   - Are ablations sufficient?
   - Are the metrics appropriate?
   - Is statistical significance or variance reported?

5. **Results**
   - Do the results support the claims?
   - Are improvements practically meaningful?
   - Are there negative results or missing comparisons?

6. **Reproducibility**
   - Is code available?
   - Are hyperparameters and compute budgets reported?
   - Could the result be reproduced by a small lab or individual?

7. **Scalability**
   - What happens as data, model size, sequence length, users, or deployment complexity grows?
   - Are there memory, latency, cost, or data bottlenecks?

8. **Safety, ethics, and misuse**
   - Are there bias, privacy, security, copyright, misinformation, or dual-use concerns?
   - Did the authors evaluate these concerns adequately?

9. **Long-term relevance**
   - Did later work confirm, weaken, replace, or extend the idea?

Use concrete evidence from the paper whenever possible.

---

## External critique and online research

When internet access is available, search for external criticism and follow-up work.

Look for:

- follow-up papers
- replication studies
- benchmark re-evaluations
- official code repositories
- issues in the official repository
- reputable blog posts
- conference reviews, when public
- talks or lectures by the authors
- later papers that challenge or supersede the method

Rules:

- Cite every external source used.
- Do not treat social media claims as authoritative unless clearly labeled as informal commentary.
- Prefer papers, official repositories, author posts, and reputable technical blogs.
- Clearly label external criticism separately from the agent's own analysis.
- If no external critique is found, say so explicitly.
- Never invent citations, URLs, paper titles, benchmarks, or quotes.

---

## Visualisation guidelines

Create visuals that explain ideas, not decorative images.

Good visuals include:

- architecture diagrams
- tensor shape diagrams
- data flow diagrams
- algorithm step diagrams
- training vs inference flows
- attention maps for toy examples
- loss landscape sketches
- before/after comparisons
- result charts
- ablation charts
- timeline of related work

Every visual should answer a question:

- What moves where?
- What is computed from what?
- What changes during training?
- Which part of the result supports the claim?
- Where can the method fail?

Label simplified visuals clearly.

---

## Demo guidelines

Add demos when they improve understanding.

A demo may be:

- a toy implementation of the main algorithm
- an interactive parameter explorer
- a small inference example
- an animation of the method step by step
- a synthetic dataset example
- a comparison against a simple baseline

For expensive AI papers, do not attempt full reproduction unless explicitly requested. Use toy data and clearly document simplifications.

Each demo must include:

- what it demonstrates
- what is faithful to the paper
- what is simplified
- expected behavior
- known limitations

---

## `metadata.json` schema

Create this file for every paper:

```json
{
  "title": "",
  "authors": [],
  "year": null,
  "venue": null,
  "paperUrl": null,
  "arxivId": null,
  "doi": null,
  "domain": "",
  "mainContribution": "",
  "datasets": [],
  "metrics": [],
  "codeUrl": null,
  "implementedWebsite": "website/",
  "status": "implemented",
  "notes": []
}
```

Use `null` when information is unknown. Do not guess hidden metadata.

---

## Paper folder `README.md` template

Every paper folder must include a short `README.md`:

```markdown
# <Paper Title>

## Summary

<One-paragraph summary.>

## Main contribution

<The central contribution.>

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
- `references.md` - paper and external references

## Status

Implemented / In progress / Needs review
```
```

---

## Notes files

Create these files for every paper:

```text
notes/critique.md
notes/limitations.md
notes/implementation-notes.md
```

`critique.md` should include:

- summary of the paper's claims
- strongest aspects
- weakest aspects
- own critique
- external critique, if available
- evidence assessment

`limitations.md` should include:

- limitations stated by the authors
- additional inferred limitations
- serious shortcomings
- deployment risks
- open questions

`implementation-notes.md` should include:

- what was implemented
- what was simplified
- what was omitted
- how the demo works
- possible future improvements

---

## Citation and copyright rules

- Cite the original paper and all external sources.
- Do not copy large parts of the paper into the website.
- Short quotes are acceptable only when necessary and must be cited.
- Prefer paraphrasing and original diagrams.
- Do not reproduce copyrighted figures unless the license allows it or the use is clearly documented.
- If a figure is recreated from the paper, label it as an interpretation or recreation.

---

## Accuracy and uncertainty rules

- Do not fabricate results, datasets, claims, citations, code availability, or author intent.
- If something is unclear, mark it as unclear.
- If an equation or method is uncertain, explain the uncertainty.
- Distinguish between:
  - what the paper says
  - what external sources say
  - what the agent infers
- Do not silently fill gaps with plausible-sounding claims.

---

## Build and validation checklist

Before finishing a paper implementation:

- The paper PDF exists in the paper folder as `paper.pdf`.
- `metadata.json` is present and valid JSON.
- `README.md` exists in the paper folder.
- `references.md` exists.
- `notes/critique.md` exists.
- `notes/limitations.md` exists.
- `notes/implementation-notes.md` exists.
- The website installs successfully.
- The website builds successfully.
- The website has all required sections or tabs.
- The critique is specific to the paper.
- Limitations include both author-stated and inferred limitations.
- Any external sources are cited.
- Any simplifications are clearly documented.
- The implementation does not contain broken links or placeholder text.

Run the relevant checks:

```bash
cd papers/<paper-folder>/website
npm install
npm run build
```

If tests, linting, or typechecking are configured, run them too:

```bash
npm run lint
npm run typecheck
npm test
```

Do not claim success if any command fails. Report the failure and the likely cause.

---

## Final response format for the coding agent

After implementing a paper, respond with:

1. Paper folder path.
2. Website path.
3. Commands to run the website.
4. Summary of what was implemented.
5. Visuals and demos added.
6. Critique and limitation files created.
7. External sources used.
8. Build/check results.
9. Known gaps or simplifications.

Keep the final response factual and concise.

---

## Important behavior rules

- Implement the paper in the repository; do not only summarize it.
- Prioritize understanding over visual decoration.
- Prefer small, correct, explainable demos over large incomplete reproductions.
- Keep every paper self-contained.
- Use TypeScript for website code unless instructed otherwise.
- Be explicit about limitations, uncertainty, and simplifications.
- Never invent research claims or citations.
- Move the paper into the final folder only after the folder structure is ready.
