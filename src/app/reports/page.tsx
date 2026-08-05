"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import AppShell from "../../components/layout/app-shell";
import ExecutiveSummary from "../../components/ai/executive-summary";
import BusinessInsights from "../../components/reports/business-insights";
import Recommendations from "../../components/reports/recommendations";

import { useAnalysisStore } from "../../store/analysis-store";

export default function ReportsPage() {
  const { report } = useAnalysisStore();

  if (!report) {
    return (
      <AppShell>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
              <FileText
                size={38}
                className="text-blue-600"
              />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              No AI Report Available
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              Upload a dataset and generate an AI report to
              view executive summaries, business insights,
              risks and recommendations.
            </p>

            <Link
              href="/upload"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={18} />
              Upload Dataset
            </Link>

          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          AI Business Report
        </h1>

        <p className="mt-2 text-slate-500">
          Executive summary and AI-generated business insights.
        </p>
      </div>

      <div className="space-y-6">

        <ExecutiveSummary
          summary={report.summary}
        />

        <BusinessInsights
          insights={report.insights}
        />

        <Recommendations
          recommendations={report.recommendations}
        />

      </div>
    </AppShell>
  );
}