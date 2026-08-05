"use client";

import { Sparkles } from "lucide-react";

interface ExecutiveSummaryProps {
  summary?: string;
}

export default function ExecutiveSummary({
  summary,
}: ExecutiveSummaryProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Sparkles
              size={24}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Executive Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              AI generated overview of your business performance
            </p>
          </div>

        </div>

      </div>

      <div className="p-6">

        {summary ? (
          <div className="rounded-2xl bg-slate-50 p-6">

            <p className="whitespace-pre-line text-[15px] leading-8 text-slate-700">
              {summary}
            </p>

          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Sparkles
                size={30}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              No Executive Summary
            </h3>

            <p className="mt-2 text-slate-500">
              Generate an AI report to see the executive summary here.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}