"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  LogOut,
  Sparkles,
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
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() ?? "AU";

  return (
    <aside className="sticky top-0 hidden h-[100dvh] w-72 shrink-0 flex-col border-r border-slate-800/80 bg-[#0B1120] lg:flex">

      {/* ================================================= */}
      {/* BRAND */}
      {/* ================================================= */}

      <div className="border-b border-slate-800/80 px-5 py-5">

        <Link
          href="/"
          className="group flex items-center gap-3"
        >

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-blue-950/40 transition-transform duration-300 group-hover:scale-105">
            A
          </div>

          <div className="min-w-0">

            <h1 className="text-lg font-bold tracking-tight text-white">
              Aura AI
            </h1>

            <p className="text-xs text-slate-500">
              Business intelligence
            </p>

          </div>

        </Link>

      </div>

      {/* ================================================= */}
      {/* USER */}
      {/* ================================================= */}

      <div className="border-b border-slate-800/80 px-4 py-4">

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 transition hover:border-slate-700">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-bold text-white shadow-md shadow-blue-950/20">
              {initials}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-100">
                {user?.full_name ?? "Guest user"}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {user?.email ?? "tests@gmail.com"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* DATASET STATUS */}
      {/* ================================================= */}

      <div className="px-4 pt-4">

        <div
          className={`rounded-xl border p-3.5 transition ${
            dataset
              ? "border-emerald-400/20 bg-emerald-400/[0.05]"
              : "border-slate-800 bg-slate-900/50"
          }`}
        >

          <div className="flex items-center gap-3">

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                dataset
                  ? "bg-emerald-400/10"
                  : "bg-slate-800"
              }`}
            >

              <Database
                size={18}
                className={
                  dataset
                    ? "text-emerald-300"
                    : "text-slate-500"
                }
              />

            </div>

            <div className="min-w-0">

              <p className="text-xs font-semibold text-slate-200">
                {dataset
                  ? "Dataset loaded"
                  : "No dataset"}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {dataset
                  ? `${dataset.rows.toLocaleString()} rows · ${dataset.columns} columns`
                  : "Upload Excel or CSV"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <nav className="flex-1 overflow-y-auto px-3 py-6">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Workspace
        </p>

        <div className="space-y-1.5">

          {menu.map((item) => {

            const Icon = item.icon;

            /*
             * Dashboard should only be active on "/".
             * Other routes can also match nested pages.
             */

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(
                    `${item.href}/`
                  );

            return (
              <Link
                key={item.title}
                href={item.href}
                aria-current={
                  active ? "page" : undefined
                }
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-cyan-400/[0.15] via-blue-500/[0.12] to-violet-500/[0.10] text-white shadow-sm ring-1 ring-cyan-400/15"
                    : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100"
                }`}
              >

                {/* Active indicator */}

                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-cyan-300 to-blue-500" />
                )}

                <Icon
                  size={18}
                  strokeWidth={active ? 2.2 : 1.8}
                  className={
                    active
                      ? "text-cyan-300"
                      : "text-slate-500 transition-colors group-hover:text-slate-300"
                  }
                />

                <span className="flex-1">
                  {item.title}
                </span>

                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
                )}

              </Link>
            );
          })}

        </div>

      </nav>

      {/* ================================================= */}
      {/* BOTTOM AURA CARD */}
      {/* ================================================= */}

      <div className="border-t border-slate-800/80 p-4">

        <div className="rounded-xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] via-blue-500/[0.07] to-violet-500/[0.08] p-4">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10">

                <Sparkles
                  size={15}
                  className="text-cyan-300"
                />

              </div>

              <span className="text-sm font-semibold text-slate-100">
                Aura AI
              </span>

            </div>

            <button
              type="button"
              onClick={logout}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-400/10 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>

          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            AI-powered business analysis for faster decisions.
          </p>

        </div>

      </div>

    </aside>
  );
}