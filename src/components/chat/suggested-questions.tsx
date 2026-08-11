"use client";

import { ArrowUpRight, MessageSquareText, Sparkles } from "lucide-react";

interface Props {
  suggestions: string[];
  onSelect: (question: string) => void | Promise<void>;
}

export default function SuggestedQuestions({
  suggestions,
  onSelect,
}: Props) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  function handleSelect(question: string) {
    void onSelect(question);
  }

  return (
    <section>
      <div className="flex items-start gap-2">
        <div className="mt-0.5">
          <Sparkles size={17} className="text-cyan-300" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            Continue your analysis
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Ask Aura one of these recommended follow-up questions.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion}-${index}`}
            type="button"
            onClick={() => handleSelect(suggestion)}
            className="group flex min-h-14 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#111C31]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 transition group-hover:bg-cyan-400/10">
              <MessageSquareText
                size={15}
                className="text-slate-400 transition group-hover:text-cyan-300"
              />
            </div>

            <span className="min-w-0 flex-1 text-sm leading-5 text-slate-300 transition group-hover:text-white">
              {suggestion}
            </span>

            <ArrowUpRight
              size={16}
              className="shrink-0 text-slate-600 transition group-hover:text-cyan-300"
            />
          </button>
        ))}
      </div>
    </section>
  );
}