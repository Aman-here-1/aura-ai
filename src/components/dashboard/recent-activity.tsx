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
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/10",
  },
  {
    title: "Revenue report generated",
    description: "AI created a revenue performance report.",
    time: "10 min ago",
    icon: FileText,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/10",
  },
  {
    title: "Aura AI completed analysis",
    description: "Business insights are ready for review.",
    time: "15 min ago",
    icon: Sparkles,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/10",
  },
  {
    title: "Dashboard synchronized",
    description: "Latest dataset has been reflected.",
    time: "22 min ago",
    icon: CheckCircle2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/10",
  },
];

export default function RecentActivity() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-[#0B1120] shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="border-b border-slate-800 px-6 py-6 sm:px-7">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />

              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                Recent Activity
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Latest actions performed in Aura AI
            </p>
          </div>

          <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:inline-flex">
            Activity
          </span>
        </div>
      </div>

      {/* Activity list */}
      <div className="p-5 sm:p-6">
        <div className="space-y-2">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="group relative flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-all duration-200 hover:border-slate-800 hover:bg-slate-900/60"
              >
                {/* Timeline */}
                {index < activities.length - 1 && (
                  <div className="absolute left-[31px] top-[58px] h-[calc(100%-26px)] w-px bg-slate-800" />
                )}

                {/* Icon */}
                <div
                  className={`
                    relative z-10
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    border
                    ${activity.bg}
                    ${activity.border}
                  `}
                >
                  <Icon
                    size={18}
                    className={activity.color}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-200 transition-colors group-hover:text-white">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        {activity.description}
                      </p>
                    </div>

                    <span className="shrink-0 whitespace-nowrap text-[11px] font-medium text-slate-600">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          System activity is up to date
        </div>
      </div>
    </section>
  );
}