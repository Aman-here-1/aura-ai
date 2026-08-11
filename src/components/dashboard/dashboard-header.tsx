"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Database,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function DashboardHeader() {
  const { dataset } = useDatasetStore();

  const rows = dataset?.rows ?? 0;
  const columns = dataset?.columns ?? 0;

  const revenue = Number(
    dataset?.kpis?.total_revenue ?? 0,
  ).toLocaleString("en-IN");

  const insights =
    Object.keys(dataset?.intelligence ?? {}).length;

  return (
   <section className="mx-5 mb-10 mt-6 sm:mx-6 sm:mb-12 lg:mx-10 lg:mb-16 xl:mx-12 xl:mb-20">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 px-10 py-8 shadow-2xl">
    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

    <div className="relative grid gap-10 lg:grid-cols-[1.7fr_0.9fr] lg:items-start">
      {/* LEFT */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
          <Sparkles size={16} />
          Aura AI Business Analyst
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-tight text-white xl:text-5xl">
          Welcome Back,
          <br />
          Aman 👋
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">
          {dataset
            ? `Your uploaded dataset contains ${rows.toLocaleString()} records and ${columns} columns. Aura AI has already generated KPIs, charts and AI-powered business insights for exploration.`
            : "Upload your Excel or CSV dataset to automatically generate KPIs, charts, business insights and AI-powered recommendations."}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/reports"
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:scale-105"
          >
            View Report
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/upload"
            className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
          >
            Upload Dataset
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="grid grid-cols-2 gap-5 self-start">
        <StatCard
          icon={<TrendingUp className="text-green-300" />}
          title="Revenue"
          value={`₹${revenue}`}
        />

        <StatCard
          icon={<Database className="text-cyan-300" />}
          title="Records"
          value={rows.toLocaleString()}
        />

        <StatCard
          icon={<BrainCircuit className="text-yellow-300" />}
          title="AI Insights"
          value={String(insights)}
        />

        <StatCard
          icon={<Activity className="text-pink-300" />}
          title="Columns"
          value={String(columns)}
        />
      </div>
    </div>
  </div>
</section>
  );
}

interface StatCardProps {

  icon: React.ReactNode;

  title: string;

  value: string;

}

function StatCard({

  icon,

  title,

  value,

}: StatCardProps) {

  return (

    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/15">

      <div className="mb-4">

        {icon}

      </div>

      <p className="text-sm font-medium text-blue-100">

        {title}

      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">

        {value}

      </h2>

    </div>

  );

}