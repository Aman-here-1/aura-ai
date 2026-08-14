"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  CheckCircle2,
  FileSpreadsheet,
  UploadCloud,
  Sparkles,
} from "lucide-react";

interface Props {
  onFileSelect(file: File): void;
}

export default function UploadZone({ onFileSelect }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect],
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
      className={`group relative overflow-hidden rounded-[32px] border bg-[#0F172A] px-6 py-10 text-center shadow-2xl shadow-slate-950/20 transition-all duration-300 sm:px-10 sm:py-14 lg:px-16 lg:py-16 ${
        isDragActive
          ? "border-cyan-400 bg-[#111C32] shadow-cyan-950/30"
          : "border-slate-800 hover:border-cyan-400/40 hover:bg-[#111827]"
      }`}
    >
      <input {...getInputProps()} />

      {/* =========================================================
          BACKGROUND GLOWS
      ========================================================== */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/15" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />

      <div className="relative">
        {/* =========================================================
            ICON
        ========================================================== */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-xl shadow-blue-950/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <UploadCloud
            size={38}
            strokeWidth={1.8}
            className="text-white"
          />
        </div>

        {/* =========================================================
            TITLE
        ========================================================== */}

        <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Upload Your Dataset
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Drag & drop your business dataset here or click anywhere to browse.
          Aura AI will automatically detect your data structure and prepare it
          for analysis.
        </p>

        {/* =========================================================
            FILE TYPES
        ========================================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <FileTypeBadge label="CSV" />

          <FileTypeBadge label="XLS" />

          <FileTypeBadge label="XLSX" />
        </div>

        {/* =========================================================
            BROWSE BUTTON
        ========================================================== */}

        <button
          type="button"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0F172A]"
        >
          <UploadCloud size={18} />
          Browse Files
        </button>

        {/* =========================================================
            DIVIDER
        ========================================================== */}

        <div className="mx-auto mt-10 flex max-w-xl items-center gap-4">
          <div className="h-px flex-1 bg-slate-800" />

          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-600">
            Aura AI will handle the rest
          </span>

          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* =========================================================
            CAPABILITIES
        ========================================================== */}

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <Capability label="AI Analysis" />

          <Capability label="KPI Detection" />

          <Capability label="Smart Charts" />

          <Capability label="AI Reports" />
        </div>

        {/* =========================================================
            DRAG STATE
        ========================================================== */}

        {isDragActive && (
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300">
            <Sparkles size={14} />
            Drop your dataset to begin
          </div>
        )}
      </div>
    </div>
  );
}

/* ===============================================================
   FILE TYPE BADGE
================================================================ */

function FileTypeBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 group-hover:border-slate-600">
      <FileSpreadsheet
        size={16}
        className="text-cyan-400"
      />

      {label}
    </div>
  );
}

/* ===============================================================
   CAPABILITY
================================================================ */

function Capability({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
      <CheckCircle2
        size={15}
        className="text-emerald-400"
      />

      {label}
    </div>
  );
}