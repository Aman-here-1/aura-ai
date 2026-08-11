"use client";

import { FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {

  narrative: string;

}

export default function NarrativeCard({

  narrative,

}: Props) {

  if (!narrative) {

    return null;

  }

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">

          <FileText
            size={20}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-900">

            Executive Narrative

          </h2>

          <p className="text-sm text-slate-500">

            AI generated business summary

          </p>

        </div>

      </div>

      <div className="prose prose-slate max-w-none">

        <ReactMarkdown>

          {narrative}

        </ReactMarkdown>

      </div>

    </div>

  );

}