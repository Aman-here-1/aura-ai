import { Lightbulb, TrendingUp, TriangleAlert } from "lucide-react";

const insights = [
  {
    title: "Revenue increased by 18%",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Profit dropped due to discounts",
    icon: TriangleAlert,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    title: "Reduce discounts in Delhi region",
    icon: Lightbulb,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
];

export default function InsightList() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        AI Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border p-4"
            >
              <div
                className={`rounded-xl p-3 ${item.bg}`}
              >
                <Icon
                  className={item.color}
                  size={22}
                />
              </div>

              <p className="font-medium">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
        Download Analysis Report
      </button>
    </div>
  );
}