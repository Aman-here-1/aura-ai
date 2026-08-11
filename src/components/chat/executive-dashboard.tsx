"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface ExecutiveKPI {
  title: string;
  value: number;
  display_value: string;
  trend: string;
  change: number;
}

interface ExecutiveHealth {
  status: string;
  score: number;
  color: string;
  rows: number;
  columns: number;
  missing_values: number;
  duplicate_rows: number;
  message: string;
}

interface ExecutiveSummary {
  summary: string;
  highlights: string[];
  health: ExecutiveHealth;
  kpis: ExecutiveKPI[];
}

interface Props {
  executive: ExecutiveSummary;
}

const healthStyles: Record<string, string> = {
  green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  yellow: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  red: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  gray: "border-slate-600 bg-slate-800 text-slate-300",
};

export default function ExecutiveDashboard({ executive }: Props) {
  const healthColor =
    healthStyles[executive.health.color] ?? healthStyles.gray;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            Executive overview
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Key performance indicators and data quality signals
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${healthColor}`}
        >
          {executive.health.status}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {executive.kpis.map((kpi) => {
          const isPositive = kpi.change >= 0;
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          const changeLabel = `${isPositive ? "+" : "-"}${Math.abs(
            kpi.change,
          ).toFixed(1)}%`;

          return (
            <div
              key={kpi.title}
              className="rounded-2xl border border-slate-800 bg-[#111C31] p-4 shadow-sm"
            >
              <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-500">
                {kpi.title}
              </p>

              <p className="mt-3 truncate text-2xl font-bold tracking-tight text-white">
                {kpi.display_value}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  <TrendIcon size={14} />
                  {changeLabel}
                </span>

                <span className="truncate text-xs capitalize text-slate-500">
                  {kpi.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-slate-800 bg-[#111C31] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
              <Activity size={17} className="text-cyan-300" />
            </div>

            <h2 className="text-sm font-semibold text-white">
              Executive summary
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            {executive.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#111C31] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10">
              <Database size={17} className="text-violet-300" />
            </div>

            <h2 className="text-sm font-semibold text-white">Dataset health</h2>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <HealthMetric label="Quality score" value={`${executive.health.score}%`} />
            <HealthMetric label="Records" value={executive.health.rows.toLocaleString()} />
            <HealthMetric label="Columns" value={executive.health.columns.toLocaleString()} />
            <HealthMetric label="Missing values" value={executive.health.missing_values.toLocaleString()} />
            <HealthMetric label="Duplicate rows" value={executive.health.duplicate_rows.toLocaleString()} />
          </div>

          <p className="mt-4 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-500">
            {executive.health.message}
          </p>
        </div>
      </div>

      {executive.highlights.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-[#111C31] p-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">
              Key findings
            </h2>
          </div>

          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {executive.highlights.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3"
              >
                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-400"
                />
                <span className="text-sm leading-6 text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function HealthMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 truncate text-base font-semibold text-slate-100">
        {value}
      </p>
    </div>
  );
}