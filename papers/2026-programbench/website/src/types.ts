import type { LucideIcon } from "lucide-react";

export type Theme = "light" | "dark";

export type TabId =
  | "overview"
  | "map"
  | "core"
  | "visuals"
  | "implementation"
  | "demo"
  | "experiments"
  | "critique"
  | "limitations"
  | "references";

export interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

export interface PaperMetadata {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  arxivId: string;
  doi: string;
  paperUrl: string;
  codeUrl: string;
  domain: string;
  mainContribution: string;
}

export interface StatCard {
  label: string;
  value: string;
  detail: string;
  tone: "blue" | "green" | "amber" | "red" | "neutral";
}

export interface PaperSection {
  id: string;
  title: string;
  paperPart: string;
  role: string;
  keyPoints: string[];
}

export interface ModelResult {
  model: string;
  resolved: number;
  almost: number;
  macroPass: number;
  calls: number;
  cost: number;
  family: "Anthropic" | "Google" | "OpenAI";
}

export interface DistributionDatum {
  label: string;
  value: number;
  detail?: string;
}

export interface ReferenceItem {
  title: string;
  url: string;
  kind: "paper" | "code" | "dataset" | "website" | "issue" | "related";
  note: string;
}

export interface CritiqueItem {
  title: string;
  evidence: string;
  assessment: string;
  severity: "strength" | "caution" | "risk";
}

export interface LimitationGroup {
  title: string;
  items: string[];
}
