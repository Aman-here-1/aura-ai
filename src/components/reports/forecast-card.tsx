"use client";

import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
} from "lucide-react";

interface Props {
  forecast: Record<string, unknown>;
}

export default function ForecastCard({
  forecast,
}: Props) {
  const trend =
    String(
      forecast?.trend ?? "Unknown"
    );

  const growth =
    Number(
      forecast?.growth_percent ?? 0
    );

  const predicted =
    Number(
      forecast?.forecast ?? 0
    );

  const movingAverage =
    Number(
      forecast?.moving_average ?? 0
    );

  const confidence =
    Number(
      forecast?.confidence ?? 0
    );

  const isPositive =
    growth >= 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          AI Forecast
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Predicted business performance based on uploaded dataset.
        </p>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2">

        <div className="rounded-2xl bg-blue-50 p-5">

          <div className="mb-3 flex items-center gap-2">

            <Target
              size={20}
              className="text-blue-600"
            />

            <span className="font-semibold text-slate-700">
              Forecast Revenue
            </span>

          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            ₹{predicted.toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-2xl bg-violet-50 p-5">

          <div className="mb-3 flex items-center gap-2">

            <Activity
              size={20}
              className="text-violet-600"
            />

            <span className="font-semibold text-slate-700">
              Moving Average
            </span>

          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            ₹{movingAverage.toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-2xl bg-emerald-50 p-5">

          <div className="mb-3 flex items-center gap-2">

            {isPositive ? (
              <TrendingUp
                size={20}
                className="text-emerald-600"
              />
            ) : (
              <TrendingDown
                size={20}
                className="text-red-600"
              />
            )}

            <span className="font-semibold text-slate-700">
              Growth
            </span>

          </div>

          <h3
            className={`text-3xl font-bold ${
              isPositive
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {growth}%
          </h3>

        </div>

        <div className="rounded-2xl bg-orange-50 p-5">

          <div className="mb-3 flex items-center gap-2">

            <Activity
              size={20}
              className="text-orange-600"
            />

            <span className="font-semibold text-slate-700">
              Confidence
            </span>

          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            {confidence}%
          </h3>

        </div>

      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">

        <p className="text-sm text-slate-600">
          <span className="font-semibold">
            AI Trend:
          </span>{" "}
          {trend}
        </p>

      </div>

    </section>
  );
}