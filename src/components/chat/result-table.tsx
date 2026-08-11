"use client";

import { Table2 } from "lucide-react";

interface Props {
  rows: Record<string, unknown>[];
  columns: string[];
}

export default function ResultTable({ rows, columns }: Props) {
  if (rows.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-10 text-center">
        <Table2 size={24} className="mx-auto text-slate-500" />
        <p className="mt-3 text-sm font-medium text-slate-300">
          No records found
        </p>
        <p className="mt-1 text-xs text-slate-500">
          This analysis did not return rows for the selected criteria.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
            <Table2 size={17} className="text-cyan-300" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Query results</p>
            <p className="text-xs text-slate-500">
              {rows.length.toLocaleString()} records ·{" "}
              {columns.length.toLocaleString()} columns
            </p>
          </div>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-400">
          Data preview
        </span>
      </header>

      <div className="max-h-[420px] overflow-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-slate-900 shadow-sm">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap border-b border-slate-800 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-[#111C31] transition-colors hover:bg-slate-800/60"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="max-w-xs whitespace-nowrap px-4 py-3 text-sm text-slate-300"
                    title={String(row[column] ?? "-")}
                  >
                    {String(row[column] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="border-t border-slate-800 px-4 py-3 text-xs text-slate-500 sm:px-5">
        Scroll horizontally to view all available fields.
      </footer>
    </section>
  );
}