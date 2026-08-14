"use client";

import {
  Bell,
  LogOut,
  Search,
  Sparkles,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { useDatasetStore } from "../../store/dataset-store";
import { getCurrentUser, logout } from "../../services/auth";

import ThemeToggle from "./theme-toggle";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Dataset",
  "/analysis": "Analysis",
  "/chat": "AI Analyst",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/projects": "Projects",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function Navbar() {
  const pathname = usePathname();

  const { dataset } = useDatasetStore();
  const user = getCurrentUser();

  const title = pageTitles[pathname] ?? "Aura AI";

  const initials =
    user?.full_name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() ?? "AU";

  return (
    <header
      className="
        sticky
        top-0
        z-40

        flex
        h-20
        w-full
        shrink-0
        items-center
        justify-between

        border-b
        border-slate-800
        bg-[#0B1120]/95

        px-4
        backdrop-blur-xl

        sm:px-6
        xl:px-8

        light:border-slate-200
        light:bg-white/95
      "
    >
      {/* =====================================================
          LEFT — PAGE TITLE
      ====================================================== */}

      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          {/* Icon */}

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-cyan-400/10

              light:bg-blue-50
            "
          >
            <Sparkles
              size={17}
              className="
                text-cyan-300
                light:text-blue-600
              "
            />
          </div>

          {/* Title */}

          <h1
            className="
              truncate
              text-xl
              font-semibold
              tracking-tight
              text-white

              sm:text-2xl

              light:text-slate-900
            "
          >
            {title}
          </h1>
        </div>

        {/* Subtitle */}

        <p
          className="
            mt-0.5
            hidden
            text-sm
            text-slate-500

            sm:block
          "
        >
          {dataset
            ? `${dataset.rows.toLocaleString()} rows · ${dataset.columns} columns loaded`
            : "Upload a dataset to start AI-powered analysis."}
        </p>
      </div>

      {/* =====================================================
          RIGHT CONTROLS
      ====================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2

          sm:gap-3
        "
      >
        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="relative hidden xl:block">
          <Search
            size={17}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="search"
            placeholder="Search workspace..."
            className="
              h-10
              w-64
              rounded-xl

              border
              border-slate-700

              bg-slate-900

              pl-10
              pr-4

              text-sm
              text-slate-200

              outline-none
              transition

              placeholder:text-slate-600

              focus:border-cyan-400/60
              focus:ring-2
              focus:ring-cyan-400/10

              light:border-slate-200
              light:bg-white
              light:text-slate-800
              light:placeholder:text-slate-400

              light:focus:border-blue-400
              light:focus:ring-blue-400/10
            "
            aria-label="Search workspace"
          />
        </div>

        {/* =================================================
            THEME
        ================================================= */}

        <ThemeToggle />

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <button
          type="button"
          className="
            relative
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl

            border
            border-slate-700

            bg-slate-900

            text-slate-400

            transition

            hover:border-slate-600
            hover:text-white

            focus:outline-none
            focus:ring-2
            focus:ring-cyan-400

            light:border-slate-200
            light:bg-white
            light:text-slate-500

            light:hover:border-slate-300
            light:hover:text-slate-900
          "
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span
            className="
              absolute
              right-2.5
              top-2.5

              h-2
              w-2

              rounded-full
              bg-rose-400

              ring-2
              ring-slate-900

              light:ring-white
            "
          />
        </button>

        {/* =================================================
            USER
        ================================================= */}

        <div
          className="
            flex
            h-10
            items-center
            gap-2

            rounded-xl
            border
            border-slate-700

            bg-slate-900

            px-2

            sm:gap-3
            sm:px-2.5

            light:border-slate-200
            light:bg-white
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg

              bg-gradient-to-br
              from-cyan-400
              to-blue-600

              text-xs
              font-bold
              text-white
            "
          >
            {initials}
          </div>

          {/* User */}

          <div className="hidden max-w-40 lg:block">
            <p
              className="
                truncate
                text-sm
                font-semibold
                text-slate-100

                light:text-slate-900
              "
            >
              {user?.full_name ?? "Guest"}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email ?? " "}
            </p>
          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={logout}
            className="
              rounded-lg
              p-1.5

              text-slate-500

              transition

              hover:bg-rose-400/10
              hover:text-rose-300

              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400

              light:hover:bg-rose-50
              light:hover:text-rose-500
            "
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}