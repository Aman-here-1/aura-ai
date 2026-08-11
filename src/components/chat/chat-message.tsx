"use client";

import { Bot, User } from "lucide-react";

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
  const assistant = role === "assistant";
  const { sendQuestion } = useChat();

  if (!assistant) {
    return (
      <div className="flex justify-end">
        <div className="flex max-w-2xl items-start gap-3 rounded-2xl rounded-tr-sm bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-3 shadow-lg shadow-blue-950/30">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold text-cyan-100">You</p>
            <div className="text-sm leading-6 text-white">
              <MarkdownMessage content={content} />
            </div>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/10 sm:p-5">
      <header className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-950/40">
          <Bot size={19} className="text-white" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Aura AI</p>
          <p className="text-xs text-slate-500">Business intelligence analysis</p>
        </div>

        <span className="ml-auto rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
          Analysed
        </span>
      </header>

      <div className="pt-4">
        <div className="text-sm leading-7 text-slate-300">
          <MarkdownMessage content={content} />
        </div>

        {executive && (
          <div className="mt-6">
            <ExecutiveDashboard executive={executive} />
          </div>
        )}

        {business_metrics && (
          <div className="mt-6">
            <BusinessMetricsCard metrics={business_metrics} />
          </div>
        )}

        {narrative && (
          <div className="mt-6">
            <NarrativeCard narrative={narrative} />
          </div>
        )}

        {root_cause && (
          <div className="mt-6">
            <RootCauseCard rootCause={root_cause} />
          </div>
        )}

        {chart && rows && (
          <div className="mt-6">
            <ChartViewer chart={chart} rows={rows} />
          </div>
        )}

        {insight && (
          <div className="mt-6">
            <InsightCard insight={insight} />
          </div>
        )}

        {rows && columns && (
          <div className="mt-6">
            <ResultTable rows={rows} columns={columns} />
          </div>
        )}

        {sql && (
          <div className="mt-6">
            <SQLViewer sql={sql} />
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="mt-6 border-t border-slate-800 pt-5">
            <SuggestedQuestions
              suggestions={suggestions}
              onSelect={sendQuestion}
            />
          </div>
        )}
      </div>
    </article>
  );
}