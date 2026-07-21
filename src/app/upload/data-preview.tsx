interface Props {
  headers: string[];
  rows: Record<string, unknown>[];
}

export default function DataPreview({
  headers,
  rows,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b px-4 py-3 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.slice(0, 10).map((row, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border-b px-4 py-3 text-sm"
                  >
                    {String(row[header] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}