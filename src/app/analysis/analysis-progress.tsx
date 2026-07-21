import { BrainCircuit, Database, FileSpreadsheet, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Reading Excel File",
    status: "Completed",
    icon: FileSpreadsheet,
  },
  {
    title: "Cleaning Dataset",
    status: "Completed",
    icon: Database,
  },
  {
    title: "Generating AI Insights",
    status: "Running",
    icon: BrainCircuit,
  },
  {
    title: "Preparing Dashboard",
    status: "Pending",
    icon: CheckCircle2,
  },
];

export default function AnalysisProgress() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Analysis Progress
      </h2>

      <div className="space-y-5">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex items-center gap-4"
            >
              <div className="rounded-xl bg-blue-100 p-3">
                <Icon
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  {step.title}
                </p>

                <p className="text-sm text-slate-500">
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