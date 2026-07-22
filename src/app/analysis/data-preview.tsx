"use client";

import { useDatasetStore } from "../../store/dataset-store";

export default function DataPreview() {
  const { dataset } = useDatasetStore();

  const headers: string[] = dataset?.headers ?? [];
  const rows: Record<string, any>[] = dataset?.preview ?? [];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Data Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Preview of the uploaded dataset
          </p>
        </div>

        <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {rows.length} Rows Preview
        </span>
      </div>

      {!dataset ? (
        <div className="flex h-60 items-center justify-center rounded-xl border border-dashed text-slate-500">
          Upload an Excel file to preview the dataset.
        </div>
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 bg-slate-100">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-b px-4 py-3 text-left text-sm font-semibold whitespace-nowrap"
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
                    className="hover:bg-slate-50"
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="border-b px-4 py-3 text-sm whitespace-nowrap"
                      >
                        {row[header] !== null &&
                        row[header] !== undefined
                          ? String(row[header])
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length || 1}
                    className="py-8 text-center text-slate-500"
                  >
                    No preview data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}