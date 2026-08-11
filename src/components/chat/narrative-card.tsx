"use client";

import { FileText, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
  narrative: string;
}

export default function NarrativeCard({ narrative }: Props) {
  if (!narrative) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="flex items-start gap-3 border-b border-slate-800 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/10">
          <FileText size={19} className="text-violet-300" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-white">
              Executive narrative
            </h2>

            <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
              <Sparkles size={11} />
              AI summary
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Decision-ready interpretation of the analysis.
          </p>
        </div>
      </header>

      <div className="p-5 sm:p-6">
        <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:text-white prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:leading-7 prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-li:marker:text-cyan-400 prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:text-cyan-200 prose-blockquote:border-cyan-400/70 prose-blockquote:text-slate-300 prose-code:rounded prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-200 prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown>{narrative}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}