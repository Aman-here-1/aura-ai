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
      <main className="flex flex-col gap-8 py-6 sm:gap-10 sm:py-8 lg:gap-12 lg:py-10">
        {/* =========================================================
            HERO SECTION
        ========================================================== */}

        <section>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-950 p-7 shadow-2xl shadow-blue-950/20 sm:p-9 lg:p-10">
            {/* Background glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="pointer-events-none absolute right-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-xl">
                <Sparkles size={16} />
                Aura AI Upload Center
              </div>

              {/* Heading */}
              <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px]">
                Upload your business data and let AI build your dashboard
                automatically.
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-4xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
                Aura AI automatically cleans your dataset, generates KPIs,
                creates executive dashboards, detects anomalies, builds charts,
                performs root cause analysis and prepares business
                recommendations in seconds.
              </p>

              {/* Feature cards */}
              <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
                <FeatureCard
                  icon={<Database size={27} className="text-cyan-300" />}
                  title="Smart Dataset Detection"
                  description="CSV & Excel files are automatically understood."
                />

                <FeatureCard
                  icon={
                    <BrainCircuit size={27} className="text-yellow-300" />
                  }
                  title="AI Business Insights"
                  description="Executive summaries, recommendations and KPI generation."
                />

                <FeatureCard
                  icon={<BarChart3 size={27} className="text-green-300" />}
                  title="Instant Dashboards"
                  description="Beautiful visualizations ready in a few seconds."
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            UPLOAD SECTION
        ========================================================== */}

        <section className="pt-1">
          <UploadPageContent />
        </section>
      </main>
    </AppShell>
  );
}

/* ===============================================================
   FEATURE CARD
================================================================ */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.14] hover:shadow-xl">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        {icon}
      </div>

      <h3 className="font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-blue-100">
        {description}
      </p>
    </div>
  );
}