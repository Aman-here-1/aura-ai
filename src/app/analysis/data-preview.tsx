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
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
              <Table2
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Data Preview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                First few records from the uploaded
                dataset.
              </p>
            </div>

          </div>

        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2">

          <Database
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm font-semibold text-blue-700">
            {rows.length} Preview Rows
          </span>

        </div>

      </div>

      {/* Empty */}

      {!dataset ? (
        <div className="flex h-72 flex-col items-center justify-center gap-4">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
            <Table2
              size={36}
              className="text-slate-400"
            />
          </div>

          <h3 className="text-xl font-semibold text-slate-800">
            No Dataset Uploaded
          </h3>

          <p className="max-w-md text-center text-slate-500">
            Upload a CSV or Excel file to preview
            your business data before analysis.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="sticky top-0 bg-slate-50">

              <tr>

                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-slate-200 px-5 py-4 text-left text-sm font-bold text-slate-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr
                    key={index}
                    className="transition hover:bg-blue-50/40"
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="border-b border-slate-100 px-5 py-4 text-sm text-slate-700 whitespace-nowrap"
                      >
                        {row[header] !== null &&
                        row[header] !== undefined &&
                        row[header] !== ""
                          ? String(row[header])
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan={
                      headers.length || 1
                    }
                    className="py-16 text-center text-slate-500"
                  >
                    No preview data available.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}