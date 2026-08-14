import { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  action,
  className = "",
}: ChartCardProps) {
  return (
    <section
      className={`
        group
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800
        bg-[#0B1120]
        shadow-2xl
        shadow-black/20
        transition-all
        duration-300
        hover:border-slate-700
        hover:shadow-black/30
        ${className}
      `}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex items-start justify-between border-b border-slate-800 px-6 py-5 sm:px-7 sm:py-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />

            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              {title}
            </h2>
          </div>

          {subtitle && (
            <p className="mt-2 text-sm leading-5 text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {action ? (
          action
        ) : (
          <button
            type="button"
            aria-label="More options"
            className="
              shrink-0
              rounded-xl
              border
              border-transparent
              p-2
              text-slate-500
              transition-all
              duration-200
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-slate-200
            "
          >
            <MoreHorizontal size={19} />
          </button>
        )}
      </div>

      {/* =====================================================
          BODY
      ====================================================== */}
      <div className="p-5 sm:p-7">
        {children}
      </div>
    </section>
  );
}