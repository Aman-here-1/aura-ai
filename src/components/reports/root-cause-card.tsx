"use client";

import {
  Search,
  AlertTriangle,
} from "lucide-react";

interface Props {
  rootCauses: string[];
}

export default function RootCauseCard({
  rootCauses,
}: Props) {

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Root Cause Analysis
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Possible reasons identified from the uploaded dataset.
        </p>

      </div>

      <div className="p-6">

        {rootCauses.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

            <AlertTriangle
              size={36}
              className="mx-auto text-slate-400"
            />

            <p className="mt-4 text-slate-500">
              No root causes detected.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {rootCauses.map(
              (
                cause,
                index,
              ) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-amber-50 p-5"
                >

                  <div className="rounded-xl bg-amber-100 p-3">

                    <Search
                      size={18}
                      className="text-amber-700"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      Cause {index + 1}
                    </h3>

                    <p className="mt-1 text-slate-600">
                      {cause}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}