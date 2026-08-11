"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AIReport {
  summary: string;
  insights: string[];
  recommendations: string[];
  risks: string[];
  action_plan: string[];
  forecast: Record<string, unknown>;
  trend: Record<string, unknown>;
  data_quality: Record<string, unknown>;
  anomalies: Record<string, unknown>[];
  correlation: Record<string, unknown>;
  root_causes: string[];
  business_rules: Record<string, unknown>[];
  narrative: string;
  explainability: Record<string, unknown>[];
  seasonality: Record<string, unknown>;
  statistics: Record<string, unknown>;
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

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
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
        set((state) => ({
          report,
          analysis: state.analysis
            ? {
                ...state.analysis,
                aiReport: report,
              }
            : null,
          loading: false,
          error: null,
        })),

      clearReport: () =>
        set((state) => ({
          report: null,
          analysis: state.analysis
            ? {
                ...state.analysis,
                aiReport: null,
              }
            : null,
        })),

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
    }),
    {
      name: "aura-analysis-store",

      // Persist business data only. Temporary loading/error UI state should
      // never reappear after a page refresh.
      partialize: (state) => ({
        analysis: state.analysis,
        report: state.report,
        hasAnalysis: state.hasAnalysis,
      }),
    },
  ),
);