"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  Sparkles,
} from "lucide-react";

import { menu } from "./menu";
import { useDatasetStore } from "../../store/dataset-store";

export default function Sidebar() {
  const pathname = usePathname();

  const { dataset } = useDatasetStore();

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm">

      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <Link
          href="/"
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-2xl font-bold text-white shadow-lg">
            A
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Aura AI
            </h1>

            <p className="text-sm text-slate-500">
              AI Business Analyst
            </p>
          </div>
        </Link>
      </div>

      {/* Dataset Status */}
      <div className="px-5 pt-5">
        <div
          className={`rounded-2xl border p-4 ${
            dataset
              ? "border-emerald-200 bg-emerald-50"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                dataset
                  ? "bg-emerald-100"
                  : "bg-slate-200"
              }`}
            >
              <Database
                size={20}
                className={
                  dataset
                    ? "text-emerald-600"
                    : "text-slate-500"
                }
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                {dataset
                  ? "Dataset Loaded"
                  : "No Dataset"}
              </p>

              <p className="text-xs text-slate-500">
                {dataset
                  ? `${dataset.rows.toLocaleString()} rows • ${dataset.columns} columns`
                  : "Upload a CSV or Excel file"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={20}
                  className={
                    active
                      ? "text-white"
                      : "text-slate-500 transition group-hover:text-blue-600"
                  }
                />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-5">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />

            <span className="font-semibold">
              Aura AI v1.0
            </span>
          </div>

          <p className="mt-3 text-sm text-blue-100">
            Upload your business data and receive AI-powered insights,
            dashboards and reports instantly.
          </p>
        </div>
      </div>
    </aside>
  );
}