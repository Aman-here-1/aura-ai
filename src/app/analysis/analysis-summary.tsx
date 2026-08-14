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
              ((duplicateRows + totalMissing) / rows) * 100
          )
        );

  const cards = [
    {
      title: "Rows",
      value: rows.toLocaleString(),
      icon: Database,
      iconColor: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/15",
    },
    {
      title: "Columns",
      value: columns.toString(),
      icon: Columns3,
      iconColor: "text-violet-400",
      bg: "bg-violet-400/10",
      border: "border-violet-400/15",
    },
    {
      title: "Missing Values",
      value: totalMissing.toLocaleString(),
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/15",
    },
    {
      title: "Duplicate Rows",
      value: duplicateRows.toLocaleString(),
      icon: CopyCheck,
      iconColor: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/15",
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-800/80 bg-[#0F172A] shadow-2xl shadow-black/20">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative overflow-hidden border-b border-slate-800/80 px-7 py-7 sm:px-8">
        {/* Background glow */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300">
              <Sparkles size={15} />

              Executive Dataset Summary
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              AI Dataset Overview
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Aura AI inspected your dataset structure,
              quality and completeness before generating
              business insights.
            </p>
          </div>

          {/* Dataset Health */}

          <div className="shrink-0 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06] px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                <div className="absolute inset-0 rounded-2xl bg-emerald-400/5 blur-lg" />

                <ShieldCheck
                  size={27}
                  className="relative text-emerald-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Dataset Health
                </p>

                <h2 className="mt-1 text-3xl font-bold text-emerald-400">
                  {quality}%
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid gap-4 p-7 sm:grid-cols-2 sm:gap-5 sm:p-8 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`group rounded-2xl border ${card.border} bg-[#111827]/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#131E31] hover:shadow-xl hover:shadow-black/10`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h3 className="mt-4 truncate text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${card.border} ${card.bg}`}
                >
                  <Icon
                    size={23}
                    className={card.iconColor}
                  />
                </div>
              </div>

              <div className="mt-5 h-px bg-slate-800/80" />

              <p className="mt-4 text-xs text-slate-600">
                Detected from uploaded dataset
              </p>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          AI SUMMARY
      ====================================================== */}

      <div className="border-t border-slate-800/80 bg-gradient-to-r from-cyan-400/[0.04] via-blue-500/[0.03] to-violet-500/[0.04] p-7 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Icon */}

          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-lg" />

            <TrendingUp
              className="relative text-cyan-400"
              size={25}
            />
          </div>

          {/* Content */}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-bold text-white sm:text-xl">
                AI Executive Summary
              </h3>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                AI Generated
              </span>
            </div>

            <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-400 sm:text-base">
              Your uploaded dataset contains{" "}
              <strong className="font-semibold text-slate-200">
                {rows.toLocaleString()}
              </strong>{" "}
              records and{" "}
              <strong className="font-semibold text-slate-200">
                {columns}
              </strong>{" "}
              columns. Aura AI detected{" "}
              <strong className="font-semibold text-amber-400">
                {totalMissing}
              </strong>{" "}
              missing values and{" "}
              <strong className="font-semibold text-emerald-400">
                {duplicateRows}
              </strong>{" "}
              duplicate rows before building KPIs,
              dashboards, trend analysis, recommendations
              and executive insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}