import { AppLayout } from "@/components/app-layout";
import { IssueCard } from "@/components/map/issue-card";
import { mockIssues } from "@/lib/data";

export default function MapPage() {
  return (
    <AppLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Smart Map</h1>
      </div>
      <p className="text-muted-foreground mb-4">A visual gallery of reported issues across the city.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockIssues.slice(0, 6).map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </AppLayout>
  );
}
