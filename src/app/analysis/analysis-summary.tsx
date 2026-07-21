export default function AnalysisSummary() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Dataset Summary
      </h2>

      <div className="grid gap-5 md:grid-cols-4">
        <SummaryCard title="Rows" value="12,452" />
        <SummaryCard title="Columns" value="18" />
        <SummaryCard title="Missing Values" value="27" />
        <SummaryCard title="Duplicates" value="14" />
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-slate-50 p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}