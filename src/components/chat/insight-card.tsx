"use client";

import {
  BarChart3,
  CheckCircle2,
  Lightbulb,
  Rocket,
  TriangleAlert,
} from "lucide-react";

interface Props {
  insight: {
    summary: string;
    insights: string[];
    recommendations: string[];
    risks: string[];
    next_actions: string[];
  };
}

export default function InsightCard({ insight }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="border-b border-slate-800 bg-gradient-to-r from-blue-500/15 via-[#111C31] to-cyan-400/10 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 ring-1 ring-blue-400/20">
            <BarChart3 size={20} className="text-blue-300" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              Decision support
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              Executive insights
            </h2>
          </div>
        </div>
      </header>

      <div className="space-y-7 p-5 sm:p-6">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Executive summary
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {insight.summary}
          </p>
        </section>

        {insight.insights.length > 0 && (
          <InsightList
            icon={<Lightbulb size={18} className="text-amber-300" />}
            title="Key insights"
            description="The most important patterns identified in the analysis."
            items={insight.insights}
            itemClassName="border-amber-400/15 bg-amber-400/5"
            numberClassName="bg-amber-400/10 text-amber-300"
          />
        )}

        {insight.recommendations.length > 0 && (
          <InsightList
            icon={<CheckCircle2 size={18} className="text-emerald-300" />}
            title="Recommendations"
            description="Suggested business actions based on the findings."
            items={insight.recommendations}
            itemClassName="border-emerald-400/15 bg-emerald-400/5"
            numberClassName="bg-emerald-400/10 text-emerald-300"
          />
        )}

        {insight.risks.length > 0 && (
          <InsightList
            icon={<TriangleAlert size={18} className="text-rose-300" />}
            title="Risks to monitor"
            description="Potential downside factors or areas requiring attention."
            items={insight.risks}
            itemClassName="border-rose-400/15 bg-rose-400/5"
            numberClassName="bg-rose-400/10 text-rose-300"
          />
        )}

        {insight.next_actions.length > 0 && (
          <InsightList
            icon={<Rocket size={18} className="text-cyan-300" />}
            title="Next actions"
            description="Recommended follow-up steps to move from insight to action."
            items={insight.next_actions}
            itemClassName="border-cyan-400/15 bg-cyan-400/5"
            numberClassName="bg-cyan-400/10 text-cyan-300"
            ordered
          />
        )}
      </div>
    </section>
  );
}

function InsightList({
  icon,
  title,
  description,
  items,
  itemClassName,
  numberClassName,
  ordered = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  itemClassName: string;
  numberClassName: string;
  ordered?: boolean;
}) {
  return (
    <section>
      <div className="flex items-start gap-2">
        <div className="mt-0.5">{icon}</div>

        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={`flex items-start gap-3 rounded-xl border p-4 ${itemClassName}`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${numberClassName}`}
            >
              {ordered ? index + 1 : "•"}
            </span>

            <p className="text-sm leading-6 text-slate-300">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}