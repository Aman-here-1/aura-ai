"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Database,
  LogOut,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import { menu } from "../layout/menu";
import { useDatasetStore } from "../../store/dataset-store";
import { getCurrentUser, logout } from "../../services/auth";

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

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
    <aside
      className={`
        sticky
        top-0
        hidden
        h-[100dvh]
        shrink-0
        flex-col
        border-r
        border-slate-800
        bg-[#0B1120]
        transition-all
        duration-300
        ease-in-out

        lg:flex

        light:border-slate-200
        light:bg-white

        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* =====================================================
          LOGO / BRAND
      ====================================================== */}

      <div
        className={`
          border-b
          border-slate-800
          py-5
          transition-all
          duration-300

          light:border-slate-200

          ${collapsed ? "px-3" : "px-5"}
        `}
      >
        <Link
          href="/"
          className={`
            flex
            items-center
            transition-all
            duration-300

            ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          {/* Logo */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-cyan-400
              via-blue-500
              to-violet-600
              text-lg
              font-bold
              text-white
              shadow-lg
              shadow-blue-950/40
            "
          >
            A
          </div>

          {/* Brand Text */}

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight text-white light:text-slate-900">
                Aura AI
              </h1>

              <p className="text-xs text-slate-500">
                Business intelligence
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* =====================================================
          USER
      ====================================================== */}

      <div
        className={`
          border-b
          border-slate-800
          py-4
          transition-all
          duration-300

          light:border-slate-200

          ${collapsed ? "px-3" : "px-4"}
        `}
      >
        <div
          className={`
            flex
            items-center
            rounded-xl
            border
            border-slate-800
            bg-slate-900/60
            transition-all
            duration-300

            light:border-slate-200
            light:bg-slate-50

            ${collapsed ? "justify-center p-2" : "gap-3 p-3"}
          `}
          title={
            collapsed
              ? `${user?.full_name ?? "Guest user"} ${
                  user?.email ?? ""
                }`
              : undefined
          }
        >
          {/* Avatar */}

          <div
            className="
              flex
              h-9
              w-9
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

          {/* User details */}

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-100 light:text-slate-900">
                {user?.full_name ?? "Guest user"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email ?? ""}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          DATASET STATUS
      ====================================================== */}

      <div
        className={`
          pt-4
          transition-all
          duration-300

          ${collapsed ? "px-3" : "px-4"}
        `}
      >
        <div
          className={`
            rounded-xl
            border
            p-3.5
            transition-all
            duration-300

            ${
              dataset
                ? "border-emerald-400/20 bg-emerald-400/5 light:border-emerald-200 light:bg-emerald-50"
                : "border-slate-800 bg-slate-900/50 light:border-slate-200 light:bg-slate-50"
            }

            ${collapsed ? "flex justify-center" : ""}
          `}
          title={
            collapsed
              ? dataset
                ? `${dataset.rows.toLocaleString()} rows · ${dataset.columns} columns`
                : "Upload Excel or CSV"
              : undefined
          }
        >
          <div
            className={`
              flex
              items-center

              ${collapsed ? "justify-center" : "gap-3"}
            `}
          >
            {/* Database Icon */}

            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg

                ${
                  dataset
                    ? "bg-emerald-400/10 light:bg-emerald-100"
                    : "bg-slate-800 light:bg-slate-200"
                }
              `}
            >
              <Database
                size={17}
                className={
                  dataset
                    ? "text-emerald-300 light:text-emerald-600"
                    : "text-slate-500"
                }
              />
            </div>

            {/* Dataset details */}

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 light:text-slate-800">
                  {dataset ? "Dataset loaded" : "No dataset"}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {dataset
                    ? `${dataset.rows.toLocaleString()} rows · ${dataset.columns} columns`
                    : "Upload Excel or CSV"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {/* Workspace label */}

        {!collapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Workspace
          </p>
        )}

        <div className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <div
                key={item.title}
                className="group relative"
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    flex
                    items-center
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? "h-11 justify-center"
                        : "gap-3 px-3 py-3"
                    }

                    ${
                      active
                        ? "bg-gradient-to-r from-cyan-400/15 to-blue-500/15 text-white ring-1 ring-cyan-400/15 light:from-blue-50 light:to-violet-50 light:text-slate-900 light:ring-blue-200"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-100 light:text-slate-500 light:hover:bg-slate-100 light:hover:text-slate-900"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={`
                      shrink-0
                      transition-colors

                      ${
                        active
                          ? "text-cyan-300 light:text-blue-600"
                          : "text-slate-500 group-hover:text-slate-300 light:text-slate-500 light:group-hover:text-slate-700"
                      }
                    `}
                  />

                  {!collapsed && (
                    <span className="truncate">
                      {item.title}
                    </span>
                  )}

                  {/* Active indicator */}

                  {!collapsed && active && (
                    <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 light:bg-blue-500" />
                  )}
                </Link>

                {/* =================================================
                    COLLAPSED TOOLTIP
                ================================================== */}

                {collapsed && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-[calc(100%+10px)]
                      top-1/2
                      z-50
                      -translate-y-1/2
                      translate-x-1
                      whitespace-nowrap
                      rounded-lg
                      border
                      border-slate-700
                      bg-slate-900
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-white
                      opacity-0
                      shadow-xl
                      transition-all
                      duration-200
                      group-hover:translate-x-0
                      group-hover:opacity-100

                      light:border-slate-200
                      light:bg-white
                      light:text-slate-900
                    "
                  >
                    {item.title}

                    {/* Tooltip arrow */}

                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-2
                        w-2
                        -translate-x-1/2
                        -translate-y-1/2
                        rotate-45
                        border-b
                        border-l
                        border-slate-700
                        bg-slate-900

                        light:border-slate-200
                        light:bg-white
                      "
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =====================================================
            COLLAPSE BUTTON
        ====================================================== */}

        <div
          className="
            mt-5
            border-t
            border-slate-800
            pt-4

            light:border-slate-200
          "
        >
          <div className="group relative">
            <button
              type="button"
              onClick={() =>
                setCollapsed((previous) => !previous)
              }
              className={`
                flex
                w-full
                items-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900/70
                text-slate-400
                transition-all
                duration-200

                hover:border-cyan-400/40
                hover:bg-cyan-400/10
                hover:text-cyan-300

                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400/30

                light:border-slate-200
                light:bg-slate-50
                light:text-slate-500
                light:hover:border-blue-300
                light:hover:bg-blue-50
                light:hover:text-blue-600

                ${
                  collapsed
                    ? "h-11 justify-center"
                    : "gap-3 px-3 py-2.5"
                }
              `}
              title={
                collapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
              aria-label={
                collapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >
              {/* SAME ICON AS AI CHAT */}

              <MessageSquare
                size={18}
                className="shrink-0"
              />

              {!collapsed && (
                <span className="text-sm font-medium">
                  Collapse Sidebar
                </span>
              )}
            </button>

            {/* Collapsed tooltip */}

            {collapsed && (
              <div
                className="
                  pointer-events-none
                  absolute
                  left-[calc(100%+10px)]
                  top-1/2
                  z-50
                  -translate-y-1/2
                  translate-x-1
                  whitespace-nowrap
                  rounded-lg
                  border
                  border-slate-700
                  bg-slate-900
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  opacity-0
                  shadow-xl
                  transition-all
                  duration-200
                  group-hover:translate-x-0
                  group-hover:opacity-100

                  light:border-slate-200
                  light:bg-white
                  light:text-slate-900
                "
              >
                Expand Sidebar

                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-2
                    w-2
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45
                    border-b
                    border-l
                    border-slate-700
                    bg-slate-900

                    light:border-slate-200
                    light:bg-white
                  "
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* =====================================================
          BOTTOM AURA AI CARD
      ====================================================== */}

      <div
        className={`
          border-t
          border-slate-800
          transition-all
          duration-300

          light:border-slate-200

          ${collapsed ? "p-3" : "p-4"}
        `}
      >
        <div
          className={`
            rounded-xl
            border
            border-cyan-400/15
            bg-gradient-to-br
            from-cyan-400/10
            to-blue-500/10

            light:border-blue-200
            light:from-blue-50
            light:to-violet-50

            ${
              collapsed
                ? "flex h-14 items-center justify-center"
                : "p-4"
            }
          `}
          title={
            collapsed
              ? "Aura AI — AI-powered business analysis"
              : undefined
          }
        >
          {collapsed ? (
            <Sparkles
              size={19}
              className="text-cyan-300 light:text-blue-600"
            />
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={16}
                    className="text-cyan-300 light:text-blue-600"
                  />

                  <span className="text-sm font-semibold text-slate-100 light:text-slate-900">
                    Aura AI
                  </span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="
                    rounded-lg
                    p-1.5
                    text-slate-400
                    transition

                    hover:bg-rose-400/10
                    hover:text-rose-300

                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400

                    light:text-slate-500
                    light:hover:bg-rose-50
                    light:hover:text-rose-500
                  "
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                AI-powered business analysis for faster
                decisions.
              </p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}