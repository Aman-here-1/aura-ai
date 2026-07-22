import { create } from "zustand";

interface DatasetState {
  dataset: any;

  setDataset: (data: any) => void;

  clearDataset: () => void;
}

export const useDatasetStore =
  create<DatasetState>((set) => ({
    dataset: null,

    setDataset: (data) =>
      set({
        dataset: data,
      }),

    clearDataset: () =>
      set({
        dataset: null,
      }),
  }));