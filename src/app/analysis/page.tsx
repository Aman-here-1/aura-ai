import AppShell from '../../components/layout/app-shell';
import AnalysisProgress from '../analysis/analysis-progress';
import AnalysisSummary from '../analysis/analysis-summary';
import InsightList from '../analysis/insight-list';
import DataPreview from '../analysis/data-preview';

export default function AnalysisPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Analysis</h1>

        <p className="mt-2 text-slate-500">
          Aura AI is analyzing your uploaded business data.
        </p>
      </div>

      <div className="space-y-8">
        <AnalysisProgress />

        <AnalysisSummary />

        <InsightList />
        <DataPreview />
      </div>
    </AppShell>
  );
}