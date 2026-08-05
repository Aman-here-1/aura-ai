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
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Sparkles className="text-blue-600" size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Aura AI Insights
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Auto-generated from uploaded dataset
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <div className="flex gap-3">
            <ArrowUpRight
              size={20}
              className="mt-1 flex-shrink-0 text-green-600"
            />

            <div>
              <h3 className="font-semibold text-slate-900">
                Revenue Summary
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Total revenue reached{" "}
                <strong>
                  ₹{Number(totalRevenue).toLocaleString("en-IN")}
                </strong>{" "}
                across{" "}
                <strong>{totalOrders.toLocaleString()}</strong> records.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex gap-3">
            <CircleAlert
              size={20}
              className="mt-1 flex-shrink-0 text-amber-600"
            />

            <div>
              <h3 className="font-semibold text-slate-900">
                Top Performing Region
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                <strong>{topRegion}</strong> is currently generating the
                highest revenue among all available regions.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex gap-3">
            <Lightbulb
              size={20}
              className="mt-1 flex-shrink-0 text-blue-600"
            />

            <div>
              <h3 className="font-semibold text-slate-900">
                AI Recommendation
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                <strong>{topProduct}</strong> shows the strongest performance
                with an average order value of{" "}
                <strong>
                  ₹{Number(averageOrderValue).toLocaleString("en-IN")}
                </strong>
                . Focus additional inventory, promotions and marketing in{" "}
                <strong>{topRegion}</strong> to maximize revenue growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}