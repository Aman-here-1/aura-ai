"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface Props {
  trend: Record<string, unknown>;
}

export default function TrendCard({
  trend,
}: Props) {

  const trendName =
    String(
      trend?.trend ?? "Unknown"
    );

  const growth =
    Number(
      trend?.growth ?? 0
    );

  const start =
    Number(
      trend?.start_value ?? 0
    );

  const end =
    Number(
      trend?.end_value ?? 0
    );

  const message =
    String(
      trend?.message ?? ""
    );

  const positive = growth > 0;

  const negative = growth < 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Trend Analysis
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Growth trend detected from uploaded data.
        </p>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-3">

        <div className="rounded-2xl bg-blue-50 p-5">

          <p className="text-sm text-slate-500">
            Trend
          </p>

          <div className="mt-4 flex items-center gap-3">

            {positive ? (
              <TrendingUp
                size={26}
                className="text-emerald-600"
              />
            ) : negative ? (
              <TrendingDown
                size={26}
                className="text-red-600"
              />
            ) : (
              <Minus
                size={26}
                className="text-slate-500"
              />
            )}

            <h3 className="text-2xl font-bold">
              {trendName}
            </h3>

          </div>

        </div>

        <div className="rounded-2xl bg-emerald-50 p-5">

          <p className="text-sm text-slate-500">
            Growth
          </p>

          <h3
            className={`mt-4 text-3xl font-bold ${
              positive
                ? "text-emerald-600"
                : negative
                ? "text-red-600"
                : "text-slate-700"
            }`}
          >
            {growth}%
          </h3>

        </div>

        <div className="rounded-2xl bg-violet-50 p-5">

          <p className="text-sm text-slate-500">
            Revenue Change
          </p>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            ₹{start.toLocaleString("en-IN")}
          </h3>

          <p className="mt-2 text-center text-slate-400">
            ↓
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            ₹{end.toLocaleString("en-IN")}
          </h3>

        </div>

      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">

        <p className="text-slate-600">
          {message}
        </p>

      </div>

    </section>
  );
}