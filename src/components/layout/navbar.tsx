"use client";

import { Bell, Search, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur-xl">
      {/* Left */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back, Aman 👋 Your AI Business Analyst is ready.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search dashboards, reports..."
            className="h-12 w-80 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Notification */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:border-blue-300 hover:bg-slate-50">
          <Bell size={20} className="text-slate-600" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-300">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md">
            AC
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-900">
              Aman Chouhan
            </p>

            <p className="text-xs text-slate-500">
              Product Analyst
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}