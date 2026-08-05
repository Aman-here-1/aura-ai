"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  CheckCircle2,
  FileSpreadsheet,
  UploadCloud,
} from "lucide-react";

interface Props {
  onFileSelect(file: File): void;
}

export default function UploadZone({
  onFileSelect,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group relative overflow-hidden rounded-3xl border-2 border-dashed bg-white p-12 text-center transition-all duration-300 ${
        isDragActive
          ? "border-blue-600 bg-blue-50 shadow-2xl"
          : "border-slate-300 shadow-sm hover:border-blue-500 hover:shadow-xl"
      }`}
    >
      <input {...getInputProps()} />

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
          <UploadCloud
            size={42}
            className="text-white"
          />
        </div>

        <h2 className="mt-8 text-4xl font-bold tracking-tight text-slate-900">
          Upload Your Dataset
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
          Drag & drop your business dataset or click to browse.
          Aura AI will automatically detect KPIs, generate
          dashboards, charts, business insights and AI reports.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
            <FileSpreadsheet size={18} />
            CSV
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
            <FileSpreadsheet size={18} />
            XLS
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
            <FileSpreadsheet size={18} />
            XLSX
          </div>

        </div>

        <button
          type="button"
          className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
        >
          Browse Files
        </button>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />
            AI Analysis
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />
            KPI Detection
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />
            Smart Charts
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />
            AI Reports
          </div>

        </div>

      </div>
    </div>
  );
}