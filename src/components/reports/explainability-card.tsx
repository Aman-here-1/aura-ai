"use client";

import {
  Brain,
  Lightbulb,
} from "lucide-react";

interface Explanation {
  metric: string;
  explanation: string;
}

interface Props {
  explainability: Explanation[];
}

export default function ExplainabilityCard({
  explainability,
}: Props) {

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <Brain
            size={24}
            className="text-indigo-600"
          />

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              AI Explainability
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Why Aura AI generated these insights.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-4 p-6">

        {explainability.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

            <p className="text-slate-500">
              No explanations available.
            </p>

          </div>

        ) : (

          explainability.map(
            (
              item,
              index,
            ) => (

              <div
                key={index}
                className="flex gap-4 rounded-2xl border border-slate-200 p-5"
              >

                <div className="rounded-xl bg-indigo-100 p-3">

                  <Lightbulb
                    size={18}
                    className="text-indigo-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {item.metric}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {item.explanation}
                  </p>

                </div>

              </div>

            )
          )

        )}

      </div>

    </section>
  );
}