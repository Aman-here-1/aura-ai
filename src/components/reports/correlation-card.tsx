"use client";

import {
  GitBranch,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface Props {
  correlation: Record<string, unknown>;
}

export default function CorrelationCard({
  correlation,
}: Props) {

  const coefficient = Number(
    correlation?.coefficient ?? 0
  );

  const relationship = String(
    correlation?.relationship ?? "Unknown"
  );

  const columnX = String(
    correlation?.column_x ?? "-"
  );

  const columnY = String(
    correlation?.column_y ?? "-"
  );

  const message = String(
    correlation?.message ?? ""
  );

  const positive = coefficient > 0;

  const negative = coefficient < 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Correlation Analysis
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Relationship between detected business metrics.
        </p>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-3">

        <div className="rounded-2xl bg-blue-50 p-5">

          <div className="flex items-center gap-2">

            <GitBranch
              size={20}
              className="text-blue-600"
            />

            <span className="font-medium">
              Correlation
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            {coefficient.toFixed(2)}
          </h3>

        </div>

        <div className="rounded-2xl bg-emerald-50 p-5">

          <div className="flex items-center gap-2">

            {positive ? (
              <TrendingUp
                size={20}
                className="text-emerald-600"
              />
            ) : negative ? (
              <TrendingDown
                size={20}
                className="text-red-600"
              />
            ) : (
              <Minus
                size={20}
                className="text-slate-500"
              />
            )}

            <span className="font-medium">
              Relationship
            </span>

          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            {relationship}
          </h3>

        </div>

        <div className="rounded-2xl bg-violet-50 p-5">

          <p className="text-sm text-slate-500">
            Compared Columns
          </p>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            {columnX}
          </h3>

          <p className="my-2 text-slate-400">
            vs
          </p>

          <h3 className="text-lg font-bold text-slate-900">
            {columnY}
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