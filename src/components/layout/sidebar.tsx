"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "./menu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-72 shrink-0 border-r border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg">
            A
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Aura AI
            </h1>

            <p className="text-xs font-medium text-slate-500">
              AI Business Analyst
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-900"
                  }`}
                />

                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-5">
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Aura AI v1.0
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Your AI Business Analyst Platform
          </p>
        </div>
      </div>
    </aside>
  );
}