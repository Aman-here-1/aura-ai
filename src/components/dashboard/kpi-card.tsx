import { LucideIcon, TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export default function KpiCard({
  title,
  value,
  change,
  icon: Icon,
}: KpiCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {value}
          </h2>

          <div className="mt-3 flex items-center gap-2 text-green-600">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">
              {change}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-blue-100 p-4">
          <Icon size={28} className="text-blue-600" />
        </div>
      </div>
    </div>
  );
}