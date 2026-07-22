

"use client";
import {
  Download,
  FileSpreadsheet,
  Sparkles,
  Upload,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { generateAIReport } from "../../../Backend/app/services/ai";
import { useAnalysisStore } from "../../store/analysis-store";

const actions = [
  {
    title: "Upload CSV",
    icon: Upload,
  },
  {
    title: "Generate Report",
    icon: FileSpreadsheet,
  },
  {
    title: "Ask Aura AI",
    icon: Sparkles,
  },
  {
    title: "Export PDF",
    icon: Download,
  },
];

export default function QuickActions() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    headers,
    preview,
    intelligence,
    kpis,
    setReport,
  } = useAnalysisStore();

  const handleGenerateReport = async () => {
    try {
      setLoading(true);

      const report = await generateAIReport({
        headers,
        preview,
        intelligence,
        kpis,
      });

      setReport(report);

      router.push("/reports");
    } catch (error) {
      console.error("AI Report Error:", error);

      alert("Failed to generate AI report.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (title: string) => {
    switch (title) {
      case "Generate Report":
        handleGenerateReport();
        break;

      case "Upload CSV":
        router.push("/upload");
        break;

      case "Ask Aura AI":
        alert("Coming Soon 🚀");
        break;

      case "Export PDF":
        alert("PDF Export Coming Soon 🚀");
        break;

      default:
        break;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => handleAction(action.title)}
              disabled={
                loading &&
                action.title === "Generate Report"
              }
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 p-6 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon
                className="mb-3 text-blue-600"
                size={28}
              />

              <span className="text-sm font-medium">
                {loading &&
                action.title === "Generate Report"
                  ? "Generating..."
                  : action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}