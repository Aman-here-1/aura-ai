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

  const isUploaded = !!dataset;

  const steps = [
    {
      title: "Reading Excel File",
      status: isUploaded ? "Completed" : "Pending",
      icon: FileSpreadsheet,
    },
    {
      title: "Analyzing Dataset",
      status: isUploaded ? "Completed" : "Pending",
      icon: Database,
    },
    {
      title: "Generating KPIs & Charts",
      status: isUploaded ? "Completed" : "Pending",
      icon: BrainCircuit,
    },
    {
      title: "Dashboard Ready",
      status: isUploaded ? "Completed" : "Pending",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Analysis Progress
      </h2>

      <div className="space-y-5">
        {steps.map((step) => {
          const Icon = step.icon;

          const completed = step.status === "Completed";

          return (
            <div
              key={step.title}
              className="flex items-center gap-4"
            >
              <div
                className={`rounded-xl p-3 ${
                  completed
                    ? "bg-green-100"
                    : "bg-slate-100"
                }`}
              >
                <Icon
                  size={22}
                  className={
                    completed
                      ? "text-green-600"
                      : "text-slate-500"
                  }
                />
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  {step.title}
                </p>

                <p
                  className={`text-sm ${
                    completed
                      ? "text-green-600"
                      : "text-slate-500"
                  }`}
                >
                  {step.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}