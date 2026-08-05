import AppShell from "../../components/layout/app-shell";
import UploadPageContent from "../../components/dashboard/upload-page-content";

export default function UploadPage() {
  return (
    <AppShell>
      <section className="mb-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Upload Dataset
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Upload an Excel or CSV file to let Aura AI automatically analyze
            your business data, generate KPIs, detect trends, build
            visualizations, and prepare AI-powered business insights.
          </p>
        </div>
      </section>

      <UploadPageContent />
    </AppShell>
  );
}