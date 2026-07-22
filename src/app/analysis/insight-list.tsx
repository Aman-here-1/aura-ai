"use client";

import {
  Lightbulb,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function InsightList() {
  const { dataset } = useDatasetStore();

  const kpis = dataset?.kpis;
  const intelligence = dataset?.intelligence;

  const totalRevenue = kpis?.total_revenue ?? 0;
  const totalOrders = kpis?.total_records ?? 0;
  const averageOrderValue = kpis?.average_order_value ?? 0;
  const topRegion = kpis?.top_region ?? "N/A";
  const topProduct = kpis?.top_product ?? "N/A";

  const missingValues =
    intelligence?.missing_values ?? {};

  const duplicateRows =
    intelligence?.duplicate_rows ?? 0;

  const totalMissingValues = Object.values(
    missingValues
  ).reduce(
    (sum: number, value: any) => sum + Number(value),
    0
  );

  const insights = [
    {
      title: `Dataset contains ${totalOrders.toLocaleString()} records with total revenue of ₹${Number(
        totalRevenue
      ).toLocaleString("en-IN")}.`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title:
        totalMissingValues > 0 || duplicateRows > 0
          ? `${totalMissingValues} missing values and ${duplicateRows} duplicate rows detected.`
          : "No missing values or duplicate rows detected.",
      icon: TriangleAlert,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: `Focus on ${topRegion} region and ${topProduct} product. Average order value is ₹${Number(
        averageOrderValue
      ).toLocaleString("en-IN")}.`,
      icon: Lightbulb,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        AI Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border p-4"
            >
              <div className={`rounded-xl p-3 ${item.bg}`}>
                <Icon
                  className={item.color}
                  size={22}
                />
              </div>

              <p className="font-medium">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
        Download Analysis Report
      </button>
    </div>
  );
}