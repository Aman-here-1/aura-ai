"use client";

import { Database } from "lucide-react";

import CodeBlock from "./code-block";

interface Props {

  sql: string;

}

export default function SQLViewer({
  sql,
}: Props) {

  return (

    <div className="rounded-2xl overflow-hidden border border-slate-200">

      <div className="flex items-center gap-3 bg-slate-900 px-5 py-3">

        <Database
          size={18}
          className="text-green-400"
        />

        <span className="font-semibold text-white">

          Generated SQL

        </span>

      </div>

      <CodeBlock
        sql={sql}
      />

    </div>

  );

}