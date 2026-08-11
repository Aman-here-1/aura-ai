import { LucideIcon, TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  subtitle?: string;
  icon: LucideIcon;
  color?: "blue" | "emerald" | "violet" | "orange";
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    ring: "ring-blue-100",
    border: "group-hover:border-blue-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    ring: "ring-emerald-100",
    border: "group-hover:border-emerald-200",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    ring: "ring-violet-100",
    border: "group-hover:border-violet-200",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    ring: "ring-orange-100",
    border: "group-hover:border-orange-200",
  },
};

export default function KpiCard({
  title,
  value,
  change,
  subtitle = "Live Data",
  icon: Icon,
  color = "blue",
}: KpiCardProps) {
  const theme = colorMap[color];

  return (
    <div
      className={`group flex min-h-[220px] flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme.border}`}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-none tracking-tight text-slate-900 2xl:text-5xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl ${theme.bg} ring-8 ${theme.ring}`}
        >
          <Icon
            size={30}
            className={theme.icon}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 p-1">
              <TrendingUp
                size={14}
                className="text-emerald-600"
              />
            </div>

            <span className="text-sm font-semibold text-emerald-600">
              {change}
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}