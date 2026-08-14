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

  const insights = Object.keys(
    dataset?.intelligence ?? {},
  ).length;

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-[#0B1120] shadow-2xl shadow-black/20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%)]" />

      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.45fr_1fr] lg:p-9 xl:p-10">
        {/* LEFT */}
        <div className="flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-2.5 text-xs font-semibold text-cyan-300">
            <Sparkles size={14} />
            Aura AI Business Analyst

            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-5xl">
            Welcome back,
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Aman 👋
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            {dataset
              ? `Your uploaded dataset contains ${rows.toLocaleString()} records and ${columns} columns. Aura AI has generated KPIs, charts and business intelligence for exploration.`
              : "Upload your Excel or CSV dataset to automatically generate KPIs, charts, business insights and AI-powered recommendations."}
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/reports"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500"
            >
              View Report
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/upload"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-cyan-400/30 hover:bg-slate-800"
            >
              Upload Dataset
            </Link>
          </div>
        </div>

        {/* RIGHT — STATS */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            icon={<TrendingUp size={18} />}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-400/10"
            title="Revenue"
            value={`₹${revenue}`}
          />

          <StatCard
            icon={<Database size={18} />}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-400/10"
            title="Records"
            value={rows.toLocaleString()}
          />

          <StatCard
            icon={<BrainCircuit size={18} />}
            iconColor="text-violet-400"
            iconBg="bg-violet-400/10"
            title="AI Insights"
            value={String(insights)}
          />

          <StatCard
            icon={<Activity size={18} />}
            iconColor="text-orange-400"
            iconBg="bg-orange-400/10"
            title="Columns"
            value={String(columns)}
          />
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string;
}

function StatCard({
  icon,
  iconColor,
  iconBg,
  title,
  value,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-500/5 blur-2xl transition-opacity group-hover:opacity-100" />

      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <p className="relative mt-4 text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
        {title}
      </p>

      <h2 className="relative mt-2 truncate text-2xl font-bold tracking-tight text-white xl:text-3xl">
        {value}
      </h2>
    </div>
  );
}