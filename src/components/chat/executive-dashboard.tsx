"use client";

import {
  Activity,
  Database,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface ExecutiveKPI {

  title: string;

  value: number;

  display_value: string;

  trend: string;

  change: number;

}

interface ExecutiveHealth {

  status: string;

  score: number;

  color: string;

  rows: number;

  columns: number;

  missing_values: number;

  duplicate_rows: number;

  message: string;

}

interface ExecutiveSummary {

  summary: string;

  highlights: string[];

  health: ExecutiveHealth;

  kpis: ExecutiveKPI[];

}

interface Props {

  executive: ExecutiveSummary;

}

export default function ExecutiveDashboard({

  executive,

}: Props) {

  const healthColor = {

    green:
      "bg-green-100 text-green-700",

    yellow:
      "bg-yellow-100 text-yellow-700",

    red:
      "bg-red-100 text-red-700",

    gray:
      "bg-gray-100 text-gray-700",

  }[
    executive.health.color as
      keyof typeof healthColor
  ] ?? "bg-gray-100 text-gray-700";

  return (

    <div className="space-y-6">

      {/* KPI Cards */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {executive.kpis.map(

          (kpi) => (

            <div
              key={kpi.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

              <p className="text-sm text-slate-500">

                {kpi.title}

              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">

                {kpi.display_value}

              </h3>

              <p className="mt-2 text-sm text-slate-500 capitalize">

                {kpi.trend}

              </p>

            </div>

          ),

        )}

      </div>

      {/* Executive Summary */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <Activity
            size={22}
            className="text-indigo-600"
          />

          <h2 className="text-xl font-bold">

            Executive Summary

          </h2>

        </div>

        <p className="leading-7 text-slate-700">

          {executive.summary}

        </p>

      </div>

      {/* Dataset Health */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Database
              size={22}
              className="text-blue-600"
            />

            <h2 className="text-xl font-bold">

              Dataset Health

            </h2>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${healthColor}`}
          >

            {executive.health.status}

          </span>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

          <div>

            <p className="text-sm text-slate-500">

              Score

            </p>

            <p className="text-xl font-bold">

              {executive.health.score}%

            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Rows

            </p>

            <p className="text-xl font-bold">

              {executive.health.rows}

            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Columns

            </p>

            <p className="text-xl font-bold">

              {executive.health.columns}

            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Missing

            </p>

            <p className="text-xl font-bold">

              {executive.health.missing_values}

            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Duplicates

            </p>

            <p className="text-xl font-bold">

              {executive.health.duplicate_rows}

            </p>

          </div>

        </div>

        <p className="mt-5 text-slate-600">

          {executive.health.message}

        </p>

      </div>

      {/* Highlights */}

      {executive.highlights.length > 0 && (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <CheckCircle2
              size={22}
              className="text-green-600"
            />

            <h2 className="text-xl font-bold">

              Highlights

            </h2>

          </div>

          <ul className="space-y-3">

            {executive.highlights.map(

              (item, index) => (

                <li
                  key={index}
                  className="flex items-start gap-3"
                >

                  <AlertTriangle
                    size={18}
                    className="mt-1 text-amber-500"
                  />

                  <span className="text-slate-700">

                    {item}

                  </span>

                </li>

              ),

            )}

          </ul>

        </div>

      )}

    </div>

  );

}