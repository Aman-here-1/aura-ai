"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import AppShell from "../../components/layout/app-shell";
import ExecutiveSummary from "../../components/ai/executive-summary";
import BusinessInsights from "../../components/reports/business-insights";
import Recommendations from "../../components/reports/recommendations";
import ForecastCard from "../../components/reports/forecast-card";
import TrendCard from "../../components/reports/trend-card";
import DataQualityCard from "../../components/reports/data-quality-card";
import CorrelationCard from "../../components/reports/correlation-card";
import RootCauseCard from "../../components/reports/root-cause-card";
import BusinessRulesCard from "../../components/reports/business-rules-card";
import StatisticsCard from "../../components/reports/statistics-card";
import SeasonalityCard from "../../components/reports/seasonality-card";
import ExplainabilityCard from "../../components/reports/explainability-card";
import NarrativeCard from "../../components/reports/narrative-card";

import { useAnalysisStore } from "../../store/analysis-store";

export default function ReportsPage() {
  const { report } = useAnalysisStore();

  if (!report) {
    return (
      <AppShell>
        <div className="flex min-h-[70vh] items-center justify-center py-6 lg:py-8">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="flex w-full justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
                <FileText size={38} className="text-blue-600" />
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              No AI Report Available
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              Upload a dataset and generate an AI report to view executive
              summaries, business insights, risks and recommendations.
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
      <div className="flex flex-col gap-8 py-6 lg:gap-10 lg:py-8">
        <section>
          <h1 className="text-4xl font-bold text-slate-900">
            AI Business Report
          </h1>

          <p className="mt-4 text-slate-500">
            Executive summary and AI-generated business insights.
          </p>
        </section>

        <section>
          <ExecutiveSummary summary={report.summary} />
        </section>

        <section>
          <ForecastCard forecast={report.forecast} />
        </section>

        <section>
          <TrendCard trend={report.trend} />
        </section>

        <section>
          <DataQualityCard dataQuality={report.data_quality} />
        </section>

        <section>
          <CorrelationCard correlation={report.correlation} />
        </section>

        <section>
          <RootCauseCard rootCauses={report.root_causes} />
        </section>

        <section>
          <BusinessRulesCard rules={report.business_rules} />
        </section>

        <section>
          <StatisticsCard statistics={report.statistics} />
        </section>

        <section>
          <SeasonalityCard seasonality={report.seasonality} />
        </section>

        <section>
          <ExplainabilityCard explainability={report.explainability} />
        </section>

        <section>
          <NarrativeCard narrative={report.narrative} />
        </section>

        <section>
          <BusinessInsights insights={report.insights} />
        </section>

        <section>
          <Recommendations recommendations={report.recommendations} />
        </section>
      </div>
    </AppShell>
  );
}