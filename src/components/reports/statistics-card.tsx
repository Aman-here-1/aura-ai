"use client";

import {
  Sigma,
  BarChart3,
} from "lucide-react";

interface Props {
  statistics: Record<string, unknown>;
}

export default function StatisticsCard({
  statistics,
}: Props) {

  const count = Number(
    statistics?.count ?? 0
  );

  const mean = Number(
    statistics?.mean ?? 0
  );

  const median = Number(
    statistics?.median ?? 0
  );

  const minimum = Number(
    statistics?.min ?? 0
  );

  const maximum = Number(
    statistics?.max ?? 0
  );

  const range = Number(
    statistics?.range ?? 0
  );

  const stdDev = Number(
    statistics?.std_dev ?? 0
  );

  const variance = Number(
    statistics?.variance ?? 0
  );

  const message = String(
    statistics?.message ?? ""
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <Sigma
            size={24}
            className="text-indigo-600"
          />

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Statistical Analysis
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic descriptive statistics of detected numeric data.
            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-5 p-6 md:grid-cols-4">

        <StatCard
          title="Count"
          value={count}
        />

        <StatCard
          title="Mean"
          value={mean}
        />

        <StatCard
          title="Median"
          value={median}
        />

        <StatCard
          title="Range"
          value={range}
        />

        <StatCard
          title="Minimum"
          value={minimum}
        />

        <StatCard
          title="Maximum"
          value={maximum}
        />

        <StatCard
          title="Std Dev"
          value={stdDev}
        />

        <StatCard
          title="Variance"
          value={variance}
        />

      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">

        <div className="flex items-center gap-2">

          <BarChart3
            size={18}
            className="text-indigo-600"
          />

          <p className="text-slate-600">
            {message}
          </p>

        </div>

      </div>

    </section>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-3 text-2xl font-bold text-slate-900">
        {value.toLocaleString("en-IN")}
      </h3>

    </div>
  );
}