"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Database,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

export default function DashboardHeader() {
  const { dataset } = useDatasetStore();

  const rows = dataset?.rows ?? 0;
  const columns = dataset?.columns ?? 0;

  const revenue = Number(
    dataset?.kpis?.total_revenue ?? 0
  ).toLocaleString("en-IN");

  const insights = Object.keys(
    dataset?.intelligence ?? {}
  ).length;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-800
        bg-[#0B1120]
        shadow-2xl
        shadow-black/20

        light:border-slate-200
        light:bg-white
        light:shadow-slate-200/60
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-blue-600/10
          blur-3xl

          light:bg-blue-500/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-1/3
          h-80
          w-80
          rounded-full
          bg-violet-600/10
          blur-3xl

          light:bg-violet-500/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%)]

          light:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_35%)]
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          grid
          gap-10
          p-7

          sm:p-9

          lg:grid-cols-[1.35fr_1fr]
          lg:gap-12
          lg:p-10

          xl:grid-cols-[1.4fr_1fr]
          xl:gap-16
          xl:p-12
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="flex min-w-0 flex-col justify-center">
          {/* Badge */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/5
              px-4
              py-2.5
              text-xs
              font-semibold
              text-cyan-300
              backdrop-blur-sm
            "
          >
            <Sparkles size={14} />

            <span>Aura AI Business Analyst</span>

            <span
              className="
                ml-1
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.8)]
              "
            />
          </div>

          {/* Heading */}

          <h1
            className="
              mt-8
              max-w-2xl
              text-4xl
              font-bold
              leading-[1.08]
              tracking-tight
              text-white

              sm:text-5xl
              xl:text-6xl
            "
          >
            Welcome back,
            <br />

            <span
              className="
                mt-2
                inline-block
                bg-gradient-to-r
                from-cyan-300
                via-blue-400
                to-violet-400
                bg-clip-text
                text-transparent
              "
            >
              Aman 👋
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-2xl
              text-sm
              leading-7
              text-slate-400

              sm:text-base
              sm:leading-8
            "
          >
            {dataset
              ? `Your uploaded dataset contains ${rows.toLocaleString()} records and ${columns} columns. Aura AI has generated KPIs, charts and business intelligence for exploration.`
              : "Upload your Excel or CSV dataset to automatically generate KPIs, charts, business insights and AI-powered recommendations."}
          </p>

          {/* Actions */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            <Link
              href="/reports"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-950/40
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:from-cyan-400
                hover:to-blue-500
              "
            >
              View Report

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/upload"
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900/60
                px-6
                py-3.5
                text-sm
                font-semibold
                text-slate-200
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-cyan-400/40
                hover:bg-slate-800
              "
            >
              Upload Dataset
            </Link>
          </div>
        </div>

        {/* ===================================================
            RIGHT — STAT CARDS
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            self-center

            sm:gap-5
          "
        >
          <StatCard
            icon={<TrendingUp size={19} />}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-400/10"
            title="Revenue"
            value={`₹${revenue}`}
          />

          <StatCard
            icon={<Database size={19} />}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-400/10"
            title="Records"
            value={rows.toLocaleString()}
          />

          <StatCard
            icon={<BrainCircuit size={19} />}
            iconColor="text-violet-400"
            iconBg="bg-violet-400/10"
            title="AI Insights"
            value={String(insights)}
          />

          <StatCard
            icon={<Activity size={19} />}
            iconColor="text-orange-400"
            iconBg="bg-orange-400/10"
            title="Columns"
            value={String(columns)}
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

interface StatCardProps {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string;
}

function StatCard({
  icon,
  iconColor,
  iconBg,
  title,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        group
        relative
        flex
        min-h-[145px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/60
        p-5

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-slate-700
        hover:bg-slate-900
        hover:shadow-xl

        light:border-slate-200
        light:bg-slate-50
        light:hover:border-blue-200
        light:hover:bg-white
        light:hover:shadow-lg
      "
    >
      {/* Hover Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-blue-500/5
          blur-2xl
          transition-all
          duration-300
          group-hover:scale-125
        "
      />

      {/* Icon */}

      <div
        className={`
          relative
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${iconBg}
          ${iconColor}
        `}
      >
        {icon}
      </div>

      {/* Title */}

      <p
        className="
          relative
          mt-5
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-slate-500
        "
      >
        {title}
      </p>

      {/* Value */}

      <h2
        className="
          relative
          mt-2
          truncate
          text-2xl
          font-bold
          tracking-tight
          text-white

          sm:text-3xl

          light:text-slate-900
        "
      >
        {value}
      </h2>
    </div>
  );
}