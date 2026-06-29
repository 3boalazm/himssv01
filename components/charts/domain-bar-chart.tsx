"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { domainPerformance } from "@/lib/mock-data";
import { scoreColor } from "@/lib/utils";

const TONE: Record<string, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger:  "var(--danger)",
};

export function DomainBarChart({ height = 280 }: { height?: number }) {
  return (
    <div className="chart-animate" style={{ width: "100%", height }} dir="rtl">
      <ResponsiveContainer>
        <BarChart
          data={domainPerformance}
          layout="vertical"
          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
          barCategoryGap={10}
        >
          <XAxis
            type="number" domain={[0, 100]} hide
            reversed
          />
          <YAxis
            type="category" dataKey="domain"
            orientation="right"
            width={160}
            tick={{ fill: "var(--fg-muted)", fontSize: 12 }}
            axisLine={false} tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "var(--surface-2)" }}
            contentStyle={{ direction: "rtl" }}
            formatter={(v: number) => [`${v}%`, "الأداء"]}
          />
          <Bar dataKey="score" radius={[6, 0, 0, 6]} animationDuration={800}>
            {domainPerformance.map((d, i) => (
              <Cell key={i} fill={TONE[scoreColor(d.score)]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
