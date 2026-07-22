"use client";

import { useDatasetStore } from "../../store/dataset-store";

export default function AnalysisSummary() {
  const { dataset } = useDatasetStore();

  const rows = dataset?.rows ?? 0;
  const columns = dataset?.columns ?? 0;

  const missingValues =
    dataset?.intelligence?.missing_values ?? {};

  const duplicateRows =
    dataset?.intelligence?.duplicate_rows ?? 0;

  const totalMissingValues = Object.values(missingValues).reduce(
    (sum: number, value: any) => sum + Number(value),
    0
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Dataset Summary
      </h2>

      <div className="grid gap-5 md:grid-cols-4">
        <SummaryCard
          title="Rows"
          value={rows.toLocaleString()}
        />

        <SummaryCard
          title="Columns"
          value={columns.toString()}
        />

        <SummaryCard
          title="Missing Values"
          value={totalMissingValues.toString()}
        />

        <SummaryCard
          title="Duplicates"
          value={duplicateRows.toString()}
        />
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-slate-50 p-5 transition hover:shadow-md">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}