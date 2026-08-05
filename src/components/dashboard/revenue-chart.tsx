"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
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

  const formattedData = chartData.map((item: any) => ({
    month:
      item.Order_Date ??
      item.month ??
      item.date ??
      item.label,

    revenue:
      Number(
        item.Sales_Amount ??
        item.sales ??
        item.revenue ??
        item.value ??
        0
      ),
  }));

  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Revenue trend from uploaded dataset"
    >
      <div className="h-[420px] w-full">

        {formattedData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">

            <h3 className="text-lg font-semibold text-slate-700">
              No Revenue Data
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Upload an Excel or CSV file to visualize revenue trends.
            </p>

          </div>
        ) : (

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData}>

              <defs>

                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #E2E8F0",
                  boxShadow:
                    "0 10px 30px rgba(15,23,42,.10)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={4}
                fill="url(#revenueGradient)"
                dot={{
                  r: 4,
                  fill: "#2563EB",
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </AreaChart>
          </ResponsiveContainer>

        )}
      </div>
    </ChartCard>
  );
}