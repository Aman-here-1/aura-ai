"use client";

import {
  Activity,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Props {
  forecast: Record<string, unknown>;
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ForecastCard({ forecast }: Props) {
  const trend = String(forecast?.trend ?? "Unknown");
  const growth = Number(forecast?.growth_percent ?? 0);
  const predicted = Number(forecast?.forecast ?? 0);
  const movingAverage = Number(forecast?.moving_average ?? 0);
  const confidence = Number(forecast?.confidence ?? 0);

  const isPositive = growth >= 0;
  const GrowthIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            Predictive intelligence
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            AI forecast
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Predicted performance based on the uploaded dataset.
          </p>
        </div>

        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-200">
          {confidence.toFixed(0)}% confidence
        </span>
      </header>

      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
        <ForecastMetric
          icon={<Target size={19} className="text-cyan-300" />}
          iconBackground="bg-cyan-400/10"
          label="Forecast revenue"
          value={formatCurrency(predicted)}
          description="Projected future value"
          valueClassName="text-white"
        />

        <ForecastMetric
          icon={<Activity size={19} className="text-violet-300" />}
          iconBackground="bg-violet-400/10"
          label="Moving average"
          value={formatCurrency(movingAverage)}
          description="Smoothed historic baseline"
          valueClassName="text-white"
        />

        <ForecastMetric
          icon={<GrowthIcon size={19} className={isPositive ? "text-emerald-300" : "text-rose-300"} />}
          iconBackground={isPositive ? "bg-emerald-400/10" : "bg-rose-400/10"}
          label="Expected growth"
          value={`${isPositive ? "+" : ""}${growth.toFixed(2)}%`}
          description="Change versus baseline"
          valueClassName={isPositive ? "text-emerald-300" : "text-rose-300"}
        />

        <ForecastMetric
          icon={<Activity size={19} className="text-amber-300" />}
          iconBackground="bg-amber-400/10"
          label="Model confidence"
          value={`${confidence.toFixed(0)}%`}
          description="Confidence in projection"
          valueClassName="text-amber-200"
        />
      </div>

      <footer className="border-t border-slate-800 bg-slate-900/40 px-5 py-4 sm:px-6">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-slate-200">AI trend: </span>
          {trend}
        </p>
      </footer>
    </section>
  );
}

function ForecastMetric({
  icon,
  iconBackground,
  label,
  value,
  description,
  valueClassName,
}: {
  icon: React.ReactNode;
  iconBackground: string;
  label: string;
  value: string;
  description: string;
  valueClassName: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBackground}`}
        >
          {icon}
        </div>

        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>

      <p className={`mt-5 truncate text-2xl font-bold ${valueClassName}`}>
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
    </article>
  );
}