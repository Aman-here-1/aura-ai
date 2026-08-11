"use client";

interface Props {

  rows: Record<string, unknown>[];

  columns: string[];
}

export default function ResultTable({
  rows,
  columns,
}: Props) {

  if (rows.length === 0) {

    return (

      <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">

        No records found.

      </div>

    );

  }

  return (

    <div className="overflow-auto rounded-2xl border border-slate-200">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            {columns.map((column) => (

              <th
                key={column}
                className="border-b px-5 py-3 text-left text-sm font-semibold text-slate-700"
              >
                {column}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {rows.map((row, index) => (

            <tr
              key={index}
              className="border-b last:border-none"
            >

              {columns.map((column) => (

                <td
                  key={column}
                  className="px-5 py-3 text-sm text-slate-700"
                >
                  {String(row[column] ?? "-")}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}