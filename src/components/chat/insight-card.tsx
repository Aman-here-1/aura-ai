"use client";

import {
  Lightbulb,
  TriangleAlert,
  CheckCircle2,
  Rocket,
  BarChart3,
} from "lucide-react";

interface Props {

  insight: {

    summary: string;

    insights: string[];

    recommendations: string[];

    risks: string[];

    next_actions: string[];

  };

}

export default function InsightCard({

  insight,

}: Props) {

  return (

    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5">

        <div className="flex items-center gap-3">

          <BarChart3
            className="text-white"
            size={24}
          />

          <h2 className="text-xl font-bold text-white">

            Executive Insights

          </h2>

        </div>

      </div>

      <div className="space-y-8 p-6">

        {/* Summary */}

        <section>

          <h3 className="mb-3 text-lg font-semibold text-slate-900">

            📊 Executive Summary

          </h3>

          <p className="leading-7 text-slate-700">

            {insight.summary}

          </p>

        </section>

        {/* Insights */}

        {insight.insights.length > 0 && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <Lightbulb
                size={20}
                className="text-yellow-500"
              />

              <h3 className="text-lg font-semibold">

                Key Insights

              </h3>

            </div>

            <ul className="space-y-3">

              {insight.insights.map(

                (item, index) => (

                  <li
                    key={index}
                    className="rounded-xl bg-yellow-50 p-3 text-slate-700"
                  >

                    • {item}

                  </li>

                ),

              )}

            </ul>

          </section>

        )}

        {/* Recommendations */}

        {insight.recommendations.length > 0 && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <CheckCircle2
                size={20}
                className="text-green-600"
              />

              <h3 className="text-lg font-semibold">

                Recommendations

              </h3>

            </div>

            <ul className="space-y-3">

              {insight.recommendations.map(

                (item, index) => (

                  <li
                    key={index}
                    className="rounded-xl bg-green-50 p-3 text-slate-700"
                  >

                    • {item}

                  </li>

                ),

              )}

            </ul>

          </section>

        )}

        {/* Risks */}

        {insight.risks.length > 0 && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <TriangleAlert
                size={20}
                className="text-red-500"
              />

              <h3 className="text-lg font-semibold">

                Risks

              </h3>

            </div>

            <ul className="space-y-3">

              {insight.risks.map(

                (item, index) => (

                  <li
                    key={index}
                    className="rounded-xl bg-red-50 p-3 text-slate-700"
                  >

                    • {item}

                  </li>

                ),

              )}

            </ul>

          </section>

        )}

        {/* Next Actions */}

        {insight.next_actions.length > 0 && (

          <section>

            <div className="mb-4 flex items-center gap-2">

              <Rocket
                size={20}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold">

                Next Actions

              </h3>

            </div>

            <ul className="space-y-3">

              {insight.next_actions.map(

                (item, index) => (

                  <li
                    key={index}
                    className="rounded-xl bg-blue-50 p-3 text-slate-700"
                  >

                    • {item}

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