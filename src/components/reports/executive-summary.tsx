import { Sparkles } from "lucide-react";

interface ExecutiveSummaryProps {
  summary: string;
}

export default function ExecutiveSummary({
  summary,
}: ExecutiveSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-2">
          <Sparkles className="text-white" size={20} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Executive Summary
          </h2>

          <p className="text-sm text-slate-500">
            AI generated business overview
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <p className="leading-8 text-slate-700">
          {summary ||
            "AI summary will appear here after report generation."}
        </p>
      </div>
    </div>
  );
}