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

  const insights = [
    {
      title: "Business Performance",
      description: `Dataset contains ${totalOrders.toLocaleString()} records with total revenue of ₹${Number(
        totalRevenue
      ).toLocaleString("en-IN")}.`,
      icon: TrendingUp,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      title: "Data Quality",
      description:
        totalMissingValues > 0 ||
        duplicateRows > 0
          ? `${totalMissingValues.toLocaleString()} missing values and ${duplicateRows.toLocaleString()} duplicate rows detected.`
          : "Excellent! No missing values or duplicate rows detected.",
      icon: TriangleAlert,
      bg:
        totalMissingValues > 0 ||
        duplicateRows > 0
          ? "bg-orange-100"
          : "bg-emerald-100",
      text:
        totalMissingValues > 0 ||
        duplicateRows > 0
          ? "text-orange-600"
          : "text-emerald-600",
    },
    {
      title: "AI Recommendation",
      description: `${topProduct} is currently the leading product in ${topRegion}. Average order value is ₹${Number(
        averageOrderValue
      ).toLocaleString("en-IN")}. Consider increasing inventory and marketing investment in this region.`,
      icon: Lightbulb,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-2xl font-bold text-slate-900">
          AI Insights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Automatically generated business insights.
        </p>
      </div>

      <div className="space-y-5 p-6">

        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 p-5 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex gap-5">

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon
                    size={28}
                    className={item.text}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          );
        })}

      </div>

      <div className="border-t border-slate-100 p-6">
        <button
          onClick={() => router.push("/reports")}
          className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          <Download size={20} />
          View Full AI Report
        </button>
      </div>

    </section>
  );
}