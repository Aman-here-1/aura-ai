import { Sparkles, TrendingUp } from "lucide-react";

export default function DashboardHeader() {
  return (
    <section className="mb-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-8 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">
              <Sparkles size={16} />
              AI Business Analyst
            </div>

            <h1 className="text-4xl font-bold">
              Good Evening, Aman 👋
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Welcome back. Your business performance looks healthy today.
              Revenue increased by 18% compared to last week, while profit
              margin dropped slightly. I've already prepared the key insights
              below.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-slate-100">
                View Report
              </button>

              <button className="rounded-xl border border-white/40 px-5 py-3 font-semibold backdrop-blur transition hover:bg-white/10">
                Ask Aura AI
              </button>
            </div>
          </div>

          <div className="hidden lg:flex h-28 w-28 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
            <TrendingUp size={48} />
          </div>
        </div>
      </div>
    </section>
  );
}