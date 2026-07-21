import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Sparkles,
} from "lucide-react";

const activities = [
  {
    title: "sales_july.csv uploaded",
    time: "2 min ago",
    icon: FileSpreadsheet,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Revenue report generated",
    time: "10 min ago",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Aura AI completed analysis",
    time: "15 min ago",
    icon: Sparkles,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Dashboard synced successfully",
    time: "22 min ago",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center gap-4"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${activity.bg}`}
              >
                <Icon className={activity.color} size={20} />
              </div>

              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  {activity.title}
                </p>

                <p className="text-sm text-slate-500">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}