"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Dataset {
  rows: number;
  columns: number;
  headers: string[];

  intelligence?: Record<string, any>;

  kpis?: {
    total_revenue?: number;
    total_records?: number;
    average_order_value?: number;
    top_region?: string;
    top_product?: string;
  };

  chart_data?: {
    sales_trend?: any[];
    [key: string]: any;
  };

  preview?: any[];
}

interface DatasetState {
  dataset: Dataset | null;

  loading: boolean;

  error: string | null;

  hasDataset: boolean;

  setDataset: (data: Dataset) => void;

  clearDataset: () => void;

  setLoading: (loading: boolean) => void;

  setError: (error: string | null) => void;
}

export const useDatasetStore = create<DatasetState>()(
  persist(
    (set) => ({
      dataset: null,

      loading: false,

      error: null,

      hasDataset: false,

      setDataset: (data) =>
        set({
          dataset: data,
          hasDataset: true,
          loading: false,
          error: null,
        }),

      clearDataset: () =>
        set({
          dataset: null,
          hasDataset: false,
          loading: false,
          error: null,
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
    }),
    {
      name: "aura-dataset-store",

      // Persist only actual dataset information.
      // Temporary UI state such as loading/error should not survive refresh.
      partialize: (state) => ({
        dataset: state.dataset,
        hasDataset: state.hasDataset,
      }),
    }
  )
);