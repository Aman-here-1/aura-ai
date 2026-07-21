import {
  ArrowUpRight,
  CircleAlert,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function AiInsightPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Sparkles className="text-blue-600" size={24} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Aura AI Insights
          </h2>

          <p className="text-sm text-slate-500">
            Generated just now
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex gap-3 rounded-xl bg-green-50 p-4">
          <ArrowUpRight className="mt-1 text-green-600" size={18} />

          <div>
            <p className="font-medium text-slate-900">
              Revenue increased
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Revenue is up <strong>18%</strong> compared to last
              week.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl bg-yellow-50 p-4">
          <CircleAlert className="mt-1 text-yellow-600" size={18} />

          <div>
            <p className="font-medium text-slate-900">
              Profit Margin Dropped
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Profit margin decreased by 2.4% because of increased
              discounts.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl bg-blue-50 p-4">
          <Lightbulb className="mt-1 text-blue-600" size={18} />

          <div>
            <p className="font-medium text-slate-900">
              AI Recommendation
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Reduce discount spending in Delhi and focus marketing
              budget on high-converting cities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}