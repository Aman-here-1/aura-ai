import AppShell from '../../components/layout/app-shell';
import UploadPageContent from '../../components/dashboard/upload-page-content';

export default function UploadPage() {
  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Upload Dataset
        </h1>

        <p className="mt-2 text-slate-500">
          Upload CSV or Excel file for AI analysis.
        </p>
      </div>

      <UploadPageContent />
    </AppShell>
  );
}