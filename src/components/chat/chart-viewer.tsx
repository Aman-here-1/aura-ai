"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
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
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export default function ChartViewer({
  chart,
  rows = [],
}: Props) {

  if (!rows.length) {
    return null;
  }

  const type =
    chart.type.toLowerCase();

  const renderChart = () => {

    switch (type) {

      case "line":

        return (

          <LineChart data={rows}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={chart.x} />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey={chart.y}
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        );

      case "area":

        return (

          <AreaChart data={rows}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={chart.x} />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey={chart.y}
              stroke="#2563eb"
              fill="#93c5fd"
            />

          </AreaChart>

        );

      case "pie":

        return (

          <PieChart>

            <Tooltip />

            <Pie
              data={rows}
              dataKey={chart.y}
              nameKey={chart.x}
              outerRadius={120}
              label
            >

              {rows.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

          </PieChart>

        );

      case "scatter":

        return (

          <ScatterChart>

            <CartesianGrid />

            <XAxis
              dataKey={chart.x}
              name={chart.x}
            />

            <YAxis
              dataKey={chart.y}
              name={chart.y}
            />

            <Tooltip />

            <Scatter
              data={rows}
              fill="#2563eb"
            />

          </ScatterChart>

        );

      case "histogram":

        return (

          <BarChart data={rows}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={chart.x} />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey={chart.y}
              fill="#2563eb"
            />

          </BarChart>

        );

      default:

        return (

          <BarChart data={rows}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={chart.x} />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey={chart.y}
              fill="#2563eb"
            />

          </BarChart>

        );

    }

  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold text-slate-800">

        {chart.title ??
          "Visualization"}

      </h3>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >

        <ResponsiveContainer>

          {renderChart()}

        </ResponsiveContainer>

      </div>

    </div>

  );

}