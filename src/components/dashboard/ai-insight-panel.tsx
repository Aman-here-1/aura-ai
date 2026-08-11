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
    <section className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="border-b border-slate-100 px-8 py-7">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">

            <Sparkles
              size={24}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">

              Aura AI Insights

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              AI-generated business summary

            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col gap-5 p-8">

        {/* Revenue */}

        <InsightCard
          color="green"
          icon={
            <ArrowUpRight
              size={20}
              className="text-emerald-600"
            />
          }
          title="Revenue Summary"
        >
          Total revenue reached{" "}
          <strong>
            ₹{Number(totalRevenue).toLocaleString("en-IN")}
          </strong>{" "}
          across{" "}
          <strong>
            {totalOrders.toLocaleString()}
          </strong>{" "}
          records.
        </InsightCard>

        {/* Region */}

        <InsightCard
          color="amber"
          icon={
            <CircleAlert
              size={20}
              className="text-amber-600"
            />
          }
          title="Top Performing Region"
        >
          <strong>{topRegion}</strong> currently contributes the
          highest revenue and should remain the primary focus
          for growth initiatives.
        </InsightCard>

        {/* Recommendation */}

        <InsightCard
          color="blue"
          icon={
            <Lightbulb
              size={20}
              className="text-blue-600"
            />
          }
          title="AI Recommendation"
        >
          <strong>{topProduct}</strong> delivers the strongest
          performance with an average order value of{" "}
          <strong>
            ₹{Number(
              averageOrderValue,
            ).toLocaleString("en-IN")}
          </strong>
          . Increase inventory and marketing investment in{" "}
          <strong>{topRegion}</strong>.
        </InsightCard>

      </div>

    </section>
  );
}

/* ------------------------------------ */
/* Insight Card */
/* ------------------------------------ */

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
    green:
      "border-emerald-100 bg-emerald-50",
    amber:
      "border-amber-100 bg-amber-50",
    blue:
      "border-blue-100 bg-blue-50",
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 hover:shadow-md ${styles[color]}`}
    >
      <div className="flex gap-4">

        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">

          {icon}

        </div>

        <div>

          <h3 className="text-base font-bold text-slate-900">

            {title}

          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">

            {children}

          </p>

        </div>

      </div>
    </div>
  );
}