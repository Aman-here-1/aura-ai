"use client";

import {

  Activity,

  AlertTriangle,

  ArrowDown,

  ArrowUp,

  BarChart3,

  Lightbulb,

  TrendingDown,

  TrendingUp,

} from "lucide-react";

interface VarianceAnalysis {

  previous_period: number;

  current_period: number;

  change: number;

  change_percent: number;

  direction: string;

}

interface Contributor {

  name: string;

  value: number;

  percentage: number;

}

interface ContributionAnalysis {

  total: number;

  top_contributor: Contributor | null;

  bottom_contributor: Contributor | null;

  top_10: Contributor[];

  bottom_10: Contributor[];

}

interface Driver {

  column: string;

  correlation: number;

  strength: string;

  direction: string;

}

interface DriverAnalysis {

  summary: string;

  top_driver: Driver | null;

  drivers: Driver[];

}

interface Statistics {

  mean: number;

  median: number;

  std: number;

  min: number;

  max: number;

  lower_bound: number;

  upper_bound: number;

}

interface Outlier {

  index: number;

  value: number;

}

interface AnomalyAnalysis {

  summary: string;

  severity: string;

  count: number;

  outliers: Outlier[];

  statistics: Statistics;

}

interface RootCause {

  metric: string;

  summary: string;

  variance: VarianceAnalysis | null;

  contribution: ContributionAnalysis | null;

  drivers: DriverAnalysis | null;

  anomalies: AnomalyAnalysis | null;

  recommendations: string[];

}

interface Props {

  rootCause: RootCause;

}

export default function RootCauseCard({

  rootCause,

}: Props) {

  return (

    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-5">

        <div className="flex items-center gap-3">

          <Activity

            size={24}

            className="text-white"

          />

          <div>

            <h2 className="text-xl font-bold text-white">

              Root Cause Analysis

            </h2>

            <p className="text-sm text-red-100">

              AI Business Investigation

            </p>

          </div>

        </div>

      </div>

      <div className="space-y-8 p-6">

        <section>

          <h3 className="mb-3 text-lg font-semibold">

            📌 Summary

          </h3>

          <p className="leading-7 text-slate-700">

            {rootCause.summary}

          </p>

        </section>

        {rootCause.variance && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <BarChart3

                size={20}

                className="text-indigo-600"

              />

              <h3 className="text-lg font-semibold">

                Variance Analysis

              </h3>

            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="text-xs text-slate-500">

                  Previous

                </div>

                <div className="mt-1 text-xl font-bold">

                  {rootCause.variance.previous_period.toLocaleString()}

                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="text-xs text-slate-500">

                  Current

                </div>

                <div className="mt-1 text-xl font-bold">

                  {rootCause.variance.current_period.toLocaleString()}

                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="text-xs text-slate-500">

                  Change

                </div>

                <div className="mt-1 flex items-center gap-2 text-xl font-bold">

                  {rootCause.variance.direction ===

                  "increase" ? (

                    <ArrowUp className="text-green-600" />

                  ) : (

                    <ArrowDown className="text-red-600" />

                  )}

                  {rootCause.variance.change.toLocaleString()}

                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="text-xs text-slate-500">

                  Percentage

                </div>

                <div className="mt-1 text-xl font-bold">

                  {rootCause.variance.change_percent}%

                </div>

              </div>

            </div>

          </section>

        )}

        {rootCause.contribution && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <TrendingUp

                size={20}

                className="text-green-600"

              />

              <h3 className="text-lg font-semibold">

                Top Contributor

              </h3>

            </div>

            {rootCause.contribution.top_contributor && (

              <div className="rounded-2xl bg-green-50 p-5">

                <div className="text-lg font-semibold">

                  {

                    rootCause.contribution
                      .top_contributor.name

                  }

                </div>

                <div className="mt-2 text-slate-700">

                  Contribution:

                  {" "}

                  {

                    rootCause.contribution
                      .top_contributor.percentage

                  }

                  %

                </div>

                <div className="text-slate-700">

                  Value:

                  {" "}

                  {

                    rootCause.contribution
                      .top_contributor.value

                  }

                </div>

              </div>

            )}

          </section>

        )}        {rootCause.drivers && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <TrendingDown

                size={20}

                className="text-purple-600"

              />

              <h3 className="text-lg font-semibold">

                Driver Analysis

              </h3>

            </div>

            <div className="rounded-2xl bg-purple-50 p-5">

              <p className="text-slate-700">

                {rootCause.drivers.summary}

              </p>

            </div>

            {rootCause.drivers.drivers.length > 0 && (

              <div className="mt-4 overflow-hidden rounded-2xl border">

                <table className="w-full">

                  <thead className="bg-slate-100">

                    <tr>

                      <th className="p-3 text-left">

                        Column

                      </th>

                      <th className="p-3 text-left">

                        Correlation

                      </th>

                      <th className="p-3 text-left">

                        Strength

                      </th>

                      <th className="p-3 text-left">

                        Direction

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {rootCause.drivers.drivers.map(

                      (driver) => (

                        <tr
                          key={driver.column}
                          className="border-t"
                        >

                          <td className="p-3">

                            {driver.column}

                          </td>

                          <td className="p-3">

                            {driver.correlation}

                          </td>

                          <td className="p-3">

                            {driver.strength}

                          </td>

                          <td className="p-3 capitalize">

                            {driver.direction}

                          </td>

                        </tr>

                      ),

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        )}

        {rootCause.anomalies && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <AlertTriangle

                size={20}

                className="text-red-600"

              />

              <h3 className="text-lg font-semibold">

                Anomaly Detection

              </h3>

            </div>

            <div className="rounded-2xl bg-red-50 p-5">

              <div className="font-semibold">

                {rootCause.anomalies.summary}

              </div>

              <div className="mt-2">

                Severity:

                {" "}

                <span className="font-bold">

                  {rootCause.anomalies.severity}

                </span>

              </div>

              <div>

                Total Outliers:

                {" "}

                <span className="font-bold">

                  {rootCause.anomalies.count}

                </span>

              </div>

            </div>

          </section>

        )}

        {rootCause.recommendations.length > 0 && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <Lightbulb

                size={20}

                className="text-yellow-500"

              />

              <h3 className="text-lg font-semibold">

                AI Recommendations

              </h3>

            </div>

            <ul className="space-y-3">

              {rootCause.recommendations.map(

                (recommendation, index) => (

                  <li

                    key={index}

                    className="rounded-xl bg-yellow-50 p-4 text-slate-700"

                  >

                    • {recommendation}

                  </li>

                ),

              )}

            </ul>

          </section>

        )}

      </div>

    </div>

  );

}