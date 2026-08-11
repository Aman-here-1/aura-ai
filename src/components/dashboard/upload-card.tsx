"use client";

import {
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Database,
  BarChart3,
} from "lucide-react";

interface UploadCardProps {
  fileName?: string;
  fileSize?: string;
  rows?: number;
  columns?: number;
  ready?: boolean;
  onAnalyze?: () => void;
}

export default function UploadCard({
  fileName = "sales_july.xlsx",
  fileSize = "2.4 MB",
  rows = 125487,
  columns = 18,
  ready = true,
  onAnalyze,
}: UploadCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Header */}

      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-white px-7 py-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">

              <FileSpreadsheet
                size={30}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                {fileName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {fileSize}
              </p>

            </div>

          </div>

          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              ready
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >

            <CheckCircle2 size={16} />

            {ready ? "Ready" : "Waiting"}

          </div>

        </div>

      </div>

      {/* Dataset Stats */}

      <div className="grid grid-cols-2 gap-5 border-b border-slate-100 p-7">

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">

            <Database
              className="text-blue-600"
              size={22}
            />

          </div>

          <p className="text-sm text-slate-500">
            Total Rows
          </p>

          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {rows.toLocaleString()}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100">

            <BarChart3
              className="text-violet-600"
              size={22}
            />

          </div>

          <p className="text-sm text-slate-500">
            Columns
          </p>

          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {columns}
          </h3>

        </div>

      </div>

      {/* AI */}

      <div className="p-7">

        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-blue-100 p-3">

              <Sparkles
                className="text-blue-600"
                size={22}
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Aura AI Ready
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your dataset is uploaded successfully.
                Aura AI will automatically generate KPIs,
                executive dashboards, AI insights,
                charts, anomaly detection, root cause
                analysis and business recommendations.
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={onAnalyze}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >

          Analyze with Aura AI

          <ArrowRight size={20} />

        </button>

      </div>

    </div>
  );
}