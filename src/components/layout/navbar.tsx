"use client";

import { Bell, Search, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDatasetStore } from "../../store/dataset-store";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Dataset",
  "/analysis": "Analysis",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Navbar() {
  const pathname = usePathname();

  const { dataset } = useDatasetStore();

  const title = pageTitles[pathname] ?? "Aura AI";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur-xl">

      {/* Left */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles
            size={20}
            className="text-blue-600"
          />

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {dataset
            ? `${dataset.rows.toLocaleString()} rows • ${dataset.columns} columns loaded`
            : "Upload a dataset to start AI-powered analysis."}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden xl:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search dashboards, reports..."
            className="h-12 w-80 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Notification */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:border-blue-400 hover:bg-slate-50">
          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-400 hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
            AC
          </div>

          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-slate-900">
              Aman Chouhan
            </p>

            <p className="text-xs text-slate-500">
              Product Analyst
            </p>
          </div>
        </button>

      </div>
    </header>
  );
}