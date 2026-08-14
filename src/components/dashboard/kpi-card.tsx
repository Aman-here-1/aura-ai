"use client";

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
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    ring: "ring-blue-500/10",
    glow: "group-hover:shadow-blue-500/10",
    accent: "from-blue-500/20",
  },

  emerald: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    ring: "ring-emerald-500/10",
    glow: "group-hover:shadow-emerald-500/10",
    accent: "from-emerald-500/20",
  },

  violet: {
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    ring: "ring-violet-500/10",
    glow: "group-hover:shadow-violet-500/10",
    accent: "from-violet-500/20",
  },

  orange: {
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    ring: "ring-orange-500/10",
    glow: "group-hover:shadow-orange-500/10",
    accent: "from-orange-500/20",
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
      className={`
        group relative flex min-h-[190px] flex-col justify-between
        overflow-hidden rounded-[22px]
        border border-slate-800/80
        bg-[#0F172A]
        p-6
        shadow-xl shadow-black/10
        transition-all duration-300
        hover:-translate-y-1
        hover:border-slate-700
        hover:shadow-2xl
        ${theme.glow}
      `}
    >
      {/* Ambient glow */}
      <div
        className={`
          pointer-events-none absolute -right-16 -top-16
          h-40 w-40 rounded-full
          bg-gradient-to-br ${theme.accent} to-transparent
          opacity-50 blur-3xl
          transition-opacity duration-300
          group-hover:opacity-80
        `}
      />

      {/* Top section */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 truncate text-3xl font-bold tracking-tight text-white lg:text-4xl">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-2xl
            ${theme.iconBg}
            ring-8 ${theme.ring}
          `}
        >
          <Icon
            size={23}
            strokeWidth={1.8}
            className={theme.iconColor}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="relative mt-8 border-t border-slate-800/80 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
              <TrendingUp
                size={13}
                strokeWidth={2.5}
                className="text-emerald-400"
              />
            </span>

            <span className="truncate text-sm font-semibold text-emerald-400">
              {change}
            </span>
          </div>

          <span className="truncate text-[11px] font-medium text-slate-500">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}