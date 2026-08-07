"use client";

import {
  Database,
  Columns3,
  AlertTriangle,
  CopyCheck,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function AnalysisSummary() {
  const { dataset } = useDatasetStore();

  const rows = dataset?.rows ?? 0;
  const columns = dataset?.columns ?? 0;

  const missingValues =
    dataset?.intelligence?.missing_values ?? {};

  const duplicateRows = Number(
    dataset?.intelligence?.duplicate_rows ?? 0
  );

  const totalMissing = Object.values(
    missingValues
  ).reduce(
    (sum: number, value: any) => sum + Number(value),
    0
  );

  const quality =
    rows === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            100 -
              ((duplicateRows + totalMissing) /
                rows) *
                100
          )
        );

  const cards = [
    {
      title: "Rows",
      value: rows.toLocaleString(),
      icon: Database,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
      ring: "ring-blue-100",
    },
    {
      title: "Columns",
      value: columns.toString(),
      icon: Columns3,
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
      ring: "ring-violet-100",
    },
    {
      title: "Missing Values",
      value: totalMissing.toLocaleString(),
      icon: AlertTriangle,
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
      ring: "ring-orange-100",
    },
    {
      title: "Duplicate Rows",
      value: duplicateRows.toLocaleString(),
      icon: CopyCheck,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      ring: "ring-emerald-100",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-8 py-7">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

              <Sparkles size={16} />

              Executive Dataset Summary

            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-900">
              AI Dataset Overview
            </h2>

            <p className="mt-2 max-w-2xl text-slate-500">
              Aura AI inspected your dataset structure,
              quality and completeness before generating
              business insights.
            </p>

          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-8 py-6">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100">

                <ShieldCheck
                  size={30}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Dataset Health
                </p>

                <h2 className="text-4xl font-bold text-emerald-700">
                  {quality}%
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-7 p-8 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-5 text-5xl font-bold text-slate-900">
                    {card.value}
                  </h3>

                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-3xl ${card.bg} ring-8 ${card.ring}`}
                >

                  <Icon
                    size={30}
                    className={card.iconColor}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* AI Summary */}

      <div className="border-t border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-white p-8">

        <div className="flex gap-5">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-blue-100">

            <TrendingUp
              className="text-blue-600"
              size={30}
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              AI Executive Summary
            </h3>

            <p className="mt-3 text-base leading-8 text-slate-600">
              Your uploaded dataset contains{" "}
              <strong>{rows.toLocaleString()}</strong> records and{" "}
              <strong>{columns}</strong> columns.
              Aura AI detected{" "}
              <strong>{totalMissing}</strong> missing values and{" "}
              <strong>{duplicateRows}</strong> duplicate rows before
              building KPIs, dashboards, trend analysis,
              recommendations and executive insights.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}