"use client";

import {
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

interface Rule {
  rule: string;
  status: string;
  message: string;
}

interface Props {
  rules: Rule[];
}

export default function BusinessRulesCard({
  rules,
}: Props) {

  const getIcon = (status: string) => {

    switch (status.toLowerCase()) {

      case "passed":
        return (
          <CheckCircle
            size={20}
            className="text-emerald-600"
          />
        );

      case "warning":
        return (
          <AlertTriangle
            size={20}
            className="text-amber-600"
          />
        );

      default:
        return (
          <Info
            size={20}
            className="text-blue-600"
          />
        );
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={24}
            className="text-blue-600"
          />

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Business Rules Validation
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Automatic validation of important business rules.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-4 p-6">

        {rules.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

            <p className="text-slate-500">
              No business rules available.
            </p>

          </div>

        ) : (

          rules.map((rule, index) => (

            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5"
            >

              {getIcon(rule.status)}

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  {rule.rule}
                </h3>

                <p className="mt-1 text-slate-600">
                  {rule.message}
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  rule.status === "Passed"
                    ? "bg-emerald-100 text-emerald-700"
                    : rule.status === "Warning"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {rule.status}
              </span>

            </div>

          ))

        )}

      </div>

    </section>
  );
}