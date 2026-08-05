"use client";

import {
  Download,
  FileSpreadsheet,
  Sparkles,
  Upload,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { generateAIReport } from "../../lib/api/ai";
import { useAnalysisStore } from "../../store/analysis-store";

const actions = [
  {
    title: "Upload Dataset",
    description: "Upload Excel or CSV dataset",
    icon: Upload,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Generate Report",
    description: "Generate AI business report",
    icon: FileSpreadsheet,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Ask Aura AI",
    description: "Chat with your AI analyst",
    icon: Sparkles,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Export PDF",
    description: "Download business report",
    icon: Download,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function QuickActions() {
  const router = useRouter();

  const {
    analysis,
    report,
    loading,
    setLoading,
    setError,
    setReport,
  } = useAnalysisStore();

  const handleGenerateReport = async () => {
    if (!analysis) {
      alert("Please upload a dataset first.");
      router.push("/upload");
      return;
    }

    try {
      setLoading(true);

      const aiReport = await generateAIReport(analysis);

      setReport(aiReport);

      router.push("/reports");
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate AI report.";

      setError(message);

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "Upload Dataset":
        router.push("/upload");
        break;

      case "Generate Report":
        handleGenerateReport();
        break;

      case "Ask Aura AI":
        router.push("/analysis");
        break;

      case "Export PDF":
        if (!report) {
          alert("Generate a report first.");
          return;
        }

        alert("PDF Export coming in next update.");
        break;

      default:
        break;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used business analysis tools
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 p-6">
        {actions.map((action) => {
          const Icon = action.icon;

          const disabled =
            loading &&
            action.title === "Generate Report";

          return (
            <button
              key={action.title}
              onClick={() => handleAction(action.title)}
              disabled={disabled}
              className="group rounded-2xl border border-slate-200 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="text-base font-semibold text-slate-900">
                {disabled ? "Generating..." : action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}