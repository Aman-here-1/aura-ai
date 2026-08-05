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
      className={`group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.border}`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 truncate text-3xl font-bold tracking-tight text-slate-900 xl:text-4xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${theme.bg} ring-8 ${theme.ring}`}
        >
          <Icon
            size={28}
            className={theme.icon}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
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
  );
}