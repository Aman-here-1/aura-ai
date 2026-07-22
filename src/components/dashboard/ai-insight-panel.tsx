"use client";

import {
  ArrowUpRight,
  CircleAlert,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function AiInsightPanel() {
  const { dataset } = useDatasetStore();

  const kpis = dataset?.kpis;

  const totalRevenue = kpis?.total_revenue ?? 0;
  const totalOrders = kpis?.total_records ?? 0;
  const averageOrderValue = kpis?.average_order_value ?? 0;
  const topRegion = kpis?.top_region ?? "N/A";
  const topProduct = kpis?.top_product ?? "N/A";

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
            Generated from uploaded dataset
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">

        <div className="flex gap-3 rounded-xl bg-green-50 p-4">
          <ArrowUpRight className="mt-1 text-green-600" size={18} />

          <div>
            <p className="font-medium text-slate-900">
              Revenue Summary
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Total revenue is{" "}
              <strong>
                ₹{Number(totalRevenue).toLocaleString("en-IN")}
              </strong>{" "}
              from{" "}
              <strong>{totalOrders}</strong> records.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl bg-yellow-50 p-4">
          <CircleAlert className="mt-1 text-yellow-600" size={18} />

          <div>
            <p className="font-medium text-slate-900">
              Top Performing Region
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Highest revenue is currently coming from{" "}
              <strong>{topRegion}</strong>.
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
              <strong>{topProduct}</strong> is the leading product with an
              average order value of{" "}
              <strong>
                ₹{Number(averageOrderValue).toLocaleString("en-IN")}
              </strong>
              . Consider increasing inventory and marketing efforts in{" "}
              <strong>{topRegion}</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}