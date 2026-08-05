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
    dataset?.kpis?.total_revenue ?? 0
  ).toLocaleString("en-IN");

  const insights =
    Object.keys(dataset?.intelligence ?? {}).length;

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-10 shadow-2xl">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
              <Sparkles size={16} />
              Aura AI Business Analyst
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-white">
              Welcome Back,
              <br />
              Aman 👋
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              {dataset
                ? `Your uploaded dataset contains ${rows.toLocaleString()} records and ${columns} columns. Aura AI has generated KPIs, visualizations and business insights ready for exploration.`
                : "Upload your Excel or CSV dataset to automatically generate KPIs, charts, business insights and AI-powered recommendations."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/reports"
                className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-105"
              >
                View Report
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/upload"
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                Upload Dataset
              </Link>

            </div>

          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4 lg:w-[360px]">

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <TrendingUp className="mb-4 text-green-300" />
              <p className="text-sm text-blue-100">
                Revenue
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                ₹{revenue}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <Database className="mb-4 text-cyan-300" />
              <p className="text-sm text-blue-100">
                Records
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {rows.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <BrainCircuit className="mb-4 text-yellow-300" />
              <p className="text-sm text-blue-100">
                AI Insights
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {insights}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <Activity className="mb-4 text-pink-300" />
              <p className="text-sm text-blue-100">
                Columns
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {columns}
              </h2>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}