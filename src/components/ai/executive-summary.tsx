"use client";

import { Sparkles } from "lucide-react";

interface ExecutiveSummaryProps {
  summary?: string;
}

export default function ExecutiveSummary({
  summary,
}: ExecutiveSummaryProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-800/90 bg-[#111827] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">

      {/* Header */}

      <div className="border-b border-slate-800 px-6 py-6 sm:px-7">

        <div className="flex items-center gap-4">

          {/* Icon */}

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-400/20">

            <Sparkles
              size={24}
              className="text-blue-400"
            />

          </div>

          {/* Title */}

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-2xl font-bold tracking-tight text-white">
                Executive Summary
              </h2>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-400">
                AI Generated
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-400">
              AI generated overview of your business performance
            </p>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="p-6 sm:p-7">

        {summary ? (

          <div className="rounded-2xl border border-slate-800 bg-[#0D1424] p-6 shadow-inner sm:p-7">

            <div className="flex gap-4">

              {/* Accent Line */}

              <div className="hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-500 sm:block" />

              {/* Summary */}

              <p className="whitespace-pre-line text-[15px] leading-8 text-slate-300">
                {summary}
              </p>

            </div>

          </div>

        ) : (

          <div className="rounded-2xl border border-dashed border-slate-700 bg-[#0D1424] p-10 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-400/20">

              <Sparkles
                size={30}
                className="text-blue-400"
              />

            </div>

            <h3 className="text-lg font-semibold text-white">
              No Executive Summary
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Generate an AI report to see the executive summary here.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}