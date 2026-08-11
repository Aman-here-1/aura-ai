"use client";

import {
  BarChart3,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface BusinessMetric {
  title: string;
  value: number;
  formatted_value: string;
  unit: string;
  trend: string;
  description: string;
}

interface BusinessMetrics {
  metrics: BusinessMetric[];
}

interface Props {
  metrics: BusinessMetrics;
}

type TrendPresentation = {
  icon: typeof TrendingUp;
  iconColor: string;
  badgeColor: string;
  label: string;
};

function getTrendPresentation(trend: string): TrendPresentation {
  const normalizedTrend = trend.toLowerCase().trim();

  switch (normalizedTrend) {
    case "up":
    case "increase":
    case "positive":
    case "growth":
      return {
        icon: TrendingUp,
        iconColor: "text-emerald-400",
        badgeColor:
          "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
        label: trend,
      };

    case "down":
    case "decrease":
    case "negative":
    case "decline":
      return {
        icon: TrendingDown,
        iconColor: "text-rose-400",
        badgeColor:
          "border border-rose-400/20 bg-rose-400/10 text-rose-300",
        label: trend,
      };

    default:
      return {
        icon: Minus,
        iconColor: "text-slate-400",
        badgeColor: "border border-slate-700 bg-slate-800 text-slate-300",
        label: trend || "No change",
      };
  }
}

export default function BusinessMetricsCard({ metrics }: Props) {
  if (!metrics || !metrics.metrics || metrics.metrics.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111C31] p-5 shadow-sm sm:p-6">
      <header className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
          <BarChart3 size={19} className="text-cyan-300" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">
            Business metrics
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Key performance indicators generated from this analysis.
          </p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.metrics.map((metric, index) => {
          const trend = getTrendPresentation(metric.trend);
          const TrendIcon = trend.icon;

          return (
            <article
              key={`${metric.title}-${index}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {metric.title}
                </p>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                  <TrendIcon size={17} className={trend.iconColor} />
                </div>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <p className="truncate text-2xl font-bold tracking-tight text-white">
                  {metric.formatted_value}
                </p>

                {metric.unit && (
                  <span className="mb-1 truncate text-xs text-slate-500">
                    {metric.unit}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${trend.badgeColor}`}
                >
                  {trend.label}
                </span>
              </div>

              <p className="mt-4 border-t border-slate-800 pt-3 text-sm leading-6 text-slate-400">
                {metric.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}