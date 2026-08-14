"use client";

import {
  Download,
  FileSpreadsheet,
  Sparkles,
  Upload,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { generateAIReport } from "../../lib/api/ai";
import { useAnalysisStore } from "../../store/analysis-store";

const actions = [
  {
    title: "Upload Dataset",
    description: "Upload Excel or CSV dataset",
    icon: Upload,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    iconBorder: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/30",
    glow: "group-hover:shadow-cyan-950/20",
  },
  {
    title: "Generate Report",
    description: "Generate AI business report",
    icon: FileSpreadsheet,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    iconBorder: "border-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/30",
    glow: "group-hover:shadow-emerald-950/20",
  },
  {
    title: "Ask Aura AI",
    description: "Chat with your AI analyst",
    icon: Sparkles,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10",
    iconBorder: "border-violet-400/10",
    hoverBorder: "hover:border-violet-400/30",
    glow: "group-hover:shadow-violet-950/20",
  },
  {
    title: "Export PDF",
    description: "Download business report",
    icon: Download,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-400/10",
    iconBorder: "border-orange-400/10",
    hoverBorder: "hover:border-orange-400/30",
    glow: "group-hover:shadow-orange-950/20",
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
    <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-[#0B1120] shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-6 sm:px-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.7)]" />

              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                Quick Actions
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Frequently used business analysis tools
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 sm:flex">
            <Sparkles size={12} className="text-violet-400" />

            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Workspace
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-6">
        {actions.map((action) => {
          const Icon = action.icon;

          const disabled =
            loading &&
            action.title === "Generate Report";

          return (
            <button
              key={action.title}
              type="button"
              onClick={() => handleAction(action.title)}
              disabled={disabled}
              className={`
                group relative overflow-hidden
                rounded-2xl
                border border-slate-800
                bg-slate-900/40
                p-5
                text-left
                shadow-lg shadow-black/5
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-slate-900/80
                hover:shadow-xl
                ${action.hoverBorder}
                ${action.glow}
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
              `}
            >
              {/* Subtle background glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/[0.02] blur-2xl transition-all duration-300 group-hover:scale-150" />

              <div className="relative">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className={`
                      flex h-12 w-12 items-center justify-center
                      rounded-2xl
                      border
                      ${action.iconBg}
                      ${action.iconBorder}
                      transition-all duration-300
                      group-hover:scale-105
                    `}
                  >
                    {disabled ? (
                      <Loader2
                        size={22}
                        className="animate-spin text-emerald-400"
                      />
                    ) : (
                      <Icon
                        size={22}
                        className={action.iconColor}
                      />
                    )}
                  </div>

                  {!disabled && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-800 bg-slate-950/60 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowUpRight
                        size={14}
                        className="text-slate-400"
                      />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-slate-200 transition-colors group-hover:text-white">
                    {disabled
                      ? "Generating..."
                      : action.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {action.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="mt-5 flex items-center gap-2">
                  <span
                    className={`h-1 w-1 rounded-full ${action.iconBg.replace(
                      "/10",
                      "",
                    )}`}
                  />

                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600 transition-colors group-hover:text-slate-500">
                    {disabled
                      ? "Processing"
                      : "Open tool"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          AI workspace ready
        </div>
      </div>
    </section>
  );
}