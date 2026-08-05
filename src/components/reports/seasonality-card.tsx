"use client";

import {
  CalendarRange,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Props {
  seasonality: Record<string, unknown>;
}

export default function SeasonalityCard({
  seasonality,
}: Props) {

  const detected = Boolean(
    seasonality?.seasonality_detected
  );

  const bestMonth = String(
    seasonality?.best_month ?? "-"
  );

  const worstMonth = String(
    seasonality?.worst_month ?? "-"
  );

  const message = String(
    seasonality?.message ?? ""
  );

  const monthlySummary =
    (seasonality?.monthly_summary ??
      {}) as Record<string, number>;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <CalendarRange
            size={24}
            className="text-violet-600"
          />

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Seasonality Analysis
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monthly business performance detected from your dataset.
            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-3">

        <div className="rounded-2xl bg-emerald-50 p-5">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={20}
              className="text-emerald-600"
            />

            <span className="font-medium">
              Best Month
            </span>

          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            {bestMonth}
          </h3>

        </div>

        <div className="rounded-2xl bg-rose-50 p-5">

          <div className="flex items-center gap-2">

            <TrendingDown
              size={20}
              className="text-rose-600"
            />

            <span className="font-medium">
              Worst Month
            </span>

          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            {worstMonth}
          </h3>

        </div>

        <div className="rounded-2xl bg-blue-50 p-5">

          <p className="text-sm text-slate-500">
            Seasonality
          </p>

          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            {detected ? "Detected" : "Not Detected"}
          </h3>

        </div>

      </div>

      {Object.keys(monthlySummary).length > 0 && (

        <div className="border-t border-slate-100 p-6">

          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Monthly Revenue
          </h3>

          <div className="space-y-3">

            {Object.entries(monthlySummary).map(
              ([month, revenue]) => (

                <div
                  key={month}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >

                  <span className="font-medium text-slate-700">
                    {month}
                  </span>

                  <span className="font-bold text-slate-900">
                    ₹{Number(revenue).toLocaleString("en-IN")}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

      )}

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">

        <p className="text-slate-600">
          {message}
        </p>

      </div>

    </section>
  );
}