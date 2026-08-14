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

  /*
   * ============================================================
   * NO REPORT STATE
   * ============================================================
   */

  if (!report) {
    return (
      <AppShell>
        <main className="flex min-h-[calc(100dvh-120px)] items-center justify-center px-4 py-8 lg:px-6 lg:py-10">

          <section className="w-full max-w-lg rounded-[28px] border border-slate-800 bg-[#111C31] p-8 text-center shadow-xl shadow-slate-950/20 sm:p-10">

            {/* Icon */}

            <div className="flex justify-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/20">

                <FileText
                  size={30}
                  className="text-cyan-300"
                />

              </div>

            </div>

            {/* Label */}

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
              Reports workspace
            </p>

            {/* Heading */}

            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              No AI report available
            </h2>

            {/* Description */}

            <p className="mt-3 leading-7 text-slate-400">
              Upload a dataset and generate an AI report to view executive
              summaries, business insights, risks, and recommendations.
            </p>

            {/* CTA */}

            <Link
              href="/upload"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl"
            >
              <ArrowLeft size={17} />
              Upload dataset
            </Link>

          </section>

        </main>
      </AppShell>
    );
  }

  /*
   * ============================================================
   * REPORT WORKSPACE
   * ============================================================
   */

  return (
    <AppShell>

      <main
        className="
          flex
          flex-col
          gap-10
          px-0
          py-6
          sm:gap-10
          lg:gap-12
          lg:py-8
        "
      >

        {/* ======================================================
            REPORT HERO
        ======================================================= */}

        <section className="rounded-[28px] border border-slate-800 bg-gradient-to-r from-[#111C31] via-[#101B30] to-cyan-400/10 px-6 py-7 shadow-xl shadow-slate-950/10 sm:px-8 sm:py-8">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            Aura AI intelligence
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI business report
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Executive summary, performance signals, risks, and recommended
            actions generated from your current dataset.
          </p>

        </section>

        {/* ======================================================
            EXECUTIVE SUMMARY
        ======================================================= */}

        <section>
          <ExecutiveSummary
            summary={report.summary}
          />
        </section>

        {/* ======================================================
            FORECAST
        ======================================================= */}

        <section>
          <ForecastCard
            forecast={report.forecast}
          />
        </section>

        {/* ======================================================
            TREND ANALYSIS
        ======================================================= */}

        <section>
          <TrendCard
            trend={report.trend}
          />
        </section>

        {/* ======================================================
            DATA QUALITY
        ======================================================= */}

        <section>
          <DataQualityCard
            dataQuality={report.data_quality}
          />
        </section>

        {/* ======================================================
            CORRELATION
        ======================================================= */}

        <section>
          <CorrelationCard
            correlation={report.correlation}
          />
        </section>

        {/* ======================================================
            ROOT CAUSE
        ======================================================= */}

        <section>
          <RootCauseCard
            rootCauses={report.root_causes}
          />
        </section>

        {/* ======================================================
            BUSINESS RULES
        ======================================================= */}

        <section>
          <BusinessRulesCard
            rules={report.business_rules}
          />
        </section>

        {/* ======================================================
            STATISTICS
        ======================================================= */}

        <section>
          <StatisticsCard
            statistics={report.statistics}
          />
        </section>

        {/* ======================================================
            SEASONALITY
        ======================================================= */}

        <section>
          <SeasonalityCard
            seasonality={report.seasonality}
          />
        </section>

        {/* ======================================================
            EXPLAINABILITY
        ======================================================= */}

        <section>
          <ExplainabilityCard
            explainability={report.explainability}
          />
        </section>

        {/* ======================================================
            NARRATIVE
        ======================================================= */}

        <section>
          <NarrativeCard
            narrative={report.narrative}
          />
        </section>

        {/* ======================================================
            BUSINESS INSIGHTS
        ======================================================= */}

        <section>
          <BusinessInsights
            insights={report.insights}
          />
        </section>

        {/* ======================================================
            RECOMMENDATIONS
        ======================================================= */}

        <section>
          <Recommendations
            recommendations={report.recommendations}
          />
        </section>

      </main>

    </AppShell>
  );
}