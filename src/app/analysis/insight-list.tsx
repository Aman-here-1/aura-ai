"use client";

import {
  Download,
  Lightbulb,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useDatasetStore } from "../../store/dataset-store";

export default function InsightList() {
  const router = useRouter();

  const { dataset } = useDatasetStore();

  const kpis = dataset?.kpis;
  const intelligence = dataset?.intelligence;

  const totalRevenue = kpis?.total_revenue ?? 0;
  const totalOrders = kpis?.total_records ?? 0;
  const averageOrderValue =
    kpis?.average_order_value ?? 0;

  const topRegion = kpis?.top_region ?? "N/A";
  const topProduct = kpis?.top_product ?? "N/A";

  const missingValues =
    intelligence?.missing_values ?? {};

  const duplicateRows = Number(
    intelligence?.duplicate_rows ?? 0
  );

  const totalMissingValues = Object.values(
    missingValues
  ).reduce(
    (sum: number, value: any) =>
      sum + Number(value),
    0
  );

  const hasDataQualityIssues =
    totalMissingValues > 0 ||
    duplicateRows > 0;

  const insights = [
    {
      title: "Business Performance",
      description: `Dataset contains ${totalOrders.toLocaleString()} records with total revenue of ₹${Number(
        totalRevenue
      ).toLocaleString("en-IN")}.`,
      icon: TrendingUp,
      iconBg: "bg-emerald-400/10",
      iconColor: "text-emerald-400",
      border: "border-emerald-400/20",
    },
    {
      title: "Data Quality",
      description: hasDataQualityIssues
        ? `${totalMissingValues.toLocaleString()} missing values and ${duplicateRows.toLocaleString()} duplicate rows detected.`
        : "Excellent! No missing values or duplicate rows detected.",
      icon: TriangleAlert,
      iconBg: hasDataQualityIssues
        ? "bg-amber-400/10"
        : "bg-emerald-400/10",
      iconColor: hasDataQualityIssues
        ? "text-amber-400"
        : "text-emerald-400",
      border: hasDataQualityIssues
        ? "border-amber-400/20"
        : "border-emerald-400/20",
    },
    {
      title: "AI Recommendation",
      description: `${topProduct} is currently the leading product in ${topRegion}. Average order value is ₹${Number(
        averageOrderValue
      ).toLocaleString("en-IN")}. Consider increasing inventory and marketing investment in this region.`,
      icon: Lightbulb,
      iconBg: "bg-blue-400/10",
      iconColor: "text-blue-400",
      border: "border-blue-400/20",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-800/90 bg-[#111827] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">

      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/20">
            <TrendingUp
              size={21}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              AI Insights
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Automatically generated business insights.
            </p>
          </div>

        </div>

      </div>

      {/* Insights */}
      <div className="space-y-4 p-6">

        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`group rounded-2xl border ${item.border} bg-[#0F172A] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-[#131D31] hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]`}
            >

              <div className="flex gap-4">

                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.iconBg} ring-1 ring-white/5`}
                >
                  <Icon
                    size={24}
                    className={item.iconColor}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">

                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 bg-[#0D1424] p-6">

        <button
          type="button"
          onClick={() => router.push("/reports")}
          className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl"
        >
          <Download size={18} />
          View Full AI Report
        </button>

      </div>

    </section>
  );
}