"use client";

import {
  Bot,
  User,
} from "lucide-react";

import SQLViewer from "./sql-viewer";
import ResultTable from "./result-table";
import ChartViewer from "./chart-viewer";
import SuggestedQuestions from "./suggested-questions";
import MarkdownMessage from "./markdown-message";
import InsightCard from "./insight-card";
import ExecutiveDashboard from "./executive-dashboard";
import RootCauseCard from "./root-cause-card";
import BusinessMetricsCard from "./business-metrics-card";
import NarrativeCard from "./narrative-card";

import { useChat } from "../../hooks/use-chat";

interface Insight {

  summary: string;

  insights: string[];

  recommendations: string[];

  risks: string[];

  next_actions: string[];

}

interface ExecutiveKPI {

  title: string;

  value: number;

  display_value: string;

  trend: string;

  change: number;

}

interface ExecutiveHealth {

  status: string;

  score: number;

  color: string;

  rows: number;

  columns: number;

  missing_values: number;

  duplicate_rows: number;

  message: string;

}

interface ExecutiveSummary {

  summary: string;

  highlights: string[];

  health: ExecutiveHealth;

  kpis: ExecutiveKPI[];

}

/* ---------------------------------------
   Business Metrics
--------------------------------------- */

interface BusinessMetric {

  title: string;

  value: number;

  formatted_value: string;

  unit: string;

  trend: string;

  description: string;

}

interface BusinessMetrics {

  metrics: BusinessMetric[];

}

/* ---------------------------------------
   Root Cause
--------------------------------------- */

interface VarianceAnalysis {

  previous_period: number;

  current_period: number;

  change: number;

  change_percent: number;

  direction: string;

}

interface Contributor {

  name: string;

  value: number;

  percentage: number;

}

interface ContributionAnalysis {

  total: number;

  top_contributor: Contributor | null;

  bottom_contributor: Contributor | null;

  top_10: Contributor[];

  bottom_10: Contributor[];

}

interface Driver {

  column: string;

  correlation: number;

  strength: string;

  direction: string;

}

interface DriverAnalysis {

  summary: string;

  top_driver: Driver | null;

  drivers: Driver[];

}

interface Statistics {

  mean: number;

  median: number;

  std: number;

  min: number;

  max: number;

  lower_bound: number;

  upper_bound: number;

}

interface Outlier {

  index: number;

  value: number;

}

interface AnomalyAnalysis {

  summary: string;

  severity: string;

  count: number;

  outliers: Outlier[];

  statistics: Statistics;

}

interface RootCause {

  metric: string;

  summary: string;

  variance: VarianceAnalysis | null;

  contribution: ContributionAnalysis | null;

  drivers: DriverAnalysis | null;

  anomalies: AnomalyAnalysis | null;

  recommendations: string[];

}

interface Props {

  role: string;

  content: string;

  sql?: string;

  rows?: Record<string, unknown>[];

  columns?: string[];

  chart?: {

    type: string;

    x: string;

    y: string;

    title?: string;

  } | null;

  insight?: Insight | null;

  executive?: ExecutiveSummary | null;

  business_metrics?: BusinessMetrics | null;

  narrative?: string | null;

  root_cause?: RootCause | null;

  suggestions?: string[];

}

export default function ChatMessage({

  role,

  content,

  sql,

  rows,

  columns,

  chart,

  insight,

  executive,

  business_metrics,

  narrative,

  root_cause,

  suggestions,

}: Props) {

  const assistant =
    role === "assistant";

  const {
    sendQuestion,
  } = useChat();

  return (

    <div
      className={`flex ${
        assistant
          ? "justify-start"
          : "justify-end"
      }`}
    >

      <div
        className={`flex max-w-5xl gap-4 rounded-3xl p-5 shadow-sm ${
          assistant
            ? "bg-white"
            : "bg-blue-600 text-white"
        }`}
      >

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            assistant
              ? "bg-indigo-100"
              : "bg-blue-500"
          }`}
        >

          {assistant ? (

            <Bot
              size={20}
              className="text-indigo-600"
            />

          ) : (

            <User
              size={20}
              className="text-white"
            />

          )}

        </div>

        <div className="flex-1">

          <div
            className={`mb-2 text-sm font-semibold ${
              assistant
                ? "text-slate-900"
                : "text-blue-100"
            }`}
          >

            {assistant
              ? "Aura AI"
              : "You"}

          </div>

          <div
            className={`${
              assistant
                ? "text-slate-700"
                : "text-white"
            }`}
          >

            <MarkdownMessage
              content={content}
            />

          </div>

          {assistant &&
            executive && (

              <div className="mt-6">

                <ExecutiveDashboard
                  executive={executive}
                />

              </div>

            )}

          {assistant &&
            business_metrics && (

              <div className="mt-6">

                <BusinessMetricsCard
                  metrics={business_metrics}
                />

              </div>

            )}

          {assistant &&
            narrative && (

              <div className="mt-6">

                <NarrativeCard
                  narrative={narrative}
                />

              </div>

            )}

          {assistant &&
            root_cause && (

              <div className="mt-6">

                <RootCauseCard
                  rootCause={root_cause}
                />

              </div>

            )}

          {assistant &&
            sql && (

              <div className="mt-6">

                <SQLViewer
                  sql={sql}
                />

              </div>

            )}

                      {assistant &&
            rows &&
            columns && (

              <div className="mt-6">

                <ResultTable
                  rows={rows}
                  columns={columns}
                />

              </div>

            )}

          {assistant &&
            chart &&
            rows && (

              <div className="mt-6">

                <ChartViewer
                  chart={chart}
                  rows={rows}
                />

              </div>

            )}

          {assistant &&
            insight && (

              <div className="mt-6">

                <InsightCard
                  insight={insight}
                />

              </div>

            )}

          {assistant &&
            suggestions &&
            suggestions.length > 0 && (

              <SuggestedQuestions
                suggestions={suggestions}
                onSelect={sendQuestion}
              />

            )}

        </div>

      </div>

    </div>

  );

}