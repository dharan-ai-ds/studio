"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { subMonths, format } from "date-fns";

import { mockIssues } from "@/lib/data";

const data = Array.from({ length: 6 }, (_, i) => {
  const date = subMonths(new Date(), 5 - i);
  return {
    name: format(date, "MMM"),
    total: mockIssues.filter(
      (issue) =>
        issue.createdAt.getMonth() === date.getMonth() &&
        issue.createdAt.getFullYear() === date.getFullYear()
    ).length,
  };
});

export default function IssueTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4, fill: "hsl(var(--primary))" }}
          activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
