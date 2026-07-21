const uploads = [
  "sales_july.xlsx",
  "orders.csv",
  "marketing.xlsx",
  "finance.csv",
];

export default function RecentUpload() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Recent Uploads
      </h2>

      <div className="space-y-3">
        {uploads.map((file) => (
          <div
            key={file}
            className="rounded-xl bg-slate-50 px-4 py-3 text-sm"
          >
            {file}
          </div>
        ))}
      </div>
    </div>
  );
}