import AppShell from "../../components/layout/app-shell";
import AnalysisProgress from "./analysis-progress";
import AnalysisSummary from "./analysis-summary";
import InsightList from "./insight-list";
import DataPreview from "./data-preview";

import {
  Sparkles,
  BrainCircuit,
  Database,
  TrendingUp,
} from "lucide-react";

export default function AnalysisPage() {
  return (
    <AppShell>
      <div className="space-y-10">

        {/* Hero */}

        <section>

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-10 shadow-2xl">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">

                <Sparkles size={16} />

                Aura AI Analysis Engine

              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight text-white">
                Your dataset has been transformed into actionable business intelligence.
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
                Aura AI analyzed your uploaded data, generated KPIs,
                discovered trends, built executive dashboards and
                prepared AI-powered business recommendations.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-3">

                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">

                  <BrainCircuit
                    className="mb-4 text-yellow-300"
                    size={28}
                  />

                  <h3 className="font-semibold text-white">
                    AI Insights
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Business intelligence generated automatically.
                  </p>

                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">

                  <TrendingUp
                    className="mb-4 text-green-300"
                    size={28}
                  />

                  <h3 className="font-semibold text-white">
                    KPI Detection
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Revenue, growth, trends and performance metrics.
                  </p>

                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">

                  <Database
                    className="mb-4 text-cyan-300"
                    size={28}
                  />

                  <h3 className="font-semibold text-white">
                    Executive Dashboard
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Interactive charts and executive summaries.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Progress */}

        <section>
          <AnalysisProgress />
        </section>

        {/* Summary */}

        <section>
          <AnalysisSummary />
        </section>

        {/* Content */}

        <section className="grid gap-8 xl:grid-cols-2">

          <InsightList />

          <DataPreview />

        </section>

      </div>
    </AppShell>
  );
}