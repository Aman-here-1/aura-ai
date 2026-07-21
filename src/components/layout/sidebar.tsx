"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "./menu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r bg-white h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Aura AI
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}