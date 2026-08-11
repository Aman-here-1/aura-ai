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
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${className}
      `}
    >
      {/* Header */}

      <div className="flex items-start justify-between border-b border-slate-100 px-8 py-7">

        <div className="min-w-0">

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">

            {title}

          </h2>

          {subtitle && (

            <p className="mt-2 text-base leading-6 text-slate-500">

              {subtitle}

            </p>

          )}

        </div>

        {action ? (

          action

        ) : (

          <button
            className="
              rounded-2xl
              p-3
              text-slate-500
              transition-all
              duration-300
              hover:bg-slate-100
              hover:text-slate-700
            "
          >

            <MoreHorizontal size={20} />

          </button>

        )}

      </div>

      {/* Body */}

      <div className="p-8">

        {children}

      </div>

    </section>
  );
}