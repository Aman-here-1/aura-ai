interface BusinessInsightsProps {
  insights: string[];
}

export default function BusinessInsights({
  insights,
}: BusinessInsightsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Business Insights
      </h2>

      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li
            key={index}
            className="flex gap-3"
          >
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />

            <span className="text-slate-700">
              {insight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}