"use client";

import {
  Database,
  Table2,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function DataPreview() {
  const { dataset } = useDatasetStore();

  const headers: string[] = dataset?.headers ?? [];

  const rows: Record<string, any>[] =
    dataset?.preview ?? [];

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-800/90 bg-[#111827] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 px-6 py-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-400/10 ring-1 ring-blue-400/20">

            <Table2
              size={21}
              className="text-blue-400"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Data Preview
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              First few records from the uploaded dataset.
            </p>

          </div>

        </div>

        {/* Preview count */}
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-2">

          <Database
            size={16}
            className="text-blue-400"
          />

          <span className="text-xs font-semibold text-blue-300">
            {rows.length} Preview Rows
          </span>

        </div>

      </div>

      {/* Empty */}
      {!dataset ? (

        <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-800/80 ring-1 ring-slate-700">

            <Table2
              size={34}
              className="text-slate-500"
            />

          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            No Dataset Uploaded
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Upload a CSV or Excel file to preview
            your business data before analysis.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          {rows.length === 0 ? (

            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-800/80 ring-1 ring-slate-700">

                <Table2
                  size={34}
                  className="text-slate-500"
                />

              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                No Preview Data
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                The dataset was uploaded successfully,
                but no preview records are currently available.
              </p>

            </div>

          ) : (

            <table className="min-w-full">

              {/* Table Header */}
              <thead className="bg-[#0D1424]">

                <tr>

                  {headers.map((header) => (

                    <th
                      key={header}
                      className="whitespace-nowrap border-b border-slate-800 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {header}
                    </th>

                  ))}

                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {rows.map((row, index) => (

                  <tr
                    key={index}
                    className="transition-colors duration-200 hover:bg-cyan-400/[0.03]"
                  >

                    {headers.map((header) => (

                      <td
                        key={header}
                        className="whitespace-nowrap border-b border-slate-800/70 px-5 py-4 text-sm text-slate-300"
                      >
                        {row[header] !== null &&
                        row[header] !== undefined &&
                        row[header] !== ""
                          ? String(row[header])
                          : "-"}
                      </td>

                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      )}

    </section>
  );
}