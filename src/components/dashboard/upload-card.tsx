import { FileSpreadsheet } from "lucide-react";

export default function UploadCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-green-100 p-3">
          <FileSpreadsheet className="text-green-600" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">
            sales_july.xlsx
          </h3>

          <p className="text-sm text-slate-500">
            2.4 MB
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Ready
        </span>
      </div>

      <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
        Analyze with Aura AI
      </button>
    </div>
  );
}