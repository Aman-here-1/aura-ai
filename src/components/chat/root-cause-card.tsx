"use client";

import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Lightbulb,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface VarianceAnalysis {
  previous_period: number;
  current_period: number;
  change: number;
  change_percent: number;
  direction: string;
}

interface Contributor {
  name: string;
  value: number;
  percentage: number;
}

interface ContributionAnalysis {
  total: number;
  top_contributor: Contributor | null;
  bottom_contributor: Contributor | null;
  top_10: Contributor[];
  bottom_10: Contributor[];
}

interface Driver {
  column: string;
  correlation: number;
  strength: string;
  direction: string;
}

interface DriverAnalysis {
  summary: string;
  top_driver: Driver | null;
  drivers: Driver[];
}

interface Statistics {
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  lower_bound: number;
  upper_bound: number;
}

interface Outlier {
  index: number;
  value: number;
}

interface AnomalyAnalysis {
  summary: string;
  severity: string;
  count: number;
  outliers: Outlier[];
  statistics: Statistics;
}

interface RootCause {
  metric: string;
  summary: string;
  variance: VarianceAnalysis | null;
  contribution: ContributionAnalysis | null;
  drivers: DriverAnalysis | null;
  anomalies: AnomalyAnalysis | null;
  recommendations: string[];
}

interface Props {
  rootCause: RootCause;
}

function isIncrease(direction: string) {
  const normalizedDirection = direction.toLowerCase().trim();

  return (
    normalizedDirection === "increase" ||
    normalizedDirection === "up" ||
    normalizedDirection === "positive"
  );
}

function getSeverityStyle(severity: string) {
  const normalizedSeverity = severity.toLowerCase().trim();

  if (normalizedSeverity === "high" || normalizedSeverity === "critical") {
    return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  }

  if (normalizedSeverity === "medium" || normalizedSeverity === "moderate") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
}

export default function RootCauseCard({ rootCause }: Props) {
  const varianceIsIncrease = rootCause.variance
    ? isIncrease(rootCause.variance.direction)
    : false;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111C31] shadow-sm">
      <header className="border-b border-slate-800 bg-gradient-to-r from-rose-500/15 via-[#111C31] to-amber-400/10 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-400/15 ring-1 ring-rose-400/20">
            <Activity size={20} className="text-rose-300" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-300">
              AI investigation
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Root cause analysis
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Investigation for:{" "}
              <span className="font-medium text-slate-200">{rootCause.metric}</span>
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-7 p-5 sm:p-6">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Analysis summary
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            {rootCause.summary}
          </p>
        </section>

        {rootCause.variance && (
          <section>
            <SectionTitle
              icon={<BarChart3 size={18} className="text-cyan-300" />}
              title="Variance analysis"
              description="Period-over-period movement for the selected metric."
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricBlock
                label="Previous period"
                value={rootCause.variance.previous_period.toLocaleString()}
              />

              <MetricBlock
                label="Current period"
                value={rootCause.variance.current_period.toLocaleString()}
              />

              <MetricBlock
                label="Absolute change"
                value={Math.abs(rootCause.variance.change).toLocaleString()}
                icon={
                  varianceIsIncrease ? (
                    <ArrowUp size={16} className="text-emerald-400" />
                  ) : (
                    <ArrowDown size={16} className="text-rose-400" />
                  )
                }
                valueClassName={
                  varianceIsIncrease ? "text-emerald-300" : "text-rose-300"
                }
              />

              <MetricBlock
                label="Percentage change"
                value={`${Math.abs(rootCause.variance.change_percent).toFixed(2)}%`}
                icon={
                  varianceIsIncrease ? (
                    <TrendingUp size={16} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={16} className="text-rose-400" />
                  )
                }
                valueClassName={
                  varianceIsIncrease ? "text-emerald-300" : "text-rose-300"
                }
              />
            </div>
          </section>
        )}

        {rootCause.contribution && (
          <section>
            <SectionTitle
              icon={<TrendingUp size={18} className="text-emerald-300" />}
              title="Contribution analysis"
              description={`Total measured contribution: ${rootCause.contribution.total.toLocaleString()}`}
            />

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {rootCause.contribution.top_contributor && (
                <ContributorCard
                  contributor={rootCause.contribution.top_contributor}
                  label="Top positive contributor"
                  positive
                />
              )}

              {rootCause.contribution.bottom_contributor && (
                <ContributorCard
                  contributor={rootCause.contribution.bottom_contributor}
                  label="Lowest contributor"
                  positive={false}
                />
              )}
            </div>

            {rootCause.contribution.top_10.length > 0 && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
                <div className="border-b border-slate-800 bg-slate-900/70 px-4 py-3">
                  <p className="text-sm font-medium text-slate-200">
                    Leading contributors
                  </p>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {rootCause.contribution.top_10.map((contributor, index) => (
                    <div
                      key={`${contributor.name}-${index}`}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b border-slate-800/80 px-4 py-3 last:border-b-0"
                    >
                      <p className="truncate text-sm text-slate-300">
                        {contributor.name}
                      </p>

                      <p className="text-sm font-medium text-slate-200">
                        {contributor.value.toLocaleString()}
                      </p>

                      <p className="text-sm font-semibold text-emerald-400">
                        {contributor.percentage.toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {rootCause.drivers && (
          <section>
            <SectionTitle
              icon={<TrendingDown size={18} className="text-violet-300" />}
              title="Driver analysis"
              description="Variables with the strongest relationship to the selected metric."
            />

            <div className="mt-4 rounded-xl border border-violet-400/15 bg-violet-400/5 p-4">
              <p className="text-sm leading-6 text-slate-300">
                {rootCause.drivers.summary}
              </p>

              {rootCause.drivers.top_driver && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-violet-400/10 pt-4">
                  <span className="text-xs text-slate-500">Primary driver</span>
                  <span className="rounded-md bg-violet-400/10 px-2 py-1 text-xs font-semibold text-violet-200">
                    {rootCause.drivers.top_driver.column}
                  </span>
                  <span className="text-xs text-slate-400">
                    Correlation: {rootCause.drivers.top_driver.correlation.toFixed(3)}
                  </span>
                </div>
              )}
            </div>

            {rootCause.drivers.drivers.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Driver</th>
                      <th className="px-4 py-3 font-semibold">Correlation</th>
                      <th className="px-4 py-3 font-semibold">Strength</th>
                      <th className="px-4 py-3 font-semibold">Direction</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800">
                    {rootCause.drivers.drivers.map((driver, index) => (
                      <tr
                        key={`${driver.column}-${index}`}
                        className="bg-[#111C31] text-slate-300"
                      >
                        <td className="px-4 py-3 font-medium text-slate-100">
                          {driver.column}
                        </td>

                        <td className="px-4 py-3">
                          {driver.correlation.toFixed(3)}
                        </td>

                        <td className="px-4 py-3 capitalize">{driver.strength}</td>

                        <td className="px-4 py-3 capitalize">
                          <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">
                            {driver.direction}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {rootCause.anomalies && (
          <section>
            <SectionTitle
              icon={<AlertTriangle size={18} className="text-amber-300" />}
              title="Anomaly detection"
              description="Outlier signals identified during analysis."
            />

            <div className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="max-w-2xl text-sm leading-6 text-slate-300">
                  {rootCause.anomalies.summary}
                </p>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getSeverityStyle(
                    rootCause.anomalies.severity,
                  )}`}
                >
                  {rootCause.anomalies.severity} severity
                </span>
              </div>

              <div className="mt-4 grid gap-3 border-t border-amber-400/10 pt-4 sm:grid-cols-2">
                <MetricBlock
                  label="Outliers found"
                  value={rootCause.anomalies.count.toLocaleString()}
                />

                <MetricBlock
                  label="Average value"
                  value={rootCause.anomalies.statistics.mean.toLocaleString()}
                />
              </div>
            </div>
          </section>
        )}

        {rootCause.recommendations.length > 0 && (
          <section>
            <SectionTitle
              icon={<Lightbulb size={18} className="text-amber-300" />}
              title="Recommended actions"
              description="Actions generated from the investigation findings."
            />

            <ol className="mt-4 space-y-3">
              {rootCause.recommendations.map((recommendation, index) => (
                <li
                  key={`${recommendation}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-xs font-bold text-amber-300">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-slate-300">
                    {recommendation}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </section>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{icon}</div>

      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function MetricBlock({
  label,
  value,
  icon,
  valueClassName = "text-slate-100",
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {icon}
        <p className={`truncate text-base font-semibold ${valueClassName}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function ContributorCard({
  contributor,
  label,
  positive,
}: {
  contributor: Contributor;
  label: string;
  positive: boolean;
}) {
  const accentStyles = positive
    ? {
        card: "border-emerald-400/15 bg-emerald-400/5",
        text: "text-emerald-300",
      }
    : {
        card: "border-rose-400/15 bg-rose-400/5",
        text: "text-rose-300",
      };

  return (
    <article className={`rounded-xl border p-4 ${accentStyles.card}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 truncate text-base font-semibold text-white">
        {contributor.name}
      </p>

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-sm text-slate-400">
          Value:{" "}
          <span className="font-semibold text-slate-200">
            {contributor.value.toLocaleString()}
          </span>
        </p>

        <p className={`text-sm font-semibold ${accentStyles.text}`}>
          {contributor.percentage.toFixed(2)}%
        </p>
      </div>
    </article>
  );
}