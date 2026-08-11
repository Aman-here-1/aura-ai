"use client";

import { Database } from "lucide-react";

interface Props {
  sql: string;
}

export default function SQLViewer({
  sql,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden">

      <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-3">

        <Database
          size={18}
          className="text-green-400"
        />

        <span className="font-semibold text-white">
          Generated SQL
        </span>

      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-7 text-green-400">

        <code>{sql}</code>

      </pre>

    </div>

  );

}