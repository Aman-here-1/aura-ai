"use client";

import { Loader2 } from "lucide-react";

type DashboardLoadingSkeletonProps = {
  message: string;
  seconds: number;
};

export default function DashboardLoadingSkeleton({
  message,
  seconds,
}: DashboardLoadingSkeletonProps) {
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen overflow-y-auto bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Same space as DashboardHeader */}
          <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
              <Loader2 size={20} className="animate-spin text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Analyzing your dataset
                </p>
                <p className="text-xs text-blue-600">
                  {message} • {seconds}s
                </p>
              </div>
            </div>
          </section>

          <div className="animate-pulse">
            {/* Same as KpiGrid */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="mt-5 h-9 w-28 rounded bg-slate-300" />
                  <div className="mt-4 h-3 w-20 rounded bg-slate-100" />
                </div>
              ))}
            </section>

            {/* Same as RevenueChart + AiInsightPanel */}
            <section className="mt-8 grid gap-8 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <div className="h-[380px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-56 rounded bg-slate-100" />

                  <div className="mt-10 flex h-60 items-end gap-3">
                    {[45, 72, 54, 88, 62, 95, 70, 82].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-lg bg-blue-200"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-4">
                <div className="h-[380px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="h-5 w-36 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-48 rounded bg-slate-100" />

                  <div className="mt-8 space-y-5">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex gap-3">
                        <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-full rounded bg-slate-200" />
                          <div className="h-3 w-3/4 rounded bg-slate-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Same as RecentActivity + QuickActions */}
            <section className="mt-8 grid gap-8 xl:grid-cols-12">
              <div className="xl:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="h-5 w-36 rounded bg-slate-200" />

                  <div className="mt-7 space-y-5">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-200" />

                        <div className="flex-1">
                          <div className="h-4 w-3/4 rounded bg-slate-200" />
                          <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
                        </div>

                        <div className="h-3 w-14 rounded bg-slate-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="h-5 w-32 rounded bg-slate-200" />

                  <div className="mt-7 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-100 p-4"
                      >
                        <div className="h-9 w-9 rounded-lg bg-indigo-100" />
                        <div className="mt-4 h-4 w-20 rounded bg-slate-200" />
                        <div className="mt-2 h-3 w-full rounded bg-slate-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}