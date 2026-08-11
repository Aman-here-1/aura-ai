"use client";

import {
  AlertTriangle,
  Copy,
  Database,
  ShieldCheck,
} from "lucide-react";

interface Props {
  dataQuality: Record<string, unknown>;
}

export default function DataQualityCard({ dataQuality }: Props) {
  const score = Number(dataQuality?.score ?? 0);
  const status = String(dataQuality?.status ?? "Unknown");
  const missing = Number(dataQuality?.missing_values ?? 0);
  const duplicates = Number(dataQuality?.duplicate_rows ?? 0);

  const scoreColor =
    score >= 90
      ? "text-emerald-300"
      : score >= 70
        ? "text-amber-300"
        : "text-rose-300";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            Dataset health
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            Data quality
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overall quality assessment of the uploaded dataset.
          </p>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold capitalize text-slate-300">
          {status}
        </span>
      </header>

      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4 sm:p-6">
        <QualityMetric
          icon={<ShieldCheck size={19} className="text-emerald-300" />}
          iconBackground="bg-emerald-400/10"
          label="Quality score"
          value={`${score}%`}
          valueClassName={scoreColor}
          description="Overall confidence in data readiness"
        />

        <QualityMetric
          icon={<Database size={19} className="text-blue-300" />}
          iconBackground="bg-blue-400/10"
          label="Dataset status"
          value={status}
          valueClassName="text-blue-200"
          description="Current validation result"
        />

        <QualityMetric
          icon={<AlertTriangle size={19} className="text-amber-300" />}
          iconBackground="bg-amber-400/10"
          label="Missing values"
          value={missing.toLocaleString()}
          valueClassName="text-amber-200"
          description="Fields requiring review"
        />

        <QualityMetric
          icon={<Copy size={19} className="text-rose-300" />}
          iconBackground="bg-rose-400/10"
          label="Duplicate rows"
          value={duplicates.toLocaleString()}
          valueClassName="text-rose-200"
          description="Records flagged as duplicates"
        />
      </div>
    </section>
  );
}

function QualityMetric({
  icon,
  iconBackground,
  label,
  value,
  valueClassName,
  description,
}: {
  icon: React.ReactNode;
  iconBackground: string;
  label: string;
  value: string;
  valueClassName: string;
  description: string;
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