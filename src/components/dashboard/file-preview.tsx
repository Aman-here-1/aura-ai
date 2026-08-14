"use client";

import {
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  HardDrive,
} from "lucide-react";

interface Props {
  file: File;
}

export default function FilePreview({ file }: Props) {
  const fileSize =
    file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(2)} KB`
      : `${(file.size / 1024 / 1024).toFixed(2)} MB`;

  const extension =
    file.name.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-[#0F172A] shadow-xl shadow-slate-950/20">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <div className="border-b border-slate-800 px-6 py-6 sm:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* File icon */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-950/30">
            <FileSpreadsheet
              size={27}
              className="text-white"
            />
          </div>

          {/* File information */}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
                {file.name}
              </h2>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
                {extension}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Dataset selected and ready for Aura AI analysis
            </p>
          </div>

          {/* Status */}

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs font-semibold text-emerald-300">
              Ready
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          FILE METRICS
      ========================================================== */}

      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
        {/* File Size */}

        <FileMetric
          icon={<HardDrive size={18} />}
          label="File Size"
          value={fileSize}
          iconClass="text-cyan-400"
        />

        {/* Modified */}

        <FileMetric
          icon={<Calendar size={18} />}
          label="Modified"
          value={new Date(file.lastModified).toLocaleDateString("en-IN")}
          iconClass="text-violet-400"
        />

        {/* Status */}

        <FileMetric
          icon={<CheckCircle2 size={18} />}
          label="Status"
          value="Ready for analysis"
          iconClass="text-emerald-400"
          valueClass="text-emerald-300"
        />
      </div>

      {/* =========================================================
          INFORMATION FOOTER
      ========================================================== */}

      <div className="border-t border-slate-800 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 px-6 py-5 sm:px-7">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
            <CheckCircle2
              size={16}
              className="text-cyan-400"
            />
          </div>

          <p className="text-sm leading-6 text-slate-400">
            Your dataset is ready for analysis. Aura AI will automatically
            detect the dataset structure, generate KPIs, build
            visualizations, identify trends, and prepare AI-powered business
            insights.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   FILE METRIC
================================================================ */

interface FileMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconClass: string;
  valueClass?: string;
}

function FileMetric({
  icon,
  label,
  value,
  iconClass,
  valueClass = "text-white",
}: FileMetricProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5 transition-all duration-300 hover:border-slate-700 hover:bg-[#162033]">
      <div className="flex items-center gap-2">
        <span className={iconClass}>
          {icon}
        </span>

        <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          {label}
        </span>
      </div>

      <p
        className={`mt-3 truncate text-lg font-semibold ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}