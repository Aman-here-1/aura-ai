import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Sparkles,
} from "lucide-react";

const activities = [
  {
    title: "sales_july.csv uploaded",
    description: "Dataset uploaded successfully.",
    time: "2 min ago",
    icon: FileSpreadsheet,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Revenue report generated",
    description: "AI created a revenue performance report.",
    time: "10 min ago",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Aura AI completed analysis",
    description: "Business insights are ready for review.",
    time: "15 min ago",
    icon: Sparkles,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Dashboard synchronized",
    description: "Latest dataset has been reflected.",
    time: "22 min ago",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest actions performed in Aura AI
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex items-start gap-4"
              >
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${activity.bg}`}
                >
                  <Icon
                    size={20}
                    className={activity.color}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {activity.description}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}