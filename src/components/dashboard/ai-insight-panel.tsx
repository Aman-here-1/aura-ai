"use client";

import {
  ArrowUpRight,
  CircleAlert,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function AiInsightPanel() {
  const { dataset } = useDatasetStore();

  const kpis = dataset?.kpis;

  const totalRevenue = kpis?.total_revenue ?? 0;
  const totalOrders = kpis?.total_records ?? 0;
  const averageOrderValue = kpis?.average_order_value ?? 0;
  const topRegion = kpis?.top_region ?? "N/A";
  const topProduct = kpis?.top_product ?? "N/A";

  return (
    <section className="group relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#0B1120] shadow-2xl shadow-black/20 transition-all duration-300 hover:border-slate-700">
      {/* =====================================================
          AMBIENT AI GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative border-b border-slate-800 px-6 py-6 sm:px-7">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {/* AI icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-cyan-500/10">
              <div className="absolute inset-0 rounded-2xl bg-violet-500/10 blur-lg" />

              <Sparkles
                size={22}
                className="relative text-violet-300"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Aura AI Insights
                </h2>

                <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 sm:inline-flex">
                  Live
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                AI-generated business summary
              </p>
            </div>
          </div>

          {/* AI status */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            <span className="text-[11px] font-medium text-slate-500">
              Analysis ready
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          INSIGHTS
      ====================================================== */}

      <div className="relative flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {/* Revenue */}
        <InsightCard
          color="green"
          icon={
            <ArrowUpRight
              size={18}
            />
          }
          title="Revenue Summary"
        >
          Total revenue reached{" "}
          <strong className="font-semibold text-slate-200">
            ₹{Number(totalRevenue).toLocaleString("en-IN")}
          </strong>{" "}
          across{" "}
          <strong className="font-semibold text-slate-200">
            {totalOrders.toLocaleString()}
          </strong>{" "}
          records.
        </InsightCard>

        {/* Region */}
        <InsightCard
          color="amber"
          icon={
            <CircleAlert
              size={18}
            />
          }
          title="Top Performing Region"
        >
          <strong className="font-semibold text-slate-200">
            {topRegion}
          </strong>{" "}
          currently contributes the highest revenue and should
          remain the primary focus for growth initiatives.
        </InsightCard>

        {/* Recommendation */}
        <InsightCard
          color="blue"
          icon={
            <Lightbulb
              size={18}
            />
          }
          title="AI Recommendation"
        >
          <strong className="font-semibold text-slate-200">
            {topProduct}
          </strong>{" "}
          delivers the strongest performance with an average
          order value of{" "}
          <strong className="font-semibold text-slate-200">
            ₹{Number(
              averageOrderValue,
            ).toLocaleString("en-IN")}
          </strong>
          . Increase inventory and marketing investment in{" "}
          <strong className="font-semibold text-slate-200">
            {topRegion}
          </strong>
          .
        </InsightCard>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles
                size={14}
                className="text-cyan-400"
              />

              <span className="text-xs font-medium text-slate-400">
                Powered by Aura Intelligence
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-wider text-slate-600">
              AI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INSIGHT CARD
============================================================ */

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: "green" | "amber" | "blue";
}

function InsightCard({
  title,
  children,
  icon,
  color,
}: InsightCardProps) {
  const styles = {
    green: {
      wrapper:
        "border-emerald-400/10 bg-emerald-400/[0.035] hover:border-emerald-400/20 hover:bg-emerald-400/[0.05]",
      icon:
        "border-emerald-400/10 bg-emerald-400/10 text-emerald-400",
      accent: "bg-emerald-400",
    },

    amber: {
      wrapper:
        "border-amber-400/10 bg-amber-400/[0.035] hover:border-amber-400/20 hover:bg-amber-400/[0.05]",
      icon:
        "border-amber-400/10 bg-amber-400/10 text-amber-400",
      accent: "bg-amber-400",
    },

    blue: {
      wrapper:
        "border-cyan-400/10 bg-cyan-400/[0.035] hover:border-cyan-400/20 hover:bg-cyan-400/[0.05]",
      icon:
        "border-cyan-400/10 bg-cyan-400/10 text-cyan-400",
      accent: "bg-cyan-400",
    },
  };

  const theme = styles[color];

  return (
    <div
      className={`
        group/card
        relative
        overflow-hidden
        rounded-2xl
        border
        p-4
        transition-all
        duration-200
        hover:-translate-y-0.5
        ${theme.wrapper}
      `}
    >
      {/* Left accent */}
      <div
        className={`
          absolute
          bottom-4
          left-0
          top-4
          w-0.5
          rounded-r-full
          opacity-40
          transition-opacity
          group-hover/card:opacity-100
          ${theme.accent}
        `}
      />

      <div className="flex gap-3.5">
        {/* Icon */}
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${theme.icon}
          `}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-200">
            {title}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}