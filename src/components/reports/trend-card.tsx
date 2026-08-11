"use client";

import {
  ArrowRight,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Props {
  trend: Record<string, unknown>;
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function TrendCard({ trend }: Props) {
  const trendName = String(trend?.trend ?? "Unknown");
  const growth = Number(trend?.growth ?? 0);
  const start = Number(trend?.start_value ?? 0);
  const end = Number(trend?.end_value ?? 0);
  const message = String(trend?.message ?? "");

  const positive = growth > 0;
  const negative = growth < 0;

  const TrendIcon = positive
    ? TrendingUp
    : negative
      ? TrendingDown
      : Minus;

  const accentColor = positive
    ? "text-emerald-300"
    : negative
      ? "text-rose-300"
      : "text-slate-300";

  const accentBackground = positive
    ? "bg-emerald-400/10"
    : negative
      ? "bg-rose-400/10"
      : "bg-slate-800";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="border-b border-slate-800 px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
          Performance movement
        </p>

        <h2 className="mt-1 text-xl font-semibold text-white">
          Trend analysis
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Growth trend detected from the uploaded data.
        </p>
      </header>

      <div className="grid gap-3 p-5 md:grid-cols-3 sm:p-6">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Detected trend
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accentBackground}`}
            >
              <TrendIcon size={21} className={accentColor} />
            </div>

            <p className={`truncate text-2xl font-bold capitalize ${accentColor}`}>
              {trendName}
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Growth rate
          </p>

          <p className={`mt-5 text-3xl font-bold ${accentColor}`}>
            {positive ? "+" : ""}
            {growth.toFixed(2)}%
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Change across the analysed period
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Revenue movement
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-slate-500">Start</p>
              <p className="mt-1 truncate text-base font-semibold text-slate-100">
                {formatCurrency(start)}
              </p>
            </div>

            <ArrowRight size={17} className="shrink-0 text-slate-600" />

            <div className="min-w-0 flex-1 text-right">
              <p className="text-[11px] text-slate-500">End</p>
              <p className="mt-1 truncate text-base font-semibold text-slate-100">
                {formatCurrency(end)}
              </p>
            </div>
          </div>
        </article>
      </div>

      {message && (
        <footer className="border-t border-slate-800 bg-slate-900/40 px-5 py-4 sm:px-6">
          <p className="text-sm leading-6 text-slate-400">{message}</p>
        </footer>
      )}
    </section>
  );
}