"use client";

import {
  BrainCircuit,
  CheckCircle2,
  Database,
  FileSpreadsheet,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function AnalysisProgress() {
  const { dataset } = useDatasetStore();

  const completed = Boolean(dataset);

  const steps = [
    {
      title: "Reading Dataset",
      description: "Excel / CSV parsed successfully",
      icon: FileSpreadsheet,
    },
    {
      title: "Dataset Intelligence",
      description: "Columns & business metrics detected",
      icon: Database,
    },
    {
      title: "AI Analysis",
      description: "KPIs, charts and insights generated",
      icon: BrainCircuit,
    },
    {
      title: "Dashboard Ready",
      description: "Analysis completed successfully",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-800/80 bg-[#0F172A] shadow-2xl shadow-black/20">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-slate-800/80 px-7 py-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Analysis Progress
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Aura AI processing pipeline
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-semibold text-cyan-300">
              {completed ? "Analysis Complete" : "Processing"}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          BODY
      ====================================================== */}

      <div className="p-7 sm:p-8">
        {/* =====================================================
            PROGRESS
        ====================================================== */}

        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Processing Status
            </span>

            <span className="text-xs font-semibold text-slate-400">
              {completed ? "100%" : "25%"}
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_14px_rgba(59,130,246,0.45)] transition-all duration-700 ${
                completed ? "w-full" : "w-1/4"
              }`}
            />
          </div>
        </div>

        {/* =====================================================
            ANALYSIS STEPS
        ====================================================== */}

        <div className="mt-2 space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group flex min-h-[96px] items-center gap-5 rounded-2xl border border-slate-800/80 bg-[#111827]/70 p-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-[#131E31]"
              >
                {/* Step Icon */}

                <div
                  className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${
                    completed
                      ? "border-emerald-400/20 bg-emerald-400/10"
                      : "border-slate-700 bg-slate-800/80"
                  }`}
                >
                  {completed && (
                    <div className="absolute inset-0 rounded-2xl bg-emerald-400/5 blur-lg" />
                  )}

                  <Icon
                    size={25}
                    className={`relative ${
                      completed
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }`}
                  />
                </div>

                {/* Step Content */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
                        {step.title}
                      </h3>

                      <span className="hidden text-xs font-medium text-slate-600 sm:inline">
                        0{index + 1}
                      </span>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
                        completed
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                          : "border-slate-700 bg-slate-800 text-slate-500"
                      }`}
                    >
                      {completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            AI STATUS
        ====================================================== */}

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] px-5 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
            <BrainCircuit
              size={16}
              className="text-cyan-400"
            />
          </div>

          <p className="text-sm leading-6 text-slate-400">
            {completed
              ? "Aura AI has completed the analysis pipeline. Your business intelligence is ready to explore."
              : "Aura AI is processing your dataset and preparing business intelligence."}
          </p>
        </div>
      </div>
    </section>
  );
}