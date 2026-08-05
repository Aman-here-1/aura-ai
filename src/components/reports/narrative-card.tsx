"use client";

import {
  ScrollText,
} from "lucide-react";

interface Props {
  narrative: string;
}

export default function NarrativeCard({
  narrative,
}: Props) {

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <ScrollText
            size={24}
            className="text-blue-600"
          />

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              AI Business Narrative
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Automatically generated executive business story.
            </p>

          </div>

        </div>

      </div>

      <div className="p-6">

        {narrative ? (

          <div className="rounded-2xl bg-slate-50 p-6">

            <p className="whitespace-pre-line leading-8 text-slate-700">
              {narrative}
            </p>

          </div>

        ) : (

          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

            <p className="text-slate-500">
              No narrative available.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}