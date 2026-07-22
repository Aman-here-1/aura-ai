import AppShell from "../components/layout/app-shell";
import DashboardHeader from "../components/dashboard/dashboard-header";
import KpiGrid from "../components/dashboard/kpi-grid";
import RevenueChart from "../components/dashboard/revenue-chart";
import AiInsightPanel from "../components/dashboard/ai-insight-panel";
import RecentActivity from "../components/dashboard/recent-activity";
import QuickActions from "../components/dashboard/quick-actions";

export default function Home() {
  return (
    <AppShell>
      <DashboardHeader />

      <div className="mt-8">
        <KpiGrid />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <AiInsightPanel />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentActivity />

        <QuickActions />
      </div>

      {/* Tailwind Test */}
      <div className="mt-8 rounded-xl bg-red-500 p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold">
          Tailwind Working ✅
        </h2>

        <p className="mt-2">
          If you can see this red box with white text, Tailwind CSS is working correctly.
        </p>
      </div>
    </AppShell>
  );
}