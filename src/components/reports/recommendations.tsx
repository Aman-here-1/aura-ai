interface RecommendationsProps {
  recommendations: string[];
}

export default function Recommendations({
  recommendations,
}: RecommendationsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Recommendations
      </h2>

      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className="flex gap-3"
          >
            <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />

            <span className="text-slate-700">
              {recommendation}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}