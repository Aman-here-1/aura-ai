"use client";

import {
  Database,
  Columns3,
  AlertTriangle,
  CopyCheck,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function AnalysisSummary() {
  const { dataset } = useDatasetStore();

  const rows = dataset?.rows ?? 0;
  const columns = dataset?.columns ?? 0;

  const missingValues =
    dataset?.intelligence?.missing_values ?? {};

  const duplicateRows =
    Number(dataset?.intelligence?.duplicate_rows ?? 0);

  const totalMissingValues = Object.values(
    missingValues
  ).reduce(
    (sum: number, value: any) =>
      sum + Number(value),
    0
  );

  const cards = [
    {
      title: "Rows",
      value: rows.toLocaleString(),
      icon: Database,
      color: "blue",
    },
    {
      title: "Columns",
      value: columns.toString(),
      icon: Columns3,
      color: "violet",
    },
    {
      title: "Missing Values",
      value: totalMissingValues.toLocaleString(),
      icon: AlertTriangle,
      color: "orange",
    },
    {
      title: "Duplicate Rows",
      value: duplicateRows.toLocaleString(),
      icon: CopyCheck,
      color: "emerald",
    },
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Dataset Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of the uploaded dataset.
        </p>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;
          const theme =
            colorMap[
              card.color as keyof typeof colorMap
            ];

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-4 text-4xl font-bold text-slate-900">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.bg}`}
                >
                  <Icon
                    size={28}
                    className={theme.text}
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
}