import { ValidationResult } from '../types/dataset';

interface Props {
  result: ValidationResult;
}

export default function ValidationSummary({
  result,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Dataset Validation
      </h2>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat title="Rows" value={result.totalRows} />
        <Stat title="Columns" value={result.totalColumns} />
        <Stat title="Missing" value={result.missingValues} />
        <Stat title="Health" value={`${result.healthScore}%`} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold">
            Suggested Measures
          </h3>

          <ul className="space-y-2">
            {result.suggestedMeasures.map((m) => (
              <li key={m}>✅ {m}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">
            Suggested Dimensions
          </h3>

          <ul className="space-y-2">
            {result.suggestedDimensions.map((d) => (
              <li key={d}>📊 {d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}