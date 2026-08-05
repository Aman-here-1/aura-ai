import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  BrainCircuit,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-10 shadow-2xl">

        {/* Background Glow */}
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
              <Sparkles size={16} />
              Aura AI Business Analyst
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-white">
              Good Evening,
              <br />
              Aman 👋
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Your business is performing well today.
              Revenue is up by <strong>18%</strong>,
              customer retention increased by <strong>9%</strong>,
              while profit margin requires attention.
              Aura AI has already generated actionable insights.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-105">
                View Full Report
                <ArrowRight size={18} />
              </button>

              <button className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20">
                Ask Aura AI
              </button>

            </div>

          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4 lg:w-[340px]">

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <TrendingUp className="mb-4 text-green-300" />
              <p className="text-sm text-blue-100">Revenue Growth</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                +18%
              </h2>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <Activity className="mb-4 text-cyan-300" />
              <p className="text-sm text-blue-100">Active Users</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                24.8K
              </h2>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <BrainCircuit className="mb-4 text-yellow-300" />
              <p className="text-sm text-blue-100">
                AI Insights
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                32
              </h2>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <Sparkles className="mb-4 text-pink-300" />
              <p className="text-sm text-blue-100">
                Reports Ready
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                12
              </h2>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}