# AGENT.md

## Purpose

This repository stores AI papers as self-contained, implemented reading notes. For each paper, create a folder containing the original paper, an explanatory website, recreated visuals, optional demos, metadata, and references.

The website is the main artifact. It must explain the paper, visualize the core ideas, show how the method works, and include a serious critique of the paper's assumptions, evidence, limitations, and failure modes.

Do not create only a summary. The result should help a reader understand both why the paper matters and what may be wrong, weak, incomplete, or overclaimed about it.

---

## Per-paper folder structure

Use one folder per paper:

```text
papers/<year>-<short-title-slug>/
  paper.pdf
  metadata.json
  README.md
  references.md
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
  assets/
    figures/
    diagrams/
    screenshots/
  notes/
    implementation-notes.md
```

Notes are optional support material. They are not a substitute for the website. Any critique, limitations, external criticism, and serious shortcomings must appear in the website itself.

If the user places a paper PDF in the repository root, create the paper folder, build the website inside it, then move the PDF into the folder as `paper.pdf`.

---

## Folder naming

Use:

```text
papers/<year>-<short-paper-title-slug>/
```

Rules:

- Use lowercase kebab-case.
- Keep the slug short and recognizable.
- Use the publication year from the paper when available.
- Do not include author names unless needed to disambiguate.
- If metadata is unclear, mark it as unclear in `metadata.json` instead of guessing.

---

## Workflow for each paper

1. Read the paper carefully before coding.
2. Extract the main metadata, claims, method, experiments, results, and stated limitations.
3. Create the paper folder.
4. Build the website under `website/`.
5. Add recreated visuals and optional demos.
6. Add `metadata.json`, `README.md`, and `references.md`.
7. Move or copy the original paper into the folder as `paper.pdf`.
8. Run the build checks and report any failures.

Do not delete or move the original PDF until the final folder and `paper.pdf` exist.

---

## Website requirements

Use a modern TypeScript frontend unless the repository already has another stack. Prefer:

```text
Vite + React + TypeScript
```

The website must be visual, structured, and critical. It should include these sections or tabs:

### 1. Overview

Explain:

- the problem the paper addresses
- why the problem matters
- the paper's main contribution
- the main claim in one clear paragraph

### 2. Paper walkthrough

Walk through the paper's structure:

- abstract
- introduction
- related work or background
- method
- experiments
- results
- ablations, if present
- discussion and conclusion
- appendix, if important

Explain what each section contributes to the paper's argument.

### 3. Core idea

Explain the central method, architecture, algorithm, objective, benchmark, or theoretical idea.

Include equations when important, but also translate them into implementation-oriented language. Explain data flow, tensor shapes, control flow, or evaluation flow where relevant.

### 4. Visual explanation

Create original diagrams that make the paper easier to understand. Useful visuals include:

- architecture diagrams
- method pipelines
- benchmark construction flows
- training vs inference diagrams
- tensor shape diagrams
- algorithm step diagrams
- result charts
- ablation charts
- failure-mode diagrams

Visuals should explain ideas, not decorate the page. Label simplified diagrams clearly.

### 5. Implementation or demo

Include pseudocode, simplified code, or a runnable toy demo where feasible.

The demo may use toy data. Full reproduction is not required unless explicitly requested.

For every demo, state:

- what it demonstrates
- what is faithful to the paper
- what is simplified
- what the demo does not prove

### 6. Experiments and results

Explain:

- datasets or benchmarks
- baselines
- metrics
- evaluation protocol
- important hyperparameters or compute details, if given
- main result tables or charts
- which results support which claims

Do not overstate results. Clearly distinguish strong evidence from weak or incomplete evidence.

### 7. Critical review

This section is required and must be part of the website.

Include a serious technical critique, not generic comments. Cover the most relevant points from this list:

- Is the problem framing correct, or is the paper solving a narrow version of the real problem?
- What assumptions does the method rely on?
- Are the assumptions realistic?
- What breaks if the assumptions are false?
- Are the baselines strong and fair?
- Are the datasets representative?
- Are the metrics actually measuring the claimed capability?
- Are ablations sufficient?
- Are there missing comparisons or negative results?
- Are reported improvements practically meaningful?
- Is there risk of benchmark leakage, data contamination, overfitting, or evaluation bias?
- Is the method reproducible from the information given?
- What hidden complexity, cost, latency, or scalability issues exist?
- What safety, privacy, security, copyright, bias, or misuse issues are relevant?
- Did later work confirm, weaken, replace, or extend the idea?

The critique must include a subsection titled:

```text
What might be wrong with this approach?
```

Use concrete evidence from the paper. Avoid vague criticism such as "more experiments are needed" unless you explain exactly which experiments are missing and why they matter.

### 8. Limitations and failure modes

This section is required and must be part of the website.

Include:

- limitations stated by the authors
- additional limitations inferred from the method or experiments
- serious shortcomings
- failure cases
- deployment risks
- scalability limits
- reproducibility gaps
- open questions

Clearly separate:

- what the paper explicitly says
- what external sources say
- what the implementation agent infers

### 9. External criticism and follow-up work

When internet access is available, search for reliable external sources:

- follow-up papers
- replication studies
- official code repositories
- issue trackers
- benchmark re-evaluations
- public conference reviews, if available
- author talks or posts
- reputable technical blog posts

Cite every external source used. Do not invent citations, URLs, quotes, paper titles, or repository links.

If no useful external critique is found, say so explicitly in the website.

### 10. References

Include the original paper and all sources used. The website should link to `references.md` or render the references directly.

---

## Content quality rules

For every paper, the website should answer:

- What problem is being solved?
- What existed before this paper?
- What did this paper change?
- How does the method work?
- What evidence supports the claims?
- Which claims are strong?
- Which claims are weak, under-tested, or overclaimed?
- What assumptions are required?
- What are the limitations and failure modes?
- What would make the approach fail in practice?
- How does this connect to later work, if known?

Do not claim novelty, importance, or superiority unless the paper's evidence supports it.

---

## Implementation rules

When using React + TypeScript:

- Use functional components.
- Use explicit types for paper data, sections, visuals, demos, critique items, limitations, and references.
- Avoid `any` unless there is a clear reason.
- Keep paper content in structured data files where practical.
- Separate data, layout, visual components, and demo logic.
- Prefer deterministic demos over random output.
- Add comments only for non-obvious paper logic.

Suggested structure:

```text
website/src/
  App.tsx
  main.tsx
  data/
    paper.ts
    sections.ts
    results.ts
    critique.ts
    limitations.ts
    references.ts
  components/
  visuals/
  demos/
  styles/
```

---

## Design rules

Use a clean research-lab style UI:

- readable typography
- responsive layout
- persistent navigation
- clear tabs or sections
- callout boxes for key insights
- diagrams and charts for complex ideas
- code blocks where useful
- clear labels for assumptions, simplifications, uncertainty, and critique

Avoid flashy design that distracts from understanding the paper.

---

## Metadata

Create `metadata.json` for every paper:

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

## Citation and copyright rules

- Cite the original paper and all external sources.
- Do not copy large sections of the paper.
- Prefer paraphrasing and recreated visuals.
- If a figure is copied or closely recreated from the paper, clearly label it and cite the source.
- Do not reproduce copyrighted material unless permitted or clearly justified.
- Never fabricate claims, results, citations, or quotes.

---

## Validation checklist

Before finishing, verify:

- `paper.pdf` exists in the paper folder.
- `metadata.json` is valid JSON.
- `README.md` exists.
- `references.md` exists.
- The website contains overview, walkthrough, core idea, visuals, implementation/demo, experiments/results, critique, limitations, and references.
- Critique and limitations are visible inside the website, not only in notes.
- External sources are cited where used.
- Simplifications and uncertainty are clearly marked.
- No placeholder text remains.
- The website builds successfully.

Run:

```bash
cd papers/<paper-folder>/website
npm install
npm run build
```

If linting, typechecking, or tests are configured, run them too:

```bash
npm run lint
npm run typecheck
npm test
```

Do not claim success if any command fails. Report the failure and likely cause.

---

## Final response after implementation

After implementing a paper, respond with:

1. Paper folder path.
2. Website path.
3. Commands to run the website.
4. What was implemented.
5. Visuals and demos added.
6. Where critique and limitations appear in the website.
7. External sources used.
8. Build/check results.
9. Known gaps or simplifications.

Keep the response factual and concise.
