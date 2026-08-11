"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  chart: {
    type: string;
    x: string;
    y: string;
    title?: string;
  };
  rows?: Record<string, unknown>[];
}

const COLORS = [
  "#22D3EE",
  "#818CF8",
  "#34D399",
  "#FBBF24",
  "#FB7185",
  "#A78BFA",
  "#2DD4BF",
  "#F472B6",
];

const axisStyle = {
  fill: "#94A3B8",
  fontSize: 12,
};

const tooltipStyle = {
  backgroundColor: "#111C31",
  border: "1px solid #334155",
  borderRadius: "12px",
  color: "#E2E8F0",
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.25)",
};

export default function ChartViewer({ chart, rows = [] }: Props) {
  if (!rows.length) {
    return null;
  }

  const type = chart.type.toLowerCase().trim();
  const chartTitle = chart.title ?? "Analysis visualization";

  const renderTooltip = (
    <Tooltip
      contentStyle={tooltipStyle}
      itemStyle={{ color: "#E2E8F0", fontSize: 12 }}
      labelStyle={{ color: "#94A3B8", marginBottom: 6 }}
      cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
    />
  );

  const renderCartesianGrid = () => (
    <CartesianGrid
      stroke="#334155"
      strokeDasharray="3 3"
      vertical={false}
      opacity={0.65}
    />
  );

  const renderXAxis = () => (
    <XAxis
      dataKey={chart.x}
      tick={axisStyle}
      tickLine={false}
      axisLine={{ stroke: "#334155" }}
      minTickGap={20}
    />
  );

  const renderYAxis = () => (
    <YAxis
      tick={axisStyle}
      tickLine={false}
      axisLine={false}
      width={54}
    />
  );

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={rows} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            {renderCartesianGrid()}
            {renderXAxis()}
            {renderYAxis()}
            {renderTooltip}
            <Line
              type="monotone"
              dataKey={chart.y}
              stroke="#22D3EE"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#22D3EE",
                stroke: "#0F172A",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={rows} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="aura-chart-area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {renderCartesianGrid()}
            {renderXAxis()}
            {renderYAxis()}
            {renderTooltip}

            <Area
              type="monotone"
              dataKey={chart.y}
              stroke="#22D3EE"
              strokeWidth={3}
              fill="url(#aura-chart-area-gradient)"
            />
          </AreaChart>
        );

      case "pie":
        return (
          <PieChart>
            {renderTooltip}

            <Pie
              data={rows}
              dataKey={chart.y}
              nameKey={chart.x}
              cx="50%"
              cy="50%"
              outerRadius="78%"
              innerRadius="48%"
              paddingAngle={3}
              stroke="#111C31"
              strokeWidth={2}
            >
              {rows.map((_, index) => (
                <Cell
                  key={`chart-cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );

      case "scatter":
        return (
          <ScatterChart margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            {renderCartesianGrid()}

            <XAxis
              dataKey={chart.x}
              name={chart.x}
              tick={axisStyle}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />

            <YAxis
              dataKey={chart.y}
              name={chart.y}
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              width={54}
            />

            {renderTooltip}

            <Scatter data={rows} fill="#22D3EE" fillOpacity={0.85} />
          </ScatterChart>
        );

      case "histogram":
      case "bar":
      default:
        return (
          <BarChart data={rows} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            {renderCartesianGrid()}
            {renderXAxis()}
            {renderYAxis()}
            {renderTooltip}

            <Bar
              dataKey={chart.y}
              fill="#22D3EE"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        );
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400">
            Data visualization
          </p>

          <h3 className="mt-1 text-base font-semibold text-white">
            {chartTitle}
          </h3>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium capitalize text-slate-400">
          {type || "bar"} chart
        </span>
      </header>

      <div className="h-[300px] p-4 sm:h-[380px] sm:p-5">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <footer className="flex flex-wrap gap-x-5 gap-y-1 border-t border-slate-800 px-5 py-3 text-xs text-slate-500">
        <span>
          Dimension: <span className="text-slate-300">{chart.x}</span>
        </span>

        <span>
          Metric: <span className="text-slate-300">{chart.y}</span>
        </span>

        <span>{rows.length.toLocaleString()} data points</span>
      </footer>
    </section>
  );
}