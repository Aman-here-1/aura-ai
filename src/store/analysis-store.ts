import { create } from "zustand";

export interface AIReport {
  summary: string;
  insights: string[];
  recommendations: string[];
  risks: string[];
  actionPlan: string[];
}

interface AnalysisState {
  // Dataset
  headers: string[];
  preview: Record<string, unknown>[];
  intelligence: Record<string, unknown>;
  kpis: Record<string, unknown>;

  // AI Report
  report: AIReport | null;

  // Actions
  setAnalysis: (data: {
    headers: string[];
    preview: Record<string, unknown>[];
    intelligence: Record<string, unknown>;
    kpis: Record<string, unknown>;
  }) => void;

  setReport: (report: AIReport) => void;

  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  headers: [],
  preview: [],
  intelligence: {},
  kpis: {},

  report: null,

  setAnalysis: (data) =>
    set({
      headers: data.headers,
      preview: data.preview,
      intelligence: data.intelligence,
      kpis: data.kpis,
    }),

  setReport: (report) =>
    set({
      report,
    }),

  resetAnalysis: () =>
    set({
      headers: [],
      preview: [],
      intelligence: {},
      kpis: {},
      report: null,
    }),
}));