"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "./chart-card";
import { useDatasetStore } from "../../store/dataset-store";

export default function RevenueChart() {
  const { dataset } = useDatasetStore();

  const chartData = dataset?.chart_data?.sales_trend ?? [];

  // Convert backend response to chart format
  const formattedData = chartData.map((item: any) => ({
    month: item.Order_Date ?? item.month ?? item.date,
    revenue:
      item.Sales_Amount ??
      item.sales ??
      item.revenue ??
      item.value ??
      0,
  }));

  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Revenue trend from uploaded dataset"
    >
      <div className="h-[360px] w-full">
        {formattedData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-500">
            Upload a dataset to view the revenue trend.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}