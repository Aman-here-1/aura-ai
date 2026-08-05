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
      item.label ??
      "-",

    revenue: Number(
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
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
            <h3 className="text-lg font-semibold text-slate-700">
              No Revenue Data
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Upload an Excel or CSV file to visualize revenue trends.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563EB"
                    stopOpacity={0.28}
                  />

                  <stop
                    offset="95%"
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
                tickMargin={10}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(Number(value))
                }
                tickMargin={10}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value: number) => [
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(value),
                  "Revenue",
                ]}
                labelFormatter={(label) => `Period: ${label}`}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #E2E8F0",
                  background: "#FFFFFF",
                  boxShadow:
                    "0 10px 30px rgba(15,23,42,.10)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#2563EB",
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}