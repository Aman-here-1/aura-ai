"use client";
import ExecutiveSummary from "../../components/ai/executive-summary"
import BusinessInsights from "../../components/reports/business-insights";
import Recommendations from "../../components/reports/recommendations";
import { useAnalysisStore } from "../../store/analysis-store";

export default function ReportsPage() {
  const { report } = useAnalysisStore();

  if (!report) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold">No Report Available</h2>
        <p className="mt-2 text-gray-500">
          Generate an AI report from the dashboard first.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <ExecutiveSummary summary={report.summary} />

      <BusinessInsights insights={report.insights} />

      <Recommendations recommendations={report.recommendations} />
    </main>
  );
}