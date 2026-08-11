import AppShell from "../../components/layout/app-shell";
import UploadPageContent from "../../components/dashboard/upload-page-content";

import {
  Sparkles,
  Database,
  BrainCircuit,
  BarChart3,
} from "lucide-react";

export default function UploadPage() {
  return (
    <AppShell>
      {/* Hero */}

      <section className="mb-10">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-10 shadow-2xl">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">

              <Sparkles size={16} />

              Aura AI Upload Center

            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight text-white">
              Upload your business data and let AI build your dashboard automatically.
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
              Aura AI automatically cleans your dataset, generates KPIs,
              creates executive dashboards, detects anomalies,
              builds charts, performs root cause analysis and prepares
              business recommendations in seconds.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">

                <Database
                  className="mb-4 text-cyan-300"
                  size={28}
                />

                <h3 className="font-semibold text-white">
                  Smart Dataset Detection
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  CSV & Excel files are automatically understood.
                </p>

              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">

                <BrainCircuit
                  className="mb-4 text-yellow-300"
                  size={28}
                />

                <h3 className="font-semibold text-white">
                  AI Business Insights
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Executive summaries, recommendations and KPI generation.
                </p>

              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">

                <BarChart3
                  className="mb-4 text-green-300"
                  size={28}
                />

                <h3 className="font-semibold text-white">
                  Instant Dashboards
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Beautiful visualizations ready in a few seconds.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Upload */}

      <UploadPageContent />

    </AppShell>
  );
}