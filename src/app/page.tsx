import AppShell from "../components/layout/app-shell";
import KpiGrid from "../components/dashboard/kpi-grid";
import RevenueChart from "../components/dashboard/revenue-chart";
import AiInsightPanel from "../components/dashboard/ai-insight-panel";
import RecentActivity from "../components/dashboard/recent-activity";
import QuickActions from "../components/dashboard/quick-actions";
import DashboardHeader from "../components/dashboard/dashboard-header";

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 py-6 lg:gap-7 lg:py-7">
        <DashboardHeader />

        <section>
          <KpiGrid />
        </section>

        <section className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <RevenueChart />
          </div>

          <div className="xl:col-span-4">
            <AiInsightPanel />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <RecentActivity />
          </div>

          <div className="xl:col-span-5">
            <QuickActions />
          </div>
        </section>
      </div>
    </AppShell>
  );
}