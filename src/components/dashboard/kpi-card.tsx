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
    text: "text-blue-600",
    ring: "ring-blue-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    ring: "ring-violet-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    ring: "ring-orange-100",
  },
};

export default function KpiCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  color = "blue",
}: KpiCardProps) {
  const theme = colorMap[color];

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      {/* Top */}

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.bg} ring-8 ${theme.ring}`}
        >
          <Icon className={theme.text} size={28} />
        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 flex items-center justify-between">

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

        <span className="text-xs text-slate-400">
          {subtitle}
        </span>

      </div>

    </div>
  );
}