import AppShell from "../../components/layout/app-shell";
import AnalysisProgress from "./analysis-progress";
import AnalysisSummary from "./analysis-summary";
import InsightList from "./insight-list";
import DataPreview from "./data-preview";

export default function AnalysisPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8 py-6 lg:gap-10 lg:py-8">
        <section>
          <h1 className="text-4xl font-bold text-slate-900">
            AI Analysis
          </h1>

          <p className="mt-4 max-w-2xl text-slate-500">
            Aura AI has analyzed your uploaded dataset and generated
            intelligent insights, KPIs, business trends and actionable
            recommendations.
          </p>
        </section>

        <section>
          <AnalysisProgress />
        </section>

        <section>
          <AnalysisSummary />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <InsightList />
          <DataPreview />
        </section>
      </div>
    </AppShell>
  );
}