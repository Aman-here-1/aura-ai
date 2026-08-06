"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface BusinessMetric {

  title: string;

  value: number;

  formatted_value: string;

  unit: string;

  trend: string;

  description: string;

}

interface BusinessMetrics {

  metrics: BusinessMetric[];

}

interface Props {

  metrics: BusinessMetrics;

}

export default function BusinessMetricsCard({

  metrics,

}: Props) {

  if (

    !metrics ||

    !metrics.metrics ||

    metrics.metrics.length === 0

  ) {

    return null;

  }

  const trendIcon = (

    trend: string,

  ) => {

    switch (

      trend.toLowerCase()

    ) {

      case "up":

      case "increase":

      case "positive":

        return (

          <TrendingUp

            size={18}

            className="text-emerald-600"

          />

        );

      case "down":

      case "decrease":

      case "negative":

        return (

          <TrendingDown

            size={18}

            className="text-red-600"

          />

        );

      default:

        return (

          <Minus

            size={18}

            className="text-slate-500"

          />

        );

    }

  };

  const trendColor = (

    trend: string,

  ) => {

    switch (

      trend.toLowerCase()

    ) {

      case "up":

      case "increase":

      case "positive":

        return "text-emerald-600";

      case "down":

      case "decrease":

      case "negative":

        return "text-red-600";

      default:

        return "text-slate-500";

    }

  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">

          📊 Business Metrics

        </h2>

        <p className="mt-1 text-sm text-slate-500">

          Key performance indicators generated from your analysis.

        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {metrics.metrics.map(

          (

            metric,

            index,

          ) => (

            <div

              key={index}

              className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md"

            >

              <div className="flex items-center justify-between">

                <div className="text-sm font-medium text-slate-500">

                  {metric.title}

                </div>

                {trendIcon(

                  metric.trend,

                )}

              </div>

              <div className="mt-3 text-3xl font-bold text-slate-900">

                {

                  metric.formatted_value

                }

              </div>

              <div

                className={`mt-2 flex items-center gap-2 text-sm font-medium ${trendColor(
                  metric.trend,
                )}`}

              >

                {metric.trend}

              </div>

              <div className="mt-4 text-sm leading-6 text-slate-600">

                {

                  metric.description

                }

              </div>

            </div>

          ),

        )}

      </div>

    </div>

  );

}