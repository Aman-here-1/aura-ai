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
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Analysis Progress
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Aura AI processing pipeline
        </p>

      </div>

      <div className="p-6">

        <div className="mb-8 h-3 overflow-hidden rounded-full bg-slate-100">

          <div
            className={`h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 ${
              completed ? "w-full" : "w-1/4"
            }`}
          />

        </div>

        <div className="space-y-5">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex items-start gap-5 rounded-2xl border border-slate-100 p-5 transition hover:border-blue-200 hover:bg-slate-50"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    completed
                      ? "bg-emerald-100"
                      : "bg-slate-100"
                  }`}
                >
                  <Icon
                    size={26}
                    className={
                      completed
                        ? "text-emerald-600"
                        : "text-slate-500"
                    }
                  />
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {completed ? "Completed" : "Pending"}
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}