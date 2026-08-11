"use client";

import { Bot } from "lucide-react";

export default function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
          <Bot size={16} className="text-white" />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-200">Aura AI</p>

          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300" />

            <span className="ml-1 text-xs text-slate-500">Analysing your data</span>
          </div>
        </div>
      </div>
    </div>
  );
}