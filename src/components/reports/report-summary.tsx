"use client";

import ExecutiveSummary from "./executive-summary";
import BusinessInsights from "./business-insights";
import Recommendations from "./recommendations";
import Risks from "./risks";
import ActionPlan from "./action-plan";

export interface AIReport {
  executive_summary: string;
  key_insights: string[];
  recommendations: string[];
  risks: string[];
  action_plan: string[];
}

interface ReportSummaryProps {
  report: AIReport;
}

export default function ReportSummary({
  report,
}: ReportSummaryProps) {
  return (
    <div className="space-y-6">

      <ExecutiveSummary
        summary={report.executive_summary}
      />

      <BusinessInsights
        insights={report.key_insights}
      />

      <Recommendations
        recommendations={report.recommendations}
      />

      <Risks
        risks={report.risks}
      />

      <ActionPlan
        actions={report.action_plan}
      />

    </div>
  );
}