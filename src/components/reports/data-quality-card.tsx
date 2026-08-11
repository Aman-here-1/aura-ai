"use client";

import {
  ShieldCheck,
  Database,
  Copy,
  AlertTriangle,
} from "lucide-react";

interface Props {
  dataQuality: Record<string, unknown>;
}

export default function DataQualityCard({
  dataQuality,
}: Props) {

  const score = Number(
    dataQuality?.score ?? 0
  );

  const status = String(
    dataQuality?.status ?? "Unknown"
  );

  const missing = Number(
    dataQuality?.missing_values ?? 0
  );

  const duplicates = Number(
    dataQuality?.duplicate_rows ?? 0
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Data Quality
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall quality assessment of uploaded dataset.
        </p>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-4">

        <div className="rounded-2xl bg-emerald-50 p-5">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={20}
              className="text-emerald-600"
            />

            <span className="text-sm font-medium">
              Quality Score
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold">
            {score}%
          </h3>

        </div>

        <div className="rounded-2xl bg-blue-50 p-5">

          <div className="flex items-center gap-2">

            <Database
              size={20}
              className="text-blue-600"
            />

            <span className="text-sm font-medium">
              Status
            </span>

          </div>

          <h3 className="mt-4 text-2xl font-bold">
            {status}
          </h3>

        </div>

        <div className="rounded-2xl bg-amber-50 p-5">

          <div className="flex items-center gap-2">

            <AlertTriangle
              size={20}
              className="text-amber-600"
            />

            <span className="text-sm font-medium">
              Missing Values
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold">
            {missing}
          </h3>

        </div>

        <div className="rounded-2xl bg-rose-50 p-5">

          <div className="flex items-center gap-2">

            <Copy
              size={20}
              className="text-rose-600"
            />

            <span className="text-sm font-medium">
              Duplicate Rows
            </span>

          </div>

          <h3 className="mt-4 text-3xl font-bold">
            {duplicates}
          </h3>

        </div>

      </div>

    </section>
  );
}