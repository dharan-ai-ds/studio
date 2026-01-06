import { AppLayout } from "@/components/app-layout";
import KpiCards from "@/components/dashboard/kpi-cards";
import IssueTrendsChart from "@/components/dashboard/issue-trends-chart";
import IssuesByCategoryChart from "@/components/dashboard/issues-by-category-chart";
import LiveFeed from "@/components/dashboard/live-feed";
import IntelligenceHub from "@/components/dashboard/intelligence-hub";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCards />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-12 rounded-xl bg-card p-4 shadow-sm lg:col-span-4">
          <h2 className="text-lg font-semibold mb-4">Issue Trends</h2>
          <div className="h-[300px]">
            <IssueTrendsChart />
          </div>
        </div>
        <div className="col-span-12 rounded-xl bg-card p-4 shadow-sm lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Issues by Category</h2>
          <div className="h-[300px]">
            <IssuesByCategoryChart />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
         <div className="lg:col-span-2">
            <IntelligenceHub />
        </div>
        <div>
           <LiveFeed />
        </div>
      </div>
    </AppLayout>
  );
}
