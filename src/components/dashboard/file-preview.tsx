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

export default function FilePreview({
  file,
}: Props) {
  const fileSize =
    file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(2)} KB`
      : `${(file.size / 1024 / 1024).toFixed(2)} MB`;

  const extension =
    file.name.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
            <FileSpreadsheet
              size={30}
              className="text-white"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold text-slate-900">
              {file.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Dataset ready for AI analysis
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {extension}
          </span>

        </div>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-3">

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <HardDrive
              size={18}
              className="text-slate-500"
            />

            <span className="text-sm font-medium text-slate-500">
              File Size
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {fileSize}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Calendar
              size={18}
              className="text-slate-500"
            />

            <span className="text-sm font-medium text-slate-500">
              Modified
            </span>
          </div>

          <p className="text-lg font-semibold text-slate-900">
            {new Date(file.lastModified).toLocaleDateString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-emerald-600"
            />

            <span className="text-sm font-medium text-emerald-700">
              Status
            </span>
          </div>

          <p className="text-lg font-bold text-emerald-700">
            Ready
          </p>
        </div>

      </div>

      <div className="border-t border-slate-100 bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-5">
        <p className="text-sm leading-7 text-slate-700">
          Your dataset is ready for analysis. Aura AI will automatically
          detect the dataset structure, generate KPIs, build visualizations,
          identify trends, and prepare AI-powered business insights.
        </p>
      </div>

    </div>
  );
}