import { create } from "zustand";

export interface AIReport {
  summary: string;
  insights: string[];
  recommendations: string[];
  risks: string[];
  actionPlan: string[];
}

export interface AnalysisData {
  headers: string[];
  preview: Record<string, unknown>[];
  intelligence: Record<string, unknown>;
  kpis: Record<string, unknown>;

  charts: Record<string, unknown>;

  recommendedCharts: unknown[];

  aiReport: AIReport | null;
}

interface AnalysisState {
  analysis: AnalysisData | null;

  report: AIReport | null;

  loading: boolean;

  error: string | null;

  hasAnalysis: boolean;

  setAnalysis: (data: AnalysisData) => void;

  setReport: (report: AIReport) => void;

  clearReport: () => void;

  setLoading: (loading: boolean) => void;

  setError: (error: string | null) => void;

  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: null,

  report: null,

  loading: false,

  error: null,

  hasAnalysis: false,

  setAnalysis: (data) =>
    set({
      analysis: data,
      report: data.aiReport,
      hasAnalysis: true,
      loading: false,
      error: null,
    }),

  setReport: (report) =>
    set({
      report,
      loading: false,
      error: null,
    }),

  clearReport: () =>
    set({
      report: null,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
      loading: false,
    }),

  resetAnalysis: () =>
    set({
      analysis: null,
      report: null,
      loading: false,
      error: null,
      hasAnalysis: false,
    }),
}));