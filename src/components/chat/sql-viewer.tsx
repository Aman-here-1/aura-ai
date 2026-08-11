"use client";

import { Check, Copy, Database } from "lucide-react";
import { useState } from "react";

interface Props {
  sql: string;
}

export default function SQLViewer({ sql }: Props) {
  const [copied, setCopied] = useState(false);

  async function copySql() {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1120] shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
            <Database size={17} className="text-emerald-300" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Generated SQL</p>
            <p className="text-xs text-slate-500">Query used for this analysis</p>
          </div>
        </div>

        <button
          type="button"
          onClick={copySql}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
          aria-label="Copy generated SQL"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </header>

      <pre className="max-h-[360px] overflow-auto bg-[#080D18] p-4 text-xs leading-6 text-emerald-300 sm:p-5 sm:text-sm">
        <code>{sql}</code>
      </pre>
    </section>
  );
}