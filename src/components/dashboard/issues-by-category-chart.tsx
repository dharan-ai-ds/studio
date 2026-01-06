"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

import { mockIssues } from "@/lib/data";
import { IssueCategory } from "@/lib/types";

const categoryCounts = mockIssues.reduce((acc, issue) => {
  acc[issue.category] = (acc[issue.category] || 0) + 1;
  return acc;
}, {} as Record<IssueCategory, number>);

const data = Object.entries(categoryCounts).map(([name, value]) => ({
  name,
  value,
}));

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#a36e2d",
];

export default function IssuesByCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={50}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
