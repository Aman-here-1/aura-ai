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
        0,
    ),
  }));

  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Revenue trend from uploaded dataset"
    >
      <div className="h-[500px] w-full">

        {formattedData.length === 0 ? (

          <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white px-8 text-center">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

              📈

            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              No Revenue Data
            </h3>

            <p className="mt-3 max-w-md text-base leading-7 text-slate-500">
              Upload an Excel or CSV dataset to generate revenue
              trends, KPIs and interactive visualizations.
            </p>

          </div>

        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 10,
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
                    stopOpacity={0.35}
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
                strokeDasharray="5 5"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                tick={{
                  fontSize: 13,
                  fill: "#64748B",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                tick={{
                  fontSize: 13,
                  fill: "#64748B",
                }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(Number(value))
                }
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
                labelFormatter={(label) => `Period : ${label}`}
                contentStyle={{
                  borderRadius: 18,
                  border: "1px solid #E2E8F0",
                  background: "#fff",
                  boxShadow:
                    "0 18px 45px rgba(15,23,42,.12)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={4}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{
                  r: 7,
                  fill: "#2563EB",
                  stroke: "#fff",
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