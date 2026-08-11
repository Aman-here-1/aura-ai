"use client";

import {
  GitBranch,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Props {
  correlation: Record<string, unknown>;
}

function getStrength(coefficient: number) {
  const absoluteCoefficient = Math.abs(coefficient);

  if (absoluteCoefficient >= 0.7) {
    return "Strong";
  }

  if (absoluteCoefficient >= 0.4) {
    return "Moderate";
  }

  if (absoluteCoefficient > 0) {
    return "Weak";
  }

  return "No detected";
}

export default function CorrelationCard({ correlation }: Props) {
  const coefficient = Number(correlation?.coefficient ?? 0);
  const relationship = String(correlation?.relationship ?? "Unknown");
  const columnX = String(correlation?.column_x ?? "-");
  const columnY = String(correlation?.column_y ?? "-");
  const message = String(correlation?.message ?? "");

  const positive = coefficient > 0;
  const negative = coefficient < 0;

  const RelationshipIcon = positive
    ? TrendingUp
    : negative
      ? TrendingDown
      : Minus;

  const relationshipColor = positive
    ? "text-emerald-300"
    : negative
      ? "text-rose-300"
      : "text-slate-300";

  const relationshipBackground = positive
    ? "bg-emerald-400/10"
    : negative
      ? "bg-rose-400/10"
      : "bg-slate-800";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="border-b border-slate-800 px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
          Relationship analysis
        </p>

        <h2 className="mt-1 text-xl font-semibold text-white">
          Correlation analysis
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Relationship between detected business metrics.
        </p>
      </header>

      <div className="grid gap-3 p-5 md:grid-cols-3 sm:p-6">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
              <GitBranch size={18} className="text-cyan-300" />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Correlation coefficient
            </p>
          </div>

          <p className="mt-5 text-3xl font-bold text-white">
            {coefficient.toFixed(2)}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {getStrength(coefficient)} relationship strength
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${relationshipBackground}`}
            >
              <RelationshipIcon size={18} className={relationshipColor} />
            </div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Relationship
            </p>
          </div>

          <p className={`mt-5 truncate text-2xl font-bold capitalize ${relationshipColor}`}>
            {relationship}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {positive
              ? "Metrics tend to move together."
              : negative
                ? "Metrics tend to move in opposite directions."
                : "No directional relationship was detected."}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Compared fields
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="max-w-[42%] truncate rounded-lg bg-violet-400/10 px-2.5 py-1.5 text-sm font-medium text-violet-200">
              {columnX}
            </span>

            <span className="text-xs font-semibold text-slate-600">VS</span>

            <span className="max-w-[42%] truncate rounded-lg bg-blue-400/10 px-2.5 py-1.5 text-sm font-medium text-blue-200">
              {columnY}
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Correlation indicates association, not causation.
          </p>
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