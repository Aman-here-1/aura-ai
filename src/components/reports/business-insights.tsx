import { BrainCircuit } from "lucide-react";

interface BusinessInsightsProps {
  insights: string[];
}

export default function BusinessInsights({
  insights,
}: BusinessInsightsProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
            <BrainCircuit
              size={24}
              className="text-violet-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Business Insights
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              AI discovered key trends from your dataset
            </p>
          </div>

        </div>

      </div>

      <div className="space-y-4 p-6">

        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {index + 1}
              </div>

              <p className="leading-7 text-slate-700">
                {insight}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <BrainCircuit
                size={30}
                className="text-violet-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              No Insights Available
            </h3>

            <p className="mt-2 text-slate-500">
              Generate an AI report to view business insights.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}