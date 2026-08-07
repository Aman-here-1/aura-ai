"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Database,
  Sparkles,
  LogOut,
} from "lucide-react";

import { menu } from "./menu";

import { useDatasetStore } from "../../store/dataset-store";

import {
  getCurrentUser,
  logout,
} from "../../services/auth";

export default function Sidebar() {
  const pathname = usePathname();

  const { dataset } = useDatasetStore();

  const user = getCurrentUser();

  const initials =
    user?.full_name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() ?? "AU";

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white">

      {/* ------------------------------------------------ */}
      {/* Logo */}
      {/* ------------------------------------------------ */}

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

      {/* ------------------------------------------------ */}
      {/* User */}
      {/* ------------------------------------------------ */}

      <div className="border-b border-slate-100 px-5 py-5">

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate font-semibold text-slate-900">
              {user?.full_name ?? "Guest User"}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email ?? "guest@aura.ai"}
            </p>

          </div>

        </div>

      </div>

      {/* ------------------------------------------------ */}
      {/* Dataset */}
      {/* ------------------------------------------------ */}

      <div className="px-5 pt-5">

        <div
          className={`rounded-2xl border p-4 transition ${
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
                  : "Upload Excel or CSV"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ------------------------------------------------ */}
      {/* Navigation */}
      {/* ------------------------------------------------ */}

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
                      : "text-slate-500 group-hover:text-blue-600"
                  }
                />

                <span>{item.title}</span>

              </Link>
            );
          })}

        </div>

      </nav>

      {/* ------------------------------------------------ */}
      {/* Footer */}
      {/* ------------------------------------------------ */}

      <div className="border-t border-slate-200 p-5">

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-xl">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Sparkles size={18} />

              <span className="font-semibold">
                Aura AI v1.0
              </span>

            </div>

            <button
              onClick={logout}
              className="rounded-xl p-2 transition hover:bg-white/20"
            >
              <LogOut size={18} />
            </button>

          </div>

          <p className="mt-4 text-sm leading-6 text-blue-100">
            AI-powered dashboards, business analytics,
            reports and conversational insights.
          </p>

        </div>

      </div>

    </aside>
  );
}