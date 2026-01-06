import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockIssues } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { BarChart, CheckCircle, Clock, ListTodo } from "lucide-react";

export default function KpiCards() {
  const totalIssues = mockIssues.length;
  const resolvedIssues = mockIssues.filter(
    (issue) => issue.status === "Resolved"
  ).length;
  const openIssues = mockIssues.filter(
    (issue) => issue.status === "Open"
  ).length;

  // Dummy calculation for average resolution time
  const avgResolutionTime = 3.5;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(totalIssues)}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(resolvedIssues)}
          </div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(openIssues)}</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResolutionTime} days</div>
          <p className="text-xs text-muted-foreground">
            -5% from last month
          </p>
        </CardContent>
      </Card>
    </>
  );
}
