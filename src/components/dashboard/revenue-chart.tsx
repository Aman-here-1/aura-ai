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

  const formatCompact = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Revenue trend from uploaded dataset"
    >
      <div className="h-[500px] w-full">
        {formattedData.length === 0 ? (
          /* =====================================================
             EMPTY STATE
          ====================================================== */
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-8 text-center">
            <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl" />

              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="relative text-cyan-400"
              >
                <path
                  d="M3 17L8 11L12 14L21 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 5H21V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-white">
              No Revenue Data
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Upload an Excel or CSV dataset to generate revenue trends,
              KPIs and interactive visualizations.
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
                {/* Main blue/cyan gradient */}
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#22D3EE"
                    stopOpacity={0.32}
                  />

                  <stop
                    offset="45%"
                    stopColor="#3B82F6"
                    stopOpacity={0.16}
                  />

                  <stop
                    offset="100%"
                    stopColor="#3B82F6"
                    stopOpacity={0}
                  />
                </linearGradient>

                {/* Soft line glow */}
                <filter
                  id="revenueGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur
                    stdDeviation="3"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid */}
              <CartesianGrid
                vertical={false}
                stroke="#1E293B"
                strokeDasharray="4 6"
                opacity={0.75}
              />

              {/* X Axis */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={14}
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                  fontWeight: 500,
                }}
              />

              {/* Y Axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                width={55}
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                  fontWeight: 500,
                }}
                tickFormatter={(value) =>
                  formatCompact(Number(value))
                }
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{
                  stroke: "#334155",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                formatter={(value: number) => [
                  formatCurrency(Number(value)),
                  "Revenue",
                ]}
                labelFormatter={(label) => `Period · ${label}`}
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #334155",
                  background: "#0B1120",
                  color: "#F8FAFC",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.45)",
                  padding: "12px 14px",
                }}
                labelStyle={{
                  color: "#94A3B8",
                  fontSize: 12,
                  marginBottom: 6,
                }}
                itemStyle={{
                  color: "#67E8F9",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              {/* Revenue area */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#38BDF8"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                filter="url(#revenueGlow)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#22D3EE",
                  stroke: "#0F172A",
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