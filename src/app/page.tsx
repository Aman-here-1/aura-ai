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

      <section className="mt-8">
        <KpiGrid />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-8">
          <RevenueChart />
        </div>

        <div className="xl:col-span-4">
          <AiInsightPanel />
        </div>

      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-12">

        <div className="xl:col-span-7">
          <RecentActivity />
        </div>

        <div className="xl:col-span-5">
          <QuickActions />
        </div>

      </section>

    </AppShell>
  );
}