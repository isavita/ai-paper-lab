import type { DistributionDatum, ModelResult } from "../types";

export const modelResults: ModelResult[] = [
  { model: "Claude Opus 4.7", resolved: 0, almost: 3.0, macroPass: 51.2, calls: 93, cost: 3.81, family: "Anthropic" },
  { model: "Claude Opus 4.6", resolved: 0, almost: 2.5, macroPass: 52.0, calls: 260, cost: 11.38, family: "Anthropic" },
  { model: "Claude Sonnet 4.6", resolved: 0, almost: 1.6, macroPass: 48.5, calls: 475, cost: 27.09, family: "Anthropic" },
  { model: "Claude Haiku 4.5", resolved: 0, almost: 0, macroPass: 30.0, calls: 124, cost: 0.8, family: "Anthropic" },
  { model: "Gemini 3.1 Pro", resolved: 0, almost: 0, macroPass: 36.6, calls: 94, cost: 1.51, family: "Google" },
  { model: "Gemini 3 Flash", resolved: 0, almost: 0, macroPass: 32.4, calls: 89, cost: 0.33, family: "Google" },
  { model: "GPT 5.4", resolved: 0, almost: 0, macroPass: 38.3, calls: 16, cost: 0.33, family: "OpenAI" },
  { model: "GPT 5.4 mini", resolved: 0, almost: 0, macroPass: 16.9, calls: 18, cost: 0.04, family: "OpenAI" },
  { model: "GPT 5 mini", resolved: 0, almost: 0, macroPass: 15.9, calls: 15, cost: 0.03, family: "OpenAI" },
];

export const languageDistribution: DistributionDatum[] = [
  { label: "Rust", value: 107, detail: "Dominant source language in the benchmark." },
  { label: "Go", value: 46, detail: "Mostly CLI and developer tools." },
  { label: "C/C++", value: 45, detail: "Includes large systems such as FFmpeg, PHP, SQLite, and DuckDB." },
  { label: "Other", value: 2, detail: "One Java and one Haskell task." },
];

export const difficultyDistribution: DistributionDatum[] = [
  { label: "Easy", value: 28, detail: "Difficulty score below 2." },
  { label: "Medium", value: 143, detail: "Difficulty score from 2 to below 4." },
  { label: "Hard", value: 29, detail: "Difficulty score at least 4." },
];

export const testGenerationStats: DistributionDatum[] = [
  { label: "Self-generated tests", value: 79.5, detail: "Created by agent-driven fuzzing." },
  { label: "Harvested tests", value: 20.5, detail: "Adapted from existing behavioral suites where available." },
];

export const codebaseShape = [
  { label: "Median code lines", reference: 3068, model: 1173, unit: "lines" },
  { label: "Median code files", reference: 15, model: 3, unit: "files" },
  { label: "Median max depth", reference: 2, model: 1, unit: "levels" },
];

export const taskScaleStats = [
  { label: "Median code lines", value: "8,635", detail: "Minimum 212; maximum 2,701,283." },
  { label: "Median code files", value: "50", detail: "Minimum 1; maximum 5,342." },
  { label: "Median tests per task", value: "770", detail: "Minimum 224; maximum 14,645." },
  { label: "Median GitHub stars", value: "2,124", detail: "Repository popularity proxy crawled in April 2026." },
];

export const benchmarkClaims = [
  {
    claim: "ProgramBench measures specification recovery plus implementation, not just coding from a written spec.",
    support: "The task worker receives a runnable executable and docs, then must query behavior and create a buildable codebase.",
  },
  {
    claim: "Behavioral tests avoid prescribing source structure.",
    support: "The candidate can use any language or architecture as long as observable behavior matches the reference executable.",
  },
  {
    claim: "Current models are far from full reliability in this setting.",
    support: "In the paper's main table, all models have 0% resolved across 200 tasks.",
  },
  {
    claim: "Agent outputs reveal design weaknesses beyond test scores.",
    support: "High-scoring model solutions are typically shorter, flatter, and less modular than the original codebases.",
  },
];
